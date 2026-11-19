// เทสสุ่มทุกเกม: สร้างรอบ แล้วปล่อยให้หมดเวลา/บังคับข้ามตาไปเรื่อย ๆ ดูว่าเกมจบได้ ไม่พัง ไม่ค้าง
// ข้อมูลผ่าน "จำลอง Firebase" ทุกก้าว (ค่าว่าง/อาร์เรย์ว่าง/null หายไป) เหมือนของจริง
// รัน: npx esbuild scripts/fuzzall.mjs --bundle --platform=node --format=esm --alias:firebase/database=./scripts/fbstub.js --loader:.css=empty --outfile=scripts/.fuzz.out.mjs && node scripts/.fuzz.out.mjs
import * as ani from '../src/animal.jsx';
import * as dig from '../src/dig.jsx';
import * as tam from '../src/tam.jsx';
import * as boom from '../src/boom.jsx';
import * as curse from '../src/curse.jsx';
import * as deal from '../src/deal.jsx';
import * as cp from '../src/checkpoint.jsx';
import * as clue from '../src/clue.jsx';
import * as uc from '../src/undercover.jsx';
import * as ins from '../src/insider.jsx';
import * as sn from '../src/snake.jsx';
import * as pic from '../src/pics.jsx';
import * as yd from '../src/yadong.jsx';
import * as gb from '../src/gold.jsx';

const fb = v => { // จำลองการเก็บใน Firebase
  if (v === null || v === undefined) return undefined;
  if (Array.isArray(v)) { const a = v.map(fb); if (a.every(x => x === undefined)) return undefined; return a.map(x => x === undefined ? null : x); }
  if (typeof v === 'object') { const o = {}; for (const [k, x] of Object.entries(v)) { const y = fb(x); if (y !== undefined) o[k] = y; } return Object.keys(o).length ? o : undefined; }
  if (typeof v === 'number' && !Number.isFinite(v)) return undefined;
  return v;
};
const W = (prep, f) => (c, n) => { prep(c); return f(c, n); };
const rnd = a => a[Math.floor(Math.random() * a.length)], ri = n => Math.floor(Math.random() * n);
// บอทสุ่มกด (เกมที่ต้องมีคนเล่นถึงจะจบ) — คืนรายการฟังก์ชัน (c, now) => cur|undefined
const UC_ACTS = ids => [(c, n) => (uc.ucNorm(c.round), uc.ucDoneSpeaking(c, rnd(ids), n, true)), (c, n) => (uc.ucNorm(c.round), uc.ucVote(c, rnd(ids), rnd(ids), n))];
const CLUE_ACTS = ids => [(c, n) => clue.clueApply(c, x => clue.giveClue(x, rnd(ids), 'ทดสอบ', 1 + ri(3), n)), (c, n) => clue.clueApply(c, x => clue.guessCard(x, rnd(ids), ri(25), n)), (c, n) => clue.clueApply(c, x => clue.endTurn(x, rnd(ids), n))];
const CPREP = c => { const R = c.round; R.hands = R.hands || {}; R.alive = R.alive || {}; R.sus = R.sus || {}; R.fate = R.fate || {}; };
const CURSE_ACTS = ids => [(c, n) => (CPREP(c), curse.drawTwo(c, rnd(ids), n)), (c, n) => { CPREP(c); const me = rnd(ids); const h = c.round.hands[me] || []; return h.length ? curse.playCurse(c, me, rnd(h), rnd(ids), rnd(ids), n) : undefined; }, (c, n) => (CPREP(c), curse.revealFate(c, rnd(ids), ri(5))), (c, n) => (CPREP(c), curse.endCurseTurn(c, rnd(ids))), (c, n) => (CPREP(c), curse.placeCat(c, rnd(ids), rnd(ids), n)), (c, n) => (CPREP(c), curse.nightAct(c, rnd(ids), rnd(['kill', 'save', 'peek', 'vote']), rnd(ids), n))];
const G = [
  ['สัตว์หน้านิ่ง', ani.makeAniRound, ani.aniTick, ani.aniForce, 3, 8],
  ['ขุดสมบัติ', dig.makeDigRound, dig.digTick, (c, n) => dig.digBot(c, dig.current(c.round), n), 3, 10],
  ['สี่สีป่วน', tam.makeTamRound, tam.tamTick, tam.forceMove, 2, 10],
  ['กล่องแมวโมโห', boom.makeBoomRound, boom.boomTick, boom.forceDraw, 2, 10],
  ['ผีปอป', curse.makeCurseRound, W(c => { const R = c.round; R.hands = R.hands || {}; R.alive = R.alive || {}; R.sus = R.sus || {}; R.fate = R.fate || {}; }, curse.curseTick), W(c => { const R = c.round; R.hands = R.hands || {}; R.alive = R.alive || {}; R.sus = R.sus || {}; R.fate = R.fate || {}; }, c => curse.skipCurseTurn(c)), 3, 10, CURSE_ACTS],
  ['ปิดดีล', deal.makeDealRound, deal.dealTick, deal.forceDeal, 3, 6],
  ['ด่านตรวจ', cp.makeCpRound, (c, n) => cp.cpApply(c, x => cp.cpTick(x, n)), (c, n) => cp.cpApply(c, x => cp.forceCp(x, n)), 3, 8],
  ['ข้อมูลลับ', clue.makeClueRound, (c, n) => clue.clueApply(c, x => clue.clueTick(x, n)), (c, n) => clue.clueApply(c, x => clue.forceClue(x, n)), 4, 10, CLUE_ACTS],
  ['SPY', uc.makeUcRound, W(c => uc.ucNorm(c.round), uc.ucTick), W(c => uc.ucNorm(c.round), uc.ucForce), 3, 10, UC_ACTS],
  ['Insider', ins.makeInsRound, ins.insTick, ins.insForce, 4, 8],
  ['งูพิษ', sn.makeSnakeRound, sn.snTick, sn.snSkip, 4, 10],
  ['ภาพ', (ids, s, n, t) => pic.makePicRound(ids, n, t), W(c => pic.picFix(c.round), pic.picTick), W(c => pic.picFix(c.round), pic.picForce), 3, 8],
  ['ยาดอง', yd.makeYdRound, yd.ydTick, yd.ydForce, 2, 8],
  ['ทองหรือตูม', gb.makeGbRound, gb.gbTick, gb.gbForce, 3, 8],
];
const ENDK = ['result', 'res', 'winner', 'over', 'done', 'end', 'ended', 'finished'];
const ended = r => !r || ENDK.some(k => r[k]) || ['end', 'result', 'over', 'done', 'finished'].includes(r.phase) || ['end', 'result', 'over', 'done'].includes(r.status);
const GAMES = process.argv[2] ? G.filter(g => g[0].includes(process.argv[2])) : G;
let bad = 0;
for (const [name, make, tick, force, mn, mx, acts] of GAMES) {
  const stats = { ok: 0, stuck: 0, crash: 0, noend: 0 }; const errs = new Map();
  for (let t = 0; t < 300; t++) {
    const n = mn + (t % (mx - mn + 1)); const ids = Array.from({ length: n }, (_, i) => 'p' + i);
    let now = 1_700_000_000_000 + t * 1e7;
    let cur;
    try { cur = fb({ status: 'playing', players: Object.fromEntries(ids.map(id => [id, { id, name: id, online: true }])), round: make(ids, {}, 1, now, []) }); }
    catch (e) { stats.crash++; errs.set('make: ' + e.message, (errs.get('make: ' + e.message) || 0) + 1); continue; }
    let same = 0, steps = 0, fin = false;
    for (; steps < 4000; steps++) {
      if (ended(cur.round) || cur.status !== 'playing') { fin = true; break; }
      const before = JSON.stringify(cur);
      now += 30_000 + (steps % 7) * 13_000;
      try {
        let c, o;
        if (acts) { const A = acts(ids); for (let k = 0; k < 40 && !o; k++) { c = JSON.parse(before); o = rnd(A)(c, now); if (o && JSON.stringify(fb(o)) === before) o = undefined; } }
        if (!o) { c = JSON.parse(before); o = tick(c, now); }
        if (!o || JSON.stringify(fb(o)) === before) { c = JSON.parse(before); o = force(c, now); }
        if (o) cur = fb(o);
      } catch (e) { const k = String(e.message).slice(0, 120); errs.set(k, (errs.get(k) || 0) + 1); stats.crash++; break; }
      if (JSON.stringify(cur) === before) { if (++same > 40) break; } else same = 0;
    }
    if (!fin && !errs.size && t < 2) console.log('     ตัวอย่างที่ไม่จบ:', name, 'phase=', cur.round?.phase, 'keys=', Object.keys(cur.round || {}).join(','));
    if (fin) stats.ok++; else if (same > 40) stats.stuck++; else if (!stats.crash) stats.noend++;
  }
  const flag = stats.crash || stats.stuck || stats.noend; if (flag) bad++;
  console.log(`${flag ? '❌' : '✅'} ${name}: จบ ${stats.ok}/300 ค้าง ${stats.stuck} พัง ${stats.crash} ไม่จบใน 4000 ก้าว ${stats.noend}`);
  for (const [k, c] of errs) console.log('    ', c + '×', k);
}
console.log(bad ? `\nมีปัญหา ${bad} เกม` : '\nผ่านทุกเกม');
