// เพลงประกอบสังเคราะห์สด ๆ ด้วย Web Audio — แต่งใหม่ทั้งหมด ไม่มีไฟล์เพลง ไม่ติดลิขสิทธิ์
// หนึ่งเพลงต่อธีม (หน้ารวม + 8 เกม) วนลูป 8 ห้อง; เปลี่ยนเกมแล้วค่อย ๆ เฟดข้ามเพลง
import { ac } from './sfx.js';

const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

// ---------- กราฟเสียง: เพลง → bus (ความดัง) → compressor → ลำโพง, มี reverb ส่งเข้า bus ----------
let bus = null, revIn = null;
function graph(c) {
  if (bus) return;
  bus = c.createGain(); bus.gain.value = 0;
  const comp = c.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 3; comp.attack.value = 0.01; comp.release.value = 0.25;
  bus.connect(comp); comp.connect(c.destination);
  c.addEventListener('statechange', () => sync()); // ปลดล็อกเสียงแล้ว → เริ่มเพลงทันที
  const len = Math.floor(c.sampleRate * 2.4); const ir = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
  const rev = c.createConvolver(); rev.buffer = ir; revIn = c.createGain(); revIn.gain.value = 0.5; revIn.connect(rev); rev.connect(bus);
}
let NB = null;
const nbuf = c => { if (!NB) { NB = c.createBuffer(1, c.sampleRate * 2, c.sampleRate); const d = NB.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; } return NB; };

// ---------- เครื่องดนตรีพื้นฐาน ----------
function send(T, g, wet) { g.connect(T.out); if (wet) { const w = T.c.createGain(); w.gain.value = wet; g.connect(w); w.connect(T.wet); } }
function voice(T, f, t, dur, { type = 'sine', gain = 0.1, a = 0.01, r = 0.3, lp = 0, q = 0.7, vib = 0, vibRate = 5, wet = 0, detune = 0 } = {}) {
  const c = T.c, o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = f; if (detune) o.detune.value = detune;
  const end = t + Math.max(a, dur);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + a); g.gain.setTargetAtTime(0, end, r / 4);
  if (vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = vibRate; lg.gain.value = vib; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(end + r + 0.1); }
  if (lp) { const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; fl.Q.value = q; o.connect(fl); fl.connect(g); } else o.connect(g);
  send(T, g, wet); o.start(t); o.stop(end + r + 0.1);
}
function hit(T, t, { gain = 0.05, dur = 0.05, type = 'highpass', freq = 7000, q = 0.8, wet = 0, a = 0, sweep = 0 } = {}) {
  const c = T.c, s = c.createBufferSource(); s.buffer = nbuf(c); s.loop = dur > 1.8;
  const fl = c.createBiquadFilter(); fl.type = type; fl.Q.value = q; fl.frequency.setValueAtTime(freq, t); if (sweep) fl.frequency.exponentialRampToValueAtTime(sweep, t + dur);
  const g = c.createGain();
  if (a) { g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(gain, t + a); g.gain.linearRampToValueAtTime(0.0001, t + dur); }
  else { g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); }
  s.connect(fl); fl.connect(g); send(T, g, wet); s.start(t, Math.random() * 1.5); s.stop(t + dur + 0.02);
}
function drum(T, t, f0, f1, decay, gain) { const c = T.c, o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + decay * 0.6); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + decay); o.connect(g); g.connect(T.out); o.start(t); o.stop(t + decay + 0.02); }
const kick = (T, t, g = 0.22) => drum(T, t, 130, 42, 0.32, g);
const tom = (T, t, f = 110, g = 0.18) => drum(T, t, f, f * 0.62, 0.42, g);
const hat = (T, t, g = 0.015) => hit(T, t, { gain: g, dur: 0.035, freq: 8000 });
const shaker = (T, t, g = 0.012) => hit(T, t, { gain: g, dur: 0.06, type: 'bandpass', freq: 6000, q: 1.2 });
const clap = (T, t, g = 0.04) => { hit(T, t, { gain: g, dur: 0.12, type: 'bandpass', freq: 1600, q: 0.9, wet: 0.2 }); hit(T, t + 0.012, { gain: g * 0.7, dur: 0.1, type: 'bandpass', freq: 1900 }); };
const brush = (T, t, g = 0.018) => hit(T, t, { gain: g, dur: 0.12, type: 'bandpass', freq: 4500, q: 0.6 });
const wood = (T, t, g = 0.02, f = 1500) => voice(T, f, t, 0.004, { gain: g, a: 0.001, r: 0.07 });
const bass = (T, t, m, dur, g = 0.12) => { voice(T, mtof(m), t, dur, { type: 'triangle', gain: g, a: 0.008, r: 0.12, lp: 700 }); voice(T, mtof(m), t, dur, { gain: g * 0.6, a: 0.008, r: 0.12 }); };
const pizz = (T, t, m, g = 0.13) => voice(T, mtof(m), t, 0.02, { type: 'triangle', gain: g, a: 0.004, r: 0.35, lp: 900 });
const pluck = (T, t, m, g = 0.035, wet = 0.2) => voice(T, mtof(m), t, 0.02, { type: 'triangle', gain: g, a: 0.004, r: 0.45, lp: 2800, wet });
const bell = (T, t, m, g = 0.035, len = 1.8, wet = 0.45) => { const f = mtof(m); voice(T, f, t, 0.01, { gain: g, a: 0.003, r: len, wet }); voice(T, f * 2.76, t, 0.01, { gain: g * 0.25, a: 0.003, r: len * 0.35, wet }); voice(T, f * 5.4, t, 0.01, { gain: g * 0.07, a: 0.002, r: len * 0.15 }); };
const box = (T, t, m, g = 0.04) => { const f = mtof(m); voice(T, f, t, 0.01, { gain: g, a: 0.002, r: 1.2, wet: 0.4 }); voice(T, f * 3, t, 0.01, { gain: g * 0.3, a: 0.002, r: 0.35, wet: 0.4 }); voice(T, f * 4.2, t, 0.01, { gain: g * 0.08, a: 0.001, r: 0.12 }); };
const ranat = (T, t, m, g = 0.05) => { const f = mtof(m); voice(T, f, t, 0.01, { type: 'triangle', gain: g, a: 0.003, r: 0.45, wet: 0.25 }); voice(T, f * 4, t, 0.01, { gain: g * 0.2, a: 0.002, r: 0.1 }); };
const marimba = (T, t, m, g = 0.04) => { const f = mtof(m); voice(T, f, t, 0.01, { gain: g, a: 0.003, r: 0.35, wet: 0.15 }); voice(T, f * 4, t, 0.01, { gain: g * 0.25, a: 0.002, r: 0.06 }); };
const pad = (T, t, ms, dur, g = 0.015, lp = 900, wet = 0.5) => ms.forEach(m => { const f = mtof(m); [-7, 7].forEach(d => voice(T, f, t, dur, { type: 'sawtooth', gain: g, a: dur * 0.35, r: dur * 0.4, lp, detune: d, wet })); });
const flute = (T, t, m, dur, g = 0.035) => { const f = mtof(m); voice(T, f, t, dur, { gain: g, a: 0.06, r: 0.3, vib: 5, vibRate: 5, wet: 0.35 }); voice(T, f * 2, t, dur, { gain: g * 0.12, a: 0.08, r: 0.2 }); hit(T, t, { gain: 0.005, dur: Math.min(dur, 0.3), type: 'bandpass', freq: f * 2, q: 2 }); };
const whistle = (T, t, m, dur, g = 0.03) => voice(T, mtof(m), t, dur, { gain: g, a: 0.03, r: 0.15, vib: 6, vibRate: 6, wet: 0.3 });
const sax = (T, t, m, dur, g = 0.026) => voice(T, mtof(m), t, dur, { type: 'sawtooth', gain: g, a: 0.035, r: 0.15, lp: 1500, vib: 4, vibRate: 5.5, wet: 0.25 });
const horn = (T, t, ms, dur, g = 0.018) => ms.forEach(m => voice(T, mtof(m), t, dur, { type: 'sawtooth', gain: g, a: dur * 0.3, r: dur * 0.35, lp: 850, wet: 0.45 }));
const ching = (T, t, g = 0.018) => { voice(T, 2350, t, 0.01, { gain: g, a: 0.002, r: 0.8, wet: 0.3 }); voice(T, 3480, t, 0.01, { gain: g * 0.7, a: 0.002, r: 0.5 }); };
const chap = (T, t, g = 0.025) => hit(T, t, { gain: g, dur: 0.05, freq: 5000 });
const gong = (T, t, g = 0.05) => { voice(T, 98, t, 0.01, { gain: g, a: 0.01, r: 4, vib: 1.5, vibRate: 3, wet: 0.5 }); voice(T, 98 * 2.02, t, 0.01, { gain: g * 0.4, a: 0.01, r: 2.5, wet: 0.5 }); voice(T, 98 * 2.76, t, 0.01, { gain: g * 0.25, a: 0.01, r: 1.6 }); };
// เล่นทำนองจากตาราง: mel[ห้อง] = [[ช่อง, โน้ต MIDI, ความยาวเป็นช่อง], ...]
const mel = (table, bar, i, fn) => (table[bar] || []).forEach(([s, m, l]) => { if (s === i) fn(m, l); });

// ---------- เพลงของแต่ละธีม ----------
// play(T, เวลา, ห้องที่, ช่องที่ (โน้ต 1/16), ความยาว 1 ช่องเป็นวินาที) • gain = ชดเชยให้ทุกเพลงดังใกล้กัน (~-24 dB RMS)
export const TRACKS = {
  // 🎲 หน้ารวม: ฟังก์สบาย ๆ เหมือนตั้งวงเล่นบอร์ดเกม
  hub: {
    name: 'ลูกเต๋าเริ่มกลิ้ง', bpm: 104, bars: 8, gain: 0.8,
    play(T, t, bar, i, sd) {
      const ch = bar % 4; const root = [36, 45, 41, 43][ch]; const tri = [[64, 67, 72], [64, 69, 72], [65, 69, 72], [62, 67, 71]][ch];
      if (i === 0 || i === 8 || (i === 10 && bar % 2)) kick(T, t, 0.18);
      if (i === 4 || i === 12) clap(T, t, 0.03);
      if (i % 2 === 0) hat(T, t, i % 4 === 2 ? 0.014 : 0.008);
      if ([0, 3, 6, 8, 11, 14].includes(i)) bass(T, t, root + (i === 6 || i === 14 ? 12 : i === 11 ? 7 : 0), sd * 1.5, 0.1);
      if (i === 2 || i === 6 || i === 10 || i === 14) tri.forEach(m => pluck(T, t, m, 0.018, 0.15));
      mel([[[0, 76, 2], [4, 79, 2], [8, 81, 4], [14, 79, 2]], [[0, 76, 2], [2, 74, 2], [4, 72, 6]], [[0, 77, 2], [4, 76, 2], [8, 74, 2], [12, 72, 4]], [[0, 74, 6], [8, 79, 6]],
        [[0, 79, 2], [2, 81, 2], [4, 84, 4], [10, 81, 2], [12, 79, 4]], [[0, 76, 4], [8, 74, 2], [10, 72, 2], [12, 74, 4]], [[0, 77, 2], [4, 81, 2], [8, 79, 2], [12, 77, 4]], [[0, 76, 4], [4, 74, 4], [8, 72, 8]]], bar, i, m => bell(T, t, m, 0.03, 1.2, 0.35));
    },
  },
  // 🏯 Spyfall Thai: ระนาดเพนทาโทนิก ฉิ่ง-ฉับ กลอง โดรน ฆ้องทุก 8 ห้อง
  spyfall: {
    name: 'ระนาดในเงามืด', bpm: 96, bars: 8, gain: 2.34,
    play(T, t, bar, i, sd) {
      const sc = [60, 62, 64, 67, 69, 72, 74, 76, 79, 81];
      const A = [4, 3, 2, 3, 4, 5, 4, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0, 1, 2, 4, 5, 4, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2];
      const B = [7, 6, 5, 6, 7, 8, 7, 6, 5, 4, 3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0, 1, 2, 0, 0];
      if (bar === 0 && i === 0) gong(T, t, 0.045);
      if (i === 0 || i === 8) ching(T, t, i ? 0.016 : 0.012); if (i === 4 || i === 12) chap(T, t);
      if ([0, 6, 10].includes(i)) tom(T, t, i === 10 ? 130 : 95, 0.14);
      if (i === 0 && bar % 2 === 0) pad(T, t, bar >= 4 ? [41, 48] : [36, 43], sd * 32, 0.011, 700);
      if (i % 2 === 0) { const k = (bar % 4) * 8 + i / 2; const ph = bar < 4 ? A : B; const m = sc[ph[k]]; ranat(T, t, m, 0.045); if (bar >= 4 && i % 4 === 0) ranat(T, t, m - 12, 0.03); }
    },
  },
  // 🤫 SPY: แจ๊สสายลับ เบสเดิน แปรงกลอง ไวบราโฟน แซกเล่นท่อนหลัง (สวิงนิด ๆ)
  spy: {
    name: 'แฟ้มลับเลขที่ 07', bpm: 112, bars: 8, gain: 2.16,
    play(T, t, bar, i, sd) {
      const sw = i % 4 === 2 ? sd * 0.33 : 0; const tt = t + sw;
      const walk = [[45, 45, 48, 50], [51, 52, 50, 48], [45, 47, 48, 52], [53, 52, 51, 50]][bar % 4];
      if (i % 4 === 0) pizz(T, t, walk[i / 4], 0.14);
      if (i === 14 && bar % 2) pizz(T, tt, walk[3] + 2, 0.08);
      if (i % 2 === 0) brush(T, tt, i % 8 === 4 ? 0.026 : 0.012);
      if (i === 4 || i === 12) hit(T, t, { gain: 0.02, dur: 0.18, type: 'bandpass', freq: 2500, q: 0.5 });
      if ((i === 6 || i === 14) && bar % 4 !== 3) [57, 60, 64].forEach(m => voice(T, mtof(m), tt, 0.03, { type: 'square', gain: 0.008, a: 0.003, r: 0.08, lp: 1200 }));
      if (i === 0 && bar % 2 === 0 && bar < 4) [69, 72, 76, 79].forEach((m, k) => voice(T, mtof(m), t + k * sd * 0.5, 0.01, { gain: 0.018, a: 0.003, r: 1.4, vib: 3, vibRate: 6, wet: 0.4 }));
      mel([[], [], [], [], [[0, 76, 3], [4, 77, 2], [6, 76, 2], [8, 72, 6]], [[0, 74, 2], [2, 72, 2], [4, 71, 4], [10, 69, 6]], [[0, 76, 3], [4, 79, 2], [6, 77, 2], [8, 76, 6]], [[0, 72, 2], [4, 71, 2], [8, 69, 8]]], bar, i, (m, l) => sax(T, t + (i % 4 === 2 ? sw : 0), m - 12, sd * l * 0.95));
    },
  },
  // 🙈 คำบนหัว: ป๊อปปาร์ตี้ กลองสี่จังหวะ มาริมบา ผิวปาก
  headword: {
    name: 'ปาร์ตี้กระดาษโน้ต', bpm: 124, bars: 8, gain: 0.82,
    play(T, t, bar, i, sd) {
      const ch = bar % 4; const root = [41, 36, 38, 34][ch]; const arp = [[65, 69, 72, 77], [64, 67, 72, 76], [62, 65, 69, 74], [62, 65, 70, 74]][ch];
      if (i % 4 === 0) kick(T, t, 0.17); if (i === 4 || i === 12) clap(T, t, 0.035);
      if (i % 4 === 2) hat(T, t, 0.02); if (i % 2) shaker(T, t, 0.006);
      if (i % 2 === 0) bass(T, t, root + (i % 4 === 2 ? 12 : 0), sd * 1.2, 0.09);
      if (i % 2 === 0) marimba(T, t, arp[[0, 1, 2, 3, 2, 1, 0, 1][i / 2]], 0.032);
      mel([[], [], [], [], [[0, 77, 2], [2, 79, 2], [4, 81, 4], [8, 84, 4], [12, 81, 4]], [[0, 79, 4], [4, 76, 4], [8, 72, 8]], [[0, 74, 2], [2, 77, 2], [4, 81, 4], [8, 79, 2], [10, 77, 2], [12, 74, 4]], [[0, 77, 4], [4, 76, 4], [8, 77, 8]]], bar, i, (m, l) => whistle(T, t, m, sd * l * 0.9, 0.026));
    },
  },
  // 🧭 ออกสำรวจ: กลองชนเผ่า เชคเกอร์ โดรน ขลุ่ยทำนองผจญภัย แตรตอนต้นท่อน
  explore: {
    name: 'เส้นทางสู่วิหาร', bpm: 92, bars: 8, gain: 0.94,
    play(T, t, bar, i, sd) {
      const prog = [[38, 45], [38, 45], [36, 43], [36, 43], [34, 41], [34, 41], [36, 43], [33, 40]][bar];
      if ([0, 3, 6, 8].includes(i)) tom(T, t, 100, 0.16); if ([10, 12, 14].includes(i)) tom(T, t, 150, 0.09);
      shaker(T, t, i % 2 ? 0.012 : 0.006);
      if (i === 0 && bar % 2 === 0) pad(T, t, [prog[0] + 12, prog[1] + 12], sd * 32, 0.01, 650);
      if (i === 0 || i === 10) bass(T, t, prog[0], sd * 3, 0.09);
      if (i === 0 && bar % 4 === 0) horn(T, t, [prog[0] + 24, prog[1] + 24], sd * 16, 0.012);
      mel([[[0, 62, 4], [4, 69, 4], [8, 67, 2], [10, 69, 2], [12, 72, 4]], [[0, 71, 6], [8, 69, 8]], [[0, 67, 4], [4, 65, 2], [6, 67, 2], [8, 64, 8]], [[0, 69, 12]],
        [[0, 74, 4], [4, 72, 4], [8, 71, 2], [10, 72, 2], [12, 74, 4]], [[0, 76, 6], [8, 74, 8]], [[0, 72, 4], [4, 70, 4], [8, 69, 8]], [[0, 69, 6], [8, 73, 8]]], bar, i, (m, l) => flute(T, t, m, sd * l * 0.92, 0.03));
    },
  },
  // 🐺 แวร์วูฟ: โดรนมืด หัวใจเต้น ลมหวีด ระฆังหลอน ๆ ห่าง ๆ
  werewolf: {
    name: 'คืนพระจันทร์เต็มดวง', bpm: 66, bars: 8, gain: 2.2,
    play(T, t, bar, i, sd) {
      if (i === 0 && bar % 4 === 0) { pad(T, t, bar < 4 ? [38, 45] : [34, 41], sd * 64, 0.016, 420, 0.6); hit(T, t, { gain: 0.018, dur: sd * 60, a: sd * 24, type: 'bandpass', freq: 320, sweep: 1100, q: 3, wet: 0.5 }); }
      if (i === 0 || i === 3) drum(T, t, 70, 40, 0.3, i ? 0.12 : 0.16);
      if (i === 8 && bar % 2) tom(T, t, 70, 0.06);
      mel([[[8, 81]], [[4, 77], [12, 76]], [[8, 74]], [[0, 73]], [[8, 82]], [[6, 81], [14, 79]], [[8, 77]], [[0, 76], [8, 73]]], bar, i, m => bell(T, t, m, 0.028, 2.6, 0.65));
    },
  },
  // 🍰 เค้ก: เพลงกล่อมจังหวะวอลทซ์ 3/4 กล่องดนตรี เดินย่อง ติ๊กต็อก
  cake: {
    name: 'เพลงกล่อมตู้เย็น', bpm: 96, bars: 8, gain: 3, spb: 12,
    play(T, t, bar, i, sd) {
      const root = [43, 40, 36, 38, 43, 40, 45, 38][bar];
      const tri = [[55, 59, 62], [52, 55, 59], [52, 55, 60], [50, 54, 57], [55, 59, 62], [52, 55, 59], [52, 57, 60], [50, 54, 57]][bar];
      if (i === 0) pizz(T, t, root, 0.12);
      if (i === 4 || i === 8) tri.forEach(m => pizz(T, t, m, 0.022));
      if (i === 0 || i === 6) wood(T, t, 0.012, i ? 1300 : 1700);
      if (i === 2 || i === 6 || i === 10) shaker(T, t, 0.005);
      mel([[[0, 74, 4], [4, 71, 2], [6, 72, 2], [8, 74, 4]], [[0, 76, 4], [4, 74, 4], [8, 71, 4]], [[0, 72, 4], [4, 76, 4], [8, 79, 4]], [[0, 78, 8], [8, 76, 4]],
        [[0, 74, 4], [4, 79, 2], [6, 78, 2], [8, 76, 4]], [[0, 74, 4], [4, 71, 4], [8, 67, 4]], [[0, 69, 4], [4, 72, 4], [8, 76, 4]], [[0, 74, 8], [8, 71, 4]]], bar, i, m => box(T, t, m + 12, 0.032));
    },
  },
};

// 💥 ทุเรียนตูม: สามช่าตลาดสด เบสดีด มาริมบาเพนทาโทนิก ผิวปาก เคาะไม้เหมือนชนวนนับถอยหลัง
TRACKS.boom = {
  name: 'สามช่าแผงทุเรียน', bpm: 128, bars: 8, gain: 1.75,
  play(T, t, bar, i, sd) {
    const ch = bar % 4; const root = [43, 48, 45, 50][ch]; const tri = [[67, 71, 74], [67, 72, 76], [64, 69, 72], [66, 69, 74]][ch];
    if (i === 0 || i === 6 || i === 8) kick(T, t, 0.17);
    if (i === 4 || i === 12) clap(T, t, 0.03);
    if (i % 2 === 0) shaker(T, t, i % 4 === 0 ? 0.008 : 0.014);
    if (i % 4 === 2) wood(T, t, 0.016, 1900);
    if ([0, 4, 8, 12].includes(i)) pizz(T, t, root + (i === 4 || i === 12 ? 7 : 0), 0.12);
    if (i === 2 || i === 10) tri.forEach(m => pluck(T, t, m, 0.016, 0.12));
    const P = [67, 69, 71, 74, 76, 79, 81, 83];
    mel([[[0, 5, 2], [2, 4, 2], [4, 3, 4], [10, 4, 2], [12, 5, 4]], [[0, 6, 4], [4, 5, 2], [6, 4, 2], [8, 3, 8]], [[0, 2, 2], [2, 3, 2], [4, 4, 4], [8, 3, 2], [10, 2, 2], [12, 1, 4]], [[0, 2, 12]],
      [[0, 5, 2], [2, 6, 2], [4, 7, 4], [8, 6, 2], [10, 5, 2], [12, 4, 4]], [[0, 5, 6], [8, 3, 8]], [[0, 4, 2], [2, 3, 2], [4, 2, 2], [6, 1, 2], [8, 2, 4], [12, 4, 4]], [[0, 3, 8], [12, 0, 4]]], bar, i, (k, l) => (bar < 4 ? marimba(T, t, P[k], 0.04) : whistle(T, t, P[k] + 12, sd * l * 0.9, 0.022)));
    if (bar === 7 && i >= 12) wood(T, t, 0.02, 2400);
  },
};
// 👻 จับผีปอป: แคนเป่าโดรนต่ำ หัวใจเต้น ฉิ่งห่าง ๆ ปี่โหยหวน เสียงลมกระซิบในดง
TRACKS.curse = {
  name: 'แคนหลอนกลางดง', bpm: 70, bars: 8, gain: 2.6,
  play(T, t, bar, i, sd) {
    if (i === 0 && bar % 4 === 0) { pad(T, t, bar < 4 ? [38, 45, 50] : [36, 43, 51], sd * 64, 0.013, 480, 0.6); hit(T, t, { gain: 0.014, dur: sd * 56, a: sd * 20, type: 'bandpass', freq: 380, sweep: 900, q: 3, wet: 0.5 }); }
    if (i === 0 || i === 3) drum(T, t, 64, 38, 0.3, i ? 0.11 : 0.15);
    // แคน: คอร์ดโดรนลมหายใจเข้า-ออก (ทุกครึ่งห้อง)
    if (i === 0 || i === 8) [50, 57, 62, 69].forEach((m, k) => voice(T, mtof(m), t, sd * 7.6, { type: 'sawtooth', gain: k === 3 ? 0.004 : 0.007, a: sd * 1.5, r: sd * 1.2, lp: 1100, q: 1.5, vib: 2, vibRate: 4.5, wet: 0.35, detune: k * 3 }));
    if (i === 8 && bar % 2 === 0) ching(T, t, 0.014);
    if (i === 12 && bar % 4 === 3) gong(T, t, 0.03);
    mel([[[0, 62, 6], [8, 63, 4], [12, 62, 4]], [[0, 60, 8], [8, 58, 8]], [[0, 62, 4], [4, 65, 4], [8, 63, 6]], [[0, 62, 14]],
      [[0, 69, 6], [8, 70, 4], [12, 69, 4]], [[0, 67, 4], [4, 65, 4], [8, 63, 8]], [[0, 62, 4], [4, 63, 2], [6, 62, 2], [8, 60, 8]], [[0, 62, 12]]], bar, i, (m, l) => voice(T, mtof(m + 12), t, sd * l * 0.95, { type: 'sawtooth', gain: 0.016, a: 0.08, r: 0.4, lp: 1400, q: 2, vib: 7, vibRate: 5.5, wet: 0.45 }));
    if (i % 4 === 2 && bar % 2) bell(T, t, [86, 87, 84, 82][i / 4 | 0], 0.008, 2.2, 0.7);
  },
};

// 🌶️ ตำแหลก!: หมอลำซิ่งรถแห่ — กลองตึ้บ ๆ เบสดีด พิณดีดรัว แคนเป่าคอร์ด ฉิ่งฉับ
TRACKS.tam = {
  name: 'หมอลำครกแตก', bpm: 136, bars: 8, gain: 1.7,
  play(T, t, bar, i, sd) {
    const ch = bar % 4; const root = [45, 45, 43, 40][ch]; const sh = [0, 0, -2, -5][ch];
    if (i % 4 === 0) kick(T, t, 0.17);
    if (i === 4 || i === 12) clap(T, t, 0.028);
    if (i % 4 === 2) ching(T, t, 0.011);
    if (i % 2 === 1) shaker(T, t, 0.008);
    if (i % 4 === 0) pizz(T, t, root, 0.11);
    if (i === 6 || i === 14) pizz(T, t, root + 7, 0.07);
    if (i === 0 || i === 8) [57, 64, 69].forEach((m, k) => voice(T, mtof(m + sh), t, sd * 7.4, { type: 'sawtooth', gain: 0.0045, a: sd * 0.6, r: sd, lp: 1500, q: 1.2, vib: 2, vibRate: 5.5, wet: 0.25, detune: k * 4 }));
    const P = [69, 72, 74, 76, 79, 81, 84, 86];
    mel([[[0, 4, 2], [2, 3, 1], [3, 4, 1], [4, 5, 2], [6, 4, 2], [8, 3, 2], [10, 2, 2], [12, 3, 4]], [[0, 4, 2], [2, 5, 2], [4, 6, 2], [6, 5, 2], [8, 4, 4], [12, 3, 4]],
      [[0, 2, 2], [2, 3, 1], [3, 2, 1], [4, 1, 2], [6, 2, 2], [8, 3, 4], [12, 1, 4]], [[0, 0, 2], [2, 1, 2], [4, 2, 2], [6, 3, 2], [8, 4, 8]],
      [[0, 7, 2], [2, 6, 2], [4, 5, 2], [6, 6, 2], [8, 5, 2], [10, 4, 2], [12, 5, 4]], [[0, 4, 2], [2, 5, 1], [3, 4, 1], [4, 3, 2], [6, 4, 2], [8, 5, 4], [12, 4, 4]],
      [[0, 3, 2], [2, 2, 2], [4, 1, 2], [6, 2, 2], [8, 3, 2], [10, 1, 2], [12, 0, 4]], [[0, 1, 2], [2, 2, 2], [4, 3, 4], [8, 4, 4], [12, 0, 4]]], bar, i, (k, l) => pluck(T, t, P[k] + sh, 0.03, 0.15));
    if (bar === 7 && i >= 12) wood(T, t, 0.02, 2200);
  },
};

// 💼 ปิดดีล!: แจ๊สเลานจ์ห้องประชุม — เบสเดิน คอร์ดอีเลกทริกเปียโน ไวบ์ทำนองช้า ๆ
TRACKS.deal = {
  name: 'แจ๊สเจ้าสัว', bpm: 96, bars: 8, gain: 1.9,
  play(T, t, bar, i, sd) {
    const ch = bar % 4; const W = [[38, 41, 45, 48], [43, 47, 50, 41], [36, 40, 43, 47], [45, 49, 52, 43]][ch];
    const C = [[62, 65, 69, 72], [59, 62, 65, 67], [60, 64, 67, 71], [61, 64, 67, 69]][ch];
    if (i % 4 === 0) pizz(T, t, W[i / 4], 0.12);
    if (i === 0 || i === 8) kick(T, t, 0.09);
    if (i === 4 || i === 12) clap(T, t, 0.012);
    if (i % 4 === 0 || i % 4 === 3) shaker(T, t, i % 4 === 0 ? 0.006 : 0.01);
    if (i === 0 || i === 6) C.forEach((m, k) => voice(T, mtof(m), t, sd * 5, { type: 'sine', gain: 0.011, a: 0.01, r: sd * 3, vib: 3, vibRate: 5, wet: 0.3, detune: k * 2 }));
    mel([[[2, 74, 2], [4, 77, 2], [6, 76, 2], [8, 74, 4]], [[0, 71, 2], [2, 74, 2], [4, 77, 4], [10, 76, 2], [12, 74, 4]], [[0, 76, 6], [8, 72, 2], [10, 74, 2], [12, 76, 4]], [[0, 73, 4], [4, 76, 2], [6, 79, 2], [8, 77, 4], [12, 76, 4]],
      [[2, 81, 2], [4, 79, 2], [6, 77, 2], [8, 76, 4], [12, 74, 4]], [[0, 79, 4], [4, 77, 2], [6, 74, 2], [8, 71, 8]], [[0, 72, 2], [2, 76, 2], [4, 79, 2], [6, 83, 2], [8, 81, 4], [12, 79, 4]], [[0, 76, 8], [8, 73, 4], [12, 74, 4]]], bar, i, m => marimba(T, t, m, 0.032));
  },
};

// ---------- ตัวควบคุม: เลือกเพลง / ความดัง / หยุดตอนสลับไปแท็บอื่น ----------
let want = 'hub', vol = 0, cur = null, timer = null;
const LOOK = 0.15;
function tick() {
  const c = ac(); if (!c || !cur) return;
  const tr = cur.tr, sd = 60 / tr.bpm / 4, spb = tr.spb || 16, total = spb * tr.bars;
  if (cur.next < c.currentTime - 0.5) cur.next = c.currentTime + 0.05; // ตามไม่ทัน (เครื่องค้าง) → ข้ามไปเลย ไม่รัวโน้ต
  while (cur.next < c.currentTime + LOOK) {
    const s = cur.step % total;
    try { tr.play(cur.T, cur.next, Math.floor(s / spb), s % spb, sd); } catch { /* โน้ตเดียวพัง ไม่ให้เพลงหยุด */ }
    cur.step++; cur.next += sd;
  }
}
function fadeOut(x, c) { if (!x) return; x.T.out.gain.setTargetAtTime(0, c.currentTime, 0.35); x.T.wet.gain.setTargetAtTime(0, c.currentTime, 0.35); setTimeout(() => { try { x.T.out.disconnect(); x.T.wet.disconnect(); } catch { /* */ } }, 4000); }
function start(c, id) {
  fadeOut(cur, c);
  const out = c.createGain(); out.gain.setValueAtTime(0.0001, c.currentTime); const tr = TRACKS[id] || TRACKS.hub; out.gain.setTargetAtTime(tr.gain || 1, c.currentTime + 0.05, 0.6); out.connect(bus);
  const wet = c.createGain(); wet.gain.value = tr.gain || 1; wet.connect(revIn);
  cur = { id, tr, T: { c, out, wet }, step: 0, next: c.currentTime + 0.12 };
  if (!timer) timer = setInterval(tick, 30);
}
function stop(c) { fadeOut(cur, c); cur = null; if (timer) { clearInterval(timer); timer = null; } }
function sync() {
  if (typeof window === 'undefined') return;
  if (vol <= 0.001 && !bus) return; // ยังไม่เคยเปิดเพลง ไม่ต้องสร้าง AudioContext
  const c = ac(); if (!c) return; graph(c);
  bus.gain.setTargetAtTime(vol * 0.9, c.currentTime, 0.15);
  const active = vol > 0.001 && !document.hidden && c.state === 'running';
  if (!active) { if (cur) stop(c); return; }
  if (!cur || cur.id !== want) start(c, want);
}
export const setMusic = id => { want = TRACKS[id] ? id : 'hub'; sync(); };
export const setMusicVolume = v => { vol = Math.max(0, Math.min(1, v)); sync(); };
export const trackName = id => (TRACKS[id] || TRACKS.hub).name;
if (typeof window !== 'undefined') {
  // เบราว์เซอร์เล่นเสียงได้หลังแตะจอครั้งแรก → เริ่มเพลงตอนนั้น
  const kick0 = () => setTimeout(sync, 50);
  ['pointerdown', 'touchend', 'click', 'keydown'].forEach(e => window.addEventListener(e, kick0, { passive: true }));
  document.addEventListener('visibilitychange', sync);
}
// สำหรับตรวจสอบ (ทดสอบอัตโนมัติ)
export const musicDebug = () => ({ id: cur?.id || null, step: cur?.step || 0, vol, state: ac()?.state });
if (import.meta.env?.DEV && typeof window !== 'undefined') window.__music = musicDebug;
