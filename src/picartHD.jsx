// ตัวอย่างภาพการ์ดแบบละเอียด (ทดลอง) • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;

export const HD = [
  [13, 'วาฬบินเหนือหลังคา', <Svg>
    <defs>
      <linearGradient id="h13s" x2="0" y2="1"><stop stopColor="#0a0f2c" /><stop offset=".55" stopColor="#24306b" /><stop offset="1" stopColor="#5b4a8f" /></linearGradient>
      <radialGradient id="h13m"><stop stopColor="#fffbe0" /><stop offset=".35" stopColor="#fff2b0" stopOpacity=".55" /><stop offset="1" stopColor="#fff2b0" stopOpacity="0" /></radialGradient>
      <linearGradient id="h13w" x2="0" y2="1"><stop stopColor="#9db8f5" /><stop offset=".6" stopColor="#5f7fd0" /><stop offset="1" stopColor="#3d559e" /></linearGradient>
      <linearGradient id="h13b" x2="0" y2="1"><stop stopColor="#e6ecfb" /><stop offset="1" stopColor="#b9c7ee" /></linearGradient>
      <radialGradient id="h13l"><stop stopColor="#ffd27a" stopOpacity=".9" /><stop offset="1" stopColor="#ffd27a" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h13s)" />
    <St p={[8, 8, .6, 18, 22, .9, 32, 6, .5, 44, 16, .7, 58, 4, .6, 70, 20, .5, 104, 6, .8, 114, 18, .5, 6, 40, .5, 26, 46, .7, 112, 46, .6, 50, 30, .4, 80, 8, .4, 90, 36, .5]} />
    <circle cx="96" cy="26" r="30" fill="url(#h13m)" /><circle cx="96" cy="26" r="10" fill="#fff6cf" /><circle cx="92" cy="23" r="2" fill="#f0e2a8" /><circle cx="99" cy="30" r="2.6" fill="#f0e2a8" /><circle cx="100" cy="21" r="1.2" fill="#f0e2a8" />
    <g fill="#8b86c4" opacity=".35"><ellipse cx="22" cy="62" rx="26" ry="5" /><ellipse cx="90" cy="96" rx="34" ry="6" /></g>
    <g fill="#b9c7ee" opacity=".55"><circle cx="112" cy="68" r="1.4" /><circle cx="116" cy="74" r="1" /><circle cx="108" cy="80" r=".8" /><circle cx="113" cy="60" r=".9" /></g>
    <path d="M118 66Q112 56 108 52M118 72Q110 70 104 64" stroke="#cfdaf7" strokeWidth=".6" fill="none" opacity=".6" />
    <path d="M10 76Q22 48 62 50Q90 52 100 62L114 48Q116 58 112 66Q118 74 116 86L102 74Q92 92 56 92Q18 92 10 76Z" fill="url(#h13w)" />
    <path d="M14 80Q40 98 92 82Q80 92 56 92Q24 92 14 80Z" fill="url(#h13b)" />
    <g stroke="#9fb0de" strokeWidth=".7" fill="none"><path d="M24 84Q50 94 80 86" /><path d="M22 81Q50 91 84 83" /><path d="M28 87Q50 95 74 89" /></g>
    <path d="M46 80Q56 90 52 100Q48 96 44 90Z" fill="#4c66b5" /><path d="M46 80Q52 88 50 96" stroke="#8ea6e6" strokeWidth=".6" fill="none" />
    <path d="M30 56Q50 50 76 54" stroke="#c4d3fa" strokeWidth="1.2" fill="none" opacity=".7" />
    <g fill="#c9d3ec"><circle cx="40" cy="60" r="1.3" /><circle cx="43" cy="62" r=".9" /><circle cx="68" cy="58" r="1.1" /><circle cx="71" cy="57" r=".7" /></g>
    <circle cx="25" cy="70" r="2.2" fill="#1b2350" /><circle cx="25.6" cy="69.3" r=".7" fill="#fff" /><path d="M10 76q4 1 9-1" stroke="#2c3a7a" strokeWidth=".8" fill="none" />
    <path d="M0 160V122L8 116V108H12V118L20 112L34 124V160Z" fill="#141433" /><path d="M30 160V128L50 112L70 128V160Z" fill="#1a1a40" /><path d="M64 160V118L82 104L100 118V108H105V160Z" fill="#141433" /><path d="M98 160V126L112 116L120 122V160Z" fill="#1a1a40" />
    <g fill="#0d0d26"><path d="M0 122L20 112L34 124L30 124L20 116L0 126Z" /><path d="M30 128L50 112L70 128H66L50 116L34 128Z" /><path d="M64 118L82 104L100 118H96L82 108L68 118Z" /></g>
    <g fill="#ffcf6b"><rect x="12" y="130" width="5" height="6" /><rect x="22" y="138" width="5" height="6" /><rect x="46" y="134" width="6" height="7" /><rect x="76" y="126" width="5" height="6" /><rect x="86" y="140" width="5" height="6" /><rect x="106" y="134" width="5" height="6" /></g>
    <g fill="url(#h13l)"><circle cx="14.5" cy="133" r="7" /><circle cx="49" cy="137.5" r="8" /><circle cx="78.5" cy="129" r="7" /><circle cx="108.5" cy="137" r="6" /></g>
    <g stroke="#141433" strokeWidth=".6"><path d="M12 130v6M9.5 133h5M46 137.5h6M49 134v7" /></g>
    <g transform="translate(82 102)"><circle cx="0" cy="-6" r="2" fill="#0d0d26" /><path d="M-1.6-4h3.2l.6 6h-4.4z" fill="#0d0d26" /><path d="M1.4-3.5L5-9" stroke="#0d0d26" strokeWidth="1.1" strokeLinecap="round" /><path d="M-1.4-3L-4 0" stroke="#0d0d26" strokeWidth="1.1" strokeLinecap="round" /><circle cx="-4.5" cy="1" r="1.6" fill="#ffd27a" /><circle cx="-4.5" cy="1" r="5" fill="url(#h13l)" /></g>
  </Svg>],

  [3, 'แมวกับพระจันทร์ในโหล', <Svg>
    <defs>
      <linearGradient id="h3w" x2="0" y2="1"><stop stopColor="#3b2a4f" /><stop offset="1" stopColor="#5a3f63" /></linearGradient>
      <linearGradient id="h3n" x2="0" y2="1"><stop stopColor="#0d1238" /><stop offset="1" stopColor="#2d3474" /></linearGradient>
      <radialGradient id="h3g" cx=".5" cy=".55"><stop stopColor="#fff6c9" /><stop offset=".4" stopColor="#ffe9a0" stopOpacity=".5" /><stop offset="1" stopColor="#ffe9a0" stopOpacity="0" /></radialGradient>
      <radialGradient id="h3b" cx=".35" cy=".3"><stop stopColor="#d9f0ff" stopOpacity=".5" /><stop offset=".7" stopColor="#7fb6e6" stopOpacity=".18" /><stop offset="1" stopColor="#bfe2ff" stopOpacity=".55" /></radialGradient>
      <linearGradient id="h3c" x2="1" y2="0"><stop stopColor="#141019" /><stop offset=".7" stopColor="#231c2c" /><stop offset="1" stopColor="#3a2f46" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h3w)" />
    <rect x="62" y="12" width="48" height="58" rx="2" fill="url(#h3n)" /><St p={[70, 22, .6, 84, 18, .8, 98, 26, .5, 104, 40, .6, 76, 44, .5, 92, 54, .7]} /><path d="M98 34a7 7 0 1 0 6 10a5.5 5.5 0 1 1-6-10z" fill="#fff4c2" opacity=".5" />
    <path d="M86 12V70M62 41H110" stroke="#2a1d36" strokeWidth="2.5" /><rect x="60" y="10" width="52" height="62" fill="none" stroke="#2a1d36" strokeWidth="4" /><rect x="56" y="70" width="60" height="4" fill="#2a1d36" />
    <path d="M56 8Q60 40 54 74L50 74Q54 40 52 8Z" fill="#7a3b54" /><path d="M116 8Q112 40 118 74H120V8Z" fill="#7a3b54" />
    <rect x="4" y="18" width="40" height="3" fill="#2a1d36" /><g><rect x="6" y="6" width="4" height="12" fill="#b54a4a" /><rect x="10" y="8" width="3" height="10" fill="#d9a441" /><rect x="13" y="5" width="5" height="13" fill="#4a7ab5" /><rect x="19" y="9" width="3" height="9" fill="#6aa36a" /><rect x="24" y="12" width="12" height="6" rx="1" fill="#e8d5b0" /><path d="M26 12q4-6 8 0" stroke="#e8d5b0" fill="none" /></g>
    <rect y="150" width="120" height="10" fill="#1e1626" /><rect x="0" y="146" width="120" height="5" fill="#4a3346" /><path d="M0 148h120" stroke="#6b4a62" strokeWidth=".5" />
    <ellipse cx="60" cy="152" rx="56" ry="4" fill="#7a3b54" opacity=".5" />
    <g><rect x="14" y="138" width="54" height="9" rx="1" fill="#a63d40" /><rect x="14" y="138" width="54" height="2" fill="#c45a5d" /><path d="M20 138v9M62 138v9" stroke="#e8c27a" strokeWidth=".8" /></g>
    <g><rect x="20" y="128" width="46" height="10" rx="1" fill="#3e6aa1" /><rect x="20" y="128" width="46" height="2" fill="#5a86bd" /><path d="M58 128v10" stroke="#e8c27a" strokeWidth="1.2" /><rect x="66" y="129" width="2" height="8" fill="#f2ead8" /></g>
    <g><rect x="16" y="119" width="44" height="9" rx="1" fill="#6f9a4c" /><rect x="16" y="119" width="44" height="2" fill="#8bb866" /><path d="M24 119v9" stroke="#e8c27a" strokeWidth=".8" /></g>
    <path d="M26 119Q22 96 30 88Q26 78 30 66L36 76Q40 74 46 76L52 66Q56 78 52 88Q60 98 56 119Z" fill="url(#h3c)" />
    <path d="M54 117q14 2 16-10q1-8-4-10" stroke="#1b1622" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M31 70l3 6M51 70l-3 6" stroke="#5a3f63" strokeWidth="1.2" />
    <ellipse cx="36" cy="84" rx="2.6" ry="3.2" fill="#f5d14e" /><ellipse cx="47" cy="84" rx="2.6" ry="3.2" fill="#f5d14e" /><ellipse cx="36.6" cy="84" rx=".8" ry="2.6" fill="#111" /><ellipse cx="47.6" cy="84" rx=".8" ry="2.6" fill="#111" /><circle cx="37.4" cy="82.6" r=".6" fill="#fff" /><circle cx="48.4" cy="82.6" r=".6" fill="#fff" />
    <path d="M40 89l1.5 1.2L43 89" stroke="#d98aa0" strokeWidth=".8" fill="none" />
    <g stroke="#cbbfd8" strokeWidth=".35" opacity=".8"><path d="M38 90l-12-2M38 91l-12 1M45 90l12-2M45 91l12 1" /></g>
    <path d="M52 90Q56 98 56 112" stroke="#ffe9a0" strokeWidth="1" fill="none" opacity=".35" />
    <circle cx="90" cy="124" r="34" fill="url(#h3g)" />
    <rect x="76" y="144" width="28" height="3" rx="1" fill="#8a7a9a" />
    <circle cx="90" cy="124" r="20" fill="url(#h3b)" stroke="#d9f0ff" strokeWidth=".8" />
    <path d="M71 120Q90 114 109 120Q108 140 90 144Q72 140 71 120Z" fill="#7fb6e6" opacity=".25" />
    <circle cx="90" cy="129" r="8" fill="#fff6cf" /><circle cx="87" cy="127" r="1.6" fill="#efe0a6" /><circle cx="93" cy="132" r="2" fill="#efe0a6" /><circle cx="92" cy="125" r=".9" fill="#efe0a6" />
    <path d="M77 112Q82 106 90 105" stroke="#fff" strokeWidth="1.5" fill="none" opacity=".7" strokeLinecap="round" /><circle cx="103" cy="134" r="1.3" fill="#fff" opacity=".6" />
    <g fill="#d9f0ff" opacity=".7"><circle cx="96" cy="114" r=".9" /><circle cx="98" cy="110" r=".6" /><circle cx="84" cy="138" r=".7" /></g>
  </Svg>],

  [91, 'ม้าหมุนในหมอก', <Svg>
    <defs>
      <linearGradient id="h91s" x2="0" y2="1"><stop stopColor="#8e9aaf" /><stop offset="1" stopColor="#cbc0d3" /></linearGradient>
      <linearGradient id="h91f" x2="0" y2="1"><stop stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#f4f1f6" stopOpacity=".85" /><stop offset="1" stopColor="#fff" stopOpacity=".95" /></linearGradient>
      <linearGradient id="h91p" x2="1" y2="0"><stop stopColor="#a8842f" /><stop offset=".5" stopColor="#f6d77a" /><stop offset="1" stopColor="#9a7428" /></linearGradient>
      <linearGradient id="h91h" x2="1" y2="1"><stop stopColor="#ffffff" /><stop offset="1" stopColor="#d8d2e0" /></linearGradient>
      <radialGradient id="h91l"><stop stopColor="#ffe9a8" /><stop offset="1" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h91s)" />
    <path d="M-4 22Q60 6 124 22V30H-4Z" fill="#6c5a78" /><path d="M-4 30h128" stroke="#e0c46c" strokeWidth="1.5" />
    <path d="M-4 30q8 8 16 0t16 0t16 0t16 0t16 0t16 0t16 0t16 0" fill="#9d4e6e" /><path d="M-4 30q8 8 16 0t16 0t16 0t16 0t16 0t16 0t16 0t16 0" stroke="#e0c46c" fill="none" strokeWidth=".8" />
    <g>{[4, 20, 36, 52, 68, 84, 100, 116].map(x => <g key={x}><circle cx={x} cy="34" r="5" fill="url(#h91l)" /><circle cx={x} cy="34" r="1.3" fill="#fff6d0" /></g>)}</g>
    <path d="M14 40V160M106 40V160" stroke="#b7a9c4" strokeWidth="2" opacity=".5" /><g opacity=".35"><path d="M8 96Q14 86 22 92L24 86L26 92Q30 96 26 100L20 104" fill="#fff" /><path d="M112 98Q106 88 98 94" stroke="#fff" strokeWidth="5" fill="none" /></g>
    <rect x="57.5" y="30" width="5" height="130" fill="url(#h91p)" />
    <g stroke="#7a5a18" strokeWidth=".8" opacity=".7">{[38, 46, 54, 62, 70, 120, 128, 136, 144, 152].map(y => <line key={y} x1="57.5" y1={y} x2="62.5" y2={y + 4} />)}</g>
    <path d="M30 98Q28 80 42 76L50 64Q52 56 58 54L64 50Q72 50 76 56L80 66Q82 72 76 72L70 70Q68 78 72 84Q84 86 88 96Q90 106 84 108L82 124H78L78 110Q66 112 52 110L44 122L40 120L44 108Q36 108 34 104L24 112L22 108L30 100Z" fill="url(#h91h)" stroke="#9a8fa8" strokeWidth=".8" />
    <path d="M58 54Q48 52 44 62Q40 70 42 76Q46 68 50 64Q50 72 46 80Q54 72 56 64Q58 70 56 78Q62 68 60 58Z" fill="#f2a65a" />
    <path d="M30 98Q22 94 16 100Q20 92 28 92Q22 86 14 88Q22 80 30 88" fill="#f2a65a" />
    <circle cx="70" cy="60" r="1.6" fill="#2b2238" /><circle cx="70.5" cy="59.4" r=".5" fill="#fff" /><path d="M78 66q2 2 0 4" stroke="#9a8fa8" fill="none" /><circle cx="78" cy="68" r=".7" fill="#9a8fa8" />
    <path d="M70 70Q66 74 66 80" stroke="#c0392b" strokeWidth="1.6" fill="none" /><path d="M60 52l-2 6" stroke="#c0392b" strokeWidth="1.4" />
    <path d="M48 82Q62 76 74 84Q72 96 60 96Q50 96 48 82Z" fill="#c0392b" /><path d="M48 82Q62 76 74 84" stroke="#f6d77a" strokeWidth="1.5" fill="none" /><path d="M50 90Q62 94 72 90" stroke="#f6d77a" strokeWidth=".8" fill="none" strokeDasharray="1.5 1.5" />
    <circle cx="61" cy="88" r="2.2" fill="#f6d77a" /><circle cx="61" cy="88" r="1" fill="#3a86ff" />
    <path d="M60 96v14" stroke="#7a5a18" strokeWidth="1" /><path d="M58 110h5l-1 3h-3z" fill="#f6d77a" />
    <g fill="#4a3b55"><path d="M44 122l-3 4 4 1z" /><path d="M24 112l-3 2 3 2z" /><path d="M82 124h-4v3h5z" /></g>
    <rect y="96" width="120" height="64" fill="url(#h91f)" />
    <ellipse cx="60" cy="150" rx="50" ry="6" fill="#fff" opacity=".6" />
    <g fill="#fff" opacity=".5"><ellipse cx="20" cy="70" rx="30" ry="4" /><ellipse cx="100" cy="80" rx="26" ry="3" /></g>
  </Svg>],

  [36, 'มังกรหลับบนกองทอง', <Svg>
    <defs>
      <linearGradient id="h36c" x2="0" y2="1"><stop stopColor="#120c08" /><stop offset=".6" stopColor="#2e1f12" /><stop offset="1" stopColor="#4a3218" /></linearGradient>
      <radialGradient id="h36g" cx=".5" cy=".8" r=".7"><stop stopColor="#ffd45a" stopOpacity=".55" /><stop offset="1" stopColor="#ffd45a" stopOpacity="0" /></radialGradient>
      <linearGradient id="h36p" x2="0" y2="1"><stop stopColor="#ffe48a" /><stop offset=".5" stopColor="#e9b234" /><stop offset="1" stopColor="#a8741a" /></linearGradient>
      <linearGradient id="h36d" x2="0" y2="1"><stop stopColor="#5dbb7e" /><stop offset="1" stopColor="#2a6b45" /></linearGradient>
      <pattern id="h36s" width="5" height="4" patternUnits="userSpaceOnUse"><path d="M0 4Q2.5 0 5 4" fill="none" stroke="#24603d" strokeWidth=".6" /></pattern>
      <radialGradient id="h36t"><stop stopColor="#ffb347" stopOpacity=".8" /><stop offset="1" stopColor="#ffb347" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h36c)" />
    <g fill="#0a0604"><path d="M0 0H120V10Q110 12 108 28Q104 12 96 14Q92 30 88 14Q80 10 72 22Q68 8 58 12Q54 26 50 12Q40 8 34 24Q30 10 22 12Q18 30 14 12Q6 8 0 16Z" /></g>
    <path d="M0 40Q6 60 4 160H0ZM120 50Q112 80 116 160H120Z" fill="#0f0905" />
    <rect width="120" height="160" fill="url(#h36g)" />
    <path d="M-2 160Q4 122 30 116Q44 100 62 104Q78 98 92 112Q116 116 122 160Z" fill="url(#h36p)" />
    <g fill="#ffe48a" stroke="#a8741a" strokeWidth=".5">{[[10, 150], [18, 138], [30, 146], [40, 128], [52, 140], [64, 152], [72, 132], [84, 144], [96, 130], [104, 148], [112, 140], [26, 156], [46, 152], [88, 156], [58, 120], [78, 120]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="3.4" ry="2.4" />)}</g>
    <g fill="#fff8c8">{[[17, 137.5], [51, 139.5], [83, 143.5], [39, 127.5]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".7" />)}</g>
    <path d="M92 132l4-6 4 6-4 4z" fill="#e63946" stroke="#7a0f17" strokeWidth=".5" /><path d="M24 128l3-5 3 5-3 3z" fill="#3a86ff" stroke="#123a80" strokeWidth=".5" /><path d="M66 138h6l-3 5z" fill="#2ecc71" />
    <path d="M100 116v-8h6v8M98 116h10l-2 6h-6z" fill="#e9b234" stroke="#a8741a" strokeWidth=".6" />
    <path d="M30 108L22 86Q36 70 48 82Z" fill="#2a6b45" /><path d="M30 108L22 86Q36 70 48 82" stroke="#1d4d31" fill="none" /><path d="M26 88L38 100M32 82L42 96" stroke="#1d4d31" strokeWidth=".6" />
    <path d="M16 126Q14 96 50 94Q86 92 98 112Q104 124 90 126Z" fill="url(#h36d)" /><path d="M16 126Q14 96 50 94Q86 92 98 112Q104 124 90 126Z" fill="url(#h36s)" />
    <path d="M24 122Q50 128 90 124" stroke="#a3e0b5" strokeWidth="3" fill="none" opacity=".5" />
    <g fill="#3a8a5c">{[30, 40, 50, 60, 70, 80].map((x, i) => <path key={i} d={`M${x} ${97 - (i % 2)}l3-7 3 7z`} />)}</g>
    <path d="M90 124Q112 132 116 114Q118 106 110 106" stroke="#3a8a5c" strokeWidth="6" fill="none" strokeLinecap="round" /><path d="M110 106l-6-6 8 2z" fill="#2a6b45" />
    <path d="M4 120Q2 108 14 106Q28 104 32 116Q30 126 16 126Q6 126 4 120Z" fill="url(#h36d)" />
    <path d="M14 106L8 96L18 104M22 105L22 94L27 106" fill="#d9c79a" stroke="#8a7a50" strokeWidth=".5" />
    <path d="M10 114q4 2 8 0" stroke="#173a26" strokeWidth="1.2" fill="none" strokeLinecap="round" /><path d="M10 114l-1-1.5M13 115l-.3-1.8M16 115l.5-1.7" stroke="#173a26" strokeWidth=".6" />
    <circle cx="5" cy="120" r=".9" fill="#173a26" /><path d="M5 124q4 1 10 0" stroke="#173a26" strokeWidth=".6" fill="none" />
    <g fill="#c9b8a0"><circle cx="2" cy="114" r="2.2" opacity=".45" /><circle cx="-1" cy="106" r="3.2" opacity=".3" /><circle cx="4" cy="98" r="4" opacity=".18" /></g>
    <circle cx="104" cy="74" r="20" fill="url(#h36t)" />
    <g transform="translate(104 86)"><path d="M-3 0h6l1 10h-8z" fill="#5a6270" /><circle cx="0" cy="-3" r="3.4" fill="#8a94a6" /><rect x="-3" y="-4" width="6" height="1.2" fill="#2b2b2b" /><path d="M3 2L8-10" stroke="#6b4226" strokeWidth="1.2" /><path d="M8-10q-3-5 0-9q3 4 0 9z" fill="#ffb347" /><path d="M-3 3l-3 6" stroke="#5a6270" strokeWidth="1.6" /></g>
  </Svg>],

  [126, 'แมวมองฝนจากหน้าต่าง', <Svg>
    <defs>
      <linearGradient id="h126o" x2="0" y2="1"><stop stopColor="#26324a" /><stop offset="1" stopColor="#47506b" /></linearGradient>
      <radialGradient id="h126k"><stop stopColor="#ffb703" stopOpacity=".8" /><stop offset="1" stopColor="#ffb703" stopOpacity="0" /></radialGradient>
      <radialGradient id="h126r"><stop stopColor="#ff6b8a" stopOpacity=".7" /><stop offset="1" stopColor="#ff6b8a" stopOpacity="0" /></radialGradient>
      <radialGradient id="h126c"><stop stopColor="#8fd3ff" stopOpacity=".7" /><stop offset="1" stopColor="#8fd3ff" stopOpacity="0" /></radialGradient>
      <radialGradient id="h126w" cx=".5" cy="1" r="1"><stop stopColor="#ffcf8a" stopOpacity=".55" /><stop offset="1" stopColor="#ffcf8a" stopOpacity="0" /></radialGradient>
      <linearGradient id="h126i" x2="0" y2="1"><stop stopColor="#5a3e2b" /><stop offset="1" stopColor="#2e1f16" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#h126i)" />
    <rect x="16" y="14" width="88" height="96" fill="url(#h126o)" />
    <g fill="#1b2335"><rect x="18" y="62" width="14" height="48" /><rect x="34" y="50" width="12" height="60" /><rect x="70" y="56" width="16" height="54" /><rect x="88" y="44" width="14" height="66" /></g>
    <g><circle cx="26" cy="72" r="7" fill="url(#h126k)" /><circle cx="40" cy="60" r="6" fill="url(#h126c)" /><circle cx="78" cy="66" r="8" fill="url(#h126r)" /><circle cx="96" cy="58" r="6" fill="url(#h126k)" /><circle cx="56" cy="92" r="10" fill="url(#h126k)" /><circle cx="94" cy="88" r="7" fill="url(#h126c)" /><circle cx="30" cy="96" r="6" fill="url(#h126r)" /></g>
    <g stroke="#b9c6dd" strokeWidth=".4" opacity=".55">{[[22, 16], [30, 30], [44, 20], [52, 40], [66, 18], [80, 30], [92, 22], [100, 40], [26, 46], [60, 60], [86, 74], [40, 80]].map(([x, y], i) => <line key={i} x1={x} y1={y} x2={x - 2} y2={y + 10} />)}</g>
    <g fill="#d6e6ff" opacity=".8">{[[24, 26, 1.2], [38, 44, 1], [58, 30, 1.4], [74, 48, .9], [96, 30, 1.2], [48, 70, 1], [84, 96, 1.3], [28, 86, .9], [66, 82, 1.1], [100, 66, .8]].map(([x, y, r], i) => <g key={i}><ellipse cx={x} cy={y} rx={r} ry={r * 1.3} /><path d={`M${x} ${y + r}q-.6 4 .3 ${6 + i % 3 * 3}`} stroke="#d6e6ff" strokeWidth=".5" fill="none" /></g>)}</g>
    <path d="M60 14V110M16 62H104" stroke="#3b2a1e" strokeWidth="4" /><rect x="12" y="10" width="96" height="104" fill="none" stroke="#3b2a1e" strokeWidth="7" /><rect x="12" y="10" width="96" height="104" fill="none" stroke="#6b4a32" strokeWidth="1.2" />
    <path d="M0 0H20Q14 40 18 80Q10 100 14 160H0Z" fill="#8a3b4a" /><path d="M120 0H100Q106 40 102 80Q110 100 106 160H120Z" fill="#8a3b4a" /><path d="M6 0Q4 60 8 160M114 0Q116 60 112 160" stroke="#6a2a38" strokeWidth="1.5" fill="none" />
    <rect x="4" y="112" width="112" height="8" fill="#7a5638" /><rect x="4" y="112" width="112" height="2" fill="#9a7452" />
    <rect width="120" height="160" fill="url(#h126w)" />
    <path d="M44 112Q40 96 48 88Q46 80 48 72L53 79Q58 77 63 79L68 72Q70 80 68 88Q76 96 72 112Z" fill="#141016" />
    <path d="M68 88Q74 96 72 112" stroke="#ffcf8a" strokeWidth="1" fill="none" opacity=".55" /><path d="M48 72L53 79" stroke="#ffcf8a" strokeWidth=".6" opacity=".4" />
    <path d="M72 110q16 2 16-8q0-5-4-6" stroke="#141016" strokeWidth="3.4" fill="none" strokeLinecap="round" />
    <g transform="translate(90 98)"><path d="M0 0h12l-1 13h-10z" fill="#e9edf2" /><path d="M12 3q5 0 4 5t-5 4" stroke="#e9edf2" strokeWidth="1.6" fill="none" /><rect x="0" y="0" width="12" height="2" fill="#c9d1db" /><path d="M3-2q2-4 0-8M8-2q2-4 0-8" stroke="#fff" strokeWidth=".7" fill="none" opacity=".6" /></g>
    <g transform="translate(18 112)"><path d="M0 0h12l-2-10h-8z" fill="#b5653f" /><path d="M6-10q-6-10-2-16M6-10q4-10 10-12M6-10q-8-4-10 0" stroke="#4f8a4f" strokeWidth="1.6" fill="none" strokeLinecap="round" /><ellipse cx="2" cy="-26" rx="2.5" ry="4" fill="#5ea35e" transform="rotate(-20 2 -26)" /><ellipse cx="16" cy="-22" rx="2.5" ry="4" fill="#5ea35e" transform="rotate(60 16 -22)" /></g>
    <path d="M0 120H120V160H0Z" fill="#2a1c14" /><path d="M0 128h120M0 140h120M0 152h120" stroke="#1d130d" strokeWidth=".6" />
  </Svg>],
];
