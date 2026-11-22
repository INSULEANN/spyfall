// โป๊กเกอร์ Texas Hold'em — ชิปปลอมในเกมเท่านั้น ไม่มีเงินจริง
//   blinds (SB/BB) • 4 รอบเดิมพัน: ก่อนฟล็อป → ฟล็อป 3 ใบ → เทิร์น → ริเวอร์ • เปิดไพ่ เลือก 5 ใบที่ดีที่สุดจาก 7
//   side pot: แบ่งกองตามยอดที่แต่ละคนลง (คนออลอินชนะได้ไม่เกินที่ตัวเองลง)
import React, { useEffect, useState } from 'react';
import { ref, runTransaction, update } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { Avatar, SecH, TimerRing, HostBar, Confetti } from './ui.jsx';
import { fullDeck, shuffleDeck, PCard, Chips, seatPos, seatChips, netOf, ChipSetup } from './playcards.jsx';

export const PK_MIN = 2, PK_MAX = 9, PK_START = 1000;
export const TURN_MS = 30000, SHOW_MS = 12000;
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
export const fix = r => { for (const k of ['base', 'chips', 'buys', 'holes', 'bet', 'tot', 'folded', 'allin', 'acted']) r[k] = r[k] || {}; r.seats = r.seats || []; r.board = r.board || []; r.deck = r.deck || []; r.log = r.log || []; return r; };

// ---------- จัดอันดับมือ ----------
export const PK_NAMES = ['ไพ่สูง', 'วันแพร์', 'ทูแพร์', 'ตอง', 'สเตรท', 'ฟลัช', 'ฟูลเฮาส์', 'โฟร์การ์ด', 'สเตรทฟลัช', 'รอยัลฟลัช'];
const val = c => '23456789TJQKA'.indexOf(c[0]) + 2;
function score5(cs) {
  const v = cs.map(val).sort((a, b) => b - a), fl = cs.every(c => c[1] === cs[0][1]);
  const cnt = {}; v.forEach(x => { cnt[x] = (cnt[x] || 0) + 1; });
  const g = Object.keys(cnt).map(Number).sort((a, b) => cnt[b] - cnt[a] || b - a);
  const uniq = [...new Set(v)]; let st = 0;
  if (uniq.length === 5) { if (v[0] - v[4] === 4) st = v[0]; else if (v[0] === 14 && v[1] === 5) st = 5; }
  let cat, tb;
  if (st && fl) { cat = 8; tb = [st]; } else if (cnt[g[0]] === 4) { cat = 7; tb = g; } else if (cnt[g[0]] === 3 && cnt[g[1]] === 2) { cat = 6; tb = g; }
  else if (fl) { cat = 5; tb = v; } else if (st) { cat = 4; tb = [st]; } else if (cnt[g[0]] === 3) { cat = 3; tb = g; }
  else if (cnt[g[0]] === 2 && cnt[g[1]] === 2) { cat = 2; tb = g; } else if (cnt[g[0]] === 2) { cat = 1; tb = g; } else { cat = 0; tb = v; }
  let s = cat; for (let i = 0; i < 5; i++) s = s * 15 + (tb[i] || 0); return s;
}
export function pkBest(cards) {
  let best = -1, five = null; const n = cards.length;
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) for (let d = c + 1; d < n; d++) for (let e = d + 1; e < n; e++) {
    const h = [cards[a], cards[b], cards[c], cards[d], cards[e]]; const s = score5(h); if (s > best) { best = s; five = h; }
  }
  const cat = Math.floor(best / 15 ** 5); const royal = cat === 8 && five.some(c => c[0] === 'A') && five.some(c => c[0] === 'K');
  return { s: best, cat, five, name: PK_NAMES[royal ? 9 : cat] };
}

// ---------- รอบ / ตา ----------
export function makePkRound(ids, set = {}, number = 1, t0 = Date.now(), bank = null) {
  const start = bank?.start || +set.chips || PK_START, bb = +set.bb || 20; const chips = { ...(bank?.chips || {}) }, buys = {};
  Object.keys(set.per || {}).forEach(id => { if (ids.includes(id) && set.per[id] > 0) chips[id] = +set.per[id]; });
  const r = { number, kind: 'pk', seats: [...ids], start, bb, sb: bb / 2, btn: -1, chips, buys, base: {}, hand: 0, log: [], startedAt: t0 };
  fix(r); ids.forEach(id => seatChips(r, id)); newHand(r, ids, t0); return r;
}
export const pkLive = r => r.seats.filter(id => r.holes[id] && !r.folded[id]);
const canAct = r => pkLive(r).filter(id => !r.allin[id]);
const nextOf = (r, i, ok) => { const n = r.seats.length; for (let k = 1; k <= n; k++) { const id = r.seats[(i + k) % n]; if (ok(id)) return id; } return null; };
function pay(r, id, amt) {
  const a = Math.min(amt, r.chips[id]); r.chips[id] -= a; r.bet[id] = (r.bet[id] || 0) + a; r.tot[id] = (r.tot[id] || 0) + a;
  if (r.chips[id] === 0) r.allin[id] = true; return a;
}
function newHand(r, present, now) {
  r.seats = r.seats.filter(id => present.includes(id));
  present.filter(id => !r.seats.includes(id)).forEach(id => { r.seats.push(id); const fresh = r.chips[id] == null; seatChips(r, id); if (r.hand) say(r, `🪑 {${id}} นั่งโต๊ะ${fresh ? ` รับชิป ${r.start}` : ''}`); });
  for (const k of ['holes', 'bet', 'tot', 'folded', 'allin', 'acted']) r[k] = {};
  r.board = []; r.res = null; r.pots = null; r.at = now;
  const ok = id => r.chips[id] > 0; const inn = r.seats.filter(ok);
  if (inn.length < 2) { r.phase = 'wait'; r.until = 0; r.toAct = null; return; }
  r.hand++; const bi = r.btn < 0 ? -1 : r.btn; const btnId = nextOf(r, bi < 0 ? r.seats.length - 1 : bi, ok); r.btn = r.seats.indexOf(btnId);
  const sbId = inn.length === 2 ? btnId : nextOf(r, r.btn, ok), bbId = nextOf(r, r.seats.indexOf(sbId), ok);
  const d = shuffleDeck(fullDeck()); const order = []; let x = r.seats.indexOf(sbId); for (let k = 0; k < inn.length; k++) { order.push(r.seats[x]); x = r.seats.indexOf(nextOf(r, x, ok)); }
  for (let k = 0; k < 2; k++) order.forEach(id => { (r.holes[id] = r.holes[id] || []).push(d.pop()); });
  r.deck = d; r.sbId = sbId; r.bbId = bbId;
  pay(r, sbId, r.sb); pay(r, bbId, r.bb); r.maxBet = Math.max(r.bet[sbId] || 0, r.bet[bbId] || 0); r.minRaise = r.bb;
  r.phase = 'pre'; r.toAct = nextOf(r, r.seats.indexOf(bbId), id => r.holes[id] && !r.folded[id] && !r.allin[id]);
  say(r, `🃏 ตาที่ ${r.hand} • ดีลเลอร์ {${btnId}} • SB {${sbId}} ${r.sb} • BB {${bbId}} ${r.bb}`);
  afterAction(r, now, bbId);
}
const streetDone = r => { const ca = canAct(r); if (pkLive(r).length <= 1) return true; if (!ca.length) return true; if (ca.length === 1 && (r.bet[ca[0]] || 0) >= r.maxBet) return true; return ca.every(id => r.acted[id] && (r.bet[id] || 0) === r.maxBet); };
function afterAction(r, now, lastId) {
  const live = pkLive(r);
  if (live.length === 1) return winAlone(r, live[0], now);
  if (!streetDone(r)) { r.toAct = nextOf(r, r.seats.indexOf(lastId), id => r.holes[id] && !r.folded[id] && !r.allin[id] && (!r.acted[id] || (r.bet[id] || 0) < r.maxBet)); r.until = now + TURN_MS; r.at = now; return; }
  // จบรอบเดิมพันนี้ → เปิดกองกลางต่อ
  r.bet = {}; r.acted = {}; r.maxBet = 0; r.minRaise = r.bb;
  const deal = k => { for (let i = 0; i < k; i++) r.board = [...r.board, r.deck.pop()]; };
  const runOut = canAct(r).length <= 1;
  if (r.phase === 'pre') { deal(3); r.phase = 'flop'; } else if (r.phase === 'flop') { deal(1); r.phase = 'turn'; } else if (r.phase === 'turn') { deal(1); r.phase = 'river'; } else return showdown(r, now);
  if (runOut) { while (r.board.length < 5) deal(1); return showdown(r, now); }
  r.toAct = nextOf(r, r.btn, id => r.holes[id] && !r.folded[id] && !r.allin[id]); r.at = now; r.until = now + TURN_MS;
}
function winAlone(r, id, now) {
  const pot = Object.values(r.tot).reduce((a, b) => a + b, 0); r.chips[id] += pot;
  r.res = { [id]: { won: pot } }; r.pots = [{ amt: pot, win: [id] }]; r.phase = 'show'; r.toAct = null; r.at = now; r.until = now + SHOW_MS; r.alone = true;
  say(r, `🏆 {${id}} ได้กอง ${pot} (คนอื่นหมอบหมด)`);
}
// แบ่ง side pot ตามยอดที่ลง → หาผู้ชนะแต่ละกอง
export function pkPots(r) {
  const ids = Object.keys(r.tot).filter(id => r.tot[id] > 0); const lv = [...new Set(ids.filter(id => !r.folded[id]).map(id => r.tot[id]))].sort((a, b) => a - b);
  const pots = []; let prev = 0;
  lv.forEach((L, i) => {
    const top = i === lv.length - 1 ? Infinity : L;   // กองสุดท้ายเก็บเศษของคนที่หมอบแต่ลงเกินด้วย
    const amt = ids.reduce((s, id) => s + Math.max(0, Math.min(r.tot[id], top) - prev), 0);
    const elig = pkLive(r).filter(id => r.tot[id] >= L);
    if (amt > 0) { if (pots.length && pots[pots.length - 1].elig.join() === elig.join()) pots[pots.length - 1].amt += amt; else pots.push({ amt, elig }); }
    prev = L;
  });
  return pots;
}
function showdown(r, now) {
  const best = {}; pkLive(r).forEach(id => { best[id] = pkBest([...r.holes[id], ...r.board]); });
  const pots = pkPots(r), res = {};
  pots.forEach(p => {
    const top = Math.max(...p.elig.map(id => best[id].s)); const w = p.elig.filter(id => best[id].s === top);
    const ordered = []; let x = r.btn; for (let k = 0; k < r.seats.length; k++) { x = (x + 1) % r.seats.length; if (w.includes(r.seats[x])) ordered.push(r.seats[x]); }
    const each = Math.floor(p.amt / w.length); let rem = p.amt - each * w.length;
    ordered.forEach(id => { const g = each + (rem-- > 0 ? 1 : 0); r.chips[id] += g; res[id] = { won: (res[id]?.won || 0) + g }; });
    p.win = ordered;
  });
  Object.keys(best).forEach(id => { res[id] = { ...(res[id] || { won: 0 }), name: best[id].name, five: best[id].five }; });
  r.res = res; r.pots = pots.map(p => ({ amt: p.amt, win: p.win })); r.phase = 'show'; r.toAct = null; r.at = now; r.until = now + SHOW_MS; r.alone = false;
  pots.forEach((p, i) => say(r, `🏆 ${pots.length > 1 ? (i ? `กองข้าง ${i}` : 'กองหลัก') : 'กองกลาง'} ${p.amt} → ${p.win.map(id => `{${id}}`).join(', ')} (${best[p.win[0]].name})`));
}

// ---------- การกระทำ (เรียกใน transaction) ----------
// kind: fold | check | call | raise (to = ยอดเดิมพันรวมในรอบนี้) | allin
export function pkAct(cur, me, kind, to, now) {
  const r = cur.round; if (cur.status !== 'playing' || !['pre', 'flop', 'turn', 'river'].includes(r.phase) || r.toAct !== me) return;
  const mine = r.bet[me] || 0, need = r.maxBet - mine;
  if (kind === 'allin' && mine + r.chips[me] <= r.maxBet) kind = need > 0 ? 'call' : 'check';   // ชิปไม่พอเกินยอดคอล = คอลหมดหน้าตัก
  if (kind === 'fold') { r.folded[me] = true; say(r, `🙅 {${me}} หมอบ`); }
  else if (kind === 'check') { if (need > 0) return; say(r, `✋ {${me}} เช็ก`); }
  else if (kind === 'call') { if (need <= 0) return; const a = pay(r, me, need); say(r, `📞 {${me}} คอล ${a}${r.allin[me] ? ' (ออลอิน)' : ''}`); }
  else if (kind === 'raise' || kind === 'allin') {
    const cap = mine + r.chips[me]; let t = kind === 'allin' ? cap : Math.floor(+to || 0);
    if (t > cap || t <= r.maxBet) return; if (t < r.maxBet + r.minRaise && t < cap) return;
    const inc = t - r.maxBet; pay(r, me, t - mine);
    if (inc >= r.minRaise) { r.minRaise = inc; r.acted = {}; }
    r.maxBet = t; say(r, `${r.allin[me] ? '💥' : '⬆️'} {${me}} ${r.allin[me] ? 'ออลอิน' : r.maxBet === inc ? 'เบ็ต' : 'เรสเป็น'} ${t}`);
  } else return;
  r.acted = { ...r.acted, [me]: true }; afterAction(r, now, me); return cur;
}
export function pkRebuy(cur, me) {
  const r = cur.round; if (cur.status !== 'playing' || !r.seats.includes(me) || r.chips[me] > 0 || (r.holes[me] && !r.folded[me] && r.phase !== 'show')) return;
  r.chips[me] = r.start; r.buys[me] = (r.buys[me] || 0) + 1; say(r, `💳 {${me}} ซื้อชิปเพิ่ม ${r.start}`);
  return cur;
}
export function pkNext(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || (r.phase !== 'show' && r.phase !== 'wait')) return;
  newHand(r, Object.keys(cur.players || {}), now); return cur;
}
export const pkNet = (r, id) => netOf(r, id, ['pre', 'flop', 'turn', 'river'].includes(r.phase) ? r.tot[id] || 0 : 0);
export function pkEnd(cur, now) {
  const r = cur.round; if (cur.status !== 'playing') return; const sc = { ...(cur.scores || {}) }, net = {};
  if (r.phase !== 'show' && r.phase !== 'wait') Object.keys(r.tot).forEach(id => { r.chips[id] += r.tot[id]; });  // ตาที่ค้างอยู่ คืนชิปที่ลง
  r.phase = 'done'; Object.keys(r.base).forEach(id => { net[id] = pkNet(r, id); if (cur.players?.[id]) sc[id] = (sc[id] || 0) + net[id]; });
  cur.bank = { ...(cur.bank || {}), pk: { start: r.start, chips: r.chips } };
  r.at = now; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'pk', net }; return cur;
}
export function pkTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'pk' || cur.status !== 'playing' || !r.until || now < r.until) return; fix(r);
  if (r.phase === 'show') return pkNext(cur, now);
  if (r.toAct) { const me = r.toAct; return pkAct(cur, me, (r.bet[me] || 0) >= r.maxBet ? 'check' : 'fold', 0, now); }
}

// ---------- หน้าจอ ----------
const STREET = { pre: 'ก่อนฟล็อป', flop: 'ฟล็อป', turn: 'เทิร์น', river: 'ริเวอร์', show: 'เปิดไพ่', wait: 'รอผู้เล่น' };
export function PkGame({ db, room, roomCode, myId, isHost, sound, av, nameOf, onBack, srvNow }) {
  const r = fix({ ...room.round }); const res = room.status === 'result' && room.result;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'pk') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const hk = r.number + '-' + r.hand; const [amt, setAmt] = useState(0);
  const due = !res && r.until && srvNow >= r.until;
  useEffect(() => { if (due) tx(c => pkTick(c, srvNow)); }, [due, r.at, r.phase]);
  const myTurn = r.toAct === myId && !res;
  const mine = r.bet[myId] || 0, need = Math.max(0, (r.maxBet || 0) - mine), cap = mine + (r.chips[myId] || 0);
  const minTo = Math.min(cap, (r.maxBet || 0) + (r.minRaise || r.bb));
  useEffect(() => { if (myTurn) { sfx(sound, 'yourTurn'); setAmt(minTo); } }, [myTurn, r.at]);
  const showAll = r.phase === 'show' && !r.alone; const myRes = r.res?.[myId];
  useEffect(() => { if (r.phase === 'show' && r.holes[myId]) sfx(sound, myRes?.won > 0 ? 'win' : 'lose'); }, [r.phase === 'show', hk]);
  useEffect(() => { if (r.board.length) sfx(sound, 'reveal'); }, [r.board.length]);
  const pot = Object.values(r.tot).reduce((a, b) => a + b, 0);
  const my = r.holes[myId] || []; const myBest = my.length && r.board.length >= 3 ? pkBest([...my, ...r.board]) : null;
  const n = r.seats.length, me0 = Math.max(0, r.seats.indexOf(myId)); const btnId = r.seats[r.btn];
  const winFive = new Set(showAll ? Object.values(r.res || {}).filter(x => x.won > 0).flatMap(x => x.five || []) : []);
  const act = (k, t) => { sfx(sound, k === 'fold' ? 'click' : 'confirm'); tx(c => pkAct(c, myId, k, t, srvNow)); };

  if (res) {
    const rows = Object.keys(res.net || {}).sort((a, b) => res.net[b] - res.net[a]);
    return <div className="ct-game">
      <div className="ct-final"><h2>🏁 สรุปผลวงโป๊กเกอร์</h2><p>เล่นไป {r.hand} ตา • ชิปปลอมในเกม ไม่มีเงินจริง</p>
        <ol>{rows.map((id, i) => <li key={id} className={id === myId ? 'me' : ''}><span>{['🥇', '🥈', '🥉'][i] || i + 1}</span><Avatar id={id} av={av} size={30} /><b>{nameOf(id)}</b><small>ชิป {(r.chips[id] || 0).toLocaleString()}{r.buys[id] ? ` • ซื้อเพิ่ม ${r.buys[id]} ครั้ง` : ''}</small><em className={res.net[id] > 0 ? 'up' : res.net[id] < 0 ? 'down' : ''}>{res.net[id] > 0 ? '+' : ''}{res.net[id].toLocaleString()}</em></li>)}</ol></div>
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นวงใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มวงใหม่…</div>}
    </div>;
  }

  return <div className="ct-game" data-casino="pk">
    {r.phase === 'show' && myRes?.won > 0 && <Confetti key={hk} n={50} />}
    <div className="round-top"><span className="eyebrow">ตาที่ {r.hand} • {STREET[r.phase]}</span><span className="cat-tag">Blinds {r.sb}/{r.bb}</span></div>
    <div className="ct-table">
      <div className="ct-felt"><div className="ct-center">
        <div className="ct-board">{[0, 1, 2, 3, 4].map(i => r.board[i] ? <PCard key={hk + 'b' + i} c={r.board[i]} size="sm" i={i < 3 ? i : 0} deal hi={winFive.has(r.board[i])} /> : <span key={i} className="ct-slot" />)}</div>
        <Chips n={pot} cls="ct-pot" />
        {r.phase === 'show' && r.pots?.length > 1 && <small>{r.pots.map((p, i) => `${i ? 'กองข้าง' : 'กองหลัก'} ${p.amt}`).join(' • ')}</small>}
        {r.phase === 'wait' && <small>ผู้เล่นที่มีชิปไม่ถึง 2 คน — ซื้อชิปเพิ่มแล้วแจกต่อ</small>}
      </div></div>
      {r.seats.map((id, k) => {
        const [x, y] = seatPos((k - me0 + n) % n, n); const h = r.holes[id] || []; const rs = r.res?.[id]; const turn = r.toAct === id;
        return <div key={id} className={'ct-seat' + (id === myId ? ' me' : '') + (turn ? ' turn' : '') + (r.folded[id] ? ' fold' : '') + (rs?.won > 0 ? ' won' : '')} style={{ left: x + '%', top: y + '%' }}>
          <div className="ct-av"><Avatar id={id} av={av} size={34} />{id === btnId && <span className="ct-btn">D</span>}{turn && r.until > srvNow && <span className="ct-tm">{secs(r.until - srvNow)}</span>}</div>
          <b className="ct-nm">{id === myId ? 'คุณ' : nameOf(id)}</b>
          <small className="ct-ch">💰 {(r.chips[id] || 0).toLocaleString()}</small>
          {id !== myId && h.length > 0 && !r.folded[id] && <div className="ct-mini">{h.map((c, i) => <PCard key={hk + i} c={c} up={showAll} size="xs" i={i} deal={r.phase === 'pre'} hi={winFive.has(c)} />)}</div>}
          {r.bet[id] > 0 && <Chips n={r.bet[id]} cls="ct-bet" />}
          {r.folded[id] ? <span className="ct-tag">หมอบ</span> : r.allin[id] && r.phase !== 'show' ? <span className="ct-tag hot">ออลอิน</span> : null}
          {rs && (rs.won > 0 || showAll) && <span className={'ct-res' + (rs.won > 0 ? ' up' : '')}>{rs.name || 'ชนะ'}{rs.won > 0 && <i>+{rs.won}</i>}</span>}
          {(r.chips[id] || 0) === 0 && !h.length && <span className="ct-tag">💤 ชิปหมด</span>}
        </div>;
      })}
    </div>

    {my.length > 0 && <div className="ct-hand">
      <div className="ct-cards">{my.map((c, i) => <PCard key={hk + i} c={c} size="lg" i={i} deal dim={r.folded[myId]} hi={winFive.has(c)} />)}</div>
      <p className="ct-eval">{r.folded[myId] ? 'หมอบแล้ว รอตาหน้า' : myBest ? <>ตอนนี้: <b>{myBest.name}</b></> : 'ไพ่ในมือของคุณ'}</p>
    </div>}

    {myTurn && <div className="ct-act pk">
      <b>🎯 ตาคุณ! {need > 0 ? <small>ต้องคอล {Math.min(need, r.chips[myId])}</small> : <small>เช็กได้</small>}</b>
      <div className="ct-row">
        <button className="secondary" onClick={() => act('fold')}>🙅 หมอบ</button>
        {need === 0 ? <button className="secondary" onClick={() => act('check')}>✋ เช็ก</button> : <button className="primary" onClick={() => act('call')}>📞 คอล {Math.min(need, r.chips[myId])}</button>}
      </div>
      {cap > r.maxBet && <div className="ct-raise">
        {cap > minTo && <input type="range" min={minTo} max={cap} step={r.sb} value={Math.min(cap, Math.max(minTo, amt))} onChange={e => setAmt(+e.target.value)} />}
        <div className="ct-row">
          {cap > minTo && [['½ กอง', Math.floor(pot / 2)], ['กองเต็ม', pot]].map(([l, v]) => { const t = Math.min(cap, Math.max(minTo, r.maxBet + v)); return <button key={l} className="ct-mini-btn" onClick={() => setAmt(t)}>{l}</button>; })}
          {cap > minTo && <button className="primary" onClick={() => act('raise', Math.min(cap, Math.max(minTo, amt)))}>⬆️ {r.maxBet ? 'เรสเป็น' : 'เบ็ต'} {Math.min(cap, Math.max(minTo, amt))}</button>}
          <button className="ct-allin" onClick={() => { if (confirm(`ออลอิน ${cap}?`)) act('allin'); }}>💥 ออลอิน {cap}</button>
        </div>
      </div>}
      <TimerRing secs={secs(r.until - srvNow)} total={TURN_MS / 1000} size={46} />
    </div>}
    {!r.seats.includes(myId) && <p className="hint">🪑 คุณเพิ่งเข้าห้อง — ได้นั่งโต๊ะตาหน้า พร้อมชิป {(r.chips[myId] ?? r.start).toLocaleString()}</p>}
    {!myTurn && r.toAct && <p className="hint">⏳ รอ {nameOf(r.toAct)} ตัดสินใจ…</p>}
    {r.seats.includes(myId) && (r.chips[myId] || 0) === 0 && (!r.holes[myId] || r.folded[myId] || r.phase === 'show' || r.phase === 'wait') && <div className="ct-act"><b>😵 ชิปหมดแล้ว</b><button className="primary" onClick={() => tx(c => pkRebuy(c, myId))}>💳 ซื้อชิปเพิ่ม {r.start.toLocaleString()} (ชิปปลอม)</button></div>}

    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 6).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    {isHost && <HostBar>
      {(r.phase === 'show' || r.phase === 'wait') && <button className="secondary" onClick={() => tx(c => pkNext(c, srvNow))}>⏩ แจกตาต่อไปเลย</button>}
      {r.toAct && r.toAct !== myId && <button className="secondary" onClick={() => { if (confirm(`ข้ามตา ${nameOf(r.toAct)} (เช็ก/หมอบให้)?`)) tx(c => { c.round.until = 0; return pkTick(c, srvNow); }); }}>⏩ ข้ามตา {nameOf(r.toAct)}</button>}
      <button className="secondary" onClick={() => { if (confirm('จบวง สรุปผลชิปเลย? (ตาที่ค้างคืนชิปให้)')) tx(c => pkEnd(c, srvNow)); }}>🏁 จบวง สรุปผล</button>
    </HostBar>}
  </div>;
}

export function PkLobby({ db, roomCode, room, isHost, nameOf }) {
  const bank = room.bank?.pk;
  const set = room.settings?.pk || {};
  const save = patch => runTransaction(ref(db, `rooms/${roomCode}/settings/pk`), c => ({ ...(c || {}), ...patch })).catch(() => {});
  return <div className="uc-lobby">
    <ChipSetup db={db} roomCode={roomCode} room={room} kind="pk" def={PK_START} isHost={isHost} nameOf={nameOf} />
    <label>🎚️ Blinds (เล็ก/ใหญ่)</label>
    <select value={set.bb || 20} disabled={!isHost} onChange={e => save({ bb: +e.target.value })}><option value={10}>5 / 10</option><option value={20}>10 / 20</option><option value={50}>25 / 50</option><option value={100}>50 / 100</option></select>
  </div>;
}
