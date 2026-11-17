// ภาพวาด SVG ของไพ่ (viewBox 100×100) — ทุเรียนตูม / จับผีปอป / ขุดสมบัติป่าช้า
// สไตล์: flat vector มีเส้นขอบ + เงา/ไฮไลต์เป็นสีทึบ ไม่มีตัวหนังสือในภาพ
import React from 'react';

const P = (n, f) => Array.from({ length: n }, (_, i) => f(i));
const spiky = (cx, cy, rx, ry, n, k, rot = -Math.PI / 2) => P(n * 2, i => { const a = rot + i / (n * 2) * Math.PI * 2, f = i % 2 ? 1 : 1 + k; return (i ? 'L' : 'M') + (cx + Math.cos(a) * rx * f).toFixed(1) + ' ' + (cy + Math.sin(a) * ry * f).toFixed(1); }).join(' ') + 'Z';
const spark = (x, y, r) => `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`;
const heart = (x, y, s) => `M${x} ${y + s * .9}C${x - s * 1.5} ${y} ${x - s * .8} ${y - s} ${x} ${y - s * .35}C${x + s * .8} ${y - s} ${x + s * 1.5} ${y} ${x} ${y + s * .9}Z`;
const drop = (x, y, s) => `M${x} ${y - s}Q${x + s * .9} ${y + s * .2} ${x} ${y + s * .8}Q${x - s * .9} ${y + s * .2} ${x} ${y - s}Z`;
const rock = (x, y, s) => `M${x - s} ${y}L${x - s * .6} ${y - s * .8}L${x + s * .4} ${y - s}L${x + s} ${y - s * .2}L${x + s * .7} ${y + s * .8}L${x - s * .5} ${y + s * .9}Z`;
const Sparks = ({ pts, fill = '#fff' }) => <g fill={fill}>{pts.map(([x, y, r], i) => <path key={i} d={spark(x, y, r)} />)}</g>;

// ===================== 💥 ทุเรียนตูม — ตลาดผลไม้แดดจ้า =====================
const INK = '#3b2412', SKIN = '#f6c99a';
const O = { stroke: INK, strokeWidth: 2.2, strokeLinejoin: 'round', strokeLinecap: 'round' };
const BOT = 'V80Q98 98 80 98H20Q2 98 2 80Z';
const Sun = ({ bg = '#ffe39a', ray = '#fff1c2', ground }) => <g>
  <rect x="2" y="2" width="96" height="96" rx="18" fill={bg} />
  <g fill={ray}>{P(12, i => <path key={i} d="M50 52L45 8H55Z" transform={`rotate(${i * 30} 50 52)`} />)}</g>
  <circle cx="50" cy="52" r="20" fill={ray} opacity=".7" />
  {ground && <path d={'M2 80Q50 70 98 80' + BOT} fill={ground} />}
</g>;
const Durian = ({ x = 50, y = 56, s = 1, face }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d={spiky(0, 0, 27, 25, 16, .2)} fill="#8aa232" {...O} />
  <ellipse rx="25" ry="23" fill="#a9c042" />
  <path d="M18 -12Q28 8 6 22Q20 4 18 -12Z" fill="#8aa232" />
  <ellipse cx="-10" cy="-11" rx="8" ry="4" fill="#d6e57a" transform="rotate(-30 -10 -11)" />
  <g stroke="#7a9228" strokeWidth="1.6" fill="none">{[[-12, -2], [0, -7], [12, -2], [-6, 8], [6, 8], [-15, 12], [15, 11], [0, 16]].map(([a, b], i) => <path key={i} d={`M${a - 3} ${b + 2}L${a} ${b - 2}L${a + 3} ${b + 2}`} />)}</g>
  <path d="M0 -24q1 -8 7 -11" stroke="#6b4a1e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
  {face === 'angry' && <g>
    <circle cx="-9" cy="0" r="5" fill="#fff" {...O} strokeWidth="1.6" /><circle cx="9" cy="0" r="5" fill="#fff" {...O} strokeWidth="1.6" />
    <circle cx="-8" cy="1" r="2.4" fill={INK} /><circle cx="8" cy="1" r="2.4" fill={INK} />
    <path d="M-15 -9L-4 -4M15 -9L4 -4" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
    <path d="M-9 14Q0 6 9 14Z" fill="#5a1a0a" {...O} strokeWidth="1.6" />
  </g>}
</g>;
const Fr = ({ x, y, r, c, sh }) => <g><circle cx={x} cy={y} r={r} fill={c} {...O} /><path d={`M${x + r * .55} ${y - r * .6}Q${x + r * 1.05} ${y + r * .2} ${x + r * .1} ${y + r * .95}Q${x + r * .75} ${y + r * .2} ${x + r * .55} ${y - r * .6}Z`} fill={sh} /><ellipse cx={x - r * .38} cy={y - r * .38} rx={r * .3} ry={r * .18} fill="#fff" opacity=".55" transform={`rotate(-35 ${x - r * .38} ${y - r * .38})`} /></g>;

const BOOM = {
  bomb: () => <g><Sun bg="#ffb36b" ray="#ffd08f" />
    <path d={spiky(50, 56, 40, 40, 11, .32)} fill="#ff5a2a" opacity=".9" />
    <path d={spiky(50, 56, 31, 31, 11, .3, -1.2)} fill="#ffd34d" />
    <Durian y={60} s={.95} face="angry" />
    <path d="M57 26q8 -6 6 -14" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <circle cx="63" cy="11" r="6" fill="#ff7a2e" opacity=".6" /><Sparks pts={[[63, 11, 7]]} fill="#fff6c0" />
    <g stroke="#7a9228" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".8"><path d="M18 30q-4 -5 0 -10q4 -5 0 -10" /><path d="M84 36q-4 -5 0 -10q4 -5 0 -10" /></g>
  </g>,
  clip: () => <g><Sun bg="#c9f0b0" ray="#e4fad4" />
    <g transform="translate(18 82) scale(.32)"><Durian x={0} y={0} /></g>
    <g stroke="#7aa83a" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".7"><path d="M22 66q-4 -5 0 -10q4 -5 0 -10" /></g>
    <circle cx="54" cy="58" r="30" fill={SKIN} {...O} />
    <ellipse cx="34" cy="68" rx="5" ry="3" fill="#ff9a8a" opacity=".7" /><ellipse cx="74" cy="68" rx="5" ry="3" fill="#ff9a8a" opacity=".7" />
    <path d="M30 54q5 -5 10 0M68 54q5 -5 10 0" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <path d="M46 78q8 6 16 0" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <ellipse cx="54" cy="64" rx="7" ry="8" fill="#eeb07e" {...O} />
    <path d="M47 70h4l-2 -30h-6ZM61 70h-4l2 -30h6Z" fill="#e0a860" {...O} />
    <path d="M44.5 44l1.5 22M63.5 44l-1.5 22" stroke="#f4c88a" strokeWidth="1.5" />
    <path d="M45 52H63" stroke="#8d96a8" strokeWidth="2.5" /><circle cx="54" cy="52" r="4" fill="none" stroke="#8d96a8" strokeWidth="2.5" />
    <Sparks pts={[[84, 24, 6], [20, 30, 4]]} />
  </g>,
  nope: () => <g><Sun bg="#ffc2c9" ray="#ffdfe3" />
    <circle cx="50" cy="52" r="36" fill="#fff" stroke="#e8283c" strokeWidth="8" />
    <path d="M25 27L75 77" stroke="#e8283c" strokeWidth="8" />
    <g fill={SKIN} {...O}>
      <rect x="21.5" y="50" width="9" height="23" rx="4.5" transform="rotate(-40 26 61)" />
      <rect x="35" y="31" width="8.5" height="30" rx="4.25" /><rect x="43.5" y="24" width="8.5" height="34" rx="4.25" />
      <rect x="52" y="26" width="8.5" height="32" rx="4.25" /><rect x="60.5" y="33" width="8" height="28" rx="4" />
    </g>
    <path d="M34.6 48H68.4V66Q68.4 83.9 52 83.9Q34.6 83.9 34.6 68Z" fill={SKIN} />
    <path d="M34 50V68Q34 84.5 52 84.5Q69 84.5 69 66V54" fill="none" {...O} />
    <path d="M42 70q8 4 16 0" stroke="#d9a070" strokeWidth="1.8" fill="none" strokeLinecap="round" />
  </g>,
  skip: () => <g><Sun bg="#bfe3ff" ray="#dff1ff" ground="#9fcf6a" />
    <g stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M6 50h12" /><path d="M4 60h14" /><path d="M8 70h10" /></g>
    <path d="M10 22l7 6l-7 6M19 22l7 6l-7 6" stroke="#2f7ae0" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M27 38V56M66 38V56" stroke={INK} strokeWidth="3" />
    <path d="M66 36L72 54" stroke="#9fd6ff" strokeWidth="4" strokeLinecap="round" />
    <path d="M20 78V56H70L80 61Q87 63 87 71V78Z" fill="#2f7ae0" {...O} />
    <rect x="20" y="63" width="67" height="4" fill="#ffd34d" />
    <path d="M24 58h16v10h-16Z" fill="#1d5ab0" />
    <circle cx="84" cy="66" r="3" fill="#ffe066" {...O} strokeWidth="1.5" />
    {P(6, i => <circle key={i} cx={25 + i * 9} cy="35" r="4.5" fill="#ffd34d" {...O} strokeWidth="1.6" />)}
    <path d="M20 35Q20 22 32 22H62Q72 22 74 35Z" fill="#e8402a" {...O} />
    <path d="M28 27H60" stroke="#ff7a62" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="32" cy="79" r="8.5" fill="#2b2f3a" {...O} /><circle cx="32" cy="79" r="3" fill="#c8ccd6" />
    <circle cx="78" cy="79" r="7.5" fill="#2b2f3a" {...O} /><circle cx="78" cy="79" r="2.6" fill="#c8ccd6" />
  </g>,
  attack: () => <g><Sun bg="#ffd9a8" ray="#ffeccf" ground="#e9b36a" />
    <path d="M14 74Q24 22 58 24" stroke="#ff7a2e" strokeWidth="3.5" fill="none" strokeDasharray="1 7" strokeLinecap="round" />
    <g stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M42 18l-8 -2" /><path d="M44 28h-9" /></g>
    <g transform="rotate(25 62 28)"><Durian x={62} y={28} s={.5} /></g>
    <path d="M58 96Q58 85 72 85Q86 85 86 96Z" fill="#2f7ae0" {...O} />
    <circle cx="72" cy="70" r="14" fill={SKIN} {...O} />
    <path d="M59 66Q60 54 72 55Q84 54 85 66Q78 60 72 62Q66 60 59 66Z" fill="#3b2412" />
    <circle cx="67" cy="69" r="4" fill="#fff" {...O} strokeWidth="1.4" /><circle cx="77" cy="69" r="4" fill="#fff" {...O} strokeWidth="1.4" />
    <circle cx="66" cy="67.6" r="2" fill={INK} /><circle cx="76" cy="67.6" r="2" fill={INK} />
    <ellipse cx="72" cy="78" rx="3.5" ry="4.2" fill="#5a1a0a" />
    <path d={drop(88, 60, 4)} fill="#7cc8ff" {...O} strokeWidth="1.2" />
  </g>,
  future: () => <g><Sun bg="#d8ccff" ray="#ece6ff" />
    <g {...O}>{[-22, 0, 22].map((a, i) => <g key={a} transform={`rotate(${a} 42 92)`}><rect x="29" y="36" width="26" height="38" rx="4" fill={['#ffd34d', '#7fe08a', '#ff8fa3'][i]} /><circle cx="42" cy="55" r="6" fill="#fff" opacity=".6" stroke="none" /></g>)}</g>
    <path d="M71 71L86 89" stroke={INK} strokeWidth="11" strokeLinecap="round" /><path d="M71 71L86 89" stroke="#a8703c" strokeWidth="6.5" strokeLinecap="round" />
    <circle cx="60" cy="56" r="19" fill="#e8f6ff" />
    <Durian x={60} y={59} s={.42} />
    <circle cx="60" cy="56" r="19" fill="#bfe6ff" opacity=".25" />
    <circle cx="60" cy="56" r="19" fill="none" stroke="#5b6270" strokeWidth="5" /><circle cx="60" cy="56" r="21.5" fill="none" {...O} />
    <path d="M48 50q3 -7 10 -9" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
    <Sparks pts={[[18, 20, 6], [84, 22, 5], [86, 40, 3]]} />
  </g>,
  shuffle: () => <g><Sun bg="#ffe08a" ray="#fff0bf" ground="#e2b45a" />
    <g stroke="#c0761a" strokeWidth="3" strokeLinecap="round" fill="none"><path d="M12 62q-4 6 0 12" /><path d="M6 59q-4 8 0 16" /><path d="M88 62q4 6 0 12" /><path d="M94 59q4 8 0 16" /></g>
    <g stroke="#c0761a" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6"><path d="M28 46q-4 -6 -2 -12" /><path d="M76 40q4 -6 2 -12" /></g>
    <Fr x={34} y={36} r={9} c="#5a2350" sh="#43183c" /><path d="M30 27h8" stroke="#5f9a3a" strokeWidth="4" strokeLinecap="round" />
    <Fr x={52} y={24} r={9} c="#e0303a" sh="#b81e30" />
    <g transform="rotate(-25 70 38)"><ellipse cx="70" cy="38" rx="10" ry="7.5" fill="#ffc22e" {...O} /><ellipse cx="66" cy="35" rx="3" ry="1.6" fill="#fff" opacity=".6" /></g>
    <Fr x={44} y={50} r={6} c="#c9a064" sh="#a8824a" />
    <g transform="rotate(-6 50 72)">
      <path d="M18 60H82L74 86Q50 92 26 86Z" fill="#d49a4a" {...O} />
      <g stroke="#a86e2a" strokeWidth="2" fill="none"><path d="M21 70H79M24 78H77" /><path d="M30 63L32 88M42 63L43 90M54 63L54 90M66 63L65 89" /></g>
      <rect x="15" y="56" width="70" height="8" rx="4" fill="#b57a32" {...O} />
    </g>
  </g>,
  favor: () => <g><Sun bg="#ffd6e6" ray="#ffeaf2" />
    <path d="M20 98Q20 68 50 66Q80 68 80 98Z" fill="#4fa3e0" {...O} />
    <path d="M40 67L50 78L60 67" fill="#fff" {...O} strokeWidth="1.8" />
    <circle cx="50" cy="40" r="18" fill={SKIN} {...O} />
    <path d="M32 38Q32 20 50 21Q68 20 68 38Q60 30 50 31Q40 30 32 38Z" fill={INK} />
    <path d="M40 42q3 -3 6 0M54 42q3 -3 6 0" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <ellipse cx="38" cy="48" rx="4" ry="2.4" fill="#ff9a8a" opacity=".75" /><ellipse cx="62" cy="48" rx="4" ry="2.4" fill="#ff9a8a" opacity=".75" />
    <path d="M46 51q4 3 8 0" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M50 50Q57 58 58 70Q58 82 54 92H46Q42 82 42 70Q43 58 50 50Z" fill={SKIN} {...O} />
    <path d="M50 53V91" stroke="#d99a68" strokeWidth="1.8" />
    <path d="M34 96L42 84M66 96L58 84" stroke="#3a88c8" strokeWidth="5" strokeLinecap="round" />
    <path d={heart(80, 24, 9)} fill="#ff5a8a" {...O} /><path d={heart(20, 30, 5.5)} fill="#ff8fb0" {...O} strokeWidth="1.6" />
    <Sparks pts={[[18, 56, 4], [84, 52, 4.5]]} />
  </g>,
  bottom: () => <g><Sun bg="#cdeec0" ray="#e6f8dc" />
    <circle cx="30" cy="34" r="12" fill={SKIN} {...O} />
    <path d="M18 33Q18 20 30 21Q42 20 42 33Q36 27 30 28Q24 27 18 33Z" fill={INK} />
    <circle cx="27" cy="32" r="3.4" fill="#fff" {...O} strokeWidth="1.2" /><circle cx="35" cy="32" r="3.4" fill="#fff" {...O} strokeWidth="1.2" />
    <circle cx="28.5" cy="32.6" r="1.7" fill={INK} /><circle cx="36.5" cy="32.6" r="1.7" fill={INK} />
    {[0, 1, 2, 3].map(i => <rect key={i} x={36 + i * 2.5} y={30 - i * 4} width="36" height="48" rx="5" fill={i % 2 ? '#3f8a30' : '#4f9a3a'} {...O} />)}
    <rect x="47" y="22" width="28" height="40" rx="3" fill="none" stroke="#8fd06a" strokeWidth="1.6" />
    <path d="M61 32L68 42L61 52L54 42Z" fill="#8fd06a" />
    <g transform="rotate(-12 50 80)"><rect x="22" y="66" width="36" height="26" rx="4" fill="#ffd34d" {...O} /><path d={heart(40, 79, 6)} fill="#ff8a3d" /></g>
    <path d="M8 76H20Q26 76 26 82V84Q26 90 20 90H8Z" fill={SKIN} {...O} />
    <path d="M12 80h8M12 85h8" stroke="#d99a68" strokeWidth="1.5" strokeLinecap="round" />
    <g stroke="#3f8a30" strokeWidth="2.5" strokeLinecap="round"><path d="M64 88l8 2" /><path d="M66 94h8" /></g>
  </g>,
  market: () => <g><Sun bg="#ffd0a0" ray="#ffe6c8" ground="#e09a5a" />
    <path d="M22 40L28 88M78 30L70 60" stroke="#8a5a2a" strokeWidth="4" strokeLinecap="round" />
    <g transform="rotate(-14 50 30)">{P(6, i => <path key={i} d={`M${14 + i * 12} 20h12v12q-6 6 -12 0Z`} fill={i % 2 ? '#fff' : '#e8402a'} {...O} />)}<rect x="12" y="16" width="76" height="6" rx="3" fill="#b8321e" {...O} /></g>
    <g transform="rotate(18 50 78)"><rect x="30" y="66" width="36" height="22" rx="2" fill="#c8894a" {...O} /><path d="M30 77h36M42 66v22M54 66v22" stroke="#9a6430" strokeWidth="2" /></g>
    <Fr x={74} y={56} r={7} c="#e0303a" sh="#b81e30" /><Fr x={86} y={42} r={7} c="#5a2350" sh="#43183c" />
    <Fr x={62} y={44} r={6} c="#c9a064" sh="#a8824a" /><Fr x={84} y={66} r={6} c="#a8d45a" sh="#8ab83e" />
    <g stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M70 36l-4 -6" /><path d="M92 54l5 -2" /><path d="M78 30l2 -6" /></g>
  </g>,
  // ---- ผลไม้ไทย ----
  f1: () => <g><Sun bg="#e6d2f0" ray="#f3e8f8" ground="#8fc46a" />
    <path d="M42 30V19" stroke="#5a3a1a" strokeWidth="4" strokeLinecap="round" />
    <Fr x={42} y={54} r={24} c="#5a2350" sh="#43183c" />
    <g fill="#5f9a3a" {...O}><ellipse cx="34" cy="33" rx="7.5" ry="4" transform="rotate(-20 34 33)" /><ellipse cx="50" cy="33" rx="7.5" ry="4" transform="rotate(20 50 33)" /><ellipse cx="42" cy="31" rx="5" ry="4.5" /></g>
    <circle cx="70" cy="74" r="16" fill="#5a2350" {...O} /><circle cx="70" cy="74" r="12.5" fill="#c0507e" />
    <circle cx="70" cy="74" r="10" fill="#fff7f0" />
    <g stroke="#e3cfc2" strokeWidth="1.4">{P(6, i => { const a = i / 6 * Math.PI * 2; return <path key={i} d={`M70 74L${(70 + Math.cos(a) * 10).toFixed(1)} ${(74 + Math.sin(a) * 10).toFixed(1)}`} />; })}</g>
    <circle cx="70" cy="74" r="2" fill="#e3cfc2" />
  </g>,
  f2: () => <g><Sun bg="#ffd6d0" ray="#ffeae6" ground="#8fc46a" />
    {P(22, i => { const a = i / 22 * Math.PI * 2, f = (r, d = 0) => [(44 + Math.cos(a + d) * r).toFixed(1), (52 + Math.sin(a + d) * r).toFixed(1)]; const [x0, y0] = f(19), [cx, cy] = f(27, .35), [x1, y1] = f(29, .1); return <g key={i}><path d={`M${x0} ${y0}Q${cx} ${cy} ${x1} ${y1}`} stroke="#d6283a" strokeWidth="2.6" fill="none" strokeLinecap="round" /><circle cx={x1} cy={y1} r="1.8" fill="#7cbf4a" /></g>; })}
    <Fr x={44} y={52} r={20} c="#e0303a" sh="#b81e30" />
    <path d="M56 78A16 14 0 0 0 88 78Z" fill="#e0303a" {...O} />
    <g fill="#7cbf4a">{[60, 66, 72, 78, 84].map(x => <circle key={x} cx={x} cy={x === 60 || x === 84 ? 84 : 89} r="1.5" />)}</g>
    <ellipse cx="72" cy="70" rx="12" ry="12" fill="#f4f1e6" {...O} />
    <ellipse cx="68" cy="65" rx="4" ry="2.5" fill="#fff" transform="rotate(-30 68 65)" />
  </g>,
  f3: () => <g><Sun bg="#f6e3c0" ray="#fbf0dc" ground="#8fc46a" />
    <path d="M50 8Q48 20 50 28M50 24Q38 28 34 40M50 24Q62 28 66 40M50 28V44" stroke="#7a5a2a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <g transform="translate(24 18) rotate(-20)"><path d="M0 0Q12 -9 24 0Q12 9 0 0Z" fill="#5f9a3a" {...O} /><path d="M2 0H22" stroke="#3f7a2a" strokeWidth="1.4" /></g>
    <g transform="translate(76 18) rotate(200)"><path d="M0 0Q12 -9 24 0Q12 9 0 0Z" fill="#5f9a3a" {...O} /><path d="M2 0H22" stroke="#3f7a2a" strokeWidth="1.4" /></g>
    {[[34, 48], [50, 46], [66, 50], [40, 63], [58, 62], [30, 76], [68, 76]].map(([x, y], i) => <Fr key={i} x={x} y={y} r={10} c="#c9a064" sh="#a8824a" />)}
    <circle cx="49" cy="78" r="10" fill="#efe9d6" {...O} /><circle cx="51" cy="80" r="4.5" fill="#3a2414" /><ellipse cx="45" cy="74" rx="3" ry="2" fill="#fff" />
  </g>,
  f4: () => <g><Sun bg="#ffe6a0" ray="#fff3cf" ground="#8fc46a" />
    <path d="M52 26Q66 6 86 12Q74 30 52 26Z" fill="#4f9a3a" {...O} /><path d="M55 25Q70 16 84 13" stroke="#3a7a2a" strokeWidth="1.5" fill="none" />
    <path d="M50 30Q50 24 54 22" stroke="#6b4a1e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M50 28Q76 28 78 54Q80 82 54 86Q28 88 24 66Q20 46 34 34Q42 28 50 28Z" fill="#ffc22e" {...O} />
    <path d="M52 30Q74 30 77 52Q68 38 52 33Z" fill="#ff9a2e" />
    <path d="M77 56Q78 80 56 85Q74 74 77 56Z" fill="#e8a218" />
    <path d="M32 46Q36 38 44 35" stroke="#fff3b8" strokeWidth="4" fill="none" strokeLinecap="round" />
    <Sparks pts={[[16, 24, 5], [86, 40, 4]]} />
  </g>,
  f5: () => <g><Sun bg="#e0f5c8" ray="#f0fbe4" ground="#8fc46a" />
    <path d="M44 29q2 -8 8 -10" stroke="#6b4a1e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M50 21Q60 10 72 14Q64 24 50 21Z" fill="#4f9a3a" {...O} />
    <Fr x={44} y={55} r={26} c="#a8d45a" sh="#8ab83e" />
    <g fill="#93c04a">{[[34, 50], [44, 44], [54, 52], [40, 62], [52, 66], [30, 64], [60, 40], [46, 74]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.4" />)}</g>
    <path d="M56 88Q58 60 84 56Q92 76 76 88Q66 93 56 88Z" fill="#fff4e0" {...O} />
    <path d="M61 85Q63 64 82 60Q87 76 73 85Z" fill="#ff8f86" />
    <path d="M68 78l4 -8M74 80l4 -10M66 70l6 -3" stroke="#ffc0b8" strokeWidth="1.6" strokeLinecap="round" />
  </g>,
};

// ===================== 👻 จับผีปอป — หมู่บ้านอีสานยามค่ำ =====================
const OI = '#0a1012', GH = '#b6f09c', BLOOD = '#c81e32', SK2 = '#e2b07e';
const OC = { stroke: OI, strokeWidth: 2.2, strokeLinejoin: 'round', strokeLinecap: 'round' };
const Night = ({ bg = '#17262c', moon = true, scene = true }) => <g>
  <rect x="2" y="2" width="96" height="96" rx="18" fill={bg} />
  <g fill="#e8f5d0" opacity=".7">{[[16, 14], [30, 24], [86, 44], [12, 42], [58, 9], [44, 18]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? .9 : 1.3} />)}</g>
  {moon && <g><circle cx="76" cy="22" r="16" fill={GH} opacity=".12" /><circle cx="76" cy="22" r="9" fill="#e9f6d8" /><circle cx="73" cy="19" r="2" fill="#cfe2bd" /><circle cx="79" cy="25" r="1.4" fill="#cfe2bd" /></g>}
  {scene && <g fill="#0b1418">
    <path d="M7 76L17 67L27 76Z" /><rect x="9" y="76" width="16" height="5" /><path d="M11 81v6M23 81v6" stroke="#0b1418" strokeWidth="2" />
    <path d="M88 86Q85 72 89 60" stroke="#0b1418" strokeWidth="2.6" fill="none" />
    {[-150, -110, -60, -20, 20].map(a => <path key={a} d="M89 60q7 -2 11 4q-6 -3 -11 -4Z" transform={`rotate(${a + 90} 89 60)`} />)}
    <path d={'M2 84Q40 76 98 86' + BOT} />
  </g>}
</g>;
const Head = ({ x, y, r = 12, hair = '#1a1210', bun }) => <g>
  {bun && <circle cx={x + (bun > 0 ? r * .7 : -r * .7)} cy={y - r * .9} r={r * .38} fill={hair} {...OC} />}
  <circle cx={x} cy={y} r={r} fill={SK2} {...OC} />
  <path d={`M${x - r} ${y - 1}Q${x - r} ${y - r - 1} ${x} ${y - r - 1}Q${x + r} ${y - r - 1} ${x + r} ${y - 1}Q${x} ${y - r * .55} ${x - r} ${y - 1}Z`} fill={hair} />
</g>;

const CURSE = {
  gossip: () => <g><Night moon={false} />
    <path d="M18 12H82Q90 12 90 20V38Q90 46 82 46H46L36 56L38 46H18Q10 46 10 38V20Q10 12 18 12Z" fill="#f3e6c8" {...OC} />
    <rect x="38" y="18" width="6" height="16" rx="3" fill={BLOOD} /><circle cx="41" cy="39.5" r="3" fill={BLOOD} />
    <path d="M52 23Q52 18 58 18Q64 18 64 24Q64 28 59 30V33" stroke={BLOOD} strokeWidth="5" fill="none" strokeLinecap="round" /><circle cx="59" cy="39.5" r="3" fill={BLOOD} />
    <path d="M20 96Q20 85 32 85Q44 85 44 96Z" fill="#6a2a3a" {...OC} /><path d="M56 96Q56 85 68 85Q80 85 80 96Z" fill="#3a5a6a" {...OC} />
    <Head x={31} y={70} bun={-1} /><Head x={69} y={70} bun={1} />
    <ellipse cx="57" cy="71" rx="3" ry="5" fill={SK2} {...OC} strokeWidth="1.6" />
    <path d="M33 70q2 -2 4 0M39 70q2 -2 4 0" stroke={OI} strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="65" cy="71" r="2.6" fill="#fff" {...OC} strokeWidth="1" /><circle cx="64" cy="71" r="1.3" fill={OI} /><circle cx="72" cy="71" r="2.6" fill="#fff" {...OC} strokeWidth="1" /><circle cx="71" cy="71" r="1.3" fill={OI} />
    <ellipse cx="45" cy="74" rx="4" ry="6" fill={SK2} {...OC} strokeWidth="1.8" />
  </g>,
  evidence: () => <g><Night />
    <g stroke="#9fe07a" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".85"><path d="M30 50q-5 -6 0 -12q5 -6 0 -12" /><path d="M50 46q-5 -6 0 -12q5 -6 0 -12" /><path d="M70 50q-5 -6 0 -12q5 -6 0 -12" /></g>
    <ellipse cx="50" cy="70" rx="40" ry="13" fill="#3f7a3a" {...OC} />
    <path d="M14 70H86M30 62l8 8M50 59l4 11M70 62l-6 8" stroke="#5f9a4a" strokeWidth="1.6" fill="none" />
    <path d="M20 68H68" stroke={OI} strokeWidth="6.5" strokeLinecap="round" /><path d="M20 68H68" stroke="#e8e2cc" strokeWidth="3.5" strokeLinecap="round" />
    <g stroke="#e8e2cc" strokeWidth="2.6" fill="none" strokeLinecap="round">{P(5, i => <path key={i} d={`M${28 + i * 8} 59Q${30 + i * 8} 68 ${28 + i * 8} 77`} />)}</g>
    <path d="M20 68L8 59L10 68L8 77Z" fill="#e8e2cc" {...OC} />
    <path d="M66 59Q86 60 86 68Q86 76 66 78Z" fill="#e8e2cc" {...OC} />
    <circle cx="77" cy="66" r="2.6" fill={BLOOD} />
    <path d={drop(36, 86, 4)} fill={BLOOD} /><path d={drop(62, 88, 3)} fill={BLOOD} /><path d={drop(76, 84, 2.4)} fill={BLOOD} />
  </g>,
  witness: () => <g><rect x="2" y="2" width="96" height="96" rx="18" fill="#17262c" />
    <rect x="10" y="12" width="80" height="76" rx="4" fill="#070c0e" stroke="#6b4a2a" strokeWidth="4" />
    <ellipse cx="50" cy="50" rx="30" ry="18" fill={GH} opacity=".18" />
    <path d="M20 50Q50 24 80 50Q50 76 20 50Z" fill="#f4f0e0" {...OC} />
    <path d="M24 50q6 -3 10 -1M24 52q5 3 9 2M76 50q-6 -3 -10 -1M76 52q-5 3 -9 2" stroke="#d65a5a" strokeWidth="1.2" fill="none" />
    <circle cx="50" cy="50" r="12" fill="#6b8a3a" {...OC} /><circle cx="50" cy="50" r="6" fill={OI} /><circle cx="46" cy="46" r="3" fill="#fff" />
    <path d="M20 50Q50 20 80 50" stroke={OI} strokeWidth="3.5" fill="none" />
    {[0, 1, 2].map(i => <g key={i}>
      <rect x={12 + i * 7} y="14" width="7" height="72" fill={i % 2 ? '#8a6a30' : '#a07c3c'} stroke="#4a3418" strokeWidth="1.2" />
      <rect x={67 + i * 7} y="14" width="7" height="72" fill={i % 2 ? '#a07c3c' : '#8a6a30'} stroke="#4a3418" strokeWidth="1.2" />
    </g>)}
    <path d="M12 34h21M12 66h21M67 30h21M67 62h21" stroke="#4a3418" strokeWidth="1.6" />
    <g stroke={BLOOD} strokeWidth="3" strokeLinecap="round"><path d="M50 4v5" /><path d="M36 6l2 4" /><path d="M64 6l-2 4" /></g>
  </g>,
  alibi: () => <g><Night moon={false} />
    <circle cx="20" cy="72" r="24" fill="#ffb347" opacity=".16" />
    <path d="M24 20H76V80H24Z" fill="#f3e6c8" {...OC} />
    <g stroke="#a08a6a" strokeWidth="2" fill="none" strokeLinecap="round">{P(3, i => <path key={i} d={`M30 ${30 + i * 7}q5 -3 10 0t10 0t10 0t8 0`} />)}</g>
    <path d="M34 58L44 68L68 42" stroke={OI} strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M34 58L44 68L68 42" stroke="#3fbf5a" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="64" cy="70" r="6" fill={BLOOD} opacity=".85" /><path d="M60 70a4 4 0 0 1 8 0M62 71a2 2 0 0 1 4 0" stroke="#f3a0a8" strokeWidth="1" fill="none" />
    <rect x="18" y="14" width="64" height="9" rx="4.5" fill="#8a5530" {...OC} /><rect x="18" y="77" width="64" height="9" rx="4.5" fill="#8a5530" {...OC} />
    <path d="M22 17h56M22 80h56" stroke="#b07a4a" strokeWidth="1.5" />
  </g>,
  stocks: () => <g><Night />
    <path d="M30 94Q30 76 50 76Q70 76 70 94Z" fill="#5a3a6a" {...OC} />
    <Head x={50} y={58} r={14} />
    <path d="M41 52l7 2M59 52l-7 2" stroke={OI} strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="44.5" cy="59" r="1.8" fill={OI} /><circle cx="55.5" cy="59" r="1.8" fill={OI} />
    <path d="M44 67q6 -4 12 0" stroke={OI} strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d={drop(59, 64, 2.6)} fill="#7cc8ff" />
    <g fill="#a8703c" {...OC}>{[18, 33, 48, 62, 76].map(x => <rect key={x} x={x} y="34" width={x === 48 ? 4.5 : 6} height="56" />)}</g>
    <rect x="12" y="28" width="76" height="8" rx="2" fill="#8a5530" {...OC} /><rect x="12" y="86" width="76" height="8" rx="2" fill="#8a5530" {...OC} />
    <g stroke="#e6d4a0" strokeWidth="2" strokeLinecap="round"><path d="M16 28l5 8M20 28l5 8M80 28l-5 8M84 28l-5 8" /></g>
  </g>,
  arson: () => <g><Night moon={false} bg="#2a1a1a" />
    <circle cx="50" cy="56" r="40" fill="#ff7a2e" opacity=".16" />
    <path d="M58 24Q50 14 60 8Q70 3 75 12Q85 10 85 20Q90 27 80 30Q70 34 62 30Z" fill="#3a3030" opacity=".9" />
    <path d="M30 70V88M50 70V88M70 70V88" stroke="#3a2416" strokeWidth="4" />
    <rect x="26" y="50" width="48" height="22" fill="#7a4a2a" {...OC} />
    <path d="M26 58h48M26 65h48" stroke="#5a3418" strokeWidth="1.5" />
    <path d="M16 53L50 28L84 53Z" fill="#a8803c" {...OC} />
    <path d="M28 46l4 4M40 38l3 5M60 38l-3 5M72 46l-4 4" stroke="#7a5a28" strokeWidth="1.6" />
    <path d="M30 72Q22 54 34 44Q34 54 40 52Q38 38 50 24Q52 40 60 44Q62 34 68 30Q80 48 70 72Z" fill="#ff6a1e" {...OC} />
    <path d="M38 72Q34 60 42 54Q44 60 48 58Q50 48 56 42Q58 54 64 56Q68 66 62 72Z" fill="#ffc83a" />
    <path d="M45 72Q43 64 48 60Q50 64 53 62Q57 66 55 72Z" fill="#fff1a0" />
    <g fill="#ffb347"><circle cx="20" cy="32" r="1.8" /><circle cx="82" cy="40" r="1.5" /><circle cx="78" cy="58" r="1.2" /><circle cx="24" cy="50" r="1.2" /></g>
  </g>,
  cleanse: () => <g><Night moon={false} bg="#183038" />
    <circle cx="50" cy="60" r="32" fill="#bfe8ff" opacity=".14" />
    <g opacity=".75"><path d="M74 12Q86 10 86 22Q86 30 81 32L79 28L75 32L73 28L69 31Q66 18 74 12Z" fill={GH} /><circle cx="75" cy="20" r="1.6" fill={OI} /><circle cx="81" cy="20" r="1.6" fill={OI} /></g>
    <path d="M66 26l-6 4M70 32l-7 1" stroke={GH} strokeWidth="2" strokeLinecap="round" opacity=".6" />
    <path d="M51 58Q44 38 30 24" stroke="#4f8a3a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    <g fill="#6fb04a" {...OC} strokeWidth="1.4">{[[44, 44, -30], [40, 36, 30], [36, 32, -40], [32, 26, 20], [47, 50, 30]].map(([x, y, a], i) => <ellipse key={i} cx={x} cy={y} rx="6" ry="3" transform={`rotate(${a} ${x} ${y})`} />)}</g>
    <path d="M40 86h20l3 6H37Z" fill="#a8b2bc" {...OC} />
    <path d="M20 58H80Q78 84 50 86Q22 84 20 58Z" fill="#c8d0d8" {...OC} />
    <path d="M25 68H75" stroke="#8a96a4" strokeWidth="3" /><g fill="#8a96a4">{P(5, i => <circle key={i} cx={32 + i * 9} cy="76" r="1.8" />)}</g>
    <path d="M28 62Q26 74 34 80" stroke="#eef2f6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <ellipse cx="50" cy="58" rx="30" ry="6" fill="#7fd0ff" {...OC} /><ellipse cx="56" cy="58" rx="10" ry="2" fill="#c8ecff" />
    <path d={drop(64, 44, 3)} fill="#7fd0ff" /><path d={drop(72, 50, 2.4)} fill="#7fd0ff" /><path d={drop(24, 46, 2.4)} fill="#7fd0ff" />
    <Sparks pts={[[18, 24, 5], [84, 64, 4], [60, 26, 3]]} fill="#e8f8ff" />
  </g>,
  steal: () => <g><Night />
    <path d="M4 44Q8 22 26 24Q38 14 48 28Q52 44 36 46H4Z" fill="#0b1418" />
    <ellipse cx="22" cy="35" rx="3.5" ry="2" fill="#ffd34d" /><ellipse cx="33" cy="35" rx="3.5" ry="2" fill="#ffd34d" />
    <path d="M97 22L74 40" stroke="#2a2030" strokeWidth="13" strokeLinecap="round" />
    <path d="M48 54Q40 70 44 82Q56 92 72 82Q76 66 66 54Z" fill="#a8803c" {...OC} />
    <path d="M52 52l-4 -9M57 50v-10M62 52l4 -9" stroke={OI} strokeWidth="6" strokeLinecap="round" /><path d="M52 52l-4 -9M57 50v-10M62 52l4 -9" stroke="#a8803c" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M47 54Q57 48 67 54" stroke="#6b4a1e" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M50 66Q48 76 54 82" stroke="#c8a060" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <circle cx="60" cy="71" r="7" fill="#ffd34d" {...OC} /><circle cx="60" cy="71" r="3.5" fill="none" stroke="#c89a20" strokeWidth="1.6" />
    <ellipse cx="70" cy="44" rx="8" ry="6.5" fill={SK2} {...OC} /><path d="M65 41h8M65 45h9" stroke="#b07a4a" strokeWidth="1.4" strokeLinecap="round" />
    <g stroke="#e8f5d0" strokeWidth="2" strokeLinecap="round" opacity=".7"><path d="M80 52l6 3" /><path d="M78 60l6 1" /></g>
    <ellipse cx="34" cy="90" rx="4" ry="1.8" fill="#ffd34d" /><ellipse cx="80" cy="88" rx="3.5" ry="1.6" fill="#ffd34d" />
  </g>,
  scapegoat: () => <g><Night />
    <path d="M36 30Q26 14 38 8Q34 20 44 28Z" fill="#c9a46a" {...OC} /><path d="M64 30Q74 14 62 8Q66 20 56 28Z" fill="#c9a46a" {...OC} />
    <ellipse cx="28" cy="42" rx="10" ry="4.5" fill="#e6dccb" {...OC} transform="rotate(20 28 42)" /><ellipse cx="72" cy="42" rx="10" ry="4.5" fill="#e6dccb" {...OC} transform="rotate(-20 72 42)" />
    <path d="M46 76Q50 94 54 76Z" fill="#efe7d6" {...OC} />
    <path d="M36 32Q50 24 64 32Q66 52 60 66Q56 78 50 78Q44 78 40 66Q34 52 36 32Z" fill="#efe7d6" {...OC} />
    <ellipse cx="50" cy="68" rx="9" ry="7" fill="#d8cdb8" />
    <ellipse cx="47" cy="68" rx="1.6" ry="1.2" fill={OI} /><ellipse cx="53" cy="68" rx="1.6" ry="1.2" fill={OI} />
    <ellipse cx="43" cy="48" rx="4" ry="5" fill="#fff" {...OC} strokeWidth="1.4" /><ellipse cx="57" cy="48" rx="4" ry="5" fill="#fff" {...OC} strokeWidth="1.4" />
    <circle cx="43" cy="50" r="2.2" fill={OI} /><circle cx="57" cy="50" r="2.2" fill={OI} />
    <path d="M38 42L47 39M62 42L53 39" stroke={OI} strokeWidth="2" strokeLinecap="round" />
    <path d="M2 64H10" stroke="#3a5a6a" strokeWidth="9" />
    <path d="M8 57H25Q28 57 28 60Q28 63 25 63H8Z" fill={SK2} {...OC} /><circle cx="11" cy="64" r="6" fill={SK2} {...OC} />
    <g stroke={BLOOD} strokeWidth="3" strokeLinecap="round"><path d="M74 26l6 -6" /><path d="M78 32l8 -2" /><path d="M70 21l2 -8" /></g>
  </g>,
  ordain: () => <g><Night moon={false} bg="#1d2a30" />
    <circle cx="50" cy="40" r="28" fill="#ffd34d" opacity=".16" /><circle cx="50" cy="40" r="20" fill="#ffd34d" opacity=".2" />
    <path d="M20 94Q20 64 50 58Q80 64 80 94Z" fill="#e8892a" {...OC} />
    <path d="M34 62Q50 78 72 92" stroke="#c8661a" strokeWidth="7" fill="none" />
    <path d="M28 76q4 8 4 16M62 70q4 10 4 22" stroke="#c8661a" strokeWidth="1.6" fill="none" />
    <ellipse cx="50" cy="83" rx="11" ry="5" fill="#e9b98a" {...OC} />
    <ellipse cx="35" cy="42" rx="3" ry="4.5" fill="#e9b98a" {...OC} /><ellipse cx="65" cy="42" rx="3" ry="4.5" fill="#e9b98a" {...OC} />
    <circle cx="50" cy="40" r="15" fill="#e9b98a" {...OC} />
    <path d="M37 36Q50 22 63 36Q50 30 37 36Z" fill="#d49a6a" />
    <path d="M42 42q3 2 6 0M52 42q3 2 6 0" stroke={OI} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M46 49q4 2 8 0" stroke={OI} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <Sparks pts={[[18, 22, 4], [82, 20, 5], [84, 54, 3]]} fill="#ffe9a0" />
  </g>,
  amulet: () => <g><Night moon={false} bg="#1e2626" />
    <circle cx="50" cy="64" r="30" fill="none" stroke="#ffd34d" strokeWidth="2" opacity=".25" /><circle cx="50" cy="64" r="22" fill="#ffd34d" opacity=".12" />
    <g stroke="#ffd34d" strokeWidth="2" strokeLinecap="round" opacity=".4">{P(8, i => <path key={i} d="M50 30V24" transform={`rotate(${i * 45} 50 64)`} />)}</g>
    <path d="M50 8Q30 28 40 46M50 8Q70 28 60 46" stroke={BLOOD} strokeWidth="2.5" fill="none" />
    <rect x="38" y="42" width="24" height="46" rx="11" fill="#d4a642" {...OC} />
    <path d="M54 46V84" stroke="#b08628" strokeWidth="5" strokeLinecap="round" /><path d="M43 48V82" stroke="#ffe08a" strokeWidth="2.5" strokeLinecap="round" />
    <g stroke="#7a5a1a" strokeWidth="1.4" fill="none">{[56, 66, 76].map(y => <path key={y} d={`M42 ${y}l4 -3l4 3l4 -3l4 3`} />)}</g>
    <g fill={BLOOD}>{[49, 59, 69, 79].map(y => <rect key={y} x="37" y={y} width="26" height="3.5" rx="1.5" />)}</g>
    <Sparks pts={[[22, 40, 5], [78, 36, 4], [80, 80, 3]]} fill="#fff3b0" />
  </g>,
  bind: () => <g><Night moon={false} bg="#20222e" />
    <circle cx="50" cy="56" r="26" fill="#ff8fa3" opacity=".14" />
    <path d="M4 80L34 58L42 68L12 92Z" fill="#d9a06a" {...OC} /><path d="M4 80L16 71L24 83L12 92Z" fill="#3a5a6a" {...OC} />
    <path d="M96 80L66 58L58 68L88 92Z" fill="#c08a5a" {...OC} /><path d="M96 80L84 71L76 83L88 92Z" fill="#6a2a3a" {...OC} />
    <ellipse cx="50" cy="62" rx="14" ry="10" fill="#e0aa74" {...OC} />
    <path d="M42 58q8 -4 16 0M42 64q8 -3 16 0" stroke="#a87444" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <g stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"><path d="M29 59q3 7 9 11" /><path d="M33 56q3 7 9 11" /><path d="M71 59q-3 7 -9 11" /><path d="M67 56q-3 7 -9 11" /><path d="M37 58Q50 50 63 58" /></g>
    <path d="M38 69q2 10 -4 16M62 69q-2 10 4 16" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".85" />
    <path d={heart(50, 30, 11)} fill={BLOOD} {...OC} /><path d="M44 26q2 -3 5 -2" stroke="#ff8a98" strokeWidth="2" fill="none" strokeLinecap="round" />
    <Sparks pts={[[24, 24, 4], [78, 22, 5]]} fill="#ffe0e6" />
  </g>,
  // 🐈‍⬛ แมวดำ: นั่งบนเสื่อใต้แสงจันทร์ ตาเรืองเขียว หางม้วน
  blackcat: () => <g><Night scene={false} bg="#142228" />
    <ellipse cx="50" cy="86" rx="34" ry="7" fill="#6b4a2a" {...OC} /><path d="M20 86h60M24 89h52" stroke="#8a6438" strokeWidth="1.2" />
    <path d="M70 84Q90 80 86 64Q84 56 78 60Q84 66 78 74Q72 80 62 80Z" fill="#07090b" {...OC} />
    <path d="M30 84Q26 62 36 50Q30 42 32 30L40 38Q50 34 60 38L68 30Q70 42 64 50Q74 62 70 84Z" fill="#0b0e11" {...OC} />
    <path d="M34 33L38 38M66 33L62 38" stroke="#3a1f2a" strokeWidth="2" />
    <circle cx="43" cy="47" r="6" fill={GH} opacity=".25" /><circle cx="57" cy="47" r="6" fill={GH} opacity=".25" />
    <ellipse cx="43" cy="47" rx="4" ry="3.2" fill={GH} /><ellipse cx="57" cy="47" rx="4" ry="3.2" fill={GH} />
    <ellipse cx="43" cy="47" rx=".9" ry="2.8" fill={OI} /><ellipse cx="57" cy="47" rx=".9" ry="2.8" fill={OI} />
    <path d="M48 53L52 53L50 55.5Z" fill="#c76a7a" /><path d="M50 55.5Q47 58 45 57M50 55.5Q53 58 55 57" stroke="#2c3a40" strokeWidth="1" fill="none" />
    <g stroke="#3a4a50" strokeWidth=".8"><path d="M44 55L34 53M44 56.5L34 58M56 55L66 53M56 56.5L66 58" /></g>
    <path d="M38 62Q50 68 62 62" stroke="#1d2a30" strokeWidth="1.4" fill="none" /><circle cx="50" cy="66" r="2.2" fill={BLOOD} {...OC} strokeWidth="1" />
  </g>,
  night: () => <g><rect x="2" y="2" width="96" height="96" rx="18" fill="#0a1216" />
    <g fill="#e8f5d0" opacity=".6">{[[14, 14], [28, 26], [86, 46], [10, 44], [58, 8], [40, 14], [90, 30]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? .9 : 1.3} />)}</g>
    <circle cx="72" cy="22" r="11" fill="#0a1216" stroke={GH} strokeWidth="1.5" opacity=".6" />
    <path d="M10 76Q10 36 50 30Q90 36 90 76Z" fill="#12242a" />
    <circle cx="38" cy="50" r="10" fill={GH} opacity=".2" /><circle cx="62" cy="50" r="10" fill={GH} opacity=".2" />
    <ellipse cx="38" cy="50" rx="7" ry="4" fill={GH} transform="rotate(15 38 50)" /><ellipse cx="62" cy="50" rx="7" ry="4" fill={GH} transform="rotate(-15 62 50)" />
    <ellipse cx="38" cy="50" rx="1.4" ry="3.5" fill={OI} /><ellipse cx="62" cy="50" rx="1.4" ry="3.5" fill={OI} />
    <path d={'M2 80L10 72L18 80L22 76L32 66L42 76V80H58L68 70L78 80L84 76L92 80H98' + BOT} fill="#04080a" />
    <rect x="30" y="72" width="3" height="3" fill="#ffb347" /><rect x="66" y="75" width="3" height="3" fill="#ffb347" opacity=".7" />
  </g>,
  ritual: () => <g><Night moon={false} bg="#152022" scene={false} />
    <path d={'M2 86Q50 80 98 86' + BOT} fill="#0b1418" />
    <path d="M10 94Q10 79 22 79Q34 79 34 94Z" fill="#0b1418" stroke="#2c4a4a" strokeWidth="1.5" /><circle cx="22" cy="68" r="9" fill="#0b1418" stroke="#2c4a4a" strokeWidth="1.5" />
    <path d="M66 94Q66 79 78 79Q90 79 90 94Z" fill="#0b1418" stroke="#2c4a4a" strokeWidth="1.5" /><circle cx="78" cy="68" r="9" fill="#0b1418" stroke="#2c4a4a" strokeWidth="1.5" />
    <circle cx="75" cy="68" r="1.6" fill={GH} /><circle cx="81" cy="68" r="1.6" fill={GH} />
    <path d="M24 56Q50 4 76 54" stroke={GH} strokeWidth="3" fill="none" strokeDasharray="2 6" strokeLinecap="round" />
    <path d="M77 58l-7 -7l9 -2Z" fill={GH} />
    <circle cx="50" cy="32" r="16" fill={GH} opacity=".2" />
    <path d="M38 34Q38 16 50 16Q62 16 62 34V48L58 44L54 48L50 44L46 48L42 44L38 48Z" fill={GH} {...OC} />
    <path d="M38 34Q38 16 50 16Q62 16 62 34Q58 22 50 22Q42 22 38 34Z" fill="#14100f" />
    <circle cx="45.5" cy="31" r="2.4" fill={BLOOD} /><circle cx="54.5" cy="31" r="2.4" fill={BLOOD} />
    <path d="M46 38q4 3 8 0" stroke={OI} strokeWidth="1.8" fill="none" strokeLinecap="round" />
  </g>,
  // ไพ่ดวง
  dark: () => <g><rect x="2" y="2" width="96" height="96" rx="18" fill="#2a0c12" /><circle cx="50" cy="50" r="40" fill={BLOOD} opacity=".22" />
    <path d="M18 60Q12 22 50 14Q88 22 82 60Q88 80 78 94L71 74L64 96L58 76L50 97L42 76L36 96L29 74L22 94Q12 80 18 60Z" fill="#0d0a0a" />
    <ellipse cx="50" cy="52" rx="21" ry="25" fill="#cfe6bf" {...OC} />
    <path d="M32 60Q36 70 44 74M68 60Q64 70 56 74" stroke="#a8c49a" strokeWidth="1.8" fill="none" />
    <path d="M28 45Q38 32 50 38Q62 32 72 45Q61 39 50 44Q39 39 28 45Z" fill="#0d0a0a" />
    <path d="M34 57q7 4 14 0M52 57q7 4 14 0" stroke="#8aa680" strokeWidth="1.5" fill="none" />
    <circle cx="41" cy="51" r="7" fill="#ff3040" opacity=".3" /><circle cx="59" cy="51" r="7" fill="#ff3040" opacity=".3" />
    <ellipse cx="41" cy="51" rx="6" ry="4.5" fill="#fff" /><ellipse cx="59" cy="51" rx="6" ry="4.5" fill="#fff" />
    <circle cx="41" cy="51" r="3" fill="#e0303a" /><circle cx="59" cy="51" r="3" fill="#e0303a" /><circle cx="41" cy="51" r="1.2" fill={OI} /><circle cx="59" cy="51" r="1.2" fill={OI} />
    <path d="M37 64Q50 73 63 64Q59 78 50 78Q41 78 37 64Z" fill="#3a0d14" {...OC} strokeWidth="1.6" />
    <path d="M41 65L44 71L46 66ZM54 66L56 71L59 65Z" fill="#fff" />
    <path d="M47 73Q45 88 52 95Q57 86 53 73Z" fill="#e0525a" />
    <path d={drop(37, 82, 2.6)} fill={BLOOD} /><path d={drop(62, 84, 2)} fill={BLOOD} />
    <g fill={GH} opacity=".6"><circle cx="14" cy="22" r="2" /><circle cx="88" cy="30" r="2.5" /></g>
  </g>,
  pure: () => <g><rect x="2" y="2" width="96" height="96" rx="18" fill="#ffe8f0" />
    <g fill="#fff" opacity=".7">{P(9, i => <path key={i} d="M50 66L46 14H54Z" transform={`rotate(${-80 + i * 20} 50 66)`} />)}</g>
    <path d={'M2 74Q50 66 98 74' + BOT} fill="#9fd8e8" />
    <path d="M14 88q8 -3 16 0M66 90q8 -3 16 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M20 76A30 7 0 1 0 80 76A30 7 0 0 0 54 69L50 76L46 69A30 7 0 0 0 20 76Z" fill="#4f9a3a" {...OC} />
    <g fill="#ff8fb4" {...O}>{[-64, -32, 32, 64].map(a => <path key={a} d="M50 72Q36 50 50 26Q64 50 50 72Z" transform={`rotate(${a} 50 72)`} />)}</g>
    <path d="M50 72Q36 50 50 22Q64 50 50 72Z" fill="#ff9fc0" {...O} />
    <g fill="#ffc8dc" {...O}>{[-30, 30].map(a => <path key={a} d="M50 73Q40 56 50 38Q60 56 50 73Z" transform={`rotate(${a} 50 73)`} />)}</g>
    <path d="M50 73Q42 58 50 44Q58 58 50 73Z" fill="#ffd8e6" {...O} />
    <ellipse cx="50" cy="70" rx="7" ry="3.5" fill="#ffd34d" {...O} strokeWidth="1.6" />
    <Sparks pts={[[18, 22, 5], [82, 24, 6], [86, 50, 3]]} fill="#ffb6cd" />
  </g>,
  shaman: () => <g><Night moon={false} bg="#2a2416" scene={false} />
    <path d={'M2 84Q50 78 98 84' + BOT} fill="#1a150c" />
    <g transform="rotate(-4 50 38)"><rect x="22" y="10" width="56" height="54" rx="2" fill="#f3e6c8" {...OC} />
      <rect x="27" y="15" width="46" height="44" fill="none" stroke={BLOOD} strokeWidth="1.5" />
      <circle cx="50" cy="37" r="15" fill="none" stroke={BLOOD} strokeWidth="2" /><path d="M50 23L63 45H37Z" fill="none" stroke={BLOOD} strokeWidth="2" strokeLinejoin="round" />
      <g fill={BLOOD}>{[[30, 18], [70, 18], [30, 56], [70, 56], [50, 37]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.8" />)}</g></g>
    <circle cx="50" cy="52" r="16" fill="#ffd34d" opacity=".22" />
    <g fill="#8a5530" {...OC} strokeWidth="1.2">{P(13, i => { const a = (15 + i * 12.5) * Math.PI / 180; return <circle key={i} cx={(50 + Math.cos(a) * 30).toFixed(1)} cy={(64 + Math.sin(a) * 26).toFixed(1)} r="3.4" />; })}</g>
    <rect x="45" y="58" width="10" height="30" rx="1.5" fill="#f6e6a0" {...OC} />
    <path d="M45 61q3 6 5 0q2 8 5 0" fill="#fff6c8" />
    <path d="M50 46V58" stroke={OI} strokeWidth="1.4" />
    <path d="M50 38Q58 49 50 56Q42 49 50 38Z" fill="#ffb347" {...OC} strokeWidth="1.6" /><path d="M50 46Q54 51 50 54Q46 51 50 46Z" fill="#fff1a0" />
  </g>,
};

// ===================== ⛏️ ขุดสมบัติป่าช้า — อุโมงค์ใต้ป่าช้าแสงตะเกียง =====================
const OD = { stroke: '#140b05', strokeWidth: 2.4, strokeLinejoin: 'round', strokeLinecap: 'round' };
const Tunnel = ({ glow = '#ffb84d', bg = '#2b1d13' }) => <g>
  <rect width="100" height="100" fill={bg} />
  <g fill="#3a2819">{[[6, 8], [24, 4], [90, 10], [94, 34], [4, 30], [70, 4]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? 1.5 : 2.2} />)}</g>
  <path d="M16 100V46Q16 14 50 14Q84 14 84 46V100Z" fill="#170f09" />
  <circle cx="50" cy="54" r="36" fill={glow} opacity=".13" /><circle cx="50" cy="54" r="22" fill={glow} opacity=".12" />
  <rect y="88" width="100" height="12" fill="#3a2819" />
  <rect x="9" y="28" width="8" height="72" fill="#6b4526" stroke="#24150b" strokeWidth="1.5" /><rect x="83" y="28" width="8" height="72" fill="#6b4526" stroke="#24150b" strokeWidth="1.5" />
  <rect x="5" y="22" width="90" height="9" rx="2" fill="#7a5030" stroke="#24150b" strokeWidth="1.5" />
  <g fill="#c8b090"><circle cx="13" cy="26.5" r="1.1" /><circle cx="87" cy="26.5" r="1.1" /></g>
  <g stroke="#4a3020" strokeWidth="1.6" fill="none" strokeLinecap="round"><path d="M30 31q-2 8 2 14q2 6 -1 10" /><path d="M70 31q2 6 -1 12" /><path d="M58 31q-1 4 1 7" /></g>
  <g stroke="#d8d0b8" strokeWidth="2.6" strokeLinecap="round"><path d="M22 94h9" /></g><g fill="#d8d0b8"><circle cx="21" cy="92.8" r="1.6" /><circle cx="21" cy="95.2" r="1.6" /><circle cx="32" cy="92.8" r="1.6" /><circle cx="32" cy="95.2" r="1.6" /></g>
</g>;
const Card = ({ x, y, a, c }) => <g transform={`rotate(${a} ${x} ${y + 14})`}><rect x={x - 9} y={y - 13} width="18" height="26" rx="3" fill={c} {...OD} strokeWidth="1.8" /><rect x={x - 5.5} y={y - 9.5} width="11" height="19" rx="1.5" fill="none" stroke="#fff" strokeWidth="1" opacity=".5" /></g>;
const arrow = (d, tip, c) => <g><path d={d} stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round" /><path d={tip} fill={c} /></g>;
const Mask = ({ x, y, a, c, evil }) => <g transform={`translate(${x} ${y}) rotate(${a})`}>
  <path d="M0 -17Q16 -17 18 0Q18 18 0 22Q-18 18 -18 0Q-16 -17 0 -17Z" fill={c} {...OD} />
  <path d="M-12 -10Q0 -14 12 -10" stroke="#fff" strokeWidth="2" fill="none" opacity=".4" strokeLinecap="round" />
  {evil ? <><path d="M-12 -3L-3 1L-12 3Z" fill="#140b05" /><path d="M12 -3L3 1L12 3Z" fill="#140b05" /><path d="M-9 9Q0 17 9 9Q0 12 -9 9Z" fill="#140b05" /></>
    : <><ellipse cx="-6.5" cy="0" rx="4" ry="3" fill="#140b05" /><ellipse cx="6.5" cy="0" rx="4" ry="3" fill="#140b05" /><path d="M-8 9Q0 16 8 9" stroke="#140b05" strokeWidth="2.6" fill="none" strokeLinecap="round" /></>}
</g>;

const DIG = {
  dig_pick: () => <g><Tunnel />
    <ellipse cx="54" cy="90" rx="30" ry="8" fill="#5a3e28" />
    <g fill="#8a7866" {...OD} strokeWidth="1.6"><path d={rock(76, 84, 5)} /><path d={rock(30, 86, 4)} /></g>
    <path d="M30 84L68 28" stroke="#140b05" strokeWidth="10" strokeLinecap="round" /><path d="M30 84L68 28" stroke="#a8703c" strokeWidth="6" strokeLinecap="round" /><path d="M33 78L63 34" stroke="#d09a5a" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M40 20Q74 -2 95 42Q80 22 68 28Q58 20 40 20Z" fill="#8a94a2" {...OD} />
    <path d="M50 14Q72 6 86 24" stroke="#d0d8e2" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <rect x="62" y="22" width="11" height="10" rx="2" fill="#5a6270" {...OD} strokeWidth="1.8" transform="rotate(34 67 27)" />
    <Sparks pts={[[22, 40, 6], [16, 56, 4], [86, 60, 4]]} fill="#ffd34d" />
  </g>,
  dig_lamp: () => <g><Tunnel glow="#ffcf6a" />
    <circle cx="50" cy="56" r="34" fill="#ffcf6a" opacity=".18" /><circle cx="50" cy="56" r="22" fill="#ffe28a" opacity=".22" />
    <path d="M50 0V14" stroke="#3a3a40" strokeWidth="2.5" />
    <path d="M36 30Q36 12 50 12Q64 12 64 30" stroke="#140b05" strokeWidth="5" fill="none" /><path d="M36 30Q36 12 50 12Q64 12 64 30" stroke="#5a6270" strokeWidth="2.6" fill="none" />
    <path d="M37 33Q30 52 38 72H62Q70 52 63 33Z" fill="#ffe9a8" {...OD} />
    <path d="M50 42Q59 54 50 66Q41 54 50 42Z" fill="#ff9a2e" /><path d="M50 50Q54 57 50 63Q46 57 50 50Z" fill="#fff3c0" />
    <path d="M43 33Q37 52 43 72M57 33Q63 52 57 72" stroke="#3a3a40" strokeWidth="2" fill="none" />
    <path d="M40 38Q37 46 39 54" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".8" />
    <path d="M32 33H68L61 24H39Z" fill="#c0392b" {...OD} />
    <path d="M32 72H68Q70 84 62 88H38Q30 84 32 72Z" fill="#c0392b" {...OD} />
    <path d="M36 77H50" stroke="#e8705a" strokeWidth="2.5" strokeLinecap="round" />
  </g>,
  dig_cart: () => <g><Tunnel />
    <g fill="#5a3418">{P(6, i => <rect key={i} x={4 + i * 17} y="88" width="9" height="5" rx="1" />)}</g>
    <path d="M0 87H100" stroke="#8a8a92" strokeWidth="3" />
    <g {...OD} strokeWidth="1.8"><circle cx="34" cy="40" r="7" fill="#ffd34d" /><circle cx="48" cy="36" r="8" fill="#7a6a5a" /><circle cx="62" cy="38" r="7" fill="#ffd34d" /><circle cx="72" cy="44" r="6" fill="#7a6a5a" /><circle cx="28" cy="46" r="5" fill="#7a6a5a" /><circle cx="54" cy="44" r="6" fill="#ffe680" /></g>
    <Sparks pts={[[40, 30, 4], [66, 28, 3.5]]} />
    <path d="M18 46H82L74 76H26Z" fill="#8a5a32" {...OD} />
    <path d="M22 56H78M24 66H76" stroke="#6b4222" strokeWidth="1.6" />
    <path d="M17 46H83" stroke="#5a6270" strokeWidth="5" strokeLinecap="round" />
    <path d="M30 47L34 75M70 47L66 75" stroke="#5a6270" strokeWidth="3.5" />
    <g fill="#c8ccd6"><circle cx="32" cy="52" r="1.3" /><circle cx="68" cy="52" r="1.3" /></g>
    <circle cx="34" cy="80" r="8" fill="#3a3a40" {...OD} /><circle cx="34" cy="80" r="3" fill="#a8b0bc" />
    <circle cx="66" cy="80" r="8" fill="#3a3a40" {...OD} /><circle cx="66" cy="80" r="3" fill="#a8b0bc" />
  </g>,
  dig_fall: () => <g><Tunnel glow="#ff8a4d" />
    <rect x="5" y="22" width="40" height="9" rx="2" fill="#7a5030" stroke="#24150b" strokeWidth="1.5" transform="rotate(14 45 26)" />
    <path d="M30 14L36 22L32 30L40 38M64 10L60 20L68 26L62 36" stroke="#0a0604" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
    <g fill="#8a7a68" opacity=".45">{[[20, 80, 12], [40, 84, 14], [64, 82, 13], [82, 80, 10]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
    <path d="M10 100L22 80L34 86L46 72L60 84L72 76L90 100Z" fill="#6a5a4a" {...OD} />
    <g fill="#8a7866" {...OD}><path d={rock(34, 44, 9)} /><path d={rock(62, 56, 11)} /><path d={rock(48, 26, 6)} /><path d={rock(74, 32, 5)} /></g>
    <g fill="#a8968a"><path d="M28 40l6 -3l4 4Z" /><path d="M55 50l8 -4l5 6Z" /></g>
    <g stroke="#e8d8c0" strokeWidth="2" strokeLinecap="round" opacity=".7"><path d="M34 30v-6" /><path d="M62 40v-7" /><path d="M58 40v-4" /><path d="M48 14v-4" /></g>
  </g>,
  dig_map: () => <g><Tunnel />
    <path d="M12 20L28 16L42 22L58 15L74 21L90 17L88 84L72 88L58 82L42 88L28 82L10 86Z" fill="#e8d4a0" {...OD} />
    <path d="M28 16L28 82M42 22L42 88M58 15L58 82M74 21L72 88" stroke="#c8b07a" strokeWidth="1.2" />
    <path d="M10 86L18 74L12 66Z" fill="#a8885a" opacity=".6" />
    <path d="M20 74Q28 50 44 56Q62 62 58 40Q56 30 70 30" stroke="#8a4a2a" strokeWidth="2.5" fill="none" strokeDasharray="3 4" strokeLinecap="round" />
    <path d="M66 24l9 9M75 24l-9 9" stroke="#c81e32" strokeWidth="4" strokeLinecap="round" />
    <g fill="#8a7a5a">{[[30, 36], [46, 42], [80, 52]].map(([x, y], i) => <path key={i} d={`M${x - 4} ${y + 5}V${y}Q${x - 4} ${y - 5} ${x} ${y - 5}Q${x + 4} ${y - 5} ${x + 4} ${y}V${y + 5}Z`} />)}</g>
    <circle cx="76" cy="72" r="8" fill="#f3e6c0" stroke="#8a4a2a" strokeWidth="1.5" /><path d="M76 64L78 72L76 80L74 72Z" fill="#c81e32" /><path d="M68 72L76 70L84 72L76 74Z" fill="#8a4a2a" />
  </g>,
  dig_role_d: () => <g><Tunnel glow="#ffd34d" />
    <path d="M54 32L100 4V44Z" fill="#fff3b0" opacity=".25" />
    <path d="M70 100L88 52" stroke="#140b05" strokeWidth="7" strokeLinecap="round" /><path d="M70 100L88 52" stroke="#a8703c" strokeWidth="4" strokeLinecap="round" />
    <path d="M82 50Q84 36 92 34Q100 40 96 54Q90 58 82 50Z" fill="#9aa4b2" {...OD} />
    <path d="M22 100Q22 72 50 70Q78 72 78 100Z" fill="#3a78c0" {...OD} />
    <path d="M38 72L36 100M62 72L64 100" stroke="#ffc93a" strokeWidth="4" />
    <circle cx="50" cy="52" r="16" fill={SKIN} {...OD} />
    <path d="M32 50Q32 28 50 28Q68 28 68 50Z" fill="#ffc93a" {...OD} />
    <path d="M28 50H72" stroke="#140b05" strokeWidth="7" strokeLinecap="round" /><path d="M28 50H72" stroke="#e0a020" strokeWidth="4" strokeLinecap="round" />
    <path d="M40 34Q46 30 52 30" stroke="#fff3b0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="38" r="5" fill="#fff7c0" {...OD} strokeWidth="1.8" />
    <circle cx="44" cy="57" r="2.2" fill="#140b05" /><circle cx="56" cy="57" r="2.2" fill="#140b05" />
    <path d="M44 62q6 5 12 0" stroke="#140b05" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <ellipse cx="38" cy="62" rx="3" ry="2" fill="#ff9a8a" opacity=".7" /><ellipse cx="61" cy="64" rx="3.5" ry="2" fill="#8a6a4a" opacity=".5" />
  </g>,
  dig_role_s: () => <g><Tunnel glow="#ff4a4a" />
    <path d="M20 100Q16 40 50 20Q84 40 80 100Z" fill="#2a1c2e" {...OD} />
    <path d="M30 98Q28 54 50 36Q72 54 70 98" stroke="#3e2a44" strokeWidth="2" fill="none" />
    <ellipse cx="50" cy="58" rx="17" ry="19" fill="#0e070c" />
    <circle cx="42" cy="55" r="6" fill="#ff3b4d" opacity=".3" /><circle cx="58" cy="55" r="6" fill="#ff3b4d" opacity=".3" />
    <path d="M37 51L47 55L37 58Z" fill="#ff3b4d" /><path d="M63 51L53 55L63 58Z" fill="#ff3b4d" />
    <path d="M40 66Q50 76 60 66Q50 70 40 66Z" fill="#ffe0e0" />
    <g transform="rotate(25 72 82)"><rect x="66" y="68" width="11" height="28" rx="2" fill="#d6303a" {...OD} /><path d="M66 74h11M66 90h11" stroke="#7a1a20" strokeWidth="1.6" /></g>
    <path d="M77 70q5 -6 2 -11" stroke="#c8b090" strokeWidth="2" fill="none" />
    <circle cx="79" cy="58" r="5" fill="#ff8a2e" opacity=".5" /><Sparks pts={[[79, 58, 6]]} fill="#fff3a0" />
    <ellipse cx="62" cy="88" rx="6" ry="5" fill="#8a6a8a" {...OD} strokeWidth="1.8" />
  </g>,
  dig_gold: () => <g><Tunnel glow="#ffd34d" />
    <g fill="#ffe680" opacity=".35">{P(10, i => <path key={i} d="M50 50L46 6H54Z" transform={`rotate(${i * 36} 50 50)`} />)}</g>
    <circle cx="50" cy="50" r="30" fill="#ffd34d" opacity=".22" />
    <path d="M20 52L24 24Q50 14 76 24L80 52Z" fill="#5a331a" {...OD} /><path d="M28 28Q50 20 72 28" stroke="#c8a040" strokeWidth="3" fill="none" />
    <g {...OD} strokeWidth="1.6">{[[30, 48], [40, 42], [50, 46], [60, 40], [70, 47], [36, 52], [56, 52], [46, 38], [64, 52]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="6.5" ry="4" fill={i % 3 ? '#ffd34d' : '#ffe680'} />)}</g>
    <path d={spark(43, 46, 4)} fill="#e0303a" /><path d={spark(62, 45, 3.5)} fill="#3fbf5a" />
    <rect x="18" y="52" width="64" height="34" rx="3" fill="#8a5530" {...OD} />
    <path d="M18 62H82M18 74H82" stroke="#6b3f22" strokeWidth="1.6" />
    <rect x="18" y="52" width="64" height="5" fill="#c8a040" {...OD} strokeWidth="1.6" />
    <path d="M29 52V86M71 52V86" stroke="#c8a040" strokeWidth="5" />
    <rect x="44" y="58" width="12" height="12" rx="2" fill="#ffd34d" {...OD} strokeWidth="1.6" /><circle cx="50" cy="63" r="1.8" fill="#140b05" />
    <g fill="#ffd34d" {...OD} strokeWidth="1.4"><ellipse cx="14" cy="92" rx="5" ry="2.5" /><ellipse cx="88" cy="90" rx="5" ry="2.5" /></g>
    <Sparks pts={[[22, 18, 5], [80, 14, 6], [88, 40, 3.5]]} />
  </g>,
  dig_rock: () => <g><Tunnel glow="#8a9aa8" bg="#241b14" />
    <path d="M18 84Q14 58 30 46Q40 32 58 36Q78 38 84 58Q90 76 80 86Z" fill="#7d7468" {...OD} />
    <path d="M58 36Q78 38 84 58Q90 76 80 86H62Q76 72 70 52Q66 42 58 36Z" fill="#625a50" />
    <path d="M30 50Q38 40 50 40" stroke="#9a9084" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M44 58L50 66L46 74M64 48L60 56" stroke="#3e3830" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <circle cx="24" cy="88" r="6" fill="#e8e2cc" {...OD} strokeWidth="1.6" /><circle cx="22" cy="87" r="1.5" fill="#140b05" /><circle cx="26.5" cy="87" r="1.5" fill="#140b05" />
    <path d="M78 34L92 34M85 27L85 41M80 29L90 39M90 29L80 39" stroke="#c8c8c8" strokeWidth=".8" opacity=".55" />
  </g>,
  dig_spy: () => <g><Tunnel glow="#9adcff" />
    <rect x="20" y="22" width="40" height="56" rx="4" fill="#3a2a5a" {...OD} transform="rotate(-8 40 50)" />
    <rect x="25" y="27" width="30" height="46" rx="2" fill="none" stroke="#7a6aa8" strokeWidth="1.5" transform="rotate(-8 40 50)" />
    <path d="M70 62L88 84" stroke="#140b05" strokeWidth="11" strokeLinecap="round" /><path d="M70 62L88 84" stroke="#8a5a32" strokeWidth="6.5" strokeLinecap="round" />
    <circle cx="56" cy="48" r="20" fill="#cfeeff" />
    <circle cx="56" cy="43" r="6.5" fill="#2a1c2e" /><path d="M45 61Q45 51 56 51Q67 51 67 61Z" fill="#2a1c2e" />
    <circle cx="53.5" cy="42" r="1.3" fill="#ffd34d" /><circle cx="58.5" cy="42" r="1.3" fill="#ffd34d" />
    <circle cx="56" cy="48" r="20" fill="none" stroke="#c8a040" strokeWidth="5" /><circle cx="56" cy="48" r="22.5" fill="none" {...OD} />
    <path d="M44 40q3 -6 9 -8" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </g>,
  dig_mask: () => <g><Tunnel glow="#c89aff" />
    {arrow('M20 28Q50 8 78 26', 'M82 30l-10 0l6 -9Z', '#ffe9a8')}
    {arrow('M80 80Q50 98 22 80', 'M18 76l10 0l-6 9Z', '#ffe9a8')}
    <Mask x={37} y={54} a={-14} c="#ffc93a" /><Mask x={64} y={54} a={14} c="#d6303a" evil />
  </g>,
  dig_swap: () => <g><Tunnel glow="#7fe0b0" />
    {arrow('M26 28Q50 10 72 26', 'M76 30l-10 0l5 -9Z', '#7fe0b0')}
    {arrow('M74 84Q50 98 28 84', 'M24 80l10 0l-5 9Z', '#ffc93a')}
    {[-16, 0, 16].map(a => <Card key={'l' + a} x={30} y={54} a={a} c="#ffc93a" />)}
    {[-16, 0, 16].map(a => <Card key={'r' + a} x={70} y={54} a={a} c="#3fbf8a" />)}
  </g>,
};

export const CARD_ART = { ...BOOM, ...CURSE, ...DIG };
