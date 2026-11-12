// เกม "ตำแหลก!" — ไพ่ 4 รส (เผ็ด เปรี้ยว หวาน เค็ม) ลงให้ตรงรสหรือตรงเลข ใครหมดมือก่อนชนะ
// โหมดโหดไม่เลี้ยง: ซ้อนไพ่บวกได้ • จั่วจนกว่าจะเจอใบที่ลงได้ • 7 แลกมือ • 0 ส่งต่อทั้งวง • ไพ่ในมือถึง 25 ใบ = ตกรอบ
// (กลไกแนวเกมไพ่ลงสีที่มีทั่วไป แต่ชื่อ ไพ่ ภาพ เป็นของเราเองทั้งหมด)
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint } from './rand.js';
import { Avatar, PlayerGrid, HostBar, SecH, Outcome, Leaderboard, TimerRing } from './ui.jsx';
import './cardgames.css';
import './tam.css';

export const TAM_MIN = 2, TAM_MAX = 10, MERCY = 25, HAND0 = 7;
export const TAM_SCORE = { win: 3 };
export const TURN_MS = 30000, PICK_MS = 15000;
export const FLAVORS = { r: { n: 'เผ็ด', e: '🌶️' }, g: { n: 'เปรี้ยว', e: '🍋' }, y: { n: 'หวาน', e: '🍯' }, b: { n: 'เค็ม', e: '🦀' } };
export const FL = ['r', 'g', 'y', 'b'];
export const TAM_CARDS = {
  sk: { n: 'ข้ามคิว', ico: '⏭️', text: 'คนถัดไปโดนข้าม' },
  rv: { n: 'กลับลำ', ico: '🔄', text: 'กลับทิศทางการเล่น (เหลือ 2 คน = ข้าม)' },
  d2: { n: 'พริก +2', draw: 2, text: 'คนถัดไปจั่ว 2 • ซ้อนได้' },
  d4: { n: 'พริก +4', draw: 4, text: 'คนถัดไปจั่ว 4 • ซ้อนได้' },
  da: { n: 'เทกระจาด', ico: '🧺', text: 'ทิ้งไพ่รสเดียวกันทั้งมือไปพร้อมกัน' },
  se: { n: 'เหมาร้าน', ico: '🛒', text: 'ข้ามทุกคน แล้วคุณได้เล่นต่ออีกตา' },
  r4: { n: 'ย้อนศร +4', draw: 4, wild: true, text: 'กลับทิศ + คนถัดไปจั่ว 4 • เลือกรสใหม่' },
  p6: { n: 'เผ็ดตาย +6', draw: 6, wild: true, text: 'คนถัดไปจั่ว 6 • เลือกรสใหม่' },
  p10: { n: 'นรกพริก +10', draw: 10, wild: true, text: 'คนถัดไปจั่ว 10 • เลือกรสใหม่' },
  ru: { n: 'สุ่มรส', ico: '🎰', wild: true, text: 'คนถัดไปเลือกรส แล้วเปิดไพ่จนกว่าจะเจอรสนั้น เก็บไว้ทั้งหมด' },
};
export const NUM_TXT = { 7: 'แลกมือ', 0: 'ส่งต่อ' };
const ACT_ORDER = ['sk', 'rv', 'd2', 'd4', 'da', 'se', 'r4', 'p6', 'p10', 'ru'];
// รหัสไพ่: รส+ค่า-ลำดับ เช่น r7-12, gd2-40 • ไพ่เปลี่ยนรสขึ้นต้นด้วย w เช่น wp10-130
export const parse = id => { const b = String(id).split('-')[0]; return b[0] === 'w' ? { c: null, v: b.slice(1) } : { c: b[0], v: b.slice(1) }; };
export const isNum = v => /^\d$/.test(v);
export const cardName = id => { const { c, v } = parse(id); const f = c ? ' ' + FLAVORS[c].e : ''; return isNum(v) ? `${v}${NUM_TXT[v] ? ' ' + NUM_TXT[v] : ''}${f}` : `${TAM_CARDS[v]?.n || v}${f}`; };

// ---------- สำรับ ----------
export const DECK_PLAN = { num: 2, sk: 2, rv: 2, d2: 2, d4: 2, da: 2, se: 1, r4: 4, p6: 4, p10: 2, ru: 4 };
export function tamDeck() {
  const d = []; let k = 0; const add = (b, n) => { for (let i = 0; i < n; i++) d.push(`${b}-${k++}`); };
  FL.forEach(c => { for (let v = 0; v <= 9; v++) add(c + v, DECK_PLAN.num); ['sk', 'rv', 'd2', 'd4', 'da', 'se'].forEach(v => add(c + v, DECK_PLAN[v])); });
  ['r4', 'p6', 'p10', 'ru'].forEach(v => add('w' + v, DECK_PLAN[v]));
  return shuffle(d);
}
export function makeTamRound(ids, opts = {}, number = 1, t0 = Date.now()) {
  const deck = tamDeck(); const hands = {}, alive = {};
  ids.forEach(id => { hands[id] = deck.splice(0, HAND0); alive[id] = true; });
  const i = deck.findIndex(c => isNum(parse(c).v)); const first = deck.splice(i, 1)[0];
  return { number, kind: 'tam', order: shuffle(ids), turn: 0, dir: 1, alive, hands, deck, discard: [first], color: parse(first).c, stack: 0, stackMin: 0, phase: 'play', drew: false, pick: null, at: t0 + 3000, stuck: 0, outs: null, log: [], startedAt: t0 };
}

// ---------- ตรรกะ (ทำงานบนข้อมูลห้องทั้งก้อนใน transaction) ----------
const hand = (r, id) => r.hands?.[id] || [];
const topOf = r => { const d = r.discard || []; return d[d.length - 1]; };
export const curOf = r => r.order[r.turn];
const alives = r => r.order.filter(id => r.alive?.[id]);
function say(r, text, extra) { r.log = [...(r.log || []), { text, t: Date.now(), ...extra }].slice(-40); }
function stepFrom(r, from, k = 1) {
  const n = r.order.length; let t = from;
  for (let s = 0; s < k; s++) for (let i = 1; i <= n; i++) { const j = (((t + r.dir * i) % n) + n) % n; if (r.alive?.[r.order[j]]) { t = j; break; } }
  return t;
}
function advance(r, now, k = 1) { r.turn = stepFrom(r, r.turn, k); r.drew = false; r.at = now; r.phase = 'play'; r.pick = null; }
export function canPlay(r, card) {
  const { c, v } = parse(card);
  if (r.stack > 0) { const dv = TAM_CARDS[v]?.draw || 0; return dv > 0 && dv >= (r.stackMin || 0); }
  if (!c) return true;
  const t = parse(topOf(r));
  return c === r.color || (!!t.c && v === t.v);
}
function drawOne(r) {
  if (!(r.deck || []).length) { const d = r.discard || []; if (d.length <= 1) return null; r.deck = shuffle(d.slice(0, -1)); r.discard = d.slice(-1); }
  const deck = [...r.deck]; const c = deck.shift(); r.deck = deck; return c;
}
function out(cur, id, why, act) {
  const r = cur.round; if (!r.alive?.[id]) return;
  r.alive[id] = false; r.deck = [...(r.deck || []), ...shuffle(hand(r, id))]; r.hands[id] = []; r.outs = [...(r.outs || []), id];
  say(r, why, { by: id, act, out: true });
}
function finish(cur, winner, why) {
  const r = cur.round; const points = {}, sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { points[id] = id === winner ? TAM_SCORE.win : 0; sc[id] = (sc[id] || 0) + points[id]; });
  r.phase = 'done'; r.pick = null; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'tam', winner: winner || null, points, why };
  return cur;
}
// หลังทุกการกระทำ: ใครถือไพ่ถึง 25 ตกรอบ • เหลือคนเดียวชนะ • คนที่ถึงตาหลุดไปแล้ว → ข้าม • ไพ่ตันทั้งวง → นับไพ่
function settle(cur, now) {
  const r = cur.round; if (cur.status !== 'playing') return cur;
  alives(r).forEach(id => { const n = hand(r, id).length; if (n >= MERCY) out(cur, id, `🥵 {${id}} ถือไพ่ ${n} ใบ เผ็ดจนทนไม่ไหว — ตกรอบ!`, '🥵 ไม่ไหวแล้ว!'); });
  const al = alives(r); if (al.length <= 1) return finish(cur, al[0] || null, 'last');
  if (!r.alive[curOf(r)]) advance(r, now);
  if ((r.stuck || 0) >= al.length * 2) { const w = [...al].sort((a, b) => hand(r, a).length - hand(r, b).length)[0]; say(r, '🧱 ไพ่ตันทั้งวง ไม่มีใครลงได้ — นับไพ่ในมือ ใครน้อยสุดชนะ'); return finish(cur, w, 'stuck'); }
  return cur;
}
function passAll(r) {
  const al = alives(r); const hs = Object.fromEntries(al.map(id => [id, hand(r, id)]));
  al.forEach(id => { r.hands[r.order[stepFrom(r, r.order.indexOf(id), 1)]] = hs[id]; });
}

export function playCard(cur, me, card, color, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'play' || curOf(r) !== me || !r.alive?.[me]) return;
  const h = hand(r, me); if (!h.includes(card) || !canPlay(r, card)) return;
  const { c, v } = parse(card); const def = TAM_CARDS[v] || {};
  if (!c && v !== 'ru' && !FL.includes(color)) return; // ไพ่เปลี่ยนรสต้องเลือกรส
  r.hands[me] = h.filter(x => x !== card); r.stuck = 0;
  let extra = [];
  if (v === 'da') { extra = hand(r, me).filter(x => parse(x).c === c); r.hands[me] = hand(r, me).filter(x => parse(x).c !== c); }
  r.discard = [...(r.discard || []), ...extra, card];
  if (c) r.color = c; else if (v !== 'ru') r.color = color;
  const left = hand(r, me).length;
  const act = def.draw ? `+${def.draw}!` : { sk: '⏭️ ข้าม!', rv: '🔄 กลับลำ!', da: `🧺 เท ${extra.length + 1} ใบ!`, se: '🛒 เหมาร้าน!', ru: '🎰 สุ่มรส!', 7: '🔁 แลกมือ!', 0: '🔃 ส่งต่อ!' }[v] || `ลง ${v}`;
  say(r, `🃏 {${me}} ลง “${cardName(card)}”${!c && v !== 'ru' ? ` เปลี่ยนเป็นรส${FLAVORS[color].n} ${FLAVORS[color].e}` : ''}${extra.length ? ` แล้วเทรส${FLAVORS[c].n}ทิ้งอีก ${extra.length} ใบ` : ''}`, { by: me, act: left === 1 ? '🌶️ ใบสุดท้าย!' : act });
  if (!left) { say(r, `🏆 {${me}} หมดมือ!`, { by: me, act: '🏆 หมดมือ!' }); return finish(cur, me, 'empty'); }
  if (def.draw) { if (v === 'r4') r.dir = -r.dir; r.stack = (r.stack || 0) + def.draw; r.stackMin = def.draw; advance(r, now); return settle(cur, now); }
  switch (v) {
    case 'sk': advance(r, now, 2); break;
    case 'rv': r.dir = -r.dir; advance(r, now, alives(r).length === 2 ? 2 : 1); break;
    case 'se': r.drew = false; r.at = now; break; // ข้ามทุกคน → ได้เล่นต่อ
    case 'ru': { const vi = stepFrom(r, r.turn, 1); r.turn = vi; r.phase = 'roulette'; r.pick = { by: r.order[vi], until: now + PICK_MS }; r.drew = false; r.at = now; break; }
    case '7': if (alives(r).length > 1) { r.phase = 'pick7'; r.pick = { by: me, until: now + PICK_MS }; r.at = now; } else advance(r, now); break;
    case '0': passAll(r); say(r, '🔃 ทุกคนส่งไพ่ทั้งมือให้คนถัดไปตามทิศ!'); advance(r, now); break;
    default: advance(r, now);
  }
  return settle(cur, now);
}
// 7 แลกมือ: คนลงเลือกคนที่จะแลกไพ่ทั้งมือด้วย
export function swap7(cur, me, target, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'pick7' || r.pick?.by !== me || target === me || !r.alive?.[target]) return;
  const a = hand(r, me), b = hand(r, target); r.hands[me] = b; r.hands[target] = a;
  say(r, `🔁 {${me}} แลกไพ่ทั้งมือกับ {${target}} (${a.length} ↔ ${b.length} ใบ)`, { by: target, act: '😱 โดนแลก!' });
  advance(r, now); return settle(cur, now);
}
// สุ่มรส: คนโดนเลือกรส แล้วเปิดไพ่จากกองจนเจอรสนั้น เก็บทั้งหมด แล้วจบตา
export function rouletteSpin(cur, me, color, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'roulette' || r.pick?.by !== me || !FL.includes(color)) return;
  const got = []; let hit = false;
  while (hand(r, me).length + got.length < MERCY) { const c = drawOne(r); if (!c) break; got.push(c); if (parse(c).c === color) { hit = true; break; } }
  r.hands[me] = [...hand(r, me), ...got]; r.color = color;
  say(r, `🎰 {${me}} เลือกรส${FLAVORS[color].n} ${FLAVORS[color].e} เปิดไป ${got.length} ใบ${hit ? '' : ' (ยังไม่เจอ)'}`, { by: me, act: `🎰 +${got.length}` });
  advance(r, now); return settle(cur, now);
}
// โดนสะสม: รับไพ่ทั้งหมดแล้วจบตา
export function takeStack(cur, me, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'play' || curOf(r) !== me || !(r.stack > 0)) return;
  const n = r.stack; const got = []; for (let i = 0; i < n; i++) { const c = drawOne(r); if (!c) break; got.push(c); }
  r.hands[me] = [...hand(r, me), ...got]; r.stack = 0; r.stackMin = 0; r.stuck = 0;
  say(r, `🥵 {${me}} รับไป ${got.length} ใบ!`, { by: me, act: `🥵 +${got.length}` });
  advance(r, now); return settle(cur, now);
}
// จั่วจนกว่าจะได้ใบที่ลงได้ (แล้วจะลงหรือผ่านก็ได้)
export function drawUntil(cur, me, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'play' || curOf(r) !== me || r.stack > 0 || r.drew) return;
  const got = []; let ok = false;
  while (hand(r, me).length + got.length < MERCY) { const c = drawOne(r); if (!c) break; got.push(c); if (canPlay(r, c)) { ok = true; break; } }
  r.hands[me] = [...hand(r, me), ...got]; r.drew = true;
  say(r, `🃏 {${me}} จั่วไป ${got.length} ใบ${ok ? '' : ' ยังไม่เจอใบที่ลงได้'}`, { by: me, act: `🃏 +${got.length}` });
  if (!ok) { r.stuck = (r.stuck || 0) + 1; advance(r, now); }
  return settle(cur, now);
}
export function passTurn(cur, me, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'play' || curOf(r) !== me || !r.drew || r.stack > 0) return;
  say(r, `⏩ {${me}} ผ่าน`, { by: me, act: '⏩ ผ่าน' }); advance(r, now); return settle(cur, now);
}
// หมดเวลา / หัวหน้าห้องสั่ง: ระบบเล่นแทน (รับสะสม หรือจั่วแล้วผ่าน • เลือกแลก/เลือกรสแบบสุ่ม)
function autoMove(cur, now) {
  const r = cur.round; const me = curOf(r);
  if (r.phase === 'pick7') { const o = alives(r).filter(id => id !== r.pick.by); return swap7(cur, r.pick.by, o[rint(o.length)], now); }
  if (r.phase === 'roulette') return rouletteSpin(cur, r.pick.by, FL[rint(4)], now);
  if (r.phase !== 'play') return;
  if (r.stack > 0) return takeStack(cur, me, now);
  if (!r.drew) { drawUntil(cur, me, now); if (cur.status !== 'playing' || curOf(cur.round) !== me || cur.round.phase !== 'play') return cur; }
  return passTurn(cur, me, now) || cur;
}
export function tamTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'tam' || cur.status !== 'playing') return;
  const due = r.phase === 'play' ? now >= (r.at || 0) + TURN_MS : now >= (r.pick?.until || 0);
  return due ? autoMove(cur, now) : undefined;
}
export const forceMove = (cur, now) => (cur.status === 'playing' && cur.round?.kind === 'tam' ? autoMove(cur, now) : undefined);
export function kickTam(cur, id, now) {
  const r = cur.round; if (!r.alive?.[id] || cur.players?.[id] || r.phase === 'done') return;
  out(cur, id, `🚪 {${id}} หลุดออกจากวง — ไพ่กลับเข้ากอง`, '🚪 ออกแล้ว');
  if (r.pick?.by === id) { r.phase = 'play'; r.pick = null; }
  return settle(cur, now);
}

// ---------- ไพ่ ----------
export function TamCard({ id, size = 'md', selected, dim, onClick }) {
  if (!id) return <div className={`gcard ${size} tc tc-empty`} />;
  const { c, v } = parse(id); const def = TAM_CARDS[v]; const num = isNum(v);
  const big = num ? v : def?.draw ? `+${def.draw}` : def?.ico || '?';
  const label = num ? NUM_TXT[v] : def?.n;
  const cls = `gcard ${size} tc ${c ? 'tc-' + c : 'tc-w'}${selected ? ' sel' : ''}${dim ? ' dim' : ''}${onClick ? ' tap' : ''}`;
  const inner = <>
    <span className="tc-ix">{num ? v : def?.draw ? `+${def.draw}` : def?.ico}</span>
    <span className="tc-fl">{c ? FLAVORS[c].e : '🎨'}</span>
    <span className="tc-mortar"><span className={'tc-big' + (num ? ' num' : def?.draw ? ' plus' : ' ico')}>{big}</span></span>
    {label && <b className="tc-lb">{label}</b>}
  </>;
  const title = cardName(id);
  return onClick ? <button type="button" className={cls} onClick={onClick} title={title}>{inner}</button> : <div className={cls} title={title}>{inner}</div>;
}
export const TamBack = ({ size = 'sm' }) => <div className={`gcard ${size} tc-back`}><span>🌶️</span><b>ตำแหลก</b></div>;
const FlavorPick = ({ onPick, cur }) => <div className="fl-pick">{FL.map(c => <button type="button" key={c} className={'fl-btn fl-' + c + (cur === c ? ' on' : '')} onClick={() => onPick(c)}><span>{FLAVORS[c].e}</span>{FLAVORS[c].n}</button>)}</div>;

// ---------- วงไพ่ (ทุกคนนั่งรอบกระด้ง เราอยู่ล่างสุด) ----------
const seatXY = (k, n) => { const a = Math.PI / 2 + (k / n) * Math.PI * 2; return { x: 50 + Math.cos(a) * 37, y: 50 + Math.sin(a) * 39 }; };
const DECK_XY = { x: 39, y: 48 }, PILE_XY = { x: 61, y: 48 };
const MiniBacks = ({ n }) => <span className="mini-backs">{Array.from({ length: Math.min(n, 7) }, (_, i) => <i key={i} />)}</span>;
function TamTable({ r, room, myId, av, nameOf, res, canDraw, onDraw, pick, onPick }) {
  const order = r.order || []; const n = order.length; const meK = Math.max(0, order.indexOf(myId));
  const pos = id => seatXY((order.indexOf(id) - meK + n) % n, n);
  const cur = curOf(r); const deck = r.deck || []; const disc = r.discard || []; const top = disc[disc.length - 1];
  const [flies, setFlies] = useState([]); const [bubbles, setBubbles] = useState({}); const snap = useRef(null); const seq = useRef(0);
  useEffect(() => {
    const s = { deck: deck.length, disc: disc.length, hands: Object.fromEntries(order.map(id => [id, hand(r, id).length])), log: r.log || [] };
    const p = snap.current; snap.current = s; if (!p) return;
    const add = []; const k = () => ++seq.current;
    let fromDeck = Math.max(0, p.deck - s.deck), toPile = Math.max(0, s.disc - p.disc); const faces = disc.slice(disc.length - toPile);
    const gain = [], lose = [];
    order.forEach(id => { const d = s.hands[id] - (p.hands[id] || 0); if (d > 0) gain.push([id, d]); if (d < 0) lose.push([id, -d]); });
    gain.forEach(g => { const m = Math.min(g[1], fromDeck); for (let i = 0; i < Math.min(m, 4); i++) add.push({ k: k(), from: DECK_XY, to: pos(g[0]), delay: i * 120 }); fromDeck -= m; g[1] -= m; });
    lose.forEach(l => { const m = Math.min(l[1], toPile); for (let i = 0; i < Math.min(m, 3); i++) add.push({ k: k(), from: pos(l[0]), to: PILE_XY, face: faces[faces.length - 1 - i] || top, delay: i * 120 }); toPile -= m; l[1] -= m; });
    const gs = gain.filter(g => g[1] > 0), ls = lose.filter(l => l[1] > 0);
    gs.forEach((g, i) => { const l = ls[i % Math.max(1, ls.length)]; if (l) for (let j = 0; j < Math.min(g[1], 3); j++) add.push({ k: k(), from: pos(l[0]), to: pos(g[0]), delay: 80 + j * 110 }); });
    if (add.length) { setFlies(f => [...f, ...add].slice(-14)); const ks = add.map(a => a.k); setTimeout(() => setFlies(f => f.filter(x => !ks.includes(x.k))), 1400); }
    const fresh = s.log.length > p.log.length ? s.log.slice(p.log.length) : (s.log.length && s.log[s.log.length - 1]?.t !== p.log[p.log.length - 1]?.t ? s.log.slice(-1) : []);
    fresh.filter(e => e.by && e.act).forEach(e => { const id = e.by, kk = k(); setBubbles(b => ({ ...b, [id]: { text: e.act, k: kk } })); setTimeout(() => setBubbles(b => (b[id]?.k === kk ? { ...b, [id]: null } : b)), 2500); });
  });
  const angRef = useRef(null); let ang = angRef.current ?? 90;
  if (cur && !res) { const c = pos(cur); let a = Math.atan2((c.y - 50) * 0.92, c.x - 50) * 180 / Math.PI; if (angRef.current != null) { while (a - angRef.current > 180) a -= 360; while (a - angRef.current < -180) a += 360; } ang = a; angRef.current = a; }
  const fl = FLAVORS[r.color] || FLAVORS.r;
  return <div className={'rt tam-rt' + (n > 6 ? ' crowd' : '')}>
    <div className="rt-felt" />
    {!res && <div className={'tam-dir' + (r.dir < 0 ? ' ccw' : '')}><i>➜</i><i>➜</i></div>}
    {!res && <div className="rt-pointer" style={{ transform: `translate(-50%,-50%) rotate(${ang}deg)` }}><i /></div>}
    <div className="rt-info tam-info"><span className={'fl-chip fl-' + r.color}>{fl.e} รส{fl.n}</span><span>{r.dir < 0 ? '↺ ทวนเข็ม' : '↻ ตามเข็ม'}</span></div>
    <button type="button" className={'rt-deck' + (canDraw ? ' can' : '')} style={{ left: DECK_XY.x + '%', top: DECK_XY.y + '%' }} onClick={canDraw ? onDraw : undefined} disabled={!canDraw} aria-label="กองจั่ว">
      <TamBack size="sm" /><span className="pile-n">{deck.length}</span>{canDraw && <span className="rt-tap">{r.stack > 0 ? `แตะเพื่อรับ +${r.stack}` : 'แตะเพื่อจั่ว'}</span>}
    </button>
    <div className={'rt-pile tam-pile fl-' + r.color} style={{ left: PILE_XY.x + '%', top: PILE_XY.y + '%' }}>
      <TamCard key={disc.length} id={top} size="sm" />
    </div>
    {r.stack > 0 && !res && <div key={'st' + r.stack} className={'tam-stack' + (r.stack >= 10 ? ' mega' : '')}>+{r.stack}</div>}
    {order.map(id => {
      const { x, y } = pos(id); const alive = !!r.alive?.[id]; const isCur = id === cur && alive && !res; const cnt = hand(r, id).length; const gone = !room.players?.[id];
      const canPick = pick?.includes(id); const b = bubbles[id];
      return <div key={id} role={canPick ? 'button' : undefined} onClick={canPick ? () => onPick(id) : undefined}
        className={'seat' + (isCur ? ' turn' : '') + (alive ? '' : ' out') + (id === myId ? ' me' : '') + (canPick ? ' pick' : '')} style={{ left: x + '%', top: y + '%' }}>
        {isCur && <span className="seat-arrow">▼</span>}
        <div className="seat-av"><Avatar id={id} av={av} size={40} dead={!alive} />{gone && alive && <span className="seat-off">📴</span>}{r.pick?.by === id && <span className="seat-tg">{r.phase === 'roulette' ? '🎰' : '🔁'}</span>}</div>
        <b className="seat-name">{id === myId ? 'คุณ' : nameOf(id)}</b>
        {alive ? <span className="seat-cards"><MiniBacks n={cnt} /><em className={cnt >= 20 ? 'hot' : cnt === 1 ? 'one' : ''}>{cnt}</em></span> : <span className="seat-out">🥵 ตกรอบ</span>}
        {b && <span key={b.k} className="seat-bubble">{b.text}</span>}
      </div>;
    })}
    {flies.map(f => <div key={f.k} className="fly" style={{ '--fx': f.from.x + '%', '--fy': f.from.y + '%', '--tx': f.to.x + '%', '--ty': f.to.y + '%', animationDelay: f.delay + 'ms' }}>{f.face ? <TamCard id={f.face} size="sm" /> : <TamBack size="sm" />}</div>)}
  </div>;
}

// ไพ่ในมือแบบพัด (เรียงตามรส แล้วตามเลข) — ใบที่ลงไม่ได้จะจางลงตอนถึงตาเรา
const sortKey = id => { const { c, v } = parse(id); return [c ? FL.indexOf(c) : 9, isNum(v) ? +v : 10 + ACT_ORDER.indexOf(v)]; };
function TamFan({ ids, selected, onTap, playable }) {
  const box = useRef(null); const [w, setW] = useState(360);
  useEffect(() => { const el = box.current; if (!el) return; const f = () => setW(el.clientWidth || 360); f(); if (typeof ResizeObserver === 'undefined') return; const ro = new ResizeObserver(f); ro.observe(el); return () => ro.disconnect(); }, []);
  const n = ids.length; const cw = w >= 640 ? 100 : Math.round(Math.max(66, Math.min(92, w * 0.235)));
  const pad = 14; const step = n > 1 ? Math.max(cw * 0.36, Math.min(cw + 6, (w - pad * 2 - cw) / (n - 1))) : 0; const total = cw + step * Math.max(0, n - 1); const x0 = Math.max(pad, (w - total) / 2);
  return <div className="fan tam-fan" ref={box} style={{ '--fcw': cw + 'px', height: Math.round(cw * 1.4) + 46 }}>
    <div className="fan-in" style={{ width: Math.max(w, total + pad * 2) }}>
      {ids.map((c, i) => { const off = i - (n - 1) / 2; const up = selected === c; const rot = n > 1 ? off * Math.min(2.5, 18 / n) : 0; const dy = Math.round(off * off * Math.min(1.2, 8 / n));
        return <div key={c} className={'fan-card' + (up ? ' up' : '')} style={{ left: x0 + i * step, zIndex: up ? 60 + i : i + 1, transform: `translateY(${up ? dy - 22 : dy}px) rotate(${up ? 0 : rot}deg)` }}>
          <TamCard id={c} size="md" selected={up} dim={playable && !playable(c)} onClick={onTap ? () => onTap(c) : undefined} /></div>; })}
      {!n && <p className="hint fan-empty">ไม่มีไพ่ในมือ</p>}
    </div>
  </div>;
}

export function TamGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack, srvNow }) {
  const r = room.round; const res = room.status === 'result' && room.result;
  const [sel, setSel] = useState(null);
  const myHand = hand(r, myId); const cur = curOf(r); const alive = alives(r); const meIn = !!r.alive?.[myId];
  const myTurn = !res && cur === myId && meIn && r.phase === 'play';
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c || c.status !== 'playing' || c.round?.kind !== 'tam') return; const R = c.round; R.hands = R.hands || {}; R.alive = R.alive || {}; return f(c); });
  const nm = s => String(s).replace(/\{([^}]+)\}/g, (_, id) => nameOf(id));
  useEffect(() => { setSel(null); }, [r.turn, r.phase, myHand.length, r.stack]);
  // หมดเวลา → ระบบเล่นแทน (ทุกเครื่องพยายาม transaction ทำให้เกิดครั้งเดียว)
  const deadline = r.phase === 'play' ? (r.at || 0) + TURN_MS : r.pick?.until || 0;
  const secs = Math.max(0, Math.ceil((deadline - srvNow) / 1000)); const due = !res && srvNow >= deadline;
  useEffect(() => { if (due) tx(c => tamTick(c, srvNow)); }, [due, r.turn, r.phase, r.at]);
  // เสียง
  const prev = useRef(null);
  useEffect(() => {
    const s = { turn: `${r.turn}-${r.phase}-${r.at}`, disc: (r.discard || []).length, deck: (r.deck || []).length, res: !!res, outs: (r.outs || []).length, stack: r.stack || 0 }; const p = prev.current; prev.current = s; if (!p) return;
    if (s.res && !p.res) { sfx(sound, res.winner === myId ? 'win' : 'lose'); return; }
    if (s.outs > p.outs) sfx(sound, 'death');
    else if (s.stack > p.stack) sfx(sound, s.stack >= 10 ? 'boom' : 'nope');
    else if (s.disc > p.disc) sfx(sound, 'card');
    else if (s.deck < p.deck) sfx(sound, 'draw');
    if (s.turn !== p.turn && cur === myId && meIn && (r.phase === 'play' || r.pick?.by === myId)) setTimeout(() => sfx(sound, 'yourTurn'), 200);
  });

  const sorted = [...myHand].sort((a, b) => { const A = sortKey(a), B = sortKey(b); return A[0] - B[0] || A[1] - B[1] || (a < b ? -1 : 1); });
  const ok = id => myTurn && canPlay(r, id);
  const selP = sel ? parse(sel) : null; const selWild = !!selP && !selP.c && selP.v !== 'ru';
  const play = (card, color) => { sfx(sound, 'card'); setSel(null); tx(c => playCard(c, myId, card, color, srvNow)); };
  const tapCard = id => {
    if (!myTurn) return;
    if (!ok(id)) { msg(r.stack > 0 ? `ตอนนี้ต้องซ้อนไพ่บวก +${r.stackMin} ขึ้นไป หรือกดรับ` : `ใบนี้ลงไม่ได้ — ต้องตรงรส${FLAVORS[r.color].n} ${FLAVORS[r.color].e} หรือตรงเลข`); return; }
    if (sel === id) { const p = parse(id); if (p.c || p.v === 'ru') play(id); return; }
    sfx(sound, 'click'); setSel(id);
  };
  const drawOrTake = () => { sfx(sound, 'draw'); tx(c => (r.stack > 0 ? takeStack(c, myId, srvNow) : drawUntil(c, myId, srvNow))); };
  const pickMine = r.pick?.by === myId && meIn && !res;
  useEffect(() => {
    const k = e => { if (!myTurn || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === ' ') { e.preventDefault(); if (r.stack > 0 || !r.drew) drawOrTake(); else { sfx(sound, 'click'); tx(c => passTurn(c, myId, srvNow)); } }
      else if (e.key === 'Enter' && sel) { e.preventDefault(); const p = parse(sel); if (p.c || p.v === 'ru') play(sel); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const ok2 = sorted.filter(ok); if (!ok2.length) return; e.preventDefault(); const i = ok2.indexOf(sel); const j = i < 0 ? 0 : (i + (e.key === 'ArrowRight' ? 1 : -1) + ok2.length) % ok2.length; sfx(sound, 'click'); setSel(ok2[j]); } };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  });
  const swapTo = id => { if (!confirm(`แลกไพ่ทั้งมือกับ ${nameOf(id)} (${hand(r, id).length} ใบ)?`)) return; sfx(sound, 'confirm'); tx(c => swap7(c, myId, id, srvNow)); };
  const pickWho = r.phase === 'play' ? cur : r.pick?.by;
  const nextId = r.order[stepFrom(r, r.turn, 1)];

  return <div className="boom-game tam-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number} • เหลือ {alive.length} คน • ไพ่ถึง {MERCY} ใบ = ตกรอบ</span><span className="cat-tag">{r.dir < 0 ? '↺ ทวนเข็ม' : '↻ ตามเข็ม'}</span></div>

    <div className="gcols"><div className="gmain"><TamTable r={r} room={room} myId={myId} av={av} nameOf={nameOf} res={res} canDraw={myTurn && (r.stack > 0 || !r.drew)} onDraw={drawOrTake}
      pick={r.phase === 'pick7' && pickMine ? alive.filter(id => id !== myId) : null} onPick={swapTo} /></div><div className="gside">

    {/* ตอนนี้ตาใคร */}
    {!res && r.phase === 'play' && (myTurn ? <div className={'turn-banner me tam-tb' + (r.stack > 0 ? ' hot' : '')}><TimerRing secs={secs} total={TURN_MS / 1000} size={48} />
      <div><b>{r.stack > 0 ? `🔥 โดนสะสม +${r.stack}!` : r.drew ? '🃏 จั่วได้ใบที่ลงได้แล้ว' : '🎯 ตาคุณ!'}</b><small>{r.stack > 0 ? `ซ้อนไพ่บวกตั้งแต่ +${r.stackMin} ขึ้นไป (รสไหนก็ได้) ส่งต่อ หรือกดรับ` : r.drew ? 'ลงไพ่ หรือกดผ่าน' : <>ลงไพ่ที่ตรงรส <b>{FLAVORS[r.color].e} {FLAVORS[r.color].n}</b> หรือตรงเลข • ไม่มีให้จั่ว</>}</small></div></div>
      : <div className="turn-banner tam-tb"><Avatar id={cur} av={av} size={30} /><div><b>ตาของ {nameOf(cur)} <span className="tb-secs">⏱ {secs}</span></b><small>{!meIn ? '🥵 คุณตกรอบแล้ว — ดูเพื่อนเล่นต่อได้' : r.stack > 0 ? `${nameOf(cur)} โดนสะสม +${r.stack} อยู่ — จะซ้อนต่อหรือรับ?` : nextId === myId ? 'ตาถัดไปคือคุณ เตรียมไพ่ไว้!' : 'รอสักครู่…'}</small></div></div>)}

    {/* 7 แลกมือ / สุ่มรส */}
    {!res && r.phase === 'pick7' && (pickMine ? <div className="turn-banner me tam-tb"><TimerRing secs={secs} total={PICK_MS / 1000} size={48} /><div><b>🔁 เลือกคนที่จะแลกไพ่ทั้งมือ</b><small>แตะรูปที่วงไพ่ หรือเลือกด้านล่าง • ไม่เลือกระบบสุ่มให้</small></div></div>
      : <div className="waiting">🔁 {nameOf(r.pick.by)} กำลังเลือกคนแลกไพ่ทั้งมือ… ({secs} วิ)</div>)}
    {!res && r.phase === 'pick7' && pickMine && <PlayerGrid ids={alive.filter(id => id !== myId)} av={av} nameOf={nameOf} small onPick={swapTo} note={id => `🃏 ${hand(r, id).length} ใบ`} />}
    {!res && r.phase === 'roulette' && (pickMine ? <div className="act-box tam-act"><b>🎰 โดนสุ่มรส! เลือกรสที่จะเปิดหา</b><small>เปิดไพ่จากกองไปเรื่อย ๆ จนกว่าจะเจอรสที่เลือก เก็บไว้ทั้งหมด แล้วจบตา • {secs} วิ</small><FlavorPick onPick={c => { sfx(sound, 'confirm'); tx(x => rouletteSpin(x, myId, c, srvNow)); }} /></div>
      : <div className="waiting">🎰 {nameOf(r.pick.by)} โดนสุ่มรส กำลังเลือกรส… ({secs} วิ)</div>)}

    {/* ไพ่ในมือ */}
    {!res && meIn && <>
      <SecH icon="🃏">ไพ่ในมือคุณ <small>{myHand.length} ใบ{myHand.length >= 18 ? ` • ⚠️ อีก ${MERCY - myHand.length} ใบตกรอบ!` : myTurn ? ' • แตะเพื่อเลือก แตะซ้ำเพื่อลง' : ''}</small></SecH>
      <TamFan ids={sorted} selected={sel} onTap={myTurn ? tapCard : undefined} playable={myTurn ? ok : null} />
      {myTurn && <div className="boom-actions">
        {sel && <div className="act-box tam-act"><b>ลง “{cardName(sel)}”{selWild ? ' แล้วเลือกรสใหม่' : ''}</b>
          <small>{TAM_CARDS[selP.v]?.text || (selP.v === '7' ? 'แล้วเลือกคนที่จะแลกไพ่ทั้งมือด้วย' : selP.v === '0' ? 'ทุกคนส่งไพ่ทั้งมือให้คนถัดไปตามทิศ' : 'แตะไพ่ซ้ำ หรือกดปุ่มด้านล่าง')}{selP.v === 'ru' && nextId ? ` (โดน ${nameOf(nextId)})` : ''}</small>
          {selWild ? <FlavorPick onPick={c => play(sel, c)} cur={r.color} /> : <button className="primary wide" onClick={() => play(sel)}>🃏 ลงไพ่ใบนี้</button>}</div>}
        {r.stack > 0 ? <button className="draw-btn hot" onClick={drawOrTake}><span>🥵</span> รับ +{r.stack} ใบ (จบตา)<small>{myHand.length + r.stack >= MERCY ? `⚠️ รับแล้วถึง ${MERCY} ใบ = ตกรอบ!` : `หรือซ้อนไพ่บวก +${r.stackMin} ขึ้นไปส่งต่อ`}</small></button>
          : !r.drew ? <button className="draw-btn" onClick={drawOrTake}><span>🃏</span> จั่วจนกว่าจะได้ใบที่ลงได้<small>จั่วแล้วจะลงต่อหรือผ่านก็ได้</small></button>
            : <button className="secondary wide" onClick={() => { sfx(sound, 'click'); tx(c => passTurn(c, myId, srvNow)); }}>⏩ ผ่าน (เก็บไพ่ไว้ในมือ)</button>}
        <p className="kbd-hint">⌨️ <kbd>←</kbd><kbd>→</kbd> เลือกไพ่ • <kbd>Enter</kbd> ลง • <kbd>Space</kbd> {r.stack > 0 ? 'รับ' : r.drew ? 'ผ่าน' : 'จั่ว'}</p>
      </div>}
    </>}

    {res && <>
      <Outcome art="win" tone={res.winner === myId ? 'good' : ''} title={res.winner ? (res.why === 'empty' ? `${nameOf(res.winner)} หมดมือก่อน! 🏆` : res.why === 'last' ? `${nameOf(res.winner)} รอดคนสุดท้าย! 🏆` : `${nameOf(res.winner)} ไพ่น้อยสุด! 🏆`) : 'ไม่มีใครรอดเลย!'}>
        {res.winner ? `ได้ +${TAM_SCORE.win}` : ''}{(r.outs || []).length ? <> • เผ็ดเกินทน ตกรอบ: <b>{r.outs.map(nameOf).join(', ')}</b></> : ''}</Outcome>
      <div className="tam-left">{[...r.order].sort((a, b) => (r.alive?.[b] ? 1 : 0) - (r.alive?.[a] ? 1 : 0) || hand(r, a).length - hand(r, b).length).map(id => <span key={id} className={r.alive?.[id] ? '' : 'out'}><Avatar id={id} av={av} size={24} dead={!r.alive?.[id]} /> {nameOf(id)} <b>{r.alive?.[id] ? `${hand(r, id).length} ใบ` : '🥵'}</b></span>)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}

    {isHost && !res && pickWho && (pickWho !== myId || alive.some(id => !room.players?.[id])) && <HostBar>
      {pickWho !== myId && <button className="secondary" onClick={() => { if (confirm(`ให้ระบบเล่นแทน ${nameOf(pickWho)} (หลุดหรือค้าง)?`)) tx(c => forceMove(c, srvNow)); }}>⏭️ เล่นแทน {nameOf(pickWho)}</button>}
      {alive.filter(id => !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickTam(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}</HostBar>}
    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...(r.log || [])].reverse().slice(0, 8).map((e, i) => <li key={i} className={e.out ? 'boom-line' : ''}>{nm(e.text)}</li>)}</ul>
    </div></div>
  </div>;
}

// ---------- ห้องรอ: กติกา + ไพ่ทุกแบบ ----------
export function TamLobby({ n }) {
  const total = FL.length * (10 * DECK_PLAN.num + ['sk', 'rv', 'd2', 'd4', 'da', 'se'].reduce((a, v) => a + DECK_PLAN[v], 0)) + ['r4', 'p6', 'p10', 'ru'].reduce((a, v) => a + DECK_PLAN[v], 0);
  const sample = ['r5', 'g7', 'y0', 'bsk', 'rrv', 'gd2', 'yd4', 'bda', 'rse', 'wr4', 'wp6', 'wp10', 'wru'];
  const txt = id => { const { v } = parse(id); return isNum(v) ? (v === '7' ? 'ลงแล้วเลือกคนแลกไพ่ทั้งมือ' : v === '0' ? 'ทุกคนส่งไพ่ทั้งมือให้คนถัดไป' : 'เลข 0–9 ลงตามรสหรือตามเลข') : TAM_CARDS[v].text; };
  return <>
    <div className="score-rules"><b>🌶️ สำรับ {total} ใบ • แจกคนละ {HAND0} ใบ • วงนี้ {Math.max(TAM_MIN, Math.min(TAM_MAX, n))} คน</b>
      <span>ลงไพ่ที่ <b>ตรงรส</b> หรือ <b>ตรงเลข/ตรงแบบ</b> กับใบบนกอง • ไพ่ดำ (🎨) ลงได้ทุกเมื่อแล้วเลือกรสใหม่</span>
      <span>🔥 โดนไพ่บวก → ซ้อนไพ่บวกที่เท่ากันหรือมากกว่าส่งต่อ หรือรับทั้งหมด • ไม่มีให้ลง → จั่วไปเรื่อย ๆ จนกว่าจะได้ใบที่ลงได้</span>
      <span>🥵 ถือไพ่ถึง {MERCY} ใบ = ตกรอบทันที • หมดมือก่อน หรือรอดคนสุดท้าย = ชนะ • ตาละ {TURN_MS / 1000} วิ หมดเวลาระบบจั่วแล้วผ่านให้</span></div>
    <div className="card-gallery tam-gallery">{sample.map(id => <div key={id} className="cg-item"><TamCard id={id + '-x'} size="sm" /><div><b>{cardName(id + '-x')}</b><small>{txt(id)}</small></div></div>)}</div>
  </>;
}
