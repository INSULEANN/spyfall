// ภาพการ์ดแบบละเอียด ชุด 10 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Pn = ({ x, y, s = 1, f = '#13223a', g = '#1d3354' }) => <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M0-32L11-12H6L14 4H-14L-6-12H-11Z" fill={f} /><path d="M0-32L-11-12H-6L-14 4H0Z" fill={g} opacity=".6" /><rect x="-1.6" y="4" width="3.2" height="5" fill="#2b1d12" /></g>;

export const HD10 = [
  [19, 'กระท่อมกลางหิมะ', <Svg>
    <defs>
      <linearGradient id="u19s" x2="0" y2="1"><stop stopColor="#0d1b2a" /><stop offset="1" stopColor="#415a77" /></linearGradient>
      <linearGradient id="u19n" x2="0" y2="1"><stop stopColor="#f1f5fb" /><stop offset="1" stopColor="#c9d6e8" /></linearGradient>
      <radialGradient id="u19w"><stop stopColor="#ffcf5a" stopOpacity=".7" /><stop offset="1" stopColor="#ffcf5a" stopOpacity="0" /></radialGradient>
      <linearGradient id="u19l" x2="0" y2="1"><stop stopColor="#7a5038" /><stop offset="1" stopColor="#4a2e1e" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#u19s)" />
    <St p={[8, 10, .6, 22, 24, .5, 40, 8, .7, 70, 18, .5, 90, 8, .6, 108, 22, .7, 60, 34, .4, 18, 50, .5, 100, 48, .4]} />
    <path d="M20 40Q60 20 110 36" stroke="#80ffdb" strokeWidth="6" fill="none" opacity=".12" /><path d="M10 50Q60 30 116 46" stroke="#c77dff" strokeWidth="4" fill="none" opacity=".1" />
    <path d="M0 100L30 78L54 94L80 74L120 96V120H0Z" fill="#273c5a" />
    <Pn x={12} y={112} s={1.5} /><Pn x={106} y={114} s={1.7} /><Pn x={94} y={106} s={1} /><Pn x={26} y={104} s={.9} />
    <g fill="#e8eef7"><path d="M12 64l-5 9h10z" /><path d="M106 60l-6 10h12z" /></g>
    <path d="M0 120Q60 108 120 122V160H0Z" fill="url(#u19n)" />
    <rect x="36" y="94" width="48" height="32" fill="url(#u19l)" /><g stroke="#3a2416" strokeWidth=".7">{[100, 106, 112, 118].map(y => <line key={y} x1="36" y1={y} x2="84" y2={y} />)}</g>
    <polygon points="30,96 60,70 90,96" fill="#5a3a28" /><path d="M28 97L60 68L92 97L88 98L60 73L32 98Z" fill="#f1f5fb" />
    <rect x="70" y="72" width="7" height="14" fill="#5a3a28" /><rect x="69" y="70" width="9" height="3" fill="#f1f5fb" /><g fill="#adb5bd"><circle cx="76" cy="64" r="3" opacity=".6" /><circle cx="80" cy="56" r="4" opacity=".4" /></g>
    <rect x="42" y="102" width="16" height="12" fill="#ffcf5a" /><path d="M50 102v12M42 108h16" stroke="#3a2416" strokeWidth="1.2" /><circle cx="50" cy="108" r="20" fill="url(#u19w)" />
    <rect x="64" y="108" width="12" height="18" fill="#3a2416" /><circle cx="73" cy="118" r=".9" fill="#ffcf5a" />
    <path d="M36 126h48" stroke="#f1f5fb" strokeWidth="3" />
    <g fill="#9fb0c8">{[[28, 154], [36, 148], [44, 142], [52, 138], [60, 134], [68, 130]].map(([x, y], i) => <ellipse key={i} cx={x + (i % 2) * 3} cy={y} rx="2" ry="1" />)}</g>
    <g fill="#fff">{Array.from({ length: 22 }, (_, i) => <circle key={i} cx={(i * 43) % 118 + 1} cy={(i * 31) % 150 + 4} r={i % 3 ? .8 : 1.3} opacity=".8" />)}</g>
  </Svg>],

  [20, 'มือที่ถือดวงอาทิตย์', <Svg>
    <defs>
      <linearGradient id="u20s" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset="1" stopColor="#370617" /></linearGradient>
      <radialGradient id="u20g"><stop stopColor="#fff3b0" /><stop offset=".25" stopColor="#ffd23f" stopOpacity=".8" /><stop offset=".6" stopColor="#f48c06" stopOpacity=".25" /><stop offset="1" stopColor="#f48c06" stopOpacity="0" /></radialGradient>
      <radialGradient id="u20b" cx=".4" cy=".35"><stop stopColor="#fffbe0" /><stop offset=".6" stopColor="#ffd23f" /><stop offset="1" stopColor="#f48c06" /></radialGradient>
      <linearGradient id="u20h" x2="0" y2="1"><stop stopColor="#ffcf99" /><stop offset="1" stopColor="#b5704a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#u20s)" />
    <St p={[10, 14, .6, 28, 40, .5, 100, 12, .7, 112, 46, .5, 18, 70, .5, 104, 74, .4, 60, 10, .5]} />
    <circle cx="60" cy="92" r="52" fill="url(#u20g)" />
    <g stroke="#ffd23f" strokeWidth="1.4" strokeLinecap="round">{Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return <line key={i} x1={60 + 16 * Math.cos(a)} y1={92 + 16 * Math.sin(a)} x2={60 + (i % 2 ? 22 : 26) * Math.cos(a)} y2={92 + (i % 2 ? 22 : 26) * Math.sin(a)} />; })}</g>
    <circle cx="60" cy="92" r="12" fill="url(#u20b)" />
    <path d="M24 160Q22 124 36 116Q58 106 86 114Q100 118 96 128Q90 132 78 128L72 160Z" fill="url(#u20h)" />
    <path d="M86 114Q98 108 104 112Q106 118 96 122" fill="url(#u20h)" /><path d="M36 116q-4-8 2-14q4 6 4 12" fill="url(#u20h)" />
    <path d="M42 120q10-4 22-2M78 128q-6-2-8 2M30 132q6 4 10 14" stroke="#9a5a36" strokeWidth=".8" fill="none" />
    <path d="M40 116Q60 108 82 114" stroke="#ffe8a3" strokeWidth="1.4" fill="none" opacity=".7" />
    <g fill="#ffd23f">{[[40, 70], [82, 66], [30, 96], [90, 100], [52, 60]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 2}l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z`} />)}</g>
  </Svg>],

  [21, 'ราชาที่ล้ม', <Svg>
    <defs>
      <linearGradient id="u21s" x2="0" y2="1"><stop stopColor="#e9e2d0" /><stop offset="1" stopColor="#b8a888" /></linearGradient>
      <linearGradient id="u21w" x2="1" y2="0"><stop stopColor="#d6ccbc" /><stop offset=".45" stopColor="#fffaf0" /><stop offset="1" stopColor="#b8ad98" /></linearGradient>
      <linearGradient id="u21b" x2="1" y2="0"><stop stopColor="#111" /><stop offset=".45" stopColor="#4a4a4a" /><stop offset="1" stopColor="#0a0a0a" /></linearGradient>
      <radialGradient id="u21l" cx=".7" cy=".2"><stop stopColor="#fff8dc" stopOpacity=".8" /><stop offset="1" stopColor="#fff8dc" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#u21s)" /><rect width="120" height="160" fill="url(#u21l)" />
    <path d="M0 100L120 100V160H0Z" fill="#5a4a3a" />
    {Array.from({ length: 24 }, (_, i) => { const r = i / 8 | 0, c = i % 8, y0 = 100 + r * 20, h = 20, w0 = 120 / 8; return <polygon key={i} points={`${c * w0 - (r) * 2 * (4 - c) * .5},${y0} ${(c + 1) * w0 - r * 2 * (3 - c) * .5},${y0} ${(c + 1) * w0 - (r + 1) * 2 * (3 - c) * .5},${y0 + h} ${c * w0 - (r + 1) * 2 * (4 - c) * .5},${y0 + h}`} fill={(r + c) % 2 ? '#2b2b2b' : '#e9e2d0'} />; })}
    <path d="M0 100h120" stroke="#8a7a62" strokeWidth="1.5" />
    <g opacity=".35"><ellipse cx="40" cy="130" rx="30" ry="5" fill="#000" /><ellipse cx="94" cy="118" rx="12" ry="3" fill="#000" /></g>
    <g transform="rotate(80 18 126) translate(-18 8)"><rect x="24" y="114" width="20" height="6" rx="2" fill="url(#u21w)" stroke="#6b5a40" strokeWidth=".6" /><path d="M27 114Q30 92 30 82H38Q38 92 41 114Z" fill="url(#u21w)" stroke="#6b5a40" strokeWidth=".6" /><rect x="27" y="84" width="14" height="3" fill="url(#u21w)" stroke="#6b5a40" strokeWidth=".6" /><circle cx="34" cy="78" r="6" fill="url(#u21w)" stroke="#6b5a40" strokeWidth=".6" /><path d="M34 62v10M30 66h8" stroke="#c9a227" strokeWidth="2.4" strokeLinecap="round" /></g>
    <g transform="translate(10 0)"><rect x="76" y="110" width="20" height="6" rx="2" fill="url(#u21b)" /><path d="M79 110Q82 98 82 92H90Q90 98 93 110Z" fill="url(#u21b)" /><rect x="79" y="90" width="14" height="3" rx="1" fill="url(#u21b)" /><circle cx="86" cy="84" r="7.5" fill="url(#u21b)" /><circle cx="83.4" cy="81.4" r="2" fill="#fff" opacity=".35" /></g>
    <g transform="translate(60 52) scale(.6)" opacity=".5"><rect x="-10" y="40" width="20" height="5" rx="2" fill="#2b2b2b" /><path d="M-7 40Q-4 20-8 10L-2 4L4 8L8 20Q8 30 7 40Z" fill="#2b2b2b" /></g>
    <g transform="translate(22 60) scale(.55)" opacity=".5"><rect x="-10" y="40" width="20" height="5" rx="2" fill="#fffaf0" /><path d="M-7 40Q-4 24-4 16H4Q4 24 7 40Z" fill="#fffaf0" /><circle cx="0" cy="12" r="6" fill="#fffaf0" /></g>
  </Svg>],

  [22, 'แสงจากจอตอนตีสาม', <Svg>
    <defs>
      <radialGradient id="u22g" cx=".5" cy=".72"><stop stopColor="#9fd0ff" stopOpacity=".55" /><stop offset=".5" stopColor="#4361ee" stopOpacity=".15" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
      <linearGradient id="u22f" x2="0" y2="1"><stop stopColor="#1c2a44" /><stop offset=".55" stopColor="#2e4a78" /><stop offset="1" stopColor="#7fb2e6" /></linearGradient>
      <linearGradient id="u22p" x2="0" y2="1"><stop stopColor="#e0f2ff" /><stop offset="1" stopColor="#9fd0ff" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="#050508" /><rect width="120" height="160" fill="url(#u22g)" />
    <rect x="84" y="10" width="30" height="40" fill="#0d1020" /><path d="M99 10v40M84 30h30" stroke="#1b2035" strokeWidth="1.5" /><circle cx="106" cy="20" r="3" fill="#cfd8ff" opacity=".4" />
    <g fill="#111522"><rect x="4" y="96" width="18" height="40" rx="2" /><rect x="6" y="88" width="14" height="8" rx="4" /></g>
    <path d="M20 160Q22 112 60 108Q98 112 100 160Z" fill="#141c2e" /><path d="M36 124Q60 116 84 124" stroke="#2e4a78" strokeWidth="1" fill="none" />
    <ellipse cx="60" cy="72" rx="21" ry="26" fill="url(#u22f)" />
    <path d="M39 64Q38 40 60 40Q84 40 82 66Q80 52 68 50Q56 56 44 52Q40 58 39 64Z" fill="#0a0f1c" />
    <path d="M40 66Q38 80 44 88" stroke="#0a0f1c" strokeWidth="3" fill="none" /><path d="M80 66Q82 80 76 88" stroke="#0a0f1c" strokeWidth="3" fill="none" />
    <ellipse cx="52" cy="72" rx="3.6" ry="2.4" fill="#e8f4ff" /><ellipse cx="68" cy="72" rx="3.6" ry="2.4" fill="#e8f4ff" /><circle cx="52" cy="73" r="1.4" fill="#000" /><circle cx="68" cy="73" r="1.4" fill="#000" /><g fill="#9fd0ff"><rect x="51" y="72" width="2" height="1.2" /><rect x="67" y="72" width="2" height="1.2" /></g>
    <path d="M48 66q4-2 8 0M64 66q4-2 8 0" stroke="#0a0f1c" strokeWidth="1" fill="none" /><path d="M48 77q4 2 7 0M65 77q4 2 7 0" stroke="#1c2a44" strokeWidth=".8" fill="none" />
    <path d="M56 88q4 1 8 0" stroke="#1c2a44" strokeWidth=".9" fill="none" />
    <rect x="46" y="112" width="28" height="42" rx="4" fill="#1b1b1b" /><rect x="48" y="115" width="24" height="34" rx="1.5" fill="url(#u22p)" />
    <g fill="#4361ee" opacity=".5"><rect x="51" y="119" width="18" height="3" rx="1" /><rect x="51" y="125" width="12" height="2" rx="1" /><rect x="51" y="130" width="16" height="8" rx="1" /></g>
    <path d="M44 128q-4-4-2-10q4 2 6 8zM76 128q4-4 2-10q-4 2-6 8z" fill="#2b3a55" /><ellipse cx="44" cy="134" rx="5" ry="9" fill="#2b3a55" /><ellipse cx="76" cy="134" rx="5" ry="9" fill="#2b3a55" />
  </Svg>],

  [23, 'แมงกะพรุนลอยฟ้า', <Svg>
    <defs>
      <linearGradient id="u23s" x2="0" y2="1"><stop stopColor="#1b0f3a" /><stop offset=".55" stopColor="#5a2a6b" /><stop offset="1" stopColor="#f08aa8" /></linearGradient>
      <radialGradient id="u23p" cx=".5" cy=".3"><stop stopColor="#fff0f6" /><stop offset=".6" stopColor="#ff9ec4" /><stop offset="1" stopColor="#ff5d8f" stopOpacity=".5" /></radialGradient>
      <radialGradient id="u23c" cx=".5" cy=".3"><stop stopColor="#effeff" /><stop offset=".6" stopColor="#8ff0ff" /><stop offset="1" stopColor="#3ac7e0" stopOpacity=".5" /></radialGradient>
      <radialGradient id="u23g"><stop stopColor="#fff" stopOpacity=".35" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#u23s)" />
    <St p={[8, 8, .6, 30, 18, .5, 52, 6, .7, 80, 12, .5, 108, 20, .6, 98, 40, .4, 14, 44, .4]} />
    {[[30, 44, 1.4, 'p'], [84, 60, 1.7, 'c'], [52, 92, 1.05, 'p'], [98, 104, .8, 'c'], [18, 96, .7, 'c'], [70, 30, .55, 'p']].map(([x, y, s, k], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><circle r="16" fill="url(#u23g)" /><path d="M-10 2Q-10-14 0-14Q10-14 10 2Q5 0 0 2Q-5 0-10 2Z" fill={`url(#u23${k})`} /><path d="M-7-4q7-6 14 0" stroke="#fff" strokeWidth=".6" fill="none" opacity=".7" /><g stroke={k === 'p' ? '#ff9ec4' : '#8ff0ff'} strokeWidth=".9" fill="none" opacity=".85"><path d="M-7 2q-3 6 0 12t0 10" /><path d="M-2 2q2 7-1 14" /><path d="M3 2q-2 8 1 16" /><path d="M7 2q3 6 0 12" /></g></g>)}
    <path d="M0 138Q30 128 60 136T120 132V160H0Z" fill="#2a1240" /><path d="M0 146Q40 138 80 146T120 144V160H0Z" fill="#1d0a2e" />
    <g fill="#1d0a2e"><circle cx="72" cy="128" r="2.4" /><path d="M70 130.4h4l.6 7h-5.2z" /><path d="M72 128l-2-6" stroke="#1d0a2e" strokeWidth=".8" /></g>
    <g fill="#ff9ec4" opacity=".6"><circle cx="72" cy="124" r=".8" /></g>
  </Svg>],

  [24, 'กรงที่นกออกไปแล้ว', <Svg>
    <defs>
      <linearGradient id="u24s" x2="0" y2="1"><stop stopColor="#fdf3e1" /><stop offset="1" stopColor="#f2d9b1" /></linearGradient>
      <linearGradient id="u24g" x2="1" y2="0"><stop stopColor="#8b6b2e" /><stop offset=".5" stopColor="#e0c068" /><stop offset="1" stopColor="#7a5a1e" /></linearGradient>
      <radialGradient id="u24w" cx=".8" cy=".1"><stop stopColor="#fff" stopOpacity=".8" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      <linearGradient id="u24b" x2="1" y2="1"><stop stopColor="#8fd3ff" /><stop offset="1" stopColor="#3a7aa3" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#u24s)" /><rect width="120" height="160" fill="url(#u24w)" />
    <rect x="78" y="0" width="42" height="56" fill="#cfe8ff" opacity=".8" /><path d="M99 0V56M78 28h42" stroke="#d4b483" strokeWidth="2" />
    <path d="M60 0V22" stroke="#6b4c1e" strokeWidth="1" /><circle cx="60" cy="24" r="3" fill="none" stroke="url(#u24g)" strokeWidth="1.5" />
    <path d="M34 132V70Q60 26 86 70V132" stroke="url(#u24g)" strokeWidth="2.6" fill="none" />
    <g stroke="url(#u24g)" strokeWidth="1">{[42, 50, 60, 70, 78].map(x => <line key={x} x1={x} y1="132" x2={x} y2={x === 60 ? 40 : 46 + Math.abs(60 - x) * .6} />)}</g>
    <path d="M36 92h48M36 112h48" stroke="url(#u24g)" strokeWidth="1.4" />
    <path d="M86 92L108 82V120L86 124Z" fill="none" stroke="url(#u24g)" strokeWidth="1.6" /><g stroke="url(#u24g)" strokeWidth=".8"><path d="M93 89V122M100 86V121" /></g>
    <rect x="28" y="130" width="64" height="7" rx="2" fill="url(#u24g)" /><rect x="32" y="137" width="56" height="3" fill="#6b4c1e" />
    <path d="M46 102h28" stroke="#6b4c1e" strokeWidth="1.6" /><ellipse cx="66" cy="126" rx="5" ry="1.6" fill="#e9c46a" /><g fill="#c9a227"><circle cx="64" cy="125.4" r=".6" /><circle cx="67" cy="125.6" r=".6" /></g>
    <path d="M52 126q4-12 14-16q-2 10-14 16z" fill="url(#u24b)" /><path d="M52 126q6-8 13-15" stroke="#1d4e6e" strokeWidth=".6" fill="none" /><g stroke="#fff" strokeWidth=".4" opacity=".7"><path d="M56 120l3-1M58 117l3-1M61 114l2-1" /></g>
    <g transform="translate(98 36)"><path d="M-2-2L-14-14L4-4Z" fill="#3a7aa3" /><ellipse rx="8.5" ry="5" fill="url(#u24b)" /><circle cx="7" cy="-3" r="4" fill="#8fd3ff" /><polygon points="11,-3 15,-2 11,-1" fill="#f2a33a" /><circle cx="8" cy="-4" r=".8" fill="#000" /><path d="M-8 0l-7 3 7 1z" fill="#3a7aa3" /><path d="M2-2L8-14L10-3Z" fill="#5fa8d3" /></g>
    <path d="M90 42q-10 6-24 24" stroke="#8fd3ff" strokeWidth=".6" strokeDasharray="1.5 2" fill="none" />
  </Svg>],

  [25, 'หมู่บ้านเห็ด', <Svg>
    <defs>
      <linearGradient id="u25s" x2="0" y2="1"><stop stopColor="#132a13" /><stop offset="1" stopColor="#4f772d" /></linearGradient>
      <radialGradient id="u25r" cx=".4" cy=".3"><stop stopColor="#ff6b5b" /><stop offset="1" stopColor="#9d0208" /></radialGradient>
      <radialGradient id="u25o" cx=".4" cy=".3"><stop stopColor="#ffc857" /><stop offset="1" stopColor="#d97706" /></radialGradient>
      <radialGradient id="u25v" cx=".4" cy=".3"><stop stopColor="#c77dff" /><stop offset="1" stopColor="#5a189a" /></radialGradient>
      <linearGradient id="u25t" x2="1" y2="0"><stop stopColor="#d6ccc2" /><stop offset=".45" stopColor="#fbf6ee" /><stop offset="1" stopColor="#c9bfb0" /></linearGradient>
      <radialGradient id="u25w"><stop stopColor="#ffd86b" stopOpacity=".7" /><stop offset="1" stopColor="#ffd86b" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#u25s)" />
    <g fill="#0b1d0b">{[[0, 40, 14], [104, 30, 16], [20, 20, 6]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height="120" />)}</g>
    <g fill="#e6ff6b">{[[20, 30], [90, 20], [104, 64], [14, 76], [60, 24], [40, 50], [80, 46]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="4" fill="url(#u25w)" /><circle cx={x} cy={y} r=".9" /></g>)}</g>
    <path d="M0 140Q60 130 120 140V160H0Z" fill="#2a3b1f" /><g fill="#4f772d">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 10 + 2} 142l2-6 2 6z`} />)}</g>
    <path d="M68 142V96H98V142Z" fill="url(#u25t)" /><path d="M52 98Q83 48 114 98Q83 92 52 98Z" fill="url(#u25r)" />
    <g fill="#fff"><circle cx="70" cy="84" r="4.4" /><circle cx="90" cy="74" r="5.4" /><circle cx="102" cy="90" r="3.4" /><circle cx="80" cy="94" r="2.6" /><circle cx="64" cy="94" r="2" /></g>
    <path d="M60 98q23 6 46 0" stroke="#7a0a10" strokeWidth=".8" fill="none" />
    <path d="M77 142v-16a6 6 0 0 1 12 0v16z" fill="#7a4a2a" /><circle cx="86" cy="134" r=".9" fill="#ffd166" />
    <circle cx="83" cy="110" r="4.4" fill="#ffd86b" stroke="#7a4a2a" strokeWidth=".8" /><path d="M83 106v8M79 110h8" stroke="#7a4a2a" strokeWidth=".6" /><circle cx="83" cy="110" r="12" fill="url(#u25w)" />
    <path d="M22 142V114H40V142Z" fill="url(#u25t)" /><path d="M10 116Q31 86 52 116Q31 110 10 116Z" fill="url(#u25o)" /><g fill="#fff8e1"><circle cx="24" cy="106" r="2.6" /><circle cx="38" cy="102" r="3" /><circle cx="44" cy="110" r="1.6" /></g>
    <rect x="27" y="122" width="7" height="7" fill="#ffd86b" stroke="#7a4a2a" strokeWidth=".6" /><circle cx="30.5" cy="125.5" r="9" fill="url(#u25w)" />
    <path d="M52 142V132H58V142Z" fill="url(#u25t)" /><path d="M46 133Q55 120 64 133Q55 131 46 133Z" fill="url(#u25v)" /><circle cx="54" cy="127" r="1.2" fill="#fff" />
    <path d="M40 142Q46 150 58 146Q64 144 70 148" stroke="#c9a77c" strokeWidth="2" fill="none" strokeDasharray="2 2" />
  </Svg>],

  [26, 'ปลาหมึกนั่งถักไหมพรม', <Svg>
    <defs>
      <linearGradient id="u26s" x2="0" y2="1"><stop stopColor="#fde2e4" /><stop offset="1" stopColor="#f8c8d4" /></linearGradient>
      <linearGradient id="u26c" x2="0" y2="1"><stop stopColor="#6c8ebf" /><stop offset="1" stopColor="#3f5f8f" /></linearGradient>
      <radialGradient id="u26o" cx=".4" cy=".35"><stop stopColor="#ff9fa8" /><stop offset="1" stopColor="#d1495b" /></radialGradient>
      <radialGradient id="u26l" cx=".2" cy=".1"><stop stopColor="#fff8dc" stopOpacity=".9" /><stop offset="1" stopColor="#fff8dc" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#u26s)" />
    <g stroke="#f4b6c2" strokeWidth=".8">{[12, 36, 60, 84, 108].map(x => <path key={x} d={`M${x} 0V130`} />)}</g>
    <g fill="#f4b6c2">{Array.from({ length: 10 }, (_, i) => <circle key={i} cx={24 + (i % 5) * 24} cy={20 + (i / 5 | 0) * 40} r="1.6" />)}</g>
    <rect width="120" height="160" fill="url(#u26l)" />
    <rect y="136" width="120" height="24" fill="#c99a7a" /><g stroke="#a87a5a" strokeWidth=".6">{[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M${i * 22} 136l-4 24`} />)}</g>
    <ellipse cx="60" cy="140" rx="46" ry="6" fill="#e5989b" opacity=".6" />
    <path d="M16 140V80Q16 64 32 64H88Q104 64 104 80V140Z" fill="url(#u26c)" /><path d="M26 70h68" stroke="#8aaedd" strokeWidth="1" opacity=".7" />
    <g fill="#36547f">{[[30, 84], [60, 84], [90, 84]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" />)}</g>
    <rect x="10" y="96" width="18" height="44" rx="7" fill="#5876a6" /><rect x="92" y="96" width="18" height="44" rx="7" fill="#5876a6" />
    <rect x="22" y="104" width="76" height="14" rx="6" fill="#87a9d8" />
    <ellipse cx="60" cy="66" rx="22" ry="25" fill="url(#u26o)" />
    <g fill="#e5707e" opacity=".7">{[[50, 54, 2.4], [70, 50, 2], [62, 58, 1.4], [46, 66, 1.6]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <ellipse cx="52" cy="70" rx="4.6" ry="5.6" fill="#fff" /><ellipse cx="68" cy="70" rx="4.6" ry="5.6" fill="#fff" /><circle cx="53" cy="71" r="2.4" fill="#2b2d42" /><circle cx="67" cy="71" r="2.4" fill="#2b2d42" /><circle cx="53.8" cy="70" r=".8" fill="#fff" /><circle cx="67.8" cy="70" r=".8" fill="#fff" />
    <path d="M48 62q4-2 8 0M64 62q4-2 8 0" stroke="#9d2b45" strokeWidth=".9" fill="none" />
    <circle cx="47" cy="78" r="2" fill="#ff8fa3" opacity=".7" /><circle cx="73" cy="78" r="2" fill="#ff8fa3" opacity=".7" />
    <path d="M38 84q-14 10-6 26M46 88q-8 18 4 28M74 88q8 18-4 28M82 84q14 10 6 26M44 86q-22 6-26 22M76 86q22 6 26 22" stroke="url(#u26o)" strokeWidth="5" fill="none" strokeLinecap="round" />
    <g fill="#fff" opacity=".7">{[[33, 96], [48, 104], [72, 104], [88, 96]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" />)}</g>
    <path d="M36 100L56 84M84 100L64 84" stroke="#c9a25e" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M48 104h24v32h-24z" fill="#ffd166" /><g stroke="#ef476f" strokeWidth="3"><path d="M48 112h24M48 122h24M48 132h24" /></g><g stroke="#e6b84a" strokeWidth=".5">{[52, 56, 60, 64, 68].map(x => <path key={x} d={`M${x} 104v32`} />)}</g>
    <circle cx="20" cy="148" r="7" fill="#06d6a0" /><circle cx="100" cy="150" r="6" fill="#ef476f" /><circle cx="86" cy="152" r="4.4" fill="#118ab2" />
    <path d="M15 145q5 3 10 0M17 150q4 2 7 0M96 148q4 3 8 0" stroke="#fff" fill="none" opacity=".6" />
    <path d="M60 136Q66 152 94 150" stroke="#ef476f" fill="none" /><path d="M24 142Q36 132 50 134" stroke="#06d6a0" fill="none" />
  </Svg>],
];
