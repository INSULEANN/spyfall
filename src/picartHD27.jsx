// ภาพการ์ดแบบละเอียด ชุด 27 (ภาพใหม่ 201–208) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD27 = [
  [201, 'ห้องสมุดใต้น้ำ', <Svg>
    <defs>
      <linearGradient id="k201s" x2="0" y2="1"><stop stopColor="#4cc9f0" /><stop offset=".5" stopColor="#1d6fa5" /><stop offset="1" stopColor="#0b2545" /></linearGradient>
      <linearGradient id="k201r" x2="0" y2="1"><stop stopColor="#fff" stopOpacity=".35" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <linearGradient id="k201w" x2="1"><stop stopColor="#6b3f1d" /><stop offset=".5" stopColor="#8b5a2b" /><stop offset="1" stopColor="#5a3416" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k201s)" />
    <path d="M20 0L34 160H40L28 0zM70 0L76 160H84L80 0zM100 0L98 160H104L108 0z" fill="url(#k201r)" />
    <rect x="10" y="40" width="44" height="100" fill="url(#k201w)" stroke="#3b2210" strokeWidth="1.4" />
    <rect x="66" y="52" width="44" height="88" fill="url(#k201w)" stroke="#3b2210" strokeWidth="1.4" />
    {[60, 80, 100, 120].map(y => <rect key={y} x="10" y={y} width="44" height="2.4" fill="#3b2210" />)}
    {[72, 92, 112].map(y => <rect key={y} x="66" y={y} width="44" height="2.4" fill="#3b2210" />)}
    {[[12, 44, '#e63946'], [17, 46, '#ffb703'], [22, 43, '#2a9d8f'], [27, 47, '#8338ec'], [32, 44, '#f4a261'], [38, 45, '#06d6a0'], [44, 43, '#ef476f'], [12, 64, '#3a86ff'], [18, 66, '#fb5607'], [24, 63, '#ffbe0b'], [31, 65, '#8ac926'], [40, 64, '#ff006e'], [12, 84, '#ffd166'], [19, 86, '#118ab2'], [27, 83, '#ef476f'], [36, 85, '#06d6a0'], [44, 84, '#9b5de5'], [12, 104, '#e76f51'], [20, 106, '#264653'], [30, 103, '#f72585'], [40, 105, '#4cc9f0'], [68, 56, '#f72585'], [74, 58, '#ffd60a'], [80, 55, '#3a86ff'], [88, 57, '#80ed99'], [96, 56, '#ff9f1c'], [103, 58, '#c77dff'], [68, 76, '#2ec4b6'], [76, 78, '#e71d36'], [85, 75, '#ffbf69'], [94, 77, '#5e60ce'], [70, 96, '#ff595e'], [79, 98, '#1982c4'], [89, 95, '#ffca3a'], [99, 97, '#6a4c93']].map(([x, y, c], i) => <rect key={i} x={x} y={y} width={i % 3 ? 4.6 : 5.4} height={60 - y % 20 > 46 ? 15 : 14} fill={c} stroke="#00000055" strokeWidth=".4" />)}
    <g transform="rotate(-24 50 108)"><rect x="40" y="104" width="8" height="15" fill="#ff006e" /><rect x="40" y="104" width="8" height="2" fill="#ffd6e8" /></g>
    <g transform="translate(86 32)"><ellipse rx="10" ry="5" fill="#ffb703" /><path d="M9 0l7-5v10z" fill="#fb8500" /><circle cx="-5" cy="-1" r="1.2" fill="#023047" /><path d="M-2 -4q3 4 0 8" stroke="#fb8500" strokeWidth=".8" fill="none" /></g>
    <g transform="translate(30 24) scale(-.7 .7)"><ellipse rx="10" ry="5" fill="#90e0ef" /><path d="M9 0l7-5v10z" fill="#48cae4" /><circle cx="-5" cy="-1" r="1.2" fill="#023047" /></g>
    <St p={[60, 30, 1.6, 64, 22, 1.1, 58, 16, .8, 96, 46, 1.3, 99, 40, .9, 22, 140, 1.2]} f="#caf0f8" />
    <path d="M0 144Q30 138 60 145T120 142V160H0Z" fill="#e9c46a" /><path d="M0 150Q40 146 80 151T120 149V160H0Z" fill="#d4a373" />
    <g fill="#2d6a4f"><path d="M58 146q-4-14 2-26q-2 14 1 26z" /><path d="M62 146q6-12 2-22q4 10-1 22z" /><path d="M112 146q-3-10 2-18q-1 10 0 18z" /></g>
    <g transform="translate(58 132)"><rect x="-8" y="0" width="16" height="10" rx="1" fill="#f1faee" stroke="#457b9d" strokeWidth=".8" /><path d="M0 0v10M-6 3h4M-6 6h4M2 3h4M2 6h4" stroke="#457b9d" strokeWidth=".5" /></g>
  </Svg>],

  [202, 'นักดนตรีเล่นไวโอลินให้ดวงดาว', <Svg>
    <defs>
      <linearGradient id="k202s" x2="0" y2="1"><stop stopColor="#03045e" /><stop offset=".6" stopColor="#3a0ca3" /><stop offset="1" stopColor="#7209b7" /></linearGradient>
      <radialGradient id="k202m" cx=".4" cy=".4"><stop stopColor="#fffbe6" /><stop offset="1" stopColor="#ffd166" /></radialGradient>
      <linearGradient id="k202v" x2="1" y2="1"><stop stopColor="#c8742c" /><stop offset="1" stopColor="#7f3b08" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k202s)" />
    <St p={[10, 12, 1.2, 30, 30, .8, 50, 10, 1, 70, 26, .7, 100, 14, 1.3, 112, 40, .8, 18, 56, .9, 92, 60, .7, 60, 46, .6, 40, 70, .8]} />
    <circle cx="94" cy="34" r="14" fill="url(#k202m)" /><circle cx="90" cy="30" r="2.4" fill="#f4c95d" /><circle cx="98" cy="40" r="1.6" fill="#f4c95d" />
    <g fill="#ffd60a">{[[30, 40, 'M0-5l1.5 3.5 3.5.5-2.5 2.5.6 3.5-3.1-1.6-3.1 1.6.6-3.5-2.5-2.5 3.5-.5z'], [58, 56, 'M0-4l1.2 2.8 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4z'], [80, 70, 'M0-4l1.2 2.8 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4z']].map(([x, y, d], i) => <path key={i} d={d} transform={`translate(${x} ${y})`} />)}</g>
    <g fill="none" stroke="#ffd166" strokeWidth="1.1" strokeLinecap="round" opacity=".9"><path d="M64 96q8-10 2-18q10-4 8-14" /><path d="M70 100q14-6 12-20" /></g>
    <g fill="#ffd166"><ellipse cx="66" cy="78" rx="2.4" ry="1.8" /><path d="M68.2 78V70" stroke="#ffd166" strokeWidth=".8" /><ellipse cx="82" cy="80" rx="2.2" ry="1.7" /><path d="M84 80v-7l3 1" stroke="#ffd166" strokeWidth=".8" fill="none" /></g>
    <path d="M0 140Q30 120 60 132T120 128V160H0Z" fill="#240046" /><path d="M0 150Q40 136 80 146T120 142V160H0Z" fill="#10002b" />
    <path d="M20 132L22 108h8l2 24z" fill="#3c096c" /><rect x="18" y="104" width="16" height="5" fill="#5a189a" />
    <g transform="translate(46 112)">
      <path d="M-8 30L-6 8h12l2 22z" fill="#14213d" /><path d="M-8 30h16" stroke="#000" strokeWidth="1" />
      <path d="M-6 30l-1 10M6 30l1 10" stroke="#14213d" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M-7 8Q0 4 7 8L9 -6H-9z" fill="#e63946" /><path d="M0 4v-9" stroke="#9d0208" strokeWidth=".8" />
      <circle cy="-13" r="7" fill="#f1c27d" /><path d="M-7 -15q7-10 14 0q-3-4-7-4t-7 4z" fill="#2b2d42" /><path d="M-3 -12q1 1 2 0M2 -12q1 1 2 0" stroke="#2b2d42" strokeWidth=".7" fill="none" />
      <g transform="translate(6 -8) rotate(-38)"><path d="M0 0q-3 3 0 6q-3 3 0 7q4 2 8 0q3-4 0-7q3-3 0-6q-4-2-8 0z" fill="url(#k202v)" /><rect x="3" y="-14" width="2" height="15" fill="#3d2b1f" /><path d="M2.5 -15h3l-.5 2h-2z" fill="#3d2b1f" /></g>
      <path d="M-6 -2L22 -26" stroke="#e9d8a6" strokeWidth="1" /><path d="M-6 -2l2-2" stroke="#7f5539" strokeWidth="2" />
      <path d="M-7 4l-6 -4M7 4l6-8" stroke="#e63946" strokeWidth="3" strokeLinecap="round" />
    </g>
    <circle cx="26" cy="100" r="3" fill="#ffd166" opacity=".9" /><circle cx="26" cy="100" r="8" fill="#ffd166" opacity=".2" />
  </Svg>],

  [203, 'รถไฟวิ่งบนรางสายรุ้ง', <Svg>
    <defs>
      <linearGradient id="k203s" x2="0" y2="1"><stop stopColor="#bde0fe" /><stop offset="1" stopColor="#ffafcc" /></linearGradient>
      <linearGradient id="k203t" x2="0" y2="1"><stop stopColor="#e63946" /><stop offset="1" stopColor="#9d0208" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k203s)" />
    <Cl x={18} y={30} /><Cl x={96} y={22} s={.9} /><Cl x={60} y={140} s={1.6} o={.9} /><Cl x={10} y={146} s={1.3} /><Cl x={110} y={142} s={1.4} />
    {['#ff595e', '#ff924c', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'].map((c, i) => <path key={c} d={`M-10 ${150 - i * 0} Q60 ${30 + i * 7} 130 ${120 + i * 0}`} stroke={c} strokeWidth="6" fill="none" transform={`translate(0 ${i * 5.4})`} />)}
    <path d="M-10 150Q60 30 130 120" stroke="#5a5a5a" strokeWidth="1.2" fill="none" transform="translate(0 -3.4)" />
    <g transform="translate(58 58) rotate(-4)">
      <rect x="-30" y="-6" width="18" height="11" rx="2" fill="#2a9d8f" stroke="#1d3557" strokeWidth="1" /><rect x="-27" y="-3" width="5" height="4" fill="#caf0f8" /><rect x="-20" y="-3" width="5" height="4" fill="#caf0f8" />
      <rect x="-10" y="-6" width="18" height="11" rx="2" fill="#ffb703" stroke="#1d3557" strokeWidth="1" /><rect x="-7" y="-3" width="5" height="4" fill="#caf0f8" /><rect x="0" y="-3" width="5" height="4" fill="#caf0f8" />
      <rect x="10" y="-10" width="22" height="15" rx="2" fill="url(#k203t)" stroke="#1d3557" strokeWidth="1" /><rect x="22" y="-16" width="8" height="8" fill="#9d0208" stroke="#1d3557" strokeWidth="1" /><rect x="14" y="-6" width="6" height="5" fill="#caf0f8" />
      <path d="M32 -2l6 6h-6z" fill="#1d3557" /><rect x="12" y="-18" width="5" height="8" fill="#1d3557" />
      {[-26, -16, -6, 4, 14, 26].map(x => <circle key={x} cx={x} cy="6" r="2.6" fill="#1d3557" stroke="#adb5bd" strokeWidth=".8" />)}
      <path d="M-12 0h2M8 0h2" stroke="#1d3557" strokeWidth="1.2" />
    </g>
    <g fill="#fff" opacity=".95"><circle cx="70" cy="34" r="4" /><circle cx="76" cy="28" r="5" /><circle cx="84" cy="22" r="6.4" /><circle cx="94" cy="16" r="7.6" /></g>
    <g fill="#ffd60a"><path d="M24 70l1.4 3 3 .4-2.2 2.1.5 3-2.7-1.4-2.7 1.4.5-3-2.2-2.1 3-.4z" /><path d="M104 66l1 2.2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z" /></g>
    <g fill="#fff"><circle cx="34" cy="90" r="1.2" /><circle cx="92" cy="96" r="1" /><circle cx="52" cy="112" r="1.4" /></g>
  </Svg>],

  [204, 'แมวขี่ไม้กวาดผ่านพระจันทร์', <Svg>
    <defs>
      <linearGradient id="k204s" x2="0" y2="1"><stop stopColor="#1b1035" /><stop offset=".7" stopColor="#4a1f5c" /><stop offset="1" stopColor="#c05a33" /></linearGradient>
      <radialGradient id="k204m" cx=".45" cy=".45"><stop stopColor="#fff8dc" /><stop offset=".8" stopColor="#ffe08a" /><stop offset="1" stopColor="#f4b942" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k204s)" />
    <St p={[8, 14, 1, 24, 40, .7, 40, 10, .9, 108, 18, 1.1, 112, 70, .7, 14, 80, .8, 96, 96, .6]} />
    <circle cx="62" cy="62" r="40" fill="#ffe08a" opacity=".12" /><circle cx="62" cy="62" r="32" fill="url(#k204m)" />
    <g fill="#f4c95d" opacity=".7"><circle cx="50" cy="50" r="5" /><circle cx="74" cy="72" r="7" /><circle cx="70" cy="46" r="3" /><circle cx="48" cy="78" r="3.4" /></g>
    <g transform="translate(60 64) rotate(-14)" fill="#14080e">
      <path d="M-38 6L36 -2l1 2.4L-37 8.6z" />
      <path d="M-38 6q-10 -4 -16 -2q6 2 2 4q-8 0 -12 4q8 0 10 2q-8 2 -10 6q10 -4 18 -6q6 2 8 0z" />
      <path d="M-8 4q-2-12 8-14q10 0 12 10q-2 4-6 4h-12z" />
      <circle cx="12" cy="-10" r="7" /><path d="M7 -15l-2 -7 6 4zM16 -16l2 -7 2 8z" />
      <path d="M-8 2q-14 -4 -16 -18q6 10 16 12" />
      <path d="M2 4l-2 7M8 4l3 6" stroke="#14080e" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M17 -12l6-1" stroke="#14080e" strokeWidth=".6" />
    </g>
    <circle cx="74" cy="51" r="1.1" fill="#ffd60a" />
    <path d="M0 136Q20 124 40 132T80 128T120 132V160H0Z" fill="#1f0f1e" />
    <g fill="#1f0f1e"><path d="M12 134V110l8-10 8 10v24z" /><path d="M18 100l2-8 2 8z" /><path d="M86 132V116h22v16z" /><path d="M84 117l13-10 13 10z" /></g>
    <g fill="#ffb347"><rect x="17" y="114" width="5" height="6" /><rect x="92" y="120" width="4" height="5" /><rect x="100" y="120" width="4" height="5" opacity=".6" /></g>
    <g fill="#ff8c42"><path d="M44 146q-4-8 4-10q8 2 4 10z" /><path d="M48 136l1-3" stroke="#386641" strokeWidth="1.2" /></g>
    <path d="M40 140l3 2 3-2M45 143l2 1 2-1" stroke="#14080e" strokeWidth=".6" fill="none" />
    <g stroke="#ffd166" strokeWidth=".7" opacity=".7"><path d="M20 70l-6 2M24 76l-7 4M18 64l-5-1" /></g>
  </Svg>],

  [205, 'ต้นไม้ที่มีโคมไฟเป็นผล', <Svg>
    <defs>
      <linearGradient id="k205s" x2="0" y2="1"><stop stopColor="#0f172a" /><stop offset=".7" stopColor="#1e3a5f" /><stop offset="1" stopColor="#2d4a3e" /></linearGradient>
      <radialGradient id="k205l"><stop stopColor="#fff3b0" /><stop offset=".5" stopColor="#ffb703" stopOpacity=".7" /><stop offset="1" stopColor="#ffb703" stopOpacity="0" /></radialGradient>
      <linearGradient id="k205t" x2="1"><stop stopColor="#3b2a1a" /><stop offset=".5" stopColor="#5c4033" /><stop offset="1" stopColor="#2e1f12" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k205s)" />
    <St p={[10, 10, .8, 30, 20, 1, 96, 12, .9, 110, 30, .7, 70, 8, .6]} />
    <path d="M54 150q-2-30 2-50q-14-8-24-24M58 100q10-14 30-20M56 120q-16-6-26-2M60 112q14-2 24 6M56 86q-4-18 2-34M58 72q12-10 14-26M48 70q-12-8-18-22" stroke="url(#k205t)" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M52 150q-1-28 3-50" stroke="#2e1f12" strokeWidth="8" fill="none" />
    {[[32, 76], [88, 80], [30, 118], [84, 118], [58, 52], [72, 46], [30, 48], [44, 92], [70, 96], [100, 64], [18, 96]].map(([x, y], i) => <g key={i}>
      <circle cx={x} cy={y + 6} r="11" fill="url(#k205l)" />
      <path d={`M${x} ${y - 4}v4`} stroke="#3b2a1a" strokeWidth=".8" />
      <path d={`M${x - 4} ${y}h8l-1 2h-6z`} fill={['#e63946', '#ffb703', '#e76f51', '#f72585'][i % 4]} />
      <path d={`M${x - 3.6} ${y + 2}q-1 5 0 9h7.2q1-4 0-9z`} fill={['#ff8fa3', '#ffe066', '#f4a261', '#ff99c8'][i % 4]} />
      <path d={`M${x - 3} ${y + 11}h6l-1 2h-4z`} fill={['#e63946', '#ffb703', '#e76f51', '#f72585'][i % 4]} />
      <path d={`M${x} ${y + 13}v3`} stroke="#ffd166" strokeWidth=".6" />
    </g>)}
    <path d="M0 146Q30 140 60 148T120 144V160H0Z" fill="#1b4332" /><path d="M0 152Q40 148 80 154T120 152V160H0Z" fill="#081c15" />
    <g transform="translate(90 140)"><circle cy="-10" r="4" fill="#f1c27d" /><path d="M-4 -12q4-6 8 0" fill="#3d405b" /><path d="M-4 -6h8l1 10h-10z" fill="#457b9d" /><path d="M-3 4l-1 6M3 4l1 6" stroke="#1d3557" strokeWidth="2" strokeLinecap="round" /><path d="M4 -4l6-8" stroke="#f1c27d" strokeWidth="1.8" strokeLinecap="round" /></g>
    <g fill="#fff3b0"><circle cx="40" cy="136" r=".9" /><circle cx="76" cy="132" r=".8" /><circle cx="22" cy="132" r=".7" /></g>
  </Svg>],

  [206, 'กระต่ายทำขนมในครัวจิ๋ว', <Svg>
    <defs>
      <linearGradient id="k206w" x2="0" y2="1"><stop stopColor="#fff1e6" /><stop offset="1" stopColor="#fde2e4" /></linearGradient>
      <linearGradient id="k206f" x2="0" y2="1"><stop stopColor="#cdb4db" /><stop offset="1" stopColor="#a2789c" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k206w)" />
    <g fill="#f8edeb">{Array.from({ length: 6 }, (_, i) => <rect key={i} x={i * 20} y="0" width="10" height="96" opacity=".7" />)}</g>
    <rect x="0" y="96" width="120" height="64" fill="url(#k206f)" /><g stroke="#8e6c8a" strokeWidth=".6">{[106, 118, 130, 142, 154].map(y => <path key={y} d={`M0 ${y}H120`} />)}</g>
    <rect x="8" y="22" width="44" height="30" rx="3" fill="#bde0fe" stroke="#6d597a" strokeWidth="1.4" /><path d="M30 22v30M8 37h44" stroke="#6d597a" strokeWidth="1" /><Cl x={22} y={32} s={.4} /><circle cx="44" cy="28" r="3" fill="#ffd166" />
    <rect x="64" y="30" width="48" height="4" fill="#9d8189" />{[['#ef476f', 68], ['#ffd166', 78], ['#06d6a0', 88], ['#118ab2', 98]].map(([c, x]) => <g key={x}><rect x={x} y="20" width="7" height="10" rx="1.5" fill={c} /><rect x={x} y="18" width="7" height="3" rx="1" fill="#6d597a" /></g>)}
    <rect x="6" y="88" width="108" height="10" rx="2" fill="#e5989b" stroke="#b5838d" strokeWidth="1" />
    <g transform="translate(62 70)">
      <ellipse cx="0" cy="18" rx="16" ry="4" fill="#b5838d" opacity=".5" />
      <path d="M-12 18q-2-22 12-24q14 2 12 24z" fill="#f8f9fa" stroke="#adb5bd" strokeWidth=".8" />
      <path d="M-10 12h20v6h-20z" fill="#ffafcc" /><path d="M-10 12q10 4 20 0" fill="none" stroke="#ff8fab" strokeWidth=".8" />
      <circle cy="-14" r="9" fill="#f8f9fa" stroke="#adb5bd" strokeWidth=".8" />
      <path d="M-5 -22q-4-16 2-18q4 6 1 18z" fill="#f8f9fa" stroke="#adb5bd" strokeWidth=".8" /><path d="M5 -22q4-16-2-18q-4 6-1 18z" fill="#f8f9fa" stroke="#adb5bd" strokeWidth=".8" />
      <path d="M-3.4 -24q-2-10 1-13M3.4 -24q2-10-1-13" stroke="#ffc8dd" strokeWidth="1.6" fill="none" />
      <circle cx="-3" cy="-15" r="1.2" fill="#22223b" /><circle cx="3" cy="-15" r="1.2" fill="#22223b" /><path d="M0 -12l-1 1h2z" fill="#ff8fab" /><circle cx="-6" cy="-11" r="1.6" fill="#ffc8dd" /><circle cx="6" cy="-11" r="1.6" fill="#ffc8dd" />
      <path d="M-7 -21h14l-1-4q-6-3-12 0z" fill="#fff" stroke="#adb5bd" strokeWidth=".6" />
      <path d="M-11 2l-8 6M11 2l7 4" stroke="#f8f9fa" strokeWidth="3.4" strokeLinecap="round" />
    </g>
    <g transform="translate(36 80)"><ellipse rx="12" ry="4" fill="#cdb4db" stroke="#6d597a" strokeWidth=".8" /><path d="M-12 0q12 12 24 0" fill="#e0aaff" stroke="#6d597a" strokeWidth=".8" /><path d="M2 -2l10 -14" stroke="#b08968" strokeWidth="2" strokeLinecap="round" /><circle cx="-3" cy="-1" r="2" fill="#fff" /></g>
    <g transform="translate(90 80)"><rect x="-10" y="-2" width="20" height="6" rx="2" fill="#a68a64" /><g fill="#ffe8d6" stroke="#cb997e" strokeWidth=".6">{[-6, 0, 6].map(x => <circle key={x} cx={x} cy="-5" r="3" />)}</g><g fill="#7f5539">{[-6, 0, 6].map(x => <circle key={x} cx={x + .6} cy="-5.6" r=".5" />)}</g></g>
    <g fill="#fff" opacity=".8"><circle cx="30" cy="70" r="1.4" /><circle cx="26" cy="64" r="1" /><circle cx="84" cy="66" r="1.2" /></g>
    <path d="M86 70q-2-6 2-10q-2 6 2 8" stroke="#adb5bd" strokeWidth=".8" fill="none" opacity=".7" />
    <rect x="10" y="98" width="30" height="44" fill="#d8a7b1" stroke="#b5838d" strokeWidth="1" /><circle cx="35" cy="120" r="1.4" fill="#6d597a" /><rect x="80" y="98" width="30" height="44" fill="#d8a7b1" stroke="#b5838d" strokeWidth="1" /><circle cx="85" cy="120" r="1.4" fill="#6d597a" />
  </Svg>],

  [207, 'เมืองบนหลังวาฬ', <Svg>
    <defs>
      <linearGradient id="k207s" x2="0" y2="1"><stop stopColor="#ffcdb2" /><stop offset=".5" stopColor="#e5989b" /><stop offset="1" stopColor="#6d6875" /></linearGradient>
      <linearGradient id="k207w" x2="0" y2="1"><stop stopColor="#577590" /><stop offset="1" stopColor="#264653" /></linearGradient>
      <linearGradient id="k207o" x2="0" y2="1"><stop stopColor="#4d908e" /><stop offset="1" stopColor="#1d3557" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k207s)" />
    <circle cx="92" cy="40" r="12" fill="#fff3b0" opacity=".9" /><Cl x={24} y={28} s={.9} o={.85} /><Cl x={70} y={18} s={.6} o={.7} />
    <rect y="104" width="120" height="56" fill="url(#k207o)" />
    <g stroke="#a8dadc" strokeWidth=".8" opacity=".6">{[112, 124, 138, 150].map((y, i) => <path key={y} d={`M${i * 8} ${y}q6-2 12 0t12 0`} />)}</g>
    <path d="M8 106Q14 80 56 78Q98 78 110 98q6 8 2 10q-10 6-30 6H20Q8 112 8 106z" fill="url(#k207w)" />
    <path d="M10 108q40 10 100-2q-4 8-30 8H20q-8 0-10-6z" fill="#dee2e6" />
    <g stroke="#94a3b8" strokeWidth=".6">{[30, 40, 50, 60, 70, 80, 90].map(x => <path key={x} d={`M${x} 110v4`} />)}</g>
    <circle cx="96" cy="98" r="2" fill="#0b090a" /><circle cx="96.6" cy="97.4" r=".6" fill="#fff" />
    <path d="M12 104q-12-12-6-22q2 8 8 12q-2-14 6-20q-2 12 2 20z" fill="url(#k207w)" />
    <g>
      <rect x="28" y="62" width="10" height="18" fill="#f4a261" /><path d="M27 63l6-6 6 6z" fill="#e76f51" />
      <rect x="40" y="54" width="12" height="26" fill="#e9c46a" /><path d="M39 55l7-8 7 8z" fill="#264653" />
      <rect x="54" y="48" width="8" height="32" fill="#f1faee" /><path d="M53 49l5-12 5 12z" fill="#e63946" /><rect x="56" y="58" width="4" height="4" fill="#ffb703" />
      <rect x="64" y="60" width="14" height="20" fill="#a8dadc" /><path d="M63 61l8-6 8 6z" fill="#457b9d" />
      <rect x="80" y="66" width="10" height="14" fill="#ffafcc" /><path d="M79 67l6-5 6 5z" fill="#cdb4db" />
      {[[31, 66], [31, 72], [43, 60], [47, 60], [43, 68], [47, 68], [67, 64], [72, 64], [67, 71], [72, 71], [83, 70]].map(([x, y], i) => <rect key={i} x={x} y={y} width="2.6" height="3" fill="#fff3b0" />)}
      <path d="M90 64q4-10 0-18" stroke="#2d6a4f" strokeWidth="1.4" fill="none" /><circle cx="90" cy="46" r="5" fill="#40916c" /><circle cx="94" cy="50" r="4" fill="#52b788" />
    </g>
    <path d="M46 46q4-10 0-20q6 8 4 18" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".7" /><g fill="#fff" opacity=".8"><circle cx="48" cy="24" r="2" /><circle cx="44" cy="20" r="1.4" /></g>
    <g fill="#fff" opacity=".9"><path d="M18 46q2-2 4 0q2-2 4 0" stroke="#3d405b" strokeWidth=".7" fill="none" /><path d="M100 60q2-2 4 0q2-2 4 0" stroke="#3d405b" strokeWidth=".7" fill="none" /></g>
  </Svg>],

  [208, 'นักประดาน้ำเจอหีบในซากเรือ', <Svg>
    <defs>
      <linearGradient id="k208s" x2="0" y2="1"><stop stopColor="#0096c7" /><stop offset=".55" stopColor="#023e8a" /><stop offset="1" stopColor="#03045e" /></linearGradient>
      <radialGradient id="k208g" cx=".5" cy=".5"><stop stopColor="#ffd60a" stopOpacity=".9" /><stop offset="1" stopColor="#ffd60a" stopOpacity="0" /></radialGradient>
      <linearGradient id="k208r" x2="0" y2="1"><stop stopColor="#fff" stopOpacity=".25" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k208s)" />
    <path d="M10 0l20 110h6L22 0zM60 0l8 120h6L70 0zM96 0l-6 100h6l8-100z" fill="url(#k208r)" />
    <g transform="translate(20 92) rotate(-12)"><path d="M0 0h78l-10 22H8z" fill="#5c3d2e" stroke="#2b1a10" strokeWidth="1.2" /><g stroke="#2b1a10" strokeWidth=".7">{[16, 30, 44, 58].map(x => <path key={x} d={`M${x} 0l-2 22`} />)}</g><path d="M40 0V-46" stroke="#4a3020" strokeWidth="3" /><path d="M40 -42l18 10-18 8z" fill="#ced4da" opacity=".6" /><path d="M24 4h10v8H24z" fill="#1b263b" /></g>
    <path d="M0 140Q30 132 60 140T120 136V160H0Z" fill="#c9a66b" /><path d="M0 148Q40 142 80 150T120 146V160H0Z" fill="#a98467" />
    <g fill="#e76f51"><path d="M8 140q-2-12 2-18q2 8 0 18z" /><path d="M12 140q4-10 2-16q-4 8-2 16z" /></g><g fill="#2a9d8f"><path d="M104 138q-4-16 2-24q0 12 0 24z" /><path d="M108 138q4-14 0-22q-2 12 0 22z" /></g>
    <circle cx="70" cy="128" r="22" fill="url(#k208g)" />
    <g transform="translate(70 130)"><rect x="-12" y="-6" width="24" height="12" rx="1.5" fill="#7f5539" stroke="#3d2b1f" strokeWidth="1" /><path d="M-13 -6q13-10 26 0" fill="#9c6644" stroke="#3d2b1f" strokeWidth="1" transform="rotate(-14 -12 -6)" /><g fill="#ffd60a">{[-6, -1, 4, 8].map((x, i) => <circle key={x} cx={x} cy={-8 - i % 2 * 2} r="2" />)}</g><path d="M-12 0h24" stroke="#ffd166" strokeWidth="1.2" /><rect x="-2" y="-2" width="4" height="4" fill="#ffd166" /></g>
    <g transform="translate(36 112) rotate(14)">
      <path d="M-14 -6q-6 -10 2 -16l14 2q4 8 -2 14z" fill="#ffb703" stroke="#9c6644" strokeWidth=".8" />
      <circle cx="8" cy="-10" r="8" fill="#e9ecef" stroke="#6c757d" strokeWidth="1.2" /><circle cx="8" cy="-10" r="5.4" fill="#90e0ef" stroke="#495057" strokeWidth="1" /><path d="M6 -12q2-2 4-1" stroke="#fff" strokeWidth=".8" fill="none" />
      <path d="M-10 -2l-14 4M-6 2l-12 10" stroke="#264653" strokeWidth="4" strokeLinecap="round" /><path d="M-26 4l-6 -2 2 6zM-20 14l-6 4 6 2z" fill="#ffd166" />
      <path d="M2 -2l12 4" stroke="#264653" strokeWidth="3.4" strokeLinecap="round" /><circle cx="15" cy="3" r="2.4" fill="#ffe066" opacity=".9" />
    </g>
    <g fill="#caf0f8" opacity=".85"><circle cx="46" cy="94" r="1.8" /><circle cx="48" cy="86" r="1.3" /><circle cx="45" cy="78" r="1" /><circle cx="49" cy="70" r=".8" /></g>
    <g transform="translate(96 60)"><ellipse rx="7" ry="3.4" fill="#f9c74f" /><path d="M6 0l5-4v8z" fill="#f9844a" /><circle cx="-3.6" cy="-.6" r=".8" fill="#000" /></g>
    <g transform="translate(18 50) scale(-1 1)"><ellipse rx="5" ry="2.4" fill="#90be6d" /><path d="M4 0l4-3v6z" fill="#43aa8b" /></g>
  </Svg>],
];
