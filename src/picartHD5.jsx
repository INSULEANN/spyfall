// ภาพการ์ดแบบละเอียด ชุด 5 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Spark = ({ x, y, s = 1, f = '#fff' }) => <path transform={`translate(${x} ${y}) scale(${s})`} d="M0-4L1-1L4 0L1 1L0 4L-1 1L-4 0L-1-1Z" fill={f} />;

export const HD5 = [
  [47, 'รองเท้าแดงบนบันได', <Svg>
    <defs>
      <linearGradient id="p47s" x2="0" y2="1"><stop stopColor="#1a0f24" /><stop offset="1" stopColor="#3c1f3d" /></linearGradient>
      <linearGradient id="p47r" x2="1" y2="1"><stop stopColor="#ff5a6e" /><stop offset=".6" stopColor="#d90429" /><stop offset="1" stopColor="#8d021f" /></linearGradient>
      <radialGradient id="p47g"><stop stopColor="#ff8fa3" stopOpacity=".5" /><stop offset="1" stopColor="#ff8fa3" stopOpacity="0" /></radialGradient>
      <linearGradient id="p47c" x2="0" y2="1"><stop stopColor="#fff" stopOpacity=".1" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#p47s)" />
    <path d="M28 0Q60 20 92 0" stroke="#c9a227" strokeWidth=".8" fill="none" /><g fill="#f6d77a">{[36, 48, 60, 72, 84].map((x, i) => <g key={x}><line x1={x} y1={4 + Math.abs(2 - i) * -1} x2={x} y2={12 - Math.abs(2 - i) * 2} stroke="#c9a227" strokeWidth=".5" /><path d={`M${x} ${12 - Math.abs(2 - i) * 2}l1.4 3-1.4 3-1.4-3z`} /></g>)}</g>
    <path d="M30 0H90L120 60V160H0V60Z" fill="url(#p47c)" />
    {[0, 1, 2, 3, 4, 5, 6].map(i => <g key={i}><rect x={10 - i * 2} y={50 + i * 16} width={100 + i * 4} height="5" fill="#7a2840" /><rect x={10 - i * 2} y={55 + i * 16} width={100 + i * 4} height="11" fill="#5a1d33" /><path d={`M${10 - i * 2} ${50 + i * 16}h${100 + i * 4}`} stroke="#a33a5a" strokeWidth=".8" /></g>)}
    <path d="M44 50H76V160H44Z" fill="#9b2c4f" opacity=".45" /><path d="M44 50V160M76 50V160" stroke="#c9a227" strokeWidth=".8" />
    <g stroke="#c9a227" strokeWidth="1.6"><path d="M4 50V160M116 50V160" /><path d="M4 48h6M110 48h6" /></g><g fill="#c9a227"><circle cx="4" cy="46" r="2.4" /><circle cx="116" cy="46" r="2.4" /></g>
    <circle cx="62" cy="100" r="30" fill="url(#p47g)" />
    <g transform="translate(46 96)"><path d="M0 0Q2-12 12-11Q22-10 28-8Q34-7 34 0Z" fill="url(#p47r)" /><path d="M4 0l-3 12h3l2-12" fill="#8d021f" /><path d="M12-11Q16-4 26-6" stroke="#ffb3c1" strokeWidth=".8" fill="none" /><path d="M2-3Q6-9 12-9" stroke="#fff" strokeWidth=".8" fill="none" opacity=".7" /><circle cx="24" cy="-7" r="1.4" fill="#ffd6e0" /></g>
    <Spark x={40} y={84} s={.8} /><Spark x={86} y={90} s={.6} f="#ffd6e0" /><Spark x={70} y={78} s={.5} /><Spark x={30} y={110} s={.5} f="#ffd6e0" /><Spark x={92} y={116} s={.7} />
    <g fill="#ff8fa3" opacity=".7">{[[54, 116], [66, 120], [78, 114]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.4" ry=".8" />)}</g>
  </Svg>],

  [113, 'กุหลาบกระจกสี', <Svg>
    <defs>
      <radialGradient id="p113l" cx=".5" cy=".4"><stop stopColor="#fff" stopOpacity=".35" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="#14110f" />
    <path d="M10 160V50Q10 8 60 6Q110 8 110 50V160Z" fill="#2a2420" />
    <g stroke="#14110f" strokeWidth="2.2" strokeLinejoin="round">
      <path d="M14 156V52Q14 12 60 10Q106 12 106 52V156Z" fill="#1d3557" />
      <path d="M14 52Q14 12 60 10L40 40L14 60Z" fill="#457b9d" /><path d="M106 52Q106 12 60 10L80 40L106 60Z" fill="#2a9d8f" />
      <path d="M60 10L40 40H80Z" fill="#a8dadc" />
      <path d="M14 60L40 40L44 62L14 84Z" fill="#e9c46a" /><path d="M106 60L80 40L76 62L106 84Z" fill="#f4a261" />
      <path d="M14 84L44 62L40 96L14 112Z" fill="#457b9d" /><path d="M106 84L76 62L80 96L106 112Z" fill="#1d3557" />
      <path d="M14 112L40 96L50 130L14 156Z" fill="#2a9d8f" /><path d="M106 112L80 96L70 130L106 156Z" fill="#e9c46a" />
      <path d="M14 156L50 130H70L106 156Z" fill="#264653" />
      <path d="M60 40L44 52L48 70L60 78L72 70L76 52Z" fill="#e63946" /><path d="M60 40L60 58L44 52M60 58L76 52M60 58L48 70M60 58L72 70" fill="none" />
      <path d="M44 52L36 46L40 66L48 70Z" fill="#c1121f" /><path d="M76 52L84 46L80 66L72 70Z" fill="#c1121f" />
      <path d="M48 70L40 80L60 90L80 80L72 70L60 78Z" fill="#9d0208" /><path d="M40 40H80L76 52L60 40L44 52Z" fill="#ff6b6b" />
      <path d="M58 90H62V130H58Z" fill="#386641" /><path d="M58 106L42 96L40 112Z" fill="#6a994e" /><path d="M62 116L80 104L82 120Z" fill="#a7c957" />
    </g>
    <rect x="14" y="10" width="92" height="146" fill="url(#p113l)" />
    <g fill="#fff" opacity=".7"><circle cx="30" cy="40" r="1.2" /><circle cx="90" cy="70" r="1" /><circle cx="54" cy="46" r="1" /></g>
    <path d="M0 156H120V160H0Z" fill="#3a302a" />
    <g opacity=".22"><path d="M30 160L0 120V160Z" fill="#e63946" /><path d="M90 160L120 124V160Z" fill="#2a9d8f" /></g>
  </Svg>],

  [64, 'ไข่ที่มีจักรวาลข้างใน', <Svg>
    <defs>
      <linearGradient id="p64s" x2="0" y2="1"><stop stopColor="#efe6dd" /><stop offset="1" stopColor="#d9c8b6" /></linearGradient>
      <linearGradient id="p64e" x2="1" y2="0"><stop stopColor="#e8dccb" /><stop offset=".4" stopColor="#fffdf6" /><stop offset="1" stopColor="#d6c6b0" /></linearGradient>
      <radialGradient id="p64u" cx=".5" cy=".3"><stop stopColor="#5a4fcf" /><stop offset=".5" stopColor="#241b5e" /><stop offset="1" stopColor="#0c0a24" /></radialGradient>
      <radialGradient id="p64n"><stop stopColor="#ff8fd8" stopOpacity=".7" /><stop offset="1" stopColor="#ff8fd8" stopOpacity="0" /></radialGradient>
      <radialGradient id="p64g"><stop stopColor="#b8b0ff" stopOpacity=".6" /><stop offset="1" stopColor="#b8b0ff" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#p64s)" />
    <path d="M0 126H120V160H0Z" fill="#c9b49c" /><path d="M0 126h120" stroke="#e3d2bd" />
    <ellipse cx="62" cy="134" rx="32" ry="5" fill="#8a7460" opacity=".35" />
    <circle cx="60" cy="96" r="48" fill="url(#p64g)" />
    <path d="M30 94Q30 134 60 134Q90 134 90 94L82 88L74 96L66 86L58 96L50 86L42 96L34 88Z" fill="url(#p64e)" stroke="#c9b79c" strokeWidth=".8" />
    <path d="M34 94L42 100L50 90L58 100L66 90L74 100L82 92L86 96Q84 124 60 126Q36 124 34 98Z" fill="url(#p64u)" />
    <path d="M38 112Q60 100 84 106" stroke="#ff8fd8" strokeWidth="5" fill="none" opacity=".25" strokeLinecap="round" />
    <circle cx="52" cy="110" r="10" fill="url(#p64n)" />
    <St p={[42, 104, .7, 48, 116, .5, 56, 100, .6, 70, 104, .8, 76, 116, .5, 62, 120, .6, 46, 120, .4, 80, 102, .5, 66, 112, .4]} />
    <circle cx="70" cy="110" r="4.5" fill="#ffb4a2" /><ellipse cx="70" cy="110" rx="8" ry="1.8" fill="none" stroke="#ffe5d9" strokeWidth=".8" /><path d="M66 108a4.5 4.5 0 0 1 8 0" fill="#e5989b" opacity=".6" />
    <circle cx="50" cy="104" r="1.8" fill="#8ecae6" />
    <path d="M42 96Q52 90 60 98" stroke="#fff" strokeWidth=".6" fill="none" opacity=".6" />
    <g transform="translate(-6 -16) rotate(-22 60 60)"><path d="M34 80Q34 40 60 34Q86 40 86 80L78 74L70 84L62 72L54 82L46 72L38 80Z" fill="url(#p64e)" stroke="#c9b79c" strokeWidth=".8" /><path d="M42 50Q50 40 60 40" stroke="#fff" strokeWidth="2" fill="none" opacity=".7" strokeLinecap="round" /></g>
    <St p={[52, 60, .9, 70, 54, .7, 60, 68, .6, 44, 72, .5, 76, 66, .5]} f="#b8b0ff" />
    <path d="M58 84Q60 76 64 70" stroke="#b8b0ff" strokeWidth=".6" strokeDasharray="1 2" fill="none" />
    <g fill="#fffdf6" stroke="#c9b79c" strokeWidth=".5"><path d="M22 132l4-3 3 3-4 2z" /><path d="M96 130l3-2 2 3-3 1z" /></g>
  </Svg>],

  [41, 'บันไดวน', <Svg>
    <defs>
      <radialGradient id="p41d" cx=".5" cy=".5"><stop stopColor="#000" /><stop offset=".3" stopColor="#141414" /><stop offset="1" stopColor="#4a4038" /></radialGradient>
      <linearGradient id="p41r" x2="1" y2="1"><stop stopColor="#e0b46a" /><stop offset="1" stopColor="#8a6430" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="#2a241f" />
    <circle cx="60" cy="80" r="62" fill="url(#p41d)" />
    {[58, 50, 43, 36, 30, 24, 19, 14, 10, 6.5].map((r, i) => <g key={i}>{Array.from({ length: 14 }, (_, k) => { const a0 = (k / 14) * Math.PI * 2 + i * .24, a1 = a0 + Math.PI * 2 / 14 * .9, r2 = r * .86; return <path key={k} d={`M${60 + r * Math.cos(a0)} ${80 + r * Math.sin(a0)}A${r} ${r} 0 0 1 ${60 + r * Math.cos(a1)} ${80 + r * Math.sin(a1)}L${60 + r2 * Math.cos(a1)} ${80 + r2 * Math.sin(a1)}A${r2} ${r2} 0 0 0 ${60 + r2 * Math.cos(a0)} ${80 + r2 * Math.sin(a0)}Z`} fill={`hsl(30 ${18 - i}% ${44 - i * 3.6 - (k % 2) * 3}%)`} />; })}</g>)}
    <g fill="none" stroke="url(#p41r)" strokeWidth="2.2">{[58, 43, 30, 19, 10].map((r, i) => <circle key={i} cx="60" cy="80" r={r + 1} strokeDasharray={`${r * 2} ${r * .8}`} transform={`rotate(${i * 40} 60 80)`} opacity={1 - i * .15} />)}</g>
    <circle cx="60" cy="80" r="4" fill="#000" />
    <g transform="translate(102 22) rotate(40)"><path d="M-10 4Q-12-4-4-6H8Q12-6 12-2V6H-8Z" fill="#f1c27d" /><path d="M-4-6v12M2-6v12M8-6v12" stroke="#c48d68" strokeWidth=".5" /><path d="M-10 6H14V14H-10Z" fill="#457b9d" /></g>
    <g transform="translate(18 140)"><ellipse rx="7" ry="3" fill="#6b4226" /><ellipse cx="-3" cy="-1" rx="2" ry=".8" fill="#a07c4a" /></g>
  </Svg>],

  [99, 'พระจันทร์นอนเปล', <Svg>
    <defs>
      <linearGradient id="p99s" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset=".6" stopColor="#14213d" /><stop offset="1" stopColor="#2b2d5a" /></linearGradient>
      <radialGradient id="p99m" cx=".35" cy=".35"><stop stopColor="#fffbe6" /><stop offset="1" stopColor="#f0d98a" /></radialGradient>
      <radialGradient id="p99g"><stop stopColor="#ffe8a3" stopOpacity=".5" /><stop offset="1" stopColor="#ffe8a3" stopOpacity="0" /></radialGradient>
      <linearGradient id="p99h" x2="0" y2="1"><stop stopColor="#e76f51" /><stop offset="1" stopColor="#9d3c2a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#p99s)" />
    <St p={[8, 70, .6, 20, 96, .8, 34, 120, .5, 50, 140, .7, 70, 128, .5, 90, 110, .8, 110, 132, .6, 104, 90, .5, 14, 140, .5, 60, 100, .4, 40, 80, .4]} />
    <g fill="#ffd60a"><path d="M16 26l3.4 7 7.6 1-5.5 5.2 1.4 7.6-6.9-3.6-6.9 3.6 1.4-7.6L5 34l7.6-1z" /><path d="M104 26l3.4 7 7.6 1-5.5 5.2 1.4 7.6-6.9-3.6-6.9 3.6 1.4-7.6L93 34l7.6-1z" /></g>
    <circle cx="16" cy="36" r="16" fill="url(#p99g)" /><circle cx="104" cy="36" r="16" fill="url(#p99g)" />
    <path d="M22 42Q60 98 98 42" stroke="#c9a227" strokeWidth=".8" fill="none" /><path d="M22 42Q36 70 44 74M98 42Q84 70 76 74" stroke="#c9a227" strokeWidth=".6" fill="none" />
    <path d="M28 46Q60 96 92 46L88 50Q60 88 32 50Z" fill="url(#p99h)" />
    <g stroke="#f4a261" strokeWidth=".6" opacity=".8">{Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${34 + i * 6.5} ${54 + Math.sin(i / 8 * Math.PI) * 26}l1 4`} />)}</g>
    <circle cx="60" cy="58" r="40" fill="url(#p99g)" />
    <g transform="rotate(28 60 62)"><path d="M44 58a17 17 0 1 0 32 6a13 13 0 1 1-32-6z" fill="url(#p99m)" /><g fill="#e6d08a"><circle cx="54" cy="72" r="2" /><circle cx="64" cy="76" r="1.4" /></g><path d="M52 64q2 2 4 0" stroke="#a68a64" strokeWidth=".9" fill="none" /><path d="M50 70q3 2 6 1" stroke="#a68a64" strokeWidth=".7" fill="none" /><circle cx="48" cy="68" r="1.4" fill="#ffb4a2" opacity=".7" /></g>
    <path d="M72 46q4-4 8 0M78 38q3-3 6 0M84 30q2-2 4 0" stroke="#fff4c2" strokeWidth=".9" fill="none" opacity=".7" />
    <path d="M0 150Q30 140 60 148T120 144V160H0Z" fill="#0b0f22" />
  </Svg>],

  [166, 'แมวกับหนูในเรือลำเดียว', <Svg>
    <defs>
      <linearGradient id="p166s" x2="0" y2="1"><stop stopColor="#ffb703" /><stop offset=".5" stopColor="#ffd6a5" /><stop offset="1" stopColor="#8ecae6" /></linearGradient>
      <linearGradient id="p166w" x2="0" y2="1"><stop stopColor="#219ebc" /><stop offset="1" stopColor="#023047" /></linearGradient>
      <linearGradient id="p166b" x2="0" y2="1"><stop stopColor="#bc6c25" /><stop offset="1" stopColor="#7f4012" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#p166s)" />
    <circle cx="94" cy="80" r="16" fill="#fff3c4" opacity=".9" />
    <path d="M0 96H120V160H0Z" fill="url(#p166w)" /><g fill="#ffe8a3" opacity=".6"><rect x="80" y="100" width="28" height="2" rx="1" /><rect x="84" y="108" width="20" height="2" rx="1" /><rect x="88" y="116" width="12" height="2" rx="1" /></g>
    <g stroke="#8ecae6" strokeWidth=".8" fill="none" opacity=".7">{[[8, 104], [40, 112], [20, 130], [60, 140], [94, 134]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q5-3 10 0t10 0`} />)}</g>
    <path d="M18 106H98L88 122H30Z" fill="url(#p166b)" /><path d="M18 106H98" stroke="#dda15e" strokeWidth="1.6" /><path d="M24 112h68" stroke="#6b3a10" strokeWidth=".6" />
    <path d="M30 122Q58 128 88 122" stroke="#023047" strokeWidth="1" fill="none" opacity=".5" />
    <line x1="58" y1="106" x2="58" y2="44" stroke="#6b4226" strokeWidth="1.8" /><path d="M58 46L90 98H58Z" fill="#fefae0" /><path d="M58 46L90 98" stroke="#d6ccc2" strokeWidth=".6" /><path d="M58 60h12M58 78h22" stroke="#e9e1d4" strokeWidth=".6" />
    <path d="M58 44l10 3-10 3z" fill="#e63946" />
    <g><ellipse cx="38" cy="98" rx="10" ry="8" fill="#f4a261" /><circle cx="36" cy="84" r="7" fill="#f4a261" /><polygon points="30,80 31,72 35,78" fill="#f4a261" /><polygon points="42,80 41,72 37,78" fill="#f4a261" /><polygon points="31.5,79 32,75 34,78" fill="#ffafcc" />
      <path d="M33 85q1-1 2 0M37 85q1-1 2 0" stroke="#5a3e2b" strokeWidth=".8" fill="none" /><path d="M35 88l1 .8 1-.8" stroke="#5a3e2b" strokeWidth=".6" fill="none" />
      <path d="M33 92h12" stroke="#e63946" strokeWidth="2.4" /><path d="M28 100q-6 2-4 8" stroke="#f4a261" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g stroke="#e76f51" strokeWidth=".8"><path d="M32 96l4 2M34 102l4 1" /></g></g>
    <g><ellipse cx="76" cy="100" rx="6" ry="5" fill="#adb5bd" /><circle cx="72" cy="94" r="4" fill="#adb5bd" /><circle cx="69.5" cy="91" r="2.4" fill="#adb5bd" /><circle cx="69.5" cy="91" r="1.4" fill="#ffafcc" /><circle cx="71" cy="94" r=".7" fill="#222" /><path d="M82 102q6 2 4 6" stroke="#adb5bd" fill="none" /></g>
    <path d="M46 92Q58 82 70 90" stroke="#ffd166" strokeWidth=".8" strokeDasharray="1.5 1.5" fill="none" />
    <g fill="#ffd166"><path d="M52 86q2-3 4 0q-2 3-4 0z" /></g>
    <g fill="#fff" opacity=".85"><path d="M20 30q3-3 6 0q-3 1-6 0z" /><path d="M28 24q2-2 4 0q-2 1-4 0z" /></g>
  </Svg>],

  [186, 'บ้านหลังเล็กในหลอดไฟ', <Svg>
    <defs>
      <radialGradient id="p186b" cx=".5" cy=".55"><stop stopColor="#fff8d6" stopOpacity=".5" /><stop offset=".7" stopColor="#ffd166" stopOpacity=".15" /><stop offset="1" stopColor="#fff3b0" stopOpacity=".5" /></radialGradient>
      <radialGradient id="p186g"><stop stopColor="#ffd166" stopOpacity=".45" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
      <linearGradient id="p186m" x2="1" y2="0"><stop stopColor="#6c757d" /><stop offset=".5" stopColor="#ced4da" /><stop offset="1" stopColor="#6c757d" /></linearGradient>
      <linearGradient id="p186n" x2="0" y2="1"><stop stopColor="#0b132b" /><stop offset="1" stopColor="#1c2541" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="#06070e" />
    <circle cx="60" cy="88" r="60" fill="url(#p186g)" />
    <line x1="60" y1="0" x2="60" y2="26" stroke="#3a3a3a" strokeWidth="1.2" />
    <rect x="51" y="26" width="18" height="16" rx="2" fill="url(#p186m)" /><g stroke="#495057" strokeWidth=".8">{[30, 34, 38].map(y => <line key={y} x1="51" y1={y} x2="69" y2={y + 1.5} />)}</g>
    <path d="M52 42Q22 58 24 90Q26 124 60 128Q94 124 96 90Q98 58 68 42Z" fill="url(#p186n)" opacity=".9" />
    <St p={[40, 62, .6, 52, 54, .5, 76, 58, .7, 84, 72, .5, 36, 80, .4, 66, 66, .5]} />
    <path d="M70 60a6 6 0 1 0 5 8a4.5 4.5 0 1 1-5-8z" fill="#fff4c2" />
    <path d="M30 116Q44 100 60 106Q76 98 90 114Q80 126 60 127Q40 126 30 116Z" fill="#6a994e" />
    <path d="M40 112q8-4 14 0" stroke="#a7c957" strokeWidth=".8" fill="none" />
    <g transform="translate(36 114)"><path d="M0 0L5-14L10 0Z" fill="#1b4332" /><path d="M2-5L5-12L8-5Z" fill="#2d6a4f" /></g><g transform="translate(78 114)"><path d="M0 0L4-11L8 0Z" fill="#1b4332" /></g>
    <rect x="50" y="98" width="20" height="14" fill="#e76f51" /><polygon points="47,99 60,88 73,99" fill="#6b4226" /><rect x="64" y="90" width="3" height="5" fill="#6b4226" />
    <rect x="53" y="102" width="5" height="5" fill="#ffd166" /><rect x="62" y="104" width="5" height="8" fill="#5a3e2b" /><circle cx="55.5" cy="104.5" r="5" fill="url(#p186g)" />
    <path d="M60 112q0 6 4 12" stroke="#ddb892" strokeWidth="1.2" fill="none" />
    <g fill="#fff" opacity=".7"><circle cx="66" cy="86" r="1" /><circle cx="68" cy="82" r="1.3" /></g>
    <path d="M52 42Q22 58 24 90Q26 124 60 128Q94 124 96 90Q98 58 68 42Z" fill="url(#p186b)" stroke="#fff3b0" strokeWidth="1" />
    <path d="M32 70Q34 56 46 50" stroke="#fff" strokeWidth="2.4" fill="none" opacity=".55" strokeLinecap="round" />
  </Svg>],

  [59, 'ไอติมละลายบนทางเท้า', <Svg>
    <defs>
      <linearGradient id="p59s" x2="0" y2="1"><stop stopColor="#ffd60a" /><stop offset="1" stopColor="#ff9e00" /></linearGradient>
      <radialGradient id="p59u"><stop stopColor="#fffbe0" /><stop offset=".4" stopColor="#fff3a0" stopOpacity=".6" /><stop offset="1" stopColor="#fff3a0" stopOpacity="0" /></radialGradient>
      <linearGradient id="p59p" x2="0" y2="1"><stop stopColor="#c9ced6" /><stop offset="1" stopColor="#8d99ae" /></linearGradient>
      <linearGradient id="p59i" x2="1" y2="1"><stop stopColor="#ffc8dd" /><stop offset="1" stopColor="#ff8fab" /></linearGradient>
      <linearGradient id="p59c" x2="1" y2="0"><stop stopColor="#e0a96d" /><stop offset="1" stopColor="#a8743c" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#p59s)" />
    <circle cx="96" cy="22" r="40" fill="url(#p59u)" /><circle cx="96" cy="22" r="11" fill="#fffbe0" />
    <g stroke="#fff3a0" strokeWidth="1.6" strokeLinecap="round">{[0, 45, 90, 135, 180, 225, 270, 315].map(a => <line key={a} x1={96 + 15 * Math.cos(a * Math.PI / 180)} y1={22 + 15 * Math.sin(a * Math.PI / 180)} x2={96 + 20 * Math.cos(a * Math.PI / 180)} y2={22 + 20 * Math.sin(a * Math.PI / 180)} />)}</g>
    <path d="M10 70q4-4 0-8t0-8M24 74q4-4 0-8t0-8M40 70q4-4 0-8" stroke="#fff" strokeWidth="1" fill="none" opacity=".5" />
    <path d="M0 94H120V160H0Z" fill="url(#p59p)" /><g stroke="#6c757d" strokeWidth=".8"><path d="M0 116H120M0 140H120M30 94L22 160M80 94L88 160" /></g>
    <path d="M0 94h120" stroke="#e9ecef" strokeWidth="1.5" />
    <path d="M62 124Q90 118 96 128Q100 140 78 144Q50 150 34 140Q24 130 40 124Q50 120 62 124Z" fill="url(#p59i)" />
    <path d="M46 128q10-4 20 0" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".7" /><g fill="#ff8fab"><circle cx="30" cy="144" r="2" /><circle cx="100" cy="134" r="1.5" /></g>
    <g fill="#ff4d6d"><rect x="50" y="130" width="2" height="1" rx=".5" /><rect x="70" y="136" width="2" height="1" rx=".5" transform="rotate(40 71 136)" /></g><g fill="#80ed99"><rect x="60" y="138" width="2" height="1" rx=".5" /></g>
    <g transform="rotate(-28 72 116)"><path d="M62 118L82 118L72 92Z" fill="url(#p59c)" transform="rotate(180 72 112)" /><g stroke="#8a5a2b" strokeWidth=".6" transform="rotate(180 72 112)"><path d="M65 112l9 6M68 106l9 8M71 100l6 6M79 112l-9 6M76 106l-9 8" /></g></g>
    <g fill="#212529">{[[18, 150], [24, 147], [30, 145], [100, 152], [94, 148], [90, 142], [106, 156]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="1.6" ry="1" /><ellipse cx={x + 2.2} cy={y} rx="1.2" ry=".9" /><circle cx={x + 3.8} cy={y - .2} r=".9" /><path d={`M${x} ${y}l-1 2M${x + 2} ${y}l0 2M${x + 2} ${y}l1-2`} stroke="#212529" strokeWidth=".4" /></g>)}</g>
  </Svg>],
];
