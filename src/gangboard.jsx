// อันดับแก๊ง — ไม่ต้องสมัคร: ใช้ "รหัสประจำตัว 4 หลัก" แทนบัญชี (เปลี่ยนชื่อเล่นได้ตลอด แต้มยังอยู่กับรหัส)
// จบรอบแล้วแต้มในห้องเพิ่ม = ชนะ 1 ครั้ง • แต่ละเครื่องบันทึกเฉพาะผลของตัวเอง
import React, { useEffect, useState } from 'react';
import { ref, get, update, runTransaction, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { Trophy, Coins } from 'lucide-react';
import { AvFace } from './ui.jsx';

export const isPin = p => /^[0-9]{4}$/.test(p || '');
export function readPin() { try { const p = localStorage.getItem('sf-pin'); return isPin(p) ? p : ''; } catch { return ''; } }
export function savePinLocal(p) { try { localStorage.setItem('sf-pin', p); } catch { } }

// เลขสัปดาห์แบบ ISO เช่น w202647 (รีเซ็ตทุกวันจันทร์)
export function weekId(ts = Date.now()) {
  const d = new Date(ts); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const w1 = new Date(d.getFullYear(), 0, 4);
  const wk = 1 + Math.round(((d - w1) / 864e5 - 3 + (w1.getDay() + 6) % 7) / 7);
  return 'w' + d.getFullYear() + String(wk).padStart(2, '0');
}

// สถิติเก็บที่ lbg/<เกม>/<all|สัปดาห์>/<รหัส> และรวมทุกเกมที่ lbg/all/... (เริ่มนับใหม่ v1.97 • ของเก่าที่ lb/all, lb/wXXXX ไม่ใช้แล้ว)
export const LB_ALL = 'all';
const lbPath = (gid, period, pin) => `lbg/${gid}/${period}/${pin}`;
export function recordResult(db, { pin, name, look, av, gid, won, pts }) {
  if (!isPin(pin) || !name?.trim()) return;
  const add = cur => {
    const c = cur || { wins: 0, games: 0, pts: 0 };
    c.name = name.trim().slice(0, 24); if (look) c.look = look; if (av != null) c.av = av;
    c.games = (c.games || 0) + 1; c.wins = (c.wins || 0) + (won ? 1 : 0); c.pts = (c.pts || 0) + Math.max(0, pts || 0); c.t = Date.now();
    return c;
  };
  const games = [LB_ALL, ...(/^[a-z0-9]{2,16}$/.test(gid || '') && gid !== LB_ALL ? [gid] : [])];
  for (const g of games) for (const p of ['all', weekId()]) runTransaction(ref(db, lbPath(g, p, pin)), add).catch(() => {});
}

export function PinForm({ db, name, onSet, onCancel }) {
  const [v, setV] = useState(''); const [taken, setTaken] = useState(null); const [busy, setBusy] = useState(false);
  async function go(force) {
    if (!isPin(v) || busy) return;
    if (!force) { setBusy(true); try { for (const p of [lbPath(LB_ALL, 'all', v), `lb/all/${v}`, `lb/chips/${v}`]) { const s = await get(ref(db, p)); if (s.exists()) { setTaken(s.val().name || 'มีคนใช้'); setBusy(false); return; } } } catch { } setBusy(false); }
    onSet(v);
  }
  return <div className="pin-form">
    <p>ตั้ง <b>เลขแก๊ง 4 หลัก</b> ไว้เก็บสถิติ ไม่ต้องสมัคร เปลี่ยนชื่อเล่นได้ตลอด เปลี่ยนเครื่องก็ใส่เลขเดิม</p>
    <div className="pin-row"><input inputMode="numeric" maxLength={4} value={v} placeholder="เช่น 2580" aria-label="รหัสประจำตัว 4 หลัก" onChange={e => { setV(e.target.value.replace(/\D/g, '').slice(0, 4)); setTaken(null); }} onKeyDown={e => e.key === 'Enter' && go(false)} />
      <button disabled={!isPin(v) || busy} onClick={() => go(false)}>{busy ? 'กำลังเช็ก…' : 'ใช้เลขนี้'}</button></div>
    {taken && <div className="pin-taken">เลข {v} เป็นของ <b>{taken}</b> — ใช่คุณไหม? <button onClick={() => go(true)}>ใช่ ฉันเอง</button><button onClick={() => { setV(''); setTaken(null); }}>ไม่ใช่ ตั้งใหม่</button></div>}
    {onCancel && <button className="gang-more" onClick={onCancel}>ยกเลิก</button>}
  </div>;
}

export function GangBoard({ db, pin, setPin, name, games = [] }) {
  const [period, setPeriod] = useState('week');
  const [gid, setGid] = useState(() => { try { return localStorage.getItem('sf-lb-game') || LB_ALL; } catch { return LB_ALL; } });
  const [rows, setRows] = useState(null);
  const [more, setMore] = useState(false);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setRows(null);
    const q = query(ref(db, lbPath(gid, period === 'week' ? weekId() : 'all', '').replace(/\/$/, '')), orderByChild('wins'), limitToLast(20));
    return onValue(q, s => { const v = s.val() || {}; setRows(Object.entries(v).map(([k, r]) => ({ k, ...r })).sort((a, b) => (b.wins || 0) - (a.wins || 0) || (b.pts || 0) - (a.pts || 0))); }, () => setRows([]));
  }, [db, period, gid]);
  const pickGame = g => { setGid(g); setMore(false); try { localStorage.setItem('sf-lb-game', g); } catch { } };
  const gName = games.find(g => g.id === gid);
  const save = p => { savePinLocal(p); setPin(p); setEdit(false); };
  const shown = (rows || []).slice(0, more ? 20 : 5);
  const myIdx = (rows || []).findIndex(r => r.k === pin);
  return <section className="ha-card gang" id="rank">
    <div className="gang-head"><h3><Trophy size={19} /> อันดับแก๊ง</h3>
      <div className="gang-tabs">{[['week', 'สัปดาห์นี้'], ['all', 'ทั้งหมด']].map(([v, l]) => <button key={v} className={period === v ? 'on' : ''} onClick={() => setPeriod(v)}>{l}</button>)}</div></div>
    {games.length > 0 && <select className="gang-game" value={gid} aria-label="เลือกเกม" onChange={e => pickGame(e.target.value)}>
      <option value={LB_ALL}>🏆 รวมทุกเกม</option>{games.map(g => <option key={g.id} value={g.id}>{g.emoji} {g.name}</option>)}</select>}
    {rows === null ? <p className="gang-empty">กำลังโหลด…</p> : rows.length === 0 ? <p className="gang-empty">{gName ? `${gName.name}: ` : ''}{period === 'week' ? 'สัปดาห์นี้ยังไม่มีใครชนะ' : 'ยังไม่มีผลการเล่น'} — เล่นจบรอบแรกแล้วชื่อจะขึ้นที่นี่</p> :
      <ol className="gang-list">{shown.map((r, i) => <li key={r.k} className={(r.k === pin ? 'me ' : '') + (i < 3 ? 'top' + (i + 1) : '')}>
        <span className="gr">{i + 1}</span><AvFace i={r.av ?? 0} look={r.look} size={30} /><span className="gn">{r.name}</span>
        <span className="gw"><b>{r.wins || 0}</b> ชนะ<small>เล่น {r.games || 0}</small></span></li>)}</ol>}
    {rows && rows.length > 5 && <button className="gang-more" onClick={() => setMore(m => !m)}>{more ? 'ย่อ' : `ดูทั้งหมด (${rows.length})`}</button>}
    {rows && myIdx >= 5 && !more && <p className="gang-me">คุณอยู่อันดับ {myIdx + 1}</p>}
    {!pin || edit ? <PinForm db={db} name={name} onSet={save} onCancel={pin ? () => setEdit(false) : null} /> :
      <p className="gang-note">รหัสของคุณ <b className="pin-chip">{pin}</b> <button className="pin-edit" onClick={() => setEdit(true)}>เปลี่ยน</button> · จบรอบแล้วได้แต้ม = ชนะ 1 ครั้ง</p>}
  </section>;
}

// ── กระเป๋าชิป (ป๊อกเด้ง/โป๊กเกอร์) ผูกกับรหัส 4 หลัก ──
// ยอดในกระเป๋า = ชิปบนโต๊ะ (ยอดเดียว: ซื้อเพิ่ม/ชนะ/แพ้/ถูกหัก นับหมด) • เข้าวงใหม่จะเริ่มด้วยยอดนี้
export const WALLET_CAP = 1000000;
export function saveWallet(db, { pin, name, look, av, chips }) {
  if (!isPin(pin) || !name?.trim()) return;
  const v = { name: name.trim().slice(0, 24), chips: Math.max(0, Math.min(WALLET_CAP, Math.round(chips || 0))), t: Date.now() };
  if (look) v.look = look; if (av != null) v.av = av;
  update(ref(db, `lb/chips/${pin}`), v).catch(() => {});
}
// กำไร/ขาดทุนจากการเล่น สะสมไว้ที่ profit (ใช้จัดอันดับเศรษฐี)
export function addProfit(db, { pin, name, look, av, d }) {
  if (!isPin(pin) || !name?.trim() || !d) return;
  runTransaction(ref(db, `lb/chips/${pin}`), c => { const v = c || { chips: 0 }; v.name = name.trim().slice(0, 24); if (look) v.look = look; if (av != null) v.av = av; v.profit = Math.round((v.profit || 0) + d); v.t = Date.now(); return v; }).catch(() => {});
}
export async function readWallet(db, pin) {
  if (!isPin(pin)) return null;
  try { const s = await get(ref(db, `lb/chips/${pin}`)); return s.exists() ? s.val().chips : null; } catch { return null; }
}

export function RichBoard({ db, pin }) {
  const [rows, setRows] = useState(null);
  const [more, setMore] = useState(false);
  useEffect(() => onValue(query(ref(db, 'lb/chips'), orderByChild('profit'), limitToLast(20)),
    s => setRows(Object.entries(s.val() || {}).map(([k, r]) => ({ k, ...r })).filter(r => r.profit).sort((a, b) => b.profit - a.profit)), () => setRows([])), [db]);
  const shown = (rows || []).slice(0, more ? 20 : 5);
  const mine = (rows || []).findIndex(r => r.k === pin);
  return <section className="ha-card gang rich" id="rich">
    <div className="gang-head"><h3><Coins size={19} /> อันดับเศรษฐี</h3><small className="rich-sub">ชิปป๊อกเด้ง · โป๊กเกอร์</small></div>
    {rows === null ? <p className="gang-empty">กำลังโหลด…</p> : rows.length === 0 ? <p className="gang-empty">ยังไม่มีเศรษฐี — เล่นป๊อกเด้งหรือโป๊กเกอร์ได้กำไรแล้วชื่อจะขึ้นที่นี่</p> :
      <ol className="gang-list">{shown.map((r, i) => <li key={r.k} className={(r.k === pin ? 'me ' : '') + (i < 3 ? 'top' + (i + 1) : '')}>
        <span className="gr">{i + 1}</span><AvFace i={r.av ?? 0} look={r.look} size={30} /><span className="gn">{r.name}</span>
        <span className={'gw rich-n' + (r.profit < 0 ? ' neg' : '')}><b>{r.profit > 0 ? '+' : ''}{r.profit.toLocaleString()}</b> กำไร<small>มี {(r.chips || 0).toLocaleString()}</small></span></li>)}</ol>}
    {rows && rows.length > 5 && <button className="gang-more" onClick={() => setMore(m => !m)}>{more ? 'ย่อ' : `ดูทั้งหมด (${rows.length})`}</button>}
    {rows && mine >= 5 && !more && <p className="gang-me">คุณอยู่อันดับ {mine + 1}</p>}
    <p className="gang-note">{pin ? 'จัดอันดับจากกำไรที่เล่นได้จริง ชิปที่ซื้อเพิ่มหรือที่หัวห้องให้ไม่นับ • ชิปที่มีติดตัวข้ามห้องตามรหัสของคุณ' : 'ตั้งรหัส 4 หลักในอันดับแก๊งก่อน ชิปถึงจะติดตัวข้ามห้อง'}</p>
  </section>;
}

// หน้าต่างบังคับตั้งเลขแก๊งก่อนสร้าง/เข้าห้อง
export function PinModal({ db, name, onSet, onClose }) {
  useEffect(() => { const k = e => e.key === 'Escape' && onClose(); document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k); }, []);
  return <div className="avpick-bg" onClick={onClose} role="dialog" aria-label="ตั้งเลขแก๊ง">
    <div className="avpick pin-modal" onClick={e => e.stopPropagation()}>
      <div className="avpick-head"><div><b>ตั้งเลขแก๊งก่อนเข้าห้อง</b><small>ทุกคนต้องมีเลขแก๊งของตัวเอง จะได้นับสถิติชนะ/ชิปให้ครบ</small></div><button className="icon-btn" onClick={onClose} aria-label="ปิด">✕</button></div>
      <PinForm db={db} name={name} onSet={onSet} />
    </div>
  </div>;
}
