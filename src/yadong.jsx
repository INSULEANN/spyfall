// เกม ไพ่เนียนซาลูน — วงไพ่โกหกในซาลูนคาวบอยของลุงบิล (id ภายในยังเป็น yadong) (แนวเดียวกับเกมไพ่บลัฟ/ไพ่โกหก)
//   ทุกตาแจกไพ่ 5 ใบ แล้วลุงบิลประกาศ "ไพ่ประจำวง" (J / Q / K / A) • โจ๊กเกอร์ = ไพ่แทนอะไรก็ได้
//   ตาเรา: ลงไพ่คว่ำ 1–3 ใบ แล้วบอกว่า "เป็นไพ่ประจำวงทั้งหมด" (โกหกได้)
//   คนถัดไป: ลงต่อ หรือ ตะโกน "โกหก!" → เปิดไพ่ชุดล่าสุด โกหกจริง = คนลงดื่ม, ไม่โกหก = คนเรียกดื่ม
//   ดื่ม "วิสกี้ลุ้น": แก้วที่ 1 มีโอกาสฟุบ 1/6, แก้วที่ 2 = 1/5 … ฟุบแล้วออกจากวง • เหลือคนสุดท้าย = ชนะ
//   ไม่มีไพ่ในมือตอนถึงตา = ต้องเรียก "โกหก!" (กันเกมค้าง) • เรียกแล้วแจกไพ่ใหม่ทั้งวง คนดื่ม (ถ้ายังรอด) เริ่มก่อน
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint } from './rand.js';
import { Avatar, Outcome, Leaderboard, HostBar, SecH, TimerRing, ActionSheet } from './ui.jsx';
import './yadong.css';

export const YD_MIN = 2, YD_MAX = 6, YD_SCORE = 2, HAND = 5;
export const RANKS = [{ n: 'J', th: 'แจ๊ค', s: '♣', c: '#1a1a2a' }, { n: 'Q', th: 'แหม่ม', s: '♥', c: '#d8283a' }, { n: 'K', th: 'คิง', s: '♠', c: '#1a1a2a' }, { n: 'A', th: 'เอซ', s: '♦', c: '#d8283a' }];
const NR = RANKS.length;
export const WILD = NR; // โจ๊กเกอร์ = แทนอะไรก็ได้
export const CARD_N = [...RANKS.map(x => x.th), 'โจ๊กเกอร์'];
const rk = k => `${RANKS[k].n} (${RANKS[k].th})`;
export const PLAY_MS = 40000, SHOT_MS = 7500, REVEAL_AT = 3600;
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
const arr = a => Array.isArray(a) ? a.filter(x => x != null).map(Number) : a ? Object.values(a).map(Number) : [];
export const fix = r => {
  r.order = r.order || []; r.out = r.out || {}; r.gone = r.gone || {}; r.shots = r.shots || {}; r.log = r.log || []; r.hands = r.hands || {};
  r.order.forEach(id => { r.hands[id] = arr(r.hands[id]); r.shots[id] = +r.shots[id] || 0; });
  if (r.lastPlay) r.lastPlay.cards = arr(r.lastPlay.cards);
  if (r.shot) r.shot.cards = arr(r.shot.cards);
  r.pile = +r.pile || 0;
  return r;
};
export const alive = r => r.order.filter(id => !r.out[id]);
const nextAlive = (r, id) => { const n = r.order.length, i = r.order.indexOf(id); for (let k = 1; k <= n; k++) { const x = r.order[(i + k) % n]; if (!r.out[x]) return x; } return null; };
export const odds = (r, id) => Math.max(1, r.glasses - (r.shots[id] || 0)); // โอกาสฟุบแก้วถัดไป = 1/odds
export const isLie = (cards, table) => cards.some(c => c !== table && c !== WILD);

function makeDeck(n) {
  const T = Math.max(5, Math.ceil(n * HAND * 0.22)), W = Math.max(2, Math.ceil(n / 2));
  return shuffle([...Array.from({ length: T * NR }, (_, i) => i % NR), ...Array(W).fill(WILD)]);
}
function deal(r, starter, now) {
  const ids = alive(r); const deck = makeDeck(ids.length);
  r.order.forEach(id => { r.hands[id] = []; });
  ids.forEach((id, j) => { r.hands[id] = deck.slice(j * HAND, (j + 1) * HAND).sort((a, b) => a - b); });
  r.deal = (r.deal || 0) + 1; r.table = rint(NR); r.pile = 0; r.lastPlay = null; r.shot = null;
  r.phase = 'play'; r.turn = starter; r.at = now; r.until = now + 2500 + (r.tmT || PLAY_MS);
  say(r, `🤠 ลุงบิลแจกไพ่ใหม่ — ไพ่ประจำวงคือ “${rk(r.table)}”`);
}

export function makeYdRound(ids, set = {}, number = 1, t0 = Date.now()) {
  const order = shuffle(ids); const shots = {}; order.forEach(id => { shots[id] = 0; });
  const r = { number, kind: 'yd', order, glasses: +set.glasses === 4 ? 4 : 6, out: {}, gone: {}, shots, hands: {}, log: [], deal: 0, startedAt: t0 };
  if (+set.tmT) r.tmT = +set.tmT;
  deal(r, order[0], t0); return r;
}

function end(cur, winner, why, now) {
  const r = cur.round; r.phase = 'done'; r.at = now; r.winner = winner; r.why = why; r.until = null;
  const pts = {}; const sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { const p = id === winner ? YD_SCORE : 0; pts[id] = p; sc[id] = (sc[id] || 0) + p; });
  cur.status = 'result'; cur.scores = sc; cur.result = { type: 'yd', winner, why, points: pts };
  return cur;
}
// หลังดื่มเสร็จ: ฟุบ → ออก • เหลือคนเดียว → จบ • ไม่งั้นแจกใหม่ คนดื่มเริ่ม (ฟุบแล้ว → คนถัดไป)
function afterShot(cur, now) {
  const r = cur.round; const s = r.shot;
  if (s?.ko && s.who) { r.out = { ...r.out, [s.who]: true }; r.hands[s.who] = []; }
  const al = alive(r);
  if (al.length < 2) return end(cur, al[0] || null, 'last', now);
  const who = s?.who && !r.out[s.who] ? s.who : nextAlive(r, s?.who || r.turn);
  deal(r, who, now); return cur;
}
function nextTurn(r, from, now) { r.turn = nextAlive(r, from); r.phase = 'play'; r.at = now; r.until = now + (r.tmT || PLAY_MS); }

// ---------- การกระทำ (เรียกใน transaction) ----------
export function ydPlay(cur, me, idxs, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'play' || r.turn !== me) return;
  const h = r.hands[me]; const ix = [...new Set(idxs)];
  if (!ix.length || ix.length > 3 || ix.some(i => !Number.isInteger(i) || i < 0 || i >= h.length)) return;
  const cards = ix.map(i => h[i]); r.hands[me] = h.filter((_, i) => !ix.includes(i));
  r.lastPlay = { by: me, cards, at: now }; r.pile += cards.length;
  say(r, `🂠 {${me}} ลงไพ่คว่ำ ${cards.length} ใบ “${RANKS[r.table].n} ทั้งหมด!”`);
  nextTurn(r, me, now); return cur;
}
export function ydCall(cur, me, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'play' || r.turn !== me || !r.lastPlay) return;
  const lp = r.lastPlay; const lie = isLie(lp.cards, r.table); const who = lie ? lp.by : me;
  if (r.out[who] || r.gone[who]) { // คนที่ต้องดื่มออกไปแล้ว → ข้ามการดื่ม
    r.shot = { caller: me, by: lp.by, cards: lp.cards, lie, who: null, ko: false, n: 0, odds: 0, at: now };
  } else {
    const o = odds(r, who); const ko = rint(o) === 0; r.shots = { ...r.shots, [who]: (r.shots[who] || 0) + 1 };
    r.shot = { caller: me, by: lp.by, cards: lp.cards, lie, who, ko, n: r.shots[who], odds: o, at: now };
  }
  r.phase = 'shot'; r.at = now; r.until = now + SHOT_MS;
  say(r, `📣 {${me}} ตะโกน “โกหก!” ใส่ {${lp.by}} — ${lie ? 'โกหกจริง!' : 'ไม่ได้โกหก!'}${r.shot.who ? ` {${who}} ต้องดื่มวิสกี้ลุ้น → ${r.shot.ko ? '😵 ฟุบ!' : '😮‍💨 รอด'}` : ''}`);
  return cur;
}
// หมดเวลา / หัวหน้าห้องกดข้าม
function auto(cur, now) {
  const r = cur.round;
  if (r.phase === 'shot') return afterShot(cur, now);
  if (r.phase === 'play') {
    const me = r.turn; const h = r.hands[me] || [];
    if (r.lastPlay && (!h.length || Math.random() < 0.3)) return ydCall(cur, me, now);
    if (!h.length) { nextTurn(r, me, now); return cur; } // กันพลาด: ไม่มีไพ่และไม่มีอะไรให้เรียก
    const want = h.map((c, i) => [c, i]).filter(([c]) => c === r.table || c === WILD).map(([, i]) => i);
    const ix = want.length ? want.slice(0, 1 + rint(Math.min(3, want.length))) : [rint(h.length)];
    return ydPlay(cur, me, ix, now);
  }
}
export function ydTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'yd' || cur.status !== 'playing') return; fix(r);
  if (now >= r.until) return auto(cur, now);
}
export function ydForce(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'yd') return; fix(r); return auto(cur, now);
}
// คนหลุดออกจากห้อง: ออกจากวง ไพ่ในมือทิ้ง
export function kickYd(cur, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || cur.players?.[id] || !r.order.includes(id) || r.out[id]) return;
  r.out = { ...r.out, [id]: true }; r.gone = { ...r.gone, [id]: true }; r.hands[id] = []; say(r, `🚪 {${id}} ออกจากวง`);
  const al = alive(r); if (al.length < 2) return end(cur, al[0] || null, 'left', now);
  if (r.phase === 'play') {
    if (r.lastPlay?.by === id) r.lastPlay = null; // คนลงไม่อยู่แล้ว → เรียกไม่ได้
    if (r.turn === id) nextTurn(r, id, now);
    if (!r.lastPlay && !r.hands[r.turn].length) deal(r, r.turn, now);
  }
  return cur;
}

// ---------- ภาพวาด SVG ----------
const O = { stroke: '#2b1608', strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' };
const ART = [
  ...RANKS.map((x, k) => <g key={k}><text x="50" y="70" textAnchor="middle" fontSize="76" fontWeight="800" fill={x.c} fontFamily="Kanit,sans-serif">{x.n}</text>
    <text x="50" y="99" textAnchor="middle" fontSize="30" fill={x.c}>{x.s}</text></g>),
  // โจ๊กเกอร์ (ไพ่แทน): หมวกคาวบอยสีม่วง
  <g key="j" {...O}><ellipse cx="50" cy="60" rx="40" ry="10" fill="#7a2ac8" /><path d="M28 60 C26 40 30 24 40 26 C44 27 46 31 50 31 C54 31 56 27 60 26 C70 24 74 40 72 60Z" fill="#8a3ad8" />
    <path d="M29 50 C40 54 60 54 71 50 L72 58 C60 62 40 62 28 58Z" fill="#ffd23f" />
    <path d="M50 46 l1.6 3.4 3.6 .5 -2.6 2.5 .6 3.6 -3.2 -1.7 -3.2 1.7 .6 -3.6 -2.6 -2.5 3.6 -.5Z" fill="#d8283a" strokeWidth="1.4" />
    <text x="50" y="92" textAnchor="middle" fontSize="15" fontWeight="800" fill="#2b1608" stroke="none" fontFamily="Kanit,sans-serif">JOKER</text></g>,
];
export const RankArt = ({ k, size = 64, x, y }) => <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-label={CARD_N[k]}>{ART[k]}</svg>;
export const ShotGlass = ({ size = 40, fill = 1, x, y, ko }) => <svg x={x} y={y} width={size} height={size * 1.2} viewBox="0 0 50 60" aria-hidden="true">
  <path d="M6 6 H44 L39 54 H11Z" fill="#ffffff22" stroke="#fff3" strokeWidth="1" />
  {fill > 0 && <path d={`M${6 + 5 * (1 - fill)} ${6 + 48 * (1 - fill)} H${44 - 5 * (1 - fill)} L39 54 H11Z`} fill={ko ? '#7a2a6a' : '#d08a2a'} opacity=".9" />}
  <path d="M6 6 H44 L39 54 H11Z" fill="none" stroke="#2b1608" strokeWidth="3" strokeLinejoin="round" /><path d="M11 12 L14 46" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".5" /></svg>;
const STAR = 'M0 -16 L4.1 -5.7 L15.2 -4.9 L6.7 2.2 L9.4 12.9 L0 7 L-9.4 12.9 L-6.7 2.2 L-15.2 -4.9 L-4.1 -5.7Z';
const Back = () => <svg viewBox="0 0 100 140" width="100%" height="100%" aria-hidden="true"><rect x="4" y="4" width="92" height="132" rx="10" fill="#5a2e14" stroke="#e8c26a" strokeWidth="3" />
  <rect x="12" y="12" width="76" height="116" rx="6" fill="none" stroke="#e8c26a" strokeWidth="1.5" strokeDasharray="4 4" opacity=".6" />
  <g transform="translate(50 70) scale(1.5)" fill="#e8c26a"><path d={STAR} />{[[0, -16], [15.2, -4.9], [9.4, 12.9], [-9.4, 12.9], [-15.2, -4.9]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.2" />)}<circle r="4" fill="#5a2e14" /></g></svg>;
export const YdCard = ({ k, back, small, sel, onClick, dim }) => {
  const Tag = onClick ? 'button' : 'div';
  return <Tag type={onClick ? 'button' : undefined} className={'yd-card' + (back ? ' back' : '') + (small ? ' sm' : '') + (sel ? ' sel' : '') + (dim ? ' dim' : '') + (k === WILD ? ' wild' : '')} style={back ? undefined : { '--c': k === WILD ? '#ffe9a6' : '#fffdf6' }} onClick={onClick}>
    {back ? <Back /> : <><RankArt k={k} size={small ? 34 : 60} />{!small && <b>{CARD_N[k]}</b>}</>}
  </Tag>;
};
const Rank = ({ k }) => <span className="yd-snack">{RANKS[k].n}{RANKS[k].s} <small>({RANKS[k].th})</small></span>;
// ลุงบิล บาร์เทนเดอร์ซาลูน (หมวกคาวบอย หนวดงาม เสื้อกั๊ก โบว์แดง)
export const Bill = ({ size = 90, x, y }) => <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-label="ลุงบิล">
  <g {...O}><path d="M18 100 C18 74 32 66 50 66 C68 66 82 74 82 100Z" fill="#f3ead6" />
    <path d="M18 100 C18 77 29 69 41 67 L50 90 L59 67 C71 69 82 77 82 100Z" fill="#6a3a1a" /><circle cx="44" cy="88" r="1.6" fill="#e8c26a" strokeWidth="1" /><circle cx="56" cy="88" r="1.6" fill="#e8c26a" strokeWidth="1" />
    <circle cx="50" cy="46" r="22" fill="#e8b48a" />
    <path d="M37 41 q5 -3 9 0 M54 41 q5 -3 9 0" fill="none" strokeWidth="2.2" />
    <circle cx="42" cy="46" r="2" fill="#2b1608" stroke="none" /><circle cx="58" cy="46" r="2" fill="#2b1608" stroke="none" />
    <path d="M34 57 C40 50 47 51 50 54 C53 51 60 50 66 57 C60 55 55 59 50 58 C45 59 40 55 34 57Z" fill="#5a3a22" strokeWidth="2" />
    <circle cx="35" cy="52" r="3.2" fill="#ff8a6a" stroke="none" opacity=".45" /><circle cx="65" cy="52" r="3.2" fill="#ff8a6a" stroke="none" opacity=".45" />
    <path d="M42 66 L50 70 L42 75Z M58 66 L50 70 L58 75Z" fill="#b8282a" strokeWidth="2" />
    <ellipse cx="50" cy="28" rx="42" ry="8" fill="#8a5a2a" /><path d="M30 28 C28 12 34 4 42 6 C46 7 47 10 50 10 C53 10 54 7 58 6 C66 4 72 12 70 28Z" fill="#9a6a34" />
    <path d="M30.5 21 C42 24 58 24 69.5 21 L70 27 C58 30 42 30 30 27Z" fill="#3a2010" strokeWidth="2" /></g></svg>;

// ---------- หน้าจอ ----------
export function YdGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, onBack, srvNow }) {
  const r = fix(JSON.parse(JSON.stringify(room.round))); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'yd') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const [sel, setSel] = useState([]); const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const inGame = r.order.includes(myId) && !r.out[myId];
  const myTurn = !res && r.phase === 'play' && r.turn === myId;
  const stepKey = r.deal + r.phase + (r.turn || '') + r.pile;
  useEffect(() => { setSel([]); }, [stepKey]);
  useEffect(() => { if (myTurn) sfx(sound, 'yourTurn'); }, [myTurn, stepKey]);
  useEffect(() => { if (r.phase === 'play' && r.pile === 0) sfx(sound, 'shuffle'); }, [r.deal]);
  useEffect(() => { if (r.lastPlay && r.phase === 'play') sfx(sound, 'card'); }, [r.lastPlay?.at]);
  const shotAt = r.phase === 'shot' && r.shot ? r.shot.at : 0;
  const revealed = !!shotAt && srvNow - shotAt >= REVEAL_AT;
  useEffect(() => { if (shotAt) { sfx(sound, 'liar'); if (r.shot.who) setTimeout(() => sfx(sound, 'tension'), 900); } }, [shotAt]);
  useEffect(() => { if (revealed && r.shot?.who) sfx(sound, r.shot.ko ? 'knock' : 'survive'); }, [revealed]);
  const due = !res && r.until && srvNow >= r.until;
  useEffect(() => { if (due) tx(cc => ydTick(cc, srvNow)); }, [due, r.at, r.phase]);
  const left = secs(r.until - srvNow);
  const name = id => id === myId ? 'คุณ' : nameOf(id);
  const myHand = r.hands[myId] || [];

  const Glasses = ({ id }) => <span className="yd-glasses" title={`ดื่มไปแล้ว ${r.shots[id]} แก้ว`}>{Array.from({ length: r.glasses }, (_, i) => <ShotGlass key={i} size={13} fill={i < r.shots[id] ? 0 : 1} />)}</span>;
  const Seat = ({ id }) => {
    const out = r.out[id]; const now = !res && r.phase === 'play' && r.turn === id;
    return <div className={'yd-seat' + (id === myId ? ' me' : '') + (now ? ' now' : '') + (out ? ' out' : '') + (res && r.winner === id ? ' win' : '')}>
      <Avatar id={id} av={av} size={42} dead={out} />
      <div className="yd-seat-tt"><b>{name(id)}</b><small>{out ? (r.gone[id] ? '🚪 ออกจากวง' : '😵 ฟุบแล้ว') : `แก้วถัดไป โอกาสฟุบ 1/${odds(r, id)}`}</small><Glasses id={id} /></div>
      {!out && <span className="yd-inhand" title="ไพ่ในมือ">🂠 {r.hands[id].length}</span>}
    </div>;
  };

  if (res) {
    const W = r.winner; const meWin = W === myId;
    return <div className="yd-game">
      <Outcome art={!W ? 'cross' : meWin ? 'win' : 'lose'} tone={meWin ? 'good' : ''} title={!W ? '🚪 คนเหลือไม่พอ จบวง' : meWin ? '🤠 คุณคือคาวบอยคอแข็งคนสุดท้าย!' : `🤠 ${nameOf(W)} คาวบอยคอแข็งที่สุดในซาลูน!`}>
        {W ? `${name(W)} ยังนั่งตัวตรงเป็นคนสุดท้าย รับ +${YD_SCORE} แต้ม` : 'คนอื่นออกจากห้องไปหมด'}
      </Outcome>
      <SecH icon="🥃">สภาพวงหลังเลิก</SecH>
      <div className="yd-seats">{r.order.map(id => <Seat key={id} id={id} />)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเปิดวงใหม่</button> : <div className="waiting">รอหัวหน้าห้องเปิดวงใหม่…</div>}
    </div>;
  }

  const lp = r.lastPlay; const s = r.shot;
  const toggle = i => { sfx(sound, 'select'); setSel(v => v.includes(i) ? v.filter(x => x !== i) : v.length < 3 ? [...v, i] : v); };
  return <div className="yd-game">
    <div className="yd-banner"><Bill size={64} /><div><span className="eyebrow">ตาที่ {r.deal} • วงที่ {r.number}</span><h2>ไพ่ประจำวง: <Rank k={r.table} /></h2><small>ลงคว่ำ 1–3 ใบ แล้วบอกว่าเป็น {RANKS[r.table].n} ทั้งหมด • 🃏 โจ๊กเกอร์แทนอะไรก็ได้</small></div><YdCard k={r.table} small /></div>

    <section className={'yd-stage' + (myTurn ? ' me' : '')}>
      <div className="yd-pile">{Array.from({ length: Math.min(r.pile, 9) }, (_, i) => <span key={i} style={{ '--i': i }}><YdCard back small /></span>)}{!r.pile && <i className="hint">ยังไม่มีใครลงไพ่</i>}</div>
      <div className="yd-flight"><Avatar id={r.turn} av={av} size={56} />
        <div className="yd-ft"><span className="ct-kicker">{r.turn === myId ? '🫵 ตาคุณ' : `⏳ ตาของ ${nameOf(r.turn)}`}</span>
          {lp ? <b key={lp.at} className="yd-claim">{name(lp.by)} ลงคว่ำ {lp.cards.length} ใบ: “{RANKS[r.table].n} {lp.cards.length} ใบ!”</b> : <b>เริ่มลงไพ่ได้เลย</b>}
          <small>{lp ? `${name(r.turn)} จะลงต่อ หรือตะโกน “โกหก!”` : ' '}</small></div>
        <TimerRing secs={left} total={(r.tmT || PLAY_MS) / 1000} size={58} label="วิ" /></div>
    </section>

    <SecH icon="🪑">คนในวง</SecH>
    <div className="yd-seats">{r.order.map(id => <Seat key={id} id={id} />)}</div>

    {inGame && <><SecH icon="🃏">ไพ่ในมือคุณ ({myHand.length} ใบ)</SecH>
      <div className="yd-hand">{myHand.map((k, i) => <YdCard key={i} k={k} dim={k !== r.table && k !== WILD} />)}{!myHand.length && <i className="hint">ไพ่หมดมือ — ถึงตาแล้วต้องเรียก “โกหก!”</i>}</div></>}
    {!inGame && r.order.includes(myId) && <p className="hint">😵 คุณฟุบไปแล้ว นั่งดูเพื่อนลุ้นต่อได้เลย</p>}

    <ActionSheet open={myTurn} k={'p' + stepKey} icon="🂠" title={myHand.length ? 'ตาคุณ! ลงไพ่ หรือ เรียกโกหก' : 'ไพ่หมดมือ — ต้องเรียก!'} sub={`บอกว่าเป็น “${rk(r.table)}” ทั้งหมด จะจริงหรือไม่ก็ได้`} secs={left} total={(r.tmT || PLAY_MS) / 1000}>
      {lp && <div className="yd-recv"><div className="yd-fan">{lp.cards.map((_, i) => <YdCard key={i} back small />)}</div><span className="yd-bubble">{name(lp.by)}: “{RANKS[r.table].n} {lp.cards.length} ใบจ้า”</span></div>}
      {lp && <button className="primary wide yd-liar" onClick={() => { sfx(sound, 'confirm'); tx(cc => ydCall(cc, myId, srvNow)); }}>📣 โกหก! เปิดไพ่ {name(lp.by)}</button>}
      {myHand.length > 0 && <>
        <small className="yd-step">เลือกไพ่ 1–3 ใบ (เลือกแล้ว {sel.length})</small>
        <div className="yd-hand">{myHand.map((k, i) => <YdCard key={i} k={k} sel={sel.includes(i)} onClick={() => toggle(i)} />)}</div>
        <button className="primary wide" disabled={!sel.length} onClick={() => { sfx(sound, 'card'); tx(cc => ydPlay(cc, myId, sel, srvNow)); }}>🤫 ลงคว่ำ {sel.length || ''} ใบ “{RANKS[r.table].n} ทั้งหมด!”</button>
      </>}
    </ActionSheet>

    {s && r.phase === 'shot' && typeof document !== 'undefined' && createPortal(<div className="yd-shot-back"><div className={'yd-shot' + (revealed ? (s.who ? (s.ko ? ' ko' : ' safe') : ' safe') : '')}>
      <b className="yd-shout">📣 {name(s.caller)}: “โกหก!”</b>
      <div className="yd-fan big">{s.cards.map((k, i) => <span key={i} className="yd-flip" style={{ '--d': `${0.5 + i * 0.25}s` }}><YdCard k={k} dim={k !== r.table && k !== WILD} /></span>)}</div>
      <p className={'yd-verdict ' + (s.lie ? 'lie' : 'true')}>{name(s.by)} {s.lie ? '🤥 โกหกจริง!' : '😇 ไม่ได้โกหก!'}</p>
      {s.who ? <div className="yd-drink">
        <Avatar id={s.who} av={av} size={72} dead={revealed && s.ko} />
        <div className="yd-glass-wrap"><ShotGlass size={56} ko={revealed && s.ko} /></div>
        <div className="yd-dtx"><b>{name(s.who)} ต้องดื่มวิสกี้ลุ้น!</b><small>แก้วที่ {s.n} • โอกาสฟุบ 1/{s.odds}</small>
          <strong>{revealed ? (s.ko ? '😵💫 ฟุบ! ออกจากวง' : '😮‍💨 รอด! ยังไหว') : 'อึก… อึก… อึก…'}</strong></div>
      </div> : <p className="hint">คนที่ต้องดื่มออกจากวงไปแล้ว — ข้าม</p>}
    </div></div>, document.body)}

    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 6).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    {isHost && <HostBar>
      <button className="secondary" onClick={() => { if (confirm('ให้ระบบเล่นแทนคนที่กำลังคิดอยู่?')) tx(cc => ydForce(cc, srvNow)); }}>⏩ ข้าม (ระบบเล่นแทน)</button>
      {alive(r).filter(id => !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(cc => kickYd(cc, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
    </HostBar>}
  </div>;
}

// ---------- ห้องรอ ----------
export function YdLobby({ db, roomCode, room, isHost, sound }) {
  const set = room.settings?.yd || {};
  const save = patch => runTransaction(ref(db, `rooms/${roomCode}/settings/yd`), c => ({ ...(c || {}), ...patch })).catch(() => {});
  return <div className="uc-lobby">
    <label>🥃 วิสกี้ลุ้นต่อคน {isHost ? '' : '(หัวหน้าห้องตั้ง)'}</label>
    <select value={+set.glasses === 4 ? 4 : 6} disabled={!isHost} onChange={e => { sfx(sound, 'select'); save({ glasses: +e.target.value }); }}><option value={6}>6 แก้ว (ปกติ)</option><option value={4}>4 แก้ว (เกมเร็ว)</option></select>
    <div className="yd-hand lobby">{[0, 1, 2, 3, WILD].map(k => <YdCard key={k} k={k} />)}</div>
  </div>;
}
