// ภาพการ์ด 76–100 • [สีบน, สีล่าง, ชื่อภาพ, เนื้อภาพ] • viewBox 120x160
import React from 'react';
import { Stars, Cloud, Glow, Pine, Bird, Lines } from './picbits.jsx';

export const ART4 = [
  ['#10002b', '#240046', 'หัวใจนีออนกลางฝน', <>
    <Lines p={[8, 0, 4, 18, 26, 20, 22, 38, 50, 4, 46, 22, 94, 10, 90, 28, 110, 40, 106, 58, 14, 90, 10, 108, 100, 100, 96, 118, 40, 130, 36, 148, 84, 136, 80, 154]} c="#7b2cbf" o={.7} />
    <rect x="18" y="30" width="84" height="80" rx="4" fill="#1a0033" stroke="#3c096c" />
    <path d="M60 96L36 72A12 12 0 0 1 58 56L56 66L64 74L60 82Z" fill="none" stroke="#ff4d8d" strokeWidth="3" strokeLinejoin="round" />
    <path d="M63 70L62 60A12 12 0 0 1 84 72L64 92" fill="none" stroke="#ff4d8d" strokeWidth="3" strokeLinejoin="round" opacity=".45" />
    <Glow x={50} y={72} r={30} f="#ff4d8d" o={.2} />
    <rect y="130" width="120" height="30" fill="#0b0018" /><path d="M36 140h20M40 146h12" stroke="#ff4d8d" opacity=".4" />
  </>],
  ['#ffd6a5', '#fdffb6', 'บอลลูนลอยเหนือทุ่ง', <>
    <path d="M0 112L40 104L60 116L120 106V160H0Z" fill="#b5e48c" /><path d="M0 130L50 120L80 134L120 124V160H0Z" fill="#99d98c" /><path d="M0 146L40 140L70 150L120 142V160H0Z" fill="#d9ed92" />
    <Lines p={[40, 104, 50, 120, 60, 116, 80, 134, 40, 140, 30, 160]} c="#76c893" />
    <path d="M60 14C40 14 32 32 36 48C40 62 52 70 54 80H66C68 70 80 62 84 48C88 32 80 14 60 14Z" fill="#ef476f" />
    <path d="M60 14C52 14 48 32 50 48C52 62 56 70 57 80H63C64 70 68 62 70 48C72 32 68 14 60 14Z" fill="#ffd166" />
    <Lines p={[54, 80, 55, 88, 66, 80, 65, 88]} c="#6b4226" w={.8} /><rect x="54" y="88" width="12" height="9" fill="#8b5a2b" />
    <Bird x={92} y={30} c="#555" /><Bird x={100} y={40} s={.7} c="#555" />
  </>],
  ['#0077b6', '#03045e', 'ประตูใต้ทะเล', <>
    <g fill="#caf0f8" opacity=".5"><circle cx="30" cy="40" r="2" /><circle cx="34" cy="30" r="1.5" /><circle cx="28" cy="20" r="1" /><circle cx="90" cy="60" r="2" /><circle cx="88" cy="48" r="1.4" /></g>
    <polygon points="40,0 60,0 90,160 10,160" fill="#90e0ef" opacity=".1" />
    <path d="M0 136Q30 126 60 134T120 130V160H0Z" fill="#c2b280" opacity=".7" />
    <rect x="52" y="90" width="26" height="46" fill="#6b4226" /><rect x="55" y="93" width="20" height="43" fill="#fff3b0" /><Glow x={65} y={115} r={30} f="#fff3b0" o={.25} />
    <path d="M14 136q-4-20 4-30q4 14-4 30zM100 134q6-24-2-34q-2 18 2 34z" fill="#2a9d8f" />
    <g transform="translate(30 92)"><circle r="5" fill="#ade8f4" opacity=".8" stroke="#fff" /><rect x="-4" y="4" width="8" height="14" rx="2" fill="#f77f00" /><path d="M-4 18l-3 8M4 18l4 8" stroke="#023e8a" strokeWidth="2" /><path d="M4 8l10 4" stroke="#f77f00" strokeWidth="2" /></g>
  </>],
  ['#fefae0', '#faedcd', 'ไอน้ำมังกรจากชามก๋วยเตี๋ยว', <>
    <path d="M44 86Q32 60 50 50Q64 42 58 28Q54 18 64 12" stroke="#ccc" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".7" />
    <path d="M64 12l8-4-2 6 6 2-8 2z" fill="#ccc" opacity=".7" /><circle cx="66" cy="12" r="1" fill="#555" />
    <path d="M70 86Q80 70 72 60" stroke="#ccc" strokeWidth="3" fill="none" opacity=".5" />
    <path d="M22 94H98Q96 132 60 134Q24 132 22 94Z" fill="#e63946" /><path d="M30 104h60" stroke="#ffd166" strokeWidth="2" strokeDasharray="4 3" />
    <ellipse cx="60" cy="94" rx="38" ry="7" fill="#f4a261" /><path d="M30 94q6-4 12 0t12 0t12 0t12 0t12 0" stroke="#ffe8a3" strokeWidth="1.5" fill="none" />
    <circle cx="48" cy="92" r="4" fill="#fff" /><circle cx="48" cy="92" r="2" fill="#ffb703" /><path d="M66 92h10" stroke="#52b788" strokeWidth="2" />
    <path d="M82 72L100 100M88 70L104 98" stroke="#8b5a2b" strokeWidth="2" />
    <rect x="40" y="134" width="40" height="5" rx="2" fill="#b02a37" />
  </>],
  ['#3d2c2e', '#1f1416', 'ตุ๊กตาบนชั้นที่หันหลัง', <>
    <rect y="62" width="120" height="5" fill="#6b4a3a" /><rect y="118" width="120" height="5" fill="#6b4a3a" />
    {[16, 40, 64, 88].map((x, i) => <g key={i}><circle cx={x + 6} cy={i === 2 ? 40 : 40} r="8" fill="#f1d3c4" /><path d={`M${x - 2} 62Q${x - 2} 48 ${x + 6} 48Q${x + 14} 48 ${x + 14} 62Z`} fill={['#c9184a', '#457b9d', '#6a4c93', '#2a9d8f'][i]} />
      {i === 2 ? <path d={`M${x - 2} 40a8 8 0 0 1 16 0v6h-16z`} fill="#5c3a21" /> : <><path d={`M${x - 2} 38a8 8 0 0 1 16 0z`} fill="#5c3a21" /><circle cx={x + 3} cy="41" r="1.2" fill="#222" /><circle cx={x + 9} cy="41" r="1.2" fill="#222" /></>}</g>)}
    <g><circle cx="40" cy="96" r="9" fill="#f1d3c4" /><path d="M30 118Q30 104 40 104Q50 104 50 118Z" fill="#e9c46a" /><circle cx="37" cy="96" r="1.2" fill="#222" /><circle cx="43" cy="96" r="1.2" fill="#222" /><path d="M31 92a9 9 0 0 1 18 0z" fill="#f4a261" /></g>
    <g><rect x="74" y="98" width="16" height="20" rx="3" fill="#8d6e63" /><circle cx="82" cy="92" r="7" fill="#8d6e63" /><circle cx="77" cy="86" r="3" fill="#8d6e63" /><circle cx="87" cy="86" r="3" fill="#8d6e63" /><circle cx="80" cy="91" r="1" fill="#222" /></g>
    <polygon points="0,0 30,0 0,40" fill="#000" opacity=".3" />
  </>],
  ['#d8e2dc', '#ffe5d9', 'นาฬิกาปลุกใต้หมอน', <>
    <rect y="110" width="120" height="50" fill="#9d8189" /><rect y="104" width="120" height="8" fill="#f4acb7" />
    <path d="M14 104Q14 84 40 82H86Q108 84 106 104Z" fill="#fff" /><path d="M30 92q30-6 60 0" stroke="#e5e5e5" fill="none" />
    <circle cx="94" cy="76" r="8" fill="#e63946" /><circle cx="104" cy="66" r="4" fill="#ffd166" /><circle cx="84" cy="66" r="4" fill="#ffd166" />
    <path d="M100 58l6-6M106 74l8 2M88 56l-2-8" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 70q-4-4 0-8M14 74q-6-6 0-14" stroke="#555" fill="none" />
    <path d="M30 60h14l-2 10h-10z" fill="#264653" opacity=".7" transform="rotate(-10 37 65)" />
  </>],
  ['#a9def9', '#e4c1f9', 'ปราสาทบนหลังเต่า', <>
    <Cloud x={20} y={26} /><Cloud x={100} y={20} s={.7} />
    <path d="M0 140q15-6 30 0t30 0t30 0t30 0V160H0Z" fill="#48bfe3" />
    <path d="M14 134Q16 96 60 94Q104 96 106 134Z" fill="#52b788" /><path d="M30 120l12-8 12 8M66 120l12-8 12 8M48 106l12-8 12 8" stroke="#2d6a4f" fill="none" />
    <ellipse cx="108" cy="126" rx="10" ry="7" fill="#74c69d" /><circle cx="112" cy="124" r="1.3" fill="#222" />
    <ellipse cx="24" cy="140" rx="8" ry="4" fill="#74c69d" /><ellipse cx="94" cy="140" rx="8" ry="4" fill="#74c69d" />
    <g fill="#e9ecef"><rect x="44" y="64" width="32" height="32" /><rect x="40" y="52" width="10" height="44" /><rect x="70" y="52" width="10" height="44" /><rect x="55" y="44" width="10" height="20" /></g>
    <g fill="#9d4edd"><polygon points="38,52 45,40 52,52" /><polygon points="68,52 75,40 82,52" /><polygon points="53,44 60,30 67,44" /></g>
    <path d="M56 96v-10a4 4 0 0 1 8 0v10z" fill="#6b4226" /><rect x="44" y="70" width="3" height="5" fill="#333" /><rect x="73" y="70" width="3" height="5" fill="#333" />
  </>],
  ['#495057', '#212529', 'ฝูงเครื่องบินกระดาษบินเข้าพายุ', <>
    <g fill="#343a40"><circle cx="90" cy="26" r="20" /><circle cx="110" cy="40" r="16" /><circle cx="70" cy="34" r="14" /></g>
    <polygon points="94,40 88,54 94,54 88,68 100,50 94,50 98,40" fill="#ffd60a" />
    {[[24, 130, 1.2], [44, 108, 1], [30, 96, .8], [62, 90, .9], [16, 70, .7], [52, 66, .7], [74, 56, .6]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s}) rotate(-30)`}><polygon points="0,0 22,6 0,10" fill="#f8f9fa" /><polygon points="0,10 22,6 4,13" fill="#ced4da" /></g>)}
  </>],
  ['#e9f5db', '#cfe1b9', 'รอยเท้ายักษ์ในเมือง', <>
    <g fill="#adb5bd"><rect x="4" y="40" width="16" height="30" /><rect x="100" y="34" width="16" height="36" /><rect x="84" y="50" width="12" height="20" /></g>
    <path d="M0 70H120V160H0Z" fill="#b5c99a" />
    <path d="M30 150Q16 120 34 92Q52 72 72 86Q88 100 84 128Q80 154 56 156Q38 158 30 150Z" fill="#6c584c" opacity=".8" />
    <g fill="#6c584c" opacity=".8"><ellipse cx="34" cy="78" rx="7" ry="9" /><ellipse cx="50" cy="70" rx="6" ry="8" /><ellipse cx="64" cy="70" rx="5" ry="7" /><ellipse cx="76" cy="74" rx="5" ry="6" /><ellipse cx="86" cy="82" rx="4" ry="5" /></g>
    <g transform="rotate(30 60 120)"><rect x="52" y="114" width="14" height="10" fill="#e76f51" /><polygon points="50,115 59,108 68,115" fill="#6b4226" /></g>
    <circle cx="100" cy="128" r="2" fill="#333" /><path d="M98 130h4v6h-4z" fill="#333" /><path d="M96 132l-3-3M104 132l3-3" stroke="#333" />
  </>],
  ['#003049', '#001d2e', 'ต้นไม้กับชิงช้าบนเกาะ', <>
    <Stars p={[10, 14, 40, 8, 80, 20, 110, 10, 100, 50, 20, 44]} />
    <path d="M0 110q15-4 30 0t30 0t30 0t30 0V160H0Z" fill="#00253a" />
    <ellipse cx="60" cy="112" rx="28" ry="6" fill="#4a3f35" />
    <path d="M54 112Q56 80 50 56M58 112Q62 80 72 60" stroke="#2b2118" strokeWidth="5" fill="none" />
    <circle cx="50" cy="48" r="16" fill="#2a4a3a" /><circle cx="70" cy="50" r="14" fill="#2a4a3a" /><circle cx="60" cy="38" r="14" fill="#335c47" />
    <Lines p={[70, 64, 74, 94, 80, 62, 82, 94]} c="#bfa" w={.6} /><rect x="72" y="94" width="12" height="2" fill="#a68a64" />
    <circle cx="96" cy="24" r="6" fill="#fff4c2" />
  </>],
  ['#ffe8d6', '#ddbea9', 'แรคคูนขโมยพาย', <>
    <rect x="20" y="20" width="80" height="80" fill="#6b705c" /><rect x="24" y="24" width="72" height="72" fill="#fff8e7" /><Lines p={[60, 24, 60, 96, 24, 60, 96, 60]} c="#6b705c" w={3} />
    <rect x="12" y="100" width="96" height="8" fill="#a5a58d" /><rect y="108" width="120" height="52" fill="#cb997e" />
    <path d="M28 18Q40 10 50 18V34Q40 26 28 34Z" fill="#e5989b" />
    <ellipse cx="80" cy="98" rx="14" ry="4" fill="#d4a373" /><path d="M68 98q12-8 24 0" fill="#e9c46a" /><path d="M72 96l4-3M80 95l2-3M86 96l2-3" stroke="#a47148" />
    <g><ellipse cx="44" cy="96" rx="14" ry="9" fill="#6c757d" /><circle cx="44" cy="84" r="9" fill="#adb5bd" /><path d="M35 84h18v4h-18z" fill="#212529" /><circle cx="40" cy="86" r="1.4" fill="#fff" /><circle cx="48" cy="86" r="1.4" fill="#fff" /><polygon points="36,78 37,72 41,77" fill="#6c757d" /><polygon points="52,78 51,72 47,77" fill="#6c757d" /><circle cx="44" cy="90" r="1.3" fill="#222" /></g>
    <path d="M56 96q8-2 14 0" stroke="#6c757d" strokeWidth="3" strokeLinecap="round" />
    <path d="M30 98q-10 2-12 10" stroke="#495057" strokeWidth="4" fill="none" strokeDasharray="3 3" strokeLinecap="round" />
  </>],
  ['#22223b', '#4a4e69', 'กล้องดูดาวบนหลังคา', <>
    <Stars p={[10, 10, 30, 30, 50, 10, 100, 40, 110, 14, 70, 50, 20, 60]} />
    <path d="M86 28l-4-4a3 3 0 0 1 4-4a3 3 0 0 1 4 4z" fill="#ff8fab" transform="scale(1.4) translate(-26 -8)" /><Glow x={94} y={24} r={14} f="#ff8fab" o={.3} />
    <path d="M0 160V118L60 96L120 118V160Z" fill="#2b2d42" /><Lines p={[0, 128, 60, 106, 60, 106, 120, 128]} c="#3d405b" w={2} />
    <g transform="rotate(-36 50 96)"><rect x="40" y="90" width="34" height="9" rx="2" fill="#c9ada7" /><rect x="74" y="88" width="6" height="13" fill="#9a8c98" /></g>
    <path d="M50 98l-6 14M50 98l6 14M50 98v14" stroke="#9a8c98" strokeWidth="1.5" />
    <circle cx="34" cy="96" r="4" fill="#f2e9e4" /><path d="M30 100h8v12h-8z" fill="#9a8c98" />
  </>],
  ['#264653', '#2a9d8f', 'คนตัวจิ๋วในลูกแก้วหิมะ', <>
    <ellipse cx="60" cy="40" rx="40" ry="26" fill="#f4f1de" /><circle cx="60" cy="40" r="16" fill="#3a86ff" /><circle cx="60" cy="40" r="8" fill="#000" /><circle cx="64" cy="36" r="3" fill="#fff" />
    <circle cx="60" cy="112" r="34" fill="#caf0f8" opacity=".35" stroke="#fff" />
    <path d="M30 128q30-8 60 0" fill="#fff" /><path d="M26 140H94L88 156H32Z" fill="#6b4226" />
    <Pine x={44} y={128} s={.7} f="#2d6a4f" /><Pine x={78} y={128} s={.6} f="#2d6a4f" />
    <circle cx="60" cy="112" r="3" fill="#e63946" /><path d="M58 115h4v9h-4z" fill="#e63946" /><path d="M62 117l4-6" stroke="#e63946" strokeWidth="1.5" />
    <Stars p={[40, 96, 50, 88, 72, 92, 80, 104, 46, 110, 68, 84]} r={1} />
  </>],
  ['#b8f2e6', '#faf3dd', 'หม้อทองที่ว่างเปล่า', <>
    {['#e63946', '#f77f00', '#fcbf49', '#2a9d8f', '#457b9d', '#7b2cbf'].map((c, i) => <path key={i} d={`M${-10 + i * 4} 140A${70 - i * 4} ${100 - i * 4} 0 0 1 ${110 - i * 4} 120`} stroke={c} strokeWidth="4" fill="none" opacity=".75" />)}
    <rect y="130" width="120" height="30" fill="#80b918" />
    <path d="M86 116H112L108 138H90Z" fill="#2b2d42" /><ellipse cx="99" cy="116" rx="14" ry="3" fill="#000" />
    <g fill="#6c584c">{[[80, 140], [72, 146], [64, 140], [56, 148], [48, 142], [40, 150], [30, 146]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="2.2" ry="1.4" />)}</g>
    <circle cx="20" cy="152" r="2" fill="#ffd60a" />
  </>],
  ['#adc178', '#dde5b6', 'ทีวีเก่ากลางทุ่ง', <>
    <rect y="120" width="120" height="40" fill="#6c584c" opacity=".4" /><Lines p={[10, 126, 9, 118, 30, 130, 31, 121, 96, 128, 98, 119, 112, 140, 111, 132]} c="#606c38" w={1.4} />
    <rect x="28" y="64" width="64" height="52" rx="6" fill="#7f5539" /><rect x="34" y="70" width="42" height="40" rx="4" fill="#d6ccc2" />
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x="36" y={72 + i * 4.6} width="38" height="2" fill={i % 2 ? '#adb5bd' : '#f8f9fa'} />)}
    <ellipse cx="55" cy="90" rx="10" ry="6" fill="#fff" /><circle cx="55" cy="90" r="4" fill="#222" />
    <circle cx="84" cy="80" r="3" fill="#ddb892" /><circle cx="84" cy="92" r="3" fill="#ddb892" />
    <path d="M50 64L40 48M66 64L78 50" stroke="#333" /><rect x="34" y="116" width="4" height="8" fill="#5c3d2e" /><rect x="82" y="116" width="4" height="8" fill="#5c3d2e" />
    <Bird x={94} y={30} c="#333" />
  </>],
  ['#adb5bd', '#e9ecef', 'ม้าหมุนในหมอก', <>
    <rect x="58" y="10" width="4" height="150" fill="#c9a227" />
    <path d="M38 80Q36 66 48 62L54 54L58 62Q70 66 72 76L68 82Q60 84 54 82L48 98H44L46 84Q40 84 38 80Z" fill="#fff" stroke="#999" />
    <path d="M54 54Q46 52 44 60" stroke="#f4a261" strokeWidth="3" fill="none" /><circle cx="60" cy="66" r="1" fill="#222" />
    <path d="M44 72q8 4 16 0" stroke="#e63946" strokeWidth="2" fill="none" />
    <rect y="100" width="120" height="60" fill="#fff" opacity=".45" /><rect y="40" width="120" height="30" fill="#fff" opacity=".3" />
    <path d="M10 150Q60 140 110 150" stroke="#888" fill="none" />
  </>],
  ['#ffd166', '#f4a261', 'เพนกวินกลางทะเลทราย', <>
    <circle cx="96" cy="26" r="14" fill="#fff3b0" />
    <path d="M0 116Q40 100 80 112T120 108V160H0Z" fill="#e9c46a" />
    <rect x="16" y="84" width="6" height="34" rx="3" fill="#2a9d8f" /><path d="M16 96h-6v-8M22 100h6v-10" stroke="#2a9d8f" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M60 60v-20" stroke="#555" /><path d="M42 44Q60 24 78 44Z" fill="#7209b7" />
    <ellipse cx="60" cy="96" rx="13" ry="20" fill="#222" /><ellipse cx="60" cy="100" rx="9" ry="15" fill="#fff" /><circle cx="60" cy="74" r="9" fill="#222" />
    <circle cx="57" cy="73" r="1.8" fill="#fff" /><circle cx="63" cy="73" r="1.8" fill="#fff" /><polygon points="58,77 62,77 60,81" fill="#f77f00" />
    <ellipse cx="54" cy="116" rx="4" ry="2" fill="#f77f00" /><ellipse cx="66" cy="116" rx="4" ry="2" fill="#f77f00" />
    <path d="M58 84q2 1 4 0" stroke="#5bc0eb" fill="none" />
  </>],
  ['#f8edeb', '#e8e8e4', 'หนังสือบินเหมือนนก', <>
    <rect x="0" y="40" width="30" height="120" fill="#6b4226" /><Lines p={[0, 70, 30, 70, 0, 100, 30, 100, 0, 130, 30, 130]} c="#3d2817" w={3} />
    <g stroke="#a47148" strokeWidth="2"><line x1="40" y1="160" x2="62" y2="30" /><line x1="52" y1="160" x2="74" y2="30" /></g><Lines p={[42, 148, 54, 148, 46, 124, 58, 124, 50, 100, 62, 100, 54, 76, 66, 76, 58, 52, 70, 52]} c="#a47148" w={2} />
    <Cloud x={70} y={26} s={1.4} o={.9} />
    {[[90, 60, '#e63946'], [100, 90, '#457b9d'], [80, 110, '#2a9d8f'], [104, 30, '#f4a261']].map(([x, y, c], i) => <g key={i} transform={`translate(${x} ${y})`}><path d="M0 0L-10-6L-10 2Z M0 0L10-6L10 2Z" fill={c} /><path d="M-9-4L0 1L9-4" stroke="#fff" fill="none" strokeWidth=".6" /></g>)}
  </>],
  ['#ffcad4', '#f4acb7', 'ขนมปังกระโดดจากเครื่องปิ้ง', <>
    <rect y="120" width="120" height="40" fill="#9d8189" />
    <path d="M24 86H96Q100 86 100 92V122H20V92Q20 86 24 86Z" fill="#ced4da" /><rect x="34" y="84" width="20" height="4" rx="1" fill="#495057" /><rect x="66" y="84" width="20" height="4" rx="1" fill="#495057" /><rect x="98" y="100" width="6" height="4" fill="#495057" />
    <g transform="rotate(-14 50 40)"><path d="M36 54V34a14 10 0 0 1 28 0V54Z" fill="#d4a373" /><path d="M39 52V35a11 8 0 0 1 22 0V52Z" fill="#faedcd" /><circle cx="45" cy="42" r="1.4" fill="#222" /><circle cx="55" cy="42" r="1.4" fill="#222" /><path d="M46 47q4 3 8 0" stroke="#222" fill="none" /></g>
    <g transform="rotate(10 78 66)"><path d="M66 78V62a12 9 0 0 1 24 0V78Z" fill="#6f4518" /><path d="M72 66l4 4M82 64l-3 5" stroke="#3d2408" /></g>
    <path d="M60 80q2-6 0-12M86 50q4-4 2-10" stroke="#888" fill="none" opacity=".6" />
  </>],
  ['#bde0fe', '#a2d2ff', 'โทรศัพท์กระป๋องระหว่างบ้าน', <>
    <rect y="140" width="120" height="20" fill="#8ac926" />
    <rect x="4" y="80" width="34" height="60" fill="#ffafcc" /><polygon points="0,82 21,62 42,82" fill="#c9184a" /><rect x="14" y="94" width="14" height="14" fill="#fff3b0" />
    <rect x="82" y="70" width="34" height="70" fill="#cdb4db" /><polygon points="78,72 99,50 120,72" fill="#6a4c93" /><rect x="92" y="84" width="14" height="14" fill="#fff3b0" />
    <path d="M28 100Q60 116 94 90" stroke="#555" strokeWidth=".8" fill="none" />
    <rect x="24" y="97" width="6" height="7" fill="#adb5bd" /><rect x="92" y="87" width="6" height="7" fill="#adb5bd" />
    <circle cx="21" cy="99" r="3" fill="#f1c27d" /><circle cx="101" cy="89" r="3" fill="#f1c27d" />
    <Bird x={60} y={110} s={.6} c="#333" />
  </>],
  ['#f1faee', '#e0fbfc', 'ครีบฉลามในอ่างอาบน้ำ', <>
    <rect y="0" width="120" height="100" fill="#e0fbfc" /><Lines p={[0, 20, 120, 20, 0, 40, 120, 40, 0, 60, 120, 60, 0, 80, 120, 80, 30, 0, 30, 100, 60, 0, 60, 100, 90, 0, 90, 100]} c="#c5e8ea" />
    <rect y="130" width="120" height="30" fill="#98c1d9" />
    <path d="M12 96H108V108Q108 132 84 132H36Q12 132 12 108Z" fill="#fff" stroke="#c5c5c5" /><rect x="10" y="92" width="100" height="6" rx="3" fill="#fff" stroke="#c5c5c5" />
    <ellipse cx="60" cy="96" rx="46" ry="3" fill="#7ec8e3" />
    <path d="M56 96L66 76L72 96Z" fill="#5c677d" />
    <g fill="#fff" stroke="#ddd"><circle cx="24" cy="92" r="4" /><circle cx="30" cy="89" r="3" /><circle cx="94" cy="92" r="4" /></g>
    <path d="M100 92V70h-8" stroke="#adb5bd" strokeWidth="3" fill="none" /><rect x="88" y="66" width="6" height="6" fill="#adb5bd" />
    <ellipse cx="22" cy="140" rx="10" ry="3" fill="#ffd166" /><circle cx="18" cy="137" r="3" fill="#ffd166" />
  </>],
  ['#cdb4db', '#ffc8dd', 'ฟูกสิบชั้นกับเมล็ดถั่ว', <>
    {['#e63946', '#f4a261', '#2a9d8f', '#457b9d', '#ffd166', '#9d4edd', '#06d6a0', '#ef476f', '#118ab2'].map((c, i) => <rect key={i} x={26 + (i % 3) * 2} y={140 - i * 9} width="68" height="9" rx="4" fill={c} />)}
    <rect x="22" y="148" width="4" height="12" fill="#6b4226" /><rect x="94" y="148" width="4" height="12" fill="#6b4226" /><rect x="22" y="146" width="76" height="4" fill="#6b4226" />
    <circle cx="70" cy="146" r="2.5" fill="#55a630" />
    <circle cx="60" cy="48" r="7" fill="#f1c27d" /><path d="M48 62Q60 52 72 62Z" fill="#fff" /><polygon points="54,42 56,36 60,40 64,36 66,42" fill="#ffd60a" />
    <path d="M56 48h2M62 48h2" stroke="#333" /><path d="M58 52q2-2 4 0" stroke="#333" fill="none" />
  </>],
  ['#0b132b', '#1c2541', 'ยูเอฟโอดูดวัว', <>
    <Stars p={[10, 10, 40, 30, 100, 14, 110, 60, 20, 60]} />
    <polygon points="48,40 72,40 96,140 24,140" fill="#c6ff8a" opacity=".22" />
    <ellipse cx="60" cy="36" rx="34" ry="9" fill="#adb5bd" /><path d="M42 32a18 14 0 0 1 36 0z" fill="#7fdbff" opacity=".8" /><g fill="#ffd60a"><circle cx="34" cy="38" r="2" /><circle cx="48" cy="41" r="2" /><circle cx="72" cy="41" r="2" /><circle cx="86" cy="38" r="2" /></g>
    <path d="M0 140Q60 132 120 142V160H0Z" fill="#132a13" />
    <g transform="rotate(-20 60 96)"><ellipse cx="60" cy="96" rx="14" ry="9" fill="#fff" /><circle cx="64" cy="94" r="3" fill="#222" /><circle cx="52" cy="98" r="3.5" fill="#222" /><ellipse cx="76" cy="90" rx="6" ry="5" fill="#fff" /><ellipse cx="80" cy="92" rx="3" ry="2.5" fill="#ffafcc" /><path d="M50 104v6M58 105v6M66 104v6M70 103v6" stroke="#222" strokeWidth="2" /></g>
  </>],
  ['#14213d', '#000814', 'พระจันทร์นอนเปล', <>
    <Stars p={[10, 120, 30, 140, 90, 130, 110, 110, 60, 150, 50, 20]} />
    <path d="M14 30l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z" fill="#ffd60a" /><path d="M106 30l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z" fill="#ffd60a" />
    <path d="M18 44Q60 96 102 44" stroke="#e9c46a" strokeWidth="1" fill="none" />
    <path d="M24 48Q60 94 96 48" stroke="#e76f51" strokeWidth="5" fill="none" />
    <path d="M44 62a16 16 0 1 0 30 4a12 12 0 1 1-30-4z" fill="#fff4c2" transform="rotate(30 60 66)" />
    <path d="M58 64q2 2 4 0" stroke="#a68a64" fill="none" />
    <path d="M80 50q4-4 8 0M86 40q3-3 6 0" stroke="#fff4c2" fill="none" opacity=".6" />
  </>],
  ['#ffcb77', '#fe6d73', 'เงาที่จับมือกัน', <>
    <rect y="96" width="120" height="64" fill="#e5989b" />
    <path d="M30 120L6 160H30L44 120ZM90 120L114 160H90L76 120Z" fill="#6d2e46" opacity=".35" />
    <path d="M40 120Q60 150 80 120" stroke="#6d2e46" strokeWidth="4" fill="none" opacity=".35" />
    <circle cx="30" cy="76" r="7" fill="#3d1a2a" /><path d="M24 84h12v28h-12z" fill="#3d1a2a" /><path d="M26 112v10M34 112v10" stroke="#3d1a2a" strokeWidth="3" />
    <circle cx="90" cy="72" r="7" fill="#3d1a2a" /><path d="M84 80h12v32h-12z" fill="#3d1a2a" /><path d="M86 112v10M94 112v10" stroke="#3d1a2a" strokeWidth="3" />
    <circle cx="60" cy="40" r="16" fill="#ffe8a3" opacity=".9" />
  </>],
];
