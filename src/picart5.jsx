// ภาพการ์ด 101–125 • [สีบน, สีล่าง, ชื่อภาพ, เนื้อภาพ] • viewBox 120x160
import React from 'react';
import { Stars, Cloud, Glow, Pine, Bird, Lines } from './picbits.jsx';

const ink = { fill: 'none', stroke: '#2b2b2b', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const ART5 = [
  ['#fbf7ef', '#f1e9da', 'ขนนกตกบนแมวหลับ', <>
    <g {...ink}><path d="M24 124Q22 100 50 98Q84 96 94 116Q98 128 84 130H34Q24 130 24 124Z" /><path d="M86 116q-6-10 2-16l4 6 6-6q4 8-2 16" /><path d="M84 112q2 2 4 0M92 112q2 2 4 0" /><path d="M34 130q-14 0-16-10q0-6 6-4" /><path d="M10 134H110" /></g>
    <g {...ink} stroke="#8a6d4b"><path d="M70 40Q60 56 64 76" /><path d="M66 46q-8 2-12 8M65 54q-8 2-11 8M65 62q-6 2-9 7M67 46q8-2 12 4M66 54q8 0 11 6M66 62q6 0 8 6" /></g>
    <path d="M58 30q2-4 4 0M52 22q2-4 4 0" {...ink} strokeWidth=".8" />
  </>],
  ['#d8f3dc', '#95d5b2', 'ตู้จดหมายล้น', <>
    <rect x="56" y="80" width="6" height="70" fill="#6b4226" /><rect y="148" width="120" height="12" fill="#52b788" />
    <path d="M34 60H82V86H34Z" fill="#457b9d" /><path d="M34 60a24 14 0 0 1 48 0" fill="#1d3557" /><rect x="82" y="58" width="3" height="16" fill="#e63946" /><rect x="82" y="58" width="12" height="7" fill="#e63946" />
    {[[30, 62, -20], [40, 54, -8], [52, 52, 6], [26, 74, -32]].map(([x, y, r], i) => <g key={i} transform={`rotate(${r} ${x} ${y})`}><rect x={x - 10} y={y - 6} width="20" height="13" fill="#fff" stroke="#ccc" /><path d={`M${x - 10} ${y - 6}l10 7l10-7`} stroke="#ccc" fill="none" /></g>)}
    <g transform="rotate(22 30 128)"><rect x="18" y="122" width="22" height="14" fill="#fff" stroke="#ccc" /><path d="M29 132l-4-4a2.5 2.5 0 0 1 4-3a2.5 2.5 0 0 1 4 3z" fill="#e63946" /></g>
    <g transform="rotate(-12 90 136)"><rect x="80" y="130" width="20" height="13" fill="#fff" stroke="#ccc" /></g>
  </>],
  ['#ffe5b4', '#ffc971', 'กบรอรถเมล์', <>
    <path d="M0 120Q60 108 120 122V160H0Z" fill="#90be6d" /><rect y="128" width="120" height="12" fill="#a68a64" />
    <rect x="14" y="70" width="3" height="60" fill="#555" /><rect x="8" y="64" width="15" height="10" rx="2" fill="#f94144" />
    <path d="M30 90H96V94H30Z" fill="#8d6e63" /><rect x="32" y="94" width="3" height="34" fill="#6d4c41" /><rect x="92" y="94" width="3" height="34" fill="#6d4c41" /><rect x="30" y="112" width="66" height="4" fill="#8d6e63" />
    <ellipse cx="66" cy="104" rx="20" ry="12" fill="#43aa8b" /><circle cx="56" cy="92" r="6" fill="#43aa8b" /><circle cx="76" cy="92" r="6" fill="#43aa8b" /><circle cx="56" cy="92" r="3" fill="#fff" /><circle cx="76" cy="92" r="3" fill="#fff" /><circle cx="57" cy="92" r="1.5" fill="#222" /><circle cx="77" cy="92" r="1.5" fill="#222" />
    <path d="M58 106q8 4 16 0" stroke="#2d6a4f" fill="none" /><path d="M50 116q-6 6-8 12M82 116q6 6 8 12" stroke="#43aa8b" strokeWidth="4" strokeLinecap="round" />
    <path d="M84 94v-14" stroke="#555" /><path d="M72 82Q84 68 96 82Z" fill="#f9c74f" />
    <rect x="98" y="114" width="10" height="14" rx="1" fill="#6d4c41" />
  </>],
  ['#2b2d42', '#8d99ae', 'ฟ้าผ่าแล้วดอกไม้บาน', <>
    <g fill="#1d1e2c"><circle cx="40" cy="20" r="18" /><circle cx="70" cy="14" r="20" /><circle cx="100" cy="24" r="16" /></g>
    <polygon points="62,26 54,44 62,44 52,66 70,40 62,40 68,26" fill="#ffd60a" />
    <rect y="140" width="120" height="20" fill="#3a5a40" />
    <path d="M54 140V96L40 78M58 104L76 82M56 116L36 104" stroke="#5c4033" strokeWidth="5" fill="none" strokeLinecap="round" />
    {[[40, 76, '#ff8fab'], [76, 80, '#ffd6e0'], [36, 102, '#ff8fab'], [52, 70, '#fff'], [66, 90, '#ff8fab'], [28, 90, '#fff'], [84, 72, '#ff8fab']].map(([x, y, c], i) => <g key={i} fill={c}><circle cx={x} cy={y} r="4" /><circle cx={x + 3} cy={y + 3} r="3" /></g>)}
    <Glow x={56} y={70} r={20} f="#ffd60a" o={.2} />
  </>],
  ['#3c096c', '#ff9e00', 'แบกพระจันทร์ขึ้นเขา', <>
    <Stars p={[10, 10, 40, 20, 100, 14, 20, 50, 110, 60]} />
    <path d="M0 160V140L80 80L120 70V160Z" fill="#240046" />
    <circle cx="64" cy="70" r="18" fill="#fff4c2" /><Glow x={64} y={70} r={30} f="#fff4c2" o={.2} />
    <circle cx="66" cy="92" r="3.5" fill="#10002b" /><path d="M64 96l-2 10 6 6M63 100l-6 8" stroke="#10002b" strokeWidth="3" strokeLinecap="round" fill="none" /><path d="M66 94l4-8" stroke="#10002b" strokeWidth="2.5" strokeLinecap="round" />
  </>],
  ['#f0efeb', '#d8e2dc', 'เส้นเชือกหุ่นกระบอก', <>
    <path d="M30 20Q60 4 90 20L86 30Q60 22 34 30Z" fill="#f1c27d" /><path d="M36 24q-4-10 4-14M52 18q0-12 6-14M70 18q2-12 8-12M86 24q4-8 0-14" stroke="#f1c27d" strokeWidth="5" strokeLinecap="round" fill="none" />
    <Lines p={[40, 14, 44, 76, 58, 6, 52, 92, 76, 8, 72, 92, 88, 14, 80, 74]} c="#555" w={.6} />
    <circle cx="60" cy="64" r="8" fill="#e76f51" /><path d="M54 72h12l2 22h-16z" fill="#2a9d8f" /><path d="M54 76l-10 0M66 76l14-2M56 94l-4 26M64 94l8 26" stroke="#2a9d8f" strokeWidth="4" strokeLinecap="round" />
    <circle cx="58" cy="63" r="1" fill="#222" /><circle cx="63" cy="63" r="1" fill="#222" /><path d="M57 67q3 2 6 0" stroke="#222" fill="none" />
    <ellipse cx="60" cy="140" rx="28" ry="4" fill="#000" opacity=".1" />
  </>],
  ['#ffe5ec', '#ffc2d1', 'งานเลี้ยงน้ำชาคนเดียว', <>
    <rect y="110" width="120" height="50" fill="#e5989b" />
    <ellipse cx="60" cy="108" rx="54" ry="14" fill="#fff" /><path d="M8 108v8q52 18 104 0v-8" fill="#f8edeb" />
    {[[20, 96], [44, 92], [76, 92], [100, 96]].map(([x, y], i) => <g key={i}><path d={`M${x - 6} ${y}h12l-2 8h-8z`} fill="#fff" stroke="#e5989b" /><ellipse cx={x} cy={y + 9} rx="8" ry="2" fill="#fff" stroke="#e5989b" /></g>)}
    <path d="M54 84h12l-2 10h-8zM66 86q4 0 4 4" fill="#ffafcc" stroke="#c9184a" /><path d="M58 80q2-6 0-10M62 80q2-6 0-10" stroke="#aaa" fill="none" />
    <circle cx="60" cy="126" r="0" /><path d="M48 112q12 4 24 0" stroke="#ffc2d1" fill="none" />
    {[[10, 62], [36, 54], [84, 54], [110, 62]].map(([x, y], i) => <path key={i} d={`M${x - 6} ${y}h12v18h-12z M${x - 6} ${y + 18}v14 M${x + 6} ${y + 18}v14`} stroke="#9d8189" strokeWidth="2" fill="none" />)}
    <circle cx="60" cy="56" r="7" fill="#f1c27d" /><path d="M52 64h16v18h-16z" fill="#c9184a" />
  </>],
  ['#caffbf', '#9bf6ff', 'จอยเกมที่ดอกไม้งอก', <>
    <rect y="134" width="120" height="26" fill="#80b918" />
    <path d="M24 110Q22 96 36 96H84Q98 96 96 110L92 128Q90 136 80 132L72 124H48L40 132Q30 136 28 128Z" fill="#6c757d" />
    <path d="M36 106h10M41 101v10" stroke="#222" strokeWidth="3" /><circle cx="80" cy="104" r="3" fill="#ef476f" /><circle cx="86" cy="110" r="3" fill="#ffd166" />
    <path d="M60 96Q58 70 62 50M60 80q-12-6-16 2q8 4 16-2M62 66q10-8 16 0q-8 6-16 0" stroke="#55a630" strokeWidth="1.5" fill="#80b918" />
    <g fill="#ff70a6"><circle cx="62" cy="44" r="4" /><circle cx="68" cy="48" r="4" /><circle cx="56" cy="48" r="4" /><circle cx="62" cy="52" r="4" /></g><circle cx="62" cy="48" r="2.5" fill="#ffd60a" />
    <path d="M60 96Q62 120 50 136" stroke="#333" fill="none" />
  </>],
  ['#22223b', '#4a4e69', 'ชามแตกต่อด้วยทอง', <>
    <path d="M18 70H102Q100 120 60 124Q20 120 18 70Z" fill="#e9ecef" /><ellipse cx="60" cy="70" rx="42" ry="8" fill="#ced4da" />
    <path d="M40 72L48 92L42 106L50 120M72 76L66 96L78 110M48 92L66 96" stroke="#e9c46a" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
    <Glow x={58} y={96} r={30} f="#e9c46a" o={.12} />
    <ellipse cx="60" cy="126" rx="26" ry="3" fill="#000" opacity=".3" />
  </>],
  ['#14213d', '#1d3557', 'โหลหิ่งห้อยริมหน้าต่าง', <>
    <rect x="10" y="10" width="100" height="100" fill="#0b132b" /><Stars p={[20, 20, 50, 30, 90, 20, 100, 60, 30, 70]} /><path d="M86 30a10 10 0 1 0 8 14a8 8 0 1 1-8-14z" fill="#fff4c2" />
    <Lines p={[60, 10, 60, 110, 10, 60, 110, 60]} c="#3d405b" w={4} /><rect x="6" y="6" width="108" height="108" fill="none" stroke="#3d405b" strokeWidth="6" />
    <rect y="110" width="120" height="50" fill="#6b4a3a" />
    <path d="M40 112V86Q40 80 46 80H70Q76 80 76 86V112Z" fill="#a8dadc" opacity=".35" stroke="#e0fbfc" /><rect x="42" y="74" width="32" height="7" rx="2" fill="#8d6e63" />
    <Glow x={58} y={96} r={26} f="#d9ff6b" o={.25} />
    <g fill="#e6ff6b"><circle cx="50" cy="96" r="1.4" /><circle cx="60" cy="88" r="1.4" /><circle cx="66" cy="102" r="1.4" /><circle cx="54" cy="106" r="1.4" /><circle cx="68" cy="92" r="1.4" /></g>
    <circle cx="90" cy="96" r="1.4" fill="#e6ff6b" /><circle cx="100" cy="86" r="1" fill="#e6ff6b" />
  </>],
  ['#ffb4a2', '#e5989b', 'มองวิวจากหน้าต่างรถไฟ', <>
    <rect x="16" y="24" width="88" height="70" rx="8" fill="#ffcdb2" />
    <path d="M16 70L40 54L60 64L84 46L104 58V94H16Z" fill="#6d597a" /><path d="M16 84L50 76L104 86V94H16Z" fill="#355070" />
    <circle cx="80" cy="40" r="7" fill="#fff3b0" /><Lines p={[30, 60, 26, 60, 92, 72, 86, 72]} c="#fff" o={.5} />
    <rect y="0" width="120" height="24" fill="#3d2c2e" /><rect y="94" width="120" height="66" fill="#3d2c2e" /><rect x="0" y="0" width="16" height="160" fill="#3d2c2e" /><rect x="104" y="0" width="16" height="160" fill="#3d2c2e" />
    <rect x="10" y="94" width="100" height="6" fill="#7f5539" />
    <circle cx="36" cy="78" r="10" fill="#1d1416" /><path d="M20 100Q22 86 36 86Q50 86 52 100Z" fill="#1d1416" />
    <path d="M70 100q0-6 6-6h8q6 0 6 6" fill="#e5989b" /><path d="M88 98q6-2 6 2" stroke="#e5989b" fill="none" />
  </>],
  ['#90e0ef', '#f6e7cb', 'ขวดจดหมายบนชายหาด', <>
    <rect y="0" width="120" height="56" fill="#caf0f8" /><Cloud x={30} y={22} /><circle cx="96" cy="24" r="10" fill="#fff3b0" />
    <path d="M0 56H120V80Q90 74 60 82T0 78Z" fill="#00b4d8" /><path d="M0 78Q30 84 60 82T120 80" stroke="#fff" strokeWidth="3" fill="none" opacity=".8" />
    <g transform="rotate(-24 60 116)"><rect x="40" y="108" width="34" height="16" rx="7" fill="#90be6d" opacity=".75" /><rect x="74" y="112" width="10" height="8" fill="#90be6d" opacity=".75" /><rect x="84" y="111" width="4" height="10" fill="#a47148" />
      <rect x="46" y="111" width="22" height="10" fill="#fff8e7" /><path d="M48 114h18M48 118h14" stroke="#c9a77c" /></g>
    <path d="M20 140q4-6 8 0l-4 3z" fill="#f4a261" /><path d="M96 136l4 4M100 136l-4 4" stroke="#e76f51" strokeWidth="2" />
  </>],
  ['#1b263b', '#0d1b2a', 'กุหลาบกระจกสี', <>
    <g stroke="#0d1b2a" strokeWidth="2.5"><path d="M60 40L44 52L48 70L60 76L72 70L76 52Z" fill="#e63946" /><path d="M60 40L60 58L44 52M60 58L76 52M60 58L48 70M60 58L72 70" fill="none" />
      <path d="M44 52L30 48L34 70L48 70Z" fill="#c1121f" /><path d="M76 52L90 48L86 70L72 70Z" fill="#c1121f" /><path d="M48 70L36 80L60 92L84 80L72 70L60 76Z" fill="#9d0208" />
      <path d="M58 92V150" fill="none" /><path d="M58 112L40 100L36 116Z" fill="#2d6a4f" /><path d="M58 126L80 114L82 130Z" fill="#40916c" />
      <path d="M10 10H110V150H10Z" fill="none" /><path d="M10 40L30 48M110 40L90 48M10 110L36 116M110 110L82 130M10 150L58 150L110 150" fill="none" /></g>
    <g opacity=".5"><path d="M12 12H108V38L90 48L76 40H44L30 48L12 38Z" fill="#457b9d" /><path d="M12 112L36 118L56 150H12Z" fill="#ffb703" /><path d="M108 112L84 132L60 150H108Z" fill="#457b9d" /></g>
  </>],
  ['#ddd', '#adb5bd', 'ใยแมงมุมกับหยดน้ำค้าง', <>
    <rect width="120" height="160" fill="#2b2d42" opacity=".85" />
    <g stroke="#e9ecef" strokeWidth=".6" fill="none" opacity=".8">
      {Array.from({ length: 10 }, (_, i) => <line key={i} x1="60" y1="76" x2={60 + 70 * Math.cos(i * .628)} y2={76 + 70 * Math.sin(i * .628)} />)}
      {[10, 18, 26, 34, 42, 50].map(r => <polygon key={r} points={Array.from({ length: 10 }, (_, i) => `${60 + r * Math.cos(i * .628)},${76 + r * Math.sin(i * .628)}`).join(' ')} />)}</g>
    <g fill="#bde0fe">{[[78, 64], [44, 92], [60, 50], [92, 92], [34, 64], [70, 110]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" />)}</g>
    <g fill="#fff">{[[78, 63], [44, 91], [60, 49]].map(([x, y], i) => <circle key={i} cx={x - .6} cy={y - .6} r=".7" />)}</g>
    <ellipse cx="60" cy="76" rx="4" ry="5" fill="#111" /><circle cx="60" cy="70" r="2.5" fill="#111" /><path d="M56 74l-6-4M56 78l-7 2M64 74l6-4M64 78l7 2" stroke="#111" />
  </>],
  ['#ffc8dd', '#bde0fe', 'ภูเขาคัพเค้ก', <>
    <path d="M10 160L24 110H96L110 160Z" fill="#cdb4db" /><Lines p={[34, 110, 28, 160, 50, 110, 46, 160, 70, 110, 74, 160, 86, 110, 92, 160]} c="#a594c4" w={1.5} />
    <path d="M14 112Q10 92 30 90Q30 70 52 70Q56 46 70 50Q90 54 86 76Q106 80 104 100Q108 112 100 112Z" fill="#fff" />
    <path d="M30 90q10 6 20 0M52 70q10 6 18 0M86 76q-6 8-14 6" stroke="#ffc8dd" strokeWidth="2" fill="none" />
    <circle cx="66" cy="46" r="7" fill="#e63946" /><path d="M66 39q2-6 6-6" stroke="#2d6a4f" fill="none" />
    <g fill="#ffd166"><rect x="36" y="80" width="4" height="1.6" rx=".8" transform="rotate(30 38 81)" /><rect x="76" y="92" width="4" height="1.6" rx=".8" /><rect x="58" y="100" width="4" height="1.6" rx=".8" transform="rotate(-40 60 101)" /></g>
    <g transform="translate(46 90) rotate(-30)"><line x1="-6" y1="2" x2="6" y2="2" stroke="#e63946" strokeWidth="1.5" /><circle cx="0" cy="-3" r="2" fill="#222" /></g>
  </>],
  ['#0b090a', '#161a1d', 'บันไดเลื่อนสู่ความมืด', <>
    <polygon points="20,160 70,40 96,40 60,160" fill="#3d3d3d" />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={24 + i * 4.2} y1={150 - i * 10} x2={60 + i * 3} y2={150 - i * 10} stroke="#222" strokeWidth="1.5" />)}
    <path d="M18 160L68 40M62 160L98 40" stroke="#ba181b" strokeWidth="3" />
    <rect x="60" y="0" width="60" height="50" fill="#000" /><rect x="0" y="0" width="120" height="40" fill="#000" opacity=".8" />
    <circle cx="74" cy="34" r="1" fill="#e5383b" /><circle cx="78" cy="34" r="1" fill="#e5383b" />
    <circle cx="44" cy="112" r="3" fill="#d3d3d3" /><path d="M42 115h4v10h-4z" fill="#d3d3d3" />
  </>],
  ['#14213d', '#3d1a52', 'รถเข็นขายของกลางคืน', <>
    <Lines p={[0, 20, 120, 34]} c="#555" w={.6} />
    {[[14, 22, '#e63946'], [38, 25, '#ffd60a'], [62, 28, '#e63946'], [86, 31, '#ffd60a'], [108, 33, '#e63946']].map(([x, y, c], i) => <g key={i}><Glow x={x} y={y + 6} r={12} f={c} o={.2} /><ellipse cx={x} cy={y + 6} rx="5" ry="6" fill={c} /></g>)}
    <rect y="132" width="120" height="28" fill="#2b2d42" />
    <rect x="22" y="84" width="76" height="40" rx="3" fill="#2a9d8f" /><rect x="22" y="74" width="76" height="10" fill="#e9c46a" /><path d="M18 74L30 60H90L102 74Z" fill="#e76f51" />
    <circle cx="34" cy="128" r="8" fill="#333" /><circle cx="86" cy="128" r="8" fill="#333" /><circle cx="34" cy="128" r="3" fill="#888" /><circle cx="86" cy="128" r="3" fill="#888" />
    <path d="M40 74q0-8 6-8h8q6 0 6 8z" fill="#adb5bd" /><path d="M48 62q2-6 0-10M54 62q2-6 0-10" stroke="#ccc" fill="none" />
    <Glow x={60} y={80} r={40} f="#ffd166" o={.12} />
  </>],
  ['#f4a261', '#e9c46a', 'ช้างเมฆโปรยฝน', <>
    <g fill="#e9ecef"><ellipse cx="60" cy="44" rx="34" ry="20" /><circle cx="90" cy="36" r="14" /><circle cx="40" cy="32" r="12" /><circle cx="64" cy="28" r="14" /><ellipse cx="84" cy="40" rx="8" ry="12" fill="#dee2e6" /></g>
    <path d="M100 42q10 8 4 20q-2 4 2 6" stroke="#e9ecef" strokeWidth="6" fill="none" strokeLinecap="round" /><circle cx="94" cy="34" r="1.6" fill="#555" />
    <g fill="#e9ecef"><rect x="40" y="58" width="7" height="10" rx="3" /><rect x="72" y="58" width="7" height="10" rx="3" /></g>
    <Lines p={[44, 72, 42, 84, 56, 70, 54, 84, 68, 72, 66, 86, 80, 70, 78, 84, 106, 72, 104, 84]} c="#4cc9f0" w={1.4} />
    <path d="M0 110L20 104L40 112L60 102L80 110L100 104L120 110V160H0Z" fill="#bc6c25" />
    <Lines p={[10, 120, 22, 130, 30, 116, 40, 130, 70, 120, 66, 134, 90, 124, 100, 140]} c="#8a4b18" w={1} />
    <path d="M58 104v-10M58 98q-6-4-8 0q4 3 8 0M58 96q6-4 8 0q-4 3-8 0" stroke="#55a630" fill="#80b918" />
  </>],
  ['#03045e', '#0f0326', 'โคมลอยเหนือแม่น้ำ', <>
    <Stars p={[10, 10, 30, 30, 70, 8, 104, 22, 20, 60, 90, 50]} />
    {[[40, 40, 1.3], [80, 60, 1], [24, 80, .8], [100, 30, .7], [64, 96, .6], [50, 20, .5]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><Glow x={0} y={0} r={16} f="#ffb703" o={.25} /><path d="M-7-9H7L5 8H-5Z" fill="#ffb703" /><rect x="-3" y="6" width="6" height="2" fill="#ffe8a3" /></g>)}
    <rect y="116" width="120" height="44" fill="#0a0a3a" /><path d="M0 116Q60 108 120 116" stroke="#2b2b6b" fill="none" />
    <g fill="#ffb703" opacity=".4"><rect x="36" y="124" width="10" height="2" /><rect x="76" y="132" width="8" height="2" /><rect x="22" y="140" width="6" height="2" /></g>
    <path d="M0 116L20 110L30 116ZM90 116L104 106L120 116Z" fill="#000" />
  </>],
  ['#d8f3dc', '#b7e4c7', 'กบนั่งสมาธิบนใบบัว', <>
    <rect y="100" width="120" height="60" fill="#52b788" opacity=".5" />
    <path d="M14 126A46 14 0 1 0 106 126A46 14 0 0 0 64 112L60 126Z" fill="#2d6a4f" />
    <g fill="#ffafcc"><path d="M94 104q-6-14 0-22q6 8 0 22z" /><path d="M94 104q-14-6-16-16q12 2 16 16z" /><path d="M94 104q14-6 16-16q-12 2-16 16z" /></g>
    <ellipse cx="54" cy="114" rx="18" ry="10" fill="#80b918" /><circle cx="54" cy="96" r="12" fill="#80b918" /><circle cx="46" cy="88" r="5" fill="#80b918" /><circle cx="62" cy="88" r="5" fill="#80b918" />
    <path d="M43 88q3 2 6 0M59 88q3 2 6 0" stroke="#2d6a4f" fill="none" strokeWidth="1.2" /><path d="M48 100q6 3 12 0" stroke="#2d6a4f" fill="none" />
    <path d="M38 114q-8 0-6 8h12M70 114q8 0 6 8h-12" stroke="#80b918" strokeWidth="4" fill="none" strokeLinecap="round" />
    <Glow x={54} y={80} r={24} f="#fff" o={.2} />
  </>],
  ['#f8f9fa', '#e9ecef', 'ปลาสองตัววนเป็นวงกลม', <>
    <circle cx="60" cy="80" r="44" fill="#caf0f8" />
    <path d="M60 36A44 44 0 0 1 60 124A22 22 0 0 1 60 80A22 22 0 0 0 60 36Z" fill="#1d3557" />
    <path d="M60 36A22 22 0 0 0 60 80" fill="none" />
    <path d="M40 56q14-10 24 2l4-6-1 10-10-1 6-3q-8-8-18 0z" fill="#e63946" />
    <path d="M80 104q-14 10-24-2l-4 6 1-10 10 1-6 3q8 8 18 0z" fill="#ffd166" />
    <circle cx="60" cy="58" r="5" fill="#1d3557" /><circle cx="60" cy="102" r="5" fill="#caf0f8" />
  </>],
  ['#fff1e6', '#f8edeb', 'ยายถักเสื้อให้แมว', <>
    <rect y="124" width="120" height="36" fill="#d4a373" />
    <path d="M14 124Q12 88 40 84Q60 84 64 108L66 124Z" fill="#6d597a" /><circle cx="40" cy="70" r="12" fill="#f1d3c4" /><path d="M28 66a12 12 0 0 1 24-2q-6-6-12-6q-10 0-12 8z" fill="#e9ecef" /><circle cx="40" cy="58" r="5" fill="#e9ecef" />
    <circle cx="36" cy="70" r="2.5" fill="none" stroke="#333" /><circle cx="44" cy="70" r="2.5" fill="none" stroke="#333" /><path d="M38 76q2 1 4 0" stroke="#333" fill="none" />
    <path d="M52 100L76 92M54 104L78 98" stroke="#adb5bd" strokeWidth="1.3" /><path d="M58 98h14v12h-14z" fill="#e63946" /><path d="M58 102h14M58 106h14" stroke="#c1121f" />
    <g fill="#f4a261"><ellipse cx="94" cy="118" rx="12" ry="8" /><circle cx="92" cy="104" r="7" /><polygon points="86,101 87,94 91,99" /><polygon points="98,101 97,94 93,99" /></g>
    <path d="M86 112h14v8h-14z" fill="#e63946" opacity=".9" /><circle cx="90" cy="104" r="1" fill="#222" /><circle cx="95" cy="104" r="1" fill="#222" />
    <circle cx="20" cy="138" r="7" fill="#e63946" /><path d="M20 138Q50 150 64 110" stroke="#e63946" fill="none" />
  </>],
  ['#3a0ca3', '#7209b7', 'กุญแจกับแม่กุญแจหัวใจ', <>
    <Stars p={[10, 14, 104, 20, 20, 140, 100, 130]} f="#f72585" r={1} />
    <path d="M44 66V52a16 16 0 0 1 32 0V66" stroke="#adb5bd" strokeWidth="6" fill="none" />
    <path d="M60 116L30 86A16 16 0 0 1 60 66A16 16 0 0 1 90 86Z" fill="#f72585" /><circle cx="60" cy="86" r="4" fill="#3a0ca3" /><path d="M58 88h4l1 10h-6z" fill="#3a0ca3" />
    <g transform="rotate(-30 90 128)" fill="#ffd60a"><circle cx="76" cy="128" r="7" /><circle cx="76" cy="128" r="3" fill="#7209b7" /><rect x="82" y="126" width="24" height="4" /><rect x="98" y="130" width="3" height="6" /><rect x="103" y="130" width="3" height="4" /></g>
  </>],
  ['#0b090a', '#1b1b1b', 'เล่าเรื่องผีรอบกองไฟ', <>
    <Stars p={[10, 10, 60, 6, 100, 20, 30, 30]} />
    <path d="M90 0V96M84 30L104 10M88 60L70 44" stroke="#1d1d1d" strokeWidth="6" />
    <path d="M80 20Q96 0 112 18Q122 40 108 60L114 70L100 66L96 80L90 66L80 70L86 56Q72 40 80 20Z" fill="#000" opacity=".9" />
    <ellipse cx="98" cy="32" rx="3" ry="2" fill="#e5383b" /><ellipse cx="106" cy="34" rx="2.4" ry="1.6" fill="#e5383b" />
    <rect y="128" width="120" height="32" fill="#130f0a" />
    <Glow x={60} y={118} r={50} f="#f48c06" o={.25} />
    <path d="M60 96q-12 16-4 28h8q8-12-4-28zM52 108q-6 10 0 16M68 108q6 10 0 16" fill="#f48c06" /><path d="M60 108q-4 8 0 14q4-6 0-14z" fill="#ffd60a" />
    <path d="M48 128l24-6M48 122l24 6" stroke="#6b4226" strokeWidth="3" />
    <g fill="#2b1d12"><circle cx="24" cy="108" r="7" /><path d="M14 130q0-16 10-16t10 16z" /><circle cx="98" cy="110" r="6" /><path d="M89 130q0-14 9-14t9 14z" /></g>
  </>],
  ['#1a1a2e', '#16213e', 'บ้านที่หน้าต่างเป็นตา', <>
    <Stars p={[10, 10, 30, 24, 90, 16, 108, 36]} /><circle cx="22" cy="40" r="8" fill="#fff4c2" />
    <rect y="140" width="120" height="20" fill="#0f0f1a" />
    <rect x="26" y="70" width="68" height="70" fill="#3a3a5a" /><polygon points="20,72 60,34 100,72" fill="#2a2a44" />
    <ellipse cx="44" cy="92" rx="10" ry="7" fill="#ffd166" /><ellipse cx="76" cy="92" rx="10" ry="7" fill="#ffd166" /><circle cx="46" cy="93" r="3.5" fill="#1a1a2e" /><circle cx="78" cy="93" r="3.5" fill="#1a1a2e" />
    <path d="M34 84q10-6 20-2M66 82q10-4 20 2" stroke="#1a1a2e" strokeWidth="2" fill="none" />
    <path d="M50 140v-18q10-8 20 0v18" fill="#1a1a2e" /><path d="M52 122l4 4 4-4 4 4 4-4" stroke="#ffd166" fill="none" />
    <Glow x={60} y={92} r={40} f="#ffd166" o={.1} />
  </>],
];
