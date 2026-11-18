// ภาพการ์ดแบบละเอียด ชุด 9 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;

export const HD9 = [
  [10, 'เรือกระดาษในแอ่งน้ำ', <Svg>
    <defs>
      <linearGradient id="t10s" x2="0" y2="1"><stop stopColor="#22223b" /><stop offset="1" stopColor="#6d597a" /></linearGradient>
      <linearGradient id="t10r" x2="0" y2="1"><stop stopColor="#4a4e69" /><stop offset="1" stopColor="#2b2d42" /></linearGradient>
      <radialGradient id="t10p" cx=".5" cy=".4"><stop stopColor="#9a8c98" /><stop offset="1" stopColor="#4a4e69" /></radialGradient>
      <radialGradient id="t10l"><stop stopColor="#ffd166" stopOpacity=".7" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#t10s)" />
    <g fill="#14141f"><rect x="0" y="48" width="22" height="56" /><rect x="22" y="32" width="18" height="72" /><rect x="40" y="56" width="24" height="48" /><rect x="64" y="22" width="16" height="82" /><rect x="80" y="44" width="22" height="60" /><rect x="102" y="60" width="18" height="44" /></g>
    <g fill="#ffd166">{[[4, 54], [10, 66], [26, 40], [32, 52], [26, 76], [46, 62], [56, 74], [68, 30], [74, 44], [68, 68], [84, 52], [92, 64], [86, 84], [106, 68], [112, 82]].map(([x, y], i) => <rect key={i} x={x} y={y} width="3.4" height="4.4" opacity={i % 3 ? 1 : .5} />)}</g>
    <g fill="url(#t10l)"><circle cx="30" cy="54" r="10" /><circle cx="72" cy="40" r="10" /><circle cx="90" cy="62" r="10" /></g>
    <path d="M100 0V104" stroke="#14141f" strokeWidth="2" /><path d="M100 30h-8" stroke="#14141f" strokeWidth="2" /><circle cx="92" cy="32" r="2" fill="#ffd166" /><circle cx="92" cy="32" r="12" fill="url(#t10l)" />
    <rect y="104" width="120" height="56" fill="url(#t10r)" /><path d="M0 104h120" stroke="#6d6875" strokeWidth="1.5" />
    <g stroke="#22223b" strokeWidth=".8">{[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M${i * 24} 104L${i * 24 - 8} 160`} />)}</g>
    <ellipse cx="60" cy="132" rx="50" ry="18" fill="url(#t10p)" opacity=".85" />
    <g opacity=".45"><rect x="22" y="118" width="14" height="12" fill="#14141f" /><rect x="64" y="116" width="10" height="20" fill="#14141f" /><rect x="84" y="118" width="16" height="12" fill="#14141f" /></g>
    <g fill="#ffd166" opacity=".55"><rect x="28" y="122" width="3" height="2" /><rect x="68" y="124" width="3" height="2" /><rect x="88" y="122" width="3" height="2" /></g>
    <g stroke="#c9ada7" strokeWidth=".6" fill="none" opacity=".7"><ellipse cx="60" cy="132" rx="16" ry="4" /><ellipse cx="60" cy="132" rx="26" ry="7" /></g>
    <path d="M42 126H78L71 136H49Z" fill="#fff" /><path d="M42 126H78L71 136H49Z" fill="none" stroke="#dee2e6" strokeWidth=".5" /><polygon points="51,126 60,106 69,126" fill="#f8f9fa" /><path d="M60 106V126" stroke="#dee2e6" /><polygon points="60,106 69,126 60,126" fill="#e9ecef" />
    <path d="M49 137H71L68 141H52Z" fill="#fff" opacity=".25" />
    <g stroke="#c9ada7" strokeWidth=".5" opacity=".6">{Array.from({ length: 14 }, (_, i) => <line key={i} x1={(i * 17) % 120} y1={(i * 23) % 100} x2={(i * 17) % 120 - 2} y2={(i * 23) % 100 + 6} />)}</g>
  </Svg>],

  [11, 'หอยทากแบกบ้าน', <Svg>
    <defs>
      <linearGradient id="t11s" x2="0" y2="1"><stop stopColor="#caf0f8" /><stop offset="1" stopColor="#d8f3dc" /></linearGradient>
      <linearGradient id="t11g" x2="0" y2="1"><stop stopColor="#95d5b2" /><stop offset="1" stopColor="#52b788" /></linearGradient>
      <linearGradient id="t11b" x2="0" y2="1"><stop stopColor="#f2d0a9" /><stop offset="1" stopColor="#c9a07a" /></linearGradient>
      <radialGradient id="t11w"><stop stopColor="#ffd166" stopOpacity=".7" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#t11s)" />
    <g fill="#fff" opacity=".9"><ellipse cx="22" cy="26" rx="14" ry="5" /><circle cx="18" cy="22" r="5" /><circle cx="26" cy="21" r="6" /></g>
    <path d="M0 120Q60 112 120 122V160H0Z" fill="url(#t11g)" />
    <g stroke="#2d6a4f" strokeWidth="1.2" strokeLinecap="round">{Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${i * 8 + 2} ${124 + (i % 3) * 8}q-1-6 1-10M${i * 8 + 4} ${124 + (i % 3) * 8}q2-4 4-6`} fill="none" />)}</g>
    <g fill="#ffafcc">{[[10, 138], [104, 132], [94, 150]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="2.2" /><circle cx={x} cy={y} r=".8" fill="#ffd166" /></g>)}</g>
    <path d="M10 130Q10 118 28 120H96Q108 120 108 128Q104 134 96 132H20Q10 134 10 130Z" fill="url(#t11b)" />
    <path d="M14 132q40 4 88 0" stroke="#a87c58" strokeWidth=".6" fill="none" /><path d="M10 130q-4 2-6 0" stroke="#e8c9a0" strokeWidth=".8" opacity=".7" />
    <path d="M100 121l6-16M94 121l2-16" stroke="#c9a07a" strokeWidth="1.8" strokeLinecap="round" /><circle cx="106" cy="104" r="2.4" fill="#3a2a1a" /><circle cx="96" cy="104" r="2.4" fill="#3a2a1a" /><circle cx="106.6" cy="103.4" r=".7" fill="#fff" /><circle cx="96.6" cy="103.4" r=".7" fill="#fff" />
    <path d="M100 126q3 2 6 0" stroke="#7a5a3a" strokeWidth=".8" fill="none" />
    <rect x="34" y="84" width="48" height="36" fill="#f4d7a1" /><g stroke="#d9b880" strokeWidth=".6">{[90, 96, 102, 108, 114].map(y => <line key={y} x1="34" y1={y} x2="82" y2={y} />)}</g>
    <polygon points="29,86 58,60 87,86" fill="#b5543c" /><g stroke="#8a3f2c" strokeWidth=".6">{[0, 1, 2, 3].map(i => <path key={i} d={`M${33 + i * 3} ${83 - i * 3}H${83 - i * 3}`} />)}</g>
    <rect x="48" y="94" width="14" height="13" fill="#ffd84d" /><path d="M55 94v13M48 100.5h14" stroke="#b5543c" strokeWidth="1.2" /><circle cx="55" cy="100" r="16" fill="url(#t11w)" />
    <path d="M66 120v-14a5 5 0 0 1 10 0v14z" fill="#8a3f2c" /><circle cx="74" cy="113" r=".8" fill="#ffd166" />
    <rect x="70" y="64" width="6" height="12" fill="#8a3f2c" /><g fill="#fff"><circle cx="75" cy="56" r="3" opacity=".7" /><circle cx="79" cy="48" r="4" opacity=".5" /><circle cx="84" cy="38" r="5" opacity=".3" /></g>
    <g fill="#e63946"><path d="M38 84q2-6 4 0zM44 84q2-6 4 0z" /></g><path d="M36 84h14" stroke="#55a630" strokeWidth="1.5" />
  </Svg>],

  [12, 'ลูกโป่งผูกหิน', <Svg>
    <defs>
      <linearGradient id="t12s" x2="0" y2="1"><stop stopColor="#e2eafc" /><stop offset="1" stopColor="#b6ccfe" /></linearGradient>
      <radialGradient id="t12b" cx=".35" cy=".3"><stop stopColor="#ff8fa3" /><stop offset=".6" stopColor="#e63946" /><stop offset="1" stopColor="#9d0208" /></radialGradient>
      <radialGradient id="t12r" cx=".35" cy=".3"><stop stopColor="#adb5bd" /><stop offset="1" stopColor="#495057" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#t12s)" />
    <g fill="#fff" opacity=".7"><ellipse cx="96" cy="24" rx="16" ry="4" /><ellipse cx="20" cy="70" rx="14" ry="3" /></g>
    <path d="M0 140Q60 134 120 142V160H0Z" fill="#abc4ff" /><path d="M0 146Q60 140 120 148V160H0Z" fill="#9db4f0" />
    <ellipse cx="60" cy="146" rx="22" ry="4" fill="#6c7fb0" opacity=".5" />
    <path d="M42 144Q40 128 54 126Q70 124 78 134Q82 144 70 146H48Q42 146 42 144Z" fill="url(#t12r)" />
    <g fill="#6c757d" opacity=".6"><circle cx="52" cy="134" r="1.4" /><circle cx="66" cy="138" r="1" /><path d="M58 128l4 4" stroke="#495057" strokeWidth=".6" /></g>
    <path d="M56 128q-2-3 2-4q4 1 2 4" stroke="#6b4226" strokeWidth=".9" fill="none" />
    <path d="M58 125Q48 100 62 80Q66 74 64 70" stroke="#6b4226" strokeWidth=".7" fill="none" />
    <path d="M64 70l-3 4h6z" fill="#9d0208" />
    <ellipse cx="64" cy="48" rx="19" ry="23" fill="url(#t12b)" />
    <ellipse cx="56" cy="38" rx="4.5" ry="8" fill="#fff" opacity=".5" transform="rotate(-20 56 38)" /><circle cx="54" cy="52" r="1.6" fill="#fff" opacity=".4" />
    <path d="M64 26q6 0 10 6" stroke="#ffccd5" strokeWidth=".8" fill="none" opacity=".6" />
    <g fill="#495057"><path d="M20 30q3-3 6 0q-3 1-6 0z" /><path d="M28 24q2-2 4 0q-2 1-4 0z" /></g>
    <path d="M78 46q8 2 12-2M80 54q8 2 14-2" stroke="#fff" strokeWidth=".8" fill="none" opacity=".6" />
  </Svg>],

  [14, 'หน้ากากหยดน้ำตา', <Svg>
    <defs>
      <radialGradient id="t14s" cx=".5" cy=".45"><stop stopColor="#7b2869" /><stop offset="1" stopColor="#1d0a1f" /></radialGradient>
      <linearGradient id="t14m" x2="1" y2="1"><stop stopColor="#fff1a8" /><stop offset=".5" stopColor="#f5c84c" /><stop offset="1" stopColor="#b8860b" /></linearGradient>
      <linearGradient id="t14f" x2="0" y2="1"><stop stopColor="#e0aaff" /><stop offset="1" stopColor="#7b2cbf" /></linearGradient>
      <linearGradient id="t14t" x2="0" y2="1"><stop stopColor="#e0fbfc" /><stop offset="1" stopColor="#48cae4" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#t14s)" />
    <g fill="#9d4edd" opacity=".15">{Array.from({ length: 6 }, (_, i) => <circle key={i} cx={10 + i * 20} cy={140 - (i % 2) * 10} r="10" />)}</g>
    <path d="M24 60Q12 30 28 14Q28 36 36 54Z" fill="url(#t14f)" /><path d="M32 56Q28 22 46 10Q40 34 42 56Z" fill="url(#t14f)" opacity=".85" /><path d="M40 56Q44 26 60 16Q50 38 48 58Z" fill="#c77dff" />
    <g stroke="#3c096c" strokeWidth=".5" fill="none">{[0, 1, 2].map(i => <path key={i} d={`M${30 + i * 8} ${54 - i * 2}Q${28 + i * 8} ${34 - i * 4} ${36 + i * 8} ${16 - i * 4}`} />)}</g>
    <path d="M16 70Q60 48 104 70Q102 96 80 96Q68 96 60 86Q52 96 40 96Q18 96 16 70Z" fill="url(#t14m)" stroke="#8a6410" strokeWidth="1.2" />
    <path d="M22 72Q60 56 98 72" stroke="#fff6c8" strokeWidth="1" fill="none" opacity=".7" />
    <g fill="#8a6410" opacity=".6">{[[28, 84], [92, 84], [60, 66], [36, 66], [84, 66]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.4" />)}</g>
    <path d="M30 76Q40 68 52 76Q42 82 30 76Z" fill="#1d0a1f" /><path d="M68 76Q80 68 90 76Q80 82 68 76Z" fill="#1d0a1f" />
    <path d="M30 76Q40 68 52 76M68 76Q80 68 90 76" stroke="#c9184a" strokeWidth=".8" fill="none" />
    <g fill="#e63946"><circle cx="60" cy="74" r="2.4" /><circle cx="60" cy="74" r="1" fill="#ffccd5" /></g>
    <path d="M80 84q-5 9 0 12q5-3 0-12z" fill="url(#t14t)" /><path d="M82 104q-3 6 0 8q3-2 0-8z" fill="url(#t14t)" opacity=".7" /><circle cx="79" cy="91" r=".8" fill="#fff" />
    <path d="M16 72Q2 100 10 150M104 72Q118 100 110 150" stroke="#c77dff" strokeWidth="1.6" fill="none" /><path d="M14 74Q6 104 16 146" stroke="#e0aaff" strokeWidth=".8" fill="none" />
    <g fill="#f5c84c">{[[10, 150], [110, 150]].map(([x, y], i) => <path key={i} d={`M${x} ${y}l-2 4h4z`} />)}</g>
  </Svg>],

  [15, 'เทียนที่ละลายเป็นแม่น้ำ', <Svg>
    <defs>
      <linearGradient id="t15s" x2="0" y2="1"><stop stopColor="#0b1320" /><stop offset="1" stopColor="#1f3350" /></linearGradient>
      <radialGradient id="t15g"><stop stopColor="#ffd28a" stopOpacity=".6" /><stop offset="1" stopColor="#ffd28a" stopOpacity="0" /></radialGradient>
      <linearGradient id="t15w" x2="1" y2="0"><stop stopColor="#d9cbb0" /><stop offset=".4" stopColor="#fdf5e4" /><stop offset="1" stopColor="#c9b896" /></linearGradient>
      <linearGradient id="t15f" x2="0" y2="1"><stop stopColor="#fff3c0" /><stop offset=".5" stopColor="#ffb84d" /><stop offset="1" stopColor="#e85d04" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#t15s)" />
    <St p={[10, 20, .6, 104, 14, .5, 20, 90, .5, 108, 80, .6, 16, 56, .4, 98, 50, .4]} f="#ffd86b" />
    <circle cx="60" cy="38" r="40" fill="url(#t15g)" />
    <path d="M60 18q-9 13 0 26q9-13 0-26z" fill="url(#t15f)" /><path d="M60 30q-3 6 0 12q3-6 0-12z" fill="#fff" opacity=".8" /><line x1="60" y1="44" x2="60" y2="48" stroke="#2b2b2b" strokeWidth="1" />
    <rect x="51" y="48" width="18" height="44" fill="url(#t15w)" />
    <path d="M51 48h18v6q-3 6-5 0q-2 8-4 0q-3 10-5 0q-2 4-4 0z" fill="#fdf5e4" />
    <path d="M51 92Q36 112 58 122Q86 134 46 160H94Q114 128 68 114Q58 104 69 92Z" fill="url(#t15w)" />
    <path d="M56 100Q50 110 62 118Q80 128 64 150" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".6" />
    <g fill="#ffd28a" opacity=".55">{[[60, 110], [72, 126], [66, 140], [80, 150]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="4" ry="1" />)}</g>
    <g transform="translate(72 130)"><path d="M-5 0H5L3 3H-3Z" fill="#8a5a2b" /><line x1="0" y1="0" x2="0" y2="-6" stroke="#8a5a2b" strokeWidth=".8" /><path d="M0-6l3 3h-3z" fill="#fff" /></g>
    <g transform="translate(56 150)"><ellipse rx="3" ry="1.4" fill="#fff" /><circle cx="2.4" cy="-1.4" r="1.4" fill="#fff" /></g>
    <path d="M0 160V140Q20 132 40 146L44 160ZM120 160V136Q104 130 96 146V160Z" fill="#0b1320" />
  </Svg>],

  [16, 'กระจกที่สวมมงกุฎ', <Svg>
    <defs>
      <linearGradient id="t16w" x2="0" y2="1"><stop stopColor="#4a2e24" /><stop offset="1" stopColor="#2b1a14" /></linearGradient>
      <radialGradient id="t16m" cx=".4" cy=".35"><stop stopColor="#d6ecf3" /><stop offset="1" stopColor="#7aa3b3" /></radialGradient>
      <linearGradient id="t16f" x2="1" y2="1"><stop stopColor="#fff1a8" /><stop offset=".5" stopColor="#d4a24c" /><stop offset="1" stopColor="#8a6410" /></linearGradient>
      <radialGradient id="t16c"><stop stopColor="#ffe066" stopOpacity=".6" /><stop offset="1" stopColor="#ffe066" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#t16w)" />
    <g stroke="#5c3a2c" strokeWidth=".8" opacity=".6">{[20, 40, 60, 80, 100].map(x => <path key={x} d={`M${x} 0V160`} />)}</g>
    <g fill="#6b4434" opacity=".5">{Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${10 + (i % 5) * 24} ${16 + (i / 5 | 0) * 120}l3 4-3 4-3-4z`} />)}</g>
    <ellipse cx="60" cy="68" rx="34" ry="46" fill="url(#t16f)" /><ellipse cx="60" cy="68" rx="29" ry="41" fill="url(#t16m)" />
    <g fill="url(#t16f)"><circle cx="60" cy="22" r="5" /><circle cx="60" cy="114" r="4" /><path d="M54 18q6-10 12 0z" /></g>
    <path d="M38 104Q40 86 60 84Q80 86 82 104Q72 109 60 109Q48 109 38 104Z" fill="#46606b" /><circle cx="60" cy="68" r="12" fill="#46606b" />
    <circle cx="60" cy="52" r="14" fill="url(#t16c)" />
    <polygon points="48,58 50,46 55,52 60,42 65,52 70,46 72,58" fill="url(#t16f)" stroke="#8a6410" strokeWidth=".6" /><g fill="#e63946"><circle cx="60" cy="50" r="1.4" /></g><g fill="#3a86ff"><circle cx="52" cy="54" r="1" /><circle cx="68" cy="54" r="1" /></g>
    <path d="M38 36q6-10 18-12" stroke="#fff" strokeWidth="2.2" fill="none" opacity=".55" strokeLinecap="round" /><path d="M78 96q4-4 4-10" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".4" />
    <path d="M22 160Q24 138 60 134Q96 138 98 160Z" fill="#1e1410" /><circle cx="60" cy="124" r="15" fill="#1e1410" />
    <path d="M47 118q13-10 26 0" stroke="#3a2a22" strokeWidth="1" fill="none" />
    <rect x="96" y="120" width="8" height="40" fill="#3a2a22" /><path d="M100 120q-4-6 0-10q4 4 0 10z" fill="#ffb703" /><circle cx="100" cy="114" r="10" fill="url(#t16c)" />
  </Svg>],

  [17, 'จิ้งจอกที่ทางแยก', <Svg>
    <defs>
      <linearGradient id="t17s" x2="0" y2="1"><stop stopColor="#ffcb69" /><stop offset="1" stopColor="#f4a261" /></linearGradient>
      <linearGradient id="t17g" x2="0" y2="1"><stop stopColor="#d08c60" /><stop offset="1" stopColor="#9c6644" /></linearGradient>
      <linearGradient id="t17f" x2="1" y2="1"><stop stopColor="#f4a261" /><stop offset="1" stopColor="#d9622b" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#t17s)" />
    <circle cx="96" cy="30" r="12" fill="#fff3c4" opacity=".8" />
    <path d="M0 66L20 56L40 64L64 52L88 62L120 54V76H0Z" fill="#b5838d" opacity=".6" />
    <path d="M0 74Q60 64 120 74V160H0Z" fill="url(#t17g)" />
    <g fill="#bc6c25"><circle cx="12" cy="76" r="10" /><circle cx="24" cy="72" r="8" /><circle cx="104" cy="76" r="10" /><circle cx="114" cy="72" r="8" /></g><g fill="#e76f51"><circle cx="16" cy="70" r="4" /><circle cx="108" cy="70" r="4" /></g>
    <path d="M50 160L58 76H62L76 160Z" fill="#f3e3c3" /><path d="M58 92L0 82V90L57 100Z" fill="#f3e3c3" /><path d="M63 98L120 78V86L64 106Z" fill="#f3e3c3" />
    <g fill="#d4a373" opacity=".7">{[[62, 120], [60, 140], [66, 104], [30, 90], [90, 92]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.6" ry=".8" />)}</g>
    <rect x="82" y="54" width="3.4" height="58" fill="#6b4226" />
    <polygon points="68,58 96,58 100,63 96,68 68,68" fill="#a0522d" stroke="#6b4226" strokeWidth=".6" /><polygon points="98,72 70,72 66,77 70,82 98,82" fill="#8b4513" stroke="#6b4226" strokeWidth=".6" />
    <g stroke="#6b4226" strokeWidth=".5">{[72, 80, 88].map(x => <path key={x} d={`M${x} 60v6M${x} 74v6`} />)}</g>
    <path d="M34 136q-18 2-16-14q8 8 16 4z" fill="url(#t17f)" /><path d="M19 123q-2-5 3-7q1 5-1 8z" fill="#fff" />
    <ellipse cx="38" cy="128" rx="9" ry="12" fill="url(#t17f)" /><ellipse cx="38" cy="132" rx="5" ry="7" fill="#fff" opacity=".85" />
    <circle cx="38" cy="110" r="7" fill="url(#t17f)" /><polygon points="32,107 33,97 37,105" fill="#d9622b" /><polygon points="44,107 43,97 39,105" fill="#d9622b" /><polygon points="33,106 33.6,100 36,104" fill="#3a2a1a" /><polygon points="43,106 42.4,100 40,104" fill="#3a2a1a" />
    <path d="M38 113l-4 5h8z" fill="#fff" /><circle cx="38" cy="117" r="1" fill="#222" /><path d="M35 109q1-1 2 0M39 109q1-1 2 0" stroke="#222" strokeWidth=".8" fill="none" />
    <path d="M34 138v4M42 138v4" stroke="#3a2a1a" strokeWidth="2.2" strokeLinecap="round" />
  </Svg>],

  [18, 'นาฬิกาที่นกบินออกมา', <Svg>
    <defs>
      <linearGradient id="t18s" x2="0" y2="1"><stop stopColor="#e9ecef" /><stop offset="1" stopColor="#a9bccf" /></linearGradient>
      <radialGradient id="t18c" cx=".4" cy=".35"><stop stopColor="#fffdf6" /><stop offset="1" stopColor="#e8dcc4" /></radialGradient>
      <linearGradient id="t18r" x2="1" y2="1"><stop stopColor="#c9a227" /><stop offset="1" stopColor="#6b4c12" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#t18s)" />
    <g stroke="#cbd5e1" strokeWidth=".6">{[30, 60, 90, 120, 150].map(y => <path key={y} d={`M0 ${y}H120`} />)}</g>
    <circle cx="54" cy="96" r="38" fill="url(#t18r)" /><circle cx="54" cy="96" r="33" fill="url(#t18c)" />
    {Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return <line key={i} x1={54 + 28 * Math.cos(a)} y1={96 + 28 * Math.sin(a)} x2={54 + (i % 3 ? 30 : 32) * Math.cos(a)} y2={96 + (i % 3 ? 30 : 32) * Math.sin(a)} stroke="#3a2a1a" strokeWidth={i % 3 ? 1 : 2} />; })}
    <line x1="54" y1="96" x2="42" y2="80" stroke="#3a2a1a" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M54 96L62 88" stroke="#3a2a1a" strokeWidth="1.2" strokeDasharray="1 1.5" /><circle cx="54" cy="96" r="2.6" fill="#3a2a1a" />
    <path d="M30 70q8-10 22-12" stroke="#fff" strokeWidth="2" fill="none" opacity=".6" strokeLinecap="round" />
    {[[64, 84, .5], [72, 72, .7], [82, 58, .9], [92, 44, 1.1], [104, 28, 1.4], [96, 16, .9], [112, 46, .8]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><path d="M-7 0Q-3-6 0 0Q3-6 7 0" fill="none" stroke="#2b2d42" strokeWidth="1.6" strokeLinecap="round" /><circle cx="0" cy=".4" r=".9" fill="#2b2d42" /></g>)}
    <g fill="#2b2d42" opacity=".6"><path d="M70 92l2-1-1 2z" /><path d="M76 82l2-1-1 2z" /></g>
    <rect x="50" y="134" width="8" height="4" fill="url(#t18r)" /><path d="M36 136l-6 10M72 136l6 10" stroke="url(#t18r)" strokeWidth="3" strokeLinecap="round" />
    <rect y="146" width="120" height="14" fill="#8d99ae" />
  </Svg>],
];
