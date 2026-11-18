// ภาพการ์ดแบบละเอียด ชุด 25 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD25 = [
  [185, 'บันไดหนังสือสู่หน้าต่าง', <Svg>
    <defs>
      <linearGradient id="j185s" x2="0" y2="1"><stop stopColor="#f8edeb" /><stop offset="1" stopColor="#fcd5ce" /></linearGradient>
      <linearGradient id="j185w" x2="0" y2="1"><stop stopColor="#8ecae6" /><stop offset="1" stopColor="#d4f1f9" /></linearGradient>
      <radialGradient id="j185l" cx=".75" cy=".2"><stop stopColor="#fff8dc" stopOpacity=".9" /><stop offset="1" stopColor="#fff8dc" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#j185s)" />
    <g stroke="#f4c6bd" strokeWidth=".7">{[20, 40, 60, 80, 100].map(x => <path key={x} d={`M${x} 0V150`} />)}</g>
    <rect x="66" y="16" width="42" height="50" fill="url(#j185w)" /><Cl x={84} y={34} s={.6} /><circle cx="100" cy="24" r="4" fill="#fff3b0" />
    <path d="M87 16V66M66 41H108" stroke="#b5838d" strokeWidth="2.4" /><rect x="64" y="14" width="46" height="54" fill="none" stroke="#b5838d" strokeWidth="3.4" /><rect x="62" y="66" width="50" height="4" fill="#9d8189" />
    <path d="M66 70L40 150H120V70Z" fill="url(#j185l)" />
    {[[6, 138, 54, '#e63946'], [12, 126, 50, '#457b9d'], [20, 114, 46, '#2a9d8f'], [28, 102, 42, '#f4a261'], [36, 90, 38, '#6d597a'], [44, 78, 32, '#e9c46a'], [52, 68, 24, '#e76f51']].map(([x, y, w, c], i) => <g key={i}><rect x={x} y={y} width={w} height="12" fill={c} /><rect x={x + w - 3} y={y + 1} width="3" height="10" fill="#fdf6ec" /><path d={`M${x + w - 3} ${y + 4}h3M${x + w - 3} ${y + 7}h3`} stroke="#d6ccc2" strokeWidth=".4" /><path d={`M${x + 4} ${y + 6}h${w - 14}`} stroke="#fff" strokeWidth="1" opacity=".5" /></g>)}
    <rect y="150" width="120" height="10" fill="#b5838d" /><path d="M0 150h120" stroke="#e5989b" />
    <g transform="translate(62 58)"><circle cx="0" cy="-4" r="3.4" fill="#f1c27d" /><path d="M-3.4-6q3.4-4 6.8 0" fill="#5a3e2b" /><path d="M-3-1h6l1 9h-8z" fill="#4361ee" /><path d="M3 0l4-5" stroke="#f1c27d" strokeWidth="1.6" strokeLinecap="round" /><path d="M-2 8l-1 4M2 8l1 4" stroke="#264653" strokeWidth="1.6" strokeLinecap="round" /></g>
    <g fill="#fff" opacity=".8">{[[96, 56], [80, 60]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 2}l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z`} />)}</g>
  </Svg>],

  [187, 'ไก่ขันใส่พระจันทร์', <Svg>
    <defs>
      <linearGradient id="j187s" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset="1" stopColor="#1b263b" /></linearGradient>
      <radialGradient id="j187m" cx=".35" cy=".35"><stop stopColor="#fffbe6" /><stop offset="1" stopColor="#efdf9e" /></radialGradient>
      <radialGradient id="j187g"><stop stopColor="#fff4c2" stopOpacity=".5" /><stop offset="1" stopColor="#fff4c2" stopOpacity="0" /></radialGradient>
      <radialGradient id="j187r" cx=".4" cy=".3"><stop stopColor="#ffe066" /><stop offset="1" stopColor="#d48c00" /></radialGradient>
      <linearGradient id="j187t" x2="1" y2="1"><stop stopColor="#e76f51" /><stop offset="1" stopColor="#6a040f" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#j187s)" />
    <St p={[8, 10, .6, 30, 30, .5, 64, 8, .6, 112, 50, .5, 20, 60, .4, 50, 46, .4]} />
    <circle cx="88" cy="38" r="34" fill="url(#j187g)" /><circle cx="88" cy="38" r="14" fill="url(#j187m)" /><g fill="#e6d48c" opacity=".7"><circle cx="84" cy="34" r="2.4" /><circle cx="92" cy="42" r="3" /></g>
    <path d="M0 160V132L20 126L40 134V160Z" fill="#0b0f1e" />
    <rect x="8" y="110" width="74" height="7" rx="1" fill="#5c4033" /><path d="M8 112h74" stroke="#7f5539" /><rect x="14" y="117" width="4" height="43" fill="#5c4033" /><rect x="72" y="117" width="4" height="43" fill="#5c4033" /><path d="M14 130h62" stroke="#5c4033" strokeWidth="3" />
    <g><path d="M30 92q-14-10-8-22q4 8 12 10M30 96q-16-4-16-16M32 100q-14 0-18-10" stroke="url(#j187t)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <ellipse cx="44" cy="96" rx="13" ry="10.6" fill="url(#j187r)" /><path d="M36 92q8 6 16 2" stroke="#d48c00" strokeWidth=".8" fill="none" />
      <path d="M50 92Q56 84 54 76" stroke="url(#j187r)" strokeWidth="9" fill="none" strokeLinecap="round" />
      <circle cx="56" cy="74" r="6.6" fill="url(#j187r)" /><path d="M51 70q2-7 4-2q2-5 4 0q2-3 2 4" fill="#e63946" /><path d="M58 80q2 4 0 7q-2-3 0-7z" fill="#e63946" />
      <path d="M61 72L70 70L62 77Z" fill="#f77f00" /><path d="M61 75l7-1" stroke="#c44536" strokeWidth=".6" /><circle cx="58" cy="72" r="1.1" fill="#222" />
      <path d="M42 106v5M48 106v5" stroke="#f77f00" strokeWidth="2" /><path d="M40 111h4M46 111h4" stroke="#f77f00" strokeWidth="1.4" /></g>
    <g stroke="#fff4c2" strokeWidth="1" fill="none" opacity=".8" strokeLinecap="round"><path d="M70 68q4-3 6-8" /><path d="M72 74q6-1 9-5" /><path d="M72 80q6 1 10-2" /></g>
  </Svg>],

  [188, 'ยักษ์ตาเดียวขี้อายหลังต้นไม้', <Svg>
    <defs>
      <linearGradient id="j188s" x2="0" y2="1"><stop stopColor="#b5e48c" /><stop offset="1" stopColor="#52b69a" /></linearGradient>
      <linearGradient id="j188t" x2="1" y2="0"><stop stopColor="#4a2c18" /><stop offset=".5" stopColor="#8b5a3a" /><stop offset="1" stopColor="#3a2010" /></linearGradient>
      <radialGradient id="j188m" cx=".35" cy=".3"><stop stopColor="#e0aaff" /><stop offset="1" stopColor="#7b2cbf" /></radialGradient>
      <radialGradient id="j188e" cx=".45" cy=".4"><stop stopColor="#fff" /><stop offset="1" stopColor="#e9ecef" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#j188s)" />
    <g fill="#2b9348" opacity=".6"><circle cx="20" cy="30" r="22" /><circle cx="100" cy="20" r="18" /></g>
    <rect y="140" width="120" height="20" fill="#2b9348" /><g fill="#55a630">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 10 + 3} 142l2-6 2 6z`} />)}</g>
    <ellipse cx="84" cy="82" rx="27" ry="42" fill="url(#j188m)" /><g fill="#9d4edd" opacity=".6">{[[94, 60], [100, 80], [92, 104], [104, 96]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.4" />)}</g>
    <path d="M80 42l-3-10M92 44l3-10" stroke="#3c096c" strokeWidth="3.4" strokeLinecap="round" />
    <path d="M64 120Q72 128 82 124M100 120q4 8 0 16" stroke="url(#j188m)" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M64 0Q58 70 70 140H38Q50 70 44 0Z" fill="url(#j188t)" /><g stroke="#2a1608" strokeWidth=".8" fill="none"><path d="M52 20q4 20 0 40M58 70q-4 20 2 40M50 100q2 10 0 20" /></g>
    <path d="M68 58Q76 60 78 70M66 92q8-2 12 4" stroke="url(#j188m)" strokeWidth="6" fill="none" strokeLinecap="round" /><g fill="#9d4edd">{[[78, 70], [78, 96]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" />)}</g>
    <circle cx="82" cy="64" r="11" fill="url(#j188e)" stroke="#3c096c" strokeWidth=".8" /><circle cx="78" cy="64" r="5.6" fill="#3a86ff" /><circle cx="77" cy="64" r="3" fill="#111" /><circle cx="76" cy="62" r="1.4" fill="#fff" />
    <path d="M71 56q10-6 20 0" stroke="#3c096c" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <path d="M74 82q4 2 8 0" stroke="#3c096c" strokeWidth="1.6" fill="none" strokeLinecap="round" /><ellipse cx="70" cy="76" rx="4.4" ry="2.4" fill="#ff8fab" opacity=".7" /><ellipse cx="92" cy="76" rx="4" ry="2.4" fill="#ff8fab" opacity=".7" />
    <g fill="#fff" opacity=".8"><path d="M98 50q2-3 4 0M102 56q2-3 4 0" stroke="#fff" strokeWidth=".8" fill="none" /></g>
    <g fill="#ff70a6">{[[20, 146], [108, 150]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="2" /><circle cx={x} cy={y} r=".8" fill="#ffd166" /></g>)}</g>
  </Svg>],

  [189, 'ทหารของเล่นเฝ้าคุกกี้', <Svg>
    <defs>
      <linearGradient id="j189s" x2="0" y2="1"><stop stopColor="#fefae0" /><stop offset="1" stopColor="#e9edc9" /></linearGradient>
      <radialGradient id="j189c" cx=".4" cy=".35"><stop stopColor="#f4d58d" /><stop offset="1" stopColor="#c48a3a" /></radialGradient>
      <linearGradient id="j189r" x2="1" y2="0"><stop stopColor="#9d0208" /><stop offset=".5" stopColor="#e63946" /><stop offset="1" stopColor="#6a040f" /></linearGradient>
      <linearGradient id="j189b" x2="1" y2="0"><stop stopColor="#111" /><stop offset=".5" stopColor="#3a3a3a" /><stop offset="1" stopColor="#000" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#j189s)" />
    <g stroke="#e9e1c4" strokeWidth=".8">{[30, 60, 90].map(x => <path key={x} d={`M${x} 0V120`} />)}</g>
    <rect y="120" width="120" height="40" fill="#d4a373" /><path d="M0 120h120" stroke="#e9c49a" strokeWidth="1.5" /><g stroke="#a87442" strokeWidth=".5"><path d="M0 134q60-4 120 0M0 148q60-4 120 0" fill="none" /></g>
    <ellipse cx="82" cy="138" rx="24" ry="4" fill="#8a5a2b" opacity=".4" />
    <circle cx="82" cy="116" r="22" fill="url(#j189c)" /><circle cx="82" cy="116" r="22" fill="none" stroke="#a8743c" strokeWidth="1" />
    <g fill="#4a2c18">{[[74, 106, 2.6], [88, 110, 2.4], [80, 122, 2.8], [92, 124, 2], [70, 118, 2.2], [84, 100, 1.8], [96, 116, 1.6]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <g fill="#e9c48a" opacity=".6">{[[78, 112], [90, 118]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
    <path d="M100 104l6-4 2 4z" fill="url(#j189c)" /><g fill="#c48a3a">{[[108, 120], [104, 132]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.4" />)}</g>
    <g><rect x="28" y="50" width="18" height="18" rx="2" fill="url(#j189b)" /><rect x="27" y="66" width="20" height="3" fill="#ffd60a" /><circle cx="37" cy="54" r="1.4" fill="#ffd60a" />
      <circle cx="37" cy="74" r="6.4" fill="#f1c27d" /><circle cx="34.6" cy="74" r="1" fill="#222" /><circle cx="39.4" cy="74" r="1" fill="#222" /><circle cx="33" cy="76.4" r="1.6" fill="#ff8fa3" /><circle cx="41" cy="76.4" r="1.6" fill="#ff8fa3" /><path d="M35.4 78h3" stroke="#a24a3a" strokeWidth=".7" />
      <rect x="28" y="80" width="18" height="24" fill="url(#j189r)" /><path d="M28 90h18M37 80v24" stroke="#ffd60a" strokeWidth="1.4" /><g fill="#ffd60a">{[84, 88, 96, 100].map(y => <circle key={y} cx="37" cy={y} r=".8" />)}</g>
      <rect x="28" y="104" width="8" height="16" fill="#1d3557" /><rect x="38" y="104" width="8" height="16" fill="#1d3557" /><rect x="27" y="118" width="10" height="3" fill="#111" /><rect x="37" y="118" width="10" height="3" fill="#111" />
      <path d="M46 82l4 8" stroke="url(#j189r)" strokeWidth="4" strokeLinecap="round" /></g>
    <line x1="52" y1="52" x2="52" y2="120" stroke="#6c757d" strokeWidth="2.2" /><path d="M52 52l-2-6h4z" fill="#adb5bd" />
    <g transform="translate(14 118)"><rect x="-6" y="-10" width="12" height="10" fill="#e63946" /><path d="M-6-10l6-6 6 6" fill="#ffd60a" /></g>
  </Svg>],

  [190, 'เค้กวันเกิดในห้องมืด', <Svg>
    <defs>
      <radialGradient id="j190g" cx=".5" cy=".42"><stop stopColor="#ffb703" stopOpacity=".45" /><stop offset=".5" stopColor="#f48c06" stopOpacity=".12" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
      <linearGradient id="j190c" x2="0" y2="1"><stop stopColor="#ffafcc" /><stop offset="1" stopColor="#e5809f" /></linearGradient>
      <linearGradient id="j190f" x2="0" y2="1"><stop stopColor="#fff3c4" /><stop offset=".5" stopColor="#ffb703" /><stop offset="1" stopColor="#e85d04" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="#08070a" /><rect width="120" height="160" fill="url(#j190g)" />
    <g fill="#14121a"><rect x="0" y="0" width="22" height="90" /><rect x="98" y="0" width="22" height="90" /></g>
    <ellipse cx="60" cy="128" rx="44" ry="7" fill="#3a3540" opacity=".7" /><ellipse cx="60" cy="126" rx="40" ry="5.6" fill="#adb5bd" opacity=".5" />
    <path d="M28 98H92V124H28Z" fill="url(#j190c)" /><g stroke="#c9184a" strokeWidth=".8" opacity=".5"><path d="M28 112h64" /></g>
    <ellipse cx="60" cy="124" rx="32" ry="4" fill="#e5809f" /><ellipse cx="60" cy="98" rx="32" ry="6" fill="#fff" />
    <path d="M28 98q5 9 10 0t10 0t10 0t10 0t10 0t10 0t6 2" fill="#fff" /><path d="M28 98q5 9 10 0t10 0t10 0t10 0t10 0t10 0" stroke="#f8edeb" fill="none" />
    <g fill="#e63946">{[34, 46, 60, 74, 86].map((x, i) => <circle key={x} cx={x} cy={108 + (i % 2) * 2} r="2.2" />)}</g><g fill="#ffd166">{[40, 54, 66, 80].map((x, i) => <circle key={x} cx={x} cy={116 - (i % 2) * 2} r="1.4" />)}</g>
    <rect x="57.6" y="74" width="4.8" height="22" fill="#a2d2ff" /><path d="M57.6 78l4.8 3M57.6 84l4.8 3M57.6 90l4.8 3" stroke="#fff" strokeWidth="1.2" /><line x1="60" y1="74" x2="60" y2="71" stroke="#222" strokeWidth=".8" />
    <path d="M60 56q-6 9 0 15q6-6 0-15z" fill="url(#j190f)" /><path d="M60 62q-2.6 4 0 7q2.6-3 0-7z" fill="#fffbe0" />
    <g fill="#ffb703" opacity=".5">{[[36, 60], [86, 64], [44, 48], [78, 50]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".7" />)}</g>
    <g fill="#14121a" opacity=".9"><circle cx="14" cy="120" r="7" /><path d="M2 160q0-28 12-28t12 28z" /></g>
  </Svg>],

  [191, 'ปราสาททรายกับคลื่น', <Svg>
    <defs>
      <linearGradient id="j191s" x2="0" y2="1"><stop stopColor="#90e0ef" /><stop offset="1" stopColor="#caf0f8" /></linearGradient>
      <linearGradient id="j191w" x2="0" y2="1"><stop stopColor="#0096c7" /><stop offset="1" stopColor="#48cae4" /></linearGradient>
      <linearGradient id="j191b" x2="0" y2="1"><stop stopColor="#f2d0a9" /><stop offset="1" stopColor="#d4a373" /></linearGradient>
      <linearGradient id="j191c" x2="1" y2="0"><stop stopColor="#c9935a" /><stop offset=".5" stopColor="#e6bb82" /><stop offset="1" stopColor="#b07a42" /></linearGradient>
    </defs>
    <rect width="120" height="62" fill="url(#j191s)" /><circle cx="22" cy="24" r="10" fill="#fff3b0" /><Cl x={90} y={22} s={.9} />
    <path d="M56 62Q86 40 120 50V88Q100 80 88 86Q74 74 56 76Z" fill="url(#j191w)" /><path d="M56 76Q74 64 88 72Q100 66 120 72" stroke="#fff" strokeWidth="3.4" fill="none" /><path d="M86 52q10-6 20 0" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".7" />
    <g fill="#fff">{[[64, 70, 1.4], [72, 66, 1], [96, 64, 1.2], [110, 66, .9]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <path d="M0 62H56Q60 70 56 78H0Z" fill="#48cae4" opacity=".6" />
    <path d="M0 74Q30 70 60 78T120 82V160H0Z" fill="url(#j191b)" /><path d="M0 74Q30 70 60 78T120 82" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".7" />
    <g fill="#c9935a" opacity=".5">{Array.from({ length: 14 }, (_, i) => <circle key={i} cx={(i * 41) % 118 + 1} cy={100 + (i * 23) % 56} r=".7" />)}</g>
    <ellipse cx="44" cy="134" rx="30" ry="4" fill="#a87442" opacity=".4" />
    <g fill="url(#j191c)"><rect x="22" y="102" width="44" height="32" /><rect x="16" y="86" width="14" height="48" /><rect x="58" y="86" width="14" height="48" /><rect x="34" y="78" width="20" height="26" /></g>
    <g fill="url(#j191c)">{[16, 21, 26].map(x => <rect key={x} x={x} y="82" width="3.4" height="4" />)}{[58, 63, 68].map(x => <rect key={x} x={x} y="82" width="3.4" height="4" />)}{[34, 40, 46, 51].map(x => <rect key={x} x={x} y="74" width="3" height="4" />)}</g>
    <path d="M38 134v-12a6 6 0 0 1 12 0v12z" fill="#a8743c" /><g stroke="#a8743c" strokeWidth=".6">{[92, 98, 104, 110, 116, 122, 128].map(y => <path key={y} d={`M16 ${y}h14M58 ${y}h14`} />)}</g>
    <line x1="44" y1="74" x2="44" y2="60" stroke="#6b4226" strokeWidth=".9" /><path d="M44 60l9 3-9 3z" fill="#e63946" />
    <g fill="#f4a261"><path d="M90 140l5-3 2 4-5 2z" /></g><g transform="translate(104 120)"><path d="M0-5l1.4 3.6 3.6 1.4-3.6 1.4L0 5l-1.4-3.6L-5 0l3.6-1.4z" fill="#e76f51" /></g>
    <path d="M76 124q8 0 8 8" stroke="#a8743c" strokeWidth="1.4" fill="none" /><path d="M80 116l4 8h-6z" fill="#e63946" />
  </Svg>],

  [193, 'คนแคระตกปลาในแอ่งน้ำ', <Svg>
    <defs>
      <linearGradient id="j193s" x2="0" y2="1"><stop stopColor="#d8f3dc" /><stop offset="1" stopColor="#b7e4c7" /></linearGradient>
      <linearGradient id="j193g" x2="0" y2="1"><stop stopColor="#95d5b2" /><stop offset="1" stopColor="#52b788" /></linearGradient>
      <radialGradient id="j193p" cx=".5" cy=".4"><stop stopColor="#caf0f8" /><stop offset="1" stopColor="#48cae4" /></radialGradient>
      <linearGradient id="j193h" x2="1" y2="0"><stop stopColor="#9d0208" /><stop offset=".5" stopColor="#e63946" /><stop offset="1" stopColor="#6a040f" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#j193s)" />
    <g fill="#74c69d" opacity=".6"><circle cx="100" cy="30" r="22" /><circle cx="14" cy="50" r="16" /></g>
    <path d="M0 108Q60 100 120 110V160H0Z" fill="url(#j193g)" /><g stroke="#2d6a4f" strokeWidth="1">{Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${i * 8 + 2} ${116 + (i % 3) * 12}l-1-4M${i * 8 + 4} ${116 + (i % 3) * 12}l1-4`} />)}</g>
    <ellipse cx="82" cy="134" rx="30" ry="9" fill="#2d6a4f" opacity=".4" /><ellipse cx="82" cy="132" rx="28" ry="8" fill="url(#j193p)" />
    <g stroke="#fff" strokeWidth=".6" fill="none" opacity=".8"><ellipse cx="88" cy="132" rx="4" ry="1.2" /><ellipse cx="88" cy="132" rx="8" ry="2.4" opacity=".5" /></g>
    <g transform="translate(74 136)"><path d="M-4 0q4-3 8 0q-4 3-8 0zM4 0l2.4-2v4z" fill="#ffb703" opacity=".7" /></g>
    <g fill="#55a630"><path d="M56 132q-2-8 2-12q1 6-2 12zM108 128q2-8-2-12q-1 6 2 12z" /></g>
    <path d="M30 124h22v4H30z" fill="#868e96" /><ellipse cx="41" cy="124" rx="11" ry="2.4" fill="#adb5bd" />
    <ellipse cx="42" cy="112" rx="10" ry="12" fill="#457b9d" /><path d="M34 106q8 6 16 0" stroke="#1d3557" strokeWidth=".8" fill="none" /><rect x="36" y="114" width="12" height="2.4" fill="#6b4226" /><rect x="40.6" y="113.4" width="3" height="3.4" fill="#ffd166" />
    <circle cx="42" cy="96" r="6.4" fill="#f1c27d" /><circle cx="40" cy="95" r=".9" fill="#222" /><circle cx="44.4" cy="95" r=".9" fill="#222" /><circle cx="42" cy="98" r="1.6" fill="#ff8fa3" />
    <path d="M35 99q7 16 14 0q-2 12-7 12t-7-12z" fill="#fff" /><path d="M38 102q4 6 8 0" stroke="#dee2e6" strokeWidth=".6" fill="none" />
    <path d="M33 94L42 66L51 94Z" fill="url(#j193h)" /><path d="M33 94h18" stroke="#6a040f" strokeWidth="1.6" />
    <path d="M50 106L88 80" stroke="#6b4226" strokeWidth="1.6" /><path d="M48 108l4-4" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" />
    <path d="M88 80Q92 104 90 130" stroke="#495057" strokeWidth=".6" fill="none" /><circle cx="90" cy="129" r="1.8" fill="#e63946" /><circle cx="90" cy="127.6" r="1.8" fill="#fff" />
    <g fill="#fff">{[[96, 44], [104, 50]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q2-3 4 0`} stroke="#fff" strokeWidth=".8" fill="none" />)}</g>
  </Svg>],

  [194, 'บอนไซบนหินลอยฟ้า', <Svg>
    <defs>
      <linearGradient id="j194s" x2="0" y2="1"><stop stopColor="#a2d2ff" /><stop offset="1" stopColor="#e0f4ff" /></linearGradient>
      <linearGradient id="j194r" x2="0" y2="1"><stop stopColor="#868e96" /><stop offset="1" stopColor="#343a40" /></linearGradient>
      <radialGradient id="j194l" cx=".4" cy=".35"><stop stopColor="#52b788" /><stop offset="1" stopColor="#1b4332" /></radialGradient>
      <linearGradient id="j194w" x2="0" y2="1"><stop stopColor="#caf0f8" stopOpacity=".95" /><stop offset="1" stopColor="#90e0ef" stopOpacity=".2" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#j194s)" />
    <Cl x={18} y={132} s={1.6} /><Cl x={100} y={144} s={1.4} /><Cl x={98} y={30} s={.9} o={.9} /><Cl x={20} y={60} s={.6} o={.8} />
    <path d="M28 90H92Q90 108 74 118Q66 136 56 124Q38 116 28 90Z" fill="url(#j194r)" /><g stroke="#212529" strokeWidth=".7" fill="none" opacity=".6"><path d="M40 98l6 8-4 6M68 100l-4 10 6 6M54 110l2 8" /></g>
    <path d="M28 90H92" stroke="#55a630" strokeWidth="4.4" strokeLinecap="round" /><g fill="#80b918">{[34, 44, 72, 86].map(x => <path key={x} d={`M${x} 90q2-5 4 0`} />)}</g>
    <path d="M72 92q2 14 0 30q-1 12-2 30" stroke="url(#j194w)" strokeWidth="4" fill="none" /><path d="M72 92q2 14 0 30" stroke="#fff" strokeWidth="1" fill="none" opacity=".7" /><g fill="#fff" opacity=".8">{[[70, 152], [74, 150], [68, 148]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" />)}</g>
    <path d="M52 90Q46 74 56 64Q62 58 58 46" stroke="#5e503f" strokeWidth="4.4" fill="none" strokeLinecap="round" /><path d="M56 66Q72 62 80 54M54 76Q42 72 36 64" stroke="#5e503f" strokeWidth="3" fill="none" strokeLinecap="round" />
    <g fill="url(#j194l)"><ellipse cx="56" cy="42" rx="17" ry="8.6" /><ellipse cx="80" cy="50" rx="13" ry="6.4" /><ellipse cx="36" cy="60" rx="11" ry="5.6" /></g>
    <g fill="#74c69d" opacity=".6"><ellipse cx="52" cy="38" rx="8" ry="3" /><ellipse cx="78" cy="47" rx="6" ry="2.4" /></g>
    <g fill="#ffafcc">{[[48, 44], [62, 40], [84, 52], [32, 62]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" />)}</g>
    <g transform="translate(40 88)"><path d="M-3 0h6l-1 2h-4z" fill="#495057" /><rect x="-.4" y="-6" width=".8" height="6" fill="#adb5bd" /></g>
    <g fill="#495057"><path d="M94 76q3-3 6 0q-3 1-6 0z" /></g>
  </Svg>],
];
