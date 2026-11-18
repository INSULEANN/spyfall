// เกม ไพ่เนียนยาดอง — วงไพ่โกหกในร้านยาดองป้าแป๋ว (แนวเดียวกับเกมไพ่บลัฟ/ไพ่โกหก)
//   ทุกตาแจกไพ่กับแกล้ม 5 ใบ แล้วป้าแป๋วประกาศ "กับแกล้มประจำวง" (ถั่ว / หมึก / ไข่) • ไหยาดอง = ไพ่แทนอะไรก็ได้
//   ตาเรา: ลงไพ่คว่ำ 1–3 ใบ แล้วบอกว่า "เป็นกับแกล้มประจำวงทั้งหมด" (โกหกได้)
//   คนถัดไป: ลงต่อ หรือ ตะโกน "โกหก!" → เปิดไพ่ชุดล่าสุด โกหกจริง = คนลงดื่ม, ไม่โกหก = คนเรียกดื่ม
//   ดื่ม "แก้วลุ้น": แก้วที่ 1 มีโอกาสฟุบ 1/6, แก้วที่ 2 = 1/5 … ฟุบแล้วออกจากวง • เหลือคนสุดท้าย = ชนะ
//   ไม่มีไพ่ในมือตอนถึงตา = ต้องเรียก "โกหก!" (กันเกมค้าง) • เรียกแล้วแจกไพ่ใหม่ทั้งวง คนดื่ม (ถ้ายังรอด) เริ่มก่อน
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint } from './rand.js';
import { Avatar, Outcome, Leaderboard, HostBar, SecH, TimerRing, ActionSheet } from './ui.jsx';
import './yadong.css';

export const YD_MIN = 2, YD_MAX = 6, YD_SCORE = 2, HAND = 5;
export const SNACKS = [{ n: 'ถั่วทอด', c: '#f3c98a' }, { n: 'หมึกย่าง', c: '#f7a38a' }, { n: 'ไข่ต้ม', c: '#fff4c2' }];
export const WILD = 3; // ไหยาดอง = แทนอะไรก็ได้
export const CARD_N = [...SNACKS.map(s => s.n), 'ไหยาดอง'];
export const PLAY_MS = 40000, SHOT_MS = 7500, REVEAL_AT = 3600;
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
const arr = a => Array.isArray(a) ? a.filter(x => x != null).map(Number) : a ? Object.values(a).map(Number) : [];
export const fix = r => {
  r.order = r.order || []; r.out = r.out || {}; r.gone = r.gone || {}; r.shots = r.shots || {}; r.log = r.log || []; r.hands = r.hands || {};
  r.order.forEach(id => { r.hands[id] = arr(r.hands[id]); r.shots[id] = +r.shots[id] || 0; });
  if (r.lastPlay) r.lastPlay.cards = arr(r.lastPlay.cards);
  if (r.shot) r.shot.cards = arr(r.shot.cards);
  r.pile = +r.pile || 0;
  return r;
};
export const alive = r => r.order.filter(id => !r.out[id]);
const nextAlive = (r, id) => { const n = r.order.length, i = r.order.indexOf(id); for (let k = 1; k <= n; k++) { const x = r.order[(i + k) % n]; if (!r.out[x]) return x; } return null; };
export const odds = (r, id) => Math.max(1, r.glasses - (r.shots[id] || 0)); // โอกาสฟุบแก้วถัดไป = 1/odds
export const isLie = (cards, table) => cards.some(c => c !== table && c !== WILD);

function makeDeck(n) {
  const T = Math.max(6, Math.ceil(n * HAND * 0.3)), W = Math.max(2, Math.ceil(n / 2));
  return shuffle([...Array.from({ length: T * 3 }, (_, i) => i % 3), ...Array(W).fill(WILD)]);
}
function deal(r, starter, now) {
  const ids = alive(r); const deck = makeDeck(ids.length);
  r.order.forEach(id => { r.hands[id] = []; });
  ids.forEach((id, j) => { r.hands[id] = deck.slice(j * HAND, (j + 1) * HAND).sort((a, b) => a - b); });
  r.deal = (r.deal || 0) + 1; r.table = rint(3); r.pile = 0; r.lastPlay = null; r.shot = null;
  r.phase = 'play'; r.turn = starter; r.at = now; r.until = now + 2500 + PLAY_MS;
  say(r, `🍶 ป้าแป๋วแจกไพ่ใหม่ — กับแกล้มประจำวงคือ “${SNACKS[r.table].n}”`);
}

export function makeYdRound(ids, set = {}, number = 1, t0 = Date.now()) {
  const order = shuffle(ids); const shots = {}; order.forEach(id => { shots[id] = 0; });
  const r = { number, kind: 'yd', order, glasses: +set.glasses === 4 ? 4 : 6, out: {}, gone: {}, shots, hands: {}, log: [], deal: 0, startedAt: t0 };
  deal(r, order[0], t0); return r;
}

function end(cur, winner, why, now) {
  const r = cur.round; r.phase = 'done'; r.at = now; r.winner = winner; r.why = why; r.until = null;
  const pts = {}; const sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { const p = id === winner ? YD_SCORE : 0; pts[id] = p; sc[id] = (sc[id] || 0) + p; });
  cur.status = 'result'; cur.scores = sc; cur.result = { type: 'yd', winner, why, points: pts };
  return cur;
}
// หลังดื่มเสร็จ: ฟุบ → ออก • เหลือคนเดียว → จบ • ไม่งั้นแจกใหม่ คนดื่มเริ่ม (ฟุบแล้ว → คนถัดไป)
function afterShot(cur, now) {
  const r = cur.round; const s = r.shot;
  if (s?.ko && s.who) { r.out = { ...r.out, [s.who]: true }; r.hands[s.who] = []; }
  const al = alive(r);
  if (al.length < 2) return end(cur, al[0] || null, 'last', now);
  const who = s?.who && !r.out[s.who] ? s.who : nextAlive(r, s?.who || r.turn);
  deal(r, who, now); return cur;
}
function nextTurn(r, from, now) { r.turn = nextAlive(r, from); r.phase = 'play'; r.at = now; r.until = now + PLAY_MS; }

// ---------- การกระทำ (เรียกใน transaction) ----------
export function ydPlay(cur, me, idxs, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'play' || r.turn !== me) return;
  const h = r.hands[me]; const ix = [...new Set(idxs)];
  if (!ix.length || ix.length > 3 || ix.some(i => !Number.isInteger(i) || i < 0 || i >= h.length)) return;
  const cards = ix.map(i => h[i]); r.hands[me] = h.filter((_, i) => !ix.includes(i));
  r.lastPlay = { by: me, cards, at: now }; r.pile += cards.length;
  say(r, `🂠 {${me}} ลงไพ่คว่ำ ${cards.length} ใบ “${SNACKS[r.table].n}ทั้งหมด!”`);
  nextTurn(r, me, now); return cur;
}
export function ydCall(cur, me, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'play' || r.turn !== me || !r.lastPlay) return;
  const lp = r.lastPlay; const lie = isLie(lp.cards, r.table); const who = lie ? lp.by : me;
  if (r.out[who] || r.gone[who]) { // คนที่ต้องดื่มออกไปแล้ว → ข้ามการดื่ม
    r.shot = { caller: me, by: lp.by, cards: lp.cards, lie, who: null, ko: false, n: 0, odds: 0, at: now };
  } else {
    const o = odds(r, who); const ko = rint(o) === 0; r.shots = { ...r.shots, [who]: (r.shots[who] || 0) + 1 };
    r.shot = { caller: me, by: lp.by, cards: lp.cards, lie, who, ko, n: r.shots[who], odds: o, at: now };
  }
  r.phase = 'shot'; r.at = now; r.until = now + SHOT_MS;
  say(r, `📣 {${me}} ตะโกน “โกหก!” ใส่ {${lp.by}} — ${lie ? 'โกหกจริง!' : 'ไม่ได้โกหก!'}${r.shot.who ? ` {${who}} ต้องดื่มแก้วลุ้น → ${r.shot.ko ? '😵 ฟุบ!' : '😮‍💨 รอด'}` : ''}`);
  return cur;
}
// หมดเวลา / หัวหน้าห้องกดข้าม
function auto(cur, now) {
  const r = cur.round;
  if (r.phase === 'shot') return afterShot(cur, now);
  if (r.phase === 'play') {
    const me = r.turn; const h = r.hands[me] || [];
    if (r.lastPlay && (!h.length || Math.random() < 0.3)) return ydCall(cur, me, now);
    if (!h.length) { nextTurn(r, me, now); return cur; } // กันพลาด: ไม่มีไพ่และไม่มีอะไรให้เรียก
    const want = h.map((c, i) => [c, i]).filter(([c]) => c === r.table || c === WILD).map(([, i]) => i);
    const ix = want.length ? want.slice(0, 1 + rint(Math.min(3, want.length))) : [rint(h.length)];
    return ydPlay(cur, me, ix, now);
  }
}
export function ydTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'yd' || cur.status !== 'playing') return; fix(r);
  if (now >= r.until) return auto(cur, now);
}
export function ydForce(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'yd') return; fix(r); return auto(cur, now);
}
// คนหลุดออกจากห้อง: ออกจากวง ไพ่ในมือทิ้ง
export function kickYd(cur, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || cur.players?.[id] || !r.order.includes(id) || r.out[id]) return;
  r.out = { ...r.out, [id]: true }; r.gone = { ...r.gone, [id]: true }; r.hands[id] = []; say(r, `🚪 {${id}} ออกจากวง`);
  const al = alive(r); if (al.length < 2) return end(cur, al[0] || null, 'left', now);
  if (r.phase === 'play') {
    if (r.lastPlay?.by === id) r.lastPlay = null; // คนลงไม่อยู่แล้ว → เรียกไม่ได้
    if (r.turn === id) nextTurn(r, id, now);
    if (!r.lastPlay && !r.hands[r.turn].length) deal(r, r.turn, now);
  }
  return cur;
}

// ---------- ภาพวาด SVG ----------
const O = { stroke: '#2b1608', strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' };
const ART = [
  // ถั่วทอด
  <g key="0" {...O}><g transform="rotate(-28 50 50)"><path d="M50 14 C68 14 72 34 64 46 C58 54 58 58 64 66 C72 80 64 90 50 90 C36 90 28 80 36 66 C42 58 42 54 36 46 C28 34 32 14 50 14Z" fill="#e9b26a" />
    <path d="M42 26 l16 8 M38 40 l22 10 M40 70 l20 8 M44 80 l12 5" fill="none" stroke="#a8702e" strokeWidth="2" /></g>
    <ellipse cx="22" cy="78" rx="9" ry="6" fill="#f6dba6" /><ellipse cx="80" cy="24" rx="8" ry="5.5" fill="#f6dba6" /><path d="M18 76 q4 4 9 0" fill="none" strokeWidth="1.6" /></g>,
  // หมึกย่าง
  <g key="1" {...O}><path d="M50 8 C66 22 70 40 66 58 H34 C30 40 34 22 50 8Z" fill="#f58a6a" /><path d="M36 24 L28 34 L38 34Z M64 24 L72 34 L62 34Z" fill="#f58a6a" />
    <path d="M40 30 l20 8 M38 42 l24 8" stroke="#a8341e" strokeWidth="3" fill="none" />
    <circle cx="42" cy="52" r="4" fill="#fff" strokeWidth="2" /><circle cx="58" cy="52" r="4" fill="#fff" strokeWidth="2" /><circle cx="42" cy="53" r="1.8" fill="#2b1608" stroke="none" /><circle cx="58" cy="53" r="1.8" fill="#2b1608" stroke="none" />
    <path d="M36 58 q-6 14 -2 28 M43 58 q-3 16 2 30 M50 58 v32 M57 58 q3 16 -2 30 M64 58 q6 14 2 28" fill="none" stroke="#f58a6a" strokeWidth="6" />
    <path d="M36 58 q-6 14 -2 28 M43 58 q-3 16 2 30 M50 58 v32 M57 58 q3 16 -2 30 M64 58 q6 14 2 28" fill="none" strokeWidth="1.5" opacity=".5" /></g>,
  // ไข่ต้ม (ผ่าครึ่ง)
  <g key="2" {...O}><ellipse cx="50" cy="54" rx="32" ry="38" fill="#fffdf4" /><circle cx="50" cy="58" r="17" fill="#ffc229" /><circle cx="45" cy="53" r="5" fill="#ffe08a" stroke="none" />
    <path d="M24 30 q6 -10 14 -14" fill="none" stroke="#fff" strokeWidth="4" /></g>,
  // ไหยาดอง (ไพ่แทน)
  <g key="3" {...O}><rect x="38" y="8" width="24" height="12" rx="3" fill="#8a4a1e" /><path d="M36 20 H64 C84 30 86 60 80 76 C76 88 66 92 50 92 C34 92 24 88 20 76 C14 60 16 30 36 20Z" fill="#c8641e" />
    <path d="M26 46 C30 70 70 70 74 46 C76 62 74 80 66 86 C58 90 42 90 34 86 C26 80 24 62 26 46Z" fill="#7a2a10" opacity=".55" stroke="none" />
    <rect x="30" y="38" width="40" height="24" rx="4" fill="#fff1c9" /><text x="50" y="56" textAnchor="middle" fontSize="15" fontWeight="700" fill="#a8241e" stroke="none" fontFamily="Mitr,sans-serif">ดอง</text>
    <circle cx="70" cy="28" r="3" fill="#ffd27a" stroke="none" /><circle cx="76" cy="36" r="2" fill="#ffd27a" stroke="none" /></g>,
];
export const SnackArt = ({ k, size = 64, x, y }) => <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-label={CARD_N[k]}>{ART[k]}</svg>;
export const ShotGlass = ({ size = 40, fill = 1, x, y, ko }) => <svg x={x} y={y} width={size} height={size * 1.2} viewBox="0 0 50 60" aria-hidden="true">
  <path d="M6 6 H44 L39 54 H11Z" fill="#ffffff22" stroke="#fff3" strokeWidth="1" />
  {fill > 0 && <path d={`M${6 + 5 * (1 - fill)} ${6 + 48 * (1 - fill)} H${44 - 5 * (1 - fill)} L39 54 H11Z`} fill={ko ? '#7a2a6a' : '#c8641e'} opacity=".9" />}
  <path d="M6 6 H44 L39 54 H11Z" fill="none" stroke="#2b1608" strokeWidth="3" strokeLinejoin="round" /><path d="M11 12 L14 46" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".5" /></svg>;
const Back = () => <svg viewBox="0 0 100 140" width="100%" height="100%" aria-hidden="true"><rect x="4" y="4" width="92" height="132" rx="10" fill="#6a1a22" stroke="#f3c26a" strokeWidth="3" />
  <rect x="12" y="12" width="76" height="116" rx="6" fill="none" stroke="#f3c26a" strokeWidth="1.5" strokeDasharray="4 4" opacity=".6" />
  <g transform="translate(50 70)" fill="#f3c26a"><path d="M-14 -18 H14 L10 18 H-10Z" /><path d="M-10 -8 H10 L8 14 H-8Z" fill="#6a1a22" /><circle cy="-28" r="4" /></g></svg>;
export const YdCard = ({ k, back, small, sel, onClick, dim }) => {
  const Tag = onClick ? 'button' : 'div';
  return <Tag type={onClick ? 'button' : undefined} className={'yd-card' + (back ? ' back' : '') + (small ? ' sm' : '') + (sel ? ' sel' : '') + (dim ? ' dim' : '') + (k === WILD ? ' wild' : '')} style={back ? undefined : { '--c': k === WILD ? '#ffd27a' : SNACKS[k].c }} onClick={onClick}>
    {back ? <Back /> : <><SnackArt k={k} size={small ? 30 : 54} />{!small && <b>{CARD_N[k]}</b>}</>}
  </Tag>;
};
const Snack = ({ k }) => <span className="yd-snack"><SnackArt k={k} size={22} /> {SNACKS[k].n}</span>;
// ป้าแป๋ว เจ้าของร้าน (ผมมวย แว่น ผ้ากันเปื้อน)
export const Paew = ({ size = 90, x, y }) => <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-label="ป้าแป๋ว">
  <g {...O}><path d="M18 100 C18 72 32 62 50 62 C68 62 82 72 82 100Z" fill="#c8384a" /><path d="M36 66 H64 L60 100 H40Z" fill="#fff1c9" />
    <circle cx="50" cy="14" r="10" fill="#3a2a2a" /><circle cx="50" cy="40" r="24" fill="#f2c39a" /><path d="M26 38 C26 20 74 20 74 38 C66 28 34 28 26 38Z" fill="#3a2a2a" />
    <circle cx="41" cy="42" r="6" fill="#fff8" strokeWidth="2.2" /><circle cx="59" cy="42" r="6" fill="#fff8" strokeWidth="2.2" /><path d="M47 42 h6" fill="none" strokeWidth="2" />
    <circle cx="41" cy="42" r="1.8" fill="#2b1608" stroke="none" /><circle cx="59" cy="42" r="1.8" fill="#2b1608" stroke="none" />
    <path d="M42 52 q8 6 16 0" fill="none" strokeWidth="2.4" /><circle cx="33" cy="50" r="3.5" fill="#ff8a8a" stroke="none" opacity=".5" /><circle cx="67" cy="50" r="3.5" fill="#ff8a8a" stroke="none" opacity=".5" /></g></svg>;

// ---------- หน้าจอ ----------
export function YdGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, onBack, srvNow }) {
  const r = fix(JSON.parse(JSON.stringify(room.round))); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'yd') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const [sel, setSel] = useState([]); const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const inGame = r.order.includes(myId) && !r.out[myId];
  const myTurn = !res && r.phase === 'play' && r.turn === myId;
  const stepKey = r.deal + r.phase + (r.turn || '') + r.pile;
  useEffect(() => { setSel([]); }, [stepKey]);
  useEffect(() => { if (myTurn) sfx(sound, 'yourTurn'); }, [myTurn, stepKey]);
  useEffect(() => { if (r.phase === 'play' && r.pile === 0) sfx(sound, 'shuffle'); }, [r.deal]);
  useEffect(() => { if (r.lastPlay && r.phase === 'play') sfx(sound, 'card'); }, [r.lastPlay?.at]);
  const shotAt = r.phase === 'shot' && r.shot ? r.shot.at : 0;
  const revealed = !!shotAt && srvNow - shotAt >= REVEAL_AT;
  useEffect(() => { if (shotAt) { sfx(sound, 'liar'); if (r.shot.who) setTimeout(() => sfx(sound, 'tension'), 900); } }, [shotAt]);
  useEffect(() => { if (revealed && r.shot?.who) sfx(sound, r.shot.ko ? 'knock' : 'survive'); }, [revealed]);
  const due = !res && r.until && srvNow >= r.until;
  useEffect(() => { if (due) tx(cc => ydTick(cc, srvNow)); }, [due, r.at, r.phase]);
  const left = secs(r.until - srvNow);
  const name = id => id === myId ? 'คุณ' : nameOf(id);
  const myHand = r.hands[myId] || [];

  const Glasses = ({ id }) => <span className="yd-glasses" title={`ดื่มไปแล้ว ${r.shots[id]} แก้ว`}>{Array.from({ length: r.glasses }, (_, i) => <ShotGlass key={i} size={13} fill={i < r.shots[id] ? 0 : 1} />)}</span>;
  const Seat = ({ id }) => {
    const out = r.out[id]; const now = !res && r.phase === 'play' && r.turn === id;
    return <div className={'yd-seat' + (id === myId ? ' me' : '') + (now ? ' now' : '') + (out ? ' out' : '') + (res && r.winner === id ? ' win' : '')}>
      <Avatar id={id} av={av} size={42} dead={out} />
      <div className="yd-seat-tt"><b>{name(id)}</b><small>{out ? (r.gone[id] ? '🚪 ออกจากวง' : '😵 ฟุบแล้ว') : `แก้วถัดไป โอกาสฟุบ 1/${odds(r, id)}`}</small><Glasses id={id} /></div>
      {!out && <span className="yd-inhand" title="ไพ่ในมือ">🂠 {r.hands[id].length}</span>}
    </div>;
  };

  if (res) {
    const W = r.winner; const meWin = W === myId;
    return <div className="yd-game">
      <Outcome art={!W ? 'cross' : meWin ? 'win' : 'lose'} tone={meWin ? 'good' : ''} title={!W ? '🚪 คนเหลือไม่พอ จบวง' : meWin ? '🥃 คุณคือคอแข็งคนสุดท้าย!' : `🥃 ${nameOf(W)} คอแข็งที่สุดในวง!`}>
        {W ? `${name(W)} ยังนั่งตัวตรงเป็นคนสุดท้าย รับ +${YD_SCORE} แต้ม` : 'คนอื่นออกจากห้องไปหมด'}
      </Outcome>
      <SecH icon="🍶">สภาพวงหลังเลิก</SecH>
      <div className="yd-seats">{r.order.map(id => <Seat key={id} id={id} />)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเปิดวงใหม่</button> : <div className="waiting">รอหัวหน้าห้องเปิดวงใหม่…</div>}
    </div>;
  }

  const lp = r.lastPlay; const s = r.shot;
  const toggle = i => { sfx(sound, 'select'); setSel(v => v.includes(i) ? v.filter(x => x !== i) : v.length < 3 ? [...v, i] : v); };
  return <div className="yd-game">
    <div className="yd-banner"><Paew size={64} /><div><span className="eyebrow">ตาที่ {r.deal} • วงที่ {r.number}</span><h2>กับแกล้มประจำวง: <Snack k={r.table} /></h2><small>ลงคว่ำ 1–3 ใบ แล้วบอกว่าเป็น{SNACKS[r.table].n}ทั้งหมด • 🍶 ไหยาดองแทนอะไรก็ได้</small></div><SnackArt k={r.table} size={64} /></div>

    <section className={'yd-stage' + (myTurn ? ' me' : '')}>
      <div className="yd-pile">{Array.from({ length: Math.min(r.pile, 9) }, (_, i) => <span key={i} style={{ '--i': i }}><YdCard back small /></span>)}{!r.pile && <i className="hint">ยังไม่มีใครลงไพ่</i>}</div>
      <div className="yd-flight"><Avatar id={r.turn} av={av} size={56} />
        <div className="yd-ft"><span className="ct-kicker">{r.turn === myId ? '🫵 ตาคุณ' : `⏳ ตาของ ${nameOf(r.turn)}`}</span>
          {lp ? <b key={lp.at} className="yd-claim">{name(lp.by)} ลงคว่ำ {lp.cards.length} ใบ: “{SNACKS[r.table].n} {lp.cards.length} ใบ!”</b> : <b>เริ่มลงไพ่ได้เลย</b>}
          <small>{lp ? `${name(r.turn)} จะลงต่อ หรือตะโกน “โกหก!”` : ' '}</small></div>
        <TimerRing secs={left} total={PLAY_MS / 1000} size={58} label="วิ" /></div>
    </section>

    <SecH icon="🪑">คนในวง</SecH>
    <div className="yd-seats">{r.order.map(id => <Seat key={id} id={id} />)}</div>

    {inGame && <><SecH icon="🃏">ไพ่ในมือคุณ ({myHand.length} ใบ)</SecH>
      <div className="yd-hand">{myHand.map((k, i) => <YdCard key={i} k={k} dim={k !== r.table && k !== WILD} />)}{!myHand.length && <i className="hint">ไพ่หมดมือ — ถึงตาแล้วต้องเรียก “โกหก!”</i>}</div></>}
    {!inGame && r.order.includes(myId) && <p className="hint">😵 คุณฟุบไปแล้ว นั่งดูเพื่อนลุ้นต่อได้เลย</p>}

    <ActionSheet open={myTurn} k={'p' + stepKey} icon="🂠" title={myHand.length ? 'ตาคุณ! ลงไพ่ หรือ เรียกโกหก' : 'ไพ่หมดมือ — ต้องเรียก!'} sub={`บอกว่าเป็น “${SNACKS[r.table].n}” ทั้งหมด จะจริงหรือไม่ก็ได้`} secs={left} total={PLAY_MS / 1000}>
      {lp && <div className="yd-recv"><div className="yd-fan">{lp.cards.map((_, i) => <YdCard key={i} back small />)}</div><span className="yd-bubble">{name(lp.by)}: “{SNACKS[r.table].n} {lp.cards.length} ใบจ้า”</span></div>}
      {lp && <button className="primary wide yd-liar" onClick={() => { sfx(sound, 'confirm'); tx(cc => ydCall(cc, myId, srvNow)); }}>📣 โกหก! เปิดไพ่ {name(lp.by)}</button>}
      {myHand.length > 0 && <>
        <small className="yd-step">เลือกไพ่ 1–3 ใบ (เลือกแล้ว {sel.length})</small>
        <div className="yd-hand">{myHand.map((k, i) => <YdCard key={i} k={k} sel={sel.includes(i)} onClick={() => toggle(i)} />)}</div>
        <button className="primary wide" disabled={!sel.length} onClick={() => { sfx(sound, 'card'); tx(cc => ydPlay(cc, myId, sel, srvNow)); }}>🤫 ลงคว่ำ {sel.length || ''} ใบ “{SNACKS[r.table].n}ทั้งหมด!”</button>
      </>}
    </ActionSheet>

    {s && r.phase === 'shot' && typeof document !== 'undefined' && createPortal(<div className="yd-shot-back"><div className={'yd-shot' + (revealed ? (s.who ? (s.ko ? ' ko' : ' safe') : ' safe') : '')}>
      <b className="yd-shout">📣 {name(s.caller)}: “โกหก!”</b>
      <div className="yd-fan big">{s.cards.map((k, i) => <span key={i} className="yd-flip" style={{ '--d': `${0.5 + i * 0.25}s` }}><YdCard k={k} dim={k !== r.table && k !== WILD} /></span>)}</div>
      <p className={'yd-verdict ' + (s.lie ? 'lie' : 'true')}>{name(s.by)} {s.lie ? '🤥 โกหกจริง!' : '😇 ไม่ได้โกหก!'}</p>
      {s.who ? <div className="yd-drink">
        <Avatar id={s.who} av={av} size={72} dead={revealed && s.ko} />
        <div className="yd-glass-wrap"><ShotGlass size={56} ko={revealed && s.ko} /></div>
        <div className="yd-dtx"><b>{name(s.who)} ต้องดื่มแก้วลุ้น!</b><small>แก้วที่ {s.n} • โอกาสฟุบ 1/{s.odds}</small>
          <strong>{revealed ? (s.ko ? '😵💫 ฟุบ! ออกจากวง' : '😮‍💨 รอด! ยังไหว') : 'อึก… อึก… อึก…'}</strong></div>
      </div> : <p className="hint">คนที่ต้องดื่มออกจากวงไปแล้ว — ข้าม</p>}
    </div></div>, document.body)}

    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 6).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    {isHost && <HostBar>
      <button className="secondary" onClick={() => { if (confirm('ให้ระบบเล่นแทนคนที่กำลังคิดอยู่?')) tx(cc => ydForce(cc, srvNow)); }}>⏩ ข้าม (ระบบเล่นแทน)</button>
      {alive(r).filter(id => !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(cc => kickYd(cc, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
    </HostBar>}
  </div>;
}

// ---------- ห้องรอ ----------
export function YdLobby({ db, roomCode, room, isHost, sound }) {
  const set = room.settings?.yd || {};
  const save = patch => runTransaction(ref(db, `rooms/${roomCode}/settings/yd`), c => ({ ...(c || {}), ...patch })).catch(() => {});
  return <div className="uc-lobby">
    <label>🥃 แก้วลุ้นต่อคน {isHost ? '' : '(หัวหน้าห้องตั้ง)'}</label>
    <select value={+set.glasses === 4 ? 4 : 6} disabled={!isHost} onChange={e => { sfx(sound, 'select'); save({ glasses: +e.target.value }); }}><option value={6}>6 แก้ว (แก้วแรกฟุบ 1/6)</option><option value={4}>4 แก้ว (เกมเร็ว แก้วแรก 1/4)</option></select>
    <div className="yd-hand lobby">{[0, 1, 2, WILD].map(k => <YdCard key={k} k={k} />)}</div>
  </div>;
}
