// ภาพการ์ดแบบละเอียด ชุด 18 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD18 = [
  [124, 'เล่าเรื่องผีรอบกองไฟ', <Svg>
    <defs>
      <linearGradient id="c124s" x2="0" y2="1"><stop stopColor="#05050a" /><stop offset="1" stopColor="#1b1410" /></linearGradient>
      <radialGradient id="c124g" cx=".5" cy=".75"><stop stopColor="#f48c06" stopOpacity=".6" /><stop offset=".5" stopColor="#dc2f02" stopOpacity=".15" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
      <linearGradient id="c124f" x2="0" y2="1"><stop stopColor="#fff3b0" /><stop offset=".4" stopColor="#ffb703" /><stop offset="1" stopColor="#dc2f02" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#c124s)" />
    <St p={[8, 8, .6, 34, 18, .5, 60, 6, .6, 100, 14, .5]} />
    <g fill="#0b0b0f"><path d="M84 0V100M80 30L102 8M84 54L66 40M84 70L100 60" stroke="#0b0b0f" strokeWidth="6" /><circle cx="104" cy="6" r="14" /><circle cx="64" cy="36" r="10" /></g>
    <path d="M76 22Q94 -2 112 18Q124 42 108 62L114 74L100 68L96 84L90 68L78 74L84 58Q68 40 76 22Z" fill="#000" />
    <g fill="#e5383b"><ellipse cx="94" cy="34" rx="3.4" ry="2" /><ellipse cx="104" cy="36" rx="2.6" ry="1.6" /></g><g fill="#ff8fa3"><circle cx="94" cy="34" r=".8" /><circle cx="104" cy="36" r=".6" /></g>
    <path d="M92 44q6 4 12 0" stroke="#e5383b" strokeWidth=".6" fill="none" opacity=".6" />
    <rect width="120" height="160" fill="url(#c124g)" />
    <rect y="128" width="120" height="32" fill="#130f0a" /><ellipse cx="60" cy="130" rx="36" ry="5" fill="#f48c06" opacity=".2" />
    <g fill="#5c4033"><ellipse cx="46" cy="128" rx="5" ry="2.4" /><ellipse cx="74" cy="128" rx="5" ry="2.4" /></g>
    <path d="M46 130l28-8M46 122l28 8" stroke="#6b4226" strokeWidth="3.4" strokeLinecap="round" /><path d="M46 130l28-8M46 122l28 8" stroke="#3a2416" strokeWidth=".8" />
    <path d="M60 92q-14 16-4 32h8q10-16-4-32z" fill="url(#c124f)" /><path d="M50 106q-6 10 0 18M70 106q6 10 0 18" fill="#f48c06" /><path d="M60 106q-5 8 0 16q5-8 0-16z" fill="#fff3b0" />
    <g fill="#ffb703">{[[56, 84], [64, 78], [58, 70], [66, 64]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1 - i * .15} />)}</g>
    <g fill="#2b1d12"><circle cx="22" cy="104" r="7.4" /><path d="M10 130q0-18 12-18t12 18z" /><circle cx="98" cy="106" r="6.4" /><path d="M88 130q0-16 10-16t10 16z" /></g>
    <path d="M28 102q2 4 0 8M92 104q-2 4 0 8" stroke="#f48c06" strokeWidth="1" fill="none" opacity=".6" />
    <path d="M34 116l8-6M86 118l-8-4" stroke="#2b1d12" strokeWidth="3" strokeLinecap="round" />
  </Svg>],

  [125, 'บ้านที่หน้าต่างเป็นตา', <Svg>
    <defs>
      <linearGradient id="c125s" x2="0" y2="1"><stop stopColor="#0d0d1a" /><stop offset="1" stopColor="#1a1a2e" /></linearGradient>
      <radialGradient id="c125m" cx=".35" cy=".35"><stop stopColor="#fffbe6" /><stop offset="1" stopColor="#e6d08a" /></radialGradient>
      <linearGradient id="c125h" x2="1" y2="0"><stop stopColor="#2a2a44" /><stop offset=".5" stopColor="#40406a" /><stop offset="1" stopColor="#22223b" /></linearGradient>
      <radialGradient id="c125e"><stop stopColor="#fff3b0" /><stop offset=".6" stopColor="#ffd166" /><stop offset="1" stopColor="#f48c06" /></radialGradient>
      <radialGradient id="c125g"><stop stopColor="#ffd166" stopOpacity=".4" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#c125s)" />
    <St p={[10, 10, .6, 34, 24, .5, 90, 14, .7, 108, 36, .5, 60, 8, .4]} />
    <circle cx="22" cy="38" r="9" fill="url(#c125m)" />
    <g stroke="#0d0d1a" strokeWidth="2" fill="none"><path d="M100 140V70L92 56M100 90L110 76M100 100L90 92" /></g>
    <rect y="138" width="120" height="22" fill="#0f0f1a" /><g fill="#1a2a1a">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 10 + 3} 140l2-6 2 6z`} />)}</g>
    <rect x="24" y="70" width="72" height="70" fill="url(#c125h)" /><g stroke="#1a1a2e" strokeWidth=".7">{[80, 90, 100, 110, 120, 130].map(y => <path key={y} d={`M24 ${y}h72`} />)}</g>
    <polygon points="18,72 60,32 102,72" fill="#22223b" /><path d="M18 72L60 32L102 72" stroke="#4a4e69" strokeWidth="1.2" fill="none" /><rect x="78" y="40" width="8" height="18" fill="#22223b" />
    <circle cx="60" cy="92" r="40" fill="url(#c125g)" />
    <path d="M32 92Q44 80 56 92Q44 102 32 92Z" fill="url(#c125e)" /><path d="M64 92Q76 80 88 92Q76 102 64 92Z" fill="url(#c125e)" />
    <ellipse cx="45" cy="93" rx="2.4" ry="5" fill="#1a1a2e" /><ellipse cx="77" cy="93" rx="2.4" ry="5" fill="#1a1a2e" />
    <path d="M30 84q14-8 28-2M62 82q14-6 28 2" stroke="#1a1a2e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <path d="M48 140v-20q12-10 24 0v20" fill="#0d0d1a" /><path d="M50 120l4 5 4-5 4 5 4-5 4 5" stroke="#ffd166" strokeWidth="1.2" fill="none" />
    <g fill="#ffd166" opacity=".8"><circle cx="66" cy="132" r="1" /></g>
    <g fill="#0d0d1a"><path d="M94 30l-4-2 4-1 2-4 2 4 4 1-4 2-2 4z" opacity="0" /></g>
  </Svg>],

  [127, 'หมวกนักมายากล', <Svg>
    <defs>
      <radialGradient id="c127s" cx=".5" cy=".6"><stop stopColor="#ff006e" /><stop offset=".6" stopColor="#8338ec" /><stop offset="1" stopColor="#3a0ca3" /></radialGradient>
      <linearGradient id="c127h" x2="1" y2="0"><stop stopColor="#0b0b0b" /><stop offset=".45" stopColor="#3a3a3a" /><stop offset="1" stopColor="#000" /></linearGradient>
      <linearGradient id="c127l" x2="1" y2="0"><stop stopColor="#c99700" /><stop offset=".5" stopColor="#ffd60a" /><stop offset="1" stopColor="#a87c00" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#c127s)" />
    <g fill="#ffbe0b">{[[10, 10], [30, 40], [100, 20], [110, 70], [20, 90], [90, 100], [16, 130], [104, 140]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 3}l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z`} />)}</g>
    <path d="M0 160L40 120H80L120 160Z" fill="#3a0ca3" opacity=".5" />
    <ellipse cx="60" cy="134" rx="42" ry="9" fill="#000" opacity=".4" />
    <ellipse cx="60" cy="132" rx="40" ry="8.6" fill="url(#c127h)" />
    <path d="M36 132V94H84V132Z" fill="url(#c127h)" /><rect x="36" y="116" width="48" height="8" fill="#ff006e" /><path d="M36 117h48" stroke="#ff8fc7" strokeWidth=".6" />
    <ellipse cx="60" cy="94" rx="24" ry="5" fill="#000" /><ellipse cx="60" cy="94" rx="22" ry="4" fill="#1a1a1a" />
    <g transform="rotate(-10 50 80)"><ellipse cx="50" cy="78" rx="4.4" ry="15" fill="#fff" /><ellipse cx="50" cy="80" rx="2.2" ry="10" fill="#ffafcc" /></g>
    <g stroke="url(#c127l)" strokeWidth="2.2"><line x1="68" y1="94" x2="76" y2="6" /><line x1="76" y1="94" x2="84" y2="6" /></g>
    <g stroke="url(#c127l)" strokeWidth="2">{[0, 1, 2, 3, 4, 5, 6, 7].map(i => <line key={i} x1={69 + i * .9} y1={84 - i * 10} x2={77 + i * .9} y2={84 - i * 10} />)}</g>
    <g fill="#fff" opacity=".85">{[[80, 4], [74, 2], [86, 8]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
    <path d="M90 128l14-24" stroke="#000" strokeWidth="2.4" strokeLinecap="round" /><path d="M102 106l3-4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
  </Svg>],

  [128, 'วิทยุเก่าที่โน้ตกลายเป็นนก', <Svg>
    <defs>
      <linearGradient id="c128s" x2="0" y2="1"><stop stopColor="#fefae0" /><stop offset="1" stopColor="#ccd5ae" /></linearGradient>
      <linearGradient id="c128r" x2="1" y2="1"><stop stopColor="#dda15e" /><stop offset="1" stopColor="#8a4a14" /></linearGradient>
      <radialGradient id="c128k" cx=".4" cy=".4"><stop stopColor="#f2d0a9" /><stop offset="1" stopColor="#b5793a" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#c128s)" />
    <rect x="8" y="10" width="40" height="50" fill="#e9edc9" stroke="#d4a373" strokeWidth="2" /><path d="M28 10v50M8 35h40" stroke="#d4a373" strokeWidth="1.4" />
    <rect y="118" width="120" height="42" fill="#a98467" /><path d="M0 118h120" stroke="#c9a280" strokeWidth="1.5" /><g stroke="#8a6448" strokeWidth=".6">{[0, 1, 2, 3].map(i => <path key={i} d={`M${i * 34} 118l-4 42`} />)}</g>
    <ellipse cx="50" cy="120" rx="34" ry="3" fill="#6b4a32" opacity=".4" />
    <rect x="18" y="76" width="64" height="44" rx="9" fill="url(#c128r)" /><path d="M22 80h56" stroke="#f2d0a9" strokeWidth="1" opacity=".6" />
    <circle cx="38" cy="98" r="13" fill="url(#c128k)" /><g stroke="#8a4a14" strokeWidth=".9">{[-8, -4, 0, 4, 8].map(d => <path key={d} d={`M${28} ${98 + d}h20`} />)}</g><circle cx="38" cy="98" r="13" fill="none" stroke="#5a2a08" strokeWidth="1.2" />
    <rect x="56" y="86" width="20" height="9" rx="2" fill="#fefae0" /><g stroke="#8a4a14" strokeWidth=".5">{[58, 61, 64, 67, 70, 73].map(x => <path key={x} d={`M${x} 86v3`} />)}</g><path d="M65 86v9" stroke="#e63946" strokeWidth=".8" />
    <circle cx="61" cy="108" r="3.4" fill="#5a2a08" /><circle cx="71" cy="108" r="3.4" fill="#5a2a08" /><path d="M61 105v3M71 105l1 3" stroke="#f2d0a9" strokeWidth=".7" />
    <rect x="24" y="120" width="5" height="4" fill="#5a2a08" /><rect x="72" y="120" width="5" height="4" fill="#5a2a08" />
    <path d="M64 76L82 54" stroke="#5a2a08" strokeWidth="1.2" /><circle cx="82" cy="54" r="1.4" fill="#5a2a08" />
    <g fill="#283618"><path d="M84 72v-10l6-2v10" stroke="#283618" fill="none" strokeWidth="1.3" /><ellipse cx="83" cy="72" rx="2.6" ry="2" /><ellipse cx="89" cy="70" rx="2.6" ry="2" /></g>
    <g fill="#283618"><path d="M94 58v-10" stroke="#283618" strokeWidth="1.3" /><ellipse cx="93" cy="58" rx="2.6" ry="2" /><path d="M94 48q4 2 4 6" stroke="#283618" strokeWidth="1.3" fill="none" /></g>
    {[[100, 40, .8], [92, 26, 1.1], [106, 14, 1.4], [114, 30, .7]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><path d="M-7 0Q-3-6 0 0Q3-6 7 0" fill="none" stroke="#283618" strokeWidth="1.6" strokeLinecap="round" /><circle cy=".4" r=".9" fill="#283618" /></g>)}
  </Svg>],

  [129, 'บัวรดน้ำเทดาวลงหมู่บ้าน', <Svg>
    <defs>
      <linearGradient id="c129s" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset="1" stopColor="#1c2541" /></linearGradient>
      <linearGradient id="c129w" x2="1" y2="1"><stop stopColor="#80ffdb" /><stop offset="1" stopColor="#3a8a8a" /></linearGradient>
      <radialGradient id="c129g"><stop stopColor="#ffd60a" stopOpacity=".45" /><stop offset="1" stopColor="#ffd60a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#c129s)" />
    <St p={[8, 50, .5, 20, 80, .4, 110, 60, .5, 100, 90, .4]} />
    <g transform="rotate(30 50 30)"><path d="M28 18H64V46H28Z" fill="url(#c129w)" /><path d="M28 18H64" stroke="#caffea" strokeWidth="1" /><path d="M64 24L86 14L89 19L64 34" fill="url(#c129w)" /><ellipse cx="88" cy="16.4" rx="2.6" ry="4" fill="#3a8a8a" /><path d="M34 18q12-16 24 0" stroke="#3a8a8a" strokeWidth="3.4" fill="none" /><path d="M32 30h28" stroke="#3a8a8a" strokeWidth=".8" /></g>
    <circle cx="80" cy="84" r="34" fill="url(#c129g)" />
    {[[78, 52, 1.2], [72, 64, 1], [84, 70, 1.4], [66, 80, .9], [80, 88, 1.2], [88, 96, 1], [70, 98, 1.1], [76, 108, .9], [90, 112, .8], [62, 104, .7]].map(([x, y, r], i) => <path key={i} d={`M${x} ${y - r * 3}l${r * .8} ${r * 2.2} ${r * 2.2} ${r * .8}-${r * 2.2} ${r * .8}-${r * .8} ${r * 2.2}-${r * .8}-${r * 2.2}-${r * 2.2}-${r * .8} ${r * 2.2}-${r * .8}z`} fill="#ffd60a" />)}
    <path d="M0 160V128L14 118L28 128V122H40V160ZM40 160V132L56 120L72 132V160ZM72 160V124L88 112L104 124V160ZM104 160V130L120 122V160Z" fill="#06070e" />
    <g fill="#ffd166">{[[12, 134], [20, 142], [52, 138], [62, 146], [84, 128], [92, 138], [110, 140]].map(([x, y], i) => <rect key={i} x={x} y={y} width="4" height="5" />)}</g>
    <g fill="#ffd60a">{[[56, 118], [88, 108], [100, 122]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" />)}</g>
    <path d="M92 116v-6M96 116v-4" stroke="#06070e" strokeWidth="2" />
  </Svg>],

  [130, 'สัตว์ประหลาดถุงเท้า', <Svg>
    <defs>
      <linearGradient id="c130s" x2="0" y2="1"><stop stopColor="#e0e1dd" /><stop offset="1" stopColor="#c9cdc4" /></linearGradient>
      <radialGradient id="c130p" cx=".4" cy=".3"><stop stopColor="#fff" /><stop offset="1" stopColor="#d6dbe0" /></radialGradient>
      <linearGradient id="c130b" x2="0" y2="1"><stop stopColor="#8d99ae" /><stop offset="1" stopColor="#5c677d" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#c130s)" />
    <g stroke="#d0d4cc" strokeWidth=".8">{[24, 48, 72, 96].map(x => <path key={x} d={`M${x} 0V130`} />)}</g>
    <rect x="80" y="12" width="32" height="32" rx="16" fill="#adb5bd" /><circle cx="96" cy="28" r="12" fill="#e9ecef" /><circle cx="96" cy="28" r="8" fill="url(#c130b)" />
    <rect y="130" width="120" height="30" fill="url(#c130b)" /><path d="M0 130h120" stroke="#adb5bd" strokeWidth="1.2" />
    <path d="M8 134Q6 88 30 78Q40 48 64 54Q92 50 98 82Q116 94 112 134Z" fill="url(#c130p)" />
    {[[20, 116, -30, '#e63946'], [30, 88, 20, '#457b9d'], [70, 64, -10, '#ffd166'], [80, 104, 40, '#2a9d8f'], [50, 66, 60, '#9d4edd'], [98, 92, -50, '#f4a261']].map(([x, y, r, c], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M-3-9h6v10q0 2 2 2h4q3 0 3 3t-3 3h-8q-4 0-4-4z" fill={c} /><rect x="-3.4" y="-11" width="6.8" height="3" rx="1" fill="#fff" opacity=".85" /><path d="M-3-4h6" stroke="#fff" strokeWidth=".8" opacity=".6" /><path d="M8 3q2 0 3 3" stroke="#fff" strokeWidth=".6" fill="none" opacity=".6" /></g>)}
    <circle cx="50" cy="104" r="6" fill="#fff" stroke="#343a40" /><circle cx="68" cy="102" r="6" fill="#fff" stroke="#343a40" /><circle cx="51" cy="105" r="2.6" fill="#222" /><circle cx="69" cy="103" r="2.6" fill="#222" /><circle cx="52" cy="104" r=".8" fill="#fff" /><circle cx="70" cy="102" r=".8" fill="#fff" />
    <path d="M48 116q10 8 20 0" stroke="#343a40" strokeWidth="1.2" fill="none" /><path d="M52 118l2 3 2-2M62 119l2 2 2-3" stroke="#343a40" fill="#fff" strokeWidth=".8" />
    <path d="M40 58l-10-20h10l-2-8" stroke="#e76f51" strokeWidth="5" fill="none" strokeLinecap="round" /><path d="M42 56l-10-18" stroke="#fff" strokeWidth=".8" opacity=".6" />
    <g fill="#adb5bd"><path d="M10 138q4-2 8 0M96 140q6-2 10 2" stroke="#adb5bd" fill="none" /></g>
  </Svg>],

  [131, 'หมีขั้วโลกบนน้ำแข็งก้อนเล็ก', <Svg>
    <defs>
      <linearGradient id="c131s" x2="0" y2="1"><stop stopColor="#a9d6e5" /><stop offset="1" stopColor="#e0f2f8" /></linearGradient>
      <linearGradient id="c131w" x2="0" y2="1"><stop stopColor="#2c7da0" /><stop offset="1" stopColor="#013a63" /></linearGradient>
      <linearGradient id="c131i" x2="0" y2="1"><stop stopColor="#fff" /><stop offset="1" stopColor="#bde0fe" /></linearGradient>
      <radialGradient id="c131b" cx=".4" cy=".3"><stop stopColor="#fff" /><stop offset="1" stopColor="#dfe7ec" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#c131s)" />
    <circle cx="96" cy="24" r="10" fill="#fff8d6" opacity=".9" />
    <path d="M0 96L20 88L30 96L46 90" fill="none" stroke="#fff" strokeWidth="3" opacity=".6" />
    <rect y="104" width="120" height="56" fill="url(#c131w)" /><g stroke="#89c2d9" strokeWidth=".8" fill="none" opacity=".7">{[0, 1, 2].map(i => <path key={i} d={`M0 ${108 + i * 12}q10-3 20 0t20 0t20 0t20 0t20 0t20 0`} />)}</g>
    <path d="M36 112L42 104H80L86 112L82 118H40Z" fill="url(#c131i)" /><path d="M40 118H82L76 126H46Z" fill="#89c2d9" opacity=".7" />
    <g fill="#bde0fe" opacity=".5"><path d="M24 132l6-3 4 4-6 2z" /><path d="M94 140l5-2 3 3-5 1z" /></g>
    <ellipse cx="62" cy="96" rx="15" ry="9.6" fill="url(#c131b)" /><circle cx="49" cy="88" r="7.6" fill="url(#c131b)" /><circle cx="45" cy="82" r="2.2" fill="#fff" stroke="#dfe7ec" strokeWidth=".5" /><circle cx="52" cy="82" r="2" fill="#fff" stroke="#dfe7ec" strokeWidth=".5" />
    <circle cx="47" cy="88" r="1.1" fill="#222" /><circle cx="43" cy="91" r="1.4" fill="#222" /><path d="M43 93q2 1 4 0" stroke="#222" strokeWidth=".6" fill="none" />
    <rect x="53" y="100" width="5.4" height="6.4" rx="2" fill="url(#c131b)" /><rect x="68" y="100" width="5.4" height="6.4" rx="2" fill="url(#c131b)" />
    <path d="M51 84Q48 50 62 28" stroke="#555" strokeWidth=".8" fill="none" /><ellipse cx="62" cy="20" rx="9" ry="11" fill="#ef476f" /><ellipse cx="58.4" cy="16" rx="2.4" ry="4" fill="#fff" opacity=".45" /><path d="M62 31l-2 3h4z" fill="#c9184a" />
    <ellipse cx="62" cy="132" rx="24" ry="3" fill="#fff" opacity=".2" />
    <g fill="#495057"><path d="M20 40q3-3 6 0q-3 1-6 0z" /></g>
  </Svg>],

  [132, 'ปลาตะเกียงใต้ทะเลลึก', <Svg>
    <defs>
      <radialGradient id="c132s" cx=".7" cy=".2"><stop stopColor="#0b2545" /><stop offset="1" stopColor="#000814" /></radialGradient>
      <radialGradient id="c132l"><stop stopColor="#e6ff6b" /><stop offset=".3" stopColor="#d9ff6b" stopOpacity=".5" /><stop offset="1" stopColor="#d9ff6b" stopOpacity="0" /></radialGradient>
      <radialGradient id="c132f" cx=".4" cy=".35"><stop stopColor="#3a506b" /><stop offset="1" stopColor="#0b132b" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#c132s)" />
    <g fill="#caf0f8" opacity=".3">{[[20, 30, 1], [100, 20, 1.4], [90, 140, 1], [14, 120, 1.2], [60, 150, .8], [40, 10, .7]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <path d="M62 68Q66 40 86 32" stroke="#3a506b" strokeWidth="1.6" fill="none" />
    <circle cx="86" cy="30" r="30" fill="url(#c132l)" /><circle cx="86" cy="30" r="4" fill="#f4ff9a" />
    <path d="M8 108Q18 66 56 66Q92 68 98 98Q92 132 56 132Q28 132 8 108Z" fill="url(#c132f)" />
    <path d="M8 108L-4 92V126Z" fill="#1c2541" /><path d="M40 70L46 56L52 70M58 68L62 58L66 68" fill="#1c2541" />
    <g stroke="#5c7a9a" strokeWidth=".6" fill="none" opacity=".6">{[[30, 92], [40, 100], [28, 112], [44, 116]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q4-4 8 0`} />)}</g>
    <path d="M64 112L98 102L92 118Z" fill="#000" /><path d="M66 110l2.6 5 3-5 2.6 5 3-6 2.6 5 3-6 2.6 4" stroke="#e0e1dd" fill="none" strokeWidth=".9" /><path d="M68 114l2 4 3-4 2 4 3-4" stroke="#e0e1dd" fill="none" strokeWidth=".7" />
    <circle cx="70" cy="88" r="7" fill="#e0e1dd" /><circle cx="71" cy="88" r="3.6" fill="#000" /><circle cx="72.4" cy="86.4" r="1.2" fill="#d9ff6b" />
    <g fill="#d9ff6b" opacity=".5">{[[30, 120], [48, 126], [20, 100]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
    <g transform="translate(100 60)"><path d="M-4 0q4-3 8 0q-4 3-8 0zM4 0l2.4-2v4z" fill="#ffd166" /></g>
  </Svg>],
];
