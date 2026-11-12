// ภาพประกอบของแต่ละเกม วาดด้วย SVG ล้วน (คมทุกขนาดจอ ไม่ต้องโหลดไฟล์รูป)
// viewBox 400×260 ทุกฉาก — ของสำคัญอยู่แถบกลาง เพราะการ์ดเกมจะครอปบน-ล่าง
import React from 'react';

const S = ({ id, children, label }) => <svg className="scene" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} data-scene={id}>{children}</svg>;

// ---------- 🏯 Spyfall Thai: วัดยามอาทิตย์ตก + เงาสายลับ ----------
function SpyfallScene() {
  const prang = 'M172 215 L176 172 L182 170 L184 142 L190 140 L192 114 L196 112 L198 82 L200 48 L202 82 L204 112 L208 114 L210 140 L216 142 L218 170 L224 172 L228 215 Z';
  return <S id="spyfall" label="วัดยามเย็นกับเงาสายลับ">
    <defs>
      <linearGradient id="sf-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a0a14" /><stop offset=".45" stopColor="#7a2422" /><stop offset=".8" stopColor="#e0873f" /><stop offset="1" stopColor="#f4b25e" /></linearGradient>
      <radialGradient id="sf-sun"><stop offset="0" stopColor="#fff0b8" /><stop offset=".55" stopColor="#ffc96a" /><stop offset="1" stopColor="#ffa94a" stopOpacity="0" /></radialGradient>
      <path id="sf-prang" d={prang} />
    </defs>
    <rect width="400" height="260" fill="url(#sf-sky)" />
    <circle className="glow" cx="262" cy="128" r="95" fill="url(#sf-sun)" opacity=".55" />
    <circle cx="262" cy="128" r="46" fill="#ffd98a" />
    <g className="fly" fill="none" stroke="#2a0a14" strokeWidth="2" strokeLinecap="round" opacity=".7"><path d="M60 60 q6 -6 12 0 q6 -6 12 0" /><path d="M96 44 q5 -5 10 0 q5 -5 10 0" /><path d="M330 52 q5 -5 10 0 q5 -5 10 0" /></g>
    <g fill="#1c0a0e">
      <use href="#sf-prang" transform="translate(128,215) scale(.62) translate(-200,-215)" />
      <use href="#sf-prang" transform="translate(272,215) scale(.62) translate(-200,-215)" />
      <use href="#sf-prang" />
      <rect x="199.2" y="28" width="1.6" height="22" />
      <path d="M8 216 V190 H124 V216 Z" /><path d="M0 194 L66 150 L132 194 Z" /><path d="M18 176 L66 138 L114 176 Z" /><path d="M66 138 q2 -12 10 -12 q-6 4 -4 10 Z" /><path d="M0 194 q-2 -10 6 -14 q-2 6 2 12 Z" /><path d="M132 194 q2 -10 -6 -14 q2 6 -2 12 Z" />
    </g>
    <rect y="215" width="400" height="45" fill="#14070a" />
    <g className="drift" stroke="#ffcf7a" strokeLinecap="round" opacity=".45"><path d="M228 226 H296" strokeWidth="3" /><path d="M240 236 H284" strokeWidth="2.5" /><path d="M250 246 H274" strokeWidth="2" /></g>
    <g fill="#0b0405" transform="translate(-18 0)">
      <path d="M314 260 L318 206 Q322 190 340 189 Q358 190 362 206 L366 260 Z" />
      <circle cx="340" cy="180" r="9" />
      <path d="M324 170 Q326 152 340 152 Q354 152 356 170 Z" /><ellipse cx="340" cy="170" rx="24" ry="4.5" />
      <path d="M330 192 L340 214 L350 192 Z" fill="#2a0a14" />
    </g>
    <rect x="306" y="165" width="32" height="3" fill="#e9b84e" opacity=".8" />
  </S>;
}

// ---------- 🤫 SPY: แฟ้มลับ เลเซอร์ หมวกสายลับ ----------
function SpyScene() {
  return <S id="spy" label="แฟ้มลับสุดยอด">
    <defs>
      <radialGradient id="sp-bg" cx=".6" cy=".35" r=".8"><stop offset="0" stopColor="#1c2626" /><stop offset="1" stopColor="#050707" /></radialGradient>
      <clipPath id="sp-photo"><rect x="132" y="96" width="44" height="52" /></clipPath>
    </defs>
    <rect width="400" height="260" fill="url(#sp-bg)" />
    <g stroke="#fff" strokeOpacity=".05">{Array.from({ length: 13 }, (_, i) => <path key={'v' + i} d={`M${i * 32} 0V260`} />)}{Array.from({ length: 9 }, (_, i) => <path key={'h' + i} d={`M0 ${i * 32}H400`} />)}</g>
    <g fill="none" stroke="#ff4f4f" strokeOpacity=".22"><circle cx="318" cy="70" r="34" /><circle cx="318" cy="70" r="64" /><circle cx="318" cy="70" r="96" /><path d="M318 0V150M230 70H400" /></g>
    <path className="sweep" d="M318 70 L380 30 A74 74 0 0 1 392 64 Z" fill="#ff4f4f" opacity=".14" />
    <g className="laser" stroke="#ff3b3b" strokeWidth="1.2" opacity=".55"><path d="M0 214 L400 150" /><path d="M0 120 L400 238" /></g>
    <g transform="rotate(-7 200 150)">
      <path d="M104 92 v-14 q0-6 6-6 h58 q6 0 8 6 l5 14 Z" fill="#a8894f" />
      <rect x="104" y="88" width="196" height="136" rx="6" fill="#a8894f" />
      <rect x="118" y="80" width="172" height="124" fill="#efe7d6" />
      <rect x="132" y="96" width="44" height="52" fill="#cfc6b2" />
      <g clipPath="url(#sp-photo)" fill="#5d564a"><circle cx="154" cy="116" r="11" /><path d="M134 150 Q136 128 154 128 Q172 128 174 150 Z" /><path d="M140 108 Q141 99 154 99 Q167 99 168 108 Z" /><ellipse cx="154" cy="108" rx="18" ry="3" /></g>
      <g fill="#1d1d1d"><rect x="186" y="98" width="88" height="7" /><rect x="186" y="112" width="60" height="7" /><rect x="186" y="126" width="76" height="7" /><rect x="132" y="160" width="140" height="6" /><rect x="132" y="172" width="96" height="6" /></g>
      <g fill="#9a917f"><rect x="246" y="112" width="24" height="7" /><rect x="232" y="172" width="38" height="6" /></g>
      <rect x="104" y="150" width="196" height="74" rx="6" fill="#c9a96b" />
      <g transform="rotate(-10 202 188)"><rect x="140" y="170" width="126" height="34" rx="3" fill="none" stroke="#d42a2a" strokeWidth="3.5" /><text x="203" y="195" textAnchor="middle" fontFamily="'Chakra Petch',monospace" fontWeight="700" fontSize="21" letterSpacing="3" fill="#d42a2a">TOP SECRET</text></g>
    </g>
    <g transform="translate(244 56) rotate(8)">
      <ellipse cx="50" cy="44" rx="56" ry="11" fill="#0b0d0d" />
      <path d="M14 44 Q16 6 50 4 Q84 6 86 44 Z" fill="#161b1b" /><path d="M36 10 Q50 20 64 10" stroke="#0b0d0d" strokeWidth="4" fill="none" />
      <path d="M15 34 Q50 42 85 34 L86 44 Q50 50 14 44 Z" fill="#d42a2a" />
    </g>
    <g transform="translate(64 196) rotate(-38)">
      <rect x="-5" y="26" width="10" height="44" rx="4" fill="#2a2a2a" />
      <circle r="28" fill="#9fd6ff" fillOpacity=".14" stroke="#c3cecb" strokeWidth="7" />
      <path d="M-14 -12 Q-6 -20 6 -18" stroke="#fff" strokeOpacity=".5" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  </S>;
}

// ---------- 🙈 คำบนหัว: หัวสามหัวแปะโน้ต ----------
function HeadScene() {
  const heads = [
    { x: 92, y: 182, c: '#38d9c9', note: '#fff3a3', word: 'ช้าง', r: -8, look: 0 },
    { x: 200, y: 170, c: '#ffd23f', note: '#ffc6de', word: '???', r: 3, look: -1 },
    { x: 308, y: 182, c: '#ff5fa2', note: '#b6f0e6', word: 'ส้มตำ', r: 7, look: 0 },
  ];
  const conf = [[30, 40, '#ffd23f'], [70, 90, '#38d9c9'], [150, 30, '#ff5fa2'], [250, 22, '#ffd23f'], [370, 60, '#38d9c9'], [340, 110, '#ffd23f'], [20, 140, '#ff5fa2'], [120, 70, '#fff'], [280, 80, '#fff'], [390, 150, '#ff5fa2']];
  return <S id="headword" label="เพื่อนสามคนแปะคำไว้บนหัว">
    <defs><linearGradient id="hw-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2b1660" /><stop offset=".6" stopColor="#5a1e7a" /><stop offset="1" stopColor="#b0306f" /></linearGradient></defs>
    <rect width="400" height="260" fill="url(#hw-bg)" />
    <circle cx="200" cy="300" r="190" fill="#fff" opacity=".05" />
    {conf.map(([x, y, c], i) => i % 2 ? <rect className="float" key={i} x={x} y={y} width="10" height="5" rx="2" fill={c} opacity=".8" transform={`rotate(${i * 37} ${x} ${y})`} /> : <circle className="float" key={i} cx={x} cy={y} r="3.5" fill={c} opacity=".8" />)}
    {heads.map((h, i) => <g key={i} className="bob" style={{ animationDelay: (-i * 0.8) + 's' }}>
      <path d={`M${h.x - 52} 262 Q${h.x - 50} ${h.y + 36} ${h.x} ${h.y + 34} Q${h.x + 50} ${h.y + 36} ${h.x + 52} 262 Z`} fill={h.c} opacity=".55" />
      <circle cx={h.x} cy={h.y} r="38" fill={h.c} />
      <g fill="#fff"><ellipse cx={h.x - 13} cy={h.y + 4} rx="8" ry="9" /><ellipse cx={h.x + 13} cy={h.y + 4} rx="8" ry="9" /></g>
      <g fill="#241238"><circle cx={h.x - 12 + h.look} cy={h.y + (h.look ? -1 : 6)} r="4" /><circle cx={h.x + 14 + h.look} cy={h.y + (h.look ? -1 : 6)} r="4" /></g>
      {h.look ? <ellipse cx={h.x} cy={h.y + 24} rx="6" ry="5" fill="#241238" /> : <path d={`M${h.x - 12} ${h.y + 20} Q${h.x} ${h.y + 31} ${h.x + 12} ${h.y + 20}`} stroke="#241238" strokeWidth="3.5" fill="none" strokeLinecap="round" />}
      <g transform={`rotate(${h.r} ${h.x} ${h.y - 44})`}>
        <rect x={h.x - 33} y={h.y - 70} width="66" height="44" rx="3" fill={h.note} />
        <rect x={h.x - 12} y={h.y - 75} width="24" height="9" fill="#fff" opacity=".6" />
        <text x={h.x} y={h.y - 41} textAnchor="middle" fontFamily="Mitr,sans-serif" fontWeight="700" fontSize={h.word === '???' ? 20 : 16} fill="#2b2140">{h.word}</text>
      </g>
    </g>)}
    <g transform="translate(40 44)"><path d="M0 12 Q0 0 14 0 H124 Q138 0 138 12 V30 Q138 42 124 42 H118 L124 58 L100 42 H14 Q0 42 0 30 Z" fill="#fff" /><text x="69" y="27" textAnchor="middle" fontFamily="Mitr,sans-serif" fontWeight="600" fontSize="14" fill="#2b1660">ฉันกินได้ไหม?</text></g>
  </S>;
}

// ---------- 🧭 ออกสำรวจ: ซากวิหารในป่า เส้นทางแผนที่ ตะเกียง ----------
function ExploreScene() {
  return <S id="explore" label="ซากวิหารโบราณกลางป่า">
    <defs>
      <linearGradient id="ex-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d2a22" /><stop offset=".55" stopColor="#2f5a3c" /><stop offset=".85" stopColor="#c99a4f" /><stop offset="1" stopColor="#e8bd6a" /></linearGradient>
      <radialGradient id="ex-lamp"><stop offset="0" stopColor="#ffe9a8" stopOpacity=".9" /><stop offset="1" stopColor="#ffb84a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="400" height="260" fill="url(#ex-sky)" />
    <circle cx="300" cy="150" r="42" fill="#f6d68a" opacity=".85" />
    <path d="M0 170 L50 120 L95 150 L150 96 L210 150 L260 112 L320 160 L370 118 L400 140 V260 H0Z" fill="#24503a" opacity=".8" />
    <path d="M0 200 L60 160 L120 190 L180 150 L250 192 L320 164 L400 196 V260 H0Z" fill="#173a2a" />
    <g fill="#2c311f">
      <rect x="138" y="204" width="124" height="22" /><rect x="150" y="184" width="100" height="22" /><rect x="162" y="166" width="76" height="20" /><rect x="176" y="150" width="48" height="18" /><path d="M186 152 V130 L200 118 L214 130 V152 Z" />
    </g>
    <g fill="#434a2c"><rect x="138" y="204" width="124" height="3" /><rect x="150" y="184" width="100" height="3" /><rect x="162" y="166" width="76" height="3" /><rect x="176" y="150" width="48" height="3" /></g>
    <path d="M195 152 V138 Q200 132 205 138 V152 Z" fill="#0b130f" />
    <path d="M196 226 V212 Q200 206 204 212 V226" fill="#0b130f" />
    <g fill="none" stroke="#3f7a3d" strokeWidth="2.5" strokeLinecap="round"><path d="M160 168 q-6 14 2 24 q-8 8 -2 20" /><path d="M236 168 q8 10 0 22" /><path d="M188 132 q-10 8 -4 20" /></g>
    <path d="M30 258 C70 236 90 240 120 226 S170 222 196 226" fill="none" stroke="#f1cf82" strokeWidth="3.5" strokeDasharray="1 9" strokeLinecap="round" />
    <g stroke="#e0525a" strokeWidth="4" strokeLinecap="round"><path d="M226 228 l12 12M238 228 l-12 12" /></g>
    <circle className="glow" cx="86" cy="206" r="40" fill="url(#ex-lamp)" />
    <g transform="translate(86 206)"><path d="M-7 -16 h14 l-2 -6 h-10 Z" fill="#2c311f" /><rect x="-9" y="-16" width="18" height="24" rx="4" fill="#ffd77a" stroke="#5b4a22" strokeWidth="2.5" /><path d="M-4 -24 q4 -8 8 0" fill="none" stroke="#5b4a22" strokeWidth="2" /><path className="flick" d="M0 -10 q4 6 0 10 q-4 -4 0 -10" fill="#ff9b3d" /></g>
    <g fill="#0a1a12"><path d="M0 260 Q14 170 92 140 Q46 200 30 260 Z" /><path d="M0 230 Q40 210 70 226 Q30 236 0 252 Z" /><path d="M400 260 Q392 170 318 150 Q360 210 368 260 Z" /><path d="M400 214 Q362 196 330 214 Q370 222 400 236 Z" /></g>
    <g transform="translate(72 80)" opacity=".85"><circle r="24" fill="none" stroke="#f1cf82" strokeWidth="2" /><circle r="18" fill="none" stroke="#f1cf82" strokeOpacity=".5" /><path d="M0 -22 L5 0 L0 22 L-5 0 Z" fill="#f1cf82" /><path d="M-22 0 L0 -4 L22 0 L0 4 Z" fill="#f1cf82" opacity=".6" /><text y="-28" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f1cf82">N</text></g>
  </S>;
}

// ---------- 🐺 แวร์วูฟ: พระจันทร์เต็มดวง หมาป่าหอน หมู่บ้าน ----------
function WolfScene() {
  const pines = [12, 40, 70, 104, 136, 168, 360, 386].map((x, i) => { const h = 50 + (i * 23) % 40, b = 214; return `M${x} ${b - h} L${x + 16} ${b} L${x - 16} ${b} Z`; }).join(' ');
  const stars = [[30, 30], [80, 64], [130, 22], [168, 80], [40, 110], [360, 30], [380, 120], [200, 40], [110, 140]];
  return <S id="werewolf" label="หมาป่าหอนใต้พระจันทร์เต็มดวง">
    <defs>
      <linearGradient id="wf-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#070b24" /><stop offset=".6" stopColor="#1a2150" /><stop offset="1" stopColor="#3a1630" /></linearGradient>
      <radialGradient id="wf-glow"><stop offset="0" stopColor="#d6dfff" stopOpacity=".35" /><stop offset="1" stopColor="#d6dfff" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="400" height="260" fill="url(#wf-sky)" />
    {stars.map(([x, y], i) => <circle className="tw" key={i} cx={x} cy={y} r={i % 3 ? 1.1 : 1.8} fill="#fff" opacity={i % 2 ? .5 : .85} />)}
    <circle className="glow" cx="262" cy="92" r="110" fill="url(#wf-glow)" />
    <circle cx="262" cy="92" r="56" fill="#eef1ff" />
    <g fill="#cdd5f2"><circle cx="244" cy="76" r="9" /><circle cx="280" cy="104" r="12" /><circle cx="258" cy="118" r="5" /><circle cx="286" cy="72" r="5" /></g>
    <path d={pines} fill="#0e1536" />
    <path d="M0 214 H400 V260 H0 Z" fill="#090d24" />
    <g fill="#141a3c"><path d="M40 214 V192 L58 178 L76 192 V214 Z" /><path d="M96 214 V196 L110 186 L124 196 V214 Z" /></g>
    <g fill="#ffcf6b"><rect x="52" y="198" width="7" height="7" /><rect x="64" y="198" width="7" height="7" opacity=".6" /><rect x="106" y="202" width="7" height="6" /></g>
    <g className="tw" fill="#e0525a"><ellipse cx="160" cy="222" rx="2.4" ry="1.4" /><ellipse cx="170" cy="222" rx="2.4" ry="1.4" /></g>
    <path d="M186 260 Q212 206 258 186 Q298 172 400 178 V260 Z" fill="#05071a" />
    <path transform="translate(262 88) scale(.9)" fill="#05071a" d="M44 100 L46 72 Q42 60 46 50 Q48 40 50 36 L44 24 L33 8 L36 5 L52 22 L56 28 L60 18 L64 32 Q72 42 80 54 Q86 70 82 86 Q92 86 96 92 Q94 100 84 98 L78 100 Z" />
    <ellipse className="drift" cx="200" cy="246" rx="240" ry="18" fill="#c5cbe8" opacity=".09" />
  </S>;
}

// ---------- 🍰 เค้กหายไปไหน: ตู้เย็นเปิดกลางดึก นาฬิกาตีสาม ----------
function CakeScene() {
  return <S id="cake" label="ตู้เย็นเปิดกลางดึก มีเค้กหนึ่งชิ้น">
    <defs>
      <linearGradient id="ck-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d1640" /><stop offset="1" stopColor="#3b1f52" /></linearGradient>
      <linearGradient id="ck-light" x1="0" y1="0" x2="-1" y2="1"><stop offset="0" stopColor="#fff4c9" stopOpacity=".35" /><stop offset="1" stopColor="#fff4c9" stopOpacity="0" /></linearGradient>
      <mask id="ck-moon"><rect width="400" height="260" fill="#fff" /><circle cx="104" cy="72" r="18" fill="#000" /></mask>
    </defs>
    <rect width="400" height="260" fill="url(#ck-bg)" />
    <rect y="222" width="400" height="38" fill="#241a3a" />
    <g><rect x="30" y="34" width="112" height="92" rx="6" fill="#0d0a22" stroke="#6b5a8a" strokeWidth="5" /><path d="M86 34 V126 M30 80 H142" stroke="#6b5a8a" strokeWidth="4" /><circle cx="96" cy="66" r="16" fill="#ffe9c7" mask="url(#ck-moon)" /><g className="tw" fill="#fff"><circle cx="50" cy="52" r="1.5" /><circle cx="64" cy="102" r="1.2" /><circle cx="122" cy="104" r="1.6" /><circle cx="128" cy="48" r="1" /></g></g>
    <g transform="translate(332 82)"><circle r="28" fill="#2a2342" stroke="#ffe9c7" strokeWidth="4" />{[0, 1, 2, 3].map(i => <rect key={i} x="-1.5" y="-24" width="3" height="6" fill="#ffe9c7" transform={`rotate(${i * 90})`} />)}<path d="M0 0 V-17" stroke="#ff8fb3" strokeWidth="3" strokeLinecap="round" /><path d="M0 0 H13" stroke="#ffe9c7" strokeWidth="4" strokeLinecap="round" /><circle r="3" fill="#ffe9c7" /><text y="44" textAnchor="middle" fontFamily="Mali,sans-serif" fontWeight="700" fontSize="12" fill="#ffe9c7">ตี 3</text></g>
    <path d="M178 250 L40 262 L0 262 V260 L178 70 Z" fill="url(#ck-light)" />
    <rect x="178" y="56" width="116" height="196" rx="14" fill="#e6e0f4" />
    <rect x="186" y="66" width="100" height="176" rx="8" fill="#fff6d6" />
    <g stroke="#e8d9a8" strokeWidth="3"><path d="M186 122 H286" /><path d="M186 182 H286" /></g>
    <g><rect x="196" y="82" width="20" height="38" rx="3" fill="#bfe3ff" /><path d="M196 82 l10 -10 l10 10 Z" fill="#9fcff5" /><rect x="254" y="94" width="22" height="26" rx="5" fill="#ffd27a" /><rect x="252" y="90" width="26" height="7" rx="3" fill="#e0525a" /></g>
    <ellipse cx="236" cy="174" rx="38" ry="6" fill="#fff" stroke="#e8d9a8" strokeWidth="2" />
    <path d="M206 150 L262 140 L262 168 L206 174 Z" fill="#ffe9c7" />
    <g fill="#ff8fb3"><path d="M206 158 L262 151 L262 157 L206 164 Z" /></g>
    <path d="M206 150 L262 140 L252 134 L200 142 Z" fill="#fff" />
    <path d="M200 142 L206 150 L206 174 L200 166 Z" fill="#f4d7ae" />
    <circle cx="236" cy="134" r="7" fill="#ff4f6d" /><path d="M233 127 l3 3 l3 -3" stroke="#3fb56a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <rect x="198" y="198" width="76" height="18" rx="4" fill="#d9f0c4" /><rect x="204" y="190" width="24" height="10" rx="3" fill="#ffb3c8" />
    <path d="M178 60 L132 76 L132 238 L178 250 Z" fill="#d4cbec" /><rect x="140" y="128" width="5" height="40" rx="2.5" fill="#9b8fc0" />
    <g className="peek"><g transform="translate(316 168)"><circle r="24" fill="#0d0a1c" /><rect x="-24" y="-8" width="48" height="11" fill="#ff6b9a" /><ellipse cx="-8" cy="-2" rx="4" ry="3" fill="#fff" /><ellipse cx="8" cy="-2" rx="4" ry="3" fill="#fff" /><circle cx="-10" cy="-2" r="1.6" fill="#0d0a1c" /><circle cx="6" cy="-2" r="1.6" fill="#0d0a1c" /></g>
    <path d="M294 150 Q302 146 304 156" stroke="#0d0a1c" strokeWidth="9" strokeLinecap="round" fill="none" /></g>
    <g transform="translate(72 214) rotate(-16)"><rect x="-17" y="-17" width="34" height="34" rx="7" fill="#fff" /><g fill="#3b1f52"><circle cx="-8" cy="-8" r="3.4" /><circle r="3.4" /><circle cx="8" cy="8" r="3.4" /></g></g>
  </S>;
}

// ---------- หน้ารวมเกม: ลูกเต๋า หมาก การ์ด ----------
export function HubArt() {
  return <svg className="hub-art" viewBox="0 0 320 240" aria-hidden="true">
    <defs><linearGradient id="hb-die" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe3a0" /><stop offset="1" stopColor="#f6ad4d" /></linearGradient></defs>
    <g transform="translate(40 40) rotate(-12)"><rect width="92" height="128" rx="10" fill="#2c191d" stroke="#e9b84e" strokeWidth="3" /><text x="46" y="78" textAnchor="middle" fontSize="44">🏯</text></g>
    <g transform="translate(110 22) rotate(4)"><rect width="92" height="128" rx="10" fill="#111515" stroke="#ff4f4f" strokeWidth="3" /><text x="46" y="78" textAnchor="middle" fontSize="44">🕵️</text></g>
    <g transform="translate(182 38) rotate(16)"><rect width="92" height="128" rx="10" fill="#0f1429" stroke="#d6dfff" strokeWidth="3" /><text x="46" y="78" textAnchor="middle" fontSize="44">🐺</text></g>
    <g transform="translate(70 160) rotate(-18)"><rect x="-30" y="-30" width="60" height="60" rx="12" fill="url(#hb-die)" /><g fill="#2b1a20"><circle cx="-14" cy="-14" r="5.5" /><circle cx="14" cy="-14" r="5.5" /><circle r="5.5" /><circle cx="-14" cy="14" r="5.5" /><circle cx="14" cy="14" r="5.5" /></g></g>
    <g transform="translate(250 182) rotate(14)"><rect x="-26" y="-26" width="52" height="52" rx="11" fill="#fff" /><g fill="#2b1a20"><circle cx="-11" cy="-11" r="5" /><circle cx="11" cy="11" r="5" /></g></g>
    <path d="M160 226 h-28 q-4 0 -3 -5 l9 -22 q-14 -2 -16 -12 q0 -8 12 -8 q-6 -6 -6 -14 q0 -16 18 -16 q18 0 18 16 q0 8 -6 14 q12 0 12 8 q-2 10 -16 12 l9 22 q1 5 -3 5 Z" fill="#ff8fb3" />
  </svg>;
}

export function BrandMark() {
  return <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><rect x="9" y="3" width="20" height="20" rx="5" fill="#fff" opacity=".9" transform="rotate(14 19 13)" /><rect x="3" y="9" width="20" height="20" rx="5" fill="var(--accent)" /><g fill="var(--on-accent)"><circle cx="8.5" cy="14.5" r="2" /><circle cx="13" cy="19" r="2" /><circle cx="17.5" cy="23.5" r="2" /></g></svg>;
}

// ---------- 💥 ทุเรียนตูม: แผงผลไม้ ทุเรียนชนวนติดไฟ คนหนีบจมูก ----------
function BoomScene() {
  const spikes = (cx, cy, rx, ry, n, c) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry; return <path key={i} d={`M${x} ${y} l${Math.cos(a) * 12} ${Math.sin(a) * 12} l${Math.cos(a + 1.3) * 7} ${Math.sin(a + 1.3) * 7} Z`} fill={c} />; });
  return <S id="boom" label="ทุเรียนลูกใหญ่มีชนวนติดไฟอยู่บนแผงผลไม้">
    <defs>
      <linearGradient id="bm-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a1a08" /><stop offset=".55" stopColor="#6a3a10" /><stop offset="1" stopColor="#c0661a" /></linearGradient>
      <radialGradient id="bm-burst" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#fff2a8" stopOpacity=".9" /><stop offset=".5" stopColor="#ffb03a" stopOpacity=".45" /><stop offset="1" stopColor="#ff7a1a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="400" height="260" fill="url(#bm-sky)" />
    <g opacity=".5"><path d="M0 70 L40 40 L80 70 Z M70 70 L120 30 L170 70 Z M300 70 L345 34 L390 70 Z" fill="#3a2410" /></g>
    {/* ผ้าใบแผงลอย */}
    <path d="M0 26 H400 V52 Q380 66 360 52 Q340 66 320 52 Q300 66 280 52 Q260 66 240 52 Q220 66 200 52 Q180 66 160 52 Q140 66 120 52 Q100 66 80 52 Q60 66 40 52 Q20 66 0 52 Z" fill="#d9352b" />
    <g fill="#fff3dc">{[0, 80, 160, 240, 320].map(x => <path key={x} d={`M${x + 40} 26 H${x + 80} V52 Q${x + 60} 66 ${x + 40} 52 Z`} />)}</g>
    <circle className="glow" cx="200" cy="138" r="104" fill="url(#bm-burst)" />
    {/* ลังไม้ */}
    <g><rect x="0" y="196" width="400" height="64" fill="#5a3410" /><g stroke="#3a2008" strokeWidth="3">{[214, 232].map(y => <path key={y} d={`M0 ${y} H400`} />)}{[60, 140, 260, 340].map(x => <path key={x} d={`M${x} 196 V260`} />)}</g></g>
    {/* ผลไม้ข้าง ๆ */}
    <g className="float"><circle cx="70" cy="182" r="18" fill="#5b2a5e" /><g fill="#4f8a3a"><ellipse cx="70" cy="164" rx="5" ry="8" /><ellipse cx="62" cy="168" rx="5" ry="7" transform="rotate(-50 62 168)" /><ellipse cx="78" cy="168" rx="5" ry="7" transform="rotate(50 78 168)" /></g></g>
    <g className="float"><g stroke="#3fae4a" strokeWidth="3" fill="none" strokeLinecap="round">{Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return <path key={i} d={`M${112 + Math.cos(a) * 15} ${186 + Math.sin(a) * 15} l${Math.cos(a) * 8} ${Math.sin(a) * 8}`} />; })}</g><circle cx="112" cy="186" r="15" fill="#e0303a" /></g>
    <g className="float"><path d="M300 196 Q296 168 318 164 Q340 162 338 186 Q336 200 318 200 Z" fill="#ffc93a" /><path d="M318 164 q4 -8 12 -8" stroke="#4f8a3a" strokeWidth="4" fill="none" /></g>
    {/* ทุเรียนลูกใหญ่ + ชนวน */}
    <g className="bob">
      {spikes(200, 150, 50, 44, 22, '#6f8a22')}
      <ellipse cx="200" cy="150" rx="50" ry="45" fill="#a3b13a" />
      <g fill="#8a9a2c">{[[180, 130], [206, 124], [224, 146], [188, 160], [212, 172], [170, 152]].map(([x, y], i) => <path key={i} d={`M${x} ${y} l6 -9 l6 9 Z`} />)}</g>
      <g fill="#2b1d10"><ellipse cx="184" cy="146" rx="5" ry="6" /><ellipse cx="216" cy="146" rx="5" ry="6" /></g><path d="M186 166 q14 10 28 0" stroke="#2b1d10" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M200 106 Q204 86 222 80 Q236 76 240 64" stroke="#5a4a1a" strokeWidth="5" fill="none" strokeLinecap="round" />
      <g className="flick"><path d="M240 64 Q232 48 242 38 Q244 50 250 46 Q252 58 240 64 Z" fill="#ffcf5a" /><path d="M240 62 Q236 54 241 48 Q244 56 246 54 Q246 60 240 62 Z" fill="#fff" /></g>
      <g className="tw" fill="#ffe08a"><circle cx="256" cy="44" r="2.5" /><circle cx="230" cy="40" r="2" /><circle cx="252" cy="62" r="1.8" /></g>
    </g>
    {/* คนหนีบจมูก */}
    <g className="peek"><g transform="translate(352 150)"><circle r="26" fill="#ffd2a8" /><path d="M-26 -6 Q-24 -30 0 -30 Q24 -30 26 -6 Q14 -18 0 -16 Q-14 -18 -26 -6 Z" fill="#2b1d10" /><path d="M-12 -4 l6 4 l-6 4 M12 -4 l-6 4 l6 4" stroke="#2b1d10" strokeWidth="3" fill="none" strokeLinecap="round" /><rect x="-5" y="2" width="10" height="16" rx="3" fill="#d9a66a" /><path d="M-9 20 q9 6 18 0" stroke="#2b1d10" strokeWidth="3" fill="none" strokeLinecap="round" /><g stroke="#9ab03a" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".8"><path d="M-46 -20 q-6 -8 2 -14" /><path d="M-52 4 q-8 -6 0 -12" /></g></g></g>
  </S>;
}
// ---------- 💼 ปิดดีล!: ตึกสูงยามค่ำ โต๊ะประชุม มือจับกัน เหรียญทอง หมวกเจ้าสัว ----------
function DealScene() {
  return <S id="deal" label="ตึกสูงยามค่ำคืน มีมือสองข้างจับกันปิดดีล เหรียญทองลอยอยู่">
    <defs><linearGradient id="dl-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a1030" /><stop offset=".7" stopColor="#1d3270" /><stop offset="1" stopColor="#6a4a90" /></linearGradient>
      <radialGradient id="dl-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffe08a" stopOpacity=".55" /><stop offset="1" stopColor="#f5c451" stopOpacity="0" /></radialGradient></defs>
    <rect width="400" height="260" fill="url(#dl-sky)" />
    <circle cx="330" cy="50" r="22" fill="#ffe9a8" opacity=".85" />
    <g fill="#0b1230">{[[0, 140, 40], [36, 100, 34], [66, 150, 30], [92, 80, 38], [126, 120, 30], [262, 110, 32], [290, 70, 40], [326, 130, 34], [356, 96, 44]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height={260 - y} />)}<path d="M305 70 L310 36 L315 70 Z" /></g>
    <g className="tw" fill="#ffd76a">{Array.from({ length: 40 }, (_, i) => <rect key={i} x={(i * 41) % 396 + 2} y={96 + ((i * 29) % 120)} width="4" height="5" opacity={0.4 + ((i * 3) % 5) / 10} />)}</g>
    <circle className="glow" cx="200" cy="150" r="96" fill="url(#dl-glow)" />
    <rect x="40" y="206" width="320" height="18" rx="6" fill="#5a3a1a" /><rect x="60" y="224" width="12" height="36" fill="#3a2410" /><rect x="328" y="224" width="12" height="36" fill="#3a2410" />
    {/* มือจับกัน */}
    <g className="bob"><path d="M96 176 L150 150 L168 168 L112 196 Z" fill="#2a3a6a" /><path d="M304 176 L250 150 L232 168 L288 196 Z" fill="#3a2a5a" />
      <path d="M148 150 Q170 136 196 146 L214 140 Q236 138 252 152 L236 172 Q214 180 196 174 Q172 182 164 170 Z" fill="#ffd2a8" />
      <g stroke="#c98a5a" strokeWidth="2.5" fill="none" strokeLinecap="round"><path d="M188 150 q8 6 18 4" /><path d="M194 160 q8 6 18 4" /><path d="M200 168 q8 4 16 2" /></g>
      <rect x="140" y="146" width="12" height="28" rx="3" fill="#fff" transform="rotate(-25 146 160)" /><rect x="250" y="146" width="12" height="28" rx="3" fill="#fff" transform="rotate(25 256 160)" /></g>
    {/* หมวกเจ้าสัว + เหรียญ */}
    <g className="float"><g transform="translate(200 82)"><ellipse rx="40" ry="9" fill="#141418" /><path d="M-24 0 V-40 Q0 -46 24 -40 V0 Z" fill="#1d1d24" /><rect x="-24" y="-12" width="48" height="8" fill="#c0392b" /></g></g>
    {[[90, 110], [320, 150], [128, 64], [282, 92]].map(([x, y], i) => <g key={i} className="float"><circle cx={x} cy={y} r="13" fill="#f5c451" stroke="#b8862a" strokeWidth="3" /><text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill="#8a5a10" fontFamily="sans-serif">฿</text></g>)}
  </S>;
}
// ---------- 🌶️ ตำแหลก!: แผงส้มตำ ครกดินเผาใบโต สากตำขึ้นลง ไพ่ 4 รสปลิวว่อน ป้าย +10 ----------
const TamC = ({ x, y, r, c1, c2, t }) => <g transform={`translate(${x} ${y}) rotate(${r})`}><rect x="-18" y="-25" width="36" height="50" rx="5" fill="#fff8ea" /><rect x="-15.5" y="-22.5" width="31" height="45" rx="4" fill={c1} />
  <path d="M-12 -7 h24 q0 17 -12 19 q-12 -2 -12 -19 z" fill="#fff8ea" /><text y="7" textAnchor="middle" fontSize={t.length > 1 ? 10 : 14} fill={c2} fontFamily="Chonburi,Kanit,sans-serif">{t}</text></g>;
function TamScene() {
  return <S id="tam" label="ครกส้มตำใบใหญ่บนแผงริมทาง มีไพ่สี่รสปลิวออกมา">
    <defs>
      <linearGradient id="tm-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a0e08" /><stop offset=".6" stopColor="#8a2a10" /><stop offset="1" stopColor="#e0661a" /></linearGradient>
      <radialGradient id="tm-burst" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffe08a" stopOpacity=".8" /><stop offset=".55" stopColor="#ff7a3a" stopOpacity=".32" /><stop offset="1" stopColor="#ff3a1a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="400" height="260" fill="url(#tm-sky)" />
    <path d="M0 22 H400 V46 Q380 60 360 46 Q340 60 320 46 Q300 60 280 46 Q260 60 240 46 Q220 60 200 46 Q180 60 160 46 Q140 60 120 46 Q100 60 80 46 Q60 60 40 46 Q20 60 0 46 Z" fill="#2f8a2c" />
    <g fill="#fff8ea">{[0, 80, 160, 240, 320].map(x => <path key={x} d={`M${x + 40} 22 H${x + 80} V46 Q${x + 60} 60 ${x + 40} 46 Z`} />)}</g>
    <circle className="glow" cx="200" cy="140" r="112" fill="url(#tm-burst)" />
    <g><rect x="0" y="200" width="400" height="60" fill="#6a3a14" /><g stroke="#4a2408" strokeWidth="3">{[216, 236].map(y => <path key={y} d={`M0 ${y} H400`} />)}</g></g>
    {/* ไพ่ 4 รสปลิว */}
    <g className="float"><TamC x={76} y={112} r={-18} c1="#ff6a45" c2="#c4241a" t="7" /></g>
    <g className="float"><TamC x={126} y={74} r={-7} c1="#8fd650" c2="#2e8a2c" t="+4" /></g>
    <g className="float"><TamC x={278} y={76} r={8} c1="#ffcf45" c2="#d97c12" t="0" /></g>
    <g className="float"><TamC x={328} y={116} r={20} c1="#55bdf0" c2="#1d5aa6" t="+2" /></g>
    {/* ครกดินเผา + ส้มตำ */}
    <path d="M126 140 H274 Q270 196 200 205 Q130 196 126 140 Z" fill="#b5652c" />
    <path d="M140 162 Q200 176 260 162" stroke="#8a4a1c" strokeWidth="3" fill="none" /><path d="M150 182 Q200 192 250 182" stroke="#8a4a1c" strokeWidth="2.5" fill="none" />
    <rect x="168" y="200" width="64" height="9" rx="3" fill="#8a4a1c" />
    <ellipse cx="200" cy="140" rx="74" ry="14" fill="#8a4a1c" /><ellipse cx="200" cy="140" rx="63" ry="10" fill="#4a2208" />
    <path d="M156 138 q10 -12 22 -3 q8 -11 20 -2 q10 -9 22 0 q8 -7 18 2" stroke="#d8f0a0" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M168 133 q6 -12 17 -10" stroke="#e0303a" strokeWidth="5" fill="none" strokeLinecap="round" /><circle cx="232" cy="131" r="7" fill="#7fd34a" /><circle cx="214" cy="134" r="5" fill="#ff5a3c" />
    {/* สาก */}
    <g className="bob"><path d="M214 128 L258 40" stroke="#d9b07a" strokeWidth="14" strokeLinecap="round" /><path d="M218 120 L224 108" stroke="#a07a4a" strokeWidth="15" strokeLinecap="round" /></g>
    {/* ป้าย +10 */}
    <g className="tw"><g transform="translate(200 66) rotate(-6)"><path d="M-36 -18 L-26 -8 L-42 0 L-26 6 L-32 22 L-12 12 L0 28 L10 12 L32 22 L24 6 L42 0 L26 -8 L34 -18 L14 -14 L0 -30 L-12 -14 Z" fill="#ffd34d" /><text y="8" textAnchor="middle" fontSize="20" fill="#c4241a" fontFamily="Chonburi,Kanit,sans-serif">+10</text></g></g>
    {/* พริก มะนาว มะเขือเทศ */}
    <g className="float"><path d="M58 198 q22 -4 36 -26 q4 -6 -2 -8 q-10 18 -34 26 z" fill="#e0303a" /><path d="M92 165 q4 -7 11 -7" stroke="#3f8a2c" strokeWidth="3" fill="none" /></g>
    <g className="float"><circle cx="334" cy="184" r="16" fill="#7fd34a" /><circle cx="334" cy="184" r="11" fill="#c8f08a" /><g stroke="#7fd34a" strokeWidth="1.5">{[0, 60, 120].map(a => <path key={a} d="M334 173 V195" transform={`rotate(${a} 334 184)`} />)}</g></g>
    <g className="float"><circle cx="302" cy="194" r="10" fill="#ff5a3c" /><path d="M297 185 l5 3 l5 -3" stroke="#3f8a2c" strokeWidth="2" fill="none" /></g>
  </S>;
}
// ---------- 👻 จับผีปอป: หมู่บ้านอีสานยามค่ำ บ้านใต้ถุนสูง ผีปอปลอยกลางดง หมอธรรมถือไต้ เงาคนกระซิบ ----------
function CurseScene() {
  return <S id="curse" label="หมู่บ้านอีสานยามค่ำคืน มีผีปอปลอยอยู่กลางหมู่บ้าน หมอธรรมถือไต้ไฟ">
    <defs>
      <linearGradient id="cs-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#040a07" /><stop offset=".6" stopColor="#0e2418" /><stop offset="1" stopColor="#3a1216" /></linearGradient>
      <radialGradient id="cs-torch" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffcf5a" stopOpacity=".55" /><stop offset="1" stopColor="#ff7a1a" stopOpacity="0" /></radialGradient>
      <radialGradient id="cs-ghost" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#9ff07a" stopOpacity=".35" /><stop offset="1" stopColor="#9ff07a" stopOpacity="0" /></radialGradient>
      <mask id="cs-moon"><rect width="400" height="260" fill="#fff" /><circle cx="318" cy="52" r="24" fill="#000" /></mask>
    </defs>
    <rect width="400" height="260" fill="url(#cs-sky)" />
    <circle cx="306" cy="60" r="26" fill="#e6f0d0" mask="url(#cs-moon)" opacity=".85" />
    <g className="tw" fill="#fff"><circle cx="40" cy="30" r="1.4" /><circle cx="120" cy="20" r="1.1" /><circle cx="210" cy="36" r="1.3" /><circle cx="370" cy="110" r="1.2" /></g>
    {/* ต้นตาลกับบ้านใต้ถุนสูง */}
    <g fill="#06100b"><path d="M14 120 L62 82 L110 120 Z" /><rect x="22" y="118" width="80" height="44" /><g>{[26, 56, 92].map(x => <rect key={x} x={x} y="160" width="6" height="58" />)}</g>
      <path d="M300 128 L340 98 L392 128 Z" /><rect x="306" y="126" width="80" height="38" /><g>{[310, 344, 378].map(x => <rect key={x} x={x} y="162" width="6" height="56" />)}</g>
      <rect x="148" y="70" width="5" height="148" /><g transform="translate(150 70)">{[-70, -40, -10, 20, 50, 80, 110, 140, 170, 200].map(a => <path key={a} d="M0 0 L34 -6 L34 2 Z" transform={`rotate(${a})`} />)}</g></g>
    <rect x="44" y="132" width="16" height="16" fill="#ffcf5a" opacity=".45" /><rect x="352" y="138" width="14" height="14" fill="#ffcf5a" opacity=".3" />
    <rect y="216" width="400" height="44" fill="#050a07" />
    {/* ผีปอป */}
    <circle className="glow" cx="230" cy="120" r="70" fill="url(#cs-ghost)" />
    <g className="bob"><g transform="translate(230 124)">
      <path d="M-34 -14 Q-38 -60 0 -66 Q38 -60 34 -14 Q40 26 30 66 L22 44 L14 72 L6 48 L-2 76 L-10 48 L-18 70 L-24 44 L-32 62 Q-40 26 -34 -14 Z" fill="#0b0808" />
      <path d="M-20 6 Q-28 46 -22 78 L-14 70 L-6 82 L2 70 L10 82 L18 70 L24 78 Q28 46 20 6 Z" fill="#e6efe0" opacity=".8" />
      <path d="M-20 14 Q-42 20 -54 4" stroke="#cfe6bf" strokeWidth="6" fill="none" strokeLinecap="round" /><path d="M20 14 Q42 22 52 8" stroke="#cfe6bf" strokeWidth="6" fill="none" strokeLinecap="round" />
      <g stroke="#0b0808" strokeWidth="2" strokeLinecap="round"><path d="M-55 4 l-5 -4 M-55 4 l-6 1 M-55 4 l-3 -6" /><path d="M53 8 l5 -4 M53 8 l6 1 M53 8 l3 -6" /></g>
      <ellipse cx="0" cy="-24" rx="20" ry="24" fill="#cfe6bf" />
      <path d="M-21 -32 Q-10 -44 0 -38 Q10 -44 21 -32 Q8 -36 0 -30 Q-8 -36 -21 -32 Z" fill="#0b0808" />
      <ellipse cx="-8" cy="-24" rx="5" ry="4" fill="#fff" /><ellipse cx="8" cy="-24" rx="5" ry="4" fill="#fff" />
      <circle cx="-8" cy="-24" r="2.6" fill="#e0303a" /><circle cx="8" cy="-24" r="2.6" fill="#e0303a" />
      <path d="M-11 -10 Q0 -2 11 -10 Q8 2 0 2 Q-8 2 -11 -10 Z" fill="#3a0d14" />
      <path d="M-8 -9 L-6 -4 L-4 -8 Z M4 -8 L6 -4 L8 -9 Z" fill="#fff" />
      <path d="M-3 -2 Q-4 16 2 24 Q6 14 3 -2 Z" fill="#e0525a" /><circle cx="2" cy="28" r="2" fill="#e0303a" />
    </g></g>
    {/* หมอธรรมถือไต้ */}
    <circle className="glow" cx="96" cy="160" r="56" fill="url(#cs-torch)" />
    <g fill="#050a07"><circle cx="84" cy="182" r="9" /><path d="M70 218 q0 -26 14 -28 q14 2 14 28 Z" /><path d="M92 196 L104 168" stroke="#050a07" strokeWidth="6" strokeLinecap="round" /></g>
    <path d="M78 196 Q84 202 92 196" stroke="#f3efe0" strokeWidth="2.5" fill="none" />
    <rect x="102" y="150" width="4" height="22" rx="2" fill="#6b4a2a" transform="rotate(20 104 160)" />
    <g className="flick" transform="translate(108 146)"><path d="M0 -16 Q-8 -4 0 4 Q8 -4 0 -16 Z" fill="#ffcf5a" /><path d="M0 -8 Q-3 -2 0 2 Q3 -2 0 -8 Z" fill="#fff" /></g>
    {/* ดวงไฟผีลอย */}
    <g className="drift"><circle cx="60" cy="64" r="5" fill="#9ff07a" opacity=".85" /><circle cx="60" cy="64" r="13" fill="#9ff07a" opacity=".16" /></g>
    <g className="drift"><circle cx="366" cy="186" r="5" fill="#9ff07a" opacity=".8" /><circle cx="366" cy="186" r="12" fill="#9ff07a" opacity=".14" /></g>
    {/* เงาชาวบ้านกระซิบ */}
    <g fill="#050a07"><circle cx="300" cy="196" r="11" /><path d="M286 236 q0 -28 14 -30 q14 2 14 30 Z" /><circle cx="324" cy="200" r="10" /><path d="M312 236 q0 -24 12 -26 q12 2 12 26 Z" /></g>
    <g className="peek"><path d="M314 176 q-6 -12 6 -18 h22 q10 0 10 10 v4 q0 10 -10 10 h-12 l-8 8 l2 -8 q-10 0 -10 -6 Z" fill="#eef8ec" opacity=".9" /><text x="332" y="172" textAnchor="middle" fontSize="13" fontWeight="900" fill="#3a0d14" fontFamily="sans-serif">ปอป!</text></g>
  </S>;
}
const SCENES = { spyfall: SpyfallScene, spy: SpyScene, headword: HeadScene, explore: ExploreScene, werewolf: WolfScene, cake: CakeScene, boom: BoomScene, curse: CurseScene, tam: TamScene, deal: DealScene };
export function SceneArt({ id }) { const C = SCENES[id] || SpyfallScene; return <C />; }
