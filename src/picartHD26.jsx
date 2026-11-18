// ภาพการ์ดแบบละเอียด ชุด 26 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD26 = [
  [195, 'ลูกโป่งหมากฝรั่งพาลอย', <Svg>
    <defs>
      <linearGradient id="k195s" x2="0" y2="1"><stop stopColor="#a2d2ff" /><stop offset="1" stopColor="#ffc8dd" /></linearGradient>
      <radialGradient id="k195b" cx=".35" cy=".3"><stop stopColor="#ffd6e7" /><stop offset=".6" stopColor="#ff70a6" /><stop offset="1" stopColor="#d6336c" /></radialGradient>
      <linearGradient id="k195g" x2="0" y2="1"><stop stopColor="#90be6d" /><stop offset="1" stopColor="#55a630" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k195s)" />
    <Cl x={20} y={30} /><Cl x={102} y={50} s={.8} /><Cl x={92} y={110} s={.7} o={.8} />
    <circle cx="60" cy="54" r="32" fill="url(#k195b)" /><ellipse cx="48" cy="40" rx="7" ry="11" fill="#fff" opacity=".45" transform="rotate(-20 48 40)" /><circle cx="70" cy="70" r="2" fill="#fff" opacity=".4" />
    <path d="M30 60q-4-10 0-18" stroke="#ff8fc7" strokeWidth=".8" fill="none" opacity=".6" />
    <path d="M56 86q4 2 8 0l-1 3h-6z" fill="#ff70a6" />
    <circle cx="60" cy="96" r="8.6" fill="#f1c27d" /><path d="M51 94q9-12 18 0q-2-7-9-7t-9 7z" fill="#5a3e2b" /><circle cx="56.6" cy="96" r="1" fill="#222" /><circle cx="63.4" cy="96" r="1" fill="#222" /><circle cx="54" cy="99" r="1.6" fill="#ff8fa3" opacity=".6" /><circle cx="66" cy="99" r="1.6" fill="#ff8fa3" opacity=".6" />
    <path d="M51 106h18l2 20H49z" fill="#4361ee" /><path d="M51 112h18" stroke="#3a0ca3" strokeWidth=".8" /><circle cx="60" cy="116" r="1.4" fill="#ffd60a" />
    <path d="M52 110l-10-8M68 110l10-8" stroke="#f1c27d" strokeWidth="3.2" strokeLinecap="round" /><path d="M53 126l-4 14M67 126l4 14" stroke="#264653" strokeWidth="3.4" strokeLinecap="round" /><path d="M46 140h6M68 140h6" stroke="#e63946" strokeWidth="3" strokeLinecap="round" />
    <path d="M0 150Q60 140 120 150V160H0Z" fill="url(#k195g)" /><g stroke="#386641" strokeWidth="1">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 10 + 3} 152l-1-4M${i * 10 + 5} 152l1-4`} />)}</g>
    <ellipse cx="60" cy="152" rx="12" ry="2" fill="#386641" opacity=".5" />
    <g fill="#495057"><path d="M88 22q3-3 6 0q-3 1-6 0z" /></g>
  </Svg>],

  [196, 'ลูกโป่งแดงในฝูงร่ม', <Svg>
    <defs>
      <linearGradient id="k196s" x2="0" y2="1"><stop stopColor="#6c757d" /><stop offset="1" stopColor="#343a40" /></linearGradient>
      <radialGradient id="k196u" cx=".4" cy=".35"><stop stopColor="#495057" /><stop offset="1" stopColor="#1b1f23" /></radialGradient>
      <radialGradient id="k196r" cx=".35" cy=".3"><stop stopColor="#ff8fa3" /><stop offset=".6" stopColor="#e63946" /><stop offset="1" stopColor="#9d0208" /></radialGradient>
      <radialGradient id="k196g"><stop stopColor="#e63946" stopOpacity=".35" /><stop offset="1" stopColor="#e63946" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k196s)" />
    <g stroke="#495057" strokeWidth=".7" opacity=".6">{Array.from({ length: 8 }, (_, i) => <path key={i} d={`M0 ${i * 20 + 10}h120`} />)}</g>
    {Array.from({ length: 22 }, (_, i) => { const r = i / 4 | 0, c = i % 4, x = 14 + c * 30 + (r % 2) * 14, y = 14 + r * 28; return <g key={i}><circle cx={x} cy={y} r="13" fill="url(#k196u)" />{Array.from({ length: 8 }, (_, k) => <line key={k} x1={x} y1={y} x2={x + 13 * Math.cos(k * .785)} y2={y + 13 * Math.sin(k * .785)} stroke="#6c757d" strokeWidth=".5" />)}<circle cx={x} cy={y} r="1.2" fill="#adb5bd" /></g>; })}
    <circle cx="62" cy="82" r="20" fill="url(#k196g)" />
    <circle cx="62" cy="82" r="9.6" fill="url(#k196r)" /><ellipse cx="58.6" cy="78.4" rx="2.4" ry="3.6" fill="#fff" opacity=".55" transform="rotate(-25 58.6 78.4)" /><path d="M62 92l-1.6 2.4h3.2z" fill="#9d0208" />
    <path d="M62 94q-2 6 1 10" stroke="#f8f9fa" strokeWidth=".5" fill="none" opacity=".7" />
    <g stroke="#adb5bd" strokeWidth=".5" opacity=".5">{Array.from({ length: 16 }, (_, i) => <line key={i} x1={(i * 37) % 120} y1={(i * 23) % 160} x2={(i * 37) % 120 - 2} y2={(i * 23) % 160 + 6} />)}</g>
  </Svg>],

  [198, 'ดวงตาในพงหญ้าสูง', <Svg>
    <defs>
      <linearGradient id="k198s" x2="0" y2="1"><stop stopColor="#d9ed92" /><stop offset="1" stopColor="#76c893" /></linearGradient>
      <radialGradient id="k198e" cx=".4" cy=".4"><stop stopColor="#fff3b0" /><stop offset=".5" stopColor="#ffd60a" /><stop offset="1" stopColor="#f48c06" /></radialGradient>
      <linearGradient id="k198d" x2="0" y2="1"><stop stopColor="#1e6091" stopOpacity="0" /><stop offset=".6" stopColor="#184e77" stopOpacity=".5" /><stop offset="1" stopColor="#0b2a40" stopOpacity=".8" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k198s)" />
    <circle cx="96" cy="22" r="12" fill="#fff3c4" opacity=".8" />
    {Array.from({ length: 34 }, (_, i) => <path key={i} d={`M${i * 3.7} 160Q${i * 3.7 + (i % 3 - 1) * 6} ${100 - (i % 5) * 10} ${i * 3.7 + (i % 2 ? 8 : -6)} ${46 + (i % 4) * 12}`} stroke={['#52b69a', '#34a0a4', '#168aad'][i % 3]} strokeWidth="2.6" fill="none" />)}
    <rect y="60" width="120" height="100" fill="url(#k198d)" />
    <g fill="#e09f3e" opacity=".7"><path d="M34 94l4-6 4 6M70 94l4-6 4 6" /></g>
    <g><path d="M38 96Q46 90 54 96Q46 101 38 96Z" fill="url(#k198e)" /><path d="M64 96Q72 90 80 96Q72 101 64 96Z" fill="url(#k198e)" /><ellipse cx="46" cy="96" rx="1.2" ry="3.6" fill="#000" /><ellipse cx="72" cy="96" rx="1.2" ry="3.6" fill="#000" /><circle cx="44.6" cy="94.6" r=".7" fill="#fff" /><circle cx="70.6" cy="94.6" r=".7" fill="#fff" /></g>
    <g stroke="#000" strokeWidth="1.4" opacity=".5"><path d="M36 92l4 2M82 92l-4 2" /></g>
    {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${6 + i * 7.4} 160Q${10 + i * 7.4} 124 ${4 + i * 7.4 + (i % 2 ? 6 : -4)} ${92 + (i % 3) * 8}`} stroke={i % 2 ? '#1e6091' : '#184e77'} strokeWidth="3" fill="none" />)}
    <g fill="#d9ed92" opacity=".7">{[[20, 60], [90, 66], [60, 50]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.6" ry="4" transform={`rotate(${i * 20 - 20} ${x} ${y})`} />)}</g>
    <g transform="translate(26 40)"><path d="M0 0q-5-6-8-2q3 4 8 2zM0 0q5-6 8-2q-3 4-8 2z" fill="#ffd166" /></g>
  </Svg>],

  [199, 'เงาต้นไม้ยามเช้า', <Svg>
    <defs>
      <linearGradient id="k199w" x2="0" y2="1"><stop stopColor="#ffe5d9" /><stop offset="1" stopColor="#fcd5ce" /></linearGradient>
      <linearGradient id="k199l" x2="1" y2="1"><stop stopColor="#fff3b0" stopOpacity=".55" /><stop offset="1" stopColor="#fff3b0" stopOpacity=".05" /></linearGradient>
      <linearGradient id="k199t" x2="0" y2="1"><stop stopColor="#e5989b" /><stop offset="1" stopColor="#b5838d" /></linearGradient>
      <linearGradient id="k199p" x2="1" y2="0"><stop stopColor="#a0522d" /><stop offset=".5" stopColor="#d08c60" /><stop offset="1" stopColor="#8a4a1e" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k199w)" />
    <rect x="2" y="2" width="30" height="40" fill="#fff8e7" stroke="#e5989b" strokeWidth="2" /><path d="M17 2v40M2 22h30" stroke="#e5989b" strokeWidth="1.4" />
    <polygon points="2,42 32,42 104,122 46,122" fill="url(#k199l)" />
    <g fill="#9d8189" opacity=".38" transform="translate(16 6)"><path d="M54 116Q50 86 60 66Q70 86 66 116Z" /><ellipse cx="44" cy="68" rx="15" ry="5" transform="rotate(-30 44 68)" /><ellipse cx="76" cy="62" rx="17" ry="5" transform="rotate(30 76 62)" /><ellipse cx="50" cy="48" rx="13" ry="4" transform="rotate(-50 50 48)" /><ellipse cx="70" cy="42" rx="13" ry="4" transform="rotate(50 70 42)" /><ellipse cx="60" cy="36" rx="4" ry="12" /></g>
    <rect y="120" width="120" height="40" fill="url(#k199t)" /><path d="M0 120h120" stroke="#ffcad4" strokeWidth="1.6" /><g stroke="#9d8189" strokeWidth=".5"><path d="M0 134q60-4 120 0M0 148q60-4 120 0" fill="none" /></g>
    <ellipse cx="49" cy="122" rx="14" ry="2" fill="#6d5058" opacity=".4" />
    <path d="M38 104H60L58 122H40Z" fill="url(#k199p)" /><rect x="36" y="102" width="26" height="4" rx="1" fill="#bc6c25" />
    <path d="M49 102q-4-14 2-24M49 100q8-10 14-8M49 96q-8-8-12-2M50 88q6-6 10-4" stroke="#55a630" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <g fill="#80b918">{[[51, 78, -20], [63, 92, 40], [37, 94, -50], [60, 84, 20], [46, 86, -30]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx="3.4" ry="6" transform={`rotate(${r} ${x} ${y})`} />)}</g>
    <g><path d="M82 108h16v14H82z" fill="#fff" stroke="#9d8189" strokeWidth=".8" /><path d="M98 111q6 0 6 4.4t-6 4.4" stroke="#9d8189" strokeWidth="1.2" fill="none" /><ellipse cx="90" cy="108" rx="8" ry="1.6" fill="#8a5a3b" /><path d="M86 102q2-4 0-8M92 102q2-4 0-8" stroke="#9d8189" strokeWidth=".7" fill="none" opacity=".6" /></g>
    <g fill="#fff8dc">{[[30, 60], [52, 72], [70, 96], [40, 84]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".7" opacity=".8" />)}</g>
  </Svg>],

  [200, 'ถนนดาวขึ้นฟ้า', <Svg>
    <defs>
      <linearGradient id="k200s" x2="0" y2="1"><stop stopColor="#03045e" /><stop offset=".6" stopColor="#5a189a" /><stop offset="1" stopColor="#c77dff" /></linearGradient>
      <linearGradient id="k200r" x2="0" y2="1"><stop stopColor="#e0aaff" stopOpacity=".6" /><stop offset="1" stopColor="#3a0ca3" /></linearGradient>
      <radialGradient id="k200g"><stop stopColor="#fff" stopOpacity=".8" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      <linearGradient id="k200c" x2="1" y2="1"><stop stopColor="#ff70a6" /><stop offset="1" stopColor="#c9184a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k200s)" />
    <St p={[8, 10, .6, 22, 30, .5, 40, 8, .7, 104, 24, .6, 112, 50, .5, 16, 60, .5, 100, 70, .4, 70, 30, .4, 30, 90, .4, 108, 96, .5]} />
    <circle cx="86" cy="10" r="20" fill="url(#k200g)" /><circle cx="86" cy="10" r="3" fill="#fff" />
    <path d="M28 160Q50 120 66 90Q80 60 76 30Q74 16 84 10H90Q82 18 84 30Q90 64 76 94Q64 124 64 160Z" fill="url(#k200r)" />
    <path d="M28 160Q50 120 66 90Q80 60 76 30Q74 16 84 10" stroke="#e0aaff" strokeWidth=".8" fill="none" /><path d="M64 160Q64 124 76 94Q90 64 84 30Q82 18 90 10" stroke="#e0aaff" strokeWidth=".8" fill="none" />
    <path d="M46 160Q58 122 71 92Q84 62 80 32Q79 20 87 11" stroke="#ffd60a" strokeWidth="1.4" strokeDasharray="4 4" fill="none" />
    <g fill="#fff">{[[54, 132], [64, 110], [76, 84], [82, 58], [80, 40], [84, 24]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 2}l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z`} />)}</g>
    <path d="M0 160V136L22 126L40 136V160ZM86 160V132L104 122L120 128V160Z" fill="#10002b" /><g fill="#ffd166">{[[14, 140], [24, 146], [98, 136], [108, 144]].map(([x, y], i) => <rect key={i} x={x} y={y} width="3.4" height="4" />)}</g>
    <g transform="translate(52 128) rotate(-34)"><rect x="-11" y="-5" width="22" height="9" rx="3.4" fill="url(#k200c)" /><path d="M-6-5l3-5.6h7l3 5.6z" fill="#4cc9f0" /><path d="M-2-10.6v5.6" stroke="#c9184a" /><circle cx="-6" cy="4" r="2.8" fill="#222" /><circle cx="6" cy="4" r="2.8" fill="#222" /><circle cx="-6" cy="4" r="1" fill="#adb5bd" /><circle cx="6" cy="4" r="1" fill="#adb5bd" /><circle cx="11" cy="-1" r="1.4" fill="#fff3b0" /></g>
    <path d="M60 120l14-12" stroke="#fff3b0" strokeWidth="3" opacity=".3" strokeLinecap="round" />
  </Svg>],
];
