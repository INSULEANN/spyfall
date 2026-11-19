// ภาพการ์ดแบบละเอียด ชุด 28 (ภาพใหม่ 209–216) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD28 = [
  [209, 'ปลาทองในถุงกลางงานวัด', <Svg>
    <defs>
      <linearGradient id="k209s" x2="0" y2="1"><stop stopColor="#14213d" /><stop offset="1" stopColor="#3a0ca3" /></linearGradient>
      <radialGradient id="k209b" cx=".4" cy=".35"><stop stopColor="#e0fbfc" stopOpacity=".9" /><stop offset=".7" stopColor="#98c1d9" stopOpacity=".55" /><stop offset="1" stopColor="#3d5a80" stopOpacity=".6" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k209s)" />
    <path d="M0 18Q30 34 60 20T120 22" stroke="#222" strokeWidth=".7" fill="none" />
    {[[8, 22, '#ffd60a'], [20, 27, '#ff595e'], [32, 29, '#8ac926'], [44, 26, '#1982c4'], [56, 21, '#ffca3a'], [68, 21, '#ff595e'], [80, 25, '#6a4c93'], [92, 26, '#8ac926'], [104, 24, '#ffd60a'], [116, 22, '#1982c4']].map(([x, y, c], i) => <g key={i}><circle cx={x} cy={y + 3} r="6" fill={c} opacity=".22" /><circle cx={x} cy={y + 3} r="2.4" fill={c} /></g>)}
    <path d="M10 70l14-18h22l14 18z" fill="#e63946" /><path d="M10 70l7-18h7l-6 18zM31 70l2-18h7l2 18zM46 70l-6-18h6l14 18z" fill="#fff" /><rect x="14" y="70" width="42" height="40" fill="#6b2737" /><path d="M14 70h42" stroke="#ffd166" strokeWidth="1.4" />
    <path d="M66 74l12-14h20l12 14z" fill="#2a9d8f" /><path d="M66 74l6-14h6l-4 14zM86 74l0-14h6l4 14z" fill="#e9f5db" /><rect x="70" y="74" width="36" height="34" fill="#264653" />
    <g fill="#ffd166" opacity=".9"><rect x="20" y="78" width="10" height="6" /><rect x="40" y="80" width="10" height="5" /><rect x="76" y="80" width="10" height="5" /></g>
    <path d="M0 112H120V160H0Z" fill="#1b263b" /><g fill="#415a77">{[0, 20, 40, 60, 80, 100].map(x => <rect key={x} x={x + 2} y="116" width="16" height="2" rx="1" />)}</g>
    <g transform="translate(60 112)">
      <path d="M-4 -40q-2 -4 0 -6h8q2 2 0 6" fill="none" stroke="#e63946" strokeWidth="1.4" />
      <path d="M-5 -40h10" stroke="#e63946" strokeWidth="2" strokeLinecap="round" />
      <path d="M-4 -38Q-20 -24 -18 -6Q-16 12 0 12Q16 12 18 -6Q20 -24 4 -38z" fill="url(#k209b)" stroke="#e0fbfc" strokeWidth=".9" />
      <path d="M-16 -10Q0 -14 16 -10Q18 8 0 10Q-18 8 -16 -10z" fill="#48cae4" opacity=".45" />
      <g transform="translate(-1 -2)"><path d="M-7 0q2-6 8-5q6 1 6 5q0 4-6 5q-6 1-8-5z" fill="#ff7b00" /><path d="M7 0l6-5q-1 5 0 10z" fill="#ffaa00" /><path d="M-2 -5l3-4 2 4z" fill="#ff9e00" /><circle cx="-4" cy="-1" r="1.1" fill="#000" /><circle cx="-4.4" cy="-1.4" r=".4" fill="#fff" /></g>
      <g fill="#fff" opacity=".8"><circle cx="-8" cy="-14" r="1.2" /><circle cx="-6" cy="-20" r=".8" /><ellipse cx="-11" cy="-22" rx="2" ry="5" opacity=".5" /></g>
    </g>
    <g transform="translate(60 132)"><path d="M-14 0q14 12 28 0" fill="#f1c27d" /><path d="M-10 -2q-4 -4 -2 -8M10 -2q4 -4 2 -8" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" fill="none" /></g>
    <g fill="#fff" opacity=".7"><circle cx="18" cy="140" r="1" /><circle cx="100" cy="132" r=".9" /></g>
  </Svg>],

  [210, 'ภูเขาไฟกับมาร์ชเมลโลว์ย่าง', <Svg>
    <defs>
      <linearGradient id="k210s" x2="0" y2="1"><stop stopColor="#2b2d42" /><stop offset=".6" stopColor="#7b2cbf" /><stop offset="1" stopColor="#ff6d00" /></linearGradient>
      <linearGradient id="k210v" x2="0" y2="1"><stop stopColor="#5a3d2b" /><stop offset="1" stopColor="#2b1d14" /></linearGradient>
      <linearGradient id="k210l" x2="0" y2="1"><stop stopColor="#ffd60a" /><stop offset=".5" stopColor="#ff7b00" /><stop offset="1" stopColor="#d00000" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k210s)" />
    <St p={[10, 10, .8, 30, 22, .6, 100, 12, 1, 112, 30, .6]} />
    <g fill="#495057" opacity=".8"><circle cx="58" cy="30" r="8" /><circle cx="66" cy="22" r="10" /><circle cx="76" cy="14" r="12" /><circle cx="90" cy="8" r="13" /></g>
    <path d="M10 140L46 52h28l36 88z" fill="url(#k210v)" />
    <path d="M46 52q14 8 28 0l-2 6q-12 6-24 0z" fill="#ff7b00" />
    <path d="M54 56q-4 20 -12 30q-2 8 -8 14q10 -4 14 -16q6 -14 8 -28zM66 56q2 24 14 36q4 6 8 16q-10 -6 -14 -18q-6 -14 -8 -34z" fill="url(#k210l)" />
    <g fill="#ffba08"><circle cx="50" cy="40" r="3" /><circle cx="64" cy="34" r="2.4" /><circle cx="72" cy="42" r="2" /><circle cx="44" cy="30" r="1.6" /></g>
    <path d="M0 140Q60 128 120 140V160H0Z" fill="#1b1b1e" />
    <g transform="translate(26 140)"><circle cy="-10" r="5" fill="#f1c27d" /><path d="M-5 -12q5 -7 10 0" fill="#d00000" /><path d="M-4 -5h8l1 9h-10z" fill="#3d5a80" /><path d="M-3 4l-1 6M3 4l1 6" stroke="#22223b" strokeWidth="2" strokeLinecap="round" /><path d="M4 -3l26 -26" stroke="#9c6644" strokeWidth="1.4" />
      <g transform="translate(31 -30) rotate(-45)"><rect x="-4" y="-3" width="8" height="6" rx="2" fill="#fff8f0" /><rect x="-4" y="-3" width="8" height="2.4" rx="1" fill="#d4a373" /></g></g>
    <g transform="translate(96 142)"><circle cy="-10" r="5" fill="#8d5524" /><path d="M-5 -12q5 -7 10 0" fill="#1d3557" /><path d="M-4 -5h8l1 9h-10z" fill="#e9c46a" /><path d="M-3 4l-1 6M3 4l1 6" stroke="#22223b" strokeWidth="2" strokeLinecap="round" /><path d="M-4 -3l-18 -22" stroke="#9c6644" strokeWidth="1.4" />
      <g transform="translate(-22 -26)"><rect x="-4" y="-3" width="8" height="6" rx="2" fill="#fff8f0" /><rect x="-4" y=".6" width="8" height="2.4" rx="1" fill="#6f4518" /></g><path d="M-24 -32q2-3 0-6" stroke="#adb5bd" strokeWidth=".7" fill="none" /></g>
    <g fill="#ffd60a" opacity=".9"><circle cx="40" cy="100" r=".9" /><circle cx="80" cy="96" r="1" /><circle cx="60" cy="110" r=".7" /></g>
  </Svg>],

  [211, 'ตู้เสื้อผ้าที่มีป่าอยู่ข้างใน', <Svg>
    <defs>
      <linearGradient id="k211w" x2="0" y2="1"><stop stopColor="#e9d8a6" /><stop offset="1" stopColor="#d4a373" /></linearGradient>
      <linearGradient id="k211f" x2="0" y2="1"><stop stopColor="#d8f3dc" /><stop offset=".5" stopColor="#74c69d" /><stop offset="1" stopColor="#1b4332" /></linearGradient>
      <linearGradient id="k211d" x2="1"><stop stopColor="#7f5539" /><stop offset="1" stopColor="#9c6644" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k211w)" />
    <g stroke="#c8a27a" strokeWidth=".6">{[10, 30, 50, 70, 90, 110].map(x => <path key={x} d={`M${x} 0v128`} />)}</g>
    <rect y="128" width="120" height="32" fill="#8d6346" /><g stroke="#6f4518" strokeWidth=".6">{[136, 146, 156].map(y => <path key={y} d={`M0 ${y}h120`} />)}</g>
    <rect x="26" y="20" width="68" height="112" rx="3" fill="#6f4518" stroke="#3d2b1f" strokeWidth="1.6" />
    <rect x="32" y="26" width="56" height="102" fill="url(#k211f)" />
    <circle cx="64" cy="44" r="6" fill="#fff3b0" opacity=".9" />
    <g fill="#2d6a4f"><path d="M38 128l8-34 8 34z" /><path d="M42 106l4-16 4 16z" /><path d="M70 128l9-40 9 40z" /><path d="M74 102l5-20 5 20z" /></g>
    <g fill="#40916c"><path d="M54 128l6-24 6 24z" /><path d="M32 128l5-18 5 18z" /><path d="M84 128l4-14 4 14z" /></g>
    <path d="M60 128q-2-8 2-14q4 6 2 14z" fill="#d8f3dc" opacity=".6" />
    <g transform="translate(58 118)"><ellipse rx="3" ry="2" fill="#bc6c25" /><circle cx="-3" cy="-2" r="1.6" fill="#bc6c25" /><path d="M-3 -4l-1-3M-2 -4l1-3" stroke="#6f4518" strokeWidth=".5" /></g>
    <g fill="#fff" opacity=".8"><circle cx="40" cy="40" r=".9" /><circle cx="80" cy="60" r=".8" /><circle cx="50" cy="70" r=".7" /><circle cx="76" cy="34" r=".6" /></g>
    <path d="M32 26L14 34V124L32 128z" fill="url(#k211d)" stroke="#3d2b1f" strokeWidth="1.2" /><circle cx="18" cy="80" r="1.6" fill="#ffd166" />
    <path d="M88 26l16 6V124l-16 4z" fill="url(#k211d)" stroke="#3d2b1f" strokeWidth="1.2" /><circle cx="100" cy="80" r="1.6" fill="#ffd166" />
    <path d="M32 26h56" stroke="#adb5bd" strokeWidth="1" /><g stroke="#adb5bd" strokeWidth=".8" fill="none"><path d="M40 26v4q-4 2-6 6M46 26v4q4 2 6 6" /></g><path d="M34 36h12l-2 18h-8z" fill="#e63946" opacity=".9" />
    <g transform="translate(108 140)"><path d="M-10 0q2 -10 10 -10q6 0 6 6" fill="#ffafcc" /><path d="M-10 0h12" stroke="#ff8fab" strokeWidth="1.4" /></g>
    <g fill="#74c69d" opacity=".9"><path d="M20 132q4 -2 6 2q-4 2 -6 -2z" /><path d="M96 134q4 -3 6 1q-4 3 -6 -1z" /></g>
  </Svg>],

  [212, 'เทวดาตัวน้อยซ่อมเมฆ', <Svg>
    <defs>
      <linearGradient id="k212s" x2="0" y2="1"><stop stopColor="#90e0ef" /><stop offset="1" stopColor="#caf0f8" /></linearGradient>
      <radialGradient id="k212h"><stop stopColor="#fff3b0" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k212s)" />
    <circle cx="100" cy="20" r="18" fill="url(#k212h)" /><circle cx="100" cy="20" r="8" fill="#fff3b0" />
    <Cl x={20} y={30} s={.8} o={.8} /><Cl x={80} y={52} s={.6} o={.7} />
    <g fill="#fff"><ellipse cx="60" cy="102" rx="44" ry="16" /><circle cx="34" cy="92" r="16" /><circle cx="56" cy="84" r="20" /><circle cx="82" cy="90" r="16" /><circle cx="96" cy="100" r="10" /></g>
    <path d="M50 102l6 10 -4 8 6 10" stroke="#90e0ef" strokeWidth="2.6" fill="none" />
    <path d="M44 104q6 -2 12 2" stroke="#e5e5e5" strokeWidth="1" fill="none" />
    <g fill="#ced4da"><rect x="48" y="104" width="12" height="3" rx="1" transform="rotate(30 54 105)" /><rect x="50" y="114" width="10" height="3" rx="1" transform="rotate(-30 55 115)" /></g>
    <g fill="#bde0fe"><path d="M54 122l2 6 2-6z" /><path d="M48 132l1.6 5 1.6-5z" /><path d="M60 136l1.4 4 1.4-4z" /></g>
    <g transform="translate(72 70)">
      <path d="M-4 0q-12 -12 -16 -2q6 4 14 4zM4 0q12 -12 16 -2q-6 4 -14 4z" fill="#fff" stroke="#dee2e6" strokeWidth=".7" />
      <ellipse cy="-14" rx="7" ry="2" fill="none" stroke="#ffd60a" strokeWidth="1.4" />
      <circle cy="-6" r="6" fill="#ffd7ba" /><path d="M-6 -8q6 -8 12 0q-2 -4 -6 -4t-6 4z" fill="#f4a261" /><circle cx="-2.2" cy="-6" r=".8" fill="#333" /><circle cx="2.2" cy="-6" r=".8" fill="#333" /><path d="M-1.6 -3q1.6 1.2 3.2 0" stroke="#e76f51" strokeWidth=".6" fill="none" />
      <path d="M-5 0h10l2 12h-14z" fill="#fff" stroke="#dee2e6" strokeWidth=".6" />
      <path d="M-5 3l-10 12M5 3l6 10" stroke="#ffd7ba" strokeWidth="2.4" strokeLinecap="round" />
      <g transform="translate(-16 16) rotate(-30)"><rect x="-1" y="-10" width="2" height="10" fill="#9c6644" /><rect x="-4" y="-13" width="8" height="4" rx="1" fill="#6c757d" /></g>
    </g>
    <g transform="translate(26 120)"><rect x="-10" y="0" width="20" height="10" rx="2" fill="#e76f51" /><path d="M-6 0v-3h12v3" stroke="#9d0208" strokeWidth="1.4" fill="none" /><g fill="#adb5bd"><rect x="-8" y="-6" width="3" height="6" /><rect x="-3" y="-8" width="2" height="8" /></g></g>
    <path d="M26 112q-4 4 0 8" stroke="#adb5bd" strokeWidth=".6" fill="none" />
    <path d="M0 150Q60 140 120 150V160H0Z" fill="#95d5b2" /><g fill="#52b788"><circle cx="20" cy="150" r="3" /><circle cx="90" cy="148" r="4" /></g>
  </Svg>],

  [213, 'พ่อค้าขายลูกโป่งรูปสัตว์', <Svg>
    <defs>
      <linearGradient id="k213s" x2="0" y2="1"><stop stopColor="#fefae0" /><stop offset="1" stopColor="#faedcd" /></linearGradient>
      <linearGradient id="k213g" x2="0" y2="1"><stop stopColor="#a7c957" /><stop offset="1" stopColor="#6a994e" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k213s)" />
    <Cl x={18} y={20} s={.7} f="#fff" /><Cl x={100} y={30} s={.6} />
    <path d="M0 128Q60 118 120 128V160H0Z" fill="url(#k213g)" /><path d="M0 136h120" stroke="#e9c46a" strokeWidth="8" opacity=".6" />
    <g stroke="#6c757d" strokeWidth=".5" fill="none"><path d="M60 98L30 50M60 98L44 34M60 98L62 30M60 98L80 40M60 98L96 56M60 98L20 70M60 98L102 76" /></g>
    <g transform="translate(30 46)"><ellipse rx="10" ry="8" fill="#ff8fab" /><circle cx="-10" cy="-4" r="5" fill="#ff8fab" /><ellipse cx="-14" cy="-2" rx="2.4" ry="1.8" fill="#fb6f92" /><circle cx="-11" cy="-6" r=".8" fill="#333" /><path d="M8 -2q4 -2 2 -6" stroke="#fb6f92" strokeWidth="1" fill="none" /><path d="M-6 -8l-2 -4 4 2z" fill="#ff8fab" /></g>
    <g transform="translate(44 30)"><circle r="9" fill="#ffd166" /><circle cx="-7" cy="-7" r="4" fill="#ffd166" /><circle cx="7" cy="-7" r="4" fill="#ffd166" /><circle cx="-7" cy="-7" r="2" fill="#f4a261" /><circle cx="7" cy="-7" r="2" fill="#f4a261" /><circle cx="-3" cy="-1" r="1" fill="#333" /><circle cx="3" cy="-1" r="1" fill="#333" /><ellipse cy="3" rx="2.4" ry="1.6" fill="#9c6644" /></g>
    <g transform="translate(62 26)"><ellipse rx="9" ry="10" fill="#90e0ef" /><path d="M-5 -8q-2 -12 2 -14q2 6 1 14zM5 -8q2 -12 -2 -14q-2 6 -1 14z" fill="#90e0ef" /><circle cx="-3" cy="-1" r="1" fill="#333" /><circle cx="3" cy="-1" r="1" fill="#333" /><path d="M-1 3h2l-1 1z" fill="#ff8fab" /></g>
    <g transform="translate(80 38)"><ellipse rx="10" ry="8" fill="#b5e48c" /><path d="M-10 -2q-8 -2 -10 4" stroke="#b5e48c" strokeWidth="4" strokeLinecap="round" fill="none" /><circle cx="6" cy="-2" r="1" fill="#333" /><circle cx="-2" cy="-2" r="1" fill="#333" /><path d="M-2 3q4 2 8 0" stroke="#333" strokeWidth=".7" fill="none" /></g>
    <g transform="translate(96 54)"><circle r="9" fill="#cdb4db" /><path d="M-8 -4l-4 -8 8 4zM8 -4l4 -8 -8 4z" fill="#cdb4db" /><circle cx="-3" cy="-1" r="1" fill="#333" /><circle cx="3" cy="-1" r="1" fill="#333" /><path d="M-6 2h-6M-6 4h-6M6 2h6M6 4h6" stroke="#6d597a" strokeWidth=".5" /></g>
    <g transform="translate(20 68)"><circle r="8" fill="#ffb4a2" /><path d="M-6 -6l-4 -6 6 2zM6 -6l4 -6 -6 2z" fill="#e5989b" /><circle cx="-2.6" cy="-1" r=".9" fill="#333" /><circle cx="2.6" cy="-1" r=".9" fill="#333" /></g>
    <g transform="translate(102 76)"><circle r="8" fill="#f9c74f" /><path d="M-2 -8q2 -4 4 0" fill="#f9844a" /><circle cx="-2.6" cy="-1" r=".9" fill="#333" /><path d="M2 2l5 -1 -5 3z" fill="#f9844a" /></g>
    <g transform="translate(60 112)">
      <circle cy="-20" r="7" fill="#e0ac69" /><path d="M-7 -22q7 -10 14 0" fill="#3d405b" /><path d="M-9 -24h18" stroke="#3d405b" strokeWidth="2" /><path d="M-3 -16q3 2 6 0" stroke="#6b3e26" strokeWidth=".8" fill="none" /><path d="M-4 -18q4 1 8 0" stroke="#3d405b" strokeWidth="1.2" />
      <path d="M-8 -12h16l3 22h-22z" fill="#e63946" /><path d="M-8 -12l8 6 8 -6" fill="#f1faee" />
      <path d="M8 -10l2 -4M-8 -10l-4 6" stroke="#e0ac69" strokeWidth="3" strokeLinecap="round" />
      <path d="M-6 10l-2 14M6 10l2 14" stroke="#264653" strokeWidth="3.2" strokeLinecap="round" />
    </g>
    <g transform="translate(26 138)"><circle cy="-8" r="3.6" fill="#f1c27d" /><path d="M-3 -4h6l1 7h-8z" fill="#ffb703" /><path d="M2 -6l6 -10" stroke="#f1c27d" strokeWidth="1.4" strokeLinecap="round" /><path d="M8 -16v-10" stroke="#6c757d" strokeWidth=".4" /><circle cx="8" cy="-30" r="4" fill="#ef476f" /></g>
  </Svg>],

  [214, 'แม่มดต้มซุปฟักทอง', <Svg>
    <defs>
      <linearGradient id="k214s" x2="0" y2="1"><stop stopColor="#240046" /><stop offset="1" stopColor="#5a189a" /></linearGradient>
      <radialGradient id="k214f"><stop stopColor="#ffd60a" /><stop offset=".5" stopColor="#ff7b00" /><stop offset="1" stopColor="#ff7b00" stopOpacity="0" /></radialGradient>
      <radialGradient id="k214p" cx=".4" cy=".35"><stop stopColor="#ffd166" /><stop offset="1" stopColor="#f77f00" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k214s)" />
    <St p={[10, 12, 1, 30, 26, .7, 100, 10, .9, 112, 32, .7, 76, 20, .6]} />
    <circle cx="90" cy="34" r="12" fill="#fff3b0" /><circle cx="86" cy="30" r="12" fill="#240046" opacity=".0" />
    <path d="M0 132Q60 120 120 132V160H0Z" fill="#10002b" />
    <circle cx="60" cy="134" r="26" fill="url(#k214f)" />
    <g fill="#ff7b00"><path d="M50 136q2 -12 6 -14q-2 8 2 14z" /><path d="M58 136q4 -14 8 -16q-2 10 0 16z" /><path d="M64 136q2 -8 6 -10q-2 6 0 10z" /></g>
    <path d="M38 112h44q2 18 -10 24h-24q-12 -6 -10 -24z" fill="#212529" stroke="#495057" strokeWidth="1.2" /><ellipse cx="60" cy="112" rx="22" ry="5" fill="#ff9e00" /><ellipse cx="60" cy="112" rx="18" ry="3.6" fill="#ffb703" />
    <g fill="#ffd166"><circle cx="54" cy="110" r="2" /><circle cx="64" cy="111" r="1.6" /><circle cx="60" cy="108" r="1.2" /></g>
    <g fill="#fefae0" opacity=".7"><circle cx="52" cy="102" r="3" /><circle cx="58" cy="94" r="4" /><circle cx="54" cy="84" r="3" /><circle cx="60" cy="76" r="2.4" /></g>
    <path d="M44 136l-6 8M76 136l6 8" stroke="#495057" strokeWidth="2" />
    <g transform="translate(88 104)">
      <path d="M-10 36L-6 4h12l4 32z" fill="#3c096c" /><path d="M-6 4l-2 -4h16l-2 4z" fill="#240046" />
      <circle cy="-6" r="7" fill="#b5e48c" /><path d="M2 -6l6 2 -6 1z" fill="#99d98c" /><circle cx="-3" cy="-8" r="1" fill="#000" /><circle cx="3" cy="-8" r="1" fill="#000" /><path d="M-3 -2q3 2 6 0" stroke="#3a5a40" strokeWidth=".8" fill="none" />
      <path d="M-10 -10h20" stroke="#10002b" strokeWidth="2.4" strokeLinecap="round" /><path d="M-6 -10L2 -32l4 22z" fill="#10002b" /><path d="M-5 -13h10" stroke="#9d4edd" strokeWidth="1.6" />
      <path d="M-6 0q-6 -2 -6 6" fill="#ff7b00" /><path d="M6 6l-20 2" stroke="#b5e48c" strokeWidth="2.4" strokeLinecap="round" /><path d="M-14 8l-10 2" stroke="#9c6644" strokeWidth="2" />
    </g>
    <g><circle cx="20" cy="132" r="9" fill="url(#k214p)" /><path d="M16 124q4 -2 8 0" stroke="#e85d04" strokeWidth="1" fill="none" /><path d="M20 123v-4" stroke="#386641" strokeWidth="1.6" /><path d="M16 132l2 -2 2 2M21 132l2 -2 2 2M17 136h6" stroke="#3c096c" strokeWidth=".8" fill="none" /></g>
    <g transform="translate(18 104)" fill="#10002b"><path d="M0 0q-4 -6 -10 -4q4 -2 8 -8q2 6 8 6q-4 2 -6 6z" /><circle cx="-2" cy="-4" r=".6" fill="#ffd60a" /></g>
  </Svg>],

  [215, 'หุ่นยนต์ตกหลุมรักไฟจราจร', <Svg>
    <defs>
      <linearGradient id="k215s" x2="0" y2="1"><stop stopColor="#1d3557" /><stop offset="1" stopColor="#457b9d" /></linearGradient>
      <linearGradient id="k215r" x2="1"><stop stopColor="#adb5bd" /><stop offset=".5" stopColor="#e9ecef" /><stop offset="1" stopColor="#868e96" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k215s)" />
    <g fill="#14213d">{[[0, 60, 18], [16, 44, 16], [30, 70, 14], [88, 50, 16], [102, 30, 18]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height={130 - y} />)}</g>
    <g fill="#ffd166" opacity=".7">{[[4, 66], [10, 76], [20, 50], [24, 62], [34, 76], [92, 58], [96, 70], [106, 38], [110, 52]].map(([x, y], i) => <rect key={i} x={x} y={y} width="3" height="4" />)}</g>
    <path d="M0 130H120V160H0Z" fill="#343a40" /><g fill="#f8f9fa">{[6, 30, 54, 78, 102].map(x => <rect key={x} x={x} y="143" width="14" height="3" />)}</g>
    <g transform="translate(86 70)"><rect x="-1.6" y="0" width="3.2" height="62" fill="#495057" /><rect x="-8" y="-30" width="16" height="34" rx="3" fill="#212529" stroke="#495057" strokeWidth="1" />
      <circle cy="-22" r="4" fill="#5c0a0a" /><circle cy="-12" r="4" fill="#6b5000" /><circle cy="-2" r="4" fill="#06d6a0" /><circle cy="-2" r="9" fill="#06d6a0" opacity=".25" />
      <path d="M-3 -1q1.5 1.6 3 0q1.5 1.6 3 0" stroke="#033" strokeWidth=".6" fill="none" /><g fill="#033"><circle cx="-1.6" cy="-4" r=".5" /><circle cx="1.6" cy="-4" r=".5" /></g>
      <path d="M-12 -12q-2 -4 1 -6M12 -12q2 -4 -1 -6" stroke="#ff8fab" strokeWidth=".8" fill="none" /></g>
    <g transform="translate(46 108)">
      <rect x="-12" y="-14" width="24" height="24" rx="3" fill="url(#k215r)" stroke="#495057" strokeWidth="1" />
      <rect x="-6" y="-8" width="12" height="9" rx="1.5" fill="#212529" /><path d="M-4 -4q1 -2 2 0q1 -2 2 0l-2 2z" fill="#ff006e" /><path d="M1 -4q1 -2 2 0q1 -2 2 0l-2 2z" fill="#ff006e" transform="translate(-1 0)" />
      <rect x="-10" y="-34" width="20" height="16" rx="3" fill="url(#k215r)" stroke="#495057" strokeWidth="1" />
      <circle cx="-4" cy="-27" r="3" fill="#ffd166" /><circle cx="4" cy="-27" r="3" fill="#ffd166" /><circle cx="-4" cy="-27" r="1.4" fill="#333" /><circle cx="4" cy="-27" r="1.4" fill="#333" />
      <path d="M-3 -22q3 2 6 0" stroke="#333" strokeWidth=".8" fill="none" /><circle cx="-7" cy="-22" r="1.6" fill="#ff8fab" opacity=".8" /><circle cx="7" cy="-22" r="1.6" fill="#ff8fab" opacity=".8" />
      <path d="M0 -34v-6" stroke="#495057" strokeWidth="1" /><circle cy="-41" r="2" fill="#ff006e" />
      <path d="M12 -6l12 -10M-12 -6l-8 8" stroke="#adb5bd" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(26 -18)"><path d="M0 0q-3 -4 0 -6q3 2 0 6q-3 -4 0 -6" fill="#ff006e" /><path d="M0 0v8" stroke="#2d6a4f" strokeWidth=".8" /></g>
      <rect x="-9" y="10" width="6" height="12" fill="#868e96" /><rect x="3" y="10" width="6" height="12" fill="#868e96" />
    </g>
    <g fill="#ff006e"><path d="M60 58q-2 -3 0 -5q2 -1 3 1q1 -2 3 -1q2 2 0 5l-3 3z" /><path d="M70 46q-1.4 -2 0 -3.4q1.4 -.8 2 .6q.6 -1.4 2 -.6q1.4 1.4 0 3.4l-2 2z" /><path d="M56 42q-1 -1.6 0 -2.6q1 -.6 1.6.4q.6 -1 1.6 -.4q1 1 0 2.6l-1.6 1.6z" /></g>
  </Svg>],

  [216, 'หมาถือร่มให้แมว', <Svg>
    <defs>
      <linearGradient id="k216s" x2="0" y2="1"><stop stopColor="#6c757d" /><stop offset="1" stopColor="#adb5bd" /></linearGradient>
      <radialGradient id="k216u" cx=".5" cy=".9"><stop stopColor="#ffd60a" /><stop offset="1" stopColor="#f77f00" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k216s)" />
    <g stroke="#dee2e6" strokeWidth=".8" opacity=".7">{Array.from({ length: 26 }, (_, i) => <path key={i} d={`M${(i * 37) % 124} ${(i * 53) % 150} l-3 8`} />)}</g>
    <path d="M0 128H120V160H0Z" fill="#495057" /><ellipse cx="60" cy="140" rx="34" ry="5" fill="#6c757d" /><ellipse cx="60" cy="140" rx="26" ry="3" fill="#a5b4c3" opacity=".6" />
    <g stroke="#adb5bd" strokeWidth=".6" fill="none">{[[20, 136], [94, 134], [44, 150]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="5" ry="1.4" />)}</g>
    <path d="M30 66Q60 34 92 66q-5 -4 -10 0q-5 -4 -10 0q-5 -4 -11 0q-5 -4 -10 0q-6 -4 -11 0q-5 -4 -10 0z" fill="url(#k216u)" stroke="#e85d04" strokeWidth=".8" />
    <path d="M61 42v-4" stroke="#6c757d" strokeWidth="1.4" /><path d="M61 66V98q0 4 -4 4" stroke="#495057" strokeWidth="1.6" fill="none" />
    <g transform="translate(78 112)">
      <ellipse cx="0" cy="12" rx="12" ry="14" fill="#d4a373" /><ellipse cx="0" cy="16" rx="7" ry="9" fill="#fefae0" />
      <circle cy="-6" r="10" fill="#d4a373" /><path d="M-9 -8q-6 4 -4 14q4 -4 6 -10zM9 -8q6 4 4 14q-4 -4 -6 -10z" fill="#9c6644" />
      <ellipse cy="-2" rx="5" ry="3.6" fill="#fefae0" /><circle cy="-3" r="1.6" fill="#333" /><circle cx="-4" cy="-8" r="1.2" fill="#333" /><circle cx="4" cy="-8" r="1.2" fill="#333" /><path d="M-2 0q2 2 4 0" stroke="#333" strokeWidth=".7" fill="none" />
      <path d="M-10 4q-12 -8 -16 -12" stroke="#d4a373" strokeWidth="4" strokeLinecap="round" /><path d="M8 26q6 0 8 -4" stroke="#d4a373" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
    <g transform="translate(44 120)">
      <path d="M-8 18q-2 -14 8 -16q10 2 8 16z" fill="#343a40" /><circle cy="-2" r="8" fill="#343a40" /><path d="M-7 -6l-1 -7 5 4zM7 -6l1 -7 -5 4z" fill="#343a40" />
      <circle cx="-3" cy="-2" r="1.6" fill="#ffd60a" /><circle cx="3" cy="-2" r="1.6" fill="#ffd60a" /><circle cx="-3" cy="-2" r=".7" fill="#000" /><circle cx="3" cy="-2" r=".7" fill="#000" /><path d="M-1 2h2l-1 1z" fill="#ff8fab" />
      <path d="M8 16q8 -2 6 -10" stroke="#343a40" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M-4 4h-6M-4 5.6h-6M4 4h6M4 5.6h6" stroke="#adb5bd" strokeWidth=".4" />
    </g>
    <path d="M12 0q-2 10 2 20" stroke="#dee2e6" strokeWidth=".6" fill="none" opacity=".5" />
  </Svg>],
];
