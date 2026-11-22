// อันดับแก๊ง — ไม่ต้องสมัคร: ใช้ "รหัสประจำตัว 4 หลัก" แทนบัญชี (เปลี่ยนชื่อเล่นได้ตลอด แต้มยังอยู่กับรหัส)
// จบรอบแล้วแต้มในห้องเพิ่ม = ชนะ 1 ครั้ง • แต่ละเครื่องบันทึกเฉพาะผลของตัวเอง
import React, { useEffect, useState } from 'react';
import { ref, get, runTransaction, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { Trophy } from 'lucide-react';
import { AvFace } from './ui.jsx';

export const isPin = p => /^[0-9]{4}$/.test(p || '');
export function readPin() { try { const p = localStorage.getItem('sf-pin'); return isPin(p) ? p : ''; } catch { return ''; } }

// เลขสัปดาห์แบบ ISO เช่น w202647 (รีเซ็ตทุกวันจันทร์)
export function weekId(ts = Date.now()) {
  const d = new Date(ts); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const w1 = new Date(d.getFullYear(), 0, 4);
  const wk = 1 + Math.round(((d - w1) / 864e5 - 3 + (w1.getDay() + 6) % 7) / 7);
  return 'w' + d.getFullYear() + String(wk).padStart(2, '0');
}

export function recordResult(db, { pin, name, look, av, gid, won, pts }) {
  if (!isPin(pin) || !name?.trim()) return;
  const add = cur => {
    const c = cur || { wins: 0, games: 0, pts: 0 };
    c.name = name.trim().slice(0, 24); if (look) c.look = look; if (av != null) c.av = av;
    c.games = (c.games || 0) + 1; c.wins = (c.wins || 0) + (won ? 1 : 0); c.pts = (c.pts || 0) + Math.max(0, pts || 0); c.t = Date.now();
    if (won && gid) c.g = { ...(c.g || {}), [gid]: ((c.g || {})[gid] || 0) + 1 };
    return c;
  };
  for (const p of ['all', weekId()]) runTransaction(ref(db, `lb/${p}/${pin}`), add).catch(() => {});
}

function PinForm({ db, onSet, onCancel }) {
  const [v, setV] = useState(''); const [taken, setTaken] = useState(null); const [busy, setBusy] = useState(false);
  async function go(force) {
    if (!isPin(v)) return;
    if (!force) { setBusy(true); try { const s = await get(ref(db, `lb/all/${v}`)); if (s.exists()) { setTaken(s.val().name || 'มีคนใช้'); setBusy(false); return; } } catch { } setBusy(false); }
    onSet(v);
  }
  return <div className="pin-form">
    <p>ตั้ง <b>รหัสประจำตัว 4 หลัก</b> ไว้เก็บสถิติ ไม่ต้องสมัคร เปลี่ยนชื่อเล่นได้ตลอด เปลี่ยนเครื่องก็ใส่รหัสเดิม</p>
    <div className="pin-row"><input inputMode="numeric" maxLength={4} value={v} placeholder="เช่น 2580" aria-label="รหัสประจำตัว 4 หลัก" onChange={e => { setV(e.target.value.replace(/\D/g, '').slice(0, 4)); setTaken(null); }} onKeyDown={e => e.key === 'Enter' && go(false)} />
      <button disabled={!isPin(v) || busy} onClick={() => go(false)}>ใช้รหัสนี้</button></div>
    {taken && <div className="pin-taken">รหัส {v} เป็นของ <b>{taken}</b> — ใช่คุณไหม? <button onClick={() => go(true)}>ใช่ ฉันเอง</button><button onClick={() => { setV(''); setTaken(null); }}>ไม่ใช่ ตั้งใหม่</button></div>}
    {onCancel && <button className="gang-more" onClick={onCancel}>ยกเลิก</button>}
  </div>;
}

export function GangBoard({ db, pin, setPin }) {
  const [period, setPeriod] = useState('week');
  const [rows, setRows] = useState(null);
  const [more, setMore] = useState(false);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setRows(null);
    const q = query(ref(db, `lb/${period === 'week' ? weekId() : 'all'}`), orderByChild('wins'), limitToLast(20));
    return onValue(q, s => { const v = s.val() || {}; setRows(Object.entries(v).map(([k, r]) => ({ k, ...r })).sort((a, b) => (b.wins || 0) - (a.wins || 0) || (b.pts || 0) - (a.pts || 0))); }, () => setRows([]));
  }, [db, period]);
  const save = p => { try { localStorage.setItem('sf-pin', p); } catch { } setPin(p); setEdit(false); };
  const shown = (rows || []).slice(0, more ? 20 : 5);
  const myIdx = (rows || []).findIndex(r => r.k === pin);
  return <section className="ha-card gang" id="rank">
    <div className="gang-head"><h3><Trophy size={19} /> อันดับแก๊ง</h3>
      <div className="gang-tabs">{[['week', 'สัปดาห์นี้'], ['all', 'ทั้งหมด']].map(([v, l]) => <button key={v} className={period === v ? 'on' : ''} onClick={() => setPeriod(v)}>{l}</button>)}</div></div>
    {rows === null ? <p className="gang-empty">กำลังโหลด…</p> : rows.length === 0 ? <p className="gang-empty">{period === 'week' ? 'สัปดาห์นี้ยังไม่มีใครชนะ' : 'ยังไม่มีผลการเล่น'} — เล่นจบรอบแรกแล้วชื่อจะขึ้นที่นี่</p> :
      <ol className="gang-list">{shown.map((r, i) => <li key={r.k} className={(r.k === pin ? 'me ' : '') + (i < 3 ? 'top' + (i + 1) : '')}>
        <span className="gr">{i + 1}</span><AvFace i={r.av ?? 0} look={r.look} size={30} /><span className="gn">{r.name}</span>
        <span className="gw"><b>{r.wins || 0}</b> ชนะ<small>เล่น {r.games || 0}</small></span></li>)}</ol>}
    {rows && rows.length > 5 && <button className="gang-more" onClick={() => setMore(m => !m)}>{more ? 'ย่อ' : `ดูทั้งหมด (${rows.length})`}</button>}
    {rows && myIdx >= 5 && !more && <p className="gang-me">คุณอยู่อันดับ {myIdx + 1}</p>}
    {!pin || edit ? <PinForm db={db} onSet={save} onCancel={pin ? () => setEdit(false) : null} /> :
      <p className="gang-note">รหัสของคุณ <b className="pin-chip">{pin}</b> <button className="pin-edit" onClick={() => setEdit(true)}>เปลี่ยน</button> · จบรอบแล้วได้แต้ม = ชนะ 1 ครั้ง</p>}
  </section>;
}
