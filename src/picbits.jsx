// ชิ้นส่วนเล็ก ๆ ที่ใช้ซ้ำในภาพการ์ด "ภาพนี้มีพิรุธ" (viewBox 120x160)
import React from 'react';

// ดาว: p = [x,y, x,y, ...]
export const Stars = ({ p, f = '#fff', r = .8 }) => <g fill={f}>{p.map((v, i) => i % 2 ? null : <circle key={i} cx={v} cy={p[i + 1]} r={i % 3 ? r : r * 1.5} />)}</g>;
// เมฆปุย
export const Cloud = ({ x, y, s = 1, f = '#fff', o = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} fill={f} opacity={o}><ellipse cx="0" cy="0" rx="14" ry="7" /><circle cx="-6" cy="-4" r="7" /><circle cx="5" cy="-6" r="8" /></g>;
// แสงเรือง
export const Glow = ({ x, y, r = 20, f = '#ffd86b', o = .14 }) => { const id = 'gl' + f.slice(1) + String(o).replace('.', ''); return <g><defs><radialGradient id={id}><stop stopColor={f} stopOpacity={Math.min(1, o * 4)} /><stop offset="1" stopColor={f} stopOpacity="0" /></radialGradient></defs><circle cx={x} cy={y} r={r} fill={`url(#${id})`} /></g>; };
// ต้นสน
export const Pine = ({ x, y, s = 1, f = '#13223a' }) => <path transform={`translate(${x} ${y}) scale(${s})`} fill={f} d="M0-30L10-10H5L13 4H-13L-5-10H-10Z" />;
// นกบิน (ตัว V)
export const Bird = ({ x, y, s = 1, c = '#222' }) => <path transform={`translate(${x} ${y}) scale(${s})`} d="M-6 0Q-3-4 0 0Q3-4 6 0" fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" />;
// เส้นฝน/เส้นตรงหลายเส้น: p = [x1,y1,x2,y2, ...]
export const Lines = ({ p, c = '#fff', w = 1, o = 1 }) => <g stroke={c} strokeWidth={w} opacity={o} strokeLinecap="round">{p.map((v, i) => i % 4 ? null : <line key={i} x1={v} y1={p[i + 1]} x2={p[i + 2]} y2={p[i + 3]} />)}</g>;
// กระดานหมากรุก (แถวง่าย ๆ)
export const Checker = ({ y, h = 12, cols = 6, rows = 3, a = '#2b2b2b', b = '#e9e2d0' }) => <g>{Array.from({ length: rows * cols }, (_, i) => { const r = i / cols | 0, c = i % cols, w = 120 / cols; return <rect key={i} x={c * w} y={y + r * h} width={w} height={h} fill={(r + c) % 2 ? a : b} />; })}</g>;
