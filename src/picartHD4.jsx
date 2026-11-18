// ภาพการ์ดแบบละเอียด ชุด 4 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;

export const HD4 = [
  [30, 'เกาะรูปกุญแจ', <Svg>
    <defs>
      <radialGradient id="n30w" cx=".5" cy=".45" r=".8"><stop stopColor="#48cae4" /><stop offset=".6" stopColor="#0096c7" /><stop offset="1" stopColor="#023e8a" /></radialGradient>
      <linearGradient id="n30g" x2="1" y2="1"><stop stopColor="#80b918" /><stop offset="1" stopColor="#2b9348" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#n30w)" />
    <g stroke="#ade8f4" strokeWidth=".7" fill="none" opacity=".6">{[[14, 20], [96, 14], [100, 140], [18, 120], [90, 80], [20, 70]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q4-2 8 0t8 0`} />)}</g>
    <g fill="#90e0ef" opacity=".55"><circle cx="60" cy="42" r="31" /><rect x="48" y="62" width="24" height="84" rx="8" /><rect x="60" y="100" width="30" height="20" rx="6" /><rect x="60" y="120" width="24" height="18" rx="6" /></g>
    <g fill="#f2d49b"><circle cx="60" cy="42" r="26" /><rect x="52" y="62" width="16" height="80" rx="5" /><rect x="64" y="104" width="22" height="12" rx="4" /><rect x="64" y="122" width="16" height="12" rx="4" /></g>
    <g fill="url(#n30g)"><circle cx="60" cy="42" r="21" /><rect x="55.5" y="62" width="9" height="74" rx="3" /><rect x="64" y="106.5" width="18" height="7" rx="2.5" /><rect x="64" y="124.5" width="12" height="7" rx="2.5" /></g>
    <circle cx="60" cy="42" r="10" fill="#f2d49b" /><circle cx="60" cy="42" r="8" fill="#48cae4" /><circle cx="58" cy="40" r="2" fill="#caf0f8" opacity=".7" />
    <g fill="#1b4332">{[[46, 30], [72, 28], [76, 52], [44, 54], [60, 22], [58, 80], [60, 96], [74, 110]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="2.6" /><circle cx={x + 1.6} cy={y - 1.6} r="1.8" fill="#40916c" /></g>)}</g>
    <g><rect x="56" y="70" width="5" height="4" fill="#e76f51" /><polygon points="55,70 58.5,67 62,70" fill="#6b4226" /></g>
    <path d="M60 140l-2 6M60 142l3 5" stroke="#6b4226" strokeWidth=".8" />
    <g transform="translate(26 102) rotate(-30)"><path d="M-5 0H5L3 3H-3Z" fill="#fff" /><path d="M0 0v-6l4 5z" fill="#ffd166" /></g><path d="M22 106Q14 116 10 130" stroke="#caf0f8" strokeWidth="1.2" fill="none" opacity=".8" />
    <g transform="translate(96 64)"><ellipse rx="6" ry="2.4" fill="#023e8a" opacity=".6" /><path d="M-4 0q-6-6-4-10" stroke="#023e8a" strokeWidth="1.4" fill="none" opacity=".6" /></g>
  </Svg>],

  [75, 'กระปุกออมสินแตกมีต้นไม้งอก', <Svg>
    <defs>
      <linearGradient id="n75s" x2="0" y2="1"><stop stopColor="#fff1e6" /><stop offset="1" stopColor="#fde2e4" /></linearGradient>
      <linearGradient id="n75p" x2="0" y2="1"><stop stopColor="#ffc2d6" /><stop offset="1" stopColor="#f78fb3" /></linearGradient>
      <linearGradient id="n75c" x2="0" y2="1"><stop stopColor="#ffe066" /><stop offset="1" stopColor="#d4a017" /></linearGradient>
      <radialGradient id="n75l" cx=".2" cy="0"><stop stopColor="#fff8d6" stopOpacity=".9" /><stop offset="1" stopColor="#fff8d6" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#n75s)" /><rect width="120" height="160" fill="url(#n75l)" />
    <rect y="124" width="120" height="36" fill="#c9a27e" /><path d="M0 124h120" stroke="#e0bf9c" strokeWidth="1.5" /><path d="M0 136h120M0 148h120" stroke="#b08a66" strokeWidth=".5" />
    <ellipse cx="58" cy="126" rx="38" ry="5" fill="#8a6a4a" opacity=".3" />
    <path d="M24 102Q24 78 52 76Q60 76 66 78L60 90L66 96L58 104L66 110L60 122H40Q24 118 24 102Z" fill="url(#n75p)" />
    <path d="M72 80Q92 84 94 102Q94 118 74 122H66L72 112L64 104L72 96L66 88Z" fill="url(#n75p)" transform="translate(4 4) rotate(8 80 100)" />
    <path d="M30 92q10-12 26-12" stroke="#ffe0ea" strokeWidth="2" fill="none" opacity=".8" />
    <rect x="34" y="118" width="7" height="8" rx="2" fill="#f78fb3" /><rect x="50" y="118" width="7" height="8" rx="2" fill="#f78fb3" />
    <ellipse cx="96" cy="110" rx="6" ry="5" fill="#f06595" transform="rotate(8 80 100)" /><circle cx="94" cy="109" r="1" fill="#a61e4d" /><circle cx="98" cy="109" r="1" fill="#a61e4d" />
    <circle cx="82" cy="98" r="1.5" fill="#333" /><path d="M78 84l4-6 2 7" fill="#f78fb3" />
    <path d="M38 80l6-6 2 7" fill="#f78fb3" /><path d="M44 78h14" stroke="#c2255c" strokeWidth="2" strokeLinecap="round" />
    <path d="M66 100Q64 72 68 54" stroke="#55a630" strokeWidth="2.2" fill="none" /><path d="M67 76q-14-10-20 2q10 6 20-2z" fill="#80b918" /><path d="M67 64q14-12 22-2q-10 6-22 2z" fill="#80b918" /><path d="M68 54q-6-10 0-16q6 6 0 16z" fill="#a7c957" />
    <path d="M67 76q-8-3-14 0M67 64q8-4 16-2" stroke="#55a630" strokeWidth=".6" fill="none" />
    <g>{[[20, 134], [90, 138], [104, 130], [40, 144], [78, 146]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="5" ry="2" fill="#b08a12" /><ellipse cx={x} cy={y - .8} rx="5" ry="2" fill="url(#n75c)" /><ellipse cx={x - 1} cy={y - 1.2} rx="2" ry=".6" fill="#fff8c8" /></g>)}</g>
    <g fill="#f78fb3"><path d="M60 128l4-3 1 4z" /><path d="M70 130l3 1-2 3z" /></g>
  </Svg>],

  [109, 'ชามแตกต่อด้วยทอง', <Svg>
    <defs>
      <linearGradient id="n109s" x2="0" y2="1"><stop stopColor="#1a1a2e" /><stop offset="1" stopColor="#2d2a4a" /></linearGradient>
      <linearGradient id="n109b" x2="1" y2="0"><stop stopColor="#c9c3b8" /><stop offset=".35" stopColor="#f4f1ea" /><stop offset="1" stopColor="#a8a196" /></linearGradient>
      <linearGradient id="n109i" x2="0" y2="1"><stop stopColor="#2b3a55" /><stop offset="1" stopColor="#4a6290" /></linearGradient>
      <linearGradient id="n109g" x2="1" y2="1"><stop stopColor="#fff1a8" /><stop offset=".5" stopColor="#e9c46a" /><stop offset="1" stopColor="#b8862b" /></linearGradient>
      <radialGradient id="n109l"><stop stopColor="#f9d77e" stopOpacity=".35" /><stop offset="1" stopColor="#f9d77e" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#n109s)" />
    <circle cx="60" cy="88" r="56" fill="url(#n109l)" />
    <path d="M0 118H120V160H0Z" fill="#3b2f2a" /><path d="M0 118h120" stroke="#5a4840" strokeWidth="1.2" />
    <ellipse cx="60" cy="122" rx="34" ry="5" fill="#000" opacity=".4" />
    <path d="M16 66H104Q102 112 60 118Q18 112 16 66Z" fill="url(#n109b)" />
    <ellipse cx="60" cy="66" rx="44" ry="10" fill="url(#n109i)" /><ellipse cx="60" cy="66" rx="44" ry="10" fill="none" stroke="#e8e2d6" strokeWidth="1.6" />
    <path d="M26 78Q60 92 94 78" stroke="#2b3a55" strokeWidth="1.2" fill="none" opacity=".7" /><g fill="#2b3a55" opacity=".7">{[34, 46, 60, 74, 86].map(x => <path key={x} d={`M${x} ${84 + Math.abs(60 - x) * -.1}l2-4 2 4-2 3z`} />)}</g>
    <path d="M44 66L50 80L44 94L54 108L50 117M78 70L70 84L80 98L74 110M50 80L70 84" stroke="url(#n109g)" strokeWidth="2.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M44 66L50 80L44 94L54 108M78 70L70 84L80 98" stroke="#fff6c8" strokeWidth=".6" fill="none" opacity=".8" />
    <g fill="#e9c46a"><circle cx="50" cy="80" r="1.4" /><circle cx="70" cy="84" r="1.4" /></g>
    <path d="M22 74Q24 92 36 104" stroke="#fff" strokeWidth="2" fill="none" opacity=".45" strokeLinecap="round" />
    <path d="M52 118h16l-2 4h-12z" fill="#a8a196" />
    <g fill="#fff6c8">{[[30, 40, .9], [92, 34, .7], [100, 52, .6], [18, 52, .6]].map(([x, y, r], i) => <path key={i} d={`M${x} ${y - 3 * r}L${x + r} ${y}L${x} ${y + 3 * r}L${x - r} ${y}Z`} />)}</g>
  </Svg>],

  [100, 'เงาที่จับมือกัน', <Svg>
    <defs>
      <linearGradient id="n100s" x2="0" y2="1"><stop stopColor="#ff9f68" /><stop offset=".55" stopColor="#ffcb77" /><stop offset="1" stopColor="#fbe3b8" /></linearGradient>
      <linearGradient id="n100g" x2="0" y2="1"><stop stopColor="#e9b384" /><stop offset="1" stopColor="#d18c5c" /></linearGradient>
      <radialGradient id="n100u"><stop stopColor="#fff3c4" /><stop offset=".45" stopColor="#ffe08a" stopOpacity=".7" /><stop offset="1" stopColor="#ffe08a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#n100s)" />
    <circle cx="60" cy="70" r="36" fill="url(#n100u)" /><circle cx="60" cy="70" r="13" fill="#fff6d6" />
    <path d="M0 84L20 76L40 82L60 74L80 82L100 76L120 84V92H0Z" fill="#c56a4a" opacity=".6" />
    <path d="M0 90H120V160H0Z" fill="url(#n100g)" />
    <path d="M30 116L4 160H22L40 116ZM90 116L116 160H98L80 116Z" fill="#6d2e46" opacity=".32" />
    <path d="M38 118Q60 152 82 118" stroke="#6d2e46" strokeWidth="5" fill="none" opacity=".32" strokeLinecap="round" />
    <path d="M52 140q8 4 16 0" stroke="#6d2e46" strokeWidth="4" fill="none" opacity=".25" />
    <g fill="#3d1a2a"><circle cx="32" cy="78" r="6" /><path d="M26 86q6-3 12 0l2 20h-16z" /><path d="M27 106l-1 12M37 106l1 12" stroke="#3d1a2a" strokeWidth="3.4" strokeLinecap="round" /><path d="M26 88l-3 14M38 88l2 14" stroke="#3d1a2a" strokeWidth="2.6" strokeLinecap="round" /></g>
    <path d="M24 74q8-6 16 0q-2-6-8-6q-6 0-8 6z" fill="#3d1a2a" /><path d="M24 76q-2 6 2 10" stroke="#3d1a2a" strokeWidth="2" fill="none" />
    <g fill="#3d1a2a"><circle cx="88" cy="74" r="6.5" /><path d="M82 82q6-3 12 0l2 24h-16z" /><path d="M83 106l-1 12M93 106l1 12" stroke="#3d1a2a" strokeWidth="3.6" strokeLinecap="round" /><path d="M82 84l-3 16M94 84l3 16" stroke="#3d1a2a" strokeWidth="2.8" strokeLinecap="round" /></g>
    <g fill="#2a0f1c"><path d="M28 118h7v2h-8zM85 118h7v2h-8z" /></g>
    <g fill="#fff" opacity=".7"><path d="M14 30q3-3 6 0q-3 1-6 0z" /><path d="M22 24q2-2 4 0q-2 1-4 0z" /></g>
  </Svg>],

  [118, 'ช้างเมฆโปรยฝน', <Svg>
    <defs>
      <linearGradient id="n118s" x2="0" y2="1"><stop stopColor="#f6bd60" /><stop offset=".6" stopColor="#f5cac3" /><stop offset="1" stopColor="#f7ede2" /></linearGradient>
      <linearGradient id="n118c" x2="0" y2="1"><stop stopColor="#ffffff" /><stop offset="1" stopColor="#c9d6e3" /></linearGradient>
      <linearGradient id="n118g" x2="0" y2="1"><stop stopColor="#d4a373" /><stop offset="1" stopColor="#a0673a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#n118s)" />
    <circle cx="20" cy="22" r="10" fill="#fff6d6" opacity=".8" />
    <g fill="url(#n118c)"><ellipse cx="56" cy="46" rx="34" ry="20" /><circle cx="34" cy="38" r="13" /><circle cx="54" cy="28" r="15" /><circle cx="74" cy="32" r="13" /><circle cx="88" cy="38" r="15" /><circle cx="26" cy="52" r="9" /></g>
    <path d="M100 42q12 8 6 22q-3 6 3 8" stroke="url(#n118c)" strokeWidth="7" fill="none" strokeLinecap="round" />
    <ellipse cx="80" cy="42" rx="9" ry="13" fill="#dfe7ef" /><path d="M76 36q4 6 2 14" stroke="#c9d6e3" fill="none" />
    <circle cx="92" cy="34" r="1.8" fill="#4a4e69" /><circle cx="92.6" cy="33.4" r=".5" fill="#fff" /><path d="M96 46q4 2 6-2" stroke="#c9d6e3" fill="none" />
    <path d="M104 26l4-6M100 24l1-6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
    <g fill="url(#n118c)"><rect x="34" y="60" width="9" height="12" rx="4" /><rect x="50" y="62" width="9" height="12" rx="4" /><rect x="66" y="62" width="9" height="12" rx="4" /></g>
    <path d="M24 54q-8 2-10 8" stroke="url(#n118c)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <g stroke="#4cc9f0" strokeWidth="1.3" strokeLinecap="round" opacity=".85">{[[36, 78], [44, 82], [52, 80], [60, 86], [68, 80], [76, 84], [108, 76], [112, 84], [40, 94], [56, 98], [72, 96]].map(([x, y], i) => <line key={i} x1={x} y1={y} x2={x - 1.5} y2={y + 7} />)}</g>
    <path d="M0 116L18 110L34 118L52 108L70 116L88 110L106 116L120 112V160H0Z" fill="url(#n118g)" />
    <g stroke="#7a4a24" strokeWidth=".8" fill="none">{[[10, 124, 24, 132, 18, 140], [40, 128, 52, 136], [80, 126, 70, 138, 84, 146], [96, 140, 110, 136], [30, 146, 44, 152]].map((p, i) => <polyline key={i} points={p.join(' ')} />)}</g>
    <ellipse cx="60" cy="122" rx="14" ry="3" fill="#4cc9f0" opacity=".5" />
    <path d="M60 120v-12M60 112q-7-5-10 0q5 4 10 0M60 110q7-5 10 0q-5 4-10 0" stroke="#55a630" strokeWidth="1.3" fill="#80b918" />
    <g fill="#80b918"><path d="M22 118q-2-6 2-8q1 4-2 8z" /><path d="M96 118q2-6-2-8q-1 4 2 8z" /></g>
  </Svg>],

  [192, 'คนใส่โหลปลาเป็นหมวก', <Svg>
    <defs>
      <linearGradient id="n192s" x2="0" y2="1"><stop stopColor="#8d99ae" /><stop offset="1" stopColor="#c9ced6" /></linearGradient>
      <radialGradient id="n192b" cx=".35" cy=".3"><stop stopColor="#e0fbfc" stopOpacity=".6" /><stop offset=".8" stopColor="#90e0ef" stopOpacity=".35" /><stop offset="1" stopColor="#caf0f8" stopOpacity=".8" /></radialGradient>
      <linearGradient id="n192c" x2="0" y2="1"><stop stopColor="#3d405b" /><stop offset="1" stopColor="#22223b" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#n192s)" />
    <g fill="#6c757d"><rect x="0" y="30" width="24" height="130" /><rect x="96" y="20" width="24" height="140" /></g>
    <g fill="#adb5bd" opacity=".7">{Array.from({ length: 12 }, (_, i) => <rect key={i} x={i % 2 ? 13 : 4} y={38 + (i / 2 | 0) * 18} width="6" height="9" />)}{Array.from({ length: 12 }, (_, i) => <rect key={'r' + i} x={i % 2 ? 110 : 100} y={28 + (i / 2 | 0) * 18} width="6" height="9" />)}</g>
    <g fill="#495057"><rect x="24" y="60" width="16" height="100" /><rect x="80" y="50" width="16" height="110" /></g>
    <g stroke="#adb5bd" strokeWidth=".5" opacity=".6">{Array.from({ length: 16 }, (_, i) => <line key={i} x1={8 + i * 7} y1="0" x2={4 + i * 7} y2="14" />)}</g>
    <rect y="142" width="120" height="18" fill="#495057" /><path d="M0 142h120" stroke="#6c757d" />
    <ellipse cx="60" cy="150" rx="30" ry="3" fill="#8d99ae" opacity=".5" />
    <g fill="#343a40" opacity=".6"><circle cx="16" cy="118" r="4" /><path d="M12 122h8v20h-8z" /><circle cx="104" cy="114" r="4" /><path d="M100 118h8v24h-8z" /><path d="M96 112Q104 104 112 112Z" /></g>
    <path d="M46 142L48 108H72L74 142Z" fill="url(#n192c)" /><path d="M44 108H76L72 86Q60 82 48 86Z" fill="url(#n192c)" /><path d="M60 86v22" stroke="#22223b" strokeWidth=".6" /><path d="M56 86l4 8 4-8" fill="#f8f9fa" />
    <path d="M48 92L40 112M72 92L80 106" stroke="url(#n192c)" strokeWidth="5" strokeLinecap="round" /><circle cx="40" cy="113" r="2.4" fill="#f1c27d" /><path d="M80 106h8v8h-8z" fill="#6b4226" transform="rotate(10 84 110)" />
    <circle cx="60" cy="64" r="20" fill="url(#n192b)" stroke="#e0fbfc" strokeWidth="1.2" /><path d="M42 58Q60 52 78 58" stroke="#caf0f8" fill="none" strokeWidth=".8" />
    <ellipse cx="60" cy="68" rx="7" ry="8" fill="#f1c27d" /><path d="M53 64q7-7 14 0q-2-6-7-6t-7 6z" fill="#5a3e2b" /><circle cx="57.5" cy="68" r=".9" fill="#222" /><circle cx="62.5" cy="68" r=".9" fill="#222" /><path d="M58 72q2 1 4 0" stroke="#a24a3a" strokeWidth=".7" fill="none" />
    <g transform="translate(70 56)"><path d="M-5 0q5-4 10 0q-5 4-10 0zM5 0l3-2.5v5z" fill="#f77f00" /><circle cx="-2.6" cy="-.4" r=".6" fill="#222" /></g>
    <g fill="#fff" opacity=".85"><circle cx="66" cy="50" r="1" /><circle cx="68" cy="46" r=".7" /></g><path d="M46 54q4-8 12-10" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".7" strokeLinecap="round" />
  </Svg>],

  [79, 'ไอน้ำมังกรจากชามก๋วยเตี๋ยว', <Svg>
    <defs>
      <linearGradient id="n79s" x2="0" y2="1"><stop stopColor="#fff3e0" /><stop offset="1" stopColor="#ffe0b2" /></linearGradient>
      <linearGradient id="n79b" x2="1" y2="0"><stop stopColor="#9d0208" /><stop offset=".4" stopColor="#e63946" /><stop offset="1" stopColor="#9d0208" /></linearGradient>
      <linearGradient id="n79t" x2="0" y2="1"><stop stopColor="#8d5524" /><stop offset="1" stopColor="#5e3a1a" /></linearGradient>
      <linearGradient id="n79d" x2="0" y2="1"><stop stopColor="#fff" stopOpacity=".95" /><stop offset="1" stopColor="#fff" stopOpacity=".3" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#n79s)" />
    <g fill="#e9c46a" opacity=".35"><circle cx="18" cy="18" r="12" /><rect x="96" y="6" width="20" height="30" rx="2" /></g>
    <path d="M0 120H120V160H0Z" fill="url(#n79t)" /><path d="M0 120h120" stroke="#a87442" strokeWidth="1.5" />
    <path d="M44 86Q30 72 40 58Q50 46 44 34Q40 24 50 16Q58 10 66 14" stroke="url(#n79d)" strokeWidth="7" fill="none" strokeLinecap="round" />
    <path d="M44 86Q30 72 40 58Q50 46 44 34Q40 24 50 16Q58 10 66 14" stroke="#d6dde4" strokeWidth="1" fill="none" strokeDasharray="1 3" opacity=".9" />
    <g fill="#fff" opacity=".95"><path d="M64 10L74 6L72 12L80 12L72 17L66 18Z" /><path d="M66 10l-2-6 4 4zM70 9l1-6 2 5z" /></g>
    <circle cx="69" cy="12" r="1" fill="#555" /><path d="M78 14q4 0 6 3M78 15q4 2 4 6" stroke="#d6dde4" strokeWidth=".6" fill="none" />
    <g fill="#fff" opacity=".8"><path d="M38 60l-6-2 5 5zM42 40l-6-3 6 6zM48 22l-6-2 5 5z" /></g>
    <path d="M72 84Q82 70 74 56Q70 48 76 40" stroke="#fff" strokeWidth="3" fill="none" opacity=".5" strokeLinecap="round" />
    <path d="M18 92H102Q100 124 60 128Q20 124 18 92Z" fill="url(#n79b)" />
    <path d="M24 104h72" stroke="#ffd166" strokeWidth="1.6" strokeDasharray="5 2 1 2" /><g fill="#ffd166">{[36, 60, 84].map(x => <circle key={x} cx={x} cy="114" r="2" />)}</g>
    <ellipse cx="60" cy="92" rx="42" ry="8" fill="#f4a261" /><ellipse cx="60" cy="92" rx="42" ry="8" fill="none" stroke="#9d0208" strokeWidth="1.5" />
    <g stroke="#ffe8a3" strokeWidth="1.3" fill="none">{[0, 1, 2, 3, 4].map(i => <path key={i} d={`M${26 + i * 3} ${92 + (i % 2)}q6-4 12 0t12 0t12 0t12 0`} />)}</g>
    <g><circle cx="44" cy="90" r="5" fill="#fff" /><circle cx="44" cy="90" r="2.6" fill="#ffb703" /><path d="M70 88l10 2-2 3-10-2z" fill="#e76f51" /><path d="M54 94h12" stroke="#52b788" strokeWidth="2.4" strokeLinecap="round" /><g fill="#52b788"><circle cx="80" cy="96" r="1.5" /><circle cx="36" cy="96" r="1.3" /></g></g>
    <path d="M84 76L108 104M90 74L112 102" stroke="#6b4226" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M40 128h40l-4 4H44Z" fill="#6a040f" />
    <ellipse cx="60" cy="134" rx="30" ry="3" fill="#000" opacity=".25" />
  </Svg>],

  [70, 'มงกุฎในถังขยะ', <Svg>
    <defs>
      <linearGradient id="n70s" x2="0" y2="1"><stop stopColor="#3a3a52" /><stop offset="1" stopColor="#5a5a74" /></linearGradient>
      <linearGradient id="n70b" x2="1" y2="0"><stop stopColor="#495057" /><stop offset=".45" stopColor="#8d99ae" /><stop offset="1" stopColor="#495057" /></linearGradient>
      <linearGradient id="n70c" x2="1" y2="1"><stop stopColor="#fff1a8" /><stop offset=".5" stopColor="#ffd60a" /><stop offset="1" stopColor="#c99700" /></linearGradient>
      <radialGradient id="n70l" cx=".5" cy="0"><stop stopColor="#ffe8a3" stopOpacity=".7" /><stop offset="1" stopColor="#ffe8a3" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#n70s)" />
    <g fill="#4a4a64" stroke="#3a3a52" strokeWidth=".8">{Array.from({ length: 24 }, (_, i) => <rect key={i} x={(i % 4) * 30 + ((i / 4 | 0) % 2) * 15 - 15} y={(i / 4 | 0) * 14} width="30" height="14" />)}</g>
    <path d="M40 0H80L100 140H20Z" fill="url(#n70l)" />
    <path d="M58 0v8" stroke="#222" /><path d="M52 8h12l2 4h-16z" fill="#222" /><circle cx="58" cy="13" r="2" fill="#fff8d6" />
    <rect y="136" width="120" height="24" fill="#2b2b3a" /><path d="M10 142q6 4 14 0M80 150q6 3 12 0" stroke="#5a5a74" fill="none" />
    <path d="M28 94H76L72 140H32Z" fill="url(#n70b)" /><g stroke="#343a40" strokeWidth=".8">{[38, 46, 54, 62, 70].map(x => <line key={x} x1={x} y1="96" x2={x - .4} y2="138" />)}</g>
    <g transform="rotate(-10 52 90)"><rect x="22" y="86" width="56" height="7" rx="2.5" fill="#6c757d" /><rect x="46" y="82" width="10" height="4" rx="1.5" fill="#495057" /></g>
    <g fill="#adb5bd"><path d="M34 92l4-8 6 6z" fill="#e9ecef" /><path d="M66 90l6-6 2 8z" fill="#ced4da" /></g>
    <path d="M38 88L40 70L48 80L54 64L60 80L68 70L70 88Z" fill="url(#n70c)" stroke="#a87c00" strokeWidth=".8" transform="rotate(-8 54 80)" />
    <g transform="rotate(-8 54 80)"><circle cx="54" cy="76" r="2.4" fill="#e63946" /><circle cx="44" cy="82" r="1.5" fill="#3a86ff" /><circle cx="64" cy="82" r="1.5" fill="#3a86ff" /><path d="M40 86h30" stroke="#fff8c8" strokeWidth=".8" /></g>
    <g fill="#fff8c8"><path d="M76 66l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" /><path d="M34 62l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" /></g>
    <g fill="#1d1d26"><ellipse cx="92" cy="130" rx="11" ry="8" /><circle cx="84" cy="118" r="7" /><polygon points="78,115 79,106 84,113" /><polygon points="90,115 89,106 84,113" /><path d="M102 132q10-2 8-14" stroke="#1d1d26" strokeWidth="3" fill="none" strokeLinecap="round" /></g>
    <ellipse cx="81.5" cy="118" rx="1.4" ry="1.8" fill="#ffd60a" /><ellipse cx="86.5" cy="118" rx="1.4" ry="1.8" fill="#ffd60a" />
    <path d="M14 130l8-2 2 6-8 2z" fill="#e9ecef" opacity=".6" /><path d="M96 140l6 1-2 4z" fill="#e63946" opacity=".6" />
  </Svg>],
];
