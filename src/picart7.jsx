// ภาพการ์ด 151–175 • [สีบน, สีล่าง, ชื่อภาพ, เนื้อภาพ] • viewBox 120x160
import React from 'react';
import { Stars, Cloud, Glow, Pine, Bird, Lines } from './picbits.jsx';

const ink = { fill: 'none', stroke: '#22333b', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const ART7 = [
  ['#fdfcdc', '#f6efd2', 'ปล่อยนกกระดาษ', <>
    <g {...ink}><path d="M10 150Q20 120 40 112Q52 108 58 114L70 110Q76 110 74 116L60 124Q50 130 44 128" /><path d="M58 114q6 -4 10 0M56 120q6-2 10 0" /><path d="M10 150L30 160" /></g>
    <g {...ink} stroke="#e07a5f"><path d="M76 74L96 64L90 82Z" /><path d="M76 74L70 60L86 70M90 82L84 72" /><path d="M96 64l6-4" /></g>
    <path d="M62 104q6-14 14-24" stroke="#22333b" strokeDasharray="2 4" fill="none" />
    <Bird x={100} y={30} c="#22333b" /><Bird x={84} y={20} s={.7} c="#22333b" />
  </>],
  ['#fff3e0', '#ffccd5', 'แมวนั่งบนสายพานซูชิ', <>
    <rect y="104" width="120" height="16" fill="#adb5bd" /><rect y="100" width="120" height="4" fill="#6c757d" /><rect y="120" width="120" height="40" fill="#8d6e63" />
    {[[18, '#e63946'], [96, '#457b9d']].map(([x, c], i) => <g key={i}><ellipse cx={x} cy="100" rx="11" ry="3" fill={c} /><rect x={x - 6} y="92" width="12" height="6" rx="2" fill="#fff" /><rect x={x - 6} y="89" width="12" height="4" rx="1.5" fill="#f4a261" /></g>)}
    <ellipse cx="58" cy="100" rx="14" ry="3.5" fill="#ffd166" />
    <g fill="#495057"><ellipse cx="58" cy="88" rx="12" ry="10" /><circle cx="58" cy="72" r="9" /><polygon points="50,68 51,59 56,66" /><polygon points="66,68 65,59 60,66" /></g>
    <path d="M70 92q10 0 8-10" stroke="#495057" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M53 72q2 2 4 0M59 72q2 2 4 0" stroke="#fff" fill="none" /><polygon points="57,76 59,76 58,77.5" fill="#ffafcc" />
    <rect x="0" y="0" width="120" height="30" fill="#e63946" opacity=".15" /><path d="M10 14h20M40 14h14M70 14h30" stroke="#e63946" strokeWidth="3" opacity=".3" />
  </>],
  ['#ffcfd2', '#f1c0e8', 'หมวกนักบินอวกาศกลางทุ่งดอกไม้', <>
    <path d="M0 96Q60 80 120 98V160H0Z" fill="#90dbf4" opacity=".6" /><path d="M0 112Q60 100 120 114V160H0Z" fill="#b9fbc0" />
    {[[10, 120, '#ff70a6'], [24, 136, '#ffd670'], [96, 128, '#ff70a6'], [108, 146, '#e9ff70'], [40, 150, '#ff9770'], [80, 150, '#ff70a6'], [70, 118, '#ffd670'], [16, 152, '#ff9770']].map(([x, y, c], i) => <g key={i} fill={c}><circle cx={x} cy={y} r="3" /><circle cx={x} cy={y} r="1.2" fill="#fff" /></g>)}
    <circle cx="58" cy="122" r="18" fill="#f8f9fa" stroke="#ced4da" strokeWidth="2" /><path d="M44 120a14 12 0 0 1 28 0v4H44z" fill="#457b9d" /><path d="M48 116q6-6 14-2" stroke="#a2d2ff" strokeWidth="2" fill="none" />
    <path d="M70 108q6-14 2-20M74 106q8-6 10-14" stroke="#55a630" fill="none" /><circle cx="72" cy="88" r="3" fill="#ff70a6" />
    <circle cx="94" cy="34" r="8" fill="#fff" opacity=".6" />
  </>],
  ['#ff9e00', '#ff5400', 'ช้างกับเจดีย์ยามเย็น', <>
    <circle cx="70" cy="80" r="30" fill="#ffd166" opacity=".85" />
    <path d="M60 110V96L64 84L68 66L70 40L72 66L76 84L80 96V110Z" fill="#3c1518" /><circle cx="70" cy="90" r="9" fill="#3c1518" /><path d="M86 110V100L90 94L92 82L94 94L98 100V110Z" fill="#3c1518" />
    <rect y="110" width="120" height="50" fill="#3c1518" />
    <g fill="#3c1518"><ellipse cx="28" cy="98" rx="20" ry="13" /><circle cx="12" cy="92" r="9" /><path d="M6 96q-6 6-2 16" stroke="#3c1518" strokeWidth="4" fill="none" strokeLinecap="round" /><rect x="14" y="104" width="6" height="10" /><rect x="34" y="104" width="6" height="10" /></g>
    <Bird x={30} y={40} c="#3c1518" /><Bird x={42} y={50} s={.7} c="#3c1518" />
  </>],
  ['#1b1b2f', '#162447', 'กล่องของขวัญที่มีตาข้างใน', <>
    <rect y="130" width="120" height="30" fill="#0f0f1f" />
    <path d="M28 90H92V130H28Z" fill="#e43f5a" /><rect x="56" y="90" width="8" height="40" fill="#ffd166" />
    <rect x="24" y="84" width="72" height="8" fill="#000" />
    <g transform="rotate(-24 30 80)"><path d="M22 70H98V82H22Z" fill="#e43f5a" /><rect x="56" y="70" width="8" height="12" fill="#ffd166" /><path d="M60 70q-12-14-18-4q6 6 18 4zM60 70q12-14 18-4q-6 6-18 4z" fill="#ffd166" /></g>
    <ellipse cx="50" cy="88" rx="3" ry="2" fill="#f9f871" /><ellipse cx="68" cy="88" rx="3" ry="2" fill="#f9f871" /><circle cx="50" cy="88" r="1" fill="#000" /><circle cx="68" cy="88" r="1" fill="#000" />
    <Glow x={60} y={88} r={20} f="#f9f871" o={.12} />
  </>],
  ['#74c69d', '#1b4332', 'สลอธในเปลญวน', <>
    <path d="M10 0V160M110 0V160" stroke="#3a2d1f" strokeWidth="8" />
    <path d="M30 0Q36 30 30 60M84 0Q80 20 90 40" stroke="#2d6a4f" strokeWidth="3" fill="none" /><path d="M24 30q-6 4-4 10q6-2 4-10zM36 44q6 2 6 8q-6 0-6-8zM86 24q6 2 6 8q-6 0-6-8z" fill="#52b788" />
    <path d="M14 60Q60 120 106 60" stroke="#e9c46a" strokeWidth="2" fill="none" /><path d="M14 60Q60 112 106 60L100 68Q60 116 20 68Z" fill="#e76f51" />
    <ellipse cx="60" cy="86" rx="20" ry="10" fill="#a68a64" /><circle cx="76" cy="80" r="8" fill="#a68a64" /><ellipse cx="78" cy="81" rx="5" ry="4" fill="#ddb892" />
    <path d="M74 80q1-1 2 0M79 80q1-1 2 0" stroke="#3a2d1f" fill="none" /><path d="M76 84q2 1 3 0" stroke="#3a2d1f" fill="none" />
    <path d="M48 80q-6-16 0-24" stroke="#a68a64" strokeWidth="4" fill="none" strokeLinecap="round" />
  </>],
  ['#a7c957', '#6a994e', 'กล้องเรือดำน้ำโผล่จากสนามหญ้า', <>
    <rect y="0" width="120" height="70" fill="#caf0f8" /><Cloud x={26} y={26} /><Cloud x={96} y={18} s={.7} />
    <path d="M0 70Q60 62 120 70V160H0Z" fill="#6a994e" /><Lines p={[10, 90, 8, 82, 30, 110, 32, 102, 90, 100, 92, 92, 104, 130, 102, 122, 20, 140, 22, 132]} c="#386641" w={1.5} />
    <rect x="56" y="70" width="8" height="40" fill="#6c757d" /><path d="M56 70V60H76V70H64" fill="#6c757d" /><rect x="74" y="58" width="4" height="14" fill="#343a40" /><ellipse cx="78" cy="65" rx="1.5" ry="4" fill="#90e0ef" />
    <ellipse cx="60" cy="110" rx="14" ry="4" fill="#386641" />
    <g fill="#fff"><ellipse cx="96" cy="120" rx="5" ry="4" /><circle cx="100" cy="116" r="3" /></g><circle cx="101" cy="116" r=".8" fill="#222" />
  </>],
  ['#fefae0', '#f2e8cf', 'มดขนสตรอว์เบอร์รียักษ์', <>
    <rect y="128" width="120" height="32" fill="#bc6c25" opacity=".3" />
    <path d="M46 92Q36 64 60 58Q84 64 74 92Q68 112 60 114Q52 112 46 92Z" fill="#e63946" transform="rotate(-80 60 86)" />
    <g fill="#ffe8a3">{[[40, 82], [48, 92], [56, 80], [66, 90], [72, 80], [80, 88], [62, 98]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1" ry="1.6" />)}</g>
    <path d="M30 86l-6-6 8 2-4-8 8 6 2-8 2 10z" fill="#55a630" />
    <g fill="#222">{[36, 52, 68, 84, 100].map((x, i) => <g key={i}><ellipse cx={x} cy="114" rx="3" ry="2" /><circle cx={x + 3.5} cy="112" r="1.8" /><circle cx={x - 3} cy="115" r="2" /><path d={`M${x} 114l-2 5M${x + 1} 114l2 5M${x + 4} 110v-6`} stroke="#222" strokeWidth=".7" /></g>)}</g>
    <g fill="#222" opacity=".8">{[[14, 140], [24, 144]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="2.5" ry="1.6" /><circle cx={x + 3} cy={y - 1} r="1.4" /></g>)}</g>
  </>],
  ['#0b0c10', '#1f2833', 'หน้าต่างดวงเดียวที่ยังเปิดไฟ', <>
    <Stars p={[10, 8, 50, 14, 100, 6, 80, 24]} r={.6} />
    <rect x="10" y="30" width="44" height="130" fill="#161b22" /><rect x="60" y="14" width="50" height="146" fill="#1c2128" />
    <g fill="#222831">{Array.from({ length: 30 }, (_, i) => <rect key={i} x={64 + (i % 5) * 9} y={20 + (i / 5 | 0) * 22} width="6" height="10" />)}{Array.from({ length: 20 }, (_, i) => <rect key={i} x={14 + (i % 4) * 10} y={36 + (i / 4 | 0) * 24} width="6" height="10" />)}</g>
    <rect x="82" y="86" width="6" height="10" fill="#ffd166" /><Glow x={85} y={91} r={12} f="#ffd166" o={.3} />
    <circle cx="85" cy="92" r="1.4" fill="#2b2b2b" />
  </>],
  ['#ffe5ec', '#ffc2d1', 'กลีบซากุระกลายเป็นผีเสื้อ', <>
    <path d="M0 40Q30 30 50 50Q60 60 70 54" stroke="#5e503f" strokeWidth="5" fill="none" strokeLinecap="round" /><path d="M24 36q-6-12 0-20" stroke="#5e503f" strokeWidth="3" fill="none" />
    <g fill="#ffb3c6">{[[20, 28], [36, 36], [50, 46], [12, 44], [62, 52], [30, 20], [44, 30]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" />)}</g>
    <g fill="#ff8fab">{[[56, 72, 20], [44, 96, -10]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx="3" ry="2" transform={`rotate(${r} ${x} ${y})`} />)}</g>
    {[[70, 90, .6], [84, 110, .8], [96, 70, 1], [76, 132, 1.1]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s})`} fill="#ff8fab"><path d="M0 0Q-8-10-10-2Q-8 4 0 0ZM0 0Q8-10 10-2Q8 4 0 0Z" /><path d="M0 0Q-6 4-6 8Q-2 8 0 0ZM0 0Q6 4 6 8Q2 8 0 0Z" fill="#ffb3c6" /></g>)}
  </>],
  ['#adb5bd', '#6c757d', 'หนูหลบฝนใต้เห็ด', <>
    <Lines p={[10, 0, 6, 20, 30, 10, 26, 30, 100, 4, 96, 24, 110, 40, 106, 60, 14, 50, 10, 70, 94, 70, 90, 90, 20, 100, 16, 120]} c="#e9ecef" o={.6} />
    <rect y="136" width="120" height="24" fill="#495057" /><ellipse cx="60" cy="140" rx="34" ry="3" fill="#ced4da" opacity=".5" />
    <rect x="54" y="88" width="10" height="50" rx="4" fill="#f8f9fa" /><path d="M20 92Q58 40 98 92Z" fill="#e63946" /><g fill="#fff"><circle cx="44" cy="74" r="4" /><circle cx="64" cy="64" r="5" /><circle cx="82" cy="80" r="3.5" /></g>
    <g fill="#adb5bd"><ellipse cx="74" cy="130" rx="9" ry="7" /><circle cx="82" cy="122" r="5" /><circle cx="80" cy="117" r="3" fill="#ffafcc" /></g><circle cx="84" cy="122" r="1" fill="#222" />
    <path d="M66 132q-10 4-6 8" stroke="#adb5bd" fill="none" />
  </>],
  ['#240046', '#5a189a', 'ชิงช้าสวรรค์กับกระเช้าเดียวที่สว่าง', <>
    <Stars p={[10, 10, 30, 30, 100, 14, 110, 50]} />
    <circle cx="60" cy="70" r="40" fill="none" stroke="#c77dff" strokeWidth="2" /><circle cx="60" cy="70" r="4" fill="#c77dff" />
    <g stroke="#9d4edd">{Array.from({ length: 8 }, (_, i) => <line key={i} x1="60" y1="70" x2={60 + 40 * Math.cos(i * .785)} y2={70 + 40 * Math.sin(i * .785)} />)}</g>
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x={54 + 40 * Math.cos(i * .785)} y={70 + 40 * Math.sin(i * .785)} width="12" height="9" rx="2" fill={i === 5 ? '#ffd60a' : '#3c096c'} stroke="#c77dff" strokeWidth=".6" />)}
    <Glow x={60 + 40 * Math.cos(5 * .785) + 6} y={70 + 40 * Math.sin(5 * .785) + 4} r={16} f="#ffd60a" o={.3} />
    <path d="M60 70L36 150M60 70L84 150" stroke="#7b2cbf" strokeWidth="3" /><rect y="148" width="120" height="12" fill="#10002b" />
  </>],
  ['#90a955', '#ecf39e', 'ฝนตกเป็นปลา', <>
    <g fill="#4f772d"><circle cx="30" cy="20" r="18" /><circle cx="60" cy="14" r="20" /><circle cx="92" cy="22" r="16" /></g>
    {[[24, 50, 80], [52, 64, 100], [80, 48, 70], [40, 90, 90], [96, 84, 110], [66, 104, 80]].map(([x, y, r], i) => <g key={i} transform={`rotate(${r} ${x} ${y})`}><path d={`M${x - 6} ${y}q6-5 12 0q-6 5-12 0zM${x - 6} ${y}l-4-3v6z`} fill={['#f77f00', '#90e0ef', '#ffd166'][i % 3]} /></g>)}
    <path d="M0 160V132L14 124L28 132V160ZM34 160V128L50 118L66 128V160ZM74 160V134L90 122L106 134V126H112V160Z" fill="#31572c" />
    <g transform="translate(96 150)"><circle cx="0" cy="-12" r="3" fill="#132a13" /><path d="M-2-9h4v9h-4z" fill="#132a13" /><path d="M-8-16Q0-24 8-16Z" fill="#132a13" /></g>
  </>],
  ['#d9ed92', '#99d98c', 'หอยทากแข่งกัน', <>
    <rect y="110" width="120" height="50" fill="#76c893" />
    <Lines p={[96, 80, 96, 132, 112, 80, 112, 132]} c="#6b4226" w={2} /><path d="M96 92Q104 98 112 92" stroke="#e63946" strokeWidth="2" fill="none" />
    {[[34, 112, '#f4a261'], [56, 132, '#9d4edd']].map(([x, y, c], i) => <g key={i}><path d={`M${x - 20} ${y + 4}Q${x - 20} ${y - 4} ${x - 8} ${y - 2}H${x + 14}Q${x + 22} ${y} ${x + 20} ${y + 4}Z`} fill="#e9d8a6" /><circle cx={x - 2} cy={y - 10} r="11" fill={c} /><path d={`M${x - 2} ${y - 10}m-6 0a6 6 0 1 1 6 6a3 3 0 1 1-3-3`} stroke="#fff" fill="none" opacity=".7" /><path d={`M${x + 16} ${y - 1}l3-10M${x + 12} ${y - 1}l-1-10`} stroke="#e9d8a6" strokeWidth="1.5" /></g>)}
    <path d="M6 116h8M6 136h8M8 104l6 0" stroke="#fff" opacity=".6" />
  </>],
  ['#1a1423', '#3d314a', 'ถ้วยรางวัลบนเวทีว่าง', <>
    <polygon points="54,0 66,0 96,124 24,124" fill="#fff6c8" opacity=".12" />
    <rect y="124" width="120" height="36" fill="#6d2e46" /><rect y="120" width="120" height="6" fill="#8b3a62" />
    <path d="M0 0H20V120H0ZM100 0H120V120H100Z" fill="#a23b72" /><path d="M20 0Q24 60 14 120M100 0Q96 60 106 120" stroke="#6d2e46" strokeWidth="2" fill="none" />
    <path d="M46 70H74Q74 94 60 96Q46 94 46 70Z" fill="#ffd60a" /><path d="M46 74q-10 0-8 10q2 6 10 4M74 74q10 0 8 10q-2 6-10 4" stroke="#ffd60a" strokeWidth="2.5" fill="none" />
    <rect x="57" y="96" width="6" height="10" fill="#e9c46a" /><rect x="50" y="106" width="20" height="6" fill="#bc6c25" /><rect x="46" y="112" width="28" height="8" fill="#6b4226" />
    <path d="M86 112v-14h10v14M86 104h10" stroke="#3d314a" strokeWidth="2" fill="none" />
  </>],
  ['#48cae4', '#023e8a', 'แมวกับหนูในเรือลำเดียว', <>
    <circle cx="96" cy="26" r="10" fill="#fff3b0" />
    <rect y="100" width="120" height="60" fill="#0077b6" /><path d="M0 102q10-4 20 0t20 0t20 0t20 0t20 0t20 0" stroke="#90e0ef" fill="none" />
    <path d="M24 98H96L86 114H34Z" fill="#9c6644" /><line x1="60" y1="98" x2="60" y2="50" stroke="#6b4226" strokeWidth="1.5" /><path d="M60 52L86 90H60Z" fill="#f8f9fa" />
    <g fill="#f4a261"><ellipse cx="42" cy="92" rx="8" ry="7" /><circle cx="40" cy="80" r="6" /><polygon points="35,77 36,70 40,75" /><polygon points="45,77 44,70 40,75" /></g><circle cx="38" cy="80" r=".9" fill="#222" /><circle cx="42" cy="80" r=".9" fill="#222" />
    <g fill="#adb5bd"><ellipse cx="74" cy="94" rx="5" ry="4" /><circle cx="70" cy="89" r="3" /><circle cx="68" cy="86" r="2" fill="#ffafcc" /></g>
    <path d="M44 92q14-8 26-2" stroke="#e63946" fill="none" strokeDasharray="2 2" />
  </>],
  ['#f8f9fa', '#e9ecef', 'ดอกไม้งอกจากจอแตก', <>
    <rect x="30" y="20" width="60" height="118" rx="8" fill="#212529" /><rect x="34" y="28" width="52" height="100" rx="2" fill="#343a40" />
    <path d="M60 80L44 60M60 80L80 56M60 80L40 100M60 80L84 104M60 80L58 30M44 60L36 66M80 56L86 70" stroke="#adb5bd" strokeWidth=".8" fill="none" />
    <path d="M60 80Q58 64 62 52" stroke="#55a630" strokeWidth="1.8" fill="none" /><path d="M60 70q-8-4-10 2q6 2 10-2" fill="#80b918" />
    <g fill="#ff70a6"><circle cx="62" cy="46" r="3.5" /><circle cx="67" cy="50" r="3.5" /><circle cx="57" cy="50" r="3.5" /><circle cx="62" cy="54" r="3.5" /></g><circle cx="62" cy="50" r="2" fill="#ffd60a" />
    <rect x="52" y="132" width="16" height="2" rx="1" fill="#6c757d" />
  </>],
  ['#ffd166', '#f4a261', 'คอนโดรังผึ้ง', <>
    {Array.from({ length: 20 }, (_, i) => { const c = i % 4, r = i / 4 | 0, x = 24 + c * 24 + (r % 2) * 12, y = 30 + r * 22; return <g key={i}><polygon points={`${x},${y - 12} ${x + 11},${y - 6} ${x + 11},${y + 6} ${x},${y + 12} ${x - 11},${y + 6} ${x - 11},${y - 6}`} fill="#e9c46a" stroke="#bc6c25" strokeWidth="1.5" />{[2, 7, 13, 16].includes(i) ? <><rect x={x - 5} y={y - 4} width="10" height="9" fill="#fff3b0" /><ellipse cx={x} cy={y + 1} rx="3" ry="2" fill="#222" /><path d={`M${x - 2} ${y - 1}h4`} stroke="#ffd166" /></> : <rect x={x - 5} y={y - 4} width="10" height="9" fill="#7f5539" opacity=".5" />}</g>; })}
    <g transform="translate(100 140)"><ellipse rx="4" ry="3" fill="#222" /><path d="M-2-1h4M-2 1h4" stroke="#ffd166" /><ellipse cx="0" cy="-4" rx="3" ry="1.5" fill="#fff" opacity=".8" /></g>
  </>],
  ['#ffe8a3', '#f4a261', 'ภาพลวงตาโอเอซิส', <>
    <circle cx="94" cy="24" r="14" fill="#fff8d6" />
    <path d="M0 96Q60 90 120 96V160H0Z" fill="#e9c46a" /><path d="M0 120Q40 110 80 122T120 118V160H0Z" fill="#dda15e" />
    <ellipse cx="60" cy="98" rx="30" ry="5" fill="#90e0ef" opacity=".6" />
    <g opacity=".7"><path d="M58 96Q60 76 54 60" stroke="#6b4226" strokeWidth="2.5" fill="none" /><path d="M54 60q-12-2-16 6M54 60q12-6 18 0M54 60q-6-10-14-10M54 60q6-10 14-8" stroke="#2a9d8f" strokeWidth="3" fill="none" /></g>
    <g opacity=".3"><path d="M58 100Q60 120 54 136" stroke="#6b4226" strokeWidth="2.5" fill="none" /><path d="M54 136q-12 2-16-6M54 136q12 6 18 0" stroke="#2a9d8f" strokeWidth="3" fill="none" /></g>
    <path d="M10 140l4-10 4 10M8 136h12" stroke="#6b4226" fill="none" /><circle cx="14" cy="128" r="2" fill="#6b4226" />
    <path d="M20 90q8-2 16 0M80 92q8-2 16 0" stroke="#fff" opacity=".6" fill="none" />
  </>],
  ['#081c15', '#1b4332', 'ตู้กดน้ำกลางป่า', <>
    <Pine x={16} y={110} s={1.6} f="#040f0a" /><Pine x={106} y={104} s={1.8} f="#040f0a" /><Stars p={[30, 20, 70, 10, 100, 30]} />
    <rect y="136" width="120" height="24" fill="#040f0a" />
    <Glow x={58} y={96} r={50} f="#a0f0ff" o={.18} />
    <rect x="40" y="56" width="36" height="80" rx="3" fill="#e63946" /><rect x="44" y="62" width="22" height="50" fill="#caf0f8" />
    <g fill="#ffd166">{Array.from({ length: 9 }, (_, i) => <rect key={i} x={46 + (i % 3) * 7} y={66 + (i / 3 | 0) * 15} width="4" height="10" rx="1" />)}</g>
    <rect x="68" y="66" width="5" height="16" fill="#adb5bd" /><rect x="46" y="118" width="20" height="8" fill="#1d1d1d" />
    <g fill="#bc8a5f"><ellipse cx="96" cy="118" rx="10" ry="7" /><path d="M86 114q-4-10-2-18l4 2 2 12" /><circle cx="86" cy="96" r="5" /></g><path d="M84 92l-4-8M88 92l2-8" stroke="#6b4226" /><circle cx="84" cy="96" r=".9" fill="#222" />
    <path d="M90 124v12M102 124v12" stroke="#bc8a5f" strokeWidth="2.5" />
  </>],
  ['#a2d2ff', '#cdb4db', 'เกล็ดหิมะยักษ์เหนือหมู่บ้าน', <>
    <g stroke="#fff" strokeWidth="3" strokeLinecap="round">{[0, 60, 120].map(a => <g key={a} transform={`rotate(${a} 60 56)`}><line x1="60" y1="20" x2="60" y2="92" /><path d="M60 32l-8-6M60 32l8-6M60 80l-8 6M60 80l8 6M60 46l-6-4M60 46l6-4M60 66l-6 4M60 66l6 4" /></g>)}</g>
    <circle cx="60" cy="56" r="4" fill="#fff" />
    <path d="M0 132Q60 120 120 134V160H0Z" fill="#fff" />
    <g fill="#6d597a"><rect x="20" y="118" width="16" height="14" /><polygon points="18,120 28,110 38,120" fill="#fff" /><rect x="70" y="114" width="20" height="18" /><polygon points="68,116 80,104 92,116" fill="#fff" /></g>
    <g fill="#ffd166"><rect x="24" y="122" width="4" height="4" /><rect x="76" y="120" width="5" height="5" /></g>
    <Stars p={[14, 30, 100, 20, 108, 80, 12, 90, 30, 104]} r={1.2} />
  </>],
  ['#f2e9e4', '#c9ada7', 'นกกระเรียนกระดาษบนกองหนังสือ', <>
    <polygon points="120,0 120,40 40,160 0,160 0,120" fill="#fff8d6" opacity=".35" />
    <rect x="22" y="120" width="76" height="12" fill="#4a4e69" /><rect x="28" y="108" width="66" height="12" fill="#9a8c98" /><rect x="24" y="96" width="70" height="12" fill="#22223b" /><rect y="132" width="120" height="28" fill="#6d6875" />
    <Lines p={[30, 101, 88, 101, 34, 113, 88, 113, 28, 125, 92, 125]} c="#f2e9e4" o={.4} />
    <g fill="#e63946"><polygon points="44,96 60,74 68,96" /><polygon points="60,74 80,60 70,80" fill="#c1121f" /><polygon points="60,74 52,56 56,78" fill="#c1121f" /><polygon points="68,96 84,82 70,86" /><polygon points="52,56 46,58 52,60" fill="#9d0208" /></g>
  </>],
  ['#8ecae6', '#219ebc', 'จระเข้แปรงฟัน', <>
    <rect y="120" width="120" height="40" fill="#023047" opacity=".4" />
    <path d="M10 120Q12 100 40 98H74L100 92Q112 92 112 100Q112 108 100 108L74 112Q60 124 30 126Q12 126 10 120Z" fill="#52b788" />
    <path d="M74 100L100 92M74 108L100 106" stroke="#2d6a4f" /><path d="M76 100l3 3 3-3 3 3 3-3 3 3 3-3M76 108l3-3 3 3 3-3 3 3 3-3 3 3" stroke="#fff" fill="none" />
    <circle cx="64" cy="94" r="5" fill="#52b788" /><circle cx="65" cy="93" r="2.2" fill="#fff" /><circle cx="66" cy="93" r="1.2" fill="#222" />
    <g fill="#2d6a4f"><circle cx="30" cy="102" r="2" /><circle cx="40" cy="100" r="2" /><circle cx="50" cy="100" r="2" /></g>
    <rect x="80" y="76" width="36" height="4" rx="2" fill="#4cc9f0" transform="rotate(-20 98 78)" /><rect x="78" y="80" width="10" height="6" fill="#fff" transform="rotate(-20 98 78)" />
    <g fill="#fff" opacity=".9"><circle cx="96" cy="88" r="2" /><circle cx="102" cy="86" r="1.5" /><circle cx="90" cy="86" r="1.4" /></g>
  </>],
  ['#ffcad4', '#f4acb7', 'โซ่ขาดกับนกที่บินไป', <>
    <g fill="none" stroke="#6c757d" strokeWidth="4">{[0, 1, 2].map(i => <ellipse key={i} cx={20 + i * 14} cy={130 - i * 10} rx="8" ry="5" transform={`rotate(-35 ${20 + i * 14} ${130 - i * 10})`} />)}</g>
    <path d="M58 104a7 4 0 1 1 6 6M70 98a7 4 0 1 0-6-6" stroke="#6c757d" strokeWidth="4" fill="none" />
    <g fill="none" stroke="#6c757d" strokeWidth="4"><ellipse cx="82" cy="88" rx="8" ry="5" transform="rotate(-35 82 88)" opacity=".0" /></g>
    <g transform="translate(86 44)"><ellipse rx="9" ry="5" fill="#fff" /><circle cx="8" cy="-3" r="4" fill="#fff" /><polygon points="12,-3 16,-2 12,-1" fill="#f77f00" /><path d="M-2-2L-12-18L6-4Z" fill="#fff" /><path d="M0-2L4-20L10-4Z" fill="#f8f9fa" /><path d="M-8 0l-7 3 7 1z" fill="#fff" /><circle cx="9" cy="-4" r=".8" fill="#000" /></g>
    <Bird x={104} y={20} s={.6} c="#fff" />
  </>],
  ['#3c3c3c', '#1a1a1a', 'บ่อน้ำเก่ามีแสงอยู่ก้นบ่อ', <>
    <Stars p={[10, 10, 40, 20, 90, 8, 110, 30]} />
    <path d="M36 50V40H84V50" stroke="#5a3e2b" strokeWidth="3" fill="none" /><rect x="34" y="36" width="52" height="4" fill="#5a3e2b" /><path d="M36 40L60 26L84 40" fill="#7f5539" />
    <line x1="60" y1="40" x2="60" y2="78" stroke="#a68a64" /><path d="M54 78h12l-2 10h-8z" fill="#8d6e63" />
    <ellipse cx="60" cy="100" rx="30" ry="8" fill="#000" /><Glow x={60} y={100} r={26} f="#80ffdb" o={.4} />
    <path d="M30 100V140H90V100" fill="#6c757d" /><path d="M30 100Q60 116 90 100V140Q60 150 30 140Z" fill="#6c757d" />
    <Lines p={[30, 112, 90, 112, 30, 126, 90, 126, 46, 104, 46, 112, 70, 112, 70, 126, 56, 126, 56, 140]} c="#495057" />
    <rect y="140" width="120" height="20" fill="#2b2b2b" />
  </>],
];
