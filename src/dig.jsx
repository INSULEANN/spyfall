// เกม "ขุดสมบัติป่าช้า" ⛏️🪦 — นักล่าสมบัติต่อทางเดินฝ่าป่าช้า บทบาทลับ (ต้นฉบับของเว็บนี้)
//   👷 นักขุด   ต่อทางเดินจากประตูป่าช้าไปให้ถึงหีบสมบัติ (1 ใน 3 ป้ายหลุมปลายทาง)
//   😈 ตัวป่วน  แอบขวาง — ถ้านักขุดขุดไปเจอหลุมศพที่มีแต่กระดูก หรือการ์ดหมดกองและหมดมือก่อนถึงสมบัติ ตัวป่วนชนะ
// ตาของคุณทำ 1 อย่าง: วางการ์ดทางเดิน / เล่นการ์ดพิเศษ / ทิ้ง 1 ใบ แล้วจั่ว
// กระดาน: board["x_y"] = { m: ขอบที่เปิด (N1 E2 S4 W8), d: 1 = ทางตัน (ตรงกลางมีหินกั้น), s: 1 = ปากหลุม }
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint, pickBad } from './rand.js';
import { Avatar, PlayerGrid, Leaderboard, HostBar, SecH, TimerRing, ActionSheet } from './ui.jsx';
import { ArtSvg } from './cards.jsx';
import './dig.css';

export const DIG_MIN = 3, DIG_MAX = 10;
export const DIG_SCORE = { dig: 2, finisher: 1, sab: 3, soloSab: 4 };
export const BW = 11, BH = 7;                       // กระดาน 11 × 7 ช่อง
export const START = [1, 3], GOALS = [[9, 1], [9, 3], [9, 5]];
export const sabCount = n => (n <= 5 ? 1 : n <= 8 ? 2 : 3);
export const handSize = n => (n <= 5 ? 6 : n <= 7 ? 5 : 4);
const DIRS = [[1, 0, -1], [2, 1, 0], [4, 0, 1], [8, -1, 0]]; // [บิต, dx, dy]
export const flip = m => ((m << 2) | (m >> 2)) & 15;           // หมุน 180°: เหนือ↔ใต้ ออก↔ตก
// หมุนตามเข็มนาฬิกาทีละ 90° k ครั้ง (บิต เหนือ→ออก→ใต้→ตก)
export const rotM = (m, k = 0) => { k = ((k % 4) + 4) % 4; for (let i = 0; i < k; i++) m = ((m << 1) | (m >> 3)) & 15; return m; };
// การ์ดเป็นทรงยาว → กลับหัวได้แค่ 180° (k = 0 หรือ 2) • ทางที่สมมาตรอยู่แล้ว (ทางตรง/สี่แยก) มีแบบเดียว
export const rotsOf = m => (rotM(m, 2) === m ? [0] : [0, 2]);
const K = (x, y) => x + '_' + y;
const TOOLS = { p: { n: 'จอบ', e: '⛏️', img: 'dig_pick' }, l: { n: 'ตะเกียง', e: '🏮', img: 'dig_lamp' }, c: { n: 'รถเข็น', e: '🛒', img: 'dig_cart' } };
export const ROLE = { dig: { n: 'นักขุด', e: '👷', img: 'dig_role_d' }, sab: { n: 'ตัวป่วน', e: '😈', img: 'dig_role_s' } };

// ---------- การ์ด ----------
// ทางเดิน: 'p' + mask (+ 'd' = ทางตัน)   การ์ดพิเศษ: ดู ACT
export const ACT = {
  bp: { n: 'ทุบจอบ', e: '🔨', t: 'brk', tool: 'p', img: 'dig_pick', x: 'brk', d: 'ทำจอบของเพื่อนพัง (มีเครื่องมือพังวางทางไม่ได้)' },
  bl: { n: 'ทุบตะเกียง', e: '🔨', t: 'brk', tool: 'l', img: 'dig_lamp', x: 'brk', d: 'ทำตะเกียงของเพื่อนพัง' },
  bc: { n: 'ทุบรถเข็น', e: '🔨', t: 'brk', tool: 'c', img: 'dig_cart', x: 'brk', d: 'ทำรถเข็นของเพื่อนพัง' },
  fp: { n: 'ซ่อมจอบ', e: '🔧', t: 'fix', tools: 'p', img: 'dig_pick', x: 'fix', d: 'ซ่อมจอบให้ใครก็ได้ (รวมตัวเอง)' },
  fl: { n: 'ซ่อมตะเกียง', e: '🔧', t: 'fix', tools: 'l', img: 'dig_lamp', x: 'fix', d: 'ซ่อมตะเกียงให้ใครก็ได้' },
  fc: { n: 'ซ่อมรถเข็น', e: '🔧', t: 'fix', tools: 'c', img: 'dig_cart', x: 'fix', d: 'ซ่อมรถเข็นให้ใครก็ได้' },
  fpl: { n: 'ซ่อมจอบ/ตะเกียง', e: '🔧', t: 'fix', tools: 'pl', img: 'dig_pick', x: 'fix', d: 'ซ่อมได้ 1 อย่าง: จอบ หรือ ตะเกียง' },
  fpc: { n: 'ซ่อมจอบ/รถเข็น', e: '🔧', t: 'fix', tools: 'pc', img: 'dig_cart', x: 'fix', d: 'ซ่อมได้ 1 อย่าง: จอบ หรือ รถเข็น' },
  flc: { n: 'ซ่อมตะเกียง/รถเข็น', e: '🔧', t: 'fix', tools: 'lc', img: 'dig_lamp', x: 'fix', d: 'ซ่อมได้ 1 อย่าง: ตะเกียง หรือ รถเข็น' },
  fall: { n: 'ต้นไม้ล้ม', e: '🌳', t: 'fall', img: 'dig_fall', d: 'โค่นต้นไม้ขวางทางเดิน 1 ช่องบนกระดาน (ยกเว้นประตูป่าช้ากับหลุมปลายทาง)' },
  map: { n: 'แผนที่เก่า', e: '🗺️', t: 'map', img: 'dig_map', d: 'แอบดูป้ายหลุมปลายทาง 1 ใบ (เห็นคนเดียว)' },
  spy: { n: 'ส่องบทบาท', e: '🔍', t: 'spy', img: 'dig_spy', d: 'แอบดูบทบาทของเพื่อน 1 คน (เห็นคนเดียว)' },
  mask: { n: 'สลับหน้ากาก', e: '🎭', t: 'mask', img: 'dig_mask', d: 'เลือก 1 คน (รวมตัวเองได้) ทิ้งบทบาทเดิม แล้วจั่วบทบาทใหม่' },
  swap: { n: 'แลกไพ่ทั้งมือ', e: '🔄', t: 'swap', img: 'dig_swap', d: 'แลกการ์ดทั้งมือกับเพื่อน 1 คน แล้วเขาจั่วเพิ่ม 1 ใบ (คุณไม่จั่ว)' },
};
// กลับหัวได้แค่ 180° → ทางนอน (p10) กับทางตั้ง (p5) เป็นคนละใบ • ทางนอนพาไปหาสมบัติ เลยมีมากกว่า
const PATHS = [['p15', 5], ['p14', 5], ['p13', 5], ['p10', 5], ['p5', 3], ['p6', 4], ['p12', 5], ['p15d', 1], ['p14d', 1], ['p13d', 1], ['p10d', 1], ['p5d', 1], ['p6d', 1], ['p12d', 1], ['p2d', 1], ['p4d', 1]];
const ACTS = [['bp', 3], ['bl', 3], ['bc', 3], ['fp', 2], ['fl', 2], ['fc', 2], ['fpl', 1], ['fpc', 1], ['flc', 1], ['fall', 3], ['map', 5], ['spy', 2], ['mask', 2], ['swap', 2]];
export const isPath = c => c[0] === 'p' && /^p\d/.test(c);
export const pathOf = c => ({ m: parseInt(c.slice(1), 10), d: c.endsWith('d') ? 1 : 0 });
export const cardName = c => (isPath(c) ? (pathOf(c).d ? 'ทางตัน' : 'ทางเดิน') : ACT[c]?.n || c);
export function buildDeck() { const d = []; [...PATHS, ...ACTS].forEach(([c, n]) => { for (let i = 0; i < n; i++) d.push(c); }); return d; }

const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-40); };
// การ์ดที่เพิ่งลง → ป๊อปอัปแจ้งทุกคน (r.last)
const mark = (r, by, c, text) => { say(r, text); r.last = { by, c, text, at: Date.now() }; };
export const fix = r => { r.board = r.board || {}; r.hands = r.hands || {}; r.broken = r.broken || {}; r.deck = r.deck || []; r.goals = r.goals || []; r.seen = r.seen || {}; r.gone = r.gone || {}; r.log = r.log || []; r.roleDeck = r.roleDeck || []; return r; };
export const handOf = (r, id) => r.hands?.[id] || [];
export const brokenOf = (r, id) => Object.keys(r.broken?.[id] || {}).filter(k => r.broken[id][k]);
export const current = r => r.order[r.turn];

export function makeDigRound(ids, set = {}, number = 1, t0 = Date.now(), hist = []) {
  const n = ids.length; const sabs = pickBad(ids, sabCount(n), hist);
  const roles = {}; ids.forEach(id => { roles[id] = sabs.includes(id) ? 'sab' : 'dig'; });
  const deck = shuffle(buildDeck()); const hs = handSize(n); const hands = {};
  ids.forEach(id => { hands[id] = deck.splice(0, hs); });
  const gold = rint(3);
  const turnMs = Math.max(20, Math.min(180, +set.sec || 60)) * 1000;
  return {
    number, kind: 'dig', roles, roles0: { ...roles }, roleDeck: shuffle(['dig', 'sab']), order: shuffle(ids), turn: 0, turnMs, until: t0 + 3000 + turnMs, at: t0,
    board: { [K(...START)]: { m: 15, s: 1 } }, goals: GOALS.map((_, i) => ({ t: i === gold ? 'gold' : 'rock', open: 0 })),
    deck, hands, broken: {}, seen: {}, gone: {}, log: [], phase: 'play', startedAt: t0,
  };
}

// ---------- กระดาน ----------
const inB = (x, y) => x >= 0 && y >= 0 && x < BW && y < BH;
export const goalAt = (x, y) => GOALS.findIndex(([gx, gy]) => gx === x && gy === y);
// หาทางที่ต่อจากปากหลุมได้: conn = ช่องที่ "เดินผ่านได้" (ทางเดินปกติ) • touched = ปลายทางที่อุโมงค์ชนแล้ว
export function reach(r) {
  const b = r.board || {}; const conn = new Set([K(...START)]); const q = [START]; const touched = new Set();
  while (q.length) {
    const [x, y] = q.shift(); const t = b[K(x, y)];
    for (const [bit, dx, dy] of DIRS) {
      if (!(t.m & bit)) continue; const nx = x + dx, ny = y + dy; const g = goalAt(nx, ny);
      if (g >= 0) { touched.add(g); continue; }
      const nt = b[K(nx, ny)]; if (!nt || !(nt.m & flip(bit))) continue;
      const kk = K(nx, ny); if (conn.has(kk) || nt.d) continue; conn.add(kk); q.push([nx, ny]);
    }
  }
  return { conn, touched };
}
// วางการ์ดทาง (m, d) ที่ช่อง x,y ได้ไหม (ขอบต้องตรงกับเพื่อนบ้านทุกด้าน และต้องต่อกับทางที่มาจากปากหลุม)
export function canPlace(r, x, y, m, d, rc) {
  if (!inB(x, y) || goalAt(x, y) >= 0 || r.board?.[K(x, y)]) return false;
  const { conn } = rc || reach(r); let link = false, any = false;
  for (const [bit, dx, dy] of DIRS) {
    const nx = x + dx, ny = y + dy; if (goalAt(nx, ny) >= 0) continue;
    const nt = r.board?.[K(nx, ny)]; if (!nt) continue; any = true;
    const a = !!(m & bit), bb = !!(nt.m & flip(bit)); if (a !== bb) return false;
    if (a && conn.has(K(nx, ny))) link = true;
  }
  return any && link;
}
export function placesFor(r, card) {
  const { m, d } = pathOf(card); const rc = reach(r); const out = [];
  const ks = rotsOf(m);
  for (let y = 0; y < BH; y++) for (let x = 0; x < BW; x++) { const rots = ks.filter(k => canPlace(r, x, y, rotM(m, k), d, rc)); if (rots.length) out.push({ x, y, rot: rots[0], rots }); }
  return out;
}
export const fallable = r => Object.keys(r.board || {}).filter(k => !r.board[k].s);
const fixable = (r, id, tools) => brokenOf(r, id).filter(t => tools.includes(t));
const canBreak = (r, id, tool) => !r.broken?.[id]?.[tool];

// ---------- จบรอบ / เดินตา ----------
function finish(cur, winner, now, finisher = null) {
  const r = cur.round; const pts = {}; const sc = { ...(cur.scores || {}) };
  const ids = Object.keys(r.roles); const sabs = ids.filter(id => r.roles[id] === 'sab');
  ids.forEach(id => { const role = r.roles[id]; let p = 0;
    if (winner === 'dig' && role === 'dig') p = DIG_SCORE.dig + (id === finisher ? DIG_SCORE.finisher : 0);
    if (winner === 'sab' && role === 'sab') p = sabs.length === 1 ? DIG_SCORE.soloSab : DIG_SCORE.sab;
    pts[id] = p; if (cur.players?.[id]) sc[id] = (sc[id] || 0) + p; });
  r.phase = 'done'; r.at = now; r.finisher = finisher; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'dig', winner, points: pts };
  return cur;
}
const active = r => r.order.filter(id => !r.gone?.[id]);
function advance(cur, now) {
  const r = cur.round; const n = r.order.length;
  if (!r.deck.length && active(r).every(id => !handOf(r, id).length)) { say(r, '🕯️ การ์ดหมดกองและหมดมือแล้ว — ยังไม่เจอสมบัติ!'); return finish(cur, 'sab', now); }
  for (let i = 1; i <= n; i++) { const k = (r.turn + i) % n; const id = r.order[k]; if (!r.gone?.[id] && handOf(r, id).length) { r.turn = k; r.until = now + (r.turnMs || 60000); r.at = now; r.tn = (r.tn || 0) + 1; return cur; } }
  say(r, '🕯️ ไม่มีใครเหลือการ์ดแล้ว'); return finish(cur, 'sab', now);
}
function take(r, me, idx, card) { const h = [...handOf(r, me)]; if (h[idx] !== card) return false; h.splice(idx, 1); r.hands = { ...r.hands, [me]: h }; return true; }
function draw(r, id) { if (!r.deck.length) return; r.hands = { ...r.hands, [id]: [...handOf(r, id), r.deck[0]] }; r.deck = r.deck.slice(1); }
function remember(r, me, key, val) { r.seen = { ...r.seen, [me]: { ...(r.seen[me] || {}), [key]: val } }; }
function check(r) { // ปลายทางที่ทางเดินชน → พลิก • คืน 'gold' (นักขุดชนะ) / 'rock' (ขุดเจอหิน = นักขุดแพ้ทันที) / null
  const { touched } = reach(r); let gold = false, rock = false;
  touched.forEach(g => { const G = r.goals[g]; if (G.open) return; G.open = 1; if (G.t === 'gold') gold = true; else rock = true; say(r, G.t === 'gold' ? '💰 ขุดทะลุถึงหีบสมบัติ!!' : `💀 พลิกปลายทางที่ ${g + 1} — เจอแต่กระดูก! นักขุดพลาด`); r.fx = { k: G.t === 'gold' ? 'gold' : 'rock', g, at: Date.now() }; });
  return gold ? 'gold' : rock ? 'rock' : null;
}

// ---------- การกระทำ (เรียกใน transaction) ----------
// a = { idx, card, x, y, rot, target, tool, goal }
export function digPlay(cur, me, a, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'play' || current(r) !== me) return;
  const { idx, card } = a; if (handOf(r, me)[idx] !== card) return;
  if (isPath(card)) {
    if (brokenOf(r, me).length) return; const p = pathOf(card); const m = rotM(p.m, +a.rot || 0);
    if (!canPlace(r, a.x, a.y, m, p.d)) return;
    take(r, me, idx, card); r.board = { ...r.board, [K(a.x, a.y)]: { m, ...(p.d ? { d: 1 } : {}), by: me } };
    mark(r, me, card, `${p.d ? '🧱 วางทางตัน' : '⛏️ ขุดทางต่อ'} — {${me}}`);
    const hit = check(r);
    if (hit === 'gold') { draw(r, me); return finish(cur, 'dig', now, me); }
    if (hit === 'rock') { r.rockBy = me; return finish(cur, 'sab', now); }   // ขุดไปเจอแต่กระดูก = แพ้ทันที
  } else {
    const A = ACT[card]; if (!A) return; const t = a.target;
    const isP = id => r.roles[id] && !r.gone?.[id] && r.order.includes(id);
    if (A.t === 'brk') { if (!isP(t) || t === me || !canBreak(r, t, A.tool)) return; take(r, me, idx, card); r.broken = { ...r.broken, [t]: { ...(r.broken[t] || {}), [A.tool]: true } }; mark(r, me, card, `🔨 {${me}} ทุบ${TOOLS[A.tool].n}ของ {${t}}`); r.fx = { k: 'brk', id: t, tool: A.tool, at: now }; }
    else if (A.t === 'fix') { if (!isP(t)) return; const can = fixable(r, t, A.tools); const tool = can.includes(a.tool) ? a.tool : can[0]; if (!tool) return; take(r, me, idx, card); const bt = { ...(r.broken[t] || {}) }; delete bt[tool]; r.broken = { ...r.broken, [t]: bt }; mark(r, me, card, `🔧 {${me}} ซ่อม${TOOLS[tool].n}ให้ {${t}}`); }
    else if (A.t === 'fall') { const k = K(a.x, a.y); const c = r.board[k]; if (!c || c.s) return; take(r, me, idx, card); const b = { ...r.board }; delete b[k]; r.board = b; mark(r, me, card, `🌳 {${me}} โค่นต้นไม้ขวางทางเดิน 1 ช่อง`); r.fx = { k: 'fall', x: a.x, y: a.y, at: now }; }
    else if (A.t === 'map') { const g = +a.goal; if (!(g >= 0 && g < 3) || r.goals[g].open) return; take(r, me, idx, card); remember(r, me, 'g' + g, r.goals[g].t); r.peek = { ...(r.peek || {}), [me]: { k: 'map', g, v: r.goals[g].t, at: now } }; mark(r, me, card, `🗺️ {${me}} แอบส่องแผนที่ ดูปลายทางที่ ${g + 1}`); }
    else if (A.t === 'spy') { if (!isP(t) || t === me) return; take(r, me, idx, card); remember(r, me, 'r_' + t, r.roles[t]); r.peek = { ...(r.peek || {}), [me]: { k: 'spy', id: t, v: r.roles[t], at: now } }; mark(r, me, card, `🔍 {${me}} แอบส่องบทบาทของ {${t}}`); }
    else if (A.t === 'mask') { if (!isP(t)) return; take(r, me, idx, card); const old = r.roles[t]; let rd = [...r.roleDeck]; if (!rd.length) rd = shuffle(r.roleDiscard || ['dig', 'sab']); const nr = rd.shift(); r.roleDeck = rd; r.roleDiscard = [...(r.roleDiscard || []), old]; r.roles = { ...r.roles, [t]: nr }; r.masked = { ...(r.masked || {}), [t]: (r.masked?.[t] || 0) + 1 }; mark(r, me, card, `🎭 {${me}} สลับหน้ากากให้ {${t}} — จั่วบทบาทใหม่!`); r.fx = { k: 'mask', id: t, at: now }; }
    else if (A.t === 'swap') { if (!isP(t) || t === me || !handOf(r, t).length) return; take(r, me, idx, card); const mine = handOf(r, me), his = handOf(r, t); r.hands = { ...r.hands, [me]: his, [t]: mine }; draw(r, t); mark(r, me, card, `🔄 {${me}} แลกการ์ดทั้งมือกับ {${t}}`); return advance(cur, now); }
    else return;
  }
  draw(r, me); return advance(cur, now);
}
export function digDiscard(cur, me, idx, card, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'play' || current(r) !== me || !take(r, me, idx, card)) return;
  mark(r, me, null, `🗑️ {${me}} ทิ้งการ์ด 1 ใบ`); draw(r, me); return advance(cur, now);
}
// หมดเวลา → ทิ้งการ์ดสุ่ม 1 ใบให้อัตโนมัติ (ไม่ให้เกมค้าง)
export function digTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'dig' || cur.status !== 'playing' || r.phase !== 'play' || now < r.until) return; fix(r);
  const id = current(r); const h = handOf(r, id);
  if (!h.length || r.gone?.[id]) return advance(cur, now);
  const i = rint(h.length); const c = h[i]; take(r, id, i, c); mark(r, id, null, `⏰ {${id}} หมดเวลา — ทิ้งการ์ดให้อัตโนมัติ`); draw(r, id); return advance(cur, now);
}
// หัวหน้าห้อง: ข้ามตาคนที่ค้าง (ทิ้งการ์ดสุ่มให้)
export function digSkip(cur, now) { const r = cur.round; if (!r || cur.status !== 'playing') return; fix(r); r.until = now; return digTick(cur, now); }
export function kickDig(cur, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || cur.players?.[id] || !r.roles[id] || r.gone?.[id]) return;
  r.gone = { ...r.gone, [id]: true }; r.hands = { ...r.hands, [id]: [] }; say(r, `🚪 {${id}} ออกจากเกม`);
  if (!active(r).length) return finish(cur, 'sab', now);
  if (current(r) === id) return advance(cur, now);
  return cur;
}
// บอทง่าย ๆ สำหรับทดสอบ: วางทางที่ไปทางขวาได้ก่อน ไม่งั้นทิ้ง
export function digBot(cur, me, now) {
  const r = fix(cur.round); const h = handOf(r, me);
  if (!brokenOf(r, me).length) { let best = null; h.forEach((c, idx) => { if (!isPath(c) || pathOf(c).d) return; placesFor(r, c).forEach(p => { if (!best || p.x > best.x) best = { ...p, idx, card: c }; }); }); if (best) return digPlay(cur, me, best, now); }
  const fi = h.findIndex(c => ACT[c]?.t === 'fix' && fixable(r, me, ACT[c].tools).length); if (fi >= 0) return digPlay(cur, me, { idx: fi, card: h[fi], target: me }, now);
  return digDiscard(cur, me, 0, h[0], now);
}

// ================= หน้าจอ =================
const EARTH = '#3a2a1f', DIRT = '#c79a5e', DIRT2 = '#8a6238';
// การ์ดทรงยาว 2:3 (กว้าง 100 × สูง 150) — ทางเดินแนวตั้งจึงยาวกว่าแนวนอน
export const TW = 100, TH = 150;
// ของประดับในดิน (วาดเล็ก ๆ ตามมุมการ์ด — มุมทั้งสี่ไม่มีทางเดินผ่านเสมอ)
const BONE = '#e8dcc0', BONE2 = '#9c8c6c';
const Bone = ({ x, y, a = 0, s = 1 }) => <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`} fill={BONE} stroke={BONE2} strokeWidth="1.2">
  <rect x="-9" y="-2" width="18" height="4" rx="1.5" /><circle cx="-9" cy="-2.6" r="2.8" /><circle cx="-9" cy="2.6" r="2.8" /><circle cx="9" cy="-2.6" r="2.8" /><circle cx="9" cy="2.6" r="2.8" /></g>;
const Skull = ({ x, y, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M-8 2 Q-9 -10 0 -10 Q9 -10 8 2 L5 4 V8 H-5 V4 Z" fill={BONE} stroke={BONE2} strokeWidth="1.2" />
  <circle cx="-3.4" cy="-1.5" r="2.4" fill="#2a1d15" /><circle cx="3.4" cy="-1.5" r="2.4" fill="#2a1d15" /><path d="M0 2 l-1.2 2.2 h2.4 Z M-2.5 8 V5.5 M0 8 V5.5 M2.5 8 V5.5" fill="#2a1d15" stroke="#2a1d15" strokeWidth=".8" /></g>;
const Root = ({ d }) => <path d={d} fill="none" stroke="#5a3f28" strokeWidth="2.2" strokeLinecap="round" />;
// มุมทั้งสี่: [x, y] กลางมุม • สุ่มแบบคงที่ตามรูปทาง (การ์ดแบบเดียวกันหน้าตาเหมือนกัน)
const CORNERS = [[17, 26], [83, 26], [17, 124], [83, 124]];
// ไล่สี/ลายที่ใช้ร่วมกันทุกช่อง (id ซ้ำในหลาย svg ได้ — หน้าตาเหมือนกันหมด)
// ธีม: ป่าช้ายามค่ำบนดิน — พื้นหญ้า ทางดินมีหินวางเป็นทางเดิน
const TileDefs = () => <defs>
  <linearGradient id="dg-grass" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stopColor="#34502e" /><stop offset=".55" stopColor="#2a4326" /><stop offset="1" stopColor="#1d301b" /></linearGradient>
  <linearGradient id="dg-path" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b08a5a" /><stop offset=".5" stopColor="#9c784a" /><stop offset="1" stopColor="#84633c" /></linearGradient>
  <radialGradient id="dg-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffcf6a" stopOpacity=".55" /><stop offset="1" stopColor="#ffcf6a" stopOpacity="0" /></radialGradient>
  <linearGradient id="dg-stone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b4aea6" /><stop offset=".6" stopColor="#8a847c" /><stop offset="1" stopColor="#625d57" /></linearGradient>
  <linearGradient id="dg-grave" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#a4a0aa" /><stop offset="1" stopColor="#6c6874" /></linearGradient>
</defs>;
// ก้อนหินมีแสงเงา
const Stone = ({ x, y, r, a = 0 }) => <g transform={`translate(${x} ${y}) rotate(${a})`}>
  <path d={`M${-r} ${r * .3} Q${-r * 1.05} ${-r * .6} ${-r * .3} ${-r * .85} Q${r * .5} ${-r * 1.05} ${r * .95} ${-r * .2} Q${r * 1.1} ${r * .55} ${r * .4} ${r * .75} Q${-r * .4} ${r * .95} ${-r} ${r * .3}Z`} fill="url(#dg-stone)" stroke="#2a2522" strokeWidth="1.4" strokeLinejoin="round" />
  <path d={`M${-r * .55} ${-r * .35} Q${-r * .1} ${-r * .75} ${r * .45} ${-r * .45}`} stroke="#ddd8d0" strokeWidth={Math.max(.8, r * .16)} fill="none" strokeLinecap="round" opacity=".75" /></g>;
// ป้ายหลุมเล็ก ๆ / ไม้กางเขน ประดับมุม
const MiniGrave = ({ x, y, s = 1, tilt = 0 }) => <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
  <ellipse cx="0" cy="9" rx="10" ry="3" fill="#0f1a0e" opacity=".5" />
  <path d="M-7 9 V-4 Q-7 -11 0 -11 Q7 -11 7 -4 V9Z" fill="url(#dg-grave)" stroke="#2e2a34" strokeWidth="1.4" />
  <path d="M-4.5 7 V-4 Q-4.5 -8 0 -8.5" stroke="#cfcbd4" strokeWidth="1.1" fill="none" opacity=".7" />
  <path d="M-1.4 -6 h2.8 v2.4 h2.4 v2.6 h-2.4 v5 h-2.8 v-5 h-2.4 v-2.6 h2.4Z" fill="#55515c" />
  <path d="M-7 7 q3 -3 5 0 q2 -2 4 1" fill="#4f6a34" /></g>;
const MiniCross = ({ x, y, s = 1, tilt = 0 }) => <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
  <ellipse cx="0" cy="10" rx="7" ry="2.4" fill="#0f1a0e" opacity=".5" />
  <path d="M-1.8 10 V-10 M-8 -4 H5" stroke="#2a1a0e" strokeWidth="5" strokeLinecap="round" /><path d="M-1.8 10 V-10 M-8 -4 H5" stroke="#8a5e36" strokeWidth="3" strokeLinecap="round" /></g>;
const Tuft = ({ x, y, c = '#4f7a3a' }) => <path d={`M${x - 3} ${y} q1 -5 0 -7 M${x} ${y} q0 -6 1 -9 M${x + 3} ${y} q0 -4 2 -6`} stroke={c} strokeWidth="1.2" fill="none" strokeLinecap="round" />;
// พื้นหญ้ารอบทางเดิน: หญ้า ดอกไม้ป่า หมอก ป้ายหลุม กระดูก
const Deco = ({ v }) => <g>
  <g opacity=".9">{[[10, 12], [40, 6], [88, 14], [6, 70], [94, 84], [30, 140], [74, 146], [92, 46], [12, 100], [60, 6], [92, 120], [6, 40]].map(([x, y], i) => <Tuft key={i} x={x} y={y} c={i % 3 ? '#4f7a3a' : '#5f8a44'} />)}</g>
  <g>{[[24, 58, '#d8c8f0'], [80, 100, '#f0e0a0'], [64, 140, '#d8c8f0'], [36, 10, '#f0e0a0']].map(([x, y, c], i) => <g key={i}><circle cx={x} cy={y} r="1.6" fill={c} /><circle cx={x + 3} cy={y + 1.5} r="1.2" fill={c} opacity=".8" /></g>)}</g>
  <g fill="#e8ecf4" opacity=".07"><ellipse cx="30" cy="48" rx="26" ry="5" /><ellipse cx="74" cy="104" rx="28" ry="5" /></g>
  {CORNERS.map(([x, y], i) => { const k = (v + i) % 4;
    return <g key={i}>{k === 0 ? <MiniGrave x={x} y={y} s={1.05} tilt={i % 2 ? 6 : -5} /> : k === 1 ? <MiniCross x={x} y={y} tilt={i % 2 ? -8 : 7} />
      : k === 2 ? <g><Bone x={x} y={y + 2} a={i * 50 - 30} s=".8" /><Tuft x={x + 8} y={y + 8} /></g>
      : <g><Skull x={x - 2} y={y} s=".75" /><g fill="#c8584a"><ellipse cx={x + 9} cy={y + 6} rx="3.4" ry="2" /></g><path d={`M${x + 9} ${y + 6} v4`} stroke="#e8dcc0" strokeWidth="1.4" /></g>}</g>; })}
</g>;
export function Tile({ m, d, s, size = 40 }) {
  const arms = DIRS.filter(([bit]) => m & bit); const cx = TW / 2, cy = TH / 2, w = 30;
  const h = typeof size === 'number' ? size * TH / TW : size;
  // สี่เหลี่ยมของแต่ละแขน (ทางตันสั้นกว่า)
  const R = arms.map(([bit, dx, dy]) => { const len = dx ? (d ? 34 : cx) : (d ? 50 : cy);
    const x = dx === 0 ? cx - w / 2 : dx > 0 ? TW - len : 0; const y = dy === 0 ? cy - w / 2 : dy > 0 ? TH - len : 0;
    return { bit, dx, dy, len, x, y, W: dx === 0 ? w : len, H: dy === 0 ? w : len }; });
  const hub = !d && arms.length > 0;
  const shape = (pad, fill, rx = 0) => <g fill={fill}>{hub && <rect x={cx - w / 2 - pad} y={cy - w / 2 - pad} width={w + pad * 2} height={w + pad * 2} rx={6 + pad} />}
    {R.map(a => <rect key={a.bit} x={a.x - (a.dx ? 0 : pad)} y={a.y - (a.dy ? 0 : pad)} width={a.W + (a.dx ? 0 : pad * 2)} height={a.H + (a.dy ? 0 : pad * 2)} rx={rx} />)}</g>;
  // หินวางเป็นทางเดินตามแขน
  const steps = R.flatMap(a => { const L = a.dx ? a.W : a.H; const n = Math.max(1, Math.floor((L - (hub ? 14 : 4)) / 14));
    return Array.from({ length: n }, (_, i) => { const t = 7 + i * 14; const j = ((i + a.bit) % 2 ? 3 : -3);
      return a.dx === 0 ? { k: a.bit + '-' + i, x: cx + j, y: a.dy < 0 ? t : TH - t, rot: 0 } : { k: a.bit + '-' + i, x: a.dx < 0 ? t : TW - t, y: cy + j, rot: 90 }; }); });
  return <svg width={size} height={h} viewBox={`0 0 ${TW} ${TH}`} className="dig-tile" aria-hidden="true">
    <TileDefs />
    <rect width={TW} height={TH} fill="url(#dg-grass)" />{!s && <Deco v={(m * 5 + (d ? 2 : 0)) % 4} />}
    {/* ทางดิน: ขอบหญ้าเข้ม + ดิน + รอยเท้า */}
    {shape(3.5, '#1a2a16')}{shape(1.2, '#5a4128')}{shape(0, 'url(#dg-path)')}
    <g stroke="#3f6a30" strokeWidth="1.3" strokeLinecap="round" fill="none">{R.map(a => { const L = a.dx ? a.W : a.H; return Array.from({ length: Math.floor(L / 7) }, (_, i) => { const t = 3 + i * 7;
      return a.dx === 0 ? <path key={a.bit + '-' + i} d={`M${cx - w / 2} ${a.y + t} l2.5 -2 M${cx + w / 2} ${a.y + t + 3} l-2.5 -2`} />
        : <path key={a.bit + '-' + i} d={`M${a.x + t} ${cy - w / 2} l-2 2.5 M${a.x + t + 3} ${cy + w / 2} l-2 -2.5`} />; }); })}</g>
    <g fill="#6e5234" opacity=".8">{R.map(a => [.3, .7].map((t, i) => { const px = a.dx === 0 ? cx - 9 + i * 18 : a.x + a.W * t, py = a.dx === 0 ? a.y + a.H * t : cy - 9 + i * 18;
      return <circle key={a.bit + '-' + i} cx={px} cy={py} r="1.3" />; }))}</g>
    {steps.map(p => <g key={p.k} transform={`translate(${p.x} ${p.y}) rotate(${p.rot})`}><ellipse rx="7.5" ry="4.6" fill="#3a2c1c" opacity=".5" transform="translate(.8 1.2)" />
      <ellipse rx="7.5" ry="4.6" fill="url(#dg-stone)" stroke="#3a3530" strokeWidth=".9" /><path d="M-4.5 -1.6 Q0 -3.6 4 -1.8" stroke="#e0dad2" strokeWidth=".9" fill="none" opacity=".7" /></g>)}
    {hub && <g><circle cx={cx} cy={cy} r="11" fill="#3a2c1c" opacity=".45" transform="translate(1 1.5)" /><circle cx={cx} cy={cy} r="11" fill="url(#dg-stone)" stroke="#3a3530" strokeWidth="1" />
      <circle cx={cx} cy={cy} r="6.5" fill="none" stroke="#6a655e" strokeWidth=".9" strokeDasharray="2 2" /><path d={`M${cx - 6} ${cy - 5} Q${cx} ${cy - 9} ${cx + 5} ${cy - 6}`} stroke="#e0dad2" strokeWidth="1" fill="none" opacity=".7" /></g>}
    {/* ทางตัน: ต้นไม้ตายล้มขวาง + หิน */}
    {d ? <g><ellipse cx={cx} cy={cy + 10} rx="30" ry="7" fill="#0d160c" opacity=".55" />
      <g transform={`rotate(-18 ${cx} ${cy})`}>
        <rect x={cx - 30} y={cy - 7} width="60" height="14" rx="6" fill="#5a3c22" stroke="#24150b" strokeWidth="1.8" />
        <path d={`M${cx - 26} ${cy - 3} H${cx + 18} M${cx - 20} ${cy + 3} H${cx + 24}`} stroke="#3a2412" strokeWidth="1.2" />
        <path d={`M${cx - 24} ${cy - 5} H${cx + 10}`} stroke="#8a6440" strokeWidth="1.4" strokeLinecap="round" />
        <ellipse cx={cx + 30} cy={cy} rx="4" ry="7" fill="#c8a070" stroke="#24150b" strokeWidth="1.4" /><ellipse cx={cx + 30} cy={cy} rx="2" ry="3.6" fill="none" stroke="#8a6440" strokeWidth=".9" />
        <path d={`M${cx - 10} ${cy - 7} l-6 -12 l-4 2 M${cx - 13} ${cy - 13} l6 -5 M${cx + 8} ${cy + 7} l5 10 l4 -1`} stroke="#4a3018" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>
      <Stone x={cx - 18} y={cy + 12} r={6} a={-12} /><Stone x={cx + 16} y={cy - 14} r={5} a={20} />
      <g fill="#6f8a48">{[[cx - 4, cy - 10], [cx + 6, cy + 9]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" />)}</g></g> : null}
    {/* ประตูป่าช้า: เสาหิน 2 ต้น ประตูเหล็กโค้ง ตะเกียง */}
    {s ? <g><circle cx={cx} cy={cy - 4} r="44" fill="url(#dg-glow)" />
      <ellipse cx={cx} cy={cy + 28} rx="34" ry="6" fill="#0d160c" opacity=".5" />
      <path d={`M${cx - 20} ${cy + 26} V${cy - 14} Q${cx} ${cy - 40} ${cx + 20} ${cy - 14} V${cy + 26}`} fill="none" stroke="#1a1a20" strokeWidth="4.5" />
      <path d={`M${cx - 20} ${cy + 26} V${cy - 14} Q${cx} ${cy - 40} ${cx + 20} ${cy - 14} V${cy + 26}`} fill="none" stroke="#4a4a56" strokeWidth="2.2" />
      <g stroke="#2e2e36" strokeWidth="1.8">{[-13, -6.5, 0, 6.5, 13].map(x => <path key={x} d={`M${cx + x} ${cy + 26} V${cy - 22 + Math.abs(x) * .7}`} />)}</g>
      <g fill="#4a4a56">{[-13, -6.5, 0, 6.5, 13].map(x => <path key={x} d={`M${cx + x - 2} ${cy - 22 + Math.abs(x) * .7} l2 -4 l2 4Z`} />)}</g>
      <path d={`M${cx - 18} ${cy + 4} H${cx + 18}`} stroke="#3a3a44" strokeWidth="2" />
      <circle cx={cx} cy={cy - 24} r="4" fill="none" stroke="#5a5a66" strokeWidth="1.6" />
      {[-1, 1].map(sd => <g key={sd}><rect x={cx + sd * 27 - 6} y={cy - 24} width="12" height="52" rx="1.5" fill="url(#dg-grave)" stroke="#2e2a34" strokeWidth="1.6" />
        <rect x={cx + sd * 27 - 8} y={cy - 28} width="16" height="6" rx="1.5" fill="#8a8692" stroke="#2e2a34" strokeWidth="1.4" />
        <path d={`M${cx + sd * 27 - 6} ${cy - 10} H${cx + sd * 27 + 6} M${cx + sd * 27 - 6} ${cy + 6} H${cx + sd * 27 + 6}`} stroke="#5a5662" strokeWidth=".9" />
        <path d={`M${cx + sd * 27 - 6} ${cy + 18} q4 -4 7 0 q3 -3 5 1`} fill="#4f6a34" /></g>)}
      <g transform={`translate(${cx + 27} ${cy - 36})`}><path d="M0 4 V-2" stroke="#2e2e36" strokeWidth="1.4" /><rect x="-4" y="-1" width="8" height="10" rx="2" fill="#ffdc7a" stroke="#24150b" strokeWidth="1.2" /><rect x="-5" y="-3" width="10" height="3" rx="1" fill="#3a3a44" /><circle cy="4" r="2" fill="#fff6c8" /></g>
    </g> : null}
  </svg>;
}
const GoalBack = ({ i }) => <svg viewBox={`0 0 ${TW} ${TH}`} className="dig-tile" aria-hidden="true">
  <defs><linearGradient id="gb-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e1826" /><stop offset="1" stopColor="#3a2e3a" /></linearGradient>
    <linearGradient id="gb-stone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#a8a4ae" /><stop offset=".55" stopColor="#8e8a94" /><stop offset="1" stopColor="#6a6672" /></linearGradient>
    <radialGradient id="gb-candle" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffcf6a" stopOpacity=".6" /><stop offset="1" stopColor="#ffcf6a" stopOpacity="0" /></radialGradient></defs>
  <rect width={TW} height={TH} fill="url(#gb-sky)" />
  <g fill="#e8e4f0" opacity=".5">{[[12, 10], [86, 18], [70, 6], [24, 26]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r=".9" />)}</g>
  <circle cx="82" cy="12" r="6" fill="#f3ecd2" opacity=".85" /><circle cx="84" cy="10.5" r="6" fill="#1e1826" />
  {/* ป้ายหลุม */}
  <path d="M18 132 V54 Q18 18 50 18 Q82 18 82 54 V132 Z" fill="#3e3a44" />
  <path d="M21 132 V54 Q21 21 50 21 Q79 21 79 54 V132 Z" fill="url(#gb-stone)" stroke="#2e2a34" strokeWidth="2.5" />
  <path d="M27 130 V56 Q27 28 50 28" stroke="#c4c0ca" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".8" />
  <path d="M28 60 Q50 54 72 60" stroke="#5a5662" strokeWidth="1.4" fill="none" />
  <path d="M46 34 H54 V40 H60 V46 H54 V58 H46 V46 H40 V40 H46Z" fill="#6a6672" stroke="#4a4652" strokeWidth="1" />
  <path d="M66 70 l-5 9 l4 6 l-6 10" stroke="#3e3a44" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  <path d="M21 108 Q30 100 36 110 Q42 104 46 114 L21 120Z" fill="#4f6a34" opacity=".85" /><path d="M79 96 Q72 92 70 100 Q66 98 64 106 L79 110Z" fill="#4f6a34" opacity=".75" />
  <g fill="#6f8a48">{[[26, 106], [33, 108], [74, 99]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="1.6" />)}</g>
  <circle cx="50" cy="86" r="14" fill="#5a5662" opacity=".5" /><text x="50" y="96" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2e2a34" fontFamily="sans-serif">{i + 1}</text>
  <text x="50" y="95" textAnchor="middle" fontSize="28" fontWeight="900" fill="#d8d4de" opacity=".35" fontFamily="sans-serif">{i + 1}</text>
  {/* เนินดิน หญ้า เทียน */}
  <path d="M0 150 V134 Q20 126 50 128 Q80 126 100 134 V150Z" fill="#3b2a1c" /><path d="M0 138 Q24 131 50 133 Q78 131 100 138" stroke="#5a4028" strokeWidth="2" fill="none" />
  <g stroke="#5e7a3a" strokeWidth="1.6" strokeLinecap="round" fill="none"><path d="M8 136 q1 -7 3 -9 M11 136 q0 -5 -3 -8 M90 136 q-1 -7 -4 -9 M93 137 q1 -6 3 -8 M30 131 q1 -5 3 -6 M68 131 q0 -5 -2 -7" /></g>
  {[[12, 128], [88, 128]].map(([x, y], k) => <g key={k}><circle cx={x} cy={y - 4} r="12" fill="url(#gb-candle)" /><rect x={x - 2.5} y={y - 4} width="5" height="10" rx="1" fill="#efe4c6" stroke="#5a4a3a" strokeWidth=".8" />
    <path d={`M${x} ${y - 11} q3 3 0 6 q-3 -3 0 -6Z`} fill="#ffb347" /><circle cx={x} cy={y - 7} r="1" fill="#fff3c0" /></g>)}
</svg>;
const ActFace = ({ c, size = 64 }) => { const A = ACT[c]; return <span className={'dig-act' + (A.x ? ' ' + A.x : '')} style={{ width: size, height: size * TH / TW }}>
  <ArtSvg k={A.img} className="dig-act-img" />{A.x === 'brk' && <i className="dig-ov brk">✖</i>}{A.x === 'fix' && <i className="dig-ov fix">🔧</i>}</span>; };
export function CardView({ c, size = 64, rot }) {
  if (isPath(c)) { const p = pathOf(c); return <Tile m={rotM(p.m, +rot || 0)} d={p.d} size={size} />; }
  return <ActFace c={c} size={size} />;
}
const RoleFace = ({ role, size = 72 }) => <span className={'dig-role ' + role} style={{ width: size, height: size }}><ArtSvg k={ROLE[role].img} className="dig-act-img" /></span>;

// อนิเมชันสั้น ๆ: ต้นไม้ล้ม / เปิดหีบ / หิน / สลับหน้ากาก
// ป๊อปอัปเล็ก ๆ บอกทุกคนว่าตาที่แล้วใครลงการ์ดอะไร (ไม่บังจอ หายเองใน 3.5 วิ แตะเพื่อปิด)
function LastToast({ last, myId, av, nameOf }) {
  const [show, setShow] = useState(null); const seen = useRef(last?.at || 0);
  useEffect(() => { if (!last || last.at <= seen.current) return; seen.current = last.at; if (last.by === myId) return; setShow(last); const t = setTimeout(() => setShow(null), 3500); return () => clearTimeout(t); }, [last?.at]);
  if (!show || typeof document === 'undefined') return null;
  return createPortal(<div className="dig-toast" key={show.at} role="status" onClick={() => setShow(null)}>
    <Avatar id={show.by} av={av} size={36} />{show.c ? <CardView c={show.c} size={44} /> : <span className="dig-toast-back">🂠</span>}
    <span>{String(show.text).replace(/{([^}]+)}/g, (_, id) => nameOf(id))}</span>
  </div>, document.body);
}
function Fx({ fx }) {
  const [show, setShow] = useState(null); const last = useRef(fx?.at || 0);
  useEffect(() => { if (!fx || fx.at <= last.current) return; last.current = fx.at; setShow(fx); const t = setTimeout(() => setShow(null), fx.k === 'gold' ? 3200 : 1900); return () => clearTimeout(t); }, [fx?.at]);
  if (!show) return null;
  if (typeof document === 'undefined') return null;
  return createPortal(<div className={'dig-fx ' + show.k} onClick={() => setShow(null)} aria-hidden="true">
    {show.k === 'fall' && <>{Array.from({ length: 14 }, (_, i) => <i key={i} className="rock" style={{ '--x': (8 + (i * 37) % 84) + '%', '--dl': (i % 5) * 0.07 + 's', '--s': 0.6 + (i % 3) * 0.3 }} />)}<b>🌳 ต้นไม้ล้มขวางทาง!</b></>}
    {show.k === 'gold' && <><span className="chest"><ArtSvg k="dig_gold" className="dig-fx-img" /></span>{Array.from({ length: 18 }, (_, i) => <i key={i} className="coin" style={{ '--a': (i * 20) + 'deg', '--dl': (i % 6) * 0.06 + 's' }} />)}<b>💰 เจอสมบัติ!</b></>}
    {show.k === 'rock' && <><span className="chest"><ArtSvg k="dig_rock" className="dig-fx-img" /></span><b>💀 เจอแต่กระดูก…</b></>}
    {show.k === 'mask' && <b className="maskfx">🎭</b>}
    {show.k === 'brk' && <b className="maskfx">🔨💥</b>}
  </div>, document.body);
}

export function DigGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack, srvNow }) {
  const r = fix({ ...room.round }); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'dig') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const [sel, setSel] = useState(null); const [rot, setRot] = useState(0); const [peekRole, setPeekRole] = useState(false); const [turnPop, setTurnPop] = useState(null); const [peekSeen, setPeekSeen] = useState(0);
  const hand = handOf(r, myId); const cur = current(r); const myTurn = cur === myId && !res && r.phase === 'play';
  const myRole = r.roles[myId]; const broken = brokenOf(r, myId); const secs = Math.max(0, Math.ceil((r.until - srvNow) / 1000));
  const card = sel != null ? hand[sel] : null; const A = card && !isPath(card) ? ACT[card] : null;
  const nm = s => String(s).replace(/\{([^}]+)\}/g, (_, id) => nameOf(id));
  useEffect(() => { setSel(null); setRot(0); }, [r.tn, hand.length]);
  useEffect(() => { if (myTurn) { sfx(sound, 'yourTurn'); setTurnPop(r.tn || 0); } }, [myTurn, r.tn]);
  const due = !res && r.phase === 'play' && srvNow >= r.until + 800;
  useEffect(() => { if (due) tx(c => digTick(c, srvNow)); }, [due, r.tn]);
  useEffect(() => { const k = r.fx?.k; if (!r.fx || srvNow - r.fx.at > 4000) return; sfx(sound, k === 'gold' ? 'win' : k === 'fall' || k === 'brk' ? 'sabotage' : 'reveal'); }, [r.fx?.at]);
  const places = useMemo(() => (myTurn && card && isPath(card) && !broken.length ? placesFor(r, card) : []), [myTurn, card, JSON.stringify(r.board), broken.length]);
  const placeAt = (x, y) => places.find(p => p.x === x && p.y === y);
  const rotAt = pl => (pl.rots.includes(rot) ? rot : pl.rot);   // มุมที่เลือกวางตรงนี้ไม่ได้ → ใช้มุมที่วางได้แทน (เห็นในเงาบนกระดาน)
  const peek = r.peek?.[myId]; const seen = r.seen?.[myId] || {};
  useEffect(() => { if (!peek || srvNow - peek.at > 5000) return; const t = setTimeout(() => sfx(sound, peek.v === 'gold' ? 'approved' : 'reveal'), 900); return () => clearTimeout(t); }, [peek?.at]);
  const ids = r.order;
  const act = a => { sfx(sound, 'click'); tx(c => digPlay(c, myId, { idx: sel, card, ...a }, srvNow)); setSel(null); };

  // เป้าหมายของการ์ดพิเศษ
  const targets = !A ? [] : ids.filter(id => !r.gone?.[id] && (A.t === 'brk' ? id !== myId && canBreak(r, id, A.tool) : A.t === 'fix' ? fixable(r, id, A.tools).length : A.t === 'spy' ? id !== myId : A.t === 'mask' ? true : A.t === 'swap' ? id !== myId && handOf(r, id).length : false));
  const needTarget = A && ['brk', 'fix', 'spy', 'mask', 'swap'].includes(A.t);

  const board = <div className="dig-board-wrap"><div className="dig-board" style={{ '--bw': BW, '--bh': BH }}>
    {Array.from({ length: BH }, (_, y) => Array.from({ length: BW }, (_, x) => {
      const k = K(x, y); const t = r.board[k]; const g = goalAt(x, y); const pl = placeAt(x, y);
      const canFall = myTurn && A?.t === 'fall' && t && !t.s; const canMap = myTurn && A?.t === 'map' && g >= 0 && !r.goals[g].open;
      const click = pl ? () => act({ x, y, rot: rotAt(pl) }) : canFall ? () => act({ x, y }) : canMap ? () => act({ goal: g }) : null;
      return <button key={k} type="button" className={'dig-cell' + (t ? ' on' : '') + (g >= 0 ? ' goal' : '') + (pl ? ' can' : '') + (canFall ? ' fall' : '') + (canMap ? ' map' : '') + (t?.by && t.by === r.lastBy ? '' : '')} disabled={!click} onClick={click || undefined}>
        {t ? <Tile m={t.m} d={t.d} s={t.s} size="100%" /> : g >= 0 ? (r.goals[g].open || res
          ? <span className={'dig-goal ' + r.goals[g].t + (r.goals[g].open ? ' open' : ' ghost')}><ArtSvg k={r.goals[g].t === 'gold' ? 'dig_gold' : 'dig_rock'} className="dig-act-img" /></span>
          : <span className="dig-goal back"><GoalBack i={g} />{seen['g' + g] && <em className={'dig-seen ' + seen['g' + g]}>{seen['g' + g] === 'gold' ? '💰' : '💀'}</em>}</span>)
          : pl ? <span className="dig-ghost"><Tile m={rotM(pathOf(card).m, rotAt(pl))} d={pathOf(card).d} size="100%" /></span> : null}
      </button>;
    }))}
  </div></div>;

  const seat = id => { const b = brokenOf(r, id); return <div key={id} className={'dig-seat' + (id === cur && !res ? ' now' : '') + (r.gone?.[id] ? ' gone' : '') + (id === myId ? ' me' : '')}>
    <Avatar id={id} av={av} size={34} /><b>{id === myId ? 'คุณ' : nameOf(id)}</b>
    <span className="dig-seat-sub">🃏{handOf(r, id).length}{b.map(t => <i key={t} className="dig-brk" title={TOOLS[t].n + 'พัง'}>{TOOLS[t].e}</i>)}{seen['r_' + id] && <i title="คุณเคยส่องบทบาท">{ROLE[seen['r_' + id]].e}</i>}{res && <i>{ROLE[r.roles[id]].e}</i>}</span>
  </div>; };

  if (res) {
    const W = res.winner; const myWin = r.roles[myId] === W;
    return <div className="dig-game">
      <Fx fx={r.fx} /><LastToast last={r.last} myId={myId} av={av} nameOf={nameOf} />
      <section className={'dig-result ' + W}>
        <div className="dig-result-art"><ArtSvg k={W === 'dig' ? 'dig_gold' : 'dig_role_s'} className="dig-act-img" /></div>
        <h2>{W === 'dig' ? '👷 นักขุดชนะ! เจอหีบสมบัติ' : '😈 ตัวป่วนชนะ! ขุดไม่ถึงสมบัติ'}</h2>
        <p>{W === 'dig' ? (r.finisher ? `${nameOf(r.finisher)} ขุดทะลุถึงสมบัติ (+${DIG_SCORE.finisher} โบนัส)` : '') : r.rockBy ? `${nameOf(r.rockBy)} ขุดไปเจอแต่กระดูก 💀 — นักขุดแพ้ทันที` : 'การ์ดหมดก่อนถึงหีบสมบัติ'} {myRole && (myWin ? '• คุณอยู่ฝ่ายชนะ 🎉' : '• คุณอยู่ฝ่ายแพ้')}</p>
      </section>
      {board}
      <SecH icon="🎭">บทบาทตอนจบ</SecH>
      <div className="dig-roles">{ids.map(id => <div key={id} className={'dig-rc ' + r.roles[id]}><Avatar id={id} av={av} size={36} /><b>{nameOf(id)}</b><span>{ROLE[r.roles[id]].e} {ROLE[r.roles[id]].n}</span>{r.masked?.[id] ? <small>🎭 เดิมเป็น{ROLE[r.roles0?.[id] || r.roles[id]].n}</small> : null}<em>+{res.points?.[id] || 0} 💰</em></div>)}</div>
      <SecH icon="💰">ทองสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </div>;
  }

  return <div className="dig-game">
    <Fx fx={r.fx} /><LastToast last={r.last} myId={myId} av={av} nameOf={nameOf} />
    <div className="gcols dig-cols"><div className="gmain">{board}</div><div className="gside">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">🃏 กองเหลือ {r.deck.length}</span></div>
    {myRole && <div className={'uc-card dig-me' + (peekRole ? ' open' : '')} onClick={() => setPeekRole(p => !p)}>
      {peekRole ? <><RoleFace role={myRole} size={64} /><div><small>บทบาทของคุณ{r.masked?.[myId] ? ' (โดนสลับหน้ากากแล้ว!)' : ''}</small><b>{ROLE[myRole].e} {ROLE[myRole].n}</b><small>{myRole === 'dig' ? 'ต่อทางเดินฝ่าป่าช้าให้ถึงหีบสมบัติ ระวังตัวป่วน' : 'แอบขวางทางอย่างเนียน ๆ อย่าให้ใครถึงสมบัติ'}</small></div></>
        : <><span className="uc-ico">🙈</span><div><b>แตะเพื่อดูบทบาทของคุณ</b><small>ดูคนเดียว ระวังคนแอบมอง</small></div></>}
    </div>}
    <div className="dig-seats">{ids.map(seat)}</div>
    <section className={'dig-turn' + (myTurn ? ' me' : '')}>
      <Avatar id={cur} av={av} size={40} />
      <div><small>⛏️ ตาของ</small><b>{cur === myId ? 'คุณ!' : nameOf(cur)}</b><small>{myTurn ? (sel == null ? 'เลือกการ์ด 1 ใบด้านล่าง' : isPath(card) ? (broken.length ? 'เครื่องมือพัง วางทางไม่ได้ — ทิ้งการ์ดแทน' : places.length ? 'แตะช่องที่เรืองแสงเพื่อวาง' : 'วางตรงไหนไม่ได้เลย — ทิ้งการ์ดแทน') : A.t === 'fall' ? 'แตะทางเดินที่จะถล่ม' : A.t === 'map' ? 'แตะป้ายหลุมปลายทางที่จะส่อง' : 'เลือกผู้เล่น') : 'รอเพื่อนเล่น…'}</small></div>
      <TimerRing secs={secs} total={(r.turnMs || 60000) / 1000} size={54} label="วิ" />
    </section>
    <div className="dig-hand-h"><b>🃏 การ์ดในมือ</b><small className="dig-draw-note">{r.deck.length ? `เล่น/ทิ้งแล้วจั่วอัตโนมัติ 1 ใบ • กองเหลือ ${r.deck.length}` : 'กองหมดแล้ว — ไม่ได้จั่วเพิ่ม'}</small>{broken.length > 0 && <span className="dig-warn">เครื่องมือพัง: {broken.map(t => TOOLS[t].e + ' ' + TOOLS[t].n).join(', ')} — วางทางไม่ได้</span>}</div>
    <div className="dig-hand">{hand.map((c, i) => <button key={i + c} type="button" className={'dig-card' + (sel === i ? ' sel' : '') + (isPath(c) && broken.length ? ' dim' : '')} onClick={() => { sfx(sound, 'click'); setSel(s => (s === i ? null : i)); setRot(0); }}>
      <CardView c={c} size={58} rot={sel === i && rot} /><small>{cardName(c)}</small></button>)}{!hand.length && <span className="hint">ไม่มีการ์ดในมือแล้ว</span>}</div>
    {myTurn && card && <div className="dig-actions">
      {A && <div className="dig-desc">{A.e} <b>{A.n}</b> — {A.d}</div>}
      {isPath(card) && rotsOf(pathOf(card).m).length > 1 && <button className="secondary" onClick={() => { sfx(sound, 'click'); setRot(x => { const ks = rotsOf(pathOf(card).m); return ks[(ks.indexOf(x) + 1) % ks.length]; }); }}>🔄 กลับหัว 180° <small>({rot * 90}°)</small></button>}
      {needTarget && <button className="primary" disabled={!targets.length} onClick={() => setTurnPop('t' + sel)}>{targets.length ? '👉 เลือกผู้เล่น' : 'ไม่มีใครเลือกได้'}</button>}
      <button className="secondary" onClick={() => { sfx(sound, 'click'); tx(c => digDiscard(c, myId, sel, card, srvNow)); setSel(null); }}>🗑️ ทิ้งใบนี้ (ผ่าน)</button>
    </div>}
    {/* ป๊อปอัป: ถึงตาคุณ */}
    <ActionSheet open={myTurn && turnPop === (r.tn || 0)} k={'turn' + r.tn} icon="⛏️" title="ถึงตาคุณแล้ว!" sub="วางทาง / เล่นการ์ดพิเศษ / ทิ้ง 1 ใบ แล้วจั่วอัตโนมัติ" secs={secs} total={(r.turnMs || 60000) / 1000}>
      <p className="hint">หมดเวลาจะทิ้งการ์ดสุ่มให้ 1 ใบ{broken.length ? ' • ⚠️ เครื่องมือของคุณพังอยู่ วางทางไม่ได้' : ''}</p>
      <button className="primary wide" onClick={() => setTurnPop(null)}>👍 ไปเลือกการ์ด</button>
    </ActionSheet>
    {/* ป๊อปอัป: เลือกเป้าหมาย */}
    <ActionSheet open={myTurn && needTarget && turnPop === 't' + sel} k={'tg' + sel + r.tn} icon={A?.e} title={A?.n || ''} sub={A?.d} secs={secs} total={(r.turnMs || 60000) / 1000}>
      <PlayerGrid ids={targets} av={av} nameOf={nameOf} myId={myId} note={id => brokenOf(r, id).map(t => TOOLS[t].e).join(' ') || '🃏 ' + handOf(r, id).length}
        onPick={id => { if (A.t === 'fix' && fixable(r, id, A.tools).length > 1) { setTurnPop({ fix: id }); return; } sfx(sound, 'vote'); act({ target: id }); setTurnPop(null); }} />
    </ActionSheet>
    <ActionSheet open={myTurn && A?.t === 'fix' && !!turnPop?.fix} k="fixpick" icon="🔧" title="ซ่อมอะไรดี?" sub={turnPop?.fix ? 'ให้ ' + nameOf(turnPop.fix) : ''}>
      <div className="dig-actions">{turnPop?.fix && fixable(r, turnPop.fix, A?.tools || '').map(t => <button key={t} className="primary" onClick={() => { act({ target: turnPop.fix, tool: t }); setTurnPop(null); }}>{TOOLS[t].e} {TOOLS[t].n}</button>)}</div>
    </ActionSheet>
    {/* ป๊อปอัป: ผลการแอบดู (เห็นคนเดียว) */}
    <ActionSheet open={!!peek && peek.at > peekSeen && srvNow - peek.at < 60000} k={'pk' + peek?.at} icon={peek?.k === 'map' ? '🗺️' : '🔍'} title={peek?.k === 'map' ? `ปลายทางที่ ${(peek?.g ?? 0) + 1} คือ…` : `บทบาทของ ${peek ? nameOf(peek.id) : ''}`} sub="เห็นคนเดียว จะบอกเพื่อนจริงหรือหลอกก็ได้">
      {peek && <div key={peek.at} className={'dig-peek anim ' + peek.k + ' ' + peek.v}>
        {/* แผนที่คลี่ออก → ป้ายพลิกจากหลังเป็นหน้า → ข้อความเด้ง */}
        {peek.k === 'map' && <span className="dig-scroll" aria-hidden="true"><i /><i /></span>}
        <span className="dig-flip"><span className="dig-flip-in">
          <span className="dig-flip-f back">{peek.k === 'map' ? <GoalBack i={peek.g} /> : <span className="dig-flip-q">?</span>}</span>
          <span className="dig-flip-f front">{peek.k === 'map' ? <span className={'dig-goal open ' + peek.v}><ArtSvg k={peek.v === 'gold' ? 'dig_gold' : 'dig_rock'} className="dig-act-img" /></span> : <RoleFace role={peek.v} size={110} />}</span>
        </span>{peek.v === 'gold' && Array.from({ length: 10 }, (_, i) => <i key={i} className="dig-spark" style={{ '--a': i * 36 + 'deg' }} />)}</span>
        <b className="dig-peek-t">{peek.k === 'map' ? (peek.v === 'gold' ? '💰 หีบสมบัติ!' : '💀 มีแต่กระดูก') : `${ROLE[peek.v].e} ${ROLE[peek.v].n}`}</b></div>}
      <button className="primary wide" onClick={() => setPeekSeen(peek.at)}>รับทราบ 🤫</button>
    </ActionSheet>
    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 6).map((e, i) => <li key={i}>{nm(e.text)}</li>)}</ul>
    {isHost && <HostBar>
      <button className="secondary" onClick={() => { if (confirm(`ข้ามตาของ ${nameOf(cur)}? (ทิ้งการ์ดสุ่มให้ 1 ใบ)`)) tx(c => digSkip(c, srvNow)); }}>⏩ ข้ามตา {nameOf(cur)}</button>
      {ids.filter(id => !room.players?.[id] && !r.gone?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickDig(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
    </HostBar>}
    </div></div>
  </div>;
}

// ---------- ห้องรอ ----------
export function DigLobby({ db, roomCode, room, players, isHost }) {
  const set = room.settings?.dig || {}; const n = players.length;
  const save = patch => runTransaction(ref(db, `rooms/${roomCode}/settings/dig`), c => ({ ...(c || {}), ...patch })).catch(() => {});
  return <div className="uc-lobby">
    <div className="dig-lobby-roles"><span><RoleFace role="dig" size={56} /><b>👷 นักขุด × {Math.max(0, n - sabCount(n))}</b></span><span><RoleFace role="sab" size={56} /><b>😈 ตัวป่วน × {sabCount(n)}</b></span><small>การ์ดในมือคนละ {handSize(n)} ใบ</small></div>
    <label>⏱️ เวลาต่อตา {isHost ? '' : '(หัวหน้าห้องตั้ง)'}</label>
    <select value={set.sec ?? 60} disabled={!isHost} onChange={e => save({ sec: +e.target.value })}><option value={30}>30 วินาที</option><option value={45}>45 วินาที</option><option value={60}>60 วินาที</option><option value={90}>90 วินาที</option></select>
  </div>;
}
