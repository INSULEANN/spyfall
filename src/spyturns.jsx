// เกม SPY: ผลัดกันพูดใบ้คำทีละคน ตาละ 10 วิ (กดข้ามได้) + ปุ่ม "พร้อมจับสปายแล้ว" เกินครึ่ง = เข้าหน้าโหวตทันที
import React, { useEffect, useRef } from 'react';
import { ref, runTransaction, set, remove } from 'firebase/database';
import { play as sfx } from './sfx.js';
import { Avatar, TimerRing } from './ui.jsx';

export const TURN_MS = 10000;

// ตาใบ้คำ: round.turns = { order: [ids], i: ตาที่เท่าไร (นับต่อเนื่อง), at: เวลาเซิร์ฟเวอร์ที่เริ่มตานี้ }
export function ClueTurns({ db, room, roomCode, myId, av, nameOf, srvNow, isHost, sound }) {
  const t = room.round?.turns; const ord = (t?.order || []).filter(id => room.players?.[id]);
  const n = ord.length; const cur = n ? ord[(t.i || 0) % n] : null; const nextId = n > 1 ? ord[((t.i || 0) + 1) % n] : null;
  const left = t ? Math.max(0, (t.at || 0) + TURN_MS - srvNow) : 0; const secs = Math.ceil(left / 1000); const lap = n ? Math.floor((t.i || 0) / n) + 1 : 1;
  const mine = cur === myId;
  // เปลี่ยนตา (ทุกเครื่องพยายามได้ ทรานแซกชันกันซ้ำ)
  const advance = (from, why) => runTransaction(ref(db, `rooms/${roomCode}/round/turns`), c => { if (!c || (c.i || 0) !== from) return; return { ...c, i: from + 1, at: srvNow, by: why || null }; }).catch(() => {});
  useEffect(() => { if (t && n && left <= 0) advance(t.i || 0, 'time'); }, [left <= 0, t?.i]);
  // ตาเราเริ่ม → เสียงเตือน
  const prev = useRef(null);
  useEffect(() => { if (!t) return; const p = prev.current; prev.current = t.i; if (p != null && p !== t.i && mine) sfx(sound, 'yourTurn'); }, [t?.i]);
  if (!t || !n) return null;
  return <section className={'clue-turn' + (mine ? ' me' : '')}>
    <div className="ct-main">
      <div className="ct-av" key={cur}><Avatar id={cur} av={av} size={74} />{mine && <span className="ct-mic">🎤</span>}</div>
      <div className="ct-text">
        <span className="ct-kicker">🎙️ ตาใบ้คำ • รอบใบ้ที่ {lap}</span>
        <h2>{mine ? 'ตาคุณ! พูดใบ้คำ 1 อย่าง' : <>ตาของ {nameOf(cur)}</>}</h2>
        <small>{mine ? 'พูดในห้องเสียง ใบ้อ้อม ๆ อย่าให้สายลับเดาได้ • พูดจบกดข้ามได้เลย' : `ฟังให้ดีว่าใบ้ตรงคำไหม${nextId ? ` • ต่อไป: ${nextId === myId ? 'คุณ' : nameOf(nextId)}` : ''}`}</small>
      </div>
      <TimerRing secs={secs} total={TURN_MS / 1000} size={58} label="วิ" />
    </div>
    <div className="ct-order">{ord.map((id, k) => <span key={id} className={'ct-chip' + (id === cur ? ' now' : '') + (id === myId ? ' mine' : '')}><Avatar id={id} av={av} size={26} /><b>{k + 1}</b></span>)}</div>
    {(mine || isHost) && <button className={mine ? 'primary wide' : 'secondary wide'} onClick={() => { sfx(sound, 'click'); advance(t.i || 0, mine ? 'done' : 'host'); }}>{mine ? '✅ พูดเสร็จแล้ว ข้ามไปคนถัดไป' : `⏭️ ข้ามตา ${nameOf(cur)} (หัวหน้าห้อง)`}</button>}
  </section>;
}

// ปุ่มพร้อมจับสปาย: กดเกินครึ่งของคนในห้อง → เข้าหน้าโหวตทันที
export function CallVote({ db, room, roomCode, myId, av, nameOf, players, sound }) {
  const calls = room.round?.callVote || {}; const ids = players.map(p => p.id); const yes = ids.filter(id => calls[id]); const need = Math.floor(ids.length / 2) + 1; const mine = !!calls[myId];
  useEffect(() => { if (room.status === 'playing' && yes.length >= need) runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c || c.status !== 'playing') return; c.status = 'voting'; c.votes = null; c.ready = null; c.spyGuess = null; return c; }).catch(() => {}); }, [yes.length >= need]);
  const toggle = () => { sfx(sound, mine ? 'click' : 'vote'); const r = ref(db, `rooms/${roomCode}/round/callVote/${myId}`); (mine ? remove(r) : set(r, true)).catch(() => {}); };
  return <div className={'call-vote' + (mine ? ' on' : '')}>
    <button className={mine ? 'secondary wide' : 'primary wide'} onClick={toggle}>{mine ? '↩️ ยกเลิก (ยังไม่แน่ใจ)' : '🙋 มั่นใจแล้ว! โหวตจับสปายเลย'}</button>
    <div className="cv-meter"><span>พร้อมจับสปาย <b>{yes.length}/{need}</b> คน{yes.length < need ? ` • อีก ${need - yes.length} คนเข้าหน้าโหวตทันที` : ''}</span>
      <div className="cv-bar"><i style={{ width: Math.min(100, yes.length / need * 100) + '%' }} /></div>
      {yes.length > 0 && <div className="cv-who">{yes.map(id => <Avatar key={id} id={id} av={av} size={24} title={nameOf(id)} />)}</div>}</div>
  </div>;
}
