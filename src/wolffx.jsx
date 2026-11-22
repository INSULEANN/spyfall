// อนิเมชันเหตุการณ์ในแวร์วูฟ ใช้ตัวละครของผู้เล่นจริง — เด้งกลางจอพร้อมกันทุกเครื่อง แตะเพื่อข้าม
//   bite  : หมาป่าวิ่งมากัดคอ → ล้มลง (4.7 วิ)
//   save  : หมาป่าพุ่งมา แต่หมอยาวิ่งมาฉีดยาช่วยไว้ (4.8 วิ) — ไม่บอกว่าใครถูกกัด (กันข้อมูลรั่ว) ใช้ตัวปริศนาแทน
//   vote  : ค้อนตุลาการทุบ → ถูกประหาร (3.9 วิ)
//   shot  : นายพรานยิงธนู → ล้มลง (3.5 วิ)
//   heart : หัวใจแตก ตรอมใจตายตามคู่รัก (3 วิ)
//   calm  : เช้านี้ไม่มีใครตาย / ไม่มีใครถูกประหาร (2.4 วิ)
import React, { useEffect, useRef, useState } from 'react';
import { Char } from './char.jsx';
import './wolffx.css';

export const FX_MS = { bite: 4700, save: 4800, vote: 3900, shot: 3500, heart: 3000, calm: 2400 };
const OL = '#2a2340';

const Wolf = () => <svg viewBox="0 0 124 84" className="wfx-wolf-svg" aria-hidden="true">
  <path d="M26 46 C10 40 4 24 12 16 C15 28 22 36 32 41 Z" fill="#6f7891" stroke={OL} strokeWidth="2.6" strokeLinejoin="round" />
  {[34, 46, 66, 78].map((x, i) => <rect key={x} className={'wfx-leg l' + (i % 2)} x={x} y="56" width="9" height="22" rx="4.5" fill="#6f7891" stroke={OL} strokeWidth="2.6" />)}
  <ellipse cx="56" cy="48" rx="33" ry="18" fill="#7d8699" stroke={OL} strokeWidth="2.6" />
  <ellipse cx="60" cy="54" rx="18" ry="8" fill="#a9b1c2" />
  <g className="wfx-head">
    <path d="M80 22 L82 4 L93 17 Z M93 19 L99 4 L104 21 Z" fill="#6f7891" stroke={OL} strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="92" cy="34" r="17" fill="#7d8699" stroke={OL} strokeWidth="2.6" />
    <path d="M100 28 L120 35 L101 44 Z" fill="#a9b1c2" stroke={OL} strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="119" cy="35" r="3" fill={OL} />
    <circle cx="95" cy="29" r="2.6" fill="#ffd23f" stroke={OL} strokeWidth="1.2" /><path d="M89 24 L100 27" stroke={OL} strokeWidth="2.6" strokeLinecap="round" />
    <path className="wfx-teeth" d="M103 41 l2 4 l2 -3.4 l2 3.4 l2 -4.4" fill="#fff" stroke={OL} strokeWidth="1.2" strokeLinejoin="round" />
  </g>
</svg>;

const Syringe = () => <svg viewBox="0 0 60 20" className="wfx-syr" aria-hidden="true">
  <rect x="14" y="5" width="30" height="10" rx="2" fill="#e8f6ff" stroke={OL} strokeWidth="2" /><rect x="16" y="7" width="16" height="6" fill="#6cd4a0" />
  <path d="M44 10 L58 10" stroke={OL} strokeWidth="2" /><rect x="6" y="7" width="8" height="6" fill="#bfc6d6" stroke={OL} strokeWidth="2" /><path d="M2 3 L2 17" stroke={OL} strokeWidth="3" strokeLinecap="round" />
</svg>;
const NurseCap = () => <svg viewBox="0 -8 100 140" className="wfx-nurse" aria-hidden="true"><path d="M32 6 C40 -6 60 -6 68 6 L66 14 C56 10 44 10 34 14 Z" fill="#fff" stroke={OL} strokeWidth="2.2" strokeLinejoin="round" /><path d="M47 1 h6 v3 h3 v6 h-3 v3 h-6 v-3 h-3 v-6 h3 z" fill="#ff4d5e" /></svg>;
// ค้อนตั้งตรง: ปลายด้ามบน = จุดหมุน (แขวนที่ .wfx-gvarm) หัวค้อนอยู่ล่าง
const Gavel = () => <svg viewBox="0 0 100 290" className="wfx-gavel" aria-hidden="true"><rect x="44" y="0" width="12" height="236" rx="6" fill="#a0673a" stroke={OL} strokeWidth="2.6" /><rect x="8" y="226" width="84" height="54" rx="12" fill="#8a5530" stroke={OL} strokeWidth="3" /><rect x="8" y="238" width="84" height="8" fill="#c99a62" /><rect x="8" y="260" width="84" height="8" fill="#c99a62" /></svg>;
const Arrow = () => <svg viewBox="0 0 80 16" className="wfx-arrow-svg" aria-hidden="true"><path d="M4 8 L66 8" stroke="#7a4b25" strokeWidth="4" strokeLinecap="round" /><path d="M64 2 L78 8 L64 14 Z" fill="#c9ced8" stroke={OL} strokeWidth="1.6" /><path d="M2 2 L10 8 L2 14 M8 2 L16 8 L8 14" fill="none" stroke="#ff5d6c" strokeWidth="2" /></svg>;

// ตัวละครในฉาก: who = id ผู้เล่น (ใช้หน้าตาจริง) หรือ null = ตัวปริศนา
// โครง: .wfx-actor (ตำแหน่ง + ล้ม) > .wfx-body (โยก/สั่น/บี้) — แยกชั้นเพื่อให้ท่าซ้อนกันได้ไม่ทับกัน
function Actor({ who, av, cls = '', children }) {
  const a = who ? av(who) : { look: { hair: 0, hc: 0, eyes: 13, mouth: 3 }, c: 13 };
  return <div className={'wfx-actor ' + cls}><i className="wfx-shadow" /><div className="wfx-body"><Char look={a.look} color={a.c} full size={92} mood={cls.includes('victim') ? 'shock' : undefined} />{!who && <b className="wfx-q">?</b>}</div>{children}</div>;
}

// ---------- ชิ้นส่วนฉาก (วาดเอง SVG) ----------
const Soul = () => <div className="wfx-soul"><svg viewBox="0 0 40 52" aria-hidden="true">
  <path d="M20 2 C33 2 37 14 37 27 C37 38 34 45 30 48 C28 44 25 48 22 46 C19 48 16 44 13 48 C8 45 3 38 3 27 C3 14 7 2 20 2 Z" fill="#fff" fillOpacity=".88" stroke="#cdd5ff" strokeWidth="2" />
  <path d="M12 23 q3 3 6 0 M22 23 q3 3 6 0" stroke={OL} strokeWidth="2" fill="none" strokeLinecap="round" />
  <ellipse cx="20" cy="31" rx="2.4" ry="2" fill={OL} opacity=".7" />
  <ellipse cx="20" cy="-4" rx="10" ry="3" fill="none" stroke="#ffd23f" strokeWidth="2.4" />
</svg></div>;
const Alert = ({ cls = '' }) => <svg viewBox="0 0 34 40" className={'wfx-alert ' + cls} aria-hidden="true">
  <path d="M17 2 C27 2 32 8 32 16 C32 24 27 29 20 30 L17 38 L14 30 C7 29 2 24 2 16 C2 8 7 2 17 2 Z" fill="#fff" stroke={OL} strokeWidth="2.2" strokeLinejoin="round" />
  <path d="M17 8 L17 19" stroke="#ff4d5e" strokeWidth="4.4" strokeLinecap="round" /><circle cx="17" cy="24.5" r="2.6" fill="#ff4d5e" />
</svg>;
const Sweat = () => <svg viewBox="0 0 14 20" className="wfx-sweat" aria-hidden="true"><path d="M7 1 C10 7 13 10 13 13.5 C13 17 10.3 19 7 19 C3.7 19 1 17 1 13.5 C1 10 4 7 7 1 Z" fill="#8fd3ff" stroke={OL} strokeWidth="1.6" /><ellipse cx="5" cy="13" rx="1.6" ry="2.4" fill="#fff" opacity=".8" /></svg>;
const Claws = () => <svg viewBox="0 0 80 80" className="wfx-claws" aria-hidden="true">
  {[0, 1, 2].map(i => <path key={i} className={'wfx-claw c' + i} pathLength="1" d={`M${14 + i * 18} 8 C${22 + i * 18} 30 ${20 + i * 18} 52 ${10 + i * 18} 74`} stroke="#ff2d4a" strokeWidth="7" fill="none" strokeLinecap="round" />)}
</svg>;
const Dizzy = () => <div className="wfx-dizzy"><div className="wfx-dizzy-ring">{[0, 1, 2, 3].map(i => <svg key={i} viewBox="0 0 20 20" style={{ '--a': i * 90 + 'deg' }} aria-hidden="true"><path d="M10 1 L12.6 7.2 L19 7.6 L14 11.8 L15.7 18.4 L10 14.8 L4.3 18.4 L6 11.8 L1 7.6 L7.4 7.2 Z" fill="#ffd23f" stroke={OL} strokeWidth="1.4" strokeLinejoin="round" /></svg>)}</div></div>;
const Dust = ({ cls = '' }) => <div className={'wfx-dust ' + cls}>{[0, 1, 2, 3, 4].map(i => <i key={i} style={{ '--i': i }} />)}</div>;

const Tree = ({ x, y, s = 1, c }) => <path d={`M${x} ${y - 120 * s} L${x + 34 * s} ${y - 50 * s} L${x + 18 * s} ${y - 50 * s} L${x + 44 * s} ${y} L${x - 44 * s} ${y} L${x - 18 * s} ${y - 50 * s} L${x - 34 * s} ${y - 50 * s} Z`} fill={c} />;
const House = ({ x, w = 70, h = 54, c, win = '#ffd877', lit = true }) => <g>
  <rect x={x} y={250 - h} width={w} height={h} fill={c} />
  <path d={`M${x - 8} ${250 - h} L${x + w / 2} ${250 - h - 30} L${x + w + 8} ${250 - h} Z`} fill={c} />
  <rect className={lit ? 'wfx-win' : ''} x={x + w * .2} y={250 - h + 14} width={w * .22} height={16} rx="2" fill={win} />
  <rect className={lit ? 'wfx-win d' : ''} x={x + w * .58} y={250 - h + 14} width={w * .22} height={16} rx="2" fill={win} />
</g>;

// คืนในหมู่บ้าน: พระจันทร์ ดาว ป่ามืด ตาหมาป่าในพุ่มไม้
const NightBack = () => <svg className="wfx-back" viewBox="0 0 560 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs><linearGradient id="wfxNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d1233" /><stop offset=".75" stopColor="#2a2f66" /><stop offset="1" stopColor="#4a3a6e" /></linearGradient>
    <radialGradient id="wfxMoon"><stop offset=".5" stopColor="#fff6cf" stopOpacity=".35" /><stop offset="1" stopColor="#fff6cf" stopOpacity="0" /></radialGradient></defs>
  <rect width="560" height="320" fill="url(#wfxNight)" />
  <circle cx="452" cy="62" r="70" fill="url(#wfxMoon)" />
  <circle cx="452" cy="62" r="30" fill="#fff3c4" /><circle cx="442" cy="55" r="5" fill="#eadca6" /><circle cx="462" cy="72" r="7" fill="#eadca6" /><circle cx="458" cy="48" r="3" fill="#eadca6" />
  {[[40, 30], [110, 70], [170, 24], [250, 56], [320, 20], [380, 90], [520, 120], [210, 110], [80, 120], [530, 30]].map(([x, y], i) => <circle key={i} className="wfx-star" style={{ animationDelay: (i * .23) % 1.6 + 's' }} cx={x} cy={y} r={i % 3 ? 1.6 : 2.4} fill="#fff" />)}
  <path d="M0 200 C80 160 150 180 230 170 C320 158 400 190 560 160 L560 260 L0 260 Z" fill="#1c2350" />
  <House x={300} c="#141a3d" /><House x={390} w={60} h={46} c="#141a3d" /><House x={470} w={76} h={60} c="#141a3d" />
  <Tree x={40} y={262} s={1.15} c="#0f1530" /><Tree x={110} y={262} s={.9} c="#121a3a" /><Tree x={-6} y={262} s={.8} c="#121a3a" />
  <g className="wfx-eyes"><ellipse cx="70" cy="226" rx="5" ry="3" fill="#ffd23f" /><ellipse cx="88" cy="226" rx="5" ry="3" fill="#ffd23f" /></g>
  <rect y="250" width="560" height="70" fill="#22402f" /><path d="M0 250 H560" stroke="#183024" strokeWidth="4" />
  {[[150, 262], [260, 280], [420, 266], [500, 290]].map(([x, y], i) => <path key={i} d={`M${x} ${y} l4 -10 l4 10 l4 -8 l3 8`} fill="none" stroke="#2f5a3f" strokeWidth="2.4" strokeLinecap="round" />)}
</svg>;

// ลานหมู่บ้านกลางวัน: ฝูงชนชูคราด/คบเพลิง
const Mob = ({ x, c, tool, d }) => <g className="wfx-mob" style={{ animationDelay: d + 's' }}>
  {tool === 'fork' ? <g stroke="#5b3a22" strokeWidth="3.4" strokeLinecap="round" fill="none"><path d={`M${x + 20} 252 L${x + 20} 158`} /><path d={`M${x + 11} 172 L${x + 11} 160 Q${x + 20} 166 ${x + 29} 160 L${x + 29} 172 M${x + 20} 160 L${x + 20} 150`} stroke="#8a93a6" /></g>
    : <g><path d={`M${x + 20} 252 L${x + 20} 166`} stroke="#5b3a22" strokeWidth="4" strokeLinecap="round" /><path className="wfx-flame" d={`M${x + 20} 142 C${x + 30} 154 ${x + 28} 166 ${x + 20} 168 C${x + 12} 166 ${x + 10} 154 ${x + 20} 142 Z`} fill="#ff9a3c" /></g>}
  <path d={`M${x} 252 C${x - 2} 214 ${x + 6} 196 ${x + 20} 196 C${x + 34} 196 ${x + 42} 214 ${x + 40} 252 Z`} fill={c} />
  <path d={`M${x + 11} 214 l6 3 M${x + 29} 214 l-6 3`} stroke="#ffffffaa" strokeWidth="2.4" strokeLinecap="round" />
</g>;
const DayBack = () => <svg className="wfx-back" viewBox="0 0 560 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs><linearGradient id="wfxDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4f8fd6" /><stop offset="1" stopColor="#bfe4ff" /></linearGradient></defs>
  <rect width="560" height="320" fill="url(#wfxDay)" />
  <g className="wfx-sunrays" style={{ transformOrigin: '80px 58px' }}>{Array.from({ length: 10 }, (_, i) => <path key={i} d="M80 58 L74 8 L86 8 Z" fill="#ffe58a" opacity=".55" transform={`rotate(${i * 36} 80 58)`} />)}</g>
  <circle cx="80" cy="58" r="26" fill="#ffd84d" stroke="#ffb72e" strokeWidth="3" />
  <g className="wfx-cloud"><ellipse cx="300" cy="50" rx="38" ry="14" fill="#fff" /><ellipse cx="326" cy="42" rx="24" ry="14" fill="#fff" /><ellipse cx="280" cy="44" rx="18" ry="11" fill="#fff" /></g>
  <g className="wfx-cloud s"><ellipse cx="470" cy="84" rx="30" ry="11" fill="#fff" opacity=".9" /><ellipse cx="488" cy="77" rx="18" ry="11" fill="#fff" opacity=".9" /></g>
  <path d="M0 196 C120 176 220 192 300 182 C400 170 480 190 560 178 L560 252 L0 252 Z" fill="#7fbf6a" />
  <House x={18} c="#c98a5a" win="#5c3b29" lit={false} /><House x={470} w={74} h={58} c="#b8744a" win="#5c3b29" lit={false} />
  <Mob x={78} c="#5a4a7a" tool="fork" d={0} /><Mob x={126} c="#6a5340" tool="torch" d={.15} /><Mob x={376} c="#4a5d7a" tool="torch" d={.3} /><Mob x={424} c="#6a4058" tool="fork" d={.08} />
  <rect y="250" width="560" height="70" fill="#c9a36a" /><path d="M0 250 H560" stroke="#a5814e" strokeWidth="4" />
  {[[60, 276], [150, 296], [330, 290], [450, 272], [520, 300]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="14" ry="5" fill="#b38f58" />)}
</svg>;

// ชายป่าตอนเย็น: พระอาทิตย์ตก ต้นสน
const DuskBack = () => <svg className="wfx-back" viewBox="0 0 560 320" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs><linearGradient id="wfxDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b2a6c" /><stop offset=".6" stopColor="#d4607a" /><stop offset="1" stopColor="#ffb36b" /></linearGradient></defs>
  <rect width="560" height="320" fill="url(#wfxDusk)" />
  <circle cx="300" cy="212" r="52" fill="#ffcf6b" opacity=".9" />
  {[[60, 40], [160, 70], [470, 36], [520, 90]].map(([x, y], i) => <circle key={i} className="wfx-star" style={{ animationDelay: i * .4 + 's' }} cx={x} cy={y} r="1.6" fill="#fff" />)}
  <path d="M0 214 C90 196 170 210 260 204 C360 196 450 214 560 200 L560 252 L0 252 Z" fill="#5b2f5a" />
  <Tree x={30} y={256} s={1.3} c="#3a1f45" /><Tree x={500} y={256} s={1.25} c="#3a1f45" /><Tree x={548} y={256} s={.9} c="#43264f" /><Tree x={200} y={250} s={.6} c="#4a2a55" /><Tree x={410} y={250} s={.7} c="#4a2a55" />
  <rect y="250" width="560" height="70" fill="#4b5a2c" /><path d="M0 250 H560" stroke="#36421f" strokeWidth="4" />
</svg>;

const Hat = () => <svg viewBox="0 -8 100 140" className="wfx-hat" aria-hidden="true"><path d="M14 12 C30 6 70 6 86 12 L82 18 C66 14 34 14 18 18 Z" fill="#6b4a2b" stroke={OL} strokeWidth="2.2" strokeLinejoin="round" /><path d="M28 12 C30 -6 70 -6 72 12 Z" fill="#7d5a35" stroke={OL} strokeWidth="2.2" strokeLinejoin="round" /><path d="M66 2 C76 -10 84 -6 86 -2 C80 -2 72 2 68 6 Z" fill="#ff5d6c" stroke={OL} strokeWidth="1.6" /></svg>;
const Bow = () => <svg viewBox="0 0 40 110" className="wfx-bow" aria-hidden="true">
  <path d="M8 4 C34 22 34 88 8 106" fill="none" stroke="#7a4b25" strokeWidth="5" strokeLinecap="round" />
  <path className="wfx-string" d="M8 4 L8 106" stroke="#efe6d2" strokeWidth="1.6" />
</svg>;

function Scene({ ev, av, nameOf }) {
  const name = ev.who ? nameOf(ev.who) : '';
  // กัด: คืนมืด → ตาเรืองแสงในพุ่มไม้ → เหยื่อสะดุ้ง → หมาป่าวิ่งฝุ่นตลบ → กระโจน (กล้องดันเข้า) → งับ! แฟลช+รอยข่วน → ล้ม → วิญญาณลอย → หมาป่าหนี
  if (ev.kind === 'bite') return <div className="wfx-scene bite"><div className="wfx-cam"><div className="wfx-shk">
    <NightBack />
    <Actor who={ev.who} av={av} cls="victim"><Alert /><Claws /></Actor><Soul />
    <Dust cls="run" />
    <div className="wfx-wolf"><Wolf /></div>
    <b className="wfx-pop chomp">งับ!</b>
  </div></div><i className="wfx-flash" /><i className="wfx-vignette" />
    <p className="wfx-cap">🩸 <b>{name}</b> ถูกหมาป่ากัดตายเมื่อคืน{ev.role ? ` (${ev.role})` : ''}</p></div>;
  if (ev.kind === 'save') return <div className="wfx-scene save">
    <Actor who={null} av={av} cls="victim" />
    <div className="wfx-wolf"><Wolf /></div>
    <div className="wfx-doc"><Char look={{ hair: 0, hc: 0, eyes: 2, mouth: 0 }} color={0} full size={92} /><NurseCap /><Syringe /></div>
    <b className="wfx-pop poke">ฉึก! 💉</b>
    <span className="wfx-sparkle">✨</span>
    <p className="wfx-cap">💉 หมาป่ามาจู่โจม แต่<b>หมอยาช่วยไว้ทัน!</b> เมื่อคืนไม่มีใครตาย</p>
  </div>;
  // โหวต: ฝูงชนโห่ → เหยื่อเหงื่อตก → ค้อนยักษ์ง้างแล้วเหวี่ยงโค้งลงมา → โป๊ก! จอสั่น ฝุ่นกระจาย ตัวแบน → ดาวหมุนรอบหัว → ล้ม → วิญญาณ
  if (ev.kind === 'vote') return <div className="wfx-scene vote"><div className="wfx-cam"><div className="wfx-shk">
    <DayBack />
    <b className="wfx-shout s1">ออกไป!</b><b className="wfx-shout s2">โหวต!</b>
    <Actor who={ev.who} av={av} cls="victim"><Sweat /><Dizzy /></Actor><Soul />
    <Dust cls="ring" />
    <div className="wfx-gvarm"><Gavel /></div>
    <b className="wfx-pop bonk">โป๊ก!</b>
  </div></div><i className="wfx-flash" />
    <p className="wfx-cap">⚖️ หมู่บ้านโหวตประหาร <b>{name}</b>{ev.role ? ` (${ev.role})` : ''}</p></div>;
  // ธนู: นายพรานง้างสาย → ปล่อย (ตึ๋ง) → ลูกธนูพุ่งมีเส้นความเร็ว → ฉึก! ปักติดตัว → เซถอย → ล้มหงาย → วิญญาณ
  if (ev.kind === 'shot') return <div className="wfx-scene shot"><div className="wfx-cam"><div className="wfx-shk">
    <DuskBack />
    <div className="wfx-hunter"><Char look={{ hair: 0, hc: 1, eyes: 4, mouth: 6 }} color={12} full size={92} /><Hat /><Bow /><div className="wfx-nock"><Arrow /></div></div>
    <b className="wfx-twang">ตึ๋ง!</b>
    <Actor who={ev.who} av={av} cls="victim"><Alert cls="late" /><div className="wfx-stuck"><Arrow /></div></Actor><Soul />
    <div className="wfx-arrow"><Arrow /><i className="wfx-trail" /></div>
    <b className="wfx-pop thwack">ฉึก!</b>
  </div></div><i className="wfx-flash" />
    <p className="wfx-cap">🏹 นายพรานยิงพา <b>{name}</b> ไปด้วย{ev.role ? ` (${ev.role})` : ''}</p></div>;
  if (ev.kind === 'heart') return <div className="wfx-scene heart">
    <Actor who={ev.who} av={av} cls="victim" />
    <span className="wfx-hrt l">💔</span>
    <p className="wfx-cap">💔 <b>{name}</b> ตรอมใจตายตามคู่รัก</p>
  </div>;
  return <div className="wfx-scene calm"><span className="wfx-sun">{ev.day ? '☀️' : '🕊️'}</span><p className="wfx-cap">{ev.text}</p></div>;
}

// items = [{ key, events }] — key ใหม่ที่ไม่เคยเห็น = ต่อคิวเล่น (ตอนเปิดหน้า/รีเฟรช ไม่เล่นย้อนของเก่า) แล้วเล่นทีละฉาก
export function WolfFx({ items, av, nameOf, onSound }) {
  const [q, setQ] = useState([]); const seen = useRef(null);
  const sig = items.map(x => x.key).join('|');
  useEffect(() => {
    if (!seen.current) { seen.current = new Set(items.map(x => x.key)); return; }
    const fresh = items.filter(x => x.key && !seen.current.has(x.key)); if (!fresh.length) return;
    fresh.forEach(x => seen.current.add(x.key));
    setQ(cur => [...cur, ...fresh.flatMap(x => x.events.map((e, i) => ({ ...e, k: x.key + ':' + i })))]);
  }, [sig]);
  const cur = q[0];
  useEffect(() => { if (!cur) return; onSound?.(cur.kind); const t = setTimeout(() => setQ(x => x.slice(1)), FX_MS[cur.kind] || 3000); return () => clearTimeout(t); }, [cur?.k]);
  if (!cur) return null;
  return <div className="wfx" onClick={() => setQ(x => x.slice(1))} role="status"><div className="wfx-stage" key={cur.k}>
    <div className={'wfx-sky ' + (cur.kind === 'vote' || cur.kind === 'shot' || cur.day ? 'day' : 'dawn')} />
    <div className="wfx-ground" />
    <Scene ev={cur} av={av} nameOf={nameOf} />
    <small className="wfx-skip">แตะเพื่อข้าม{q.length > 1 ? ` • อีก ${q.length - 1} ฉาก` : ''}</small>
  </div></div>;
}
