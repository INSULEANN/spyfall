// ภาพการ์ดแบบละเอียด ชุด 36 (ภาพใหม่ 273–280) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD36 = [
  [273, 'คนตัดไม้กับต้นไม้ที่ร้องไห้', <Svg>
    <defs>
      <linearGradient id="k273s" x2="0" y2="1"><stop stopColor="#adb5bd" /><stop offset="1" stopColor="#dee2e6" /></linearGradient>
      <linearGradient id="k273t" x2="1"><stop stopColor="#5c4033" /><stop offset=".5" stopColor="#7f5539" /><stop offset="1" stopColor="#4a3020" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k273s)" />
    <g fill="#6c757d" opacity=".5"><path d="M0 100l10 -40 10 40zM16 100l8 -30 8 30zM96 100l10 -44 10 44z" /></g>
    <path d="M0 116Q60 104 120 116V160H0Z" fill="#6a994e" /><path d="M0 130Q60 122 120 132V160H0Z" fill="#386641" />
    <g transform="translate(70 116)">
      <path d="M-12 0q-2 -40 2 -60q-14 -6 -20 -20M-8 -46q14 -8 22 -22M4 -60q2 -14 -4 -24M-10 -60q-4 -10 2 -18" stroke="url(#k273t)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M-14 0q-2 -36 2 -62h14q2 30 -2 62z" fill="url(#k273t)" />
      <g fill="#40916c"><circle cx="-26" cy="-82" r="12" /><circle cx="-4" cy="-94" r="14" /><circle cx="16" cy="-80" r="12" /><circle cx="0" cy="-74" r="10" /></g>
      <path d="M-8 -36q2 -2 4 0M2 -36q2 -2 4 0" stroke="#3d2b1f" strokeWidth="1" fill="none" /><path d="M-4 -28q3 -3 6 0" stroke="#3d2b1f" strokeWidth="1" fill="none" />
      <path d="M-7 -34q-1 6 0 10M4 -34q1 6 0 10" stroke="#90e0ef" strokeWidth="1.4" strokeLinecap="round" /><g fill="#90e0ef"><path d="M-7 -20q2 3 0 5q-2 -2 0 -5z" /><path d="M4 -18q2 3 0 5q-2 -2 0 -5z" /></g>
      <path d="M-14 -10l6 4 -6 4z" fill="#dee2e6" stroke="#6c757d" strokeWidth=".6" />
    </g>
    <g transform="translate(32 124)">
      <circle cy="-30" r="6" fill="#e0ac69" /><path d="M-6 -32q6 -8 12 0" fill="#e63946" /><path d="M-4 -26q4 3 8 0" fill="#6b3e26" /><path d="M-2 -30q1 1 2 0" stroke="#3d2b1f" strokeWidth=".6" fill="none" />
      <path d="M-7 -24h14l2 18h-18z" fill="#e63946" /><g stroke="#9d0208" strokeWidth=".8">{[-20, -14, -8].map(y => <path key={y} d={`M-7 ${y}h14`} />)}{[-3, 3].map(x => <path key={x} d={`M${x} -24v18`} />)}</g>
      <path d="M-4 -6l-1 8M4 -6l1 8" stroke="#264653" strokeWidth="3" strokeLinecap="round" />
      <path d="M7 -20l6 -6" stroke="#e0ac69" strokeWidth="2.4" strokeLinecap="round" /><path d="M-7 -20l-4 8" stroke="#e0ac69" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M14 -28l-8 26" stroke="#9c6644" strokeWidth="1.6" /><path d="M10 -32l8 2 -2 6 -6 -2z" fill="#adb5bd" stroke="#495057" strokeWidth=".6" transform="rotate(14 14 -28)" opacity="0" />
      <path d="M-14 4l2 -14" stroke="#9c6644" strokeWidth="1.6" /><path d="M-18 -12l6 -2 2 4 -6 2z" fill="#adb5bd" stroke="#495057" strokeWidth=".6" />
      <path d="M2 -30q4 -4 6 0" stroke="#3d2b1f" strokeWidth=".6" fill="none" opacity="0" />
    </g>
    <g fill="#90e0ef" opacity=".7"><circle cx="66" cy="112" r="1.6" /><circle cx="74" cy="114" r="1.2" /></g>
  </Svg>],

  [274, 'เมืองใต้ร่มยักษ์', <Svg>
    <defs>
      <linearGradient id="k274s" x2="0" y2="1"><stop stopColor="#495057" /><stop offset="1" stopColor="#adb5bd" /></linearGradient>
      <radialGradient id="k274u" cx=".5" cy=".9"><stop stopColor="#ff99c8" /><stop offset="1" stopColor="#c9184a" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k274s)" />
    <g stroke="#dee2e6" strokeWidth=".8" opacity=".7">{Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${(i * 23) % 124} ${(i * 37) % 30} l-3 8`} />)}</g>
    <path d="M0 50Q60 0 120 50q-8 -6 -15 0q-7 -6 -15 0q-8 -6 -15 0q-7 -6 -15 0q-8 -6 -15 0q-7 -6 -15 0q-8 -6 -15 0q-7 -6 -15 0z" fill="url(#k274u)" stroke="#800f2f" strokeWidth="1" />
    <g stroke="#800f2f" strokeWidth=".6" opacity=".6">{[15, 30, 45, 75, 90, 105].map(x => <path key={x} d={`M60 14L${x} 50`} />)}</g>
    <path d="M60 14V140" stroke="#343a40" strokeWidth="2.4" /><path d="M60 8v6" stroke="#343a40" strokeWidth="1.6" />
    <g stroke="#90e0ef" strokeWidth=".8" opacity=".8">{[[6, 56], [24, 60], [44, 58], [76, 58], [96, 60], [114, 56]].map(([x, y], i) => <path key={i} d={`M${x} ${y}l-2 6`} />)}</g>
    <g>
      {[[6, 90, 16, '#ffb703'], [22, 80, 14, '#8ecae6'], [38, 96, 14, '#e76f51'], [66, 86, 14, '#90be6d'], [82, 76, 14, '#cdb4db'], [98, 92, 16, '#f4a261']].map(([x, y, w, c], i) => <g key={i}><rect x={x} y={y} width={w} height={150 - y} fill={c} stroke="#343a40" strokeWidth=".6" /><path d={`M${x - 2} ${y}l${w / 2 + 2} -8 ${w / 2 + 2} 8z`} fill="#6d597a" />
        {[0, 1].map(r => [0, 1].map(c2 => <rect key={r + '-' + c2} x={x + 2 + c2 * (w / 2)} y={y + 6 + r * 12} width="4" height="5" fill="#fff3b0" />))}</g>)}
    </g>
    <rect y="148" width="120" height="12" fill="#6c757d" />
    <g transform="translate(52 148)"><circle cy="-10" r="2.6" fill="#f1c27d" /><path d="M-2.4 -7h4.8v6h-4.8z" fill="#457b9d" /><path d="M-1.4 -1v4M1.4 -1v4" stroke="#1d3557" strokeWidth="1" /></g>
    <g transform="translate(70 148)"><circle cy="-10" r="2.6" fill="#e0ac69" /><path d="M-2.4 -7h4.8v6h-4.8z" fill="#ffd166" /><path d="M-1.4 -1v4M1.4 -1v4" stroke="#1d3557" strokeWidth="1" /></g>
  </Svg>],

  [275, 'แมวน้ำโยนลูกบอลบนก้อนน้ำแข็ง', <Svg>
    <defs>
      <linearGradient id="k275s" x2="0" y2="1"><stop stopColor="#bde0fe" /><stop offset="1" stopColor="#e2eafc" /></linearGradient>
      <linearGradient id="k275w" x2="0" y2="1"><stop stopColor="#0096c7" /><stop offset="1" stopColor="#023e8a" /></linearGradient>
      <radialGradient id="k275b" cx=".35" cy=".35"><stop stopColor="#fff" /><stop offset=".5" stopColor="#ff595e" /><stop offset="1" stopColor="#9d0208" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k275s)" />
    <path d="M0 80l20 -30 16 16 18 -26 22 30 20 -20 24 30z" fill="#fff" stroke="#bde0fe" strokeWidth=".8" />
    <rect y="96" width="120" height="64" fill="url(#k275w)" />
    <g stroke="#caf0f8" strokeWidth=".8" opacity=".7" fill="none">{[[10, 106], [80, 114], [30, 146], [96, 150]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q5 -2 10 0`} />)}</g>
    <path d="M24 108l8 -10h56l10 10 -6 18h-64z" fill="#f8f9fa" stroke="#90e0ef" strokeWidth="1" /><path d="M24 108h74" stroke="#caf0f8" strokeWidth="1" /><path d="M30 124h60" stroke="#bde0fe" strokeWidth=".8" />
    <g transform="translate(60 96)">
      <path d="M-20 10q-4 -20 10 -26q10 -4 14 -16q6 -6 10 2q2 12 -6 22q-6 10 -4 18z" fill="#6c757d" />
      <path d="M-20 10q-10 2 -14 -4q6 0 10 -4M-4 10q4 6 10 4q-4 -2 -4 -6" fill="#495057" />
      <circle cx="10" cy="-24" r="1.4" fill="#000" /><ellipse cx="14" cy="-20" rx="2.4" ry="1.6" fill="#000" /><path d="M14 -18h6M14 -17l6 2" stroke="#495057" strokeWidth=".4" />
      <path d="M-6 -4q6 -2 8 4" stroke="#495057" strokeWidth=".8" fill="none" />
    </g>
    <circle cx="76" cy="58" r="8" fill="url(#k275b)" /><path d="M70 54q6 -4 12 2" stroke="#fff" strokeWidth="1.6" fill="none" /><path d="M68 60q8 2 16 -2" stroke="#ffd60a" strokeWidth="1.6" fill="none" />
    <g stroke="#495057" strokeWidth=".6" fill="none" opacity=".6"><path d="M78 68q2 4 -2 8" strokeDasharray="1.4 1.4" /></g>
    <g transform="translate(100 120)"><ellipse rx="7" ry="3" fill="#212529" /><circle cx="6" cy="-4" r="3.4" fill="#212529" /><path d="M5 -5h2" stroke="#fff" strokeWidth=".6" /><path d="M8 -4l3 1" stroke="#f77f00" strokeWidth="1.4" /><ellipse cx="0" cy="0" rx="4" ry="2" fill="#fff" /></g>
    <Cl x={20} y={20} s={.7} /><Cl x={96} y={14} s={.6} />
  </Svg>],

  [276, 'ถ้ำคริสตัลเรืองแสง', <Svg>
    <defs>
      <linearGradient id="k276s" x2="0" y2="1"><stop stopColor="#10002b" /><stop offset="1" stopColor="#240046" /></linearGradient>
      <linearGradient id="k276c" x2="1" y2="1"><stop stopColor="#e0aaff" /><stop offset=".5" stopColor="#9d4edd" /><stop offset="1" stopColor="#5a189a" /></linearGradient>
      <linearGradient id="k276d" x2="1" y2="1"><stop stopColor="#a5ffd6" /><stop offset=".5" stopColor="#4cc9f0" /><stop offset="1" stopColor="#3a0ca3" /></linearGradient>
      <radialGradient id="k276g"><stop stopColor="#c77dff" stopOpacity=".6" /><stop offset="1" stopColor="#c77dff" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k276s)" />
    <path d="M0 0h120v30q-20 10 -30 0q-20 14 -36 0q-16 12 -30 2q-14 10 -24 0z" fill="#3c096c" />
    <g fill="#5a189a">{[[10, 30, 6], [34, 34, 5], [66, 34, 7], [96, 30, 5]].map(([x, y, h], i) => <path key={i} d={`M${x - 3} ${y}l3 ${h * 2} 3 -${h * 2}z`} />)}</g>
    <circle cx="60" cy="96" r="50" fill="url(#k276g)" />
    {[[30, 140, 30, 10, 'k276c', -10], [52, 142, 46, 12, 'k276d', 0], [78, 140, 36, 11, 'k276c', 12], [14, 146, 20, 8, 'k276d', -20], [98, 146, 24, 8, 'k276d', 18], [44, 148, 18, 7, 'k276c', -6], [66, 148, 20, 7, 'k276d', 8]].map(([x, y, h, w, g, a], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
      <path d={`M${-w / 2} 0V${-h + w}L0 ${-h}L${w / 2} ${-h + w}V0z`} fill={`url(#${g})`} stroke="#fff" strokeWidth=".5" strokeOpacity=".6" />
      <path d={`M0 ${-h}V0`} stroke="#fff" strokeWidth=".6" opacity=".6" /><path d={`M${-w / 4} ${-h + w}l${w / 4} -${w * .8}`} stroke="#fff" strokeWidth="1" opacity=".7" />
    </g>)}
    <path d="M0 146Q60 138 120 146V160H0Z" fill="#3c096c" />
    <g fill="#fff">{[[24, 90], [96, 80], [60, 60], [40, 70], [84, 104]].map(([x, y], i) => <path key={i} d="M0 -3l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" transform={`translate(${x} ${y})`} opacity=".8" />)}</g>
    <g transform="translate(96 136)"><circle cy="-10" r="3.6" fill="#f1c27d" /><path d="M-4 -12h8" stroke="#ffd60a" strokeWidth="1.6" /><circle cy="-13" r="1.4" fill="#fff3b0" /><path d="M-3 -6h6l1 8h-8z" fill="#f77f00" /><path d="M-3 2l-1 6M3 2l1 6" stroke="#264653" strokeWidth="1.6" strokeLinecap="round" /></g>
  </Svg>],

  [277, 'ดินสอสีไหลเป็นทุ่ง', <Svg>
    <defs>
      <linearGradient id="k277s" x2="0" y2="1"><stop stopColor="#fefae0" /><stop offset="1" stopColor="#e9edc9" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k277s)" />
    <g transform="translate(8 6) rotate(18)">
      {[['#e63946', 0], ['#f77f00', 9], ['#ffd60a', 18], ['#55a630', 27], ['#3a86ff', 36], ['#8338ec', 45]].map(([c, x]) => <g key={c} transform={`translate(${x} 0)`}><rect x="0" y="0" width="7" height="36" fill={c} /><rect x="0" y="0" width="7" height="4" fill="#fff" opacity=".5" /><path d="M0 36l3.5 8 3.5 -8z" fill="#f4d58d" /><path d="M2.4 41.6l1.1 2.4 1.1-2.4z" fill={c} /></g>)}
    </g>
    {[['#e63946', 60], ['#f77f00', 70], ['#ffd60a', 80], ['#55a630', 90], ['#3a86ff', 100], ['#8338ec', 110]].map(([c, y], i) => <path key={c} d={`M${20 + i * 6} ${50 + i * 2}Q${40 + i * 4} ${y} 60 ${y + 20}T120 ${y + 34}V160H${-10 + i * 8}Q0 ${y + 40} ${20 + i * 6} ${50 + i * 2}z`} fill={c} opacity=".85" />)}
    <g fill="#fff" opacity=".85">{[[30, 120], [60, 104], [90, 130], [44, 146], [104, 112], [76, 150]].map(([x, y], i) => <g key={i}><path d={`M${x} ${y}v-6`} stroke="#2d6a4f" strokeWidth=".8" /><circle cx={x} cy={y - 7} r="2" /><circle cx={x} cy={y - 7} r=".8" fill="#ffd60a" /></g>)}</g>
    <g transform="translate(86 92)"><path d="M0 0q-2 -10 4 -12q6 2 4 12" fill="#3d405b" /><circle cx="4" cy="-14" r="3" fill="#f1c27d" /><path d="M2 -16q2 -3 4 0" fill="#e63946" /><path d="M6 -8l8 -6" stroke="#f1c27d" strokeWidth="1.4" strokeLinecap="round" /></g>
    <g transform="translate(16 140)"><ellipse rx="6" ry="3" fill="#f8f9fa" /><circle cx="-5" cy="-2" r="3" fill="#f8f9fa" /><path d="M-6 -6q-2 -4 1 -4M-4 -6q1 -4 3 -3" stroke="#f8f9fa" strokeWidth="1.4" fill="none" /><circle cx="-6" cy="-2" r=".6" fill="#000" /></g>
  </Svg>],

  [278, 'ห่านทองคำบนกองฟาง', <Svg>
    <defs>
      <linearGradient id="k278s" x2="0" y2="1"><stop stopColor="#ffb703" /><stop offset=".6" stopColor="#ffd166" /><stop offset="1" stopColor="#fefae0" /></linearGradient>
      <radialGradient id="k278g" cx=".4" cy=".35"><stop stopColor="#fff3b0" /><stop offset=".6" stopColor="#ffd60a" /><stop offset="1" stopColor="#b08900" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k278s)" />
    <g fill="#9c6644" opacity=".6"><path d="M0 70V40h30v30z" /><path d="M-2 41l17 -14 17 14z" /></g>
    <path d="M0 110Q60 98 120 110V160H0Z" fill="#bc6c25" />
    <path d="M20 120q40 -50 80 0z" fill="#e9c46a" /><g stroke="#d4a373" strokeWidth=".8" fill="none">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${24 + i * 5} 120q${(i % 3) - 1} -${10 + (i % 4) * 6} ${(i % 2) * 4 - 2} -${20 + (i % 3) * 6}`} />)}</g>
    <g transform="translate(60 84)">
      <ellipse cx="0" cy="6" rx="18" ry="11" fill="url(#k278g)" stroke="#9c6644" strokeWidth=".8" />
      <path d="M-18 2q-10 -6 -12 4q6 4 12 2z" fill="url(#k278g)" stroke="#9c6644" strokeWidth=".8" />
      <path d="M12 0q4 -20 10 -26q6 -2 8 4q-2 4 -6 4q-4 6 -4 18z" fill="url(#k278g)" stroke="#9c6644" strokeWidth=".8" />
      <path d="M28 -22l8 2 -8 3z" fill="#f77f00" /><circle cx="26" cy="-24" r="1.2" fill="#000" />
      <path d="M-6 0q6 -4 14 -2" stroke="#b08900" strokeWidth=".8" fill="none" /><path d="M-10 6q8 -2 16 2" stroke="#b08900" strokeWidth=".8" fill="none" />
    </g>
    {[[40, 122], [52, 126], [70, 124], [82, 120]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="4" ry="5" fill="url(#k278g)" stroke="#9c6644" strokeWidth=".6" /><ellipse cx={x - 1.4} cy={y - 2} rx="1" ry="1.6" fill="#fff" opacity=".7" /></g>)}
    <g fill="#fff">{[[30, 80], [92, 70], [60, 50]].map(([x, y], i) => <path key={i} d="M0 -3l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" transform={`translate(${x} ${y})`} />)}</g>
    <g transform="translate(100 140)"><circle cy="-10" r="4" fill="#e0ac69" /><path d="M-5 -12h10" stroke="#9c6644" strokeWidth="1.6" /><path d="M-3 -16q3 -3 6 0v4h-6z" fill="#e9c46a" /><path d="M-4 -6h8l1 10h-10z" fill="#457b9d" /><path d="M-4 -4l-6 -6" stroke="#e0ac69" strokeWidth="1.6" strokeLinecap="round" /></g>
  </Svg>],

  [279, 'นกพิราบส่งจดหมาย', <Svg>
    <defs>
      <linearGradient id="k279s" x2="0" y2="1"><stop stopColor="#caf0f8" /><stop offset="1" stopColor="#ffe5ec" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k279s)" />
    <Cl x={20} y={30} s={.9} /><Cl x={100} y={60} s={.7} />
    <g fill="#e5989b"><rect x="0" y="100" width="40" height="60" /><path d="M-2 101l22 -18 22 18z" fill="#b5838d" /></g><rect x="10" y="112" width="12" height="12" fill="#a2d2ff" stroke="#6d597a" strokeWidth="1" /><path d="M16 112v12M10 118h12" stroke="#6d597a" strokeWidth=".6" />
    <g fill="#ffcad4"><rect x="82" y="92" width="38" height="68" /><path d="M80 93l21 -16 21 16z" fill="#f4acb7" /></g><rect x="92" y="104" width="12" height="12" fill="#a2d2ff" stroke="#9d8189" strokeWidth="1" />
    <g transform="translate(18 110)"><circle cy="-6" r="3.6" fill="#f1c27d" /><path d="M-3.6 -7q3.6 -4 7.2 0" fill="#6b3e26" /><path d="M2 -4l6 -4" stroke="#f1c27d" strokeWidth="1.4" strokeLinecap="round" /></g>
    <g transform="translate(60 72) rotate(-10)">
      <path d="M-4 -2q-14 -20 -24 -18q8 6 10 12q-8 -4 -12 2q10 0 18 6z" fill="#dee2e6" stroke="#adb5bd" strokeWidth=".6" />
      <ellipse cx="0" cy="0" rx="14" ry="8" fill="#ced4da" /><path d="M-6 2q6 4 14 0" fill="#adb5bd" />
      <circle cx="12" cy="-4" r="5" fill="#adb5bd" /><path d="M10 -2q2 2 4 0" fill="#80ed99" opacity=".8" /><circle cx="13" cy="-5" r="1" fill="#e63946" /><path d="M16 -4l4 1 -4 1z" fill="#495057" />
      <path d="M-14 0l-8 -2 2 4 -2 4 8 -2z" fill="#adb5bd" />
      <path d="M-2 4q-2 -10 6 -14q-4 8 -2 14z" fill="#e9ecef" stroke="#adb5bd" strokeWidth=".6" />
      <path d="M2 8l-1 4M6 8l1 4" stroke="#ff8fab" strokeWidth="1" />
      <g transform="translate(2 14) rotate(10)"><rect x="-7" y="0" width="14" height="9" fill="#fff" stroke="#adb5bd" strokeWidth=".6" /><path d="M-7 0l7 5 7 -5" stroke="#adb5bd" strokeWidth=".6" fill="none" /><path d="M-1.4 4q1.4 -2 2.8 0q-1.4 2 -1.4 3q0 -1 -1.4 -3z" fill="#e63946" /></g>
    </g>
    <path d="M24 104q30 -40 70 -6" stroke="#6d597a" strokeWidth=".7" fill="none" strokeDasharray="2 3" />
    <g fill="#e63946"><path d="M98 88q-1.4 -2 0 -3.4q1.4 -.8 2 .6q.6 -1.4 2 -.6q1.4 1.4 0 3.4l-2 2z" /></g>
  </Svg>],

  [280, 'ซุ้มประตูดอกไม้กลางป่า', <Svg>
    <defs>
      <linearGradient id="k280s" x2="0" y2="1"><stop stopColor="#1b4332" /><stop offset=".6" stopColor="#2d6a4f" /><stop offset="1" stopColor="#52b788" /></linearGradient>
      <radialGradient id="k280l" cx=".5" cy=".55" r=".4"><stop stopColor="#fff3b0" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k280s)" />
    <g fill="#081c15" opacity=".7">{[[6, 4], [20, 6], [96, 5], [110, 4]].map(([x, w], i) => <rect key={i} x={x} y="0" width={w} height="160" />)}</g>
    <circle cx="60" cy="88" r="40" fill="url(#k280l)" />
    <path d="M0 136Q60 128 120 136V160H0Z" fill="#40916c" />
    <path d="M60 140q-6 -10 -2 -24q-4 -6 4 -10" stroke="#d8f3dc" strokeWidth="1" fill="none" opacity=".5" />
    <path d="M30 140V84Q30 50 60 50Q90 50 90 84V140" fill="none" stroke="#6f4518" strokeWidth="3" />
    <path d="M30 140V84Q30 50 60 50Q90 50 90 84V140" fill="none" stroke="#2d6a4f" strokeWidth="7" strokeDasharray="3 4" opacity=".9" />
    {Array.from({ length: 26 }, (_, i) => { const t = i / 25; const a = Math.PI * t; let x, y; if (t < .3) { x = 30; y = 140 - t / .3 * 56; } else if (t > .7) { x = 90; y = 84 + (t - .7) / .3 * 56; } else { const u = (t - .3) / .4 * Math.PI; x = 60 - Math.cos(u) * 30; y = 84 - Math.sin(u) * 34; }
      return <g key={i}><circle cx={x.toFixed(1)} cy={y.toFixed(1)} r={2.4 + (i % 3) * .6} fill={['#ff99c8', '#fcf6bd', '#e4c1f9', '#ffafcc', '#ffd166'][i % 5]} /><circle cx={x.toFixed(1)} cy={y.toFixed(1)} r=".8" fill="#ffd60a" /></g>; })}
    <g transform="translate(60 132)"><circle cy="-12" r="3.6" fill="#f1c27d" /><path d="M-4 -14q4 -5 8 0" fill="#bc6c25" /><path d="M-4 -8h8l3 12h-14z" fill="#ffafcc" /><path d="M-3 4l-1 4M3 4l1 4" stroke="#264653" strokeWidth="1.6" strokeLinecap="round" /></g>
    <g fill="#d9ed92" opacity=".9">{[[16, 60], [104, 70], [26, 110], [96, 116], [50, 40], [76, 36]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" />)}</g>
    <g transform="translate(18 132)"><ellipse rx="5" ry="3" fill="#bc6c25" /><circle cx="-4" cy="-2" r="2.6" fill="#bc6c25" /><path d="M-5 -4l-1 -4M-3 -4l1 -4" stroke="#bc6c25" strokeWidth="1" /><circle cx="5" cy="-1" r="1.6" fill="#fff" /></g>
  </Svg>],
];
