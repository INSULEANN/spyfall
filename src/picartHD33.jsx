// ภาพการ์ดแบบละเอียด ชุด 33 (ภาพใหม่ 249–256) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD33 = [
  [249, 'ลามะใส่แว่นกันแดด', <Svg>
    <defs>
      <linearGradient id="k249s" x2="0" y2="1"><stop stopColor="#4cc9f0" /><stop offset="1" stopColor="#bde0fe" /></linearGradient>
      <linearGradient id="k249m" x2="0" y2="1"><stop stopColor="#8d99ae" /><stop offset="1" stopColor="#d6ccc2" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k249s)" />
    <circle cx="96" cy="24" r="12" fill="#ffd60a" /><circle cx="96" cy="24" r="20" fill="#ffd60a" opacity=".25" />
    <path d="M0 100L24 50l16 22 20 -36 26 44 18 -24 16 22V160H0z" fill="url(#k249m)" /><path d="M60 36l-8 14 8 -4 6 6zM24 50l-6 12 6 -2z" fill="#fff" />
    <path d="M0 118Q60 104 120 118V160H0Z" fill="#90be6d" /><g fill="#f9c74f">{[[10, 128], [104, 126], [20, 146], [96, 150]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" />)}</g>
    <g transform="translate(60 112)">
      <path d="M-18 4q-2 -16 16 -18h8q16 0 16 16v6h-40z" fill="#fefae0" stroke="#d4a373" strokeWidth=".8" />
      <g fill="#fefae0" stroke="#d4a373" strokeWidth=".6">{[-14, -6, 8, 16].map(x => <rect key={x} x={x - 2.4} y="8" width="4.8" height="22" rx="2" />)}</g>
      <path d="M-4 -12q-2 -24 4 -36q8 -2 10 6q2 16 -2 30z" fill="#fefae0" stroke="#d4a373" strokeWidth=".8" />
      <path d="M-2 -46l-2 -8 4 4zM6 -46l2 -8 -4 4z" fill="#fefae0" stroke="#d4a373" strokeWidth=".6" />
      <ellipse cx="6" cy="-40" rx="6" ry="4" fill="#fefae0" stroke="#d4a373" strokeWidth=".6" /><circle cx="9" cy="-39" r=".7" fill="#333" /><path d="M7 -36q2 1 3 0" stroke="#333" strokeWidth=".6" fill="none" />
      <path d="M-4 -44h14" stroke="#212529" strokeWidth="1" /><rect x="-4" y="-46" width="6" height="4" rx="1.4" fill="#212529" /><rect x="4" y="-46" width="6" height="4" rx="1.4" fill="#212529" /><path d="M-2 -45l2 -1" stroke="#fff" strokeWidth=".5" />
      <path d="M-4 -24h10v8h-10z" fill="#e63946" /><g fill="#ffd60a">{[-2, 2].map(x => <circle key={x} cx={x} cy="-20" r="1" />)}</g><path d="M-4 -16l-2 6M6 -16l2 6" stroke="#e63946" strokeWidth="1" />
      <path d="M-18 -4q-6 -6 -2 -10" stroke="#fefae0" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M-14 0q4 -6 12 -6q8 0 12 6" fill="none" stroke="#06d6a0" strokeWidth="2" /><path d="M-14 4h28" stroke="#ef476f" strokeWidth="2" />
    </g>
    <Cl x={24} y={30} s={.7} />
  </Svg>],

  [250, 'ปลาวาฬกระโดดข้ามสายรุ้ง', <Svg>
    <defs>
      <linearGradient id="k250s" x2="0" y2="1"><stop stopColor="#a2d2ff" /><stop offset="1" stopColor="#cdb4db" /></linearGradient>
      <linearGradient id="k250o" x2="0" y2="1"><stop stopColor="#00b4d8" /><stop offset="1" stopColor="#03045e" /></linearGradient>
      <linearGradient id="k250w" x2="0" y2="1"><stop stopColor="#4361ee" /><stop offset="1" stopColor="#3a0ca3" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k250s)" />
    <Cl x={20} y={20} s={.8} /><Cl x={100} y={30} s={.7} />
    {['#ff595e', '#ff924c', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'].map((c, i) => <path key={c} d={`M${-6 + i * 4} 116A${66 - i * 4} ${66 - i * 4} 0 0 1 ${126 - i * 4} 116`} stroke={c} strokeWidth="4" fill="none" />)}
    <rect y="110" width="120" height="50" fill="url(#k250o)" /><g stroke="#caf0f8" strokeWidth=".8" opacity=".7" fill="none">{[[8, 120], [70, 126], [30, 140], [90, 146]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q5 -2 10 0`} />)}</g>
    <g transform="translate(62 46) rotate(-24)">
      <path d="M-30 4Q-26 -16 4 -16Q28 -14 34 2Q30 14 4 14Q-20 14 -30 4z" fill="url(#k250w)" />
      <path d="M-28 6Q-10 16 30 6Q28 14 4 14Q-18 14 -28 6z" fill="#e9ecef" /><g stroke="#adb5bd" strokeWidth=".5">{[-14, -6, 2, 10, 18].map(x => <path key={x} d={`M${x} 9v4`} />)}</g>
      <circle cx="22" cy="-2" r="1.6" fill="#000" /><circle cx="22.6" cy="-2.6" r=".5" fill="#fff" />
      <path d="M-30 4q-12 -14 -8 -20q4 8 10 10q-2 -12 6 -14q-2 10 2 20z" fill="url(#k250w)" />
      <path d="M2 8q-2 10 -10 14q2 -8 4 -14z" fill="#3a0ca3" />
    </g>
    <g fill="#90e0ef"><path d="M28 104q-4 -10 2 -14q0 8 2 14z" /><path d="M96 110q4 -12 -2 -16q0 10 -2 16z" /></g>
    <g fill="#caf0f8">{[[30, 92], [34, 86], [92, 98], [88, 92], [26, 98]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1 + (i % 2) * .6} />)}</g>
  </Svg>],

  [251, 'ห้องครัวที่ผักเดินได้', <Svg>
    <defs>
      <linearGradient id="k251w" x2="0" y2="1"><stop stopColor="#fefae0" /><stop offset="1" stopColor="#faedcd" /></linearGradient>
      <pattern id="k251t" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#e9edc9" /><path d="M0 0h10v10" stroke="#ccd5ae" strokeWidth=".8" fill="none" /></pattern>
    </defs>
    <rect width="120" height="160" fill="url(#k251w)" />
    <rect y="0" width="120" height="70" fill="url(#k251t)" opacity=".8" />
    <rect x="0" y="96" width="120" height="64" fill="#d4a373" /><rect x="0" y="92" width="120" height="6" fill="#bc6c25" />
    <rect x="70" y="20" width="40" height="34" fill="#a2d2ff" stroke="#9c6644" strokeWidth="1.6" /><path d="M90 20v34M70 37h40" stroke="#9c6644" strokeWidth="1" />
    <g transform="translate(26 30)"><path d="M0 0v8" stroke="#495057" /><path d="M-10 8h20l-4 10h-12z" fill="#e63946" /><circle cy="20" r="4" fill="#fff3b0" opacity=".6" /></g>
    <g transform="translate(30 84)"><path d="M-6 8q-4 -14 0 -20q4 -4 8 0q4 8 0 20z" fill="#f77f00" /><path d="M-2 -12q-6 -6 -2 -10q2 4 4 8M2 -12q4 -6 8 -4q-4 2 -6 6" fill="#55a630" />
      <circle cx="-2" cy="-4" r="1" fill="#000" /><circle cx="2" cy="-4" r="1" fill="#000" /><path d="M-2 0q2 2 4 0" stroke="#000" strokeWidth=".6" fill="none" /><path d="M-4 8l-3 6M2 8l3 6" stroke="#f77f00" strokeWidth="1.6" strokeLinecap="round" /><path d="M-6 0l-6 -4M6 -2l6 -4" stroke="#f77f00" strokeWidth="1.4" strokeLinecap="round" /></g>
    <g transform="translate(58 82)"><circle r="9" fill="#e63946" /><path d="M-3 -9q3 -4 6 0l-3 2z" fill="#2d6a4f" /><path d="M0 -10v-3" stroke="#2d6a4f" strokeWidth="1.2" />
      <circle cx="-3" cy="-1" r="1.2" fill="#fff" /><circle cx="3" cy="-1" r="1.2" fill="#fff" /><circle cx="-3" cy="-1" r=".6" fill="#000" /><circle cx="3" cy="-1" r=".6" fill="#000" /><path d="M-3 4q3 3 6 0" stroke="#fff" strokeWidth=".8" fill="none" />
      <path d="M-4 8l-3 8M4 8l3 8" stroke="#2d6a4f" strokeWidth="1.6" strokeLinecap="round" /><path d="M-8 2l-6 -6M8 2l6 4" stroke="#2d6a4f" strokeWidth="1.4" strokeLinecap="round" /></g>
    <g transform="translate(88 80)"><path d="M-8 6q-4 -12 8 -16q12 4 8 16q-8 6 -16 0z" fill="#9d4edd" /><path d="M-2 -10q2 -6 6 -6" stroke="#55a630" strokeWidth="2" fill="none" />
      <circle cx="-2" cy="-2" r="1" fill="#fff" /><circle cx="3" cy="-2" r="1" fill="#fff" /><path d="M-2 2h5" stroke="#fff" strokeWidth=".8" />
      <path d="M-4 8l-2 8M4 8l2 8" stroke="#9d4edd" strokeWidth="1.6" strokeLinecap="round" /></g>
    <g transform="translate(60 128)"><ellipse rx="34" ry="8" fill="#fff" stroke="#adb5bd" strokeWidth="1" /><ellipse rx="26" ry="5" fill="#f8f9fa" /><path d="M-30 0h-10M30 0h10" stroke="#adb5bd" strokeWidth="2" strokeLinecap="round" /></g>
    <g transform="translate(16 118)"><rect x="-1" y="-20" width="2" height="20" fill="#adb5bd" /><path d="M-4 -24h8l-1 4h-6z" fill="#9c6644" /></g>
    <g fill="#55a630"><path d="M100 118q-6 -8 0 -12q6 4 0 12z" /><path d="M106 120q-4 -6 2 -10q4 4 -2 10z" /></g>
    <g fill="#333"><text x="48" y="60" fontSize="7" fontWeight="700">หนีเร็ว!</text></g>
  </Svg>],

  [252, 'พระอาทิตย์ใส่แว่นนอนอาบแดด', <Svg>
    <defs>
      <linearGradient id="k252s" x2="0" y2="1"><stop stopColor="#00b4d8" /><stop offset="1" stopColor="#90e0ef" /></linearGradient>
      <radialGradient id="k252u" cx=".4" cy=".35"><stop stopColor="#fff3b0" /><stop offset=".7" stopColor="#ffd60a" /><stop offset="1" stopColor="#f77f00" /></radialGradient>
      <linearGradient id="k252b" x2="0" y2="1"><stop stopColor="#ffe8a3" /><stop offset="1" stopColor="#e9c46a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k252s)" />
    <Cl x={20} y={24} s={.8} /><Cl x={96} y={20} s={.6} />
    <rect y="90" width="120" height="30" fill="#0077b6" /><g stroke="#caf0f8" strokeWidth=".8" opacity=".7" fill="none">{[[10, 98], [60, 104], [96, 96]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q5 -2 10 0`} />)}</g>
    <path d="M0 116Q60 104 120 116V160H0Z" fill="url(#k252b)" />
    <g transform="translate(60 120)"><path d="M-36 0l6 -8h60l6 8z" fill="#e63946" /><path d="M-30 -8l2 -4h56l2 4z" fill="#fff" /><path d="M-30 0v10M30 0v10" stroke="#9c6644" strokeWidth="2" /></g>
    <g transform="translate(60 92)">
      {Array.from({ length: 14 }, (_, i) => <path key={i} d="M0 -30l-3 -10h6z" fill="#ffb703" transform={`rotate(${i * 25.7})`} />)}
      <circle r="24" fill="url(#k252u)" />
      <path d="M-16 -4h12q2 6 -6 6q-6 0 -6 -6zM4 -4h12q0 6 -6 6q-8 0 -6 -6z" fill="#212529" /><path d="M-4 -3h8" stroke="#212529" strokeWidth="1.4" /><path d="M-14 -3l4 -1M6 -3l4 -1" stroke="#fff" strokeWidth=".8" />
      <path d="M-8 10q8 6 16 0" stroke="#e85d04" strokeWidth="1.6" fill="none" strokeLinecap="round" /><circle cx="-14" cy="6" r="3" fill="#ff8fab" opacity=".6" /><circle cx="14" cy="6" r="3" fill="#ff8fab" opacity=".6" />
    </g>
    <g transform="translate(96 108)"><path d="M0 0l-2 -22" stroke="#6f4518" strokeWidth="1.4" /><path d="M-18 -20q16 -14 32 0z" fill="#ef476f" /><path d="M-18 -20q4 -8 8 -9M14 -20q-4 -8 -8 -9" stroke="#fff" strokeWidth="1.6" fill="none" /></g>
    <g transform="translate(22 124)"><path d="M0 0h10l-1 12h-8z" fill="#caf0f8" opacity=".8" stroke="#adb5bd" strokeWidth=".6" /><path d="M2 2h6v6h-6z" fill="#ff9f1c" opacity=".8" /><path d="M6 0l4 -8" stroke="#ef476f" strokeWidth="1" /><circle cx="5" cy="0" r="2" fill="#80ed99" /></g>
    <g transform="translate(100 140)"><path d="M0 0q-2 -4 0 -6q4 0 4 4z" fill="#f4a261" /><path d="M-6 2q6 -6 12 0" fill="#e76f51" /></g>
  </Svg>],

  [253, 'นกฮูกเป็นตำรวจจราจร', <Svg>
    <defs>
      <linearGradient id="k253s" x2="0" y2="1"><stop stopColor="#14213d" /><stop offset="1" stopColor="#3d5a80" /></linearGradient>
      <radialGradient id="k253o" cx=".45" cy=".35"><stop stopColor="#d4a373" /><stop offset="1" stopColor="#7f5539" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k253s)" />
    <St p={[10, 12, .8, 30, 26, .6, 100, 14, .9, 110, 40, .6]} />
    <circle cx="96" cy="28" r="10" fill="#fefae0" />
    <rect y="110" width="120" height="50" fill="#343a40" /><g fill="#f8f9fa">{[0, 14, 28, 42, 56, 70, 84, 98, 112].map(x => <rect key={x} x={x} y="134" width="8" height="3" />)}</g>
    <g fill="#ffd60a" opacity=".9"><circle cx="10" cy="124" r="3" /><circle cx="22" cy="124" r="3" /></g><path d="M0 120h30v10H0z" fill="#e63946" opacity=".0" />
    <g transform="translate(14 124)"><rect x="-14" y="-6" width="26" height="12" rx="3" fill="#457b9d" /><circle cx="10" cy="0" r="2.4" fill="#fff3b0" /><circle cx="10" cy="0" r="6" fill="#fff3b0" opacity=".3" /><circle cx="-8" cy="7" r="3" fill="#212529" /><circle cx="6" cy="7" r="3" fill="#212529" /></g>
    <g transform="translate(64 96)">
      <rect x="-14" y="10" width="28" height="12" rx="2" fill="#f77f00" stroke="#9c6644" strokeWidth=".8" /><path d="M-14 14h28M-14 18h28" stroke="#fff" strokeWidth="1.4" />
      <ellipse cx="0" cy="-4" rx="16" ry="18" fill="url(#k253o)" /><ellipse cx="0" cy="2" rx="9" ry="10" fill="#fefae0" />
      <g stroke="#bc6c25" strokeWidth=".6" fill="none">{[-4, 0, 4].map(y => <path key={y} d={`M-5 ${y}q5 3 10 0`} />)}</g>
      <circle cx="-7" cy="-12" r="7" fill="#fff" stroke="#7f5539" strokeWidth="1" /><circle cx="7" cy="-12" r="7" fill="#fff" stroke="#7f5539" strokeWidth="1" />
      <circle cx="-7" cy="-12" r="3.4" fill="#ffb703" /><circle cx="7" cy="-12" r="3.4" fill="#ffb703" /><circle cx="-7" cy="-12" r="1.8" fill="#000" /><circle cx="7" cy="-12" r="1.8" fill="#000" />
      <path d="M-2 -6l2 4 2 -4z" fill="#ffb703" />
      <path d="M-14 -20h28l-2 -6h-24z" fill="#1d3557" /><rect x="-16" y="-20" width="32" height="3" rx="1" fill="#14213d" /><path d="M-2 -25h4v3h-4z" fill="#ffd60a" />
      <path d="M14 -4q12 -4 14 -14" stroke="#7f5539" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M28 -18l2 -6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M-14 -4q-8 4 -8 12" stroke="#7f5539" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M-4 22v4M4 22v4" stroke="#ffb703" strokeWidth="1.6" />
    </g>
    <g transform="translate(96 76)"><rect x="-1.4" y="0" width="2.8" height="34" fill="#495057" /><rect x="-6" y="-20" width="12" height="22" rx="2" fill="#212529" /><circle cy="-15" r="3" fill="#e63946" /><circle cy="-15" r="6" fill="#e63946" opacity=".3" /><circle cy="-8" r="3" fill="#5c4a00" /><circle cy="-1" r="3" fill="#1b4332" /></g>
    <g transform="translate(40 132)"><circle r="3" fill="#adb5bd" /><path d="M-3 -3l-1 -3M3 -3l1 -3" stroke="#adb5bd" strokeWidth="1" /><path d="M3 2q6 2 8 -2" stroke="#adb5bd" strokeWidth=".8" fill="none" /></g>
  </Svg>],

  [254, 'ร้านกาแฟของแมว', <Svg>
    <defs>
      <linearGradient id="k254w" x2="0" y2="1"><stop stopColor="#ffe8d6" /><stop offset="1" stopColor="#ddbea9" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k254w)" />
    <path d="M0 28h120v8H0z" fill="#6b705c" /><path d="M0 36q10 8 20 0t20 0t20 0t20 0t20 0t20 0" fill="#cb997e" />
    <rect x="8" y="48" width="44" height="50" fill="#a2d2ff" stroke="#6f4518" strokeWidth="2" /><path d="M30 48v50M8 73h44" stroke="#6f4518" strokeWidth="1.2" /><Cl x={22} y={60} s={.4} /><circle cx="44" cy="56" r="3" fill="#ffd166" />
    <g fill="#6f4518"><text x="66" y="56" fontSize="9" fontWeight="800" fontFamily="Mitr,sans-serif">ร้านเหมียว</text></g>
    <rect y="104" width="120" height="56" fill="#9c6644" /><rect y="100" width="120" height="6" fill="#7f5539" />
    <g transform="translate(86 92)"><rect x="-16" y="-4" width="32" height="12" rx="2" fill="#adb5bd" stroke="#495057" strokeWidth=".8" /><rect x="-10" y="-14" width="20" height="10" fill="#495057" /><circle cx="0" cy="-9" r="2.4" fill="#e63946" /><path d="M-4 8v4h8v-4" fill="#6c757d" /></g>
    <g transform="translate(46 88)">
      <path d="M-10 12q-2 -16 10 -16q12 0 10 16z" fill="#f4a261" />
      <circle cy="-10" r="10" fill="#f4a261" /><path d="M-8 -16l-2 -8 6 4zM8 -16l2 -8 -6 4z" fill="#f4a261" /><path d="M-7 -18l-1 -4 3 2zM7 -18l1 -4 -3 2z" fill="#ffc8dd" />
      <path d="M-6 -14q2 -2 4 0M2 -14q2 -2 4 0" stroke="#e76f51" strokeWidth="1.2" fill="none" />
      <path d="M-3 -10q-1.6 1.4 0 2.6M3 -10q1.6 1.4 0 2.6" stroke="#000" strokeWidth=".8" fill="none" /><path d="M-1 -7h2l-1 1z" fill="#ff8fab" /><path d="M-1 -5q1 1.4 2 0" stroke="#000" strokeWidth=".6" fill="none" />
      <path d="M-4 -8h-7M-4 -6h-7M4 -8h7M4 -6h7" stroke="#fff" strokeWidth=".5" />
      <path d="M-10 -2h20v8h-20z" fill="#fff" stroke="#adb5bd" strokeWidth=".5" /><path d="M-10 -2l10 6 10 -6" fill="none" stroke="#e63946" strokeWidth=".8" />
      <path d="M8 0l8 4" stroke="#f4a261" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(18 2)"><path d="M-4 0h8l-1 7h-6z" fill="#fff" stroke="#6f4518" strokeWidth=".6" /><path d="M4 2q3 0 3 2t-3 2" stroke="#6f4518" strokeWidth=".8" fill="none" /><path d="M-1 -2q-2 -3 0 -5M2 -2q-2 -3 0 -5" stroke="#adb5bd" strokeWidth=".6" fill="none" /></g>
    </g>
    <g transform="translate(24 130)"><rect x="-14" y="-4" width="28" height="4" fill="#cb997e" /><path d="M-10 0v14M10 0v14" stroke="#6f4518" strokeWidth="2" />
      <g transform="translate(0 -12)"><ellipse rx="7" ry="5" fill="#495057" /><circle cx="-6" cy="-3" r="4" fill="#495057" /><path d="M-9 -6l-1 -3 3 1zM-4 -6l1 -3 -3 1z" fill="#495057" /><path d="M-8 -4q1 -1 2 0" stroke="#ffd166" strokeWidth=".6" fill="none" /><path d="M6 2q6 0 6 -6" stroke="#495057" strokeWidth="1.6" fill="none" /></g>
      <g transform="translate(8 -8)"><path d="M-3 0h6l-1 4h-4z" fill="#fff" /><path d="M-2 -1q-1 -2 0 -3" stroke="#adb5bd" strokeWidth=".5" fill="none" /></g></g>
    <g transform="translate(98 134)"><rect x="-14" y="-4" width="28" height="4" fill="#cb997e" /><path d="M-10 0v12M10 0v12" stroke="#6f4518" strokeWidth="2" />
      <g transform="translate(-2 -10)"><ellipse rx="6" ry="4" fill="#fefae0" /><circle cx="5" cy="-3" r="3.4" fill="#fefae0" /><path d="M3 -6l0 -2.6 2 1.6zM7 -6l1 -2.6 -2 1z" fill="#fefae0" /><path d="M4 -3q1 1 2 0" stroke="#333" strokeWidth=".5" fill="none" /><path d="M-6 0q-6 0 -6 -4" stroke="#fefae0" strokeWidth="1.4" fill="none" /></g></g>
  </Svg>],

  [255, 'บ้านกระดาษพับในสายฝน', <Svg>
    <defs>
      <linearGradient id="k255s" x2="0" y2="1"><stop stopColor="#8d99ae" /><stop offset="1" stopColor="#edf2f4" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k255s)" />
    <Cl x={24} y={20} s={1.4} f="#adb5bd" /><Cl x={92} y={16} s={1.6} f="#ced4da" />
    <g stroke="#4cc9f0" strokeWidth=".9" opacity=".8">{Array.from({ length: 28 }, (_, i) => <path key={i} d={`M${(i * 31) % 124} ${(i * 43) % 140 + 26} l-2 7`} />)}</g>
    <rect y="124" width="120" height="36" fill="#6c757d" /><ellipse cx="60" cy="136" rx="40" ry="5" fill="#90a4b5" opacity=".7" />
    <g transform="translate(60 100)">
      <path d="M-30 24V-4l30 -24 30 24v28z" fill="#fefae0" stroke="#adb5bd" strokeWidth="1" />
      <path d="M0 -28V24" stroke="#ced4da" strokeWidth="1" /><path d="M-30 -4L0 24M30 -4L0 24" stroke="#e9ecef" strokeWidth=".8" />
      <path d="M-34 -2L0 -32l34 30" fill="none" stroke="#e63946" strokeWidth="3" strokeLinejoin="round" /><path d="M-34 -2L0 -32l34 30l-4 2L0 -28l-30 28z" fill="#e63946" />
      <path d="M-34 -2l4 2M34 -2l-4 2" stroke="#9d0208" strokeWidth="1" />
      <rect x="-20" y="2" width="12" height="10" fill="#ffd166" stroke="#adb5bd" strokeWidth=".6" /><path d="M-14 2v10M-20 7h12" stroke="#adb5bd" strokeWidth=".5" />
      <rect x="8" y="4" width="10" height="20" fill="#a2d2ff" stroke="#adb5bd" strokeWidth=".6" /><circle cx="16" cy="14" r=".8" fill="#e63946" />
      <circle cx="-14" cy="7" r="10" fill="#ffd166" opacity=".2" />
    </g>
    <g transform="translate(20 132)"><path d="M0 0q8 -10 16 0z" fill="#ffd166" /><path d="M8 0v-2" stroke="#9c6644" strokeWidth=".8" /><path d="M2 0l-2 4M14 0l2 4" stroke="#adb5bd" strokeWidth=".6" /></g>
    <g transform="translate(100 120) rotate(-10)"><path d="M-8 4L0 -8 8 4z" fill="#fff" stroke="#adb5bd" strokeWidth=".6" /><path d="M0 -8v12" stroke="#ced4da" strokeWidth=".6" /><path d="M-10 6q10 4 20 0" fill="#90e0ef" opacity=".5" /></g>
    <g transform="translate(36 146)"><path d="M-8 0l6 -6 4 4 6 -8" stroke="#fff" strokeWidth="1" fill="none" opacity=".6" /></g>
  </Svg>],

  [256, 'ไดโนเสาร์ในพิพิธภัณฑ์ตอนกลางคืน', <Svg>
    <defs>
      <linearGradient id="k256w" x2="0" y2="1"><stop stopColor="#1d1e2c" /><stop offset="1" stopColor="#3d405b" /></linearGradient>
      <radialGradient id="k256l" cx=".75" cy=".6" r=".6"><stop stopColor="#fff3b0" stopOpacity=".55" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k256w)" />
    <g fill="#2b2d42">{[10, 40, 70, 100].map(x => <rect key={x} x={x} y="0" width="10" height="120" />)}</g>
    <path d="M0 0h120v10H0z" fill="#3d405b" />
    <g fill="#14213d"><rect x="16" y="14" width="18" height="26" rx="9" /><rect x="86" y="14" width="18" height="26" rx="9" /></g><circle cx="26" cy="22" r="3" fill="#f8f9fa" opacity=".8" />
    <rect y="120" width="120" height="40" fill="#495057" /><g stroke="#343a40" strokeWidth=".7">{[0, 20, 40, 60, 80, 100].map(x => <path key={x} d={`M${x} 120l-6 40`} />)}</g>
    <rect x="16" y="112" width="70" height="8" fill="#6c757d" stroke="#343a40" strokeWidth=".8" />
    <g fill="none" stroke="#f1faee" strokeWidth="2" strokeLinecap="round">
      <path d="M28 112l4 -26M44 112l-2 -24M58 112l4 -26M74 112l-2 -24" />
      <path d="M22 80q20 -12 46 -6q12 2 20 -10" />
      {[30, 36, 42, 48, 54, 60, 66].map((x, i) => <path key={x} d={`M${x} ${78 - (i < 4 ? i : 7 - i)}q0 10 2 14`} strokeWidth="1.2" />)}
      <path d="M22 80q-12 4 -18 18" />
      <path d="M88 64q2 -10 10 -14" />
    </g>
    <g transform="translate(100 44)"><path d="M-6 6q-2 -14 10 -16q12 2 12 10q-2 8 -12 8z" fill="none" stroke="#f1faee" strokeWidth="2" /><circle cx="4" cy="-2" r="2.4" fill="#ffd60a" /><path d="M4 8l2 4 2 -4 2 4 2 -4" stroke="#f1faee" strokeWidth="1.2" fill="none" /></g>
    <path d="M60 160L100 40h20v120z" fill="url(#k256l)" />
    <g transform="translate(96 138)"><circle cy="-14" r="5" fill="#e0ac69" /><path d="M-6 -16q6 -6 12 0" fill="#264653" /><path d="M-5 -16h10" stroke="#264653" strokeWidth="1.6" />
      <path d="M-5 -9h10l1 12h-12z" fill="#2a9d8f" /><path d="M-3 3l-1 8M3 3l1 8" stroke="#264653" strokeWidth="2" strokeLinecap="round" />
      <path d="M-5 -6l-8 -8" stroke="#e0ac69" strokeWidth="1.8" strokeLinecap="round" /><rect x="-17" y="-18" width="6" height="4" rx="1" fill="#495057" transform="rotate(-40 -14 -16)" />
      <circle cx="-1" cy="-14" r=".6" fill="#000" /><circle cx="2" cy="-14" r=".6" fill="#000" /><ellipse cx=".6" cy="-11" rx="1" ry="1.4" fill="#6b3e26" /></g>
    <g fill="#f8f9fa"><text x="30" y="134" fontSize="6" fontFamily="sans-serif">T-REX</text></g>
  </Svg>],
];
