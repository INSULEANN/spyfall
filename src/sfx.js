// ซาวด์เอฟเฟกต์สังเคราะห์ด้วย Web Audio (ไม่ใช้ไฟล์เสียง โหลดเร็ว ไม่ติดลิขสิทธิ์)
let ctx = null;
// AudioContext เดียวใช้ร่วมกันทั้งเอฟเฟกต์และเพลงประกอบ (music.js)
export function ac() {
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended' || ctx.state === 'interrupted') ctx.resume(); // iPhone: 'interrupted' หลังสลับแอป/มีสายเข้า
    return ctx;
  } catch { return null; }
}
// เอฟเฟกต์ทุกเสียงผ่าน bus นี้ → ปรับความดังได้จากหลอดเสียง
let sfxBus = null, sfxVol = 0.8;
function out(c) { if (!sfxBus) { sfxBus = c.createGain(); sfxBus.gain.value = sfxVol; sfxBus.connect(c.destination); } return sfxBus; }
export const setSfxVolume = v => { sfxVol = v; if (sfxBus && ctx) sfxBus.gain.setTargetAtTime(v, ctx.currentTime, 0.03); };
// เบราว์เซอร์ยอมให้เล่นเสียงหลังผู้ใช้แตะจอครั้งแรก — ปลดล็อกไว้ก่อน เสียงจากเหตุการณ์ของคนอื่นจะได้ดังด้วย
if (typeof window !== 'undefined') {
  // iPhone/Safari นับว่า "ผู้ใช้อนุญาตเสียง" เฉพาะตอนยกนิ้ว (touchend) หรือ click ไม่ใช่ตอนแตะลง → ฟังทุกแบบไว้
  // ไม่ถอดตัวฟังออก: ถ้าเสียงโดนพักอีก (สลับแอป/ล็อกจอ) แตะครั้งถัดไปจะปลุกกลับมาเอง
  const unlock = () => { ac(); };
  ['pointerdown', 'touchend', 'click', 'keydown'].forEach(e => window.addEventListener(e, unlock, { passive: true }));
}

function tone(f, dur, { type = 'sine', gain = 0.08, at = 0, to = null, vib = 0, vibRate = 6, attack = 0.01, lp = 0 } = {}) {
  const c = ac(); if (!c) return; const t = c.currentTime + at;
  const o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.setValueAtTime(f, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  if (vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = vibRate; lg.gain.value = vib; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dur); }
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  if (lp) { const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; o.connect(fl); fl.connect(g); } else o.connect(g);
  g.connect(out(c)); o.start(t); o.stop(t + dur + 0.02);
}
function noise(dur, { gain = 0.15, at = 0, freq = 1200, to = null, type = 'lowpass', q = 0.8 } = {}) {
  const c = ac(); if (!c) return; const t = c.currentTime + at;
  const len = Math.max(1, Math.floor(c.sampleRate * dur)); const buf = c.createBuffer(1, len, c.sampleRate); const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const s = c.createBufferSource(); s.buffer = buf; const fl = c.createBiquadFilter(); fl.type = type; fl.Q.value = q; fl.frequency.setValueAtTime(freq, t);
  if (to) fl.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = c.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(fl); fl.connect(g); g.connect(out(c)); s.start(t); s.stop(t + dur);
}
const thump = (at = 0, gain = 0.35) => tone(150, 0.35, { at, gain, to: 40, attack: 0.005 });
const arp = (notes, step, opts) => notes.forEach((f, i) => tone(f, opts?.dur || step * 2.2, { ...opts, at: (opts?.at || 0) + i * step }));

export const SFX = {
  // ทั่วไป
  click: () => tone(1200, 0.05, { type: 'square', gain: 0.025 }),
  yourTurn: () => { tone(880, 0.25, { gain: 0.07 }); tone(1320, 0.35, { gain: 0.06, at: 0.12 }); },
  win: () => { arp([523, 659, 784, 1047], 0.12, { type: 'triangle', gain: 0.09 }); tone(1047, 0.9, { type: 'triangle', gain: 0.08, at: 0.5, vib: 6 }); },
  lose: () => { arp([392, 349, 311, 262], 0.22, { type: 'triangle', gain: 0.08, dur: 0.5 }); tone(196, 1.1, { type: 'sawtooth', gain: 0.03, at: 0.9 }); },
  // ออกสำรวจ
  propose: () => { tone(330, 0.3, { type: 'triangle', gain: 0.06 }); tone(494, 0.4, { type: 'triangle', gain: 0.06, at: 0.15 }); },
  approved: () => { arp([392, 523, 659], 0.09, { type: 'triangle', gain: 0.07 }); noise(0.5, { gain: 0.04, freq: 3000, type: 'highpass', at: 0.2 }); },
  rejected: () => { tone(140, 0.18, { type: 'square', gain: 0.05 }); tone(110, 0.3, { type: 'square', gain: 0.05, at: 0.22 }); },
  march: () => [0, 0.28, 0.56].forEach(at => { thump(at, 0.25); noise(0.08, { gain: 0.08, freq: 600, at }); }),
  stageOk: () => { arp([784, 988, 1175, 1568], 0.07, { gain: 0.06 }); arp([1568, 2093], 0.12, { gain: 0.04, at: 0.35 }); },
  sabotage: () => { noise(1.1, { gain: 0.35, freq: 2500, to: 80 }); thump(0, 0.45); thump(0.12, 0.3); },
  tension: () => [0, 0.32, 1.0, 1.32].forEach((at, i) => thump(at, i % 2 ? 0.2 : 0.32)),
  // แวร์วูฟ
  howl: () => { tone(340, 2.2, { type: 'triangle', gain: 0.09, to: 620, vib: 9, vibRate: 5, attack: 0.4 }); tone(345, 2.0, { type: 'sine', gain: 0.05, to: 610, vib: 7, vibRate: 5.5, attack: 0.5, at: 0.05 }); noise(2.2, { gain: 0.03, freq: 400, type: 'lowpass' }); },
  night: () => arp([392, 311, 262, 196], 0.28, { type: 'sine', gain: 0.06, dur: 0.9 }),
  morning: () => { arp([523, 659, 784, 1047, 1319], 0.08, { type: 'triangle', gain: 0.06 }); tone(1568, 0.6, { gain: 0.04, at: 0.45, vib: 10, vibRate: 8 }); },
  death: () => { tone(220, 1.2, { type: 'sawtooth', gain: 0.05, to: 70 }); thump(0, 0.4); noise(0.6, { gain: 0.06, freq: 300 }); },
  safe: () => arp([659, 784, 988], 0.12, { gain: 0.06, dur: 0.6 }),
  vote: () => tone(700, 0.08, { type: 'triangle', gain: 0.05 }),
  execute: () => { [0, 0.12, 0.24, 0.36, 0.48].forEach(at => noise(0.07, { gain: 0.1, freq: 900, at })); thump(0.7, 0.55); noise(0.5, { gain: 0.12, freq: 500, at: 0.7 }); },
  shot: () => { noise(0.25, { gain: 0.45, freq: 4000, to: 300, type: 'lowpass', q: 0.3 }); thump(0, 0.4); noise(1.0, { gain: 0.04, freq: 800, at: 0.2 }); },
  reveal: () => { tone(523, 0.4, { gain: 0.05 }); tone(784, 0.6, { gain: 0.05, at: 0.1, vib: 5 }); },
};
// ---------- เครื่องดนตรีเล็ก ๆ สำหรับธีม ----------
const bell = (f, dur = 1.2, { at = 0, gain = 0.06 } = {}) => { tone(f, dur, { at, gain, attack: 0.004 }); tone(f * 2.76, dur * 0.45, { at, gain: gain * 0.35, attack: 0.004 }); tone(f * 5.4, dur * 0.2, { at, gain: gain * 0.12, attack: 0.004 }); };
const ranat = (f, at = 0, gain = 0.09) => { tone(f, 0.32, { type: 'triangle', at, gain, attack: 0.003 }); tone(f * 4, 0.08, { at, gain: gain * 0.25, attack: 0.002 }); };
const ching = (at = 0, gain = 0.05) => { tone(2350, 0.9, { at, gain, attack: 0.002 }); tone(3480, 0.6, { at, gain: gain * 0.7, attack: 0.002 }); noise(0.12, { at, gain: gain * 1.4, freq: 6000, type: 'highpass' }); };
const gong = (at = 0, gain = 0.12) => { tone(98, 2.8, { at, gain, attack: 0.01, vib: 1.5, vibRate: 3 }); tone(98 * 2.02, 2.0, { at, gain: gain * 0.5 }); tone(98 * 2.76, 1.4, { at, gain: gain * 0.3 }); noise(0.25, { at, gain: gain * 0.6, freq: 300 }); };
const pluck = (f, at = 0, gain = 0.13) => tone(f, 0.2, { type: 'triangle', at, gain, attack: 0.003, lp: 900 });
const hat = (at = 0, gain = 0.05) => noise(0.035, { at, gain, freq: 7000, type: 'highpass' });
const key = (at = 0) => { noise(0.03, { at, gain: 0.12, freq: 3200, type: 'highpass' }); tone(1800, 0.015, { type: 'square', at, gain: 0.02 }); };
const stamp = (at = 0) => { thump(at, 0.5); noise(0.14, { at, gain: 0.22, freq: 700 }); };
const chirp = (at = 0) => { tone(1200, 0.07, { at, gain: 0.05, to: 1900 }); tone(1900, 0.07, { at: at + 0.08, gain: 0.05, to: 1300 }); noise(0.05, { at, gain: 0.03, freq: 2500, type: 'bandpass' }); };
const brass = (f, dur, at = 0, gain = 0.07) => tone(f, dur, { type: 'sawtooth', at, gain, attack: 0.06, lp: 1300, vib: 3, vibRate: 5 });
const pop = (at = 0, g = 0.12) => tone(900, 0.07, { at, gain: g, to: 260, attack: 0.002 });
const boing = (at = 0) => tone(180, 0.45, { at, gain: 0.09, to: 620, vib: 30, vibRate: 14 });
const knock = (at = 0) => { thump(at, 0.35); noise(0.06, { at, gain: 0.12, freq: 500 }); };
const hoot = (at = 0) => { tone(430, 0.32, { at, gain: 0.07, to: 390, attack: 0.05 }); tone(410, 0.5, { at: at + 0.42, gain: 0.07, to: 360, attack: 0.05 }); };
const box = (f, at = 0, gain = 0.06) => { tone(f, 0.9, { at, gain, attack: 0.003 }); tone(f * 3, 0.25, { at, gain: gain * 0.25, attack: 0.002 }); };
const bird = (at = 0) => { tone(2600, 0.06, { at, gain: 0.04, to: 3600 }); tone(3000, 0.08, { at: at + 0.09, gain: 0.035, to: 2400 }); };
const munch = (at = 0) => [0, 0.16, 0.32].forEach(d => { noise(0.09, { at: at + d, gain: 0.2, freq: 900, type: 'bandpass', q: 1.5 }); thump(at + d, 0.12); });
const roll = (at = 0, dur = 0.9) => { for (let t = 0; t < dur; t += 0.045) noise(0.04, { at: at + t, gain: 0.05 + t * 0.06, freq: 1400, type: 'bandpass' }); };
const PENTA = [523, 587, 659, 784, 880, 1047, 1175];
const LULLABY = [1047, 784, 880, 659, 784, 523];

// ---------- เสียงตามธีมของแต่ละเกม (ชื่อไหนธีมไม่มี ใช้เสียงกลางใน SFX) ----------
export const THEMES = {
  // 🏯 ระนาด ฉิ่ง ฆ้อง
  spyfall: {
    start: () => { PENTA.forEach((f, i) => ranat(f, i * 0.07)); gong(0.55); },
    join: () => { ching(0); ching(0.28, 0.035); },
    click: () => ranat(880, 0, 0.05), select: () => ranat(784, 0, 0.06), vote: () => ranat(659),
    confirm: () => { ranat(784); ching(0.1); },
    timeup: () => { gong(0); ching(0.6); ching(0.9); },
    right: () => { [523, 659, 784, 1047, 1175].forEach((f, i) => ranat(f, i * 0.08)); ching(0.45); ching(0.75); },
    wrong: () => { gong(0, 0.14); [784, 659, 587, 523].forEach((f, i) => ranat(f, 0.3 + i * 0.16, 0.06)); },
    turn: () => { ching(0); ching(0.22); },
  },
  // 🤫 เบสดีดย่อง ๆ พิมพ์ดีด ตราประทับ วิทยุสื่อสาร
  spy: {
    start: () => { [110, 0, 131, 147, 156, 147, 131, 104].forEach((f, i) => { if (f) pluck(f, i * 0.15); hat(i * 0.15 + 0.075); }); stamp(1.25); },
    join: () => chirp(0), turn: () => { chirp(0); chirp(0.2); },
    click: () => key(0), select: () => key(0), vote: () => { key(0); key(0.07); },
    confirm: () => stamp(0),
    timeup: () => [0, 1, 2, 3, 4, 5].forEach(i => tone(i % 2 ? 660 : 880, 0.11, { type: 'square', at: i * 0.13, gain: 0.035 })),
    right: () => { stamp(0); [784, 988, 1175].forEach(f => tone(f, 0.9, { at: 0.18, gain: 0.04 })); },
    wrong: () => { [392, 370, 349].forEach((f, i) => brass(f, 0.32, i * 0.34, 0.08)); tone(330, 1.0, { type: 'sawtooth', at: 1.02, gain: 0.08, lp: 1100, vib: 10, vibRate: 7, attack: 0.05 }); },
  },
  // 🙈 ปาร์ตี้: ป๊อป โบอิ้ง ติ๊งต่อง บัซเซอร์
  headword: {
    start: () => { pop(0); pop(0.1); pop(0.2); arp([523, 659, 784, 1047], 0.08, { type: 'triangle', gain: 0.08, at: 0.32 }); },
    join: () => { pop(0); tone(700, 0.12, { at: 0.08, gain: 0.06, to: 1200 }); },
    click: () => pop(0, 0.08), select: () => pop(0, 0.1), vote: () => pop(0),
    confirm: () => { pop(0); pop(0.09, 0.1); },
    timeup: () => tone(620, 0.6, { gain: 0.08, to: 160, vib: 25, vibRate: 12 }),
    turn: () => { boing(0); bell(1319, 0.8, { at: 0.35, gain: 0.05 }); },
    right: () => { bell(1319, 0.9); bell(1760, 1.1, { at: 0.16 }); arp([2093, 2637, 3136], 0.05, { gain: 0.025, at: 0.35 }); },
    wrong: () => { tone(118, 0.55, { type: 'square', gain: 0.04 }); tone(125, 0.55, { type: 'square', gain: 0.04 }); },
  },
  // 🧭 แตรเดินทาง กลอง เข็มทิศ
  explore: {
    start: () => { brass(392, 0.4); brass(587, 0.8, 0.42); [0.9, 1.15, 1.4].forEach(at => thump(at, 0.28)); },
    join: () => bell(1568, 0.9, { gain: 0.05 }),
    click: () => tone(520, 0.05, { type: 'triangle', gain: 0.05 }), select: () => tone(620, 0.05, { type: 'triangle', gain: 0.05 }),
    confirm: () => { thump(0, 0.3); bell(1568, 0.6, { at: 0.05, gain: 0.04 }); },
    timeup: () => brass(196, 1.2),
    yourTurn: () => { brass(523, 0.25); brass(659, 0.45, 0.22); },
    right: () => [392, 523, 659, 784].forEach((f, i) => brass(f, i === 3 ? 0.9 : 0.22, i * 0.2)),
    wrong: () => [392, 330, 262].forEach((f, i) => brass(f, i === 2 ? 0.9 : 0.3, i * 0.3)),
  },
  // 🐺 นกฮูก เคาะประตู ระฆังโบสถ์
  werewolf: {
    start: () => SFX.howl(),
    join: () => hoot(0),
    click: () => knock(0), select: () => knock(0),
    confirm: () => { knock(0); knock(0.2); },
    timeup: () => [0, 0.9, 1.8].forEach(at => bell(220, 2.2, { at, gain: 0.08 })),
    right: () => SFX.morning(), wrong: () => SFX.death(),
  },
  // 🍰 กล่องดนตรี นาฬิกาปลุก งับ ๆ นกร้องตอนเช้า
  cake: {
    start: () => LULLABY.forEach((f, i) => box(f, i * 0.26)),
    night: () => LULLABY.forEach((f, i) => box(f, i * 0.3, 0.05)),
    join: () => { box(1319); box(1568, 0.15); },
    click: () => pop(0, 0.06), select: () => pop(0, 0.08), vote: () => pop(0, 0.1),
    confirm: () => { box(1047); box(1319, 0.12); },
    yourTurn: () => { for (let i = 0; i < 14; i++) bell(i % 2 ? 1760 : 2093, 0.12, { at: i * 0.045 + (i > 6 ? 0.25 : 0), gain: 0.035 }); },
    sabotage: () => { munch(0); box(523, 0.6); box(659, 0.75); },
    morning: () => { [1047, 1319, 1568, 2093].forEach((f, i) => box(f, i * 0.12)); bird(0.6); bird(0.95); bird(1.4); },
    execute: () => { roll(0, 1.0); noise(0.6, { at: 1.05, gain: 0.08, freq: 5000, type: 'highpass' }); thump(1.05, 0.4); },
    timeup: () => { for (let i = 0; i < 10; i++) bell(i % 2 ? 1760 : 2093, 0.12, { at: i * 0.05, gain: 0.035 }); },
    right: () => [1319, 1568, 2093].forEach((f, i) => box(f, i * 0.1)),
    wrong: () => [784, 659, 523].forEach((f, i) => box(f, i * 0.2, 0.05)),
    reveal: () => { box(1568); box(2093, 0.15); },
  },
  // 💥 ทุเรียนตูม: ป๊อป ๆ ชนวนฟู่ ระฆังรถเข็นผลไม้
  boom: {
    start: () => { noise(0.9, { gain: 0.06, freq: 5000, type: 'highpass' }); thump(0.9, 0.5); arp([523, 659, 784, 1047], 0.07, { type: 'triangle', gain: 0.07, at: 1.0 }); },
    join: () => { pop(0); pop(0.12, 0.1); },
    click: () => pop(0, 0.07), select: () => pop(0, 0.1),
    confirm: () => { pop(0); bell(1319, 0.5, { at: 0.06, gain: 0.04 }); },
    yourTurn: () => { bell(1568, 0.5, { gain: 0.06 }); bell(1568, 0.6, { at: 0.18, gain: 0.06 }); },
    win: () => { arp([523, 659, 784, 1047, 1319], 0.09, { type: 'triangle', gain: 0.08 }); [0.5, 0.62, 0.74].forEach(at => pop(at, 0.1)); },
  },
  // 👻 จับผีปอป: ฆ้องต่ำ กระดิ่งลม เคาะไม้ เสียงกระซิบ
  // 💼 ปิดดีล!: กระดิ่งเคาน์เตอร์ เต๋ากลิ้ง เสียงเงินเข้า
  deal: {
    start: () => { arp([523, 659, 784, 1047], 0.08, { type: 'triangle', gain: 0.07 }); bell(2093, 0.8, { at: 0.35, gain: 0.04 }); },
    join: () => { bell(1319, 0.5, { gain: 0.04 }); bell(1760, 0.6, { at: 0.12, gain: 0.04 }); },
    click: () => pop(0, 0.07), select: () => pop(0, 0.1),
    confirm: () => { tone(880, 0.08, { type: 'triangle', gain: 0.06 }); tone(1320, 0.14, { type: 'triangle', gain: 0.06, at: 0.07 }); },
    yourTurn: () => { bell(1568, 0.5, { gain: 0.06 }); bell(2093, 0.6, { at: 0.16, gain: 0.05 }); },
    roll: () => [0, 0.08, 0.17, 0.27, 0.4].forEach((at, i) => noise(0.05, { at, gain: 0.1 - i * 0.012, freq: 2600, type: 'bandpass', q: 2 })),
    cash: () => { noise(0.09, { gain: 0.09, freq: 3200, type: 'bandpass', q: 2 }); bell(2637, 0.9, { at: 0.08, gain: 0.06 }); bell(3136, 1.0, { at: 0.17, gain: 0.05 }); },
    win: () => { arp([523, 659, 784, 1047, 1319], 0.09, { type: 'triangle', gain: 0.08 }); [0.5, 0.64].forEach(at => bell(2637, 0.8, { at, gain: 0.05 })); },
  },
  // 🌶️ ตำแหลก!: ครกตำป๊อก ๆ กระดิ่งรถเข็น ส้มตำมาแล้ว
  tam: {
    start: () => { knock(0); knock(0.16); knock(0.32); arp([659, 784, 988, 1319], 0.07, { type: 'triangle', gain: 0.07, at: 0.5 }); },
    join: () => { knock(0); knock(0.13); },
    click: () => pop(0, 0.07), select: () => pop(0, 0.1),
    confirm: () => { knock(0); bell(1568, 0.5, { at: 0.05, gain: 0.04 }); },
    yourTurn: () => { knock(0); bell(1319, 0.5, { at: 0.08, gain: 0.06 }); bell(1760, 0.6, { at: 0.24, gain: 0.05 }); },
    win: () => { [0, 0.14, 0.28].forEach(at => knock(at)); arp([659, 784, 988, 1319, 1568], 0.08, { type: 'triangle', gain: 0.08, at: 0.4 }); },
  },
  curse: {
    start: () => { gong(0, 0.1); bell(1175, 2.2, { at: 0.5, gain: 0.04 }); bell(1109, 2.2, { at: 0.9, gain: 0.035 }); },
    join: () => [1568, 1760, 2093].forEach((f, i) => bell(f, 1.2, { at: i * 0.11, gain: 0.03 })),
    click: () => tone(320, 0.06, { type: 'triangle', gain: 0.06, attack: 0.003 }), select: () => tone(420, 0.07, { type: 'triangle', gain: 0.06, attack: 0.003 }),
    vote: () => { knock(0); noise(0.35, { at: 0.05, gain: 0.05, freq: 2600, type: 'bandpass', q: 3 }); },
    confirm: () => { bell(988, 1.2, { gain: 0.05 }); },
    yourTurn: () => { bell(1319, 1.0, { gain: 0.05 }); bell(1760, 1.2, { at: 0.2, gain: 0.04 }); },
    night: () => { gong(0, 0.1); SFX.night(); noise(2.0, { at: 0.2, gain: 0.03, freq: 500, to: 1400, type: 'bandpass', q: 2 }); },
    morning: () => { tone(620, 0.25, { type: 'sawtooth', gain: 0.03, to: 900, lp: 2200 }); tone(900, 0.7, { type: 'sawtooth', gain: 0.035, to: 680, lp: 2400, vib: 18, vibRate: 9, at: 0.28 }); SFX.morning(); },
    reveal: () => { noise(0.5, { gain: 0.06, freq: 800, to: 4000, type: 'bandpass', q: 1.5 }); bell(784, 1.6, { at: 0.35, gain: 0.06 }); },
    tension: () => SFX.tension(),
    death: () => { SFX.death(); bell(110, 3, { at: 0.3, gain: 0.07 }); },
  },
};
// เสียงกลางที่หน้าหลักและเกมสปายใช้ (ถ้าธีมไม่ได้กำหนดไว้)
Object.assign(SFX, {
  join: () => { tone(660, 0.15, { gain: 0.06 }); tone(990, 0.25, { gain: 0.06, at: 0.1 }); },
  start: () => arp([523, 659, 784, 1047], 0.09, { type: 'triangle', gain: 0.07 }),
  select: () => tone(800, 0.05, { type: 'triangle', gain: 0.04 }),
  confirm: () => { tone(760, 0.1, { gain: 0.06 }); tone(1140, 0.16, { gain: 0.06, at: 0.08 }); },
  timeup: () => [0, 0.18, 0.36].forEach((at, i) => tone(660 - i * 120, 0.16, { at, gain: 0.07 })),
  right: () => arp([784, 988, 1319], 0.08, { gain: 0.07 }),
  wrong: () => tone(200, 0.4, { type: 'triangle', gain: 0.08, to: 140 }),
  turn: () => SFX.yourTurn(),
  // เกมไพ่
  card: () => { noise(0.09, { gain: 0.09, freq: 3200, type: 'highpass' }); tone(520, 0.06, { type: 'triangle', gain: 0.05, at: 0.06 }); },
  draw: () => noise(0.22, { gain: 0.1, freq: 1200, to: 5000, type: 'bandpass', q: 1.2 }),
  nope: () => { tone(330, 0.12, { type: 'square', gain: 0.05 }); tone(247, 0.24, { type: 'square', gain: 0.05, at: 0.13 }); },
  boom: () => { noise(1.6, { gain: 0.5, freq: 3500, to: 50, q: 0.4 }); thump(0, 0.6); thump(0.1, 0.45); tone(70, 1.4, { type: 'sawtooth', gain: 0.07, to: 30, lp: 300 }); },
  defuse: () => { noise(0.4, { gain: 0.08, freq: 1500, to: 300 }); tone(1400, 0.35, { gain: 0.06, to: 500 }); arp([659, 784, 1047], 0.1, { type: 'triangle', gain: 0.07, at: 0.4 }); },
});

let theme = 'hub';
export const setSfxTheme = t => { theme = t || 'hub'; };
// เรียกแบบปลอดภัย: ปิดเสียงอยู่ = ไม่เล่น • เลือกเสียงตามธีมเกมที่เปิดอยู่ก่อน
export const play = (on, name) => { if (!on) return; const f = THEMES[theme]?.[name] || SFX[name]; if (f) try { f(); } catch { /* ignore */ } };
