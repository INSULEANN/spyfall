// ภาพการ์ดแบบละเอียด ชุด 31 (ภาพใหม่ 233–240) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD31 = [
  [233, 'แมวดำข้ามถนนตอนเที่ยงคืน', <Svg>
    <defs>
      <linearGradient id="k233s" x2="0" y2="1"><stop stopColor="#0b090a" /><stop offset=".6" stopColor="#161a1d" /><stop offset="1" stopColor="#2b2d42" /></linearGradient>
      <radialGradient id="k233l" cx=".5" cy="0" r="1"><stop stopColor="#ffe066" stopOpacity=".55" /><stop offset="1" stopColor="#ffe066" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k233s)" />
    <circle cx="96" cy="22" r="10" fill="#f8f9fa" /><circle cx="92" cy="20" r="2" fill="#dee2e6" /><St p={[10, 12, .7, 30, 24, .6, 60, 8, .8, 76, 30, .5]} />
    <g fill="#1d2025"><rect x="0" y="50" width="22" height="70" /><rect x="22" y="36" width="18" height="84" /><rect x="84" y="44" width="20" height="76" /><rect x="104" y="58" width="16" height="62" /></g>
    <g fill="#ffd166" opacity=".8">{[[5, 60], [12, 74], [26, 46], [32, 64], [88, 54], [94, 70], [108, 66], [112, 84]].map(([x, y], i) => <rect key={i} x={x} y={y} width="3" height="4" />)}</g>
    <g transform="translate(52 40)"><rect x="-6" y="-6" width="12" height="12" rx="6" fill="#adb5bd" stroke="#495057" strokeWidth="1" /><path d="M0 -4v4l3 2" stroke="#212529" strokeWidth="1" /><path d="M0 6v80" stroke="#495057" strokeWidth="1.4" /></g>
    <path d="M70 34v86" stroke="#495057" strokeWidth="2" /><path d="M70 34q8 -4 12 2" stroke="#495057" strokeWidth="2" fill="none" /><path d="M78 36h8l-2 4h-4z" fill="#495057" />
    <path d="M60 40L44 120H100z" fill="url(#k233l)" transform="translate(22 0)" />
    <rect y="116" width="120" height="44" fill="#343a40" />
    <g fill="#f8f9fa">{[6, 20, 34, 48, 62, 76, 90, 104].map(x => <rect key={x} x={x} y="128" width="8" height="20" />)}</g>
    <g transform="translate(60 134)">
      <ellipse cx="0" cy="12" rx="16" ry="2.4" fill="#000" opacity=".5" />
      <path d="M-14 6q0 -12 12 -12h10q8 0 8 8v8h-30z" fill="#0b090a" />
      <path d="M-14 8l-2 8M-8 8l-1 8M8 8l1 8M14 8l2 8" stroke="#0b090a" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="18" cy="-8" r="7" fill="#0b090a" /><path d="M13 -12l-1 -7 5 4zM22 -13l2 -7 2 7z" fill="#0b090a" />
      <ellipse cx="16" cy="-9" rx="1.4" ry="2" fill="#ffd60a" /><ellipse cx="21" cy="-9" rx="1.4" ry="2" fill="#ffd60a" /><path d="M16 -10v2M21 -10v2" stroke="#000" strokeWidth=".6" />
      <path d="M-14 0q-10 -6 -8 -18q2 -4 4 0" stroke="#0b090a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </g>
    <g fill="#ffd60a" opacity=".7"><circle cx="16" cy="88" r="1" /><circle cx="104" cy="94" r=".9" /></g>
  </Svg>],

  [234, 'ปู่ย่าเต้นรำในครัว', <Svg>
    <defs>
      <linearGradient id="k234w" x2="0" y2="1"><stop stopColor="#ffe5b4" /><stop offset="1" stopColor="#f6bd60" /></linearGradient>
      <pattern id="k234t" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#f7ede2" /><rect width="6" height="6" fill="#84a59d" /><rect x="6" y="6" width="6" height="6" fill="#84a59d" /></pattern>
    </defs>
    <rect width="120" height="160" fill="url(#k234w)" />
    <rect y="118" width="120" height="42" fill="url(#k234t)" />
    <rect x="8" y="14" width="40" height="34" fill="#a2d2ff" stroke="#9c6644" strokeWidth="2" /><path d="M28 14v34M8 31h40" stroke="#9c6644" strokeWidth="1.2" /><circle cx="40" cy="22" r="3" fill="#fff3b0" /><path d="M8 14q20 10 40 0" fill="#e5989b" opacity=".8" />
    <rect x="62" y="20" width="50" height="4" fill="#9c6644" />{[['#e63946', 64], ['#2a9d8f', 74], ['#e9c46a', 84], ['#9b5de5', 96]].map(([c, x], i) => <path key={i} d={`M${x} 20v-8h7v8`} fill={c} />)}
    <rect x="70" y="88" width="46" height="30" fill="#bc6c25" stroke="#7f5539" strokeWidth="1" /><rect x="70" y="84" width="46" height="5" fill="#dda15e" /><circle cx="84" cy="80" r="5" fill="#ced4da" /><path d="M84 76q-2 -6 2 -10" stroke="#fff" strokeWidth="1" fill="none" opacity=".8" />
    <path d="M100 84v-10h8v10" fill="#e76f51" />
    <g fill="#e63946"><path d="M36 64q-1.4 -2 0 -3.4q1.4 -.8 2 .6q.6 -1.4 2 -.6q1.4 1.4 0 3.4l-2 2z" /><path d="M66 56q-1 -1.6 0 -2.6q1 -.6 1.6 .4q.6 -1 1.6 -.4q1 1 0 2.6l-1.6 1.6z" /></g>
    <g transform="translate(46 116)">
      <circle cy="-46" r="7" fill="#f1c27d" /><path d="M-7 -48q7 -10 14 0q-2 -2 -7 -2t-7 2z" fill="#dee2e6" /><path d="M-5 -42q5 3 10 0" stroke="#6b3e26" strokeWidth=".7" fill="none" /><path d="M-4 -47h3M1 -47h3" stroke="#495057" strokeWidth=".8" />
      <path d="M-8 -38h16l2 24h-20z" fill="#457b9d" /><path d="M-6 -14l-2 14M6 -14l2 14" stroke="#343a40" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M8 -34l14 -2" stroke="#f1c27d" strokeWidth="2.6" strokeLinecap="round" /><path d="M-8 -34l-4 8" stroke="#f1c27d" strokeWidth="2.6" strokeLinecap="round" />
    </g>
    <g transform="translate(72 116)">
      <circle cy="-44" r="7" fill="#e0ac69" /><circle cy="-52" r="4" fill="#ced4da" /><path d="M-7 -46q7 -8 14 0" fill="#ced4da" /><path d="M-4 -40q4 3 8 0" stroke="#6b3e26" strokeWidth=".7" fill="none" /><circle cx="-4" cy="-42" r="1.4" fill="#ff8fab" opacity=".7" />
      <path d="M-8 -36h16l10 36h-36z" fill="#e5989b" /><g fill="#fff" opacity=".7">{[[-6, -20], [4, -14], [-10, -6], [8, -4], [0, -26]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.4" />)}</g>
      <path d="M-8 -32l-6 -4" stroke="#e0ac69" strokeWidth="2.6" strokeLinecap="round" /><path d="M8 -32l8 10" stroke="#e0ac69" strokeWidth="2.6" strokeLinecap="round" />
    </g>
    <g fill="#6d597a"><ellipse cx="22" cy="92" rx="2" ry="1.5" /><path d="M24 92v-8l4 1" stroke="#6d597a" strokeWidth=".8" fill="none" /><ellipse cx="102" cy="64" rx="2" ry="1.5" /><path d="M104 64v-7" stroke="#6d597a" strokeWidth=".8" /></g>
    <g transform="translate(18 134)"><ellipse rx="7" ry="4" fill="#e76f51" /><circle cx="-6" cy="-3" r="3.4" fill="#e76f51" /><path d="M-9 -6l-1 -3 3 1zM-4 -6l1 -3 -3 1z" fill="#e76f51" /><path d="M6 2q6 -2 4 -8" stroke="#e76f51" strokeWidth="2" fill="none" /></g>
  </Svg>],

  [235, 'รถกระเช้าข้ามหุบเขาหมอก', <Svg>
    <defs>
      <linearGradient id="k235s" x2="0" y2="1"><stop stopColor="#bde0fe" /><stop offset="1" stopColor="#e2eafc" /></linearGradient>
      <linearGradient id="k235m" x2="0" y2="1"><stop stopColor="#577590" /><stop offset="1" stopColor="#bde0fe" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k235s)" />
    <circle cx="94" cy="28" r="10" fill="#fff3b0" />
    <path d="M0 90L18 52l14 18 18 -30 22 34 18 -24 30 40V160H0z" fill="url(#k235m)" opacity=".7" />
    <path d="M0 120L22 70l24 30 20 -26 26 40 28 -30V160H0z" fill="#355070" />
    <path d="M22 70l-6 14 8 -4zM66 74l-4 10 8 -2z" fill="#fff" opacity=".9" />
    <g fill="#fff" opacity=".85"><ellipse cx="30" cy="112" rx="40" ry="8" /><ellipse cx="90" cy="120" rx="44" ry="9" /><ellipse cx="60" cy="140" rx="70" ry="10" /></g>
    <path d="M-4 34L124 70" stroke="#343a40" strokeWidth=".9" /><path d="M-4 38L124 74" stroke="#343a40" strokeWidth=".6" />
    <g transform="translate(56 50) rotate(16)">
      <path d="M0 -4v8" stroke="#343a40" strokeWidth="1.2" /><circle cy="-4" r="1.6" fill="#343a40" />
      <rect x="-12" y="4" width="24" height="18" rx="3" fill="#e63946" stroke="#9d0208" strokeWidth="1" /><rect x="-10" y="7" width="9" height="7" rx="1" fill="#caf0f8" /><rect x="1" y="7" width="9" height="7" rx="1" fill="#caf0f8" />
      <path d="M-12 16h24" stroke="#ffd166" strokeWidth="1.4" />
      <circle cx="-6" cy="11" r="2" fill="#f1c27d" /><circle cx="5" cy="11" r="2" fill="#e0ac69" /><path d="M7 10l3 -3" stroke="#e0ac69" strokeWidth="1" />
    </g>
    <g fill="#2b2d42"><path d="M24 54q2 -2 4 0q2 -2 4 0" stroke="#2b2d42" strokeWidth=".7" fill="none" /><path d="M90 46q2 -2 4 0q2 -2 4 0" stroke="#2b2d42" strokeWidth=".7" fill="none" /></g>
    <g transform="translate(6 30)"><rect x="-4" y="0" width="8" height="40" fill="#6c757d" /><path d="M-8 0h16" stroke="#343a40" strokeWidth="2" /></g>
    <g fill="#2d6a4f">{[[10, 150], [20, 146], [100, 150], [110, 146]].map(([x, y], i) => <path key={i} d={`M${x} ${y}l4 -14 4 14z`} />)}</g>
  </Svg>],

  [236, 'ฝูงหิ่งห้อยเป็นรูปหัวใจ', <Svg>
    <defs>
      <linearGradient id="k236s" x2="0" y2="1"><stop stopColor="#0d1b2a" /><stop offset=".7" stopColor="#1b3a4b" /><stop offset="1" stopColor="#144552" /></linearGradient>
      <radialGradient id="k236f"><stop stopColor="#f6ff9e" /><stop offset=".4" stopColor="#d9ed92" stopOpacity=".6" /><stop offset="1" stopColor="#d9ed92" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k236s)" />
    <St p={[10, 10, .6, 40, 6, .7, 90, 12, .6, 110, 30, .5]} />
    {Array.from({ length: 26 }, (_, i) => { const t = i / 26 * Math.PI * 2; const x = 60 + 16 * Math.pow(Math.sin(t), 3) * 1.6; const y = 52 - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 1.6;
      return <g key={i}><circle cx={x.toFixed(1)} cy={y.toFixed(1)} r="4" fill="url(#k236f)" /><circle cx={x.toFixed(1)} cy={y.toFixed(1)} r=".9" fill="#f6ff9e" /></g>; })}
    {[[16, 90], [100, 80], [30, 120], [92, 110], [56, 100], [76, 120]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="4" fill="url(#k236f)" /><circle cx={x} cy={y} r=".8" fill="#f6ff9e" /></g>)}
    <path d="M0 118Q30 110 60 118T120 114V160H0Z" fill="#0b3d2e" /><path d="M0 132Q40 124 80 134T120 130V160H0Z" fill="#081c15" />
    <g fill="#081c15"><path d="M6 120q-2 -40 6 -60q-2 30 0 60z" /><path d="M4 70q-8 -2 -10 6q6 -4 10 -2zM8 66q8 -4 12 2q-6 -2 -12 0z" /><path d="M110 120q2 -34 -4 -50q0 24 0 50z" /><path d="M108 76q-8 -4 -12 2q6 -2 12 0zM108 74q8 -2 10 4q-6 -2 -10 -2z" /></g>
    <g transform="translate(48 140)"><circle cy="-10" r="4" fill="#f1c27d" /><path d="M-4 -12q4 -5 8 0" fill="#3d405b" /><path d="M-4 -6h8l1 9h-10z" fill="#e76f51" /><path d="M3 -4l4 -6" stroke="#f1c27d" strokeWidth="1.6" strokeLinecap="round" /></g>
    <g transform="translate(66 140)"><circle cy="-10" r="4" fill="#e0ac69" /><path d="M-4 -12q4 -5 8 0" fill="#6b3e26" /><circle cy="-15" r="2" fill="#6b3e26" /><path d="M-4 -6h8l3 10h-14z" fill="#9b5de5" /><path d="M-3 -4l-4 -6" stroke="#e0ac69" strokeWidth="1.6" strokeLinecap="round" /></g>
    <path d="M56 132h4" stroke="#f1c27d" strokeWidth="1.6" strokeLinecap="round" />
  </Svg>],

  [237, 'มังกรตัวเล็กเป่าเทียนวันเกิด', <Svg>
    <defs>
      <linearGradient id="k237s" x2="0" y2="1"><stop stopColor="#ffd6ff" /><stop offset="1" stopColor="#bbd0ff" /></linearGradient>
      <radialGradient id="k237d" cx=".4" cy=".35"><stop stopColor="#b9fbc0" /><stop offset="1" stopColor="#38b000" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k237s)" />
    <path d="M0 0Q30 18 60 6T120 10" stroke="#ff8fab" strokeWidth=".8" fill="none" />{[10, 30, 50, 70, 90, 110].map((x, i) => <path key={x} d={`M${x} ${8 + (i % 2) * 4}l-4 8h8z`} fill={['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff924c'][i]} />)}
    <rect y="120" width="120" height="40" fill="#cdb4db" /><path d="M0 120h120" stroke="#9d8189" strokeWidth="1.4" />
    <g transform="translate(78 120)">
      <rect x="-24" y="-30" width="48" height="30" rx="3" fill="#fff0f3" stroke="#ff8fab" strokeWidth="1" /><path d="M-24 -22q6 6 12 0t12 0 12 0 12 0" fill="#ffafcc" />
      <rect x="-20" y="-50" width="40" height="20" rx="3" fill="#ffc8dd" stroke="#ff8fab" strokeWidth="1" /><path d="M-20 -44q5 5 10 0t10 0 10 0 10 0" fill="#fff" opacity=".8" />
      <g fill="#ffd166">{[-12, -4, 4, 12].map(x => <rect key={x} x={x - 1.4} y="-60" width="2.8" height="10" />)}</g>
      <g fill="#ff7b00">{[-12, -4, 4, 12].map((x, i) => <path key={x} d={`M${x} ${-64 + (i % 2)}q3 -4 ${-1 - i} -8q-4 4 ${-2 + i * .4} 8z`} transform={`skewX(-${18 + i * 4})`} />)}</g>
      <g fill="#e63946"><circle cx="-14" cy="-38" r="2" /><circle cx="0" cy="-36" r="2" /><circle cx="14" cy="-38" r="2" /></g>
    </g>
    <g fill="#fff" opacity=".9"><path d="M54 62q8 -4 14 0q-4 2 -8 1q2 2 -2 3z" /><path d="M60 54q6 -2 10 2" stroke="#fff" strokeWidth="1.4" fill="none" /><path d="M58 70q8 0 12 -2" stroke="#fff" strokeWidth="1.2" fill="none" /></g>
    <g transform="translate(34 92)">
      <path d="M-14 26q-12 -6 -14 -20q8 8 14 6" fill="url(#k237d)" stroke="#2d6a4f" strokeWidth=".8" />
      <ellipse cx="0" cy="12" rx="13" ry="16" fill="url(#k237d)" stroke="#2d6a4f" strokeWidth=".8" /><ellipse cx="2" cy="16" rx="7" ry="10" fill="#fefae0" />
      <path d="M-8 0q-12 -10 -6 -18q4 6 10 8zM8 2q10 -14 2 -20q-2 8 -6 10z" fill="#ffd166" stroke="#e09f3e" strokeWidth=".8" />
      <circle cx="6" cy="-10" r="11" fill="url(#k237d)" stroke="#2d6a4f" strokeWidth=".8" />
      <path d="M14 -8q8 -2 10 4q-6 2 -10 0z" fill="url(#k237d)" stroke="#2d6a4f" strokeWidth=".8" /><circle cx="21" cy="-6" r=".8" fill="#2d6a4f" />
      <path d="M2 -20l-2 -6 5 3zM10 -20l2 -7 3 6z" fill="#ffd166" />
      <circle cx="9" cy="-12" r="2.6" fill="#fff" /><circle cx="10" cy="-12" r="1.4" fill="#000" />
      <circle cx="10" cy="-4" r="1.6" fill="#ff8fab" opacity=".7" />
      <path d="M-6 26l-2 6M6 26l2 6" stroke="#38b000" strokeWidth="3" strokeLinecap="round" />
      <path d="M-26 12q-4 4 0 8" stroke="#2d6a4f" strokeWidth="1" fill="none" />
    </g>
    <g transform="translate(14 128)"><rect x="-8" y="-8" width="16" height="12" rx="1" fill="#06d6a0" /><rect x="-1.6" y="-8" width="3.2" height="12" fill="#ef476f" /><path d="M0 -8q-6 -6 -6 0M0 -8q6 -6 6 0" stroke="#ef476f" strokeWidth="1.4" fill="none" /></g>
  </Svg>],

  [238, 'ผีเสื้อยักษ์อุ้มเด็ก', <Svg>
    <defs>
      <linearGradient id="k238s" x2="0" y2="1"><stop stopColor="#a0c4ff" /><stop offset="1" stopColor="#fdffb6" /></linearGradient>
      <linearGradient id="k238w" x2="1" y2="1"><stop stopColor="#ff99c8" /><stop offset=".5" stopColor="#c77dff" /><stop offset="1" stopColor="#7400b8" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k238s)" />
    <Cl x={18} y={24} s={.8} /><Cl x={100} y={40} s={.6} />
    <path d="M0 130Q30 118 60 128T120 122V160H0Z" fill="#95d5b2" /><path d="M0 142Q40 134 80 144T120 140V160H0Z" fill="#52b788" />
    <g>{Array.from({ length: 14 }, (_, i) => <circle key={i} cx={(i * 37) % 118 + 2} cy={136 + (i * 13) % 20} r="1.8" fill={['#ff99c8', '#fcf6bd', '#e4c1f9'][i % 3]} />)}</g>
    <g transform="translate(60 62)">
      <path d="M-2 0Q-44 -46 -50 -10Q-52 12 -4 6z" fill="url(#k238w)" stroke="#3c096c" strokeWidth="1.2" />
      <path d="M2 0Q44 -46 50 -10Q52 12 4 6z" fill="url(#k238w)" stroke="#3c096c" strokeWidth="1.2" />
      <path d="M-4 6Q-36 12 -34 32Q-20 36 -2 12z" fill="#ff99c8" stroke="#3c096c" strokeWidth="1.2" /><path d="M4 6Q36 12 34 32Q20 36 2 12z" fill="#ff99c8" stroke="#3c096c" strokeWidth="1.2" />
      <g fill="#fff" opacity=".8"><circle cx="-30" cy="-14" r="5" /><circle cx="30" cy="-14" r="5" /><circle cx="-22" cy="22" r="3" /><circle cx="22" cy="22" r="3" /></g>
      <g fill="#3c096c"><circle cx="-38" cy="-8" r="2" /><circle cx="38" cy="-8" r="2" /><circle cx="-18" cy="-24" r="1.4" /><circle cx="18" cy="-24" r="1.4" /></g>
      <ellipse cx="0" cy="4" rx="3.4" ry="18" fill="#3c096c" /><circle cy="-16" r="4" fill="#3c096c" />
      <path d="M-2 -20q-6 -10 -10 -10M2 -20q6 -10 10 -10" stroke="#3c096c" strokeWidth="1" fill="none" />
      <path d="M-2 16l-6 18M2 16l6 18" stroke="#3c096c" strokeWidth="1" />
    </g>
    <g transform="translate(60 106)">
      <circle cy="-6" r="5" fill="#f1c27d" /><path d="M-5 -8q5 -6 10 0" fill="#bc6c25" /><path d="M-2 -5q2 2 4 0" stroke="#6b3e26" strokeWidth=".6" fill="none" />
      <path d="M-5 -1h10l2 10h-14z" fill="#ffd166" /><path d="M-5 0l-3 -12M5 0l3 -12" stroke="#f1c27d" strokeWidth="2" strokeLinecap="round" />
      <path d="M-3 9l-2 8M3 9l2 8" stroke="#1d3557" strokeWidth="2.2" strokeLinecap="round" />
    </g>
    <path d="M58 104q-4 -2 -6 2" stroke="#6b3e26" strokeWidth=".4" fill="none" />
  </Svg>],

  [239, 'กระท่อมบนขาไก่', <Svg>
    <defs>
      <linearGradient id="k239s" x2="0" y2="1"><stop stopColor="#2b2d42" /><stop offset=".6" stopColor="#5c677d" /><stop offset="1" stopColor="#979dac" /></linearGradient>
      <radialGradient id="k239w"><stop stopColor="#ffe066" /><stop offset="1" stopColor="#ff9e00" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k239s)" />
    <circle cx="24" cy="26" r="10" fill="#f8f9fa" opacity=".9" /><St p={[50, 10, .7, 80, 20, .6, 100, 8, .8, 110, 40, .5]} />
    <g fill="#1b263b"><path d="M0 120l8 -50 8 50z" /><path d="M10 120l10 -64 10 64z" /><path d="M96 120l9 -54 9 54z" /><path d="M106 120l8 -40 8 40z" /></g>
    <path d="M0 126Q60 116 120 126V160H0Z" fill="#344e41" />
    <g transform="translate(60 120)">
      <path d="M-10 0q-2 -16 2 -26M10 0q2 -16 -2 -26" stroke="#e9c46a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M-10 0l-10 4M-10 0l-4 6M-10 0l2 6M10 0l10 4M10 0l4 6M10 0l-2 6" stroke="#e9c46a" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-8 -26q-2 -4 0 -6M8 -26q2 -4 0 -6" stroke="#bc6c25" strokeWidth="5" strokeLinecap="round" />
      <rect x="-26" y="-62" width="52" height="32" fill="#7f5539" stroke="#3d2b1f" strokeWidth="1.2" /><g stroke="#3d2b1f" strokeWidth=".7">{[-54, -46, -38].map(y => <path key={y} d={`M-26 ${y}h52`} />)}</g>
      <path d="M-32 -60L0 -86l32 26z" fill="#606c38" stroke="#283618" strokeWidth="1.2" /><g stroke="#283618" strokeWidth=".6">{[-12, 0, 12].map(x => <path key={x} d={`M${x} -80l${x > 0 ? 8 : x < 0 ? -8 : 0} 18`} />)}</g>
      <rect x="-18" y="-54" width="10" height="10" fill="url(#k239w)" stroke="#3d2b1f" strokeWidth=".8" /><path d="M-13 -54v10M-18 -49h10" stroke="#3d2b1f" strokeWidth=".6" />
      <rect x="6" y="-56" width="12" height="20" fill="#5a3d2b" stroke="#3d2b1f" strokeWidth=".8" /><circle cx="15" cy="-46" r=".9" fill="#ffd166" />
      <rect x="12" y="-92" width="6" height="12" fill="#495057" /><g fill="#adb5bd" opacity=".7"><circle cx="16" cy="-98" r="3" /><circle cx="20" cy="-104" r="4" /><circle cx="26" cy="-110" r="4.4" /></g>
    </g>
    <circle cx="47" cy="61" r="10" fill="#ffd166" opacity=".2" />
    <g transform="translate(20 140)"><path d="M0 0q-2 -6 2 -8q4 2 2 8z" fill="#9b2226" /><path d="M2 -8v-4" stroke="#283618" strokeWidth="1" /></g>
    <g transform="translate(100 142)" fill="#212529"><path d="M0 0q-4 -6 -10 -4q4 -2 8 -8q2 6 8 6q-4 2 -6 6z" /><circle cx="-2" cy="-4" r=".6" fill="#ffd60a" /></g>
  </Svg>],

  [240, 'นักบินอวกาศตกปลาบนดวงจันทร์', <Svg>
    <defs>
      <linearGradient id="k240s" x2="0" y2="1"><stop stopColor="#000814" /><stop offset="1" stopColor="#001d3d" /></linearGradient>
      <radialGradient id="k240e" cx=".35" cy=".35"><stop stopColor="#90e0ef" /><stop offset=".6" stopColor="#0077b6" /><stop offset="1" stopColor="#03045e" /></radialGradient>
      <linearGradient id="k240m" x2="0" y2="1"><stop stopColor="#e9ecef" /><stop offset="1" stopColor="#adb5bd" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k240s)" />
    <St p={[8, 10, .8, 24, 30, .6, 46, 14, 1, 70, 8, .6, 108, 22, .9, 96, 50, .6, 14, 70, .7, 60, 40, .5]} />
    <circle cx="86" cy="42" r="18" fill="url(#k240e)" /><path d="M78 34q6 -2 8 4q-4 4 -8 2z M88 46q6 0 6 6q-4 2 -6 -2z" fill="#52b788" opacity=".9" /><Cl x={84} y={30} s={.3} o={.8} />
    <path d="M0 112Q30 100 60 108T120 104V160H0Z" fill="url(#k240m)" />
    <g fill="#ced4da"><ellipse cx="20" cy="128" rx="8" ry="2.6" /><ellipse cx="96" cy="136" rx="10" ry="3" /><ellipse cx="60" cy="150" rx="6" ry="2" /></g>
    <g fill="#adb5bd"><ellipse cx="20" cy="127" rx="6" ry="1.6" /><ellipse cx="96" cy="135" rx="7" ry="1.8" /></g>
    <g transform="translate(34 104)">
      <rect x="-9" y="-8" width="18" height="18" rx="4" fill="#f8f9fa" stroke="#adb5bd" strokeWidth="1" /><rect x="-12" y="-6" width="5" height="12" rx="2" fill="#dee2e6" />
      <circle cy="-16" r="9" fill="#f8f9fa" stroke="#adb5bd" strokeWidth="1" /><path d="M-6 -18q6 -6 12 0v4q-6 4 -12 0z" fill="#ffb703" opacity=".85" /><path d="M-4 -18q2 -2 4 -1" stroke="#fff" strokeWidth=".8" fill="none" />
      <path d="M-6 10l-2 8M6 10l2 8" stroke="#f8f9fa" strokeWidth="5" strokeLinecap="round" />
      <path d="M8 -2l10 -8" stroke="#f8f9fa" strokeWidth="4" strokeLinecap="round" />
      <path d="M18 -10L60 -60" stroke="#495057" strokeWidth="1.2" />
      <rect x="-3" y="-4" width="6" height="3" fill="#e63946" />
    </g>
    <path d="M94 44Q100 90 96 132" stroke="#dee2e6" strokeWidth=".5" fill="none" />
    <g transform="translate(96 134)"><path d="M0 -5l1.5 3.5 3.5.5-2.5 2.5.6 3.5-3.1-1.6-3.1 1.6.6-3.5-2.5-2.5 3.5-.5z" fill="#ffd60a" /><circle r="8" fill="#ffd60a" opacity=".2" /></g>
    <g transform="translate(66 118)"><rect x="-6" y="-4" width="12" height="8" rx="1.5" fill="#6c757d" stroke="#343a40" strokeWidth=".8" /><path d="M-6 -1h12" stroke="#343a40" strokeWidth=".6" /><g fill="#ffd60a"><path d="M-2 -8l.8 1.8 1.8.3-1.3 1.2.3 1.8-1.6-.8-1.6.8.3-1.8-1.3-1.2 1.8-.3z" /></g></g>
    <g fill="#fff" opacity=".7"><circle cx="50" cy="96" r=".6" /><circle cx="18" cy="100" r=".5" /></g>
  </Svg>],
];
