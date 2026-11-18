// ภาพการ์ดแบบละเอียด ชุด 20 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Pn = ({ x, y, s = 1, f = '#040f0a' }) => <path transform={`translate(${x} ${y}) scale(${s})`} fill={f} d="M0-32L11-12H6L14 4H-14L-6-12H-11Z" />;

export const HD20 = [
  [141, 'สีหกกลายเป็นแม่น้ำ', <Svg>
    <defs>
      <linearGradient id="e141s" x2="0" y2="1"><stop stopColor="#e9f5db" /><stop offset="1" stopColor="#b5c99a" /></linearGradient>
      <linearGradient id="e141r" x2="1" y2="1"><stop stopColor="#4cc9f0" /><stop offset="1" stopColor="#4361ee" /></linearGradient>
      <linearGradient id="e141c" x2="1" y2="0"><stop stopColor="#868e96" /><stop offset=".5" stopColor="#dee2e6" /><stop offset="1" stopColor="#6c757d" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#e141s)" />
    <g stroke="#97a97c" strokeWidth="1">{Array.from({ length: 22 }, (_, i) => { const x = (i * 37) % 118 + 1, y = (i * 29) % 150 + 6; return <path key={i} d={`M${x} ${y}l-1-4M${x + 2} ${y}l1-4`} />; })}</g>
    <g transform="rotate(-30 30 40)"><path d="M14 28H46V58H14Z" fill="url(#e141c)" /><ellipse cx="30" cy="28" rx="16" ry="4.4" fill="#495057" /><ellipse cx="30" cy="28" rx="13" ry="3.4" fill="#4cc9f0" /><path d="M14 34q-6 0-6-6" stroke="#6c757d" strokeWidth="1.2" fill="none" /><path d="M14 46h32" stroke="#4cc9f0" strokeWidth="3" /><path d="M20 30v26" stroke="#fff" strokeWidth="1" opacity=".5" /></g>
    <path d="M46 40Q58 64 46 84Q30 104 58 116Q92 128 70 160H106Q116 126 86 112Q60 100 74 84Q84 62 56 32Z" fill="url(#e141r)" />
    <path d="M52 50Q60 66 52 82Q42 100 64 110Q88 120 80 150" stroke="#caf0f8" strokeWidth="1.2" fill="none" opacity=".7" />
    <g stroke="#fff" strokeWidth=".6" fill="none" opacity=".6">{[[60, 92], [76, 124], [84, 144]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q3-2 6 0`} />)}</g>
    <g transform="translate(66 96)"><ellipse rx="5.4" ry="3.6" fill="#fff" /><circle cx="4" cy="-3.4" r="2.6" fill="#fff" /><polygon points="6.4,-3.4 9.4,-2.6 6.4,-2" fill="#f77f00" /><circle cx="4.6" cy="-3.8" r=".5" fill="#222" /></g>
    <g transform="translate(88 136)"><ellipse rx="4" ry="2.8" fill="#ffd60a" /><circle cx="3" cy="-2.6" r="2" fill="#ffd60a" /><polygon points="4.8,-2.6 7,-2 4.8,-1.6" fill="#f77f00" /></g><g transform="translate(96 142) scale(.8)"><ellipse rx="4" ry="2.8" fill="#ffd60a" /><circle cx="3" cy="-2.6" r="2" fill="#ffd60a" /></g>
    <g fill="#80b918">{[[30, 120], [100, 60], [28, 150]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q-3-8 0-12q3 4 0 12zM${x + 3} ${y}q2-6 6-8q-1 5-6 8z`} />)}</g>
    <g fill="#ff70a6">{[[18, 100], [104, 96]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="1.8" /><circle cx={x} cy={y} r=".7" fill="#ffd166" /></g>)}</g>
  </Svg>],

  [142, 'เมืองบนต้นไม้', <Svg>
    <defs>
      <linearGradient id="e142s" x2="0" y2="1"><stop stopColor="#caf0f8" /><stop offset="1" stopColor="#b7e4c7" /></linearGradient>
      <linearGradient id="e142t" x2="1" y2="0"><stop stopColor="#5e3a22" /><stop offset=".5" stopColor="#8b5a3a" /><stop offset="1" stopColor="#4a2c18" /></linearGradient>
      <radialGradient id="e142l" cx=".4" cy=".35"><stop stopColor="#74c69d" /><stop offset="1" stopColor="#1b4332" /></radialGradient>
      <linearGradient id="e142h" x2="0" y2="1"><stop stopColor="#f2d0a9" /><stop offset="1" stopColor="#c9a07a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#e142s)" />
    <rect x="47" y="40" width="26" height="120" fill="url(#e142t)" /><g stroke="#3a2010" strokeWidth=".7" fill="none"><path d="M54 60q4 20 0 40M66 80q-3 20 2 40" /></g>
    <path d="M47 150Q36 152 30 160M73 150Q86 152 92 160" stroke="#5e3a22" strokeWidth="4" fill="none" />
    <g fill="url(#e142l)"><circle cx="60" cy="28" r="30" /><circle cx="28" cy="48" r="18" /><circle cx="94" cy="48" r="18" /><circle cx="40" cy="20" r="14" /><circle cx="82" cy="20" r="14" /></g>
    <g fill="#95d5b2" opacity=".5">{[[52, 16], [72, 26], [30, 42], [96, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" />)}</g>
    <g><rect x="18" y="64" width="26" height="18" fill="url(#e142h)" /><polygon points="16,64 31,52 46,64" fill="#9c6644" /><rect x="22" y="68" width="7" height="7" fill="#ffd166" /><rect x="34" y="70" width="6" height="12" fill="#6b4226" /><path d="M16 82h30" stroke="#6b4226" strokeWidth="2" /></g>
    <g><rect x="76" y="86" width="26" height="18" fill="url(#e142h)" /><polygon points="74,86 89,74 104,86" fill="#9c6644" /><rect x="90" y="90" width="7" height="7" fill="#ffd166" /><rect x="80" y="92" width="6" height="12" fill="#6b4226" /><path d="M74 104h30" stroke="#6b4226" strokeWidth="2" /></g>
    <g><rect x="60" y="40" width="20" height="14" fill="url(#e142h)" /><polygon points="58,40 70,30 82,40" fill="#bc6c25" /><rect x="66" y="44" width="5" height="5" fill="#ffd166" /></g>
    <path d="M44 74Q60 70 76 90" stroke="#a0682f" strokeWidth="1.2" fill="none" /><path d="M44 72Q60 68 76 88" stroke="#a0682f" strokeWidth=".6" fill="none" /><g stroke="#a0682f" strokeWidth=".7">{[50, 56, 62, 68].map(x => <path key={x} d={`M${x} ${70 + (x - 44) * .5}v3`} />)}</g>
    <g stroke="#6b4226" strokeWidth="1.4">{[26, 32].map(x => <line key={x} x1={x} y1="82" x2={x} y2="150" />)}{[90, 96, 102, 110, 118, 126, 134, 142].map(y => <line key={y} x1="26" y1={y} x2="32" y2={y} />)}</g>
    <path d="M54 160v-16a6 6 0 0 1 12 0v16z" fill="#3d2817" /><circle cx="60" cy="130" r="3.4" fill="#ffd166" stroke="#6b4226" strokeWidth=".6" />
    <rect y="154" width="120" height="6" fill="#52b788" />
    <g fill="#e63946">{[[36, 38], [86, 34], [56, 10]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" />)}</g>
    <g transform="translate(29 58)"><circle r="1.8" fill="#f1c27d" /><path d="M-1.4 1.6h2.8l.6 4h-4z" fill="#e63946" /></g>
  </Svg>],

  [143, 'สายจูงที่ไม่มีเจ้าของ', <Svg>
    <defs>
      <linearGradient id="e143s" x2="0" y2="1"><stop stopColor="#ffe8d6" /><stop offset="1" stopColor="#ffd7ba" /></linearGradient>
      <radialGradient id="e143d" cx=".4" cy=".3"><stop stopColor="#e9c48a" /><stop offset="1" stopColor="#a8754a" /></radialGradient>
      <linearGradient id="e143g" x2="0" y2="1"><stop stopColor="#c9ada7" /><stop offset="1" stopColor="#9a8c98" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#e143s)" />
    <g fill="#fff" opacity=".7"><ellipse cx="96" cy="24" rx="14" ry="4" /><ellipse cx="24" cy="40" rx="10" ry="3" /></g>
    <rect y="118" width="120" height="42" fill="url(#e143g)" /><path d="M0 118h120" stroke="#e5d5d0" strokeWidth="1.2" /><g stroke="#8a7a86" strokeWidth=".6">{[0, 1, 2, 3, 4].map(i => <path key={i} d={`M${i * 28} 118l-6 42`} />)}</g>
    <ellipse cx="40" cy="132" rx="24" ry="3.4" fill="#6d5a68" opacity=".35" />
    <g><path d="M54 110q10-6 8-16" stroke="url(#e143d)" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <ellipse cx="40" cy="112" rx="17" ry="11" fill="url(#e143d)" /><ellipse cx="40" cy="116" rx="10" ry="5" fill="#f2d0a9" />
      <path d="M28 120v10M50 120v10M35 122v8M45 122v8" stroke="url(#e143d)" strokeWidth="4" strokeLinecap="round" /><g fill="#6b4226">{[28, 35, 45, 50].map(x => <ellipse key={x} cx={x} cy="131" rx="2.4" ry="1.2" />)}</g>
      <circle cx="24" cy="98" r="9.6" fill="url(#e143d)" /><ellipse cx="17" cy="102" rx="5.6" ry="4" fill="#f2d0a9" /><circle cx="13.6" cy="100.4" r="1.8" fill="#222" />
      <circle cx="22" cy="96" r="1.4" fill="#222" /><circle cx="22.4" cy="95.6" r=".4" fill="#fff" /><path d="M16 104q2 2 5 1" stroke="#222" strokeWidth=".6" fill="none" />
      <ellipse cx="29" cy="92" rx="4.4" ry="8" fill="#8a5a2b" transform="rotate(20 29 92)" />
      <rect x="27" y="102" width="9" height="3.4" rx="1.4" fill="#e63946" /><circle cx="32" cy="106" r="1.4" fill="#ffd166" /></g>
    <path d="M32 104Q60 76 84 66Q98 60 100 50" stroke="#e63946" strokeWidth="1.6" fill="none" /><path d="M32 104Q60 76 84 66" stroke="#ff8fa3" strokeWidth=".5" fill="none" />
    <circle cx="100" cy="47" r="4.4" fill="none" stroke="#e63946" strokeWidth="2.2" /><path d="M98 42q2-2 4 0" stroke="#fff" strokeWidth=".6" fill="none" opacity=".6" />
    <g fill="#9a8c98" opacity=".5"><path d="M100 54q-1 6 0 10M96 56q-3 4-4 8M104 56q3 4 4 8" stroke="#9a8c98" strokeWidth=".7" strokeDasharray="1 2" fill="none" /></g>
  </Svg>],

  [144, 'ปุ่มแดงในห้องว่าง', <Svg>
    <defs>
      <linearGradient id="e144f" x2="0" y2="1"><stop stopColor="#dee2e6" /><stop offset="1" stopColor="#adb5bd" /></linearGradient>
      <linearGradient id="e144w" x2="1" y2="0"><stop stopColor="#f8f9fa" /><stop offset="1" stopColor="#dee2e6" /></linearGradient>
      <linearGradient id="e144x" x2="1" y2="0"><stop stopColor="#dee2e6" /><stop offset="1" stopColor="#f8f9fa" /></linearGradient>
      <linearGradient id="e144p" x2="1" y2="0"><stop stopColor="#868e96" /><stop offset=".5" stopColor="#ced4da" /><stop offset="1" stopColor="#6c757d" /></linearGradient>
      <radialGradient id="e144b" cx=".4" cy=".3"><stop stopColor="#ff8fa3" /><stop offset=".6" stopColor="#e63946" /><stop offset="1" stopColor="#9d0208" /></radialGradient>
      <radialGradient id="e144g"><stop stopColor="#ff4d6d" stopOpacity=".35" /><stop offset="1" stopColor="#ff4d6d" stopOpacity="0" /></radialGradient>
      <linearGradient id="e144l" x2="0" y2="1"><stop stopColor="#fff" stopOpacity=".7" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="#e9ecef" />
    <path d="M0 0H30V84L0 104Z" fill="url(#e144w)" /><path d="M120 0H90V84L120 104Z" fill="url(#e144x)" /><path d="M30 0H90V84H30Z" fill="#f1f3f5" />
    <path d="M0 104L30 84H90L120 104V160H0Z" fill="url(#e144f)" /><g stroke="#ced4da" strokeWidth=".6">{[0, 1, 2, 3].map(i => <path key={i} d={`M${30 - i * 10} ${84 + i * 7}H${90 + i * 10}`} />)}<path d="M45 84L30 160M60 84V160M75 84L90 160" /></g>
    <path d="M50 0H70L64 6H56Z" fill="#adb5bd" /><polygon points="56,6 64,6 76,140 44,140" fill="url(#e144l)" />
    <circle cx="60" cy="104" r="26" fill="url(#e144g)" />
    <ellipse cx="60" cy="142" rx="20" ry="3.4" fill="#000" opacity=".15" />
    <path d="M47 142V110H73V142Z" fill="url(#e144p)" /><ellipse cx="60" cy="110" rx="13" ry="3.4" fill="#495057" /><rect x="45" y="140" width="30" height="4" rx="1.4" fill="#6c757d" />
    <path d="M51 106v-3a9 3.4 0 0 1 18 0v3" fill="#9d0208" /><ellipse cx="60" cy="106" rx="9" ry="3.4" fill="#9d0208" /><ellipse cx="60" cy="102.6" rx="9" ry="3.4" fill="url(#e144b)" /><ellipse cx="57" cy="101.6" rx="3" ry="1" fill="#fff" opacity=".6" />
    <path d="M50 110l20 0" stroke="#ffd166" strokeWidth="1.4" strokeDasharray="2 2" />
    <g fill="#adb5bd"><path d="M96 40l6 2-1 30-6-2z" fill="#ced4da" /><circle cx="99" cy="56" r="1" fill="#6c757d" /></g>
  </Svg>],

  [146, 'จรวดออกจากถ้วยชา', <Svg>
    <defs>
      <linearGradient id="e146s" x2="0" y2="1"><stop stopColor="#3d405b" /><stop offset=".6" stopColor="#e07a5f" /><stop offset="1" stopColor="#f2cc8f" /></linearGradient>
      <linearGradient id="e146c" x2="1" y2="0"><stop stopColor="#d6ccc2" /><stop offset=".4" stopColor="#fff" /><stop offset="1" stopColor="#bcb1a3" /></linearGradient>
      <linearGradient id="e146r" x2="1" y2="0"><stop stopColor="#ced4da" /><stop offset=".45" stopColor="#fff" /><stop offset="1" stopColor="#adb5bd" /></linearGradient>
      <radialGradient id="e146f"><stop stopColor="#fff3b0" /><stop offset=".5" stopColor="#ffb703" stopOpacity=".6" /><stop offset="1" stopColor="#ffb703" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#e146s)" />
    <St p={[10, 10, .6, 30, 24, .5, 90, 14, .7, 104, 40, .5, 50, 6, .4, 20, 50, .4]} />
    <path d="M60 104Q50 60 60 30" stroke="#fff" strokeWidth="6" fill="none" opacity=".15" strokeLinecap="round" />
    <rect y="140" width="120" height="20" fill="#8a5a3b" /><path d="M0 140h120" stroke="#b07a52" />
    <ellipse cx="60" cy="140" rx="38" ry="7" fill="url(#e146c)" stroke="#c9b79c" />
    <path d="M30 110H90Q88 136 60 138Q32 136 30 110Z" fill="url(#e146c)" stroke="#c9b79c" /><path d="M89 116q13 2 9 13q-3 4-10 3" stroke="url(#e146c)" strokeWidth="4" fill="none" /><path d="M36 122q24 6 48 0" stroke="#81b29a" strokeWidth="1.4" fill="none" />
    <ellipse cx="60" cy="110" rx="30" ry="4.6" fill="#8a5a2b" />
    <circle cx="60" cy="104" r="18" fill="url(#e146f)" />
    <path d="M52 108q-6-12 8-18q14 6 8 18z" fill="#f2cc8f" opacity=".85" /><path d="M55 104q5-12 10 0" fill="#ffb703" /><path d="M58 102q2-6 4 0" fill="#fff3b0" />
    <path d="M53 92V58Q60 36 67 58V92Z" fill="url(#e146r)" /><circle cx="60" cy="64" r="3.6" fill="#81b29a" stroke="#3d405b" strokeWidth=".8" /><path d="M53 76h14" stroke="#e07a5f" strokeWidth="2" />
    <path d="M53 84l-7 9h7zM67 84l7 9h-7z" fill="#e07a5f" /><path d="M60 40v-4" stroke="#adb5bd" />
    <g fill="#fff" opacity=".8">{[[44, 100], [76, 96], [48, 88]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" />)}</g>
  </Svg>],

  [147, 'พวงกุญแจที่เรืองแสงหนึ่งดอก', <Svg>
    <defs>
      <linearGradient id="e147w" x2="0" y2="1"><stop stopColor="#4a3b33" /><stop offset="1" stopColor="#2b221d" /></linearGradient>
      <linearGradient id="e147s" x2="1" y2="0"><stop stopColor="#6c757d" /><stop offset=".5" stopColor="#dee2e6" /><stop offset="1" stopColor="#6c757d" /></linearGradient>
      <linearGradient id="e147g" x2="1" y2="0"><stop stopColor="#c99700" /><stop offset=".5" stopColor="#fff1a8" /><stop offset="1" stopColor="#a87c00" /></linearGradient>
      <radialGradient id="e147l"><stop stopColor="#ffd60a" stopOpacity=".6" /><stop offset="1" stopColor="#ffd60a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#e147w)" />
    <g stroke="#3a2d26" strokeWidth="1.2">{[0, 1, 2, 3, 4, 5, 6].map(i => <path key={i} d={`M0 ${i * 24 + 10}h120`} />)}</g><g stroke="#5a4a40" strokeWidth=".5" opacity=".6">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${(i * 37) % 120} ${(i % 7) * 24 + 14}q8-2 16 0`} fill="none" />)}</g>
    <rect x="44" y="24" width="32" height="10" rx="2" fill="#6b4226" /><circle cx="60" cy="38" r="3" fill="none" stroke="url(#e147s)" strokeWidth="2" /><path d="M60 34v-4" stroke="#adb5bd" strokeWidth="2" />
    <circle cx="60" cy="52" r="11" fill="none" stroke="url(#e147s)" strokeWidth="2.4" />
    {[[-34, 's'], [-12, 'g'], [10, 's'], [32, 's']].map(([r, k], i) => <g key={i} transform={`rotate(${r} 60 52)`}><circle cx="60" cy="68" r="6" fill="none" stroke={`url(#e147${k})`} strokeWidth="3" /><rect x="58.4" y="74" width="3.2" height="38" fill={`url(#e147${k})`} /><rect x="61" y="104" width="7" height="3" fill={`url(#e147${k})`} /><rect x="61" y="109" width="5" height="3" fill={`url(#e147${k})`} /></g>)}
    <circle cx="66" cy="92" r="30" fill="url(#e147l)" />
    <g fill="#fff8c8">{[[74, 78], [80, 98], [58, 108], [86, 86]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 2.4}l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z`} />)}</g>
    <g transform="translate(24 120)"><rect x="-6" y="0" width="14" height="10" rx="2" fill="#e63946" /><path d="M-6 0q7-6 14 0" stroke="#e63946" strokeWidth="1.4" fill="none" /></g>
  </Svg>],

  [148, 'คนหัวตะเกียงเดินในป่า', <Svg>
    <defs>
      <linearGradient id="e148s" x2="0" y2="1"><stop stopColor="#081c15" /><stop offset="1" stopColor="#1b4332" /></linearGradient>
      <radialGradient id="e148g" cx=".5" cy=".42"><stop stopColor="#ffd166" stopOpacity=".55" /><stop offset=".5" stopColor="#ffb703" stopOpacity=".15" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
      <linearGradient id="e148l" x2="0" y2="1"><stop stopColor="#fff3c4" /><stop offset="1" stopColor="#ffb703" /></linearGradient>
      <linearGradient id="e148c" x2="1" y2="0"><stop stopColor="#2b1d12" /><stop offset=".5" stopColor="#4a3424" /><stop offset="1" stopColor="#1e140c" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#e148s)" />
    <Pn x={10} y={70} s={1.1} f="#0b2a1c" /><Pn x={34} y={60} s={.9} f="#0b2a1c" /><Pn x={88} y={64} s={1} f="#0b2a1c" /><Pn x={110} y={74} s={1.2} f="#0b2a1c" />
    <rect width="120" height="160" fill="url(#e148g)" />
    <Pn x={10} y={118} s={2} /><Pn x={108} y={112} s={2.2} />
    <rect y="140" width="120" height="20" fill="#040f0a" /><path d="M30 160Q50 140 60 140T90 160" fill="#2d6a4f" opacity=".5" />
    <path d="M52 62h16l-2 15h-12z" fill="url(#e148l)" stroke="#2b1d12" strokeWidth="1.4" /><path d="M56 62v15M64 62v15" stroke="#2b1d12" strokeWidth=".8" /><path d="M60 65q-3 5 0 9q3-4 0-9z" fill="#fff" />
    <path d="M50 62h20l-4-6h-12z" fill="#2b1d12" /><circle cx="60" cy="53" r="2" fill="none" stroke="#2b1d12" strokeWidth="1.2" />
    <path d="M52 78h16l5 38h-26z" fill="url(#e148c)" /><path d="M60 80v36" stroke="#1e140c" strokeWidth=".6" /><g fill="#c9a227">{[86, 94, 102].map(y => <circle key={y} cx="61" cy={y} r=".9" />)}</g>
    <path d="M54 116l-3 24M66 116l5 24" stroke="#2b1d12" strokeWidth="4.4" strokeLinecap="round" /><path d="M48 140h6M70 140h6" stroke="#1e140c" strokeWidth="3" strokeLinecap="round" />
    <path d="M52 82l-9 22M68 82l8 20" stroke="url(#e148c)" strokeWidth="3.6" strokeLinecap="round" /><circle cx="43" cy="105" r="2" fill="#c9a07a" /><circle cx="76" cy="103" r="2" fill="#c9a07a" />
    <g fill="#e6ff6b">{[[24, 100], [94, 96], [36, 128], [84, 130], [16, 140]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
    <g fill="#ffd166" opacity=".6">{[[56, 50], [64, 46], [60, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={.8 - i * .2} />)}</g>
  </Svg>],

  [149, 'ส้มผ่าครึ่งเป็นพระอาทิตย์', <Svg>
    <defs>
      <linearGradient id="e149s" x2="0" y2="1"><stop stopColor="#ffafcc" /><stop offset=".6" stopColor="#ffd6a5" /><stop offset="1" stopColor="#ffb4a2" /></linearGradient>
      <radialGradient id="e149o" cx=".5" cy="1"><stop stopColor="#fff3c4" /><stop offset=".5" stopColor="#ffb703" /><stop offset="1" stopColor="#fb8500" /></radialGradient>
      <linearGradient id="e149w" x2="0" y2="1"><stop stopColor="#457b9d" /><stop offset="1" stopColor="#1d3557" /></linearGradient>
      <radialGradient id="e149g"><stop stopColor="#ffd166" stopOpacity=".5" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#e149s)" />
    <circle cx="60" cy="100" r="60" fill="url(#e149g)" />
    <path d="M14 100A46 46 0 0 1 106 100Z" fill="#e85d04" /><path d="M18 100A42 42 0 0 1 102 100Z" fill="#fff3c4" /><path d="M22 100A38 38 0 0 1 98 100Z" fill="url(#e149o)" />
    {Array.from({ length: 9 }, (_, i) => { const a1 = Math.PI - i * Math.PI / 9 - .04, a2 = Math.PI - (i + 1) * Math.PI / 9 + .04; return <path key={i} d={`M60 100L${60 + 36 * Math.cos(a1)} ${100 - 36 * Math.sin(a1)}A36 36 0 0 1 ${60 + 36 * Math.cos(a2)} ${100 - 36 * Math.sin(a2)}Z`} fill="#ffb703" stroke="#fff3c4" strokeWidth="1.4" />; })}
    <circle cx="60" cy="100" r="5" fill="#fff3c4" /><g fill="#fff8d6" opacity=".7">{[[48, 86], [72, 84], [60, 74], [40, 96], [82, 94]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.4" ry=".7" />)}</g>
    <rect y="100" width="120" height="60" fill="url(#e149w)" />
    <g fill="#ffb703" opacity=".55">{[[60, 106, 60], [60, 114, 46], [60, 122, 32], [60, 130, 20], [60, 138, 10]].map(([x, y, w], i) => <rect key={i} x={x - w / 2} y={y} width={w} height="2.4" rx="1.2" />)}</g>
    <path d="M0 102q10-3 20 0t20 0t20 0t20 0t20 0t20 0" stroke="#a8dadc" strokeWidth=".8" fill="none" opacity=".6" />
    <g fill="#6d2e46"><path d="M18 40q4-4 8 0q-4 1-8 0z" /><path d="M28 32q3-3 6 0q-3 1-6 0z" /><path d="M96 50q3-3 6 0q-3 1-6 0z" /></g>
    <g transform="translate(96 132)"><path d="M-8 0H8L5 4H-5Z" fill="#1d3557" /><path d="M0 0V-12L6-2Z" fill="#fff" opacity=".9" /></g>
  </Svg>],
];
