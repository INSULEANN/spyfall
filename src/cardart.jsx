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

// ===================== ค่าสีร่วม =====================
const INK = '#3b2412', SKIN = '#f6c99a';
const O = { stroke: INK, strokeWidth: 2.2, strokeLinejoin: 'round', strokeLinecap: 'round' };
const BOT = 'V80Q98 98 80 98H20Q2 98 2 80Z';
// ===================== 😾 กล่องแมวโมโห — ห้องพัสดุ กล่องกระดาษ แมวส้มขี้โมโห =====================
// ฉากหลัง: ไล่สี + ลายจุด + แสงกระจาย
const Bg = ({ id, a, b, dot = '#ffffff', rays }) => <g>
  <defs><linearGradient id={id} x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
  <rect width="100" height="100" fill={`url(#${id})`} />
  {rays && <g fill={rays} opacity=".35">{P(12, i => <path key={i} d="M50 50L46 -10H54Z" transform={`rotate(${i * 30} 50 50)`} />)}</g>}
  <g fill={dot} opacity=".18">{P(16, i => <circle key={i} cx={(i * 37) % 100} cy={(i * 59) % 100} r={1.2 + (i % 3) * .5} />)}</g>
</g>;
// กล่องพัสดุกระดาษลูกฟูก (มองเฉียง) • open = ฝาเปิด
const Box = ({ x = 50, y = 70, s = 1, open, tape = true }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cx="0" cy="22" rx="30" ry="5" fill="#000" opacity=".18" />
  <path d="M-26 -6L0 -14L26 -6V18L0 26L-26 18Z" fill="#c8894e" {...O} />
  <path d="M0 -14V26" stroke={INK} strokeWidth="1.4" opacity=".35" /><path d="M-26 -6L0 2L26 -6" fill="none" stroke={INK} strokeWidth="1.6" />
  <path d="M-26 -6L0 2V26L-26 18Z" fill="#b5763d" />
  <path d="M-22 2l8 2.4M-22 7l8 2.4" stroke="#8a5428" strokeWidth="1" opacity=".7" />
  <rect x="5" y="6" width="14" height="9" rx="1" fill="#fff8e7" stroke="#8a5428" strokeWidth=".8" transform="skewY(-17)" /><path d="M8 10h8M8 12.6h5" stroke="#8a5428" strokeWidth=".7" transform="skewY(-17)" />
  {open ? <g><path d="M-26 -6L-34 -24L-8 -32L0 -14Z" fill="#d99a5e" {...O} /><path d="M26 -6L34 -24L8 -32L0 -14Z" fill="#e2a86c" {...O} /><path d="M-26 -6L0 2L26 -6L0 -14Z" fill="#3b2412" opacity=".85" /></g>
    : tape && <path d="M-13 -10L13 -2" stroke="#e8c27a" strokeWidth="4" />}
</g>;
// แมวส้ม (หน้า) • mood: mad / calm / happy
const Cat = ({ x = 50, y = 50, s = 1, mood = 'calm' }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M-15 -8L-19 -28L-3 -17zM15 -8L19 -28L3 -17z" fill="#f28a2e" {...O} /><path d="M-14 -12L-16 -23L-7 -17zM14 -12L16 -23L7 -17z" fill="#ff9fb0" />
  <ellipse cx="0" cy="0" rx="20" ry="17" fill="#f6a04a" {...O} />
  <path d="M0 -17v7M-6 -16l2 6M6 -16l-2 6" stroke="#d26a1c" strokeWidth="2.2" strokeLinecap="round" />
  <ellipse cx="0" cy="7" rx="10" ry="7" fill="#fff4e2" />
  {mood === 'mad' ? <g>
    <path d="M-13 -6l9 4M13 -6l-9 4" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
    <ellipse cx="-8" cy="1" rx="4.4" ry="3.6" fill="#ffd60a" stroke={INK} strokeWidth="1.4" /><ellipse cx="8" cy="1" rx="4.4" ry="3.6" fill="#ffd60a" stroke={INK} strokeWidth="1.4" />
    <ellipse cx="-8" cy="1.4" rx="1" ry="3" fill={INK} /><ellipse cx="8" cy="1.4" rx="1" ry="3" fill={INK} />
    <path d="M-7 10q7 -4 14 0q-2 7 -7 7t-7 -7z" fill="#9d0208" stroke={INK} strokeWidth="1.4" /><path d="M-5 10l1.6 4 1.4 -3.4M5 10l-1.6 4 -1.4 -3.4" fill="#fff" />
  </g> : mood === 'happy' ? <g>
    <path d="M-11 0q3 -4 6 0M5 0q3 -4 6 0" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <path d="M-4 9q4 4 8 0" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" /><circle cx="-13" cy="6" r="2.6" fill="#ff8fa3" opacity=".7" /><circle cx="13" cy="6" r="2.6" fill="#ff8fa3" opacity=".7" />
  </g> : <g>
    <ellipse cx="-8" cy="0" rx="3.4" ry="4" fill={INK} /><ellipse cx="8" cy="0" rx="3.4" ry="4" fill={INK} /><circle cx="-9" cy="-1.4" r="1.2" fill="#fff" /><circle cx="7" cy="-1.4" r="1.2" fill="#fff" />
    <path d="M-3 9q3 2 3 0q0 2 3 0" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </g>}
  <path d="M-1.6 5h3.2l-1.6 2z" fill="#ff6b81" />
  <g stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity=".9"><path d="M-10 7l-14 -2M-10 9.6l-14 3M10 7l14 -2M10 9.6l14 3" /></g>
</g>;
// ไพ่ใบเล็ก
const MiniCard = ({ x, y, a = 0, c = '#fff', mark, s = 1 }) => <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
  <rect x="-10" y="-14" width="20" height="28" rx="3" fill={c} {...O} strokeWidth="1.8" /><rect x="-6.5" y="-10.5" width="13" height="21" rx="1.6" fill="none" stroke={INK} strokeWidth=".8" opacity=".35" />
  {mark}
</g>;
const Hand = ({ x, y, a = 0, s = 1, sleeve = '#4361ee' }) => <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
  <rect x="-22" y="-5" width="14" height="10" rx="2" fill={sleeve} {...O} strokeWidth="1.8" />
  <path d="M-8 -5h12q5 0 5 3.4t-5 3.4h-4q6 0 6 3t-6 3h-8z" fill={SKIN} {...O} strokeWidth="1.8" />
</g>;
const Arc = ({ d, c = '#fff', w = 3.6 }) => <path d={d} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" />;
const Tip = ({ x, y, a, c = '#fff', s = 1 }) => <path d="M0 -5L8 0L0 5Z" fill={c} transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`} />;

const BOOM = {
  // 😾 แมวโมโห — กล่องระเบิดเปิด แมวพุ่งออกมากางเล็บ
  bomb: () => <g><Bg id="bx-bomb" a="#ffb347" b="#e63946" rays="#ffe08a" dot="#fff" />
    <path d={spiky(50, 50, 40, 38, 13, .34)} fill="#ff5a36" opacity=".85" /><path d={spiky(50, 50, 30, 28, 13, .3, -1.3)} fill="#ffd166" />
    <Box x={50} y={76} s={.9} open />
    <g transform="translate(50 46)">
      <path d="M-24 20q-14 -6 -18 -16M24 20q14 -6 18 -16" stroke="#f6a04a" strokeWidth="7" strokeLinecap="round" fill="none" /><path d="M-24 20q-14 -6 -18 -16M24 20q14 -6 18 -16" stroke={INK} strokeWidth="9.4" strokeLinecap="round" fill="none" opacity=".0" />
      <g fill="#fff" stroke={INK} strokeWidth="1"><path d="M-44 4l-4 -4 5 1zM-42 1l-2 -6 4 4zM-39 -1l1 -6 2 5z" /><path d="M44 4l4 -4 -5 1zM42 1l2 -6 -4 4zM39 -1l-1 -6 -2 5z" /></g>
      <Cat x={0} y={0} s={1.15} mood="mad" />
    </g>
    <g stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".9"><path d="M8 18l7 5M6 30l8 2M92 18l-7 5M94 30l-8 2" /></g>
    <Sparks pts={[[14, 46, 4], [86, 48, 4.4], [20, 12, 3], [80, 10, 3]]} fill="#fff6c0" />
  </g>,
  // 🐟 ปลาทูง้อแมว — ปลาทูในเข่ง แมวหายโกรธ
  clip: () => <g><Bg id="bx-clip" a="#bdf0d2" b="#6cc79a" rays="#e9fff2" />
    <g fill="#ff8fa3">{[[18, 22], [82, 18], [86, 40], [14, 42]].map(([x, y], i) => <path key={i} d={heart(x, y, 4 + (i % 2))} />)}</g>
    <Cat x={50} y={38} s={1} mood="happy" />
    <g transform="translate(50 76)">
      <ellipse cx="0" cy="10" rx="32" ry="5" fill="#000" opacity=".15" />
      <path d="M-30 -2q30 18 60 0l-4 12q-26 10 -52 0z" fill="#d9a15b" {...O} />
      <g stroke="#9c6a32" strokeWidth="1">{P(9, i => <path key={i} d={`M${-26 + i * 6.5} 0l2 11`} />)}</g>
      {[[-14, -4, -12], [0, -7, 4], [14, -3, 16]].map(([fx, fy, a], i) => <g key={i} transform={`translate(${fx} ${fy}) rotate(${a})`}>
        <path d="M-12 0q6 -6 16 -4q6 2 8 4q-2 2 -8 4q-10 2 -16 -4z" fill="#9fb3c8" {...O} strokeWidth="1.6" /><path d="M-6 -2q6 -2 14 0" stroke="#e8eef4" strokeWidth="1.6" fill="none" />
        <path d="M-12 0l-6 -5v10z" fill="#7d93aa" {...O} strokeWidth="1.4" /><circle cx="8" cy="-.6" r="1.4" fill={INK} /><path d="M4 -4v8" stroke="#6b7f95" strokeWidth=".8" />
      </g>)}
    </g>
    <g fill="#fff" opacity=".8"><path d="M30 60q-3 -6 1 -10M70 60q3 -6 -1 -10" stroke="#fff" strokeWidth="1.4" fill="none" /></g>
  </g>,
  // ✋ ยกเลิก! — มือหยุดใหญ่ทับไพ่ที่ถูกขีดฆ่า
  nope: () => <g><Bg id="bx-nope" a="#ffd6dc" b="#ff8fa3" rays="#fff0f3" />
    <MiniCard x={30} y={64} a={-14} c="#fff3c4" mark={<path d="M-5 -5l10 10M5 -5l-10 10" stroke="#e63946" strokeWidth="2.6" strokeLinecap="round" />} />
    <MiniCard x={70} y={64} a={12} c="#d7ecff" mark={<path d="M-5 -5l10 10M5 -5l-10 10" stroke="#e63946" strokeWidth="2.6" strokeLinecap="round" />} />
    <circle cx="50" cy="46" r="33" fill="#fff" stroke="#e63946" strokeWidth="7" /><path d="M27 23L73 69" stroke="#e63946" strokeWidth="7" strokeLinecap="round" opacity=".9" />
    <g transform="translate(50 50)">
      <path d="M-14 22q-6 -10 -6 -20v-12q0 -4 3.6 -4t3.6 4v8v-20q0 -4 3.8 -4t3.8 4v18v-22q0 -4 3.8 -4t3.8 4v22v-18q0 -4 3.8 -4t3.6 4v26l3 -6q2 -4 5.4 -2.4t1.6 5.4l-6 14q-4 8 -12 8h-6q-7 0 -10 -4z" fill={SKIN} {...O} />
      <path d="M-5 -24v18M3 -26v20M11 -22v16" stroke="#d99a6c" strokeWidth="1" opacity=".7" />
    </g>
    <Sparks pts={[[14, 18, 4], [88, 20, 3.4]]} fill="#fff" />
  </g>,
  // ⏭️ ข้ามตา — กล่องกระโดดข้ามเก้าอี้ว่าง ลูกศรข้าม
  skip: () => <g><Bg id="bx-skip" a="#cfe6ff" b="#7fb2ff" rays="#eef6ff" />
    <path d="M0 84H100V100H0Z" fill="#5a78b8" /><path d="M0 84H100" stroke="#3b4f7a" strokeWidth="2" />
    <g transform="translate(50 74)"><rect x="-12" y="-14" width="24" height="4" rx="1.6" fill="#9c6644" {...O} strokeWidth="1.6" /><path d="M-10 -10v20M10 -10v20M-10 -2h20" stroke="#7f5539" strokeWidth="3" strokeLinecap="round" /><path d="M-12 -14v-16h24v16" fill="#b08968" {...O} strokeWidth="1.6" /></g>
    <Arc d="M14 64Q50 4 86 60" c="#fff" w="4.4" /><Tip x={86} y={60} a={62} s={1.3} />
    <Box x={24} y={64} s={.42} />
    <g transform="translate(78 70)"><circle r="11" fill="#ffd166" {...O} /><path d="M-5 -5l6 5 -6 5zM1 -5l6 5 -6 5z" fill={INK} /></g>
    <g fill="#fff" opacity=".8"><circle cx="40" cy="20" r="1.4" /><circle cx="60" cy="16" r="1.2" /></g>
  </g>,
  // 🎯 ส่งต่อ 2 ตา — มือผลักกล่องไปทางขวา ป้าย ×2
  attack: () => <g><Bg id="bx-attack" a="#ffe5b4" b="#ff9e57" rays="#fff4dc" />
    <path d="M0 82H100V100H0Z" fill="#d17b3f" /><g stroke="#b5652d" strokeWidth="1">{P(6, i => <path key={i} d={`M${i * 18 + 4} 86h10`} />)}</g>
    <Hand x={22} y={60} s={1.25} sleeve="#2a9d8f" />
    <Box x={56} y={62} s={.62} />
    <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><path d="M74 50h10M76 58h12M74 66h10" /></g>
    <Arc d="M60 28Q80 16 94 30" c="#e63946" w="4" /><Tip x={94} y={30} a={45} c="#e63946" s={1.2} />
    <g transform="translate(78 22) rotate(10)"><rect x="-13" y="-9" width="26" height="18" rx="5" fill="#e63946" {...O} /><text y="5" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff" fontFamily="sans-serif">×2</text></g>
  </g>,
  // 🔍 ดู 3 ใบบน — แว่นขยายส่องไพ่ 3 ใบบนกอง
  future: () => <g><Bg id="bx-future" a="#e2d7ff" b="#9d8cff" rays="#f4f0ff" />
    <g>{[0, 1, 2, 3, 4].map(i => <rect key={i} x={22 - i * .6} y={74 - i * 3} width="40" height="10" rx="2" fill={i % 2 ? '#c8b6ff' : '#e9e1ff'} {...O} strokeWidth="1.4" />)}</g>
    <MiniCard x={26} y={40} a={-16} c="#fff3c4" mark={<text y="5" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK} fontFamily="sans-serif">1</text>} />
    <MiniCard x={44} y={36} a={0} c="#d7ecff" mark={<text y="5" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK} fontFamily="sans-serif">2</text>} />
    <MiniCard x={62} y={40} a={16} c="#ffd6dc" mark={<text y="5" textAnchor="middle" fontSize="13" fontWeight="900" fill={INK} fontFamily="sans-serif">3</text>} />
    <g transform="translate(70 62) rotate(-30)"><rect x="-4" y="12" width="8" height="24" rx="3" fill="#7f5539" {...O} /><circle r="16" fill="#cfefff" fillOpacity=".55" stroke="#ffd166" strokeWidth="5" /><circle r="16" fill="none" {...O} /><path d="M-9 -6q4 -6 11 -6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" /></g>
    <Sparks pts={[[86, 22, 4], [12, 18, 3]]} />
  </g>,
  // 🔀 สับกอง — ไพ่สองกองสับเข้าหากัน ลูกศรวน
  shuffle: () => <g><Bg id="bx-shuffle" a="#c9f2ff" b="#4cc9f0" rays="#ecfbff" />
    {[0, 1, 2].map(i => <MiniCard key={'l' + i} x={34 - i * 2} y={56 - i * 2} a={-24 + i * 4} c={['#ffd166', '#ff8fa3', '#9be7c4'][i]} />)}
    {[0, 1, 2].map(i => <MiniCard key={'r' + i} x={66 + i * 2} y={56 - i * 2} a={24 - i * 4} c={['#c8b6ff', '#ffd6a5', '#a0c4ff'][i]} />)}
    <Arc d="M22 26Q50 6 78 26" c="#fff" w="4.4" /><Tip x={78} y={26} a={35} s={1.3} />
    <Arc d="M78 86Q50 100 22 84" c="#fff" w="4.4" /><Tip x={22} y={84} a={200} s={1.3} />
    <g fill="#fff" opacity=".85"><path d="M48 46l4 -4M50 56l5 0M48 66l4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></g>
  </g>,
  // 🤲 ขอไพ่ 1 ใบ — มือหนึ่งยื่นไพ่ให้อีกมือที่แบรอ
  favor: () => <g><Bg id="bx-favor" a="#fff3b0" b="#ffc94d" rays="#fffbe0" />
    <g transform="translate(30 70)"><path d="M-30 4h18v12h-18z" fill="#ef476f" {...O} strokeWidth="1.8" /><path d="M-12 2q10 -6 22 -2q8 2 10 6q-2 4 -8 4h-12q-8 2 -12 0z" fill={SKIN} {...O} strokeWidth="1.8" /><path d="M-4 0q4 -3 8 -1M2 1q4 -2 8 0" stroke="#d99a6c" strokeWidth="1" fill="none" /></g>
    <MiniCard x={50} y={44} a={-10} c="#d7ecff" mark={<path d={heart(0, 0, 5)} fill="#ef476f" />} />
    <Hand x={78} y={36} a={200} s={1.1} sleeve="#4361ee" />
    <Arc d="M70 54Q60 66 42 64" c="#fff" w="3.4" /><Tip x={42} y={64} a={175} />
    <text x="20" y="28" fontSize="16" fontWeight="900" fill="#e85d04" fontFamily="sans-serif">1</text>
    <Sparks pts={[[86, 80, 4], [14, 44, 3]]} />
  </g>,
  // ⬇️ จั่วใบล่าง — มือดึงไพ่ใบล่างสุดออกจากกอง
  bottom: () => <g><Bg id="bx-bottom" a="#d8f3dc" b="#74c69d" rays="#f0fff4" />
    <g>{P(6, i => <rect key={i} x={30} y={22 + i * 6} width="40" height="9" rx="2" fill={i % 2 ? '#b7e4c7' : '#e9f5ec'} {...O} strokeWidth="1.4" />)}</g>
    <g transform="translate(56 66) rotate(8)"><rect x="-20" y="-5" width="40" height="11" rx="2" fill="#ffd166" {...O} strokeWidth="1.8" /><path d="M-14 0h20" stroke={INK} strokeWidth="1" opacity=".4" /></g>
    <Hand x={86} y={70} a={188} s={1.05} sleeve="#2d6a4f" />
    <g transform="translate(50 86)"><path d="M-6 -6v8h-6l12 10 12 -10h-6v-8z" fill="#fff" {...O} strokeWidth="1.6" /></g>
    <Sparks pts={[[14, 20, 3.4], [86, 18, 3]]} />
  </g>,
  // 🔄 ส่งไพ่ต่อทุกคน — ไพ่ 4 ใบวนรอบโต๊ะ ลูกศรตามเข็ม
  market: () => <g><Bg id="bx-market" a="#ffd6ff" b="#c77dff" rays="#fff0ff" />
    <circle cx="50" cy="52" r="20" fill="#9d6b3f" {...O} /><circle cx="50" cy="52" r="15" fill="#b5835a" />
    <Box x={50} y={50} s={.3} />
    {[[50, 20, 0, '#ffd166'], [82, 52, 90, '#9be7c4'], [50, 84, 180, '#a0c4ff'], [18, 52, 270, '#ff8fa3']].map(([x, y, a, c], i) => <MiniCard key={i} x={x} y={y} a={a} c={c} s={.72} />)}
    {[45, 135, 225, 315].map((a, i) => <g key={i} transform={`rotate(${a} 50 52)`}><Arc d="M36 22Q50 16 64 22" c="#fff" w="3" /><Tip x={64} y={22} a={20} s={.9} /></g>)}
  </g>,
  // ---- ของในพัสดุ 5 แบบ (ใช้จับคู่) — วางบนกล่องที่เปิดอยู่ ----
  f1: () => <g><Bg id="bx-f1" a="#ffe5ec" b="#ffb3c6" rays="#fff4f7" />
    <Box x={50} y={80} s={.8} open />
    <g transform="translate(50 46)">
      <circle cx="-13" cy="-15" r="6" fill="#b5835a" {...O} /><circle cx="13" cy="-15" r="6" fill="#b5835a" {...O} /><circle cx="-13" cy="-15" r="3" fill="#e6b98a" /><circle cx="13" cy="-15" r="3" fill="#e6b98a" />
      <ellipse cx="0" cy="14" rx="15" ry="14" fill="#b5835a" {...O} /><ellipse cx="0" cy="16" rx="8" ry="8" fill="#e6b98a" />
      <circle cx="0" cy="-4" r="15" fill="#c8915a" {...O} /><ellipse cx="0" cy="2" rx="6.4" ry="5" fill="#e6b98a" />
      <circle cx="-5.4" cy="-6" r="1.8" fill={INK} /><circle cx="5.4" cy="-6" r="1.8" fill={INK} /><ellipse cx="0" cy="0" rx="2.2" ry="1.6" fill={INK} /><path d="M-2.4 3q2.4 2 4.8 0" stroke={INK} strokeWidth="1" fill="none" />
      <path d="M-12 8l-8 8M12 8l8 8" stroke="#b5835a" strokeWidth="6" strokeLinecap="round" /><path d="M-6 9q6 4 12 0l-2 4h-8z" fill="#e63946" {...O} strokeWidth="1.2" />
    </g>
    <Sparks pts={[[16, 22, 3.4], [84, 26, 4]]} />
  </g>,
  f2: () => <g><Bg id="bx-f2" a="#d7ecff" b="#7fb2ff" rays="#eef6ff" />
    <Box x={50} y={80} s={.8} open />
    <g transform="translate(50 50) rotate(-8)">
      <path d="M-26 6q0 -16 10 -20q10 -2 16 6q6 6 16 6q10 2 10 10v4h-52z" fill="#fff" {...O} />
      <path d="M-26 12h52v4q0 4 -4 4h-44q-4 0 -4 -4z" fill="#e63946" {...O} />
      <path d="M-12 -12l4 14M-6 -12l4 12M0 -8l3 10" stroke="#3a86ff" strokeWidth="1.6" />
      <path d="M-14 -10q8 -4 14 0" stroke={INK} strokeWidth="1.4" fill="none" />
      <path d="M2 2l14 -4" stroke="#3a86ff" strokeWidth="3" strokeLinecap="round" /><path d="M-20 12v-2M-12 12v-2M-4 12v-2M4 12v-2M12 12v-2M20 12v-2" stroke="#9d0208" strokeWidth="1" />
    </g>
    <Sparks pts={[[16, 22, 3.4], [84, 20, 4]]} />
  </g>,
  f3: () => <g><Bg id="bx-f3" a="#fff3c4" b="#ffd166" rays="#fffbe8" />
    <Box x={50} y={80} s={.8} open />
    <g transform="translate(50 44) rotate(-6)">
      <path d="M-24 -18h24v34h-24z" fill="#ffffff" {...O} /><path d="M0 -18h24v34h-24z" fill="#f8f9fa" {...O} />
      <path d="M-24 -18h48" stroke="#e63946" strokeWidth="4" />
      <g stroke={INK} strokeWidth="1"><rect x="-21" y="-12" width="18" height="12" fill="#a0c4ff" /><rect x="3" y="-12" width="18" height="12" fill="#ffd6a5" /><rect x="-21" y="2" width="18" height="11" fill="#caffbf" /><rect x="3" y="2" width="18" height="11" fill="#ffc6ff" /></g>
      <circle cx="-12" cy="-6" r="3" fill="#f6c99a" stroke={INK} strokeWidth=".8" /><path d="M8 -4q4 -6 8 0" fill="#ff9e00" stroke={INK} strokeWidth=".8" /><path d="M-18 9l4 -4 4 4" stroke="#2d6a4f" strokeWidth="1.4" fill="none" />
      <path d="M8 6h8l-2 4h-6z" fill="#fff" stroke={INK} strokeWidth=".8" /><text x="12" y="9.4" fontSize="3.4" textAnchor="middle" fill={INK} fontWeight="700">POW</text>
    </g>
    <Sparks pts={[[16, 22, 3.4], [84, 20, 4]]} />
  </g>,
  f4: () => <g><Bg id="bx-f4" a="#e9f5db" b="#95d5b2" rays="#f6fff0" />
    <Box x={50} y={80} s={.8} open />
    <g transform="translate(50 46)">
      <path d="M-12 8h24l-3 18h-18z" fill="#e76f51" {...O} /><path d="M-14 6h28v5h-28z" fill="#f4a261" {...O} strokeWidth="1.6" />
      <path d="M0 6V-16" stroke="#2d6a4f" strokeWidth="2.4" />
      <path d="M0 -6q-16 -2 -20 -14q14 -2 20 12zM0 -10q14 -6 20 -18q-16 0 -20 16zM0 -16q-4 -12 2 -20q6 10 -2 20z" fill="#52b788" {...O} strokeWidth="1.6" />
      <path d="M-14 -16q6 2 12 8M14 -24q-6 4 -12 12" stroke="#2d6a4f" strokeWidth=".9" fill="none" />
      <circle cx="2" cy="-30" r="4" fill="#ffafcc" {...O} strokeWidth="1.2" /><circle cx="2" cy="-30" r="1.4" fill="#ffd60a" />
    </g>
    <Sparks pts={[[16, 22, 3.4], [84, 20, 4]]} />
  </g>,
  f5: () => <g><Bg id="bx-f5" a="#e2d7ff" b="#b8a6ff" rays="#f5f2ff" />
    <Box x={50} y={80} s={.8} open />
    <g transform="translate(50 50)">
      <path d="M-22 6q0 -30 22 -30t22 30" fill="none" stroke="#3a3a48" strokeWidth="5" strokeLinecap="round" /><path d="M-22 6q0 -30 22 -30t22 30" fill="none" stroke="#6b6b80" strokeWidth="2" strokeLinecap="round" />
      <rect x="-28" y="-2" width="12" height="18" rx="5" fill="#ef476f" {...O} /><rect x="16" y="-2" width="12" height="18" rx="5" fill="#ef476f" {...O} />
      <rect x="-25" y="1" width="6" height="12" rx="3" fill="#ffd6dc" /><rect x="19" y="1" width="6" height="12" rx="3" fill="#ffd6dc" />
    </g>
    <g fill="#5a189a">{[[16, 30], [84, 34], [78, 16]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y} rx="2.6" ry="2" /><path d={`M${x + 2.4} ${y}v-8l4 1`} stroke="#5a189a" strokeWidth="1" fill="none" /></g>)}</g>
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
// ฉากหลังการ์ดพิเศษ: ป่าช้ายามค่ำ — ฟ้ามืด จันทร์เสี้ยว ต้นไม้ตาย รั้วเหล็ก ป้ายหลุม หมอก
const Tunnel = ({ glow = '#ffb84d', bg = '#1c1a2a' }) => <g>
  <rect width="100" height="100" fill={bg} />
  <rect width="100" height="60" fill="#2a2840" opacity=".55" /><rect y="30" width="100" height="40" fill="#3a3450" opacity=".35" />
  <g fill="#e8e4f8">{[[8, 8, .9], [22, 16, .6], [40, 6, .7], [64, 12, .6], [92, 22, .8], [56, 22, .5], [12, 30, .5]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} opacity=".7" />)}</g>
  <circle cx="82" cy="14" r="8" fill="#f6efd2" opacity=".9" /><circle cx="85.5" cy="11.5" r="7.4" fill={bg} /><circle cx="82" cy="14" r="14" fill="#f6efd2" opacity=".06" />
  {/* เนินไกล + ต้นไม้ตาย */}
  <path d="M0 62 Q20 52 40 58 Q62 50 80 56 Q92 52 100 56 V100 H0Z" fill="#161a22" />
  <g stroke="#0e0e14" strokeWidth="2.2" strokeLinecap="round" fill="none"><path d="M10 64 V34 M10 46 l-7 -8 M10 40 l6 -9 M16 31 l4 -2 M10 54 l7 -5" /><path d="M93 62 V40 M93 48 l5 -7 M93 44 l-5 -6" /></g>
  <circle cx="50" cy="56" r="36" fill={glow} opacity=".12" /><circle cx="50" cy="56" r="22" fill={glow} opacity=".1" />
  {/* รั้วเหล็กป่าช้า */}
  <g stroke="#0c0c12" strokeWidth="1.4"><path d="M0 72 H100 M0 79 H100" />{Array.from({ length: 13 }, (_, i) => <path key={i} d={`M${2 + i * 8} 86 V68`} />)}</g>
  <g fill="#0c0c12">{Array.from({ length: 13 }, (_, i) => <path key={i} d={`M${0.5 + i * 8} 68.5 l1.5 -3.5 l1.5 3.5Z`} />)}</g>
  {/* ป้ายหลุมข้างฉาก */}
  <g fill="#4a4656" stroke="#14121a" strokeWidth="1.2"><path d="M4 92 V78 Q4 72 10 72 Q16 72 16 78 V92Z" /><path d="M84 92 V80 Q84 75 89 75 Q94 75 94 80 V92Z" /></g>
  <path d="M8.5 76 h3 M10 74.5 v5" stroke="#2a2834" strokeWidth="1.2" />
  {/* พื้นหญ้า + หมอก */}
  <rect y="88" width="100" height="12" fill="#1f2e1c" /><path d="M0 88 Q25 85 50 88 T100 87" stroke="#2f4a28" strokeWidth="2" fill="none" />
  <g fill="#dfe4f0" opacity=".09"><ellipse cx="22" cy="86" rx="26" ry="4" /><ellipse cx="76" cy="90" rx="30" ry="4" /></g>
  <g stroke="#d8d0b8" strokeWidth="2.4" strokeLinecap="round"><path d="M22 95h8" /></g><g fill="#d8d0b8"><circle cx="21" cy="93.9" r="1.5" /><circle cx="21" cy="96.1" r="1.5" /><circle cx="31" cy="93.9" r="1.5" /><circle cx="31" cy="96.1" r="1.5" /></g>
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
    {/* รถเข็นล้อเดียวขนดินกับทอง */}
    <ellipse cx="50" cy="90" rx="34" ry="5" fill="#0c140b" opacity=".6" />
    <path d="M70 52L94 40" stroke="#140b05" strokeWidth="6" strokeLinecap="round" /><path d="M70 52L94 40" stroke="#a8703c" strokeWidth="3.4" strokeLinecap="round" />
    <path d="M66 62L92 52" stroke="#140b05" strokeWidth="6" strokeLinecap="round" /><path d="M66 62L92 52" stroke="#a8703c" strokeWidth="3.4" strokeLinecap="round" />
    <g {...OD} strokeWidth="1.8"><circle cx="30" cy="44" r="7" fill="#6a5240" /><circle cx="44" cy="40" r="8" fill="#5a4432" /><circle cx="40" cy="46" r="6" fill="#ffd34d" /><circle cx="56" cy="42" r="7" fill="#ffd34d" /><circle cx="64" cy="48" r="6" fill="#6a5240" /><circle cx="50" cy="48" r="5" fill="#ffe680" /></g>
    <Sparks pts={[[42, 32, 4], [60, 32, 3.5]]} />
    <path d="M16 48H74L66 72H30Z" fill="#5a6a7a" {...OD} /><path d="M20 54H70" stroke="#8a9aaa" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 48H74" stroke="#3a4450" strokeWidth="4.5" strokeLinecap="round" />
    <g fill="#c8ccd6"><circle cx="24" cy="51" r="1.2" /><circle cx="66" cy="51" r="1.2" /></g>
    <path d="M58 72L62 88M36 72L38 80" stroke="#3a3a40" strokeWidth="3.2" strokeLinecap="round" />
    <circle cx="28" cy="80" r="9" fill="#3a3a40" {...OD} /><circle cx="28" cy="80" r="5" fill="none" stroke="#6a6a74" strokeWidth="1.6" /><circle cx="28" cy="80" r="2.4" fill="#a8b0bc" />
    <path d="M28 71V89M19 80H37" stroke="#6a6a74" strokeWidth="1.2" />
  </g>,
  dig_fall: () => <g><Tunnel glow="#ff8a4d" />
    {/* ต้นไม้ตายโค่นล้มขวางทางเดินในป่าช้า */}
    <path d="M14 100 Q18 80 30 76 Q46 72 50 80 Q60 74 74 80 Q88 84 92 100Z" fill="#3a2c1c" />
    <g stroke="#e8d8c0" strokeWidth="1.8" strokeLinecap="round" opacity=".6"><path d="M22 70l-4 -6M30 66l0 -7M70 64l3 -6M78 70l5 -4" /></g>
    <g transform="rotate(-24 50 60)">
      <rect x="6" y="52" width="80" height="17" rx="7" fill="#5a3c22" {...OD} />
      <path d="M12 57H70M16 63H78" stroke="#3a2412" strokeWidth="1.4" /><path d="M12 55H58" stroke="#8a6440" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="86" cy="60.5" rx="5" ry="8.5" fill="#c8a070" {...OD} strokeWidth="1.8" /><ellipse cx="86" cy="60.5" rx="2.6" ry="4.4" fill="none" stroke="#8a6440" strokeWidth="1" />
      <path d="M86 52l2 -4l3 3M86 69l3 3l-3 2" stroke="#e8d8c0" strokeWidth="1.2" fill="none" />
      <path d="M22 52l-6 -16l-6 2M18 42l8 -6M40 52l2 -14l6 -3M56 69l4 12l5 -1M30 69l-4 10" stroke="#140b05" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M22 52l-6 -16l-6 2M18 42l8 -6M40 52l2 -14l6 -3M56 69l4 12l5 -1M30 69l-4 10" stroke="#4a3018" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </g>
    <g fill="#4a4656" {...OD} strokeWidth="1.6"><path d="M66 90 V80 Q66 74 72 74 Q78 74 78 80 V90Z" transform="rotate(16 72 86)" /></g>
    <g fill="#8a7a68" opacity=".4">{[[24, 88, 8], [44, 92, 9], [64, 94, 8]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
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
    <path d="M22 100Q22 72 50 70Q78 72 78 100Z" fill="#a8865a" {...OD} />
    <path d="M38 72L36 100M62 72L64 100" stroke="#6b4224" strokeWidth="4" />
    <circle cx="50" cy="52" r="16" fill={SKIN} {...OD} />
    <path d="M33 48Q33 26 50 26Q67 26 67 48Z" fill="#8a5a32" {...OD} /><path d="M34 44H66" stroke="#3a2412" strokeWidth="4" />
    <path d="M22 49Q50 43 78 49" stroke="#140b05" strokeWidth="7" strokeLinecap="round" fill="none" /><path d="M22 49Q50 43 78 49" stroke="#6b4224" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M40 33Q46 29 52 29" stroke="#c8915a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
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
  // ปลายทางที่ไม่ใช่สมบัติ = หลุมศพมีแต่กระดูก (ชื่อคีย์เดิม dig_rock)
  dig_rock: () => <g><Tunnel glow="#9ab0a0" bg="#241b14" />
    {/* โลงไม้ผุเปิดฝา */}
    <path d="M26 92L20 50L34 36H66L80 50L74 92Z" fill="#4a2e1c" {...OD} />
    <path d="M30 86L26 52L37 42H63L74 52L70 86Z" fill="#1c120c" />
    <path d="M70 34L90 22L94 30L76 44Z" fill="#6b4a2e" {...OD} strokeWidth="1.8" /><path d="M78 30L86 26" stroke="#3a2416" strokeWidth="1.5" />
    {/* หัวกะโหลก + กระดูกในโลง */}
    <g {...OD} strokeWidth="1.8">
      <path d="M38 58Q37 44 50 44Q63 44 62 58L58 61V67H42V61Z" fill="#efe4c6" />
      <g transform="rotate(-20 46 78)"><rect x="32" y="76" width="28" height="5" rx="2" fill="#e3d6b4" /><circle cx="32" cy="76" r="3.4" fill="#e3d6b4" /><circle cx="32" cy="81" r="3.4" fill="#e3d6b4" /><circle cx="60" cy="76" r="3.4" fill="#e3d6b4" /><circle cx="60" cy="81" r="3.4" fill="#e3d6b4" /></g>
      <g transform="rotate(24 54 80)"><rect x="40" y="78" width="28" height="5" rx="2" fill="#efe4c6" /><circle cx="40" cy="78" r="3.4" fill="#efe4c6" /><circle cx="40" cy="83" r="3.4" fill="#efe4c6" /><circle cx="68" cy="78" r="3.4" fill="#efe4c6" /><circle cx="68" cy="83" r="3.4" fill="#efe4c6" /></g>
    </g>
    <circle cx="44.5" cy="54" r="4" fill="#140b05" /><circle cx="55.5" cy="54" r="4" fill="#140b05" /><path d="M50 58l-2 4h4Z" fill="#140b05" />
    <path d="M46 67V63M50 67V63M54 67V63" stroke="#140b05" strokeWidth="1.4" />
    {/* ใยแมงมุม + หญ้าแห้ง */}
    <path d="M20 14L34 28M20 28L34 14M27 12V30M18 21H36" stroke="#c8c8c8" strokeWidth=".8" opacity=".5" />
    <path d="M14 94q2 -8 4 0M84 94q2 -9 5 -1" stroke="#6a7a4a" strokeWidth="2" fill="none" strokeLinecap="round" />
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
