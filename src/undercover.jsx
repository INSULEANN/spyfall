// เกม SPY แบบ Undercover
//   🕵️ นักสืบ     ได้คำ A — ชนะเมื่อโหวตจับ Undercover และ Mr. White ออกครบ
//   🥸 Undercover ได้คำ B (คล้าย A) และไม่รู้ตัวว่าเป็น Undercover — ชนะเมื่อจำนวน Undercover ที่เหลือ ≥ นักสืบที่เหลือ
//   👻 Mr. White  ไม่ได้คำ (หัวหน้าห้องเลือกเปิด/ปิดได้) — ชนะเมื่อโดนโหวตออกแล้วทายคำของนักสืบถูก
// รอบเล่น: ทุกคนที่ยังอยู่ใบ้คำทีละคน → โหวตออก 1 คน (เปิดบทบาท) → ซ้ำจนมีผู้ชนะ
import React, { useEffect, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint, pickBad } from './rand.js';
import { Avatar, Phase, PlayerGrid, WhoDone, Outcome, Leaderboard, HostBar, SecH, TimerRing, ActionSheet, Voters } from './ui.jsx';
import { UC_PACKS, ucPair } from './ucWords.js';

export const UC_MIN = 3, UC_MAX = 12;
export const UC_SCORE = { civ: 1, uc: 2, white: 3 };
export const VOTE_MS = 90000, WHITE_MS = 45000;
export const UC_ROLES = { civ: { n: 'นักสืบ', e: '🕵️', art: 'magnifier' }, uc: { n: 'Undercover', e: '🥸', art: 'spy' }, white: { n: 'Mr. White', e: '👻', art: 'think' } };
// จำนวน Undercover ตามจำนวนคน (นักสืบต้องเหลืออย่างน้อย 2)
export const ucCount = n => (n <= 6 ? 1 : n <= 9 ? 2 : 3);
export const whiteOk = n => n >= 4;
export function ucPlan(n, white) { const w = white && whiteOk(n) ? 1 : 0; const u = Math.max(1, Math.min(ucCount(n), n - w - 2)); return { uc: u, white: w, civ: n - u - w }; }
const norm = s => String(s || '').toLowerCase().replace(/[\s\-.'’"]/g, '');

export function makeUcRound(ids, set = {}, number = 1, t0 = Date.now(), hist = []) {
  const plan = ucPlan(ids.length, !!set.white);
  const bad = pickBad(ids, plan.uc + plan.white, hist); const roles = {};
  ids.forEach(id => { roles[id] = 'civ'; }); bad.forEach((id, i) => { roles[id] = i < plan.white ? 'white' : 'uc'; });
  const cats = (set.cats || []).filter(i => UC_PACKS[i]); const ci = cats.length ? cats[rint(cats.length)] : rint(UC_PACKS.length);
  const [a, b] = ucPair(UC_PACKS[ci]);
  let order = shuffle(ids); if (roles[order[0]] === 'white') { const k = order.findIndex(id => roles[id] !== 'white'); [order[0], order[k]] = [order[k], order[0]]; } // Mr. White ไม่ได้ใบ้คนแรก
  const alive = {}; ids.forEach(id => { alive[id] = true; });
  return { number, kind: 'uc', roles, words: { civ: a, uc: b }, cat: UC_PACKS[ci].name, order, alive, phase: 'clue', lap: 1, spoke: 0, at: t0 + 3000, turnMs: Math.max(0, +set.clueSec || 0) * 1000, votes: null, last: null, white: null, outs: [], log: [], startedAt: t0 };
}
export const ucNorm = r => { r.alive = r.alive || {}; r.votes = r.votes || null; r.outs = r.outs || []; r.log = r.log || []; r.spoke = r.spoke || 0; r.turnMs = r.turnMs || 0; return r; };
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
export const aliveIds = r => r.order.filter(id => r.alive[id]);
// ผู้พูดรอบนี้: เริ่มคนละคนในแต่ละรอบ (Mr. White ไม่ได้เริ่มก่อน ถ้าเลี่ยงได้)
export function speakers(r) {
  const al = aliveIds(r); if (!al.length) return al; let s = ((r.lap || 1) - 1) % al.length;
  if (r.roles[al[s]] === 'white' && al.length > 1) s = (s + 1) % al.length;
  return [...al.slice(s), ...al.slice(0, s)];
}
export const speakerOf = r => (r.phase === 'clue' ? speakers(r)[r.spoke] || null : null);
const count = (r, role) => aliveIds(r).filter(id => r.roles[id] === role).length;

function finish(cur, winner, why, now) {
  const r = cur.round; const pts = {}; const sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { const role = r.roles[id]; const p = !role ? 0 : winner === 'civ' ? (role === 'civ' ? UC_SCORE.civ : 0) : winner === 'uc' ? (role === 'uc' ? UC_SCORE.uc : 0) : role === 'white' ? UC_SCORE.white : 0; pts[id] = p; sc[id] = (sc[id] || 0) + p; });
  r.phase = 'done'; r.at = now; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'uc', winner, why, points: pts };
  return cur;
}
function nextLap(r, now) { r.phase = 'clue'; r.lap = (r.lap || 1) + 1; r.spoke = 0; r.votes = null; r.at = now; }
// เช็กผู้ชนะหลังมีคนออก
function settle(cur, now) {
  const r = cur.round; const civ = count(r, 'civ'), uc = count(r, 'uc'), wh = count(r, 'white');
  if (!uc && !wh) { say(r, '🎉 จับ Undercover และ Mr. White ได้ครบ — นักสืบชนะ!'); return finish(cur, 'civ', 'caught', now); }
  if (uc && uc >= civ) { say(r, '🥸 Undercover เหลือเท่านักสืบแล้ว — Undercover ชนะ!'); return finish(cur, 'uc', 'outnumber', now); }
  if (!uc && wh && civ <= 1) { // เหลือ Mr. White กับนักสืบคนเดียว → ให้ Mr. White ทายคำนัดสุดท้าย
    const id = aliveIds(r).find(x => r.roles[x] === 'white'); r.phase = 'white'; r.white = { id, until: now + WHITE_MS, final: true }; r.at = now;
    say(r, `👻 เหลือ {${id}} กับนักสืบคนเดียว — Mr. White ได้ทายคำนัดสุดท้าย`); return cur;
  }
  nextLap(r, now); return cur;
}
function eliminate(cur, id, now, why = 'vote') {
  const r = cur.round; r.alive = { ...r.alive, [id]: false }; const role = r.roles[id];
  r.outs = [...(r.outs || []), { id, role, lap: r.lap, why }]; r.last = { id, role, at: now, why };
  say(r, why === 'left' ? `🚪 {${id}} ออกจากเกม (${UC_ROLES[role].n})` : `🗳️ {${id}} ถูกโหวตออก — เป็น ${UC_ROLES[role].e} ${UC_ROLES[role].n}`);
  if (role === 'white' && why === 'vote') { r.phase = 'white'; r.white = { id, until: now + WHITE_MS, final: false }; r.at = now; return cur; }
  return settle(cur, now);
}

// ---------- การกระทำ (เรียกใน transaction) ----------
export function ucDoneSpeaking(cur, me, now, host) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'clue') return; const sp = speakers(r); const curId = sp[r.spoke];
  if (!curId || (me !== curId && !host)) return;
  r.spoke++; r.at = now; if (r.spoke >= sp.length) { r.phase = 'vote'; r.votes = null; say(r, `🗳️ ใบ้ครบรอบที่ ${r.lap} แล้ว — โหวตเอาคนน่าสงสัยออก 1 คน`); }
  return cur;
}
export function ucVote(cur, me, target, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'vote' || !r.alive[me] || !r.alive[target] || target === me) return;
  r.votes = { ...(r.votes || {}), [me]: target };
  if (aliveIds(r).every(id => r.votes[id])) return resolveVote(cur, now);
  return cur;
}
export function resolveVote(cur, now) {
  const r = cur.round; if (r.phase !== 'vote') return; const v = r.votes || {}; const c = {};
  aliveIds(r).forEach(id => { if (v[id] && r.alive[v[id]]) c[v[id]] = (c[v[id]] || 0) + 1; });
  const max = Math.max(0, ...Object.values(c)); const top = Object.keys(c).filter(k => c[k] === max);
  r.lastVote = { lap: r.lap, votes: v, counts: c };
  if (max === 0 || top.length !== 1) { r.last = { id: null, at: now, why: 'tie' }; say(r, '🤝 คะแนนเสมอ — ไม่มีใครออก ใบ้กันต่ออีกรอบ'); nextLap(r, now); return cur; }
  return eliminate(cur, top[0], now);
}
export function ucWhiteGuess(cur, me, guess, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'white' || r.white?.id !== me) return;
  const g = String(guess || '').trim().slice(0, 40); const ok = !!g && norm(g) === norm(r.words.civ);
  r.white = { ...r.white, guess: g || null, ok };
  if (ok) { say(r, `👻 {${me}} ทายถูก “${r.words.civ}” — Mr. White ชนะ!`); return finish(cur, 'white', 'guess', now); }
  say(r, g ? `👻 {${me}} ทายว่า “${g}” — ผิด!` : `👻 {${me}} ไม่ได้ทายคำ`);
  if (r.white.final) return finish(cur, 'civ', 'white-miss', now);
  r.white = null; return settle(cur, now);
}
// หมดเวลา: ใบ้ → ข้ามคน • โหวต → สรุปเท่าที่มี • Mr. White ทาย → นับว่าทายผิด
export function ucTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'uc' || cur.status !== 'playing') return;
  if (r.phase === 'clue' && r.turnMs > 0 && now >= r.at + r.turnMs) { const id = speakerOf(r); return ucDoneSpeaking(cur, id, now, true); }
  if (r.phase === 'vote' && now >= r.at + VOTE_MS) return resolveVote(cur, now);
  if (r.phase === 'white' && r.white && now >= r.white.until) return ucWhiteGuess(cur, r.white.id, '', now);
}
export function ucForce(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'uc') return;
  if (r.phase === 'clue') return ucDoneSpeaking(cur, speakerOf(r), now, true);
  if (r.phase === 'vote') return resolveVote(cur, now);
  if (r.phase === 'white') return ucWhiteGuess(cur, r.white.id, '', now);
}
export function kickUc(cur, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || !r.alive[id] || cur.players?.[id]) return;
  if (r.phase === 'white' && r.white?.id === id) r.white = null;
  if (r.votes) { const v = { ...r.votes }; delete v[id]; Object.keys(v).forEach(k => { if (v[k] === id) delete v[k]; }); r.votes = v; }
  if (r.phase === 'clue') { const sp = speakers(r); const k = sp.indexOf(id); if (k >= 0 && k < r.spoke) r.spoke--; }
  eliminate(cur, id, now, 'left'); return cur;
}

// ---------- หน้าจอ ----------
export function UcGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack, srvNow }) {
  const r = ucNorm({ ...room.round }); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'uc') return; ucNorm(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const [peek, setPeek] = useState(false); const [guess, setGuess] = useState('');
  const myRole = r.roles[myId]; const meIn = myRole != null; const meAlive = !!r.alive[myId];
  const myWord = myRole === 'civ' ? r.words.civ : myRole === 'uc' ? r.words.uc : null;
  const al = aliveIds(r); const sp = speakers(r); const curSp = speakerOf(r); const lapLeft = sp.length - r.spoke;
  const votes = r.votes || {};
  // หมดเวลา → ทุกเครื่องช่วยกันเลื่อน (transaction กันซ้ำ)
  const due = !res && ((r.phase === 'clue' && r.turnMs > 0 && srvNow >= r.at + r.turnMs) || (r.phase === 'vote' && srvNow >= r.at + VOTE_MS) || (r.phase === 'white' && r.white && srvNow >= r.white.until));
  useEffect(() => { if (due) tx(c => ucTick(c, srvNow)); }, [due, r.at, r.phase]);
  useEffect(() => { if (curSp === myId) sfx(sound, 'yourTurn'); }, [curSp === myId, r.lap, r.spoke]);
  useEffect(() => { setGuess(''); }, [r.phase]);
  const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const roleChip = id => { const x = r.roles[id]; return <span className={'tag ' + (x === 'civ' ? 'good' : 'bad')}>{UC_ROLES[x].e} {UC_ROLES[x].n}</span>; };
  const outIds = r.outs.map(o => o.id);

  if (res) {
    const W = res.winner; const myWin = (W === 'civ' && myRole === 'civ') || (W === 'uc' && myRole === 'uc') || (W === 'white' && myRole === 'white');
    return <div className="uc-game">
      <Outcome art={myWin ? 'win' : 'lose'} tone={myWin ? 'good' : ''} title={W === 'civ' ? '🕵️ นักสืบชนะ!' : W === 'uc' ? '🥸 Undercover ชนะ!' : '👻 Mr. White ชนะ!'}>
        {res.why === 'caught' ? 'จับ Undercover' + (r.order.some(id => r.roles[id] === 'white') ? ' และ Mr. White' : '') + ' ได้ครบ' : res.why === 'outnumber' ? 'Undercover เหลือเท่านักสืบแล้ว' : res.why === 'guess' ? `Mr. White ทายคำถูก “${r.words.civ}”` : res.why === 'white-miss' ? 'Mr. White ทายคำนัดสุดท้ายผิด' : ''}
      </Outcome>
      <div className="uc-words"><span>🕵️ คำของนักสืบ <b>{r.words.civ}</b></span><span>🥸 คำของ Undercover <b>{r.words.uc}</b></span><small>หมวด {r.cat}</small></div>
      <SecH icon="🎭">บทบาทของทุกคน</SecH>
      <div className="uc-roles">{r.order.map(id => <div key={id} className={'uc-rc ' + r.roles[id]}><Avatar id={id} av={av} size={36} dead={!r.alive[id]} /><b>{nameOf(id)}</b>{roleChip(id)}</div>)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </div>;
  }

  return <div className="uc-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number} • ใบ้รอบที่ {r.lap}</span><span className="cat-tag">หมวด: {r.cat}</span></div>
    {/* คำของฉัน (Undercover ไม่รู้ตัว — เห็นแค่คำ) */}
    {meIn && <div className={'uc-card' + (peek ? ' open' : '')} onClick={() => setPeek(p => !p)}>
      {peek ? (myRole === 'white' ? <><span className="uc-ico">👻</span><div><b>คุณคือ Mr. White</b><small>คุณไม่มีคำ! ฟังเพื่อนใบ้แล้วใบ้ให้เนียน • ถ้าโดนโหวตออก ทายคำของนักสืบให้ถูกเพื่อชนะ</small></div></>
        : <><span className="uc-ico">🔑</span><div><small>คำของคุณ</small><b className="uc-word">{myWord}</b><small>ใบ้อ้อม ๆ ให้พวกเดียวกันรู้ — คุณอาจเป็นนักสืบ หรือ Undercover ก็ได้!</small></div></>)
        : <><span className="uc-ico">🙈</span><div><b>แตะเพื่อดูคำของคุณ</b><small>ดูคนเดียว ระวังคนแอบมอง</small></div></>}
    </div>}
    {!meAlive && meIn && <div className="tip">👻 คุณถูกโหวตออกแล้ว — ดูต่อได้ แต่ห้ามใบ้เพื่อน</div>}

    {/* คนที่เพิ่งออก */}
    {r.last && r.last.id && r.phase !== 'white' && <Phase art={r.last.role === 'civ' ? 'tombstone' : 'handcuffs'} tone={r.last.role === 'civ' ? 'bad' : 'good'} kicker="🗳️ ผลโหวตล่าสุด" title={<>{nameOf(r.last.id)} {r.last.why === 'left' ? 'ออกจากเกม' : 'ถูกโหวตออก'} — {UC_ROLES[r.last.role].e} {UC_ROLES[r.last.role].n}</>}>{r.last.role === 'civ' ? 'โอ๊ย! จับผิดคน นักสืบหายไป 1 คน' : r.last.role === 'uc' ? 'เยี่ยม! จับ Undercover ได้ 1 คน' : 'Mr. White ทายคำผิด อดชนะ'}</Phase>}
    {r.last && !r.last.id && r.phase === 'clue' && <Phase art="vote" kicker="🗳️ ผลโหวตล่าสุด" title="คะแนนเสมอ — ไม่มีใครออก">ใบ้กันต่ออีกรอบ แล้วโหวตใหม่</Phase>}

    {/* ใบ้คำ */}
    {r.phase === 'clue' && curSp && <section className={'clue-turn' + (curSp === myId ? ' me' : '')}>
      <div className="ct-main">
        <div className="ct-av" key={curSp}><Avatar id={curSp} av={av} size={74} />{curSp === myId && <span className="ct-mic">🎤</span>}</div>
        <div className="ct-text"><span className="ct-kicker">🎙️ ใบ้รอบที่ {r.lap} • เหลืออีก {lapLeft} คน</span>
          <h2>{curSp === myId ? 'ตาคุณ! พูดใบ้คำ 1 อย่าง' : <>ตาของ {nameOf(curSp)}</>}</h2>
          <small>{curSp === myId ? (myRole === 'white' ? 'คุณไม่มีคำ — ใบ้ให้กลาง ๆ เข้ากับที่เพื่อนพูดมา' : 'ใบ้อ้อม ๆ อย่าบอกตรง ๆ • พูดจบกดปุ่มด้านล่าง') : 'ฟังให้ดี ใครใบ้แปลก ๆ ไม่เข้าพวก?'}</small></div>
        {r.turnMs > 0 ? <TimerRing secs={secs(r.at + r.turnMs - srvNow)} total={r.turnMs / 1000} size={58} label="วิ" /> : <span className="ct-free">⏳<small>ไม่จับเวลา</small></span>}
      </div>
      <div className="ct-order">{sp.map((id, k) => <span key={id} className={'ct-chip' + (id === curSp ? ' now' : '') + (k < r.spoke ? ' done' : '') + (id === myId ? ' mine' : '')}><Avatar id={id} av={av} size={26} /><b>{k < r.spoke ? '✓' : k + 1}</b></span>)}</div>
      {(curSp === myId || isHost) && <button className={curSp === myId ? 'primary wide' : 'secondary wide'} onClick={() => { sfx(sound, 'click'); tx(c => ucDoneSpeaking(c, myId, srvNow, isHost)); }}>{curSp === myId ? '✅ พูดเสร็จแล้ว ไปคนถัดไป' : `⏭️ ข้าม ${nameOf(curSp)} (หัวหน้าห้อง)`}</button>}
    </section>}

    {/* โหวต */}
    {r.phase === 'vote' && <>
      <Phase art="vote" tone={meAlive && !votes[myId] ? 'me' : ''} kicker={`🗳️ โหวตรอบที่ ${r.lap}`} title={meAlive ? (votes[myId] ? `คุณโหวต ${nameOf(votes[myId])} แล้ว (เปลี่ยนใจได้)` : 'ใครน่าสงสัยที่สุด?') : 'เพื่อนกำลังโหวต…'} aside={<TimerRing secs={secs(r.at + VOTE_MS - srvNow)} total={VOTE_MS / 1000} label="วิ" />}>เสียงมากสุดออก 1 คน แล้วเปิดบทบาท • เสมอ = ไม่มีใครออก</Phase>
      <PlayerGrid ids={al.filter(id => id !== myId)} av={av} nameOf={nameOf} selected={votes[myId]} onPick={meAlive ? t => { sfx(sound, 'vote'); tx(c => ucVote(c, myId, t, srvNow)); } : undefined}
        badge={id => <Voters ids={al.filter(v => votes[v] === id)} av={av} size={20} />} />
      <WhoDone ids={al} done={id => !!votes[id]} av={av} nameOf={nameOf} label="🗳️ โหวตแล้ว" />
      <ActionSheet open={meAlive && !votes[myId]} k={'v' + r.lap} icon="🗳️" title="โหวตเอาใครออก?" sub="แตะคนที่น่าสงสัยที่สุด (เปลี่ยนใจทีหลังได้)" secs={secs(r.at + VOTE_MS - srvNow)} total={VOTE_MS / 1000}>
        <PlayerGrid ids={al.filter(id => id !== myId)} av={av} nameOf={nameOf} onPick={t => { sfx(sound, 'vote'); tx(c => ucVote(c, myId, t, srvNow)); }} badge={() => <span className="tag">🗳️ โหวต</span>} />
      </ActionSheet>
    </>}

    {/* Mr. White ทายคำ */}
    {r.phase === 'white' && r.white && <>
      <Phase art="think" tone={r.white.id === myId ? 'me' : 'bad'} kicker={r.white.final ? '👻 นัดสุดท้าย' : '🗳️ ถูกโหวตออก'} title={`${nameOf(r.white.id)} คือ Mr. White!`} aside={<TimerRing secs={secs(r.white.until - srvNow)} total={WHITE_MS / 1000} label="วิ" />}>{r.white.id === myId ? 'ทายคำของนักสืบให้ถูก แล้วคุณชนะทันที!' : 'Mr. White กำลังทายคำของนักสืบ… ถ้าถูก Mr. White ชนะทันที'}</Phase>
      <ActionSheet open={r.white.id === myId} k={'w' + r.lap} icon="👻" title="ทายคำของนักสืบ" sub="ทายถูก = ชนะทันที • มีโอกาสครั้งเดียว" secs={secs(r.white.until - srvNow)} total={WHITE_MS / 1000}>
        <input className="uc-guess" autoFocus value={guess} maxLength={40} placeholder="พิมพ์คำที่คิดว่าเป็นคำของนักสืบ" onChange={e => setGuess(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && guess.trim()) tx(c => ucWhiteGuess(c, myId, guess, srvNow)); }} />
        <button className="primary wide" disabled={!guess.trim()} onClick={() => { sfx(sound, 'confirm'); tx(c => ucWhiteGuess(c, myId, guess, srvNow)); }}>🎯 ทายคำนี้</button>
      </ActionSheet>
    </>}

    {/* ผู้เล่น */}
    <SecH icon="👥">ผู้เล่น <small>เหลือ {al.length} คน • ออกแล้ว {outIds.length}</small></SecH>
    <div className="uc-roles">{r.order.map(id => <div key={id} className={'uc-rc' + (r.alive[id] ? '' : ' out ' + r.roles[id])}><Avatar id={id} av={av} size={36} dead={!r.alive[id]} /><b>{id === myId ? 'คุณ' : nameOf(id)}</b>{r.alive[id] ? <small>ยังอยู่</small> : roleChip(id)}</div>)}</div>
    <p className="hint">🕵️ นักสืบ {ucPlan(r.order.length, r.order.some(id => r.roles[id] === 'white')).civ} • 🥸 Undercover {r.order.filter(id => r.roles[id] === 'uc').length}{r.order.some(id => r.roles[id] === 'white') ? ' • 👻 Mr. White 1' : ''} — Undercover ไม่รู้ตัวว่าได้คำต่างจากเพื่อน</p>
    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 8).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    {isHost && <HostBar>
      <button className="secondary" onClick={() => { if (confirm(r.phase === 'clue' ? `ข้ามตา ${nameOf(curSp)}?` : r.phase === 'vote' ? 'สรุปโหวตเลย? (คนที่ยังไม่โหวตไม่นับ)' : 'ข้าม Mr. White (นับว่าทายผิด)?')) tx(c => ucForce(c, srvNow)); }}>{r.phase === 'clue' ? '⏭️ ข้ามคนพูด' : r.phase === 'vote' ? '⏩ สรุปโหวตเลย' : '⏩ ข้ามการทาย'}</button>
      {al.filter(id => !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickUc(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
    </HostBar>}
  </div>;
}

// ---------- ห้องรอ: เลือก Mr. White / หมวดคำ / เวลาใบ้ ----------
export function UcLobby({ db, roomCode, room, players, isHost, sound }) {
  const set = room.settings?.uc || {}; const n = players.length; const plan = ucPlan(n, !!set.white);
  const cats = set.cats || []; const all = UC_PACKS.map((_, i) => i); const on = i => !cats.length || cats.includes(i);
  const save = patch => runTransaction(ref(db, `rooms/${roomCode}/settings/uc`), c => ({ ...(c || {}), ...patch })).catch(() => {});
  const toggleCat = i => { sfx(sound, 'select'); const cur = cats.length ? cats : all; const nx = cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i]; if (!nx.length) return; save({ cats: nx.length === all.length ? null : nx }); };
  return <div className="uc-lobby">
    <label className={'uc-white' + (set.white ? ' on' : '')}><input type="checkbox" checked={!!set.white} disabled={!isHost} onChange={e => { sfx(sound, 'select'); save({ white: e.target.checked }); }} />
      <span><b>👻 มี Mr. White</b><small>ไม่ได้คำเลย • โดนโหวตออกแล้วทายคำนักสืบถูก = ชนะ{!whiteOk(n) ? ' • ต้องมี 4 คนขึ้นไป' : ''}</small></span></label>
    <div className="uc-plan">วงนี้ ({n} คน): 🕵️ นักสืบ <b>{plan.civ}</b> • 🥸 Undercover <b>{plan.uc}</b>{plan.white ? <> • 👻 Mr. White <b>1</b></> : ''}</div>
    <label>🎙️ เวลาใบ้ต่อคน {isHost ? '' : '(หัวหน้าห้องตั้ง)'}</label>
    <select value={set.clueSec ?? 0} disabled={!isHost} onChange={e => save({ clueSec: +e.target.value })}><option value={0}>ไม่จับเวลา (กดข้ามเอง)</option><option value={15}>15 วินาที</option><option value={20}>20 วินาที</option><option value={30}>30 วินาที</option><option value={45}>45 วินาที</option><option value={60}>1 นาที</option></select>
    <label>📚 หมวดคำ {isHost ? '(แตะเพื่อเปิด/ปิด)' : ''}</label>
    <div className="uc-cats">{UC_PACKS.map((p, i) => <button key={i} type="button" className={'uc-cat' + (on(i) ? ' on' : '')} disabled={!isHost} onClick={() => toggleCat(i)}>{p.name}<small>{p.groups.reduce((a, g) => a + g.length, 0)} คำ</small></button>)}</div>
  </div>;
}
