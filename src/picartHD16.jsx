// ภาพการ์ดแบบละเอียด ชุด 16 • [เลขภาพเดิม, ชื่อภาพ, SVG ทั้งใบ] • viewBox 120x160
import React from 'react';

const Svg = ({ children }) => <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg">{children}</svg>;
const St = ({ p, f = '#fff' }) => <g fill={f}>{p.map((v, i) => i % 3 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={p[i + 2]} />)}</g>;
const Cl = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="2" rx="16" ry="6" /><circle cx="-7" cy="-2" r="7" /><circle cx="4" cy="-5" r="9" /><circle cx="11" cy="0" r="5" /></g>;

export const HD16 = [
  [103, 'กบรอรถเมล์', <Svg>
    <defs>
      <linearGradient id="a103s" x2="0" y2="1"><stop stopColor="#ffd6a5" /><stop offset="1" stopColor="#ffc971" /></linearGradient>
      <radialGradient id="a103f" cx=".4" cy=".3"><stop stopColor="#95d5b2" /><stop offset="1" stopColor="#2d936c" /></radialGradient>
      <linearGradient id="a103r" x2="0" y2="1"><stop stopColor="#b08968" /><stop offset="1" stopColor="#7f5539" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#a103s)" />
    <Cl x={24} y={30} s={.9} /><Cl x={98} y={22} s={.7} />
    <path d="M0 118Q60 106 120 120V160H0Z" fill="#90be6d" /><rect y="128" width="120" height="14" fill="url(#a103r)" /><path d="M0 135h120" stroke="#ffd166" strokeDasharray="6 5" strokeWidth="1.2" />
    <g stroke="#55a630" strokeWidth="1">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 9 + 3} 148l-1-4M${i * 9 + 5} 148l1-4`} />)}</g>
    <rect x="12" y="66" width="3" height="62" fill="#6c757d" /><rect x="5" y="58" width="17" height="11" rx="2" fill="#f94144" /><rect x="8" y="61" width="11" height="2" fill="#fff" /><rect x="8" y="64.4" width="7" height="1.6" fill="#fff" opacity=".7" />
    <path d="M28 86H98V91H28Z" fill="#8d6e63" /><path d="M24 86L28 80H98L102 86" fill="#a1887f" /><rect x="30" y="91" width="3" height="37" fill="#6d4c41" /><rect x="93" y="91" width="3" height="37" fill="#6d4c41" /><rect x="28" y="112" width="70" height="4" rx="1" fill="#8d6e63" />
    <ellipse cx="66" cy="102" rx="21" ry="13" fill="url(#a103f)" /><ellipse cx="66" cy="106" rx="13" ry="7" fill="#d8f3dc" />
    <circle cx="55" cy="90" r="6.6" fill="url(#a103f)" /><circle cx="77" cy="90" r="6.6" fill="url(#a103f)" /><circle cx="55" cy="90" r="3.6" fill="#fff" /><circle cx="77" cy="90" r="3.6" fill="#fff" /><circle cx="56" cy="90.6" r="1.8" fill="#1b1b1b" /><circle cx="78" cy="90.6" r="1.8" fill="#1b1b1b" /><circle cx="56.6" cy="89.6" r=".6" fill="#fff" /><circle cx="78.6" cy="89.6" r=".6" fill="#fff" />
    <path d="M57 104q9 5 18 0" stroke="#1b4332" strokeWidth="1" fill="none" /><circle cx="54" cy="100" r="2" fill="#ff8fa3" opacity=".5" /><circle cx="78" cy="100" r="2" fill="#ff8fa3" opacity=".5" />
    <g fill="#1b4332" opacity=".4">{[[60, 96], [72, 98], [66, 94]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" />)}</g>
    <path d="M48 114q-6 6-8 14M84 114q6 6 8 14" stroke="url(#a103f)" strokeWidth="4.4" fill="none" strokeLinecap="round" /><path d="M36 128h8M88 128h8" stroke="#2d936c" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M86 98V76" stroke="#495057" strokeWidth="1.2" /><path d="M72 78Q86 62 100 78Z" fill="#f9c74f" /><path d="M79 78Q86 62 93 78Z" fill="#f94144" />
    <g transform="translate(104 112)"><rect x="-6" y="0" width="12" height="16" rx="1.6" fill="#6d4c41" /><path d="M-3 0v-3h6v3" stroke="#3e2723" fill="none" /></g>
    <g fill="#495057"><path d="M60 40q3-3 6 0q-3 1-6 0z" /></g>
  </Svg>],

  [104, 'ฟ้าผ่าแล้วดอกไม้บาน', <Svg>
    <defs>
      <linearGradient id="a104s" x2="0" y2="1"><stop stopColor="#1d1e2c" /><stop offset="1" stopColor="#5c6378" /></linearGradient>
      <radialGradient id="a104c" cx=".5" cy=".4"><stop stopColor="#4a4e69" /><stop offset="1" stopColor="#16161f" /></radialGradient>
      <radialGradient id="a104g"><stop stopColor="#fff3b0" stopOpacity=".7" /><stop offset="1" stopColor="#fff3b0" stopOpacity="0" /></radialGradient>
      <linearGradient id="a104t" x2="1" y2="0"><stop stopColor="#3e2a1e" /><stop offset=".5" stopColor="#6b4a36" /><stop offset="1" stopColor="#2e1e14" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#a104s)" />
    <g fill="url(#a104c)"><circle cx="34" cy="16" r="20" /><circle cx="64" cy="8" r="24" /><circle cx="98" cy="18" r="18" /><ellipse cx="60" cy="26" rx="56" ry="10" /></g>
    <circle cx="58" cy="60" r="36" fill="url(#a104g)" />
    <polygon points="62,28 52,48 61,48 50,72 72,42 63,42 70,28" fill="#ffd60a" /><polygon points="62,28 52,48 61,48" fill="#fff" opacity=".6" />
    <g stroke="#9ca3af" strokeWidth=".5" opacity=".5">{Array.from({ length: 16 }, (_, i) => <line key={i} x1={(i * 37) % 120} y1={30 + (i * 23) % 90} x2={(i * 37) % 120 - 2} y2={38 + (i * 23) % 90} />)}</g>
    <path d="M0 138Q60 130 120 140V160H0Z" fill="#3a5a40" /><g stroke="#588157" strokeWidth="1">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 9 + 3} 142l-1-4M${i * 9 + 5} 142l1-4`} />)}</g>
    <path d="M54 140V96L40 76M58 104L76 80M56 116L36 102M60 90L66 72" stroke="url(#a104t)" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M56 98L57 108L55 118" stroke="#ffd60a" strokeWidth="1.2" fill="none" /><path d="M56 98L57 108L55 118" stroke="#fff3b0" strokeWidth="3" fill="none" opacity=".3" />
    {[[40, 74, '#ff8fab'], [76, 78, '#ffd6e0'], [36, 100, '#ff8fab'], [52, 66, '#fff'], [66, 70, '#ff8fab'], [28, 88, '#fff'], [84, 70, '#ffb3c6'], [46, 82, '#ffd6e0'], [72, 92, '#fff']].map(([x, y, c], i) => <g key={i}>{[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx={x} cy={y - 3} rx="2" ry="3" fill={c} transform={`rotate(${a} ${x} ${y})`} />)}<circle cx={x} cy={y} r="1.2" fill="#ffd166" /></g>)}
    <g fill="#ffb3c6">{[[24, 130], [90, 128], [70, 148]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="2" ry="1.2" transform={`rotate(${i * 40} ${x} ${y})`} />)}</g>
  </Svg>],

  [105, 'แบกพระจันทร์ขึ้นเขา', <Svg>
    <defs>
      <linearGradient id="a105s" x2="0" y2="1"><stop stopColor="#10002b" /><stop offset=".55" stopColor="#5a189a" /><stop offset="1" stopColor="#ff9e00" /></linearGradient>
      <radialGradient id="a105m" cx=".35" cy=".35"><stop stopColor="#fffbe6" /><stop offset="1" stopColor="#efdf9e" /></radialGradient>
      <radialGradient id="a105g"><stop stopColor="#fff4c2" stopOpacity=".6" /><stop offset="1" stopColor="#fff4c2" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#a105s)" />
    <St p={[8, 10, .6, 30, 22, .5, 48, 6, .7, 96, 14, .6, 110, 40, .5, 16, 52, .4, 70, 30, .4]} />
    <path d="M0 140L30 110L50 124L80 96L120 112V160H0Z" fill="#3c096c" opacity=".6" />
    <path d="M0 160V144L84 80L120 72V160Z" fill="#240046" /><path d="M0 144L84 80L120 72" stroke="#7b2cbf" strokeWidth=".8" fill="none" />
    <circle cx="66" cy="66" r="40" fill="url(#a105g)" />
    <circle cx="66" cy="66" r="20" fill="url(#a105m)" /><g fill="#e6d48c" opacity=".7"><circle cx="60" cy="60" r="3.4" /><circle cx="72" cy="72" r="4.4" /><circle cx="72" cy="58" r="1.8" /><circle cx="58" cy="74" r="1.4" /></g>
    <g fill="#10002b"><circle cx="70" cy="92" r="3.6" /><path d="M67 95l-3 10 6 6" stroke="#10002b" strokeWidth="3" strokeLinecap="round" fill="none" /><path d="M66 98l-6 8" stroke="#10002b" strokeWidth="3" strokeLinecap="round" /><path d="M70 94l4-10M68 95l-4-10" stroke="#10002b" strokeWidth="2.4" strokeLinecap="round" /><path d="M64 104l-6 4" stroke="#10002b" strokeWidth="2" strokeLinecap="round" /></g>
    <g fill="#10002b" opacity=".6"><path d="M50 108l-6 4h6zM40 116l-6 4h6z" /></g>
    <g fill="#fff4c2" opacity=".7">{[[40, 50], [92, 50], [84, 34]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 2}l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z`} />)}</g>
  </Svg>],

  [107, 'งานเลี้ยงน้ำชาคนเดียว', <Svg>
    <defs>
      <linearGradient id="a107s" x2="0" y2="1"><stop stopColor="#ffe5ec" /><stop offset="1" stopColor="#ffc2d1" /></linearGradient>
      <radialGradient id="a107t" cx=".5" cy=".4"><stop stopColor="#ffffff" /><stop offset="1" stopColor="#f8edeb" /></radialGradient>
      <linearGradient id="a107c" x2="0" y2="1"><stop stopColor="#c9a7b3" /><stop offset="1" stopColor="#9d8189" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#a107s)" />
    <g fill="#ffb3c6" opacity=".4">{Array.from({ length: 12 }, (_, i) => <circle key={i} cx={10 + (i % 6) * 20} cy={14 + (i / 6 | 0) * 22} r="2" />)}</g>
    <path d="M30 0Q60 14 90 0" stroke="#e5989b" strokeWidth=".8" fill="none" /><g fill="#ffd166">{[36, 48, 60, 72, 84].map((x, i) => <circle key={x} cx={x} cy={4 + (2 - Math.abs(2 - i)) * 2} r="1.6" />)}</g>
    <rect y="112" width="120" height="48" fill="#e5989b" />
    {[[10, 64], [34, 56], [86, 56], [110, 64]].map(([x, y], i) => <g key={i} stroke="url(#a107c)" strokeWidth="2" fill="none"><path d={`M${x - 7} ${y}h14v20h-14z`} /><path d={`M${x - 7} ${y + 20}v16M${x + 7} ${y + 20}v16`} /><path d={`M${x - 5} ${y + 4}h10M${x - 5} ${y + 9}h10`} strokeWidth=".8" /></g>)}
    <ellipse cx="60" cy="110" rx="56" ry="15" fill="url(#a107t)" /><path d="M4 110v10q56 18 112 0v-10" fill="#f8edeb" /><path d="M4 116q8 6 14 0t14 0t14 0t14 0t14 0t14 0t14 0t14 0" stroke="#ffb3c6" fill="none" />
    {[[20, 98], [44, 94], [76, 94], [100, 98]].map(([x, y], i) => <g key={i}><ellipse cx={x} cy={y + 9} rx="8" ry="2" fill="#fff" stroke="#e5989b" strokeWidth=".6" /><path d={`M${x - 6} ${y}h12l-2 8h-8z`} fill="#fff" stroke="#e5989b" strokeWidth=".6" /><path d={`M${x + 6} ${y + 2}q3 0 3 3`} stroke="#e5989b" fill="none" strokeWidth=".8" /></g>)}
    <g transform="translate(60 112)"><path d="M-8-22h16l-2 10h-12z" fill="#ffafcc" stroke="#c9184a" strokeWidth=".8" /><path d="M8-20q4 0 4 4" stroke="#c9184a" fill="none" /><path d="M-3-26q2-6 0-10M3-26q2-6 0-10" stroke="#aaa" fill="none" strokeWidth=".7" /></g>
    <g transform="translate(60 106)"><path d="M-14 0h28" stroke="#c9184a" /></g>
    <g transform="translate(46 108)"><path d="M0 0h10l-1.4 4h-7.2z" fill="#ffd6a5" /><circle cx="3" cy="-1.4" r="2" fill="#e63946" /><circle cx="7" cy="-1.4" r="2" fill="#ffd166" /></g>
    <circle cx="60" cy="50" r="7.4" fill="#f1c27d" /><path d="M52 48q8-10 16 0q-2-6-8-6t-8 6z" fill="#5a3e2b" /><circle cx="57" cy="51" r=".9" fill="#222" /><circle cx="63" cy="51" r=".9" fill="#222" /><path d="M57 55q3 1 6 0" stroke="#a24a3a" fill="none" strokeWidth=".7" />
    <path d="M51 58h18l2 22H49z" fill="#c9184a" /><path d="M52 62h16" stroke="#ff8fa3" strokeWidth=".6" /><path d="M49 66l-6 10M71 66l6 10" stroke="#c9184a" strokeWidth="3.4" strokeLinecap="round" />
    <path d="M55 44l2-6 3 4 3-4 2 6z" fill="#ffd166" />
  </Svg>],

  [108, 'จอยเกมที่ดอกไม้งอก', <Svg>
    <defs>
      <linearGradient id="a108s" x2="0" y2="1"><stop stopColor="#9bf6ff" /><stop offset="1" stopColor="#caffbf" /></linearGradient>
      <linearGradient id="a108p" x2="0" y2="1"><stop stopColor="#868e96" /><stop offset="1" stopColor="#495057" /></linearGradient>
      <linearGradient id="a108g" x2="0" y2="1"><stop stopColor="#80b918" /><stop offset="1" stopColor="#55a630" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="url(#a108s)" />
    <Cl x={24} y={30} /><Cl x={100} y={44} s={.8} />
    <path d="M0 132Q60 122 120 134V160H0Z" fill="url(#a108g)" /><g stroke="#2b9348" strokeWidth="1">{Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 9 + 3} ${136 + (i % 3) * 6}l-1-4M${i * 9 + 5} ${136 + (i % 3) * 6}l1-4`} />)}</g>
    <path d="M22 110Q20 94 36 94H84Q100 94 98 110L94 128Q92 138 80 134L72 124H48L40 134Q28 138 26 128Z" fill="url(#a108p)" />
    <path d="M28 104Q30 98 38 98H82Q90 98 92 104" stroke="#adb5bd" strokeWidth="1" fill="none" opacity=".7" />
    <path d="M32 106h12M38 100v12" stroke="#212529" strokeWidth="3.6" strokeLinecap="round" />
    <circle cx="80" cy="102" r="3.4" fill="#ef476f" /><circle cx="87" cy="108" r="3.4" fill="#ffd166" /><circle cx="73" cy="108" r="3.4" fill="#118ab2" /><circle cx="80" cy="114" r="3.4" fill="#06d6a0" />
    <g fill="#fff" opacity=".5"><circle cx="79" cy="101" r="1" /><circle cx="86" cy="107" r="1" /></g>
    <rect x="52" y="108" width="6" height="2.4" rx="1.2" fill="#343a40" /><rect x="62" y="108" width="6" height="2.4" rx="1.2" fill="#343a40" />
    <path d="M60 96Q62 120 50 134" stroke="#343a40" strokeWidth="1.4" fill="none" /><path d="M60 96Q62 120 50 134" stroke="#868e96" strokeWidth=".4" fill="none" />
    <path d="M60 96Q58 70 62 48" stroke="#2b9348" strokeWidth="2" fill="none" /><path d="M60 82q-14-8-18 2q10 4 18-2z" fill="url(#a108g)" /><path d="M61 68q12-10 18-2q-8 6-18 2z" fill="url(#a108g)" />
    {[0, 60, 120, 180, 240, 300].map(a => <ellipse key={a} cx="62" cy="38" rx="3.6" ry="6" fill="#ff70a6" transform={`rotate(${a} 62 44)`} />)}<circle cx="62" cy="44" r="3.4" fill="#ffd60a" />
    <g fill="#ffd6e7">{[[48, 30], [78, 34], [84, 52]].map(([x, y], i) => <path key={i} d={`M${x} ${y - 2}l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z`} />)}</g>
  </Svg>],

  [110, 'โหลหิ่งห้อยริมหน้าต่าง', <Svg>
    <defs>
      <linearGradient id="a110n" x2="0" y2="1"><stop stopColor="#03071e" /><stop offset="1" stopColor="#14213d" /></linearGradient>
      <radialGradient id="a110g"><stop stopColor="#e6ff6b" stopOpacity=".55" /><stop offset="1" stopColor="#e6ff6b" stopOpacity="0" /></radialGradient>
      <radialGradient id="a110j" cx=".35" cy=".3"><stop stopColor="#e0fbfc" stopOpacity=".3" /><stop offset=".8" stopColor="#a8dadc" stopOpacity=".2" /><stop offset="1" stopColor="#e0fbfc" stopOpacity=".6" /></radialGradient>
      <linearGradient id="a110w" x2="0" y2="1"><stop stopColor="#6b4a3a" /><stop offset="1" stopColor="#3a261c" /></linearGradient>
    </defs>
    <rect width="120" height="160" fill="#2b1d16" />
    <rect x="10" y="10" width="100" height="100" fill="url(#a110n)" />
    <St p={[20, 20, .6, 46, 30, .5, 88, 18, .7, 100, 60, .5, 30, 70, .4, 70, 40, .4, 52, 18, .5]} />
    <path d="M86 26a11 11 0 1 0 9 16a8.6 8.6 0 1 1-9-16z" fill="#fff4c2" />
    <g fill="#0b0f1e"><path d="M10 110V82L22 76L32 84V70H40V110ZM70 110V88L84 78L98 88V110Z" /></g><g fill="#ffd166" opacity=".7"><rect x="18" y="88" width="3" height="4" /><rect x="84" y="92" width="3" height="4" /></g>
    <path d="M60 10v100M10 60h100" stroke="#3d2b1f" strokeWidth="4" /><rect x="6" y="6" width="108" height="108" fill="none" stroke="#3d2b1f" strokeWidth="7" /><rect x="6" y="6" width="108" height="108" fill="none" stroke="#6b4a32" strokeWidth="1" />
    <rect y="110" width="120" height="50" fill="url(#a110w)" /><rect y="110" width="120" height="4" fill="#8a5a44" />
    <circle cx="58" cy="94" r="34" fill="url(#a110g)" />
    <path d="M40 112V86Q40 80 46 80H70Q76 80 76 86V112Z" fill="url(#a110j)" stroke="#e0fbfc" strokeWidth=".9" /><rect x="42" y="74" width="32" height="7" rx="2" fill="#8d6e63" /><path d="M42 76h32" stroke="#a1887f" strokeWidth=".8" />
    <path d="M58 74l-2-4 4 0z" fill="#c9a27e" />
    {[[50, 96], [60, 88], [66, 102], [54, 106], [68, 92], [48, 86], [62, 98]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="3.4" fill="url(#a110g)" /><circle cx={x} cy={y} r="1.1" fill="#f4ff9a" /></g>)}
    <path d="M44 84q4-2 8-1" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".7" strokeLinecap="round" />
    {[[92, 96], [102, 84], [86, 82]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="3" fill="url(#a110g)" /><circle cx={x} cy={y} r=".9" fill="#f4ff9a" /></g>)}
    <path d="M76 90Q86 92 92 96" stroke="#e6ff6b" strokeWidth=".5" strokeDasharray="1 2" fill="none" />
  </Svg>],

  [111, 'มองวิวจากหน้าต่างรถไฟ', <Svg>
    <defs>
      <linearGradient id="a111s" x2="0" y2="1"><stop stopColor="#ffb4a2" /><stop offset="1" stopColor="#ffd6a5" /></linearGradient>
      <linearGradient id="a111i" x2="0" y2="1"><stop stopColor="#4a3638" /><stop offset="1" stopColor="#2d2022" /></linearGradient>
      <radialGradient id="a111u"><stop stopColor="#fff3c4" /><stop offset="1" stopColor="#fff3c4" stopOpacity="0" /></radialGradient>
    </defs>
    <rect width="120" height="160" fill="url(#a111i)" />
    <rect x="14" y="22" width="92" height="72" rx="9" fill="url(#a111s)" />
    <circle cx="82" cy="42" r="18" fill="url(#a111u)" /><circle cx="82" cy="42" r="7" fill="#fff3c4" />
    <path d="M14 72L36 56L56 66L80 48L106 60V94H14Z" fill="#6d597a" /><path d="M14 84L44 74L76 82L106 76V94H14Z" fill="#355070" />
    <g stroke="#fff" strokeWidth=".8" opacity=".5"><path d="M26 64h-8M96 74h-10M50 80h-10" /></g>
    <g fill="#2a3a5a">{[24, 32, 90, 98].map(x => <path key={x} d={`M${x} 88l3-10 3 10z`} />)}</g>
    <path d="M14 86l92-6" stroke="#2d2022" strokeWidth=".8" /><g stroke="#2d2022" strokeWidth=".6">{[20, 40, 60, 80, 100].map(x => <path key={x} d={`M${x} ${86 - x * .06}v6`} />)}</g>
    <rect x="12" y="20" width="96" height="76" rx="10" fill="none" stroke="#6b5254" strokeWidth="3.4" /><path d="M14 50h92" stroke="#6b5254" strokeWidth="1.2" opacity=".6" />
    <path d="M18 26q20-4 40 0" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".35" />
    <rect x="8" y="96" width="104" height="7" rx="2" fill="#7f5539" /><path d="M8 97h104" stroke="#a87a55" />
    <circle cx="36" cy="78" r="11" fill="#1d1416" /><path d="M20 103Q22 86 36 86Q50 86 52 103Z" fill="#1d1416" /><path d="M26 74q10-10 20 0" stroke="#1d1416" strokeWidth="4" fill="none" />
    <path d="M45 76q6 2 6 10" stroke="#ffd6a5" strokeWidth=".7" fill="none" opacity=".6" />
    <g transform="translate(80 98)"><path d="M-8 0h16l-2-8h-12z" fill="#fff" /><path d="M8-6q4 0 4 4" stroke="#fff" fill="none" /><path d="M-3-10q2-4 0-8M2-10q2-4 0-8" stroke="#fff" strokeWidth=".6" fill="none" opacity=".6" /></g>
    <g fill="#5a4244">{[0, 1, 2, 3].map(i => <rect key={i} x={i * 30} y="108" width="26" height="52" rx="3" />)}</g><g stroke="#3a2a2c" strokeWidth=".8">{[0, 1, 2, 3].map(i => <path key={i} d={`M${i * 30 + 4} 120h18`} />)}</g>
  </Svg>],

  [112, 'ขวดจดหมายบนชายหาด', <Svg>
    <defs>
      <linearGradient id="a112s" x2="0" y2="1"><stop stopColor="#8ecae6" /><stop offset="1" stopColor="#caf0f8" /></linearGradient>
      <linearGradient id="a112w" x2="0" y2="1"><stop stopColor="#00b4d8" /><stop offset="1" stopColor="#48cae4" /></linearGradient>
      <linearGradient id="a112b" x2="0" y2="1"><stop stopColor="#f6e7cb" /><stop offset="1" stopColor="#e6c99a" /></linearGradient>
      <linearGradient id="a112g" x2="0" y2="1"><stop stopColor="#a7c957" stopOpacity=".85" /><stop offset="1" stopColor="#6a994e" stopOpacity=".85" /></linearGradient>
    </defs>
    <rect width="120" height="58" fill="url(#a112s)" /><Cl x={28} y={22} s={1.1} /><circle cx="96" cy="22" r="10" fill="#fff3b0" />
    <path d="M0 56H120V82Q90 76 60 84T0 80Z" fill="url(#a112w)" /><path d="M0 80Q30 86 60 84T120 82" stroke="#fff" strokeWidth="3" fill="none" opacity=".9" /><path d="M0 84Q30 90 60 88T120 86" stroke="#caf0f8" strokeWidth="1.2" fill="none" opacity=".7" />
    <g fill="#fff" opacity=".6"><path d="M10 64q4-2 8 0M60 68q4-2 8 0M90 62q4-2 8 0" stroke="#fff" fill="none" /></g>
    <path d="M0 82Q30 88 60 86T120 84V160H0Z" fill="url(#a112b)" /><g fill="#d4b483" opacity=".7">{Array.from({ length: 16 }, (_, i) => <circle key={i} cx={(i * 41) % 118 + 1} cy={96 + (i * 23) % 60} r=".7" />)}</g>
    <ellipse cx="60" cy="126" rx="26" ry="4" fill="#c9a77c" opacity=".5" />
    <g transform="rotate(-24 60 116)"><rect x="38" y="106" width="38" height="18" rx="8" fill="url(#a112g)" stroke="#e9f5db" strokeWidth=".6" /><rect x="76" y="110" width="10" height="10" fill="url(#a112g)" /><rect x="86" y="109" width="5" height="12" rx="1" fill="#a47148" />
      <rect x="44" y="109" width="26" height="12" fill="#fff8e7" /><path d="M46 112h20M46 115h16M46 118h18" stroke="#c9a77c" strokeWidth=".6" /><path d="M68 110q-1 4 2 10" stroke="#e63946" strokeWidth=".8" fill="none" />
      <path d="M42 108q12-2 30 0" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".7" /></g>
    <g fill="#f4a261"><path d="M18 138q4-6 9 0l-4.5 3z" /></g><g transform="translate(98 140)"><path d="M0-5l1.4 3.6 3.6 1.4-3.6 1.4L0 5l-1.4-3.6L-5 0l3.6-1.4z" fill="#e76f51" /></g>
    <g fill="#fff"><path d="M30 104q2-4 5 0z" /><path d="M84 148q2-4 5 0z" /></g>
    <g fill="#495057"><path d="M60 30q3-3 6 0q-3 1-6 0z" /></g>
  </Svg>],
];
