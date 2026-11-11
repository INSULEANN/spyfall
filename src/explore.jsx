// เกม "ออกสำรวจ" — เกมแนวแฝงตัว/ทีมลับ: คณะนักสำรวจต้องผ่านด่านให้ได้ 3 ด่าน ขณะที่หนอนบ่อนไส้คอยก่อวินาศ
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw, Eye, EyeOff } from 'lucide-react';
import { play as sfx } from './sfx.js';

export const STAGES = [
  { name: 'ป่าทึบ', icon: '🌲' },
  { name: 'ลำธารเชี่ยว', icon: '🌊' },
  { name: 'ถ้ำค้างคาว', icon: '🦇' },
  { name: 'วิหารร้าง', icon: '🗿' },
  { name: 'ห้องสมบัติ', icon: '💎' },
];
export const MAX_REJECT = 5;   // คณะถูกค้านติดกันครบเท่านี้ = คณะแตก ฝ่ายโจรชนะ
export const WIN_AT = 3;       // ผ่าน/พัง ครบกี่ด่านถึงจบเกม
export const EXPLORE_MIN = 5;
export const EXPLORE_SCORE = { good: 1, bad: 2 }; // แต้มต่อคนของฝ่ายที่ชนะ
const FRAC = [0.4, 0.5, 0.5, 0.6, 0.6];
export const teamSizes = n => FRAC.map(f => Math.min(n - 1, Math.max(2, Math.round(n * f))));
export const traitorCount = n => Math.floor((n + 1) / 3);
export const needFails = n => STAGES.map((_, i) => (i === 4 && n >= 7 ? 2 : 1)); // ด่านสุดท้ายของวงใหญ่ต้องพัง 2 ใบ

export const ROLE_INFO = {
  explorer: { icon: '🧭', name: 'นักสำรวจ', side: 'good', desc: 'พาคณะผ่านด่านให้ได้ 3 ด่าน เลือกเพื่อนร่วมทางให้ดี อย่าพาโจรไปด้วย' },
  lantern: { icon: '🏮', name: 'ผู้ถือตะเกียง', side: 'good', desc: 'ฝ่ายนักสำรวจ รู้ตั้งแต่แรกว่าใครเป็นโจร ใบ้เพื่อนอ้อม ๆ อย่าให้โจรจับได้ เพราะถ้านักสำรวจผ่าน 3 ด่าน โจรจะได้ชี้ตัวคุณ 1 ครั้ง ชี้ถูก = โจรพลิกชนะ' },
  traitor: { icon: '🗡️', name: 'โจรขุดสมบัติ', side: 'bad', desc: 'แฝงตัวในคณะ แอบก่อวินาศให้ด่านพัง 3 ด่าน หรือถ้าแพ้ด่าน ให้จับตาว่าใครคือผู้ถือตะเกียงแล้วชี้ตัวตอนจบ' },
  mole: { icon: '🐍', name: 'จอมแฝงตัว', side: 'bad', desc: 'ฝ่ายโจร แต่ผู้ถือตะเกียงมองไม่เห็นคุณ (เพื่อนโจรยังรู้ว่าคุณเป็นพวก)' },
};
export const sideOf = role => ROLE_INFO[role]?.side || 'good';

const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

export function makeExploreRound(ids, opts = {}, number = 1) {
  const n = ids.length;
  const bad = shuffle(ids).slice(0, traitorCount(n));
  const good = shuffle(ids.filter(id => !bad.includes(id)));
  const roles = {};
  ids.forEach(id => roles[id] = bad.includes(id) ? 'traitor' : 'explorer');
  roles[good[0]] = 'lantern'; // มีผู้ถือตะเกียงทุกตา
  if (opts.mole && bad.length) roles[bad[0]] = 'mole';
  return { number, kind: 'explore', order: shuffle(ids), leader: 0, roles, sizes: teamSizes(n), need: needFails(n), stage: 0, rejects: 0, phase: 'pick', startedAt: Date.now() };
}

// ---------- ตรรกะเกม (ทำงานบนข้อมูลห้องทั้งก้อนภายใน transaction) ----------
const here = (cur, id) => !!cur.players?.[id];
const leaderId = rd => (rd.order || [])[rd.leader];
function nextLeader(cur) {
  const rd = cur.round; const n = (rd.order || []).length;
  for (let i = 1; i <= n; i++) { const k = (rd.leader + i) % n; if (here(cur, rd.order[k])) { rd.leader = k; return; } }
}
function endGame(cur, winner, reason) {
  const points = {}, sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { points[id] = sideOf(cur.round.roles?.[id]) === winner ? EXPLORE_SCORE[winner] : 0; sc[id] = (sc[id] || 0) + points[id]; });
  cur.status = 'result'; cur.round.phase = 'done'; cur.scores = sc; cur.result = { type: 'explore', winner, reason, points };
  return cur;
}
const tally = hist => ({ ok: hist.filter(h => h.ok).length, bad: hist.filter(h => !h.ok).length });

export function proposeTeam(cur, me, team) {
  const rd = cur.round; if (rd.phase !== 'pick' || leaderId(rd) !== me) return;
  const uniq = [...new Set(team)].filter(id => here(cur, id));
  if (uniq.length !== rd.sizes[rd.stage]) return;
  rd.team = uniq; rd.votes = null; rd.phase = 'approve';
  return cur;
}
// force = host สรุปโดยไม่รอคนที่ยังไม่โหวต (คนไม่โหวตนับเป็นไม่เห็นด้วย)
export function resolveApprove(cur, force) {
  const rd = cur.round; if (rd.phase !== 'approve') return;
  const ids = Object.keys(cur.players || {}); const votes = rd.votes || {};
  if (!force && !ids.every(id => id in votes)) return cur;
  const yes = ids.filter(id => votes[id] === true).length; const approved = yes > ids.length / 2;
  rd.lastVote = { stage: rd.stage, leader: leaderId(rd), team: rd.team, votes, approved, yes, total: ids.length, attempt: (rd.rejects || 0) + 1 };
  if (approved) { rd.phase = 'mission'; rd.cards = null; return cur; }
  rd.rejects = (rd.rejects || 0) + 1; rd.team = null; rd.votes = null;
  if (rd.rejects >= MAX_REJECT) return endGame(cur, 'bad', 'rejects');
  nextLeader(cur); rd.phase = 'pick';
  return cur;
}
export function castApprove(cur, me, yes) {
  const rd = cur.round; if (rd.phase !== 'approve' || !here(cur, me)) return;
  rd.votes = { ...(rd.votes || {}), [me]: !!yes };
  return resolveApprove(cur, false);
}
// force = host เปิดผลโดยไม่รอสมาชิกที่หลุด (คนที่ไม่ได้ส่งนับเป็นสำรวจต่อ)
export function resolveMission(cur, force) {
  const rd = cur.round; if (rd.phase !== 'mission') return;
  const team = (rd.team || []); const cards = rd.cards || {};
  if (!force && !team.filter(id => here(cur, id)).every(id => id in cards)) return cur;
  const fails = team.filter(id => cards[id] === 'f').length; const ok = fails < (rd.need?.[rd.stage] || 1);
  const entry = { stage: rd.stage, leader: leaderId(rd), team, fails, ok };
  const hist = [...(rd.history || []), entry]; rd.history = hist; rd.lastMission = entry;
  rd.team = null; rd.votes = null; rd.cards = null; rd.lastVote = null;
  const t = tally(hist);
  if (t.ok >= WIN_AT) { // ผ่านครบ → ให้ฝ่ายโจรได้ชี้ตัวผู้ถือตะเกียง 1 ครั้ง
    const hunters = Object.keys(cur.players || {}).filter(id => sideOf(rd.roles?.[id]) === 'bad');
    if (!hunters.length) return endGame(cur, 'good', 'stages');
    rd.phase = 'hunt'; return cur;
  }
  if (t.bad >= WIN_AT) return endGame(cur, 'bad', 'stages');
  rd.stage += 1; rd.rejects = 0; nextLeader(cur); rd.phase = 'pick';
  return cur;
}
export function playCard(cur, me, sabotage) {
  const rd = cur.round; if (rd.phase !== 'mission' || !(rd.team || []).includes(me) || rd.cards?.[me]) return;
  const canSabotage = sideOf(rd.roles?.[me]) === 'bad';
  rd.cards = { ...(rd.cards || {}), [me]: sabotage && canSabotage ? 'f' : 's' };
  return resolveMission(cur, false);
}
// โจรทุกคน (ที่ยังอยู่ในห้อง) ต้องชี้คนเดียวกันถึงจะสรุปผล — เปลี่ยนใจได้จนกว่าจะตรงกันครบ
export function huntLantern(cur, me, target) {
  const rd = cur.round; if (rd.phase !== 'hunt' || sideOf(rd.roles?.[me]) !== 'bad' || !here(cur, me) || !rd.roles?.[target] || sideOf(rd.roles[target]) === 'bad') return;
  rd.huntVotes = { ...(rd.huntVotes || {}), [me]: target };
  const hunters = Object.keys(cur.players || {}).filter(id => sideOf(rd.roles?.[id]) === 'bad');
  if (!hunters.every(id => rd.huntVotes[id] === target)) return cur;
  const hit = rd.roles[target] === 'lantern';
  rd.hunt = { by: hunters, target, hit };
  return endGame(cur, hit ? 'bad' : 'good', 'hunt');
}
// host ใช้เมื่อฝ่ายโจรหลุดหมด → นักสำรวจชนะ
export function skipHunt(cur) {
  const rd = cur.round; if (rd.phase !== 'hunt') return;
  rd.hunt = { skipped: true }; return endGame(cur, 'good', 'hunt');
}
export function skipLeader(cur) {
  const rd = cur.round; if (rd.phase !== 'pick') return;
  nextLeader(cur); return cur;
}

// ---------- หน้าจอ ----------
export function ExploreGame({ db, room, roomCode, myId, players, isHost, scores, sound, beep, nameOf, msg, onBack }) {
  const r = room.round; const res = room.status === 'result' && room.result;
  const [showRole, setShowRole] = useState(false);
  const [sel, setSel] = useState([]);
  const myRole = r.roles?.[myId]; const info = ROLE_INFO[myRole] || ROLE_INFO.explorer; const bad = info.side === 'bad';
  const leader = leaderId(r); const amLeader = leader === myId && !res;
  const size = r.sizes?.[r.stage]; const hist = r.history || []; const t = tally(hist);
  const team = r.team || []; const inTeam = team.includes(myId);
  const votes = r.votes || {}; const cards = r.cards || {};
  const mates = Object.keys(r.roles || {}).filter(id => id !== myId && sideOf(r.roles[id]) === 'bad');
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), cur => { if (!cur || cur.status !== 'playing' || cur.round?.kind !== 'explore') return; return f(cur); });

  const turnKey = `${r.stage}-${r.phase}-${r.leader}-${r.rejects}`;
  useEffect(() => { setSel([]); }, [turnKey]);
  // เสียงตามเหตุการณ์ในห้อง (ทุกเครื่องได้ยินพร้อมกัน) — เทียบกับสถานะก่อนหน้า ไม่เล่นตอนเพิ่งเปิดหน้า
  const prev = useRef(null);
  useEffect(() => {
    const lv = r.lastVote; const s = { phase: r.phase, turn: turnKey, vote: lv ? `${lv.stage}-${lv.attempt}-${lv.approved}` : '', hist: hist.length, res: !!res };
    const p = prev.current; prev.current = s; if (!p || !sound) return;
    if (s.res && !p.res) { if (room.result?.reason === 'hunt') sfx(sound, room.result.winner === 'bad' ? 'sabotage' : 'stageOk'); setTimeout(() => sfx(sound, room.result?.winner === info.side ? 'win' : 'lose'), 600); return; }
    let delay = 0;
    if (s.hist > p.hist) { sfx(sound, r.lastMission?.ok ? 'stageOk' : 'sabotage'); delay = 1100; }
    else if (s.vote !== p.vote && lv) { sfx(sound, lv.approved ? 'approved' : 'rejected'); delay = 600; }
    if (s.turn !== p.turn) {
      const next = r.phase === 'approve' ? 'propose' : r.phase === 'mission' ? 'march' : r.phase === 'hunt' ? 'tension' : r.phase === 'pick' && amLeader ? 'yourTurn' : null;
      if (next) setTimeout(() => sfx(sound, next), delay);
      if (r.phase === 'mission' && inTeam) setTimeout(() => sfx(sound, 'yourTurn'), delay + 900);
    }
  });

  const toggle = id => { if (!amLeader || r.phase !== 'pick') return; sfx(sound, 'click'); setSel(s => s.includes(id) ? s.filter(x => x !== id) : s.length >= size ? s : [...s, id]); };
  async function propose() { if (sel.length !== size) { msg(`เลือกให้ครบ ${size} คน`); return; } await tx(cur => proposeTeam(cur, myId, sel)); }
  async function approve(yes) { sfx(sound, 'vote'); await tx(cur => castApprove(cur, myId, yes)); }
  async function play(sab) { sfx(sound, 'click'); await tx(cur => playCard(cur, myId, sab)); }
  const seen = Object.keys(r.roles || {}).filter(id => r.roles[id] === 'traitor'); // ผู้ถือตะเกียงเห็นโจร ยกเว้นจอมแฝงตัว
  async function hunt(id) { sfx(sound, 'vote'); await tx(cur => huntLantern(cur, myId, id)); }
  const huntVotes = r.huntVotes || {};
  async function hostSkipHunt() { if (!confirm('ฝ่ายโจรหลุดหมดแล้ว? จบเกมให้นักสำรวจชนะ')) return; await tx(cur => skipHunt(cur)); }
  async function hostForce(kind) { if (!confirm(kind === 'approve' ? 'สรุปโหวตเลย? คนที่ยังไม่โหวตนับเป็นไม่เห็นด้วย' : 'เปิดผลเลย? สมาชิกที่ยังไม่ส่งนับเป็นสำรวจต่อ')) return; await tx(cur => kind === 'approve' ? resolveApprove(cur, true) : resolveMission(cur, true)); }
  async function hostSkip() { if (!confirm(`ข้ามหัวหน้าคณะ ${nameOf(leader)} ไปคนถัดไป?`)) return; await tx(cur => skipLeader(cur)); }

  const LV = r.lastVote; const LM = r.lastMission;
  const order = (r.order || []).filter(id => room.players?.[id]);

  return <div className="explore-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">✅ {t.ok} • 💥 {t.bad}</span></div>

    <div className="ex-map">{STAGES.map((s, i) => { const h = hist.find(x => x.stage === i); const cur = !res && i === r.stage;
      return <div key={i} className={'ex-stage' + (h ? (h.ok ? ' ok' : ' fail') : '') + (cur ? ' cur' : '')}>
        <span className="ex-icon">{h ? (h.ok ? '✅' : '💥') : s.icon}</span><b>{s.name}</b>
        <small>{r.sizes?.[i]} คน{r.need?.[i] > 1 ? ' • ต้องพัง 2 ใบ' : ''}</small>
      </div>; })}</div>
    <div className="ex-rejects"><span>คณะถูกค้านติดกัน</span>{Array.from({ length: MAX_REJECT }, (_, i) => <i key={i} className={i < (r.rejects || 0) ? 'on' : ''} />)}<small>ครบ {MAX_REJECT} = คณะแตก โจรชนะ</small></div>

    {!res && <div className="role-card ex-role">
      <span className="role-icon">{showRole ? info.icon : '🎒'}</span>
      <h3>{showRole ? info.name : 'บทบาทลับของคุณ'}</h3>
      {showRole ? <><p>{info.desc}</p>
        <p className={'ex-side ' + info.side}>{bad ? '🗡️ ฝ่ายโจร' : '🧭 ฝ่ายนักสำรวจ'}</p>
        {bad && <p>พวกเดียวกัน: <b>{mates.length ? mates.map(nameOf).join(', ') : '— ไม่มี —'}</b></p>}
        {myRole === 'lantern' && <p>🏮 โจรที่ตะเกียงส่องเห็น: <b className="bad">{seen.map(nameOf).join(', ') || '— ไม่มี —'}</b>{Object.values(r.roles || {}).includes('mole') && <><br />(มีจอมแฝงตัวอีก 1 คนที่คุณมองไม่เห็น)</>}</p>}
      </> : <p>กดเปิดดูคนเดียว ระวังคนแอบมองจอ!</p>}
      <button className="secondary" onClick={() => setShowRole(!showRole)}>{showRole ? <EyeOff size={16} /> : <Eye size={16} />} {showRole ? 'ซ่อนบทบาท' : 'เปิดดูบทบาท'}</button>
    </div>}

    {!res && LM && <div className={'ex-banner ' + (LM.ok ? 'ok' : 'fail')}>{STAGES[LM.stage].icon} ด่าน{STAGES[LM.stage].name}: {LM.ok ? 'ผ่านไปได้!' : 'พัง!'} — พบการก่อวินาศ <b>{LM.fails}</b> ใบ</div>}
    {!res && LV && r.phase === 'pick' && !LV.approved && <div className="ex-banner fail">❌ คณะของ {nameOf(LV.leader)} ถูกค้าน ({LV.yes}/{LV.total} เห็นด้วย) — {Object.entries(LV.votes || {}).map(([id, v]) => `${nameOf(id)} ${v ? '👍' : '👎'}`).join(' • ')}</div>}

    {!res && r.phase === 'pick' && <>
      <h2>{amLeader ? `คุณเป็นหัวหน้าคณะ! เลือก ${size} คนไป${STAGES[r.stage].name}` : `${nameOf(leader)} กำลังเลือกคณะ ${size} คน`}</h2>
      <div className="ex-pick">{order.map(id => <button key={id} disabled={!amLeader} className={'vote-row' + (sel.includes(id) ? ' selected' : '')} onClick={() => toggle(id)}><span>{id === leader && '👑 '}{nameOf(id)}{id === myId && ' (คุณ)'}</span><span>{sel.includes(id) ? '✓ ไปด้วย' : amLeader ? 'เลือก' : ''}</span></button>)}</div>
      {amLeader ? <button className="primary wide" disabled={sel.length !== size} onClick={propose}>🗺️ เสนอคณะนี้ ({sel.length}/{size})</button> : <div className="waiting">⏳ คุยกันได้ว่าควรพาใครไป แล้วรอหัวหน้าคณะเสนอ</div>}
      {isHost && !amLeader && <div className="head-host"><button className="link-btn" onClick={hostSkip}>ข้ามหัวหน้าคณะ {nameOf(leader)}</button></div>}
    </>}

    {!res && r.phase === 'approve' && <>
      <h2>เห็นด้วยกับคณะนี้ไหม?</h2>
      <p className="hint">หัวหน้าคณะ {nameOf(leader)} เสนอ — ต้องเห็นด้วยเกินครึ่งถึงได้ออกเดินทาง (ค้านมาแล้ว {r.rejects || 0} ครั้ง)</p>
      <div className="ex-team">{team.map(id => <span key={id}>{nameOf(id)}</span>)}</div>
      {myId in votes ? <div className="confirmed">✅ คุณโหวต {votes[myId] ? '👍 เห็นด้วย' : '👎 ค้าน'} แล้ว</div>
        : <div className="ex-two"><button className="primary" onClick={() => approve(true)}>👍 เห็นด้วย</button><button className="secondary" onClick={() => approve(false)}>👎 ค้าน</button></div>}
      <div className="ready-list"><div className="ready-head">🗳️ โหวตแล้ว <b>{players.filter(p => p.id in votes).length}/{players.length}</b> คน</div></div>
      {isHost && <div className="head-host"><button className="link-btn" onClick={() => hostForce('approve')}>สรุปโหวตเลย (ไม่รอ)</button></div>}
    </>}

    {!res && r.phase === 'hunt' && <>
      <h2>🗡️ ช่วงตามล่าผู้ถือตะเกียง</h2>
      <p className="hint">นักสำรวจผ่านครบ {WIN_AT} ด่านแล้ว! แต่ฝ่ายโจรยังมีโอกาสพลิก — โจรทุกคนต้องชี้คนเดียวกัน ชี้ถูกตัวผู้ถือตะเกียง = โจรชนะ</p>
      {bad ? <>
        <p className="hint">เพื่อนโจร: <b>{mates.map(nameOf).join(', ') || '— ไม่มี —'}</b> • แตะชื่อเพื่อชี้ เปลี่ยนใจได้ ระบบสรุปเมื่อโจรทุกคนชี้ตรงกัน</p>
        <div className="ex-pick">{order.filter(id => sideOf(r.roles?.[id]) !== 'bad').map(id => { const who = Object.keys(huntVotes).filter(b => huntVotes[b] === id && room.players?.[b]);
          return <button key={id} className={'vote-row' + (huntVotes[myId] === id ? ' selected' : '')} onClick={() => hunt(id)}><span>{nameOf(id)}</span><span>{who.length ? '🎯 ' + who.map(b => b === myId ? 'คุณ' : nameOf(b)).join(', ') : 'ชี้คนนี้'}</span></button>; })}</div>
        {huntVotes[myId] && <div className="waiting">⏳ รอเพื่อนโจรชี้ให้ตรงกัน…</div>}
      </> : <div className="waiting">⏳ ฝ่ายโจรกำลังเลือกว่าใครคือผู้ถือตะเกียง… {myRole === 'lantern' ? 'ทำตัวเนียน ๆ ไว้!' : 'ช่วยกันมั่วให้โจรสับสน!'}</div>}
      {isHost && <div className="head-host"><button className="link-btn" onClick={hostSkipHunt}>ฝ่ายโจรหลุดหมด — จบเกม</button></div>}
    </>}

    {!res && r.phase === 'mission' && <>
      <h2>{STAGES[r.stage].icon} คณะกำลังบุก{STAGES[r.stage].name}</h2>
      <div className="ex-team">{team.map(id => <span key={id} className={id in cards ? 'done' : ''}>{nameOf(id)}{id in cards ? ' ✓' : ''}</span>)}</div>
      {inTeam ? (cards[myId] ? <div className="confirmed">✅ ส่งการ์ดแล้ว รอเพื่อนร่วมคณะ</div>
        : <><p className="hint">{bad ? 'เลือกแบบลับ ๆ — ไม่มีใครเห็นว่าใครส่งอะไร เห็นแค่จำนวน' : 'นักสำรวจต้องส่ง "สำรวจต่อ" เสมอ'}</p>
          <div className="ex-two"><button className="primary" onClick={() => play(false)}>🔦 สำรวจต่อ</button>{bad && <button className="secondary danger" onClick={() => play(true)}>💣 ก่อวินาศ</button>}</div></>)
        : <div className="waiting">⏳ รอคณะส่งการ์ด {Object.keys(cards).length}/{team.length}</div>}
      {isHost && <div className="head-host"><button className="link-btn" onClick={() => hostForce('mission')}>เปิดผลเลย (ไม่รอคนหลุด)</button></div>}
    </>}

    {res && <>
      <h2>{res.winner === 'good' ? 'นักสำรวจคว้าสมบัติได้! 🏆' : 'โจรขุดสมบัติชนะ! 🗡️'}</h2>
      <div className="result-card"><div className="big-emoji">{res.winner === 'good' ? '💎' : '🏴‍☠️'}</div>
        <p>{res.reason === 'rejects' ? `คณะถูกค้านติดกัน ${MAX_REJECT} ครั้ง จนแตกคอกันเอง`
          : res.reason === 'hunt' ? (r.hunt?.skipped ? `ผ่านด่านครบ ${WIN_AT} ด่าน (ฝ่ายโจรไม่ได้ชี้ตัว)` : r.hunt?.hit ? `ผ่านด่านครบ ${WIN_AT} ด่าน แต่ฝ่ายโจรชี้ตัวผู้ถือตะเกียง ${nameOf(r.hunt.target)} ถูก! โจรพลิกชนะ 😱` : `ผ่านด่านครบ ${WIN_AT} ด่าน และโจรชี้ผิดคน (ชี้ ${nameOf(r.hunt?.target)})`)
          : res.winner === 'good' ? `ผ่านด่านครบ ${WIN_AT} ด่าน` : `ด่านพังครบ ${WIN_AT} ด่าน`}</p>
        <h4 className="ballot-title">บทบาทของแต่ละคน</h4>
        <ul className="role-list">{players.map(p => { const ri = ROLE_INFO[r.roles?.[p.id]] || ROLE_INFO.explorer; return <li key={p.id}><span>{p.name}</span><b className={ri.side === 'bad' ? 'spy' : ''}>{ri.icon} {ri.name}</b></li>; })}</ul>
        <h4 className="ballot-title">🏅 ตารางคะแนนสะสม</h4>
        <ol className="leaderboard">{[...players].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)).map((p, i) => { const d = res.points?.[p.id] || 0; return <li key={p.id} className={p.id === myId ? 'me' : ''}><span className="rank">{['🥇', '🥈', '🥉'][i] || i + 1}</span><span className="lb-name">{p.name}</span><em className={d > 0 ? 'up' : ''}>{d > 0 ? '+' + d : '±0'}</em><b>{scores[p.id] || 0}</b></li>; })}</ol>
      </div>
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}

    {hist.length > 0 && <><h4 className="ballot-title">📜 บันทึกการเดินทาง</h4><ul className="head-log">{[...hist].reverse().map((h, i) => <li key={i}>
      {STAGES[h.stage].icon} <b>{STAGES[h.stage].name}</b> — หัวหน้า {nameOf(h.leader)} พา {h.team.map(nameOf).join(', ')} → {h.ok ? <span className="ok">ผ่าน</span> : <span className="bad">พัง</span>} (ก่อวินาศ {h.fails})
    </li>)}</ul></>}
  </div>;
}
