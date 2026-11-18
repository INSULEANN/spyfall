// ตรวจคลังคำถาม: ทุกหมวด 100 ข้อ, 4 ตัวเลือกไม่ซ้ำ, ไม่มีคำถามซ้ำ
import { pathToFileURL } from 'url';
const cats = process.argv.slice(2).length ? process.argv.slice(2) : ['foot','anime','movie','game','thai','food','sci','world'];
let bad = 0; const allQ = new Map();
for (const c of cats) {
  const qs = (await import(pathToFileURL(`src/quiz/${c}.js`).href)).default; const seen = new Set();
  if (qs.length !== 100) { console.log(`${c}: ${qs.length} ข้อ (ต้อง 100)`); bad++; }
  qs.forEach((q, i) => {
    const err = m => { console.log(`${c}#${i}: ${m} — ${q[0]}`); bad++; };
    if (!Array.isArray(q) || q.length < 5 || q.length > 6) err('รูปแบบผิด');
    if (q.slice(0, 5).some(s => typeof s !== 'string' || !s.trim())) err('ช่องว่าง');
    if (new Set(q.slice(1, 5).map(s => s.trim())).size !== 4) err('ตัวเลือกซ้ำ');
    const k = q[0].replace(/\s+/g, ''); if (seen.has(k)) err('คำถามซ้ำ'); seen.add(k);
    if (allQ.has(k)) err('ซ้ำกับหมวด ' + allQ.get(k)); allQ.set(k, c);
  });
  console.log(`${c}: ${qs.length} ข้อ`);
}
console.log(bad ? `❌ ${bad} ปัญหา` : '✅ ผ่าน'); process.exit(bad ? 1 : 0);
