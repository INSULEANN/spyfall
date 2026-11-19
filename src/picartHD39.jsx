// ภาพการ์ดแบบละเอียด ชุด 39 (ภาพใหม่ 297–300) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD39 = [
  [297, 'วงกลมปริศนากลางทุ่งข้าวโพด', <Svg>
    <defs>
      <linearGradient id="k297s" x2="0" y2="1"><stop stopColor="#14213d" /><stop offset="1" stopColor="#3d5a80" /></linearGradient>
      <linearGradient id="k297f" x2="0" y2="1"><stop stopColor="#e9c46a" /><stop offset="1" stopColor="#bc8a3c" /></linearGradient>
      <radialGradient id="k297b"><stop stopColor="#a5ffd6" stopOpacity=".7" /><stop offset="1" stopColor="#a5ffd6" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k297s)" />
    <St p={[10, 10, .8, 30, 26, .6, 60, 8, .7, 96, 14, .9, 110, 36, .6]} />
    <path d="M0 56h120v104H0z" fill="url(#k297f)" />
    <g stroke="#a98467" strokeWidth=".5" opacity=".7">{Array.from({ length: 24 }, (_, i) => <path key={i} d={`M${i * 5} 56l${(i - 12) * 1.6} 104`} />)}</g>
    <g transform="translate(60 104)">
      <ellipse rx="40" ry="16" fill="#d4a373" stroke="#9c6644" strokeWidth="1" /><ellipse rx="28" ry="11" fill="url(#k297f)" /><ellipse rx="18" ry="7" fill="#d4a373" stroke="#9c6644" strokeWidth=".8" /><ellipse rx="6" ry="2.4" fill="url(#k297f)" />
      {[0, 60, 120, 180, 240, 300].map(a => { const r = a * Math.PI / 180; return <ellipse key={a} cx={(Math.cos(r) * 34).toFixed(1)} cy={(Math.sin(r) * 13.6).toFixed(1)} rx="4" ry="1.6" fill="#d4a373" stroke="#9c6644" strokeWidth=".5" />; })}
    </g>
    <circle cx="60" cy="40" r="30" fill="url(#k297b)" />
    <g transform="translate(60 36)">
      <ellipse rx="20" ry="5" fill="#adb5bd" stroke="#6c757d" strokeWidth=".8" /><path d="M-10 -2q0 -10 10 -10t10 10" fill="#caf0f8" opacity=".8" stroke="#6c757d" strokeWidth=".6" />
      <circle cx="0" cy="-6" r="3" fill="#80ed99" /><circle cx="-1" cy="-7" r=".8" fill="#000" /><circle cx="1.4" cy="-7" r=".8" fill="#000" />
      <g fill="#ffd60a">{[-14, -7, 0, 7, 14].map(x => <circle key={x} cx={x} cy="2" r="1.2" />)}</g>
      <path d="M-8 4L-20 68M8 4L20 68" stroke="#a5ffd6" strokeWidth=".6" opacity=".5" />
    </g>
    <g transform="translate(20 140)"><circle cy="-10" r="3.6" fill="#f1c27d" /><path d="M-6 -12q6 -6 12 0" fill="#e9c46a" /><path d="M-7 -12h14" stroke="#e9c46a" strokeWidth="1.4" /><path d="M-3 -6h6l1 9h-8z" fill="#e63946" /><path d="M3 -4l4 -8" stroke="#f1c27d" strokeWidth="1.4" strokeLinecap="round" /><text x="6" y="-16" fontSize="8" fill="#fff" fontWeight="700">!</text></g>
  </Svg>],

  [298, 'แมวส้มนั่งบนเครื่องซักผ้า', <Svg>
    <defs>
      <linearGradient id="k298w" x2="0" y2="1"><stop stopColor="#e0fbfc" /><stop offset="1" stopColor="#c2dfe3" /></linearGradient>
      <radialGradient id="k298d" cx=".4" cy=".35"><stop stopColor="#caf0f8" /><stop offset="1" stopColor="#48cae4" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k298w)" />
    <g fill="#9db4c0" opacity=".5">{Array.from({ length: 6 }, (_, i) => <rect key={i} x={i * 20} y="0" width="10" height="110" />)}</g>
    <rect y="138" width="120" height="22" fill="#5c6b73" />
    <path d="M10 20h100" stroke="#6c757d" strokeWidth=".8" /><g>{[[20, '#ff8fab'], [40, '#ffd166'], [62, '#90e0ef'], [84, '#c77dff']].map(([x, c], i) => <g key={i}><path d={`M${x} 20v4`} stroke="#495057" strokeWidth="1" /><path d={`M${x - 8} 24h16l-2 16h-12z`} fill={c} /></g>)}</g>
    <g transform="translate(60 112)">
      <rect x="-32" y="-34" width="64" height="60" rx="4" fill="#f8f9fa" stroke="#adb5bd" strokeWidth="1.2" />
      <rect x="-32" y="-34" width="64" height="12" rx="3" fill="#e9ecef" stroke="#adb5bd" strokeWidth=".8" /><circle cx="-22" cy="-28" r="3" fill="#adb5bd" /><circle cx="-12" cy="-28" r="2" fill="#06d6a0" /><rect x="8" y="-30" width="18" height="4" rx="1" fill="#212529" /><text x="17" y="-27" fontSize="3.4" fill="#06d6a0" textAnchor="middle">0:42</text>
      <circle cy="4" r="18" fill="#dee2e6" stroke="#adb5bd" strokeWidth="1.2" /><circle cy="4" r="14" fill="url(#k298d)" />
      <g fill="#ff8fab" opacity=".8"><path d="M-6 0q4 -6 10 0q-4 6 -10 0z" /></g><g fill="#ffd166" opacity=".8"><path d="M2 8q4 -4 8 0q-4 4 -8 0z" /></g><path d="M-10 6q10 -6 20 2" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".7" />
      <path d="M-8 -4q4 -6 10 -6" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".8" />
    </g>
    <g transform="translate(56 76)">
      <path d="M-14 8q-2 -16 14 -16q16 0 14 16z" fill="#f77f00" /><path d="M-8 -4q8 -2 16 0" stroke="#e85d04" strokeWidth="1.4" fill="none" /><path d="M-10 2q10 -2 20 0" stroke="#e85d04" strokeWidth="1.4" fill="none" />
      <circle cx="6" cy="-14" r="9" fill="#f77f00" /><path d="M0 -20l-2 -7 6 4zM12 -20l2 -7 -6 4z" fill="#f77f00" /><path d="M1 -21l-1 -3 3 2zM11 -21l1 -3 -3 2z" fill="#ffc8dd" />
      <path d="M2 -16q1 -1 2 0M8 -16q1 -1 2 0" stroke="#000" strokeWidth=".8" fill="none" /><path d="M5 -12h2l-1 1z" fill="#ff8fab" /><path d="M5 -10q1 1 2 0" stroke="#000" strokeWidth=".5" fill="none" />
      <path d="M2 -12h-6M2 -11h-6M10 -12h6M10 -11h6" stroke="#fff" strokeWidth=".5" />
      <path d="M14 6q10 4 8 14" stroke="#f77f00" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M-14 8q0 4 4 4M4 8q0 4 4 4" stroke="#e85d04" strokeWidth="1" fill="none" />
    </g>
    <g fill="#90e0ef" opacity=".8">{[[96, 92], [100, 84], [92, 80]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.4 + i * .4} fill="none" stroke="#90e0ef" strokeWidth=".8" />)}</g>
  </Svg>],

  [299, 'รถบัสในทุ่งดอกทานตะวัน', <Svg>
    <defs>
      <linearGradient id="k299s" x2="0" y2="1"><stop stopColor="#4cc9f0" /><stop offset="1" stopColor="#caf0f8" /></linearGradient>
      <linearGradient id="k299b" x2="0" y2="1"><stop stopColor="#ffd60a" /><stop offset="1" stopColor="#f77f00" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k299s)" />
    <Cl x={20} y={24} s={.9} /><Cl x={96} y={34} s={.7} />
    <path d="M0 84Q60 70 120 84V160H0Z" fill="#55a630" />
    <g transform="translate(60 92)">
      <rect x="-36" y="-22" width="72" height="28" rx="5" fill="url(#k299b)" stroke="#9c6644" strokeWidth="1" />
      {[-30, -18, -6, 6, 18].map(x => <rect key={x} x={x} y="-18" width="10" height="10" rx="1.4" fill="#caf0f8" stroke="#9c6644" strokeWidth=".6" />)}
      <rect x="28" y="-18" width="6" height="20" fill="#caf0f8" stroke="#9c6644" strokeWidth=".6" />
      <path d="M-36 -2h72" stroke="#e85d04" strokeWidth="2" /><circle cx="-22" cy="8" r="5" fill="#212529" /><circle cx="22" cy="8" r="5" fill="#212529" /><circle cx="-22" cy="8" r="2" fill="#adb5bd" /><circle cx="22" cy="8" r="2" fill="#adb5bd" />
      <circle cx="-26" cy="-13" r="2.4" fill="#f1c27d" /><circle cx="-2" cy="-13" r="2.4" fill="#e0ac69" /><circle cx="10" cy="-13" r="2.4" fill="#8d5524" />
      <path d="M-14 -22l2 -8M10 -22l-2 -8" stroke="#55a630" strokeWidth="1" /><circle cx="-12" cy="-32" r="3" fill="#ffd60a" /><circle cx="8" cy="-32" r="3" fill="#ffd60a" />
    </g>
    {Array.from({ length: 22 }, (_, i) => { const x = (i * 37) % 118 + 2, y = 104 + (i * 23) % 52; const s = .7 + (y - 104) / 100;
      return <g key={i} transform={`translate(${x} ${y}) scale(${s.toFixed(2)})`}><path d="M0 10V0" stroke="#2d6a4f" strokeWidth="1.4" /><path d="M0 6q-4 -2 -6 0q4 2 6 0z" fill="#2d6a4f" />{Array.from({ length: 10 }, (_, j) => <ellipse key={j} cx="0" cy="-5" rx="1.6" ry="3.4" fill="#ffd60a" transform={`rotate(${j * 36} 0 0)`} />)}<circle r="2.6" fill="#6f4518" /></g>; })}
    <g fill="#fff" opacity=".8"><path d="M30 60q2 -2 4 0q2 -2 4 0" stroke="#264653" strokeWidth=".7" fill="none" /></g>
  </Svg>],

  [300, 'รูปครอบครัวที่มีคนหนึ่งจางหาย', <Svg>
    <defs>
      <linearGradient id="k300w" x2="0" y2="1"><stop stopColor="#e9d8a6" /><stop offset="1" stopColor="#d4a373" /></linearGradient>
      <linearGradient id="k300p" x2="0" y2="1"><stop stopColor="#ffe8d6" /><stop offset="1" stopColor="#ddbea9" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k300w)" />
    <g stroke="#c9a46a" strokeWidth=".6">{[16, 36, 56, 76, 96, 116].map(x => <path key={x} d={`M${x} 0v160`} />)}</g>
    <rect x="14" y="26" width="92" height="76" fill="#7f5539" stroke="#3d2b1f" strokeWidth="1.4" /><rect x="20" y="32" width="80" height="64" fill="url(#k300p)" />
    <path d="M60 26l-6 -10h12z" fill="none" stroke="#3d2b1f" strokeWidth=".8" /><circle cx="60" cy="14" r="1.4" fill="#3d2b1f" />
    <rect x="20" y="78" width="80" height="18" fill="#cb997e" opacity=".6" />
    {[[34, '#457b9d', '#3d2b1f', 1], [50, '#e76f51', '#6b3e26', 1], [68, '#2a9d8f', '#3d2b1f', .22], [84, '#e9c46a', '#bc6c25', 1]].map(([x, c, h, o], i) => <g key={i} transform={`translate(${x} 92)`} opacity={o}>
      <circle cy={i === 3 ? -24 : -32} r={i === 3 ? 5 : 6} fill="#f1c27d" /><path d={`M${i === 3 ? -5 : -6} ${i === 3 ? -26 : -34}q${i === 3 ? 5 : 6} -7 ${i === 3 ? 10 : 12} 0`} fill={h} />
      <path d={`M${i === 3 ? -5 : -7} ${i === 3 ? -19 : -26}h${i === 3 ? 10 : 14}l2 ${i === 3 ? 19 : 26}h-${i === 3 ? 14 : 18}z`} fill={c} />
      <path d={`M-1.6 ${i === 3 ? -24 : -32}h.1M1.6 ${i === 3 ? -24 : -32}h.1`} stroke="#000" strokeWidth="1.4" strokeLinecap="round" /><path d={`M-2 ${i === 3 ? -21 : -29}q2 1.4 4 0`} stroke="#6b3e26" strokeWidth=".6" fill="none" />
    </g>)}
    <g fill="#fff" opacity=".5">{[[64, 60], [70, 52], [74, 66], [66, 74], [72, 44]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
    <path d="M20 32l10 10" stroke="#fff" strokeWidth="2" opacity=".3" />
    <rect y="124" width="120" height="36" fill="#7f5539" /><path d="M0 124h120" stroke="#3d2b1f" strokeWidth="1.4" />
    <g transform="translate(86 122)"><path d="M-6 0h12l-2 -10h-8z" fill="#e9ecef" stroke="#adb5bd" strokeWidth=".6" /><path d="M0 -10q-2 -6 2 -10q-2 4 0 8" stroke="#2d6a4f" strokeWidth="1" fill="none" /><circle cx="2" cy="-20" r="2.4" fill="#ffafcc" /></g>
    <g transform="translate(30 122)"><rect x="-10" y="-14" width="20" height="14" fill="#fefae0" stroke="#adb5bd" strokeWidth=".6" transform="rotate(-6)" /><path d="M-6 -10h12M-6 -6h8" stroke="#adb5bd" strokeWidth=".6" transform="rotate(-6)" /></g>
  </Svg>],
];
