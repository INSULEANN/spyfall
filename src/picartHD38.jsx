// ภาพการ์ดแบบละเอียด ชุด 38 (ภาพใหม่ 289–296) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD38 = [
  [289, 'ร้านดอกไม้ตอนฝนตก', <Svg>
    <defs>
      <linearGradient id="k289s" x2="0" y2="1"><stop stopColor="#6c757d" /><stop offset="1" stopColor="#adb5bd" /></linearGradient>
      <radialGradient id="k289l" cx=".5" cy=".55" r=".55"><stop stopColor="#ffd166" stopOpacity=".6" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k289s)" />
    <rect x="10" y="30" width="100" height="100" fill="#2d6a4f" stroke="#1b4332" strokeWidth="1.4" />
    <path d="M6 30h108v10H6z" fill="#e63946" /><path d="M6 40q6 8 12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0t12 0" fill="#fff" />
    <rect x="18" y="52" width="84" height="56" fill="#fff3b0" /><rect x="18" y="52" width="84" height="56" fill="url(#k289l)" /><path d="M60 52v56M18 80h84" stroke="#1b4332" strokeWidth="1.2" />
    {[[28, 72], [42, 68], [76, 70], [92, 74], [34, 100], [50, 96], [70, 98], [88, 100]].map(([x, y], i) => <g key={i}><path d={`M${x} ${y + 8}v-6`} stroke="#2d6a4f" strokeWidth="1" />{[0, 1, 2].map(j => <circle key={j} cx={x - 3 + j * 3} cy={y - (j % 2) * 2} r="2.6" fill={['#ff99c8', '#ffd60a', '#e63946', '#c77dff', '#ff8fab'][(i + j) % 5]} />)}</g>)}
    <rect x="18" y="110" width="84" height="20" fill="#9c6644" /><g fill="#e85d04">{[24, 44, 64, 84].map(x => <path key={x} d={`M${x} 110h12l-2 10h-8z`} />)}</g>
    <g>{[[30, 106], [50, 104], [70, 106], [90, 104]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill={['#ff006e', '#ffbe0b', '#8338ec', '#fb5607'][i]} />)}</g>
    <g stroke="#dee2e6" strokeWidth=".8" opacity=".7">{Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${(i * 29) % 124} ${(i * 41) % 150} l-3 8`} />)}</g>
    <rect y="130" width="120" height="30" fill="#495057" /><ellipse cx="60" cy="140" rx="30" ry="3" fill="#ffd166" opacity=".3" />
    <g transform="translate(96 146)"><path d="M-12 -18q12 -14 24 0z" fill="#3a86ff" /><path d="M0 -18v18" stroke="#212529" strokeWidth=".8" /><circle cy="-4" r="3" fill="#f1c27d" /><path d="M-3 -1h6l1 8h-8z" fill="#ffd166" /></g>
    <g fill="#90e0ef" opacity=".7">{[[20, 144], [50, 150], [80, 146]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="5" ry="1" />)}</g>
  </Svg>],

  [290, 'นักผจญภัยหน้าประตูวิหารโบราณ', <Svg>
    <defs>
      <linearGradient id="k290s" x2="0" y2="1"><stop stopColor="#264653" /><stop offset="1" stopColor="#2a9d8f" /></linearGradient>
      <linearGradient id="k290r" x2="0" y2="1"><stop stopColor="#bc8a5f" /><stop offset="1" stopColor="#7f5539" /></linearGradient>
      <radialGradient id="k290g" cx=".5" cy=".6" r=".5"><stop stopColor="#ffd60a" stopOpacity=".8" /><stop offset="1" stopColor="#ffd60a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k290s)" />
    <path d="M14 140V40h92v100z" fill="url(#k290r)" stroke="#3d2b1f" strokeWidth="1.4" />
    <path d="M8 44l52 -28 52 28z" fill="#9c6644" stroke="#3d2b1f" strokeWidth="1.4" />
    <g stroke="#6f4518" strokeWidth=".7">{[56, 72, 88, 104, 120].map(y => <path key={y} d={`M14 ${y}h92`} />)}{Array.from({ length: 14 }, (_, i) => <path key={'v' + i} d={`M${18 + (i % 7) * 14 + (Math.floor(i / 7) % 2) * 7} ${56 + Math.floor(i / 7) * 32}v16`} />)}</g>
    <path d="M40 140V88q0 -14 20 -14t20 14v52z" fill="#0b090a" /><path d="M40 140V88q0 -14 20 -14t20 14v52z" fill="url(#k290g)" />
    <g transform="translate(60 46)"><circle r="8" fill="#e9c46a" stroke="#6f4518" strokeWidth="1" /><circle r="4" fill="#ffd60a" /><path d="M-3 -1l3 -3 3 3 -3 3z" fill="#e63946" /></g>
    <g fill="#386641"><path d="M14 40q-10 30 -2 60q4 -30 2 -60z" /><path d="M106 40q10 30 2 60q-4 -30 -2 -60z" /><path d="M20 60q-4 -10 4 -12q-2 6 -4 12zM100 70q4 -10 -4 -12q2 6 4 12z" /></g>
    <path d="M0 138Q60 130 120 138V160H0Z" fill="#606c38" />
    <g transform="translate(60 136)">
      <circle cy="-26" r="5" fill="#e0ac69" /><path d="M-9 -28h18" stroke="#6f4518" strokeWidth="2" strokeLinecap="round" /><path d="M-6 -28q6 -10 12 0z" fill="#9c6644" />
      <path d="M-6 -20h12l2 14h-16z" fill="#bc8a5f" /><path d="M-6 -20l12 14" stroke="#6f4518" strokeWidth="1.2" /><path d="M-4 -6l-1 8M4 -6l1 8" stroke="#3d2b1f" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M6 -16l8 -6" stroke="#e0ac69" strokeWidth="2" strokeLinecap="round" /><g transform="translate(16 -24)"><path d="M0 0v6" stroke="#6f4518" strokeWidth="1.4" /><path d="M-2 -4q2 -6 4 0q-2 4 -4 0z" fill="#ff7b00" /></g>
    </g>
    <St p={[10, 10, .6, 30, 6, .7, 100, 12, .6]} />
    <g fill="#ffd60a">{[[56, 104], [64, 100], [60, 112]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" />)}</g>
  </Svg>],

  [291, 'ห้องนอนที่เพดานเป็นท้องฟ้า', <Svg>
    <defs>
      <linearGradient id="k291c" x2="0" y2="1"><stop stopColor="#03045e" /><stop offset="1" stopColor="#3a0ca3" /></linearGradient>
      <linearGradient id="k291w" x2="0" y2="1"><stop stopColor="#bde0fe" /><stop offset="1" stopColor="#a2d2ff" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k291w)" />
    <path d="M0 0h120v60q-60 -16 -120 0z" fill="url(#k291c)" />
    <St p={[10, 10, .9, 30, 30, .6, 50, 8, .7, 70, 22, 1, 100, 10, .8, 110, 34, .6, 84, 40, .5, 20, 44, .6]} />
    <circle cx="90" cy="24" r="8" fill="#fefae0" /><circle cx="94" cy="21" r="7" fill="url(#k291c)" />
    <g fill="#c77dff"><circle cx="40" cy="22" r="4" /><ellipse cx="40" cy="22" rx="7" ry="1.6" fill="none" stroke="#e0aaff" strokeWidth=".8" /></g>
    <path d="M0 60q60 -16 120 0" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".6" />
    <rect y="124" width="120" height="36" fill="#ddb892" />
    <g transform="translate(56 112)">
      <rect x="-40" y="0" width="80" height="14" rx="3" fill="#fefae0" /><path d="M-40 0q20 -10 40 0" fill="#ffafcc" />
      <rect x="-36" y="-10" width="20" height="10" rx="4" fill="#fff" />
      <rect x="-42" y="-24" width="6" height="40" fill="#9c6644" /><rect x="36" y="-10" width="6" height="26" fill="#9c6644" />
      <path d="M-10 0q-2 -12 10 -12q10 0 10 8" fill="#ffafcc" stroke="#ff8fab" strokeWidth=".6" />
      <circle cx="-28" cy="-6" r="5" fill="#f1c27d" /><path d="M-33 -8q5 -6 10 0" fill="#6b3e26" /><path d="M-30 -6q1 1 2 0M-27 -6q1 1 2 0" stroke="#3d2b1f" strokeWidth=".6" fill="none" />
      <path d="M-26 -2q2 2 4 0" stroke="#c1121f" strokeWidth=".6" fill="none" />
    </g>
    <g transform="translate(100 104)"><rect x="-8" y="0" width="16" height="20" fill="#bc6c25" /><circle cy="-6" r="6" fill="#ffd166" opacity=".4" /><path d="M-4 0l2 -8h4l2 8z" fill="#ffd166" /></g>
    <g stroke="#ffd60a" strokeWidth=".6" opacity=".7"><path d="M60 60l-30 40" /></g>
    <g fill="#ffd60a"><path d="M24 68l1.2 2.6 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4z" /></g>
  </Svg>],

  [292, 'ดินสอวาดถนนให้รถ', <Svg>
    <defs>
      <linearGradient id="k292s" x2="0" y2="1"><stop stopColor="#fefae0" /><stop offset="1" stopColor="#f8f9fa" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k292s)" />
    <g stroke="#e9ecef" strokeWidth=".6">{Array.from({ length: 16 }, (_, i) => <path key={i} d={`M0 ${i * 10 + 6}h120`} />)}</g><path d="M14 0v160" stroke="#ffafcc" strokeWidth=".8" />
    <path d="M-4 150Q30 140 50 110T96 60" stroke="#495057" strokeWidth="16" fill="none" strokeLinecap="round" />
    <path d="M-4 150Q30 140 50 110T96 60" stroke="#f8f9fa" strokeWidth="1.2" fill="none" strokeDasharray="5 5" />
    <path d="M96 60q6 -8 10 -14" stroke="#495057" strokeWidth="2" strokeDasharray="1 2" fill="none" opacity=".6" />
    <g transform="translate(104 40) rotate(36)"><rect x="-4" y="-34" width="8" height="34" fill="#ffd60a" stroke="#b08900" strokeWidth=".6" /><rect x="-4" y="-38" width="8" height="5" fill="#ff8fab" /><rect x="-4" y="-34" width="8" height="2" fill="#adb5bd" /><path d="M-4 0l4 10 4 -10z" fill="#f4d58d" /><path d="M-1.4 6.6l1.4 3.4 1.4-3.4z" fill="#212529" /></g>
    <g transform="translate(40 120) rotate(-36)"><rect x="-10" y="-6" width="20" height="10" rx="3" fill="#e63946" /><rect x="-6" y="-11" width="12" height="6" rx="2" fill="#e63946" /><rect x="-4" y="-10" width="8" height="4" fill="#a2d2ff" /><circle cx="-6" cy="5" r="2.6" fill="#212529" /><circle cx="6" cy="5" r="2.6" fill="#212529" /><circle cx="10" cy="-2" r="1.2" fill="#ffd60a" /></g>
    <g fill="#80ed99"><path d="M70 120l6 -14 6 14z" /><path d="M86 100l5 -12 5 12z" /><path d="M24 96l5 -12 5 12z" /></g><g stroke="#6f4518" strokeWidth="1"><path d="M76 120v4M91 100v4M29 96v4" /></g>
    <g transform="translate(26 40)"><path d="M-8 6q-2 -10 8 -10q8 0 8 8z" fill="#ffd166" opacity=".9" /><circle cx="0" cy="-6" r="2" fill="#ffd166" /></g>
    <g fill="none" stroke="#adb5bd" strokeWidth=".6"><path d="M20 20q6 -4 12 0" /><path d="M60 30q4 -3 8 0" /></g>
  </Svg>],

  [293, 'ฝนดาวตกเหนือทุ่งนา', <Svg>
    <defs>
      <linearGradient id="k293s" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset=".7" stopColor="#14213d" /><stop offset="1" stopColor="#264653" /></linearGradient>
      <linearGradient id="k293t" x2="1" y2="1"><stop stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff3b0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k293s)" />
    <St p={[8, 12, .7, 22, 30, .5, 40, 8, .6, 60, 20, .5, 80, 10, .7, 100, 30, .5, 112, 14, .6, 30, 60, .5, 90, 56, .5]} />
    {[[20, 0, 50, 30], [60, 4, 90, 36], [90, 14, 116, 40], [4, 30, 30, 56], [44, 40, 66, 62], [76, 50, 100, 72]].map(([a, b, c, d], i) => <g key={i}><path d={`M${a} ${b}L${c} ${d}`} stroke="url(#k293t)" strokeWidth={1.4 + (i % 2)} strokeLinecap="round" /><circle cx={c} cy={d} r="1.4" fill="#fff3b0" /></g>)}
    <path d="M0 104Q60 96 120 104V160H0Z" fill="#40916c" />
    <g stroke="#2d6a4f" strokeWidth="1">{Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${-20 + i * 18} 160L60 104`} />)}</g>
    <g stroke="#74c69d" strokeWidth=".6">{Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${(i * 23) % 120} ${110 + (i * 17) % 46}v-3`} />)}</g>
    <g transform="translate(96 104)"><path d="M-12 0v-14h24v14z" fill="#6f4518" /><path d="M-15 -14l15 -10 15 10z" fill="#9c6644" /><rect x="-4" y="-10" width="6" height="6" fill="#ffd166" /></g>
    <g transform="translate(40 126)"><circle cy="-10" r="3.6" fill="#f1c27d" /><path d="M-6 -12q6 -6 12 0" fill="#e9c46a" /><path d="M-7 -12h14" stroke="#e9c46a" strokeWidth="1.4" /><path d="M-3 -6h6l1 8h-8z" fill="#457b9d" /><path d="M2 -4l6 -10" stroke="#f1c27d" strokeWidth="1.4" strokeLinecap="round" /></g>
    <g transform="translate(56 130)"><ellipse rx="7" ry="4" fill="#495057" /><circle cx="6" cy="-3" r="3" fill="#495057" /><path d="M4 -6l-2 -2M8 -6l1 -3" stroke="#495057" strokeWidth="1.4" /><path d="M-4 4v4M4 4v4" stroke="#495057" strokeWidth="1.6" /></g>
  </Svg>],

  [294, 'ม้าโยกในห้องใต้หลังคา', <Svg>
    <defs>
      <linearGradient id="k294w" x2="0" y2="1"><stop stopColor="#5c4033" /><stop offset="1" stopColor="#9c6644" /></linearGradient>
      <linearGradient id="k294l" x2="1" y2="1"><stop stopColor="#fff3b0" stopOpacity=".7" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k294w)" />
    <path d="M0 0L60 40L120 0V20L60 60L0 20z" fill="#3d2b1f" /><g stroke="#2b1d14" strokeWidth="1">{[20, 40, 80, 100].map(x => <path key={x} d={`M${x} ${x < 60 ? x * .66 : (120 - x) * .66}v120`} opacity=".5" />)}</g>
    <g transform="translate(60 44)"><path d="M-10 0l10 -10 10 10v10h-20z" fill="#14213d" stroke="#3d2b1f" strokeWidth="1.4" /><path d="M0 -10v20M-10 4h20" stroke="#3d2b1f" strokeWidth="1" /><circle cx="4" cy="-2" r="2" fill="#fefae0" /></g>
    <path d="M52 52L20 160h50L68 52z" fill="url(#k294l)" />
    <rect y="132" width="120" height="28" fill="#7f5539" /><g stroke="#5c4033" strokeWidth=".6">{[140, 150].map(y => <path key={y} d={`M0 ${y}h120`} />)}</g>
    <g fill="#dee2e6" opacity=".5">{[[30, 80], [40, 100], [36, 120], [50, 90], [44, 70]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".7" />)}</g>
    <g transform="translate(44 128)">
      <path d="M-26 6q26 10 52 0" stroke="#9c6644" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M-14 4l2 -14M14 4l-2 -14M-8 4l1 -14M8 4l-1 -14" stroke="#6f4518" strokeWidth="2" />
      <path d="M-16 -10q0 -10 14 -10h10q8 0 8 8v2z" fill="#f8f9fa" stroke="#adb5bd" strokeWidth=".8" />
      <g fill="#e63946"><circle cx="-8" cy="-14" r="2" /><circle cx="0" cy="-16" r="2" /><circle cx="6" cy="-12" r="2" /></g>
      <path d="M12 -16q2 -12 10 -12q6 0 6 6q-2 4 -6 4q-2 4 -4 6z" fill="#f8f9fa" stroke="#adb5bd" strokeWidth=".8" />
      <path d="M14 -24q-6 -2 -8 6q-2 6 -6 6" stroke="#e63946" strokeWidth="2.4" fill="none" />
      <circle cx="22" cy="-23" r="1" fill="#000" /><path d="M20 -28l1 -4 2 3z" fill="#f8f9fa" stroke="#adb5bd" strokeWidth=".6" />
      <path d="M-16 -12q-8 2 -10 10" stroke="#e63946" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M-4 -20q4 -6 10 -2" stroke="#ffd60a" strokeWidth="1.4" fill="none" />
    </g>
    <g transform="translate(96 120)"><rect x="-12" y="0" width="24" height="12" fill="#bc6c25" stroke="#6f4518" strokeWidth=".8" /><path d="M-12 0q12 -8 24 0" fill="#9c6644" stroke="#6f4518" strokeWidth=".8" /><rect x="-2" y="2" width="4" height="4" fill="#ffd60a" /></g>
    <g stroke="#dee2e6" strokeWidth=".4" opacity=".6" fill="none"><path d="M104 60l12 12M104 72l12 -12M110 58v16" /></g>
  </Svg>],

  [295, 'คุณยายให้อาหารนกพิราบ', <Svg>
    <defs>
      <linearGradient id="k295s" x2="0" y2="1"><stop stopColor="#ffe5b4" /><stop offset="1" stopColor="#fefae0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k295s)" />
    <g fill="#d6ccc2"><rect x="0" y="40" width="30" height="70" /><path d="M-2 41l17 -14 17 14z" /><rect x="94" y="30" width="26" height="80" /><path d="M92 31l15 -14 15 14z" /></g>
    <g fill="#bcb8b1">{[[6, 52], [18, 52], [6, 72], [18, 72], [100, 44], [110, 44], [100, 64], [110, 64]].map(([x, y], i) => <rect key={i} x={x} y={y} width="6" height="10" />)}</g>
    <path d="M0 108h120v52H0z" fill="#e9ecef" /><g stroke="#ced4da" strokeWidth=".6">{[118, 130, 144].map(y => <path key={y} d={`M0 ${y}h120`} />)}{[20, 50, 80, 110].map((x, i) => <path key={x} d={`M${x - (i % 2) * 10} 108v52`} />)}</g>
    <g transform="translate(36 108)"><rect x="-22" y="-14" width="44" height="4" fill="#6f4518" /><rect x="-22" y="-24" width="44" height="4" fill="#6f4518" /><path d="M-18 -10v14M18 -10v14" stroke="#343a40" strokeWidth="2" />
      <circle cx="0" cy="-34" r="6" fill="#f1c27d" /><circle cy="-42" r="4" fill="#ced4da" /><path d="M-6 -36q6 -8 12 0" fill="#ced4da" /><path d="M-3 -33h2M1 -33h2" stroke="#495057" strokeWidth=".8" /><path d="M-2 -30q2 1 4 0" stroke="#6b3e26" strokeWidth=".6" fill="none" />
      <path d="M-8 -28h16l4 18h-24z" fill="#9b5de5" /><path d="M-8 -26l-4 12M8 -26l8 4" stroke="#f1c27d" strokeWidth="2" strokeLinecap="round" />
      <path d="M-6 -10v14M6 -10v14" stroke="#343a40" strokeWidth="2.4" /><path d="M14 -24q6 0 6 -6" stroke="#9c6644" strokeWidth="1.4" fill="none" /><path d="M16 -22h8l-1 6h-6z" fill="#e9c46a" />
    </g>
    <g fill="#c9a76b">{[[60, 124], [64, 128], [70, 122], [76, 130], [82, 124], [58, 132]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
    {[[64, 132, 1], [80, 136, -1], [94, 128, 1], [72, 146, -1], [100, 144, 1], [56, 48, 1], [76, 40, -1]].map(([x, y, d], i) => <g key={i} transform={`translate(${x} ${y}) scale(${d * .9} .9)`}>
      {i < 5 ? <g><ellipse rx="7" ry="4.4" fill="#adb5bd" /><circle cx="5" cy="-4" r="3" fill="#6c757d" /><path d="M5 -2q1 1 2 0" fill="#80ed99" /><circle cx="6" cy="-5" r=".6" fill="#000" /><path d="M8 -4l2 .6" stroke="#495057" strokeWidth=".8" /><path d="M-7 0l-3 -1v2z" fill="#495057" /><path d="M-2 4v2M2 4v2" stroke="#ff8fab" strokeWidth=".8" /></g>
        : <g><path d="M0 0q-8 -10 -14 -6q6 2 8 6zM0 0q8 -10 14 -6q-6 2 -8 6z" fill="#adb5bd" /><ellipse rx="5" ry="3" fill="#6c757d" /></g>}
    </g>)}
    <Cl x={60} y={20} s={.8} />
  </Svg>],

  [296, 'ตะเกียงวิเศษกับควันรูปมือ', <Svg>
    <defs>
      <linearGradient id="k296s" x2="0" y2="1"><stop stopColor="#3c096c" /><stop offset="1" stopColor="#10002b" /></linearGradient>
      <linearGradient id="k296g" x2="1" y2="1"><stop stopColor="#ffe066" /><stop offset="1" stopColor="#b08900" /></linearGradient>
      <linearGradient id="k296m" x2="0" y2="1"><stop stopColor="#c77dff" stopOpacity=".2" /><stop offset="1" stopColor="#e0aaff" stopOpacity=".85" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k296s)" />
    <St p={[10, 12, .8, 30, 30, .6, 100, 16, .8, 110, 50, .6, 20, 90, .5]} f="#e0aaff" />
    <path d="M70 118Q90 100 76 80Q60 64 78 46Q92 34 84 20" stroke="url(#k296m)" strokeWidth="12" fill="none" strokeLinecap="round" />
    <path d="M70 118Q90 100 76 80Q60 64 78 46Q92 34 84 20" stroke="#e0aaff" strokeWidth="3" fill="none" opacity=".4" strokeLinecap="round" />
    <g transform="translate(84 22) rotate(10)" fill="#e0aaff" opacity=".85">
      <path d="M-10 4q-2 -10 4 -12v-10q0 -3 2.4 -3t2.4 3v8l.6 -12q0 -3 2.6 -3t2.4 3l-.4 12 1.4 -10q.4 -3 2.8 -2.6t2 3l-1.6 11 2.6 -6q1 -2.4 3 -1.6t1.2 3l-4 12q-4 10 -14 8q-6 -1 -8 -4z" />
    </g>
    <rect y="130" width="120" height="30" fill="#5a189a" /><path d="M0 130h120" stroke="#9d4edd" strokeWidth="1" />
    <g transform="translate(56 126)">
      <ellipse cx="0" cy="4" rx="22" ry="3" fill="#000" opacity=".4" />
      <path d="M-18 0q-2 -12 14 -14h12q12 2 10 10l10 -8q4 -2 4 2l-12 10q-6 6 -20 6q-16 0 -18 -6z" fill="url(#k296g)" stroke="#6b4f00" strokeWidth="1" />
      <path d="M-18 -2q-10 -4 -10 4q2 6 10 4" fill="none" stroke="url(#k296g)" strokeWidth="2.6" />
      <ellipse cx="-2" cy="-14" rx="8" ry="2.4" fill="url(#k296g)" stroke="#6b4f00" strokeWidth=".8" /><circle cx="-2" cy="-18" r="2.4" fill="url(#k296g)" />
      <path d="M-12 -6q8 -4 16 0" stroke="#fff3b0" strokeWidth="1" fill="none" opacity=".7" />
      <circle cx="-4" cy="-6" r="1.4" fill="#e63946" /><circle cx="4" cy="-6" r="1.4" fill="#06d6a0" />
    </g>
    <g fill="#ffd60a">{[[30, 110], [100, 100], [40, 70], [96, 130]].map(([x, y], i) => <path key={i} d="M0 -3l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" transform={`translate(${x} ${y})`} />)}</g>
  </Svg>],
];
