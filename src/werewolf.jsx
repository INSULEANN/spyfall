// เกม "แวร์วูฟ" — กลางคืนหมาป่าแอบกัดชาวบ้าน กลางวันทุกคนโหวตประหารคนที่สงสัย (ระบบเป็นผู้ดำเนินเกมให้)
import React, { useEffect, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw, Eye, EyeOff } from 'lucide-react';

export const WOLF_MIN = 5;
export const WOLF_SCORE = { village: 1, wolf: 2 }; // แต้มต่อคนของฝ่ายที่ชนะ
export const wolfCount = n => (n <= 6 ? 1 : n <= 9 ? 2 : 3);
export const W_ROLES = {
  wolf: { icon: '🐺', name: 'มนุษย์หมาป่า', side: 'wolf', desc: 'กลางคืนตกลงกับเพื่อนหมาป่าเลือกกัดชาวบ้าน 1 คน กลางวันทำตัวเนียนเป็นชาวบ้าน' },
  seer: { icon: '🔮', name: 'หมอดู', side: 'village', desc: 'กลางคืนเลือกดู 1 คนว่าเป็นหมาป่าหรือไม่' },
  doctor: { icon: '💉', name: 'หมอยา', side: 'village', desc: 'กลางคืนเลือกปกป้อง 1 คน (ปกป้องตัวเองได้ แต่ห้ามคนเดิม 2 คืนติด)' },
  hunter: { icon: '🏹', name: 'นายพราน', side: 'village', desc: 'ถ้าคุณตาย ไม่ว่ากลางวันหรือกลางคืน ยิงพาใครไปด้วยได้ 1 คน' },
  villager: { icon: '🧑‍🌾', name: 'ชาวบ้าน', side: 'village', desc: 'ไม่มีพลังพิเศษ ใช้สมองจับหมาป่าให้ได้ตอนกลางวัน' },
};
export const wSide = r => W_ROLES[r]?.side || 'village';
const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

export function makeWolfRound(ids, opts = {}, number = 1) {
  const deck = shuffle(ids); const roles = {}; const k = wolfCount(ids.length); let i = 0;
  deck.slice(i, i += k).forEach(id => roles[id] = 'wolf');
  roles[deck[i++]] = 'seer'; roles[deck[i++]] = 'doctor';
  if (opts.hunter && ids.length >= 6) roles[deck[i++]] = 'hunter';
  deck.slice(i).forEach(id => roles[id] = 'villager');
  const alive = {}; ids.forEach(id => alive[id] = true);
  return { number, kind: 'wolf', roles, alive, reveal: opts.reveal !== false, phase: 'night', day: 1, order: shuffle(ids), startedAt: Date.now() };
}

// ---------- ตรรกะเกม (ทำงานบนข้อมูลห้องทั้งก้อนภายใน transaction) ----------
const here = (cur, id) => !!cur.players?.[id];
const living = cur => Object.keys(cur.round.alive || {}).filter(id => cur.round.alive[id] && here(cur, id));
const isAlive = (cur, id) => !!cur.round.alive?.[id] && here(cur, id);
const hasRole = (cur, role) => living(cur).filter(id => cur.round.roles[id] === role);
function log(rd, e) { rd.log = [...(rd.log || []), e]; }
function winner(cur) {
  const al = living(cur); const w = al.filter(id => wSide(cur.round.roles[id]) === 'wolf').length;
  if (w === 0) return 'village'; if (w >= al.length - w) return 'wolf'; return null;
}
function endGame(cur, win) {
  const points = {}, sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { points[id] = wSide(cur.round.roles?.[id]) === win ? WOLF_SCORE[win] : 0; sc[id] = (sc[id] || 0) + points[id]; });
  cur.status = 'result'; cur.round.phase = 'done'; cur.scores = sc; cur.result = { type: 'wolf', winner: win, points };
  return cur;
}
// หลังมีคนตาย: นายพรานได้ยิงก่อน แล้วค่อยเช็กผู้ชนะ แล้วไป phase ถัดไป
function afterDeaths(cur, dead, next) {
  const rd = cur.round; const hunter = dead.find(id => rd.roles[id] === 'hunter' && here(cur, id));
  if (hunter) { rd.phase = 'hunter'; rd.hunter = hunter; rd.hunterNext = next; return cur; }
  const w = winner(cur); if (w) return endGame(cur, w);
  return goTo(cur, next);
}
function goTo(cur, next) {
  const rd = cur.round; rd.hunter = null; rd.hunterNext = null;
  if (next === 'night') { rd.phase = 'night'; rd.day = (rd.day || 1) + 1; rd.night = null; }
  else { rd.phase = 'day'; rd.votes = null; }
  return cur;
}

export function nightAct(cur, me, kind, target) {
  const rd = cur.round; if (rd.phase !== 'night' || !isAlive(cur, me) || !isAlive(cur, target)) return;
  const role = rd.roles[me]; const n = { ...(rd.night || {}) };
  if (kind === 'wolf') { if (role !== 'wolf' || wSide(rd.roles[target]) === 'wolf') return; n.wolf = { ...(n.wolf || {}), [me]: target }; }
  else if (kind === 'seer') { if (role !== 'seer' || target === me || n.seer) return; n.seer = target; }
  else if (kind === 'doc') { if (role !== 'doctor' || target === rd.lastDoc || n.doc) return; n.doc = target; }
  else return;
  rd.night = n; return resolveNight(cur, false);
}
// force = host สรุปคืนนี้โดยไม่รอ (หมาป่าเสียงไม่ตรงกัน → เอาเป้าที่ได้มากที่สุด เสมอ = ไม่มีใครถูกกัด)
export function resolveNight(cur, force) {
  const rd = cur.round; if (rd.phase !== 'night') return; const n = rd.night || {};
  const wolves = hasRole(cur, 'wolf'); const wv = n.wolf || {};
  const tgt = wolves.map(id => wv[id]); const agreed = tgt.length > 0 && tgt.every(t => t && t === tgt[0]) ? tgt[0] : null;
  const seerDone = !hasRole(cur, 'seer').length || !!n.seer; const docDone = !hasRole(cur, 'doctor').length || !!n.doc;
  if (!force && !(agreed && seerDone && docDone)) return cur;
  let victim = agreed;
  if (!victim) { const c = {}; tgt.filter(Boolean).forEach(t => c[t] = (c[t] || 0) + 1); const max = Math.max(0, ...Object.values(c)); const top = Object.keys(c).filter(t => c[t] === max); victim = max > 0 && top.length === 1 ? top[0] : null; }
  if (victim && !isAlive(cur, victim)) victim = null;
  rd.shot = null;
  if (n.seer) { const s = hasRole(cur, 'seer')[0]; rd.seerLog = [...(rd.seerLog || []), { day: rd.day, by: s, target: n.seer, wolf: rd.roles[n.seer] === 'wolf' }]; }
  rd.lastDoc = n.doc || null;
  const saved = !!victim && n.doc === victim; const dead = victim && !saved ? [victim] : [];
  dead.forEach(id => rd.alive[id] = false);
  rd.dawn = { day: rd.day, dead, saved }; log(rd, { t: 'night', day: rd.day, dead });
  return afterDeaths(cur, dead, 'day');
}
export function dayVote(cur, me, target) {
  const rd = cur.round; if (rd.phase !== 'day' || !isAlive(cur, me)) return;
  if (target !== 'skip' && (!isAlive(cur, target) || target === me)) return;
  rd.votes = { ...(rd.votes || {}), [me]: target }; return resolveDay(cur, false);
}
// เสียงมากที่สุด (ไม่เสมอ) ถูกประหาร; ถ้า "ไม่ประหาร" ชนะ หรือเสมอ = ไม่มีใครตาย
export function resolveDay(cur, force) {
  const rd = cur.round; if (rd.phase !== 'day') return; const al = living(cur); const v = rd.votes || {};
  if (!force && !al.every(id => id in v)) return cur;
  const c = {}; al.forEach(id => { if (v[id]) c[v[id]] = (c[v[id]] || 0) + 1; });
  const max = Math.max(0, ...Object.values(c)); const top = Object.keys(c).filter(t => c[t] === max);
  const out = max > 0 && top.length === 1 && top[0] !== 'skip' && isAlive(cur, top[0]) ? top[0] : null;
  rd.lastVote = { day: rd.day, votes: v, out, counts: c }; rd.shot = null;
  const dead = out ? [out] : []; dead.forEach(id => rd.alive[id] = false);
  log(rd, { t: 'day', day: rd.day, dead }); rd.dawn = null;
  return afterDeaths(cur, dead, 'night');
}
export function hunterShoot(cur, me, target) {
  const rd = cur.round; if (rd.phase !== 'hunter' || rd.hunter !== me || (target && !isAlive(cur, target))) return;
  if (target) { rd.alive[target] = false; log(rd, { t: 'shot', day: rd.day, by: me, dead: [target] }); }
  rd.shot = { by: me, target: target || null };
  const w = winner(cur); if (w) return endGame(cur, w);
  return goTo(cur, rd.hunterNext || 'day');
}

// ---------- หน้าจอ ----------
export function WolfGame({ db, room, roomCode, myId, players, isHost, scores, sound, beep, nameOf, onBack }) {
  const r = room.round; const res = room.status === 'result' && room.result;
  const [showRole, setShowRole] = useState(false);
  const myRole = r.roles?.[myId]; const info = W_ROLES[myRole] || W_ROLES.villager;
  const alive = r.alive || {}; const meAlive = !!alive[myId];
  const order = (r.order || []).filter(id => room.players?.[id]);
  const liveIds = order.filter(id => alive[id]);
  const n = r.night || {}; const votes = r.votes || {};
  const wolves = Object.keys(r.roles || {}).filter(id => r.roles[id] === 'wolf');
  const seeAll = !meAlive || res; // คนตายดูเกมได้ทั้งหมด (ห้ามบอกคนที่ยังเล่น!)
  const showRoleOf = id => seeAll || (r.reveal && !alive[id]) || id === myId || (myRole === 'wolf' && r.roles[id] === 'wolf');
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), cur => { if (!cur || cur.status !== 'playing' || cur.round?.kind !== 'wolf') return; return f(cur); });
  const act = (kind, t) => tx(cur => nightAct(cur, myId, kind, t));
  const vote = t => tx(cur => dayVote(cur, myId, t));
  const phaseKey = `${r.day}-${r.phase}`;
  useEffect(() => { if (sound && !res) beep(r.phase === 'night' ? 300 : 880, .2); }, [phaseKey]);
  const deadNames = ids => (ids || []).map(id => `${nameOf(id)}${r.reveal ? ` (${W_ROLES[r.roles[id]]?.icon} ${W_ROLES[r.roles[id]]?.name})` : ''}`).join(', ');
  const Pick = ({ ids, sel, onPick, tags, disabled }) => <div className="ex-pick">{ids.map(id => <button key={id} disabled={disabled} className={'vote-row' + (sel === id ? ' selected' : '')} onClick={() => onPick(id)}><span>{nameOf(id)}{id === myId && ' (คุณ)'}</span><span>{tags?.(id) || (sel === id ? '✓ เลือกแล้ว' : 'เลือก')}</span></button>)}</div>;

  return <div className="explore-game wolf-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number} • วันที่ {r.day}</span><span className="cat-tag">{r.phase === 'night' ? '🌙 กลางคืน' : r.phase === 'hunter' ? '🏹 นายพราน' : res ? '🏁 จบเกม' : '☀️ กลางวัน'}</span></div>

    {!res && <div className="role-card ex-role">
      <span className="role-icon">{showRole ? info.icon : '🌕'}</span>
      <h3>{showRole ? info.name : 'บทบาทลับของคุณ'}</h3>
      {showRole ? <><p>{info.desc}</p>
        <p className={'ex-side ' + (info.side === 'wolf' ? 'bad' : 'good')}>{info.side === 'wolf' ? '🐺 ฝ่ายหมาป่า' : '🏡 ฝ่ายชาวบ้าน'}</p>
        {myRole === 'wolf' && <p>เพื่อนหมาป่า: <b>{wolves.filter(id => id !== myId).map(nameOf).join(', ') || '— ไม่มี —'}</b></p>}
        {myRole === 'seer' && (r.seerLog || []).length > 0 && <p>🔮 ที่ดูมาแล้ว: {r.seerLog.map((s, i) => <span key={i}><br />คืนที่ {s.day}: <b>{nameOf(s.target)}</b> {s.wolf ? <b className="bad">เป็นหมาป่า!</b> : <b className="good">ไม่ใช่หมาป่า</b>}</span>)}</p>}
      </> : <p>กดเปิดดูคนเดียว ระวังคนแอบมองจอ!</p>}
      <button className="secondary" onClick={() => setShowRole(!showRole)}>{showRole ? <EyeOff size={16} /> : <Eye size={16} />} {showRole ? 'ซ่อนบทบาท' : 'เปิดดูบทบาท'}</button>
    </div>}

    {!res && !meAlive && <div className="ex-banner fail">💀 คุณตายแล้ว — ดูเกมต่อได้และเห็นบทบาททุกคน แต่ห้ามพูดหรือใบ้คนที่ยังเล่นอยู่นะ!</div>}

    {!res && r.phase === 'night' && <>
      <h2>🌙 คืนที่ {r.day} — ทุกคนหลับตา…</h2>
      {meAlive && myRole === 'wolf' && <><p className="hint">หมาป่าทุกตัวต้องเลือกเหยื่อคนเดียวกัน (เปลี่ยนใจได้)</p>
        <Pick ids={liveIds.filter(id => r.roles[id] !== 'wolf')} sel={n.wolf?.[myId]} onPick={t => act('wolf', t)} tags={id => { const w = wolves.filter(x => n.wolf?.[x] === id); return w.length ? '🐺 ' + w.map(x => x === myId ? 'คุณ' : nameOf(x)).join(', ') : 'กัดคนนี้'; }} /></>}
      {meAlive && myRole === 'seer' && (n.seer ? <div className="confirmed">🔮 คืนนี้ดู {nameOf(n.seer)} แล้ว — ผลจะขึ้นในการ์ดบทบาทตอนเช้า</div>
        : <><p className="hint">เลือกดู 1 คน (เลือกแล้วเปลี่ยนไม่ได้)</p><Pick ids={liveIds.filter(id => id !== myId)} onPick={t => act('seer', t)} tags={() => 'ดูคนนี้'} /></>)}
      {meAlive && myRole === 'doctor' && (n.doc ? <div className="confirmed">💉 คืนนี้ปกป้อง {nameOf(n.doc)}</div>
        : <><p className="hint">เลือกปกป้อง 1 คน{r.lastDoc ? ` (คืนก่อนปกป้อง ${nameOf(r.lastDoc)} — คืนนี้ห้ามซ้ำ)` : ''}</p><Pick ids={liveIds.filter(id => id !== r.lastDoc)} onPick={t => act('doc', t)} tags={() => 'ปกป้อง'} /></>)}
      {meAlive && !['wolf', 'seer', 'doctor'].includes(myRole) && <div className="waiting">😴 หลับฝันดี… รอเช้า (ทำหน้าเฉย ๆ ไว้ อย่าให้ใครรู้ว่าคุณไม่มีอะไรทำ)</div>}
      {seeAll && <div className="waiting">👻 หมาป่าเล็ง: {Object.entries(n.wolf || {}).map(([w, t]) => `${nameOf(w)}→${nameOf(t)}`).join(', ') || '-'} • หมอดู: {n.seer ? nameOf(n.seer) : '-'} • หมอยา: {n.doc ? nameOf(n.doc) : '-'}</div>}
      {isHost && <div className="head-host"><button className="link-btn" onClick={() => { if (confirm('จบคืนนี้เลยโดยไม่รอ? (คนที่หลุดหรือยังไม่เลือกจะถูกข้าม)')) tx(cur => resolveNight(cur, true)); }}>จบคืนนี้เลย (ไม่รอ)</button></div>}
    </>}

    {!res && r.phase === 'hunter' && <>
      <h2>🏹 {nameOf(r.hunter)} คือนายพราน!</h2>
      <p className="hint">ก่อนตาย นายพรานยิงพาใครไปด้วยได้ 1 คน</p>
      {r.hunter === myId ? <><Pick ids={liveIds} onPick={t => { if (confirm(`ยิง ${nameOf(t)}?`)) tx(cur => hunterShoot(cur, myId, t)); }} tags={() => '🏹 ยิง'} />
        <button className="secondary wide" onClick={() => tx(cur => hunterShoot(cur, myId, null))}>ไม่ยิงใคร</button></>
        : <div className="waiting">⏳ รอนายพรานเล็งเป้า…</div>}
      {isHost && r.hunter !== myId && <div className="head-host"><button className="link-btn" onClick={() => { if (confirm('ข้ามนายพราน (ไม่ยิงใคร)?')) tx(cur => hunterShoot(cur, cur.round.hunter, null)); }}>ข้ามนายพราน</button></div>}
    </>}

    {!res && r.phase === 'day' && <>
      <div className={'ex-banner ' + (r.dawn?.dead?.length ? 'fail' : 'ok')}>☀️ เช้าวันที่ {r.day}: {r.dawn?.dead?.length ? `${deadNames(r.dawn.dead)} ถูกหมาป่ากัดตายเมื่อคืน 🩸` : 'เมื่อคืนไม่มีใครตาย 🙏'}{r.shot?.target && r.dawn ? ` • นายพรานยิง ${deadNames([r.shot.target])}` : ''}</div>
      <h2>ใครคือหมาป่า? โหวตประหาร</h2>
      <p className="hint">คุยกันให้พอ แล้วโหวต — เสียงมากที่สุดถูกประหาร เสมอหรือ "ไม่ประหาร" ชนะ = ไม่มีใครตาย • สรุปเมื่อคนที่ยังมีชีวิตโหวตครบ</p>
      {meAlive ? <><Pick ids={liveIds.filter(id => id !== myId)} sel={votes[myId]} onPick={vote} tags={id => { const c = Object.values(votes).filter(t => t === id).length; return (votes[myId] === id ? '✓ ' : '') + (c ? `${c} เสียง` : 'โหวต'); }} />
        <button className={'secondary wide' + (votes[myId] === 'skip' ? ' selected' : '')} onClick={() => vote('skip')}>🤷 ไม่ประหารใคร{votes[myId] === 'skip' ? ' ✓' : ''} ({Object.values(votes).filter(t => t === 'skip').length})</button></>
        : <div className="waiting">👻 คนตายโหวตไม่ได้</div>}
      <div className="ready-list"><div className="ready-head">🗳️ โหวตแล้ว <b>{liveIds.filter(id => id in votes).length}/{liveIds.length}</b> คน (เปลี่ยนใจได้จนกว่าจะครบ)</div></div>
      {isHost && <div className="head-host"><button className="link-btn" onClick={() => { if (confirm('สรุปโหวตเลย? คนที่ยังไม่โหวตไม่นับ')) tx(cur => resolveDay(cur, true)); }}>สรุปโหวตเลย (ไม่รอ)</button></div>}
    </>}

    {!res && r.phase === 'night' && r.lastVote && r.lastVote.day === r.day - 1 && <div className={'ex-banner ' + (r.lastVote.out ? 'fail' : 'ok')}>⚖️ เมื่อวาน: {r.lastVote.out ? `${deadNames([r.lastVote.out])} ถูกประหาร` : 'ไม่มีใครถูกประหาร'}{r.shot?.target && !r.dawn ? ` • นายพรานยิง ${deadNames([r.shot.target])}` : ''} — {Object.entries(r.lastVote.votes || {}).map(([a, b]) => `${nameOf(a)}→${b === 'skip' ? 'ไม่ประหาร' : nameOf(b)}`).join(' • ')}</div>}

    {res && <>
      <h2>{res.winner === 'village' ? 'ชาวบ้านชนะ! หมาป่าหมดหมู่บ้าน 🏡' : 'หมาป่าชนะ! ยึดหมู่บ้านได้แล้ว 🐺'}</h2>
      <div className="result-card"><div className="big-emoji">{res.winner === 'village' ? '🏆' : '🌕'}</div>
        <h4 className="ballot-title">บทบาทของแต่ละคน</h4>
        <ul className="role-list">{players.map(p => { const ri = W_ROLES[r.roles?.[p.id]] || W_ROLES.villager; return <li key={p.id}><span>{alive[p.id] ? '' : '💀 '}{p.name}</span><b className={ri.side === 'wolf' ? 'spy' : ''}>{ri.icon} {ri.name}</b></li>; })}</ul>
        <h4 className="ballot-title">🏅 ตารางคะแนนสะสม</h4>
        <ol className="leaderboard">{[...players].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)).map((p, i) => { const d = res.points?.[p.id] || 0; return <li key={p.id} className={p.id === myId ? 'me' : ''}><span className="rank">{['🥇', '🥈', '🥉'][i] || i + 1}</span><span className="lb-name">{p.name}</span><em className={d > 0 ? 'up' : ''}>{d > 0 ? '+' + d : '±0'}</em><b>{scores[p.id] || 0}</b></li>; })}</ol>
      </div>
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </>}

    <h4 className="ballot-title">👥 ชาวบ้าน</h4>
    <ul className="role-list">{order.map(id => <li key={id}><span>{alive[id] ? '🙂' : '💀'} {nameOf(id)}{id === myId && ' (คุณ)'}</span><b className={showRoleOf(id) && r.roles[id] === 'wolf' ? 'spy' : ''}>{showRoleOf(id) ? `${W_ROLES[r.roles[id]]?.icon} ${W_ROLES[r.roles[id]]?.name}` : alive[id] ? 'ยังมีชีวิต' : 'ตายแล้ว'}</b></li>)}</ul>

    {(r.log || []).length > 0 && <><h4 className="ballot-title">📜 บันทึกหมู่บ้าน</h4><ul className="head-log">{[...r.log].reverse().map((e, i) => <li key={i}>
      {e.t === 'night' && <>🌙 คืนที่ {e.day}: {e.dead?.length ? <span className="bad">{deadNames(e.dead)} ถูกกัด</span> : 'ไม่มีใครตาย'}</>}
      {e.t === 'day' && <>☀️ วันที่ {e.day}: {e.dead?.length ? <span className="bad">{deadNames(e.dead)} ถูกประหาร</span> : 'ไม่มีใครถูกประหาร'}</>}
      {e.t === 'shot' && <>🏹 นายพราน {nameOf(e.by)} ยิง <span className="bad">{deadNames(e.dead)}</span></>}
    </li>)}</ul></>}
  </div>;
}
