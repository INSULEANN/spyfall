// ซาวด์เอฟเฟกต์สังเคราะห์ด้วย Web Audio (ไม่ใช้ไฟล์เสียง โหลดเร็ว ไม่ติดลิขสิทธิ์)
let ctx = null;
function ac() {
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch { return null; }
}
// เบราว์เซอร์ยอมให้เล่นเสียงหลังผู้ใช้แตะจอครั้งแรก — ปลดล็อกไว้ก่อน เสียงจากเหตุการณ์ของคนอื่นจะได้ดังด้วย
if (typeof window !== 'undefined') {
  const unlock = () => { const c = ac(); if (c && c.state === 'running') { window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', unlock); } };
  window.addEventListener('pointerdown', unlock); window.addEventListener('keydown', unlock);
}

function tone(f, dur, { type = 'sine', gain = 0.08, at = 0, to = null, vib = 0, vibRate = 6, attack = 0.01 } = {}) {
  const c = ac(); if (!c) return; const t = c.currentTime + at;
  const o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.setValueAtTime(f, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  if (vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = vibRate; lg.gain.value = vib; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dur); }
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
}
function noise(dur, { gain = 0.15, at = 0, freq = 1200, to = null, type = 'lowpass', q = 0.8 } = {}) {
  const c = ac(); if (!c) return; const t = c.currentTime + at;
  const len = Math.max(1, Math.floor(c.sampleRate * dur)); const buf = c.createBuffer(1, len, c.sampleRate); const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const s = c.createBufferSource(); s.buffer = buf; const fl = c.createBiquadFilter(); fl.type = type; fl.Q.value = q; fl.frequency.setValueAtTime(freq, t);
  if (to) fl.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = c.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(fl); fl.connect(g); g.connect(c.destination); s.start(t); s.stop(t + dur);
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
// เรียกแบบปลอดภัย: ปิดเสียงอยู่ = ไม่เล่น
export const play = (on, name) => { if (on && SFX[name]) try { SFX[name](); } catch { /* ignore */ } };
