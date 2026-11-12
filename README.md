# Spyfall Thai 🇹🇭

เว็บเกม Spyfall ธีมไทยสายฮา สำหรับ 3–12 คน เล่นข้ามเครื่องด้วย Firebase Realtime Database

## สิ่งที่มีในเวอร์ชันนี้
- สร้างห้องและเข้าห้องด้วยรหัส
- รายชื่อผู้เล่นแบบเรียลไทม์
- สุ่มสายลับและสถานที่จากชุดสถานที่
- เปิดดูบทบาทส่วนตัว
- โหมดโหวตและสรุปผล
- เพิ่มชุดสถานที่เองต่อห้อง
- เสียงเอฟเฟกต์สั้น ๆ ด้วย Web Audio
- รองรับหน้าจอมือถือ

## 1. ติดตั้ง
ต้องมี Node.js รุ่น LTS ก่อน จากนั้นแตก ZIP และเปิด terminal ในโฟลเดอร์โปรเจกต์

```bash
npm install
```

## 2. ตั้งค่า Firebase
1. ไปที่ https://console.firebase.google.com/ แล้วสร้างโปรเจกต์
2. ใน Project settings > General > Your apps ให้เพิ่ม Web app แล้วคัดลอก firebaseConfig
3. ไปที่ Build > Realtime Database > Create Database เลือก region ใกล้ไทย เช่น Singapore/Asia Southeast
4. คัดลอก `.env.example` เป็นไฟล์ชื่อ `.env` ที่รากโปรเจกต์ แล้วใส่ค่า `apiKey`, `authDomain`, `databaseURL`, `projectId`, `appId` ให้ตรงกับ Firebase project
5. ใน Realtime Database > Rules ให้ใช้กฎตาม `firebase.rules.json` แล้วกด Publish (หรือสั่ง `firebase deploy --only database`) — กฎนี้ให้เว็บลบห้องที่ไม่มีใครใช้เกิน 24 ชม. ได้

> **คำเตือนด้านความปลอดภัย:** กฎในไฟล์ตัวอย่างเปิดอ่าน/เขียนได้เพื่อให้เดโมทำงานง่าย ทุกคนที่รู้ URL ฐานข้อมูลอาจอ่านหรือแก้ข้อมูลห้องได้ ไม่ควรใช้กับเกมสาธารณะจริงโดยไม่มีระบบยืนยันตัวตนและกฎที่เข้มงวดขึ้น ก่อนเปิดให้คนทั่วไปเล่นควรเพิ่ม Firebase Authentication, ตรวจสอบสิทธิ์ host และย้ายการสุ่มบทบาท/การนับคะแนนไปฝั่ง server (เช่น Cloud Functions) เพื่อไม่ให้ผู้เล่นที่แก้เว็บดูข้อมูลลับได้

## 3. เปิดในเครื่อง
```bash
npm run dev
```
เปิด URL ที่ Vite แสดง เช่น `http://localhost:5173`

## 4. ให้เพื่อนเล่นออนไลน์
วิธีแนะนำสำหรับมือใหม่คือ deploy ด้วย Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```
เลือกโปรเจกต์ Firebase เดียวกับที่สร้างไว้, public directory = `dist`, configure as single-page app = `Yes`, ไม่ต้องเขียนทับ `index.html` หากถาม และสร้างไฟล์ `firebase.json` ตามนี้หากยังไม่มี:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```
จากนั้น build และ deploy:
```bash
npm run build
firebase deploy --only hosting
```
ส่ง URL Hosting ที่ได้ให้เพื่อนทุกคนเข้าเว็บ แล้วใช้รหัสห้องเดียวกัน

## หมายเหตุของ MVP
- ไม่มีระบบล็อกอิน ผู้เล่นใช้ชื่อเล่นและ session ID ในเบราว์เซอร์
- Host ที่ออกจากห้องจะลบห้องทั้งหมด
- เมื่อหมดเวลาถามตอบ ห้องจะเข้าหน้าโหวตอัตโนมัติ (v1.4)
- มีคะแนนสะสมข้ามรอบในห้อง host ล้างคะแนนได้ที่ห้องรอ (v1.4)
- โหวตสรุปผลด้วยเสียงข้างมากแบบง่าย หากคะแนนเสมอจะไม่นับว่าจับสายลับได้
- การกด “ไปหน้าโหวต” เป็นปุ่มเปลี่ยน phase สำหรับผู้เล่นที่กด; ให้ใช้ปุ่ม “เปิดโหวตให้ทุกคน” ของ host เพื่อเปลี่ยนสถานะห้องเป็น voting
- โปรเจกต์นี้เป็นต้นแบบใช้งานได้สำหรับทดสอบกับเพื่อน ควรเสริม security rules / authentication ก่อนเผยแพร่สู่สาธารณะ
