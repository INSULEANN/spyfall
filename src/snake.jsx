// เกม "อีนังงูพิษ" — คฤหาสน์ละครหลังข่าว: กลางคืนนักลอบฆ่าเลือกเหยื่อ ผู้ตายทิ้ง "ภาพสุดท้าย" 1 ใบ นักลอบฆ่าใส่ภาพปลอมปน 2 ใบ
// กลางวันทุกคนตีความภาพ แล้วโหวตไล่ (ต้องได้เสียงเกินครึ่ง) • ระบบเป็นผู้ดำเนินเกม ทุกขั้นมีเวลา หมดเวลาสุ่มให้ เกมไม่ค้าง
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { Art } from './play-art.jsx';
import { Phase, Steps, PlayerGrid, WhoDone, RoleCard, useRoleCard, Outcome, RevealGrid, Leaderboard, HostBar, SecH, Avatar, Voters, ActionSheet, TimerRing } from './ui.jsx';
import { play as sfx } from './sfx.js';
import { shuffle, pickBad } from './rand.js';
import { EV_IDS, EV, EvArt } from './snakeart.jsx';
import './snake.css';

export const SN_MIN = 5, SN_MAX = 12;
export const SN_SCORE = { good: 1, evil: 2 };
export const POOL = 9, FAKES = 2;
const NIGHT_MS = 45000, CLUE_MS = 60000, FAKE_MS = 45000;
export const snKillers = n => (n <= 6 ? 1 : n <= 9 ? 2 : 3);
// บทบาทพิเศษ (หัวหน้าห้องเลือกเปิด/ปิด) ใช้ที่นั่งของคนในบ้านธรรมดา • ฝ่ายร้ายเสริมต้องไม่ทำให้ฝ่ายดีน้อยเกินไป
export function snPlan(n, o = {}) {
  const k = snKillers(n); let left = n - k;
  const det = o.det !== false && left > k + 1; if (det) left--;
  const guard = o.guard !== false && left > k + 1; if (guard) left--;
  const master = o.master !== false && n >= 6 && left > k + 1; if (master) left--;
  const minion = !!o.minion && n >= 8 && left > k + 2; if (minion) left--;
  return { k, det, guard, master, minion, folk: Math.max(0, left) };
}
export const S_ROLES = {
  killer: { icon: '🗡️', name: 'นักลอบฆ่า', side: 'evil', art: 'dagger', desc: 'กลางคืนตกลงกับเพื่อนนักลอบฆ่าเลือกเหยื่อ 1 คน แล้วเลือก "ภาพปลอม" 2 ใบปนกับภาพจริงของผู้ตาย กลางวันทำตัวเนียน' },
  master: { icon: '🐍', name: 'ผู้บงการ', side: 'evil', art: 'snake', desc: 'อยู่ฝ่ายนักลอบฆ่า (รู้จักกัน) แต่ไม่ได้ลงมือเอง และไม่นับเป็นนักลอบฆ่า • เห็นว่าภาพไหนคือภาพจริง เอาไปปั่นให้ทุกคนเชื่อภาพปลอม' },
  minion: { icon: '🦎', name: 'ลูกสมุน', side: 'evil', art: 'thief', desc: 'รู้ว่าใครคือนักลอบฆ่า (แต่เขาไม่รู้ว่าคุณเป็นพวก) ไม่นับเป็นนักลอบฆ่า • ช่วยปกป้องเจ้านายด้วยปากล้วน ๆ' },
  det: { icon: '🔎', name: 'นักสืบ', side: 'good', art: 'magnifier', desc: 'ทุกคืนที่มีคนตาย คุณเห็นว่าภาพไหนคือภาพจริงที่ผู้ตายทิ้งไว้ • บอกตรง ๆ ระวังโดนลอบฆ่าคืนต่อไป!' },
  guard: { icon: '🛡️', name: 'บอดี้การ์ด', side: 'good', art: 'shield', desc: 'กลางคืนเลือกคุ้มกัน 1 คน (ห้ามตัวเอง ห้ามคนเดิม 2 คืนติด) ถ้านักลอบฆ่าเลือกคนนั้น เขารอด' },
  folk: { icon: '🏠', name: 'คนในบ้าน', side: 'good', art: 'villager', desc: 'ไม่มีพลังพิเศษ อ่านภาพสุดท้ายให้ออก แล้วโหวตไล่นักลอบฆ่าออกจากคฤหาสน์' },
};
export const sSide = r => S_ROLES[r]?.side || 'good';

export function makeSnakeRound(ids, opts = {}, number = 1, now = Date.now(), hist) {
  const P = snPlan(ids.length, opts); const killers = pickBad(ids, P.k, hist); const roles = {};
  const rest = shuffle(ids.filter(id => !killers.includes(id))); let i = 0;
  killers.forEach(id => roles[id] = 'killer');
  ['det', 'guard', 'master', 'minion'].forEach(k => { if (P[k]) roles[rest[i++]] = k; });
  rest.slice(i).forEach(id => roles[id] = 'folk');
  const alive = {}; ids.forEach(id => alive[id] = true);
  const deck = shuffle([...EV_IDS]);
  const r = { number, kind: 'snake', roles, alive, order: shuffle(ids), day: 1, reveal: !!opts.reveal, dayMs: (opts.day || 180) * 1000, deck, msgs: [], log: [], startedAt: now };
  startNight(r, now + 4000); return r;
}

// ---------- ตรรกะ (ทำงานบนข้อมูลห้องทั้งก้อนภายใน transaction) ----------
const here = (cur, id) => !!cur.players?.[id];
const living = cur => (cur.round.order || []).filter(id => cur.round.alive?.[id] && here(cur, id));
const isAlive = (cur, id) => !!cur.round.alive?.[id] && here(cur, id);
const ofRole = (cur, k) => living(cur).filter(id => cur.round.roles[id] === k);
const pick = a => a[Math.floor(Math.random() * a.length)];
function log(r, e) { r.log = [...(r.log || []), e]; }
function winner(cur) {
  const al = living(cur); const a = al.filter(id => cur.round.roles[id] === 'killer').length; const g = al.filter(id => sSide(cur.round.roles[id]) === 'good').length;
  if (!a) return 'good'; if (a >= g) return 'evil'; return null;
}
function endGame(cur, win) {
  const r = cur.round; const points = {}, sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { points[id] = r.roles?.[id] && sSide(r.roles[id]) === win ? SN_SCORE[win] : 0; sc[id] = (sc[id] || 0) + points[id]; });
  cur.status = 'result'; r.phase = 'done'; r.until = null; cur.scores = sc; cur.result = { type: 'snake', winner: win, points };
  return cur;
}
function drawPool(r) {
  const used = new Set((r.msgs || []).flatMap(m => m.cards || []));
  let deck = (r.deck || []).filter(c => EV[c]);
  if (deck.length < POOL) deck = shuffle(EV_IDS.filter(c => !used.has(c) && !(r.pool || []).includes(c)));
  if (deck.length < POOL) deck = shuffle([...EV_IDS]);
  r.pool = deck.slice(0, POOL); r.deck = deck.slice(POOL);
}
function startNight(r, now) {
  r.phase = 'night'; r.night = null; r.victim = null; r.real = null; r.fakes = null; r.votes = null;
  drawPool(r); r.until = now + NIGHT_MS; r.at = now;
}
function startDay(cur, now) {
  const r = cur.round; r.phase = 'day'; r.votes = null; r.until = now + (r.dayMs || 180000); r.at = now; return cur;
}

export function snKill(cur, me, t, now) {
  const r = cur.round; if (r.phase !== 'night' || r.roles[me] !== 'killer' || !isAlive(cur, me) || !isAlive(cur, t) || r.roles[t] === 'killer') return;
  r.night = { ...(r.night || {}), kill: { ...(r.night?.kill || {}), [me]: t } }; return resolveNight(cur, now, false);
}
export function snGuard(cur, me, t, now) {
  const r = cur.round; if (r.phase !== 'night' || r.roles[me] !== 'guard' || !isAlive(cur, me) || !isAlive(cur, t) || t === me || t === r.lastGuard || r.night?.guard) return;
  r.night = { ...(r.night || {}), guard: t }; return resolveNight(cur, now, false);
}
// force = หมดเวลา/หัวหน้าห้องข้าม → เสียงนักลอบฆ่าไม่ตรงกันเอาเป้าที่ได้มากสุด (เสมอ/ไม่มีใครเลือก = สุ่มจากที่เล็งไว้หรือคนที่ยังอยู่)
export function resolveNight(cur, now, force) {
  const r = cur.round; if (r.phase !== 'night') return; const n = r.night || {}; const ks = ofRole(cur, 'killer'); const kv = n.kill || {};
  const tg = ks.map(id => kv[id]).filter(t => t && isAlive(cur, t));
  const agreed = ks.length > 0 && tg.length === ks.length && tg.every(t => t === tg[0]) ? tg[0] : null;
  const guardDone = !ofRole(cur, 'guard').length || !!n.guard;
  if (!force && !(agreed && guardDone)) return cur;
  let v = agreed;
  if (!v) { const c = {}; tg.forEach(t => c[t] = (c[t] || 0) + 1); const max = Math.max(0, ...Object.values(c)); const top = Object.keys(c).filter(t => c[t] === max);
    v = top.length ? pick(top) : pick(living(cur).filter(id => r.roles[id] !== 'killer')) || null; }
  r.lastGuard = n.guard || null;
  const saved = !!v && n.guard === v;
  log(r, { t: 'night', day: r.day, aim: v || null, guard: n.guard || null, saved, dead: v && !saved ? [v] : [] });
  if (!v || saved) { r.dawn = { day: r.day, dead: [], saved }; return startDay(cur, now); }
  r.alive = { ...r.alive, [v]: false }; r.victim = v; r.dawn = { day: r.day, dead: [v], saved: false };
  const w = winner(cur); if (w) return endGame(cur, w);
  r.phase = 'clue'; r.until = now + (r.tmT || CLUE_MS); r.at = now;
  if (!here(cur, v)) return snClue(cur, v, pick(r.pool), now, true);
  return cur;
}
// ผู้ตายเลือกภาพจริง 1 ใบจากกองกลาง
export function snClue(cur, me, card, now, auto) {
  const r = cur.round; if (r.phase !== 'clue' || me !== r.victim || !(r.pool || []).includes(card)) return;
  r.real = card; r.autoReal = !!auto; r.phase = 'fake'; r.fakes = null; r.until = now + (r.tmT || FAKE_MS); r.at = now;
  if (!ofRole(cur, 'killer').length) return finishFake(cur, now);
  return cur;
}
// นักลอบฆ่าเลือกภาพปลอม (แชร์กัน เลือกได้สูงสุด 2 ใบ เลือกใบที่ 3 = แทนใบเก่าสุด)
export function snFake(cur, me, card) {
  const r = cur.round; if (r.phase !== 'fake' || r.roles[me] !== 'killer' || !isAlive(cur, me) || !(r.pool || []).includes(card) || card === r.real) return;
  let f = [...(r.fakes || [])]; f = f.includes(card) ? f.filter(c => c !== card) : [...f, card].slice(-FAKES); r.fakes = f.length ? f : null; return cur;
}
export function snFakeOk(cur, me, now) {
  const r = cur.round; if (r.phase !== 'fake' || r.roles[me] !== 'killer' || !isAlive(cur, me) || (r.fakes || []).length !== FAKES) return; return finishFake(cur, now);
}
function finishFake(cur, now) {
  const r = cur.round; const f = [...(r.fakes || [])].filter(c => c !== r.real && (r.pool || []).includes(c));
  const left = shuffle((r.pool || []).filter(c => c !== r.real && !f.includes(c))); while (f.length < FAKES && left.length) f.push(left.pop());
  r.msgs = [...(r.msgs || []), { day: r.day, dead: r.victim, real: r.real, cards: shuffle([r.real, ...f]), auto: !!r.autoReal }];
  r.fakes = f; r.autoReal = null;
  return startDay(cur, now);
}
export function snVote(cur, me, t, now) {
  const r = cur.round; if (r.phase !== 'day' || !isAlive(cur, me)) return;
  if (t !== 'skip' && (!isAlive(cur, t) || t === me)) return;
  r.votes = { ...(r.votes || {}), [me]: t };
  return living(cur).every(id => id in r.votes) ? resolveDay(cur, now) : cur;
}
// ต้องได้เสียงเกินครึ่งของคนที่ยังอยู่ ถึงจะถูกไล่ออก
export function resolveDay(cur, now) {
  const r = cur.round; if (r.phase !== 'day') return; const al = living(cur); const v = r.votes || {};
  const c = {}; al.forEach(id => { if (v[id]) c[v[id]] = (c[v[id]] || 0) + 1; });
  const need = Math.floor(al.length / 2) + 1;
  const top = Object.keys(c).filter(t => t !== 'skip').sort((a, b) => c[b] - c[a])[0];
  const out = top && c[top] >= need && isAlive(cur, top) ? top : null;
  r.lastVote = { day: r.day, votes: v, out, need };
  log(r, { t: 'day', day: r.day, votes: v, out, need });
  if (out) r.alive = { ...r.alive, [out]: false };
  const w = winner(cur); if (w) return endGame(cur, w);
  r.day = (r.day || 1) + 1; startNight(r, now); r.dawn = null; return cur;
}
// หมดเวลาของขั้นปัจจุบัน → ทำแทนให้อัตโนมัติ (ทุกเครื่องเรียกได้ ทำงานครั้งเดียวเพราะเช็กเวลา/phase ใน transaction)
export function snTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'snake' || cur.status !== 'playing' || !r.until || now < r.until) return;
  if (r.phase === 'night') return resolveNight(cur, now, true);
  if (r.phase === 'clue') return snClue(cur, r.victim, pick(r.pool || []), now, true);
  if (r.phase === 'fake') return finishFake(cur, now);
  if (r.phase === 'day') return resolveDay(cur, now);
}
export function snSkip(cur, now) { const r = cur.round; if (!r || cur.status !== 'playing' || r.kind !== 'snake') return; r.until = now; return snTick(cur, now); }

// ---------- หน้าจอ ----------
const SIDE_LABEL = { evil: '🐍 ฝ่ายงูพิษ', good: '🏠 ฝ่ายคนในบ้าน' };
const WIN_TXT = { good: 'คนในบ้านชนะ! ไล่นักลอบฆ่าออกไปหมดแล้ว 🏠', evil: 'งูพิษชนะ! คฤหาสน์นี้ตกเป็นของนักลอบฆ่า 🐍' };
export const EvCard = ({ id, size = 'm', sel, real, fake, dim, onClick, tag, flip, delay }) => {
  const e = EV[id]; if (!e) return null;
  const C = onClick ? 'button' : 'div';
  return <C type={onClick ? 'button' : undefined} className={`ev ev-${size}` + (sel ? ' sel' : '') + (real ? ' real' : '') + (fake ? ' fake' : '') + (dim ? ' dim' : '') + (flip ? ' flip' : '')} onClick={onClick} style={delay != null ? { animationDelay: delay + 'ms' } : undefined}>
    <span className="ev-pic"><EvArt id={id} /></span><b className="ev-name">{e.n}</b>{tag && <span className="ev-tag">{tag}</span>}
  </C>;
};
export function SnakeFx({ ev }) {   // อนิเมชันสั้น ๆ ตอนเปลี่ยนช่วง (ทุกเครื่องเห็นพร้อมกัน)
  const [show, setShow] = useState(null); const last = useRef(ev?.key);
  useEffect(() => { if (!ev || ev.key === last.current) return; last.current = ev.key; setShow(ev); const t = setTimeout(() => setShow(null), 2600); return () => clearTimeout(t); }, [ev?.key]);
  if (!show) return null;
  return <div className={'snfx ' + show.kind} onClick={() => setShow(null)}><div className="snfx-in">{show.ico && <span className="snfx-ico">{show.ico}</span>}<b>{show.text}</b>{show.sub && <small>{show.sub}</small>}</div></div>;
}
export function SnakeGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, onBack, srvNow }) {
  const r = room.round; const res = room.status === 'result' && room.result;
  const card = useRoleCard(r.number);
  const myRole = r.roles?.[myId]; const info = S_ROLES[myRole] || S_ROLES.folk;
  const alive = r.alive || {}; const meAlive = !!alive[myId];
  const order = (r.order || []).filter(id => room.players?.[id] || r.roles?.[id]);
  const liveIds = order.filter(id => alive[id] && room.players?.[id]);
  const killers = Object.keys(r.roles || {}).filter(id => r.roles[id] === 'killer');
  const evilFriends = Object.keys(r.roles || {}).filter(id => r.roles[id] === 'killer' || r.roles[id] === 'master');
  const seeAll = !meAlive || !!res;
  const vRole = card.disguise ? 'folk' : myRole;
  const knowsReal = seeAll || ['killer', 'master', 'det'].includes(vRole);
  const knowsTeam = id => (myRole === 'killer' && (r.roles[id] === 'killer' || r.roles[id] === 'master')) || (myRole === 'master' && r.roles[id] === 'killer') || (myRole === 'minion' && r.roles[id] === 'killer');
  const showRoleOf = id => seeAll || (r.reveal && !alive[id]) || (!card.disguise && (id === myId || knowsTeam(id)));
  const roleTxt = id => `${S_ROLES[r.roles[id]]?.icon} ${S_ROLES[r.roles[id]]?.name}`;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), cur => { if (!cur || cur.status !== 'playing' || cur.round?.kind !== 'snake') return; return f(cur); });
  const n = r.night || {}; const votes = r.votes || {}; const pool = r.pool || []; const msgs = r.msgs || [];
  const secs = r.until ? Math.max(0, Math.ceil((r.until - srvNow) / 1000)) : 0;
  const total = r.phase === 'night' ? NIGHT_MS / 1000 : r.phase === 'clue' ? (r.tmT || CLUE_MS) / 1000 : r.phase === 'fake' ? (r.tmT || FAKE_MS) / 1000 : (r.dayMs || 180000) / 1000;
  const due = !res && r.until && srvNow >= r.until + 800;
  useEffect(() => { if (due) tx(c => snTick(c, srvNow)); }, [due, r.phase, r.day]);
  const lastMsg = msgs[msgs.length - 1]; const todayMsg = lastMsg && lastMsg.day === r.day ? lastMsg : null;
  const stack = list => list.length ? <Voters ids={list} av={av} size={20} /> : null;
  const deadName = id => `${nameOf(id)}${r.reveal ? ` (${roleTxt(id)})` : ''}`;

  // เสียงตามช่วงของเกม
  const prev = useRef(null);
  useEffect(() => {
    const k = `${r.day}-${r.phase}`; const p = prev.current; prev.current = k; if (!p || p === k) return;
    if (r.phase === 'night') { sfx(sound, r.lastVote?.out ? 'execute' : 'safe'); setTimeout(() => sfx(sound, 'night'), 1300); }
    else if (r.phase === 'clue') sfx(sound, 'death');
    else if (r.phase === 'fake') sfx(sound, 'reveal');
    else if (r.phase === 'day') sfx(sound, r.dawn?.dead?.length ? 'morning' : 'safe');
    else if (r.phase === 'done') sfx(sound, room.result?.winner === info.side ? 'win' : 'lose');
  }, [r.day, r.phase]);
  // อนิเมชันเหตุการณ์
  const fx = r.phase === 'clue' && r.victim ? { key: 'k' + r.day, kind: 'kill', ico: '🗡️', text: `${nameOf(r.victim)} ถูกลอบฆ่า!`, sub: 'วิญญาณกำลังทิ้งภาพสุดท้าย…' }
    : r.phase === 'day' && r.dawn && !r.dawn.dead?.length ? { key: 'd' + r.day, kind: 'calm', ico: '🛡️', text: 'เมื่อคืนไม่มีใครตาย', sub: r.dawn.saved ? 'บอดี้การ์ดคุ้มกันไว้ทัน!' : '' }
    : r.phase === 'day' && todayMsg ? { key: 'm' + r.day, kind: 'msg', ico: '🩸', text: 'ภาพสุดท้ายปรากฏ 3 ใบ', sub: 'มีจริง 1 ใบ อีก 2 ใบนักลอบฆ่าใส่ร้าย' }
    : r.phase === 'night' && r.lastVote?.day === r.day - 1 ? { key: 'v' + r.day, kind: r.lastVote.out ? 'out' : 'calm', ico: r.lastVote.out ? '🚪' : '🕊️', text: r.lastVote.out ? `${nameOf(r.lastVote.out)} ถูกไล่ออก` : 'เสียงไม่ถึงครึ่ง ไม่มีใครถูกไล่', sub: r.lastVote.out && r.reveal ? roleTxt(r.lastVote.out) : '' }
    : res ? { key: 'end', kind: res.winner === 'good' ? 'calm' : 'kill', ico: res.winner === 'good' ? '🏠' : '🐍', text: res.winner === 'good' ? 'คนในบ้านชนะ!' : 'งูพิษชนะ!' } : null;

  const myKill = n.kill?.[myId]; const fakes = r.fakes || [];
  const kill = t => { sfx(sound, 'click'); tx(c => snKill(c, myId, t, srvNow)); };
  const guard = t => { sfx(sound, 'confirm'); tx(c => snGuard(c, myId, t, srvNow)); };
  const clue = c0 => { if (!confirm(`ทิ้ง "${EV[c0].n}" เป็นภาพสุดท้าย?`)) return; sfx(sound, 'confirm'); tx(c => snClue(c, myId, c0, srvNow)); };
  const fake = c0 => { sfx(sound, 'click'); tx(c => snFake(c, myId, c0)); };
  const fakeOk = () => { sfx(sound, 'confirm'); tx(c => snFakeOk(c, myId, srvNow)); };
  const vote = t => { sfx(sound, 'vote'); tx(c => snVote(c, myId, t, srvNow)); };
  const ring = !res && r.until ? <TimerRing secs={secs} total={total} size={58} label="วิ" /> : null;
  const PoolGrid = ({ onPick, mark }) => <div className="ev-pool">{pool.map(c => <EvCard key={c} id={c} onClick={onPick ? () => onPick(c) : undefined} {...(mark ? mark(c) : {})} />)}</div>;
  const isKiller = vRole === 'killer' && meAlive; const isGuard = vRole === 'guard' && meAlive;

  return <div className="explore-game snake-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number} • วันที่ {r.day}</span><span className="cat-tag">{res ? '🏁 จบเกม' : r.phase === 'night' ? '🌙 ลอบฆ่า' : r.phase === 'clue' ? '🩸 ภาพสุดท้าย' : r.phase === 'fake' ? '🐍 ใส่ร้าย' : '☀️ กลางวัน'}</span></div>
    <SnakeFx ev={fx} />
    <div className="gcols flow"><div className="gmain">
    {!res && <div className="sn-head"><Steps items={['🌙 ลอบฆ่า', '🩸 ภาพสุดท้าย', '🐍 ใส่ร้าย', '⚖️ โหวตไล่']} at={{ night: 0, clue: 1, fake: 2, day: 3 }[r.phase] ?? 0} />{ring}</div>}

    {/* ---------- กลางคืน ---------- */}
    {!res && r.phase === 'night' && <>
      {!meAlive ? <Phase art="tombstone" tone="night" kicker={`🌙 คืนที่ ${r.day}`} title="คุณตายแล้ว 👻">ดูเกมต่อได้และเห็นทุกอย่าง แต่<b>ห้ามพูดหรือใบ้</b>คนที่ยังเล่นอยู่</Phase>
        : vRole === 'killer' ? <Phase art="dagger" tone="me" kicker={`🌙 คืนที่ ${r.day} — นักลอบฆ่าออกล่า`} title={myKill ? `เล็ง ${nameOf(myKill)} อยู่` : 'เลือกเหยื่อคืนนี้'}>นักลอบฆ่าทุกคนต้องเลือก<b>คนเดียวกัน</b> (เปลี่ยนใจได้) • ภาพ 9 ใบด้านล่างคือภาพที่ผู้ตายจะเลือกได้</Phase>
        : vRole === 'guard' ? <Phase art="shield" tone={n.guard ? 'good' : 'me'} kicker={`🌙 คืนที่ ${r.day} — บอดี้การ์ด`} title={n.guard ? `คืนนี้คุ้มกัน ${nameOf(n.guard)}` : 'เลือกคุ้มกัน 1 คน'}>{n.guard ? 'ถ้านักลอบฆ่าเลือกคนนี้ เขาจะรอด' : <>ห้ามตัวเอง{r.lastGuard ? <> • คืนก่อนคุ้มกัน <b>{nameOf(r.lastGuard)}</b> คืนนี้ห้ามซ้ำ</> : ''}</>}</Phase>
        : <Phase art="night" tone="night" kicker={`🌙 คืนที่ ${r.day}`} title="ทุกคนเข้านอน… 😴">ปิดไฟ ล็อกประตู แล้วภาวนาว่าพรุ่งนี้จะได้ตื่น • ดูภาพ 9 ใบไว้ก่อน ผู้ตายจะเลือกจากชุดนี้</Phase>}
      <SecH icon="🖼️">ภาพในคฤหาสน์คืนนี้ <small>ผู้ตายเลือกได้ 1 ใบ</small></SecH>
      <PoolGrid />
      {isKiller && <ActionSheet open={!myKill} k={'kill' + r.day} icon="🗡️" title="เลือกเหยื่อคืนนี้" sub={killers.length > 1 ? 'นักลอบฆ่าทุกคนต้องเลือกคนเดียวกัน • เปลี่ยนใจได้' : 'แตะรูปคนที่จะลอบฆ่า'} secs={secs} total={total}>
        <PlayerGrid ids={liveIds.filter(id => r.roles[id] !== 'killer')} av={av} nameOf={nameOf} myId={myId} selected={myKill} onPick={kill} badge={id => stack(killers.filter(x => n.kill?.[x] === id)) || <span className="ptile-note">ลอบฆ่า</span>} /></ActionSheet>}
      {isKiller && myKill && <PlayerGrid ids={liveIds.filter(id => r.roles[id] !== 'killer')} av={av} nameOf={nameOf} myId={myId} selected={myKill} onPick={kill} badge={id => stack(killers.filter(x => n.kill?.[x] === id)) || <span className="ptile-note">ลอบฆ่า</span>} />}
      <ActionSheet open={isGuard && !n.guard} k={'guard' + r.day} icon="🛡️" title="เลือกคุ้มกัน 1 คน" sub={r.lastGuard ? `ห้ามตัวเอง • คืนก่อนคุ้มกัน ${nameOf(r.lastGuard)} คืนนี้ห้ามซ้ำ` : 'ห้ามตัวเอง'} secs={secs} total={total}>
        <PlayerGrid ids={liveIds.filter(id => id !== myId)} av={av} nameOf={nameOf} onPick={guard} off={id => id === r.lastGuard} badge={id => id === r.lastGuard ? <span className="ptile-note">คืนก่อนแล้ว</span> : <span className="tag good">🛡️ คุ้มกัน</span>} /></ActionSheet>
      {seeAll && !res && <div className="tip"><Art name="crystal" size={42} /><span>👻 มุมคนตาย — นักลอบฆ่าเล็ง: <b>{Object.entries(n.kill || {}).map(([k, t]) => `${nameOf(k)}→${nameOf(t)}`).join(', ') || '-'}</b> • บอดี้การ์ด: <b>{n.guard ? nameOf(n.guard) : '-'}</b></span></div>}
    </>}

    {/* ---------- ผู้ตายเลือกภาพสุดท้าย ---------- */}
    {!res && r.phase === 'clue' && <>
      {r.victim === myId ? <Phase art="tombstone" tone="me" kicker="🩸 คุณถูกลอบฆ่า!" title="ทิ้งภาพสุดท้าย 1 ใบ">เลือกภาพที่ใบ้ว่า<b>ใครฆ่าคุณ</b> เช่น สีตัวละคร ชื่อ นิสัย สิ่งที่เขาพูด • ระวัง! นักลอบฆ่าจะเห็นภาพที่คุณเลือก แล้วใส่ภาพปลอมปนอีก 2 ใบ</Phase>
        : <Phase art="tombstone" tone="bad" kicker={`🩸 คืนที่ ${r.day}`} title={`${nameOf(r.victim)} ถูกลอบฆ่า!`}>วิญญาณกำลังเลือกภาพสุดท้ายจาก 9 ใบนี้…{r.victim && killers.includes(myId) && meAlive ? ' • รอดูว่าเขาเลือกใบไหน แล้วค่อยใส่ร้าย' : ''}</Phase>}
      <div className="sn-victim"><Avatar id={r.victim} av={av} size={64} dead /><b>{nameOf(r.victim)}</b><small>ผู้ตายคืนที่ {r.day}</small></div>
      <PoolGrid onPick={r.victim === myId ? clue : undefined} />
      <ActionSheet open={r.victim === myId} k={'clue' + r.day} icon="🩸" title="ใครฆ่าคุณ? ใบ้ด้วยภาพ 1 ใบ" sub="ห้ามพูด! ใช้ภาพเดียวเท่านั้น" secs={secs} total={total}><PoolGrid onPick={clue} /></ActionSheet>
    </>}

    {/* ---------- นักลอบฆ่าเลือกภาพปลอม ---------- */}
    {!res && r.phase === 'fake' && <>
      {isKiller ? <Phase art="snake" tone="me" kicker="🐍 ใส่ร้าย" title={`เลือกภาพปลอม ${FAKES} ใบ`}>ผู้ตายเลือก <b>"{EV[r.real]?.n}"</b> • เลือกภาพปลอมที่ชี้ไปหาคนอื่น ให้ทุกคนสับสน • เพื่อนนักลอบฆ่าเห็นและแก้ร่วมกันได้</Phase>
        : <Phase art="night" tone="night" kicker="🐍 ใส่ร้าย" title="นักลอบฆ่ากำลังวางภาพปลอม…">อีกเดี๋ยวจะเห็นภาพ 3 ใบ มีจริงแค่ 1 ใบ{knowsReal && r.real ? <> • ภาพจริงคือ <b>"{EV[r.real]?.n}"</b></> : ''}</Phase>}
      <PoolGrid mark={c => ({ real: knowsReal && c === r.real, fake: (isKiller || seeAll) && fakes.includes(c), dim: (isKiller || seeAll) && c === r.real, tag: knowsReal && c === r.real ? 'ภาพจริง' : (isKiller || seeAll) && fakes.includes(c) ? 'ปลอม' : null })} />
      {isKiller && <ActionSheet open k={'fake' + r.day} icon="🐍" title={`เลือกภาพปลอม ${FAKES} ใบ`} sub={`ภาพจริง: "${EV[r.real]?.n}" • แตะเพื่อเลือก/ยกเลิก`} secs={secs} total={total}>
        <PoolGrid onPick={c => c !== r.real && fake(c)} mark={c => ({ real: c === r.real, dim: c === r.real, sel: fakes.includes(c), tag: c === r.real ? 'ภาพจริง' : fakes.includes(c) ? 'ปลอม ' + (fakes.indexOf(c) + 1) : null })} />
        <button className="primary wide" disabled={fakes.length !== FAKES} onClick={fakeOk}>🐍 {fakes.length === FAKES ? 'วางภาพปลอม 2 ใบนี้' : `เลือกอีก ${FAKES - fakes.length} ใบ`}</button></ActionSheet>}
    </>}

    {/* ---------- กลางวัน ---------- */}
    {!res && r.phase === 'day' && <>
      <Phase art={r.dawn?.dead?.length ? 'tombstone' : 'shield'} tone={r.dawn?.dead?.length ? 'bad' : 'day'} kicker={`☀️ เช้าวันที่ ${r.day}`} title={r.dawn?.dead?.length ? `${r.dawn.dead.map(nameOf).join(', ')} ถูกลอบฆ่า 🩸` : 'เมื่อคืนไม่มีใครตาย 🙏'}>
        {r.dawn?.dead?.length && r.reveal ? <>บทบาท: <b>{r.dawn.dead.map(roleTxt).join(', ')}</b> • </> : ''}{todayMsg ? 'ภาพจริงมีแค่ 1 ใบ ช่วยกันตีความ แล้วโหวตไล่คนที่สงสัย' : 'ไม่มีภาพใหม่วันนี้ ใช้ภาพเก่าและพฤติกรรมเพื่อนช่วยคิด'}</Phase>
      {todayMsg && <div className="sn-msg"><div className="sn-msg-who"><Avatar id={todayMsg.dead} av={av} size={48} dead /><span>ภาพสุดท้ายของ<br /><b>{nameOf(todayMsg.dead)}</b></span></div>
        <div className="sn-msg-cards">{todayMsg.cards.map((c, i) => <EvCard key={c} id={c} size="l" real={knowsReal && c === todayMsg.real} tag={knowsReal && c === todayMsg.real ? 'ภาพจริง' : null} flip delay={i * 220} />)}</div>
        {todayMsg.auto && <small className="hint">⏰ ผู้ตายเลือกไม่ทัน ระบบสุ่มภาพจริงให้</small>}</div>}
      <SecH icon="⚖️">โหวตไล่ออกจากบ้าน <small>{meAlive ? (votes[myId] ? `คุณโหวต ${votes[myId] === 'skip' ? 'ไม่ไล่ใคร' : nameOf(votes[myId])}` : 'แตะรูป • เปลี่ยนใจได้') : 'คนตายโหวตไม่ได้'}</small></SecH>
      <PlayerGrid ids={liveIds.filter(id => id !== myId)} av={av} nameOf={nameOf} selected={votes[myId]} onPick={meAlive ? vote : undefined} badge={id => stack(Object.keys(votes).filter(v => votes[v] === id)) || <span className="ptile-note">ยังไม่มีเสียง</span>} />
      {meAlive && <button className={'skip-vote' + (votes[myId] === 'skip' ? ' sel' : '')} onClick={() => vote('skip')}><span>🤷 ไม่ไล่ใครวันนี้{votes[myId] === 'skip' ? ' ✓' : ''}</span>{stack(Object.keys(votes).filter(v => votes[v] === 'skip'))}</button>}
      <WhoDone ids={liveIds} done={id => id in votes} av={av} nameOf={nameOf} label="🗳️ โหวตแล้ว" />
      <p className="hint">ต้องได้ <b>{Math.floor(liveIds.length / 2) + 1} เสียงขึ้นไป</b> (เกินครึ่ง) ถึงจะถูกไล่ • สรุปเมื่อโหวตครบหรือหมดเวลา</p>
    </>}

    {!res && isHost && <HostBar>
      <button className="secondary" onClick={() => { if (confirm('ข้ามขั้นนี้เลย? (ใครยังไม่เลือก ระบบสุ่ม/สรุปให้)')) tx(c => snSkip(c, srvNow)); }}>⏩ ข้ามขั้นนี้</button>
      {order.filter(id => !room.players?.[id] && alive[id]).map(id => <span key={id} className="ptile-note">🚪 {nameOf(id)} หลุดไปแล้ว (นับว่าออกจากเกม)</span>)}
    </HostBar>}

    {/* ---------- จบเกม ---------- */}
    {res && <>
      <Outcome art={res.winner === 'good' ? 'villager' : 'snake'} tone={res.winner === 'good' ? 'good' : 'bad'} title={WIN_TXT[res.winner]}>
        นักลอบฆ่าคือ <Voters ids={killers} av={av} size={24} /> <b>{killers.map(nameOf).join(', ')}</b> • เล่นไป {r.day} วัน</Outcome>
      {msgs.length > 0 && <><SecH icon="🩸">เฉลยภาพสุดท้ายทุกคืน</SecH>
        <div className="sn-history end">{msgs.map((m, i) => <div key={i} className="sn-hrow"><div className="sn-msg-who"><Avatar id={m.dead} av={av} size={36} dead /><span>คืนที่ {m.day}<br /><b>{nameOf(m.dead)}</b></span></div>
          <div className="sn-msg-cards">{m.cards.map((c, j) => <EvCard key={c} id={c} size="s" real={c === m.real} dim={c !== m.real} tag={c === m.real ? 'จริง' : 'ปลอม'} flip delay={(i * 3 + j) * 160} />)}</div></div>)}</div></>}
      <SecH icon="🎭">บทบาทของแต่ละคน</SecH>
      <RevealGrid av={av} nameOf={nameOf} items={order.map(id => { const k = r.roles?.[id]; const ri = S_ROLES[k] || S_ROLES.folk; return { id, art: ri.art, label: ri.name, bad: ri.side === 'evil', dead: !alive[id], extra: alive[id] ? 'รอดชีวิต' : '💀 ตาย' }; })} />
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH>
      <Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}

    </div><div className="gside">
    {!res && <RoleCard show={card.show} onToggle={card.toggle} onFake={card.fake} faking={card.disguise} art={info.art} cover="moon" name={info.name} side={info.side === 'evil' ? 'bad' : 'good'} sideLabel={SIDE_LABEL[info.side]}>
      <p>{info.desc}</p>
      {myRole === 'killer' && <div className="info-line">พวกเดียวกัน: {evilFriends.filter(id => id !== myId).length ? <><Voters ids={evilFriends.filter(id => id !== myId)} av={av} /> <b>{evilFriends.filter(id => id !== myId).map(id => `${nameOf(id)}${r.roles[id] === 'master' ? ' (ผู้บงการ)' : ''}`).join(', ')}</b></> : '— ไม่มี —'}</div>}
      {(myRole === 'master' || myRole === 'minion') && <div className="info-line">นักลอบฆ่า: <Voters ids={killers} av={av} /> <b>{killers.map(nameOf).join(', ')}</b></div>}
    </RoleCard>}

    {!res && <><SecH icon="🏚️">คนในคฤหาสน์ <small>อยู่ {liveIds.length} • ตาย {order.length - liveIds.length}</small></SecH>
      <PlayerGrid ids={order} av={av} nameOf={nameOf} myId={myId} small dead={id => !alive[id] || !room.players?.[id]} note={id => showRoleOf(id) ? roleTxt(id) : alive[id] ? 'ยังมีชีวิต' : 'ตายแล้ว'} /></>}

    {!res && msgs.length > 0 && <><SecH icon="🩸">ภาพสุดท้ายที่ผ่านมา</SecH>
      <div className="sn-history">{[...msgs].reverse().map((m, i) => <div key={i} className="sn-hrow"><div className="sn-msg-who"><Avatar id={m.dead} av={av} size={30} dead /><span>คืนที่ {m.day}<br /><b>{nameOf(m.dead)}</b></span></div>
        <div className="sn-msg-cards">{m.cards.map(c => <EvCard key={c} id={c} size="s" real={knowsReal && c === m.real} />)}</div></div>)}</div></>}
    {!res && (r.log || []).some(e => e.t === 'day') && <><SecH icon="📜">บันทึกการโหวต</SecH><ul className="head-log">{r.log.filter(e => e.t === 'day').reverse().map((e, i) => <li key={i}>☀️ วันที่ {e.day}: {e.out ? <span className="bad">{deadName(e.out)} ถูกไล่ออก</span> : 'ไม่มีใครถูกไล่'}</li>)}</ul></>}
    </div></div>
  </div>;
}

// ---------- ห้องรอ: ตั้งค่าบทบาทพิเศษ + เวลา (เก็บในห้อง ทุกเครื่องเห็นตรงกัน) ----------
export function SnakeLobby({ db, roomCode, room, players, isHost }) {
  const o = room.settings?.snake || {}; const n = players.length; const P = snPlan(n, o);
  const save = patch => runTransaction(ref(db, `rooms/${roomCode}/settings/snake`), c => ({ ...(c || {}), ...patch })).catch(() => {});
  const T = ({ k, def, children }) => <label className="cat-toggle"><input type="checkbox" className="tick" checked={o[k] ?? def} disabled={!isHost} onChange={e => save({ [k]: e.target.checked })} /> {children}</label>;
  return <>
    {n >= SN_MIN && <div className="score-rules"><b>🎭 บทบาทในวงนี้ ({n} คน)</b><span>🗡️ นักลอบฆ่า {P.k}{P.master ? ' • 🐍 ผู้บงการ 1' : ''}{P.minion ? ' • 🦎 ลูกสมุน 1' : ''}{P.det ? ' • 🔎 นักสืบ 1' : ''}{P.guard ? ' • 🛡️ บอดี้การ์ด 1' : ''} • 🏠 คนในบ้าน {P.folk}</span></div>}
    <div className="score-rules"><b>⚙️ บทบาทพิเศษ {isHost ? '(เลือกได้)' : '(หัวหน้าห้องเลือก)'}</b>
      <T k="det" def>🔎 นักสืบ — เห็นว่าภาพไหนคือภาพจริง</T>
      <T k="guard" def>🛡️ บอดี้การ์ด — คืนละ 1 คน กันการลอบฆ่า</T>
      <T k="master" def>🐍 ผู้บงการ (6 คนขึ้นไป) — ฝ่ายร้ายที่เห็นภาพจริง</T>
      <T k="minion" def={false}>🦎 ลูกสมุน (8 คนขึ้นไป) — ฝ่ายร้าย รู้ว่าใครคือนักลอบฆ่า</T>
      <T k="reveal" def={false}>⚰️ เปิดบทบาทคนที่ตาย/ถูกไล่</T>
      <label>⏱️ เวลาคุยกลางวัน</label>
      <select value={o.day ?? 180} disabled={!isHost} onChange={e => save({ day: +e.target.value })}><option value={120}>2 นาที</option><option value={180}>3 นาที</option><option value={300}>5 นาที</option><option value={420}>7 นาที</option></select>
    </div>
    <div className="sn-lobby-cards">{['knife', 'cat', 'umbrella', 'moon', 'durian'].map((c, i) => <EvCard key={c} id={c} size="s" flip delay={i * 120} />)}<small>ภาพหลักฐานวาดเอง {EV_IDS.length} ใบ สุ่มคืนละ {POOL} ใบ</small></div>
  </>;
}
