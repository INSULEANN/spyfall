// เกม ขุดทองหรือตูม — นักขุดทองในเหมืองร้างซ่อนห่อแร่ (แนวเกมบลัฟ-ประมูลเปิดของ)
//   ทุกคนมี 4 ห่อ: ห่อทอง 3 + ห่อระเบิด 1 • เริ่มรอบ ทุกคนวางห่อคว่ำ 1 ห่อพร้อมกัน
//   ตาเรา: วางห่อเพิ่มบนกองตัวเอง หรือ "ท้าเปิด" ว่าจะเปิดเจอทองติดกัน N ห่อ
//   ท้าแล้ว คนอื่นเวียนกัน สู้ราคา (มากกว่าเดิม) หรือ ผ่าน • ท้าเท่าจำนวนห่อบนโต๊ะ = ปิดประมูลทันที
//   คนชนะประมูลเปิดกองตัวเองทั้งหมดก่อน แล้วเลือกเปิดห่อบนสุดของกองคนอื่นทีละห่อ
//   เจอระเบิด = ตูม! เสียห่อ 1 ห่อแบบสุ่ม (คนอื่นไม่รู้ว่าเสียอะไร) ห่อหมด = ออกจากเหมือง • เจ้าของระเบิดเริ่มรอบถัดไป
//   เปิดทองครบ = ได้ 1 ดาว • ครบ 2 ดาว หรือเหลือคนสุดท้าย = ชนะ
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint } from './rand.js';
import { Avatar, Outcome, Leaderboard, HostBar, SecH, TimerRing, ActionSheet } from './ui.jsx';
import './gold.css';

export const GB_MIN = 3, GB_MAX = 6, GB_SCORE = 2, GB_WIN = 2;
export const GOLD = 0, BOMB = 1;
export const PLACE_MS = 25000, TURN_MS = 30000, BID_MS = 20000, FLIP_MS = 20000, RES_MS = 6500;
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
const arr = a => Array.isArray(a) ? a.filter(x => x != null).map(Number) : a ? Object.values(a).map(Number) : [];
export const fix = r => {
  r.order = r.order || []; r.out = r.out || {}; r.gone = r.gone || {}; r.log = r.log || []; r.stack = r.stack || {}; r.own = r.own || {};
  r.pts = r.pts || {}; r.flipped = r.flipped || {}; r.passed = r.passed || {}; r.flips = r.flips ? Object.values(r.flips) : [];
  r.order.forEach(id => { r.stack[id] = arr(r.stack[id]); r.own[id] = { g: +r.own[id]?.g || 0, b: +r.own[id]?.b || 0 }; r.pts[id] = +r.pts[id] || 0; r.flipped[id] = +r.flipped[id] || 0; });
  return r;
};
export const alive = r => r.order.filter(id => !r.out[id]);
const nextAlive = (r, id) => { const n = r.order.length, i = r.order.indexOf(id); for (let k = 1; k <= n; k++) { const x = r.order[(i + k) % n]; if (!r.out[x]) return x; } return null; };
export const total = r => alive(r).reduce((s, id) => s + r.stack[id].length, 0);
export const hand = (r, id) => { const o = r.own[id] || { g: 0, b: 0 }; const st = r.stack[id] || []; return { g: Math.max(0, o.g - st.filter(x => x === GOLD).length), b: Math.max(0, o.b - st.filter(x => x === BOMB).length) }; }; // ตอนสรุปผล ห่อที่เสียอาจยังอยู่บนกอง → กันติดลบ
export const owned = (r, id) => (r.own[id]?.g || 0) + (r.own[id]?.b || 0);
const left = (r, id) => r.stack[id].length - r.flipped[id]; // ห่อที่ยังไม่ถูกเปิดในกอง

function newRound(r, starter, now) {
  r.order.forEach(id => { r.stack[id] = []; r.flipped[id] = 0; });
  r.rno = (r.rno || 0) + 1; r.bid = null; r.passed = {}; r.flips = []; r.res = null;
  r.phase = 'place'; r.turn = null; r.starter = r.out[starter] ? nextAlive(r, starter) : starter; r.at = now; r.until = now + PLACE_MS;
  say(r, `⛏️ รอบที่ ${r.rno} — ทุกคนซ่อนห่อแร่คนละ 1 ห่อ`);
}

export function makeGbRound(ids, set = {}, number = 1, t0 = Date.now()) {
  const order = shuffle(ids); const own = {}, pts = {};
  order.forEach(id => { own[id] = { g: 3, b: 1 }; pts[id] = 0; });
  const r = { number, kind: 'gb', order, own, pts, out: {}, gone: {}, stack: {}, flipped: {}, log: [], rno: 0, startedAt: t0 };
  newRound(r, order[0], t0); return r;
}

function end(cur, winner, why, now) {
  const r = cur.round; r.phase = 'done'; r.at = now; r.winner = winner; r.why = why; r.until = null;
  const pts = {}; const sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { const p = id === winner ? GB_SCORE : 0; pts[id] = p; sc[id] = (sc[id] || 0) + p; });
  cur.status = 'result'; cur.scores = sc; cur.result = { type: 'gb', winner, why, points: pts };
  return cur;
}
function setTurn(r, id, phase, now) { r.turn = id; r.phase = phase; r.at = now; r.until = now + (phase === 'bid' ? BID_MS : phase === 'flip' ? FLIP_MS : (r.tmT || TURN_MS)); }

// ---------- การกระทำ (เรียกใน transaction) ----------
export function gbPlace(cur, me, k, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.out[me] || !r.order.includes(me) || (k !== GOLD && k !== BOMB)) return;
  const h = hand(r, me); if ((k === GOLD ? h.g : h.b) <= 0) return;
  if (r.phase === 'place') {
    if (r.stack[me].length) return;
    r.stack[me] = [...r.stack[me], k];
    if (alive(r).every(id => r.stack[id].length)) { setTurn(r, r.starter, 'turn', now); say(r, `🎒 ทุกคนซ่อนห่อแล้ว — {${r.starter}} เริ่มก่อน`); }
    return cur;
  }
  if (r.phase !== 'turn' || r.turn !== me) return;
  r.stack[me] = [...r.stack[me], k]; say(r, `🎒 {${me}} วางห่อเพิ่ม (กองสูง ${r.stack[me].length})`);
  setTurn(r, nextAlive(r, me), 'turn', now); return cur;
}
// หาคนประมูลคนถัดไป: ยังอยู่ ยังไม่ผ่าน • วนกลับมาถึงคนท้า = ทุกคนผ่านหมด → เริ่มเปิด
function nextBidder(r, from, now) {
  let x = from;
  for (let k = 0; k < r.order.length; k++) { x = nextAlive(r, x); if (x === r.bid.by) return startFlip(r, now); if (!r.passed[x]) return setTurn(r, x, 'bid', now); }
  return startFlip(r, now);
}
export function gbBid(cur, me, n, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.turn !== me || r.out[me]) return;
  const T = total(r); n = Math.floor(+n);
  if (r.phase === 'turn') { if (!(n >= 1 && n <= T)) return; }
  else if (r.phase === 'bid') { if (r.passed[me] || !(n > r.bid.n && n <= T)) return; }
  else return;
  r.bid = { by: me, n }; say(r, `📣 {${me}} ท้า “เปิดเจอทอง ${n} ห่อ!”`);
  if (n >= T) { startFlip(r, now); return cur; }
  nextBidder(r, me, now); return cur;
}
export function gbPass(cur, me, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'bid' || r.turn !== me || r.bid?.by === me) return;
  r.passed = { ...r.passed, [me]: true }; say(r, `🙅 {${me}} ผ่าน`);
  nextBidder(r, me, now); return cur;
}
// เริ่มเปิด: เปิดกองตัวเองทั้งหมดก่อน (จากบนลงล่าง)
function startFlip(r, now) {
  const by = r.bid.by; setTurn(r, by, 'flip', now); r.got = 0;
  say(r, `🔦 {${by}} ชนะการท้า ต้องเปิดเจอทอง ${r.bid.n} ห่อ`);
  const st = r.stack[by];
  for (let i = st.length - 1; i >= 0; i--) { if (flipOne(r, by, now)) return; }
}
// เปิดห่อบนสุดของ id → คืน true ถ้ารอบนี้จบ (ตูม หรือ ครบ)
function flipOne(r, id, now) {
  const st = r.stack[id]; const i = st.length - 1 - r.flipped[id]; const k = st[i];
  r.flipped = { ...r.flipped, [id]: r.flipped[id] + 1 }; r.flips = [...r.flips, { id, k }];
  if (k === BOMB) { boom(r, id, now); return true; }
  r.got = (r.got || 0) + 1;
  if (r.got >= r.bid.n) { win(r, now); return true; }
  return false;
}
function boom(r, bombBy, now) {
  const by = r.bid.by; const o = r.own[by];
  const lost = rint(o.g + o.b) < o.b ? BOMB : GOLD; // สุ่ม 1 ห่อจากที่มีทั้งหมด
  r.own = { ...r.own, [by]: { g: o.g - (lost === GOLD ? 1 : 0), b: o.b - (lost === BOMB ? 1 : 0) } };
  const out = owned(r, by) <= 0; if (out) r.out = { ...r.out, [by]: true };
  r.res = { ok: false, by, bombBy, lost, out, n: r.bid.n };
  r.phase = 'res'; r.turn = null; r.at = now; r.until = now + RES_MS;
  say(r, `💥 ตูม! {${by}} เปิดเจอระเบิดของ ${bombBy === by ? 'ตัวเอง' : `{${bombBy}}`} เสียห่อ 1 ห่อ${out ? ' — ห่อหมด ออกจากเหมือง!' : ''}`);
}
function win(r, now) {
  const by = r.bid.by; r.pts = { ...r.pts, [by]: r.pts[by] + 1 };
  r.res = { ok: true, by, n: r.bid.n, star: r.pts[by] };
  r.phase = 'res'; r.turn = null; r.at = now; r.until = now + RES_MS;
  say(r, `✨ {${by}} เปิดเจอทองครบ ${r.bid.n} ห่อ! ได้ดาว ⭐ ${r.pts[by]}/${GB_WIN}`);
}
export function gbFlip(cur, me, target, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'flip' || r.bid?.by !== me || target === me || r.out[target] || !r.order.includes(target)) return;
  if (left(r, me) > 0 || left(r, target) <= 0) return;
  flipOne(r, target, now); if (r.phase === 'flip') r.at = now, r.until = now + FLIP_MS; return cur;
}
function afterRes(cur, now) {
  const r = cur.round; const s = r.res || {};
  if (s.ok && r.pts[s.by] >= GB_WIN) return end(cur, s.by, 'stars', now);
  const al = alive(r); if (al.length < 2) return end(cur, al[0] || null, 'last', now);
  const st = s.ok ? s.by : s.bombBy && !r.out[s.bombBy] ? s.bombBy : nextAlive(r, s.by || r.order[0]);
  newRound(r, st, now); return cur;
}
// หมดเวลา / หัวหน้าห้องกดข้าม
const autoTile = h => h.g && (!h.b || Math.random() < 0.75) ? GOLD : BOMB;
function auto(cur, now) {
  const r = cur.round;
  if (r.phase === 'res') return afterRes(cur, now);
  if (r.phase === 'place') {
    alive(r).forEach(id => { if (!r.stack[id].length) { const h = hand(r, id); if (h.g + h.b) r.stack[id] = [autoTile(h)]; } });
    setTurn(r, r.starter, 'turn', now); say(r, `⏰ หมดเวลาซ่อนห่อ — ระบบวางให้ • {${r.starter}} เริ่มก่อน`); return cur;
  }
  const me = r.turn;
  if (r.phase === 'turn') { const h = hand(r, me); if (h.g + h.b && Math.random() < 0.6) return gbPlace(cur, me, autoTile(h), now); return gbBid(cur, me, Math.min(total(r), 1 + rint(2)), now); }
  if (r.phase === 'bid') return gbPass(cur, me, now);
  if (r.phase === 'flip') { const ts = alive(r).filter(id => id !== me && left(r, id) > 0); if (!ts.length) { win(r, now); return cur; } return gbFlip(cur, me, ts[rint(ts.length)], now); }
}
export function gbTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'gb' || cur.status !== 'playing') return; fix(r);
  if (now >= r.until) return auto(cur, now);
}
export function gbForce(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'gb') return; fix(r); return auto(cur, now);
}
// คนหลุดออกจากห้อง: ออกจากเหมือง • ถ้ากำลังท้า/เปิดกันอยู่ → เริ่มรอบใหม่
export function kickGb(cur, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || cur.players?.[id] || !r.order.includes(id) || r.out[id]) return;
  r.out = { ...r.out, [id]: true }; r.gone = { ...r.gone, [id]: true }; r.stack = { ...r.stack, [id]: [] }; say(r, `🚪 {${id}} ออกจากเหมือง`);
  const al = alive(r); if (al.length < 2) return end(cur, al[0] || null, 'left', now);
  if (r.phase === 'place') { if (al.every(x => r.stack[x].length)) setTurn(r, r.starter === id ? nextAlive(r, id) : r.starter, 'turn', now); else if (r.starter === id) r.starter = nextAlive(r, id); }
  else if (r.phase === 'turn' || r.phase === 'bid' || r.phase === 'flip') { say(r, '🔄 เริ่มรอบใหม่'); newRound(r, r.turn === id || !r.turn ? nextAlive(r, id) : r.turn, now); }
  return cur;
}

// ---------- ภาพวาด SVG ----------
const O = { stroke: '#2a1a0a', strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' };
// ก้อนทองกองโต
export const GoldArt = ({ size = 64, x, y }) => <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-label="ทอง"><g {...O}>
  <path d="M14 78 C10 66 22 58 32 62 C34 50 50 48 54 58 C60 50 76 52 76 64 C88 62 92 76 84 82 H18Z" fill="#f2b62a" />
  <path d="M30 54 C26 40 40 32 48 40 C54 30 70 36 66 48 C62 56 40 58 30 54Z" fill="#ffd34a" />
  <path d="M20 74 C24 68 30 68 34 72 M54 70 C58 64 66 64 70 70" fill="none" stroke="#c88a12" strokeWidth="2.5" />
  <path d="M38 44 l6 -4 M58 62 l6 -3 M24 70 l4 -3" stroke="#fff6c0" strokeWidth="3.5" /></g>
  <g fill="#fff8d0"><path d="M78 26 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" /><path d="M22 28 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2Z" /></g></svg>;
// ระเบิดลูกกลมสีดำ ชนวนติดไฟ
export const BombArt = ({ size = 64, x, y }) => <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-label="ระเบิด"><g {...O}>
  <circle cx="46" cy="60" r="28" fill="#2e2a34" /><rect x="52" y="24" width="16" height="12" rx="3" transform="rotate(35 60 30)" fill="#6a6470" />
  <path d="M66 26 C72 14 82 18 84 10" fill="none" stroke="#a0784a" strokeWidth="3.5" />
  <path d="M30 50 C32 42 38 38 44 36" fill="none" stroke="#8a8494" strokeWidth="5" /></g>
  <g className="gb-spark"><path d="M84 10 l4 -8 1 8 8 -2 -6 6 7 5 -9 -1 -2 8 -3 -8 -8 2 6 -6 -6 -6Z" fill="#ffd34a" stroke="#e8582a" strokeWidth="1.5" /></g></svg>;
// หลังห่อ: ห่อผ้ากระสอบผูกเชือก
const BackArt = () => <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><g {...O}>
  <path d="M22 86 C10 70 16 46 34 38 L30 26 C40 30 60 30 70 26 L66 38 C84 46 90 70 78 86Z" fill="#a8783e" />
  <path d="M34 38 C44 42 56 42 66 38" fill="none" stroke="#5a3a18" strokeWidth="4" />
  <path d="M36 60 l10 -6 M54 70 l10 -4 M30 74 l8 2" stroke="#7a5426" strokeWidth="2.5" />
  <path d="M42 54 L58 70 M58 54 L42 70" stroke="#5a3a18" strokeWidth="4" opacity=".55" /></g></svg>;
export const Tile = ({ k, back, small, onClick, sel, dim }) => {
  const Tag = onClick ? 'button' : 'div';
  return <Tag type={onClick ? 'button' : undefined} className={'gb-tile' + (back ? ' back' : k === BOMB ? ' bomb' : ' gold') + (small ? ' sm' : '') + (sel ? ' sel' : '') + (dim ? ' dim' : '')} onClick={onClick}>
    {back ? <BackArt /> : k === BOMB ? <BombArt size={small ? 30 : 56} /> : <GoldArt size={small ? 30 : 56} />}
  </Tag>;
};
// นายเหมืองทองดี: หมวกนิรภัยติดไฟฉาย หนวดงาม
export const Thongdee = ({ size = 90, x, y }) => <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-label="นายเหมืองทองดี">
  <g {...O}><path d="M16 100 C16 74 30 64 50 64 C70 64 84 74 84 100Z" fill="#3a6aa8" /><path d="M40 64 L50 80 L60 64" fill="#f2c39a" />
    <path d="M30 70 V100 M70 70 V100" stroke="#c8641e" strokeWidth="5" />
    <circle cx="50" cy="44" r="22" fill="#f2c39a" />
    <path d="M24 36 C24 12 76 12 76 36Z" fill="#ffc83a" /><rect x="20" y="33" width="60" height="7" rx="3" fill="#e8a81a" />
    <circle cx="50" cy="24" r="7" fill="#fff6c0" /><circle cx="42" cy="46" r="2.4" fill="#2a1a0a" stroke="none" /><circle cx="58" cy="46" r="2.4" fill="#2a1a0a" stroke="none" />
    <path d="M36 56 C42 50 48 54 50 56 C52 54 58 50 64 56 C58 60 54 58 50 58 C46 58 42 60 36 56Z" fill="#4a2a14" />
    <path d="M34 50 q-4 2 -2 6 M66 50 q4 2 2 6" fill="none" strokeWidth="2" /></g>
  <path d="M57 24 L96 6 V42Z" fill="#fff6c0" opacity=".25" /></svg>;

// ---------- หน้าจอ ----------
export function GbGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, onBack, srvNow }) {
  const r = fix(JSON.parse(JSON.stringify(room.round))); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'gb') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const inGame = r.order.includes(myId) && !r.out[myId];
  const T = total(r); const h = inGame ? hand(r, myId) : { g: 0, b: 0 };
  const stepKey = r.rno + r.phase + (r.turn || '') + (r.bid?.n || 0) + r.flips.length;
  const [n, setN] = useState(1);
  const minBid = r.phase === 'bid' ? (r.bid?.n || 0) + 1 : 1;
  useEffect(() => { setN(Math.min(T, minBid)); }, [stepKey]);
  const myTurn = !res && inGame && r.turn === myId && ['turn', 'bid', 'flip'].includes(r.phase);
  useEffect(() => { if (myTurn) sfx(sound, 'yourTurn'); }, [myTurn, stepKey]);
  useEffect(() => { if (r.phase === 'place') sfx(sound, 'shuffle'); }, [r.rno]);
  const lastFlip = r.flips[r.flips.length - 1];
  useEffect(() => { if (lastFlip && r.phase === 'flip') sfx(sound, 'card'); }, [r.flips.length]);
  useEffect(() => { if (r.phase === 'res' && r.res) sfx(sound, r.res.ok ? 'right' : 'boom'); }, [r.phase, r.rno]);
  const due = !res && r.until && srvNow >= r.until;
  useEffect(() => { if (due) tx(cc => gbTick(cc, srvNow)); }, [due, r.at, r.phase]);
  const sLeft = secs(r.until - srvNow);
  const name = id => id === myId ? 'คุณ' : nameOf(id);
  const Stars = ({ id }) => <span className="gb-stars">{Array.from({ length: GB_WIN }, (_, i) => <b key={i} className={i < r.pts[id] ? 'on' : ''}>★</b>)}</span>;

  const Seat = ({ id, pick }) => {
    const out = r.out[id]; const st = r.stack[id]; const fl = r.flipped[id];
    const now = !res && r.turn === id; const can = pick && left(r, id) > 0;
    const Tag = can ? 'button' : 'div';
    return <Tag type={can ? 'button' : undefined} onClick={can ? pick : undefined} className={'gb-seat' + (id === myId ? ' me' : '') + (now ? ' now' : '') + (out ? ' out' : '') + (can ? ' pick' : '') + (res && r.winner === id ? ' win' : '') + (r.bid?.by === id ? ' bidder' : '')}>
      <Avatar id={id} av={av} size={42} dead={out} />
      <div className="gb-seat-tt"><b>{name(id)} <Stars id={id} /></b>
        <small>{out ? (r.gone[id] ? '🚪 ออกจากเหมือง' : '💥 ห่อหมด ออกจากเหมือง') : `🎒 มี ${owned(r, id)} ห่อ${r.phase === 'bid' && r.passed[id] ? ' • 🙅 ผ่าน' : ''}${r.bid?.by === id ? ` • 📣 ท้า ${r.bid.n}` : ''}${r.phase === 'place' && st.length ? ' • ✅ ซ่อนแล้ว' : ''}`}</small></div>
      <div className="gb-stack">{st.map((k, i) => { const up = i >= st.length - fl; return <span key={i} style={{ '--i': i }}><Tile k={k} back={!up} small /></span>; })}</div>
    </Tag>;
  };

  if (res) {
    const W = r.winner; const meWin = W === myId;
    return <div className="gb-game">
      <Outcome art={!W ? 'cross' : meWin ? 'win' : 'lose'} tone={meWin ? 'good' : ''} title={!W ? '🚪 คนเหลือไม่พอ ปิดเหมือง' : meWin ? '🏆 คุณคือเจ้าพ่อเหมืองทอง!' : `🏆 ${nameOf(W)} เจ้าพ่อเหมืองทอง!`}>
        {W ? `${name(W)} ${r.why === 'stars' ? `เปิดทองสำเร็จครบ ${GB_WIN} ครั้ง` : 'เป็นนักขุดคนสุดท้ายที่รอด'} รับ +${GB_SCORE} แต้ม` : 'คนอื่นออกจากห้องไปหมด'}
      </Outcome>
      <SecH icon="⛏️">นักขุดในเหมือง</SecH>
      <div className="gb-seats">{r.order.map(id => <Seat key={id} id={id} />)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเปิดเหมืองใหม่</button> : <div className="waiting">รอหัวหน้าห้องเปิดเหมืองใหม่…</div>}
    </div>;
  }

  const s = r.res; const total0 = r.phase === 'place' ? 0 : T;
  const phaseTx = r.phase === 'place' ? 'ทุกคนซ่อนห่อแรกพร้อมกัน' : r.phase === 'turn' ? `ตาของ ${name(r.turn)} — วางห่อเพิ่ม หรือ ท้าเปิด` : r.phase === 'bid' ? `${name(r.bid.by)} ท้าเปิดทอง ${r.bid.n} ห่อ — ${name(r.turn)} จะสู้หรือผ่าน?` : r.phase === 'flip' ? `${name(r.bid.by)} กำลังเปิดห่อ: ทอง ${r.got || 0}/${r.bid.n}` : 'สรุปผล';
  const Bidder = () => <div className="gb-step"><button type="button" className="secondary" disabled={n <= minBid} onClick={() => { sfx(sound, 'select'); setN(v => Math.max(minBid, v - 1)); }}>−</button><b>{n}</b><button type="button" className="secondary" disabled={n >= T} onClick={() => { sfx(sound, 'select'); setN(v => Math.min(T, v + 1)); }}>+</button><small>จากทั้งหมด {T} ห่อบนโต๊ะ</small></div>;
  const HandPick = ({ act }) => <div className="gb-hand">
    <button type="button" className="gb-choose" disabled={!h.g} onClick={() => { sfx(sound, 'card'); act(GOLD); }}><Tile k={GOLD} /><b>ห่อทอง</b><small>เหลือ {h.g}</small></button>
    <button type="button" className="gb-choose" disabled={!h.b} onClick={() => { sfx(sound, 'card'); act(BOMB); }}><Tile k={BOMB} /><b>ห่อระเบิด</b><small>เหลือ {h.b}</small></button></div>;
  const flipOpen = myTurn && r.phase === 'flip';
  return <div className="gb-game">
    <div className="gb-banner"><Thongdee size={64} /><div><span className="eyebrow">รอบที่ {r.rno} • เกมที่ {r.number}</span><h2>{r.bid ? <>📣 ท้าเปิดทอง <em>{r.bid.n}</em> ห่อ</> : 'ซ่อนห่อ ท้าเปิด ลุ้นทอง!'}</h2><small>{phaseTx}</small></div>
      <TimerRing secs={sLeft} total={(r.phase === 'place' ? PLACE_MS : r.phase === 'bid' ? BID_MS : r.phase === 'flip' ? FLIP_MS : r.phase === 'res' ? RES_MS : (r.tmT || TURN_MS)) / 1000} size={58} label="วิ" /></div>

    {r.phase === 'flip' && <section className="gb-flips"><span className="ct-kicker">🔦 ห่อที่เปิดแล้ว</span><div className="gb-row">{r.flips.map((f, i) => <span key={i} className="gb-pop" title={nameOf(f.id)}><Tile k={f.k} small /><Avatar id={f.id} av={av} size={20} /></span>)}</div></section>}

    <SecH icon="⛏️">นักขุดในเหมือง {total0 ? `• ห่อบนโต๊ะ ${total0}` : ''}</SecH>
    <div className="gb-seats">{r.order.map(id => <Seat key={id} id={id} />)}</div>

    {inGame && <><SecH icon="🎒">ห่อในมือคุณ</SecH>
      <div className="gb-row mine">{Array.from({ length: h.g }, (_, i) => <Tile key={'g' + i} k={GOLD} small />)}{Array.from({ length: h.b }, (_, i) => <Tile key={'b' + i} k={BOMB} small />)}{!(h.g + h.b) && <i className="hint">วางหมดมือแล้ว</i>}
        <span className="gb-mystack">กองของคุณ: {r.stack[myId].map((k, i) => <Tile key={i} k={k} small dim={i < r.stack[myId].length - r.flipped[myId]} />)}</span></div></>}
    {!inGame && r.order.includes(myId) && <p className="hint">💥 คุณออกจากเหมืองแล้ว นั่งดูเพื่อนลุ้นต่อได้เลย</p>}

    <ActionSheet open={!res && inGame && r.phase === 'place' && !r.stack[myId].length} k={'pl' + r.rno} icon="🎒" title="ซ่อนห่อแรกของคุณ" sub="เลือกห่อที่จะวางคว่ำไว้ ทองหรือระเบิด ไม่มีใครเห็น" secs={sLeft} total={PLACE_MS / 1000}>
      <HandPick act={k => tx(cc => gbPlace(cc, myId, k, srvNow))} />
    </ActionSheet>
    <ActionSheet open={myTurn && r.phase === 'turn'} k={'t' + stepKey} icon="⛏️" title={h.g + h.b ? 'ตาคุณ! วางห่อเพิ่ม หรือ ท้าเปิด' : 'ห่อหมดมือ — ต้องท้าเปิด!'} sub="ท้า = บอกว่าจะเปิดเจอทองติดกันกี่ห่อ (เปิดกองตัวเองก่อนเสมอ)" secs={sLeft} total={(r.tmT || TURN_MS) / 1000}>
      {h.g + h.b > 0 && <HandPick act={k => tx(cc => gbPlace(cc, myId, k, srvNow))} />}
      <small className="gb-lbl">📣 หรือท้าเปิดทอง</small><Bidder />
      <button className="primary wide gb-dare" onClick={() => { sfx(sound, 'confirm'); tx(cc => gbBid(cc, myId, n, srvNow)); }}>📣 ท้าเปิดทอง {n} ห่อ!</button>
    </ActionSheet>
    <ActionSheet open={myTurn && r.phase === 'bid'} k={'b' + stepKey} icon="📣" title={`${name(r.bid?.by)} ท้า ${r.bid?.n} ห่อ — จะสู้ไหม?`} sub="สู้ = ท้าสูงกว่า • ผ่าน = ไม่ยุ่งรอบนี้" secs={sLeft} total={BID_MS / 1000}>
      {minBid <= T && <><Bidder /><button className="primary wide gb-dare" onClick={() => { sfx(sound, 'confirm'); tx(cc => gbBid(cc, myId, n, srvNow)); }}>📣 สู้! ท้า {n} ห่อ</button></>}
      <button className="secondary wide" onClick={() => { sfx(sound, 'select'); tx(cc => gbPass(cc, myId, srvNow)); }}>🙅 ผ่าน</button>
    </ActionSheet>
    <ActionSheet open={flipOpen} k={'f' + stepKey} icon="🔦" title={`เลือกกองที่จะเปิด (ทอง ${r.got || 0}/${r.bid?.n || 0})`} sub="เปิดห่อบนสุดของกองที่เลือก • เจอระเบิด = ตูม!" secs={sLeft} total={FLIP_MS / 1000}>
      <div className="gb-seats one">{alive(r).filter(id => id !== myId && left(r, id) > 0).map(id => <Seat key={id} id={id} pick={() => { sfx(sound, 'card'); tx(cc => gbFlip(cc, myId, id, srvNow)); }} />)}</div>
    </ActionSheet>

    {s && r.phase === 'res' && typeof document !== 'undefined' && createPortal(<div className="gb-res-back"><div className={'gb-res ' + (s.ok ? 'ok' : 'ko')}>
      <div className="gb-res-art">{s.ok ? <GoldArt size={110} /> : <BombArt size={110} />}</div>
      <b className="gb-res-h">{s.ok ? '✨ เจอทองครบ!' : '💥 ตูม!!'}</b>
      <div className="gb-row">{r.flips.map((f, i) => <span key={i} className="gb-pop" style={{ animationDelay: `${i * 0.12}s` }}><Tile k={f.k} small /></span>)}</div>
      {s.ok ? <p>{name(s.by)} เปิดทองครบ {s.n} ห่อ ได้ดาว ⭐ {s.star}/{GB_WIN}</p>
        : <p>{name(s.by)} เปิดเจอระเบิดของ{s.bombBy === s.by ? 'ตัวเอง' : ` ${name(s.bombBy)}`} • เสียห่อ 1 ห่อ{s.by === myId ? ` (คุณเสีย${s.lost === BOMB ? 'ห่อระเบิด 💣' : 'ห่อทอง 🪙'})` : ' (ไม่รู้ว่าห่ออะไร)'}{s.out ? ' — ห่อหมด ออกจากเหมือง!' : ''}</p>}
      {!s.ok && !s.out && s.bombBy !== s.by && <small className="hint">{name(s.bombBy)} ได้เริ่มรอบถัดไป</small>}
    </div></div>, document.body)}

    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 6).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    {isHost && <HostBar>
      <button className="secondary" onClick={() => { if (confirm('ให้ระบบเล่นแทนคนที่กำลังคิดอยู่?')) tx(cc => gbForce(cc, srvNow)); }}>⏩ ข้าม (ระบบเล่นแทน)</button>
      {alive(r).filter(id => !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(cc => kickGb(cc, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
    </HostBar>}
  </div>;
}

// ---------- ห้องรอ ----------
export function GbLobby() {
  return <div className="uc-lobby"><div className="gb-hand lobby">{[GOLD, GOLD, GOLD, BOMB].map((k, i) => <Tile key={i} k={k} />)}</div></div>;
}
