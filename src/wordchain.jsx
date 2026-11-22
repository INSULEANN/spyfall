// เกม ต่อตัวท้าย (type 'wc') — เกมต่อคำ ไทย / อังกฤษ
//   ผลัดกันพิมพ์คำที่ขึ้นต้นด้วยพยัญชนะ (หรือตัวอักษร) ตัวท้ายของคำก่อนหน้า ห้ามซ้ำ ห้ามหมดเวลา
//   หมดเวลา / ยอมแพ้ = เสียหัวใจ 1 ดวง หัวใจหมด = ตกรอบ เหลือคนสุดท้าย = ชนะ
//   คำที่ไม่มีในคลัง → เพื่อนโหวต ผ่าน = ใช้ได้ และถ้าทุกคน (อย่างน้อย 2 เสียง) กดยอมรับ จะถูกเพิ่มเข้าคลังกลาง wc/<lang>/<คำ> ใช้ได้ทุกห้อง
import React, { useEffect, useRef, useState } from 'react';
import { ref, runTransaction, onValue, set, serverTimestamp } from 'firebase/database';
import { RotateCcw } from 'lucide-react';
import { play as sfx } from './sfx.js';
import { shuffle, rint } from './rand.js';
import { Avatar, Phase, Outcome, Leaderboard, HostBar, SecH, TimerRing, ActionSheet, Voters } from './ui.jsx';

export const WC_MIN = 2, WC_MAX = 12;
export const WC_SCORE = { win: 3, second: 1 };
export const WC_VOTE_MS = 12000;
export const WC_LANGS = { th: { n: 'ภาษาไทย', e: '🇹🇭', unit: 'พยัญชนะ' }, en: { n: 'English', e: '🇬🇧', unit: 'ตัวอักษร' } };
const say = (r, text) => { r.log = [...(r.log || []), { text, t: Date.now() }].slice(-30); };
const fix = r => { r.order = r.order || []; r.lives = r.lives || {}; r.used = r.used || {}; r.chain = r.chain || []; r.out = r.out || []; r.votes = r.votes || {}; r.log = r.log || []; r.cnt = r.cnt || {}; return r; };

// ---------- ตัวอักษรต้น / ท้าย ----------
const isTh = ch => ch >= 'ก' && ch <= 'ฮ' && ch !== 'ฤ' && ch !== 'ฦ';
// พยัญชนะที่หาคำขึ้นต้นยากมาก → ยอมให้ใช้ตัวเสียงเดียวกันแทนได้
export const TH_ALT = { 'ฎ': 'ด', 'ฏ': 'ต', 'ฃ': 'ข', 'ฅ': 'ค', 'ฆ': 'ค', 'ฑ': 'ท', 'ฒ': 'ท', 'ฐ': 'ถ', 'ณ': 'น', 'ญ': 'ย', 'ฌ': 'ช', 'ษ': 'ส', 'ฬ': 'ล' };
export function wcClean(s, lang) {
  const t = String(s || '').normalize('NFC').replace(/[\s​-‍﻿]/g, '');
  return lang === 'en' ? t.toLowerCase() : t;
}
export function wcValid(w, lang) { return lang === 'en' ? /^[a-z]{2,20}$/.test(w) : /^[ก-๎]{2,20}$/.test(w) && !!wcFirst(w, lang) && !!wcLast(w, lang); }
export function wcFirst(w, lang) {
  if (lang === 'en') return w[0];
  for (const ch of w) if (isTh(ch)) return ch;
  return null;
}
// พยัญชนะตัวท้ายที่ "ออกเสียง": ข้ามสระ วรรณยุกต์ ๆ ฯ และตัวการันต์ (ตัวที่มี ์ รวมตัวควบหน้ามัน เช่น จันทร์ → น, ศาสตร์ → ส)
export function wcLast(w, lang) {
  if (lang === 'en') return w[w.length - 1];
  let i = w.length - 1;
  while (i >= 0) {
    const ch = w[i];
    if (ch === '์') {
      i--; if (i >= 0 && 'ิุ'.includes(w[i])) i--;
      if (i >= 0 && isTh(w[i])) i--;
      if (i >= 1 && isTh(w[i]) && isTh(w[i - 1])) i--;
      continue;
    }
    if (isTh(ch)) return ch;
    i--;
  }
  return null;
}
export const wcStarts = (need, lang) => lang === 'th' && TH_ALT[need] ? [need, TH_ALT[need]] : [need];
// ตรวจคำก่อนส่ง → ข้อความผิดพลาด หรือ null
export function wcCheck(r, w) {
  if (!wcValid(w, r.lang)) return r.lang === 'en' ? 'ใช้ได้แค่ตัวอักษร a–z อย่างน้อย 2 ตัว' : 'ใช้ได้แค่ตัวอักษรไทย อย่างน้อย 2 ตัว';
  if (!wcStarts(r.need, r.lang).includes(wcFirst(w, r.lang))) return `ต้องขึ้นต้นด้วย “${wcStarts(r.need, r.lang).join(' หรือ ')}”`;
  if (r.used?.[w]) return 'คำนี้ใช้ไปแล้วในรอบนี้';
  return null;
}

// ---------- คลังคำ (โหลดตอนเข้าเกม) ----------
const DICT = {};
export function loadWcDict(lang) {
  if (!DICT[lang]) DICT[lang] = (lang === 'en' ? import('./wc/en.js') : import('./wc/th.js')).then(m => new Set(m.default.split('\n')));
  return DICT[lang];
}

const START = { th: [...'กคมนสปทบพรลดตขหจชวอย'], en: [...'abcdefghilmnoprstw'] };
export function makeWcRound(ids, set = {}, number = 1, t0 = Date.now()) {
  const lang = set.lang === 'en' ? 'en' : 'th'; const lives = [1, 2, 3].includes(+set.lives) ? +set.lives : 2;
  const tmT = [10, 15, 20, 30, 45].includes(+set.secs) ? +set.secs * 1000 : 20000;
  const L = {}; ids.forEach(id => { L[id] = lives; });
  return { number, kind: 'wc', lang, lives: L, maxLives: lives, tmT, order: shuffle(ids), turn: 0, need: START[lang][rint(START[lang].length)], used: {}, chain: [], out: [], cnt: {}, phase: 'turn', at: t0 + 3000, until: t0 + 3000 + tmT, pend: null, votes: null, added: [], log: [], startedAt: t0 };
}
export const wcCur = r => r.order[r.turn];
const alive = r => r.order.filter(id => (r.lives[id] || 0) > 0);
const voters = (cur, r) => alive(r).filter(id => id !== r.pend?.by && cur.players?.[id]);

function nextTurn(r, now) {
  const n = r.order.length; for (let k = 1; k <= n; k++) { const j = (r.turn + k) % n; if ((r.lives[r.order[j]] || 0) > 0) { r.turn = j; break; } }
  r.phase = 'turn'; r.at = now; r.until = now + r.tmT; r.pend = null; r.votes = null;
}
function accept(cur, r, w, by, now, voted) {
  r.used = { ...r.used, [w]: true }; r.chain = [...r.chain, { w, by, v: voted ? 1 : 0 }]; r.cnt = { ...r.cnt, [by]: (r.cnt[by] || 0) + 1 };
  r.need = wcLast(w, r.lang); nextTurn(r, now); return cur;
}
function loseLife(cur, r, id, now, why) {
  r.lives = { ...r.lives, [id]: Math.max(0, (r.lives[id] || 0) - 1) };
  if (!r.lives[id]) { r.out = [...r.out, id]; say(r, `💀 {${id}} ${why} — ตกรอบ`); } else say(r, `💔 {${id}} ${why} — เหลือ ${r.lives[id]} หัวใจ`);
  if (alive(r).length <= 1) return finish(cur, now);
  nextTurn(r, now); return cur;
}
function finish(cur, now) {
  const r = cur.round; const rank = [...alive(r), ...[...r.out].reverse()]; r.rank = rank;
  const pts = {}; const sc = { ...(cur.scores || {}) };
  Object.keys(cur.players || {}).forEach(id => { const p = id === rank[0] ? WC_SCORE.win : id === rank[1] && rank.length >= 3 ? WC_SCORE.second : 0; pts[id] = p; sc[id] = (sc[id] || 0) + p; });
  r.phase = 'done'; r.at = now; cur.status = 'result'; cur.scores = sc; cur.result = { type: 'wc', winner: rank[0] || null, points: pts };
  return cur;
}

// ---------- การกระทำ (เรียกใน transaction) ----------
// known = คำนี้มีในคลัง (เครื่องคนส่งเช็กเอง) • ไม่มี → เข้าโหวต
export function wcSubmit(cur, me, text, known, now) {
  if (cur?.round?.kind === 'wc') fix(cur.round);
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'turn' || wcCur(r) !== me || now < r.at) return;
  const w = wcClean(text, r.lang); if (wcCheck(r, w)) return;
  if (known) return accept(cur, r, w, me, now, false);
  r.phase = 'vote'; r.pend = { w, by: me, left: Math.max(5000, r.until - now) }; r.votes = {}; r.at = now; r.until = now + WC_VOTE_MS;
  if (!voters(cur, r).length) return accept(cur, r, w, me, now, true);
  return cur;
}
export function wcVote(cur, me, yes, now) {
  if (cur?.round?.kind === 'wc') fix(cur.round);
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'vote' || !voters(cur, r).includes(me)) return;
  r.votes = { ...(r.votes || {}), [me]: !!yes };
  if (!yes) return reject(cur, r, now);
  if (voters(cur, r).every(id => r.votes[id])) return pass(cur, r, now);
  return cur;
}
function pass(cur, r, now) {
  const { w, by } = r.pend; const vs = voters(cur, r); const all = vs.length >= 2 && vs.every(id => r.votes?.[id] === true);
  if (all) r.added = [...(r.added || []), w];
  say(r, `🗳️ เพื่อนยอมรับคำ “${w}” ของ {${by}}${all ? ' — เพิ่มเข้าคลังคำแล้ว 📚' : ''}`);
  return accept(cur, r, w, by, now, true);
}
function reject(cur, r, now) {
  const { w, by, left } = r.pend; say(r, `🙅 ไม่ยอมรับคำ “${w}” ของ {${by}} — พิมพ์คำใหม่`);
  r.phase = 'turn'; r.at = now; r.until = now + left; r.pend = null; r.votes = null; return cur;
}
export function wcGiveUp(cur, me, now, host) {
  if (cur?.round?.kind === 'wc') fix(cur.round);
  const r = cur.round; if (cur.status !== 'playing' || r.phase !== 'turn' || (wcCur(r) !== me && !host)) return;
  return loseLife(cur, r, wcCur(r), now, me === wcCur(r) ? 'ยอมแพ้ตานี้' : 'ถูกข้าม');
}
export function wcTick(cur, now) {
  const r = cur.round; if (!r || r.kind !== 'wc' || cur.status !== 'playing') return; fix(r);
  if (r.phase === 'turn' && now >= r.until) return loseLife(cur, r, wcCur(r), now, 'คิดไม่ทัน');
  if (r.phase === 'vote' && now >= r.until) {   // หมดเวลาโหวต: มีคนกดยอมรับและไม่มีใครค้าน = ผ่าน
    const v = Object.values(r.votes || {}); return v.length && v.every(Boolean) ? pass(cur, r, now) : reject(cur, r, now);
  }
}
export function wcForce(cur, now) {
  const r = cur.round; if (cur.status !== 'playing' || r?.kind !== 'wc') return; fix(r);
  if (r.phase === 'vote') { const v = Object.values(r.votes || {}); return v.length && v.every(Boolean) ? pass(cur, r, now) : reject(cur, r, now); }
  return finish(cur, now);
}
// คนหลุดออกจากห้อง: ตกรอบทันที
export function kickWc(cur, id, now) {
  if (cur?.round?.kind === 'wc') fix(cur.round);
  const r = cur.round; if (cur.status !== 'playing' || cur.players?.[id] || !(r.lives[id] > 0)) return;
  const wasTurn = wcCur(r) === id && r.phase === 'turn';
  r.lives = { ...r.lives, [id]: 0 }; r.out = [...r.out, id]; say(r, `🚪 {${id}} ออกจากเกม`);
  if (alive(r).length <= 1) return finish(cur, now);
  if (r.phase === 'vote') { if (r.pend.by === id) nextTurn(r, now); else if (voters(cur, r).every(x => r.votes?.[x])) return pass(cur, r, now); }
  else if (wasTurn) nextTurn(r, now);
  return cur;
}

// ---------- หน้าจอ ----------
const Hearts = ({ n, max }) => <span className="wc-hearts">{Array.from({ length: max }, (_, i) => <i key={i} className={i < n ? 'on' : ''}>{i < n ? '❤️' : '🖤'}</i>)}</span>;
function WordChip({ w, lang, last, by, nameOf, voted }) {
  const L = wcLast(w, lang); const k = w.lastIndexOf(L);
  return <span className={'wc-word' + (last ? ' last' : '') + (voted ? ' voted' : '')} title={nameOf(by)}>{k >= 0 ? <>{w.slice(0, k)}<b>{L}</b>{w.slice(k + 1)}</> : w}{voted ? <small>🗳️</small> : null}</span>;
}

export function WcGame({ db, room, roomCode, myId, players, isHost, scores, sound, av, nameOf, onBack, srvNow }) {
  const r = fix({ ...room.round }); const res = room.status === 'result' && room.result; const lang = r.lang;
  const tx = f => runTransaction(ref(db, `rooms/${roomCode}`), c => { if (!c?.round || c.round.kind !== 'wc') return; fix(c.round); return f(c); }).then(x => x.committed).catch(() => false);
  const [dict, setDict] = useState(null); const [extra, setExtra] = useState({}); const [txt, setTxt] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  useEffect(() => { let on = true; loadWcDict(lang).then(d => on && setDict(d)); return () => { on = false; }; }, [lang]);
  useEffect(() => onValue(ref(db, `wc/${lang}`), s => setExtra(s.val() || {}), () => {}), [lang]);
  const cur = wcCur(r); const myTurn = !res && r.phase === 'turn' && cur === myId; const pend = r.pend;
  const secs = ms => Math.max(0, Math.ceil(ms / 1000));
  const due = !res && srvNow >= r.until;
  useEffect(() => { if (due) tx(c => wcTick(c, srvNow)); }, [due, r.at, r.phase]);
  useEffect(() => { if (myTurn) sfx(sound, 'yourTurn'); }, [myTurn, r.at]);
  useEffect(() => { setTxt(''); setErr(''); }, [r.chain.length, r.turn]);
  // คำที่ทุกคนโหวตผ่าน → คนส่งคำบันทึกลงคลังกลาง (กฎ DB ห้ามเขียนทับ ถ้ามีอยู่แล้วก็ข้ามไป)
  const saved = useRef({});
  useEffect(() => { (r.added || []).forEach(w => { const e = r.chain.find(c => c.w === w); if (!e || e.by !== myId || saved.current[w] || extra[w]) return; saved.current[w] = 1; set(ref(db, `wc/${lang}/${w}`), { by: String(nameOf(myId)).slice(0, 24), at: serverTimestamp() }).catch(() => {}); }); }, [(r.added || []).length]);

  const myVoter = !res && r.phase === 'vote' && pend && pend.by !== myId && (r.lives[myId] || 0) > 0 && !!room.players?.[myId];
  const starts = wcStarts(r.need, lang); const tail = r.chain.slice(-10);

  async function send() {
    const w = wcClean(txt, lang); const e = wcCheck(r, w); if (e) { setErr(e); sfx(sound, 'wrong'); return; }
    if (!dict) { setErr('กำลังโหลดคลังคำ รอแป๊บ…'); return; }
    const known = dict.has(w) || !!extra[w];
    setBusy(true); sfx(sound, 'confirm'); const ok = await tx(c => wcSubmit(c, myId, w, known, srvNow)); setBusy(false);
    if (!ok) setErr('ส่งไม่ทัน ลองอีกครั้ง');
  }

  if (res) {
    const W = res.winner; const rank = r.rank || [];
    return <div className="uc-game wc-game">
      <Outcome art={W === myId ? 'win' : 'medal'} tone={W === myId ? 'good' : ''} title={W ? (W === myId ? '🏆 คุณชนะ!' : `🏆 ${nameOf(W)} ชนะ!`) : 'จบเกม'}>
        ต่อคำได้ทั้งหมด {r.chain.length} คำ {r.added?.length ? `• เพิ่มคำใหม่เข้าคลัง ${r.added.length} คำ` : ''}
      </Outcome>
      <SecH icon="🏁">อันดับ</SecH>
      <ol className="wc-rank">{rank.map((id, i) => <li key={id}><b>{['🥇', '🥈', '🥉'][i] || i + 1}</b><Avatar id={id} av={av} size={30} /><span>{nameOf(id)}</span><small>{r.cnt[id] || 0} คำ</small></li>)}</ol>
      {r.added?.length > 0 && <><SecH icon="📚">คำใหม่ที่เพิ่มเข้าคลัง</SecH><div className="wc-chain">{r.added.map(w => <span key={w} className="wc-word voted">{w}</span>)}</div></>}
      <SecH icon="🔗">สายคำทั้งหมด</SecH>
      <div className="wc-chain">{r.chain.map((c, i) => <WordChip key={i} {...c} lang={lang} nameOf={nameOf} voted={c.v} />)}</div>
      <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={res.points} myId={myId} av={av} />
      {isHost ? <button className="primary wide" onClick={onBack}><RotateCcw size={17} /> กลับห้องรอแล้วเล่นรอบใหม่</button> : <div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}
    </div>;
  }

  return <div className="uc-game wc-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">{WC_LANGS[lang].e} {WC_LANGS[lang].n} • {r.chain.length} คำ</span></div>
    <div className="wc-need"><small>ต่อด้วย{WC_LANGS[lang].unit}</small><b>{starts[0]}</b>{starts[1] && <em>หรือ {starts[1]}</em>}</div>
    {tail.length > 0 && <div className="wc-chain">{r.chain.length > tail.length && <span className="wc-more">…</span>}{tail.map((c, i) => <WordChip key={r.chain.length - tail.length + i} {...c} lang={lang} nameOf={nameOf} voted={c.v} last={i === tail.length - 1} />)}</div>}

    {r.phase === 'turn' && <Phase art={myTurn ? 'note' : 'think'} tone={myTurn ? 'me' : ''} kicker="✍️ ตาต่อคำ" title={myTurn ? 'ตาคุณ! พิมพ์คำเลย' : `ตาของ ${nameOf(cur)}`} aside={<TimerRing secs={secs(r.until - srvNow)} total={r.tmT / 1000} label="วิ" />}>
      คำต้องขึ้นต้นด้วย “{starts.join(' หรือ ')}” • ห้ามซ้ำ • หมดเวลาเสียหัวใจ 1 ดวง
    </Phase>}
    {r.phase === 'vote' && pend && <Phase art="vote" tone={myVoter && r.votes[myId] == null ? 'me' : ''} kicker="🗳️ คำนี้ไม่มีในคลัง" title={`${pend.by === myId ? 'คุณ' : nameOf(pend.by)} ส่งคำ “${pend.w}”`} aside={<TimerRing secs={secs(r.until - srvNow)} total={WC_VOTE_MS / 1000} label="วิ" />}>
      เพื่อนโหวตว่าเป็นคำจริงไหม • มีคนค้าน 1 คน = ไม่ผ่าน • ยอมรับครบทุกคน = เพิ่มเข้าคลังคำให้ทุกห้อง
      <div className="wc-votes">{voters(room, r).map(id => <span key={id} className={'wc-v ' + (r.votes[id] === true ? 'y' : r.votes[id] === false ? 'n' : '')}><Avatar id={id} av={av} size={24} />{r.votes[id] === true ? '✅' : r.votes[id] === false ? '❌' : '…'}</span>)}</div>
    </Phase>}

    <div className="wc-players">{r.order.map(id => { const L = r.lives[id] || 0; return <div key={id} className={'wc-p' + (id === cur && r.phase !== 'done' ? ' now' : '') + (!L ? ' dead' : '') + (id === myId ? ' mine' : '')}>
      <Avatar id={id} av={av} size={38} /><b>{id === myId ? 'คุณ' : nameOf(id)}</b><Hearts n={L} max={r.maxLives} /><small>{r.cnt[id] || 0} คำ</small></div>; })}</div>

    <ActionSheet open={myTurn} k={'t' + r.at} icon="✍️" title={`ต่อด้วย “${starts.join(' / ')}”`} sub={r.chain.length ? `คำก่อนหน้า: ${r.chain[r.chain.length - 1].w}` : 'คำแรกของรอบ'} secs={secs(r.until - srvNow)} total={r.tmT / 1000}>
      <input className="uc-guess wc-input" autoFocus value={txt} maxLength={24} placeholder={lang === 'en' ? 'type a word…' : 'พิมพ์คำ…'} lang={lang} autoCapitalize="off" autoCorrect="off" spellCheck={false}
        onChange={e => { setTxt(e.target.value); setErr(''); }} onKeyDown={e => { if (e.key === 'Enter' && txt.trim() && !busy) send(); }} />
      {err && <div className="wc-err">⚠️ {err}</div>}
      {!dict && <small className="hint">📚 กำลังโหลดคลังคำ…</small>}
      <button className="primary wide" disabled={!txt.trim() || busy} onClick={send}>📨 ส่งคำ</button>
      <button className="secondary wide" onClick={() => { if (confirm('ยอมแพ้ตานี้? (เสียหัวใจ 1 ดวง)')) tx(c => wcGiveUp(c, myId, srvNow)); }}>🏳️ คิดไม่ออก ยอมแพ้ตานี้</button>
    </ActionSheet>
    <ActionSheet open={myVoter && r.votes[myId] == null} k={'v' + r.at} icon="🗳️" title={`“${pend?.w}” เป็นคำจริงไหม?`} sub={`${nameOf(pend?.by)} ส่งคำนี้ แต่ไม่มีในคลังคำ`} secs={secs(r.until - srvNow)} total={WC_VOTE_MS / 1000}>
      <div className="wc-big">{pend?.w}</div>
      <div className="wc-vbtn"><button className="primary" onClick={() => { sfx(sound, 'vote'); tx(c => wcVote(c, myId, true, srvNow)); }}>✅ ยอมรับ</button>
        <button className="secondary" onClick={() => { sfx(sound, 'vote'); tx(c => wcVote(c, myId, false, srvNow)); }}>❌ ไม่ใช่คำ</button></div>
    </ActionSheet>

    <SecH icon="📜">เกิดอะไรขึ้นบ้าง</SecH>
    <ul className="head-log">{[...r.log].reverse().slice(0, 6).map((e, i) => <li key={i}>{e.text.replace(/\{([^}]+)\}/g, (_, id) => nameOf(id))}</li>)}</ul>
    {isHost && <HostBar>
      {r.phase === 'turn' && cur !== myId && <button className="secondary" onClick={() => { if (confirm(`ข้าม ${nameOf(cur)}? (เสียหัวใจ 1 ดวง)`)) tx(c => wcGiveUp(c, myId, srvNow, true)); }}>⏭️ ข้าม {nameOf(cur)}</button>}
      {r.phase === 'vote' && <button className="secondary" onClick={() => tx(c => wcForce(c, srvNow))}>⏩ สรุปโหวตเลย</button>}
      <button className="secondary" onClick={() => { if (confirm('จบเกมเลย? (จัดอันดับจากคนที่ยังอยู่)')) tx(c => r.phase === 'vote' ? undefined : wcForce(c, srvNow)); }}>🏁 จบเกม</button>
      {r.order.filter(id => !room.players?.[id] && r.lives[id] > 0).map(id => <button key={id} className="secondary" onClick={() => tx(c => kickWc(c, id, srvNow))}>🚪 ตัด {nameOf(id)} ออก</button>)}
    </HostBar>}
  </div>;
}

// ---------- ห้องรอ: ภาษา / เวลา / หัวใจ ----------
export function WcLobby({ db, roomCode, room, isHost, sound }) {
  const st = room.settings?.wc || {}; const lang = st.lang === 'en' ? 'en' : 'th';
  const save = patch => { sfx(sound, 'select'); runTransaction(ref(db, `rooms/${roomCode}/settings/wc`), c => ({ ...(c || {}), ...patch })).catch(() => {}); };
  return <div className="uc-lobby wc-lobby">
    <label>🌐 โหมดภาษา {isHost ? '' : '(หัวหน้าห้องตั้ง)'}</label>
    <div className="wc-langs">{Object.entries(WC_LANGS).map(([k, L]) => <button key={k} type="button" className={'uc-cat' + (lang === k ? ' on' : '')} disabled={!isHost} onClick={() => save({ lang: k })}>{L.e} {L.n}<small>{k === 'th' ? 'ต่อด้วยพยัญชนะตัวท้าย' : 'ต่อด้วยตัวอักษรตัวท้าย'}</small></button>)}</div>
    <label>⏱️ เวลาต่อตา</label>
    <select value={st.secs || 20} disabled={!isHost} onChange={e => save({ secs: +e.target.value })}>{[10, 15, 20, 30, 45].map(x => <option key={x} value={x}>{x} วินาที</option>)}</select>
    <label>❤️ หัวใจต่อคน</label>
    <select value={st.lives || 2} disabled={!isHost} onChange={e => save({ lives: +e.target.value })}>{[1, 2, 3].map(x => <option key={x} value={x}>{x} ดวง</option>)}</select>
    <small className="hint">{lang === 'th' ? 'ตัวอย่าง: แมว → วัด → ดอกไม้ → ยักษ์ (ตัวการันต์ไม่นับ ใช้ ก ต่อ)' : 'e.g. apple → elephant → tiger → rabbit'}</small>
  </div>;
}
