// สุ่มแบบยุติธรรมใช้ร่วมกันทุกเกม — ใช้ crypto.getRandomValues (สุ่มจากระบบปฏิบัติการ) + rejection sampling ไม่ให้เลขบางตัวออกบ่อยกว่า
const MAX = 2 ** 32;
function u32() {
  const c = globalThis.crypto;
  if (c?.getRandomValues) return c.getRandomValues(new Uint32Array(1))[0];
  return Math.floor(Math.random() * MAX);
}
// เลขสุ่ม 0..n-1 โอกาสเท่ากันทุกตัว
export function rint(n) {
  const lim = MAX - (MAX % n);
  let x; do { x = u32(); } while (x >= lim);
  return x % n;
}
export const pick = a => a[rint(a.length)];
// Fisher–Yates: ทุกลำดับมีโอกาสเท่ากัน (ห้ามใช้ sort(()=>Math.random()-.5) เพราะเอนเอียง)
export const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = rint(i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; };

// เลือกตัวร้าย k คน แบบลดโอกาสคนที่เพิ่งเป็นตัวร้าย
// hist = [ตัวร้ายตาที่แล้ว, ตัวร้าย 2 ตาก่อน] → น้ำหนัก: ตาที่แล้ว 1, 2 ตาก่อน 2, คนอื่น 4
// (เช่น 5 คน คนที่เพิ่งเป็นขโมยมีโอกาสเป็นซ้ำ ~6% แทน 20% แต่ยังเป็นได้ ไม่ใช่ศูนย์)
export const badWeight = (id, hist = []) => (hist[0] || []).includes(id) ? 1 : (hist[1] || []).includes(id) ? 2 : 4;
export function pickBad(ids, k, hist = []) {
  const pool = [...ids]; const out = [];
  while (out.length < k && pool.length) {
    const w = pool.map(id => badWeight(id, hist)); let x = rint(w.reduce((a, b) => a + b, 0)); let i = 0;
    while (x >= w[i]) x -= w[i++];
    out.push(pool.splice(i, 1)[0]);
  }
  return out;
}
// อ่าน badHist จากห้อง (RTDB อาจคืน array เป็น object)
export const readHist = h => [0, 1].map(i => Object.values((h || {})[i] || {}));
