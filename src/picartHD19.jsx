// ภาพการ์ดแบบละเอียด ชุด 19 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD19 = [
  [133, 'สองคนบนม้านั่งกับร่มคันเดียว', <Svg>
    <defs>
      <linearGradient id="d133s" x2="0" y2="1"><stop stopColor="#ff9f68" /><stop offset=".6" stopColor="#ffcb69" /><stop offset="1" stopColor="#ffe8b6" /></linearGradient>
      <radialGradient id="d133u"><stop stopColor="#fff3c4" /><stop offset=".4" stopColor="#ffd166" stopOpacity=".6" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
      <linearGradient id="d133g" x2="0" y2="1"><stop stopColor="#8a9a5b" /><stop offset="1" stopColor="#5a6a3a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#d133s)" />
    <circle cx="60" cy="108" r="46" fill="url(#d133u)" /><circle cx="60" cy="108" r="18" fill="#fff3c4" opacity=".9" />
    <path d="M0 116L24 104L44 112L70 100L96 110L120 102V130H0Z" fill="#c56a4a" opacity=".5" />
    <rect y="126" width="120" height="34" fill="url(#d133g)" /><path d="M0 126h120" stroke="#a7b56a" strokeWidth="1.2" />
    <g stroke="#4a5a2a" strokeWidth="1">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 9 + 3} ${132 + (i % 3) * 8}l-1-4M${i * 9 + 5} ${132 + (i % 3) * 8}l1-4`} />)}</g>
    <g fill="#3d2b1f"><rect x="20" y="110" width="80" height="5" rx="1" /><rect x="20" y="96" width="80" height="4" rx="1" /><rect x="26" y="115" width="4" height="12" /><rect x="90" y="115" width="4" height="12" /><path d="M24 96v14M96 96v14" stroke="#3d2b1f" strokeWidth="2.4" /></g>
    <g fill="#2b1a10"><circle cx="40" cy="84" r="7" /><path d="M32 110q0-18 8-18t8 18z" /><path d="M33 82q7-9 14 0q-2-5-7-5t-7 5z" /><circle cx="80" cy="86" r="6" /><path d="M73 110q0-16 7-16t7 16z" /></g>
    <path d="M47 100l14 0" stroke="#2b1a10" strokeWidth="3" strokeLinecap="round" />
    <path d="M62 100V60" stroke="#2b1a10" strokeWidth="1.6" /><path d="M38 62Q62 36 86 62Z" fill="#2b1a10" /><path d="M38 62q6-4 12 0t12 0t12 0t12 0" fill="#2b1a10" />
    <path d="M44 56Q62 42 80 56" stroke="#ffd166" strokeWidth=".6" fill="none" opacity=".5" />
    <g fill="#3d2b1f"><path d="M14 40q3-3 6 0q-3 1-6 0z" /><path d="M22 34q2-2 4 0q-2 1-4 0z" /></g>
  </Svg>],

  [134, 'จักรยานกับตะกร้าดอกไม้', <Svg>
    <defs>
      <linearGradient id="d134w" x2="0" y2="1"><stop stopColor="#f2cc8f" /><stop offset="1" stopColor="#e9b872" /></linearGradient>
      <linearGradient id="d134f" x2="0" y2="1"><stop stopColor="#adb5bd" /><stop offset="1" stopColor="#868e96" /></linearGradient>
      <radialGradient id="d134l" cx=".9" cy="0"><stop stopColor="#fff8dc" stopOpacity=".8" /><stop offset="1" stopColor="#fff8dc" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#d134w)" />
    <g stroke="#d4a373" strokeWidth=".8">{Array.from({ length: 10 }, (_, i) => <path key={i} d={`M0 ${i * 12 + 6}h120`} />)}{Array.from({ length: 40 }, (_, i) => <path key={'v' + i} d={`M${(i % 5) * 24 + ((i / 5 | 0) % 2) * 12} ${(i / 5 | 0) * 12 + 6}v12`} />)}</g>
    <rect width="120" height="160" fill="url(#d134l)" />
    <rect x="70" y="18" width="34" height="42" fill="#bde0fe" /><path d="M87 18v42M70 39h34" stroke="#6b4226" strokeWidth="2" /><rect x="68" y="16" width="38" height="46" fill="none" stroke="#6b4226" strokeWidth="2.4" /><rect x="66" y="60" width="42" height="4" fill="#6b4226" />
    <g fill="#e63946"><circle cx="76" cy="58" r="3" /><circle cx="82" cy="56" r="3" /></g><path d="M74 62h14" stroke="#55a630" strokeWidth="1.4" />
    <rect y="120" width="120" height="40" fill="url(#d134f)" /><path d="M0 120h120" stroke="#ced4da" strokeWidth="1.2" />
    <ellipse cx="60" cy="140" rx="42" ry="3" fill="#495057" opacity=".4" />
    <g stroke="#264653" strokeWidth="2.6" fill="none"><circle cx="30" cy="124" r="16" /><circle cx="90" cy="124" r="16" /><path d="M30 124L50 96H80L90 124M50 96L60 124H30M60 124L80 96M46 92h10M80 96L76 82h9" strokeLinejoin="round" /></g>
    <g stroke="#adb5bd" strokeWidth=".5">{Array.from({ length: 8 }, (_, i) => <g key={i}><line x1="30" y1="124" x2={30 + 15 * Math.cos(i * .785)} y2={124 + 15 * Math.sin(i * .785)} /><line x1="90" y1="124" x2={90 + 15 * Math.cos(i * .785)} y2={124 + 15 * Math.sin(i * .785)} /></g>)}</g>
    <circle cx="60" cy="124" r="3" fill="#264653" /><path d="M44 90h14" stroke="#3a2a1a" strokeWidth="3.4" strokeLinecap="round" />
    <path d="M78 72H100L96 88H82Z" fill="#c48a4a" /><g stroke="#8a5a2b" strokeWidth=".7">{[80, 84, 88, 92, 96].map(x => <path key={x} d={`M${x} 72l${x < 89 ? .8 : -.8} 16`} />)}<path d="M79 78h20M80 83h18" /></g>
    {[[82, 68, '#e63946'], [90, 66, '#ffd166'], [96, 70, '#ff70a6'], [86, 64, '#8338ec'], [94, 62, '#e63946']].map(([x, y, c], i) => <g key={i}>{[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx={x} cy={y - 2.2} rx="1.6" ry="2.4" fill={c} transform={`rotate(${a} ${x} ${y})`} />)}<circle cx={x} cy={y} r="1" fill="#fff3b0" /></g>)}
    <path d="M80 72q-2-4 0-6M98 72q2-6 4-6" stroke="#55a630" strokeWidth="1.2" fill="none" />
  </Svg>],

  [135, 'เรือผีในขวดกลางพายุ', <Svg>
    <defs>
      <linearGradient id="d135s" x2="0" y2="1"><stop stopColor="#0b0c10" /><stop offset="1" stopColor="#343a40" /></linearGradient>
      <radialGradient id="d135b" cx=".35" cy=".3"><stop stopColor="#e0fbfc" stopOpacity=".25" /><stop offset=".8" stopColor="#90e0ef" stopOpacity=".12" /><stop offset="1" stopColor="#caf0f8" stopOpacity=".5" /></radialGradient>
      <linearGradient id="d135w" x2="0" y2="1"><stop stopColor="#1d3557" /><stop offset="1" stopColor="#0b1a2e" /></linearGradient>
      <radialGradient id="d135g"><stop stopColor="#80ffdb" stopOpacity=".5" /><stop offset="1" stopColor="#80ffdb" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#d135s)" />
    <g fill="#212529"><circle cx="20" cy="10" r="20" /><circle cx="60" cy="4" r="22" /><circle cx="100" cy="12" r="20" /></g>
    <polygon points="24,22 16,40 23,40 16,56 32,34 25,34 30,22" fill="#ffd60a" />
    <g stroke="#adb5bd" strokeWidth=".6" opacity=".6">{Array.from({ length: 22 }, (_, i) => <line key={i} x1={(i * 47) % 120} y1={(i * 31) % 150} x2={(i * 47) % 120 - 4} y2={(i * 31) % 150 + 10} />)}</g>
    <rect y="138" width="120" height="22" fill="#212529" /><path d="M0 138h120" stroke="#495057" />
    <g transform="rotate(-14 60 96)">
      <circle cx="56" cy="92" r="30" fill="url(#d135g)" />
      <path d="M14 74Q14 62 30 62H86Q100 62 100 74V112Q100 124 86 124H30Q14 124 14 112Z" fill="url(#d135b)" stroke="#e9ecef" strokeWidth=".9" />
      <path d="M100 80h10v28h-10" fill="url(#d135b)" stroke="#e9ecef" strokeWidth=".9" /><rect x="110" y="82" width="7" height="24" rx="1.6" fill="#8d6e63" /><path d="M112 82v24M115 82v24" stroke="#6d4c41" strokeWidth=".5" />
      <path d="M16 104q10-6 20 0t20 0t20 0t20 0V114q-2 8-12 8H30q-12 0-14-8Z" fill="url(#d135w)" opacity=".9" /><path d="M16 104q10-6 20 0t20 0t20 0t20 0" stroke="#90e0ef" strokeWidth=".8" fill="none" />
      <path d="M34 102H82L76 110H40Z" fill="#2b1d12" /><path d="M58 102V68M44 102V76M72 102V78" stroke="#2b1d12" strokeWidth="1.2" />
      <path d="M58 70L76 80L60 92ZM44 78L56 86L44 96ZM72 80L82 88L72 96Z" fill="#e0e1dd" opacity=".6" /><path d="M58 70l18 10" stroke="#e0e1dd" strokeWidth=".4" opacity=".7" />
      <path d="M58 68l6 2-6 2z" fill="#80ffdb" /><g fill="#80ffdb">{[[46, 106], [62, 106], [72, 106]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".8" />)}</g>
      <path d="M20 70q10-6 24-6" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".5" strokeLinecap="round" /></g>
  </Svg>],

  [136, 'มือติดในโหลคุกกี้', <Svg>
    <defs>
      <linearGradient id="d136s" x2="0" y2="1"><stop stopColor="#fff3e0" /><stop offset="1" stopColor="#ffe0b2" /></linearGradient>
      <radialGradient id="d136j" cx=".35" cy=".3"><stop stopColor="#e0fbfc" stopOpacity=".55" /><stop offset=".8" stopColor="#90e0ef" stopOpacity=".3" /><stop offset="1" stopColor="#caf0f8" stopOpacity=".7" /></radialGradient>
      <radialGradient id="d136c" cx=".4" cy=".35"><stop stopColor="#e9c48a" /><stop offset="1" stopColor="#b5793a" /></radialGradient>
      <linearGradient id="d136h" x2="1" y2="0"><stop stopColor="#e0a878" /><stop offset=".5" stopColor="#f6cfae" /><stop offset="1" stopColor="#d18c5c" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#d136s)" />
    <g stroke="#ffd6a5" strokeWidth=".8">{[20, 40, 60, 80, 100].map(y => <path key={y} d={`M0 ${y}h120`} />)}</g>
    <rect y="124" width="120" height="36" fill="#bc8a5f" /><path d="M0 124h120" stroke="#dda15e" strokeWidth="1.5" /><g stroke="#8a5a2b" strokeWidth=".5"><path d="M0 136q60-4 120 0M0 148q60-4 120 0" fill="none" /></g>
    <ellipse cx="60" cy="126" rx="30" ry="3" fill="#6b4226" opacity=".4" />
    <g transform="rotate(24 100 60)"><rect x="80" y="54" width="44" height="9" rx="3" fill="#e76f51" /><rect x="96" y="49" width="12" height="5" rx="2" fill="#c44536" /></g>
    {[[44, 112], [60, 116], [74, 108], [52, 98], [70, 94], [40, 100], [62, 104]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="7.4" fill="url(#d136c)" /><g fill="#5e3a1a">{[[-2, -2], [2, 1], [-1, 3], [3, -3]].map(([a, b], k) => <circle key={k} cx={x + a} cy={y + b} r=".9" />)}</g></g>)}
    <path d="M50 62L54 86Q58 94 66 88L70 62" fill="url(#d136h)" /><path d="M52 80q6 4 14 0" stroke="#b97a50" strokeWidth=".7" fill="none" />
    <g fill="url(#d136h)"><ellipse cx="54" cy="88" rx="3" ry="5" transform="rotate(-20 54 88)" /><ellipse cx="66" cy="90" rx="3" ry="5" transform="rotate(20 66 90)" /></g>
    <path d="M46 4L50 62H70L74 4Z" fill="#4361ee" /><path d="M48 58H72" stroke="#3a0ca3" strokeWidth="3" /><path d="M54 10v46M66 10v46" stroke="#3f37c9" strokeWidth=".6" />
    <path d="M32 124V70Q32 62 40 62H80Q88 62 88 70V124Z" fill="url(#d136j)" stroke="#e0fbfc" strokeWidth="1" />
    <path d="M38 70Q38 66 44 66" stroke="#fff" strokeWidth="2" fill="none" opacity=".7" strokeLinecap="round" /><path d="M84 80v30" stroke="#fff" strokeWidth="1" opacity=".5" />
    <path d="M22 30l-6-4M20 40h-8M98 30l6-4M100 40h8" stroke="#6c757d" strokeWidth="1.4" strokeLinecap="round" />
    <g fill="#5e3a1a" opacity=".6"><circle cx="20" cy="130" r="1" /><circle cx="96" cy="134" r="1.4" /></g>
  </Svg>],

  [137, 'ร่มชายหาดกลางหิมะ', <Svg>
    <defs>
      <linearGradient id="d137s" x2="0" y2="1"><stop stopColor="#adb5bd" /><stop offset="1" stopColor="#e9ecef" /></linearGradient>
      <linearGradient id="d137u" x2="1" y2="0"><stop stopColor="#c9184a" /><stop offset=".5" stopColor="#ff4d6d" /><stop offset="1" stopColor="#a4133c" /></linearGradient>
      <linearGradient id="d137n" x2="0" y2="1"><stop stopColor="#fff" /><stop offset="1" stopColor="#dbe4ee" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#d137s)" />
    <path d="M0 80L24 66L44 76L70 60L96 72L120 64V100H0Z" fill="#ced4da" />
    <path d="M0 104Q60 92 120 106V160H0Z" fill="url(#d137n)" /><path d="M0 110Q60 98 120 112" stroke="#dbe4ee" fill="none" />
    <g fill="#fff">{Array.from({ length: 34 }, (_, i) => <circle key={i} cx={(i * 43) % 118 + 1} cy={(i * 29) % 150 + 4} r={i % 3 ? 1 : 1.6} />)}</g>
    <ellipse cx="60" cy="128" rx="30" ry="4" fill="#adb5bd" opacity=".4" />
    <line x1="64" y1="56" x2="56" y2="128" stroke="#6c757d" strokeWidth="2" />
    <path d="M28 66Q60 30 98 58Z" fill="url(#d137u)" /><path d="M46 46Q56 44 62 58L80 44Q76 40 72 40Z" fill="#fff" /><path d="M28 66Q60 48 98 58" stroke="#fff" strokeWidth="1" fill="none" />
    <path d="M28 66q2-4 0-8M98 58q2 4 0 6" stroke="#fff" strokeWidth=".6" fill="none" />
    <path d="M40 46q12-8 28-8" stroke="#fff" strokeWidth="3" fill="none" opacity=".9" />
    <path d="M22 118H58L56 128H24Z" fill="#ffd166" /><path d="M22 118H58" stroke="#fff" strokeWidth="2" /><g stroke="#f4a261" strokeWidth=".7">{[28, 34, 40, 46, 52].map(x => <path key={x} d={`M${x} 119v8`} />)}</g>
    <path d="M72 120q4-6 12-4q2 6-6 8z" fill="#f4a261" /><path d="M76 118l4 4" stroke="#fff" strokeWidth=".6" />
    <g><circle cx="96" cy="120" r="7" fill="url(#d137n)" stroke="#dbe4ee" /><circle cx="96" cy="108" r="5" fill="url(#d137n)" stroke="#dbe4ee" /><path d="M94 107h1M98 107h1" stroke="#222" strokeWidth="1" /><polygon points="96,109 101,110 96,111" fill="#f77f00" /><path d="M90 102h12l-2-4h-8z" fill="#06d6a0" /></g>
    <g fill="#495057"><rect x="30" y="112" width="12" height="6" rx="3" fill="#90e0ef" /></g>
  </Svg>],

  [138, 'กังหันลมบนเนิน', <Svg>
    <defs>
      <linearGradient id="d138s" x2="0" y2="1"><stop stopColor="#90e0ef" /><stop offset="1" stopColor="#e0fbfc" /></linearGradient>
      <linearGradient id="d138g" x2="0" y2="1"><stop stopColor="#52b69a" /><stop offset="1" stopColor="#1a759f" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#d138s)" />
    <Cl x={24} y={26} s={1.1} /><Cl x={98} y={46} s={.8} />
    <path d="M0 120Q60 82 120 120V160H0Z" fill="url(#d138g)" /><path d="M0 132Q60 104 120 132V160H0Z" fill="#168aad" opacity=".5" />
    <g stroke="#b5e48c" strokeWidth="1.2" strokeLinecap="round">{Array.from({ length: 20 }, (_, i) => { const x = i * 6 + 2, y = 108 - Math.sin(i / 19 * Math.PI) * 14 + (i % 3) * 4; return <path key={i} d={`M${x} ${y + 6}q${i % 2 ? 2 : -2}-4 ${i % 2 ? 4 : -1}-7`} fill="none" />; })}</g>
    <line x1="60" y1="62" x2="60" y2="102" stroke="#495057" strokeWidth="1.6" />
    <g transform="translate(60 62) rotate(18)">{[['#ef476f', 0], ['#ffd166', 90], ['#118ab2', 180], ['#06d6a0', 270]].map(([c, a], i) => <g key={i} transform={`rotate(${a})`}><path d="M0 0L0-20L11-9Z" fill={c} /><path d="M0 0L0-20L5-14Z" fill="#fff" opacity=".3" /></g>)}<circle r="2.4" fill="#fff" /><circle r="1" fill="#495057" /></g>
    <g stroke="#fff" strokeWidth="1.2" fill="none" opacity=".85" strokeLinecap="round"><path d="M86 56q10-4 22 0" /><path d="M80 66q14-4 30 0" /><path d="M90 76q8-3 18 0" /><path d="M14 70q8-3 16 0" /></g>
    <g fill="#ff70a6">{[[20, 112], [96, 108], [44, 122]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="1.6" /><circle cx={x} cy={y} r=".6" fill="#ffd166" /></g>)}</g>
    <g transform="translate(96 30) rotate(-20)"><path d="M0 0q4-4 8 0q-4 4-8 0z" fill="#80b918" /></g>
  </Svg>],

  [139, 'คลื่นยักษ์กับนักโต้คลื่น', <Svg>
    <defs>
      <linearGradient id="d139s" x2="0" y2="1"><stop stopColor="#ffd6a5" /><stop offset="1" stopColor="#caf0f8" /></linearGradient>
      <linearGradient id="d139w" x2="1" y2="1"><stop stopColor="#0096c7" /><stop offset=".6" stopColor="#023e8a" /><stop offset="1" stopColor="#03045e" /></linearGradient>
      <linearGradient id="d139i" x2="0" y2="1"><stop stopColor="#90e0ef" /><stop offset="1" stopColor="#0077b6" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#d139s)" />
    <circle cx="24" cy="24" r="11" fill="#fff3c4" />
    <path d="M0 160V96Q16 56 56 38Q96 22 116 46Q120 64 102 62Q86 58 88 72Q92 86 108 84V160Z" fill="url(#d139w)" />
    <path d="M56 38Q96 22 116 46Q120 64 102 62Q86 58 88 72" stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" />
    <path d="M102 62q-6 6-4 12M108 56q6 2 8 8M114 50l4-2" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    <g fill="#fff">{[[110, 66, 1.4], [116, 58, 1], [98, 78, 1.2], [104, 74, .8], [120, 46, 1]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <path d="M22 84Q46 58 72 50M14 110Q40 84 72 78M10 134Q40 112 84 104" stroke="url(#d139i)" strokeWidth="3" fill="none" opacity=".7" />
    <path d="M30 70Q50 54 70 48" stroke="#caf0f8" strokeWidth=".8" fill="none" opacity=".6" />
    <g transform="rotate(-26 48 118)"><ellipse cx="48" cy="124" rx="14" ry="2.8" fill="#ffd166" /><path d="M36 124h24" stroke="#f77f00" strokeWidth=".8" /><circle cx="48" cy="106" r="3" fill="#212529" /><path d="M48 109v9l-5 5M48 118l5 5" stroke="#212529" strokeWidth="2.2" fill="none" strokeLinecap="round" /><path d="M48 111l-7-3M48 111l7-5" stroke="#212529" strokeWidth="2" strokeLinecap="round" /></g>
    <path d="M30 132q10 2 30-4" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".8" />
    <g fill="#212529"><path d="M80 18q3-3 6 0q-3 1-6 0z" /><path d="M88 12q2-2 4 0q-2 1-4 0z" /></g>
  </Svg>],

  [140, 'หอนาฬิกาที่หน้าปัดเป็นพระจันทร์', <Svg>
    <defs>
      <linearGradient id="d140s" x2="0" y2="1"><stop stopColor="#10002b" /><stop offset="1" stopColor="#3c096c" /></linearGradient>
      <linearGradient id="d140t" x2="1" y2="0"><stop stopColor="#1a0033" /><stop offset=".5" stopColor="#3c096c" /><stop offset="1" stopColor="#10002b" /></linearGradient>
      <radialGradient id="d140m" cx=".35" cy=".35"><stop stopColor="#fffbe6" /><stop offset="1" stopColor="#efdf9e" /></radialGradient>
      <radialGradient id="d140g"><stop stopColor="#fff4c2" stopOpacity=".55" /><stop offset="1" stopColor="#fff4c2" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#d140s)" />
    <St p={[8, 10, .6, 24, 40, .5, 100, 14, .7, 110, 60, .5, 16, 72, .5, 96, 90, .4, 40, 20, .4]} />
    <path d="M0 160V120L14 112L26 120V160ZM96 160V114L110 104L120 110V160Z" fill="#0a0018" />
    <path d="M38 160V64L60 30L82 64V160Z" fill="url(#d140t)" />
    <path d="M34 66H86V60H34Z" fill="#10002b" /><g fill="#5a189a">{[36, 44, 52, 60, 68, 76].map(x => <rect key={x} x={x} y="56" width="5" height="4" />)}</g>
    <path d="M56 18h8l-4-14z" fill="url(#d140t)" /><path d="M60 4v-4" stroke="#c77dff" />
    <circle cx="60" cy="84" r="36" fill="url(#d140g)" />
    <circle cx="60" cy="84" r="17" fill="#240046" /><circle cx="60" cy="84" r="15" fill="url(#d140m)" />
    {Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return <line key={i} x1={60 + 12 * Math.cos(a)} y1={84 + 12 * Math.sin(a)} x2={60 + 14 * Math.cos(a)} y2={84 + 14 * Math.sin(a)} stroke="#5a189a" strokeWidth={i % 3 ? .6 : 1.2} />; })}
    <g fill="#e6d48c" opacity=".7"><circle cx="54" cy="90" r="2.4" /><circle cx="66" cy="78" r="1.8" /><circle cx="64" cy="92" r="1.2" /></g>
    <path d="M60 84V74M60 84l7 4" stroke="#3c096c" strokeWidth="1.8" strokeLinecap="round" /><circle cx="60" cy="84" r="1.4" fill="#3c096c" />
    <rect x="52" y="120" width="16" height="22" rx="8" fill="#ffd166" opacity=".7" /><path d="M60 120v22M52 130h16" stroke="#3c096c" strokeWidth="1" />
    <path d="M54 160v-12a6 6 0 0 1 12 0v12z" fill="#10002b" />
    <g fill="#000">{[[92, 40, 1], [100, 48, .7], [86, 52, .6]].map(([x, y, s], i) => <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d="M-6 0Q-3-4 0 0Q3-4 6 0" stroke="#000" strokeWidth="1.4" fill="none" />)}</g>
  </Svg>],
];
