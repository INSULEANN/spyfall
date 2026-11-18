// ภาพการ์ด 1–25 • [สีบน, สีล่าง, ชื่อภาพ, เนื้อภาพ] • viewBox 120x160
import React from 'react';
import { Stars, Cloud, Glow, Pine, Bird, Lines, Checker } from './picbits.jsx';

export const ART1 = [
  ['#0b1a3a', '#3b4a7a', 'ประภาคารเหนือเมฆ', <>
    <Stars p={[10, 12, 30, 8, 95, 15, 110, 30, 75, 6, 20, 30, 102, 5]} />
    <polygon points="60,50 0,26 0,64" fill="#fff6b0" opacity=".35" />
    <polygon points="60,50 120,40 120,58" fill="#fff6b0" opacity=".18" />
    <polygon points="52,122 68,122 65,55 55,55" fill="#e9e4d8" />
    <polygon points="54,100 66,100 66.6,110 53.4,110" fill="#c0392b" /><polygon points="55.4,72 64.6,72 65.2,82 54.8,82" fill="#c0392b" />
    <rect x="54" y="44" width="12" height="11" fill="#ffe680" /><polygon points="52,44 68,44 60,35" fill="#c0392b" />
    <Glow x={60} y={50} r={16} f="#fff2a0" />
    <Cloud x={20} y={135} s={1.6} f="#dfe6f5" /><Cloud x={62} y={140} s={2} f="#eef2fa" /><Cloud x={104} y={132} s={1.5} f="#dfe6f5" />
    <rect y="140" width="120" height="20" fill="#eef2fa" />
  </>],
  ['#bfe3c0', '#3f7d4f', 'ประตูเล็กในต้นไม้ใหญ่', <>
    <path d="M38 160C44 120 42 80 30 40H90C78 80 76 120 82 160Z" fill="#6b4a2f" />
    <path d="M50 70q4 20 0 40M70 60q-3 25 2 50" stroke="#4e3420" strokeWidth="2" fill="none" />
    <circle cx="30" cy="34" r="22" fill="#2f6b3a" /><circle cx="60" cy="22" r="26" fill="#3d8a4a" /><circle cx="92" cy="34" r="22" fill="#2f6b3a" /><circle cx="48" cy="44" r="16" fill="#3d8a4a" /><circle cx="76" cy="46" r="16" fill="#357a42" />
    <path d="M53 160v-22a7 7 0 0 1 14 0v22z" fill="#f2c14e" /><circle cx="64" cy="150" r="1.2" fill="#6b4a2f" />
    <g stroke="#f2c14e" strokeWidth="2" fill="none"><circle cx="100" cy="112" r="5" /><path d="M100 117v18M100 128h4M100 133h3" /></g>
    <Glow x={100} y={120} r={14} f="#fff3a0" o={.18} />
  </>],
  ['#1c1840', '#463a7a', 'แมวกับพระจันทร์ในโหล', <>
    <Stars p={[15, 15, 100, 20, 70, 10, 40, 30, 110, 50]} />
    <rect y="150" width="120" height="10" fill="#2a2238" />
    <rect x="18" y="121" width="44" height="9" fill="#9bbb59" /><rect x="22" y="130" width="46" height="10" fill="#4f81bd" /><rect x="16" y="140" width="52" height="10" fill="#c0504d" />
    <ellipse cx="40" cy="108" rx="12" ry="14" fill="#111" /><circle cx="40" cy="89" r="9" fill="#111" />
    <polygon points="32,85 33,74 39,82" fill="#111" /><polygon points="48,85 47,74 41,82" fill="#111" />
    <path d="M50 118q14 4 10-14" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" />
    <ellipse cx="44" cy="88" rx="1.4" ry="1.8" fill="#ffd84d" /><ellipse cx="38" cy="88" rx="1.4" ry="1.8" fill="#ffd84d" />
    <rect x="76" y="146" width="24" height="4" fill="#8a7a9a" />
    <circle cx="88" cy="128" r="20" fill="#9fd3ff" opacity=".3" stroke="#cfe8ff" />
    <Glow x={88} y={132} r={14} f="#fff4c2" o={.2} /><circle cx="88" cy="132" r="8" fill="#fff4c2" />
    <path d="M74 118q14-5 28 0" stroke="#cfe8ff" fill="none" opacity=".6" />
  </>],
  ['#ffe9a8', '#ffc46b', 'ร่มที่ฝนตกข้างใน', <>
    <circle cx="100" cy="24" r="12" fill="#fff3b0" /><Lines p={[100, 4, 100, 8, 82, 24, 86, 24, 87, 11, 90, 14, 113, 11, 110, 14]} c="#fff3b0" w={2} />
    <rect y="135" width="120" height="25" fill="#8bc56a" />
    <path d="M28 72Q60 38 92 72Z" fill="#e85d75" /><path d="M28 72q8-6 16 0q8-6 16 0q8-6 16 0q8-6 16 0" fill="#e85d75" stroke="#c4415a" />
    <line x1="60" y1="56" x2="60" y2="122" stroke="#333" strokeWidth="2" /><path d="M60 122q0 6 5 6t5-5" stroke="#333" strokeWidth="2" fill="none" />
    <Cloud x={60} y={86} s={1} f="#8a94a6" />
    <Lines p={[52, 94, 50, 102, 58, 95, 56, 104, 66, 94, 64, 102]} c="#5b8ed6" w={1.2} />
    <circle cx="48" cy="106" r="6" fill="#f1c27d" /><path d="M41 114h14v20h-14z" fill="#4a6fa5" /><path d="M55 116l5 2" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="48" cy="134" rx="9" ry="2" fill="#5b8ed6" opacity=".6" />
  </>],
  ['#87c5ff', '#e8f6ff', 'บันไดขึ้นฟ้า', <>
    <Cloud x={24} y={40} s={1.2} /><Cloud x={30} y={120} s={1.6} o={.8} /><Cloud x={100} y={100} s={1.3} o={.9} />
    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <rect key={i} x={6 + i * 10} y={146 - i * 12} width="14" height="5" fill="#f5f0e6" stroke="#c9bfae" strokeWidth=".6" />)}
    <rect x="84" y="20" width="22" height="36" fill="#fff" stroke="#c9bfae" />
    <rect x="87" y="23" width="16" height="33" fill="#ffd76a" /><Glow x={95} y={40} r={22} f="#fff3b0" o={.2} />
    <polygon points="87,23 80,27 80,58 87,56" fill="#e8d9b8" />
  </>],
  ['#3a0d1a', '#d9534f', 'ชิงช้าว่างเปล่า', <>
    <circle cx="60" cy="112" r="30" fill="#ff9f5a" opacity=".8" />
    <path d="M0 135Q60 118 120 135V160H0Z" fill="#1a0a10" />
    <path d="M120 18Q80 24 32 16" stroke="#1a0a10" strokeWidth="5" fill="none" strokeLinecap="round" />
    <Lines p={[50, 21, 50, 96, 72, 22, 72, 96]} c="#1a0a10" w={1.2} />
    <rect x="46" y="95" width="30" height="4" fill="#1a0a10" />
    <Bird x={20} y={42} c="#1a0a10" /><Bird x={34} y={52} s={.7} c="#1a0a10" />
    <ellipse cx="84" cy="134" rx="5" ry="2.5" fill="#1a0a10" />
  </>],
  ['#2d2a4a', '#6b5b95', 'ทะเลทรายในนาฬิกาทราย', <>
    <rect x="30" y="20" width="60" height="6" rx="2" fill="#8b5a2b" /><rect x="30" y="134" width="60" height="6" rx="2" fill="#8b5a2b" />
    <path d="M36 26C36 60 58 70 58 80C58 90 36 100 36 134H84C84 100 62 90 62 80C62 70 84 60 84 26Z" fill="#cfe8ff" opacity=".22" stroke="#e8f4ff" />
    <path d="M42 52H78L61 76H59Z" fill="#e8b86d" />
    <line x1="60" y1="76" x2="60" y2="118" stroke="#e8b86d" />
    <circle cx="70" cy="104" r="4" fill="#fff0b0" />
    <path d="M37 134Q50 112 62 122Q74 110 83 134Z" fill="#e8b86d" />
    <path d="M64 120q2-5 4-1q2-4 4 0l3-4 1 1-2 5v4h-1v-3h-6v3h-1z" fill="#6b3f1d" />
  </>],
  ['#0f2a1d', '#1d4a30', 'ดวงตาในป่า', <>
    <ellipse cx="60" cy="62" rx="36" ry="19" fill="#f4f1de" />
    <circle cx="60" cy="62" r="13" fill="#3fa66b" /><circle cx="60" cy="62" r="6" fill="#000" /><circle cx="64" cy="58" r="2.4" fill="#fff" />
    <ellipse cx="22" cy="48" rx="20" ry="14" fill="#0a1f15" /><ellipse cx="100" cy="52" rx="20" ry="14" fill="#0a1f15" /><ellipse cx="60" cy="38" rx="30" ry="10" fill="#0a1f15" /><ellipse cx="34" cy="80" rx="16" ry="8" fill="#0a1f15" /><ellipse cx="92" cy="80" rx="18" ry="9" fill="#0a1f15" />
    <rect x="14" y="88" width="7" height="72" fill="#07140d" /><rect x="50" y="94" width="9" height="66" fill="#07140d" /><rect x="96" y="86" width="6" height="74" fill="#07140d" />
    <Stars p={[30, 110, 80, 120, 70, 140, 40, 130, 108, 128]} f="#e6ff6b" r={1} />
  </>],
  ['#f6efe4', '#e3d3bd', 'พายุในถ้วยชา', <>
    <ellipse cx="60" cy="128" rx="40" ry="8" fill="#fff" stroke="#c9b79c" />
    <path d="M30 90H90Q88 125 60 126Q32 125 30 90Z" fill="#fff" stroke="#c9b79c" />
    <path d="M89 98q14 2 10 14q-3 6-11 4" stroke="#c9b79c" strokeWidth="4" fill="none" />
    <ellipse cx="60" cy="90" rx="30" ry="5" fill="#8a5a2b" />
    <path d="M40 90q10-6 20 0t20 0" stroke="#5f3c1a" fill="none" />
    <Lines p={[44, 70, 42, 84, 52, 72, 50, 86, 76, 70, 74, 84]} c="#5b8ed6" />
    <g fill="#5a6273"><circle cx="48" cy="58" r="13" /><circle cx="66" cy="52" r="16" /><circle cx="80" cy="62" r="10" /><rect x="38" y="58" width="50" height="12" rx="6" /></g>
    <polygon points="62,66 54,80 60,80 55,92 68,76 62,76 66,66" fill="#ffe04a" />
  </>],
  ['#2a2f45', '#5d6a8a', 'เรือกระดาษในแอ่งน้ำ', <>
    <g fill="#1d2133"><rect x="0" y="50" width="22" height="52" /><rect x="22" y="36" width="18" height="66" /><rect x="40" y="58" width="24" height="44" /><rect x="64" y="28" width="16" height="74" /><rect x="80" y="48" width="22" height="54" /><rect x="102" y="62" width="18" height="40" /></g>
    <g fill="#f6c86d"><rect x="26" y="44" width="3" height="4" /><rect x="68" y="36" width="3" height="4" /><rect x="74" y="50" width="3" height="4" /><rect x="6" y="60" width="3" height="4" /><rect x="86" y="58" width="3" height="4" /><rect x="46" y="66" width="3" height="4" /></g>
    <rect y="102" width="120" height="58" fill="#3a3f52" />
    <ellipse cx="60" cy="130" rx="50" ry="18" fill="#8fa3c9" opacity=".55" />
    <g fill="#f6c86d" opacity=".5"><rect x="30" y="122" width="3" height="5" /><rect x="70" y="126" width="3" height="5" /><rect x="86" y="120" width="3" height="5" /></g>
    <path d="M42 124H78L71 133H49Z" fill="#fff" /><polygon points="51,124 60,106 69,124" fill="#f0f0f0" stroke="#ccc" />
  </>],
  ['#cfe9d4', '#7fb48a', 'หอยทากแบกบ้าน', <>
    <rect y="130" width="120" height="30" fill="#5e9a68" />
    <Lines p={[10, 130, 8, 122, 30, 130, 31, 121, 112, 130, 110, 122]} c="#3f7a4a" w={1.5} />
    <path d="M14 132Q14 121 30 122H96Q108 122 106 132Z" fill="#d9b38c" />
    <Lines p={[100, 123, 106, 108, 96, 123, 98, 108]} c="#b88f68" w={1.5} /><circle cx="106" cy="107" r="2" fill="#333" /><circle cx="98" cy="107" r="2" fill="#333" />
    <rect x="36" y="88" width="44" height="34" fill="#f4d7a1" /><polygon points="32,90 58,66 84,90" fill="#b5543c" />
    <rect x="50" y="98" width="13" height="12" fill="#ffd84d" /><path d="M56.5 98v12M50 104h13" stroke="#b5543c" />
    <rect x="70" y="70" width="6" height="12" fill="#8a3f2c" /><circle cx="76" cy="62" r="3" fill="#fff" opacity=".7" /><circle cx="80" cy="54" r="4" fill="#fff" opacity=".5" />
  </>],
  ['#e8f0ff', '#bcd0f0', 'ลูกโป่งผูกหิน', <>
    <rect y="146" width="120" height="14" fill="#a9b8d0" />
    <ellipse cx="60" cy="142" rx="18" ry="10" fill="#8c8c8c" /><ellipse cx="54" cy="138" rx="7" ry="3" fill="#a8a8a8" />
    <path d="M60 132Q50 100 64 72" stroke="#555" strokeWidth=".8" fill="none" />
    <ellipse cx="64" cy="52" rx="17" ry="21" fill="#e63946" /><polygon points="64,72 61,76 67,76" fill="#c1121f" />
    <ellipse cx="57" cy="44" rx="4" ry="7" fill="#fff" opacity=".45" />
  </>],
  ['#141b3d', '#2e3f7a', 'วาฬบินเหนือหลังคา', <>
    <Stars p={[10, 10, 40, 22, 90, 12, 110, 34, 64, 6, 22, 40]} /><circle cx="98" cy="22" r="8" fill="#fff4c2" />
    <path d="M14 72Q30 46 70 50Q95 54 100 64L112 54L110 70L114 82L100 74Q90 88 55 87Q22 85 14 72Z" fill="#6f8fd8" />
    <path d="M20 76Q50 92 92 78" stroke="#c6d4f5" strokeWidth="5" fill="none" opacity=".7" />
    <circle cx="28" cy="66" r="1.6" fill="#141b3d" /><path d="M50 74q10 10 4 14" stroke="#4e6cb8" strokeWidth="3" fill="none" />
    <path d="M0 160V122L14 110L28 122V114H40V160ZM40 160V128L56 116L72 128V160ZM72 160V118L86 104L100 118V112H108V160ZM108 160V126L120 118V160Z" fill="#0c1029" />
    <g fill="#ffd86b"><rect x="16" y="128" width="4" height="5" /><rect x="58" y="134" width="4" height="5" /><rect x="88" y="124" width="4" height="5" /></g>
    <Stars p={[40, 96, 60, 100, 80, 94]} f="#c6d4f5" />
  </>],
  ['#2b0f2e', '#5a1e5c', 'หน้ากากหยดน้ำตา', <>
    <path d="M28 58Q20 30 34 20Q32 40 40 56Z" fill="#9b2c6b" /><path d="M36 56Q34 26 50 18Q42 40 46 56Z" fill="#c2417d" />
    <path d="M18 70Q60 50 102 70Q100 94 80 94Q68 94 60 84Q52 94 40 94Q20 94 18 70Z" fill="#f5d36b" stroke="#b8860b" strokeWidth="1.5" />
    <ellipse cx="41" cy="75" rx="9" ry="5" fill="#2b0f2e" /><ellipse cx="79" cy="75" rx="9" ry="5" fill="#2b0f2e" />
    <path d="M79 84q-4 8 0 10q4-2 0-10z" fill="#8fd3ff" /><path d="M81 100q-3 6 0 7q3-1 0-7z" fill="#8fd3ff" opacity=".7" />
    <path d="M18 72Q4 100 12 140M102 72Q116 100 108 140" stroke="#c2417d" strokeWidth="2" fill="none" />
  </>],
  ['#101826', '#22344d', 'เทียนที่ละลายเป็นแม่น้ำ', <>
    <Glow x={60} y={38} r={30} f="#ffb84d" o={.12} />
    <path d="M60 24q-7 11 0 20q7-9 0-20z" fill="#ffb84d" /><path d="M60 32q-3 5 0 10q3-5 0-10z" fill="#fff3c0" />
    <rect x="52" y="48" width="16" height="42" fill="#f1e6d0" /><path d="M52 52q3 8 0 14M68 54q-2 6 0 10" stroke="#d9cbb0" fill="none" />
    <path d="M52 90Q38 110 60 120Q86 132 48 160H92Q112 128 68 114Q58 104 68 90Z" fill="#f1e6d0" />
    <path d="M70 128L78 128L76 131H72Z" fill="#8a5a2b" /><line x1="74" y1="128" x2="74" y2="122" stroke="#8a5a2b" />
    <Stars p={[14, 30, 100, 20, 20, 90, 104, 80]} f="#ffd86b" />
  </>],
  ['#3b2a24', '#5c4033', 'กระจกที่สวมมงกุฎ', <>
    <ellipse cx="60" cy="68" rx="30" ry="42" fill="#b8cfd8" stroke="#d4a24c" strokeWidth="5" />
    <path d="M38 104Q40 84 60 82Q80 84 82 104Q72 110 60 110Q48 110 38 104Z" fill="#46606b" /><circle cx="60" cy="66" r="12" fill="#46606b" />
    <polygon points="49,56 51,46 55,52 60,43 65,52 69,46 71,56" fill="#f2c14e" />
    <path d="M40 34q6-8 16-10" stroke="#fff" strokeWidth="2" fill="none" opacity=".5" />
    <path d="M26 160Q28 140 60 136Q92 140 94 160Z" fill="#1e1410" /><circle cx="60" cy="126" r="15" fill="#1e1410" />
  </>],
  ['#f7d9a6', '#e9a96b', 'จิ้งจอกที่ทางแยก', <>
    <path d="M0 74Q60 66 120 74V160H0Z" fill="#c98b4f" />
    <path d="M52 160L58 76H62L74 160Z" fill="#f3e3c3" /><path d="M58 92L0 84V90L57 100Z" fill="#f3e3c3" /><path d="M63 98L120 80V88L64 106Z" fill="#f3e3c3" />
    <rect x="80" y="56" width="3" height="56" fill="#6b4226" />
    <polygon points="68,60 94,60 98,64 94,68 68,68" fill="#a0522d" /><polygon points="96,72 70,72 66,76 70,80 96,80" fill="#a0522d" />
    <path d="M34 134q-16 2-14-12q8 6 14 4z" fill="#e07a2f" /><path d="M20 122q-1-4 3-6q1 4 0 6z" fill="#fff" />
    <ellipse cx="38" cy="128" rx="8" ry="11" fill="#e07a2f" /><circle cx="38" cy="112" r="6" fill="#e07a2f" />
    <polygon points="33,109 34,100 37,107" fill="#e07a2f" /><polygon points="43,109 42,100 39,107" fill="#e07a2f" />
    <path d="M38 115l-3 5h6z" fill="#fff" /><ellipse cx="38" cy="132" rx="4" ry="6" fill="#fff" opacity=".8" />
  </>],
  ['#dfe7ef', '#a9bccf', 'นาฬิกาที่นกบินออกมา', <>
    <circle cx="56" cy="92" r="34" fill="#fffaf0" stroke="#444" strokeWidth="3" />
    <Lines p={[56, 62, 56, 67, 56, 117, 56, 122, 26, 92, 31, 92, 81, 92, 86, 92]} c="#444" w={2} />
    <line x1="56" y1="92" x2="44" y2="78" stroke="#444" strokeWidth="2.5" strokeLinecap="round" /><circle cx="56" cy="92" r="2.5" fill="#444" />
    <Bird x={66} y={82} s={.6} c="#444" /><Bird x={76} y={68} s={.8} c="#444" /><Bird x={88} y={50} s={1.1} c="#444" /><Bird x={100} y={30} s={1.5} c="#444" /><Bird x={92} y={16} s={1} c="#444" />
  </>],
  ['#1b2742', '#3e5379', 'กระท่อมกลางหิมะ', <>
    <Stars p={[10, 14, 40, 8, 80, 18, 108, 10, 60, 30, 20, 50, 100, 46]} />
    <Pine x={14} y={110} s={1.4} /><Pine x={104} y={112} s={1.6} /><Pine x={92} y={104} s={1} />
    <path d="M0 122Q60 110 120 124V160H0Z" fill="#e8eef7" />
    <rect x="36" y="96" width="48" height="32" fill="#6b4430" />
    <polygon points="30,98 60,72 90,98" fill="#e8eef7" /><polygon points="34,98 60,76 86,98" fill="#6b4430" opacity=".4" />
    <rect x="44" y="104" width="14" height="11" fill="#ffcf5a" /><Glow x={51} y={110} r={14} f="#ffcf5a" o={.12} />
    <rect x="66" y="110" width="10" height="18" fill="#3e2618" />
    <g fill="#9fb0c8"><ellipse cx="30" cy="154" rx="2" ry="1" /><ellipse cx="40" cy="148" rx="2" ry="1" /><ellipse cx="50" cy="142" rx="2" ry="1" /><ellipse cx="60" cy="136" rx="2" ry="1" /><ellipse cx="68" cy="131" rx="2" ry="1" /></g>
  </>],
  ['#0d0d1f', '#272250', 'มือที่ถือดวงอาทิตย์', <>
    <Stars p={[12, 20, 100, 14, 30, 60, 108, 70, 70, 10]} />
    <Glow x={60} y={96} r={40} f="#ffd23f" o={.1} />
    <Lines p={[60, 74, 60, 68, 60, 118, 60, 124, 38, 96, 32, 96, 82, 96, 88, 96, 44, 80, 40, 76, 76, 80, 80, 76]} c="#ffd23f" w={1.5} />
    <circle cx="60" cy="96" r="11" fill="#ffd23f" />
    <path d="M28 160Q26 122 40 114Q60 106 86 114Q98 118 94 126Q88 130 76 126L72 160Z" fill="#e6b38f" />
    <path d="M44 118q8-4 16-2M76 126q-6-2-8 2" stroke="#c48d68" fill="none" />
  </>],
  ['#e6dcc8', '#b8a888', 'ราชาที่ล้ม', <>
    <Checker y={112} rows={4} />
    <g transform="rotate(80 14 118) translate(-20 0)"><rect x="24" y="112" width="20" height="5" fill="#f7f2e6" stroke="#555" strokeWidth=".7" /><path d="M27 112Q30 90 30 82H38Q38 90 41 112Z" fill="#f7f2e6" stroke="#555" strokeWidth=".7" /><circle cx="34" cy="78" r="6" fill="#f7f2e6" stroke="#555" strokeWidth=".7" /><path d="M34 63v9M30 66h8" stroke="#555" strokeWidth="2" /></g>
    <g transform="translate(10 0)"><ellipse cx="86" cy="118" rx="12" ry="3" fill="#000" opacity=".2" />
    <rect x="76" y="110" width="20" height="6" rx="2" fill="#222" /><path d="M79 110Q82 96 82 90H90Q90 96 93 110Z" fill="#222" /><circle cx="86" cy="84" r="8" fill="#222" /><circle cx="83" cy="81" r="2" fill="#fff" opacity=".3" /></g>
  </>],
  ['#050508', '#141420', 'แสงจากจอตอนตีสาม', <>
    <Glow x={60} y={110} r={50} f="#9fd0ff" o={.08} />
    <path d="M22 160Q24 110 60 106Q96 110 98 160Z" fill="#141c2e" />
    <ellipse cx="60" cy="72" rx="21" ry="26" fill="#1c2a44" /><path d="M40 78Q60 104 80 78Q78 96 60 98Q42 96 40 78Z" fill="#5a7fb0" opacity=".7" />
    <ellipse cx="52" cy="72" rx="3" ry="2" fill="#e8f4ff" /><ellipse cx="68" cy="72" rx="3" ry="2" fill="#e8f4ff" /><circle cx="52" cy="72.5" r="1" fill="#000" /><circle cx="68" cy="72.5" r="1" fill="#000" />
    <rect x="48" y="112" width="24" height="38" rx="3" fill="#9fd0ff" /><rect x="50" y="115" width="20" height="30" fill="#cfe8ff" />
    <ellipse cx="46" cy="132" rx="5" ry="8" fill="#2b3a55" /><ellipse cx="74" cy="132" rx="5" ry="8" fill="#2b3a55" />
  </>],
  ['#2b1b4a', '#e07b9a', 'แมงกะพรุนลอยฟ้า', <>
    <Stars p={[10, 10, 50, 20, 100, 8, 80, 40]} />
    {[[30, 40, 1.3, '#ff9ec4'], [82, 56, 1.6, '#8ff0ff'], [50, 84, 1, '#ffd0f0'], [96, 100, .8, '#ff9ec4'], [20, 92, .7, '#8ff0ff']].map(([x, y, s, c], i) =>
      <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity=".85"><circle r="12" fill={c} opacity=".2" /><path d="M-10 0Q0-16 10 0Z" fill={c} /><path d="M-6 0q-2 6 0 12M0 0q2 7 0 14M6 0q-2 6 0 11" stroke={c} fill="none" /></g>)}
    <path d="M0 140Q60 128 120 142V160H0Z" fill="#1d1230" />
    <circle cx="70" cy="126" r="2.5" fill="#1d1230" /><path d="M68 128h4v8h-4z" fill="#1d1230" />
  </>],
  ['#fdf3e1', '#f2d9b1', 'กรงที่นกออกไปแล้ว', <>
    <path d="M36 132V72Q60 32 84 72V132" stroke="#8b6b2e" strokeWidth="2.5" fill="none" />
    <Lines p={[44, 132, 44, 60, 52, 132, 52, 52, 60, 132, 60, 48, 68, 132, 68, 52, 76, 132, 76, 60]} c="#8b6b2e" w={1} />
    <rect x="30" y="130" width="60" height="7" rx="2" fill="#8b6b2e" /><circle cx="60" cy="44" r="3" fill="#8b6b2e" /><line x1="60" y1="41" x2="60" y2="20" stroke="#8b6b2e" />
    <path d="M84 96L104 88V120L84 124Z" fill="none" stroke="#8b6b2e" strokeWidth="1.5" />
    <line x1="48" y1="102" x2="72" y2="102" stroke="#8b6b2e" strokeWidth="1.5" />
    <path d="M54 126q4-12 14-16q-2 10-14 16z" fill="#5fa8d3" /><path d="M54 126q6-8 13-15" stroke="#3a7aa3" strokeWidth=".6" fill="none" />
    <g transform="translate(100 34)"><ellipse rx="8" ry="5" fill="#5fa8d3" /><circle cx="7" cy="-3" r="4" fill="#5fa8d3" /><polygon points="11,-3 15,-2 11,-1" fill="#f2a33a" /><path d="M-2-2L-10-12L4-4Z" fill="#3a7aa3" /><path d="M-8 0l-6 3 6 1z" fill="#3a7aa3" /><circle cx="8" cy="-4" r=".8" fill="#000" /></g>
  </>],
  ['#2a3b2a', '#4f6b3f', 'หมู่บ้านเห็ด', <>
    <Stars p={[20, 20, 90, 14, 104, 60, 14, 74, 60, 26]} f="#e6ff6b" r={1} />
    <rect y="140" width="120" height="20" fill="#2a3b1f" />
    <path d="M70 142V96H96V142Z" fill="#f2e8d5" /><path d="M54 98Q83 52 112 98Z" fill="#d1453b" />
    <g fill="#fff"><circle cx="72" cy="84" r="4" /><circle cx="90" cy="76" r="5" /><circle cx="100" cy="90" r="3" /><circle cx="82" cy="94" r="2.5" /></g>
    <rect x="78" y="124" width="10" height="18" rx="5" fill="#7a4a2a" /><circle cx="83" cy="108" r="4" fill="#ffd86b" />
    <path d="M24 142V114H40V142Z" fill="#f2e8d5" /><path d="M12 116Q32 88 52 116Z" fill="#e8a23a" /><g fill="#fff"><circle cx="26" cy="106" r="2.5" /><circle cx="38" cy="102" r="3" /></g>
    <rect x="28" y="124" width="6" height="6" fill="#ffd86b" />
    <path d="M52 142V132H58V142Z" fill="#f2e8d5" /><path d="M48 133Q55 122 62 133Z" fill="#8a5fb8" />
  </>],
];
