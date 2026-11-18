// ภาพการ์ด 176–200 • [สีบน, สีล่าง, ชื่อภาพ, เนื้อภาพ] • viewBox 120x160
import React from 'react';
import { Stars, Cloud, Glow, Pine, Bird, Lines } from './picbits.jsx';

export const ART8 = [
  ['#e9edc9', '#a3b18a', 'กวางที่เขาเป็นต้นไม้', <>
    <rect y="136" width="120" height="24" fill="#588157" />
    <path d="M54 66Q40 50 36 30M40 44Q30 40 26 30M38 36L44 22M66 66Q80 50 84 30M80 44Q90 40 94 30M82 36L76 22" stroke="#6b4226" strokeWidth="3" fill="none" strokeLinecap="round" />
    <g fill="#a7c957">{[[36, 26], [26, 28], [44, 20], [84, 26], [94, 28], [76, 20], [32, 38], [88, 38]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" />)}</g>
    <g fill="#e76f51"><circle cx="30" cy="22" r="1.6" /><circle cx="90" cy="32" r="1.6" /></g>
    <Bird x={60} y={20} s={.7} c="#333" />
    <g fill="#bc8a5f"><ellipse cx="60" cy="82" rx="10" ry="14" /><path d="M50 92Q50 120 46 136H56L60 112L64 136H74Q70 120 70 92Z" /></g>
    <ellipse cx="60" cy="94" rx="5" ry="4" fill="#ddb892" /><circle cx="60" cy="92" r="1.6" fill="#222" /><circle cx="55" cy="80" r="1.3" fill="#222" /><circle cx="65" cy="80" r="1.3" fill="#222" />
    <ellipse cx="47" cy="72" rx="6" ry="3" fill="#bc8a5f" transform="rotate(-20 47 72)" /><ellipse cx="73" cy="72" rx="6" ry="3" fill="#bc8a5f" transform="rotate(20 73 72)" />
  </>],
  ['#22223b', '#4a4e69', 'ป้อมหมอนกับไฟฉาย', <>
    <rect y="124" width="120" height="36" fill="#6d6875" />
    <path d="M10 126L30 70H90L110 126Z" fill="#e5989b" /><path d="M30 70H90" stroke="#b5838d" strokeWidth="3" />
    <path d="M44 126Q60 90 76 126Z" fill="#ffe8a3" /><Glow x={60} y={114} r={34} f="#ffe8a3" o={.35} />
    {[[14, 116, '#ffb4a2'], [104, 116, '#cdb4db'], [30, 64, '#a2d2ff'], [90, 64, '#ffc8dd'], [60, 60, '#bde0fe']].map(([x, y, c], i) => <rect key={i} x={x - 12} y={y - 8} width="24" height="16" rx="6" fill={c} />)}
    <g fill="#3a2d3f"><circle cx="54" cy="112" r="4" /><circle cx="66" cy="114" r="3.5" /></g>
  </>],
  ['#14110f', '#34312d', 'ไม้ขีดก้านเดียวที่จุด', <>
    <rect y="120" width="120" height="40" fill="#2a2522" />
    {[20, 32, 44, 56, 68, 80].map((x, i) => <g key={i}><rect x={x} y="84" width="3" height="36" fill="#d4a373" /><ellipse cx={x + 1.5} cy="83" rx="2.6" ry="4" fill="#9d0208" /></g>)}
    <g transform="rotate(14 96 120)"><rect x="94" y="84" width="3" height="36" fill="#d4a373" /><rect x="94" y="80" width="3" height="10" fill="#222" /><path d="M95.5 56q-8 12 0 24q8-12 0-24z" fill="#f48c06" /><path d="M95.5 66q-3 6 0 12q3-6 0-12z" fill="#ffd60a" /></g>
    <Glow x={98} y={72} r={40} f="#f48c06" o={.22} />
  </>],
  ['#d6ccc2', '#a98467', 'ตุ๊กตาหิมะในแก้วโกโก้', <>
    <rect y="120" width="120" height="40" fill="#6f4518" opacity=".5" />
    <path d="M28 70H88V122Q88 136 74 136H42Q28 136 28 122Z" fill="#e63946" /><path d="M88 80q16 0 14 16q-2 12-14 12" stroke="#e63946" strokeWidth="6" fill="none" />
    <ellipse cx="58" cy="70" rx="30" ry="6" fill="#6f4518" />
    <circle cx="58" cy="62" r="12" fill="#fff" /><circle cx="58" cy="44" r="9" fill="#fff" />
    <circle cx="55" cy="42" r="1.2" fill="#222" /><circle cx="61" cy="42" r="1.2" fill="#222" /><polygon points="58,45 66,46 58,47" fill="#f77f00" /><path d="M48 52h20v4h-20z" fill="#2a9d8f" /><path d="M64 54h4v8h-4z" fill="#2a9d8f" />
    <path d="M44 30q4-8 0-14M74 34q4-8 0-14" stroke="#fff" fill="none" opacity=".6" />
    <path d="M36 92h44M36 104h44" stroke="#fff" strokeWidth="3" strokeDasharray="6 4" opacity=".7" />
  </>],
  ['#ced4da', '#adb5bd', 'สนามเด็กเล่นในหมอก', <>
    <rect y="124" width="120" height="36" fill="#8d99ae" />
    <path d="M20 124V64H30V124M20 64L30 64" stroke="#6c757d" strokeWidth="3" fill="none" /><Lines p={[20, 76, 30, 76, 20, 88, 30, 88, 20, 100, 30, 100, 20, 112, 30, 112]} c="#6c757d" w={2} />
    <path d="M30 64Q50 70 64 100Q74 120 92 124" stroke="#8d99ae" strokeWidth="6" fill="none" />
    <circle cx="96" cy="118" r="6" fill="#e63946" />
    <rect y="40" width="120" height="40" fill="#fff" opacity=".35" /><rect y="90" width="120" height="30" fill="#fff" opacity=".3" />
  </>],
  ['#240046', '#10002b', 'ลูกแก้วที่มีพายุข้างใน', <>
    <Glow x={60} y={70} r={56} f="#c77dff" o={.15} />
    <circle cx="60" cy="70" r="32" fill="#7b2cbf" opacity=".4" stroke="#e0aaff" />
    <g fill="#3c096c"><circle cx="50" cy="62" r="9" /><circle cx="62" cy="58" r="11" /><circle cx="72" cy="64" r="8" /></g>
    <polygon points="62,66 56,78 61,78 57,90 68,74 63,74 66,66" fill="#ffd60a" />
    <ellipse cx="48" cy="56" rx="5" ry="9" fill="#fff" opacity=".2" transform="rotate(30 48 56)" />
    <path d="M40 102H80L84 112H36Z" fill="#7f5539" />
    <path d="M18 160Q20 120 40 108L44 114Q30 126 34 160ZM102 160Q100 120 80 108L76 114Q90 126 86 160Z" fill="#f1c27d" />
  </>],
  ['#023047', '#0d1b2a', 'ยีราฟเอื้อมคว้าดาว', <>
    <Stars p={[10, 30, 30, 50, 90, 40, 110, 70, 20, 90, 100, 100]} />
    <path d="M88 20l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#ffd60a" /><Glow x={88} y={28} r={18} f="#ffd60a" o={.3} />
    <rect y="140" width="120" height="20" fill="#1b263b" />
    <g fill="#f4a261"><path d="M36 110L70 40L78 44L48 112Z" /><ellipse cx="36" cy="118" rx="22" ry="12" /><rect x="18" y="124" width="5" height="18" /><rect x="28" y="126" width="5" height="16" /><rect x="44" y="126" width="5" height="16" /><rect x="52" y="124" width="5" height="18" /><ellipse cx="78" cy="38" rx="9" ry="5" transform="rotate(-30 78 38)" /></g>
    <g fill="#bc6c25">{[[30, 114], [42, 118], [24, 120], [48, 100], [56, 84], [64, 66], [70, 54]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.4" />)}</g>
    <path d="M74 30v-6M78 30l2-6" stroke="#bc6c25" strokeWidth="1.5" /><circle cx="80" cy="36" r="1" fill="#222" /><path d="M86 34l2-4" stroke="#f4a261" strokeWidth="2" strokeLinecap="round" />
  </>],
  ['#ffd6a5', '#fdffb6', 'รองเท้าแขวนบนสายไฟ', <>
    <Lines p={[0, 40, 120, 54, 0, 52, 120, 64]} c="#333" w={.8} />
    <rect x="108" y="20" width="5" height="140" fill="#6b4226" /><rect x="100" y="36" width="20" height="3" fill="#6b4226" />
    <path d="M58 47L50 70M62 48L68 72" stroke="#fff" strokeWidth=".8" />
    <path d="M42 70h12l2 8q0 4-6 4H40q-4 0-3-4z" fill="#e63946" /><path d="M64 72h12l2 8q0 4-6 4H62q-4 0-3-4z" fill="#457b9d" /><path d="M38 80h18M60 82h18" stroke="#fff" strokeWidth="2" />
    <path d="M0 140L30 120L60 132L90 116L120 128V160H0Z" fill="#a3b18a" />
    <Bird x={30} y={36} s={.7} c="#333" />
  </>],
  ['#e0fbfc', '#c2dfe3', 'นกฟลามิงโกกลางหิมะ', <>
    <Stars p={[10, 20, 30, 40, 50, 14, 70, 30, 90, 10, 110, 34, 20, 70, 100, 70, 40, 90]} f="#fff" r={1.4} />
    <path d="M0 126Q60 116 120 128V160H0Z" fill="#fff" />
    <ellipse cx="60" cy="84" rx="16" ry="11" fill="#ff8fab" /><path d="M72 80Q82 62 76 46Q72 38 64 42" stroke="#ff8fab" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M64 42l-6 6 2 2z" fill="#222" /><circle cx="66" cy="42" r="1" fill="#222" />
    <path d="M58 94V128M58 106l6 4" stroke="#ff4d6d" strokeWidth="1.8" fill="none" />
    <path d="M46 70q-4 2-4 6M40 74q-4 2-4 6" stroke="#ff4d6d" fill="none" /><path d="M50 74q-6 0-8 4" stroke="#fff" strokeWidth="3" fill="none" />
    <path d="M44 84q6 2 10-2" stroke="#ff4d6d" strokeWidth="2" fill="none" />
  </>],
  ['#f8edeb', '#fcd5ce', 'บันไดหนังสือสู่หน้าต่าง', <>
    <rect x="66" y="20" width="40" height="48" fill="#bde0fe" stroke="#b5838d" strokeWidth="4" /><Cloud x={84} y={40} s={.6} /><path d="M86 20V68M66 44H106" stroke="#b5838d" strokeWidth="2" />
    {[[10, 140, 50, '#e63946'], [16, 128, 46, '#457b9d'], [24, 116, 42, '#2a9d8f'], [32, 104, 38, '#f4a261'], [40, 92, 34, '#6d597a'], [48, 80, 30, '#e9c46a'], [56, 70, 24, '#e76f51']].map(([x, y, w, c], i) => <rect key={i} x={x} y={y} width={w} height="12" fill={c} stroke="#fff" strokeWidth=".6" />)}
    <rect y="152" width="120" height="8" fill="#b5838d" />
    <circle cx="62" cy="60" r="3.5" fill="#333" /><path d="M60 63h4v7h-4z" fill="#333" /><path d="M64 64l4-4" stroke="#333" strokeWidth="1.5" />
  </>],
  ['#14213d', '#000', 'บ้านหลังเล็กในหลอดไฟ', <>
    <line x1="60" y1="0" x2="60" y2="30" stroke="#555" /><rect x="52" y="30" width="16" height="14" fill="#888" /><Lines p={[52, 34, 68, 34, 52, 38, 68, 38]} c="#555" />
    <path d="M52 44Q24 60 26 90Q28 120 60 124Q92 120 94 90Q96 60 68 44Z" fill="#fff8d6" opacity=".18" stroke="#fff3b0" />
    <Glow x={60} y={92} r={40} f="#ffd166" o={.18} />
    <path d="M36 116Q60 108 84 116" fill="#80b918" /><rect x="48" y="96" width="24" height="18" fill="#e76f51" /><polygon points="45,98 60,84 75,98" fill="#6b4226" /><rect x="56" y="102" width="7" height="7" fill="#ffd166" />
    <Pine x={40} y={114} s={.4} f="#386641" /><Pine x={80} y={114} s={.5} f="#386641" />
  </>],
  ['#0d1b2a', '#1b263b', 'ไก่ขันใส่พระจันทร์', <>
    <Stars p={[10, 10, 30, 30, 80, 14, 110, 40, 20, 60]} />
    <circle cx="86" cy="36" r="14" fill="#fff4c2" />
    <rect x="10" y="110" width="70" height="8" fill="#5c4033" /><rect x="16" y="118" width="4" height="42" fill="#5c4033" /><rect x="70" y="118" width="4" height="42" fill="#5c4033" />
    <g><ellipse cx="44" cy="96" rx="12" ry="10" fill="#e9c46a" /><circle cx="54" cy="82" r="6" fill="#e9c46a" /><path d="M50 76q2-6 4-2q2-4 4 0q2-2 2 4" fill="#e63946" /><polygon points="59,80 66,78 60,84" fill="#f77f00" /><circle cx="56" cy="80" r="1" fill="#222" />
      <path d="M32 90q-12-10-6-20q4 8 10 10M32 94q-14-4-14-14" stroke="#e76f51" strokeWidth="3" fill="none" strokeLinecap="round" /><path d="M42 106v4M48 106v4" stroke="#f77f00" strokeWidth="2" /></g>
    <path d="M68 76q4-2 6-6M70 82q6 0 8-4" stroke="#fff4c2" fill="none" />
  </>],
  ['#80b918', '#55a630', 'ยักษ์ตาเดียวขี้อายหลังต้นไม้', <>
    <rect y="140" width="120" height="20" fill="#2b9348" />
    <path d="M64 0Q60 70 70 140H40Q50 70 46 0Z" fill="#6b4226" />
    <ellipse cx="84" cy="82" rx="26" ry="40" fill="#9d4edd" /><path d="M64 70Q58 70 58 78" stroke="#9d4edd" strokeWidth="6" strokeLinecap="round" />
    <circle cx="80" cy="64" r="10" fill="#fff" /><circle cx="76" cy="64" r="5" fill="#222" /><circle cx="74" cy="62" r="1.5" fill="#fff" />
    <path d="M72 82q4 2 8 0" stroke="#3c096c" strokeWidth="1.5" fill="none" /><ellipse cx="70" cy="74" rx="4" ry="2" fill="#ff8fab" opacity=".7" />
    <path d="M80 44l-2-8M90 46l2-8" stroke="#3c096c" strokeWidth="3" strokeLinecap="round" />
    <circle cx="30" cy="40" r="20" fill="#2b9348" opacity=".6" />
  </>],
  ['#fefae0', '#e9edc9', 'ทหารของเล่นเฝ้าคุกกี้', <>
    <rect y="120" width="120" height="40" fill="#d4a373" />
    <circle cx="82" cy="116" r="22" fill="#e9c46a" /><g fill="#6f4518">{[[74, 106], [88, 110], [80, 122], [92, 124], [70, 118]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" />)}</g>
    <rect x="30" y="56" width="16" height="14" fill="#212529" /><circle cx="38" cy="76" r="6" fill="#f1c27d" /><circle cx="36" cy="76" r="1" fill="#222" /><circle cx="40" cy="76" r="1" fill="#222" /><circle cx="35" cy="78" r="1.4" fill="#ff8fab" />
    <rect x="30" y="82" width="16" height="22" fill="#e63946" /><path d="M30 92h16" stroke="#ffd60a" strokeWidth="2" /><rect x="30" y="104" width="7" height="16" fill="#1d3557" /><rect x="39" y="104" width="7" height="16" fill="#1d3557" />
    <line x1="50" y1="60" x2="50" y2="120" stroke="#6c757d" strokeWidth="2" /><path d="M46 84h4" stroke="#e63946" strokeWidth="3" />
  </>],
  ['#0b090a', '#161a1d', 'เค้กวันเกิดในห้องมืด', <>
    <Glow x={60} y={80} r={56} f="#ffb703" o={.2} />
    <ellipse cx="60" cy="122" rx="40" ry="6" fill="#adb5bd" opacity=".5" />
    <path d="M30 96H90V120H30Z" fill="#ffafcc" /><ellipse cx="60" cy="96" rx="30" ry="6" fill="#fff" /><path d="M30 96q5 8 10 0t10 0t10 0t10 0t10 0t10 0" fill="#fff" />
    <rect x="58" y="74" width="4" height="20" fill="#a2d2ff" /><path d="M60 60q-5 8 0 13q5-5 0-13z" fill="#ffb703" />
    <g fill="#e63946"><circle cx="40" cy="108" r="2" /><circle cx="60" cy="110" r="2" /><circle cx="80" cy="108" r="2" /></g>
  </>],
  ['#ade8f4', '#f6e7cb', 'ปราสาททรายกับคลื่น', <>
    <rect y="0" width="120" height="60" fill="#caf0f8" /><circle cx="22" cy="24" r="9" fill="#fff3b0" />
    <path d="M60 60Q90 40 120 50V80Q100 74 90 80Q76 70 60 72Z" fill="#0096c7" /><path d="M60 72Q76 62 90 70Q100 64 120 70" stroke="#fff" strokeWidth="3" fill="none" />
    <rect y="72" width="120" height="88" fill="#e9c46a" />
    <g fill="#d4a373"><rect x="22" y="100" width="40" height="30" /><rect x="18" y="84" width="12" height="46" /><rect x="54" y="84" width="12" height="46" /><rect x="34" y="78" width="16" height="22" /></g>
    <g fill="#d4a373"><path d="M18 84v-4h3v3h3v-3h3v3h3v-3h0v4z" /><path d="M54 84v-4h3v3h3v-3h3v3h3v-3v4z" /></g><path d="M38 130v-10a4 4 0 0 1 8 0v10z" fill="#bc8a5f" />
    <line x1="42" y1="78" x2="42" y2="66" stroke="#6b4226" /><polygon points="42,66 50,69 42,72" fill="#e63946" />
    <path d="M90 140l4-2 2 4-4 1z" fill="#e76f51" /><path d="M76 120q6 0 6 6" stroke="#bc8a5f" fill="none" />
  </>],
  ['#adb5bd', '#6c757d', 'คนใส่โหลปลาเป็นหมวก', <>
    <g fill="#495057"><rect x="0" y="40" width="22" height="120" /><rect x="96" y="30" width="24" height="130" /></g><g fill="#343a40"><rect x="22" y="70" width="16" height="90" /><rect x="80" y="60" width="16" height="100" /></g>
    <rect y="140" width="120" height="20" fill="#343a40" />
    <path d="M48 140L50 104H70L72 140" fill="#212529" /><path d="M46 104H74L72 84H48Z" fill="#212529" /><path d="M48 90l-8 18M72 90l6 18" stroke="#212529" strokeWidth="4" strokeLinecap="round" />
    <circle cx="60" cy="70" r="16" fill="#90e0ef" opacity=".55" stroke="#fff" /><circle cx="60" cy="72" r="7" fill="#f1c27d" /><circle cx="58" cy="71" r="1" fill="#222" /><circle cx="62" cy="71" r="1" fill="#222" />
    <path d="M64 62q4-3 8 0q-4 3-8 0zM72 62l3-2v4z" fill="#f77f00" /><circle cx="52" cy="60" r="1.2" fill="#fff" />
  </>],
  ['#e9f5db', '#b5c99a', 'คนแคระตกปลาในแอ่งน้ำ', <>
    <rect y="120" width="120" height="40" fill="#718355" />
    <ellipse cx="80" cy="134" rx="30" ry="8" fill="#90e0ef" />
    <path d="M36 124h20v4h-20z" fill="#6c757d" />
    <ellipse cx="44" cy="112" rx="10" ry="12" fill="#457b9d" /><circle cx="44" cy="96" r="6" fill="#f1c27d" /><path d="M38 100q6 14 12 0q-2 10-6 10q-4 0-6-10z" fill="#fff" /><path d="M36 94L44 70L52 94Z" fill="#e63946" />
    <path d="M52 106L86 82" stroke="#6b4226" strokeWidth="1.5" /><path d="M86 82Q90 100 88 132" stroke="#555" strokeWidth=".6" fill="none" /><circle cx="88" cy="132" r="1.5" fill="#e63946" />
    <path d="M80 130q6-1 12 0" stroke="#fff" fill="none" />
  </>],
  ['#caf0f8', '#90e0ef', 'บอนไซบนหินลอยฟ้า', <>
    <Cloud x={20} y={130} s={1.4} /><Cloud x={100} y={140} s={1.2} /><Cloud x={96} y={30} s={.8} />
    <path d="M30 90H90Q86 110 70 118Q60 130 52 118Q34 110 30 90Z" fill="#6c757d" /><path d="M30 90H90" stroke="#80b918" strokeWidth="4" />
    <path d="M70 92q2 14 0 30q-1 10-2 24" stroke="#90e0ef" strokeWidth="3" fill="none" opacity=".8" />
    <path d="M52 90Q48 74 56 66Q62 60 58 50" stroke="#5e503f" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M56 66Q70 62 76 56" stroke="#5e503f" strokeWidth="3" fill="none" />
    <ellipse cx="56" cy="46" rx="16" ry="8" fill="#2d6a4f" /><ellipse cx="78" cy="52" rx="12" ry="6" fill="#40916c" /><ellipse cx="40" cy="62" rx="10" ry="5" fill="#40916c" />
  </>],
  ['#ffc8dd', '#ffafcc', 'ลูกโป่งหมากฝรั่งพาลอย', <>
    <Cloud x={20} y={30} /><Cloud x={100} y={50} s={.7} />
    <circle cx="60" cy="56" r="30" fill="#ff70a6" opacity=".9" /><ellipse cx="50" cy="44" rx="6" ry="10" fill="#fff" opacity=".4" />
    <circle cx="60" cy="96" r="8" fill="#f1c27d" /><path d="M56 88q4 2 8 0" fill="#ff70a6" />
    <path d="M52 104h16v20h-16z" fill="#4361ee" /><path d="M54 124l-4 14M66 124l4 14" stroke="#264653" strokeWidth="3" strokeLinecap="round" /><path d="M52 108l-8-6M68 108l8-6" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" />
    <path d="M0 150Q60 140 120 150V160H0Z" fill="#90be6d" />
    <path d="M30 144l2-4 2 4M90 146l2-4 2 4" stroke="#386641" fill="none" />
  </>],
  ['#6c757d', '#495057', 'ลูกโป่งแดงในฝูงร่ม', <>
    {Array.from({ length: 20 }, (_, i) => { const x = 14 + (i % 4) * 30 + ((i / 4 | 0) % 2) * 14, y = 14 + (i / 4 | 0) * 32; return <g key={i}><circle cx={x} cy={y} r="12" fill={['#343a40', '#212529', '#495057'][i % 3]} /><path d={`M${x} ${y - 12}V${y + 12}M${x - 12} ${y}H${x + 12}M${x - 8} ${y - 8}L${x + 8} ${y + 8}M${x + 8} ${y - 8}L${x - 8} ${y + 8}`} stroke="#6c757d" strokeWidth=".5" /></g>; })}
    <circle cx="62" cy="80" r="9" fill="#e63946" /><ellipse cx="59" cy="77" rx="2" ry="3" fill="#fff" opacity=".5" />
    <Lines p={[4, 0, 0, 10, 50, 0, 46, 10, 100, 0, 96, 10]} c="#adb5bd" o={.5} />
  </>],
  ['#f4f1de', '#e07a5f', 'แก้วสองใบ ใบหนึ่งล้ม', <>
    <rect y="110" width="120" height="50" fill="#81b29a" />
    <path d="M28 70H50L48 110H30Z" fill="#fff" stroke="#3d405b" /><path d="M30 86H49L48 110H30Z" fill="#e07a5f" />
    <g transform="rotate(90 80 104)"><path d="M70 82H92L90 122H72Z" fill="#fff" stroke="#3d405b" /></g>
    <path d="M100 116Q114 120 110 132Q90 140 70 132Q66 124 80 120Z" fill="#e07a5f" opacity=".8" />
    <path d="M40 66q2-8 0-14" stroke="#3d405b" fill="none" opacity=".4" />
  </>],
  ['#b5e48c', '#52b69a', 'ดวงตาในพงหญ้าสูง', <>
    {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${i * 4.2} 160Q${i * 4.2 + (i % 3 - 1) * 6} ${100 - (i % 5) * 10} ${i * 4.2 + (i % 2 ? 8 : -6)} ${50 + (i % 4) * 12}`} stroke={i % 2 ? '#1e6091' : '#168aad'} strokeWidth="3" fill="none" opacity=".7" />)}
    <g><ellipse cx="46" cy="96" rx="5" ry="3.5" fill="#ffd60a" /><ellipse cx="70" cy="96" rx="5" ry="3.5" fill="#ffd60a" /><ellipse cx="46" cy="96" rx="1.2" ry="3" fill="#000" /><ellipse cx="70" cy="96" rx="1.2" ry="3" fill="#000" /></g>
    {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${10 + i * 9} 160Q${14 + i * 9} 120 ${8 + i * 9 + (i % 2 ? 6 : -4)} ${90 + (i % 3) * 8}`} stroke="#184e77" strokeWidth="3" fill="none" />)}
  </>],
  ['#ffe5d9', '#ffcad4', 'เงาต้นไม้ยามเช้า', <>
    <polygon points="30,20 90,20 120,120 0,120" fill="#fff3b0" opacity=".25" />
    <g fill="#b5838d" opacity=".45"><path d="M54 120Q50 90 60 70Q70 90 66 120Z" /><ellipse cx="44" cy="72" rx="14" ry="5" transform="rotate(-30 44 72)" /><ellipse cx="76" cy="66" rx="16" ry="5" transform="rotate(30 76 66)" /><ellipse cx="50" cy="52" rx="12" ry="4" transform="rotate(-50 50 52)" /><ellipse cx="70" cy="46" rx="12" ry="4" transform="rotate(50 70 46)" /></g>
    <rect y="120" width="120" height="40" fill="#e5989b" /><rect x="38" y="104" width="22" height="18" fill="#bc6c25" /><path d="M48 104q-4-12 2-20M48 100q8-8 14-6M48 96q-8-6-12 0" stroke="#55a630" strokeWidth="2" fill="none" />
    <path d="M86 108h14v14h-14zM100 112q6 0 6 4q0 4-6 4" fill="#fff" stroke="#9d8189" /><path d="M90 104q2-4 0-8M96 104q2-4 0-8" stroke="#9d8189" fill="none" opacity=".6" />
  </>],
  ['#03045e', '#7209b7', 'ถนนดาวขึ้นฟ้า', <>
    <Stars p={[10, 10, 40, 20, 90, 8, 110, 30, 20, 50, 100, 60, 70, 40]} />
    <path d="M30 160Q50 120 66 90Q80 60 76 30Q74 16 84 10H90Q82 18 84 30Q90 64 76 94Q64 124 64 160Z" fill="#3a0ca3" />
    <path d="M47 160Q60 120 72 92Q84 60 80 32Q79 20 87 12" stroke="#ffd60a" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
    <Glow x={86} y={10} r={20} f="#fff" o={.25} />
    <g transform="translate(50 128) rotate(-30)"><rect x="-10" y="-5" width="20" height="8" rx="3" fill="#f72585" /><path d="M-6-5l3-5h6l3 5z" fill="#4cc9f0" /><circle cx="-6" cy="3" r="2.5" fill="#222" /><circle cx="6" cy="3" r="2.5" fill="#222" /></g>
    <path d="M0 160V140L20 130L40 140V160ZM90 160V136L120 128V160Z" fill="#10002b" />
  </>],
];
