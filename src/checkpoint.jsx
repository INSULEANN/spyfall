// เกม "จ่าตรวจวัยรุ่นทรงเอ" — ด่านตรวจกลางดึก: วัยรุ่นยัดของใส่กระเป๋า บอกจ่าว่าเป็นของอะไร (โกหกได้) แล้วต่อรอง/ยัดเงินใต้โต๊ะ
// จ่าเลือกเปิดตรวจ หรือปล่อยผ่าน • ทุกคนผลัดกันเป็นจ่า • จบเกมนับ ราคาของ + โบนัสที่ 1/2 ของแต่ละชนิด + เงิน
// (กลไกแนวเกมบลัฟลักลอบขนของที่มีอยู่ทั่วไป แต่ชื่อ ของ ภาพ ธีมเป็นของเราเองทั้งหมด • ของเถื่อนเป็นของซ่าขำ ๆ เท่านั้น)
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle } from './rand.js';
import { Avatar, HostBar, SecH, Outcome, Leaderboard, TimerRing } from './ui.jsx';
import './checkpoint.css';

export const CP_MIN = 3, CP_MAX = 6;
export const CP_SCORE = { win: 3, second: 1 };
export const HAND = 6, BAG_MAX = 5, MONEY0 = 40, MARKET_MAX = 8, MARKET0 = 4, SWAP_MAX = 5;
export const LOAD_MS = 90000, INSPECT_MS = 180000, SUM_MS = 12000;
// v = ราคาตอนจบเกม • p = ค่าปรับต่อชิ้น • king/queen = โบนัสคนที่มีมากที่สุด / รองลงมา (เฉพาะของถูกกฎหมาย)
export const GOODS = {
  pork: { n: 'หมูปิ้ง', e: '🍢', v: 2, p: 2, legal: true, king: 12, queen: 6, c: '#e0862a', count: 36 },
  ball: { n: 'ลูกชิ้นทอด', e: '🍡', v: 3, p: 2, legal: true, king: 10, queen: 5, c: '#e0457a', count: 28 },
  tea: { n: 'ชานมไข่มุก', e: '🥤', v: 3, p: 2, legal: true, king: 10, queen: 5, c: '#a8742a', count: 28 },
  shirt: { n: 'เสื้อบอล', e: '👕', v: 4, p: 2, legal: true, king: 8, queen: 4, c: '#3a7bd5', count: 20 },
  lamp: { n: 'ไฟแต่งรถ', e: '💡', v: 6, p: 4, legal: false, c: '#9b6cff', count: 14 },
  spk: { n: 'ลำโพงเสียงแตก', e: '🔊', v: 7, p: 4, legal: false, c: '#17a2b8', count: 11 },
  pipe: { n: 'ท่อซิ่ง', e: '💨', v: 8, p: 4, legal: false, c: '#6c7a96', count: 8 },
  fire: { n: 'ประทัด', e: '🧨', v: 9, p: 5, legal: false, c: '#ff4d3d', count: 5 },
};
export const GK = Object.keys(GOODS);
export const LEGAL = GK.filter(k => GOODS[k].legal);
export const BADS = GK.filter(k => !GOODS[k].legal);
export const DECK_SIZE = GK.reduce((a, k) => a + GOODS[k].count, 0);
export const typeOf = id => String(id).split('-')[0];
export const gOf = id => GOODS[typeOf(id)] || GOODS.pork;
export const lapsFor = n => (n <= 4 ? 2 : 1);
export const RIDER_LINES = ['ของจริงครับจ่า 🙏', 'หมูปิ้งล้วน ๆ เลย 🍢', 'เปิดเลย ไม่กลัว 😎', 'รีบครับ แม่รอ 🏃', 'มีอะไรคุยกันได้ 💸'];
export const OFFICER_LINES = ['น้อง ๆ จอดก่อน 🚧', 'ในกระเป๋ามีอะไร? 🔦', 'ทรงนี้…ไม่น่ารอด 🤨', 'มีอะไรมาคุยกันได้ 💸', 'ไปได้ ๆ 👋'];

// ---------- จัดเกม ----------
export function makeCpRound(ids, opts = {}, number = 1, t0 = Date.now()) {
  const order = shuffle(ids); const laps = Math.max(1, Math.min(3, Math.floor(+opts.laps || lapsFor(ids.length))));
  const sched = []; for (let l = 0; l < laps; l++) sched.push(...order);
  const deck = []; let k = 0; GK.forEach(t => { for (let i = 0; i < GOODS[t].count; i++) deck.push(`${t}-${k++}`); });
  const d = shuffle(deck); const hands = {}, money = {};
  order.forEach(id => { hands[id] = d.splice(0, HAND); money[id] = MONEY0; });
  const market = d.splice(0, MARKET0);
  return { number, kind: 'checkpoint', order, sched, ri: 0, officer: sched[0], laps, phase: 'load', at: t0 + 3000, deck: d, trash: [], market, hands, stall: {}, money, bags: null, offer: null, ask: null, done: null, swapped: null, out: null, bub: null, fx: null, fxk: 0, log: [], startedAt: t0 };
}

// Firebase ทิ้ง array/object ว่าง และ null → เติมกลับให้ครบก่อนใช้
export function normRound(R) {
  if (!R) return R;
  R.order = R.order || []; R.sched = R.sched || []; R.deck = R.deck || []; R.trash = R.trash || []; R.market = R.market || []; R.log = R.log || [];
  R.hands = R.hands || {}; R.stall = R.stall || {}; R.money = R.money || {};
  R.order.forEach(id => { R.hands[id] = R.hands[id] || []; R.stall[id] = R.stall[id] || []; R.money[id] = R.money[id] || 0; });
  R.bags = R.bags || {}; Object.values(R.bags).forEach(b => { b.c = b.c || []; });
  R.offer = R.offer || {}; Object.values(R.offer).forEach(o => { o.m = o.m || 0; o.g = o.g || []; o.v = o.v || 0; });
  R.ask = R.ask || {}; R.done = R.done || {}; Object.values(R.done).forEach(x => { x.lost = x.lost || []; x.g = x.g || []; x.c = x.c || []; });
  R.swapped = R.swapped || {}; R.out = R.out || {}; R.bub = R.bub || {}; R.fxk = R.fxk || 0;
  return R;
}
// ตัวห่อ transaction: เช็กว่าเป็นเกมนี้ เติมค่าที่ Firebase ทิ้ง เรียกตรรกะ แล้วล้าง undefined ก่อนเขียน
export function cpApply(c, f) {
  if (!c || c.status !== 'playing' || c.round?.kind !== 'checkpoint') return;
  normRound(c.round); const out = f(c);
  return out ? JSON.parse(JSON.stringify(out)) : undefined;
}

// ---------- ตรรกะ (ทำงานบนข้อมูลห้องทั้งก้อนใน transaction) ----------
const uniq = a => [...new Set((a || []).map(String))];
const hand = (r, id) => r.hands?.[id] || [];
const stallOf = (r, id) => r.stall?.[id] || [];
export const inGame = (r, id) => r.order.includes(id) && !r.out?.[id];
export const ridersOf = r => r.order.filter(id => inGame(r, id) && id !== r.officer);
const without = (o, k) => { const x = { ...(o || {}) }; delete x[k]; return Object.keys(x).length ? x : null; };
function say(r, text, extra) { r.log = [...(r.log || []), { text, t: Date.now(), ...(extra || {}) }].slice(-40); }
function drawOne(r) {
  if (!r.deck.length) {
    if (r.trash.length) { r.deck = shuffle(r.trash); r.trash = []; }
    else if (r.market.length > 1) { const m = [...r.market]; r.deck = shuffle(m.splice(0, m.length - 1)); r.market = m; }
    else return null;
  }
  const d = [...r.deck]; const c = d.shift(); r.deck = d; return c;
}
function refill(r, id) { const h = [...hand(r, id)]; while (h.length < HAND) { const c = drawOne(r); if (c == null) break; h.push(c); } r.hands[id] = h; }
// ผลของกระเป๋า: ของที่ไม่ตรงคำประกาศ = โกหก
export const bagTruth = (cards, d) => { const good = cards.filter(c => typeOf(c) === d), bad = cards.filter(c => typeOf(c) !== d); return { good, bad, lie: bad.length > 0, fine: bad.reduce((a, c) => a + gOf(c).p, 0), honestPay: good.length * (GOODS[d]?.p || 0) }; };

// แลกการ์ด: ทิ้งได้ไม่เกิน 5 ใบ เก็บจากแผงลอยได้ไม่เกินจำนวนที่ทิ้ง ที่เหลือจั่วจากกองจนครบ 6 (ทำได้ครั้งเดียวต่อด่าน)
export function swapCards(cur, me, drop, take, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'load' || !inGame(r, me) || me === r.officer || r.swapped?.[me] || r.bags?.[me]) return;
  drop = uniq(drop); take = uniq(take); const h = hand(r, me);
  if (!drop.length || drop.length > SWAP_MAX || take.length > drop.length) return;
  if (!drop.every(c => h.includes(c)) || !take.every(c => r.market.includes(c))) return;
  r.hands[me] = [...h.filter(c => !drop.includes(c)), ...take];
  let m = [...r.market.filter(c => !take.includes(c)), ...drop];
  if (m.length > MARKET_MAX) { r.trash = [...r.trash, ...m.slice(0, m.length - MARKET_MAX)]; m = m.slice(-MARKET_MAX); }
  r.market = m; refill(r, me);
  r.swapped = { ...(r.swapped || {}), [me]: true };
  say(r, `♻️ {${me}} ทิ้ง ${drop.length} ใบ${take.length ? ` • เก็บจากแผง ${take.map(c => gOf(c).e).join('')}` : ''}`, { by: me });
  return cur;
}
// ยัดกระเป๋า 1–5 ใบ + ประกาศชนิด (ต้องเป็นของถูกกฎหมาย จำนวนต้องตรง แต่ชนิดโกหกได้)
export function packBag(cur, me, cards, decl, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'load' || !inGame(r, me) || me === r.officer || r.bags?.[me]) return;
  cards = uniq(cards); const h = hand(r, me);
  if (cards.length < 1 || cards.length > BAG_MAX || !cards.every(c => h.includes(c)) || !LEGAL.includes(decl)) return;
  r.hands[me] = h.filter(c => !cards.includes(c));
  r.bags = { ...(r.bags || {}), [me]: { c: cards, d: decl, at: now } };
  r.swapped = { ...(r.swapped || {}), [me]: true };
  say(r, `🎒 {${me}}: "${GOODS[decl].e} ${GOODS[decl].n} ${cards.length} ชิ้นครับจ่า"`, { by: me });
  return maybeInspect(cur, now);
}
// แก้กระเป๋า (ก่อนทุกคนจัดเสร็จ)
export function unpackBag(cur, me, now) {
  const r = cur.round; const b = r.bags?.[me]; if (cur.status !== 'playing' || r.phase !== 'load' || !b) return;
  r.hands[me] = [...hand(r, me), ...(b.c || [])]; r.bags = without(r.bags, me); return cur;
}
const allPacked = r => ridersOf(r).every(id => r.bags?.[id] || !hand(r, id).length);
function maybeInspect(cur, now) { const r = cur.round; if (r.phase === 'load' && allPacked(r)) return toInspect(cur, now); return cur; }
function toInspect(cur, now) {
  const r = cur.round; r.phase = 'inspect'; r.at = now;
  if (!Object.keys(r.bags || {}).length) return toSum(cur, now);
  say(r, `🚧 กระเป๋าครบแล้ว! จ่า {${r.officer}} เริ่มตั้งด่านตรวจ`); return cur;
}
const undecided = r => Object.keys(r.bags || {}).filter(id => !r.done?.[id]);
// วัยรุ่นตั้งสินบน: เงิน m บาท + ของจากแผงตัวเอง g (จ่ายจริงตอนจ่ากดปล่อยผ่าน)
export function setOffer(cur, me, m, g, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'inspect' || !inGame(r, me) || me === r.officer || !r.bags?.[me] || r.done?.[me]) return;
  m = Math.floor(+m || 0); g = uniq(g); if (m < 0 || m > (r.money?.[me] || 0) || g.length > 12 || !g.every(c => stallOf(r, me).includes(c))) return;
  const o = r.offer?.[me] || { m: 0, g: [], v: 0 }; const og = o.g || [];
  if ((o.m || 0) === m && og.length === g.length && g.every(c => og.includes(c))) return;
  if (!(o.m || 0) && !og.length && (m || g.length)) say(r, `💸 {${me}} ยื่นซองให้จ่า`, { by: me });
  r.offer = { ...(r.offer || {}), [me]: { m, g, v: (o.v || 0) + 1 } };
  return cur;
}
// จ่าเรียกค่าผ่านทาง
export function setAsk(cur, me, id, m, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'inspect' || me !== r.officer || !r.bags?.[id] || r.done?.[id]) return;
  m = Math.max(0, Math.min(99, Math.floor(+m || 0))); if ((r.ask?.[id] || 0) === m) return;
  r.ask = m ? { ...(r.ask || {}), [id]: m } : without(r.ask, id); return cur;
}
// ปล่อยผ่าน: รับสินบนตามข้อเสนอเวอร์ชันที่จ่าเห็น (v) ของทั้งหมดเข้าแผงวัยรุ่น
function doPass(r, id, now, { quiet = false, noBribe = false } = {}) {
  const b = r.bags[id]; const o = r.offer?.[id] || { m: 0, g: [] };
  const m = noBribe ? 0 : Math.max(0, Math.min(o.m || 0, r.money[id] || 0));
  const g = noBribe ? [] : (o.g || []).filter(c => stallOf(r, id).includes(c));
  r.money[id] = (r.money[id] || 0) - m; r.money[r.officer] = (r.money[r.officer] || 0) + m;
  if (g.length) { r.stall[id] = stallOf(r, id).filter(c => !g.includes(c)); r.stall[r.officer] = [...stallOf(r, r.officer), ...g]; }
  r.stall[id] = [...stallOf(r, id), ...b.c];
  r.done = { ...(r.done || {}), [id]: { a: 'pass', m, g, n: b.c.length, d: b.d, at: now } };
  if (!quiet) { r.fxk = (r.fxk || 0) + 1; r.fx = { k: r.fxk, a: 'pass', id, by: r.officer, m, g, n: b.c.length, d: b.d, at: now }; }
  say(r, `✅ จ่าปล่อย {${id}} ผ่าน${m || g.length ? ` • รับซอง ${m ? m + '฿' : ''}${g.map(c => gOf(c).e).join('')}` : ''}`, { by: r.officer, pass: true });
}
export function passBag(cur, me, id, v, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'inspect' || me !== r.officer || !r.bags?.[id] || r.done?.[id]) return;
  if ((r.offer?.[id]?.v || 0) !== (+v || 0)) return; // ข้อเสนอเพิ่งเปลี่ยน → ให้จ่าดูใหม่
  doPass(r, id, now); return afterDecide(cur, now);
}
// เปิดตรวจ: พูดจริง = จ่าจ่ายค่าปรับให้วัยรุ่น • โกหก = วัยรุ่นจ่ายค่าปรับของที่ไม่ตรง + โดนยึด
export function openBag(cur, me, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'inspect' || me !== r.officer || !r.bags?.[id] || r.done?.[id]) return;
  const b = r.bags[id]; const T = bagTruth(b.c, b.d); let pay;
  if (!T.lie) { pay = Math.min(T.honestPay, r.money[me] || 0); r.money[me] -= pay; r.money[id] = (r.money[id] || 0) + pay; }
  else { pay = Math.min(T.fine, r.money[id] || 0); r.money[id] -= pay; r.money[me] = (r.money[me] || 0) + pay; r.trash = [...r.trash, ...T.bad]; }
  r.stall[id] = [...stallOf(r, id), ...T.good];
  r.done = { ...(r.done || {}), [id]: { a: 'open', ok: !T.lie, pay, lost: T.bad, c: b.c, n: b.c.length, d: b.d, at: now } };
  r.fxk = (r.fxk || 0) + 1; r.fx = { k: r.fxk, a: 'open', id, by: me, ok: !T.lie, pay, c: b.c, lost: T.bad, d: b.d, at: now };
  say(r, T.lie ? `🚨 จ่า {${me}} เปิดกระเป๋า {${id}} — จับได้! ${T.bad.map(c => gOf(c).e).join('')} โดนยึด ปรับ ${pay}฿` : `😇 จ่า {${me}} เปิดกระเป๋า {${id}} — ของจริง! จ่าจ่ายค่าเสียเวลา ${pay}฿`, { by: me, caught: T.lie, clean: !T.lie });
  return afterDecide(cur, now);
}
function afterDecide(cur, now) { const r = cur.round; if (r.phase === 'inspect' && !undecided(r).length) return toSum(cur, now); return cur; }
function toSum(cur, now) { const r = cur.round; r.phase = 'sum'; r.at = now; return cur; }
// คำพูดสั้น ๆ ลอยเหนือหัว (คุยผ่านเสียงไม่สะดวกก็กดได้)
export function shout(cur, me, k, now) {
  const r = cur.round; if (cur.status !== 'playing' || !inGame(r, me)) return;
  const L = me === r.officer ? OFFICER_LINES : RIDER_LINES; k = Math.floor(+k); if (!(k >= 0 && k < L.length)) return;
  r.bub = { ...(r.bub || {}), [me]: { k, o: me === r.officer, at: now } }; return cur;
}
export function nextRound(cur, now) {
  const r = cur.round; if (cur.status !== 'playing') return;
  let ri = r.ri + 1; while (ri < r.sched.length && !inGame(r, r.sched[ri])) ri++;
  if (ri >= r.sched.length) return finish(cur, 'end');
  if (r.order.filter(id => inGame(r, id)).length < 2) return finish(cur, 'players');
  r.ri = ri; r.officer = r.sched[ri]; r.phase = 'load'; r.at = now;
  r.bags = null; r.offer = null; r.ask = null; r.done = null; r.swapped = null; r.bub = null;
  r.order.filter(id => inGame(r, id)).forEach(id => refill(r, id));
  say(r, `👮 ด่านที่ ${ri + 1}: {${r.officer}} รับเวรเป็นจ่า`, { round: true });
  return cur;
}
// จ่าหรือหัวหน้าห้องกด "ด่านต่อไป" ตอนสรุป
export function goNext(cur, me, now) { const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'sum' || (me !== r.officer && me !== cur.hostId)) return; return nextRound(cur, now); }
function autoLoad(cur, now) {
  const r = cur.round;
  ridersOf(r).forEach(id => {
    if (r.bags?.[id]) return; const h = hand(r, id); if (!h.length) return;
    const lg = h.find(c => gOf(c).legal); const c = lg || h[0]; const d = lg ? typeOf(lg) : LEGAL[0];
    r.hands[id] = h.filter(x => x !== c); r.bags = { ...(r.bags || {}), [id]: { c: [c], d, at: now, auto: true } };
    say(r, `⏰ {${id}} จัดกระเป๋าไม่ทัน — ระบบยัด ${GOODS[d].e} ให้ 1 ชิ้น`, { by: id });
  });
  return toInspect(cur, now);
}
function autoInspect(cur, now, why = '⏰ หมดเวลาตรวจ — ที่เหลือปล่อยผ่านหมด') {
  const r = cur.round; const left = undecided(r); if (left.length) { say(r, why); left.forEach(id => doPass(r, id, now, { quiet: true })); }
  return toSum(cur, now);
}
// หมดเวลา: จัดกระเป๋าไม่ทัน → ระบบยัดให้ • ตรวจไม่ทัน → ปล่อยผ่าน (พร้อมสินบนที่เสนอไว้) • สรุปครบเวลา → ด่านต่อไป
export function cpTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'checkpoint' || cur.status !== 'playing') return;
  if (r.phase === 'load' && now >= (r.at || 0) + LOAD_MS) return autoLoad(cur, now);
  if (r.phase === 'inspect' && now >= (r.at || 0) + INSPECT_MS) return autoInspect(cur, now);
  if (r.phase === 'sum' && now >= (r.at || 0) + SUM_MS) return nextRound(cur, now);
}
export function forceCp(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'checkpoint') return;
  if (r.phase === 'load') return autoLoad(cur, now);
  if (r.phase === 'inspect') return autoInspect(cur, now, '⏭️ หัวหน้าห้องสั่งจบการตรวจ — ที่เหลือปล่อยผ่าน');
  if (r.phase === 'sum') return nextRound(cur, now);
}
// คนหลุด: ทิ้งการ์ดในมือ/กระเป๋าที่ยังไม่ตัดสิน • ถ้าเป็นจ่า ด่านนี้จบ (ปล่อยผ่านหมดแบบไม่มีสินบน)
export function kickCp(cur, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || !inGame(r, id) || cur.players?.[id]) return;
  r.out = { ...(r.out || {}), [id]: true }; r.trash = [...r.trash, ...hand(r, id)]; r.hands[id] = [];
  const b = r.bags?.[id]; if (b && !r.done?.[id]) { r.trash = [...r.trash, ...(b.c || [])]; r.bags = without(r.bags, id); }
  r.offer = without(r.offer, id); r.ask = without(r.ask, id); r.bub = without(r.bub, id);
  say(r, `🚪 {${id}} ออกจากวง`);
  if (r.order.filter(x => inGame(r, x)).length < 2) return finish(cur, 'players');
  if (id === r.officer) {
    if (r.phase === 'load') { Object.entries(r.bags || {}).forEach(([x, bb]) => { r.hands[x] = [...hand(r, x), ...(bb.c || [])]; }); r.bags = null; return nextRound(cur, now); }
    if (r.phase === 'inspect') { undecided(r).forEach(x => doPass(r, x, now, { quiet: true, noBribe: true })); return toSum(cur, now); }
    return nextRound(cur, now);
  }
  if (r.phase === 'load') return maybeInspect(cur, now);
  if (r.phase === 'inspect') return afterDecide(cur, now);
  return cur;
}
// คะแนนจบเกม: ราคาของบนแผง + โบนัสที่ 1/2 ต่อชนิดของถูกกฎหมาย (เสมอที่ 1 = รวมโบนัสที่ 1+2 แบ่งกัน) + เงิน
export function cpScores(r) {
  const ids = r.order.filter(id => !r.out?.[id]); const S = {};
  ids.forEach(id => { const s = stallOf(r, id); const counts = {}; GK.forEach(t => { counts[t] = 0; }); s.forEach(c => { counts[typeOf(c)] = (counts[typeOf(c)] || 0) + 1; }); S[id] = { goods: s.reduce((a, c) => a + gOf(c).v, 0), bonus: 0, money: r.money?.[id] || 0, counts, king: [], queen: [] }; });
  LEGAL.forEach(t => {
    const G = GOODS[t]; const cnt = id => S[id].counts[t]; const has = ids.filter(id => cnt(id) > 0); if (!has.length) return;
    const top = Math.max(...has.map(cnt)); const kings = has.filter(id => cnt(id) === top);
    if (kings.length > 1) { const each = Math.floor((G.king + G.queen) / kings.length); kings.forEach(id => { S[id].bonus += each; S[id].king.push(t); }); return; }
    S[kings[0]].bonus += G.king; S[kings[0]].king.push(t);
    const rest = has.filter(id => cnt(id) < top); if (!rest.length) return;
    const sec = Math.max(...rest.map(cnt)); const qs = rest.filter(id => cnt(id) === sec); const each = Math.floor(G.queen / qs.length);
    qs.forEach(id => { S[id].bonus += each; S[id].queen.push(t); });
  });
  ids.forEach(id => { S[id].total = S[id].goods + S[id].bonus + S[id].money; });
  return S;
}
function finish(cur, why) {
  const r = cur.round; const S = cpScores(r); const ids = Object.keys(S);
  const rank = [...ids].sort((a, b) => S[b].total - S[a].total || S[b].money - S[a].money);
  const top = rank.length ? S[rank[0]].total : 0; const sec = rank.map(id => S[id].total).find(x => x < top);
  const points = {}, sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { points[id] = !S[id] ? 0 : S[id].total === top ? CP_SCORE.win : sec != null && S[id].total === sec ? CP_SCORE.second : 0; sc[id] = (sc[id] || 0) + points[id]; });
  r.phase = 'done'; r.bub = null; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'checkpoint', winner: rank[0] || null, rank, points, why };
  return cur;
}

// ---------- ชิ้นส่วนหน้าจอ ----------
export function CpCard({ id, t: t0, onClick, sel, mark, dim, small, className = '', style }) {
  const t = id ? typeOf(id) : t0; const G = GOODS[t]; if (!G) return null;
  const cls = 'cpc' + (G.legal ? ' legal' : ' bad') + (sel ? ' sel' : '') + (dim ? ' dim' : '') + (small ? ' sm' : '') + (onClick ? ' tap' : '') + (className ? ' ' + className : '');
  const inner = <><span className="cpc-v" title="ราคาตอนจบเกม">฿{G.v}</span><span className="cpc-p" title="ค่าปรับต่อชิ้น">ปรับ {G.p}</span><span className="cpc-e">{G.e}</span><b>{G.n}</b>{!G.legal && <i className="cpc-rib">ของเถื่อน</i>}{mark && <em className="cpc-mark">{mark}</em>}</>;
  return onClick ? <button type="button" className={cls} style={{ '--gc': G.c, ...style }} onClick={onClick}>{inner}</button> : <div className={cls} style={{ '--gc': G.c, ...style }}>{inner}</div>;
}
// กระเป๋า: ยิ่งยัดเยอะยิ่งพอง
export function Bag({ n = 1, size = 64, open }) {
  const w = 34 + n * 5;
  return <svg className={'cp-bagsvg' + (open ? ' open' : '')} viewBox="0 0 80 64" width={size} height={size * 0.8} aria-hidden="true">
    <path d={`M${40 - w / 2 + 4} 20 Q40 ${10 - n} ${40 + w / 2 - 4} 20`} stroke="#3a2a14" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d={`M${40 - w / 2} 26 Q${40 - w / 2} 18 ${40 - w / 2 + 8} 18 H${40 + w / 2 - 8} Q${40 + w / 2} 18 ${40 + w / 2} 26 V${48 + n} Q${40 + w / 2} ${58 + n * 0.6} ${40 + w / 2 - 10} ${58 + n * 0.6} H${40 - w / 2 + 10} Q${40 - w / 2} ${58 + n * 0.6} ${40 - w / 2} ${48 + n} Z`} fill="#7a6a3a" stroke="#2a2010" strokeWidth="2" />
    <path d={`M${40 - w / 2 + 3} 30 H${40 + w / 2 - 3}`} stroke="#c9b26a" strokeWidth="2.5" strokeDasharray="3 2" />
    <rect x="35" y="27" width="10" height="7" rx="2" fill="#d8c27a" stroke="#2a2010" strokeWidth="1.2" />
    <path d={`M${40 - w / 2 + 6} 40 q${w / 4} 6 ${w / 2 - 6} 0`} stroke="#5a4a24" strokeWidth="2" fill="none" opacity=".6" />
    <text x="40" y={50 + n * 0.5} textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff6d0" fontFamily="Kanit,sans-serif">{n}</text>
  </svg>;
}
const money$ = n => `${n}฿`;
const icons = cards => { const c = {}; (cards || []).forEach(x => { const t = typeOf(x); c[t] = (c[t] || 0) + 1; }); return GK.filter(t => c[t]).map(t => `${GOODS[t].e}${c[t] > 1 ? '×' + c[t] : ''}`).join(' '); };
// แผงของผู้เล่น: คนอื่นเห็นแค่ของถูกกฎหมาย ของเถื่อนที่ผ่านด่านซ่อนไว้ใต้เบาะ (เปิดตอนจบเกม)
function StallLine({ cards, mine, reveal }) {
  const c = {}; (cards || []).forEach(x => { const t = typeOf(x); c[t] = (c[t] || 0) + 1; });
  const legal = LEGAL.filter(t => c[t]); const bad = BADS.filter(t => c[t]); const hidden = bad.reduce((a, t) => a + c[t], 0);
  if (!legal.length && !hidden) return <span className="cp-stall empty">แผงยังว่าง</span>;
  return <span className="cp-stall">{legal.map(t => <i key={t}>{GOODS[t].e}<b>{c[t]}</b></i>)}{hidden > 0 && (mine || reveal ? bad.map(t => <i key={t} className="bad">{GOODS[t].e}<b>{c[t]}</b></i>) : <i className="hid" title="ของเถื่อนที่ผ่านด่าน ซ่อนไว้จนจบเกม">🤫<b>{hidden}</b></i>)}</span>;
}
// ฉากด่านตรวจ: ป้อมจ่า ไฟไซเรน วัยรุ่นต่อแถวพร้อมกระเป๋า
function Board({ r, res, myId, av, nameOf, secs, total, srvNow }) {
  const off = r.officer; const riders = res ? r.order.filter(id => inGame(r, id)) : ridersOf(r); const you = id => (id === myId ? 'คุณ' : nameOf(id));
  const S = res ? cpScores(r) : null;
  const bubOf = id => { const b = r.bub?.[id]; if (!b || srvNow - b.at > 6000) return null; return (b.o ? OFFICER_LINES : RIDER_LINES)[b.k]; };
  const ph = res ? 'จบเกม' : r.phase === 'load' ? 'วัยรุ่นกำลังจัดกระเป๋า…' : r.phase === 'inspect' ? 'ตั้งด่าน ตรวจ/ต่อรอง!' : 'สรุปด่านนี้';
  const ob = bubOf(off);
  return <div className={'cp-board ph-' + (res ? 'done' : r.phase)}>
    <div className="cp-sky" aria-hidden="true"><i className="cp-moon" /><i className="cp-glow r" /><i className="cp-glow b" /></div>
    <div className="cp-booth">
      <div className="cp-lightbar" aria-hidden="true"><i /><i /></div>
      <div className="cp-off"><Avatar id={res ? res.winner : off} av={av} size={58} />{!res && <span className="cp-cap">👮</span>}{ob && <span key={r.bub[off].at} className="cp-bub off">{ob}</span>}</div>
      <div className="cp-off-txt"><small>{res ? 'รวยสุดหน้าด่าน' : `จ่าเวร • ด่านที่ ${Math.min(r.ri + 1, r.sched.length)}/${r.sched.length}`}</small><b>{res ? you(res.winner) : you(off)}</b><em>{ph}</em></div>
      {!res && <TimerRing secs={secs} total={total} size={58} />}{res && <span className="cp-trophy">🏆</span>}
      <span className="cp-sign">ด่านตรวจ<small>CHECKPOINT</small></span>
    </div>
    <div className="cp-road">
      <i className="cp-cone l" aria-hidden="true" /><i className="cp-cone r" aria-hidden="true" />
      <div className={'cp-lane n' + riders.length}>{riders.map(id => {
        const b = res ? null : r.bags?.[id]; const dn = res ? null : r.done?.[id]; const o = r.offer?.[id]; const ask = r.ask?.[id]; const bb = bubOf(id);
        const st = dn ? (dn.a === 'pass' ? 'pass' : dn.ok ? 'clean' : 'caught') : '';
        return <div key={id} className={'cp-rider' + (id === myId ? ' me' : '') + (st ? ' ' + st : '') + (b ? ' has' : '')}>
          {bb && <span key={r.bub[id].at} className="cp-bub">{bb}</span>}
          <div className="cp-r-top"><Avatar id={id} av={av} size={34} /><b>{you(id)}</b><span className="cp-cash">{money$(r.money?.[id] || 0)}</span></div>
          <div className="cp-r-mid">
            <span className="cp-bike" aria-hidden="true">🛵</span>
            {res ? <span className="cp-total">{S[id]?.total ?? 0}<small>คะแนน</small></span> : b ? <span key={'bag' + b.at} className="cp-bagwrap"><Bag n={b.c.length} size={58} /></span> : <span className="cp-nobag">{r.phase === 'load' ? <>🎒<small>กำลังยัด…</small></> : <small>ไม่มีกระเป๋า</small>}</span>}
          </div>
          {b && <span className="cp-decl"><small>บอกจ่าว่า</small><b>{GOODS[b.d].e} {GOODS[b.d].n} ×{b.c.length}</b></span>}
          {!res && !dn && o && (o.m > 0 || (o.g || []).length > 0) && <span className="cp-offer">💸 ซอง {o.m > 0 ? money$(o.m) : ''}{(o.g || []).length ? ' + ' + icons(o.g) : ''}</span>}
          {!res && !dn && ask > 0 && <span className="cp-ask">👮 ขอ {money$(ask)}</span>}
          {dn && <span className={'cp-stamp ' + st}>{st === 'pass' ? '✅ ผ่าน' : st === 'clean' ? '😇 ของจริง' : '🚨 จับได้!'}</span>}
          <StallLine cards={r.stall?.[id]} mine={id === myId} reveal={!!res} />
        </div>;
      })}</div>
    </div>
    <div className="cp-market"><span className="cp-mh">🛒 แผงลอยหน้าด่าน <small>(ของที่คนทิ้ง • กอง {r.deck.length})</small></span><span className="cp-mrow">{r.market.length ? r.market.map(c => <i key={c} style={{ '--gc': gOf(c).c }} title={gOf(c).n}>{gOf(c).e}</i>) : <small>ว่าง</small>}</span></div>
  </div>;
}
// ป๊อปอัปเปิดกระเป๋า: ไฟฉายส่อง กระเป๋าสั่น ซิปเปิด การ์ดเด้งออกทีละใบ แล้วประทับตรา
function OpenFx({ fx, nameOf, myId, onClose }) {
  const you = id => (id === myId ? 'คุณ' : nameOf(id)); const D = GOODS[fx.d]; const lost = fx.lost || []; const n = (fx.c || []).length;
  const tStamp = 1.5 + n * 0.32;
  return <div className={'cp-ofx ' + (fx.ok ? 'clean' : 'caught')} onClick={onClose} style={{ '--ts': tStamp + 's' }}>
    {!fx.ok && <><i className="cp-siren l" /><i className="cp-siren r" /></>}
    <i className="cp-beam" aria-hidden="true" />
    <div className="cp-ofx-box">
      <span className="cp-ofx-h">🔦 จ่า{you(fx.by)} เปิดกระเป๋า <b>{you(fx.id)}</b></span>
      <span className="cp-ofx-decl">บอกว่า: {D.e} {D.n} ×{n}</span>
      <div className="cp-ofx-bag"><Bag n={n} size={120} open /></div>
      <div className="cp-ofx-cards">{(fx.c || []).map((c, i) => { const bad = lost.includes(c); return <span key={c} className={'cp-ofx-c' + (bad ? ' bad' : ' ok')} style={{ animationDelay: 1.1 + i * 0.32 + 's' }}><CpCard id={c} small /><em>{bad ? '❌' : '✅'}</em></span>; })}</div>
      <b className="cp-ofx-stamp">{fx.ok ? 'ของจริง! 😇' : 'จับได้!! 🚨'}</b>
      <span className="cp-ofx-sub">{fx.ok ? <>จ่าเสียหน้า ต้องจ่ายค่าเสียเวลา <em>{money$(fx.pay)}</em> ให้ {you(fx.id)}</> : <>{you(fx.id)} โดนปรับ <em>{money$(fx.pay)}</em> • ยึด {lost.map(c => gOf(c).e).join('')} ({lost.length} ชิ้น)</>}</span>
      <small className="cp-ofx-close">แตะเพื่อปิด</small>
    </div>
  </div>;
}
// ป๊อปอัปปล่อยผ่าน: มอเตอร์ไซค์ซิ่งผ่านด่าน + เงินใต้โต๊ะลอยไปหาจ่า
function PassFx({ fx, nameOf, myId, onClose }) {
  const you = id => (id === myId ? 'คุณ' : nameOf(id)); const bribe = fx.m > 0 || (fx.g || []).length > 0;
  return <div className="cp-pfx" onClick={onClose}>
    <div className="cp-pfx-road"><span className="cp-pfx-bike">🛵<i>🎒</i></span>{bribe && Array.from({ length: 6 }, (_, i) => <i key={i} className="cp-coin" style={{ '--i': i }}>💸</i>)}</div>
    <div className="cp-pfx-box"><b>✅ ปล่อยผ่าน!</b><span>{you(fx.id)} ซิ่งผ่านด่านพร้อมกระเป๋า {fx.n} ชิ้น</span>{bribe && <em>💸 ซองใต้โต๊ะ {fx.m > 0 ? money$(fx.m) : ''}{(fx.g || []).length ? ' + ' + icons(fx.g) : ''} → จ่า{you(fx.by)}</em>}</div>
  </div>;
}

// ---------- หน้าจอ ----------
export function CheckpointGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack, srvNow }) {
  const r = useMemo(() => normRound(JSON.parse(JSON.stringify(room.round))), [room.round]);
  const res = room.status === 'result' && room.result;
  const off = r.officer; const meIn = inGame(r, myId); const iOff = meIn && off === myId; const iRide = meIn && !iOff;
  const riders = ridersOf(r); const myHand = r.hands[myId] || []; const myBag = r.bags[myId]; const myDone = r.done[myId]; const myMoney = r.money[myId] || 0;
  const myStall = r.stall[myId] || []; const myOffer = r.offer[myId] || { m: 0, g: [], v: 0 }; const myAsk = r.ask[myId] || 0;
  const you = id => (id === myId ? 'คุณ' : nameOf(id));
  const nm = s => String(s).replace(/\{([^}]+)\}/g, (_, id) => nameOf(id));
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => cpApply(c, f)).then(x => x.committed).catch(() => false);

  // เลือกการ์ด (ในเครื่อง)
  const [sel, setSel] = useState([]); const [take, setTake] = useState([]); const [mode, setMode] = useState('swap'); const [decl, setDecl] = useState(null);
  useEffect(() => { setSel([]); setTake([]); setMode('swap'); setDecl(null); }, [r.ri, r.phase === 'load']);
  useEffect(() => { setSel(s => s.filter(c => myHand.includes(c))); setTake(t => t.filter(c => r.market.includes(c))); }, [myHand.join(), r.market.join()]);
  const swapped = !!r.swapped[myId]; const stage = myBag ? 'packed' : swapped || mode === 'pack' ? 'pack' : 'swap';

  // หมดเวลา
  const total = r.phase === 'load' ? LOAD_MS : r.phase === 'inspect' ? INSPECT_MS : SUM_MS;
  const deadline = (r.at || 0) + total; const secs = Math.max(0, Math.ceil((deadline - srvNow) / 1000));
  const due = !res && srvNow >= deadline; useEffect(() => { if (due) tx(c => cpTick(c, srvNow)); }, [due, r.ri, r.phase]);

  // ป๊อปอัปเปิด/ปล่อยกระเป๋า
  const [fx, setFx] = useState(null); const fxSeen = useRef(r.fx?.k || 0);
  useEffect(() => {
    const F = r.fx; if (!F || F.k <= fxSeen.current) return; fxSeen.current = F.k; setFx(F);
    const tm = [];
    if (F.a === 'open') {
      sfx(sound, 'zip'); const n = (F.c || []).length;
      for (let i = 0; i < n; i++) tm.push(setTimeout(() => sfx(sound, 'card'), (1.1 + i * 0.32) * 1000));
      tm.push(setTimeout(() => { if (F.ok) { sfx(sound, 'clean'); if (F.pay) setTimeout(() => sfx(sound, 'cash'), 500); } else { sfx(sound, 'siren'); if (navigator.vibrate && F.id === myId) try { navigator.vibrate([200, 80, 200]); } catch { /* */ } } }, (1.5 + n * 0.32) * 1000));
      tm.push(setTimeout(() => setFx(x => (x?.k === F.k ? null : x)), (4.6 + n * 0.32) * 1000));
    } else {
      sfx(sound, 'whistle'); if (F.m > 0 || (F.g || []).length) tm.push(setTimeout(() => sfx(sound, 'cash'), 600));
      tm.push(setTimeout(() => setFx(x => (x?.k === F.k ? null : x)), 2600));
    }
    return () => tm.forEach(clearTimeout);
  }, [r.fx?.k]);

  // เสียงตามสถานะ
  const prev = useRef(null);
  useEffect(() => {
    const s = { ri: r.ri, ph: r.phase, bags: Object.keys(r.bags).length, res: !!res, offers: Object.values(r.offer).reduce((a, o) => a + (o.v || 0), 0) }; const p = prev.current; prev.current = s; if (!p) return;
    if (s.res && !p.res) { sfx(sound, res.winner === myId ? 'win' : 'lose'); return; }
    if (s.ri !== p.ri) { sfx(sound, off === myId ? 'yourTurn' : 'round'); return; }
    if (s.ph === 'inspect' && p.ph === 'load') { setTimeout(() => sfx(sound, 'whistle'), s.bags > p.bags ? 450 : 0); }
    if (s.bags > p.bags) sfx(sound, 'slam');
    else if (s.offers > p.offers && iOff) sfx(sound, 'coin');
  });

  // การกระทำ
  const toggle = (c, max) => { sfx(sound, 'select'); if (sel.includes(c)) { const ns = sel.filter(x => x !== c); setSel(ns); if (take.length > ns.length) setTake(take.slice(0, ns.length)); } else if (sel.length >= max) msg(`เลือกได้ไม่เกิน ${max} ใบ`); else setSel([...sel, c]); };
  const pickTake = c => { sfx(sound, 'select'); if (take.includes(c)) setTake(take.filter(x => x !== c)); else if (take.length >= sel.length) msg(sel.length ? `เก็บจากแผงได้ไม่เกินจำนวนที่ทิ้ง (${sel.length} ใบ)` : 'เลือกการ์ดในมือที่จะทิ้งก่อน'); else setTake([...take, c]); };
  const doSwap = async () => { if (!sel.length) return; sfx(sound, 'draw'); const ok = await tx(c => swapCards(c, myId, sel, take, srvNow)); if (!ok) msg('แลกไม่สำเร็จ — การ์ดบนแผงอาจถูกคนอื่นเก็บไปก่อน ลองใหม่'); setSel([]); setTake([]); setMode('pack'); };
  const doPack = async () => { if (!sel.length || !decl) return; sfx(sound, 'confirm'); const ok = await tx(c => packBag(c, myId, sel, decl, srvNow)); if (ok) setSel([]); else msg('ปิดกระเป๋าไม่สำเร็จ ลองใหม่'); };
  const offerSet = (m, g = myOffer.g) => { sfx(sound, 'click'); tx(c => setOffer(c, myId, Math.max(0, Math.min(myMoney, m)), g, srvNow)); };
  const askSet = (id, m) => { sfx(sound, 'click'); tx(c => setAsk(c, myId, id, m, srvNow)); };
  const decide = async (id, a) => { const v = r.offer[id]?.v || 0; const ok = await tx(c => (a === 'open' ? openBag(c, myId, id, srvNow) : passBag(c, myId, id, v, srvNow))); if (!ok) msg('ข้อเสนอเพิ่งเปลี่ยน — ดูอีกทีแล้วกดใหม่'); };
  const say1 = k => { sfx(sound, 'click'); tx(c => shout(c, myId, k, srvNow)); };

  // ความจริงของกระเป๋าที่กำลังจัด / ที่ปิดแล้ว
  const packCards = myBag ? myBag.c : sel; const packDecl = myBag ? myBag.d : decl;
  const T = packDecl && packCards.length ? bagTruth(packCards, packDecl) : null;
  const ready = riders.filter(id => r.bags[id] || !(r.hands[id] || []).length).length;
  const bagIds = riders.filter(id => r.bags[id]); const todo = bagIds.filter(id => !r.done[id]);

  // แถบขั้นตอนตามบทบาท
  const steps = iOff ? ['รอจัดกระเป๋า', 'ต่อรอง+ตรวจ', 'สรุปผล'] : ['แลกการ์ด', 'ยัดกระเป๋า', 'ต่อรองจ่า', 'ลุ้นผล'];
  const at = iOff ? (r.phase === 'load' ? 0 : r.phase === 'inspect' ? 1 : 2) : r.phase === 'load' ? (stage === 'swap' ? 0 : stage === 'pack' ? 1 : 2) : r.phase === 'inspect' ? (myDone || !myBag ? 3 : 2) : 4;

  // กล่อง "ตอนนี้ต้องทำอะไร"
  const doBox = res ? null : !meIn ? <><b>👀 คุณดูอยู่ข้างทาง</b><span>รอเกมรอบหน้า</span></>
    : iOff ? (r.phase === 'load' ? <><b>👮 คุณคือจ่าเวร! รอวัยรุ่นจัดกระเป๋า ({ready}/{riders.length})</b><span>ระหว่างนี้ข่มขวัญไปก่อน — กดคำพูดด้านล่าง หรือพูดในห้องเสียง • ดูขนาดกระเป๋า + สีหน้า แล้วเดาว่าใครโกหก</span></>
      : r.phase === 'inspect' ? <><b>🔦 ตัดสินทีละคน: เปิดตรวจ หรือ ปล่อยผ่าน (เหลือ {todo.length})</b><span>เปิดแล้วเจอของจริง = คุณต้องจ่ายเขา • เจอโกหก = ได้ค่าปรับ • ปล่อยผ่าน = รับซองที่เขาเสนอ (เรียกเพิ่มได้ด้วยปุ่ม −/+)</span></>
        : <><b>📋 สรุปด่านนี้</b><span>{r.ri + 1 < r.sched.length ? 'กด “ด่านต่อไป” ได้เลย หรือรอนับถอยหลัง' : 'ด่านสุดท้ายแล้ว! ต่อไปนับคะแนน'}</span></>)
    : r.phase === 'load' ? (stage === 'swap' ? <><b>① แลกการ์ดที่แผงลอย (ไม่บังคับ)</b><span>แตะการ์ดในมือที่ไม่อยากได้ → แตะของบนแผงที่อยากเก็บ → กดแลก • ไม่อยากแลก กด “ข้าม”</span></>
      : stage === 'pack' ? <><b>② ยัดการ์ด 1–5 ใบใส่กระเป๋า แล้วเลือกว่าจะบอกจ่าว่าเป็นอะไร</b><span>จำนวนต้องตรง แต่ชนิด <em>โกหกได้</em> — ของเถื่อนราคาแพง แต่โดนเปิดเจอ = โดนปรับ + ยึด</span></>
        : <><b>✅ ปิดกระเป๋าแล้ว รอเพื่อน ({ready}/{riders.length})</b><span>แก้กระเป๋าได้จนกว่าทุกคนจะเสร็จ</span></>)
      : r.phase === 'inspect' ? (!myBag ? <><b>🛵 รอบนี้คุณไม่มีกระเป๋า</b><span>ดูเพื่อนต่อรองกับจ่าไปก่อน</span></> : myDone ? <><b>{myDone.a === 'pass' ? '✅ คุณผ่านด่านแล้ว!' : myDone.ok ? '😇 โดนเปิด แต่ของจริง!' : '🚨 โดนจับได้!'}</b><span>รอจ่าตัดสินคนอื่น</span></>
        : <><b>③ ต่อรองกับจ่า — ยื่นซองหรือจะเสี่ยงเปล่า ๆ?</b><span>ตั้งเงิน/ของที่จะให้ จ่าเห็นทันที • จ่ายจริงก็ต่อเมื่อจ่ากด “ปล่อยผ่าน” • โดนเปิด = ซองไม่เสีย</span></>)
        : <><b>📋 สรุปด่านนี้</b><span>รอจ่ากดด่านต่อไป</span></>;

  const Lines = ({ L }) => <div className="cp-lines">{L.map((t, i) => <button key={i} type="button" onClick={() => say1(i)}>{t}</button>)}</div>;
  const price = <details className="cp-price"><summary>📋 ตารางราคา / ค่าปรับ / โบนัส</summary><table><thead><tr><th>ของ</th><th>ราคา</th><th>ปรับ</th><th>โบนัส ที่1/ที่2</th></tr></thead><tbody>{GK.map(t => { const G = GOODS[t]; return <tr key={t} className={G.legal ? '' : 'bad'}><td>{G.e} {G.n}</td><td>{G.v}</td><td>{G.p}</td><td>{G.legal ? `${G.king} / ${G.queen}` : 'ของเถื่อน'}</td></tr>; })}</tbody></table></details>;
  const S = res ? cpScores(r) : null;

  return <div className="cp-game">
    <div className="round-top"><span className="eyebrow">ด่านที่ {Math.min(r.ri + 1, r.sched.length)}/{r.sched.length} • ทุกคนเป็นจ่า {r.laps} ครั้ง</span><span className="cat-tag">👮 จ่าเวร: {res ? '—' : you(off)}</span></div>
    <div className="gcols"><div className="gmain"><Board r={r} res={res} myId={myId} av={av} nameOf={nameOf} secs={secs} total={Math.round(total / 1000)} srvNow={srvNow} /></div><div className="gside">

      {res && <>
        <Outcome art="win" tone={res.winner === myId ? 'good' : ''} title={`${nameOf(res.winner)} รวยสุดหน้าด่าน! 🏆`}>{res.why === 'players' ? <>คนเหลือไม่พอ เกมจบก่อน<br /></> : ''}คะแนนรวม {S[res.winner]?.total ?? 0} = ของ {S[res.winner]?.goods ?? 0} + โบนัส {S[res.winner]?.bonus ?? 0} + เงิน {S[res.winner]?.money ?? 0}</Outcome>
        <div className="cp-final">{(res.rank || []).map((id, i) => { const x = S[id]; if (!x) return null; return <div key={id} className={'cp-fr' + (id === myId ? ' me' : '')} style={{ animationDelay: i * 0.15 + 's' }}>
          <em>{i + 1}</em><Avatar id={id} av={av} size={30} /><span className="cp-fn"><b>{you(id)}</b><StallLine cards={r.stall[id]} reveal /></span>
          <span className="cp-fs"><small>ของ {x.goods} • โบนัส {x.bonus}{x.king.length ? ` (ที่1 ${x.king.map(t => GOODS[t].e).join('')})` : ''}{x.queen.length ? ` (ที่2 ${x.queen.map(t => GOODS[t].e).join('')})` : ''} • เงิน {x.money}</small><b>{x.total}</b></span></div>; })}</div>
        <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
        {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
      </>}

      {!res && <>
        {meIn && <ol className="cp-steps">{steps.map((s, i) => <li key={s} className={at > i ? 'done' : at === i ? 'now' : ''}>{at > i ? '✓' : i + 1} {s}</li>)}</ol>}
        <div className={'cp-do' + (iOff ? ' off' : '')}>{doBox}</div>

        {/* วัยรุ่น: แลกการ์ด */}
        {iRide && r.phase === 'load' && stage === 'swap' && <div className="cp-panel">
          <SecH icon="🛒">แผงลอย <small>แตะเพื่อเก็บ (เก็บได้ {take.length}/{sel.length})</small></SecH>
          <div className="cp-cards mk">{r.market.map(c => <CpCard key={c} id={c} small sel={take.includes(c)} mark={take.includes(c) ? 'เก็บ' : null} onClick={() => pickTake(c)} />)}{!r.market.length && <p className="hint">แผงว่าง</p>}</div>
          <SecH icon="🃏">การ์ดในมือ <small>แตะใบที่จะทิ้ง (สูงสุด {SWAP_MAX})</small></SecH>
          <div className="cp-cards">{myHand.map(c => <CpCard key={c} id={c} sel={sel.includes(c)} mark={sel.includes(c) ? 'ทิ้ง' : null} className={sel.includes(c) ? 'drop' : ''} onClick={() => toggle(c, SWAP_MAX)} />)}</div>
          <div className="cp-btns"><button className="primary" disabled={!sel.length} onClick={doSwap}>♻️ ทิ้ง {sel.length} • เก็บ {take.length} • จั่ว {Math.max(0, sel.length - take.length)}</button><button className="secondary" onClick={() => { sfx(sound, 'click'); setSel([]); setTake([]); setMode('pack'); }}>ข้าม ไม่แลก ▶</button></div>
        </div>}

        {/* วัยรุ่น: ยัดกระเป๋า */}
        {iRide && r.phase === 'load' && stage === 'pack' && <div className="cp-panel">
          <SecH icon="🎒">เลือกการ์ดใส่กระเป๋า <small>{sel.length}/{BAG_MAX} ใบ</small></SecH>
          <div className="cp-cards">{myHand.map(c => <CpCard key={c} id={c} sel={sel.includes(c)} mark={sel.includes(c) ? '🎒' : null} onClick={() => { toggle(c, BAG_MAX); if (!decl && gOf(c).legal && !sel.includes(c)) setDecl(typeOf(c)); }} />)}</div>
          <SecH icon="📣">จะบอกจ่าว่าเป็นของอะไร?</SecH>
          <div className="cp-declpick">{LEGAL.map(t => <button key={t} type="button" className={decl === t ? 'on' : ''} style={{ '--gc': GOODS[t].c }} onClick={() => { sfx(sound, 'select'); setDecl(t); }}><span>{GOODS[t].e}</span><b>{GOODS[t].n}</b><small>ปรับ {GOODS[t].p}/ชิ้น</small></button>)}</div>
          {T && <div className={'cp-truth ' + (T.lie ? 'lie' : 'ok')}>{T.lie ? <>😈 <b>โกหก!</b> มีของไม่ตรง {T.bad.length} ชิ้น ({icons(T.bad)}) — ถ้าจ่าเปิด: โดนปรับ <em>{money$(T.fine)}</em> + ยึดของที่ไม่ตรง</> : <>😇 <b>พูดจริง</b> — ถ้าจ่าเปิด จ่าต้องจ่ายคุณ <em>{money$(T.honestPay)}</em></>}</div>}
          <button className="primary wide cp-go" disabled={!sel.length || !decl} onClick={doPack}>🎒 ปิดกระเป๋า: “{decl ? `${GOODS[decl].e} ${GOODS[decl].n}` : '…'} {sel.length} ชิ้นครับจ่า”</button>
          {!swapped && <button className="link-btn" onClick={() => { setSel([]); setMode('swap'); }}>◀ กลับไปแลกการ์ด</button>}
        </div>}

        {/* วัยรุ่น: กระเป๋าของฉัน */}
        {iRide && myBag && (r.phase !== 'inspect' || myDone) && <div className="cp-panel mine">
          <SecH icon="🎒">กระเป๋าของคุณ <small>บอกจ่าว่า {GOODS[myBag.d].e} {GOODS[myBag.d].n} ×{myBag.c.length}</small></SecH>
          <div className="cp-cards sm">{myBag.c.map(c => { const lost = (myDone?.lost || []).includes(c); return <CpCard key={c} id={c} small dim={lost} mark={lost ? '❌ ยึด' : myDone ? '✅' : null} />; })}</div>
          {r.phase === 'load' && <>{T && <div className={'cp-truth ' + (T.lie ? 'lie' : 'ok')}>{T.lie ? <>😈 โกหกอยู่ — โดนเปิด = ปรับ <em>{money$(T.fine)}</em></> : <>😇 พูดจริง — โดนเปิด = จ่าจ่ายคุณ <em>{money$(T.honestPay)}</em></>}</div>}
            <button className="secondary" onClick={() => { sfx(sound, 'click'); tx(c => unpackBag(c, myId, srvNow)); }}>✏️ แก้กระเป๋า</button></>}
        </div>}

        {/* วัยรุ่น: ต่อรอง/ยื่นซอง */}
        {iRide && r.phase === 'inspect' && myBag && !myDone && <div className="cp-panel bribe">
          <SecH icon="💸">ซองใต้โต๊ะของคุณ <small>เงินคุณ {money$(myMoney)}</small></SecH>
          {myAsk > 0 && <div className="cp-askbar">👮 จ่าเรียก <b>{money$(myAsk)}</b><button className="primary" disabled={myOffer.m === Math.min(myAsk, myMoney)} onClick={() => offerSet(myAsk)}>🤝 ให้ตามขอ</button></div>}
          <div className="cp-money"><button type="button" onClick={() => offerSet(myOffer.m - 5)} disabled={myOffer.m <= 0}>−5</button><button type="button" onClick={() => offerSet(myOffer.m - 1)} disabled={myOffer.m <= 0}>−1</button><b>{myOffer.m}<small>฿</small></b><button type="button" onClick={() => offerSet(myOffer.m + 1)} disabled={myOffer.m >= myMoney}>+1</button><button type="button" onClick={() => offerSet(myOffer.m + 5)} disabled={myOffer.m >= myMoney}>+5</button></div>
          {myStall.length > 0 && <><small className="cp-sub">แถมของจากแผงคุณ (แตะเพื่อใส่/เอาออก):</small><div className="cp-gift">{myStall.map(c => <button key={c} type="button" className={myOffer.g.includes(c) ? 'on' : ''} style={{ '--gc': gOf(c).c }} onClick={() => offerSet(myOffer.m, myOffer.g.includes(c) ? myOffer.g.filter(x => x !== c) : [...myOffer.g, c])}>{gOf(c).e}</button>)}</div></>}
          <div className="cp-if"><span className="pass">✅ ถ้าปล่อยผ่าน: {myOffer.m || myOffer.g.length ? <>จ่ายซอง {myOffer.m ? money$(myOffer.m) : ''}{myOffer.g.length ? ' + ' + icons(myOffer.g) : ''}</> : 'ไม่เสียอะไร'} • ของ {myBag.c.length} ชิ้นเข้าแผง</span>
            <span className={T?.lie ? 'lie' : 'ok'}>🔦 ถ้าโดนเปิด: {T?.lie ? <>ปรับ {money$(T.fine)} + ยึด {icons(T.bad)}</> : <>จ่าจ่ายคุณ {money$(T?.honestPay || 0)}</>}</span></div>
          <div className="cp-btns"><button className="secondary" disabled={!myOffer.m && !myOffer.g.length} onClick={() => offerSet(0, [])}>🙅 ไม่ให้สักบาท</button></div>
        </div>}

        {/* จ่า: ตัดสินทีละกระเป๋า */}
        {iOff && r.phase === 'inspect' && <div className="cp-panel decide">{bagIds.map(id => {
          const b = r.bags[id]; const dn = r.done[id]; const o = r.offer[id] || { m: 0, g: [], v: 0 }; const ask = r.ask[id] || 0; const D = GOODS[b.d]; const hasO = o.m > 0 || o.g.length > 0;
          return <div key={id} className={'cp-dec' + (dn ? ' done' : '')}>
            <div className="cp-dec-h"><Avatar id={id} av={av} size={32} /><b>{nameOf(id)}</b><span className="cp-decl">“{D.e} {D.n} ×{b.c.length}”</span></div>
            {!dn ? <>
              <div className="cp-dec-o">{hasO ? <>💸 ยื่นซอง <b>{o.m ? money$(o.m) : ''}{o.g.length ? ' + ' + icons(o.g) : ''}</b></> : <span className="muted">ยังไม่ยื่นซอง</span>}<span className="cp-dec-ask">เรียกเพิ่ม <button type="button" disabled={!ask} onClick={() => askSet(id, ask - 1)}>−</button><b>{money$(ask)}</b><button type="button" onClick={() => askSet(id, ask + 1)}>+</button><button type="button" onClick={() => askSet(id, ask + 5)}>+5</button></span></div>
              <div className="cp-dec-btns"><button className="cp-open" onClick={() => decide(id, 'open')}>🔦 เปิดตรวจ!<small>ของจริง = คุณจ่าย {money$(b.c.length * D.p)}</small></button><button className="cp-pass" onClick={() => decide(id, 'pass')}>✅ ปล่อยผ่าน<small>{hasO ? `รับซอง ${o.m ? money$(o.m) : ''}${o.g.length ? ' + ' + icons(o.g) : ''}` : 'ไม่ได้อะไร'}</small></button></div>
            </> : <div className={'cp-dec-r ' + (dn.a === 'pass' ? 'pass' : dn.ok ? 'clean' : 'caught')}>{dn.a === 'pass' ? `✅ ปล่อยผ่าน${dn.m ? ` • ได้ ${money$(dn.m)}` : ''}${(dn.g || []).length ? ' + ' + icons(dn.g) : ''}` : dn.ok ? `😇 ของจริง — คุณจ่าย ${money$(dn.pay)}` : `🚨 จับได้! ได้ค่าปรับ ${money$(dn.pay)} • ยึด ${icons(dn.lost)}`}</div>}
          </div>;
        })}</div>}

        {/* คำพูดสั้น ๆ */}
        {meIn && r.phase !== 'sum' && <><SecH icon="🗯️">พูดใส่ <small>(ลอยเหนือหัวทุกจอ)</small></SecH><Lines L={iOff ? OFFICER_LINES : RIDER_LINES} /></>}

        {/* สรุปด่าน */}
        {r.phase === 'sum' && <div className="cp-panel sum">
          <SecH icon="📋">ผลด่านที่ {r.ri + 1}</SecH>
          <ul className="cp-sumlist">{riders.map(id => { const dn = r.done[id]; return <li key={id} className={dn ? (dn.a === 'pass' ? 'pass' : dn.ok ? 'clean' : 'caught') : ''}><Avatar id={id} av={av} size={26} /><b>{you(id)}</b><span>{!dn ? 'ไม่มีกระเป๋า' : dn.a === 'pass' ? `✅ ผ่าน (+${dn.n} ชิ้น)${dn.m || (dn.g || []).length ? ` • จ่ายซอง ${dn.m ? money$(dn.m) : ''}${(dn.g || []).length ? ' ' + icons(dn.g) : ''}` : ''}` : dn.ok ? `😇 ของจริง! ได้ ${money$(dn.pay)} จากจ่า (+${dn.n} ชิ้น)` : `🚨 โกหก! ปรับ ${money$(dn.pay)} • ยึด ${icons(dn.lost)}`}</span></li>; })}</ul>
          {r.ri + 1 < r.sched.length && <p className="hint">ด่านหน้า: 👮 {you(r.sched.slice(r.ri + 1).find(id => inGame(r, id)) || r.sched[r.ri + 1])} เป็นจ่า</p>}
          {(iOff || isHost) ? <button className="primary wide" onClick={() => { sfx(sound, 'confirm'); tx(c => goNext(c, myId, srvNow)); }}>{r.ri + 1 < r.sched.length ? `▶ ด่านต่อไป (${secs})` : `🏁 นับคะแนน (${secs})`}</button> : <div className="waiting">⏳ ไปต่อเองใน {secs} วิ</div>}
        </div>}

        {/* มือ + แผงของฉัน */}
        {meIn && !(iRide && r.phase === 'load' && stage !== 'packed') && <><SecH icon="🃏">การ์ดในมือ <small>{iOff ? 'เก็บไว้ใช้ตอนเป็นวัยรุ่น' : 'ใช้ด่านหน้า'}</small></SecH><div className="cp-cards sm">{myHand.map(c => <CpCard key={c} id={c} small />)}{!myHand.length && <p className="hint">ไม่มีการ์ด</p>}</div></>}
        {meIn && <><SecH icon="🏪">แผงของคุณ <small>ของที่ผ่านด่าน = แต้มตอนจบ • ของเถื่อนคนอื่นไม่เห็น</small></SecH><div className="cp-mystall"><StallLine cards={myStall} mine /><span className="cp-cash big">💰 {money$(myMoney)}</span></div></>}
        {price}

        {isHost && <HostBar>
          <button className="secondary" onClick={() => { if (confirm(r.phase === 'load' ? 'ให้ระบบยัดกระเป๋าให้คนที่ยังไม่เสร็จ แล้วเริ่มตรวจ?' : r.phase === 'inspect' ? 'จบการตรวจ — กระเป๋าที่เหลือปล่อยผ่าน?' : 'ไปด่านต่อไป?')) tx(c => forceCp(c, srvNow)); }}>⏭️ {r.phase === 'load' ? 'ข้ามไปตรวจเลย' : r.phase === 'inspect' ? 'จบการตรวจ' : 'ด่านต่อไป'}</button>
          {r.order.filter(id => inGame(r, id) && !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickCp(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}</HostBar>}
      </>}
      <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
      <ul className="head-log">{[...r.log].reverse().slice(0, 8).map((e, i) => <li key={i} className={e.caught ? 'cp-caught' : e.clean || e.pass ? 'win-line' : e.round ? 'cp-roundline' : ''}>{nm(e.text)}</li>)}</ul>
    </div></div>
    {fx && fx.a === 'open' && <OpenFx key={fx.k} fx={fx} nameOf={nameOf} myId={myId} onClose={() => setFx(null)} />}
    {fx && fx.a === 'pass' && <PassFx key={fx.k} fx={fx} nameOf={nameOf} myId={myId} onClose={() => setFx(null)} />}
  </div>;
}

// ---------- ห้องรอ ----------
export function CheckpointLobby({ n }) {
  return <>
    <div className="score-rules"><b>🛵 1 ด่าน = จ่า 1 คน + วัยรุ่นที่เหลือ</b>
      <span>① วัยรุ่นแลกการ์ดที่แผงลอย (ไม่บังคับ) ให้มือครบ {HAND} ใบ</span>
      <span>② ยัดการ์ด 1–{BAG_MAX} ใบใส่กระเป๋า แล้วบอกจ่าว่า “หมูปิ้ง 3 ชิ้นครับ” — จำนวนต้องตรง แต่ชนิดโกหกได้!</span>
      <span>③ ต่อรอง ยื่นซองใต้โต๊ะ (เงิน หรือของบนแผง) • จ่าเรียกเพิ่มได้</span>
      <span>④ จ่าเลือกทีละคน: 🔦 เปิดตรวจ — พูดจริง = จ่าจ่ายค่าเสียเวลาให้วัยรุ่น / โกหก = วัยรุ่นโดนปรับ + ยึดของที่ไม่ตรง • ✅ ปล่อยผ่าน = รับซอง ของทั้งหมดเข้าแผง</span>
      <span>🔁 ทุกคนผลัดกันเป็นจ่า {n <= 4 ? 2 : 1} ครั้ง (ตั้งได้ด้านล่าง) • เริ่มคนละ {MONEY0}฿ • จบเกม: ราคาของบนแผง + โบนัสคนที่มีของแต่ละชนิดมากสุด/รองลงมา + เงิน</span></div>
    <div className="cp-cards lobby">{GK.map(t => <CpCard key={t} t={t} small />)}</div>
  </>;
}
