// ไพ่ของเกมไพ่ (ทุเรียนตูม / จับผีปอป) — กรอบไพ่ + ภาพวาด SVG ของไพ่ทุกใบ
import React, { useState } from 'react';
import './cardgames.css';

import { CARD_ART } from './cardart.jsx';
export { CARD_ART };

// ---------- กรอบไพ่ ----------
// cat: สี/หมวดของไพ่ • back: ด้านหลัง
// ---------- ภาพการ์ดที่เจนจริง (public/cards/*.webp) — โหลดไม่ขึ้นจะกลับไปใช้ SVG ----------
export const CARD_SETS = {
  boom: [],   // ทุเรียนตูม/ผีปอป/ขุดสมบัติ กลับไปใช้ภาพวาด SVG (cardart.jsx)
  curse: [],
  deal: [],   // ปิดดีลกลับไปใช้ภาพ SVG (ภาพเจนหลุดธีม)
  dig: [],
  animal: ['ani_0', 'ani_1', 'ani_2', 'ani_3', 'ani_4', 'ani_5'],
  checkpoint: ['cp_pork', 'cp_ball', 'cp_tea', 'cp_shirt', 'cp_lamp', 'cp_spk', 'cp_pipe', 'cp_fire'],
};
const IMG_KEYS = new Set(Object.values(CARD_SETS).flat());
export const cardImg = k => (IMG_KEYS.has(k) ? `/cards/${k}.webp` : null);
export function CardImg({ k, className = '', fallback = null }) {
  const [bad, setBad] = useState(false); const src = cardImg(k);
  if (!src || bad) return fallback;
  return <img className={'card-img ' + className} src={src} alt="" decoding="async" draggable={false} onError={() => setBad(true)} />;
}
// โหลดภาพการ์ดของเกมไว้ก่อน จะได้ไม่มีภาพว่างตอนจั่ว
const loaded = new Set();
export function preloadCards(game) { (CARD_SETS[game] || []).forEach(k => { if (loaded.has(k)) return; loaded.add(k); const i = new Image(); i.src = cardImg(k); }); }

export function CardFace({ art, name, text, cat = 'act', tag, size = 'md', back, backKind = 'boom', selected, dim, onClick, badge, title, corner }) {
  const cls = `gcard ${size} cat-${cat}${selected ? ' sel' : ''}${dim ? ' dim' : ''}${back ? ' back back-' + backKind : ''}${onClick ? ' tap' : ''}`;
  const inner = back ? <div className="gc-back"><span>{backKind === 'boom' ? '📦' : '👻'}</span></div> : <>
    <div className="gc-top">{tag && <span className="gc-tag">{tag}</span>}</div>
    {corner && <svg className="gc-corner" viewBox="0 0 100 100" aria-hidden="true">{CARD_ART[art] ? React.createElement(CARD_ART[art]) : null}</svg>}
    <CardImg k={art} className="gc-art gc-img" fallback={<svg className="gc-art" viewBox="0 0 100 100" aria-hidden="true">{CARD_ART[art] ? React.createElement(CARD_ART[art]) : null}</svg>} />
    <div className="gc-cap"><b className="gc-name">{name}</b>
    {text && size !== 'sm' && <small className="gc-text">{text}</small>}</div>
  </>;
  return onClick ? <button type="button" className={cls} onClick={onClick} title={title || name}>{inner}{badge}</button> : <div className={cls} title={title || name}>{inner}{badge}</div>;
}
export const ArtSvg = ({ k, className = '' }) => <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{CARD_ART[k] ? React.createElement(CARD_ART[k]) : null}</svg>;
export const CardArt = ({ art, size = 56 }) => <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">{CARD_ART[art] ? React.createElement(CARD_ART[art]) : null}</svg>;
