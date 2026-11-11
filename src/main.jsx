import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, onValue, remove, runTransaction } from 'firebase/database';
import { ArrowLeft, ChevronDown, Copy, Users, Plus, DoorOpen, MapPin, Clock3, Volume2, VolumeX, RotateCcw, Vote, Eye, EyeOff, Laugh, Sparkles, LogOut } from 'lucide-react';
import './style.css';
import { ROLES, GENERIC_ROLES } from './roles.js';
import { SPY_PACKS } from './spyWords.js';
import { HEAD_PACKS } from './headWords.js';
import VoicePanel from './voice.jsx';
import { ExploreGame, makeExploreRound, teamSizes, traitorCount, needFails, EXPLORE_MIN, EXPLORE_SCORE, MAX_REJECT } from './explore.jsx';
import { WolfGame, makeWolfRound, wolfCount, WOLF_MIN, WOLF_SCORE } from './werewolf.jsx';

// เลขเวอร์ชันที่โชว์บนหน้าเว็บ — เปลี่ยนทุกครั้งที่อัปเดต (1.0 → 1.1 → 1.2 …)
const APP_VERSION = '1.12';

// ค่าเริ่มต้นของโปรเจกต์ spyfall-3a10a (ค่า config ของ Firebase Web เป็นข้อมูลสาธารณะ ใส่ในโค้ดได้)
// ถ้ามีไฟล์ .env ค่าใน .env จะถูกใช้แทน
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBvQMP2CnzPIuHwT0n4eOiC_0mPENkBCL0',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'spyfall-3a10a.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://spyfall-3a10a-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'spyfall-3a10a',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:536782268757:web:12f5b56610b2c6b9bde7dc'
};
const configured = Object.values(firebaseConfig).every(v => v && !String(v).includes('ใส่ค่า') && !String(v).includes('your-project'));
let db;
if (configured) { try { db = getDatabase(initializeApp(firebaseConfig)); } catch (e) { console.error(e); } }

const DEFAULT_PACKS = [
  { name: "ของกินไทย", places: ["ร้านหมูกระทะ", "ร้านส้มตำ", "ตลาดนัดจตุจักร", "ร้านชานมไข่มุก", "ร้านข้าวมันไก่", "ร้านก๋วยเตี๋ยวเรือ", "บุฟเฟต์ทะเล", "ร้านสะดวกซื้อ 24 ชั่วโมง", "คาเฟ่แมว", "ร้านลูกชิ้นทอด", "ร้านข้าวต้มโต้รุ่ง", "ร้านหมูจุ่ม", "ร้านชาบู", "ร้านปิ้งย่างเกาหลี", "ร้านซูชิสายพาน", "ร้านข้าวขาหมู", "ร้านผัดไทย", "ร้านกะเพราไข่ดาว", "ร้านอาหารตามสั่ง", "ร้านโจ๊กตอนเช้า", "ร้านปาท่องโก๋น้ำเต้าหู้", "ร้านไก่ทอดหาดใหญ่", "ร้านขนมจีน", "ร้านเย็นตาโฟ", "ร้านบะหมี่เกี๊ยว", "ร้านข้าวเหนียวมะม่วง", "ร้านโรตีสายไหม", "ร้านไอติมกะทิ", "ร้านบิงซู", "ร้านกาแฟโบราณ", "ร้านชาไทยแก้วใหญ่", "ร้านน้ำปั่นผลไม้", "ร้านหมูปิ้งหน้าโรงเรียน", "รถพุ่มพวง", "ฟู้ดคอร์ทในห้าง", "ร้านอาหารอีสานริมทาง", "ร้านสุกี้", "ร้านหอยทอด", "ร้านกุ้งเผา", "ร้านปลาเผาเกลือ", "ร้านลาบเป็ด", "ร้านเนื้อย่างเสือร้องไห้", "ร้านขนมครก", "ร้านเครปญี่ปุ่น", "ร้านหม่าล่า", "ร้านเบเกอรี่", "ร้านพิซซ่าเดลิเวอรี่", "ตลาดนัดกลางคืน", "ร้านอาหารใต้รสจัด", "ร้านเต้าฮวยฟรุตสลัด"] },
  { name: "สถานที่บ้านเรา", places: ["รถไฟฟ้า BTS", "วัดอรุณ", "มหาวิทยาลัย", "โรงพยาบาล", "สนามมวย", "ห้างสรรพสินค้า", "สถานีตำรวจ", "สนามบินสุวรรณภูมิ", "ตลาดน้ำ", "ปั๊มน้ำมัน", "รถไฟใต้ดิน MRT", "สถานีรถไฟกรุงเทพ (หัวลำโพง)", "เรือด่วนเจ้าพระยา", "ท่าเรือข้ามฟาก", "ถนนข้าวสาร", "เยาวราช", "สยามสแควร์", "อนุสาวรีย์ชัยสมรภูมิ", "สวนลุมพินี", "หาดพัทยา", "เกาะพีพี", "ดอยอินทนนท์", "ถนนคนเดินเชียงใหม่", "อำเภอปาย", "อุทยานประวัติศาสตร์อยุธยา", "สะพานข้ามแม่น้ำแคว", "อุทยานแห่งชาติเขาใหญ่", "ตลาดร่มหุบ", "หัวหิน", "ภูเก็ตเมืองเก่า", "สนามบินดอนเมือง", "สถานีขนส่งหมอชิต", "โรงเรียนประถม", "ที่ว่าการอำเภอ", "ที่ทำการไปรษณีย์", "ธนาคาร", "ร้านตัดผม", "ร้านซ่อมมอเตอร์ไซค์", "วินมอเตอร์ไซค์", "สวนน้ำ", "สวนสนุก", "สวนสัตว์", "พิพิธภัณฑ์", "โรงภาพยนตร์", "ฟิตเนส", "ห้องสมุด", "ตลาดสด", "ร้านขายยา", "คลินิกทำฟัน", "โรงแรมริมทะเล"] },
  { name: "ชีวิตประจำวัน", places: ["ห้องเรียนที่อาจารย์ไม่เข้า", "ห้องน้ำปั๊ม", "งานบวช", "งานแต่งงาน", "ร้านเกม", "หอพักนักศึกษา", "รถทัวร์กลับบ้าน", "คอนเสิร์ต T-POP", "ร้านทอง", "สำนักงานเขต", "ห้องประชุมบริษัท", "โรงอาหารโรงเรียน", "สนามฟุตบอลโรงเรียน", "ห้องพักครู", "ลานเชียร์รับน้อง", "งานกีฬาสี", "งานรับปริญญา", "งานศพ", "งานวันเกิด", "งานเลี้ยงรุ่น", "ปาร์ตี้ปีใหม่บริษัท", "งานกาชาด", "งานวัด", "ร้านคาราโอเกะ", "ผับ", "ร้านนวดแผนไทย", "ร้านทำเล็บ", "ร้านซักผ้าหยอดเหรียญ", "คอนโดห้องสตูดิโอ", "ลิฟต์คอนโด", "ที่จอดรถห้าง", "ด่านตรวจ", "กองถ่ายละคร", "สตูดิโอไลฟ์ขายของ", "โกดังส่งของออนไลน์", "รถตู้โดยสาร", "รถไฟชั้นสาม", "เครื่องบินโลว์คอสต์", "ลานกางเต็นท์", "ทริปดำน้ำ", "สนามแบดมินตัน", "สนามกอล์ฟ", "คลาสโยคะ", "โรงเรียนกวดวิชา", "ห้องสัมภาษณ์งาน", "ร้านถ่ายเอกสาร", "ร้านตัดชุด", "ร้านดอกไม้", "คลินิกความงาม", "ศูนย์บริการรถยนต์"] },
  { name: "ไทยสายฮา", places: ["วงข้าวที่ญาติถามเรื่องแฟน", "โต๊ะจีนงานบวช", "ร้านที่บอกว่าเผ็ดน้อย", "รถเมล์ชั่วโมงเร่งด่วน", "ห้องแชตกลุ่มที่ไม่มีใครตอบ", "บ้านเพื่อนที่บอกว่าใกล้แล้ว", "ร้านบุฟเฟต์ก่อนปิด", "โต๊ะทำงานวันจันทร์", "ห้องสอบที่อ่านไม่ตรงบท", "ร้านที่มีป้ายรับคนละครึ่ง", "คิวรถตู้ที่บอกว่าอีกคนเดียวออก", "ร้านดังในติ๊กต็อกที่ต่อคิวสามชั่วโมง", "ห้องประชุมที่ส่งอีเมลก็จบ", "ไลฟ์ขายของที่แม่ค้าพูดไม่หยุด", "แท็กซี่ที่บอกว่าไม่ไปทางนั้น", "วินมอไซค์ตอนฝนตกหนัก", "ห้างวันเงินเดือนออก", "ตู้ ATM วันสิ้นเดือน", "ร้านเหล้าที่บอกว่าแก้วเดียว", "ปาร์ตี้ที่ไม่รู้จักใครเลย", "กลุ่มไลน์ครอบครัวที่ส่งสวัสดีวันจันทร์", "กลุ่มไลน์ศิษย์เก่าที่มีคนขายประกัน", "งานแต่งเพื่อนที่ต้องใส่ซอง", "ห้องน้ำห้างที่คิวยาวเหยียด", "สนามบินตอนเที่ยวบินดีเลย์", "ทางด่วนช่วงสงกรานต์", "ถนนพระราม 2", "ปั๊มน้ำมันขากลับจากต่างจังหวัด", "ห้องเรียนออนไลน์ที่ทุกคนปิดกล้อง", "ประชุมซูมที่มีคนลืมปิดไมค์", "คาเฟ่ที่คนมานั่งทำงานทั้งวัน", "ฟิตเนสวันที่ 1 มกราคม", "ฟิตเนสวันที่ 15 มกราคม", "วงหมูกระทะที่มีคนไม่ยอมปิ้ง", "ร้านบุฟเฟต์ที่ปรับถ้ากินเหลือ", "ห้องเช่าที่บอกว่าใกล้รถไฟฟ้า", "บ้านผีสิงงานวัด", "โต๊ะหมอดูริมทาง", "แผงขายลอตเตอรี่", "รถแห่งานบวช", "ถนนข้าวสารวันสงกรานต์", "หน้าจอกดบัตรคอนเสิร์ต", "กองถ่ายละครหลังข่าว", "ตลาดนัดตอนฝนตกพอดี", "ร้านซ่อมมือถือจอแตก", "ร้านตัดผมที่บอกว่าเล็มนิดเดียว", "ชายหาดที่มีแต่เก้าอี้ผ้าใบ", "สนามสอบใบขับขี่", "คิวทำบัตรประชาชน", "ร้านกาแฟที่ชื่อเมนูอ่านไม่ออก"] }
];
// รายชื่อเกมในเว็บ — เพิ่มเกมใหม่ได้ที่นี่ (item = สิ่งที่สุ่ม, unit = ลักษณนาม, roles = มีบทบาทย่อยไหม)
const BRAND = 'Board game T baan';
const GAMES = {
  spyfall: { id:'spyfall', name:'Spyfall Thai', emoji:'🕵️', packs:DEFAULT_PACKS, item:'สถานที่', unit:'แห่ง', roles:true, min:3, h1:['ใครโป๊ะ','คนนั้นสายลับ'], art:'🏯', float:'เอ็งเป็นใครก่อน',
    blurb:'ทุกคนอยู่สถานที่เดียวกันพร้อมบทบาท ยกเว้นสายลับที่ไม่รู้ว่าอยู่ที่ไหน',
    lead:'ทุกคนรู้สถานที่ ยกเว้นคนเดียว…ถามให้เนียน ตอบให้รอด อย่าโป๊ะจนเพื่อนจับได้',
    pills:['🇹🇭 สถานที่ไทย','🎭 มีบทบาท','😂 สายฮา'],
    how:[['รับบทลับ','ทุกคนได้สถานที่เดียวกันพร้อมบทบาท ยกเว้นสายลับที่ต้องเนียนเอาตัวรอด'],['ถามให้มีพิรุธ','ถาม–ตอบเป็นภาษาไทย แต่อย่าใบ้สถานที่ตรงเกินไป'],['โหวตคนโป๊ะ','จับให้ได้ว่าใครมั่ว หรือให้สายลับเดาสถานที่เพื่อพลิกเกม']] },
  spy: { id:'spy', name:'SPY', emoji:'🤫', packs:SPY_PACKS, item:'คำ', unit:'คำ', roles:false, min:3, h1:['ใครโป๊ะ','คนนั้นสายลับ'], art:'🤫', float:'คำนี้…ใช้ทุกวันไหม?',
    blurb:'เหมือน Spyfall แต่เป็นคำลับจากหมวด นักฟุตบอล เกม หนัง ของใช้ สัตว์ ไม่มีบทบาท',
    lead:'ทุกคนรู้คำลับเดียวกัน ยกเว้นคนเดียว…พูดถึงคำนั้นแบบอ้อม ๆ อย่าให้สายลับจับทางได้',
    pills:['⚽ นักฟุตบอล','🎬 หนังดัง','🐘 สัตว์'],
    how:[['รับคำลับ','ทุกคนได้คำเดียวกัน ยกเว้นสายลับที่ไม่รู้ว่าคำคืออะไร'],['ใบ้แบบมีชั้นเชิง','ถาม–ตอบเกี่ยวกับคำนั้นแบบอ้อม ๆ ใบ้ตรงไปสายลับจะเดาได้'],['โหวตจับสายลับ','โหวตคนที่ดูมั่ว ส่วนสายลับเดาคำถูกก็พลิกชนะได้']] },
  headword: { id:'headword', type:'head', name:'คำบนหัว', emoji:'🙈', packs:HEAD_PACKS, item:'คำ', unit:'คำ', roles:false, min:2, h1:['คำบนหัว','ใครเดาได้ก่อนชนะ'], art:'🙈', float:'ฉันกินได้ไหม?',
    blurb:'ทุกคนเห็นคำของเพื่อน แต่ไม่เห็นคำของตัวเอง ถามใช่/ไม่ใช่ทีละตา แล้วเดาให้ถูกก่อนใคร',
    lead:'คำของคุณแปะอยู่บนหัว ทุกคนเห็นยกเว้นคุณ…ถามคำถามใช่/ไม่ใช่ทีละตา แล้วเดาให้ถูกเป็นคนแรก',
    pills:['🍛 อาหาร','⚽ นักฟุตบอล','🍡 ขนม'],
    how:[['ได้คำบนหัว','ทุกคนได้คำจากหมวดเดียวกัน เห็นคำของเพื่อนทุกคน แต่ไม่เห็นของตัวเอง'],['ถามใช่/ไม่ใช่','ถึงตาใคร ถามเพื่อนทางเสียง (เช่น Discord) ได้ 1 คำถาม เพื่อนตอบแค่ ใช่ หรือ ไม่ใช่'],['เดาหรือข้าม','ในตาของตัวเองพิมพ์ทายได้ 1 ครั้ง หรือกดข้ามถ้ายังไม่ชัวร์ ใครถูกก่อนได้อันดับก่อน']] },
  explore: { id:'explore', type:'explore', name:'ออกสำรวจ', emoji:'🧭', packs:[], item:'ด่าน', unit:'ด่าน', roles:true, min:EXPLORE_MIN, h1:['ออกสำรวจ','ใครคือโจรในคณะ'], art:'🗿', float:'พาใครไปด้วยดี?',
    blurb:'คณะนักสำรวจต้องผ่าน 5 ด่าน แต่มีโจรขุดสมบัติแฝงอยู่ เลือกคนไปให้ดี แล้วจับให้ได้ว่าใครก่อวินาศ',
    lead:'หัวหน้าคณะผลัดกันเลือกคนไปสำรวจ ทุกคนโหวตเห็นด้วย/ค้าน แล้วคณะส่งการ์ดลับ…ถ้ามีการ์ดก่อวินาศ ด่านนั้นพัง!',
    pills:['🧭 ทีมลับ','🗳️ โหวตคณะ','💣 ก่อวินาศ'],
    how:[['รับฝ่ายลับ','ราว 1 ใน 3 เป็นโจรขุดสมบัติที่รู้จักกันเอง และมีผู้ถือตะเกียง 1 คนที่รู้ว่าใครเป็นโจร'],['เสนอและโหวตคณะ','หัวหน้าคณะเลือกคนไปด่านนี้ ทุกคนโหวต ถ้าเห็นด้วยไม่เกินครึ่ง หัวหน้าคนถัดไปเสนอใหม่'],['สำรวจหรือก่อวินาศ','คณะส่งการ์ดลับ มีก่อวินาศแม้ใบเดียวด่านก็พัง พัง 3 ด่านโจรชนะ ผ่าน 3 ด่านโจรยังพลิกได้ถ้าชี้ตัวผู้ถือตะเกียงถูก']] },
  werewolf: { id:'werewolf', type:'wolf', name:'แวร์วูฟ', emoji:'🐺', packs:[], item:'บทบาท', unit:'บทบาท', roles:true, min:WOLF_MIN, h1:['แวร์วูฟ','ใครคือหมาป่า'], art:'🐺', float:'เมื่อคืนเธออยู่ไหน?',
    blurb:'กลางคืนหมาป่าแอบกัดชาวบ้าน กลางวันทุกคนถกเถียงแล้วโหวตประหาร มีหมอดู หมอยา นายพราน ระบบเป็นผู้ดำเนินเกมให้',
    lead:'หมู่บ้านนี้มีหมาป่าปลอมตัวอยู่…กลางคืนหมาป่าเลือกเหยื่อ หมอดูส่อง หมอยาปกป้อง กลางวันทุกคนต้องช่วยกันโหวตหาตัวหมาป่า',
    pills:['🐺 หมาป่า','🔮 หมอดู','💉 หมอยา'],
    how:[['กลางคืน','ทุกคนดูจอตัวเอง หมาป่าตกลงกันเลือกเหยื่อ หมอดูส่อง 1 คน หมอยาปกป้อง 1 คน ชาวบ้านรอเช้า'],['กลางวัน','ระบบประกาศว่าใครตาย ทุกคนคุยกันแล้วโหวตประหาร เสียงมากสุดถูกประหาร เสมอ = ไม่มีใครตาย'],['จบเกม','จับหมาป่าได้หมด ชาวบ้านชนะ ถ้าหมาป่ามีจำนวนเท่ากับชาวบ้านที่เหลือ หมาป่าชนะ']] },
};
const HEAD_NORM = s => String(s||'').toLowerCase().replace(/[\s\-.'’]/g,'');
// กติกาคะแนนต่อรอบ
const SCORE = { teamWin: 1, rightVote: 1, spyEscape: 2, spyGuess: 2 };
const jokes = ['ใจเย็นพี่ สายลับอาจเป็นคนข้าง ๆ ก็ได้ 👀','ถามเนียน ๆ อย่าโป๊ะเหมือนสั่งส้มตำไม่ใส่พริก','ถ้าตอบแปลก ๆ อาจจะง่วง…หรือเป็นสายลับ!','หลักฐานยังไม่แน่น อย่าเพิ่งกล่าวหาเพื่อน','เนียนกว่านี้ก็ปลาร้าในกระเป๋าแล้ว'];
const rid = () => Math.random().toString(36).slice(2, 9).toUpperCase();
const pick = a => a[Math.floor(Math.random()*a.length)];
const clean = s => String(s || '').trim().slice(0, 24);
function beep(freq=660, duration=.09) {
  try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const o=ctx.createOscillator(), g=ctx.createGain(); o.connect(g);g.connect(ctx.destination);o.frequency.value=freq;o.type='sine';g.gain.value=.045;o.start();g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+duration);o.stop(ctx.currentTime+duration);o.onended=()=>ctx.close(); } catch {}
}
function App() {
  const [name,setName]=useState(localStorage.getItem('sf-name')||'');
  const [roomCode,setRoomCode]=useState('');
  const [joinCode,setJoinCode]=useState('');
  const liveCode=useRef('');
  const [room,setRoom]=useState(null);
  const [myId,setMyId]=useState(sessionStorage.getItem('sf-player')||rid());
  const [screen,setScreen]=useState('home');
  const [notice,setNotice]=useState('');
  const [sound,setSound]=useState(true);
  const [duration,setDuration]=useState(8);
  const [packName,setPackName]=useState('ชุดเพื่อนฉัน');
  const [packPlaces,setPackPlaces]=useState('');
  const [showRole,setShowRole]=useState(false);
  const [now,setNow]=useState(Date.now());
  const [vote,setVote]=useState('');
  const [accuse,setAccuse]=useState('');
  const [spyGuess,setSpyGuess]=useState('');
  const [newPack,setNewPack]=useState('');
  const [verdict,setVerdict]=useState(null);
  const [game,setGameState]=useState(()=>{const h=location.hash.slice(1);return GAMES[h]?h:null});
  const [showCat,setShowCat]=useState(true);
  const [exOpts,setExOpts]=useState({mole:false});
  const [wfOpts,setWfOpts]=useState({hunter:true,reveal:true});
  function setGame(g){setGameState(g);try{history.replaceState(null,'',g?'#'+g:location.pathname+location.search)}catch{}}
  useEffect(()=>{const f=()=>{const h=location.hash.slice(1);setGameState(GAMES[h]?h:null)};window.addEventListener('hashchange',f);return()=>window.removeEventListener('hashchange',f)},[]);
  const [newBuild,setNewBuild]=useState(false);
  useEffect(()=>{const mine=[...document.scripts].map(x=>x.getAttribute('src')).find(x=>x&&x.includes('/assets/'));if(!mine)return;
    const check=async()=>{try{const h=await (await fetch('/?_='+Date.now(),{cache:'no-store'})).text();const m=h.match(/\/assets\/index-[^"']+\.js/);if(m&&!mine.endsWith(m[0])&&!mine.includes(m[0]))setNewBuild(true)}catch{}};
    check();const t=setInterval(check,60000);const vis=()=>document.visibilityState==='visible'&&check();document.addEventListener('visibilitychange',vis);return()=>{clearInterval(t);document.removeEventListener('visibilitychange',vis)}},[]);
  useEffect(()=>{sessionStorage.setItem('sf-player',myId);},[myId]);
  useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(t)},[]);
  useEffect(()=>{if(!db||!roomCode)return; const code=roomCode;liveCode.current=code; const unsub=onValue(ref(db,`rooms/${code}`),s=>{if(liveCode.current!==code)return;const v=s.val();if(v&&v.players?.[myId]){setRoom(v);setScreen('room')}else{if(v)msg('คุณไม่ได้อยู่ในห้องนี้แล้ว');else if(roomCode)msg('ห้องนี้ถูกปิดแล้ว');setRoom(null);setRoomCode('');setScreen('home')}});return()=>unsub();},[roomCode]);
  const players=room?.players ? Object.values(room.players) : [];
  const gid=room?(room.game||'spyfall'):(game||'spyfall');const G=GAMES[gid]||GAMES.spyfall;const I=G.item,U=G.unit;
  const me=players.find(p=>p.id===myId);
  const isHost=room?.hostId===myId;
  const outdated=players.filter(p=>p.v!==APP_VERSION);
  const packs=room?.packs || G.packs;
  const off=room?.off||{};
  const isOn=(pi,qi)=>!off['p'+pi]?.['i'+qi];
  const packOnCount=pi=>(packs[pi]?.places||[]).filter((_,qi)=>isOn(pi,qi)).length;
  const placePool=packs.flatMap((p,pi)=>(p.places||[]).filter((pl,qi)=>pl&&isOn(pi,qi)));
  const secondsLeft=room?.round?.endsAt ? Math.max(0,Math.ceil((room.round.endsAt-now)/1000)) : 0;
  const role=room?.round?.roles?.[myId];
  const scores=room?.scores||{};
  const timeUp=room?.status==='playing'&&!!room.round?.endsAt&&now>=room.round.endsAt;
  // หมดเวลา → ทุกเครื่องพยายามเปลี่ยนเป็น voting แต่ transaction ทำให้เปลี่ยนได้ครั้งเดียว (ไม่ต้องพึ่ง host ออนไลน์)
  useEffect(()=>{if(!timeUp||!db||!roomCode)return;if(sound)beep(330,.4);
    runTransaction(ref(db,`rooms/${roomCode}/status`),s=>s==='playing'?'voting':undefined).catch(()=>{})},[timeUp]);
  const customPlaces=useMemo(()=>packPlaces.split('\n').map(s=>s.trim()).filter(Boolean).slice(0,80),[packPlaces]);
  function msg(s){setNotice(s);setTimeout(()=>setNotice(''),3200)}
  async function createRoom(){
    if(!db){msg('ยังไม่ได้ตั้งค่า Firebase ตาม README');return}
    const n=clean(name);if(!n){msg('ใส่ชื่อเล่นก่อนนะ');return}
    const code=rid().slice(0,5);const player={id:myId,name:n,joinedAt:Date.now(),v:APP_VERSION};
    const data={code,game:gid,v:APP_VERSION,hostId:myId,status:'lobby',createdAt:Date.now(),players:{[myId]:player},packs:G.packs,round:null,votes:null,settings:{duration}};
    await set(ref(db,`rooms/${code}`),data);localStorage.setItem('sf-name',n);setRoomCode(code);setScreen('room');if(sound)beep(800);
  }
  async function joinRoom(){
    if(!db){msg('ยังไม่ได้ตั้งค่า Firebase ตาม README');return}
    const n=clean(name),code=joinCode.trim().toUpperCase();if(!n||!code){msg('ใส่ชื่อและรหัสห้องก่อน');return}
    const rr=ref(db,`rooms/${code}`);const snap=await get(rr);if(!snap.exists()){msg('ไม่เจอห้องนี้ เช็กรหัสอีกที');return}
    const data=snap.val();if((data.v||'1.0')!==APP_VERSION){msg(`ห้องนี้ใช้เวอร์ชัน ${data.v||'เก่า'} แต่เครื่องคุณเป็น ${APP_VERSION} — ให้ทุกคนรีเฟรชหน้าเว็บก่อน`);return}if(data.status!=='lobby' && !data.players?.[myId]){msg('เกมเริ่มแล้ว รอรอบหน้าก่อนนะ');return}
    if(Object.keys(data.players||{}).length>=12 && !data.players?.[myId]){msg('ห้องเต็มแล้ว (สูงสุด 12 คน)');return}
    await update(ref(db,`rooms/${code}/players/${myId}`),{id:myId,name:n,joinedAt:Date.now(),v:APP_VERSION});
    localStorage.setItem('sf-name',n);setGame(data.game||'spyfall');setRoomCode(code);setScreen('room');if(sound)beep(740);
  }
  async function startGame(){
    if(!isHost||players.length<G.min){msg(`ต้องมีผู้เล่นอย่างน้อย ${G.min} คน`);return}if(outdated.length){msg('ยังมีคนใช้เวอร์ชันเก่า ให้รีเฟรชก่อน');return}
    if(G.type==='wolf'){
      await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:makeWolfRound(players.map(p=>p.id),wfOpts,(room.round?.number||0)+1),votes:null,ready:null,spyGuess:null,result:null});
      if(sound)beep(300,.3);return}
    if(G.type==='explore'){
      await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:makeExploreRound(players.map(p=>p.id),exOpts,(room.round?.number||0)+1),votes:null,ready:null,spyGuess:null,result:null});
      if(sound)beep(900,.18);return}
    if(!placePool.length){msg(`ติ๊กเลือก${I}อย่างน้อย 1 ${U}ก่อนนะ`);return}
    if(G.type==='head')return startHead();
    const place=pick(placePool),spy=pick(players).id,roles={};
    const pi=packs.findIndex(p=>(p.places||[]).includes(place));const cat=!G.roles&&showCat&&pi>=0?packs[pi].name:null;
    // ถ้าบอกหมวด กระดานจะเหลือเฉพาะคำในหมวดนั้น
    const pool=cat?(packs[pi].places||[]).filter((pl,qi)=>pl&&isOn(pi,qi)):placePool;
    const deck=[...(ROLES[place]||GENERIC_ROLES)].sort(()=>Math.random()-.5);let k=0;
    players.forEach(p=>roles[p.id]=p.id===spy?{type:'spy'}:G.roles?{type:'player',place,role:deck[(k++)%deck.length]}:{type:'player',place});
    await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:{number:(room.round?.number||0)+1,place,roles,pool,cat,startedAt:Date.now(),endsAt:Date.now()+duration*60*1000,phase:'question'},votes:null,ready:null,spyGuess:null,result:null});
    setShowRole(false);setVote('');setAccuse('');setSpyGuess('');if(sound)beep(900,.18);
  }
  // คำบนหัว: สุ่ม 1 หมวด (ที่มีคำพอสำหรับทุกคน) แล้วแจกคำไม่ซ้ำกันให้ทุกคน
  async function startHead(){
    const ok=packs.map((p,pi)=>({name:p.name,words:(p.places||[]).filter((pl,qi)=>pl&&isOn(pi,qi))})).filter(x=>x.words.length>=players.length);
    if(!ok.length){msg(`ต้องติ๊กให้มีอย่างน้อย 1 หมวดที่มีคำ ≥ ${players.length} คำ`);return}
    const c=pick(ok);const deck=[...c.words].sort(()=>Math.random()-.5);const words={};players.forEach((p,i)=>words[p.id]=deck[i]);
    const order=players.map(p=>p.id).sort(()=>Math.random()-.5);
    await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:{number:(room.round?.number||0)+1,cat:c.name,words,order,turn:0,pool:c.words,startedAt:Date.now()},votes:null,ready:null,spyGuess:null,result:null});
    if(sound)beep(900,.18);
  }
  async function leaveRoom(){const code=roomCode,host=isHost;liveCode.current='';setRoomCode('');setRoom(null);setScreen('home');if(db&&code&&myId){if(host){await remove(ref(db,`rooms/${code}`));}else{await remove(ref(db,`rooms/${code}/players/${myId}`));}}}
  const canEdit=isHost&&room?.status==='lobby';
  async function togglePlace(pi,qi){if(!canEdit)return;await set(ref(db,`rooms/${roomCode}/off/p${pi}/i${qi}`),isOn(pi,qi)?true:null);if(sound)beep(600,.04)}
  async function togglePack(pi){if(!canEdit)return;const n=(packs[pi]?.places||[]).length;const allOn=packOnCount(pi)===n;
    if(allOn){const o={};for(let q=0;q<n;q++)o['i'+q]=true;await set(ref(db,`rooms/${roomCode}/off/p${pi}`),o)}else await set(ref(db,`rooms/${roomCode}/off/p${pi}`),null);if(sound)beep(allOn?480:720,.06)}
  async function setAll(on){if(!canEdit)return;if(on){await set(ref(db,`rooms/${roomCode}/off`),null)}else{const o={};packs.forEach((p,pi)=>{const x={};(p.places||[]).forEach((_,q)=>x['i'+q]=true);o['p'+pi]=x});await set(ref(db,`rooms/${roomCode}/off`),o)}}
  async function addPlace(pi,text){if(!canEdit)return false;const t=String(text||'').trim().slice(0,40);if(!t)return false;const cur=packs[pi]?.places||[];if(cur.includes(t)){msg(`มี${I}นี้ในชุดแล้ว`);return false}
    await set(ref(db,`rooms/${roomCode}/packs/${pi}/places`),[...cur,t]);msg(`เพิ่ม “${t}” แล้ว`);if(sound)beep(820,.06);return true}
  async function addPack(){
    const places=customPlaces;if(!clean(packName)||places.length<2){msg(`ตั้งชื่อชุดและใส่${I}อย่างน้อย 2 ${U}`);return}
    const updated=[...(room.packs||G.packs),{name:clean(packName),places}];await update(ref(db,`rooms/${roomCode}`),{packs:updated});setPackPlaces('');msg(`เพิ่มชุด${I}แล้ว 🎉`);if(sound)beep();
  }
  async function castVote(targetId){if(!room||!me||room.ready?.[myId])return;setVote(targetId);if(sound)beep(520)}
  async function confirmVote(){if(!room||!me)return;if(!vote){msg('เลือกคนที่จะโหวตก่อน');return}
    const spy=role?.type==='spy';const g=spyGuess.trim();if(spy&&!g){msg(`สายลับต้องเดา${I}ก่อนยืนยัน`);return}
    const u={[`votes/${myId}`]:vote,[`ready/${myId}`]:true};if(spy)u.spyGuess=g;await update(ref(db,`rooms/${roomCode}`),u);if(sound)beep(760,.12)}
  async function unconfirm(){if(!room)return;await update(ref(db,`rooms/${roomCode}`),{[`ready/${myId}`]:null});}
  // สรุปผลด้วย transaction กันสรุปซ้ำ (เช่น host กดปุ่มพร้อมกับระบบสรุปอัตโนมัติ) และบวกคะแนนสะสม
  async function finishVote(){
    if(!room||room.status!=='voting')return;let out=null;
    await runTransaction(ref(db,`rooms/${roomCode}`),cur=>{
      if(!cur||cur.status!=='voting'||!cur.round?.roles)return;
      const ids=Object.keys(cur.players||{});const votes=cur.votes||{};const counts={};Object.values(votes).forEach(id=>counts[id]=(counts[id]||0)+1);
      const spyId=Object.keys(cur.round.roles).find(id=>cur.round.roles[id].type==='spy');
      const max=Math.max(0,...Object.values(counts));const winners=Object.keys(counts).filter(id=>counts[id]===max);
      const votedOut=max>0&&winners.length===1?winners[0]:null;const majority=!!votedOut&&max>ids.length/2;
      const caught=votedOut===spyId;const guess=cur.spyGuess||'';const actual=cur.round.place||'';
      const guessCorrect=!!guess&&guess.trim().toLowerCase()===actual.trim().toLowerCase();const spyWins=!caught||guessCorrect;
      const points={},scores={...(cur.scores||{})};
      ids.forEach(id=>{points[id]=id===spyId?(caught?0:SCORE.spyEscape)+(guessCorrect?SCORE.spyGuess:0):(spyWins?0:SCORE.teamWin)+(votes[id]===spyId?SCORE.rightVote:0);scores[id]=(scores[id]||0)+points[id]});
      out={caught,guessCorrect};
      return {...cur,status:'result',scores,result:{caught,spyId,votes:counts,votedOut,majority,ballots:votes,guess,guessCorrect,spyWins,points,reason:'final'}};
    });
    if(out&&sound)beep(out.caught&&!out.guessCorrect?980:220,.25);
  }
  async function resetScores(){if(!isHost)return;if(!confirm('ล้างคะแนนสะสมของทุกคนเป็น 0?'))return;await update(ref(db,`rooms/${roomCode}`),{scores:null});msg('ล้างคะแนนแล้ว')}
  async function backToLobby(){await update(ref(db,`rooms/${roomCode}`),{status:'lobby',round:null,votes:null,ready:null,spyGuess:null,result:null});setShowRole(false);setVote('');setSpyGuess('')}
  const copy=async()=>{try{await navigator.clipboard.writeText(roomCode);msg('คัดลอกรหัสห้องแล้ว!');}catch{msg(`รหัสห้อง: ${roomCode}`)}};
  const active=room?.status==='playing';
  // แวร์วูฟ กลางคืน: ปิดไมค์คนที่ไม่ใช่หมาป่า และหมาป่าได้ยินกันเองเท่านั้น
  const wr=room?.round;const wolfNight=wr?.kind==='wolf'&&room?.status==='playing'&&wr.phase==='night';
  const iAmWolf=wolfNight&&wr.roles?.[myId]==='wolf'&&!!wr.alive?.[myId];
  const voiceGate=wolfNight?{canTalk:iAmWolf,hear:iAmWolf?Object.keys(wr.roles||{}).filter(id=>id!==myId&&wr.roles[id]==='wolf'&&wr.alive?.[id]):[],label:iAmWolf?'🌙 กลางคืน — ได้ยินกันเฉพาะหมาป่า (คนอื่นไม่ได้ยินคุณ)':'🌙 กลางคืน — ไมค์ปิดอัตโนมัติ ทุกคนหลับ… จะได้ยินกันอีกทีตอนเช้า'}:null;
  const nameOf=id=>players.find(p=>p.id===id)?.name||'ผู้เล่นที่ออกไปแล้ว';
  const readyCount=players.filter(p=>room?.ready?.[p.id]).length;
  const allReady=room?.status==='voting'&&players.length>0&&readyCount===players.length;
  useEffect(()=>{if(allReady&&isHost){const t=setTimeout(()=>finishVote(),900);return()=>clearTimeout(t)}},[allReady,isHost]);
  const resultKey=room?.status==='result'&&room?.result&&!G.type?`${roomCode}-${room.round?.number}-${room.result.spyId}`:null;
  useEffect(()=>{if(!resultKey)return;const spyId=room.result.spyId;if(myId===spyId)return;
    const myVote=room.votes?.[myId];const right=myVote?myVote===spyId:!!room.result.caught;
    setVerdict({right,key:resultKey});if(sound)beep(right?980:200,.3);const t=setTimeout(()=>setVerdict(null),3500);return()=>clearTimeout(t)},[resultKey]);
  if(!configured||!db)return <div className="setup"><div className="brand"><span className="logo">🎲</span> BOARD GAME <b>T BAAN</b></div><div className="setup-card"><span className="eyebrow">SETUP ก่อนเปิดเกม</span><h1>อีกนิดเดียวก็ได้โป๊ะกับเพื่อนแล้ว</h1><p>เว็บนี้พร้อมรันแล้ว แต่ต้องเชื่อม Firebase Realtime Database เพื่อให้ผู้เล่นคนละเครื่องเห็นข้อมูลห้องเดียวกัน</p><ol><li>สร้างโปรเจกต์ Firebase แล้วเปิด Realtime Database</li><li>คัดลอกค่าการตั้งค่ามาใส่ในไฟล์ <code>.env</code></li><li>ตั้งค่า Database Rules ตาม README แล้วรัน <code>npm run dev</code></li></ol><a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="primary">เปิด Firebase Console ↗</a><p className="muted">อ่าน README.md ในไฟล์โปรเจกต์เพื่อทำทีละขั้นตอน</p></div></div>;

  return <div className="app">
    <header className="topbar"><button className="brand" onClick={()=>{if(screen!=='room')setGame(null)}} title="กลับหน้ารวมเกม"><span className="logo">🎲</span> BOARD GAME <b>T BAAN</b></button><div className="tagline">{screen==='room'||game?`${G.emoji} ${G.name}`:'รวมบอร์ดเกมเล่นกับแก๊งเพื่อน 🇹🇭'}</div><button className="sound" onClick={()=>setSound(!sound)} title="เปิด/ปิดเสียง">{sound?<Volume2/>:<VolumeX/>}</button></header>
    {newBuild&&<button className="update-bar" onClick={()=>location.reload()}>🔄 มีเวอร์ชันใหม่ — แตะเพื่ออัปเดต</button>}
    {notice&&<div className="toast">{notice}</div>}
    {verdict&&<div className={'verdict '+(verdict.right?'right':'wrong')} onClick={()=>setVerdict(null)} key={verdict.key}><div className="verdict-box"><div className="verdict-emoji">{verdict.right?'🧠':'🤡'}</div><div className="verdict-text">{verdict.right?'ฉลาดจริงๆเลยไอโง่':'มึงนี่โง่จริงๆเลยนะ'}</div><small>{verdict.right?'โหวตถูกตัวสายลับ':'โหวตผิดคน'} • แตะเพื่อปิด</small></div></div>}
    {screen==='home'&&!game&&<main className="home hub">
      <section className="hub-hero"><span className="eyebrow"><Sparkles size={15}/> PARTY GAMES • เล่นข้ามเครื่อง <span className="version-tag">v{APP_VERSION}</span></span><h1>{BRAND}</h1><p>รวมบอร์ดเกมปาร์ตี้ไว้เล่นกับแก๊งเพื่อน เลือกเกมแล้วสร้างห้อง หรือใส่รหัสห้องที่เพื่อนส่งมาได้เลย</p></section>
      <section className="game-grid">{Object.values(GAMES).map(g=><button key={g.id} className="game-card" onClick={()=>setGame(g.id)}><span className="game-emoji">{g.emoji}</span><h2>{g.name}</h2><p>{g.blurb}</p><div className="hero-pills">{g.pills.map(x=><span key={x}>{x}</span>)}</div><span className="game-go">เล่นเกมนี้ →</span></button>)}
        <div className="game-card soon"><span className="game-emoji">🧩</span><h2>เกมต่อไป…</h2><p>กำลังเตรียมเกมใหม่ เร็ว ๆ นี้</p></div></section>
      <section className="join-card"><div className="join-head"><div><span className="eyebrow">มีรหัสห้องแล้ว?</span><h2>เข้าห้องที่เพื่อนสร้างไว้</h2></div><span className="players-chip"><Users size={16}/> 3–12 คน</span></div><label>ชื่อเล่นของคุณ</label><input value={name} onChange={e=>setName(e.target.value)} maxLength={24} placeholder="เช่น ตัวตึงประจำซอย"/><div className="join-actions"><div className="join-inline"><input value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} onKeyDown={e=>e.key==='Enter'&&joinRoom()} maxLength={6} placeholder="รหัสห้อง เช่น A7K2Q"/><button className="secondary" onClick={joinRoom}><DoorOpen size={18}/> เข้าห้อง</button></div></div><p className="hint">ระบบจะพาเข้าเกมที่ห้องนั้นเล่นอยู่ให้เอง</p></section>
      <section className="ceo-card"><div className="ceo-photo"><img src="/ceo-big-dodo.jpg" alt="Big Dodo นั่งหน้ากระดานบอร์ดเกม" loading="lazy"/><span className="ceo-badge">👑 CEO & ผู้ก่อตั้ง</span></div>
        <div className="ceo-text"><span className="eyebrow">รู้จักผู้อยู่เบื้องหลัง</span><h2>Big Dodo</h2><p className="ceo-role">ประธานเจ้าหน้าที่บริหารฝ่ายปั่นประสาท • Board game T baan</p>
          <p>เกิดมาพร้อมลูกเต๋าในมือขวาและคู่มือกติกาในมือซ้าย ว่ากันว่าคำแรกที่พูดไม่ใช่ “พ่อ” หรือ “แม่” แต่เป็น <b>“เดี๋ยว ขออ่านกติกาอีกรอบ”</b></p>
          <p>Big Dodo เริ่มต้นอาชีพจากการเป็นแชมป์เกมเศรษฐีประจำซอย ก่อนจะถูกแบนจากวงญาติทุกงานสงกรานต์ เพราะ <b>ปั่นจนน้าทะเลาะกับป้าไปสามปี</b> จึงตัดสินใจผันตัวมาสร้างเว็บนี้ เพื่อปั่นเพื่อนได้ทุกที่ ไม่ต้องรอวันหยุดยาว</p>
          <ul className="ceo-facts">
            <li>🐺 เล่นแวร์วูฟเป็นหมาป่ามา 47 ตาติด แต่ยืนยันว่า “ระบบสุ่มนะ ไม่ใช่ผม”</li>
            <li>🕵️ ตอนเป็นสายลับใน Spyfall เคยตอบว่า “ที่นี่มีหมูกระทะไหม” ในด่านสถานีอวกาศ แล้วยังรอดได้</li>
            <li>🧭 ในเกมออกสำรวจ ทุกคนโหวตค้านคณะที่มีเขาไว้ก่อนเสมอ ไม่ว่าเขาจะอยู่ฝ่ายไหน</li>
            <li>🪙 สะสมเหรียญบอร์ดเกมไว้ในถ้วยหลากสี มากกว่าเงินในบัญชีจริง</li>
            <li>📜 คติประจำใจ: “แพ้ได้ แต่ต้องปั่นให้คนชนะไม่มีความสุข”</li>
          </ul>
          <p className="muted">* ประวัตินี้แต่งขึ้นเพื่อความฮา ไม่มีมูลความจริงใด ๆ ทั้งสิ้น (มั้ง)</p></div></section>
    </main>}
    {screen==='home'&&game&&<main className="home">
      <section className="hero"><div className="hero-copy"><span className="eyebrow"><Sparkles size={15}/> {G.name} • {G.min}–12 PLAYERS <span className="version-tag">v{APP_VERSION}</span></span><h1>{G.h1[0]}<br/><em>{G.h1[1]}</em></h1><p>{G.lead}</p><div className="hero-pills">{G.pills.map(x=><span key={x}>{x}</span>)}</div></div><div className="hero-art"><div className="sun"></div><div className="temple">{G.art}</div><div className="floating-card">🤫 <b>{G.float}</b><small>ถามแบบมีชั้นเชิง</small></div><div className="stamp">ห้ามโป๊ะ!</div></div></section>
      <section className="join-card"><div className="join-head"><div><button className="back-link" onClick={()=>setGame(null)}><ArrowLeft size={14}/> รวมเกม</button><span className="eyebrow">{G.emoji} {G.name} • เริ่มปฏิบัติการ</span><h2>รวมแก๊งให้ครบ แล้วค่อยจับโป๊ะ</h2></div><span className="players-chip"><Users size={16}/> 3–12 คน</span></div><label>ชื่อเล่นของคุณ</label><input value={name} onChange={e=>setName(e.target.value)} maxLength={24} placeholder="เช่น ตัวตึงประจำซอย" onKeyDown={e=>e.key==='Enter'&&createRoom()}/><div className="join-actions"><button className="primary" onClick={createRoom}><Plus size={18}/> สร้างห้องใหม่</button><div className="join-inline"><input value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} onKeyDown={e=>e.key==='Enter'&&joinRoom()} maxLength={6} placeholder="รหัสห้อง เช่น A7K2Q"/><button className="secondary" onClick={joinRoom}><DoorOpen size={18}/> เข้าห้อง</button></div></div></section>
      <section className="how"><h2>เล่นยังไง ไม่ให้โป๊ะ?</h2><div className="how-grid">{G.how.map(([h,t],i)=><article key={i}><span>0{i+1}</span><h3>{h}</h3><p>{t}</p></article>)}</div></section>
    </main>}
    {screen==='room'&&room&&<main className="room-page">
      <div className="room-heading"><div><span className="eyebrow">{G.emoji} {G.name} • ห้องเล่นส่วนตัว</span><h1>ห้อง {roomCode} <button className="icon-btn" onClick={copy}><Copy size={17}/></button></h1><p>ส่งรหัสนี้ให้เพื่อนเพื่อชวนเข้ามาเล่น</p></div><button className="secondary" onClick={leaveRoom}><LogOut size={16}/> ออกจากห้อง</button></div>
      <div className="room-grid"><section className="panel players-panel"><div className="panel-title"><h2><Users size={20}/> แก๊งนี้มีใครบ้าง</h2><span>{players.length}/12</span></div>{players.map((p,i)=><div className="player-row" key={p.id}><span className="avatar">{['🐸','🐯','🐼','🦆','🐵','🐙','🦝','🐷','🐸','🐻','🦊','🐣'][i%12]}</span><div><b>{p.name} {p.id===myId&&'(คุณ)'}</b><small>{p.id===room.hostId?'👑 หัวหน้าห้อง':'ผู้เล่น'}{room.round?.kind==='wolf'&&room.round.alive&&!room.round.alive[p.id]?' • 💀 ตายแล้ว':''}</small></div><span className="score-chip">{scores[p.id]||0} แต้ม</span>{p.v!==APP_VERSION&&<span className="old-tag">เวอร์ชันเก่า</span>}{p.id===room.hostId&&<span className="host-tag">HOST</span>}</div>)}{players.length<G.min&&<p className="hint">รอเพื่อนอีก {G.min-players.length} คน… เกมเริ่มได้เมื่อครบ {G.min} คน</p>}<VoicePanel key={roomCode} db={db} roomCode={roomCode} myId={myId} members={room.voice?.members} nameOf={nameOf} msg={msg} gate={voiceGate}/></section>
      <section className="panel game-panel">{room.status==='lobby'&&G.type==='head'&&<><span className="eyebrow">พร้อมยัง?</span><h2>ตั้งวงก่อน แล้วค่อยเดาคำบนหัว</h2><p className="hint">ตอนเริ่ม ระบบจะสุ่ม 1 หมวดจากที่ติ๊กไว้ แล้วแจกคำให้ทุกคนคนละคำ (เล่นได้ 2–12 คน)</p><div className="score-rules"><b>🏅 คะแนน</b><span>ทายถูกอันดับ 1 ได้ (จำนวนคน − 1) แต้ม อันดับถัดไปลดลงทีละ 1</span><span>ยังทายไม่ได้ตอนจบเกม = 0 แต้ม</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>{outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}{isHost?<button className="primary wide" disabled={players.length<G.min||outdated.length>0} onClick={startGame}>🎲 เริ่มเกมเลย ({players.length} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องเริ่มเกมอยู่เด้อ</div>}</>}
      {room.status==='lobby'&&!G.type&&<><span className="eyebrow">พร้อมยัง?</span><h2>ตั้งวงก่อน เดี๋ยวค่อยโป๊ะ</h2><label>เวลาต่อรอบ</label><select value={duration} onChange={e=>setDuration(+e.target.value)}><option value={3}>3 นาที</option><option value={5}>5 นาที</option><option value={8}>8 นาที</option><option value={10}>10 นาที</option></select><p className="hint">หัวหน้าห้องเป็นคนเริ่มเกมและเพิ่มชุด{I} • หมดเวลาแล้วจะเข้าหน้าโหวตอัตโนมัติ</p><div className="score-rules"><b>🏅 กติกาคะแนน</b><span>จับสายลับได้: ชาวบ้านทุกคน +{SCORE.teamWin}</span><span>โหวตถูกตัวสายลับ: +{SCORE.rightVote}</span><span>สายลับรอด: +{SCORE.spyEscape} • เดา{I}ถูก: +{SCORE.spyGuess}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>{!G.roles&&<label className="cat-toggle"><input type="checkbox" className="tick" checked={showCat} disabled={!isHost} onChange={e=>setShowCat(e.target.checked)}/> บอกหมวดหมู่ให้ทุกคนรู้ (สายลับเดาง่ายขึ้น)</label>}{outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}{isHost?<button className="primary wide" disabled={players.length<3||outdated.length>0} onClick={startGame}>🎲 เริ่มเกมเลย ({players.length} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องเริ่มเกมอยู่เด้อ</div>}</>}
      {active&&!G.type&&room.round&&<><div className="round-top"><span className="eyebrow">รอบที่ {room.round.number}</span><span className={'timer'+(secondsLeft<=30?' low':'')}><Clock3 size={16}/> {Math.floor(secondsLeft/60)}:{String(secondsLeft%60).padStart(2,'0')}</span></div><h2>{room.round.phase==='question'?'ภารกิจ: เนียนเข้าไว้':'โหวตคนโป๊ะ'}</h2><div className="role-card">{room.round.cat&&<div className="cat-tag">หมวด: {room.round.cat}</div>}<span className="role-icon">{showRole&&role?.type==='spy'?'🕵️':G.roles?'📍':'💬'}</span><h3>{showRole?(role?.type==='spy'?'คุณคือสายลับ!':`${I}ของคุณ`): 'บทบาทลับของคุณ'}</h3><p>{showRole?(role?.type==='spy'?`ทำตัวเนียน ๆ แล้วพยายามเดา${I}ให้ได้`:`${I}คือ`): 'กดเปิดดูบทบาทนี้คนเดียว ระวังคนแอบมองจอ!'}</p>{showRole&&<strong className="secret">{role?.type==='spy'?`ไม่รู้${I} 🤫`:role?.place}</strong>}{showRole&&role?.type==='player'&&role.role&&<p className="role-name">บทบาทของคุณ: <b>{role.role}</b></p>}<button className="secondary" onClick={()=>setShowRole(!showRole)}>{showRole?<EyeOff size={16}/>:<Eye size={16}/>} {showRole?'ซ่อนบทบาท':'เปิดดูบทบาท'}</button></div><p className="joke">😂 {pick(jokes)}</p><div className="vote-actions">{isHost?<button className="primary wide" onClick={()=>update(ref(db,`rooms/${roomCode}`),{status:'voting',votes:null,ready:null,spyGuess:null})}><Vote size={16}/> เปิดโหวตให้ทุกคน</button>:<div className="waiting" style={{width:'100%'}}>🗳️ ถามตอบกันให้พอ แล้วรอหัวหน้าห้องเปิดโหวต</div>}</div></>}
      {room.status==='voting'&&(()=>{const done=!!room.ready?.[myId];const spy=role?.type==='spy';return <><span className="eyebrow">ลงคะแนน</span>{room.round?.endsAt&&now>=room.round.endsAt&&<div className="timeout-tag">⏰ หมดเวลาถามตอบแล้ว!</div>}<h2>ใครดูมีพิรุธที่สุด?</h2><p className="hint">เลือกคนที่คิดว่าเป็นสายลับ แล้วกดยืนยัน{spy?` • คุณคือสายลับ ต้องเดา${I}ด้วย`:''} เมื่อทุกคนยืนยันครบจะไปหน้าสรุปเอง</p>
        {players.filter(p=>p.id!==myId).map(p=><button key={p.id} disabled={done} className={`vote-row ${vote===p.id?'selected':''}`} onClick={()=>castVote(p.id)}><span>{p.name}</span><span>{vote===p.id?'✓ เลือกแล้ว':'โหวตคนนี้'}</span></button>)}
        {spy&&<div className="guess-box"><label>🕵️ สายลับเดาว่า{I}คือ…</label><input value={spyGuess} disabled={done} list="pool-list" onChange={e=>setSpyGuess(e.target.value)} placeholder={`พิมพ์หรือเลือก${I}ที่คิดว่าใช่`}/><datalist id="pool-list">{(room.round?.pool||[]).map(pl=><option key={pl} value={pl}/>)}</datalist></div>}
        {done?<div className="confirmed">✅ ยืนยันแล้ว{vote&&<> — โหวต <b>{nameOf(room.votes?.[myId]||vote)}</b></>}{spy&&room.spyGuess&&<> • เดา <b>{room.spyGuess}</b></>}<button className="link-btn" onClick={unconfirm}>แก้ไข</button></div>
          :<button className="primary wide" onClick={confirmVote}>✅ ยืนยัน{spy?'โหวตและคำตอบ':'โหวต'}</button>}
        <div className="ready-list"><div className="ready-head">🗳️ ยืนยันแล้ว <b>{readyCount}/{players.length}</b> คน</div></div>
        {allReady&&<div className="waiting">กำลังไปหน้าสรุป…</div>}
        {isHost&&!allReady&&<button className="secondary wide" onClick={()=>{if(confirm('สรุปผลเลยโดยไม่รอคนที่ยังไม่ยืนยัน?'))finishVote()}}>สรุปผลเลย (ไม่รอ)</button>}</>})()}
      {room.status==='result'&&!G.type&&room.result&&(()=>{const R=room.result;const spyWins=R.spyWins??!R.caught;const tally=players.map(p=>({p,n:R.votes?.[p.id]||0})).sort((a,b)=>b.n-a.n);return <><span className="eyebrow">ผลการจับโป๊ะ</span><h2>{spyWins?'สายลับชนะ! 😭':'จับสายลับได้! 🎉'}</h2><div className="result-card"><div className="big-emoji">{spyWins?'🫠':'🏆'}</div>
        <p>สายลับคือ <b>{nameOf(R.spyId)}</b></p><p>{I}จริงคือ <b>{room.round?.place}</b></p>
        {R.guess!==undefined&&<p>สายลับเดาว่า “<b>{R.guess||'ไม่ได้เดา'}</b>” — {R.guessCorrect?'เดาถูก! 😱':'เดาผิดจ้า'}</p>}
        <p className="voted-out">{R.votedOut?<>ถูกโหวตออก: <b>{nameOf(R.votedOut)}</b> ({R.votes?.[R.votedOut]||0} โหวต • {R.majority?'เกินครึ่ง':'มากที่สุด'}){R.caught?' — โดนตัวสายลับ!':' — ไม่ใช่สายลับ'}</>:'คะแนนเสมอหรือไม่มีใครโหวต ไม่มีใครถูกโหวตออก'}</p>
        {R.caught&&R.guessCorrect&&<p className="hint">จับสายลับได้ แต่สายลับเดา{I}ถูก เลยพลิกกลับมาชนะ</p>}
        <h4 className="ballot-title">🏅 ตารางคะแนนสะสม</h4><ol className="leaderboard">{[...players].sort((a,b)=>(scores[b.id]||0)-(scores[a.id]||0)).map((p,i)=>{const d=R.points?.[p.id]||0;return <li key={p.id} className={p.id===myId?'me':''}><span className="rank">{['🥇','🥈','🥉'][i]||i+1}</span><span className="lb-name">{p.name}{p.id===R.spyId&&' 🕵️'}</span>{R.points&&<em className={d>0?'up':''}>{d>0?'+'+d:'±0'}</em>}<b>{scores[p.id]||0}</b></li>})}</ol>
        <h4 className="ballot-title">คะแนนโหวต</h4><ul className="tally">{tally.map(({p,n})=><li key={p.id} className={p.id===R.votedOut?'out':''}><span>{p.name}</span><i style={{width:`${players.length?n/players.length*100:0}%`}}/><b>{n} โหวต</b></li>)}</ul>
        <h4 className="ballot-title">ใครโหวตใคร</h4><ul className="ballots">{players.map(p=>{const t=(R.ballots||{})[p.id];return <li key={p.id}><span>{p.name}{p.id===R.spyId&&' 🕵️'}</span><span className="arrow">→</span><b className={t&&t===R.spyId?'hit':''}>{t?nameOf(t):'ไม่ได้โหวต'}</b></li>})}</ul>
        <h4 className="ballot-title">บทบาทของแต่ละคน</h4><ul className="role-list">{players.map(p=>{const r=room.round?.roles?.[p.id];return <li key={p.id}><span>{p.name}</span><b className={r?.type==='spy'?'spy':''}>{r?.type==='spy'?'🕵️ สายลับ':(r?.role||(G.roles?'-':'ชาวบ้าน'))}</b></li>})}</ul>
        </div>{isHost?<button className="primary wide" onClick={backToLobby}><RotateCcw size={17}/> กลับห้องรอแล้วเล่นรอบใหม่</button>:<div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}</>})()}
      {G.type==='head'&&room.status!=='lobby'&&room.round&&<HeadGame room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} nameOf={nameOf} msg={msg} onBack={backToLobby}/>}
      {G.type==='explore'&&room.status==='lobby'&&(()=>{const n=players.length,ok=n>=EXPLORE_MIN;const sz=ok?teamSizes(n):null,nf=ok?needFails(n):null;return <><span className="eyebrow">พร้อมยัง?</span><h2>รวมคณะให้ครบ แล้วออกเดินทาง</h2>
        <p className="hint">เล่นได้ {EXPLORE_MIN}–12 คน • โจรขุดสมบัติราว 1 ใน 3 ของวง • คุยกันทางเสียงระหว่างเลือกคณะ</p>
        {ok&&<div className="score-rules"><b>🗺️ วงนี้ {n} คน</b><span>โจร {traitorCount(n)} คน • นักสำรวจ {n-traitorCount(n)} คน</span><span>จำนวนคนต่อด่าน: {sz.map((s,i)=>nf[i]>1?`${s}*`:s).join(' → ')}{nf.some(x=>x>1)&&' (* ต้องก่อวินาศ 2 ใบถึงพัง)'}</span><span>ค้านคณะติดกัน {MAX_REJECT} ครั้ง = โจรชนะ</span></div>}
        <div className="score-rules"><b>🎭 บทบาทพิเศษ</b>
          <span>🏮 ผู้ถือตะเกียง (ฝ่ายดี มีทุกตา) — รู้ตั้งแต่แรกว่าใครเป็นโจร แต่ถ้านักสำรวจผ่าน 3 ด่าน โจรได้ชี้ตัว 1 ครั้ง ชี้ถูก = โจรพลิกชนะ</span>
          <label className="cat-toggle"><input type="checkbox" className="tick" checked={exOpts.mole} disabled={!isHost} onChange={e=>setExOpts(o=>({...o,mole:e.target.checked}))}/> 🐍 จอมแฝงตัว (ฝ่ายโจร) — ผู้ถือตะเกียงมองไม่เห็น</label></div>
        <div className="score-rules"><b>🏅 คะแนน</b><span>นักสำรวจชนะ: ฝ่ายนักสำรวจคนละ +{EXPLORE_SCORE.good}</span><span>โจรชนะ: ฝ่ายโจรคนละ +{EXPLORE_SCORE.bad}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>
        {outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}
        {isHost?<button className="primary wide" disabled={!ok||outdated.length>0} onClick={startGame}>🧭 ออกเดินทาง ({n} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องเริ่มเกมอยู่เด้อ</div>}</>})()}
      {G.type==='explore'&&room.status!=='lobby'&&room.round?.kind==='explore'&&<ExploreGame db={db} room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} beep={beep} nameOf={nameOf} msg={msg} onBack={backToLobby}/>}
      {G.type==='wolf'&&room.status==='lobby'&&(()=>{const n=players.length,ok=n>=WOLF_MIN;const k=wolfCount(n);const hunter=wfOpts.hunter&&n>=6;return <><span className="eyebrow">พร้อมยัง?</span><h2>หมู่บ้านนี้…มีหมาป่าปนอยู่</h2>
        <p className="hint">เล่นได้ {WOLF_MIN}–12 คน • ระบบเป็นผู้ดำเนินเกม ทุกคนดูจอตัวเอง แล้วคุยกันทางเสียง</p>
        {ok&&<div className="score-rules"><b>🎭 บทบาทในวงนี้ ({n} คน)</b><span>🐺 หมาป่า {k} • 🔮 หมอดู 1 • 💉 หมอยา 1{hunter?' • 🏹 นายพราน 1':''} • 🧑‍🌾 ชาวบ้าน {n-k-2-(hunter?1:0)}</span></div>}
        <div className="score-rules"><b>⚙️ ตั้งค่า</b>
          <label className="cat-toggle"><input type="checkbox" className="tick" checked={wfOpts.hunter} disabled={!isHost} onChange={e=>setWfOpts(o=>({...o,hunter:e.target.checked}))}/> 🏹 มีนายพราน (6 คนขึ้นไป) — ตายแล้วยิงพาไปด้วย 1 คน</label>
          <label className="cat-toggle"><input type="checkbox" className="tick" checked={wfOpts.reveal} disabled={!isHost} onChange={e=>setWfOpts(o=>({...o,reveal:e.target.checked}))}/> 🪦 เปิดบทบาทคนที่ตาย</label></div>
        <div className="score-rules"><b>🏅 คะแนน</b><span>ชาวบ้านชนะ: ฝ่ายชาวบ้านคนละ +{WOLF_SCORE.village} (รวมคนที่ตายไปแล้ว)</span><span>หมาป่าชนะ: หมาป่าคนละ +{WOLF_SCORE.wolf}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>
        {outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}
        {isHost?<button className="primary wide" disabled={!ok||outdated.length>0} onClick={startGame}>🌙 เริ่มคืนแรก ({n} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องเริ่มเกมอยู่เด้อ</div>}</>})()}
      {G.type==='wolf'&&room.status!=='lobby'&&room.round?.kind==='wolf'&&<WolfGame db={db} room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} beep={beep} nameOf={nameOf} onBack={backToLobby}/>}
      </section></div>
      {!G.type&&(room.status==='playing'||room.status==='voting')&&room.round&&<PlaceBoard key={roomCode+'-'+room.round.number} places={room.round.pool||[]} I={I} U={U}/>}
      {room.status==='lobby'&&!['explore','wolf'].includes(G.type)&&<PlacePicker I={I} U={U} packs={packs} isOn={isOn} packOnCount={packOnCount} total={placePool.length} canEdit={canEdit} onTogglePlace={togglePlace} onTogglePack={togglePack} onSetAll={setAll} onAddPlace={addPlace}/>}
      {isHost&&room.status==='lobby'&&!['explore','wolf'].includes(G.type)&&<section className="panel pack-panel"><h2><MapPin size={20}/> สร้างชุด{I}ใหม่</h2><p>สร้างชุด{I}เฉพาะแก๊งได้ เช่น มุกในกลุ่ม เพื่อนในห้อง หรือร้านประจำ</p><div className="pack-form"><div><label>ชื่อชุด</label><input value={packName} onChange={e=>setPackName(e.target.value)} placeholder="เช่น มุกในแก๊งเรา"/></div><div><label>{I} (หนึ่งบรรทัดต่อหนึ่ง{U})</label><textarea rows="4" value={packPlaces} onChange={e=>setPackPlaces(e.target.value)} placeholder={'บ้านไอ้บอส\nร้านหมูกระทะร้านเดิม\nห้องเรียนคาบเช้า'}/></div><button className="secondary" onClick={addPack}><Plus size={16}/> สร้างชุดนี้</button></div></section>}
    </main>}
    <footer><span>🎲 {BRAND} • เวอร์ชัน {APP_VERSION}</span><span>ทำมาให้แก๊งเพื่อนจับโป๊ะกัน 🇹🇭</span></footer>
  </div>
}
function HeadGame({room,roomCode,myId,players,isHost,scores,sound,nameOf,msg,onBack}){
  const r=room.round;const [g,setG]=useState('');
  const order=(r.order||[]).filter(id=>room.players?.[id]);const solved=r.solved||{};
  const turnId=(r.order||[])[r.turn];const myTurn=room.status==='playing'&&turnId===myId&&!solved[myId];
  const log=Object.entries(r.log||{}).sort((a,b)=>b[0].localeCompare(a[0])).map(x=>x[1]);
  const medal=n=>['🥇','🥈','🥉'][n-1]||`#${n}`;
  useEffect(()=>{if(myTurn&&sound)beep(880,.15)},[myTurn]);
  // เลื่อนตาไปคนถัดไปที่ยังไม่ทายถูก ถ้าทายถูกครบทุกคนแล้วจบเกมและบวกคะแนน
  function step(cur,entry){
    const rd=cur.round;const sv=rd.solved||{};const here=(rd.order||[]).filter(id=>cur.players?.[id]);
    const lg={...(rd.log||{})};let n0=0;const k=()=>`${Date.now()}_${n0++}`;
    if(entry)lg[k()]=entry;
    rd.log=lg;
    if(here.every(id=>sv[id]))return finish(cur);
    const n=(rd.order||[]).length;let t=rd.turn;
    for(let i=1;i<=n;i++){const id=rd.order[(rd.turn+i)%n];if(cur.players?.[id]&&!sv[id]){t=(rd.turn+i)%n;break}}
    rd.turn=t;return cur;
  }
  function finish(cur){
    const rd=cur.round;const sv=rd.solved||{};const n=(rd.order||[]).filter(id=>cur.players?.[id]).length;const points={},sc={...(cur.scores||{})};
    Object.keys(cur.players||{}).forEach(id=>{points[id]=sv[id]?Math.max(0,n-sv[id]):0;sc[id]=(sc[id]||0)+points[id]});
    cur.status='result';cur.scores=sc;cur.result={type:'head',points};return cur;
  }
  const tx=f=>runTransaction(ref(db,`rooms/${roomCode}`),cur=>{if(!cur||cur.status!=='playing'||!cur.round)return;return f(cur)});
  async function guess(){const t=g.trim();if(!t){msg('พิมพ์คำที่คิดว่าใช่ก่อน');return}let ok=false;
    await tx(cur=>{const rd=cur.round;if(rd.order[rd.turn]!==myId||rd.solved?.[myId])return;ok=HEAD_NORM(t)===HEAD_NORM(rd.words?.[myId]);
      if(ok){rd.solved={...(rd.solved||{}),[myId]:Object.keys(rd.solved||{}).length+1}}
      return step(cur,{type:'guess',by:myId,text:t,ok})});
    setG('');msg(ok?'ถูกต้อง! 🎉 นั่งชิล ๆ ช่วยเพื่อนตอบต่อได้':'ยังไม่ใช่ 😅 ไว้ลองใหม่ตาหน้า');if(sound)beep(ok?980:220,.25)}
  async function pass(byHost){await tx(cur=>{const rd=cur.round;const who=rd.order[rd.turn];if(!byHost&&who!==myId)return;return step(cur,{type:'pass',by:who,host:!!byHost})})}
  async function accept(pid){if(!confirm(`นับว่า ${nameOf(pid)} ทายถูก?`))return;
    await tx(cur=>{const rd=cur.round;if(rd.solved?.[pid])return;rd.solved={...(rd.solved||{}),[pid]:Object.keys(rd.solved||{}).length+1};
      const lg={...(rd.log||{})};lg[`${Date.now()}_ok`]={type:'accept',by:pid};rd.log=lg;
      if((rd.order||[]).filter(id=>cur.players?.[id]).every(id=>rd.solved[id]))return finish(cur);
      if(rd.order[rd.turn]===pid)return step(cur,null);return cur})}
  async function endNow(){if(!confirm('จบเกมเลย? คนที่ยังทายไม่ได้จะได้ 0 แต้ม'))return;await tx(cur=>finish(cur))}
  const res=room.status==='result'&&room.result;
  return <div className="head-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">หมวด: {r.cat}</span></div>
    {!res&&<h2>{solved[myId]?`คุณทายถูกแล้ว ${medal(solved[myId])} — ช่วยเพื่อนตอบต่อ`:myTurn?'ถึงตาคุณแล้ว! 🎯':`ตาของ ${nameOf(turnId)}`}</h2>}
    {res&&<h2>จบเกมแล้ว! 🏁</h2>}
    <div className="head-grid">{order.map(id=>{const mine=id===myId,sv=solved[id],show=!mine||sv||res;
      return <div key={id} className={'head-card'+(id===turnId&&!res?' turn':'')+(sv?' solved':'')+(mine?' me':'')}>
        <small>{nameOf(id)}{mine&&' (คุณ)'}{id===turnId&&!res&&' • กำลังเล่น'}</small>
        <b>{show?r.words?.[id]:'❓ ???'}</b>
        {sv?<span className="head-rank">{medal(sv)}{res&&` +${room.result.points?.[id]||0}`}</span>:res?<span className="head-rank miss">ยังทายไม่ได้</span>:null}
      </div>})}</div>
    {myTurn&&<div className="head-actions">
      <div className="add-place"><input value={g} list="head-pool" onChange={e=>setG(e.target.value)} onKeyDown={e=>e.key==='Enter'&&guess()} placeholder="ทายคำของคุณ (ทายได้ 1 ครั้งต่อตา)"/><datalist id="head-pool">{(r.pool||[]).map(w=><option key={w} value={w}/>)}</datalist><button className="primary" onClick={guess}>🎯 ทาย</button></div>
      <button className="secondary wide" onClick={()=>pass(false)}>⏭️ ยังไม่ชัวร์ ข้ามตา</button></div>}
    {!res&&isHost&&<div className="head-host">{turnId!==myId&&<button className="link-btn" onClick={()=>pass(true)}>ข้ามตา {nameOf(turnId)}</button>}<button className="link-btn" onClick={endNow}>จบเกมเลย</button></div>}
    {res&&<><h4 className="ballot-title">🏅 ตารางคะแนนสะสม</h4><ol className="leaderboard">{[...players].sort((a,b)=>(scores[b.id]||0)-(scores[a.id]||0)).map((p,i)=>{const d=room.result.points?.[p.id]||0;return <li key={p.id} className={p.id===myId?'me':''}><span className="rank">{['🥇','🥈','🥉'][i]||i+1}</span><span className="lb-name">{p.name}</span><em className={d>0?'up':''}>{d>0?'+'+d:'±0'}</em><b>{scores[p.id]||0}</b></li>})}</ol>
      {isHost?<button className="primary wide" onClick={onBack}><RotateCcw size={17}/> กลับห้องรอแล้วเล่นรอบใหม่</button>:<div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}</>}
    {log.length>0&&<><h4 className="ballot-title">📜 บันทึกเกม</h4><ul className="head-log">{log.map((e,i)=><li key={i}>
            {e.type==='guess'&&<><b>{nameOf(e.by)}</b> ทาย “{e.text}” — {e.ok?<span className="ok">ถูก! 🎉</span>:<span className="bad">ผิด</span>}{!e.ok&&isHost&&!res&&!solved[e.by]&&<button className="link-btn" onClick={()=>accept(e.by)}>นับว่าถูก</button>}</>}
      {e.type==='pass'&&<><b>{nameOf(e.by)}</b> {e.host?'ถูก host ข้ามตา':'ข้ามตา'}</>}
      {e.type==='accept'&&<><b>{nameOf(e.by)}</b> — host นับว่าทายถูก ✅</>}
    </li>)}</ul></>}
  </div>;
}
function PlaceBoard({places,I,U}){
  const [cut,setCut]=useState({});const left=places.filter(p=>!cut[p]).length;
  return <section className="panel board">
    <div className="picker-head"><div><h2><MapPin size={20}/> {I}ที่เป็นไปได้</h2><p>แตะเพื่อขีดฆ่าที่ที่ตัดทิ้ง แตะอีกครั้งเพื่อเอากลับ (เห็นแค่คุณคนเดียว)</p></div>
      <div className="picker-total"><b>{left}</b><small>/ {places.length} {U}</small></div></div>
    {Object.keys(cut).length>0&&<div className="picker-bulk"><button className="secondary" onClick={()=>setCut({})}>ล้างการขีดฆ่า</button></div>}
    {places.length===0?<p className="hint">รอบนี้ไม่มีรายการ{I} (เริ่มเกมจากเวอร์ชันเก่า)</p>:
    <div className="board-grid">{places.map(pl=><button key={pl} className={'board-item'+(cut[pl]?' cut':'')} onClick={()=>setCut(c=>{const n={...c};if(n[pl])delete n[pl];else n[pl]=true;return n})}>{pl}</button>)}</div>}
  </section>;
}
function Tick({checked,partial,onChange,disabled,label}){
  const r=useRef(null);useEffect(()=>{if(r.current)r.current.indeterminate=!!partial},[partial]);
  return <input ref={r} type="checkbox" className="tick" checked={!!checked} disabled={disabled} onChange={onChange} aria-label={label}/>;
}
function PlacePicker({I,U,packs,isOn,packOnCount,total,canEdit,onTogglePlace,onTogglePack,onSetAll,onAddPlace}){
  const [open,setOpen]=useState(null);const [draft,setDraft]=useState('');
  const all=packs.reduce((n,p)=>n+(p.places?.length||0),0);
  async function submit(pi){if(await onAddPlace(pi,draft))setDraft('')}
  return <section className="panel picker">
    <div className="picker-head"><div><h2><MapPin size={20}/> เลือก{I}ที่จะสุ่ม</h2><p>{canEdit?`ติ๊กทั้งชุด หรือกดเปิดชุดแล้วติ๊กออกทีละที่ เพิ่ม${I}เองได้ด้วย`:`หัวหน้าห้องเป็นคนเลือก${I}`}</p></div>
      <div className="picker-total"><b>{total}</b><small>/ {all} {U}</small></div></div>
    {canEdit&&<div className="picker-bulk"><button className="secondary" onClick={()=>onSetAll(true)}>✓ เลือกทั้งหมด</button><button className="secondary" onClick={()=>onSetAll(false)}>ล้างทั้งหมด</button></div>}
    <div className="pack-rows">{packs.map((p,pi)=>{const n=p.places?.length||0,c=packOnCount(pi),isOpen=open===pi;
      return <div className={'pack-row'+(isOpen?' open':'')+(c===0?' none':'')} key={pi}>
        <div className="pack-row-head">
          <Tick checked={c===n&&n>0} partial={c>0&&c<n} disabled={!canEdit} onChange={()=>onTogglePack(pi)} label={'เลือกทั้งชุด '+p.name}/>
          <button className="pack-open" onClick={()=>{setOpen(isOpen?null:pi);setDraft('')}}><span className="pack-name">{p.name}</span><span className="pack-count">{c}/{n}</span><ChevronDown size={18} className="chev"/></button>
        </div>
        {isOpen&&<div className="pack-body">
          <div className="place-grid">{(p.places||[]).map((pl,qi)=><label key={qi} className={'place'+(isOn(pi,qi)?'':' off')}><Tick checked={isOn(pi,qi)} disabled={!canEdit} onChange={()=>onTogglePlace(pi,qi)} label={pl}/><span>{pl}</span></label>)}</div>
          {canEdit&&<div className="add-place"><input value={draft} maxLength={40} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit(pi)} placeholder={`พิมพ์${I}เพิ่มในชุด “`+p.name+'”'}/><button className="primary" onClick={()=>submit(pi)}><Plus size={16}/> เพิ่ม</button></div>}
        </div>}
      </div>})}</div>
  </section>;
}
createRoot(document.getElementById('root')).render(<App/>);
