// ฉากเปิดเกม / ตอนจบ (~5 วิ) — อนิเมชัน SVG + เสียงสังเคราะห์ (ไม่มีไฟล์วิดีโอ/เสียง ไม่ต้องโหลดเพิ่ม)
// เล่นเต็มจอครั้งเดียวตอนเริ่มเกมหรือประกาศผล มีปุ่มข้าม
import React, { useEffect, useRef, useState } from 'react';
import { Char, lookFromId } from './char.jsx';
import { playFilm } from './sfx.js';
import './intro.css';

export const INTROS = { checkpoint: 'checkpoint', cake: 'cake' };
// ฉากตอนจบ (ตอนประกาศผล) เลือกตามผล: เกมเค้ก ขโมยโดนจับ → cake-caught, ขโมยรอด → cake-escape
export const ENDINGS = { cake: res => (res?.winner === 'hungry' ? 'cake-caught' : 'cake-escape') };
const SCENE_MS = 4800;
export const FILM_MS = SCENE_MS + 450;   // ความยาวฉาก + จางออก: เสียงชนะ/แพ้ของแต่ละคนเล่นหลังฉากจบ
export const INTRO_LEAD = FILM_MS;       // เลื่อนเวลาเริ่มรอบ (เกมที่จับเวลาทันที) ให้ดูฉากจบก่อน

const CAPTION = {
  cake: ['🍰 ตี 3…', 'มีใครแอบเปิดตู้เย็น?'],
  'cake-caught': ['🚨 จับได้คาตู้เย็น!', 'ปากยังเลอะครีมอยู่เลย'],
  'cake-escape': ['😋 ขโมยรอด!', 'เค้กหายเกลี้ยง ไม่มีใครจับได้'],
  checkpoint: ['👮 ด่านตรวจตีสอง!', 'จอดก่อนครับน้อง ขอดูกระเป๋าหน่อย'],
};

// ---------- ชิ้นส่วนฉาก ----------
const Kitchen = ({ lit }) => <>
  <rect width="400" height="260" fill={lit ? '#f6e7c8' : '#1b1838'} />
  <rect y="205" width="400" height="55" fill={lit ? '#d9b98a' : '#120f26'} />
  <g transform="translate(40 40)"><rect width="70" height="60" rx="4" fill={lit ? '#9fd3ff' : '#0b0a1e'} stroke={lit ? '#8a6a44' : '#2c2850'} strokeWidth="5" /><path d="M35 0V60M0 30H70" stroke={lit ? '#8a6a44' : '#2c2850'} strokeWidth="4" />{!lit && <circle cx="50" cy="16" r="9" fill="#fff6c8" />}</g>
  <g transform="translate(200 38)"><circle r="20" fill={lit ? '#fff' : '#d8d4f0'} stroke={lit ? '#8a6a44' : '#3a3466'} strokeWidth="4" /><path d="M0 0V-12M0 0L9 0" stroke="#2a2440" strokeWidth="3" strokeLinecap="round" transform="rotate(-90)" /><g className="if-tick"><path d="M0 2V-15" stroke="#ff5f6d" strokeWidth="1.5" /></g><circle r="2.5" fill="#2a2440" /></g>
</>;
const Cake = ({ x, y, s = 1, bite }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cx="0" cy="14" rx="30" ry="6" fill="#fff" stroke="#c9c2dd" strokeWidth="2" />
  <rect x="-22" y="-8" width="44" height="20" rx="4" fill="#ffd6e0" /><rect x="-22" y="-2" width="44" height="5" fill="#fff" />
  <path d="M-22 -8 Q-16 -14 -10 -8 Q-4 -14 2 -8 Q8 -14 14 -8 Q18 -12 22 -8 Z" fill="#fff" />
  {bite ? <path d="M10 -9 Q22 -4 22 12 L22 -9 Z" fill="#1b1838" /> : <circle cx="0" cy="-15" r="5" fill="#ff4d5e" />}
</g>;
const Fridge = ({ open, lit, empty, now }) => <g transform="translate(262 62)">
  <rect width="96" height="150" rx="8" fill={lit ? '#e8eef8' : '#b7bfd6'} stroke="#2a2440" strokeWidth="4" />
  <g className={open ? 'if-glow' + (now ? ' now' : '') : ''} opacity={open ? 1 : 0}><rect x="6" y="6" width="84" height="138" rx="4" fill="#fff6b8" /><path d="M8 70H88M8 106H88" stroke="#e5d98a" strokeWidth="3" />{!empty && <Cake x={48} y={54} s={0.8} />}<rect x="18" y="82" width="14" height="22" rx="3" fill="#7ad1ff" /><rect x="60" y="88" width="18" height="16" rx="3" fill="#9ae6a5" /></g>
  <g className={open ? 'if-door' + (now ? ' now' : '') : ''}><rect width="96" height="150" rx="8" fill={lit ? '#e8eef8' : '#b7bfd6'} stroke="#2a2440" strokeWidth="4" /><path d="M0 54H96" stroke="#2a2440" strokeWidth="3" /><rect x="80" y="20" width="6" height="26" rx="3" fill="#2a2440" /><rect x="80" y="66" width="6" height="40" rx="3" fill="#2a2440" /></g>
</g>;
const Shadow = ({ cake }) => <g>
  <ellipse cx="0" cy="0" rx="34" ry="44" fill="#06050f" /><path d="M-30 30 Q-44 40 -36 52 M30 30 Q44 40 36 52" stroke="#06050f" strokeWidth="12" strokeLinecap="round" />
  <g className="if-blink"><ellipse cx="-11" cy="-8" rx="7" ry="4" fill="#fff" /><ellipse cx="11" cy="-8" rx="7" ry="4" fill="#fff" /><circle cx="-9" cy="-8" r="2.4" fill="#06050f" /><circle cx="13" cy="-8" r="2.4" fill="#06050f" /></g>
  {cake && <Cake x={30} y={10} s={0.6} bite />}
</g>;
const Person = ({ id, color, size = 70, x, y }) => <Char look={lookFromId(id)} color={color} full size={size} x={x - size / 2} y={y - size * 1.4} />;

function CakeIntro() {
  return <>
    <Kitchen />
    <Fridge open />
    <polygon className="if-spill" points="268,212 352,212 400,260 210,260" fill="#fff6b8" />
    <g transform="translate(0 168)"><g className="if-sneak"><g className="if-bob"><Shadow /></g></g></g>
    <text className="if-pop d35" x="210" y="112" textAnchor="middle" fontSize="40" fontWeight="900" fill="#ffd447" fontFamily="Kanit,sans-serif">?!</text>
  </>;
}
function CakeCaught() {
  return <>
    <Kitchen lit />
    <Fridge open lit now />
    <g transform="translate(232 214)"><g className="if-shake"><Person id="cake-thief" color={13} size={78} x={0} y={0} />
      <circle cx="-8" cy="-58" r="3" fill="#fff" /><circle cx="6" cy="-54" r="2.4" fill="#ffd6e0" /><circle cx="14" cy="-60" r="2" fill="#fff" />
      <path d="M30 -70 L36 -40" stroke="#9aa3b8" strokeWidth="4" strokeLinecap="round" /><path d="M27 -76 V-68 M31 -77 V-69 M35 -76 V-68" stroke="#9aa3b8" strokeWidth="2.4" strokeLinecap="round" /></g></g>
    <g className="if-in-l d08"><Person id="rm-a" color={8} size={70} x={70} y={214} /><text x="70" y="104" textAnchor="middle" fontSize="30" fontWeight="900" fill="#ff4d5e" fontFamily="Kanit,sans-serif">!</text></g>
    <g className="if-in-l d10"><Person id="rm-b" color={4} size={64} x={140} y={214} /><text x="140" y="116" textAnchor="middle" fontSize="28" fontWeight="900" fill="#ff4d5e" fontFamily="Kanit,sans-serif">!!</text></g>
    <rect className="if-dark" width="400" height="260" fill="#0a0818" />
    <g transform="translate(200 120)"><g className="if-stamp d16"><rect x="-96" y="-32" width="192" height="64" rx="10" fill="none" stroke="#ff2e4d" strokeWidth="7" /><text y="16" textAnchor="middle" fontSize="44" fontWeight="900" fill="#ff2e4d" fontFamily="Kanit,sans-serif">จับได้!</text></g></g>
  </>;
}
function CakeEscape() {
  return <>
    <Kitchen />
    <Fridge open empty now />
    <g transform="translate(150 196)"><ellipse rx="34" ry="7" fill="#fff" stroke="#c9c2dd" strokeWidth="2" /><g fill="#ffd6e0"><circle cx="-10" cy="-3" r="2.5" /><circle cx="6" cy="-4" r="2" /><circle cx="14" cy="-2" r="1.6" /></g></g>
    <g transform="translate(0 168)"><g className="if-run"><g className="if-bob fast"><Shadow cake /></g></g></g>
    <g className="if-puff d12">{[0, 1, 2].map(i => <circle key={i} cx={40 + i * 26} cy={200 - i * 4} r={10 - i * 2} fill="#8a84b8" opacity=".6" />)}</g>
    <g transform="translate(150 120)"><g className="if-stamp d24"><text textAnchor="middle" fontSize="38" fontWeight="900" fill="#ffd447" fontFamily="Kanit,sans-serif">หายเกลี้ยง!</text></g></g>
  </>;
}
function Checkpoint() {
  return <>
    <rect width="400" height="260" fill="#070a16" />
    <g fill="#fff">{[[30, 30], [90, 18], [150, 40], [330, 24], [370, 52], [260, 14]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.4" />)}</g>
    <path d="M150 120 L250 120 L400 260 L0 260 Z" fill="#1a1d2c" />
    <path className="if-road" d="M200 124 L200 260" stroke="#ffd23f" strokeWidth="5" strokeDasharray="16 18" />
    <rect className="if-red" width="400" height="260" fill="#ff2e4d" /><rect className="if-blue" width="400" height="260" fill="#2e6bff" />
    <g transform="translate(70 92)"><rect x="-4" y="0" width="8" height="120" fill="#3a3f55" /><rect x="-34" y="-14" width="68" height="16" rx="6" fill="#222" /><circle className="if-lr" cx="-17" cy="-6" r="9" fill="#ff2e4d" /><circle className="if-lb" cx="17" cy="-6" r="9" fill="#2e6bff" />
      <rect x="-44" y="22" width="88" height="30" rx="5" fill="#ffd23f" /><text y="43" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1a1400" fontFamily="Kanit,sans-serif">ด่านตรวจ</text></g>
    {[130, 165, 270].map((x, i) => <g key={i} transform={`translate(${x} ${200 + i * 4})`}><path d="M-9 0 L0 -26 L9 0 Z" fill="#ff7a2e" /><path d="M-5 -10 H5" stroke="#fff" strokeWidth="3" /><rect x="-12" y="-1" width="24" height="4" fill="#ff7a2e" /></g>)}
    <g transform="translate(200 150)"><g className="if-bike">
      <circle cx="0" cy="0" r="40" fill="#fff6c8" opacity=".25" /><path d="M-26 22 H26" stroke="#111" strokeWidth="10" strokeLinecap="round" /><circle cx="-24" cy="30" r="12" fill="#111" /><circle cx="24" cy="30" r="12" fill="#111" />
      <rect x="-16" y="0" width="32" height="20" rx="6" fill="#d6283d" /><circle cx="0" cy="10" r="7" fill="#fff6c8" />
      <Person id="teen-a" color={3} size={44} x={0} y={4} />
    </g></g>
    <g transform="translate(320 222)"><Person id="cop-1" color={9} size={84} x={0} y={0} />
      <path d="M-28 -104 Q0 -126 28 -104 L24 -96 H-24 Z" fill="#1c2a6a" /><rect x="-30" y="-98" width="60" height="7" rx="3" fill="#0e1640" /><circle cx="0" cy="-108" r="5" fill="#ffd23f" />
      <path d="M-20 -46 L0 -24 L20 -46" stroke="#d9ff3f" strokeWidth="6" fill="none" strokeLinecap="round" />
      <g className="if-wave"><path d="M-34 -48 L-62 -86" stroke="#ff7a2e" strokeWidth="7" strokeLinecap="round" /><path d="M-56 -78 L-62 -86" stroke="#fff6c8" strokeWidth="7" strokeLinecap="round" /></g></g>
    <g transform="translate(240 70)"><g className="if-pop d26"><path d="M0 12 Q0 0 12 0 H100 Q112 0 112 12 V28 Q112 40 100 40 H70 L80 54 L56 40 H12 Q0 40 0 28 Z" fill="#fff" /><text x="56" y="26" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1c2a6a" fontFamily="Kanit,sans-serif">จอดก่อน!</text></g></g>
  </>;
}
const SCENES = { cake: CakeIntro, 'cake-caught': CakeCaught, 'cake-escape': CakeEscape, checkpoint: Checkpoint };

export default function IntroFilm({ id, sound, onDone }) {
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);
  const close = () => { if (done.current) return; done.current = true; setLeaving(true); setTimeout(onDone, 450); };   // จางออก 0.45 วิ
  useEffect(() => {
    playFilm(sound, id);
    const t = setTimeout(close, SCENE_MS);
    const key = e => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', key);
    return () => { clearTimeout(t); window.removeEventListener('keydown', key); };
  }, []);
  const S = SCENES[id]; if (!S) { setTimeout(onDone, 0); return null; }
  const [h, sub] = CAPTION[id] || [];
  return <div className={'intro-film' + (leaving ? ' leaving' : '')} role="dialog" aria-label="ฉากเปิดเกม">
    <div className="if-frame">
      <svg className="if-svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><S /></svg>
      <div className="if-cap"><b>{h}</b><span>{sub}</span></div>
    </div>
    <button className="intro-skip" onClick={e => { e.stopPropagation(); close(); }}>ข้าม ⏭</button>
  </div>;
}
