// ภาพประกอบของแต่ละเกม วาดด้วย SVG ล้วน (คมทุกขนาดจอ ไม่ต้องโหลดไฟล์รูป)
// viewBox 400×260 ทุกฉาก — ของสำคัญอยู่แถบกลาง เพราะการ์ดเกมจะครอปบน-ล่าง
import React from 'react';
import { AniArt } from './animal.jsx';
import { RankArt, ShotGlass, Paew } from './yadong.jsx';
import { GoldArt, BombArt, Thongdee } from './gold.jsx';

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
    {/* เมฆพาดดวงอาทิตย์ ต้นตาล เรือหางยาว โคมแขวน */}
    <g fill="#ffb27a" opacity=".55"><path d="M196 112 q14 -8 30 -2 q16 -8 32 0 q12 -4 22 4 H196Z" /><path d="M262 146 q12 -6 26 -1 q14 -6 28 1 q10 -3 18 3 H262Z" opacity=".7" /></g>
    <g fill="#5a1a1c" opacity=".5"><path d="M24 90 q20 -10 44 -4 q22 -8 40 2 H24Z" /><path d="M318 70 q16 -8 36 -2 q14 -4 28 4 H318Z" /></g>
    <g fill="#1c0a0e">
      <path d="M352 215 q-2 -40 6 -74 l3 1 q-4 36 -3 73Z" /><path d="M360 142 q-22 -10 -34 4 q18 -4 34 -2Z M361 142 q20 -14 34 -4 q-18 2 -34 6Z M360 140 q-4 -20 8 -30 q0 16 -6 30Z M360 142 q-18 4 -22 20 q10 -12 22 -18Z" />
      <path d="M374 215 q0 -26 4 -48 l2 0 q-2 24 -2 48Z" /><path d="M379 168 q-14 -6 -22 2 q12 -2 22 0Z M380 168 q12 -8 22 -2 q-12 0 -22 4Z" />
      <path d="M150 215 q-1 -24 3 -40 l2 0 q-2 22 -1 40Z" /><path d="M154 176 q-12 -6 -20 2 q10 -2 20 0Z M155 176 q12 -8 20 -2 q-10 0 -20 4Z" />
    </g>
    <g transform="translate(96 236)"><path d="M-40 0 Q-36 8 -20 8 H34 Q42 6 46 -4 Q30 2 -40 0Z" fill="#0b0405" /><path d="M-30 0 V-12 M-30 -12 l10 6" stroke="#0b0405" strokeWidth="2" /><circle cx="10" cy="-6" r="5" fill="#0b0405" /><path d="M2 -2 h16 l-2 4 h-12Z" fill="#0b0405" /><path d="M46 -4 l14 -10" stroke="#0b0405" strokeWidth="2" /></g>
    <path d="M10 18 Q100 40 200 22 Q300 40 390 18" stroke="#2a0a14" strokeWidth="1.2" fill="none" />
    <g>{[[40, 26], [90, 34], [140, 30], [250, 30], [300, 34], [350, 26]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><path d="M0 0 V4" stroke="#2a0a14" strokeWidth="1" /><ellipse cy="10" rx="5" ry="7" fill={i % 2 ? '#e8424a' : '#ffb03a'} /><circle cy="10" r="9" fill="#ffd98a" opacity=".2" className="pulse" /><path d="M-4 4 H4 M-4 16 H4" stroke="#2a0a14" strokeWidth="1.4" /></g>)}</g>
    <g transform="translate(200 46)"><path d="M0 0 V-14" stroke="#1c0a0e" strokeWidth="1.2" /><path d="M0 -14 l12 3 l-12 3Z" fill="#e8424a" /></g>
    <g fill="#0b0405" transform="translate(-18 0)"><rect x="352" y="232" width="22" height="16" rx="2" /><path d="M358 232 v-4 h10 v4" stroke="#0b0405" strokeWidth="2" fill="none" /></g>
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
    {/* กระดานสืบสวน: รูปปักหมุด เชือกแดง โน้ตแปะ แก้วกาแฟ คีย์การ์ด ลายนิ้วมือ */}
    <g transform="translate(18 18)"><rect width="54" height="42" fill="#efe7d6" transform="rotate(-6)" /><rect x="5" y="5" width="44" height="26" fill="#5d564a" transform="rotate(-6)" /><circle cx="22" cy="2" r="4" fill="#e8424a" /></g>
    <g transform="translate(86 26)"><rect width="40" height="34" fill="#fff3a3" transform="rotate(5)" /><g stroke="#5a5030" strokeWidth="1.6"><path d="M6 10 H32 M6 17 H28 M6 24 H22" transform="rotate(5)" /></g><circle cx="20" cy="0" r="3.4" fill="#3fbf8a" /></g>
    <path d="M40 22 Q70 50 104 26 Q170 40 214 30" stroke="#e8424a" strokeWidth="1.6" fill="none" />
    <g transform="translate(214 30)"><circle r="3.4" fill="#e8424a" /></g>
    <g transform="translate(342 196)"><ellipse cy="24" rx="24" ry="6" fill="#000" opacity=".4" /><path d="M-16 -10 H16 L13 22 H-13Z" fill="#e8e4dc" stroke="#2a2a2a" strokeWidth="2" /><path d="M16 -2 q10 0 10 8 q0 8 -12 8" stroke="#2a2a2a" strokeWidth="2.6" fill="none" /><ellipse cy="-10" rx="16" ry="4" fill="#3a2414" /><path d="M-6 -18 q-4 -8 2 -14 M4 -18 q-4 -8 2 -14" stroke="#fff" strokeOpacity=".3" strokeWidth="2" fill="none" /></g>
    <ellipse cx="300" cy="230" rx="22" ry="7" fill="none" stroke="#6a4020" strokeWidth="2" opacity=".5" />
    <g transform="translate(330 120) rotate(14)"><rect x="-22" y="-14" width="44" height="28" rx="4" fill="#3a78c0" stroke="#0b0d0d" strokeWidth="2" /><rect x="-16" y="-8" width="12" height="14" rx="2" fill="#cfe0f4" /><path d="M2 -6 H16 M2 0 H12 M2 6 H16" stroke="#cfe0f4" strokeWidth="2" /><rect x="-22" y="-14" width="44" height="6" fill="#d42a2a" /></g>
    <g transform="translate(26 236) rotate(-20)" fill="none" stroke="#9fd6ff" strokeOpacity=".35" strokeWidth="1.2">{[4, 7, 10, 13].map(r => <ellipse key={r} rx={r} ry={r * 1.3} />)}</g>
    <g transform="translate(296 200) rotate(-32)"><rect x="-3" y="-30" width="6" height="52" rx="2" fill="#1d1d1d" /><path d="M-3 22 L0 30 L3 22Z" fill="#c9a96b" /><rect x="-3" y="-30" width="6" height="8" fill="#d42a2a" /></g>
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
    {/* เถาวัลย์ห้อย หิ่งห้อย นกบิน เป้กับเชือก หีบโผล่ตรงกากบาท รอยเท้า ผีเสื้อ */}
    <g fill="none" stroke="#0e2a1c" strokeWidth="3" strokeLinecap="round"><path d="M120 0 q-6 30 4 52 q-6 18 2 34" /><path d="M262 0 q8 24 -2 46" /><path d="M350 0 q-4 40 6 70" /></g>
    <g fill="#2f6a3a">{[[124, 52], [118, 70], [126, 86], [260, 30], [264, 46], [352, 40], [356, 60]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="6" ry="3" transform={`rotate(${i % 2 ? 30 : -30} ${x} ${y})`} />)}</g>
    <g fill="none" stroke="#0d2a22" strokeWidth="1.6" strokeLinecap="round" opacity=".8"><path d="M150 50 q4 -4 8 0 q4 -4 8 0" /><path d="M176 38 q3 -3 6 0 q3 -3 6 0" /></g>
    <g fill="#fff6a0">{[[110, 150], [140, 120], [270, 140], [330, 200], [60, 170], [240, 96], [300, 230]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="5" opacity=".18" /><circle cx={x} cy={y} r="1.6" className="tw" /></g>)}</g>
    <g transform="translate(232 234)"><path d="M-18 -4 H18 L14 8 H-14Z" fill="#6a4020" stroke="#2a1a0a" strokeWidth="2" /><path d="M-19 -4 Q0 -18 19 -4" fill="#8a5a2c" stroke="#2a1a0a" strokeWidth="2" /><rect x="-3" y="-4" width="6" height="6" fill="#f1cf82" /><g fill="#ffd34d"><circle cx="-8" cy="-8" r="2.6" /><circle cx="6" cy="-10" r="2.6" /></g></g>
    <g transform="translate(116 222)"><path d="M-12 -14 Q-14 -24 0 -24 Q14 -24 12 -14 V10 H-12Z" fill="#7a5a2c" stroke="#2a1a0a" strokeWidth="2" /><rect x="-8" y="-6" width="16" height="10" rx="2" fill="#5a3e1c" stroke="#2a1a0a" strokeWidth="1.4" /><path d="M-6 -24 Q0 -32 6 -24" stroke="#2a1a0a" strokeWidth="2" fill="none" /><ellipse cx="18" cy="6" rx="8" ry="5" fill="none" stroke="#c8a060" strokeWidth="2.4" /><ellipse cx="18" cy="6" rx="4" ry="2.4" fill="none" stroke="#c8a060" strokeWidth="1.6" /></g>
    <g fill="#f1cf82" opacity=".5">{[[52, 248], [74, 240], [146, 228], [170, 226]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="3" ry="1.6" transform={`rotate(${-20 + i * 6} ${x} ${y})`} />)}</g>
    <g className="float"><g transform="translate(300 64)"><path d="M0 0 q-8 -8 -12 0 q4 6 12 0Z M0 0 q8 -8 12 0 q-4 6 -12 0Z" fill="#e8bd6a" /><path d="M0 -4 V4" stroke="#2a1a0a" strokeWidth="1.2" /></g></g>
    <g transform="translate(262 206)"><rect x="-8" y="-26" width="16" height="30" fill="#3c4228" stroke="#1c2014" strokeWidth="2" /><rect x="-11" y="-30" width="22" height="6" fill="#4a5232" stroke="#1c2014" strokeWidth="1.6" /><path d="M-8 -12 l6 4 l-2 6" stroke="#1c2014" strokeWidth="1.2" fill="none" /></g>
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
    {/* เมฆพาดจันทร์ ค้างคาว ตาเรืองในป่า รั้ว คบเพลิง นกฮูก เสียงหอน */}
    <g fill="#2a3266" opacity=".75"><path d="M190 84 q16 -10 34 -2 q18 -10 34 0 q14 -4 24 6 H190Z" /><path d="M276 120 q14 -8 30 -2 q12 -6 26 2 H276Z" opacity=".7" /></g>
    <g className="fly" fill="#05071a">{[[150, 50, 1], [190, 30, .7], [330, 150, .8], [110, 90, .6]].map(([x, y, s], i) => <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d="M0 0 q-6 -6 -14 -4 q4 2 2 6 q-6 -2 -10 2 q8 0 10 4 q6 -6 12 -8 q6 2 12 8 q2 -4 10 -4 q-4 -4 -10 -2 q-2 -4 2 -6 q-8 -2 -14 4Z" />)}</g>
    <g fill="none" stroke="#d6dfff" strokeOpacity=".35" strokeWidth="1.6" strokeLinecap="round"><path d="M332 112 q8 -10 0 -20" /><path d="M342 118 q14 -16 0 -32" /><path d="M352 124 q20 -22 0 -44" /></g>
    <g fill="#ffd34d">{[[30, 206], [118, 210], [184, 204]].map(([x, y], i) => <g key={i} className="tw"><ellipse cx={x} cy={y} rx="2" ry="1.3" /><ellipse cx={x + 8} cy={y} rx="2" ry="1.3" /></g>)}</g>
    <g stroke="#1a2048" strokeWidth="3" strokeLinecap="round"><path d="M0 226 H180" />{[8, 30, 52, 74, 96, 118, 140, 162].map(x => <path key={x} d={`M${x} 238 V218`} />)}</g>
    <g transform="translate(140 196)"><path d="M0 30 V4" stroke="#3a2418" strokeWidth="3" /><path d="M-5 4 h10 l-2 -4 h-6Z" fill="#5a3a20" /><path className="flick" d="M0 0 q7 -8 0 -18 q-7 10 0 18Z" fill="#ff9b3d" /><circle cy="-6" r="14" fill="#ffb03a" opacity=".2" /></g>
    <g transform="translate(26 120)"><path d="M0 0 Q20 -4 40 6" stroke="#0e1536" strokeWidth="4" fill="none" strokeLinecap="round" /><g transform="translate(22 -10)"><ellipse rx="8" ry="10" fill="#141a3c" /><circle cx="-3" cy="-3" r="3" fill="#ffd34d" /><circle cx="3" cy="-3" r="3" fill="#ffd34d" /><circle cx="-3" cy="-3" r="1.2" fill="#05071a" /><circle cx="3" cy="-3" r="1.2" fill="#05071a" /><path d="M-7 -9 l3 -4 l2 4 M7 -9 l-3 -4 l-2 4" fill="#141a3c" /></g></g>
    <g fill="#141a3c"><path d="M150 214 V200 L162 190 L174 200 V214Z" /></g><rect x="158" y="202" width="6" height="6" fill="#ffcf6b" />
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

// ---------- หน้ารวมเกม: โต๊ะบอร์ดเกมเต็มแบนเนอร์ — การ์ดหลายเกม ลูกเต๋า หมาก ชิป หีบสมบัติ ปุ่มควิซ ----------
const HbCard = ({ x, y, a, bg, line, e, s = 1 }) => <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
  <rect x="-34" y="-46" width="68" height="94" rx="9" fill="#0006" transform="translate(4 6)" />
  <rect x="-34" y="-46" width="68" height="94" rx="9" fill={bg} stroke={line} strokeWidth="3" />
  <rect x="-27" y="-39" width="54" height="80" rx="6" fill="none" stroke={line} strokeWidth="1" opacity=".45" />
  <text y="12" textAnchor="middle" fontSize="34">{e}</text></g>;
const HbDie = ({ x, y, a, s = 1, fill = 'url(#hb-die)', pip = '#2b1a20', n = 5 }) => { const P = { 1: [[0, 0]], 2: [[-11, -11], [11, 11]], 3: [[-11, -11], [0, 0], [11, 11]], 4: [[-11, -11], [11, -11], [-11, 11], [11, 11]], 5: [[-11, -11], [11, -11], [0, 0], [-11, 11], [11, 11]], 6: [[-11, -12], [11, -12], [-11, 0], [11, 0], [-11, 12], [11, 12]] }[n];
  return <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}><rect x="-27" y="-27" width="54" height="54" rx="11" fill="#0005" transform="translate(3 5)" />
    <rect x="-27" y="-27" width="54" height="54" rx="11" fill={fill} /><rect x="-22" y="-23" width="30" height="8" rx="4" fill="#fff" opacity=".35" />
    <g fill={pip}>{P.map(([px, py], i) => <circle key={i} cx={px} cy={py} r="5" />)}</g></g>; };
const HbPawn = ({ x, y, c, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy="2" rx="20" ry="5" fill="#0005" />
  <path d="M-18 0 q-2 -6 4 -8 l6 -16 q-10 -3 -10 -10 q0 -6 9 -6 q-5 -5 -5 -11 q0 -13 14 -13 q14 0 14 13 q0 6 -5 11 q9 0 9 6 q0 7 -10 10 l6 16 q6 2 4 8Z" fill={c} />
  <path d="M-4 -58 q-6 2 -6 9" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".45" /></g>;
const HbChip = ({ x, y, c, n = 4 }) => <g transform={`translate(${x} ${y})`}>{Array.from({ length: n }, (_, i) => <g key={i} transform={`translate(0 ${-i * 6})`}>
  <ellipse rx="17" ry="7" fill="#0004" transform="translate(0 3)" /><ellipse rx="17" ry="7" fill={c} stroke="#0004" strokeWidth="1" /><ellipse rx="11" ry="4.4" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 3" opacity=".8" /></g>)}</g>;
export function HubArt() {
  return <svg className="hub-art" viewBox="-250 0 890 240" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">
    <defs><linearGradient id="hb-die" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe3a0" /><stop offset="1" stopColor="#f6ad4d" /></linearGradient>
      <linearGradient id="hb-die2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9a9a" /><stop offset="1" stopColor="#d6303a" /></linearGradient>
      <radialGradient id="hb-gold" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffd27a" stopOpacity=".8" /><stop offset="1" stopColor="#ffd27a" stopOpacity="0" /></radialGradient>
      <radialGradient id="hb-spot" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#fff" stopOpacity=".12" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient></defs>
    <ellipse cx="400" cy="130" rx="260" ry="120" fill="url(#hb-spot)" />
    {/* คอนเฟตตีและประกาย */}
    <g>{[[130, 30, '#ffd34d'], [210, 200, '#7fd0ff'], [300, 18, '#ff8fb3'], [470, 16, '#9ae07a'], [612, 70, '#ffd34d'], [560, 222, '#ff8fb3'], [90, 150, '#c89aff'], [250, 110, '#ffd34d'], [520, 120, '#7fd0ff']].map(([x, y, c], i) => <rect key={i} x={x} y={y} width="7" height="3.5" rx="1.5" fill={c} transform={`rotate(${i * 37} ${x} ${y})`} opacity=".85" />)}</g>
    <g fill="#fff3b0">{[[160, 70], [360, 26], [588, 140], [230, 36], [440, 214]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 7} l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2Z`} opacity=".8" />)}</g>
    {/* ของเพิ่มฝั่งซ้ายสุด (ค่อย ๆ จางเข้าหาข้อความ) */}
    <g>{[[-200, 40, '#ff8fb3'], [-120, 210, '#ffd34d'], [-40, 24, '#7fd0ff'], [-150, 120, '#9ae07a']].map(([x, y, c], i) => <rect key={i} x={x} y={y} width="7" height="3.5" rx="1.5" fill={c} transform={`rotate(${i * 41} ${x} ${y})`} opacity=".85" />)}</g>
    <HbCard x={-170} y={128} a={-14} bg="#2a1a3a" line="#c89aff" e="🎂" s={.8} />
    <HbCard x={-104} y={108} a={4} bg="#10223a" line="#7fd0ff" e="⚡" s={.84} />
    <HbCard x={-36} y={130} a={16} bg="#2a2410" line="#ffd34d" e="🗺️" s={.8} />
    <HbDie x={-210} y={210} a={18} s={.72} fill="#fff" n={4} />
    <HbPawn x={-60} y={234} c="#ffd34d" s={.7} />
    <HbChip x={30} y={226} c="#3fbf8a" n={3} />
    {/* การ์ดเกมฝั่งซ้าย (จาง ๆ กลืนกับข้อความ) */}
    <HbCard x={120} y={120} a={-22} bg="#1d3320" line="#8fd06a" e="🐷" s={.82} />
    <HbCard x={190} y={104} a={-8} bg="#3a1a10" line="#ff9a3a" e="💥" s={.86} />
    <HbCard x={250} y={132} a={12} bg="#13261c" line="#6fbf4a" e="🐍" s={.8} />
    {/* พัดการ์ดหลักตรงกลาง */}
    <HbCard x={330} y={112} a={-18} bg="#2c191d" line="#e9b84e" e="🏯" />
    <HbCard x={384} y={96} a={-6} bg="#111515" line="#ff4f4f" e="🕵️" />
    <HbCard x={440} y={94} a={6} bg="#0f1429" line="#d6dfff" e="🐺" />
    <HbCard x={494} y={106} a={18} bg="#1c1a2a" line="#c8a070" e="⛏️" />
    {/* หีบสมบัติขวา */}
    <circle cx="590" cy="170" r="56" fill="url(#hb-gold)" />
    <g transform="translate(560 154)"><rect x="0" y="12" width="64" height="40" rx="5" fill="#0005" transform="translate(4 5)" />
      <rect x="0" y="12" width="64" height="40" rx="5" fill="#8a5530" stroke="#3a2010" strokeWidth="3" /><path d="M-3 16 Q32 -16 67 16" fill="#a86a3a" stroke="#3a2010" strokeWidth="3" />
      <path d="M14 12 V52 M50 12 V52" stroke="#e0b44a" strokeWidth="5" /><rect x="26" y="20" width="12" height="13" rx="2" fill="#ffd34d" stroke="#3a2010" strokeWidth="1.6" />
      <g fill="#ffd34d" stroke="#a87a10" strokeWidth="1.2">{[[10, 8], [24, 2], [40, 0], [54, 8], [32, 10]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5.5" />)}</g>
      <path d="M30 -2 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2Z" fill="#fff" /></g>
    {/* ลูกเต๋า หมาก ชิป ปุ่มควิซ */}
    <HbDie x={290} y={200} a={-16} n={5} />
    <HbDie x={520} y={204} a={14} s={.85} fill="#fff" n={2} />
    <HbDie x={612} y={36} a={22} s={.7} fill="url(#hb-die2)" pip="#fff" n={3} />
    <HbPawn x={412} y={234} c="#ff8fb3" />
    <HbPawn x={366} y={232} c="#7fd0ff" s={.78} />
    <HbPawn x={460} y={236} c="#9ae07a" s={.7} />
    <HbChip x={214} y={222} c="#d6303a" n={4} /><HbChip x={244} y={230} c="#3a78c0" n={2} />
    <g transform="translate(150 206)"><ellipse cy="14" rx="26" ry="8" fill="#0005" /><rect x="-24" y="0" width="48" height="14" rx="4" fill="#3a3a48" /><ellipse cy="0" rx="24" ry="8" fill="#4a4a5a" />
      <ellipse cy="-6" rx="16" ry="6" fill="#e8424a" /><path d="M-16 -6 V-2 Q0 6 16 -2 V-6" fill="#b0202a" /><ellipse cx="-5" cy="-8" rx="6" ry="2" fill="#fff" opacity=".45" /></g>
    {/* นาฬิกาทราย */}
    <g transform="translate(560 58) rotate(-12)"><rect x="-16" y="-30" width="32" height="6" rx="2" fill="#c8915a" /><rect x="-16" y="24" width="32" height="6" rx="2" fill="#c8915a" />
      <path d="M-12 -24 H12 Q12 -6 2 0 Q12 6 12 24 H-12 Q-12 6 -2 0 Q-12 -6 -12 -24Z" fill="#cfe8ff" opacity=".55" stroke="#e8f4ff" strokeWidth="1.4" />
      <path d="M-8 -16 H8 Q6 -6 0 -1 Q-6 -6 -8 -16Z M0 2 L-10 22 H10Z" fill="#ffd27a" /></g>
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
    {/* ป้ายไฟตึก ไฟเครื่องบิน กระเป๋าเงิน ปากกาเซ็นสัญญา ธนบัตรปลิว ประกาย */}
    <g transform="translate(296 60)"><path d="M0 0 V-14" stroke="#0b1230" strokeWidth="2" /><circle cy="-16" r="2.4" fill="#ff4f4f" className="pulse" /></g>
    <g transform="translate(110 70)"><path d="M0 0 V-12" stroke="#0b1230" strokeWidth="2" /><circle cy="-14" r="2" fill="#ff4f4f" className="pulse" /></g>
    <g transform="translate(358 112)"><rect x="-4" y="-10" width="46" height="16" rx="2" fill="#1a1440" stroke="#ff4fa3" strokeWidth="1.6" /><text x="19" y="2" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ff8fc8" fontFamily="sans-serif">DEAL</text></g>
    <g fill="#fff" opacity=".7">{[[40, 30], [90, 18], [160, 40], [240, 24], [380, 70], [20, 80]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? .9 : 1.3} className="tw" />)}</g>
    <g transform="translate(76 192)"><rect x="-26" y="-18" width="52" height="34" rx="4" fill="#2a1a0e" stroke="#0b0705" strokeWidth="2" /><path d="M-8 -18 v-6 h16 v6" stroke="#0b0705" strokeWidth="3" fill="none" /><rect x="-26" y="-6" width="52" height="5" fill="#c8a040" /><rect x="-4" y="-8" width="8" height="8" rx="1" fill="#f5c451" /></g>
    <g transform="translate(316 196) rotate(-8)"><rect x="-26" y="-14" width="52" height="30" fill="#fbf4e4" stroke="#8a7a5a" strokeWidth="1.4" /><g stroke="#8a7a5a" strokeWidth="1.4"><path d="M-20 -6 H20 M-20 0 H14 M-20 6 H8" /></g><path d="M0 12 q6 -6 10 0 q4 -6 8 0" stroke="#1d3270" strokeWidth="1.6" fill="none" /></g>
    <g transform="translate(346 186) rotate(36)"><rect x="-2.5" y="-20" width="5" height="34" rx="2" fill="#1d1d24" /><path d="M-2.5 14 L0 20 L2.5 14Z" fill="#f5c451" /><rect x="-2.5" y="-20" width="5" height="6" fill="#f5c451" /></g>
    <g className="float">{[[56, 150, -20], [350, 70, 24], [30, 60, 12]].map(([x, y, a], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}><rect x="-16" y="-8" width="32" height="16" rx="2" fill="#7acf8a" stroke="#2a6a3a" strokeWidth="1.4" /><circle r="5" fill="none" stroke="#2a6a3a" strokeWidth="1.4" /><text y="3" textAnchor="middle" fontSize="7" fontWeight="900" fill="#2a6a3a">฿</text></g>)}</g>
    <g fill="#fff3a0">{[[170, 120], [236, 118], [200, 196]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 6} l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6Z`} className="pulse" />)}</g>
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
// ---------- 👮 จ่าตรวจวัยรุ่นทรงเอ: ด่านตรวจกลางดึก ไฟไซเรน กรวยจราจร จ่าส่องไฟฉาย วัยรุ่นซ้อนมอไซค์กับกระเป๋าพอง ๆ ----------
function CheckpointScene() {
  return <S id="checkpoint" label="ด่านตรวจกลางดึก จ่าถือไฟฉายส่องวัยรุ่นสองคนที่ซ้อนมอเตอร์ไซค์มาพร้อมกระเป๋าใบโต">
    <defs>
      <linearGradient id="cpk-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#050920" /><stop offset=".62" stopColor="#1a2560" /><stop offset="1" stopColor="#3a2a5a" /></linearGradient>
      <radialGradient id="cpk-red" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ff3b4e" stopOpacity=".75" /><stop offset="1" stopColor="#ff3b4e" stopOpacity="0" /></radialGradient>
      <radialGradient id="cpk-blue" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#3a8bff" stopOpacity=".75" /><stop offset="1" stopColor="#3a8bff" stopOpacity="0" /></radialGradient>
      <linearGradient id="cpk-beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff6c0" stopOpacity=".8" /><stop offset="1" stopColor="#fff6c0" stopOpacity="0" /></linearGradient>
    </defs>
    <rect width="400" height="260" fill="url(#cpk-sky)" />
    <circle cx="344" cy="40" r="17" fill="#fff2c4" opacity=".9" />
    <g className="tw" fill="#fff">{[[40, 30], [120, 18], [200, 40], [262, 22], [380, 80], [90, 70]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" />)}</g>
    <g fill="#0b1235">{[[0, 128, 30], [28, 112, 22], [190, 120, 26], [214, 98, 20], [232, 126, 30], [300, 108, 26], [324, 124, 34], [356, 100, 44]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height={190 - y} />)}</g>
    <path d="M0 260 V190 L400 178 V260 Z" fill="#24262f" /><path d="M0 230 L400 216" stroke="#ffd23f" strokeWidth="4" strokeDasharray="24 18" opacity=".8" />
    {/* ป้อมด่าน + ไฟไซเรน */}
    <circle className="tw" cx="40" cy="98" r="34" fill="url(#cpk-red)" /><circle className="tw" cx="70" cy="98" r="34" fill="url(#cpk-blue)" />
    <rect x="22" y="112" width="72" height="84" rx="4" fill="#dfe4f2" /><rect x="18" y="104" width="80" height="12" rx="3" fill="#2a3a7a" />
    <rect x="34" y="98" width="14" height="7" rx="2" fill="#ff3b4e" /><rect x="66" y="98" width="14" height="7" rx="2" fill="#3a8bff" />
    <rect x="30" y="124" width="56" height="28" rx="3" fill="#8fb4ff" opacity=".55" />
    <rect x="28" y="160" width="60" height="18" rx="3" fill="#ffd23f" /><text x="58" y="173.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="#1a1400" fontFamily="Kanit,sans-serif">ด่านตรวจ</text>
    <g><rect x="94" y="172" width="112" height="8" rx="3" fill="#fff" /><g fill="#ff3b4e">{[100, 122, 144, 166, 188].map(x => <rect key={x} x={x} y="172" width="10" height="8" />)}</g><rect x="90" y="166" width="8" height="30" rx="2" fill="#3a3a48" /></g>
    {[[118, 210], [214, 204], [372, 206]].map(([x, y], i) => <g key={i}><path d={`M${x - 9} ${y} L${x} ${y - 24} L${x + 9} ${y} Z`} fill="#ff7a1a" /><rect x={x - 5} y={y - 15} width="10" height="4" fill="#fff" /></g>)}
    {/* จ่าส่องไฟฉาย */}
    <path className="tw" d="M190 146 L302 112 L304 186 Z" fill="url(#cpk-beam)" />
    <g transform="translate(160 0)">
      <rect x="-7" y="184" width="6" height="22" rx="2" fill="#1a2140" /><rect x="2" y="184" width="6" height="22" rx="2" fill="#1a2140" />
      <path d="M-14 142 Q0 134 14 142 V186 H-14 Z" fill="#2a3a7a" /><path d="M-14 158 H14 M-14 170 H14" stroke="#ffd23f" strokeWidth="3.5" />
      <path d="M12 146 L28 150" stroke="#2a3a7a" strokeWidth="7" strokeLinecap="round" /><rect x="26" y="144" width="10" height="8" rx="2" fill="#444" transform="rotate(-14 31 148)" />
      <circle cx="0" cy="128" r="11" fill="#e8b88a" /><path d="M-13 122 Q0 108 13 122 Z" fill="#14204a" /><rect x="-14" y="120" width="28" height="4" rx="2" fill="#0b1235" /><circle cx="0" cy="114" r="2.4" fill="#ffd23f" />
      <path d="M-4 130 q4 3 8 0" stroke="#5a3a20" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
    {/* วัยรุ่นซ้อนมอไซค์ + กระเป๋าใบโต */}
    <g className="bob">
      <circle cx="262" cy="204" r="14" fill="#111" stroke="#666" strokeWidth="3" /><circle cx="334" cy="204" r="14" fill="#111" stroke="#666" strokeWidth="3" />
      <path d="M256 196 Q270 172 300 176 L328 172 Q344 176 344 196 L330 196 Q318 186 300 192 L272 196 Z" fill="#e0457a" /><path d="M326 168 L340 152" stroke="#ccc" strokeWidth="4" strokeLinecap="round" /><circle cx="344" cy="176" r="5" fill="#fff6c0" />
      <path d="M296 176 Q300 150 312 146 L322 150 Q318 168 312 180 Z" fill="#1fa3b5" /><circle cx="314" cy="136" r="10" fill="#e8b88a" /><path d="M304 132 L306 120 L311 128 L314 116 L318 127 L323 119 L324 132 Z" fill="#1a1a1a" />
      <path d="M268 178 Q270 154 284 150 L294 154 Q292 170 288 182 Z" fill="#ffd23f" /><circle cx="285" cy="140" r="10" fill="#d9a066" /><path d="M275 137 Q276 124 288 126 Q296 128 296 136 Q290 130 284 133 Z" fill="#c0392b" />
      <g transform="rotate(-8 258 158)"><path d="M236 146 Q236 136 246 136 H272 Q282 136 282 146 V170 Q282 180 272 180 H246 Q236 180 236 170 Z" fill="#7a6a3a" stroke="#2a2010" strokeWidth="2" /><path d="M240 150 H278" stroke="#c9b26a" strokeWidth="2.5" strokeDasharray="3 2" /><text x="259" y="172" textAnchor="middle" fontSize="18" fontWeight="900" fill="#fff6d0" fontFamily="Kanit,sans-serif">?</text></g>
    </g>
    <g className="peek"><path d="M300 74 h80 q8 0 8 8 v20 q0 8 -8 8 h-52 l-12 10 l2 -10 h-18 q-8 0 -8 -8 v-20 q0 -8 8 -8 Z" fill="#fff" /><text x="340" y="96" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1a1a2a" fontFamily="Kanit,sans-serif">หมูปิ้งครับจ่า!</text></g>
  </S>;
}
// ---------- 💡 แก๊งใบ้คำ: เวทีเกมโชว์ กระดานคำ 5×5 สปอตไลต์แดง/ฟ้า หัวหน้าสองทีมยืนแท่น ----------
function ClueScene() {
  const C = ['#fbf4e4', '#ff4d5e', '#fbf4e4', '#3a8bff', '#fbf4e4', '#3a8bff', '#fbf4e4', '#d9d2c2', '#ff4d5e', '#fbf4e4', '#fbf4e4', '#ff4d5e', '#1a1020', '#fbf4e4', '#3a8bff', '#fbf4e4', '#fbf4e4', '#3a8bff', '#fbf4e4', '#ff4d5e', '#d9d2c2', '#fbf4e4', '#fbf4e4', '#fbf4e4', '#ff4d5e'];
  return <S id="clue" label="เวทีเกมโชว์ กระดานคำ 25 ใบ บางใบพลิกเป็นสีแดงสีฟ้า หัวหน้าทีมแดงกับทีมฟ้ายืนบนแท่น ใบ้คำว่า ทะเล 2">
    <defs>
      <linearGradient id="cl-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d0a22" /><stop offset="1" stopColor="#2a1450" /></linearGradient>
      <linearGradient id="cl-spr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff4d5e" stopOpacity=".55" /><stop offset="1" stopColor="#ff4d5e" stopOpacity="0" /></linearGradient>
      <linearGradient id="cl-spb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a8bff" stopOpacity=".55" /><stop offset="1" stopColor="#3a8bff" stopOpacity="0" /></linearGradient>
      <radialGradient id="cl-bulb" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffd447" stopOpacity=".7" /><stop offset="1" stopColor="#ffd447" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="400" height="260" fill="url(#cl-sky)" />
    <path className="glow" d="M40 0 L90 0 L150 230 L-10 230 Z" fill="url(#cl-spr)" /><path className="glow" d="M310 0 L360 0 L410 230 L250 230 Z" fill="url(#cl-spb)" />
    <g className="tw" fill="#fff">{[[30, 30], [110, 16], [292, 26], [376, 60], [200, 12]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.5" />)}</g>
    <rect x="112" y="24" width="176" height="150" rx="10" fill="#0a0818" stroke="#ffd447" strokeWidth="3" />
    {[...Array(10)].map((_, i) => <circle key={i} className="tw" cx={118 + i * 18.4} cy="20" r="2.6" fill="#ffd447" />)}
    <g>{C.map((c, i) => <rect key={i} x={120 + (i % 5) * 32.6} y={32 + Math.floor(i / 5) * 27.6} width="28" height="22" rx="3" fill={c} opacity={c === '#fbf4e4' ? 0.95 : 1} />)}</g>
    <text x="201" y="104" textAnchor="middle" fontSize="13" fill="#ffd447">💣</text>
    <path d="M0 260 V206 Q200 188 400 206 V260 Z" fill="#1a1032" /><path d="M0 214 Q200 196 400 214" stroke="#ffd447" strokeWidth="2" opacity=".5" fill="none" />
    {/* หัวหน้าทีมแดง */}
    <g transform="translate(70 0)"><rect x="-22" y="196" width="44" height="34" rx="4" fill="#d8283d" /><text x="0" y="219" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff" fontFamily="Kanit,sans-serif">แดง</text>
      <path d="M-14 196 Q0 168 14 196 Z" fill="#ff7a86" /><circle cx="0" cy="160" r="11" fill="#e8b88a" /><path d="M-11 156 Q0 142 11 156 Z" fill="#2a1a10" /><text x="0" y="146" textAnchor="middle" fontSize="12">👑</text></g>
    {/* หัวหน้าทีมฟ้า */}
    <g transform="translate(330 0)"><rect x="-22" y="196" width="44" height="34" rx="4" fill="#1f5fd0" /><text x="0" y="219" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff" fontFamily="Kanit,sans-serif">ฟ้า</text>
      <path d="M-14 196 Q0 168 14 196 Z" fill="#6fb0ff" /><circle cx="0" cy="160" r="11" fill="#d9a066" /><path d="M-12 158 Q-6 144 0 150 Q6 144 12 158 Z" fill="#111" /><text x="0" y="146" textAnchor="middle" fontSize="12">👑</text></g>
    {/* หลอดไฟไอเดีย + คำใบ้ */}
    <circle className="glow" cx="200" cy="214" r="34" fill="url(#cl-bulb)" />
    <g className="bob"><circle cx="200" cy="208" r="13" fill="#ffd447" /><rect x="194" y="219" width="12" height="9" rx="2" fill="#9a93bb" /><path d="M196 206 q4 6 8 0" stroke="#a06a00" strokeWidth="2" fill="none" /></g>
    <g className="peek"><path d="M8 118 h84 q8 0 8 8 v22 q0 8 -8 8 h-50 l-10 12 l0 -12 h-24 q-8 0 -8 -8 v-22 q0 -8 8 -8 Z" fill="#fff" /><text x="50" y="143" textAnchor="middle" fontSize="15" fontWeight="900" fill="#d8283d" fontFamily="Kanit,sans-serif">“ทะเล” 2</text></g>
  </S>;
}
// ---------- 🤫 Insider: Master ใต้โคมไฟ เพื่อนล้อมถาม มีคนหนึ่งยิ้มรู้ทัน ----------
function InsiderScene() {
  const ppl = [[70, '#2fd6a0', 0], [140, '#7aa8ff', 0], [260, '#ff8fb1', 1], [330, '#ffd23f', 0]];
  return <S id="insider" label="Master ใต้โคมไฟถือการ์ดคำลับ เพื่อนสี่คนล้อมถาม หนึ่งในนั้นยิ้มเจ้าเล่ห์">
    <defs>
      <linearGradient id="in-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#041210" /><stop offset="1" stopColor="#0f3d31" /></linearGradient>
      <radialGradient id="in-lamp" cx=".5" cy="0" r="1"><stop offset="0" stopColor="#ffe08a" stopOpacity=".55" /><stop offset="1" stopColor="#ffe08a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="400" height="260" fill="url(#in-bg)" />
    <path className="glow" d="M180 40 L220 40 L300 230 L100 230 Z" fill="url(#in-lamp)" />
    <path d="M200 0 V30" stroke="#1d3a33" strokeWidth="3" /><path d="M178 42 Q200 22 222 42 Z" fill="#f2c14e" />
    <path d="M0 260 V214 Q200 198 400 214 V260 Z" fill="#082019" />
    {ppl.map(([x, c, sly], i) => <g key={i} className="bob" style={{ animationDelay: (-i * 0.6) + 's' }}>
      <ellipse cx={x} cy="196" rx="26" ry="32" fill={c} />
      <g fill="#fff"><ellipse cx={x - 8} cy="190" rx="5" ry="6" /><ellipse cx={x + 8} cy="190" rx="5" ry="6" /></g>
      <g fill="#14221e"><circle cx={x - 7 + (x < 200 ? 2 : -2)} cy="191" r="2.6" /><circle cx={x + 9 + (x < 200 ? 2 : -2)} cy="191" r="2.6" /></g>
      {sly ? <path d={`M${x - 8} 204 Q${x + 2} 212 ${x + 10} 200`} stroke="#14221e" strokeWidth="3" fill="none" strokeLinecap="round" /> : <ellipse cx={x} cy="206" rx="4" ry="3.5" fill="#14221e" />}
      {!sly && <text x={x} y="152" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff" opacity=".85" fontFamily="Mitr,sans-serif">?</text>}
    </g>)}
    <g transform="translate(200 0)">
      <ellipse cx="0" cy="168" rx="30" ry="38" fill="#f2c14e" /><path d="M-18 132 L-12 116 L0 128 L12 116 L18 132 Z" fill="#ffd77a" stroke="#a87a10" strokeWidth="2" />
      <g fill="#fff"><ellipse cx="-9" cy="160" rx="6" ry="7" /><ellipse cx="9" cy="160" rx="6" ry="7" /></g><g fill="#14221e"><circle cx="-9" cy="162" r="3" /><circle cx="9" cy="162" r="3" /></g>
      <path d="M-8 178 Q0 183 8 178" stroke="#14221e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g className="peek" transform="rotate(-6 0 210)"><rect x="-30" y="196" width="60" height="34" rx="4" fill="#fbf4e4" /><text x="0" y="219" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f3d31" fontFamily="Mitr,sans-serif">ใช่ / ไม่ใช่</text></g>
    </g>
    <g transform="translate(290 70)"><path d="M0 12 Q0 0 12 0 H92 Q104 0 104 12 V28 Q104 40 92 40 H30 L16 54 L20 40 H12 Q0 40 0 28 Z" fill="#fff" /><text x="52" y="26" textAnchor="middle" fontFamily="Mitr,sans-serif" fontWeight="600" fontSize="13" fill="#0f3d31">กินได้ไหม?</text></g>
    {/* ชั้นหนังสือ ตู้ นาฬิกา ไพ่บนโต๊ะ ประกายลับ เงา */}
    <g fill="#0a2a22" stroke="#041210" strokeWidth="2"><rect x="10" y="40" width="70" height="110" /></g>
    <g stroke="#041210" strokeWidth="2">{[74, 108].map(y => <path key={y} d={`M10 ${y} H80`} />)}</g>
    <g>{[[14, 46, '#c8584a'], [24, 50, '#e8b84a'], [32, 44, '#3fa9f5'], [44, 52, '#7acf8a'], [54, 48, '#c89aff'], [14, 80, '#e8b84a'], [26, 84, '#c8584a'], [38, 78, '#3fa9f5']].map(([x, y, c], i) => <rect key={i} x={x} y={y} width="8" height={74 - (y % 74) - (y > 74 ? -34 : 0) > 30 ? 26 : 22} rx="1" fill={c} opacity=".7" />)}</g>
    <g transform="translate(110 30)"><circle r="12" fill="#f2e6c4" stroke="#041210" strokeWidth="2" /><path d="M0 0 V-8 M0 0 L6 3" stroke="#041210" strokeWidth="2" strokeLinecap="round" /></g>
    <g transform="translate(44 126)"><path d="M-12 14 H12 L8 -4 H-8Z" fill="#c8584a" stroke="#041210" strokeWidth="1.6" /><path d="M0 -4 q-10 -14 -2 -22 q4 8 2 22Z M0 -4 q10 -12 4 -20 q-4 8 -4 20Z" fill="#3f7a4a" /></g>
    <g fill="#ffe08a">{[[150, 60], [258, 52], [120, 110], [286, 120]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 5} l1.4 3.6 l3.6 1.4 l-3.6 1.4 l-1.4 3.6 l-1.4 -3.6 l-3.6 -1.4 l3.6 -1.4Z`} className="tw" />)}</g>
    <g fill="#000" opacity=".3"><ellipse cx="200" cy="232" rx="60" ry="6" /></g>
  </S>;
}
// ---------- 🖼️ ภาพนี้มีพิรุธ: หอศิลป์ กรอบทองเรียงบนผนัง ไฟส่อง และภาพหนึ่งที่เอียงแปลก ๆ ----------
function PicsScene() {
  const fr = [[40, 60, 70, 90, '#3a6ea5', 0], [130, 48, 80, 104, '#c9733a', 0], [230, 64, 66, 84, '#6aa56a', 1], [312, 54, 64, 96, '#a54a6a', 0]];
  return <S id="pics" label="ผนังหอศิลป์สีแดง กรอบทองสี่ภาพ ภาพหนึ่งเอียงและมีเครื่องหมายคำถาม">
    <defs><linearGradient id="pc-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a1220" /><stop offset="1" stopColor="#5a1a2a" /></linearGradient>
      <radialGradient id="pc-spot" cx=".5" cy="0" r="1"><stop offset="0" stopColor="#fff2c8" stopOpacity=".35" /><stop offset="1" stopColor="#fff2c8" stopOpacity="0" /></radialGradient></defs>
    <rect width="400" height="260" fill="url(#pc-wall)" /><rect y="210" width="400" height="50" fill="#2a1410" /><rect y="206" width="400" height="6" fill="#7a4a20" />
    {fr.map(([x, y, w, h, c, odd], i) => <g key={i} transform={odd ? `rotate(7 ${x + w / 2} ${y + h / 2})` : undefined} className={odd ? 'bob' : ''}>
      <path d={`M${x + w / 2 - 30} 0 L${x - 10} ${y + h + 40} L${x + w + 10} ${y + h + 40} L${x + w / 2 + 30} 0 Z`} fill="url(#pc-spot)" />
      <rect x={x - 7} y={y - 7} width={w + 14} height={h + 14} fill="#c9973a" stroke="#7a5a1a" strokeWidth="3" />
      <rect x={x} y={y} width={w} height={h} fill={c} /><circle cx={x + w * .65} cy={y + h * .3} r={w * .14} fill="#ffe08a" opacity=".85" /><path d={`M${x} ${y + h} L${x + w * .4} ${y + h * .55} L${x + w * .7} ${y + h * .8} L${x + w} ${y + h * .6} L${x + w} ${y + h} Z`} fill="#0003" />
      {odd ? <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontSize="40" fontWeight="900" fill="#fff" fontFamily="Kanit,sans-serif">?</text> : null}
    </g>)}
    <g transform="translate(200 228)"><rect x="-60" y="-10" width="120" height="22" rx="4" fill="#1a0e13" stroke="#e8b84a" strokeWidth="2" /><text y="6" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e8b84a" fontFamily="Trirong,serif">ภาพไหนมีพิรุธ?</text></g>
    {/* โคมระย้า ม่านกำมะหยี่ เชือกกั้น แผ่นป้าย ม้านั่ง กรอบรูปลาย */}
    <g fill="#7a1a2a"><path d="M0 0 H30 Q20 90 30 200 H0Z" /><path d="M400 0 H370 Q380 90 370 200 H400Z" /></g>
    <g stroke="#5a1220" strokeWidth="2" fill="none"><path d="M10 0 Q6 100 12 200 M20 0 Q14 100 22 200 M390 0 Q394 100 388 200 M380 0 Q386 100 378 200" /></g>
    <g fill="#e8b84a"><path d="M0 40 Q16 52 30 40 L30 48 Q16 60 0 48Z" /><path d="M400 40 Q384 52 370 40 L370 48 Q384 60 400 48Z" /></g>
    <g transform="translate(200 0)"><path d="M0 0 V10" stroke="#c9973a" strokeWidth="2" /><path d="M-26 22 Q0 6 26 22 L20 30 H-20Z" fill="#c9973a" stroke="#7a5a1a" strokeWidth="1.6" /><g fill="#fff2b0">{[-18, -6, 6, 18].map(x => <circle key={x} cx={x} cy="34" r="3" className="pulse" />)}</g><g fill="#c9973a">{[-16, 0, 16].map(x => <path key={x} d={`M${x} 30 l-2 10 l2 3 l2 -3Z`} />)}</g></g>
    <g>{[[70, 196], [330, 196]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><rect x="-3" y="-30" width="6" height="40" fill="#c9973a" /><ellipse cy="10" rx="10" ry="3" fill="#7a5a1a" /><circle cy="-30" r="5" fill="#e8b84a" /></g>)}</g>
    <path d="M70 172 Q200 200 330 172" stroke="#b8202a" strokeWidth="5" fill="none" /><path d="M70 172 Q200 200 330 172" stroke="#e8424a" strokeWidth="2" fill="none" />
    <g>{[[75, 160], [170, 162], [265, 158], [344, 160]].map(([x, y], i) => <rect key={i} x={x - 10} y={y} width="20" height="7" rx="1.5" fill="#e8d8b0" stroke="#7a5a1a" strokeWidth="1" />)}</g>
    <g transform="translate(200 214)"><rect x="-50" y="-8" width="100" height="8" rx="2" fill="#5a3418" stroke="#2a1410" strokeWidth="1.6" /><path d="M-42 0 V12 M42 0 V12" stroke="#2a1410" strokeWidth="4" /></g>
  </S>;
}
// ---------- ⛏️ ขุดสมบัติป่าช้า: นักล่าสมบัติเดินตามทางหินฝ่าป่าช้ายามค่ำ จากประตูป่าช้าไปหาหลุมที่มีหีบสมบัติเรืองแสง ----------
function DigScene() {
  return <S id="dig" label="ป่าช้ายามค่ำ จันทร์เต็มดวง ต้นไม้ตาย นักล่าสมบัติสองคนถือตะเกียงกับพลั่ว เดินตามทางหินจากประตูป่าช้าไปหาหลุมที่มีหีบสมบัติเรืองแสง">
    <defs><linearGradient id="dgs-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#120f22" /><stop offset=".7" stopColor="#2a2440" /><stop offset="1" stopColor="#3a3150" /></linearGradient>
      <linearGradient id="dgs-grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2c4428" /><stop offset="1" stopColor="#16241a" /></linearGradient>
      <linearGradient id="dgs-stone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#a4a0ac" /><stop offset="1" stopColor="#66626e" /></linearGradient>
      <radialGradient id="dgs-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffd27a" stopOpacity=".75" /><stop offset="1" stopColor="#ffd27a" stopOpacity="0" /></radialGradient>
      <radialGradient id="dgs-moon" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#f6f0d0" stopOpacity=".35" /><stop offset="1" stopColor="#f6f0d0" stopOpacity="0" /></radialGradient></defs>
    <rect width="400" height="260" fill="url(#dgs-sky)" />
    <g fill="#e8e4f8">{[[30, 20], [80, 40], [140, 14], [200, 34], [250, 12], [380, 30], [110, 70], [360, 80]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 ? .9 : 1.4} opacity=".75" />)}</g>
    <circle cx="322" cy="46" r="60" fill="url(#dgs-moon)" /><circle cx="322" cy="46" r="24" fill="#f2f0d8" /><circle cx="314" cy="40" r="5" fill="#d8d4b8" /><circle cx="330" cy="54" r="3.5" fill="#d8d4b8" />
    {/* เนินไกล + เจดีย์ + ต้นไม้ตาย */}
    <path d="M0 112 Q60 92 120 104 Q190 88 260 102 Q330 90 400 104 V140 H0Z" fill="#1e1c2c" />
    <g fill="#2a2638">{[[60, 52], [228, 60]].map(([x, h], i) => <path key={i} d={`M${x} 108 h22 v-${h * .35} l-5 -8 l-6 -${h * .45} l-6 ${h * .45} l-5 8 Z`} />)}</g>
    <g stroke="#0e0c16" strokeWidth="5" strokeLinecap="round" fill="none"><path d="M26 140 V60 M26 92 l-16 -18 M26 80 l14 -20 M40 60 l8 -4 M26 110 l16 -12 M10 74 l-6 2" /></g>
    <g stroke="#0e0c16" strokeWidth="3.5" strokeLinecap="round" fill="none"><path d="M376 132 V78 M376 98 l12 -16 M376 90 l-12 -12 M388 82 l4 -6" /></g>
    {/* พื้นหญ้า */}
    <path d="M0 128 Q100 118 200 126 Q300 118 400 128 V260 H0Z" fill="url(#dgs-grass)" />
    {/* ทางเดินดินคดเคี้ยว + หินวาง */}
    <path d="M24 232 Q90 228 120 200 Q150 170 210 178 Q270 186 300 160 Q318 146 336 150" fill="none" stroke="#1a2a16" strokeWidth="34" strokeLinecap="round" />
    <path d="M24 232 Q90 228 120 200 Q150 170 210 178 Q270 186 300 160 Q318 146 336 150" fill="none" stroke="#8a6a44" strokeWidth="26" strokeLinecap="round" />
    <path d="M24 232 Q90 228 120 200 Q150 170 210 178 Q270 186 300 160 Q318 146 336 150" fill="none" stroke="#a8845a" strokeWidth="14" strokeLinecap="round" opacity=".6" />
    <g fill="url(#dgs-stone)" stroke="#3a3530" strokeWidth="1.2">{[[44, 231, 9], [72, 228, 8], [100, 216, 8], [124, 196, 7.5], [148, 182, 7], [176, 176, 7], [204, 178, 6.5], [232, 180, 6], [258, 176, 6], [282, 166, 5.5], [304, 156, 5]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * .55} />)}</g>
    {/* ป้ายหลุมกระจาย */}
    {[[160, 132, .8], [196, 126, .7], [262, 134, .75], [96, 150, .95], [232, 214, 1.1], [358, 196, 1.15], [180, 230, 1.2]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s}) rotate(${i % 2 ? 5 : -4})`}>
      <ellipse cy="22" rx="18" ry="4" fill="#0c140b" opacity=".55" />
      <path d="M-12 22 V-2 Q-12 -16 0 -16 Q12 -16 12 -2 V22Z" fill="url(#dgs-stone)" stroke="#2a2632" strokeWidth="2" />
      <path d="M-2 -10 h4 v4 h4 v4 h-4 v10 h-4 v-10 h-4 v-4 h4Z" fill="#55515c" />
      <path d="M-12 18 q6 -6 10 0 q4 -4 8 2" fill="#4f6a34" /></g>)}
    <g transform="translate(130 238)"><path d="M0 18 V-14 M-10 -4 H10" stroke="#1a0f08" strokeWidth="7" strokeLinecap="round" /><path d="M0 18 V-14 M-10 -4 H10" stroke="#7a5030" strokeWidth="4" strokeLinecap="round" /></g>
    {/* ประตูป่าช้า (ซ้ายล่าง) */}
    <g transform="translate(10 186)"><rect x="0" y="0" width="12" height="54" fill="url(#dgs-stone)" stroke="#2a2632" strokeWidth="2" /><rect x="-2" y="-5" width="16" height="7" fill="#8a8692" stroke="#2a2632" strokeWidth="1.6" />
      <path d="M12 54 V14 Q34 -6 56 14" fill="none" stroke="#1a1a22" strokeWidth="3" /><g stroke="#1a1a22" strokeWidth="2">{[20, 28, 36, 44].map(x => <path key={x} d={`M${x} 54 V${10 + Math.abs(x - 34) * .5}`} />)}</g></g>
    {/* หลุมเปิด + หีบสมบัติเรืองแสง (ปลายทาง) */}
    <circle cx="346" cy="146" r="64" fill="url(#dgs-glow)" className="pulse" />
    <g transform="translate(346 140)"><path d="M-24 0 V-26 Q-24 -42 -8 -42 Q8 -42 8 -26 V0Z" fill="url(#dgs-stone)" stroke="#2a2632" strokeWidth="2" transform="translate(16 -6)" />
      <path d="M8 -38 h4 v5 h5 v4 h-5 v10 h-4 v-10 h-5 v-4 h5Z" fill="#55515c" />
      <ellipse cy="10" rx="34" ry="11" fill="#1a110a" /><path d="M-34 10 Q-34 0 -24 -2 M34 10 Q34 0 24 -2" stroke="#5a3e24" strokeWidth="4" fill="none" />
      <g transform="translate(-18 -10)"><rect width="36" height="22" rx="3" fill="#8a5530" stroke="#3a2010" strokeWidth="2.4" /><path d="M-2 3 Q18 -14 38 3" fill="#a86a3a" stroke="#3a2010" strokeWidth="2.4" /><path d="M8 0 V22 M28 0 V22" stroke="#c8a040" strokeWidth="3" /><rect x="14" y="4" width="8" height="8" rx="1" fill="#ffd34d" stroke="#3a2010" strokeWidth="1.2" /><g fill="#ffd34d" stroke="#8a5a10" strokeWidth="1"><circle cx="6" cy="-4" r="3.6" /><circle cx="18" cy="-8" r="3.6" /><circle cx="30" cy="-3" r="3.6" /></g></g>
      <g fill="#fff3a0">{[[-30, -30], [30, -26], [0, -44]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 5} l1.6 3.4 l3.4 1.6 l-3.4 1.6 l-1.6 3.4 l-1.6 -3.4 l-3.4 -1.6 l3.4 -1.6Z`} className="pulse" />)}</g></g>
    {/* นักล่าสมบัติ 2 คน เดินบนทาง */}
    <g transform="translate(150 168)" className="bob">
      <circle cx="-14" cy="-10" r="26" fill="url(#dgs-glow)" />
      <path d="M-8 30 l-3 14 M6 30 l4 14" stroke="#2a1d14" strokeWidth="5" strokeLinecap="round" />
      <path d="M-12 2 Q-12 -6 0 -6 Q12 -6 12 2 V32 H-12Z" fill="#7a5a36" stroke="#2a1d14" strokeWidth="2" /><path d="M-12 14 H12" stroke="#4a3220" strokeWidth="3" />
      <circle cy="-14" r="8" fill="#e8b88a" stroke="#2a1d14" strokeWidth="2" /><path d="M-13 -18 H13 M-8 -18 Q-8 -28 0 -28 Q8 -28 8 -18" fill="#6b4224" stroke="#2a1d14" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M-12 4 L-22 -6" stroke="#2a1d14" strokeWidth="4" strokeLinecap="round" /><g transform="translate(-24 -10)"><path d="M0 -6 V-2" stroke="#2a2a30" strokeWidth="1.4" /><rect x="-4" y="-2" width="8" height="10" rx="2" fill="#ffdc7a" stroke="#2a1d14" strokeWidth="1.4" /><circle cy="3" r="2" fill="#fff6c8" /></g>
    </g>
    <g transform="translate(108 196)" className="bob">
      <path d="M-8 30 l-3 14 M6 30 l4 14" stroke="#1e1a24" strokeWidth="5" strokeLinecap="round" />
      <path d="M-12 2 Q-12 -6 0 -6 Q12 -6 12 2 V32 H-12Z" fill="#4a5a6a" stroke="#1e1a24" strokeWidth="2" />
      <circle cy="-14" r="8" fill="#d8a678" stroke="#1e1a24" strokeWidth="2" /><path d="M-12 -18 H12 M-7 -18 Q-7 -27 0 -27 Q7 -27 7 -18" fill="#3a2a1e" stroke="#1e1a24" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M12 4 L22 -22" stroke="#1e1a24" strokeWidth="4" strokeLinecap="round" /><path d="M22 -22 L30 -48" stroke="#8a5a30" strokeWidth="3.4" strokeLinecap="round" /><path d="M17 -16 Q22 -6 29 -14 L25 -22Z" fill="#9aa4b2" stroke="#1e1a24" strokeWidth="1.6" transform="translate(-4 14)" />
    </g>
    {/* หมอก */}
    <g fill="#dfe4f0" opacity=".08"><ellipse cx="90" cy="150" rx="90" ry="9" /><ellipse cx="290" cy="212" rx="110" ry="10" /><ellipse cx="200" cy="246" rx="140" ry="8" /></g>
    <g transform="translate(200 240)"><rect x="-70" y="-12" width="140" height="22" rx="4" fill="#14121a" stroke="#f0b94a" strokeWidth="2" /><text y="4" textAnchor="middle" fontSize="13" fontWeight="700" fill="#f0b94a" fontFamily="Mitr,sans-serif">ใครแอบขวางทาง?</text></g>
  </S>;
}
// ---------- 🐍 อีนังงูพิษ: คฤหาสน์ละครหลังข่าวยามค่ำ บันไดวน โคมระย้า ภาพบนผนังภาพหนึ่งเปื้อนเลือด งูเลื้อยบนราวบันได ----------
function SnakeScene() {
  return <S id="snake" label="ห้องโถงคฤหาสน์ยามค่ำ โคมระย้า ภาพสามภาพบนผนัง ภาพกลางมีรอยเลือด งูเขียวเลื้อยบนราวบันได มีดปักพื้น">
    <defs><linearGradient id="sn-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#10261e" /><stop offset="1" stopColor="#1e3a2c" /></linearGradient>
      <radialGradient id="sn-glow" cx=".5" cy=".3" r=".6"><stop offset="0" stopColor="#ffd98a" stopOpacity=".45" /><stop offset="1" stopColor="#ffd98a" stopOpacity="0" /></radialGradient></defs>
    <rect width="400" height="260" fill="url(#sn-wall)" /><g stroke="#2a4a38" strokeWidth="2">{[40, 120, 200, 280, 360].map(x => <path key={x} d={`M${x} 0 V196`} />)}</g>
    <rect width="400" height="260" fill="url(#sn-glow)" />
    <g transform="translate(200 0)"><path d="M0 0 V26" stroke="#c9a04a" strokeWidth="2" /><path d="M-34 40 Q0 20 34 40 L26 52 H-26Z" fill="#c9a04a" stroke="#6a4a14" strokeWidth="2" /><g fill="#fff2b0">{[-28, -14, 0, 14, 28].map(x => <circle key={x} cx={x} cy="56" r="3.5" className="pulse" />)}</g></g>
    {[[64, 70, '#3a6ea5', 0], [168, 62, '#e8d8b8', 1], [276, 70, '#8a4a6a', 0]].map(([x, y, c, blood], i) => <g key={i}>
      <rect x={x - 6} y={y - 6} width={68} height={82} fill="#c9973a" stroke="#6a4a14" strokeWidth="3" /><rect x={x} y={y} width={56} height={70} fill={c} />
      <circle cx={x + 28} cy={y + 26} r="12" fill="#0003" /><path d={`M${x + 10} ${y + 70} Q${x + 28} ${y + 38} ${x + 46} ${y + 70}Z`} fill="#0003" />
      {blood ? <g fill="#c81a2a"><path d={`M${x + 34} ${y + 8} q8 10 2 22 q-2 8 0 18 q-6 -6 -4 -18 q-6 -10 2 -22Z`} /><circle cx={x + 20} cy={y + 50} r="3" /><path d={`M${x + 36} ${y + 48} v14`} stroke="#c81a2a" strokeWidth="3" strokeLinecap="round" /></g> : null}
    </g>)}
    <rect y="196" width="400" height="64" fill="#2a1a12" /><rect y="192" width="400" height="6" fill="#6a4a14" />
    <path d="M300 196 L330 168 H400 V196Z M330 168 L356 144 H400 V168Z" fill="#3a2418" stroke="#6a4a14" strokeWidth="2" />
    <path d="M296 186 L360 128" stroke="#8a5a2a" strokeWidth="6" strokeLinecap="round" />
    <g className="bob"><path d="M300 180 Q312 168 322 172 Q334 176 342 162 Q350 150 362 146" fill="none" stroke="#1a3a10" strokeWidth="11" strokeLinecap="round" /><path d="M300 180 Q312 168 322 172 Q334 176 342 162 Q350 150 362 146" fill="none" stroke="#6fbf4a" strokeWidth="7" strokeLinecap="round" /><ellipse cx="366" cy="144" rx="9" ry="6" fill="#6fbf4a" stroke="#1a3a10" strokeWidth="2" /><circle cx="368" cy="142" r="1.8" fill="#1a1a1a" /><path d="M374 146 l8 1 m0 0 l3 -3 m-3 3 l3 3" stroke="#e8424a" strokeWidth="1.6" fill="none" strokeLinecap="round" /></g>
    <g transform="translate(110 214) rotate(20)"><path d="M0 -26 L6 0 H-6Z" fill="#dfe6ee" stroke="#2b1d16" strokeWidth="2" /><rect x="-10" y="0" width="20" height="4" fill="#c9a04a" /><rect x="-3" y="4" width="6" height="14" fill="#6b3a1e" /></g>
    <ellipse cx="114" cy="234" rx="18" ry="4" fill="#c81a2a" opacity=".8" />
    <g transform="translate(200 236)"><rect x="-70" y="-12" width="140" height="22" rx="4" fill="#0e1a14" stroke="#7fd07a" strokeWidth="2" /><text y="4" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9ae07a" fontFamily="Mitr,sans-serif">ภาพไหนคือภาพจริง?</text></g>
    {/* บัวผนัง เชิงเทียนติดผนัง พรมลาย แก้วไวน์หก รอยเท้า ใยแมงมุม */}
    <g fill="none" stroke="#2a4a38" strokeWidth="2">{[[8, 154, 48], [146, 154, 108], [356, 154, 40]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height="34" rx="2" />)}</g>
    <path d="M0 150 H400" stroke="#c9a04a" strokeWidth="2" opacity=".5" />
    {[147, 253].map(x => <g key={x} transform={`translate(${x} 96)`}><path d="M0 14 V0 M-8 0 H8" stroke="#c9a04a" strokeWidth="2.4" /><path d="M-8 0 q-4 -6 0 -10 M8 0 q4 -6 0 -10" stroke="#c9a04a" strokeWidth="2" fill="none" />
      {[-8, 0, 8].map(dx => <g key={dx}><rect x={dx - 2} y={-10 - (dx ? 0 : 4)} width="4" height="8" fill="#f3e6c0" /><path d={`M${dx} ${-12 - (dx ? 0 : 4)} q3 -4 0 -7 q-3 3 0 7Z`} fill="#ffb347" className="pulse" /></g>)}<circle cy="-14" r="16" fill="#ffd98a" opacity=".15" /></g>)}
    <g transform="translate(250 214)"><path d="M-5 -14 Q-6 -4 0 -2 Q6 -4 5 -14Z" fill="#e8e4f0" opacity=".7" stroke="#2a1a12" strokeWidth="1" transform="rotate(80)" /><ellipse cx="18" cy="4" rx="14" ry="3" fill="#8a1020" opacity=".8" /></g>
    <g fill="#8a1020" opacity=".55">{[[134, 236], [150, 240], [166, 236]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="4" ry="2" />)}</g>
    <g stroke="#cfd8d2" strokeOpacity=".3" strokeWidth=".8" fill="none"><path d="M0 0 L40 30 M0 20 L30 0 M0 10 Q20 14 26 0 M0 24 Q26 26 36 0" /><path d="M400 0 L364 26 M400 16 L376 0" /></g>
  </S>;
}
// ---------- ⚡ ศึกควิซไวไฟ: เวทีเกมโชว์ สปอตไลต์ จอยักษ์มีคำถาม ปุ่ม ก ข ค ง สี่สี แท่นผู้แข่งขันกับปุ่มกด ----------
function QuizScene() {
  const C = ['#ff5f6d', '#3fa9f5', '#ffb627', '#3ccf91'];
  return <S id="quiz" label="เวทีเกมโชว์ยามค่ำ สปอตไลต์สีทอง จอยักษ์ขึ้นเครื่องหมายคำถาม ปุ่มตอบ ก ข ค ง สี่สี และแท่นผู้แข่งขันมีปุ่มกดสีแดง">
    <defs><linearGradient id="qz-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#110c24" /><stop offset="1" stopColor="#2a1a5e" /></linearGradient>
      <linearGradient id="qz-beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe37a" stopOpacity=".55" /><stop offset="1" stopColor="#ffe37a" stopOpacity="0" /></linearGradient></defs>
    <rect width="400" height="260" fill="url(#qz-sky)" />
    <path d="M40 0 L10 200 H110Z" fill="url(#qz-beam)" className="pulse" /><path d="M360 0 L290 200 H390Z" fill="url(#qz-beam)" className="pulse" />
    <g fill="#ffcf3a">{[20, 60, 100, 300, 340, 380].map((x, i) => <circle key={x} cx={x} cy={14 + (i % 2) * 6} r="3" className="pulse" />)}</g>
    <g transform="translate(110 22)"><rect width="180" height="92" rx="10" fill="#0b0818" stroke="#ff4fa3" strokeWidth="4" /><rect x="8" y="8" width="164" height="76" rx="6" fill="#1d1638" />
      <text x="90" y="62" textAnchor="middle" fontSize="54" fontWeight="800" fill="#ffe37a" fontFamily="Mitr,sans-serif">?</text>
      <g className="pulse">{[0, 1, 2, 3, 4, 5, 6, 7].map(i => <circle key={i} cx={14 + i * 21.7} cy="4" r="2.4" fill="#ff4fa3" />)}</g></g>
    {C.map((c, i) => <g key={i} transform={`translate(${86 + (i % 2) * 118} ${124 + Math.floor(i / 2) * 30})`}><rect width="110" height="24" rx="7" fill={c} stroke="#0b0818" strokeWidth="2.5" /><circle cx="14" cy="12" r="8" fill="#fff" opacity=".9" /><text x="14" y="16.5" textAnchor="middle" fontSize="12" fontWeight="800" fill={c} fontFamily="Mitr,sans-serif">{'กขคง'[i]}</text><rect x="28" y="9" width={50 + (i * 13) % 30} height="6" rx="3" fill="#fff" opacity=".55" /></g>)}
    <path d="M0 196 H400 V260 H0Z" fill="#3a2a7a" /><path d="M0 196 H400" stroke="#ffcf3a" strokeWidth="3" />
    {[60, 200, 340].map((x, i) => <g key={x} transform={`translate(${x} 214)`}><path d="M-34 -14 H34 L28 34 H-28Z" fill={['#2c2252', '#4a2a8a', '#2c2252'][i]} stroke="#ffcf3a" strokeWidth="2.5" /><ellipse cy="-16" rx="16" ry="6" fill="#c81a3a" stroke="#0b0818" strokeWidth="2" /><ellipse cy="-19" rx="12" ry="4" fill="#ff5f6d" className={i === 1 ? 'pulse' : ''} /><text y="16" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffe37a" fontFamily="Mitr,sans-serif">{[1200, 2750, 900][i]}</text></g>)}
    {[[44, 140], [356, 140]].map(([x, y]) => <g key={x} transform={`translate(${x} ${y}) scale(1.3)`} className="bob"><path d="M-8 -26 L6 -26 L-2 -8 H10 L-10 18 L-4 -2 H-14Z" fill="#ffe37a" stroke="#2a1a00" strokeWidth="2" strokeLinejoin="round" /></g>)}
    {/* ผู้ชมด้านล่าง คอนเฟตตี ป้าย ON AIR นาฬิกาจับเวลา */}
    <g>{Array.from({ length: 24 }, (_, i) => [8 + i * 17, ['#ff5f6d', '#3fa9f5', '#ffb627', '#3ccf91', '#ff4fa3', '#fff'][i % 6], i]).map(([x, c, i]) => <rect key={i} x={x} y={(i * 37) % 120 + 10} width="6" height="3" rx="1.2" fill={c} transform={`rotate(${i * 33} ${x} ${(i * 37) % 120 + 10})`} opacity=".85" className={i % 3 ? 'float' : undefined} />)}</g>
    <g transform="translate(330 46)"><rect x="-26" y="-11" width="52" height="22" rx="5" fill="#2a0a14" stroke="#ff3b4d" strokeWidth="2" /><circle cx="-16" r="4" fill="#ff3b4d" className="pulse" /><text x="5" y="4" textAnchor="middle" fontSize="10" fontWeight="900" fill="#ff8a96" fontFamily="sans-serif">ON AIR</text></g>
    <g transform="translate(70 52)"><circle r="18" fill="#1d1638" stroke="#ffe37a" strokeWidth="3" /><path d="M0 0 V-12 M0 0 L8 5" stroke="#ffe37a" strokeWidth="2.6" strokeLinecap="round" /><rect x="-4" y="-24" width="8" height="5" rx="1" fill="#ffe37a" /><path d="M0 -18 A18 18 0 0 1 16 -8" stroke="#ff4fa3" strokeWidth="3" fill="none" /></g>
    <g fill="#140e2e">{Array.from({ length: 14 }, (_, i) => <g key={i}><circle cx={14 + i * 29} cy={i % 2 ? 262 : 265} r="10" /><path d={`M${2 + i * 29} 270 Q${14 + i * 29} ${i % 2 ? 248 : 252} ${26 + i * 29} 270Z`} /></g>)}</g>
    <g>{[[128, 256], [272, 258]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><path d="M0 0 V-18" stroke="#140e2e" strokeWidth="3" /><rect x="-10" y="-30" width="20" height="13" rx="2" fill={['#ff5f6d', '#3fa9f5', '#ffb627', '#3ccf91'][i]} /></g>)}</g>
  </S>;
}
// ---------- 🐷 สัตว์หน้านิ่ง: วงไพ่ใต้ถุนบ้านยามเย็น เสื่อสาน โอ่งน้ำ ต้นกล้วย หมูยื่นไพ่คว่ำ แมวลังเล กบลุ้น ไก่กับควายแอบดู ----------
function AnimalScene() {
  const post = (x, w = 22) => <g key={x}><rect x={x} y="0" width={w} height="160" fill="#5a3418" stroke="#2a160a" strokeWidth="2.5" />
    <path d={`M${x + 5} 10 V150 M${x + w - 7} 30 q-2 40 0 110`} stroke="#3e220e" strokeWidth="1.4" fill="none" /><path d={`M${x + 3} 0 V160`} stroke="#7a4a24" strokeWidth="2" opacity=".7" /></g>;
  const card = (x, y, k, a, s = 1) => <g key={x + '-' + y} transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}><rect x="-17" y="-22" width="34" height="44" rx="5" fill="#0005" transform="translate(2 3)" />
    <rect x="-17" y="-22" width="34" height="44" rx="5" fill={['#f6a5b8', '#fff1cf', '#b9bdc6', '#b8cbe0', '#f7bd72', '#a8de86'][k]} stroke="#2b1d16" strokeWidth="2.5" /><AniArt k={k} size={30} x={-15} y={-16} /></g>;
  const back = (x, y, a) => <g key={x + '-' + y} transform={`translate(${x} ${y}) rotate(${a})`}><rect x="-14" y="-19" width="28" height="38" rx="4" fill="#2f5a3a" stroke="#f3d27a" strokeWidth="2" /><rect x="-9" y="-14" width="18" height="28" rx="2" fill="none" stroke="#f3d27a" strokeWidth="1" opacity=".6" /><circle r="4" fill="#f3d27a" /></g>;
  return <S id="animal" label="วงไพ่ใต้ถุนบ้านยามเย็น เสื่อสานสีเขียว โอ่งน้ำ ต้นกล้วย หมูยื่นไพ่คว่ำให้แมวพร้อมบอกว่านี่คือหมู กบลุ้น ไก่กับควายแอบดู ไพ่สัตว์หงายและขนมวางบนเสื่อ">
    <defs><linearGradient id="an-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff9a5a" /><stop offset=".55" stopColor="#ffc87a" /><stop offset="1" stopColor="#ffe2a0" /></linearGradient>
      <radialGradient id="an-lamp" cx=".5" cy=".2" r=".65"><stop offset="0" stopColor="#ffcf7a" stopOpacity=".55" /><stop offset="1" stopColor="#ffcf7a" stopOpacity="0" /></radialGradient>
      <pattern id="an-mat" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="12" height="12" fill="#2f6a3e" /><rect width="6" height="12" fill="#3a7a48" /><path d="M0 6 H12" stroke="#25522f" strokeWidth="1.2" /></pattern></defs>
    {/* ท้องฟ้ายามเย็นข้างนอกใต้ถุน */}
    <rect width="400" height="260" fill="url(#an-sky)" />
    <circle cx="330" cy="96" r="22" fill="#fff0b0" opacity=".9" />
    <path d="M0 120 Q60 108 120 116 Q200 104 280 114 Q340 108 400 116 V160 H0Z" fill="#7aa85a" /><g stroke="#5f8a44" strokeWidth="1.4" opacity=".7">{[126, 134, 142, 150].map(y => <path key={y} d={`M0 ${y} Q200 ${y - 6} 400 ${y}`} fill="none" />)}</g>
    {/* ต้นกล้วยกับต้นมะพร้าวไกล ๆ */}
    <g fill="#3f6a2e"><path d="M250 118 q-2 -30 2 -50 l3 0 q2 24 -1 50Z" /><path d="M253 70 q-24 -6 -36 8 q18 -2 36 -4Z M254 70 q22 -10 36 2 q-18 0 -36 2Z M253 68 q-6 -20 6 -32 q2 16 -4 32Z" /></g>
    <g fill="#2f5a24"><path d="M60 120 q0 -20 4 -30 q6 12 4 30Z" /><path d="M64 92 q-18 -10 -28 2 q14 0 28 0Z M66 92 q16 -14 28 -4 q-14 2 -28 4Z" /></g>
    {/* พื้นบ้านด้านบน + คาน */}
    <rect width="400" height="22" fill="#4a2a12" /><g stroke="#2a160a" strokeWidth="1.6">{[0, 50, 100, 150, 200, 250, 300, 350].map(x => <path key={x} d={`M${x} 0 V22`} />)}</g><rect y="20" width="400" height="8" fill="#6a3c1a" stroke="#2a160a" strokeWidth="2" />
    {post(4)}{post(118, 18)}{post(282, 18)}{post(376)}
    <path d="M26 40 L118 70 M300 70 L376 40" stroke="#4a2a12" strokeWidth="6" /><path d="M26 40 L118 70 M300 70 L376 40" stroke="#6a3c1a" strokeWidth="3" />
    <rect width="400" height="260" fill="url(#an-lamp)" />
    {/* ไฟราวประดับ */}
    <path d="M26 30 Q110 54 200 36 Q290 54 376 30" stroke="#2a160a" strokeWidth="1.4" fill="none" />
    <g>{[[50, 38, '#ffd34d'], [80, 45, '#ff8fb3'], [112, 46, '#7fd0ff'], [146, 42, '#9ae07a'], [254, 42, '#ffd34d'], [288, 46, '#ff8fb3'], [320, 45, '#7fd0ff'], [350, 38, '#9ae07a']].map(([x, y, c], i) => <g key={i}><circle cx={x} cy={y + 4} r="7" fill={c} opacity=".25" /><circle cx={x} cy={y + 4} r="3" fill={c} className={i % 2 ? 'pulse' : undefined} /></g>)}</g>
    <g transform="translate(200 28)"><path d="M0 0 V12" stroke="#2a180c" strokeWidth="2" /><path d="M-13 12 H13 L9 24 H-9Z" fill="#f3d27a" stroke="#2a180c" strokeWidth="2" /><circle cy="28" r="5" fill="#fff2b0" className="pulse" /></g>
    {/* โอ่งน้ำ + ขันซ้ายมือ */}
    <g transform="translate(46 128)"><ellipse cy="30" rx="26" ry="5" fill="#0004" /><path d="M-16 -18 Q-30 4 -16 28 H16 Q30 4 16 -18Z" fill="#8a4a24" stroke="#2a160a" strokeWidth="2.5" /><ellipse cy="-18" rx="17" ry="5" fill="#5a2e14" stroke="#2a160a" strokeWidth="2" />
      <path d="M-18 0 Q0 6 18 0" stroke="#c8784a" strokeWidth="2" fill="none" /><path d="M-10 -10 Q-16 4 -10 18" stroke="#b86a3a" strokeWidth="2.5" fill="none" opacity=".7" /></g>
    {/* เสื่อสาน */}
    <path d="M-10 160 H410 V270 H-10Z" fill="url(#an-mat)" /><path d="M-10 160 H410" stroke="#1e3a24" strokeWidth="3" /><path d="M-10 164 H410" stroke="#f3d27a" strokeWidth="1.5" strokeDasharray="5 4" opacity=".6" />
    {/* ควายแอบดูหลังเสาซ้าย / ไก่เกาะคานขวา */}
    <AniArt k={2} size={58} x={86} y={80} />
    <AniArt k={1} size={46} x={296} y={50} />
    {/* ตัวละครหลัก */}
    <AniArt k={0} size={100} x={30} y={90} />
    <AniArt k={4} size={100} x={270} y={90} />
    <g className="bob"><AniArt k={5} size={66} x={167} y={94} /></g>
    <path d="M356 100 q4 6 0 10 q-4 -4 0 -10Z" fill="#7fd0ff" stroke="#2a6a9a" strokeWidth="1" />
    {/* กองไพ่กลาง + ไพ่คว่ำที่หมูยื่น */}
    {back(196, 186, -6)}{back(200, 183, 4)}{back(204, 180, -2)}
    <g transform="translate(140 152) rotate(-14)"><rect width="40" height="56" rx="6" fill="#0005" transform="translate(3 4)" /><rect width="40" height="56" rx="6" fill="#2f5a3a" stroke="#f3d27a" strokeWidth="3" /><rect x="5" y="5" width="30" height="46" rx="3" fill="none" stroke="#f3d27a" strokeWidth="1" opacity=".6" /><g fill="#f3d27a"><ellipse cx="20" cy="32" rx="7" ry="6" /><circle cx="12" cy="22" r="3" /><circle cx="18" cy="18" r="3" /><circle cx="24" cy="18" r="3" /><circle cx="29" cy="22" r="3" /></g></g>
    {/* ไพ่หงายข้างหน้าแต่ละคน */}
    {card(40, 206, 1, -10)}{card(76, 212, 2, 6)}{card(110, 220, 0, -4, .9)}
    {card(296, 210, 3, -6)}{card(334, 204, 3, 8)}{card(366, 214, 5, 14, .9)}
    {/* ขนม + แก้วน้ำแดง */}
    <g transform="translate(244 214)"><ellipse rx="22" ry="7" fill="#0004" transform="translate(1 3)" /><ellipse rx="22" ry="7" fill="#fff4dc" stroke="#2b1d16" strokeWidth="2" />
      <g stroke="#2b1d16" strokeWidth="1.2"><circle cx="-8" cy="-3" r="5" fill="#ffcf5a" /><circle cx="2" cy="-5" r="5" fill="#ff9a3a" /><circle cx="10" cy="-1" r="4.5" fill="#ffcf5a" /></g></g>
    <g transform="translate(156 214)"><path d="M-8 -14 H8 L6 10 H-6Z" fill="#e8424a" opacity=".85" stroke="#2b1d16" strokeWidth="2" /><path d="M-8 -14 H8" stroke="#fff" strokeWidth="2" opacity=".6" /><g fill="#dff4ff"><rect x="-4" y="-10" width="4" height="4" rx="1" /><rect x="1" y="-6" width="4" height="4" rx="1" /></g><path d="M3 -14 L8 -26" stroke="#ffe08a" strokeWidth="2" /></g>
    {/* คำพูด */}
    <g transform="translate(70 40)"><path d="M0 0 H104 a10 10 0 0 1 10 10 V30 a10 10 0 0 1 -10 10 H34 L20 54 L22 40 H0 a10 10 0 0 1 -10 -10 V10 a10 10 0 0 1 10 -10Z" fill="#fffdf4" stroke="#2b1d16" strokeWidth="2.5" /><text x="52" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2b1d16" fontFamily="Mitr,sans-serif">นี่คือ…หมู</text></g>
    <g transform="translate(318 74)"><circle r="16" fill="#fffdf4" stroke="#2b1d16" strokeWidth="2.5" /><text y="7" textAnchor="middle" fontSize="22" fontWeight="700" fill="#e8424a" fontFamily="Mitr,sans-serif">?</text></g>
    <g fill="#fff3a0">{[[150, 120], [250, 112], [190, 70]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 6} l1.6 4 l4 1.6 l-4 1.6 l-1.6 4 l-1.6 -4 l-4 -1.6 l4 -1.6Z`} className="pulse" />)}</g>
    <g transform="translate(200 244)"><rect x="-74" y="-12" width="148" height="22" rx="4" fill="#21170f" stroke="#f6a5b8" strokeWidth="2" /><text y="4" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffc7d4" fontFamily="Mitr,sans-serif">จริง…หรือไม่จริง?</text></g>
  </S>;
}
// ---------- 🥃 ไพ่เนียนยาดอง: ร้านยาดองป้าแป๋ว ชั้นไหดอง โต๊ะไพ่ แก้วลุ้นเรียงแถว ----------
function YadongScene() {
  const jar = (x, y, c, s = 1) => <g key={x} transform={`translate(${x} ${y}) scale(${s})`}><rect x="-8" y="-30" width="16" height="7" rx="2" fill="#5a2a10" /><path d="M-12 -23 H12 C24 -16 24 10 18 18 H-18 C-24 10 -24 -16 -12 -23Z" fill={c} stroke="#2b1608" strokeWidth="2.5" /><rect x="-10" y="-8" width="20" height="12" rx="2" fill="#fff1c9" /></g>;
  return <S id="yadong" label="ร้านยาดองป้าแป๋ว ชั้นวางไหดอง โต๊ะไม้มีไพ่คว่ำกองกลาง แก้วลุ้นเรียงแถว มีคนตะโกนว่าโกหก">
    <defs><radialGradient id="yd-lamp" cx=".5" cy=".1" r=".7"><stop offset="0" stopColor="#ffb85a" stopOpacity=".55" /><stop offset="1" stopColor="#ffb85a" stopOpacity="0" /></radialGradient></defs>
    <rect width="400" height="260" fill="#2a1210" /><rect width="400" height="260" fill="url(#yd-lamp)" />
    <g fill="#4a2414" stroke="#1a0806" strokeWidth="3"><rect x="10" y="64" width="150" height="8" /><rect x="10" y="118" width="150" height="8" /></g>
    {jar(30, 60, '#c8641e')}{jar(66, 60, '#8a2a1a')}{jar(104, 60, '#d88a2a')}{jar(140, 60, '#6a1a22')}{jar(40, 114, '#d88a2a')}{jar(80, 114, '#c8641e')}{jar(122, 114, '#8a2a1a')}
    <g transform="translate(250 0)"><path d="M0 0 V22" stroke="#1a0806" strokeWidth="2" /><path d="M-14 22 H14 L10 34 H-10Z" fill="#f0a24a" stroke="#1a0806" strokeWidth="2" /><circle cy="38" r="5" fill="#fff2b0" className="pulse" /></g>
    <Paew size={92} x={280} y={70} />
    <path d="M0 168 H400 V260 H0Z" fill="#6a2e14" /><path d="M0 168 H400" stroke="#2b1608" strokeWidth="4" /><g stroke="#4a1e0c" strokeWidth="2" opacity=".6">{[190, 214, 238].map(y => <path key={y} d={`M0 ${y} H400`} />)}</g>
    {[0, 1, 2, 3, 4].map(i => <g key={i} transform={`translate(${168 + i * 9} ${190 - i * 2}) rotate(${(i - 2) * 12})`}><rect x="-14" y="-20" width="28" height="40" rx="4" fill="#6a1a22" stroke="#f3c26a" strokeWidth="2" /></g>)}
    {[0, 1, 2, 3, 4, 5].map(i => <ShotGlass key={i} size={20} x={40 + i * 24} y={180} fill={i < 2 ? 0 : 1} />)}
    <g className="bob"><g transform="translate(300 196) rotate(10)"><rect x="-17" y="-24" width="34" height="48" rx="5" fill="#fffdf6" stroke="#2b1608" strokeWidth="2.5" /><RankArt k={2} size={30} x={-15} y={-16} /></g></g>
    <g transform="translate(200 100)"><g className="pulse"><path d="M-62 -26 H62 a10 10 0 0 1 10 10 V12 a10 10 0 0 1 -10 10 H10 L-4 38 L-2 22 H-62 a10 10 0 0 1 -10 -10 V-16 a10 10 0 0 1 10 -10Z" fill="#fffdf4" stroke="#2b1608" strokeWidth="2.5" /><text y="7" textAnchor="middle" fontSize="22" fontWeight="800" fill="#d8283a" fontFamily="Mitr,sans-serif">โกหก!!</text></g></g>
    <g transform="translate(200 244)"><rect x="-78" y="-12" width="156" height="22" rx="4" fill="#22100e" stroke="#f0a24a" strokeWidth="2" /><text y="4" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffcf8a" fontFamily="Mitr,sans-serif">คิง 3 ใบจ้า…จริงนะ</text></g>
    {/* พริกกระเทียมห้อย ป้ายราคา จิ้งจก ถังน้ำแข็ง จานถั่ว ปฏิทินเก่า */}
    <g transform="translate(180 0)"><path d="M0 0 V54" stroke="#6a4a2a" strokeWidth="1.6" />{[10, 20, 30, 40, 50].map((y, i) => <g key={y}>{i % 2 ? <ellipse cx={i % 4 ? -4 : 4} cy={y} rx="5" ry="4.5" fill="#f3ead6" stroke="#8a7a5a" strokeWidth="1" /> : <path d={`M0 ${y - 4} q6 2 4 12 q-3 -4 -4 -12Z M0 ${y - 4} q-6 2 -4 12 q3 -4 4 -12Z`} fill="#d6303a" />}</g>)}</g>
    <g transform="translate(330 22)"><rect x="-38" y="-14" width="76" height="34" rx="3" fill="#1d3a2a" stroke="#c9973a" strokeWidth="2" /><text y="0" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f3e6c0" fontFamily="Mitr,sans-serif">ยาดอง ๑๐฿</text><text y="13" textAnchor="middle" fontSize="8" fill="#ffcf8a" fontFamily="Mitr,sans-serif">เป๊กละ ห้ามโกง</text></g>
    <g transform="translate(372 120) rotate(-70)"><path d="M0 0 q6 -2 12 0 q6 2 12 0" stroke="#8a9a6a" strokeWidth="4" fill="none" strokeLinecap="round" /><ellipse cx="-2" cy="0" rx="4" ry="3" fill="#8a9a6a" /><path d="M6 0 l-2 -5 M6 0 l-2 5 M16 0 l2 -5 M16 0 l2 5" stroke="#8a9a6a" strokeWidth="1.6" /></g>
    <g transform="translate(26 196)"><path d="M-14 -10 H14 L11 14 H-11Z" fill="#9aa4b2" stroke="#2b1608" strokeWidth="2" /><path d="M-14 -10 H14" stroke="#c8ccd6" strokeWidth="2" /><g fill="#dff4ff" stroke="#9fc4dc" strokeWidth=".8"><rect x="-9" y="-16" width="7" height="7" rx="1.5" transform="rotate(12)" /><rect x="1" y="-17" width="7" height="7" rx="1.5" transform="rotate(-10)" /></g></g>
    <g transform="translate(364 214)"><ellipse rx="22" ry="7" fill="#fff4dc" stroke="#2b1608" strokeWidth="2" /><g fill="#c8915a" stroke="#6a4020" strokeWidth=".8">{[[-10, -3], [-3, -5], [4, -3], [11, -4], [0, -1], [-6, 0], [7, 0]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="3" ry="2" />)}</g></g>
    <g transform="translate(220 22)"><rect x="-14" y="-12" width="28" height="34" fill="#fbf4e4" stroke="#2b1608" strokeWidth="1.4" /><rect x="-14" y="-12" width="28" height="9" fill="#d6303a" /><text y="15" textAnchor="middle" fontSize="12" fontWeight="900" fill="#2b1608">๑๓</text></g>
  </S>;
}
// ---------- 💰 ขุดทองหรือตูม: อุโมงค์เหมือง เสาไม้ค้ำ รถเข็นแร่ทอง ระเบิดชนวนติดไฟ กองห่อคว่ำ ----------
function GoldScene() {
  const sack = (x, y, s = 1) => <g key={x + '-' + y} transform={`translate(${x} ${y}) scale(${s})`}><path d="M-14 16 C-20 6 -16 -6 -6 -10 L-8 -16 C-2 -14 2 -14 8 -16 L6 -10 C16 -6 20 6 14 16Z" fill="#a8783e" stroke="#2a1a0a" strokeWidth="2.5" strokeLinejoin="round" /><path d="M-6 -10 C-2 -8 2 -8 6 -10" fill="none" stroke="#5a3a18" strokeWidth="3" /></g>;
  return <S id="gold" label="อุโมงค์เหมืองทองร้าง เสาไม้ค้ำ นายเหมืองสวมหมวกไฟฉาย รถเข็นแร่ทอง ระเบิดชนวนติดไฟ และกองห่อแร่คว่ำ">
    <defs><radialGradient id="gb-lamp" cx=".55" cy=".35" r=".6"><stop offset="0" stopColor="#ffc83a" stopOpacity=".45" /><stop offset="1" stopColor="#ffc83a" stopOpacity="0" /></radialGradient></defs>
    <rect width="400" height="260" fill="#1d150e" /><path d="M60 260 V70 C60 20 340 20 340 70 V260Z" fill="#3a2a1a" /><path d="M110 260 V96 C110 60 290 60 290 96 V260Z" fill="#120c08" />
    <rect width="400" height="260" fill="url(#gb-lamp)" />
    <g fill="#7a5426" stroke="#2a1a0a" strokeWidth="3"><rect x="70" y="60" width="18" height="200" /><rect x="312" y="60" width="18" height="200" /><rect x="60" y="48" width="280" height="18" /></g>
    <g transform="translate(200 66)"><path d="M0 0 V14" stroke="#2a1a0a" strokeWidth="2" /><rect x="-9" y="14" width="18" height="20" rx="4" fill="#e8a81a" stroke="#2a1a0a" strokeWidth="2" /><circle cy="24" r="5" fill="#fff6c0" className="pulse" /></g>
    <path d="M0 214 H400 V260 H0Z" fill="#4a3420" /><g stroke="#8a8494" strokeWidth="4"><path d="M100 236 H300" /><path d="M110 250 H290" /></g><g stroke="#5a3a18" strokeWidth="6">{[120, 160, 200, 240, 280].map(x => <path key={x} d={`M${x} 230 V256`} />)}</g>
    <g transform="translate(150 168)"><path d="M0 0 H90 L80 50 H10Z" fill="#6a6470" stroke="#2a1a0a" strokeWidth="3" strokeLinejoin="round" /><circle cx="22" cy="56" r="9" fill="#3a3640" stroke="#2a1a0a" strokeWidth="3" /><circle cx="68" cy="56" r="9" fill="#3a3640" stroke="#2a1a0a" strokeWidth="3" /><GoldArt size={80} x={5} y={-50} /></g>
    <Thongdee size={96} x={14} y={120} />
    <g className="bob"><BombArt size={78} x={290} y={140} /></g>
    {sack(120, 150, .9)}{sack(120, 128, .9)}{sack(270, 206, .8)}
    <g transform="translate(200 30)"><g className="pulse"><path d="M-70 -18 H70 a10 10 0 0 1 10 10 V10 a10 10 0 0 1 -10 10 H-70 a10 10 0 0 1 -10 -10 V-8 a10 10 0 0 1 10 -10Z" fill="#fffdf4" stroke="#2a1a0a" strokeWidth="2.5" /><text y="8" textAnchor="middle" fontSize="18" fontWeight="800" fill="#c88a12" fontFamily="Mitr,sans-serif">ทอง…หรือตูม!?</text></g></g>
    {/* หินผนังมีแร่ทองระยิบ หยดน้ำ ตะเกียงข้าง ค้างคาว พลั่ว เส้นชนวน */}
    <g fill="#2a1e12">{[[20, 40, 10], [36, 120, 8], [24, 200, 12], [372, 50, 11], [380, 140, 9], [362, 220, 10], [100, 20, 7], [300, 18, 8]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r * 1.3} ry={r} />)}</g>
    <g fill="#ffd34d">{[[24, 38], [40, 118], [376, 52], [366, 220], [130, 100], [270, 104], [96, 180]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 4} l1.2 2.8 l2.8 1.2 l-2.8 1.2 l-1.2 2.8 l-1.2 -2.8 l-2.8 -1.2 l2.8 -1.2Z`} className="tw" />)}</g>
    <g fill="#9fd6ff" opacity=".6">{[[140, 80], [262, 86]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q3 5 0 8 q-3 -3 0 -8Z`} className="float" />)}</g>
    <g className="fly" fill="#0b0705">{[[150, 40, .6], [250, 50, .5]].map(([x, y, s], i) => <path key={i} transform={`translate(${x} ${y}) scale(${s})`} d="M0 0 q-6 -6 -14 -4 q4 2 2 6 q-6 -2 -10 2 q8 0 10 4 q6 -6 12 -8 q6 2 12 8 q2 -4 10 -4 q-4 -4 -10 -2 q-2 -4 2 -6 q-8 -2 -14 4Z" />)}</g>
    <g transform="translate(96 76)"><path d="M0 0 V10" stroke="#2a1a0a" strokeWidth="2" /><rect x="-6" y="10" width="12" height="14" rx="3" fill="#e8a81a" stroke="#2a1a0a" strokeWidth="1.6" /><circle cy="17" r="12" fill="#ffc83a" opacity=".2" className="pulse" /></g>
    <g transform="translate(304 76)"><path d="M0 0 V10" stroke="#2a1a0a" strokeWidth="2" /><rect x="-6" y="10" width="12" height="14" rx="3" fill="#e8a81a" stroke="#2a1a0a" strokeWidth="1.6" /><circle cy="17" r="12" fill="#ffc83a" opacity=".2" className="pulse" /></g>
    <g transform="translate(350 230) rotate(-30)"><rect x="-2.5" y="-40" width="5" height="44" fill="#8a5a30" stroke="#2a1a0a" strokeWidth="1.2" /><path d="M-10 4 H10 L8 22 Q0 28 -8 22Z" fill="#8a94a2" stroke="#2a1a0a" strokeWidth="2" /></g>
    <path d="M330 168 Q350 190 340 214 Q330 236 360 248" stroke="#c8a060" strokeWidth="2" fill="none" strokeDasharray="4 3" />
    <g fill="#ffd34d" stroke="#8a5a10" strokeWidth="1">{[[180, 162], [196, 158], [212, 164], [226, 160]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" />)}</g>
  </S>;
}
const SCENES = { quiz: QuizScene, gold: GoldScene, yadong: YadongScene, animal: AnimalScene, spyfall: SpyfallScene, spy: SpyScene, headword: HeadScene, explore: ExploreScene, werewolf: WolfScene, cake: CakeScene, boom: BoomScene, curse: CurseScene, tam: TamScene, deal: DealScene, checkpoint: CheckpointScene, clue: ClueScene, insider: InsiderScene, pics: PicsScene, dig: DigScene, snake: SnakeScene };
export function SceneArt({ id }) { const C = SCENES[id] || SpyfallScene; return <C />; }
