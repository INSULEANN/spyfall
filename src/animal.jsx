// เกม สัตว์หน้านิ่ง — เกมส่งไพ่คว่ำแล้วโกหกหน้าตาย (แนวเดียวกับเกมบลัฟส่งไพ่)
//   แจกไพ่สัตว์ 6 ชนิดจนหมดสำรับ • ตาเรา: ส่งไพ่คว่ำ 1 ใบให้เพื่อน แล้วบอกว่า “นี่คือ หมู”
//   คนรับ: ตอบ “จริง / ไม่จริง” → ใครผิดรับไพ่ใบนั้นหงายไว้หน้าตัวเอง
//          หรือ แอบดูแล้วส่งต่อให้คนที่ยังไม่เห็น (บอกใหม่ได้) — คนสุดท้ายต้องตอบ
//   คนที่รับไพ่ไปเป็นคนส่งตาถัดไป • แพ้เมื่อมีสัตว์ชนิดเดียวกันหงายครบ 4 ตัว (หรือ 3 ในโหมดเร็ว) หรือถึงตาส่งแต่ไม่มีไพ่ในมือ
import React, { useEffect, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint } from './rand.js';
import { Avatar, PlayerGrid, Outcome, Leaderboard, HostBar, SecH, TimerRing, ActionSheet } from './ui.jsx';
import './animal.css';

export const ANI_MIN = 3, ANI_MAX = 8;
export const ANI_SCORE = 1;
export const ANIMALS = [
  { n: 'หมู', c: '#f6a5b8' }, { n: 'ไก่', c: '#fff1cf' }, { n: 'ควาย', c: '#b9bdc6' },
  { n: 'ช้าง', c: '#b8cbe0' }, { n: 'แมว', c: '#f7bd72' }, { n: 'กบ', c: '#a8de86' },
];
const K = ANIMALS.length, PER = 9;
export const PASS_MS = 45000, RESP_MS = 40000, LAST_MS = 2500;
const norm = a => Array.from({ length: K }, (_, i) => +(a?.[i]) || 0);
export const total = a => norm(a).reduce((x, y) => x + y, 0);
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
export const fix = r => {
  r.order = r.order || []; r.gone = r.gone || {}; r.log = r.log || [];
  r.hands = r.hands || {}; r.face = r.face || {};
  r.order.forEach(id => { r.hands[id] = norm(r.hands[id]); r.face[id] = norm(r.face[id]); });
  if (r.chain) { r.chain.seen = r.chain.seen || {}; r.chain.path = r.chain.path || []; }
  return r;
};
export const active = r => r.order.filter(id => !r.gone?.[id]);
export const canPassOn = r => r.chain ? active(r).filter(id => id !== r.chain.to && !r.chain.seen[id]) : [];
const nextActive = (r, id) => { const n = r.order.length; const i = r.order.indexOf(id); for (let k = 1; k <= n; k++) { const x = r.order[(i + k) % n]; if (!r.gone[x]) return x; } return null; };

export function makeAniRound(ids, set = {}, number = 1, t0 = Date.now()) {
  const deck = shuffle(Array.from({ length: K * PER }, (_, i) => i % K));
  const per = Math.floor(deck.length / ids.length); const order = shuffle(ids);
  const hands = {}, face = {};
  order.forEach((id, j) => { const h = Array(K).fill(0); deck.slice(j * per, (j + 1) * per).forEach(a => h[a]++); hands[id] = h; face[id] = Array(K).fill(0); });
  return { number, kind: 'ani', order, hands, face, limit: +set.limit === 3 ? 3 : 4, aside: deck.length - per * ids.length,
    phase: 'pass', turn: order[0], at: t0, until: t0 + 3000 + (+set.tmT || PASS_MS), chain: null, last: null, log: [], gone: {}, startedAt: t0 };
}

function end(cur, loser, why, now) {
  const r = cur.round; r.phase = 'done'; r.at = now; r.loser = loser; r.why = why; r.chain = null;
  const pts = {}; const sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { const p = r.hands[id] && !r.gone[id] && id !== loser ? ANI_SCORE : 0; pts[id] = p; sc[id] = (sc[id] || 0) + p; });
  cur.status = 'result'; cur.scores = sc; cur.result = { type: 'ani', loser, why, points: pts };
  return cur;
}
function startTurn(cur, who, now) {
  const r = cur.round; r.turn = who; r.phase = 'pass'; r.at = now; r.until = now + LAST_MS + (r.tmT || PASS_MS); r.chain = null;
  if (!total(r.hands[who])) { say(r, `🫥 {${who}} ไม่มีไพ่เหลือในมือตอนถึงตาส่ง`); return end(cur, who, 'empty', now); }
  return cur;
}
function resolve(cur, truth, now) {
  const r = cur.round; const c = r.chain; const real = c.card === c.claim; const right = truth === real;
  let taker = right ? c.from : c.to;
  r.last = { card: c.card, claim: c.claim, from: c.from, to: c.to, truth, right, taker, at: now };
  say(r, `${truth ? '✅' : '❌'} {${c.to}} ตอบว่า “${truth ? 'จริง' : 'ไม่จริง'}” — ไพ่คือ${ANIMALS[c.card].n} ${right ? 'ทายถูก!' : 'ทายผิด!'} {${taker}} รับไป`);
  if (r.gone[taker]) { r.last.taker = null; return startTurn(cur, r.gone[c.to] ? nextActive(r, c.to) : c.to, now); }
  r.face[taker][c.card]++;
  if (r.face[taker][c.card] >= r.limit) { r.loseAnimal = c.card; return end(cur, taker, 'four', now); }
  return startTurn(cur, taker, now);
}

// ---------- การกระทำ (เรียกใน transaction) ----------
const okClaim = k => Number.isInteger(k) && k >= 0 && k < K;
export function aniPass(cur, me, card, target, claim, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'pass' || r.turn !== me) return;
  if (!okClaim(card) || !okClaim(claim) || !(r.hands[me][card] > 0) || target === me || !active(r).includes(target)) return;
  r.hands[me][card]--;
  r.chain = { card, claim, from: me, to: target, peek: false, seen: { [me]: true }, path: [{ from: me, to: target, claim }] };
  r.phase = 'resp'; r.at = now; r.until = now + (r.tmT || RESP_MS);
  say(r, `🂠 {${me}} ส่งไพ่คว่ำให้ {${target}} “นี่คือ${ANIMALS[claim].n}”`);
  return cur;
}
export function aniPeek(cur, me, now) {
  const r = cur.round; const c = r.chain; if (cur.status !== 'playing' || r.phase !== 'resp' || !c || c.to !== me || c.peek || !canPassOn(r).length) return;
  c.peek = true; c.seen[me] = true; r.at = now; r.until = now + (r.tmT || RESP_MS); return cur;
}
export function aniPassOn(cur, me, target, claim, now) {
  const r = cur.round; const c = r.chain; if (cur.status !== 'playing' || r.phase !== 'resp' || !c || c.to !== me || !c.peek) return;
  if (!okClaim(claim) || !canPassOn(r).includes(target)) return;
  c.from = me; c.to = target; c.claim = claim; c.peek = false; c.path = [...c.path, { from: me, to: target, claim }];
  r.at = now; r.until = now + (r.tmT || RESP_MS);
  say(r, `👀 {${me}} แอบดูแล้วส่งต่อให้ {${target}} “นี่คือ${ANIMALS[claim].n}”`);
  return cur;
}
export function aniCall(cur, me, truth, now) {
  const r = cur.round; const c = r.chain; if (cur.status !== 'playing' || r.phase !== 'resp' || !c || c.to !== me || c.peek) return;
  return resolve(cur, !!truth, now);
}
// หมดเวลา / หัวหน้าห้องกดข้าม: ระบบเล่นแทนแบบสุ่ม
function auto(cur, now) {
  const r = cur.round;
  if (r.phase === 'pass') {
    const me = r.turn; const have = r.hands[me].map((n, i) => n > 0 ? i : -1).filter(i => i >= 0);
    if (!have.length) return startTurn(cur, me, now);
    const card = have[rint(have.length)]; const ts = active(r).filter(id => id !== me);
    return aniPass(cur, me, card, ts[rint(ts.length)], Math.random() < 0.5 ? card : rint(K), now);
  }
  if (r.phase === 'resp' && r.chain) {
    const c = r.chain;
    if (c.peek) { const ts = canPassOn(r); if (ts.length) return aniPassOn(cur, c.to, ts[rint(ts.length)], Math.random() < 0.5 ? c.card : rint(K), now); c.peek = false; }
    return resolve(cur, Math.random() < 0.5, now);
  }
}
export function aniTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'ani' || cur.status !== 'playing') return; fix(r);
  if (now >= r.until) return auto(cur, now);
}
export function aniForce(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'ani') return; fix(r); return auto(cur, now);
}
// คนหลุดออกจากห้อง: ทิ้งไพ่ในมือ ถ้ากำลังถือไพ่อยู่ ไพ่ใบนั้นถูกทิ้ง แล้วคนส่งเริ่มตาใหม่
export function kickAni(cur, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || cur.players?.[id] || !r.order.includes(id) || r.gone[id]) return;
  r.gone = { ...r.gone, [id]: true }; r.hands[id] = Array(K).fill(0); say(r, `🚪 {${id}} ออกจากเกม (ทิ้งไพ่ในมือ)`);
  if (active(r).length < 2) return end(cur, null, 'left', now);
  if (r.phase === 'pass' && r.turn === id) return startTurn(cur, nextActive(r, id), now);
  if (r.phase === 'resp' && r.chain && r.chain.to === id) { const f = r.chain.from; return startTurn(cur, r.gone[f] ? nextActive(r, f) : f, now); }
  return cur;
}

// ---------- ภาพวาด SVG ----------
const O = { stroke: '#2b1d16', strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' };
const Eye = ({ x, y, r = 4 }) => <><circle cx={x} cy={y} r={r} fill="#2b1d16" /><circle cx={x + 1.3} cy={y - 1.3} r={r * 0.35} fill="#fff" /></>;
const ART = [
  // หมู
  <g key="0" {...O}><path d="M24 32 L18 8 L44 22Z" fill="#ee8aa5" /><path d="M76 32 L82 8 L56 22Z" fill="#ee8aa5" /><circle cx="50" cy="56" r="34" fill="#f6a5b8" />
    <circle cx="27" cy="64" r="6" fill="#ff7a9a" stroke="none" opacity=".45" /><circle cx="73" cy="64" r="6" fill="#ff7a9a" stroke="none" opacity=".45" />
    <Eye x={38} y={46} /><Eye x={62} y={46} /><ellipse cx="50" cy="66" rx="15" ry="11" fill="#ee8aa5" /><ellipse cx="45" cy="66" rx="2.6" ry="4" fill="#7a2a3a" stroke="none" /><ellipse cx="55" cy="66" rx="2.6" ry="4" fill="#7a2a3a" stroke="none" /></g>,
  // ไก่
  <g key="1" {...O}><circle cx="39" cy="22" r="8" fill="#e8424a" /><circle cx="50" cy="16" r="9" fill="#e8424a" /><circle cx="61" cy="22" r="8" fill="#e8424a" />
    <ellipse cx="50" cy="56" rx="30" ry="32" fill="#fffaf0" /><ellipse cx="50" cy="76" rx="5" ry="8" fill="#e8424a" />
    <Eye x={40} y={47} /><Eye x={60} y={47} /><path d="M41 58 H59 L50 71Z" fill="#ffb02e" /><path d="M26 70 q-8 4 -4 12 M74 70 q8 4 4 12" fill="none" /></g>,
  // ควาย
  <g key="2" {...O}><path d="M30 36 C8 32 4 14 12 6 C16 20 26 25 38 27Z" fill="#efe4cc" /><path d="M70 36 C92 32 96 14 88 6 C84 20 74 25 62 27Z" fill="#efe4cc" />
    <ellipse cx="20" cy="46" rx="11" ry="6" fill="#5d616c" transform="rotate(-20 20 46)" /><ellipse cx="80" cy="46" rx="11" ry="6" fill="#5d616c" transform="rotate(20 80 46)" />
    <ellipse cx="50" cy="56" rx="27" ry="31" fill="#6b6f7a" /><circle cx="40" cy="47" r="5.5" fill="#fff" /><circle cx="60" cy="47" r="5.5" fill="#fff" /><Eye x={40} y={48} r={3} /><Eye x={60} y={48} r={3} />
    <ellipse cx="50" cy="73" rx="17" ry="12" fill="#a9adb6" /><circle cx="44" cy="73" r="2.6" fill="#2b1d16" stroke="none" /><circle cx="56" cy="73" r="2.6" fill="#2b1d16" stroke="none" /></g>,
  // ช้าง
  <g key="3" {...O}><ellipse cx="20" cy="50" rx="18" ry="25" fill="#8ea6c3" /><ellipse cx="80" cy="50" rx="18" ry="25" fill="#8ea6c3" />
    <circle cx="50" cy="46" r="27" fill="#a6bbd4" /><path d="M42 60 Q38 86 54 92 Q66 95 66 86 Q55 85 57 60Z" fill="#a6bbd4" />
    <path d="M38 64 q-5 8 1 13" fill="#fff" /><path d="M62 64 q5 8 -1 13" fill="#fff" /><Eye x={39} y={42} /><Eye x={61} y={42} /><path d="M48 70 h7 M48 78 h8" fill="none" strokeWidth="2" /></g>,
  // แมว
  <g key="4" {...O}><path d="M20 44 L24 10 L46 30Z" fill="#f4a64a" /><path d="M80 44 L76 10 L54 30Z" fill="#f4a64a" /><path d="M26 34 L27 19 L37 28Z" fill="#ffb3b3" stroke="none" /><path d="M74 34 L73 19 L63 28Z" fill="#ffb3b3" stroke="none" />
    <ellipse cx="50" cy="58" rx="33" ry="28" fill="#f4a64a" /><path d="M50 32 v10 M42 33 v7 M58 33 v7" stroke="#b8651a" fill="none" />
    <ellipse cx="38" cy="54" rx="4.5" ry="6.5" fill="#2b1d16" stroke="none" /><ellipse cx="62" cy="54" rx="4.5" ry="6.5" fill="#2b1d16" stroke="none" />
    <path d="M45 63 h10 l-5 5Z" fill="#ff8aa0" strokeWidth="2" /><path d="M50 68 q-5 6 -10 2 M50 68 q5 6 10 2" fill="none" strokeWidth="2.4" />
    <path d="M14 60 l18 2 M14 70 l18 -3 M86 60 l-18 2 M86 70 l-18 -3" fill="none" strokeWidth="1.8" /></g>,
  // กบ
  <g key="5" {...O}><ellipse cx="50" cy="62" rx="39" ry="27" fill="#8fd16a" /><circle cx="31" cy="34" r="13" fill="#8fd16a" /><circle cx="69" cy="34" r="13" fill="#8fd16a" />
    <circle cx="31" cy="34" r="7.5" fill="#fff" strokeWidth="2" /><circle cx="69" cy="34" r="7.5" fill="#fff" strokeWidth="2" /><Eye x={31} y={35} r={3.6} /><Eye x={69} y={35} r={3.6} />
    <path d="M24 64 Q50 84 76 64" fill="none" /><circle cx="22" cy="72" r="5" fill="#ff8a8a" stroke="none" opacity=".5" /><circle cx="78" cy="72" r="5" fill="#ff8a8a" stroke="none" opacity=".5" />
    <circle cx="46" cy="55" r="1.8" fill="#2b1d16" stroke="none" /><circle cx="54" cy="55" r="1.8" fill="#2b1d16" stroke="none" /></g>,
];
export const AniArt = ({ k, size = 64, x, y }) => <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-label={ANIMALS[k]?.n}>{ART[k]}</svg>;
const Back = () => <svg viewBox="0 0 100 140" width="100%" height="100%" aria-hidden="true"><rect x="4" y="4" width="92" height="132" rx="10" fill="#2f5a3a" stroke="#f3d27a" strokeWidth="3" />
  <g fill="#f3d27a" opacity=".22">{[[24, 26], [74, 26], [24, 114], [74, 114]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" />)}</g>
  <g fill="#f3d27a"><ellipse cx="50" cy="78" rx="15" ry="13" /><circle cx="33" cy="58" r="6" /><circle cx="44" cy="51" r="6" /><circle cx="56" cy="51" r="6" /><circle cx="67" cy="58" r="6" /></g></svg>;
export const AniCard = ({ k, back, n, small, sel, onClick, dim }) => {
  const Tag = onClick ? 'button' : 'div';
  return <Tag type={onClick ? 'button' : undefined} className={'ani-card' + (back ? ' back' : '') + (small ? ' sm' : '') + (sel ? ' sel' : '') + (dim ? ' dim' : '')} style={back ? undefined : { '--c': ANIMALS[k].c }} onClick={onClick}>
    {back ? <Back /> : <><AniArt k={k} size={small ? 30 : 58} />{!small && <b>{ANIMALS[k].n}</b>}</>}{n > 0 && <em>×{n}</em>}
  </Tag>;
};
const Claim = ({ k }) => <span className="ani-claim"><AniArt k={k} size={22} /> {ANIMALS[k].n}</span>;

// ---------- หน้าจอ ----------
export function AniGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, onBack, srvNow }) {
  const r = fix(JSON.parse(JSON.stringify(room.round))); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'ani') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const [pick, setPick] = useState({}); const c = r.chain; const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const inGame = r.order.includes(myId) && !r.gone[myId];
  const myPass = !res && r.phase === 'pass' && r.turn === myId; const myResp = !res && r.phase === 'resp' && c?.to === myId;
  const stepKey = r.phase + (r.turn || '') + (c ? c.to + c.path.length + (c.peek ? 'p' : '') : '');
  useEffect(() => { setPick({}); }, [stepKey]);
  useEffect(() => { if (myPass || myResp) sfx(sound, 'yourTurn'); }, [myPass, myResp, stepKey]);
  useEffect(() => { if (r.last) sfx(sound, r.last.right ? 'reveal' : 'nope'); }, [r.last?.at]);
  const due = !res && r.until && srvNow >= r.until;
  useEffect(() => { if (due) tx(cc => aniTick(cc, srvNow)); }, [due, r.at, r.phase]);
  const left = secs(r.until - srvNow); const tot = (r.tmT || (r.phase === 'pass' ? PASS_MS : RESP_MS)) / 1000;
  const others = active(r).filter(id => id !== myId);
  const recent = r.last && srvNow - r.last.at < 7000;
  const name = id => id === myId ? 'คุณ' : nameOf(id);

  const Seat = ({ id }) => {
    const f = r.face[id]; const danger = f.some(n => n >= r.limit - 1);
    return <div className={'ani-seat' + (id === myId ? ' me' : '') + ((r.phase === 'pass' && r.turn === id) || c?.to === id ? ' now' : '') + (r.gone[id] ? ' gone' : '') + (res && r.loser === id ? ' ani-lost' : '') + (danger ? ' ani-warn' : '')}>
      <div className="ani-seat-hd"><Avatar id={id} av={av} size={38} /><div className="ani-seat-tt"><b>{name(id)}</b><small>{r.gone[id] ? 'ออกแล้ว' : `ไพ่หงาย ${total(f)} ใบ`}</small></div><span className="ani-inhand" title="ไพ่ในมือ">🂠 {total(r.hands[id])}</span></div>
      <div className="ani-face">{f.map((n, k) => [n, k]).filter(([n]) => n > 0).sort((a, b) => b[0] - a[0]).map(([n, k]) =>
        <div key={k} className={'ani-fc' + (n >= r.limit - 1 ? ' hot' : '') + (n >= r.limit ? ' dead' : '')} style={{ '--c': ANIMALS[k].c }} title={`${ANIMALS[k].n} ${n}/${r.limit}`}>
          <AniArt k={k} size={40} /><b>{n}</b><span className="ani-pips">{Array.from({ length: r.limit }, (_, i) => <i key={i} className={i < n ? 'on' : ''} />)}</span>
        </div>)}{!total(f) && <i className="ani-none">ยังไม่มีไพ่หงาย 😇</i>}</div>
    </div>;
  };

  if (res) {
    const L = r.loser; const meLost = L === myId;
    return <div className="ani-game">
      <Outcome art={!L ? 'cross' : meLost ? 'lose' : 'win'} tone={meLost ? '' : 'good'} title={!L ? '🚪 ผู้เล่นเหลือไม่พอ จบเกม' : meLost ? '🙈 คุณหน้าแตก!' : `🙈 ${nameOf(L)} หน้าแตก!`}>
        {r.why === 'four' ? <>{name(L)} เก็บ<Claim k={r.loseAnimal} /> หงายครบ {r.limit} ตัว</> : r.why === 'empty' ? `${name(L)} หมดไพ่ในมือตอนถึงตาส่ง` : 'คนอื่นออกจากห้องไปหมด'}
      </Outcome>
      <SecH icon="🐾">ไพ่หงายของทุกคน</SecH>
      <div className="ani-table">{r.order.map(id => <Seat key={id} id={id} />)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </div>;
  }

  const myHand = r.hands[myId] || norm();
  const ClaimPick = ({ val, set }) => <div className="ani-claims">{ANIMALS.map((a, k) => <button key={k} type="button" className={'ani-cbtn' + (val === k ? ' sel' : '')} onClick={() => { sfx(sound, 'select'); set(k); }}><AniArt k={k} size={34} /><span>{a.n}</span></button>)}</div>;

  return <div className="ani-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">แพ้เมื่อสัตว์ชนิดเดียวกันหงายครบ {r.limit} ตัว</span></div>

    {recent && <div className={'ani-last ' + (r.last.right ? 'ok' : 'no')} key={r.last.at}>
      <AniCard k={r.last.card} />
      <div><small>{name(r.last.from)} บอกว่า <Claim k={r.last.claim} /> • {name(r.last.to)} ตอบ “{r.last.truth ? 'จริง' : 'ไม่จริง'}”</small>
        <b>{r.last.right ? '🎯 ทายถูก!' : '😵 ทายผิด!'} {r.last.taker ? `${name(r.last.taker)} รับไพ่ไปหงาย` : 'ไพ่ถูกทิ้ง'}</b></div>
    </div>}

    <section className={'ani-stage' + (myPass || myResp ? ' me' : '')}>
      {r.phase === 'pass' && <div className="ani-flight"><Avatar id={r.turn} av={av} size={64} /><div className="ani-ft"><span className="ct-kicker">🂠 ตาส่งไพ่</span><h2>{r.turn === myId ? 'ตาคุณ! ส่งไพ่คว่ำ 1 ใบ' : `${nameOf(r.turn)} กำลังเลือกไพ่…`}</h2><small>เลือกไพ่ เลือกเหยื่อ แล้วบอกว่าเป็นตัวอะไร (โกหกได้)</small></div><TimerRing secs={left} total={tot} size={58} label="วิ" /></div>}
      {r.phase === 'resp' && c && <>
        <div className="ani-flight"><Avatar id={c.from} av={av} size={52} /><div className="ani-fly"><AniCard back small /><span className="ani-bubble">“นี่คือ <Claim k={c.claim} />”</span></div><Avatar id={c.to} av={av} size={52} /><TimerRing secs={left} total={tot} size={58} label="วิ" /></div>
        <p className="hint">{name(c.from)} → {name(c.to)} • {c.peek ? `${name(c.to)} แอบดูแล้ว กำลังเลือกส่งต่อ…` : `${name(c.to)} กำลังคิดว่าจริงหรือไม่จริง…`}</p>
        {c.path.length > 1 && <div className="ani-path">👀 เห็นไพ่ใบนี้แล้ว: {Object.keys(c.seen).map(id => <Avatar key={id} id={id} av={av} size={22} />)}</div>}
      </>}
    </section>

    <SecH icon="🐾">โต๊ะ</SecH>
    <div className="ani-table">{r.order.map(id => <Seat key={id} id={id} />)}</div>

    {inGame && <><SecH icon="🃏">ไพ่ในมือคุณ ({total(myHand)} ใบ)</SecH>
      <div className="ani-hand">{myHand.map((n, k) => n > 0 && <AniCard key={k} k={k} n={n} />)}{!total(myHand) && <i className="hint">ไม่มีไพ่เหลือ ถ้าถึงตาส่งจะแพ้ทันที!</i>}</div></>}

    {/* ส่งไพ่ */}
    <ActionSheet open={myPass} k={'p' + stepKey} icon="🂠" title="ส่งไพ่คว่ำ" sub="เลือกไพ่ → เลือกคนรับ → บอกว่าเป็นตัวอะไร" secs={left} total={(r.tmT || PASS_MS) / 1000}>
      <small className="ani-step">1. ไพ่ใบไหน (เห็นคนเดียว)</small>
      <div className="ani-hand">{myHand.map((n, k) => n > 0 && <AniCard key={k} k={k} n={n} sel={pick.card === k} onClick={() => { sfx(sound, 'card'); setPick(p => ({ ...p, card: k })); }} />)}</div>
      <small className="ani-step">2. ส่งให้ใคร</small>
      <PlayerGrid ids={others} av={av} nameOf={nameOf} selected={pick.to} small onPick={t => { sfx(sound, 'select'); setPick(p => ({ ...p, to: t })); }} />
      <small className="ani-step">3. บอกว่า “นี่คือ…”</small>
      <ClaimPick val={pick.claim} set={k => setPick(p => ({ ...p, claim: k }))} />
      <button className="primary wide" disabled={pick.card == null || !pick.to || pick.claim == null} onClick={() => { sfx(sound, 'confirm'); tx(cc => aniPass(cc, myId, pick.card, pick.to, pick.claim, srvNow)); }}>🤫 ส่งไพ่ {pick.claim != null ? `“นี่คือ${ANIMALS[pick.claim].n}”` : ''}</button>
    </ActionSheet>

    {/* รับไพ่: ตอบ หรือ แอบดู */}
    <ActionSheet open={myResp && !c.peek} k={'r' + stepKey} icon="🤔" title={c ? `${nameOf(c.from)} บอกว่า “นี่คือ${ANIMALS[c.claim].n}”` : ''} sub="เชื่อไหม? ใครผิดต้องรับไพ่ใบนี้ไปหงาย" secs={left} total={(r.tmT || RESP_MS) / 1000}>
      {c && <div className="ani-recv"><AniCard back /><span className="ani-bubble big">“นี่คือ <Claim k={c.claim} />”</span></div>}
      <div className="ani-calls">
        <button className="primary" onClick={() => { sfx(sound, 'confirm'); tx(cc => aniCall(cc, myId, true, srvNow)); }}>✅ จริง</button>
        <button className="primary ani-lie" onClick={() => { sfx(sound, 'confirm'); tx(cc => aniCall(cc, myId, false, srvNow)); }}>❌ ไม่จริง</button>
      </div>
      {c && canPassOn(r).length > 0 ? <button className="secondary wide" onClick={() => { sfx(sound, 'card'); tx(cc => aniPeek(cc, myId, srvNow)); }}>👀 แอบดู แล้วส่งต่อให้คนอื่น</button> : <p className="hint">ทุกคนเห็นไพ่ใบนี้แล้ว — คุณต้องตอบ</p>}
    </ActionSheet>

    {/* แอบดูแล้วส่งต่อ */}
    <ActionSheet open={myResp && !!c?.peek} k={'o' + stepKey} icon="👀" title="แอบดูแล้ว — ส่งต่อ" sub="ส่งให้คนที่ยังไม่เห็นไพ่ บอกเหมือนเดิมหรือเปลี่ยนก็ได้" secs={left} total={(r.tmT || RESP_MS) / 1000}>
      {c && <div className="ani-recv"><AniCard k={c.card} /><small>ไพ่จริงคือ <b>{ANIMALS[c.card].n}</b> • {nameOf(c.from)} บอกว่า{ANIMALS[c.claim].n}</small></div>}
      <small className="ani-step">ส่งให้ใคร</small>
      <PlayerGrid ids={canPassOn(r)} av={av} nameOf={nameOf} selected={pick.to} small onPick={t => { sfx(sound, 'select'); setPick(p => ({ ...p, to: t })); }} />
      <small className="ani-step">บอกว่า “นี่คือ…”</small>
      <ClaimPick val={pick.claim} set={k => setPick(p => ({ ...p, claim: k }))} />
      <button className="primary wide" disabled={!pick.to || pick.claim == null} onClick={() => { sfx(sound, 'confirm'); tx(cc => aniPassOn(cc, myId, pick.to, pick.claim, srvNow)); }}>🤫 ส่งต่อ</button>
    </ActionSheet>

    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 6).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    {isHost && <HostBar>
      <button className="secondary" onClick={() => { if (confirm('ให้ระบบเล่นแทนคนที่กำลังคิดอยู่ (สุ่ม)?')) tx(cc => aniForce(cc, srvNow)); }}>⏩ ข้าม (ระบบเลือกแทน)</button>
      {active(r).filter(id => !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(cc => kickAni(cc, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
    </HostBar>}
  </div>;
}

// ---------- ห้องรอ: โหมดเกม ----------
export function AniLobby({ db, roomCode, room, isHost, sound }) {
  const set = room.settings?.ani || {};
  const save = patch => runTransaction(ref(db, `rooms/${roomCode}/settings/ani`), c => ({ ...(c || {}), ...patch })).catch(() => {});
  return <div className="uc-lobby">
    <label>🐾 แพ้เมื่อสัตว์ชนิดเดียวกันหงายครบ {isHost ? '' : '(หัวหน้าห้องตั้ง)'}</label>
    <select value={+set.limit === 3 ? 3 : 4} disabled={!isHost} onChange={e => { sfx(sound, 'select'); save({ limit: +e.target.value }); }}><option value={4}>4 ตัว (ปกติ)</option><option value={3}>3 ตัว (เกมเร็ว)</option></select>
    <div className="ani-hand lobby">{ANIMALS.map((_, k) => <AniCard key={k} k={k} n={PER} />)}</div>
  </div>;
}
