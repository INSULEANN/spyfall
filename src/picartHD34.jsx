// ภาพการ์ดแบบละเอียด ชุด 34 (ภาพใหม่ 257–264) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD34 = [
  [257, 'เด็กหญิงกับว่าวปลาคาร์ป', <Svg>
    <defs>
      <linearGradient id="k257s" x2="0" y2="1"><stop stopColor="#8ecae6" /><stop offset="1" stopColor="#e0fbfc" /></linearGradient>
      <linearGradient id="k257k" x2="1"><stop stopColor="#e63946" /><stop offset=".6" stopColor="#f77f00" /><stop offset="1" stopColor="#ffd60a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k257s)" />
    <Cl x={20} y={70} s={.8} /><Cl x={100} y={90} s={.6} o={.8} />
    <path d="M0 126Q60 112 120 126V160H0Z" fill="#95d5b2" /><path d="M0 138Q60 128 120 140V160H0Z" fill="#52b788" />
    <g fill="#ffafcc">{[[12, 132], [30, 140], [96, 136], [108, 146]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" />)}</g>
    <g transform="translate(70 34) rotate(-14)">
      <path d="M-30 0Q-26 -12 0 -12Q20 -12 26 0Q20 12 0 12Q-26 12 -30 0z" fill="url(#k257k)" stroke="#9d0208" strokeWidth=".8" />
      <g fill="none" stroke="#fff" strokeWidth=".7" opacity=".8">{[-18, -10, -2, 6, 14].map(x => <path key={x} d={`M${x} -9q4 9 0 18`} />)}</g>
      <circle cx="18" cy="-2" r="4" fill="#fff" /><circle cx="19" cy="-2" r="2" fill="#000" /><ellipse cx="25" cy="0" rx="2" ry="3" fill="#9d0208" />
      <path d="M-30 0l-16 -10q4 10 0 20z" fill="#ffd60a" stroke="#9d0208" strokeWidth=".6" /><path d="M-46 -10q-6 10 0 20" stroke="#e63946" strokeWidth="1" fill="none" />
      <path d="M-6 -12l-4 -6 8 2zM-6 12l-4 6 8 -2z" fill="#f77f00" />
    </g>
    <path d="M48 42Q40 90 38 112" stroke="#495057" strokeWidth=".6" fill="none" />
    <g transform="translate(36 120)">
      <circle cy="-16" r="6" fill="#f1c27d" /><path d="M-6 -18q6 -8 12 0q-2 -2 -6 -2t-6 2z" fill="#212529" /><path d="M-6 -16q-2 6 0 8M6 -16q2 6 0 8" stroke="#212529" strokeWidth="2" /><circle cx="3" cy="-17" r=".7" fill="#000" />
      <path d="M-6 -10h12l4 16h-20z" fill="#ff006e" /><path d="M-6 -6h12" stroke="#ffd60a" strokeWidth="1.4" />
      <path d="M5 -8l6 -10" stroke="#f1c27d" strokeWidth="2" strokeLinecap="round" /><path d="M-5 -8l-4 6" stroke="#f1c27d" strokeWidth="2" strokeLinecap="round" />
      <path d="M-3 6l-1 8M3 6l2 8" stroke="#f1c27d" strokeWidth="2" strokeLinecap="round" />
    </g>
    <g fill="none" stroke="#fff" strokeWidth="1" opacity=".8"><path d="M86 60q8 2 14 -2" /><path d="M84 66q10 2 16 0" /></g>
  </Svg>],

  [258, 'เด็กปั่นจักรยานบนหลังคา', <Svg>
    <defs>
      <linearGradient id="k258s" x2="0" y2="1"><stop stopColor="#ffafcc" /><stop offset=".6" stopColor="#ffc8dd" /><stop offset="1" stopColor="#cdb4db" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k258s)" />
    <circle cx="94" cy="36" r="14" fill="#fff3b0" />
    <g fill="#6d597a" opacity=".55"><rect x="0" y="70" width="18" height="90" /><rect x="100" y="60" width="20" height="100" /></g>
    {[[0, 112, 40, '#b5838d', '#6d597a'], [38, 96, 44, '#e5989b', '#b5838d'], [80, 108, 42, '#ffb4a2', '#9d8189']].map(([x, y, w, c, r], i) => <g key={i}>
      <rect x={x} y={y} width={w} height={160 - y} fill={c} /><path d={`M${x - 3} ${y}L${x + w / 2} ${y - 18}L${x + w + 3} ${y}z`} fill={r} />
      {[0, 1].map(j => <rect key={j} x={x + 6 + j * (w / 2 - 2)} y={y + 10} width="8" height="9" fill="#fff3b0" stroke="#6d597a" strokeWidth=".6" />)}
    </g>)}
    <g stroke="#6d597a" strokeWidth=".6" fill="none">{[[38, 96, 82, 78], [82, 78, 124, 108]].map(([a, b, c, d], i) => <path key={i} d={`M${a} ${b}L${c} ${d}`} opacity="0" />)}</g>
    <g transform="translate(60 74)">
      <circle cx="-12" cy="6" r="7" fill="none" stroke="#212529" strokeWidth="1.6" /><circle cx="12" cy="6" r="7" fill="none" stroke="#212529" strokeWidth="1.6" />
      <path d="M-12 6l8 -10h12l4 10M-4 -4l4 10h8M8 -4l-2 -4h4" stroke="#e63946" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <circle cy="-16" r="5" fill="#f1c27d" /><path d="M-5 -18q5 -6 10 0" fill="#ffd60a" /><path d="M-6 -19h12" stroke="#ffd60a" strokeWidth="1.4" />
      <path d="M-2 -11l2 9M0 -8l8 2" stroke="#3a86ff" strokeWidth="3" strokeLinecap="round" /><path d="M0 -2l-4 8M0 -2l6 6" stroke="#264653" strokeWidth="2" strokeLinecap="round" />
      <path d="M-14 -10q-8 -2 -14 2" stroke="#ff006e" strokeWidth="1.4" fill="none" />
    </g>
    <g fill="#fff" opacity=".9"><path d="M30 60q2 -2 4 0q2 -2 4 0" stroke="#6d597a" strokeWidth=".7" fill="none" /><path d="M84 70q2 -2 4 0q2 -2 4 0" stroke="#6d597a" strokeWidth=".7" fill="none" /></g>
    <g stroke="#fff" strokeWidth="1" opacity=".7"><path d="M36 72l-8 0M38 76l-10 2" /></g>
    <St p={[20, 20, .8, 40, 10, .6, 70, 18, .7]} />
  </Svg>],

  [259, 'ต้นคริสต์มาสในทะเลทราย', <Svg>
    <defs>
      <linearGradient id="k259s" x2="0" y2="1"><stop stopColor="#f77f00" /><stop offset=".5" stopColor="#fcbf49" /><stop offset="1" stopColor="#eae2b7" /></linearGradient>
      <linearGradient id="k259d" x2="0" y2="1"><stop stopColor="#f4a261" /><stop offset="1" stopColor="#e76f51" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k259s)" />
    <circle cx="26" cy="30" r="16" fill="#fff3b0" opacity=".85" />
    <path d="M0 110Q30 94 60 104T120 96V160H0Z" fill="url(#k259d)" /><path d="M0 130Q50 118 120 132V160H0Z" fill="#d4a373" />
    <g fill="#606c38"><path d="M100 104v-24q0 -4 3 -4t3 4v24z" /><path d="M100 90q-6 0 -6 -6v-4q0 -2 2 -2t2 2v2q0 2 2 2zM106 86q6 0 6 -6v-2q0 -2 -2 -2t-2 2v2q0 2 -2 2z" /></g>
    <g transform="translate(56 124)">
      <rect x="-3" y="0" width="6" height="8" fill="#6f4518" />
      <path d="M-24 0L0 -20 24 0z" fill="#2d6a4f" /><path d="M-20 -14L0 -34 20 -14z" fill="#40916c" /><path d="M-14 -28L0 -46 14 -28z" fill="#52b788" />
      <path d="M-20 -6q20 8 40 -2M-16 -20q16 6 30 -2M-10 -34q10 4 20 -2" stroke="#ffd60a" strokeWidth="1" fill="none" />
      {[[-12, -4, '#e63946'], [8, -6, '#3a86ff'], [-6, -18, '#ffd60a'], [10, -22, '#e63946'], [-2, -32, '#3a86ff'], [16, -2, '#ffd60a'], [-16, -14, '#f72585']].map(([x, y, c], i) => <circle key={i} cx={x} cy={y} r="1.8" fill={c} />)}
      <path d="M0 -52l1.6 3.6 3.8.4-2.8 2.6.8 3.8-3.4-1.8-3.4 1.8.8-3.8-2.8-2.6 3.8-.4z" fill="#ffd60a" />
      <rect x="10" y="2" width="10" height="7" fill="#e63946" /><path d="M15 2v7M10 5h10" stroke="#ffd60a" strokeWidth="1" />
      <rect x="-22" y="3" width="8" height="6" fill="#3a86ff" /><path d="M-18 3v6" stroke="#fff" strokeWidth="1" />
    </g>
    <g transform="translate(90 136)"><ellipse cx="0" cy="-8" rx="12" ry="7" fill="#e9c46a" /><path d="M-6 -14q-2 -10 -10 -12" stroke="#e9c46a" strokeWidth="3" fill="none" strokeLinecap="round" /><circle cx="-16" cy="-26" r="3.4" fill="#e9c46a" /><circle cx="-17" cy="-27" r=".7" fill="#000" />
      <path d="M-6 -4v8M6 -4v8M-2 -4v8M2 -4v8" stroke="#e9c46a" strokeWidth="2" /><path d="M-4 -16q4 -6 8 0" fill="#e63946" /><circle cy="-19" r="1.4" fill="#fff" /></g>
    <g fill="#fff3b0" opacity=".7"><circle cx="70" cy="40" r=".8" /><circle cx="90" cy="20" r=".7" /></g>
  </Svg>],

  [260, 'สาวน้อยสวมดาวเสาร์เป็นหมวก', <Svg>
    <defs>
      <linearGradient id="k260s" x2="0" y2="1"><stop stopColor="#240046" /><stop offset="1" stopColor="#5a189a" /></linearGradient>
      <radialGradient id="k260p" cx=".4" cy=".35"><stop stopColor="#ffe5b4" /><stop offset=".7" stopColor="#f4a261" /><stop offset="1" stopColor="#bc6c25" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k260s)" />
    <St p={[8, 12, .9, 26, 30, .6, 96, 14, 1, 112, 40, .6, 14, 70, .7, 104, 80, .8, 30, 120, .6, 96, 130, .7]} />
    <g transform="translate(60 62)">
      <ellipse rx="40" ry="9" fill="none" stroke="#ffd166" strokeWidth="4" transform="rotate(-10)" opacity=".9" />
      <circle cy="-6" r="22" fill="url(#k260p)" /><path d="M-20 -12q20 6 40 0M-21 -2q21 6 42 0" stroke="#e76f51" strokeWidth="1.6" fill="none" opacity=".7" />
      <path d="M-40 6Q0 16 40 -6" stroke="#ffd166" strokeWidth="4" fill="none" transform="rotate(-10)" />
    </g>
    <g transform="translate(60 100)">
      <path d="M-14 -20q-4 18 0 26M14 -20q4 18 0 26" stroke="#6b3e26" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cy="-14" r="12" fill="#f1c27d" />
      <path d="M-12 -18q12 -8 24 0" fill="#6b3e26" />
      <path d="M-6 -14q2 -2 4 0M2 -14q2 -2 4 0" stroke="#3d2b1f" strokeWidth="1" fill="none" /><path d="M-3 -6q3 3 6 0" stroke="#c1121f" strokeWidth="1" fill="none" />
      <circle cx="-8" cy="-9" r="2" fill="#ff8fab" opacity=".6" /><circle cx="8" cy="-9" r="2" fill="#ff8fab" opacity=".6" />
      <path d="M-14 0h28l8 56h-44z" fill="#7b2cbf" /><g fill="#ffd60a">{[[-8, 14], [6, 22], [-4, 36], [10, 44], [-12, 48], [2, 8]].map(([x, y], i) => <path key={i} d="M0 -2.6l.8 1.8 1.8.2-1.4 1.2.4 1.8-1.6-.8-1.6.8.4-1.8-1.4-1.2 1.8-.2z" transform={`translate(${x} ${y})`} />)}</g>
    </g>
    <g fill="#c77dff"><circle cx="24" cy="44" r="5" /><ellipse cx="24" cy="44" rx="9" ry="2" fill="none" stroke="#e0aaff" strokeWidth="1" /><circle cx="98" cy="104" r="4" fill="#4cc9f0" /></g>
  </Svg>],

  [261, 'นาฬิกาแดดในสวนผีเสื้อ', <Svg>
    <defs>
      <linearGradient id="k261s" x2="0" y2="1"><stop stopColor="#fdffb6" /><stop offset="1" stopColor="#caffbf" /></linearGradient>
      <linearGradient id="k261st" x2="1"><stop stopColor="#dee2e6" /><stop offset="1" stopColor="#adb5bd" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k261s)" />
    <circle cx="100" cy="20" r="12" fill="#ffd60a" opacity=".9" />
    <g fill="#52b788">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 9} 92q4 -16 8 0z`} />)}</g>
    <path d="M0 92h120v68H0z" fill="#80ed99" />
    <g>{Array.from({ length: 22 }, (_, i) => { const x = (i * 43) % 116 + 2, y = 98 + (i * 19) % 56; return <g key={i}><path d={`M${x} ${y + 5}v-5`} stroke="#2d6a4f" strokeWidth=".8" /><circle cx={x} cy={y} r="2.2" fill={['#ff99c8', '#fcf6bd', '#a9def9', '#e4c1f9', '#ff595e'][i % 5]} /><circle cx={x} cy={y} r=".8" fill="#ffd60a" /></g>; })}</g>
    <g transform="translate(60 112)">
      <path d="M-10 30h20l-4 -30h-12z" fill="url(#k261st)" stroke="#6c757d" strokeWidth=".8" />
      <ellipse cx="0" cy="0" rx="26" ry="8" fill="url(#k261st)" stroke="#6c757d" strokeWidth=".8" />
      <g stroke="#495057" strokeWidth=".6">{Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return <path key={i} d={`M${(Math.cos(a) * 18).toFixed(1)} ${(Math.sin(a) * 5.4).toFixed(1)}L${(Math.cos(a) * 23).toFixed(1)} ${(Math.sin(a) * 7).toFixed(1)}`} />; })}</g>
      <path d="M0 0L-2 -16L8 0z" fill="#6c757d" stroke="#343a40" strokeWidth=".6" /><path d="M0 0L-18 4" stroke="#343a40" strokeWidth="2.4" opacity=".35" strokeLinecap="round" />
    </g>
    {[[30, 50, '#ff006e', '#ffbe0b'], [86, 60, '#3a86ff', '#8338ec'], [60, 34, '#fb5607', '#ffbe0b'], [18, 84, '#8338ec', '#ff006e'], [102, 88, '#06d6a0', '#118ab2']].map(([x, y, a, b], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${i * 20 - 30})`}>
      <path d="M0 0q-10 -12 -12 -2q2 6 12 2zM0 0q10 -12 12 -2q-2 6 -12 2z" fill={a} /><path d="M0 0q-8 4 -6 10q4 0 6 -10zM0 0q8 4 6 10q-4 0 -6 -10z" fill={b} />
      <path d="M0 -6v12" stroke="#212529" strokeWidth="1.4" strokeLinecap="round" /><path d="M0 -6l-3 -4M0 -6l3 -4" stroke="#212529" strokeWidth=".6" />
      <circle cx="-6" cy="-3" r="1.4" fill="#fff" opacity=".8" /><circle cx="6" cy="-3" r="1.4" fill="#fff" opacity=".8" />
    </g>)}
  </Svg>],

  [262, 'ช้างน้อยอาบน้ำในอ่าง', <Svg>
    <defs>
      <pattern id="k262t" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#caf0f8" /><path d="M0 0h12v12" stroke="#90e0ef" strokeWidth=".8" fill="none" /></pattern>
      <radialGradient id="k262e" cx=".4" cy=".35"><stop stopColor="#ced4da" /><stop offset="1" stopColor="#868e96" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k262t)" />
    <rect y="126" width="120" height="34" fill="#ffafcc" /><path d="M0 126h120" stroke="#f497b6" strokeWidth="1.4" />
    <g transform="translate(16 30)"><path d="M0 0h10v6h-10z" fill="#adb5bd" /><path d="M10 3h10" stroke="#adb5bd" strokeWidth="2" /><g stroke="#4cc9f0" strokeWidth="1.2">{[0, 3, 6, 9].map(x => <path key={x} d={`M${x + 1} 6l-2 10`} />)}</g></g>
    <g transform="translate(60 108)">
      <path d="M-40 -4h80l-6 30h-68z" fill="#fff" stroke="#adb5bd" strokeWidth="1.2" /><path d="M-34 26l-2 8M34 26l2 8" stroke="#ffd166" strokeWidth="3" strokeLinecap="round" />
      <path d="M-40 -4h80" stroke="#dee2e6" strokeWidth="2.4" strokeLinecap="round" />
      <g transform="translate(0 -14)">
        <circle r="18" fill="url(#k262e)" /><path d="M-18 -4q-16 -6 -16 8q4 10 14 4z" fill="#adb5bd" stroke="#6c757d" strokeWidth=".8" /><path d="M18 -4q16 -6 16 8q-4 10 -14 4z" fill="#adb5bd" stroke="#6c757d" strokeWidth=".8" />
        <path d="M-26 0q-4 2 0 6M26 0q4 2 0 6" stroke="#ffafcc" strokeWidth="2" fill="none" />
        <circle cx="-6" cy="-4" r="2" fill="#212529" /><circle cx="6" cy="-4" r="2" fill="#212529" /><circle cx="-5.4" cy="-4.6" r=".6" fill="#fff" />
        <circle cx="-10" cy="4" r="2.4" fill="#ffafcc" opacity=".7" /><circle cx="10" cy="4" r="2.4" fill="#ffafcc" opacity=".7" />
        <path d="M0 2q0 12 8 20q6 2 6 -6q-4 -14 -4 -26" fill="url(#k262e)" />
        <path d="M14 16q4 -14 14 -26" stroke="#4cc9f0" strokeWidth="2" fill="none" strokeDasharray="2 2" />
      </g>
      <g fill="#fff" stroke="#bde0fe" strokeWidth=".6">{[[-36, -8, 5], [-28, -12, 4], [-20, -6, 6], [22, -8, 5], [32, -10, 6], [38, -4, 3], [-8, -4, 4], [10, -4, 4]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    </g>
    <g fill="#fff" stroke="#90e0ef" strokeWidth=".6">{[[50, 40, 4], [60, 30, 3], [88, 34, 5], [96, 22, 3], [40, 54, 2.4]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <g transform="translate(96 140)"><path d="M-6 0h12v6h-12z" fill="#ffd60a" /><path d="M-6 0q6 -8 12 0" fill="#ffd60a" /><circle cx="-2" cy="-2" r=".8" fill="#000" /><path d="M4 -2l3 0" stroke="#f77f00" strokeWidth="1.4" /></g>
  </Svg>],

  [263, 'กระต่ายดึงนักมายากลออกจากหมวก', <Svg>
    <defs>
      <linearGradient id="k263s" x2="0" y2="1"><stop stopColor="#6a040f" /><stop offset="1" stopColor="#370617" /></linearGradient>
      <radialGradient id="k263l" cx=".5" cy=".3" r=".7"><stop stopColor="#ffd6a5" stopOpacity=".55" /><stop offset="1" stopColor="#ffd6a5" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k263s)" />
    <path d="M0 0q10 40 4 160h-4zM120 0q-10 40 -4 160h4z" fill="#9d0208" />
    <g fill="#ffba08">{Array.from({ length: 10 }, (_, i) => <circle key={i} cx={8 + i * 11.6} cy="6" r="2" />)}</g>
    <rect width="120" height="160" fill="url(#k263l)" />
    <rect y="124" width="120" height="36" fill="#3d1f12" /><path d="M0 124h120" stroke="#ffba08" strokeWidth="1.4" />
    <g transform="translate(60 120)">
      <ellipse cx="0" cy="2" rx="24" ry="5" fill="#212529" /><path d="M-16 2v-30h32v30z" fill="#212529" /><path d="M-16 -18h32v5h-32z" fill="#e63946" />
      <ellipse cx="0" cy="-28" rx="16" ry="4" fill="#000" />
    </g>
    <g transform="translate(58 70)">
      <path d="M-4 22q-2 -14 4 -18q6 4 4 18z" fill="#f8f9fa" /><circle cy="2" r="8" fill="#f8f9fa" />
      <path d="M-4 -4q-4 -16 0 -20q4 4 2 20zM4 -4q6 -16 2 -20q-4 4 -4 20z" fill="#f8f9fa" stroke="#dee2e6" strokeWidth=".6" />
      <circle cx="-3" cy="0" r="1.2" fill="#000" /><circle cx="3" cy="0" r="1.2" fill="#000" /><path d="M-1 4h2l-1 1z" fill="#ff8fab" />
      <path d="M-6 10l-10 -16M6 10l10 -16" stroke="#f8f9fa" strokeWidth="3" strokeLinecap="round" />
    </g>
    <g transform="translate(60 32)">
      <circle cy="0" r="7" fill="#f1c27d" /><path d="M-7 -2q7 -8 14 0" fill="#212529" /><path d="M-3 4q3 -2 6 0" stroke="#6b3e26" strokeWidth=".8" fill="none" /><path d="M-4 -1q1 -1.4 2 0M2 -1q1 -1.4 2 0" stroke="#000" strokeWidth=".7" fill="none" />
      <path d="M-16 -10l-4 4M16 -10l4 4" stroke="#f1c27d" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M-8 6h16l2 20h-20z" fill="#212529" /><path d="M-3 6l3 6 3 -6z" fill="#fff" /><path d="M-2 8h4" stroke="#e63946" strokeWidth="1.6" />
      <path d="M-8 8l-10 -14M8 8l10 -14" stroke="#212529" strokeWidth="3.4" strokeLinecap="round" />
    </g>
    <g fill="#ffd60a">{[[30, 40], [92, 36], [24, 80], [96, 82], [40, 20], [80, 18]].map(([x, y], i) => <path key={i} d="M0 -3l.9 2.1 2.1.3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.4 2.1-.3z" transform={`translate(${x} ${y})`} />)}</g>
    <g fill="#e9c46a" opacity=".6"><circle cx="20" cy="140" r="6" /><circle cx="100" cy="140" r="6" /></g>
  </Svg>],

  [264, 'รถไฟเหาะในป่าดงดิบ', <Svg>
    <defs>
      <linearGradient id="k264s" x2="0" y2="1"><stop stopColor="#d8f3dc" /><stop offset="1" stopColor="#74c69d" /></linearGradient>
      <linearGradient id="k264c" x2="1"><stop stopColor="#e63946" /><stop offset="1" stopColor="#9d0208" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k264s)" />
    <g fill="#2d6a4f" opacity=".6"><path d="M0 60q20 -30 40 0zM70 50q24 -34 50 0z" /></g>
    <g fill="#1b4332"><path d="M0 160V90q20 -20 34 0v70zM86 160V80q18 -24 34 0v80z" /></g>
    <path d="M-4 120Q20 40 50 80T100 40T124 70" stroke="#6f4518" strokeWidth="4" fill="none" /><path d="M-4 126Q20 46 50 86T100 46T124 76" stroke="#6f4518" strokeWidth="2" fill="none" />
    <g stroke="#9c6644" strokeWidth="1.6">{[[10, 100], [24, 76], [40, 74], [56, 88], [70, 82], [86, 56], [104, 46]].map(([x, y], i) => <path key={i} d={`M${x} ${y}v${160 - y}`} />)}</g>
    <g stroke="#9c6644" strokeWidth=".8">{[[8, 120, 22, 92], [26, 100, 40, 84], [52, 120, 68, 100], [84, 110, 100, 80]].map(([a, b, c, d], i) => <path key={i} d={`M${a} ${b}L${c} ${d}`} />)}</g>
    <g transform="translate(92 50) rotate(-30)">
      {[0, -16, -32].map(dx => <g key={dx} transform={`translate(${dx} ${-dx * .1})`}><rect x="-7" y="-6" width="14" height="8" rx="2" fill="url(#k264c)" stroke="#370617" strokeWidth=".8" /><circle cx="-4" cy="3" r="1.6" fill="#212529" /><circle cx="4" cy="3" r="1.6" fill="#212529" />
        <circle cx="0" cy="-9" r="3" fill={['#f1c27d', '#e0ac69', '#8d5524'][-dx / 16]} /><path d={`M-2 -10l-4 -6M2 -10l4 -6`} stroke={['#f1c27d', '#e0ac69', '#8d5524'][-dx / 16]} strokeWidth="1.4" strokeLinecap="round" /></g>)}
    </g>
    <g fill="#40916c">{[[30, 40], [60, 30], [14, 50]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q-10 -10 -18 -2q10 -2 18 2zM${x} ${y}q10 -10 18 -2q-10 -2 -18 2z`} />)}</g>
    <g transform="translate(20 70)"><path d="M0 0q-2 -4 0 -6q4 -2 6 2" fill="none" stroke="#6f4518" strokeWidth="1.4" /><circle cx="4" cy="2" r="4" fill="#7f5539" /><circle cx="3" cy="1" r=".6" fill="#000" /><circle cx="5.4" cy="1" r=".6" fill="#000" /><path d="M2 4q2 1.4 4 0" stroke="#000" strokeWidth=".5" fill="none" /></g>
    <g transform="translate(100 120)"><path d="M0 0q-6 -4 -4 -10q6 2 4 10z" fill="#ef476f" /><path d="M0 0q6 -6 10 -2q-4 4 -10 2z" fill="#ffd166" /><circle cx="0" cy="-1" r="1.4" fill="#06d6a0" /></g>
    <g transform="translate(64 120)"><ellipse rx="5" ry="3" fill="#06d6a0" /><circle cx="5" cy="-2" r="2.4" fill="#06d6a0" /><path d="M-5 0q-6 0 -8 -4" stroke="#06d6a0" strokeWidth="1.6" fill="none" /><circle cx="6" cy="-2.4" r=".6" fill="#000" /></g>
  </Svg>],
];
