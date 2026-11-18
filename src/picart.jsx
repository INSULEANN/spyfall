// ภาพการ์ดเกม "ภาพนี้มีพิรุธ" — วาดเป็น SVG ล้วน (แนวการ์ตูน/ภาพวาด หลายอารมณ์) • สัดส่วน 3:4
import React from 'react';
import { ART1 } from './picart1.jsx';
import { ART2 } from './picart2.jsx';
import { ART3 } from './picart3.jsx';
import { ART4 } from './picart4.jsx';
import { ART5 } from './picart5.jsx';
import { ART6 } from './picart6.jsx';
import { ART7 } from './picart7.jsx';
import { ART8 } from './picart8.jsx';

import { HD } from './picartHD.jsx';
import { HD2 } from './picartHD2.jsx';
import { HD3 } from './picartHD3.jsx';
import { HD4 } from './picartHD4.jsx';
import { HD5 } from './picartHD5.jsx';
import { HD6 } from './picartHD6.jsx';
import { HD7 } from './picartHD7.jsx';
import { HD8 } from './picartHD8.jsx';
import { HD9 } from './picartHD9.jsx';
import { HD10 } from './picartHD10.jsx';
import { HD11 } from './picartHD11.jsx';
import { HD12 } from './picartHD12.jsx';
import { HD13 } from './picartHD13.jsx';
import { HD14 } from './picartHD14.jsx';
import { HD15 } from './picartHD15.jsx';
import { HD16 } from './picartHD16.jsx';
import { HD17 } from './picartHD17.jsx';
import { HD18 } from './picartHD18.jsx';
import { HD19 } from './picartHD19.jsx';
import { HD20 } from './picartHD20.jsx';
import { HD21 } from './picartHD21.jsx';
import { HD22 } from './picartHD22.jsx';
import { HD23 } from './picartHD23.jsx';
import { HD24 } from './picartHD24.jsx';
import { HD25 } from './picartHD25.jsx';
import { HD26 } from './picartHD26.jsx';

export const ART = [...ART1, ...ART2, ...ART3, ...ART4, ...ART5, ...ART6, ...ART7, ...ART8];
// ภาพแบบละเอียด (picartHD.jsx) ใช้แทนภาพเดิมเลขเดียวกัน
const HD_MAP = Object.fromEntries([...HD, ...HD2, ...HD3, ...HD4, ...HD5, ...HD6, ...HD7, ...HD8, ...HD9, ...HD10, ...HD11, ...HD12, ...HD13, ...HD14, ...HD15, ...HD16, ...HD17, ...HD18, ...HD19, ...HD20, ...HD21, ...HD22, ...HD23, ...HD24, ...HD25, ...HD26].map(([n, , svg]) => [n, svg]));

export function PicSvg({ n }) {
  if (HD_MAP[n]) return HD_MAP[n];
  const a = ART[n - 1]; if (!a) return null;
  const id = 'pg' + n;
  return <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg" role="img" aria-label={a[2]}>
    <defs><linearGradient id={id} x2="0" y2="1"><stop stopColor={a[0]} /><stop offset="1" stopColor={a[1]} /></linearGradient></defs>
    <rect width="120" height="160" fill={`url(#${id})`} />{a[3]}
  </svg>;
}
