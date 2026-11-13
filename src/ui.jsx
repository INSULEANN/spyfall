// ชิ้นส่วนหน้าจอที่ทุกเกมใช้ร่วมกัน — ให้หน้าตาระหว่างเล่นเหมือนกันทุกเกม อ่านง่าย กดง่าย
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Art } from './play-art.jsx';

// ---------- รูปโปรไฟล์ผู้เล่น: เลือกเองได้ 30 แบบ (เก็บใน players/{id}/av = เลขรูป) ----------
// ใช้เฉพาะอีโมจิที่ Windows 10 / มือถือรุ่นเก่าแสดงได้
export const AVATARS = [
  { e: '🐸', h: 140, n: 'กบ' }, { e: '🐯', h: 28, n: 'เสือ' }, { e: '🐼', h: 210, n: 'แพนด้า' }, { e: '🦆', h: 48, n: 'เป็ด' }, { e: '🐵', h: 18, n: 'ลิง' }, { e: '🐙', h: 280, n: 'หมึก' },
  { e: '🐰', h: 330, n: 'กระต่าย' }, { e: '🐷', h: 345, n: 'หมู' }, { e: '🐨', h: 190, n: 'โคอาล่า' }, { e: '🐻', h: 30, n: 'หมี' }, { e: '🦊', h: 12, n: 'จิ้งจอก' }, { e: '🐣', h: 55, n: 'ลูกเจี๊ยบ' },
  { e: '🐱', h: 42, n: 'แมว' }, { e: '🐶', h: 24, n: 'หมา' }, { e: '🦁', h: 36, n: 'สิงโต' }, { e: '🐮', h: 0, n: 'วัว' }, { e: '🐭', h: 300, n: 'หนู' }, { e: '🐹', h: 20, n: 'แฮมสเตอร์' },
  { e: '🐧', h: 222, n: 'เพนกวิน' }, { e: '🦄', h: 290, n: 'ยูนิคอร์น' }, { e: '🐲', h: 125, n: 'มังกร' }, { e: '🦉', h: 32, n: 'นกฮูก' }, { e: '🐝', h: 50, n: 'ผึ้ง' }, { e: '🦖', h: 100, n: 'ไดโนเสาร์' },
  { e: '🤖', h: 200, n: 'หุ่นยนต์' }, { e: '👻', h: 258, n: 'ผี' }, { e: '👽', h: 160, n: 'เอเลี่ยน' }, { e: '🎃', h: 26, n: 'ฟักทอง' }, { e: '🍩', h: 320, n: 'โดนัท' }, { e: '🐳', h: 205, n: 'วาฬ' },
];
const validAv = v => Number.isInteger(v) && v >= 0 && v < AVATARS.length;
// รูปของแต่ละคน: ใช้รูปที่เลือกไว้ (ห้ามซ้ำกันในห้อง คนเลือกก่อนได้ก่อน) คนที่ยังไม่เลือกได้รูปว่างตัวแรก — ทุกเครื่องคำนวณได้ตรงกัน
export function makeAv(players) {
  const map = {}, used = new Set();
  [...players].sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0)).forEach(p => { if (validAv(p.av) && !used.has(p.av)) { map[p.id] = p.av; used.add(p.av); } });
  let k = 0; players.forEach(p => { if (map[p.id] == null) { while (used.has(k) && k < AVATARS.length) k++; map[p.id] = k % AVATARS.length; used.add(map[p.id]); } });
  const fn = id => map[id] == null ? { e: '👻', h: 250 } : AVATARS[map[id]];
  fn.idxOf = id => map[id];
  return fn;
}
// รูปว่างสำหรับคนที่เพิ่งเข้าห้อง: ใช้รูปที่ชอบถ้ายังว่าง ไม่งั้นสุ่มจากรูปที่เหลือ
export function freeAv(players, want, exceptId) {
  const taken = new Set(players.filter(p => p.id !== exceptId && validAv(p.av)).map(p => p.av));
  if (validAv(want) && !taken.has(want)) return want;
  const free = AVATARS.map((_, i) => i).filter(i => !taken.has(i));
  return free.length ? free[Math.floor(Math.random() * free.length)] : 0;
}
export function Avatar({ id, av, size = 44, dead, title }) {
  const a = av(id);
  return <span className={'av' + (dead ? ' dead' : '')} style={{ '--h': a.h, width: size, height: size, fontSize: Math.round(size * 0.56) }} title={title}>{a.e}{dead && <i className="av-x">💀</i>}</span>;
}
// รูปเดี่ยว ๆ จากเลขรูป (ใช้ในหน้าเลือกรูป/ก่อนเข้าห้อง)
export const AvFace = ({ i, size = 44 }) => { const a = AVATARS[i] || { e: '🙂', h: 250 }; return <span className="av" style={{ '--h': a.h, width: size, height: size, fontSize: Math.round(size * 0.56) }}>{a.e}</span>; };
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
