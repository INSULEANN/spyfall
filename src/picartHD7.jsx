// ภาพการ์ดแบบละเอียด ชุด 7 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;

export const HD7 = [
  [86, 'แรคคูนขโมยพาย', <Svg>
    <defs>
      <linearGradient id="r86w" x2="0" y2="1"><stop stopColor="#f2cc8f" /><stop offset="1" stopColor="#e07a5f" /></linearGradient>
      <linearGradient id="r86n" x2="0" y2="1"><stop stopColor="#14213d" /><stop offset="1" stopColor="#2b2d5a" /></linearGradient>
      <radialGradient id="r86k"><stop stopColor="#fff3c4" stopOpacity=".8" /><stop offset="1" stopColor="#fff3c4" stopOpacity="0" /></radialGradient>
      <linearGradient id="r86f" x2="0" y2="1"><stop stopColor="#adb5bd" /><stop offset="1" stopColor="#6c757d" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#r86n)" />
    <St p={[8, 8, .6, 104, 14, .7, 112, 40, .5, 6, 60, .5]} />
    <rect x="12" y="18" width="96" height="92" fill="#8d6e63" /><rect x="18" y="24" width="84" height="80" fill="url(#r86w)" />
    <circle cx="60" cy="50" r="40" fill="url(#r86k)" />
    <g fill="#6d4c41"><rect x="26" y="34" width="28" height="3" /><rect x="66" y="34" width="28" height="3" /></g><g><rect x="28" y="22" width="5" height="12" fill="#c1121f" /><rect x="34" y="26" width="4" height="8" fill="#e9c46a" /><path d="M72 34v-8h10v8" fill="#fff" stroke="#adb5bd" /><path d="M86 34q4-12 8 0" fill="#2a9d8f" /></g>
    <path d="M58 24v80M18 64h84" stroke="#6d4c41" strokeWidth="3" /><rect x="18" y="24" width="84" height="80" fill="none" stroke="#6d4c41" strokeWidth="3" />
    <path d="M18 24Q28 50 22 104H18Z" fill="#ffafcc" opacity=".7" /><path d="M102 24Q92 50 98 104H102Z" fill="#ffafcc" opacity=".7" />
    <rect x="6" y="104" width="108" height="8" rx="2" fill="#a1887f" /><rect y="112" width="120" height="48" fill="#5d4037" /><g stroke="#4e342e">{[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M${i * 20 + (i % 2) * 10} 112v48`} />)}<path d="M0 126h120M0 140h120" /></g>
    <ellipse cx="82" cy="102" rx="16" ry="4" fill="#d4a373" /><path d="M66 102q16-10 32 0" fill="#e9c46a" /><path d="M70 100l4-4M78 98l3-4M86 98l2-4M92 100l2-3" stroke="#a47148" /><g fill="#9d0208"><circle cx="76" cy="99" r="1" /><circle cx="88" cy="98" r="1" /></g>
    <path d="M82 92q-2-4 0-8M88 92q2-4 0-8" stroke="#fff" strokeWidth=".8" fill="none" opacity=".6" />
    <g><ellipse cx="42" cy="100" rx="15" ry="10" fill="url(#r86f)" /><circle cx="42" cy="86" r="10" fill="#ced4da" /><polygon points="33,80 34,72 39,79" fill="#6c757d" /><polygon points="51,80 50,72 45,79" fill="#6c757d" />
      <path d="M32 86q10-6 20 0q-1 5-10 5t-10-5z" fill="#212529" /><circle cx="38" cy="87" r="1.6" fill="#fff" /><circle cx="46" cy="87" r="1.6" fill="#fff" /><circle cx="38.4" cy="87" r=".8" fill="#000" /><circle cx="46.4" cy="87" r=".8" fill="#000" />
      <ellipse cx="42" cy="93" rx="4" ry="2.4" fill="#f8f9fa" /><circle cx="42" cy="92" r="1.2" fill="#212529" />
      <path d="M54 98q8-2 14-1" stroke="url(#r86f)" strokeWidth="4" strokeLinecap="round" /><circle cx="68" cy="97" r="2.2" fill="#495057" /></g>
    <path d="M28 104q-14 2-16 14" stroke="#495057" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
    <g fill="#e9c46a"><circle cx="60" cy="108" r=".8" /><circle cx="64" cy="110" r=".6" /></g>
  </Svg>],

  [87, 'กล้องดูดาวบนหลังคา', <Svg>
    <defs>
      <linearGradient id="r87s" x2="0" y2="1"><stop stopColor="#10002b" /><stop offset=".6" stopColor="#3c096c" /><stop offset="1" stopColor="#5a189a" /></linearGradient>
      <radialGradient id="r87h"><stop stopColor="#ff8fab" stopOpacity=".8" /><stop offset="1" stopColor="#ff8fab" stopOpacity="0" /></radialGradient>
      <linearGradient id="r87t" x2="0" y2="1"><stop stopColor="#e0c3fc" /><stop offset="1" stopColor="#9d8ec4" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#r87s)" />
    <St p={[8, 10, .7, 26, 30, .5, 44, 8, .6, 70, 44, .4, 100, 60, .6, 112, 10, .5, 16, 64, .5, 54, 26, .4, 84, 70, .4, 30, 80, .5]} />
    <path d="M0 60Q60 30 120 50" stroke="#c77dff" strokeWidth="10" fill="none" opacity=".12" />
    <circle cx="92" cy="26" r="20" fill="url(#r87h)" />
    <path d="M92 36l-8-8a5 5 0 0 1 8-6a5 5 0 0 1 8 6z" fill="#ff8fab" /><path d="M86 24a3 3 0 0 1 4-2" stroke="#fff" strokeWidth=".8" fill="none" />
    <path d="M0 160V122L60 98L120 122V160Z" fill="#240046" /><g stroke="#3c096c" strokeWidth="2">{[0, 1, 2, 3, 4].map(i => <path key={i} d={`M0 ${130 + i * 7}L60 ${106 + i * 7}L120 ${130 + i * 7}`} fill="none" />)}</g>
    <rect x="86" y="96" width="8" height="18" fill="#3c096c" /><rect x="84" y="94" width="12" height="3" fill="#5a189a" />
    <g fill="#ffd166"><rect x="24" y="140" width="6" height="7" /></g>
    <g transform="rotate(-38 52 98)"><rect x="40" y="92" width="34" height="9" rx="2" fill="url(#r87t)" /><rect x="74" y="90" width="6" height="13" rx="1" fill="#7b6ca6" /><rect x="36" y="94" width="5" height="5" fill="#5a4f80" /><path d="M44 92v9M56 92v9" stroke="#7b6ca6" /></g>
    <path d="M52 100l-7 14M52 100l7 14M52 100v14" stroke="#9d8ec4" strokeWidth="1.4" />
    <path d="M78 66Q86 48 90 36" stroke="#ffd6e0" strokeWidth=".6" strokeDasharray="1.5 2" fill="none" />
    <g><circle cx="36" cy="98" r="4.4" fill="#f1c27d" /><path d="M31 96q5-6 10 0q-2-4-5-4t-5 4z" fill="#3a2a1a" /><path d="M31 102h10l2 12H29z" fill="#ef476f" /><path d="M41 104l6-4" stroke="#ef476f" strokeWidth="2.4" strokeLinecap="round" /><path d="M31 114l-2 6M39 114l2 6" stroke="#264653" strokeWidth="2.4" strokeLinecap="round" /></g>
    <g transform="translate(18 110)"><path d="M-4 0a4 3 0 0 1 8 0z" fill="#ffb703" /><rect x="-4" y="0" width="8" height="2" fill="#6b4226" /></g>
  </Svg>],

  [89, 'หม้อทองที่ว่างเปล่า', <Svg>
    <defs>
      <linearGradient id="r89s" x2="0" y2="1"><stop stopColor="#8ecae6" /><stop offset="1" stopColor="#e0fbfc" /></linearGradient>
      <linearGradient id="r89g" x2="0" y2="1"><stop stopColor="#80b918" /><stop offset="1" stopColor="#386641" /></linearGradient>
      <linearGradient id="r89p" x2="1" y2="0"><stop stopColor="#212529" /><stop offset=".4" stopColor="#495057" /><stop offset="1" stopColor="#111" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#r89s)" />
    <g fill="#fff" opacity=".9"><ellipse cx="24" cy="30" rx="16" ry="5" /><circle cx="20" cy="26" r="6" /><circle cx="28" cy="24" r="7" /></g>
    {['#e63946', '#f77f00', '#fcbf49', '#55a630', '#457b9d', '#7b2cbf'].map((c, i) => <path key={i} d={`M${-16 + i * 4.5} 150A${76 - i * 4.5} ${108 - i * 4.5} 0 0 1 ${112 - i * 4.5} 124`} stroke={c} strokeWidth="4.6" fill="none" opacity=".85" />)}
    <path d="M90 120q12-4 24 4" stroke="#fff" strokeWidth="10" fill="none" opacity=".5" />
    <path d="M0 128Q60 118 120 130V160H0Z" fill="url(#r89g)" />
    <g stroke="#2b9348" strokeWidth="1" strokeLinecap="round">{Array.from({ length: 20 }, (_, i) => { const x = (i * 37) % 118 + 1, y = 134 + (i * 13) % 24; return <path key={i} d={`M${x} ${y}l-1-4M${x + 2} ${y}l1-4`} />; })}</g>
    <ellipse cx="100" cy="132" rx="16" ry="3" fill="#000" opacity=".25" />
    <path d="M86 112H114L110 132H90Z" fill="url(#r89p)" /><ellipse cx="100" cy="112" rx="15" ry="3.6" fill="#495057" /><ellipse cx="100" cy="112" rx="12" ry="2.4" fill="#111" />
    <path d="M86 116q-4 2-2 6M114 116q4 2 2 6" stroke="#495057" strokeWidth="1.5" fill="none" />
    <g fill="#ffd60a" stroke="#c99700" strokeWidth=".5"><ellipse cx="80" cy="134" rx="3" ry="1.4" /></g>
    <g fill="#6c584c">{[[74, 140], [66, 144], [58, 140], [50, 146], [42, 142], [34, 148], [26, 144], [18, 150]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="2.4" ry="1.5" /><circle cx={x - 2.4} cy={y - 1.2} r=".6" /><circle cx={x - 2.6} cy={y} r=".6" /></g>)}</g>
    <g transform="translate(10 136)"><path d="M0 0l2-10 6 0 2 10z" fill="#2b9348" /><path d="M2-10l3-8 3 8z" fill="#2b9348" /><circle cx="5" cy="-6" r="2" fill="#f1c27d" /><path d="M2 0l-2 6M8 0l2 6" stroke="#212529" strokeWidth="1.4" /><path d="M8-6l6-2" stroke="#ffd60a" strokeWidth="2.6" strokeLinecap="round" /></g>
  </Svg>],

  [95, 'โทรศัพท์กระป๋องระหว่างบ้าน', <Svg>
    <defs>
      <linearGradient id="r95s" x2="0" y2="1"><stop stopColor="#ffb4a2" /><stop offset=".6" stopColor="#ffd6a5" /><stop offset="1" stopColor="#caffbf" /></linearGradient>
      <linearGradient id="r95c" x2="1" y2="0"><stop stopColor="#6c757d" /><stop offset=".5" stopColor="#dee2e6" /><stop offset="1" stopColor="#6c757d" /></linearGradient>
      <radialGradient id="r95w"><stop stopColor="#ffd166" stopOpacity=".7" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#r95s)" />
    <circle cx="60" cy="40" r="12" fill="#fff3c4" opacity=".9" />
    <path d="M0 140Q60 130 120 140V160H0Z" fill="#80b918" /><path d="M0 148h120" stroke="#55a630" strokeDasharray="2 3" />
    <rect x="2" y="78" width="36" height="64" fill="#ffafcc" /><polygon points="-2,80 20,58 42,80" fill="#c9184a" /><path d="M-2 80L20 58L42 80" stroke="#a4133c" fill="none" />
    <rect x="12" y="92" width="18" height="16" fill="#fff3b0" /><circle cx="21" cy="100" r="14" fill="url(#r95w)" /><path d="M21 92v16M12 100h18" stroke="#a4133c" strokeWidth="1.4" /><rect x="10" y="90" width="22" height="20" fill="none" stroke="#a4133c" strokeWidth="1.6" />
    <rect x="14" y="120" width="10" height="22" fill="#a4133c" /><rect x="28" y="64" width="5" height="10" fill="#a4133c" />
    <rect x="82" y="66" width="36" height="76" fill="#cdb4db" /><polygon points="78,68 100,46 122,68" fill="#6a4c93" /><path d="M78 68L100 46L122 68" stroke="#4a2c73" fill="none" />
    <rect x="90" y="80" width="18" height="16" fill="#fff3b0" /><circle cx="99" cy="88" r="14" fill="url(#r95w)" /><path d="M99 80v16M90 88h18" stroke="#4a2c73" strokeWidth="1.4" /><rect x="88" y="78" width="22" height="20" fill="none" stroke="#4a2c73" strokeWidth="1.6" />
    <rect x="96" y="114" width="10" height="28" fill="#4a2c73" />
    <path d="M30 100Q60 118 92 88" stroke="#555" strokeWidth=".8" fill="none" />
    <rect x="25" y="96" width="7" height="8" fill="url(#r95c)" /><rect x="89" y="84" width="7" height="8" fill="url(#r95c)" />
    <circle cx="21" cy="98" r="3.6" fill="#f1c27d" /><path d="M18 96q3-4 6 0" fill="#5a3e2b" /><circle cx="99" cy="86" r="3.6" fill="#e0ac69" /><path d="M95.6 85q3.4-5 7 0" fill="#212529" />
    <g fill="#ef476f"><path d="M58 104l-2-2a1.4 1.4 0 0 1 2-2a1.4 1.4 0 0 1 2 2z" /><path d="M68 96l-1.5-1.5a1 1 0 0 1 1.5-1.5a1 1 0 0 1 1.5 1.5z" /></g>
    <g fill="#333"><path d="M48 30q3-3 6 0q-3 1-6 0z" /></g>
  </Svg>],

  [96, 'ครีบฉลามในอ่างอาบน้ำ', <Svg>
    <defs>
      <linearGradient id="r96w" x2="0" y2="1"><stop stopColor="#e0fbfc" /><stop offset="1" stopColor="#c2dfe3" /></linearGradient>
      <linearGradient id="r96t" x2="0" y2="1"><stop stopColor="#ffffff" /><stop offset="1" stopColor="#d6dde4" /></linearGradient>
      <linearGradient id="r96a" x2="0" y2="1"><stop stopColor="#48cae4" /><stop offset="1" stopColor="#0077b6" /></linearGradient>
      <linearGradient id="r96f" x2="1" y2="0"><stop stopColor="#5c677d" /><stop offset="1" stopColor="#33415c" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#r96w)" />
    <g stroke="#b8d8de" strokeWidth=".8">{[16, 32, 48, 64, 80].map(y => <line key={y} x1="0" y1={y} x2="120" y2={y} />)}{[20, 40, 60, 80, 100].map(x => <line key={x} x1={x} y1="0" x2={x} y2="96" />)}</g>
    <rect y="96" width="120" height="64" fill="#98c1d9" /><g stroke="#7aa6c2">{[0, 1, 2, 3].map(i => <path key={i} d={`M0 ${110 + i * 14}H120`} />)}</g>
    <path d="M92 40V24a6 6 0 0 1 12 0" stroke="#adb5bd" strokeWidth="3" fill="none" /><circle cx="92" cy="42" r="3" fill="#adb5bd" /><g stroke="#90e0ef" strokeWidth=".8">{[88, 90, 92, 94, 96].map(x => <line key={x} x1={x} y1="46" x2={x + (x - 92) * .6} y2="60" />)}</g>
    <path d="M10 92H110V108Q110 132 86 132H34Q10 132 10 108Z" fill="url(#r96t)" stroke="#adb5bd" />
    <rect x="8" y="88" width="104" height="7" rx="3.5" fill="#fff" stroke="#adb5bd" />
    <path d="M16 134l-4 8M104 134l4 8" stroke="#c9a227" strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="60" cy="92" rx="48" ry="3" fill="url(#r96a)" />
    <path d="M52 92L64 66Q68 62 70 70L74 92Z" fill="url(#r96f)" /><path d="M58 88L65 70" stroke="#8d99ae" strokeWidth=".8" />
    <path d="M44 93q6-3 12 0M76 93q6-3 12 0" stroke="#fff" strokeWidth="1" fill="none" />
    <g fill="#fff" stroke="#d6dde4" strokeWidth=".6"><circle cx="20" cy="88" r="5" /><circle cx="27" cy="85" r="3.6" /><circle cx="14" cy="85" r="3" /><circle cx="98" cy="88" r="4" /><circle cx="104" cy="86" r="3" /><circle cx="34" cy="78" r="1.6" /><circle cx="40" cy="72" r="1" /></g>
    <g transform="translate(26 146)"><ellipse cx="0" cy="0" rx="9" ry="5" fill="#ffd166" /><circle cx="-6" cy="-5" r="4" fill="#ffd166" /><polygon points="-10,-5 -13,-4 -10,-3" fill="#f77f00" /><circle cx="-7" cy="-6" r=".7" fill="#222" /></g>
    <rect x="84" y="140" width="22" height="12" rx="2" fill="#ffafcc" /><path d="M84 144h22" stroke="#fff" />
  </Svg>],

  [97, 'ฟูกสิบชั้นกับเมล็ดถั่ว', <Svg>
    <defs>
      <linearGradient id="r97s" x2="0" y2="1"><stop stopColor="#3c096c" /><stop offset="1" stopColor="#7b2cbf" /></linearGradient>
      <radialGradient id="r97m" cx=".7" cy=".2"><stop stopColor="#fff4c2" stopOpacity=".6" /><stop offset="1" stopColor="#fff4c2" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#r97s)" /><rect width="120" height="160" fill="url(#r97m)" />
    <rect x="86" y="10" width="26" height="40" rx="13" fill="#10002b" /><circle cx="99" cy="26" r="6" fill="#fff4c2" /><path d="M99 10V50M86 30h26" stroke="#5a189a" strokeWidth="1.5" />
    <rect y="148" width="120" height="12" fill="#5a3e2b" />
    {['#e63946', '#f4a261', '#2a9d8f', '#457b9d', '#ffd166', '#9d4edd', '#06d6a0', '#ef476f', '#118ab2', '#ff8fab'].map((c, i) => <g key={i}><rect x={24 + (i % 3) * 2 - (i % 2)} y={136 - i * 8.4} width="70" height="8.6" rx="4" fill={c} /><path d={`M${28 + (i % 3) * 2} ${139 - i * 8.4}h62`} stroke="#fff" strokeWidth=".6" strokeDasharray="2 2" opacity=".6" /></g>)}
    <rect x="20" y="144" width="80" height="4" fill="#6b4226" /><rect x="22" y="148" width="4" height="8" fill="#6b4226" /><rect x="94" y="148" width="4" height="8" fill="#6b4226" />
    <circle cx="74" cy="142" r="2.4" fill="#55a630" /><circle cx="73.4" cy="141.4" r=".7" fill="#b5e48c" />
    <g transform="translate(60 44)"><path d="M-14 10Q-14 2 0 0Q14 2 14 10Z" fill="#fff" /><path d="M-14 10h28" stroke="#dee2e6" /><circle cx="0" cy="-4" r="7" fill="#f1c27d" /><path d="M-7-6q7-8 14 0q-2-6-7-6t-7 6z" fill="#e9c46a" /><path d="M-7-6q-2 10 0 14M7-6q2 10 0 14" stroke="#e9c46a" strokeWidth="2" fill="none" />
      <polygon points="-5,-11 -4,-16 -1,-13 0,-17 1,-13 4,-16 5,-11" fill="#ffd60a" /><path d="M-4-3q1.5-1 3 0M1-3q1.5-1 3 0" stroke="#5a3e2b" strokeWidth=".8" fill="none" /><path d="M-2 1q2-1 4 0" stroke="#a24a3a" strokeWidth=".7" fill="none" />
      <path d="M-14 4q-6-2-8 2" stroke="#f1c27d" strokeWidth="2" strokeLinecap="round" /></g>
    <path d="M44 26q-2-4 0-6M40 30q-4-4-2-8" stroke="#e0aaff" strokeWidth=".7" fill="none" />
  </Svg>],

  [98, 'ยูเอฟโอดูดวัว', <Svg>
    <defs>
      <linearGradient id="r98s" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset="1" stopColor="#1b263b" /></linearGradient>
      <linearGradient id="r98b" x2="0" y2="1"><stop stopColor="#c6ff8a" stopOpacity=".5" /><stop offset="1" stopColor="#c6ff8a" stopOpacity=".05" /></linearGradient>
      <linearGradient id="r98u" x2="0" y2="1"><stop stopColor="#dee2e6" /><stop offset=".5" stopColor="#adb5bd" /><stop offset="1" stopColor="#6c757d" /></linearGradient>
      <radialGradient id="r98d" cx=".4" cy=".3"><stop stopColor="#caf0f8" /><stop offset="1" stopColor="#48cae4" stopOpacity=".7" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#r98s)" />
    <St p={[8, 10, .6, 24, 52, .5, 104, 12, .7, 112, 66, .5, 14, 90, .4, 96, 84, .4, 60, 6, .5]} />
    <path d="M48 42H72L100 142H20Z" fill="url(#r98b)" />
    <g stroke="#c6ff8a" strokeWidth=".6" opacity=".5">{[60, 80, 100, 120].map(y => <ellipse key={y} cx="60" cy={y} rx={14 + (y - 42) * .32} ry="2" fill="none" />)}</g>
    <path d="M38 32a22 16 0 0 1 44 0z" fill="url(#r98d)" /><g fill="#80ed99"><circle cx="56" cy="26" r="3" /><circle cx="64" cy="26" r="2.6" /></g><g fill="#000"><ellipse cx="55" cy="25" rx="1" ry="1.4" /><ellipse cx="63" cy="25" rx="1" ry="1.4" /></g>
    <ellipse cx="60" cy="36" rx="38" ry="10" fill="url(#r98u)" /><ellipse cx="60" cy="33" rx="38" ry="5" fill="#e9ecef" opacity=".6" />
    <g fill="#ffd60a">{[30, 42, 54, 66, 78, 90].map((x, i) => <circle key={x} cx={x} cy={38 + Math.abs(2.5 - i) * -.6} r="1.8" />)}</g>
    <ellipse cx="60" cy="44" rx="14" ry="3" fill="#495057" />
    <path d="M0 140Q30 130 60 138T120 134V160H0Z" fill="#132a13" /><g stroke="#31572c" strokeWidth=".8">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 9 + 3} ${144 + (i % 3) * 4}l-1-3M${i * 9 + 5} ${144 + (i % 3) * 4}l1-3`} />)}</g>
    <path d="M96 140V122L106 116L116 122V140Z" fill="#6a040f" /><rect x="102" y="128" width="6" height="12" fill="#3d0006" />
    <g transform="rotate(-24 60 98)"><ellipse cx="60" cy="98" rx="15" ry="9" fill="#fff" /><path d="M54 92q4 6 0 10M66 94q6 2 4 8" fill="#212529" /><ellipse cx="77" cy="92" rx="6.5" ry="5" fill="#fff" /><ellipse cx="81" cy="94" rx="3.2" ry="2.6" fill="#ffafcc" /><circle cx="76" cy="90" r="1" fill="#000" /><path d="M74 86l-2-3M78 86l1-3" stroke="#adb5bd" strokeWidth="1.2" />
      <path d="M50 106v6M57 107v6M64 107v6M70 106v6" stroke="#212529" strokeWidth="2" strokeLinecap="round" /><path d="M45 96q-6 2-6 8" stroke="#fff" strokeWidth="1.4" fill="none" /><ellipse cx="62" cy="106" rx="3" ry="2" fill="#ffafcc" /></g>
    <path d="M86 98q4-2 6 0M88 104q3-1 5 0" stroke="#fff" strokeWidth=".7" fill="none" opacity=".7" />
  </Svg>],

  [101, 'ขนนกตกบนแมวหลับ', <Svg>
    <defs>
      <linearGradient id="r101s" x2="0" y2="1"><stop stopColor="#fbf7ef" /><stop offset="1" stopColor="#efe4cf" /></linearGradient>
      <radialGradient id="r101l" cx=".8" cy="0"><stop stopColor="#fff8dc" /><stop offset="1" stopColor="#fff8dc" stopOpacity="0" /></radialGradient>
      <linearGradient id="r101c" x2="0" y2="1"><stop stopColor="#f4a261" /><stop offset="1" stopColor="#d9783c" /></linearGradient>
      <linearGradient id="r101f" x2="1" y2="0"><stop stopColor="#a2d2ff" /><stop offset="1" stopColor="#cdb4db" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#r101s)" /><rect width="120" height="160" fill="url(#r101l)" />
    <rect x="76" y="0" width="44" height="70" fill="#e6efe9" opacity=".6" /><path d="M76 0V70M98 0V70M76 35h44" stroke="#d6c7a8" strokeWidth="2" />
    <rect y="122" width="120" height="38" fill="#c9a77c" /><path d="M0 122h120" stroke="#e3c79d" strokeWidth="1.5" />
    <ellipse cx="60" cy="126" rx="44" ry="10" fill="#9d4edd" opacity=".85" /><ellipse cx="60" cy="124" rx="40" ry="8" fill="#b77ff0" />
    <g fill="#e0aaff" opacity=".7">{[[36, 124], [50, 128], [72, 126], [86, 122]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" />)}</g>
    <path d="M26 118Q24 96 52 94Q82 92 92 110Q96 122 82 124H36Q26 124 26 118Z" fill="url(#r101c)" />
    <path d="M40 98q4 6 2 12M54 94q2 6 0 10M68 96q-2 6 0 10" stroke="#c46a2e" strokeWidth="2" fill="none" opacity=".6" />
    <path d="M30 118Q16 120 18 108Q20 100 28 104" stroke="url(#r101c)" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M86 112q-6-12 2-18l4 6 6-6q4 8-2 16q-4 4-10 2z" fill="url(#r101c)" /><path d="M88 96l2 4M96 94l-1 4" stroke="#ffafcc" strokeWidth="1.4" />
    <path d="M84 108q2 2 4 0M92 108q2 2 4 0" stroke="#3a2a1a" strokeWidth=".9" fill="none" /><path d="M89 112l1 1 1-1" stroke="#3a2a1a" strokeWidth=".6" fill="none" />
    <g stroke="#3a2a1a" strokeWidth=".35"><path d="M86 112l-8-1M86 113l-8 2M94 112l7-2M94 113l7 1" /></g>
    <g transform="translate(70 52) rotate(-24)"><path d="M0 0Q6 12 0 30Q-6 12 0 0Z" fill="url(#r101f)" /><path d="M0 2V34" stroke="#7b6ca6" strokeWidth=".7" /><g stroke="#fff" strokeWidth=".5" opacity=".8">{[6, 10, 14, 18, 22].map(y => <path key={y} d={`M0 ${y}l-4-3M0 ${y}l4-3`} />)}</g></g>
    <path d="M70 84q-4 8 0 10" stroke="#cdb4db" strokeWidth=".6" strokeDasharray="1 2" fill="none" />
    <g fill="#c9b8a0"><path d="M100 82q2-2 4 0M106 76q1.5-1.5 3 0" stroke="#a89a80" strokeWidth=".8" fill="none" /></g>
  </Svg>],
];
