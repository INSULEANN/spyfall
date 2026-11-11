// ภาพประกอบระหว่างเล่น (SVG) — บทบาท สถานการณ์ และผลลัพธ์ของทุกเกม
// <Art name="wolf" size={96} />  •  <Art name="die" n={3} />
import React from 'react';

const INK = '#1b1530', W = '#ffffff', GOLD = '#ffc965', RED = '#ff5f6d', GREEN = '#5fd38d', BLUE = '#6fb7ff', PINK = '#ff8fb3', BROWN = '#a0643c', GREY = '#c9c6d6', SKIN = '#ffd2a8';

const Pips = ({ n, x = 0, y = 0, s = 1, c = INK }) => {
  const P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] }[n] || [];
  return <g fill={c}>{P.map(([a, b], i) => <circle key={i} cx={x + a * 13 * s} cy={y + b * 13 * s} r={5.2 * s} />)}</g>;
};
const Fridge = ({ children, open = true }) => <g>
  <rect x="34" y="20" width="56" height="86" rx="8" fill="#e6e0f4" />
  <rect x="39" y="25" width="46" height="76" rx="5" fill={open ? '#fff6d6' : '#d4cbec'} />
  <path d="M39 60 H85" stroke="#e8d9a8" strokeWidth="2.5" />
  {open && <path d="M34 22 L18 30 L18 100 L34 106 Z" fill="#d4cbec" />}
  {children}
</g>;
const CakeSlice = ({ x = 0, y = 0, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M-16 4 L16 -2 L16 12 L-16 16 Z" fill="#ffe9c7" /><path d="M-16 8 L16 3 L16 6 L-16 11 Z" fill={PINK} />
  <path d="M-16 4 L16 -2 L10 -7 L-19 -2 Z" fill={W} /><path d="M-19 -2 L-16 4 L-16 16 L-19 11 Z" fill="#f4d7ae" />
  <circle cx="0" cy="-8" r="4.5" fill="#ff4f6d" /><path d="M-2 -13 l2 2 l2 -2" stroke={GREEN} strokeWidth="1.8" fill="none" strokeLinecap="round" />
</g>;
const Ninja = ({ x = 0, y = 0, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <circle r="20" fill="#241c3a" stroke="#6a5a96" strokeWidth="2" /><rect x="-20" y="-7" width="40" height="10" fill="#ff6b9a" />
  <ellipse cx="-7" cy="-2" rx="4" ry="3" fill={W} /><ellipse cx="7" cy="-2" rx="4" ry="3" fill={W} />
  <circle cx="-6" cy="-2" r="1.6" fill={INK} /><circle cx="8" cy="-2" r="1.6" fill={INK} />
  <path d="M20 -4 q8 -2 10 -8" stroke="#ff6b9a" strokeWidth="4" fill="none" strokeLinecap="round" />
</g>;
const Spy = () => <g>
  <path d="M26 112 Q28 84 60 82 Q92 84 94 112 Z" fill="#2b2f3a" /><path d="M48 84 L60 104 L72 84 Z" fill={W} /><path d="M56 86 L60 100 L64 86 Z" fill={RED} />
  <circle cx="60" cy="62" r="20" fill={SKIN} />
  <rect x="42" y="56" width="15" height="9" rx="4" fill={INK} /><rect x="63" y="56" width="15" height="9" rx="4" fill={INK} /><path d="M57 59 h6" stroke={INK} strokeWidth="2.5" />
  <path d="M45 58 l4 -2" stroke={W} strokeWidth="1.5" opacity=".7" />
  <path d="M52 74 q8 3 16 -1" stroke="#b5654a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  <ellipse cx="60" cy="46" rx="34" ry="7" fill="#1b1d24" /><path d="M38 46 Q40 22 60 22 Q80 22 82 46 Z" fill="#23262e" /><path d="M39 40 Q60 46 81 40 L82 46 Q60 50 38 46 Z" fill={RED} />
</g>;

const DRAW = {
  // ---------- ทั่วไป ----------
  night: () => <g><g fill={W}><circle cx="30" cy="34" r="1.8" /><circle cx="88" cy="26" r="1.4" /><circle cx="96" cy="70" r="1.8" /><circle cx="24" cy="78" r="1.2" /></g>
    <circle cx="62" cy="54" r="28" fill="#f4f1ff" /><circle cx="76" cy="44" r="25" fill="#1d2552" /><g fill="#d8d3f0"><circle cx="50" cy="62" r="4" /><circle cx="58" cy="74" r="2.5" /></g>
    <g fill="#3a4580"><ellipse cx="42" cy="96" rx="26" ry="9" /><ellipse cx="72" cy="98" rx="22" ry="8" /></g><text x="84" y="44" fontSize="13" fontWeight="800" fill="#cfd5ff" fontFamily="sans-serif">z</text><text x="94" y="34" fontSize="10" fontWeight="800" fill="#cfd5ff" fontFamily="sans-serif">z</text></g>,
  day: () => <g><g stroke="#ffd34d" strokeWidth="6" strokeLinecap="round">{[0, 45, 90, 135, 180, 225, 270, 315].map(a => <path key={a} d="M60 22 V30" transform={`rotate(${a} 60 54)`} />)}</g>
    <circle cx="60" cy="54" r="20" fill="#ffd34d" /><circle cx="60" cy="54" r="14" fill="#ffe27a" />
    <g fill={W}><ellipse cx="80" cy="88" rx="18" ry="9" /><circle cx="70" cy="84" r="9" /><circle cx="84" cy="80" r="10" /></g></g>,
  vote: () => <g><path d="M48 30 L78 26 L82 62 L52 66 Z" fill={W} /><path d="M58 44 l6 6 l12 -14" stroke={GREEN} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="26" y="60" width="68" height="40" rx="6" fill="#6f7bd6" /><rect x="26" y="56" width="68" height="12" rx="4" fill="#8f9bff" /><rect x="44" y="60" width="32" height="4" rx="2" fill="#3a4580" /><rect x="50" y="76" width="20" height="10" rx="3" fill="#8f9bff" /></g>,
  wait: () => <g><rect x="36" y="20" width="48" height="8" rx="3" fill={BROWN} /><rect x="36" y="92" width="48" height="8" rx="3" fill={BROWN} />
    <path d="M42 28 H78 Q78 50 62 60 Q78 70 78 92 H42 Q42 70 58 60 Q42 50 42 28 Z" fill="#cfe8ff" opacity=".9" />
    <path d="M48 40 H72 Q70 50 60 56 Q50 50 48 40 Z" fill={GOLD} /><path d="M46 92 Q50 78 60 74 Q70 78 74 92 Z" fill={GOLD} /><path d="M60 58 V74" stroke={GOLD} strokeWidth="2" strokeDasharray="2 3" /></g>,
  win: () => <g><path d="M40 26 H80 V44 Q80 66 60 70 Q40 66 40 44 Z" fill={GOLD} /><path d="M40 32 H28 Q26 52 44 56" stroke={GOLD} strokeWidth="6" fill="none" /><path d="M80 32 H92 Q94 52 76 56" stroke={GOLD} strokeWidth="6" fill="none" />
    <rect x="54" y="68" width="12" height="14" fill="#e0a53a" /><rect x="40" y="82" width="40" height="12" rx="3" fill="#a0643c" /><path d="M50 36 l4 8 l8 1 l-6 6 l2 8 l-8 -4 l-8 4 l2 -8 l-6 -6 l8 -1 Z" fill="#fff4c9" transform="translate(6 -2) scale(.9)" />
    <g fill={W}><circle cx="26" cy="22" r="2" /><circle cx="96" cy="20" r="2.5" /><circle cx="100" cy="76" r="1.8" /></g></g>,
  lose: () => <g><g fill="#9aa3c7"><ellipse cx="60" cy="50" rx="30" ry="16" /><circle cx="46" cy="42" r="14" /><circle cx="68" cy="38" r="16" /></g>
    <g stroke={BLUE} strokeWidth="4" strokeLinecap="round"><path d="M42 74 l-4 10" /><path d="M58 76 l-4 10" /><path d="M74 74 l-4 10" /><path d="M50 92 l-3 7" /><path d="M66 92 l-3 7" /></g></g>,
  think: () => <g><path d="M24 28 Q24 18 34 18 H86 Q96 18 96 28 V66 Q96 76 86 76 H54 L38 92 L42 76 H34 Q24 76 24 66 Z" fill={W} />
    <text x="60" y="64" textAnchor="middle" fontSize="44" fontWeight="900" fill="#6f7bd6" fontFamily="sans-serif">?</text></g>,
  crown: () => <g><path d="M26 82 L22 38 L42 56 L60 28 L78 56 L98 38 L94 82 Z" fill={GOLD} /><rect x="26" y="80" width="68" height="12" rx="3" fill="#e0a53a" />
    <circle cx="60" cy="64" r="6" fill={RED} /><circle cx="40" cy="70" r="4" fill={BLUE} /><circle cx="80" cy="70" r="4" fill={GREEN} /><circle cx="22" cy="38" r="4" fill={GOLD} /><circle cx="60" cy="28" r="4" fill={GOLD} /><circle cx="98" cy="38" r="4" fill={GOLD} /></g>,
  cross: () => <g><circle cx="60" cy="60" r="30" fill={RED} /><path d="M47 47 l26 26 M73 47 l-26 26" stroke={W} strokeWidth="8" strokeLinecap="round" /></g>,
  check: () => <g><circle cx="60" cy="60" r="30" fill={GREEN} /><path d="M46 60 l10 10 l18 -20" stroke={W} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>,
  timer: () => <g><circle cx="60" cy="64" r="32" fill={W} /><circle cx="60" cy="64" r="32" fill="none" stroke="#6f7bd6" strokeWidth="6" /><rect x="54" y="20" width="12" height="10" rx="3" fill="#6f7bd6" />
    <path d="M60 64 V44" stroke={INK} strokeWidth="5" strokeLinecap="round" /><path d="M60 64 L74 72" stroke={RED} strokeWidth="4" strokeLinecap="round" /><circle cx="60" cy="64" r="4" fill={INK} /></g>,

  // ---------- Spyfall / SPY ----------
  pin: () => <g><path d="M18 96 L40 80 L80 86 L102 72 L102 100 L18 108 Z" fill={GREEN} opacity=".7" /><path d="M40 80 L48 104" stroke={BLUE} strokeWidth="5" opacity=".7" />
    <path d="M60 92 Q36 62 36 46 A24 24 0 0 1 84 46 Q84 62 60 92 Z" fill={RED} /><circle cx="60" cy="46" r="10" fill={W} /><ellipse cx="60" cy="96" rx="10" ry="3" fill={INK} opacity=".3" /></g>,
  spy: Spy,
  bubble: () => <g><path d="M20 30 Q20 18 32 18 H88 Q100 18 100 30 V66 Q100 78 88 78 H56 L36 96 L40 78 H32 Q20 78 20 66 Z" fill={W} />
    <g fill="#6f7bd6"><circle cx="42" cy="48" r="7" /><circle cx="60" cy="48" r="7" /><circle cx="78" cy="48" r="7" /></g></g>,
  magnifier: () => <g><rect x="70" y="72" width="12" height="36" rx="5" fill={BROWN} transform="rotate(-45 76 90)" /><circle cx="52" cy="52" r="28" fill="#cfe8ff" opacity=".6" /><circle cx="52" cy="52" r="28" fill="none" stroke={GREY} strokeWidth="8" /><path d="M38 40 Q44 32 54 32" stroke={W} strokeWidth="4" fill="none" strokeLinecap="round" /></g>,
  handcuffs: () => <g fill="none" strokeWidth="9"><circle cx="40" cy="64" r="20" stroke={GREY} /><circle cx="80" cy="64" r="20" stroke={GREY} /><path d="M56 50 Q60 42 64 50" stroke="#9a97a8" strokeWidth="6" />
    <circle cx="40" cy="64" r="20" stroke={W} strokeWidth="2" opacity=".5" /><circle cx="80" cy="64" r="20" stroke={W} strokeWidth="2" opacity=".5" /></g>,
  escape: () => <g><Spy /><g stroke={W} strokeWidth="3" strokeLinecap="round" opacity=".8"><path d="M8 54 h14" /><path d="M4 66 h18" /><path d="M10 78 h12" /></g><text x="96" y="34" fontSize="18" fill={GOLD}>✦</text></g>,

  // ---------- คำบนหัว ----------
  note: () => <g><circle cx="60" cy="84" r="26" fill="#ffd23f" /><ellipse cx="51" cy="82" rx="5" ry="6" fill={W} /><ellipse cx="69" cy="82" rx="5" ry="6" fill={W} /><circle cx="51" cy="78" r="2.6" fill={INK} /><circle cx="69" cy="78" r="2.6" fill={INK} /><ellipse cx="60" cy="98" rx="4" ry="3.5" fill={INK} />
    <g transform="rotate(-5 60 38)"><rect x="34" y="18" width="52" height="40" rx="3" fill="#fff3a3" /><rect x="50" y="14" width="20" height="8" fill={W} opacity=".7" /><text x="60" y="49" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2b2140" fontFamily="sans-serif">?</text></g></g>,
  guess: () => <g><circle cx="56" cy="64" r="34" fill={RED} /><circle cx="56" cy="64" r="25" fill={W} /><circle cx="56" cy="64" r="16" fill={RED} /><circle cx="56" cy="64" r="7" fill={W} />
    <path d="M56 64 L96 24" stroke={INK} strokeWidth="4" strokeLinecap="round" /><path d="M96 24 l-2 -10 M96 24 l10 2 M92 28 l-3 -9 M92 28 l9 3" stroke={BLUE} strokeWidth="3" strokeLinecap="round" /></g>,
  skip: () => <g><rect x="22" y="30" width="76" height="60" rx="16" fill="#8f9bff" /><path d="M38 44 L58 60 L38 76 Z" fill={W} /><path d="M58 44 L78 60 L58 76 Z" fill={W} /><rect x="80" y="44" width="6" height="32" rx="2" fill={W} /></g>,
  medal: () => <g><path d="M42 18 L54 52 L46 56 L32 22 Z" fill={BLUE} /><path d="M78 18 L66 52 L74 56 L88 22 Z" fill={RED} /><circle cx="60" cy="74" r="26" fill={GOLD} /><circle cx="60" cy="74" r="19" fill="#e0a53a" />
    <path d="M60 60 l4 9 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1 Z" fill="#fff4c9" /></g>,

  // ---------- ออกสำรวจ ----------
  compass: () => <g><circle cx="60" cy="60" r="38" fill="#e2b65c" /><circle cx="60" cy="60" r="31" fill="#fff6dc" /><g stroke="#b8862f" strokeWidth="2">{[0, 90, 180, 270].map(a => <path key={a} d="M60 32 V38" transform={`rotate(${a} 60 60)`} />)}</g>
    <path d="M60 30 L68 60 L60 64 L52 60 Z" fill={RED} /><path d="M60 90 L52 60 L60 56 L68 60 Z" fill="#6b7a8f" /><circle cx="60" cy="60" r="4" fill={INK} /><text x="60" y="27" textAnchor="middle" fontSize="9" fontWeight="800" fill="#7a5a1f" fontFamily="sans-serif">N</text></g>,
  lantern: () => <g><circle cx="60" cy="64" r="40" fill="#ffd77a" opacity=".25" /><path d="M48 28 h24 l-4 -8 h-16 Z" fill="#5b4a22" /><path d="M52 20 q8 -12 16 0" stroke="#5b4a22" strokeWidth="3" fill="none" />
    <rect x="42" y="28" width="36" height="52" rx="8" fill="#ffd77a" stroke="#5b4a22" strokeWidth="4" /><path d="M60 42 q8 10 0 20 q-8 -8 0 -20" fill="#ff9b3d" /><rect x="46" y="80" width="28" height="8" rx="3" fill="#5b4a22" /></g>,
  dagger: () => <g transform="rotate(-35 60 60)"><path d="M60 14 L68 30 L68 70 L52 70 L52 30 Z" fill="#dfe3ee" /><path d="M60 14 L60 70" stroke="#aab0c2" strokeWidth="2" /><rect x="40" y="70" width="40" height="8" rx="3" fill={GOLD} /><rect x="55" y="78" width="10" height="24" rx="3" fill={BROWN} /><circle cx="60" cy="106" r="5" fill={GOLD} /></g>,
  snake: () => <g><path d="M30 96 Q14 80 34 70 Q60 60 50 46 Q40 32 62 26 Q84 22 88 36" fill="none" stroke="#3fb56a" strokeWidth="14" strokeLinecap="round" />
    <path d="M30 96 Q14 80 34 70 Q60 60 50 46 Q40 32 62 26 Q84 22 88 36" fill="none" stroke="#7be09a" strokeWidth="4" strokeDasharray="2 8" strokeLinecap="round" />
    <ellipse cx="90" cy="38" rx="12" ry="9" fill="#3fb56a" /><circle cx="93" cy="34" r="2.5" fill={INK} /><path d="M101 40 l8 2 l-3 3 M109 42 l-2 -4" stroke={RED} strokeWidth="2" fill="none" strokeLinecap="round" /></g>,
  map: () => <g><path d="M22 30 L46 22 L74 30 L98 22 V90 L74 98 L46 90 L22 98 Z" fill="#f6e2b0" /><path d="M46 22 V90 M74 30 V98" stroke="#d9be82" strokeWidth="2" />
    <path d="M30 84 C42 70 50 76 58 62 S76 46 84 40" fill="none" stroke={RED} strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" /><path d="M80 34 l10 10 M90 34 l-10 10" stroke={RED} strokeWidth="4" strokeLinecap="round" /></g>,
  approve: () => <g><circle cx="44" cy="58" r="26" fill={GREEN} /><path d="M32 58 l8 8 l14 -16" stroke={W} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="78" cy="72" r="22" fill={RED} /><path d="M70 64 l16 16 M86 64 l-16 16" stroke={W} strokeWidth="6" strokeLinecap="round" /></g>,
  cards: () => <g><g transform="rotate(-12 50 64)"><rect x="26" y="30" width="46" height="66" rx="7" fill={W} /><rect x="30" y="34" width="38" height="58" rx="5" fill="#cfe8ff" /><circle cx="49" cy="63" r="12" fill="#ffd77a" /><path d="M49 55 q5 6 0 12 q-5 -5 0 -12" fill="#ff9b3d" /></g>
    <g transform="rotate(12 72 62)"><rect x="50" y="28" width="46" height="66" rx="7" fill={W} /><rect x="54" y="32" width="38" height="58" rx="5" fill="#ffd0d6" /><circle cx="73" cy="64" r="11" fill={INK} /><path d="M79 54 q4 -6 8 -4" stroke={BROWN} strokeWidth="2.5" fill="none" /><circle cx="88" cy="49" r="3" fill={GOLD} /></g></g>,
  bomb: () => <g><circle cx="56" cy="68" r="30" fill="#2b2f3a" /><path d="M40 56 q6 -10 16 -12" stroke={W} strokeWidth="4" fill="none" opacity=".35" strokeLinecap="round" /><rect x="66" y="32" width="16" height="12" rx="3" fill="#4a4f5c" transform="rotate(35 74 38)" />
    <path d="M80 30 q8 -10 16 -6" stroke={BROWN} strokeWidth="3" fill="none" /><g fill={GOLD}><circle cx="98" cy="22" r="6" /></g><g stroke="#ff9b3d" strokeWidth="3" strokeLinecap="round"><path d="M98 10 v-4" /><path d="M108 18 l4 -3" /><path d="M108 28 l4 2" /></g></g>,
  flag: () => <g><rect x="38" y="20" width="6" height="84" rx="3" fill={BROWN} /><path d="M44 24 Q64 16 84 26 Q72 36 86 48 Q64 54 44 48 Z" fill={GREEN} /><ellipse cx="41" cy="104" rx="18" ry="5" fill="#3f7a3d" /></g>,
  target: () => <g><circle cx="60" cy="60" r="38" fill="none" stroke={RED} strokeWidth="5" /><circle cx="60" cy="60" r="22" fill="none" stroke={RED} strokeWidth="4" /><path d="M60 14 V36 M60 84 V106 M14 60 H36 M84 60 H106" stroke={RED} strokeWidth="4" strokeLinecap="round" />
    <g transform="translate(60 62) scale(.45) translate(-60 -64)"><rect x="42" y="28" width="36" height="52" rx="8" fill="#ffd77a" stroke="#5b4a22" strokeWidth="5" /><path d="M48 28 h24 l-4 -8 h-16 Z" fill="#5b4a22" /></g></g>,
  treasure: () => <g><circle cx="60" cy="56" r="34" fill={GOLD} opacity=".25" /><path d="M26 58 Q26 36 60 36 Q94 36 94 58 Z" fill="#8a5530" /><rect x="26" y="58" width="68" height="40" rx="4" fill={BROWN} />
    <rect x="26" y="56" width="68" height="6" fill={GOLD} /><rect x="54" y="56" width="12" height="16" rx="2" fill={GOLD} /><g fill={GOLD}><circle cx="40" cy="36" r="6" /><circle cx="52" cy="30" r="6" /><circle cx="70" cy="32" r="6" /></g><path d="M80 28 l6 -8 l6 8 l-6 8 Z" fill={BLUE} /></g>,
  skull: () => <g><g stroke={W} strokeWidth="9" strokeLinecap="round"><path d="M28 92 L92 104" /><path d="M28 104 L92 92" /></g><path d="M34 54 Q34 22 60 22 Q86 22 86 54 Q86 70 76 74 V86 H44 V74 Q34 70 34 54 Z" fill={W} />
    <ellipse cx="48" cy="54" rx="8" ry="9" fill={INK} /><ellipse cx="72" cy="54" rx="8" ry="9" fill={INK} /><path d="M60 64 l-5 8 h10 Z" fill={INK} /><g stroke={INK} strokeWidth="2.5"><path d="M52 78 v8 M60 78 v8 M68 78 v8" /></g></g>,
  explorer: () => DRAW.compass(),

  // ---------- แวร์วูฟ ----------
  wolf: () => <g><path d="M28 54 L34 18 L52 38 L68 38 L86 18 L92 54 Q94 82 60 102 Q26 82 28 54 Z" fill="#8a8fa8" /><path d="M36 26 L48 40 L38 44 Z M84 26 L72 40 L82 44 Z" fill="#ff9fb6" opacity=".8" />
    <path d="M44 66 Q60 58 76 66 L70 88 Q60 96 50 88 Z" fill="#d9dcea" /><ellipse cx="60" cy="74" rx="7" ry="5" fill={INK} />
    <path d="M40 54 Q46 48 54 54 Q46 58 40 54 Z" fill="#ffd34d" /><path d="M80 54 Q74 48 66 54 Q74 58 80 54 Z" fill="#ffd34d" /><path d="M47 51 v6 M73 51 v6" stroke={INK} strokeWidth="2.5" />
    <path d="M54 86 l3 5 l3 -5 l3 5 l3 -5" stroke={W} strokeWidth="1.5" fill="none" /></g>,
  crystal: () => <g><circle cx="60" cy="54" r="30" fill="#a78bfa" /><circle cx="52" cy="46" r="10" fill={W} opacity=".35" /><circle cx="70" cy="62" r="6" fill="#e9ddff" opacity=".5" />
    <path d="M36 84 Q60 74 84 84 L90 98 H30 Z" fill={GOLD} /><g fill={W}><text x="22" y="36" fontSize="12">✦</text><text x="90" y="30" fontSize="10">✦</text></g></g>,
  potion: () => <g><rect x="52" y="18" width="16" height="12" rx="3" fill={BROWN} /><path d="M54 30 H66 V46 Q86 54 86 76 A26 26 0 0 1 34 76 Q34 54 54 46 Z" fill="#e8f6ff" opacity=".9" />
    <path d="M36 72 Q60 64 84 72 A24 24 0 0 1 36 72 Z" fill={GREEN} /><g fill={W} opacity=".8"><circle cx="54" cy="82" r="3" /><circle cx="66" cy="76" r="2" /><circle cx="60" cy="90" r="2.5" /></g>
    <circle cx="88" cy="36" r="14" fill={RED} /><path d="M88 28 v16 M80 36 h16" stroke={W} strokeWidth="5" strokeLinecap="round" /></g>,
  bow: () => <g><path d="M38 18 Q90 60 38 102" fill="none" stroke={BROWN} strokeWidth="7" strokeLinecap="round" /><path d="M38 18 L38 102" stroke={W} strokeWidth="2" />
    <path d="M24 60 H98" stroke="#c9a27a" strokeWidth="4" strokeLinecap="round" /><path d="M98 60 l-10 -6 v12 Z" fill={GREY} /><path d="M24 60 l-6 -6 M24 60 l-6 6 M30 60 l-6 -6 M30 60 l-6 6" stroke={RED} strokeWidth="3" strokeLinecap="round" /></g>,
  villager: () => <g><path d="M30 112 Q32 88 60 86 Q88 88 90 112 Z" fill="#6f9c4a" /><circle cx="60" cy="66" r="20" fill={SKIN} /><circle cx="53" cy="64" r="2.5" fill={INK} /><circle cx="67" cy="64" r="2.5" fill={INK} />
    <path d="M52 74 q8 6 16 0" stroke="#b5654a" strokeWidth="2.5" fill="none" strokeLinecap="round" /><ellipse cx="60" cy="50" rx="34" ry="8" fill="#e8c35a" /><path d="M42 50 Q44 30 60 30 Q76 30 78 50 Z" fill="#f2d470" /><rect x="42" y="44" width="36" height="5" fill="#c0392b" /></g>,
  tombstone: () => <g><ellipse cx="60" cy="100" rx="40" ry="8" fill="#3f7a3d" /><path d="M36 100 V50 Q36 26 60 26 Q84 26 84 50 V100 Z" fill="#9aa0b4" /><path d="M42 98 V52 Q42 32 60 32" stroke="#c4c9d8" strokeWidth="3" fill="none" />
    <text x="60" y="66" textAnchor="middle" fontSize="15" fontWeight="900" fill="#5a6078" fontFamily="sans-serif">RIP</text><path d="M60 74 v14 M54 80 h12" stroke="#5a6078" strokeWidth="3" /></g>,
  shield: () => <g><path d="M60 18 L94 30 V58 Q94 88 60 104 Q26 88 26 58 V30 Z" fill={BLUE} /><path d="M60 26 L86 36 V58 Q86 82 60 95 Z" fill="#9fd0ff" opacity=".5" /><path d="M60 44 v32 M44 60 h32" stroke={W} strokeWidth="9" strokeLinecap="round" /></g>,
  gavel: () => <g><rect x="22" y="88" width="56" height="12" rx="4" fill={BROWN} /><g transform="rotate(-30 66 50)"><rect x="40" y="30" width="44" height="22" rx="5" fill="#8a5530" /><rect x="36" y="32" width="6" height="18" rx="2" fill={GOLD} /><rect x="82" y="32" width="6" height="18" rx="2" fill={GOLD} /><rect x="58" y="52" width="8" height="46" rx="3" fill="#c9a27a" /></g></g>,
  moon: () => DRAW.night(),
  sun: () => DRAW.day(),

  // ---------- เค้ก ----------
  cake: () => <g><ellipse cx="60" cy="86" rx="40" ry="10" fill={W} /><CakeSlice x={60} y={66} s={2} /></g>,
  ninja: () => <g><Ninja x={60} y={62} s={1.9} /></g>,
  hungry: () => <g><circle cx="60" cy="62" r="34" fill="#ffd23f" /><path d="M42 54 q6 -6 12 0 M66 54 q6 -6 12 0" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M44 72 Q60 90 76 72 Z" fill="#7a2840" /><path d="M58 78 q4 4 8 0" fill={PINK} /><path d="M72 80 q2 10 -2 14 q-4 -4 2 -14" fill={BLUE} />
    <g stroke={GREY} strokeWidth="4" strokeLinecap="round"><path d="M18 34 v28" /><path d="M14 34 v10 M22 34 v10" strokeWidth="2.5" /><path d="M102 34 v28" /></g><path d="M102 34 q6 6 0 14" fill={GREY} /></g>,
  handshake: () => <g><text x="60" y="80" textAnchor="middle" fontSize="56">🤝</text></g>,
  bed: () => <g><rect x="18" y="62" width="84" height="22" rx="6" fill="#6f7bd6" /><rect x="14" y="48" width="8" height="48" rx="3" fill={BROWN} /><rect x="98" y="58" width="8" height="38" rx="3" fill={BROWN} />
    <rect x="24" y="52" width="26" height="14" rx="6" fill={W} /><path d="M46 62 Q70 50 98 62 V70 H46 Z" fill="#8f9bff" /><circle cx="36" cy="50" r="10" fill="#ffd23f" /><path d="M31 50 h4 M38 50 h4" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    <text x="62" y="38" fontSize="16" fontWeight="900" fill="#cfd5ff" fontFamily="sans-serif">z</text><text x="76" y="28" fontSize="12" fontWeight="900" fill="#cfd5ff" fontFamily="sans-serif">z</text><text x="88" y="20" fontSize="9" fontWeight="900" fill="#cfd5ff" fontFamily="sans-serif">z</text></g>,
  alarm: () => <g><g stroke={W} strokeWidth="3" strokeLinecap="round" opacity=".7"><path d="M14 40 l8 4" /><path d="M12 56 h9" /><path d="M106 40 l-8 4" /><path d="M108 56 h-9" /></g>
    <circle cx="40" cy="30" r="12" fill={GOLD} /><circle cx="80" cy="30" r="12" fill={GOLD} /><circle cx="60" cy="62" r="34" fill={RED} /><circle cx="60" cy="62" r="27" fill={W} />
    <path d="M60 62 V44" stroke={INK} strokeWidth="4" strokeLinecap="round" /><path d="M60 62 L74 62" stroke={INK} strokeWidth="4" strokeLinecap="round" /><circle cx="60" cy="62" r="3.5" fill={RED} />
    <path d="M40 94 l-6 10 M80 94 l6 10" stroke={RED} strokeWidth="5" strokeLinecap="round" /></g>,
  fridgeFull: () => <Fridge><CakeSlice x={62} y={50} s={1} /><ellipse cx="62" cy="58" rx="18" ry="3" fill={W} opacity=".9" /><rect x="44" y="70" width="12" height="20" rx="2" fill="#bfe3ff" /><rect x="64" y="76" width="16" height="12" rx="3" fill="#ffd27a" /></Fridge>,
  fridgeThief: () => <g><Fridge><rect x="44" y="70" width="12" height="20" rx="2" fill="#bfe3ff" /><ellipse cx="62" cy="58" rx="16" ry="3" fill={W} opacity=".9" /></Fridge><Ninja x={92} y={64} s={1} /><CakeSlice x={104} y={88} s={.7} /><path d="M100 82 q-6 -4 -10 -8" stroke="#241c3a" strokeWidth="6" strokeLinecap="round" fill="none" /></g>,
  fridgeEmpty: () => <Fridge><ellipse cx="62" cy="58" rx="16" ry="3" fill={W} opacity=".9" /><g fill="#f4d7ae"><circle cx="56" cy="55" r="1.8" /><circle cx="66" cy="56" r="1.4" /><circle cx="70" cy="54" r="1.2" /></g><rect x="44" y="70" width="12" height="20" rx="2" fill="#bfe3ff" /><text x="62" y="46" textAnchor="middle" fontSize="16" fontWeight="900" fill="#c9a0b4" fontFamily="sans-serif">?!</text></Fridge>,
  thiefEat: () => <g><Ninja x={58} y={56} s={1.6} /><CakeSlice x={62} y={96} s={1.1} /><g fill="#f4d7ae"><circle cx="40" cy="90" r="2" /><circle cx="86" cy="92" r="2.4" /><circle cx="80" cy="82" r="1.6" /></g><text x="88" y="34" fontSize="13" fontWeight="900" fill={PINK} fontFamily="sans-serif">งับ!</text></g>,
  die: ({ n = 1 }) => <g><rect x="24" y="24" width="72" height="72" rx="16" fill={W} /><rect x="24" y="84" width="72" height="12" rx="6" fill="#e2dcf0" /><Pips n={n} x={60} y={58} s={1.15} c="#3b1f52" /></g>,
  flashlight: () => <g><path d="M58 52 L108 26 L108 96 L58 70 Z" fill="#fff4b8" opacity=".55" /><rect x="14" y="50" width="38" height="22" rx="5" fill="#6f7bd6" /><rect x="50" y="46" width="10" height="30" rx="3" fill="#8f9bff" /><circle cx="24" cy="61" r="3" fill={W} /></g>,
  notebook: () => <g><rect x="28" y="20" width="62" height="82" rx="6" fill="#fff6dc" /><rect x="28" y="20" width="12" height="82" rx="4" fill={PINK} /><g stroke="#d9c79a" strokeWidth="2.5">{[38, 50, 62, 74, 86].map(y => <path key={y} d={`M46 ${y} H82`} />)}</g>
    <g transform="rotate(35 86 70)"><rect x="80" y="40" width="10" height="50" rx="2" fill={GOLD} /><path d="M80 90 l5 10 l5 -10 Z" fill="#f4d7ae" /></g></g>,
  jail: () => <g><Ninja x={60} y={62} s={1.6} /><g stroke="#9aa0b4" strokeWidth="5">{[28, 44, 60, 76, 92].map(x => <path key={x} d={`M${x} 20 V104`} />)}</g><rect x="20" y="20" width="80" height="8" rx="3" fill="#9aa0b4" /><rect x="20" y="96" width="80" height="8" rx="3" fill="#9aa0b4" /></g>,
  runaway: () => <g><g stroke={W} strokeWidth="3" strokeLinecap="round" opacity=".75"><path d="M12 50 h16" /><path d="M8 62 h20" /><path d="M14 74 h14" /></g><Ninja x={62} y={56} s={1.5} /><CakeSlice x={78} y={92} s={.9} /><path d="M70 84 q-6 -4 -8 -8" stroke="#241c3a" strokeWidth="6" strokeLinecap="round" fill="none" /></g>,
  thief: () => DRAW.ninja(),
  acc: () => DRAW.handshake(),
};
const BG = { night: '#1d2552', moon: '#1d2552', bed: '#1d2552', day: '#3a7cc4', sun: '#3a7cc4', alarm: '#2c2342', fridgeFull: '#2c2342', fridgeThief: '#2c2342', fridgeEmpty: '#2c2342' };
const NO_BG = new Set(['die']);

export function Art({ name, n, size = 96, className = '', title }) {
  const D = DRAW[name] || DRAW.think;
  return <svg className={'art ' + className} width={size} height={size} viewBox="0 0 120 120" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
    {!NO_BG.has(name) && <circle cx="60" cy="60" r="58" className="art-bg" style={BG[name] ? { fill: BG[name] } : undefined} />}
    <D n={n} />
  </svg>;
}
export const ART_NAMES = Object.keys(DRAW);
