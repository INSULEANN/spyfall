// เกม "ออกสำรวจ" — เกมแนวแฝงตัว/ทีมลับ: คณะนักสำรวจต้องผ่านด่านให้ได้ 3 ด่าน ขณะที่หนอนบ่อนไส้คอยก่อวินาศ
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { Art } from './play-art.jsx';
import { Phase, Steps, PlayerGrid, WhoDone, RoleCard, Outcome, RevealGrid, Leaderboard, HostBar, SecH, Avatar, Voters, Choice } from './ui.jsx';
import { play as sfx } from './sfx.js';
import { ExploreStage } from './stages.jsx';
import { shuffle, pickBad } from './rand.js';

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


export function makeExploreRound(ids, opts = {}, number = 1) {
  const n = ids.length;
  const bad = shuffle(pickBad(ids, traitorCount(n), opts.hist));
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
const ROLE_ART = { explorer: 'explorer', lantern: 'lantern', traitor: 'dagger', mole: 'snake' };
export function ExploreGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack }) {
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
  async function propose() { if (sel.length !== size) { msg(`เลือกให้ครบ ${size} คน`); return; } sfx(sound, 'confirm'); await tx(cur => proposeTeam(cur, myId, sel)); }
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
  const ST = STAGES[r.stage] || STAGES[0];
  const stepAt = r.phase === 'pick' ? 0 : r.phase === 'approve' ? 1 : r.phase === 'mission' ? 2 : 3;

  return <div className="explore-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">✅ {t.ok} • 💥 {t.bad}</span></div>

    <ExploreStage mode={res ? (room.result?.winner === 'good' ? 'win' : 'lose') : r.phase} stage={r.stage} hist={hist} />
    {/* แผนที่การเดินทาง */}
    <div className="ex-map">{STAGES.map((s, i) => { const h = hist.find(x => x.stage === i); const cur = !res && i === r.stage;
      return <div key={i} className={'ex-stage' + (h ? (h.ok ? ' ok' : ' fail') : '') + (cur ? ' cur' : '')}>
        <span className="ex-icon">{h ? (h.ok ? '🚩' : '💥') : s.icon}</span><b>{s.name}</b>
        <small>{r.sizes?.[i]} คน{r.need?.[i] > 1 ? ' • พัง 2 ใบ' : ''}</small>
      </div>; })}</div>
    <div className="ex-score"><span className="good">นักสำรวจ {Array.from({ length: WIN_AT }, (_, i) => <i key={i} className={i < t.ok ? 'on' : ''} />)} ผ่าน {WIN_AT} ด่านชนะ</span><span className="bad">โจร {Array.from({ length: WIN_AT }, (_, i) => <i key={i} className={i < t.bad ? 'on' : ''} />)} พัง {WIN_AT} ด่านชนะ</span></div>
    <div className="ex-rejects"><span>คณะถูกค้านติดกัน</span>{Array.from({ length: MAX_REJECT }, (_, i) => <i key={i} className={i < (r.rejects || 0) ? 'on' : ''} />)}<small>ครบ {MAX_REJECT} = คณะแตก โจรชนะ</small></div>
    {!res && r.phase !== 'hunt' && <Steps items={['หัวหน้าเลือกคณะ', 'ทุกคนโหวต', 'คณะส่งการ์ด']} at={stepAt} />}

    {!res && LM && r.phase !== 'mission' && <div className={'event ' + (LM.ok ? 'ok' : 'fail')}><Art name={LM.ok ? 'flag' : 'bomb'} size={46} /><span><b>ด่าน{STAGES[LM.stage].name}: {LM.ok ? 'ผ่านไปได้!' : 'พัง!'}</b><br />พบการ์ดก่อวินาศ <b>{LM.fails}</b> ใบ • คณะ: {LM.team.map(nameOf).join(', ')}</span></div>}
    {!res && LV && r.phase === 'pick' && !LV.approved && <div className="event fail"><Art name="cross" size={46} /><span><b>คณะของ {nameOf(LV.leader)} ถูกค้าน</b> ({LV.yes}/{LV.total} เห็นด้วย)<span className="ev-votes">{Object.entries(LV.votes || {}).map(([id, v]) => <span key={id} className={v ? 'y' : 'n'}><Avatar id={id} av={av} size={22} />{v ? '👍' : '👎'}</span>)}</span></span></div>}

    {/* เลือกคณะ */}
    {!res && r.phase === 'pick' && <>
      <Phase art="crown" tone={amLeader ? 'me' : ''} kicker={`${ST.icon} ด่านที่ ${r.stage + 1}: ${ST.name}`} title={amLeader ? `คุณเป็นหัวหน้าคณะ! เลือก ${size} คน` : `${nameOf(leader)} กำลังเลือกคณะ ${size} คน`}>
        {amLeader ? 'แตะรูปเพื่อเลือกคนไปด้วย (เลือกตัวเองก็ได้) แล้วกดเสนอ — ทุกคนจะโหวตว่าเห็นด้วยไหม' : 'คุยกันได้ว่าควรพาใครไป แล้วรอหัวหน้าคณะเสนอ'}</Phase>
      <PlayerGrid ids={order} av={av} nameOf={nameOf} myId={myId} selected={sel} onPick={amLeader ? toggle : undefined} badge={id => id === leader ? <span className="tag">👑 หัวหน้า</span> : null} />
      {amLeader ? <button className="primary wide" disabled={sel.length !== size} onClick={propose}>🗺️ เสนอคณะนี้ ({sel.length}/{size})</button> : <div className="waiting">⏳ รอหัวหน้าคณะเสนอ…</div>}
      {isHost && !amLeader && <HostBar><button className="secondary" onClick={hostSkip}>⏭️ ข้ามหัวหน้าคณะ {nameOf(leader)}</button></HostBar>}
    </>}

    {/* โหวตคณะ */}
    {!res && r.phase === 'approve' && <>
      <Phase art="approve" tone={myId in votes ? 'good' : 'me'} kicker={`${ST.icon} ด่าน${ST.name} • ค้านมาแล้ว ${r.rejects || 0} ครั้ง`} title="เห็นด้วยกับคณะนี้ไหม?">{nameOf(leader)} เสนอคณะด้านล่าง — ต้องเห็นด้วย<b>เกินครึ่ง</b>ถึงได้ออกเดินทาง</Phase>
      <SecH icon="🎒">คณะที่เสนอ <small>{team.length} คน</small></SecH>
      <PlayerGrid ids={team} av={av} nameOf={nameOf} myId={myId} small />
      {myId in votes ? <div className="confirmed">✅ คุณโหวต {votes[myId] ? '👍 เห็นด้วย' : '👎 ค้าน'} แล้ว — รอคนอื่น</div>
        : <div className="choices"><Choice art="check" label="เห็นด้วย" sub="ให้คณะนี้ออกเดินทาง" tone="good" onClick={() => approve(true)} /><Choice art="cross" label="ค้าน" sub="ให้หัวหน้าคนถัดไปเสนอใหม่" tone="bad" onClick={() => approve(false)} /></div>}
      <WhoDone ids={order} done={id => id in votes} av={av} nameOf={nameOf} label="🗳️ โหวตแล้ว" />
      {isHost && <HostBar><button className="secondary" onClick={() => hostForce('approve')}>สรุปโหวตเลย (ไม่รอ)</button></HostBar>}
    </>}

    {/* ตามล่าผู้ถือตะเกียง */}
    {!res && r.phase === 'hunt' && <>
      <Phase art="target" tone="bad" kicker="🗡️ โอกาสสุดท้ายของโจร" title="ตามล่าผู้ถือตะเกียง!">นักสำรวจผ่านครบ {WIN_AT} ด่านแล้ว แต่ถ้าโจร<b>ทุกคนชี้คนเดียวกัน</b>และชี้ถูกตัวผู้ถือตะเกียง = โจรพลิกชนะ</Phase>
      {bad ? <>
        <SecH icon="🎯">ใครคือผู้ถือตะเกียง? <small>แตะรูป เปลี่ยนใจได้</small></SecH>
        <PlayerGrid ids={order.filter(id => sideOf(r.roles?.[id]) !== 'bad')} av={av} nameOf={nameOf} myId={myId} selected={huntVotes[myId]} onPick={hunt}
          badge={id => { const who = Object.keys(huntVotes).filter(b => huntVotes[b] === id && room.players?.[b]); return who.length ? <Voters ids={who} av={av} size={20} /> : null; }} />
        <p className="hint">เพื่อนโจร: <b>{mates.map(nameOf).join(', ') || '— ไม่มี —'}</b> • ระบบสรุปเมื่อโจรทุกคนชี้ตรงกัน</p>
      </> : <div className="waiting">⏳ ฝ่ายโจรกำลังเลือกว่าใครคือผู้ถือตะเกียง… {myRole === 'lantern' ? 'ทำตัวเนียน ๆ ไว้!' : 'ช่วยกันมั่วให้โจรสับสน!'}</div>}
      {isHost && <HostBar><button className="secondary" onClick={hostSkipHunt}>ฝ่ายโจรหลุดหมด — จบเกม</button></HostBar>}
    </>}

    {/* ส่งการ์ดสำรวจ */}
    {!res && r.phase === 'mission' && <>
      <Phase art="cards" tone={inTeam && !cards[myId] ? 'me' : ''} kicker={`${ST.icon} ด่านที่ ${r.stage + 1}`} title={`คณะกำลังบุก${ST.name}`}>
        {inTeam ? (cards[myId] ? 'ส่งการ์ดแล้ว รอเพื่อนร่วมคณะ' : bad ? 'เลือกการ์ดแบบลับ ๆ — ทุกคนเห็นแค่จำนวนการ์ดก่อวินาศ ไม่รู้ว่าใครส่ง' : 'นักสำรวจต้องส่ง “สำรวจต่อ” เสมอ') : `มีการ์ดก่อวินาศ ${r.need?.[r.stage] > 1 ? '2 ใบขึ้นไป' : 'แม้แต่ใบเดียว'} = ด่านพัง`}</Phase>
      <PlayerGrid ids={team} av={av} nameOf={nameOf} myId={myId} small badge={id => id in cards ? <span className="tag good">✓ ส่งแล้ว</span> : <span className="ptile-note">กำลังเลือก…</span>} />
      {inTeam && !cards[myId] && <div className="choices"><Choice art="lantern" label="สำรวจต่อ" sub="ช่วยให้ผ่านด่าน" tone="good" onClick={() => play(false)} />{bad ? <Choice art="bomb" label="ก่อวินาศ" sub="แอบทำให้ด่านพัง" tone="bad" onClick={() => play(true)} /> : <Choice art="explorer" label="นักสำรวจ" sub="ส่งได้แค่สำรวจต่อ" disabled />}</div>}
      {isHost && <HostBar><button className="secondary" onClick={() => hostForce('mission')}>เปิดผลเลย (ไม่รอคนหลุด)</button></HostBar>}
    </>}

    {/* บทบาท */}
    {!res && <RoleCard show={showRole} onToggle={() => setShowRole(!showRole)} art={ROLE_ART[myRole] || 'explorer'} cover="map" name={info.name} side={bad ? 'bad' : 'good'} sideLabel={bad ? '🗡️ ฝ่ายโจร' : '🧭 ฝ่ายนักสำรวจ'}>
      <p>{info.desc}</p>
      {bad && <div className="info-line">พวกเดียวกัน: {mates.length ? <><Voters ids={mates} av={av} /> <b>{mates.map(nameOf).join(', ')}</b></> : '— ไม่มี —'}</div>}
      {myRole === 'lantern' && <div className="info-line">🏮 โจรที่ส่องเห็น: {seen.length ? <><Voters ids={seen} av={av} /> <b className="bad">{seen.map(nameOf).join(', ')}</b></> : '— ไม่มี —'}{Object.values(r.roles || {}).includes('mole') && <small> (มีจอมแฝงตัวอีก 1 คนที่มองไม่เห็น)</small>}</div>}
    </RoleCard>}

    {/* จบเกม */}
    {res && <>
      <Outcome art={res.winner === 'good' ? 'treasure' : 'skull'} tone={res.winner === 'good' ? 'good' : 'bad'} title={res.winner === 'good' ? 'นักสำรวจคว้าสมบัติได้! 🏆' : 'โจรขุดสมบัติชนะ! 🗡️'}>
        {res.reason === 'rejects' ? `คณะถูกค้านติดกัน ${MAX_REJECT} ครั้ง จนแตกคอกันเอง`
          : res.reason === 'hunt' ? (r.hunt?.skipped ? `ผ่านด่านครบ ${WIN_AT} ด่าน (ฝ่ายโจรไม่ได้ชี้ตัว)` : r.hunt?.hit ? `ผ่านด่านครบ ${WIN_AT} ด่าน แต่โจรชี้ตัวผู้ถือตะเกียง ${nameOf(r.hunt.target)} ถูก! โจรพลิกชนะ 😱` : `ผ่านด่านครบ ${WIN_AT} ด่าน และโจรชี้ผิดคน (ชี้ ${nameOf(r.hunt?.target)})`)
          : res.winner === 'good' ? `ผ่านด่านครบ ${WIN_AT} ด่าน` : `ด่านพังครบ ${WIN_AT} ด่าน`}
      </Outcome>
      <SecH icon="🎭">บทบาทของแต่ละคน</SecH>
      <RevealGrid av={av} nameOf={nameOf} items={players.map(p => { const k = r.roles?.[p.id]; const ri = ROLE_INFO[k] || ROLE_INFO.explorer; return { id: p.id, art: ROLE_ART[k] || 'explorer', label: ri.name, bad: ri.side === 'bad' }; })} />
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH>
      <Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}

    {hist.length > 0 && <><SecH icon="📜">บันทึกการเดินทาง</SecH><ul className="head-log">{[...hist].reverse().map((h, i) => <li key={i}>
      {STAGES[h.stage].icon} <b>{STAGES[h.stage].name}</b> — หัวหน้า {nameOf(h.leader)} พา <Voters ids={h.team} av={av} size={20} /> {h.team.map(nameOf).join(', ')} → {h.ok ? <span className="ok">ผ่าน</span> : <span className="bad">พัง</span>} (ก่อวินาศ {h.fails})
    </li>)}</ul></>}
  </div>;
}
