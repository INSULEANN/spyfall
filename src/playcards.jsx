// ไพ่มาตรฐาน 52 ใบ วาดด้วย SVG ในโค้ด (ไม่มีไฟล์รูป) + หลังไพ่ CSS + ชิป — ใช้ร่วมกันในป๊อกเด้ง / โป๊กเกอร์
// รหัสไพ่ = อันดับ + ดอก เช่น 'AS' 'TD' '9H' (T = 10) • S ♠ H ♥ D ♦ C ♣
import React from 'react';
import './casino.css';

export const RANKS = '23456789TJQKA', SUITS = 'SHDC';
export const fullDeck = () => { const d = []; for (const s of SUITS) for (const r of RANKS) d.push(r + s); return d; };
export const shuffleDeck = d => { const a = [...d]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const RED = { H: 1, D: 1 };
const RTXT = r => (r === 'T' ? '10' : r);

// รูปดอกในกรอบ 10×10
const SUIT_PATH = {
  H: 'M5 9.4C5 9.4 0 6 0 3C0 1.3 1.3 0 2.8 0C3.8 0 4.6.6 5 1.5C5.4.6 6.2 0 7.2 0C8.7 0 10 1.3 10 3C10 6 5 9.4 5 9.4Z',
  D: 'M5 0L9 5L5 10L1 5Z',
  S: 'M5 0C5 0 10 3.4 10 6.2C10 7.8 8.8 8.8 7.5 8.8C6.6 8.8 5.9 8.4 5.5 7.8C5.6 8.8 6.2 9.6 7 10H3C3.8 9.6 4.4 8.8 4.5 7.8C4.1 8.4 3.4 8.8 2.5 8.8C1.2 8.8 0 7.8 0 6.2C0 3.4 5 0 5 0Z',
  C: 'M5 0A2.45 2.45 0 0 1 7.2 3.6A2.45 2.45 0 1 1 5.6 7.6C5.7 8.7 6.2 9.5 7 10H3C3.8 9.5 4.3 8.7 4.4 7.6A2.45 2.45 0 1 1 2.8 3.6A2.45 2.45 0 0 1 5 0Z',
};
const Pip = ({ s, x, y, k = 1, flip }) => <path d={SUIT_PATH[s]} transform={`translate(${x} ${y})${flip ? ' rotate(180)' : ''} scale(${k}) translate(-5 -5)`} />;
// ตำแหน่งดอกบนหน้าไพ่ 2–10 (กรอบ 100×140)
const L = 31, M = 50, R = 69;
const PIPS = {
  2: [[M, 30], [M, 110]], 3: [[M, 30], [M, 70], [M, 110]], 4: [[L, 30], [R, 30], [L, 110], [R, 110]],
  5: [[L, 30], [R, 30], [M, 70], [L, 110], [R, 110]], 6: [[L, 30], [R, 30], [L, 70], [R, 70], [L, 110], [R, 110]],
  7: [[L, 30], [R, 30], [M, 50], [L, 70], [R, 70], [L, 110], [R, 110]], 8: [[L, 30], [R, 30], [M, 50], [L, 70], [R, 70], [M, 90], [L, 110], [R, 110]],
  9: [[L, 30], [R, 30], [L, 57], [R, 57], [M, 70], [L, 83], [R, 83], [L, 110], [R, 110]],
  10: [[L, 30], [R, 30], [M, 44], [L, 57], [R, 57], [L, 83], [R, 83], [M, 96], [L, 110], [R, 110]],
};
// หน้าคน J Q K: ครึ่งบน แล้วกลับหัวเป็นครึ่งล่างแบบไพ่จริง
function Royal({ r, s, ink }) {
  const robe = RED[s] ? '#c8283a' : '#23345e', trim = '#e8b23a', alt = RED[s] ? '#23345e' : '#c8283a';
  const hat = r === 'K' ? <path d="M38 33L41 21L46 28L50 18L54 28L59 21L62 33Z" fill={trim} stroke="#7a5212" strokeWidth=".8" />
    : r === 'Q' ? <><path d="M40 33Q50 20 60 33Z" fill={trim} stroke="#7a5212" strokeWidth=".8" /><circle cx="50" cy="23" r="2.2" fill={alt} /></>
      : <path d="M39 33Q42 22 52 23Q61 24 62 31L64 33Z" fill={alt} stroke="#14203a" strokeWidth=".8" />;
  const half = <g>
    <path d="M27 70Q30 48 50 46Q70 48 73 70Z" fill={robe} /><path d="M44 47L50 70L56 47" fill={trim} opacity=".9" />
    <path d="M27 70Q30 58 36 52" stroke={trim} strokeWidth="2.4" fill="none" /><path d="M73 70Q70 58 64 52" stroke={trim} strokeWidth="2.4" fill="none" />
    {r === 'Q' && <path d="M38 34Q34 46 40 50M62 34Q66 46 60 50" stroke="#6b3a18" strokeWidth="3" fill="none" />}
    <ellipse cx="50" cy="38" rx="10.5" ry="11" fill="#f6d2b0" stroke="#7a4b2a" strokeWidth=".7" />
    {hat}
    <circle cx="46" cy="38" r="1.1" fill="#2a1a10" /><circle cx="54" cy="38" r="1.1" fill="#2a1a10" />
    {r === 'K' ? <path d="M42 44Q50 52 58 44Q55 49 50 49Q45 49 42 44Z" fill="#8a5a2a" /> : <path d="M47 44Q50 46 53 44" stroke="#b8323e" strokeWidth="1.2" fill="none" />}
    <Pip s={s} x={r === 'J' ? 33 : 67} y={58} k={1.1} />
  </g>;
  return <g>
    <rect x="21" y="20" width="58" height="100" rx="4" fill="#fff6e0" stroke={ink} strokeWidth="1.2" />
    <clipPath id={`rc${r}${s}`}><rect x="21" y="20" width="58" height="100" rx="4" /></clipPath>
    <g clipPath={`url(#rc${r}${s})`}>{half}<g transform="rotate(180 50 70)">{half}</g></g>
    <path d="M21 70H79" stroke={ink} strokeWidth=".8" opacity=".5" />
  </g>;
}
export function CardFaceSvg({ c }) {
  const r = c[0], s = c[1], ink = RED[s] ? '#c8102e' : '#16181d', n = r === 'A' ? 1 : r === 'T' ? 10 : +r;
  return <svg viewBox="0 0 100 140" className="pc-svg" aria-label={RTXT(r) + s}>
    <rect x="1" y="1" width="98" height="138" rx="9" fill="#fffdf8" />
    <g fill={ink}>
      <text x="9" y="22" className="pc-idx">{RTXT(r)}</text><Pip s={s} x={14} y={32} k={.8} />
      <g transform="rotate(180 50 70)"><text x="9" y="22" className="pc-idx">{RTXT(r)}</text><Pip s={s} x={14} y={32} k={.8} /></g>
      {r === 'A' ? <><Pip s={s} x={50} y={70} k={s === 'S' ? 3.4 : 2.6} />{s === 'S' && <circle cx="50" cy="70" r="31" fill="none" stroke={ink} strokeWidth=".8" opacity=".25" />}</>
        : 'JQK'.includes(r) ? <Royal r={r} s={s} ink={ink} />
          : PIPS[n].map(([x, y], i) => <Pip key={i} s={s} x={x} y={y} k={1.5} flip={y > 72} />)}
    </g>
  </svg>;
}
// ไพ่ 1 ใบ: up = หงาย • deal = เล่นอนิเมชันแจก (ลำดับ i) • พลิกแบบ 3 มิติเมื่อ up เปลี่ยน
export function PCard({ c, up = true, size = 'md', i = 0, deal, hi, dim, onClick, style }) {
  return <div className={`pc pc-${size}${up && c ? ' up' : ''}${deal ? ' deal' : ''}${hi ? ' hi' : ''}${dim ? ' dim' : ''}${onClick ? ' tap' : ''}`} style={{ '--i': i, ...style }} onClick={onClick}>
    <div className="pc-in"><div className="pc-f">{c ? <CardFaceSvg c={c} /> : null}</div><div className="pc-b"><span /></div></div>
  </div>;
}
// ชิปกองเล็ก ๆ + ตัวเลข
const CHIP_COL = [[500, '#7b3fe4'], [100, '#16181d'], [25, '#1f8f4e'], [5, '#d42a3c'], [1, '#e9e4d8']];
export function Chips({ n, cls = '' }) {
  if (!n) return null; let left = n; const st = [];
  for (const [v, col] of CHIP_COL) while (left >= v && st.length < 5) { st.push(col); left -= v; }
  return <span className={'chipz ' + cls}><span className="chipz-st">{st.map((col, i) => <i key={i} style={{ '--c': col, '--k': i }} />)}</span><b>{n.toLocaleString()}</b></span>;
}
// ตำแหน่งที่นั่งรอบโต๊ะวงรี (ฉันอยู่ล่างกลางเสมอ) → [left%, top%]
export function seatPos(k, n) {
  const a = Math.PI / 2 + (2 * Math.PI * k) / n; return [50 + 43 * Math.cos(a), 50 + 39 * Math.sin(a)];
}

// ---------- ชิปต่อเนื่องข้ามวง ----------
// room.bank[kind] = { start, chips:{id:n} } เก็บตอนจบวง → วงต่อไปใช้ต่อ • คนมาใหม่ (ตาไหนก็ได้) ได้ชิปเท่าตอนเริ่ม (start)
// r.base = ชิปตอนเริ่มนั่งในวงนี้ → กำไรวงนี้ = ชิปตอนนี้ − base − ที่ซื้อเพิ่ม
export function seatChips(r, id) {
  r.base = r.base || {}; if (r.chips[id] == null) r.chips[id] = r.start; if (r.base[id] == null) r.base[id] = r.chips[id]; if (r.buys[id] == null) r.buys[id] = 0;
}
export const netOf = (r, id, extra = 0) => (r.chips[id] || 0) + extra - (r.base?.[id] || 0) - r.start * (r.buys[id] || 0);
export function BankInfo({ bank, nameOf, isHost, onReset }) {
  if (!bank?.chips) return null; const ids = Object.keys(bank.chips).sort((a, b) => bank.chips[b] - bank.chips[a]);
  return <div className="ct-bank"><b>💰 ชิปต่อจากวงก่อน (เริ่มต้นคนละ {bank.start.toLocaleString()} • คนมาใหม่ได้เท่านี้)</b>
    <div>{ids.map(id => <span key={id}>{nameOf ? nameOf(id) : id} <i>{bank.chips[id].toLocaleString()}</i></span>)}</div>
    {isHost && <button type="button" className="link-btn" onClick={() => { if (confirm('รีเซ็ตชิปทุกคนกลับเป็นค่าเริ่มต้น?')) onReset(); }}>รีเซ็ตชิปทุกคน</button>}</div>;
}
