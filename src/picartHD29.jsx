// ภาพการ์ดแบบละเอียด ชุด 29 (ภาพใหม่ 217–224) • [เลขภาพ, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD29 = [
  [217, 'ทุ่งดอกไม้ใต้แสงเหนือ', <Svg>
    <defs>
      <linearGradient id="k217s" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset=".6" stopColor="#10002b" /><stop offset="1" stopColor="#240046" /></linearGradient>
      <linearGradient id="k217a" x2="0" y2="1"><stop stopColor="#80ffdb" stopOpacity="0" /><stop offset=".5" stopColor="#64dfdf" stopOpacity=".8" /><stop offset="1" stopColor="#7400b8" stopOpacity="0" /></linearGradient>
      <linearGradient id="k217b" x2="0" y2="1"><stop stopColor="#f72585" stopOpacity="0" /><stop offset=".5" stopColor="#b5179e" stopOpacity=".6" /><stop offset="1" stopColor="#3a0ca3" stopOpacity="0" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k217s)" />
    <St p={[8, 8, .8, 22, 30, .6, 44, 12, 1, 70, 6, .7, 96, 22, .9, 112, 8, .6, 60, 34, .5, 104, 50, .6]} />
    <path d="M-10 40Q20 10 40 50T80 30T130 46V80Q100 60 80 74T40 70T-10 80z" fill="url(#k217a)" />
    <path d="M-10 60Q30 40 50 66T130 50V90Q90 80 60 92T-10 96z" fill="url(#k217b)" />
    <g stroke="#80ffdb" strokeWidth=".5" opacity=".5">{[10, 22, 34, 46, 58, 70, 82, 94, 106].map((x, i) => <path key={x} d={`M${x} ${40 - (i % 3) * 6}v30`} />)}</g>
    <path d="M0 104Q30 96 60 104T120 100V160H0Z" fill="#1b4332" /><path d="M0 120Q40 112 80 122T120 118V160H0Z" fill="#081c15" />
    <path d="M70 104l10-16 8 10 6-6 10 12z" fill="#0b3d2e" />
    {Array.from({ length: 28 }, (_, i) => { const x = (i * 41) % 118 + 2, y = 112 + (i * 17) % 44; const c = ['#ff99c8', '#fcf6bd', '#d0f4de', '#a9def9', '#e4c1f9', '#ffcf56'][i % 6];
      return <g key={i}><path d={`M${x} ${y + 6}v-6`} stroke="#2d6a4f" strokeWidth=".8" /><circle cx={x} cy={y} r={1.6 + (i % 3) * .4} fill={c} /><circle cx={x} cy={y} r=".6" fill="#fff" opacity=".8" /></g>; })}
    <g transform="translate(30 116)"><path d="M0 0q-2 -8 4 -12q6 4 4 12z" fill="#023e8a" /><circle cx="4" cy="-14" r="3" fill="#023e8a" /><path d="M4 -17q-4 -2 -2 -5" stroke="#023e8a" strokeWidth="1" fill="none" /></g>
    <g fill="#fff" opacity=".9"><circle cx="100" cy="114" r=".8" /><circle cx="50" cy="108" r=".7" /></g>
  </Svg>],

  [218, 'ม้าลายที่ลายหลุดลงพื้น', <Svg>
    <defs>
      <linearGradient id="k218s" x2="0" y2="1"><stop stopColor="#ffe8a3" /><stop offset="1" stopColor="#f4a261" /></linearGradient>
      <linearGradient id="k218g" x2="0" y2="1"><stop stopColor="#e9c46a" /><stop offset="1" stopColor="#bc8a3c" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k218s)" />
    <circle cx="94" cy="36" r="14" fill="#fff3b0" /><path d="M0 100Q30 90 60 98T120 94V160H0Z" fill="url(#k218g)" />
    <g fill="#5a3d1e"><path d="M10 96q2 -18 0 -28q-8 -4 -12 0q8 -2 10 4q-10 -2 -10 6q6 -4 10 0z" /><path d="M14 68q10 -8 20 -2q-8 -2 -14 4z" /><path d="M100 96q-2 -14 0 -22q8 -4 12 2q-8 -2 -10 4q8 0 6 6q-4 -4 -8 0z" /></g>
    <g transform="translate(60 100)">
      <path d="M-26 -14q0 -16 22 -16h20q12 0 12 14v6h-54z" fill="#fff" stroke="#212529" strokeWidth="1.2" />
      <path d="M16 -28q4 -14 14 -18q8 -2 10 6q0 6 -6 8l-6 4q-2 8 -8 10z" fill="#fff" stroke="#212529" strokeWidth="1.2" />
      <path d="M26 -46q-2 -6 2 -8l2 6zM34 -46q2 -6 6 -6l-2 6z" fill="#fff" stroke="#212529" strokeWidth="1" />
      <path d="M18 -40q-6 4 -8 14" stroke="#212529" strokeWidth="2.4" fill="none" strokeDasharray="2 2" />
      <circle cx="34" cy="-40" r="1.2" fill="#212529" /><ellipse cx="40" cy="-34" rx="2" ry="1.4" fill="#adb5bd" />
      <path d="M-22 -8v20M-14 -8v20M6 -8v20M14 -8v20" stroke="#fff" strokeWidth="4" strokeLinecap="round" /><path d="M-22 -8v20M-14 -8v20M6 -8v20M14 -8v20" stroke="#212529" strokeWidth="5.6" strokeLinecap="round" opacity=".15" />
      <path d="M-24 12h4M-16 12h4M4 12h4M12 12h4" stroke="#212529" strokeWidth="2.4" />
      <path d="M-26 -22q-8 2 -8 12" stroke="#212529" strokeWidth="1.4" fill="none" /><path d="M-34 -10l-2 4 4 -1z" fill="#212529" />
      <path d="M-14 -28q2 6 0 10M-4 -29q2 6 0 12M6 -29q-2 6 0 12" stroke="#212529" strokeWidth="1.4" opacity=".3" fill="none" />
    </g>
    <g fill="#212529">{[[-30, 28, -20], [-12, 34, 8], [8, 30, 24], [26, 38, -8], [-40, 42, 30], [44, 46, -26], [-2, 46, 14]].map(([x, y, a], i) => <path key={i} d="M-8 -1.6Q0 -3 8 -1.6L7 1.6Q0 3 -7 1.6z" transform={`translate(${60 + x} ${100 + y}) rotate(${a})`} />)}</g>
    <g fill="#212529" opacity=".8"><path d="M52 118q4 2 2 6" stroke="#212529" strokeWidth="1.4" fill="none" /><path d="M70 120q-2 4 2 6" stroke="#212529" strokeWidth="1.4" fill="none" /></g>
    <g transform="translate(26 132)"><circle r="4" fill="#ffd166" /><circle cx="-1.4" cy="-1" r=".6" fill="#333" /><circle cx="1.4" cy="-1" r=".6" fill="#333" /><ellipse cy="1.6" rx="1.6" ry="1.2" fill="#333" /></g>
  </Svg>],

  [219, 'ปลาหมึกเล่นเปียโน', <Svg>
    <defs>
      <linearGradient id="k219s" x2="0" y2="1"><stop stopColor="#00b4d8" /><stop offset=".6" stopColor="#0077b6" /><stop offset="1" stopColor="#03045e" /></linearGradient>
      <radialGradient id="k219o" cx=".4" cy=".35"><stop stopColor="#ffb3c6" /><stop offset=".7" stopColor="#f15bb5" /><stop offset="1" stopColor="#9b2c6b" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k219s)" />
    <g fill="#caf0f8" opacity=".8"><circle cx="20" cy="30" r="2" /><circle cx="24" cy="20" r="1.4" /><circle cx="90" cy="20" r="1.6" /><circle cx="96" cy="12" r="1" /></g>
    <path d="M0 136Q30 128 60 136T120 132V160H0Z" fill="#e9c46a" /><g fill="#2a9d8f"><path d="M6 136q-4 -16 2 -22q0 12 0 22z" /><path d="M110 134q4 -18 -2 -26q-1 14 2 26z" /></g>
    <g transform="translate(60 112)">
      <path d="M-40 0h80v18h-80z" fill="#212529" /><path d="M-40 18h6v14h-6zM34 18h6v14h-6z" fill="#212529" />
      <rect x="-38" y="2" width="76" height="10" fill="#f8f9fa" /><g stroke="#adb5bd" strokeWidth=".5">{Array.from({ length: 15 }, (_, i) => <path key={i} d={`M${-38 + i * 5.06} 2v10`} />)}</g>
      <g fill="#212529">{[1, 2, 4, 5, 6, 8, 9, 11, 12, 13].map(i => <rect key={i} x={-38 + i * 5.06 - 1.4} y="2" width="2.8" height="6" />)}</g>
      <path d="M-40 0l4 -22h72l4 22z" fill="#343a40" /><path d="M-30 -18h60" stroke="#495057" strokeWidth=".8" />
      <rect x="-12" y="-14" width="24" height="10" fill="#fefae0" /><g stroke="#333" strokeWidth=".4">{[-11, -9, -7, -5].map(y => <path key={y} d={`M-10 ${y}h20`} />)}</g><g fill="#333"><circle cx="-6" cy="-8" r=".8" /><circle cx="0" cy="-10" r=".8" /><circle cx="5" cy="-7" r=".8" /></g>
    </g>
    <g transform="translate(60 70)">
      <ellipse cy="-10" rx="18" ry="20" fill="url(#k219o)" /><ellipse cx="-6" cy="-20" rx="4" ry="6" fill="#fff" opacity=".35" />
      <circle cx="-6" cy="-6" r="4" fill="#fff" /><circle cx="6" cy="-6" r="4" fill="#fff" /><circle cx="-5" cy="-5" r="2" fill="#000" /><circle cx="7" cy="-5" r="2" fill="#000" /><path d="M-4 4q4 3 8 0" stroke="#7a1d4a" strokeWidth="1" fill="none" />
      <path d="M-6 -30q-4 -6 -8 -4" stroke="#f15bb5" strokeWidth="1.4" fill="none" />
      {[[-16, 6, 'M0 0q-12 10 -20 30q-2 6 2 6'], [-10, 10, 'M0 0q-6 14 -14 30'], [-4, 10, 'M0 0q-2 16 -6 30'], [4, 10, 'M0 0q2 16 6 30'], [10, 10, 'M0 0q6 14 14 30'], [16, 6, 'M0 0q12 10 20 30q2 6 -2 6']].map(([x, y, d], i) => <path key={i} d={d} transform={`translate(${x} ${y})`} stroke="#f15bb5" strokeWidth="4" fill="none" strokeLinecap="round" />)}
      <g fill="#ffc2d1">{[[-30, 38], [-22, 40], [-10, 40], [-1, 40], [16, 40], [30, 38]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".9" />)}</g>
    </g>
    <g fill="#ffd60a"><path d="M24 70q-2 2 0 4l1-6v-6l4 2" stroke="#ffd60a" strokeWidth=".8" fill="none" /><ellipse cx="23" cy="74" rx="1.8" ry="1.3" /><ellipse cx="98" cy="64" rx="1.8" ry="1.3" /><path d="M99.8 64V56l4 1v6" stroke="#ffd60a" strokeWidth=".8" fill="none" /><ellipse cx="103.6" cy="63" rx="1.6" ry="1.2" /></g>
    <g transform="translate(104 100) scale(-1 1)"><ellipse rx="6" ry="3" fill="#ffb703" /><path d="M5 0l4-3v6z" fill="#fb8500" /><circle cx="-3" cy="-.6" r=".7" fill="#000" /></g>
  </Svg>],

  [220, 'เด็กปีนต้นไม้เก็บดาว', <Svg>
    <defs>
      <linearGradient id="k220s" x2="0" y2="1"><stop stopColor="#0d1b2a" /><stop offset=".7" stopColor="#1b263b" /><stop offset="1" stopColor="#415a77" /></linearGradient>
      <radialGradient id="k220st"><stop stopColor="#fff9c4" /><stop offset="1" stopColor="#ffd60a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k220s)" />
    <St p={[10, 20, .7, 30, 8, .6, 100, 30, .8, 112, 12, .6, 60, 18, .5, 88, 70, .5]} />
    <path d="M54 160q2 -40 -2 -70q-10 -10 -24 -14M54 98q12 -12 28 -14M52 120q-14 -4 -26 2M55 76q-2 -16 4 -30M58 60q10 -8 20 -10" stroke="#3d2b1f" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M52 160q2 -40 -1 -72" stroke="#2b1d14" strokeWidth="9" fill="none" />
    <g fill="#1b4332" opacity=".9"><circle cx="30" cy="74" r="10" /><circle cx="84" cy="82" r="11" /><circle cx="26" cy="120" r="9" /><circle cx="60" cy="44" r="12" /><circle cx="80" cy="50" r="8" /></g>
    {[[30, 66, 3.4], [88, 76, 3], [24, 114, 2.6], [62, 34, 3.2], [82, 44, 2.4], [70, 60, 2], [40, 92, 2.2]].map(([x, y, r], i) => <g key={i}><circle cx={x} cy={y} r={r * 3.4} fill="url(#k220st)" /><path d="M0 -5l1.5 3.5 3.5.5-2.5 2.5.6 3.5-3.1-1.6-3.1 1.6.6-3.5-2.5-2.5 3.5-.5z" transform={`translate(${x} ${y}) scale(${r / 3.4})`} fill="#ffe066" /></g>)}
    <g transform="translate(66 64)">
      <circle cx="2" cy="-12" r="6" fill="#f1c27d" /><path d="M-4 -14q6 -8 12 0" fill="#6b3e26" /><circle cx="4" cy="-12" r=".8" fill="#333" /><path d="M2 -9q2 1 3 0" stroke="#6b3e26" strokeWidth=".6" fill="none" />
      <path d="M-4 -6h10l1 12h-12z" fill="#ef476f" /><path d="M6 -4l8 -10" stroke="#f1c27d" strokeWidth="2.2" strokeLinecap="round" /><path d="M-4 -4l-6 8" stroke="#f1c27d" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-4 6l-6 6M4 6l2 8" stroke="#118ab2" strokeWidth="2.6" strokeLinecap="round" />
      <g transform="translate(-14 12)"><path d="M-5 0h10l-1 8h-8z" fill="#c8b6a6" stroke="#6b3e26" strokeWidth=".6" /><path d="M-5 0q5 -6 10 0" stroke="#6b3e26" strokeWidth=".8" fill="none" /><circle cx="-1" cy="2" r="1.4" fill="#ffe066" /><circle cx="2" cy="3" r="1.2" fill="#ffe066" /></g>
    </g>
    <path d="M0 150Q60 142 120 150V160H0Z" fill="#0b3d2e" />
    <g transform="translate(96 146)"><path d="M-10 0v-14l10 -8 10 8v14z" fill="#22223b" /><rect x="-3" y="-8" width="6" height="8" fill="#ffd166" /></g>
  </Svg>],

  [221, 'นกกระจอกเทศมุดหัวในทราย', <Svg>
    <defs>
      <linearGradient id="k221s" x2="0" y2="1"><stop stopColor="#90e0ef" /><stop offset="1" stopColor="#ffe5b4" /></linearGradient>
      <linearGradient id="k221d" x2="0" y2="1"><stop stopColor="#f4d58d" /><stop offset="1" stopColor="#d4a373" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k221s)" />
    <circle cx="96" cy="26" r="12" fill="#fff3b0" /><circle cx="96" cy="26" r="18" fill="#fff3b0" opacity=".3" />
    <Cl x={24} y={30} s={.7} />
    <path d="M0 100Q30 88 60 96T120 92V160H0Z" fill="url(#k221d)" /><path d="M0 120Q40 112 80 120T120 116" stroke="#e9c46a" strokeWidth="1" fill="none" /><path d="M0 136Q50 128 120 138" stroke="#e9c46a" strokeWidth="1" fill="none" />
    <g fill="#588157"><path d="M10 100v-18l2 -2 2 2v18z" /><path d="M8 88q-4 0 -4 -6M16 86q4 0 4 -6" stroke="#588157" strokeWidth="2.4" fill="none" /><path d="M104 96v-12l2 -2 2 2v12z" /></g>
    <g transform="translate(64 110)">
      <path d="M-30 -24q-4 -18 14 -22q18 -2 26 10q4 8 -2 14q-16 8 -38 -2z" fill="#343a40" />
      <path d="M-30 -24q-10 -8 -6 -18q4 10 10 12M-28 -30q-12 -2 -14 -12q6 6 14 6M-24 -40q-4 -10 2 -16q0 10 4 12" fill="#f8f9fa" stroke="#dee2e6" strokeWidth=".6" />
      <path d="M6 -22q8 6 10 20q2 10 -2 12" stroke="#f4acb7" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <ellipse cx="14" cy="10" rx="9" ry="3" fill="#c9a76b" />
      <path d="M-14 -14l-4 24M-4 -14l4 24" stroke="#f4acb7" strokeWidth="3" strokeLinecap="round" /><path d="M-22 10h6M2 10h6" stroke="#f4acb7" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M-12 -30q6 -4 14 -2" stroke="#495057" strokeWidth="1" fill="none" />
    </g>
    <g fill="#d4a373"><circle cx="72" cy="122" r="1.4" /><circle cx="84" cy="118" r="1" /><circle cx="78" cy="114" r="1.2" /><circle cx="86" cy="124" r=".8" /></g>
    <g transform="translate(24 128)"><path d="M0 0q-4 -10 4 -12q8 0 6 8q-2 6 -10 4z" fill="#e5989b" /><circle cx="6" cy="-6" r="1" fill="#000" /><path d="M8 -4l3 -1" stroke="#000" strokeWidth=".6" /><path d="M6 -10q4 -6 8 -4" stroke="#333" strokeWidth=".6" fill="none" /><text x="8" y="-16" fontSize="8" fontWeight="700" fill="#333">?</text></g>
    <g fill="none" stroke="#adb5bd" strokeWidth=".6" opacity=".7"><path d="M40 116q4 -4 8 0" /><path d="M90 110q3 -3 6 0" /></g>
  </Svg>],

  [222, 'รถตุ๊กตุ๊กบินได้', <Svg>
    <defs>
      <linearGradient id="k222s" x2="0" y2="1"><stop stopColor="#ff9e00" /><stop offset=".5" stopColor="#ff5d8f" /><stop offset="1" stopColor="#7209b7" /></linearGradient>
      <linearGradient id="k222c" x2="0" y2="1"><stop stopColor="#00b4d8" /><stop offset="1" stopColor="#0077b6" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k222s)" />
    <circle cx="26" cy="40" r="14" fill="#ffd60a" opacity=".9" />
    <g fill="#3c096c"><rect x="0" y="118" width="14" height="42" /><rect x="12" y="104" width="12" height="56" /><path d="M24 160V112l8 -12 8 12v48z" /><rect x="40" y="124" width="16" height="36" /><rect x="58" y="96" width="10" height="64" /><path d="M66 160V120h20v40z" /><rect x="86" y="108" width="12" height="52" /><path d="M98 160v-36l10 -10 12 10v36z" /></g>
    <g fill="#ffd166" opacity=".8">{[[3, 124], [8, 132], [15, 110], [19, 118], [30, 116], [44, 130], [50, 138], [61, 104], [61, 116], [70, 126], [78, 134], [89, 114], [93, 124], [104, 126], [112, 136]].map(([x, y], i) => <rect key={i} x={x} y={y} width="2.6" height="3" />)}</g>
    <g stroke="#ffd60a" strokeWidth=".5" opacity=".7">{[[20, 100], [104, 104]].map(([x, y], i) => <path key={i} d={`M${x} ${y}v-4`} />)}</g>
    <g transform="translate(62 70) rotate(-8)">
      <path d="M-30 -10l2 -14h40l6 14z" fill="#e63946" /><path d="M-28 -24h40" stroke="#ffd60a" strokeWidth="1.6" />
      <path d="M-30 -10h48l8 6v12h-56z" fill="url(#k222c)" stroke="#023047" strokeWidth="1" />
      <path d="M18 -10l10 -2 6 6 -2 10h-6z" fill="#00b4d8" stroke="#023047" strokeWidth="1" /><circle cx="31" cy="0" r="2" fill="#fff3b0" /><circle cx="31" cy="0" r="5" fill="#fff3b0" opacity=".3" />
      <rect x="-24" y="-8" width="14" height="10" fill="#caf0f8" opacity=".7" /><path d="M-6 -8v14" stroke="#023047" strokeWidth=".8" />
      <circle cx="-4" cy="-14" r="4.4" fill="#f1c27d" /><path d="M-8 -16q4 -6 8 0" fill="#264653" /><path d="M-2 -12q1.4 1 2 0" stroke="#6b3e26" strokeWidth=".5" fill="none" />
      <circle cx="-20" cy="-14" r="4" fill="#e0ac69" /><path d="M-24 -16q4 -6 8 0" fill="#ffafcc" /><path d="M-16 -14l6 -6" stroke="#e0ac69" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="-22" cy="10" r="5" fill="#212529" /><circle cx="-22" cy="10" r="2" fill="#adb5bd" /><circle cx="14" cy="10" r="5" fill="#212529" /><circle cx="14" cy="10" r="2" fill="#adb5bd" />
      <path d="M-34 -2q-10 -4 -14 2q6 -1 10 2q-8 2 -10 8q8 -4 14 -6z" fill="#fff" opacity=".9" />
      <path d="M-36 -6q-14 -14 -24 -10q8 2 10 8q-10 0 -14 6q10 -2 16 0q-6 4 -6 10q8 -6 18 -6" fill="#fff" stroke="#e5e5e5" strokeWidth=".6" />
    </g>
    <g fill="#fff" opacity=".8"><path d="M8 80l-6 2M12 88l-8 4M10 72l-6 0" stroke="#fff" strokeWidth="1" /></g>
    <St p={[100, 20, 1, 110, 50, .7, 80, 14, .6]} f="#fff3b0" />
  </Svg>],

  [223, 'พระบิณฑบาตยามเช้า', <Svg>
    <defs>
      <linearGradient id="k223s" x2="0" y2="1"><stop stopColor="#ffd6a5" /><stop offset=".6" stopColor="#fdffb6" /><stop offset="1" stopColor="#e9edc9" /></linearGradient>
      <linearGradient id="k223r" x2="0" y2="1"><stop stopColor="#ff9e00" /><stop offset="1" stopColor="#e85d04" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k223s)" />
    <circle cx="84" cy="44" r="16" fill="#ffb703" opacity=".8" /><circle cx="84" cy="44" r="26" fill="#ffb703" opacity=".15" />
    <g fill="#c9ada7" opacity=".7"><path d="M0 92V60l8 -6 8 6v32z" /><path d="M20 92V70h22v22z" /><path d="M18 71l13 -10 13 10z" /><path d="M96 92V64h24v28z" /><path d="M94 65l14 -12 14 12z" /></g>
    <g fill="#9a8c98" opacity=".8"><path d="M58 92V58l4 -24 4 24v34z" /><path d="M60 40h4l-2 -8z" /></g>
    <path d="M0 92H120V160H0Z" fill="#d6ccc2" /><path d="M0 92h120" stroke="#b7a99a" strokeWidth="1" /><g stroke="#c2b5a8" strokeWidth=".6">{[104, 118, 134, 150].map(y => <path key={y} d={`M0 ${y}h120`} />)}</g>
    {[[30, 1], [56, .9], [80, .8]].map(([x, s], i) => <g key={i} transform={`translate(${x} 128) scale(${s})`}>
      <circle cy="-30" r="6" fill="#d4a373" /><path d="M-3 -29q3 1 6 0" stroke="#6b3e26" strokeWidth=".5" fill="none" />
      <path d="M-9 -22q9 -4 18 0l4 30h-26z" fill="url(#k223r)" /><path d="M-9 -22q6 10 18 30" stroke="#d00000" strokeWidth="1" fill="none" opacity=".6" />
      <ellipse cx="0" cy="-12" rx="6" ry="4" fill="#495057" /><ellipse cx="0" cy="-14" rx="5" ry="1.6" fill="#6c757d" />
      <path d="M-6 -16l6 4 6 -4" stroke="#d4a373" strokeWidth="2" fill="none" />
      <path d="M-4 8l-1 6M4 8l1 6" stroke="#d4a373" strokeWidth="2.4" strokeLinecap="round" />
    </g>)}
    <g transform="translate(102 132)">
      <circle cy="-14" r="5" fill="#e0ac69" /><path d="M-5 -16q5 -6 10 0" fill="#343a40" />
      <path d="M-6 -8q6 -2 12 0l2 16h-16z" fill="#f8f9fa" stroke="#dee2e6" strokeWidth=".5" /><path d="M-6 8h12v4h-12z" fill="#457b9d" />
      <path d="M-6 -4l-8 0" stroke="#e0ac69" strokeWidth="2" strokeLinecap="round" /><ellipse cx="-16" cy="-5" rx="3" ry="1.8" fill="#fff" /><path d="M-18 -6q2 -3 4 0" fill="#ffd166" />
      <path d="M-14 12q14 2 18 0" stroke="#adb5bd" strokeWidth="1" />
    </g>
    <g fill="#fff" opacity=".6"><circle cx="40" cy="60" r="1" /><circle cx="70" cy="70" r=".8" /></g>
  </Svg>],

  [224, 'ตลาดน้ำยามเช้า', <Svg>
    <defs>
      <linearGradient id="k224s" x2="0" y2="1"><stop stopColor="#a2d2ff" /><stop offset="1" stopColor="#ffe5b4" /></linearGradient>
      <linearGradient id="k224w" x2="0" y2="1"><stop stopColor="#52796f" /><stop offset="1" stopColor="#2f3e46" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#k224s)" />
    <g fill="#606c38"><path d="M0 70V40l10 -6 10 6v30z" /><path d="M100 70V44l10 -8 10 8v26z" /></g>
    <g fill="#283618"><path d="M14 72q-2 -26 4 -40q2 14 -2 40z" /><path d="M16 34q-10 -2 -14 6q8 -6 14 -4zM17 34q10 -4 14 4q-8 -4 -14 -2z" /><path d="M104 74q2 -22 -2 -34q-2 12 0 34z" /><path d="M102 42q-8 -4 -12 4q6 -4 12 -2zM103 42q8 -4 12 2q-6 -2 -12 0z" /></g>
    <rect y="70" width="120" height="90" fill="url(#k224w)" />
    <g stroke="#84a98c" strokeWidth=".7" opacity=".7">{[[10, 84], [60, 90], [90, 100], [20, 120], [80, 132], [40, 146]].map(([x, y], i) => <path key={i} d={`M${x} ${y}q5 -2 10 0`} fill="none" />)}</g>
    {[[30, 100, 1, '#e63946', '#fb8500'], [86, 92, .8, '#2a9d8f', '#e9c46a'], [62, 130, 1.1, '#8338ec', '#ff006e']].map(([x, y, s, hat, fruit], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 0q26 10 52 0l-4 6q-22 6 -44 0z" fill="#7f5539" stroke="#3d2b1f" strokeWidth=".8" />
      <g>{[-16, -10, -4, 2, 8].map((fx, j) => <circle key={j} cx={fx} cy={-2 - (j % 2) * 2} r="3" fill={j % 2 ? fruit : '#90be6d'} />)}</g>
      <circle cx="14" cy="-12" r="4.4" fill="#d4a373" /><path d="M6 -14q8 -10 16 0z" fill={hat} /><path d="M4 -14h20" stroke={hat} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 -8h8l1 6h-10z" fill="#f1faee" /><path d="M18 -6l10 10" stroke="#9c6644" strokeWidth="1.6" /><path d="M27 3l3 5" stroke="#9c6644" strokeWidth="3" />
    </g>)}
    <g fill="#fff" opacity=".5"><ellipse cx="30" cy="108" rx="22" ry="2" /><ellipse cx="62" cy="139" rx="26" ry="2.2" /><ellipse cx="86" cy="99" rx="16" ry="1.6" /></g>
    <Cl x={60} y={24} s={.8} o={.9} />
  </Svg>],
];
