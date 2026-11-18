// ภาพการ์ดแบบละเอียด ชุด 23 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Pn = ({ x, y, s = 1, f = '#2d6a4f', g = '#40916c' }) => <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M0-32L11-12H6L14 4H-14L-6-12H-11Z" fill={f} /><path d="M0-32L-11-12H-6L-14 4H0Z" fill={g} opacity=".5" /></g>;

export const HD23 = [
  [168, 'คอนโดรังผึ้ง', <Svg>
    <defs>
      <linearGradient id="h168s" x2="0" y2="1"><stop stopColor="#ffd166" /><stop offset="1" stopColor="#f4a261" /></linearGradient>
      <linearGradient id="h168c" x2="0" y2="1"><stop stopColor="#f6d27a" /><stop offset="1" stopColor="#d9a43a" /></linearGradient>
      <radialGradient id="h168w"><stop stopColor="#fff3b0" /><stop offset="1" stopColor="#ffd166" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h168s)" />
    {Array.from({ length: 24 }, (_, i) => { const c = i % 4, r = i / 4 | 0, x = 18 + c * 28 + (r % 2) * 14, y = 22 + r * 24; const lit = [2, 5, 7, 12, 14, 17, 21].includes(i); return <g key={i}><polygon points={`${x},${y - 14} ${x + 12.4},${y - 7} ${x + 12.4},${y + 7} ${x},${y + 14} ${x - 12.4},${y + 7} ${x - 12.4},${y - 7}`} fill="url(#h168c)" stroke="#b5762a" strokeWidth="1.6" /><polygon points={`${x},${y - 11} ${x + 9.6},${y - 5.4} ${x + 9.6},${y + 5.4} ${x},${y + 11} ${x - 9.6},${y + 5.4} ${x - 9.6},${y - 5.4}`} fill={lit ? 'url(#h168w)' : '#a0682f'} opacity={lit ? 1 : .55} />{lit ? <g><ellipse cx={x} cy={y + 2} rx="3.4" ry="2.6" fill="#222" /><path d={`M${x - 1.4} ${y}v4M${x + 1} ${y}v4`} stroke="#ffd166" strokeWidth=".9" /><ellipse cx={x - 1} cy={y - 1.4} rx="2" ry="1.2" fill="#fff" opacity=".8" /><circle cx={x + 3} cy={y + 1.4} r=".7" fill="#fff" /></g> : <path d={`M${x - 6} ${y + 3}q6-4 12 0`} stroke="#e9c46a" strokeWidth=".5" fill="none" opacity=".6" />}</g>; })}
    <g transform="translate(100 146)"><ellipse rx="4.4" ry="3.4" fill="#222" /><path d="M-2-3v6M1-3v6" stroke="#ffd166" strokeWidth="1" /><ellipse cx="-1" cy="-4.4" rx="3" ry="1.6" fill="#fff" opacity=".85" /><path d="M4.4 0h2" stroke="#222" /></g>
    <path d="M96 144q-12-8-14-20" stroke="#222" strokeWidth=".5" strokeDasharray="1 2" fill="none" />
    <g fill="#ffb703">{[[8, 150], [60, 154]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q2-4 4 0q-2 3-4 0z`} />)}</g>
  </Svg>],

  [169, 'ภาพลวงตาโอเอซิส', <Svg>
    <defs>
      <linearGradient id="h169s" x2="0" y2="1"><stop stopColor="#ffb703" /><stop offset=".5" stopColor="#ffd6a5" /><stop offset="1" stopColor="#fff1c1" /></linearGradient>
      <linearGradient id="h169d" x2="0" y2="1"><stop stopColor="#e9c46a" /><stop offset="1" stopColor="#c9893a" /></linearGradient>
      <radialGradient id="h169u"><stop stopColor="#fffbe0" /><stop offset=".4" stopColor="#fff3b0" stopOpacity=".6" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
      <linearGradient id="h169w" x2="0" y2="1"><stop stopColor="#90e0ef" stopOpacity=".9" /><stop offset="1" stopColor="#48cae4" stopOpacity=".3" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h169s)" />
    <circle cx="94" cy="24" r="30" fill="url(#h169u)" /><circle cx="94" cy="24" r="11" fill="#fffbe0" />
    <path d="M0 94Q60 86 120 94V160H0Z" fill="url(#h169d)" /><path d="M0 116Q40 106 80 118T120 112V160H0Z" fill="#d4a04a" opacity=".6" /><path d="M0 136Q40 128 80 140T120 134V160H0Z" fill="#b5843a" opacity=".5" />
    <g stroke="#fff" strokeWidth=".7" fill="none" opacity=".5"><path d="M10 86q8-2 16 0M38 82q8-2 16 0M74 84q8-2 16 0" /></g>
    <ellipse cx="60" cy="96" rx="32" ry="5" fill="url(#h169w)" />
    <g opacity=".75"><path d="M58 94Q60 74 54 56" stroke="#6b4226" strokeWidth="2.6" fill="none" /><path d="M54 56q-14-2-18 8M54 56q14-6 20 2M54 56q-6-12-16-10M54 56q6-12 16-8M54 56q-2 10-10 14" stroke="#2a9d8f" strokeWidth="3.4" fill="none" strokeLinecap="round" /><path d="M70 94Q70 82 74 72" stroke="#6b4226" strokeWidth="1.6" fill="none" /><path d="M74 72q-8 0-10 6M74 72q8-2 10 4M74 72q2-8 8-8" stroke="#2a9d8f" strokeWidth="2.4" fill="none" strokeLinecap="round" /></g>
    <g opacity=".25"><path d="M58 98Q60 118 54 136" stroke="#6b4226" strokeWidth="2.6" fill="none" /><path d="M54 136q-14 2-18-8M54 136q14 6 20-2" stroke="#2a9d8f" strokeWidth="3.4" fill="none" /></g>
    <g stroke="#fff" strokeWidth=".6" opacity=".6">{[0, 1, 2, 3].map(i => <path key={i} d={`M${30 + i * 10} ${70 - i * 4}q4-2 8 0`} fill="none" />)}</g>
    <g transform="translate(16 142)"><path d="M0 0l3-10 3 10" stroke="#6b3a14" strokeWidth="1.4" fill="none" /><circle cx="3" cy="-12" r="2" fill="#6b3a14" /><path d="M-2-4h10" stroke="#6b3a14" strokeWidth="1.2" /></g>
    <g transform="translate(96 132)"><path d="M-8 0q2-6 4-2q2-4 4 0l3-4 1 1-2 5v4h-1v-3h-7v3h-1z" fill="#8a5a2b" /></g>
  </Svg>],

  [170, 'ตู้กดน้ำกลางป่า', <Svg>
    <defs>
      <linearGradient id="h170s" x2="0" y2="1"><stop stopColor="#040f0a" /><stop offset="1" stopColor="#1b4332" /></linearGradient>
      <radialGradient id="h170g" cx=".45" cy=".6"><stop stopColor="#a0f0ff" stopOpacity=".45" /><stop offset="1" stopColor="#a0f0ff" stopOpacity="0" /></radialGradient>
      <linearGradient id="h170m" x2="1" y2="0"><stop stopColor="#9d0208" /><stop offset=".45" stopColor="#e63946" /><stop offset="1" stopColor="#6a040f" /></linearGradient>
      <linearGradient id="h170w" x2="0" y2="1"><stop stopColor="#e0fbfc" /><stop offset="1" stopColor="#90e0ef" /></linearGradient>
      <radialGradient id="h170d" cx=".4" cy=".3"><stop stopColor="#d4a373" /><stop offset="1" stopColor="#8a5a2b" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h170s)" />
    <St p={[20, 10, .6, 60, 6, .5, 100, 14, .6, 84, 30, .4]} />
    <Pn x={14} y={104} s={1.8} f="#081c15" g="#0b2a1c" /><Pn x={108} y={100} s={2} f="#081c15" g="#0b2a1c" /><Pn x={34} y={74} s={1} f="#0b2a1c" g="#1b4332" /><Pn x={90} y={70} s={1.1} f="#0b2a1c" g="#1b4332" />
    <rect width="120" height="160" fill="url(#h170g)" />
    <rect y="136" width="120" height="24" fill="#040f0a" /><g fill="#1b4332">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 10 + 3} 138l2-6 2 6z`} />)}</g>
    <ellipse cx="58" cy="138" rx="34" ry="4" fill="#a0f0ff" opacity=".2" />
    <rect x="38" y="54" width="40" height="82" rx="3" fill="url(#h170m)" /><rect x="42" y="60" width="24" height="52" rx="1" fill="url(#h170w)" />
    <g>{Array.from({ length: 12 }, (_, i) => <g key={i}><rect x={44.4 + (i % 4) * 5.4} y={63 + (i / 4 | 0) * 16} width="3.6" height="11" rx="1.4" fill={['#ffd166', '#06d6a0', '#118ab2', '#ef476f'][i % 4]} /><rect x={44.4 + (i % 4) * 5.4} y={63 + (i / 4 | 0) * 16} width="3.6" height="2" rx=".6" fill="#fff" opacity=".6" /></g>)}</g>
    <path d="M42 77h24M42 93h24" stroke="#adb5bd" strokeWidth=".7" />
    <rect x="69" y="62" width="6" height="18" rx="1" fill="#343a40" /><g fill="#80ffdb">{[66, 70, 74].map(y => <rect key={y} x="70" y={y} width="4" height="2" />)}</g><rect x="70" y="84" width="4" height="8" fill="#6c757d" />
    <rect x="44" y="118" width="22" height="9" rx="1" fill="#1d1d1d" />
    <path d="M40 56h36" stroke="#ff8fa3" strokeWidth="1" opacity=".6" />
    <g><ellipse cx="96" cy="118" rx="11" ry="7.4" fill="url(#h170d)" /><path d="M86 114q-4-10-2-18l4 2 2 12" fill="url(#h170d)" /><circle cx="86" cy="96" r="5.4" fill="url(#h170d)" /><ellipse cx="83" cy="98" rx="2.6" ry="2" fill="#f2d0a9" /><circle cx="82" cy="97" r=".9" fill="#222" /><circle cx="85.4" cy="94.6" r=".9" fill="#222" />
      <path d="M84 91l-4-8M88 91l2-8M80 83l-2-2M80 86l-3 0M90 83l2-2" stroke="#6b4226" strokeWidth="1" strokeLinecap="round" />
      <path d="M90 124v12M102 124v12M95 125v11" stroke="url(#h170d)" strokeWidth="2.4" strokeLinecap="round" /><g fill="#fff" opacity=".7">{[[94, 114], [100, 118], [92, 120]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" />)}</g></g>
    <g fill="#e6ff6b">{[[24, 120], [104, 90], [20, 86]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
  </Svg>],

  [171, 'เกล็ดหิมะยักษ์เหนือหมู่บ้าน', <Svg>
    <defs>
      <linearGradient id="h171s" x2="0" y2="1"><stop stopColor="#4361ee" /><stop offset=".6" stopColor="#a2d2ff" /><stop offset="1" stopColor="#cdb4db" /></linearGradient>
      <radialGradient id="h171g"><stop stopColor="#fff" stopOpacity=".6" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      <linearGradient id="h171n" x2="0" y2="1"><stop stopColor="#fff" /><stop offset="1" stopColor="#d6e2f0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h171s)" />
    <circle cx="60" cy="56" r="44" fill="url(#h171g)" />
    <g stroke="#fff" strokeWidth="3.4" strokeLinecap="round">{[0, 60, 120].map(a => <g key={a} transform={`rotate(${a} 60 56)`}><line x1="60" y1="18" x2="60" y2="94" /><path d="M60 30l-8-7M60 30l8-7M60 82l-8 7M60 82l8 7M60 42l-6-5M60 42l6-5M60 70l-6 5M60 70l6 5" /></g>)}</g>
    <g stroke="#bde0fe" strokeWidth="1" strokeLinecap="round">{[0, 60, 120].map(a => <g key={a} transform={`rotate(${a} 60 56)`}><line x1="60" y1="20" x2="60" y2="92" /></g>)}</g>
    <polygon points="60,50 65.2,53 65.2,59 60,62 54.8,59 54.8,53" fill="#fff" />
    <path d="M0 132Q60 118 120 134V160H0Z" fill="url(#h171n)" /><path d="M0 138Q60 126 120 140" stroke="#d6e2f0" fill="none" />
    <g><rect x="16" y="116" width="18" height="16" fill="#6d597a" /><polygon points="13,118 25,106 37,118" fill="#fff" /><rect x="22" y="121" width="5" height="5" fill="#ffd166" /><rect x="27" y="108" width="3" height="6" fill="#4a3a52" /></g>
    <g><rect x="70" y="112" width="22" height="20" fill="#9d4edd" /><polygon points="67,114 81,100 95,114" fill="#fff" /><rect x="75" y="118" width="5" height="5" fill="#ffd166" /><rect x="84" y="122" width="5" height="10" fill="#3c096c" /></g>
    <g><rect x="44" y="122" width="14" height="12" fill="#b5838d" /><polygon points="42,123 51,114 60,123" fill="#fff" /><rect x="48" y="126" width="4" height="4" fill="#ffd166" /></g>
    <g fill="#2d6a4f"><path d="M104 132l5-14 5 14z" /><path d="M8 134l4-10 4 10z" /></g><g fill="#fff"><path d="M109 118l-2 5h4z" /></g>
    <g fill="#fff">{Array.from({ length: 22 }, (_, i) => <circle key={i} cx={(i * 43) % 118 + 1} cy={(i * 31) % 120 + 4} r={i % 3 ? .9 : 1.4} opacity=".85" />)}</g>
  </Svg>],

  [172, 'นกกระเรียนกระดาษบนกองหนังสือ', <Svg>
    <defs>
      <linearGradient id="h172s" x2="0" y2="1"><stop stopColor="#f2e9e4" /><stop offset="1" stopColor="#c9ada7" /></linearGradient>
      <linearGradient id="h172l" x2="1" y2="1"><stop stopColor="#fff8dc" stopOpacity=".7" /><stop offset="1" stopColor="#fff8dc" stopOpacity="0" /></linearGradient>
      <linearGradient id="h172c" x2="1" y2="1"><stop stopColor="#ff6b6b" /><stop offset="1" stopColor="#9d0208" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h172s)" />
    <polygon points="120,0 120,46 40,160 0,160 0,118 70,0" fill="url(#h172l)" />
    <rect y="132" width="120" height="28" fill="#6d6875" /><path d="M0 132h120" stroke="#9a8c98" strokeWidth="1.2" />
    <ellipse cx="60" cy="134" rx="44" ry="3.4" fill="#22223b" opacity=".3" />
    {[[20, 120, 80, '#4a4e69', '#f2e9e4'], [26, 108, 70, '#9a8c98', '#fff'], [22, 96, 74, '#22223b', '#e9c46a'], [30, 86, 62, '#7f5539', '#f2e9e4']].map(([x, y, w, c, t], i) => <g key={i}><rect x={x} y={y} width={w} height={i === 3 ? 10 : 12} fill={c} /><rect x={x + w - 3} y={y + 1} width="3" height={i === 3 ? 8 : 10} fill="#f8f4ec" /><path d={`M${x + w - 3} ${y + 3}h3M${x + w - 3} ${y + 6}h3`} stroke="#d6ccc2" strokeWidth=".4" /><path d={`M${x + 6} ${y + (i === 3 ? 5 : 6)}h${w - 20}`} stroke={t} strokeWidth="1.2" opacity=".7" /></g>)}
    <g fill="url(#h172c)"><polygon points="44,86 60,62 68,86" /><polygon points="60,62 82,46 72,68" /><polygon points="60,62 52,42 57,66" /><polygon points="68,86 86,72 72,77" /><polygon points="52,42 45,44 52,47" /></g>
    <g stroke="#6a040f" strokeWidth=".6" fill="none"><path d="M60 62L64 86M60 62L72 68M60 62L56 42" /></g><polygon points="60,62 68,86 64,86" fill="#fff" opacity=".2" />
    <g transform="translate(96 40) rotate(-20)"><polygon points="0,0 10,-6 6,4" fill="#f4a261" opacity=".8" /></g>
    <g fill="#9a8c98" opacity=".5"><path d="M14 30q4-4 8 0q-4 1-8 0z" /></g>
    <g transform="translate(100 120)"><rect x="-6" y="-6" width="12" height="12" rx="2" fill="#fff" stroke="#c9ada7" /><path d="M6-2q4 0 4 4t-4 4" stroke="#c9ada7" fill="none" /><path d="M-2-10q2-4 0-8M2-10q2-4 0-8" stroke="#c9ada7" strokeWidth=".6" fill="none" opacity=".7" /></g>
  </Svg>],

  [173, 'จระเข้แปรงฟัน', <Svg>
    <defs>
      <linearGradient id="h173s" x2="0" y2="1"><stop stopColor="#caf0f8" /><stop offset="1" stopColor="#8ecae6" /></linearGradient>
      <linearGradient id="h173c" x2="0" y2="1"><stop stopColor="#74c69d" /><stop offset="1" stopColor="#2d6a4f" /></linearGradient>
      <linearGradient id="h173w" x2="0" y2="1"><stop stopColor="#219ebc" /><stop offset="1" stopColor="#023047" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h173s)" />
    <g stroke="#bde0fe" strokeWidth=".8">{[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M0 ${i * 16 + 8}h120`} />)}{[20, 40, 60, 80, 100].map(x => <path key={x} d={`M${x} 0V96`} />)}</g>
    <rect x="80" y="8" width="34" height="44" rx="3" fill="#e0fbfc" stroke="#adb5bd" /><path d="M84 14h26v34H84z" fill="#a9def9" opacity=".6" /><path d="M86 18l8 8" stroke="#fff" strokeWidth="2" opacity=".8" />
    <rect y="112" width="120" height="48" fill="url(#h173w)" /><path d="M0 114q10-3 20 0t20 0t20 0t20 0t20 0t20 0" stroke="#8ecae6" fill="none" />
    <path d="M8 120Q10 100 40 98H72L98 92Q112 92 112 100Q112 108 100 108L74 112Q60 126 30 128Q10 128 8 120Z" fill="url(#h173c)" />
    <path d="M74 100L98 92M74 108L100 106" stroke="#1b4332" strokeWidth=".9" />
    <path d="M76 100l3 3.4 3-3.4 3 3.4 3-3.4 3 3.4 3-3.4M76 108l3-3.4 3 3.4 3-3.4 3 3.4 3-3.4 3 3.4" stroke="#fff" fill="none" strokeWidth="1.2" />
    <ellipse cx="74" cy="104" rx="3" ry="2" fill="#ff8fa3" />
    <circle cx="64" cy="93" r="6" fill="url(#h173c)" /><circle cx="65" cy="92" r="2.8" fill="#fff" /><circle cx="66" cy="92" r="1.4" fill="#222" /><circle cx="66.4" cy="91.4" r=".4" fill="#fff" />
    <g fill="#1b4332">{[[24, 102], [34, 100], [44, 100], [54, 100]].map(([x, y], i) => <path key={i} d={`M${x - 3} ${y + 1}l3-4 3 4z`} />)}</g>
    <g fill="#95d5b2" opacity=".5">{[[20, 112], [34, 114], [48, 114]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" />)}</g>
    <g transform="rotate(-20 98 78)"><rect x="80" y="76" width="38" height="4.4" rx="2.2" fill="#4cc9f0" /><rect x="80" y="76" width="38" height="1.4" rx=".7" fill="#fff" opacity=".5" /><rect x="78" y="80" width="12" height="6" rx="1" fill="#fff" /><g stroke="#90e0ef" strokeWidth=".6">{[80, 82, 84, 86, 88].map(x => <path key={x} d={`M${x} 80v6`} />)}</g></g>
    <g fill="#fff" stroke="#bde0fe" strokeWidth=".5">{[[96, 88, 2.4], [104, 86, 1.8], [90, 86, 1.6], [100, 82, 1.4], [108, 92, 1.2]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <g transform="translate(26 140)"><path d="M0 0l-3-2 1 3-3 1 3 1-1 3 3-2 3 2-1-3 3-1-3-1 1-3z" fill="#ffd166" /></g>
  </Svg>],

  [175, 'บ่อน้ำเก่ามีแสงอยู่ก้นบ่อ', <Svg>
    <defs>
      <linearGradient id="h175s" x2="0" y2="1"><stop stopColor="#0b0c10" /><stop offset="1" stopColor="#2b2d42" /></linearGradient>
      <radialGradient id="h175g"><stop stopColor="#80ffdb" stopOpacity=".9" /><stop offset=".4" stopColor="#64dfdf" stopOpacity=".4" /><stop offset="1" stopColor="#64dfdf" stopOpacity="0" /></radialGradient>
      <linearGradient id="h175r" x2="1" y2="0"><stop stopColor="#495057" /><stop offset=".5" stopColor="#868e96" /><stop offset="1" stopColor="#343a40" /></linearGradient>
      <linearGradient id="h175w" x2="1" y2="0"><stop stopColor="#5a3e2b" /><stop offset=".5" stopColor="#8b5a3a" /><stop offset="1" stopColor="#4a2c18" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h175s)" />
    <St p={[10, 10, .6, 40, 20, .5, 90, 8, .7, 110, 30, .5, 70, 40, .4]} />
    <circle cx="60" cy="60" r="56" fill="url(#h175g)" opacity=".35" />
    <path d="M34 54V38H86V54" stroke="url(#h175w)" strokeWidth="3.4" fill="none" /><rect x="32" y="34" width="56" height="5" fill="#5a3e2b" /><path d="M32 36L60 20L88 36Z" fill="url(#h175w)" /><path d="M36 34L60 22L84 34" stroke="#3a2416" strokeWidth=".6" fill="none" />
    <rect x="54" y="40" width="12" height="5" rx="2" fill="#6b4226" /><path d="M66 42h8v-2" stroke="#6b4226" strokeWidth="1.4" fill="none" />
    <line x1="60" y1="45" x2="60" y2="78" stroke="#a68a64" strokeWidth=".9" /><path d="M54 78h12l-2 10h-8z" fill="#8d6e63" /><path d="M53 78h14" stroke="#5d4037" strokeWidth="1.2" />
    <ellipse cx="60" cy="100" rx="30" ry="8" fill="#000" /><circle cx="60" cy="100" r="28" fill="url(#h175g)" /><ellipse cx="60" cy="100" rx="26" ry="6" fill="#80ffdb" opacity=".25" />
    <path d="M30 100V140H90V100" fill="url(#h175r)" /><path d="M30 100Q60 116 90 100V140Q60 150 30 140Z" fill="url(#h175r)" />
    <g stroke="#2b2b2b" strokeWidth=".8">{[0, 1, 2].map(r => <path key={r} d={`M30 ${112 + r * 12}Q60 ${126 + r * 12} 90 ${112 + r * 12}`} fill="none" />)}{[[44, 108], [70, 108], [56, 122], [38, 124], [80, 124], [48, 136], [72, 136]].map(([x, y], i) => <path key={i} d={`M${x} ${y}v10`} />)}</g>
    <g fill="#52796f" opacity=".7"><path d="M30 104q-4 6 0 12M90 104q4 8 0 14" stroke="#52796f" strokeWidth="1.4" fill="none" /><ellipse cx="34" cy="138" rx="5" ry="2" /></g>
    <rect y="140" width="120" height="20" fill="#14161b" />
    <g fill="#80ffdb">{[[52, 86], [66, 82], [58, 72], [62, 64]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={.9 - i * .15} />)}</g>
  </Svg>],

  [176, 'กวางที่เขาเป็นต้นไม้', <Svg>
    <defs>
      <linearGradient id="h176s" x2="0" y2="1"><stop stopColor="#e9edc9" /><stop offset="1" stopColor="#ccd5ae" /></linearGradient>
      <radialGradient id="h176d" cx=".4" cy=".3"><stop stopColor="#d4a373" /><stop offset="1" stopColor="#8a5a2b" /></radialGradient>
      <radialGradient id="h176l" cx=".4" cy=".35"><stop stopColor="#b5e48c" /><stop offset="1" stopColor="#55a630" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h176s)" />
    <g fill="#fff" opacity=".7"><ellipse cx="20" cy="40" rx="12" ry="3.4" /><ellipse cx="102" cy="58" rx="10" ry="3" /></g>
    <path d="M0 132Q60 124 120 134V160H0Z" fill="#588157" /><g stroke="#3a5a40" strokeWidth="1">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 9 + 3} ${138 + (i % 3) * 6}l-1-4M${i * 9 + 5} ${138 + (i % 3) * 6}l1-4`} />)}</g>
    <g stroke="#6b4226" strokeWidth="3" fill="none" strokeLinecap="round"><path d="M54 66Q40 50 36 30M40 44Q30 40 26 30M38 36L44 22M66 66Q80 50 84 30M80 44Q90 40 94 30M82 36L76 22" /></g>
    <g fill="url(#h176l)">{[[36, 26, 7], [26, 28, 6], [44, 18, 6], [84, 26, 7], [94, 28, 6], [76, 18, 6], [32, 38, 5], [88, 38, 5], [30, 18, 4], [90, 18, 4]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <g fill="#e63946">{[[30, 22], [90, 32], [42, 14], [80, 14]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" />)}</g>
    <g transform="translate(60 22)"><path d="M-6 0Q-3-4 0 0Q3-4 6 0" stroke="#3a2a1a" strokeWidth="1.2" fill="none" /></g>
    <g transform="translate(86 26)"><ellipse rx="3" ry="2.4" fill="#4cc9f0" /><circle cx="2.4" cy="-1.6" r="1.6" fill="#4cc9f0" /><polygon points="3.8,-1.6 5.6,-1.2 3.8,-.8" fill="#f77f00" /></g>
    <g><ellipse cx="60" cy="82" rx="11" ry="15" fill="url(#h176d)" /><path d="M49 92Q48 120 45 134H56L60 112L64 134H75Q72 120 71 92Z" fill="url(#h176d)" />
      <ellipse cx="60" cy="96" rx="5.6" ry="4.4" fill="#f2d0a9" /><ellipse cx="60" cy="93.4" rx="2.4" ry="1.6" fill="#2b1d12" /><circle cx="54" cy="80" r="1.6" fill="#2b1d12" /><circle cx="66" cy="80" r="1.6" fill="#2b1d12" /><circle cx="54.4" cy="79.4" r=".5" fill="#fff" /><circle cx="66.4" cy="79.4" r=".5" fill="#fff" />
      <ellipse cx="47" cy="72" rx="7" ry="3.4" fill="url(#h176d)" transform="rotate(-20 47 72)" /><ellipse cx="73" cy="72" rx="7" ry="3.4" fill="url(#h176d)" transform="rotate(20 73 72)" /><ellipse cx="47" cy="72" rx="4" ry="1.6" fill="#ffafcc" opacity=".6" transform="rotate(-20 47 72)" /><ellipse cx="73" cy="72" rx="4" ry="1.6" fill="#ffafcc" opacity=".6" transform="rotate(20 73 72)" />
      <g fill="#fff" opacity=".7">{[[54, 112], [64, 116], [58, 122]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" />)}</g></g>
    <g fill="#ff70a6">{[[18, 142], [100, 140]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="1.8" /><circle cx={x} cy={y} r=".7" fill="#ffd166" /></g>)}</g>
  </Svg>],
];
