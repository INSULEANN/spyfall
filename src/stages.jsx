// ฉากเคลื่อนไหวประกอบเกม (SVG + CSS animation) — บอกด้วยภาพว่า "ตอนนี้เกิดอะไรขึ้น"
// แสดงเฉพาะสิ่งที่ผู้เล่นคนนั้นควรรู้ ไม่เผยข้อมูลลับ
import React from 'react';
import './stages.css';

// ---------- ชิ้นส่วนกลาง ----------
const SKY = { night: ['#0b1030', '#1d2552'], day: ['#3a7cc4', '#a9dcff'], dusk: ['#2a0a14', '#e0873f'], dawn: ['#2c3a7a', '#ffb070'], dark: ['#07080f', '#171a2a'], jungle: ['#123322', '#5e9a4a'], party: ['#4a1d6a', '#ff7ab8'], ghost: ['#040a07', '#14301e'], blood: ['#1a0408', '#5a1018'] };
function Sky({ id, kind }) {
  const g = SKY[kind] || SKY.night; const dark = ['night', 'dark', 'ghost', 'blood'].includes(kind);
  return <>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={g[0]} /><stop offset="1" stopColor={g[1]} /></linearGradient></defs>
    <rect width="400" height="190" fill={`url(#${id})`} />
    {dark && <g className="st-tw" fill="#fff">{[[30, 20], [80, 42], [150, 16], [210, 34], [262, 14], [372, 52], [118, 60]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1 + (i % 3) * 0.45} />)}</g>}
    {(kind === 'night' || kind === 'ghost') && <g transform="translate(336 40)"><circle r="22" fill={kind === 'ghost' ? '#c8ff9a' : '#f4f1ff'} opacity=".12" className="st-pulse" /><circle r="15" fill={kind === 'ghost' ? '#e6f0d0' : '#f4f1ff'} /><circle cx="-4" cy="-3" r="3" fill="#000" opacity=".08" /><circle cx="5" cy="5" r="2" fill="#000" opacity=".08" /></g>}
    {kind === 'blood' && <g transform="translate(336 40)"><circle r="24" fill="#ff3b3b" opacity=".18" className="st-pulse" /><circle r="16" fill="#e0525a" /></g>}
    {kind === 'day' && <g transform="translate(340 38)"><g className="st-spin">{Array.from({ length: 8 }, (_, i) => <rect key={i} x="-2" y="-30" width="4" height="9" rx="2" fill="#ffe27a" transform={`rotate(${i * 45})`} />)}</g><circle r="16" fill="#ffd34d" /></g>}
    {kind === 'day' && <g fill="#fff" opacity=".85"><g className="st-drift"><ellipse cx="80" cy="36" rx="26" ry="9" /><ellipse cx="96" cy="30" rx="14" ry="9" /></g><g className="st-drift slow"><ellipse cx="220" cy="24" rx="20" ry="7" /><ellipse cx="232" cy="19" rx="11" ry="7" /></g></g>}
    {kind === 'dawn' && <g className="st-rise"><circle cx="200" cy="150" r="30" fill="#ffd34d" opacity=".9" /><circle cx="200" cy="150" r="46" fill="#ffd34d" opacity=".2" /></g>}
  </>;
}
const Ground = ({ c = '#1a1430', line }) => <><rect y="150" width="400" height="40" fill={c} />{line && <path d="M0 150 H400" stroke={line} strokeWidth="3" />}</>;
// ใบหน้าผู้เล่น (สัตว์ประจำตัว) ในฉาก
const Face = ({ a, x, y, r = 14, cls = '', ring, children }) => <g transform={`translate(${x} ${y})`}><g className={'st-face ' + cls}>
  {ring && <circle r={r + 4} fill="none" stroke={ring} strokeWidth="3" className="st-ring" />}
  <circle r={r} fill={`hsl(${a?.h ?? 250} 55% 42%)`} stroke="#ffffff88" strokeWidth="1.5" />
  <text textAnchor="middle" dominantBaseline="central" fontSize={r * 1.15} y="1">{a?.e || '🙂'}</text>{children}</g></g>;
const Bubble = ({ x, y, text, cls = '', w = 34, dark }) => <g transform={`translate(${x} ${y})`}><g className={'st-bubble ' + cls}>
  <path d={`M${-w / 2} -12 h${w} q6 0 6 6 v8 q0 6 -6 6 h${-w / 2 + 8} l-6 7 l-1 -7 h${-w / 2 + 2} q-6 0 -6 -6 v-8 q0 -6 6 -6 z`} fill={dark ? '#241c3a' : '#fff'} />
  <text x="3" y="1" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="800" fill={dark ? '#fff' : '#241c3a'} fontFamily="Kanit,sans-serif">{text}</text></g></g>;
// คนในหมู่บ้าน (ไม่ระบุตัว)
const Folk = ({ x, y, c = '#c9a46a', s = 1, cls = '', skin = '#ffd2a8' }) => <g transform={`translate(${x} ${y}) scale(${s})`}><g className={'st-folk ' + cls}>
  <path d="M-10 0 Q-10 -16 0 -16 Q10 -16 10 0 Z" fill={c} /><circle cy="-23" r="8" fill={skin} /><path d="M-8 -26 Q0 -34 8 -26 Q0 -29 -8 -26 Z" fill="#2b1d10" /></g></g>;
// วางหน้าผู้เล่นเป็นครึ่งวงรอบโต๊ะ
const arc = (n, cx = 200, cy = 136, rx = 150, ry = 30) => Array.from({ length: n }, (_, i) => { const a = Math.PI * (n === 1 ? 0.5 : 1 - i / (n - 1)) ; return { x: cx + Math.cos(a) * rx, y: cy - Math.sin(a) * ry }; });

export function Stage({ kind, mode, cap, tone, children }) {
  return <div className={`stage st-${kind} m-${mode}`} aria-hidden="true">
    <svg viewBox="0 0 400 190" preserveAspectRatio="xMidYMid slice">{children}</svg>
    {cap && <span className={'st-cap ' + (tone || '')}>{cap}</span>}
  </div>;
}

// ---------- 🕵️ Spyfall / 🤫 SPY ----------
const SpyGuy = ({ cls = '' }) => <g className={cls}>
  <path d="M-15 34 L-11 0 Q0 -6 11 0 L15 34 Z" fill="#2b2f3a" /><path d="M-11 0 L0 14 L11 0" stroke="#4a4f5c" strokeWidth="2" fill="none" />
  <circle cy="-10" r="10" fill="#ffd2a8" /><rect x="-10" y="-14" width="20" height="5" rx="2" fill="#111" />
  <path d="M-16 -17 h32 v-3 h-32 z" fill="#3a2a1a" /><path d="M-10 -20 Q0 -34 10 -20 Z" fill="#3a2a1a" /></g>;
export function SpyStage({ game, mode, ids = [], av, speaker, done = [] }) {
  const spy = game === 'spy'; const show = ids.slice(0, 9); const pos = arc(show.length);
  const bg = spy ? 'dark' : 'dusk'; const id = 'sp-' + game + '-' + mode;
  const cap = { talk: speaker ? '🎙️ ผลัดกันใบ้ทีละคน' : '💬 ถาม–ตอบ จับพิรุธ', vote: '🗳️ โหวตว่าใครคือสายลับ', caught: '🚔 จับสายลับได้!', escape: '🏃 สายลับหนีรอด!' }[mode];
  return <Stage kind="spy" mode={mode} cap={cap} tone={mode === 'caught' ? 'good' : mode === 'escape' ? 'bad' : ''}>
    <Sky id={id} kind={bg} />
    {spy ? <g opacity=".5">{[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x="24" y={22 + i * 9} width="84" height="5" fill="#2a3150" />)}<g className="st-laser"><circle cx="300" cy="60" r="2.5" fill="#ff4f4f" /><circle cx="300" cy="60" r="7" fill="#ff4f4f" opacity=".3" /></g></g>
      : <path d="M300 150 L304 112 L310 110 L312 84 L318 82 L320 58 L324 56 L326 30 L328 56 L332 58 L334 82 L340 84 L342 110 L348 112 L352 150 Z" fill="#3a1412" opacity=".75" />}
    <Ground c={spy ? '#10121c' : '#2a1410'} />
    {mode === 'talk' && <>
      <ellipse cx="200" cy="150" rx="120" ry="20" fill={spy ? '#2a2f44' : '#5a3014'} /><ellipse cx="200" cy="146" rx="112" ry="16" fill={spy ? '#343a54' : '#7a4a20'} />
      {show.map((pid, i) => <Face key={pid} a={av?.(pid)} x={pos[i].x} y={pos[i].y} r={speaker === pid ? 17 : 13} cls={speaker ? (speaker === pid ? 'st-speak' : 'st-dim') : 'st-bob'} ring={speaker === pid ? '#ffcf5a' : null} />)}
      {speaker ? (() => { const k = show.indexOf(speaker); return k >= 0 ? <Bubble x={pos[k].x} y={pos[k].y - 34} text="🎙️ ใบ้!" w={40} cls="st-pop" /> : null; })()
        : show.length > 1 && <><Bubble x={pos[0].x} y={pos[0].y - 30} text="ที่นี่…?" w={38} cls="st-talk a" /><Bubble x={pos[show.length - 1].x} y={pos[show.length - 1].y - 30} text="อืม…" w={30} cls="st-talk b" />{show.length > 3 && <Bubble x={pos[Math.floor(show.length / 2)].x} y={pos[Math.floor(show.length / 2)].y - 30} text="!?" w={22} cls="st-talk c" />}</>}
      <g className="st-sweep"><circle cx="0" cy="0" r="13" fill="#cfe8ff" fillOpacity=".35" stroke="#ffd34d" strokeWidth="3.5" /><rect x="8" y="8" width="6" height="18" rx="2" fill="#8a5530" transform="rotate(-45 8 8)" /></g>
    </>}
    {mode === 'vote' && <>
      <g transform="translate(200 120)"><rect x="-30" y="0" width="60" height="32" rx="4" fill="#c9a46a" /><rect x="-30" y="0" width="60" height="7" fill="#a07a4a" /><rect x="-14" y="1" width="28" height="4" rx="2" fill="#2b1d10" /><text y="22" textAnchor="middle" fontSize="11" fontWeight="900" fill="#5a3a18" fontFamily="Kanit,sans-serif">VOTE</text>
        {[0, 1, 2].map(i => <g key={i} className={'st-slip s' + i}><rect x="-8" y="-40" width="16" height="11" rx="1.5" fill="#fff" /><path d="M-4 -35 l3 3 l5 -5" stroke="#e0525a" strokeWidth="1.6" fill="none" /></g>)}</g>
      {show.map((pid, i) => <Face key={pid} a={av?.(pid)} x={pos[i].x} y={pos[i].y} r={13} cls={done.includes(pid) ? '' : 'st-think'}>{done.includes(pid) && <g transform="translate(10 -10)"><circle r="6" fill="#5fd38d" /><path d="M-3 0 l2 2 l4 -4" stroke="#fff" strokeWidth="1.8" fill="none" /></g>}</Face>)}
    </>}
    {mode === 'caught' && <>
      <path d="M200 0 L150 160 L250 160 Z" fill="#fff4c9" opacity=".18" className="st-pulse" />
      <g transform="translate(200 116)"><SpyGuy cls="st-shake" /><g transform="translate(0 22)"><circle cx="-7" r="5" fill="none" stroke="#c9cdd8" strokeWidth="2.5" /><circle cx="7" r="5" fill="none" stroke="#c9cdd8" strokeWidth="2.5" /><path d="M-2 0 h4" stroke="#c9cdd8" strokeWidth="2" /></g></g>
      {show.map((pid, i) => <Face key={pid} a={av?.(pid)} x={pos[i].x} y={pos[i].y + 8} r={12} cls="st-jump" />)}
    </>}
    {mode === 'escape' && <>
      <rect x="340" y="88" width="34" height="62" rx="3" fill="#0d0a22" stroke="#6b5a8a" strokeWidth="3" /><rect x="344" y="92" width="26" height="54" fill="#fff4c9" opacity=".2" />
      <g className="st-runaway"><SpyGuy /><rect x="12" y="10" width="14" height="10" rx="2" fill="#6b4220" /><g stroke="#fff" strokeWidth="2" opacity=".6"><path d="M-30 0 h-12 M-28 10 h-16 M-30 20 h-10" /></g></g>
      {show.map((pid, i) => <Face key={pid} a={av?.(pid)} x={pos[i].x * 0.7 + 10} y={pos[i].y + 10} r={12} cls="st-shake" />)}
    </>}
  </Stage>;
}

// ---------- 🐺 แวร์วูฟ ----------
const Wolf = ({ cls = '', c = '#3a4266' }) => <g className={cls}><path d="M0 0 Q10 -14 30 -12 L40 -22 L44 -12 L54 -10 L58 -3 L49 -1 L45 5 L41 3 L38 16 L33 16 L33 5 L14 5 L12 16 L7 16 L5 3 Q-7 5 -16 -7 Q-6 -2 0 0 Z" fill={c} /><circle cx="46" cy="-11" r="1.8" fill="#ffd34d" className="st-blink" /></g>;
const Houses = ({ fill = '#0b1020', lit = '#ffd27a' }) => <g>
  {[[20, 112, 52], [86, 118, 44], [276, 114, 50], [338, 120, 46]].map(([x, y, w], i) => <g key={i}><path d={`M${x} ${y} L${x + w / 2} ${y - 22} L${x + w} ${y} Z`} fill={fill} /><rect x={x + 4} y={y} width={w - 8} height={150 - y} fill={fill} /><rect x={x + w / 2 - 5} y={y + 10} width="10" height="9" fill={lit} className={'st-win w' + i} /></g>)}</g>;
const Tomb = ({ x, y, cls = '' }) => <g transform={`translate(${x} ${y})`}><g className={cls}><path d="M-13 0 V-20 Q-13 -32 0 -32 Q13 -32 13 -20 V0 Z" fill="#8a8fa8" /><text y="-14" textAnchor="middle" fontSize="8" fontWeight="900" fill="#3a3f54" fontFamily="sans-serif">RIP</text><rect x="-17" y="-2" width="34" height="5" rx="2" fill="#4a5a2a" /></g></g>;
export function WolfStage({ mode, dead = 0 }) {
  const sky = { night: 'night', day: 'day', hunter: 'dawn', wolfWin: 'blood', villageWin: 'day', foolWin: 'day' }[mode] || 'night';
  const cap = { night: '🌙 หมาป่าออกล่า… ทุกคนหลับ', day: dead ? `☀️ เมื่อคืนมีคนตาย ${dead} คน — โหวตหาหมาป่า` : '☀️ เมื่อคืนไม่มีใครตาย — โหวตหาหมาป่า', hunter: '🏹 นายพรานยิงก่อนตาย!', foolWin: '🤪 คนบ้าชนะ! ทุกคนโดนหลอก', wolfWin: '🐺 หมาป่าครองหมู่บ้าน', villageWin: '🎉 ชาวบ้านจับหมาป่าได้หมด' }[mode];
  return <Stage kind="wolf" mode={mode} cap={cap} tone={mode === 'wolfWin' || mode === 'foolWin' || (mode === 'day' && dead) ? 'bad' : mode === 'villageWin' ? 'good' : ''}>
    <Sky id={'wf-' + mode} kind={sky} />
    <path d="M0 150 Q60 128 120 140 Q200 124 280 138 Q340 128 400 140 V150 H0 Z" fill={sky === 'day' ? '#4a7a3a' : '#0d1424'} />
    <Houses fill={sky === 'day' ? '#7a5a3a' : '#0b1020'} lit={sky === 'day' ? '#bfe3ff' : '#ffd27a'} />
    <Ground c={sky === 'day' ? '#5a8a3a' : '#0a0e1a'} />
    {mode === 'night' && <><g className="st-prowl"><Wolf /></g>{[[150, 140], [250, 136], [196, 144]].map(([x, y], i) => <g key={i} className={'st-eyes e' + i}><circle cx={x} cy={y} r="1.8" fill="#ffd34d" /><circle cx={x + 7} cy={y} r="1.8" fill="#ffd34d" /></g>)}</>}
    {mode === 'day' && <>
      {Array.from({ length: Math.min(dead, 3) }, (_, i) => <Tomb key={i} x={156 + i * 32} y={150} cls="st-riseup" />)}
      {[[130, '#c9a46a'], [168, '#6fb7ff'], [232, '#ff8fb3'], [270, '#9fd36a']].map(([x, c], i) => <Folk key={i} x={dead ? (x < 200 ? x - 50 : x + 50) : x} y={150} c={c} cls={'st-argue a' + i} />)}
      <Bubble x={dead ? 90 : 140} y={98} text="ใคร?!" w={34} cls="st-talk a" /><Bubble x={dead ? 312 : 262} y={98} text="ไม่ใช่ฉัน!" w={52} cls="st-talk b" />
      <g transform="translate(200 50)"><g className="st-gavel"><rect x="-4" y="0" width="8" height="30" rx="3" fill="#8a5530" /><rect x="-14" y="-10" width="28" height="12" rx="4" fill="#6b4220" /></g></g>
    </>}
    {mode === 'hunter' && <><Folk x={120} y={150} c="#4a7a3a" s={1.2} /><path d="M132 120 Q150 126 132 140" stroke="#8a5530" strokeWidth="3" fill="none" /><g className="st-arrow"><path d="M140 128 h28" stroke="#c9a46a" strokeWidth="2.5" /><path d="M168 124 l8 4 l-8 4 z" fill="#c9cdd8" /></g><g transform="translate(256 140)"><Wolf cls="st-shake" c="#5a6078" /></g></>}
    {mode === 'wolfWin' && <><path d="M180 150 Q190 104 230 98 Q276 100 290 150 Z" fill="#12040a" /><g transform="translate(206 96) scale(1.5)"><g className="st-howl"><Wolf c="#1a0a10" /></g></g><Bubble x={300} y={60} text="อาวววว~" w={50} cls="st-pop" dark /></>}
    {mode === 'foolWin' && <>{[[110, '#c9a46a'], [150, '#6fb7ff'], [250, '#ff8fb3'], [290, '#9fd36a']].map(([x, c], i) => <Folk key={i} x={x} y={150} c={c} cls={'st-argue a' + i} />)}
      <g transform="translate(200 150) scale(1.5)"><g className="st-laugh"><path d="M-10 0 Q-10 -16 0 -16 Q10 -16 10 0 Z" fill="#7a4ac8" /><circle cy="-23" r="8" fill="#ffd2a8" />
        <path d="M-7 -28 Q-12 -37 -18 -40 Q-8 -37 0 -31 Q8 -37 18 -40 Q12 -37 7 -28 Z" fill="#ff5f6d" /><circle cx="-18" cy="-40" r="2.4" fill="#ffd34d" /><circle cx="18" cy="-40" r="2.4" fill="#ffd34d" />
        <circle cx="-3" cy="-24" r="1.2" fill="#241c3a" /><circle cx="3" cy="-24" r="1.2" fill="#241c3a" /><path d="M-4 -20 Q0 -15 4 -20 Z" fill="#8a2a3a" /></g></g>
      <Bubble x={252} y={84} text="ฮ่า ๆ ๆ!" w={44} cls="st-pop" /></>}
    {mode === 'villageWin' && <>{[[120, '#c9a46a'], [160, '#6fb7ff'], [240, '#ff8fb3'], [280, '#9fd36a']].map(([x, c], i) => <g key={i}><Folk x={x} y={150} c={c} cls={'st-jump j' + i} /><g transform={`translate(${x + 10} 116)`}><rect x="-1.5" y="0" width="3" height="16" fill="#8a5530" /><path d="M0 -10 Q-6 -2 0 2 Q6 -2 0 -10 Z" fill="#ffb03a" className="st-flick" /></g></g>)}<g className="st-fleeaway"><Wolf c="#5a6078" /></g></>}
  </Stage>;
}

// ---------- 👻 จับผีปอป ----------
const Pop = ({ cls = '', s = 1 }) => <g transform={`scale(${s})`}><g className={cls}>
  <path d="M-20 -8 Q-23 -36 0 -40 Q23 -36 20 -8 Q24 16 18 40 L13 27 L8 44 L3 29 L-2 46 L-7 29 L-12 42 L-16 27 L-20 38 Q-24 16 -20 -8 Z" fill="#0b0808" />
  <path d="M-12 4 Q-17 28 -13 46 L-8 42 L-3 48 L2 42 L7 48 L11 42 L14 46 Q17 28 12 4 Z" fill="#e6efe0" opacity=".85" />
  <ellipse cy="-14" rx="12" ry="14" fill="#cfe6bf" /><path d="M-13 -19 Q-6 -26 0 -22 Q6 -26 13 -19 Q5 -21 0 -17 Q-5 -21 -13 -19 Z" fill="#0b0808" />
  <circle cx="-5" cy="-14" r="2.4" fill="#e0303a" /><circle cx="5" cy="-14" r="2.4" fill="#e0303a" />
  <path d="M-6 -5 Q0 0 6 -5 Q4 2 0 2 Q-4 2 -6 -5 Z" fill="#3a0d14" /><path d="M-2 0 Q-3 12 1 16 Q4 10 2 0 Z" fill="#e0525a" className="st-tongue" /></g></g>;
const Stilt = ({ x, w = 60, fill }) => <g fill={fill}><path d={`M${x} 104 L${x + w / 2} 80 L${x + w} 104 Z`} /><rect x={x + 5} y="102" width={w - 10} height="26" /><rect x={x + 8} y="126" width="4" height="24" /><rect x={x + w - 12} y="126" width="4" height="24" /><rect x={x + w / 2 - 2} y="126" width="4" height="24" /></g>;
export function CurseStage({ mode }) {
  const sky = { day: 'dusk', reveal: 'dusk', night: 'ghost', townWin: 'dawn', popWin: 'blood' }[mode] || 'dusk';
  const cap = { day: '🗣️ ซุบซิบใส่ความ หาตัวคนถูกปอปสิง', reveal: '⚖️ ไต่สวน! เปิดไพ่ดวง 1 ใบ', night: '🌑 คืนเดือนดับ — ผีปอปออกหากิน', townWin: '🌅 บ้านนาดงปลอดภัยแล้ว', popWin: '👻 ผีปอปกินทั้งหมู่บ้าน' }[mode];
  const dark = sky === 'ghost' || sky === 'blood';
  return <Stage kind="curse" mode={mode} cap={cap} tone={mode === 'popWin' || mode === 'night' ? 'bad' : mode === 'townWin' ? 'good' : ''}>
    <Sky id={'cu-' + mode} kind={sky} />
    <g fill={dark ? '#050a07' : '#3a1a14'} opacity=".9"><rect x="170" y="56" width="4" height="94" /><g transform="translate(172 56)">{[-60, -30, 0, 30, 60, 90, 120, 150, 180, 210].map(a => <path key={a} d="M0 0 L26 -5 L26 2 Z" transform={`rotate(${a})`} />)}</g></g>
    <Stilt x={14} fill={dark ? '#06100b' : '#4a2a1a'} /><Stilt x={318} w={64} fill={dark ? '#06100b' : '#4a2a1a'} />
    <Ground c={dark ? '#050a07' : '#3a2010'} />
    {mode === 'day' && <>
      {[[110, '#c9a46a'], [146, '#e6b07a'], [254, '#9fd36a'], [290, '#ff8fb3']].map(([x, c], i) => <Folk key={i} x={x} y={150} c={c} cls={'st-whisper a' + i} />)}
      <Bubble x={128} y={96} text="ซุบซิบ…" w={44} cls="st-talk a" /><Bubble x={272} y={96} text="คนนั้นแหละ!" w={58} cls="st-talk b" />
      <g className="st-pointing"><text x="200" y="110" textAnchor="middle" fontSize="22">👉</text></g>
    </>}
    {mode === 'reveal' && <>
      <path d="M200 0 L160 150 L240 150 Z" fill="#fff4c9" opacity=".15" className="st-pulse" />
      <g transform="translate(200 104)"><g className="st-flip"><rect x="-20" y="-28" width="40" height="56" rx="6" fill="#1d3a26" stroke="#a8f07a" strokeWidth="2.5" /><text y="4" textAnchor="middle" fontSize="20" fill="#c8ff9a" fontWeight="900" fontFamily="sans-serif">?</text></g></g>
      {[[120, '#c9a46a'], [280, '#9fd36a']].map(([x, c], i) => <Folk key={i} x={x} y={150} c={c} cls="st-think" />)}
    </>}
    {mode === 'night' && <><g className="st-float"><Pop s={0.9} /></g>
      <g transform="translate(84 150)"><Folk x={0} y={0} c="#f3efe0" /><rect x="10" y="-40" width="3" height="20" fill="#6b4220" transform="rotate(16 11 -30)" /><g transform="translate(16 -42)" className="st-flick"><path d="M0 -9 Q-5 -2 0 3 Q5 -2 0 -9 Z" fill="#ffcf5a" /></g><circle cx="16" cy="-42" r="18" fill="#ffcf5a" opacity=".12" /></g>
      {[[60, 70], [356, 160]].map(([x, y], i) => <g key={i} className={'st-wisp w' + i}><circle cx={x} cy={y} r="4" fill="#9ff07a" /><circle cx={x} cy={y} r="10" fill="#9ff07a" opacity=".15" /></g>)}</>}
    {mode === 'townWin' && <><g className="st-fadeup"><Pop s={0.7} /></g>{[[120, '#c9a46a'], [160, '#f3efe0'], [240, '#9fd36a'], [280, '#ff8fb3']].map(([x, c], i) => <Folk key={i} x={x} y={150} c={c} cls={'st-jump j' + i} />)}</>}
    {mode === 'popWin' && <g transform="translate(200 92)"><g className="st-laugh"><Pop s={1.25} /></g></g>}
  </Stage>;
}

// ---------- 🧭 ออกสำรวจ ----------
const Explorer = ({ x, y, c = '#c9a46a', cls = '', lantern }) => <g transform={`translate(${x} ${y}) scale(1.35)`}><g className={cls}>
  <path d="M-8 0 Q-8 -14 0 -14 Q8 -14 8 0 Z" fill={c} /><circle cy="-20" r="6.5" fill="#ffd2a8" /><path d="M-11 -24 h22 v-2 h-22 z M-6 -26 q6 -9 12 0 z" fill="#8a6a3a" />
  {lantern && <g className="st-swing"><path d="M8 -10 v6" stroke="#5a4a2a" strokeWidth="1.5" /><rect x="5" y="-4" width="7" height="9" rx="2" fill="#ffcf5a" /><circle cx="8.5" cy="0" r="9" fill="#ffcf5a" opacity=".2" /></g>}</g></g>;
export function ExploreStage({ mode, stage = 0, hist = [] }) {
  const xs = [52, 124, 196, 268, 340]; const at = xs[Math.min(4, stage)];
  const cap = { pick: '🚩 หัวหน้าคณะเลือกคนไปด่านนี้', approve: '🗳️ ทุกคนโหวต เห็นด้วย / ค้าน', mission: '🔦 คณะออกสำรวจ… ส่งการ์ดลับ', hunt: '🔍 โจรตามหาผู้ถือตะเกียง', win: '💰 นักสำรวจได้สมบัติ!', lose: '💥 โจรชนะ วิหารพัง!' }[mode];
  return <Stage kind="explore" mode={mode} cap={cap} tone={mode === 'win' ? 'good' : mode === 'lose' ? 'bad' : ''}>
    <Sky id={'ex-' + mode} kind={mode === 'hunt' || mode === 'lose' ? 'night' : 'jungle'} />
    <g fill="#0f2a1a" opacity=".8">{[[10, 120], [70, 108], [150, 116], [230, 104], [300, 114], [370, 106]].map(([x, h], i) => <path key={i} d={`M${x} 150 Q${x + 8} ${h} ${x + 28} ${h - 12} Q${x + 48} ${h} ${x + 56} 150 Z`} />)}</g>
    <g transform="translate(352 64)" fill="#6b5a3a"><path d="M-30 86 V20 L0 -10 L30 20 V86 Z" /><rect x="-10" y="40" width="20" height="46" fill="#2b1d10" /><path d="M-36 22 L0 -16 L36 22" stroke="#4a3d2a" strokeWidth="5" fill="none" /></g>
    <Ground c="#2c4a1a" />
    <path d={`M20 166 ${xs.map(x => `L${x} ${x % 2 ? 162 : 168}`).join(' ')} L390 164`} stroke="#c9a46a" strokeWidth="5" fill="none" strokeDasharray="2 8" strokeLinecap="round" opacity=".8" />
    {xs.map((x, i) => { const h = hist.find(v => v.stage === i); return <g key={i} transform={`translate(${x} 166)`}><g className={i === stage && !h && mode !== 'win' && mode !== 'lose' ? 'st-pulse' : ''}><circle r="8" fill={h ? (h.ok ? '#5fd38d' : '#ff5f6d') : i === stage ? '#ffcf5a' : '#3a4a2a'} stroke="#fff" strokeWidth="1.5" /><text y="1" textAnchor="middle" dominantBaseline="central" fontSize="8" fontWeight="900" fill="#1a1a1a" fontFamily="sans-serif">{h ? (h.ok ? '✓' : '✕') : i + 1}</text></g></g>; })}
    {mode === 'pick' && <><Explorer x={at} y={150} c="#ffb03a" /><g transform={`translate(${at + 10} 112)`}><g className="st-wave"><rect x="0" y="0" width="2.5" height="26" fill="#6b4220" /><path d="M2.5 0 h16 l-5 5 l5 5 h-16 z" fill="#ff5f6d" /></g></g>{[-26, 24].map((d, i) => <Explorer key={i} x={at + d} y={150} c={i ? '#6fb7ff' : '#9fd36a'} cls="st-think" />)}</>}
    {mode === 'approve' && <>{[-30, 0, 30].map((d, i) => <Explorer key={i} x={at + d} y={150} c={['#9fd36a', '#ffb03a', '#6fb7ff'][i]} />)}{[['👍', -30, 'a'], ['👎', 4, 'b'], ['👍', 32, 'c']].map(([e, d, k]) => <text key={k} x={at + d} y="110" textAnchor="middle" fontSize="16" className={'st-thumb ' + k}>{e}</text>)}</>}
    {mode === 'mission' && <g className="st-march">{[0, 24, 48].map((d, i) => <Explorer key={i} x={at - 40 + d} y={150} c={['#ffb03a', '#9fd36a', '#6fb7ff'][i]} cls={'st-step s' + i} lantern={i === 2} />)}</g>}
    {mode === 'hunt' && <><g className="st-search"><path d="M0 0 L-40 150 L40 150 Z" fill="#fff4c9" opacity=".16" /></g>{[-40, -10, 20, 50].map((d, i) => <Explorer key={i} x={200 + d} y={150} c={['#9fd36a', '#ffb03a', '#6fb7ff', '#c9a46a'][i]} cls="st-think" />)}</>}
    {mode === 'win' && <g transform="translate(352 140)"><circle r="40" fill="#ffd34d" opacity=".2" className="st-pulse" /><rect x="-16" y="-12" width="32" height="20" rx="3" fill="#8a5530" /><path d="M-16 -12 Q0 -26 16 -12 Z" fill="#a0643c" className="st-lid" /><g className="st-coins" fill="#ffd34d"><circle cx="-6" cy="-18" r="3" /><circle cx="4" cy="-22" r="3" /><circle cx="10" cy="-16" r="2.5" /></g></g>}
    {mode === 'lose' && <g transform="translate(352 64)">{[[-20, 0], [6, -10], [20, 6], [-6, 14]].map(([x, y], i) => <rect key={i} x={x} y={y} width="12" height="10" fill="#6b5a3a" className={'st-fall f' + i} />)}</g>}
  </Stage>;
}

// ---------- 🙈 คำบนหัว ----------
export function HeadStage({ mode, a, word, mine, others = [], av }) {
  const cap = mode === 'end' ? '🎉 จบเกม! ใครทายเก่งสุด' : mine ? '🙈 ตาคุณ! ถามได้ 1 คำถาม (ใช่/ไม่ใช่)' : '❓ เพื่อนกำลังถามหาคำบนหัว';
  const side = others.slice(0, 4);
  return <Stage kind="head" mode={mode} cap={cap} tone={mode === 'end' ? 'good' : ''}>
    <Sky id={'hd-' + mode} kind="party" />
    <g className="st-confetti">{Array.from({ length: 14 }, (_, i) => <rect key={i} x={(i * 29) % 400} y={(i * 17) % 60} width="5" height="3" fill={['#38d9c9', '#ffd23f', '#ff5fa2', '#fff'][i % 4]} className={'c' + (i % 4)} />)}</g>
    <Ground c="#3a1450" />
    {mode !== 'end' && <>
      <g transform="translate(200 120)"><g className="st-bob"><circle r="30" fill={`hsl(${a?.h ?? 250} 55% 42%)`} stroke="#fff" strokeOpacity=".6" strokeWidth="2" /><text textAnchor="middle" dominantBaseline="central" fontSize="34" y="2">{a?.e || '🙂'}</text>
        <g transform="translate(0 -46) rotate(-4)"><rect x="-44" y="-15" width="88" height="28" rx="4" fill="#fff6a8" stroke="#e8c84a" strokeWidth="1.5" /><rect x="-6" y="-19" width="12" height="7" rx="1.5" fill="#ffffffaa" /><text y="1" textAnchor="middle" dominantBaseline="central" fontSize={word && word.length > 8 ? 10 : 13} fontWeight="900" fill="#3a2a10" fontFamily="Kanit,sans-serif">{mine ? '???' : (word || '???').slice(0, 14)}</text></g></g></g>
      <g className="st-qmarks">{[['?', 150, 84, 'a'], ['?', 252, 80, 'b'], ['?', 238, 110, 'c']].map(([q, x, y, k]) => <text key={k} x={x} y={y} fontSize="18" fontWeight="900" fill="#fff" className={'st-q ' + k}>{q}</text>)}</g>
      {side.map((pid, i) => { const x = i < 2 ? 60 + i * 48 : 292 + (i - 2) * 48; return <g key={pid}><Face a={av?.(pid)} x={x} y={138} r={14} /><Bubble x={x} y={110} text={i % 2 ? 'ไม่ใช่ ✖' : 'ใช่ ✔'} w={44} cls={'st-talk ' + ['a', 'b', 'c', 'a'][i]} dark /></g>; })}
    </>}
    {mode === 'end' && <g transform="translate(200 110)"><circle r="40" fill="#ffd34d" opacity=".25" className="st-pulse" /><g className="st-bob"><circle r="22" fill="#ffd34d" stroke="#e8a92a" strokeWidth="3" /><text textAnchor="middle" dominantBaseline="central" fontSize="22" y="1">🏆</text></g></g>}
  </Stage>;
}

// ---------- ห้องรอ: ตัวอย่างฉากของเกม (ดูก่อนเล่นว่าเกมเป็นยังไง) ----------
export function LobbyStage({ gid, ids = [], av, Cake }) {
  if (gid === 'spyfall' || gid === 'spy') return <SpyStage game={gid} mode="talk" ids={ids} av={av} speaker={gid === 'spy' ? ids[0] : null} />;
  if (gid === 'werewolf') return <WolfStage mode="night" />;
  if (gid === 'explore') return <ExploreStage mode="mission" stage={1} hist={[{ stage: 0, ok: true }]} />;
  if (gid === 'curse') return <CurseStage mode="night" />;
  if (gid === 'headword') return <HeadStage mode="ask" a={av?.(ids[0])} word="ส้มตำ" others={ids.slice(1)} av={av} />;
  if (gid === 'cake' && Cake) return <Cake mode="vanish" hour={3} />;
  return null;
}
