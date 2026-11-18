// เกม สัตว์หน้านิ่ง — เกมส่งไพ่คว่ำแล้วโกหกหน้าตาย (แนวเดียวกับเกมบลัฟส่งไพ่)
//   แจกไพ่สัตว์ 6 ชนิดจนหมดสำรับ • ตาเรา: ส่งไพ่คว่ำ 1 ใบให้เพื่อน แล้วบอกว่า “นี่คือ หมู”
//   คนรับ: ตอบ “จริง / ไม่จริง” → ใครผิดรับไพ่ใบนั้นหงายไว้หน้าตัวเอง
//          หรือ แอบดูแล้วส่งต่อให้คนที่ยังไม่เห็น (บอกใหม่ได้) — คนสุดท้ายต้องตอบ
//   คนที่รับไพ่ไปเป็นคนส่งตาถัดไป • แพ้เมื่อมีสัตว์ชนิดเดียวกันหงายครบ 4 ตัว (หรือ 3 ในโหมดเร็ว) หรือถึงตาส่งแต่ไม่มีไพ่ในมือ
import React, { useEffect, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint } from './rand.js';
import { Avatar, PlayerGrid, Outcome, Leaderboard, HostBar, SecH, TimerRing, ActionSheet } from './ui.jsx';
import './animal.css';
import { cardImg } from './cards.jsx';

export const ANI_MIN = 3, ANI_MAX = 8;
export const ANI_SCORE = 1;
export const ANIMALS = [
  { n: 'หมู', c: '#f6a5b8' }, { n: 'ไก่', c: '#fff1cf' }, { n: 'ควาย', c: '#b9bdc6' },
  { n: 'ช้าง', c: '#b8cbe0' }, { n: 'แมว', c: '#f7bd72' }, { n: 'กบ', c: '#a8de86' },
];
const K = ANIMALS.length, PER = 9;
export const PASS_MS = 45000, RESP_MS = 40000, LAST_MS = 2500;
const norm = a => Array.from({ length: K }, (_, i) => +(a?.[i]) || 0);
export const total = a => norm(a).reduce((x, y) => x + y, 0);
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
export const fix = r => {
  r.order = r.order || []; r.gone = r.gone || {}; r.log = r.log || [];
  r.hands = r.hands || {}; r.face = r.face || {};
  r.order.forEach(id => { r.hands[id] = norm(r.hands[id]); r.face[id] = norm(r.face[id]); });
  if (r.chain) { r.chain.seen = r.chain.seen || {}; r.chain.path = r.chain.path || []; }
  return r;
};
export const active = r => r.order.filter(id => !r.gone?.[id]);
export const canPassOn = r => r.chain ? active(r).filter(id => id !== r.chain.to && !r.chain.seen[id]) : [];
const nextActive = (r, id) => { const n = r.order.length; const i = r.order.indexOf(id); for (let k = 1; k <= n; k++) { const x = r.order[(i + k) % n]; if (!r.gone[x]) return x; } return null; };

export function makeAniRound(ids, set = {}, number = 1, t0 = Date.now()) {
  const deck = shuffle(Array.from({ length: K * PER }, (_, i) => i % K));
  const per = Math.floor(deck.length / ids.length); const order = shuffle(ids);
  const hands = {}, face = {};
  order.forEach((id, j) => { const h = Array(K).fill(0); deck.slice(j * per, (j + 1) * per).forEach(a => h[a]++); hands[id] = h; face[id] = Array(K).fill(0); });
  return { number, kind: 'ani', order, hands, face, limit: +set.limit === 3 ? 3 : 4, aside: deck.length - per * ids.length,
    phase: 'pass', turn: order[0], at: t0, until: t0 + 3000 + (+set.tmT || PASS_MS), chain: null, last: null, log: [], gone: {}, startedAt: t0 };
}

function end(cur, loser, why, now) {
  const r = cur.round; r.phase = 'done'; r.at = now; r.loser = loser; r.why = why; r.chain = null;
  const pts = {}; const sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { const p = r.hands[id] && !r.gone[id] && id !== loser ? ANI_SCORE : 0; pts[id] = p; sc[id] = (sc[id] || 0) + p; });
  cur.status = 'result'; cur.scores = sc; cur.result = { type: 'ani', loser, why, points: pts };
  return cur;
}
function startTurn(cur, who, now) {
  const r = cur.round; r.turn = who; r.phase = 'pass'; r.at = now; r.until = now + LAST_MS + (r.tmT || PASS_MS); r.chain = null;
  if (!total(r.hands[who])) { say(r, `🫥 {${who}} ไม่มีไพ่เหลือในมือตอนถึงตาส่ง`); return end(cur, who, 'empty', now); }
  return cur;
}
function resolve(cur, truth, now) {
  const r = cur.round; const c = r.chain; const real = c.card === c.claim; const right = truth === real;
  let taker = right ? c.from : c.to;
  r.last = { card: c.card, claim: c.claim, from: c.from, to: c.to, truth, right, taker, at: now };
  say(r, `${truth ? '✅' : '❌'} {${c.to}} ตอบว่า “${truth ? 'จริง' : 'ไม่จริง'}” — ไพ่คือ${ANIMALS[c.card].n} ${right ? 'ทายถูก!' : 'ทายผิด!'} {${taker}} รับไป`);
  if (r.gone[taker]) { r.last.taker = null; return startTurn(cur, r.gone[c.to] ? nextActive(r, c.to) : c.to, now); }
  r.face[taker][c.card]++;
  if (r.face[taker][c.card] >= r.limit) { r.loseAnimal = c.card; return end(cur, taker, 'four', now); }
  return startTurn(cur, taker, now);
}

// ---------- การกระทำ (เรียกใน transaction) ----------
const okClaim = k => Number.isInteger(k) && k >= 0 && k < K;
export function aniPass(cur, me, card, target, claim, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'pass' || r.turn !== me) return;
  if (!okClaim(card) || !okClaim(claim) || !(r.hands[me][card] > 0) || target === me || !active(r).includes(target)) return;
  r.hands[me][card]--;
  r.chain = { card, claim, from: me, to: target, peek: false, seen: { [me]: true }, path: [{ from: me, to: target, claim }] };
  r.phase = 'resp'; r.at = now; r.until = now + (r.tmT || RESP_MS);
  say(r, `🂠 {${me}} ส่งไพ่คว่ำให้ {${target}} “นี่คือ${ANIMALS[claim].n}”`);
  return cur;
}
export function aniPeek(cur, me, now) {
  const r = cur.round; const c = r.chain; if (cur.status !== 'playing' || r.phase !== 'resp' || !c || c.to !== me || c.peek || !canPassOn(r).length) return;
  c.peek = true; c.seen[me] = true; r.at = now; r.until = now + (r.tmT || RESP_MS); return cur;
}
export function aniPassOn(cur, me, target, claim, now) {
  const r = cur.round; const c = r.chain; if (cur.status !== 'playing' || r.phase !== 'resp' || !c || c.to !== me || !c.peek) return;
  if (!okClaim(claim) || !canPassOn(r).includes(target)) return;
  c.from = me; c.to = target; c.claim = claim; c.peek = false; c.path = [...c.path, { from: me, to: target, claim }];
  r.at = now; r.until = now + (r.tmT || RESP_MS);
  say(r, `👀 {${me}} แอบดูแล้วส่งต่อให้ {${target}} “นี่คือ${ANIMALS[claim].n}”`);
  return cur;
}
export function aniCall(cur, me, truth, now) {
  const r = cur.round; const c = r.chain; if (cur.status !== 'playing' || r.phase !== 'resp' || !c || c.to !== me || c.peek) return;
  return resolve(cur, !!truth, now);
}
// หมดเวลา / หัวหน้าห้องกดข้าม: ระบบเล่นแทนแบบสุ่ม
function auto(cur, now) {
  const r = cur.round;
  if (r.phase === 'pass') {
    const me = r.turn; const have = r.hands[me].map((n, i) => n > 0 ? i : -1).filter(i => i >= 0);
    if (!have.length) return startTurn(cur, me, now);
    const card = have[rint(have.length)]; const ts = active(r).filter(id => id !== me);
    return aniPass(cur, me, card, ts[rint(ts.length)], Math.random() < 0.5 ? card : rint(K), now);
  }
  if (r.phase === 'resp' && r.chain) {
    const c = r.chain;
    if (c.peek) { const ts = canPassOn(r); if (ts.length) return aniPassOn(cur, c.to, ts[rint(ts.length)], Math.random() < 0.5 ? c.card : rint(K), now); c.peek = false; }
    return resolve(cur, Math.random() < 0.5, now);
  }
}
export function aniTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'ani' || cur.status !== 'playing') return; fix(r);
  if (now >= r.until) return auto(cur, now);
}
export function aniForce(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'ani') return; fix(r); return auto(cur, now);
}
// คนหลุดออกจากห้อง: ทิ้งไพ่ในมือ ถ้ากำลังถือไพ่อยู่ ไพ่ใบนั้นถูกทิ้ง แล้วคนส่งเริ่มตาใหม่
export function kickAni(cur, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || cur.players?.[id] || !r.order.includes(id) || r.gone[id]) return;
  r.gone = { ...r.gone, [id]: true }; r.hands[id] = Array(K).fill(0); say(r, `🚪 {${id}} ออกจากเกม (ทิ้งไพ่ในมือ)`);
  if (active(r).length < 2) return end(cur, null, 'left', now);
  if (r.phase === 'pass' && r.turn === id) return startTurn(cur, nextActive(r, id), now);
  if (r.phase === 'resp' && r.chain && r.chain.to === id) { const f = r.chain.from; return startTurn(cur, r.gone[f] ? nextActive(r, f) : f, now); }
  return cur;
}

// ---------- ภาพวาด SVG (วาดมือ: ไล่เฉด + ฉากหลังของแต่ละตัว + หน้านิ่งตาปรือ) ----------
const INK = '#2b1d16';
const O = { stroke: INK, strokeWidth: 2.6, strokeLinejoin: 'round', strokeLinecap: 'round' };
const RG = ({ id, c, cx = '.38', cy = '.32', r = '.75' }) => <radialGradient id={id} cx={cx} cy={cy} r={r}>{c.map((s, i) => <stop key={i} offset={i / (c.length - 1)} stopColor={s} />)}</radialGradient>;
const LG = ({ id, c, x2 = 0, y2 = 1 }) => <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>{c.map((s, i) => <stop key={i} offset={i / (c.length - 1)} stopColor={s} />)}</linearGradient>;
// ตาปรือ “หน้านิ่ง”: ตาขาว + ลูกตา + เปลือกตาบนสีเดียวกับหน้า
const Eye = ({ x, y, lid, rx = 5.6, ry = 6.2, look = 1, iris }) => <g>
  <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#fff" />
  {iris && <ellipse cx={x + look} cy={y + 1} rx={rx * 0.62} ry={ry * 0.72} fill={iris} />}
  <ellipse cx={x + look} cy={y + 1.2} rx={iris ? 1.2 : 3} ry={iris ? 4 : 3.3} fill={INK} /><circle cx={x + look + 1.4} cy={y - 0.6} r="1.2" fill="#fff" />
  <path d={`M${x - rx - 1} ${y - 0.6} Q${x} ${y - 3.4} ${x + rx + 1} ${y - 0.6} L${x + rx + 1} ${y - ry - 2} L${x - rx - 1} ${y - ry - 2}Z`} fill={lid} />
  <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={INK} strokeWidth="2.2" />
  <path d={`M${x - rx - 1} ${y - 0.6} Q${x} ${y - 3.4} ${x + rx + 1} ${y - 0.6}`} fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
</g>;
const Shine = ({ x, y, rx, ry, a = -25 }) => <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#fff" opacity=".38" transform={`rotate(${a} ${x} ${y})`} />;
const Blush = ({ x, y, r = 5.5 }) => <circle cx={x} cy={y} r={r} fill="#ff6f8e" opacity=".35" />;
const ART = [
  // หมู — แก้มเปื้อนโคลน คิ้วเลิกข้างเดียว
  <g key="0"><defs><RG id="anp-h" c={['#ffe0e8', '#f7a8bc', '#d9708f']} /><RG id="anp-s" c={['#ffc4d2', '#e9819d']} cx=".4" cy=".3" /></defs>
    <g {...O}><path d="M22 36 Q12 14 20 8 Q34 14 42 24Z" fill="url(#anp-s)" /><path d="M78 36 Q88 14 80 8 Q66 14 58 24Z" fill="url(#anp-s)" />
      <ellipse cx="50" cy="57" rx="35" ry="32" fill="url(#anp-h)" /></g>
    <path d="M24 26 Q20 16 22 12 Q30 16 34 22Z M76 26 Q80 16 78 12 Q70 16 66 22Z" fill="#c95f7e" opacity=".5" />
    <Shine x={36} y={36} rx={12} ry={6} /><Blush x={24} y={66} /><Blush x={76} y={66} />
    <circle cx="20" cy="74" r="2.4" fill="#7a4a2a" opacity=".7" /><circle cx="25" cy="78" r="1.6" fill="#7a4a2a" opacity=".7" /><circle cx="79" cy="40" r="1.8" fill="#7a4a2a" opacity=".6" />
    <path d="M28 36 Q35 30 43 35" fill="none" {...O} /><path d="M57 37 H71" fill="none" {...O} />
    <Eye x={36} y={47} lid="#f6a6bb" /><Eye x={64} y={47} lid="#f6a6bb" look={-1} />
    <g {...O}><ellipse cx="50" cy="66" rx="16" ry="11.5" fill="url(#anp-s)" /></g><ellipse cx="46" cy="62" rx="6" ry="2.4" fill="#fff" opacity=".4" />
    <ellipse cx="44.5" cy="67" rx="2.8" ry="4.2" fill="#6a2236" /><ellipse cx="55.5" cy="67" rx="2.8" ry="4.2" fill="#6a2236" />
    <path d="M43 82 Q50 85 58 80" fill="none" {...O} strokeWidth="2.2" /></g>,
  // ไก่ — หงอนแดงไล่เฉด ตามองข้าง
  <g key="1"><defs><RG id="anc-h" c={['#ffffff', '#fbf1dc', '#e2cfa6']} /><RG id="anc-c" c={['#ff8a7a', '#e8424a', '#b81e2e']} /><LG id="anc-b" c={['#ffd36a', '#f39a1e']} /></defs>
    <g {...O}><path d="M33 26 Q30 10 40 12 Q42 4 52 7 Q60 2 64 12 Q74 12 68 26Z" fill="url(#anc-c)" />
      <path d="M22 72 Q10 70 12 58 Q20 64 26 62Z" fill="#f3e3c0" /><path d="M78 72 Q90 70 88 58 Q80 64 74 62Z" fill="#f3e3c0" />
      <ellipse cx="50" cy="57" rx="30" ry="32" fill="url(#anc-h)" /><path d="M46 70 Q44 86 50 88 Q56 86 54 70Z" fill="url(#anc-c)" /></g>
    <Shine x={38} y={38} rx={10} ry={5} /><Blush x={30} y={64} r={4.5} /><Blush x={70} y={64} r={4.5} />
    <path d="M34 39 Q39 35 45 38 M55 38 Q61 35 66 39" fill="none" {...O} strokeWidth="2.2" />
    <Eye x={39} y={49} lid="#f8eed6" rx={5} ry={5.6} look={2} /><Eye x={61} y={49} lid="#f8eed6" rx={5} ry={5.6} look={2} />
    <g {...O} strokeWidth="2.2"><path d="M40 60 Q50 54 60 60 L50 66Z" fill="url(#anc-b)" /><path d="M42 62 L50 72 L58 62Z" fill="#e0861a" /></g>
    <path d="M50 26 q-4 -8 2 -12 M50 26 q6 -6 10 -3" fill="none" stroke="#e8d7b2" strokeWidth="2" /></g>,
  // ควาย — เขาโค้งลายวง แผงขนหน้าผาก ตาปรือ
  <g key="2"><defs><RG id="anb-h" c={['#a6abb7', '#6d717d', '#43464f']} /><LG id="anb-k" c={['#fffaf0', '#e4d4b0', '#b89c6a']} x2="1" y2="0" /><RG id="anb-m" c={['#d6d9df', '#9da2ad']} /></defs>
    <g {...O}><path d="M30 38 C8 36 2 18 10 6 C15 20 26 26 40 28Z" fill="url(#anb-k)" /><path d="M70 38 C92 36 98 18 90 6 C85 20 74 26 60 28Z" fill="url(#anb-k)" />
      <ellipse cx="19" cy="46" rx="12" ry="6" fill="#5a5e69" transform="rotate(-22 19 46)" /><ellipse cx="81" cy="46" rx="12" ry="6" fill="#5a5e69" transform="rotate(22 81 46)" />
      <ellipse cx="50" cy="57" rx="28" ry="32" fill="url(#anb-h)" /></g>
    <path d="M12 16 l4 2 M9 24 l5 1 M88 16 l-4 2 M91 24 l-5 1" stroke="#9a7f52" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M40 30 Q44 22 50 30 Q55 21 60 30 Q55 36 50 33 Q45 36 40 30Z" fill="#34363d" />
    <Shine x={38} y={42} rx={8} ry={4} />
    <Eye x={39} y={49} lid="#6a6e7a" /><Eye x={61} y={49} lid="#6a6e7a" />
    <g {...O}><ellipse cx="50" cy="74" rx="18" ry="13" fill="url(#anb-m)" /></g><ellipse cx="44" cy="69" rx="6" ry="2.5" fill="#fff" opacity=".45" />
    <ellipse cx="43.5" cy="74" rx="2.8" ry="3.6" fill={INK} /><ellipse cx="56.5" cy="74" rx="2.8" ry="3.6" fill={INK} />
    <path d="M44 82 Q50 84 56 82" fill="none" {...O} strokeWidth="2" /></g>,
  // ช้าง — ผ้าคลุมหน้าผากลายทอง งวงม้วน
  <g key="3"><defs><RG id="ane-h" c={['#dbe6f2', '#a9bfd8', '#7a93b3']} /><RG id="ane-e" c={['#f3c2cf', '#a9bfd8', '#7f98b8']} cx=".55" cy=".5" r=".6" /><LG id="ane-c" c={['#e8424a', '#a01e3a']} /></defs>
    <g {...O}><ellipse cx="19" cy="50" rx="18" ry="26" fill="url(#ane-e)" /><ellipse cx="81" cy="50" rx="18" ry="26" fill="url(#ane-e)" />
      <circle cx="50" cy="46" r="28" fill="url(#ane-h)" />
      <path d="M41 58 Q36 80 46 90 Q54 97 62 92 Q66 88 61 85 Q56 89 52 86 Q47 80 57 58Z" fill="url(#ane-h)" />
      <path d="M38 63 Q32 72 37 79 Q41 72 41 65Z M62 63 Q68 72 63 79 Q59 72 59 65Z" fill="#fffaf0" />
      <path d="M36 22 Q50 14 64 22 L58 38 Q50 44 42 38Z" fill="url(#ane-c)" /></g>
    <path d="M40 26 Q50 20 60 26" fill="none" stroke="#f3d27a" strokeWidth="2" /><circle cx="50" cy="32" r="3" fill="#f3d27a" stroke={INK} strokeWidth="1.2" />
    <path d="M47 70 h7 M46 76 h7 M47 82 h6" stroke="#6f86a6" strokeWidth="1.6" strokeLinecap="round" />
    <Shine x={33} y={36} rx={6} ry={3.5} />
    <Eye x={39} y={47} lid="#b4c7dd" rx={5} ry={5.6} /><Eye x={61} y={47} lid="#b4c7dd" rx={5} ry={5.6} /></g>,
  // แมว — ตาเขียวม่านตาเรียว ยิ้มมุมปาก
  <g key="4"><defs><RG id="ant-h" c={['#ffe0b0', '#f6ad55', '#cf7420']} /><RG id="ant-m" c={['#ffffff', '#f4e8dc']} cx=".5" cy=".3" /></defs>
    <g {...O}><path d="M18 46 L22 8 L46 28Z" fill="url(#ant-h)" /><path d="M82 46 L78 8 L54 28Z" fill="url(#ant-h)" />
      <ellipse cx="50" cy="58" rx="34" ry="29" fill="url(#ant-h)" /></g>
    <path d="M25 34 L26 17 L38 28Z M75 34 L74 17 L62 28Z" fill="#ffb3c0" />
    <path d="M50 30 v10 M42 31 v7 M58 31 v7 M17 56 h8 M18 63 h7 M83 56 h-8 M82 63 h-7" stroke="#b5601a" strokeWidth="2.6" strokeLinecap="round" />
    <Shine x={36} y={40} rx={9} ry={4.5} /><Blush x={27} y={68} r={5} /><Blush x={73} y={68} r={5} />
    <Eye x={37} y={52} lid="#f6ad55" rx={6} ry={6.6} iris="#7bcf5a" look={1.4} /><Eye x={63} y={52} lid="#f6ad55" rx={6} ry={6.6} iris="#7bcf5a" look={1.4} />
    <g {...O} strokeWidth="2.2"><path d="M38 68 Q50 58 62 68 Q60 80 50 81 Q40 80 38 68Z" fill="url(#ant-m)" /><path d="M46 64 h8 l-4 4.5Z" fill="#ff8aa0" />
      <path d="M50 69 q-4 5 -8 2 M50 69 q4 5 9 1" fill="none" /></g>
    <path d="M10 66 l20 -1 M11 74 l19 -4 M90 66 l-20 -1 M89 74 l-19 -4" stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity=".7" /></g>,
  // กบ — ลายจุด ปากกว้างยิ้มเจ้าเล่ห์
  <g key="5"><defs><RG id="anf-h" c={['#d8f7b8', '#8fd16a', '#4f9a36']} /><RG id="anf-b" c={['#c8f0a0', '#78bf55']} cx=".4" cy=".3" /></defs>
    <g {...O}><ellipse cx="50" cy="63" rx="40" ry="27" fill="url(#anf-h)" /><circle cx="30" cy="35" r="14" fill="url(#anf-b)" /><circle cx="70" cy="35" r="14" fill="url(#anf-b)" /></g>
    <path d="M18 52 Q50 44 82 52" fill="none" stroke="#4f9a36" strokeWidth="2" opacity=".5" />
    <circle cx="24" cy="62" r="3" fill="#4f9a36" opacity=".6" /><circle cx="78" cy="58" r="2.4" fill="#4f9a36" opacity=".6" /><circle cx="70" cy="76" r="2" fill="#4f9a36" opacity=".6" />
    <Shine x={25} y={28} rx={5} ry={3} /><Shine x={65} y={28} rx={5} ry={3} /><Shine x={34} y={52} rx={11} ry={4} a={-8} />
    <Eye x={30} y={36} lid="#a8e083" rx={7.5} ry={7.8} look={1.6} /><Eye x={70} y={36} lid="#a8e083" rx={7.5} ry={7.8} look={1.6} />
    <circle cx="46" cy="56" r="1.7" fill={INK} /><circle cx="54" cy="56" r="1.7" fill={INK} />
    <path d="M22 64 Q48 82 80 62" fill="none" {...O} /><path d="M77 60 q5 1 5 5" fill="none" {...O} strokeWidth="2" />
    <Blush x={21} y={72} r={5} /><Blush x={80} y={70} r={5} /></g>,
];
export const AniArt = ({ k, size = 64, x, y }) => <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-label={ANIMALS[k]?.n}>{ART[k]}</svg>;

// ฉากหลังบนหน้าไพ่ (กรอบใน 88×100 เริ่มที่ 6,6)
const SCENE = [
  // หมู: บ่อโคลน
  <g key="0"><rect x="6" y="6" width="88" height="100" fill="url(#ans-0)" /><path d="M6 78 Q30 70 52 76 T94 72 V106 H6Z" fill="#8a5a36" /><path d="M6 88 Q34 82 60 88 T94 86 V106 H6Z" fill="#6e4426" />
    <ellipse cx="24" cy="96" rx="12" ry="3.5" fill="#a87650" /><ellipse cx="74" cy="94" rx="10" ry="3" fill="#a87650" /><g fill="#fff" opacity=".35"><circle cx="20" cy="94" r="1.6" /><circle cx="78" cy="92" r="1.3" /></g>
    <g fill="#fff" opacity=".5">{[[16, 20], [82, 26], [70, 14]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" />)}</g></g>,
  // ไก่: ลานฟาง รั้วไม้ ดวงอาทิตย์
  <g key="1"><rect x="6" y="6" width="88" height="100" fill="url(#ans-1)" /><circle cx="78" cy="22" r="10" fill="#ffd36a" opacity=".9" />
    <g stroke="#9a6a3a" strokeWidth="3" strokeLinecap="round"><path d="M6 72 H94 M6 82 H94" />{[14, 34, 66, 86].map(x => <path key={x} d={`M${x} 64 V92`} />)}</g>
    <path d="M6 90 Q50 84 94 90 V106 H6Z" fill="#e6c26a" /><g stroke="#c49a3a" strokeWidth="1.4">{[12, 22, 40, 58, 72, 84].map(x => <path key={x} d={`M${x} 94 l4 -6 M${x + 3} 100 l-3 -5`} />)}</g></g>,
  // ควาย: ทุ่งนา ภูเขา
  <g key="2"><rect x="6" y="6" width="88" height="100" fill="url(#ans-2)" /><path d="M6 62 L28 40 L44 56 L62 36 L94 62Z" fill="#7aa0b8" opacity=".7" />
    <path d="M6 64 H94 V106 H6Z" fill="#8cc85a" /><g stroke="#5a9a3a" strokeWidth="2" strokeLinecap="round">{[70, 78, 86, 94, 102].map((y, i) => <path key={y} d={`M${10 + i * 2} ${y} H${90 - i * 2}`} strokeDasharray="3 4" />)}</g></g>,
  // ช้าง: ป่าใบไม้ใหญ่
  <g key="3"><rect x="6" y="6" width="88" height="100" fill="url(#ans-3)" />
    {[[12, 30, -30, '#3f8a4a'], [88, 24, 30, '#4f9a56'], [10, 80, -60, '#2f7a3e'], [90, 84, 60, '#3f8a4a'], [50, 12, 0, '#2f6e3a']].map(([x, y, a, c], i) => <path key={i} d="M0 0 Q14 -18 0 -36 Q-14 -18 0 0Z" fill={c} transform={`translate(${x} ${y}) rotate(${a}) scale(1.1)`} />)}
    <g stroke="#9fdc8a" strokeWidth="1" opacity=".5"><path d="M12 30 l8 -14 M88 24 l-8 -14" /></g></g>,
  // แมว: เบาะกำมะหยี่ วอลเปเปอร์ลายจุด
  <g key="4"><rect x="6" y="6" width="88" height="100" fill="url(#ans-4)" /><g fill="#fff" opacity=".12">{[16, 36, 56, 76].flatMap(x => [16, 36, 56].map(y => <circle key={x + '-' + y} cx={x + (y % 40 ? 10 : 0)} cy={y} r="3" />))}</g>
    <path d="M6 78 Q50 66 94 78 V106 H6Z" fill="#b8324a" /><path d="M6 80 Q50 69 94 80" fill="none" stroke="#f3d27a" strokeWidth="2" strokeDasharray="2 3" />
    <g fill="#f3d27a">{[14, 86].map(x => <path key={x} d={`M${x} 82 l-3 10 h6Z`} />)}</g></g>,
  // กบ: บึงน้ำ ใบบัว ดอกบัว
  <g key="5"><rect x="6" y="6" width="88" height="100" fill="url(#ans-5)" /><g fill="none" stroke="#fff" opacity=".3" strokeWidth="1.4"><ellipse cx="22" cy="26" rx="10" ry="3" /><ellipse cx="78" cy="40" rx="8" ry="2.4" /></g>
    <path d="M50 96 m-40 0 a40 12 0 1 0 80 0 a40 12 0 1 0 -80 0Z M50 96 L84 90 L82 98Z" fill="#4f9a36" stroke="#2f6a26" strokeWidth="1.6" />
    <g transform="translate(82 24)"><path d="M0 6 Q-8 -2 -2 -10 Q0 -2 0 6 Q0 -2 2 -10 Q8 -2 0 6Z" fill="#ffb3c8" stroke="#c9607e" strokeWidth="1" /></g></g>,
];
const SCENE_BG = [['#ffd9c4', '#f6b49a'], ['#cfe9ff', '#fff3cf'], ['#bfe3f7', '#e9f6ff'], ['#2e6a3a', '#1e4a2a'], ['#6a3a7a', '#4a2458'], ['#7fc6e6', '#4a9ac4']];
const CardFace = ({ k }) => { const a = ANIMALS[k]; const [bad, setBad] = useState(false); const img = bad ? null : cardImg('ani_' + k);
  return <svg viewBox="0 0 100 140" width="100%" height="100%" role="img" aria-label={a.n}>
  <defs><LG id={'ans-' + k} c={SCENE_BG[k]} /><LG id="anf-frame" c={['#fffaf0', '#f1e3c2']} /><clipPath id="anf-clip"><rect x="6" y="6" width="88" height="128" rx="7" /></clipPath></defs>
  <rect x="1.5" y="1.5" width="97" height="137" rx="10" fill="url(#anf-frame)" stroke={INK} strokeWidth="3" />
  {img ? <image href={img} x="6" y="6" width="88" height="128" preserveAspectRatio="xMidYMid slice" clipPath="url(#anf-clip)" onError={() => setBad(true)} />
    : <g clipPath="url(#anf-clip)">{SCENE[k]}<g transform="translate(5 30) scale(.9)">{ART[k]}</g></g>}
  <rect x="6" y="6" width="88" height="128" rx="7" fill="none" stroke={INK} strokeWidth="2" />
</svg>; };
const Back = () => <svg viewBox="0 0 100 140" width="100%" height="100%" aria-hidden="true">
  <defs><RG id="anb-bg" c={['#4a8a56', '#2f5a3a', '#1c3a24']} cx=".5" cy=".45" r=".8" />
    <pattern id="anb-lat" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 H12 M0 0 V12" stroke="#f3d27a" strokeWidth=".8" opacity=".22" /></pattern></defs>
  <rect x="1.5" y="1.5" width="97" height="137" rx="10" fill="url(#anb-bg)" stroke={INK} strokeWidth="3" />
  <rect x="7" y="7" width="86" height="126" rx="6" fill="url(#anb-lat)" stroke="#f3d27a" strokeWidth="2" /><rect x="11" y="11" width="78" height="118" rx="4" fill="none" stroke="#f3d27a" strokeWidth=".8" opacity=".6" />
  {[[14, 14, 0], [86, 14, 90], [86, 126, 180], [14, 126, 270]].map(([x, y, a], i) => <path key={i} d="M0 10 Q0 0 10 0 M3 10 Q3 3 10 3" fill="none" stroke="#f3d27a" strokeWidth="1.6" transform={`translate(${x} ${y}) rotate(${a}) translate(-2 -2)`} />)}
  <circle cx="50" cy="70" r="24" fill="#1c3a24" stroke="#f3d27a" strokeWidth="2.4" /><circle cx="50" cy="70" r="19" fill="none" stroke="#f3d27a" strokeWidth=".8" strokeDasharray="2 2.5" />
  <g fill="#f3d27a"><ellipse cx="50" cy="76" rx="8.5" ry="7.5" /><ellipse cx="40" cy="65" rx="3.6" ry="4.4" transform="rotate(-20 40 65)" /><ellipse cx="46.5" cy="60" rx="3.6" ry="4.6" /><ellipse cx="53.5" cy="60" rx="3.6" ry="4.6" /><ellipse cx="60" cy="65" rx="3.6" ry="4.4" transform="rotate(20 60 65)" /></g>
  <text x="50" y="30" textAnchor="middle" fontFamily="Mitr,sans-serif" fontWeight="600" fontSize="10" fill="#f3d27a" letterSpacing="1">สัตว์หน้านิ่ง</text>
  <text x="50" y="118" textAnchor="middle" fontFamily="Mitr,sans-serif" fontSize="14" fill="#f3d27a" opacity=".8">?</text>
</svg>;
export const AniCard = ({ k, back, n, small, sel, onClick, dim }) => {
  const Tag = onClick ? 'button' : 'div';
  return <Tag type={onClick ? 'button' : undefined} className={'ani-card' + (back ? ' back' : '') + (small ? ' sm' : '') + (sel ? ' sel' : '') + (dim ? ' dim' : '')} onClick={onClick}>
    {back ? <Back /> : <CardFace k={k} />}{n > 0 && <em>×{n}</em>}
  </Tag>;
};
const Claim = ({ k }) => <span className="ani-claim"><AniArt k={k} size={22} /> {ANIMALS[k].n}</span>;

// ---------- หน้าจอ ----------
export function AniGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, onBack, srvNow }) {
  const r = fix(JSON.parse(JSON.stringify(room.round))); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'ani') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const [pick, setPick] = useState({}); const c = r.chain; const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const inGame = r.order.includes(myId) && !r.gone[myId];
  const myPass = !res && r.phase === 'pass' && r.turn === myId; const myResp = !res && r.phase === 'resp' && c?.to === myId;
  const stepKey = r.phase + (r.turn || '') + (c ? c.to + c.path.length + (c.peek ? 'p' : '') : '');
  useEffect(() => { setPick({}); }, [stepKey]);
  useEffect(() => { if (myPass || myResp) sfx(sound, 'yourTurn'); }, [myPass, myResp, stepKey]);
  useEffect(() => { if (r.last) sfx(sound, r.last.right ? 'reveal' : 'nope'); }, [r.last?.at]);
  const due = !res && r.until && srvNow >= r.until;
  useEffect(() => { if (due) tx(cc => aniTick(cc, srvNow)); }, [due, r.at, r.phase]);
  const left = secs(r.until - srvNow); const tot = (r.tmT || (r.phase === 'pass' ? PASS_MS : RESP_MS)) / 1000;
  const others = active(r).filter(id => id !== myId);
  const recent = r.last && srvNow - r.last.at < 7000;
  const name = id => id === myId ? 'คุณ' : nameOf(id);

  const Seat = ({ id }) => {
    const f = r.face[id]; const danger = f.some(n => n >= r.limit - 1);
    return <div className={'ani-seat' + (id === myId ? ' me' : '') + ((r.phase === 'pass' && r.turn === id) || c?.to === id ? ' now' : '') + (r.gone[id] ? ' gone' : '') + (res && r.loser === id ? ' ani-lost' : '') + (danger ? ' ani-warn' : '')}>
      <div className="ani-seat-hd"><Avatar id={id} av={av} size={38} /><div className="ani-seat-tt"><b>{name(id)}</b><small>{r.gone[id] ? 'ออกแล้ว' : `ไพ่หงาย ${total(f)} ใบ`}</small></div><span className="ani-inhand" title="ไพ่ในมือ">🂠 {total(r.hands[id])}</span></div>
      <div className="ani-face">{f.map((n, k) => [n, k]).filter(([n]) => n > 0).sort((a, b) => b[0] - a[0]).map(([n, k]) =>
        <div key={k} className={'ani-fc' + (n >= r.limit - 1 ? ' hot' : '') + (n >= r.limit ? ' dead' : '')} style={{ '--c': ANIMALS[k].c }} title={`${ANIMALS[k].n} ${n}/${r.limit}`}>
          <AniArt k={k} size={40} /><b>{n}</b><span className="ani-pips">{Array.from({ length: r.limit }, (_, i) => <i key={i} className={i < n ? 'on' : ''} />)}</span>
        </div>)}{!total(f) && <i className="ani-none">ยังไม่มีไพ่หงาย 😇</i>}</div>
    </div>;
  };

  if (res) {
    const L = r.loser; const meLost = L === myId;
    return <div className="ani-game">
      <Outcome art={!L ? 'cross' : meLost ? 'lose' : 'win'} tone={meLost ? '' : 'good'} title={!L ? '🚪 ผู้เล่นเหลือไม่พอ จบเกม' : meLost ? '🙈 คุณหน้าแตก!' : `🙈 ${nameOf(L)} หน้าแตก!`}>
        {r.why === 'four' ? <>{name(L)} เก็บ<Claim k={r.loseAnimal} /> หงายครบ {r.limit} ตัว</> : r.why === 'empty' ? `${name(L)} หมดไพ่ในมือตอนถึงตาส่ง` : 'คนอื่นออกจากห้องไปหมด'}
      </Outcome>
      <SecH icon="🐾">ไพ่หงายของทุกคน</SecH>
      <div className="ani-table">{r.order.map(id => <Seat key={id} id={id} />)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </div>;
  }

  const myHand = r.hands[myId] || norm();
  const ClaimPick = ({ val, set }) => <div className="ani-claims">{ANIMALS.map((a, k) => <button key={k} type="button" className={'ani-cbtn' + (val === k ? ' sel' : '')} onClick={() => { sfx(sound, 'select'); set(k); }}><AniArt k={k} size={34} /><span>{a.n}</span></button>)}</div>;

  return <div className="ani-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">แพ้เมื่อสัตว์ชนิดเดียวกันหงายครบ {r.limit} ตัว</span></div>

    {recent && <div className={'ani-last ' + (r.last.right ? 'ok' : 'no')} key={r.last.at}>
      <AniCard k={r.last.card} />
      <div><small>{name(r.last.from)} บอกว่า <Claim k={r.last.claim} /> • {name(r.last.to)} ตอบ “{r.last.truth ? 'จริง' : 'ไม่จริง'}”</small>
        <b>{r.last.right ? '🎯 ทายถูก!' : '😵 ทายผิด!'} {r.last.taker ? `${name(r.last.taker)} รับไพ่ไปหงาย` : 'ไพ่ถูกทิ้ง'}</b></div>
    </div>}

    <section className={'ani-stage' + (myPass || myResp ? ' me' : '')}>
      {r.phase === 'pass' && <div className="ani-flight"><Avatar id={r.turn} av={av} size={64} /><div className="ani-ft"><span className="ct-kicker">🂠 ตาส่งไพ่</span><h2>{r.turn === myId ? 'ตาคุณ! ส่งไพ่คว่ำ 1 ใบ' : `${nameOf(r.turn)} กำลังเลือกไพ่…`}</h2><small>เลือกไพ่ เลือกเหยื่อ แล้วบอกว่าเป็นตัวอะไร (โกหกได้)</small></div><TimerRing secs={left} total={tot} size={58} label="วิ" /></div>}
      {r.phase === 'resp' && c && <>
        <div className="ani-flight"><Avatar id={c.from} av={av} size={52} /><div className="ani-fly"><AniCard back small /><span className="ani-bubble">“นี่คือ <Claim k={c.claim} />”</span></div><Avatar id={c.to} av={av} size={52} /><TimerRing secs={left} total={tot} size={58} label="วิ" /></div>
        <p className="hint">{name(c.from)} → {name(c.to)} • {c.peek ? `${name(c.to)} แอบดูแล้ว กำลังเลือกส่งต่อ…` : `${name(c.to)} กำลังคิดว่าจริงหรือไม่จริง…`}</p>
        {c.path.length > 1 && <div className="ani-path">👀 เห็นไพ่ใบนี้แล้ว: {Object.keys(c.seen).map(id => <Avatar key={id} id={id} av={av} size={22} />)}</div>}
      </>}
    </section>

    <SecH icon="🐾">โต๊ะ</SecH>
    <div className="ani-table">{r.order.map(id => <Seat key={id} id={id} />)}</div>

    {inGame && <><SecH icon="🃏">ไพ่ในมือคุณ ({total(myHand)} ใบ)</SecH>
      <div className="ani-hand">{myHand.map((n, k) => n > 0 && <AniCard key={k} k={k} n={n} />)}{!total(myHand) && <i className="hint">ไม่มีไพ่เหลือ ถ้าถึงตาส่งจะแพ้ทันที!</i>}</div></>}

    {/* ส่งไพ่ */}
    <ActionSheet open={myPass} k={'p' + stepKey} icon="🂠" title="ส่งไพ่คว่ำ" sub="เลือกไพ่ → เลือกคนรับ → บอกว่าเป็นตัวอะไร" secs={left} total={(r.tmT || PASS_MS) / 1000}>
      <small className="ani-step">1. ไพ่ใบไหน (เห็นคนเดียว)</small>
      <div className="ani-hand">{myHand.map((n, k) => n > 0 && <AniCard key={k} k={k} n={n} sel={pick.card === k} onClick={() => { sfx(sound, 'card'); setPick(p => ({ ...p, card: k })); }} />)}</div>
      <small className="ani-step">2. ส่งให้ใคร</small>
      <PlayerGrid ids={others} av={av} nameOf={nameOf} selected={pick.to} small onPick={t => { sfx(sound, 'select'); setPick(p => ({ ...p, to: t })); }} />
      <small className="ani-step">3. บอกว่า “นี่คือ…”</small>
      <ClaimPick val={pick.claim} set={k => setPick(p => ({ ...p, claim: k }))} />
      <button className="primary wide" disabled={pick.card == null || !pick.to || pick.claim == null} onClick={() => { sfx(sound, 'confirm'); tx(cc => aniPass(cc, myId, pick.card, pick.to, pick.claim, srvNow)); }}>🤫 ส่งไพ่ {pick.claim != null ? `“นี่คือ${ANIMALS[pick.claim].n}”` : ''}</button>
    </ActionSheet>

    {/* รับไพ่: ตอบ หรือ แอบดู */}
    <ActionSheet open={myResp && !c.peek} k={'r' + stepKey} icon="🤔" title={c ? `${nameOf(c.from)} บอกว่า “นี่คือ${ANIMALS[c.claim].n}”` : ''} sub="เชื่อไหม? ใครผิดต้องรับไพ่ใบนี้ไปหงาย" secs={left} total={(r.tmT || RESP_MS) / 1000}>
      {c && <div className="ani-recv"><AniCard back /><span className="ani-bubble big">“นี่คือ <Claim k={c.claim} />”</span></div>}
      <div className="ani-calls">
        <button className="primary" onClick={() => { sfx(sound, 'confirm'); tx(cc => aniCall(cc, myId, true, srvNow)); }}>✅ จริง</button>
        <button className="primary ani-lie" onClick={() => { sfx(sound, 'confirm'); tx(cc => aniCall(cc, myId, false, srvNow)); }}>❌ ไม่จริง</button>
      </div>
      {c && canPassOn(r).length > 0 ? <button className="secondary wide" onClick={() => { sfx(sound, 'card'); tx(cc => aniPeek(cc, myId, srvNow)); }}>👀 แอบดู แล้วส่งต่อให้คนอื่น</button> : <p className="hint">ทุกคนเห็นไพ่ใบนี้แล้ว — คุณต้องตอบ</p>}
    </ActionSheet>

    {/* แอบดูแล้วส่งต่อ */}
    <ActionSheet open={myResp && !!c?.peek} k={'o' + stepKey} icon="👀" title="แอบดูแล้ว — ส่งต่อ" sub="ส่งให้คนที่ยังไม่เห็นไพ่ บอกเหมือนเดิมหรือเปลี่ยนก็ได้" secs={left} total={(r.tmT || RESP_MS) / 1000}>
      {c && <div className="ani-recv"><AniCard k={c.card} /><small>ไพ่จริงคือ <b>{ANIMALS[c.card].n}</b> • {nameOf(c.from)} บอกว่า{ANIMALS[c.claim].n}</small></div>}
      <small className="ani-step">ส่งให้ใคร</small>
      <PlayerGrid ids={canPassOn(r)} av={av} nameOf={nameOf} selected={pick.to} small onPick={t => { sfx(sound, 'select'); setPick(p => ({ ...p, to: t })); }} />
      <small className="ani-step">บอกว่า “นี่คือ…”</small>
      <ClaimPick val={pick.claim} set={k => setPick(p => ({ ...p, claim: k }))} />
      <button className="primary wide" disabled={!pick.to || pick.claim == null} onClick={() => { sfx(sound, 'confirm'); tx(cc => aniPassOn(cc, myId, pick.to, pick.claim, srvNow)); }}>🤫 ส่งต่อ</button>
    </ActionSheet>

    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 6).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    {isHost && <HostBar>
      <button className="secondary" onClick={() => { if (confirm('ให้ระบบเล่นแทนคนที่กำลังคิดอยู่ (สุ่ม)?')) tx(cc => aniForce(cc, srvNow)); }}>⏩ ข้าม (ระบบเลือกแทน)</button>
      {active(r).filter(id => !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(cc => kickAni(cc, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
    </HostBar>}
  </div>;
}

// ---------- ห้องรอ: โหมดเกม ----------
export function AniLobby({ db, roomCode, room, isHost, sound }) {
  const set = room.settings?.ani || {};
  const save = patch => runTransaction(ref(db, `rooms/${roomCode}/settings/ani`), c => ({ ...(c || {}), ...patch })).catch(() => {});
  return <div className="uc-lobby">
    <label>🐾 แพ้เมื่อสัตว์ชนิดเดียวกันหงายครบ {isHost ? '' : '(หัวหน้าห้องตั้ง)'}</label>
    <select value={+set.limit === 3 ? 3 : 4} disabled={!isHost} onChange={e => { sfx(sound, 'select'); save({ limit: +e.target.value }); }}><option value={4}>4 ตัว (ปกติ)</option><option value={3}>3 ตัว (เกมเร็ว)</option></select>
    <div className="ani-hand lobby">{ANIMALS.map((_, k) => <AniCard key={k} k={k} n={PER} />)}</div>
  </div>;
}
