// ชิ้นส่วนหน้าจอที่ทุกเกมใช้ร่วมกัน — ให้หน้าตาระหว่างเล่นเหมือนกันทุกเกม อ่านง่าย กดง่าย
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Art } from './play-art.jsx';
import { Char, BODY_COLORS, fixLook, lookFromId } from './char.jsx';

// ---------- รูปโปรไฟล์ผู้เล่น: เลือกเองได้ 30 แบบ (เก็บใน players/{id}/av = เลขรูป) ----------
// ใช้เฉพาะอีโมจิที่ Windows 10 / มือถือรุ่นเก่าแสดงได้
export const AVATARS = [
  { e: '🐸', h: 140, n: 'กบ' }, { e: '🐯', h: 28, n: 'เสือ' }, { e: '🐼', h: 210, n: 'แพนด้า' }, { e: '🦆', h: 48, n: 'เป็ด' }, { e: '🐵', h: 18, n: 'ลิง' }, { e: '🐙', h: 280, n: 'หมึก' },
  { e: '🐰', h: 330, n: 'กระต่าย' }, { e: '🐷', h: 345, n: 'หมู' }, { e: '🐨', h: 190, n: 'โคอาล่า' }, { e: '🐻', h: 30, n: 'หมี' }, { e: '🦊', h: 12, n: 'จิ้งจอก' }, { e: '🐣', h: 55, n: 'ลูกเจี๊ยบ' },
  { e: '🐱', h: 42, n: 'แมว' }, { e: '🐶', h: 24, n: 'หมา' }, { e: '🦁', h: 36, n: 'สิงโต' }, { e: '🐮', h: 0, n: 'วัว' }, { e: '🐭', h: 300, n: 'หนู' }, { e: '🐹', h: 20, n: 'แฮมสเตอร์' },
  { e: '🐧', h: 222, n: 'เพนกวิน' }, { e: '🦄', h: 290, n: 'ยูนิคอร์น' }, { e: '🐲', h: 125, n: 'มังกร' }, { e: '🦉', h: 32, n: 'นกฮูก' }, { e: '🐝', h: 50, n: 'ผึ้ง' }, { e: '🦖', h: 100, n: 'ไดโนเสาร์' },
  { e: '🤖', h: 200, n: 'หุ่นยนต์' }, { e: '👻', h: 258, n: 'ผี' }, { e: '👽', h: 160, n: 'เอเลี่ยน' }, { e: '🎃', h: 26, n: 'ฟักทอง' }, { e: '🍩', h: 320, n: 'โดนัท' }, { e: '🐳', h: 205, n: 'วาฬ' },
];
const validAv = v => Number.isInteger(v) && v >= 0 && v < BODY_COLORS.length; // av = สีตัวละคร
// รูปของแต่ละคน: ใช้รูปที่เลือกไว้ (ห้ามซ้ำกันในห้อง คนเลือกก่อนได้ก่อน) คนที่ยังไม่เลือกได้รูปว่างตัวแรก — ทุกเครื่องคำนวณได้ตรงกัน
export function makeAv(players) {
  const map = {}, used = new Set();
  [...players].sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0)).forEach(p => { if (validAv(p.av) && !used.has(p.av)) { map[p.id] = p.av; used.add(p.av); } });
  let k = 0; players.forEach(p => { if (map[p.id] == null) { while (used.has(k) && k < BODY_COLORS.length) k++; map[p.id] = k % BODY_COLORS.length; used.add(map[p.id]); } });
  const looks = {}; players.forEach(p => { looks[p.id] = p.look ? fixLook(p.look) : lookFromId(p.id); });
  const fn = id => map[id] == null ? { c: 13, look: lookFromId(id), f: BODY_COLORS[13].f } : { c: map[id], look: looks[id], f: BODY_COLORS[map[id]].f };
  fn.idxOf = id => map[id];
  return fn;
}
// รูปว่างสำหรับคนที่เพิ่งเข้าห้อง: ใช้รูปที่ชอบถ้ายังว่าง ไม่งั้นสุ่มจากรูปที่เหลือ
export function freeAv(players, want, exceptId) {
  const taken = new Set(players.filter(p => p.id !== exceptId && validAv(p.av)).map(p => p.av));
  if (validAv(want) && !taken.has(want)) return want;
  const free = BODY_COLORS.map((_, i) => i).filter(i => !taken.has(i));
  return free.length ? free[Math.floor(Math.random() * free.length)] : 0;
}
export function Avatar({ id, av, size = 44, dead, title, mood }) {
  const a = av(id);
  return <span className={'av ch' + (dead ? ' dead' : '')} style={{ '--cf': a.f, width: size, height: size, fontSize: Math.round(size * 0.56) }} title={title}><span className="ch-clip"><Char look={a.look} color={a.c} mood={mood || (dead ? 'dead' : undefined)} /></span>{dead && <i className="av-x">💀</i>}</span>;
}
// ตัวละครเต็มตัว (ใช้ตามที่นั่งรอบโต๊ะ/ในฉาก) — คนตกรอบเป็นสีเทาล้มลง
export function Figure({ id, av, size = 40, dead, title, mood }) {
  const a = av(id);
  return <span className={'fig' + (dead ? ' dead' : '')} title={title} style={{ width: size, height: size * 1.4 }}><Char look={a.look} color={a.c} full size={size} mood={dead ? 'dead' : mood} />{dead && <i className="av-x">💀</i>}</span>;
}
// รูปเดี่ยว ๆ จากเลขรูป (ใช้ในหน้าเลือกรูป/ก่อนเข้าห้อง)
export const AvFace = ({ i, look, size = 44 }) => { const c = validAv(i) ? i : 0; return <span className="av ch" style={{ '--cf': BODY_COLORS[c].f, width: size, height: size, fontSize: Math.round(size * 0.56) }}><span className="ch-clip"><Char look={look} color={c} /></span></span>; };
// หน้าต่างเลือกรูปโปรไฟล์
export function AvatarPicker({ current, takenBy = {}, onPick, onClose }) {
  React.useEffect(() => { const k = e => e.key === 'Escape' && onClose(); document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k); }, []);
  return <div className="avpick-bg" onClick={onClose} role="dialog" aria-label="เลือกรูปโปรไฟล์">
    <div className="avpick" onClick={e => e.stopPropagation()}>
      <div className="avpick-head"><div><b>เลือกรูปโปรไฟล์</b><small>เปลี่ยนได้ตลอด แม้อยู่ระหว่างเกม • รูปที่คนอื่นใช้อยู่เลือกไม่ได้</small></div><button className="icon-btn" onClick={onClose} aria-label="ปิด">✕</button></div>
      <div className="avpick-grid">{AVATARS.map((a, i) => { const who = takenBy[i]; const me = current === i;
        return <button key={i} type="button" className={'avopt' + (me ? ' me' : '') + (who ? ' taken' : '')} disabled={!!who} onClick={() => onPick(i)} title={who ? `${a.n} — ${who} ใช้อยู่` : a.n} style={{ '--i': i }}>
          <AvFace i={i} size={52} /><span>{who ? who : a.n}</span>{me && <i>✓</i>}
        </button>; })}</div>
    </div>
  </div>;
}
export const Voters = ({ ids, av, max = 6, size = 22 }) => !ids.length ? null : <span className="voters">{ids.slice(0, max).map(id => <Avatar key={id} id={id} av={av} size={size} />)}{ids.length > max && <b>+{ids.length - max}</b>}</span>;

// ---------- "ตอนนี้ต้องทำอะไร" — การ์ดหัวเรื่องพร้อมภาพประกอบ ----------
export function Phase({ art, n, tone = '', kicker, title, children, aside, size = 88 }) {
  return <section key={String(kicker || '') + '|' + (typeof title === 'string' ? title : '') + '|' + art} className={'phase ' + tone}>
    <div className="phase-art"><Art name={art} n={n} size={size} /></div>
    <div className="phase-body">{kicker && <span className="phase-kicker">{kicker}</span>}<h2>{title}</h2>{children && <div className="phase-sub">{children}</div>}</div>
    {aside && <div className="phase-aside">{aside}</div>}
  </section>;
}
// ขั้นตอนของเกม (แถบด้านบน)
export const Steps = ({ items, at }) => <ol className="steps">{items.map((s, i) => <li key={i} className={i < at ? 'done' : i === at ? 'now' : ''}><b>{i < at ? '✓' : i + 1}</b><span>{s}</span></li>)}</ol>;

// ---------- ตารางผู้เล่น: แตะรูปเพื่อเลือก ----------
export function PlayerGrid({ ids, av, nameOf, myId, selected, onPick, badge, note, off, dead, small }) {
  return <div className={'pgrid' + (small ? ' small' : '')}>{ids.map((id, idx) => {
    const sel = Array.isArray(selected) ? selected.includes(id) : selected === id; const isOff = off?.(id); const isDead = dead?.(id);
    return <button key={id} type="button" style={{ '--i': idx }} className={'ptile' + (sel ? ' sel' : '') + (isOff ? ' off' : '') + (isDead ? ' dead' : '') + (onPick ? ' pick' : '')} disabled={!onPick || isOff} onClick={() => onPick?.(id)}>
      <Avatar id={id} av={av} size={small ? 38 : 48} dead={isDead} />
      <span className="ptile-name">{nameOf(id)}{id === myId && <em> (คุณ)</em>}</span>
      {note && <span className="ptile-note">{note(id)}</span>}
      {badge && badge(id)}
      {sel && <span className="ptile-check">✓</span>}
    </button>;
  })}</div>;
}
// ใครทำแล้ว / ยังไม่ทำ
export function WhoDone({ ids, done, av, nameOf, label }) {
  const n = ids.filter(done).length;
  return <div className="whodone"><span>{label} <b>{n}/{ids.length}</b>{n < ids.length && <em> • รอ {ids.filter(id => !done(id)).map(nameOf).join(', ')}</em>}</span>
    <div>{ids.map(id => <span key={id} className={'wd' + (done(id) ? ' ok' : '')} title={nameOf(id)}><Avatar id={id} av={av} size={30} />{done(id) && <i>✓</i>}</span>)}</div></div>;
}

// ---------- การ์ดบทบาท (พลิกเปิด/ปิด) ----------
// สองปุ่มแยกกัน: "ซ่อนบทบาท" = ปิดการ์ดเฉย ๆ (จอยังเป็นของจริง ปุ่มลงมือครบ)
// "เนียนบทบาท" (กดได้ตอนเปิดการ์ดอยู่) = disguise ให้เกมเรนเดอร์ทั้งจอด้วยโค้ดชุดเดียวกับคนธรรมดา → ฝ่ายร้ายตอบได้ว่า "บรรทัดที่ 3 เขียนว่าอะไร"
// ทุกคนมีปุ่มเดียวกัน ปุ่มเลยไม่บอกว่าใครเป็นใคร • รอบใหม่ = บทบาทใหม่ → ออกจากโหมดเนียน ต้องเปิดดูก่อน
export function useRoleCard(key) {
  const [mode, setMode] = React.useState('hide');   // 'hide' | 'show' | 'fake'
  React.useEffect(() => { setMode(m => (m === 'fake' ? 'hide' : m)); }, [key]);
  return { show: mode === 'show', disguise: mode === 'fake', toggle: () => setMode(m => (m === 'show' ? 'hide' : 'show')), fake: () => setMode('fake') };
}
export function RoleCard({ show, onToggle, onFake, faking, art, n, name, side, sideLabel, children, cover = 'think', coverTitle = 'บทบาทลับของคุณ', coverText = 'กดเปิดดูคนเดียว ระวังคนแอบมองจอ!' }) {
  return <div className={'role-card rcard' + (show ? ' open' : '')}>
    <div className="rcard-in" key={show ? 'o' : 'c'}>
      <div className="rcard-art"><Art name={show ? art : cover} n={n} size={112} /></div>
      <div className="rcard-text">{show ? <>{sideLabel && <span className={'rcard-side ' + side}>{sideLabel}</span>}<h3>{name}</h3>{children}</> : <><h3>{coverTitle}</h3><p>{coverText}{faking && <><br /><small>🎭 กำลังเนียน: ทั้งจอดูเหมือนคนทั่วไป • ถึงตาลงมือค่อยเปิดดูบทบาท</small></>}</p></>}</div>
    </div>
    <div className="rcard-btns">
      <button className="secondary rcard-btn" onClick={onToggle}>{show ? <EyeOff size={16} /> : <Eye size={16} />} {show ? 'ซ่อนบทบาท' : 'เปิดดูบทบาท'}</button>
      {show && onFake && <button className="secondary rcard-btn" onClick={onFake} title="ทั้งจอจะดูเหมือนคนทั่วไปทุกตัวอักษร">🎭 เนียนบทบาท</button>}
    </div>
  </div>;
}

// ---------- ปุ่มตัวเลือกใหญ่ (มีภาพ) ----------
export const Choice = ({ art, label, sub, tone = '', sel, onClick, disabled }) => <button type="button" className={'choice ' + tone + (sel ? ' sel' : '')} onClick={onClick} disabled={disabled}><Art name={art} size={72} /><b>{label}</b>{sub && <small>{sub}</small>}</button>;

// ---------- ผลลัพธ์ ----------
export const Outcome = ({ art, tone = '', title, children, party = true }) => <section className={'outcome ' + tone}>{party && <Confetti />}<span className="outcome-rays" /><Art name={art} size={128} /><h2>{title}</h2>{children && <div className="outcome-sub">{children}</div>}</section>;
export function RevealGrid({ items, av, nameOf }) {
  return <div className="reveal-grid">{items.map(it => <div key={it.id} className={'rv' + (it.bad ? ' bad' : '') + (it.dead ? ' dead' : '')}>
    <div className="rv-top"><Avatar id={it.id} av={av} size={30} dead={it.dead} /><b>{nameOf(it.id)}</b></div>
    <Art name={it.art} n={it.n} size={56} /><span className={'rv-role' + (it.bad ? ' bad' : '')}>{it.label}</span>{it.extra && <small>{it.extra}</small>}
  </div>)}</div>;
}
export function Leaderboard({ players, scores, points, myId, av, mark }) {
  return <ol className="leaderboard">{[...players].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)).map((p, i) => { const d = points?.[p.id] || 0;
    return <li key={p.id} className={p.id === myId ? 'me' : ''}><span className="rank">{['🥇', '🥈', '🥉'][i] || i + 1}</span><span className="lb-name"><Avatar id={p.id} av={av} size={24} /> {p.name}{mark?.(p.id)}</span>{points && <em className={d > 0 ? 'up' : ''}>{d > 0 ? '+' + d : '±0'}</em>}<b>{scores[p.id] || 0}</b></li>; })}</ol>;
}
// ใครโหวตใคร (รูป → รูป)
export function Ballots({ ids, ballots, av, nameOf, hit, skipLabel = 'ไม่ได้โหวต' }) {
  return <ul className="ballots2">{ids.map(id => { const t = ballots?.[id]; return <li key={id} className={t && hit?.(t) ? 'hit' : ''}><Avatar id={id} av={av} size={26} /><span>{nameOf(id)}</span><i>→</i>{t && t !== 'skip' ? <><Avatar id={t} av={av} size={26} /><b>{nameOf(t)}</b></> : <b className="none">{t === 'skip' ? 'ไม่ประหาร' : skipLabel}</b>}</li>; })}</ul>;
}
export const HostBar = ({ children }) => <div className="hostbar"><span>👑 ปุ่มของหัวหน้าห้อง</span>{children}</div>;
export const SecH = ({ icon, children, right }) => <h4 className="sec-h"><span>{icon} {children}</span>{right}</h4>;

// ---------- เอฟเฟกต์ ----------
// อนุภาคลอยพื้นหลังตามธีม (หิ่งห้อย ดาว น้ำตาลโรยเค้ก ฯลฯ) — สีและท่าทางกำหนดใน effects.css
const rnd = i => { const x = Math.sin(i * 9301 + 49297) * 233280; return x - Math.floor(x); };
export function Ambient({ theme }) {
  return <div className="amb" aria-hidden="true" data-amb={theme}>{Array.from({ length: 22 }, (_, i) =>
    <i key={i} style={{ '--x': (rnd(i) * 100).toFixed(1) + '%', '--y': (rnd(i + 50) * 100).toFixed(1) + '%', '--d': (9 + rnd(i + 7) * 12).toFixed(1) + 's', '--dl': (-rnd(i + 3) * 20).toFixed(1) + 's', '--s': (0.6 + rnd(i + 11) * 1.1).toFixed(2), '--r': Math.round(rnd(i + 21) * 360) + 'deg' }} />)}</div>;
}
// พลุกระดาษตอนจบเกม (เล่นครั้งเดียวตอนแสดงผล)
const CONF = ['#ffc965', '#ff5f6d', '#5fd38d', '#6fb7ff', '#ff8fb3', '#a78bfa', '#fff'];
export function Confetti({ n = 70 }) {
  return <div className="confetti" aria-hidden="true">{Array.from({ length: n }, (_, i) =>
    <i key={i} style={{ '--x': (rnd(i + 1) * 100).toFixed(1) + '%', '--c': CONF[i % CONF.length], '--d': (2.2 + rnd(i + 9) * 1.8).toFixed(2) + 's', '--dl': (rnd(i + 4) * 0.7).toFixed(2) + 's', '--dx': ((rnd(i + 13) - 0.5) * 220).toFixed(0) + 'px', '--r': (rnd(i + 17) * 900 + 180).toFixed(0) + 'deg', '--w': (6 + rnd(i + 23) * 6).toFixed(0) + 'px' }} />)}</div>;
}
// นาฬิกาวงแหวนนับถอยหลัง
export function TimerRing({ secs, total, size = 78, label }) {
  const p = total > 0 ? Math.max(0, Math.min(1, secs / total)) : 0; const R = 32, C = 2 * Math.PI * R; const low = secs <= Math.min(30, total * 0.2);
  const txt = secs >= 60 ? `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}` : String(secs);
  return <div className={'tring' + (low ? ' low' : '')} style={{ width: size, height: size }}>
    <svg viewBox="0 0 76 76"><circle cx="38" cy="38" r={R} className="tr-bg" /><circle cx="38" cy="38" r={R} className="tr-fg" strokeDasharray={C} strokeDashoffset={C * (1 - p)} /></svg>
    <b>{txt}</b>{label && <small>{label}</small>}
  </div>;
}

// ---------- ป๊อปอัปบังคับเลือก: งานที่ต้องกดให้ทันเวลา (เลือกลูกสมุน หมาป่ากัด ฯลฯ) เด้งกลางจอ ----------
// ย่อได้ → เหลือแถบกะพริบลอยล่างจอ แตะเพื่อเปิดอีกครั้ง (กันลืม) • key เปลี่ยน = เด้งกลับมาเต็มจอ
export function ActionSheet({ open, k, icon, title, sub, secs, total, children }) {
  const [min, setMin] = useState(false);
  useEffect(() => { if (open) setMin(false); }, [open, k]);
  if (!open || typeof document === 'undefined') return null;
  const ring = secs != null && total ? <TimerRing secs={secs} total={total} size={60} label="วินาที" /> : null;
  return createPortal(min
    ? <button type="button" className={'asheet-pill' + (secs != null && secs <= 10 ? ' low' : '')} onClick={() => setMin(false)}><span>{icon}</span><b>{title}</b>{secs != null && <em>{secs} วิ</em>}<span className="asheet-up">แตะเพื่อเลือก ▴</span></button>
    : <div className="asheet-back"><div className="asheet" role="dialog" aria-modal="true" aria-label={title}>
      <div className="asheet-head"><span className="asheet-ico">{icon}</span><div className="asheet-tt"><b>{title}</b>{sub && <small>{sub}</small>}</div>{ring}</div>
      <div className="asheet-body">{children}</div>
      <button type="button" className="asheet-min" onClick={() => setMin(true)}>ย่อไว้ก่อน ▾</button>
    </div></div>, document.body);
}

// ---------- ฉากพื้นหลังเต็มจอตามธีมเกม (อยู่ด้านล่างจอ จาง ๆ ไม่บังเนื้อหา) ----------
const BD_STONE = (x, y, s, k) => <g key={k} transform={`translate(${x} ${y}) scale(${s})`}><path d="M-12 20V-2Q-12 -16 0 -16Q12 -16 12 -2V20Z" /><path d="M-2 -10h4v4h4v4h-4v10h-4v-10h-4v-4h4Z" fill="#000" opacity=".35" /></g>;
const BD_CROSS = (x, y, s, k) => <g key={k} transform={`translate(${x} ${y}) scale(${s})`}><path d="M-2.4 22V-14h4.8v36zM-10 -6h20v4.8h-20z" /></g>;
function DigBackdrop() {
  return <svg viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice">
    <defs>
      <radialGradient id="bd-moon" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#f6efd2" stopOpacity=".35" /><stop offset="1" stopColor="#f6efd2" stopOpacity="0" /></radialGradient>
      <radialGradient id="bd-lamp" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffcf6a" stopOpacity=".55" /><stop offset="1" stopColor="#ffcf6a" stopOpacity="0" /></radialGradient>
      <linearGradient id="bd-fog" x2="0" y2="1"><stop offset="0" stopColor="#c9c3e0" stopOpacity="0" /><stop offset=".5" stopColor="#c9c3e0" stopOpacity=".1" /><stop offset="1" stopColor="#c9c3e0" stopOpacity="0" /></linearGradient>
    </defs>
    <circle cx="1320" cy="120" r="230" fill="url(#bd-moon)" /><circle cx="1320" cy="120" r="54" fill="#efe7c8" opacity=".55" /><circle cx="1338" cy="104" r="50" fill="var(--bg)" opacity=".55" />
    <g fill="#e8e4f8" opacity=".5">{[[80, 60], [240, 140], [420, 40], [610, 110], [820, 50], [980, 150], [1120, 30], [1500, 220], [1560, 80], [300, 220], [700, 200]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 ? 1.4 : 2.2} />)}</g>
    {/* เนินไกล */}
    <path d="M0 420Q200 360 400 395Q620 340 820 390Q1040 345 1240 385Q1430 350 1600 380V600H0Z" fill="#1a1626" opacity=".85" />
    {/* ต้นไม้ตายไกล ๆ */}
    <g stroke="#14111d" strokeWidth="9" strokeLinecap="round" fill="none" opacity=".9">
      <path d="M140 420V250M140 320l-50 -48M140 290l40 -60M180 230l20 -12M140 360l46 -30M90 272l-18 6" />
      <path d="M1460 410V270M1460 330l38 -48M1460 300l-36 -40M1498 282l10 -18" />
    </g>
    <g fill="#1d1a2a" opacity=".9">{[[300, 418, 1.4], [370, 424, 1], [520, 410, 1.2], [960, 412, 1.3], [1060, 420, 1], [1190, 408, 1.5]].map(([x, y, s], i) => (i % 2 ? BD_CROSS : BD_STONE)(x, y, s, 'f' + i))}</g>
    <rect y="430" width="1600" height="60" fill="url(#bd-fog)" />
    {/* พื้นหน้า: รั้วเหล็ก ป้ายหลุม ตะเกียง */}
    <path d="M0 500Q400 470 800 495Q1200 470 1600 498V600H0Z" fill="#0f0d16" />
    <g stroke="#0b0a10" strokeWidth="5"><path d="M0 492H560M1040 490H1600" />{Array.from({ length: 26 }, (_, i) => { const x = i < 13 ? 20 + i * 42 : 1060 + (i - 13) * 42; return <path key={i} d={`M${x} 520V470`} />; })}</g>
    <g fill="#0b0a10">{Array.from({ length: 26 }, (_, i) => { const x = i < 13 ? 20 + i * 42 : 1060 + (i - 13) * 42; return <path key={i} d={`M${x - 6} 471l6 -12 6 12z`} />; })}</g>
    <g fill="#14111d">{[[620, 520, 2.2], [700, 528, 1.6], [880, 522, 2], [960, 532, 1.5], [420, 540, 1.8], [1180, 536, 2.1]].map(([x, y, s], i) => (i % 3 === 1 ? BD_CROSS : BD_STONE)(x, y, s, 'n' + i))}</g>
    {[[580, 470], [1010, 466]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y - 34} r="70" fill="url(#bd-lamp)" /><path d={`M${x} ${y + 60}V${y - 20}`} stroke="#0b0a10" strokeWidth="5" /><rect x={x - 9} y={y - 46} width="18" height="24" rx="4" fill="#ffcf6a" opacity=".8" /><path d={`M${x - 12} ${y - 46}h24l-4 -8h-16z`} fill="#0b0a10" /></g>)}
    <rect y="540" width="1600" height="60" fill="url(#bd-fog)" />
  </svg>;
}
function DealBackdrop() {
  const towers = [[0, 300, 90], [80, 220, 70], [150, 330, 60], [210, 180, 84], [300, 260, 66], [370, 140, 96], [470, 300, 70], [540, 230, 80], [1040, 250, 70], [1110, 160, 92], [1210, 290, 66], [1280, 120, 100], [1385, 240, 74], [1460, 190, 80], [1540, 300, 60]];
  return <svg viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice">
    <defs>
      <linearGradient id="bd-city" x2="0" y2="1"><stop offset="0" stopColor="#16204a" /><stop offset="1" stopColor="#0a0f26" /></linearGradient>
      <radialGradient id="bd-gold" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#f5c451" stopOpacity=".28" /><stop offset="1" stopColor="#f5c451" stopOpacity="0" /></radialGradient>
      <linearGradient id="bd-river" x2="0" y2="1"><stop offset="0" stopColor="#1d3270" stopOpacity=".7" /><stop offset="1" stopColor="#090e22" /></linearGradient>
    </defs>
    <circle cx="800" cy="460" r="420" fill="url(#bd-gold)" />
    <circle cx="260" cy="110" r="44" fill="#ffe9a8" opacity=".35" />
    {/* ตึกไกล */}
    <g fill="#121a3d" opacity=".9">{Array.from({ length: 22 }, (_, i) => <rect key={i} x={i * 74} y={330 + (i * 37) % 90} width="64" height="300" />)}</g>
    {/* ตึกหน้า */}
    {towers.map(([x, y, w], i) => <g key={i}>
      <rect x={x} y={y} width={w} height={600 - y} fill="url(#bd-city)" stroke="#060a1c" strokeWidth="2" />
      {i % 3 === 0 && <path d={`M${x + w / 2} ${y}V${y - 40}`} stroke="#060a1c" strokeWidth="4" />}
      {i % 3 === 0 && <circle cx={x + w / 2} cy={y - 42} r="4" fill="#ff4f4f" opacity=".85" />}
      {i % 4 === 1 && <path d={`M${x} ${y}L${x + w / 2} ${y - 30}L${x + w} ${y}Z`} fill="#16204a" />}
      <g fill="#ffd76a">{Array.from({ length: Math.floor((600 - y) / 26) * 3 }, (_, j) => { const col = j % 3, row = Math.floor(j / 3); const on = (i * 7 + j * 13) % 5 < 2; return on ? <rect key={j} x={x + 10 + col * (w - 20) / 3} y={y + 16 + row * 26} width={(w - 20) / 3 - 6} height="10" opacity={.35 + ((i + j) % 4) * .12} /> : null; })}</g>
    </g>)}
    {/* ป้ายไฟ DEAL + แม่น้ำสะท้อนไฟ */}
    <g transform="translate(1310 200)"><rect x="-56" y="-18" width="112" height="36" rx="6" fill="#1a1440" stroke="#ff4fa3" strokeWidth="3" opacity=".9" /><text y="9" textAnchor="middle" fontSize="24" fontWeight="900" fill="#ff8fc8" fontFamily="sans-serif" opacity=".9">DEAL</text></g>
    <rect y="540" width="1600" height="60" fill="url(#bd-river)" />
    <g stroke="#f5c451" strokeWidth="3" opacity=".25">{Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${40 + i * 90} ${556 + (i % 3) * 12}h${30 + (i % 4) * 10}`} />)}</g>
  </svg>;
}
const BACKDROPS = { dig: DigBackdrop, deal: DealBackdrop };
export function Backdrop({ theme }) { const B = BACKDROPS[theme]; return B ? <div className="backdrop" aria-hidden="true" data-bd={theme}><B /></div> : null; }
