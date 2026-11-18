// เกม "ภาพนี้มีพิรุธ" — เกมภาพปริศนา
//   🗝️ คนบอกคำ (เวียนกันทีละรอบ) ตั้งคำลับ 1 คำ → ทุกคนรู้คำ ยกเว้น 🕵️ คนไม่รู้คำ 1 คน (คนบอกคำรู้ว่าเป็นใคร)
//   🖼️ ไล่ลงภาพทีละคน 2 รอบ (คนละ 2 ภาพ) ให้เข้ากับคำ — คนไม่รู้คำต้องเดาจากภาพเพื่อนแล้วลงให้เนียน
//   🎙️ อธิบายทีละคนว่าทำไมลงภาพนี้ (คุยในห้องเสียง) → 🗳️ ทุกคนยกเว้นคนบอกคำโหวตหาคนไม่รู้คำ
import React, { useEffect, useState } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint, pickBad } from './rand.js';
import { Avatar, Phase, PlayerGrid, WhoDone, Outcome, Leaderboard, HostBar, SecH, TimerRing, ActionSheet, Voters } from './ui.jsx';
import { PIC_N } from './picsMeta.js';
import { PicSvg } from './picart.jsx';
import { CODE_WORDS } from './codeWords.js';

export const PIC_MIN = 4, PIC_MAX = 8, HAND = 6;
export const PIC_SCORE = { caught: 2, informant: 2, escape: 4, near: 1 };
const WORD_MS = 90000, PLAY_MS = 45000, TALK_MS = 40000, VOTE_MS = 75000;
const norm = s => String(s || '').trim().replace(/\s+/g, ' ').slice(0, 30);
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
export const picFix = r => { r.hands = r.hands || {}; r.played = r.played || {}; r.votes = r.votes || {}; r.log = r.log || []; r.gone = r.gone || {}; return r; };

// คนบอกคำเวียนตามลำดับที่นั่ง (seat) ตามเลขรอบ • คนไม่รู้คำสุ่มแบบถ่วงไม่ให้ซ้ำคนเดิมบ่อย
export function makePicRound(ids, number = 1, t0 = Date.now(), hist = [], seat = null) {
  const seats = (seat && seat.length ? seat.filter(id => ids.includes(id)) : []).concat(ids.filter(id => !(seat || []).includes(id)));
  const informant = seats[(number - 1) % seats.length];
  const [conspirator] = pickBad(ids.filter(id => id !== informant), 1, hist);
  const deck = shuffle(Array.from({ length: PIC_N }, (_, i) => i + 1)); const hands = {};
  ids.forEach(id => { hands[id] = deck.splice(0, HAND); });
  const k = seats.indexOf(informant); const order = [...seats.slice(k), ...seats.slice(0, k)];
  return { number, kind: 'pic', seat: seats, informant, conspirator, word: null, order, hands, played: {}, phase: 'word', turn: 0, talk: 0, at: t0 + 2500, votes: {}, log: [], gone: {}, startedAt: t0 };
}
const live = r => r.order.filter(id => !r.gone[id]);
// ตาลงภาพ: คนแรกตามลำดับที่ยังลงน้อยที่สุด (รอบละ 1 ใบ จนครบคนละ 2) — คนหลุดก็ไม่ทำให้ลำดับเพี้ยน
const cnt = (r, id) => (r.played[id] || []).length;
export const playLap = r => Math.min(2, ...live(r).map(id => cnt(r, id)));
export const playerOf = r => { if (r.phase !== 'play') return null; const L = live(r); const lap = playLap(r); return lap >= 2 ? null : L.find(id => cnt(r, id) === lap) || null; };
export const talkers = r => live(r).filter(id => id !== r.informant);
export const talkerOf = r => (r.phase === 'talk' ? talkers(r)[r.talk] || null : null);
const voters = r => live(r).filter(id => id !== r.informant);

function toPlay(r, now) { r.phase = 'play'; r.turn = 0; r.at = now; say(r, `🗝️ {${r.informant}} ตั้งคำแล้ว — ไล่ลงภาพคนละ 2 ใบ`); }
function endPlay(r, now) { if (r.phase === 'play' && playLap(r) >= 2) { r.phase = 'talk'; r.talk = 0; r.at = now; say(r, `🔓 เฉลยคำ “${r.word}”`); say(r, '🎙️ ลงภาพครบแล้ว — อธิบายทีละคนว่าทำไมเลือกภาพนี้'); } }
function toVote(r, now) { r.phase = 'vote'; r.at = now; r.votes = {}; say(r, '🗳️ อธิบายครบแล้ว — โหวตหาคนไม่รู้คำ'); }
function finish(cur, now) {
  const r = cur.round; const v = r.votes || {}; const c = {};
  voters(r).forEach(id => { const t = v[id]; if (t && !r.gone[t]) c[t] = (c[t] || 0) + 1; });
  const max = Math.max(0, ...Object.values(c)); const top = Object.keys(c).filter(k => c[k] === max);
  r.accused = max > 0 && top.length === 1 ? top[0] : null; r.counts = c;
  const caught = r.accused === r.conspirator; const pts = {}; const sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => {
    let p = 0;
    if (caught) { if (id === r.informant) p = PIC_SCORE.informant; else if (v[id] === r.conspirator) p = PIC_SCORE.caught; }
    else { if (id === r.conspirator) p = PIC_SCORE.escape; else if (v[id] === r.conspirator) p = PIC_SCORE.near; }
    pts[id] = p; sc[id] = (sc[id] || 0) + p;
  });
  r.phase = 'done'; r.at = now; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'pic', caught, points: pts };
  return cur;
}

// ---------- การกระทำ (เรียกใน transaction) ----------
export function picSetWord(cur, me, word, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'word' || me !== r.informant) return;
  const w = norm(word); if (!w) return; r.word = w; toPlay(r, now); return cur;
}
export function picPlay(cur, me, card, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'play' || playerOf(r) !== me) return;
  const h = r.hands[me] || []; if (!h.includes(card)) return;
  r.hands = { ...r.hands, [me]: h.filter(x => x !== card) }; r.played = { ...r.played, [me]: [...(r.played[me] || []), card] };
  r.turn++; r.at = now; endPlay(r, now);
  return cur;
}
export function picDoneTalk(cur, me, now, host) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'talk') return; const t = talkerOf(r);
  if (!t || (me !== t && me !== r.informant && !host)) return;
  r.talk++; r.at = now; if (r.talk >= talkers(r).length) toVote(r, now); return cur;
}
export function picVote(cur, me, target, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'vote' || !voters(r).includes(me) || !voters(r).includes(target) || target === me) return;
  r.votes = { ...r.votes, [me]: target };
  if (voters(r).filter(id => cur.players?.[id]).every(id => r.votes[id])) return finish(cur, now);
  return cur;
}
// หมดเวลา: ตั้งคำ → สุ่มคำให้ • ลงภาพ → สุ่มภาพให้ • อธิบาย → คนถัดไป • โหวต → สรุป
export function picTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'pic' || cur.status !== 'playing') return; picFix(r);
  if (r.phase === 'word' && now >= r.at + WORD_MS) return picSetWord(cur, r.informant, CODE_WORDS[rint(CODE_WORDS.length)], now);
  if (r.phase === 'play' && now >= r.at + (r.tmT || PLAY_MS)) { const id = playerOf(r); const h = r.hands[id] || []; return h.length ? picPlay(cur, id, h[rint(h.length)], now) : undefined; }
  if (r.phase === 'talk' && now >= r.at + (r.tmK || TALK_MS)) return picDoneTalk(cur, null, now, true);
  if (r.phase === 'vote' && now >= r.at + (r.tmV || VOTE_MS)) return finish(cur, now);
}
export function picForce(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'pic') return;
  if (r.phase === 'word' || r.phase === 'play') return picTick(cur, now + 600000);
  if (r.phase === 'talk') return picDoneTalk(cur, null, now, true);
  if (r.phase === 'vote') return finish(cur, now);
}
// คนหลุดออกจากห้อง: ตัดออกจากคิว (ภาพที่ลงไว้แล้วยังอยู่)
export function kickPic(cur, id, now) {
  const r = cur.round; if (cur.status !== 'playing' || cur.players?.[id] || r.gone[id] || !r.order.includes(id)) return;
  if (r.phase === 'play') { r.gone = { ...r.gone, [id]: true }; endPlay(r, now); }
  else if (r.phase === 'talk') { const T = talkers(r); const k = T.indexOf(id); r.gone = { ...r.gone, [id]: true }; if (k >= 0 && k < r.talk) r.talk--; if (r.talk >= talkers(r).length) toVote(r, now); }
  else r.gone = { ...r.gone, [id]: true };
  say(r, `🚪 {${id}} ออกจากเกม`); r.at = now;
  if (id === r.informant && r.phase === 'word') return picSetWord(cur, id, CODE_WORDS[rint(CODE_WORDS.length)], now);
  if (r.phase === 'vote') { const v = { ...r.votes }; delete v[id]; Object.keys(v).forEach(k => { if (v[k] === id) delete v[k]; }); r.votes = v; if (voters(r).filter(x => cur.players?.[x]).every(x => r.votes[x])) return finish(cur, now); }
  return cur;
}

// ---------- ภาพ ----------
export function PicCard({ n, onClick, sel, small, dim, label }) {
  const cls = 'pic-card' + (small ? ' sm' : '') + (sel ? ' sel' : '') + (dim ? ' dim' : '') + (onClick ? ' tap' : '');
  const inner = <><PicSvg n={n} />{label && <span className="pic-lb">{label}</span>}</>;
  return onClick ? <button type="button" className={cls} onClick={onClick}>{inner}</button> : <div className={cls}>{inner}</div>;
}
function Zoom({ n, onClose, action }) {
  useEffect(() => { const k = e => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  return <div className="pic-zoom" onClick={onClose}><div className="pic-zoom-in" onClick={e => e.stopPropagation()}>
    <div className="pic-big"><PicSvg n={n} /></div><small>ภาพที่ {n}</small>
    <div className="pic-zoom-act">{action}<button className="secondary" onClick={onClose}>ปิด</button></div></div></div>;
}

// ---------- หน้าจอ ----------
export function PicGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, msg, onBack, srvNow }) {
  const r = picFix({ ...room.round }); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'pic') return; picFix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const [word, setWord] = useState(''); const [zoom, setZoom] = useState(null); const [peek, setPeek] = useState(true);
  const meIn = r.order.includes(myId); const isInf = myId === r.informant; const isCon = myId === r.conspirator;
  const cur = playerOf(r); const tk = talkerOf(r); const hand = r.hands[myId] || [];
  const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const lim = r.phase === 'word' ? WORD_MS : r.phase === 'play' ? (r.tmT || PLAY_MS) : r.phase === 'talk' ? (r.tmK || TALK_MS) : (r.tmV || VOTE_MS);
  const left = secs(r.at + lim - srvNow);
  const due = !res && srvNow >= r.at + lim;
  useEffect(() => { if (due) tx(c => picTick(c, srvNow)); }, [due, r.at, r.phase]);
  useEffect(() => { if (cur === myId || tk === myId || (r.phase === 'word' && isInf)) sfx(sound, 'yourTurn'); }, [cur === myId, tk === myId, r.phase]);
  const play = n => { sfx(sound, 'card'); setZoom(null); tx(c => picPlay(c, myId, n, srvNow)); };
  const nameDot = id => id === myId ? 'คุณ' : nameOf(id);

  // ภาพที่ลงแล้วของแต่ละคน
  const board = (showRole) => <div className="pic-board">{live(r).concat(r.order.filter(id => r.gone[id])).map(id => {
    const p = r.played[id] || []; const role = showRole ? (id === r.informant ? '🗝️' : id === r.conspirator ? '🕵️' : '') : (id === r.informant ? '🗝️' : '');
    return <div key={id} className={'pic-row' + (id === cur || id === tk ? ' now' : '') + (r.gone[id] ? ' gone' : '') + (showRole && id === r.conspirator ? ' con' : '')}>
      <div className="pic-who"><Avatar id={id} av={av} size={36} /><b>{role} {nameDot(id)}</b>{showRole && r.counts?.[id] ? <small>🗳️ {r.counts[id]}</small> : null}</div>
      <div className="pic-two">{[0, 1].map(i => p[i] ? <PicCard key={i} n={p[i]} small onClick={() => setZoom({ n: p[i] })} /> : <div key={i} className="pic-card sm empty" />)}</div>
    </div>;
  })}</div>;

  if (res) {
    const myWin = res.points?.[myId] > 0;
    return <div className="pic-game">
      <Outcome art={res.caught ? 'handcuffs' : 'escape'} tone={myWin ? 'good' : ''} title={res.caught ? '🕵️ จับคนไม่รู้คำได้!' : '😏 คนไม่รู้คำรอดไปได้!'}>
        คำคือ “{r.word}” • คนไม่รู้คำคือ {nameOf(r.conspirator)}{!res.caught && (r.accused ? ` (เพื่อนโหวต ${nameOf(r.accused)})` : ' (โหวตเสมอ)')}
      </Outcome>
      {board(true)}
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      <p className="hint pic-credit">ภาพสาธารณสมบัติ (CC0) จาก Art Institute of Chicago</p>
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบต่อไป</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
      {zoom && <Zoom n={zoom.n} onClose={() => setZoom(null)} />}
    </div>;
  }

  return <div className="pic-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">🗝️ คนบอกคำ: {nameDot(r.informant)}</span></div>
    {/* คำของฉัน */}
    {meIn && <div className={'uc-card' + (peek ? ' open' : '')} onClick={() => setPeek(p => !p)}>
      {!peek ? <><span className="uc-ico">🙈</span><div><b>แตะเพื่อดูคำ</b><small>ดูคนเดียว ระวังคนแอบมอง</small></div></>
        : isInf ? <><span className="uc-ico">🗝️</span><div><small>คุณคือคนบอกคำ {r.word ? '• คำคือ' : ''}</small><b className="uc-word">{r.word || 'ตั้งคำลับก่อน'}</b><small>🕵️ คนไม่รู้คำคือ <b>{nameOf(r.conspirator)}</b> — อย่าให้ใครรู้! ลงภาพให้พวกเดียวกันเข้าใจ</small></div></>
          : isCon ? <><span className="uc-ico">🕵️</span><div><b>คุณคือคนไม่รู้คำ!</b>{(r.phase === 'talk' || r.phase === 'vote') ? <><small>เฉลยแล้ว คำคือ</small><b className="uc-word">{r.word}</b><small>อธิบายภาพให้เนียน อย่าให้โดนโหวต</small></> : <small>ดูภาพที่เพื่อนลงแล้วเดาคำ ลงภาพให้กลมกลืน อย่าให้โดนโหวต</small>}</div></>
            : <><span className="uc-ico">🔑</span><div><small>คำลับคือ</small><b className="uc-word">{r.word || 'รอคนบอกคำตั้งคำ…'}</b><small>ลงภาพที่เข้ากับคำ แต่อย่าชัดเกินจนคนไม่รู้คำเดาได้</small></div></>}
    </div>}

    {r.phase === 'word' && <Phase art="think" tone={isInf ? 'me' : ''} kicker="🗝️ ตั้งคำลับ" title={isInf ? 'ตาคุณตั้งคำลับ!' : `${nameOf(r.informant)} กำลังคิดคำ…`} aside={<TimerRing secs={left} total={WORD_MS / 1000} label="วิ" />}>คำอะไรก็ได้ 1 คำ เช่น “ความรัก” “ทะเล” “ความลับ” • หมดเวลาระบบสุ่มให้</Phase>}
    <ActionSheet open={r.phase === 'word' && isInf} k={'w' + r.number} icon="🗝️" title="ตั้งคำลับ" sub="คำกว้าง ๆ ตีความได้หลายแบบจะสนุกสุด" secs={left} total={WORD_MS / 1000}>
      <input className="uc-guess" autoFocus value={word} maxLength={30} placeholder="พิมพ์คำลับ" onChange={e => setWord(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && word.trim()) tx(c => picSetWord(c, myId, word, srvNow)); }} />
      <div className="pic-sugg">{[0, 1, 2].map(i => { const w = CODE_WORDS[(r.number * 7 + i * 131 + (word.length * 17)) % CODE_WORDS.length]; return <button key={i} type="button" className="chip-btn" onClick={() => setWord(w)}>🎲 {w}</button>; })}</div>
      <button className="primary wide" disabled={!word.trim()} onClick={() => { sfx(sound, 'confirm'); tx(c => picSetWord(c, myId, word, srvNow)); }}>✅ ใช้คำนี้</button>
    </ActionSheet>

    {r.phase === 'play' && <Phase art="bubble" tone={cur === myId ? 'me' : ''} kicker={`🖼️ ลงภาพรอบที่ ${playLap(r) + 1}/2`} title={cur === myId ? 'ตาคุณ! เลือกภาพ 1 ใบ' : `ตาของ ${nameOf(cur)}`} aside={<TimerRing secs={left} total={(r.tmT || PLAY_MS) / 1000} label="วิ" />}>{isCon ? 'ดูภาพที่เพื่อนลงก่อนหน้า แล้วเดาว่าคำคืออะไร' : 'เลือกภาพที่เข้ากับคำ • แตะภาพเพื่อขยายดู'}</Phase>}
    {(r.phase === 'talk' || r.phase === 'vote') && r.word && <div className="pic-reveal" key={'rv' + r.number}><small>🔓 เฉลยคำลับ</small><b>“{r.word}”</b></div>}
    {r.phase === 'talk' && <section className={'clue-turn' + (tk === myId ? ' me' : '')}><div className="ct-main">
      <div className="ct-av" key={tk}>{tk && <Avatar id={tk} av={av} size={70} />}</div>
      <div className="ct-text"><span className="ct-kicker">🎙️ อธิบายภาพ • เหลืออีก {talkers(r).length - r.talk} คน</span><h2>{tk === myId ? 'ตาคุณอธิบาย!' : `ตาของ ${nameOf(tk)}`}</h2><small>{tk === myId ? 'บอกว่าทำไมลง 2 ภาพนี้เข้ากับคำ • จบแล้วกดปุ่ม' : 'ฟังให้ดี ใครอธิบายแปลก ๆ?'}</small></div>
      <TimerRing secs={left} total={(r.tmK || TALK_MS) / 1000} size={56} label="วิ" /></div>
      {(tk === myId || isInf || isHost) && <button className={tk === myId ? 'primary wide' : 'secondary wide'} onClick={() => { sfx(sound, 'click'); tx(c => picDoneTalk(c, myId, srvNow, isHost)); }}>{tk === myId ? '✅ อธิบายเสร็จ' : `⏭️ ข้าม ${nameOf(tk)}`}</button>}
    </section>}
    {r.phase === 'vote' && <>
      <Phase art="vote" tone={voters(r).includes(myId) && !r.votes[myId] ? 'me' : ''} kicker="🗳️ โหวตหาคนไม่รู้คำ" title={isInf ? 'คุณคือคนบอกคำ ไม่ต้องโหวต' : r.votes[myId] ? `คุณโหวต ${nameOf(r.votes[myId])} (เปลี่ยนใจได้)` : 'ใครไม่รู้คำ?'} aside={<TimerRing secs={left} total={(r.tmV || VOTE_MS) / 1000} label="วิ" />}>เสียงมากสุด = ถูกจับ • เสมอ = คนไม่รู้คำรอด</Phase>
      <PlayerGrid ids={voters(r).filter(id => id !== myId)} av={av} nameOf={nameOf} selected={r.votes[myId]} onPick={voters(r).includes(myId) ? t => { sfx(sound, 'vote'); tx(c => picVote(c, myId, t, srvNow)); } : undefined} badge={id => <Voters ids={voters(r).filter(v => r.votes[v] === id)} av={av} size={20} />} />
      <WhoDone ids={voters(r).filter(id => room.players?.[id])} done={id => !!r.votes[id]} av={av} nameOf={nameOf} label="🗳️ โหวตแล้ว" />
    </>}

    <SecH icon="🖼️">ภาพบนโต๊ะ</SecH>
    {board(false)}

    {meIn && r.phase !== 'vote' && hand.length > 0 && <><SecH icon="🃏">ภาพในมือคุณ <small>{cur === myId ? 'แตะเพื่อดูใหญ่แล้วกดลง' : 'แตะเพื่อดูใหญ่'}</small></SecH>
      <div className="pic-hand">{hand.map(n => <PicCard key={n} n={n} onClick={() => setZoom({ n, mine: true })} sel={zoom?.n === n} />)}</div></>}

    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 6).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    <p className="hint pic-credit">ภาพสาธารณสมบัติ (CC0) จาก Art Institute of Chicago</p>
    {isHost && <HostBar>
      <button className="secondary" onClick={() => { if (confirm(r.phase === 'vote' ? 'สรุปโหวตเลย?' : 'ข้ามขั้นนี้? (ระบบเลือกให้)')) tx(c => picForce(c, srvNow)); }}>{r.phase === 'vote' ? '⏩ สรุปโหวตเลย' : '⏭️ ข้าม/สุ่มให้'}</button>
      {r.order.filter(id => !room.players?.[id] && !r.gone[id]).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickPic(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
    </HostBar>}
    {zoom && <Zoom n={zoom.n} onClose={() => setZoom(null)} action={zoom.mine && cur === myId && hand.includes(zoom.n) ? <button className="primary" onClick={() => play(zoom.n)}>🖼️ ลงภาพนี้</button> : null} />}
    <ActionSheet open={r.phase === 'play' && cur === myId && !zoom} k={'p' + r.number + '-' + r.turn} icon="🖼️" title="ตาคุณ! เลือกภาพลงโต๊ะ" sub={isCon ? 'คุณไม่รู้คำ — เลือกให้เข้ากับภาพของเพื่อน' : `คำคือ “${r.word}” • แตะภาพเพื่อขยายก่อนลง`} secs={left} total={(r.tmT || PLAY_MS) / 1000}>
      <div className="pic-hand in-sheet">{hand.map(n => <PicCard key={n} n={n} onClick={() => setZoom({ n, mine: true })} />)}</div>
    </ActionSheet>
    <ActionSheet open={r.phase === 'vote' && voters(r).includes(myId) && !r.votes[myId]} k={'v' + r.number} icon="🗳️" title="ใครไม่รู้คำ?" sub="แตะคนที่น่าสงสัย (เปลี่ยนใจทีหลังได้) • ย่อหน้าต่างนี้เพื่อดูภาพบนโต๊ะได้" secs={left} total={(r.tmV || VOTE_MS) / 1000}>
      <PlayerGrid ids={voters(r).filter(id => id !== myId)} av={av} nameOf={nameOf} onPick={t => { sfx(sound, 'vote'); tx(c => picVote(c, myId, t, srvNow)); }} badge={id => <span className="pic-mini">{(r.played[id] || []).map(n => <i key={n}><PicSvg n={n} /></i>)}</span>} />
    </ActionSheet>
  </div>;
}

export function PicLobby({ players }) {
  const n = players.length;
  return <div className="pic-lobby">
    <div className="pic-hand demo">{[24, 47, 64, 98, 7].map(k => <PicCard key={k} n={k} small />)}</div>
    <p className="hint">แต่ละรอบ คนบอกคำจะเวียนไปทีละคน • ทุกคนได้ภาพ {HAND} ใบ ลงคนละ 2 ใบ • {n >= PIC_MIN ? `วงนี้ ${n} คน เล่นได้ ${n} รอบให้ทุกคนได้บอกคำ` : `ต้องมีอย่างน้อย ${PIC_MIN} คน`}</p>
  </div>;
}
