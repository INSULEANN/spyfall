// ภาพการ์ดแบบละเอียด ชุด 15 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;
const Pn = ({ x, y, s = 1, f = '#2d6a4f' }) => <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M0-32L11-12H6L14 4H-14L-6-12H-11Z" fill={f} /><path d="M0-32L-11-12H-6L-14 4H0Z" fill="#fff" opacity=".12" /></g>;

export const HD15 = [
  [82, 'ปราสาทบนหลังเต่า', <Svg>
    <defs>
      <linearGradient id="z82s" x2="0" y2="1"><stop stopColor="#a9def9" /><stop offset="1" stopColor="#e4c1f9" /></linearGradient>
      <linearGradient id="z82w" x2="0" y2="1"><stop stopColor="#48bfe3" /><stop offset="1" stopColor="#5390d9" /></linearGradient>
      <radialGradient id="z82t" cx=".5" cy=".3"><stop stopColor="#95d5b2" /><stop offset="1" stopColor="#2d6a4f" /></radialGradient>
      <linearGradient id="z82c" x2="1" y2="0"><stop stopColor="#ced4da" /><stop offset=".5" stopColor="#f8f9fa" /><stop offset="1" stopColor="#adb5bd" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#z82s)" />
    <Cl x={18} y={24} /><Cl x={102} y={18} s={.7} />
    <path d="M0 136q15-6 30 0t30 0t30 0t30 0V160H0Z" fill="url(#z82w)" /><path d="M0 136q15-6 30 0t30 0t30 0t30 0" stroke="#caf0f8" strokeWidth="1.4" fill="none" />
    <ellipse cx="24" cy="138" rx="9" ry="4" fill="#74c69d" /><ellipse cx="94" cy="138" rx="9" ry="4" fill="#74c69d" />
    <path d="M12 132Q14 92 60 90Q106 92 108 132Z" fill="url(#z82t)" />
    <g stroke="#1b4332" strokeWidth=".9" fill="none">{[[28, 118], [48, 104], [72, 104], [92, 118], [60, 120], [38, 126], [82, 126]].map(([x, y], i) => <polygon key={i} points={`${x - 7},${y} ${x - 3},${y - 6} ${x + 3},${y - 6} ${x + 7},${y} ${x + 3},${y + 6} ${x - 3},${y + 6}`} />)}</g>
    <path d="M12 132Q60 140 108 132" stroke="#b7e4c7" strokeWidth="2" fill="none" />
    <ellipse cx="110" cy="122" rx="11" ry="8" fill="#74c69d" /><circle cx="114" cy="120" r="1.6" fill="#1b1b1b" /><circle cx="114.4" cy="119.6" r=".5" fill="#fff" /><path d="M112 126q3 1 5-1" stroke="#2d6a4f" fill="none" />
    <g fill="#52b788"><path d="M44 96q-6-6 0-10q4 4 0 10zM78 96q6-6 0-10q-4 4 0 10z" /></g>
    <g fill="url(#z82c)"><rect x="42" y="62" width="36" height="32" /><rect x="38" y="50" width="11" height="44" /><rect x="71" y="50" width="11" height="44" /><rect x="54" y="40" width="12" height="24" /></g>
    <g fill="#ced4da">{[38, 42, 46, 71, 75, 79].map(x => <rect key={x} x={x} y="47" width="2.6" height="3" />)}</g>
    <g fill="#9d4edd"><polygon points="36,50 43.5,36 51,50" /><polygon points="69,50 76.5,36 84,50" /><polygon points="52,40 60,24 68,40" /></g><g stroke="#ffd166" strokeWidth=".8"><path d="M60 24v-6M43.5 36v-4M76.5 36v-4" /></g><path d="M60 18l5 2-5 2z" fill="#e63946" />
    <path d="M55 94v-11a5 5 0 0 1 10 0v11z" fill="#6b4226" /><g fill="#ffd166"><rect x="42" y="66" width="3" height="5" /><rect x="75" y="66" width="3" height="5" /><rect x="58.5" y="46" width="3" height="5" /></g>
    <g stroke="#adb5bd" strokeWidth=".5" opacity=".7">{[70, 76, 82, 88].map(y => <path key={y} d={`M42 ${y}h36`} />)}</g>
    <g fill="#fff" opacity=".7"><path d="M90 50q3-3 6 0q-3 1-6 0z" /></g>
  </Svg>],

  [85, 'ต้นไม้กับชิงช้าบนเกาะ', <Svg>
    <defs>
      <linearGradient id="z85s" x2="0" y2="1"><stop stopColor="#001219" /><stop offset="1" stopColor="#005f73" /></linearGradient>
      <linearGradient id="z85w" x2="0" y2="1"><stop stopColor="#0a3d4a" /><stop offset="1" stopColor="#001219" /></linearGradient>
      <radialGradient id="z85m"><stop stopColor="#fff4c2" stopOpacity=".6" /><stop offset="1" stopColor="#fff4c2" stopOpacity="0" /></radialGradient>
      <radialGradient id="z85t" cx=".4" cy=".35"><stop stopColor="#52796f" /><stop offset="1" stopColor="#1b3a2a" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#z85s)" />
    <St p={[8, 10, .6, 30, 22, .5, 48, 6, .7, 80, 16, .5, 108, 8, .6, 112, 40, .4, 20, 48, .5, 64, 32, .4]} />
    <circle cx="96" cy="28" r="22" fill="url(#z85m)" /><circle cx="96" cy="28" r="7" fill="#fff4c2" />
    <rect y="108" width="120" height="52" fill="url(#z85w)" /><g stroke="#2a6f7a" strokeWidth=".8" fill="none" opacity=".7">{[0, 1, 2].map(i => <path key={i} d={`M0 ${112 + i * 12}q10-3 20 0t20 0t20 0t20 0t20 0t20 0`} />)}</g>
    <g fill="#fff4c2" opacity=".5">{[[96, 116, 14], [96, 124, 8], [96, 132, 10]].map(([x, y, w], i) => <rect key={i} x={x - w / 2} y={y} width={w} height="1.4" rx=".7" />)}</g>
    <ellipse cx="56" cy="112" rx="30" ry="7" fill="#3a2f24" /><ellipse cx="56" cy="110" rx="28" ry="5" fill="#5a4a36" />
    <path d="M50 110Q52 80 44 56M54 110Q58 80 70 60M52 90Q40 84 34 76" stroke="#2b2118" strokeWidth="5" fill="none" strokeLinecap="round" />
    <g fill="url(#z85t)"><circle cx="44" cy="48" r="17" /><circle cx="68" cy="50" r="15" /><circle cx="56" cy="36" r="15" /><circle cx="32" cy="66" r="9" /></g>
    <g fill="#84a98c" opacity=".4">{[[40, 42], [62, 32], [70, 46]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" />)}</g>
    <path d="M68 62l4 32M78 60l2 34" stroke="#cad2c5" strokeWidth=".6" /><rect x="70" y="93" width="12" height="2.4" rx="1" fill="#a68a64" />
    <g fill="#e6ff6b">{[[26, 80], [84, 70], [40, 96], [90, 90]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
  </Svg>],

  [88, 'คนตัวจิ๋วในลูกแก้วหิมะ', <Svg>
    <defs>
      <linearGradient id="z88s" x2="0" y2="1"><stop stopColor="#1d3557" /><stop offset="1" stopColor="#264653" /></linearGradient>
      <radialGradient id="z88e" cx=".5" cy=".5"><stop stopColor="#fff" /><stop offset=".85" stopColor="#f1eadb" /><stop offset="1" stopColor="#c9bfa8" /></radialGradient>
      <radialGradient id="z88i" cx=".4" cy=".35"><stop stopColor="#a2d2ff" /><stop offset=".5" stopColor="#3a86ff" /><stop offset="1" stopColor="#1d3557" /></radialGradient>
      <radialGradient id="z88g" cx=".35" cy=".3"><stop stopColor="#e0fbfc" stopOpacity=".5" /><stop offset=".85" stopColor="#caf0f8" stopOpacity=".18" /><stop offset="1" stopColor="#fff" stopOpacity=".7" /></radialGradient>
      <linearGradient id="z88b" x2="1" y2="0"><stop stopColor="#6b4226" /><stop offset=".5" stopColor="#a0682f" /><stop offset="1" stopColor="#5a3417" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#z88s)" />
    <path d="M14 40Q60 6 106 40Q60 74 14 40Z" fill="url(#z88e)" /><circle cx="60" cy="40" r="16" fill="url(#z88i)" /><g stroke="#1d3557" strokeWidth=".4" opacity=".6">{Array.from({ length: 14 }, (_, i) => <line key={i} x1={60 + 8 * Math.cos(i * .45)} y1={40 + 8 * Math.sin(i * .45)} x2={60 + 15 * Math.cos(i * .45)} y2={40 + 15 * Math.sin(i * .45)} />)}</g>
    <circle cx="60" cy="40" r="7.4" fill="#000" /><circle cx="65" cy="35" r="3.4" fill="#fff" /><circle cx="56" cy="45" r="1.2" fill="#fff" opacity=".7" />
    <path d="M14 40Q60 6 106 40" stroke="#1d3557" strokeWidth="2.4" fill="none" /><path d="M14 40Q60 72 106 40" stroke="#1d3557" strokeWidth="1.2" fill="none" />
    <circle cx="60" cy="114" r="34" fill="#264653" opacity=".4" />
    <path d="M30 128q30-10 60 0" fill="#fff" /><path d="M28 132q32-6 64 0v4H28z" fill="#e9ecef" />
    <Pn x={42} y={128} s={.6} /><Pn x={80} y={128} s={.55} /><Pn x={70} y={126} s={.4} />
    <g transform="translate(60 120)"><circle cx="0" cy="-10" r="2.4" fill="#f1c27d" /><path d="M-2.4-8h4.8l1 9h-6.8z" fill="#e63946" /><path d="M2.4-6l5-6" stroke="#e63946" strokeWidth="1.4" strokeLinecap="round" /><path d="M-1 1v4M1 1v4" stroke="#264653" strokeWidth="1.2" /><path d="M-3-12q3-3 6 0" fill="#3a2a1a" /></g>
    <St p={[40, 96, 1, 50, 88, .8, 72, 92, 1, 80, 104, .9, 46, 110, .8, 68, 84, .7, 54, 100, .6, 86, 116, .7, 34, 116, .7]} />
    <circle cx="60" cy="112" r="34" fill="url(#z88g)" stroke="#fff" strokeWidth=".9" />
    <path d="M36 92q6-10 16-12" stroke="#fff" strokeWidth="2.4" fill="none" opacity=".55" strokeLinecap="round" />
    <path d="M24 140H96L90 158H30Z" fill="url(#z88b)" /><path d="M28 146h64" stroke="#3a2010" strokeWidth=".6" /><rect x="26" y="138" width="68" height="4" rx="1.6" fill="#a0682f" />
  </Svg>],

  [90, 'ทีวีเก่ากลางทุ่ง', <Svg>
    <defs>
      <linearGradient id="z90s" x2="0" y2="1"><stop stopColor="#adc178" /><stop offset="1" stopColor="#f0ead2" /></linearGradient>
      <linearGradient id="z90g" x2="0" y2="1"><stop stopColor="#a98467" /><stop offset="1" stopColor="#6c584c" /></linearGradient>
      <linearGradient id="z90t" x2="1" y2="1"><stop stopColor="#a0682f" /><stop offset="1" stopColor="#5a3417" /></linearGradient>
      <radialGradient id="z90c" cx=".5" cy=".45"><stop stopColor="#e9ecef" /><stop offset="1" stopColor="#868e96" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#z90s)" />
    <Cl x={24} y={30} s={.9} o={.8} /><Cl x={100} y={22} s={.7} o={.8} />
    <path d="M0 104Q60 96 120 106V160H0Z" fill="url(#z90g)" />
    <g stroke="#606c38" strokeWidth="1.3" strokeLinecap="round">{Array.from({ length: 24 }, (_, i) => { const x = (i * 37) % 118 + 1, y = 112 + (i * 17) % 46; return <path key={i} d={`M${x} ${y}q-1-6 0-10M${x + 2} ${y}q2-5 3-8`} fill="none" />; })}</g>
    <rect x="26" y="62" width="68" height="54" rx="7" fill="url(#z90t)" /><path d="M30 66h60" stroke="#c48a4a" strokeWidth=".8" opacity=".6" />
    <rect x="32" y="68" width="44" height="42" rx="5" fill="url(#z90c)" />
    <g>{Array.from({ length: 10 }, (_, i) => <rect key={i} x="34" y={70 + i * 3.8} width="40" height="1.4" fill={i % 2 ? '#adb5bd' : '#f8f9fa'} opacity=".7" />)}</g>
    <path d="M42 89Q54 79 66 89Q54 99 42 89Z" fill="#fff" stroke="#343a40" strokeWidth=".8" /><circle cx="54" cy="89" r="5" fill="#3a86ff" /><circle cx="54" cy="89" r="2.6" fill="#000" /><circle cx="55.6" cy="87.4" r="1" fill="#fff" />
    <path d="M36 72q6-4 14-4" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".6" strokeLinecap="round" />
    <g fill="#ddb892"><circle cx="85" cy="76" r="3.4" /><circle cx="85" cy="90" r="3.4" /></g><path d="M85 74v4M83 90h4" stroke="#6b4226" strokeWidth=".8" /><g fill="#5a3417">{[0, 1, 2, 3].map(i => <rect key={i} x="80" y={98 + i * 3} width="10" height="1.4" />)}</g>
    <path d="M50 62L38 42M70 62L84 44" stroke="#343a40" strokeWidth="1.2" /><circle cx="38" cy="42" r="1.6" fill="#343a40" /><circle cx="84" cy="44" r="1.6" fill="#343a40" />
    <rect x="32" y="116" width="5" height="10" fill="#3a2010" /><rect x="83" y="116" width="5" height="10" fill="#3a2010" />
    <path d="M94 100Q110 110 106 136" stroke="#343a40" strokeWidth="1" fill="none" /><path d="M104 136h4v3h-4z" fill="#343a40" />
    <g transform="translate(100 56)"><ellipse rx="4.4" ry="3" fill="#495057" /><circle cx="3.6" cy="-2" r="2" fill="#495057" /><polygon points="5.4,-2 8,-1.4 5.4,-1" fill="#f4a261" /><path d="M-1 3v3M1 3v3" stroke="#f4a261" strokeWidth=".6" /></g>
  </Svg>],

  [92, 'เพนกวินกลางทะเลทราย', <Svg>
    <defs>
      <linearGradient id="z92s" x2="0" y2="1"><stop stopColor="#ffb703" /><stop offset=".6" stopColor="#ffd166" /><stop offset="1" stopColor="#ffe8a3" /></linearGradient>
      <linearGradient id="z92d" x2="0" y2="1"><stop stopColor="#e9c46a" /><stop offset="1" stopColor="#c99a3a" /></linearGradient>
      <radialGradient id="z92u"><stop stopColor="#fffbe0" /><stop offset=".4" stopColor="#fff3b0" stopOpacity=".6" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
      <radialGradient id="z92p" cx=".4" cy=".3"><stop stopColor="#495057" /><stop offset="1" stopColor="#111" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#z92s)" />
    <circle cx="96" cy="24" r="32" fill="url(#z92u)" /><circle cx="96" cy="24" r="12" fill="#fffbe0" />
    <path d="M8 76q4-4 0-8t0-8M20 80q4-4 0-8" stroke="#fff" strokeWidth=".8" fill="none" opacity=".5" />
    <path d="M0 114Q40 98 80 110T120 104V160H0Z" fill="url(#z92d)" /><path d="M0 134Q40 120 80 134T120 128V160H0Z" fill="#b5843a" opacity=".5" />
    <g stroke="#a0732a" strokeWidth=".6" fill="none" opacity=".6"><path d="M10 140q10-3 20 0M70 148q10-3 20 0M90 124q8-2 16 0" /></g>
    <g transform="translate(18 116)"><rect x="-3" y="-34" width="6" height="34" rx="3" fill="#2a9d8f" /><path d="M-3-22h-6v-8M3-18h6v-10" stroke="#2a9d8f" strokeWidth="4.4" fill="none" strokeLinecap="round" /><g stroke="#e9f5db" strokeWidth=".5">{[-30, -24, -18, -12, -6].map(y => <path key={y} d={`M-3 ${y}l-2-1M3 ${y}l2-1`} />)}</g><circle cx="0" cy="-35" r="2" fill="#ff70a6" /></g>
    <path d="M62 62V38" stroke="#6c757d" strokeWidth="1.2" /><path d="M42 42Q62 22 82 42Z" fill="#7209b7" /><path d="M52 42Q62 22 72 42Z" fill="#f72585" /><path d="M42 42Q62 34 82 42" stroke="#560bad" fill="none" />
    <ellipse cx="62" cy="122" rx="16" ry="3" fill="#000" opacity=".15" />
    <ellipse cx="62" cy="96" rx="14" ry="21" fill="url(#z92p)" /><ellipse cx="62" cy="100" rx="9.6" ry="16" fill="#fff" />
    <circle cx="62" cy="72" r="9.6" fill="url(#z92p)" /><circle cx="58.6" cy="71" r="2" fill="#fff" /><circle cx="65.4" cy="71" r="2" fill="#fff" /><circle cx="59" cy="71.4" r="1" fill="#111" /><circle cx="65" cy="71.4" r="1" fill="#111" />
    <polygon points="59.6,75 64.4,75 62,79.6" fill="#f77f00" />
    <path d="M48 90q-6 8-4 16M76 90q6 8 4 16" stroke="url(#z92p)" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M76 88l-2-26" stroke="#111" strokeWidth="1.4" strokeLinecap="round" />
    <ellipse cx="55" cy="117" rx="4.6" ry="2" fill="#f77f00" /><ellipse cx="69" cy="117" rx="4.6" ry="2" fill="#f77f00" />
    <path d="M56 82q2 1 4 0" stroke="#5bc0eb" strokeWidth="1" fill="none" /><path d="M54 84q-1 3 0 5" stroke="#5bc0eb" strokeWidth=".8" fill="none" />
  </Svg>],

  [93, 'หนังสือบินเหมือนนก', <Svg>
    <defs>
      <linearGradient id="z93s" x2="0" y2="1"><stop stopColor="#bde0fe" /><stop offset="1" stopColor="#f8edeb" /></linearGradient>
      <linearGradient id="z93w" x2="1" y2="0"><stop stopColor="#5a3417" /><stop offset=".5" stopColor="#8b5a2b" /><stop offset="1" stopColor="#4a2a10" /></linearGradient>
      <linearGradient id="z93l" x2="1" y2="0"><stop stopColor="#a47148" /><stop offset=".5" stopColor="#d4a373" /><stop offset="1" stopColor="#8a5a2b" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#z93s)" />
    <rect x="0" y="40" width="32" height="120" fill="url(#z93w)" />
    {[0, 1, 2, 3].map(r => <g key={r}><rect x="0" y={66 + r * 26} width="32" height="3" fill="#3d2817" />{[0, 1, 2, 3, 4].map(c => <rect key={c} x={2 + c * 6} y={46 + r * 26 + (c % 2) * 3} width="5" height={20 - (c % 2) * 3} fill={['#e63946', '#457b9d', '#e9c46a', '#2a9d8f', '#6a4c93'][(c + r) % 5]} />)}</g>)}
    <g stroke="url(#z93l)" strokeWidth="2.4"><line x1="40" y1="160" x2="64" y2="28" /><line x1="52" y1="160" x2="76" y2="28" /></g><g stroke="#a47148" strokeWidth="1.8">{[0, 1, 2, 3, 4, 5, 6].map(i => <line key={i} x1={42 + i * 3.4} y1={148 - i * 18} x2={54 + i * 3.4} y2={148 - i * 18} />)}</g>
    <Cl x={70} y={24} s={1.5} o={.95} /><Cl x={104} y={46} s={1} o={.9} />
    {[[90, 62, '#e63946', 1.2], [102, 92, '#457b9d', 1], [82, 112, '#2a9d8f', 1.1], [108, 30, '#f4a261', .9], [92, 140, '#6a4c93', .8]].map(([x, y, c, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s}) rotate(${(i % 2 ? 10 : -10)})`}><path d="M0 0L-12-7L-12 3Z" fill={c} /><path d="M0 0L12-7L12 3Z" fill={c} /><path d="M-11-5L0 1L11-5" stroke="#fff" fill="none" strokeWidth=".7" /><path d="M-10-3l9 4M10-3l-9 4" stroke="#fff" strokeWidth=".4" opacity=".7" /></g>)}
    <g fill="#fff" opacity=".8">{[[96, 74], [86, 124]].map(([x, y], i) => <path key={i} d={`M${x} ${y}l2 2-2 1z`} />)}</g>
    <g transform="translate(62 50)"><circle cx="0" cy="-4" r="2.4" fill="#f1c27d" /><path d="M-2-2h4l.6 7h-5.2z" fill="#4361ee" /><path d="M2-1l6-6" stroke="#f1c27d" strokeWidth="1.2" strokeLinecap="round" /><path d="M-1 5l-1 4M1 5l1 4" stroke="#264653" strokeWidth="1.2" /></g>
  </Svg>],

  [94, 'ขนมปังกระโดดจากเครื่องปิ้ง', <Svg>
    <defs>
      <linearGradient id="z94s" x2="0" y2="1"><stop stopColor="#ffcad4" /><stop offset="1" stopColor="#f4acb7" /></linearGradient>
      <linearGradient id="z94m" x2="1" y2="0"><stop stopColor="#adb5bd" /><stop offset=".45" stopColor="#f8f9fa" /><stop offset="1" stopColor="#868e96" /></linearGradient>
      <linearGradient id="z94t" x2="0" y2="1"><stop stopColor="#e0a96d" /><stop offset="1" stopColor="#b5793a" /></linearGradient>
      <linearGradient id="z94b" x2="0" y2="1"><stop stopColor="#5e3a1a" /><stop offset="1" stopColor="#2a1608" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#z94s)" />
    <g stroke="#f8c3cf" strokeWidth="2">{[20, 40, 60, 80, 100].map(x => <path key={x} d={`M${x} 0V120`} />)}</g>
    <rect y="120" width="120" height="40" fill="#9d8189" /><path d="M0 120h120" stroke="#b5838d" strokeWidth="1.5" /><g stroke="#8a6e76" strokeWidth=".6">{[0, 1, 2, 3].map(i => <path key={i} d={`M${i * 34} 120l-6 40`} />)}</g>
    <ellipse cx="60" cy="122" rx="40" ry="3" fill="#6d5058" opacity=".4" />
    <path d="M22 88H98Q102 88 102 94V122H18V94Q18 88 22 88Z" fill="url(#z94m)" /><path d="M24 92h72" stroke="#fff" strokeWidth="1.2" opacity=".7" />
    <rect x="32" y="85" width="22" height="4" rx="1.6" fill="#343a40" /><rect x="66" y="85" width="22" height="4" rx="1.6" fill="#343a40" />
    <rect x="100" y="100" width="6" height="5" rx="1" fill="#495057" /><circle cx="30" cy="110" r="3" fill="#e63946" /><g fill="#495057"><circle cx="42" cy="110" r="1.4" /><circle cx="48" cy="110" r="1.4" /></g>
    <rect x="22" y="122" width="6" height="3" rx="1" fill="#495057" /><rect x="92" y="122" width="6" height="3" rx="1" fill="#495057" />
    <g transform="rotate(-16 48 40)"><path d="M34 56V34a14 11 0 0 1 28 0V56Z" fill="url(#z94t)" /><path d="M37 54V35a11 8.6 0 0 1 22 0V54Z" fill="#fbe8c6" /><circle cx="43" cy="42" r="1.6" fill="#3a2a1a" /><circle cx="53" cy="42" r="1.6" fill="#3a2a1a" /><circle cx="43.5" cy="41.4" r=".5" fill="#fff" /><circle cx="53.5" cy="41.4" r=".5" fill="#fff" /><path d="M44 47q4 3 8 0" stroke="#3a2a1a" strokeWidth=".9" fill="none" /><circle cx="40" cy="46" r="1.6" fill="#ff8fa3" opacity=".6" /><circle cx="56" cy="46" r="1.6" fill="#ff8fa3" opacity=".6" /></g>
    <g transform="rotate(14 80 66)"><path d="M68 80V64a12 9 0 0 1 24 0V80Z" fill="url(#z94b)" /><path d="M72 70l4 4M84 66l-3 5M78 76l3-3" stroke="#120804" strokeWidth=".8" /><path d="M74 70q2-2 4 0M82 70q2-2 4 0" stroke="#ffb703" strokeWidth=".7" fill="none" /><path d="M76 76q4-2 8 0" stroke="#ffb703" strokeWidth=".7" fill="none" /></g>
    <g stroke="#adb5bd" strokeWidth="1" fill="none" opacity=".7"><path d="M80 52q4-4 2-10M86 50q4-4 2-8M74 54q-2-4 0-8" /></g>
    <path d="M30 70l-6-4M28 78h-6M92 56l6-4" stroke="#fff" strokeWidth="1" opacity=".7" />
  </Svg>],

  [102, 'ตู้จดหมายล้น', <Svg>
    <defs>
      <linearGradient id="z102s" x2="0" y2="1"><stop stopColor="#d8f3dc" /><stop offset="1" stopColor="#95d5b2" /></linearGradient>
      <linearGradient id="z102b" x2="1" y2="0"><stop stopColor="#1d3557" /><stop offset=".45" stopColor="#457b9d" /><stop offset="1" stopColor="#1d3557" /></linearGradient>
      <linearGradient id="z102p" x2="1" y2="0"><stop stopColor="#5a3417" /><stop offset=".5" stopColor="#8b5a2b" /><stop offset="1" stopColor="#4a2a10" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#z102s)" />
    <Cl x={96} y={24} s={.9} o={.85} /><g fill="#495057"><path d="M20 30q3-3 6 0q-3 1-6 0z" /></g>
    <g fill="#e9c46a" opacity=".5"><rect x="0" y="94" width="120" height="3" /><rect x="10" y="88" width="3" height="16" /><rect x="40" y="88" width="3" height="16" /><rect x="100" y="88" width="3" height="16" /></g>
    <rect x="56" y="78" width="7" height="74" fill="url(#z102p)" />
    <rect y="146" width="120" height="14" fill="#52b788" /><g stroke="#2d6a4f" strokeWidth="1">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 9 + 3} 148l-1-4M${i * 9 + 5} 148l1-4`} />)}</g>
    <path d="M34 58H84V84H34Z" fill="url(#z102b)" /><path d="M34 58a25 15 0 0 1 50 0" fill="#1d3557" /><path d="M38 60a21 11 0 0 1 42 0" fill="none" stroke="#5a8ab5" strokeWidth=".8" />
    <rect x="84" y="56" width="3" height="16" fill="#e63946" /><path d="M84 56h13v8H84z" fill="#e63946" /><path d="M86 58h9" stroke="#fff" strokeWidth=".6" opacity=".6" />
    <rect x="34" y="62" width="4" height="22" fill="#0d1b2a" opacity=".6" />
    {[[30, 60, -20, '#fff'], [40, 52, -8, '#fefae0'], [52, 50, 6, '#fff'], [26, 72, -32, '#ffe5ec'], [62, 52, 16, '#e0fbfc']].map(([x, y, r, c], i) => <g key={i} transform={`rotate(${r} ${x} ${y})`}><rect x={x - 10} y={y - 6.5} width="20" height="13" fill={c} stroke="#adb5bd" strokeWidth=".6" /><path d={`M${x - 10} ${y - 6.5}l10 7l10-7`} stroke="#adb5bd" strokeWidth=".6" fill="none" /><rect x={x + 5} y={y - 5} width="4" height="4" fill={i % 2 ? '#e63946' : '#457b9d'} opacity=".7" /></g>)}
    <g transform="rotate(22 30 130)"><rect x="18" y="124" width="24" height="15" fill="#fff" stroke="#adb5bd" strokeWidth=".6" /><path d="M18 124l12 8l12-8" stroke="#adb5bd" strokeWidth=".6" fill="none" /><path d="M30 136l-3.6-3.6a2.2 2.2 0 0 1 3.6-2.6a2.2 2.2 0 0 1 3.6 2.6z" fill="#e63946" /></g>
    <g transform="rotate(-12 92 136)"><rect x="82" y="130" width="20" height="13" fill="#fefae0" stroke="#adb5bd" strokeWidth=".6" /><path d="M82 130l10 7l10-7" stroke="#adb5bd" strokeWidth=".6" fill="none" /></g>
    <g transform="rotate(40 100 104)"><rect x="92" y="100" width="16" height="10" fill="#fff" stroke="#adb5bd" strokeWidth=".6" /></g>
  </Svg>],
];
