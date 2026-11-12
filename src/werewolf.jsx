// เกม "แวร์วูฟ" — กลางคืนหมาป่าแอบกัดชาวบ้าน กลางวันทุกคนโหวตประหารคนที่สงสัย (ระบบเป็นผู้ดำเนินเกมให้)
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { Art } from './play-art.jsx';
import { Phase, Steps, PlayerGrid, WhoDone, RoleCard, Outcome, RevealGrid, Leaderboard, HostBar, SecH, Avatar, Voters } from './ui.jsx';
import { play as sfx } from './sfx.js';
import { WolfStage } from './stages.jsx';
import { Replay } from './replay.jsx';
import { shuffle, pickBad } from './rand.js';

export const WOLF_MIN = 5;
export const WOLF_SCORE = { village: 1, wolf: 2, fool: 3, love: 1 }; // แต้มต่อคนของฝ่ายที่ชนะ • love = โบนัสคู่รักที่รอดทั้งคู่
export const wolfCount = n => (n <= 6 ? 1 : n <= 9 ? 2 : 3);
// จำนวนบทบาทในวง (บทเสริมใช้ที่นั่งของชาวบ้านธรรมดา ถ้าไม่พอก็ไม่มี)
export function wolfPlan(n, o = {}) {
  const k = wolfCount(n); let left = n - k - 2;
  const hunter = !!o.hunter && n >= 6 && left >= 1; if (hunter) left--;
  const cupid = !!o.cupid && left >= 1; if (cupid) left--;
  const fool = !!o.fool && left >= 1; if (fool) left--;
  return { k, hunter, cupid, fool, villagers: Math.max(0, left) };
}
export const W_ROLES = {
  wolf: { icon: '🐺', name: 'มนุษย์หมาป่า', side: 'wolf', desc: 'กลางคืนตกลงกับเพื่อนหมาป่าเลือกกัดชาวบ้าน 1 คน กลางวันทำตัวเนียนเป็นชาวบ้าน' },
  seer: { icon: '🔮', name: 'หมอดู', side: 'village', desc: 'กลางคืนเลือกดู 1 คนว่าเป็นหมาป่าหรือไม่' },
  doctor: { icon: '💉', name: 'หมอยา', side: 'village', desc: 'กลางคืนเลือกปกป้อง 1 คน (ปกป้องตัวเองได้ แต่ห้ามคนเดิม 2 คืนติด)' },
  hunter: { icon: '🏹', name: 'นายพราน', side: 'village', desc: 'ถ้าคุณตาย ไม่ว่ากลางวันหรือกลางคืน ยิงพาใครไปด้วยได้ 1 คน' },
  cupid: { icon: '💘', name: 'กามเทพ', side: 'village', desc: 'คืนแรกยิงศรรักจับคู่ 2 คน (รวมตัวเองได้) — ถ้าคู่รักคนหนึ่งตาย อีกคนตรอมใจตายตาม' },
  fool: { icon: '🤪', name: 'คนบ้า', side: 'fool', desc: 'คุณอยู่ฝ่ายตัวเอง! ชนะทันทีถ้าถูกชาวบ้านโหวตประหารตอนกลางวัน — ทำตัวให้น่าสงสัยเข้าไว้ (ถูกหมาป่ากัดตาย = แพ้)' },
  villager: { icon: '👨‍🌾', name: 'ชาวบ้าน', side: 'village', desc: 'ไม่มีพลังพิเศษ ใช้สมองจับหมาป่าให้ได้ตอนกลางวัน' },
};
export const wSide = r => W_ROLES[r]?.side || 'village';

export function makeWolfRound(ids, opts = {}, number = 1) {
  const P = wolfPlan(ids.length, opts); const k = P.k; const wolves = pickBad(ids, k, opts.hist); const roles = {}; let i = k;
  const deck = [...wolves, ...shuffle(ids.filter(id => !wolves.includes(id)))];
  wolves.forEach(id => roles[id] = 'wolf');
  roles[deck[i++]] = 'seer'; roles[deck[i++]] = 'doctor';
  if (P.hunter) roles[deck[i++]] = 'hunter';
  if (P.cupid) roles[deck[i++]] = 'cupid';
  if (P.fool) roles[deck[i++]] = 'fool';
  deck.slice(i).forEach(id => roles[id] = 'villager');
  const alive = {}; ids.forEach(id => alive[id] = true);
  return { number, kind: 'wolf', roles, alive, reveal: opts.reveal !== false, phase: 'night', day: 1, order: shuffle(ids), startedAt: Date.now() };
}

// ---------- ตรรกะเกม (ทำงานบนข้อมูลห้องทั้งก้อนภายใน transaction) ----------
const here = (cur, id) => !!cur.players?.[id];
const living = cur => Object.keys(cur.round.alive || {}).filter(id => cur.round.alive[id] && here(cur, id));
const isAlive = (cur, id) => !!cur.round.alive?.[id] && here(cur, id);
const hasRole = (cur, role) => living(cur).filter(id => cur.round.roles[id] === role);
function log(rd, e) { rd.log = [...(rd.log || []), e]; }
function winner(cur) {
  const al = living(cur); const w = al.filter(id => wSide(cur.round.roles[id]) === 'wolf').length;
  if (w === 0) return 'village'; if (w >= al.length - w) return 'wolf'; return null;
}
function endGame(cur, win) {
  const rd = cur.round; const points = {}, sc = { ...(cur.scores || {}) };
  const L = rd.lovers || []; const loveBonus = L.length === 2 && L.every(id => isAlive(cur, id));
  Object.keys(cur.players || {}).forEach(id => { points[id] = (wSide(rd.roles?.[id]) === win ? WOLF_SCORE[win] : 0) + (loveBonus && L.includes(id) ? WOLF_SCORE.love : 0); sc[id] = (sc[id] || 0) + points[id]; });
  cur.status = 'result'; rd.phase = 'done'; cur.scores = sc; cur.result = { type: 'wolf', winner: win, points, loveBonus };
  return cur;
}
// คู่รัก: คนหนึ่งตาย อีกคนตรอมใจตายตาม → คืนรายชื่อคนตายทั้งหมด
function heartbreak(cur, dead) {
  const rd = cur.round; const L = rd.lovers; const all = [...dead]; if (!L || L.length !== 2) return all;
  dead.forEach(id => { const i = L.indexOf(id); if (i < 0) return; const p = L[1 - i]; if (rd.alive[p] && !all.includes(p)) { rd.alive[p] = false; all.push(p); log(rd, { t: 'love', day: rd.day, by: id, dead: [p] }); } });
  return all;
}
// หลังมีคนตาย: นายพรานได้ยิงก่อน แล้วค่อยเช็กผู้ชนะ แล้วไป phase ถัดไป
function afterDeaths(cur, dead, next) {
  const rd = cur.round; const hunter = dead.find(id => rd.roles[id] === 'hunter' && here(cur, id));
  if (hunter) { rd.phase = 'hunter'; rd.hunter = hunter; rd.hunterNext = next; return cur; }
  const w = winner(cur); if (w) return endGame(cur, w);
  return goTo(cur, next);
}
function goTo(cur, next) {
  const rd = cur.round; rd.hunter = null; rd.hunterNext = null;
  if (next === 'night') { rd.phase = 'night'; rd.day = (rd.day || 1) + 1; rd.night = null; }
  else { rd.phase = 'day'; rd.votes = null; }
  return cur;
}

export function nightAct(cur, me, kind, target) {
  const rd = cur.round; if (rd.phase !== 'night' || !isAlive(cur, me) || !isAlive(cur, target)) return;
  const role = rd.roles[me]; const n = { ...(rd.night || {}) };
  if (kind === 'wolf') { if (role !== 'wolf' || wSide(rd.roles[target]) === 'wolf') return; n.wolf = { ...(n.wolf || {}), [me]: target }; }
  else if (kind === 'seer') { if (role !== 'seer' || target === me || n.seer) return; n.seer = target; }
  else if (kind === 'doc') { if (role !== 'doctor' || target === rd.lastDoc || n.doc) return; n.doc = target; }
  else return;
  rd.night = n; return resolveNight(cur, false);
}
// กามเทพ: คืนแรก เลือกคู่รัก 2 คน (เลือกตัวเองได้) เลือกแล้วเปลี่ยนไม่ได้
export function cupidPick(cur, me, a, b) {
  const rd = cur.round; if (rd.phase !== 'night' || rd.day !== 1 || rd.lovers || rd.roles[me] !== 'cupid' || !isAlive(cur, me)) return;
  if (!a || !b || a === b || !isAlive(cur, a) || !isAlive(cur, b)) return;
  rd.lovers = [a, b]; log(rd, { t: 'cupid', day: 1, by: me, a, b });
  return resolveNight(cur, false);
}
// force = host สรุปคืนนี้โดยไม่รอ (หมาป่าเสียงไม่ตรงกัน → เอาเป้าที่ได้มากที่สุด เสมอ = ไม่มีใครถูกกัด)
export function resolveNight(cur, force) {
  const rd = cur.round; if (rd.phase !== 'night') return; const n = rd.night || {};
  const wolves = hasRole(cur, 'wolf'); const wv = n.wolf || {};
  const tgt = wolves.map(id => wv[id]); const agreed = tgt.length > 0 && tgt.every(t => t && t === tgt[0]) ? tgt[0] : null;
  const seerDone = !hasRole(cur, 'seer').length || !!n.seer; const docDone = !hasRole(cur, 'doctor').length || !!n.doc;
  const cupidDone = rd.day !== 1 || !hasRole(cur, 'cupid').length || !!rd.lovers;
  if (!force && !(agreed && seerDone && docDone && cupidDone)) return cur;
  let victim = agreed;
  if (!victim) { const c = {}; tgt.filter(Boolean).forEach(t => c[t] = (c[t] || 0) + 1); const max = Math.max(0, ...Object.values(c)); const top = Object.keys(c).filter(t => c[t] === max); victim = max > 0 && top.length === 1 ? top[0] : null; }
  if (victim && !isAlive(cur, victim)) victim = null;
  rd.shot = null;
  if (n.seer) { const s = hasRole(cur, 'seer')[0]; rd.seerLog = [...(rd.seerLog || []), { day: rd.day, by: s, target: n.seer, wolf: rd.roles[n.seer] === 'wolf' }]; }
  rd.lastDoc = n.doc || null;
  const saved = !!victim && n.doc === victim; const dead = victim && !saved ? [victim] : [];
  dead.forEach(id => rd.alive[id] = false);
  // บันทึกละเอียดไว้เล่นย้อนตอนจบเกม (ระหว่างเกมแสดงแค่คนตาย)
  log(rd, { t: 'night', day: rd.day, dead, bite: victim || null, doc: n.doc || null, seer: n.seer || null, seerWolf: n.seer ? rd.roles[n.seer] === 'wolf' : null, saved });
  const all = heartbreak(cur, dead); const love = all.filter(id => !dead.includes(id));
  rd.dawn = { day: rd.day, dead, saved, love: love.length ? love : null };
  return afterDeaths(cur, all, 'day');
}
export function dayVote(cur, me, target) {
  const rd = cur.round; if (rd.phase !== 'day' || !isAlive(cur, me)) return;
  if (target !== 'skip' && (!isAlive(cur, target) || target === me)) return;
  rd.votes = { ...(rd.votes || {}), [me]: target }; return resolveDay(cur, false);
}
// เสียงมากที่สุด (ไม่เสมอ) ถูกประหาร; ถ้า "ไม่ประหาร" ชนะ หรือเสมอ = ไม่มีใครตาย
export function resolveDay(cur, force) {
  const rd = cur.round; if (rd.phase !== 'day') return; const al = living(cur); const v = rd.votes || {};
  if (!force && !al.every(id => id in v)) return cur;
  const c = {}; al.forEach(id => { if (v[id]) c[v[id]] = (c[v[id]] || 0) + 1; });
  const max = Math.max(0, ...Object.values(c)); const top = Object.keys(c).filter(t => c[t] === max);
  const out = max > 0 && top.length === 1 && top[0] !== 'skip' && isAlive(cur, top[0]) ? top[0] : null;
  rd.lastVote = { day: rd.day, votes: v, out, counts: c }; rd.shot = null;
  const dead = out ? [out] : []; dead.forEach(id => rd.alive[id] = false);
  log(rd, { t: 'day', day: rd.day, dead, votes: v, out }); rd.dawn = null;
  const all = heartbreak(cur, dead); const love = all.filter(id => !dead.includes(id)); rd.lastVote.love = love.length ? love : null;
  if (out && rd.roles[out] === 'fool') { log(rd, { t: 'fool', day: rd.day, by: out }); return endGame(cur, 'fool'); } // คนบ้าถูกประหาร = ชนะทันที
  return afterDeaths(cur, all, 'night');
}
export function hunterShoot(cur, me, target) {
  const rd = cur.round; if (rd.phase !== 'hunter' || rd.hunter !== me || (target && !isAlive(cur, target))) return;
  if (target) { rd.alive[target] = false; log(rd, { t: 'shot', day: rd.day, by: me, dead: [target] }); }
  const love = target ? heartbreak(cur, [target]).slice(1) : [];
  rd.shot = { by: me, target: target || null, love: love.length ? love : null };
  const w = winner(cur); if (w) return endGame(cur, w);
  return goTo(cur, rd.hunterNext || 'day');
}

// ---------- หน้าจอ ----------
const W_ART = { wolf: 'wolf', seer: 'crystal', doctor: 'potion', hunter: 'bow', villager: 'villager', cupid: 'cupid', fool: 'fool' };
const SIDE_LABEL = { wolf: '🐺 ฝ่ายหมาป่า', village: '🏡 ฝ่ายชาวบ้าน', fool: '🤪 ฝ่ายตัวเอง' };
const WIN_TXT = { village: 'ชาวบ้านชนะ! หมาป่าหมดหมู่บ้าน 🏡', wolf: 'หมาป่าชนะ! ยึดหมู่บ้านได้แล้ว 🐺', fool: 'คนบ้าชนะ! หลอกให้ทุกคนประหารสำเร็จ 🤪' };
const tk = id => `{${id}}`;
// ฉากเล่นย้อนเหตุการณ์ทั้งเกม (สร้างจากบันทึกหมู่บ้าน)
export function wolfScenes(r, res) {
  const roles = r.roles || {}; const rn = id => W_ROLES[roles[id]] ? `${W_ROLES[roles[id]].icon} ${W_ROLES[roles[id]].name}` : '';
  const ofRole = k => Object.keys(roles).filter(id => roles[id] === k);
  const S = [{ kicker: '🎭 เริ่มเกม', title: 'บทบาทที่ระบบแจก', tone: 'night', lines: [
    { ico: '🐺', text: `หมาป่า: ${ofRole('wolf').map(tk).join(' ')}`, cls: 'bad' },
    ...['seer', 'doctor', 'hunter', 'cupid', 'fool'].flatMap(k => ofRole(k).map(id => ({ ico: W_ROLES[k].icon, text: `${W_ROLES[k].name}: ${tk(id)}`, cls: k === 'fool' ? 'warn' : '' }))),
  ] }];
  let sc = null; const open = (kind, kicker, title) => { sc = { kind, kicker, title, tone: kind === 'night' ? 'night' : 'day', lines: [] }; S.push(sc); };
  (r.log || []).forEach(e => {
    if (e.t === 'cupid') { open('night', '🌙 คืนที่ 1', 'กามเทพแผลงศร'); sc.lines.push({ ico: '💘', text: `กามเทพ ${tk(e.by)} จับคู่ ${tk(e.a)} กับ ${tk(e.b)} เป็นคู่รัก`, cls: 'love' }); return; }
    if (e.t === 'night') {
      if (!(sc && sc.kind === 'night' && e.day === 1 && S.length === 2)) open('night', `🌙 คืนที่ ${e.day}`, null);
      const dead = e.dead || [];
      sc.title = dead.length ? `${dead.map(tk).join(' ')} ถูกกัด` : e.saved ? 'หมอยาช่วยไว้ทัน!' : 'คืนที่เงียบสงบ';
      if (e.bite !== undefined) sc.lines.push(e.bite ? { ico: '🐺', text: `หมาป่าย่องไปหา ${tk(e.bite)}`, cls: 'bad' } : { ico: '🐺', text: 'หมาป่าตกลงกันไม่ได้ คืนนี้ไม่ได้กัดใคร', cls: 'dim' });
      if (e.doc) sc.lines.push({ ico: '💉', text: `หมอยาเฝ้าบ้าน ${tk(e.doc)}`, cls: e.doc === e.bite ? 'good' : '' });
      if (e.seer) sc.lines.push({ ico: '🔮', text: `หมอดูส่อง ${tk(e.seer)} → ${e.seerWolf ? 'เจอหมาป่า!' : 'ไม่ใช่หมาป่า'}`, cls: e.seerWolf ? 'good' : '' });
      if (e.saved) sc.lines.push({ ico: '🙏', text: `${tk(e.bite)} รอดตาย เพราะหมอยาเฝ้าไว้พอดี`, cls: 'good' });
      dead.forEach(id => sc.lines.push({ ico: '💀', text: `${tk(id)} ถูกกัดตาย — เป็น ${rn(id)}`, cls: 'bad' }));
      return;
    }
    if (e.t === 'day') {
      open('day', `☀️ วันที่ ${e.day}`, e.out ? `โหวตประหาร ${tk(e.out)}` : 'ไม่มีใครถูกประหาร');
      const c = {}; Object.values(e.votes || {}).forEach(t => c[t] = (c[t] || 0) + 1);
      const tally = Object.keys(c).sort((a, b) => c[b] - c[a]).map(t => `${t === 'skip' ? 'ไม่ประหาร' : tk(t)} ×${c[t]}`).join(' · ');
      if (tally) sc.lines.push({ ico: '🗳️', text: `ผลโหวต: ${tally}` });
      sc.lines.push(e.out ? { ico: '🔨', text: `${tk(e.out)} ถูกประหาร — เป็น ${rn(e.out)}`, cls: roles[e.out] === 'wolf' ? 'good' : roles[e.out] === 'fool' ? 'warn' : 'bad' } : { ico: '🤷', text: 'เสียงไม่ขาด ไม่มีใครถูกประหาร', cls: 'dim' });
      return;
    }
    if (!sc) open('day', '☀️', null);
    if (e.t === 'love') (e.dead || []).forEach(p => sc.lines.push({ ico: '💔', text: `${tk(p)} ตรอมใจตายตาม ${tk(e.by)} — เป็น ${rn(p)}`, cls: 'love' }));
    if (e.t === 'shot') { sc.hunter = true; (e.dead || []).forEach(p => sc.lines.push({ ico: '🏹', text: `นายพราน ${tk(e.by)} ยิงสวน ${tk(p)} — เป็น ${rn(p)}`, cls: roles[p] === 'wolf' ? 'good' : 'bad' })); }
    if (e.t === 'fool') { sc.fool = true; sc.lines.push({ ico: '🤪', text: `${tk(e.by)} คือคนบ้า! หลอกให้ทุกคนประหารตัวเองได้สำเร็จ`, cls: 'warn' }); }
  });
  if (res) {
    const L = r.lovers || [];
    S.push({ kind: 'end', kicker: '🏁 จบเกม', title: WIN_TXT[res.winner], tone: res.winner === 'village' ? 'good' : 'bad', lines: [
      { ico: '🐺', text: `หมาป่าคือ ${ofRole('wolf').map(tk).join(' ')}`, cls: 'bad' },
      ...(L.length === 2 ? [{ ico: res.loveBonus ? '💞' : '💔', text: res.loveBonus ? `คู่รัก ${tk(L[0])} กับ ${tk(L[1])} รอดทั้งคู่ ได้โบนัส +${WOLF_SCORE.love}` : `คู่รัก ${tk(L[0])} กับ ${tk(L[1])} ไปด้วยกันไม่ถึงฝั่ง`, cls: 'love' }] : []),
    ] });
  }
  return S.map(s => ({ ...s, stage: <WolfStage mode={s.kind === 'end' ? (res.winner === 'wolf' ? 'wolfWin' : res.winner === 'fool' ? 'foolWin' : 'villageWin') : s.fool ? 'foolWin' : s.hunter ? 'hunter' : s.kind === 'day' ? 'day' : 'night'} dead={s.kind === 'day' ? s.lines.filter(l => l.ico === '🔨' || l.ico === '💔' || l.ico === '🏹').length : 0} /> }));
}
export function WolfGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, onBack }) {
  const r = room.round; const res = room.status === 'result' && room.result;
  const [showRole, setShowRole] = useState(false);
  const [pair, setPair] = useState([]);
  const myRole = r.roles?.[myId]; const info = W_ROLES[myRole] || W_ROLES.villager;
  const alive = r.alive || {}; const meAlive = !!alive[myId];
  const order = (r.order || []).filter(id => room.players?.[id]);
  const liveIds = order.filter(id => alive[id]);
  const n = r.night || {}; const votes = r.votes || {};
  const wolves = Object.keys(r.roles || {}).filter(id => r.roles[id] === 'wolf');
  const seeAll = !meAlive || res; // คนตายดูเกมได้ทั้งหมด (ห้ามบอกคนที่ยังเล่น!)
  const showRoleOf = id => seeAll || (r.reveal && !alive[id]) || id === myId || (myRole === 'wolf' && r.roles[id] === 'wolf');
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), cur => { if (!cur || cur.status !== 'playing' || cur.round?.kind !== 'wolf') return; return f(cur); });
  const act = (kind, t) => { sfx(sound, 'click'); return tx(cur => nightAct(cur, myId, kind, t)); };
  const lovers = r.lovers || []; const myLove = lovers.includes(myId) ? lovers.find(id => id !== myId) : null;
  const pickLove = id => { sfx(sound, 'click'); setPair(p => p.includes(id) ? p.filter(x => x !== id) : p.length >= 2 ? [p[1], id] : [...p, id]); };
  const sendLove = () => { if (pair.length !== 2) return; sfx(sound, 'confirm'); tx(cur => cupidPick(cur, myId, pair[0], pair[1])); };
  const vote = t => { sfx(sound, 'vote'); return tx(cur => dayVote(cur, myId, t)); };
  // เสียงตามเหตุการณ์ในหมู่บ้าน (ทุกเครื่องได้ยินพร้อมกัน) — เทียบกับสถานะก่อนหน้า
  const prev = useRef(null);
  useEffect(() => {
    const s = { key: `${r.day}-${r.phase}`, phase: r.phase, shot: r.shot?.target || '', res: !!res };
    const p = prev.current; prev.current = s;
    if (!p) { if (r.phase === 'night' && r.day === 1 && !res && Date.now() - (r.startedAt || 0) < 8000) { sfx(sound, 'howl'); setTimeout(() => sfx(sound, 'night'), 1800); } return; }
    const seq = list => { let t = 0; list.forEach(([n, d]) => { setTimeout(() => sfx(sound, n), t); t += d; }); return t; };
    let t = 0;
    if (s.shot && s.shot !== p.shot) t = seq([['shot', 1200]]);
    if (s.res && !p.res) {
      if (p.phase === 'night') t = seq([['morning', 700], [r.dawn?.dead?.length ? 'death' : 'safe', 1200]]);
      else if (p.phase === 'day') t = seq([[r.lastVote?.out ? 'execute' : 'safe', 1300]]);
      setTimeout(() => sfx(sound, room.result?.winner === info.side ? 'win' : 'lose'), t); return;
    }
    if (s.key === p.key) return;
    if (r.phase === 'day' && p.phase === 'night') seq([['morning', 800], [r.dawn?.dead?.length ? 'death' : 'safe', 0]]);
    else if (r.phase === 'hunter') seq([[p.phase === 'night' ? 'morning' : r.lastVote?.out ? 'execute' : 'safe', p.phase === 'night' ? 800 : 1300], ...(p.phase === 'night' ? [['death', 1200]] : []), ['reveal', 0]]);
    else if (r.phase === 'night') setTimeout(() => seq([[p.phase === 'day' ? (r.lastVote?.out ? 'execute' : 'safe') : null, p.phase === 'day' ? 1500 : 0], ['howl', 1800], ['night', 0]].filter(x => x[0])), t);
  });
  const roleTxt = id => `${W_ROLES[r.roles[id]]?.icon} ${W_ROLES[r.roles[id]]?.name}`;
  const deadNames = ids => (ids || []).map(id => `${nameOf(id)}${r.reveal ? ` (${roleTxt(id)})` : ''}`).join(', ');
  const loveTxt = ids => ids?.length ? ` • 💔 ${deadNames(ids)} ตรอมใจตายตามคู่รัก` : '';
  const stack = list => list.length ? <Voters ids={list} av={av} size={20} /> : null;

  return <div className="explore-game wolf-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number} • วันที่ {r.day}</span><span className="cat-tag">{r.phase === 'night' ? '🌙 กลางคืน' : r.phase === 'hunter' ? '🏹 นายพราน' : res ? '🏁 จบเกม' : '☀️ กลางวัน'}</span></div>
    <div className="gcols flow"><div className="gmain">
    {!res && <Steps items={['🌙 กลางคืน', '☀️ ประกาศ', '⚖️ โหวตประหาร']} at={r.phase === 'night' ? 0 : r.phase === 'hunter' ? 1 : 2} />}
    <WolfStage mode={res ? (res.winner === 'wolf' ? 'wolfWin' : res.winner === 'fool' ? 'foolWin' : 'villageWin') : r.phase === 'night' ? 'night' : r.phase === 'hunter' ? 'hunter' : 'day'} dead={(r.dawn?.dead?.length || 0) + (r.dawn?.love?.length || 0)} />

    {/* คู่รัก: เห็นแค่ตัวเอง */}
    {!res && myLove && meAlive && <div className="tip love-tip"><span className="lt-heart">💞</span><span>กามเทพยิงศรใส่คุณ! คู่รักของคุณคือ <Avatar id={myLove} av={av} size={22} /> <b>{nameOf(myLove)}</b> — ถ้าเขาตาย คุณตายตาม • รอดทั้งคู่จนจบเกม ได้ +{WOLF_SCORE.love}</span></div>}

    {/* เมื่อวานใครถูกประหาร (แสดงตอนกลางคืน) */}
    {!res && r.phase === 'night' && r.lastVote && r.lastVote.day === r.day - 1 && <div className={'event ' + (r.lastVote.out ? 'fail' : 'ok')}><Art name={r.lastVote.out ? 'gavel' : 'shield'} size={46} /><span><b>เมื่อวาน: {r.lastVote.out ? `${deadNames([r.lastVote.out])} ถูกประหาร` : 'ไม่มีใครถูกประหาร'}</b>{loveTxt(r.lastVote.love)}{r.shot?.target && !r.dawn ? ` • นายพรานยิง ${deadNames([r.shot.target])}${loveTxt(r.shot.love)}` : ''}
      <span className="ev-votes">{Object.entries(r.lastVote.votes || {}).map(([a, b]) => <span key={a}><Avatar id={a} av={av} size={20} />→{b === 'skip' ? '🤷' : <Avatar id={b} av={av} size={20} />}</span>)}</span></span></div>}

    {/* ---------- กลางคืน ---------- */}
    {!res && r.phase === 'night' && <>
      {!meAlive ? <Phase art="tombstone" tone="night" kicker={`🌙 คืนที่ ${r.day}`} title="คุณตายแล้ว 👻">ดูเกมต่อได้และเห็นบทบาททุกคน แต่<b>ห้ามพูดหรือใบ้</b>คนที่ยังเล่นอยู่</Phase>
        : myRole === 'wolf' ? <Phase art="wolf" tone="me" kicker={`🌙 คืนที่ ${r.day} — หมาป่าออกล่า`} title="เลือกเหยื่อคืนนี้">หมาป่าทุกตัวต้องเลือก<b>คนเดียวกัน</b> (เปลี่ยนใจได้){wolves.length > 1 && <> • คุยกับเพื่อนหมาป่าได้ในห้องเสียง</>}</Phase>
        : myRole === 'seer' ? <Phase art="crystal" tone={n.seer ? 'good' : 'me'} kicker={`🌙 คืนที่ ${r.day} — หมอดู`} title={n.seer ? `คืนนี้ส่อง ${nameOf(n.seer)} แล้ว` : 'ส่องลูกแก้วดู 1 คน'}>{n.seer ? 'ผลจะขึ้นในการ์ดบทบาทตอนเช้า' : 'เลือกแล้วเปลี่ยนไม่ได้ • รู้ว่าเขาเป็นหมาป่าหรือไม่'}</Phase>
        : myRole === 'doctor' ? <Phase art="potion" tone={n.doc ? 'good' : 'me'} kicker={`🌙 คืนที่ ${r.day} — หมอยา`} title={n.doc ? `คืนนี้ปกป้อง ${nameOf(n.doc)}` : 'เลือกปกป้อง 1 คน'}>{n.doc ? 'ถ้าหมาป่ากัดคนนี้ เขาจะรอด' : <>ปกป้องตัวเองได้{r.lastDoc ? <> • คืนก่อนปกป้อง <b>{nameOf(r.lastDoc)}</b> คืนนี้ห้ามซ้ำ</> : ''}</>}</Phase>
        : myRole === 'cupid' && r.day === 1 ? <Phase art="cupid" tone={lovers.length ? 'good' : 'me'} kicker="🌙 คืนแรก — กามเทพ" title={lovers.length ? `จับคู่ ${nameOf(lovers[0])} 💘 ${nameOf(lovers[1])} แล้ว` : 'ยิงศรรักให้ 2 คน'}>{lovers.length ? 'คู่รักรู้ตัวแล้ว • ถ้าคนหนึ่งตาย อีกคนตรอมใจตายตาม' : <>เลือก 2 คน (รวมตัวเองได้) • เลือกแล้วเปลี่ยนไม่ได้ • คู่รักจะรู้ว่าคู่ของตัวเองคือใคร</>}</Phase>
        : <Phase art="night" tone="night" kicker={`🌙 คืนที่ ${r.day}`} title="หลับตาฝันดี… 😴">คุณไม่มีอะไรต้องทำคืนนี้ ทำหน้าเฉย ๆ ไว้ อย่าให้ใครรู้ว่าคุณว่าง</Phase>}
      {meAlive && myRole === 'wolf' && <PlayerGrid ids={liveIds.filter(id => r.roles[id] !== 'wolf')} av={av} nameOf={nameOf} myId={myId} selected={n.wolf?.[myId]} onPick={t => act('wolf', t)} badge={id => stack(wolves.filter(x => n.wolf?.[x] === id)) || <span className="ptile-note">กัดคนนี้</span>} />}
      {meAlive && myRole === 'seer' && !n.seer && <PlayerGrid ids={liveIds.filter(id => id !== myId)} av={av} nameOf={nameOf} onPick={t => act('seer', t)} badge={() => <span className="tag">🔮 ส่อง</span>} />}
      {meAlive && myRole === 'cupid' && r.day === 1 && !lovers.length && <div className="action-box">
        <PlayerGrid ids={liveIds} av={av} nameOf={nameOf} myId={myId} selected={pair} onPick={pickLove} badge={id => pair.includes(id) ? <span className="tag love">💘 คู่ที่ {pair.indexOf(id) + 1}</span> : <span className="ptile-note">แตะเพื่อเลือก</span>} />
        <button className="primary wide" disabled={pair.length !== 2} onClick={sendLove}>💘 {pair.length === 2 ? `ยิงศร: ${nameOf(pair[0])} ❤ ${nameOf(pair[1])}` : `เลือกอีก ${2 - pair.length} คน`}</button></div>}
      {meAlive && myRole === 'doctor' && !n.doc &&<PlayerGrid ids={liveIds} av={av} nameOf={nameOf} myId={myId} onPick={t => act('doc', t)} off={id => id === r.lastDoc} badge={id => id === r.lastDoc ? <span className="ptile-note">คืนก่อนแล้ว</span> : <span className="tag good">💉 ปกป้อง</span>} />}
      {seeAll && <div className="tip"><Art name="crystal" size={42} /><span>👻 มุมคนตาย — หมาป่าเล็ง: <b>{Object.entries(n.wolf || {}).map(([w, t]) => `${nameOf(w)}→${nameOf(t)}`).join(', ') || '-'}</b> • หมอดู: <b>{n.seer ? nameOf(n.seer) : '-'}</b> • หมอยา: <b>{n.doc ? nameOf(n.doc) : '-'}</b>{lovers.length === 2 && <> • คู่รัก: <b>{nameOf(lovers[0])} 💘 {nameOf(lovers[1])}</b></>}</span></div>}
      {isHost && <HostBar><button className="secondary" onClick={() => { if (confirm('จบคืนนี้เลยโดยไม่รอ? (คนที่หลุดหรือยังไม่เลือกจะถูกข้าม)')) tx(cur => resolveNight(cur, true)); }}>จบคืนนี้เลย (ไม่รอ)</button></HostBar>}
    </>}

    {/* ---------- นายพราน ---------- */}
    {!res && r.phase === 'hunter' && <>
      <Phase art="bow" tone={r.hunter === myId ? 'me' : 'bad'} kicker="🏹 ก่อนตาย…" title={r.hunter === myId ? 'คุณคือนายพราน! ยิงใครดี?' : `${nameOf(r.hunter)} คือนายพราน!`}>นายพรานยิงพาใครไปด้วยได้ 1 คน (หรือไม่ยิงก็ได้)</Phase>
      {r.hunter === myId ? <><PlayerGrid ids={liveIds} av={av} nameOf={nameOf} myId={myId} onPick={t => { if (confirm(`ยิง ${nameOf(t)}?`)) tx(cur => hunterShoot(cur, myId, t)); }} badge={() => <span className="tag bad">🏹 ยิง</span>} />
        <button className="secondary wide" onClick={() => tx(cur => hunterShoot(cur, myId, null))}>ไม่ยิงใคร</button></>
        : <div className="waiting">⏳ รอนายพรานเล็งเป้า…</div>}
      {isHost && r.hunter !== myId && <HostBar><button className="secondary" onClick={() => { if (confirm('ข้ามนายพราน (ไม่ยิงใคร)?')) tx(cur => hunterShoot(cur, cur.round.hunter, null)); }}>ข้ามนายพราน</button></HostBar>}
    </>}

    {/* ---------- กลางวัน ---------- */}
    {!res && r.phase === 'day' && <>
      <Phase art={r.dawn?.dead?.length ? 'tombstone' : 'shield'} tone={r.dawn?.dead?.length ? 'bad' : 'day'} kicker={`☀️ เช้าวันที่ ${r.day}`} title={r.dawn ? (r.dawn.dead?.length ? `${r.dawn.dead.map(nameOf).join(', ')} ถูกหมาป่ากัดตาย 🩸` : 'เมื่อคืนไม่มีใครตาย 🙏') : 'กลางวัน'}>
        {r.dawn?.dead?.length && r.reveal ? <>บทบาท: <b>{r.dawn.dead.map(roleTxt).join(', ')}</b> • </> : ''}{r.dawn?.love?.length ? <>💔 <b>{deadNames(r.dawn.love)}</b> ตรอมใจตายตามคู่รัก • </> : ''}{r.shot?.target && r.dawn ? <>นายพรานยิง <b>{deadNames([r.shot.target])}</b>{loveTxt(r.shot.love)} • </> : ''}คุยกันให้พอ แล้วโหวตประหารคนที่สงสัย</Phase>
      <SecH icon="⚖️">โหวตประหาร <small>{meAlive ? (votes[myId] ? `คุณโหวต ${votes[myId] === 'skip' ? 'ไม่ประหาร' : nameOf(votes[myId])}` : 'แตะรูป • เปลี่ยนใจได้') : 'คนตายโหวตไม่ได้'}</small></SecH>
      <PlayerGrid ids={liveIds.filter(id => id !== myId)} av={av} nameOf={nameOf} selected={votes[myId]} onPick={meAlive ? vote : undefined}
        badge={id => stack(Object.keys(votes).filter(v => votes[v] === id)) || <span className="ptile-note">ยังไม่มีเสียง</span>} />
      {meAlive && <button className={'skip-vote' + (votes[myId] === 'skip' ? ' sel' : '')} onClick={() => vote('skip')}><span>🤷 ไม่ประหารใครวันนี้{votes[myId] === 'skip' ? ' ✓' : ''}</span>{stack(Object.keys(votes).filter(v => votes[v] === 'skip'))}</button>}
      <WhoDone ids={liveIds} done={id => id in votes} av={av} nameOf={nameOf} label="🗳️ โหวตแล้ว" />
      <p className="hint">เสียงมากที่สุดถูกประหาร • เสมอ หรือ “ไม่ประหาร” ชนะ = ไม่มีใครตาย • สรุปเมื่อคนที่ยังมีชีวิตโหวตครบ</p>
      {isHost && <HostBar><button className="secondary" onClick={() => { if (confirm('สรุปโหวตเลย? คนที่ยังไม่โหวตไม่นับ')) tx(cur => resolveDay(cur, true)); }}>สรุปโหวตเลย (ไม่รอ)</button></HostBar>}
    </>}

    {/* ---------- จบเกม ---------- */}
    {res && <>
      <Outcome art={res.winner === 'village' ? 'villager' : res.winner === 'fool' ? 'fool' : 'wolf'} tone={res.winner === 'village' ? 'good' : 'bad'} title={WIN_TXT[res.winner] || WIN_TXT.wolf}>
        หมาป่าคือ <Voters ids={wolves} av={av} size={24} /> <b>{wolves.map(nameOf).join(', ')}</b> • เล่นไป {r.day} วัน{lovers.length === 2 && <><br />💞 คู่รัก: <b>{nameOf(lovers[0])} ❤ {nameOf(lovers[1])}</b>{res.loveBonus ? ` — รอดทั้งคู่ +${WOLF_SCORE.love}` : ''}</>}</Outcome>
      <Replay scenes={wolfScenes(r, res)} av={av} nameOf={nameOf} />
      <SecH icon="🎭">บทบาทของแต่ละคน</SecH>
      <RevealGrid av={av} nameOf={nameOf} items={players.map(p => { const k = r.roles?.[p.id]; const ri = W_ROLES[k] || W_ROLES.villager; return { id: p.id, art: W_ART[k] || 'villager', label: ri.name, bad: ri.side === 'wolf', dead: !alive[p.id], extra: (alive[p.id] ? 'รอดชีวิต' : '💀 ตาย') + (lovers.includes(p.id) ? ' • 💞' : '') }; })} />
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH>
      <Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}

    </div><div className="gside">
    {/* ---------- บทบาท ---------- */}
    {!res && <RoleCard show={showRole} onToggle={() => setShowRole(!showRole)} art={W_ART[myRole] || 'villager'} cover="moon" name={info.name} side={info.side === 'wolf' ? 'bad' : info.side === 'fool' ? 'warn' : 'good'} sideLabel={SIDE_LABEL[info.side]}>
      <p>{info.desc}</p>
      {myLove && <div className="info-line">💞 คู่รักของคุณ: <Avatar id={myLove} av={av} size={22} /> <b>{nameOf(myLove)}</b> (ไม่รู้บทบาทของกันและกัน)</div>}
      {myRole === 'cupid' && lovers.length === 2 && <div className="info-line">💘 คู่ที่คุณจับ: <b>{nameOf(lovers[0])} ❤ {nameOf(lovers[1])}</b></div>}
      {myRole === 'wolf' && <div className="info-line">เพื่อนหมาป่า: {wolves.filter(id => id !== myId).length ? <><Voters ids={wolves.filter(id => id !== myId)} av={av} /> <b>{wolves.filter(id => id !== myId).map(nameOf).join(', ')}</b></> : '— ไม่มี —'}</div>}
      {myRole === 'seer' && (r.seerLog || []).length > 0 && <div className="seer-log">{r.seerLog.map((s, i) => <span key={i} className={s.wolf ? 'bad' : 'good'}>คืนที่ {s.day}: <Avatar id={s.target} av={av} size={22} /> <b>{nameOf(s.target)}</b> {s.wolf ? '🐺 เป็นหมาป่า!' : '🙂 ไม่ใช่หมาป่า'}</span>)}</div>}
    </RoleCard>}

    {!res && <><SecH icon="🏘️">ชาวบ้าน <small>ยังอยู่ {liveIds.length} • ตาย {order.length - liveIds.length}</small></SecH>
      <PlayerGrid ids={order} av={av} nameOf={nameOf} myId={myId} small dead={id => !alive[id]} note={id => showRoleOf(id) ? roleTxt(id) : alive[id] ? 'ยังมีชีวิต' : 'ตายแล้ว'} /></>}

    {!res && (r.log || []).some(e => e.t !== 'cupid') && <><SecH icon="📜">บันทึกหมู่บ้าน</SecH><ul className="head-log">{r.log.filter(e => e.t !== 'cupid').reverse().map((e, i) => <li key={i}>
      {e.t === 'night' && <>🌙 คืนที่ {e.day}: {e.dead?.length ? <span className="bad">{deadNames(e.dead)} ถูกกัด</span> : 'ไม่มีใครตาย'}</>}
      {e.t === 'day' && <>☀️ วันที่ {e.day}: {e.dead?.length ? <span className="bad">{deadNames(e.dead)} ถูกประหาร</span> : 'ไม่มีใครถูกประหาร'}</>}
      {e.t === 'shot' && <>🏹 นายพราน {nameOf(e.by)} ยิง <span className="bad">{deadNames(e.dead)}</span></>}
      {e.t === 'love' && <>💔 <span className="bad">{deadNames(e.dead)}</span> ตรอมใจตายตาม {nameOf(e.by)}</>}
    </li>)}</ul></>}
    </div></div>
  </div>;
}
