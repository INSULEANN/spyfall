// ภาพการ์ดแบบละเอียด ชุด 12 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;
const Fl = ({ x, y, s = 1, c = '#ff6fa3', m = '#ffd84d' }) => <g transform={`translate(${x} ${y}) scale(${s})`}>{[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx="0" cy="-4.4" rx="2.8" ry="4" fill={c} transform={`rotate(${a})`} />)}<circle r="2.4" fill={m} /></g>;

export const HD12 = [
  [39, 'ประตูกลางทะเลทราย', <Svg>
    <defs>
      <linearGradient id="w39s" x2="0" y2="1"><stop stopColor="#ff9e6d" /><stop offset=".5" stopColor="#ffcf8b" /><stop offset="1" stopColor="#ffe8b6" /></linearGradient>
      <linearGradient id="w39d" x2="0" y2="1"><stop stopColor="#f4a259" /><stop offset="1" stopColor="#c76b33" /></linearGradient>
      <linearGradient id="w39i" x2="0" y2="1"><stop stopColor="#4cc9f0" /><stop offset=".6" stopColor="#a9def9" /><stop offset=".61" stopColor="#80b918" /><stop offset="1" stopColor="#2b9348" /></linearGradient>
      <linearGradient id="w39w" x2="1" y2="0"><stop stopColor="#5a3417" /><stop offset=".5" stopColor="#8b5a2b" /><stop offset="1" stopColor="#4a2a10" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#w39s)" />
    <circle cx="96" cy="30" r="13" fill="#fff3c4" />
    <path d="M0 108Q30 94 60 106T120 100V160H0Z" fill="#e8925a" /><path d="M0 128Q40 112 80 130T120 122V160H0Z" fill="url(#w39d)" />
    <g stroke="#b85a24" strokeWidth=".6" fill="none" opacity=".6"><path d="M4 140q10-3 20 0M60 146q10-3 20 0M88 134q8-2 16 0" /></g>
    <polygon points="40,126 68,126 120,152 120,160 76,160" fill="#7a3b14" opacity=".25" />
    <rect x="38" y="58" width="32" height="68" fill="url(#w39w)" />
    <rect x="42" y="62" width="24" height="64" fill="url(#w39i)" />
    <Cl x={52} y={76} s={.35} /><circle cx="60" cy="72" r="3" fill="#fff8b0" />
    <path d="M42 104Q54 98 66 102" stroke="#55a630" strokeWidth="1" fill="none" /><g fill="#ff6fa3">{[[46, 110], [56, 116], [62, 108]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" />)}</g>
    <path d="M42 126L30 160H78L66 126Z" fill="#a7c957" opacity=".25" />
    <polygon points="66,62 82,67 82,130 66,126" fill="url(#w39w)" /><path d="M70 72v48M76 74v48" stroke="#3a1f08" strokeWidth=".6" /><circle cx="78" cy="98" r="1.6" fill="#f2c14e" />
    <path d="M14 142l4-14 4 14M10 136h16" stroke="#6b3a14" strokeWidth="1.4" fill="none" opacity=".7" />
    <g transform="translate(20 116)" fill="#2a9d8f"><rect x="-1.6" y="-14" width="3.2" height="14" rx="1.6" /><path d="M-1.6-8h-4v-5M1.6-6h4v-6" stroke="#2a9d8f" strokeWidth="2.4" fill="none" strokeLinecap="round" /></g>
  </Svg>],

  [40, 'หมีกอดรังผึ้ง', <Svg>
    <defs>
      <linearGradient id="w40s" x2="0" y2="1"><stop stopColor="#fff3b0" /><stop offset="1" stopColor="#a3d977" /></linearGradient>
      <linearGradient id="w40t" x2="1" y2="0"><stop stopColor="#5e3a22" /><stop offset=".5" stopColor="#8b5a3a" /><stop offset="1" stopColor="#4a2c18" /></linearGradient>
      <radialGradient id="w40h" cx=".4" cy=".3"><stop stopColor="#ffe066" /><stop offset="1" stopColor="#d48c00" /></radialGradient>
      <radialGradient id="w40b" cx=".4" cy=".3"><stop stopColor="#b07a4a" /><stop offset="1" stopColor="#6b4226" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#w40s)" />
    <g fill="#80b918" opacity=".7"><circle cx="100" cy="10" r="22" /><circle cx="70" cy="2" r="16" /></g>
    <rect x="76" y="0" width="18" height="160" fill="url(#w40t)" /><g stroke="#3a2010" strokeWidth=".8" fill="none">{[20, 50, 90, 130].map(y => <path key={y} d={`M80 ${y}q4 6 0 12M88 ${y + 10}q-3 6 0 10`} />)}</g>
    <path d="M76 36H42Q38 36 38 40" stroke="url(#w40t)" strokeWidth="6" fill="none" strokeLinecap="round" /><path d="M48 39v5" stroke="#4a2c18" strokeWidth="1.4" />
    <ellipse cx="48" cy="60" rx="13" ry="16" fill="url(#w40h)" /><g stroke="#b06f00" strokeWidth="1.2" fill="none"><path d="M36 52q12 4 24 0M35 60q13 4 26 0M36 68q12 4 24 0" /></g><ellipse cx="48" cy="72" rx="3" ry="2.4" fill="#3a2010" />
    <path d="M44 76q-1 6 2 8" stroke="#ffb703" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity=".9" />
    <path d="M0 140Q60 132 120 142V160H0Z" fill="#55a630" />
    <ellipse cx="52" cy="118" rx="25" ry="31" fill="url(#w40b)" /><ellipse cx="52" cy="124" rx="15" ry="20" fill="#c49a6c" opacity=".7" />
    <circle cx="50" cy="82" r="15" fill="url(#w40b)" /><circle cx="38" cy="70" r="5.6" fill="url(#w40b)" /><circle cx="62" cy="70" r="5.6" fill="url(#w40b)" /><circle cx="38" cy="70" r="2.8" fill="#c49a6c" /><circle cx="62" cy="70" r="2.8" fill="#c49a6c" />
    <ellipse cx="48" cy="88" rx="7" ry="5" fill="#d9b38c" /><ellipse cx="48" cy="85.6" rx="2.4" ry="1.8" fill="#222" /><path d="M48 88v2M45 91q3 2 6 0" stroke="#222" strokeWidth=".8" fill="none" />
    <path d="M41 79q2-2 4 0M51 79q2-2 4 0" stroke="#222" strokeWidth="1.1" fill="none" strokeLinecap="round" /><circle cx="40" cy="86" r="2" fill="#ff8fa3" opacity=".6" /><circle cx="58" cy="86" r="2" fill="#ff8fa3" opacity=".6" />
    <path d="M32 104Q36 78 50 74" stroke="url(#w40b)" strokeWidth="9" fill="none" strokeLinecap="round" /><path d="M70 106Q74 90 76 86" stroke="url(#w40b)" strokeWidth="8" fill="none" strokeLinecap="round" />
    <ellipse cx="40" cy="146" rx="9" ry="5" fill="url(#w40b)" /><ellipse cx="64" cy="146" rx="9" ry="5" fill="url(#w40b)" />
    {[[26, 46], [66, 48], [22, 64], [64, 30], [30, 32], [104, 70]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="3" ry="2.2" fill="#ffd60a" /><path d={`M${x - 1} ${y - 2}v4M${x + 1} ${y - 2}v4`} stroke="#222" strokeWidth=".9" /><ellipse cx={x - .6} cy={y - 2.6} rx="2" ry="1.3" fill="#fff" opacity=".85" /><path d={`M${x + 3} ${y}l1.4 0`} stroke="#222" strokeWidth=".6" /></g>)}
    <path d="M26 46q8-6 10 4M66 48q-4-8 4-12" stroke="#222" strokeWidth=".4" strokeDasharray="1 1.5" fill="none" />
  </Svg>],

  [42, 'หุ่นยนต์รดน้ำต้นไม้', <Svg>
    <defs>
      <linearGradient id="w42s" x2="0" y2="1"><stop stopColor="#e0f7fa" /><stop offset="1" stopColor="#b2ebf2" /></linearGradient>
      <linearGradient id="w42m" x2="1" y2="0"><stop stopColor="#90a4ae" /><stop offset=".45" stopColor="#eceff1" /><stop offset="1" stopColor="#78909c" /></linearGradient>
      <linearGradient id="w42g" x2="0" y2="1"><stop stopColor="#9e9e9e" /><stop offset="1" stopColor="#616161" /></linearGradient>
      <radialGradient id="w42e"><stop stopColor="#e0ffff" /><stop offset=".5" stopColor="#26c6da" /><stop offset="1" stopColor="#00838f" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#w42s)" />
    <g fill="#cfd8dc"><rect x="0" y="60" width="20" height="72" /><rect x="96" y="44" width="24" height="88" /></g><g fill="#eceff1">{[[4, 66], [12, 80], [100, 50], [108, 64], [100, 90]].map(([x, y], i) => <rect key={i} x={x} y={y} width="4" height="5" />)}</g>
    <rect y="130" width="120" height="30" fill="url(#w42g)" /><g stroke="#4a4a4a" strokeWidth=".7"><path d="M0 140h120M40 130v30M80 130v30" /></g>
    <path d="M86 130l3 6-3 4 4 6 2 4" stroke="#424242" fill="none" strokeWidth="1.2" />
    <path d="M88 130q0-12 2-20" stroke="#43a047" strokeWidth="1.8" fill="none" /><path d="M89 120q-7-5-10 0q5 4 10 0zM90 116q7-5 10 0q-5 4-10 0z" fill="#66bb6a" />
    <Fl x={91} y={106} s={.9} c="#ff7043" />
    <rect x="20" y="78" width="36" height="42" rx="5" fill="url(#w42m)" /><rect x="26" y="86" width="24" height="16" rx="2" fill="#37474f" /><g fill="#ffca28"><circle cx="31" cy="94" r="2" /></g><g fill="#66bb6a"><rect x="36" y="92" width="10" height="2" rx="1" /><rect x="36" y="96" width="7" height="2" rx="1" /></g>
    <rect x="24" y="120" width="10" height="10" rx="2" fill="#78909c" /><rect x="42" y="120" width="10" height="10" rx="2" fill="#78909c" /><rect x="22" y="128" width="14" height="3" rx="1.5" fill="#455a64" /><rect x="40" y="128" width="14" height="3" rx="1.5" fill="#455a64" />
    <rect x="26" y="52" width="26" height="24" rx="5" fill="url(#w42m)" /><rect x="30" y="58" width="18" height="10" rx="5" fill="#263238" />
    <circle cx="35" cy="63" r="3.4" fill="url(#w42e)" /><circle cx="43" cy="63" r="3.4" fill="url(#w42e)" /><path d="M35 72q4 2 8 0" stroke="#546e7a" strokeWidth="1" fill="none" />
    <line x1="39" y1="52" x2="39" y2="42" stroke="#78909c" strokeWidth="1.5" /><circle cx="39" cy="41" r="2.6" fill="#ef5350" /><circle cx="38.4" cy="40.4" r=".8" fill="#fff" />
    <rect x="22" y="76" width="34" height="3" rx="1.5" fill="#607d8b" />
    <path d="M56 90l12 2" stroke="#90a4ae" strokeWidth="4" strokeLinecap="round" /><circle cx="56" cy="90" r="3" fill="#78909c" />
    <path d="M64 84h16v14h-16z" fill="#66bb6a" /><path d="M64 84h16" stroke="#43a047" strokeWidth="1.5" /><path d="M80 88l10-6" stroke="#66bb6a" strokeWidth="3" strokeLinecap="round" /><path d="M66 84q6-10 12 0" stroke="#43a047" strokeWidth="1.6" fill="none" />
    <g stroke="#29b6f6" strokeWidth="1.2" strokeLinecap="round">{[[90, 86, 90, 94], [93, 85, 95, 93], [87, 87, 85, 95], [91, 96, 91, 100]].map((l, i) => <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />)}</g>
    <g fill="#fff" opacity=".7"><path d="M24 30q3-3 6 0q-3 1-6 0z" /></g>
  </Svg>],

  [43, 'แผนที่ขุมทรัพย์', <Svg>
    <defs>
      <linearGradient id="w43b" x2="0" y2="1"><stop stopColor="#5a3e2b" /><stop offset="1" stopColor="#3a2416" /></linearGradient>
      <radialGradient id="w43p" cx=".5" cy=".5"><stop stopColor="#fbf0d4" /><stop offset=".8" stopColor="#ecd7a4" /><stop offset="1" stopColor="#c9a46a" /></radialGradient>
      <linearGradient id="w43s" x2="1" y2="1"><stop stopColor="#a9def9" /><stop offset="1" stopColor="#7fb8d8" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#w43b)" />
    <g stroke="#2a1a0e" strokeWidth=".6">{[20, 50, 80, 110, 140].map(y => <path key={y} d={`M0 ${y}H120`} />)}</g>
    <path d="M8 10L30 6L48 12L70 6L94 10L112 8L110 40L114 70L108 104L112 150L84 154L60 148L36 154L10 150L12 112L6 76L10 44Z" fill="url(#w43p)" stroke="#8a6a3a" />
    <path d="M14 18Q30 14 50 22M80 140Q96 146 106 140" stroke="#c9a46a" strokeWidth=".6" fill="none" />
    <path d="M20 40Q16 28 32 26Q50 22 58 34Q68 48 58 62Q40 70 28 60Q18 52 20 40Z" fill="#d8e6b0" stroke="#7a8a4a" strokeWidth="1" />
    <path d="M68 88Q64 74 82 72Q102 72 100 90Q98 112 82 114Q66 110 68 88Z" fill="#d8e6b0" stroke="#7a8a4a" strokeWidth="1" />
    <g stroke="#7a8a4a" strokeWidth=".6" fill="none"><path d="M28 44l4-6 4 6M38 50l4-6 4 6M76 86l4-6 4 6" /></g>
    <g fill="#6a8a3a">{[[46, 36], [50, 44], [88, 98], [92, 90]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="2" /><rect x={x - .4} y={y + 1.6} width=".8" height="2" fill="#6b4226" /></g>)}</g>
    <path d="M40 60Q50 76 56 86T78 92" stroke="#a23b2a" strokeWidth="1.6" strokeDasharray="3 2.6" fill="none" />
    <path d="M80 90l8 8M88 90l-8 8" stroke="#c0392b" strokeWidth="2.8" strokeLinecap="round" />
    <g transform="translate(30 122)"><circle r="11" fill="none" stroke="#8b5a2b" strokeWidth="1.2" /><circle r="8" fill="none" stroke="#8b5a2b" strokeWidth=".5" /><polygon points="0,-13 3,0 0,13 -3,0" fill="#8b5a2b" /><polygon points="0,-13 3,0 -3,0" fill="#c0392b" /><polygon points="-13,0 0,-3 13,0 0,3" fill="#b08850" /></g>
    <g fill="url(#w43s)" opacity=".6"><path d="M70 30q6-4 12 0t12 0v6q-6 4-12 0t-12 0z" /></g>
    <g transform="translate(92 128)"><path d="M-10 0q4-6 8 0q4-6 8 0q2-6 6-4" stroke="#3a6a8a" strokeWidth="1.4" fill="none" /><path d="M4-4q4-6 8-2" stroke="#3a6a8a" strokeWidth="2" fill="none" /><circle cx="11" cy="-6" r=".8" fill="#3a6a8a" /></g>
    <path d="M86 46l6-4 2 6-6 2z" fill="#8b5a2b" /><path d="M88 42v-6l4 4" fill="#fff" stroke="#8b5a2b" strokeWidth=".4" />
    <path d="M16 92q6-3 12 0M84 54q6-3 12 0M40 136q6-3 12 0" stroke="#5a7a9a" fill="none" strokeWidth=".8" />
    <g fill="#8a6a3a" opacity=".4"><circle cx="100" cy="20" r="4" /><circle cx="20" cy="140" r="3" /></g>
  </Svg>],

  [44, 'ตกพระจันทร์', <Svg>
    <defs>
      <linearGradient id="w44s" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset="1" stopColor="#1e3a5f" /></linearGradient>
      <radialGradient id="w44m" cx=".35" cy=".35"><stop stopColor="#fffbe6" /><stop offset="1" stopColor="#efdf9e" /></radialGradient>
      <radialGradient id="w44g"><stop stopColor="#fff4c2" stopOpacity=".5" /><stop offset="1" stopColor="#fff4c2" stopOpacity="0" /></radialGradient>
      <linearGradient id="w44w" x2="0" y2="1"><stop stopColor="#0d2a4a" /><stop offset="1" stopColor="#050f1e" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#w44s)" />
    <St p={[8, 10, .6, 22, 30, .5, 40, 8, .7, 104, 74, .5, 112, 12, .6, 16, 64, .4, 60, 20, .4, 70, 6, .5]} />
    <circle cx="86" cy="38" r="34" fill="url(#w44g)" />
    <path d="M86 16a22 22 0 1 0 15 38a17 17 0 1 1-15-38z" fill="url(#w44m)" /><g fill="#e6d48c" opacity=".7"><circle cx="78" cy="32" r="2.6" /><circle cx="76" cy="46" r="1.8" /></g>
    <path d="M36 102Q56 30 94 46" stroke="#cfd8e6" strokeWidth=".6" fill="none" /><path d="M94 46q5 3 2 9q-3 2-5-1" stroke="#cfd8e6" strokeWidth=".9" fill="none" />
    <rect y="110" width="120" height="50" fill="url(#w44w)" />
    <g stroke="#3a5a80" strokeWidth=".8" fill="none">{[0, 1, 2, 3].map(i => <path key={i} d={`M${i * 4} ${114 + i * 10}q8-3 16 0t16 0t16 0t16 0t16 0t16 0t16 0t16 0`} opacity={.8 - i * .15} />)}</g>
    <g fill="#fff4c2" opacity=".55">{[[82, 124, 16], [86, 132, 10], [84, 140, 12], [88, 148, 6]].map(([x, y, w], i) => <rect key={i} x={x - w / 2} y={y} width={w} height="1.6" rx=".8" />)}</g>
    <path d="M14 106H62L54 116H22Z" fill="#6b4226" /><path d="M14 106H62" stroke="#a87442" strokeWidth="1.2" /><path d="M20 110h36" stroke="#4a2c18" strokeWidth=".5" />
    <g fill="#0f1626"><circle cx="38" cy="92" r="4.2" /><path d="M33 96h10l1 10h-12z" /><path d="M33 90q5-8 10 0z" /><path d="M42 100l-4-12" stroke="#0f1626" strokeWidth="1.6" /></g>
    <line x1="38" y1="100" x2="36" y2="102" stroke="#6b4226" strokeWidth="1.4" />
    <g transform="translate(56 104)"><circle r="1.6" fill="#ffb703" /><path d="M0-1.6v-6" stroke="#6b4226" strokeWidth=".6" /><circle cx="0" cy="-8" r="4" fill="#ffb703" opacity=".2" /></g>
  </Svg>],

  [45, 'เงาแมวที่เป็นสิงโต', <Svg>
    <defs>
      <linearGradient id="w45w" x2="0" y2="1"><stop stopColor="#f5e6c8" /><stop offset="1" stopColor="#e2c896" /></linearGradient>
      <radialGradient id="w45l" cx=".05" cy=".25" r=".9"><stop stopColor="#fff8d0" stopOpacity=".9" /><stop offset="1" stopColor="#fff8d0" stopOpacity="0" /></radialGradient>
      <linearGradient id="w45c" x2="1" y2="1"><stop stopColor="#f4a261" /><stop offset="1" stopColor="#c9692a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#w45w)" /><rect width="120" height="160" fill="url(#w45l)" />
    <g stroke="#d9b67a" strokeWidth=".6" opacity=".7">{[20, 40, 60, 80, 100].map(x => <path key={x} d={`M${x} 0V128`} />)}</g>
    <g fill="#5a3f26" opacity=".55">
      <circle cx="78" cy="62" r="26" /><g>{Array.from({ length: 14 }, (_, i) => { const a = i * Math.PI / 7; return <ellipse key={i} cx={78 + 24 * Math.cos(a)} cy={62 + 24 * Math.sin(a)} rx="7" ry="4" transform={`rotate(${a * 57.3} ${78 + 24 * Math.cos(a)} ${62 + 24 * Math.sin(a)})`} />; })}</g>
      <ellipse cx="92" cy="104" rx="28" ry="20" /><rect x="70" y="110" width="9" height="20" rx="3" /><rect x="100" y="110" width="9" height="20" rx="3" />
      <path d="M118 96q10-10 4-28" stroke="#5a3f26" strokeWidth="4.5" fill="none" /><circle cx="122" cy="66" r="4" />
    </g>
    <g fill="#3a2a18" opacity=".35"><circle cx="72" cy="58" r="2" /><circle cx="84" cy="58" r="2" /></g>
    <rect y="128" width="120" height="32" fill="#a67c52" /><path d="M0 128h120" stroke="#c49a6c" strokeWidth="1.5" /><g stroke="#8a6440" strokeWidth=".6">{[0, 1, 2, 3, 4].map(i => <path key={i} d={`M${i * 26} 128l-6 32`} />)}</g>
    <g><path d="M0 26H14L22 38H0Z" fill="#495057" /><path d="M10 38v-12" stroke="#343a40" strokeWidth="1.4" /><circle cx="14" cy="38" r="3" fill="#fff8d0" /></g>
    <polygon points="0,40 24,40 54,128 0,128" fill="#fff8d0" opacity=".22" />
    <g><ellipse cx="34" cy="122" rx="10" ry="7.4" fill="url(#w45c)" /><circle cx="28" cy="111" r="6.6" fill="url(#w45c)" /><polygon points="22,108 23,100 28,106" fill="#c9692a" /><polygon points="34,108 33,100 28,106" fill="#c9692a" /><polygon points="23.4,107 24,103 26,106" fill="#ffafcc" />
      <path d="M44 122q9 2 7-9" stroke="url(#w45c)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M25 110q1-1 2 0M29 110q1-1 2 0" stroke="#3a2a1a" strokeWidth=".8" fill="none" /><path d="M27.4 113l.6.6.6-.6" stroke="#3a2a1a" strokeWidth=".6" fill="none" />
      <g stroke="#a5501a" strokeWidth=".6"><path d="M30 118l4 2M32 124l4 1" /></g><path d="M28 128v2M38 128v2" stroke="#c9692a" strokeWidth="2" /></g>
  </Svg>],

  [48, 'ฟองสบู่เก็บความทรงจำ', <Svg>
    <defs>
      <linearGradient id="w48s" x2="0" y2="1"><stop stopColor="#a2d2ff" /><stop offset="1" stopColor="#e0f4ff" /></linearGradient>
      <radialGradient id="w48b" cx=".35" cy=".3"><stop stopColor="#fff" stopOpacity=".05" /><stop offset=".75" stopColor="#bde0fe" stopOpacity=".2" /><stop offset=".92" stopColor="#ffafcc" stopOpacity=".45" /><stop offset="1" stopColor="#cdb4db" stopOpacity=".8" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#w48s)" />
    <Cl x={100} y={130} s={1.2} o={.7} /><Cl x={18} y={20} s={.8} o={.7} />
    <path d="M4 158L30 132" stroke="#c48b4a" strokeWidth="4.4" strokeLinecap="round" /><path d="M4 158L30 132" stroke="#e0b07a" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="34" cy="128" r="6.4" fill="none" stroke="#c48b4a" strokeWidth="2.4" /><circle cx="34" cy="128" r="5" fill="url(#w48b)" />
    {[[46, 104, 12], [78, 76, 17], [40, 54, 14], [90, 30, 12], [62, 18, 6], [100, 108, 5], [20, 86, 4]].map(([x, y, r], i) => <g key={i}><circle cx={x} cy={y} r={r} fill="url(#w48b)" /><circle cx={x} cy={y} r={r} fill="none" stroke="#fff" strokeWidth=".7" opacity=".8" /><ellipse cx={x - r * .4} cy={y - r * .45} rx={r * .28} ry={r * .14} fill="#fff" opacity=".85" transform={`rotate(-35 ${x - r * .4} ${y - r * .45})`} /></g>)}
    <g transform="translate(46 104)"><path d="M-6 6v-6l6-6 6 6v6z" fill="#e76f51" /><path d="M-7 0l7-7 7 7" stroke="#9d3c2a" strokeWidth="1.2" fill="none" /><rect x="-1.6" y="2" width="3.2" height="4" fill="#6b4226" /><rect x="2.4" y="-1" width="2" height="2" fill="#ffd166" /></g>
    <g transform="translate(78 76)"><path d="M-9 0q9-9 18 0q-9 9-18 0zM9 0l5-4.4v8.8z" fill="#f4a261" /><circle cx="-4.6" cy="-.6" r="1" fill="#222" /><path d="M-2-4q2 4 0 8" stroke="#e76f51" strokeWidth=".7" fill="none" /><g fill="#bde0fe"><circle cx="-11" cy="-4" r=".8" /><circle cx="-13" cy="-7" r=".6" /></g></g>
    <g transform="translate(40 54)"><path d="M0 7l-7-7a4.4 4.4 0 0 1 7-5a4.4 4.4 0 0 1 7 5z" fill="#ef476f" /><path d="M-4-3a2 2 0 0 1 2-1" stroke="#fff" strokeWidth=".8" fill="none" /></g>
    <g transform="translate(90 30)"><path d="M0-7a7 7 0 1 0 4 12a5.6 5.6 0 1 1-4-12z" fill="#ffd166" /><circle cx="5" cy="-4" r=".6" fill="#fff" /></g>
    <g transform="translate(62 18)"><path d="M0-3l.8 2 2 .4-1.4 1.4.4 2L0 1.8-1.8 2.8l.4-2L-2.8-.6l2-.4z" fill="#c77dff" /></g>
  </Svg>],

  [49, 'ภูเขาไฟพ่นดอกไม้', <Svg>
    <defs>
      <linearGradient id="w49s" x2="0" y2="1"><stop stopColor="#ffc8dd" /><stop offset="1" stopColor="#ffe5ec" /></linearGradient>
      <linearGradient id="w49v" x2="1" y2="0"><stop stopColor="#6d4c41" /><stop offset=".45" stopColor="#a1887f" /><stop offset="1" stopColor="#4e342e" /></linearGradient>
      <radialGradient id="w49g"><stop stopColor="#ff8fab" stopOpacity=".6" /><stop offset="1" stopColor="#ff8fab" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#w49s)" />
    <circle cx="60" cy="40" r="50" fill="url(#w49g)" />
    <Cl x={16} y={70} s={.9} o={.8} /><Cl x={104} y={80} s={.8} o={.8} />
    <polygon points="10,152 46,74 74,74 110,152" fill="url(#w49v)" /><polygon points="46,74 74,74 68,88 52,88" fill="#3e2723" />
    <g stroke="#3e2723" strokeWidth=".8" fill="none" opacity=".6"><path d="M40 100l6 10-4 10M78 98l-4 12 6 10M30 130l8 6M88 134l-6 6" /></g>
    <path d="M54 88Q46 108 38 122Q30 136 24 152" stroke="#ff8fab" strokeWidth="5" fill="none" strokeLinecap="round" /><path d="M54 88Q46 108 38 122Q30 136 24 152" stroke="#ffc8dd" strokeWidth="1.6" fill="none" />
    <g fill="#ffb3c6">{[[46, 106], [36, 126], [28, 142]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" />)}</g>
    <path d="M52 76Q38 40 18 30M60 74Q60 30 62 12M68 76Q84 40 104 32M56 74Q44 56 36 46M64 74Q76 58 86 50" stroke="#ff8fab" strokeWidth="1.2" strokeDasharray="1.6 3" fill="none" />
    <Fl x={18} y={30} s={1.3} c="#ff4d6d" /><Fl x={62} y={12} s={1.3} c="#ffd166" m="#ff4d6d" /><Fl x={104} y={32} s={1.3} c="#c77dff" /><Fl x={36} y={46} s={.9} c="#ff8fab" /><Fl x={86} y={50} s={.9} c="#7bdff2" /><Fl x={60} y={40} s={.75} c="#ff4d6d" /><Fl x={44} y={24} s={.6} c="#80ed99" /><Fl x={80} y={22} s={.65} c="#ff8fab" />
    <g fill="#80b918">{[[30, 40], [92, 44], [70, 30]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="2.4" ry="1.2" transform={`rotate(${i * 40} ${x} ${y})`} />)}</g>
    <rect y="150" width="120" height="10" fill="#80b918" /><g fill="#55a630">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 10 + 4} 150l2-5 2 5z`} />)}</g>
    <g transform="translate(96 146)"><circle cx="0" cy="-8" r="2.2" fill="#3a2a1a" /><path d="M-2-6h4l1 6h-6z" fill="#3a2a1a" /><path d="M-2-4l-3-4M2-4l3-4" stroke="#3a2a1a" strokeWidth="1" strokeLinecap="round" /></g>
  </Svg>],
];
