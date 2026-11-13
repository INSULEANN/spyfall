// คลิปเปิดเกม / ตอนจบ (7 วิ) — เล่นเต็มจอครั้งเดียวตอนเริ่มเกมหรือประกาศผล มีปุ่มข้าม จบแล้วค่อย ๆ จางเข้าเกม
// วิดีโออยู่ใน public/intro/ จะโหลดก็ต่อเมื่อคอมโพเนนต์นี้ถูกแสดงเท่านั้น (หน้าแรกไม่โหลด)
import React, { useEffect, useRef, useState } from 'react';
import './intro.css';

export const INTROS = { checkpoint: 'checkpoint', cake: 'cake' };
// คลิปตอนจบ (ตอนประกาศผล) เลือกตามผล: เกมเค้ก ขโมยโดนจับ → cake-caught, ขโมยรอด → cake-escape
export const ENDINGS = { cake: res => (res?.winner === 'hungry' ? 'cake-caught' : 'cake-escape') };
export const FILM_MS = 7600;   // ความยาวคลิป + จางออก: เสียงชนะ/แพ้ของแต่ละคนเล่นหลังคลิปจบ
export const INTRO_LEAD = 7500;   // ms (คลิป 7 วิ + จางออก) ที่เลื่อนเวลาเริ่มรอบ (เกมที่จับเวลาทันที) ให้คลิปเล่นจบก่อน

export default function IntroFilm({ id, sound, onDone }) {
  const v = useRef(null);
  const [needTap, setNeedTap] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);
  const close = () => { if (done.current) return; done.current = true; setLeaving(true); setTimeout(onDone, 450); };   // จางออก 0.45 วิ
  useEffect(() => {
    const el = v.current; if (!el) return;
    el.muted = !sound;
    const p = el.play();
    // เบราว์เซอร์ไม่ยอมเล่นพร้อมเสียง → เล่นแบบปิดเสียง แล้วให้แตะเพื่อเปิดเสียง
    if (p && p.catch) p.catch(() => { el.muted = true; if (sound) setNeedTap(true); el.play().catch(close); });
    const safety = setTimeout(close, 12000);   // กันค้าง: ยังไงก็ปิดเอง ไม่บังเกม
    const slow = setTimeout(() => { if (!(el.currentTime > 0)) close(); }, 4000);   // เน็ตช้าโหลดไม่ทัน → ข้ามไปเลย
    const key = e => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', key);
    return () => { clearTimeout(safety); clearTimeout(slow); window.removeEventListener('keydown', key); };
  }, []);
  const unmute = e => { e.stopPropagation(); const el = v.current; if (el) { el.muted = false; el.play().catch(() => {}); } setNeedTap(false); };
  return <div className={'intro-film' + (leaving ? ' leaving' : '')} role="dialog" aria-label="คลิปเปิดเกม" onClick={needTap ? unmute : undefined}>
    <video ref={v} src={`/intro/${id}.mp4`} poster={`/intro/${id}.jpg`} playsInline preload="auto" onEnded={close} onError={close}/>
    {needTap && <button className="intro-unmute" onClick={unmute}>🔊 แตะเพื่อเปิดเสียง</button>}
    <button className="intro-skip" onClick={e => { e.stopPropagation(); close(); }}>ข้าม ⏭</button>
  </div>;
}
