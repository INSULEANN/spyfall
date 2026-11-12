// ฉากเคลื่อนไหวของเกมเค้ก: ห้องครัวกลางดึก — แสดงเฉพาะสิ่งที่ "เรา" เห็น (ไม่เผยข้อมูลลับ)
// mode: sleep | there | vanish | gone | thief | morning
import React from 'react';
import './cakestage.css';

const Cake = ({ x = 0, y = 0, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M-16 4 L16 -2 L16 12 L-16 16 Z" fill="#ffe9c7" /><path d="M-16 8 L16 3 L16 6 L-16 11 Z" fill="#ff8fb3" />
  <path d="M-16 4 L16 -2 L10 -7 L-20 -1 Z" fill="#fff" /><path d="M-20 -1 L-16 4 L-16 16 L-20 11 Z" fill="#f4d7ae" />
  <circle cx="-2" cy="-6" r="4" fill="#ff4f6d" /><path d="M-4 -11 l2 2 l2 -2" stroke="#3fb56a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
</g>;
// หนูขโมย (หันซ้าย) ใส่หน้ากากโจร
const Mouse = ({ holding, munch }) => <g className="cs-mouse-body">
  <path className="cs-tail" d="M18 4 q18 -2 20 -18 q1 -6 -4 -6" stroke="#ff9fb3" strokeWidth="3" fill="none" strokeLinecap="round" />
  <ellipse className="cs-leg a" cx="-6" cy="12" rx="5" ry="3.5" fill="#6f748a" /><ellipse className="cs-leg b" cx="9" cy="12" rx="5" ry="3.5" fill="#6f748a" />
  <ellipse cx="2" cy="0" rx="21" ry="13" fill="#a3a9be" /><ellipse cx="6" cy="4" rx="12" ry="7" fill="#c3c8d8" />
  <circle cx="-18" cy="-14" r="7" fill="#a3a9be" /><circle cx="-18" cy="-14" r="4" fill="#ff9fb3" />
  <circle cx="-27" cy="-11" r="7" fill="#a3a9be" /><circle cx="-27" cy="-11" r="4" fill="#ff9fb3" />
  <circle cx="-22" cy="-3" r="11" fill="#b4bacd" />
  <path d="M-33 -7 h20 v6 h-20 z" fill="#241c3a" /><circle cx="-27" cy="-4" r="1.8" fill="#fff" /><circle cx="-19" cy="-4" r="1.8" fill="#fff" />
  <circle cx="-33" cy="1" r="2.6" fill="#ff7a9a" /><g stroke="#6f748a" strokeWidth="1"><path d="M-31 2 l-8 -2 M-31 3 l-8 2" /></g>
  {holding && <Cake x={-36} y={2} s={0.55} />}
  {munch && <g className="cs-crumbs" fill="#ffe9c7"><circle cx="-40" cy="-2" r="2" /><circle cx="-44" cy="6" r="1.6" /><circle cx="-38" cy="10" r="1.4" fill="#ff8fb3" /></g>}
  <ellipse cx="-30" cy="8" rx="4" ry="3" fill="#b4bacd" />
</g>;

export function CakeStage({ mode = 'sleep', hour = 0 }) {
  const night = mode !== 'morning'; const open = ['there', 'vanish', 'gone', 'thief', 'morning'].includes(mode);
  const cakeIn = mode === 'there' || mode === 'vanish';
  return <div className={'cake-stage cs-' + mode} aria-hidden="true">
    <svg viewBox="0 0 400 190" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={'cs-wall-' + mode} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={night ? '#1d1640' : '#4a6ab0'} /><stop offset="1" stopColor={night ? '#2c2050' : '#f4c08a'} /></linearGradient>
        <linearGradient id={'cs-beam-' + mode} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff4c9" stopOpacity=".55" /><stop offset="1" stopColor="#fff4c9" stopOpacity="0" /></linearGradient>
      </defs>
      <rect width="400" height="190" fill={`url(#cs-wall-${mode})`} />
      <rect y="150" width="400" height="40" fill={night ? '#241a3a' : '#c9a46a'} /><path d="M0 150 H400" stroke={night ? '#3a2d5a' : '#a07a4a'} strokeWidth="3" />
      {/* หน้าต่าง */}
      <g><rect x="22" y="22" width="70" height="56" rx="5" fill={night ? '#0d0a22' : '#bfe3ff'} stroke="#6b5a8a" strokeWidth="4" /><path d="M57 22 V78 M22 50 H92" stroke="#6b5a8a" strokeWidth="3" />
        {night ? <><circle cx="44" cy="38" r="9" fill="#ffe9c7" /><circle cx="48" cy="35" r="8" fill="#0d0a22" /><g className="cs-tw" fill="#fff"><circle cx="76" cy="32" r="1.4" /><circle cx="70" cy="64" r="1.2" /><circle cx="34" cy="66" r="1" /></g></>
          : <g className="cs-sun"><circle cx="57" cy="66" r="13" fill="#ffd34d" /></g>}</g>
      {/* นาฬิกา */}
      <g transform="translate(122 40)"><circle r="17" fill="#2a2342" stroke="#ffe9c7" strokeWidth="3" />{[0, 1, 2, 3].map(i => <rect key={i} x="-1" y="-15" width="2" height="4" fill="#ffe9c7" transform={`rotate(${i * 90})`} />)}
        <path d="M0 0 V-10" stroke="#ff8fb3" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${(hour % 12) * 30})`} /><path className="cs-min" d="M0 0 H11" stroke="#ffe9c7" strokeWidth="2" strokeLinecap="round" /><circle r="2" fill="#ffe9c7" />
        {hour > 0 && <text y="31" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffe9c7" fontFamily="sans-serif">ตี {hour}</text>}</g>
      {/* ตู้เย็น */}
      <g transform="translate(160 40)">
        <rect width="74" height="110" rx="8" fill="#e6e0f4" /><rect x="6" y="8" width="62" height="96" rx="4" fill={open ? '#fff6d6' : '#d4cbec'} />
        {open && <><path d="M10 40 H64 M10 72 H64" stroke="#e8d9a8" strokeWidth="3" /><rect x="12" y="20" width="10" height="18" rx="2" fill="#bfe3ff" /><rect x="50" y="52" width="12" height="18" rx="3" fill="#ffd27a" /></>}
        {open && <ellipse cx="34" cy="70" rx="18" ry="3.5" fill="#fff" stroke="#e8d9a8" strokeWidth="1.5" />}
        {cakeIn && <g className={mode === 'vanish' ? 'cs-cake-in' : 'cs-cake-glow'}><Cake x={34} y={58} s={0.9} /></g>}
        {(mode === 'gone' || mode === 'morning') && <g fill="#ffe9c7"><circle cx="28" cy="69" r="1.8" /><circle cx="36" cy="70" r="1.4" /><circle cx="41" cy="68" r="1.6" fill="#ff8fb3" /><text x="34" y="58" textAnchor="middle" fontSize="16" fill="#ff5f6d" fontWeight="900" fontFamily="sans-serif" className="cs-q">?</text></g>}
        {open && <path d="M74 8 L150 0 L150 110 L74 104 Z" fill={`url(#cs-beam-${mode})`} className="cs-beam" />}
        <g className={open ? 'cs-door open' : 'cs-door'}><rect width="74" height="110" rx="8" fill="#d4cbec" stroke="#b9aedd" strokeWidth="2" /><rect x="60" y="40" width="5" height="30" rx="2.5" fill="#9b8fc0" /><circle cx="22" cy="22" r="6" fill="#ff8fb3" /><rect x="14" y="76" width="22" height="14" rx="3" fill="#ffe9c7" /></g>
      </g>
      {/* เตียง + คนหลับ (ตอนหลับ) */}
      {mode === 'sleep' && <g><rect x="262" y="118" width="120" height="30" rx="6" fill="#6b5a8a" /><rect x="262" y="112" width="18" height="40" rx="4" fill="#4a3d6a" />
        <path d="M290 118 Q320 96 372 112 L372 124 L290 124 Z" fill="#ff8fb3" /><circle cx="292" cy="112" r="11" fill="#ffd2a8" /><path d="M286 112 q3 2 6 0 M294 112 q3 2 6 0" stroke="#241c3a" strokeWidth="1.6" fill="none" />
        <g className="cs-z" fill="#ffe9c7" fontFamily="sans-serif" fontWeight="900"><text x="300" y="96" fontSize="12">z</text><text x="310" y="84" fontSize="15">z</text><text x="322" y="70" fontSize="18">Z</text></g></g>}
      {/* โต๊ะครัวด้านขวา (ตอนตื่น) */}
      {mode !== 'sleep' && <g><rect x="300" y="112" width="90" height="8" rx="3" fill="#8a5a2c" /><rect x="306" y="120" width="6" height="30" fill="#6b4220" /><rect x="378" y="120" width="6" height="30" fill="#6b4220" /><rect x="320" y="96" width="16" height="16" rx="3" fill="#ffe9c7" opacity=".85" /></g>}
      {/* รอยเท้าหนู */}
      {(mode === 'gone' || mode === 'morning' || mode === 'vanish') && <g className="cs-steps" fill={night ? '#ffe9c780' : '#7a5a3a'}>{[0, 1, 2, 3, 4, 5, 6].map(i => <g key={i} style={{ animationDelay: i * 0.18 + 's' }}><ellipse cx={250 + i * 22} cy={166 + (i % 2) * 6} rx="3" ry="2" /><ellipse cx={256 + i * 22} cy={162 + (i % 2) * 6} rx="1.2" ry="1" /></g>)}</g>}
      {/* หนูขโมย */}
      {mode === 'vanish' && <g className="cs-run"><g className="cs-flip"><Mouse /><g className="cs-hold"><Cake x={-36} y={2} s={0.55} /></g></g></g>}
      {mode === 'thief' && <g transform="translate(262 146)" className="cs-eat"><Mouse munch /><g className="cs-bite"><Cake x={-36} y={0} s={0.6} /></g></g>}
      {mode === 'gone' && <g className="cs-tailout"><path d="M386 150 q14 -2 16 -14" stroke="#ff9fb3" strokeWidth="3" fill="none" strokeLinecap="round" /></g>}
    </svg>
    <span className="cs-cap">{{ sleep: '😴 หลับอยู่…', there: '🍰 เค้กยังอยู่!', vanish: '🐭 เห็นจอมแอบกินคามือ!', gone: '😱 เค้กหายไปแล้ว!', thief: '😋 งั่ม ๆ แอบกินอยู่…', morning: '☀️ เช้าแล้ว — ใครกิน?' }[mode]}</span>
  </div>;
}
