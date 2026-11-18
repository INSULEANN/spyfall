// ภาพการ์ดแบบละเอียด ชุด 6 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const RB = ['#e63946', '#f77f00', '#fcbf49', '#2a9d8f', '#457b9d', '#7b2cbf'];

export const HD6 = [
  [55, 'ก๊อกน้ำสายรุ้ง', <Svg>
    <defs>
      <linearGradient id="q55s" x2="0" y2="1"><stop stopColor="#e9ecef" /><stop offset="1" stopColor="#ced4da" /></linearGradient>
      <linearGradient id="q55m" x2="0" y2="1"><stop stopColor="#dee2e6" /><stop offset=".5" stopColor="#f8f9fa" /><stop offset="1" stopColor="#868e96" /></linearGradient>
      <linearGradient id="q55b" x2="1" y2="0"><stop stopColor="#495057" /><stop offset=".4" stopColor="#adb5bd" /><stop offset="1" stopColor="#343a40" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#q55s)" />
    <g stroke="#dee2e6" strokeWidth=".8">{[20, 40, 60, 80, 100].map(y => <line key={y} x1="0" y1={y} x2="120" y2={y} />)}{[0, 1, 2, 3, 4, 5].map(i => <line key={i} x1={(i % 2) * 15 + i * 24} y1="0" x2={(i % 2) * 15 + i * 24} y2="110" />)}</g>
    <rect x="0" y="110" width="120" height="50" fill="#adb5bd" /><path d="M0 110h120" stroke="#868e96" strokeWidth="1.5" />
    <rect x="0" y="22" width="40" height="11" fill="url(#q55m)" /><path d="M36 22h14q8 0 8 8v10h-11V33h-11z" fill="url(#q55m)" />
    <rect x="28" y="12" width="9" height="10" fill="url(#q55m)" /><rect x="18" y="8" width="30" height="5" rx="2.5" fill="#868e96" /><circle cx="33" cy="10.5" r="2" fill="#e63946" />
    <rect x="45" y="38" width="15" height="4" rx="1.5" fill="#868e96" />
    {RB.map((c, i) => <path key={i} d={`M${46 + i * 2.3} 42Q${44 + i * 3} 80 ${40 + i * 4.4} 108`} stroke={c} strokeWidth="2.4" fill="none" strokeLinecap="round" />)}
    <g fill="#fff" opacity=".7"><circle cx="58" cy="60" r="1" /><circle cx="40" cy="82" r=".8" /><circle cx="68" cy="94" r="1.2" /></g>
    <path d="M30 108H86L80 146H36Z" fill="url(#q55b)" /><ellipse cx="58" cy="108" rx="28" ry="5" fill="#343a40" />
    <ellipse cx="58" cy="108" rx="24" ry="3.6" fill="#fcbf49" />{RB.map((c, i) => <path key={i} d={`M${36 + i * 2} 108q${22 - i * 2} -${3 - i * .4} ${44 - i * 4} 0`} stroke={c} strokeWidth="1" fill="none" />)}
    <path d="M30 108Q20 112 22 124Q24 132 30 130" stroke="#495057" strokeWidth="2" fill="none" />
    {RB.map((c, i) => <path key={i} d={`M${84 + i} ${110 + i * .6}q8 6 12 ${18 + i * 3}`} stroke={c} strokeWidth="1.4" fill="none" opacity=".85" />)}
    <path d="M90 150q12-4 26 2v8H88Z" fill="url(#q55s)" opacity=".5" /><ellipse cx="102" cy="152" rx="16" ry="3" fill="#7b2cbf" opacity=".3" />
  </Svg>],

  [57, 'กระบองเพชรใส่ผ้าพันคอ', <Svg>
    <defs>
      <linearGradient id="q57s" x2="0" y2="1"><stop stopColor="#a9c5e8" /><stop offset="1" stopColor="#e7f0fa" /></linearGradient>
      <linearGradient id="q57c" x2="1" y2="0"><stop stopColor="#2d6a4f" /><stop offset=".45" stopColor="#74c69d" /><stop offset="1" stopColor="#2d6a4f" /></linearGradient>
      <linearGradient id="q57p" x2="0" y2="1"><stop stopColor="#d07a3c" /><stop offset="1" stopColor="#8a4a1e" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#q57s)" />
    <path d="M0 60L20 40L36 56L56 30L78 54L96 38L120 56V80H0Z" fill="#fff" opacity=".7" /><path d="M0 70L30 56L60 72L90 58L120 72V86H0Z" fill="#dbe7f3" />
    <g fill="#fff">{Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 41) % 118 + 1} cy={(i * 29) % 120 + 4} r={i % 3 ? 1 : 1.6} />)}</g>
    <path d="M0 126Q60 116 120 128V160H0Z" fill="#fff" /><path d="M0 134Q60 126 120 136" stroke="#dbe7f3" fill="none" />
    <path d="M44 128V60a10 10 0 0 1 20 0V128Z" fill="url(#q57c)" /><path d="M44 100H34a6 6 0 0 1-6-6V80a5 5 0 0 1 10 0V92h6" fill="url(#q57c)" /><path d="M64 88H76V72a5 5 0 0 1 10 0V90a6 6 0 0 1-6 6H64" fill="url(#q57c)" />
    <g stroke="#1b4332" strokeWidth=".7">{[48, 54, 60].map(x => <line key={x} x1={x} y1="56" x2={x} y2="126" />)}</g>
    <g stroke="#fff" strokeWidth=".5">{Array.from({ length: 14 }, (_, i) => { const x = [48, 54, 60][i % 3], y = 62 + (i * 5) % 60; return <path key={i} d={`M${x} ${y}l-2-1M${x} ${y}l2-1`} />; })}</g>
    <path d="M44 58a10 7 0 0 1 20 0q-4 3-10 3t-10-3z" fill="#fff" /><path d="M28 80a5 4 0 0 1 10 0q-5 2-10 0zM76 72a5 4 0 0 1 10 0q-5 2-10 0z" fill="#fff" />
    <path d="M40 80h28v8h-28z" fill="#e63946" /><path d="M40 82h28M40 86h28" stroke="#ffd6e0" strokeWidth=".6" />
    <path d="M58 86h8v22l-4-3-4 3z" fill="#e63946" /><path d="M58 104l1 4 1.5-3 1.5 3 1.5-3 1.5 3 1-4" stroke="#c1121f" fill="none" />
    <circle cx="51" cy="68" r="1.4" fill="#1b4332" /><circle cx="58" cy="68" r="1.4" fill="#1b4332" /><path d="M52 73q3 2 5 0" stroke="#1b4332" fill="none" strokeWidth=".8" />
    <circle cx="49" cy="71" r="1.6" fill="#ff8fa3" opacity=".7" /><circle cx="60" cy="71" r="1.6" fill="#ff8fa3" opacity=".7" />
    <path d="M38 128h32l-3 14h-26z" fill="url(#q57p)" /><path d="M36 126h36v4H36z" fill="#b5652a" />
    <path d="M40 135l3-2 3 2 3-2 3 2 3-2 3 2 3-2 3 2" stroke="#fcbf49" strokeWidth=".8" fill="none" />
  </Svg>],

  [67, 'มนุษย์หิมะเที่ยวทะเล', <Svg>
    <defs>
      <linearGradient id="q67s" x2="0" y2="1"><stop stopColor="#00b4d8" /><stop offset="1" stopColor="#caf0f8" /></linearGradient>
      <linearGradient id="q67w" x2="0" y2="1"><stop stopColor="#0096c7" /><stop offset="1" stopColor="#48cae4" /></linearGradient>
      <linearGradient id="q67b" x2="0" y2="1"><stop stopColor="#ffe8b6" /><stop offset="1" stopColor="#f4c47a" /></linearGradient>
      <radialGradient id="q67u"><stop stopColor="#fffbe0" /><stop offset=".4" stopColor="#ffe066" stopOpacity=".6" /><stop offset="1" stopColor="#ffe066" stopOpacity="0" /></radialGradient>
      <linearGradient id="q67n" x2="1" y2="1"><stop stopColor="#fff" /><stop offset="1" stopColor="#cfe6f5" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#q67s)" />
    <circle cx="96" cy="24" r="26" fill="url(#q67u)" /><circle cx="96" cy="24" r="9" fill="#fffbe0" />
    <path d="M0 86H120V112H0Z" fill="url(#q67w)" /><g stroke="#fff" strokeWidth="1" opacity=".7" fill="none"><path d="M6 94q5-2 10 0M40 100q5-2 10 0M80 92q5-2 10 0M98 104q5-2 10 0" /></g>
    <path d="M0 108Q30 104 60 110T120 108V160H0Z" fill="url(#q67b)" /><path d="M0 108Q30 104 60 110T120 108" stroke="#fff" strokeWidth="2" fill="none" opacity=".8" />
    <g fill="#e9c46a" opacity=".5">{[[20, 140], [90, 130], [104, 150], [10, 124]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".8" />)}</g>
    <path d="M84 116V64" stroke="#adb5bd" strokeWidth="1.5" /><path d="M64 68Q84 46 104 68Z" fill="#ef476f" /><path d="M74 68Q84 46 94 68Z" fill="#fff" /><path d="M64 68Q84 60 104 68" stroke="#c9184a" fill="none" />
    <path d="M88 118h26l-2 6H90Z" fill="#06d6a0" /><path d="M88 118h26" stroke="#049f76" />
    <ellipse cx="44" cy="146" rx="30" ry="7" fill="#90e0ef" opacity=".7" /><ellipse cx="44" cy="146" rx="22" ry="4" fill="#caf0f8" opacity=".7" />
    <circle cx="44" cy="126" r="18" fill="url(#q67n)" /><path d="M30 134Q44 148 58 134" stroke="#cfe6f5" fill="none" />
    <circle cx="44" cy="98" r="13" fill="url(#q67n)" />
    <path d="M32 96h24" stroke="#222" strokeWidth="1" /><rect x="32" y="93" width="9" height="6" rx="2.5" fill="#222" /><rect x="47" y="93" width="9" height="6" rx="2.5" fill="#222" /><path d="M34 94l3 2" stroke="#fff" strokeWidth=".6" />
    <path d="M44 101l11 2-11 2z" fill="#f77f00" /><path d="M38 108q6 3 12 0" stroke="#222" fill="none" strokeLinecap="round" />
    <g fill="#222"><circle cx="44" cy="120" r="1.4" /><circle cx="44" cy="128" r="1.4" /></g>
    <path d="M31 112q13 4 26 0v4q-13 4-26 0z" fill="#e63946" /><path d="M50 116l4 10" stroke="#e63946" strokeWidth="3" strokeLinecap="round" />
    <path d="M60 122l14-12M28 122l-12-8" stroke="#6b4226" strokeWidth="1.6" strokeLinecap="round" /><path d="M74 110l3-3M74 110l4 0" stroke="#6b4226" />
    <g fill="#caf0f8" opacity=".9"><path d="M34 140q-2 4 0 6q2-2 0-6z" /><path d="M56 138q-2 4 0 6q2-2 0-6z" /></g>
    <path d="M14 152l5-3 3 4-5 2z" fill="#f4a261" />
  </Svg>],

  [71, 'พายุหอบบ้าน', <Svg>
    <defs>
      <linearGradient id="q71s" x2="0" y2="1"><stop stopColor="#495057" /><stop offset=".6" stopColor="#868e96" /><stop offset="1" stopColor="#b9a26a" /></linearGradient>
      <linearGradient id="q71t" x2="1" y2="0"><stop stopColor="#343a40" stopOpacity=".9" /><stop offset=".5" stopColor="#6c757d" stopOpacity=".8" /><stop offset="1" stopColor="#343a40" stopOpacity=".9" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#q71s)" />
    <g fill="#343a40" opacity=".8"><ellipse cx="60" cy="10" rx="70" ry="16" /><ellipse cx="20" cy="18" rx="30" ry="10" /><ellipse cx="100" cy="20" rx="30" ry="10" /></g>
    <path d="M22 18H98Q88 40 82 58Q76 80 72 100Q68 120 64 148H56Q54 120 50 100Q44 80 38 58Q30 40 22 18Z" fill="url(#q71t)" />
    <g stroke="#212529" strokeWidth="1.2" fill="none" opacity=".7">{[[24, 26, 96], [32, 44, 88], [40, 64, 80], [46, 84, 74], [52, 104, 68], [56, 124, 64]].map(([a, y, b], i) => <path key={i} d={`M${a} ${y}Q60 ${y + 6} ${b} ${y - 2}`} />)}</g>
    <g stroke="#dee2e6" strokeWidth=".7" fill="none" opacity=".6">{[[28, 34, 92], [44, 74, 78], [54, 114, 66]].map(([a, y, b], i) => <path key={i} d={`M${a} ${y}Q60 ${y + 5} ${b} ${y - 1}`} />)}</g>
    <g transform="rotate(-22 92 46)"><rect x="82" y="40" width="22" height="16" fill="#e76f51" /><polygon points="79,41 93,29 107,41" fill="#6b4226" /><rect x="86" y="45" width="6" height="6" fill="#ffd166" /><rect x="95" y="46" width="5" height="10" fill="#5a3e2b" /><rect x="98" y="30" width="3" height="6" fill="#6b4226" /></g>
    <g transform="rotate(34 24 76)"><ellipse cx="24" cy="76" rx="10" ry="6.5" fill="#fff" /><g fill="#222"><circle cx="20" cy="74" r="2.4" /><circle cx="28" cy="78" r="2" /></g><circle cx="15" cy="72" r="4.4" fill="#fff" /><ellipse cx="12" cy="74" rx="2.4" ry="1.8" fill="#ffafcc" /><path d="M18 82v5M30 82v5M22 82v5M26 82v5" stroke="#222" strokeWidth="1.4" /><path d="M14 68l-2-3M17 68l1-3" stroke="#6b4226" strokeWidth=".8" /></g>
    <g transform="rotate(-40 98 102)"><rect x="92" y="98" width="14" height="6" rx="1" fill="#9c6644" /><path d="M93 98v-3M105 98v-3" stroke="#6b4226" /></g>
    <g fill="#6b4226"><path d="M14 112l4 1-1 3z" /><path d="M104 74l3-2 1 3z" /><circle cx="78" cy="128" r="1.6" /></g><g fill="#2b9348"><path d="M34 120q4-4 6 0q-4 2-6 0z" /><path d="M86 90q4-4 6 0q-4 2-6 0z" /></g>
    <path d="M0 148Q60 140 120 148V160H0Z" fill="#7a6a3a" /><g fill="#5a4a24"><path d="M10 148l3-8 3 8zM100 148l2-6 2 6z" /></g>
    <g transform="translate(108 140)"><path d="M0 0v-10" stroke="#3a2a1a" strokeWidth="1.6" /><path d="M0-10q-6-2-8-8M0-8q6-4 6-10" stroke="#3a2a1a" strokeWidth="1" fill="none" /></g>
  </Svg>],

  [72, 'เขาวงกต', <Svg>
    <defs>
      <linearGradient id="q72g" x2="0" y2="1"><stop stopColor="#52734d" /><stop offset="1" stopColor="#2f4a2b" /></linearGradient>
      <radialGradient id="q72c"><stop stopColor="#ffe066" stopOpacity=".9" /><stop offset=".4" stopColor="#ffd60a" stopOpacity=".4" /><stop offset="1" stopColor="#ffd60a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="#c2b280" />
    <g fill="none" strokeLinecap="square">
      <g stroke="#1e3320" strokeWidth="8" transform="translate(1.5 2)"><path d="M10 10H110V150H10V34M24 24H96V136H24V60M38 38H82V122H38V84M52 52H68V108H52M10 80H24M96 60H110M38 100H24M82 90H96M60 24V38M60 122V136M82 52H96" /></g>
      <g stroke="url(#q72g)" strokeWidth="8"><path d="M10 10H110V150H10V34M24 24H96V136H24V60M38 38H82V122H38V84M52 52H68V108H52M10 80H24M96 60H110M38 100H24M82 90H96M60 24V38M60 122V136M82 52H96" /></g>
      <g stroke="#7fa26a" strokeWidth="1.5" opacity=".7"><path d="M10 7H110M24 21H96M38 35H82M52 49H68" /></g>
    </g>
    <circle cx="60" cy="80" r="16" fill="url(#q72c)" /><path d="M56 78h8v6h-8z" fill="#8b5a2b" /><path d="M56 78q4-4 8 0" fill="#c9a227" /><circle cx="60" cy="81" r=".8" fill="#ffd60a" />
    <g fill="#f8f9fa"><circle cx="17" cy="20" r="2.4" /></g><path d="M15.5 22.4h3l.5 5h-4z" fill="#e63946" />
    <path d="M17 28V44M17 44H31V30" stroke="#e63946" strokeWidth=".8" strokeDasharray="1.5 2" fill="none" />
    <g fill="#ffd166">{[[30, 66], [88, 112], [104, 140], [46, 130]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" />)}</g>
    <g transform="translate(102 120)"><ellipse rx="3" ry="2" fill="#6c757d" /><circle cx="2.4" cy="-1.4" r="1.4" fill="#6c757d" /></g>
  </Svg>],

  [74, 'ธงบนยอดเขา', <Svg>
    <defs>
      <linearGradient id="q74s" x2="0" y2="1"><stop stopColor="#4361ee" /><stop offset=".5" stopColor="#90e0ef" /><stop offset="1" stopColor="#fff" /></linearGradient>
      <linearGradient id="q74m" x2="1" y2="0"><stop stopColor="#6c757d" /><stop offset=".5" stopColor="#adb5bd" /><stop offset="1" stopColor="#495057" /></linearGradient>
      <linearGradient id="q74d" x2="1" y2="0"><stop stopColor="#495057" /><stop offset="1" stopColor="#343a40" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#q74s)" />
    <g fill="#fff" opacity=".9"><ellipse cx="100" cy="50" rx="18" ry="5" /><circle cx="96" cy="46" r="6" /><ellipse cx="18" cy="74" rx="16" ry="4" /></g>
    <polygon points="0,100 22,70 40,96" fill="#adb5bd" opacity=".6" /><polygon points="80,96 104,68 120,90" fill="#adb5bd" opacity=".6" />
    <polygon points="4,160 60,28 116,160" fill="url(#q74m)" /><polygon points="60,28 116,160 72,160 70,110" fill="url(#q74d)" opacity=".6" />
    <polygon points="60,28 76,62 68,58 62,68 54,58 46,64" fill="#fff" /><path d="M60 28L62 68" stroke="#dee2e6" strokeWidth=".8" />
    <g stroke="#343a40" strokeWidth=".8" fill="none" opacity=".6"><path d="M40 90l8 6-4 8M74 96l6 10M30 120l10 6M84 130l6-8" /></g>
    <polygon points="0,160 30,104 58,160" fill="#343a40" />
    <path d="M60 28V6" stroke="#212529" strokeWidth="1.2" /><path d="M60 6Q68 4 74 8Q68 12 60 12Z" fill="#e63946" /><path d="M60 6Q66 6 70 8" stroke="#ff8fa3" strokeWidth=".6" fill="none" />
    <path d="M56 82Q62 72 66 62" stroke="#ffd166" strokeWidth=".6" fill="none" />
    <g transform="translate(70 58)"><circle cx="0" cy="-3" r="2" fill="#212529" /><path d="M-1.6-1h3.2l1 6h-5z" fill="#f77f00" /><path d="M-2 0l-3 4M2 0l4-3" stroke="#212529" strokeWidth="1" strokeLinecap="round" /><path d="M-1 5l-2 4M1 5l1 4" stroke="#212529" strokeWidth="1.1" strokeLinecap="round" /><rect x="-3" y="-1" width="2.4" height="4" rx=".8" fill="#2a9d8f" /></g>
    <g fill="#fff" opacity=".9"><circle cx="78" cy="56" r="1" /><circle cx="82" cy="52" r=".7" /><circle cx="86" cy="54" r=".5" /></g>
    <g fill="#212529"><path d="M24 30q3-3 6 0q-3 1-6 0z" /><path d="M32 24q2-2 4 0q-2 1-4 0z" /></g>
  </Svg>],

  [83, 'ฝูงเครื่องบินกระดาษบินเข้าพายุ', <Svg>
    <defs>
      <linearGradient id="q83s" x2="0" y2="1"><stop stopColor="#212529" /><stop offset=".6" stopColor="#495057" /><stop offset="1" stopColor="#adb5bd" /></linearGradient>
      <radialGradient id="q83l"><stop stopColor="#fff3b0" stopOpacity=".7" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#q83s)" />
    <g fill="#1a1d20"><circle cx="86" cy="22" r="22" /><circle cx="110" cy="34" r="18" /><circle cx="64" cy="30" r="16" /><ellipse cx="90" cy="44" rx="34" ry="10" /></g>
    <g fill="#343a40"><circle cx="78" cy="38" r="10" /><circle cx="100" cy="46" r="8" /></g>
    <circle cx="92" cy="58" r="20" fill="url(#q83l)" />
    <path d="M94 44L86 60H93L84 80L102 54H94L100 44Z" fill="#ffd60a" /><path d="M94 44L86 60H93L84 80" stroke="#fff" strokeWidth=".6" fill="none" />
    <g stroke="#adb5bd" strokeWidth=".5" opacity=".7">{Array.from({ length: 12 }, (_, i) => <line key={i} x1={60 + i * 5} y1={52 + (i % 3) * 6} x2={56 + i * 5} y2={66 + (i % 3) * 6} />)}</g>
    <path d="M0 160V136Q30 130 60 138T120 134V160Z" fill="#6c757d" /><path d="M0 146Q30 140 60 148T120 144V160H0Z" fill="#495057" />
    {[[18, 128, 1.3], [38, 112, 1.1], [24, 98, .9], [56, 96, 1], [12, 76, .8], [44, 72, .8], [68, 62, .65], [30, 52, .55], [56, 44, .45]].map(([x, y, s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s}) rotate(-30)`}><polygon points="0,0 24,7 0,11" fill="#f8f9fa" /><polygon points="0,11 24,7 5,15" fill="#ced4da" /><path d="M0 11L24 7" stroke="#adb5bd" strokeWidth=".5" /><path d="M-8 6h-6M-8 9h-10" stroke="#f8f9fa" strokeWidth=".6" opacity=".5" /></g>)}
    <g transform="translate(14 148)"><circle cx="0" cy="-8" r="2.2" fill="#212529" /><path d="M-2-6h4l1 8h-6z" fill="#212529" /><path d="M2-5l5-5" stroke="#212529" strokeWidth="1.1" strokeLinecap="round" /></g>
  </Svg>],

  [84, 'รอยเท้ายักษ์ในเมือง', <Svg>
    <defs>
      <linearGradient id="q84s" x2="0" y2="1"><stop stopColor="#bde0fe" /><stop offset="1" stopColor="#e9f5db" /></linearGradient>
      <linearGradient id="q84f" x2="1" y2="1"><stop stopColor="#7f6a55" /><stop offset="1" stopColor="#4a3a2a" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#q84s)" />
    <g fill="#adb5bd"><rect x="2" y="34" width="16" height="40" /><rect x="20" y="44" width="12" height="30" /><rect x="88" y="28" width="16" height="46" /><rect x="104" y="40" width="14" height="34" /></g>
    <g fill="#dee2e6">{Array.from({ length: 16 }, (_, i) => <rect key={i} x={[5, 11, 91, 97, 107, 112, 23, 27][i % 8]} y={38 + (i / 8 | 0) * 14 + (i % 2) * 6} width="3" height="4" />)}</g>
    <path d="M0 72H120V160H0Z" fill="#a7c957" /><path d="M0 72h120" stroke="#6a994e" strokeWidth="1.5" />
    <path d="M0 108H120V118H0Z" fill="#6c757d" opacity=".8" /><path d="M0 113h120" stroke="#f8f9fa" strokeDasharray="6 6" />
    <path d="M30 152Q14 120 32 92Q52 70 74 86Q92 100 86 130Q82 156 56 158Q38 160 30 152Z" fill="url(#q84f)" />
    <path d="M36 140Q30 120 40 104" stroke="#3a2a1a" strokeWidth="1" fill="none" opacity=".6" />
    <g fill="url(#q84f)"><ellipse cx="32" cy="78" rx="8" ry="10" /><ellipse cx="50" cy="68" rx="7" ry="9" /><ellipse cx="66" cy="68" rx="6" ry="8" /><ellipse cx="79" cy="73" rx="5" ry="7" /><ellipse cx="89" cy="82" rx="4" ry="5" /></g>
    <g fill="#2b2118" opacity=".5"><path d="M44 112l-4 8 6-2zM62 122l6 6-2-8zM50 134l-6 4 8 0z" /></g>
    <g transform="rotate(30 58 116)"><rect x="50" y="112" width="15" height="10" fill="#e76f51" /><polygon points="48,113 57.5,105 67,113" fill="#6b4226" /><rect x="54" y="115" width="4" height="4" fill="#ffd166" /></g>
    <g transform="translate(70 140) rotate(-80)"><rect x="-8" y="-4" width="16" height="8" rx="2" fill="#4361ee" /><circle cx="-5" cy="4" r="2" fill="#222" /><circle cx="5" cy="4" r="2" fill="#222" /></g>
    <g fill="#212529"><circle cx="102" cy="126" r="2" /><path d="M100 128.5h4v6h-4z" /><path d="M100 129l-3-3M104 129l3-3" stroke="#212529" strokeWidth="1" /></g>
    <g fill="#212529"><circle cx="110" cy="96" r="1.6" /><path d="M108.6 98h2.8v4.6h-2.8z" /></g>
    <path d="M106 120q2-4 6-4" stroke="#212529" strokeWidth=".6" fill="none" />
  </Svg>],
];
