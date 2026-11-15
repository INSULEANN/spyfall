// อนิเมชันเหตุการณ์ในแวร์วูฟ ใช้ตัวละครของผู้เล่นจริง — เด้งกลางจอพร้อมกันทุกเครื่อง แตะเพื่อข้าม
//   bite  : หมาป่าวิ่งมากัดคอ → ล้มลง (4.2 วิ)
//   save  : หมาป่าพุ่งมา แต่หมอยาวิ่งมาฉีดยาช่วยไว้ (4.8 วิ) — ไม่บอกว่าใครถูกกัด (กันข้อมูลรั่ว) ใช้ตัวปริศนาแทน
//   vote  : ค้อนตุลาการทุบ → ถูกประหาร (3.4 วิ)
//   shot  : นายพรานยิงธนู → ล้มลง (3 วิ)
//   heart : หัวใจแตก ตรอมใจตายตามคู่รัก (3 วิ)
//   calm  : เช้านี้ไม่มีใครตาย / ไม่มีใครถูกประหาร (2.4 วิ)
import React, { useEffect, useRef, useState } from 'react';
import { Char } from './char.jsx';
import './wolffx.css';

export const FX_MS = { bite: 4200, save: 4800, vote: 3400, shot: 3000, heart: 3000, calm: 2400 };
const OL = '#2a2340';

const Wolf = () => <svg viewBox="0 0 124 84" className="wfx-wolf-svg" aria-hidden="true">
  <path d="M26 46 C10 40 4 24 12 16 C15 28 22 36 32 41 Z" fill="#6f7891" stroke={OL} strokeWidth="2.6" strokeLinejoin="round" />
  {[34, 46, 66, 78].map((x, i) => <rect key={x} className={'wfx-leg l' + (i % 2)} x={x} y="56" width="9" height="22" rx="4.5" fill="#6f7891" stroke={OL} strokeWidth="2.6" />)}
  <ellipse cx="56" cy="48" rx="33" ry="18" fill="#7d8699" stroke={OL} strokeWidth="2.6" />
  <ellipse cx="60" cy="54" rx="18" ry="8" fill="#a9b1c2" />
  <g className="wfx-head">
    <path d="M80 22 L82 4 L93 17 Z M93 19 L99 4 L104 21 Z" fill="#6f7891" stroke={OL} strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="92" cy="34" r="17" fill="#7d8699" stroke={OL} strokeWidth="2.6" />
    <path d="M100 28 L120 35 L101 44 Z" fill="#a9b1c2" stroke={OL} strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="119" cy="35" r="3" fill={OL} />
    <circle cx="95" cy="29" r="2.6" fill="#ffd23f" stroke={OL} strokeWidth="1.2" /><path d="M89 24 L100 27" stroke={OL} strokeWidth="2.6" strokeLinecap="round" />
    <path className="wfx-teeth" d="M103 41 l2 4 l2 -3.4 l2 3.4 l2 -4.4" fill="#fff" stroke={OL} strokeWidth="1.2" strokeLinejoin="round" />
  </g>
</svg>;

const Syringe = () => <svg viewBox="0 0 60 20" className="wfx-syr" aria-hidden="true">
  <rect x="14" y="5" width="30" height="10" rx="2" fill="#e8f6ff" stroke={OL} strokeWidth="2" /><rect x="16" y="7" width="16" height="6" fill="#6cd4a0" />
  <path d="M44 10 L58 10" stroke={OL} strokeWidth="2" /><rect x="6" y="7" width="8" height="6" fill="#bfc6d6" stroke={OL} strokeWidth="2" /><path d="M2 3 L2 17" stroke={OL} strokeWidth="3" strokeLinecap="round" />
</svg>;
const NurseCap = () => <svg viewBox="0 -8 100 140" className="wfx-nurse" aria-hidden="true"><path d="M32 6 C40 -6 60 -6 68 6 L66 14 C56 10 44 10 34 14 Z" fill="#fff" stroke={OL} strokeWidth="2.2" strokeLinejoin="round" /><path d="M47 1 h6 v3 h3 v6 h-3 v3 h-6 v-3 h-3 v-6 h3 z" fill="#ff4d5e" /></svg>;
const Gavel = () => <svg viewBox="0 0 90 90" className="wfx-gavel" aria-hidden="true"><rect x="40" y="30" width="10" height="58" rx="5" fill="#a0673a" stroke={OL} strokeWidth="2.4" transform="rotate(-38 45 40)" /><rect x="10" y="8" width="56" height="26" rx="8" fill="#8a5530" stroke={OL} strokeWidth="2.6" transform="rotate(-38 38 21)" /></svg>;
const Arrow = () => <svg viewBox="0 0 80 16" className="wfx-arrow-svg" aria-hidden="true"><path d="M4 8 L66 8" stroke="#7a4b25" strokeWidth="3" strokeLinecap="round" /><path d="M64 2 L78 8 L64 14 Z" fill="#c9ced8" stroke={OL} strokeWidth="1.6" /><path d="M2 2 L10 8 L2 14 M8 2 L16 8 L8 14" fill="none" stroke="#ff5d6c" strokeWidth="2" /></svg>;

// ตัวละครในฉาก: who = id ผู้เล่น (ใช้หน้าตาจริง) หรือ null = ตัวปริศนา
function Actor({ who, av, cls = '' }) {
  const a = who ? av(who) : { look: { hair: 0, hc: 0, eyes: 13, mouth: 3 }, c: 13 };
  return <div className={'wfx-actor ' + cls}><Char look={a.look} color={a.c} full size={92} />{!who && <b className="wfx-q">?</b>}</div>;
}

function Scene({ ev, av, nameOf }) {
  const name = ev.who ? nameOf(ev.who) : '';
  if (ev.kind === 'bite') return <div className="wfx-scene bite">
    <Actor who={ev.who} av={av} cls="victim" />
    <div className="wfx-wolf"><Wolf /></div>
    <b className="wfx-pop chomp">งับ!</b>
    <p className="wfx-cap">🩸 <b>{name}</b> ถูกหมาป่ากัดตายเมื่อคืน{ev.role ? ` (${ev.role})` : ''}</p>
  </div>;
  if (ev.kind === 'save') return <div className="wfx-scene save">
    <Actor who={null} av={av} cls="victim" />
    <div className="wfx-wolf"><Wolf /></div>
    <div className="wfx-doc"><Char look={{ hair: 0, hc: 0, eyes: 2, mouth: 0 }} color={0} full size={92} /><NurseCap /><Syringe /></div>
    <b className="wfx-pop poke">ฉึก! 💉</b>
    <span className="wfx-sparkle">✨</span>
    <p className="wfx-cap">💉 หมาป่ามาจู่โจม แต่<b>หมอยาช่วยไว้ทัน!</b> เมื่อคืนไม่มีใครตาย</p>
  </div>;
  if (ev.kind === 'vote') return <div className="wfx-scene vote">
    <Actor who={ev.who} av={av} cls="victim" />
    <div className="wfx-gv"><Gavel /></div>
    <b className="wfx-pop bonk">โป๊ก!</b>
    <p className="wfx-cap">⚖️ หมู่บ้านโหวตประหาร <b>{name}</b>{ev.role ? ` (${ev.role})` : ''}</p>
  </div>;
  if (ev.kind === 'shot') return <div className="wfx-scene shot">
    <Actor who={ev.who} av={av} cls="victim" />
    <div className="wfx-arrow"><Arrow /></div>
    <p className="wfx-cap">🏹 นายพรานยิงพา <b>{name}</b> ไปด้วย{ev.role ? ` (${ev.role})` : ''}</p>
  </div>;
  if (ev.kind === 'heart') return <div className="wfx-scene heart">
    <Actor who={ev.who} av={av} cls="victim" />
    <span className="wfx-hrt l">💔</span>
    <p className="wfx-cap">💔 <b>{name}</b> ตรอมใจตายตามคู่รัก</p>
  </div>;
  return <div className="wfx-scene calm"><span className="wfx-sun">{ev.day ? '☀️' : '🕊️'}</span><p className="wfx-cap">{ev.text}</p></div>;
}

// items = [{ key, events }] — key ใหม่ที่ไม่เคยเห็น = ต่อคิวเล่น (ตอนเปิดหน้า/รีเฟรช ไม่เล่นย้อนของเก่า) แล้วเล่นทีละฉาก
export function WolfFx({ items, av, nameOf, onSound }) {
  const [q, setQ] = useState([]); const seen = useRef(null);
  const sig = items.map(x => x.key).join('|');
  useEffect(() => {
    if (!seen.current) { seen.current = new Set(items.map(x => x.key)); return; }
    const fresh = items.filter(x => x.key && !seen.current.has(x.key)); if (!fresh.length) return;
    fresh.forEach(x => seen.current.add(x.key));
    setQ(cur => [...cur, ...fresh.flatMap(x => x.events.map((e, i) => ({ ...e, k: x.key + ':' + i })))]);
  }, [sig]);
  const cur = q[0];
  useEffect(() => { if (!cur) return; onSound?.(cur.kind); const t = setTimeout(() => setQ(x => x.slice(1)), FX_MS[cur.kind] || 3000); return () => clearTimeout(t); }, [cur?.k]);
  if (!cur) return null;
  return <div className="wfx" onClick={() => setQ(x => x.slice(1))} role="status"><div className="wfx-stage" key={cur.k}>
    <div className={'wfx-sky ' + (cur.kind === 'vote' || cur.kind === 'shot' || cur.day ? 'day' : 'dawn')} />
    <div className="wfx-ground" />
    <Scene ev={cur} av={av} nameOf={nameOf} />
    <small className="wfx-skip">แตะเพื่อข้าม{q.length > 1 ? ` • อีก ${q.length - 1} ฉาก` : ''}</small>
  </div></div>;
}
