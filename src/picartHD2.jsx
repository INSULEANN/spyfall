// ภาพการ์ดแบบละเอียด ชุด 2 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;

export const HD2 = [
  [145, 'เงามือกลายเป็นนก', <Svg>
    <defs>
      <linearGradient id="k145w" x2="0" y2="1"><stop stopColor="#2b2550" /><stop offset="1" stopColor="#3d3470" /></linearGradient>
      <radialGradient id="k145l" cx=".1" cy=".55" r=".9"><stop stopColor="#ffe3a0" stopOpacity=".95" /><stop offset=".55" stopColor="#f7b955" stopOpacity=".45" /><stop offset="1" stopColor="#f7b955" stopOpacity="0" /></radialGradient>
      <linearGradient id="k145b" x2="1" y2="1"><stop stopColor="#ffd86b" /><stop offset="1" stopColor="#f08a24" /></linearGradient>
      <linearGradient id="k145h" x2="0" y2="1"><stop stopColor="#f3c69d" /><stop offset="1" stopColor="#d8996b" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k145w)" />
    <g stroke="#463c80" strokeWidth=".6" opacity=".7">{[10, 30, 50, 70, 90, 110].map(x => <path key={x} d={`M${x} 0V128`} />)}</g>
    <g fill="#4c4288" opacity=".6">{[[20, 20], [60, 14], [100, 26], [40, 50], [80, 46], [20, 90], [100, 84]].map(([x, y], i) => <path key={i} d={`M${x} ${y}l2 3-2 3-2-3z`} />)}</g>
    <path d="M0 40L120 10V128L0 128Z" fill="url(#k145l)" />
    <path d="M28 76Q38 58 54 64L62 52L66 62L80 60Q74 66 72 70L84 74Q70 78 64 76Q56 92 40 88Q34 84 28 76Z" fill="#1b1638" opacity=".85" />
    <path d="M54 64Q48 48 36 44Q46 54 48 66M64 76Q70 90 62 100Q60 88 56 82" fill="#1b1638" opacity=".75" />
    <rect y="128" width="120" height="32" fill="#4a3226" /><rect y="128" width="120" height="2.5" fill="#6b4a36" /><path d="M0 140h120M0 150h120" stroke="#3a261c" strokeWidth=".6" />
    <g><path d="M0 64L10 60L12 66L2 72Z" fill="#c9a84a" /><path d="M2 72L8 128H4L0 76Z" fill="#8a6d2a" /><ellipse cx="6" cy="128" rx="9" ry="2.5" fill="#8a6d2a" /><circle cx="10" cy="64" r="2.6" fill="#fff6d0" /></g>
    <path d="M22 160Q20 140 30 130Q38 124 46 128L52 120Q56 116 60 120L58 128Q66 126 70 132Q72 140 64 142L56 140Q50 150 48 160Z" fill="url(#k145h)" />
    <path d="M46 128Q50 132 56 130M40 134q6 2 12-1M30 140q8 2 14-2" stroke="#b97a50" strokeWidth=".8" fill="none" />
    <path d="M52 120l-2-10q0-3 3-3t3 3l0 9" fill="url(#k145h)" stroke="#b97a50" strokeWidth=".5" /><path d="M60 120l4-8q2-2 4 0t0 4l-6 8" fill="url(#k145h)" stroke="#b97a50" strokeWidth=".5" />
    <g transform="translate(96 36)"><path d="M0 0Q-10-14-24-14Q-14-8-12 0Z" fill="url(#k145b)" /><path d="M0 0Q8-16 22-20Q14-8 10 2Z" fill="#ffc53d" /><ellipse cx="0" cy="2" rx="9" ry="5" fill="url(#k145b)" /><circle cx="8" cy="-1" r="4" fill="#ffd86b" /><polygon points="12,-1 17,0 12,1.4" fill="#e76f51" /><circle cx="9" cy="-2" r=".9" fill="#2b2550" /><path d="M-9 3l-8 3 7 1z" fill="#f08a24" /></g>
    <g fill="#ffe3a0">{[[80, 54, 1], [86, 48, .7], [74, 60, .6], [92, 56, .5]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <path d="M78 56Q84 48 88 42" stroke="#ffd86b" strokeWidth=".6" strokeDasharray="1.5 2" fill="none" />
  </Svg>],

  [197, 'แก้วสองใบ ใบหนึ่งล้ม', <Svg>
    <defs>
      <linearGradient id="k197b" x2="0" y2="1"><stop stopColor="#f6e3c8" /><stop offset="1" stopColor="#e3b98f" /></linearGradient>
      <linearGradient id="k197t" x2="0" y2="1"><stop stopColor="#8a5a3b" /><stop offset="1" stopColor="#5e3a24" /></linearGradient>
      <linearGradient id="k197g" x2="1" y2="0"><stop stopColor="#fff" stopOpacity=".55" /><stop offset=".3" stopColor="#fff" stopOpacity=".15" /><stop offset=".8" stopColor="#fff" stopOpacity=".05" /><stop offset="1" stopColor="#fff" stopOpacity=".45" /></linearGradient>
      <linearGradient id="k197r" x2="0" y2="1"><stop stopColor="#c0263c" /><stop offset="1" stopColor="#7a1022" /></linearGradient>
      <radialGradient id="k197s" cx=".8" cy=".2"><stop stopColor="#fff4dc" stopOpacity=".9" /><stop offset="1" stopColor="#fff4dc" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k197b)" />
    <rect x="70" y="8" width="44" height="58" fill="#cfe6f2" /><path d="M92 8V66M70 37H114" stroke="#a37552" strokeWidth="2.5" /><rect x="68" y="6" width="48" height="62" fill="none" stroke="#a37552" strokeWidth="3" />
    <circle cx="100" cy="24" r="40" fill="url(#k197s)" />
    <g opacity=".35" fill="#7d5a42"><rect x="8" y="40" width="10" height="56" rx="4" /><rect x="4" y="60" width="26" height="6" rx="2" /><rect x="38" y="52" width="8" height="44" rx="3" /></g>
    <path d="M0 96H120V160H0Z" fill="url(#k197t)" /><path d="M0 96H120" stroke="#a87554" strokeWidth="1.5" />
    <g stroke="#4e2f1d" strokeWidth=".6" fill="none" opacity=".7"><path d="M0 108Q40 104 80 110T120 106" /><path d="M0 124Q30 120 70 126T120 122" /><path d="M0 142Q50 138 90 144T120 140" /></g>
    <ellipse cx="34" cy="132" rx="14" ry="3" fill="#3a2214" opacity=".45" />
    <path d="M24 80H44L42 130H26Z" fill="url(#k197g)" stroke="#fff" strokeWidth=".8" strokeOpacity=".7" />
    <path d="M25 102H43L42 130H26Z" fill="url(#k197r)" opacity=".9" /><ellipse cx="34" cy="102" rx="9" ry="1.6" fill="#e04a5f" />
    <path d="M27 84L28 126" stroke="#fff" strokeWidth="1.4" opacity=".7" strokeLinecap="round" /><path d="M24 80h20" stroke="#fff" strokeWidth="1" opacity=".8" />
    <path d="M38 80q2-1 3 1" stroke="#c0263c" strokeWidth="1.4" fill="none" opacity=".6" />
    <g transform="rotate(84 76 120)"><path d="M66 100H86L84 140H68Z" fill="url(#k197g)" stroke="#fff" strokeWidth=".8" strokeOpacity=".7" /><path d="M69 104L70 136" stroke="#fff" strokeWidth="1.4" opacity=".7" /></g>
    <path d="M96 118Q110 116 118 126Q122 138 108 140Q90 142 82 134Q78 126 90 122Z" fill="url(#k197r)" opacity=".85" />
    <path d="M118 126Q122 132 120 138" stroke="#7a1022" strokeWidth="1.5" fill="none" /><path d="M119 140q1 6 0 10" stroke="#7a1022" strokeWidth="1.2" strokeLinecap="round" /><circle cx="119" cy="154" r="1.4" fill="#7a1022" />
    <path d="M92 126q8-2 16 2" stroke="#ff8a9c" strokeWidth=".8" fill="none" opacity=".7" />
    <g fill="#f3e6d0"><circle cx="58" cy="122" r="1.2" /><path d="M56 128l3 1-1 2z" /></g>
  </Svg>],

  [121, 'ปลาสองตัววนเป็นวงกลม', <Svg>
    <defs>
      <radialGradient id="k121p" cx=".5" cy=".5"><stop stopColor="#2a6f8f" /><stop offset=".75" stopColor="#163e5c" /><stop offset="1" stopColor="#0c2338" /></radialGradient>
      <linearGradient id="k121o" x2="1" y2="1"><stop stopColor="#ffb45a" /><stop offset="1" stopColor="#e2541f" /></linearGradient>
      <linearGradient id="k121w" x2="1" y2="1"><stop stopColor="#ffffff" /><stop offset="1" stopColor="#dfe6ee" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="#1f3a2a" />
    <g fill="#2e5a3a">{[[6, 10, 14], [110, 18, 16], [10, 150, 18], [112, 146, 14], [60, 2, 10], [60, 158, 10]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <circle cx="60" cy="80" r="54" fill="#6b5a46" /><circle cx="60" cy="80" r="50" fill="url(#k121p)" />
    <g fill="none" stroke="#5fa8c8" strokeWidth=".6" opacity=".45"><circle cx="60" cy="80" r="40" /><circle cx="60" cy="80" r="30" /><circle cx="60" cy="80" r="20" /></g>
    <g transform="rotate(-30 60 80)">
      <path d="M60 46Q86 50 90 76Q90 92 76 98Q86 84 78 70Q70 58 56 58Q48 58 42 62Q46 48 60 46Z" fill="url(#k121o)" />
      <path d="M42 62Q34 58 30 50Q38 52 44 58Q40 50 42 42Q46 52 46 60Z" fill="#ff9e4a" opacity=".85" />
      <path d="M82 60q8-2 12 4q-8 0-12-4zM68 50q4-8 10-8q-4 6-10 8z" fill="#ffcb8a" opacity=".8" />
      <g fill="#fff4e6" opacity=".8"><ellipse cx="70" cy="56" rx="5" ry="2.5" /><ellipse cx="82" cy="72" rx="3" ry="2" /></g>
      <circle cx="84" cy="82" r="2.4" fill="#1b1b1b" /><circle cx="84.8" cy="81.2" r=".7" fill="#fff" />
      <path d="M60 114Q34 110 30 84Q30 68 44 62Q34 76 42 90Q50 102 64 102Q72 102 78 98Q74 112 60 114Z" fill="url(#k121w)" />
      <path d="M78 98Q86 102 90 110Q82 108 76 102Q80 110 78 118Q74 108 74 100Z" fill="#f0f3f6" opacity=".85" />
      <g fill="#1b1b1b" opacity=".8"><ellipse cx="46" cy="96" rx="4" ry="2.5" /><ellipse cx="56" cy="104" rx="3" ry="2" /><ellipse cx="38" cy="84" rx="2" ry="1.5" /></g>
      <g fill="#e2541f" opacity=".9"><ellipse cx="50" cy="104" rx="3" ry="1.8" /></g>
      <circle cx="36" cy="78" r="2.4" fill="#1b1b1b" /><circle cx="35.2" cy="78.8" r=".7" fill="#fff" />
    </g>
    <g><ellipse cx="22" cy="54" rx="10" ry="8" fill="#3f8f5a" /><path d="M22 54L30 50" stroke="#1f3a2a" strokeWidth="1.2" /><ellipse cx="96" cy="112" rx="11" ry="8" fill="#4ea36a" /><path d="M96 112L86 116" stroke="#1f3a2a" strokeWidth="1.2" /></g>
    <g fill="#ffc8dd"><path d="M98 104q-4-8 0-12q4 4 0 12z" /><path d="M98 104q-8-2-10-8q6 0 10 8z" /><path d="M98 104q8-2 10-8q-6 0-10 8z" /></g>
    <g fill="#ffd6e6" opacity=".9"><ellipse cx="40" cy="120" rx="2" ry="1" transform="rotate(30 40 120)" /><ellipse cx="78" cy="40" rx="2" ry="1" /></g>
  </Svg>],

  [37, 'ด้ายแดงที่ผูกไว้', <Svg>
    <defs>
      <linearGradient id="k37s" x2="0" y2="1"><stop stopColor="#fde2e4" /><stop offset=".6" stopColor="#fbd0c4" /><stop offset="1" stopColor="#f7b8a8" /></linearGradient>
      <linearGradient id="k37h" x2="1" y2="1"><stop stopColor="#f6cfae" /><stop offset="1" stopColor="#d99a72" /></linearGradient>
      <linearGradient id="k37k" x2="1" y2="1"><stop stopColor="#c98f68" /><stop offset="1" stopColor="#9a6446" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k37s)" />
    <circle cx="88" cy="96" r="14" fill="#fff1d6" opacity=".8" />
    <path d="M0 108L14 92L24 100L40 80L54 98L66 90L80 104L96 86L120 102V160H0Z" fill="#e8a3a3" opacity=".7" />
    <path d="M0 120L20 110L34 116L52 104L70 118L88 108L106 116L120 110V160H0Z" fill="#cf8a95" opacity=".8" />
    <g fill="#9c6170"><rect x="44" y="104" width="4" height="10" /><rect x="49" y="100" width="5" height="14" /><rect x="55" y="106" width="3" height="8" /><rect x="60" y="102" width="4" height="12" /></g>
    <path d="M0 128Q60 122 120 130V160H0Z" fill="#9ec5d9" /><path d="M8 136q6-2 12 0M60 140q6-2 12 0M94 134q6-2 12 0" stroke="#e7f3fa" fill="none" />
    <path d="M78 136l8 0-2 3h-5z" fill="#6b4a3a" /><path d="M82 136v-6l4 5" fill="#fff" stroke="#6b4a3a" strokeWidth=".5" />
    <path d="M14 150q20-6 30-24t24-30q14-20 30-32q6-4 10-14" stroke="#d62839" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    <path d="M44 126q4 4-1 6q-5 1-2-4" stroke="#d62839" strokeWidth="1" fill="none" />
    <g transform="translate(-6 128) rotate(-20)"><path d="M0 10Q-2 0 8 -2H26Q32 -2 32 4V18Q32 24 26 24H6Q0 24 0 18Z" fill="url(#k37h)" /><path d="M26 0Q30-2 32 0V4H26Z" fill="url(#k37h)" /><path d="M24 -2Q28-12 34-14Q38-14 38-10Q36-4 30 0" fill="url(#k37h)" stroke="#b97a50" strokeWidth=".5" /><path d="M8 4v16M14 4v16M20 4v16" stroke="#b97a50" strokeWidth=".5" opacity=".7" /></g>
    <circle cx="23" cy="114" r="2" fill="none" stroke="#d62839" strokeWidth="1.3" />
    <g transform="translate(126 30) rotate(160)"><path d="M0 10Q-2 0 8 -2H26Q32 -2 32 4V18Q32 24 26 24H6Q0 24 0 18Z" fill="url(#k37k)" /><path d="M24 -2Q28-12 34-14Q38-14 38-10Q36-4 30 0" fill="url(#k37k)" stroke="#7d4f36" strokeWidth=".5" /><path d="M8 4v16M14 4v16M20 4v16" stroke="#7d4f36" strokeWidth=".5" opacity=".7" /></g>
    <circle cx="108" cy="46" r="2" fill="none" stroke="#d62839" strokeWidth="1.3" />
    <g fill="#fff" opacity=".7"><path d="M30 30l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" /><path d="M60 16l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" /></g>
  </Svg>],

  [50, 'ยักษ์หลับกับรถไฟ', <Svg>
    <defs>
      <linearGradient id="k50s" x2="0" y2="1"><stop stopColor="#ffd9a8" /><stop offset=".5" stopColor="#ffe9c9" /><stop offset="1" stopColor="#d5ecd4" /></linearGradient>
      <linearGradient id="k50m" x2="0" y2="1"><stop stopColor="#7fb069" /><stop offset="1" stopColor="#4a7c3a" /></linearGradient>
      <linearGradient id="k50f" x2="0" y2="1"><stop stopColor="#a7c957" /><stop offset="1" stopColor="#6a994e" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k50s)" />
    <circle cx="94" cy="30" r="12" fill="#fff6d6" />
    <g fill="#fff" opacity=".85"><ellipse cx="24" cy="28" rx="16" ry="5" /><ellipse cx="32" cy="24" rx="8" ry="5" /><ellipse cx="70" cy="44" rx="12" ry="3.5" /></g>
    <path d="M0 132V96Q6 84 14 82Q18 70 30 68Q34 60 42 62Q44 52 52 52Q60 50 62 58Q68 56 70 62Q74 64 72 70Q82 70 86 76Q100 76 108 88Q116 94 120 104V132Z" fill="url(#k50m)" />
    <path d="M30 68Q34 64 40 66M52 52Q56 50 60 54" stroke="#3f6b30" strokeWidth="1" fill="none" />
    <path d="M30 76q6 4 12 0" stroke="#2e4f24" strokeWidth="1.6" fill="none" strokeLinecap="round" /><path d="M31 77l-1 2M34 79l-.5 2M37 79l.5 2M40 78l1 2" stroke="#2e4f24" strokeWidth=".7" />
    <path d="M26 70q6-4 14-2" stroke="#2e4f24" strokeWidth="1.2" fill="none" />
    <path d="M66 70q4 2 6 0" stroke="#2e4f24" strokeWidth="1" fill="none" />
    <g fill="#355e2b">{[[12, 84], [18, 80], [22, 86], [96, 82], [104, 88], [110, 94], [100, 92], [16, 92], [90, 86]].map(([x, y], i) => <path key={i} d={`M${x} ${y}l3-7 3 7z`} />)}</g>
    <g fill="#355e2b" opacity=".8">{[[78, 78], [84, 80], [80, 84], [74, 84], [86, 86]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" />)}</g>
    <path d="M58 132V114Q58 104 66 104Q74 104 74 114V132Z" fill="#1e2b18" /><path d="M58 114Q58 104 66 104Q74 104 74 114" stroke="#8a8a72" strokeWidth="2" fill="none" />
    <path d="M60 100q6-3 12 0" stroke="#2e4f24" strokeWidth="1.2" fill="none" />
    <path d="M0 132H120V160H0Z" fill="url(#k50f)" />
    <rect y="132" width="120" height="6" fill="#b08968" /><g stroke="#6b4f3a" strokeWidth="1">{Array.from({ length: 15 }, (_, i) => <line key={i} x1={i * 8 + 2} y1="132" x2={i * 8 + 2} y2="138" />)}</g><path d="M0 133h120M0 137h120" stroke="#5a5a5a" strokeWidth=".8" />
    <g><rect x="40" y="118" width="18" height="12" rx="2" fill="#bc4749" /><rect x="40" y="116" width="18" height="3" fill="#8f2d2f" /><rect x="52" y="108" width="4" height="9" fill="#333" /><rect x="42" y="120" width="5" height="4" fill="#ffe9a8" />
      <rect x="20" y="120" width="18" height="10" rx="2" fill="#f2e8cf" /><rect x="22" y="122" width="4" height="4" fill="#8ecae6" /><rect x="29" y="122" width="4" height="4" fill="#8ecae6" />
      <rect x="0" y="120" width="18" height="10" rx="2" fill="#a7c957" /><rect x="4" y="122" width="4" height="4" fill="#8ecae6" /><rect x="11" y="122" width="4" height="4" fill="#8ecae6" />
      <g fill="#333">{[4, 14, 24, 34, 44, 54].map(x => <circle key={x} cx={x} cy="131" r="2.4" />)}</g></g>
    <g fill="#fff"><circle cx="55" cy="102" r="3.5" opacity=".9" /><circle cx="50" cy="94" r="5" opacity=".7" /><circle cx="42" cy="86" r="6.5" opacity=".5" /><circle cx="32" cy="80" r="7" opacity=".3" /></g>
    <g fill="#e76f51"><rect x="96" y="120" width="10" height="8" /><polygon points="94,121 101,115 108,121" fill="#9c6644" /></g><rect x="99" y="123" width="3" height="3" fill="#ffd166" />
  </Svg>],

  [62, 'หมาป่าหอนใส่คุกกี้', <Svg>
    <defs>
      <linearGradient id="k62s" x2="0" y2="1"><stop stopColor="#0b1026" /><stop offset=".6" stopColor="#1d2b53" /><stop offset="1" stopColor="#3b3f6e" /></linearGradient>
      <radialGradient id="k62g"><stop stopColor="#f3c27a" stopOpacity=".55" /><stop offset="1" stopColor="#f3c27a" stopOpacity="0" /></radialGradient>
      <radialGradient id="k62c" cx=".4" cy=".35"><stop stopColor="#f1c98a" /><stop offset=".8" stopColor="#d9a35a" /><stop offset="1" stopColor="#b97f3a" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k62s)" />
    <St p={[8, 10, .6, 20, 30, .8, 38, 8, .5, 106, 70, .6, 112, 12, .7, 10, 60, .5, 30, 72, .4, 100, 90, .5, 50, 70, .4]} />
    <circle cx="70" cy="44" r="44" fill="url(#k62g)" />
    <path d="M70 18a26 26 0 1 0 25 34q-6 0-7-6q-6-1-6-7q-6-1-5-8q-5-2-4-8q-2-4 2-5Z" fill="url(#k62c)" />
    <g fill="#5a3418">{[[58, 32, 3.2], [72, 54, 3.6], [56, 58, 2.6], [80, 62, 2.2], [64, 44, 2], [50, 46, 2.4], [70, 28, 1.6]].map(([x, y, r], i) => <path key={i} d={`M${x - r} ${y}q${r} ${-r * 1.2} ${r * 2} 0q-${r * .4} ${r} -${r * 2} 0z`} />)}</g>
    <g fill="#c48a45" opacity=".6"><circle cx="62" cy="40" r=".8" /><circle cx="76" cy="40" r=".8" /><circle cx="66" cy="62" r=".8" /></g>
    <g fill="#e2b06a">{[[90, 40, 1.4], [94, 48, 1], [98, 58, .8], [96, 66, 1.2], [102, 74, .7]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <path d="M0 160V122L18 112L36 120L54 106L72 118L94 104L120 114V160Z" fill="#141a33" />
    <g fill="#0c1124">{[[8, 128, 1.4], [24, 124, 1.1], [100, 118, 1.5], [114, 124, 1.2], [86, 122, 1]].map(([x, y, s], i) => <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d="M0-22L7-8H4L9 2H-9L-4-8H-7Z" />)}</g>
    <path d="M26 122L60 104L70 112L80 122Z" fill="#0c1124" />
    <g fill="#070a18"><path d="M40 114Q38 100 42 94L38 84Q36 78 40 76L44 80L48 72L50 82Q56 86 56 96Q62 100 62 114Z" /><path d="M38 84L30 76Q28 72 32 72L40 78" /><path d="M56 104Q66 106 70 112Q64 112 58 110" /></g>
    <path d="M42 94Q48 92 52 96" stroke="#3b3f6e" strokeWidth=".6" fill="none" />
    <path d="M30 70q-4-6 0-10M26 72q-8-6-4-14" stroke="#9fb3e6" strokeWidth=".6" fill="none" opacity=".6" />
  </Svg>],
];
