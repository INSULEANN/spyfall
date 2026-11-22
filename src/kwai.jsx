// เกม คำไว (type 'kw') — ผลัดกันพิมพ์คำในหมวด ห้ามซ้ำ พิมพ์ไม่ทันเวลา = ตกรอบ เหลือคนสุดท้ายชนะ
//   พิมพ์ใกล้เคียงคำในคลัง (ถูกเกือบหมด) → ขึ้นตัวเลือกให้แตะ แก้ปัญหาสะกดผิดนิดหน่อย
//   คำที่ไม่มีในคลัง → เพื่อนโหวต ยอมรับครบทุกคน (อย่างน้อย 2 เสียง) = เพิ่มเข้าคลังกลาง kw/<หมวด>/<คำ> ใช้ได้ทุกห้อง
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ref, runTransaction, onValue, set, serverTimestamp } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint } from './rand.js';
import { Avatar, Phase, Outcome, Leaderboard, HostBar, SecH, TimerRing, ActionSheet } from './ui.jsx';
import { KW_CATS, KW_GROUPS } from './kwWords.js';

export const KW_MIN = 2, KW_MAX = 12;
export const KW_SCORE = { win: 3, second: 1 };
export const KW_VOTE_MS = 12000;
export const KW_SECS = [5, 60];
export const kwSecs = v => { const n = Math.round(+v / 5) * 5; return n >= KW_SECS[0] && n <= KW_SECS[1] ? n : 15; };
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
const fix = r => { r.order = r.order || []; r.alive = r.alive || {}; r.used = r.used || {}; r.chain = r.chain || []; r.out = r.out || []; r.votes = r.votes || {}; r.log = r.log || []; r.cnt = r.cnt || {}; r.added = r.added || []; return r; };

// ---------- จับคู่คำ ----------
// ตัวพิมพ์เล็ก ตัดวรรค/เครื่องหมาย/accent (é → e) — ใช้เป็น key ใน Firebase ได้ (ไม่มี . # $ [ ] /)
export const kwNorm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^\p{L}\p{N}\p{M}]/gu, '').normalize('NFC').slice(0, 40);
export const kwShow = s => String(s || '').replace(/\s+/g, ' ').trim().slice(0, 40);
function lev(a, b, cap) {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]; let best = i;
    for (let j = 1; j <= b.length; j++) { cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); if (cur[j] < best) best = cur[j]; }
    if (best > cap) return cap + 1; prev = cur;
  }
  return prev[b.length];
}
// คลังของหมวด: [{ w: ชื่อที่แสดง, id: key, keys: [คำที่พิมพ์แล้วนับว่าใช่] }]
export function kwEntries(cat, extra = {}) {
  const c = KW_CATS.find(x => x.id === cat); const out = [];
  (c?.words || []).forEach(s => { const names = s.split('|'); const keys = new Set(names.map(kwNorm));
    names.forEach(n => n.split(/\s+/).forEach(t => { const k = kwNorm(t); if (/^[a-z]/.test(k) && k.length >= 4) keys.add(k); }));   // ชื่อฝรั่ง: พิมพ์นามสกุลอย่างเดียวก็ได้ (Messi)
    out.push({ w: names.find(n => /[฀-๿]/.test(n)) || names[0], id: kwNorm(names[0]), keys: [...keys] }); });   // แสดงชื่อไทยถ้ามี
  Object.entries(extra || {}).forEach(([id, v]) => { if (!out.some(e => e.id === id)) out.push({ w: v?.w || id, id, keys: [id] }); });
  return out;
}
export const kwExact = (ents, text) => { const t = kwNorm(text); return t ? ents.find(e => e.keys.includes(t)) || null : null; };
// ตัวเลือก: พิมพ์ถูกเกือบหมดแล้ว (ขึ้นต้นตรง ≥ 60% ของคำ หรือสะกดผิดไม่เกิน ~1 ใน 4)
export function kwSuggest(ents, text, n = 3) {
  const t = kwNorm(text); if ([...t].length < 2) return [];
  const res = [];
  for (const e of ents) {
    let best = 99;
    for (const k of e.keys) {
      const L = k.length; if (k === t) { best = 0; break; }
      if (k.startsWith(t) && t.length >= Math.max(2, Math.ceil(L * 0.6))) best = Math.min(best, 0.5 + (L - t.length) / L);
      const cap = Math.max(1, Math.floor(L / 4)); if (L >= 3) { const d = lev(t, k, cap); if (d <= cap) best = Math.min(best, d); }
    }
    if (best < 99) res.push([best, e]);
  }
  return res.sort((a, b) => a[0] - b[0]).slice(0, n).map(x => x[1]);
}

export function makeKwRound(ids, set = {}, number = 1, t0 = Date.now()) {
  const cats = (set.cats || []).filter(id => KW_CATS.some(c => c.id === id)); const pool = cats.length ? cats : KW_CATS.map(c => c.id);
  const cat = pool[rint(pool.length)]; const tmT = kwSecs(set.secs) * 1000; const A = {}; ids.forEach(id => { A[id] = true; });
  return { number, kind: 'kw', cat, alive: A, tmT, order: shuffle(ids), turn: 0, used: {}, chain: [], out: [], cnt: {}, phase: 'turn', at: t0 + 3000, until: t0 + 3000 + tmT, pend: null, votes: null, added: [], log: [], startedAt: t0 };
}
export const kwCur = r => r.order[r.turn];
export const kwCatName = id => KW_CATS.find(c => c.id === id)?.name || id;
const living = r => r.order.filter(id => r.alive[id]);
const voters = (cur, r) => living(r).filter(id => id !== r.pend?.by && cur.players?.[id]);

function nextTurn(r, now) {
  const n = r.order.length; for (let k = 1; k <= n; k++) { const j = (r.turn + k) % n; if (r.alive[r.order[j]]) { r.turn = j; break; } }
  r.phase = 'turn'; r.at = now; r.until = now + r.tmT; r.pend = null; r.votes = null;
}
function accept(cur, r, id, w, by, now, voted) {
  r.used = { ...r.used, [id]: true }; r.chain = [...r.chain, { w, by, v: voted ? 1 : 0 }]; r.cnt = { ...r.cnt, [by]: (r.cnt[by] || 0) + 1 };
  nextTurn(r, now); return cur;
}
function knockOut(cur, r, id, now, why) {
  r.alive = { ...r.alive, [id]: false }; r.out = [...r.out, id]; say(r, `💀 {${id}} ${why} — ตกรอบ`);
  if (living(r).length <= 1) return finish(cur, now);
  nextTurn(r, now); return cur;
}
function finish(cur, now) {
  const r = cur.round; const rank = [...living(r), ...[...r.out].reverse()]; r.rank = rank;
  const pts = {}; const sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { const p = id === rank[0] ? KW_SCORE.win : id === rank[1] && rank.length >= 3 ? KW_SCORE.second : 0; pts[id] = p; sc[id] = (sc[id] || 0) + p; });
  r.phase = 'done'; r.at = now; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'kw', winner: rank[0] || null, points: pts };
  return cur;
}

// ---------- การกระทำ (เรียกใน transaction) ----------
// known = { id, w } เมื่อเป็นคำในคลัง (เครื่องคนส่งจับคู่เอง) • null → ให้เพื่อนโหวต
export function kwSubmit(cur, me, text, known, now) {
  const r = cur.round; if (r?.kind !== 'kw') return; fix(r);
  if (cur.status !== 'playing' || r.phase !== 'turn' || kwCur(r) !== me || now < r.at) return;
  const w = known ? kwShow(known.w) : kwShow(text); const id = known ? kwNorm(known.id) : kwNorm(text);
  if ([...id].length < 2 || r.used[id]) return;
  if (known) return accept(cur, r, id, w, me, now, false);
  r.phase = 'vote'; r.pend = { w, id, by: me, left: Math.max(5000, r.until - now) }; r.votes = {}; r.at = now; r.until = now + KW_VOTE_MS;
  if (!voters(cur, r).length) return accept(cur, r, id, w, me, now, true);
  return cur;
}
export function kwVote(cur, me, yes, now) {
  const r = cur.round; if (r?.kind !== 'kw') return; fix(r);
  if (cur.status !== 'playing' || r.phase !== 'vote' || !voters(cur, r).includes(me)) return;
  r.votes = { ...(r.votes || {}), [me]: !!yes };
  if (!yes) return reject(cur, r, now);
  if (voters(cur, r).every(id => r.votes[id])) return pass(cur, r, now);
  return cur;
}
function pass(cur, r, now) {
  const { w, id, by } = r.pend; const vs = voters(cur, r); const all = vs.length >= 2 && vs.every(x => r.votes?.[x] === true);
  if (all) r.added = [...r.added, { id, w }];
  say(r, `🗳️ เพื่อนยอมรับคำ “${w}” ของ {${by}}${all ? ' — เพิ่มเข้าคลังคำแล้ว 📚' : ''}`);
  return accept(cur, r, id, w, by, now, true);
}
function reject(cur, r, now) {
  const { w, by, left } = r.pend; say(r, `🙅 ไม่ยอมรับคำ “${w}” ของ {${by}} — พิมพ์คำใหม่`);
  r.phase = 'turn'; r.at = now; r.until = now + left; r.pend = null; r.votes = null; return cur;
}
export function kwGiveUp(cur, me, now, host) {
  const r = cur.round; if (r?.kind !== 'kw') return; fix(r);
  if (cur.status !== 'playing' || r.phase !== 'turn' || (kwCur(r) !== me && !host)) return;
  return knockOut(cur, r, kwCur(r), now, me === kwCur(r) ? 'ยอมแพ้' : 'ถูกข้าม');
}
export function kwTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'kw' || cur.status !== 'playing') return; fix(r);
  if (r.phase === 'turn' && now >= r.until) return knockOut(cur, r, kwCur(r), now, 'พิมพ์ไม่ทัน');
  if (r.phase === 'vote' && now >= r.until) { const v = Object.values(r.votes || {}); return v.length && v.every(Boolean) ? pass(cur, r, now) : reject(cur, r, now); }
}
export function kwForce(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'kw') return; fix(r);
  if (r.phase === 'vote') { const v = Object.values(r.votes || {}); return v.length && v.every(Boolean) ? pass(cur, r, now) : reject(cur, r, now); }
  return finish(cur, now);
}
export function kickKw(cur, id, now) {
  const r = cur.round; if (r?.kind !== 'kw') return; fix(r);
  if (cur.status !== 'playing' || cur.players?.[id] || !r.alive[id]) return;
  const wasTurn = kwCur(r) === id && r.phase === 'turn';
  r.alive = { ...r.alive, [id]: false }; r.out = [...r.out, id]; say(r, `🚪 {${id}} ออกจากเกม`);
  if (living(r).length <= 1) return finish(cur, now);
  if (r.phase === 'vote') { if (r.pend.by === id) nextTurn(r, now); else if (voters(cur, r).every(x => r.votes?.[x])) return pass(cur, r, now); }
  else if (wasTurn) nextTurn(r, now);
  return cur;
}

// ---------- หน้าจอ ----------
export function KwGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, onBack, srvNow }) {
  const r = fix({ ...room.round }); const res = room.status === 'result' && room.result; const cat = r.cat;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'kw') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const [extra, setExtra] = useState({}); const [txt, setTxt] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  useEffect(() => onValue(ref(db, `kw/${cat}`), s => setExtra(s.val() || {}), () => {}), [cat]);
  const ents = useMemo(() => kwEntries(cat, extra), [cat, extra]);
  const cur = kwCur(r); const myTurn = !res && r.phase === 'turn' && cur === myId; const pend = r.pend;
  const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const due = !res && srvNow >= r.until;
  useEffect(() => { if (due) tx(c => kwTick(c, srvNow)); }, [due, r.at, r.phase]);
  useEffect(() => { if (myTurn) sfx(sound, 'yourTurn'); }, [myTurn, r.at]);
  useEffect(() => { setTxt(''); setErr(''); }, [r.chain.length, r.turn]);
  const saved = useRef({});
  useEffect(() => { r.added.forEach(({ id, w }) => { const e = r.chain.find(c => kwNorm(c.w) === kwNorm(w)); if (!e || e.by !== myId || saved.current[id] || extra[id]) return; saved.current[id] = 1; set(ref(db, `kw/${cat}/${id}`), { w, by: String(nameOf(myId)).slice(0, 24), at: serverTimestamp() }).catch(() => {}); }); }, [r.added.length]);

  const exact = kwExact(ents, txt); const sugg = myTurn ? kwSuggest(ents, txt) : [];
  const usedHit = exact && r.used[exact.id] ? exact : null;
  const myVoter = !res && r.phase === 'vote' && pend && pend.by !== myId && r.alive[myId] && !!room.players?.[myId];
  const tail = r.chain.slice(-12);

  async function send(known, text) {
    if (known && r.used[known.id]) { setErr(`“${known.w}” ใช้ไปแล้ว`); sfx(sound, 'wrong'); return; }
    if (!known && [...kwNorm(text)].length < 2) { setErr('พิมพ์อย่างน้อย 2 ตัวอักษร'); return; }
    if (!known && r.used[kwNorm(text)]) { setErr('คำนี้ใช้ไปแล้ว'); sfx(sound, 'wrong'); return; }
    setBusy(true); sfx(sound, 'confirm'); const ok = await tx(c => kwSubmit(c, myId, text, known ? { id: known.id, w: known.w } : null, srvNow)); setBusy(false);
    if (!ok) setErr('ส่งไม่ทัน ลองอีกครั้ง');
  }
  const enter = () => { if (busy || !txt.trim()) return; if (exact) send(exact); else if (sugg.length === 1 && !r.used[sugg[0].id]) send(sugg[0]); else send(null, txt); };

  if (res) {
    const W = res.winner; const rank = r.rank || [];
    return <div className="uc-game wc-game">
      <Outcome art={W === myId ? 'win' : 'medal'} tone={W === myId ? 'good' : ''} title={W ? (W === myId ? '🏆 คุณชนะ!' : `🏆 ${nameOf(W)} ชนะ!`) : 'จบเกม'}>
        หมวด {kwCatName(cat)} • พิมพ์ได้ทั้งหมด {r.chain.length} คำ {r.added.length ? `• เพิ่มคำใหม่เข้าคลัง ${r.added.length} คำ` : ''}
      </Outcome>
      <SecH icon="🏁">อันดับ</SecH>
      <ol className="wc-rank">{rank.map((id, i) => <li key={id}><b>{['🥇', '🥈', '🥉'][i] || i + 1}</b><Avatar id={id} av={av} size={30} /><span>{nameOf(id)}</span><small>{r.cnt[id] || 0} คำ</small></li>)}</ol>
      {r.added.length > 0 && <><SecH icon="📚">คำใหม่ที่เพิ่มเข้าคลัง</SecH><div className="wc-chain">{r.added.map(a => <span key={a.id} className="wc-word voted">{a.w}</span>)}</div></>}
      <SecH icon="📝">คำที่พิมพ์ทั้งหมด</SecH>
      <div className="wc-chain">{r.chain.map((c, i) => <span key={i} className={'wc-word' + (c.v ? ' voted' : '')} title={nameOf(c.by)}>{c.w}</span>)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </div>;
  }

  return <div className="uc-game wc-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">{r.chain.length} คำ</span></div>
    <div className="wc-need kw-cat"><small>หมวด</small><b>{kwCatName(cat)}</b></div>
    {tail.length > 0 && <div className="wc-chain">{r.chain.length > tail.length && <span className="wc-more">…</span>}{tail.map((c, i) => <span key={r.chain.length - tail.length + i} className={'wc-word' + (c.v ? ' voted' : '') + (i === tail.length - 1 ? ' last' : '')} title={nameOf(c.by)}>{c.w}</span>)}</div>}

    {r.phase === 'turn' && <Phase art={myTurn ? 'note' : 'think'} tone={myTurn ? 'me' : ''} kicker="⚡ ตาพิมพ์คำ" title={myTurn ? 'ตาคุณ! พิมพ์เลย' : `ตาของ ${nameOf(cur)}`} aside={<TimerRing secs={secs(r.until - srvNow)} total={r.tmT / 1000} label="วิ" />}>
      พิมพ์คำในหมวดนี้ • ห้ามซ้ำ • พิมพ์ไม่ทันเวลา = ตกรอบทันที
    </Phase>}
    {r.phase === 'vote' && pend && <Phase art="vote" tone={myVoter && r.votes[myId] == null ? 'me' : ''} kicker="🗳️ คำนี้ไม่มีในคลัง" title={`${pend.by === myId ? 'คุณ' : nameOf(pend.by)} ส่งคำ “${pend.w}”`} aside={<TimerRing secs={secs(r.until - srvNow)} total={KW_VOTE_MS / 1000} label="วิ" />}>
      อยู่ในหมวด {kwCatName(cat)} จริงไหม? • มีคนค้าน 1 คน = ไม่ผ่าน • ยอมรับครบทุกคน = เพิ่มเข้าคลังให้ทุกห้อง
      <div className="wc-votes">{voters(room, r).map(id => <span key={id} className={'wc-v ' + (r.votes[id] === true ? 'y' : r.votes[id] === false ? 'n' : '')}><Avatar id={id} av={av} size={24} />{r.votes[id] === true ? '✅' : r.votes[id] === false ? '❌' : '…'}</span>)}</div>
    </Phase>}

    <div className="wc-players">{r.order.map(id => <div key={id} className={'wc-p' + (id === cur ? ' now' : '') + (!r.alive[id] ? ' dead' : '') + (id === myId ? ' mine' : '')}>
      <Avatar id={id} av={av} size={38} /><b>{id === myId ? 'คุณ' : nameOf(id)}</b><span className="wc-hearts">{r.alive[id] ? '⚡' : '💀'}</span><small>{r.cnt[id] || 0} คำ</small></div>)}</div>

    <ActionSheet open={myTurn} k={'t' + r.at} icon="⚡" title={kwCatName(cat)} sub={r.chain.length ? `คำล่าสุด: ${r.chain[r.chain.length - 1].w}` : 'คำแรกของรอบ'} secs={secs(r.until - srvNow)} total={r.tmT / 1000}>
      <input className="uc-guess wc-input" autoFocus value={txt} maxLength={40} placeholder="พิมพ์คำในหมวด…" autoCapitalize="off" autoCorrect="off" spellCheck={false}
        onChange={e => { setTxt(e.target.value); setErr(''); }} onKeyDown={e => { if (e.key === 'Enter') enter(); }} />
      {sugg.length > 0 && <div className="kw-sugg"><small>หมายถึงคำนี้ไหม? แตะเพื่อส่ง</small>{sugg.map(e => <button key={e.id} type="button" disabled={busy || !!r.used[e.id]} className={r.used[e.id] ? 'used' : ''} onClick={() => send(e)}>{e.w}{r.used[e.id] ? <small>ใช้แล้ว</small> : null}</button>)}</div>}
      {usedHit && <div className="wc-err">⚠️ “{usedHit.w}” ใช้ไปแล้ว</div>}
      {err && <div className="wc-err">⚠️ {err}</div>}
      <button className="primary wide" disabled={!txt.trim() || busy} onClick={enter}>{exact || (sugg.length === 1 && !r.used[sugg[0].id]) ? '📨 ส่งคำ' : sugg.length ? '📨 ส่งแบบที่พิมพ์ (ให้เพื่อนโหวต)' : '📨 ส่งคำ'}</button>
      <button className="secondary wide" onClick={() => { if (confirm('ยอมแพ้? (ตกรอบทันที)')) tx(c => kwGiveUp(c, myId, srvNow)); }}>🏳️ คิดไม่ออก ยอมแพ้</button>
    </ActionSheet>
    <ActionSheet open={myVoter && r.votes[myId] == null} k={'v' + r.at} icon="🗳️" title={`“${pend?.w}” อยู่ในหมวดนี้ไหม?`} sub={`หมวด ${kwCatName(cat)} • ${nameOf(pend?.by)} ส่งคำนี้ แต่ไม่มีในคลัง`} secs={secs(r.until - srvNow)} total={KW_VOTE_MS / 1000}>
      <div className="wc-big">{pend?.w}</div>
      <div className="wc-vbtn"><button className="primary" onClick={() => { sfx(sound, 'vote'); tx(c => kwVote(c, myId, true, srvNow)); }}>✅ ยอมรับ</button>
        <button className="secondary" onClick={() => { sfx(sound, 'vote'); tx(c => kwVote(c, myId, false, srvNow)); }}>❌ ไม่ใช่</button></div>
    </ActionSheet>

    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 6).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    {isHost && <HostBar>
      {r.phase === 'turn' && cur !== myId && <button className="secondary" onClick={() => { if (confirm(`ข้าม ${nameOf(cur)}? (ตกรอบทันที)`)) tx(c => kwGiveUp(c, myId, srvNow, true)); }}>⏭️ ข้าม {nameOf(cur)}</button>}
      {r.phase === 'vote' && <button className="secondary" onClick={() => tx(c => kwForce(c, srvNow))}>⏩ สรุปโหวตเลย</button>}
      {r.phase === 'turn' && <button className="secondary" onClick={() => { if (confirm('จบเกมเลย? (จัดอันดับจากคนที่ยังอยู่)')) tx(c => kwForce(c, srvNow)); }}>🏁 จบเกม</button>}
      {r.order.filter(id => !room.players?.[id] && r.alive[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickKw(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
    </HostBar>}
  </div>;
}

// ---------- ห้องรอ: หมวด / เวลา ----------
export function KwLobby({ db, roomCode, room, isHost, sound }) {
  const st = room.settings?.kw || {}; const cats = st.cats || []; const all = KW_CATS.map(c => c.id); const on = id => !cats.length || cats.includes(id);
  const save = patch => { sfx(sound, 'select'); runTransaction(ref(db, `rooms/${roomCode}/settings/kw`), c => ({ ...(c || {}), ...patch })).catch(() => {}); };
  const setCats = nx => { if (!nx.length) return; save({ cats: nx.length === all.length ? null : nx }); };
  const toggleCat = id => { const cur = cats.length ? cats : all; setCats(cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id]); };
  const toggleGroup = (ids, turnOn) => { const cur = cats.length ? cats : all; setCats(turnOn ? [...new Set([...cur, ...ids])] : cur.filter(x => !ids.includes(x))); };
  const [secs, setSecs] = useState(kwSecs(st.secs)); const tm = useRef(null);
  useEffect(() => { setSecs(kwSecs(st.secs)); }, [st.secs]);
  return <div className="uc-lobby wc-lobby">
    <label>⏱️ เวลาต่อตา <b className="wc-secs">{secs} วินาที</b></label>
    <input type="range" className="wc-range" min={KW_SECS[0]} max={KW_SECS[1]} step={5} value={secs} disabled={!isHost} style={{ '--p': ((secs - KW_SECS[0]) / (KW_SECS[1] - KW_SECS[0]) * 100) + '%' }}
      onChange={e => { const v = +e.target.value; setSecs(v); clearTimeout(tm.current); tm.current = setTimeout(() => save({ secs: v }), 250); }} />
    <div className="wc-range-lbl"><span>{KW_SECS[0]} วิ (โหด)</span><span>{KW_SECS[1]} วิ (ชิล)</span></div>
    <label>📚 หมวดคำ {isHost ? '(แตะเพื่อเปิด/ปิด สุ่ม 1 หมวดต่อรอบ)' : '(หัวหน้าห้องตั้ง)'}</label>
    {KW_GROUPS.map(G => { const gc = KW_CATS.filter(c => c.g === G.id); const allOn = gc.every(c => on(c.id)); return <div key={G.id} className="kw-group">
      <div className="kw-ghead"><b>{G.name}</b><small>{gc.filter(c => on(c.id)).length}/{gc.length} หมวด</small>{isHost && <button type="button" className="link-btn" onClick={() => toggleGroup(gc.map(c => c.id), !allOn)}>{allOn ? 'ปิดทั้งกลุ่ม' : 'เปิดทั้งกลุ่ม'}</button>}</div>
      <div className="uc-cats">{gc.map(c => <button key={c.id} type="button" className={'uc-cat' + (on(c.id) ? ' on' : '')} disabled={!isHost} onClick={() => toggleCat(c.id)}>{c.name}<small>{c.words.length} คำ</small></button>)}</div>
    </div>; })}
  </div>;
}
