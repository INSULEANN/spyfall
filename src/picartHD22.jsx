// ภาพการ์ดแบบละเอียด ชุด 22 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Bf = ({ x, y, s = 1, c = '#ff8fab' }) => <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M0 0Q-8-10-10-2Q-8 4 0 0ZM0 0Q8-10 10-2Q8 4 0 0Z" fill={c} /><path d="M0 0Q-6 4-6 8Q-2 8 0 0ZM0 0Q6 4 6 8Q2 8 0 0Z" fill="#ffb3c6" /><path d="M0-3v7" stroke="#6d2e46" strokeWidth=".7" /><path d="M0-3l-2-3M0-3l2-3" stroke="#6d2e46" strokeWidth=".4" /></g>;

export const HD22 = [
  [159, 'หน้าต่างดวงเดียวที่ยังเปิดไฟ', <Svg>
    <defs>
      <linearGradient id="g159s" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset="1" stopColor="#1b263b" /></linearGradient>
      <linearGradient id="g159a" x2="1" y2="0"><stop stopColor="#0d1117" /><stop offset="1" stopColor="#1c2128" /></linearGradient>
      <linearGradient id="g159b" x2="1" y2="0"><stop stopColor="#161b22" /><stop offset="1" stopColor="#21262d" /></linearGradient>
      <radialGradient id="g159g"><stop stopColor="#ffd166" stopOpacity=".55" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#g159s)" />
    <St p={[8, 8, .6, 30, 16, .4, 52, 6, .5, 100, 10, .6, 76, 20, .4, 112, 26, .4]} />
    <path d="M90 14a7 7 0 1 0 6 10a5.6 5.6 0 1 1-6-10z" fill="#e9ecef" opacity=".6" />
    <rect x="6" y="34" width="46" height="126" fill="url(#g159a)" /><rect x="58" y="12" width="56" height="148" fill="url(#g159b)" /><rect x="58" y="10" width="56" height="3" fill="#30363d" /><rect x="6" y="32" width="46" height="3" fill="#30363d" />
    <g fill="#262c36">{Array.from({ length: 30 }, (_, i) => <rect key={i} x={62 + (i % 5) * 10.4} y={18 + (i / 5 | 0) * 22} width="7" height="12" />)}{Array.from({ length: 20 }, (_, i) => <rect key={'a' + i} x={10 + (i % 4) * 10.6} y={40 + (i / 4 | 0) * 24} width="7" height="12" />)}</g>
    <g fill="#3a4250" opacity=".5"><rect x="10" y="88" width="7" height="12" /><rect x="93" y="62" width="7" height="12" /></g>
    <circle cx="86" cy="92" r="18" fill="url(#g159g)" />
    <rect x="82.6" y="84" width="7" height="12" fill="#ffd166" /><path d="M86 84v12M82.6 90h7" stroke="#6b4226" strokeWidth=".6" />
    <g fill="#3a2a1a"><circle cx="86" cy="91" r="1.6" /><path d="M84.4 92.6h3.2v3.4h-3.2z" /></g><rect x="83.4" y="84.6" width="2" height="5" fill="#fff3b0" opacity=".6" />
    <path d="M86 96L72 160H100Z" fill="#ffd166" opacity=".05" />
    <rect y="154" width="120" height="6" fill="#05070a" />
  </Svg>],

  [160, 'กลีบซากุระกลายเป็นผีเสื้อ', <Svg>
    <defs>
      <linearGradient id="g160s" x2="0" y2="1"><stop stopColor="#ffe5ec" /><stop offset="1" stopColor="#ffc2d1" /></linearGradient>
      <linearGradient id="g160b" x2="0" y2="1"><stop stopColor="#5e503f" /><stop offset="1" stopColor="#3a2e22" /></linearGradient>
      <radialGradient id="g160p" cx=".4" cy=".35"><stop stopColor="#fff0f5" /><stop offset="1" stopColor="#ffb3c6" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#g160s)" />
    <circle cx="96" cy="120" r="22" fill="#fff" opacity=".4" />
    <path d="M-4 44Q30 30 52 52Q62 62 74 54" stroke="url(#g160b)" strokeWidth="6" fill="none" strokeLinecap="round" /><path d="M22 38q-6-12 0-22M42 46q4-10 12-14M60 58q6 8 4 18" stroke="url(#g160b)" strokeWidth="3" fill="none" strokeLinecap="round" />
    {[[18, 28], [34, 36], [50, 46], [10, 44], [62, 52], [28, 18], [44, 30], [22, 14], [56, 30], [64, 72], [72, 48]].map(([x, y], i) => <g key={i}>{[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx={x} cy={y - 3} rx="2.4" ry="3.4" fill="url(#g160p)" transform={`rotate(${a} ${x} ${y})`} />)}<circle cx={x} cy={y} r="1" fill="#ff4d6d" /></g>)}
    <g fill="#ffb3c6">{[[56, 74, 20], [46, 96, -10], [62, 88, 50], [38, 116, 30]].map(([x, y, r], i) => <path key={i} d={`M${x} ${y - 3}q3 3 0 6q-3-3 0-6z`} transform={`rotate(${r} ${x} ${y})`} />)}</g>
    <path d="M56 74Q68 88 74 104Q82 118 80 132" stroke="#ff8fab" strokeWidth=".6" strokeDasharray="1.5 2.5" fill="none" />
    <Bf x={72} y={94} s={.6} /><Bf x={84} y={112} s={.8} c="#ff70a6" /><Bf x={98} y={74} s={1} /><Bf x={78} y={136} s={1.15} c="#ff4d6d" />
    <g fill="#fff" opacity=".8">{[[90, 60], [104, 96], [60, 140]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 2}l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z`} />)}</g>
  </Svg>],

  [161, 'หนูหลบฝนใต้เห็ด', <Svg>
    <defs>
      <linearGradient id="g161s" x2="0" y2="1"><stop stopColor="#495057" /><stop offset="1" stopColor="#868e96" /></linearGradient>
      <radialGradient id="g161c" cx=".4" cy=".3"><stop stopColor="#ff6b6b" /><stop offset="1" stopColor="#9d0208" /></radialGradient>
      <linearGradient id="g161t" x2="1" y2="0"><stop stopColor="#d6ccc2" /><stop offset=".5" stopColor="#fbf6ee" /><stop offset="1" stopColor="#c9bfb0" /></linearGradient>
      <radialGradient id="g161m" cx=".4" cy=".3"><stop stopColor="#ced4da" /><stop offset="1" stopColor="#868e96" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#g161s)" />
    <g stroke="#dee2e6" strokeWidth=".7" opacity=".7">{Array.from({ length: 30 }, (_, i) => <line key={i} x1={(i * 43) % 120} y1={(i * 29) % 130} x2={(i * 43) % 120 - 3} y2={(i * 29) % 130 + 10} />)}</g>
    <path d="M0 132Q60 124 120 134V160H0Z" fill="#343a40" /><g fill="#2b9348">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 10 + 3} 134l2-6 2 6z`} />)}</g>
    <ellipse cx="60" cy="142" rx="36" ry="4" fill="#adb5bd" opacity=".4" /><g stroke="#ced4da" strokeWidth=".6" fill="none" opacity=".7"><ellipse cx="30" cy="146" rx="5" ry="1.4" /><ellipse cx="94" cy="144" rx="6" ry="1.6" /></g>
    <path d="M52 92Q50 120 54 140H66Q70 120 68 92Z" fill="url(#g161t)" /><path d="M52 96q8 4 16 0" stroke="#bcb1a3" strokeWidth=".6" fill="none" />
    <path d="M14 96Q60 30 106 96Q60 88 14 96Z" fill="url(#g161c)" />
    <g fill="#fff">{[[40, 72, 4.4], [60, 58, 5.6], [80, 70, 4], [30, 88, 2.6], [92, 86, 3], [60, 80, 2.4]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * .8} />)}</g>
    <path d="M14 96Q60 88 106 96" stroke="#7a0a10" strokeWidth="1.2" fill="none" /><g stroke="#e9e1d4" strokeWidth=".5">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${24 + i * 6} 94l${(i - 6) * .3} 4`} />)}</g>
    <g fill="#caf0f8">{[[12, 100], [108, 100], [20, 108]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q-1.6 3 0 4q1.6-1 0-4z`} />)}</g>
    <g><ellipse cx="80" cy="132" rx="10" ry="7.4" fill="url(#g161m)" /><circle cx="88" cy="124" r="5.4" fill="url(#g161m)" /><circle cx="85" cy="119" r="3.4" fill="#adb5bd" /><circle cx="85" cy="119" r="2" fill="#ffafcc" /><circle cx="91" cy="121" r="2.4" fill="#adb5bd" /><circle cx="91" cy="121" r="1.2" fill="#ffafcc" />
      <circle cx="90" cy="124" r="1" fill="#222" /><circle cx="93.4" cy="126" r=".9" fill="#ff8fab" /><path d="M71 134q-10 4-6 10" stroke="#adb5bd" strokeWidth="1" fill="none" />
      <path d="M78 128q4-6 10-4" stroke="#495057" strokeWidth=".8" fill="none" /><path d="M76 138h8" stroke="#868e96" strokeWidth="1.6" strokeLinecap="round" /></g>
    <g transform="translate(36 130)"><rect x="-6" y="-4" width="12" height="8" rx="1.6" fill="#ffd166" /><path d="M-6 0h12" stroke="#e9c46a" /></g>
  </Svg>],

  [162, 'ชิงช้าสวรรค์กับกระเช้าเดียวที่สว่าง', <Svg>
    <defs>
      <linearGradient id="g162s" x2="0" y2="1"><stop stopColor="#10002b" /><stop offset="1" stopColor="#3c096c" /></linearGradient>
      <radialGradient id="g162g"><stop stopColor="#ffd60a" stopOpacity=".6" /><stop offset="1" stopColor="#ffd60a" stopOpacity="0" /></radialGradient>
      <linearGradient id="g162p" x2="1" y2="0"><stop stopColor="#5a189a" /><stop offset=".5" stopColor="#9d4edd" /><stop offset="1" stopColor="#3c096c" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#g162s)" />
    <St p={[8, 10, .6, 30, 22, .5, 100, 12, .7, 112, 46, .5, 20, 120, .4, 104, 120, .5]} />
    <circle cx="60" cy="70" r="42" fill="none" stroke="#c77dff" strokeWidth="2.4" /><circle cx="60" cy="70" r="38" fill="none" stroke="#7b2cbf" strokeWidth=".8" /><circle cx="60" cy="70" r="14" fill="none" stroke="#7b2cbf" strokeWidth="1.2" />
    <g stroke="#9d4edd" strokeWidth="1">{Array.from({ length: 10 }, (_, i) => <line key={i} x1="60" y1="70" x2={60 + 42 * Math.cos(i * .628)} y2={70 + 42 * Math.sin(i * .628)} />)}</g>
    <g fill="#e0aaff">{Array.from({ length: 20 }, (_, i) => <circle key={i} cx={60 + 42 * Math.cos(i * .314)} cy={70 + 42 * Math.sin(i * .314)} r=".9" />)}</g>
    <circle cx="60" cy="70" r="4" fill="#c77dff" /><circle cx="60" cy="70" r="1.6" fill="#fff" />
    {Array.from({ length: 10 }, (_, i) => { const x = 60 + 42 * Math.cos(i * .628), y = 70 + 42 * Math.sin(i * .628), on = i === 3; return <g key={i}>{on && <circle cx={x} cy={y + 6} r="20" fill="url(#g162g)" />}<line x1={x} y1={y} x2={x} y2={y + 3} stroke="#c77dff" /><path d={`M${x - 6} ${y + 3}h12l-1 9h-10z`} fill={on ? '#ffd60a' : '#240046'} stroke="#c77dff" strokeWidth=".7" /><path d={`M${x - 5} ${y + 3}a5 3 0 0 1 10 0`} fill="#7b2cbf" />{on && <g><circle cx={x - 2} cy={y + 7} r="1.4" fill="#3a2a1a" /><circle cx={x + 2} cy={y + 7} r="1.4" fill="#3a2a1a" /></g>}</g>; })}
    <path d="M60 70L32 150M60 70L88 150" stroke="url(#g162p)" strokeWidth="3.4" /><path d="M40 128h40" stroke="#5a189a" strokeWidth="2" />
    <rect y="148" width="120" height="12" fill="#10002b" /><rect x="48" y="140" width="24" height="10" fill="#240046" stroke="#7b2cbf" strokeWidth=".6" />
  </Svg>],

  [163, 'ฝนตกเป็นปลา', <Svg>
    <defs>
      <linearGradient id="g163s" x2="0" y2="1"><stop stopColor="#577590" /><stop offset="1" stopColor="#c5d8e4" /></linearGradient>
      <radialGradient id="g163c" cx=".4" cy=".3"><stop stopColor="#8a9cb0" /><stop offset="1" stopColor="#3d4f63" /></radialGradient>
      <linearGradient id="g163o" x2="1" y2="1"><stop stopColor="#ffb703" /><stop offset="1" stopColor="#f77f00" /></linearGradient>
      <linearGradient id="g163b" x2="1" y2="1"><stop stopColor="#90e0ef" /><stop offset="1" stopColor="#0077b6" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#g163s)" />
    <g fill="url(#g163c)"><circle cx="20" cy="14" r="20" /><circle cx="56" cy="8" r="24" /><circle cx="96" cy="16" r="20" /><ellipse cx="60" cy="26" rx="62" ry="10" /></g>
    {[[24, 54, 70, 'o'], [52, 66, 100, 'b'], [82, 50, 80, 'o'], [38, 92, 95, 'b'], [96, 86, 110, 'o'], [66, 108, 85, 'b'], [16, 118, 75, 'o'], [100, 124, 100, 'b']].map(([x, y, r, k], i) => <g key={i} transform={`rotate(${r} ${x} ${y})`}><path d={`M${x - 7} ${y}q7-5 14 0q-7 5-14 0zM${x - 7} ${y}l-4-3v6z`} fill={`url(#g163${k})`} /><circle cx={x + 4} cy={y - .6} r=".8" fill="#222" /><path d={`M${x} ${y - 3}q2 3 0 6`} stroke="#fff" strokeWidth=".4" fill="none" opacity=".6" /></g>)}
    <g stroke="#caf0f8" strokeWidth=".6" opacity=".7">{Array.from({ length: 14 }, (_, i) => <line key={i} x1={(i * 37) % 120} y1={40 + (i * 23) % 80} x2={(i * 37) % 120 - 2} y2={46 + (i * 23) % 80} />)}</g>
    <path d="M0 160V132L14 124L28 132V160ZM34 160V128L50 118L66 128V160ZM74 160V134L90 122L106 134V126H112V160Z" fill="#31572c" /><g fill="#ffd166" opacity=".8">{[[12, 140], [48, 136], [88, 140]].map(([x, y], i) => <rect key={i} x={x} y={y} width="4" height="5" />)}</g>
    <g transform="translate(96 152)"><circle cx="0" cy="-12" r="2.6" fill="#132a13" /><path d="M-2-9h4l1 9h-6z" fill="#132a13" /><path d="M-9-15Q0-24 9-15Z" fill="#e63946" /><path d="M0-15v6" stroke="#132a13" /></g>
    <g transform="translate(60 152) rotate(10)"><path d="M-5 0q5-3 10 0q-5 3-10 0z" fill="url(#g163o)" /></g>
  </Svg>],

  [164, 'หอยทากแข่งกัน', <Svg>
    <defs>
      <linearGradient id="g164s" x2="0" y2="1"><stop stopColor="#d9ed92" /><stop offset="1" stopColor="#b5e48c" /></linearGradient>
      <linearGradient id="g164g" x2="0" y2="1"><stop stopColor="#76c893" /><stop offset="1" stopColor="#34a0a4" /></linearGradient>
      <radialGradient id="g164a" cx=".4" cy=".35"><stop stopColor="#ffc078" /><stop offset="1" stopColor="#e07a3a" /></radialGradient>
      <radialGradient id="g164b" cx=".4" cy=".35"><stop stopColor="#c77dff" /><stop offset="1" stopColor="#5a189a" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#g164s)" />
    <g fill="#fff" opacity=".7"><ellipse cx="24" cy="24" rx="14" ry="4" /><ellipse cx="90" cy="34" rx="10" ry="3" /></g>
    <path d="M0 104Q60 96 120 106V160H0Z" fill="url(#g164g)" /><g stroke="#1e6091" strokeWidth=".8" opacity=".5">{Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${i * 8 + 2} ${110 + (i % 3) * 14}q-1-5 0-8`} fill="none" />)}</g>
    <path d="M10 118H108M10 140H108" stroke="#fff" strokeWidth="1" strokeDasharray="4 3" opacity=".6" />
    <g stroke="#6b4226" strokeWidth="2.4"><line x1="100" y1="80" x2="100" y2="146" /><line x1="114" y1="80" x2="114" y2="146" /></g><path d="M100 90Q107 98 114 90" stroke="#e63946" strokeWidth="2" fill="none" /><g fill="#212529">{[0, 1, 2].map(i => <g key={i}><rect x="101" y={80 + i * 4} width="3.4" height="2" /><rect x="108" y={80 + i * 4} width="3.4" height="2" /><rect x="104.4" y={82 + i * 4} width="3.4" height="2" /><rect x="111.4" y={82 + i * 4} width="2.6" height="2" /></g>)}</g>
    {[[40, 114, 'a'], [62, 136, 'b']].map(([x, y, k], i) => <g key={i}><path d={`M${x - 24} ${y + 4}Q${x - 24} ${y - 4} ${x - 10} ${y - 2}H${x + 14}Q${x + 22} ${y} ${x + 20} ${y + 4}Z`} fill="#e9d8a6" /><path d={`M${x - 22} ${y + 4}h40`} stroke="#c9b787" strokeWidth=".6" />
      <circle cx={x - 2} cy={y - 11} r="12" fill={`url(#g164${k})`} /><path d={`M${x - 2} ${y - 11}m-7 0a7 7 0 1 1 7 7a4 4 0 1 1-4-4a1.6 1.6 0 1 1 1.6 1.6`} stroke="#fff" fill="none" opacity=".6" strokeWidth="1" />
      <path d={`M${x + 16} ${y - 1}l3-11M${x + 12} ${y - 1}l-1-11`} stroke="#e9d8a6" strokeWidth="1.6" /><circle cx={x + 19} cy={y - 12} r="1.6" fill="#3a2a1a" /><circle cx={x + 11} cy={y - 12} r="1.6" fill="#3a2a1a" /><path d={`M${x + 14} ${y + 1}q2 1 4 0`} stroke="#8a6a3a" strokeWidth=".6" fill="none" />
      <path d={`M${x - 28} ${y + 4}h-8`} stroke="#fff" strokeWidth=".8" opacity=".6" /></g>)}
    <circle cx="36" cy="102" r="3.4" fill="#fff" stroke="#264653" strokeWidth=".6" /><circle cx="58" cy="124" r="3.4" fill="#fff" stroke="#264653" strokeWidth=".6" /><path d="M35 101v2h2M57 123v2h2" stroke="#264653" strokeWidth=".5" fill="none" />
  </Svg>],

  [165, 'ถ้วยรางวัลบนเวทีว่าง', <Svg>
    <defs>
      <linearGradient id="g165s" x2="0" y2="1"><stop stopColor="#14111a" /><stop offset="1" stopColor="#2b2333" /></linearGradient>
      <linearGradient id="g165c" x2="1" y2="0"><stop stopColor="#7a1f3d" /><stop offset=".5" stopColor="#a23b72" /><stop offset="1" stopColor="#5a0f2a" /></linearGradient>
      <linearGradient id="g165l" x2="0" y2="1"><stop stopColor="#fff6c8" stopOpacity=".35" /><stop offset="1" stopColor="#fff6c8" stopOpacity=".06" /></linearGradient>
      <linearGradient id="g165t" x2="1" y2="1"><stop stopColor="#fff1a8" /><stop offset=".5" stopColor="#ffd60a" /><stop offset="1" stopColor="#b8860b" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#g165s)" />
    <path d="M0 0H22Q14 60 24 124H0ZM120 0H98Q106 60 96 124H120Z" fill="url(#g165c)" /><path d="M8 0Q4 64 12 124M112 0Q116 64 108 124" stroke="#4a0a20" strokeWidth="2" fill="none" />
    <path d="M0 0H120V12Q90 22 60 14Q30 22 0 12Z" fill="#a23b72" /><path d="M0 12Q30 22 60 14Q90 22 120 12" stroke="#ffd60a" strokeWidth="1.2" fill="none" />
    <polygon points="52,0 68,0 98,124 22,124" fill="url(#g165l)" />
    <rect y="124" width="120" height="36" fill="#6d2e46" /><rect y="120" width="120" height="6" fill="#8b3a62" /><g stroke="#4a1f30" strokeWidth=".7">{[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M${i * 22} 126l-4 34`} />)}</g>
    <ellipse cx="60" cy="122" rx="30" ry="4" fill="#fff6c8" opacity=".25" />
    <path d="M44 68H76Q76 96 60 98Q44 96 44 68Z" fill="url(#g165t)" /><path d="M44 72q-12 0-10 12q2 7 12 5M76 72q12 0 10 12q-2 7-12 5" stroke="url(#g165t)" strokeWidth="2.6" fill="none" />
    <path d="M48 72q4 14 10 20" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".6" /><path d="M60 76l1.4 3 3 .4-2.2 2 .6 3-2.8-1.6-2.8 1.6.6-3-2.2-2 3-.4z" fill="#fff8c8" />
    <rect x="56.6" y="98" width="6.8" height="10" fill="url(#g165t)" /><rect x="50" y="108" width="20" height="5" rx="1" fill="#bc6c25" /><rect x="46" y="113" width="28" height="8" rx="1" fill="#6b4226" /><rect x="52" y="115" width="16" height="3" fill="#ffd60a" opacity=".7" />
    <g fill="#fff8c8">{[[36, 60], [86, 54], [40, 90], [84, 92]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 2.4}l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z`} />)}</g>
    <g stroke="#3d314a" strokeWidth="2" fill="none"><path d="M86 120v-14h10v14M86 112h10" /></g><path d="M84 104h14" stroke="#3d314a" strokeWidth="3" />
    <g fill="#ffd60a" opacity=".7"><rect x="30" y="130" width="3" height="1.4" transform="rotate(30 31 131)" /><rect x="76" y="140" width="3" height="1.4" transform="rotate(-20 77 141)" /><rect x="96" y="134" width="3" height="1.4" /></g>
  </Svg>],

  [167, 'ดอกไม้งอกจากจอแตก', <Svg>
    <defs>
      <linearGradient id="g167s" x2="0" y2="1"><stop stopColor="#f8f9fa" /><stop offset="1" stopColor="#dee2e6" /></linearGradient>
      <linearGradient id="g167p" x2="1" y2="1"><stop stopColor="#343a40" /><stop offset="1" stopColor="#111" /></linearGradient>
      <linearGradient id="g167d" x2="1" y2="1"><stop stopColor="#2b2d42" /><stop offset="1" stopColor="#14141f" /></linearGradient>
      <radialGradient id="g167g"><stop stopColor="#fff3b0" stopOpacity=".6" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#g167s)" />
    <rect y="140" width="120" height="20" fill="#ced4da" />
    <ellipse cx="62" cy="142" rx="34" ry="3" fill="#868e96" opacity=".4" />
    <rect x="30" y="18" width="62" height="122" rx="9" fill="url(#g167p)" /><rect x="34" y="26" width="54" height="104" rx="2" fill="url(#g167d)" /><rect x="54" y="21" width="14" height="2" rx="1" fill="#495057" /><rect x="52" y="133" width="18" height="2.4" rx="1.2" fill="#6c757d" />
    <path d="M30 26Q32 20 40 18" stroke="#6c757d" strokeWidth=".8" fill="none" />
    <g stroke="#adb5bd" strokeWidth=".7" fill="none"><path d="M62 82L44 60L36 64M62 82L82 56L88 70M62 82L40 104M62 82L86 108M62 82L60 30M44 60L52 44M82 56L74 40M40 104L36 120M86 108L80 126" /></g>
    <g stroke="#fff" strokeWidth=".4" opacity=".6" fill="none"><path d="M52 72l6 4M70 70l-4 6M56 96l4-6" /></g>
    <circle cx="62" cy="64" r="22" fill="url(#g167g)" />
    <path d="M62 82Q60 64 64 50" stroke="#55a630" strokeWidth="2.2" fill="none" /><path d="M62 72q-10-6-13 2q7 3 13-2zM63 64q10-6 13 1q-7 3-13-1z" fill="#80b918" /><path d="M62 72q-6-2-11 1M63 64q6-2 11 0" stroke="#55a630" strokeWidth=".5" fill="none" />
    {[0, 60, 120, 180, 240, 300].map(a => <ellipse key={a} cx="64" cy="42" rx="3.4" ry="5.6" fill="#ff70a6" transform={`rotate(${a} 64 47)`} />)}<circle cx="64" cy="47" r="3.4" fill="#ffd60a" /><circle cx="63" cy="46" r="1" fill="#fff" />
    <g fill="#fff">{[[40, 34], [80, 40], [46, 120]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 2}l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z`} />)}</g>
    <g fill="#adb5bd" opacity=".7"><path d="M96 140l4-2 2 3-4 1z" /><path d="M24 138l3-1 1 2z" /></g>
  </Svg>],
];
