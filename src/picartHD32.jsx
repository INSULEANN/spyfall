// ภาพการ์ดแบบละเอียด ชุด 32 (ภาพใหม่ 241–248) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD32 = [
  [241, 'พิซซ่าเป็นดาวเคราะห์', <Svg>
    <defs>
      <linearGradient id="k241s" x2="0" y2="1"><stop stopColor="#10002b" /><stop offset="1" stopColor="#3c096c" /></linearGradient>
      <radialGradient id="k241p" cx=".4" cy=".35"><stop stopColor="#ffe8a3" /><stop offset=".8" stopColor="#f4a261" /><stop offset="1" stopColor="#bc6c25" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k241s)" />
    <St p={[8, 12, .9, 26, 40, .6, 50, 10, .7, 96, 14, 1, 112, 50, .7, 14, 120, .6, 104, 140, .8, 40, 150, .6, 90, 110, .5]} />
    <ellipse cx="60" cy="80" rx="54" ry="12" fill="none" stroke="#ffd166" strokeWidth="3" opacity=".7" transform="rotate(-16 60 80)" />
    <circle cx="60" cy="80" r="34" fill="url(#k241p)" stroke="#9c6644" strokeWidth="2" />
    <circle cx="60" cy="80" r="29" fill="#e63946" opacity=".85" /><circle cx="60" cy="80" r="27" fill="#ffd166" opacity=".75" />
    <g fill="#c1121f">{[[48, 66], [70, 70], [56, 88], [76, 92], [44, 94], [64, 76]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="5" /><circle cx={x - 1} cy={y - 1} r="1.4" fill="#ff8fa3" /></g>)}</g>
    <g fill="#2d6a4f">{[[56, 70], [80, 80], [50, 80], [68, 100]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q3 -3 6 0q-3 3 -6 0z`} />)}</g>
    <g fill="#212529">{[[62, 62], [84, 72], [40, 84], [74, 102]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" />)}</g>
    <path d="M28 70q-4 10 2 20" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".4" />
    <path d="M6 96q54 30 108 -32" stroke="#ffd166" strokeWidth="3" fill="none" opacity=".9" transform="rotate(0)" />
    <g transform="translate(96 120) rotate(30)"><path d="M0 0l-10 -20h20z" fill="#ffd166" stroke="#9c6644" strokeWidth="1" /><circle cx="-2" cy="-12" r="2.4" fill="#c1121f" /><path d="M-10 -20q10 -4 20 0" stroke="#bc6c25" strokeWidth="2.4" fill="none" /></g>
    <g transform="translate(22 40)"><circle r="5" fill="#ffd166" stroke="#9c6644" strokeWidth=".8" /><circle r="3" fill="#e63946" /></g>
    <g transform="translate(30 132) scale(.8)"><rect x="-8" y="-6" width="16" height="12" rx="4" fill="#f8f9fa" /><circle cy="-11" r="7" fill="#f8f9fa" /><path d="M-4 -13q4 -4 8 0v3q-4 3 -8 0z" fill="#90e0ef" /><path d="M8 -2l8 -6" stroke="#f8f9fa" strokeWidth="3.4" strokeLinecap="round" /><path d="M16 -8l4 -2" stroke="#adb5bd" strokeWidth="1.6" /></g>
  </Svg>],

  [242, 'แพนด้ากินบะหมี่', <Svg>
    <defs>
      <linearGradient id="k242s" x2="0" y2="1"><stop stopColor="#d8f3dc" /><stop offset="1" stopColor="#95d5b2" /></linearGradient>
      <radialGradient id="k242b" cx=".5" cy=".3"><stop stopColor="#fff" /><stop offset="1" stopColor="#e63946" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k242s)" />
    <g stroke="#52b788" strokeWidth="3">{[8, 18, 100, 112].map(x => <path key={x} d={`M${x} 0v160`} />)}</g>
    <g stroke="#40916c" strokeWidth=".8">{[8, 18, 100, 112].map(x => [30, 70, 110].map(y => <path key={x + '-' + y} d={`M${x - 2} ${y}h4`} />))}</g>
    <g fill="#52b788">{[[8, 40, -1], [18, 80, 1], [100, 30, -1], [112, 90, 1]].map(([x, y, d], i) => <path key={i} d={`M${x} ${y}q${d * 12} -6 ${d * 16} 2q${-d * 10} 0 ${-d * 16} -2z`} />)}</g>
    <rect y="118" width="120" height="42" fill="#bc6c25" /><path d="M0 118h120" stroke="#7f5539" strokeWidth="2" /><g stroke="#9c6644" strokeWidth=".6">{[128, 140, 152].map(y => <path key={y} d={`M0 ${y}h120`} />)}</g>
    <g transform="translate(60 84)">
      <ellipse cx="0" cy="24" rx="24" ry="22" fill="#f8f9fa" stroke="#adb5bd" strokeWidth=".8" />
      <path d="M-22 14q-4 20 6 30M22 14q4 20 -6 30" stroke="#212529" strokeWidth="9" fill="none" strokeLinecap="round" />
      <circle cy="-10" r="20" fill="#f8f9fa" stroke="#adb5bd" strokeWidth=".8" />
      <circle cx="-16" cy="-26" r="7" fill="#212529" /><circle cx="16" cy="-26" r="7" fill="#212529" />
      <ellipse cx="-8" cy="-12" rx="5" ry="6.4" fill="#212529" transform="rotate(20 -8 -12)" /><ellipse cx="8" cy="-12" rx="5" ry="6.4" fill="#212529" transform="rotate(-20 8 -12)" />
      <circle cx="-7" cy="-12" r="1.8" fill="#fff" /><circle cx="7" cy="-12" r="1.8" fill="#fff" />
      <ellipse cy="-2" rx="3" ry="2" fill="#212529" /><circle cx="-12" cy="0" r="2.4" fill="#ffc8dd" opacity=".7" /><circle cx="12" cy="0" r="2.4" fill="#ffc8dd" opacity=".7" />
      <path d="M-2 4q2 2 4 0" stroke="#212529" strokeWidth=".8" fill="none" />
      <path d="M-1 4q-2 10 2 16M1 4q4 8 2 16M0 4q0 10 -4 16" stroke="#ffe066" strokeWidth="1.4" fill="none" />
    </g>
    <g transform="translate(60 112)">
      <path d="M-22 0h44q-2 20 -22 22q-20 -2 -22 -22z" fill="url(#k242b)" stroke="#9d0208" strokeWidth="1" />
      <ellipse cy="0" rx="22" ry="5" fill="#f4a261" /><g stroke="#ffe066" strokeWidth="1.6" fill="none"><path d="M-16 0q4 -3 8 0t8 0t8 0" /><path d="M-12 2q4 -3 8 0t8 0t8 0" /></g>
      <circle cx="-10" cy="-1" r="3" fill="#fff" /><circle cx="-10" cy="-1" r="1.4" fill="#ffb703" /><path d="M6 -2h8" stroke="#ff8fab" strokeWidth="2.4" /><path d="M2 -1q2 -2 4 0" stroke="#2d6a4f" strokeWidth="1.6" fill="none" />
      <path d="M-6 8q6 4 12 0" stroke="#ffd166" strokeWidth="1" fill="none" />
    </g>
    <path d="M70 70l20 -26M73 72l21 -24" stroke="#9c6644" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M78 74q6 4 6 12" stroke="#212529" strokeWidth="7" fill="none" strokeLinecap="round" />
    <g fill="#fff" opacity=".7"><path d="M52 100q-2 -6 2 -10q-2 6 2 8" stroke="#fff" strokeWidth="1" fill="none" /><path d="M66 98q-2 -6 2 -10" stroke="#fff" strokeWidth="1" fill="none" /></g>
  </Svg>],

  [243, 'ป่าไผ่ยามหมอกกับเสือ', <Svg>
    <defs>
      <linearGradient id="k243s" x2="0" y2="1"><stop stopColor="#f1faee" /><stop offset="1" stopColor="#a8dadc" /></linearGradient>
      <linearGradient id="k243t" x2="0" y2="1"><stop stopColor="#f77f00" /><stop offset="1" stopColor="#d62828" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k243s)" />
    <circle cx="86" cy="34" r="14" fill="#e63946" opacity=".8" />
    {[[6, .25, 3], [22, .35, 4], [40, .25, 3], [76, .35, 4], [96, .25, 3], [110, .4, 4]].map(([x, o, w], i) => <g key={i} opacity={o}><path d={`M${x} 0v160`} stroke="#2d6a4f" strokeWidth={w} />{[20, 50, 80, 110, 140].map(y => <path key={y} d={`M${x - w} ${y}h${w * 2}`} stroke="#f1faee" strokeWidth=".8" />)}</g>)}
    {[[14, 5], [32, 4], [88, 5], [104, 4.4]].map(([x, w], i) => <g key={i}><path d={`M${x} 0v160`} stroke="#2d6a4f" strokeWidth={w} />{[30, 66, 100, 134].map(y => <path key={y} d={`M${x - w / 2 - .4} ${y}h${w + .8}`} stroke="#1b4332" strokeWidth="1.2" />)}<path d={`M${x} ${40 + i * 10}q${i % 2 ? 14 : -14} -6 ${i % 2 ? 18 : -18} 0q${i % 2 ? -10 : 10} 2 ${i % 2 ? -18 : 18} 0z`} fill="#40916c" /></g>)}
    <g fill="#fff" opacity=".7"><ellipse cx="60" cy="96" rx="60" ry="8" /><ellipse cx="30" cy="126" rx="40" ry="6" /></g>
    <path d="M0 140Q60 132 120 140V160H0Z" fill="#74c69d" />
    <g transform="translate(60 124)">
      <ellipse cx="0" cy="16" rx="24" ry="3" fill="#2d6a4f" opacity=".4" />
      <path d="M-24 6q0 -14 18 -14h14q14 0 14 12v6h-46z" fill="url(#k243t)" />
      <path d="M-14 -8q2 6 -2 14M-4 -8q2 8 -2 14M6 -8q2 8 -2 14M14 -6q2 6 0 12" stroke="#212529" strokeWidth="2" fill="none" />
      <path d="M-22 6v10M-14 6v10M10 6v10M18 6v10" stroke="#f77f00" strokeWidth="4" strokeLinecap="round" />
      <circle cx="24" cy="-10" r="10" fill="url(#k243t)" /><path d="M16 -18l-1 -5 5 2zM30 -19l3 -4 0 5z" fill="#d62828" />
      <ellipse cx="27" cy="-6" rx="5" ry="3.4" fill="#fefae0" /><circle cx="29" cy="-8" r="1.2" fill="#212529" />
      <path d="M20 -12l2 2M26 -14l1 3" stroke="#ffd60a" strokeWidth="1.4" /><circle cx="21" cy="-12" r="1" fill="#212529" /><circle cx="27" cy="-13" r="1" fill="#212529" />
      <path d="M16 -14q2 4 0 6M30 -16l-2 4" stroke="#212529" strokeWidth="1.2" fill="none" />
      <path d="M-24 0q-12 -4 -14 -16q4 8 10 10" stroke="url(#k243t)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
    <g fill="#e63946"><rect x="102" y="120" width="8" height="12" rx="1" /><path d="M104 124h4M104 127h4M106 124v6" stroke="#fff" strokeWidth=".8" /></g>
  </Svg>],

  [244, 'นกแก้วตะโกนผ่านโทรโข่ง', <Svg>
    <defs>
      <linearGradient id="k244s" x2="0" y2="1"><stop stopColor="#ffbe0b" /><stop offset="1" stopColor="#fb5607" /></linearGradient>
      <linearGradient id="k244m" x2="1"><stop stopColor="#e9ecef" /><stop offset="1" stopColor="#adb5bd" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k244s)" />
    <g fill="#ffd60a" opacity=".5">{Array.from({ length: 12 }, (_, i) => <path key={i} d="M60 80L56 -20H64z" transform={`rotate(${i * 30} 60 80)`} />)}</g>
    <path d="M10 120q50 -10 100 0" stroke="#7f5539" strokeWidth="5" fill="none" strokeLinecap="round" />
    <g transform="translate(40 92)">
      <path d="M-6 26q-6 14 -2 24M2 26q0 14 6 22" stroke="#06d6a0" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="0" cy="8" rx="14" ry="20" fill="#e63946" /><path d="M-12 4q-8 14 0 24q4 -10 6 -20z" fill="#118ab2" /><path d="M-10 12q-4 8 0 14" stroke="#ffd166" strokeWidth="2" fill="none" />
      <circle cy="-14" r="12" fill="#e63946" /><circle cx="4" cy="-16" r="4" fill="#fff" /><circle cx="5" cy="-16" r="2" fill="#000" />
      <path d="M8 -12q10 -2 12 6q-6 6 -12 0z" fill="#ffd166" stroke="#bc6c25" strokeWidth=".8" /><path d="M10 -8q6 4 10 2" stroke="#bc6c25" strokeWidth=".8" fill="none" />
      <path d="M-6 -24q-4 -8 2 -10q2 4 2 10M0 -26q2 -8 8 -6q-2 4 -6 8" fill="#ffbe0b" />
      <path d="M-4 20l-2 6M4 20l2 6" stroke="#6c757d" strokeWidth="2" />
    </g>
    <g transform="translate(66 80) rotate(-8)">
      <path d="M0 -4l30 -14v36l-30 -14z" fill="url(#k244m)" stroke="#495057" strokeWidth="1" />
      <rect x="-6" y="-5" width="8" height="10" rx="1" fill="#e63946" /><path d="M2 4l4 10" stroke="#495057" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="30" cy="0" rx="3" ry="18" fill="#dee2e6" stroke="#495057" strokeWidth="1" />
    </g>
    <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none"><path d="M102 64q8 16 0 32" /><path d="M108 56q12 24 0 48" /><path d="M114 48q14 32 0 64" /></g>
    <g fill="#fff" fontFamily="Mitr,sans-serif" fontWeight="800"><text x="78" y="40" fontSize="13" transform="rotate(-10 78 40)">ฮัลโหล!!</text></g>
    <g transform="translate(96 132)"><circle r="6" fill="#8ecae6" /><circle cx="-2" cy="-1" r="1" fill="#000" /><circle cx="2" cy="-1" r="1" fill="#000" /><path d="M-6 -6l-2 -4 4 2zM6 -6l2 -4 -4 2z" fill="#8ecae6" /><path d="M-4 -3l-3 -3M4 -3l3 -3" stroke="#fff" strokeWidth="1" /><path d="M-2 3h4" stroke="#000" strokeWidth=".8" /></g>
  </Svg>],

  [245, 'กบใส่มงกุฎบนบ่อน้ำ', <Svg>
    <defs>
      <linearGradient id="k245s" x2="0" y2="1"><stop stopColor="#caffbf" /><stop offset="1" stopColor="#9bf6ff" /></linearGradient>
      <linearGradient id="k245w" x2="0" y2="1"><stop stopColor="#4cc9f0" /><stop offset="1" stopColor="#3a86ff" /></linearGradient>
      <radialGradient id="k245f" cx=".4" cy=".35"><stop stopColor="#b9fbc0" /><stop offset="1" stopColor="#2b9348" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k245s)" />
    <g fill="#55a630">{[[6, 70], [20, 60], [100, 66], [112, 56]].map(([x, y], i) => <path key={i} d={`M${x} 100q-2 -${100 - y} 4 -${110 - y}q-1 ${100 - y} 1 ${110 - y}z`} />)}</g>
    <g fill="#6f4518">{[[8, 58], [22, 48], [102, 54], [114, 44]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="2" ry="6" />)}</g>
    <rect y="92" width="120" height="68" fill="url(#k245w)" />
    <g stroke="#caf0f8" strokeWidth=".8" opacity=".7" fill="none">{[[10, 104], [80, 110], [30, 140], [90, 146]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q5 -2 10 0`} />)}</g>
    <g fill="#70e000"><path d="M20 128a12 6 0 1 0 0.1 0z" /><path d="M96 120a10 5 0 1 0 0.1 0z" /></g>
    <g transform="translate(96 116)"><path d="M0 0q-6 -10 0 -16q6 6 0 16z" fill="#ffafcc" /><path d="M0 0q-10 -6 -10 -14q8 2 10 14zM0 0q10 -6 10 -14q-8 2 -10 14z" fill="#ffc8dd" /></g>
    <ellipse cx="60" cy="118" rx="28" ry="9" fill="#38b000" /><path d="M60 118l26 -4" stroke="#2b9348" strokeWidth="1" /><path d="M60 118L34 112M60 118L42 126M60 118l14 8" stroke="#2b9348" strokeWidth=".6" />
    <g transform="translate(60 100)">
      <ellipse cx="0" cy="10" rx="18" ry="10" fill="url(#k245f)" />
      <path d="M-16 12q-8 4 -6 8h8M16 12q8 4 6 8h-8" fill="url(#k245f)" stroke="#2b9348" strokeWidth=".6" />
      <ellipse cx="0" cy="-2" rx="16" ry="11" fill="url(#k245f)" />
      <circle cx="-8" cy="-12" r="6" fill="url(#k245f)" /><circle cx="8" cy="-12" r="6" fill="url(#k245f)" />
      <circle cx="-8" cy="-12" r="4" fill="#fff" /><circle cx="8" cy="-12" r="4" fill="#fff" /><circle cx="-7" cy="-11" r="2" fill="#000" /><circle cx="9" cy="-11" r="2" fill="#000" />
      <path d="M-8 2q8 6 16 0" stroke="#1b4332" strokeWidth="1.2" fill="none" /><circle cx="-12" cy="0" r="2" fill="#ff8fab" opacity=".6" /><circle cx="12" cy="0" r="2" fill="#ff8fab" opacity=".6" />
      <path d="M-10 -18l2 -12 5 6 3 -10 3 10 5 -6 2 12z" fill="#ffd60a" stroke="#b08900" strokeWidth=".8" /><circle cy="-26" r="1.6" fill="#e63946" /><circle cx="-6" cy="-22" r="1" fill="#3a86ff" /><circle cx="6" cy="-22" r="1" fill="#3a86ff" />
    </g>
    <g fill="#fff" opacity=".8"><circle cx="40" cy="44" r=".9" /><circle cx="76" cy="36" r=".7" /></g>
    <g transform="translate(30 40)"><ellipse rx="3" ry="1.4" fill="#06d6a0" /><path d="M-2 -1q-4 -4 -2 -6M2 -1q4 -4 2 -6" stroke="#caf0f8" strokeWidth=".6" fill="#e0fbfc" /></g>
  </Svg>],

  [246, 'ม้าน้ำลากรถม้าใต้ทะเล', <Svg>
    <defs>
      <linearGradient id="k246s" x2="0" y2="1"><stop stopColor="#48cae4" /><stop offset=".6" stopColor="#0096c7" /><stop offset="1" stopColor="#023e8a" /></linearGradient>
      <linearGradient id="k246c" x2="1" y2="1"><stop stopColor="#fff0f3" /><stop offset="1" stopColor="#ffb3c6" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k246s)" />
    <g fill="#fff" opacity=".15"><path d="M20 0l10 160h4L28 0zM80 0l-4 160h4l8 -160z" /></g>
    <path d="M0 140Q30 132 60 140T120 136V160H0Z" fill="#e9c46a" />
    <g fill="#ff006e"><path d="M10 140q-2 -14 4 -20q-2 10 0 20z" /><path d="M14 140q6 -12 2 -18q-2 8 -2 18z" /></g><g fill="#8338ec"><path d="M106 138q-4 -16 2 -24q0 12 0 24z" /></g>
    <g transform="translate(28 84)">
      {[0, 14].map(dx => <g key={dx} transform={`translate(${dx} ${dx ? 6 : 0})`}>
        <path d="M0 -14q8 -2 10 6q2 8 -4 12q-6 4 -4 12q2 6 6 4q-2 4 -6 2q-6 -4 -4 -14q2 -6 0 -10q-4 0 -8 -4q4 -2 4 -6z" fill="#ffd60a" stroke="#b08900" strokeWidth=".6" />
        <path d="M-4 -10l-8 -2 6 4" fill="#ffd60a" /><circle cx="4" cy="-10" r="1" fill="#000" />
        <path d="M2 -16l-1 -4 3 2 1 -4 2 4" fill="none" stroke="#b08900" strokeWidth=".8" />
      </g>)}
    </g>
    <path d="M44 86q12 2 20 6" stroke="#ffd166" strokeWidth=".8" fill="none" /><path d="M58 92q8 0 10 2" stroke="#ffd166" strokeWidth=".8" fill="none" />
    <g transform="translate(80 96)">
      <path d="M-18 -2q0 -20 18 -22q18 2 18 22z" fill="url(#k246c)" stroke="#c9184a" strokeWidth="1" />
      <path d="M-18 -2h36" stroke="#c9184a" strokeWidth="1.4" />
      <g stroke="#ff8fab" strokeWidth=".8">{[-12, -6, 0, 6, 12].map(x => <path key={x} d={`M0 -22L${x} -2`} />)}</g>
      <circle cx="-12" cy="4" r="5" fill="#ffd166" stroke="#b08900" strokeWidth=".8" /><circle cx="12" cy="4" r="5" fill="#ffd166" stroke="#b08900" strokeWidth=".8" />
      <circle cy="-14" r="5" fill="#f1c27d" /><path d="M-5 -16q5 -6 10 0" fill="#e85d04" /><path d="M-4 -20l2 -5 2 3 2 -3 2 5" fill="#ffd60a" />
      <path d="M-2 -13q2 2 4 0" stroke="#6b3e26" strokeWidth=".6" fill="none" />
      <path d="M-6 -16q-10 -2 -16 6" stroke="#e85d04" strokeWidth="1.4" fill="none" />
    </g>
    <g fill="#caf0f8" opacity=".8">{[[60, 70], [62, 62], [58, 56], [96, 70], [98, 60], [20, 60]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1 + (i % 3) * .5} />)}</g>
    <g transform="translate(96 40) scale(-1 1)"><ellipse rx="7" ry="3.4" fill="#ff9f1c" /><path d="M6 0l5-4v8z" fill="#ffbf69" /><circle cx="-4" cy="-.6" r=".7" fill="#000" /></g>
    <g transform="translate(16 30)"><ellipse rx="5" ry="2.4" fill="#80ffdb" /><path d="M4 0l4-3v6z" fill="#64dfdf" /></g>
  </Svg>],

  [247, 'ร่มชูชีพดอกแดนดิไลออน', <Svg>
    <defs>
      <linearGradient id="k247s" x2="0" y2="1"><stop stopColor="#bde0fe" /><stop offset="1" stopColor="#fefae0" /></linearGradient>
      <linearGradient id="k247g" x2="0" y2="1"><stop stopColor="#a7c957" /><stop offset="1" stopColor="#6a994e" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k247s)" />
    <Cl x={18} y={24} s={.7} /><Cl x={100} y={60} s={.6} o={.8} />
    <path d="M0 132Q30 122 60 130T120 126V160H0Z" fill="url(#k247g)" />
    <g transform="translate(26 130)"><path d="M0 0v-34" stroke="#6a994e" strokeWidth="1.4" /><circle cy="-36" r="10" fill="#fff" opacity=".6" />{Array.from({ length: 14 }, (_, i) => <path key={i} d="M0 -36l0 -9" stroke="#fff" strokeWidth=".6" transform={`rotate(${i * 26} 0 -36)`} />)}</g>
    <g transform="translate(60 52)">
      <circle r="2.6" fill="#e9c46a" />
      {Array.from({ length: 18 }, (_, i) => <g key={i} transform={`rotate(${-80 + i * 9.4})`}><path d="M0 0v-22" stroke="#fff" strokeWidth=".7" /><path d="M0 -22l-3 -4M0 -22l3 -4M0 -22v-5M0 -22l-4 -2M0 -22l4 -2" stroke="#fff" strokeWidth=".5" /></g>)}
      <path d="M0 2v26" stroke="#dee2e6" strokeWidth=".8" />
    </g>
    <g transform="translate(60 92)">
      <circle cy="-6" r="5" fill="#f1c27d" /><path d="M-5 -8q5 -6 10 0" fill="#e63946" /><path d="M-2 -5q2 2 4 0" stroke="#6b3e26" strokeWidth=".6" fill="none" />
      <path d="M-5 -1h10l1 10h-12z" fill="#ffd166" /><path d="M-5 0l-2 -12M5 0l2 -12" stroke="#f1c27d" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M-7 -12l7 -10 7 10" stroke="#dee2e6" strokeWidth=".6" fill="none" />
      <path d="M-3 9l-3 8M3 9l3 6" stroke="#264653" strokeWidth="2.2" strokeLinecap="round" />
    </g>
    {[[90, 30, .6], [100, 96, .5], [18, 76, .5], [80, 116, .4]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s}) rotate(${i * 30})`}><path d="M0 0v14" stroke="#fff" strokeWidth="1" />{Array.from({ length: 7 }, (_, j) => <path key={j} d="M0 0l0 -8" stroke="#fff" strokeWidth=".8" transform={`rotate(${-60 + j * 20})`} />)}</g>)}
    <g fill="#f4d35e">{[[40, 140], [86, 144], [100, 138]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.4" />)}</g>
  </Svg>],

  [248, 'ภาพวาดชอล์กบนกำแพงที่มีชีวิต', <Svg>
    <defs>
      <linearGradient id="k248w" x2="0" y2="1"><stop stopColor="#495057" /><stop offset="1" stopColor="#343a40" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k248w)" />
    <g stroke="#3a3f44" strokeWidth=".8">{Array.from({ length: 10 }, (_, r) => <path key={r} d={`M0 ${r * 14 + 10}h120`} />)}{Array.from({ length: 50 }, (_, i) => { const r = Math.floor(i / 5), c = i % 5; return <path key={'v' + i} d={`M${c * 26 + (r % 2) * 13} ${r * 14 + 10}v14`} />; })}</g>
    <rect y="130" width="120" height="30" fill="#6c757d" /><path d="M0 130h120" stroke="#adb5bd" strokeWidth="1" />
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="90" cy="30" r="10" stroke="#ffd60a" strokeWidth="2" />{Array.from({ length: 8 }, (_, i) => <path key={i} d="M90 16v-4" stroke="#ffd60a" strokeWidth="1.6" transform={`rotate(${i * 45} 90 30)`} />)}
      <path d="M14 104l14 -18 14 18z M18 104v16h20v-16" stroke="#f8f9fa" strokeWidth="1.6" /><rect x="25" y="110" width="6" height="10" stroke="#f8f9fa" strokeWidth="1.2" />
      <path d="M48 120q-2 -20 4 -30M52 92q-8 -6 -12 -2M52 92q8 -8 12 -4" stroke="#80ed99" strokeWidth="1.6" />
      <path d="M10 60q8 -10 16 0q8 -10 16 0" stroke="#90e0ef" strokeWidth="1.6" />
    </g>
    <g transform="translate(76 92)" fill="none" stroke="#ffafcc" strokeWidth="1.8" strokeLinecap="round">
      <circle cy="-16" r="6" /><path d="M0 -10v16M0 6l-6 10M0 6l6 10M0 -4l-8 4M0 -4l10 -8" />
      <circle cx="-2" cy="-17" r=".6" fill="#ffafcc" /><circle cx="2" cy="-17" r=".6" fill="#ffafcc" /><path d="M-2 -13q2 2 4 0" />
    </g>
    <g transform="translate(92 108)"><path d="M0 0q-2 -6 4 -6q6 2 4 8z" fill="#ffafcc" opacity=".6" /><path d="M-6 -8l-4 2M-4 -12l-2 -4M2 -12l2 -4" stroke="#ffafcc" strokeWidth="1" /></g>
    <g transform="translate(86 104)"><path d="M10 -10q10 -6 14 4" stroke="#ffafcc" strokeWidth="1.6" fill="none" strokeDasharray="1.6 1.6" /></g>
    <g transform="translate(48 132)">
      <circle cy="-24" r="6" fill="#f1c27d" /><path d="M-6 -26q6 -8 12 0" fill="#3d405b" />
      <path d="M-6 -18h12l2 16h-16z" fill="#4361ee" /><path d="M-4 -2l-2 8M4 -2l2 8" stroke="#1d3557" strokeWidth="3" strokeLinecap="round" />
      <path d="M6 -14l14 -8" stroke="#f1c27d" strokeWidth="2.4" strokeLinecap="round" /><rect x="19" y="-25" width="3" height="6" fill="#ffafcc" transform="rotate(-30 20 -22)" />
      <circle cx="3" cy="-25" r=".8" fill="#333" /><path d="M1 -21q2 2 4 0" stroke="#6b3e26" strokeWidth=".6" fill="none" />
    </g>
    <g fill="#f8f9fa" opacity=".7">{[[12, 140], [30, 146], [70, 142], [96, 148]].map(([x, y], i) => <rect key={i} x={x} y={y} width="6" height="2" rx="1" fill={['#ffd60a', '#90e0ef', '#ffafcc', '#80ed99'][i]} transform={`rotate(${i * 30} ${x} ${y})`} />)}</g>
  </Svg>],
];
