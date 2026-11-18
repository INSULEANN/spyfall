// ภาพการ์ดแบบละเอียด ชุด 24 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD24 = [
  [177, 'ป้อมหมอนกับไฟฉาย', <Svg>
    <defs>
      <linearGradient id="i177s" x2="0" y2="1"><stop stopColor="#14112a" /><stop offset="1" stopColor="#3a345a" /></linearGradient>
      <linearGradient id="i177b" x2="0" y2="1"><stop stopColor="#ffb4a2" /><stop offset="1" stopColor="#e5989b" /></linearGradient>
      <radialGradient id="i177g" cx=".5" cy=".8"><stop stopColor="#fff3b0" stopOpacity=".9" /><stop offset=".5" stopColor="#ffe8a3" stopOpacity=".35" /><stop offset="1" stopColor="#ffe8a3" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#i177s)" />
    <rect x="84" y="12" width="28" height="36" fill="#0d0b1e" /><path d="M98 12v36M84 30h28" stroke="#2a2648" strokeWidth="1.4" /><circle cx="104" cy="22" r="3.4" fill="#fff4c2" opacity=".7" /><St p={[90, 18, .5, 96, 40, .4, 108, 36, .5]} />
    <rect y="124" width="120" height="36" fill="#4a4e69" /><g stroke="#3a3e59" strokeWidth=".8">{[0, 1, 2, 3, 4].map(i => <path key={i} d={`M${i * 28} 124l-6 36`} />)}</g>
    <path d="M8 126L30 66H90L112 126Z" fill="url(#i177b)" /><path d="M30 66H90" stroke="#b5838d" strokeWidth="3" /><g stroke="#e07a5f" strokeWidth=".8" opacity=".5">{[0, 1, 2, 3].map(i => <path key={i} d={`M${20 + i * 2} ${96 + i * 8}h${80 - i * 4}`} />)}</g>
    <path d="M42 126Q60 86 78 126Z" fill="#fff3b0" /><circle cx="60" cy="114" r="36" fill="url(#i177g)" />
    {[[14, 116, '#ffb4a2'], [106, 116, '#cdb4db'], [30, 60, '#a2d2ff'], [90, 60, '#ffc8dd'], [60, 56, '#bde0fe'], [20, 96, '#ffafcc'], [100, 96, '#caffbf']].map(([x, y, c], i) => <g key={i}><rect x={x - 12} y={y - 8} width="24" height="16" rx="6" fill={c} /><path d={`M${x - 8} ${y}h16`} stroke="#fff" strokeWidth=".7" strokeDasharray="1.4 1.4" opacity=".7" /></g>)}
    <g fill="#2a1c30"><circle cx="54" cy="112" r="4.4" /><circle cx="66" cy="114" r="3.8" /><path d="M48 126q0-8 6-8t6 8zM61 126q0-7 5-7t5 7z" /></g>
    <g fill="#ffd166"><circle cx="54" cy="112" r=".9" /></g>
    <g transform="translate(72 100) rotate(-30)"><rect x="-2" y="0" width="4" height="10" rx="1" fill="#6c757d" /><path d="M-3 0h6l2-4h-10z" fill="#adb5bd" /></g>
  </Svg>],

  [178, 'ไม้ขีดก้านเดียวที่จุด', <Svg>
    <defs>
      <linearGradient id="i178s" x2="0" y2="1"><stop stopColor="#0b0907" /><stop offset="1" stopColor="#231c18" /></linearGradient>
      <radialGradient id="i178g" cx=".8" cy=".42"><stop stopColor="#ffb347" stopOpacity=".55" /><stop offset=".5" stopColor="#f48c06" stopOpacity=".15" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
      <linearGradient id="i178w" x2="1" y2="0"><stop stopColor="#c9935a" /><stop offset=".5" stopColor="#e9c48a" /><stop offset="1" stopColor="#b07a42" /></linearGradient>
      <radialGradient id="i178h" cx=".4" cy=".3"><stop stopColor="#e5383b" /><stop offset="1" stopColor="#6a040f" /></radialGradient>
      <linearGradient id="i178f" x2="0" y2="1"><stop stopColor="#fff3c4" /><stop offset=".4" stopColor="#ffb703" /><stop offset="1" stopColor="#e85d04" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#i178s)" /><rect width="120" height="160" fill="url(#i178g)" />
    <rect y="120" width="120" height="40" fill="#2a2522" /><path d="M0 120h120" stroke="#4a3f38" strokeWidth="1.2" />
    <ellipse cx="50" cy="122" rx="40" ry="3" fill="#000" opacity=".5" />
    {[14, 26, 38, 50, 62, 74].map((x, i) => <g key={i}><rect x={x} y="84" width="3.4" height="36" fill="url(#i178w)" /><ellipse cx={x + 1.7} cy="83" rx="3" ry="4.4" fill="url(#i178h)" /><ellipse cx={x + .8} cy="81.6" rx=".8" ry="1.2" fill="#ff8fa3" opacity=".6" /></g>)}
    <g fill="#f48c06" opacity=".25">{[14, 26, 38, 50, 62, 74].map((x, i) => <rect key={i} x={x + 2.4} y="86" width="1" height="32" />)}</g>
    <g transform="rotate(14 98 120)"><rect x="96" y="84" width="3.4" height="36" fill="url(#i178w)" /><rect x="96" y="80" width="3.4" height="12" fill="#1b1410" /><ellipse cx="97.7" cy="80" rx="3" ry="3.4" fill="#1b1410" />
      <path d="M97.7 50q-10 14 0 28q10-14 0-28z" fill="url(#i178f)" /><path d="M97.7 62q-4 7 0 13q4-6 0-13z" fill="#fffbe0" /><path d="M97.7 72q-1.4 3 0 5q1.4-2 0-5z" fill="#4cc9f0" opacity=".7" /></g>
    <g fill="#ffb703">{[[100, 40], [106, 30], [94, 26], [102, 18]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1 - i * .2} />)}</g>
    <path d="M100 46q-4-8 2-14q-4-6 2-12" stroke="#adb5bd" strokeWidth=".7" fill="none" opacity=".3" />
  </Svg>],

  [179, 'ตุ๊กตาหิมะในแก้วโกโก้', <Svg>
    <defs>
      <linearGradient id="i179s" x2="0" y2="1"><stop stopColor="#e3d5ca" /><stop offset="1" stopColor="#d5bdaf" /></linearGradient>
      <linearGradient id="i179m" x2="1" y2="0"><stop stopColor="#9d0208" /><stop offset=".45" stopColor="#e63946" /><stop offset="1" stopColor="#6a040f" /></linearGradient>
      <radialGradient id="i179c" cx=".5" cy=".4"><stop stopColor="#a0682f" /><stop offset="1" stopColor="#4a2c18" /></radialGradient>
      <radialGradient id="i179n" cx=".4" cy=".3"><stop stopColor="#fff" /><stop offset="1" stopColor="#e3eaf2" /></radialGradient>
      <radialGradient id="i179l" cx=".85" cy=".1"><stop stopColor="#fff3c4" stopOpacity=".8" /><stop offset="1" stopColor="#fff3c4" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#i179s)" /><rect width="120" height="160" fill="url(#i179l)" />
    <rect x="84" y="10" width="30" height="36" fill="#bde0fe" /><path d="M99 10v36M84 28h30" stroke="#a98467" strokeWidth="2" /><g fill="#fff">{[[90, 16], [104, 22], [94, 38], [108, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" />)}</g>
    <rect y="122" width="120" height="38" fill="#6f4518" opacity=".55" /><path d="M0 122h120" stroke="#a87442" />
    <ellipse cx="58" cy="138" rx="34" ry="4" fill="#3a2010" opacity=".4" />
    <path d="M28 70H88V124Q88 138 74 138H42Q28 138 28 124Z" fill="url(#i179m)" /><path d="M88 80q17 0 15 17q-2 13-15 13" stroke="url(#i179m)" strokeWidth="6.4" fill="none" />
    <path d="M32 96h52M32 110h52" stroke="#fff" strokeWidth="3.4" strokeDasharray="6 4" opacity=".75" /><path d="M32 74v48" stroke="#ff8fa3" strokeWidth="1.6" opacity=".4" />
    <ellipse cx="58" cy="70" rx="30" ry="6.4" fill="url(#i179c)" /><ellipse cx="58" cy="70" rx="30" ry="6.4" fill="none" stroke="#9d0208" strokeWidth="1.4" />
    <g fill="#fff" opacity=".9"><rect x="38" y="66" width="5" height="5" rx="1.4" transform="rotate(20 40 68)" /><rect x="74" y="67" width="5" height="5" rx="1.4" transform="rotate(-10 76 69)" /></g>
    <circle cx="58" cy="60" r="12.6" fill="url(#i179n)" /><circle cx="58" cy="42" r="9" fill="url(#i179n)" />
    <circle cx="55" cy="40" r="1.3" fill="#222" /><circle cx="61" cy="40" r="1.3" fill="#222" /><polygon points="58,43 67,44.4 58,45.6" fill="#f77f00" /><path d="M54 47q4 2 8 0" stroke="#222" strokeWidth=".7" fill="none" />
    <path d="M48 50h20v4.4h-20z" fill="#2a9d8f" /><path d="M64 54h4.4v9h-4.4z" fill="#2a9d8f" /><path d="M48 52h20" stroke="#fff" strokeWidth=".6" strokeDasharray="1.4 1.4" />
    <path d="M50 34h16l-2-6h-12z" fill="#264653" /><circle cx="58" cy="27" r="2" fill="#e63946" />
    <path d="M46 58q-8-4-10-10M70 58q8-4 10-10" stroke="#6b4226" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <path d="M40 24q4-8 0-14M78 28q4-8 0-14" stroke="#fff" strokeWidth="1" fill="none" opacity=".6" />
  </Svg>],

  [180, 'สนามเด็กเล่นในหมอก', <Svg>
    <defs>
      <linearGradient id="i180s" x2="0" y2="1"><stop stopColor="#adb5bd" /><stop offset="1" stopColor="#dee2e6" /></linearGradient>
      <linearGradient id="i180f" x2="0" y2="1"><stop stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#f8f9fa" stopOpacity=".7" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <radialGradient id="i180b" cx=".35" cy=".3"><stop stopColor="#ff8fa3" /><stop offset="1" stopColor="#9d0208" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#i180s)" />
    <g fill="#868e96" opacity=".4"><path d="M100 124V40M100 50L84 40M100 70L114 60" stroke="#868e96" strokeWidth="3" /><circle cx="100" cy="36" r="16" /></g>
    <rect y="122" width="120" height="38" fill="#8d99ae" /><path d="M0 122h120" stroke="#adb5bd" />
    <g stroke="#6c757d" strokeWidth="2.6" fill="none"><path d="M18 122V60H30V122" /><path d="M18 60h12" /></g><g stroke="#6c757d" strokeWidth="1.8">{[72, 84, 96, 108].map(y => <line key={y} x1="18" y1={y} x2="30" y2={y} />)}</g>
    <path d="M30 60Q50 66 64 98Q74 118 94 122" stroke="#9aa5b8" strokeWidth="7" fill="none" /><path d="M30 57Q50 63 64 95Q74 115 94 119" stroke="#ced4da" strokeWidth="1.2" fill="none" />
    <path d="M14 56h20v4H14z" fill="#6c757d" />
    <circle cx="98" cy="116" r="6.4" fill="url(#i180b)" /><path d="M93 114q5-3 10 0" stroke="#fff" strokeWidth=".8" fill="none" opacity=".7" />
    <g stroke="#6c757d" strokeWidth="1.6"><path d="M50 122V100l10-6 10 6v22" fill="none" /></g><path d="M56 100v12M64 100v12" stroke="#6c757d" /><rect x="54" y="112" width="12" height="2.6" fill="#6c757d" />
    <rect y="34" width="120" height="44" fill="url(#i180f)" /><rect y="84" width="120" height="44" fill="url(#i180f)" /><rect y="124" width="120" height="30" fill="url(#i180f)" />
    <g fill="#6c757d" opacity=".5"><ellipse cx="98" cy="123" rx="7" ry="1.4" /></g>
  </Svg>],

  [181, 'ลูกแก้วที่มีพายุข้างใน', <Svg>
    <defs>
      <radialGradient id="i181s" cx=".5" cy=".4"><stop stopColor="#3c096c" /><stop offset="1" stopColor="#10002b" /></radialGradient>
      <radialGradient id="i181o" cx=".35" cy=".3"><stop stopColor="#e0aaff" stopOpacity=".5" /><stop offset=".7" stopColor="#7b2cbf" stopOpacity=".5" /><stop offset="1" stopColor="#c77dff" stopOpacity=".8" /></radialGradient>
      <radialGradient id="i181c" cx=".4" cy=".3"><stop stopColor="#5a5a7a" /><stop offset="1" stopColor="#1a1a2e" /></radialGradient>
      <linearGradient id="i181h" x2="0" y2="1"><stop stopColor="#ffcf99" /><stop offset="1" stopColor="#b5704a" /></linearGradient>
      <linearGradient id="i181b" x2="1" y2="0"><stop stopColor="#5a3417" /><stop offset=".5" stopColor="#a0682f" /><stop offset="1" stopColor="#4a2a10" /></linearGradient>
      <radialGradient id="i181g"><stop stopColor="#c77dff" stopOpacity=".4" /><stop offset="1" stopColor="#c77dff" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#i181s)" />
    <circle cx="60" cy="68" r="56" fill="url(#i181g)" />
    <St p={[10, 14, .5, 104, 20, .6, 14, 120, .4, 108, 110, .5]} f="#e0aaff" />
    <circle cx="60" cy="68" r="32" fill="#240046" opacity=".7" />
    <g fill="url(#i181c)"><circle cx="48" cy="60" r="10" /><circle cx="62" cy="54" r="12.6" /><circle cx="76" cy="62" r="9" /><ellipse cx="62" cy="66" rx="20" ry="6" /></g>
    <polygon points="62,68 54,82 60,82 54,96 70,76 63,76 68,68" fill="#ffd60a" /><polygon points="62,68 54,82 60,82" fill="#fff" opacity=".7" />
    <g stroke="#a2d2ff" strokeWidth=".7" opacity=".8">{[[44, 72], [50, 76], [72, 74], [78, 72], [46, 84]].map(([x, y], i) => <line key={i} x1={x} y1={y} x2={x - 1} y2={y + 6} />)}</g>
    <path d="M36 82q24 10 48 0" stroke="#4361ee" strokeWidth="2" fill="none" opacity=".6" />
    <circle cx="60" cy="68" r="32" fill="url(#i181o)" stroke="#e0aaff" strokeWidth="1" />
    <path d="M38 52q6-14 20-18" stroke="#fff" strokeWidth="2.6" fill="none" opacity=".55" strokeLinecap="round" />
    <path d="M38 98H82L88 110H32Z" fill="url(#i181b)" /><path d="M36 102h48" stroke="#c48a4a" strokeWidth=".8" /><rect x="32" y="108" width="56" height="4" rx="1" fill="#3a2010" />
    <path d="M14 160Q16 124 36 112L42 118Q28 128 32 160ZM106 160Q104 124 84 112L78 118Q92 128 88 160Z" fill="url(#i181h)" />
    <path d="M36 112q-2-6 4-8M84 112q2-6-4-8" stroke="url(#i181h)" strokeWidth="4" strokeLinecap="round" fill="none" />
    <g fill="#ffd166"><circle cx="38" cy="132" r="1.6" /><circle cx="82" cy="136" r="1.4" /></g>
  </Svg>],

  [182, 'ยีราฟเอื้อมคว้าดาว', <Svg>
    <defs>
      <linearGradient id="i182s" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset=".7" stopColor="#1b263b" /><stop offset="1" stopColor="#3a506b" /></linearGradient>
      <radialGradient id="i182g"><stop stopColor="#ffd60a" stopOpacity=".7" /><stop offset="1" stopColor="#ffd60a" stopOpacity="0" /></radialGradient>
      <linearGradient id="i182b" x2="1" y2="1"><stop stopColor="#ffc857" /><stop offset="1" stopColor="#e09f3e" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#i182s)" />
    <St p={[8, 30, .6, 30, 50, .5, 92, 44, .6, 110, 70, .5, 20, 92, .5, 100, 100, .4, 58, 60, .4, 46, 20, .5, 112, 14, .4]} />
    <circle cx="90" cy="26" r="20" fill="url(#i182g)" /><path d="M90 16l3 6.4 7 1-5 4.8 1.2 7-6.2-3.4-6.2 3.4 1.2-7-5-4.8 7-1z" fill="#ffd60a" /><path d="M90 16l3 6.4 7 1-5 4.8" fill="#fff3b0" opacity=".6" />
    <rect y="140" width="120" height="20" fill="#14213d" /><g fill="#1b263b">{[[10, 140], [100, 140]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q4-14 10 0z`} />)}</g>
    <g><path d="M34 112L70 40L79 44L48 114Z" fill="url(#i182b)" /><ellipse cx="34" cy="120" rx="23" ry="13" fill="url(#i182b)" />
      {[[18, 124], [27, 126], [44, 126], [52, 124]].map(([x, y], i) => <g key={i}><rect x={x} y={y} width="5" height="18" fill="url(#i182b)" /><rect x={x} y={y + 16} width="5" height="2.6" fill="#3a2a1a" /></g>)}
      <ellipse cx="78" cy="38" rx="10" ry="5.6" fill="url(#i182b)" transform="rotate(-30 78 38)" /><ellipse cx="85" cy="34" rx="3.4" ry="2.4" fill="#e0b080" transform="rotate(-30 85 34)" />
      <g fill="#a0522d">{[[28, 114], [40, 118], [22, 120], [46, 124], [34, 126], [50, 104], [56, 90], [62, 76], [68, 62], [72, 52], [44, 110]].map(([x, y], i) => <path key={i} d={`M${x - 2.6} ${y}l2.6-2.4 2.6 2.4-2.6 2.4z`} />)}</g>
      <path d="M74 30v-6M79 30l2-6" stroke="#a0522d" strokeWidth="1.6" /><circle cx="74" cy="23" r="1.4" fill="#a0522d" /><circle cx="81" cy="23" r="1.4" fill="#a0522d" />
      <circle cx="79" cy="36" r="1.2" fill="#222" /><path d="M74 42l-5 4" stroke="#e0b080" strokeWidth="2.4" strokeLinecap="round" /><path d="M86 34q2-2 4-6" stroke="#ff8fa3" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M12 116q-6 6-2 12" stroke="url(#i182b)" strokeWidth="1.6" fill="none" /><path d="M10 128l-2 3h4z" fill="#3a2a1a" /></g>
    <path d="M86 30q2-2 2-4" stroke="#ffd60a" strokeWidth=".5" strokeDasharray="1 1" fill="none" />
  </Svg>],

  [183, 'รองเท้าแขวนบนสายไฟ', <Svg>
    <defs>
      <linearGradient id="i183s" x2="0" y2="1"><stop stopColor="#ff9f68" /><stop offset=".6" stopColor="#ffd6a5" /><stop offset="1" stopColor="#fdffb6" /></linearGradient>
      <linearGradient id="i183p" x2="1" y2="0"><stop stopColor="#5a3417" /><stop offset=".5" stopColor="#8b5a2b" /><stop offset="1" stopColor="#4a2a10" /></linearGradient>
      <linearGradient id="i183r" x2="1" y2="1"><stop stopColor="#ff6b6b" /><stop offset="1" stopColor="#9d0208" /></linearGradient>
      <linearGradient id="i183b" x2="1" y2="1"><stop stopColor="#6c9bd2" /><stop offset="1" stopColor="#1d3557" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#i183s)" />
    <circle cx="30" cy="108" r="16" fill="#fff3c4" opacity=".8" />
    <path d="M0 38Q60 54 120 50M0 50Q60 64 120 62M0 62Q60 74 120 72" stroke="#2b2b2b" strokeWidth=".7" fill="none" />
    <rect x="106" y="18" width="5" height="142" fill="url(#i183p)" /><rect x="96" y="36" width="24" height="3.4" fill="url(#i183p)" /><rect x="96" y="48" width="24" height="3" fill="url(#i183p)" /><g fill="#adb5bd">{[98, 104, 114, 118].map(x => <rect key={x} x={x} y="33" width="1.6" height="3" />)}</g>
    <path d="M58 47L52 70M62 47L66 72" stroke="#f8f9fa" strokeWidth=".8" /><path d="M58 47q2-3 4 0" stroke="#f8f9fa" strokeWidth=".8" fill="none" />
    <g transform="rotate(-8 46 76)"><path d="M40 70h12l2 8q0 5-6 5H38q-5 0-4-5z" fill="url(#i183r)" /><path d="M35 80h20" stroke="#fff" strokeWidth="2.4" /><path d="M42 72l6 0M42 75h6" stroke="#fff" strokeWidth=".7" /><path d="M48 70q2-6 4-8" stroke="#f8f9fa" strokeWidth=".6" fill="none" /></g>
    <g transform="rotate(10 72 78)"><path d="M64 72h12l2 8q0 5-6 5H62q-5 0-4-5z" fill="url(#i183b)" /><path d="M59 82h20" stroke="#fff" strokeWidth="2.4" /><path d="M66 74l6 0M66 77h6" stroke="#fff" strokeWidth=".7" /></g>
    <path d="M0 136L30 118L60 128L90 112L120 124V160H0Z" fill="#a3b18a" /><path d="M0 146L40 136L80 148L120 140V160H0Z" fill="#7a8a5b" />
    <g fill="#6a040f" opacity=".7">{[[14, 132], [86, 120]].map(([x, y], i) => <path key={i} d={`M${x} ${y}V${y - 14}L${x + 6} ${y - 18}L${x + 12} ${y - 14}V${y}z`} />)}</g>
    <g transform="translate(32 34)"><path d="M-6 0Q-3-4 0 0Q3-4 6 0" stroke="#2b2b2b" strokeWidth="1.2" fill="none" /></g><g transform="translate(84 58)"><ellipse rx="3" ry="2.4" fill="#2b2b2b" /><circle cx="2.4" cy="-1.6" r="1.6" fill="#2b2b2b" /><polygon points="3.8,-1.6 5.6,-1.2 3.8,-.8" fill="#f77f00" /></g>
  </Svg>],

  [184, 'นกฟลามิงโกกลางหิมะ', <Svg>
    <defs>
      <linearGradient id="i184s" x2="0" y2="1"><stop stopColor="#bde0fe" /><stop offset="1" stopColor="#eef6ff" /></linearGradient>
      <linearGradient id="i184n" x2="0" y2="1"><stop stopColor="#fff" /><stop offset="1" stopColor="#dbe4ee" /></linearGradient>
      <radialGradient id="i184f" cx=".4" cy=".3"><stop stopColor="#ffc2d1" /><stop offset="1" stopColor="#ff4d6d" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#i184s)" />
    <path d="M0 96L30 80L56 92L84 76L120 92V124H0Z" fill="#dbe4ee" /><g fill="#2d6a4f">{[[10, 112], [104, 108], [94, 116]].map(([x, y], i) => <path key={i} d={`M${x} ${y}l6-16 6 16z`} />)}</g><g fill="#fff">{[[16, 98], [110, 94], [100, 102]].map(([x, y], i) => <path key={i} d={`M${x} ${y}l-3 6h6z`} />)}</g>
    <path d="M0 124Q60 114 120 126V160H0Z" fill="url(#i184n)" />
    <ellipse cx="60" cy="130" rx="14" ry="3" fill="#adb5bd" opacity=".4" />
    <ellipse cx="60" cy="84" rx="17" ry="11.6" fill="url(#i184f)" /><path d="M46 80q8 10 22 8" stroke="#ff8fab" strokeWidth="1" fill="none" />
    <path d="M44 80Q38 76 34 82Q40 86 46 84" fill="#ff4d6d" /><path d="M72 80Q82 62 76 46Q72 38 64 42" stroke="url(#i184f)" strokeWidth="4.4" fill="none" strokeLinecap="round" />
    <path d="M64 42l-7 7 2.6 2z" fill="#222" /><path d="M64 42l-4 4" stroke="#fff" strokeWidth=".8" /><circle cx="66" cy="42" r="1.1" fill="#222" />
    <path d="M58 95V130M58 108l7 4" stroke="#ff4d6d" strokeWidth="1.8" fill="none" /><path d="M54 130h8" stroke="#ff4d6d" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M44 72q-4 2-4 6M38 76q-4 2-4 6" stroke="#ff4d6d" fill="none" strokeWidth=".8" /><path d="M48 76q-8 0-10 6" stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" /><path d="M66 46h6" stroke="#e63946" strokeWidth="2.4" strokeLinecap="round" /><path d="M68 46v8" stroke="#e63946" strokeWidth="2" strokeLinecap="round" />
    <g fill="#fff">{Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 43) % 118 + 1} cy={(i * 31) % 150 + 4} r={i % 3 ? 1 : 1.6} />)}</g>
  </Svg>],
];
