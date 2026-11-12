// เกม "ทุเรียนตูม!" — ผลัดกันจั่วไพ่ ใครจั่วได้ทุเรียนตูมแล้วไม่มีที่หนีบจมูก = ตกรอบ เหลือคนสุดท้ายชนะ
// (กลไกแนวเดียวกับเกมไพ่จั่วหนีระเบิด แต่ไพ่ ชื่อ ภาพ เป็นของเราเอง)
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint } from './rand.js';
import { Avatar, Phase, PlayerGrid, HostBar, SecH, Outcome, Leaderboard } from './ui.jsx';
import { CardFace } from './cards.jsx';

export const BOOM_MIN = 2, BOOM_MAX = 10;
export const BOOM_SCORE = { win: 3, second: 1 };
const WINDOW = 4000, FAVOR_MS = 20000, DEFUSE_MS = 25000;
export const BOOM_CARDS = {
  bomb: { n: 'ทุเรียนตูม!', cat: 'bomb', text: 'จั่วได้ = ระเบิด! ไม่มีที่หนีบจมูกคือตกรอบ' },
  clip: { n: 'ที่หนีบจมูก', cat: 'save', text: 'รอดจากทุเรียน 1 ครั้ง แล้วแอบใส่ทุเรียนกลับในกอง' },
  nope: { n: 'ไม่เอา!', cat: 'react', text: 'ยกเลิกไพ่ที่เพิ่งลง เล่นได้ทุกเมื่อ แม้ไม่ใช่ตาคุณ' },
  skip: { n: 'ขอผ่าน', cat: 'act', text: 'จบตาโดยไม่ต้องจั่ว' },
  attack: { n: 'โยนให้เพื่อน', cat: 'act', text: 'จบตาโดยไม่จั่ว คนถัดไปต้องเล่น 2 ตาติด' },
  future: { n: 'ส่องแผง', cat: 'act', text: 'แอบดูไพ่ 3 ใบบนสุดของกอง' },
  shuffle: { n: 'เขย่าแผง', cat: 'act', text: 'สับกองไพ่ใหม่' },
  favor: { n: 'ขอหน่อยนะ', cat: 'act', target: true, text: 'เพื่อนที่เลือกต้องให้ไพ่คุณ 1 ใบ (เขาเลือกเอง)' },
  bottom: { n: 'แอบหยิบข้างล่าง', cat: 'act', text: 'จั่วใบล่างสุดของกองแทน แล้วจบตา' },
  market: { n: 'ตลาดแตก', cat: 'act', text: 'ทุกคนส่งไพ่สุ่ม 1 ใบให้คนถัดไป' },
  f1: { n: 'มังคุด', cat: 'fruit', text: 'จับคู่ 2 ใบ = ขโมยสุ่ม • 3 ใบ = ขอไพ่ที่ต้องการ' },
  f2: { n: 'เงาะ', cat: 'fruit', text: 'จับคู่ 2 ใบ = ขโมยสุ่ม • 3 ใบ = ขอไพ่ที่ต้องการ' },
  f3: { n: 'ลำไย', cat: 'fruit', text: 'จับคู่ 2 ใบ = ขโมยสุ่ม • 3 ใบ = ขอไพ่ที่ต้องการ' },
  f4: { n: 'มะม่วง', cat: 'fruit', text: 'จับคู่ 2 ใบ = ขโมยสุ่ม • 3 ใบ = ขอไพ่ที่ต้องการ' },
  f5: { n: 'ส้มโอ', cat: 'fruit', text: 'จับคู่ 2 ใบ = ขโมยสุ่ม • 3 ใบ = ขอไพ่ที่ต้องการ' },
};
const ACTIONS = ['skip', 'attack', 'future', 'shuffle', 'favor', 'bottom', 'market'];
export const T = id => String(id).split('-')[0];
const Card = ({ id, ...p }) => { const c = BOOM_CARDS[T(id)] || {}; return <CardFace art={T(id)} name={c.n} text={c.text} cat={c.cat} {...p} />; };

// ---------- จัดสำรับ ----------
export function deckPlan(n) {
  const f = n <= 3 ? 0.6 : n <= 5 ? 1 : 1.5; const k = v => Math.max(1, Math.round(v * f));
  return { nope: k(5), skip: k(4), attack: k(4), future: k(5), shuffle: k(4), favor: k(4), bottom: k(3), market: n <= 3 ? 1 : 2, f1: k(4), f2: k(4), f3: k(4), f4: k(4), f5: k(4) };
}
export function makeBoomRound(ids, opts = {}, number = 1) {
  const n = ids.length; const plan = deckPlan(n); let deck = [];
  Object.entries(plan).forEach(([t, c]) => { for (let i = 0; i < c; i++) deck.push(`${t}-${i}`); });
  deck = shuffle(deck); const hands = {}; const alive = {};
  ids.forEach((id, i) => { hands[id] = [...deck.splice(0, 5), `clip-${i}`]; alive[id] = true; });
  const extra = []; for (let i = 0; i < (n <= 4 ? 2 : 1); i++) extra.push(`clip-x${i}`);
  for (let i = 0; i < n - 1; i++) extra.push(`bomb-${i}`);
  return { number, kind: 'boom', order: shuffle(ids), turn: 0, turnsLeft: 1, alive, hands, deck: shuffle([...deck, ...extra]), discard: [], pending: null, phase: 'play', log: [], out: [], startedAt: Date.now() };
}

// ---------- ตรรกะเกม (ทำงานในทรานแซกชันของห้อง) ----------
const hand = (r, id) => r.hands?.[id] || [];
const current = r => r.order[r.turn];
const aliveIds = (r, cur) => r.order.filter(id => r.alive?.[id] && (!cur || cur.players?.[id]));
function say(r, text, extra) { r.log = [...(r.log || []), { text, t: Date.now(), ...extra }].slice(-40); }
function nextAlive(r, from) { const n = r.order.length; for (let i = 1; i <= n; i++) { const k = (from + i) % n; if (r.alive[r.order[k]]) return k; } return from; }
function passTurn(r, turns = 1) { r.turn = nextAlive(r, r.turn); r.turnsLeft = turns; r.peek = null; }
function endTurn(r) { r.turnsLeft = (r.turnsLeft || 1) - 1; if (r.turnsLeft <= 0) passTurn(r, 1); else r.peek = null; }
function take(r, id, card) { const h = hand(r, id); const i = h.indexOf(card); if (i < 0) return false; h.splice(i, 1); r.hands[id] = h; return true; }
function give(r, id, card) { r.hands[id] = [...hand(r, id), card]; }
function finish(cur) {
  const r = cur.round; const left = r.order.filter(id => r.alive[id]); const winner = left[0];
  const points = {}, sc = { ...(cur.scores || {}) }; const second = (r.out || [])[(r.out || []).length - 1];
  Object.keys(cur.players || {}).forEach(id => { points[id] = id === winner ? BOOM_SCORE.win : id === second ? BOOM_SCORE.second : 0; sc[id] = (sc[id] || 0) + points[id]; });
  r.phase = 'done'; r.winner = winner; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'boom', winner: winner || null, second: second || null, points };
  return cur;
}
function eliminate(cur, id, why) {
  const r = cur.round; r.alive[id] = false; r.discard = [...(r.discard || []), ...hand(r, id)]; r.hands[id] = []; r.out = [...(r.out || []), id];
  say(r, why, { boom: id });
  if (r.order.filter(x => r.alive[x]).length <= 1) return finish(cur);
  if (current(r) === id) passTurn(r, 1);
  return cur;
}
function drawFor(cur, id, bottom, now) {
  const r = cur.round; const deck = [...(r.deck || [])]; const card = bottom ? deck.pop() : deck.shift(); r.deck = deck;
  if (!card) { endTurn(r); return cur; }
  if (T(card) === 'bomb') {
    const clip = hand(r, id).find(c => T(c) === 'clip');
    if (clip) { take(r, id, clip); r.discard = [...(r.discard || []), clip]; r.phase = 'defuse'; r.defuse = { pid: id, bomb: card, until: now + DEFUSE_MS }; r.boom = { pid: id, at: now, saved: true }; say(r, `💥 {${id}} จั่วได้ทุเรียนตูม! แต่หนีบจมูกทัน 🧷`); return cur; }
    r.boom = { pid: id, at: now, saved: false };
    return eliminate(cur, id, `💥 ตูม! {${id}} จั่วได้ทุเรียนตูมแล้วไม่มีที่หนีบจมูก — ตกรอบ`);
  }
  give(r, id, card); say(r, `🃏 {${id}} จั่วไพ่${bottom ? 'ใบล่างสุด' : ''} 1 ใบ`); endTurn(r); return cur;
}
export function playCards(cur, me, cards, target, named, now) {
  const r = cur.round; if (r.phase !== 'play' || r.pending || current(r) !== me || !r.alive[me]) return;
  if (!cards.length || new Set(cards).size !== cards.length || !cards.every(c => hand(r, me).includes(c))) return;
  const types = [...new Set(cards.map(T))]; if (types.length !== 1) return; const t = types[0];
  let kind;
  if (cards.length === 1 && ACTIONS.includes(t)) kind = t;
  else if (cards.length === 2 && !['bomb', 'clip', 'nope'].includes(t)) kind = 'pair';
  else if (cards.length === 3 && !['bomb', 'clip', 'nope'].includes(t)) kind = 'trio';
  else return;
  const needTarget = ['favor', 'pair', 'trio'].includes(kind);
  if (needTarget && (!target || target === me || !r.alive[target] || !cur.players?.[target] || !hand(r, target).length)) return;
  if (kind === 'trio' && !BOOM_CARDS[named]) return;
  cards.forEach(c => take(r, me, c)); r.discard = [...(r.discard || []), ...cards];
  r.pending = { by: me, kind, cards, target: needTarget ? target : null, named: kind === 'trio' ? named : null, until: now + WINDOW, nopes: 0, noped: [] };
  say(r, `🃏 {${me}} เล่น “${BOOM_CARDS[t].n}”${cards.length > 1 ? ` ×${cards.length}` : ''}${needTarget ? ` ใส่ {${target}}` : ''}`);
  return cur;
}
export function playNope(cur, me, card, now) {
  const r = cur.round; if (!r.pending || !r.alive[me] || T(card) !== 'nope' || !take(r, me, card)) return;
  r.discard = [...(r.discard || []), card]; r.pending.nopes = (r.pending.nopes || 0) + 1; r.pending.noped = [...(r.pending.noped || []), me]; r.pending.until = now + WINDOW;
  say(r, `🙅 {${me}} ไม่เอา!${r.pending.nopes % 2 ? '' : ' (ยกเลิกการไม่เอา)'}`); return cur;
}
function resolve(cur, now) {
  const r = cur.round; const p = r.pending; r.pending = null;
  if ((p.nopes || 0) % 2) { say(r, `🚫 “${BOOM_CARDS[T(p.cards[0])].n}” ถูกยกเลิก`); return cur; }
  switch (p.kind) {
    case 'skip': endTurn(r); break;
    case 'attack': passTurn(r, 2); say(r, `👉 {${current(r)}} ต้องเล่น 2 ตาติด!`); break;
    case 'future': r.peek = { pid: p.by, cards: (r.deck || []).slice(0, 3), at: now }; break;
    case 'shuffle': r.deck = shuffle(r.deck || []); r.peek = null; say(r, '🔀 สับกองไพ่แล้ว'); break;
    case 'favor': if (hand(r, p.target).length) { r.phase = 'favor'; r.favor = { from: p.target, to: p.by, until: now + FAVOR_MS }; } break;
    case 'bottom': return drawFor(cur, p.by, true, now);
    case 'market': { const ids = aliveIds(r, cur).filter(id => hand(r, id).length); const picks = ids.map(id => { const h = hand(r, id); return h[rint(h.length)]; });
      ids.forEach((id, i) => take(r, id, picks[i])); ids.forEach((id, i) => give(r, ids[(i + 1) % ids.length], picks[i])); say(r, '🛒 ตลาดแตก! ทุกคนส่งไพ่ให้คนถัดไป'); break; }
    case 'pair': { const h = hand(r, p.target); if (h.length) { const c = h[rint(h.length)]; take(r, p.target, c); give(r, p.by, c); say(r, `🖐️ {${p.by}} ขโมยไพ่ 1 ใบจาก {${p.target}}`); } break; }
    case 'trio': { const c = hand(r, p.target).find(x => T(x) === p.named); if (c) { take(r, p.target, c); give(r, p.by, c); say(r, `🎯 {${p.by}} ได้ “${BOOM_CARDS[p.named].n}” จาก {${p.target}}`); } else say(r, `😅 {${p.target}} ไม่มี “${BOOM_CARDS[p.named].n}”`); break; }
  }
  return cur;
}
export function drawCard(cur, me, now) { const r = cur.round; if (r.phase !== 'play' || r.pending || current(r) !== me) return; return drawFor(cur, me, false, now); }
export function placeBomb(cur, me, pos) {
  const r = cur.round; if (r.phase !== 'defuse' || r.defuse?.pid !== me) return;
  const deck = [...(r.deck || [])]; deck.splice(Math.max(0, Math.min(deck.length, pos | 0)), 0, r.defuse.bomb); r.deck = deck;
  r.phase = 'play'; r.defuse = null; say(r, `🤫 {${me}} แอบใส่ทุเรียนกลับเข้ากองแล้ว…`); endTurn(r); return cur;
}
export function giveFavor(cur, me, card) {
  const r = cur.round; if (r.phase !== 'favor' || r.favor?.from !== me || !take(r, me, card)) return;
  give(r, r.favor.to, card); say(r, `🎁 {${me}} ให้ไพ่ {${r.favor.to}} 1 ใบ`); r.phase = 'play'; r.favor = null; return cur;
}
// เวลาหมด (ทุกเครื่องเรียกได้ ทรานแซกชันกันซ้ำ)
export function boomTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'boom' || r.phase === 'done') return;
  if (r.pending && now >= r.pending.until) return resolve(cur, now);
  if (r.phase === 'favor' && now >= r.favor.until) { const h = hand(r, r.favor.from); return h.length ? giveFavor(cur, r.favor.from, h[rint(h.length)]) : (r.phase = 'play', r.favor = null, cur); }
  if (r.phase === 'defuse' && now >= r.defuse.until) return placeBomb(cur, r.defuse.pid, rint((r.deck || []).length + 1));
}
// หัวหน้าห้อง: คนที่ถึงตาหลุด/ค้าง → บังคับจั่ว หรือ ตัดออก
export function forceDraw(cur, now) { const r = cur.round; if (r.phase !== 'play' || r.pending) return; return drawFor(cur, current(r), false, now); }
export function kickOut(cur, id) { const r = cur.round; if (!r.alive?.[id] || cur.players?.[id]) return; return eliminate(cur, id, `🚪 {${id}} หลุดออกจากห้อง — ตัดออกจากเกม`); }

// ---------- หน้าจอ ----------
export function BoomGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack, srvNow }) {
  const r = room.round; const res = room.status === 'result' && room.result;
  const [sel, setSel] = useState([]); const [target, setTarget] = useState(null); const [named, setNamed] = useState(null); const [pos, setPos] = useState(0); const [boomFx, setBoomFx] = useState(null); const fxOff = useRef(0);
  const myHand = r.hands?.[myId] || []; const deck = r.deck || []; const cur = r.order?.[r.turn]; const myTurn = cur === myId && r.alive?.[myId] && !res;
  const alive = r.order.filter(id => r.alive?.[id]); const bombs = deck.filter(c => T(c) === 'bomb').length;
  const P = r.pending; const left = P ? Math.max(0, P.until - srvNow) : 0;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c || c.status !== 'playing' || c.round?.kind !== 'boom') return; c.round.hands = c.round.hands || {}; c.round.alive = c.round.alive || {}; return f(c); });
  const nm = s => String(s).replace(/\{([^}]+)\}/g, (_, id) => nameOf(id));
  useEffect(() => { setSel([]); setTarget(null); setNamed(null); }, [r.turn, r.turnsLeft, myHand.length]);
  useEffect(() => { if (r.phase === 'defuse' && r.defuse?.pid === myId) setPos(Math.floor(deck.length / 2)); }, [r.phase]);
  // เวลาหมด → สรุป (ทุกเครื่องพยายาม)
  const due = (P && srvNow >= P.until) || (r.phase === 'favor' && srvNow >= r.favor?.until) || (r.phase === 'defuse' && srvNow >= r.defuse?.until);
  useEffect(() => { if (due && !res) tx(c => boomTick(c, srvNow)); }, [due]);
  // เอฟเฟกต์ระเบิด + เสียง
  const lastBoom = useRef(r.boom?.at || 0);
  useEffect(() => { const b = r.boom; if (!b || b.at <= lastBoom.current) return; lastBoom.current = b.at; setBoomFx(b); sfx(sound, b.saved ? 'defuse' : 'boom'); const t = setTimeout(() => { setBoomFx(null); fxOff.current = Date.now(); }, 2600); return () => clearTimeout(t); }, [r.boom?.at]);
  const prev = useRef(null);
  useEffect(() => { const s = { turn: `${r.turn}-${r.turnsLeft}`, pend: P ? `${P.by}-${P.nopes}` : '', res: !!res }; const p = prev.current; prev.current = s; if (!p) return;
    if (s.res && !p.res) { sfx(sound, room.result?.winner === myId ? 'win' : 'lose'); return; }
    if (s.pend && s.pend !== p.pend) sfx(sound, P.nopes ? 'nope' : 'card');
    if (s.turn !== p.turn && myTurn) setTimeout(() => sfx(sound, 'yourTurn'), 200);
  });

  // เลือกไพ่ในมือ
  const selType = sel.length ? T(sel[0]) : null;
  const toggle = id => { sfx(sound, 'click'); setSel(s => s.includes(id) ? s.filter(x => x !== id) : T(id) !== selType ? [id] : s.length >= 3 ? s : [...s, id]); };
  const kind = sel.length === 1 && ACTIONS.includes(selType) ? selType : sel.length === 2 && !['bomb', 'clip', 'nope'].includes(selType) ? 'pair' : sel.length === 3 && !['bomb', 'clip', 'nope'].includes(selType) ? 'trio' : null;
  const needTarget = ['favor', 'pair', 'trio'].includes(kind);
  const targets = alive.filter(id => id !== myId && room.players?.[id] && (r.hands?.[id] || []).length);
  async function play() { if (!kind) return; if (needTarget && !target) { msg('เลือกเพื่อนที่จะเล่นใส่ก่อน'); return; } if (kind === 'trio' && !named) { msg('เลือกไพ่ที่อยากได้'); return; } await tx(c => playCards(c, myId, sel, target, named, srvNow)); setSel([]); }
  const myNope = myHand.find(c => T(c) === 'nope');
  const nopeOk = P && r.alive?.[myId] && myNope && !res;
  const kindText = { skip: 'จบตาไม่ต้องจั่ว', attack: 'โยนให้คนถัดไปเล่น 2 ตา', future: 'ดูไพ่ 3 ใบบนสุด', shuffle: 'สับกองไพ่', favor: 'ให้เพื่อนส่งไพ่ให้ 1 ใบ', bottom: 'จั่วใบล่างสุดแล้วจบตา', market: 'ทุกคนส่งไพ่สุ่มให้คนถัดไป', pair: 'ขโมยไพ่สุ่ม 1 ใบ', trio: 'ขอไพ่ที่ระบุ' };
  const danger = deck.length ? Math.round(bombs / deck.length * 100) : 0;

  return <div className="boom-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number} • เหลือ {alive.length} คน</span><span className="cat-tag">💥 ทุเรียนในกอง {bombs} ลูก</span></div>

    {/* โต๊ะ: กองจั่ว / กองทิ้ง */}
    {!res && <div className="boom-table">
      <div className="pile"><CardFace back backKind="boom" size="md" badge={<span className="pile-n">{deck.length}</span>} /><small>กองจั่ว</small></div>
      <div className="danger"><b className={danger >= 25 ? 'hot' : ''}>{danger}%</b><small>โอกาสเจอทุเรียน<br />ใบถัดไป</small><div className="durians">{Array.from({ length: bombs }, (_, i) => <span key={i}>💥</span>)}</div></div>
      <div className="pile">{(r.discard || []).length ? <Card id={r.discard[r.discard.length - 1]} size="md" /> : <div className="gcard md empty" />}<small>กองทิ้ง</small></div>
    </div>}

    {!res && (myTurn && r.phase === 'play' ? <Phase art="guess" tone="me" kicker={`🎯 ตาคุณ${r.turnsLeft > 1 ? ` (เหลือ ${r.turnsLeft} ตา)` : ''}`} title="เล่นไพ่กี่ใบก็ได้ แล้วจั่ว 1 ใบเพื่อจบตา">แตะไพ่ในมือเพื่อเลือก (ผลไม้เหมือนกัน 2–3 ใบเล่นเป็นชุดได้) • ไม่อยากเสี่ยง ใช้ขอผ่าน/โยนให้เพื่อน</Phase>
      : <Phase art="wait" kicker={r.alive?.[myId] ? 'รอตาเพื่อน' : '💀 คุณตกรอบแล้ว'} title={<>ตาของ <Avatar id={cur} av={av} size={26} /> {nameOf(cur)}{r.turnsLeft > 1 ? ` (${r.turnsLeft} ตา)` : ''}</>}>{r.alive?.[myId] ? (myNope ? 'ถือ “ไม่เอา!” อยู่ — มีใครลงไพ่เมื่อไหร่ กดสวนได้ทันที' : 'นั่งลุ้นว่าใครจะจั่วได้ทุเรียน…') : 'ดูเพื่อนเล่นต่อได้ ห้ามใบ้นะ!'}</Phase>)}

    {/* ไพ่ที่เพิ่งลง + ช่วงเวลาให้สวน */}
    {P && !res && <div className={'pending' + (P.nopes % 2 ? ' noped' : '')}>
      <Card id={P.cards[0]} size="sm" />
      <div className="pd-body"><b><Avatar id={P.by} av={av} size={22} /> {nameOf(P.by)} เล่น “{BOOM_CARDS[T(P.cards[0])].n}”{P.cards.length > 1 ? ` ×${P.cards.length}` : ''}{P.target ? <> ใส่ {nameOf(P.target)}</> : ''}</b>
        <small>{P.nopes ? `🙅 โดนไม่เอา ${P.nopes} ครั้ง → ${P.nopes % 2 ? 'ถูกยกเลิก' : 'กลับมาได้ผล'}` : kindText[P.kind]} • อีก {Math.ceil(left / 1000)} วิ</small>
        <div className="pd-bar"><i style={{ width: (left / WINDOW * 100) + '%' }} /></div></div>
      {nopeOk && <button className="nope-btn" onClick={() => { sfx(sound, 'nope'); tx(c => playNope(c, myId, myNope, srvNow)); }}>🙅 ไม่เอา!</button>}
    </div>}

    {/* ส่องแผง */}
    {r.peek?.pid === myId && myTurn && !P && <div className="peek"><SecH icon="🔭">ไพ่ 3 ใบบนสุด <small>ซ้ายสุด = ใบที่จะจั่วถัดไป • เห็นแค่คุณ</small></SecH><div className="hand-row">{r.peek.cards.map((c, i) => <Card key={c} id={c} size="md" tag={`ใบที่ ${i + 1}`} />)}</div></div>}

    {/* หนีบจมูกทัน → ใส่ทุเรียนกลับ */}
    {r.phase === 'defuse' && !res && (r.defuse.pid === myId ? <div className="defuse"><Phase art="check" tone="good" kicker="🧷 รอดหวุดหวิด!" title="แอบใส่ทุเรียนกลับในกองตรงไหนดี?">คนอื่นไม่เห็นว่าคุณใส่ไว้ตรงไหน • เวลา {Math.ceil(Math.max(0, r.defuse.until - srvNow) / 1000)} วิ</Phase>
      <input type="range" min="0" max={deck.length} value={pos} onChange={e => setPos(+e.target.value)} className="pos-range" />
      <div className="pos-label">{pos === 0 ? '⬆️ บนสุด (คนถัดไปจั่วเจอเลย!)' : pos >= deck.length ? '⬇️ ล่างสุด' : `ใบที่ ${pos + 1} จากบน`}</div>
      <div className="pos-quick"><button className="secondary" onClick={() => setPos(0)}>บนสุด</button><button className="secondary" onClick={() => setPos(Math.min(deck.length, 1))}>ใบที่ 2</button><button className="secondary" onClick={() => setPos(rint(deck.length + 1))}>สุ่ม</button><button className="secondary" onClick={() => setPos(deck.length)}>ล่างสุด</button></div>
      <button className="primary wide" onClick={() => tx(c => placeBomb(c, myId, pos))}>🤫 ใส่ทุเรียนกลับ</button></div>
      : <div className="waiting">🤫 {nameOf(r.defuse.pid)} กำลังแอบใส่ทุเรียนกลับเข้ากอง… ({Math.ceil(Math.max(0, r.defuse.until - srvNow) / 1000)} วิ)</div>)}

    {/* ขอหน่อยนะ → ผู้ถูกขอเลือกไพ่ให้ */}
    {r.phase === 'favor' && !res && (r.favor.from === myId ? <Phase art="favor" tone="me" kicker="🥺 มีคนขอไพ่" title={`เลือกไพ่ 1 ใบให้ ${nameOf(r.favor.to)}`}>แตะไพ่ในมือที่จะให้ • ไม่เลือกภายใน {Math.ceil(Math.max(0, r.favor.until - srvNow) / 1000)} วิ ระบบสุ่มให้</Phase>
      : <div className="waiting">🥺 รอ {nameOf(r.favor.from)} เลือกไพ่ให้ {nameOf(r.favor.to)}…</div>)}

    {/* ไพ่ในมือ */}
    {!res && r.alive?.[myId] && <>
      <SecH icon="🃏">ไพ่ในมือ <small>{myHand.length} ใบ</small></SecH>
      <div className="hand-row">{myHand.map(c => <Card key={c} id={c} size="md" selected={sel.includes(c)}
        onClick={r.phase === 'favor' && r.favor?.from === myId ? () => tx(x => giveFavor(x, myId, c)) : myTurn && r.phase === 'play' && !P ? () => toggle(c) : undefined} />)}</div>
      {myTurn && r.phase === 'play' && !P && <div className="boom-actions">
        {kind && <div className="act-box"><b>เล่น “{BOOM_CARDS[selType].n}”{sel.length > 1 ? ` ×${sel.length}` : ''} — {kindText[kind]}</b>
          {needTarget && <PlayerGrid ids={targets} av={av} nameOf={nameOf} selected={target} onPick={id => { sfx(sound, 'select'); setTarget(id); }} small note={id => `🃏 ${(r.hands?.[id] || []).length} ใบ`} />}
          {kind === 'trio' && <div className="name-pick">{Object.keys(BOOM_CARDS).filter(t => t !== 'bomb').map(t => <Card key={t} id={t + '-q'} size="sm" selected={named === t} onClick={() => setNamed(t)} />)}</div>}
          <button className="primary wide" disabled={needTarget && !target} onClick={play}>🃏 เล่นไพ่</button></div>}
        {sel.length > 0 && !kind && <p className="hint">{['bomb', 'clip'].includes(selType) ? 'ไพ่ใบนี้เล่นเองไม่ได้ (ใช้อัตโนมัติ)' : selType === 'nope' ? '“ไม่เอา!” ใช้สวนตอนคนอื่นลงไพ่' : 'ผลไม้ใช้เป็นชุด 2–3 ใบที่เหมือนกัน'}</p>}
        <button className="draw-btn" onClick={() => { sfx(sound, 'draw'); tx(c => drawCard(c, myId, srvNow)); }}><span>🃏</span> จั่วไพ่ (จบตา)<small>เสี่ยงเจอทุเรียน {danger}%</small></button>
      </div>}
    </>}

    {res && <>
      <Outcome art="win" tone={res.winner === myId ? 'good' : ''} title={`${nameOf(res.winner)} รอดคนสุดท้าย! 🏆`}>ไม่โดนทุเรียนเลยสักลูก • ได้ +{BOOM_SCORE.win}{res.second ? <> • {nameOf(res.second)} อันดับ 2 ได้ +{BOOM_SCORE.second}</> : ''}</Outcome>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={() => { if (boomFx || Date.now() - fxOff.current < 800) return; onBack(); }}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}

    <SecH icon="👥">ผู้เล่น <small>ลำดับตาเรียงตามนี้</small></SecH>
    <PlayerGrid ids={r.order.filter(id => room.players?.[id] || !r.alive?.[id])} av={av} nameOf={nameOf} myId={myId} small dead={id => !r.alive?.[id]}
      badge={id => id === cur && !res ? <span className="tag">🎯 ตานี้{r.turnsLeft > 1 ? ` ×${r.turnsLeft}` : ''}</span> : null} note={id => r.alive?.[id] ? `🃏 ${(r.hands?.[id] || []).length} ใบ` : '💥 ตกรอบ'} />
    {isHost && !res && cur && cur !== myId && r.phase === 'play' && !P && <HostBar><button className="secondary" onClick={() => { if (confirm(`บังคับ ${nameOf(cur)} จั่วไพ่ (ใช้เมื่อหลุดหรือค้าง)?`)) tx(c => forceDraw(c, srvNow)); }}>⏭️ บังคับ {nameOf(cur)} จั่ว</button>
      {r.order.filter(id => r.alive?.[id] && !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickOut(c, id))}>🚪 ตัดคนที่หลุดออก</button>)}</HostBar>}
    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...(r.log || [])].reverse().slice(0, 12).map((e, i) => <li key={i} className={e.boom ? 'boom-line' : ''}>{nm(e.text)}</li>)}</ul>

    {boomFx && <div className={'boom-fx' + (boomFx.saved ? ' saved' : '')} onClick={() => { setBoomFx(null); fxOff.current = Date.now(); }}><div className="bfx-box"><CardFace art={boomFx.saved ? 'clip' : 'bomb'} name={boomFx.saved ? 'ที่หนีบจมูก!' : 'ทุเรียนตูม!'} cat={boomFx.saved ? 'save' : 'bomb'} size="lg" /><b>{boomFx.saved ? `${nameOf(boomFx.pid)} หนีบจมูกทัน!` : `ตูม!! ${nameOf(boomFx.pid)} ตกรอบ`}</b><small>แตะเพื่อปิด</small></div></div>}
  </div>;
}

// ---------- ห้องรอ: สำรับสำหรับวงนี้ + ไพ่ทุกแบบ ----------
export function BoomLobby({ n }) {
  const k = Math.max(BOOM_MIN, Math.min(BOOM_MAX, n)); const plan = deckPlan(k); const extra = k <= 4 ? 2 : 1;
  const total = Object.values(plan).reduce((a, b) => a + b, 0) + (k - 1) + k + extra;
  return <>
    <div className="score-rules"><b>🃏 สำรับสำหรับ {k} คน</b><span>💥 ทุเรียนตูม {k - 1} ลูก (น้อยกว่าคนเล่น 1 → สุดท้ายเหลือรอดคนเดียว)</span><span>🧷 ที่หนีบจมูก แจกคนละ 1 + ซ่อนในกองอีก {extra} • ทั้งหมด {total} ใบ • แจกคนละ 5 ใบ</span></div>
    <div className="card-gallery">{Object.entries(BOOM_CARDS).filter(([t]) => !/^f[2-5]$/.test(t)).map(([t, c]) => <div key={t} className="cg-item"><CardFace art={t} name={t === 'f1' ? 'ผลไม้' : c.n} cat={c.cat} size="sm" /><div><b>{t === 'f1' ? 'ผลไม้ 5 ชนิด' : c.n}</b><small>{c.text}</small></div></div>)}</div>
  </>;
}
