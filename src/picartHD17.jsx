// ภาพการ์ดแบบละเอียด ชุด 17 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;

export const HD17 = [
  [114, 'ใยแมงมุมกับหยดน้ำค้าง', <Svg>
    <defs>
      <radialGradient id="b114s" cx=".5" cy=".45"><stop stopColor="#4a4e69" /><stop offset="1" stopColor="#14141f" /></radialGradient>
      <radialGradient id="b114d" cx=".35" cy=".3"><stop stopColor="#fff" /><stop offset=".5" stopColor="#bde0fe" /><stop offset="1" stopColor="#5a7aa0" /></radialGradient>
      <radialGradient id="b114m" cx=".2" cy=".1"><stop stopColor="#ffd6a5" stopOpacity=".5" /><stop offset="1" stopColor="#ffd6a5" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#b114s)" /><rect width="120" height="160" fill="url(#b114m)" />
    <path d="M0 0Q20 30 4 70M120 10Q100 40 116 90" stroke="#2b2b3a" strokeWidth="4" fill="none" /><g fill="#3a5a40">{[[8, 40], [110, 60], [4, 60]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="5" ry="2.4" transform={`rotate(${i * 50} ${x} ${y})`} />)}</g>
    <g stroke="#e9ecef" strokeWidth=".6" fill="none" opacity=".85">
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1="60" y1="76" x2={60 + 72 * Math.cos(i * .5236)} y2={76 + 72 * Math.sin(i * .5236)} />)}
      {[8, 14, 20, 27, 34, 41, 48, 55].map(r => <path key={r} d={Array.from({ length: 13 }, (_, i) => `${i ? 'Q' + (60 + r * .92 * Math.cos((i - .5) * .5236)) + ' ' + (76 + r * .92 * Math.sin((i - .5) * .5236)) + ' ' : 'M'}${60 + r * Math.cos(i * .5236)} ${76 + r * Math.sin(i * .5236)}`).join(' ')} />)}
    </g>
    {[[80, 64, 2.4], [44, 92, 2], [60, 50, 1.8], [94, 94, 2.2], [32, 64, 1.6], [70, 112, 2.4], [26, 100, 1.4], [86, 44, 1.4], [52, 120, 1.6], [100, 74, 1.4]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="url(#b114d)" />)}
    <g fill="#fff">{[[79.2, 63.2], [43.4, 91.4], [93.4, 93.4], [69.2, 111.2]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".6" />)}</g>
    <g transform="translate(60 76)"><ellipse cx="0" cy="3" rx="4.4" ry="5.4" fill="#111" /><circle cx="0" cy="-3" r="3" fill="#111" /><g stroke="#111" strokeWidth=".9" fill="none">{[-1, 1].map(s => <g key={s}><path d={`M${s * 2}-2l${s * 6}-5l${s * 2}-4`} /><path d={`M${s * 3} 0l${s * 7}-1l${s * 2}-4`} /><path d={`M${s * 3} 3l${s * 7} 3l${s * 2} 4`} /><path d={`M${s * 2} 6l${s * 5} 6l${s * 1} 4`} /></g>)}</g><circle cx="-1" cy="-3.6" r=".6" fill="#e63946" /><circle cx="1" cy="-3.6" r=".6" fill="#e63946" /><path d="M-2 2q2 2 4 0" stroke="#e63946" strokeWidth=".5" fill="none" /></g>
  </Svg>],

  [115, 'ภูเขาคัพเค้ก', <Svg>
    <defs>
      <linearGradient id="b115s" x2="0" y2="1"><stop stopColor="#bde0fe" /><stop offset="1" stopColor="#ffc8dd" /></linearGradient>
      <linearGradient id="b115c" x2="1" y2="0"><stop stopColor="#a594c4" /><stop offset=".5" stopColor="#cdb4db" /><stop offset="1" stopColor="#9d8ec4" /></linearGradient>
      <radialGradient id="b115f" cx=".4" cy=".3"><stop stopColor="#fff" /><stop offset="1" stopColor="#f1e3f3" /></radialGradient>
      <radialGradient id="b115r" cx=".35" cy=".3"><stop stopColor="#ff6b6b" /><stop offset="1" stopColor="#9d0208" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#b115s)" />
    <g fill="#fff" opacity=".8"><ellipse cx="20" cy="30" rx="14" ry="4" /><ellipse cx="100" cy="24" rx="12" ry="3.4" /></g>
    <path d="M8 160L22 108H98L112 160Z" fill="url(#b115c)" /><g stroke="#8a7ab0" strokeWidth="1.6">{[30, 44, 58, 72, 86].map(x => <line key={x} x1={x} y1="110" x2={x - (60 - x) * .2} y2="160" />)}</g>
    <path d="M12 112Q8 90 30 88Q30 66 52 66Q56 42 72 46Q92 50 88 74Q108 78 106 98Q110 112 100 112Z" fill="url(#b115f)" />
    <path d="M30 88q10 6 22 0M52 66q10 6 20 0M88 74q-6 8-16 6M20 104q12 4 24 0M70 100q12 4 24 0" stroke="#ffc8dd" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <g>{[[36, 80, 30, '#ffd166'], [76, 92, 0, '#06d6a0'], [58, 98, -40, '#ef476f'], [44, 100, 70, '#118ab2'], [88, 86, 20, '#ffd166'], [64, 78, -10, '#06d6a0'], [26, 96, 50, '#ef476f']].map(([x, y, r, c], i) => <rect key={i} x={x - 2.4} y={y - .8} width="4.8" height="1.6" rx=".8" fill={c} transform={`rotate(${r} ${x} ${y})`} />)}</g>
    <circle cx="68" cy="40" r="8" fill="url(#b115r)" /><circle cx="65.4" cy="37.4" r="2" fill="#fff" opacity=".5" /><path d="M68 32q2-8 8-8" stroke="#2d6a4f" strokeWidth="1.2" fill="none" /><path d="M72 26q4-2 6 0q-2 3-6 0z" fill="#55a630" />
    <g transform="translate(44 84) rotate(-34)"><path d="M-8 3H8" stroke="#e63946" strokeWidth="1.6" strokeLinecap="round" /><circle cx="0" cy="-2" r="2.2" fill="#3a2a1a" /><path d="M-1.6 0h3.2l.4 2h-4z" fill="#4361ee" /><path d="M2 -1l4-3" stroke="#6c757d" strokeWidth=".7" /></g>
    <path d="M42 86Q48 90 56 96" stroke="#e9ecef" strokeWidth=".6" strokeDasharray="1.4 1.6" fill="none" />
  </Svg>],

  [116, 'บันไดเลื่อนสู่ความมืด', <Svg>
    <defs>
      <linearGradient id="b116s" x2="0" y2="1"><stop stopColor="#000" /><stop offset="1" stopColor="#1a1d24" /></linearGradient>
      <linearGradient id="b116e" x2="0" y2="1"><stop stopColor="#1a1a1a" /><stop offset="1" stopColor="#4a4a4a" /></linearGradient>
      <linearGradient id="b116f" x2="0" y2="1"><stop stopColor="#000" /><stop offset=".4" stopColor="#000" stopOpacity=".85" /><stop offset="1" stopColor="#000" stopOpacity="0" /></linearGradient>
      <linearGradient id="b116r" x2="0" y2="1"><stop stopColor="#5a0a0d" /><stop offset="1" stopColor="#ba181b" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#b116s)" />
    <g fill="#14161b"><path d="M0 160V90L18 60V160ZM120 160V80L100 50V160Z" /></g>
    <polygon points="20,160 68,40 96,40 62,160" fill="url(#b116e)" />
    {Array.from({ length: 14 }, (_, i) => <g key={i}><line x1={23 + i * 3.6} y1={152 - i * 8.6} x2={61 + i * 2.5} y2={152 - i * 8.6} stroke="#2b2b2b" strokeWidth="1.6" /><line x1={23 + i * 3.6} y1={151 - i * 8.6} x2={61 + i * 2.5} y2={151 - i * 8.6} stroke="#6c757d" strokeWidth=".5" /></g>)}
    <path d="M16 160L66 40M60 160L98 40" stroke="url(#b116r)" strokeWidth="3.4" strokeLinecap="round" />
    <path d="M10 160L12 150L62 32M66 160L72 150L104 34" stroke="#adb5bd" strokeWidth=".8" fill="none" opacity=".5" />
    <rect width="120" height="80" fill="url(#b116f)" />
    <g fill="#e5383b"><ellipse cx="76" cy="34" rx="1.4" ry=".9" /><ellipse cx="82" cy="34" rx="1.4" ry=".9" /></g><g fill="#e5383b" opacity=".4"><ellipse cx="40" cy="18" rx="1" ry=".6" /><ellipse cx="44" cy="18" rx="1" ry=".6" /></g>
    <g transform="translate(44 112)"><circle cx="0" cy="-9" r="3" fill="#d3d3d3" /><path d="M-2.6-6h5.2l1 10h-7.2z" fill="#adb5bd" /><path d="M-1 4l-1 5M1.6 4l1 5" stroke="#adb5bd" strokeWidth="1.4" /><path d="M2.6-4l5-3" stroke="#adb5bd" strokeWidth="1.2" strokeLinecap="round" /></g>
    <ellipse cx="44" cy="122" rx="5" ry="1.4" fill="#000" opacity=".5" />
  </Svg>],

  [117, 'รถเข็นขายของกลางคืน', <Svg>
    <defs>
      <linearGradient id="b117s" x2="0" y2="1"><stop stopColor="#10002b" /><stop offset="1" stopColor="#3c096c" /></linearGradient>
      <radialGradient id="b117l"><stop stopColor="#ffd166" stopOpacity=".55" /><stop offset="1" stopColor="#ffd166" stopOpacity="0" /></radialGradient>
      <radialGradient id="b117r"><stop stopColor="#ff4d6d" stopOpacity=".55" /><stop offset="1" stopColor="#ff4d6d" stopOpacity="0" /></radialGradient>
      <linearGradient id="b117c" x2="0" y2="1"><stop stopColor="#2a9d8f" /><stop offset="1" stopColor="#1d6b62" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#b117s)" />
    <g fill="#1a0033"><rect x="0" y="40" width="20" height="100" /><rect x="100" y="34" width="20" height="106" /></g>
    <path d="M0 20Q60 38 120 26" stroke="#555" strokeWidth=".7" fill="none" />
    {[[10, 23, 'r'], [30, 27, 'l'], [50, 30, 'r'], [70, 30, 'l'], [90, 29, 'r'], [110, 26, 'l']].map(([x, y, k], i) => <g key={i}><circle cx={x} cy={y + 7} r="12" fill={`url(#b117${k})`} /><line x1={x} y1={y} x2={x} y2={y + 2} stroke="#555" /><ellipse cx={x} cy={y + 7} rx="4.6" ry="5.6" fill={k === 'r' ? '#e63946' : '#ffd60a'} /><path d={`M${x - 4.6} ${y + 7}h9.2`} stroke="#000" strokeWidth=".4" opacity=".4" /><rect x={x - 2} y={y + 12} width="4" height="1.6" fill="#3a2a1a" /></g>)}
    <rect y="132" width="120" height="28" fill="#1d1d2a" /><g fill="#ffd166" opacity=".25"><ellipse cx="60" cy="140" rx="40" ry="5" /></g>
    <rect x="20" y="82" width="80" height="42" rx="3" fill="url(#b117c)" /><path d="M24 92h72" stroke="#e9c46a" strokeWidth="1.2" /><rect x="20" y="72" width="80" height="10" fill="#e9c46a" /><path d="M16 72L28 58H92L104 72Z" fill="#e76f51" /><path d="M28 58l-4 14M40 58l-2 14M52 58v14M64 58v14M76 58l2 14M88 58l4 14" stroke="#c44536" strokeWidth=".7" />
    <path d="M16 72q6 4 11 0q6 4 11 0q6 4 11 0q6 4 11 0q6 4 11 0q6 4 11 0q6 4 11 0q6 4 11 0" fill="#e76f51" />
    <circle cx="34" cy="128" r="8" fill="#212529" /><circle cx="86" cy="128" r="8" fill="#212529" /><circle cx="34" cy="128" r="3" fill="#868e96" /><circle cx="86" cy="128" r="3" fill="#868e96" />
    <path d="M38 72q0-8 6-8h10q6 0 6 8z" fill="#adb5bd" /><path d="M44 62q2-6 0-10M50 62q2-6 0-10M56 62q2-6 0-10" stroke="#fff" strokeWidth=".7" fill="none" opacity=".6" />
    <g fill="#f4a261"><rect x="66" y="66" width="3" height="6" /><rect x="71" y="64" width="3" height="8" /><rect x="76" y="66" width="3" height="6" /></g><g fill="#c44536">{[67.5, 72.5, 77.5].map(x => <circle key={x} cx={x} cy="64" r="1.6" />)}</g>
    <circle cx="60" cy="80" r="40" fill="url(#b117l)" />
    <g transform="translate(104 116)"><circle cx="0" cy="-12" r="3.4" fill="#f1c27d" /><path d="M-3-9h6l1 12h-8z" fill="#ffd166" /><path d="M-4-14q4-4 8 0z" fill="#e63946" /></g>
  </Svg>],

  [119, 'โคมลอยเหนือแม่น้ำ', <Svg>
    <defs>
      <linearGradient id="b119s" x2="0" y2="1"><stop stopColor="#03045e" /><stop offset=".7" stopColor="#240046" /><stop offset="1" stopColor="#3c096c" /></linearGradient>
      <radialGradient id="b119g"><stop stopColor="#ffb703" stopOpacity=".55" /><stop offset="1" stopColor="#ffb703" stopOpacity="0" /></radialGradient>
      <linearGradient id="b119l" x2="0" y2="1"><stop stopColor="#ffe8a3" /><stop offset="1" stopColor="#fb8500" /></linearGradient>
      <linearGradient id="b119w" x2="0" y2="1"><stop stopColor="#14104a" /><stop offset="1" stopColor="#05041e" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#b119s)" />
    <St p={[8, 10, .6, 26, 30, .5, 70, 8, .7, 104, 22, .6, 18, 60, .5, 90, 50, .4, 112, 80, .4]} />
    {[[40, 40, 1.4], [80, 62, 1.1], [24, 82, .9], [100, 32, .8], [64, 98, .7], [52, 18, .55], [92, 92, .5], [12, 46, .5]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><circle r="18" fill="url(#b119g)" /><path d="M-7-10H7L5 8H-5Z" fill="url(#b119l)" /><path d="M-7-10H7" stroke="#fff3c4" strokeWidth=".8" /><path d="M-3-10l-1 18M3-10l1 18" stroke="#fb8500" strokeWidth=".5" opacity=".6" /><rect x="-3" y="7" width="6" height="2" fill="#6b4226" /><circle cy="9" r="1.4" fill="#fff3c4" /></g>)}
    <rect y="116" width="120" height="44" fill="url(#b119w)" /><g stroke="#2b2b6b" strokeWidth=".8" fill="none">{[0, 1, 2].map(i => <path key={i} d={`M0 ${120 + i * 10}q10-3 20 0t20 0t20 0t20 0t20 0t20 0`} />)}</g>
    <g fill="#ffb703" opacity=".45">{[[40, 124, 12], [80, 132, 8], [24, 140, 6], [64, 148, 6], [100, 126, 4]].map(([x, y, w], i) => <rect key={i} x={x - w / 2} y={y} width={w} height="1.6" rx=".8" />)}</g>
    <path d="M0 116L18 106L26 112L34 116ZM86 116L102 102L112 108L120 104V116Z" fill="#000" />
    <path d="M100 102v-10l4 6M104 98h8" stroke="#000" strokeWidth="1.4" fill="none" />
    <g transform="translate(60 118)"><path d="M-10 0H10L6 4H-6Z" fill="#000" /><circle cx="-2" cy="-4" r="1.6" fill="#000" /><circle cx="3" cy="-4" r="1.6" fill="#000" /><path d="M-3-2v2M2-2v2" stroke="#000" strokeWidth="1.6" /></g>
  </Svg>],

  [120, 'กบนั่งสมาธิบนใบบัว', <Svg>
    <defs>
      <linearGradient id="b120s" x2="0" y2="1"><stop stopColor="#d8f3dc" /><stop offset="1" stopColor="#74c69d" /></linearGradient>
      <radialGradient id="b120p" cx=".5" cy=".5"><stop stopColor="#95d5b2" /><stop offset="1" stopColor="#2d6a4f" /></radialGradient>
      <radialGradient id="b120f" cx=".4" cy=".3"><stop stopColor="#b5e48c" /><stop offset="1" stopColor="#55a630" /></radialGradient>
      <radialGradient id="b120g"><stop stopColor="#fff" stopOpacity=".6" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      <linearGradient id="b120l" x2="0" y2="1"><stop stopColor="#ffe5ec" /><stop offset="1" stopColor="#ff8fab" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#b120s)" />
    <rect y="96" width="120" height="64" fill="#40916c" opacity=".55" /><g stroke="#b7e4c7" strokeWidth=".7" fill="none" opacity=".6"><ellipse cx="60" cy="126" rx="50" ry="10" /><ellipse cx="60" cy="126" rx="36" ry="7" /></g>
    <path d="M12 126A48 14 0 1 0 108 126A48 14 0 0 0 64 112L60 126Z" fill="url(#b120p)" /><g stroke="#1b4332" strokeWidth=".6" opacity=".6">{[0, 1, 2, 3, 4, 5, 6].map(i => <line key={i} x1="60" y1="126" x2={60 + 46 * Math.cos(i * .9 + .4)} y2={126 + 13 * Math.sin(i * .9 + .4)} />)}</g>
    <g transform="translate(96 108)">{[[-18, -6], [0, -8], [18, -6], [-10, -2], [10, -2]].map(([r, l], i) => <path key={i} d={`M0 0q-6 ${l - 6} 0 ${l * 2 - 4}q6 ${-l + 2} 0 ${-l * 2 + 4}z`} fill="url(#b120l)" transform={`rotate(${r})`} />)}<circle cy="-4" r="2.4" fill="#ffd166" /></g>
    <circle cx="52" cy="84" r="36" fill="url(#b120g)" />
    <ellipse cx="52" cy="112" rx="19" ry="11" fill="url(#b120f)" /><ellipse cx="52" cy="114" rx="11" ry="6" fill="#e9f5db" />
    <circle cx="52" cy="94" r="12.6" fill="url(#b120f)" /><circle cx="44" cy="85" r="5.6" fill="url(#b120f)" /><circle cx="60" cy="85" r="5.6" fill="url(#b120f)" />
    <path d="M41 85q3 2 6 0M57 85q3 2 6 0" stroke="#1b4332" fill="none" strokeWidth="1.3" strokeLinecap="round" /><path d="M46 99q6 3 12 0" stroke="#1b4332" fill="none" strokeWidth=".9" />
    <circle cx="42" cy="96" r="2" fill="#ff8fa3" opacity=".5" /><circle cx="62" cy="96" r="2" fill="#ff8fa3" opacity=".5" />
    <path d="M36 112q-9 0-7 9h13M68 112q9 0 7 9h-13" stroke="url(#b120f)" strokeWidth="4.4" fill="none" strokeLinecap="round" />
    <path d="M40 104q-6 2-6 8M64 104q6 2 6 8" stroke="url(#b120f)" strokeWidth="3.4" fill="none" strokeLinecap="round" /><circle cx="34" cy="113" r="2" fill="#80b918" /><circle cx="70" cy="113" r="2" fill="#80b918" />
    <g fill="#fff" opacity=".8">{[[30, 60], [74, 58], [52, 52]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 2}l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z`} />)}</g>
    <g transform="translate(20 70)"><ellipse rx="3" ry="1.4" fill="#4361ee" opacity=".8" /><path d="M-1-1l-3-3M1-1l3-3" stroke="#4361ee" strokeWidth=".6" /></g>
  </Svg>],

  [122, 'ยายถักเสื้อให้แมว', <Svg>
    <defs>
      <linearGradient id="b122s" x2="0" y2="1"><stop stopColor="#fff1e6" /><stop offset="1" stopColor="#fde2e4" /></linearGradient>
      <radialGradient id="b122l" cx=".85" cy=".1"><stop stopColor="#ffd6a5" stopOpacity=".7" /><stop offset="1" stopColor="#ffd6a5" stopOpacity="0" /></radialGradient>
      <linearGradient id="b122c" x2="0" y2="1"><stop stopColor="#8a6e9a" /><stop offset="1" stopColor="#5a4470" /></linearGradient>
      <radialGradient id="b122k" cx=".4" cy=".3"><stop stopColor="#ffc078" /><stop offset="1" stopColor="#e07a3a" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#b122s)" /><rect width="120" height="160" fill="url(#b122l)" />
    <g fill="#f8c8d4" opacity=".6">{Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${12 + (i % 5) * 24} ${20 + (i / 5 | 0) * 36}l2 3-2 3-2-3z`} />)}</g>
    <rect x="84" y="10" width="30" height="40" fill="#cfe8ff" /><path d="M99 10v40M84 30h30" stroke="#d4a373" strokeWidth="2" />
    <rect y="124" width="120" height="36" fill="#d4a373" /><path d="M0 124h120" stroke="#e9c49a" strokeWidth="1.5" /><ellipse cx="62" cy="134" rx="44" ry="6" fill="#e5989b" opacity=".6" />
    <path d="M10 126V84Q10 72 22 72H58Q70 72 70 84V126Z" fill="url(#b122c)" /><rect x="4" y="96" width="12" height="30" rx="5" fill="#6d597a" /><rect x="64" y="96" width="12" height="30" rx="5" fill="#6d597a" />
    <path d="M18 124Q16 92 40 88Q58 88 62 108L64 124Z" fill="#a4607a" /><path d="M24 124Q24 104 40 100" stroke="#c97a96" strokeWidth=".8" fill="none" />
    <circle cx="40" cy="72" r="11" fill="#f1d3c4" /><path d="M29 70a11 11 0 0 1 22-2q-6-6-11-6q-9 0-11 8z" fill="#e9ecef" /><circle cx="40" cy="60" r="5" fill="#e9ecef" /><circle cx="40" cy="60" r="2.6" fill="#dee2e6" />
    <circle cx="36" cy="72" r="2.8" fill="none" stroke="#6c757d" strokeWidth=".9" /><circle cx="44" cy="72" r="2.8" fill="none" stroke="#6c757d" strokeWidth=".9" /><path d="M38.8 72h2.4" stroke="#6c757d" strokeWidth=".9" /><g fill="#333"><circle cx="36" cy="72.4" r=".8" /><circle cx="44" cy="72.4" r=".8" /></g>
    <path d="M37 78q3 2 6 0" stroke="#a24a3a" strokeWidth=".8" fill="none" /><circle cx="33" cy="76" r="1.6" fill="#ff8fa3" opacity=".5" /><circle cx="47" cy="76" r="1.6" fill="#ff8fa3" opacity=".5" />
    <path d="M50 102L78 92M52 106L80 98" stroke="#adb5bd" strokeWidth="1.4" strokeLinecap="round" /><circle cx="78" cy="92" r="1.2" fill="#adb5bd" /><circle cx="80" cy="98" r="1.2" fill="#adb5bd" />
    <path d="M56 98h16v14h-16z" fill="#e63946" /><g stroke="#c1121f" strokeWidth=".6">{[100, 104, 108].map(y => <path key={y} d={`M56 ${y}h16`} />)}{[60, 64, 68].map(x => <path key={x} d={`M${x} 98v14`} />)}</g>
    <path d="M44 100l8 2M44 104l10 4" stroke="#f1d3c4" strokeWidth="3" strokeLinecap="round" />
    <g><ellipse cx="96" cy="118" rx="13" ry="9" fill="url(#b122k)" /><circle cx="92" cy="103" r="7.4" fill="url(#b122k)" /><polygon points="86,100 87,92 91,98" fill="#e07a3a" /><polygon points="98,100 97,92 93,98" fill="#e07a3a" /><polygon points="87,99 87.4,95 89.4,98" fill="#ffafcc" />
      <path d="M86 112h18v8h-18z" fill="#e63946" opacity=".95" /><g stroke="#c1121f" strokeWidth=".5"><path d="M86 115h18M86 118h18" /></g>
      <circle cx="90" cy="103" r="1.1" fill="#222" /><circle cx="95" cy="103" r="1.1" fill="#222" /><path d="M92 106l.6.6.6-.6" stroke="#222" strokeWidth=".6" fill="none" /><path d="M108 120q8 0 6-10" stroke="url(#b122k)" strokeWidth="3" fill="none" strokeLinecap="round" /></g>
    <circle cx="20" cy="140" r="7.4" fill="#e63946" /><path d="M15 137q5 3 10 0M16 142q4 2 8 0" stroke="#ff8fa3" fill="none" /><path d="M20 140Q48 152 62 112" stroke="#e63946" fill="none" />
    <circle cx="38" cy="148" r="5" fill="#ffd166" /><path d="M34 146q4 2 8 0" stroke="#fff" fill="none" opacity=".6" />
  </Svg>],

  [123, 'กุญแจกับแม่กุญแจหัวใจ', <Svg>
    <defs>
      <radialGradient id="b123s" cx=".5" cy=".45"><stop stopColor="#7209b7" /><stop offset="1" stopColor="#240046" /></radialGradient>
      <linearGradient id="b123h" x2="1" y2="1"><stop stopColor="#ff8fc7" /><stop offset=".5" stopColor="#f72585" /><stop offset="1" stopColor="#a4133c" /></linearGradient>
      <linearGradient id="b123m" x2="1" y2="0"><stop stopColor="#6c757d" /><stop offset=".5" stopColor="#e9ecef" /><stop offset="1" stopColor="#6c757d" /></linearGradient>
      <linearGradient id="b123k" x2="1" y2="1"><stop stopColor="#fff1a8" /><stop offset=".5" stopColor="#ffd60a" /><stop offset="1" stopColor="#c99700" /></linearGradient>
      <radialGradient id="b123g"><stop stopColor="#f72585" stopOpacity=".5" /><stop offset="1" stopColor="#f72585" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#b123s)" />
    <g fill="#f72585" opacity=".6">{[[12, 16], [104, 22], [20, 140], [100, 132], [60, 10]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 3}l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z`} />)}</g>
    <circle cx="60" cy="84" r="46" fill="url(#b123g)" />
    <path d="M42 66V50a18 18 0 0 1 36 0V66" stroke="url(#b123m)" strokeWidth="7" fill="none" /><path d="M42 66V50a18 18 0 0 1 36 0" stroke="#fff" strokeWidth="1" fill="none" opacity=".4" />
    <path d="M60 120L28 88A17 17 0 0 1 60 66A17 17 0 0 1 92 88Z" fill="url(#b123h)" />
    <path d="M36 80A12 12 0 0 1 54 72" stroke="#ffc2e0" strokeWidth="2" fill="none" opacity=".7" strokeLinecap="round" />
    <circle cx="60" cy="88" r="5" fill="#3a0ca3" /><path d="M57.4 90h5.2l1.4 12h-8z" fill="#3a0ca3" /><circle cx="60" cy="88" r="7" fill="none" stroke="#ffd60a" strokeWidth="1" />
    <g fill="#ffd60a">{[[44, 96], [76, 96], [60, 112]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" />)}</g>
    <g transform="rotate(-30 92 134)"><circle cx="76" cy="134" r="8" fill="url(#b123k)" /><circle cx="76" cy="134" r="3.4" fill="#560bad" /><path d="M70 130q4-4 8-2" stroke="#fff" strokeWidth=".8" fill="none" opacity=".7" /><rect x="83" y="132" width="26" height="4.4" rx="1" fill="url(#b123k)" /><rect x="100" y="136" width="3.4" height="6" fill="url(#b123k)" /><rect x="105" y="136" width="3.4" height="4" fill="url(#b123k)" /></g>
    <path d="M90 126Q80 120 72 112" stroke="#ffd60a" strokeWidth=".6" strokeDasharray="1.4 2" fill="none" />
  </Svg>],
];
