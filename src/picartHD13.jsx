// ภาพการ์ดแบบละเอียด ชุด 13 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Pn = ({ x, y, s = 1, f = '#264653', g = '#2a9d8f' }) => <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M0-32L11-12H6L14 4H-14L-6-12H-11Z" fill={f} /><path d="M0-32L-11-12H-6L-14 4H0Z" fill={g} opacity=".5" /></g>;

export const HD13 = [
  [51, 'ใต้เสาไฟคนเดียว', <Svg>
    <defs>
      <linearGradient id="x51s" x2="0" y2="1"><stop stopColor="#0d0f14" /><stop offset="1" stopColor="#2a2f3a" /></linearGradient>
      <linearGradient id="x51c" x2="0" y2="1"><stop stopColor="#ffe9a8" stopOpacity=".45" /><stop offset="1" stopColor="#ffe9a8" stopOpacity=".05" /></linearGradient>
      <radialGradient id="x51g"><stop stopColor="#fff3c4" /><stop offset=".3" stopColor="#ffe9a8" stopOpacity=".6" /><stop offset="1" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
      <linearGradient id="x51f" x2="0" y2="1"><stop stopColor="#9aa3b5" stopOpacity="0" /><stop offset=".5" stopColor="#9aa3b5" stopOpacity=".25" /><stop offset="1" stopColor="#9aa3b5" stopOpacity="0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#x51s)" />
    <g fill="#14171e"><rect x="0" y="50" width="22" height="80" /><rect x="96" y="40" width="24" height="90" /></g><g fill="#3a3f4b">{[[4, 60], [12, 76], [100, 50], [108, 70]].map(([x, y], i) => <rect key={i} x={x} y={y} width="3" height="4" />)}</g><rect x="108" y="88" width="3" height="4" fill="#ffd166" opacity=".6" />
    <rect y="130" width="120" height="30" fill="#14161b" /><path d="M0 130h120" stroke="#2a2f3a" />
    <ellipse cx="66" cy="132" rx="32" ry="6" fill="#ffe9a8" opacity=".14" />
    <polygon points="70,32 36,130 104,130" fill="url(#x51c)" />
    <rect x="68" y="32" width="3.4" height="98" fill="#0b0c10" /><path d="M60 30h20l-3-7h-14z" fill="#0b0c10" /><rect x="64" y="30" width="12" height="3" fill="#fff3c4" />
    <circle cx="70" cy="32" r="22" fill="url(#x51g)" />
    <g fill="#0b0c10"><circle cx="60" cy="102" r="4.4" /><path d="M54 106h12l1 24h-14z" /><path d="M54 110l-3 12M66 110l3 10" stroke="#0b0c10" strokeWidth="3" strokeLinecap="round" /><path d="M54 98h12l-2-4h-8z" /></g>
    <path d="M60 130L4 158L18 160L68 130Z" fill="#000" opacity=".5" />
    <rect y="88" width="120" height="30" fill="url(#x51f)" /><rect y="112" width="120" height="20" fill="url(#x51f)" />
    <g stroke="#9aa3b5" strokeWidth=".4" opacity=".5">{Array.from({ length: 10 }, (_, i) => <line key={i} x1={50 + i * 4} y1={50 + (i * 13) % 70} x2={49 + i * 4} y2={54 + (i * 13) % 70} />)}</g>
  </Svg>],

  [52, 'มือจากใต้น้ำถือตะเกียง', <Svg>
    <defs>
      <linearGradient id="x52s" x2="0" y2="1"><stop stopColor="#020c14" /><stop offset="1" stopColor="#0b2530" /></linearGradient>
      <linearGradient id="x52w" x2="0" y2="1"><stop stopColor="#0a3a4a" /><stop offset="1" stopColor="#021016" /></linearGradient>
      <radialGradient id="x52g"><stop stopColor="#ffe08a" stopOpacity=".7" /><stop offset="1" stopColor="#ffe08a" stopOpacity="0" /></radialGradient>
      <linearGradient id="x52h" x2="1" y2="0"><stop stopColor="#5f8a8a" /><stop offset=".5" stopColor="#9ec2c2" /><stop offset="1" stopColor="#4a7070" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#x52s)" />
    <St p={[8, 10, .6, 24, 30, .5, 44, 8, .7, 96, 18, .6, 112, 44, .5, 76, 6, .4, 16, 60, .4]} />
    <circle cx="62" cy="64" r="44" fill="url(#x52g)" />
    <rect y="96" width="120" height="64" fill="url(#x52w)" />
    <g stroke="#2a6070" strokeWidth=".8" fill="none">{[0, 1, 2, 3].map(i => <path key={i} d={`M0 ${98 + i * 12}q10-3 20 0t20 0t20 0t20 0t20 0t20 0`} opacity={.9 - i * .2} />)}</g>
    <g fill="#ffe08a" opacity=".45">{[[62, 108, 14], [62, 118, 10], [62, 128, 6]].map(([x, y, w], i) => <rect key={i} x={x - w / 2} y={y} width={w} height="1.6" rx=".8" />)}</g>
    <path d="M55 160V104Q53 98 57 96H67Q71 98 69 104V160Z" fill="url(#x52h)" opacity=".9" />
    <g stroke="url(#x52h)" strokeWidth="3.6" strokeLinecap="round" fill="none"><path d="M54 98q-3-8 1-11" /><path d="M58 95v-10" /><path d="M62 95v-11" /><path d="M66 95v-10" /><path d="M69 98q3-6 0-10" /></g>
    <g fill="#3a6060" opacity=".6"><path d="M58 120q2 4 0 8M64 130q-2 4 0 8" stroke="#3a6060" fill="none" /></g>
    <ellipse cx="62" cy="97" rx="10" ry="2" fill="#9ec2c2" opacity=".5" />
    <line x1="62" y1="84" x2="62" y2="74" stroke="#3a3a3a" strokeWidth="1.2" /><path d="M58 74a4 2 0 0 1 8 0" stroke="#3a3a3a" fill="none" />
    <rect x="55" y="56" width="14" height="17" rx="2" fill="#ffd166" stroke="#3a3a3a" strokeWidth="1.2" /><path d="M58 56v17M66 56v17" stroke="#3a3a3a" strokeWidth=".6" /><path d="M62 60q-3 5 0 9q3-4 0-9z" fill="#fff" />
    <path d="M53 56h18l-3-6h-12z" fill="#3a3a3a" /><circle cx="62" cy="48" r="2" fill="none" stroke="#3a3a3a" strokeWidth="1" />
    <g fill="#9ec2c2" opacity=".6"><circle cx="48" cy="110" r="1" /><circle cx="76" cy="112" r=".8" /><circle cx="50" cy="104" r=".6" /></g>
  </Svg>],

  [53, 'ตุ๊กตาหมีบนม้านั่ง', <Svg>
    <defs>
      <linearGradient id="x53s" x2="0" y2="1"><stop stopColor="#f7b267" /><stop offset="1" stopColor="#f4845f" /></linearGradient>
      <linearGradient id="x53g" x2="0" y2="1"><stop stopColor="#bc6c25" /><stop offset="1" stopColor="#7f4012" /></linearGradient>
      <radialGradient id="x53b" cx=".4" cy=".3"><stop stopColor="#e0b48a" /><stop offset="1" stopColor="#a8754a" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#x53s)" />
    <rect x="96" y="0" width="12" height="130" fill="#5e3a22" /><path d="M96 40L80 24M108 60L118 50" stroke="#5e3a22" strokeWidth="3" />
    <g><circle cx="100" cy="18" r="26" fill="#d1495b" opacity=".85" /><circle cx="78" cy="26" r="16" fill="#edae49" opacity=".85" /><circle cx="114" cy="40" r="14" fill="#c1121f" opacity=".8" /></g>
    <g fill="#5e3a22" opacity=".25"><circle cx="14" cy="30" r="20" /><rect x="10" y="40" width="6" height="90" /></g>
    <rect y="128" width="120" height="32" fill="url(#x53g)" /><path d="M0 128h120" stroke="#dda15e" strokeWidth="1.2" />
    <g><rect x="12" y="96" width="84" height="6" rx="1" fill="#6b4226" /><rect x="12" y="84" width="84" height="5" rx="1" fill="#6b4226" /><rect x="12" y="76" width="84" height="5" rx="1" fill="#6b4226" />
      <path d="M12 98h84M12 86h84M12 78h84" stroke="#8b5a2b" strokeWidth=".6" /><rect x="18" y="102" width="4" height="26" fill="#3d2817" /><rect x="86" y="102" width="4" height="26" fill="#3d2817" /><path d="M18 76V102M90 76V102" stroke="#3d2817" strokeWidth="2.4" /></g>
    <g><ellipse cx="48" cy="88" rx="11" ry="12" fill="url(#x53b)" /><ellipse cx="48" cy="92" rx="6" ry="7" fill="#f1d3b0" />
      <circle cx="48" cy="68" r="10" fill="url(#x53b)" /><circle cx="39" cy="60" r="4" fill="url(#x53b)" /><circle cx="57" cy="60" r="4" fill="url(#x53b)" /><circle cx="39" cy="60" r="2" fill="#f1d3b0" /><circle cx="57" cy="60" r="2" fill="#f1d3b0" />
      <ellipse cx="48" cy="72" rx="4.6" ry="3.4" fill="#f1d3b0" /><ellipse cx="48" cy="70.6" rx="1.6" ry="1.2" fill="#3a2a1a" /><circle cx="44" cy="66" r="1.4" fill="#3a2a1a" /><circle cx="52" cy="66" r="1.4" fill="#3a2a1a" /><path d="M46 74q2 1 4 0" stroke="#3a2a1a" strokeWidth=".6" fill="none" />
      <ellipse cx="37" cy="90" rx="4.4" ry="6" fill="url(#x53b)" transform="rotate(20 37 90)" /><ellipse cx="59" cy="90" rx="4.4" ry="6" fill="url(#x53b)" transform="rotate(-20 59 90)" />
      <ellipse cx="42" cy="99" rx="4.4" ry="3.4" fill="url(#x53b)" /><ellipse cx="54" cy="99" rx="4.4" ry="3.4" fill="url(#x53b)" />
      <path d="M40 80l16-2" stroke="#e63946" strokeWidth="2.4" /><path d="M54 78l3 6M55 78l-2 6" stroke="#e63946" strokeWidth="1.6" />
      <path d="M44 86l2 3M52 92l-2 2" stroke="#7a4a2a" strokeWidth=".8" /></g>
    {[[20, 140, '#d1495b'], [70, 146, '#edae49'], [104, 140, '#c1121f'], [40, 152, '#edae49'], [88, 118, '#edae49'], [60, 104, '#d1495b'], [30, 70, '#edae49'], [70, 50, '#d1495b']].map(([x, y, c], i) => <path key={i} d={`M${x} ${y - 3}q3 3 0 6q-3-3 0-6z`} fill={c} transform={`rotate(${i * 50} ${x} ${y})`} />)}
  </Svg>],

  [54, 'ปลาในกรงนก นกในโหลปลา', <Svg>
    <defs>
      <linearGradient id="x54s" x2="0" y2="1"><stop stopColor="#e9f5db" /><stop offset="1" stopColor="#b5c99a" /></linearGradient>
      <linearGradient id="x54c" x2="1" y2="0"><stop stopColor="#7a5c2e" /><stop offset=".5" stopColor="#d4a960" /><stop offset="1" stopColor="#6b4c1e" /></linearGradient>
      <radialGradient id="x54b" cx=".35" cy=".3"><stop stopColor="#e0fbfc" stopOpacity=".6" /><stop offset=".7" stopColor="#9ad1f5" stopOpacity=".4" /><stop offset="1" stopColor="#caf0f8" stopOpacity=".8" /></radialGradient>
      <linearGradient id="x54f" x2="1" y2="1"><stop stopColor="#ffb703" /><stop offset="1" stopColor="#f77f00" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#x54s)" />
    <g stroke="#a3b18a" strokeWidth=".6">{[30, 60, 90].map(x => <path key={x} d={`M${x} 0V160`} />)}</g>
    <path d="M30 0v10" stroke="#6b4c1e" /><circle cx="30" cy="12" r="2.4" fill="none" stroke="url(#x54c)" strokeWidth="1.2" />
    <path d="M12 78V40Q30 12 48 40V78" stroke="url(#x54c)" strokeWidth="2" fill="none" /><g stroke="url(#x54c)" strokeWidth=".9">{[20, 26, 30, 34, 40].map(x => <line key={x} x1={x} y1="78" x2={x} y2={30 + Math.abs(30 - x) * .4} />)}</g>
    <rect x="8" y="78" width="44" height="5" rx="1.6" fill="url(#x54c)" />
    <g transform="translate(30 56)"><path d="M-9 0q9-7 18 0q-9 7-18 0zM9 0l5-4v8z" fill="url(#x54f)" /><circle cx="-5" cy="-.6" r="1" fill="#222" /><path d="M-2-4q2 4 0 8" stroke="#e85d04" strokeWidth=".6" fill="none" /><g fill="#9ad1f5" opacity=".8"><circle cx="-12" cy="-4" r="1.2" /><circle cx="-14" cy="-9" r=".9" /><circle cx="-12" cy="-14" r=".6" /></g></g>
    <path d="M60 160V140H118V160Z" fill="#a98467" /><path d="M60 140h58" stroke="#c9a77c" strokeWidth="1.2" />
    <circle cx="86" cy="116" r="24" fill="url(#x54b)" stroke="#e0fbfc" strokeWidth="1" /><path d="M64 112Q86 106 108 112Q106 136 86 140Q66 136 64 112Z" fill="#48cae4" opacity=".25" />
    <rect x="72" y="138" width="28" height="3" rx="1" fill="#8a7a6a" />
    <g transform="translate(86 120)"><ellipse rx="8.6" ry="6" fill="#ffd60a" /><circle cx="7.4" cy="-4" r="4.6" fill="#ffd60a" /><polygon points="11.4,-4 15.4,-3 11.4,-2" fill="#f77f00" /><path d="M-2-2L-9-11L4-4Z" fill="#e0b000" /><circle cx="8.4" cy="-5" r=".9" fill="#000" /><path d="M-8 0l-6 3 6 1z" fill="#e0b000" /></g>
    <path d="M70 100q6-6 14-6" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".7" strokeLinecap="round" />
    <path d="M50 64Q70 64 76 92" stroke="#7a5c2e" strokeWidth=".7" strokeDasharray="2 2.6" fill="none" /><path d="M74 88l2 4 2-3" stroke="#7a5c2e" strokeWidth=".7" fill="none" />
    <path d="M62 112Q40 104 40 86" stroke="#7a5c2e" strokeWidth=".7" strokeDasharray="2 2.6" fill="none" /><path d="M38 90l2-4 2 3" stroke="#7a5c2e" strokeWidth=".7" fill="none" />
  </Svg>],

  [56, 'เดินไต่เชือกระหว่างตึก', <Svg>
    <defs>
      <linearGradient id="x56s" x2="0" y2="1"><stop stopColor="#0f0c29" /><stop offset=".6" stopColor="#302b63" /><stop offset="1" stopColor="#24243e" /></linearGradient>
      <linearGradient id="x56b" x2="1" y2="0"><stop stopColor="#0a0820" /><stop offset="1" stopColor="#1a1640" /></linearGradient>
      <linearGradient id="x56d" x2="1" y2="0"><stop stopColor="#1a1640" /><stop offset="1" stopColor="#0a0820" /></linearGradient>
      <radialGradient id="x56m"><stop stopColor="#fff4c2" stopOpacity=".6" /><stop offset="1" stopColor="#fff4c2" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#x56s)" />
    <St p={[8, 8, .6, 40, 18, .5, 80, 8, .7, 110, 28, .5, 60, 30, .4, 30, 40, .4, 96, 14, .4]} />
    <circle cx="60" cy="24" r="30" fill="url(#x56m)" /><circle cx="60" cy="24" r="9" fill="#fff4c2" />
    <g fill="#14112e">{[[30, 90, 10, 70], [44, 100, 12, 60], [64, 96, 10, 64], [80, 104, 12, 56]].map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} />)}</g>
    <rect x="0" y="48" width="28" height="112" fill="url(#x56b)" /><rect x="92" y="38" width="28" height="122" fill="url(#x56d)" />
    <g fill="#ffd166">{[[4, 58], [12, 58], [20, 72], [4, 86], [12, 100], [20, 114], [96, 50], [104, 64], [112, 50], [96, 92], [112, 106]].map(([x, y], i) => <rect key={i} x={x} y={y} width="4" height="5" opacity={i % 3 ? .9 : .4} />)}</g>
    <rect x="0" y="46" width="30" height="3" fill="#2b2650" /><rect x="90" y="36" width="30" height="3" fill="#2b2650" />
    <path d="M28 50Q60 62 92 40" stroke="#c9ada7" strokeWidth=".8" fill="none" />
    <line x1="34" y1="42" x2="86" y2="64" stroke="#e0e1dd" strokeWidth="1.2" />
    <g transform="translate(60 52)"><line x1="-16" y1="-4" x2="16" y2="4" stroke="#adb5bd" strokeWidth=".8" /><circle cx="0" cy="-14" r="3.4" fill="#f1c27d" /><path d="M-2.6-11h5.2l1 10h-7.2z" fill="#e63946" /><path d="M-2-1l-2 5M2-1l2 5" stroke="#212529" strokeWidth="1.5" strokeLinecap="round" /><path d="M-2.6-9l-6 4M2.6-9l6 2" stroke="#e63946" strokeWidth="1.4" strokeLinecap="round" /><path d="M-3-16q3-4 6 0" fill="#3a2a1a" /></g>
    <g fill="#c9ada7" opacity=".6"><path d="M50 140q3-3 6 0q-3 1-6 0z" /></g>
    <rect y="152" width="120" height="8" fill="#05040f" />
  </Svg>],

  [58, 'นกฮูกอ่านหนังสือ', <Svg>
    <defs>
      <linearGradient id="x58w" x2="0" y2="1"><stop stopColor="#2b2118" /><stop offset="1" stopColor="#3a2d20" /></linearGradient>
      <radialGradient id="x58g" cx=".75" cy=".62"><stop stopColor="#ffd28a" stopOpacity=".55" /><stop offset="1" stopColor="#ffd28a" stopOpacity="0" /></radialGradient>
      <radialGradient id="x58o" cx=".4" cy=".3"><stop stopColor="#b08a62" /><stop offset="1" stopColor="#6a4a2a" /></radialGradient>
      <radialGradient id="x58e" cx=".4" cy=".35"><stop stopColor="#fffbe0" /><stop offset="1" stopColor="#ffd166" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#x58w)" />
    <g>{[22, 48, 74].map(y => <rect key={y} x="0" y={y} width="120" height="3.4" fill="#5a4632" />)}</g>
    <g>{[[4, 6, 6, '#8b3a3a'], [11, 9, 5, '#3a6b8b'], [17, 4, 7, '#c9a227'], [25, 8, 5, '#5a7a3a'], [70, 32, 6, '#8b3a3a'], [77, 34, 5, '#3a6b8b'], [96, 6, 7, '#6a4c93'], [104, 10, 5, '#8b3a3a'], [30, 58, 6, '#3a6b8b'], [37, 60, 5, '#c9a227'], [86, 56, 6, '#5a7a3a']].map(([x, y, w, c], i) => <rect key={i} x={x} y={y + (i % 2)} width={w} height={(y < 22 ? 22 : y < 48 ? 48 : 74) - y - (i % 2)} fill={c} />)}</g>
    <rect width="120" height="160" fill="url(#x58g)" />
    <rect y="128" width="120" height="32" fill="#5a3e25" /><path d="M0 128h120" stroke="#7a5638" strokeWidth="1.2" />
    <rect x="86" y="104" width="9" height="24" fill="#f1e6d0" /><path d="M86 104h9v4q-2 3-4 0q-2 3-5 0z" fill="#fdf5e4" /><path d="M90.5 92q-5 7 0 12q5-5 0-12z" fill="#ffb84d" /><path d="M90.5 96q-2 4 0 7q2-3 0-7z" fill="#fff3c0" />
    <ellipse cx="46" cy="108" rx="23" ry="23" fill="url(#x58o)" /><ellipse cx="46" cy="114" rx="15" ry="15" fill="#d9b88a" />
    <g fill="#a87c52" opacity=".7">{[[40, 110], [46, 116], [52, 110], [42, 122], [50, 122]].map(([x, y], i) => <path key={i} d={`M${x - 2} ${y}q2 2 4 0`} stroke="#a87c52" fill="none" />)}</g>
    <polygon points="27,88 31,74 38,88" fill="url(#x58o)" /><polygon points="65,88 61,74 54,88" fill="url(#x58o)" />
    <circle cx="38" cy="96" r="8" fill="url(#x58e)" /><circle cx="54" cy="96" r="8" fill="url(#x58e)" /><circle cx="38" cy="96" r="8" fill="none" stroke="#3a2a1a" strokeWidth="1.6" /><circle cx="54" cy="96" r="8" fill="none" stroke="#3a2a1a" strokeWidth="1.6" />
    <circle cx="39" cy="97" r="3" fill="#222" /><circle cx="55" cy="97" r="3" fill="#222" /><circle cx="40" cy="96" r="1" fill="#fff" /><circle cx="56" cy="96" r="1" fill="#fff" />
    <path d="M46 96h0" stroke="#3a2a1a" strokeWidth="1.6" /><polygon points="44,103 48,103 46,108" fill="#e8a33a" />
    <path d="M24 106q-4 10 2 18M68 106q4 10-2 18" stroke="#6a4a2a" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M26 124L46 130L66 124V138L46 144L26 138Z" fill="#f4ecd8" stroke="#8b6b3a" /><line x1="46" y1="130" x2="46" y2="144" stroke="#8b6b3a" /><g stroke="#c9b28a" strokeWidth=".5"><path d="M30 128l12 3M30 132l12 3M50 131l12-3M50 135l12-3" /></g>
    <g fill="#d4a373"><ellipse cx="40" cy="128" rx="3" ry="1.6" /><ellipse cx="52" cy="128" rx="3" ry="1.6" /></g>
  </Svg>],

  [60, 'ทานตะวันมองหลอดไฟ', <Svg>
    <defs>
      <linearGradient id="x60s" x2="0" y2="1"><stop stopColor="#a2d2ff" /><stop offset="1" stopColor="#e4c1f9" /></linearGradient>
      <radialGradient id="x60u"><stop stopColor="#fffbe0" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
      <radialGradient id="x60b"><stop stopColor="#fffbe0" /><stop offset=".3" stopColor="#fff3b0" stopOpacity=".7" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
      <radialGradient id="x60c" cx=".4" cy=".4"><stop stopColor="#8b5a2b" /><stop offset="1" stopColor="#3a2410" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#x60s)" />
    <circle cx="20" cy="22" r="22" fill="url(#x60u)" /><circle cx="20" cy="22" r="10" fill="#fff3b0" />
    <path d="M0 132Q60 122 120 134V160H0Z" fill="#6a994e" /><g fill="#386641">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 10 + 3} 136l2-6 2 6z`} />)}</g>
    <g opacity=".5"><path d="M10 134V110M24 136V116" stroke="#386641" strokeWidth="1.4" /><circle cx="10" cy="108" r="5" fill="#ffd60a" /><circle cx="24" cy="114" r="4" fill="#ffd60a" /></g>
    <path d="M60 134Q56 100 64 76" stroke="#386641" strokeWidth="3.4" fill="none" /><path d="M59 114q-14-8-18 2q10 4 18-2zM61 98q14-8 18 2q-10 4-18-2z" fill="#52b788" /><path d="M59 114q-8-3-16 0M61 98q8-3 16 0" stroke="#2d6a4f" strokeWidth=".6" fill="none" />
    <g transform="translate(70 66) rotate(26)">{Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx="0" cy="-13" rx="3.4" ry="8" fill={i % 2 ? '#ffd60a' : '#ffc300'} transform={`rotate(${i * 25.7})`} />)}<circle r="9" fill="url(#x60c)" /><g fill="#6b4226">{Array.from({ length: 10 }, (_, i) => <circle key={i} cx={4.6 * Math.cos(i * .63)} cy={4.6 * Math.sin(i * .63)} r=".7" />)}</g></g>
    <line x1="100" y1="0" x2="100" y2="32" stroke="#333" strokeWidth=".9" /><rect x="96" y="32" width="8" height="6" fill="#868e96" /><path d="M96 34h8M96 36h8" stroke="#495057" strokeWidth=".5" />
    <circle cx="100" cy="46" r="26" fill="url(#x60b)" /><path d="M95 38Q90 48 100 56Q110 48 105 38Z" fill="#fff8d0" stroke="#ced4da" strokeWidth=".8" /><path d="M98 40l1 6 2-6" stroke="#f4a261" strokeWidth=".7" fill="none" />
    <g fill="#fff" opacity=".7"><path d="M84 34l-4-2M84 46h-5M86 56l-4 3" stroke="#fff3b0" strokeWidth="1" /></g>
  </Svg>],

  [63, 'ป่างอกจากหนังสือ', <Svg>
    <defs>
      <linearGradient id="x63s" x2="0" y2="1"><stop stopColor="#caf0f8" /><stop offset="1" stopColor="#f1faee" /></linearGradient>
      <linearGradient id="x63l" x2="1" y2="0"><stop stopColor="#e8e2d0" /><stop offset="1" stopColor="#ffffff" /></linearGradient>
      <linearGradient id="x63r" x2="1" y2="0"><stop stopColor="#ffffff" /><stop offset="1" stopColor="#e3dccb" /></linearGradient>
      <radialGradient id="x63g"><stop stopColor="#fff3b0" stopOpacity=".7" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#x63s)" />
    <circle cx="94" cy="36" r="22" fill="url(#x63g)" /><circle cx="94" cy="36" r="8" fill="#f4a261" />
    <g fill="#264653"><path d="M36 40q3-3 6 0q-3 1-6 0z" /><path d="M76 24q3-3 6 0q-3 1-6 0z" /><path d="M46 30q2-2 4 0q-2 1-4 0z" /></g>
    <rect y="140" width="120" height="20" fill="#a68a64" /><path d="M0 140h120" stroke="#c9a77c" />
    <path d="M8 132L60 142L112 132V150L60 158L8 150Z" fill="#9c6644" />
    <path d="M10 128L60 138V156L10 146Z" fill="url(#x63l)" /><path d="M110 128L60 138V156L110 146Z" fill="url(#x63r)" />
    <g stroke="#ccc5b3" strokeWidth=".6">{[0, 1, 2, 3].map(i => <g key={i}><path d={`M16 ${134 + i * 4}L54 ${141 + i * 4}`} /><path d={`M66 ${141 + i * 4}L104 ${134 + i * 4}`} /></g>)}</g>
    <path d="M60 138V156" stroke="#bcb3a0" />
    <path d="M30 136Q46 120 60 128Q74 120 90 136" fill="#52b788" opacity=".7" />
    <Pn x={40} y={126} s={1.3} /><Pn x={60} y={118} s={2} f="#1b4332" g="#2d6a4f" /><Pn x={82} y={128} s={1.4} /><Pn x={26} y={134} s={.8} f="#1b4332" /><Pn x={96} y={134} s={.8} f="#1b4332" />
    <g fill="#e63946">{[[48, 122], [72, 120]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.4" />)}</g>
    <path d="M60 140Q64 132 70 134" stroke="#4cc9f0" strokeWidth="1.6" fill="none" />
    <g transform="translate(70 128)"><ellipse rx="2.6" ry="1.6" fill="#a0522d" /><circle cx="2" cy="-1.4" r="1.2" fill="#a0522d" /><path d="M2.6-2.6l1-2M1.6-2.6l-.6-2" stroke="#a0522d" strokeWidth=".5" /></g>
    <g fill="#ffd166">{[[20, 120], [100, 118], [34, 108]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
  </Svg>],
];
