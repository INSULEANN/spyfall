// เกม "เค้กหายไปไหน" — รูมเมททอยเต๋าเพื่อตื่นกลางดึก (ตี 1–6) ดูว่าเค้กในตู้เย็นยังอยู่ไหม แล้วกลางวันโหวตหาตัวจอมแอบกิน
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw, Eye, EyeOff } from 'lucide-react';
import { play as sfx } from './sfx.js';

export const CAKE_MIN = 4;
export const HOURS = 6;
export const CAKE_SCORE = { hungry: 1, thief: 2, acc: 1 };
export const accCount = n => Math.max(0, Math.floor((n - 2) / 3)); // 4:0 5–7:1 8–10:2 11–12:3
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
export const DIE = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// t0 = เวลาเซิร์ฟเวอร์ตอนเริ่ม (ทุกเครื่องใช้นาฬิกาเดียวกัน)
export function makeCakeRound(ids, opts = {}, number = 1, t0 = Date.now()) {
  const dice = {}; ids.forEach(id => dice[id] = 1 + Math.floor(Math.random() * 6));
  const hourMs = (opts.hourSec || 20) * 1000; const nightStart = t0 + 8000;
  return { number, kind: 'cake', dice, thief: pick(ids), accN: accCount(ids.length), hourMs, nightStart, nightEnd: nightStart + HOURS * hourMs, phase: 'night', order: shuffle(ids), startedAt: t0 };
}
// 0 = ก่อนเริ่มคืน, 1–6 = ตี 1–6, 7 = หมดคืนแล้ว
export const hourAt = (r, t) => (t < r.nightStart ? 0 : Math.min(HOURS + 1, Math.floor((t - r.nightStart) / r.hourMs) + 1));
export const awakeAt = (r, h, players) => Object.keys(r.dice || {}).filter(id => r.dice[id] === h && (!players || players[id]));
export const accList = r => Object.keys(r.acc || {});
export const sideOf = (r, id) => (id === r.thief ? 'thief' : r.acc?.[id] ? 'acc' : 'hungry');

// ---------- ตรรกะเกม (ทำงานบนข้อมูลห้องทั้งก้อนภายใน transaction) ----------
const here = (cur, id) => !!cur.players?.[id];
export function chooseAcc(cur, me, ids, t) {
  const rd = cur.round; if (rd.phase !== 'night' || me !== rd.thief || rd.accDone) return;
  if (hourAt(rd, t) !== rd.dice[me]) return;
  const list = [...new Set(ids)].filter(id => id !== me && here(cur, id)).slice(0, rd.accN);
  const acc = {}; list.forEach(id => acc[id] = true); rd.acc = list.length ? acc : null; rd.accDone = true;
  return cur;
}
export function peekDie(cur, me, target, t) {
  const rd = cur.round; if (rd.phase !== 'night' || rd.peeks?.[me] || target === me || !here(cur, target)) return;
  const h = rd.dice[me]; if (hourAt(rd, t) !== h || awakeAt(rd, h, cur.players).length !== 1) return; // ตื่นคนเดียวเท่านั้น
  rd.peeks = { ...(rd.peeks || {}), [me]: { t: target, die: rd.dice[target] } };
  return cur;
}
export function endNight(cur, t) {
  const rd = cur.round; if (rd.phase !== 'night' || t < rd.nightEnd) return;
  if (!rd.accDone && rd.accN > 0) { // ขโมยไม่ได้เลือก → ระบบสุ่มลูกสมุนให้
    const acc = {}; shuffle(Object.keys(cur.players || {}).filter(id => id !== rd.thief)).slice(0, rd.accN).forEach(id => acc[id] = true);
    rd.acc = Object.keys(acc).length ? acc : null; rd.accAuto = true;
  }
  rd.accDone = true; rd.phase = 'day'; rd.votes = null;
  return cur;
}
export function castVote(cur, me, target) {
  const rd = cur.round; if (rd.phase !== 'day' || !here(cur, me) || target === me || !here(cur, target)) return;
  rd.votes = { ...(rd.votes || {}), [me]: target }; return resolveVote(cur, false);
}
// เสียงมากที่สุดและไม่เสมอ = จับตัว; ถ้าจับถูกขโมย ฝ่ายหิวโหยชนะ นอกนั้น (ผิดคน/เสมอ) ฝ่ายขโมยชนะ
export function resolveVote(cur, force) {
  const rd = cur.round; if (rd.phase !== 'day') return; const ids = Object.keys(cur.players || {}); const v = rd.votes || {};
  if (!force && !ids.every(id => id in v)) return cur;
  const c = {}; ids.forEach(id => { if (v[id]) c[v[id]] = (c[v[id]] || 0) + 1; });
  const max = Math.max(0, ...Object.values(c)); const top = Object.keys(c).filter(k => c[k] === max);
  const caught = max > 0 && top.length === 1 ? top[0] : null; const win = caught === rd.thief ? 'hungry' : 'thief';
  const points = {}, sc = { ...(cur.scores || {}) };
  ids.forEach(id => { const s = sideOf(rd, id); points[id] = win === 'hungry' ? (s === 'hungry' ? CAKE_SCORE.hungry : 0) : (s === 'thief' ? CAKE_SCORE.thief : s === 'acc' ? CAKE_SCORE.acc : 0); sc[id] = (sc[id] || 0) + points[id]; });
  rd.phase = 'done'; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'cake', winner: win, caught, counts: c, ballots: v, points };
  return cur;
}

// ---------- หน้าจอ ----------
export function CakeGame({ db, room, roomCode, myId, players, isHost, scores, sound, nameOf, msg, onBack, srvNow }) {
  const r = room.round; const res = room.status === 'result' && room.result;
  const [showRole, setShowRole] = useState(false);
  const [accSel, setAccSel] = useState([]);
  const h = r.phase === 'night' ? hourAt(r, srvNow) : HOURS + 1;
  const myDie = r.dice?.[myId]; const iThief = r.thief === myId; const iAcc = !!r.acc?.[myId];
  const mates = awakeAt(r, myDie, room.players).filter(id => id !== myId);
  const awakeNow = r.phase === 'night' && h === myDie;
  const secLeft = r.phase === 'night' ? Math.max(0, Math.ceil(((h === 0 ? r.nightStart : r.nightStart + h * r.hourMs) - srvNow) / 1000)) : 0;
  const order = (r.order || []).filter(id => room.players?.[id]);
  const votes = r.votes || {}; const myPeek = r.peeks?.[myId];
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), cur => { if (!cur || cur.status !== 'playing' || cur.round?.kind !== 'cake') return; return f(cur); });
  // ที่เห็นตอนตื่น: ก่อนเวลาขโมย = เค้กยังอยู่ / ตรงเวลาขโมย = เห็นขโมยถือเค้กคามือ / หลังจากนั้น = หายไปแล้ว
  const thiefDie = r.dice?.[r.thief];
  const cakeSeen = myDie < thiefDie ? 'there' : myDie === thiefDie ? 'vanish' : 'gone';

  // หมดคืน → ทุกเครื่องพยายามเปลี่ยนเป็นกลางวัน (transaction ทำให้เปลี่ยนครั้งเดียว)
  useEffect(() => { if (r.phase === 'night' && srvNow >= r.nightEnd) tx(cur => endNight(cur, srvNow)); }, [r.phase === 'night' && srvNow >= r.nightEnd]);
  // เสียง: เริ่มคืน / ถึงเวลาตื่น / เช้า / จบเกม
  const prev = useRef(null);
  useEffect(() => {
    const s = { phase: r.phase, h, res: !!res }; const p = prev.current; prev.current = s; if (!p) { if (r.phase === 'night' && h === 0) sfx(sound, 'night'); return; }
    if (s.res && !p.res) { sfx(sound, 'execute'); setTimeout(() => sfx(sound, (sideOf(r, myId) === 'hungry') === (res.winner === 'hungry') ? 'win' : 'lose'), 1400); return; }
    if (s.phase === 'day' && p.phase === 'night') { sfx(sound, 'morning'); return; }
    if (s.h !== p.h && awakeNow) setTimeout(() => sfx(sound, iThief ? 'sabotage' : 'yourTurn'), 100);
  });

  async function confirmAcc() { const ok = await tx(cur => chooseAcc(cur, myId, accSel, srvNow)); if (ok?.committed) msg(accSel.length ? 'ได้ลูกสมุนแล้ว 🤝' : 'ไม่เอาลูกสมุน'); }
  async function peek(t) { if (!confirm(`แอบดูเลขเต๋าของ ${nameOf(t)}? ดูได้ครั้งเดียว`)) return; await tx(cur => peekDie(cur, myId, t, srvNow)); sfx(sound, 'reveal'); }
  async function vote(t) { sfx(sound, 'vote'); await tx(cur => castVote(cur, myId, t)); }

  const roleInfo = iThief ? { icon: '🥷', name: 'จอมแอบกิน', side: 'bad', desc: `ตอนตี ${myDie} คุณจะแอบกินเค้ก${r.accN ? ` และเลือกลูกสมุน ${r.accN} คน` : ''} — คนที่ตื่นพร้อมคุณจะเห็น ระวังให้ดี!` }
    : iAcc && r.phase !== 'night' ? { icon: '🤝', name: 'ลูกสมุน', side: 'bad', desc: `คุณถูก ${nameOf(r.thief)} ชวนมาเป็นพวก — ช่วยปั่นให้เพื่อนโหวตผิดคน` }
    : { icon: '😋', name: 'รูมเมทหิวโหย', side: 'good', desc: 'ตื่นมาดูว่าเค้กยังอยู่ไหม แล้วช่วยกันจับให้ได้ว่าใครแอบกิน' };
  const Memory = () => <div className="cake-memory">
    <b>🧠 สิ่งที่คุณรู้</b>
    <span>🎲 คุณทอยได้ {DIE[myDie]} {myDie} → ตื่นตอนตี {myDie}</span>
    {(r.phase !== 'night' || h >= myDie) && <>
      <span>👀 ตอนตื่น {mates.length ? `เห็น ${mates.map(nameOf).join(', ')} ตื่นอยู่ด้วย` : 'ตื่นอยู่คนเดียว'}</span>
      <span>🍰 {iThief ? (mates.length ? `คุณแอบกินเค้ก แต่ ${mates.map(nameOf).join(', ')} เห็นคุณคามือ! 👀` : 'คุณแอบกินเค้กตอนนี้แหละ ไม่มีใครเห็น 😋') : cakeSeen === 'there' ? 'เค้กยังอยู่ในตู้เย็น' : cakeSeen === 'vanish' ? `เห็น ${nameOf(r.thief)} ถือเค้กอยู่ในมือ! 😱` : 'เค้กหายไปแล้ว…'}</span>
    </>}
    {myPeek && <span>🔦 แอบดูเต๋า {nameOf(myPeek.t)}: ได้ {DIE[myPeek.die]} {myPeek.die}</span>}
    {iThief && r.accDone && <span>🤝 ลูกสมุน: {accList(r).map(nameOf).join(', ') || 'ไม่มี'}{r.accAuto ? ' (ระบบสุ่มให้)' : ''}</span>}
  </div>;

  return <div className="explore-game cake-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">{r.phase === 'night' ? (h === 0 ? '🌙 กำลังจะหลับ' : `🌙 ตี ${Math.min(h, HOURS)}`) : res ? '🏁 จบเกม' : '☀️ เช้าแล้ว'}</span></div>

    {r.phase === 'night' && <div className="cake-clock">{Array.from({ length: HOURS }, (_, i) => i + 1).map(x => <div key={x} className={'cake-hour' + (x === h ? ' now' : x < h ? ' past' : '') + (x === myDie ? ' mine' : '')}><b>ตี {x}</b><small>{x === myDie ? '⏰ คุณ' : ''}</small></div>)}</div>}

    {!res && <div className="role-card ex-role">
      <span className="role-icon">{showRole ? roleInfo.icon : '🛏️'}</span>
      <h3>{showRole ? roleInfo.name : 'บทบาทลับของคุณ'}</h3>
      {showRole ? <><p>{roleInfo.desc}</p><p className={'ex-side ' + roleInfo.side}>{roleInfo.side === 'bad' ? '🥷 ฝ่ายขโมย' : '😋 ฝ่ายหิวโหย'}</p><p>เต๋าของคุณ: <b>{DIE[myDie]} {myDie}</b> (ตื่นตี {myDie})</p></> : <p>กดเปิดดูคนเดียว ระวังคนแอบมองจอ!</p>}
      <button className="secondary" onClick={() => setShowRole(!showRole)}>{showRole ? <EyeOff size={16} /> : <Eye size={16} />} {showRole ? 'ซ่อนบทบาท' : 'เปิดดูบทบาท'}</button>
    </div>}

    {!res && r.phase === 'night' && <>
      {h === 0 && <><h2>🌙 ทุกคนเข้านอน… ({secLeft} วิ)</h2><p className="hint">ระบบทอยเต๋าให้แล้ว เปิดดูการ์ดบทบาทเพื่อดูว่าคุณจะตื่นตอนตีกี่โมง • กลางคืนไมค์ปิด คุยได้เฉพาะคนที่ตื่นเวลาเดียวกัน</p></>}
      {h >= 1 && h <= HOURS && !awakeNow && <><h2>😴 ตี {h} — คุณหลับอยู่ ({secLeft} วิ)</h2><div className="waiting">{h < myDie ? `คุณจะตื่นตอนตี ${myDie}` : 'คุณตื่นไปแล้ว นอนต่อ…'} • ทุกช่วงเวลายาวเท่ากัน ดูจากเวลาไม่ได้ว่ามีใครตื่น</div></>}
      {awakeNow && <>
        <h2>⏰ ตี {h} — คุณตื่นแล้ว! ({secLeft} วิ)</h2>
        <div className={'ex-banner ' + (iThief ? 'fail' : cakeSeen === 'there' ? 'ok' : 'fail')}>{iThief ? (mates.length ? `👀 มีคนเห็นคุณ! ${mates.map(nameOf).join(', ')} เห็นเค้กอยู่ในมือคุณ — จะชวนมาเป็นลูกสมุน หรือจะไปแก้ตัวตอนเช้า?` : '🥷 คุณแอบกินเค้กเรียบร้อย ไม่มีใครเห็น!') : cakeSeen === 'there' ? '🍰 เค้กยังอยู่ในตู้เย็น' : cakeSeen === 'vanish' ? `😱 คุณเห็น ${nameOf(r.thief)} กำลังถือเค้กอยู่ในมือ!` : '🫙 ตู้เย็นว่างเปล่า… เค้กหายไปแล้ว'}</div>
        <p className="hint">{mates.length ? `ตื่นพร้อมคุณ: ${mates.map(nameOf).join(', ')} — คุยกันทางห้องเสียงได้ (คนที่หลับไม่ได้ยิน)` : 'คุณตื่นอยู่คนเดียว'}</p>
        {iThief && r.accN > 0 && !r.accDone && <div className="score-rules"><b>🤝 เลือกลูกสมุน (สูงสุด {r.accN} คน)</b>
          <div className="ex-pick">{order.filter(id => id !== myId).map(id => <button key={id} className={'vote-row' + (accSel.includes(id) ? ' selected' : '')} onClick={() => setAccSel(s => s.includes(id) ? s.filter(x => x !== id) : s.length >= r.accN ? s : [...s, id])}><span>{nameOf(id)}</span><span>{accSel.includes(id) ? '✓ ลูกสมุน' : 'เลือก'}</span></button>)}</div>
          <button className="primary wide" onClick={confirmAcc}>🤝 ยืนยัน{accSel.length ? `ลูกสมุน (${accSel.length})` : ' ไม่เอาลูกสมุน'}</button>
          <small>ถ้าไม่กดยืนยันก่อนหมดเวลา ระบบจะสุ่มให้ตอนเช้า</small></div>}
        {iThief && r.accDone && <div className="confirmed">🤝 ลูกสมุน: {accList(r).map(nameOf).join(', ') || 'ไม่มี'}</div>}
        {!mates.length && (myPeek ? <div className="confirmed">🔦 {nameOf(myPeek.t)} ทอยได้ {DIE[myPeek.die]} {myPeek.die}</div>
          : <div className="score-rules"><b>🔦 ตื่นคนเดียว — แอบดูเลขเต๋าของ 1 คนได้</b><div className="ex-pick">{order.filter(id => id !== myId).map(id => <button key={id} className="vote-row" onClick={() => peek(id)}><span>{nameOf(id)}</span><span>ดูเต๋า</span></button>)}</div></div>)}
      </>}
      {h > HOURS && <div className="waiting">🌅 กำลังจะเช้า…</div>}
      {r.phase === 'night' && h > myDie && <Memory />}
    </>}

    {!res && r.phase === 'day' && <>
      <div className="ex-banner fail">☀️ เช้าแล้ว — เค้กในตู้เย็นหายไป! ใครแอบกิน?{r.accN ? ` (มีลูกสมุน ${r.accN} คน)` : ''}</div>
      <Memory />
      <h2>คุยกันให้พอ แล้วโหวตจับขโมย</h2>
      <p className="hint">ทุกคนโกหกได้ เสียงมากที่สุดถูกจับ — ถ้าจับถูกตัวขโมย ฝ่ายหิวโหยชนะ ถ้าจับผิดคนหรือคะแนนเสมอ ฝ่ายขโมยชนะ • เปลี่ยนใจได้จนกว่าจะโหวตครบ</p>
      <div className="ex-pick">{order.filter(id => id !== myId).map(id => { const c = Object.values(votes).filter(x => x === id).length; return <button key={id} className={'vote-row' + (votes[myId] === id ? ' selected' : '')} onClick={() => vote(id)}><span>{nameOf(id)}</span><span>{votes[myId] === id ? '✓ ' : ''}{c ? `${c} เสียง` : 'โหวต'}</span></button>; })}</div>
      <div className="ready-list"><div className="ready-head">🗳️ โหวตแล้ว <b>{players.filter(p => p.id in votes).length}/{players.length}</b> คน</div></div>
      {isHost && <div className="head-host"><button className="link-btn" onClick={() => { if (confirm('สรุปโหวตเลย? คนที่ยังไม่โหวตไม่นับ')) tx(cur => resolveVote(cur, true)); }}>สรุปโหวตเลย (ไม่รอ)</button></div>}
    </>}

    {res && <>
      <h2>{res.winner === 'hungry' ? 'จับจอมแอบกินได้! 🎉' : 'จอมแอบกินลอยนวล! 🥷'}</h2>
      <div className="result-card"><div className="big-emoji">{res.winner === 'hungry' ? '🍰' : '🫙'}</div>
        <p>ขโมยคือ <b>{nameOf(r.thief)}</b> (แอบกินตอนตี {thiefDie}){accList(r).length ? <> • ลูกสมุน: <b>{accList(r).map(nameOf).join(', ')}</b></> : ''}</p>
        <p className="voted-out">{res.caught ? <>ถูกจับ: <b>{nameOf(res.caught)}</b> ({res.counts?.[res.caught]} เสียง){res.caught === r.thief ? ' — โดนตัวจริง!' : ' — ผิดคน!'}</> : 'คะแนนเสมอ ไม่มีใครถูกจับ'}</p>
        <h4 className="ballot-title">🎲 เต๋าและบทบาทของทุกคน</h4>
        <ul className="role-list">{[...order].sort((a, b) => r.dice[a] - r.dice[b]).map(id => { const s = sideOf(r, id); return <li key={id}><span>{DIE[r.dice[id]]} ตี {r.dice[id]} • {nameOf(id)}</span><b className={s !== 'hungry' ? 'spy' : ''}>{s === 'thief' ? '🥷 จอมแอบกิน' : s === 'acc' ? '🤝 ลูกสมุน' : '😋 หิวโหย'}</b></li>; })}</ul>
        <h4 className="ballot-title">ใครโหวตใคร</h4>
        <ul className="ballots">{order.map(id => { const t = res.ballots?.[id]; return <li key={id}><span>{nameOf(id)}</span><span className="arrow">→</span><b className={t && t === r.thief ? 'hit' : ''}>{t ? nameOf(t) : 'ไม่ได้โหวต'}</b></li>; })}</ul>
        <h4 className="ballot-title">🏅 ตารางคะแนนสะสม</h4>
        <ol className="leaderboard">{[...players].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)).map((p, i) => { const d = res.points?.[p.id] || 0; return <li key={p.id} className={p.id === myId ? 'me' : ''}><span className="rank">{['🥇', '🥈', '🥉'][i] || i + 1}</span><span className="lb-name">{p.name}</span><em className={d > 0 ? 'up' : ''}>{d > 0 ? '+' + d : '±0'}</em><b>{scores[p.id] || 0}</b></li>; })}</ol>
      </div>
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}
  </div>;
}
