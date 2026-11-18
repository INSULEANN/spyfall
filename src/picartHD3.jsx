// ภาพการ์ดแบบละเอียด ชุด 3 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Link = ({ x, y, r = 0, c = '#8d99ae' }) => <g transform={`translate(${x} ${y}) rotate(${r})`}><rect x="-7" y="-4.5" width="14" height="9" rx="4.5" fill="none" stroke="#4a5568" strokeWidth="3.6" /><rect x="-7" y="-4.5" width="14" height="9" rx="4.5" fill="none" stroke={c} strokeWidth="2.4" /><path d="M-4-4h6" stroke="#e2e8f0" strokeWidth=".7" /></g>;

export const HD3 = [
  [174, 'โซ่ขาดกับนกที่บินไป', <Svg>
    <defs>
      <linearGradient id="m174s" x2="0" y2="1"><stop stopColor="#ffb4a2" /><stop offset=".6" stopColor="#ffd6a5" /><stop offset="1" stopColor="#fff1d6" /></linearGradient>
      <radialGradient id="m174g"><stop stopColor="#fff" stopOpacity=".8" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#m174s)" />
    <circle cx="86" cy="40" r="34" fill="url(#m174g)" />
    <g fill="#fff" opacity=".7"><ellipse cx="22" cy="30" rx="16" ry="4" /><ellipse cx="100" cy="90" rx="20" ry="4" /></g>
    <path d="M0 134Q30 126 60 132T120 128V160H0Z" fill="#9c6644" /><path d="M0 140Q40 134 80 140T120 138V160H0Z" fill="#7f5539" />
    <rect x="6" y="104" width="14" height="32" fill="#5c4033" /><circle cx="13" cy="112" r="3" fill="#4a5568" />
    <Link x={22} y={112} r={-20} /><Link x={33} y={106} r={60} /><Link x={44} y={100} r={-25} /><Link x={54} y={96} r={70} />
    <g transform="translate(64 92) rotate(-20)"><path d="M-7 0a7 4.5 0 0 1 7-4.5h2" fill="none" stroke="#4a5568" strokeWidth="3.6" /><path d="M-7 0a7 4.5 0 0 1 7-4.5h2" fill="none" stroke="#8d99ae" strokeWidth="2.4" /><path d="M-7 0a7 4.5 0 0 0 7 4.5" fill="none" stroke="#8d99ae" strokeWidth="2.4" /></g>
    <g transform="translate(74 84) rotate(40)"><path d="M3-4.5h4a4.5 4.5 0 0 1 0 9h-6" fill="none" stroke="#8d99ae" strokeWidth="2.4" /></g>
    <g fill="#fff6d6"><path d="M68 86l2-3 1 3z" /><path d="M70 92l3 0-2 2z" /><circle cx="72" cy="88" r=".8" /></g>
    <g fill="#fff"><path d="M64 80q2-3 4 0q-2 1-4 0zM58 70q2-3 4 0q-2 1-4 0zM66 62q2-3 4 0q-2 1-4 0z" opacity=".9" /></g>
    <g transform="translate(88 38)"><path d="M0 2Q-14-8-26-6Q-16 2-10 6Z" fill="#fff" stroke="#dcd3cc" strokeWidth=".5" /><path d="M-6-2Q-16-18-30-20Q-22-8-10 2Z" fill="#fff" /><path d="M-14-10l-8-2M-16-6l-8-1" stroke="#dcd3cc" strokeWidth=".5" /><path d="M0 0Q4-18 16-26Q12-12 8 0Z" fill="#f8f4f0" stroke="#dcd3cc" strokeWidth=".5" /><ellipse cx="2" cy="4" rx="11" ry="5.5" fill="#fff" /><circle cx="12" cy="0" r="4.5" fill="#fff" /><polygon points="16,0 21,1.5 16,2.6" fill="#f4a261" /><circle cx="13" cy="-.6" r="1" fill="#222" /><path d="M-8 6l-8 4 9-1z" fill="#fff" /><path d="M4 9l-2 4M7 9l1 4" stroke="#f4a261" strokeWidth=".8" /></g>
    <g fill="#fff" opacity=".85"><path d="M104 18q2-3 5 0q-2 1-5 0z" /><path d="M110 26q2-3 4 0q-2 1-4 0z" /></g>
  </Svg>],

  [157, 'กล้องเรือดำน้ำโผล่จากสนามหญ้า', <Svg>
    <defs>
      <linearGradient id="m157s" x2="0" y2="1"><stop stopColor="#8ecae6" /><stop offset="1" stopColor="#d4f1f9" /></linearGradient>
      <linearGradient id="m157g" x2="0" y2="1"><stop stopColor="#90be6d" /><stop offset="1" stopColor="#43aa8b" /></linearGradient>
      <linearGradient id="m157p" x2="1" y2="0"><stop stopColor="#495057" /><stop offset=".45" stopColor="#adb5bd" /><stop offset="1" stopColor="#495057" /></linearGradient>
      <linearGradient id="m157l" x2="1" y2="1"><stop stopColor="#caf0f8" /><stop offset="1" stopColor="#0077b6" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#m157s)" />
    <g fill="#fff"><ellipse cx="22" cy="24" rx="14" ry="6" /><circle cx="16" cy="20" r="6" /><circle cx="26" cy="18" r="7" /><ellipse cx="96" cy="14" rx="10" ry="4" /></g>
    <path d="M0 64Q30 56 60 62T120 58V70H0Z" fill="#6c9a8b" opacity=".6" />
    <path d="M0 68Q60 60 120 68V160H0Z" fill="url(#m157g)" />
    <path d="M0 96L120 84M0 124L120 110M0 152L120 138" stroke="#7cb563" strokeWidth="6" opacity=".35" />
    <g stroke="#2d6a4f" strokeWidth="1.1" strokeLinecap="round">{Array.from({ length: 26 }, (_, i) => { const x = (i * 37) % 118 + 2, y = 76 + (i * 23) % 82; return <path key={i} d={`M${x} ${y}l-1-4M${x + 2} ${y}l1-5M${x + 4} ${y}l1-3`} />; })}</g>
    <ellipse cx="62" cy="112" rx="16" ry="5" fill="#5a3e2b" /><g fill="#7f5539"><ellipse cx="48" cy="112" rx="4" ry="2" /><ellipse cx="76" cy="113" rx="3.5" ry="1.8" /><ellipse cx="70" cy="108" rx="3" ry="1.6" /></g>
    <rect x="58" y="62" width="8" height="50" fill="url(#m157p)" /><g stroke="#343a40" strokeWidth=".6"><path d="M58 76h8M58 92h8M58 104h8" /></g>
    <path d="M58 66V54Q58 50 62 50H80V62H66V66Z" fill="url(#m157p)" />
    <rect x="78" y="48" width="6" height="16" rx="1.5" fill="#343a40" /><rect x="84" y="50" width="2" height="12" fill="url(#m157l)" />
    <path d="M86 52l10-4M86 60l12 2" stroke="#fff" strokeWidth=".6" opacity=".7" />
    <g transform="translate(100 98)"><ellipse rx="7" ry="5" fill="#fff" /><circle cx="6" cy="-4" r="4" fill="#fff" /><polygon points="9,-4 13,-3 9,-2" fill="#f4a261" /><circle cx="7" cy="-5" r=".9" fill="#222" /><path d="M-2 5l-1 4M2 5l1 4" stroke="#f4a261" strokeWidth=".8" /><path d="M-6-2l-4-3 2 4z" fill="#e9ecef" /></g>
    <g fill="#ffd166">{[[18, 130], [30, 146], [104, 136], [12, 104]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="1.6" /><circle cx={x} cy={y} r=".6" fill="#f77f00" /></g>)}</g>
  </Svg>],

  [106, 'เส้นเชือกหุ่นกระบอก', <Svg>
    <defs>
      <linearGradient id="m106s" x2="0" y2="1"><stop stopColor="#3d0c11" /><stop offset="1" stopColor="#1a0508" /></linearGradient>
      <radialGradient id="m106l" cx=".5" cy=".75"><stop stopColor="#ffe8a3" stopOpacity=".7" /><stop offset="1" stopColor="#ffe8a3" stopOpacity="0" /></radialGradient>
      <linearGradient id="m106h" x2="0" y2="1"><stop stopColor="#e8b48a" /><stop offset="1" stopColor="#c48660" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#m106s)" />
    <path d="M0 0H22Q16 60 24 150H0ZM120 0H98Q104 60 96 150H120Z" fill="#8b1e2b" /><path d="M8 0Q6 80 10 150M112 0Q114 80 110 150" stroke="#5c0f18" strokeWidth="2" fill="none" />
    <path d="M0 0H120V14Q100 20 80 14Q60 20 40 14Q20 20 0 14Z" fill="#a4243b" /><path d="M0 14Q20 20 40 14Q60 20 80 14Q100 20 120 14" stroke="#f2c14e" strokeWidth="1.2" fill="none" />
    <ellipse cx="60" cy="130" rx="48" ry="26" fill="url(#m106l)" />
    <rect y="140" width="120" height="20" fill="#5a3a22" /><path d="M0 140h120" stroke="#8a5a36" strokeWidth="1.5" /><path d="M0 148h120M0 154h120" stroke="#3e2716" strokeWidth=".6" />
    <path d="M30 14Q60 4 90 14L86 24Q60 18 34 24Z" fill="url(#m106h)" /><g stroke="url(#m106h)" strokeWidth="5" strokeLinecap="round" fill="none"><path d="M36 20q-4-6 0-10" /><path d="M50 16q0-6 4-8" /><path d="M70 16q0-6-4-8" /><path d="M84 20q4-6 0-10" /></g>
    <g stroke="#f8f0e0" strokeWidth=".45" opacity=".85"><path d="M38 22L46 90M52 18L50 62M68 18L72 62M82 22L76 90M60 22V54" /></g>
    <g><circle cx="60" cy="58" r="7.5" fill="#f4d3b0" /><path d="M52 56q8-10 16 0q-2-6-8-6t-8 6z" fill="#3a1f12" /><circle cx="57" cy="58" r="1" fill="#222" /><circle cx="63" cy="58" r="1" fill="#222" /><path d="M57 62q3 2 6 0" stroke="#a24a3a" fill="none" /><circle cx="55" cy="61" r="1.2" fill="#ff8fa3" opacity=".7" /><circle cx="65" cy="61" r="1.2" fill="#ff8fa3" opacity=".7" />
      <path d="M53 66h14l3 24h-20z" fill="#2a9d8f" /><path d="M53 66h14l-1 6h-12z" fill="#21867a" /><path d="M60 66v24" stroke="#e9c46a" strokeWidth="1" /><circle cx="60" cy="74" r=".9" fill="#e9c46a" /><circle cx="60" cy="80" r=".9" fill="#e9c46a" />
      <path d="M53 68L46 90M67 68L72 62" stroke="#2a9d8f" strokeWidth="4" strokeLinecap="round" /><circle cx="46" cy="90" r="2" fill="#f4d3b0" /><circle cx="72" cy="62" r="2" fill="#f4d3b0" />
      <path d="M54 90L50 116L46 138M66 90L74 112L80 134" stroke="#264653" strokeWidth="4.5" strokeLinecap="round" fill="none" /><path d="M42 138h7M78 134h7" stroke="#3a1f12" strokeWidth="3" strokeLinecap="round" />
      <g fill="#e9c46a"><circle cx="50" cy="116" r="1.4" /><circle cx="74" cy="112" r="1.4" /></g></g>
    <ellipse cx="62" cy="142" rx="20" ry="2.5" fill="#000" opacity=".3" />
  </Svg>],

  [66, 'สมอที่ลอยขึ้นฟ้า', <Svg>
    <defs>
      <linearGradient id="m66s" x2="0" y2="1"><stop stopColor="#ffafcc" /><stop offset=".45" stopColor="#cdb4db" /><stop offset="1" stopColor="#4cc9f0" /></linearGradient>
      <linearGradient id="m66a" x2="1" y2="0"><stop stopColor="#5c677d" /><stop offset=".5" stopColor="#c0c6d0" /><stop offset="1" stopColor="#5c677d" /></linearGradient>
      <linearGradient id="m66w" x2="0" y2="1"><stop stopColor="#4361ee" /><stop offset="1" stopColor="#1b2a6b" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#m66s)" />
    <g fill="#fff" opacity=".8"><ellipse cx="20" cy="40" rx="18" ry="5" /><circle cx="14" cy="36" r="6" /><circle cx="24" cy="34" r="7" /><ellipse cx="100" cy="70" rx="16" ry="4" /><circle cx="104" cy="66" r="5" /></g>
    <path d="M0 128q10-5 20 0t20 0t20 0t20 0t20 0t20 0V160H0Z" fill="url(#m66w)" /><path d="M0 128q10-5 20 0t20 0t20 0t20 0t20 0t20 0" stroke="#bde0fe" strokeWidth="1.2" fill="none" />
    <path d="M14 138q6-2 12 0M70 146q6-2 12 0M92 136q6-2 12 0" stroke="#90e0ef" fill="none" opacity=".7" />
    <g fill="#bde0fe" opacity=".85"><circle cx="58" cy="126" r="1.5" /><circle cx="62" cy="120" r="1" /><circle cx="56" cy="114" r="1.2" /><circle cx="64" cy="110" r=".8" /></g>
    <path d="M60 128Q58 112 60 104" stroke="#bde0fe" strokeWidth="1" strokeDasharray="2 2" fill="none" />
    <path d="M60 64Q46 34 60 14" stroke="#6b4226" strokeWidth="1.6" fill="none" /><g stroke="#6b4226" strokeWidth=".6" opacity=".7">{[20, 28, 36, 44, 52].map(y => <path key={y} d={`M${55 + (y % 8)} ${y}l3 2`} />)}</g>
    <g transform="translate(60 74)"><circle cx="0" cy="-4" r="5" fill="none" stroke="url(#m66a)" strokeWidth="3" /><rect x="-2.5" y="0" width="5" height="40" fill="url(#m66a)" /><rect x="-12" y="8" width="24" height="4.5" rx="2" fill="url(#m66a)" /><circle cx="-12" cy="10.2" r="2.6" fill="#8d99ae" /><circle cx="12" cy="10.2" r="2.6" fill="#8d99ae" />
      <path d="M-24 26Q-22 44 0 44Q22 44 24 26" stroke="url(#m66a)" strokeWidth="5" fill="none" strokeLinecap="round" /><path d="M-28 24L-20 26L-26 34Z M28 24L20 26L26 34Z" fill="#8d99ae" />
      <path d="M-2 14l-1 22" stroke="#e9ecef" strokeWidth=".8" opacity=".7" />
      <g fill="#2a9d8f" opacity=".85"><path d="M-6 36q-4 6-2 10q2-4 4-6z" /><path d="M8 38q4 4 2 8q-2-2-3-6z" /></g></g>
    <g fill="#fff" opacity=".9"><path d="M28 80q2-3 5 0q-2 1-5 0z" /><path d="M94 40q2-3 5 0q-2 1-5 0z" /></g>
    <g transform="translate(98 116)"><path d="M-6 0H6L4 4H-4Z" fill="#9c6644" /><path d="M0 0V-10L6-2Z" fill="#fff" /></g>
  </Svg>],

  [81, 'นาฬิกาปลุกใต้หมอน', <Svg>
    <defs>
      <linearGradient id="m81s" x2="0" y2="1"><stop stopColor="#ffe5b4" /><stop offset="1" stopColor="#ffcf99" /></linearGradient>
      <linearGradient id="m81p" x2="0" y2="1"><stop stopColor="#ffffff" /><stop offset="1" stopColor="#dfe3ee" /></linearGradient>
      <linearGradient id="m81b" x2="0" y2="1"><stop stopColor="#7b8cde" /><stop offset="1" stopColor="#4d5aa8" /></linearGradient>
      <radialGradient id="m81r"><stop stopColor="#fff3b0" stopOpacity=".9" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#m81s)" />
    <rect x="70" y="10" width="40" height="44" fill="#bde0fe" /><circle cx="100" cy="22" r="22" fill="url(#m81r)" /><circle cx="100" cy="22" r="6" fill="#ffd166" />
    <path d="M90 10V54M70 32H110" stroke="#f4a261" strokeWidth="2" /><rect x="68" y="8" width="44" height="48" fill="none" stroke="#f4a261" strokeWidth="3" />
    <path d="M60 4Q64 30 60 60L66 60Q70 30 66 4Z" fill="#f28482" opacity=".8" />
    <rect x="0" y="100" width="120" height="60" fill="url(#m81b)" /><path d="M0 108Q30 100 60 110T120 104" stroke="#9aa6ee" strokeWidth="2" fill="none" /><path d="M0 124Q40 116 80 126T120 120" stroke="#3e4a93" strokeWidth="1.2" fill="none" />
    <path d="M0 98H120V104H0Z" fill="#f4a261" />
    <path d="M8 102Q6 76 30 72Q60 68 90 72Q112 76 110 102Q60 108 8 102Z" fill="url(#m81p)" stroke="#c9cfdd" />
    <path d="M24 80q36-8 70 0" stroke="#e5e8f0" strokeWidth="1.5" fill="none" /><path d="M60 72v32" stroke="#e5e8f0" strokeWidth="1" />
    <g transform="translate(96 66) rotate(18)"><circle r="10" fill="#e63946" /><circle r="7.5" fill="#fffaf0" /><path d="M0 0V-5M0 0l3 2" stroke="#222" strokeWidth="1" strokeLinecap="round" /><circle cx="-7" cy="-9" r="3.6" fill="#ffd166" /><circle cx="7" cy="-9" r="3.6" fill="#ffd166" /><path d="M-3-12h6" stroke="#222" /></g>
    <g stroke="#333" strokeWidth="1.3" strokeLinecap="round" fill="none"><path d="M108 54l6-6M110 62h7M104 48l1-7" /><path d="M84 52l-4-4" /></g>
    <path d="M30 70q-2-8 2-14M24 74q-6-6-2-16" stroke="#333" strokeWidth=".9" fill="none" />
    <g transform="translate(36 96)"><path d="M-12 0Q-14-12-2-14Q10-16 14-6Q16 0 10 2Z" fill="#f1c27d" /><path d="M-10-10q8-6 18-2q-4-10-14-6q-6 2-4 8z" fill="#5a3e2b" /><path d="M-4-6q2 1 4 0M4-6q2 1 4 0" stroke="#5a3e2b" strokeWidth=".8" fill="none" /></g>
    <path d="M44 84q3-3 6 0q-3 3-6 0z" fill="#fff" stroke="#c9cfdd" strokeWidth=".4" />
  </Svg>],

  [61, 'ว่าวติดต้นไม้', <Svg>
    <defs>
      <linearGradient id="m61s" x2="0" y2="1"><stop stopColor="#4cc9f0" /><stop offset="1" stopColor="#caf0f8" /></linearGradient>
      <radialGradient id="m61t" cx=".4" cy=".35"><stop stopColor="#80b918" /><stop offset="1" stopColor="#2b9348" /></radialGradient>
      <linearGradient id="m61k" x2="1" y2="1"><stop stopColor="#ff4d6d" /><stop offset="1" stopColor="#c9184a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#m61s)" />
    <g fill="#fff"><ellipse cx="20" cy="22" rx="16" ry="5" /><circle cx="14" cy="18" r="6" /><circle cx="24" cy="16" r="7" /><ellipse cx="102" cy="40" rx="12" ry="4" /><circle cx="98" cy="36" r="5" /></g>
    <path d="M0 136Q60 126 120 136V160H0Z" fill="#55a630" /><path d="M0 146Q60 138 120 148V160H0Z" fill="#2b9348" />
    <path d="M60 140Q58 110 62 90L56 72M62 96L76 80M60 112L44 98" stroke="#6f4518" strokeWidth="7" fill="none" strokeLinecap="round" /><path d="M58 140Q56 110 60 92" stroke="#8b5a2b" strokeWidth="2" fill="none" />
    <g fill="url(#m61t)"><circle cx="58" cy="60" r="26" /><circle cx="34" cy="78" r="18" /><circle cx="86" cy="72" r="19" /><circle cx="62" cy="40" r="18" /></g>
    <g fill="#2b9348" opacity=".6">{[[44, 54], [70, 50], [80, 78], [30, 82], [56, 72]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q4-4 8 0q-4 4-8 0z`} />)}</g>
    <g fill="#ffd166"><circle cx="40" cy="68" r="1.6" /><circle cx="72" cy="66" r="1.6" /><circle cx="54" cy="44" r="1.6" /></g>
    <g transform="translate(76 46) rotate(24)"><polygon points="0,-16 11,0 0,18 -11,0" fill="url(#m61k)" /><polygon points="0,-16 11,0 0,0" fill="#ffd166" /><polygon points="0,0 -11,0 0,18" fill="#ffd166" /><path d="M0-16V18M-11 0H11" stroke="#fff" strokeWidth=".7" /></g>
    <path d="M82 60q6 8 0 14q-6 6 2 12q6 4 2 10" stroke="#ef476f" strokeWidth=".9" fill="none" /><g fill="#4cc9f0"><path d="M84 70l4 1-3 2z" /><path d="M84 82l4 1-3 2z" /></g><g fill="#ffd166"><path d="M82 76l-4 1 3 2z" /><path d="M86 92l4 1-3 2z" /></g>
    <path d="M70 42Q96 90 118 120" stroke="#fff" strokeWidth=".6" fill="none" />
    <g transform="translate(108 128)"><circle cx="0" cy="-12" r="3.4" fill="#f1c27d" /><path d="M-3-9h6l1 10h-8z" fill="#ffb703" /><path d="M-2 1v6M2 1v6" stroke="#264653" strokeWidth="2" /><path d="M3-7l6-3" stroke="#f1c27d" strokeWidth="1.6" strokeLinecap="round" /><path d="M-3-14q3-4 6 0" fill="#5a3e2b" /></g>
  </Svg>],

  [35, 'สะพานขาด', <Svg>
    <defs>
      <linearGradient id="m35s" x2="0" y2="1"><stop stopColor="#a8b5c4" /><stop offset=".5" stopColor="#d7dee6" /><stop offset="1" stopColor="#eef2f5" /></linearGradient>
      <linearGradient id="m35c" x2="1" y2="0"><stop stopColor="#2f3a48" /><stop offset="1" stopColor="#4a5868" /></linearGradient>
      <linearGradient id="m35d" x2="1" y2="0"><stop stopColor="#4a5868" /><stop offset="1" stopColor="#2f3a48" /></linearGradient>
      <linearGradient id="m35f" x2="0" y2="1"><stop stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" stopOpacity=".95" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#m35s)" />
    <path d="M30 60L44 44L56 56L70 38L86 54L96 46V80H30Z" fill="#b8c4d0" opacity=".7" />
    <path d="M0 76H30L34 100L28 120L36 160H0Z" fill="url(#m35c)" /><path d="M120 70H90L86 96L94 118L84 160H120Z" fill="url(#m35d)" />
    <g fill="#1f2833"><path d="M0 76H30L28 80H0Z" /><path d="M120 70H90L92 74H120Z" /></g>
    <g fill="#3a5a40"><path d="M2 76l3-8 3 8z" /><path d="M10 76l4-10 4 10z" /><path d="M110 70l3-8 3 8z" /><path d="M100 70l4-11 4 11z" /></g>
    <path d="M24 74V62M96 68V56" stroke="#5c4033" strokeWidth="2" />
    <path d="M24 62Q38 72 50 78M96 56Q84 66 72 74" stroke="#8a7560" strokeWidth=".9" fill="none" />
    <path d="M28 80Q38 86 52 92" stroke="#5c4033" strokeWidth="1.2" fill="none" /><path d="M92 74Q82 80 70 86" stroke="#5c4033" strokeWidth="1.2" fill="none" />
    <g fill="#8d6e4f" stroke="#5c4033" strokeWidth=".5">{[0, 1, 2, 3, 4].map(i => <rect key={i} x={30 + i * 4.4} y={80 + i * 2.6} width="3.6" height="5" transform={`rotate(25 ${32 + i * 4.4} ${82 + i * 2.6})`} />)}{[0, 1, 2, 3].map(i => <rect key={'r' + i} x={86 - i * 4.4} y={74 + i * 2.6} width="3.6" height="5" transform={`rotate(-25 ${88 - i * 4.4} ${76 + i * 2.6})`} />)}</g>
    <path d="M50 92l-2 12 3 8M70 86l2 10-2 6" stroke="#5c4033" strokeWidth=".8" fill="none" />
    <g fill="#8d6e4f"><rect x="44" y="118" width="3" height="5" transform="rotate(40 45 120)" /><rect x="66" y="130" width="3" height="5" transform="rotate(-30 67 132)" /></g>
    <g fill="#1f2833"><circle cx="16" cy="64" r="2.8" /><path d="M13.5 67h5l.6 9h-6.2z" /><path d="M18 68l6-5" stroke="#1f2833" strokeWidth="1.3" strokeLinecap="round" /><path d="M14.5 76v4M17.5 76v4" stroke="#1f2833" strokeWidth="1.4" /></g>
    <g fill="#1f2833"><circle cx="104" cy="58" r="2.6" /><path d="M101.5 61h5l.6 9h-6.2z" /><path d="M101.5 63l-4-2" stroke="#1f2833" strokeWidth="1.3" strokeLinecap="round" /><path d="M102.5 70v4M105.5 70v4" stroke="#1f2833" strokeWidth="1.4" /><path d="M106 60l2-6" stroke="#e63946" strokeWidth=".8" /><path d="M108 54l4 1.5-4 1.5z" fill="#e63946" /></g>
    <rect y="100" width="120" height="60" fill="url(#m35f)" />
    <g fill="#5c6b7a"><path d="M40 30q3-3 6 0q-3 1-6 0z" /><path d="M48 24q2-2 4 0q-2 1-4 0z" /></g>
  </Svg>],

  [46, 'บันไดพาดพระจันทร์', <Svg>
    <defs>
      <linearGradient id="m46s" x2="0" y2="1"><stop stopColor="#0b132b" /><stop offset=".7" stopColor="#1c2541" /><stop offset="1" stopColor="#3a506b" /></linearGradient>
      <radialGradient id="m46g"><stop stopColor="#fff4c2" stopOpacity=".55" /><stop offset="1" stopColor="#fff4c2" stopOpacity="0" /></radialGradient>
      <radialGradient id="m46m" cx=".4" cy=".35"><stop stopColor="#fffbe6" /><stop offset="1" stopColor="#efdf9e" /></radialGradient>
      <radialGradient id="m46w"><stop stopColor="#ffd166" stopOpacity=".8" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#m46s)" />
    <St p={[8, 10, .6, 18, 34, .5, 30, 8, .8, 46, 20, .4, 10, 70, .6, 116, 80, .5, 104, 100, .4, 40, 52, .5, 112, 6, .5]} />
    <circle cx="82" cy="40" r="46" fill="url(#m46g)" /><circle cx="82" cy="40" r="26" fill="url(#m46m)" />
    <g fill="#e6d48c" opacity=".8"><circle cx="72" cy="32" r="4.5" /><circle cx="90" cy="50" r="6" /><circle cx="92" cy="30" r="2.6" /><circle cx="76" cy="52" r="2" /></g>
    <g fill="#d4c07a" opacity=".6"><circle cx="72.6" cy="32.6" r="3" /><circle cx="90.6" cy="50.6" r="4" /></g>
    <path d="M0 130L14 118L28 126V112H38V160H0Z" fill="#0a0f22" /><path d="M36 160V124L56 108L76 124V160Z" fill="#111833" /><path d="M74 160V130L94 116L112 128L120 122V160Z" fill="#0a0f22" />
    <g fill="#ffd166"><rect x="8" y="134" width="5" height="6" /><rect x="48" y="132" width="5" height="6" /><rect x="58" y="142" width="5" height="6" /><rect x="96" y="138" width="5" height="6" /></g>
    <g fill="url(#m46w)"><circle cx="10.5" cy="137" r="7" /><circle cx="50.5" cy="135" r="7" /><circle cx="98.5" cy="141" r="7" /></g>
    <g stroke="#c8a06a" strokeWidth="1.6" strokeLinecap="round"><line x1="44" y1="118" x2="62" y2="52" /><line x1="54" y1="120" x2="70" y2="56" /></g>
    <g stroke="#a07c4a" strokeWidth="1.3">{[0, 1, 2, 3, 4, 5, 6, 7].map(i => <line key={i} x1={46 - .2 + i * 2.2} y1={112 - i * 8} x2={55.6 + i * 2} y2={114 - i * 8} />)}</g>
    <g fill="#0a0f22"><circle cx="61" cy="70" r="2.4" /><path d="M59 72.4h4l.4 7h-4.8z" /><path d="M63 74l4-4M59 74l-2 4M60 79l-1 5M62 79l2 4" stroke="#0a0f22" strokeWidth="1.3" strokeLinecap="round" /></g>
    <path d="M66 68l1-3 1 3" stroke="#ffd166" strokeWidth=".6" fill="none" />
  </Svg>],
];
