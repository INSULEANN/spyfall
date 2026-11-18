// ภาพการ์ดเกม "ภาพนี้มีพิรุธ" — วาดเป็น SVG ใน src/picart*.jsx • PICS = [ชื่อภาพ]
import { ART } from './picart.jsx';
export const PICS = ART.map(a => [a[2]]);
export const PIC_N = PICS.length;
