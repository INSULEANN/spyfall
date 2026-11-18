// ภาพการ์ด 26–50 • [สีบน, สีล่าง, ชื่อภาพ, เนื้อภาพ] • viewBox 120x160
import React from 'react';
import { Stars, Cloud, Glow, Pine, Bird, Lines } from './picbits.jsx';

const Piece = 'M0 0h10a5 5 0 0 1 10 0h10v10a5 5 0 0 1 0 10v10h-10a5 5 0 0 0-10 0h-10v-10a5 5 0 0 0 0-10z';
const Flower = ({ x, y, s = 1, c = '#ff6fa3', m = '#ffd84d' }) => <g transform={`translate(${x} ${y}) scale(${s})`}><g fill={c}><circle cx="0" cy="-4" r="3.2" /><circle cx="4" cy="0" r="3.2" /><circle cx="0" cy="4" r="3.2" /><circle cx="-4" cy="0" r="3.2" /></g><circle r="2.4" fill={m} /></g>;

export const ART2 = [
  ['#fde2e4', '#fad2e1', 'ปลาหมึกนั่งถักไหมพรม', <>
    <rect y="138" width="120" height="22" fill="#e7b8c4" />
    <path d="M18 140V80Q18 66 32 66H88Q102 66 102 80V140Z" fill="#6c8ebf" /><rect x="12" y="98" width="16" height="42" rx="6" fill="#5876a6" /><rect x="92" y="98" width="16" height="42" rx="6" fill="#5876a6" />
    <ellipse cx="60" cy="68" rx="22" ry="24" fill="#e5707e" /><ellipse cx="52" cy="70" rx="4" ry="5" fill="#fff" /><ellipse cx="68" cy="70" rx="4" ry="5" fill="#fff" /><circle cx="53" cy="71" r="2" fill="#333" /><circle cx="67" cy="71" r="2" fill="#333" />
    <path d="M42 86q-12 10-4 24M50 90q-6 16 4 26M70 90q6 16-4 26M78 86q12 10 4 24M46 88q-20 4-24 20M74 88q20 4 24 20" stroke="#e5707e" strokeWidth="5" fill="none" strokeLinecap="round" />
    <Lines p={[38, 100, 56, 86, 82, 100, 64, 86]} c="#c9a25e" w={1.5} />
    <path d="M48 104h24v30h-24z" fill="#ffd166" /><Lines p={[48, 112, 72, 112, 48, 122, 72, 122]} c="#ef476f" w={3} />
    <circle cx="22" cy="146" r="7" fill="#06d6a0" /><circle cx="98" cy="148" r="6" fill="#ef476f" /><path d="M17 143q5 3 10 0M94 146q4 3 8 0" stroke="#fff" fill="none" opacity=".6" />
    <path d="M60 134Q66 150 92 148" stroke="#ef476f" fill="none" />
  </>],
  ['#0a0a23', '#1b1b4b', 'นักบินอวกาศกับดอกไม้', <>
    <Stars p={[10, 14, 30, 40, 50, 10, 90, 20, 110, 44, 20, 70, 100, 76, 70, 34]} />
    <circle cx="96" cy="34" r="9" fill="#f6a5c0" /><ellipse cx="96" cy="34" rx="16" ry="3" fill="none" stroke="#ffe0ec" />
    <circle cx="60" cy="140" r="42" fill="#6c5ce7" /><circle cx="44" cy="126" r="5" fill="#5a4bd1" /><circle cx="78" cy="150" r="7" fill="#5a4bd1" /><circle cx="70" cy="118" r="3" fill="#5a4bd1" />
    <rect x="44" y="88" width="16" height="14" rx="4" fill="#f1f2f6" /><rect x="58" y="96" width="12" height="5" rx="2" fill="#f1f2f6" />
    <circle cx="52" cy="82" r="9" fill="#f1f2f6" /><ellipse cx="54" cy="82" rx="6" ry="5" fill="#2d3436" /><ellipse cx="56" cy="80" rx="2" ry="1.2" fill="#fff" opacity=".6" />
    <path d="M78 98q-1-8 0-12" stroke="#55efc4" strokeWidth="1.5" fill="none" /><Flower x={78} y={84} s={.8} c="#ff7675" />
  </>],
  ['#9ed97a', '#4caf50', 'โพรงกระต่าย', <>
    <rect y="0" width="120" height="70" fill="#cfefff" /><Cloud x={30} y={30} /><Cloud x={92} y={20} s={.8} />
    <path d="M0 70Q60 60 120 70V160H0Z" fill="#6cc04a" />
    <ellipse cx="60" cy="110" rx="28" ry="10" fill="#1a1a1a" /><Glow x={60} y={110} r={26} f="#ffe58a" o={.25} />
    <Lines p={[50, 112, 52, 80, 66, 112, 64, 80, 51, 86, 65, 86, 51, 94, 65, 94, 51, 102, 65, 102]} c="#8b5a2b" w={2} />
    <circle cx="20" cy="84" r="12" fill="#3e8e2e" /><circle cx="32" cy="88" r="9" fill="#3e8e2e" />
    <ellipse cx="22" cy="66" rx="3" ry="9" fill="#fff" transform="rotate(-10 22 66)" /><ellipse cx="29" cy="66" rx="3" ry="9" fill="#fff" transform="rotate(12 29 66)" />
    <circle cx="96" cy="134" r="2" fill="#ffd84d" /><circle cx="104" cy="126" r="2" fill="#ff6fa3" /><circle cx="14" cy="140" r="2" fill="#fff" />
  </>],
  ['#1a0f2e', '#3d1f4a', 'ช้างบนลูกบอล', <>
    <polygon points="50,0 70,0 104,150 16,150" fill="#fff6c8" opacity=".15" />
    <rect y="146" width="120" height="14" fill="#5b1a2a" /><ellipse cx="60" cy="146" rx="40" ry="5" fill="#fff6c8" opacity=".25" />
    <circle cx="60" cy="128" r="18" fill="#e63946" /><path d="M42 128q18 8 36 0" stroke="#ffd166" strokeWidth="4" fill="none" /><circle cx="60" cy="118" r="3" fill="#fff" />
    <rect x="50" y="102" width="5" height="10" fill="#a3a7b5" /><rect x="64" y="102" width="5" height="10" fill="#a3a7b5" />
    <ellipse cx="58" cy="96" rx="18" ry="12" fill="#a3a7b5" /><circle cx="76" cy="86" r="10" fill="#a3a7b5" />
    <path d="M84 90q8 2 8-10q0-6 4-6" stroke="#a3a7b5" strokeWidth="4" fill="none" strokeLinecap="round" />
    <ellipse cx="70" cy="86" rx="6" ry="8" fill="#8d91a0" /><circle cx="79" cy="83" r="1.3" fill="#222" />
    <path d="M40 94q-6 4-4 10" stroke="#a3a7b5" strokeWidth="2" fill="none" /><polygon points="72,76 76,64 80,76" fill="#ffd166" />
  </>],
  ['#2fb5c9', '#147a9c', 'เกาะรูปกุญแจ', <>
    <path d="M10 20q6-3 12 0M90 120q6-3 12 0M20 130q6-3 12 0M96 40q6-3 12 0" stroke="#bff3fb" fill="none" />
    <g fill="#f2d49b"><circle cx="60" cy="42" r="25" /><rect x="53" y="60" width="14" height="80" rx="4" /><rect x="64" y="106" width="20" height="10" rx="3" /><rect x="64" y="124" width="14" height="10" rx="3" /></g>
    <g fill="#5cb85c"><circle cx="60" cy="42" r="20" /><rect x="56" y="62" width="8" height="74" rx="3" /><rect x="64" y="108" width="17" height="6" rx="2" /><rect x="64" y="126" width="11" height="6" rx="2" /></g>
    <circle cx="60" cy="42" r="8" fill="#2fb5c9" /><circle cx="48" cy="32" r="3" fill="#3e8e41" /><circle cx="70" cy="54" r="3" fill="#3e8e41" />
    <path d="M26 92l5-2 1 3-5 1z" fill="#fff" /><path d="M24 93q-8 2-12 8" stroke="#bff3fb" fill="none" />
  </>],
  ['#ffb347', '#ff7e5f', 'หุ่นไล่กากับเพื่อนกา', <>
    <circle cx="94" cy="112" r="22" fill="#ffe08a" opacity=".8" />
    <path d="M0 120Q60 110 120 120V160H0Z" fill="#d4a017" />
    <Lines p={[8, 122, 6, 112, 18, 124, 20, 113, 32, 126, 30, 115, 88, 126, 90, 115, 102, 124, 100, 113, 112, 122, 114, 112]} c="#b8860b" w={1.5} />
    <line x1="60" y1="50" x2="60" y2="150" stroke="#6b4226" strokeWidth="3" /><line x1="28" y1="72" x2="92" y2="72" stroke="#6b4226" strokeWidth="3" />
    <path d="M46 68h28l-3 34h-22z" fill="#5c7cfa" /><rect x="52" y="80" width="7" height="7" fill="#fab005" />
    <circle cx="60" cy="50" r="10" fill="#d9b778" /><path d="M56 49h2M62 49h2M56 55q4 2 8 0" stroke="#6b4226" />
    <path d="M46 42h28l-6-4q-8-12-16 0z" fill="#6b4226" />
    {[[32, 66], [88, 66], [62, 34]].map(([x, y], i) => <g key={i} fill="#1d1d1d"><ellipse cx={x} cy={y} rx="5" ry="4" /><circle cx={x + 4} cy={y - 3} r="2.6" /><polygon points={`${x + 6},${y - 3} ${x + 10},${y - 2} ${x + 6},${y - 1}`} fill="#f59f00" /></g>)}
  </>],
  ['#4b5563', '#1f2937', 'ผีรอรถเมล์ตอนฝนตก', <>
    <Lines p={[10, 0, 4, 20, 30, 10, 24, 30, 54, 4, 48, 24, 80, 14, 74, 34, 104, 2, 98, 22, 18, 50, 12, 70, 94, 46, 88, 66, 110, 70, 104, 90]} c="#9ca3af" o={.6} />
    <rect y="132" width="120" height="28" fill="#111827" /><ellipse cx="60" cy="146" rx="40" ry="5" fill="#374151" />
    <rect x="96" y="40" width="3" height="94" fill="#6b7280" /><circle cx="97.5" cy="40" r="9" fill="#ef4444" /><rect x="91" y="38" width="13" height="4" fill="#fff" />
    <rect x="20" y="116" width="56" height="4" fill="#6b7280" /><rect x="24" y="120" width="3" height="12" fill="#6b7280" /><rect x="69" y="120" width="3" height="12" fill="#6b7280" />
    <path d="M36 116Q34 78 50 76Q66 78 64 116L60 112L56 117L52 112L48 117L44 112L40 117Z" fill="#f9fafb" />
    <ellipse cx="46" cy="90" rx="2.5" ry="3.5" fill="#111827" /><ellipse cx="55" cy="90" rx="2.5" ry="3.5" fill="#111827" />
    <ellipse cx="50" cy="150" rx="10" ry="2" fill="#f9fafb" opacity=".25" />
  </>],
  ['#7fb3ff', '#cfe6ff', 'ฟ้าที่หายไปชิ้นหนึ่ง', <>
    <Cloud x={20} y={30} /><Cloud x={98} y={60} s={1.2} /><Cloud x={30} y={88} s={.8} o={.8} />
    <g transform="translate(46 30) scale(1.1)"><path d={Piece} fill="#0b0b1e" /><Stars p={[8, 8, 20, 14, 14, 26, 26, 24, 6, 20]} /><circle cx="22" cy="8" r="3" fill="#fff4c2" /></g>
    <path d="M0 124Q60 108 120 128V160H0Z" fill="#7cc36a" />
    <g transform="translate(64 116) rotate(18) scale(.75)"><path d={Piece} fill="#9cc6ff" stroke="#6a9ad8" /><Cloud x={14} y={16} s={.5} /></g>
    <circle cx="40" cy="128" r="2.5" fill="#333" /><path d="M38 130h4v8h-4z" fill="#333" />
  </>],
  ['#1d1b3a', '#3b2f6b', 'จรวดกล่องกระดาษ', <>
    <Stars p={[10, 10, 40, 20, 100, 14, 110, 50, 20, 60, 90, 40, 64, 6]} />
    <circle cx="96" cy="76" r="10" fill="#f4a261" /><path d="M86 74q10 4 20 0" stroke="#e76f51" fill="none" />
    <polygon points="40,132 46,152 52,134 58,156 64,134 70,152 78,132" fill="#ff9f1c" /><polygon points="46,132 52,146 58,134 64,148 72,132" fill="#ffd166" />
    <rect x="36" y="94" width="48" height="40" fill="#c89b5c" /><polygon points="36,94 26,84 46,90" fill="#b5884d" /><polygon points="84,94 94,84 74,90" fill="#b5884d" />
    <circle cx="70" cy="114" r="7" fill="#7fd1ff" stroke="#333" strokeWidth="1.2" /><path d="M42 104l8 8M50 104l-8 8" stroke="#e63946" strokeWidth="1.5" />
    <circle cx="56" cy="82" r="11" fill="#f1c27d" /><circle cx="52" cy="82" r="1.3" fill="#333" /><circle cx="60" cy="82" r="1.3" fill="#333" /><path d="M53 87q3 2 6 0" stroke="#333" fill="none" />
    <path d="M44 78Q56 60 68 78Z" fill="#b0b7c3" /><g fill="#8a919c"><circle cx="50" cy="72" r="1" /><circle cx="56" cy="69" r="1" /><circle cx="62" cy="72" r="1" /></g>
  </>],
  ['#c9d6df', '#8aa1b1', 'สะพานขาด', <>
    <Cloud x={30} y={30} f="#e6edf2" /><Cloud x={96} y={22} s={.8} f="#e6edf2" />
    <path d="M0 80H30L36 160H0Z" fill="#3d4a5a" /><path d="M120 76H90L84 160H120Z" fill="#3d4a5a" />
    <path d="M28 82Q40 92 52 98" stroke="#6b5640" strokeWidth="3" fill="none" /><path d="M92 78Q80 90 68 96" stroke="#6b5640" strokeWidth="3" fill="none" />
    <path d="M28 76Q40 84 52 90M92 72Q80 82 68 88" stroke="#8a7560" fill="none" />
    <Lines p={[52, 98, 50, 112, 68, 96, 70, 108]} c="#6b5640" />
    <g fill="#1f2933"><circle cx="20" cy="66" r="3" /><rect x="17.5" y="69" width="5" height="11" /><circle cx="100" cy="62" r="3" /><rect x="97.5" y="65" width="5" height="11" /></g>
    <path d="M22 70l5-6" stroke="#1f2933" strokeWidth="1.5" /><path d="M98 66l-5-6" stroke="#1f2933" strokeWidth="1.5" />
    <rect y="138" width="120" height="22" fill="#c9d6df" opacity=".5" />
  </>],
  ['#2b1d0e', '#4a3218', 'มังกรหลับบนกองทอง', <>
    <Glow x={60} y={130} r={60} f="#f0c040" o={.12} />
    <path d="M0 160Q10 120 40 118Q60 104 80 118Q110 120 120 160Z" fill="#f0c040" />
    <g fill="#ffd966" stroke="#c99a1e" strokeWidth=".6"><circle cx="20" cy="140" r="4" /><circle cx="48" cy="124" r="4" /><circle cx="96" cy="136" r="4" /><circle cx="70" cy="150" r="4" /><circle cx="30" cy="154" r="4" /></g>
    <path d="M18 128Q20 96 52 96Q86 96 96 116Q100 128 84 126" fill="#3c8d5a" />
    <path d="M84 126Q104 140 110 120" stroke="#3c8d5a" strokeWidth="6" fill="none" strokeLinecap="round" /><polygon points="110,120 116,112 106,116" fill="#2d6b44" />
    <path d="M30 100l4-8 4 8M44 96l4-9 4 9M58 96l4-8 4 8M72 100l4-7 4 7" fill="#2d6b44" />
    <ellipse cx="22" cy="118" rx="14" ry="9" fill="#46a066" /><path d="M14 116q4 2 8 0" stroke="#1e4a30" strokeWidth="1.3" fill="none" />
    <polygon points="28,110 36,100 32,112" fill="#e8d8b0" /><circle cx="10" cy="120" r="1" fill="#1e4a30" />
    <circle cx="6" cy="112" r="2.5" fill="#bbb" opacity=".5" /><circle cx="3" cy="104" r="3.5" fill="#bbb" opacity=".35" />
  </>],
  ['#fff5f5', '#ffe0e0', 'ด้ายแดงที่ผูกไว้', <>
    <path d="M0 96L20 80L34 90L50 72L66 88L84 74L100 86L120 78V104H0Z" fill="#ffc9c9" />
    <path d="M30 124Q50 140 60 100Q70 50 92 40" stroke="#e03131" strokeWidth="1.5" fill="none" />
    <g fill="#f1c7a6"><rect x="6" y="122" width="26" height="22" rx="8" /><rect x="26" y="118" width="12" height="6" rx="3" /></g>
    <g fill="#e0b48f"><rect x="84" y="28" width="26" height="22" rx="8" /><rect x="80" y="40" width="12" height="6" rx="3" /></g>
    <circle cx="33" cy="121" r="2.4" fill="none" stroke="#e03131" strokeWidth="1.5" /><circle cx="88" cy="43" r="2.4" fill="none" stroke="#e03131" strokeWidth="1.5" />
  </>],
  ['#dff4ff', '#0b3d6b', 'ภูเขาน้ำแข็ง', <>
    <rect y="0" width="120" height="52" fill="#dff4ff" /><Bird x={26} y={20} c="#555" /><Bird x={36} y={26} s={.7} c="#555" />
    <polygon points="44,52 54,34 60,40 68,30 78,52" fill="#fff" />
    <polygon points="44,52 78,52 100,80 92,120 70,150 40,140 18,104 24,72" fill="#9fd8f0" opacity=".65" />
    <path d="M0 52h120" stroke="#fff" />
    <path d="M90 48h14l-2 4h-10z" fill="#e63946" /><line x1="97" y1="48" x2="97" y2="40" stroke="#333" />
    <path d="M100 130q4-4 8 0q-4 4-8 0zM108 130l3-2v4z" fill="#ffd166" />
  </>],
  ['#ffcf8b', '#f4a259', 'ประตูกลางทะเลทราย', <>
    <circle cx="94" cy="30" r="12" fill="#fff3c4" />
    <path d="M0 110Q30 96 60 108T120 104V160H0Z" fill="#e8925a" /><path d="M0 130Q40 116 80 132T120 126V160H0Z" fill="#d97c45" />
    <polygon points="44,124 76,124 120,150 84,150" fill="#000" opacity=".15" />
    <rect x="40" y="60" width="28" height="64" fill="#6b3f1d" />
    <rect x="43" y="63" width="22" height="61" fill="#86d0f5" /><path d="M43 106Q54 98 65 104V124H43Z" fill="#6cc04a" /><Cloud x={52} y={78} s={.4} />
    <polygon points="65,63 80,68 80,128 65,124" fill="#8b5a2b" /><circle cx="76" cy="98" r="1.4" fill="#f2c14e" />
  </>],
  ['#f9e79f', '#a3d977', 'หมีกอดรังผึ้ง', <>
    <rect x="76" y="0" width="16" height="160" fill="#7a5230" /><path d="M76 40H40" stroke="#7a5230" strokeWidth="5" />
    <path d="M48 44v6" stroke="#5a3c22" />
    <ellipse cx="48" cy="62" rx="12" ry="14" fill="#f4b400" /><path d="M37 56h22M36 64h24M38 72h20" stroke="#c98a00" />
    <ellipse cx="54" cy="116" rx="24" ry="30" fill="#8d5524" /><circle cx="52" cy="80" r="15" fill="#8d5524" />
    <circle cx="40" cy="68" r="5" fill="#8d5524" /><circle cx="64" cy="68" r="5" fill="#8d5524" />
    <ellipse cx="50" cy="86" rx="6" ry="4" fill="#c68642" /><circle cx="50" cy="84" r="1.6" fill="#222" /><path d="M43 78q2-2 4 0M53 78q2-2 4 0" stroke="#222" fill="none" />
    <path d="M30 100Q38 74 52 72" stroke="#8d5524" strokeWidth="8" fill="none" strokeLinecap="round" />
    {[[30, 46], [70, 54], [24, 64], [64, 34]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="3" ry="2" fill="#222" /><ellipse cx={x} cy={y - 2.5} rx="2" ry="1.3" fill="#fff" opacity=".8" /></g>)}
  </>],
  ['#2c2c2c', '#111', 'บันไดวน', <>
    {[58, 48, 38, 29, 21, 14, 8].map((r, i) => <circle key={i} cx="60" cy="80" r={r} fill={i % 2 ? '#3b3b3b' : '#6b6b6b'} />)}
    <circle cx="60" cy="80" r="4" fill="#000" />
    {Array.from({ length: 18 }, (_, i) => <line key={i} x1="60" y1="80" x2={60 + 58 * Math.cos(i * .349 + i * .02)} y2={80 + 58 * Math.sin(i * .349 + i * .02)} stroke="#1c1c1c" strokeWidth=".8" />)}
    <path d="M60 22A58 58 0 0 1 118 80" stroke="#b08d57" strokeWidth="3" fill="none" />
    <ellipse cx="104" cy="34" rx="6" ry="3" fill="#f1c27d" transform="rotate(40 104 34)" />
  </>],
  ['#e0f7fa', '#b2ebf2', 'หุ่นยนต์รดน้ำต้นไม้', <>
    <rect y="132" width="120" height="28" fill="#90a4ae" /><path d="M86 132l4 6-3 4 5 6" stroke="#546e7a" fill="none" />
    <path d="M88 132q0-12 2-18" stroke="#43a047" strokeWidth="1.5" fill="none" /><path d="M89 122q-6-4-8 0q4 3 8 0z" fill="#43a047" /><Flower x={90} y={112} s={.9} c="#ff7043" />
    <rect x="22" y="80" width="34" height="40" rx="4" fill="#b0bec5" /><rect x="26" y="120" width="8" height="12" fill="#78909c" /><rect x="44" y="120" width="8" height="12" fill="#78909c" />
    <rect x="26" y="54" width="26" height="22" rx="4" fill="#cfd8dc" /><circle cx="34" cy="65" r="3.5" fill="#26c6da" /><circle cx="45" cy="65" r="3.5" fill="#26c6da" />
    <line x1="39" y1="54" x2="39" y2="44" stroke="#78909c" strokeWidth="1.5" /><circle cx="39" cy="43" r="2.5" fill="#ef5350" />
    <circle cx="34" cy="98" r="3" fill="#ffca28" /><path d="M56 90l12 4" stroke="#78909c" strokeWidth="4" strokeLinecap="round" />
    <path d="M66 88h14v12h-14z" fill="#66bb6a" /><path d="M80 90l8-4" stroke="#66bb6a" strokeWidth="3" />
    <Lines p={[90, 90, 90, 96, 93, 92, 94, 98, 87, 92, 86, 98]} c="#29b6f6" w={1.2} />
  </>],
  ['#f3e2b8', '#e0c48a', 'แผนที่ขุมทรัพย์', <>
    <path d="M8 10L30 6L48 12L70 6L94 10L112 8L110 40L114 70L108 104L112 150L84 154L60 148L36 154L10 150L12 112L6 76L10 44Z" fill="#f7ecd0" stroke="#b08850" />
    <path d="M24 40Q20 30 34 28Q50 24 56 36Q66 48 56 60Q40 66 30 58Q22 52 24 40Z" fill="#cde3a9" stroke="#8a9a5b" />
    <path d="M70 90Q66 78 82 76Q100 76 98 92Q96 112 82 112Q68 108 70 90Z" fill="#cde3a9" stroke="#8a9a5b" />
    <path d="M40 60Q50 76 56 86T76 94" stroke="#a23b2a" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
    <path d="M80 92l8 8M88 92l-8 8" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round" />
    <g transform="translate(30 122)"><circle r="10" fill="none" stroke="#8b5a2b" /><polygon points="0,-12 3,0 0,12 -3,0" fill="#8b5a2b" /><polygon points="-12,0 0,-3 12,0 0,3" fill="#b08850" /></g>
    <path d="M78 136q4-6 8 0q4-6 8 0" stroke="#5a7a9a" fill="none" /><path d="M96 130q3-6 7-2" stroke="#5a7a9a" strokeWidth="2" fill="none" />
    <path d="M18 92q6-3 12 0M86 52q6-3 12 0" stroke="#5a7a9a" fill="none" />
  </>],
  ['#0b1d3a', '#1e3a5f', 'ตกพระจันทร์', <>
    <Stars p={[10, 10, 30, 30, 100, 10, 110, 60, 50, 6, 20, 70]} />
    <path d="M86 18a20 20 0 1 0 14 34a16 16 0 1 1-14-34z" fill="#fff4c2" />
    <path d="M38 102Q60 30 92 44" stroke="#cfd8e6" strokeWidth=".7" fill="none" /><path d="M92 44q4 4 0 8" stroke="#cfd8e6" fill="none" />
    <rect y="110" width="120" height="50" fill="#0a1a30" />
    <path d="M0 116q10-4 20 0t20 0t20 0t20 0t20 0t20 0" stroke="#3a5a80" fill="none" />
    <g fill="#fff4c2" opacity=".5"><rect x="80" y="126" width="14" height="2" /><rect x="84" y="134" width="8" height="2" /><rect x="82" y="142" width="10" height="2" /></g>
    <path d="M18 108H58L52 116H24Z" fill="#6b4226" /><circle cx="38" cy="96" r="4" fill="#0f1626" /><path d="M34 100h8v8h-8z" fill="#0f1626" /><path d="M36 92h4l-2-4z" fill="#0f1626" />
    <line x1="40" y1="102" x2="38" y2="102" stroke="#0f1626" strokeWidth="2" />
  </>],
  ['#f5e6c8', '#e8cfa0', 'เงาแมวที่เป็นสิงโต', <>
    <rect y="130" width="120" height="30" fill="#b98d5b" />
    <g fill="#6b4c2f" opacity=".5"><circle cx="76" cy="66" r="24" /><ellipse cx="88" cy="104" rx="26" ry="20" /><rect x="70" y="110" width="8" height="20" /><rect x="96" y="110" width="8" height="20" /><path d="M112 98q10-10 6-26" stroke="#6b4c2f" strokeWidth="4" fill="none" /></g>
    <polygon points="0,30 12,30 20,40 0,40" fill="#444" /><polygon points="0,40 22,40 50,130 0,130" fill="#fff8d0" opacity=".25" />
    <g fill="#e08e45"><ellipse cx="34" cy="124" rx="9" ry="7" /><circle cx="28" cy="114" r="6" /><polygon points="23,111 24,104 28,109" /><polygon points="33,111 32,104 28,109" /></g>
    <path d="M43 124q8 2 6-8" stroke="#e08e45" strokeWidth="2.5" fill="none" strokeLinecap="round" /><circle cx="26" cy="114" r=".9" fill="#222" /><circle cx="30" cy="114" r=".9" fill="#222" />
  </>],
  ['#16213e', '#0f3460', 'บันไดพาดพระจันทร์', <>
    <Stars p={[10, 10, 24, 40, 50, 14, 110, 90, 16, 80, 60, 50]} />
    <Glow x={82} y={40} r={40} f="#fff4c2" o={.15} /><circle cx="82" cy="40" r="26" fill="#fff4c2" /><circle cx="74" cy="34" r="4" fill="#efe2a8" /><circle cx="90" cy="48" r="6" fill="#efe2a8" />
    <path d="M0 130L20 118L40 130V160H0ZM40 136H80V160H40ZM80 126L100 112L120 126V160H80Z" fill="#0a1128" />
    <g stroke="#c8a06a" strokeWidth="1.5"><line x1="24" y1="122" x2="58" y2="56" /><line x1="34" y1="126" x2="66" y2="60" /><line x1="27" y1="116" x2="37" y2="120" /><line x1="33" y1="104" x2="43" y2="108" /><line x1="39" y1="92" x2="49" y2="96" /><line x1="45" y1="80" x2="55" y2="84" /><line x1="51" y1="68" x2="61" y2="72" /></g>
    <circle cx="46" cy="86" r="2.4" fill="#0a1128" /><path d="M44 88h4v6h-4z" fill="#0a1128" />
  </>],
  ['#2d1b3d', '#5b2a4e', 'รองเท้าแดงบนบันได', <>
    {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={i * 6} y={60 + i * 16} width={120 - i * 12} height="16" fill={i % 2 ? '#4a2a4a' : '#57325a'} />)}
    <path d="M0 60H8V160H0ZM112 60H120V160H112Z" fill="#3a2040" />
    <path d="M44 108Q46 96 56 98Q66 102 74 102Q80 102 80 108Z" fill="#e5383b" /><path d="M48 108l-2 8" stroke="#e5383b" strokeWidth="2.5" />
    <Stars p={[40, 90, 84, 96, 60, 84, 30, 120, 92, 124]} f="#ffd6e0" r={1} />
    <Glow x={62} y={104} r={26} f="#ff8fa3" o={.12} />
  </>],
  ['#d4f1f9', '#a7d8ee', 'ฟองสบู่เก็บความทรงจำ', <>
    <path d="M6 156L30 132" stroke="#c48b4a" strokeWidth="4" strokeLinecap="round" /><circle cx="34" cy="128" r="6" fill="none" stroke="#c48b4a" strokeWidth="2" />
    <g fill="#fff" fillOpacity=".25" stroke="#fff" strokeWidth="1.2"><circle cx="46" cy="104" r="12" /><circle cx="78" cy="78" r="16" /><circle cx="40" cy="56" r="14" /><circle cx="88" cy="32" r="12" /><circle cx="62" cy="20" r="6" /></g>
    <path d="M42 108v-6l4-4 4 4v6z" fill="#e76f51" />
    <path d="M70 78q8-8 16 0q-8 8-16 0zM86 78l5-4v8z" fill="#f4a261" />
    <path d="M40 62l-6-6a4 4 0 0 1 6-5a4 4 0 0 1 6 5z" fill="#ef476f" />
    <path d="M92 26a6 6 0 1 0 2 10a5 5 0 1 1-2-10z" fill="#ffd166" />
    <g fill="#fff" opacity=".8"><ellipse cx="72" cy="70" rx="3" ry="1.5" /><ellipse cx="35" cy="48" rx="3" ry="1.5" /><ellipse cx="42" cy="97" rx="2" ry="1" /></g>
  </>],
  ['#ffe5ec', '#ffb3c6', 'ภูเขาไฟพ่นดอกไม้', <>
    <polygon points="14,150 48,74 72,74 106,150" fill="#8d6e63" /><polygon points="48,74 72,74 66,86 54,86" fill="#6d4c41" />
    <path d="M52 76Q40 40 20 30M60 74Q60 30 62 14M68 76Q84 40 104 34" stroke="#ff8fab" strokeWidth="2" strokeDasharray="2 4" fill="none" />
    <Flower x={20} y={30} c="#ff4d6d" /><Flower x={62} y={14} c="#ffd166" m="#ff4d6d" /><Flower x={104} y={34} c="#c77dff" /><Flower x={38} y={48} s={.7} c="#ff8fab" /><Flower x={84} y={50} s={.7} c="#7bdff2" /><Flower x={60} y={40} s={.6} c="#ff4d6d" />
    <path d="M56 86Q50 110 38 120Q30 130 22 150" stroke="#ff8fab" strokeWidth="4" fill="none" />
    <rect y="150" width="120" height="10" fill="#80b918" />
  </>],
  ['#a8e6cf', '#dcedc1', 'ยักษ์หลับกับรถไฟ', <>
    <Cloud x={24} y={26} /><Cloud x={98} y={40} s={.8} />
    <path d="M0 140V100Q10 70 30 66Q40 50 56 56Q62 44 72 52Q80 58 76 66Q96 64 110 80Q120 90 120 100V140Z" fill="#6a994e" />
    <path d="M36 74q6 4 12 0" stroke="#386641" strokeWidth="2" fill="none" /><path d="M84 82q4 3 8 0" stroke="#386641" fill="none" />
    <path d="M56 140V122a10 10 0 0 1 20 0V140Z" fill="#1b2e1b" />
    <rect y="140" width="120" height="20" fill="#a68a64" /><Lines p={[0, 141, 120, 141, 0, 145, 120, 145]} c="#5c4a32" w={1} />
    <g><rect x="28" y="126" width="24" height="14" rx="2" fill="#bc4749" /><rect x="6" y="128" width="20" height="12" rx="2" fill="#f2e8cf" /><rect x="44" y="118" width="5" height="8" fill="#333" /><circle cx="34" cy="141" r="2.5" fill="#333" /><circle cx="46" cy="141" r="2.5" fill="#333" /><circle cx="12" cy="141" r="2.5" fill="#333" /><circle cx="22" cy="141" r="2.5" fill="#333" /></g>
    <circle cx="48" cy="110" r="4" fill="#fff" opacity=".8" /><circle cx="42" cy="100" r="6" fill="#fff" opacity=".6" /><circle cx="34" cy="88" r="8" fill="#fff" opacity=".4" />
  </>],
];
