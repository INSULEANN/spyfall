// เกม "ปิดดีล!" — เกมเจรจาธุรกิจ: เดินหมวกเจ้าสัวไปเจอดีล เจ้าของดีลต้องรวบรวมหุ้นส่วนให้ครบแล้วตกลงแบ่งเงินกัน
// ระหว่างเจรจาใครก็เล่นการ์ดขัดขาได้: แย่งเป็นเจ้าของดีล • กันหุ้นส่วน • เด็กเส้นเข้าดีลแทน • ซื้อกิจการ
// (กลไกแนวเกมเจรจาที่มีอยู่ทั่วไป แต่ชื่อ ดีล ภาพ ธีมเป็นของเราเองทั้งหมด)
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint } from './rand.js';
import { Avatar, HostBar, SecH, Outcome, Leaderboard, TimerRing } from './ui.jsx';
import './deal.css';

export const DEAL_MIN = 3, DEAL_MAX = 6;
export const DEAL_SCORE = { win: 3, second: 1 };
export const TURN_MS = 30000, NEGO_MS = 90000, NEGO_CAP = 180000, TILES = 16, GOAL = TILES, END_EVERY = 5, END_START = 5, HAND0 = 3, HAND_MAX = 8;
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
// การ์ดเงิน: ล้านต่อส่วน (สุ่มเปิดตอนปิดดีล แล้วคูณกับจำนวนส่วนของแต่ละคน)
export const MONEY = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5];
export const CARDS = {
  boss: { n: 'ดีลนี้ข้าคุม!', e: '🎩', text: 'แย่งเป็นเจ้าของดีลที่กำลังเจรจาอยู่' },
  stop: { n: 'หยุดก่อน!', e: '✋', text: 'กันหุ้นส่วน 1 ราย ไม่ให้เข้าดีลนี้' },
  link: { n: 'เด็กเส้น', e: '🤝', text: 'เข้าดีลแทนหุ้นส่วนรายนี้เอง (หรือเติมที่ที่ถูกกัน)' },
  take: { n: 'ซื้อกิจการ', e: '📝', text: 'ยึดหุ้นส่วน 1 รายมาเป็นของคุณถาวร' },
};
export const DECK_PLAN = { boss: 8, stop: 14, link: 3, take: 4 }; // link = ต่อหุ้นส่วน 1 ราย
// รหัสการ์ด: boss-3, stop-12, link_bank-20, take-40
export const cparse = id => { const b = String(id).split('-')[0]; return b.startsWith('link_') ? { t: 'link', p: b.slice(5) } : { t: b, p: null }; };
export const cardTitle = id => { const { t, p } = cparse(id); return t === 'link' ? `${CARDS.link.n}${PARTNERS[p]?.n || ''}` : CARDS[t]?.n || t; };

// ---------- จัดเกม ----------
export function makeDealRound(ids, opts = {}, number = 1, t0 = Date.now()) {
  const order = shuffle(ids); const ctrl = {}; shuffle(PK).forEach((p, i) => { ctrl[p] = order[i % order.length]; });
  const di = shuffle(DEALS.map((_, i) => i));
  const deck = []; let k = 0; const add = (b, n) => { for (let i = 0; i < n; i++) deck.push(`${b}-${k++}`); };
  add('boss', DECK_PLAN.boss); add('stop', DECK_PLAN.stop); add('take', DECK_PLAN.take); PK.forEach(p => add('link_' + p, DECK_PLAN.link));
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
    if (!(r.deck || []).length) { if (!(r.discard || []).length) return; r.deck = shuffle(r.discard); r.discard = []; }
    const d = [...r.deck]; r.hands[id] = [...hand(r, id), d.shift()]; r.deck = d;
  }
  const h = hand(r, id); if (h.length > HAND_MAX) { r.discard = [...(r.discard || []), ...h.slice(0, h.length - HAND_MAX)]; r.hands[id] = h.slice(-HAND_MAX); }
}
export const dealOf = r => (r.nego ? DEALS[r.nego.deal] : null);
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
  const r = cur.round; r.nego = null; r.phase = 'turn'; r.at = now; r.turns = (r.turns || 0) + 1;
  if (boardDone(r)) return finish(cur, 'board');
  if (r.turns >= r.order.length * 15) return finish(cur, 'limit');
  const since = r.endFrom != null ? r.turns - r.endFrom : 0;
  if (r.endFrom != null && since > 0 && since % END_EVERY === 0 && (r.endDeck || []).length) { const d = [...r.endDeck]; const x = d.shift(); r.endDeck = d; r.endNums = [...(r.endNums || []), x]; r.endFlip = { n: x, at: now }; say(r, `🎴 เปิดการ์ดจบเกม: เลข ${x} — ตั้งแต่นี้ใครทอยได้ ${(r.endNums || []).join(', ')} เกมจบทันที!`, { end: true }); }
  const n = r.order.length; for (let i = 1; i <= n; i++) { const k = (r.turn + i) % n; if (inGame(r, r.order[k])) { r.turn = k; break; } }
  return cur;
}

// ตาของคุณ: ทอยเต๋าเดินหมวกเจ้าสัว แล้วเปิดเจรจาดีลที่หยุด
export function rollDeal(cur, me, now, die = 1 + rint(6)) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'turn' || curOf(r) !== me) return;
  r.lastRoll = { by: me, die, at: now };
  if ((r.endNums || []).includes(die)) { say(r, `🎴 {${me}} ทอยได้ ${die} ตรงการ์ดจบเกม — เกมจบ!`, { by: me, act: `🎲 ${die} จบเกม!`, end: true }); return finish(cur, 'number'); }
  r.pos = (r.pos + die) % TILES; const di = r.tiles[r.pos];
  if (di == null || di < 0) { say(r, `🎲 {${me}} ทอยได้ ${die} — ช่องนี้ปิดดีลไปแล้ว`, { by: me, act: `🎲 ${die}` }); draw(r, me, 1); return nextTurn(cur, now); }
  const D = DEALS[di]; const seats = {}; slotsOf(D).forEach(p => { seats[p] = inGame(r, r.ctrl[p]) ? r.ctrl[p] : null; });
  const chosen = optOf(D).filter(p => seats[p] === me).slice(0, pickOf(D));
  r.phase = 'nego'; r.nego = { tile: r.pos, deal: di, boss: me, roller: me, seats, chosen, blocked: null, offer: null, ok: null, die, start: now, until: now + NEGO_MS };
  r.nego.offer = defOffer(r);
  say(r, `🎲 {${me}} ทอยได้ ${die} เจอดีล ${D.e} ${D.n} (×${D.v})`, { by: me, act: `🎲 ${die}` });
  return cur;
}
// จั่วการ์ด 2 ใบแล้วจบตา
export function drawTurn(cur, me, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'turn' || curOf(r) !== me) return;
  draw(r, me, 2); say(r, `🃏 {${me}} จั่วการ์ด 2 ใบ`, { by: me, act: '🃏 +2' }); return nextTurn(cur, now);
}
// เจ้าของดีลปรับข้อเสนอ: others = {id: จำนวนส่วน} ของทุกคนในดีลยกเว้นตัวเอง (ตัวเองได้ที่เหลือ)
export function setOffer(cur, me, others, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss !== me) return;
  const v = DEALS[n.deal].v; const ps = partsOf(n).filter(id => id !== me); const o = {}; let sum = 0;
  for (const id of ps) { const x = Math.floor(+others?.[id] || 0); if (x < 0) return; o[id] = x; sum += x; }
  if (sum > v) return; o[me] = v - sum; applyOffer(n, o); return cur;
}
// เจ้าของดีลกด − / + ทีละส่วน (ส่งทันที) • d = 'ask' ให้ตามที่คนนั้นขอ • d = 'even' แบ่งเท่า ๆ กัน
export function bumpOffer(cur, me, id, d, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss !== me) return;
  if (d === 'even') { applyOffer(n, defOffer(r)); return cur; }
  if (id === me || !partsOf(n).includes(id)) return;
  const v = DEALS[n.deal].v; const others = partsOf(n).filter(x => x !== me); const o = {}; others.forEach(x => { o[x] = Math.max(0, n.offer?.[x] || 0); });
  const left = v - others.reduce((a, x) => a + o[x], 0); const was = o[id];
  const nv = d === 'ask' ? Math.min(n.ask?.[id] ?? was, was + left) : Math.max(0, Math.min(was + (+d || 0), was + left));
  if (nv === was && d !== 'ask') return;
  o[id] = nv; o[me] = v - others.reduce((a, x) => a + o[x], 0); applyOffer(n, o); return cur;
}
// คนที่ถือที่นั่งในดีล (ทั้งตัวจริงและตัวเลือก) ขอส่วนแบ่ง N ส่วน → เจ้าของดีลกด "ให้" ได้ทันที
export function askShare(cur, me, want, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss === me) return;
  const D = DEALS[n.deal]; if (!slotsOf(D).some(p => n.seats?.[p] === me)) return;
  const w = Math.max(0, Math.min(D.v, Math.floor(+want || 0))); const inDeal = partsOf(n).includes(me);
  n.ask = { ...(n.ask || {}), [me]: w }; if (n.ok?.[me] === true) n.ok = { ...n.ok, [me]: false };
  say(r, inDeal ? `🙏 {${me}} ขอ ${w} ส่วน` : `🙋 {${me}} เสนอตัว ขอแค่ ${w} ส่วน`, { by: me, act: inDeal ? `🙏 ขอ ${w} ส่วน` : `🙋 ขอแค่ ${w} ส่วน` });
  return cur;
}
// คนในดีลตอบรับ/ปฏิเสธข้อเสนอ
export function answer(cur, me, yes, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || me === n.boss || !partsOf(n).includes(me)) return;
  if (yes && n.ask?.[me] != null) { const a = { ...n.ask }; delete a[me]; n.ask = Object.keys(a).length ? a : null; }
  n.ok = { ...(n.ok || {}), [me]: !!yes }; say(r, `${yes ? '✅' : '❌'} {${me}} ${yes ? 'ตกลง' : 'ไม่เอา'} (${n.offer?.[me] || 0} ส่วน)`, { by: me, act: yes ? '✅ ตกลง!' : '❌ ไม่เอา!' }); return cur;
}
export const canClose = n => { if (!n) return false; const D = DEALS[n.deal]; const ch = n.chosen || []; return D.need.every(p => n.seats?.[p]) && ch.length === pickOf(D) && ch.every(p => n.seats?.[p]) && partsOf(n).filter(id => id !== n.boss).every(id => n.ok?.[id] === true); };
// เจ้าของดีลเลือก/เอาออก หุ้นส่วนตัวเลือก (ครบ pick ราย ถึงปิดดีลได้)
export function chooseOpt(cur, me, p, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss !== me) return;
  const D = DEALS[n.deal]; if (!optOf(D).includes(p)) return; const ch = n.chosen || [];
  if (ch.includes(p)) { n.chosen = ch.filter(x => x !== p); say(r, `🧩 {${me}} เอา${PARTNERS[p].n}ออกจากดีล`, { by: me, act: `➖ ${PARTNERS[p].n}` }); }
  else { if (!n.seats?.[p] || ch.length >= pickOf(D)) return; n.chosen = [...ch, p]; say(r, `🧩 {${me}} เลือก${PARTNERS[p].n} ({${n.seats[p]}}) เข้าดีล`, { by: me, act: `➕ ${PARTNERS[p].n}` }); }
  touch(r, now); return cur;
}
// เจ้าของดีลกดปิดดีล (ทุกที่นั่งครบ + ทุกคนตกลงแล้ว)
export function closeDeal(cur, me, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss !== me || !canClose(n)) return;
  const D = DEALS[n.deal]; let md = [...(r.mdeck || [])]; if (!md.length) md = shuffle([...MONEY]); const card = md.shift(); r.mdeck = md;
  const pay = {}; Object.entries(n.offer || {}).forEach(([id, x]) => { pay[id] = x * card; r.money[id] = (r.money?.[id] || 0) + x * card; });
  r.lastPay = { deal: n.deal, card, x: D.v, pay, at: now };
  say(r, `🤝 {${me}} ปิดดีล ${D.e} ${D.n}! เปิดการ์ดเงิน 💵 ${card} ล้าน/ส่วน → ${partsOf(n).map(id => `{${id}} ${n.offer[id]} ส่วน = ${pay[id] ?? 0} ล้าน`).join(' • ')}`, { by: me, act: `💵 ${card} ล้าน/ส่วน!`, win: true });
  r.done = [...(r.done || []), { deal: n.deal, boss: me, offer: n.offer, card }]; r.closed = (r.closed || 0) + 1;
  if (r.closed >= END_START && r.endFrom == null) { r.endFrom = r.turns || 0; say(r, `🎴 ปิดดีลครบ ${END_START} ดีลแล้ว! เริ่มนับการ์ดจบเกม — อีก ${END_EVERY} ตาเปิดใบแรก`, { end: true }); }
  r.tiles[n.tile] = -1;
  r.flash = { tile: n.tile, at: now };
  return nextTurn(cur, now);
}
function failDeal(cur, now, why) {
  const r = cur.round; const n = r.nego; const D = DEALS[n.deal];
  say(r, `💨 ดีล ${D.e} ${D.n} ล่ม${why ? ` — ${why}` : ''} • {${n.roller}} ได้การ์ดปลอบใจ 1 ใบ`, { by: n.boss, act: '💨 ดีลล่ม' });
  if (inGame(r, n.roller)) draw(r, n.roller, 1);
  return nextTurn(cur, now);
}
export function cancelDeal(cur, me, now) { const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'nego' || r.nego.boss !== me) return; return failDeal(cur, now, 'เจ้าของดีลถอนตัว'); }
// เล่นการ์ด: boss/stop/link ใช้ระหว่างเจรจา • take ใช้ระหว่างเจรจา หรือตอนถึงตาตัวเอง
export function playDealCard(cur, me, card, arg, now) {
  const r = cur.round; if (cur.status !== 'playing' || !inGame(r, me) || !hand(r, me).includes(card)) return;
  const { t, p } = cparse(card); const n = r.nego; const nego = r.phase === 'nego';
  if (t === 'boss') { if (!nego || n.boss === me) return; n.boss = me; say(r, `🎩 {${me}} “ดีลนี้ข้าคุม!” แย่งเป็นเจ้าของดีล`, { by: me, act: '🎩 ข้าคุมเอง!' }); }
  else if (t === 'stop') { if (!nego || !slotsOf(DEALS[n.deal]).includes(arg) || !n.seats?.[arg]) return; const was = n.seats[arg]; n.seats[arg] = null; n.blocked = { ...(n.blocked || {}), [arg]: me }; n.chosen = (n.chosen || []).filter(x => x !== arg); say(r, `✋ {${me}} กัน${PARTNERS[arg].n} ${PARTNERS[arg].e} ({${was}}) ออกจากดีล`, { by: me, act: `✋ หยุด${PARTNERS[arg].n}!` }); }
  else if (t === 'link') { if (!nego || !slotsOf(DEALS[n.deal]).includes(p) || n.seats?.[p] === me) return; n.seats = { ...(n.seats || {}), [p]: me }; if (n.blocked?.[p]) n.blocked = { ...n.blocked, [p]: null }; say(r, `🤝 {${me}} ใช้เด็กเส้น${PARTNERS[p].n} ${PARTNERS[p].e} เข้าดีลเอง`, { by: me, act: `🤝 เส้น${PARTNERS[p].n}` }); }
  else if (t === 'take') {
    if (!(arg in PARTNERS) || r.ctrl[arg] === me) return; if (!nego && !(r.phase === 'turn' && curOf(r) === me)) return;
    const old = r.ctrl[arg]; r.ctrl[arg] = me; if (nego && n.seats?.[arg] === old) n.seats[arg] = me;
    say(r, `📝 {${me}} ซื้อกิจการ${PARTNERS[arg].n} ${PARTNERS[arg].e} ต่อจาก {${old}}`, { by: me, act: `📝 ซื้อ${PARTNERS[arg].n}!` });
  } else return;
  r.hands[me] = hand(r, me).filter(c => c !== card); r.discard = [...(r.discard || []), card];
  if (nego) touch(r, now); else r.at = Math.max(r.at || 0, now);
  return cur;
}
// หมดเวลา: ไม่เลือกในตา → จั่วให้ • เจรจาไม่จบ → ดีลล่ม
export function dealTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'deal' || cur.status !== 'playing') return;
  if (r.phase === 'turn' && now >= (r.at || 0) + TURN_MS) return drawTurn(cur, curOf(r), now);
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
  if (r.phase === 'nego') { const n = r.nego; slotsOf(DEALS[n.deal]).forEach(p => { if (n.seats?.[p] === id) n.seats[p] = null; }); n.chosen = (n.chosen || []).filter(p => n.seats?.[p]); }
  if (curOf(r) === id) return nextTurn(cur, now);
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
  boss: () => <g><circle cx="50" cy="40" r="32" fill="#f5c451" opacity=".28" /><circle cx="50" cy="40" r="21" fill="#ffe08a" opacity=".45" />
    <g transform="rotate(-9 50 44)"><ellipse cx="50" cy="57" rx="31" ry="7.5" fill="#15151b" /><path d="M33 57 V21 Q50 15 67 21 V57 Z" fill="#22222b" /><path d="M33 21 Q50 15 67 21 Q50 27 33 21 Z" fill="#383845" /><rect x="33" y="44" width="34" height="7.5" fill="#c0392b" /><rect x="33" y="44" width="34" height="2" fill="#e05a4b" /><path d="M38.5 25 V41" stroke="#ffffff1f" strokeWidth="3.5" strokeLinecap="round" /></g>
    <g fill="#fffbe0"><path d="M17 16 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" /><path d="M83 11 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 z" /><path d="M85 50 l1.2 3 l3 1.2 l-3 1.2 l-1.2 3 l-1.2 -3 l-3 -1.2 l3 -1.2 z" /></g></g>,
  stop: () => <g><path d="M37 7 H63 L80 24 V52 L63 69 H37 L20 52 V24 Z" fill="#e0303a" stroke="#fff" strokeWidth="3.5" strokeLinejoin="round" /><path d="M37 7 H63 L80 24 V30 Q50 18 20 30 V24 Z" fill="#fff" opacity=".14" />
    <g fill="#fff"><rect x="38.5" y="35" width="24" height="22" rx="8" /><rect x="38.5" y="20" width="5.6" height="24" rx="2.8" /><rect x="45" y="16.5" width="5.6" height="27" rx="2.8" /><rect x="51.5" y="18" width="5.6" height="25" rx="2.8" /><rect x="58" y="22.5" width="5" height="21" rx="2.5" /><rect x="30.5" y="37" width="6" height="15" rx="3" transform="rotate(-38 33.5 44.5)" /></g></g>,
  link: p => <g><path d="M3 47 L29 31 L40 46 L14 62 Z" fill="#26365e" /><path d="M97 47 L71 31 L60 46 L86 62 Z" fill="#3a2d5e" />
    <rect x="25" y="29" width="7" height="17" rx="2" fill="#fff" transform="rotate(-31 28.5 37.5)" /><rect x="68" y="29" width="7" height="17" rx="2" fill="#fff" transform="rotate(31 71.5 37.5)" />
    <path d="M30 32 Q43 24 53 31 L61 28 Q71 27 75 34 L64 48 Q54 52 47 49 Q38 54 34 46 Z" fill="#ffd2a8" /><g stroke="#c98a5a" strokeWidth="1.8" fill="none" strokeLinecap="round"><path d="M46 34 q5 3 10 2" /><path d="M48 39.5 q5 3 10 2" /><path d="M50 44.5 q4 2 8 1" /></g>
    <g transform="translate(36 1)"><PartnerIcon p={p} size={28} className="cd-badge" /></g>
    <g fill="#fff6c0"><path d="M14 14 l1.5 3.5 l3.5 1.5 l-3.5 1.5 l-1.5 3.5 l-1.5 -3.5 l-3.5 -1.5 l3.5 -1.5 z" /><path d="M86 16 l1.2 3 l3 1.2 l-3 1.2 l-1.2 3 l-1.2 -3 l-3 -1.2 l3 -1.2 z" /></g></g>,
  take: () => <g><g transform="rotate(-6 46 40)"><rect x="22" y="6" width="46" height="62" rx="3" fill="#fbf7ee" stroke="#c9bfa6" strokeWidth="1.5" /><rect x="22" y="6" width="46" height="9" rx="3" fill="#e8dfc8" /><g stroke="#b9ae95" strokeWidth="2" strokeLinecap="round"><path d="M29 22 H61 M29 29 H61 M29 36 H54 M29 43 H59" /></g><path d="M29 57 q6 -7 10 0 q4 7 9 -2" stroke="#1d2340" strokeWidth="1.8" fill="none" strokeLinecap="round" /></g>
    <g transform="rotate(-16 68 52)"><circle cx="68" cy="52" r="14" fill="#fbf7ee" fillOpacity=".6" stroke="#d9434b" strokeWidth="3" /><circle cx="68" cy="52" r="10" fill="none" stroke="#d9434b" strokeWidth="1.3" /><text x="68" y="56" textAnchor="middle" fontSize="10" fontWeight="900" fill="#d9434b" fontFamily="Kanit,sans-serif">ซื้อ!</text></g>
    <g transform="rotate(38 82 22)"><rect x="78.5" y="2" width="7.5" height="33" rx="3.5" fill="#1d2340" /><rect x="78.5" y="10" width="7.5" height="3" fill="#f5c451" /><path d="M78.5 35 L82.25 46 L86 35 Z" fill="#c9a24a" /></g></g>,
};
export function DealCard({ id, t: t0, onClick, ok = true, sel, className = '' }) {
  const { t, p } = id ? cparse(id) : { t: t0, p: null }; const C = CARDS[t]; if (!C) return null;
  const title = id ? cardTitle(id) : C.n; const cls = 'dc dcard t-' + t + (ok ? ' ok' : ' dim') + (sel ? ' sel' : '') + (className ? ' ' + className : '');
  const style = p ? { '--pc': PARTNERS[p].c } : undefined;
  const inner = <><span className="dc-art"><svg viewBox="0 0 100 76" aria-hidden="true">{CARD_ART[t](p || 'bank')}</svg></span><b>{title}</b><small>{t === 'link' && p ? 'เข้าดีลแทน' + PARTNERS[p].n + 'เอง หรือเติมที่ที่ถูกกัน' : C.text}</small></>;
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
          <div className="dt-top"><span className="dt-e">{D.e}</span><b className="dt-v"><small>×</small>{D.v}</b></div>
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
  const [flip, setFlip] = useState(null); const flipAt = useRef(r.lastPay?.at || 0);
  useEffect(() => { const L = r.lastPay; if (!L || L.at <= flipAt.current) return; flipAt.current = L.at; setFlip(L); const t = setTimeout(() => setFlip(null), 5200); return () => clearTimeout(t); }, [r.lastPay?.at]);
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c || c.status !== 'playing' || c.round?.kind !== 'deal') return; const R = c.round; R.hands = R.hands || {}; R.money = R.money || {}; R.ctrl = R.ctrl || {}; if (R.nego) R.nego.seats = R.nego.seats || {}; return f(c); });
  const nm = s => String(s).replace(/\{([^}]+)\}/g, (_, id) => nameOf(id));
  useEffect(() => { setPickCard(null); }, [r.phase, n?.boss, JSON.stringify(n?.seats || null), myHand.length]);
  // หมดเวลา
  const deadline = r.phase === 'turn' ? (r.at || 0) + TURN_MS : n?.until || 0; const secs = Math.max(0, Math.ceil((deadline - srvNow) / 1000));
  const due = !res && srvNow >= deadline; useEffect(() => { if (due) tx(c => dealTick(c, srvNow)); }, [due, r.turn, r.phase]);
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
      if (myTurn && key === 'r') { e.preventDefault(); sfx(sound, 'roll'); tx(c => rollDeal(c, myId, srvNow)); }
      else if (myTurn && key === 'd') { e.preventDefault(); sfx(sound, 'draw'); tx(c => drawTurn(c, myId, srvNow)); } };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  });
  const money = id => r.money?.[id] || 0;
  const endNums = r.endNums || []; const endLeft = (r.endDeck || []).length; const endOn = r.endFrom != null; const nextEnd = endOn ? END_EVERY - (((r.turns || 0) - r.endFrom) % END_EVERY) : null;
  const [endFx, setEndFx] = useState(null); const endAt = useRef(r.endFlip?.at || 0);
  useEffect(() => { const E = r.endFlip; if (!E || E.at <= endAt.current) return; endAt.current = E.at; const delay = r.lastPay?.at === E.at ? 5400 : 200; const t1 = setTimeout(() => { setEndFx(E); sfx(sound, 'reveal'); }, delay); const t2 = setTimeout(() => setEndFx(null), delay + 3200); return () => { clearTimeout(t1); clearTimeout(t2); }; }, [r.endFlip?.at]);
  const v = D?.v || 0;
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
  const usable = c => { const { t, p } = cparse(c); if (res || !meIn) return false; if (t === 'take') return r.phase === 'nego' || myTurn; if (r.phase !== 'nego') return false; if (t === 'boss') return !iBoss; if (t === 'stop') return slotsOf(D).some(x => n.seats?.[x]); if (t === 'link') return slotsOf(D).includes(p) && n.seats?.[p] !== myId; return false; };
  const play = (c, arg) => { sfx(sound, 'card'); setPickCard(null); tx(x => playDealCard(x, myId, c, arg, srvNow)); };
  const tapCard = c => { if (!usable(c)) { msg(cparse(c).t === 'take' ? 'ซื้อกิจการใช้ได้ตอนถึงตาคุณ หรือระหว่างเจรจา' : 'การ์ดนี้ใช้ได้ระหว่างเจรจาดีล'); return; } const { t } = cparse(c); if (t === 'stop' || t === 'take') { sfx(sound, 'select'); setPickCard(pickCard === c ? null : c); return; } play(c); };
  const pk = pickCard ? cparse(pickCard).t : null;
  const you = id => (id === myId ? 'คุณ' : nameOf(id));
  // กล่อง "ตอนนี้ต้องทำอะไร" ตามบทบาท
  const doBox = !n ? null : iBoss ? (step === 1 ? (missing.length
      ? <><b>⛔ ขาด{missing.map(p => PARTNERS[p].n).join(' / ')}</b><span>หุ้นส่วนจำเป็นถูกกันออก — ใช้การ์ด 🤝 เด็กเส้น เติมเอง หรือถอนตัว</span></>
      : <><b>① เลือกหุ้นส่วนเพิ่มอีก {needPick} ราย</b><span>แตะ “เลือก” ในกลุ่ม 🧩 ตัวเลือกด้านล่าง — ใครขอส่วนแบ่งน้อย เลือกคนนั้น</span></>)
    : step === 2 ? <><b>② แบ่งส่วน แล้วรอทุกคนกดตกลง</b><span>กด − / + ข้างชื่อ ปรับได้เลย ไม่ต้องกดส่ง • ยังรอ: {waitIds.map(you).join(', ')}</span></>
    : <><b>③ ทุกคนตกลงแล้ว! 🎉</b><span>กดปิดดีล แล้วสุ่มการ์ดเงินมาคูณ</span></>)
    : iPart ? (n.ok?.[myId] === true ? <><b>✅ คุณตกลงรับ <em>{myAmt} ส่วน</em> แล้ว</b><span>รอเจ้าของดีลกดปิดดีล</span></>
      : <><b>เจ้าของดีลให้คุณ <em>{myAmt} ส่วน</em></b><span>ได้ {myAmt}–{myAmt * 5} ล้าน (แล้วแต่การ์ดเงิน){ask[myId] != null ? ` • คุณขอไป ${ask[myId]} ส่วน — รอเจ้าของดีลตอบ` : ''}</span></>)
    : myCand ? <><b>🙋 คุณเป็นหุ้นส่วนตัวเลือก</b><span>เจ้าของดีลยังไม่เลือกคุณ — เสนอขอส่วนน้อย ๆ เพื่อให้ถูกเลือก{ask[myId] != null ? ` (ตอนนี้ขอ ${ask[myId]} ส่วน)` : ''}</span></>
    : <><b>👀 คุณไม่ได้อยู่ในดีลนี้</b><span>แทรกได้ด้วยการ์ดในมือ: 🎩 แย่งคุมดีล • ✋ กันคนออก • 🤝 เด็กเส้นเข้าดีลเอง</span></>;
  const doBtns = !n ? null : iBoss ? <>
      <button className={'primary wide ng-close' + (ready ? ' go' : '')} disabled={!ready} onClick={() => { sfx(sound, 'confirm'); tx(c => closeDeal(c, myId, srvNow)); }}>🤝 {ready ? 'ปิดดีลเลย!' : 'ปิดดีล (ยังไม่ครบ)'}</button>
      <div className="ng-mini"><button className="secondary" disabled={!teamOk} onClick={() => bump(null, 'even')}>⚖️ แบ่งเท่า ๆ กัน</button><button className="secondary" onClick={() => { if (confirm('ถอนตัวจากดีลนี้? (ดีลล่ม)')) tx(c => cancelDeal(c, myId, srvNow)); }}>💨 ถอนตัว</button></div></>
    : iPart ? (n.ok?.[myId] === true
      ? <div className="ng-mini"><button className="secondary" onClick={() => askFor(myAmt + 1)}>🙏 เปลี่ยนใจ ขอ {myAmt + 1} ส่วน</button></div>
      : <div className="ng-btns"><button className="primary" onClick={() => { sfx(sound, 'confirm'); tx(c => answer(c, myId, true, srvNow)); }}>✅ ตกลง {myAmt} ส่วน</button><button className="secondary" disabled={Math.max(myAmt, ask[myId] || 0) >= v} onClick={() => askFor(Math.max(myAmt, ask[myId] || 0) + 1)}>🙏 ขอ {Math.max(myAmt, ask[myId] || 0) + 1} ส่วน</button></div>)
    : myCand ? <div className="ng-mini">{[1, 2, 3].filter(w => w < v).map(w => <button key={w} className={'secondary' + (ask[myId] === w ? ' on' : '')} onClick={() => askFor(w)}>🙋 ขอแค่ {w} ส่วน</button>)}</div>
    : null;

  const center = res ? <div className="mid-res">🏆<b>{nameOf(res.winner)}</b><small>รวยสุด {money(res.winner)} ล้าน</small></div>
    : r.phase === 'nego' ? <div className="mid-nego"><span className="mid-die">{DIE[n.die]}</span><span className="mid-e">{D.e}</span><b>{D.n}</b><small>×{v} ส่วน • <Avatar id={n.boss} av={av} size={18} /> คุมดีล</small><TimerRing secs={secs} total={Math.round(NEGO_MS / 1000)} size={40} /></div>
      : <div className="mid-turn"><Avatar id={cur} av={av} size={38} /><b>{cur === myId ? 'ตาคุณ!' : `ตาของ ${nameOf(cur)}`}</b><small>ปิดดีลแล้ว {r.closed || 0}/{TILES}</small>{endNums.length > 0 && <small className="mid-end">🎴 ระวังเลข {endNums.join(' ')}</small>}<TimerRing secs={secs} total={TURN_MS / 1000} size={40} /></div>;

  return <div className="deal-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number} • ตาที่ {(r.turns || 0) + 1}</span><span className="cat-tag">💼 ปิดแล้ว {r.closed || 0}/{TILES}</span></div>
    <div className="gcols"><div className="gmain"><Board r={r} res={res} myId={myId} av={av} nameOf={nameOf} center={center} /></div><div className="gside">

    {res && <>
      <Outcome art="win" tone={res.winner === myId ? 'good' : ''} title={`${nameOf(res.winner)} รวยที่สุด! 🏆`}>{res.why === 'number' && r.lastRoll ? <>🎴 {nameOf(r.lastRoll.by)} ทอยได้ {r.lastRoll.die} ตรงการ์ดจบเกม<br /></> : res.why === 'board' ? <>💼 ปิดดีลครบทุกช่องแล้ว<br /></> : res.why === 'limit' ? <>⏱️ ครบจำนวนตาสูงสุด<br /></> : ''}เงินรวม {money(res.winner)} ล้าน • ปิดดีลไป {r.closed || 0} ดีล</Outcome>
      <div className="money-row big">{(res.rank || []).map((id, i) => <span key={id}><em>{i + 1}</em><Avatar id={id} av={av} size={26} /> {nameOf(id)} <b>💰{money(id)} ล้าน</b></span>)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}

    {/* ตาของคุณ */}
    {myTurn && <div className="turn-acts"><button className="primary big-roll" onClick={() => { sfx(sound, 'roll'); tx(c => rollDeal(c, myId, srvNow)); }}>🎲 ทอยหาดีล<small>{endNums.length ? `⚠️ ทอยได้ ${endNums.join(' / ')} = จบเกมทันที` : 'เดินหมวกเจ้าสัว แล้วเป็นเจ้าของดีลที่หยุด'}</small></button>
      <button className="secondary" onClick={() => { sfx(sound, 'draw'); tx(c => drawTurn(c, myId, srvNow)); }}>🃏 จั่วการ์ด 2 ใบ<small>แล้วจบตา</small></button><p className="kbd-hint">⌨️ กด <kbd>R</kbd> ทอย • <kbd>D</kbd> จั่ว</p></div>}
    {!res && r.phase === 'turn' && !myTurn && <div className="waiting">⏳ รอ {nameOf(cur)} ทอยเต๋าหรือจั่วการ์ด… ({secs} วิ)</div>}

    {/* เจรจา: บอกชัด ๆ ว่าตอนนี้ต้องทำอะไร แล้วค่อยเป็นรายชื่อคนในดีล */}
    {!res && r.phase === 'nego' && <div className={'nego2' + (iBoss ? ' boss' : iPart ? ' part' : myCand ? ' cand' : '')}>
      <div className="ng-top"><span className="nego-e">{D.e}</span><div><b>{D.n} <span className="ng-x">×{v}</span></b><small>🎩 {you(n.boss)} คุมดีล • แบ่ง {v} ส่วน</small></div><TimerRing secs={secs} total={Math.round(NEGO_MS / 1000)} size={44} /></div>
      <ol className="ng-steps">{['ทีมครบ', 'ทุกคนตกลง', 'ปิดดีล'].map((s, i) => <li key={s} className={step > i + 1 ? 'done' : step === i + 1 ? 'now' : ''}>{step > i + 1 ? '✓' : i + 1} {s}</li>)}</ol>
      <div className="ng-do">{doBox}{doBtns}</div>

      <div className="ng-h">👥 คนในดีล — แบ่ง {v} ส่วน <small>(ปิดแล้วเปิดการ์ดเงิน ส่วนละ 1–5 ล้าน)</small></div>
      <div className="ng-bar" aria-hidden="true">{parts.flatMap(id => Array.from({ length: Math.max(0, id === n.boss ? bossShare : offer[id] || 0) }, (_, i) => <i key={id + i} style={{ background: colOf(id) }} />))}</div>
      <div className="ng-people">{parts.map(id => { const isB = id === n.boss; const amt = isB ? bossShare : offer[id] || 0; const a = ask[id];
        const st = isB ? <span className="ng-st boss">🎩 เจ้าของดีล • ได้ส่วนที่เหลือ</span>
          : n.ok?.[id] === true ? <span className="ng-st ok">✅ ตกลงแล้ว</span>
          : a != null ? <span className="ng-st ask">🙏 ขอ {a} ส่วน{iBoss && <button type="button" onClick={() => bump(id, 'ask')}>ให้</button>}</span>
          : n.ok?.[id] === false ? <span className="ng-st no">❌ ยังไม่เอา</span> : <span className="ng-st">⏳ รอตอบ</span>;
        return <div key={id} className={'ng-p' + (id === myId ? ' me' : '')} style={{ '--uc': colOf(id) }}><Avatar id={id} av={av} size={30} />
          <span className="ng-n"><b>{you(id)}</b><span>{seatsOf(id).map(p => <Dot key={p} p={p} size={16} />)}{st}</span></span>
          <span className="ng-amt">{iBoss && !isB && <button type="button" className="of-btn" disabled={amt <= 0} onClick={() => bump(id, -1)}>−</button>}<b>{amt}<small>ส่วน</small></b>{iBoss && !isB && <button type="button" className="of-btn" disabled={bossShare <= 0} onClick={() => bump(id, 1)}>+</button>}</span></div>; })}
        {missing.map(p => <div key={p} className="ng-miss" style={{ '--pc': PARTNERS[p].c }}><Dot p={p} size={20} off /> ⛔ {PARTNERS[p].n} ถูก {you(n.blocked?.[p])} กันออก — ต้องมีเด็กเส้น{PARTNERS[p].n}มาแทน</div>)}
      </div>

      {optOf(D).length > 0 && <>
        <div className="ng-h">🧩 ตัวเลือก — เลือก {pickOf(D)} จาก {optOf(D).length} ราย <small>(เลือกแล้ว {chosen.length}/{pickOf(D)})</small></div>
        <div className="ng-cgrid">{optOf(D).map(p => { const who = n.seats?.[p]; const ch = chosen.includes(p); const a = who ? ask[who] : null;
          return <div key={p} className={'ng-c' + (ch ? ' on' : '') + (who ? '' : ' empty')} style={{ '--pc': PARTNERS[p].c }}><Dot p={p} size={24} off={!who} />
            <span><b>{PARTNERS[p].n}</b><small>{who ? you(who) : `⛔ ถูกกัน`}</small>{a != null && !ch && <em>🙋 ขอแค่ {a} ส่วน</em>}</span>
            {iBoss && who ? <button type="button" className={'opt-btn' + (ch ? ' on' : '')} disabled={!ch && !needPick} onClick={() => { sfx(sound, 'select'); tx(c => chooseOpt(c, myId, p, srvNow)); }}>{ch ? '✓ เอาออก' : 'เลือก'}</button>
              : <span className="opt-st">{ch ? '✓ ในดีล' : ''}</span>}</div>; })}</div>
      </>}
    </div>}

    {/* การ์ดในมือ */}
    {!res && meIn && <>
      <SecH icon="🃏">การ์ดในมือ <small>{myHand.length}/{HAND_MAX} ใบ • {r.phase === 'nego' ? 'ใบที่สว่างใช้ได้ตอนนี้ แตะเพื่อใช้' : 'ใช้ได้ตอนมีคนเจรจาดีล'}</small></SecH>
      <div className="dc-hand">{myHand.map(c => <DealCard key={c} id={c} ok={usable(c)} sel={pickCard === c} onClick={() => tapCard(c)} />)}
        {!myHand.length && <p className="hint">ไม่มีการ์ด — จั่วได้ตอนถึงตา</p>}</div>
      {pk === 'stop' && <div className="act-box"><b>✋ กันหุ้นส่วนรายไหน?</b><div className="pick-p">{D && slotsOf(D).filter(p => n.seats?.[p]).map(p => <button type="button" key={p} style={{ '--pc': PARTNERS[p].c }} onClick={() => play(pickCard, p)}><Dot p={p} size={24} />{PARTNERS[p].n}<small>{nameOf(n.seats[p])}</small></button>)}</div></div>}
      {pk === 'take' && <div className="act-box"><b>📝 ซื้อกิจการหุ้นส่วนรายไหน?</b><div className="pick-p">{PK.filter(p => r.ctrl[p] !== myId).map(p => <button type="button" key={p} style={{ '--pc': PARTNERS[p].c }} onClick={() => { if (confirm(`ซื้อ${PARTNERS[p].n}ต่อจาก ${nameOf(r.ctrl[p])}?`)) play(pickCard, p); }}><Dot p={p} size={24} />{PARTNERS[p].n}<small>{nameOf(r.ctrl[p])}</small></button>)}</div></div>}
    </>}

    {/* หุ้นส่วน: ใครคุมใคร + เงิน + การ์ดจบเกม */}
    {!res && <div className="end-row"><span className="er-h">🎴 การ์ดจบเกม</span><span className="er-cards">{endNums.length ? endNums.map(x => <b key={x} className="end-card">{x}</b>) : <em>ยังไม่เปิด</em>}</span><small>{!endOn ? `เริ่มเปิดเมื่อปิดดีลครบ ${END_START} ดีล (ตอนนี้ ${Math.min(r.closed || 0, END_START)}/${END_START}) แล้วเปิดทุก ${END_EVERY} ตา` : <>{endNums.length ? `ทอยได้ ${endNums.join(' / ')} = จบเกม` : 'ทอยได้เลขบนการ์ด = จบเกม'} • {endLeft ? `ใบใหม่ในอีก ${nextEnd} ตา` : 'เปิดครบแล้ว'}</>}</small></div>}
    <SecH icon="💼">ใครคุมหุ้นส่วนไหน</SecH>
    <div className="ctrl-row">{PK.map(p => <span key={p} className={'ctrl-chip' + (r.ctrl[p] === myId ? ' mine' : '')} style={{ '--pc': PARTNERS[p].c }}><Dot p={p} size={22} /><span><b>{PARTNERS[p].n}</b><small><Avatar id={r.ctrl[p]} av={av} size={16} /> {you(r.ctrl[p])}</small></span></span>)}</div>
    {!res && <div className="money-row">{[...r.order].sort((a, b) => money(b) - money(a)).map(id => <span key={id} className={(id === cur ? 'cur ' : '') + (r.out?.[id] ? 'out' : '')}><Avatar id={id} av={av} size={22} /> {you(id)} <b>💰{money(id)}</b><small>🃏{hand(r, id).length}</small></span>)}</div>}

    {isHost && !res && (cur !== myId || r.phase === 'nego' || r.order.some(id => inGame(r, id) && !room.players?.[id])) && <HostBar>
      <button className="secondary" onClick={() => { if (confirm(r.phase === 'nego' ? 'จบการเจรจานี้เลย (ดีลล่ม)?' : `ให้ ${nameOf(cur)} จั่วการ์ดแล้วข้ามตา?`)) tx(c => forceDeal(c, srvNow)); }}>⏭️ {r.phase === 'nego' ? 'จบเจรจา' : `ข้ามตา ${nameOf(cur)}`}</button>
      {r.order.filter(id => inGame(r, id) && !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickDeal(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}</HostBar>}
    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...(r.log || [])].reverse().slice(0, 8).map((e, i) => <li key={i} className={e.win ? 'win-line' : ''}>{nm(e.text)}</li>)}</ul>
    {endFx && !res && <div className="pay-fx end-fx" onClick={() => setEndFx(null)}><div className="pay-box"><span className="pay-deal">🎴 เปิดการ์ดจบเกมใบใหม่!</span><div className="money-card"><div className="mc-in"><div className="mc-back">🎴</div><div className="mc-front end"><small>การ์ดจบเกม</small><b>{endFx.n}</b><em>ทอยได้เลขนี้ = จบ</em></div></div></div><span className="end-now">ตอนนี้ทอยได้ {endNums.join(' / ')} เกมจบทันที</span><small className="pay-close">แตะเพื่อปิด</small></div></div>}
    {flip && <div className="pay-fx" onClick={() => setFlip(null)}><div className="pay-box">
      <span className="pay-deal">{DEALS[flip.deal].e} {DEALS[flip.deal].n} ปิดดีลแล้ว! (×{flip.x})</span>
      <div className="money-card"><div className="mc-in"><div className="mc-back">💵</div><div className="mc-front"><small>การ์ดเงิน</small><b>{flip.card}</b><em>ล้าน / ส่วน</em></div></div></div>
      <ul className="pay-list">{Object.entries(flip.pay || {}).sort((a, b) => b[1] - a[1]).map(([id, v], i) => <li key={id} style={{ animationDelay: 1.3 + i * 0.25 + 's' }}><Avatar id={id} av={av} size={24} /><span className="pn">{id === myId ? 'คุณ' : nameOf(id)}</span><small>{Math.round(v / flip.card)} ส่วน × {flip.card}</small><b>+{v} ล้าน</b></li>)}</ul>
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
      <span>🎲 ตาคุณ: ทอยเต๋าเดินหมวกเจ้าสัวไปเจอดีล แล้วคุณเป็นเจ้าของดีล — หรือจะจั่วการ์ด 2 ใบแทนก็ได้</span>
      <span>🔒 ช่องดีลแถวบน = หุ้นส่วนจำเป็น • 🧩 แถวล่าง (ป้าย “เลือก 2”) = กลุ่มตัวเลือก เจ้าของดีลเลือกเองว่าจะเอาใคร — หุ้นส่วนตัวเลือกเลยต้องแข่งกันยอมรับส่วนแบ่ง</span>
      <span>✖️ ตัวเลขบนช่องคือตัวคูณ ×N = ดีลนี้แบ่งได้ N ส่วน (ดีลใหญ่ใช้หุ้นส่วนเยอะ ตัวคูณสูง)</span>
      <span>🤝 เจ้าของดีลเสนอแบ่งส่วน ทุกคนในดีลกดตกลงครบ → ปิดดีล แล้วเปิดการ์ดเงินสุ่ม 💵 (ส่วนละ 1–5 ล้าน) คูณออกมาเป็นเงินจริง</span>
      <span>🎴 ปิดดีลครบ {END_START} ดีลแล้ว ทุก {END_EVERY} ตาเปิดการ์ดจบเกม 1 ใบ (เลข 1–6) — ใครทอยเต๋าได้เลขที่เปิดอยู่ เกมจบทันที • หรือปิดดีลครบทุกช่องก็จบ • ใครรวยสุดชนะ</span>
      <span>⏱️ เจรจา {NEGO_MS / 1000} วิ (เล่นการ์ดต่อเวลาได้) ไม่จบ = ดีลล่ม</span></div>
    <div className="dc-hand lobby">{Object.keys(CARDS).map(t => <DealCard key={t} id={t === 'link' ? 'link_media-x' : t + '-x'} />)}</div>
  </>;
}
