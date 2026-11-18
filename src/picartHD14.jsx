// ภาพการ์ดแบบละเอียด ชุด 14 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;
const Sheep = ({ x, y, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}><g fill="#fff"><circle cx="-6" cy="0" r="5.4" /><circle cx="1" cy="-3" r="6.4" /><circle cx="8" cy="1" r="5.4" /><circle cx="0" cy="3" r="5.6" /><circle cx="-2" cy="-4" r="4" /></g><g fill="#e9ecef"><circle cx="-4" cy="3" r="3" /><circle cx="6" cy="4" r="3" /></g><ellipse cx="13" cy="-1" rx="4" ry="3.4" fill="#343a40" /><ellipse cx="11" cy="-4" rx="1.6" ry="1" fill="#343a40" /><circle cx="14.4" cy="-1.6" r=".7" fill="#fff" /><path d="M-4 8v5M4 8v5" stroke="#343a40" strokeWidth="1.6" strokeLinecap="round" /></g>;

export const HD14 = [
  [65, 'เก้าอี้สองตัวกลางทุ่ง', <Svg>
    <defs>
      <linearGradient id="y65s" x2="0" y2="1"><stop stopColor="#fefae0" /><stop offset="1" stopColor="#e9edc9" /></linearGradient>
      <linearGradient id="y65g" x2="0" y2="1"><stop stopColor="#ccd5ae" /><stop offset="1" stopColor="#8a9a5b" /></linearGradient>
      <linearGradient id="y65c" x2="1" y2="0"><stop stopColor="#6b4226" /><stop offset=".5" stopColor="#a0682f" /><stop offset="1" stopColor="#5a3417" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#y65s)" />
    <Cl x={60} y={30} s={1.4} /><Cl x={14} y={50} s={.7} o={.8} />
    <path d="M0 100Q60 90 120 102V160H0Z" fill="url(#y65g)" />
    <g stroke="#6a7a3a" strokeWidth="1" strokeLinecap="round">{Array.from({ length: 24 }, (_, i) => { const x = (i * 37) % 118 + 1, y = 106 + (i * 19) % 50; return <path key={i} d={`M${x} ${y}q-1-5 0-8M${x + 2} ${y}q2-4 3-6`} fill="none" />; })}</g>
    <g fill="#e9c46a">{[[16, 128], [96, 140], [52, 150], [104, 118]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" />)}</g>
    <ellipse cx="30" cy="132" rx="14" ry="3" fill="#000" opacity=".12" /><ellipse cx="92" cy="132" rx="14" ry="3" fill="#000" opacity=".12" />
    <g stroke="url(#y65c)" strokeWidth="2.6" fill="none" strokeLinecap="round"><path d="M20 82V130M36 106V130M20 106H38M38 106V130M20 84H34" /><path d="M100 82V130M84 106V130M100 106H82M82 106V130M100 84H86" /></g>
    <path d="M18 104h22v4H18zM80 104h22v4H80z" fill="#8b5a2b" />
    <g transform="translate(94 104)"><path d="M-10-2h20l-3-10h-14z" fill="#2b2d42" /><rect x="-13" y="-3" width="26" height="2.4" rx="1" fill="#2b2d42" /><path d="M-7-6h14" stroke="#e63946" strokeWidth="1.6" /></g>
    <g transform="translate(26 102) rotate(-8)"><path d="M0 0q4-8 10-6q-2 6-10 6z" fill="#ffafcc" /><path d="M0 0L3-10" stroke="#55a630" strokeWidth=".8" /></g>
    <g fill="#495057"><path d="M84 46q3-3 6 0q-3 1-6 0z" /><path d="M92 40q2-2 4 0q-2 1-4 0z" /></g>
  </Svg>],

  [68, 'นับแกะ', <Svg>
    <defs>
      <linearGradient id="y68s" x2="0" y2="1"><stop stopColor="#0b132b" /><stop offset="1" stopColor="#3a506b" /></linearGradient>
      <radialGradient id="y68m"><stop stopColor="#fff4c2" stopOpacity=".55" /><stop offset="1" stopColor="#fff4c2" stopOpacity="0" /></radialGradient>
      <linearGradient id="y68c" x2="0" y2="1"><stop stopColor="#e0e7f5" /><stop offset="1" stopColor="#a9b8d8" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#y68s)" />
    <St p={[8, 10, .6, 22, 30, .5, 40, 8, .7, 62, 22, .4, 104, 40, .6, 14, 54, .5, 112, 64, .4, 50, 46, .4]} />
    <circle cx="92" cy="24" r="22" fill="url(#y68m)" /><path d="M90 12a12 12 0 1 0 10 18a9.6 9.6 0 1 1-10-18z" fill="#fff4c2" />
    <Cl x={18} y={132} s={2} f="url(#y68c)" /><Cl x={62} y={140} s={2.4} f="#dfe5f0" /><Cl x={106} y={128} s={1.8} f="url(#y68c)" /><rect y="144" width="120" height="16" fill="#dfe5f0" />
    <g stroke="#a26b3a" strokeWidth="3" strokeLinecap="round"><line x1="50" y1="94" x2="50" y2="128" /><line x1="70" y1="94" x2="70" y2="128" /></g><g stroke="#c48a4a" strokeWidth="2.4"><line x1="45" y1="102" x2="75" y2="102" /><line x1="45" y1="114" x2="75" y2="114" /></g>
    <Sheep x={58} y={76} /><Sheep x={22} y={112} s={.85} /><Sheep x={96} y={110} s={.85} />
    <path d="M40 86q-8 6-14 18M80 86q8 6 12 16" stroke="#fff" strokeWidth=".7" strokeDasharray="1.5 2.5" fill="none" opacity=".6" />
    <g fill="#fff4c2" opacity=".8"><path d="M40 60l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" /><path d="M78 62l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" /></g>
  </Svg>],

  [69, 'รอยเท้าที่หายไปในทะเล', <Svg>
    <defs>
      <linearGradient id="y69s" x2="0" y2="1"><stop stopColor="#ffb4a2" /><stop offset="1" stopColor="#ffe5d9" /></linearGradient>
      <linearGradient id="y69w" x2="0" y2="1"><stop stopColor="#219ebc" /><stop offset="1" stopColor="#8ecae6" /></linearGradient>
      <linearGradient id="y69b" x2="0" y2="1"><stop stopColor="#f2d0a9" /><stop offset="1" stopColor="#d4a373" /></linearGradient>
      <radialGradient id="y69u"><stop stopColor="#fff3c4" /><stop offset=".5" stopColor="#ffd6a5" stopOpacity=".5" /><stop offset="1" stopColor="#ffd6a5" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="56" fill="url(#y69s)" />
    <circle cx="94" cy="44" r="26" fill="url(#y69u)" /><circle cx="94" cy="44" r="10" fill="#fff3c4" />
    <path d="M0 52Q30 48 60 54T120 50V84H0Z" fill="url(#y69w)" /><g fill="#fff3c4" opacity=".6"><rect x="82" y="56" width="24" height="1.4" rx=".7" /><rect x="86" y="62" width="16" height="1.4" rx=".7" /></g>
    <path d="M0 80Q30 70 60 80T120 74V160H0Z" fill="url(#y69b)" />
    <path d="M0 80Q30 70 60 80T120 74" stroke="#fff" strokeWidth="3" fill="none" opacity=".9" /><path d="M0 84Q30 76 60 84T120 80" stroke="#bde0fe" strokeWidth="1.4" fill="none" opacity=".6" />
    <g fill="#a87c52">{[[28, 152], [38, 142], [33, 130], [44, 120], [40, 108], [50, 98], [46, 88]].map(([x, y], i) => <g key={i} transform={`rotate(-14 ${x} ${y})`}><ellipse cx={x} cy={y} rx={3 - i * .2} ry={5 - i * .3} /><g>{[-2, -1, 0, 1, 2].map(t => <circle key={t} cx={x + t * 1.1} cy={y - 5.6 + i * .3 + Math.abs(t) * .4} r=".6" />)}</g></g>)}</g>
    <g fill="#e76f51"><path d="M88 128q4-6 10-2q-4 4-10 2z" /></g><g transform="translate(100 140)"><path d="M0 0l-3-2 1 3-3 1 3 1-1 3 3-2 3 2-1-3 3-1-3-1 1-3z" fill="#f4a261" /></g>
    <g fill="#fff" opacity=".8"><path d="M20 20q3-3 6 0q-3 1-6 0z" /><path d="M28 14q2-2 4 0q-2 1-4 0z" /></g>
    <g fill="#d4a373" opacity=".6">{[[14, 110], [90, 104], [70, 150]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".8" />)}</g>
  </Svg>],

  [73, 'ผีเสื้อกลางคืนกับหลอดไฟ', <Svg>
    <defs>
      <linearGradient id="y73s" x2="0" y2="1"><stop stopColor="#14110f" /><stop offset="1" stopColor="#2b2622" /></linearGradient>
      <radialGradient id="y73g"><stop stopColor="#fffbe0" /><stop offset=".25" stopColor="#fff3b0" stopOpacity=".7" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
      <linearGradient id="y73w" x2="1" y2="1"><stop stopColor="#c9a87c" /><stop offset="1" stopColor="#6b5233" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#y73s)" />
    <line x1="60" y1="0" x2="60" y2="20" stroke="#555" /><rect x="54" y="20" width="12" height="8" fill="#6c757d" /><path d="M54 23h12M54 26h12" stroke="#343a40" strokeWidth=".6" />
    <circle cx="60" cy="40" r="60" fill="url(#y73g)" /><path d="M54 28Q46 38 52 48Q56 52 60 52Q64 52 68 48Q74 38 66 28Z" fill="#fffbe0" /><path d="M58 32l1 10 2-10" stroke="#f4a261" strokeWidth=".8" fill="none" />
    <g fill="#c9a87c" opacity=".5">{[[34, 26], [86, 34], [40, 58], [80, 60]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y}) scale(.4)`}><path d="M0 0Q-10-10-14-2Q-12 6 0 2ZM0 0Q10-10 14-2Q12 6 0 2Z" /></g>)}</g>
    <g transform="translate(60 104)"><path d="M0 0Q-32-30-44-6Q-40 18 0 4Z" fill="url(#y73w)" /><path d="M0 0Q32-30 44-6Q40 18 0 4Z" fill="url(#y73w)" /><path d="M0 4Q-26 12-28 30Q-10 32 0 8ZM0 4Q26 12 28 30Q10 32 0 8Z" fill="#8a6f4e" />
      <g fill="#3d2f22">{[-24, 24].map(x => <g key={x}><circle cx={x} cy="-6" r="6" /><circle cx={x} cy="-6" r="3.4" fill="#e9c46a" /><circle cx={x} cy="-6" r="1.6" fill="#3d2f22" /></g>)}</g>
      <g stroke="#5c4a35" strokeWidth=".6" fill="none"><path d="M-6-4q-14-10-30-6M6-4q14-10 30-6M-4 8q-12 8-20 18M4 8q12 8 20 18" /></g>
      <ellipse cx="0" cy="6" rx="3.4" ry="13" fill="#3d2f22" /><g stroke="#5c4a35" strokeWidth=".5">{[0, 4, 8, 12].map(y => <path key={y} d={`M-3 ${y}h6`} />)}</g>
      <path d="M-1-6q-8-12-12-14M1-6q8-12 12-14" stroke="#3d2f22" strokeWidth=".9" fill="none" /><g stroke="#3d2f22" strokeWidth=".4">{[-11, -8, 8, 11].map(x => <path key={x} d={`M${x} ${-18 + Math.abs(x) * .2}l${x > 0 ? 2 : -2} -2`} />)}</g></g>
    <g fill="#fff3b0" opacity=".6">{[[40, 82], [82, 86], [50, 136], [72, 140]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".7" />)}</g>
  </Svg>],

  [76, 'หัวใจนีออนกลางฝน', <Svg>
    <defs>
      <linearGradient id="y76s" x2="0" y2="1"><stop stopColor="#0a0014" /><stop offset="1" stopColor="#240046" /></linearGradient>
      <radialGradient id="y76g"><stop stopColor="#ff4d8d" stopOpacity=".55" /><stop offset="1" stopColor="#ff4d8d" stopOpacity="0" /></radialGradient>
      <linearGradient id="y76w" x2="0" y2="1"><stop stopColor="#1a0033" /><stop offset="1" stopColor="#2a0a4a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#y76s)" />
    <rect x="12" y="24" width="96" height="96" rx="4" fill="url(#y76w)" stroke="#3c096c" strokeWidth="1.5" /><g stroke="#3c096c" strokeWidth=".6">{[40, 60, 80, 100].map(y => <path key={y} d={`M12 ${y}h96`} />)}</g>
    <circle cx="56" cy="70" r="40" fill="url(#y76g)" />
    <path d="M60 98L34 72A13 13 0 0 1 58 54L55 66L64 74L60 82Z" fill="none" stroke="#ff4d8d" strokeWidth="5" strokeLinejoin="round" opacity=".35" />
    <path d="M60 98L34 72A13 13 0 0 1 58 54L55 66L64 74L60 82Z" fill="none" stroke="#ffd6e7" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M60 98L34 72A13 13 0 0 1 58 54L55 66L64 74L60 82Z" fill="none" stroke="#ff4d8d" strokeWidth="2.6" strokeLinejoin="round" opacity=".8" />
    <path d="M64 70L62 58A13 13 0 0 1 86 72L64 94" fill="none" stroke="#ff4d8d" strokeWidth="2.6" strokeLinejoin="round" opacity=".25" /><path d="M64 70L62 58A13 13 0 0 1 86 72L64 94" fill="none" stroke="#ffd6e7" strokeWidth=".8" opacity=".3" />
    <g fill="#ff4d8d"><circle cx="66" cy="76" r=".9" /><circle cx="70" cy="80" r=".6" /><path d="M64 70l3-2-1 3z" /></g>
    <g stroke="#9d4edd" strokeWidth=".6" opacity=".7">{Array.from({ length: 30 }, (_, i) => <line key={i} x1={(i * 47) % 120} y1={(i * 31) % 150} x2={(i * 47) % 120 - 2} y2={(i * 31) % 150 + 10} />)}</g>
    <rect y="128" width="120" height="32" fill="#0b0018" />
    <ellipse cx="56" cy="140" rx="30" ry="4" fill="#ff4d8d" opacity=".25" /><path d="M36 138h22M42 144h12M64 140h10" stroke="#ff4d8d" strokeWidth="1.4" opacity=".5" />
    <g fill="#9d4edd" opacity=".5">{[[20, 150], [90, 146], [104, 154]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="4" ry="1" />)}</g>
  </Svg>],

  [77, 'บอลลูนลอยเหนือทุ่ง', <Svg>
    <defs>
      <linearGradient id="y77s" x2="0" y2="1"><stop stopColor="#ffb4a2" /><stop offset=".5" stopColor="#ffd6a5" /><stop offset="1" stopColor="#fdffb6" /></linearGradient>
      <linearGradient id="y77b" x2="1" y2="0"><stop stopColor="#c9184a" /><stop offset=".4" stopColor="#ff4d6d" /><stop offset="1" stopColor="#a4133c" /></linearGradient>
      <linearGradient id="y77y" x2="1" y2="0"><stop stopColor="#f4a261" /><stop offset=".4" stopColor="#ffd166" /><stop offset="1" stopColor="#e9a23b" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#y77s)" />
    <Cl x={20} y={50} s={.9} o={.8} /><Cl x={102} y={70} s={1.1} o={.8} />
    <path d="M0 110L40 102L60 114L120 104V160H0Z" fill="#b5e48c" /><path d="M0 126L50 116L80 130L120 120V160H0Z" fill="#99d98c" /><path d="M0 144L40 138L70 148L120 140V160H0Z" fill="#d9ed92" />
    <g stroke="#76c893" strokeWidth=".8" fill="none"><path d="M40 102L50 116M60 114L80 130M50 116L40 138M80 130L70 148M20 106l-6 16M100 106l6 18" /></g>
    <g fill="#52b69a">{[[20, 120], [90, 118], [56, 138]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" />)}</g>
    <path d="M60 12C38 12 30 32 34 48C38 62 52 70 54 80H66C68 70 82 62 86 48C90 32 82 12 60 12Z" fill="url(#y77b)" />
    <path d="M60 12C52 12 47 32 49 48C51 62 56 70 57 80H63C64 70 69 62 71 48C73 32 68 12 60 12Z" fill="url(#y77y)" />
    <path d="M35 40Q60 46 85 40M38 56Q60 62 82 56" stroke="#fff" strokeWidth="1" fill="none" opacity=".5" />
    <path d="M44 22q4-6 10-8" stroke="#fff" strokeWidth="2" fill="none" opacity=".5" strokeLinecap="round" />
    <path d="M54 80h12" stroke="#6b4226" strokeWidth="1.2" /><g stroke="#6b4226" strokeWidth=".7"><path d="M54 80l1 9M66 80l-1 9M58 80l.6 9M62 80l-.6 9" /></g>
    <rect x="53" y="89" width="14" height="10" rx="1.6" fill="#8b5a2b" /><path d="M53 92h14M53 95h14" stroke="#6b4226" strokeWidth=".6" />
    <circle cx="60" cy="86" r="2.4" fill="#f1c27d" /><path d="M58 84q2-3 4 0" fill="#3a2a1a" /><path d="M62 88l4-4" stroke="#f1c27d" strokeWidth="1.2" strokeLinecap="round" />
    <g fill="#555"><path d="M90 30q3-3 6 0q-3 1-6 0z" /><path d="M98 38q2-2 4 0q-2 1-4 0z" /></g>
    <g transform="translate(22 82) scale(.4)"><path d="M0-30C-14-30-18-18-16-8C-14 2-4 6-3 12H3C4 6 14 2 16-8C18-18 14-30 0-30Z" fill="#4cc9f0" /><rect x="-4" y="14" width="8" height="6" fill="#8b5a2b" /></g>
  </Svg>],

  [78, 'ประตูใต้ทะเล', <Svg>
    <defs>
      <linearGradient id="y78s" x2="0" y2="1"><stop stopColor="#0096c7" /><stop offset=".6" stopColor="#023e8a" /><stop offset="1" stopColor="#03045e" /></linearGradient>
      <linearGradient id="y78r" x2="0" y2="1"><stop stopColor="#caf0f8" stopOpacity=".35" /><stop offset="1" stopColor="#caf0f8" stopOpacity="0" /></linearGradient>
      <radialGradient id="y78d"><stop stopColor="#fff3b0" stopOpacity=".8" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
      <linearGradient id="y78f" x2="1" y2="0"><stop stopColor="#5a3417" /><stop offset=".5" stopColor="#8b5a2b" /><stop offset="1" stopColor="#4a2a10" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#y78s)" />
    <g fill="url(#y78r)"><polygon points="30,0 44,0 70,160 40,160" /><polygon points="64,0 74,0 96,160 76,160" /><polygon points="96,0 104,0 116,160 104,160" /></g>
    <g fill="#caf0f8" opacity=".55">{[[26, 40, 2], [30, 30, 1.4], [27, 20, 1], [92, 60, 2], [90, 48, 1.4], [94, 36, 1]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#caf0f8" strokeWidth=".6" />)}</g>
    <path d="M0 134Q30 124 60 132T120 128V160H0Z" fill="#c2b280" opacity=".85" /><g fill="#a89a6a" opacity=".6">{[[20, 144], [90, 148], [60, 152]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="4" ry="1.4" />)}</g>
    <circle cx="65" cy="112" r="34" fill="url(#y78d)" />
    <rect x="51" y="86" width="28" height="48" fill="url(#y78f)" /><rect x="55" y="90" width="20" height="44" fill="#fff3b0" />
    <polygon points="75,90 84,93 84,136 75,134" fill="url(#y78f)" /><circle cx="81" cy="114" r=".9" fill="#f2c14e" />
    <g fill="#2a9d8f"><path d="M12 134q-6-24 4-36q4 18-4 36z" /><path d="M20 134q2-20 10-26q-2 16-10 26z" /><path d="M104 132q6-26-2-38q-2 20 2 38z" /><path d="M96 132q-4-18-12-22q4 14 12 22z" /></g>
    <g fill="#ff8fab"><circle cx="40" cy="134" r="3" /><circle cx="44" cy="132" r="2" /><circle cx="36" cy="132" r="2" /></g>
    <g transform="translate(30 92)"><circle r="5.6" fill="#ade8f4" opacity=".8" stroke="#fff" strokeWidth=".8" /><circle cx="1" cy="0" r="2.6" fill="#f1c27d" /><rect x="-4.4" y="5" width="8.8" height="14" rx="2.4" fill="#f77f00" /><rect x="-6" y="6" width="3" height="10" rx="1.4" fill="#6c757d" /><path d="M-3 19l-4 9M3 19l5 8" stroke="#023e8a" strokeWidth="2.4" strokeLinecap="round" /><path d="M-8 28l-3 2M9 27l3 2" stroke="#ffd166" strokeWidth="2.4" strokeLinecap="round" /><path d="M4 9l10 4" stroke="#f77f00" strokeWidth="2.4" strokeLinecap="round" /></g>
    <g transform="translate(94 72)"><path d="M-5 0q5-4 10 0q-5 4-10 0zM5 0l3-2.4v4.8z" fill="#ffd166" /></g><g transform="translate(100 82) scale(.7)"><path d="M-5 0q5-4 10 0q-5 4-10 0zM5 0l3-2.4v4.8z" fill="#ffd166" /></g>
  </Svg>],

  [80, 'ตุ๊กตาบนชั้นที่หันหลัง', <Svg>
    <defs>
      <linearGradient id="y80s" x2="0" y2="1"><stop stopColor="#2b1d1f" /><stop offset="1" stopColor="#1a1012" /></linearGradient>
      <linearGradient id="y80w" x2="0" y2="1"><stop stopColor="#8a5a44" /><stop offset="1" stopColor="#5a3a2a" /></linearGradient>
      <radialGradient id="y80l" cx=".2" cy="0"><stop stopColor="#ffd6a5" stopOpacity=".35" /><stop offset="1" stopColor="#ffd6a5" stopOpacity="0" /></radialGradient>
      <radialGradient id="y80f" cx=".4" cy=".35"><stop stopColor="#fbe2d3" /><stop offset="1" stopColor="#d9a88c" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#y80s)" />
    <g stroke="#3a2628" strokeWidth=".6">{[15, 35, 55, 75, 95, 115].map(x => <path key={x} d={`M${x} 0V160`} />)}</g>
    <rect width="120" height="160" fill="url(#y80l)" />
    <rect y="62" width="120" height="6" fill="url(#y80w)" /><rect y="120" width="120" height="6" fill="url(#y80w)" /><path d="M0 62h120M0 120h120" stroke="#b07a5a" strokeWidth=".6" />
    {[[16, '#c9184a', 0], [40, '#457b9d', 0], [64, '#6a4c93', 1], [88, '#2a9d8f', 0]].map(([x, c, back], i) => <g key={i}>
      <path d={`M${x - 2} 62Q${x - 2} 46 ${x + 6} 46Q${x + 14} 46 ${x + 14} 62Z`} fill={c} /><path d={`M${x} 52h12`} stroke="#fff" strokeWidth=".8" opacity=".5" />
      <circle cx={x + 6} cy="38" r="8" fill="url(#y80f)" />
      {back ? <><path d={`M${x - 2} 38a8 8 0 0 1 16 0v6q-8 3-16 0z`} fill="#5c3a21" /><path d={`M${x} 42q6 4 12 0`} stroke="#3a2412" strokeWidth=".6" fill="none" /></> : <><path d={`M${x - 2} 36a8 8 0 0 1 16 0q-8-4-16 0z`} fill="#5c3a21" /><circle cx={x + 3} cy="39" r="1.3" fill="#1b1b1b" /><circle cx={x + 9} cy="39" r="1.3" fill="#1b1b1b" /><circle cx={x + 3.4} cy="38.6" r=".4" fill="#fff" /><circle cx={x + 9.4} cy="38.6" r=".4" fill="#fff" /><path d={`M${x + 4} 43q2 1.4 4 0`} stroke="#a24a3a" strokeWidth=".6" fill="none" /><circle cx={x + 1.6} cy="42" r="1.2" fill="#ff8fa3" opacity=".6" /><circle cx={x + 10.4} cy="42" r="1.2" fill="#ff8fa3" opacity=".6" /></>}
    </g>)}
    <g><circle cx="40" cy="96" r="9" fill="url(#y80f)" /><path d="M30 120Q30 104 40 104Q50 104 50 120Z" fill="#e9c46a" /><circle cx="37" cy="96" r="1.3" fill="#1b1b1b" /><circle cx="43" cy="96" r="1.3" fill="#1b1b1b" /><path d="M31 92a9 9 0 0 1 18 0q-9-4-18 0z" fill="#f4a261" /><path d="M31 92q-3 8 0 12M49 92q3 8 0 12" stroke="#f4a261" strokeWidth="2" fill="none" /><path d="M38 100q2 1.4 4 0" stroke="#a24a3a" strokeWidth=".6" fill="none" /></g>
    <g><rect x="72" y="98" width="18" height="22" rx="4" fill="#8d6e63" /><circle cx="81" cy="92" r="8" fill="#8d6e63" /><circle cx="75" cy="85" r="3.4" fill="#8d6e63" /><circle cx="87" cy="85" r="3.4" fill="#8d6e63" /><circle cx="78.4" cy="91" r="1.1" fill="#1b1b1b" /><circle cx="83.6" cy="91" r="1.1" fill="#1b1b1b" /><ellipse cx="81" cy="95" rx="3" ry="2" fill="#bcaaa4" /><path d="M76 106l10 2" stroke="#c9184a" strokeWidth="1.2" /></g>
    <g transform="translate(104 108)"><rect x="-6" y="-4" width="12" height="16" rx="2" fill="#adb5bd" /><circle cx="0" cy="-8" r="5" fill="#ced4da" /><circle cx="-1.6" cy="-8" r=".8" fill="#1b1b1b" /><circle cx="1.6" cy="-8" r=".8" fill="#1b1b1b" /></g>
    <polygon points="0,0 34,0 0,44" fill="#000" opacity=".35" />
  </Svg>],
];
