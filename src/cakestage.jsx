// ฉากเคลื่อนไหวของเกมเค้ก: ห้องครัวกลางดึก — แสดงเฉพาะสิ่งที่ "เรา" เห็น (ไม่เผยข้อมูลลับ)
// mode: sleep | there | vanish | gone | thief | morning
// ผัง 400×190: เคาน์เตอร์+หน้าต่าง (ซ้าย) • นาฬิกา (122,40) • ตู้เย็น (160–234) • โคมไฟเพดาน (282) • เตียง/โต๊ะ (ขวา) • พื้น y150
// ขยับด้วย transform/opacity เท่านั้น • ชิ้นที่มี className ห้ามมี transform= ในแอตทริบิวต์ (จะหมุนผิดจุดเพราะ fill-box)
import React from 'react';
import './cakestage.css';

const OL = '#241c3a';
const Cake = ({ x = 0, y = 0, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M-16 4 L16 -2 L16 12 L-16 16 Z" fill="#ffe9c7" /><path d="M-16 8 L16 3 L16 6 L-16 11 Z" fill="#ff8fb3" />
  <path d="M-16 4 L16 -2 L10 -7 L-20 -1 Z" fill="#fff" /><path d="M-20 -1 L-16 4 L-16 16 L-20 11 Z" fill="#f4d7ae" />
  <path d="M-18 1 q3 4 6 0 q3 4 6 0 q3 4 6 0" stroke="#fff" strokeWidth="2" fill="none" />
  <circle cx="-2" cy="-6" r="4" fill="#ff4f6d" /><circle cx="-3.2" cy="-7.2" r="1.2" fill="#fff" opacity=".8" /><path d="M-4 -11 l2 2 l2 -2" stroke="#3fb56a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
</g>;
// หนูขโมย (หันซ้าย) ใส่หน้ากากโจร
const Mouse = ({ munch }) => <g className="cs-mouse-body">
  <path className="cs-tail" d="M18 4 q18 -2 20 -18 q1 -6 -4 -6" stroke="#ff9fb3" strokeWidth="3" fill="none" strokeLinecap="round" />
  <ellipse className="cs-leg a" cx="-6" cy="12" rx="5" ry="3.5" fill="#6f748a" /><ellipse className="cs-leg b" cx="9" cy="12" rx="5" ry="3.5" fill="#6f748a" />
  <ellipse cx="2" cy="0" rx="21" ry="13" fill="#a3a9be" stroke={OL} strokeWidth="1.4" /><ellipse cx="6" cy="4" rx="12" ry="7" fill="#c3c8d8" /><path d="M-6 -9 q10 -5 20 0" stroke="#c9cede" strokeWidth="2.4" fill="none" strokeLinecap="round" />
  <circle cx="-18" cy="-14" r="7" fill="#a3a9be" stroke={OL} strokeWidth="1.2" /><circle cx="-18" cy="-14" r="4" fill="#ff9fb3" />
  <circle cx="-27" cy="-11" r="7" fill="#a3a9be" stroke={OL} strokeWidth="1.2" /><circle cx="-27" cy="-11" r="4" fill="#ff9fb3" />
  <circle className={munch ? 'cs-cheek' : ''} cx="-22" cy="-3" r="11" fill="#b4bacd" stroke={OL} strokeWidth="1.2" />
  <path d="M-33 -7 h20 v6 h-20 z" fill={OL} /><path d="M-13 -5 l6 -3 M-13 -3 l6 2" stroke={OL} strokeWidth="1.6" strokeLinecap="round" />
  <g className="cs-blink"><circle cx="-27" cy="-4" r="1.9" fill="#fff" /><circle cx="-19" cy="-4" r="1.9" fill="#fff" /></g>
  <circle cx="-33" cy="1" r="2.6" fill="#ff7a9a" /><g className="cs-whisk" stroke="#6f748a" strokeWidth="1"><path d="M-31 2 l-9 -3 M-31 3 l-9 2 M-31 4 l-8 5" /></g>
  {munch && <g className="cs-crumbs" fill="#ffe9c7"><circle cx="-40" cy="-2" r="2" /><circle cx="-44" cy="6" r="1.6" /><circle cx="-38" cy="10" r="1.4" fill="#ff8fb3" /></g>}
  <ellipse cx="-30" cy="8" rx="4" ry="3" fill="#b4bacd" stroke={OL} strokeWidth="1" />
</g>;
const Twinkle = ({ x, y, s = 1, d = 0, c = '#fff4c9' }) => <g transform={`translate(${x} ${y}) scale(${s})`}><path className="cs-spark" style={{ animationDelay: d + 's' }} d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z" fill={c} /></g>;

export function CakeStage({ mode = 'sleep', hour = 0 }) {
  const night = mode !== 'morning'; const open = ['there', 'vanish', 'gone', 'thief', 'morning'].includes(mode);
  const cakeIn = mode === 'there' || mode === 'vanish';
  const id = 'cs-' + mode;
  const C = night ? { wall: '#1d1640', wall2: '#2c2050', stripe: '#251c4a', tile: '#2a2358', tile2: '#241e4c', floor: '#241a3a', plank: '#2c2148', wood: '#3a2d5a', wood2: '#2e2448', top: '#4a3d72' }
    : { wall: '#ffe2b8', wall2: '#ffd09a', stripe: '#ffd8a8', tile: '#eef6fb', tile2: '#d8e8f2', floor: '#c9a46a', plank: '#b8915a', wood: '#b9824e', wood2: '#9b6a3c', top: '#efe8dc' };
  return <div className={'cake-stage cs-' + mode} aria-hidden="true">
    <svg viewBox="0 0 400 190" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id + '-wall'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.wall} /><stop offset="1" stopColor={C.wall2} /></linearGradient>
        <linearGradient id={id + '-beam'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff4c9" stopOpacity=".6" /><stop offset="1" stopColor="#fff4c9" stopOpacity="0" /></linearGradient>
        <radialGradient id={id + '-glow'}><stop offset="0" stopColor="#fff4c9" stopOpacity=".7" /><stop offset="1" stopColor="#fff4c9" stopOpacity="0" /></radialGradient>
        <linearGradient id={id + '-sunbeam'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff6c8" stopOpacity=".55" /><stop offset="1" stopColor="#fff6c8" stopOpacity="0" /></linearGradient>
        <clipPath id={id + '-win'}><rect x="22" y="22" width="70" height="56" rx="5" /></clipPath>
      </defs>
      {/* ผนังลายทาง + บัวเพดาน */}
      <rect width="400" height="190" fill={`url(#${id}-wall)`} />
      {Array.from({ length: 20 }, (_, i) => <rect key={i} x={i * 20} y="0" width="8" height="150" fill={C.stripe} opacity=".45" />)}
      <rect width="400" height="8" fill={C.wood2} opacity=".7" />
      {/* หน้าต่าง: ฟ้า/พระจันทร์/เมฆ/นก + ผ้าม่าน */}
      <rect x="22" y="22" width="70" height="56" rx="5" fill={night ? '#0d0a22' : '#a8dcff'} />
      <g clipPath={`url(#${id}-win)`}>
        {night ? <><circle cx="44" cy="38" r="16" fill={`url(#${id}-glow)`} /><circle cx="44" cy="38" r="9" fill="#ffe9c7" /><circle cx="48" cy="35" r="8" fill="#0d0a22" />
          <g className="cs-tw" fill="#fff"><circle cx="76" cy="32" r="1.4" /><circle cx="70" cy="64" r="1.2" /><circle cx="34" cy="66" r="1" /><circle cx="84" cy="50" r="1" /></g>
          <g className="cs-cloud"><ellipse cx="60" cy="56" rx="14" ry="4" fill="#2a2450" /><ellipse cx="68" cy="53" rx="8" ry="4" fill="#2a2450" /></g></>
          : <><g className="cs-sun"><circle cx="57" cy="64" r="20" fill="#fff3b0" opacity=".5" /><circle cx="57" cy="64" r="12" fill="#ffd34d" /></g>
            <g className="cs-cloud"><ellipse cx="40" cy="36" rx="12" ry="4.5" fill="#fff" /><ellipse cx="47" cy="33" rx="7" ry="4.5" fill="#fff" /></g>
            <g className="cs-bird"><path d="M0 0 q4 -4 8 0 q4 -4 8 0" stroke="#3a4a6a" strokeWidth="1.6" fill="none" strokeLinecap="round" /></g></>}
      </g>
      <rect x="22" y="22" width="70" height="56" rx="5" fill="none" stroke="#6b5a8a" strokeWidth="4" /><path d="M57 22 V78 M22 50 H92" stroke="#6b5a8a" strokeWidth="3" />
      <g className="cs-curt l"><path d="M14 16 H34 C30 36 34 58 26 84 H14 Z" fill={night ? '#4a2f6a' : '#ff9db5'} /></g>
      <g className="cs-curt r"><path d="M100 16 H80 C84 36 80 58 88 84 H100 Z" fill={night ? '#4a2f6a' : '#ff9db5'} /></g>
      <rect x="10" y="12" width="94" height="5" rx="2.5" fill="#6b5a8a" />
      {/* แสงแดดยามเช้าส่องจากหน้าต่าง + ฝุ่นลอย */}
      {!night && <><polygon className="cs-sunbeam" points="22,78 92,78 190,150 70,150" fill={`url(#${id}-sunbeam)`} />
        <g className="cs-motes" fill="#fff6c8">{[[60, 110], [90, 96], [120, 126], [80, 136], [140, 112]].map(([x, y], i) => <circle key={i} style={{ animationDelay: -i * 0.7 + 's' }} cx={x} cy={y} r="1.4" />)}</g></>}
      {/* เคาน์เตอร์ใต้หน้าต่าง: กระเบื้อง กาน้ำ ต้นไม้ */}
      {Array.from({ length: 6 }, (_, i) => Array.from({ length: 2 }, (_, j) => <rect key={i + '-' + j} x={6 + i * 17} y={84 + j * 10} width="16" height="9" fill={(i + j) % 2 ? C.tile : C.tile2} />))}
      <rect x="4" y="104" width="106" height="46" fill={C.wood} /><rect x="2" y="101" width="110" height="5" rx="2" fill={C.top} />
      <rect x="10" y="112" width="44" height="34" rx="3" fill={C.wood2} /><rect x="60" y="112" width="44" height="34" rx="3" fill={C.wood2} /><circle cx="48" cy="129" r="2" fill={C.top} /><circle cx="66" cy="129" r="2" fill={C.top} />
      <g transform="translate(26 101)"><path d="M-8 0 L-6 -12 H6 L8 0 Z" fill={night ? '#5a4a8a' : '#e8754a'} /><path d="M-6 -12 q-6 -4 -4 -10 q5 3 4 10 M0 -12 q0 -8 4 -12 q2 6 -4 12 M6 -12 q6 -4 6 -10 q-6 2 -6 10" fill={night ? '#2f5a4a' : '#3fb56a'} /></g>
      <g transform="translate(84 101)"><path d="M-10 0 Q-11 -14 0 -15 Q11 -14 10 0 Z" fill={night ? '#6a6a90' : '#c0c6d6'} stroke={OL} strokeWidth="1.2" /><path d="M10 -8 l7 -4" stroke={night ? '#6a6a90' : '#c0c6d6'} strokeWidth="3" strokeLinecap="round" /><rect x="-4" y="-18" width="8" height="3" rx="1.5" fill={OL} />
        {!night && <g className="cs-steam"><path d="M17 -14 q-3 -5 0 -9 q3 -4 0 -8" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".7" /></g>}</g>
      {/* นาฬิกา */}
      <g transform="translate(130 40)"><circle r="17" fill="#2a2342" stroke="#ffe9c7" strokeWidth="3" />{[0, 1, 2, 3].map(i => <rect key={i} x="-1" y="-15" width="2" height="4" fill="#ffe9c7" transform={`rotate(${i * 90})`} />)}
        <path d="M0 0 V-10" stroke="#ff8fb3" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${(hour % 12) * 30})`} /><path className="cs-min" d="M0 0 H11" stroke="#ffe9c7" strokeWidth="2" strokeLinecap="round" /><circle r="2" fill="#ffe9c7" />
        {hour > 0 && <text y="31" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffe9c7" fontFamily="sans-serif">ตี {hour}</text>}</g>
      {/* โคมไฟเพดาน */}
      <g transform="translate(282 0)"><path d="M0 0 V22" stroke={C.wood2} strokeWidth="2" /><path d="M-14 34 Q-12 20 0 20 Q12 20 14 34 Z" fill={night ? '#3a2d5a' : '#ffb03a'} stroke={OL} strokeWidth="1.4" />
        {!night && <><ellipse cx="0" cy="36" rx="7" ry="3" fill="#fff6c8" /><polygon points="-12,36 12,36 46,150 -46,150" fill="#fff6c8" opacity=".12" /></>}</g>
      {/* พื้นไม้ + บัวพื้น + พรม */}
      <rect y="150" width="400" height="40" fill={C.floor} />
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${i * 48 + (i % 2) * 20} 150 V190`} stroke={C.plank} strokeWidth="2" />)}
      <path d="M0 162 H400 M0 176 H400" stroke={C.plank} strokeWidth="1.2" opacity=".6" />
      <rect y="146" width="400" height="5" fill={C.wood2} />
      <ellipse cx="200" cy="172" rx="60" ry="9" fill={night ? '#3a2a5a' : '#e07a8a'} opacity=".7" /><ellipse cx="200" cy="172" rx="48" ry="6" fill="none" stroke={night ? '#4a3a6a' : '#ffb3c0'} strokeWidth="2" strokeDasharray="4 4" />
      {/* ตู้เย็น */}
      <g transform="translate(160 40)">
        <rect x="2" y="104" width="74" height="8" rx="4" fill="#0005" />
        <rect width="74" height="110" rx="8" fill="#e6e0f4" stroke={OL} strokeWidth="1.6" />
        <rect x="6" y="8" width="62" height="96" rx="4" fill={open ? '#fff6d6' : '#d4cbec'} />
        {open && <rect className="cs-flick" x="6" y="8" width="62" height="96" rx="4" fill="#fff" opacity=".3" />}
        {open && <><path d="M10 40 H64 M10 72 H64" stroke="#e8d9a8" strokeWidth="3" /><rect x="12" y="20" width="10" height="18" rx="2" fill="#bfe3ff" /><rect x="13" y="16" width="8" height="5" rx="2" fill="#fff" /><rect x="50" y="52" width="12" height="18" rx="3" fill="#ffd27a" /><circle cx="22" cy="92" r="6" fill="#ffb03a" /><circle cx="36" cy="94" r="5" fill="#ff6b6b" /><rect x="46" y="86" width="16" height="12" rx="2" fill="#9ae6a5" /></>}
        {open && <ellipse cx="34" cy="70" rx="18" ry="3.5" fill="#fff" stroke="#e8d9a8" strokeWidth="1.5" />}
        {cakeIn && <g className={mode === 'vanish' ? 'cs-cake-in' : 'cs-cake-glow'}><Cake x={34} y={58} s={0.9} /></g>}
        {mode === 'there' && <><Twinkle x={14} y={50} s={.8} /><Twinkle x={56} y={46} s={1} d={.5} /><Twinkle x={44} y={64} s={.6} d={1} /></>}
        {(mode === 'gone' || mode === 'morning') && <g fill="#ffe9c7"><circle cx="28" cy="69" r="1.8" /><circle cx="36" cy="70" r="1.4" /><circle cx="41" cy="68" r="1.6" fill="#ff8fb3" /><path d="M24 70 q4 -3 6 0" stroke="#ff8fb3" strokeWidth="1.4" fill="none" />
          <text x="34" y="58" textAnchor="middle" fontSize="16" fill="#ff5f6d" fontWeight="900" fontFamily="sans-serif" className="cs-q">?</text></g>}
        {open && <path d="M74 8 L150 0 L150 110 L74 104 Z" fill={`url(#${id}-beam)`} className="cs-beam" />}
        {open && night && <g className="cs-mist" fill="#e8f4ff">{[0, 1, 2].map(i => <circle key={i} style={{ animationDelay: i * 0.8 + 's' }} cx={30 + i * 10} cy="104" r="6" />)}</g>}
        <g className={open ? 'cs-door open' : 'cs-door'}><rect width="74" height="110" rx="8" fill="#d4cbec" stroke="#b9aedd" strokeWidth="2" /><path d="M0 36 H74" stroke="#b9aedd" strokeWidth="2" /><rect x="60" y="12" width="5" height="18" rx="2.5" fill="#9b8fc0" /><rect x="60" y="44" width="5" height="30" rx="2.5" fill="#9b8fc0" />
          <circle cx="20" cy="18" r="6" fill="#ff8fb3" /><rect x="28" y="12" width="12" height="9" rx="2" fill="#ffd23f" /><rect x="14" y="76" width="22" height="16" rx="2" fill="#ffe9c7" /><path d="M17 81 h14 M17 86 h10" stroke="#c9b48a" strokeWidth="1.4" /><circle cx="44" cy="58" r="5" fill="#7ad1ff" /></g>
      </g>
      {/* เตียง + คนหลับหายใจ (ตอนหลับ) */}
      {mode === 'sleep' && <g>
        <rect x="374" y="100" width="12" height="50" rx="3" fill="#4a3d6a" /><rect x="258" y="106" width="16" height="44" rx="4" fill="#4a3d6a" />
        <rect x="262" y="120" width="120" height="26" rx="6" fill="#6b5a8a" />
        <ellipse cx="290" cy="116" rx="17" ry="8" fill="#e8e4f8" />
        <g className="cs-breath"><path d="M288 122 Q318 98 376 112 L376 128 L288 128 Z" fill="#ff8fb3" /><path d="M300 112 q20 -8 40 -4 M330 118 q14 -2 28 0" stroke="#ffb3c8" strokeWidth="2" fill="none" /></g>
        <circle cx="292" cy="110" r="11" fill="#ffd2a8" stroke={OL} strokeWidth="1.2" /><path d="M286 110 q3 2 6 0 M294 110 q3 2 6 0" stroke={OL} strokeWidth="1.6" fill="none" /><ellipse cx="284" cy="114" rx="2.4" ry="1.4" fill="#ff9fb3" opacity=".7" />
        <path d="M282 104 Q290 88 304 98 L300 104 Z" fill="#7a8cff" /><circle cx="306" cy="98" r="3.4" fill="#fff" />
        <g className="cs-bubble"><circle cx="300" cy="117" r="3" fill="#cfe8ff" opacity=".8" /></g>
        <g className="cs-z" fill="#ffe9c7" fontFamily="sans-serif" fontWeight="900"><text x="300" y="94" fontSize="12">z</text><text x="310" y="82" fontSize="15">z</text><text x="322" y="68" fontSize="18">Z</text></g>
        <g transform="translate(244 128)"><rect x="-10" y="0" width="20" height="22" rx="2" fill="#4a3d6a" /><path d="M-7 0 L-5 -14 H5 L7 0 Z" fill="#ffd877" opacity=".5" /><rect x="-1" y="-20" width="2" height="6" fill="#4a3d6a" /></g></g>}
      {/* โต๊ะครัวด้านขวา (ตอนตื่น) */}
      {mode !== 'sleep' && <g><rect x="300" y="112" width="90" height="8" rx="3" fill="#8a5a2c" stroke={OL} strokeWidth="1" /><rect x="306" y="120" width="6" height="30" fill="#6b4220" /><rect x="378" y="120" width="6" height="30" fill="#6b4220" />
        <rect x="320" y="96" width="16" height="16" rx="3" fill="#ffe9c7" opacity=".9" /><path d="M336 100 q6 2 0 8" stroke="#ffe9c7" strokeWidth="2" fill="none" />
        <g transform="translate(362 112)"><ellipse rx="14" ry="3" fill="#fff" stroke="#d8d0c0" strokeWidth="1" /><circle cx="-4" cy="-4" r="4" fill="#ff6b6b" /><circle cx="4" cy="-4" r="4" fill="#ffb03a" /><circle cx="0" cy="-8" r="4" fill="#9ae6a5" /></g></g>}
      {/* รอยเท้าหนู */}
      {(mode === 'gone' || mode === 'morning' || mode === 'vanish') && <g className="cs-steps" fill={night ? '#ffe9c780' : '#7a5a3a'}>{[0, 1, 2, 3, 4, 5, 6].map(i => <g key={i} style={{ animationDelay: i * 0.18 + 's' }}><ellipse cx={250 + i * 22} cy={166 + (i % 2) * 6} rx="3" ry="2" /><ellipse cx={256 + i * 22} cy={162 + (i % 2) * 6} rx="1.2" ry="1" /><ellipse cx={255 + i * 22} cy={168 + (i % 2) * 6} rx="1.2" ry="1" /></g>)}</g>}
      {/* หนูขโมย */}
      {mode === 'vanish' && <g className="cs-run"><g className="cs-flip"><Mouse /><g className="cs-hold"><Cake x={-36} y={2} s={0.55} /></g></g></g>}
      {mode === 'vanish' && <g className="cs-dust" fill="#c9c2dd">{[0, 1, 2].map(i => <circle key={i} style={{ animationDelay: i * 0.12 + 's' }} cx="300" cy="158" r="5" />)}</g>}
      {mode === 'thief' && <g transform="translate(262 146)"><g className="cs-eat"><Mouse munch /><g className="cs-bite"><Cake x={-36} y={0} s={0.6} /></g></g></g>}
      {mode === 'thief' && <><g className="cs-yum"><text x="226" y="112" fontSize="14" fontWeight="900" fill="#ffd23f" stroke={OL} strokeWidth="3" paintOrder="stroke" fontFamily="sans-serif">งั่ม!</text></g><Twinkle x={286} y={118} s={.9} d={.2} c="#ff9fb3" /><Twinkle x={240} y={126} s={.7} d={.8} c="#ff9fb3" /></>}
      {mode === 'gone' && <g className="cs-tailout"><path d="M386 150 q14 -2 16 -14" stroke="#ff9fb3" strokeWidth="3" fill="none" strokeLinecap="round" /></g>}
      {mode === 'gone' && <g className="cs-dust out" fill="#c9c2dd">{[0, 1, 2].map(i => <circle key={i} style={{ animationDelay: i * 0.25 + 's' }} cx="384" cy="154" r="5" />)}</g>}
      {mode === 'gone' && <g fontFamily="sans-serif" fontWeight="900" fill="#ff8a94">{[[250, 92, 14, 0], [140, 108, 12, .6], [270, 70, 18, 1.2]].map(([x, y, s, d], i) => <text key={i} className="cs-qq" style={{ animationDelay: d + 's' }} x={x} y={y} fontSize={s}>?</text>)}</g>}
      {mode === 'morning' && <g transform="translate(330 70)"><g className="cs-q2"><text textAnchor="middle" fontSize="22" fontWeight="900" fill="#c0213a" stroke="#fff" strokeWidth="3" paintOrder="stroke" fontFamily="sans-serif">?!</text></g></g>}
    </svg>
    <span className="cs-cap">{{ sleep: '😴 หลับอยู่…', there: '🍰 เค้กยังอยู่!', vanish: '🐭 เห็นจอมแอบกินคามือ!', gone: '😱 เค้กหายไปแล้ว!', thief: '😋 งั่ม ๆ แอบกินอยู่…', morning: '☀️ เช้าแล้ว — ใครกิน?' }[mode]}</span>
  </div>;
}
