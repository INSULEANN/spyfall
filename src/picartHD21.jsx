// ภาพการ์ดแบบละเอียด ชุด 21 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD21 = [
  [150, 'หน้ากากหลายใบบนโต๊ะ', <Svg>
    <defs>
      <radialGradient id="f150s" cx=".5" cy=".3"><stop stopColor="#6d6875" /><stop offset="1" stopColor="#2b2633" /></radialGradient>
      <radialGradient id="f150l" cx=".5" cy="0"><stop stopColor="#fff8dc" stopOpacity=".55" /><stop offset="1" stopColor="#fff8dc" stopOpacity="0" /></radialGradient>
      <linearGradient id="f150t" x2="0" y2="1"><stop stopColor="#5a3e2b" /><stop offset="1" stopColor="#3a2416" /></linearGradient>
      <radialGradient id="f150a" cx=".4" cy=".3"><stop stopColor="#fff" /><stop offset="1" stopColor="#d6d0c4" /></radialGradient>
      <radialGradient id="f150b" cx=".4" cy=".3"><stop stopColor="#cfe8ff" /><stop offset="1" stopColor="#7aa6d6" /></radialGradient>
      <radialGradient id="f150c" cx=".4" cy=".3"><stop stopColor="#ffe8c4" /><stop offset="1" stopColor="#e0a96d" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#f150s)" /><path d="M30 0H90L120 110H0Z" fill="url(#f150l)" />
    <path d="M0 108H120V160H0Z" fill="url(#f150t)" /><path d="M0 108h120" stroke="#8a5a3b" strokeWidth="1.5" /><g stroke="#2a180c" strokeWidth=".6" fill="none"><path d="M0 124q60-4 120 0M0 140q60-4 120 0" /></g>
    <g transform="rotate(-16 32 112)"><ellipse cx="32" cy="114" rx="18" ry="22" fill="#000" opacity=".25" transform="translate(2 3)" /><ellipse cx="32" cy="112" rx="18" ry="22" fill="url(#f150a)" /><path d="M22 104q4-3 7 0M35 104q4-3 7 0" stroke="#2b2633" strokeWidth="2.2" fill="none" strokeLinecap="round" /><path d="M23 118q9 9 18 0" stroke="#2b2633" strokeWidth="2.2" fill="none" strokeLinecap="round" /><circle cx="22" cy="114" r="2" fill="#ff8fa3" opacity=".6" /><circle cx="42" cy="114" r="2" fill="#ff8fa3" opacity=".6" /></g>
    <g transform="rotate(14 88 118)"><ellipse cx="88" cy="120" rx="18" ry="22" fill="#000" opacity=".25" transform="translate(2 3)" /><ellipse cx="88" cy="118" rx="18" ry="22" fill="url(#f150b)" /><path d="M78 108q4 3 7 0M91 108q4 3 7 0" stroke="#2b2633" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M80 128q8-8 16 0" stroke="#2b2633" strokeWidth="2.2" fill="none" strokeLinecap="round" /><path d="M80 112q-1 6 0 8" stroke="#4cc9f0" strokeWidth="1.6" fill="none" /></g>
    <ellipse cx="60" cy="68" rx="21" ry="26" fill="url(#f150c)" /><ellipse cx="52" cy="62" rx="4.4" ry="3" fill="#2b2633" /><ellipse cx="68" cy="62" rx="4.4" ry="3" fill="#2b2633" /><path d="M52 80h16" stroke="#2b2633" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 56q8-6 16-2M60 54q8-4 16 2" stroke="#8a5a2b" strokeWidth=".8" fill="none" opacity=".6" />
    <path d="M39 68Q30 70 26 80M81 68Q90 70 94 80" stroke="#e63946" strokeWidth="1" fill="none" />
    <path d="M44 50q6-8 16-8" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".5" strokeLinecap="round" />
  </Svg>],

  [151, 'ปล่อยนกกระดาษ', <Svg>
    <defs>
      <linearGradient id="f151s" x2="0" y2="1"><stop stopColor="#fdfcdc" /><stop offset="1" stopColor="#f0ead2" /></linearGradient>
      <radialGradient id="f151l" cx=".75" cy=".3"><stop stopColor="#ffe5d9" stopOpacity=".9" /><stop offset="1" stopColor="#ffe5d9" stopOpacity="0" /></radialGradient>
      <linearGradient id="f151b" x2="1" y2="1"><stop stopColor="#f4a261" /><stop offset="1" stopColor="#e07a5f" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#f151s)" /><rect width="120" height="160" fill="url(#f151l)" />
    <g stroke="#e9dfc4" strokeWidth=".6">{[20, 40, 60, 80, 100, 120, 140].map(y => <path key={y} d={`M0 ${y}h120`} />)}</g>
    <g fill="none" stroke="#22333b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 156Q16 124 38 114Q50 110 58 116L72 112Q78 112 76 118L62 126Q52 132 44 130" />
      <path d="M58 116q6-4 12 0M56 122q6-2 12 0" /><path d="M6 156L26 160" /><path d="M38 114q-4 10 2 18" strokeWidth=".8" />
    </g>
    <path d="M30 140q8-4 16-2" stroke="#22333b" strokeWidth=".6" fill="none" />
    <g transform="translate(84 66)"><path d="M-10 6L10-6L4 10Z" fill="url(#f151b)" /><path d="M-10 6L-16-10L2 2Z" fill="#f4a261" /><path d="M4 10L-2-2" stroke="#9c4a2a" strokeWidth=".7" /><path d="M10-6l6-4" stroke="#e07a5f" strokeWidth="1.6" strokeLinecap="round" /><path d="M-16-10l-2-3" stroke="#f4a261" strokeWidth="1.2" /></g>
    <path d="M64 108q6-14 14-28" stroke="#22333b" strokeWidth=".7" strokeDasharray="2 3" fill="none" />
    <g stroke="#22333b" strokeWidth="1.3" fill="none" strokeLinecap="round"><path d="M92 26Q95 22 98 26Q101 22 104 26" /><path d="M78 16Q80 13 82 16Q84 13 86 16" /><path d="M106 40Q108 37 110 40Q112 37 114 40" /></g>
    <g fill="#e07a5f" opacity=".7"><circle cx="70" cy="54" r="1" /><circle cx="96" cy="58" r=".8" /></g>
  </Svg>],

  [152, 'แมวนั่งบนสายพานซูชิ', <Svg>
    <defs>
      <linearGradient id="f152w" x2="0" y2="1"><stop stopColor="#ffe5d9" /><stop offset="1" stopColor="#ffcad4" /></linearGradient>
      <linearGradient id="f152b" x2="0" y2="1"><stop stopColor="#ced4da" /><stop offset="1" stopColor="#868e96" /></linearGradient>
      <radialGradient id="f152c" cx=".4" cy=".3"><stop stopColor="#868e96" /><stop offset="1" stopColor="#343a40" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#f152w)" />
    <g fill="#e63946" opacity=".18">{[0, 1, 2, 3, 4].map(i => <rect key={i} x={i * 26} y="8" width="20" height="30" rx="2" />)}</g>
    <path d="M0 4Q60 16 120 4" stroke="#6b4226" strokeWidth=".8" fill="none" /><g>{[16, 40, 64, 88, 112].map((x, i) => <g key={x}><line x1={x} y1={6 + Math.sin(i) * 2} x2={x} y2="12" stroke="#6b4226" strokeWidth=".6" /><ellipse cx={x} cy="18" rx="5" ry="6.4" fill="#e63946" /><path d={`M${x - 5} 18h10`} stroke="#000" strokeWidth=".4" opacity=".3" /></g>)}</g>
    <rect y="102" width="120" height="18" fill="url(#f152b)" /><rect y="98" width="120" height="4" fill="#495057" /><g stroke="#6c757d" strokeWidth=".7">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 10} 102v18`} />)}</g>
    <rect y="120" width="120" height="40" fill="#8d6e63" /><path d="M0 120h120" stroke="#a1887f" strokeWidth="1.5" />
    {[[16, '#e63946', '#f4a261'], [100, '#457b9d', '#fff']].map(([x, c, f], i) => <g key={i}><ellipse cx={x} cy="99" rx="12" ry="3.4" fill={c} /><ellipse cx={x} cy="98" rx="9" ry="2.4" fill="#fff" opacity=".3" /><rect x={x - 7} y="90" width="14" height="7" rx="3" fill="#fff" /><rect x={x - 7} y="87" width="14" height="5" rx="2" fill={f === '#fff' ? '#ff8fa3' : f} /><rect x={x - 1.4} y="88" width="2.8" height="9" fill="#264653" /></g>)}
    <ellipse cx="58" cy="99" rx="15" ry="4" fill="#ffd166" /><path d="M46 98h24" stroke="#e9c46a" strokeWidth=".6" />
    <g><ellipse cx="58" cy="86" rx="13" ry="11" fill="url(#f152c)" /><circle cx="58" cy="69" r="10" fill="url(#f152c)" /><polygon points="49,65 50,55 56,63" fill="#343a40" /><polygon points="67,65 66,55 60,63" fill="#343a40" /><polygon points="50.6,64 51,58 54,62" fill="#ffafcc" /><polygon points="65.4,64 65,58 62,62" fill="#ffafcc" />
      <path d="M52 69q2 2 4 0M60 69q2 2 4 0" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" /><polygon points="57,72 59,72 58,73.6" fill="#ffafcc" /><path d="M58 73.6v1.4M56 76q2 1 4 0" stroke="#fff" strokeWidth=".5" fill="none" />
      <g stroke="#dee2e6" strokeWidth=".35"><path d="M54 73l-8-1M54 74l-8 2M62 73l8-1M62 74l8 2" /></g>
      <ellipse cx="58" cy="90" rx="6" ry="5" fill="#adb5bd" /><path d="M71 92q10 0 8-10" stroke="url(#f152c)" strokeWidth="3.4" fill="none" strokeLinecap="round" /></g>
    <g fill="#fff" opacity=".8"><path d="M30 60q2-6 0-10M34 60q2-6 0-10" stroke="#fff" strokeWidth=".6" fill="none" /></g>
    <rect x="86" y="128" width="20" height="10" rx="2" fill="#2b2d42" /><rect x="88" y="126" width="16" height="3" fill="#e63946" />
  </Svg>],

  [153, 'หมวกนักบินอวกาศกลางทุ่งดอกไม้', <Svg>
    <defs>
      <linearGradient id="f153s" x2="0" y2="1"><stop stopColor="#ffcfd2" /><stop offset=".6" stopColor="#f1c0e8" /><stop offset="1" stopColor="#cfbaf0" /></linearGradient>
      <linearGradient id="f153g" x2="0" y2="1"><stop stopColor="#b9fbc0" /><stop offset="1" stopColor="#80b918" /></linearGradient>
      <radialGradient id="f153h" cx=".35" cy=".3"><stop stopColor="#fff" /><stop offset="1" stopColor="#ced4da" /></radialGradient>
      <linearGradient id="f153v" x2="1" y2="1"><stop stopColor="#a2d2ff" /><stop offset=".5" stopColor="#457b9d" /><stop offset="1" stopColor="#1d3557" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#f153s)" />
    <circle cx="94" cy="32" r="12" fill="#fff" opacity=".6" /><circle cx="22" cy="20" r="4" fill="#fff" opacity=".5" />
    <path d="M0 98Q60 82 120 100V160H0Z" fill="#90dbf4" opacity=".55" /><path d="M0 110Q60 98 120 112V160H0Z" fill="url(#f153g)" />
    <g stroke="#55a630" strokeWidth=".8">{Array.from({ length: 22 }, (_, i) => { const x = (i * 37) % 118 + 1, y = 116 + (i * 13) % 40; return <path key={i} d={`M${x} ${y}v-6`} />; })}</g>
    {[[10, 120, '#ff70a6'], [24, 136, '#ffd670'], [96, 128, '#ff70a6'], [108, 146, '#e9ff70'], [40, 150, '#ff9770'], [80, 150, '#ff70a6'], [70, 118, '#ffd670'], [16, 152, '#ff9770'], [100, 116, '#c77dff'], [32, 124, '#c77dff']].map(([x, y, c], i) => <g key={i}>{[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx={x} cy={y - 2} rx="1.4" ry="2.2" fill={c} transform={`rotate(${a} ${x} ${y})`} />)}<circle cx={x} cy={y} r="1" fill="#fff" /></g>)}
    <ellipse cx="58" cy="140" rx="22" ry="4" fill="#55a630" opacity=".5" />
    <circle cx="58" cy="122" r="19" fill="url(#f153h)" stroke="#adb5bd" strokeWidth="1.2" /><path d="M40 128h36" stroke="#adb5bd" strokeWidth="3" />
    <path d="M44 120a14 12 0 0 1 28 0v4H44z" fill="url(#f153v)" /><path d="M48 114q6-6 14-2" stroke="#fff" strokeWidth="2" fill="none" opacity=".7" strokeLinecap="round" />
    <g fill="#e63946"><circle cx="72" cy="132" r="1.4" /></g><rect x="44" y="132" width="8" height="4" rx="1" fill="#4361ee" />
    <path d="M72 108q6-14 2-20M76 106q8-6 10-14" stroke="#55a630" strokeWidth="1.2" fill="none" /><g>{[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx="74" cy="85.6" rx="1.6" ry="2.6" fill="#ff70a6" transform={`rotate(${a} 74 88)`} />)}<circle cx="74" cy="88" r="1.2" fill="#ffd166" /></g>
    <g transform="translate(30 70)"><path d="M0 0q-6-8-10-4q4 6 10 4zM0 0q6-8 10-4q-4 6-10 4z" fill="#ff9770" /><path d="M0-3v6" stroke="#3a2a1a" strokeWidth=".7" /></g>
  </Svg>],

  [154, 'ช้างกับเจดีย์ยามเย็น', <Svg>
    <defs>
      <linearGradient id="f154s" x2="0" y2="1"><stop stopColor="#5a189a" /><stop offset=".45" stopColor="#ff5400" /><stop offset="1" stopColor="#ffbd00" /></linearGradient>
      <radialGradient id="f154u"><stop stopColor="#fff3c4" /><stop offset=".4" stopColor="#ffd166" stopOpacity=".7" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#f154s)" />
    <circle cx="74" cy="84" r="44" fill="url(#f154u)" /><circle cx="74" cy="84" r="20" fill="#fff3c4" opacity=".9" />
    <g fill="#ffd166" opacity=".5"><rect x="40" y="82" width="68" height="1.4" /><rect x="48" y="90" width="52" height="1.4" /></g>
    <path d="M0 116L30 106L60 112L90 102L120 108V120H0Z" fill="#7a2f1a" opacity=".6" />
    <g fill="#3c1518"><path d="M62 116V100L66 90L70 72L72 40L74 72L78 90L82 100V116Z" /><circle cx="72" cy="94" r="10" /><rect x="62" y="104" width="20" height="4" /><path d="M72 40l-1-6h2z" /><g>{[48, 56, 64].map(y => <rect key={y} x={71 - (y - 40) * .06} y={y} width={2 + (y - 40) * .12} height="1.4" fill="#5a2028" />)}</g>
      <path d="M88 116V102L91 96L93 84L95 96L98 102V116Z" /><circle cx="93" cy="99" r="5" /><path d="M48 116V106L50 100L51 92L52 100L54 106V116Z" /></g>
    <rect y="114" width="120" height="46" fill="#3c1518" />
    <g fill="#5a2028" opacity=".6">{[[20, 130], [90, 140], [60, 150]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="10" ry="1.4" />)}</g>
    <g fill="#3c1518"><ellipse cx="26" cy="100" rx="21" ry="13" /><circle cx="9" cy="94" r="9.6" /><path d="M3 98q-6 6-2 18" stroke="#3c1518" strokeWidth="4.4" fill="none" strokeLinecap="round" /><rect x="12" y="106" width="6.4" height="12" rx="2" /><rect x="22" y="108" width="6.4" height="10" rx="2" /><rect x="32" y="106" width="6.4" height="12" rx="2" /><rect x="40" y="104" width="6" height="14" rx="2" /><path d="M46 96q6 4 4 10" stroke="#3c1518" strokeWidth="1.6" fill="none" /><ellipse cx="16" cy="94" rx="6" ry="8" /></g>
    <path d="M14 86q8-4 16 0" fill="#ffbd00" opacity=".25" /><path d="M4 92l-2 4" stroke="#ffd166" strokeWidth=".8" opacity=".6" />
    <g fill="#3c1518">{[[30, 40, 1], [42, 50, .7], [24, 52, .6]].map(([x, y, s], i) => <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d="M-6 0Q-3-4 0 0Q3-4 6 0" stroke="#3c1518" strokeWidth="1.4" fill="none" />)}</g>
  </Svg>],

  [155, 'กล่องของขวัญที่มีตาข้างใน', <Svg>
    <defs>
      <radialGradient id="f155s" cx=".5" cy=".4"><stop stopColor="#2b2d42" /><stop offset="1" stopColor="#0b0b14" /></radialGradient>
      <linearGradient id="f155b" x2="1" y2="0"><stop stopColor="#a4133c" /><stop offset=".45" stopColor="#ff4d6d" /><stop offset="1" stopColor="#800f2f" /></linearGradient>
      <linearGradient id="f155r" x2="1" y2="0"><stop stopColor="#c99700" /><stop offset=".5" stopColor="#ffe066" /><stop offset="1" stopColor="#a87c00" /></linearGradient>
      <radialGradient id="f155e"><stop stopColor="#f9f871" /><stop offset=".6" stopColor="#e6c200" /><stop offset="1" stopColor="#a87c00" /></radialGradient>
      <radialGradient id="f155g"><stop stopColor="#f9f871" stopOpacity=".3" /><stop offset="1" stopColor="#f9f871" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#f155s)" />
    <St p={[10, 14, .5, 104, 20, .6, 20, 60, .4, 96, 70, .4]} />
    <rect y="130" width="120" height="30" fill="#14141f" /><ellipse cx="60" cy="132" rx="38" ry="4" fill="#000" opacity=".5" />
    <path d="M28 90H92V132H28Z" fill="url(#f155b)" /><rect x="56" y="90" width="8" height="42" fill="url(#f155r)" /><path d="M30 94h60" stroke="#ff8fa3" strokeWidth=".6" opacity=".6" />
    <g fill="#ff8fa3" opacity=".35">{[[36, 104], [80, 112], [42, 122], [76, 98]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 2}l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z`} />)}</g>
    <rect x="24" y="84" width="72" height="8" fill="#000" />
    <circle cx="60" cy="88" r="22" fill="url(#f155g)" />
    <path d="M44 88Q50 82 56 88Q50 92 44 88Z" fill="url(#f155e)" /><path d="M64 88Q70 82 76 88Q70 92 64 88Z" fill="url(#f155e)" /><ellipse cx="50" cy="88" rx=".9" ry="2.4" fill="#000" /><ellipse cx="70" cy="88" rx=".9" ry="2.4" fill="#000" />
    <g transform="rotate(-26 28 80)"><path d="M20 70H100V84H20Z" fill="url(#f155b)" /><rect x="56" y="70" width="8" height="14" fill="url(#f155r)" /><path d="M60 70q-14-16-22-4q8 8 22 4zM60 70q14-16 22-4q-8 8-22 4z" fill="url(#f155r)" /><circle cx="60" cy="70" r="3" fill="#ffe066" /><path d="M22 72h76" stroke="#ff8fa3" strokeWidth=".6" opacity=".6" /></g>
    <path d="M30 128q-10 4-8 14M90 128q8 6 6 14" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7" />
  </Svg>],

  [156, 'สลอธในเปลญวน', <Svg>
    <defs>
      <linearGradient id="f156s" x2="0" y2="1"><stop stopColor="#95d5b2" /><stop offset="1" stopColor="#1b4332" /></linearGradient>
      <linearGradient id="f156t" x2="1" y2="0"><stop stopColor="#2b1d12" /><stop offset=".5" stopColor="#5a3e2b" /><stop offset="1" stopColor="#1e140c" /></linearGradient>
      <linearGradient id="f156h" x2="0" y2="1"><stop stopColor="#f4845f" /><stop offset="1" stopColor="#c44536" /></linearGradient>
      <radialGradient id="f156b" cx=".4" cy=".3"><stop stopColor="#c9a87c" /><stop offset="1" stopColor="#8a6a48" /></radialGradient>
      <radialGradient id="f156l" cx=".5" cy="0"><stop stopColor="#fff8dc" stopOpacity=".5" /><stop offset="1" stopColor="#fff8dc" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#f156s)" /><rect width="120" height="160" fill="url(#f156l)" />
    <rect x="4" y="0" width="12" height="160" fill="url(#f156t)" /><rect x="104" y="0" width="12" height="160" fill="url(#f156t)" />
    <g stroke="#2d6a4f" strokeWidth="2.4" fill="none"><path d="M30 0Q36 30 30 64M86 0Q80 24 90 44M56 0q4 16-2 26" /></g>
    <g fill="#52b788">{[[26, 30], [36, 44], [28, 56], [86, 22], [92, 36], [54, 18], [58, 10]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q${i % 2 ? 7 : -7}-1 ${i % 2 ? 7 : -7} 6q${i % 2 ? -6 : 6} 0 ${i % 2 ? -7 : 7}-6z`} />)}</g>
    <g fill="#ff70a6">{[[34, 50], [88, 30]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" />)}</g>
    <path d="M14 58Q60 118 106 58" stroke="#e9c46a" strokeWidth="1.6" fill="none" /><path d="M14 58Q60 108 106 58L100 66Q60 114 20 66Z" fill="url(#f156h)" />
    <g stroke="#ffd6a5" strokeWidth=".7" fill="none" opacity=".7">{[0, 1, 2].map(i => <path key={i} d={`M${24 + i * 2} ${66 + i * 6}Q60 ${106 + i * 2} ${96 - i * 2} ${66 + i * 6}`} />)}</g>
    <g stroke="#e9c46a" strokeWidth=".8">{[22, 28, 92, 98].map(x => <path key={x} d={`M${x} ${x < 60 ? 66 : 66}l${x < 60 ? -4 : 4} 6`} />)}</g>
    <ellipse cx="60" cy="86" rx="20" ry="10" fill="url(#f156b)" /><path d="M44 82q16 6 32 0" stroke="#7a5a38" strokeWidth=".6" fill="none" />
    <circle cx="78" cy="80" r="8.6" fill="url(#f156b)" /><ellipse cx="79" cy="81" rx="6" ry="5" fill="#ecd9b8" />
    <path d="M73 79q2-3 5 0M80 79q2-3 5 0" fill="#5a3e2b" /><path d="M74 80q1.4-1 2.8 0M81 80q1.4-1 2.8 0" stroke="#2b1d12" strokeWidth=".9" fill="none" /><ellipse cx="79" cy="83" rx="1.4" ry=".9" fill="#2b1d12" /><path d="M77 85q2 1.4 4 0" stroke="#2b1d12" strokeWidth=".7" fill="none" />
    <path d="M48 82q-6-16 0-26" stroke="url(#f156b)" strokeWidth="4.4" fill="none" strokeLinecap="round" /><path d="M47 56l-2-3M49 56l1-3" stroke="#2b1d12" strokeWidth=".8" />
    <g fill="#fff" opacity=".6"><path d="M84 66q2-3 4 0M88 60q2-3 4 0" stroke="#fff" strokeWidth=".8" fill="none" /></g>
  </Svg>],

  [158, 'มดขนสตรอว์เบอร์รียักษ์', <Svg>
    <defs>
      <linearGradient id="f158s" x2="0" y2="1"><stop stopColor="#fefae0" /><stop offset="1" stopColor="#e9edc9" /></linearGradient>
      <radialGradient id="f158r" cx=".35" cy=".3"><stop stopColor="#ff6b6b" /><stop offset=".7" stopColor="#d00000" /><stop offset="1" stopColor="#7a0000" /></radialGradient>
      <linearGradient id="f158g" x2="0" y2="1"><stop stopColor="#ccd5ae" /><stop offset="1" stopColor="#a3b18a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#f158s)" />
    <g fill="#ccd5ae" opacity=".7"><circle cx="100" cy="20" r="18" /><circle cx="84" cy="10" r="12" /></g>
    <path d="M0 122Q60 114 120 124V160H0Z" fill="url(#f158g)" /><g stroke="#6a7a3a" strokeWidth=".9">{Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${i * 7 + 2} ${128 + (i % 3) * 8}q-1-5 0-8`} fill="none" />)}</g>
    <path d="M0 118Q60 112 120 120" stroke="#d4a373" strokeWidth="5" fill="none" opacity=".5" />
    <g transform="rotate(-80 60 84)"><path d="M44 92Q34 62 60 54Q86 62 76 92Q70 114 60 116Q50 114 44 92Z" fill="url(#f158r)" />
      <g fill="#ffe8a3">{[[50, 74], [58, 82], [66, 72], [72, 86], [54, 96], [64, 100], [60, 64], [48, 86], [68, 62]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx=".9" ry="1.6" />)}</g>
      <path d="M50 64q8-6 18 0" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".4" /><path d="M48 56l-6-6 8 2-4-8 8 6 2-8 2 8 6-6-2 8 8-2-6 6z" fill="#55a630" /></g>
    <g>{[30, 44, 58, 72, 86, 100].map((x, i) => <g key={i}><ellipse cx={x} cy="110" rx="3.4" ry="2.4" fill="#222" /><circle cx={x + 4} cy="108" r="2" fill="#222" /><circle cx={x - 3.6} cy="111" r="2.4" fill="#222" /><g stroke="#222" strokeWidth=".7"><path d={`M${x - 1} 111l-2 6M${x} 111l0 6M${x + 1} 111l2 6M${x + 5} 106l2-5M${x + 4} 106l-1-5`} /></g><path d={`M${x} 108v-6`} stroke="#222" strokeWidth=".9" /></g>)}</g>
    <g>{[[12, 144], [22, 148], [94, 140]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="2.6" ry="1.8" fill="#222" /><circle cx={x + 3} cy={y - 1.4} r="1.4" fill="#222" /><circle cx={x - 3} cy={y + .4} r="1.8" fill="#222" /></g>)}</g>
    <g fill="#e63946" opacity=".6">{[[36, 120], [70, 124]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.4" ry=".9" />)}</g>
  </Svg>],
];
