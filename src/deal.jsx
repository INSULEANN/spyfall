// เกม "ปิดดีล!" — เกมเจรจาธุรกิจ: เดินหมวกเจ้าสัวไปเจอดีล เจ้าของดีลต้องรวบรวมหุ้นส่วนให้ครบแล้วตกลงแบ่งเงินกัน
// ระหว่างเจรจาใครก็เล่นการ์ดขัดขาได้: ข้าคุมเอง • ห้าม! • พักร้อน • คอนเนคชั่น • ซื้อหุ้น ×3
// เล่นการ์ดแล้วทุกคนต้องรอ 2 วิ • กดปิดดีลแล้วนับถอยหลัง 5 วิ ระหว่างนั้นสวนได้
// (กลไกแนวเกมเจรจาที่มีอยู่ทั่วไป แต่ชื่อ ดีล ภาพ ธีมเป็นของเราเองทั้งหมด)
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint } from './rand.js';
import { Avatar, HostBar, SecH, Outcome, Leaderboard, TimerRing } from './ui.jsx';
import { CardImg } from './cards.jsx';
import './deal.css';

export const DEAL_MIN = 3, DEAL_MAX = 6;
export const DEAL_SCORE = { win: 3, second: 1 };
export const TURN_MS = 30000, NEGO_MS = 90000, NEGO_CAP = 180000, TILES = 16, GOAL = TILES, END_EVERY = 12, END_START = 6, HAND0 = 5, DRAW_N = 3, HAND_MAX = 12, CARD_CD = 2000, CLOSE_MS = 5000, BUY_N = 3;
export const PARTNERS = {
  bank: { n: 'ธนาคาร', e: '🏦', c: '#3a7bd5' }, build: { n: 'รับเหมา', e: '🏗️', c: '#e0862a' }, media: { n: 'สื่อ', e: '📺', c: '#d9434b' },
  law: { n: 'ทนาย', e: '⚖️', c: '#8a5ad6' }, ship: { n: 'ขนส่ง', e: '🚚', c: '#2f9e5f' }, tech: { n: 'ไอที', e: '💻', c: '#1fa3b5' },
};
export const PK = Object.keys(PARTNERS);
// need = หุ้นส่วนจำเป็น • opt = กลุ่มตัวเลือก • pick = ต้องเลือกจากกลุ่มตัวเลือกกี่ราย (เจ้าของดีลเลือก)
export const DEALS = [
  { n: 'ร้านชาบู', e: '🍲', v: 3, need: ['build'], opt: ['media', 'ship', 'law'], pick: 1 }, { n: 'คาเฟ่แมว', e: '🐈', v: 3, need: ['media'], opt: ['law', 'build', 'tech'], pick: 1 },
  { n: 'แอปส่งอาหาร', e: '🛵', v: 4, need: ['tech', 'ship'] }, { n: 'ตลาดนัดกลางคืน', e: '🏮', v: 3, need: [], opt: ['law', 'build', 'media', 'ship'], pick: 2 },
  { n: 'โรงงานน้ำปลา', e: '🐟', v: 4, need: ['ship'], opt: ['bank', 'build', 'law'], pick: 1 }, { n: 'ค่ายเกม', e: '🎮', v: 4, need: ['tech'], opt: ['bank', 'media'], pick: 1 },
  { n: 'ร้านทองเยาวราช', e: '💰', v: 4, need: ['bank', 'law'] }, { n: 'ตลาดน้ำ', e: '🛶', v: 3, need: [], opt: ['ship', 'media', 'build'], pick: 2 },
  { n: 'โกดังสินค้า', e: '📦', v: 4, need: ['ship', 'build'] }, { n: 'ค่ายมวยไทย', e: '🥊', v: 4, need: ['media'], opt: ['tech', 'law', 'bank'], pick: 1 },
  { n: 'ซีรีส์วาย', e: '🎬', v: 6, need: ['media', 'tech'], opt: ['law', 'bank', 'ship'], pick: 1 }, { n: 'รีสอร์ตริมทะเล', e: '🏖️', v: 6, need: ['build'], opt: ['ship', 'media', 'bank', 'law'], pick: 2 },
  { n: 'ธนาคารออนไลน์', e: '💳', v: 6, need: ['bank', 'tech'], opt: ['law', 'media'], pick: 1 }, { n: 'ฟาร์มทุเรียน', e: '🌴', v: 5, need: ['ship'], opt: ['bank', 'build', 'tech', 'law'], pick: 2 },
  { n: 'คลินิกความงาม', e: '💄', v: 5, need: ['law'], opt: ['media', 'bank', 'build'], pick: 2 }, { n: 'ดาต้าเซ็นเตอร์', e: '🖥️', v: 6, need: ['tech', 'build'], opt: ['bank', 'law', 'ship'], pick: 1 },
  { n: 'คอนโดติดรถไฟฟ้า', e: '🏢', v: 8, need: ['bank', 'build'], opt: ['law', 'media', 'ship', 'tech'], pick: 2 }, { n: 'ห้างสรรพสินค้า', e: '🛍️', v: 8, need: ['bank', 'media'], opt: ['build', 'ship', 'law', 'tech'], pick: 2 },
  { n: 'สนามบินใหม่', e: '🛫', v: 9, need: ['bank', 'build', 'ship'], opt: ['law', 'tech', 'media'], pick: 1 }, { n: 'รถไฟความเร็วสูง', e: '🚄', v: 9, need: ['build', 'ship', 'tech'], opt: ['bank', 'law'], pick: 1 },
  { n: 'ร้านหมูกระทะ', e: '🥓', v: 3, need: ['build'], opt: ['ship', 'media', 'bank'], pick: 1 }, { n: 'โรงเรียนกวดวิชา', e: '📚', v: 5, need: ['law', 'media'], opt: ['tech', 'build'], pick: 1 },
  { n: 'ฟาร์มกุ้ง', e: '🦐', v: 5, need: ['ship'], opt: ['bank', 'build', 'law', 'tech'], pick: 2 }, { n: 'ค่ายเพลง', e: '🎤', v: 7, need: ['media', 'tech', 'bank'], opt: ['law', 'ship'], pick: 1 },
];
export const optOf = D => D?.opt || []; export const pickOf = D => (optOf(D).length ? D.pick || 0 : 0);
export const slotsOf = D => [...(D?.need || []), ...optOf(D)];
// เงินทั้งเกมนับเป็นล้าน แสดงแบบ 12.00 M
export const fmtM = x => (+x || 0).toFixed(2) + ' M';
// การ์ดตัวคูณ: ล้านต่อส่วน (เปิดทันทีที่เปิดดีล ทุกคนเห็นว่าดีลนี้รวมกี่ M แล้วคูณกับจำนวนส่วนของแต่ละคน)
export const MONEY = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5];
export const CARDS = {
  boss: { n: 'ข้าคุมเอง!', e: '🎩', text: 'แย่งเป็นเจ้าของดีลที่กำลังเจรจาอยู่' },
  stop: { n: 'ห้าม!', e: '🛑', text: 'ยกเลิกการ์ดใบล่าสุด (ข้าคุมเอง / พักร้อน) ห้ามซื้อหุ้นไม่ได้ ห้ามซ้อนห้ามไม่ได้' },
  trip: { n: 'พักร้อน', e: '🏖️', text: 'ส่งหุ้นส่วนไปพักร้อน ที่นั่งว่างจนจบดีลนี้' },
  clan: { n: 'คอนเนคชั่น', e: '🤝', text: 'นั่งที่หุ้นส่วนนี้ในดีลเอง ใช้แล้วทิ้ง' },
  buy: { n: 'ซื้อหุ้น', e: '🧾', text: `ครบ ${BUY_N} ใบเล่นพร้อมกัน ยึดหุ้นส่วน 1 รายมาเป็นของคุณถาวร` },
};
// trip/clan: จำนวนต่อสีหุ้นส่วน • tripAny = พักร้อนสีเทา ใช้กับสีไหนก็ได้
export const DECK_PLAN = { boss: 8, stop: 10, trip: 2, tripAny: 2, clan: 3, buy: 21 };
// รหัสการ์ด: boss-3, stop-12, trip_bank-20, trip_any-21, clan_ship-30, buy-40
export const cparse = id => { const b = String(id).split('-')[0]; const i = b.indexOf('_'); return i > 0 ? { t: b.slice(0, i), p: b.slice(i + 1) } : { t: b, p: null }; };
export const cardTitle = id => { const { t, p } = cparse(id); const C = CARDS[t]; if (!C) return t; return p && PARTNERS[p] ? `${C.n}${PARTNERS[p].n}` : p === 'any' ? `${C.n} (ทุกสี)` : C.n; };

// ---------- จัดเกม ----------
export function makeDealRound(ids, opts = {}, number = 1, t0 = Date.now()) {
  const order = shuffle(ids); const ctrl = {}; shuffle(PK).forEach((p, i) => { ctrl[p] = order[i % order.length]; });
  const di = shuffle(DEALS.map((_, i) => i));
  const deck = []; let k = 0; const add = (b, n) => { for (let i = 0; i < n; i++) deck.push(`${b}-${k++}`); };
  add('boss', DECK_PLAN.boss); add('stop', DECK_PLAN.stop); add('buy', DECK_PLAN.buy); add('trip_any', DECK_PLAN.tripAny);
  PK.forEach(p => { add('trip_' + p, DECK_PLAN.trip); add('clan_' + p, DECK_PLAN.clan); });
  const d = shuffle(deck); const hands = {}, money = {};
  order.forEach(id => { hands[id] = d.splice(0, HAND0); money[id] = 0; });
  return { number, kind: 'deal', order, turn: 0, pos: 0, tiles: di.slice(0, TILES), reserve: di.slice(TILES), ctrl, hands, deck: d, discard: [], money, closed: 0, done: null, mdeck: shuffle([...MONEY]), lastPay: null, endDeck: shuffle([1, 2, 3, 4, 5, 6]), endNums: null, endFlip: null, lastRoll: null, phase: 'turn', nego: null, at: t0 + 3000, turns: 0, out: null, log: [], startedAt: t0 };
}

// ---------- ตรรกะ (ทำงานบนข้อมูลห้องทั้งก้อนใน transaction) ----------
const hand = (r, id) => r.hands?.[id] || [];
export const curOf = r => r.order[r.turn];
const inGame = (r, id) => r.order.includes(id) && !r.out?.[id];
function say(r, text, extra) { r.log = [...(r.log || []), { text, t: Date.now(), ...extra }].slice(-40); }
function draw(r, id, n) {
  for (let i = 0; i < n; i++) {
    if (!(r.deck || []).length) { if (!(r.discard || []).length) break; r.deck = shuffle(r.discard); r.discard = []; }
    const d = [...r.deck]; r.hands[id] = [...hand(r, id), d.shift()]; r.deck = d;
  }
  capHand(r, id);
}
function capHand(r, id) { const h = hand(r, id); if (h.length > HAND_MAX) { r.discard = [...(r.discard || []), ...h.slice(0, h.length - HAND_MAX)]; r.hands[id] = h.slice(-HAND_MAX); } }
const giveBack = (r, id, c) => { if (inGame(r, id)) { r.hands[id] = [...hand(r, id), c]; capHand(r, id); } else r.discard = [...(r.discard || []), c]; };
export const dealOf = r => (r.nego ? DEALS[r.nego.deal] : null);
// ที่นั่งในดีล: คอนเนคชั่นมาก่อน • ไม่งั้นเจ้าของหุ้นส่วน (ถ้าไม่ได้ไปพักร้อน และยังอยู่ในวง)
function reseat(r) {
  const n = r.nego; const D = DEALS[n.deal]; const s = {};
  slotsOf(D).forEach(p => { const c = n.clan?.[p]; s[p] = c && inGame(r, c.by) ? c.by : n.away?.[p] ? null : inGame(r, r.ctrl[p]) ? r.ctrl[p] : null; });
  n.seats = s; n.chosen = (n.chosen || []).filter(p => s[p]).slice(0, pickOf(D));
}
const sigOf = n => JSON.stringify([n.boss, n.seats || {}, n.chosen || []]);
// จบดีล: คอนเนคชั่นที่ได้ใช้ในดีล → ทิ้ง • ที่ไม่ได้ใช้ (หรือดีลล่ม) → กลับเข้ามือ
function returnClans(r, used = []) {
  const n = r.nego; if (n) n.clan = null;   // การ์ดคอนเนคชั่นทิ้งตั้งแต่ตอนเล่นแล้ว
}
// นับถอยหลังปิดดีลอยู่ แต่เงื่อนไขไม่ครบแล้ว → ยกเลิก
function guard(r, now) {
  const n = r.nego; if (!n?.closeAt || canClose(n)) return;
  n.closeAt = null; n.closeOff = now; say(r, '⛔ ยกเลิกปิดดีล! เงื่อนไขไม่ครบแล้ว — เจรจาต่อ', { act: '⛔ ยกเลิกปิดดีล!' });
}
// "ห้าม!" ย้อนการ์ดใบล่าสุด
function undo(r, L) {
  const n = r.nego;
  if (L.t === 'boss' && n && inGame(r, L.prev)) n.boss = L.prev;
  else if (L.t === 'trip' && n) {
    if (L.clan) { if (!n.clan?.[L.p]) n.clan = { ...(n.clan || {}), [L.p]: L.clan }; }
    else if (n.away?.[L.p]) { const a = { ...n.away }; delete a[L.p]; n.away = a; }
    n.chosen = [...new Set([...(n.chosen || []), ...(L.chosen || [])])];
  }
}
// คนที่อยู่ในดีล: เจ้าของดีล + คนนั่งที่หุ้นส่วนจำเป็น + หุ้นส่วนตัวเลือกที่เจ้าของดีลเลือกแล้ว (ไม่ซ้ำ)
export const partsOf = n => { const D = DEALS[n.deal]; return [...new Set([n.boss, ...D.need.map(p => n.seats?.[p]), ...(n.chosen || []).map(p => n.seats?.[p])].filter(Boolean))]; };
function defOffer(r) {
  const n = r.nego; const v = DEALS[n.deal].v; const ps = partsOf(n); const others = ps.filter(id => id !== n.boss);
  const each = Math.floor(v / ps.length); const o = {}; others.forEach(id => { o[id] = each; }); o[n.boss] = v - each * others.length; return o;
}
// โครงดีลเปลี่ยน (เจ้าของ/คนนั่ง) → ข้อเสนอกลับเป็นแบ่งเท่า ๆ กัน คำตอบรีเซ็ต + ต่อเวลา
function touch(r, now) {
  const n = r.nego; n.offer = defOffer(r); n.ok = null; pruneAsk(n);
  n.until = Math.min(n.start + NEGO_CAP, Math.max(n.until, now + 20000));
}
// คำขอส่วนแบ่ง: เก็บไว้จนกว่าเจ้าของดีลให้ตรงตามขอ หรือคนนั้นไม่ได้ถือที่นั่งในดีลแล้ว
function pruneAsk(n) {
  if (!n.ask) return; const D = DEALS[n.deal]; const ps = partsOf(n); const a = {};
  Object.entries(n.ask).forEach(([id, w]) => { if (id !== n.boss && slotsOf(D).some(p => n.seats?.[p] === id) && !(ps.includes(id) && (n.offer?.[id] || 0) === w)) a[id] = w; });
  n.ask = Object.keys(a).length ? a : null;
}
// ข้อเสนอใหม่: ใครได้เท่าเดิมหรือมากขึ้นยังนับว่าตกลงอยู่ ใครโดนลดต้องตอบใหม่
function applyOffer(n, o) {
  const old = n.offer || {}; const ok = {};
  Object.entries(n.ok || {}).forEach(([id, y]) => { if (y === true && (o[id] || 0) >= (old[id] || 0)) ok[id] = true; });
  n.offer = o; n.ok = Object.keys(ok).length ? ok : null; pruneAsk(n);
}
const boardDone = r => (r.tiles || []).every(t => t == null || t < 0);
function finish(cur, why = 'limit') {
  const r = cur.round; const ids = r.order.filter(id => !r.out?.[id]); const m = id => r.money?.[id] || 0;
  const rank = [...ids].sort((a, b) => m(b) - m(a)); const top = m(rank[0]); const sec = rank.map(m).find(x => x < top);
  const points = {}, sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { points[id] = !ids.includes(id) ? 0 : m(id) === top ? DEAL_SCORE.win : sec != null && m(id) === sec ? DEAL_SCORE.second : 0; sc[id] = (sc[id] || 0) + points[id]; });
  r.phase = 'done'; r.nego = null; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'deal', winner: rank[0] || null, rank, points, why };
  return cur;
}
function nextTurn(cur, now) {
  const r = cur.round; r.nego = null; r.last = null; r.phase = 'turn'; r.rolled = false; r.at = now; r.turns = (r.turns || 0) + 1;
  if (boardDone(r)) return finish(cur, 'board');
  if (r.turns >= r.order.length * 30) return finish(cur, 'limit');
  const since = r.endFrom != null ? r.turns - r.endFrom : 0;
  if (r.endFrom != null && since > 0 && since % END_EVERY === 0 && (r.endDeck || []).length) { const d = [...r.endDeck]; const x = d.shift(); r.endDeck = d; r.endNums = [...(r.endNums || []), x]; r.endFlip = { n: x, at: now }; say(r, `🎴 เปิดการ์ดจบเกม: เลข ${x} — ตั้งแต่นี้ใครทอยได้ ${(r.endNums || []).join(', ')} เกมจบทันที!`, { end: true }); }
  const n = r.order.length; for (let i = 1; i <= n; i++) { const k = (r.turn + i) % n; if (inGame(r, r.order[k])) { r.turn = k; break; } }
  return cur;
}

// ตาของคุณ: ① เปิดดีลช่องที่ยืนอยู่เลย (ไม่ทอย ไม่จั่ว) • ② ทอยเต๋าเดิน แล้วเลือก เปิดดีลช่องใหม่ หรือ จั่ว 3 ใบ • ③ จั่ว 3 ใบจบตาเลย
export const tileDeal = r => { const di = r.tiles?.[r.pos]; return di != null && di >= 0 ? di : null; };
export function rollDeal(cur, me, now, die = 1 + rint(6)) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'turn' || curOf(r) !== me || r.rolled) return;
  r.lastRoll = { by: me, die, at: now };
  if ((r.endNums || []).includes(die)) { say(r, `🎴 {${me}} ทอยได้ ${die} ตรงการ์ดจบเกม — เกมจบ!`, { by: me, act: `🎲 ${die} จบเกม!`, end: true }); return finish(cur, 'number'); }
  r.pos = (r.pos + die) % TILES; r.rolled = true; r.at = now; const di = tileDeal(r);
  say(r, di == null ? `🎲 {${me}} ทอยได้ ${die} — ช่องนี้ปิดดีลไปแล้ว ต้องจั่วการ์ด` : `🎲 {${me}} ทอยได้ ${die} มาหยุดที่ ${DEALS[di].e} ${DEALS[di].n} (${DEALS[di].v} M) — จะเปิดดีลหรือจั่วการ์ด?`, { by: me, act: `🎲 ${die}` });
  return cur;
}
// เปิดดีลช่องที่หมวกยืนอยู่ (ก่อนทอย = ช่องเดิม • หลังทอย = ช่องที่เพิ่งมาหยุด)
export function openDeal(cur, me, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'turn' || curOf(r) !== me) return;
  const di = tileDeal(r); if (di == null) return;
  const D = DEALS[di]; r.last = null; const die = r.rolled ? r.lastRoll?.die || null : null;
  // เปิดตัวคูณทันทีที่เปิดดีล — ทุกคนรู้ว่าดีลนี้ใหญ่แค่ไหน ก่อนตัดสินใจทุ่มการ์ด
  let md = [...(r.mdeck || [])]; if (!md.length) md = shuffle([...MONEY]); const mult = md.shift(); r.mdeck = md;
  r.phase = 'nego'; r.nego = { tile: r.pos, deal: di, boss: me, roller: me, seats: {}, chosen: [], away: null, clan: null, offer: null, ok: null, die, mult, start: now, until: now + NEGO_MS };
  reseat(r); r.nego.chosen = optOf(D).filter(p => r.nego.seats[p] === me).slice(0, pickOf(D));
  r.nego.offer = defOffer(r);
  say(r, `💼 {${me}} เปิดดีล ${D.e} ${D.n}${die ? '' : ' ตรงช่องเดิม'} (${D.v} M) → เปิดตัวคูณ ×${mult} = ${fmtM(D.v * mult)}`, { by: me, act: `💼 เปิดดีล ×${mult}` });
  return cur;
}
// จั่วการ์ด 3 ใบแล้วจบตา
export function drawTurn(cur, me, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'turn' || curOf(r) !== me) return;
  draw(r, me, DRAW_N); say(r, `🃏 {${me}} จั่วการ์ด ${DRAW_N} ใบ`, { by: me, act: `🃏 +${DRAW_N}` }); return nextTurn(cur, now);
}
// เจ้าของดีลปรับข้อเสนอ: others = {id: จำนวนส่วน} ของทุกคนในดีลยกเว้นตัวเอง (ตัวเองได้ที่เหลือ)
export function setOffer(cur, me, others, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss !== me) return;
  const v = DEALS[n.deal].v; const ps = partsOf(n).filter(id => id !== me); const o = {}; let sum = 0;
  for (const id of ps) { const x = Math.floor(+others?.[id] || 0); if (x < 0) return; o[id] = x; sum += x; }
  if (sum > v) return; o[me] = v - sum; applyOffer(n, o); guard(r, now); return cur;
}
// เจ้าของดีลกด − / + ทีละส่วน (ส่งทันที) • d = 'ask' ให้ตามที่คนนั้นขอ • d = 'even' แบ่งเท่า ๆ กัน
export function bumpOffer(cur, me, id, d, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss !== me) return;
  if (d === 'even') { applyOffer(n, defOffer(r)); guard(r, now); return cur; }
  if (id === me || !partsOf(n).includes(id)) return;
  const v = DEALS[n.deal].v; const others = partsOf(n).filter(x => x !== me); const o = {}; others.forEach(x => { o[x] = Math.max(0, n.offer?.[x] || 0); });
  const left = v - others.reduce((a, x) => a + o[x], 0); const was = o[id];
  const nv = d === 'ask' ? Math.min(n.ask?.[id] ?? was, was + left) : Math.max(0, Math.min(was + (+d || 0), was + left));
  if (nv === was && d !== 'ask') return;
  o[id] = nv; o[me] = v - others.reduce((a, x) => a + o[x], 0); applyOffer(n, o); guard(r, now); return cur;
}
// คนที่ถือที่นั่งในดีล (ทั้งตัวจริงและตัวเลือก) ขอส่วนแบ่ง N ส่วน → เจ้าของดีลกด "ให้" ได้ทันที
export function askShare(cur, me, want, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss === me) return;
  const D = DEALS[n.deal]; if (!slotsOf(D).some(p => n.seats?.[p] === me)) return;
  const w = Math.max(0, Math.min(D.v, Math.floor(+want || 0))); const inDeal = partsOf(n).includes(me);
  n.ask = { ...(n.ask || {}), [me]: w }; if (n.ok?.[me] === true) n.ok = { ...n.ok, [me]: false };
  say(r, inDeal ? `🙏 {${me}} ขอ ${w} ส่วน` : `🙋 {${me}} เสนอตัว ขอแค่ ${w} ส่วน`, { by: me, act: inDeal ? `🙏 ขอ ${w} ส่วน` : `🙋 ขอแค่ ${w} ส่วน` });
  guard(r, now); return cur;
}
// คนในดีลตอบรับ/ปฏิเสธข้อเสนอ
export function answer(cur, me, yes, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || me === n.boss || !partsOf(n).includes(me)) return;
  if (yes && n.ask?.[me] != null) { const a = { ...n.ask }; delete a[me]; n.ask = Object.keys(a).length ? a : null; }
  n.ok = { ...(n.ok || {}), [me]: !!yes }; say(r, `${yes ? '✅' : '❌'} {${me}} ${yes ? 'ตกลง' : 'ไม่เอา'} (${n.offer?.[me] || 0} ส่วน)`, { by: me, act: yes ? '✅ ตกลง!' : '❌ ไม่เอา!' }); guard(r, now); return cur;
}
export const canClose = n => { if (!n) return false; const D = DEALS[n.deal]; const ch = n.chosen || []; return D.need.every(p => n.seats?.[p]) && ch.length === pickOf(D) && ch.every(p => n.seats?.[p]) && partsOf(n).filter(id => id !== n.boss).every(id => n.ok?.[id] === true); };
// เจ้าของดีลเลือก/เอาออก หุ้นส่วนตัวเลือก (ครบ pick ราย ถึงปิดดีลได้)
export function chooseOpt(cur, me, p, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss !== me) return;
  const D = DEALS[n.deal]; if (!optOf(D).includes(p)) return; const ch = n.chosen || [];
  if (ch.includes(p)) { n.chosen = ch.filter(x => x !== p); say(r, `🧩 {${me}} เอา${PARTNERS[p].n}ออกจากดีล`, { by: me, act: `➖ ${PARTNERS[p].n}` }); }
  else { if (!n.seats?.[p] || ch.length >= pickOf(D)) return; n.chosen = [...ch, p]; say(r, `🧩 {${me}} เลือก${PARTNERS[p].n} ({${n.seats[p]}}) เข้าดีล`, { by: me, act: `➕ ${PARTNERS[p].n}` }); }
  touch(r, now); guard(r, now); return cur;
}
// เจ้าของดีลกดปิดดีล (ทุกที่นั่งครบ + ทุกคนตกลงแล้ว) → นับถอยหลัง 5 วิ ระหว่างนั้นคนอื่นยังสวนการ์ดได้
export function closeDeal(cur, me, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss !== me || !canClose(n) || n.closeAt) return;
  n.closeAt = now + CLOSE_MS; n.until = Math.max(n.until, n.closeAt + 5000);
  say(r, `⏳ {${me}} กดปิดดีล! นับถอยหลัง ${CLOSE_MS / 1000} วิ — ใครจะสวนต้องรีบ`, { by: me, act: `⏳ ปิดดีลใน ${CLOSE_MS / 1000} วิ!` });
  return cur;
}
// นับครบ: ปิดดีลจริง จ่ายเงินตามตัวคูณที่เปิดไว้ตอนเปิดดีล
function settle(cur, now) {
  const r = cur.round; const n = r.nego; const me = n.boss;
  const D = DEALS[n.deal]; returnClans(r, [...D.need, ...(n.chosen || [])]); let card = n.mult; if (!card) { let md = [...(r.mdeck || [])]; if (!md.length) md = shuffle([...MONEY]); card = md.shift(); r.mdeck = md; }
  const pay = {}; Object.entries(n.offer || {}).forEach(([id, x]) => { pay[id] = x * card; r.money[id] = (r.money?.[id] || 0) + x * card; });
  r.lastPay = { deal: n.deal, card, x: D.v, pay, at: now };
  say(r, `🤝 {${me}} ปิดดีล ${D.e} ${D.n}! (${D.v} M × ${card}) ส่วนละ ${fmtM(card)} → ${partsOf(n).map(id => `{${id}} ${n.offer[id]} ส่วน = ${fmtM(pay[id] ?? 0)}`).join(' • ')}`, { by: me, act: `💵 ${fmtM(card)}/ส่วน!`, win: true });
  r.done = [...(r.done || []), { deal: n.deal, boss: me, offer: n.offer, card }]; r.closed = (r.closed || 0) + 1;
  if (r.closed >= END_START && r.endFrom == null) { r.endFrom = r.turns || 0; say(r, `🎴 ปิดดีลครบ ${END_START} ดีลแล้ว! เริ่มนับการ์ดจบเกม — อีก ${END_EVERY} ตาเปิดใบแรก`, { end: true }); }
  r.tiles[n.tile] = -1;
  r.flash = { tile: n.tile, at: now };
  return nextTurn(cur, now);
}
function failDeal(cur, now, why) {
  const r = cur.round; const n = r.nego; const D = DEALS[n.deal];
  returnClans(r);
  say(r, `💨 ดีล ${D.e} ${D.n} ล่ม${why ? ` — ${why}` : ''} • {${n.roller}} ได้การ์ดปลอบใจ 1 ใบ`, { by: n.boss, act: '💨 ดีลล่ม' });
  if (inGame(r, n.roller)) draw(r, n.roller, 1);
  return nextTurn(cur, now);
}
export function cancelDeal(cur, me, now) { const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'nego' || r.nego.boss !== me) return; return failDeal(cur, now, 'เจ้าของดีลถอนตัว'); }
// เล่นการ์ด (ทุกคนต้องรอ 2 วิหลังการ์ดใบก่อน): boss/trip/clan ใช้ระหว่างเจรจา (clan ใช้แล้วทิ้ง) • stop ยกเลิก boss/trip ใบล่าสุด • buy ×3 ใช้ได้ทุกเมื่อ ห้ามไม่ได้
export function playDealCard(cur, me, card, arg, now) {
  const r = cur.round; if (cur.status !== 'playing' || !inGame(r, me) || !hand(r, me).includes(card)) return;
  if (now < (r.cardAt || 0) + CARD_CD) return;
  const { t, p } = cparse(card); const n = r.nego; const nego = r.phase === 'nego' && !!n; const D = nego ? DEALS[n.deal] : null;
  const sig = nego ? sigOf(n) : ''; const L = r.last; let used = [card], last = null, nope = null, text, act;
  if (t === 'boss') {
    if (!nego || n.boss === me) return;
    last = { t, by: me, card, prev: n.boss }; n.boss = me;
    text = `🎩 {${me}} “ข้าคุมเอง!” แย่งเป็นเจ้าของดีล`; act = '🎩 ข้าคุมเอง!';
  } else if (t === 'stop') {
    if (!L || L.by === me) return;
    undo(r, L); nope = L.card;
    text = `🛑 {${me}} “ห้าม!” ยกเลิก${cardTitle(L.card)}ของ {${L.by}}`; act = '🛑 ห้าม!';
  } else if (t === 'trip') {
    const q = p === 'any' ? arg : p; if (!nego || !slotsOf(D).includes(q)) return;
    const was = n.seats?.[q]; if (!was) return; const c = n.clan?.[q];
    last = { t, by: me, card, p: q, chosen: n.chosen || [] };
    if (c && c.by === was) {
      const cl = { ...n.clan }; delete cl[q]; n.clan = cl; last.clan = c;
      text = `🏖️ {${me}} ส่งคอนเนคชั่น${PARTNERS[q].n} ({${was}}) ไปพักร้อน — ทิ้งการ์ดทั้งคู่`;
    } else { n.away = { ...(n.away || {}), [q]: me }; text = `🏖️ {${me}} ส่ง${PARTNERS[q].n} ${PARTNERS[q].e} ({${was}}) ไปพักร้อน!`; }
    act = `🏖️ ${PARTNERS[q].n}ไปพักร้อน!`;
  } else if (t === 'clan') {
    if (!nego || !PARTNERS[p] || !slotsOf(D).includes(p) || n.seats?.[p] === me) return;
    n.clan = { ...(n.clan || {}), [p]: { by: me, card } };
    text = `🤝 {${me}} ส่งคอนเนคชั่น${PARTNERS[p].n} ${PARTNERS[p].e} เข้านั่งในดีลเอง`; act = `🤝 ${PARTNERS[p].n}คนกันเอง!`;
  } else if (t === 'buy') {
    if (!PARTNERS[arg] || r.ctrl[arg] === me) return;
    const mine = hand(r, me).filter(c => cparse(c).t === 'buy'); if (mine.length < BUY_N) return;
    used = [...mine.filter(c => c !== card).slice(0, BUY_N - 1), card];
    const old = r.ctrl[arg]; r.ctrl[arg] = me;   // ซื้อหุ้น: ห้ามไม่ได้ (last = null)
    text = `🧾 {${me}} ซื้อหุ้น ×${BUY_N} ยึด${PARTNERS[arg].n} ${PARTNERS[arg].e} ต่อจาก {${old}}`; act = `🧾 ซื้อ${PARTNERS[arg].n}!`;
  } else return;
  r.hands[me] = hand(r, me).filter(c => c !== card && !used.includes(c)); r.discard = [...(r.discard || []), ...used];
  r.last = last; r.cardAt = now; r.fx = { n: (r.fx?.n || 0) + 1, card, by: me, text, ...(nope ? { nope } : {}) };
  say(r, text, { by: me, act });
  if (nego) { reseat(r); if (sigOf(n) !== sig) touch(r, now); else n.until = Math.min(n.start + NEGO_CAP, Math.max(n.until, now + 10000)); if (n.closeAt) n.until = Math.max(n.until, n.closeAt + 5000); guard(r, now); }
  else if (curOf(r) === me) r.at = Math.max(r.at || 0, now);
  return cur;
}
// หมดเวลา: ไม่เลือกในตา → จั่วให้ • นับถอยหลังปิดดีลครบ → ปิดจริง • เจรจาไม่จบ → ดีลล่ม
export function dealTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'deal' || cur.status !== 'playing') return;
  if (r.phase === 'turn' && now >= (r.at || 0) + (r.tmT || TURN_MS)) return drawTurn(cur, curOf(r), now);
  if (r.phase === 'nego' && r.nego.closeAt) { if (now < r.nego.closeAt) return; if (canClose(r.nego)) return settle(cur, now); guard(r, now); return cur; }
  if (r.phase === 'nego' && now >= r.nego.until) return failDeal(cur, now, 'หมดเวลาเจรจา');
}
export function forceDeal(cur, now) { const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'deal') return; return r.phase === 'nego' ? failDeal(cur, now, 'หัวหน้าห้องสั่งจบ') : drawTurn(cur, curOf(r), now); }
// คนหลุด: หุ้นส่วนที่เขาคุมแจกให้คนอื่นแบบสุ่ม ถ้ากำลังเจรจาอยู่และเขาเกี่ยวข้อง → ดีลล่ม
export function kickDeal(cur, id, now) {
  const r = cur.round; if (!inGame(r, id) || cur.players?.[id] || r.phase === 'done') return;
  r.out = { ...(r.out || {}), [id]: true }; const left = r.order.filter(x => inGame(r, x));
  PK.forEach(p => { if (r.ctrl[p] === id && left.length) r.ctrl[p] = left[rint(left.length)]; });
  r.discard = [...(r.discard || []), ...hand(r, id)]; r.hands[id] = [];
  say(r, `🚪 {${id}} ออกจากวง — หุ้นส่วนที่เคยคุมถูกแจกใหม่`);
  if (left.length < 2) return finish(cur, 'players');
  if (r.phase === 'nego' && (r.nego.boss === id || partsOf(r.nego).includes(id))) return failDeal(cur, now, 'มีคนหลุด');
  if (r.phase === 'nego') { const n = r.nego; const sig = sigOf(n); reseat(r); if (sigOf(n) !== sig) touch(r, now); guard(r, now); }
  // กำลังเจรจาอยู่ → ปล่อยให้ดีลจบก่อน แล้ว nextTurn จะข้ามคนที่ออกไปเอง (ไม่งั้นการ์ดคอนเนคชั่นบนโต๊ะหาย)
  if (r.phase === 'turn' && curOf(r) === id) return nextTurn(cur, now);
  return cur;
}

// ---------- กระดาน: ดีล 12 ช่องเรียงรอบขอบ (4×4) ตรงกลางเป็นสถานะ ----------
// วงรอบขอบตาราง 5×5 = 16 ช่อง เดินตามเข็มนาฬิกา
const GRID = 5;
const RING = [...Array.from({ length: GRID }, (_, c) => [0, c]), ...Array.from({ length: GRID - 2 }, (_, i) => [i + 1, GRID - 1]), ...Array.from({ length: GRID }, (_, i) => [GRID - 1, GRID - 1 - i]), ...Array.from({ length: GRID - 2 }, (_, i) => [GRID - 2 - i, 0])];
// ไอคอนหุ้นส่วน: เหรียญสี + ลายเส้นขาว (วาดเอง ไม่ใช้อีโมจิ หน้าตาเหมือนกันทุกเครื่อง)
const GLYPH = {
  bank: c => <g fill="#fff"><path d="M24 10.5 L37.5 18 H10.5 Z" /><rect x="11.5" y="19.2" width="25" height="2.6" rx="1.3" /><rect x="14" y="23.4" width="3.4" height="9.6" rx="1.2" /><rect x="19.9" y="23.4" width="3.4" height="9.6" rx="1.2" /><rect x="25.8" y="23.4" width="3.4" height="9.6" rx="1.2" /><rect x="31.6" y="23.4" width="3.4" height="9.6" rx="1.2" /><rect x="10.5" y="34.2" width="27" height="3.2" rx="1.4" /><circle cx="24" cy="15.4" r="1.6" fill={c} /></g>,
  build: c => <g><path d="M10.5 31.5 Q11 15.5 24 15 Q37 15.5 37.5 31.5 Z" fill="#fff" /><rect x="8" y="30.5" width="32" height="4.6" rx="2.3" fill="#fff" /><path d="M24 16.5 V30" stroke={c} strokeWidth="3" strokeLinecap="round" /><path d="M17 19.5 Q15 24 15.3 30 M31 19.5 Q33 24 32.7 30" stroke={c} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity=".7" /></g>,
  media: c => <g><path d="M18.5 11.5 L24 17 L29.5 11.5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /><rect x="10" y="17" width="28" height="19" rx="3.5" fill="#fff" /><rect x="13" y="20" width="19" height="13" rx="2" fill={c} /><path d="M20.5 23.3 L26.5 26.5 L20.5 29.7 Z" fill="#fff" /><circle cx="35" cy="22" r="1.3" fill={c} /><circle cx="35" cy="26.5" r="1.3" fill={c} /><rect x="17" y="36.5" width="14" height="2.4" rx="1.2" fill="#fff" /></g>,
  law: c => <g fill="#fff"><circle cx="24" cy="11.8" r="2.2" /><rect x="22.9" y="12.5" width="2.2" height="21" rx="1" /><rect x="11.5" y="15.6" width="25" height="2.4" rx="1.2" /><path d="M14 17.5 L10.3 26.5 M14 17.5 L17.7 26.5 M34 17.5 L30.3 26.5 M34 17.5 L37.7 26.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" /><path d="M9.3 26.5 H18.7 Q18 31 14 31 Q10 31 9.3 26.5 Z" /><path d="M29.3 26.5 H38.7 Q38 31 34 31 Q30 31 29.3 26.5 Z" /><path d="M17 37 Q17 33.5 24 33.5 Q31 33.5 31 37 Z" /></g>,
  ship: c => <g><rect x="7.5" y="16.5" width="21" height="14.5" rx="2" fill="#fff" /><path d="M29.5 20.5 H36 L40.5 26 V31 H29.5 Z" fill="#fff" /><path d="M31.5 22.2 H35 L37.8 25.6 H31.5 Z" fill={c} /><rect x="10.5" y="20" width="10" height="2" rx="1" fill={c} opacity=".75" /><circle cx="14.5" cy="32.5" r="3.6" fill="#fff" stroke={c} strokeWidth="1.4" /><circle cx="34.5" cy="32.5" r="3.6" fill="#fff" stroke={c} strokeWidth="1.4" /><circle cx="14.5" cy="32.5" r="1.2" fill={c} /><circle cx="34.5" cy="32.5" r="1.2" fill={c} /></g>,
  tech: c => <g><rect x="12.5" y="12.5" width="23" height="16.5" rx="2.2" fill="#fff" /><rect x="14.7" y="14.7" width="18.6" height="12.1" rx="1.2" fill={c} /><path d="M21 18 L18.2 20.75 L21 23.5 M27 18 L29.8 20.75 L27 23.5" stroke="#fff" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 31 H39.5 L36.5 35 H11.5 Z" fill="#fff" /><rect x="21" y="31.4" width="6" height="1.4" rx=".7" fill={c} /></g>,
};
export function PartnerIcon({ p, size, off, className = 'pd' }) {
  const P = PARTNERS[p]; if (!P) return null;
  return <svg className={className + (off ? ' off' : '')} viewBox="0 0 48 48" width={size} height={size} role="img" aria-label={P.n}>
    <title>{P.n}</title>
    <circle cx="24" cy="24" r="23" fill={P.c} /><path d="M3.5 27 A20.5 20.5 0 0 0 44.5 27 Z" fill="#000" opacity=".16" />
    <path d="M7 19 A18 18 0 0 1 41 19 Q24 12 7 19 Z" fill="#fff" opacity=".22" />
    <circle cx="24" cy="24" r="20.6" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.4" />
    {GLYPH[p](P.c)}
  </svg>;
}
const Dot = ({ p, size, off }) => <PartnerIcon p={p} size={size} off={off} />;
// การ์ด: กรอบสีตามชนิด ภาพประกอบด้านบน ชื่อ+คำอธิบายด้านล่าง
const CARD_ART = {
  // 🎩 ข้าคุมเอง: หมวกเจ้าสัวลอยกลางออร่าทอง
  boss: () => <g><g stroke="#ffd76a" strokeWidth="3" strokeLinecap="round" opacity=".55">{[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(d => <path key={d} d="M50 8 V-2" transform={`rotate(${d} 50 40)`} />)}</g>
    <circle cx="50" cy="40" r="30" fill="#ffd76a" opacity=".3" /><circle cx="50" cy="40" r="22" fill="#fff0a8" opacity=".45" />
    <g transform="rotate(-8 50 46)"><ellipse cx="50" cy="58" rx="30" ry="7" fill="#b8860b" /><path d="M34 58 V24 Q50 18 66 24 V58 Z" fill="#f2c14e" /><path d="M34 24 Q50 18 66 24 Q50 30 34 24 Z" fill="#ffe08a" /><rect x="34" y="46" width="32" height="7" fill="#7a1f2b" /><path d="M39 28 V43" stroke="#fff8d0" strokeWidth="3.5" strokeLinecap="round" opacity=".7" /></g>
    <g fill="#fffbe0"><path d="M16 14 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" /><path d="M84 10 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 z" /><path d="M86 54 l1.2 3 l3 1.2 l-3 1.2 l-1.2 3 l-1.2 -3 l-3 -1.2 l3 -1.2 z" /></g></g>,
  // 🛑 ห้าม!: ป้ายแปดเหลี่ยมแดง เขียนว่า ห้าม
  stop: () => <g><path d="M37 5 H63 L81 23 V53 L63 71 H37 L19 53 V23 Z" fill="#e0303a" stroke="#fff" strokeWidth="4" strokeLinejoin="round" /><path d="M37 5 H63 L81 23 V29 Q50 17 19 29 V23 Z" fill="#fff" opacity=".14" />
    <text x="50" y="47" textAnchor="middle" fontSize="23" fontWeight="900" fill="#fff" fontFamily="Kanit,sans-serif">ห้าม!</text></g>,
  // 🤝 คอนเนคชั่น: มือสองข้างจับกัน + สีหุ้นส่วน
  clan: p => <g><path d="M3 47 L29 31 L40 46 L14 62 Z" fill="#26365e" /><path d="M97 47 L71 31 L60 46 L86 62 Z" fill="#3a2d5e" />
    <rect x="25" y="29" width="7" height="17" rx="2" fill="#fff" transform="rotate(-31 28.5 37.5)" /><rect x="68" y="29" width="7" height="17" rx="2" fill="#fff" transform="rotate(31 71.5 37.5)" />
    <path d="M30 32 Q43 24 53 31 L61 28 Q71 27 75 34 L64 48 Q54 52 47 49 Q38 54 34 46 Z" fill="#ffd2a8" /><g stroke="#c98a5a" strokeWidth="1.8" fill="none" strokeLinecap="round"><path d="M46 34 q5 3 10 2" /><path d="M48 39.5 q5 3 10 2" /><path d="M50 44.5 q4 2 8 1" /></g>
    {p !== 'any' && <g transform="translate(36 1)"><PartnerIcon p={p} size={28} className="cd-badge" /></g>}
    <g fill="#fff6c0"><path d="M14 14 l1.5 3.5 l3.5 1.5 l-3.5 1.5 l-1.5 3.5 l-1.5 -3.5 l-3.5 -1.5 l3.5 -1.5 z" /><path d="M86 16 l1.2 3 l3 1.2 l-3 1.2 l-1.2 3 l-1.2 -3 l-3 -1.2 l3 -1.2 z" /></g></g>,
  // ✈️ พักร้อน: เครื่องบินบินขึ้นฟ้า ทิ้งควันเป็นทาง
  trip: p => <g><circle cx="82" cy="16" r="9" fill="#ffe27a" /><g fill="#fff" opacity=".9"><ellipse cx="22" cy="20" rx="13" ry="5" /><ellipse cx="30" cy="16" rx="8" ry="5" /><ellipse cx="74" cy="58" rx="14" ry="5" /><ellipse cx="66" cy="54" rx="8" ry="5" /></g>
    <path d="M4 66 Q22 60 34 50" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 7" fill="none" />
    <g transform="rotate(-24 52 38)"><path d="M26 38 Q26 33 32 33 H70 Q80 33 84 38 Q80 43 70 43 H32 Q26 43 26 38 Z" fill="#fbfdff" stroke="#9fb0c8" strokeWidth="1.4" />
      <path d="M50 35 L40 16 H47 L62 35 Z" fill="#3a7bd5" /><path d="M50 41 L40 60 H47 L62 41 Z" fill="#2f66b8" /><path d="M30 35 L24 25 H29 L36 35 Z" fill="#3a7bd5" />
      <g fill="#7fb3ff">{[44, 50, 56, 62, 68].map(x => <circle key={x} cx={x} cy="37" r="1.6" />)}</g><path d="M78 35.5 Q82 36.5 83 38 H77 Z" fill="#1d2340" /></g>
    {p !== 'any' ? <g transform="translate(6 40)"><PartnerIcon p={p} size={24} className="cd-badge" /></g> : <text x="18" y="70" textAnchor="middle" fontSize="11" fontWeight="900" fill="#1d2340" fontFamily="Kanit,sans-serif">ทุกสี</text>}</g>,
  // 🧾 ซื้อหุ้น: ใบซื้อหุ้น กราฟพุ่ง ตราประทับ ×3
  buy: () => <g><g transform="rotate(-6 46 40)"><rect x="18" y="4" width="54" height="66" rx="3" fill="#fbf7ee" stroke="#c9a24a" strokeWidth="2" /><rect x="22" y="8" width="46" height="58" rx="2" fill="none" stroke="#e3d3a4" strokeWidth="1" />
      <rect x="18" y="4" width="54" height="13" rx="3" fill="#1f3f8a" /><text x="45" y="14" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#fff" fontFamily="Kanit,sans-serif">ใบซื้อหุ้น</text>
      <path d="M26 46 L34 40 L41 43 L50 31 L58 34 L64 24" stroke="#2fa860" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M60 23 L65 23 L64 28" stroke="#2fa860" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <g stroke="#b9ae95" strokeWidth="1.8" strokeLinecap="round"><path d="M26 53 H56 M26 59 H48" /></g></g>
    <g transform="rotate(-16 70 54)"><circle cx="70" cy="54" r="14" fill="#fbf7ee" fillOpacity=".7" stroke="#d9434b" strokeWidth="3" /><circle cx="70" cy="54" r="10" fill="none" stroke="#d9434b" strokeWidth="1.3" /><text x="70" y="58" textAnchor="middle" fontSize="10" fontWeight="900" fill="#d9434b" fontFamily="Kanit,sans-serif">×3</text></g></g>,
};
export function DealCard({ id, t: t0, onClick, ok = true, sel, className = '' }) {
  const { t, p } = id ? cparse(id) : { t: t0, p: null }; const C = CARDS[t]; if (!C) return null;
  const title = id ? cardTitle(id) : C.n; const cls = 'dc dcard t-' + t + (ok ? ' ok' : ' dim') + (sel ? ' sel' : '') + (className ? ' ' + className : '');
  const style = PARTNERS[p] ? { '--pc': PARTNERS[p].c } : undefined;
  const inner = <><span className="dc-art"><CardImg k={t} fallback={<svg viewBox="0 0 100 76" aria-hidden="true">{CARD_ART[t](p || 'any')}</svg>} /></span><b>{title}</b><small>{t === 'clan' && PARTNERS[p] ? 'นั่งที่' + PARTNERS[p].n + 'ในดีลนี้เอง ใช้แล้วทิ้ง' : t === 'trip' && PARTNERS[p] ? 'ส่ง' + PARTNERS[p].n + 'ไปพักร้อน ที่นั่งว่างจนจบดีล' : t === 'trip' ? 'ส่งหุ้นส่วนสีไหนก็ได้ไปพักร้อน' : C.text}</small></>;
  return onClick ? <button type="button" className={cls} style={style} onClick={onClick}>{inner}</button> : <div className={cls} style={style}>{inner}</div>;
}
// สีประจำคนในดีล (แถบแบ่งส่วน)
const UCOL = ['#f5c451', '#3fbf7f', '#5aa9ff', '#ff7a90', '#b48cff', '#ffa24d'];
const DIE = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
// ฉากกลางกระดาน: ตึกสูงกรุงเทพฯ ยามค่ำ ไฟหน้าต่างกะพริบ
const Sky = () => <svg className="mid-sky" viewBox="0 0 200 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <circle cx="160" cy="36" r="14" fill="#ffe9a8" opacity=".7" />
  <g fill="#0b1230">{[[0, 120, 26], [24, 92, 22], [44, 130, 18], [60, 70, 26], [84, 104, 20], [102, 50, 22], [122, 96, 24], [144, 78, 20], [162, 116, 22], [182, 88, 18]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height={200 - y} />)}
    <path d="M110 50 L113 30 L116 50 Z" /></g>
  <g fill="#ffd76a">{Array.from({ length: 34 }, (_, i) => { const x = (i * 37) % 196 + 2, y = 60 + ((i * 53) % 130); return <rect key={i} className="win" x={x} y={y} width="3" height="4" opacity={0.25 + ((i * 7) % 5) / 8} />; })}</g>
</svg>;
function Board({ r, res, myId, av, nameOf, center }) {
  // หมวกเจ้าสัวเดินทีละช่อง
  const [shown, setShown] = useState(r.pos); const tm = useRef(null);
  useEffect(() => {
    clearInterval(tm.current); if (shown === r.pos) return;
    tm.current = setInterval(() => setShown(s => { const nx = (s + 1) % TILES; if (nx === r.pos) clearInterval(tm.current); return nx; }), 170);
    return () => clearInterval(tm.current);
  }, [r.pos]);
  const n = r.nego; const [pr, pc] = RING[shown];
  return <div className="db">
    {RING.map(([row, col], i) => {
      const di = r.tiles?.[i]; const D = di != null && di >= 0 ? DEALS[di] : null; const here = i === shown; const live = n && n.tile === i;
      return <div key={i} className={'dt' + (here ? ' here' : '') + (live ? ' live' : '') + (!D ? ' gone' : '') + (r.flash?.tile === i ? ' flash' : '')} style={{ gridRow: row + 1, gridColumn: col + 1 }}>
        {D ? <>
          <div className="dt-top"><span className="dt-e">{D.e}</span><b className="dt-v">{D.v}<small>M</small></b></div>
          <span className="dt-n">{D.n}</span>
          {D.need.length > 0 && <div className={'dt-need n' + D.need.length}>{D.need.map(p => <Dot key={p} p={p} off={live && !n.seats?.[p]} />)}</div>}
          {optOf(D).length > 0 && <div className={'dt-opt n' + optOf(D).length} title={`เลือก ${pickOf(D)} จาก ${optOf(D).length}`}><em data-n={pickOf(D)}>เลือก{pickOf(D)}</em>{optOf(D).map(p => <Dot key={p} p={p} off={live && !(n.chosen || []).includes(p)} />)}</div>}
        </> : <span className="dt-done">✅<small>ปิดแล้ว</small></span>}
        {r.flash?.tile === i && <span key={r.flash.at} className="dt-cash">💰</span>}
      </div>;
    })}
    <div className="db-mid"><Sky />{center}</div>
    {!res && <div className="db-pawn" style={{ left: `${2 + pc * (96 / GRID) + (96 / GRID) * 0.8}%`, top: `${2 + pr * (96 / GRID) + (96 / GRID) * 0.24}%` }}>🎩</div>}
  </div>;
}

// ---------- หน้าจอ ----------
export function DealGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack, srvNow }) {
  const r = room.round; const res = room.status === 'result' && room.result;
  const n = r.nego; const D = dealOf(r); const cur = curOf(r); const meIn = inGame(r, myId);
  const myTurn = !res && r.phase === 'turn' && cur === myId && meIn;
  const myHand = hand(r, myId); const parts = n ? partsOf(n) : []; const iBoss = n?.boss === myId; const iPart = parts.includes(myId) && !iBoss;
  const [pickCard, setPickCard] = useState(null);
  // เปิดดีลใหม่ → เด้งการ์ดตัวคูณให้ทุกคนเห็นว่าดีลนี้คุ้มแค่ไหน
  const [multFx, setMultFx] = useState(null); const multAt = useRef(r.nego?.start || 0);
  useEffect(() => { const N = r.nego; if (!N?.mult || N.start <= multAt.current) return; multAt.current = N.start; setMultFx({ deal: N.deal, mult: N.mult }); sfx(sound, 'reveal'); const t = setTimeout(() => setMultFx(null), 3800); return () => clearTimeout(t); }, [r.nego?.start]);
  const [flip, setFlip] = useState(null); const flipAt = useRef(r.lastPay?.at || 0);
  useEffect(() => { const L = r.lastPay; if (!L || L.at <= flipAt.current) return; flipAt.current = L.at; setFlip(L); const t = setTimeout(() => setFlip(null), 5200); return () => clearTimeout(t); }, [r.lastPay?.at]);
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c || c.status !== 'playing' || c.round?.kind !== 'deal') return; const R = c.round; R.hands = R.hands || {}; R.money = R.money || {}; R.ctrl = R.ctrl || {}; R.deck = R.deck || []; R.discard = R.discard || []; R.log = R.log || []; if (R.nego) R.nego.seats = R.nego.seats || {}; return f(c); });
  const nm = s => String(s).replace(/\{([^}]+)\}/g, (_, id) => nameOf(id));
  useEffect(() => { setPickCard(null); }, [r.phase, n?.boss, JSON.stringify(n?.seats || null), myHand.length]);
  // หมดเวลา
  const deadline = r.phase === 'turn' ? (r.at || 0) + (r.tmT || TURN_MS) : n?.closeAt || n?.until || 0; const secs = Math.max(0, Math.ceil((deadline - srvNow) / 1000));
  const due = !res && srvNow >= deadline; useEffect(() => { if (due) tx(c => dealTick(c, srvNow)); }, [due, r.turn, r.phase, n?.closeAt]);
  // คูลดาวน์การ์ด 2 วิ + นับถอยหลังปิดดีล 5 วิ (ใช้เวลาเซิร์ฟเวอร์ ทุกเครื่องเห็นตรงกัน)
  const [, setTick] = useState(0); const cdMs = Math.max(0, (r.cardAt || 0) + CARD_CD - srvNow); const closeMs = n?.closeAt ? Math.max(0, n.closeAt - srvNow) : 0;
  useEffect(() => { if (!cdMs && !closeMs) return; const t = setInterval(() => setTick(x => x + 1), 100); return () => clearInterval(t); }, [cdMs > 0, closeMs > 0]);
  const [offFx, setOffFx] = useState(null); const offAt = useRef(n?.closeOff || 0);
  useEffect(() => { const o = n?.closeOff; if (!o || o <= offAt.current) return; offAt.current = o; setOffFx(o); sfx(sound, 'lose'); const t = setTimeout(() => setOffFx(null), 1800); return () => clearTimeout(t); }, [n?.closeOff]);
  const closeSec = Math.ceil(closeMs / 1000); const lastBeep = useRef(0);
  useEffect(() => { if (closeSec > 0 && closeSec !== lastBeep.current) { lastBeep.current = closeSec; sfx(sound, 'click'); } if (!closeSec) lastBeep.current = 0; }, [closeSec]);
  // เสียง
  const prev = useRef(null);
  useEffect(() => {
    const s = { ph: r.phase, turn: r.turn, closed: r.closed || 0, log: (r.log || []).length, res: !!res, boss: n?.boss || '' }; const p = prev.current; prev.current = s; if (!p) return;
    if (s.res && !p.res) { sfx(sound, res.winner === myId ? 'win' : 'lose'); return; }
    if (s.closed > p.closed) sfx(sound, 'cash');
    else if (s.ph === 'nego' && p.ph !== 'nego') sfx(sound, 'roll');
    else if (s.log > p.log) sfx(sound, 'card');
    if ((s.turn !== p.turn || s.ph !== p.ph) && s.ph === 'turn' && cur === myId) setTimeout(() => sfx(sound, 'yourTurn'), 250);
  });

  useEffect(() => {
    const k = e => { if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName) || e.ctrlKey || e.metaKey || e.altKey) return; const key = e.key.toLowerCase();
      if (myTurn && key === 'o') { e.preventDefault(); sfx(sound, 'confirm'); tx(c => openDeal(c, myId, srvNow)); }
      else if (myTurn && key === 'r') { e.preventDefault(); sfx(sound, 'roll'); tx(c => rollDeal(c, myId, srvNow)); }
      else if (myTurn && key === 'd') { e.preventDefault(); sfx(sound, 'draw'); tx(c => drawTurn(c, myId, srvNow)); } };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  });
  const money = id => r.money?.[id] || 0;
  // ลงการ์ด → ป๊อปอัพเด้ง (กองทิ้งเพิ่ม = มีคนเพิ่งลงการ์ด • คนลง/ผลดูจากบันทึกล่าสุดที่มีชื่อคนทำ)
  const [cfx, setCfx] = useState(null); const fxN = useRef(r.fx?.n || 0);
  useEffect(() => {
    const F = r.fx; if (!F || (F.n || 0) <= fxN.current) return; fxN.current = F.n; const k = Date.now();
    setCfx({ k, card: F.card, by: F.by, nope: F.nope || null, text: F.text ? nm(F.text) : '' }); sfx(sound, 'slam');
    const tm = setTimeout(() => setCfx(c => (c?.k === k ? null : c)), 3000); return () => clearTimeout(tm);
  }, [r.fx?.n]);
  const endNums = r.endNums || []; const endLeft = (r.endDeck || []).length; const endOn = r.endFrom != null; const nextEnd = endOn ? END_EVERY - (((r.turns || 0) - r.endFrom) % END_EVERY) : null;
  const [endFx, setEndFx] = useState(null); const endAt = useRef(r.endFlip?.at || 0);
  useEffect(() => { const E = r.endFlip; if (!E || E.at <= endAt.current) return; endAt.current = E.at; const delay = r.lastPay?.at === E.at ? 5400 : 200; const t1 = setTimeout(() => { setEndFx(E); sfx(sound, 'reveal'); }, delay); const t2 = setTimeout(() => setEndFx(null), delay + 3200); return () => { clearTimeout(t1); clearTimeout(t2); }; }, [r.endFlip?.at]);
  const v = D?.v || 0; const mult = n?.mult || 0;
  const offer = n?.offer || {}; const ask = n?.ask || {}; const chosen = n?.chosen || [];
  const others = parts.filter(id => id !== n?.boss);
  const bossShare = v - others.reduce((a, id) => a + (offer[id] || 0), 0);
  const bump = (id, d) => { sfx(sound, 'click'); tx(c => bumpOffer(c, myId, id, d, srvNow)); };
  const askFor = w => { sfx(sound, 'select'); tx(c => askShare(c, myId, w, srvNow)); };
  // สถานะดีล: ① ทีมครบ → ② ทุกคนตกลง → ③ ปิดดีล
  const missing = n ? D.need.filter(p => !n.seats?.[p]) : []; const needPick = n ? Math.max(0, pickOf(D) - chosen.length) : 0;
  const teamOk = !!n && !missing.length && !needPick && chosen.every(p => n.seats?.[p]);
  const waitIds = others.filter(id => n?.ok?.[id] !== true); const ready = !!n && canClose(n);
  const step = !teamOk ? 1 : !ready ? 2 : 3;
  const myCand = !!n && !iBoss && !iPart && optOf(D).some(p => n.seats?.[p] === myId);
  const seatsOf = id => (n ? [...D.need, ...chosen].filter(p => n.seats?.[p] === id) : []);
  const colOf = id => UCOL[Math.max(0, parts.indexOf(id)) % UCOL.length];
  const myAmt = offer[myId] || 0;
  // เล่นการ์ด
  const buyN = myHand.filter(c => cparse(c).t === 'buy').length; const L = r.last;
  const tripOK = q => !!n && slotsOf(D).includes(q) && !!n.seats?.[q] && n.seats[q] !== myId;
  const fits = c => { const { t, p } = cparse(c); if (res || !meIn) return false;
    if (t === 'stop') return !!L && L.by !== myId; if (t === 'buy') return buyN >= BUY_N;
    if (r.phase !== 'nego') return false; if (t === 'boss') return !iBoss; if (t === 'trip') return p === 'any' ? slotsOf(D).some(tripOK) : tripOK(p);
    if (t === 'clan') return slotsOf(D).includes(p) && n.seats?.[p] !== myId; return false; };
  const usable = c => !cdMs && fits(c);
  const play = (c, arg) => { sfx(sound, 'card'); setPickCard(null); tx(x => playDealCard(x, myId, c, arg, srvNow)); };
  const tapCard = c => { const { t, p } = cparse(c);
    if (cdMs && fits(c)) { msg(`⏳ รออีก ${(cdMs / 1000).toFixed(1)} วิ ถึงเล่นการ์ดได้`); return; }
    if (!usable(c)) { msg(t === 'buy' ? (buyN < BUY_N ? `ซื้อหุ้นต้องมีครบ ${BUY_N} ใบ (ตอนนี้มี ${buyN})` : 'ยังซื้อหุ้นไม่ได้ตอนนี้') : t === 'stop' ? 'ยังไม่มีการ์ดให้ห้าม — ใช้ได้ทันทีหลังมีคนเล่น ข้าคุมเอง / พักร้อน' : t === 'trip' && r.phase === 'nego' ? 'หุ้นส่วนสีนี้ไม่ได้นั่งอยู่ในดีลนี้' : t === 'clan' && r.phase === 'nego' ? 'หุ้นส่วนสีนี้ไม่อยู่ในดีลนี้ หรือคุณนั่งอยู่แล้ว' : 'การ์ดนี้ใช้ได้ระหว่างเจรจาดีล'); return; }
    if ((t === 'trip' && p === 'any') || t === 'buy') { sfx(sound, 'select'); setPickCard(pickCard === c ? null : c); return; } play(c); };
  const pk = pickCard ? cparse(pickCard).t : null;
  const you = id => (id === myId ? 'คุณ' : nameOf(id));
  // กล่อง "ตอนนี้ต้องทำอะไร" ตามบทบาท
  const doBox = !n ? null : iBoss ? (step === 1 ? (missing.length
      ? <><b>⛔ ขาด{missing.map(p => PARTNERS[p].n).join(' / ')}</b><span>ไปพักร้อน — ใช้ 🛑 ห้าม! ทันที หรือลง 👥 คอนเนคชั่นสีนั้นเติมเอง (ใครมีก็ลงได้) หรือถอนตัว</span></>
      : <><b>① เลือกหุ้นส่วนเพิ่มอีก {needPick} ราย</b><span>แตะ “เลือก” ในกลุ่ม 🧩 ตัวเลือกด้านล่าง — ใครขอส่วนแบ่งน้อย เลือกคนนั้น</span></>)
    : step === 2 ? <><b>② แบ่งส่วน แล้วรอทุกคนกดตกลง</b><span>กด − / + ข้างชื่อ ปรับได้เลย ไม่ต้องกดส่ง • ยังรอ: {waitIds.map(you).join(', ')}</span></>
    : n.closeAt ? <><b>⏳ กำลังปิดดีล… {closeSec}</b><span>ถ้าไม่มีใครสวนการ์ด ดีลปิดเองเมื่อนับครบ</span></> : <><b>③ ทุกคนตกลงแล้ว! 🎉</b><span>กดปิดดีล → นับถอยหลัง {CLOSE_MS / 1000} วิ (ระหว่างนั้นคนอื่นสวนการ์ดได้)</span></>)
    : iPart ? (n.ok?.[myId] === true ? <><b>✅ คุณตกลงรับ <em>{myAmt} ส่วน</em> แล้ว</b><span>รอเจ้าของดีลกดปิดดีล</span></>
      : <><b>เจ้าของดีลให้คุณ <em>{myAmt} ส่วน</em></b><span>ได้ {fmtM(myAmt * mult)} (ส่วนละ {fmtM(mult)}){ask[myId] != null ? ` • คุณขอไป ${ask[myId]} ส่วน — รอเจ้าของดีลตอบ` : ''}</span></>)
    : myCand ? <><b>🙋 คุณเป็นหุ้นส่วนตัวเลือก</b><span>เจ้าของดีลยังไม่เลือกคุณ — เสนอขอส่วนน้อย ๆ เพื่อให้ถูกเลือก{ask[myId] != null ? ` (ตอนนี้ขอ ${ask[myId]} ส่วน)` : ''}</span></>
    : <><b>👀 คุณไม่ได้อยู่ในดีลนี้</b><span>แทรกได้ด้วยการ์ด: 🎩 ข้าคุมเอง • 🏖️ ส่งคนไปพักร้อน • 👥 ลงคอนเนคชั่นนั่งเอง • 🛑 ห้าม!</span></>;
  const doBtns = !n ? null : iBoss ? <>
      <button className={'primary wide ng-close' + (ready && !n.closeAt ? ' go' : '')} disabled={!ready || !!n.closeAt} onClick={() => { sfx(sound, 'confirm'); tx(c => closeDeal(c, myId, srvNow)); }}>{n.closeAt ? `⏳ ปิดดีลใน ${closeSec}…` : ready ? '🤝 ปิดดีลเลย!' : '🤝 ปิดดีล (ยังไม่ครบ)'}</button>
      <div className="ng-mini"><button className="secondary" disabled={!teamOk} onClick={() => bump(null, 'even')}>⚖️ แบ่งเท่า ๆ กัน</button><button className="secondary" onClick={() => { if (confirm('ถอนตัวจากดีลนี้? (ดีลล่ม)')) tx(c => cancelDeal(c, myId, srvNow)); }}>💨 ถอนตัว</button></div></>
    : iPart ? (n.ok?.[myId] === true
      ? <div className="ng-mini"><button className="secondary" onClick={() => askFor(myAmt + 1)}>🙏 เปลี่ยนใจ ขอ {myAmt + 1} ส่วน</button></div>
      : <div className="ng-btns"><button className="primary" onClick={() => { sfx(sound, 'confirm'); tx(c => answer(c, myId, true, srvNow)); }}>✅ ตกลง {myAmt} ส่วน</button><button className="secondary" disabled={Math.max(myAmt, ask[myId] || 0) >= v} onClick={() => askFor(Math.max(myAmt, ask[myId] || 0) + 1)}>🙏 ขอ {Math.max(myAmt, ask[myId] || 0) + 1} ส่วน</button></div>)
    : myCand ? <div className="ng-mini">{[1, 2, 3].filter(w => w < v).map(w => <button key={w} className={'secondary' + (ask[myId] === w ? ' on' : '')} onClick={() => askFor(w)}>🙋 ขอแค่ {w} ส่วน</button>)}</div>
    : null;

  const center = res ? <div className="mid-res">🏆<b>{nameOf(res.winner)}</b><small>รวยสุด {fmtM(money(res.winner))}</small></div>
    : r.phase === 'nego' ? <div className="mid-nego">{n.die ? <span className="mid-die">{DIE[n.die]}</span> : null}<span className="mid-e">{D.e}</span><b>{D.n}</b><small>{v} M × {mult} = {fmtM(v * mult)} • <Avatar id={n.boss} av={av} size={18} /> คุมดีล</small><TimerRing secs={secs} total={Math.round(NEGO_MS / 1000)} size={40} /></div>
      : <div className="mid-turn"><Avatar id={cur} av={av} size={38} /><b>{cur === myId ? 'ตาคุณ!' : `ตาของ ${nameOf(cur)}`}</b><small>ปิดดีลแล้ว {r.closed || 0}/{TILES}</small>{endNums.length > 0 && <small className="mid-end">🎴 ระวังเลข {endNums.join(' ')}</small>}<TimerRing secs={secs} total={(r.tmT || TURN_MS) / 1000} size={40} /></div>;

  return <div className="deal-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number} • ตาที่ {(r.turns || 0) + 1}</span><span className="cat-tag">💼 ปิดแล้ว {r.closed || 0}/{TILES}</span></div>
    <div className="gcols"><div className="gmain"><Board r={r} res={res} myId={myId} av={av} nameOf={nameOf} center={center} />
      {!res && closeMs > 0 && <div className="close-cd" key={n.closeAt}><small>🤝 {you(n.boss)} กำลังปิดดีล {D.e} {D.n}</small><b key={closeSec}>{closeSec}</b><span>{iBoss ? 'รอให้นับครบ… ถ้าโดนสวน ดีลยังไม่ปิด' : 'ใครจะสวน เล่นการ์ดเลย!'}</span></div>}
      {!res && offFx && <div className="close-cd off" key={'off' + offFx}><b>⛔</b><span>ยกเลิกปิดดีล!</span><small>มีคนสวน เงื่อนไขไม่ครบแล้ว</small></div>}{cfx && !res && <div key={cfx.k} className={'dfx' + (cfx.nope ? ' nope' : '')} onClick={() => setCfx(null)}><div className="dfx-cards">{cfx.nope && <div className="dfx-card dc-hand was"><DealCard id={cfx.nope} /><span className="dfx-stamp">ยกเลิก!</span></div>}<div className="dfx-card dc-hand"><DealCard id={cfx.card} /></div></div><span className="dfx-txt">{cfx.by === myId ? 'คุณ' : nameOf(cfx.by)} ใช้ “{cardTitle(cfx.card)}”!</span>{cfx.text && <span className="dfx-sub">{cfx.text}</span>}</div>}</div><div className="gside">

    {res && <>
      <Outcome art="win" tone={res.winner === myId ? 'good' : ''} title={`${nameOf(res.winner)} รวยที่สุด! 🏆`}>{res.why === 'number' && r.lastRoll ? <>🎴 {nameOf(r.lastRoll.by)} ทอยได้ {r.lastRoll.die} ตรงการ์ดจบเกม<br /></> : res.why === 'board' ? <>💼 ปิดดีลครบทุกช่องแล้ว<br /></> : res.why === 'limit' ? <>⏱️ ครบจำนวนตาสูงสุด<br /></> : ''}เงินรวม {fmtM(money(res.winner))} • ปิดดีลไป {r.closed || 0} ดีล</Outcome>
      <div className="money-row big">{(res.rank || []).map((id, i) => <span key={id}><em>{i + 1}</em><Avatar id={id} av={av} size={26} /> {nameOf(id)} <b>💰{fmtM(money(id))}</b></span>)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}

    {/* ตาของคุณ */}
    {myTurn && (() => { const di = tileDeal(r); const TD = di != null ? DEALS[di] : null; const warn = endNums.length ? `⚠️ ทอยได้ ${endNums.join(' / ')} = จบเกมทันที` : null;
      const openBtn = TD && <button className={r.rolled ? 'primary big-roll' : 'secondary'} onClick={() => { sfx(sound, 'confirm'); tx(c => openDeal(c, myId, srvNow)); }}>💼 เปิดดีล{r.rolled ? 'ช่องนี้' : 'ช่องที่ยืนอยู่'}<small>{TD.e} {TD.n} • {TD.v} M{r.rolled ? '' : ' (ไม่ทอย ไม่จั่ว)'}</small></button>;
      const drawBtn = <button className="secondary" onClick={() => { sfx(sound, 'draw'); tx(c => drawTurn(c, myId, srvNow)); }}>🃏 จั่วการ์ด {DRAW_N} ใบ<small>แล้วจบตา</small></button>;
      return <div className="turn-acts">{r.rolled ? <>{openBtn}{drawBtn}{!TD && <p className="kbd-hint">ช่องนี้ปิดดีลไปแล้ว — จั่วการ์ดจบตา</p>}<p className="kbd-hint">⌨️ กด {TD && <><kbd>O</kbd> เปิดดีล • </>}<kbd>D</kbd> จั่ว</p></>
        : <><button className="primary big-roll" onClick={() => { sfx(sound, 'roll'); tx(c => rollDeal(c, myId, srvNow)); }}>🎲 ทอยเต๋าเดิน<small>{warn || 'หยุดแล้วค่อยเลือก เปิดดีล หรือ จั่วการ์ด'}</small></button>{openBtn}{drawBtn}<p className="kbd-hint">⌨️ กด <kbd>R</kbd> ทอย{TD && <> • <kbd>O</kbd> เปิดดีลช่องนี้</>} • <kbd>D</kbd> จั่ว</p></>}</div>; })()}
    {!res && r.phase === 'turn' && !myTurn && <div className="waiting">⏳ รอ {nameOf(cur)} {r.rolled ? 'เลือกเปิดดีลหรือจั่วการ์ด' : 'เลือก ทอยเต๋า / เปิดดีลช่องเดิม / จั่วการ์ด'}… ({secs} วิ)</div>}

    {/* เจรจา: บอกชัด ๆ ว่าตอนนี้ต้องทำอะไร แล้วค่อยเป็นรายชื่อคนในดีล */}
    {!res && r.phase === 'nego' && <div className={'nego2' + (iBoss ? ' boss' : iPart ? ' part' : myCand ? ' cand' : '')}>
      <div className="ng-top"><span className="nego-e">{D.e}</span><div><b>{D.n} <span className="ng-x">{v} M × {mult}</span></b><small>💰 รวม {fmtM(v * mult)} • แบ่ง {v} ส่วน ส่วนละ {fmtM(mult)} • 🎩 {you(n.boss)} คุมดีล</small></div><TimerRing secs={secs} total={Math.round(NEGO_MS / 1000)} size={44} /></div>
      <ol className="ng-steps">{['ทีมครบ', 'ทุกคนตกลง', 'ปิดดีล'].map((s, i) => <li key={s} className={step > i + 1 ? 'done' : step === i + 1 ? 'now' : ''}>{step > i + 1 ? '✓' : i + 1} {s}</li>)}</ol>
      <div className="ng-do">{doBox}{doBtns}</div>

      <div className="ng-h">👥 คนในดีล — แบ่ง {v} ส่วน <small>(ส่วนละ {fmtM(mult)})</small></div>
      <div className="ng-bar" aria-hidden="true">{parts.flatMap(id => Array.from({ length: Math.max(0, id === n.boss ? bossShare : offer[id] || 0) }, (_, i) => <i key={id + i} style={{ background: colOf(id) }} />))}</div>
      <div className="ng-people">{parts.map(id => { const isB = id === n.boss; const amt = isB ? bossShare : offer[id] || 0; const a = ask[id];
        const st = isB ? <span className="ng-st boss">🎩 เจ้าของดีล • ได้ส่วนที่เหลือ</span>
          : n.ok?.[id] === true ? <span className="ng-st ok">✅ ตกลงแล้ว</span>
          : a != null ? <span className="ng-st ask">🙏 ขอ {a} ส่วน{iBoss && <button type="button" onClick={() => bump(id, 'ask')}>ให้</button>}</span>
          : n.ok?.[id] === false ? <span className="ng-st no">❌ ยังไม่เอา</span> : <span className="ng-st">⏳ รอตอบ</span>;
        return <div key={id} className={'ng-p' + (id === myId ? ' me' : '')} style={{ '--uc': colOf(id) }}><Avatar id={id} av={av} size={30} />
          <span className="ng-n"><b>{you(id)}</b><span>{seatsOf(id).map(p => <Dot key={p} p={p} size={16} />)}{st}</span></span>
          <span className="ng-amt">{iBoss && !isB && <button type="button" className="of-btn" disabled={amt <= 0} onClick={() => bump(id, -1)}>−</button>}<b>{amt}<small>ส่วน</small></b>{iBoss && !isB && <button type="button" className="of-btn" disabled={bossShare <= 0} onClick={() => bump(id, 1)}>+</button>}</span></div>; })}
        {missing.map(p => <div key={p} className="ng-miss" style={{ '--pc': PARTNERS[p].c }}><Dot p={p} size={20} off /> 🏖️ {PARTNERS[p].n} ถูก {you(n.away?.[p])} ส่งไปพักร้อน — แก้ได้ด้วย 🛑 ห้าม! หรือ 👥 คอนเนคชั่น{PARTNERS[p].n}</div>)}
      </div>

      {optOf(D).length > 0 && <>
        <div className="ng-h">🧩 ตัวเลือก — เลือก {pickOf(D)} จาก {optOf(D).length} ราย <small>(เลือกแล้ว {chosen.length}/{pickOf(D)})</small></div>
        <div className="ng-cgrid">{optOf(D).map(p => { const who = n.seats?.[p]; const ch = chosen.includes(p); const a = who ? ask[who] : null;
          return <div key={p} className={'ng-c' + (ch ? ' on' : '') + (who ? '' : ' empty')} style={{ '--pc': PARTNERS[p].c }}><Dot p={p} size={24} off={!who} />
            <span><b>{PARTNERS[p].n}</b><small>{who ? <>{you(who)}{n.clan?.[p]?.by === who ? ' 🤝' : ''}</> : n.away?.[p] ? '🏖️ พักร้อน' : '⛔ ว่าง'}</small>{a != null && !ch && <em>🙋 ขอแค่ {a} ส่วน</em>}</span>
            {iBoss && who ? <button type="button" className={'opt-btn' + (ch ? ' on' : '')} disabled={!ch && !needPick} onClick={() => { sfx(sound, 'select'); tx(c => chooseOpt(c, myId, p, srvNow)); }}>{ch ? '✓ เอาออก' : 'เลือก'}</button>
              : <span className="opt-st">{ch ? '✓ ในดีล' : ''}</span>}</div>; })}</div>
      </>}
    </div>}

    {/* การ์ดในมือ */}
    {!res && meIn && <>
      <SecH icon="🃏">การ์ดในมือ <small>{myHand.length}/{HAND_MAX} ใบ • {cdMs ? `⏳ รอ ${(cdMs / 1000).toFixed(1)} วิ ถึงเล่นการ์ดได้` : r.phase === 'nego' ? 'ใบที่สว่างใช้ได้ตอนนี้ แตะเพื่อใช้' : 'ใช้ได้ตอนมีคนเจรจาดีล (ซื้อหุ้นใช้ได้ทุกเมื่อ)'}{buyN > 0 && ` • 🧾 ซื้อหุ้น ${buyN}/${BUY_N}`}</small></SecH>
      <div className={'dc-hand' + (cdMs ? ' cd' : '')}>{cdMs > 0 && <span className="cd-badge-t">⏳ {(cdMs / 1000).toFixed(1)}</span>}{myHand.map(c => <DealCard key={c} id={c} ok={usable(c)} sel={pickCard === c} onClick={() => tapCard(c)} />)}
        {!myHand.length && <p className="hint">ไม่มีการ์ด — จั่วได้ตอนถึงตา</p>}</div>
      {pk === 'trip' && <div className="act-box"><b>🏖️ ส่งหุ้นส่วนรายไหนไปพักร้อน?</b><div className="pick-p">{D && slotsOf(D).filter(tripOK).map(p => <button type="button" key={p} style={{ '--pc': PARTNERS[p].c }} onClick={() => play(pickCard, p)}><Dot p={p} size={24} />{PARTNERS[p].n}<small>{nameOf(n.seats[p])}</small></button>)}</div></div>}
      {pk === 'buy' && <div className="act-box"><b>🧾 ใช้ซื้อหุ้น ×{BUY_N} ยึดหุ้นส่วนรายไหน?</b><div className="pick-p">{PK.filter(p => r.ctrl[p] !== myId).map(p => <button type="button" key={p} style={{ '--pc': PARTNERS[p].c }} onClick={() => { if (confirm(`ใช้ซื้อหุ้น ${BUY_N} ใบ ยึด${PARTNERS[p].n}ต่อจาก ${nameOf(r.ctrl[p])}?`)) play(pickCard, p); }}><Dot p={p} size={24} />{PARTNERS[p].n}<small>{nameOf(r.ctrl[p])}</small></button>)}</div></div>}
    </>}

    {/* หุ้นส่วน: ใครคุมใคร + เงิน + การ์ดจบเกม */}
    {!res && <div className="end-row"><span className="er-h">🎴 การ์ดจบเกม</span><span className="er-cards">{endNums.length ? endNums.map(x => <b key={x} className="end-card">{x}</b>) : <em>ยังไม่เปิด</em>}</span><small>{!endOn ? `เริ่มเปิดเมื่อปิดดีลครบ ${END_START} ดีล (ตอนนี้ ${Math.min(r.closed || 0, END_START)}/${END_START}) แล้วเปิดทุก ${END_EVERY} ตา` : <>{endNums.length ? `ทอยได้ ${endNums.join(' / ')} = จบเกม` : 'ทอยได้เลขบนการ์ด = จบเกม'} • {endLeft ? `ใบใหม่ในอีก ${nextEnd} ตา` : 'เปิดครบแล้ว'}</>}</small></div>}
    <SecH icon="💼">ใครคุมหุ้นส่วนไหน</SecH>
    <div className="ctrl-row">{PK.map(p => <span key={p} className={'ctrl-chip' + (r.ctrl[p] === myId ? ' mine' : '')} style={{ '--pc': PARTNERS[p].c }}><Dot p={p} size={22} /><span><b>{PARTNERS[p].n}</b><small><Avatar id={r.ctrl[p]} av={av} size={16} /> {you(r.ctrl[p])}</small></span></span>)}</div>
    {!res && <div className="money-row live">{[...r.order].sort((a, b) => money(b) - money(a)).map((id, i, L) => { const top = money(id) > 0 && money(id) === money(L[0]); return <span key={id} className={(id === cur ? 'cur ' : '') + (r.out?.[id] ? 'out ' : '') + (top ? 'top' : '')}><em>{top ? '👑' : i + 1}</em><Avatar id={id} av={av} size={30} /><span className="mr-n">{you(id)}<small>🃏{hand(r, id).length}</small></span><b>💰{fmtM(money(id))}</b></span>; })}</div>}

    {isHost && !res && (cur !== myId || r.phase === 'nego' || r.order.some(id => inGame(r, id) && !room.players?.[id])) && <HostBar>
      <button className="secondary" onClick={() => { if (confirm(r.phase === 'nego' ? 'จบการเจรจานี้เลย (ดีลล่ม)?' : `ให้ ${nameOf(cur)} จั่วการ์ดแล้วข้ามตา?`)) tx(c => forceDeal(c, srvNow)); }}>⏭️ {r.phase === 'nego' ? 'จบเจรจา' : `ข้ามตา ${nameOf(cur)}`}</button>
      {r.order.filter(id => inGame(r, id) && !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickDeal(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}</HostBar>}
    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...(r.log || [])].reverse().slice(0, 8).map((e, i) => <li key={i} className={e.win ? 'win-line' : ''}>{nm(e.text)}</li>)}</ul>
    {endFx && !res && <div className="pay-fx end-fx" onClick={() => setEndFx(null)}><div className="pay-box"><span className="pay-deal">🎴 เปิดการ์ดจบเกมใบใหม่!</span><div className="money-card"><div className="mc-in"><div className="mc-back">🎴</div><div className="mc-front end"><small>การ์ดจบเกม</small><b>{endFx.n}</b><em>ทอยได้เลขนี้ = จบ</em></div></div></div><span className="end-now">ตอนนี้ทอยได้ {endNums.join(' / ')} เกมจบทันที</span><small className="pay-close">แตะเพื่อปิด</small></div></div>}
    {multFx && !flip && !res && <div className="pay-fx" onClick={() => setMultFx(null)}><div className="pay-box">
      <span className="pay-deal">{DEALS[multFx.deal].e} {DEALS[multFx.deal].n} — {DEALS[multFx.deal].v} M</span>
      <div className="money-card"><div className="mc-in"><div className="mc-back">🎴</div><div className="mc-front"><small>ตัวคูณดีลนี้</small><b>×{multFx.mult}</b><em>ส่วนละ {fmtM(multFx.mult)}</em></div></div></div>
      <span className="end-now">💰 ดีลนี้รวม {fmtM(DEALS[multFx.deal].v * multFx.mult)}{multFx.mult >= 4 ? ' — ดีลใหญ่! คุ้มทุ่มการ์ด 🔥' : multFx.mult <= 1 ? ' — ดีลเล็ก ไม่ต้องลงทุนเยอะ' : ''}</span>
      <small className="pay-close">แตะเพื่อปิด</small></div></div>}
    {flip && <div className="pay-fx" onClick={() => setFlip(null)}><div className="pay-box">
      <span className="pay-deal">{DEALS[flip.deal].e} {DEALS[flip.deal].n} ปิดดีลแล้ว! ({flip.x} M × {flip.card})</span>
      <div className="money-card"><div className="mc-in"><div className="mc-back">💵</div><div className="mc-front"><small>ตัวคูณ</small><b>×{flip.card}</b><em>ส่วนละ {fmtM(flip.card)}</em></div></div></div>
      <ul className="pay-list">{Object.entries(flip.pay || {}).sort((a, b) => b[1] - a[1]).map(([id, v], i) => <li key={id} style={{ animationDelay: 1.3 + i * 0.25 + 's' }}><Avatar id={id} av={av} size={24} /><span className="pn">{id === myId ? 'คุณ' : nameOf(id)}</span><small>{Math.round(v / flip.card)} ส่วน × {fmtM(flip.card)}</small><b>+{fmtM(v)}</b></li>)}</ul>
      <small className="pay-close">แตะเพื่อปิด</small></div></div>}
    </div></div>
  </div>;
}

// ---------- ห้องรอ ----------
export function DealLobby({ n }) {
  const k = Math.max(DEAL_MIN, Math.min(DEAL_MAX, n)); const per = Math.ceil(PK.length / k);
  return <>
    <div className="score-rules"><b>💼 หุ้นส่วน 6 ราย แจกให้แต่ละคนคุม (วงนี้คนละ {per === 1 ? '1' : `${Math.floor(PK.length / k)}–${per}`} ราย)</b>
      <div className="ctrl-row lobby">{PK.map(p => <span key={p} className="ctrl-chip" style={{ '--pc': PARTNERS[p].c }}><Dot p={p} size={22} /><b>{PARTNERS[p].n}</b></span>)}</div>
      <span>🎲 ตาคุณเลือกได้ 3 ทาง: 💼 เปิดดีลช่องที่หมวกเจ้าสัวยืนอยู่เลย (ไม่ทอย ไม่จั่ว) • 🎲 ทอยเต๋าเดิน แล้วเลือกเปิดดีลช่องใหม่ หรือจั่วการ์ด {DRAW_N} ใบ (ทอยแล้วไม่ชอบดีลก็จั่วได้) • 🃏 จั่วการ์ด {DRAW_N} ใบจบตาเลย</span>
      <span>🔒 ช่องดีลแถวบน = หุ้นส่วนจำเป็น • 🧩 แถวล่าง (ป้าย “เลือก 2”) = กลุ่มตัวเลือก เจ้าของดีลเลือกเองว่าจะเอาใคร — หุ้นส่วนตัวเลือกเลยต้องแข่งกันยอมรับส่วนแบ่ง</span>
      <span>💵 ตัวเลขบนช่องคือเงินฐาน N M = ดีลนี้แบ่งได้ N ส่วน (ดีลใหญ่ใช้หุ้นส่วนเยอะ เงินฐานสูง)</span>
      <span>🤝 เจ้าของดีลเสนอแบ่งส่วน ทุกคนในดีลกดตกลงครบ → ปิดดีล รับเงินตามส่วน</span>
      <span>🎴 ทันทีที่เปิดดีล จะเปิดการ์ดตัวคูณ ×1–×5 ให้ทุกคนเห็น → รู้เลยว่าดีลนี้รวมกี่ M (ส่วนละ ×N M) ดีลใหญ่ค่อยทุ่มการ์ด ดีลเล็กไม่ต้องลงทุนเยอะ</span>
      <span>🎴 ปิดดีลครบ {END_START} ดีลแล้ว ทุก {END_EVERY} ตาเปิดการ์ดจบเกม 1 ใบ (เลข 1–6) — ใครทอยเต๋าได้เลขที่เปิดอยู่ เกมจบทันที • หรือปิดดีลครบทุกช่องก็จบ • ใครรวยสุดชนะ</span>
      <span>⏱️ เจรจา {NEGO_MS / 1000} วิ (เล่นการ์ดต่อเวลาได้) ไม่จบ = ดีลล่ม</span></div>
    <div className="dc-hand lobby">{['boss-x', 'stop-x', 'trip_media-x', 'trip_any-x', 'clan_bank-x', 'buy-x'].map(id => <DealCard key={id} id={id} />)}</div>
    <div className="score-rules"><span>🃏 เริ่ม {HAND0} ใบ • เลือกจั่วได้ {DRAW_N} ใบ • ถือได้สูงสุด {HAND_MAX} ใบ • เล่นการ์ดแล้ว ทุกคนต้องรอ {CARD_CD / 1000} วิ ถึงเล่นใบต่อไปได้</span><span>⏳ เจ้าของดีลกดปิดดีลแล้ว นับถอยหลัง {CLOSE_MS / 1000} วิ — ระหว่างนั้นใครสวนการ์ดจนเงื่อนไขไม่ครบ ดีลยังไม่ปิด</span></div>
  </>;
}
