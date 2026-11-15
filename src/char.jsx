// ตัวละครของผู้เล่น — หัวกลมตัวป้อม คนละสี แต่งได้: ทรงผม สีผม ตา ปาก (วาดเองทั้งหมดด้วย SVG)
// look = { hair, hc, eyes, mouth } (เลขลำดับในลิสต์ด้านล่าง) • สีตัว = เลข av เดิม (ห้ามซ้ำกันในห้อง)
import React, { useEffect, useState } from 'react';

const OL = '#20202a'; // เส้นขอบ
const SW = 2.4;

export const BODY_COLORS = [
  { n: 'ขาว', f: '#f4f4f7' }, { n: 'ชมพู', f: '#ffb6c9' }, { n: 'แดง', f: '#ff8080' }, { n: 'ส้ม', f: '#ffb46e' },
  { n: 'เหลือง', f: '#ffe17d' }, { n: 'มะนาว', f: '#cdef7f' }, { n: 'เขียว', f: '#86dda0' }, { n: 'มิ้นต์', f: '#82e4d6' },
  { n: 'ฟ้า', f: '#93d2ff' }, { n: 'น้ำเงิน', f: '#8fa9ff' }, { n: 'ม่วง', f: '#bba0ff' }, { n: 'ม่วงชมพู', f: '#e8a6ff' },
  { n: 'น้ำตาล', f: '#d6aa7e' }, { n: 'เทา', f: '#bcc0cc' }, { n: 'ครีม', f: '#fff0cc' }, { n: 'เทาเข้ม', f: '#7c8194' },
];
export const HAIR_COLORS = [
  { n: 'ดำ', f: '#2c2832' }, { n: 'น้ำตาลเข้ม', f: '#5c3b29' }, { n: 'น้ำตาล', f: '#9c6b3c' }, { n: 'บลอนด์', f: '#f3d06e' },
  { n: 'แดง', f: '#d9533f' }, { n: 'ชมพู', f: '#ff92ba' }, { n: 'ฟ้า', f: '#61b9ff' }, { n: 'ม่วง', f: '#9c6dff' },
  { n: 'ขาว', f: '#f3f3f3' }, { n: 'เขียว', f: '#5ec98c' },
];

// ---------- ทรงผม: back = วาดหลังตัว (ผมยาว) • front = วาดทับหัว ----------
const P = (d, c, k) => <path key={k} d={d} fill={c} stroke={OL} strokeWidth={SW} strokeLinejoin="round" />;
const mirror = d => <g transform="translate(100 0) scale(-1 1)">{d}</g>;
const sideLocks = c => <>{P('M21 42 C18 56 17 68 18 80 L27 78 C26 66 26 54 27 44 Z', c, 'l')}{P('M79 42 C82 56 83 68 82 80 L73 78 C74 66 74 54 73 44 Z', c, 'r')}</>;
const BANGS = 'M20 46 C18 24 32 13 50 13 C68 13 82 24 80 46 C76 36 70 31 63 30 L59 37 L55 30 L45 30 L41 37 L37 30 C30 31 24 36 20 46 Z';
const SWEPT = 'M20 46 C18 24 32 12 52 12 C70 12 82 24 80 42 C74 37 66 35 56 37 C46 39 36 35 30 31 C26 35 22 40 20 46 Z';
const CROWN = 'M20 42 C20 22 34 14 50 14 C66 14 80 22 80 42 C72 32 62 28 50 28 C38 28 28 32 20 42 Z';

export const HAIRS = [
  { n: 'หัวโล้น', g: 'm' },
  { n: 'รองทรงสั้น', g: 'm', front: c => P('M21 40 C22 22 35 14 50 14 C65 14 78 22 79 40 C70 32 60 29 50 29 C40 29 30 32 21 40 Z', c) },
  { n: 'แสกข้าง', g: 'm', front: c => P('M20 44 C18 22 34 12 52 13 C68 14 82 24 80 44 C78 36 74 31 68 29 C60 34 46 34 34 30 C28 34 24 38 20 44 Z', c) },
  { n: 'หนามตั้ง', g: 'm', front: c => P('M20 42 L17 28 L27 30 L25 16 L36 22 L40 8 L48 19 L56 7 L60 20 L71 11 L71 24 L83 22 L79 34 L81 42 C74 32 62 28 50 28 C38 28 27 33 20 42 Z', c) },
  { n: 'โมฮอว์ก', g: 'm', front: c => <>{P('M21 40 C22 24 35 16 50 16 C65 16 78 24 79 40 C70 33 60 30 50 30 C40 30 30 33 21 40 Z', c + '99', 'b')}{P('M43 30 L39 5 L49 12 L52 2 L58 11 L64 6 L58 30 C53 28 48 28 43 30 Z', c, 'm')}</> },
  { n: 'กะลาครอบ', g: 'm', front: c => P('M17 50 C15 22 32 11 50 11 C68 11 85 22 83 50 L75 50 C74 42 71 37 67 35 L33 35 C29 37 26 42 25 50 Z', c) },
  { n: 'หยิกฟู', g: 'm', front: c => <>{[[20, 40], [23, 26], [33, 16], [46, 11], [59, 12], [70, 18], [78, 29], [80, 41]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="10" fill={c} stroke={OL} strokeWidth={SW} />)}<path d="M18 40 C20 22 34 14 50 14 C66 14 80 22 82 40 C72 32 62 29 50 29 C38 29 28 32 18 40 Z" fill={c} /></> },
  { n: 'เสยหลัง', g: 'm', front: c => P('M21 40 C19 24 28 10 46 7 C62 4 77 9 81 21 C83 29 81 36 79 42 C74 31 62 27 50 27 C38 27 28 32 21 40 Z', c) },
  { n: 'มัดจุก', g: 'm', back: c => <circle cx="50" cy="11" r="8" fill={c} stroke={OL} strokeWidth={SW} />, front: c => P(CROWN, c) },
  { n: 'ยุ่ง ๆ', g: 'm', front: c => P('M20 46 C17 26 30 12 50 12 C70 12 84 26 80 46 L75 37 L71 43 L66 33 L60 41 L54 31 L48 40 L42 31 L36 41 L31 33 L26 42 Z', c) },
  { n: 'หมวกแก๊ป', g: 'm', front: c => <>{P('M19 40 C19 20 34 11 50 11 C66 11 81 20 81 40 Z', c, 'd')}{P('M12 40 C12 35 88 35 88 40 C88 46 12 46 12 40 Z', c, 'b')}<circle cx="50" cy="12" r="3" fill={OL} /></> },
  { n: 'แสกกลาง', g: 'm', front: c => P('M20 46 C18 24 32 13 50 13 C68 13 82 24 80 46 C77 38 72 32 64 30 C58 30 53 26 50 21 C47 26 42 30 36 30 C28 32 23 38 20 46 Z', c) },
  { n: 'ยาวตรง', g: 'f', back: c => P('M17 42 C17 20 32 11 50 11 C68 11 83 20 83 42 L85 98 L15 98 Z', c), front: c => <>{P(BANGS, c, 'f')}{sideLocks(c)}</> },
  { n: 'หางม้า', g: 'f', back: c => P('M72 20 C93 18 98 44 91 68 C89 75 84 77 82 72 C88 54 86 37 72 30 Z', c), front: c => <>{P(SWEPT, c, 'f')}<circle cx="77" cy="25" r="3.5" fill="#ff6b8a" stroke={OL} strokeWidth="1.6" /></> },
  { n: 'แกละ', g: 'f', back: c => <>{P('M25 28 C6 32 3 62 9 82 C13 87 18 83 16 76 C12 60 16 45 27 40 Z', c, 'l')}{mirror(P('M25 28 C6 32 3 62 9 82 C13 87 18 83 16 76 C12 60 16 45 27 40 Z', c, 'r'))}</>, front: c => <>{P(BANGS, c, 'f')}<circle cx="24" cy="31" r="3.5" fill="#ff6b8a" stroke={OL} strokeWidth="1.6" /><circle cx="76" cy="31" r="3.5" fill="#ff6b8a" stroke={OL} strokeWidth="1.6" /></> },
  { n: 'บ็อบ', g: 'f', back: c => P('M15 44 C15 20 32 10 50 10 C68 10 85 20 85 44 L86 72 C79 75 72 73 70 69 L30 69 C28 73 21 75 14 72 Z', c), front: c => P('M20 40 C21 22 35 13 50 13 C65 13 79 22 80 40 L80 37 L20 37 Z', c) },
  { n: 'มวยกลางหัว', g: 'f', back: c => <circle cx="50" cy="10" r="10" fill={c} stroke={OL} strokeWidth={SW} />, front: c => <>{P(CROWN, c, 'f')}{P('M42 15 Q50 19 58 15', 'none', 'k')}</> },
  { n: 'เปียคู่', g: 'f', front: c => <>{P('M20 46 C18 24 32 13 50 13 C68 13 82 24 80 46 C77 38 72 32 64 30 C58 30 53 26 50 21 C47 26 42 30 36 30 C28 32 23 38 20 46 Z', c, 'f')}{[0, 1].map(s => <g key={s} transform={s ? 'translate(100 0) scale(-1 1)' : ''}>{[60, 70, 80, 90].map(y => <ellipse key={y} cx="22" cy={y} rx="6" ry="6.5" fill={c} stroke={OL} strokeWidth={SW} />)}<circle cx="22" cy="98" r="3" fill="#ff6b8a" stroke={OL} strokeWidth="1.6" /></g>)}</> },
  { n: 'พิกซี่', g: 'f', front: c => P(SWEPT, c) },
  { n: 'ยาวลอน', g: 'f', back: c => P('M17 42 C15 20 32 10 50 10 C68 10 85 20 83 42 C89 53 81 61 87 73 C91 85 83 94 85 100 L15 100 C17 94 9 85 13 73 C19 61 11 53 17 42 Z', c), front: c => P(SWEPT, c) },
  { n: 'ฮิเมะ', g: 'f', back: c => P('M17 42 C17 20 32 11 50 11 C68 11 83 20 83 42 L84 98 L16 98 Z', c), front: c => <>{P('M20 40 C21 22 35 13 50 13 C65 13 79 22 80 40 L80 37 L20 37 Z', c, 'f')}{P('M20 38 L20 66 L29 66 L29 38 Z', c, 'l')}{P('M80 38 L80 66 L71 66 L71 38 Z', c, 'r')}</> },
  { n: 'หางม้าข้าง', g: 'f', back: c => P('M24 24 C6 28 4 52 12 74 C15 80 20 80 20 74 C15 56 18 40 30 32 Z', c), front: c => <>{P(SWEPT, c, 'f')}<circle cx="24" cy="29" r="3.5" fill="#ffd166" stroke={OL} strokeWidth="1.6" /></> },
  { n: 'ดังโงะ', g: 'f', back: c => <><circle cx="27" cy="17" r="10" fill={c} stroke={OL} strokeWidth={SW} /><circle cx="73" cy="17" r="10" fill={c} stroke={OL} strokeWidth={SW} /></>, front: c => P(BANGS, c) },
  { n: 'ยาวมัดครึ่ง', g: 'f', back: c => <>{P('M17 42 C17 20 32 11 50 11 C68 11 83 20 83 42 L85 96 L15 96 Z', c, 'h')}<circle cx="50" cy="12" r="7" fill={c} stroke={OL} strokeWidth={SW} /></>, front: c => P(SWEPT, c) },
];

// ---------- ตา (ซ้าย x=39 ขวา x=61, y=46) ----------
const pair = (f, y = 46) => <>{f(39, y, 0)}{f(61, y, 1)}</>;
const dot = (x, y, r = 3.4) => <g><ellipse cx={x} cy={y} rx={r * 0.85} ry={r * 1.2} fill={OL} /><circle cx={x + 1} cy={y - 1.6} r={r * 0.35} fill="#fff" /></g>;
const arc = (x, y, up = true) => <path d={up ? `M${x - 5} ${y + 1.5} Q${x} ${y - 5} ${x + 5} ${y + 1.5}` : `M${x - 5} ${y - 1} Q${x} ${y + 4} ${x + 5} ${y - 1}`} fill="none" stroke={OL} strokeWidth="2.6" strokeLinecap="round" />;
const star = (x, y, r = 5.5) => { const p = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; return `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`; }).join(' '); return <polygon points={p} fill="#ffd23f" stroke={OL} strokeWidth="1.4" strokeLinejoin="round" />; };
const heart = (x, y) => <path d={`M${x} ${y + 4.5} C${x - 7} ${y} ${x - 5} ${y - 6} ${x} ${y - 2.5} C${x + 5} ${y - 6} ${x + 7} ${y} ${x} ${y + 4.5} Z`} fill="#ff4d6d" stroke={OL} strokeWidth="1.4" />;
export const EYES = [
  { n: 'จุด', d: () => pair((x, y) => dot(x, y)) },
  { n: 'กลมโต', d: () => pair((x, y) => <g><circle cx={x} cy={y} r="5.4" fill={OL} /><circle cx={x + 1.8} cy={y - 2} r="1.9" fill="#fff" /><circle cx={x - 1.6} cy={y + 2} r=".9" fill="#fff" /></g>) },
  { n: 'ยิ้มตาหยี', d: () => pair((x, y) => arc(x, y)) },
  { n: 'ขยิบตา', d: () => <>{dot(39, 46)}{arc(61, 46)}</> },
  { n: 'ง่วง', d: () => pair((x, y) => arc(x, y, false)) },
  { n: 'วิบวับ', d: () => pair((x, y) => <g><circle cx={x} cy={y} r="6" fill={OL} /><circle cx={x + 2} cy={y - 2.2} r="2.2" fill="#fff" /><circle cx={x - 2} cy={y + 2.4} r="1.1" fill="#fff" /><path d={`M${x + 6} ${y - 8} l1 2 l2 1 l-2 1 l-1 2 l-1 -2 l-2 -1 l2 -1 Z`} fill="#ffd23f" /></g>) },
  { n: 'ขนตางอน', d: () => pair((x, y, s) => <g>{dot(x, y, 3.6)}<path d={s ? `M${x + 2} ${y - 4} l3 -3 M${x + 3.5} ${y - 1.5} l4 -1.5` : `M${x - 2} ${y - 4} l-3 -3 M${x - 3.5} ${y - 1.5} l-4 -1.5`} stroke={OL} strokeWidth="1.8" strokeLinecap="round" /></g>) },
  { n: 'ขึงขัง', d: () => pair((x, y, s) => <g>{dot(x, y + 1)}<path d={s ? `M${x - 5} ${y - 7} L${x + 5} ${y - 5}` : `M${x - 5} ${y - 5} L${x + 5} ${y - 7}`} stroke={OL} strokeWidth="2.6" strokeLinecap="round" transform={`rotate(${s ? -14 : 14} ${x} ${y - 6})`} /></g>) },
  { n: 'ตาดาว', d: () => pair((x, y) => star(x, y)) },
  { n: 'ตาหัวใจ', d: () => pair((x, y) => heart(x, y)) },
  { n: 'แว่นกลม', d: () => <>{pair((x, y) => <g><circle cx={x} cy={y} r="8" fill="#ffffff55" stroke={OL} strokeWidth="2.2" /><circle cx={x} cy={y} r="2.6" fill={OL} /></g>)}<path d="M47 45 Q50 43 53 45" fill="none" stroke={OL} strokeWidth="2.2" /></> },
  { n: 'แว่นดำ', d: () => <>{pair((x, y) => <rect x={x - 8} y={y - 5} width="16" height="10" rx="4" fill="#1c1c24" stroke={OL} strokeWidth="2" />)}<path d="M47 45 L53 45" stroke={OL} strokeWidth="2.4" /><path d="M33 43 l4 -1" stroke="#ffffff88" strokeWidth="1.6" strokeLinecap="round" /></> },
  { n: 'ตาแมว', d: () => pair((x, y) => <g><path d={`M${x - 6} ${y} Q${x} ${y - 7} ${x + 6} ${y} Q${x} ${y + 7} ${x - 6} ${y} Z`} fill="#ffe46b" stroke={OL} strokeWidth="1.8" /><ellipse cx={x} cy={y} rx="1.4" ry="4.4" fill={OL} /></g>) },
  { n: 'ตกใจ', d: () => pair((x, y) => <g><circle cx={x} cy={y} r="5.5" fill="#fff" stroke={OL} strokeWidth="2" /><circle cx={x} cy={y} r="1.8" fill={OL} /></g>) },
  { n: 'ชำเลือง', d: () => pair((x, y) => <g><ellipse cx={x} cy={y} rx="6" ry="4.4" fill="#fff" stroke={OL} strokeWidth="2" /><circle cx={x + 2.6} cy={y} r="2.4" fill={OL} /></g>) },
  { n: 'ซึ้งน้ำตาคลอ', d: () => pair((x, y, s) => <g>{arc(x, y, false)}{s ? <path d={`M${x + 4} ${y + 3} q2 4 0 6 q-2 -2 0 -6 Z`} fill="#6cc4ff" stroke={OL} strokeWidth="1.2" /> : null}</g>) },
];

// ---------- ปาก (กลางที่ 50,60) ----------
const L = (d, w = 2.6) => <path d={d} fill="none" stroke={OL} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;
export const MOUTHS = [
  { n: 'ยิ้ม', d: () => L('M43 58 Q50 64.5 57 58') },
  { n: 'ยิ้มกว้าง', d: () => <><path d="M41 57 Q50 70 59 57 Z" fill="#8a2433" stroke={OL} strokeWidth="2.2" strokeLinejoin="round" /><path d="M45 63.5 Q50 60 55 63.5 Q50 67 45 63.5 Z" fill="#ff7d8f" /></> },
  { n: 'ยิ้มมุมปาก', d: () => L('M44 60 Q52 63 58 56') },
  { n: 'ปากโอ', d: () => <ellipse cx="50" cy="60" rx="3.2" ry="4.2" fill="#8a2433" stroke={OL} strokeWidth="2" /> },
  { n: 'ปากแมว', d: () => L('M43 58 Q46.5 62.5 50 58 Q53.5 62.5 57 58') },
  { n: 'แลบลิ้น', d: () => <>{L('M42 58 Q50 63 58 58')}<path d="M47 60.5 L47 65 Q50 69 53 65 L53 60.5" fill="#ff7d8f" stroke={OL} strokeWidth="1.8" /></> },
  { n: 'ยิงฟัน', d: () => <><rect x="41" y="56" width="18" height="8" rx="3.5" fill="#fff" stroke={OL} strokeWidth="2" /><path d="M41.5 60 L58.5 60 M47 56.5 L47 63.5 M53 56.5 L53 63.5" stroke={OL} strokeWidth="1.2" /></> },
  { n: 'เฉย ๆ', d: () => L('M44 60 L56 60') },
  { n: 'เศร้า', d: () => L('M43 62 Q50 56 57 62') },
  { n: 'เบี้ยว', d: () => L('M42 60 Q45 57 48 60 Q51 63 54 60 Q57 57 58 60', 2.2) },
  { n: 'หัวเราะ', d: () => <><path d="M39 56 Q50 74 61 56 Z" fill="#8a2433" stroke={OL} strokeWidth="2.2" strokeLinejoin="round" /><path d="M41 57 L59 57 L58 60 L42 60 Z" fill="#fff" /><path d="M45 66 Q50 62 55 66 Q50 69 45 66 Z" fill="#ff7d8f" /></> },
  { n: 'จุ๊บ', d: () => <path d="M50 63 C45 61 45 56 48.5 57 Q50 58 51.5 57 C55 56 55 61 50 63 Z" fill="#ff5a7a" stroke={OL} strokeWidth="1.6" /> },
  { n: 'เขี้ยว', d: () => <>{L('M42 57 Q50 64 58 57')}<path d="M45 59.2 L46.5 63.5 L48 60.6 Z M52 60.6 L53.5 63.5 L55 59.2 Z" fill="#fff" stroke={OL} strokeWidth="1.1" strokeLinejoin="round" /></> },
  { n: 'ลิปแดง', d: () => <path d="M42 59 Q46 55 50 57.5 Q54 55 58 59 Q50 66 42 59 Z" fill="#e8344f" stroke={OL} strokeWidth="1.6" strokeLinejoin="round" /> },
];

const clampI = (v, n) => (Number.isInteger(v) && v >= 0 && v < n ? v : 0);
export const fixLook = l => ({ hair: clampI(l?.hair, HAIRS.length), hc: clampI(l?.hc, HAIR_COLORS.length), eyes: clampI(l?.eyes, EYES.length), mouth: clampI(l?.mouth, MOUTHS.length) });
export const randomLook = () => ({ hair: Math.floor(Math.random() * HAIRS.length), hc: Math.floor(Math.random() * HAIR_COLORS.length), eyes: Math.floor(Math.random() * EYES.length), mouth: Math.floor(Math.random() * MOUTHS.length) });
// คนที่ยังไม่เคยแต่ง (เช่น เครื่องเวอร์ชันเก่า): สุ่มจาก id ให้ทุกเครื่องเห็นเหมือนกัน
export const lookFromId = id => { let h = 7; for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; const r = k => { h = (h * 1103515245 + 12345) >>> 0; return h % k; }; return { hair: r(HAIRS.length), hc: r(HAIR_COLORS.length), eyes: r(EYES.length), mouth: r(MOUTHS.length) }; };

// ตัวละคร: full = ทั้งตัว (หน้าแต่งตัว) • ไม่งั้นครึ่งตัว (รูปโปรไฟล์ในวงกลม)
export function Char({ look, color = 0, full = false, size }) {
  const l = fixLook(look); const body = (BODY_COLORS[color] || BODY_COLORS[0]).f; const hc = HAIR_COLORS[l.hc].f; const H = HAIRS[l.hair];
  return <svg viewBox={full ? '4 0 92 160' : '8 6 84 84'} width={size} height={full ? size * 160 / 92 : size} className="char" aria-hidden="true">
    {H.back?.(hc)}
    {full ? <g>
      <rect x="34" y="122" width="14" height="28" rx="6" fill={body} stroke={OL} strokeWidth={SW} />
      <rect x="52" y="122" width="14" height="28" rx="6" fill={body} stroke={OL} strokeWidth={SW} />
      <ellipse cx="40" cy="151" rx="9" ry="4.5" fill={body} stroke={OL} strokeWidth={SW} /><ellipse cx="60" cy="151" rx="9" ry="4.5" fill={body} stroke={OL} strokeWidth={SW} />
      <rect x="29" y="68" width="42" height="64" rx="19" fill={body} stroke={OL} strokeWidth={SW} />
      <path d="M27 97 C24 86 34 83 50 88 C66 83 76 86 73 97 C71 106 60 104 50 100 C40 104 29 106 27 97 Z" fill={body} stroke={OL} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M38 92 C45 92 52 95 58 99" fill="none" stroke={OL} strokeWidth="1.8" strokeLinecap="round" />
    </g> : <path d="M22 100 C22 82 34 72 50 72 C66 72 78 82 78 100 Z" fill={body} stroke={OL} strokeWidth={SW} />}
    <circle cx="50" cy="44" r="30" fill={body} stroke={OL} strokeWidth={SW} />
    <ellipse cx="31" cy="54" rx="4.5" ry="2.4" fill="#ff8fa3" opacity=".55" /><ellipse cx="69" cy="54" rx="4.5" ry="2.4" fill="#ff8fa3" opacity=".55" />
    <g transform="translate(0 -2)">{EYES[l.eyes].d()}{MOUTHS[l.mouth].d()}</g>
    {H.front?.(hc)}
  </svg>;
}

// ---------- หน้าแต่งตัว ----------
const TABS = [['color', '🎨 สีตัว'], ['hair', '💇 ทรงผม'], ['hc', '🖌️ สีผม'], ['eyes', '👀 ตา'], ['mouth', '👄 ปาก']];
export function CharEditor({ color, look, takenBy = {}, onSave, onClose }) {
  const [c, setC] = useState(color ?? 0); const [l, setL] = useState(fixLook(look)); const [tab, setTab] = useState('hair'); const [g, setG] = useState('all');
  useEffect(() => { const k = e => e.key === 'Escape' && onClose(); document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k); }, []);
  const set = (k, v) => setL(x => ({ ...x, [k]: v }));
  const freeColors = BODY_COLORS.map((_, i) => i).filter(i => !takenBy[i]);
  const shuffleAll = () => { setL(randomLook()); if (freeColors.length) setC(freeColors[Math.floor(Math.random() * freeColors.length)]); };
  const opt = (key, i, label, node, extra = '') => <button key={i} type="button" className={'chopt' + extra + ((key === 'color' ? c : l[key]) === i ? ' me' : '')} onClick={() => (key === 'color' ? setC(i) : set(key, i))} title={label}>{node}<span>{label}</span></button>;
  let items;
  if (tab === 'color') items = BODY_COLORS.map((x, i) => { const who = takenBy[i]; return <button key={i} type="button" className={'chopt' + (c === i ? ' me' : '') + (who ? ' taken' : '')} disabled={!!who} onClick={() => setC(i)} title={who ? `${x.n} — ${who} ใช้อยู่` : x.n}><Char look={l} color={i} size={56} /><span>{who || x.n}</span></button>; });
  else if (tab === 'hair') items = HAIRS.map((x, i) => (g === 'all' || x.g === g) && opt('hair', i, x.n, <Char look={{ ...l, hair: i }} color={c} size={56} />));
  else if (tab === 'hc') items = HAIR_COLORS.map((x, i) => opt('hc', i, x.n, <Char look={{ ...l, hc: i, hair: l.hair || 2 }} color={c} size={56} />));
  else if (tab === 'eyes') items = EYES.map((x, i) => opt('eyes', i, x.n, <span className="ch-zoom"><Char look={{ ...l, eyes: i }} color={c} size={56} /></span>));
  else items = MOUTHS.map((x, i) => opt('mouth', i, x.n, <span className="ch-zoom m"><Char look={{ ...l, mouth: i }} color={c} size={56} /></span>));
  return <div className="avpick-bg" onClick={onClose} role="dialog" aria-label="แต่งตัวละคร">
    <div className="avpick chedit" onClick={e => e.stopPropagation()}>
      <div className="avpick-head"><div><b>แต่งตัวละคร</b><small>จำไว้ในเครื่องนี้ ใช้ได้ทุกห้องทุกเกม • สีตัวที่คนอื่นในห้องใช้อยู่เลือกไม่ได้</small></div><button className="icon-btn" onClick={onClose} aria-label="ปิด">✕</button></div>
      <div className="ch-main">
        <div className="ch-stage"><Char look={l} color={c} full size={118} /><button type="button" className="secondary ch-rand" onClick={shuffleAll}>🎲 สุ่ม</button></div>
        <div className="ch-side">
          <div className="ch-tabs">{TABS.map(([k, t]) => <button key={k} type="button" className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{t}</button>)}</div>
          {tab === 'hair' && <div className="ch-g">{[['all', 'ทั้งหมด'], ['m', '👦 ชาย'], ['f', '👧 หญิง']].map(([k, t]) => <button key={k} type="button" className={g === k ? 'on' : ''} onClick={() => setG(k)}>{t}</button>)}</div>}
          <div className="ch-grid">{items}</div>
        </div>
      </div>
      <button className="primary wide" onClick={() => onSave(c, l)}>✅ ใช้ตัวละครนี้</button>
    </div>
  </div>;
}
