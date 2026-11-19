// ภาพการ์ดแบบละเอียด ชุด 37 (ภาพใหม่ 281–288) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD37 = [
  [281, 'ยูนิคอร์นในลานจอดรถ', <Svg>
    <defs>
      <linearGradient id="k281s" x2="0" y2="1"><stop stopColor="#6c757d" /><stop offset="1" stopColor="#ced4da" /></linearGradient>
      <linearGradient id="k281m" x2="0" y2="1"><stop stopColor="#ff99c8" /><stop offset=".5" stopColor="#a9def9" /><stop offset="1" stopColor="#e4c1f9" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k281s)" />
    <rect y="30" width="120" height="6" fill="#495057" /><rect y="36" width="120" height="70" fill="#adb5bd" /><g fill="#6c757d">{[10, 40, 70, 100].map(x => <rect key={x} x={x} y="36" width="8" height="70" />)}</g>
    <rect y="106" width="120" height="54" fill="#495057" /><g stroke="#f8f9fa" strokeWidth="1.6">{[0, 30, 60, 90, 120].map(x => <path key={x} d={`M${x} 110v40`} />)}</g>
    <g transform="translate(16 124)"><rect x="-14" y="-8" width="28" height="12" rx="3" fill="#e63946" /><rect x="-8" y="-14" width="16" height="7" rx="2" fill="#e63946" /><rect x="-6" y="-13" width="12" height="5" fill="#a2d2ff" /><circle cx="-8" cy="4" r="3" fill="#212529" /><circle cx="8" cy="4" r="3" fill="#212529" /></g>
    <g transform="translate(104 124)"><rect x="-14" y="-8" width="28" height="12" rx="3" fill="#3a86ff" /><rect x="-8" y="-14" width="16" height="7" rx="2" fill="#3a86ff" /><rect x="-6" y="-13" width="12" height="5" fill="#a2d2ff" /><circle cx="-8" cy="4" r="3" fill="#212529" /><circle cx="8" cy="4" r="3" fill="#212529" /></g>
    <g transform="translate(60 128)">
      <path d="M-16 -8q0 -12 14 -12h8q12 0 12 10v4h-34z" fill="#fff" stroke="#ced4da" strokeWidth=".8" />
      <path d="M-12 -4v16M-6 -4v16M6 -4v16M12 -4v16" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" /><path d="M-12 12v2M-6 12v2M6 12v2M12 12v2" stroke="#ced4da" strokeWidth="3.4" />
      <path d="M12 -16q2 -10 10 -14q6 -2 8 4q0 4 -4 6l-4 2q-2 6 -6 8z" fill="#fff" stroke="#ced4da" strokeWidth=".8" />
      <path d="M22 -30l4 -14 1 15z" fill="#ffd60a" stroke="#b08900" strokeWidth=".6" /><path d="M23 -36l3 1M23.4 -40l2.6 1" stroke="#b08900" strokeWidth=".5" />
      <circle cx="25" cy="-24" r="1" fill="#000" /><circle cx="28" cy="-19" r="1.2" fill="#ffafcc" />
      <path d="M14 -28q-8 6 -10 16q-4 -12 4 -20z" fill="url(#k281m)" /><path d="M-16 -12q-12 -2 -14 10q8 -4 14 -6z" fill="url(#k281m)" />
    </g>
    <g fill="#fff">{[[40, 100], [86, 96], [74, 84]].map(([x, y], i) => <path key={i} d="M0 -3l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" transform={`translate(${x} ${y})`} />)}</g>
    <g transform="translate(60 52)"><rect x="-16" y="-8" width="32" height="14" rx="2" fill="#1d3557" /><text y="3" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="800" fontFamily="sans-serif">P</text></g>
  </Svg>],

  [282, 'เกาะลอยฟ้ามีน้ำตก', <Svg>
    <defs>
      <linearGradient id="k282s" x2="0" y2="1"><stop stopColor="#48cae4" /><stop offset="1" stopColor="#caf0f8" /></linearGradient>
      <linearGradient id="k282r" x2="0" y2="1"><stop stopColor="#9c6644" /><stop offset="1" stopColor="#3d2b1f" /></linearGradient>
      <linearGradient id="k282w" x2="0" y2="1"><stop stopColor="#caf0f8" /><stop offset="1" stopColor="#caf0f8" stopOpacity="0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k282s)" />
    <Cl x={20} y={120} s={1.4} /><Cl x={98} y={134} s={1.2} /><Cl x={60} y={150} s={1.8} />
    <g transform="translate(60 60)">
      <path d="M-40 0q40 10 80 0l-14 30q-14 30 -26 50q-12 -20 -26 -50z" fill="url(#k282r)" />
      <path d="M-30 20l-4 -6M30 18l4 -4M-10 50l-4 -4" stroke="#6f4518" strokeWidth="1" />
      <path d="M-42 0q42 -12 84 0q-42 10 -84 0z" fill="#80b918" /><path d="M-42 0q42 8 84 0" stroke="#55a630" strokeWidth="2" fill="none" />
      <path d="M-10 -2q-2 -24 4 -34M-6 -30q-10 -4 -14 2M-6 -30q8 -8 14 -4" stroke="#6f4518" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <g fill="#2d6a4f"><circle cx="-6" cy="-34" r="10" /><circle cx="-18" cy="-28" r="7" /><circle cx="6" cy="-30" r="8" /></g>
      <g transform="translate(20 -6)"><rect x="-6" y="-8" width="12" height="9" fill="#ffe8d6" /><path d="M-8 -8l8 -7 8 7z" fill="#e76f51" /><rect x="-2" y="-5" width="4" height="6" fill="#6f4518" /></g>
      <path d="M28 2q2 30 -2 80" stroke="url(#k282w)" strokeWidth="6" fill="none" /><path d="M28 2q2 30 -2 80" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".6" />
    </g>
    <g transform="translate(96 30) scale(.6)"><path d="M-20 0q20 6 40 0l-10 18q-10 14 -20 0z" fill="url(#k282r)" /><path d="M-22 0q22 -6 44 0q-22 6 -44 0z" fill="#80b918" /><circle cx="0" cy="-8" r="6" fill="#40916c" /></g>
    <g transform="translate(18 40) scale(.45)"><path d="M-20 0q20 6 40 0l-10 18q-10 14 -20 0z" fill="url(#k282r)" /><path d="M-22 0q22 -6 44 0q-22 6 -44 0z" fill="#80b918" /></g>
    <g fill="#3d405b"><path d="M40 20q2 -2 4 0q2 -2 4 0" stroke="#3d405b" strokeWidth=".7" fill="none" /><path d="M76 14q2 -2 4 0q2 -2 4 0" stroke="#3d405b" strokeWidth=".7" fill="none" /></g>
  </Svg>],

  [283, 'ผีกินก๋วยเตี๋ยวตอนตีสอง', <Svg>
    <defs>
      <linearGradient id="k283s" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset="1" stopColor="#14213d" /></linearGradient>
      <radialGradient id="k283l" cx=".5" cy=".3" r=".6"><stop stopColor="#ffb703" stopOpacity=".55" /><stop offset="1" stopColor="#ffb703" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k283s)" />
    <St p={[10, 10, .6, 30, 20, .5, 96, 12, .7, 110, 30, .5]} />
    <rect width="120" height="160" fill="url(#k283l)" />
    <g transform="translate(60 40)"><path d="M0 0v8" stroke="#495057" strokeWidth="1" /><path d="M-6 8h12l-1 8h-10z" fill="#ffd166" /><circle cy="18" r="10" fill="#ffd166" opacity=".25" /></g>
    <path d="M10 70h100v8H10z" fill="#9d0208" /><path d="M10 70q10 8 20 0t20 0t20 0t20 0t20 0" fill="#e63946" />
    <rect x="14" y="78" width="92" height="40" fill="#370617" /><g fill="#ffd166"><text x="60" y="94" fontSize="9" textAnchor="middle" fontWeight="800" fontFamily="Mitr,sans-serif">ก๋วยเตี๋ยว</text></g>
    <rect y="118" width="120" height="42" fill="#343a40" />
    <g transform="translate(30 104)"><rect x="-12" y="0" width="24" height="16" fill="#adb5bd" stroke="#495057" strokeWidth=".8" /><ellipse cy="0" rx="12" ry="3" fill="#ced4da" /><g fill="#fff" opacity=".6"><path d="M-4 -2q-2 -6 2 -10M4 -2q-2 -6 2 -10" stroke="#fff" strokeWidth="1" fill="none" /></g></g>
    <g transform="translate(76 112)">
      <rect x="-26" y="-2" width="52" height="4" fill="#9c6644" /><path d="M-22 2v20M22 2v20" stroke="#6f4518" strokeWidth="2" />
      <path d="M-10 -8h20q-2 8 -10 8q-8 0 -10 -8z" fill="#fff" stroke="#adb5bd" strokeWidth=".6" /><ellipse cy="-8" rx="10" ry="2.4" fill="#f4a261" /><path d="M-6 -9q3 -2 6 0t6 0" stroke="#fefae0" strokeWidth="1" fill="none" />
      <path d="M8 -14l10 -10M10 -13l11 -10" stroke="#9c6644" strokeWidth="1" />
    </g>
    <g transform="translate(78 86)" opacity=".92">
      <path d="M-12 18q-2 -20 4 -28q8 -10 16 0q6 8 4 28q-4 -4 -6 0q-3 -4 -6 0q-3 -4 -6 0q-3 -4 -6 0z" fill="#f8f9fa" />
      <circle cx="-3" cy="-4" r="1.8" fill="#000" /><circle cx="5" cy="-4" r="1.8" fill="#000" /><ellipse cx="1" cy="2" rx="2" ry="2.6" fill="#000" />
      <path d="M-2 4q1 6 0 10M2 4q2 6 0 10" stroke="#ffe066" strokeWidth="1" fill="none" />
      <path d="M8 4q8 0 10 -12" stroke="#f8f9fa" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="-6" cy="0" r="1.6" fill="#ffafcc" opacity=".6" />
    </g>
    <g transform="translate(106 60)"><circle r="8" fill="#fff" stroke="#495057" strokeWidth="1" /><path d="M0 0v-5M0 0l-3 -3" stroke="#212529" strokeWidth="1" /><text y="-2" x="0" fontSize="0" /></g>
    <g fill="#f8f9fa" opacity=".5" fontFamily="sans-serif" fontWeight="700"><text x="98" y="78" fontSize="6">02:00</text></g>
  </Svg>],

  [284, 'ตุ๊กตาไม้ซ้อนกัน', <Svg>
    <defs>
      <linearGradient id="k284s" x2="0" y2="1"><stop stopColor="#fefae0" /><stop offset="1" stopColor="#ffe5b4" /></linearGradient>
      <radialGradient id="k284d" cx=".4" cy=".35"><stop stopColor="#ff8fa3" /><stop offset="1" stopColor="#c9184a" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k284s)" />
    <g fill="#f4a261" opacity=".25">{Array.from({ length: 8 }, (_, i) => <circle key={i} cx={(i * 37) % 120} cy={(i * 53) % 160} r="10" />)}</g>
    <rect y="126" width="120" height="34" fill="#bc6c25" /><path d="M0 126h120" stroke="#7f5539" strokeWidth="1.4" />
    {[[26, 1.2, '#c9184a', '#ffb703'], [58, .95, '#3a86ff', '#ffd60a'], [84, .75, '#2a9d8f', '#ff99c8'], [102, .55, '#8338ec', '#ffd166']].map(([x, s, c, d], i) => <g key={i} transform={`translate(${x} 126) scale(${s})`}>
      <path d="M-16 0q-4 -20 4 -30q-4 -16 12 -18q16 2 12 18q8 10 4 30z" fill={c} stroke="#3d2b1f" strokeWidth="1" />
      <circle cy="-34" r="10" fill="#ffe8d6" /><path d="M-10 -36q10 -12 20 0q-4 -10 -10 -10t-10 10z" fill={c} />
      <circle cx="-3.4" cy="-34" r="1.2" fill="#000" /><circle cx="3.4" cy="-34" r="1.2" fill="#000" /><circle cx="-6" cy="-30" r="2" fill="#ff8fab" opacity=".8" /><circle cx="6" cy="-30" r="2" fill="#ff8fab" opacity=".8" /><path d="M-2 -29q2 2 4 0" stroke="#c9184a" strokeWidth=".8" fill="none" />
      <ellipse cy="-12" rx="10" ry="10" fill="#fefae0" /><g fill={d}><circle cy="-12" r="4" /><circle cx="-4" cy="-16" r="2.4" /><circle cx="4" cy="-16" r="2.4" /><circle cx="-4" cy="-8" r="2.4" /><circle cx="4" cy="-8" r="2.4" /></g><circle cy="-12" r="1.6" fill="#fff" />
      <path d="M-16 -22q16 4 32 0" stroke="#ffd60a" strokeWidth="1.4" fill="none" />
    </g>)}
    <g transform="translate(110 126) scale(.38)"><path d="M-16 0q-4 -20 4 -30q-4 -16 12 -18q16 2 12 18q8 10 4 30z" fill="#e85d04" stroke="#3d2b1f" strokeWidth="1.6" /><circle cy="-34" r="10" fill="#ffe8d6" /><circle cx="-3.4" cy="-34" r="1.6" fill="#000" /><circle cx="3.4" cy="-34" r="1.6" fill="#000" /></g>
    <g transform="translate(40 146)"><path d="M-10 0q0 -8 10 -8q10 0 10 8z" fill="#c9184a" stroke="#3d2b1f" strokeWidth=".8" /><path d="M-10 0h20" stroke="#ffd60a" strokeWidth="1.4" /></g>
  </Svg>],

  [285, 'นักว่ายน้ำกับฉลามเพื่อนซี้', <Svg>
    <defs>
      <linearGradient id="k285s" x2="0" y2="1"><stop stopColor="#48cae4" /><stop offset=".6" stopColor="#0096c7" /><stop offset="1" stopColor="#023e8a" /></linearGradient>
      <linearGradient id="k285h" x2="0" y2="1"><stop stopColor="#8d99ae" /><stop offset="1" stopColor="#5c677d" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k285s)" />
    <path d="M0 22q10 -4 20 0t20 0t20 0t20 0t20 0t20 0V0H0z" fill="#caf0f8" opacity=".6" />
    <g fill="#fff" opacity=".15"><path d="M14 22l14 138h4L22 22zM70 22l6 138h4L76 22z" /></g>
    <g transform="translate(64 90) rotate(-8)">
      <path d="M-40 0Q-30 -16 0 -16Q26 -14 36 0Q26 12 0 12Q-30 12 -40 0z" fill="url(#k285h)" />
      <path d="M-36 2Q-10 12 34 2Q24 10 0 10Q-24 10 -36 2z" fill="#f8f9fa" />
      <path d="M-4 -14l6 -16 8 16z" fill="url(#k285h)" /><path d="M-40 0l-12 -12q4 12 0 24z" fill="url(#k285h)" /><path d="M6 6l4 10 6 -8z" fill="#5c677d" />
      <circle cx="24" cy="-4" r="2.4" fill="#fff" /><circle cx="25" cy="-4" r="1.4" fill="#000" />
      <path d="M18 4q8 4 14 -2" stroke="#212529" strokeWidth="1" fill="none" /><path d="M20 4l1 2 1 -2 1 2 1 -2 1 2 1 -2" stroke="#fff" strokeWidth=".6" fill="none" />
      <path d="M12 -8q2 -2 4 0M16 -8q2 -2 4 0M20 -8q2 -2 4 0" stroke="#5c677d" strokeWidth=".6" fill="none" />
    </g>
    <g transform="translate(66 60) rotate(-8)">
      <circle cx="6" cy="0" r="5" fill="#f1c27d" /><path d="M1 -2q5 -6 10 0" fill="#ff006e" /><rect x="2" y="-2" width="9" height="3" rx="1.4" fill="#4cc9f0" opacity=".9" stroke="#023e8a" strokeWidth=".5" />
      <path d="M2 4l-14 4" stroke="#ff006e" strokeWidth="5" strokeLinecap="round" /><path d="M-12 8l-10 2M-12 8l-8 6" stroke="#f1c27d" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M2 4l8 10" stroke="#f1c27d" strokeWidth="2.2" strokeLinecap="round" /><path d="M-2 6l-4 12" stroke="#f1c27d" strokeWidth="2.2" strokeLinecap="round" />
    </g>
    <g fill="#caf0f8">{[[78, 54], [82, 46], [80, 38], [30, 70], [34, 62]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1 + (i % 2) * .6} />)}</g>
    <path d="M0 146Q30 138 60 146T120 142V160H0Z" fill="#e9c46a" /><g fill="#2a9d8f"><path d="M10 146q-4 -14 2 -20q0 10 0 20z" /><path d="M108 144q4 -16 -2 -22q0 12 2 22z" /></g>
    <g transform="translate(24 120)"><ellipse rx="6" ry="3" fill="#ffb703" /><path d="M5 0l4-3v6z" fill="#fb8500" /><circle cx="-3" cy="-.6" r=".7" fill="#000" /></g>
  </Svg>],

  [286, 'ฝูงปลาเป็นรูปปลายักษ์', <Svg>
    <defs>
      <linearGradient id="k286s" x2="0" y2="1"><stop stopColor="#00b4d8" /><stop offset="1" stopColor="#03045e" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k286s)" />
    <g fill="#fff" opacity=".12"><path d="M20 0l16 160h4L26 0zM90 0l-6 160h4l8 -160z" /></g>
    {(() => { const out = []; for (let i = 0; i < 90; i++) { const x = 14 + (i * 37) % 92, y = 40 + (i * 53) % 70; const dx = (x - 60) / 46, dy = (y - 75) / 32; const inBody = dx * dx + dy * dy < 1 || (x > 96 && Math.abs(y - 75) < (x - 96) * 1.4 && x < 112); if (inBody) out.push([x, y]); } return out; })().map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) scale(.5)`}><ellipse rx="5" ry="2.6" fill="#90e0ef" /><path d="M4 0l4-3v6z" fill="#48cae4" /><circle cx="-2.4" cy="-.4" r=".6" fill="#03045e" /></g>)}
    <g transform="translate(22 72) scale(1.6)"><ellipse rx="4" ry="4" fill="#ffd60a" /><circle cx="-1" cy="-1" r="2" fill="#03045e" /><circle cx="-1.4" cy="-1.4" r=".6" fill="#fff" /></g>
    <path d="M20 86q8 4 14 0" stroke="#ffd60a" strokeWidth="1.4" fill="none" opacity="0" />
    <g transform="translate(26 132) scale(-1 1)"><path d="M-14 0q4 -8 14 -6q8 2 12 6q-4 4 -12 6q-10 2 -14 -6z" fill="#212529" /><path d="M-14 0l-8 -6v12z" fill="#212529" /><circle cx="6" cy="-1" r="1.4" fill="#fff" /><path d="M8 3l3 1 -3 1z" fill="#fff" /></g>
    <path d="M0 150Q60 142 120 150V160H0Z" fill="#023047" /><g fill="#2a9d8f"><path d="M100 150q-4 -14 2 -20q0 10 0 20z" /></g>
    <g fill="#caf0f8" opacity=".7">{[[90, 30], [94, 22], [16, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" />)}</g>
  </Svg>],

  [287, 'ภูเขาหน้าคนหลับ', <Svg>
    <defs>
      <linearGradient id="k287s" x2="0" y2="1"><stop stopColor="#ffcad4" /><stop offset=".5" stopColor="#f4acb7" /><stop offset="1" stopColor="#9d8189" /></linearGradient>
      <linearGradient id="k287m" x2="0" y2="1"><stop stopColor="#6d597a" /><stop offset="1" stopColor="#355070" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k287s)" />
    <circle cx="92" cy="30" r="10" fill="#fff3b0" />
    <path d="M0 110Q10 96 20 98Q30 70 46 72Q52 60 60 62Q64 54 70 60Q78 50 84 64Q96 70 104 92Q112 96 120 110V160H0Z" fill="url(#k287m)" />
    <path d="M58 66q4 -2 6 2" stroke="#3d2b1f" strokeWidth="1.2" fill="none" opacity=".5" />
    <path d="M40 80q4 3 8 0M66 72q4 3 8 0" stroke="#22223b" strokeWidth="1.4" fill="none" />
    <path d="M52 92q6 4 12 0" stroke="#22223b" strokeWidth="1.2" fill="none" />
    <g fill="#2d6a4f">{[[14, 108], [24, 104], [98, 100], [108, 106], [34, 92]].map(([x, y], i) => <path key={i} d={`M${x} ${y}l4 -10 4 10z`} />)}</g>
    <path d="M0 126Q60 116 120 128V160H0Z" fill="#355070" /><path d="M0 138Q60 130 120 140" stroke="#eaac8b" strokeWidth=".8" fill="none" opacity=".6" />
    <g fill="#fff" opacity=".85"><ellipse cx="30" cy="112" rx="26" ry="5" /><ellipse cx="96" cy="118" rx="30" ry="6" /></g>
    <g fill="#6d597a" fontWeight="700" fontFamily="sans-serif"><text x="78" y="56" fontSize="7">z</text><text x="84" y="48" fontSize="9">z</text><text x="90" y="38" fontSize="11">Z</text></g>
    <g fill="#22223b"><path d="M20 40q2 -2 4 0q2 -2 4 0" stroke="#22223b" strokeWidth=".7" fill="none" /></g>
    <g transform="translate(60 148)"><path d="M-14 0q14 -6 28 0" stroke="#fefae0" strokeWidth="1" fill="none" /><path d="M-6 -4l6 -6 6 6" stroke="#9c6644" strokeWidth="1.4" fill="none" /></g>
  </Svg>],

  [288, 'แมงมุมถักผ้าพันคอ', <Svg>
    <defs>
      <linearGradient id="k288s" x2="0" y2="1"><stop stopColor="#e9edc9" /><stop offset="1" stopColor="#ccd5ae" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k288s)" />
    <g stroke="#adb5bd" strokeWidth=".6" fill="none" opacity=".8">{Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return <path key={i} d={`M30 30L${(30 + Math.cos(a) * 34).toFixed(1)} ${(30 + Math.sin(a) * 34).toFixed(1)}`} />; })}{[8, 16, 24, 32].map(r => <circle key={r} cx="30" cy="30" r={r} />)}</g>
    <path d="M60 0v44" stroke="#adb5bd" strokeWidth=".7" />
    <g transform="translate(60 56)">
      <ellipse cx="0" cy="6" rx="10" ry="12" fill="#3d405b" /><circle cy="-8" r="7" fill="#3d405b" />
      {[-1, 1].map(sd => [0, 1, 2, 3].map(k => <path key={sd + '-' + k} d={`M${sd * 6} ${-2 + k * 5}q${sd * 10} ${-6 + k * 2} ${sd * 16} ${4 + k * 3}`} stroke="#3d405b" strokeWidth="1.6" fill="none" strokeLinecap="round" />))}
      <circle cx="-3" cy="-9" r="2.2" fill="#fff" /><circle cx="3" cy="-9" r="2.2" fill="#fff" /><circle cx="-3" cy="-8.6" r="1.1" fill="#000" /><circle cx="3" cy="-8.6" r="1.1" fill="#000" />
      <path d="M-2 -4q2 2 4 0" stroke="#ff8fab" strokeWidth=".8" fill="none" /><circle cx="-5" cy="-5" r="1.2" fill="#ff8fab" opacity=".6" /><circle cx="5" cy="-5" r="1.2" fill="#ff8fab" opacity=".6" />
      <path d="M-14 6l-8 16M14 6l8 16" stroke="#9c6644" strokeWidth="1.2" />
    </g>
    <g transform="translate(60 86)">
      <path d="M-26 -4h52v20h-52z" fill="#e63946" /><g stroke="#ffd60a" strokeWidth="1.4">{[0, 6, 12].map(y => <path key={y} d={`M-26 ${y}h52`} />)}</g>
      <g fill="none" stroke="#9d0208" strokeWidth=".6">{Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${-24 + i * 6.6} -4v20`} />)}</g>
      <path d="M-26 16l-4 30M26 16l4 30" stroke="#e63946" strokeWidth="10" opacity="0" />
      <path d="M-22 16v24h10v-24z" fill="#e63946" /><path d="M-22 22h10M-22 30h10" stroke="#ffd60a" strokeWidth="1.4" />
      <g stroke="#9d0208" strokeWidth="1">{[-20, -17, -14].map(x => <path key={x} d={`M${x} 40v6`} />)}</g>
    </g>
    <g transform="translate(96 132)"><circle r="12" fill="#e63946" /><g stroke="#9d0208" strokeWidth=".8" fill="none"><path d="M-10 -4q10 6 20 0M-12 2q12 6 24 0M-8 -9q8 4 16 0" /></g><path d="M-6 8q-20 -10 -34 -40" stroke="#e63946" strokeWidth="1" fill="none" /></g>
    <g transform="translate(24 132)"><circle r="9" fill="#3a86ff" /><g stroke="#023e8a" strokeWidth=".8" fill="none"><path d="M-8 -3q8 5 16 0M-9 2q9 5 18 0" /></g></g>
    <path d="M0 146h120V160H0z" fill="#a3b18a" />
  </Svg>],
];
