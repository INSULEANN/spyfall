// ภาพการ์ดแบบละเอียด ชุด 30 (ภาพใหม่ 225–232) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;
const Star = ({ x, y, s = 1, f = '#ffd60a' }) => <path d="M0 -5l1.5 3.5 3.5.5-2.5 2.5.6 3.5-3.1-1.6-3.1 1.6.6-3.5-2.5-2.5 3.5-.5z" transform={`translate(${x} ${y}) scale(${s})`} fill={f} />;

export const HD30 = [
  [225, 'เต่ากับกระต่ายนอนหลับคู่กัน', <Svg>
    <defs>
      <linearGradient id="k225s" x2="0" y2="1"><stop stopColor="#ffcad4" /><stop offset=".6" stopColor="#f4acb7" /><stop offset="1" stopColor="#9d8189" /></linearGradient>
      <linearGradient id="k225g" x2="0" y2="1"><stop stopColor="#b7e4c7" /><stop offset="1" stopColor="#52b788" /></linearGradient>
      <radialGradient id="k225t" cx=".4" cy=".3"><stop stopColor="#95d5b2" /><stop offset="1" stopColor="#2d6a4f" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k225s)" />
    <circle cx="30" cy="40" r="12" fill="#fff3b0" opacity=".9" /><Cl x={90} y={30} s={.8} o={.8} />
    <path d="M60 160q-2 -40 4 -70q-18 -10 -30 -28M64 90q12 -16 30 -20" stroke="#6f4518" strokeWidth="6" fill="none" strokeLinecap="round" />
    <g fill="#40916c"><circle cx="34" cy="60" r="16" /><circle cx="56" cy="50" r="20" /><circle cx="84" cy="62" r="18" /><circle cx="70" cy="76" r="14" /></g>
    <g fill="#74c69d" opacity=".7"><circle cx="50" cy="44" r="6" /><circle cx="80" cy="56" r="5" /></g>
    <path d="M0 116Q60 106 120 116V160H0Z" fill="url(#k225g)" />
    <g stroke="#2d6a4f" strokeWidth=".7">{Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${i * 8 + 3} 122l-1 -4M${i * 8 + 5} 122l1 -4`} />)}</g>
    <g transform="translate(42 126)">
      <ellipse cx="0" cy="6" rx="18" ry="4" fill="#2d6a4f" opacity=".3" />
      <path d="M-16 4q0 -16 16 -16q16 0 16 16z" fill="url(#k225t)" stroke="#1b4332" strokeWidth="1" />
      <path d="M-10 -2l6 -6 6 6 -6 6zM2 -4l6 -4 4 6 -6 4z" fill="none" stroke="#1b4332" strokeWidth=".8" />
      <path d="M14 2q8 -2 10 4q-2 4 -8 2z" fill="#95d5b2" stroke="#1b4332" strokeWidth=".8" /><path d="M19 3q1.4 1 2.6 0" stroke="#1b4332" strokeWidth=".6" fill="none" />
      <path d="M-12 4l-2 4M10 4l2 4" stroke="#95d5b2" strokeWidth="3" strokeLinecap="round" />
    </g>
    <g transform="translate(78 124)">
      <ellipse cx="0" cy="8" rx="16" ry="3" fill="#2d6a4f" opacity=".3" />
      <ellipse cx="0" cy="2" rx="14" ry="8" fill="#f8f9fa" stroke="#ced4da" strokeWidth=".8" />
      <circle cx="-12" cy="0" r="7" fill="#f8f9fa" stroke="#ced4da" strokeWidth=".8" />
      <path d="M-14 -6q-12 -2 -16 4q8 -2 14 2zM-10 -6q-8 -8 -16 -6q6 2 12 8z" fill="#f8f9fa" stroke="#ced4da" strokeWidth=".8" />
      <path d="M-15 0q1.4 1 2.8 0" stroke="#495057" strokeWidth=".7" fill="none" /><circle cx="-17" cy="2" r="1.4" fill="#ffc8dd" />
      <circle cx="13" cy="0" r="3" fill="#fff" />
    </g>
    <g fill="#6d597a" fontWeight="700" fontFamily="sans-serif"><text x="64" y="104" fontSize="7">z</text><text x="70" y="98" fontSize="9">z</text><text x="76" y="90" fontSize="11">Z</text></g>
    <g fill="#ff99c8">{[[14, 140], [104, 138], [24, 150], [96, 150]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.8" />)}</g>
  </Svg>],

  [226, 'ลิงใช้กล้วยเป็นโทรศัพท์', <Svg>
    <defs>
      <linearGradient id="k226s" x2="0" y2="1"><stop stopColor="#80ed99" /><stop offset="1" stopColor="#38a3a5" /></linearGradient>
      <radialGradient id="k226m" cx=".4" cy=".35"><stop stopColor="#c8915a" /><stop offset="1" stopColor="#7f5539" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k226s)" />
    <g fill="#22577a" opacity=".5"><path d="M0 40q20 -10 30 10q-16 -4 -30 4z" /><path d="M120 30q-24 -6 -32 14q14 -6 32 0z" /><path d="M0 80q26 -6 34 12q-18 -6 -34 0z" /></g>
    <path d="M10 0q4 60 -2 160M108 0q-6 70 4 160" stroke="#38a3a5" strokeWidth="4" fill="none" opacity=".5" />
    <path d="M0 44Q60 30 120 46" stroke="#6f4518" strokeWidth="6" fill="none" /><path d="M0 44Q60 30 120 46" stroke="#9c6644" strokeWidth="3" fill="none" />
    <g fill="#57cc99"><path d="M20 40q-8 6 -4 16q4 -8 4 -16z" /><path d="M90 38q6 8 2 16q-4 -6 -2 -16z" /></g>
    <g transform="translate(60 92)">
      <path d="M-4 -46q-2 -6 2 -10" stroke="#7f5539" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M8 -42q10 -6 14 -2" stroke="#7f5539" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="0" cy="4" rx="16" ry="18" fill="url(#k226m)" /><ellipse cx="0" cy="8" rx="9" ry="11" fill="#e6ccb2" />
      <circle cx="0" cy="-22" r="14" fill="url(#k226m)" /><circle cx="-14" cy="-24" r="5" fill="#7f5539" /><circle cx="-14" cy="-24" r="2.6" fill="#e6ccb2" /><circle cx="14" cy="-24" r="5" fill="#7f5539" /><circle cx="14" cy="-24" r="2.6" fill="#e6ccb2" />
      <path d="M-9 -24q0 -6 9 -6q9 0 9 6q0 10 -9 12q-9 -2 -9 -12z" fill="#e6ccb2" />
      <circle cx="-4" cy="-24" r="1.6" fill="#22223b" /><circle cx="4" cy="-24" r="1.6" fill="#22223b" /><circle cx="-3.4" cy="-24.6" r=".5" fill="#fff" />
      <path d="M-4 -16q4 4 8 0" stroke="#22223b" strokeWidth="1" fill="none" /><circle cx="-2" cy="-19" r=".6" fill="#22223b" /><circle cx="2" cy="-19" r=".6" fill="#22223b" />
      <path d="M12 -4q12 -10 6 -24" stroke="#7f5539" strokeWidth="5" fill="none" strokeLinecap="round" />
      <g transform="translate(16 -30) rotate(70)"><path d="M-12 0q12 -8 24 0q-12 4 -24 0z" fill="#ffd60a" stroke="#b08900" strokeWidth=".8" /><path d="M12 0l3 -1" stroke="#6b4f00" strokeWidth="1.4" /><path d="M-12 0l-2 -1" stroke="#6b4f00" strokeWidth="1.4" /></g>
      <path d="M-12 -2q-10 8 -12 18" stroke="#7f5539" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M-8 20q-2 8 -6 10M8 20q2 8 6 10" stroke="#7f5539" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M14 14q16 6 14 22q-2 6 -6 4" stroke="#7f5539" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
    <g fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"><path d="M88 52q4 4 0 8" /><path d="M92 48q8 8 0 16" /><path d="M96 44q12 12 0 24" /></g>
    <g transform="translate(26 132)"><path d="M-10 0q10 -6 20 0q-10 4 -20 0z" fill="#ffd60a" stroke="#b08900" strokeWidth=".8" transform="rotate(20)" /><path d="M2 0q10 -6 20 0q-10 4 -20 0z" fill="#ffd60a" stroke="#b08900" strokeWidth=".8" transform="rotate(-10)" /></g>
    <path d="M0 146Q60 138 120 146V160H0Z" fill="#22577a" />
  </Svg>],

  [227, 'บ้านต้นไม้ในพายุ', <Svg>
    <defs>
      <linearGradient id="k227s" x2="0" y2="1"><stop stopColor="#212529" /><stop offset=".6" stopColor="#343a40" /><stop offset="1" stopColor="#495057" /></linearGradient>
      <radialGradient id="k227w"><stop stopColor="#ffe066" /><stop offset="1" stopColor="#ffb703" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k227s)" />
    <Cl x={20} y={20} s={1.4} f="#6c757d" /><Cl x={80} y={14} s={1.6} f="#5a6169" /><Cl x={110} y={34} s={1} f="#6c757d" />
    <path d="M86 26l-8 18h6l-6 20 14 -24h-6l6 -14z" fill="#fff3b0" /><path d="M86 26l-8 18h6l-6 20 14 -24h-6l6 -14z" fill="#fff3b0" opacity=".3" transform="scale(1.06) translate(-5 -2)" />
    <g stroke="#adb5bd" strokeWidth=".8" opacity=".7">{Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${(i * 29) % 124} ${(i * 47) % 150 + 4} l-5 9`} />)}</g>
    <path d="M58 160q-4 -40 2 -70q-16 -14 -22 -34M62 92q16 -14 30 -32M60 120q-18 -4 -30 6" stroke="#3d2b1f" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M56 160q-2 -36 2 -66" stroke="#2b1d14" strokeWidth="10" fill="none" />
    <g fill="#2d6a4f"><path d="M14 66q20 -30 50 -24q-30 4 -50 24z" /><path d="M40 40q30 -24 60 -10q-32 -4 -60 10z" /><path d="M70 64q24 -14 44 -6q-24 0 -44 6z" /></g>
    <g fill="#40916c" opacity=".8"><path d="M24 54q14 -10 30 -8q-16 2 -30 8z" /><path d="M80 52q16 -6 30 0q-16 -2 -30 0z" /></g>
    <g transform="translate(60 84) rotate(-3)">
      <rect x="-22" y="-4" width="44" height="6" fill="#7f5539" stroke="#3d2b1f" strokeWidth="1" />
      <rect x="-18" y="-24" width="36" height="20" fill="#9c6644" stroke="#3d2b1f" strokeWidth="1" /><g stroke="#6f4518" strokeWidth=".6">{[-19, -14, -9].map(y => <path key={y} d={`M-18 ${y}h36`} />)}</g>
      <path d="M-22 -24l22 -14 22 14z" fill="#bc4749" stroke="#3d2b1f" strokeWidth="1" />
      <rect x="-12" y="-20" width="9" height="9" fill="url(#k227w)" stroke="#3d2b1f" strokeWidth=".8" /><path d="M-7.5 -20v9M-12 -15.5h9" stroke="#3d2b1f" strokeWidth=".6" />
      <circle cx="-8" cy="-15" r="12" fill="#ffd166" opacity=".15" />
      <rect x="4" y="-18" width="8" height="14" fill="#5a3d2b" /><circle cx="10" cy="-11" r=".8" fill="#ffd166" />
      <path d="M-16 2v24M16 2v22" stroke="#7f5539" strokeWidth="1.2" /><path d="M-16 8h4M-16 14h4M-16 20h4" stroke="#7f5539" strokeWidth="1" />
      <path d="M22 -2l8 -12" stroke="#adb5bd" strokeWidth=".8" /><path d="M30 -14l6 -2 -2 6z" fill="#e63946" />
    </g>
    <g transform="translate(52 66)"><circle r="2.2" fill="#f1c27d" /><path d="M-2 2h4v4h-4z" fill="#457b9d" /></g>
    <path d="M0 148Q60 140 120 148V160H0Z" fill="#1b4332" /><g fill="#6c757d" opacity=".5"><ellipse cx="30" cy="152" rx="10" ry="1.4" /><ellipse cx="92" cy="154" rx="12" ry="1.4" /></g>
  </Svg>],

  [228, 'ราชินีผึ้งกับมงกุฎน้ำผึ้ง', <Svg>
    <defs>
      <linearGradient id="k228s" x2="0" y2="1"><stop stopColor="#fff3b0" /><stop offset="1" stopColor="#ffb703" /></linearGradient>
      <linearGradient id="k228h" x2="0" y2="1"><stop stopColor="#ffd60a" /><stop offset="1" stopColor="#e85d04" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k228s)" />
    <g fill="none" stroke="#e9a23b" strokeWidth="1.2" opacity=".6">{Array.from({ length: 30 }, (_, i) => { const r = Math.floor(i / 6), c = i % 6; const x = c * 22 + (r % 2) * 11 - 6, y = r * 19 + 8; return <path key={i} d={`M${x} ${y}l6 -3.6 6 3.6v7l-6 3.6-6 -3.6z`} />; })}</g>
    <g transform="translate(60 92)">
      <path d="M-30 -20q-24 -20 -10 -30q12 -2 16 22zM30 -20q24 -20 10 -30q-12 -2 -16 22z" fill="#e0fbfc" stroke="#98c1d9" strokeWidth=".8" opacity=".85" />
      <path d="M-28 -6q-26 -4 -22 -18q10 -4 22 12zM28 -6q26 -4 22 -18q-10 -4 -22 12z" fill="#e0fbfc" stroke="#98c1d9" strokeWidth=".8" opacity=".75" />
      <ellipse cx="0" cy="16" rx="18" ry="26" fill="#ffb703" stroke="#5a3d00" strokeWidth="1.2" />
      <path d="M-17 6h34M-18 18h36M-15 30h30" stroke="#2b2d42" strokeWidth="6" /><path d="M0 42l-2 6 4 0z" fill="#2b2d42" />
      <circle cy="-16" r="14" fill="#ffd166" stroke="#5a3d00" strokeWidth="1.2" />
      <circle cx="-5" cy="-16" r="3.4" fill="#fff" /><circle cx="5" cy="-16" r="3.4" fill="#fff" /><circle cx="-4.4" cy="-15.4" r="1.8" fill="#2b2d42" /><circle cx="5.6" cy="-15.4" r="1.8" fill="#2b2d42" />
      <path d="M-4 -8q4 3 8 0" stroke="#5a3d00" strokeWidth="1" fill="none" /><circle cx="-9" cy="-10" r="2" fill="#ff8fab" opacity=".7" /><circle cx="9" cy="-10" r="2" fill="#ff8fab" opacity=".7" />
      <path d="M-6 -28q-6 -12 -2 -16M6 -28q6 -12 2 -16" stroke="#2b2d42" strokeWidth="1.2" fill="none" /><circle cx="-8" cy="-44" r="2" fill="#2b2d42" /><circle cx="8" cy="-44" r="2" fill="#2b2d42" />
      <path d="M-12 -28l2 -10 5 6 5 -10 5 10 5 -6 2 10z" fill="url(#k228h)" stroke="#9c6644" strokeWidth=".8" />
      <g fill="#e85d04"><path d="M-8 -28q0 6 -2 8q-2 -2 0 -8z" /><path d="M6 -28q0 5 2 7q2 -2 -1 -7z" /></g>
      <circle cy="-36" r="2" fill="#ef476f" /><circle cx="-8" cy="-32" r="1.2" fill="#06d6a0" /><circle cx="8" cy="-32" r="1.2" fill="#118ab2" />
      <path d="M-16 8l-10 6M16 8l12 -2" stroke="#2b2d42" strokeWidth="2" strokeLinecap="round" /><path d="M28 -2v-10" stroke="#9c6644" strokeWidth="1.6" /><circle cx="28" cy="-13" r="3" fill="#ffd60a" stroke="#9c6644" strokeWidth=".8" />
    </g>
    {[[18, 30, -20], [102, 40, 20], [20, 130, 10], [98, 140, -14]].map(([x, y, a], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${a}) scale(.6)`}><ellipse rx="8" ry="6" fill="#ffb703" stroke="#5a3d00" strokeWidth="1" /><path d="M-3 -6v12M3 -6v12" stroke="#2b2d42" strokeWidth="2.4" /><ellipse cx="0" cy="-8" rx="6" ry="4" fill="#e0fbfc" opacity=".8" /></g>)}
    <path d="M0 150Q60 140 120 150V160H0Z" fill="#e85d04" opacity=".8" /><g fill="#ffd60a"><path d="M30 146q2 6 0 10q-2 -4 0 -10z" /><path d="M86 144q2 6 0 10q-2 -4 0 -10z" /></g>
  </Svg>],

  [229, 'ชาวประมงตกได้รองเท้าบูท', <Svg>
    <defs>
      <linearGradient id="k229s" x2="0" y2="1"><stop stopColor="#caf0f8" /><stop offset="1" stopColor="#ade8f4" /></linearGradient>
      <linearGradient id="k229w" x2="0" y2="1"><stop stopColor="#48cae4" /><stop offset="1" stopColor="#0077b6" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k229s)" />
    <circle cx="96" cy="26" r="10" fill="#ffd166" /><Cl x={30} y={24} s={.8} /><Cl x={70} y={40} s={.6} o={.8} />
    <path d="M0 70l20 -16 18 10 22 -20 26 22 20 -10 14 10z" fill="#90a955" opacity=".7" />
    <rect y="74" width="120" height="86" fill="url(#k229w)" />
    <g stroke="#caf0f8" strokeWidth=".8" opacity=".7">{[[10, 86], [60, 92], [96, 84], [20, 112], [80, 118], [40, 140], [100, 146]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q5 -2 10 0`} fill="none" />)}</g>
    <g transform="translate(36 94)">
      <path d="M-26 0q26 12 52 0l-4 8q-22 6 -44 0z" fill="#e76f51" stroke="#6b2737" strokeWidth=".8" /><path d="M-24 2h48" stroke="#f4a261" strokeWidth="1" />
      <circle cx="0" cy="-16" r="6" fill="#e0ac69" /><path d="M-8 -18q8 -10 16 0z" fill="#e9c46a" /><path d="M-10 -18h20" stroke="#e9c46a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M-3 -12q3 3 6 0" stroke="#6b3e26" strokeWidth=".8" fill="none" /><path d="M-2 -10q2 4 4 0" fill="#f8f9fa" />
      <path d="M-6 -10h12l2 10h-16z" fill="#2a9d8f" /><path d="M5 -8l12 -4" stroke="#e0ac69" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M16 -12L44 -40" stroke="#6f4518" strokeWidth="1.4" />
    </g>
    <path d="M80 54Q92 70 90 96" stroke="#495057" strokeWidth=".5" fill="none" />
    <g transform="translate(90 98) rotate(14)">
      <path d="M-6 -14h10v16q6 0 8 6h-18z" fill="#2b2d42" stroke="#000" strokeWidth=".6" /><path d="M-6 -14h10" stroke="#495057" strokeWidth="2" />
      <path d="M-4 -10q2 4 0 8" stroke="#495057" strokeWidth=".6" fill="none" />
      <g fill="#48cae4"><path d="M8 8q2 4 0 6q-2 -2 0 -6z" /><path d="M-4 8q1 3 0 5q-1 -2 0 -5z" /></g>
      <path d="M0 -14q-6 -6 -2 -10" stroke="#52b788" strokeWidth="1.4" fill="none" /><path d="M2 -14q4 -8 8 -6" stroke="#52b788" strokeWidth="1.4" fill="none" />
      <g transform="translate(-2 -2)"><ellipse rx="3.4" ry="1.6" fill="#ffd166" /><path d="M3 0l2 -1.4v2.8z" fill="#f4a261" /></g>
    </g>
    <g fill="#caf0f8"><circle cx="86" cy="112" r="1.4" /><circle cx="94" cy="116" r="1" /><circle cx="82" cy="118" r=".8" /></g>
    <g transform="translate(20 132) scale(-1 1)"><ellipse rx="6" ry="2.6" fill="#ff9f1c" /><path d="M5 0l4-3v6z" fill="#ffbf69" /><circle cx="-3" cy="-.4" r=".6" fill="#000" /></g>
    <path d="M70 140q2 -6 6 -4" stroke="#2a9d8f" strokeWidth="1.4" fill="none" />
  </Svg>],

  [230, 'ห้องนั่งเล่นกลับหัว', <Svg>
    <defs>
      <linearGradient id="k230w" x2="0" y2="1"><stop stopColor="#a68a64" /><stop offset="1" stopColor="#ede0d4" /></linearGradient>
      <linearGradient id="k230p" x2="0" y2="1"><stop stopColor="#ffe8d6" /><stop offset="1" stopColor="#ddbea9" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k230p)" />
    <rect y="0" width="120" height="30" fill="url(#k230w)" /><g stroke="#7f5539" strokeWidth=".6">{[10, 20].map(y => <path key={y} d={`M0 ${y}h120`} />)}{[20, 50, 80, 110].map(x => <path key={x} d={`M${x} 0v10M${x - 15} 10v10M${x} 20v10`} />)}</g>
    <g transform="translate(60 30)"><rect x="-30" y="0" width="60" height="4" fill="#8d6346" /><rect x="-26" y="4" width="4" height="10" fill="#6f4518" /><rect x="22" y="4" width="4" height="10" fill="#6f4518" />
      <path d="M-34 14h68v14q0 4 -4 4h-60q-4 0 -4 -4z" fill="#457b9d" /><rect x="-34" y="14" width="68" height="6" fill="#1d3557" /><path d="M-30 32v-12h8v12M22 32v-12h8v12" fill="#1d3557" />
      <g fill="#e63946"><rect x="-26" y="20" width="10" height="9" rx="2" /></g><rect x="16" y="20" width="10" height="9" rx="2" fill="#ffd166" />
    </g>
    <g transform="translate(16 30)"><rect x="-2" y="0" width="4" height="20" fill="#6f4518" /><path d="M-8 20h16l-3 12h-10z" fill="#ffb703" /><circle cx="0" cy="36" r="6" fill="#ffd166" opacity=".4" /></g>
    <g transform="translate(100 30)"><rect x="-8" y="0" width="16" height="4" fill="#6f4518" /><path d="M-6 4h12l-2 12h-8z" fill="#bc6c25" /><path d="M0 16q-6 10 -2 18M0 16q6 8 4 18M0 16q0 10 0 20" stroke="#2d6a4f" strokeWidth="2" fill="none" /></g>
    <rect x="40" y="70" width="40" height="28" fill="#caf0f8" stroke="#6f4518" strokeWidth="2" /><path d="M60 70v28M40 84h40" stroke="#6f4518" strokeWidth="1.2" /><Cl x={52} y={90} s={.4} /><circle cx="70" cy="78" r="3" fill="#ffd166" />
    <g transform="translate(60 136)"><path d="M0 0v-10" stroke="#495057" strokeWidth="1" /><path d="M-10 -10h20l-4 -8h-12z" fill="#e9c46a" transform="rotate(180 0 -14)" /><circle cy="2" r="2" fill="#fff3b0" /></g>
    <rect y="140" width="120" height="20" fill="#cb997e" /><path d="M0 140h120" stroke="#9c6644" strokeWidth="1.4" />
    <g transform="translate(90 120)"><circle cy="-12" r="5" fill="#f1c27d" /><path d="M-5 -14q5 -6 10 0" fill="#3d405b" /><path d="M-4 -7h8l1 10h-10z" fill="#e76f51" /><path d="M-3 3l-1 8M3 3l1 8" stroke="#264653" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-4 -4q-6 -4 -6 2" stroke="#f1c27d" strokeWidth="1.6" fill="none" strokeLinecap="round" /><text x="-14" y="-18" fontSize="9" fontWeight="700" fill="#6d597a">?</text></g>
    <g transform="translate(26 132)"><ellipse rx="8" ry="5" fill="#e9c46a" /><circle cx="-7" cy="-3" r="4" fill="#e9c46a" /><path d="M-10 -6l-1 -3 3 1zM-5 -6l1 -3 -3 1z" fill="#e9c46a" /><circle cx="-8" cy="-3" r=".7" fill="#333" /><path d="M7 2q6 -2 4 -8" stroke="#e9c46a" strokeWidth="2" fill="none" /></g>
  </Svg>],

  [231, 'นักบัลเลต์บนกล่องดนตรี', <Svg>
    <defs>
      <linearGradient id="k231s" x2="0" y2="1"><stop stopColor="#3c1642" /><stop offset="1" stopColor="#7b2869" /></linearGradient>
      <linearGradient id="k231b" x2="0" y2="1"><stop stopColor="#f6bd60" /><stop offset="1" stopColor="#d4a373" /></linearGradient>
      <radialGradient id="k231l" cx=".5" cy=".1" r=".9"><stop stopColor="#fff3b0" stopOpacity=".7" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k231s)" />
    <path d="M60 0L20 120H100z" fill="url(#k231l)" />
    <St p={[10, 20, .8, 108, 30, .9, 20, 70, .6, 100, 80, .7]} f="#ffd6e0" />
    <g transform="translate(60 120)">
      <rect x="-34" y="0" width="68" height="28" rx="2" fill="url(#k231b)" stroke="#7f5539" strokeWidth="1.2" />
      <path d="M-34 6h68M-34 22h68" stroke="#bc6c25" strokeWidth="1" /><g fill="#bc6c25">{[-24, -8, 8, 24].map(x => <circle key={x} cx={x} cy="14" r="2" />)}</g>
      <path d="M-36 0l4 -10h64l4 10z" fill="#f4a261" stroke="#7f5539" strokeWidth="1.2" />
      <path d="M-34 -10L-30 -46h60l4 36" fill="#ffafcc" stroke="#7f5539" strokeWidth="1" opacity=".0" />
      <rect x="34" y="8" width="8" height="3" fill="#7f5539" /><circle cx="44" cy="9.5" r="3" fill="none" stroke="#7f5539" strokeWidth="1.4" />
      <ellipse cx="0" cy="-10" rx="10" ry="2.4" fill="#e9c46a" />
    </g>
    <g transform="translate(60 72)">
      <path d="M0 38v-14" stroke="#f1c27d" strokeWidth="2.2" strokeLinecap="round" /><path d="M0 24l14 -6" stroke="#f1c27d" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-14 12q14 -10 28 0q-14 6 -28 0z" fill="#ffc8dd" stroke="#f497b6" strokeWidth=".8" /><path d="M-12 12q12 -4 24 0" stroke="#fff" strokeWidth=".8" fill="none" />
      <path d="M-4 0h8l1 12h-10z" fill="#ffafcc" />
      <path d="M-4 2q-10 -10 -8 -22M4 2q10 -10 8 -22" stroke="#f1c27d" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cy="-8" r="5" fill="#f1c27d" /><path d="M-5 -10q5 -6 10 0" fill="#6b3e26" /><circle cy="-14" r="2.6" fill="#6b3e26" />
      <path d="M-2 -7q1 1 2 0M1 -7q1 1 2 0" stroke="#6b3e26" strokeWidth=".5" fill="none" />
    </g>
    <g fill="#ffd166"><ellipse cx="26" cy="60" rx="2.2" ry="1.6" /><path d="M28 60v-8l4 1" stroke="#ffd166" strokeWidth=".8" fill="none" /><ellipse cx="96" cy="50" rx="2" ry="1.5" /><path d="M98 50v-7" stroke="#ffd166" strokeWidth=".8" /><ellipse cx="90" cy="96" rx="1.8" ry="1.3" /><path d="M91.8 96v-6l3 1" stroke="#ffd166" strokeWidth=".7" fill="none" /></g>
    <Star x={30} y={30} s={.7} f="#ffd6e0" /><Star x={86} y={20} s={.5} f="#ffd6e0" />
  </Svg>],

  [232, 'ดาวตกลงในบ่อน้ำ', <Svg>
    <defs>
      <linearGradient id="k232s" x2="0" y2="1"><stop stopColor="#0b132b" /><stop offset=".7" stopColor="#1c2541" /><stop offset="1" stopColor="#3a506b" /></linearGradient>
      <radialGradient id="k232g"><stop stopColor="#fff9c4" /><stop offset=".4" stopColor="#ffd60a" stopOpacity=".7" /><stop offset="1" stopColor="#ffd60a" stopOpacity="0" /></radialGradient>
      <linearGradient id="k232t" x2="1" y2="1"><stop stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff3b0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k232s)" />
    <St p={[10, 14, 1, 28, 30, .7, 46, 10, .6, 90, 16, .9, 108, 40, .7, 70, 30, .5, 16, 56, .6]} />
    <path d="M100 6L66 84" stroke="url(#k232t)" strokeWidth="3" strokeLinecap="round" />
    <path d="M0 110Q60 100 120 110V160H0Z" fill="#1b4332" /><path d="M0 124Q60 116 120 126V160H0Z" fill="#081c15" />
    <g transform="translate(60 112)">
      <ellipse cx="0" cy="0" rx="26" ry="8" fill="#6c757d" stroke="#343a40" strokeWidth="1.2" />
      <path d="M-26 0v18q26 10 52 0V0" fill="#868e96" stroke="#343a40" strokeWidth="1.2" />
      <g stroke="#495057" strokeWidth=".8">{[-18, -8, 2, 12, 22].map(x => <path key={x} d={`M${x} 4v14`} />)}<path d="M-26 9q26 8 52 0" fill="none" /></g>
      <ellipse cx="0" cy="0" rx="22" ry="6" fill="#0b132b" /><ellipse cx="0" cy="0" rx="20" ry="5" fill="url(#k232g)" />
      <path d="M-24 0V-34M24 0V-34" stroke="#6f4518" strokeWidth="3" /><path d="M-28 -36h56l-4 -8h-48z" fill="#9c6644" stroke="#3d2b1f" strokeWidth=".8" />
      <path d="M0 -34v24" stroke="#adb5bd" strokeWidth=".7" /><path d="M-4 -12h8l-1 6h-6z" fill="#7f5539" />
    </g>
    <circle cx="60" cy="108" r="30" fill="url(#k232g)" opacity=".6" />
    <Star x={60} y={106} s={.9} f="#fff9c4" />
    <g fill="#ffe066">{[[50, 100], [70, 98], [56, 94], [66, 104]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
    <g transform="translate(24 128)"><circle cy="-10" r="4" fill="#f1c27d" /><path d="M-4 -12q4 -5 8 0" fill="#3d405b" /><path d="M-3 -6h6l1 8h-8z" fill="#e76f51" /><path d="M3 -4l8 -8" stroke="#f1c27d" strokeWidth="1.6" strokeLinecap="round" /><path d="M-2 2l-1 6M2 2l1 6" stroke="#22223b" strokeWidth="1.8" strokeLinecap="round" /></g>
    <g fill="#52b788"><path d="M96 124q-2 -10 2 -14q0 8 0 14z" /><path d="M100 124q4 -8 2 -14q-2 8 -2 14z" /></g>
  </Svg>],
];
