// ฉากเปิดเกม / ตอนจบ (~5 วิ) — อนิเมชัน SVG + เสียงสังเคราะห์ (ไม่มีไฟล์วิดีโอ/เสียง ไม่ต้องโหลดเพิ่ม)
// เล่นเต็มจอครั้งเดียวตอนเริ่มเกมหรือประกาศผล มีปุ่มข้าม
// จังหวะภาพตรงกับเสียงใน FILMS (sfx.js) — ถ้าแก้เวลาในฉาก ให้แก้เสียงด้วย
// ทุกฉากห่อด้วย .if-cam (กล้อง: ดัน/ซูม/สั่น) • ขยับด้วย transform/opacity เท่านั้นให้ลื่นบนมือถือ
import React, { useEffect, useRef, useState } from 'react';
import { Char, lookFromId } from './char.jsx';
import { playFilm } from './sfx.js';
import './intro.css';

export const INTROS = { checkpoint: 'checkpoint', cake: 'cake' };
// ฉากตอนจบ (ตอนประกาศผล) เลือกตามผล: เกมเค้ก ขโมยโดนจับ → cake-caught, ขโมยรอด → cake-escape
export const ENDINGS = { cake: res => (res?.winner === 'hungry' ? 'cake-caught' : 'cake-escape'), deal: res => (res?.winner ? 'deal-win' : null) };
const SCENE_MS = 4800;
export const FILM_MS = SCENE_MS + 450;   // ความยาวฉาก + จางออก: เสียงชนะ/แพ้ของแต่ละคนเล่นหลังฉากจบ
export const INTRO_LEAD = FILM_MS;       // เลื่อนเวลาเริ่มรอบ (เกมที่จับเวลาทันที) ให้ดูฉากจบก่อน

const CAPTION = {
  cake: ['🍰 ตี 3…', 'มีใครแอบเปิดตู้เย็น?'],
  'cake-caught': ['🚨 จับได้คาตู้เย็น!', 'ปากยังเลอะครีมอยู่เลย'],
  'cake-escape': ['😋 ขโมยรอด!', 'เค้กหายเกลี้ยง ไม่มีใครจับได้'],
  checkpoint: ['👮 ด่านตรวจตีสอง!', 'จอดก่อนครับน้อง ขอดูกระเป๋าหน่อย'],
  'deal-win': ['💼 ปิดดีลสำเร็จ!', name => `${name || 'ผู้ชนะ'} รวยที่สุดในวง`],
};
const OL = '#2a2440';
const K = 'Kanit,sans-serif';

// ---------- ชิ้นส่วนห้องครัว ----------
// ผัง 400×260: ประตูซ้าย (14–74) • หน้าต่าง (108–182, 34–100) • นาฬิกา (222,40) • เคาน์เตอร์ (96–252) • ตู้เย็น (262–358)
const Kitchen = ({ lit, hall }) => {
  const P = lit ? { wall: '#f6e3c0', wall2: '#efd3a6', tile: '#e9f1f7', tile2: '#d3e2ee', floor: '#d6b07c', floor2: '#c79c66', wood: '#b9824e', wood2: '#9b6a3c', top: '#e8e3d8', door: '#7a5534' }
    : { wall: '#221e48', wall2: '#1b1840', tile: '#262556', tile2: '#201f4c', floor: '#16132e', floor2: '#120f28', wood: '#2a2550', wood2: '#221e44', top: '#34306a', door: '#1a1636' };
  return <>
    <rect width="400" height="260" fill={P.wall} />
    <rect y="0" width="400" height="14" fill={P.wall2} />
    {/* กระเบื้องหลังเคาน์เตอร์ */}
    {Array.from({ length: 8 }, (_, i) => Array.from({ length: 3 }, (_, j) => <rect key={i + '-' + j} x={96 + i * 20} y={108 + j * 13} width="19" height="12" fill={(i + j) % 2 ? P.tile : P.tile2} />))}
    {/* ประตูทางเข้า (ซ้าย) */}
    <rect x="12" y="66" width="64" height="140" fill={P.door} />
    <rect x="18" y="72" width="52" height="134" fill={hall ? '#ffe6a3' : '#0b0a1e'} className={hall ? 'if-hall' : ''} />
    {hall && <polygon className="if-hallbeam" points="18,206 70,206 150,260 -40,260" fill="#ffe6a3" />}
    {/* หน้าต่าง + ผ้าม่าน */}
    <g transform="translate(108 34)">
      <rect width="74" height="66" rx="4" fill={lit ? '#9fd3ff' : '#0d0c26'} stroke={P.wood2} strokeWidth="5" />
      {!lit && <><circle cx="52" cy="20" r="11" fill="#fff6c8" /><circle cx="48" cy="17" r="2.4" fill="#e8dca6" /><circle cx="56" cy="24" r="3" fill="#e8dca6" /><circle className="if-twk" cx="14" cy="14" r="1.3" fill="#fff" /><circle className="if-twk b" cx="28" cy="40" r="1" fill="#fff" /></>}
      {lit && <><circle cx="52" cy="20" r="9" fill="#fff" opacity=".7" /><path d="M8 50 q10 -8 20 0 q10 -8 20 0" fill="none" stroke="#fff" strokeWidth="3" opacity=".6" /></>}
      <path d="M37 0V66M0 33H74" stroke={P.wood2} strokeWidth="4" />
      <g className="if-curtain l"><path d="M-6 -4 H22 C18 20 22 46 14 70 H-6 Z" fill={lit ? '#ff9db5' : '#4a2f6a'} /></g>
      <g className="if-curtain r"><path d="M80 -4 H52 C56 20 52 46 60 70 H80 Z" fill={lit ? '#ff9db5' : '#4a2f6a'} /></g>
      <rect x="-10" y="-8" width="94" height="6" rx="3" fill={P.wood2} />
    </g>
    {/* นาฬิกา ตี 3 */}
    <g transform="translate(222 40)"><circle r="18" fill={lit ? '#fff' : '#d8d4f0'} stroke={P.wood2} strokeWidth="4" />
      {[0, 90, 180, 270].map(a => <path key={a} d="M0 -14 V-11" stroke={OL} strokeWidth="2" transform={`rotate(${a})`} />)}
      <path d="M0 0 V-11" stroke={OL} strokeWidth="2.6" strokeLinecap="round" /><path d="M0 0 H8" stroke={OL} strokeWidth="3" strokeLinecap="round" />
      <g className="if-tick"><path d="M0 2 V-14" stroke="#ff5f6d" strokeWidth="1.4" /></g><circle r="2.2" fill={OL} /></g>
    {/* เคาน์เตอร์ */}
    <rect x="96" y="148" width="158" height="58" fill={P.wood} />
    <rect x="92" y="144" width="166" height="8" rx="2" fill={P.top} />
    {[0, 1, 2].map(i => <g key={i}><rect x={102 + i * 51} y="158" width="44" height="42" rx="3" fill={P.wood2} /><circle cx={140 + i * 51} cy="178" r="2.4" fill={P.top} /></g>)}
    <g transform="translate(118 132)"><rect x="-4" y="0" width="16" height="12" rx="2" fill={lit ? '#7ad1ff' : '#3a3a78'} /><path d="M2 0 V-14 M6 0 V-10" stroke={lit ? '#3fb56a' : '#2d5a4a'} strokeWidth="3" strokeLinecap="round" /></g>
    {/* พื้นลายตาราง */}
    <rect y="206" width="400" height="54" fill={P.floor} />
    {Array.from({ length: 10 }, (_, i) => <rect key={i} x={i * 40 + (i % 2) * 0} y="206" width="20" height="54" fill={P.floor2} opacity=".6" />)}
    <rect y="204" width="400" height="4" fill={P.wood2} />
  </>;
};
const Cake = ({ x, y, s = 1, bite, half }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cx="0" cy="14" rx="30" ry="6" fill="#fff" stroke="#c9c2dd" strokeWidth="2" />
  {half ? <path d="M-22 12 V-2 Q-22 -8 -14 -8 L2 -8 L2 12 Z" fill="#ffd6e0" />
    : <><rect x="-22" y="-8" width="44" height="20" rx="4" fill="#ffd6e0" /><rect x="-22" y="-2" width="44" height="5" fill="#fff" />
      <path d="M-22 -8 Q-16 -14 -10 -8 Q-4 -14 2 -8 Q8 -14 14 -8 Q18 -12 22 -8 Z" fill="#fff" /></>}
  {!half && (bite ? <path d="M10 -9 Q22 -4 22 12 L22 -9 Z" fill="#1b1838" /> : <><circle cx="0" cy="-15" r="5" fill="#ff4d5e" /><path d="M0 -20 q3 -4 6 -3" stroke="#3fb56a" strokeWidth="2" fill="none" strokeLinecap="round" /></>)}
</g>;
// ตู้เย็น: open = เปิดตอนนี้ (if-door เล่น) • now = เปิดค้างไว้แล้ว • empty = เค้กหาย
const Fridge = ({ open, lit, empty, now }) => <g transform="translate(262 62)">
  <rect x="-2" y="146" width="100" height="6" rx="3" fill="#0006" />
  <rect width="96" height="150" rx="8" fill={lit ? '#e8eef8' : '#9aa3c4'} stroke={OL} strokeWidth="4" />
  <g className={open ? 'if-glow' + (now ? ' now' : '') : ''} opacity={open ? 1 : 0}>
    <rect x="6" y="6" width="84" height="138" rx="4" fill="#fff6b8" />
    <rect className="if-flick" x="6" y="6" width="84" height="138" rx="4" fill="#fff" opacity=".35" />
    <path d="M8 70H88M8 106H88" stroke="#e5d98a" strokeWidth="3" />
    {!empty ? <Cake x={48} y={54} s={0.8} /> : <g><ellipse cx="48" cy="64" rx="24" ry="5" fill="#fff" stroke="#c9c2dd" strokeWidth="2" /><circle cx="40" cy="60" r="2" fill="#ffd6e0" /><circle cx="54" cy="61" r="1.6" fill="#ffd6e0" /></g>}
    <rect x="16" y="80" width="14" height="24" rx="3" fill="#7ad1ff" /><rect x="18" y="76" width="10" height="5" rx="2" fill="#fff" />
    <rect x="60" y="88" width="20" height="16" rx="3" fill="#9ae6a5" /><circle cx="40" cy="128" r="9" fill="#ffb03a" /><circle cx="58" cy="130" r="8" fill="#ff6b6b" />
  </g>
  <g className={open ? 'if-door' + (now ? ' now' : '') : ''}>
    <rect width="96" height="150" rx="8" fill={lit ? '#e8eef8' : '#9aa3c4'} stroke={OL} strokeWidth="4" />
    <path d="M0 54H96" stroke={OL} strokeWidth="3" /><rect x="80" y="20" width="6" height="26" rx="3" fill={OL} /><rect x="80" y="66" width="6" height="40" rx="3" fill={OL} />
    <circle cx="22" cy="24" r="6" fill="#ff6b6b" /><rect x="34" y="16" width="16" height="12" rx="2" fill="#ffd23f" transform="rotate(-8 42 22)" /><rect x="20" y="74" width="26" height="20" rx="1" fill="#fff" transform="rotate(4 33 84)" /><path d="M24 80h16M24 86h12" stroke="#9aa3c4" strokeWidth="2" transform="rotate(4 33 84)" />
  </g>
</g>;
// เงาขโมย (ปริศนา) — ตาเหลือบ เท้าเขย่ง
const Shadow = ({ cake, chew }) => <g>
  <g className="if-feet"><ellipse className="if-foot a" cx="-14" cy="44" rx="11" ry="6" fill="#06050f" /><ellipse className="if-foot b" cx="14" cy="44" rx="11" ry="6" fill="#06050f" /></g>
  <path d="M-34 6 C-36 -30 -18 -46 0 -46 C18 -46 36 -30 34 6 C34 30 22 44 0 44 C-22 44 -34 30 -34 6 Z" fill="#06050f" />
  <path d="M-30 -30 L-38 -50 L-20 -40 Z M30 -30 L38 -50 L20 -40 Z" fill="#06050f" />
  <g className={chew ? 'if-chew' : ''}><g className="if-eyes"><ellipse cx="-11" cy="-10" rx="7.5" ry="4.5" fill="#fff" /><ellipse cx="11" cy="-10" rx="7.5" ry="4.5" fill="#fff" />
    <g className="if-pupil"><circle cx="-9" cy="-10" r="2.6" fill="#06050f" /><circle cx="13" cy="-10" r="2.6" fill="#06050f" /></g></g>
    {chew && <path d="M-8 8 q8 6 16 0" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" />}</g>
  {cake && <Cake x={32} y={12} s={0.6} bite />}
</g>;
const Person = ({ id, color, size = 70, x, y }) => <Char look={lookFromId(id)} color={color} full size={size} x={x - size / 2} y={y - size * 1.4} />;
const Bang = ({ x, y, t, c = '#ff4d5e', s = 30, cls = '', st = '#fff' }) => <g transform={`translate(${x} ${y})`}><g className={'if-pop ' + cls}><text textAnchor="middle" fontSize={s} fontWeight="900" fill={c} stroke={st} strokeWidth="4" paintOrder="stroke" fontFamily={K}>{t}</text></g></g>;
const Drop = ({ x, y, cls = '' }) => <g transform={`translate(${x} ${y})`}><g className={'if-sweat ' + cls}><path d="M0 -6 C3 -1 5 2 5 4.5 C5 7.5 2.8 9 0 9 C-2.8 9 -5 7.5 -5 4.5 C-5 2 -3 -1 0 -6 Z" fill="#8fd3ff" stroke={OL} strokeWidth="1.2" /></g></g>;
const Confetti = ({ from = 2.6 }) => <g>{Array.from({ length: 22 }, (_, i) => <g key={i} transform={`translate(${12 + (i * 37) % 380} -10)`}><rect className="if-conf" style={{ animationDelay: from + (i % 7) * 0.09 + 's', '--x': ((i % 5) - 2) * 14 + 'px', '--r': (i % 2 ? 1 : -1) * (200 + i * 20) + 'deg' }} width="6" height="10" rx="1.5" fill={['#ff4d5e', '#ffd23f', '#3fb56a', '#4da3ff', '#c77dff'][i % 5]} /></g>)}</g>;

// ---------- 🍰 ฉากเปิด: ตี 3 ใครแอบเปิดตู้เย็น ----------
// 0–1.2 ห้องมืด นาฬิกาเดิน ม่านไหว Zzz • 1.2 ตู้เย็นเปิด แสงสาด • 1.6–3.3 เงาย่องเขย่ง ตาเหลือบซ้ายขวา • 3.3 เอื้อมมือ • 3.55 ?! หันมาสบตากล้อง กล้องพุ่งเข้า • 4.2 ไอริสปิดรอบตา
function CakeIntro() {
  return <>
    <defs><mask id="ifIris"><rect x="-400" y="-400" width="1200" height="1060" fill="#fff" /><g transform="translate(226 150)"><circle className="if-iris" r="260" fill="#000" /></g></mask></defs>
    <g className="if-cam ci">
      <Kitchen />
      <polygon className="if-moonbeam" points="112,100 178,100 250,206 70,206" fill="#c9d2ff" />
      {['z', 'Z', 'z'].map((z, i) => <g key={i} transform={`translate(${40 + i * 8} ${120 - i * 14})`}><text className="if-zz" style={{ animationDelay: i * 0.5 + 's' }} fontSize={12 + i * 4} fontWeight="800" fill="#b9b4ff" fontFamily={K}>{z}</text></g>)}
      <Fridge open />
      <polygon className="if-spill" points="262,206 358,206 420,260 200,260" fill="#fff6b8" />
      <g transform="translate(0 160)"><g className="if-sneak"><g className="if-tiptoe"><Shadow /></g>
        <g className="if-reach"><path d="M24 -2 Q44 -10 60 -14" stroke="#06050f" strokeWidth="11" strokeLinecap="round" fill="none" /></g></g></g>
      <g transform="translate(226 98)"><g className="if-pop d355"><text textAnchor="middle" fontSize="40" fontWeight="900" fill="#ffd447" stroke="#2a2440" strokeWidth="4" paintOrder="stroke" fontFamily={K}>?!</text></g></g>
    </g>
    <rect className="if-irisbox" x="-10" y="-10" width="420" height="280" fill="#04030c" mask="url(#ifIris)" />
  </>;
}

// ---------- 🚨 ฉากจบ: จับได้คาตู้เย็น ----------
// 0–0.3 มืด เงากำลังเคี้ยว • 0.3 แช้ะ! ไฟเปิด (กะพริบ) เห็นตัวจริงปากเลอะครีม • 0.55/0.75 รูมเมตโผล่ ! !! • 1.1 กระโจน → ฝุ่นตลบ 1.3–2.4 • 1.6 ตราประทับ "จับได้!" จอสั่น • 2.4 ฝุ่นจาง: ขโมยโดนมัดเชือก ร้องไห้ เพื่อนชูมือ • 2.6 เด้ง • คอนเฟตติ
function CakeCaught() {
  return <>
    <g className="if-cam cc"><g className="if-shk cc">
      <Kitchen lit />
      <Fridge open lit now />
      {/* ก่อนชุลมุน */}
      <g className="if-pre">
        <g transform="translate(232 214)"><g className="if-startle"><g className="if-chewing"><Person id="cake-thief" color={13} size={78} x={0} y={0} /></g>
          <ellipse cx="-4" cy="-62" rx="9" ry="5" fill="#fff" /><circle cx="8" cy="-58" r="3" fill="#ffd6e0" /><circle cx="-14" cy="-56" r="2.4" fill="#fff" />
          <g transform="translate(30 -60)"><path d="M0 0 L6 28" stroke="#9aa3b8" strokeWidth="4" strokeLinecap="round" /><path d="M-3 -6 V2 M1 -7 V1 M5 -6 V2" stroke="#9aa3b8" strokeWidth="2.4" strokeLinecap="round" /></g>
          <Drop x={22} y={-96} cls="d06" /></g>
          <Bang x={0} y={-118} t="!" s={34} cls="d04" /></g>
        <g transform="translate(64 214)"><g className="if-in-l d055"><g className="if-pounce a"><Person id="rm-a" color={8} size={70} x={0} y={0} />
          <g transform="translate(-28 -60)"><path d="M0 0 L-10 -22" stroke="#555" strokeWidth="5" strokeLinecap="round" /><ellipse cx="-14" cy="-30" rx="13" ry="9" fill="#3a3a48" stroke={OL} strokeWidth="2" /></g></g></g>
          <Bang x={0} y={-108} t="!" cls="d055" /></g>
        <g transform="translate(134 214)"><g className="if-in-l d075"><g className="if-pounce b"><Person id="rm-b" color={4} size={64} x={0} y={0} />
          <path d="M-22 -86 Q0 -110 22 -86 Z" fill="#7a8cff" /><circle cx="20" cy="-104" r="5" fill="#fff" /></g></g>
          <Bang x={0} y={-104} t="!!" cls="d075" /></g>
      </g>
      {/* ฝุ่นตลบ */}
      <g transform="translate(200 160)"><g className="if-brawl">
        {[[-60, 10, 34], [-20, -18, 40], [30, -10, 38], [64, 14, 32], [0, 24, 42], [-44, 34, 28], [46, 38, 30]].map(([x, y, r], i) => <circle key={i} className="if-puffy" style={{ animationDelay: i * 0.05 + 's' }} cx={x} cy={y} r={r} fill="#f3ead8" stroke={OL} strokeWidth="3" />)}
        <path className="if-limb a" d="M-50 -30 l-20 -14" stroke={OL} strokeWidth="6" strokeLinecap="round" /><path className="if-limb b" d="M60 -20 l22 -10" stroke={OL} strokeWidth="6" strokeLinecap="round" /><path className="if-limb c" d="M10 60 l6 20" stroke={OL} strokeWidth="6" strokeLinecap="round" />
        {[[-30, -50], [40, -44], [80, 40], [-80, 30]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><path className="if-bstar" style={{ animationDelay: i * 0.12 + 's' }} d="M0 -9 L2.6 -2.6 L9 0 L2.6 2.6 L0 9 L-2.6 2.6 L-9 0 L-2.6 -2.6 Z" fill="#ffd23f" stroke={OL} strokeWidth="1.4" /></g>)}
      </g></g>
      {/* หลังจับได้ */}
      <g className="if-post">
        <g transform="translate(200 214)"><g className="if-boing"><Person id="cake-thief" color={13} size={78} x={0} y={0} />
          <ellipse cx="-4" cy="-62" rx="9" ry="5" fill="#fff" />
          {[-34, -24, -14].map((y, i) => <path key={i} d={`M-40 ${y} Q0 ${y + 8} 40 ${y}`} stroke="#c98a4a" strokeWidth="5" fill="none" strokeLinecap="round" />)}
          <path d="M34 -26 q10 4 6 14" stroke="#c98a4a" strokeWidth="4" fill="none" strokeLinecap="round" />
          <g className="if-tear"><path d="M-14 -66 q-3 8 0 10 q3 -2 0 -10" fill="#8fd3ff" /></g><g className="if-tear b"><path d="M12 -66 q-3 8 0 10 q3 -2 0 -10" fill="#8fd3ff" /></g></g></g>
        <g transform="translate(112 214)"><g className="if-cheer"><Person id="rm-a" color={8} size={70} x={0} y={0} />
          <g transform="translate(-30 -64)"><path d="M0 0 L-6 -24" stroke="#555" strokeWidth="5" strokeLinecap="round" /><ellipse cx="-8" cy="-32" rx="13" ry="9" fill="#3a3a48" stroke={OL} strokeWidth="2" /></g></g></g>
        <g transform="translate(296 214)"><g className="if-cheer b"><Person id="rm-b" color={4} size={64} x={0} y={0} /><path d="M-22 -86 Q0 -110 22 -86 Z" fill="#7a8cff" /><circle cx="20" cy="-104" r="5" fill="#fff" />
          <g transform="translate(30 -60)"><circle r="8" fill="#ffd2a8" stroke={OL} strokeWidth="2" /><path d="M-2 -6 V-16" stroke={OL} strokeWidth="5" strokeLinecap="round" /></g></g></g>
      </g>
      <Confetti from={2.5} />
    </g></g>
    <rect className="if-dark" width="400" height="260" fill="#0a0818" />
    <g transform="translate(200 58)"><g className="if-stamp d16"><rect x="-100" y="-34" width="200" height="66" rx="10" fill="#fff8" stroke="#ff2e4d" strokeWidth="7" /><text y="16" textAnchor="middle" fontSize="46" fontWeight="900" fill="#ff2e4d" fontFamily={K}>จับได้!</text></g></g>
  </>;
}

// ---------- 😋 ฉากจบ: ขโมยหนีรอด ----------
// 0–0.7 มืด เงายืนเคี้ยวหน้าตู้เย็น • 0.6 ไฟทางเดินเปิด เสียงเท้า • 0.7 ! สะดุ้ง • 0.9–1.8 วิ่งตัวเอียง ฝุ่น → กระโดดออกหน้าต่าง ม่านสะบัด • 2.0 รูมเมตพุ่งเข้าประตู ปึง! • 2.2 ?? มองซ้ายขวา • 2.4 "หายเกลี้ยง!" • 2.6–3.8 เงาวิ่งผ่านพระจันทร์นอกหน้าต่าง • 3.4 วิ้ง
function CakeEscape() {
  return <>
    <defs><clipPath id="ifWin"><rect x="110" y="36" width="70" height="62" /></clipPath></defs>
    <g className="if-cam ce">
      <Kitchen hall />
      {/* นอกหน้าต่าง: เงาวิ่งผ่านพระจันทร์ */}
      <g clipPath="url(#ifWin)"><g transform="translate(0 62)"><g className="if-roof"><g transform="scale(.42)"><Shadow cake /></g></g></g></g>
      <g transform="translate(168 60)"><g className="if-pop d34"><path d="M0 -9 L2.4 -2.4 L9 0 L2.4 2.4 L0 9 L-2.4 2.4 L-9 0 L-2.4 -2.4 Z" fill="#fff" /></g></g>
      <Fridge open empty now />
      <polygon points="262,206 358,206 420,260 200,260" fill="#fff6b8" opacity=".25" />
      <g transform="translate(176 140)"><ellipse rx="26" ry="5" fill="#fff" stroke="#c9c2dd" strokeWidth="2" /><g fill="#ffd6e0"><circle cx="-10" cy="-3" r="2.5" /><circle cx="6" cy="-4" r="2" /><circle cx="14" cy="-2" r="1.6" /></g></g>
      {/* ขโมย */}
      <g transform="translate(226 160)"><g className="if-flee"><g className="if-bob fast2"><Shadow cake chew /></g></g></g>
      <g transform="translate(226 104)"><g className="if-pop eo"><text textAnchor="middle" fontSize="34" fontWeight="900" fill="#ffd447" stroke="#2a2440" strokeWidth="4" paintOrder="stroke" fontFamily={K}>!</text></g></g>
      <g className="if-speed">{[0, 1, 2, 3].map(i => <path key={i} d={`M${200 + i * 14} ${150 + i * 9} h46`} stroke="#b9b4ff" strokeWidth="3" strokeLinecap="round" />)}</g>
      {/* รูมเมตพุ่งเข้ามา */}
      <g transform="translate(60 214)"><g className="if-burst"><g className="if-look"><Person id="rm-a" color={8} size={74} x={0} y={0} /></g>
        <g transform="translate(30 -56)"><rect x="-4" y="-6" width="22" height="12" rx="3" fill="#ffd23f" stroke={OL} strokeWidth="2" /></g></g>
        <g className="if-qq"><text x="-24" y="-112" fontSize="26" fontWeight="900" fill="#ffd447" stroke="#2a2440" strokeWidth="3" paintOrder="stroke" fontFamily={K}>?</text><text x="10" y="-122" fontSize="32" fontWeight="900" fill="#ffd447" stroke="#2a2440" strokeWidth="3" paintOrder="stroke" fontFamily={K}>?</text></g></g>
      <g className="if-dust2">{[0, 1, 2].map(i => <circle key={i} cx={74 + i * 20} cy={204 - i * 3} r={9 - i * 2} fill="#c9c2dd" opacity=".7" />)}</g>
    </g>
    <g transform="translate(220 118)"><g className="if-stamp d24"><text textAnchor="middle" fontSize="40" fontWeight="900" fill="#ffd447" stroke="#2a2440" strokeWidth="5" paintOrder="stroke" fontFamily={K}>หายเกลี้ยง!</text></g></g>
  </>;
}

// ---------- 👮 ฉากเปิด: ด่านตรวจตีสอง ----------
// ไฟไซเรนแดง/น้ำเงินสาดทั้งฉาก • 0.2–1.9 มอไซค์ไฟหน้าส่องพุ่งจากสุดถนน ควันท่อ • 1.9 เบรกเอี๊ยด ล้อไถล รอยยาง ประกายไฟ • 2.6/2.85 ปี๊ด! "จอดก่อน!" • 3.0 กล้องซูมกระเป๋า ไฟฉายจ่าส่อง วัยรุ่นเหงื่อตก • 3.6 กระเป๋าดิ้น ของโผล่
function Checkpoint() {
  return <>
    <defs><linearGradient id="ifNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#05071a" /><stop offset="1" stopColor="#1a1f45" /></linearGradient>
      <radialGradient id="ifHead"><stop offset="0" stopColor="#fff6c8" stopOpacity=".8" /><stop offset="1" stopColor="#fff6c8" stopOpacity="0" /></radialGradient></defs>
    <g className="if-cam cp"><g className="if-shk cp">
      <rect width="400" height="260" fill="url(#ifNight)" />
      <g fill="#fff">{[[30, 26], [90, 14], [150, 34], [330, 20], [370, 46], [260, 12], [200, 28]].map(([x, y], i) => <circle key={i} className={'if-twk' + (i % 2 ? ' b' : '')} cx={x} cy={y} r="1.4" />)}</g>
      {/* ตึกเมือง */}
      {[[0, 70, 40], [36, 90, 30], [62, 60, 44], [104, 96, 30], [270, 92, 34], [300, 66, 40], [336, 84, 34], [364, 58, 40]].map(([x, h, w], i) => <g key={i}><rect x={x} y={124 - h} width={w} height={h} fill="#0d1030" />
        {Array.from({ length: Math.floor(h / 16) }, (_, j) => <rect key={j} className={(i + j) % 3 ? '' : 'if-twk'} x={x + 6 + ((j * 7) % (w - 14))} y={130 - h + j * 14} width="5" height="6" fill="#ffd877" opacity={(i + j) % 2 ? .8 : .35} />)}</g>)}
      {/* ถนน */}
      <path d="M170 122 L230 122 L420 260 L-20 260 Z" fill="#1e2233" />
      <path d="M170 122 L-20 260 M230 122 L420 260" stroke="#3a4060" strokeWidth="3" />
      {[[134, 4, 3], [148, 5, 6], [168, 7, 10], [198, 9, 16], [234, 12, 22]].map(([y, w, h], i) => <rect key={i} x={200 - w / 2} y={y} width={w} height={h} fill="#ffd23f" opacity=".85" />)}
      {/* เสาไฟข้างทาง */}
      {[[150, 122, .4], [96, 160, .7], [252, 122, .4], [312, 160, .7]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><rect x="-3" y="-90" width="6" height="90" fill="#2a2f48" /><path d="M0 -90 q0 -10 18 -10" stroke="#2a2f48" strokeWidth="5" fill="none" /><ellipse cx="20" cy="-98" rx="8" ry="4" fill="#ffe9a8" /><polygon points="12,-96 28,-96 44,-20 -4,-20" fill="#ffe9a8" opacity=".08" /></g>)}
      <rect className="if-red" width="400" height="260" fill="#ff2e4d" /><rect className="if-blue" width="400" height="260" fill="#2e6bff" />
      {/* ด่าน: ป้าย + ไฟหมุน + แผงกั้น + กรวย */}
      <g transform="translate(64 96)"><rect x="-4" y="0" width="8" height="120" fill="#3a3f55" /><rect x="-34" y="-14" width="68" height="16" rx="6" fill="#222" /><circle className="if-lr" cx="-17" cy="-6" r="9" fill="#ff2e4d" /><circle className="if-lb" cx="17" cy="-6" r="9" fill="#2e6bff" />
        <circle className="if-lr" cx="-17" cy="-6" r="22" fill="#ff2e4d" opacity=".3" /><circle className="if-lb" cx="17" cy="-6" r="22" fill="#2e6bff" opacity=".3" />
        <rect x="-46" y="22" width="92" height="30" rx="5" fill="#ffd23f" stroke="#1a1400" strokeWidth="2" /><text y="43" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1a1400" fontFamily={K}>ด่านตรวจ</text></g>
      <g transform="translate(110 196)"><rect x="-6" y="0" width="5" height="22" fill="#ccc" /><rect x="70" y="0" width="5" height="22" fill="#ccc" />{[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={-8 + i * 14} y="-4" width="14" height="10" fill={i % 2 ? '#fff' : '#ff3b3b'} />)}</g>
      {[[134, 200], [168, 206], [272, 208]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><path d="M-9 0 L0 -26 L9 0 Z" fill="#ff7a2e" /><path d="M-5 -10 H5" stroke="#fff" strokeWidth="3" /><rect x="-12" y="-1" width="24" height="4" fill="#ff7a2e" /></g>)}
      {/* รอยยาง + ประกายไฟ */}
      <g className="if-skid"><path d="M186 186 Q190 170 196 158 M212 186 Q214 170 216 158" stroke="#0a0b14" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".8" /></g>
      {/* มอไซค์ */}
      <g transform="translate(200 150)"><g className="if-bike"><g className="if-brake"><g className="if-vib">
        <ellipse cx="0" cy="-6" rx="70" ry="50" fill="url(#ifHead)" />
        {[0, 1, 2].map(i => <circle key={i} className="if-exh" style={{ animationDelay: i * 0.18 + 's' }} cx={-30} cy={30} r="7" fill="#8a8fb0" />)}
        {/* ล้อหลัง + ท่อ (โผล่ข้างหลัง) */}
        <rect x="-7" y="16" width="14" height="26" rx="6" fill="#0c0c12" /><rect x="-30" y="22" width="16" height="6" rx="3" fill="#9aa3b8" stroke={OL} strokeWidth="1.4" />
        {/* คนซ้อน (นั่งหลัง โผล่หัวเหนือไหล่คนขับ) + กระเป๋าบนหลัง */}
        <Person id="teen-b" color={11} size={40} x={20} y={2} />
        <g transform="translate(38 -24)"><g className="if-bag"><g className="if-peek"><rect x="-3" y="-30" width="6" height="22" rx="3" fill="#9aa3b8" stroke={OL} strokeWidth="1.6" /><circle cx="6" cy="-20" r="4.5" fill="#ff7a2e" stroke={OL} strokeWidth="1.4" /><path d="M-8 -24 l-4 -6" stroke="#ffd23f" strokeWidth="2" /></g>
          <rect x="-12" y="-14" width="26" height="30" rx="7" fill="#3a8a4a" stroke={OL} strokeWidth="2.4" /><rect x="-6" y="-2" width="14" height="9" rx="2" fill="#2d6b3a" stroke={OL} strokeWidth="1.6" /><path d="M-10 -12 q13 -10 22 0" stroke={OL} strokeWidth="2" fill="none" /></g></g>
        {/* คนขับ: ครึ่งล่างจมหลังบังโคลน = นั่งคร่อม */}
        <Person id="teen-a" color={3} size={44} x={0} y={22} />
        <path d="M-19 -24 Q-20 -43 0 -44 Q20 -43 19 -24 Q0 -29 -19 -24 Z" fill="#ff3b3b" stroke={OL} strokeWidth="2" /><path d="M-14 -36 Q0 -41 14 -36" stroke="#fff" strokeWidth="2" fill="none" opacity=".6" />
        {/* เท้าวางบนพักเท้า */}
        <ellipse cx="-25" cy="27" rx="7" ry="4" fill="#2a2440" /><ellipse cx="25" cy="27" rx="7" ry="4" fill="#2a2440" />
        {/* ล้อหน้า + บังโคลน + ไฟหน้า */}
        <rect x="-8" y="22" width="16" height="22" rx="7" fill="#111" /><rect x="-3" y="26" width="6" height="14" rx="3" fill="#555" />
        <path d="M-23 -2 Q0 -9 23 -2 L19 25 Q0 31 -19 25 Z" fill="#d6283d" stroke={OL} strokeWidth="2" strokeLinejoin="round" />
        <path d="M-14 -3 L-12 -9 Q0 -12 12 -9 L14 -3 Z" fill="#bfe6ff" opacity=".55" stroke={OL} strokeWidth="1.4" />
        <circle cx="0" cy="9" r="8" fill="#fff6c8" stroke={OL} strokeWidth="1.6" /><circle cx="-2.5" cy="6.5" r="2.4" fill="#fff" />
        <rect x="-21" y="15" width="7" height="4" rx="2" fill="#ffb03a" /><rect x="14" y="15" width="7" height="4" rx="2" fill="#ffb03a" />
        {/* แฮนด์ + กระจกมองข้าง + มือจับแฮนด์ */}
        <path d="M-34 -8 Q0 -2 34 -8" stroke="#2a2a33" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M-25 -6 L-31 -22 M25 -6 L31 -22" stroke="#2a2a33" strokeWidth="2" /><ellipse cx="-32" cy="-25" rx="5" ry="3.6" fill="#9fd3ff" stroke={OL} strokeWidth="1.4" /><ellipse cx="32" cy="-25" rx="5" ry="3.6" fill="#9fd3ff" stroke={OL} strokeWidth="1.4" />
        <circle cx="-31" cy="-8" r="4.5" fill="#ffb46e" stroke={OL} strokeWidth="1.6" /><circle cx="31" cy="-8" r="4.5" fill="#ffb46e" stroke={OL} strokeWidth="1.6" />
        <Drop x={-24} y={-36} cls="d30" /><Drop x={30} y={-54} cls="d33" />
      </g></g></g></g>
      <g className="if-spark">{[0, 1, 2, 3, 4].map(i => <path key={i} d={`M${170 + i * 14} 186 l${-8 + i * 4} -14`} stroke="#ffd23f" strokeWidth="2.4" strokeLinecap="round" />)}</g>
      <g className="if-smoke">{[0, 1, 2, 3].map(i => <circle key={i} cx={176 + i * 16} cy={186 - (i % 2) * 6} r={10 + (i % 2) * 4} fill="#c9c2dd" opacity=".55" />)}</g>
      {/* จ่า + ไฟฉาย */}
      <g transform="translate(326 222)">
        <g className="if-torch"><polygon points="-30,-60 -150,-110 -150,-60" fill="#fff6c8" opacity=".28" /></g>
        <Person id="cop-1" color={9} size={84} x={0} y={0} />
        <path d="M-28 -104 Q0 -126 28 -104 L24 -96 H-24 Z" fill="#1c2a6a" stroke={OL} strokeWidth="2" /><rect x="-30" y="-98" width="60" height="7" rx="3" fill="#0e1640" /><circle cx="0" cy="-108" r="5" fill="#ffd23f" />
        <path d="M-20 -46 L0 -24 L20 -46" stroke="#d9ff3f" strokeWidth="6" fill="none" strokeLinecap="round" />
        <g className="if-wave"><path d="M-34 -48 L-62 -86" stroke="#ff7a2e" strokeWidth="7" strokeLinecap="round" /><path d="M-56 -78 L-62 -86" stroke="#fff6c8" strokeWidth="7" strokeLinecap="round" /></g>
        <g transform="translate(14 -66)"><rect x="-2" y="-3" width="12" height="7" rx="3" fill="#c0c6d6" stroke={OL} strokeWidth="1.4" /></g>
      </g>
      <Bang x={356} y={92} t="ปี๊ด!" c="#ffd23f" st={OL} s={20} cls="d26" />
      <Bang x={366} y={68} t="ปี๊ดด!" c="#ffd23f" st={OL} s={22} cls="d285" />
      <g transform="translate(196 36)"><g className="if-pop d26"><path d="M0 12 Q0 0 12 0 H104 Q116 0 116 12 V28 Q116 40 104 40 H74 L86 56 L58 40 H12 Q0 40 0 28 Z" fill="#fff" stroke={OL} strokeWidth="2" /><text x="58" y="27" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1c2a6a" fontFamily={K}>จอดก่อน!</text></g></g>
      <Bang x={250} y={100} t="?" c="#ffd23f" st={OL} s={28} cls="d36" />
    </g></g>
  </>;
}

// ---------- 💼 ฉากจบ: ปิดดีล — ผู้ชนะเป็นเจ้าสัว ----------
// 0–1.0 เวทีมืด สปอตไลต์ 2 ดวงกวาดหา (กลองรัว) • 1.0 ไฟลงกลางเวที ผู้ชนะเด้งขึ้นแท่น รัศมีทองหมุน • 1.3 หมวกบอสตกลงหัว ป๊อก! ประกาย
// 1.6 ป้าย "เจ้าสัวคนใหม่!" + ริบบิ้นชื่อ • 1.8– โปรยแบงก์จากมือ + ฝนแบงก์/เหรียญทั้งจอ • กล้องดันเข้าช้า ๆ
const Bill = ({ c = '#5fbf72' }) => <g><rect x="-15" y="-8" width="30" height="16" rx="2" fill={c} stroke="#1f5a2c" strokeWidth="1.6" /><rect x="-12" y="-5" width="24" height="10" rx="1.5" fill="none" stroke="#e9ffe9" strokeWidth="1" opacity=".7" /><circle r="4.2" fill="#e9ffe9" opacity=".85" /><text y="3" textAnchor="middle" fontSize="7" fontWeight="900" fill="#1f5a2c" fontFamily={K}>฿</text></g>;
const Coin = () => <g><circle r="7" fill="#ffcf3a" stroke="#b07a10" strokeWidth="1.6" /><circle r="4.4" fill="none" stroke="#fff3b0" strokeWidth="1.2" /><path d="M-3 -3 l2 -1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></g>;
const BossHat = () => <g>
  <ellipse cx="0" cy="0" rx="40" ry="8" fill="#16131f" stroke="#000" strokeWidth="2" />
  <path d="M-25 -2 L-22 -50 Q0 -56 22 -50 L25 -2 Z" fill="#221d30" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
  <path d="M-24 -14 Q0 -8 24 -14 L24.6 -4 Q0 2 -24.6 -4 Z" fill="#ffcf3a" stroke="#b07a10" strokeWidth="1.4" />
  <ellipse cx="0" cy="-51" rx="22" ry="5" fill="#2e2742" stroke="#000" strokeWidth="2" />
  <path d="M-16 -44 Q-14 -30 -16 -18" stroke="#ffffff30" strokeWidth="4" strokeLinecap="round" fill="none" />
  <g transform="translate(14 -9)"><circle r="6.5" fill="#ffcf3a" stroke="#b07a10" strokeWidth="1.4" /><text y="3.2" textAnchor="middle" fontSize="9" fontWeight="900" fill="#8a5a00" fontFamily={K}>$</text></g>
</g>;
const Sparkle = ({ x, y, s = 1, d = 0 }) => <g transform={`translate(${x} ${y}) scale(${s})`}><path className="if-glint" style={{ animationDelay: d + 's' }} d="M0 -10 L2.4 -2.4 L10 0 L2.4 2.4 L0 10 L-2.4 2.4 L-10 0 L-2.4 -2.4 Z" fill="#fff6c8" /></g>;
const RAIN = Array.from({ length: 26 }, (_, i) => ({ x: 8 + (i * 61) % 390, d: 1.75 + (i % 9) * 0.27 + Math.floor(i / 9) * 0.11, dur: 2.1 + (i % 4) * 0.35, sw: (i % 2 ? 1 : -1) * (10 + (i % 3) * 7), r: (i % 2 ? 1 : -1) * (30 + (i * 23) % 60), coin: i % 4 === 3, c: i % 5 === 2 ? '#7fd08a' : '#5fbf72' }));
const TOSS = Array.from({ length: 9 }, (_, i) => ({ dx: -150 + i * 38, dy: -70 - (i % 3) * 22, d: 1.8 + i * 0.16, r: (i % 2 ? 1 : -1) * (180 + i * 30) }));
function DealWin({ res, av, nameOf }) {
  const id = res?.winner; const a = (id && av?.(id)) || { look: lookFromId(id || 'boss'), c: 4 }; const name = id ? nameOf?.(id) || '' : '';
  const S = 110;
  return <>
    <defs>
      <linearGradient id="ifDw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a0f2e" /><stop offset="1" stopColor="#3a1f3a" /></linearGradient>
      <radialGradient id="ifSpot" cx=".5" cy="0"><stop offset="0" stopColor="#fff6c8" stopOpacity=".55" /><stop offset="1" stopColor="#fff6c8" stopOpacity="0" /></radialGradient>
      <linearGradient id="ifGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff2a8" /><stop offset=".5" stopColor="#ffcf3a" /><stop offset="1" stopColor="#c98a10" /></linearGradient>
      <linearGradient id="ifCarpet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c0213a" /><stop offset="1" stopColor="#7a1024" /></linearGradient>
    </defs>
    <g className="if-cam dw">
      <rect width="400" height="260" fill="url(#ifDw)" />
      {/* หน้าต่างกระจกบานใหญ่ เห็นตึกระฟ้า */}
      <g opacity=".9">{[0, 1, 2, 3].map(i => <g key={i}><rect x={20 + i * 92} y="20" width="84" height="150" fill="#0d1030" stroke="#3a2a4a" strokeWidth="4" />
        {[[8, 70, 18], [30, 40, 22], [56, 90, 20]].map(([x, h, w], j) => <g key={j}><rect x={20 + i * 92 + x} y={170 - h} width={w} height={h} fill="#1c2050" />{Array.from({ length: Math.floor(h / 14) }, (_, k) => <rect key={k} className={(i + j + k) % 3 ? '' : 'if-twk'} x={20 + i * 92 + x + 4 + (k % 2) * 8} y={176 - h + k * 12} width="4" height="5" fill="#ffd877" opacity={(i + k) % 2 ? .8 : .4} />)}</g>)}</g>)}</g>
      <rect x="0" y="16" width="400" height="6" fill="#4a3050" />
      {/* ม่านแดงสองข้าง */}
      <path d="M0 0 H46 C40 60 48 140 30 214 H0 Z" fill="#9a1a32" /><path d="M8 0 C12 60 6 140 14 214" stroke="#c0213a" strokeWidth="6" fill="none" />
      <path d="M400 0 H354 C360 60 352 140 370 214 H400 Z" fill="#9a1a32" /><path d="M392 0 C388 60 394 140 386 214" stroke="#c0213a" strokeWidth="6" fill="none" />
      <path d="M0 0 H400 V14 Q300 26 200 14 Q100 26 0 14 Z" fill="#7a1024" /><path d="M0 12 Q100 24 200 12 Q300 24 400 12" stroke="#ffcf3a" strokeWidth="2" fill="none" />
      {/* รัศมีทองหมุนหลังผู้ชนะ */}
      <g transform="translate(200 120)"><g className="if-rays">{Array.from({ length: 16 }, (_, i) => <path key={i} d="M0 0 L-14 -190 L14 -190 Z" fill="#ffcf3a" opacity={i % 2 ? .14 : .26} transform={`rotate(${i * 22.5})`} />)}</g></g>
      {/* พื้นเวที + พรมแดง */}
      <rect y="206" width="400" height="54" fill="#2a1830" /><path d="M150 206 H250 L300 260 H100 Z" fill="url(#ifCarpet)" /><path d="M150 206 L100 260 M250 206 L300 260" stroke="#ffcf3a" strokeWidth="2" />
      {/* กองเงิน/ทองคำสองข้าง */}
      {[[86, 1], [314, -1]].map(([x, f], i) => <g key={i} transform={`translate(${x} 214)`}>
        {[0, 1, 2, 3].map(j => <g key={j} transform={`translate(${(j % 2) * 10 * f} ${-j * 7})`}><rect x="-17" y="-7" width="34" height="8" rx="1.5" fill="#5fbf72" stroke="#1f5a2c" strokeWidth="1.4" /><rect x="-4" y="-7" width="8" height="8" fill="#e9ffe9" /></g>)}
        <g transform={`translate(${-24 * f} 2)`}><path d="M-14 0 L-9 -10 H9 L14 0 Z" fill="url(#ifGold)" stroke="#b07a10" strokeWidth="1.4" /><path d="M-6 -16 L-3 -24 H9 L12 -16 Z" fill="url(#ifGold)" stroke="#b07a10" strokeWidth="1.4" transform="translate(-3 6)" /></g>
        <Sparkle x={-10 * f} y={-36} s={.7} d={i * .4} /></g>)}
      {/* แท่น No.1 */}
      <g transform="translate(200 214)"><rect x="-46" y="-24" width="92" height="30" rx="4" fill="url(#ifGold)" stroke="#8a5a00" strokeWidth="2" /><rect x="-50" y="-28" width="100" height="7" rx="3" fill="#fff2a8" stroke="#8a5a00" strokeWidth="1.6" />
        <text y="-3" textAnchor="middle" fontSize="15" fontWeight="900" fill="#8a5a00" fontFamily={K}>No.1</text></g>
      {/* ผู้ชนะ */}
      <g transform="translate(200 188) scale(.75)"><g className="if-rise"><g className="if-swag">
        <Char look={a.look} color={a.c} full size={S} x={-S / 2} y={-S * 1.4} />
        <path d="M-22 -86 Q0 -66 22 -86" stroke="#ffcf3a" strokeWidth="4" fill="none" strokeLinecap="round" /><g transform="translate(0 -70)"><circle r="8" fill="url(#ifGold)" stroke="#8a5a00" strokeWidth="1.6" /><text y="3.4" textAnchor="middle" fontSize="10" fontWeight="900" fill="#8a5a00" fontFamily={K}>$</text></g>
        <g transform="translate(46 -46)"><g className="if-fan">{[-30, -12, 6, 24].map((r, i) => <g key={i} transform={`rotate(${r}) translate(0 -12)`}><Bill c={i % 2 ? '#7fd08a' : '#5fbf72'} /></g>)}</g></g>
        <g transform="translate(0 -130)"><g className="if-hatdrop"><BossHat /></g></g>
      </g></g></g>
      {/* แบงก์ที่โปรยออกจากมือ */}
      <g transform="translate(234 150)">{TOSS.map((t, i) => <g key={i} className="if-toss" style={{ '--dx': t.dx + 'px', '--dy': t.dy + 'px', '--r': t.r + 'deg', animationDelay: t.d + 's' }}><Bill /></g>)}</g>
      {/* ฝนเงินทั้งจอ */}
      {RAIN.map((m, i) => <g key={i} transform={`translate(${m.x} -20)`}><g className="if-rain" style={{ animationDelay: m.d + 's', animationDuration: m.dur + 's' }}><g className="if-flutter" style={{ '--sw': m.sw + 'px', '--r': m.r + 'deg' }}>{m.coin ? <g className="if-coinspin"><Coin /></g> : <Bill c={m.c} />}</g></g></g>)}
      <Sparkle x={160} y={36} s={1.1} d={1.45} /><Sparkle x={244} y={44} s={.8} d={1.6} /><Sparkle x={226} y={22} s={.6} d={1.75} />
    </g>
    {/* สปอตไลต์ */}
    <g className="if-spotL"><polygon points="60,-10 90,-10 230,250 110,250" fill="url(#ifSpot)" /></g>
    <g className="if-spotR"><polygon points="310,-10 340,-10 290,250 170,250" fill="url(#ifSpot)" /></g>
    <rect className="if-dwdark" width="400" height="260" fill="#05030c" />
    <rect className="if-dwflash" width="400" height="260" fill="#fff6c8" />
    {/* ป้าย + ชื่อ */}
    <g transform="translate(200 26)"><g className="if-title">
      <text textAnchor="middle" y="8" fontSize="27" fontWeight="900" fill="url(#ifGold)" stroke="#5a2a00" strokeWidth="5" paintOrder="stroke" fontFamily={K}>เจ้าสัวคนใหม่!</text>
    </g></g>
    {name && <g transform="translate(200 244)"><g className="if-ribbon">
      <path d="M-86 -12 H86 L76 0 L86 12 H-86 L-76 0 Z" fill="#c0213a" stroke="#7a1024" strokeWidth="2" /><path d="M-70 -12 H70 V12 H-70 Z" fill="#e0304a" />
      <text y="5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff" fontFamily={K}>👑 {name}</text></g></g>}
  </>;
}
const SCENES = { 'deal-win': DealWin, cake: CakeIntro, 'cake-caught': CakeCaught, 'cake-escape': CakeEscape, checkpoint: Checkpoint };

export default function IntroFilm({ id, sound, onDone, res, av, nameOf }) {
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
  const [h, sub0] = CAPTION[id] || []; const sub = typeof sub0 === 'function' ? sub0(res?.winner ? nameOf?.(res.winner) : '') : sub0;
  return <div className={'intro-film' + (leaving ? ' leaving' : '')} role="dialog" aria-label="ฉากเปิดเกม">
    <div className="if-frame">
      <svg className="if-svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><S res={res} av={av} nameOf={nameOf} /></svg>
      <div className="if-cap"><b>{h}</b><span>{sub}</span></div>
    </div>
    <button className="intro-skip" onClick={e => { e.stopPropagation(); close(); }}>ข้าม ⏭</button>
  </div>;
}
