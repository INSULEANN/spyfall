// เกม "แก๊งใบ้คำ" — 2 ทีม (แดง/ฟ้า) แต่ละทีมมีหัวหน้า 1 คนที่เห็นแผนลับว่าคำไหนเป็นของทีมไหน
// หัวหน้าใบ้ 1 คำ + ตัวเลข → ลูกทีมแตะเปิดคำบนกระดาน 5×5 • เปิดคำบึ้ม = แพ้ทันที • เปิดคำของทีมตัวเองครบก่อนชนะ
// (กลไกแนวเกมใบ้คำแบ่งทีมที่มีอยู่ทั่วไป แต่ชื่อ ภาพ ข้อความเป็นของเราเองทั้งหมด)
// ⚠️ แผนลับ (round.key) อยู่ในข้อมูลห้องเหมือนบทบาทลับของเกมอื่น — หน้าจอของลูกทีมห้ามแสดง/ใส่คลาสตามแผนลับเด็ดขาด
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ref, runTransaction, update } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, pick } from './rand.js';
import { CODE_WORDS, vlen } from './codeWords.js';
import { Avatar, HostBar, SecH, Outcome, Leaderboard, TimerRing } from './ui.jsx';
import './clue.css';

export const CLUE_MIN = 4, CLUE_MAX = 12;
export const CLUE_SCORE = { win: 2 };
export const SIZE = 25, N_FIRST = 9, N_SECOND = 8, N_NEUTRAL = 7;
export const CLUE_SECS = [0, 60, 90, 120, 180];
export const TEAMS = { r: { n: 'ทีมแดง', e: '🔴', c: '#ff4d5e' }, b: { n: 'ทีมฟ้า', e: '🔵', c: '#3a8bff' } };
export const KIND = { r: { e: '🔴', n: 'ทีมแดง' }, b: { e: '🔵', n: 'ทีมฟ้า' }, n: { e: '⚪', n: 'คำเปล่า' }, x: { e: '💣', n: 'คำบึ้ม' } };
export const other = t => (t === 'r' ? 'b' : 'r');

// ---------- จัดทีมจากค่าที่หัวหน้าห้องตั้งในห้องรอ ----------
// set = { team:{id:'r'|'b'}, chief:{r,b}, shared, mid } • คนที่ยังไม่มีทีม → ใส่ทีมที่คนน้อยกว่า • ทีมคนไม่พอ → ย้ายจากทีมที่ใหญ่กว่า
export function planTeams(ids, set = {}) {
  const shared = !!set.shared; const team = {};
  const mid = shared ? (ids.includes(set.mid) ? set.mid : pick(ids)) : null;
  ids.forEach(id => { const t = set.team?.[id]; if (id !== mid && (t === 'r' || t === 'b')) team[id] = t; });
  if (mid) team[mid] = 'x';
  const cnt = t => ids.filter(id => team[id] === t).length;
  shuffle(ids.filter(id => !team[id])).forEach(id => { team[id] = cnt('r') <= cnt('b') ? 'r' : 'b'; });
  const need = shared ? 1 : 2;
  for (const t of ['r', 'b']) while (cnt(t) < need && cnt(other(t)) > need) { const mv = pick(ids.filter(id => team[id] === other(t) && id !== set.chief?.[other(t)])); team[mv] = t; }
  const chief = {};
  if (mid) { chief.r = mid; chief.b = mid; }
  else ['r', 'b'].forEach(t => { const c = set.chief?.[t]; chief[t] = c && team[c] === t ? c : pick(ids.filter(id => team[id] === t)); });
  return { team, chief, shared };
}

export function makeClueRound(ids, set = {}, number = 1, t0 = Date.now(), pool = CODE_WORDS) {
  const { team, chief, shared } = planTeams(ids, set);
  const first = pick(['r', 'b']); const sec = CLUE_SECS.includes(+set.sec) ? +set.sec : 0;
  const words = shuffle([...new Set(pool)]).slice(0, SIZE);
  const key = shuffle([...Array(N_FIRST).fill(first), ...Array(N_SECOND).fill(other(first)), ...Array(N_NEUTRAL).fill('n'), 'x']);
  const R = { number, kind: 'clue', order: shuffle(ids), team, chief, shared, words, key, open: null, first, turn: first, phase: 'clue', clue: null, left: 0, guesses: 0, at: t0 + 2000, turnMs: sec * 1000, clues: [], fx: null, fxk: 0, out: null, winner: null, log: [{ text: `🎲 ${TEAMS[first].e} ${TEAMS[first].n} เริ่มก่อน (มี ${N_FIRST} คำ อีกทีมมี ${N_SECOND} คำ)`, t: t0 }], startedAt: t0 };
  return JSON.parse(JSON.stringify(R));
}

// Firebase ทิ้ง array/object ว่าง และ null → เติมกลับให้ครบก่อนใช้
export function normRound(R) {
  if (!R) return R;
  R.order = R.order || []; R.team = R.team || {}; R.chief = R.chief || {}; R.words = R.words || []; R.key = R.key || [];
  R.open = R.open && typeof R.open === 'object' && !Array.isArray(R.open) ? R.open : {};
  R.clues = R.clues || []; R.log = R.log || []; R.out = R.out || {};
  R.clue = R.clue || null; R.fx = R.fx || null; R.fxk = R.fxk || 0; R.left = R.left || 0; R.guesses = R.guesses || 0; R.turnMs = R.turnMs || 0; R.at = R.at || 0;
  R.shared = !!R.shared; R.winner = R.winner || null;
  return R;
}
// ตัวห่อ transaction: เช็กว่าเป็นเกมนี้ เติมค่าที่ Firebase ทิ้ง เรียกตรรกะ แล้วล้าง undefined ก่อนเขียน
export function clueApply(c, f) {
  if (!c || c.status !== 'playing' || c.round?.kind !== 'clue') return;
  normRound(c.round); const out = f(c);
  return out ? JSON.parse(JSON.stringify(out)) : undefined;
}

// ---------- ตัวช่วย ----------
export const isOpen = (r, i) => !!r.open['c' + i];
export const leftOf = (r, t) => r.key.filter((k, i) => k === t && !isOpen(r, i)).length;
export const totalOf = (r, t) => r.key.filter(k => k === t).length;
export const active = (r, id) => r.order.includes(id) && !r.out[id];
export const membersOf = (r, t) => r.order.filter(id => active(r, id) && r.team[id] === t);
export const guessersOf = (r, t) => membersOf(r, t).filter(id => id !== r.chief[t]);
export const isChief = (r, id) => r.chief.r === id || r.chief.b === id;
export const canGuess = (r, id) => r.phase === 'guess' && active(r, id) && r.team[id] === r.turn && r.chief[r.turn] !== id;
const norm = s => String(s || '').toLowerCase().replace(/\s/g, '');
function say(r, text, extra) { r.log = [...(r.log || []), { text, t: Date.now(), ...(extra || {}) }].slice(-40); }
function passTurn(r, now) { r.turn = other(r.turn); r.phase = 'clue'; r.clue = null; r.left = 0; r.guesses = 0; r.at = now; }

// ---------- ตรรกะ (ทำงานบนข้อมูลห้องทั้งก้อนใน transaction) ----------
// ตรวจคำใบ้: ห้ามว่าง ห้ามซ้ำกับคำที่ยังไม่เปิดบนกระดาน
export function clueProblem(r, w) {
  const s = String(w || '').trim(); if (!s) return 'พิมพ์คำใบ้ก่อน';
  if (s.length > 24) return 'คำใบ้ยาวเกินไป';
  const hit = r.words.find((x, i) => !isOpen(r, i) && (norm(x) === norm(s)));
  if (hit) return `ใช้คำ “${hit}” ที่อยู่บนกระดานไม่ได้`;
  return null;
}
export function giveClue(cur, me, w, n, now) {
  const r = cur.round; if (r.phase !== 'clue' || r.chief[r.turn] !== me || !active(r, me)) return;
  const word = String(w || '').trim().replace(/\s+/g, ' '); const num = Math.floor(+n);
  if (clueProblem(r, word) || !(num >= 1 && num <= 9)) return;
  r.clue = { w: word, n: num, by: me, t: r.turn }; r.left = num + 1; r.guesses = 0; r.phase = 'guess'; r.at = now;
  r.clues = [...r.clues, { w: word, n: num, t: r.turn, got: 0 }];
  say(r, `💬 ${TEAMS[r.turn].e} หัวหน้า {${me}} ใบ้ “${word}” × ${num}`, { clue: r.turn });
  return cur;
}
export function guessCard(cur, me, i, now) {
  const r = cur.round; if (!canGuess(r, me)) return; i = Math.floor(+i);
  if (!(i >= 0 && i < SIZE) || isOpen(r, i)) return;
  const k = r.key[i], t = r.turn, w = r.words[i];
  r.open = { ...r.open, ['c' + i]: { by: me, t } }; r.guesses++; r.fxk++;
  const fx = { k: r.fxk, i, c: k, by: me, t, w };
  const last = r.clues[r.clues.length - 1]; if (last && k === t) last.got = (last.got || 0) + 1;
  if (k === 'x') { r.fx = { ...fx, end: 'bomb' }; say(r, `💣 {${me}} เปิด “${w}” = คำบึ้ม! ${TEAMS[t].n}แพ้ทันที`, { bad: 1 }); return finish(cur, other(t), 'bomb'); }
  if (k === t) {
    if (!leftOf(r, t)) { r.fx = { ...fx, end: 'win' }; say(r, `🏆 {${me}} เปิด “${w}” คำสุดท้ายของ${TEAMS[t].n}!`, { good: 1 }); return finish(cur, t, 'all'); }
    r.left--;
    if (r.left <= 0) { r.fx = { ...fx, end: 'limit' }; say(r, `✅ {${me}} เปิด “${w}” ถูก! ครบโควตาแล้ว ส่งตาให้${TEAMS[other(t)].n}`, { good: 1 }); passTurn(r, now); return cur; }
    r.fx = { ...fx, end: 'ok' }; say(r, `✅ {${me}} เปิด “${w}” ถูก! เดาต่อได้อีก ${r.left} ครั้ง`, { good: 1 }); return cur;
  }
  if (k === other(t)) {
    if (!leftOf(r, k)) { r.fx = { ...fx, end: 'gift' }; say(r, `😱 {${me}} เปิด “${w}” คำสุดท้ายของ${TEAMS[k].n} — ${TEAMS[k].n}ชนะ!`, { bad: 1 }); return finish(cur, k, 'gift'); }
    r.fx = { ...fx, end: 'enemy' }; say(r, `😱 {${me}} เปิด “${w}” เป็นของ${TEAMS[k].n}! หมดตา`, { bad: 1 }); passTurn(r, now); return cur;
  }
  r.fx = { ...fx, end: 'neutral' }; say(r, `😶 {${me}} เปิด “${w}” คำเปล่า — หมดตา${TEAMS[t].n}`); passTurn(r, now); return cur;
}
// ลูกทีมพอแค่นี้ (ต้องเดาอย่างน้อย 1 คำก่อน)
export function endTurn(cur, me, now) {
  const r = cur.round; if (!canGuess(r, me) || r.guesses < 1) return;
  say(r, `✋ {${me}} ขอพอแค่นี้ — ส่งตาให้${TEAMS[other(r.turn)].n}`); passTurn(r, now); return cur;
}
// หมดเวลา: คิดคำใบ้ไม่ทัน = เสียตา • เดาไม่ทัน = จบตา
export function clueTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'clue' || cur.status !== 'playing' || !r.turnMs || now < r.at + r.turnMs) return;
  say(r, r.phase === 'clue' ? `⏰ หัวหน้า${TEAMS[r.turn].n}คิดคำใบ้ไม่ทัน — เสียตา` : `⏰ หมดเวลาเดาของ${TEAMS[r.turn].n}`); passTurn(r, now); return cur;
}
export function forceClue(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'clue') return;
  say(r, `⏭️ หัวหน้าห้องข้ามตา${TEAMS[r.turn].n}`); passTurn(r, now); return cur;
}
// คนหลุด: เป็นหัวหน้า → ให้ลูกทีมคนอื่นเป็นแทน • ทีมไหนเหลือคนไม่พอเล่น = แพ้
export function kickClue(cur, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || !active(r, id) || cur.players?.[id]) return;
  r.out = { ...r.out, [id]: true }; say(r, `🚪 {${id}} หลุดออกจากเกม`);
  if (r.shared && r.chief.r === id) {
    const rs = membersOf(r, 'r'), bs = membersOf(r, 'b'); const big = rs.length >= bs.length ? rs : bs;
    if (big.length > 1) { const nc = pick(big); r.team[nc] = 'x'; r.chief = { r: nc, b: nc }; say(r, `👑 {${nc}} เป็นหัวหน้ากลางแทน`); }
  } else ['r', 'b'].forEach(t => { if (r.chief[t] === id) { const m = membersOf(r, t); if (m.length) { r.chief[t] = pick(m); say(r, `👑 {${r.chief[t]}} เป็นหัวหน้า${TEAMS[t].n}แทน`); } } });
  const ok = t => r.chief[t] && active(r, r.chief[t]) && guessersOf(r, t).length > 0;
  const okR = ok('r'), okB = ok('b');
  if (!okR || !okB) { say(r, '⚠️ คนในทีมไม่พอเล่นต่อ'); return finish(cur, okR ? 'r' : okB ? 'b' : null, 'players'); }
  return cur;
}
function finish(cur, winner, why) {
  const r = cur.round; r.phase = 'done'; r.winner = winner || null; r.clue = null;
  const points = {}, sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { points[id] = winner && r.team[id] === winner && !r.out[id] ? CLUE_SCORE.win : 0; sc[id] = (sc[id] || 0) + points[id]; });
  cur.status = 'result'; cur.scores = sc; cur.result = { type: 'clue', winner: winner || null, why, points };
  return cur;
}

// ---------- หน้าจอ ----------
const fxText = (F, you) => {
  const T = TEAMS[F.t], O = TEAMS[other(F.t)];
  if (F.end === 'bomb') return { cls: 'bomb', h: '💣 บึ้ม!!', s: `${you(F.by)} เปิด “${F.w}” — ${T.n}แพ้ทันที` };
  if (F.end === 'win') return { cls: 'ok', h: '🏆 ครบแล้ว!', s: `“${F.w}” คำสุดท้ายของ${T.n}` };
  if (F.end === 'ok') return { cls: 'ok', h: '✅ ถูกต้อง!', s: `“${F.w}” เป็นของ${T.n} • เดาต่อได้` };
  if (F.end === 'limit') return { cls: 'ok', h: '✅ ถูกต้อง!', s: `“${F.w}” • ครบโควตา ส่งตาให้${O.n}` };
  if (F.end === 'enemy' || F.end === 'gift') return { cls: 'enemy t-' + F.c, h: '😱 โดนของอีกทีม!', s: `“${F.w}” เป็นของ${O.n}${F.end === 'gift' ? ' — คำสุดท้าย ' + O.n + 'ชนะ!' : ' • หมดตา'}` };
  return { cls: 'neutral', h: '😶 คำเปล่า', s: `“${F.w}” ไม่ใช่ของใคร • หมดตา${T.n}` };
};
function BombFx({ F, you, onClose }) {
  return <div className="cw-bomb" onClick={onClose}>
    <i className="cw-flash" /><i className="cw-ring" /><i className="cw-ring r2" /><i className="cw-ring r3" />
    {Array.from({ length: 16 }, (_, i) => <i key={i} className="cw-shard" style={{ '--a': i * 22.5 + 'deg', '--d': 120 + (i % 4) * 55 + 'px' }} />)}
    <div className="cw-bomb-box"><b>💣 บึ้ม!!</b><span>{you(F.by)} เปิด “{F.w}”</span><em>{TEAMS[F.t].e} {TEAMS[F.t].n} แพ้ทันที!</em><small>แตะเพื่อปิด</small></div>
  </div>;
}

export function ClueGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack, srvNow }) {
  const r = useMemo(() => normRound(JSON.parse(JSON.stringify(room.round))), [room.round]);
  const res = room.status === 'result' && room.result;
  const you = id => (id === myId ? 'คุณ' : nameOf(id));
  const nm = s => String(s).replace(/\{([^}]+)\}/g, (_, id) => nameOf(id));
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => clueApply(c, f)).then(x => x.committed).catch(() => false);
  const T = r.turn, TT = TEAMS[T]; const meIn = active(r, myId); const myT = r.team[myId];
  const iChief = meIn && isChief(r, myId); const seeKey = iChief || !!res; // แผนลับ: เห็นเฉพาะหัวหน้า (จบเกมแล้วเห็นทุกคน)
  const iGuess = !res && canGuess(r, myId); const iClue = !res && r.phase === 'clue' && r.chief[T] === myId && meIn;
  const myTurn = !res && meIn && (myT === T || (r.shared && iChief));

  // เวลา
  const total = Math.round(r.turnMs / 1000); const secs = r.turnMs ? Math.max(0, Math.ceil((r.at + r.turnMs - srvNow) / 1000)) : 0;
  const due = !res && r.turnMs > 0 && srvNow >= r.at + r.turnMs; useEffect(() => { if (due) tx(c => clueTick(c, srvNow)); }, [due, r.at]);

  // คำใบ้ (ในเครื่อง) + เล็งคำก่อนเปิด
  const [w, setW] = useState(''); const [n, setN] = useState(1); const [aim, setAim] = useState(null);
  useEffect(() => { setW(''); setN(1); setAim(null); }, [r.turn, r.phase, r.clues.length]);
  useEffect(() => { setAim(null); }, [r.fxk]);
  const prob = iClue && w.trim() ? clueProblem(r, w) : null;

  // เอฟเฟกต์เปิดคำ
  const [fx, setFx] = useState(null); const seen = useRef(r.fx?.k || 0);
  useEffect(() => {
    const F = r.fx; if (!F || F.k <= seen.current) return; seen.current = F.k; setFx(F);
    const mine = F.t === myT || (r.shared && iChief); const tm = [];
    sfx(sound, 'flip');
    tm.push(setTimeout(() => {
      if (F.end === 'bomb') { sfx(sound, 'bomb'); if (navigator.vibrate) try { navigator.vibrate([300, 100, 300]); } catch { /* */ } }
      else if (F.c === F.t) sfx(sound, 'right');
      else if (F.c === 'n') sfx(sound, 'neutral');
      else sfx(sound, mine ? 'enemy' : 'right');
    }, 380));
    tm.push(setTimeout(() => setFx(x => (x?.k === F.k ? null : x)), F.end === 'bomb' ? 4200 : 2200));
    return () => tm.forEach(clearTimeout);
  }, [r.fx?.k]);

  // เสียงตามสถานะ
  const prev = useRef(null);
  useEffect(() => {
    const s = { turn: r.turn, ph: r.phase, res: !!res, nc: r.clues.length }; const p = prev.current; prev.current = s; if (!p) return;
    if (s.res && !p.res) { const won = res.winner && (res.winner === myT); setTimeout(() => sfx(sound, won ? 'win' : res.winner ? 'lose' : 'click'), res.why === 'bomb' ? 1900 : 700); return; }
    if (s.nc > p.nc) { sfx(sound, 'clue'); return; }
    if (s.turn !== p.turn) setTimeout(() => sfx(sound, myTurn ? 'yourTurn' : 'turn'), 900);
  });

  const pickCard = i => {
    if (!iGuess || isOpen(r, i)) return;
    if (aim !== i) { sfx(sound, 'select'); setAim(i); return; }
    setAim(null); tx(c => guessCard(c, myId, i, srvNow)).then(ok => { if (!ok) msg('เปิดไม่ทัน — ตาอาจเปลี่ยนไปแล้ว'); });
  };
  const sendClue = async () => { if (prob || !w.trim()) { msg(prob || 'พิมพ์คำใบ้ก่อน'); return; } sfx(sound, 'confirm'); const ok = await tx(c => giveClue(c, myId, w, n, srvNow)); if (!ok) msg('ส่งคำใบ้ไม่สำเร็จ ลองใหม่'); };
  const stop = () => { sfx(sound, 'click'); tx(c => endTurn(c, myId, srvNow)); };

  const F = fx ? fxText(fx, you) : null;
  const chiefOf = t => r.chief[t];
  const steps = ['หัวหน้าใบ้', 'ทีมเดา', 'ส่งตา'];
  const at = res ? 3 : r.phase === 'clue' ? 0 : 1;

  const doBox = res ? null : !meIn ? <><b>👀 คุณดูอยู่ข้างสนาม</b><span>รอเกมรอบหน้า</span></>
    : iClue ? <><b>👑 ถึงตาคุณใบ้{r.shared ? `ให้${TT.n}` : ''}!</b><span>ดูคำที่มีจุด {TT.e} บนกระดาน แล้วคิด <em>1 คำ</em> ที่โยงไปหาหลาย ๆ คำพร้อมกัน + บอกจำนวน • ระวังคำ 💣 กับคำของอีกทีม</span></>
      : iChief && myTurn && r.phase === 'guess' ? <><b>🤐 ห้ามใบ้เพิ่ม ห้ามทำหน้า!</b><span>ลูกทีมกำลังเดาคำใบ้ “{r.clue?.w}” × {r.clue?.n} — นั่งนิ่ง ๆ ลุ้นไปด้วยกัน</span></>
        : iChief ? <><b>⏳ ตาของ{TT.e} {TT.n}</b><span>{r.phase === 'clue' ? `หัวหน้า ${you(chiefOf(T))} กำลังคิดคำใบ้` : `ทีมนั้นกำลังเดา “${r.clue?.w}” × ${r.clue?.n}`} • ดูว่าเขาจะพลาดไปเปิดคำของทีมเราไหม</span></>
          : iGuess ? <><b>🎯 เดาเลย! คำใบ้ “{r.clue?.w}” × {r.clue?.n}</b><span>แตะคำที่คิดว่าเป็นของ{TT.n} <em>2 ครั้ง</em>เพื่อเปิด (ครั้งแรก = เล็ง) • ทุกคนในทีมกดได้ คุยกันก่อน • เปิดได้อีก {r.left} ครั้ง</span></>
            : myTurn ? <><b>⏳ รอหัวหน้า {you(chiefOf(T))} คิดคำใบ้</b><span>คำใบ้ขึ้นแล้วทั้งทีมช่วยกันเดา</span></>
              : <><b>👀 ตาของ{TT.e} {TT.n}</b><span>{r.phase === 'clue' ? 'อีกทีมกำลังคิดคำใบ้' : `อีกทีมกำลังเดา “${r.clue?.w}” × ${r.clue?.n}`} • จำไว้ว่าคำไหนน่าจะเป็นของทีมเรา</span></>;

  const Roster = ({ t }) => <div className={'cw-roster t-' + t}><b>{TEAMS[t].e} {TEAMS[t].n} <small>เหลือ {leftOf(r, t)}/{totalOf(r, t)} คำ</small></b>
    {(r.shared ? [] : [chiefOf(t)]).concat(r.order.filter(id => r.team[id] === t && id !== chiefOf(t))).filter(Boolean).map(id => <span key={id} className={'cw-mem' + (r.out[id] ? ' out' : '') + (id === myId ? ' me' : '')}><Avatar id={id} av={av} size={26} /><i>{you(id)}</i>{id === chiefOf(t) && <em>👑</em>}</span>)}</div>;

  return <div className="cw-game">
    <div className="round-top"><span className="eyebrow">แก๊งใบ้คำ • รอบที่ {r.number}</span><span className="cat-tag">{r.shared ? `👑 หัวหน้ากลาง: ${you(chiefOf('r'))}` : seeKey && !res ? '👑 คุณเห็นแผนลับ' : '🎯 ลูกทีม'}</span></div>
    <div className="gcols"><div className="gmain">
      {/* แถบตาปัจจุบัน */}
      <div className={'cw-turn t-' + (res ? res.winner || 'n' : T)}>
        <div className="cw-score"><span className={'t-r' + (T === 'r' && !res ? ' now' : '')}>🔴 <b>{leftOf(r, 'r')}</b></span><span className={'t-b' + (T === 'b' && !res ? ' now' : '')}>🔵 <b>{leftOf(r, 'b')}</b></span></div>
        <div className="cw-turn-mid">{res ? <><small>จบเกม</small><b>{res.winner ? `${TEAMS[res.winner].e} ${TEAMS[res.winner].n} ชนะ!` : 'ไม่มีผู้ชนะ'}</b></>
          : r.phase === 'clue' ? <><small>{TT.e} ตาของ{TT.n}</small><b className="cw-think">👑 {you(chiefOf(T))} กำลังคิดคำใบ้<i>.</i><i>.</i><i>.</i></b></>
            : <><small>{TT.e} คำใบ้ของ{TT.n}</small><b className="cw-clue" key={r.clues.length}>“{r.clue?.w}” <em>× {r.clue?.n}</em></b><small>เปิดได้อีก {r.left} ครั้ง • เปิดแล้ว {r.guesses}</small></>}</div>
        {!res && r.turnMs > 0 ? <TimerRing secs={secs} total={total} size={62} /> : <span className="cw-turn-e">{res ? '🏁' : TT.e}</span>}
      </div>
      {/* กระดาน */}
      <div className={'cw-board' + (fx?.end === 'bomb' ? ' quake' : '') + (iGuess ? ' guess' : '') + (seeKey && !res ? ' keyview' : '')}>
        {r.words.map((word, i) => {
          const o = r.open['c' + i]; const show = !!o || !!res; const k = show || seeKey ? r.key[i] : null;
          const cls = 'cw-card' + (show ? ' open t-' + k : '') + (!o && res ? ' late' : '') + (!show && seeKey ? ' key k-' + k : '') + (iGuess && !o ? ' can' : '') + (aim === i ? ' aim' : '') + (fx?.i === i ? ' just' : '') + (vlen(word) >= 7 ? ' long' : vlen(word) >= 5 ? ' mid' : '');
          return <button key={i} type="button" className={cls} disabled={!iGuess || !!o} onClick={() => pickCard(i)} style={{ '--i': i }}>
            <span className="cw-in">
              <span className="cw-front">{!show && seeKey && <i className="cw-dot">{KIND[k].e}</i>}<b>{word}</b>{aim === i && <small className="cw-aim">แตะอีกครั้งเพื่อเปิด</small>}</span>
              {show && <span className="cw-back"><em>{KIND[k].e}</em><b>{word}</b>{o && <small>{you(o.by)}</small>}</span>}
            </span>
          </button>;
        })}
        {F && fx.end !== 'bomb' && <div key={fx.k} className={'cw-toast ' + F.cls}><b>{F.h}</b><span>{F.s}</span></div>}
      </div>
      {seeKey && !res && <p className="cw-keyhint">👑 จุดสีมุมการ์ด = แผนลับ (เห็นเฉพาะหัวหน้า): 🔴 แดง • 🔵 ฟ้า • ⚪ เปล่า • 💣 บึ้ม — อย่าให้ลูกทีมเห็นจอ!</p>}
    </div><div className="gside">

      {res && <>
        <Outcome art={res.winner && res.winner === myT ? 'win' : 'lose'} tone={res.winner && res.winner === myT ? 'good' : ''} title={res.winner ? `${TEAMS[res.winner].e} ${TEAMS[res.winner].n} ชนะ!` : 'ไม่มีผู้ชนะ'} party={!!res.winner}>
          {res.why === 'bomb' ? `${TEAMS[other(res.winner)].n}เปิดคำบึ้ม 💣` : res.why === 'gift' ? `${TEAMS[other(res.winner)].n}เผลอเปิดคำสุดท้ายให้` : res.why === 'players' ? 'อีกทีมคนไม่พอเล่นต่อ' : 'เปิดคำของทีมตัวเองครบก่อน'}<br />ทีมที่ชนะได้คนละ +{CLUE_SCORE.win} แต้ม</Outcome>
        <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
        {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
      </>}

      {!res && <>
        <ol className="cw-steps">{steps.map((s, i) => <li key={s} className={at > i ? 'done' : at === i ? 'now' : ''}>{at > i ? '✓' : i + 1} {s}</li>)}</ol>
        <div className={'cw-do t-' + (myTurn ? T : 'n')}>{doBox}</div>

        {iClue && <div className="cw-panel">
          <SecH icon="💬">คำใบ้ของคุณ</SecH>
          <input className="cw-input" value={w} maxLength={24} placeholder="พิมพ์ 1 คำ เช่น ทะเล" onChange={e => setW(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendClue(); }} />
          {prob && <small className="cw-warn">⚠️ {prob}</small>}
          <SecH icon="🔢">โยงไปกี่คำ?</SecH>
          <div className="cw-nums">{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => <button key={x} type="button" className={n === x ? 'on' : ''} onClick={() => { sfx(sound, 'select'); setN(x); }}>{x}</button>)}</div>
          <button className="primary wide" disabled={!w.trim() || !!prob} onClick={sendClue}>📣 ใบ้ “{w.trim() || '…'}” × {n}</button>
          <small className="hint">ลูกทีมจะเปิดได้สูงสุด {n + 1} ครั้ง (เกิน 1 ไว้เก็บคำที่ตกค้างจากตาก่อน)</small>
        </div>}

        {iGuess && <div className="cw-panel">
          <button className="secondary wide" disabled={r.guesses < 1} onClick={stop}>✋ พอแค่นี้ ส่งตาให้{TEAMS[other(T)].n}</button>
          {r.guesses < 1 && <small className="hint">ต้องเปิดอย่างน้อย 1 คำก่อนถึงจะพอได้</small>}
        </div>}

        <div className="cw-teams"><Roster t="r" /><Roster t="b" /></div>
        {r.shared && <p className="hint">👑 {you(chiefOf('r'))} เป็นหัวหน้ากลาง ใบ้ให้ทั้งสองทีม (ไม่ได้แต้ม)</p>}

        {isHost && <HostBar>
          <button className="secondary" onClick={() => { if (confirm(`ข้ามตา${TT.n}?`)) tx(c => forceClue(c, srvNow)); }}>⏭️ ข้ามตา{TT.n}</button>
          {r.order.filter(id => active(r, id) && !room.players?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickClue(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
        </HostBar>}
      </>}

      {r.clues.length > 0 && <><SecH icon="🗂️">คำใบ้ที่ผ่านมา</SecH>
        <div className="cw-hist">{['r', 'b'].map(t => <div key={t} className={'t-' + t}>{r.clues.filter(c => c.t === t).map((c, i) => <span key={i}>{TEAMS[t].e} {c.w} <em>×{c.n}</em> <small>ถูก {c.got || 0}</small></span>)}</div>)}</div></>}
      <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
      <ul className="head-log">{[...r.log].reverse().slice(0, 8).map((e, i) => <li key={i} className={e.bad ? 'cw-bad' : e.good ? 'win-line' : ''}>{nm(e.text)}</li>)}</ul>
    </div></div>
    {fx && fx.end === 'bomb' && <BombFx key={fx.k} F={fx} you={you} onClose={() => setFx(null)} />}
  </div>;
}

// ---------- ห้องรอ: เลือกทีม / หัวหน้า / ตั้งเวลา ----------
export function ClueLobby({ db, roomCode, room, players, isHost, av, sound }) {
  const S = room.settings?.clue || {}; const team = S.team || {}; const chief = S.chief || {}; const shared = !!S.shared;
  const base = `rooms/${roomCode}/settings/clue`; const ids = players.map(p => p.id);
  const set = obj => update(ref(db, base), obj);
  const setTeam = (id, t) => { sfx(sound, 'select'); const ch = { ...chief }; ['r', 'b'].forEach(x => { if (ch[x] === id && x !== t) ch[x] = null; }); set({ team: { ...team, [id]: t }, chief: ch, ...(S.mid === id ? { mid: null } : {}) }); };
  const setChief = (id, t) => { sfx(sound, 'select'); if (shared) set({ mid: id }); else set({ team: { ...team, [id]: t }, chief: { ...chief, [t]: id } }); };
  const shuffleTeams = () => { sfx(sound, 'click'); const p = planTeams(shuffle(ids), { shared, mid: shared ? S.mid : null }); const tm = {}; ids.forEach(id => { if (p.team[id] !== 'x') tm[id] = p.team[id]; }); set({ team: tm, chief: shared ? null : p.chief, mid: shared ? p.chief.r : null }); };
  const mid = shared && ids.includes(S.mid) ? S.mid : null;
  const col = t => players.filter(p => p.id !== mid && team[p.id] === t);
  const none = players.filter(p => p.id !== mid && team[p.id] !== 'r' && team[p.id] !== 'b');
  const chip = (p, t) => { const isC = shared ? p.id === mid : chief[t] === p.id && team[p.id] === t;
    return <div key={p.id} className={'cw-lchip' + (isC ? ' chief' : '')}><Avatar id={p.id} av={av} size={28} /><b>{p.name}</b>{isC && <em>👑 หัวหน้า</em>}
      {isHost && <span className="cw-lbtn">{t !== 'r' && <button type="button" title="ย้ายไปทีมแดง" onClick={() => setTeam(p.id, 'r')}>🔴</button>}{t !== 'b' && <button type="button" title="ย้ายไปทีมฟ้า" onClick={() => setTeam(p.id, 'b')}>🔵</button>}{!isC && (t === 'r' || t === 'b' || shared) && <button type="button" title={shared ? 'ตั้งเป็นหัวหน้ากลาง' : 'ตั้งเป็นหัวหน้าทีม'} onClick={() => setChief(p.id, t)}>👑</button>}</span>}</div>; };
  const warn = !shared ? ['r', 'b'].filter(t => col(t).length > 0 && col(t).length < 2).map(t => `${TEAMS[t].n}ต้องมีอย่างน้อย 2 คน (หัวหน้า + คนเดา)`) : [];
  return <div className="cw-lobby">
    <div className="score-rules"><b>💡 ใบ้คำเดียว ให้เพื่อนเปิดหลายใบ</b>
      <span>① กระดาน 25 คำ: ทีมที่เริ่มก่อนมี {N_FIRST} คำ อีกทีม {N_SECOND} คำ คำเปล่า {N_NEUTRAL} คำ และ 💣 คำบึ้ม 1 คำ</span>
      <span>② มีแต่ 👑 หัวหน้าที่เห็นว่าคำไหนเป็นของใคร — ใบ้ 1 คำ + ตัวเลข เช่น “ทะเล 2”</span>
      <span>③ ลูกทีมแตะเปิดคำ: ถูกเดาต่อได้ (สูงสุด ตัวเลข+1) • เปิดคำเปล่า/ของอีกทีม = หมดตา • เปิด 💣 = แพ้ทันที</span>
      <span>🏆 ทีมที่เปิดคำของตัวเองครบก่อนชนะ (ได้คนละ +{CLUE_SCORE.win} แต้ม)</span></div>
    <div className="cw-lteams">{['r', 'b'].map(t => <div key={t} className={'cw-lcol t-' + t}><h4>{TEAMS[t].e} {TEAMS[t].n} <small>{col(t).length} คน</small></h4>{col(t).map(p => chip(p, t))}{!col(t).length && <p className="hint">ยังไม่มีใคร</p>}</div>)}</div>
    {none.length > 0 && <div className="cw-lcol none"><h4>🎲 ยังไม่มีทีม <small>ระบบจัดให้ตอนเริ่ม</small></h4>{none.map(p => chip(p, null))}</div>}
    {mid && <div className="cw-lcol mid"><h4>👑 หัวหน้ากลาง <small>ใบ้ให้ทั้งสองทีม</small></h4>{chip(players.find(p => p.id === mid), 'x')}</div>}
    {warn.map(x => <div key={x} className="warn">⚠️ {x} — ถ้าไม่แก้ ระบบย้ายคนให้ตอนเริ่ม</div>)}
    {isHost && <div className="cw-lctl"><button className="secondary" onClick={shuffleTeams}>🎲 สุ่มทีม + หัวหน้า</button>
      <label className="cw-check"><input type="checkbox" checked={shared} onChange={e => { sfx(sound, 'click'); set({ shared: e.target.checked }); }} /> หัวหน้ากลางคนเดียวใบ้ให้ทั้งสองทีม <small>(เหมาะกับ 4–5 คน)</small></label></div>}
    {!isHost && <p className="hint">หัวหน้าห้องเป็นคนจัดทีม • ไม่ได้ตั้งหัวหน้า ระบบสุ่มให้</p>}
    <label>⏱️ เวลาต่อช่วง (คิดคำใบ้ / เดา) {isHost ? '(หัวหน้าห้องตั้ง)' : '(หัวหน้าห้องเป็นคนตั้ง)'}</label>
    <select value={S.sec ?? 0} disabled={!isHost} onChange={e => set({ sec: +e.target.value })}>{CLUE_SECS.map(s => <option key={s} value={s}>{s ? (s >= 60 ? `${s / 60} นาที`.replace('1.5 นาที', '1 นาที 30 วินาที') : s + ' วินาที') : 'ไม่จับเวลา'}</option>)}</select>
  </div>;
}
