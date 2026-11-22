// เกม ศึกควิซไวไฟ — เกมโชว์ตอบคำถามแข่งกัน (แนวเกมควิซตอบไว)
//   หัวหน้าห้องเลือกหมวด + จำนวนข้อ • ทุกข้อมี 4 ตัวเลือก ก ข ค ง กดแล้วล็อกทันที
//   ตอบถูก = 500–1000 แต้ม (ยิ่งไวยิ่งได้มาก) • หมดเวลาหรือทุกคนตอบครบ → เฉลย + อันดับย่อ → ข้อต่อไป
//   คำถามอยู่ในไฟล์ src/quiz/<หมวด>.js (โหลดแยกตอนใช้ ไม่ถ่วงไฟล์หลัก) — ในห้องเก็บแค่เลขข้อ + ลำดับตัวเลือก
//   รูปประกอบ (ถ้ามี) ดึงตรงจาก Wikimedia Commons ขนาดเล็ก ไม่ผ่าน Firebase • โหลดไม่ได้ก็แสดงข้อความแทน
import React, { useEffect, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle } from './rand.js';
import { Avatar, Figure, Outcome, Leaderboard, HostBar, SecH, TimerRing } from './ui.jsx';
import './quiz.css';

export const QZ_MIN = 2, QZ_MAX = 12;
export const QZ_SCORE = [3, 2, 1];          // คะแนนสะสมของห้อง: อันดับ 1–3
export const QZ_PER = 100;                  // ทุกหมวดมี 100 ข้อ
export const QZ_COUNTS = [5, 10, 15, 20, 30];
export const ANS_MS = 20000, LEAD_MS = 3500, REV_MS = 6500;
export const QZ_CATS = [
  { id: 'foot', n: 'นักฟุตบอล', e: '⚽' }, { id: 'anime', n: 'อนิเมะ', e: '🎌' },
  { id: 'movie', n: 'หนังดัง', e: '🎬' }, { id: 'game', n: 'เกม', e: '🎮' },
  { id: 'thai', n: 'ประเทศไทย', e: '🛕' }, { id: 'food', n: 'อาหารการกิน', e: '🍜' },
  { id: 'sci', n: 'วิทยาศาสตร์', e: '🔬' }, { id: 'world', n: 'รอบโลก', e: '🌍' },
];
const CAT = Object.fromEntries(QZ_CATS.map(c => [c.id, c]));
// โหลดคำถามแยกไฟล์ (dynamic import → Vite แยก chunk ให้เอง)
const LOAD = {
  foot: () => import('./quiz/foot.js'), anime: () => import('./quiz/anime.js'), movie: () => import('./quiz/movie.js'), game: () => import('./quiz/game.js'),
  thai: () => import('./quiz/thai.js'), food: () => import('./quiz/food.js'), sci: () => import('./quiz/sci.js'), world: () => import('./quiz/world.js'),
};
const BANK = {};
export const loadCat = c => BANK[c] ? Promise.resolve(BANK[c]) : LOAD[c]().then(m => (BANK[c] = m.default));

export const fix = r => {
  r.order = r.order || []; r.qs = r.qs || []; r.ans = r.ans || {}; r.sc = r.sc || {}; r.st = r.st || {}; r.hit = r.hit || {};
  r.order.forEach(id => { r.sc[id] = +r.sc[id] || 0; r.st[id] = +r.st[id] || 0; r.hit[id] = +r.hit[id] || 0; });
  r.qs.forEach(q => { q.p = q.p || [0, 1, 2, 3]; });
  return r;
};
export const goodSlot = q => q.p.indexOf(0);                 // ช่องที่เป็นคำตอบถูก (ข้อมูลต้นฉบับ: ตัวเลือกแรกคือคำตอบ)
export const here = (cur, r) => r.order.filter(id => cur.players?.[id]);
export const speedPts = (el, T) => Math.round(1000 - 500 * Math.min(1, Math.max(0, el / T)));

export function makeQzRound(ids, set = {}, number = 1, t0 = Date.now(), prev = []) {
  const cats = (Array.isArray(set.cats) ? set.cats : Object.keys(set.cats || {})).filter(c => CAT[c]);
  const use = cats.length ? cats : QZ_CATS.map(c => c.id);
  const n = QZ_COUNTS.includes(+set.n) ? +set.n : 10; const T = +set.tmT || ANS_MS;
  const all = use.flatMap(c => Array.from({ length: QZ_PER }, (_, i) => c + ':' + i));
  const old = new Set(prev || []); const fresh = all.filter(k => !old.has(k));
  const pool = shuffle(fresh.length >= n ? fresh : all).slice(0, n);
  const qs = pool.map(k => { const [c, i] = k.split(':'); return { c, i: +i, p: shuffle([0, 1, 2, 3]) }; });
  const zero = Object.fromEntries(ids.map(id => [id, 0]));
  return { number, kind: 'qz', order: ids, qs, cur: 0, T, phase: 'q', at: t0, open: t0 + LEAD_MS + 1500, until: t0 + LEAD_MS + 1500 + T,
    ans: {}, sc: { ...zero }, st: { ...zero }, hit: { ...zero }, startedAt: t0 };
}
export const usedKeys = r => (r?.kind === 'qz' ? (r.qs || []).map(q => q.c + ':' + q.i) : []);

function reveal(cur, now) {
  const r = cur.round; const q = r.qs[r.cur]; const g = goodSlot(q);
  r.order.forEach(id => { const a = r.ans[id]; const ok = a && a.k === g;
    if (ok) { r.sc[id] += a.p; r.hit[id]++; r.st[id]++; } else r.st[id] = 0; });
  r.phase = 'rev'; r.at = now; r.until = now + REV_MS; return cur;
}
function next(cur, now) {
  const r = cur.round; if (r.cur + 1 >= r.qs.length) return finish(cur, now);
  r.cur++; r.phase = 'q'; r.ans = {}; r.at = now; r.open = now + LEAD_MS; r.until = r.open + r.T; return cur;
}
function finish(cur, now) {
  const r = cur.round; r.phase = 'done'; r.at = now;
  const rank = [...r.order].sort((a, b) => r.sc[b] - r.sc[a]); const pts = {}; const sc = { ...(cur.scores || {}) };
  let place = 0; rank.forEach((id, i) => { if (i === 0 || r.sc[id] !== r.sc[rank[i - 1]]) place = i; pts[id] = r.sc[id] > 0 ? (QZ_SCORE[place] || 0) : 0; });
  Object.keys(cur.players || {}).forEach(id => { pts[id] = pts[id] || 0; sc[id] = (sc[id] || 0) + pts[id]; });
  cur.qzUsed = [...usedKeys(r), ...(cur.qzUsed || [])].slice(0, 90);   // ข้อที่เพิ่งเล่น (กันวนซ้ำรอบหน้า — round ถูกล้างตอนกลับห้องรอ)
  cur.status = 'result'; cur.scores = sc; cur.result = { type: 'qz', points: pts }; return cur;
}
// กดตอบ: ล็อกทันที เปลี่ยนไม่ได้ • คะแนนยังไม่โชว์จนกว่าจะเฉลย
export function qzAnswer(cur, me, k, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'qz' || r.phase !== 'q') return; fix(r);
  if (!r.order.includes(me) || !cur.players?.[me] || r.ans[me] || !(k >= 0 && k < 4)) return;
  if (now < r.open - 400 || now > r.until + 1500) return;
  const el = Math.max(0, now - r.open); const ok = r.qs[r.cur].p[k] === 0;
  r.ans[me] = { k, p: ok ? speedPts(el, r.T) : 0, t: el };
  if (here(cur, r).every(id => r.ans[id])) return reveal(cur, now);
  return cur;
}
export function qzTick(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'qz') return; fix(r);
  if (r.phase === 'q' && (now >= r.until || (now >= r.open && here(cur, r).every(id => r.ans[id])))) return reveal(cur, now);
  if (r.phase === 'rev' && now >= r.until) return next(cur, now);
}
// หัวหน้าห้องกดข้าม: กำลังถาม → เฉลยเลย • กำลังเฉลย → ข้อต่อไป
export function qzSkip(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'qz') return; fix(r);
  return r.phase === 'q' ? reveal(cur, now) : r.phase === 'rev' ? next(cur, now) : undefined;
}
export function qzEnd(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'qz') return; fix(r); return finish(cur, now);
}

// ---------- รูปประกอบ: ชื่อไฟล์ใน Wikimedia Commons (ดึงขนาดย่อ) หรือ URL เต็ม ----------
export const imgUrl = f => !f ? '' : /^https?:/.test(f) ? f : `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}?width=320`;
function QImg({ f }) {
  const [bad, setBad] = useState(false); useEffect(() => setBad(false), [f]);
  if (!f) return null;
  return bad ? <div className="qz-img bad">🖼️ โหลดรูปไม่ได้ — ลองตอบจากคำถามดูนะ</div>
    : <div className="qz-img"><img src={imgUrl(f)} alt="" loading="eager" referrerPolicy="no-referrer" onError={() => setBad(true)} /></div>;
}
const SLOT = [{ l: 'ก', c: 'a' }, { l: 'ข', c: 'b' }, { l: 'ค', c: 'c' }, { l: 'ง', c: 'd' }];

// ---------- หน้าจอ ----------
export function QzGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, onBack, srvNow }) {
  const r = fix(JSON.parse(JSON.stringify(room.round))); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'qz') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const [bank, setBank] = useState(() => ({ ...BANK }));
  const cats = [...new Set(r.qs.map(q => q.c))].join(',');
  useEffect(() => { cats.split(',').filter(c => c && !BANK[c]).forEach(c => loadCat(c).then(() => setBank({ ...BANK })).catch(() => {})); }, [cats]);
  const q = r.qs[r.cur]; const src = bank[q?.c]?.[q?.i]; const g = q ? goodSlot(q) : -1;
  const ids = r.order.filter(id => room.players?.[id]);
  const mine = r.ans[myId]; const inGame = r.order.includes(myId);
  const ready = r.phase === 'q' && srvNow < r.open; const canAns = inGame && r.phase === 'q' && !ready && !mine && !res;
  const left = Math.max(0, Math.ceil((r.until - srvNow) / 1000)); const lead = Math.max(0, Math.ceil((r.open - srvNow) / 1000));
  const due = !res && r.until && (srvNow >= r.until || (r.phase === 'q' && !ready && ids.every(id => r.ans[id])));
  useEffect(() => { if (due) tx(cc => qzTick(cc, srvNow)); }, [due, r.at, r.phase, r.cur]);
  useEffect(() => { if (r.phase === 'rev') sfx(sound, mine ? (mine.k === g ? 'right' : 'wrong') : 'timeup'); if (r.phase === 'q') sfx(sound, 'card'); }, [r.phase, r.cur]);
  useEffect(() => { if (r.phase === 'q' && !ready && left <= 5 && left > 0 && !mine) sfx(sound, 'count'); }, [left]);
  // โหลดรูปข้อถัดไปไว้ก่อนตอนเฉลย
  useEffect(() => { const nq = r.qs[r.cur + 1]; const f = nq && bank[nq.c]?.[nq.i]?.[5]; if (r.phase === 'rev' && f) { const im = new Image(); im.referrerPolicy = 'no-referrer'; im.src = imgUrl(f); } }, [r.phase, r.cur]);
  const answer = k => { if (!canAns) return; sfx(sound, 'confirm'); tx(cc => qzAnswer(cc, myId, k, srvNow)); };
  const rank = [...r.order].sort((a, b) => r.sc[b] - r.sc[a]);
  const name = id => id === myId ? 'คุณ' : nameOf(id);

  // แถวตัวละครยืนบนเวที คะแนนลอยบนหัว (ไม่มีชื่อ)
  const Stage = () => <div className="qz-stage">{ids.map(id => {
    const a = r.ans[id]; const rev = r.phase === 'rev'; const ok = rev && a && a.k === g; const no = rev && !ok;
    return <div key={id} className={'qz-pl' + (id === myId ? ' me' : '') + (ok ? ' ok' : '') + (no ? ' no' : '') + (r.phase === 'q' && a ? ' in' : '')}>
      <div className="qz-bub"><b>{r.sc[id]}</b>{r.st[id] >= 3 && <i title="ตอบถูกติดกัน">🔥{r.st[id]}</i>}</div>
      {ok && <em className="qz-plus" key={'p' + r.cur}>+{a.p}</em>}
      {r.phase === 'q' && a && <span className="qz-lock">✋</span>}
      {no && <span className="qz-x">{a ? '✗' : '💤'}</span>}
      <Figure id={id} av={av} size={44} mood={ok ? 'happy' : no ? 'sad' : r.phase === 'q' && !a ? 'think' : undefined} />
    </div>; })}</div>;

  if (res) {
    const top = rank.slice(0, 3); const podium = [top[1], top[0], top[2]];
    const meI = rank.indexOf(myId);
    return <div className="qz-game">
      <Outcome art={meI === 0 ? 'crown' : 'medal'} tone="good" title={rank[0] ? `🏆 แชมป์ศึกควิซ: ${name(rank[0])}` : 'จบเกม'}>
        {r.qs.length} ข้อ • {meI >= 0 ? `คุณได้อันดับ ${meI + 1} (${r.sc[myId]} แต้ม ตอบถูก ${r.hit[myId]} ข้อ)` : ''}
      </Outcome>
      <div className="qz-podium">{podium.map((id, i) => id ? <div key={id} className={'qz-pod p' + [2, 1, 3][i]}>
        <div className="qz-bub"><b>{r.sc[id]}</b></div><Figure id={id} av={av} size={[52, 64, 48][i]} mood={i === 1 ? 'happy' : 'wave'} />
        <div className="qz-block"><span>{['🥈', '🥇', '🥉'][i]}</span><small>{name(id)}</small></div></div> : <div key={i} className="qz-pod empty" />)}</div>
      <ol className="qz-rank">{rank.map((id, i) => <li key={id} className={id === myId ? 'me' : ''}><span>{i + 1}</span><Avatar id={id} av={av} size={26} /><b>{name(id)}</b><small>ถูก {r.hit[id]}/{r.qs.length}</small><em>{r.sc[id]}</em></li>)}</ol>
      <SecH icon="🏅">ตารางคะแนนสะสม (อันดับ 1–3 ได้ +{QZ_SCORE.join('/+')})</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </div>;
  }

  const counts = [0, 1, 2, 3].map(k => ids.filter(id => r.ans[id]?.k === k).length);
  const nAns = ids.filter(id => r.ans[id]).length;
  return <div className="qz-game">
    <div className="qz-top"><span className="qz-no">ข้อ {r.cur + 1}/{r.qs.length}</span>{q && <span className="cat-tag">{CAT[q.c]?.e} {CAT[q.c]?.n}</span>}
      {r.phase === 'q' && !ready ? <TimerRing secs={left} total={r.T / 1000} size={54} label="วิ" /> : <span className="qz-ans-n">{r.phase === 'rev' ? 'เฉลย!' : `เตรียมตัว ${lead}`}</span>}</div>
    <section className={'qz-card' + (ready ? ' ready' : '')} key={'q' + r.cur}>
      {!src ? <p className="qz-q">⏳ กำลังโหลดคำถาม…</p> : <>
        <QImg f={src[5]} />
        <p className="qz-q">{src[0]}</p></>}
      {r.phase === 'q' && !ready && <small className="qz-cnt">ตอบแล้ว {nAns}/{ids.length}</small>}
    </section>
    <div className={'qz-opts' + (ready ? ' wait' : '') + (r.phase === 'rev' ? ' rev' : '')}>{SLOT.map((s, k) => {
      const txt = src ? src[1 + q.p[k]] : '…'; const picked = mine?.k === k; const good = r.phase === 'rev' && k === g;
      return <button key={k} type="button" className={'qz-opt ' + s.c + (picked ? ' picked' : '') + (good ? ' good' : '') + (r.phase === 'rev' && !good ? ' dim' : '') + (mine && !picked && r.phase === 'q' ? ' off' : '')} disabled={!canAns || !src} onClick={() => answer(k)}>
        <i>{s.l}</i><span>{ready ? '' : txt}</span>{r.phase === 'rev' && <small className="qz-votes">{counts[k] > 0 ? '👤'.repeat(Math.min(counts[k], 6)) + (counts[k] > 6 ? `+${counts[k] - 6}` : '') : ''}</small>}{good && <b className="qz-tick">✓</b>}
      </button>; })}</div>
    {r.phase === 'q' && mine && <p className="qz-wait">🔒 ล็อกคำตอบแล้ว รอเพื่อน ๆ…</p>}
    {r.phase === 'rev' && inGame && <p className={'qz-me ' + (mine?.k === g ? 'ok' : 'no')}>{!mine ? '💤 ไม่ทันตอบ!' : mine.k === g ? `🎉 ถูกต้อง! +${mine.p} แต้ม (${(mine.t / 1000).toFixed(1)} วิ)` : '😵 ผิด! ข้อหน้าเอาใหม่'}</p>}
    <Stage />
    {r.phase === 'rev' && <ol className="qz-mini">{rank.slice(0, 5).map((id, i) => <li key={id} className={id === myId ? 'me' : ''}><span>{['🥇', '🥈', '🥉'][i] || i + 1}</span><Avatar id={id} av={av} size={22} /><b>{name(id)}</b><em>{r.sc[id]}</em></li>)}</ol>}
    {isHost && <HostBar>
      <button className="secondary" onClick={() => tx(cc => qzSkip(cc, srvNow))}>{r.phase === 'q' ? '⏩ เฉลยเลย' : '⏭️ ข้อต่อไป'}</button>
      <button className="secondary" onClick={() => { if (confirm('จบเกมตอนนี้ แล้วสรุปคะแนน?')) tx(cc => qzEnd(cc, srvNow)); }}>🏁 จบเกมเลย</button>
    </HostBar>}
  </div>;
}

// ---------- ห้องรอ: เลือกหมวด + จำนวนข้อ ----------
export function QzLobby({ db, roomCode, room, isHost, sound }) {
  const set = room.settings?.qz || {}; const sel = Array.isArray(set.cats) ? set.cats : QZ_CATS.map(c => c.id); const n = QZ_COUNTS.includes(+set.n) ? +set.n : 10;
  const save = patch => runTransaction(ref(db, `rooms/${roomCode}/settings/qz`), c => ({ ...(c || {}), ...patch })).catch(() => {});
  const toggle = id => { const s = sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]; if (!s.length) return; sfx(sound, 'select'); save({ cats: s }); };
  return <div className="qz-lobby">
    <label>📚 หมวดคำถาม {isHost ? '(เลือกได้หลายหมวด)' : '(หัวหน้าห้องเลือก)'}</label>
    <div className="qz-cats">{QZ_CATS.map(c => <button key={c.id} type="button" disabled={!isHost} className={'qz-cat' + (sel.includes(c.id) ? ' on' : '')} onClick={() => toggle(c.id)}><span>{c.e}</span><b>{c.n}</b>{sel.includes(c.id) && <i>✓</i>}</button>)}</div>
    {isHost && <div className="qz-quick"><button type="button" className="link-btn" onClick={() => save({ cats: QZ_CATS.map(c => c.id) })}>เลือกทุกหมวด</button></div>}
    <label>❓ จำนวนคำถาม</label>
    <div className="qz-ns">{QZ_COUNTS.map(x => <button key={x} type="button" disabled={!isHost} className={'qz-n' + (n === x ? ' on' : '')} onClick={() => { sfx(sound, 'select'); save({ n: x }); }}>{x} ข้อ</button>)}</div>
    <small className="hint">คลังคำถาม {sel.length * QZ_PER} ข้อ • ข้อที่เพิ่งเล่นไปจะไม่วนมาซ้ำในรอบถัดไป</small>
  </div>;
}
