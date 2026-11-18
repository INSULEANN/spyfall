// ภาพการ์ด 51–75 • [สีบน, สีล่าง, ชื่อภาพ, เนื้อภาพ] • viewBox 120x160
import React from 'react';
import { Stars, Cloud, Glow, Pine, Bird, Lines } from './picbits.jsx';

const Sheep = ({ x, y, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}><g fill="#fff"><circle cx="-5" cy="0" r="5" /><circle cx="2" cy="-2" r="6" /><circle cx="7" cy="2" r="5" /><circle cx="0" cy="3" r="5" /></g><ellipse cx="12" cy="-1" rx="3.5" ry="3" fill="#333" /><path d="M-4 7v5M4 7v5" stroke="#333" strokeWidth="1.5" /></g>;

export const ART3 = [
  ['#1c1f26', '#3a3f4b', 'ใต้เสาไฟคนเดียว', <>
    <rect y="130" width="120" height="30" fill="#14161b" />
    <polygon points="70,30 40,130 104,130" fill="#ffe9a8" opacity=".14" />
    <rect x="68" y="30" width="3" height="100" fill="#0b0c10" /><path d="M64 30h11l-2-6h-7z" fill="#0b0c10" /><Glow x={69.5} y={32} r={18} f="#ffe9a8" o={.3} />
    <circle cx="62" cy="104" r="4" fill="#0b0c10" /><path d="M57 108h10l1 22h-12z" fill="#0b0c10" />
    <path d="M60 130L10 156L20 158L66 130Z" fill="#000" opacity=".45" />
    <rect y="96" width="120" height="16" fill="#9aa3b5" opacity=".08" /><rect y="116" width="120" height="10" fill="#9aa3b5" opacity=".1" />
  </>],
  ['#0b2530', '#04121a', 'มือจากใต้น้ำถือตะเกียง', <>
    <Stars p={[10, 10, 40, 24, 90, 14, 110, 40, 64, 6]} />
    <rect y="96" width="120" height="64" fill="#06303d" /><path d="M0 98q10-3 20 0t20 0t20 0t20 0t20 0t20 0" stroke="#2a6070" fill="none" />
    <path d="M56 160V104Q54 98 58 96H66Q70 98 68 104V160Z" fill="#7fa8a8" opacity=".9" />
    <path d="M54 98q-2-8 2-10M58 94v-10M62 94v-11M66 95v-10M69 98q3-6 0-10" stroke="#7fa8a8" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="62" y1="82" x2="62" y2="72" stroke="#444" /><rect x="55" y="56" width="14" height="16" rx="2" fill="#ffcf5a" stroke="#444" /><path d="M54 56h16l-3-5h-10z" fill="#444" />
    <Glow x={62} y={64} r={34} f="#ffcf5a" o={.2} />
    <g fill="#ffcf5a" opacity=".35"><rect x="56" y="110" width="12" height="2" /><rect x="58" y="118" width="8" height="2" /></g>
  </>],
  ['#f7c59f', '#e07a5f', 'ตุ๊กตาหมีบนม้านั่ง', <>
    <rect x="96" y="0" width="10" height="130" fill="#5e3a22" /><circle cx="100" cy="20" r="28" fill="#d1495b" opacity=".8" /><circle cx="76" cy="30" r="18" fill="#edae49" opacity=".8" />
    <rect y="128" width="120" height="32" fill="#9c6644" />
    <rect x="14" y="98" width="80" height="6" fill="#6b4226" /><rect x="14" y="84" width="80" height="5" fill="#6b4226" /><rect x="20" y="104" width="4" height="26" fill="#3d2817" /><rect x="84" y="104" width="4" height="26" fill="#3d2817" />
    <g fill="#c68b59"><ellipse cx="48" cy="90" rx="10" ry="11" /><circle cx="48" cy="72" r="9" /><circle cx="40" cy="65" r="3.5" /><circle cx="56" cy="65" r="3.5" /><ellipse cx="38" cy="96" rx="4" ry="5" /><ellipse cx="58" cy="96" rx="4" ry="5" /></g>
    <ellipse cx="48" cy="76" rx="4" ry="3" fill="#e8c39e" /><circle cx="45" cy="70" r="1.2" fill="#222" /><circle cx="51" cy="70" r="1.2" fill="#222" /><path d="M44 90l8-2" stroke="#7a4a2a" />
    {[[20, 140, '#d1495b'], [70, 146, '#edae49'], [104, 140, '#d1495b'], [40, 152, '#edae49'], [88, 118, '#edae49']].map(([x, y, c], i) => <ellipse key={i} cx={x} cy={y} rx="4" ry="2" fill={c} transform={`rotate(${i * 40} ${x} ${y})`} />)}
  </>],
  ['#e9f5db', '#b5c99a', 'ปลาในกรงนก นกในโหลปลา', <>
    <path d="M14 76V40Q30 14 46 40V76" stroke="#7a5c2e" fill="none" strokeWidth="1.5" /><Lines p={[22, 76, 22, 28, 30, 76, 30, 24, 38, 76, 38, 28]} c="#7a5c2e" w={.8} /><rect x="10" y="76" width="40" height="4" fill="#7a5c2e" />
    <path d="M22 56q8-8 16 0q-8 8-16 0zM38 56l5-4v8z" fill="#f77f00" /><circle cx="26" cy="55" r="1" fill="#222" />
    <circle cx="84" cy="122" r="24" fill="#9ad1f5" opacity=".5" stroke="#cfe8ff" /><rect x="70" y="144" width="28" height="4" fill="#8a7a6a" />
    <g transform="translate(84 124)"><ellipse rx="8" ry="6" fill="#ffd60a" /><circle cx="7" cy="-4" r="4.5" fill="#ffd60a" /><polygon points="11,-4 15,-3 11,-2" fill="#f77f00" /><path d="M-2-2L-8-10L4-4Z" fill="#e0b000" /><circle cx="8" cy="-5" r=".8" fill="#000" /></g>
    <circle cx="78" cy="106" r="1.5" fill="#fff" opacity=".7" /><circle cx="90" cy="102" r="1" fill="#fff" opacity=".7" />
    <path d="M50 70Q70 70 76 96" stroke="#7a5c2e" strokeDasharray="2 3" fill="none" /><path d="M48 106Q40 100 42 84" stroke="#7a5c2e" strokeDasharray="2 3" fill="none" />
  </>],
  ['#f8f9fa', '#dee2e6', 'ก๊อกน้ำสายรุ้ง', <>
    <rect x="0" y="20" width="44" height="10" fill="#adb5bd" /><path d="M40 20h16v20h-8v-10h-8z" fill="#adb5bd" /><rect x="30" y="12" width="8" height="8" fill="#868e96" /><rect x="22" y="10" width="24" height="4" rx="2" fill="#868e96" />
    {['#e63946', '#f77f00', '#fcbf49', '#2a9d8f', '#457b9d', '#7b2cbf'].map((c, i) => <path key={i} d={`M${48 + i * 1.3} 40Q${50 + i * 2} 90 ${48 + i * 3} 120`} stroke={c} strokeWidth="1.6" fill="none" />)}
    <path d="M36 118H84L78 150H42Z" fill="#6c757d" /><ellipse cx="60" cy="118" rx="24" ry="5" fill="#495057" />
    <ellipse cx="60" cy="118" rx="20" ry="3.5" fill="#fcbf49" opacity=".7" /><path d="M44 118q16-4 32 0" stroke="#2a9d8f" fill="none" />
    <path d="M38 124q-14 2-12 12" stroke="#6c757d" strokeWidth="2" fill="none" />
  </>],
  ['#0f0c29', '#302b63', 'เดินไต่เชือกระหว่างตึก', <>
    <Stars p={[10, 8, 40, 20, 80, 10, 110, 30, 60, 40, 24, 50]} />
    <rect x="0" y="50" width="26" height="110" fill="#0a0820" /><rect x="94" y="40" width="26" height="120" fill="#0a0820" />
    <g fill="#ffd166" opacity=".7"><rect x="6" y="60" width="4" height="5" /><rect x="14" y="76" width="4" height="5" /><rect x="100" y="56" width="4" height="5" /><rect x="108" y="90" width="4" height="5" /><rect x="6" y="110" width="4" height="5" /></g>
    <path d="M26 52Q60 64 94 42" stroke="#aaa" fill="none" />
    <line x1="34" y1="44" x2="86" y2="66" stroke="#ddd" strokeWidth="1.2" />
    <circle cx="60" cy="38" r="3.5" fill="#f1c27d" /><path d="M58 42h4v10h-4z" fill="#e63946" /><path d="M58 52l-2 6M62 52l2 6" stroke="#222" strokeWidth="1.5" />
    <rect y="150" width="120" height="10" fill="#05040f" />
  </>],
  ['#cfe2f3', '#eef5fb', 'กระบองเพชรใส่ผ้าพันคอ', <>
    <Stars p={[10, 10, 30, 30, 50, 14, 80, 24, 100, 10, 110, 40, 20, 60, 90, 56, 64, 44, 40, 80, 104, 84]} f="#fff" r={1.2} />
    <rect y="130" width="120" height="30" fill="#fff" />
    <path d="M44 130V64a10 10 0 0 1 20 0V130Z" fill="#52b788" /><path d="M44 100H34a6 6 0 0 1-6-6V82a5 5 0 0 1 10 0V92h6" fill="#52b788" /><path d="M64 90H76V76a5 5 0 0 1 10 0V92a6 6 0 0 1-6 6H64" fill="#52b788" />
    <path d="M44 60a10 8 0 0 1 20 0z" fill="#fff" /><path d="M42 82h24v7h-24z" fill="#e63946" /><path d="M58 88h7v18h-7z" fill="#e63946" /><path d="M58 106l1 3 2-3 2 3 2-3" stroke="#e63946" fill="none" />
    <Lines p={[50, 70, 50, 76, 56, 100, 56, 106, 52, 116, 52, 122]} c="#2d6a4f" w={.8} />
    <path d="M40 130h28l-3 10h-22z" fill="#bc6c25" />
  </>],
  ['#2b2118', '#4a3b2a', 'นกฮูกอ่านหนังสือ', <>
    <rect x="0" y="0" width="120" height="70" fill="#3a2d20" /><Lines p={[0, 24, 120, 24, 0, 48, 120, 48]} c="#5a4632" w={3} />
    <g fill="#8b3a3a"><rect x="6" y="6" width="6" height="18" /><rect x="14" y="10" width="5" height="14" /><rect x="70" y="30" width="6" height="18" /><rect x="96" y="8" width="7" height="16" /></g><g fill="#3a6b8b"><rect x="20" y="8" width="6" height="16" /><rect x="78" y="32" width="5" height="16" /></g>
    <rect y="130" width="120" height="30" fill="#5a3e25" />
    <rect x="86" y="108" width="8" height="22" fill="#f1e6d0" /><path d="M90 96q-4 6 0 11q4-5 0-11z" fill="#ffb84d" /><Glow x={90} y={102} r={30} f="#ffb84d" o={.2} />
    <ellipse cx="46" cy="110" rx="22" ry="22" fill="#8a6a4a" /><ellipse cx="46" cy="116" rx="14" ry="14" fill="#c9a87a" />
    <polygon points="28,90 32,78 38,90" fill="#8a6a4a" /><polygon points="64,90 60,78 54,90" fill="#8a6a4a" />
    <circle cx="38" cy="98" r="7" fill="none" stroke="#222" strokeWidth="1.5" /><circle cx="54" cy="98" r="7" fill="none" stroke="#222" strokeWidth="1.5" /><circle cx="38" cy="98" r="2.5" fill="#222" /><circle cx="54" cy="98" r="2.5" fill="#222" /><path d="M45 98h2" stroke="#222" strokeWidth="1.5" /><polygon points="44,104 48,104 46,108" fill="#e8a33a" />
    <path d="M28 124L46 130L64 124V136L46 142L28 136Z" fill="#f4ecd8" stroke="#8b6b3a" /><line x1="46" y1="130" x2="46" y2="142" stroke="#8b6b3a" />
  </>],
  ['#ffe066', '#ffb703', 'ไอติมละลายบนทางเท้า', <>
    <circle cx="100" cy="20" r="14" fill="#fff8b0" /><Lines p={[100, 0, 100, 3, 80, 20, 83, 20, 86, 6, 88, 8, 114, 6, 112, 8]} c="#fff8b0" w={2} />
    <rect y="104" width="120" height="56" fill="#adb5bd" /><Lines p={[0, 124, 120, 124, 40, 104, 30, 160, 90, 104, 96, 160]} c="#868e96" />
    <path d="M30 120Q20 136 50 140Q80 144 86 130Q90 118 70 116Q50 114 30 120Z" fill="#ffafcc" />
    <path d="M56 112L74 96L80 104Z" fill="#d4a373" /><path d="M60 110l8-7M66 108l8-7" stroke="#a47148" />
    <g fill="#222">{[[20, 150], [28, 146], [36, 144], [100, 150], [94, 146], [88, 140]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="1.6" ry="1" /><ellipse cx={x + 2} cy={y} rx="1.2" ry=".9" /></g>)}</g>
    <path d="M36 124q4-6 8 0" stroke="#fff" fill="none" opacity=".6" />
  </>],
  ['#a2d2ff', '#cdb4db', 'ทานตะวันมองหลอดไฟ', <>
    <circle cx="22" cy="24" r="14" fill="#fff3b0" />
    <rect y="136" width="120" height="24" fill="#6a994e" />
    <path d="M60 136Q58 100 64 76" stroke="#386641" strokeWidth="3" fill="none" /><path d="M60 116q-12-6-16 2q8 4 16-2z" fill="#386641" />
    <g transform="translate(70 66) rotate(20)">{Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx="0" cy="-12" rx="4" ry="8" fill="#ffd60a" transform={`rotate(${i * 36})`} />)}<circle r="8" fill="#6b4226" /></g>
    <line x1="100" y1="0" x2="100" y2="34" stroke="#333" /><rect x="96" y="34" width="8" height="5" fill="#666" /><circle cx="100" cy="46" r="8" fill="#fff8d0" stroke="#bbb" /><Glow x={100} y={46} r={22} f="#fff3b0" o={.25} />
  </>],
  ['#9bf6ff', '#caffbf', 'ว่าวติดต้นไม้', <>
    <Cloud x={20} y={20} /><Cloud x={100} y={34} s={.8} />
    <rect y="140" width="120" height="20" fill="#80b918" />
    <rect x="66" y="80" width="10" height="60" fill="#7f5539" /><circle cx="70" cy="64" r="26" fill="#55a630" /><circle cx="52" cy="76" r="16" fill="#2b9348" /><circle cx="90" cy="76" r="16" fill="#2b9348" />
    <g transform="translate(78 52) rotate(20)"><polygon points="0,-14 10,0 0,16 -10,0" fill="#ef476f" /><line x1="0" y1="-14" x2="0" y2="16" stroke="#fff" strokeWidth=".8" /><line x1="-10" y1="0" x2="10" y2="0" stroke="#fff" strokeWidth=".8" /></g>
    <path d="M80 72q4 8 0 14q-4 6 2 10" stroke="#ef476f" fill="none" /><g fill="#ffd166"><path d="M80 78l3 2-3 1z" /><path d="M80 88l3 2-3 1z" /></g>
    <path d="M84 60Q100 100 120 108" stroke="#fff" strokeWidth=".7" fill="none" />
  </>],
  ['#1d2d44', '#0d1321', 'หมาป่าหอนใส่คุกกี้', <>
    <Stars p={[10, 14, 40, 8, 100, 12, 20, 60, 110, 60, 70, 10]} />
    <circle cx="70" cy="44" r="24" fill="#e0b46a" /><circle cx="90" cy="30" r="12" fill="#1d2d44" /><circle cx="82" cy="44" r="8" fill="#1d2d44" />
    <g fill="#6b4226"><circle cx="58" cy="36" r="3" /><circle cx="64" cy="54" r="3" /><circle cx="74" cy="60" r="2.5" /><circle cx="52" cy="50" r="2" /></g>
    <path d="M0 160V120L30 104L60 116L90 100L120 112V160Z" fill="#0b0f19" />
    <path d="M38 108L40 90L34 74L38 72L46 84L54 84L58 76L60 92L64 108Z" fill="#0b0f19" />
    <path d="M34 74l-2-6 4 4z" fill="#0b0f19" />
  </>],
  ['#f1faee', '#a8dadc', 'ป่างอกจากหนังสือ', <>
    <path d="M10 130L60 140L110 130V150L60 160L10 150Z" fill="#e9c46a" /><path d="M12 126L60 136V156L12 146Z" fill="#fff" /><path d="M108 126L60 136V156L108 146Z" fill="#f4f1e8" />
    <Lines p={[20, 134, 52, 140, 20 , 140, 52, 146, 68, 140, 100, 134, 68, 146, 100, 140]} c="#ccc" />
    <Pine x={40} y={120} s={1.2} f="#2a9d8f" /><Pine x={60} y={110} s={1.8} f="#264653" /><Pine x={82} y={122} s={1.3} f="#2a9d8f" /><Pine x={28} y={130} s={.7} f="#264653" /><Pine x={96} y={130} s={.7} f="#264653" />
    <Bird x={40} y={40} c="#264653" /><Bird x={78} y={28} s={.8} c="#264653" /><circle cx="94" cy="40" r="8" fill="#f4a261" />
  </>],
  ['#ece4db', '#d8cbbb', 'ไข่ที่มีจักรวาลข้างใน', <>
    <ellipse cx="60" cy="140" rx="34" ry="5" fill="#000" opacity=".1" />
    <path d="M30 96Q30 140 60 140Q90 140 90 96L82 90L74 98L66 88L58 98L50 88L42 98L34 90Z" fill="#fffdf6" stroke="#d6ccc2" />
    <path d="M34 96L42 102L50 92L58 102L66 92L74 102L82 94L86 98Q84 130 60 132Q36 130 34 100Z" fill="#14123a" />
    <Stars p={[44, 106, 52, 114, 70, 108, 76, 118, 60, 124, 48, 120]} />
    <circle cx="64" cy="114" r="4" fill="#ff8fab" /><ellipse cx="64" cy="114" rx="7" ry="1.5" fill="none" stroke="#ffd6e0" strokeWidth=".7" />
    <path d="M34 80Q34 40 60 34Q78 36 86 70L80 76L72 66L64 78L56 66L48 76L40 68Z" fill="#fffdf6" stroke="#d6ccc2" transform="rotate(-24 60 60) translate(-8 -14)" />
    <Stars p={[60, 80, 50, 70, 74, 62]} f="#b8b0ff" r={1} />
  </>],
  ['#fefae0', '#e9edc9', 'เก้าอี้สองตัวกลางทุ่ง', <>
    <rect y="110" width="120" height="50" fill="#a3b18a" />
    <Lines p={[6, 120, 5, 114, 22, 140, 21, 134, 94, 130, 95, 124, 110, 150, 111, 144]} c="#588157" />
    <g stroke="#6b4226" strokeWidth="2.5" fill="none"><path d="M22 86V128M34 104V128M22 104H38M38 104V128" /><path d="M98 86V128M86 104V128M98 104H82M82 104V128" /></g>
    <path d="M86 98h20l-3-10h-14z" fill="#2b2d42" /><rect x="82" y="97" width="28" height="2" fill="#2b2d42" />
    <Cloud x={60} y={30} s={1.3} />
  </>],
  ['#023e8a', '#0096c7', 'สมอที่ลอยขึ้นฟ้า', <>
    <Cloud x={20} y={120} o={.8} /><Cloud x={96} y={140} s={1.2} o={.8} />
    <path d="M60 20Q50 50 60 70" stroke="#fff" strokeWidth=".8" fill="none" />
    <ellipse cx="60" cy="14" rx="12" ry="14" fill="#ffd166" opacity=".9" />
    <g stroke="#adb5bd" strokeWidth="5" fill="none" strokeLinecap="round"><circle cx="60" cy="76" r="5" strokeWidth="3" /><path d="M60 81V124" /><path d="M48 90H72" strokeWidth="4" /><path d="M36 110Q40 128 60 128Q80 128 84 110" /></g>
    <polygon points="32,106 40,108 36,114" fill="#adb5bd" /><polygon points="88,106 80,108 84,114" fill="#adb5bd" />
    <circle cx="30" cy="60" r="2" fill="#fff" opacity=".6" /><circle cx="90" cy="40" r="3" fill="#fff" opacity=".5" /><circle cx="84" cy="70" r="1.5" fill="#fff" opacity=".6" />
  </>],
  ['#48cae4', '#ade8f4', 'มนุษย์หิมะเที่ยวทะเล', <>
    <circle cx="98" cy="22" r="14" fill="#ffd60a" />
    <rect y="96" width="120" height="20" fill="#0077b6" /><path d="M0 116H120V160H0Z" fill="#f4d58d" />
    <path d="M10 100q6-3 12 0M60 104q6-3 12 0" stroke="#90e0ef" fill="none" />
    <ellipse cx="50" cy="148" rx="28" ry="6" fill="#bde0fe" />
    <circle cx="50" cy="130" r="16" fill="#fff" /><circle cx="50" cy="104" r="12" fill="#fff" />
    <path d="M40 101h20" stroke="#222" strokeWidth="1" /><rect x="40" y="98" width="8" height="5" rx="2" fill="#222" /><rect x="52" y="98" width="8" height="5" rx="2" fill="#222" />
    <polygon points="50,106 60,108 50,109" fill="#f77f00" /><path d="M45 112q5 2 10 0" stroke="#222" fill="none" />
    <path d="M38 96q-4 0-6-4" stroke="#fff" strokeWidth="3" /><path d="M66 128l14-10M34 128l-12-8" stroke="#6b4226" strokeWidth="1.5" />
    <path d="M86 116v-26" stroke="#bbb" /><path d="M72 92Q86 76 100 92Z" fill="#ef476f" />
    <path d="M38 152q2 4 4 0M56 154q2 4 4 0" stroke="#bde0fe" fill="none" />
  </>],
  ['#14213d', '#3d405b', 'นับแกะ', <>
    <Stars p={[10, 10, 40, 20, 80, 12, 108, 30, 20, 50]} />
    <path d="M88 14a10 10 0 1 0 8 16a8 8 0 1 1-8-16z" fill="#fff4c2" />
    <Cloud x={20} y={130} s={1.8} f="#cdd5e6" /><Cloud x={64} y={138} s={2} f="#dfe5f0" /><Cloud x={106} y={128} s={1.6} f="#cdd5e6" />
    <g stroke="#a26b3a" strokeWidth="2.5"><line x1="50" y1="94" x2="50" y2="124" /><line x1="70" y1="94" x2="70" y2="124" /><line x1="46" y1="100" x2="74" y2="100" /><line x1="46" y1="112" x2="74" y2="112" /></g>
    <Sheep x={60} y={76} /><Sheep x={24} y={110} s={.8} /><Sheep x={96} y={110} s={.8} />
    <path d="M44 84q-6 4-14 14M82 84q6 4 10 14" stroke="#fff" strokeDasharray="2 3" fill="none" opacity=".6" />
  </>],
  ['#ffe8d6', '#cb997e', 'รอยเท้าที่หายไปในทะเล', <>
    <rect y="0" width="120" height="60" fill="#8ecae6" /><path d="M0 60Q30 54 60 60T120 58V80H0Z" fill="#219ebc" /><path d="M0 78Q30 70 60 78T120 74" stroke="#fff" strokeWidth="2" fill="none" opacity=".8" />
    <g fill="#a47148">{[[30, 150], [40, 140], [36, 128], [46, 118], [42, 106], [52, 96], [48, 86]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="3" ry="5" transform={`rotate(-14 ${x} ${y})`} />)}</g>
    <circle cx="96" cy="26" r="10" fill="#fff3b0" opacity=".9" />
    <path d="M90 130q4-6 10-2q-4 4-10 2z" fill="#f4a261" />
  </>],
  ['#e9ecef', '#ced4da', 'มงกุฎในถังขยะ', <>
    <rect y="134" width="120" height="26" fill="#adb5bd" />
    <rect x="70" y="40" width="50" height="94" fill="#9ca3af" /><rect x="74" y="44" width="42" height="40" fill="#cbd5e1" /><Lines p={[74, 64, 116, 64, 95, 44, 95, 84]} c="#9ca3af" w={1.5} />
    <path d="M24 94H64L60 134H28Z" fill="#6c757d" /><rect x="20" y="88" width="48" height="7" rx="2" fill="#495057" transform="rotate(-8 44 92)" />
    <polygon points="34,90 36,76 42,84 48,72 54,84 60,76 62,90" fill="#ffd60a" stroke="#c99700" /><circle cx="48" cy="80" r="2" fill="#e63946" />
    <g fill="#495057"><ellipse cx="88" cy="128" rx="10" ry="7" /><circle cx="80" cy="118" r="6" /><polygon points="75,115 76,108 80,113" /><polygon points="85,115 84,108 80,113" /></g>
    <path d="M98 128q8-2 6-12" stroke="#495057" strokeWidth="2.5" fill="none" /><circle cx="78" cy="118" r="1" fill="#ffd60a" /><circle cx="82" cy="118" r="1" fill="#ffd60a" />
  </>],
  ['#6c757d', '#adb5bd', 'พายุหอบบ้าน', <>
    <path d="M30 20H96Q86 40 80 56Q74 76 70 96Q66 116 62 150H58Q56 120 52 100Q46 80 40 60Q34 40 30 20Z" fill="#495057" opacity=".7" />
    <path d="M32 30Q60 36 92 28M40 52Q60 58 82 50M48 76Q60 80 74 74M54 100Q60 104 68 100M56 124Q60 126 64 124" stroke="#343a40" fill="none" />
    <g transform="rotate(-18 86 40)"><rect x="78" y="36" width="20" height="16" fill="#e76f51" /><polygon points="76,37 88,26 100,37" fill="#6b4226" /><rect x="84" y="42" width="5" height="5" fill="#ffd166" /></g>
    <g transform="rotate(30 26 70)"><ellipse cx="26" cy="70" rx="9" ry="6" fill="#fff" /><circle cx="18" cy="66" r="4" fill="#fff" /><circle cx="28" cy="68" r="2.5" fill="#222" /><path d="M20 76v5M32 76v5" stroke="#222" strokeWidth="1.5" /></g>
    <rect y="150" width="120" height="10" fill="#495057" />
    <path d="M100 96l6 2-2 4z" fill="#6b4226" /><circle cx="14" cy="110" r="2" fill="#6b4226" />
  </>],
  ['#3a5a40', '#344e41', 'เขาวงกต', <>
    <g fill="none" stroke="#a3b18a" strokeWidth="5"><path d="M10 10H110V150H10V30" /><path d="M24 24H96V136H24V56" /><path d="M38 38H82V122H38V80" /><path d="M52 52H68V108H52" /><path d="M10 80H24M96 60H110M38 100H24M82 90H96M60 24V38M60 122V136" /></g>
    <Glow x={60} y={80} r={14} f="#ffd60a" o={.4} /><circle cx="60" cy="80" r="3" fill="#ffd60a" />
    <circle cx="17" cy="20" r="3" fill="#e63946" />
  </>],
  ['#212529', '#343a40', 'ผีเสื้อกลางคืนกับหลอดไฟ', <>
    <line x1="60" y1="0" x2="60" y2="22" stroke="#555" /><rect x="55" y="22" width="10" height="6" fill="#777" />
    <Glow x={60} y={40} r={50} f="#fff3b0" o={.2} /><circle cx="60" cy="38" r="12" fill="#fff8d6" />
    <g transform="translate(60 100)"><path d="M0 0Q-30-28-40-6Q-36 16 0 4Z" fill="#a68a64" /><path d="M0 0Q30-28 40-6Q36 16 0 4Z" fill="#a68a64" /><path d="M0 4Q-24 12-26 28Q-10 30 0 8ZM0 4Q24 12 26 28Q10 30 0 8Z" fill="#8a6f4e" />
      <circle cx="-22" cy="-6" r="5" fill="#5c4a35" /><circle cx="22" cy="-6" r="5" fill="#5c4a35" /><ellipse cx="0" cy="6" rx="3" ry="12" fill="#3d2f22" /><path d="M-1-6q-6-10-10-12M1-6q6-10 10-12" stroke="#3d2f22" fill="none" /></g>
  </>],
  ['#caf0f8', '#90e0ef', 'ธงบนยอดเขา', <>
    <polygon points="0,160 60,30 120,160" fill="#6c757d" /><polygon points="60,30 76,64 68,60 60,70 52,58 44,64" fill="#fff" />
    <polygon points="0,160 30,96 56,160" fill="#495057" />
    <line x1="60" y1="30" x2="60" y2="10" stroke="#333" /><polygon points="60,10 74,14 60,18" fill="#e63946" />
    <circle cx="70" cy="56" r="2" fill="#333" /><path d="M68 58l-4 6M70 58l4 4" stroke="#333" strokeWidth="1.3" /><path d="M66 60l-6 4" stroke="#333" />
    <Bird x={30} y={30} s={.8} c="#333" /><Cloud x={100} y={40} s={.9} />
  </>],
  ['#fff1e6', '#fde2e4', 'กระปุกออมสินแตกมีต้นไม้งอก', <>
    <rect y="134" width="120" height="26" fill="#ddbea9" />
    <path d="M24 108Q24 84 52 82Q82 82 90 104Q92 124 70 132H38Q24 128 24 108Z" fill="#ffafcc" />
    <path d="M58 86L52 96L62 102L54 112" stroke="#c9184a" strokeWidth="1.5" fill="none" />
    <rect x="34" y="128" width="8" height="8" fill="#ffafcc" /><rect x="70" y="128" width="8" height="8" fill="#ffafcc" /><ellipse cx="90" cy="108" rx="6" ry="5" fill="#ff8fab" /><circle cx="76" cy="98" r="1.6" fill="#333" />
    <path d="M58 86Q56 60 60 46" stroke="#55a630" strokeWidth="2" fill="none" /><path d="M59 62q-12-8-16 2q8 4 16-2zM59 54q12-10 18-2q-8 6-18 2z" fill="#80b918" />
    <g fill="#f4c430" stroke="#c99700" strokeWidth=".6"><ellipse cx="22" cy="140" rx="5" ry="2" /><ellipse cx="100" cy="142" rx="5" ry="2" /><ellipse cx="86" cy="148" rx="5" ry="2" /></g>
  </>],
];
