// ภาพการ์ดแบบละเอียด ชุด 11 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;
const Piece = 'M0 0h10a5 5 0 0 1 10 0h10v10a5 5 0 0 1 0 10v10h-10a5 5 0 0 0-10 0h-10v-10a5 5 0 0 0 0-10z';

export const HD11 = [
  [27, 'นักบินอวกาศกับดอกไม้', <Svg>
    <defs>
      <radialGradient id="v27s" cx=".5" cy=".3"><stop stopColor="#2a1b5e" /><stop offset="1" stopColor="#070617" /></radialGradient>
      <radialGradient id="v27p" cx=".35" cy=".3"><stop stopColor="#a29bfe" /><stop offset=".7" stopColor="#6c5ce7" /><stop offset="1" stopColor="#3d2fb0" /></radialGradient>
      <radialGradient id="v27r" cx=".35" cy=".3"><stop stopColor="#ffd6e7" /><stop offset="1" stopColor="#e56b9f" /></radialGradient>
      <linearGradient id="v27v" x2="1" y2="1"><stop stopColor="#74b9ff" /><stop offset="1" stopColor="#1e2a4a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#v27s)" />
    <St p={[8, 10, .6, 20, 36, .5, 34, 8, .7, 52, 22, .4, 70, 6, .5, 104, 64, .6, 112, 10, .5, 14, 72, .6, 90, 82, .4, 40, 52, .4, 62, 44, .3]} />
    <path d="M0 40Q60 70 120 30" stroke="#a29bfe" strokeWidth="14" fill="none" opacity=".08" />
    <circle cx="96" cy="32" r="10" fill="url(#v27r)" /><ellipse cx="96" cy="32" rx="18" ry="3.6" fill="none" stroke="#ffe0ec" strokeWidth="1.2" /><path d="M78 32a18 3.6 0 0 0 36 0" stroke="#ffe0ec" strokeWidth="1.2" fill="none" />
    <circle cx="60" cy="146" r="46" fill="url(#v27p)" />
    <g fill="#5a4bd1">{[[40, 126, 5], [80, 152, 7], [70, 118, 3], [30, 150, 4], [92, 130, 3]].map(([x, y, r], i) => <g key={i}><circle cx={x} cy={y} r={r} /><circle cx={x - r * .3} cy={y - r * .3} r={r * .6} fill="#4a3cc0" /></g>)}</g>
    <path d="M18 128Q40 104 78 102" stroke="#c4bdff" strokeWidth="2" fill="none" opacity=".5" />
    <g><rect x="42" y="88" width="18" height="16" rx="5" fill="#f1f2f6" /><rect x="58" y="96" width="14" height="6" rx="3" fill="#f1f2f6" /><rect x="40" y="100" width="8" height="6" rx="3" fill="#dfe4ea" /><rect x="46" y="92" width="10" height="7" rx="1" fill="#74b9ff" /><circle cx="49" cy="95" r="1" fill="#ff7675" /><circle cx="53" cy="95" r="1" fill="#55efc4" />
      <rect x="34" y="90" width="9" height="13" rx="2" fill="#dfe4ea" />
      <circle cx="51" cy="80" r="10" fill="#f1f2f6" /><ellipse cx="53" cy="80" rx="7" ry="6" fill="url(#v27v)" /><ellipse cx="55" cy="77.5" rx="2.4" ry="1.4" fill="#fff" opacity=".7" /><path d="M48 82q4 3 9 0" stroke="#74b9ff" strokeWidth=".5" fill="none" opacity=".6" /></g>
    <path d="M78 100q-1-10 1-16" stroke="#55efc4" strokeWidth="1.6" fill="none" /><path d="M78 94q-6-4-8 0q4 3 8 0" fill="#55efc4" />
    <g fill="#ff7675"><circle cx="79" cy="80" r="2.6" /><circle cx="83" cy="83" r="2.6" /><circle cx="79" cy="86" r="2.6" /><circle cx="75" cy="83" r="2.6" /></g><circle cx="79" cy="83" r="1.8" fill="#ffeaa7" />
    <path d="M72 98q4 1 6-2" stroke="#f1f2f6" strokeWidth="3" fill="none" strokeLinecap="round" />
  </Svg>],

  [28, 'โพรงกระต่าย', <Svg>
    <defs>
      <linearGradient id="v28s" x2="0" y2="1"><stop stopColor="#a2d2ff" /><stop offset="1" stopColor="#e0f4ff" /></linearGradient>
      <linearGradient id="v28g" x2="0" y2="1"><stop stopColor="#80b918" /><stop offset="1" stopColor="#2b9348" /></linearGradient>
      <radialGradient id="v28h" cx=".5" cy=".4"><stop stopColor="#fff3b0" /><stop offset=".3" stopColor="#ffd166" /><stop offset=".7" stopColor="#3a2a1a" /><stop offset="1" stopColor="#1a1208" /></radialGradient>
      <radialGradient id="v28l"><stop stopColor="#ffe58a" stopOpacity=".7" /><stop offset="1" stopColor="#ffe58a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#v28s)" />
    <Cl x={26} y={28} s={1.2} /><Cl x={96} y={20} s={.9} />
    <path d="M0 70Q30 62 60 68T120 66V160H0Z" fill="url(#v28g)" />
    <g stroke="#2b9348" strokeWidth="1.1" strokeLinecap="round">{Array.from({ length: 22 }, (_, i) => { const x = (i * 41) % 116 + 2, y = 78 + (i * 19) % 78; return <path key={i} d={`M${x} ${y}l-1-5M${x + 2} ${y}l1-4`} />; })}</g>
    <ellipse cx="60" cy="110" rx="30" ry="11" fill="#5a3e2b" /><ellipse cx="60" cy="110" rx="27" ry="9" fill="url(#v28h)" />
    <circle cx="60" cy="104" r="34" fill="url(#v28l)" />
    <g stroke="#8b5a2b" strokeWidth="2.2" strokeLinecap="round"><line x1="50" y1="112" x2="52" y2="78" /><line x1="68" y1="112" x2="66" y2="78" /></g><g stroke="#a0682f" strokeWidth="1.8">{[84, 92, 100, 108].map(y => <line key={y} x1="51" y1={y} x2="67" y2={y} />)}</g>
    <g fill="#3e8e2e"><circle cx="18" cy="88" r="13" /><circle cx="30" cy="92" r="10" /><circle cx="10" cy="96" r="9" /></g><g fill="#55a630"><circle cx="16" cy="84" r="5" /><circle cx="30" cy="88" r="4" /></g>
    <g fill="#fff"><ellipse cx="20" cy="68" rx="3.4" ry="11" transform="rotate(-10 20 68)" /><ellipse cx="28" cy="68" rx="3.4" ry="11" transform="rotate(12 28 68)" /></g><g fill="#ffafcc"><ellipse cx="20" cy="68" rx="1.6" ry="8" transform="rotate(-10 20 68)" /><ellipse cx="28" cy="68" rx="1.6" ry="8" transform="rotate(12 28 68)" /></g>
    <g>{[[96, 132, '#ffd84d'], [104, 124, '#ff6fa3'], [14, 140, '#fff'], [86, 146, '#c77dff'], [30, 150, '#ffd84d']].map(([x, y, c], i) => <g key={i} fill={c}><circle cx={x - 1.6} cy={y} r="1.6" /><circle cx={x + 1.6} cy={y} r="1.6" /><circle cx={x} cy={y - 1.6} r="1.6" /><circle cx={x} cy={y + 1.6} r="1.6" /><circle cx={x} cy={y} r="1" fill="#ffd166" /></g>)}</g>
    <g transform="translate(92 98)"><circle r="5" fill="#fff" stroke="#c9a227" /><path d="M0 0V-3M0 0h2.4" stroke="#333" strokeWidth=".7" /><path d="M0-5v-3" stroke="#c9a227" /></g>
  </Svg>],

  [29, 'ช้างบนลูกบอล', <Svg>
    <defs>
      <linearGradient id="v29s" x2="0" y2="1"><stop stopColor="#1a0f2e" /><stop offset="1" stopColor="#4a1f4a" /></linearGradient>
      <linearGradient id="v29l" x2="0" y2="1"><stop stopColor="#fff6c8" stopOpacity=".3" /><stop offset="1" stopColor="#fff6c8" stopOpacity=".05" /></linearGradient>
      <radialGradient id="v29b" cx=".35" cy=".3"><stop stopColor="#ff8fa3" /><stop offset=".6" stopColor="#e63946" /><stop offset="1" stopColor="#8d021f" /></radialGradient>
      <radialGradient id="v29e" cx=".4" cy=".3"><stop stopColor="#d6d9e0" /><stop offset="1" stopColor="#8d91a0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#v29s)" />
    <path d="M0 0H22Q14 70 22 150H0ZM120 0H98Q106 70 98 150H120Z" fill="#7a1f3d" /><path d="M8 0Q4 80 10 150M112 0Q116 80 110 150" stroke="#5a0f2a" strokeWidth="2" fill="none" />
    <path d="M0 0H120V12Q90 22 60 14Q30 22 0 12Z" fill="#9d2b4f" /><path d="M0 12Q30 22 60 14Q90 22 120 12" stroke="#f2c14e" strokeWidth="1.2" fill="none" />
    <polygon points="50,0 70,0 106,150 14,150" fill="url(#v29l)" />
    <rect y="146" width="120" height="14" fill="#5b1a2a" /><ellipse cx="60" cy="146" rx="42" ry="6" fill="#fff6c8" opacity=".3" />
    <circle cx="60" cy="126" r="20" fill="url(#v29b)" /><path d="M40 126q20 9 40 0" stroke="#ffd166" strokeWidth="4" fill="none" /><path d="M42 118q18 6 36 0" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".5" />
    <path d="M60 112l1.4 3 3.2.4-2.4 2.2.6 3.2-2.8-1.6-2.8 1.6.6-3.2-2.4-2.2 3.2-.4z" fill="#fff" />
    <rect x="50" y="98" width="6" height="11" rx="2" fill="url(#v29e)" /><rect x="64" y="98" width="6" height="11" rx="2" fill="url(#v29e)" />
    <ellipse cx="58" cy="92" rx="19" ry="13" fill="url(#v29e)" /><circle cx="77" cy="82" r="11" fill="url(#v29e)" />
    <path d="M86 86q8 2 8-10q0-6 4-6" stroke="#a3a7b5" strokeWidth="4.4" fill="none" strokeLinecap="round" /><circle cx="98" cy="70" r="2" fill="#ffd166" />
    <ellipse cx="70" cy="82" rx="7" ry="9" fill="#a3a7b5" /><ellipse cx="70" cy="82" rx="4" ry="6" fill="#ffafcc" opacity=".5" />
    <circle cx="80" cy="79" r="1.4" fill="#222" /><circle cx="80.5" cy="78.5" r=".5" fill="#fff" />
    <path d="M40 90q-6 4-4 10" stroke="#a3a7b5" strokeWidth="2" fill="none" />
    <polygon points="72,72 76,58 80,72" fill="#ffd166" /><circle cx="76" cy="57" r="2" fill="#e63946" />
    <path d="M44 84q8-6 26-2" stroke="#e63946" strokeWidth="5" fill="none" /><path d="M46 84l4 4 4-4 4 4 4-4 4 4" stroke="#ffd166" strokeWidth="1" fill="none" />
    <g fill="#ffd166">{[[24, 40], [100, 34], [30, 90], [92, 110]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 3}l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z`} />)}</g>
  </Svg>],

  [31, 'หุ่นไล่กากับเพื่อนกา', <Svg>
    <defs>
      <linearGradient id="v31s" x2="0" y2="1"><stop stopColor="#ff7e5f" /><stop offset=".6" stopColor="#feb47b" /><stop offset="1" stopColor="#ffe29a" /></linearGradient>
      <radialGradient id="v31u"><stop stopColor="#fff3c4" /><stop offset=".5" stopColor="#ffd166" stopOpacity=".6" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
      <linearGradient id="v31w" x2="0" y2="1"><stop stopColor="#e9c46a" /><stop offset="1" stopColor="#bc8a28" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#v31s)" />
    <circle cx="94" cy="114" r="34" fill="url(#v31u)" /><circle cx="94" cy="114" r="16" fill="#fff3c4" opacity=".9" />
    <path d="M0 116Q60 104 120 118V160H0Z" fill="url(#v31w)" />
    <g stroke="#a67c1a" strokeWidth="1.3" strokeLinecap="round">{Array.from({ length: 22 }, (_, i) => { const x = i * 5.6 + 1, y = 118 + (i % 4) * 9; return <g key={i}><path d={`M${x} ${y + 10}V${y}`} /><ellipse cx={x} cy={y - 2} rx="1.2" ry="3" fill="#d4a017" stroke="none" /></g>; })}</g>
    <line x1="60" y1="50" x2="60" y2="150" stroke="#6b4226" strokeWidth="3.4" /><line x1="26" y1="72" x2="94" y2="72" stroke="#6b4226" strokeWidth="3.4" />
    <path d="M44 66H76L72 106H48Z" fill="#5c7cfa" /><path d="M44 66H76L72 106H48Z" fill="none" stroke="#3b5bdb" strokeWidth=".6" />
    <path d="M44 66L28 72L30 80L46 76M76 66L92 72L90 80L74 76" fill="#5c7cfa" stroke="#3b5bdb" strokeWidth=".6" />
    <rect x="50" y="80" width="8" height="8" fill="#fab005" transform="rotate(8 54 84)" /><path d="M50 80l8 8M58 80l-8 8" stroke="#e67700" strokeWidth=".5" transform="rotate(8 54 84)" />
    <g stroke="#e9c46a" strokeWidth="1.2" strokeLinecap="round"><path d="M28 76l-4 4M28 78l-3 6M92 76l4 4M92 78l3 6M50 106l-2 6M56 106l0 7M64 106l1 7M70 106l3 6" /></g>
    <circle cx="60" cy="50" r="11" fill="#d9b778" /><g stroke="#8a6a3a" strokeWidth=".5">{[46, 50, 54].map(y => <path key={y} d={`M50 ${y}h20`} />)}</g>
    <path d="M55 48l2 2M57 48l-2 2M63 48l2 2M65 48l-2 2" stroke="#6b4226" strokeWidth=".9" /><path d="M54 55q6 3 12 0" stroke="#6b4226" fill="none" /><g stroke="#6b4226" strokeWidth=".6">{[56, 59, 62, 65].map(x => <path key={x} d={`M${x} 55v2`} />)}</g>
    <path d="M44 42H76L68 38Q66 26 60 26Q54 26 52 38Z" fill="#6b4226" /><path d="M52 38h16" stroke="#e63946" strokeWidth="2" />
    {[[32, 66, 1], [88, 66, -1], [62, 31, 1]].map(([x, y, d], i) => <g key={i} transform={`translate(${x} ${y}) scale(${d} 1)`}><ellipse rx="5.6" ry="4.4" fill="#1d1d1d" /><circle cx="4" cy="-3.4" r="2.8" fill="#1d1d1d" /><polygon points="6.4,-3.6 10,-2.6 6.4,-1.8" fill="#f59f00" /><circle cx="4.6" cy="-4" r=".6" fill="#fff" /><path d="M-5 0l-5 2 5 1z" fill="#1d1d1d" /><path d="M-1 4v3M2 4v3" stroke="#f59f00" strokeWidth=".6" /></g>)}
    <g fill="#1d1d1d"><path d="M14 30q3-3 6 0q-3 1-6 0z" /><path d="M22 24q2-2 4 0q-2 1-4 0z" /></g>
  </Svg>],

  [32, 'ผีรอรถเมล์ตอนฝนตก', <Svg>
    <defs>
      <linearGradient id="v32s" x2="0" y2="1"><stop stopColor="#2b2d42" /><stop offset="1" stopColor="#4a4e69" /></linearGradient>
      <radialGradient id="v32l" cx=".5" cy="0"><stop stopColor="#ffe8a3" stopOpacity=".55" /><stop offset="1" stopColor="#ffe8a3" stopOpacity="0" /></radialGradient>
      <linearGradient id="v32g" x2="1" y2="1"><stop stopColor="#ffffff" /><stop offset="1" stopColor="#d6dbe6" /></linearGradient>
      <linearGradient id="v32r" x2="0" y2="1"><stop stopColor="#495057" /><stop offset="1" stopColor="#212529" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#v32s)" />
    <g fill="#1b1d2e"><rect x="0" y="40" width="20" height="96" /><rect x="100" y="30" width="20" height="106" /></g><g fill="#ffd166" opacity=".5">{[[4, 50], [12, 64], [104, 40], [110, 60], [104, 80]].map(([x, y], i) => <rect key={i} x={x} y={y} width="3" height="4" />)}</g>
    <path d="M14 70H86V74H14Z" fill="#6c757d" /><path d="M16 74V132M84 74V132" stroke="#6c757d" strokeWidth="2.4" /><rect x="18" y="74" width="64" height="40" fill="#adb5bd" opacity=".15" />
    <rect x="16" y="70" width="70" height="66" fill="url(#v32l)" />
    <rect x="22" y="112" width="56" height="4" rx="1" fill="#6c757d" /><rect x="24" y="116" width="3" height="16" fill="#495057" /><rect x="73" y="116" width="3" height="16" fill="#495057" />
    <rect x="96" y="44" width="3" height="92" fill="#6c757d" /><circle cx="97.5" cy="44" r="9" fill="#e63946" /><circle cx="97.5" cy="44" r="7" fill="none" stroke="#fff" strokeWidth="1.2" /><rect x="92" y="42.6" width="11" height="2.8" fill="#fff" />
    <path d="M34 112Q32 74 50 72Q68 74 66 112L62 108L58 113L54 108L50 113L46 108L42 113L38 108Z" fill="url(#v32g)" />
    <path d="M38 90Q42 80 50 78" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".7" />
    <ellipse cx="45" cy="88" rx="2.6" ry="3.6" fill="#1b1d2e" /><ellipse cx="55" cy="88" rx="2.6" ry="3.6" fill="#1b1d2e" /><ellipse cx="50" cy="97" rx="2" ry="2.6" fill="#1b1d2e" />
    <path d="M64 94l8-4" stroke="url(#v32g)" strokeWidth="3" strokeLinecap="round" /><path d="M72 90V70" stroke="#343a40" strokeWidth="1" /><path d="M62 72Q72 60 82 72Z" fill="#ffd166" opacity=".9" />
    <rect y="132" width="120" height="28" fill="url(#v32r)" /><path d="M0 132h120" stroke="#6c757d" />
    <ellipse cx="54" cy="146" rx="30" ry="5" fill="#6c757d" opacity=".5" /><ellipse cx="50" cy="146" rx="9" ry="2" fill="#fff" opacity=".35" />
    <g stroke="#9ca3af" strokeWidth=".6" opacity=".7">{Array.from({ length: 26 }, (_, i) => <line key={i} x1={(i * 47) % 120} y1={(i * 29) % 140} x2={(i * 47) % 120 - 3} y2={(i * 29) % 140 + 10} />)}</g>
    <g fill="#9ca3af" opacity=".6">{[[30, 142], [70, 150], [90, 140]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="3" ry=".8" />)}</g>
  </Svg>],

  [33, 'ฟ้าที่หายไปชิ้นหนึ่ง', <Svg>
    <defs>
      <linearGradient id="v33s" x2="0" y2="1"><stop stopColor="#4cc9f0" /><stop offset="1" stopColor="#caf0f8" /></linearGradient>
      <radialGradient id="v33h" cx=".5" cy=".5"><stop stopColor="#2a1b5e" /><stop offset="1" stopColor="#070617" /></radialGradient>
      <linearGradient id="v33g" x2="0" y2="1"><stop stopColor="#95d5b2" /><stop offset="1" stopColor="#40916c" /></linearGradient>
      <linearGradient id="v33p" x2="0" y2="1"><stop stopColor="#4cc9f0" /><stop offset="1" stopColor="#90e0ef" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#v33s)" />
    <Cl x={18} y={28} s={1.1} /><Cl x={100} y={60} s={1.3} /><Cl x={26} y={86} s={.8} o={.85} />
    <g transform="translate(44 26) scale(1.15)"><path d={Piece} fill="#1a1a2e" transform="translate(1.4 1.4)" opacity=".5" /><path d={Piece} fill="url(#v33h)" /><St p={[8, 8, .6, 20, 14, .5, 14, 26, .7, 26, 24, .4, 6, 20, .4, 18, 4, .3]} /><path d="M24 6a4 4 0 1 0 3 6a3 3 0 1 1-3-6z" fill="#fff4c2" /><path d={Piece} fill="none" stroke="#90e0ef" strokeWidth=".6" /></g>
    <path d="M0 122Q30 110 60 118T120 116V160H0Z" fill="url(#v33g)" /><g stroke="#2d6a4f" strokeWidth="1">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 9 + 3} ${130 + (i % 3) * 8}l-1-4M${i * 9 + 5} ${130 + (i % 3) * 8}l1-4`} />)}</g>
    <g transform="translate(66 112) rotate(22) scale(.8)"><path d={Piece} fill="#3a7a9a" transform="translate(1 3)" opacity=".4" /><path d={Piece} fill="url(#v33p)" /><Cl x={14} y={18} s={.45} /><path d={Piece} fill="none" stroke="#2b8bb0" strokeWidth=".8" /></g>
    <g><circle cx="38" cy="120" r="3" fill="#264653" /><path d="M35.4 123h5.2l1 10h-7.2z" fill="#264653" /><path d="M40 124l6-4" stroke="#264653" strokeWidth="1.3" strokeLinecap="round" /><path d="M36 133l-1 6M40 133l1 6" stroke="#264653" strokeWidth="1.4" /></g>
    <path d="M47 118Q56 80 54 56" stroke="#264653" strokeWidth=".5" strokeDasharray="1.5 2" fill="none" />
  </Svg>],

  [34, 'จรวดกล่องกระดาษ', <Svg>
    <defs>
      <radialGradient id="v34s" cx=".5" cy=".4"><stop stopColor="#3b2f6b" /><stop offset="1" stopColor="#100b28" /></radialGradient>
      <linearGradient id="v34b" x2="1" y2="0"><stop stopColor="#a87a45" /><stop offset=".5" stopColor="#d4a66a" /><stop offset="1" stopColor="#9a6c3a" /></linearGradient>
      <linearGradient id="v34f" x2="0" y2="1"><stop stopColor="#ffd166" /><stop offset=".5" stopColor="#ff9f1c" /><stop offset="1" stopColor="#e63946" stopOpacity=".2" /></linearGradient>
      <radialGradient id="v34p" cx=".35" cy=".3"><stop stopColor="#ffcb8a" /><stop offset="1" stopColor="#e76f51" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#v34s)" />
    <St p={[8, 10, .7, 30, 22, .5, 52, 8, .6, 100, 14, .8, 112, 50, .5, 18, 60, .6, 94, 40, .4, 70, 26, .4, 10, 100, .5, 108, 104, .6]} />
    <circle cx="96" cy="74" r="11" fill="url(#v34p)" /><path d="M85 72q11 5 22 0" stroke="#c44536" fill="none" /><circle cx="92" cy="70" r="2" fill="#c44536" opacity=".5" />
    <path d="M14 30l1.4 3 3 .4-2.2 2 .6 3-2.8-1.6-2.8 1.6.6-3-2.2-2 3-.4z" fill="#ffd166" />
    <path d="M38 132L60 160L82 132Z" fill="url(#v34f)" />
    <polygon points="40,132 46,152 52,134 58,158 64,134 70,152 78,132" fill="#ff9f1c" /><polygon points="46,132 52,146 58,134 64,150 72,132" fill="#ffd166" />
    <rect x="34" y="92" width="52" height="42" fill="url(#v34b)" /><path d="M34 100h52" stroke="#8a5a2b" strokeWidth=".6" /><path d="M60 92v42" stroke="#8a5a2b" strokeWidth=".6" opacity=".6" />
    <polygon points="34,92 22,82 46,88" fill="#b5884d" /><polygon points="86,92 98,82 74,88" fill="#b5884d" />
    <circle cx="72" cy="114" r="8" fill="#7fd1ff" stroke="#2b2b2b" strokeWidth="1.4" /><path d="M68 110q4-3 8 0" stroke="#fff" fill="none" />
    <path d="M40 104l8 8M48 104l-8 8" stroke="#e63946" strokeWidth="1.8" strokeLinecap="round" /><path d="M42 124h10M44 128h6" stroke="#2b2b2b" strokeWidth=".9" strokeLinecap="round" />
    <path d="M28 134l6-14M92 134l-6-14" stroke="#9a6c3a" strokeWidth="3" strokeLinecap="round" />
    <circle cx="58" cy="80" r="11" fill="#f1c27d" /><path d="M48 80q-2-12 10-12" fill="#5a3e2b" /><circle cx="54" cy="80" r="1.4" fill="#2b2b2b" /><circle cx="62" cy="80" r="1.4" fill="#2b2b2b" /><path d="M55 85q3 2 6 0" stroke="#2b2b2b" fill="none" /><circle cx="51" cy="83" r="1.6" fill="#ff8fa3" opacity=".6" />
    <path d="M46 76Q58 58 70 76Z" fill="#b0b7c3" /><path d="M46 76h24" stroke="#6c757d" strokeWidth="1.4" /><g fill="#7a818c">{[50, 54, 58, 62, 66].map((x, i) => <circle key={x} cx={x} cy={70 - (i === 2 ? 2 : i % 2)} r=".9" />)}</g><path d="M58 60v-4" stroke="#6c757d" strokeWidth="1.2" /><circle cx="58" cy="55" r="1.4" fill="#e63946" />
    <path d="M70 92l6-8" stroke="#f1c27d" strokeWidth="2.4" strokeLinecap="round" />
  </Svg>],

  [38, 'ภูเขาน้ำแข็ง', <Svg>
    <defs>
      <linearGradient id="v38a" x2="0" y2="1"><stop stopColor="#bde0fe" /><stop offset="1" stopColor="#eaf6ff" /></linearGradient>
      <linearGradient id="v38w" x2="0" y2="1"><stop stopColor="#219ebc" /><stop offset=".5" stopColor="#0b4f7a" /><stop offset="1" stopColor="#03203a" /></linearGradient>
      <linearGradient id="v38i" x2="1" y2="0"><stop stopColor="#ffffff" /><stop offset=".6" stopColor="#d6f0ff" /><stop offset="1" stopColor="#9fd8f0" /></linearGradient>
      <linearGradient id="v38u" x2="0" y2="1"><stop stopColor="#8fd3f0" stopOpacity=".8" /><stop offset="1" stopColor="#5fa8c8" stopOpacity=".25" /></linearGradient>
    </defs>
    <rect width="120" height="54" fill="url(#v38a)" /><rect y="54" width="120" height="106" fill="url(#v38w)" />
    <circle cx="96" cy="18" r="7" fill="#fff8d6" opacity=".9" /><g fill="#495057"><path d="M22 20q3-3 6 0q-3 1-6 0z" /><path d="M30 26q2-2 4 0q-2 1-4 0z" /></g>
    <polygon points="42,54 52,34 58,40 66,26 80,54" fill="url(#v38i)" /><polygon points="66,26 80,54 70,54 68,40" fill="#bfe6fa" />
    <polygon points="42,54 80,54 102,82 94,124 72,152 38,142 16,106 22,74" fill="url(#v38u)" />
    <path d="M30 80L50 70L74 76L90 92M28 108L54 100L80 112M44 132L66 124" stroke="#bfe6fa" strokeWidth=".8" fill="none" opacity=".5" />
    <rect y="53" width="120" height="2.4" fill="#fff" opacity=".7" /><path d="M0 56q10-2 20 0t20 0t20 0t20 0t20 0t20 0" stroke="#90e0ef" fill="none" opacity=".6" />
    <g transform="translate(98 52)"><path d="M-8 0H8L6 3H-6Z" fill="#e63946" /><path d="M0 0V-10L6-1Z" fill="#fff" /></g>
    <g fill="#ffd166"><path d="M100 132q4-4 8 0q-4 4-8 0zM108 132l3-2v4z" /></g><g fill="#90e0ef" opacity=".7"><circle cx="96" cy="124" r=".8" /><circle cx="94" cy="118" r=".6" /></g>
    <g fill="#caf0f8" opacity=".5">{[[20, 90], [12, 130], [104, 100], [60, 92]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" />)}</g>
    <g transform="translate(26 64) scale(.9)"><ellipse rx="4" ry="2.4" fill="#212529" /><circle cx="3.4" cy="-1.6" r="1.8" fill="#212529" /><path d="M5 -1.6l2 .4-2 .6z" fill="#f77f00" /></g>
  </Svg>],
];
