// เกม "เค้กหายไปไหน" — รูมเมททอยเต๋าเพื่อตื่นกลางดึก (ตี 1–6) ดูว่าเค้กในตู้เย็นยังอยู่ไหม แล้วกลางวันโหวตหาตัวจอมแอบกิน
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { Art } from './play-art.jsx';
import { TimerRing, Phase, Steps, PlayerGrid, WhoDone, RoleCard, Outcome, RevealGrid, Leaderboard, Ballots, HostBar, SecH, Avatar, Voters } from './ui.jsx';
import { play as sfx } from './sfx.js';
import { CakeStage } from './cakestage.jsx';
import { Replay } from './replay.jsx';
import { shuffle, rint, pickBad } from './rand.js';

export const CAKE_MIN = 4;
export const HOURS = 6;
export const CAKE_SCORE = { hungry: 1, thief: 2, acc: 1 };
export const accCount = n => Math.max(0, Math.floor((n - 2) / 3)); // 4:0 5–7:1 8–10:2 11–12:3
export const DIE = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// t0 = เวลาเซิร์ฟเวอร์ตอนเริ่ม (ทุกเครื่องใช้นาฬิกาเดียวกัน)
export function makeCakeRound(ids, opts = {}, number = 1, t0 = Date.now()) {
  const dice = {}; ids.forEach(id => dice[id] = 1 + rint(6));
  const hourMs = (opts.hourSec || 20) * 1000; const nightStart = t0 + 8000;
  return { number, kind: 'cake', dice, thief: pickBad(ids, 1, opts.hist)[0], accN: accCount(ids.length), hourMs, nightStart, nightEnd: nightStart + HOURS * hourMs, phase: 'night', order: shuffle(ids), startedAt: t0 };
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
const SEEN = {
  there: { art: 'fridgeFull', title: 'เค้กยังอยู่ในตู้เย็น', tone: 'good' },
  vanish: { art: 'fridgeThief', title: 'เห็นขโมยถือเค้กคามือ!', tone: 'bad' },
  gone: { art: 'fridgeEmpty', title: 'ตู้เย็นว่างเปล่า เค้กหายไปแล้ว!', tone: 'bad' },
};
// ข้อสรุปจากสิ่งที่เห็น → ขโมยตื่นตีไหนได้บ้าง
const Html = ({ s }) => <span dangerouslySetInnerHTML={{ __html: s }} />;
const possibleHour = (seen, myDie) => h => seen === 'there' ? h > myDie : seen === 'gone' ? h < myDie : seen === 'vanish' ? h === myDie : true;

// ฉากเล่นย้อนทั้งคืน: ไล่ทีละชั่วโมง (ชั่วโมงที่ไม่มีใครตื่นรวบเป็นฉากเดียว) แล้วจบที่ผลโหวตตอนเช้า
const tk = id => `{${id}}`;
export function cakeScenes(r, res, players) {
  const th = r.thief, tH = r.dice?.[th]; const acc = accList(r); const S = []; let quiet = [];
  const flush = () => {
    if (!quiet.length) return; const a = quiet[0], b = quiet[quiet.length - 1];
    S.push({ kicker: a === b ? `🌙 ตี ${a}` : `🌙 ตี ${a}–${b}`, title: 'ไม่มีใครตื่น… บ้านเงียบกริบ', tone: 'night', stage: <CakeStage mode="sleep" hour={a} />, lines: [{ ico: '😴', text: a < tH ? 'เค้กยังนอนรออยู่ในตู้เย็น' : 'ตู้เย็นว่างเปล่าแล้ว แต่ไม่มีใครเห็น', cls: 'dim' }] });
    quiet = [];
  };
  for (let h = 1; h <= HOURS; h++) {
    const who = awakeAt(r, h, players); if (!who.length) { quiet.push(h); continue; }
    flush();
    const others = who.filter(id => id !== th); const lines = [{ ico: '⏰', text: `ตื่นมา: ${who.map(tk).join(' ')}` }]; let mode, title;
    if (h < tH) { mode = 'there'; title = 'เค้กยังอยู่!'; lines.push({ ico: '🍰', text: 'เปิดตู้เย็น — เค้กยังอยู่ครบ', cls: 'good' }); }
    else if (h === tH) {
      mode = 'vanish'; title = `${tk(th)} ย่องมากินเค้ก!`; lines.push({ ico: '😈', text: `${tk(th)} แอบกินเค้กจนเกลี้ยง`, cls: 'bad' });
      if (others.length) lines.push({ ico: '👀', text: `${others.map(tk).join(' ')} เห็นคามือ!`, cls: 'warn' });
      if (r.accN > 0) lines.push(acc.length ? { ico: '🤝', text: `ชวน ${acc.map(tk).join(' ')} มาเป็นลูกสมุน${r.accAuto ? ' (ระบบสุ่มให้)' : ''}`, cls: 'bad' } : { ico: '🙅', text: 'ไม่ชวนใครเป็นลูกสมุน', cls: 'dim' });
    } else { mode = 'gone'; title = 'เค้กหายไปแล้ว!'; lines.push({ ico: '😱', text: 'ตู้เย็นว่างเปล่า — มาช้าไป', cls: 'bad' }); }
    who.forEach(id => { const p = r.peeks?.[id]; if (p) lines.push({ ico: '🔦', text: `${tk(id)} แอบดูเต๋า ${tk(p.t)} → ตื่นตี ${p.die}` }); });
    S.push({ kicker: `⏰ ตี ${h}`, title, tone: h === tH ? 'bad' : 'night', stage: <CakeStage mode={mode} hour={h} />, lines });
  }
  flush();
  if (res) {
    const c = res.counts || {}; const tally = Object.keys(c).sort((a, b) => c[b] - c[a]).map(t => `${tk(t)} ×${c[t]}`).join(' · '); const good = res.winner === 'hungry';
    S.push({ kicker: '☀️ เช้า', title: good ? 'จับจอมแอบกินได้!' : 'จอมแอบกินลอยนวล!', tone: good ? 'good' : 'bad', stage: <CakeStage mode="morning" />, lines: [
      ...(tally ? [{ ico: '🗳️', text: `ผลโหวต: ${tally}` }] : []),
      res.caught ? { ico: res.caught === th ? '🚔' : '🙈', text: res.caught === th ? `จับ ${tk(res.caught)} ได้ — ตัวจริง!` : `จับ ${tk(res.caught)} — ผิดคน!`, cls: res.caught === th ? 'good' : 'bad' } : { ico: '🤷', text: 'คะแนนเสมอ ไม่มีใครถูกจับ', cls: 'dim' },
      { ico: '😈', text: `ขโมยตัวจริง: ${tk(th)} (กินตอนตี ${tH})${acc.length ? ` • ลูกสมุน: ${acc.map(tk).join(' ')}` : ''}`, cls: 'bad' },
    ] });
  }
  return S;
}

function CakeClock({ r, h, myDie, srvNow, mode, av, nameOf, players }) {
  const pct = h >= 1 && h <= HOURS ? Math.min(100, Math.max(0, ((srvNow - (r.nightStart + (h - 1) * r.hourMs)) / r.hourMs) * 100)) : 0;
  return <div className={'cake-track ' + mode}>{Array.from({ length: HOURS }, (_, i) => i + 1).map(x => {
    const who = mode === 'result' ? awakeAt(r, x, players) : [];
    const thiefHour = mode === 'result' && x === r.dice?.[r.thief];
    return <div key={x} className={'ct-slot' + (mode === 'night' && x === h ? ' now' : '') + (mode === 'night' && x < h ? ' past' : '') + (x === myDie ? ' mine' : '') + (thiefHour ? ' thief' : '')}>
      <b>ตี {x}</b>
      {mode === 'night' && <span className="ct-ico">{x === myDie ? '⏰' : x < h ? '·' : '🌙'}</span>}
      {mode === 'night' && x === h && <i className="ct-bar" style={{ width: pct + '%' }} />}
      {mode === 'night' && x === myDie && <small>คุณตื่น</small>}
      {mode === 'result' && <>
        <span className="ct-cake"><Art name={x < r.dice?.[r.thief] ? 'cake' : thiefHour ? 'ninja' : 'fridgeEmpty'} size={34} /></span>
        <div className="ct-who">{who.length ? who.map(id => <span key={id} title={nameOf(id)}><Avatar id={id} av={av} size={24} /></span>) : <em>ไม่มีใคร</em>}</div>
      </>}
    </div>;
  })}</div>;
}

export function CakeGame({ db, room, roomCode, myId, players, isHost, scores, sound, nameOf, msg, onBack, srvNow, av }) {
  const r = room.round; const res = room.status === 'result' && room.result;
  const [showRole, setShowRole] = useState(false);
  const [accSel, setAccSel] = useState([]);
  const [claims, setClaims] = useState({});
  useEffect(() => { setClaims({}); setAccSel([]); }, [r.number]);
  const h = r.phase === 'night' ? hourAt(r, srvNow) : HOURS + 1;
  const myDie = r.dice?.[myId]; const iThief = r.thief === myId; const iAcc = !!r.acc?.[myId];
  const [accFx, setAccFx] = useState(false); const accKey = `cake-acc-${roomCode}-${r.number}`;
  useEffect(() => { if (!iAcc || r.phase !== 'day' || room.status !== 'playing') return; let seen = false; try { seen = sessionStorage.getItem(accKey) === '1'; } catch { } if (seen) return; setAccFx(true); sfx(sound, 'sabotage'); try { sessionStorage.setItem(accKey, '1'); } catch { } }, [iAcc, r.phase, r.number]);
  const mates = awakeAt(r, myDie, room.players).filter(id => id !== myId);
  const awakeNow = r.phase === 'night' && h === myDie;
  const secLeft = r.phase === 'night' ? Math.max(0, Math.ceil(((h === 0 ? r.nightStart : r.nightStart + h * r.hourMs) - srvNow) / 1000)) : 0;
  const order = (r.order || []).filter(id => room.players?.[id]);
  const votes = r.votes || {}; const myPeek = r.peeks?.[myId];
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), cur => { if (!cur || cur.status !== 'playing' || cur.round?.kind !== 'cake') return; return f(cur); });
  // ที่เห็นตอนตื่น: ก่อนเวลาขโมย = เค้กยังอยู่ / ตรงเวลาขโมย = เห็นขโมยถือเค้กคามือ / หลังจากนั้น = หายไปแล้ว
  const thiefDie = r.dice?.[r.thief];
  const cakeSeen = myDie < thiefDie ? 'there' : myDie === thiefDie ? 'vanish' : 'gone';
  const woke = r.phase !== 'night' || h >= myDie;

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

  async function confirmAcc() { const ok = await tx(cur => chooseAcc(cur, myId, accSel, srvNow)); if (ok?.committed) { sfx(sound, 'confirm'); msg(accSel.length ? 'ได้ลูกสมุนแล้ว 🤝' : 'ไม่เอาลูกสมุน'); } }
  async function peek(t) { if (!confirm(`แอบดูเลขเต๋าของ ${nameOf(t)}? ดูได้ครั้งเดียว`)) return; await tx(cur => peekDie(cur, myId, t, srvNow)); sfx(sound, 'reveal'); }
  async function vote(t) { sfx(sound, 'vote'); await tx(cur => castVote(cur, myId, t)); }

  const role = iThief ? { art: 'thief', name: 'จอมแอบกิน', side: 'bad', label: '😈 ฝ่ายขโมย', desc: `ตอนตี ${myDie} คุณจะแอบกินเค้ก${r.accN ? ` แล้วเลือกลูกสมุน ${r.accN} คน` : ''} — ใครตื่นพร้อมคุณจะเห็น! ตอนเช้าโกหกให้เนียน อย่าให้โดนโหวต` }
    : iAcc && r.phase !== 'night' ? { art: 'acc', name: 'ลูกสมุน', side: 'bad', label: '😈 ฝ่ายขโมย', desc: `${nameOf(r.thief)} ชวนคุณมาเป็นพวก — ช่วยปั่นให้เพื่อนโหวตผิดคน ถ้าขโมยรอด คุณได้ +${CAKE_SCORE.acc}` }
    : { art: 'hungry', name: 'รูมเมทหิวโหย', side: 'good', label: '😋 ฝ่ายหิวโหย', desc: 'ตื่นตามเวลาบนลูกเต๋า ดูว่าเค้กยังอยู่ไหม แล้วตอนเช้าช่วยกันจับให้ได้ว่าใครแอบกิน' };
  const S = SEEN[cakeSeen];
  const deduce = cakeSeen === 'there' ? `ขโมยยังไม่ลงมือ → ขโมยตื่น<b>หลัง</b>ตี ${myDie}` : cakeSeen === 'gone' ? `ขโมยลงมือไปแล้ว → ขโมยตื่น<b>ก่อน</b>ตี ${myDie}` : `ขโมยคือ <b>${nameOf(r.thief)}</b> แน่นอน!`;

  // สมุดเบาะแส: สรุปทุกอย่างที่คุณรู้ เอาไว้ใช้ตอนเช้า
  const clues = <div className="clues">
    <SecH icon="📒">สมุดเบาะแสของคุณ <small>เห็นแค่คุณ</small></SecH>
    <div className="clue"><Art name="die" n={myDie} size={40} /><span>คุณทอยได้ <b>{myDie}</b> → ตื่นตอน <b>ตี {myDie}</b></span></div>
    {woke && <div className="clue"><span className="clue-ico">👀</span><span>{mates.length ? <>ตื่นพร้อม <Voters ids={mates} av={av} /> <b>{mates.map(nameOf).join(', ')}</b></> : 'ตอนตื่น ไม่มีใครตื่นด้วย (ตื่นคนเดียว)'}</span></div>}
    {woke && (iThief ? <div className="clue bad"><Art name="thiefEat" size={40} /><span>{mates.length ? <>คุณกินเค้กตอนตี {myDie} แต่ <b>{mates.map(nameOf).join(', ')}</b> เห็นคามือ!</> : <>คุณกินเค้กตอนตี {myDie} ไม่มีใครเห็น 😋</>}</span></div>
      : <div className={'clue ' + (cakeSeen === 'there' ? 'good' : 'bad')}><Art name={S.art} size={40} /><span>{S.title}<br /><small><Html s={deduce} /></small></span></div>)}
    {myPeek && <div className="clue"><Art name="die" n={myPeek.die} size={40} /><span>แอบดูเต๋า <b>{nameOf(myPeek.t)}</b> ได้ {myPeek.die} → เขาตื่นตี {myPeek.die}</span></div>}
    {iThief && r.accDone && <div className="clue"><span className="clue-ico">🤝</span><span>ลูกสมุน: <b>{accList(r).map(nameOf).join(', ') || 'ไม่มี'}</b>{r.accAuto ? ' (ระบบสุ่มให้)' : ''}</span></div>}
    {iAcc && r.phase !== 'night' && <div className="clue bad"><span className="clue-ico">🤝</span><span>คุณเป็นลูกสมุนของ <b>{nameOf(r.thief)}</b></span></div>}
  </div>;

  // ตารางจดคำให้การ (เห็นแค่เครื่องตัวเอง)
  const ok = possibleHour(iThief ? null : cakeSeen, myDie);
  const testimony = <div className="testimony">
    <SecH icon="📝">จดว่าใครบอกว่าตื่นตีไหน <small>แตะช่อง • เห็นแค่คุณ</small></SecH>
    <div className="tm-grid" style={{ '--cols': HOURS }}>
      <span className="tm-corner" />
      {Array.from({ length: HOURS }, (_, i) => i + 1).map(x => <span key={x} className={'tm-h' + (ok(x) ? '' : ' no')}>ตี {x}<small>{iThief ? '' : ok(x) ? 'เป็นไปได้' : 'ไม่ใช่'}</small></span>)}
      {order.map(id => { const mine = id === myId; const c = mine ? myDie : claims[id];
        return <React.Fragment key={id}>
          <span className="tm-name"><Avatar id={id} av={av} size={22} />{nameOf(id)}{mine && ' (คุณ)'}</span>
          {Array.from({ length: HOURS }, (_, i) => i + 1).map(x => <button key={x} type="button" disabled={mine} className={'tm-cell' + (c === x ? ' on' : '') + (ok(x) ? '' : ' no') + (c === x && !ok(x) && !mine ? ' alibi' : '')} onClick={() => setClaims(s => ({ ...s, [id]: s[id] === x ? undefined : x }))}>{c === x ? (mine ? '⏰' : '●') : ''}</button>)}
        </React.Fragment>; })}
    </div>
    {!iThief && <p className="hint">ช่องสีเทา = ขโมยไม่ได้ตื่นตีนั้น (จากที่คุณเห็นเอง) • ใครบอกว่าตื่นตีสีเขียว น่าสงสัยกว่า (แต่ทุกคนโกหกได้!)</p>}
  </div>;

  const accIds = order.filter(id => id !== myId);
  return <div className="explore-game cake-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">{r.phase === 'night' ? (h === 0 ? '🌙 กำลังจะหลับ' : h > HOURS ? '🌅 ใกล้เช้า' : `🌙 ตี ${h}`) : res ? '🏁 จบเกม' : '☀️ เช้าแล้ว'}</span></div>
    <div className="gcols flow"><div className="gmain">
    {!res && iAcc && r.phase === 'day' && <div className="acc-banner" role="alert"><Art name="acc" size={58} /><div><b>😈 คุณคือลูกสมุนของ {nameOf(r.thief)}!</b><span>คุณอยู่ฝ่ายขโมยแล้ว — ช่วยปั่นให้เพื่อนโหวตจับคนผิด อย่าโหวต <b className="acc-thief">{nameOf(r.thief)}</b> • ขโมยรอด คุณได้ +{CAKE_SCORE.acc}</span></div></div>}
    <Steps items={['ทอยเต๋า', 'กลางคืน', 'เช้า: โหวต', 'เฉลย']} at={res ? 3 : r.phase === 'day' ? 2 : h === 0 ? 0 : 1} />
    {r.phase === 'night' && <CakeClock r={r} h={h} myDie={myDie} srvNow={srvNow} mode="night" />}
    {/* ฉากห้องครัวเคลื่อนไหว: เห็นเฉพาะสิ่งที่ตัวเองเห็นตอนตื่น */}
    {!res && <CakeStage mode={r.phase === 'day' ? 'morning' : awakeNow ? (iThief ? 'thief' : cakeSeen) : 'sleep'} hour={r.phase === 'night' && h >= 1 && h <= HOURS ? h : 0} />}

    {/* ---------- กลางคืน ---------- */}
    {!res && r.phase === 'night' && h === 0 && <Phase art="bed" tone="night" kicker="🌙 คืนนี้" title="ทุกคนเข้านอน…" aside={<TimerRing secs={secLeft} total={h === 0 ? 8 : Math.round(r.hourMs / 1000)} label="วินาที" />}>
      ระบบทอยเต๋าให้ทุกคนแล้ว — คุณจะตื่นตอน <b>ตี {myDie}</b> • กลางคืนไมค์ปิด คุยได้เฉพาะคนที่ตื่นตีเดียวกัน</Phase>}
    {!res && r.phase === 'night' && h >= 1 && h <= HOURS && !awakeNow && <Phase art="bed" tone="night" kicker={`🌙 ตี ${h}`} title="คุณหลับอยู่… 😴" aside={<TimerRing secs={secLeft} total={h === 0 ? 8 : Math.round(r.hourMs / 1000)} label="วินาที" />}>
      {h < myDie ? <>อีก <b>{myDie - h}</b> ชั่วโมงจะถึง <b>ตี {myDie}</b> ที่คุณตื่น</> : 'คุณตื่นไปแล้ว นอนต่อจนเช้า'} • ทุกชั่วโมงยาวเท่ากัน ดูจากเวลาไม่ได้ว่ามีใครตื่น</Phase>}
    {!res && awakeNow && <>
      <Phase art={iThief ? 'thiefEat' : S.art} tone="me" kicker={`⏰ ตี ${h} — คุณตื่นแล้ว!`} title={iThief ? (mates.length ? 'มีคนเห็นคุณกินเค้ก! 👀' : 'แอบกินเค้กสำเร็จ ไม่มีใครเห็น') : cakeSeen === 'vanish' ? `เห็น ${nameOf(r.thief)} ถือเค้กคามือ!` : S.title} aside={<TimerRing secs={secLeft} total={Math.round(r.hourMs / 1000)} label="วินาที" />}>
        {iThief ? (mates.length ? 'จะชวนพยานมาเป็นลูกสมุน หรือจะไปแก้ตัวตอนเช้า?' : 'จำไว้ว่าต้องโกหกตอนเช้าว่าตื่นตีไหน') : <Html s={deduce} />}
      </Phase>
      {mates.length > 0 ? <><SecH icon="👀">ตื่นพร้อมคุณ <small>คุยกันได้ในห้องเสียง คนที่หลับไม่ได้ยิน</small></SecH><PlayerGrid ids={mates} av={av} nameOf={nameOf} small badge={id => iThief ? <span className="tag bad">เห็นคุณ!</span> : id === r.thief ? <span className="tag bad">ถือเค้ก!</span> : <span className="tag">ตื่นด้วย</span>} /></>
        : <div className="tip"><Art name="flashlight" size={42} /><span><b>คุณตื่นคนเดียว</b> — ได้สิทธิ์แอบดูเลขเต๋าของเพื่อน 1 คน (รู้ว่าเขาตื่นตีไหน)</span></div>}
      {iThief && r.accN > 0 && !r.accDone && <div className="action-box">
        <SecH icon="🤝">เลือกลูกสมุน <small>เลือกได้ {r.accN} คน • แตะรูป</small></SecH>
        <PlayerGrid ids={accIds} av={av} nameOf={nameOf} myId={myId} selected={accSel} onPick={id => { sfx(sound, 'click'); setAccSel(s => s.includes(id) ? s.filter(x => x !== id) : s.length >= r.accN ? s : [...s, id]); }} badge={id => mates.includes(id) ? <span className="tag bad">พยาน</span> : null} />
        <button className="primary wide" onClick={confirmAcc}>🤝 ยืนยัน{accSel.length ? `ลูกสมุน (${accSel.length}/${r.accN})` : ' ไม่เอาลูกสมุน'}</button>
        <p className="hint">ลูกสมุนจะรู้ตัวตอนเช้า • ถ้าไม่กดยืนยันก่อนหมดเวลา ระบบสุ่มให้</p></div>}
      {iThief && r.accDone && <div className="confirmed">🤝 ลูกสมุน: {accList(r).length ? <><Voters ids={accList(r)} av={av} /> <b>{accList(r).map(nameOf).join(', ')}</b></> : 'ไม่มี'}</div>}
      {!mates.length && (myPeek ? <div className="peek-result"><Avatar id={myPeek.t} av={av} size={44} /><span><b>{nameOf(myPeek.t)}</b> ทอยได้</span><Art name="die" n={myPeek.die} size={56} /><span>→ ตื่น <b>ตี {myPeek.die}</b></span></div>
        : <div className="action-box"><SecH icon="🔦">แอบดูเต๋าของใครดี? <small>ดูได้ 1 คน</small></SecH><PlayerGrid ids={accIds} av={av} nameOf={nameOf} onPick={peek} badge={() => <span className="tag">🔦 ดูเต๋า</span>} /></div>)}
    </>}
    {!res && r.phase === 'night' && h > HOURS && <Phase art="day" tone="day" kicker="🌅 ใกล้เช้า" title="ไก่ขันแล้ว… กำลังจะเช้า" />}

    {/* ---------- เช้า ---------- */}
    {!res && r.phase === 'day' && <>
      <Phase art="fridgeEmpty" tone="day" kicker="☀️ เช้าแล้ว" title="เค้กหายไป! ใครแอบกิน?">มีจอมแอบกิน 1 คน{r.accN ? ` และลูกสมุน ${r.accN} คน (ลูกสมุนรู้ตัวแล้ว)` : ''} • ทุกคนโกหกได้</Phase>
      <div className="howto">
        <div><Art name="alarm" size={46} /><b>1. เล่า</b>บอกเพื่อนว่าตื่นตีไหน เห็นใคร เห็นเค้กไหม</div>
        <div><Art name="notebook" size={46} /><b>2. จับผิด</b>คำให้การขัดกันไหม ใครอ้างว่าตื่นตีที่เป็นไปไม่ได้</div>
        <div><Art name="vote" size={46} /><b>3. โหวต</b>แตะรูปคนที่คิดว่าเป็นขโมย เปลี่ยนใจได้</div>
      </div>
      <SecH icon="🗳️">โหวตจับขโมย <small>{votes[myId] ? `คุณโหวต ${nameOf(votes[myId])}` : 'แตะรูปเพื่อโหวต'}</small></SecH>
      <PlayerGrid ids={order.filter(id => id !== myId)} av={av} nameOf={nameOf} selected={votes[myId]} onPick={vote}
        badge={id => { const by = Object.keys(votes).filter(v => votes[v] === id); return by.length ? <Voters ids={by} av={av} size={20} /> : <span className="ptile-note">ยังไม่มีเสียง</span>; }} />
      <WhoDone ids={order} done={id => id in votes} av={av} nameOf={nameOf} label="🗳️ โหวตแล้ว" />
      <p className="hint">เสียงมากที่สุดถูกจับ — จับถูกขโมย ฝ่ายหิวโหยได้คนละ +{CAKE_SCORE.hungry} • จับผิดคนหรือเสมอ ขโมย +{CAKE_SCORE.thief} ลูกสมุน +{CAKE_SCORE.acc}</p>
      {isHost && <HostBar><button className="secondary" onClick={() => { if (confirm('สรุปโหวตเลย? คนที่ยังไม่โหวตไม่นับ')) tx(cur => resolveVote(cur, true)); }}>สรุปโหวตเลย (ไม่รอ)</button></HostBar>}
    </>}

    {/* ---------- เฉลย ---------- */}
    {res && <>
      <Outcome art={res.winner === 'hungry' ? 'jail' : 'runaway'} tone={res.winner === 'hungry' ? 'good' : 'bad'} title={res.winner === 'hungry' ? 'จับจอมแอบกินได้! 🎉' : 'จอมแอบกินลอยนวล! 😈'}>
        ขโมยคือ <Avatar id={r.thief} av={av} size={26} /> <b>{nameOf(r.thief)}</b> (แอบกินตอนตี {thiefDie}){accList(r).length ? <><br />ลูกสมุน: <b>{accList(r).map(nameOf).join(', ')}</b></> : ''}
        <br />{res.caught ? <>ถูกจับ: <b>{nameOf(res.caught)}</b> ({res.counts?.[res.caught]} เสียง){res.caught === r.thief ? ' — โดนตัวจริง!' : ' — ผิดคน!'}</> : 'คะแนนเสมอ ไม่มีใครถูกจับ'}
      </Outcome>
      <Replay scenes={cakeScenes(r, res, room.players)} av={av} nameOf={nameOf} title="เล่นย้อนเมื่อคืนทีละชั่วโมง" />
      <SecH icon="🌙">ย้อนดูเมื่อคืน <small>ใครตื่นตีไหน • รูปในช่อง = เค้กตอนตีนั้น (ยังอยู่ / ขโมยกิน / หายแล้ว)</small></SecH>
      <CakeClock r={r} h={HOURS + 1} myDie={myDie} srvNow={srvNow} mode="result" av={av} nameOf={nameOf} players={room.players} />
      <SecH icon="🎭">บทบาทของทุกคน</SecH>
      <RevealGrid av={av} nameOf={nameOf} items={[...order].sort((a, b) => r.dice[a] - r.dice[b]).map(id => { const s = sideOf(r, id); return { id, art: s === 'thief' ? 'thief' : s === 'acc' ? 'acc' : 'hungry', label: s === 'thief' ? 'จอมแอบกิน' : s === 'acc' ? 'ลูกสมุน' : 'หิวโหย', bad: s !== 'hungry', extra: `🎲 ตื่นตี ${r.dice[id]}` }; })} />
      <SecH icon="🗳️">ใครโหวตใคร</SecH>
      <Ballots ids={order} ballots={res.ballots} av={av} nameOf={nameOf} hit={t => t === r.thief} />
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH>
      <Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}
    </div><div className="gside">
    {/* ---------- บทบาท (ระหว่างเล่น) ---------- */}
    {!res && <RoleCard show={showRole} onToggle={() => setShowRole(!showRole)} art={role.art} name={role.name} side={role.side} sideLabel={role.label} cover="die" n={myDie} coverTitle="บทบาทลับของคุณ" coverText={`เต๋าของคุณ: ${myDie} (ตื่นตี ${myDie}) • กดเปิดดูบทบาทคนเดียว`}>
      <p>{role.desc}</p><div className="info-line"><Art name="die" n={myDie} size={30} /> ตื่นตอน <b>ตี {myDie}</b></div></RoleCard>}

    {!res && (r.phase === 'day' || (r.phase === 'night' && h > myDie)) && clues}
    {!res && r.phase === 'day' && testimony}
    </div></div>
    {accFx && !res && <div className="acc-fx" onClick={() => setAccFx(false)}><div className="acc-box">
      <span className="acc-kick">☀️ เช้าแล้ว… คุณมีความลับ!</span>
      <Art name="acc" size={120} />
      <h2>😈 คุณถูกจ้างเป็น<br />ลูกสมุน!</h2>
      <p><Avatar id={r.thief} av={av} size={30} /> <b>{nameOf(r.thief)}</b> คือจอมแอบกินเค้ก และจ้างคุณเป็นพวก</p>
      <ul><li>🙊 ห้ามบอกใครว่าคุณเป็นลูกสมุน</li><li>🗳️ ช่วยปั่นให้เพื่อนโหวตจับคนผิด — อย่าโหวต {nameOf(r.thief)}</li><li>🏆 ถ้าขโมยรอด คุณได้ +{CAKE_SCORE.acc} แต้ม</li></ul>
      <button className="primary wide" onClick={() => setAccFx(false)}>🤝 รับทราบ เป็นพวกแล้ว</button>
      <small>ระวังคนแอบมองจอ!</small>
    </div></div>}
  </div>;
}
