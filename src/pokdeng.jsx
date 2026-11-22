// ป๊อกเด้ง (แบบไทย) — ชิปปลอมในเกมเท่านั้น ไม่มีเงินจริง
//   เจ้ามือเวียนทุกตา (หรือหัวหน้าห้องเป็นเจ้ามือตลอด) • ลูกขาลงชิป → แจก 2 ใบ → ป๊อก 8/9 เปิดทันที
//   ลูกขาเลือกจั่วใบที่ 3 / ไม่จั่ว → เจ้ามือเลือกจั่ว → เทียบกับเจ้ามือทีละคน
// อันดับ: ป๊อก > ตอง (×5) > เรียงดอก (×5) > เรียง (×3) > เซียน JQK (×3) > แต้ม (สองเด้ง ×2 / สามเด้ง ×3)
// ลูกขาที่ป๊อก เทียบกับไพ่ 2 ใบแรกของเจ้ามือ (เจ้ามือจั่วทีหลังไม่มีผลกับคนป๊อก)
import React, { useEffect, useState } from 'react';
import { ref, runTransaction, update } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { Avatar, SecH, TimerRing, HostBar, Confetti } from './ui.jsx';
import { fullDeck, shuffleDeck, PCard, Chips, seatPos, seatChips, netOf, ChipSetup } from './playcards.jsx';

export const PD_MIN = 2, PD_MAX = 10, PD_START = 1000;
export const PD_BETS = [10, 20, 50, 100, 200, 500];
export const BET_MS = 20000, DRAW_MS = 15000, SHOW_MS = 15000, DEAL_ANIM = 2000;
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
export const fix = r => { r.base = r.base || {}; r.seats = r.seats || []; r.chips = r.chips || {}; r.buys = r.buys || {}; r.bets = r.bets || {}; r.hands = r.hands || {}; r.dec = r.dec || {}; r.deck = r.deck || []; r.log = r.log || []; return r; };

// ---------- คิดแต้ม ----------
const rv = r => 'A23456789TJQK'.indexOf(r) + 1;           // A=1 … K=13
export function pdEval(cards = []) {
  const rk = cards.map(c => rv(c[0])), su = cards.map(c => c[1]);
  const pts = rk.reduce((s, x) => s + (x >= 10 ? 0 : x), 0) % 10;
  const flush = su.every(s => s === su[0]);
  if (cards.length === 2) {
    const two = flush || rk[0] === rk[1] ? 2 : 1;
    if (pts >= 8) return { cat: 5, pts, mult: two, tb: 0, label: `ป๊อก ${pts}` + (two > 1 ? ' สองเด้ง' : '') };
    return { cat: 0, pts, mult: two, tb: 0, label: `${pts} แต้ม` + (two > 1 ? ' สองเด้ง' : '') };
  }
  const s = [...rk].sort((a, b) => a - b), hi = x => (x === 1 ? 14 : x);
  if (s[0] === s[2]) return { cat: 4, pts, mult: 5, tb: hi(s[0]), label: 'ตอง' };
  const run = s[1] === s[0] + 1 && s[2] === s[1] + 1, qka = s[0] === 1 && s[1] === 12 && s[2] === 13;
  if (run || qka) { const tb = qka ? 14 : s[2]; return flush ? { cat: 3, pts, mult: 5, tb, label: 'เรียงดอก' } : { cat: 2, pts, mult: 3, tb, label: 'เรียง' }; }
  if (s[0] >= 11) return { cat: 1, pts, mult: 3, tb: 0, label: 'เซียน' };
  return { cat: 0, pts, mult: flush ? 3 : 1, tb: 0, label: `${pts} แต้ม` + (flush ? ' สามเด้ง' : '') };
}
export const pdCmp = (a, b) => a.cat - b.cat || a.pts - b.pts || a.tb - b.tb;

// ---------- รอบ / ตา ----------
export function makePdRound(ids, set = {}, number = 1, t0 = Date.now(), bank = null) {
  const start = bank?.start || +set.chips || PD_START; const chips = { ...(bank?.chips || {}) }, buys = {};
  Object.keys(set.per || {}).forEach(id => { if (ids.includes(id) && set.per[id] > 0) chips[id] = +set.per[id]; });
  const r = { number, kind: 'pd', seats: [...ids], start, fixed: set.dealer === 'host' ? set.host || ids[0] : null, di: -1, chips, buys, base: {}, hand: 0, log: [], startedAt: t0 };
  ids.forEach(id => seatChips(r, id)); newHand(r, ids, t0); return r;
}
export const pdPlayers = r => r.seats.filter(id => id !== r.dealer);
export const pdIn = r => pdPlayers(r).filter(id => r.bets[id]);
function newHand(r, present, now) {
  r.seats = r.seats.filter(id => present.includes(id));
  present.filter(id => !r.seats.includes(id)).forEach(id => { r.seats.push(id); const fresh = r.chips[id] == null; seatChips(r, id); if (r.hand) say(r, `🪑 {${id}} นั่งโต๊ะ${fresh ? ` รับชิป ${r.start}` : ''}`); });
  if (r.fixed && r.seats.includes(r.fixed)) r.dealer = r.fixed;
  else { r.di = (r.di + 1) % Math.max(1, r.seats.length); r.dealer = r.seats[r.di]; }
  r.hand++; r.phase = 'bet'; r.at = now; r.until = now + BET_MS; r.bets = {}; r.hands = {}; r.dec = {}; r.deck = []; r.res = null; r.dpok = false;
}
function deal(r, now) {
  const ins = pdIn(r);
  if (!ins.length) { r.phase = 'show'; r.at = now; r.until = now + 4000; r.res = {}; say(r, '😶 ตานี้ไม่มีใครลงชิป'); return; }
  const d = shuffleDeck(fullDeck()); const order = [...ins, r.dealer]; const h = {};
  for (let k = 0; k < 2; k++) order.forEach(id => { (h[id] = h[id] || []).push(d.pop()); });
  r.hands = h; r.deck = d; r.dec = {}; r.at = now;
  r.dpok = pdEval(h[r.dealer]).cat === 5;
  if (r.dpok) { say(r, `🎩 เจ้ามือ {${r.dealer}} ป๊อก! เปิดไพ่ทันที`); return settle(r, now); }
  ins.forEach(id => { if (pdEval(h[id]).cat === 5) { r.dec[id] = 'pok'; say(r, `✨ {${id}} ${pdEval(h[id]).label}!`); } });
  if (ins.every(id => r.dec[id])) return settle(r, now);
  r.phase = 'draw'; r.until = now + DEAL_ANIM + DRAW_MS;
}
function toDealer(r, now) { r.phase = 'dealer'; r.at = now; r.until = now + DRAW_MS; }
function settle(r, now) {
  const dl = r.hands[r.dealer] || []; const dFull = pdEval(dl), d2 = pdEval(dl.slice(0, 2)); const res = {}; let sum = 0;
  pdIn(r).forEach(id => {
    const p = pdEval(r.hands[id]), dh = r.dec[id] === 'pok' ? d2 : dFull; const c = pdCmp(p, dh); const b = r.bets[id];
    const delta = c > 0 ? b * p.mult : c < 0 ? -b * dh.mult : 0;
    r.chips[id] = (r.chips[id] || 0) + delta; sum += delta; res[id] = { delta, label: p.label, w: Math.sign(c) };
  });
  r.chips[r.dealer] = (r.chips[r.dealer] || 0) - sum; res[r.dealer] = { delta: -sum, label: dFull.label, w: 0 };
  r.res = res; r.phase = 'show'; r.at = now; r.until = now + (r.dpok ? DEAL_ANIM : 0) + SHOW_MS;
  say(r, `🎩 เจ้ามือ ${dFull.label} • ${sum > 0 ? 'จ่ายออก ' + sum : sum < 0 ? 'กินเข้า ' + (-sum) : 'เสมอตัว'}`);
}

// ---------- การกระทำ (เรียกใน transaction) ----------
export function pdBet(cur, me, amt, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'bet' || me === r.dealer || !r.seats.includes(me) || r.bets[me]) return;
  if (!PD_BETS.includes(amt) || amt > (r.chips[me] || 0)) return;
  r.bets = { ...r.bets, [me]: amt };
  if (pdPlayers(r).filter(id => (r.chips[id] || 0) >= PD_BETS[0]).every(id => r.bets[id])) deal(r, now);
  return cur;
}
export function pdDraw(cur, me, take, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'draw' || !r.bets[me] || r.dec[me] || me === r.dealer) return;
  if (take) r.hands[me] = [...r.hands[me], r.deck.pop()];
  r.dec = { ...r.dec, [me]: take ? 'draw' : 'stay' };
  if (pdIn(r).every(id => r.dec[id])) toDealer(r, now);
  return cur;
}
export function pdDealer(cur, me, take, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'dealer' || me !== r.dealer) return;
  if (take) r.hands[me] = [...r.hands[me], r.deck.pop()];
  settle(r, now); return cur;
}
export function pdRebuy(cur, me) {
  const r = cur.round; if (cur.status !== 'playing' || !r.seats.includes(me) || (r.chips[me] || 0) >= PD_BETS[0]) return;
  if (r.phase !== 'show' && r.phase !== 'bet' && (r.bets[me] || me === r.dealer)) return;
  r.chips[me] = (r.chips[me] || 0) + r.start; r.buys[me] = (r.buys[me] || 0) + 1; say(r, `💳 {${me}} ซื้อชิปเพิ่ม ${r.start}`); return cur;
}
export function pdNext(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'show') return;
  newHand(r, Object.keys(cur.players || {}), now); if (r.seats.length < 2) return pdEnd(cur, now); return cur;
}
export const pdNet = (r, id) => netOf(r, id);
export function pdEnd(cur, now) {
  const r = cur.round; if (cur.status !== 'playing') return; const sc = { ...(cur.scores || {}) }, net = {};
  Object.keys(r.base).forEach(id => { net[id] = pdNet(r, id); if (cur.players?.[id]) sc[id] = (sc[id] || 0) + net[id]; });
  cur.bank = { ...(cur.bank || {}), pd: { start: r.start, chips: r.chips } };
  r.phase = 'done'; r.at = now; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'pd', net }; return cur;
}
export function pdTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'pd' || cur.status !== 'playing' || now < r.until) return; fix(r);
  if (r.phase === 'bet') { deal(r, now); return cur; }
  if (r.phase === 'draw') { pdIn(r).forEach(id => { if (!r.dec[id]) r.dec[id] = 'stay'; }); toDealer(r, now); return cur; }
  if (r.phase === 'dealer') { const take = pdEval(r.hands[r.dealer]).pts <= 3; if (take) r.hands[r.dealer] = [...r.hands[r.dealer], r.deck.pop()]; settle(r, now); return cur; }
  if (r.phase === 'show') return pdNext(cur, now);
}

// ---------- หน้าจอ ----------
export function PdGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, onBack, srvNow }) {
  const r = fix({ ...room.round }); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'pd') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const [peek, setPeek] = useState({}); const hk = r.number + '-' + r.hand;
  useEffect(() => { setPeek({}); }, [hk]);
  const due = !res && r.until && srvNow >= r.until;
  useEffect(() => { if (due) tx(c => pdTick(c, srvNow)); }, [due, r.at, r.phase]);
  const isDealer = myId === r.dealer, inHand = !!r.bets[myId] || (isDealer && r.phase !== 'bet');
  const my = r.hands[myId] || [];
  const needBet = r.phase === 'bet' && !isDealer && r.seats.includes(myId) && !r.bets[myId] && (r.chips[myId] || 0) >= PD_BETS[0];
  const needDraw = r.phase === 'draw' && !!r.bets[myId] && !r.dec[myId];
  const needDealer = r.phase === 'dealer' && isDealer;
  useEffect(() => { if (needBet || needDraw || needDealer) sfx(sound, 'yourTurn'); }, [needBet, needDraw, needDealer]);
  const myRes = r.res?.[myId];
  useEffect(() => { if (r.phase === 'show' && myRes) sfx(sound, myRes.delta > 0 ? 'win' : myRes.delta < 0 ? 'lose' : 'reveal'); }, [r.phase === 'show', hk]);
  const showAll = r.phase === 'show';
  const myUp = i => showAll || peek[i] || r.dec[myId] === 'pok';
  const myEval = my.length && my.every((_, i) => myUp(i)) ? pdEval(my) : null;
  const n = r.seats.length, me0 = Math.max(0, r.seats.indexOf(myId));

  if (res) {
    const rows = Object.keys(res.net || {}).sort((a, b) => res.net[b] - res.net[a]);
    return <div className="ct-game">
      <div className="ct-final"><h2>🏁 สรุปผลวงป๊อกเด้ง</h2><p>เล่นไป {r.hand} ตา • ชิปปลอมในเกม ไม่มีเงินจริง</p>
        <ol>{rows.map((id, i) => <li key={id} className={id === myId ? 'me' : ''}><span>{['🥇', '🥈', '🥉'][i] || i + 1}</span><Avatar id={id} av={av} size={30} /><b>{nameOf(id)}</b><small>ชิป {(r.chips[id] || 0).toLocaleString()}{r.buys[id] ? ` • ซื้อเพิ่ม ${r.buys[id]} ครั้ง` : ''}</small><em className={res.net[id] > 0 ? 'up' : res.net[id] < 0 ? 'down' : ''}>{res.net[id] > 0 ? '+' : ''}{res.net[id].toLocaleString()}</em></li>)}</ol></div>
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นวงใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มวงใหม่…</div>}
    </div>;
  }

  const phaseTxt = r.phase === 'bet' ? '💰 ลงชิป' : r.phase === 'draw' ? '🃏 จั่วหรือไม่จั่ว' : r.phase === 'dealer' ? `🎩 เจ้ามือตัดสินใจ` : '🔍 เปิดไพ่';
  return <div className="ct-game" data-casino="pd">
    {showAll && myRes?.delta > 0 && <Confetti key={hk} n={50} />}
    <div className="round-top"><span className="eyebrow">ตาที่ {r.hand}</span><span className="cat-tag">🎩 เจ้ามือ: {isDealer ? 'คุณ' : nameOf(r.dealer)}</span></div>
    <div className="ct-table">
      <div className="ct-felt"><div className="ct-center">
        <b className="ct-phase">{phaseTxt}</b>
        {r.until > srvNow && <TimerRing secs={secs(r.until - srvNow)} total={(r.until - r.at) / 1000} size={50} label="วิ" />}
        <small>{r.phase === 'bet' ? `ลงแล้ว ${pdIn(r).length}/${pdPlayers(r).filter(id => (r.chips[id] || 0) >= PD_BETS[0]).length}` : r.phase === 'draw' ? `ตัดสินใจแล้ว ${pdIn(r).filter(id => r.dec[id]).length}/${pdIn(r).length}` : r.phase === 'show' ? 'ตาต่อไปเริ่มอัตโนมัติ' : 'รอเจ้ามือ…'}</small>
      </div></div>
      {r.seats.map((id, k) => {
        const [x, y] = seatPos((k - me0 + n) % n, n); const h = r.hands[id] || []; const rs = r.res?.[id]; const dl = id === r.dealer;
        const up = showAll || r.dec[id] === 'pok' || (dl && r.dpok);
        return <div key={id} className={'ct-seat' + (id === myId ? ' me' : '') + (dl ? ' dealer' : '') + (rs ? (rs.delta > 0 ? ' won' : rs.delta < 0 ? ' lost' : '') : '')} style={{ left: x + '%', top: y + '%' }}>
          <div className="ct-av"><Avatar id={id} av={av} size={34} />{dl && <span className="ct-btn">🎩</span>}</div>
          <b className="ct-nm">{id === myId ? 'คุณ' : nameOf(id)}</b>
          <small className="ct-ch">💰 {(r.chips[id] || 0).toLocaleString()}</small>
          {id !== myId && h.length > 0 && <div className="ct-mini">{h.map((c, i) => <PCard key={hk + i} c={c} up={up} size="xs" i={i} deal={!showAll} />)}</div>}
          {r.bets[id] ? <Chips n={r.bets[id]} cls="ct-bet" /> : r.phase === 'bet' && !dl && (r.chips[id] || 0) >= PD_BETS[0] ? <span className="ct-tag">🤔 กำลังลง</span> : null}
          {r.dec[id] && r.phase !== 'show' && <span className="ct-tag">{r.dec[id] === 'pok' ? '✨ ป๊อก' : r.dec[id] === 'draw' ? '🃏 จั่ว' : '✋ ไม่จั่ว'}</span>}
          {rs && <span className={'ct-res' + (rs.delta > 0 ? ' up' : rs.delta < 0 ? ' down' : '')}>{rs.label}{!dl && rs.delta !== 0 ? <i>{rs.delta > 0 ? '+' : ''}{rs.delta}</i> : dl ? <i>{rs.delta > 0 ? '+' : ''}{rs.delta}</i> : <i>เสมอ</i>}</span>}
        </div>;
      })}
    </div>

    {/* ไพ่ของฉัน */}
    {my.length > 0 && <div className="ct-hand">
      <div className="ct-cards">{my.map((c, i) => <PCard key={hk + i} c={c} up={myUp(i)} size="lg" i={i} deal onClick={!myUp(i) ? () => { sfx(sound, 'click'); setPeek(p => ({ ...p, [i]: true })); } : undefined} />)}</div>
      <p className="ct-eval">{myEval ? <><b>{myEval.label}</b>{myEval.mult > 1 && myEval.cat !== 5 && myEval.cat !== 0 ? ` (×${myEval.mult})` : ''}</> : '👆 แตะไพ่เพื่อค่อย ๆ บีบเปิด'}</p>
    </div>}

    {/* ปุ่มที่ต้องกด */}
    {needBet && <div className="ct-act"><b>💰 ลงชิปตานี้ <small>(มี {(r.chips[myId] || 0).toLocaleString()})</small></b>
      <div className="ct-bets">{PD_BETS.map(b => <button key={b} className="ct-chipbtn" disabled={b > (r.chips[myId] || 0)} onClick={() => { sfx(sound, 'confirm'); tx(c => pdBet(c, myId, b, srvNow)); }}><Chips n={b} /></button>)}</div>
      <TimerRing secs={secs(r.until - srvNow)} total={BET_MS / 1000} size={46} /></div>}
    {(needDraw || needDealer) && <div className="ct-act"><b>{needDealer ? '🎩 เจ้ามือ: จั่วใบที่ 3 ไหม?' : '🃏 จั่วใบที่ 3 ไหม?'} {myEval ? <small>(ตอนนี้ {myEval.label})</small> : <small>(แตะไพ่เพื่อดูก่อน)</small>}</b>
      <div className="ct-row"><button className="primary" onClick={() => { sfx(sound, 'click'); tx(c => (needDealer ? pdDealer : pdDraw)(c, myId, true, srvNow)); }}>🃏 จั่ว</button><button className="secondary" onClick={() => { sfx(sound, 'confirm'); tx(c => (needDealer ? pdDealer : pdDraw)(c, myId, false, srvNow)); }}>✋ ไม่จั่ว</button></div>
      <TimerRing secs={secs(r.until - srvNow)} total={DRAW_MS / 1000} size={46} /></div>}
    {r.seats.includes(myId) && (r.chips[myId] || 0) < PD_BETS[0] && (r.phase === 'show' || (r.phase === 'bet' && !isDealer)) && <div className="ct-act"><b>😵 ชิปหมดแล้ว</b><button className="primary" onClick={() => tx(c => pdRebuy(c, myId))}>💳 ซื้อชิปเพิ่ม {r.start.toLocaleString()} (ชิปปลอม)</button></div>}
    {!r.seats.includes(myId) && <p className="hint">🪑 คุณเพิ่งเข้าห้อง — ได้นั่งโต๊ะตาหน้า พร้อมชิป {(r.chips[myId] ?? r.start).toLocaleString()}</p>}
    {r.seats.includes(myId) && !inHand && r.phase !== 'bet' && r.phase !== 'show' && <p className="hint">ตานี้คุณไม่ได้ลง รอตาหน้านะ</p>}

    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 5).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    {isHost && <HostBar>
      {r.phase === 'show' && <button className="secondary" onClick={() => tx(c => pdNext(c, srvNow))}>⏩ แจกตาต่อไปเลย</button>}
      {r.phase !== 'show' && <button className="secondary" onClick={() => { if (confirm('ข้ามเวลารอ (คนที่ยังไม่เลือก = ไม่ลง/ไม่จั่ว)?')) tx(c => { c.round.until = 0; return pdTick(c, srvNow); }); }}>⏩ ข้ามเวลารอ</button>}
      <button className="secondary" onClick={() => { if (confirm('จบวง สรุปผลชิปเลย?')) tx(c => pdEnd(c, srvNow)); }}>🏁 จบวง สรุปผล</button>
    </HostBar>}
  </div>;
}

export function PdLobby({ db, roomCode, room, isHost, nameOf }) {
  const bank = room.bank?.pd;
  const set = room.settings?.pd || {};
  const save = patch => runTransaction(ref(db, `rooms/${roomCode}/settings/pd`), c => ({ ...(c || {}), ...patch })).catch(() => {});
  return <div className="uc-lobby">
    <ChipSetup db={db} roomCode={roomCode} room={room} kind="pd" def={PD_START} isHost={isHost} nameOf={nameOf} />
    <label>🎩 เจ้ามือ</label>
    <select value={set.dealer || 'rot'} disabled={!isHost} onChange={e => save({ dealer: e.target.value })}><option value="rot">เวียนกันเป็นทุกตา</option><option value="host">หัวหน้าห้องเป็นเจ้ามือตลอด</option></select>
  </div>;
}
