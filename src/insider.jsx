// เกม Insider
//   👑 Master   รู้คำ — ตอบคำถามด้วยปาก (ใช่ / ไม่ใช่ / ไม่รู้) ไม่มีเทิร์น ทุกคนรู้ว่าใครเป็น Master
//   🙂 Commons  ไม่รู้คำ — ชนะเมื่อทายคำถูก และโหวตจับ Insider ได้
//   🤫 Insider  รู้คำ (แอบ) — ถามนำให้เพื่อนทายถูก ชนะเมื่อทายถูก และไม่โดนจับ
// ลำดับ: ถามทีละคน (ข้าม = คนต่อไป) → ทุกคนกด "มั่นใจแล้ว" → Commons พิมพ์คำตอบ (ไม่บอกว่าใครส่งแล้ว) → บอกถูก/ผิด → ทุกคน (รวม Master) โหวตหา Insider
import React, { useEffect, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint, pickBad } from './rand.js';
import { Avatar, Phase, PlayerGrid, WhoDone, Outcome, Leaderboard, HostBar, SecH, TimerRing, ActionSheet, Voters } from './ui.jsx';
import { HEAD_PACKS } from './headWords.js';

export const INS_MIN = 4, INS_MAX = 12;
export const INS_SCORE = { common: 1, insider: 3 };
export const GUESS_MS = 60000, VOTE_MS = 90000;
export const INS_ROLES = { master: { n: 'Master', e: '👑' }, common: { n: 'Commons', e: '🙂' }, insider: { n: 'Insider', e: '🤫' } };
export const insNorm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[\s\-.'’"]/g, '');
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
const fix = r => { r.order = r.order || []; r.ready = r.ready || {}; r.guesses = r.guesses || {}; r.votes = r.votes || {}; r.log = r.log || []; return r; };

export function makeInsRound(ids, set = {}, number = 1, t0 = Date.now(), hist = [], prevMaster = null) {
  const pool = ids.length > 1 ? ids.filter(id => id !== prevMaster) : ids; const master = pool[rint(pool.length)];
  const [insider] = pickBad(ids.filter(id => id !== master), 1, hist);
  const roles = {}; ids.forEach(id => { roles[id] = id === master ? 'master' : id === insider ? 'insider' : 'common'; });
  const cats = (set.cats || []).filter(i => HEAD_PACKS[i]); const ci = cats.length ? cats[rint(cats.length)] : rint(HEAD_PACKS.length);
  const words = HEAD_PACKS[ci].places; const word = words[rint(words.length)];
  const askMs = Math.max(0, +set.min || 0) * 60000;
  return { number, kind: 'ins', roles, master, insider, word, cat: HEAD_PACKS[ci].name, order: shuffle(ids.filter(id => id !== master)), turn: 0, phase: 'ask', at: t0 + 3000, endsAt: askMs ? t0 + 3000 + askMs : 0, ready: null, guesses: null, ok: null, votes: null, accused: null, log: [], startedAt: t0 };
}
export const commons = r => r.order.filter(id => r.roles[id] === 'common');
export const askerOf = r => (r.phase === 'ask' && r.order.length ? r.order[r.turn % r.order.length] : null);
const voters = r => Object.keys(r.roles).filter(id => r.roles[id] && !r.gone?.[id]);

function toGuess(r, now) { r.phase = 'guess'; r.at = now; r.until = now + GUESS_MS; r.guesses = {}; say(r, '✍️ จบช่วงถามแล้ว — Commons พิมพ์คำตอบ'); }
function judge(r, now) {
  const g = Object.values(r.guesses || {}); r.ok = g.some(x => insNorm(x) === insNorm(r.word));
  r.phase = 'vote'; r.at = now; r.until = now + (r.tmV || VOTE_MS); r.votes = {};
  say(r, r.ok ? `✅ ทายถูก! คำคือ “${r.word}” — โหวตหา Insider` : `❌ ทายผิด คำคือ “${r.word}” — ไม่มีใครชนะ แต่โหวตหา Insider กันหน่อย`);
}
function finish(cur, now) {
  const r = cur.round; const v = r.votes || {}; const c = {};
  voters(r).forEach(id => { const t = v[id]; if (t && r.roles[t]) c[t] = (c[t] || 0) + 1; });
  const max = Math.max(0, ...Object.values(c)); const top = Object.keys(c).filter(k => c[k] === max);
  r.accused = max > 0 && top.length === 1 ? top[0] : null; r.counts = c;
  const caught = r.accused === r.insider; const winner = !r.ok ? 'none' : caught ? 'common' : 'insider';
  const pts = {}; const sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { const role = r.roles[id]; const p = winner === 'common' ? (role === 'common' || role === 'master' ? INS_SCORE.common : 0) : winner === 'insider' ? (role === 'insider' ? INS_SCORE.insider : 0) : 0; pts[id] = p; sc[id] = (sc[id] || 0) + p; });
  r.phase = 'done'; r.at = now; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'ins', winner, caught, points: pts };
  return cur;
}

// ---------- การกระทำ (เรียกใน transaction) ----------
export function insNext(cur, me, now, host) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'ask' || !r.order.length) return;
  if (me !== askerOf(r) && me !== r.master && !host) return;
  r.turn = (r.turn + 1) % r.order.length; r.at = now; return cur;
}
export function insReady(cur, me, on, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'ask' || !r.order.includes(me)) return;
  r.ready = { ...(r.ready || {}), [me]: on || null };
  if (r.order.every(id => r.ready[id])) toGuess(r, now);
  return cur;
}
export function insGuess(cur, me, text, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'guess' || r.roles[me] !== 'common') return;
  const g = String(text || '').trim().slice(0, 40); if (!g) return;
  r.guesses = { ...(r.guesses || {}), [me]: g };
  if (commons(r).every(id => r.guesses[id])) judge(r, now);
  return cur;
}
// Master/หัวหน้าห้อง: คำตอบสะกดต่างนิดหน่อยแต่ความหมายถูก → นับว่าถูก
export function insAccept(cur, me, host) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'vote' || r.ok || (me !== r.master && !host)) return;
  r.ok = true; r.accepted = true; say(r, '✅ Master นับว่าคำตอบถูก (สะกดต่างนิดหน่อย)'); return cur;
}
export function insVote(cur, me, target, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'vote' || !r.roles[me] || !r.order.includes(target) || target === me) return;
  r.votes = { ...(r.votes || {}), [me]: target };
  const vs = voters(r).filter(id => cur.players?.[id]); if (vs.every(id => r.votes[id])) return finish(cur, now);
  return cur;
}
export function insTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'ins' || cur.status !== 'playing') return; fix(r);
  if (r.phase === 'ask' && r.endsAt && now >= r.endsAt) { toGuess(r, now); return cur; }
  if (r.phase === 'guess' && now >= r.until) { judge(r, now); return cur; }
  if (r.phase === 'vote' && now >= r.until) return finish(cur, now);
}
export function insForce(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'ins') return;
  if (r.phase === 'ask') { toGuess(r, now); return cur; }
  if (r.phase === 'guess') { judge(r, now); return cur; }
  if (r.phase === 'vote') return finish(cur, now);
}
// คนหลุดออกจากห้อง: เอาออกจากคิวถาม/คิวทาย/โหวต แล้วเช็กว่าครบหรือยัง
export function kickIns(cur, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || cur.players?.[id] || !r.roles[id] || r.gone?.[id]) return;
  r.gone = { ...(r.gone || {}), [id]: true }; say(r, `🚪 {${id}} ออกจากเกม`);
  const k = r.order.indexOf(id);
  if (k >= 0) { r.order = r.order.filter(x => x !== id); if (k < r.turn) r.turn--; if (r.order.length) r.turn %= r.order.length; else r.turn = 0; }
  if (r.ready) delete r.ready[id]; if (r.guesses) delete r.guesses[id];
  if (r.votes) { const v = { ...r.votes }; delete v[id]; Object.keys(v).forEach(x => { if (v[x] === id) delete v[x]; }); r.votes = v; }
  if (r.phase === 'ask' && r.order.length && r.order.every(x => r.ready?.[x])) toGuess(r, now);
  else if (r.phase === 'guess' && commons(r).every(x => r.guesses?.[x])) judge(r, now);
  else if (r.phase === 'vote' && voters(r).filter(x => cur.players?.[x]).every(x => r.votes?.[x])) return finish(cur, now);
  return cur;
}

// ---------- หน้าจอ ----------
export function InsGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack, srvNow }) {
  const r = fix({ ...room.round }); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'ins') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const [peek, setPeek] = useState(false); const [guess, setGuess] = useState(''); const [fake, setFake] = useState(false);
  const myRole = r.roles[myId]; const isMaster = myRole === 'master'; const knows = myRole === 'master' || myRole === 'insider';
  const asker = askerOf(r); const ready = r.ready; const readyN = r.order.filter(id => ready[id]).length;
  const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const due = !res && ((r.phase === 'ask' && r.endsAt && srvNow >= r.endsAt) || ((r.phase === 'guess' || r.phase === 'vote') && srvNow >= r.until));
  useEffect(() => { if (due) tx(c => insTick(c, srvNow)); }, [due, r.at, r.phase]);
  useEffect(() => { if (asker === myId) sfx(sound, 'yourTurn'); }, [asker === myId, r.turn]);
  useEffect(() => { setGuess(''); setFake(false); }, [r.phase]);
  const roleChip = id => { const x = r.roles[id]; return x ? <span className={'tag ' + (x === 'insider' ? 'bad' : 'good')}>{INS_ROLES[x].e} {INS_ROLES[x].n}</span> : null; };
  const allIds = Object.keys(r.roles); const gList = Object.values(r.guesses).sort();

  if (res) {
    const W = res.winner; const myWin = (W === 'common' && (myRole === 'common' || isMaster)) || (W === 'insider' && myRole === 'insider');
    return <div className="uc-game">
      <Outcome art={W === 'none' ? 'cross' : myWin ? 'win' : 'lose'} tone={myWin ? 'good' : ''} title={W === 'common' ? '🙂 Commons ชนะ!' : W === 'insider' ? '🤫 Insider ชนะ!' : '😵 ไม่มีใครชนะ'}>
        {W === 'none' ? 'Commons ทายคำไม่ถูก ทุกคนแพ้หมด' : res.caught ? `ทายถูก แล้วยังจับ ${nameOf(r.insider)} ได้ด้วย` : r.accused ? `ทายถูก แต่โหวตผิดคน (${nameOf(r.accused)}) — Insider รอด` : 'ทายถูก แต่โหวตเสมอ — Insider รอด'}
      </Outcome>
      <div className="uc-words"><span>🔑 คำคือ <b>{r.word}</b></span><span>🤫 Insider คือ <b>{nameOf(r.insider)}</b></span><small>หมวด {r.cat}</small></div>
      {gList.length > 0 && <div className="ins-guesses"><small>คำตอบที่ Commons ส่ง</small>{gList.map((g, i) => <span key={i} className={insNorm(g) === insNorm(r.word) ? 'ok' : ''}>{g}</span>)}</div>}
      <SecH icon="🎭">บทบาท & คะแนนโหวต</SecH>
      <div className="uc-roles">{allIds.map(id => <div key={id} className={'uc-rc ' + (r.roles[id] === 'insider' ? 'uc' : 'civ')}><Avatar id={id} av={av} size={36} /><b>{nameOf(id)}</b>{roleChip(id)}{r.counts?.[id] ? <small>🗳️ {r.counts[id]}</small> : null}</div>)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </div>;
  }

  return <div className="uc-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">หมวด: {r.cat}</span></div>
    {/* บทบาทของฉัน */}
    {myRole && <div className={'uc-card' + (peek ? ' open' : '')} onClick={() => setPeek(p => !p)}>
      {peek ? (knows ? <><span className="uc-ico">{INS_ROLES[myRole].e}</span><div><small>คุณคือ {INS_ROLES[myRole].n} • คำคือ</small><b className="uc-word">{r.word}</b><small>{isMaster ? 'ตอบคำถามด้วยปากได้แค่ “ใช่ / ไม่ใช่ / ไม่รู้”' : 'ถามนำให้เพื่อนทายถูก แต่อย่าเนียนน้อย เดี๋ยวโดนจับ!'}</small></div></>
        : <><span className="uc-ico">🙂</span><div><b>คุณคือ Commons</b><small>คุณไม่รู้คำ — ถาม Master ให้ได้ใจความ แล้วหาว่าใครดูรู้มากเกินไป</small></div></>)
        : <><span className="uc-ico">🙈</span><div><b>แตะเพื่อดูบทบาทของคุณ</b><small>ดูคนเดียว ระวังคนแอบมอง</small></div></>}
    </div>}
    <div className="ins-master"><Avatar id={r.master} av={av} size={42} /><div><small>👑 Master (รู้คำ ตอบได้แค่ ใช่ / ไม่ใช่ / ไม่รู้)</small><b>{r.master === myId ? 'คุณ' : nameOf(r.master)}</b></div></div>

    {/* ถามทีละคน */}
    {r.phase === 'ask' && <section className={'clue-turn' + (asker === myId ? ' me' : '')}>
      <div className="ct-main">
        <div className="ct-av" key={asker}>{asker && <Avatar id={asker} av={av} size={74} />}{asker === myId && <span className="ct-mic">🎤</span>}</div>
        <div className="ct-text"><span className="ct-kicker">❓ ตาถามคำถาม</span>
          <h2>{asker === myId ? 'ตาคุณ! ถาม Master 1 คำถาม' : <>ตาของ {nameOf(asker)}</>}</h2>
          <small>{isMaster ? 'ฟังคำถามแล้วตอบด้วยปาก • ตอบเสร็จกด “คนต่อไป” ได้เลย' : 'ถามแบบตอบได้ใช่/ไม่ใช่ • ถามเสร็จกด “คนต่อไป”'}</small></div>
        {r.endsAt ? <TimerRing secs={secs(r.endsAt - srvNow)} total={(r.endsAt - r.at) / 1000} size={58} label="วิ" /> : <span className="ct-free">⏳<small>ไม่จับเวลา</small></span>}
      </div>
      <div className="ct-order">{r.order.map(id => <span key={id} className={'ct-chip' + (id === asker ? ' now' : '') + (ready[id] ? ' done' : '') + (id === myId ? ' mine' : '')}><Avatar id={id} av={av} size={26} /><b>{ready[id] ? '✋' : ''}</b></span>)}</div>
      {(asker === myId || isMaster || isHost) && <button className={asker === myId ? 'primary wide' : 'secondary wide'} onClick={() => { sfx(sound, 'click'); tx(c => insNext(c, myId, srvNow, isHost)); }}>⏭️ {asker === myId ? 'ถามเสร็จ / ข้าม — ไปคนต่อไป' : `ข้าม ${nameOf(asker)} ไปคนต่อไป`}</button>}
      {r.order.includes(myId) && <button className={'wide ' + (ready[myId] ? 'secondary' : 'ins-ready')} onClick={() => { sfx(sound, 'select'); tx(c => insReady(c, myId, !ready[myId], srvNow)); }}>{ready[myId] ? '↩️ ยกเลิก (ยังไม่มั่นใจ)' : '✋ มั่นใจแล้ว โหวตจบเกม'}</button>}
      <p className="hint">✋ มั่นใจแล้ว {readyN}/{r.order.length} คน — ครบทุกคนแล้วไปทายคำ</p>
    </section>}

    {/* ทายคำ — ไม่บอกว่าใครส่งแล้ว */}
    {r.phase === 'guess' && <>
      <Phase art="think" tone={myRole === 'common' && !r.guesses[myId] ? 'me' : ''} kicker="✍️ ทายคำ" title={isMaster ? 'รอ Commons ทายคำ…' : r.guesses[myId] || fake ? 'ส่งคำตอบแล้ว รอเพื่อน…' : 'พิมพ์คำที่คิดว่าใช่'} aside={<TimerRing secs={secs(r.until - srvNow)} total={GUESS_MS / 1000} label="วิ" />}>Commons ทายคำ (ไม่บอกว่าใครส่งแล้ว) • ทายถูกอย่างน้อย 1 คน = ถูก</Phase>
      <ActionSheet open={!isMaster && !r.guesses[myId] && !fake} k={'g' + r.number} icon="✍️" title="คำคืออะไร?" sub={myRole === 'insider' ? 'คุณคือ Insider — ไม่นับคำตอบนี้ พิมพ์อะไรก็ได้ให้ดูเนียน' : 'พิมพ์คำที่คุณคิดว่าเป็นคำลับ'} secs={secs(r.until - srvNow)} total={GUESS_MS / 1000}>
        <input className="uc-guess" autoFocus value={guess} maxLength={40} placeholder="พิมพ์คำตอบ" onChange={e => setGuess(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && guess.trim()) send(); }} />
        <button className="primary wide" disabled={!guess.trim()} onClick={send}>📨 ส่งคำตอบ</button>
      </ActionSheet>
    </>}

    {/* โหวตหา Insider */}
    {r.phase === 'vote' && <>
      <div className={'ins-verdict ' + (r.ok ? 'ok' : 'no')}><b>{r.ok ? '✅ ทายถูก!' : '❌ ทายผิด'}</b><span>คำคือ “{r.word}”</span>{gList.length > 0 && <div className="ins-guesses">{gList.map((g, i) => <span key={i} className={insNorm(g) === insNorm(r.word) ? 'ok' : ''}>{g}</span>)}</div>}
        {!r.ok && (isMaster || isHost) && <button className="secondary" onClick={() => tx(c => insAccept(c, myId, isHost))}>✔️ นับว่าถูก (สะกดต่างนิดหน่อย)</button>}
        {!r.ok && <small>ไม่มีใครชนะรอบนี้ แต่โหวตหา Insider ให้รู้กันหน่อย</small>}</div>
      <Phase art="vote" tone={!r.votes[myId] ? 'me' : ''} kicker="🗳️ โหวตหา Insider" title={r.votes[myId] ? `คุณโหวต ${nameOf(r.votes[myId])} แล้ว (เปลี่ยนใจได้)` : 'ใครคือ Insider?'} aside={<TimerRing secs={secs(r.until - srvNow)} total={(r.tmV || VOTE_MS) / 1000} label="วิ" />}>ทุกคนโหวต รวมถึง Master • เสียงมากสุดคือคนที่ถูกจับ • เสมอ = Insider รอด</Phase>
      <PlayerGrid ids={r.order.filter(id => id !== myId)} av={av} nameOf={nameOf} selected={r.votes[myId]} onPick={myRole ? t => { sfx(sound, 'vote'); tx(c => insVote(c, myId, t, srvNow)); } : undefined}
        badge={id => <Voters ids={allIds.filter(v => r.votes[v] === id)} av={av} size={20} />} />
      <WhoDone ids={allIds.filter(id => room.players?.[id])} done={id => !!r.votes[id]} av={av} nameOf={nameOf} label="🗳️ โหวตแล้ว" />
      <ActionSheet open={!!myRole && !r.votes[myId]} k={'v' + r.number} icon="🗳️" title="ใครคือ Insider?" sub="แตะคนที่ดูรู้มากเกินไป (เปลี่ยนใจทีหลังได้)" secs={secs(r.until - srvNow)} total={(r.tmV || VOTE_MS) / 1000}>
        <PlayerGrid ids={r.order.filter(id => id !== myId)} av={av} nameOf={nameOf} onPick={t => { sfx(sound, 'vote'); tx(c => insVote(c, myId, t, srvNow)); }} badge={() => <span className="tag">🗳️ โหวต</span>} />
      </ActionSheet>
    </>}

    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 6).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    {isHost && <HostBar>
      <button className="secondary" onClick={() => { if (confirm(r.phase === 'ask' ? 'จบช่วงถาม ไปทายคำเลย?' : r.phase === 'guess' ? 'สรุปคำตอบเลย? (คนที่ยังไม่ส่งไม่นับ)' : 'สรุปโหวตเลย? (คนที่ยังไม่โหวตไม่นับ)')) tx(c => insForce(c, srvNow)); }}>{r.phase === 'ask' ? '⏩ ไปทายคำเลย' : r.phase === 'guess' ? '⏩ สรุปคำตอบเลย' : '⏩ สรุปโหวตเลย'}</button>
      {allIds.filter(id => !room.players?.[id] && !r.gone?.[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickIns(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
    </HostBar>}
  </div>;

  function send() {
    if (!guess.trim()) return; sfx(sound, 'confirm');
    if (myRole === 'insider') { setFake(true); return; } // Insider: กล่องหลอกให้ดูเนียน ไม่นับคะแนน
    tx(c => insGuess(c, myId, guess, srvNow));
  }
}

// ---------- ห้องรอ: หมวดคำ (เหมือนเกมคำบนหัว) / เวลาถาม ----------
export function InsLobby({ db, roomCode, room, isHost, sound }) {
  const set = room.settings?.ins || {};
  const cats = set.cats || []; const all = HEAD_PACKS.map((_, i) => i); const on = i => !cats.length || cats.includes(i);
  const save = patch => runTransaction(ref(db, `rooms/${roomCode}/settings/ins`), c => ({ ...(c || {}), ...patch })).catch(() => {});
  const toggleCat = i => { sfx(sound, 'select'); const cur = cats.length ? cats : all; const nx = cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i]; if (!nx.length) return; save({ cats: nx.length === all.length ? null : nx }); };
  return <div className="uc-lobby">
    <label>⏱️ เวลาถามทั้งหมด {isHost ? '' : '(หัวหน้าห้องตั้ง)'}</label>
    <select value={set.min ?? 0} disabled={!isHost} onChange={e => save({ min: +e.target.value })}><option value={0}>ไม่จับเวลา (กดมั่นใจครบแล้วไปทาย)</option><option value={3}>3 นาที</option><option value={5}>5 นาที</option><option value={8}>8 นาที</option><option value={10}>10 นาที</option></select>
    <label>📚 หมวดคำ {isHost ? '(แตะเพื่อเปิด/ปิด)' : ''}</label>
    <div className="uc-cats">{HEAD_PACKS.map((p, i) => <button key={i} type="button" className={'uc-cat' + (on(i) ? ' on' : '')} disabled={!isHost} onClick={() => toggleCat(i)}>{p.name}<small>{p.places.length} คำ</small></button>)}</div>
  </div>;
}
