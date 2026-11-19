// ภาพการ์ดแบบละเอียด ชุด 35 (ภาพใหม่ 265–272) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD35 = [
  [265, 'สัตว์ประหลาดใต้เตียงกลัวความมืด', <Svg>
    <defs>
      <linearGradient id="k265w" x2="0" y2="1"><stop stopColor="#22223b" /><stop offset="1" stopColor="#4a4e69" /></linearGradient>
      <radialGradient id="k265l" cx=".25" cy=".75" r=".5"><stop stopColor="#fff3b0" stopOpacity=".8" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k265w)" />
    <rect x="70" y="16" width="34" height="30" fill="#14213d" stroke="#9a8c98" strokeWidth="1.4" /><path d="M87 16v30M70 31h34" stroke="#9a8c98" strokeWidth="1" /><circle cx="96" cy="24" r="4" fill="#f8f9fa" /><St p={[76, 22, .6, 80, 40, .5, 100, 38, .6]} />
    <rect y="132" width="120" height="28" fill="#6d597a" />
    <g transform="translate(60 100)">
      <rect x="-52" y="-4" width="104" height="14" rx="3" fill="#f2e9e4" /><path d="M-52 -4q20 -8 40 0" fill="#c9ada7" />
      <rect x="-48" y="-14" width="22" height="10" rx="4" fill="#fff" />
      <rect x="-52" y="10" width="104" height="22" fill="#4a4e69" /><path d="M-52 10q8 6 16 0t16 0 16 0 16 0 16 0 16 0 8 0" fill="#9a8c98" />
      <path d="M-54 32v4M54 32v4" stroke="#22223b" strokeWidth="3" />
    </g>
    <rect x="8" y="110" width="104" height="22" fill="#0b090a" />
    <circle cx="30" cy="124" r="20" fill="url(#k265l)" />
    <g transform="translate(26 116)"><rect x="-4" y="-6" width="8" height="14" rx="2" fill="#adb5bd" /><circle cy="-6" r="4" fill="#fff3b0" /></g>
    <g transform="translate(70 122)">
      <ellipse rx="22" ry="10" fill="#7209b7" />
      <circle cx="-8" cy="-2" r="5" fill="#fff" /><circle cx="6" cy="-3" r="6" fill="#fff" /><circle cx="-7" cy="-1" r="2.4" fill="#000" /><circle cx="7" cy="-2" r="3" fill="#000" />
      <path d="M-6 6q6 -4 12 0" stroke="#f8f9fa" strokeWidth="1" fill="none" /><path d="M-4 5l1 3 1 -3M2 5l1 3 1 -3" fill="#fff" />
      <path d="M-18 -6l-4 -6M18 -6l4 -6" stroke="#9d4edd" strokeWidth="2" strokeLinecap="round" />
      <path d="M-22 4q-6 2 -6 6M22 4q6 2 4 8" stroke="#7209b7" strokeWidth="3" strokeLinecap="round" fill="none" />
      <g fill="#80ffdb" opacity=".8"><circle cx="14" cy="-8" r="1" /><circle cx="18" cy="-12" r=".7" /></g>
    </g>
    <g transform="translate(96 132)"><path d="M0 0q-6 -10 2 -12q8 2 4 12z" fill="#ffd166" /><circle cx="1" cy="-10" r="3" fill="#ffd166" /><circle cx="0" cy="-11" r=".6" fill="#000" /><circle cx="2" cy="-11" r=".6" fill="#000" /></g>
  </Svg>],

  [266, 'สวนญี่ปุ่นกับปลาคาร์ป', <Svg>
    <defs>
      <linearGradient id="k266s" x2="0" y2="1"><stop stopColor="#ffe5ec" /><stop offset="1" stopColor="#ffc2d1" /></linearGradient>
      <linearGradient id="k266w" x2="0" y2="1"><stop stopColor="#4cc9f0" /><stop offset="1" stopColor="#4361ee" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k266s)" />
    <path d="M70 0q-6 30 10 50q-14 -6 -26 4" stroke="#6f4518" strokeWidth="3" fill="none" /><g fill="#ffafcc">{[[60, 50], [72, 40], [84, 52], [56, 36], [90, 36], [76, 26], [66, 60], [94, 62]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5 + (i % 3)} opacity=".9" />)}</g>
    <g fill="#fb6f92">{[[40, 70], [30, 90], [100, 80], [16, 60]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="2" ry="1.2" transform={`rotate(${i * 40} ${x} ${y})`} />)}</g>
    <path d="M0 96Q60 84 120 96V160H0Z" fill="url(#k266w)" />
    <g stroke="#caf0f8" strokeWidth=".8" opacity=".6" fill="none">{[[10, 104], [80, 110], [30, 140], [90, 148]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q5 -2 10 0`} />)}</g>
    <path d="M6 92q54 -30 108 0" stroke="#d00000" strokeWidth="4" fill="none" /><path d="M6 92q54 -30 108 0" stroke="#e85d04" strokeWidth="1.6" fill="none" transform="translate(0 4)" />
    <g stroke="#9d0208" strokeWidth="1.4">{[20, 34, 48, 62, 76, 90, 104].map(x => <path key={x} d={`M${x} ${92 - Math.sin((x - 6) / 108 * Math.PI) * 15}v-6`} />)}</g>
    {[[40, 124, 20, '#fff', '#f77f00'], [80, 136, -30, '#ffba08', '#d00000'], [66, 112, 160, '#fff', '#e63946']].map(([x, y, a, b, s], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
      <path d="M-12 0q4 -6 14 -4q6 2 6 4q0 2 -6 4q-10 2 -14 -4z" fill={b} /><path d="M-12 0l-6 -5q2 5 0 10z" fill={s} />
      <circle cx="-2" cy="-1" r="2.4" fill={s} /><circle cx="4" cy="1" r="1.6" fill={s} /><circle cx="6" cy="-.6" r=".6" fill="#000" />
    </g>)}
    <g fill="#70e000"><path d="M20 140a7 3.6 0 1 0 .1 0z" /><path d="M100 118a6 3 0 1 0 .1 0z" /></g>
    <g transform="translate(14 88)"><path d="M-6 0h12M-4 0v-12h8v12M-6 -12h12l-6 -6z" fill="#adb5bd" stroke="#6c757d" strokeWidth=".8" /><rect x="-2" y="-9" width="4" height="4" fill="#ffd166" /></g>
  </Svg>],

  [267, 'นักสืบส่องรอยเท้าแมว', <Svg>
    <defs>
      <linearGradient id="k267w" x2="0" y2="1"><stop stopColor="#ddbea9" /><stop offset="1" stopColor="#cb997e" /></linearGradient>
      <radialGradient id="k267g" cx=".4" cy=".35"><stop stopColor="#e0fbfc" stopOpacity=".6" /><stop offset="1" stopColor="#98c1d9" stopOpacity=".35" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k267w)" />
    <g stroke="#b08968" strokeWidth=".6">{[20, 40, 60, 80, 100, 120, 140].map(y => <path key={y} d={`M0 ${y}h120`} />)}{Array.from({ length: 14 }, (_, i) => <path key={'v' + i} d={`M${(i % 2) * 30 + (i * 17) % 90} ${Math.floor(i / 2) * 20 + 20}v20`} />)}</g>
    <g fill="#6f4518" opacity=".75">{[[20, 140, -10], [36, 124, 10], [52, 112, -10], [68, 98, 10], [84, 86, -10], [100, 72, 10]].map(([x, y, a], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${a + 30})`}><ellipse cx="0" cy="2" rx="3" ry="2.4" /><circle cx="-3" cy="-2" r="1.2" /><circle cx="-1" cy="-3.6" r="1.2" /><circle cx="1.6" cy="-3.6" r="1.2" /><circle cx="3.4" cy="-2" r="1.2" /></g>)}</g>
    <g transform="translate(40 76)">
      <path d="M-14 50l-4 -34h20l4 34z" fill="#9c6644" stroke="#3d2b1f" strokeWidth=".8" /><path d="M-8 16v34" stroke="#7f5539" strokeWidth=".8" />
      <circle cx="-6" cy="8" r="8" fill="#f1c27d" /><path d="M-14 4h18" stroke="#6f4518" strokeWidth="2" strokeLinecap="round" /><path d="M-12 4q6 -12 14 -2z" fill="#7f5539" /><path d="M-12 2q6 -2 12 0" stroke="#3d2b1f" strokeWidth="1" />
      <path d="M-4 12q2 2 4 0" stroke="#6b3e26" strokeWidth=".7" fill="none" /><path d="M-2 14q-1 4 1 6" stroke="#6b3e26" strokeWidth="1" fill="none" />
      <path d="M2 20l16 6" stroke="#f1c27d" strokeWidth="2.6" strokeLinecap="round" />
      <g transform="translate(24 30)"><circle r="10" fill="url(#k267g)" stroke="#3d2b1f" strokeWidth="2" /><path d="M7 7l8 8" stroke="#3d2b1f" strokeWidth="3" strokeLinecap="round" /><g transform="scale(1.6)" fill="#6f4518"><ellipse cx="0" cy="1" rx="2" ry="1.6" /><circle cx="-2" cy="-1.4" r=".8" /><circle cx="0" cy="-2.4" r=".8" /><circle cx="2" cy="-1.4" r=".8" /></g><path d="M-5 -5q3 -3 6 -2" stroke="#fff" strokeWidth="1" fill="none" /></g>
      <path d="M-14 20l-4 12" stroke="#9c6644" strokeWidth="4" strokeLinecap="round" />
      <path d="M-4 50v8M-12 50v8" stroke="#3d2b1f" strokeWidth="2.6" strokeLinecap="round" />
    </g>
    <g transform="translate(104 64)"><path d="M-10 6q-2 -12 8 -12q10 2 8 12z" fill="#ffb703" /><circle cy="-10" r="6" fill="#ffb703" /><path d="M-5 -14l-1 -5 4 3zM5 -14l1 -5 -4 3z" fill="#ffb703" /><path d="M-3 -10q1 -1 2 0M1 -10q1 -1 2 0" stroke="#000" strokeWidth=".7" fill="none" /><path d="M6 4q8 -2 8 -10" stroke="#ffb703" strokeWidth="2" fill="none" /><path d="M-2 -6q2 1 4 0" stroke="#000" strokeWidth=".5" fill="none" /></g>
    <g fill="#6f4518" fontWeight="800" fontFamily="sans-serif"><text x="10" y="24" fontSize="10">?</text><text x="20" y="18" fontSize="7">?</text></g>
  </Svg>],

  [268, 'หอคอยแก้วสูงเสียดฟ้า', <Svg>
    <defs>
      <linearGradient id="k268s" x2="0" y2="1"><stop stopColor="#3a0ca3" /><stop offset=".5" stopColor="#7209b7" /><stop offset="1" stopColor="#f72585" /></linearGradient>
      <linearGradient id="k268g" x2="1"><stop stopColor="#90e0ef" stopOpacity=".9" /><stop offset=".5" stopColor="#caf0f8" stopOpacity=".6" /><stop offset="1" stopColor="#48cae4" stopOpacity=".9" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k268s)" />
    <St p={[10, 10, .8, 30, 30, .6, 100, 16, 1, 112, 40, .6, 80, 6, .5]} />
    <Cl x={20} y={70} s={1.2} o={.85} /><Cl x={100} y={90} s={1.4} o={.8} /><Cl x={60} y={110} s={1.6} o={.9} />
    <g transform="translate(60 0)">
      <path d="M-16 160V60l16 -50 16 50v100z" fill="url(#k268g)" stroke="#caf0f8" strokeWidth=".8" />
      <path d="M0 10V160" stroke="#fff" strokeWidth=".6" opacity=".7" />
      <g stroke="#fff" strokeWidth=".4" opacity=".6">{Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${-16 + (i < 3 ? 6 - i * 2 : 0)} ${60 + i * 6}h32`} />)}</g>
      <path d="M-12 60l12 -40 4 20z" fill="#fff" opacity=".35" />
      <g fill="#ffd60a">{[[-8, 70], [6, 82], [-4, 96], [8, 108], [-10, 120], [2, 134]].map(([x, y], i) => <rect key={i} x={x} y={y} width="3" height="3" opacity=".8" />)}</g>
      <path d="M0 10v-10" stroke="#caf0f8" strokeWidth="1" /><circle cy="0" r="2" fill="#ff006e" /><circle cy="0" r="6" fill="#ff006e" opacity=".3" />
    </g>
    <g fill="#fff" opacity=".9"><Cl x={60} y={84} s={1.1} o={.9} /><Cl x={34} y={124} s={1.3} o={.95} /><Cl x={92} y={130} s={1.2} o={.95} /></g>
    <g fill="#3a0ca3" opacity=".7"><path d="M30 50q2 -2 4 0q2 -2 4 0" stroke="#3a0ca3" strokeWidth=".7" fill="none" /><path d="M86 40q2 -2 4 0q2 -2 4 0" stroke="#3a0ca3" strokeWidth=".7" fill="none" /></g>
  </Svg>],

  [269, 'หมูออมสินบินได้', <Svg>
    <defs>
      <linearGradient id="k269s" x2="0" y2="1"><stop stopColor="#a2d2ff" /><stop offset="1" stopColor="#fefae0" /></linearGradient>
      <radialGradient id="k269p" cx=".4" cy=".35"><stop stopColor="#ffd6e0" /><stop offset=".7" stopColor="#ff8fab" /><stop offset="1" stopColor="#c9184a" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k269s)" />
    <Cl x={18} y={30} s={.9} /><Cl x={100} y={20} s={.7} /><Cl x={24} y={130} s={1.2} /><Cl x={96} y={140} s={1.4} />
    <g transform="translate(60 76)">
      <path d="M-8 -8q-20 -20 -30 -12q8 2 10 8q-10 -4 -14 4q10 -2 16 4q-6 4 -4 10q10 -10 22 -14z" fill="#fff" stroke="#dee2e6" strokeWidth=".8" />
      <path d="M8 -8q20 -20 30 -12q-8 2 -10 8q10 -4 14 4q-10 -2 -16 4q6 4 4 10q-10 -10 -22 -14z" fill="#fff" stroke="#dee2e6" strokeWidth=".8" />
      <ellipse rx="26" ry="20" fill="url(#k269p)" />
      <rect x="-8" y="-20" width="16" height="3" rx="1.4" fill="#590d22" />
      <ellipse cx="24" cy="2" rx="6" ry="7" fill="#ff8fab" stroke="#c9184a" strokeWidth=".8" /><circle cx="23" cy="0" r="1.2" fill="#590d22" /><circle cx="25" cy="4" r="1.2" fill="#590d22" />
      <circle cx="14" cy="-6" r="2" fill="#000" /><circle cx="14.6" cy="-6.6" r=".6" fill="#fff" />
      <path d="M8 -16l4 -8 4 6z" fill="#ff8fab" stroke="#c9184a" strokeWidth=".8" />
      <path d="M-14 16v6M-4 18v6M6 18v6M16 16v6" stroke="#c9184a" strokeWidth="4" strokeLinecap="round" />
      <path d="M-26 -2q-8 -4 -6 4q2 4 -2 6" stroke="#c9184a" strokeWidth="1.4" fill="none" />
      <ellipse cx="-8" cy="-8" rx="8" ry="4" fill="#fff" opacity=".35" />
    </g>
    <g fill="#ffd60a" stroke="#b08900" strokeWidth=".8">{[[40, 120], [56, 132], [72, 118], [64, 146], [48, 148]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="4" ry="4" /><text x={x} y={y + 2} fontSize="5" textAnchor="middle" fill="#b08900" stroke="none" fontWeight="800">฿</text></g>)}</g>
    <g stroke="#fff" strokeWidth="1" opacity=".8"><path d="M20 70l-8 2M22 78l-10 4" /></g>
  </Svg>],

  [270, 'ห้องเรียนว่างกับกระดานดำ', <Svg>
    <defs>
      <linearGradient id="k270w" x2="0" y2="1"><stop stopColor="#f6fff8" /><stop offset="1" stopColor="#eaf4f4" /></linearGradient>
      <linearGradient id="k270l" x2="1" y2="1"><stop stopColor="#ffd6a5" stopOpacity=".7" /><stop offset="1" stopColor="#ffd6a5" stopOpacity="0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k270w)" />
    <rect x="14" y="20" width="92" height="52" fill="#1b4332" stroke="#7f5539" strokeWidth="3" /><path d="M14 72h92" stroke="#9c6644" strokeWidth="4" />
    <g fill="none" stroke="#f8f9fa" strokeWidth="1.2" strokeLinecap="round" opacity=".9"><path d="M24 34h20M24 42h30M24 50h14" /><circle cx="78" cy="44" r="10" /><path d="M78 34v20M68 44h20" opacity=".5" /></g>
    <text x="70" y="64" fontSize="14" fill="#f8f9fa" fontWeight="700" fontFamily="sans-serif" opacity=".9">?</text>
    <rect x="30" y="74" width="8" height="2" fill="#fff" /><rect x="42" y="74" width="5" height="2" fill="#ffb703" />
    <path d="M0 160L40 80h20L60 160z" fill="url(#k270l)" opacity="0" />
    <path d="M120 40L76 160H120z" fill="url(#k270l)" />
    <rect y="112" width="120" height="48" fill="#ddb892" /><g stroke="#b08968" strokeWidth=".6">{[124, 138, 152].map(y => <path key={y} d={`M0 ${y}h120`} />)}</g>
    {[[24, 112], [60, 112], [96, 112], [36, 136], [84, 136]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}>
      <rect x="-14" y="-6" width="28" height="4" fill="#bc6c25" /><path d="M-12 -2v14M12 -2v14" stroke="#7f5539" strokeWidth="1.6" />
      <rect x="-10" y="2" width="12" height="2" fill="#6c757d" /><path d="M-10 4v8M2 4v8" stroke="#6c757d" strokeWidth="1" />
    </g>)}
    <g transform="translate(60 106)"><path d="M-4 0l8 0l-1 -6h-6z" fill="#e63946" /><circle cy="-8" r="2.4" fill="#e63946" /><path d="M0 -10l1 -2" stroke="#2d6a4f" strokeWidth=".8" /></g>
    <g transform="translate(104 90)"><circle r="7" fill="#fff" stroke="#495057" strokeWidth="1.2" /><path d="M0 0v-4M0 0l3 2" stroke="#495057" strokeWidth=".8" /></g>
    <g fill="#adb5bd" opacity=".6"><circle cx="70" cy="90" r=".7" /><circle cx="86" cy="80" r=".6" /><circle cx="94" cy="100" r=".5" /></g>
  </Svg>],

  [271, 'ประตูในเมฆ', <Svg>
    <defs>
      <linearGradient id="k271s" x2="0" y2="1"><stop stopColor="#ffafcc" /><stop offset=".5" stopColor="#cdb4db" /><stop offset="1" stopColor="#a2d2ff" /></linearGradient>
      <linearGradient id="k271d" x2="0" y2="1"><stop stopColor="#fff3b0" /><stop offset="1" stopColor="#ffd166" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k271s)" />
    <St p={[10, 12, .8, 30, 6, .6, 100, 10, .9, 110, 30, .6]} />
    <Cl x={20} y={40} s={1} o={.8} /><Cl x={100} y={52} s={.8} o={.8} />
    <g fill="#fff"><ellipse cx="60" cy="120" rx="58" ry="20" /><circle cx="26" cy="108" r="18" /><circle cx="56" cy="98" r="22" /><circle cx="90" cy="104" r="20" /><circle cx="110" cy="116" r="12" /><circle cx="10" cy="120" r="12" /></g>
    <g transform="translate(60 98)">
      <rect x="-14" y="-50" width="28" height="50" rx="2" fill="#9c6644" stroke="#6f4518" strokeWidth="1.4" />
      <path d="M-14 -50h28v50h-28z" fill="url(#k271d)" transform="translate(4 0) scale(.85 1)" opacity="0" />
      <path d="M-11 -46h18v44h-18z" fill="url(#k271d)" /><path d="M7 -46l8 -2v44l-8 2z" fill="#7f5539" stroke="#6f4518" strokeWidth=".8" />
      <circle cx="11" cy="-24" r="1.2" fill="#ffd60a" />
      <g stroke="#fff3b0" strokeWidth="1" opacity=".7">{[-20, -14, -8, 8, 14].map((a, i) => <path key={i} d={`M-2 -24L${-2 + Math.cos(a / 10) * -40} ${-24 + Math.sin(a / 10) * 30}`} />)}</g>
      <path d="M-4 0q4 6 0 12" stroke="#fff" strokeWidth="1" opacity="0" />
    </g>
    <g transform="translate(60 138)">{[0, 1, 2, 3].map(i => <rect key={i} x={-8 + i * 1} y={-i * 6} width={16 - i * 2} height="4" rx="1" fill="#fff" stroke="#dee2e6" strokeWidth=".6" transform={`translate(0 ${-2})`} />)}</g>
    <g transform="translate(40 124)"><circle cy="-8" r="3.4" fill="#f1c27d" /><path d="M-3.4 -9q3.4 -4 6.8 0" fill="#3d405b" /><path d="M-3 -5h6l1 7h-8z" fill="#06d6a0" /><path d="M-2 2l-1 5M2 2l1 5" stroke="#264653" strokeWidth="1.6" strokeLinecap="round" /><path d="M3 -3l4 -4" stroke="#f1c27d" strokeWidth="1.4" strokeLinecap="round" /></g>
  </Svg>],

  [272, 'วงดนตรีกบในบึง', <Svg>
    <defs>
      <linearGradient id="k272s" x2="0" y2="1"><stop stopColor="#0b132b" /><stop offset=".6" stopColor="#1c2541" /><stop offset="1" stopColor="#3a506b" /></linearGradient>
      <linearGradient id="k272w" x2="0" y2="1"><stop stopColor="#2a9d8f" /><stop offset="1" stopColor="#14213d" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k272s)" />
    <circle cx="94" cy="26" r="12" fill="#fefae0" /><St p={[10, 12, .8, 30, 30, .6, 60, 10, .7, 110, 50, .6]} />
    <g fill="#283618"><path d="M0 96q-2 -40 4 -60q2 30 0 60z" /><path d="M8 96q2 -30 -2 -48q-1 26 2 48z" /><path d="M112 96q-2 -40 4 -60q2 30 0 60z" /></g>
    <g fill="#6f4518">{[[2, 36], [7, 48], [114, 36]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="2" ry="6" />)}</g>
    <rect y="92" width="120" height="68" fill="url(#k272w)" />
    {[[24, 114, '#80b918', 'M8 -6l10 -6v12z'], [60, 100, '#55a630', ''], [96, 116, '#2b9348', '']].map(([x, y, c], i) => <g key={i} transform={`translate(${x} ${y})`}>
      <ellipse cy="10" rx="16" ry="5" fill="#38b000" />
      <ellipse cx="0" cy="0" rx="10" ry="8" fill={c} /><circle cx="-5" cy="-7" r="4" fill={c} /><circle cx="5" cy="-7" r="4" fill={c} />
      <circle cx="-5" cy="-7" r="2.4" fill="#fff" /><circle cx="5" cy="-7" r="2.4" fill="#fff" /><circle cx="-5" cy="-6.4" r="1.2" fill="#000" /><circle cx="5" cy="-6.4" r="1.2" fill="#000" />
      {i === 0 && <g><path d="M8 -2l12 -6" stroke="#ffd166" strokeWidth="2" /><path d="M18 -10l6 -2v8z" fill="#ffd166" /><circle cx="0" cy="2" r="3" fill="#000" opacity=".5" /></g>}
      {i === 1 && <g><ellipse cx="0" cy="3" rx="4" ry="3" fill="#ffccd5" /><path d="M-6 -2q-6 -6 -4 -12M6 -2q6 -6 4 -12" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M-16 -14h4v-6" stroke="#ffd166" strokeWidth="1" fill="none" opacity="0" /></g>}
      {i === 2 && <g><path d="M-14 0q4 -10 10 -6l6 10q-6 6 -16 -4z" fill="#bc6c25" stroke="#6f4518" strokeWidth=".8" /><path d="M-8 -4l14 -14" stroke="#6f4518" strokeWidth="1.4" /><circle cx="-6" cy="2" r="1.4" fill="#3d2b1f" /></g>}
    </g>)}
    <g fill="#ffd166"><ellipse cx="44" cy="74" rx="2" ry="1.5" /><path d="M46 74v-8l4 1" stroke="#ffd166" strokeWidth=".8" fill="none" /><ellipse cx="80" cy="68" rx="2" ry="1.5" /><path d="M82 68v-8" stroke="#ffd166" strokeWidth=".8" /><ellipse cx="62" cy="58" rx="1.8" ry="1.3" /><path d="M63.8 58v-7l3 1" stroke="#ffd166" strokeWidth=".7" fill="none" /></g>
    <g fill="#d9ed92" opacity=".8">{[[16, 70], [104, 80], [36, 50], [88, 46]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" />)}</g>
  </Svg>],
];
