// ภาพการ์ด 126–150 • [สีบน, สีล่าง, ชื่อภาพ, เนื้อภาพ] • viewBox 120x160
import React from 'react';
import { Stars, Cloud, Glow, Pine, Bird, Lines } from './picbits.jsx';

export const ART6 = [
  ['#5c677d', '#33415c', 'แมวมองฝนจากหน้าต่าง', <>
    <rect x="14" y="16" width="92" height="96" fill="#7d8597" /><Lines p={[60, 16, 60, 112, 14, 64, 106, 64]} c="#5c4d3c" w={4} /><rect x="10" y="12" width="100" height="104" fill="none" stroke="#5c4d3c" strokeWidth="7" />
    <g fill="#caf0f8" opacity=".7">{[[24, 30], [40, 50], [80, 26], [96, 46], [30, 86], [74, 80], [92, 96], [50, 100]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q-2 4 0 5q2-1 0-5z`} />)}</g>
    <Lines p={[24, 34, 24, 44, 80, 30, 80, 42, 74, 84, 74, 96]} c="#caf0f8" o={.4} />
    <rect y="112" width="120" height="48" fill="#a68a64" /><rect x="6" y="112" width="108" height="6" fill="#7f5539" />
    <g fill="#1b1b1b"><ellipse cx="62" cy="104" rx="12" ry="9" /><circle cx="60" cy="88" r="8" /><polygon points="53,84 54,74 59,81" /><polygon points="67,84 66,74 61,81" /></g>
    <path d="M74 108q12 2 10 8" stroke="#1b1b1b" strokeWidth="3" fill="none" strokeLinecap="round" />
    <Glow x={60} y={150} r={40} f="#ffd166" o={.15} /><rect x="96" y="124" width="10" height="16" fill="#f1e6d0" /><path d="M101 116q-3 4 0 7q3-3 0-7z" fill="#ffb703" />
  </>],
  ['#ff006e', '#8338ec', 'หมวกนักมายากล', <>
    <Stars p={[10, 10, 30, 40, 100, 20, 110, 70, 20, 90, 90, 100]} f="#ffbe0b" r={1.2} />
    <ellipse cx="60" cy="132" rx="38" ry="8" fill="#111" /><path d="M36 132V96H84V132Z" fill="#1b1b1b" /><rect x="36" y="118" width="48" height="6" fill="#ff006e" /><ellipse cx="60" cy="96" rx="24" ry="5" fill="#000" />
    <ellipse cx="50" cy="80" rx="4" ry="14" fill="#fff" transform="rotate(-12 50 80)" /><ellipse cx="50" cy="80" rx="2" ry="10" fill="#ffafcc" transform="rotate(-12 50 80)" />
    <g stroke="#ffbe0b" strokeWidth="2"><line x1="66" y1="96" x2="74" y2="10" /><line x1="74" y1="96" x2="82" y2="10" /></g>
    <Lines p={[67, 84, 75, 84, 68, 70, 76, 70, 70, 56, 78, 56, 71, 42, 79, 42, 72, 28, 80, 28]} c="#ffbe0b" w={2} />
  </>],
  ['#e9edc9', '#ccd5ae', 'วิทยุเก่าที่โน้ตกลายเป็นนก', <>
    <rect y="118" width="120" height="42" fill="#a98467" />
    <rect x="20" y="78" width="60" height="42" rx="8" fill="#bc6c25" /><circle cx="38" cy="99" r="12" fill="#dda15e" /><Lines p={[28, 95, 48, 95, 28, 99, 48, 99, 28, 103, 48, 103]} c="#bc6c25" />
    <rect x="56" y="88" width="18" height="8" rx="2" fill="#fefae0" /><circle cx="60" cy="108" r="3" fill="#6b4226" /><circle cx="70" cy="108" r="3" fill="#6b4226" />
    <path d="M62 78L80 58" stroke="#6b4226" />
    <g fill="#283618"><path d="M80 76v-10l6-2v10" stroke="#283618" fill="none" strokeWidth="1.3" /><ellipse cx="79" cy="76" rx="2.5" ry="2" /><ellipse cx="85" cy="74" rx="2.5" ry="2" /></g>
    <g fill="#283618"><path d="M92 60v-10" stroke="#283618" strokeWidth="1.3" /><ellipse cx="91" cy="60" rx="2.5" ry="2" /></g>
    <Bird x={100} y={42} c="#283618" /><Bird x={92} y={26} s={1.3} c="#283618" /><Bird x={106} y={16} s={.9} c="#283618" />
  </>],
  ['#0b132b', '#1c2541', 'บัวรดน้ำเทดาวลงหมู่บ้าน', <>
    <g transform="rotate(30 50 30)"><path d="M30 20H64V44H30Z" fill="#5bc0be" /><path d="M64 26L84 18L86 22L64 34" fill="#5bc0be" /><path d="M36 20q10-14 22 0" stroke="#5bc0be" strokeWidth="3" fill="none" /></g>
    <Stars p={[78, 52, 72, 64, 84, 70, 66, 80, 80, 88, 88, 96, 70, 98, 76, 108]} f="#ffd60a" r={1.2} />
    <path d="M0 160V128L14 118L28 128V122H40V160ZM40 160V132L56 120L72 132V160ZM72 160V124L88 112L104 124V160ZM104 160V130L120 122V160Z" fill="#06070e" />
    <g fill="#ffd166"><rect x="12" y="134" width="4" height="5" /><rect x="54" y="138" width="4" height="5" /><rect x="86" y="128" width="4" height="5" /></g>
    <Glow x={80} y={120} r={30} f="#ffd60a" o={.15} />
  </>],
  ['#e0e1dd', '#c9cdc4', 'สัตว์ประหลาดถุงเท้า', <>
    <rect y="132" width="120" height="28" fill="#778da9" />
    <path d="M10 134Q8 90 30 80Q40 50 64 56Q90 52 96 84Q114 96 110 134Z" fill="#fff" />
    <g fill="#e63946"><path d="M20 120h20v6h-20z" transform="rotate(-20 30 123)" /></g><path d="M30 92h22v6h-22z" fill="#457b9d" transform="rotate(14 41 95)" /><path d="M70 70h18v7h-18z" fill="#ffd166" transform="rotate(-8 79 73)" /><path d="M76 110h22v6h-22z" fill="#2a9d8f" transform="rotate(24 87 113)" />
    <circle cx="50" cy="108" r="5" fill="#fff" stroke="#333" /><circle cx="66" cy="106" r="5" fill="#fff" stroke="#333" /><circle cx="51" cy="109" r="2" fill="#222" /><circle cx="67" cy="107" r="2" fill="#222" />
    <path d="M50 118q8 6 16 0" stroke="#333" fill="none" /><path d="M54 120l2 3 2-2" stroke="#333" fill="none" />
    <path d="M40 60l-10-20h10l-2-8" stroke="#e76f51" strokeWidth="5" fill="none" strokeLinecap="round" />
  </>],
  ['#a9d6e5', '#61a5c2', 'หมีขั้วโลกบนน้ำแข็งก้อนเล็ก', <>
    <rect y="104" width="120" height="56" fill="#2c7da0" /><path d="M0 108q10-3 20 0t20 0t20 0t20 0t20 0t20 0" stroke="#89c2d9" fill="none" />
    <path d="M38 112L44 104H78L84 112L80 118H42Z" fill="#fff" /><path d="M42 118H80L76 122H46Z" fill="#a9d6e5" />
    <ellipse cx="62" cy="96" rx="14" ry="9" fill="#f8f9fa" /><circle cx="50" cy="88" r="7" fill="#f8f9fa" /><circle cx="46" cy="83" r="2" fill="#f8f9fa" /><circle cx="48" cy="88" r="1" fill="#222" /><circle cx="44" cy="90" r="1.2" fill="#222" />
    <rect x="54" y="100" width="5" height="6" fill="#f8f9fa" /><rect x="68" y="100" width="5" height="6" fill="#f8f9fa" />
    <path d="M52 84Q50 50 62 30" stroke="#555" strokeWidth=".7" fill="none" /><ellipse cx="62" cy="22" rx="9" ry="11" fill="#ef476f" />
    <ellipse cx="62" cy="132" rx="24" ry="4" fill="#fff" opacity=".2" />
  </>],
  ['#000814', '#001d3d', 'ปลาตะเกียงใต้ทะเลลึก', <>
    <g fill="#caf0f8" opacity=".3"><circle cx="20" cy="30" r="1" /><circle cx="100" cy="20" r="1.4" /><circle cx="90" cy="140" r="1" /><circle cx="14" cy="120" r="1.2" /></g>
    <path d="M60 70Q66 40 86 34" stroke="#3a506b" strokeWidth="1.5" fill="none" /><circle cx="86" cy="32" r="4" fill="#d9ff6b" /><Glow x={86} y={32} r={26} f="#d9ff6b" o={.3} />
    <path d="M10 110Q20 70 56 70Q90 72 96 100Q90 130 56 130Q30 130 10 110Z" fill="#1c2541" />
    <path d="M10 110L0 96V124Z" fill="#1c2541" />
    <path d="M66 112L96 104L90 116Z" fill="#000" /><path d="M70 110l2 4 3-4 2 4 3-5 2 4 3-5" stroke="#e0e1dd" fill="none" />
    <circle cx="70" cy="90" r="6" fill="#e0e1dd" /><circle cx="71" cy="90" r="3" fill="#000" />
  </>],
  ['#ffcb69', '#d08c60', 'สองคนบนม้านั่งกับร่มคันเดียว', <>
    <circle cx="60" cy="110" r="34" fill="#ffe8a3" opacity=".7" />
    <rect y="128" width="120" height="32" fill="#797d62" />
    <rect x="22" y="112" width="76" height="5" fill="#3d2b1f" /><rect x="28" y="117" width="4" height="12" fill="#3d2b1f" /><rect x="88" y="117" width="4" height="12" fill="#3d2b1f" /><rect x="22" y="98" width="76" height="4" fill="#3d2b1f" />
    <g fill="#3d2b1f"><circle cx="42" cy="86" r="7" /><path d="M34 112q0-18 8-18t8 18z" /><circle cx="78" cy="88" r="6" /><path d="M71 112q0-16 7-16t7 16z" /></g>
    <path d="M62 96V62" stroke="#3d2b1f" strokeWidth="1.5" /><path d="M40 64Q62 40 84 64Z" fill="#3d2b1f" />
  </>],
  ['#fefae0', '#fbe8d3', 'จักรยานกับตะกร้าดอกไม้', <>
    <rect x="0" y="0" width="120" height="120" fill="#e9c46a" opacity=".5" /><Lines p={[0, 30, 120, 30, 0, 60, 120, 60, 0, 90, 120, 90]} c="#d4a373" o={.4} />
    <rect y="120" width="120" height="40" fill="#adb5bd" />
    <g stroke="#264653" strokeWidth="2.5" fill="none"><circle cx="30" cy="124" r="16" /><circle cx="90" cy="124" r="16" /><path d="M30 124L50 96H80L90 124M50 96L60 124H30M60 124L80 96M48 92h8M80 96L76 84h8" /></g>
    <path d="M78 74H98L94 88H82Z" fill="#a47148" /><g fill="#e63946"><circle cx="82" cy="72" r="4" /><circle cx="92" cy="70" r="4" /></g><g fill="#ffb703"><circle cx="87" cy="68" r="4" /><circle cx="96" cy="74" r="3" /></g><circle cx="78" cy="76" r="3" fill="#8338ec" />
  </>],
  ['#212529', '#495057', 'เรือผีในขวดกลางพายุ', <>
    <Lines p={[10, 0, 4, 20, 40, 6, 34, 26, 90, 4, 84, 24, 110, 30, 104, 50]} c="#adb5bd" o={.5} />
    <g transform="rotate(-14 60 90)"><rect x="14" y="66" width="84" height="48" rx="20" fill="#caf0f8" opacity=".2" stroke="#e9ecef" /><rect x="98" y="80" width="12" height="20" fill="#caf0f8" opacity=".2" stroke="#e9ecef" /><rect x="110" y="82" width="6" height="16" fill="#8d6e63" />
      <path d="M20 102q10-6 20 0t20 0t20 0t16 0V110H20Z" fill="#1d3557" opacity=".8" />
      <path d="M36 100H80L74 106H42Z" fill="#3d2b1f" /><path d="M58 100V72M44 100V78" stroke="#3d2b1f" /><path d="M58 74L76 82L58 94ZM44 80L56 86L44 96Z" fill="#e0e1dd" opacity=".7" /></g>
    <polygon points="22,26 16,40 22,40 18,52 28,36 22,36 26,26" fill="#ffd60a" />
  </>],
  ['#fff3e0', '#ffe0b2', 'มือติดในโหลคุกกี้', <>
    <rect y="124" width="120" height="36" fill="#bc8a5f" />
    <path d="M34 124V70Q34 62 42 62H78Q86 62 86 70V124Z" fill="#caf0f8" opacity=".5" stroke="#90e0ef" /><rect x="38" y="54" width="44" height="8" rx="2" fill="#e76f51" transform="rotate(20 100 40)" />
    <g fill="#d4a373">{[[46, 112], [62, 116], [74, 108], [52, 98], [70, 94]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" />)}</g>
    <g fill="#6f4518">{[[44, 110], [48, 114], [62, 114], [74, 106], [52, 96], [70, 92]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" />)}</g>
    <path d="M52 62L56 84Q60 92 66 86L70 62" fill="#f1c27d" /><path d="M48 10L52 62H70L72 10Z" fill="#4361ee" />
    <path d="M24 30l-6-4M22 40h-8M100 30l6-4M100 40h8" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
  </>],
  ['#dee2e6', '#f8f9fa', 'ร่มชายหาดกลางหิมะ', <>
    <Stars p={[10, 14, 30, 34, 50, 10, 70, 30, 90, 14, 110, 40, 20, 60, 100, 70, 60, 54]} f="#fff" r={1.4} />
    <rect y="110" width="120" height="50" fill="#fff" /><path d="M0 110Q60 100 120 112" stroke="#dee2e6" fill="none" />
    <line x1="64" y1="62" x2="56" y2="126" stroke="#6c757d" strokeWidth="2" />
    <path d="M30 70Q60 36 96 62Z" fill="#ef476f" /><path d="M48 52Q56 50 62 62L78 50Q74 46 72 46Z" fill="#fff" />
    <path d="M30 70Q60 52 96 62" stroke="#fff" fill="none" />
    <path d="M24 118H58L56 126H26Z" fill="#ffd166" /><path d="M72 120q4-6 12-4q2 6-6 8z" fill="#f4a261" />
    <circle cx="96" cy="120" r="6" fill="#fff" stroke="#dee2e6" /><circle cx="96" cy="110" r="4.5" fill="#fff" stroke="#dee2e6" />
  </>],
  ['#b5e48c', '#52b69a', 'กังหันลมบนเนิน', <>
    <Cloud x={24} y={24} /><Cloud x={100} y={44} s={.8} />
    <path d="M0 160V120Q60 90 120 120V160Z" fill="#34a0a4" />
    <line x1="60" y1="64" x2="60" y2="104" stroke="#555" strokeWidth="1.5" />
    <g transform="translate(60 64) rotate(15)"><path d="M0 0L0-18L10-8Z" fill="#ef476f" /><path d="M0 0L18 0L8 10Z" fill="#ffd166" /><path d="M0 0L0 18L-10 8Z" fill="#118ab2" /><path d="M0 0L-18 0L-8-10Z" fill="#06d6a0" /><circle r="2" fill="#fff" /></g>
    <path d="M90 60q10-4 20 0M84 70q12-4 24 0M96 80q8-3 16 0" stroke="#fff" fill="none" opacity=".8" />
  </>],
  ['#caf0f8', '#0077b6', 'คลื่นยักษ์กับนักโต้คลื่น', <>
    <circle cx="26" cy="22" r="10" fill="#fff3b0" />
    <path d="M0 160V100Q20 60 60 40Q100 26 116 50Q118 66 100 64Q86 60 88 74Q92 86 104 84V160Z" fill="#023e8a" />
    <path d="M60 40Q100 26 116 50Q118 66 100 64Q86 60 88 74" stroke="#fff" strokeWidth="3" fill="none" />
    <path d="M30 80Q50 60 70 54M20 110Q40 90 70 84" stroke="#0096c7" strokeWidth="3" fill="none" />
    <path d="M100 66q4 4 2 8M108 60l4 2M112 54l4-2" stroke="#fff" fill="none" />
    <g transform="rotate(-24 48 120)"><ellipse cx="48" cy="124" rx="12" ry="2.5" fill="#ffd166" /><circle cx="48" cy="108" r="3" fill="#222" /><path d="M48 111v8l-4 4M48 119l4 4M48 113l-6-2M48 113l6-4" stroke="#222" strokeWidth="2" fill="none" /></g>
  </>],
  ['#10002b', '#3c096c', 'หอนาฬิกาที่หน้าปัดเป็นพระจันทร์', <>
    <Stars p={[10, 10, 40, 30, 100, 14, 110, 60, 20, 70]} />
    <path d="M40 160V60L60 30L80 60V160Z" fill="#240046" /><path d="M36 64H84V58H36Z" fill="#10002b" /><path d="M56 20h8l-4-12z" fill="#240046" />
    <circle cx="60" cy="84" r="16" fill="#fff4c2" /><Glow x={60} y={84} r={36} f="#fff4c2" o={.2} />
    <path d="M60 84V74M60 84l7 4" stroke="#5a189a" strokeWidth="2" strokeLinecap="round" /><circle cx="54" cy="90" r="2" fill="#efe2a8" /><circle cx="66" cy="78" r="1.6" fill="#efe2a8" />
    <rect x="52" y="120" width="16" height="22" fill="#ffd166" opacity=".6" /><rect x="54" y="142" width="12" height="18" fill="#10002b" />
    <Bird x={92} y={40} c="#000" /><Bird x={100} y={48} s={.6} c="#000" />
  </>],
  ['#e9f5db', '#cfe1b9', 'สีหกกลายเป็นแม่น้ำ', <>
    <g transform="rotate(-30 30 40)"><path d="M14 30H44V58H14Z" fill="#adb5bd" /><ellipse cx="29" cy="30" rx="15" ry="4" fill="#495057" /><ellipse cx="29" cy="30" rx="12" ry="3" fill="#4cc9f0" /><path d="M14 36q-6 0-6-6" stroke="#6c757d" fill="none" /></g>
    <path d="M44 42Q56 64 44 84Q30 104 58 116Q90 128 70 160H104Q114 126 84 112Q60 100 72 84Q82 62 54 34Z" fill="#4cc9f0" />
    <g fill="#fff"><ellipse cx="66" cy="96" rx="5" ry="3.5" /><circle cx="70" cy="92" r="2.6" /></g><polygon points="72,92 76,93 72,94" fill="#f77f00" />
    <g fill="#ffd60a"><ellipse cx="84" cy="138" rx="4" ry="3" /><circle cx="87" cy="135" r="2" /></g><polygon points="89,135 92,136 89,137" fill="#f77f00" />
    <path d="M20 120l2-8 2 8M100 60l2-8 2 8M30 150l2-6 2 6" stroke="#55a630" fill="none" />
  </>],
  ['#d8f3dc', '#95d5b2', 'เมืองบนต้นไม้', <>
    <rect x="48" y="40" width="24" height="120" fill="#7f5539" />
    <circle cx="60" cy="30" r="30" fill="#2d6a4f" opacity=".9" /><circle cx="30" cy="50" r="16" fill="#40916c" /><circle cx="92" cy="50" r="16" fill="#40916c" />
    <rect x="22" y="66" width="22" height="16" fill="#ddb892" /><polygon points="20,66 33,56 46,66" fill="#9c6644" /><rect x="28" y="70" width="6" height="6" fill="#ffd166" />
    <rect x="74" y="84" width="22" height="16" fill="#ddb892" /><polygon points="72,84 85,74 98,84" fill="#9c6644" /><rect x="86" y="88" width="6" height="6" fill="#ffd166" />
    <Lines p={[32, 82, 32, 140, 38, 82, 38, 140, 32, 92, 38, 92, 32, 104, 38, 104, 32, 116, 38, 116, 32, 128, 38, 128]} c="#6b4226" />
    <path d="M44 74H48M72 92H74" stroke="#6b4226" strokeWidth="2" /><path d="M54 160v-14a6 6 0 0 1 12 0v14z" fill="#3d2817" /><circle cx="60" cy="130" r="3" fill="#ffd166" />
    <rect y="154" width="120" height="6" fill="#52b788" />
  </>],
  ['#ffe8d6', '#ffd7ba', 'สายจูงที่ไม่มีเจ้าของ', <>
    <rect y="120" width="120" height="40" fill="#b5838d" opacity=".5" />
    <g fill="#d4a373"><ellipse cx="40" cy="114" rx="16" ry="10" /><circle cx="24" cy="100" r="9" /><ellipse cx="18" cy="104" rx="5" ry="3.5" fill="#bc8a5f" /><ellipse cx="28" cy="94" rx="4" ry="7" fill="#bc8a5f" /></g>
    <circle cx="14" cy="104" r="1.6" fill="#222" /><circle cx="22" cy="98" r="1.2" fill="#222" /><path d="M28 120v10M50 120v10M36 122v8M44 122v8" stroke="#d4a373" strokeWidth="4" strokeLinecap="round" />
    <path d="M56 110q8-6 6-14" stroke="#d4a373" strokeWidth="3" fill="none" strokeLinecap="round" /><rect x="28" y="104" width="8" height="3" fill="#e63946" />
    <path d="M32 106Q60 80 84 70Q96 66 100 56" stroke="#e63946" strokeWidth="1.5" fill="none" /><circle cx="100" cy="54" r="4" fill="none" stroke="#e63946" strokeWidth="2" />
  </>],
  ['#f8f9fa', '#dee2e6', 'ปุ่มแดงในห้องว่าง', <>
    <path d="M0 100L30 80H90L120 100V160H0Z" fill="#ced4da" /><path d="M0 0H30V80L0 100Z" fill="#e9ecef" /><path d="M120 0H90V80L120 100Z" fill="#e9ecef" />
    <path d="M48 140V108H72V140Z" fill="#adb5bd" /><ellipse cx="60" cy="108" rx="12" ry="3" fill="#6c757d" />
    <ellipse cx="60" cy="104" rx="8" ry="3" fill="#c1121f" /><path d="M52 104v-3a8 3 0 0 1 16 0v3" fill="#e63946" /><ellipse cx="60" cy="101" rx="8" ry="3" fill="#ef476f" />
    <ellipse cx="60" cy="142" rx="20" ry="3" fill="#000" opacity=".1" /><Glow x={60} y={100} r={18} f="#ef476f" o={.15} />
  </>],
  ['#3d348b', '#7678ed', 'เงามือกลายเป็นนก', <>
    <polygon points="0,150 0,110 40,120" fill="#fff8d0" opacity=".2" />
    <rect x="16" y="20" width="96" height="96" fill="#f7b801" opacity=".25" />
    <path d="M40 80Q50 60 62 66L70 56L74 66L84 70L74 76Q66 92 50 88Z" fill="#1b1a3a" opacity=".85" />
    <path d="M30 150Q32 128 46 126Q56 124 60 130L58 138Q50 140 48 150Z" fill="#f1c27d" /><path d="M46 126q2-8 10-8q4 0 4 6M50 128q4-6 10-4" stroke="#d19a6a" fill="none" />
    <g fill="#f7b801"><path d="M92 46q-8-6-12 0l-6-2 4 4q2 6 10 4l8 4-4-6z" /></g><circle cx="88" cy="45" r=".9" fill="#222" />
    <Bird x={104} y={30} c="#f7b801" />
  </>],
  ['#f4f1de', '#e07a5f', 'จรวดออกจากถ้วยชา', <>
    <ellipse cx="60" cy="140" rx="36" ry="7" fill="#fff" stroke="#c9b79c" />
    <path d="M32 110H88Q86 136 60 138Q34 136 32 110Z" fill="#fff" stroke="#c9b79c" /><path d="M87 116q12 2 8 12q-3 4-9 3" stroke="#c9b79c" strokeWidth="3" fill="none" />
    <ellipse cx="60" cy="110" rx="28" ry="4" fill="#8a5a2b" />
    <path d="M52 108q-6 -10 8-16q14 6 8 16z" fill="#f2cc8f" opacity=".8" /><path d="M56 104q4-10 8 0" fill="#ffb703" />
    <path d="M54 92V60Q60 40 66 60V92Z" fill="#f8f9fa" /><circle cx="60" cy="66" r="3" fill="#81b29a" /><path d="M54 84l-6 8h6zM66 84l6 8h-6z" fill="#e07a5f" />
    <Stars p={[20, 20, 40, 10, 90, 16, 100, 40, 30, 50]} f="#3d405b" r={1} />
  </>],
  ['#3e1f47', '#272640', 'พวงกุญแจที่เรืองแสงหนึ่งดอก', <>
    <rect x="0" y="0" width="120" height="160" fill="#6b4c3b" opacity=".35" /><Lines p={[0, 40, 120, 40, 0, 80, 120, 80, 0, 120, 120, 120]} c="#3e1f47" o={.5} />
    <circle cx="60" cy="30" r="4" fill="#adb5bd" /><circle cx="60" cy="46" r="10" fill="none" stroke="#adb5bd" strokeWidth="2" />
    {[[-30, '#adb5bd'], [-10, '#c9a227'], [10, '#adb5bd'], [30, '#adb5bd']].map(([r, c], i) => <g key={i} transform={`rotate(${r} 60 46)`}><rect x="58.5" y="56" width="3" height="40" fill={c} /><circle cx="60" cy="56" r="5" fill="none" stroke={c} strokeWidth="2.5" /><rect x="61" y="86" width="6" height="3" fill={c} /><rect x="61" y="92" width="4" height="3" fill={c} /></g>)}
    <Glow x={67} y={80} r={22} f="#ffd60a" o={.3} />
  </>],
  ['#081c15', '#1b4332', 'คนหัวตะเกียงเดินในป่า', <>
    <Pine x={14} y={100} s={1.8} f="#040f0a" /><Pine x={104} y={96} s={2} f="#040f0a" /><Pine x={86} y={70} s={1} f="#0b2a1c" /><Pine x={30} y={64} s={1} f="#0b2a1c" />
    <rect y="140" width="120" height="20" fill="#040f0a" />
    <Glow x={60} y={70} r={44} f="#ffd166" o={.22} />
    <path d="M52 64h16l-2 14h-12z" fill="#ffd166" stroke="#3d2b1f" strokeWidth="1.5" /><path d="M50 64h20l-4-6h-12z" fill="#3d2b1f" /><path d="M60 58v-6" stroke="#3d2b1f" strokeWidth="1.5" />
    <path d="M52 80h16l4 36h-24z" fill="#3d2b1f" /><path d="M54 116l-2 24M66 116l4 24" stroke="#3d2b1f" strokeWidth="4" strokeLinecap="round" /><path d="M52 84l-8 20M68 84l6 18" stroke="#3d2b1f" strokeWidth="3.5" strokeLinecap="round" />
  </>],
  ['#ffd6a5', '#ffadad', 'ส้มผ่าครึ่งเป็นพระอาทิตย์', <>
    <rect y="100" width="120" height="60" fill="#457b9d" />
    <path d="M18 100A42 42 0 0 1 102 100Z" fill="#f77f00" /><path d="M24 100A36 36 0 0 1 96 100Z" fill="#ffb703" />
    <g stroke="#fff3c4" strokeWidth="1.5">{[0, 30, 60, 90, 120, 150, 180].map(a => <line key={a} x1="60" y1="100" x2={60 + 34 * Math.cos(a * Math.PI / 180)} y2={100 - 34 * Math.sin(a * Math.PI / 180)} />)}</g>
    <g fill="#ffb703" opacity=".55"><rect x="26" y="110" width="68" height="3" /><rect x="34" y="120" width="52" height="3" /><rect x="44" y="130" width="32" height="3" /><rect x="52" y="140" width="16" height="2" /></g>
    <Bird x={20} y={40} c="#6d2e46" /><Bird x={30} y={30} s={.7} c="#6d2e46" />
  </>],
  ['#6d6875', '#4a4458', 'หน้ากากหลายใบบนโต๊ะ', <>
    <rect y="110" width="120" height="50" fill="#3d3047" />
    <g transform="rotate(-14 34 112)"><ellipse cx="34" cy="112" rx="18" ry="22" fill="#f8f9fa" /><ellipse cx="27" cy="106" rx="3.5" ry="2.5" fill="#3d3047" /><ellipse cx="41" cy="106" rx="3.5" ry="2.5" fill="#3d3047" /><path d="M26 118q8 8 16 0" stroke="#3d3047" strokeWidth="2" fill="none" /></g>
    <g transform="rotate(12 86 118)"><ellipse cx="86" cy="118" rx="18" ry="22" fill="#a2d2ff" /><ellipse cx="79" cy="112" rx="3.5" ry="2.5" fill="#3d3047" /><ellipse cx="93" cy="112" rx="3.5" ry="2.5" fill="#3d3047" /><path d="M78 128q8-8 16 0" stroke="#3d3047" strokeWidth="2" fill="none" /></g>
    <ellipse cx="60" cy="70" rx="20" ry="25" fill="#ffd6a5" /><ellipse cx="52" cy="64" rx="4" ry="2.8" fill="#3d3047" /><ellipse cx="68" cy="64" rx="4" ry="2.8" fill="#3d3047" /><path d="M52 80h16" stroke="#3d3047" strokeWidth="2" />
    <Glow x={60} y={60} r={50} f="#fff" o={.06} />
  </>],
];
