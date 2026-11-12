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
export const TURN_MS = 30000, NEGO_MS = 90000, NEGO_CAP = 180000, GOAL = 6, TILES = 12, HAND0 = 3, HAND_MAX = 8;
export const PARTNERS = {
  bank: { n: 'ธนาคาร', e: '🏦', c: '#3a7bd5' }, build: { n: 'รับเหมา', e: '🏗️', c: '#e0862a' }, media: { n: 'สื่อ', e: '📺', c: '#d9434b' },
  law: { n: 'ทนาย', e: '⚖️', c: '#8a5ad6' }, ship: { n: 'ขนส่ง', e: '🚚', c: '#2f9e5f' }, tech: { n: 'ไอที', e: '💻', c: '#1fa3b5' },
};
export const PK = Object.keys(PARTNERS);
export const DEALS = [
  { n: 'ร้านชาบู', e: '🍲', v: 3, need: ['build', 'media'] }, { n: 'คาเฟ่แมว', e: '🐈', v: 3, need: ['law', 'media'] },
  { n: 'แอปส่งอาหาร', e: '🛵', v: 4, need: ['tech', 'ship'] }, { n: 'ตลาดนัดกลางคืน', e: '🏮', v: 3, need: ['law', 'build'] },
  { n: 'โรงงานน้ำปลา', e: '🐟', v: 4, need: ['ship', 'bank'] }, { n: 'ค่ายเกม', e: '🎮', v: 4, need: ['tech', 'bank'] },
  { n: 'ร้านทองเยาวราช', e: '💰', v: 3, need: ['bank', 'law'] }, { n: 'ตลาดน้ำ', e: '🛶', v: 3, need: ['ship', 'media'] },
  { n: 'โกดังสินค้า', e: '📦', v: 4, need: ['ship', 'build'] }, { n: 'ค่ายมวยไทย', e: '🥊', v: 4, need: ['media', 'tech'] },
  { n: 'ซีรีส์วาย', e: '🎬', v: 5, need: ['media', 'tech', 'law'] }, { n: 'รีสอร์ตริมทะเล', e: '🏖️', v: 6, need: ['build', 'ship', 'media'] },
  { n: 'ธนาคารออนไลน์', e: '💳', v: 6, need: ['bank', 'tech', 'law'] }, { n: 'ฟาร์มทุเรียน', e: '🌴', v: 5, need: ['ship', 'bank', 'build'] },
  { n: 'คลินิกความงาม', e: '💄', v: 5, need: ['law', 'media', 'bank'] }, { n: 'ดาต้าเซ็นเตอร์', e: '🖥️', v: 6, need: ['tech', 'build', 'bank'] },
  { n: 'คอนโดติดรถไฟฟ้า', e: '🏢', v: 8, need: ['bank', 'build', 'law', 'media'] }, { n: 'ห้างสรรพสินค้า', e: '🛍️', v: 8, need: ['bank', 'build', 'ship', 'media'] },
  { n: 'สนามบินใหม่', e: '🛫', v: 9, need: ['bank', 'build', 'ship', 'law'] }, { n: 'รถไฟความเร็วสูง', e: '🚄', v: 9, need: ['bank', 'build', 'tech', 'ship'] },
];
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
  return { number, kind: 'deal', order, turn: 0, pos: 0, tiles: di.slice(0, TILES), reserve: di.slice(TILES), ctrl, hands, deck: d, discard: [], money, closed: 0, done: null, phase: 'turn', nego: null, at: t0 + 3000, turns: 0, out: null, log: [], startedAt: t0 };
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
// คนที่อยู่ในดีล: เจ้าของดีล + คนที่นั่งเก้าอี้หุ้นส่วน (ไม่ซ้ำ)
export const partsOf = n => [...new Set([n.boss, ...Object.values(n.seats || {}).filter(Boolean)])];
function defOffer(r) {
  const n = r.nego; const v = DEALS[n.deal].v; const ps = partsOf(n); const others = ps.filter(id => id !== n.boss);
  const each = Math.floor(v / ps.length); const o = {}; others.forEach(id => { o[id] = each; }); o[n.boss] = v - each * others.length; return o;
}
// โครงดีลเปลี่ยน (เจ้าของ/คนนั่ง) → ข้อเสนอกลับเป็นแบ่งเท่า ๆ กัน คำตอบรีเซ็ต + ต่อเวลา
function touch(r, now) {
  const n = r.nego; n.offer = defOffer(r); n.ok = null;
  n.until = Math.min(n.start + NEGO_CAP, Math.max(n.until, now + 20000));
}
function finish(cur) {
  const r = cur.round; const ids = r.order.filter(id => !r.out?.[id]); const m = id => r.money?.[id] || 0;
  const rank = [...ids].sort((a, b) => m(b) - m(a)); const top = m(rank[0]); const sec = rank.map(m).find(x => x < top);
  const points = {}, sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { points[id] = !ids.includes(id) ? 0 : m(id) === top ? DEAL_SCORE.win : sec != null && m(id) === sec ? DEAL_SCORE.second : 0; sc[id] = (sc[id] || 0) + points[id]; });
  r.phase = 'done'; r.nego = null; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'deal', winner: rank[0] || null, rank, points };
  return cur;
}
function nextTurn(cur, now) {
  const r = cur.round; r.nego = null; r.phase = 'turn'; r.at = now; r.turns = (r.turns || 0) + 1;
  if (r.closed >= GOAL || r.turns >= r.order.length * 10) return finish(cur);
  const n = r.order.length; for (let i = 1; i <= n; i++) { const k = (r.turn + i) % n; if (inGame(r, r.order[k])) { r.turn = k; break; } }
  return cur;
}

// ตาของคุณ: ทอยเต๋าเดินหมวกเจ้าสัว แล้วเปิดเจรจาดีลที่หยุด
export function rollDeal(cur, me, now, die = 1 + rint(6)) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'turn' || curOf(r) !== me) return;
  r.pos = (r.pos + die) % TILES; const di = r.tiles[r.pos];
  if (di == null || di < 0) { say(r, `🎲 {${me}} ทอยได้ ${die} — ช่องนี้ปิดดีลไปแล้ว`, { by: me, act: `🎲 ${die}` }); draw(r, me, 1); return nextTurn(cur, now); }
  const D = DEALS[di]; const seats = {}; D.need.forEach(p => { seats[p] = inGame(r, r.ctrl[p]) ? r.ctrl[p] : null; });
  r.phase = 'nego'; r.nego = { tile: r.pos, deal: di, boss: me, roller: me, seats, blocked: null, offer: null, ok: null, die, start: now, until: now + NEGO_MS };
  r.nego.offer = defOffer(r);
  say(r, `🎲 {${me}} ทอยได้ ${die} เจอดีล ${D.e} ${D.n} (${D.v} ล้าน)`, { by: me, act: `🎲 ${die}` });
  return cur;
}
// จั่วการ์ด 2 ใบแล้วจบตา
export function drawTurn(cur, me, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'turn' || curOf(r) !== me) return;
  draw(r, me, 2); say(r, `🃏 {${me}} จั่วการ์ด 2 ใบ`, { by: me, act: '🃏 +2' }); return nextTurn(cur, now);
}
// เจ้าของดีลปรับข้อเสนอ: others = {id: ล้าน} ของทุกคนในดีลยกเว้นตัวเอง (ตัวเองได้ที่เหลือ)
export function setOffer(cur, me, others, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss !== me) return;
  const v = DEALS[n.deal].v; const ps = partsOf(n).filter(id => id !== me); const o = {}; let sum = 0;
  for (const id of ps) { const x = Math.floor(+others?.[id] || 0); if (x < 0) return; o[id] = x; sum += x; }
  if (sum > v) return; o[me] = v - sum; n.offer = o; n.ok = null; return cur;
}
// คนในดีลตอบรับ/ปฏิเสธข้อเสนอ
export function answer(cur, me, yes, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || me === n.boss || !partsOf(n).includes(me)) return;
  n.ok = { ...(n.ok || {}), [me]: !!yes }; say(r, `${yes ? '✅' : '❌'} {${me}} ${yes ? 'ตกลง' : 'ไม่เอา'} (${n.offer?.[me] || 0} ล้าน)`, { by: me, act: yes ? '✅ ตกลง!' : '❌ ไม่เอา!' }); return cur;
}
export const canClose = n => !!n && DEALS[n.deal].need.every(p => n.seats?.[p]) && partsOf(n).filter(id => id !== n.boss).every(id => n.ok?.[id] === true);
// เจ้าของดีลกดปิดดีล (ทุกที่นั่งครบ + ทุกคนตกลงแล้ว)
export function closeDeal(cur, me, now) {
  const r = cur.round; const n = r.nego; if (cur.status !== 'playing' || r.phase !== 'nego' || n.boss !== me || !canClose(n)) return;
  const D = DEALS[n.deal]; Object.entries(n.offer || {}).forEach(([id, x]) => { r.money[id] = (r.money?.[id] || 0) + x; });
  say(r, `🤝 {${me}} ปิดดีล ${D.e} ${D.n} สำเร็จ! แบ่ง ${partsOf(n).map(id => `{${id}} ${n.offer[id]}`).join(' • ')}`, { by: me, act: '🤝 ปิดดีล!', win: true });
  r.done = [...(r.done || []), { deal: n.deal, boss: me, offer: n.offer }]; r.closed = (r.closed || 0) + 1;
  const rs = [...(r.reserve || [])]; r.tiles[n.tile] = rs.length ? rs.shift() : -1; r.reserve = rs;
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
  else if (t === 'stop') { if (!nego || !DEALS[n.deal].need.includes(arg) || !n.seats?.[arg]) return; const was = n.seats[arg]; n.seats[arg] = null; n.blocked = { ...(n.blocked || {}), [arg]: me }; say(r, `✋ {${me}} กัน${PARTNERS[arg].n} ${PARTNERS[arg].e} ({${was}}) ออกจากดีล`, { by: me, act: `✋ หยุด${PARTNERS[arg].n}!` }); }
  else if (t === 'link') { if (!nego || !DEALS[n.deal].need.includes(p) || n.seats?.[p] === me) return; n.seats = { ...(n.seats || {}), [p]: me }; if (n.blocked?.[p]) n.blocked = { ...n.blocked, [p]: null }; say(r, `🤝 {${me}} ใช้เด็กเส้น${PARTNERS[p].n} ${PARTNERS[p].e} เข้าดีลเอง`, { by: me, act: `🤝 เส้น${PARTNERS[p].n}` }); }
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
  if (left.length < 2) return finish(cur);
  if (r.phase === 'nego' && (r.nego.boss === id || partsOf(r.nego).includes(id))) return failDeal(cur, now, 'มีคนหลุด');
  if (curOf(r) === id) return nextTurn(cur, now);
  return cur;
}

// ---------- กระดาน: ดีล 12 ช่องเรียงรอบขอบ (4×4) ตรงกลางเป็นสถานะ ----------
const RING = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [3, 3], [3, 2], [3, 1], [3, 0], [2, 0], [1, 0]];
const Dot = ({ p, size, off }) => <span className={'pd' + (off ? ' off' : '')} style={size ? { '--pc': PARTNERS[p].c, width: size, height: size, fontSize: Math.round(size * 0.58) } : { '--pc': PARTNERS[p].c }} title={PARTNERS[p].n}>{PARTNERS[p].e}</span>;
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
          <div className="dt-top"><span className="dt-e">{D.e}</span><b className="dt-v">{D.v}<small>ล.</small></b></div>
          <span className="dt-n">{D.n}</span>
          <div className={'dt-need n' + D.need.length}>{D.need.map(p => <Dot key={p} p={p} off={live && !n.seats?.[p]} />)}</div>
        </> : <span className="dt-done">✅<small>ปิดแล้ว</small></span>}
        {r.flash?.tile === i && <span key={r.flash.at} className="dt-cash">💰</span>}
      </div>;
    })}
    <div className="db-mid"><Sky />{center}</div>
    {!res && <div className="db-pawn" style={{ left: `${pc * 24.2 + 20.5}%`, top: `${pr * 24.2 + 7}%` }}>🎩</div>}
  </div>;
}

// ---------- หน้าจอ ----------
export function DealGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack, srvNow }) {
  const r = room.round; const res = room.status === 'result' && room.result;
  const n = r.nego; const D = dealOf(r); const cur = curOf(r); const meIn = inGame(r, myId);
  const myTurn = !res && r.phase === 'turn' && cur === myId && meIn;
  const myHand = hand(r, myId); const parts = n ? partsOf(n) : []; const iBoss = n?.boss === myId; const iPart = parts.includes(myId) && !iBoss;
  const [draft, setDraft] = useState(null); const [pickCard, setPickCard] = useState(null);
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c || c.status !== 'playing' || c.round?.kind !== 'deal') return; const R = c.round; R.hands = R.hands || {}; R.money = R.money || {}; R.ctrl = R.ctrl || {}; if (R.nego) R.nego.seats = R.nego.seats || {}; return f(c); });
  const nm = s => String(s).replace(/\{([^}]+)\}/g, (_, id) => nameOf(id));
  const offerKey = JSON.stringify(n?.offer || null) + (n?.boss || '');
  useEffect(() => { setDraft(null); }, [offerKey]);
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
  const v = D?.v || 0;
  const offer = draft || n?.offer || {};
  const others = parts.filter(id => id !== n?.boss);
  const bossShare = v - others.reduce((a, id) => a + (offer[id] || 0), 0);
  const bump = (id, d) => { const o = { ...offer }; const nv = Math.max(0, (o[id] || 0) + d); if (d > 0 && bossShare <= 0) return; o[id] = nv; sfx(sound, 'click'); setDraft(o); };
  const sendOffer = () => { if (!draft) return; sfx(sound, 'confirm'); tx(c => setOffer(c, myId, Object.fromEntries(others.map(id => [id, draft[id] || 0])), srvNow)); };
  // เล่นการ์ด
  const usable = c => { const { t, p } = cparse(c); if (res || !meIn) return false; if (t === 'take') return r.phase === 'nego' || myTurn; if (r.phase !== 'nego') return false; if (t === 'boss') return !iBoss; if (t === 'stop') return D.need.some(x => n.seats?.[x]); if (t === 'link') return D.need.includes(p) && n.seats?.[p] !== myId; return false; };
  const play = (c, arg) => { sfx(sound, 'card'); setPickCard(null); tx(x => playDealCard(x, myId, c, arg, srvNow)); };
  const tapCard = c => { if (!usable(c)) { msg(cparse(c).t === 'take' ? 'ซื้อกิจการใช้ได้ตอนถึงตาคุณ หรือระหว่างเจรจา' : 'การ์ดนี้ใช้ได้ระหว่างเจรจาดีล'); return; } const { t } = cparse(c); if (t === 'stop' || t === 'take') { sfx(sound, 'select'); setPickCard(pickCard === c ? null : c); return; } play(c); };
  const pk = pickCard ? cparse(pickCard).t : null;

  const center = res ? <div className="mid-res">🏆<b>{nameOf(res.winner)}</b><small>รวยสุด {money(res.winner)} ล้าน</small></div>
    : r.phase === 'nego' ? <div className="mid-nego"><span className="mid-die">{DIE[n.die]}</span><span className="mid-e">{D.e}</span><b>{D.n}</b><small>{v} ล้าน • <Avatar id={n.boss} av={av} size={18} /> คุมดีล</small><TimerRing secs={secs} total={Math.round(NEGO_MS / 1000)} size={40} /></div>
      : <div className="mid-turn"><Avatar id={cur} av={av} size={38} /><b>{cur === myId ? 'ตาคุณ!' : `ตาของ ${nameOf(cur)}`}</b><small>ปิดดีลแล้ว {r.closed || 0}/{GOAL}</small><TimerRing secs={secs} total={TURN_MS / 1000} size={40} /></div>;

  return <div className="deal-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number} • ปิดดีลครบ {GOAL} ดีลจบเกม</span><span className="cat-tag">💼 ปิดแล้ว {r.closed || 0}/{GOAL}</span></div>
    <div className="gcols"><div className="gmain"><Board r={r} res={res} myId={myId} av={av} nameOf={nameOf} center={center} /></div><div className="gside">

    {/* หุ้นส่วน: ใครคุมใคร + เงิน */}
    <div className="ctrl-row">{PK.map(p => <span key={p} className={'ctrl-chip' + (r.ctrl[p] === myId ? ' mine' : '')} style={{ '--pc': PARTNERS[p].c }}><Dot p={p} size={22} /><span><b>{PARTNERS[p].n}</b><small><Avatar id={r.ctrl[p]} av={av} size={16} /> {r.ctrl[p] === myId ? 'คุณ' : nameOf(r.ctrl[p])}</small></span></span>)}</div>
    <div className="money-row">{[...r.order].sort((a, b) => money(b) - money(a)).map(id => <span key={id} className={(id === cur && !res ? 'cur ' : '') + (r.out?.[id] ? 'out' : '')}><Avatar id={id} av={av} size={22} /> {id === myId ? 'คุณ' : nameOf(id)} <b>💰{money(id)}</b><small>🃏{hand(r, id).length}</small></span>)}</div>

    {/* ตาของคุณ */}
    {myTurn && <div className="turn-acts"><button className="primary big-roll" onClick={() => { sfx(sound, 'roll'); tx(c => rollDeal(c, myId, srvNow)); }}>🎲 ทอยหาดีล<small>เดินหมวกเจ้าสัว แล้วเป็นเจ้าของดีลที่หยุด</small></button>
      <button className="secondary" onClick={() => { sfx(sound, 'draw'); tx(c => drawTurn(c, myId, srvNow)); }}>🃏 จั่วการ์ด 2 ใบ<small>แล้วจบตา</small></button><p className="kbd-hint">⌨️ กด <kbd>R</kbd> ทอย • <kbd>D</kbd> จั่ว</p></div>}
    {!res && r.phase === 'turn' && !myTurn && <div className="waiting">⏳ รอ {nameOf(cur)} ทอยเต๋าหรือจั่วการ์ด… ({secs} วิ)</div>}

    {/* เจรจา */}
    {!res && r.phase === 'nego' && <div className={'nego' + (iBoss ? ' boss' : iPart ? ' part' : '')}>
      <div className="nego-h"><span className="nego-e">{D.e}</span><div><b>{D.n} • {v} ล้าน</b><small>เจ้าของดีล: <Avatar id={n.boss} av={av} size={18} /> {n.boss === myId ? 'คุณ' : nameOf(n.boss)} • เหลือ {secs} วิ</small></div></div>
      <div className="seats">{D.need.map(p => { const who = n.seats?.[p]; const by = n.blocked?.[p];
        return <div key={p} className={'seat-p' + (who ? '' : ' empty')} style={{ '--pc': PARTNERS[p].c }}><Dot p={p} size={26} off={!who} /><span><b>{PARTNERS[p].n}</b>{who ? <small><Avatar id={who} av={av} size={16} /> {who === myId ? 'คุณ' : nameOf(who)}{who !== r.ctrl[p] ? ' (เด็กเส้น)' : ''}</small> : <small className="bad">⛔ ถูกกันโดย {nameOf(by)} — ต้องมีเด็กเส้นมาแทน</small>}</span></div>; })}</div>
      <SecH icon="💵">ข้อเสนอแบ่งเงิน <small>{iBoss ? 'กด +/− ปรับส่วนแบ่ง แล้วกดส่งข้อเสนอ' : 'เจ้าของดีลเป็นคนเสนอ'}</small></SecH>
      <div className="offer">{parts.map(id => { const isB = id === n.boss; const amt = isB ? (draft ? bossShare : offer[id] || 0) : offer[id] || 0; const st = isB ? '🎩' : n.ok?.[id] === true ? '✅' : n.ok?.[id] === false ? '❌' : '⏳';
        return <div key={id} className={'of-row' + (id === myId ? ' me' : '')}><Avatar id={id} av={av} size={26} /><span className="of-name">{id === myId ? 'คุณ' : nameOf(id)}{isB ? ' (เจ้าของดีล)' : ''}</span>
          {iBoss && !isB && <button type="button" className="of-btn" onClick={() => bump(id, -1)}>−</button>}<b className="of-amt">{amt}<small> ล.</small></b>{iBoss && !isB && <button type="button" className="of-btn" onClick={() => bump(id, 1)}>+</button>}<span className="of-st">{st}</span></div>; })}</div>
      {iBoss && draft && <button className="secondary wide" onClick={sendOffer}>📨 ส่งข้อเสนอนี้</button>}
      {iBoss && <div className="nego-acts"><button className="primary" disabled={!canClose(n) || !!draft} onClick={() => { sfx(sound, 'confirm'); tx(c => closeDeal(c, myId, srvNow)); }}>🤝 ปิดดีล!</button><button className="secondary" onClick={() => { if (confirm('ถอนตัวจากดีลนี้? (ดีลล่ม)')) tx(c => cancelDeal(c, myId, srvNow)); }}>💨 ถอนตัว</button></div>}
      {iBoss && !canClose(n) && <p className="hint">{D.need.some(x => !n.seats?.[x]) ? '⛔ ยังมีหุ้นส่วนถูกกันอยู่ — ใช้เด็กเส้นเติมเอง หรือรอคนอื่น' : '⏳ รอทุกคนในดีลกด “ตกลง” ก่อน ถึงจะปิดดีลได้'}</p>}
      {iPart && <div className="nego-acts"><button className={'primary' + (n.ok?.[myId] === true ? ' on' : '')} onClick={() => { sfx(sound, 'confirm'); tx(c => answer(c, myId, true, srvNow)); }}>✅ ตกลง ({offer[myId] || 0} ล้าน)</button><button className={'secondary' + (n.ok?.[myId] === false ? ' on' : '')} onClick={() => { sfx(sound, 'click'); tx(c => answer(c, myId, false, srvNow)); }}>❌ ไม่เอา ขอเพิ่ม</button></div>}
      {!iBoss && !iPart && meIn && <p className="hint">คุณไม่ได้อยู่ในดีลนี้ — แต่ใช้การ์ดขัดขาหรือแทรกเข้าดีลได้ (คุยต่อรองในห้องเสียง)</p>}
    </div>}

    {/* การ์ดในมือ */}
    {!res && meIn && <>
      <SecH icon="🃏">การ์ดในมือ <small>{myHand.length}/{HAND_MAX} ใบ • แตะเพื่อใช้</small></SecH>
      <div className="dc-hand">{myHand.map(c => { const { t, p } = cparse(c); const ok = usable(c);
        return <button type="button" key={c} className={'dc' + (ok ? ' ok' : ' dim') + (pickCard === c ? ' sel' : '')} style={p ? { '--pc': PARTNERS[p].c } : undefined} onClick={() => tapCard(c)}>
          <span className="dc-e">{t === 'link' ? PARTNERS[p].e : CARDS[t].e}</span><b>{cardTitle(c)}</b><small>{CARDS[t].text}</small></button>; })}
        {!myHand.length && <p className="hint">ไม่มีการ์ด — จั่วได้ตอนถึงตา</p>}</div>
      {pk === 'stop' && <div className="act-box"><b>✋ กันหุ้นส่วนรายไหน?</b><div className="pick-p">{D && D.need.filter(p => n.seats?.[p]).map(p => <button type="button" key={p} style={{ '--pc': PARTNERS[p].c }} onClick={() => play(pickCard, p)}><Dot p={p} size={24} />{PARTNERS[p].n}<small>{nameOf(n.seats[p])}</small></button>)}</div></div>}
      {pk === 'take' && <div className="act-box"><b>📝 ซื้อกิจการหุ้นส่วนรายไหน?</b><div className="pick-p">{PK.filter(p => r.ctrl[p] !== myId).map(p => <button type="button" key={p} style={{ '--pc': PARTNERS[p].c }} onClick={() => { if (confirm(`ซื้อ${PARTNERS[p].n}ต่อจาก ${nameOf(r.ctrl[p])}?`)) play(pickCard, p); }}><Dot p={p} size={24} />{PARTNERS[p].n}<small>{nameOf(r.ctrl[p])}</small></button>)}</div></div>}
    </>}

    {res && <>
      <Outcome art="win" tone={res.winner === myId ? 'good' : ''} title={`${nameOf(res.winner)} รวยที่สุด! 🏆`}>เงินรวม {money(res.winner)} ล้าน • ปิดดีลไป {r.closed || 0} ดีล</Outcome>
      <div className="money-row big">{(res.rank || []).map((id, i) => <span key={id}><em>{i + 1}</em><Avatar id={id} av={av} size={26} /> {nameOf(id)} <b>💰{money(id)} ล้าน</b></span>)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}

    {isHost && !res && (cur !== myId || r.phase === 'nego' || r.order.some(id => inGame(r, id) && !room.players?.[id])) && <HostBar>
      <button className="secondary" onClick={() => { if (confirm(r.phase === 'nego' ? 'จบการเจรจานี้เลย (ดีลล่ม)?' : `ให้ ${nameOf(cur)} จั่วการ์ดแล้วข้ามตา?`)) tx(c => forceDeal(c, srvNow)); }}>⏭️ {r.phase === 'nego' ? 'จบเจรจา' : `ข้ามตา ${nameOf(cur)}`}</button>
      {r.order.filter(id => inGame(r, id) && !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickDeal(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}</HostBar>}
    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...(r.log || [])].reverse().slice(0, 8).map((e, i) => <li key={i} className={e.win ? 'win-line' : ''}>{nm(e.text)}</li>)}</ul>
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
      <span>🤝 ดีลต้องใช้หุ้นส่วนตามไอคอน เจ้าของดีลเสนอแบ่งเงิน ทุกคนในดีลกดตกลงครบ → ปิดดีล รับเงินตามที่ตกลง</span>
      <span>⏱️ เจรจา {NEGO_MS / 1000} วิ (เล่นการ์ดต่อเวลาได้) ไม่จบ = ดีลล่ม • ปิดดีลครบ {GOAL} ดีล ใครรวยสุดชนะ</span></div>
    <div className="dc-hand lobby">{Object.entries(CARDS).map(([t, c]) => <div key={t} className="dc ok"><span className="dc-e">{c.e}</span><b>{c.n}</b><small>{c.text}</small></div>)}</div>
  </>;
}
