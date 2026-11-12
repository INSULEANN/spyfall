// เกม "จับผีปอป" — บ้านนาดง มีผีปอปสิงอยู่ในร่างชาวบ้าน ทุกคนถือไพ่ดวงคว่ำไว้ ผลัดกันใส่ไพ่ซุบซิบ/หลักฐาน ครบ 7 แต้มต้องเปิดไพ่ดวง
// คืนเดือนดับ: ผีปอปออกหากิน เลือกเหยื่อ หมอธรรมคุ้มกัน ใครจะสาบาน (เปิดดวงตัวเอง) ก็รอดคืนนั้น • (กลไกแนวเกมล่าแม่มด แต่ไพ่ ชื่อ ภาพ เป็นของเราเอง)
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint, pickBad } from './rand.js';
import { Avatar, Phase, PlayerGrid, HostBar, SecH, Outcome, Leaderboard, RevealGrid } from './ui.jsx';
import { CardFace } from './cards.jsx';
import { CurseStage } from './stages.jsx';
import { Replay } from './replay.jsx';

export const CURSE_MIN = 4, CURSE_MAX = 12;
export const CURSE_SCORE = { town: 1, dark: 2 };
const SUS_MAX = 7, REVEAL_MS = 30000, NIGHT_MS = 50000;
export const CURSE_CARDS = {
  gossip: { n: 'ซุบซิบ', cat: 'red', pts: 1, text: 'ใส่ความสงสัย 1 แต้ม' },
  evidence: { n: 'กลิ่นคาวติดตัว', cat: 'red', pts: 3, text: 'ใส่ความสงสัย 3 แต้ม' },
  witness: { n: 'พยานเห็นกับตา', cat: 'red', pts: 7, text: 'ใส่ความสงสัย 7 แต้ม (เปิดดวงทันที)' },
  alibi: { n: 'ข้อแก้ตัว', cat: 'green', text: 'ลบความสงสัย 3 แต้ม' },
  stocks: { n: 'จับขังคอก', cat: 'green', text: 'คนนั้นต้องข้ามตาถัดไป' },
  arson: { n: 'ไฟไหม้ยุ้ง', cat: 'green', text: 'คนนั้นต้องทิ้งไพ่ทั้งมือ' },
  cleanse: { n: 'ล้างอาถรรพ์', cat: 'green', text: 'ปลดไพ่สีฟ้าทั้งหมดออกจากคนนั้น' },
  steal: { n: 'ลักขโมย', cat: 'green', text: 'ขโมยไพ่สุ่ม 2 ใบจากคนนั้น' },
  scapegoat: { n: 'แพะรับบาป', cat: 'green', two: true, text: 'ย้ายความสงสัยทั้งหมดจากคนแรกไปคนที่สอง' },
  ordain: { n: 'บวชเรียน', cat: 'blue', text: 'ติดตัว: ไพ่ซุบซิบใส่คนนี้ไม่ได้' },
  amulet: { n: 'ตะกรุดคุ้มกัน', cat: 'blue', text: 'ติดตัว: กันปอปกินตับได้ 1 ครั้ง' },
  bind: { n: 'ผูกเสี่ยว', cat: 'blue', two: true, text: 'ผูกสองคนเป็นเสี่ยวกัน คนหนึ่งตาย อีกคนตายตาม' },
  night: { n: 'คืนเดือนดับ', cat: 'black', text: 'จั่วได้ = ผีปอปออกหากินทันที' },
  ritual: { n: 'ปอปย้ายร่าง', cat: 'black', text: 'ทุกคนส่งไพ่ดวงสุ่ม 1 ใบให้คนถัดไป' },
};
export const FATE = { dark: { n: 'ปอปสิง', cat: 'dark', text: 'คุณคือผีปอป' }, pure: { n: 'ใจบริสุทธิ์', cat: 'pure', text: 'ชาวบ้านธรรมดา' }, shaman: { n: 'หมอธรรม', cat: 'shaman', text: 'ไล่ปอป คุ้มกันคน 1 คนทุกคืน' } };
const T = id => String(id).split('-')[0];
const Card = ({ id, ...p }) => { const c = CURSE_CARDS[T(id)] || {}; return <CardFace art={T(id)} name={c.n} text={c.text} cat={c.cat} tag={c.pts ? `+${c.pts}` : null} {...p} />; };
const Fate = ({ t, ...p }) => <CardFace art={t} name={FATE[t].n} text={FATE[t].text} cat={'fate-' + t} {...p} />;

// ---------- จัดเกม ----------
export const fatePerPlayer = n => (n <= 5 ? 4 : n <= 8 ? 3 : 2);
export const darkCount = n => (n <= 6 ? 1 : n <= 9 ? 2 : 3);
export function cursePlan(n) {
  const big = n >= 8;
  return { gossip: 2 * n + 8, evidence: n <= 6 ? 3 : 5, witness: big ? 2 : 1, alibi: big ? 4 : 3, stocks: big ? 3 : 2, arson: 1, cleanse: 2, steal: 1, scapegoat: 2, ordain: 1, amulet: big ? 3 : 2, bind: 1 };
}
export function makeCurseRound(ids, opts = {}, number = 1) {
  const n = ids.length, k = fatePerPlayer(n);
  const dark = pickBad(ids, darkCount(n), opts.hist); const town = ids.filter(id => !dark.includes(id)); const shaman = town[rint(town.length)];
  const fate = {}; ids.forEach(id => { const cards = Array.from({ length: k }, () => ({ t: 'pure', open: false })); if (dark.includes(id)) cards[0].t = 'dark'; if (id === shaman) cards[0].t = 'shaman'; fate[id] = shuffle(cards); });
  let deck = []; Object.entries(cursePlan(n)).forEach(([t, c]) => { for (let i = 0; i < c; i++) deck.push(`${t}-${i}`); });
  deck = shuffle(deck); const hands = {}, alive = {}, sus = {};
  ids.forEach(id => { hands[id] = deck.splice(0, 3); alive[id] = true; sus[id] = 0; });
  // คืนเดือนดับอยู่ครึ่งล่าง ปอปย้ายร่างอยู่ช่วงกลาง
  const half = Math.floor(deck.length / 2); deck.splice(half + rint(deck.length - half + 1), 0, 'night-0');
  if (opts.ritual !== false) { const a = Math.floor(deck.length / 3); deck.splice(a + rint(a + 1), 0, 'ritual-0'); }
  return { number, kind: 'curse', order: shuffle(ids), turn: 0, alive, fate, sus, blues: null, bound: null, hands, deck, discard: [], phase: 'play', played: false, skip: null, nightN: 0, log: [], start: { dark, shaman: shaman || null }, startedAt: Date.now() };
}

// ---------- ตรรกะ ----------
const hand = (r, id) => r.hands?.[id] || [];
const fateOf = (r, id) => r.fate?.[id] || [];
export const isDark = (r, id) => fateOf(r, id).some(c => c.t === 'dark' && !c.open);
const hasDark = (r, id) => fateOf(r, id).some(c => c.t === 'dark');
const isShaman = (r, id) => fateOf(r, id).some(c => c.t === 'shaman');
const blues = (r, id) => r.blues?.[id] || [];
const cur0 = r => r.order[r.turn];
function say(r, text, extra) { r.log = [...(r.log || []), { text, t: Date.now(), ...extra }].slice(-50); }
// chron = เหตุการณ์สำคัญทั้งเกม ไว้เล่นย้อนตอนจบ (รวมข้อมูลลับ — แสดงเฉพาะตอนจบเกม)
function chron(r, text, cls = '') { r.hist = [...(r.hist || []), { k: r.phase === 'night' ? 'night' : 'day', ch: r.nightN || 0, text, cls }]; }
function note(r, text, cls = '', extra) { say(r, text, extra); chron(r, text, cls); }
function take(r, id, card) { const h = hand(r, id); const i = h.indexOf(card); if (i < 0) return false; h.splice(i, 1); r.hands[id] = h; return true; }
function nextTurn(r) {
  const n = r.order.length; r.played = false;
  for (let i = 1; i <= n; i++) { const k = (r.turn + i) % n; const id = r.order[k]; if (!r.alive[id]) continue; if (r.skip?.[id]) { r.skip = { ...r.skip, [id]: null }; say(r, `🔒 {${id}} ติดคอก ข้ามตานี้`); continue; } r.turn = k; return; }
}
function winner(cur) {
  const r = cur.round; const darkLeft = r.order.some(id => isDark(r, id));
  if (!darkLeft) return 'town';
  const townAlive = r.order.filter(id => r.alive[id] && !isDark(r, id)).length;
  if (townAlive === 0) return 'dark';
  return null;
}
function finish(cur, win) {
  const r = cur.round; const points = {}, sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { const side = hasDark(r, id) ? 'dark' : 'town'; points[id] = side === win ? CURSE_SCORE[win] : 0; sc[id] = (sc[id] || 0) + points[id]; });
  r.phase = 'done'; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'curse', winner: win, points };
  return cur;
}
function kill(cur, id, why, chain) {
  const r = cur.round; if (!r.alive[id]) return;
  r.alive[id] = false; r.fate[id] = fateOf(r, id).map(c => ({ ...c, open: true })); r.discard = [...(r.discard || []), ...hand(r, id), ...blues(r, id)]; r.hands[id] = []; if (r.blues) r.blues[id] = null; r.sus[id] = 0;
  note(r, why, hasDark(r, id) ? 'good' : 'bad', { dead: id });
  if (!chain && r.bound && r.bound.includes(id)) { const other = r.bound.find(x => x !== id); r.bound = null; kill(cur, other, `💔 {${other}} ผูกเสี่ยวไว้กับ {${id}} — ตายตามไป`, true); }
}
function afterDeaths(cur) { const w = winner(cur); if (w) return finish(cur, w); const r = cur.round; if (!r.alive[cur0(r)] && r.phase === 'play') nextTurn(r); return cur; }
function addSus(cur, by, target, pts, now) {
  const r = cur.round; r.sus[target] = (r.sus[target] || 0) + pts;
  if (r.sus[target] >= SUS_MAX && fateOf(r, target).some(c => !c.open)) { r.phase = 'reveal'; r.reveal = { by, target, until: now + REVEAL_MS }; note(r, `⚖️ {${target}} ถูกสงสัยครบ ${SUS_MAX} แต้ม! {${by}} ต้องเลือกเปิดไพ่ดวง 1 ใบ`, 'warn'); }
}
export function playCurse(cur, me, card, t1, t2, now) {
  const r = cur.round; if (r.phase !== 'play' || cur0(r) !== me || !r.alive[me] || !hand(r, me).includes(card)) return;
  const t = T(card), c = CURSE_CARDS[t]; if (!c || c.cat === 'black') return;
  const ok = id => id && r.alive[id] && cur.players?.[id];
  if (!ok(t1)) return; if (c.two && (!ok(t2) || t2 === t1)) return;
  if (c.cat === 'red' && t1 === me) return;
  if (t === 'gossip' && blues(r, t1).some(b => T(b) === 'ordain')) return;
  take(r, me, card); r.played = true;
  if (c.cat === 'red') { r.discard = [...(r.discard || []), card]; say(r, `🗣️ {${me}} ใส่ “${c.n}” ให้ {${t1}} (+${c.pts})`); addSus(cur, me, t1, c.pts, now); return cur; }
  if (c.cat === 'blue') {
    if (t === 'bind') { r.bound = [t1, t2]; r.discard = [...(r.discard || []), card]; note(r, `💞 {${me}} ผูกเสี่ยว {${t1}} กับ {${t2}} ไว้ด้วยกัน`, 'love'); return cur; }
    r.blues = { ...(r.blues || {}), [t1]: [...blues(r, t1), card] }; say(r, `🔵 {${me}} ให้ “${c.n}” กับ {${t1}}`); return cur;
  }
  r.discard = [...(r.discard || []), card];
  switch (t) {
    case 'alibi': r.sus[t1] = Math.max(0, (r.sus[t1] || 0) - 3); say(r, `📜 {${me}} แก้ตัวให้ {${t1}} (-3)`); break;
    case 'stocks': r.skip = { ...(r.skip || {}), [t1]: true }; say(r, `🔒 {${me}} จับ {${t1}} ขังคอก ข้ามตาถัดไป`); break;
    case 'arson': r.discard = [...r.discard, ...hand(r, t1)]; r.hands[t1] = []; say(r, `🔥 {${me}} เผายุ้ง {${t1}} ไพ่ทั้งมือไหม้หมด`); break;
    case 'cleanse': r.discard = [...r.discard, ...blues(r, t1)]; if (r.blues) r.blues[t1] = null; if (r.bound?.includes(t1)) r.bound = null; say(r, `💧 {${me}} ล้างอาถรรพ์ {${t1}}`); break;
    case 'steal': { for (let i = 0; i < 2; i++) { const h = hand(r, t1); if (!h.length) break; const x = h[rint(h.length)]; take(r, t1, x); r.hands[me] = [...hand(r, me), x]; } say(r, `👜 {${me}} ลักไพ่จาก {${t1}}`); break; }
    case 'scapegoat': { const p = r.sus[t1] || 0; r.sus[t1] = 0; say(r, `🐐 {${me}} โยนความผิด ${p} แต้มจาก {${t1}} ไปให้ {${t2}}`); if (p) addSus(cur, me, t2, p, now); break; }
  }
  return cur;
}
// เปิดไพ่ดวงของคนที่ถูกสงสัยครบ 7
export function revealFate(cur, me, idx) {
  const r = cur.round; if (r.phase !== 'reveal' || r.reveal?.by !== me) return; const tg = r.reveal.target; const f = fateOf(r, tg);
  const closed = f.map((c, i) => (c.open ? -1 : i)).filter(i => i >= 0); if (!closed.includes(idx)) idx = closed[0];
  f[idx] = { ...f[idx], open: true }; r.fate[tg] = f; r.phase = 'play'; r.reveal = null;
  const t = f[idx].t;
  if (t === 'dark') { kill(cur, tg, `👻 เปิดไพ่ดวงของ {${tg}} ได้ “ปอปสิง”! จับผีปอปได้หนึ่งตน`); return afterDeaths(cur); }
  r.sus[tg] = 0; note(r, `🌸 เปิดไพ่ดวงของ {${tg}} ได้ “${FATE[t].n}” — ความสงสัยล้างเป็น 0`, 'good');
  if (f.every(c => c.open)) { kill(cur, tg, `⚰️ ไพ่ดวงของ {${tg}} ถูกเปิดหมด — สิ้นใจด้วยความอับอาย`); return afterDeaths(cur); }
  return cur;
}
function reshuffle(r) { if ((r.deck || []).length) return; r.deck = shuffle((r.discard || []).filter(c => CURSE_CARDS[T(c)]?.cat !== 'black')); r.discard = []; }
export function drawTwo(cur, me, now) {
  const r = cur.round; if (r.phase !== 'play' || cur0(r) !== me || r.played) return;
  for (let i = 0; i < 2; i++) {
    reshuffle(r); const deck = [...(r.deck || [])]; const card = deck.shift(); r.deck = deck; if (!card) break;
    if (T(card) === 'night') { r.nightN = (r.nightN || 0) + 1; r.phase = 'night'; r.night = { kills: {}, guard: null, sworn: {}, slept: {}, until: now + NIGHT_MS, card }; note(r, `🌑 {${me}} จั่วได้คืนเดือนดับ… ทุกคนหลับตา`); r.pendingEnd = true; return cur; }
    if (T(card) === 'ritual') {
      const before = r.order.filter(id => isDark(r, id));
      const ids = r.order.filter(id => r.alive[id] && fateOf(r, id).some(c => !c.open));
      const picks = ids.map(id => { const f = fateOf(r, id); const closed = f.map((c, j) => (c.open ? -1 : j)).filter(j => j >= 0); return closed[rint(closed.length)]; });
      const moving = ids.map((id, j) => fateOf(r, id)[picks[j]]);
      ids.forEach((id, j) => { const f = [...fateOf(r, id)]; f.splice(picks[j], 1); r.fate[id] = f; });
      ids.forEach((id, j) => { const to = ids[(j + 1) % ids.length]; r.fate[to] = shuffle([...fateOf(r, to), moving[j]]); });
      r.ritualN = (r.ritualN || 0) + 1; say(r, '👻 ปอปย้ายร่าง! ทุกคนส่งไพ่ดวงสุ่ม 1 ใบให้คนถัดไป — ปอปอาจย้ายไปสิงคนอื่น…');
      { const after = r.order.filter(id => isDark(r, id)); const gain = after.filter(id => !before.includes(id)), lost = before.filter(id => !after.includes(id)); const L = a => a.map(id => `{${id}}`).join(' ');
        chron(r, gain.length ? `👻 ปอปย้ายร่าง! ผีปอปย้ายไปสิง ${L(gain)}${lost.length ? ` (ออกจากร่าง ${L(lost)})` : ''}` : '👻 ปอปย้ายร่าง! แต่ผีปอปยังสิงร่างเดิม', 'warn'); }
      const w = winner(cur); if (w) return finish(cur, w); continue;
    }
    r.hands[me] = [...hand(r, me), card];
  }
  say(r, `🃏 {${me}} จั่วไพ่ 2 ใบ`); nextTurn(r); return cur;
}
export function endCurseTurn(cur, me) { const r = cur.round; if (r.phase !== 'play' || cur0(r) !== me || !r.played) return; nextTurn(r); return cur; }
// ---------- กลางคืน ----------
export function nightAct(cur, me, kind, arg, now = Date.now()) {
  const r = cur.round; const n = r.night; if (r.phase !== 'night' || !r.alive[me]) return;
  if (kind === 'kill') { if (!isDark(r, me) || !r.alive[arg] || isDark(r, arg)) return; n.kills = { ...(n.kills || {}), [me]: arg }; }
  else if (kind === 'guard') { if (!isShaman(r, me) || arg === me || !r.alive[arg] || n.guard) return; n.guard = arg; }
  else if (kind === 'swear') { const f = fateOf(r, me); if (!f[arg] || f[arg].open || n.sworn?.[me] != null) return; n.sworn = { ...(n.sworn || {}), [me]: arg }; }
  else if (kind === 'sleep') { n.slept = { ...(n.slept || {}), [me]: true }; }
  else return;
  return resolveNight(cur, false, now);
}
export function resolveNight(cur, force, now) {
  const r = cur.round; const n = r.night; if (r.phase !== 'night') return;
  const ids = r.order.filter(id => r.alive[id] && cur.players?.[id]); const darks = ids.filter(id => isDark(r, id)); const sham = ids.find(id => isShaman(r, id));
  const tg = darks.map(id => n.kills?.[id]); const agreed = tg.length && tg.every(t => t && t === tg[0]) ? tg[0] : null;
  const othersDone = ids.filter(id => !darks.includes(id) && id !== sham).every(id => n.sworn?.[id] != null || n.slept?.[id]);
  const done = (!darks.length || agreed) && (!sham || n.guard) && othersDone;
  if (!force && !done && now < n.until) return cur;
  let victim = agreed;
  if (!victim) { const c = {}; tg.filter(Boolean).forEach(t => (c[t] = (c[t] || 0) + 1)); const mx = Math.max(0, ...Object.values(c)); const top = Object.keys(c).filter(t => c[t] === mx); victim = mx && top.length === 1 ? top[0] : null; }
  if (darks.length) chron(r, `👻 ผีปอป ${darks.map(id => `{${id}}`).join(' ')} เลือกเหยื่อ: ${victim ? `{${victim}}` : 'ตกลงกันไม่ได้'}`, 'bad');
  if (sham) chron(r, n.guard ? `📿 หมอธรรม {${sham}} คุ้มกัน {${n.guard}}` : `📿 หมอธรรม {${sham}} ไม่ได้คุ้มกันใคร`, n.guard ? 'good' : 'dim');
  // สาบาน: เปิดไพ่ดวงตัวเอง 1 ใบ (ถ้าเปิดได้ปอปสิง = ตาย ถ้าไม่ = รอดคืนนี้)
  Object.entries(n.sworn || {}).forEach(([id, idx]) => { const f = fateOf(r, id); if (!f[idx] || f[idx].open || !r.alive[id]) return; f[idx] = { ...f[idx], open: true }; r.fate[id] = f;
    if (f[idx].t === 'dark') kill(cur, id, `😱 {${id}} สาบานแล้วเปิดไพ่ดวงได้ “ปอปสิง”! โป๊ะแตก`); else { note(r, `🙏 {${id}} สาบานตน เปิดไพ่ดวง “${FATE[f[idx].t].n}” — รอดคืนนี้`, 'good'); if (f.every(c => c.open)) kill(cur, id, `⚰️ ไพ่ดวงของ {${id}} ถูกเปิดหมด`); } });
  if (victim && r.alive[victim]) {
    const amulet = blues(r, victim).find(b => T(b) === 'amulet');
    if (n.guard === victim) note(r, `📿 หมอธรรมคุ้มกันไว้ได้ — คืนนี้ไม่มีใครตาย`, 'good');
    else if (n.sworn?.[victim] != null) note(r, `🙏 เหยื่อของผีปอปสาบานตนไว้แล้ว — รอด`, 'good');
    else if (amulet) { r.blues[victim] = blues(r, victim).filter(b => b !== amulet); r.discard = [...(r.discard || []), amulet]; note(r, `🧿 ตะกรุดของ {${victim}} แตก แต่ช่วยชีวิตไว้ได้`, 'good'); }
    else kill(cur, victim, `💀 รุ่งเช้า… พบ {${victim}} สิ้นลมในบ้าน — ถูกปอปกินตับ`);
  } else note(r, '🌅 รุ่งเช้า… คืนนี้ไม่มีใครถูกทำร้าย', 'dim');
  // เช้าแล้ว: สับกองทิ้งกลับเข้ากองจั่ว แล้วซ่อนคืนเดือนดับไว้ครึ่งล่าง (คืนถัดไปจะมาช้าลง)
  const deck = shuffle([...(r.deck || []), ...(r.discard || []).filter(c => CURSE_CARDS[T(c)]?.cat !== 'black')]); r.discard = []; const half = Math.floor(deck.length / 2); deck.splice(half + rint(deck.length - half + 1), 0, n.card || 'night-0'); r.deck = deck;
  r.phase = 'play'; r.night = null;
  const w = winner(cur); if (w) return finish(cur, w);
  if (r.pendingEnd) { r.pendingEnd = null; nextTurn(r); }
  return cur;
}
export function curseTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'curse') return;
  if (r.phase === 'reveal' && now >= r.reveal.until) { const f = fateOf(r, r.reveal.target); const closed = f.map((c, i) => (c.open ? -1 : i)).filter(i => i >= 0); return revealFate(cur, r.reveal.by, closed[rint(closed.length)]); }
  if (r.phase === 'night' && now >= r.night.until) return resolveNight(cur, true, now);
}
// หัวหน้าห้อง: คนที่หลุดออกจากห้องไปแล้ว → นับว่าตาย เปิดไพ่ดวงทั้งหมด (กันเกมค้าง)
export function kickCurse(cur, id) { const r = cur.round; if (!r.alive?.[id] || cur.players?.[id] || r.phase === 'done') return; kill(cur, id, `🚪 {${id}} หลุดออกจากหมู่บ้าน — เปิดไพ่ดวงทั้งหมด`, true); if (r.phase === 'reveal' && (r.reveal?.target === id || r.reveal?.by === id)) { r.phase = 'play'; r.reveal = null; } return afterDeaths(cur); }
export function skipCurseTurn(cur) { const r = cur.round; if (r.phase !== 'play') return; say(r, `⏭️ หัวหน้าห้องข้ามตา {${cur0(r)}}`); nextTurn(r); return cur; }

// ---------- เล่นย้อนเหตุการณ์ ----------
const tk = id => `{${id}}`;
export function curseScenes(r, res) {
  const S = []; const st = r.start;
  if (st) S.push({ kicker: '🎭 เริ่มเกม', title: 'ไพ่ดวงที่แจก', tone: 'night', mode: 'day', lines: [{ ico: '👻', text: `ผีปอปตอนเริ่มเกม: ${(st.dark || []).map(tk).join(' ')}`, cls: 'bad' }, ...(st.shaman ? [{ ico: '📿', text: `หมอธรรม: ${tk(st.shaman)}`, cls: 'good' }] : [])] });
  let sc = null, key = null;
  (r.hist || []).forEach(h => {
    const kk = h.k + '-' + h.ch;
    if (kk !== key || sc.lines.length >= 6) {
      const cont = kk === key; key = kk; const night = h.k === 'night';
      sc = { kicker: night ? `🌑 คืนเดือนดับ ครั้งที่ ${h.ch}` : h.ch ? `☀️ กลางวัน (หลังคืนที่ ${h.ch})` : '☀️ กลางวัน', title: (night ? 'ผีปอปออกหากิน…' : 'ชาวบ้านไล่หาตัวปอป') + (cont ? ' (ต่อ)' : ''), tone: night ? 'night' : 'day', lines: [] };
      S.push(sc);
    }
    sc.lines.push({ text: h.text, cls: h.cls || '' });
  });
  S.forEach(s => { if (!s.mode) s.mode = s.tone === 'night' ? 'night' : s.lines.some(l => /ไพ่ดวง|สงสัยครบ/.test(l.text)) ? 'reveal' : 'day'; });
  if (res) S.push({ kicker: '🏁 จบเกม', title: res.winner === 'town' ? 'บ้านนาดงปลอดภัยแล้ว!' : 'ผีปอปกินตับทั้งหมู่บ้าน!', tone: res.winner === 'town' ? 'good' : 'bad', mode: res.winner === 'town' ? 'townWin' : 'popWin',
    lines: [{ ico: '👻', text: `ผีปอปตอนจบ: ${r.order.filter(id => hasDark(r, id)).map(tk).join(' ')}`, cls: 'bad' }] });
  return S.map(s => ({ ...s, stage: <CurseStage mode={s.mode} /> }));
}

// ---------- หน้าจอ ----------
export function CurseGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack, srvNow }) {
  const r = room.round; const res = room.status === 'result' && room.result;
  const [sel, setSel] = useState(null); const [t1, setT1] = useState(null); const [t2, setT2] = useState(null); const [peek, setPeek] = useState(false);
  const me = myId; const alive = r.order.filter(id => r.alive?.[id]); const cur = r.order[r.turn]; const myTurn = cur === me && r.alive?.[me] && r.phase === 'play' && !res;
  const myFate = fateOf(r, me); const iDark = isDark(r, me); const iShaman = isShaman(r, me); const myHand = hand(r, me);
  const darkMates = iDark ? alive.filter(id => id !== me && isDark(r, id)) : [];
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c || c.status !== 'playing' || c.round?.kind !== 'curse') return; const R = c.round; R.hands = R.hands || {}; R.alive = R.alive || {}; R.sus = R.sus || {}; R.fate = R.fate || {}; return f(c); });
  const nm = s => String(s).replace(/\{([^}]+)\}/g, (_, id) => nameOf(id));
  useEffect(() => { setSel(null); setT1(null); setT2(null); }, [r.turn, myHand.length, r.phase]);
  const due = (r.phase === 'reveal' && srvNow >= r.reveal?.until) || (r.phase === 'night' && srvNow >= r.night?.until);
  useEffect(() => { if (due && !res) tx(c => curseTick(c, srvNow)); }, [due]);
  // เสียง
  const prev = useRef(null);
  useEffect(() => { const s = { ph: r.phase, turn: r.turn, logN: (r.log || []).length, res: !!res, dark: iDark }; const p = prev.current; prev.current = s; if (!p) return;
    if (s.res && !p.res) { sfx(sound, (room.result?.winner === 'dark') === hasDark(r, me) ? 'win' : 'lose'); return; }
    if (s.ph === 'night' && p.ph !== 'night') { sfx(sound, 'night'); return; }
    if (p.ph === 'night' && s.ph !== 'night') { sfx(sound, (r.log || []).slice(-3).some(e => e.dead) ? 'death' : 'morning'); return; }
    if (s.ph === 'reveal' && p.ph !== 'reveal') sfx(sound, 'tension');
    if (s.logN > p.logN && (r.log || [])[s.logN - 1]?.dead && s.ph !== 'night') sfx(sound, 'death');
    if (s.dark !== p.dark) msg(s.dark ? '👻 ปอปย้ายร่างมาสิงคุณแล้ว! ตอนนี้คุณคือผีปอป' : '🙏 ปอปออกจากร่างคุณไปแล้ว — กลับเป็นชาวบ้าน');
    if (s.turn !== p.turn && cur === me) setTimeout(() => sfx(sound, 'yourTurn'), 200);
  });
  const card = sel ? CURSE_CARDS[T(sel)] : null;
  const canOn = id => { if (!card) return false; if (!r.alive?.[id] || !room.players?.[id]) return false; if (card.cat === 'red' && id === me) return false; if (T(sel) === 'gossip' && blues(r, id).some(b => T(b) === 'ordain')) return false; return true; };
  async function play() { if (!sel || !t1 || (card.two && !t2)) { msg(card?.two ? 'เลือกให้ครบ 2 คน' : 'เลือกคนที่จะเล่นใส่'); return; } sfx(sound, card.cat === 'red' ? 'vote' : 'confirm'); await tx(c => playCurse(c, me, sel, t1, t2, srvNow)); }
  const sus = id => r.sus?.[id] || 0;
  const tile = id => <div className="cz-tile-x"><div className="susbar"><i style={{ width: Math.min(100, sus(id) / SUS_MAX * 100) + '%' }} className={sus(id) >= 5 ? 'hot' : ''} /><span>{sus(id)}/{SUS_MAX}</span></div>
    <div className="fate-mini">{fateOf(r, id).map((c, i) => <span key={i} className={'fm' + (c.open ? ' open ' + c.t : '')} title={c.open ? FATE[c.t].n : 'ยังไม่เปิด'}>{c.open ? (c.t === 'dark' ? '👻' : c.t === 'shaman' ? '📿' : '🌸') : ''}</span>)}</div>
    {(blues(r, id).length > 0 || r.bound?.includes(id) || r.skip?.[id]) && <div className="blue-mini">{blues(r, id).map(b => <span key={b}>{T(b) === 'amulet' ? '🧿' : '🙏'}</span>)}{r.bound?.includes(id) && <span>💞</span>}{r.skip?.[id] && <span>🔒</span>}</div>}</div>;
  const nightN = r.night || {};
  const sham = alive.find(id => isShaman(r, id));

  return <div className={'curse-game' + (r.phase === 'night' ? ' is-night' : '')}>
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number} • เหลือ {alive.length} คน • คืนเดือนดับมาแล้ว {r.nightN || 0} ครั้ง</span><span className="cat-tag">{res ? '🏁 จบเกม' : r.phase === 'night' ? '🌑 กลางคืน' : r.phase === 'reveal' ? '⚖️ ไต่สวน' : '☀️ กลางวัน'}</span></div>

    <div className="gcols flow"><div className="gmain">
    <CurseStage mode={res ? (res.winner === 'town' ? 'townWin' : 'popWin') : r.phase === 'night' ? 'night' : r.phase === 'reveal' ? 'reveal' : 'day'} />

    {/* ไต่สวน: ครบ 7 แต้ม ต้องเปิดไพ่ดวง */}
    {r.phase === 'reveal' && !res && (r.reveal.by === me ? <div className="reveal-box"><Phase art="evidence" tone="me" kicker="⚖️ ไต่สวน" title={`เลือกเปิดไพ่ดวงของ ${nameOf(r.reveal.target)} 1 ใบ`}>คุณไม่รู้ว่าใบไหนเป็นอะไร เลือกตามดวง • {Math.ceil(Math.max(0, r.reveal.until - srvNow) / 1000)} วิ</Phase>
      <div className="hand-row">{fateOf(r, r.reveal.target).map((c, i) => c.open ? <Fate key={i} t={c.t} size="md" dim tag="เปิดแล้ว" /> : <CardFace key={i} back backKind="curse" size="md" onClick={() => { sfx(sound, 'reveal'); tx(x => revealFate(x, me, i)); }} />)}</div></div>
      : <Phase art="evidence" tone="bad" kicker="⚖️ ไต่สวน" title={`${nameOf(r.reveal.target)} ถูกสงสัยครบ ${SUS_MAX} แต้ม!`}>{nameOf(r.reveal.by)} กำลังเลือกเปิดไพ่ดวง 1 ใบ…</Phase>)}

    {/* กลางคืน */}
    {r.phase === 'night' && !res && <div className="night-box">
      {!r.alive?.[me] ? <Phase art="tombstone" tone="night" kicker="🌑 คืนเดือนดับ" title="คุณตายแล้ว — นอนสงบ">ดูเฉย ๆ ห้ามใบ้</Phase>
        : iDark ? <><Phase art="dark" tone="me" kicker="🌑 คืนเดือนดับ — ผีปอปออกหากิน" title="เลือกเหยื่อคืนนี้">ผีปอปทุกคนต้องเลือก<b>คนเดียวกัน</b> • คุยกันได้ในห้องเสียง (คนอื่นไม่ได้ยิน) • {Math.ceil(Math.max(0, nightN.until - srvNow) / 1000)} วิ</Phase>
          <PlayerGrid ids={alive.filter(id => !isDark(r, id))} av={av} nameOf={nameOf} small selected={nightN.kills?.[me]} onPick={id => { sfx(sound, 'click'); tx(c => nightAct(c, me, 'kill', id, srvNow)); }} badge={id => { const by = Object.keys(nightN.kills || {}).filter(k => nightN.kills[k] === id); return by.length ? <span className="tag bad">👻 {by.map(nameOf).join(', ')}</span> : null; }} /></>
          : <>
            {iShaman && <><Phase art="shaman" tone="me" kicker="🌑 คืนเดือนดับ — หมอธรรม" title={nightN.guard ? `คุ้มกัน ${nameOf(nightN.guard)} แล้ว` : 'เลือกคุ้มกัน 1 คน'}>คุ้มกันตัวเองไม่ได้ • ถ้าผีปอปเลือกคนนี้ เขาจะรอด</Phase>
              {!nightN.guard && <PlayerGrid ids={alive.filter(id => id !== me)} av={av} nameOf={nameOf} small onPick={id => { sfx(sound, 'confirm'); tx(c => nightAct(c, me, 'guard', id, srvNow)); }} badge={() => <span className="tag good">📿 คุ้มกัน</span>} />}</>}
            {nightN.sworn?.[me] != null ? <div className="confirmed">🙏 คุณสาบานตนแล้ว (จะเปิดไพ่ดวงใบที่ {nightN.sworn[me] + 1} ตอนเช้า) — รอดแน่นอนคืนนี้ ถ้าไม่ใช่ปอปสิง</div>
              : nightN.slept?.[me] ? <div className="waiting">😴 หลับอยู่… รอเช้า</div>
                : <><Phase art="night" tone="night" kicker="🌑 คืนเดือนดับ" title="จะสาบานตนไหม?">เปิดไพ่ดวงตัวเอง 1 ใบตอนเช้า = <b>รอดแน่นอนคืนนี้</b> (แต่ทุกคนจะเห็นไพ่ใบนั้น) • หรือนอนเสี่ยงดวง</Phase>
                  <div className="hand-row">{myFate.map((c, i) => c.open ? null : <Fate key={i} t={c.t} size="sm" onClick={() => { sfx(sound, 'select'); tx(x => nightAct(x, me, 'swear', i, srvNow)); }} tag="สาบานด้วยใบนี้" />)}</div>
                  <button className="secondary wide" onClick={() => tx(x => nightAct(x, me, 'sleep', null, srvNow))}>😴 นอนต่อ เสี่ยงดวง</button></>}
          </>}
      <div className="whodone"><span>🌑 คืนนี้: ผีปอป{alive.some(id => isDark(r, id)) && alive.filter(id => isDark(r, id)).every(id => nightN.kills?.[id]) ? 'เลือกแล้ว' : 'ยังเลือกอยู่'} • หมอธรรม{!sham ? 'ไม่อยู่แล้ว' : nightN.guard ? 'เลือกแล้ว' : 'ยังเลือกอยู่'} • อีก {Math.ceil(Math.max(0, nightN.until - srvNow) / 1000)} วิ</span></div>
      {isHost && <HostBar><button className="secondary" onClick={() => { if (confirm('จบคืนนี้เลยโดยไม่รอ?')) tx(c => resolveNight(c, true, srvNow)); }}>🌅 ให้เช้าเลย (ไม่รอ)</button></HostBar>}
    </div>}

    {/* กลางวัน */}
    {r.phase === 'play' && !res && <>
      {myTurn ? <Phase art="gossip" tone="me" kicker="☀️ ตาคุณ" title={r.played ? 'เล่นไพ่ต่อได้ หรือกดจบตา' : 'จั่ว 2 ใบ หรือ เล่นไพ่จากมือ'}>ไพ่แดงใส่ความสงสัย (ครบ {SUS_MAX} ต้องเปิดไพ่ดวง) • เขียวใช้ทันที • ฟ้าติดตัวถาวร • เลือกได้อย่างเดียว: จั่ว หรือ เล่น</Phase>
        : <Phase art="wait" kicker="☀️ กลางวัน" title={<>ตาของ <Avatar id={cur} av={av} size={26} /> {nameOf(cur)}</>}>คุยกัน ถกเถียง ชี้ตัวคนน่าสงสัยในห้องเสียงได้เลย</Phase>}
      {r.alive?.[me] && <>
        <SecH icon="🃏">ไพ่ในมือ <small>{myHand.length} ใบ{myTurn ? ' • แตะเพื่อเลือก' : ''}</small></SecH>
        <div className="hand-row">{myHand.map(c => <Card key={c} id={c} size="md" selected={sel === c} onClick={myTurn ? () => { sfx(sound, 'click'); setSel(s => (s === c ? null : c)); setT1(null); setT2(null); } : undefined} />)}{!myHand.length && <p className="hint">ไม่มีไพ่ในมือ</p>}</div>
      </>}
      {myTurn && sel && <div className="act-box"><b>เล่น “{card.n}” — {card.text}</b>
        <small>{card.two ? (t1 ? `คนแรก: ${nameOf(t1)} → เลือกคนที่สอง` : 'เลือกคนแรก') : 'เลือกคนที่จะเล่นใส่'}</small>
        <PlayerGrid ids={alive.filter(id => room.players?.[id])} av={av} nameOf={nameOf} myId={me} small selected={[t1, t2].filter(Boolean)} off={id => !canOn(id)}
          onPick={id => { sfx(sound, 'select'); if (card.two) { if (!t1 || (t1 && t2)) { setT1(id); setT2(null); } else if (id !== t1) setT2(id); } else setT1(id); }} note={id => `⚖️ ${sus(id)}/${SUS_MAX}`} />
        <button className="primary wide" disabled={!t1 || (card.two && !t2)} onClick={play}>🃏 เล่นไพ่</button></div>}
      {myTurn && <div className="turn-btns">{!r.played && <button className="draw-btn" onClick={() => { sfx(sound, 'draw'); tx(c => drawTwo(c, me, srvNow)); }}><span>🃏</span> จั่ว 2 ใบ (จบตา)<small>เสี่ยงจั่วได้คืนเดือนดับ</small></button>}
        {r.played && <button className="primary wide" onClick={() => tx(c => endCurseTurn(c, me))}>✅ จบตา</button>}</div>}
      {isHost && (cur !== me || alive.some(id => !room.players?.[id])) && <HostBar>{cur !== me && <button className="secondary" onClick={() => { if (confirm(`ข้ามตา ${nameOf(cur)} (หลุดหรือค้าง)?`)) tx(c => skipCurseTurn(c)); }}>⏭️ ข้ามตา {nameOf(cur)}</button>}
        {alive.filter(id => !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickCurse(c, id))}>🚪 ตัดคนที่หลุดออก</button>)}</HostBar>}
    </>}

    {res && <>
      <Outcome art={res.winner === 'town' ? 'pure' : 'dark'} tone={res.winner === 'town' ? 'good' : 'bad'} title={res.winner === 'town' ? 'บ้านนาดงปลอดภัยแล้ว! จับผีปอปได้หมด 🌸' : 'ผีปอปกินตับทั้งหมู่บ้าน! 👻'}>
        ผีปอปคือ <b>{r.order.filter(id => hasDark(r, id)).map(nameOf).join(', ')}</b></Outcome>
      <Replay scenes={curseScenes(r, res)} av={av} nameOf={nameOf} />
      <SecH icon="🔮">ไพ่ดวงของทุกคน</SecH>
      <RevealGrid av={av} nameOf={nameOf} items={r.order.filter(id => room.players?.[id] || hasDark(r, id)).map(id => ({ id, art: hasDark(r, id) ? 'dark' : isShaman(r, id) ? 'shaman' : 'pure', label: hasDark(r, id) ? 'ผีปอป' : isShaman(r, id) ? 'หมอธรรม' : 'ชาวบ้าน', bad: hasDark(r, id), dead: !r.alive?.[id], extra: fateOf(r, id).map(c => (c.t === 'dark' ? '👻' : c.t === 'shaman' ? '📿' : '🌸')).join(' ') }))} />
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={me} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}

    </div><div className="gside">
    {/* ไพ่ดวงของฉัน */}
    {!res && <div className="my-fate">
      <div className="mf-head"><b>🔮 ไพ่ดวงของคุณ</b><button className="link-btn" onClick={() => setPeek(p => !p)}>{peek ? 'ซ่อน' : 'แอบดู'}</button></div>
      {peek ? <><div className="hand-row">{myFate.map((c, i) => <Fate key={i} t={c.t} size="sm" tag={c.open ? 'เปิดแล้ว' : 'คว่ำอยู่'} dim={c.open} />)}</div>
        <p className={'mf-who ' + (iDark ? 'bad' : 'good')}>{!r.alive?.[me] ? '💀 คุณตายแล้ว — ดูต่อได้ ห้ามใบ้' : iDark ? <>👻 คุณคือ <b>ผีปอป</b>{darkMates.length ? <> • พวกเดียวกัน: <b>{darkMates.map(nameOf).join(', ')}</b></> : ' (คนเดียว)'} — ทำให้ชาวบ้านสงสัยกันเอง</> : iShaman ? <>📿 คุณคือ <b>หมอธรรม</b> (ฝั่งชาวบ้าน) — คืนเดือนดับคุ้มกันได้ 1 คน</> : <>🌸 คุณคือ <b>ชาวบ้าน</b> — หาตัวผีปอปให้เจอ</>}</p></>
        : <div className="hand-row">{myFate.map((c, i) => c.open ? <Fate key={i} t={c.t} size="sm" tag="เปิดแล้ว" dim /> : <CardFace key={i} back backKind="curse" size="sm" />)}</div>}
    </div>}

    <SecH icon="🏘️">ชาวนาดง <small>⚖️ ความสงสัย • ไพ่ดวง (เปิดแล้ว/คว่ำ) • 🧿 ตะกรุด 🙏 บวช 💞 ผูกเสี่ยว 🔒 ติดคอก</small></SecH>
    <PlayerGrid ids={r.order.filter(id => room.players?.[id] || !r.alive?.[id])} av={av} nameOf={nameOf} myId={me} small dead={id => !r.alive?.[id]} badge={id => <>{id === cur && r.phase === 'play' && !res && <span className="tag">☀️ ตานี้</span>}{tile(id)}</>} note={id => r.alive?.[id] ? `🃏 ${hand(r, id).length} ใบ` : '⚰️ ตายแล้ว'} />
    <SecH icon="📜">บันทึกหมู่บ้าน</SecH>
    <ul className="head-log">{[...(r.log || [])].reverse().slice(0, 14).map((e, i) => <li key={i} className={e.dead ? 'boom-line' : ''}>{nm(e.text)}</li>)}</ul>
    </div></div>
  </div>;
}

// ---------- ห้องรอ: จำนวนไพ่ดวง/ผีปอป + ไพ่ทุกแบบ ----------
const CAT_NAME = { red: '🔴 แดง — ใส่ความสงสัย', green: '🟢 เขียว — ใช้ทันที', blue: '🔵 ฟ้า — ติดตัวถาวร', black: '⚫ ดำ — อยู่ในกองจั่ว' };
export function CurseLobby({ n }) {
  const k = Math.max(CURSE_MIN, Math.min(CURSE_MAX, n)); const f = fatePerPlayer(k), d = darkCount(k);
  return <>
    <div className="score-rules"><b>🎭 หมู่บ้าน {k} คน</b><span>🔮 ไพ่ดวงคนละ {f} ใบ (คว่ำไว้) • 👻 ปอปสิง {d} ใบ = ผีปอป {d} คน (รู้จักกันเอง)</span><span>📿 หมอธรรม 1 คน (ฝั่งชาวบ้าน) คุ้มกันได้ทุกคืนเดือนดับ</span></div>
    <div className="card-gallery fate">{['dark', 'pure', 'shaman'].map(t => <div key={t} className="cg-item"><CardFace art={t} name={FATE[t].n} cat={'fate-' + t} size="sm" /><div><b>{FATE[t].n}</b><small>{FATE[t].text}</small></div></div>)}</div>
    {['red', 'green', 'blue', 'black'].map(cat => <div key={cat}><h4 className="cg-h">{CAT_NAME[cat]}</h4><div className="card-gallery">{Object.entries(CURSE_CARDS).filter(([, c]) => c.cat === cat).map(([t, c]) => <div key={t} className="cg-item"><CardFace art={t} name={c.n} cat={c.cat} tag={c.pts ? '+' + c.pts : null} size="sm" /><div><b>{c.n}</b><small>{c.text}</small></div></div>)}</div></div>)}
  </>;
}
