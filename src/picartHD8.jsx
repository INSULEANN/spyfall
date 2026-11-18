// ภาพการ์ดแบบละเอียด ชุด 8 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD8 = [
  [1, 'ประภาคารเหนือเมฆ', <Svg>
    <defs>
      <linearGradient id="s1s" x2="0" y2="1"><stop stopColor="#03045e" /><stop offset=".6" stopColor="#3a4a8a" /><stop offset="1" stopColor="#8b8fc4" /></linearGradient>
      <linearGradient id="s1b" x2="1" y2="0"><stop stopColor="#fff6b0" stopOpacity="0" /><stop offset="1" stopColor="#fff6b0" stopOpacity=".55" /></linearGradient>
      <linearGradient id="s1c" x2="1" y2="0"><stop stopColor="#fff6b0" stopOpacity=".55" /><stop offset="1" stopColor="#fff6b0" stopOpacity="0" /></linearGradient>
      <linearGradient id="s1t" x2="1" y2="0"><stop stopColor="#c9c3b8" /><stop offset=".4" stopColor="#fffaf0" /><stop offset="1" stopColor="#a8a196" /></linearGradient>
      <radialGradient id="s1g"><stop stopColor="#fff2a0" stopOpacity=".9" /><stop offset="1" stopColor="#fff2a0" stopOpacity="0" /></radialGradient>
      <linearGradient id="s1k" x2="0" y2="1"><stop stopColor="#e8ecf8" /><stop offset="1" stopColor="#b8c0e0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#s1s)" />
    <St p={[8, 8, .6, 22, 20, .8, 36, 6, .5, 88, 10, .7, 104, 24, .5, 114, 6, .6, 12, 40, .4, 100, 44, .4, 70, 4, .5]} />
    <polygon points="60,48 0,22 0,66" fill="url(#s1b)" /><polygon points="60,48 120,36 120,58" fill="url(#s1c)" opacity=".6" />
    <circle cx="60" cy="48" r="20" fill="url(#s1g)" />
    <polygon points="51,124 69,124 66,56 54,56" fill="url(#s1t)" />
    <polygon points="53.4,104 66.6,104 67.2,114 52.8,114" fill="#c0392b" /><polygon points="54.6,80 65.4,80 66,90 54,90" fill="#c0392b" /><polygon points="55.4,62 64.6,62 64.9,68 55.1,68" fill="#c0392b" />
    <rect x="57" y="92" width="6" height="8" rx="3" fill="#3a4a8a" />
    <rect x="50" y="54" width="20" height="3" fill="#2b2b2b" /><path d="M50 54v-2h20v2" stroke="#2b2b2b" fill="none" /><g stroke="#2b2b2b" strokeWidth=".6">{[52, 56, 60, 64, 68].map(x => <line key={x} x1={x} y1="52" x2={x} y2="50" />)}</g>
    <rect x="54" y="41" width="12" height="11" fill="#fff3a0" /><path d="M58 41v11M62 41v11" stroke="#c9a227" strokeWidth=".7" />
    <polygon points="52,41 68,41 60,32" fill="#c0392b" /><circle cx="60" cy="31" r="1.4" fill="#c9a227" />
    <Cl x={14} y={132} s={1.7} f="url(#s1k)" /><Cl x={56} y={140} s={2.2} f="#eef2fa" /><Cl x={102} y={130} s={1.6} f="url(#s1k)" />
    <rect y="140" width="120" height="20" fill="#eef2fa" /><Cl x={30} y={150} s={1.4} f="#fff" /><Cl x={88} y={152} s={1.3} f="#fff" />
    <path d="M60 124Q50 130 44 136" stroke="#c9c3b8" strokeWidth="1" fill="none" opacity=".5" />
    <g transform="translate(96 108)"><path d="M-8 0Q0-4 8 0Q4 6-8 0Z" fill="#2b2b2b" /><path d="M-2-2V-12L4-4Z" fill="#fff" /></g>
  </Svg>],

  [2, 'ประตูเล็กในต้นไม้ใหญ่', <Svg>
    <defs>
      <linearGradient id="s2s" x2="0" y2="1"><stop stopColor="#d8f3dc" /><stop offset="1" stopColor="#74c69d" /></linearGradient>
      <linearGradient id="s2t" x2="1" y2="0"><stop stopColor="#4e3420" /><stop offset=".45" stopColor="#8a6240" /><stop offset="1" stopColor="#3e2716" /></linearGradient>
      <radialGradient id="s2l" cx=".4" cy=".35"><stop stopColor="#74c69d" /><stop offset="1" stopColor="#2d6a4f" /></radialGradient>
      <radialGradient id="s2g"><stop stopColor="#ffe8a3" stopOpacity=".8" /><stop offset="1" stopColor="#ffe8a3" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#s2s)" />
    <path d="M36 160C42 120 40 82 28 42H92C80 82 78 120 84 160Z" fill="url(#s2t)" />
    <path d="M36 160Q30 150 18 154M84 160Q92 150 104 156M44 160Q46 152 40 146" stroke="#4e3420" strokeWidth="4" fill="none" strokeLinecap="round" />
    <g stroke="#3e2716" strokeWidth="1" fill="none" opacity=".7"><path d="M50 60q4 22-2 46M70 56q-4 26 2 52M58 70q2 10 0 18M44 90q4 6 2 14" /></g>
    <ellipse cx="68" cy="92" rx="4" ry="5" fill="#3e2716" /><ellipse cx="68" cy="92" rx="2.4" ry="3" fill="#2a1a0e" />
    <g fill="url(#s2l)"><circle cx="26" cy="36" r="24" /><circle cx="60" cy="22" r="28" /><circle cx="94" cy="34" r="24" /><circle cx="44" cy="46" r="18" /><circle cx="78" cy="48" r="18" /></g>
    <g fill="#95d5b2" opacity=".6">{[[20, 28], [52, 12], [86, 24], [40, 40], [74, 40], [100, 44]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" />)}</g>
    <g fill="#e63946">{[[30, 44], [70, 30], [92, 50], [48, 24]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.8" />)}</g>
    <circle cx="60" cy="146" r="18" fill="url(#s2g)" />
    <path d="M52 160v-20a8 8 0 0 1 16 0v20z" fill="#f2c14e" stroke="#8a6240" strokeWidth="1.2" /><path d="M60 132v28" stroke="#c99700" strokeWidth=".6" /><circle cx="65" cy="150" r="1.2" fill="#6b4226" />
    <rect x="70" y="140" width="5" height="5" fill="#ffd166" stroke="#6b4226" strokeWidth=".6" /><path d="M72.5 140v5M70 142.5h5" stroke="#6b4226" strokeWidth=".4" />
    <g transform="translate(46 154)"><circle cx="0" cy="0" r="2" fill="#e63946" /><rect x="-.4" y="-6" width=".8" height="6" fill="#6b4226" /></g>
    <circle cx="102" cy="116" r="12" fill="url(#s2g)" />
    <g stroke="#f2c14e" strokeWidth="2" fill="none"><circle cx="102" cy="112" r="4.5" /><path d="M102 116.5v14M102 124h3.5M102 129h3" /></g>
    <g fill="#fff8c8">{[[96, 104], [110, 108], [106, 128]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".8" />)}</g>
  </Svg>],

  [4, 'ร่มที่ฝนตกข้างใน', <Svg>
    <defs>
      <linearGradient id="s4s" x2="0" y2="1"><stop stopColor="#ffd166" /><stop offset="1" stopColor="#fff1c1" /></linearGradient>
      <radialGradient id="s4u"><stop stopColor="#fffbe0" /><stop offset=".4" stopColor="#ffe066" stopOpacity=".6" /><stop offset="1" stopColor="#ffe066" stopOpacity="0" /></radialGradient>
      <linearGradient id="s4r" x2="0" y2="1"><stop stopColor="#ff6b8a" /><stop offset="1" stopColor="#c9184a" /></linearGradient>
      <linearGradient id="s4c" x2="0" y2="1"><stop stopColor="#8a94a6" /><stop offset="1" stopColor="#5c677d" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#s4s)" />
    <circle cx="100" cy="22" r="30" fill="url(#s4u)" /><circle cx="100" cy="22" r="10" fill="#fffbe0" />
    <path d="M0 132Q60 124 120 134V160H0Z" fill="#90be6d" /><g fill="#ff8fab">{[[14, 144], [28, 150], [96, 146], [108, 152]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" />)}</g>
    <g stroke="#55a630" strokeWidth=".8">{Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${i * 8 + 2} ${136 + (i % 3) * 6}l-1-3M${i * 8 + 4} ${136 + (i % 3) * 6}l1-3`} />)}</g>
    <path d="M26 70Q60 32 94 70Z" fill="url(#s4r)" /><path d="M26 70q8.5-6 17 0q8.5-6 17 0q8.5-6 17 0q8.5-6 17 0" fill="#ff8fab" stroke="#a4133c" strokeWidth=".8" />
    <g stroke="#a4133c" strokeWidth=".7" fill="none"><path d="M60 46L43 70M60 46L60 70M60 46L77 70" /></g><circle cx="60" cy="45" r="1.6" fill="#a4133c" />
    <line x1="60" y1="70" x2="60" y2="124" stroke="#343a40" strokeWidth="2" /><path d="M60 124q0 6 5 6t5-5" stroke="#343a40" strokeWidth="2" fill="none" />
    <g fill="url(#s4c)"><ellipse cx="60" cy="84" rx="16" ry="5" /><circle cx="52" cy="80" r="5" /><circle cx="62" cy="77" r="6.5" /><circle cx="70" cy="81" r="4" /></g>
    <g stroke="#4cc9f0" strokeWidth="1.1" strokeLinecap="round">{[[48, 90], [54, 92], [60, 90], [66, 92], [72, 90], [51, 100], [63, 101], [57, 108]].map(([x, y], i) => <line key={i} x1={x} y1={y} x2={x - 1} y2={y + 5} />)}</g>
    <g><circle cx="46" cy="106" r="6" fill="#f1c27d" /><path d="M40 104q6-8 12 0q-2-5-6-5t-6 5z" fill="#5a3e2b" /><path d="M43 106q1-1 2 0M47 106q1-1 2 0" stroke="#5a3e2b" strokeWidth=".8" fill="none" /><path d="M44 110q2 1 4 0" stroke="#a24a3a" strokeWidth=".7" fill="none" />
      <path d="M39 114h14l2 18H37z" fill="#4361ee" /><path d="M53 116l6 2" stroke="#f1c27d" strokeWidth="3" strokeLinecap="round" /><path d="M41 132v4M49 132v4" stroke="#264653" strokeWidth="3" strokeLinecap="round" /></g>
    <ellipse cx="46" cy="138" rx="12" ry="2.6" fill="#4cc9f0" opacity=".6" />
    <path d="M30 56l-6-4M28 64h-8M90 56l6-4" stroke="#fff" strokeWidth="1" opacity=".6" />
  </Svg>],

  [5, 'บันไดขึ้นฟ้า', <Svg>
    <defs>
      <linearGradient id="s5s" x2="0" y2="1"><stop stopColor="#4cc9f0" /><stop offset=".6" stopColor="#a9def9" /><stop offset="1" stopColor="#f1faff" /></linearGradient>
      <linearGradient id="s5d" x2="0" y2="1"><stop stopColor="#fff3b0" /><stop offset="1" stopColor="#ffd166" /></linearGradient>
      <radialGradient id="s5g"><stop stopColor="#fff8d6" stopOpacity=".9" /><stop offset="1" stopColor="#fff8d6" stopOpacity="0" /></radialGradient>
      <linearGradient id="s5t" x2="0" y2="1"><stop stopColor="#fff" /><stop offset="1" stopColor="#d6ccc2" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#s5s)" />
    <Cl x={20} y={40} s={1.2} /><Cl x={24} y={124} s={1.8} o={.85} /><Cl x={100} y={100} s={1.4} o={.9} /><Cl x={70} y={150} s={2} /><Cl x={14} y={154} s={1.4} />
    <circle cx="96" cy="38" r="34" fill="url(#s5g)" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <g key={i}><rect x={4 + i * 10} y={146 - i * 13} width="16" height="4" fill="url(#s5t)" /><rect x={4 + i * 10} y={150 - i * 13} width="16" height="2" fill="#bcb1a3" /><ellipse cx={12 + i * 10} cy={155 - i * 13} rx="6" ry="1" fill="#6a8caf" opacity=".25" /></g>)}
    <rect x="84" y="18" width="24" height="38" fill="#fff" stroke="#d6ccc2" strokeWidth="1.2" />
    <rect x="87" y="21" width="18" height="35" fill="url(#s5d)" />
    <polygon points="87,21 78,25 78,58 87,56" fill="#e8d9b8" stroke="#c9b79c" strokeWidth=".6" /><circle cx="80" cy="40" r=".9" fill="#c9a227" />
    <path d="M90 56L74 160H120V160L104 56Z" fill="#fff8d6" opacity=".25" />
    <g fill="#fff">{[[96, 30], [100, 44], [92, 48]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
    <g transform="translate(44 94)"><circle cx="0" cy="-8" r="2.4" fill="#264653" /><path d="M-2-6h4l1 7h-6z" fill="#264653" /><path d="M-1 1l-1 5M1 1l2 4" stroke="#264653" strokeWidth="1.2" strokeLinecap="round" /><path d="M2-5l3-3" stroke="#264653" strokeWidth="1" strokeLinecap="round" /></g>
    <g fill="#fff" opacity=".9"><path d="M60 20q3-3 6 0q-3 1-6 0z" /><path d="M66 14q2-2 4 0q-2 1-4 0z" /></g>
  </Svg>],

  [6, 'ชิงช้าว่างเปล่า', <Svg>
    <defs>
      <linearGradient id="s6s" x2="0" y2="1"><stop stopColor="#2b0f1e" /><stop offset=".55" stopColor="#9d2b45" /><stop offset="1" stopColor="#f2845c" /></linearGradient>
      <radialGradient id="s6u"><stop stopColor="#ffd6a5" /><stop offset=".5" stopColor="#ff9f5a" stopOpacity=".6" /><stop offset="1" stopColor="#ff9f5a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#s6s)" />
    <St p={[10, 8, .5, 30, 18, .4, 90, 6, .6, 108, 22, .4]} f="#ffd6e0" />
    <circle cx="60" cy="116" r="54" fill="url(#s6u)" /><circle cx="60" cy="116" r="26" fill="#ffb26b" opacity=".9" />
    <g fill="#ffd6a5" opacity=".5"><rect x="20" y="108" width="80" height="1.5" /><rect x="28" y="114" width="64" height="1.5" /></g>
    <path d="M0 132Q30 120 60 126T120 128V160H0Z" fill="#1a0a10" />
    <path d="M120 10Q80 18 30 12Q24 12 20 16" stroke="#1a0a10" strokeWidth="6" fill="none" strokeLinecap="round" /><path d="M120 14Q90 22 70 20" stroke="#1a0a10" strokeWidth="2" fill="none" />
    <path d="M30 13q-4-6-2-10M80 17q2-6 6-8" stroke="#1a0a10" strokeWidth="1.5" fill="none" />
    <g fill="#1a0a10">{[[28, 4], [40, 10], [84, 10], [100, 14], [110, 8]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="3" ry="1.6" transform={`rotate(${i * 30} ${x} ${y})`} />)}</g>
    <g transform="rotate(8 60 16)"><path d="M50 16V96M72 17V96" stroke="#1a0a10" strokeWidth="1.1" /><rect x="46" y="95" width="30" height="4" rx="1" fill="#1a0a10" /></g>
    <g fill="#1a0a10"><path d="M14 52q4-4 8 0q4-4 8 0" stroke="#1a0a10" strokeWidth="1.3" fill="none" /><path d="M28 62q3-3 6 0q3-3 6 0" stroke="#1a0a10" strokeWidth="1" fill="none" /></g>
    <g transform="translate(88 132)"><ellipse rx="5" ry="2.4" fill="#1a0a10" /><path d="M-5 0q-2-4 2-5" stroke="#1a0a10" strokeWidth="1.2" fill="none" /></g>
    <g fill="#1a0a10"><path d="M8 132V112L12 106L16 112V132ZM102 128V114L106 108L110 114V128Z" /></g>
  </Svg>],

  [7, 'ทะเลทรายในนาฬิกาทราย', <Svg>
    <defs>
      <linearGradient id="s7s" x2="0" y2="1"><stop stopColor="#22223b" /><stop offset="1" stopColor="#6b5b95" /></linearGradient>
      <linearGradient id="s7w" x2="1" y2="0"><stop stopColor="#6b3f1d" /><stop offset=".5" stopColor="#a87442" /><stop offset="1" stopColor="#5a3417" /></linearGradient>
      <linearGradient id="s7g" x2="1" y2="0"><stop stopColor="#cfe8ff" stopOpacity=".35" /><stop offset=".3" stopColor="#fff" stopOpacity=".1" /><stop offset="1" stopColor="#cfe8ff" stopOpacity=".3" /></linearGradient>
      <linearGradient id="s7d" x2="0" y2="1"><stop stopColor="#f6c177" /><stop offset="1" stopColor="#d4893a" /></linearGradient>
      <linearGradient id="s7k" x2="0" y2="1"><stop stopColor="#ffb4a2" /><stop offset="1" stopColor="#ffe8a3" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#s7s)" />
    <St p={[10, 10, .5, 20, 40, .4, 100, 20, .6, 110, 60, .4, 8, 120, .5, 112, 140, .4]} />
    <path d="M37 26C37 60 58 70 58 80C58 90 37 100 37 134H83C83 100 62 90 62 80C62 70 83 60 83 26Z" fill="url(#s7k)" opacity=".4" />
    <path d="M42 52H78L61 76H59Z" fill="url(#s7d)" /><path d="M46 52q14 6 28 0" fill="#f9d29a" />
    <line x1="60" y1="76" x2="60" y2="116" stroke="#e8b86d" strokeWidth=".9" />
    <circle cx="72" cy="104" r="4" fill="#fff3c4" /><g fill="#fff" opacity=".7"><circle cx="48" cy="100" r=".5" /><circle cx="68" cy="94" r=".4" /></g>
    <path d="M38 134Q46 112 58 120Q70 108 82 134Z" fill="url(#s7d)" /><path d="M38 134Q50 122 62 128Q72 122 82 134Z" fill="#c97b33" opacity=".6" />
    <path d="M62 118l1-3 2 2 1-4 2 3 1-2 2 4" stroke="#2d6a4f" strokeWidth="1.2" fill="none" />
    <g fill="#6b3f1d"><path d="M48 122q2-4 4-1q2-3 4 0l3-3 1 1-2 4v3h-1v-2h-6v2h-1z" /></g>
    <path d="M37 26C37 60 58 70 58 80C58 90 37 100 37 134H83C83 100 62 90 62 80C62 70 83 60 83 26Z" fill="url(#s7g)" stroke="#e8f4ff" strokeWidth="1" />
    <path d="M42 30Q42 52 54 64" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".6" strokeLinecap="round" />
    <rect x="28" y="18" width="64" height="8" rx="2" fill="url(#s7w)" /><rect x="28" y="134" width="64" height="8" rx="2" fill="url(#s7w)" />
    <g fill="url(#s7w)"><rect x="30" y="26" width="4" height="108" /><rect x="86" y="26" width="4" height="108" /></g>
    <g fill="#c9a227"><circle cx="32" cy="22" r="2" /><circle cx="88" cy="22" r="2" /><circle cx="32" cy="138" r="2" /><circle cx="88" cy="138" r="2" /></g>
  </Svg>],

  [8, 'ดวงตาในป่า', <Svg>
    <defs>
      <linearGradient id="s8s" x2="0" y2="1"><stop stopColor="#081c15" /><stop offset="1" stopColor="#1b4332" /></linearGradient>
      <radialGradient id="s8e" cx=".5" cy=".45"><stop stopColor="#fffef5" /><stop offset=".8" stopColor="#e9e4cf" /><stop offset="1" stopColor="#b8b39c" /></radialGradient>
      <radialGradient id="s8i" cx=".45" cy=".4"><stop stopColor="#b7e4c7" /><stop offset=".5" stopColor="#40916c" /><stop offset="1" stopColor="#1b4332" /></radialGradient>
      <radialGradient id="s8f"><stop stopColor="#e6ff6b" stopOpacity=".9" /><stop offset="1" stopColor="#e6ff6b" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#s8s)" />
    <g fill="#040f0a">{[[6, 0, 8], [22, 0, 6], [96, 0, 10], [110, 0, 6]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height="160" />)}</g>
    <ellipse cx="60" cy="62" rx="38" ry="20" fill="url(#s8e)" />
    <g stroke="#c9184a" strokeWidth=".4" opacity=".5" fill="none"><path d="M24 62q8 2 14-2M96 62q-8 3-14-1M30 54q6 2 10 6" /></g>
    <circle cx="60" cy="62" r="14" fill="url(#s8i)" /><g stroke="#2d6a4f" strokeWidth=".4" opacity=".7">{Array.from({ length: 16 }, (_, i) => <line key={i} x1={60 + 7 * Math.cos(i * .39)} y1={62 + 7 * Math.sin(i * .39)} x2={60 + 13 * Math.cos(i * .39)} y2={62 + 13 * Math.sin(i * .39)} />)}</g>
    <ellipse cx="60" cy="62" rx="3" ry="8" fill="#000" /><circle cx="65" cy="57" r="2.6" fill="#fff" /><circle cx="56" cy="67" r="1" fill="#fff" opacity=".7" />
    <path d="M22 62Q60 34 98 62" stroke="#0a1f15" strokeWidth="4" fill="none" /><g stroke="#0a1f15" strokeWidth="1.4">{[30, 40, 50, 60, 70, 80, 90].map(x => <path key={x} d={`M${x} ${52 - (4 - Math.abs(60 - x) / 10)}l${(x - 60) / 10} -6`} />)}</g>
    <g fill="#0a1f15"><ellipse cx="18" cy="46" rx="22" ry="15" /><ellipse cx="104" cy="50" rx="22" ry="15" /><ellipse cx="60" cy="30" rx="34" ry="11" /><ellipse cx="30" cy="84" rx="18" ry="9" /><ellipse cx="94" cy="84" rx="20" ry="10" /><ellipse cx="60" cy="92" rx="22" ry="8" /></g>
    <g fill="#1b4332">{[[12, 40], [30, 30], [92, 40], [108, 58], [44, 90], [78, 92], [24, 80]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q4-5 8 0q-4 4-8 0z`} />)}</g>
    <g fill="#040f0a"><rect x="14" y="90" width="7" height="70" /><rect x="50" y="98" width="9" height="62" /><rect x="96" y="90" width="6" height="70" /></g>
    {[[30, 112], [80, 120], [70, 140], [40, 132], [108, 128], [20, 146]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="5" fill="url(#s8f)" /><circle cx={x} cy={y} r=".9" fill="#f4ff9a" /></g>)}
    <path d="M0 150Q60 144 120 152V160H0Z" fill="#040f0a" />
  </Svg>],

  [9, 'พายุในถ้วยชา', <Svg>
    <defs>
      <linearGradient id="s9s" x2="0" y2="1"><stop stopColor="#f6efe4" /><stop offset="1" stopColor="#e3d3bd" /></linearGradient>
      <linearGradient id="s9c" x2="1" y2="0"><stop stopColor="#d6ccc2" /><stop offset=".35" stopColor="#ffffff" /><stop offset="1" stopColor="#bcb1a3" /></linearGradient>
      <radialGradient id="s9t" cx=".5" cy=".5"><stop stopColor="#a0682f" /><stop offset="1" stopColor="#5f3c1a" /></radialGradient>
      <radialGradient id="s9k" cx=".4" cy=".3"><stop stopColor="#8a94a6" /><stop offset="1" stopColor="#3d4556" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#s9s)" />
    <rect y="120" width="120" height="40" fill="#c9a77c" /><path d="M0 120h120" stroke="#e3c79d" strokeWidth="1.5" /><g stroke="#b08a66" strokeWidth=".5"><path d="M0 132q60-4 120 0M0 146q60-4 120 0" fill="none" /></g>
    <ellipse cx="60" cy="130" rx="44" ry="9" fill="#8a6a4a" opacity=".3" />
    <ellipse cx="60" cy="126" rx="42" ry="9" fill="url(#s9c)" stroke="#c9b79c" /><ellipse cx="60" cy="125" rx="28" ry="5" fill="none" stroke="#c9b79c" strokeWidth=".6" />
    <path d="M30 90H90Q88 124 60 125Q32 124 30 90Z" fill="url(#s9c)" stroke="#c9b79c" />
    <path d="M36 104q24 6 48 0" stroke="#457b9d" strokeWidth="1.2" fill="none" /><g fill="#457b9d">{[42, 52, 60, 68, 78].map(x => <circle key={x} cx={x} cy={106 + (x === 60 ? 1 : 0)} r="1" />)}</g>
    <path d="M89 98q14 2 10 14q-3 6-11 4" stroke="url(#s9c)" strokeWidth="4.5" fill="none" /><path d="M89 98q14 2 10 14q-3 6-11 4" stroke="#c9b79c" strokeWidth=".6" fill="none" />
    <ellipse cx="60" cy="90" rx="30" ry="5" fill="url(#s9t)" />
    <path d="M38 90q6-4 12 0t12 0t12 0t8 0" stroke="#c48a4a" strokeWidth="1" fill="none" /><path d="M54 88q6-6 12 0" stroke="#3d2408" strokeWidth=".8" fill="none" />
    <path d="M52 90q-8-10 2-20" stroke="#5f3c1a" strokeWidth="2" fill="none" opacity=".5" />
    <g stroke="#4cc9f0" strokeWidth="1" strokeLinecap="round">{[[42, 70], [48, 74], [54, 70], [68, 72], [74, 70], [80, 74], [46, 80], [76, 80]].map(([x, y], i) => <line key={i} x1={x} y1={y} x2={x - 1.4} y2={y + 6} />)}</g>
    <g fill="url(#s9k)"><circle cx="46" cy="56" r="12" /><circle cx="62" cy="48" r="16" /><circle cx="78" cy="58" r="11" /><rect x="36" y="56" width="52" height="12" rx="6" /></g>
    <g fill="#adb5bd" opacity=".6"><circle cx="58" cy="42" r="5" /><circle cx="44" cy="52" r="4" /></g>
    <polygon points="64,64 55,80 61,80 55,94 70,74 64,74 69,64" fill="#ffd60a" /><polygon points="64,64 55,80 61,80" fill="#fff3b0" />
    <g fill="#c9b79c"><path d="M100 128l6-2 1 3-6 1z" /><circle cx="18" cy="134" r="2" fill="#fff" stroke="#c9b79c" strokeWidth=".5" /></g>
  </Svg>],
];
