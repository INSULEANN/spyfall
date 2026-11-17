// เกม "ขุดสมบัติป่าช้า" ⛏️🪦 — เกมขุดอุโมงค์ บทบาทลับ (ต้นฉบับของเว็บนี้)
//   👷 นักขุด   ต่ออุโมงค์จากปากหลุมไปให้ถึงหีบสมบัติ (1 ใน 3 ป้ายหลุมปลายทาง)
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
  fall: { n: 'ดินถล่ม', e: '💣', t: 'fall', img: 'dig_fall', d: 'ถล่มทางเดิน 1 ช่องบนกระดาน (ยกเว้นปากหลุมกับปลายทาง)' },
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
function check(r) { // ปลายทางที่อุโมงค์ชน → พลิก • คืน 'gold' (นักขุดชนะ) / 'rock' (ขุดเจอหิน = นักขุดแพ้ทันที) / null
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
    else if (A.t === 'fall') { const k = K(a.x, a.y); const c = r.board[k]; if (!c || c.s) return; take(r, me, idx, card); const b = { ...r.board }; delete b[k]; r.board = b; mark(r, me, card, `💣 {${me}} ถล่มดินทับทางเดิน 1 ช่อง`); r.fx = { k: 'fall', x: a.x, y: a.y, at: now }; }
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
const Deco = ({ v }) => <g>
  <g stroke="#2e2118" strokeWidth="2" fill="none" opacity=".8"><path d="M0 44 Q25 40 50 45 T100 42" /><path d="M0 112 Q30 116 55 110 T100 114" /></g>
  <g fill="#4a382a"><circle cx="8" cy="64" r="2.5" /><circle cx="92" cy="98" r="3" /><circle cx="30" cy="6" r="2" /><circle cx="70" cy="146" r="2.5" /><ellipse cx="92" cy="60" rx="3.5" ry="2.5" /></g>
  {CORNERS.map(([x, y], i) => { const k = (v + i) % 4;
    return <g key={i}>{k === 0 ? <Bone x={x} y={y} a={i * 50 - 30} s=".85" /> : k === 1 ? <Skull x={x} y={y} s=".8" />
      : k === 2 ? <Root d={`M${x - 14} ${y - 18} q6 10 2 18 t8 16 M${x - 6} ${y} q8 2 12 -6`} />
      : <g fill="#5e4a38" stroke="#2a1d15" strokeWidth="1"><ellipse cx={x - 4} cy={y + 2} rx="6" ry="4.5" /><ellipse cx={x + 6} cy={y - 4} rx="4" ry="3" /></g>}</g>; })}
</g>;
export function Tile({ m, d, s, size = 40 }) {
  const arms = DIRS.filter(([bit]) => m & bit); const cx = TW / 2, cy = TH / 2, w = 34;
  const h = typeof size === 'number' ? size * TH / TW : size;
  return <svg width={size} height={h} viewBox={`0 0 ${TW} ${TH}`} className="dig-tile" aria-hidden="true">
    <rect width={TW} height={TH} fill={EARTH} />{!s && <Deco v={(m * 5 + (d ? 2 : 0)) % 4} />}
    {[0, 1, 2].map(layer => <g key={layer}>{!d && arms.length > 0 && layer < 2 && <rect x={cx - w / 2 + (layer ? 1.5 : 0)} y={cy - w / 2 + (layer ? 1.5 : 0)} width={w - (layer ? 3 : 0)} height={w - (layer ? 3 : 0)} fill={DIRT} {...(layer ? {} : { stroke: DIRT2, strokeWidth: 3 })} />}{arms.map(([bit, dx, dy]) => { const len = dx ? (d ? 34 : cx) : (d ? 50 : cy);
      const x = dx === 0 ? cx - w / 2 : dx > 0 ? TW - len : 0; const y = dy === 0 ? cy - w / 2 : dy > 0 ? TH - len : 0;
      const W = dx === 0 ? w : len, H = dy === 0 ? w : len;
      if (layer === 0) return <rect key={bit} x={x} y={y} width={W} height={H} fill={DIRT} stroke={DIRT2} strokeWidth="3" />;
      // ชั้นที่ 2 ทับเส้นขอบตรงรอยต่อกลางการ์ด ไม่ให้เห็นตะเข็บ
      if (layer === 1) return <rect key={bit} x={x + (dx > 0 ? -2 : 1.5)} y={y + (dy > 0 ? -2 : 1.5)} width={W - (dx ? 1.5 - 2 : 3)} height={H - (dy ? 1.5 - 2 : 3)} fill={DIRT} />;
      // รอยล้อรถเข็น: จากขอบการ์ดถึงกลางทาง
      const a = d ? len - 4 : len - w / 2 - 2;
      return <path key={bit} d={dx === 0 ? (dy < 0 ? `M${cx - 7} 4 V${a} M${cx + 7} 4 V${a}` : `M${cx - 7} ${TH - 4} V${TH - a} M${cx + 7} ${TH - 4} V${TH - a}`)
        : (dx < 0 ? `M4 ${cy - 7} H${a} M4 ${cy + 7} H${a}` : `M${TW - 4} ${cy - 7} H${TW - a} M${TW - 4} ${cy + 7} H${TW - a}`)} stroke="#a77c48" strokeWidth="1.6" strokeDasharray="5 4" opacity=".7" />; })}</g>)}
    {!d && arms.length > 0 && <g fill="#a77c48" opacity=".75"><circle cx={cx - 6} cy={cy - 5} r="1.8" /><circle cx={cx + 7} cy={cy + 4} r="1.4" /><circle cx={cx + 2} cy={cy - 9} r="1.2" /></g>}
    {/* ทางตัน: ก้อนหินขวางทาง */}
    {d ? <g><ellipse cx={cx} cy={cy + 12} rx="20" ry="5" fill="#1a110b" opacity=".5" /><path d={`M${cx - 18} ${cy + 10} Q${cx - 20} ${cy - 8} ${cx - 6} ${cy - 15} Q${cx + 10} ${cy - 18} ${cx + 17} ${cy - 4} Q${cx + 21} ${cy + 8} ${cx + 12} ${cy + 13} Z`} fill="#6d6a66" stroke="#2a2522" strokeWidth="3" />
      <path d={`M${cx - 11} ${cy - 6} q6 -6 14 -5`} stroke="#9a9590" strokeWidth="3" fill="none" strokeLinecap="round" /><path d={`M${cx + 2} ${cy + 1} l5 6 l-3 5`} stroke="#3e3a36" strokeWidth="1.8" fill="none" /></g> : null}
    {s ? <g><ellipse cx={cx} cy={cy + 2} rx="26" ry="30" fill="#1a110b" stroke="#6b4a2a" strokeWidth="4" /><g stroke="#a0763f" strokeWidth="4"><path d="M40 52 V98 M60 52 V98" /><path d="M40 62 H60 M40 75 H60 M40 88 H60" strokeWidth="3" /></g></g> : null}
  </svg>;
}
const GoalBack = ({ i }) => <svg viewBox={`0 0 ${TW} ${TH}`} className="dig-tile" aria-hidden="true"><rect width={TW} height={TH} fill="#2b2230" /><path d="M20 136 V50 Q20 16 50 16 Q80 16 80 50 V136 Z" fill="#8e8a94" stroke="#4a4552" strokeWidth="4" /><path d="M27 136 V52 Q27 25 50 25" stroke="#b3afba" strokeWidth="3" fill="none" /><text x="50" y="90" textAnchor="middle" fontSize="34" fontWeight="900" fill="#3a3540" fontFamily="sans-serif">{i + 1}</text><rect x="10" y="132" width="80" height="10" fill="#3a5a2a" /></svg>;
const ActFace = ({ c, size = 64 }) => { const A = ACT[c]; return <span className={'dig-act' + (A.x ? ' ' + A.x : '')} style={{ width: size, height: size * TH / TW }}>
  <ArtSvg k={A.img} className="dig-act-img" />{A.x === 'brk' && <i className="dig-ov brk">✖</i>}{A.x === 'fix' && <i className="dig-ov fix">🔧</i>}</span>; };
export function CardView({ c, size = 64, rot }) {
  if (isPath(c)) { const p = pathOf(c); return <Tile m={rotM(p.m, +rot || 0)} d={p.d} size={size} />; }
  return <ActFace c={c} size={size} />;
}
const RoleFace = ({ role, size = 72 }) => <span className={'dig-role ' + role} style={{ width: size, height: size }}><ArtSvg k={ROLE[role].img} className="dig-act-img" /></span>;

// อนิเมชันสั้น ๆ: ดินถล่ม / เปิดหีบ / หิน / สลับหน้ากาก
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
    {show.k === 'fall' && <>{Array.from({ length: 14 }, (_, i) => <i key={i} className="rock" style={{ '--x': (8 + (i * 37) % 84) + '%', '--dl': (i % 5) * 0.07 + 's', '--s': 0.6 + (i % 3) * 0.3 }} />)}<b>💣 ดินถล่ม!</b></>}
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
      {peekRole ? <><RoleFace role={myRole} size={64} /><div><small>บทบาทของคุณ{r.masked?.[myId] ? ' (โดนสลับหน้ากากแล้ว!)' : ''}</small><b>{ROLE[myRole].e} {ROLE[myRole].n}</b><small>{myRole === 'dig' ? 'ขุดอุโมงค์ให้ถึงหีบสมบัติ ระวังตัวป่วน' : 'แอบขวางทางอย่างเนียน ๆ อย่าให้ใครถึงสมบัติ'}</small></div></>
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
