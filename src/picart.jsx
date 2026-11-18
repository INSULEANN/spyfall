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

export const ART = [...ART1, ...ART2, ...ART3, ...ART4, ...ART5, ...ART6, ...ART7, ...ART8];

export function PicSvg({ n }) {
  const a = ART[n - 1]; if (!a) return null;
  const id = 'pg' + n;
  return <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="pic-svg" role="img" aria-label={a[2]}>
    <defs><linearGradient id={id} x2="0" y2="1"><stop stopColor={a[0]} /><stop offset="1" stopColor={a[1]} /></linearGradient></defs>
    <rect width="120" height="160" fill={`url(#${id})`} />{a[3]}
  </svg>;
}
