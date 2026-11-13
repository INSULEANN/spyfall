import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, onValue, remove, runTransaction, onDisconnect, serverTimestamp, query, orderByChild, endAt, startAt, limitToFirst, push, onChildAdded } from 'firebase/database';
import { ArrowLeft, ChevronDown, Copy, Users, Plus, DoorOpen, MapPin, Clock3, Volume2, VolumeX, RotateCcw, Vote, Eye, EyeOff, Laugh, Sparkles, LogOut } from 'lucide-react';
import './style.css';
import './themes.css';
import './play.css';
import './effects.css';
import './desktop.css';
import { Art } from './play-art.jsx';
import { makeAv, Avatar, Voters, Phase, Steps, PlayerGrid, WhoDone, RoleCard, Outcome, RevealGrid, Leaderboard, Ballots, HostBar, SecH, Choice, Ambient, TimerRing, AVATARS, freeAv, AvFace, AvatarPicker } from './ui.jsx';
import { SceneArt, HubArt, BrandMark } from './art.jsx';
import { play as sfx, setSfxTheme, setSfxVolume } from './sfx.js';
import { setMusic, setMusicVolume, trackName } from './music.js';
import { ROLES, GENERIC_ROLES } from './roles.js';
import { SPY_PACKS } from './spyWords.js';
import { HEAD_PACKS } from './headWords.js';
import VoicePanel from './voice.jsx';
import { ExploreGame, makeExploreRound, teamSizes, traitorCount, needFails, EXPLORE_MIN, EXPLORE_SCORE, MAX_REJECT } from './explore.jsx';
import { WolfGame, makeWolfRound, wolfPlan, WOLF_MIN, WOLF_SCORE } from './werewolf.jsx';
import { CakeGame, makeCakeRound, hourAt, accCount, CAKE_MIN, CAKE_SCORE, HOURS } from './cake.jsx';
import { BoomGame, BoomLobby, makeBoomRound, BOOM_MIN, BOOM_MAX, BOOM_SCORE } from './boom.jsx';
import { CurseGame, CurseLobby, makeCurseRound, CURSE_MIN, CURSE_MAX, CURSE_SCORE } from './curse.jsx';
import { TamGame, TamLobby, makeTamRound, TAM_MIN, TAM_MAX, TAM_SCORE, MERCY } from './tam.jsx';
import { DealGame, DealLobby, makeDealRound, DEAL_MIN, DEAL_MAX, DEAL_SCORE } from './deal.jsx';
import { CheckpointGame, CheckpointLobby, makeCpRound, lapsFor, CP_MIN, CP_MAX, CP_SCORE } from './checkpoint.jsx';
import { ClueTurns, CallVote } from './spyturns.jsx';
import { SpyStage, HeadStage, LobbyStage } from './stages.jsx';
import { CakeStage } from './cakestage.jsx';
import IntroFilm, { INTROS, INTRO_LEAD } from './intro.jsx';
import { pick, shuffle, pickBad, readHist } from './rand.js';

// เลขเวอร์ชันที่โชว์บนหน้าเว็บ — เปลี่ยนทุกครั้งที่อัปเดต (1.0 → 1.1 → 1.2 …)
const APP_VERSION = '1.25';

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
  cake: { id:'cake', type:'cake', name:'เค้กหายไปไหน', emoji:'🍰', packs:[], item:'เค้ก', unit:'ชิ้น', roles:true, min:CAKE_MIN, h1:['เค้กหายไปไหน','ใครแอบกิน'], art:'🍰', float:'ตีสามเธอตื่นมาทำไม?',
    blurb:'รูมเมททอยเต๋าตื่นกลางดึก ตี 1–6 ดูว่าเค้กในตู้เย็นยังอยู่ไหม แล้วตอนเช้าโหวตจับจอมแอบกินและลูกสมุน',
    lead:'กลางดึกทุกคนตื่นตามเลขเต๋า เห็นแค่คนที่ตื่นเวลาเดียวกัน…ใครเห็นเค้กยังอยู่ ใครเห็นขโมยถือเค้กคามือ? ตอนเช้าช่วยกันปะติดปะต่อเวลาแล้วจับขโมย',
    pills:['🎲 ทอยเต๋าตื่น','🌙 คุยเฉพาะคนตื่น','😈 ลูกสมุน'],
    how:[['ทอยเต๋า','ทุกคนได้เลข 1–6 = ตื่นตอนตีนั้น เห็นเฉพาะคนที่ตื่นเวลาเดียวกันและคุยกันได้ คนตื่นคนเดียวแอบดูเต๋าคนอื่นได้ 1 คน'],['เค้กหาย','จอมแอบกินกินเค้กตอนตีของตัวเอง แล้วเลือกลูกสมุนมาเป็นพวก คนที่ตื่นก่อนเห็นเค้ก ตื่นทีหลังเห็นตู้เย็นว่าง'],['โหวตจับขโมย','ตอนเช้าเอาเวลามาปะติดปะต่อ โหวตถูกตัว ฝ่ายหิวโหยได้คนละ 1 ผิดคนหรือเสมอ ขโมยได้ 2 ลูกสมุนได้ 1']] },
  boom: { id:'boom', type:'boom', name:'ทุเรียนตูม!', emoji:'💥', packs:[], item:'ไพ่', unit:'ใบ', roles:false, min:BOOM_MIN, max:BOOM_MAX, h1:['ทุเรียนตูม!','ใครจั่วโดน…ตกรอบ'], art:'💥', float:'ใบต่อไป…ตูมไหม?',
    blurb:'ผลัดกันจั่วไพ่จากกอง ใครจั่วได้ทุเรียนตูมแล้วไม่มีที่หนีบจมูก ตกรอบทันที! ใช้ไพ่หลบ โยน ส่อง สับ ขโมย เอาตัวรอดให้เป็นคนสุดท้าย',
    lead:'กองไพ่นี้มีทุเรียนตูมซ่อนอยู่…จั่วทีละใบ ลุ้นทุกตา ใช้ไพ่ส่องแผง โยนให้เพื่อน หรือกด “ไม่เอา!” สวนกลับ รอดคนสุดท้ายชนะ',
    pills:['🃏 เกมไพ่','💥 ลุ้นทุกตา','🙅 ไม่เอา!'],
    how:[['จั่วเพื่อจบตา','ตาของคุณเล่นไพ่กี่ใบก็ได้ (หรือไม่เล่นเลย) แล้วจั่ว 1 ใบเพื่อจบตา จั่วได้ทุเรียนตูม = ตกรอบ ถ้าไม่มีที่หนีบจมูก'],['หนีบจมูกแล้วซ่อนคืน','มีที่หนีบจมูกรอดได้ 1 ครั้ง แล้วแอบใส่ทุเรียนกลับในกองตรงไหนก็ได้ เพื่อนไม่รู้ว่าอยู่ใบไหน'],['หลบ โยน สวน','ขอผ่าน โยนให้เพื่อน ส่องแผง เขย่าแผง ขโมยด้วยผลไม้คู่ และ “ไม่เอา!” ยกเลิกไพ่ใครก็ได้ทุกเมื่อ']] },
  curse: { id:'curse', type:'curse', name:'จับผีปอป', emoji:'👻', packs:[], item:'ไพ่', unit:'ใบ', roles:true, min:CURSE_MIN, max:CURSE_MAX, h1:['จับผีปอป','ใครถูกปอปสิง?'], art:'👻', float:'เมื่อคืนใครแอบออกจากบ้าน?',
    blurb:'บ้านนาดงมีผีปอปสิงอยู่ในร่างชาวบ้าน ทุกคนถือไพ่ดวงคว่ำไว้ ผลัดกันซุบซิบใส่ความ ครบ 7 แต้มต้องเปิดดวง ระวังคืนเดือนดับ ปอปออกหากิน!',
    lead:'ไม่มีใครรู้ว่าใครถูกปอปสิง…ซุบซิบ หาหลักฐาน ใส่ความกันให้ครบ 7 แต้มแล้วเปิดไพ่ดวง ส่วนผีปอปจะออกหากินตับตอนคืนเดือนดับ หมอธรรมช่วยได้แค่คืนละคน',
    pills:['🃏 เกมไพ่','👻 ผีปอป','📿 หมอธรรม'],
    how:[['ไพ่ดวงคว่ำ','ทุกคนได้ไพ่ดวง 2–4 ใบคว่ำไว้ ใครมี “ปอปสิง” คือผีปอป (รู้จักกันเอง) มีหมอธรรม 1 คนคอยคุ้มกันชาวบ้าน'],['ซุบซิบใส่ความ','ตาของคุณ จั่ว 2 ใบ หรือ เล่นไพ่: แดงใส่ความสงสัย เขียวใช้ทันที ฟ้าติดตัว ใครโดนครบ 7 แต้ม คนใส่ต้องเลือกเปิดไพ่ดวงของเขา 1 ใบ'],['คืนเดือนดับ','จั่วได้คืนเดือนดับ ทุกคนหลับ ผีปอปออกหากิน เลือกเหยื่อ หมอธรรมคุ้มกัน ใครกลัวตายสาบานตนเปิดดวงได้ เปิดปอปสิงได้ครบ ชาวบ้านชนะ']] },
  tam: { id:'tam', type:'tam', name:'ตำแหลก!', emoji:'🌶️', packs:[], item:'ไพ่', unit:'ใบ', roles:false, min:TAM_MIN, max:TAM_MAX, h1:['ตำแหลก!','ไพ่โหดไม่เลี้ยง'], art:'🌶️', float:'+10 ไหวไหม?',
    blurb:'ไพ่ 4 รส เผ็ด เปรี้ยว หวาน เค็ม ลงให้ตรงรสหรือตรงเลข ใครหมดมือก่อนชนะ แต่ระวัง! ไพ่บวกซ้อนกันได้ไม่จำกัด ถือไพ่ถึง 25 ใบตกรอบทันที',
    lead:'ตำให้แหลก! ลงไพ่ตรงรสตรงเลข ซ้อน +2 +4 +6 +10 ใส่เพื่อน 7 แลกมือ 0 ส่งไพ่ทั้งวง สุ่มรสใส่คนถัดไป ใครถือไพ่ถึง 25 ใบ เผ็ดจนทนไม่ไหว ตกรอบ!',
    pills:['🃏 เกมไพ่','🔥 ซ้อน +10','🥵 25 ใบตกรอบ'],
    how:[['ลงให้ตรง','ลงไพ่ที่รสหรือเลขตรงกับใบบนกอง ไพ่ดำลงได้ทุกเมื่อแล้วเลือกรสใหม่ ไม่มีให้ลงต้องจั่วไปเรื่อย ๆ จนกว่าจะได้ใบที่ลงได้'],['ซ้อนไพ่บวก','โดน +2 +4 +6 +10 ซ้อนไพ่บวกที่เท่ากันหรือมากกว่าส่งต่อได้ ไม่งั้นต้องรับทั้งหมด'],['โหดไม่เลี้ยง','7 แลกมือ • 0 ส่งไพ่ทั้งวง • เหมาร้านข้ามทุกคน • เทกระจาดทิ้งทั้งรส • ถือไพ่ถึง 25 ใบตกรอบ • หมดมือก่อนหรือรอดคนสุดท้ายชนะ']] },
  deal: { id:'deal', type:'deal', name:'ปิดดีล!', emoji:'💼', packs:[], item:'ดีล', unit:'ดีล', roles:false, min:DEAL_MIN, max:DEAL_MAX, h1:['ปิดดีล!','ใครคุมดีล ใครรวย'], art:'💼', float:'ดีลนี้แบ่งกันยังไง?',
    blurb:'เกมเจรจาธุรกิจ! เดินหมวกเจ้าสัวไปเจอดีล รวบรวมหุ้นส่วนให้ครบ ต่อรองแบ่งเงินให้ทุกคนยอม แต่ระวังเพื่อนแย่งดีล กันหุ้นส่วน หรือส่งเด็กเส้นมาแทรก',
    lead:'ธนาคาร รับเหมา สื่อ ทนาย ขนส่ง ไอที — ใครคุมหุ้นส่วนไหน ดีลไหนต้องใช้ใคร เจ้าของดีลต้องเสนอส่วนแบ่งให้ถูกใจทุกคน ระหว่างนั้นใครก็ขัดขาได้ ทอยโดนเลขการ์ดจบเกม (เริ่มเปิดหลังปิดครบ 5 ดีล ทุก 5 ตา) หรือปิดดีลครบทุกช่อง = จบ ใครรวยสุดชนะ',
    pills:['🤝 เจรจาต่อรอง','🎩 แย่งดีล','💰 ใครรวยสุดชนะ'],
    how:[['เดินไปเจอดีล','ตาของคุณ ทอยเต๋าเดินหมวกเจ้าสัวไปเจอดีล แล้วคุณเป็นเจ้าของดีลนั้น หรือจะจั่วการ์ด 2 ใบแทนก็ได้'],['รวบรวมหุ้นส่วน','แต่ละดีลมีหุ้นส่วนจำเป็น + กลุ่มตัวเลือก (เจ้าของดีลเลือกเองว่าจะเอาใคร) คนที่คุมหุ้นส่วนนั้นต้องเข้าดีล ช่องดีลเป็นตัวคูณ ×N = แบ่ง N ส่วน เจ้าของดีลเสนอแบ่งส่วน ทุกคนกดตกลงครบ = ปิดดีล แล้วเปิดการ์ดเงินสุ่มมาคูณ'],['ขัดขาได้ทุกเมื่อ','ระหว่างเจรจา ใครก็เล่นการ์ดได้: แย่งเป็นเจ้าของดีล กันหุ้นส่วน ส่งเด็กเส้นเข้าแทน หรือซื้อกิจการหุ้นส่วนมาเป็นของตัวเอง']] },
  checkpoint: { id:'checkpoint', type:'checkpoint', name:'จ่าตรวจวัยรุ่นทรงเอ', emoji:'👮', packs:[], item:'กระเป๋า', unit:'ใบ', roles:false, min:CP_MIN, max:CP_MAX, h1:['จ่าตรวจ','วัยรุ่นทรงเอ'], art:'👮', float:'ในกระเป๋ามีอะไรน้อง?',
    blurb:'ด่านตรวจตีสอง! วัยรุ่นยัดของใส่กระเป๋าแล้วบอกจ่าว่า “หมูปิ้งครับ” จริงหรือโกหกก็ได้ ยื่นซองต่อรองกันสด ๆ จ่าจะเปิดตรวจหรือปล่อยผ่าน?',
    lead:'ทุกคนผลัดกันเป็นจ่าเวร ที่เหลือเป็นวัยรุ่นทรงเอขี่มอไซค์ผ่านด่าน ยัดหมูปิ้ง ชานมไข่มุก หรือแอบซุกท่อซิ่ง ลำโพงเสียงแตก ประทัด แล้วตีหน้าซื่อ…จ่าเปิดเจอของโกหก = โดนปรับ เปิดเจอของจริง = จ่าต้องจ่ายค่าเสียเวลา',
    pills:['🎒 ยัดกระเป๋า','🤥 โกหกได้','💸 ยื่นซอง'],
    how:[['ยัดกระเป๋า','วัยรุ่นแลกการ์ดที่แผงลอย แล้วยัดการ์ด 1–5 ใบใส่กระเป๋า บอกจ่าว่าเป็นของอะไร จำนวนต้องตรง แต่ชนิดโกหกได้ ของเถื่อนแพงกว่าแต่เสี่ยง'],['ต่อรองหน้าด่าน','ยื่นซองเป็นเงินหรือของบนแผง จ่าเรียกเพิ่มได้ ทุกคนเห็นข้อเสนอทันที คุยกันผ่านห้องเสียงจะมันสุด'],['เปิดหรือปล่อย','จ่าเปิดเจอโกหก = วัยรุ่นโดนปรับ + ยึดของ เจอของจริง = จ่าจ่ายค่าเสียเวลา ปล่อยผ่าน = รับซอง จบเกมนับราคาของ + โบนัสคนมีของมากสุด + เงิน']] },
};
// เทียบคำตอบแบบไม่สนตัวพิมพ์ เว้นวรรค และเครื่องหมายเน้นเสียง (Mbappe = Mbappé)
const GUESS_NORM = s => String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[\s\-.'’]/g,'');
// ข้อความตกแต่งเฉพาะแต่ละเกม (ป้ายบนภาพ หัวข้อ)
const COPY = {
  spyfall:{stamp:'ห้ามโป๊ะ!',floatSub:'ถามแบบมีชั้นเชิง',joinH:'รวมแก๊งให้ครบ แล้วค่อยจับโป๊ะ',howH:'เล่นยังไง ไม่ให้โป๊ะ?'},
  spy:{stamp:'TOP SECRET',floatSub:'ใบ้อ้อม ๆ อย่าให้สายลับรู้',joinH:'เรียกเอเจนต์เข้าห้องลับ',howH:'คู่มือเอเจนต์'},
  headword:{stamp:'ห้ามแอบดู!',floatSub:'ถามได้แค่ ใช่ / ไม่ใช่',joinH:'ชวนแก๊งมาแปะคำบนหัว',howH:'เล่นยังไง?'},
  explore:{stamp:'ระวังโจร!',floatSub:'เลือกคณะให้ดี',joinH:'รวมคณะนักสำรวจ',howH:'คู่มือนักสำรวจ'},
  werewolf:{stamp:'อย่าออกจากบ้าน!',floatSub:'ใครโกหก ใครพูดจริง',joinH:'รวมชาวบ้านก่อนพระอาทิตย์ตก',howH:'กฎของหมู่บ้าน'},
  cake:{stamp:'ห้ามแตะเค้ก!',floatSub:'จำเวลาที่ตื่นไว้ให้ดี',joinH:'ชวนรูมเมทเข้าบ้าน',howH:'กติกาบ้านนี้'},
  boom:{stamp:'ห้ามจั่วมั่ว!',floatSub:'มีที่หนีบจมูกหรือยัง?',joinH:'ชวนแก๊งมาลุ้นทุเรียน',howH:'กติกาแผงทุเรียน'},
  deal:{stamp:'ดีลนี้ต้องปิด!',floatSub:'แบ่งเงินให้ถูกใจทุกคน',joinH:'นัดหุ้นส่วนมาเจรจา',howH:'กติกาห้องประชุม'},
  checkpoint:{stamp:'หยุดตรวจ!',floatSub:'หมูปิ้งล้วน ๆ ครับจ่า',joinH:'รวมแก๊งซิ่งผ่านด่าน',howH:'กติกาหน้าด่าน'},
  tam:{stamp:'ไม่ไว้หน้าใคร!',floatSub:'ซ้อนบวกได้ไม่จำกัด',joinH:'เรียกแก๊งมาล้อมครก',howH:'กติกาครกแตก'},
  curse:{stamp:'ปอปอยู่ในหมู่บ้าน!',floatSub:'ซุบซิบให้ถึง 7 แต้ม',joinH:'ตีกลองเรียกชาวบ้านมาศาลา',howH:'กฎบ้านนาดง'},
};
Object.keys(COPY).forEach(k=>Object.assign(GAMES[k],COPY[k]));
const pickHost = list => { const on = list.filter(p => p.online !== false); return ([...(on.length ? on : list)].sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0))[0] || {}).id || null; };
const HEAD_NORM = s => String(s||'').toLowerCase().replace(/[\s\-.'’]/g,'');
// กติกาคะแนนต่อรอบ
const SCORE = { teamWin: 1, rightVote: 1, spyEscape: 2, spyGuess: 2 };
const jokes = ['ใจเย็นพี่ สายลับอาจเป็นคนข้าง ๆ ก็ได้ 👀','ถามเนียน ๆ อย่าโป๊ะเหมือนสั่งส้มตำไม่ใส่พริก','ถ้าตอบแปลก ๆ อาจจะง่วง…หรือเป็นสายลับ!','หลักฐานยังไม่แน่น อย่าเพิ่งกล่าวหาเพื่อน','เนียนกว่านี้ก็ปลาร้าในกระเป๋าแล้ว'];
const rid = () => Math.random().toString(36).slice(2, 9).toUpperCase();
const clean = s => String(s || '').trim().slice(0, 24);
function App() {
  const [name,setName]=useState(localStorage.getItem('sf-name')||'');
  const [roomCode,setRoomCode]=useState('');
  const [joinCode,setJoinCode]=useState(()=>{try{return (new URLSearchParams(location.search).get('join')||'').toUpperCase().slice(0,6)}catch{return ''}});
  const liveCode=useRef('');
  const [room,setRoom]=useState(null);
  const [myId,setMyId]=useState(sessionStorage.getItem('sf-player')||rid());
  const [screen,setScreen]=useState('home');
  const [notice,setNotice]=useState('');
  const readNum=(k,d)=>{try{const v=parseFloat(localStorage.getItem(k));return isNaN(v)?d:Math.max(0,Math.min(1,v))}catch{return d}};
  const [sound,setSound]=useState(()=>{try{return localStorage.getItem('sf-sound')!=='0'}catch{return true}});
  const [musicVol,setMusicVol]=useState(()=>readNum('sf-music',0.4));
  const [sfxVol,setSfxVol]=useState(()=>readNum('sf-sfx',0.8));
  const [mixOpen,setMixOpen]=useState(false);
  // รูปโปรไฟล์ที่เลือกไว้ (จำในเครื่อง ใช้ทุกห้อง)
  const [myAv,setMyAv]=useState(()=>{try{const v=parseInt(localStorage.getItem('sf-av'),10);return isNaN(v)?null:v}catch{return null}});
  const [avOpen,setAvOpen]=useState(false);
  const saveAv=i=>{setMyAv(i);try{localStorage.setItem('sf-av',String(i))}catch{}};const mixRef=useRef(null);
  const [duration,setDuration]=useState(8);
  const [packName,setPackName]=useState('ชุดเพื่อนฉัน');
  const [packPlaces,setPackPlaces]=useState('');
  const [showRole,setShowRole]=useState(false);
  const [now,setNow]=useState(Date.now());
  const [skew,setSkew]=useState(0);const srvNow=now+skew; // เวลาเซิร์ฟเวอร์ (ให้ทุกเครื่องเดินนาฬิกาตรงกัน)
  const [ckOpts,setCkOpts]=useState({hourSec:20});
  const [vote,setVote]=useState('');
  const [accuse,setAccuse]=useState('');
  const [spyGuess,setSpyGuess]=useState('');
  const [newPack,setNewPack]=useState('');
  const [verdict,setVerdict]=useState(null);
  const [game,setGameState]=useState(()=>{const h=location.hash.slice(1);return GAMES[h]?h:null});
  const [showCat,setShowCat]=useState(true);
  const [exOpts,setExOpts]=useState({mole:false});
  const [wfOpts,setWfOpts]=useState({hunter:true,reveal:true,cupid:true,fool:true});
  const [csOpts,setCsOpts]=useState({ritual:true});
  function setGame(g){setGameState(g);try{history.replaceState(null,'',g?'#'+g:location.pathname+location.search)}catch{}}
  useEffect(()=>{const f=()=>{const h=location.hash.slice(1);setGameState(GAMES[h]?h:null)};window.addEventListener('hashchange',f);return()=>window.removeEventListener('hashchange',f)},[]);
  const [newBuild,setNewBuild]=useState(false);
  useEffect(()=>{const mine=[...document.scripts].map(x=>x.getAttribute('src')).find(x=>x&&x.includes('/assets/'));if(!mine)return;
    const check=async()=>{try{const h=await (await fetch('/?_='+Date.now(),{cache:'no-store'})).text();const m=h.match(/\/assets\/index-[^"']+\.js/);if(m&&!mine.endsWith(m[0])&&!mine.includes(m[0]))setNewBuild(true)}catch{}};
    check();const t=setInterval(check,60000);const vis=()=>document.visibilityState==='visible'&&check();document.addEventListener('visibilitychange',vis);return()=>{clearInterval(t);document.removeEventListener('visibilitychange',vis)}},[]);
  useEffect(()=>{sessionStorage.setItem('sf-player',myId);},[myId]);
  useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),500);return()=>clearInterval(t)},[]);
  useEffect(()=>{if(!db)return;return onValue(ref(db,'.info/serverTimeOffset'),s=>setSkew(s.val()||0))},[]);
  useEffect(()=>{if(!db||!roomCode)return; const code=roomCode;liveCode.current=code; const unsub=onValue(ref(db,`rooms/${code}`),s=>{if(liveCode.current!==code)return;const v=s.val();if(v&&v.players?.[myId]){setRoom(v);setScreen('room')}else{if(v)msg('คุณไม่ได้อยู่ในห้องนี้แล้ว');else if(roomCode)msg('ห้องนี้ถูกปิดแล้ว');setRoom(null);setRoomCode('');setScreen('home')}});return()=>unsub();},[roomCode]);
  const players=room?.players ? Object.values(room.players).filter(p=>p&&p.id&&p.name) : [];
  const gid=room?(room.game||'spyfall'):(game||'spyfall');const G=GAMES[gid]||GAMES.spyfall;const I=G.item,U=G.unit;
  const me=players.find(p=>p.id===myId);
  // คำนวณรูปใหม่เมื่อมีคนเข้า/ออก หรือเปลี่ยนรูป
  const av=useMemo(()=>makeAv(players),[players.map(p=>p.id+':'+(p.av??'')+':'+(p.joinedAt||0)).join()]);
  // มือถือ: กันจอดับเองระหว่างอยู่ในห้อง (กลางคืนเค้ก/แวร์วูฟรอนานโดยไม่แตะจอ จอดับ = เบราว์เซอร์หยุด พลาดตาตัวเอง)
  const inRoom=screen==='room'&&!!room;
  useEffect(()=>{if(!inRoom||!('wakeLock' in navigator))return;let lock=null,alive=true;
    const get=()=>{if(!alive||lock||document.visibilityState!=='visible')return;navigator.wakeLock.request('screen').then(l=>{if(!alive){l.release();return}lock=l;l.addEventListener('release',()=>{lock=null})}).catch(()=>{})};
    get();const ev=['visibilitychange','pointerup'];ev.forEach(e=>document.addEventListener(e,get));
    return()=>{alive=false;ev.forEach(e=>document.removeEventListener(e,get));lock?.release().catch(()=>{});lock=null}},[inRoom]);
  const joke=useMemo(()=>pick(jokes),[room?.round?.number,room?.status]);
  const themeId=screen==='room'&&room?gid:(game||'hub');
  useEffect(()=>{document.documentElement.dataset.theme=themeId;setSfxTheme(themeId);setMusic(themeId);
    // สีแถบเบราว์เซอร์บนมือถือให้ตรงกับธีมเกม
    const bg=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();const m=document.querySelector('meta[name=theme-color]');if(m&&bg)m.setAttribute('content',bg)},[themeId]);
  // เพลงประกอบ + เอฟเฟกต์: ปุ่มลำโพงปิดทั้งหมด, หลอดเลื่อนปรับแยกกัน
  useEffect(()=>{setMusicVolume(sound?musicVol:0);setSfxVolume(sfxVol);try{localStorage.setItem('sf-sound',sound?'1':'0');localStorage.setItem('sf-music',String(musicVol));localStorage.setItem('sf-sfx',String(sfxVol))}catch{}},[sound,musicVol,sfxVol]);
  // คลิปเปิดเกม: เล่นเมื่อเห็นห้องเปลี่ยนเป็น playing รอบแรก (จาก lobby) ในเกมที่มีคลิป — รีเฟรชกลางเกมไม่เล่นซ้ำ
  const [intro,setIntro]=useState(null);const prevStatus=useRef(null);
  useEffect(()=>{const st=room?.status,prev=prevStatus.current;prevStatus.current=st;
    if(st==='playing'&&prev&&prev!=='playing'&&room?.round?.number===1&&INTROS[room.game])setIntro(INTROS[room.game]);
    if(!room)setIntro(null)},[room?.status,room?.round?.number,room?.game,!!room]);
  useEffect(()=>{if(intro)setMusicVolume(0);else setMusicVolume(sound?musicVol:0)},[intro]);
  useEffect(()=>{if(!mixOpen)return;const f=e=>{if(mixRef.current&&!mixRef.current.contains(e.target))setMixOpen(false)};const k=e=>e.key==='Escape'&&setMixOpen(false);document.addEventListener('pointerdown',f);document.addEventListener('keydown',k);return()=>{document.removeEventListener('pointerdown',f);document.removeEventListener('keydown',k)}},[mixOpen]);
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
  useEffect(()=>{if(!timeUp||!db||!roomCode)return;sfx(sound,'timeup');
    runTransaction(ref(db,`rooms/${roomCode}/status`),s=>s==='playing'?'voting':undefined).catch(()=>{})},[timeUp]);
  const customPlaces=useMemo(()=>packPlaces.split('\n').map(s=>s.trim()).filter(Boolean).slice(0,80),[packPlaces]);
  function msg(s){setNotice(s);setTimeout(()=>setNotice(''),3200)}
  // ปุ่มย้อนกลับของเบราว์เซอร์ (รวมปัดย้อนบนมือถือ) ไม่ให้หลุดออกจากเว็บ:
  // อยู่ในห้อง = อยู่ต่อ (เตือนให้กดปุ่มออกจากห้อง) • หน้าเกม = กลับหน้ารวมเกม • หน้ารวมเกม = กดซ้ำภายใน 2.5 วิ ถึงออกจากเว็บ
  // ใส่ URL ที่ตรงกับหน้าจอปัจจุบันลงประวัติทุกครั้ง เพื่อให้ตัวฟัง hashchange (ที่ยิงตามหลัง popstate) อ่าน # ได้ถูก
  const navRef=useRef({});navRef.current={screen,game,msg};
  useEffect(()=>{
    const urlFor=g=>location.pathname+location.search+(g?'#'+g:'');
    const guard=g=>{try{history.pushState({sfGuard:1},'',urlFor(g))}catch{}};
    guard(navRef.current.screen==='room'||navRef.current.game?navRef.current.game:null);let last=0;
    const onPop=()=>{const s=navRef.current;
      if(s.screen==='room'){guard(s.game);s.msg('อยู่ในห้องอยู่ — ถ้าจะออก กดปุ่ม “ออกจากห้อง” ด้านบน');return}
      if(s.game){guard(null);setGameState(null);return}
      const t=Date.now();if(t-last<2500){history.back();return}
      last=t;guard(null);s.msg('กดย้อนกลับอีกครั้งเพื่อออกจากเว็บ')};
    window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[]);
  // ระหว่างเล่นเกม: ปิดแท็บ/รีเฟรช/พิมพ์ URL อื่น → เบราว์เซอร์ถามยืนยันก่อน
  const midGame=screen==='room'&&!!room&&room.status!=='lobby';
  useEffect(()=>{if(!midGame)return;const f=e=>{e.preventDefault();e.returnValue=''};window.addEventListener('beforeunload',f);return()=>window.removeEventListener('beforeunload',f)},[midGame]);
  // เปิดจากลิงก์ชวนเพื่อน (?join=รหัส) → บอกให้ใส่ชื่อแล้วกดเข้าห้อง
  useEffect(()=>{if(joinCode&&screen==='home')setTimeout(()=>msg(`ได้รับคำชวนเข้าห้อง ${joinCode} — ใส่ชื่อแล้วกด “เข้าห้อง” ได้เลย`),600)},[]);
  // ปุ่มชวนเพื่อน: มือถือเปิดเมนูแชร์ของเครื่อง / คอมคัดลอกลิงก์
  async function invite(){const url=`${location.origin}/?join=${roomCode}#${gid}`;const text=`มาเล่น ${G.name} กัน! รหัสห้อง ${roomCode}`;sfx(sound,'click');
    try{if(navigator.share){await navigator.share({title:BRAND,text,url});return}}catch(e){if(e?.name==='AbortError')return}
    try{await navigator.clipboard.writeText(`${text}\n${url}`);msg('คัดลอกลิงก์ชวนเพื่อนแล้ว! ส่งในแชตได้เลย 🔗')}catch{msg(url)}}
  async function createRoom(){
    if(!db){msg('ยังไม่ได้ตั้งค่า Firebase ตาม README');return}
    const n=clean(name);if(!n){msg('ใส่ชื่อเล่นก่อนนะ');return}
    const code=rid().slice(0,5);const a0=freeAv([],myAv);if(a0!==myAv)saveAv(a0);const player={id:myId,name:n,joinedAt:Date.now(),v:APP_VERSION,av:a0};
    const data={code,game:gid,v:APP_VERSION,hostId:myId,status:'lobby',createdAt:Date.now(),active:serverTimestamp(),players:{[myId]:player},packs:G.packs,round:null,votes:null,settings:{duration}};
    await set(ref(db,`rooms/${code}`),data);localStorage.setItem('sf-name',n);setRoomCode(code);setScreen('room');sfx(sound,'join');
  }
  async function joinRoom(){
    if(!db){msg('ยังไม่ได้ตั้งค่า Firebase ตาม README');return}
    const n=clean(name),code=joinCode.trim().toUpperCase();if(!n||!code){msg('ใส่ชื่อและรหัสห้องก่อน');return}
    const rr=ref(db,`rooms/${code}`);const snap=await get(rr);if(!snap.exists()){msg('ไม่เจอห้องนี้ เช็กรหัสอีกที');return}
    const data=snap.val();
    // หลุดแล้วเข้าใหม่ (คนละแท็บ/เครื่อง) ด้วยชื่อเดิม → กลับเข้าที่นั่งเดิมที่ขึ้นว่าหลุดอยู่ ไม่เกิดตัวซ้ำ (คะแนน/ไพ่/บทบาทยังอยู่)
    const ghost=data.players?.[myId]?null:Object.values(data.players||{}).find(p=>p&&p.id&&p.name===n&&p.online===false);const pid=ghost?ghost.id:myId;
   if((data.v||'1.0')!==APP_VERSION){msg(`ห้องนี้ใช้เวอร์ชัน ${data.v||'เก่า'} แต่เครื่องคุณเป็น ${APP_VERSION} — ให้ทุกคนรีเฟรชหน้าเว็บก่อน`);return}if(data.status!=='lobby' && !data.players?.[pid]){msg('เกมเริ่มแล้ว รอรอบหน้าก่อนนะ');return}
    const cap=GAMES[data.game]?.max||12;if(Object.keys(data.players||{}).length>=cap && !data.players?.[pid]){msg(`ห้องเต็มแล้ว (สูงสุด ${cap} คน)`);return}
    const a1=freeAv(Object.values(data.players||{}),myAv??data.players?.[pid]?.av,pid);if(myAv==null)saveAv(a1);
    await update(ref(db,`rooms/${code}/players/${pid}`),{id:pid,name:n,joinedAt:data.players?.[pid]?.joinedAt||Date.now(),v:APP_VERSION,av:a1,online:true});update(ref(db,`rooms/${code}`),{active:serverTimestamp()}).catch(()=>{});if(myAv!=null&&a1!==myAv)msg(`รูปที่คุณเลือกมีคนใช้แล้ว ได้รูป ${AVATARS[a1].e} แทน (แตะรูปตัวเองเพื่อเปลี่ยน)`);
    if(pid!==myId){setMyId(pid);sessionStorage.setItem('sf-player',pid);msg('กลับเข้าที่นั่งเดิมของคุณแล้ว 👋')}localStorage.setItem('sf-name',n);setGame(data.game||'spyfall');try{if(location.search)history.replaceState(null,'',location.pathname+location.hash)}catch{}setRoomCode(code);setScreen('room');sfx(sound,'join');
  }
  async function startGame(){
    if(!isHost||players.length<G.min){msg(`ต้องมีผู้เล่นอย่างน้อย ${G.min} คน`);return}if(outdated.length){msg('ยังมีคนใช้เวอร์ชันเก่า ให้รีเฟรชก่อน');return}
    update(ref(db,`rooms/${roomCode}`),{active:serverTimestamp()}).catch(()=>{});
    // ตัวร้าย 2 ตาล่าสุด → ลดโอกาสได้ตัวร้ายซ้ำ (ดู rand.js)
    const hist=readHist(room.badHist),ids=players.map(p=>p.id);const nextHist=bad=>({0:bad,1:hist[0]});
    if(G.max&&players.length>G.max){msg(`เกมนี้เล่นได้สูงสุด ${G.max} คน`);return}
    if(G.type==='deal'){const rd=makeDealRound(ids,{},(room.round?.number||0)+1,Date.now()+skew);
      await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:rd,votes:null,ready:null,spyGuess:null,result:null});sfx(sound,'start');return}
    if(G.type==='checkpoint'){const rd=makeCpRound(ids,{laps:room.settings?.cpLaps||lapsFor(ids.length)},(room.round?.number||0)+1,Date.now()+skew+(room.round?0:INTRO_LEAD));
      await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:rd,votes:null,ready:null,spyGuess:null,result:null});sfx(sound,'start');return}
    if(G.type==='tam'){const rd=makeTamRound(ids,{},(room.round?.number||0)+1,Date.now()+skew);
      await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:rd,votes:null,ready:null,spyGuess:null,result:null});sfx(sound,'start');return}
    if(G.type==='boom'){const rd=makeBoomRound(ids,{},(room.round?.number||0)+1);
      await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:rd,votes:null,ready:null,spyGuess:null,result:null});sfx(sound,'start');return}
    if(G.type==='curse'){const rd=makeCurseRound(ids,{...csOpts,hist},(room.round?.number||0)+1);
      await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:rd,badHist:nextHist(ids.filter(id=>(rd.fate[id]||[]).some(c=>c.t==='dark'))),votes:null,ready:null,spyGuess:null,result:null});sfx(sound,'start');return}
    if(G.type==='cake'){const rd=makeCakeRound(ids,{...ckOpts,hist},(room.round?.number||0)+1,Date.now()+skew);
      await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:rd,badHist:nextHist([rd.thief]),votes:null,ready:null,spyGuess:null,result:null});
      return}
    if(G.type==='wolf'){
      const rd=makeWolfRound(ids,{...wfOpts,hist},(room.round?.number||0)+1);
      await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:rd,badHist:nextHist(ids.filter(id=>rd.roles[id]==='wolf')),votes:null,ready:null,spyGuess:null,result:null});
      sfx(sound,'start');return}
    if(G.type==='explore'){
      const rd=makeExploreRound(ids,{...exOpts,hist},(room.round?.number||0)+1);
      await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:rd,badHist:nextHist(ids.filter(id=>['traitor','mole'].includes(rd.roles[id]))),votes:null,ready:null,spyGuess:null,result:null});
      sfx(sound,'start');return}
    if(!placePool.length){msg(`ติ๊กเลือก${I}อย่างน้อย 1 ${U}ก่อนนะ`);return}
    if(G.type==='head')return startHead();
    const place=pick(placePool),spy=pickBad(ids,1,hist)[0],roles={};
    const pi=packs.findIndex(p=>(p.places||[]).includes(place));const cat=!G.roles&&showCat&&pi>=0?packs[pi].name:null;
    // ถ้าบอกหมวด กระดานจะเหลือเฉพาะคำในหมวดนั้น
    const pool=cat?(packs[pi].places||[]).filter((pl,qi)=>pl&&isOn(pi,qi)):placePool;
    const deck=shuffle(ROLES[place]||GENERIC_ROLES);let k=0;
    players.forEach(p=>roles[p.id]=p.id===spy?{type:'spy'}:G.roles?{type:'player',place,role:deck[(k++)%deck.length]}:{type:'player',place});
    await update(ref(db,`rooms/${roomCode}`),{status:'playing',badHist:nextHist([spy]),round:{number:(room.round?.number||0)+1,place,roles,pool,cat,startedAt:Date.now(),endsAt:Date.now()+duration*60*1000,phase:'question',turns:G.id==='spy'?{order:shuffle(players.map(p=>p.id)),i:0,at:Date.now()+skew}:null},votes:null,ready:null,spyGuess:null,result:null});
    setShowRole(false);setVote('');setAccuse('');setSpyGuess('');sfx(sound,'start');
  }
  // คำบนหัว: สุ่ม 1 หมวด (ที่มีคำพอสำหรับทุกคน) แล้วแจกคำไม่ซ้ำกันให้ทุกคน
  async function startHead(){
    const ok=packs.map((p,pi)=>({name:p.name,words:(p.places||[]).filter((pl,qi)=>pl&&isOn(pi,qi))})).filter(x=>x.words.length>=players.length);
    if(!ok.length){msg(`ต้องติ๊กให้มีอย่างน้อย 1 หมวดที่มีคำ ≥ ${players.length} คำ`);return}
    const c=pick(ok);const deck=shuffle(c.words);const words={};players.forEach((p,i)=>words[p.id]=deck[i]);
    const order=shuffle(players.map(p=>p.id));
    await update(ref(db,`rooms/${roomCode}`),{status:'playing',round:{number:(room.round?.number||0)+1,cat:c.name,words,order,turn:0,pool:c.words,startedAt:Date.now(),turnMs:(room.settings?.headSec??60)*1000,turnAt:Date.now()+skew+3000},votes:null,ready:null,spyGuess:null,result:null});
    sfx(sound,'start');
  }
  async function pickAv(i){if(room){const other=players.find(p=>p.id!==myId&&av.idxOf(p.id)===i);if(other){msg(`${other.name} ใช้รูปนี้อยู่`);return}
    try{await update(ref(db,`rooms/${roomCode}/players/${myId}`),{av:i})}catch{msg('เปลี่ยนรูปไม่สำเร็จ ลองใหม่อีกที');return}}
    saveAv(i);setAvOpen(false);sfx(sound,'select');msg(`เปลี่ยนรูปเป็น ${AVATARS[i].e} ${AVATARS[i].n} แล้ว`)}
  async function leaveRoom(){const code=roomCode;liveCode.current='';setRoomCode('');setRoom(null);setScreen('home');if(!db||!code||!myId)return;
    try{await onDisconnect(ref(db,`rooms/${code}/players/${myId}/online`)).cancel()}catch{}
    await runTransaction(ref(db,`rooms/${code}`),cur=>{if(!cur)return cur;const ps={...(cur.players||{})};delete ps[myId];const left=Object.values(ps).filter(p=>p&&p.id);
      if(!left.length)return null; // คนสุดท้ายออก → ลบห้อง
      cur.players=ps;if(cur.hostId===myId)cur.hostId=pickHost(left);if(cur.voice?.members)delete cur.voice.members[myId];return cur}).catch(()=>{})}
  // หัวหน้าห้องเตะคนออก (เช่น ตัวซ้ำจากคนที่หลุดแล้วเข้าใหม่)
  async function kickPlayer(p){if(!isHost||!db||p.id===myId)return;if(!confirm(`เตะ ${p.name} ออกจากห้อง?`))return;
    await runTransaction(ref(db,`rooms/${roomCode}`),cur=>{if(!cur?.players?.[p.id])return cur;delete cur.players[p.id];if(cur.voice?.members)delete cur.voice.members[p.id];return cur}).catch(()=>{});msg(`เตะ ${p.name} ออกแล้ว`)}
  const canEdit=isHost&&room?.status==='lobby';
  // ออนไลน์/หลุด: เน็ตหลุดหรือปิดแท็บ Firebase จะตั้ง online=false ให้เอง
  useEffect(()=>{if(!db||!roomCode)return;const code=roomCode;const pRef=ref(db,`rooms/${code}/players/${myId}`);const oRef=ref(db,`rooms/${code}/players/${myId}/online`);
    const unsub=onValue(ref(db,'.info/connected'),s=>{if(s.val()!==true)return;onDisconnect(oRef).set(false).then(()=>runTransaction(pRef,p=>p&&p.id?{...p,online:true}:undefined)).catch(()=>{})});
    return()=>{unsub();onDisconnect(oRef).cancel().catch(()=>{})}},[roomCode]);
  // หัวหน้าห้องหลุดเกิน 12 วิ → คนที่ออนไลน์และเข้าห้องก่อนสุดรับตำแหน่งแทน
  const hostP=room?.players?.[room?.hostId];const hostGone=!!room&&(!hostP||hostP.online===false);
  useEffect(()=>{if(!hostGone||!db||!roomCode)return;const code=roomCode;const t=setTimeout(()=>{runTransaction(ref(db,`rooms/${code}`),cur=>{if(!cur)return;const h=cur.players?.[cur.hostId];if(h&&h.online!==false)return;
      const next=pickHost(Object.values(cur.players||{}).filter(p=>p&&p.id&&p.online!==false));if(next!==myId)return;cur.hostId=myId;return cur}).then(r=>{if(r?.committed)msg('หัวหน้าห้องหลุด — คุณเป็นหัวหน้าห้องแทนแล้ว 👑')}).catch(()=>{})},12000);return()=>clearTimeout(t)},[hostGone,roomCode]);
  const prevHost=useRef(null);
  useEffect(()=>{const h=room?.hostId;const p=prevHost.current;prevHost.current=h;if(p&&h&&p!==h&&h!==myId&&room?.players?.[h])msg(`👑 ${room.players[h].name} เป็นหัวหน้าห้องคนใหม่`)},[room?.hostId]);
  // ลบห้องที่ไม่มีใครใช้เกิน 24 ชม. (ต้องตั้งกฎใน firebase.rules.json ก่อน — ถ้ายังไม่ได้ตั้ง จะข้ามไปเงียบ ๆ)
  useEffect(()=>{if(!db)return;const t=setTimeout(async()=>{try{const old=await get(query(ref(db,'rooms'),orderByChild('active'),endAt(Date.now()-25*3600e3),limitToFirst(25)));const jobs=[];old.forEach(c=>{jobs.push(remove(c.ref).catch(()=>{}))});await Promise.all(jobs)}catch{}},7000);return()=>clearTimeout(t)},[]);
  // อีโมจิลอย
  const [floats,setFloats]=useState([]);const rxLast=useRef(0);
  useEffect(()=>{if(!db||!roomCode)return;const code=roomCode;const unsub=onChildAdded(query(ref(db,`rooms/${code}/rx`),orderByChild('t'),startAt(Date.now()+skew-3000)),s=>{const v=s.val();if(!v?.e)return;const id=s.key;
      setFloats(f=>[...f.slice(-14),{id,e:v.e,by:v.by,x:14+Math.random()*72}]);setTimeout(()=>setFloats(f=>f.filter(x=>x.id!==id)),2800);if(v.by!==myId)sfx(sound,'click')});return()=>unsub()},[roomCode]);
  async function react(e){const t=Date.now();if(t-rxLast.current<600||!db||!roomCode)return;rxLast.current=t;const r=push(ref(db,`rooms/${roomCode}/rx`));await set(r,{by:myId,e,t:serverTimestamp()}).catch(()=>{});setTimeout(()=>remove(r).catch(()=>{}),5000)}
  async function togglePlace(pi,qi){if(!canEdit)return;await set(ref(db,`rooms/${roomCode}/off/p${pi}/i${qi}`),isOn(pi,qi)?true:null);sfx(sound,'click')}
  async function togglePack(pi){if(!canEdit)return;const n=(packs[pi]?.places||[]).length;const allOn=packOnCount(pi)===n;
    if(allOn){const o={};for(let q=0;q<n;q++)o['i'+q]=true;await set(ref(db,`rooms/${roomCode}/off/p${pi}`),o)}else await set(ref(db,`rooms/${roomCode}/off/p${pi}`),null);sfx(sound,'click')}
  async function setAll(on){if(!canEdit)return;if(on){await set(ref(db,`rooms/${roomCode}/off`),null)}else{const o={};packs.forEach((p,pi)=>{const x={};(p.places||[]).forEach((_,q)=>x['i'+q]=true);o['p'+pi]=x});await set(ref(db,`rooms/${roomCode}/off`),o)}}
  async function addPlace(pi,text){if(!canEdit)return false;const t=String(text||'').trim().slice(0,40);if(!t)return false;const cur=packs[pi]?.places||[];if(cur.includes(t)){msg(`มี${I}นี้ในชุดแล้ว`);return false}
    await set(ref(db,`rooms/${roomCode}/packs/${pi}/places`),[...cur,t]);msg(`เพิ่ม “${t}” แล้ว`);sfx(sound,'select');return true}
  async function addPack(){
    const places=customPlaces;if(!clean(packName)||places.length<2){msg(`ตั้งชื่อชุดและใส่${I}อย่างน้อย 2 ${U}`);return}
    const updated=[...(room.packs||G.packs),{name:clean(packName),places}];await update(ref(db,`rooms/${roomCode}`),{packs:updated});setPackPlaces('');msg(`เพิ่มชุด${I}แล้ว 🎉`);sfx(sound,'confirm');
  }
  async function castVote(targetId){if(!room||!me||room.ready?.[myId])return;setVote(targetId);sfx(sound,'vote')}
  async function confirmVote(){if(!room||!me)return;if(!vote){msg('เลือกคนที่จะโหวตก่อน');return}
    const spy=role?.type==='spy';const g=spyGuess.trim();if(spy&&!g){msg(`สายลับต้องเดา${I}ก่อนยืนยัน`);return}
    const u={[`votes/${myId}`]:vote,[`ready/${myId}`]:true};if(spy)u.spyGuess=g;await update(ref(db,`rooms/${roomCode}`),u);sfx(sound,'confirm')}
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
      const guessCorrect=!!guess&&GUESS_NORM(guess)===GUESS_NORM(actual);const spyWins=!caught||guessCorrect;
      const points={},scores={...(cur.scores||{})};
      ids.forEach(id=>{points[id]=id===spyId?(caught?0:SCORE.spyEscape)+(guessCorrect?SCORE.spyGuess:0):(spyWins?0:SCORE.teamWin)+(votes[id]===spyId?SCORE.rightVote:0);scores[id]=(scores[id]||0)+points[id]});
      out={caught,guessCorrect};
      return {...cur,status:'result',scores,result:{caught,spyId,votes:counts,votedOut,majority,ballots:votes,guess,guessCorrect,spyWins,points,reason:'final'}};
    });
  }
  async function resetScores(){if(!isHost)return;if(!confirm('ล้างคะแนนสะสมของทุกคนเป็น 0?'))return;await update(ref(db,`rooms/${roomCode}`),{scores:null});msg('ล้างคะแนนแล้ว')}
  async function backToLobby(){await update(ref(db,`rooms/${roomCode}`),{status:'lobby',round:null,votes:null,ready:null,spyGuess:null,result:null});setShowRole(false);setVote('');setSpyGuess('')}
  const copy=async()=>{try{await navigator.clipboard.writeText(roomCode);msg('คัดลอกรหัสห้องแล้ว!');}catch{msg(`รหัสห้อง: ${roomCode}`)}};
  const active=room?.status==='playing';
  // แวร์วูฟ กลางคืน: ปิดไมค์คนที่ไม่ใช่หมาป่า และหมาป่าได้ยินกันเองเท่านั้น
  const wr=room?.round;const wolfNight=wr?.kind==='wolf'&&room?.status==='playing'&&wr.phase==='night';
  const iAmWolf=wolfNight&&wr.roles?.[myId]==='wolf'&&!!wr.alive?.[myId];
  // เค้กหายไปไหน กลางคืน: คุยได้เฉพาะคนที่ตื่นตีเดียวกัน
  const cakeNight=wr?.kind==='cake'&&room?.status==='playing'&&wr.phase==='night';const ch=cakeNight?hourAt(wr,srvNow):0;const myWake=cakeNight&&ch>=1&&ch<=HOURS&&wr.dice?.[myId]===ch;
  const curseNight=wr?.kind==='curse'&&room?.status==='playing'&&wr.phase==='night';const darkOf=id=>!!wr?.alive?.[id]&&(wr?.fate?.[id]||[]).some(c=>c.t==='dark'&&!c.open);const iAmDark=curseNight&&darkOf(myId);
  const voiceGate=cakeNight?{canTalk:myWake,hear:myWake?Object.keys(wr.dice||{}).filter(id=>id!==myId&&wr.dice[id]===ch):[],label:myWake?`⏰ ตี ${ch} — คุยได้เฉพาะคนที่ตื่นตอนนี้`:'🌙 กลางคืน — ไมค์ปิด คุณหลับอยู่'}:wolfNight?{canTalk:iAmWolf,hear:iAmWolf?Object.keys(wr.roles||{}).filter(id=>id!==myId&&wr.roles[id]==='wolf'&&wr.alive?.[id]):[],label:iAmWolf?'🌙 กลางคืน — ได้ยินกันเฉพาะหมาป่า (คนอื่นไม่ได้ยินคุณ)':'🌙 กลางคืน — ไมค์ปิดอัตโนมัติ ทุกคนหลับ… จะได้ยินกันอีกทีตอนเช้า'}:curseNight?{canTalk:iAmDark,hear:iAmDark?Object.keys(wr.fate||{}).filter(id=>id!==myId&&darkOf(id)):[],label:iAmDark?'🌑 คืนเดือนดับ — ได้ยินกันเฉพาะผีปอป (คนอื่นไม่ได้ยินคุณ)':'🌑 คืนเดือนดับ — ไมค์ปิด ทุกคนหลับ… จะได้ยินกันอีกทีตอนเช้า'}:null;
  const nameOf=id=>players.find(p=>p.id===id)?.name||'ผู้เล่นที่ออกไปแล้ว';
  const readyCount=players.filter(p=>room?.ready?.[p.id]).length;
  const allReady=room?.status==='voting'&&players.length>0&&readyCount===players.length;
  useEffect(()=>{if(allReady&&isHost){const t=setTimeout(()=>finishVote(),900);return()=>clearTimeout(t)}},[allReady,isHost]);
  const resultKey=room?.status==='result'&&room?.result&&!G.type?`${roomCode}-${room.round?.number}-${room.result.spyId}`:null;
  useEffect(()=>{if(!resultKey)return;const spyId=room.result.spyId;if(myId===spyId){sfx(sound,(room.result.spyWins??!room.result.caught)?'right':'wrong');return}
    const myVote=room.votes?.[myId];const right=myVote?myVote===spyId:!!room.result.caught;
    setVerdict({right,key:resultKey});sfx(sound,right?'right':'wrong');const t=setTimeout(()=>setVerdict(null),3500);return()=>clearTimeout(t)},[resultKey]);
  if(!configured||!db)return <div className="setup"><div className="brand"><span className="logo">🎲</span> BOARD GAME <b>T BAAN</b></div><div className="setup-card"><span className="eyebrow">SETUP ก่อนเปิดเกม</span><h1>อีกนิดเดียวก็ได้โป๊ะกับเพื่อนแล้ว</h1><p>เว็บนี้พร้อมรันแล้ว แต่ต้องเชื่อม Firebase Realtime Database เพื่อให้ผู้เล่นคนละเครื่องเห็นข้อมูลห้องเดียวกัน</p><ol><li>สร้างโปรเจกต์ Firebase แล้วเปิด Realtime Database</li><li>คัดลอกค่าการตั้งค่ามาใส่ในไฟล์ <code>.env</code></li><li>ตั้งค่า Database Rules ตาม README แล้วรัน <code>npm run dev</code></li></ol><a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="primary">เปิด Firebase Console ↗</a><p className="muted">อ่าน README.md ในไฟล์โปรเจกต์เพื่อทำทีละขั้นตอน</p></div></div>;

  return <div className="app"><Ambient theme={themeId}/>
    {intro&&<IntroFilm id={intro} sound={sound} onDone={()=>setIntro(null)}/>}
    <header className="topbar"><button className="brand" onClick={()=>{if(screen!=='room')setGame(null)}} title="กลับหน้ารวมเกม"><span className="logo"><BrandMark/></span> BOARD GAME <b>T BAAN</b></button><div className="tagline">{screen==='room'||game?`${G.emoji} ${G.name}`:'รวมบอร์ดเกมเล่นกับแก๊งเพื่อน 🇹🇭'}</div><div className="sound-wrap" ref={mixRef}><button className={'sound'+(mixOpen?' open':'')} onClick={()=>setMixOpen(o=>!o)} title="ปรับเสียง" aria-label="ปรับเสียง" aria-expanded={mixOpen}>{sound&&(musicVol>0||sfxVol>0)?<Volume2/>:<VolumeX/>}</button>
      {mixOpen&&<div className="mixer" role="dialog" aria-label="ปรับเสียง">
        <div className="mixer-head"><b>🎚️ ปรับเสียง</b><button className={'mixer-mute'+(sound?'':' off')} onClick={()=>setSound(!sound)}>{sound?<><Volume2 size={14}/> เปิดอยู่</>:<><VolumeX size={14}/> ปิดหมด</>}</button></div>
        <label className="mixer-row"><span>🎵 เพลงประกอบ</span><b>{Math.round(musicVol*100)}%</b></label>
        <input type="range" min="0" max="100" step="1" value={Math.round(musicVol*100)} disabled={!sound} onChange={e=>setMusicVol(+e.target.value/100)} aria-label="ความดังเพลงประกอบ" style={{'--fill':Math.round(musicVol*100)+'%'}}/>
        <label className="mixer-row"><span>🔔 เสียงเอฟเฟกต์</span><b>{Math.round(sfxVol*100)}%</b></label>
        <input type="range" min="0" max="100" step="1" value={Math.round(sfxVol*100)} disabled={!sound} onChange={e=>setSfxVol(+e.target.value/100)} onPointerUp={()=>sfx(sound,'select')} aria-label="ความดังเสียงเอฟเฟกต์" style={{'--fill':Math.round(sfxVol*100)+'%'}}/>
        <div className="mixer-now">♪ กำลังเล่น: <b>{trackName(themeId)}</b></div>
        <small>เพลงแต่งขึ้นใหม่สำหรับแต่ละเกม • ถ้าคุยในห้องเสียงแล้วเพลงกลบ ลดหลอดเพลงลงได้</small>
      </div>}</div></header>
    {newBuild&&<button className="update-bar" onClick={()=>location.reload()}>🔄 มีเวอร์ชันใหม่ — แตะเพื่ออัปเดต</button>}
    {notice&&<div className="toast">{notice}</div>}
    {avOpen&&<AvatarPicker current={room?av.idxOf(myId):myAv} takenBy={room?Object.fromEntries(players.filter(p=>p.id!==myId).map(p=>[av.idxOf(p.id),p.name])):{}} onPick={pickAv} onClose={()=>setAvOpen(false)}/>}
    {screen==='room'&&room&&<>
      <div className="rx-layer" aria-hidden="true">{floats.map(f=><div key={f.id} className="rx" style={{left:f.x+'%'}}><b>{f.e}</b><span><Avatar id={f.by} av={av} size={22}/>{nameOf(f.by)}</span></div>)}</div>
      {cakeNight||wolfNight||curseNight?<div className="rx-bar off">🤫 กลางคืน — ปิดอีโมจิไว้ (กันรู้ว่าใครตื่นอยู่)</div>
        :<div className="rx-bar" role="toolbar" aria-label="ส่งอีโมจิ">{['😂','😱','🤨','🤔','👀','😡','👏','💀','🔥','🙏'].map(e=><button key={e} type="button" onClick={()=>react(e)} aria-label={'ส่ง '+e}>{e}</button>)}</div>}
    </>}
    {verdict&&<div className={'verdict '+(verdict.right?'right':'wrong')} onClick={()=>setVerdict(null)} key={verdict.key}><div className="verdict-box"><div className="verdict-emoji">{verdict.right?'🧠':'🤡'}</div><div className="verdict-text">{verdict.right?'ฉลาดจริงๆเลยไอโง่':'มึงนี่โง่จริงๆเลยนะ'}</div><small>{verdict.right?'โหวตถูกตัวสายลับ':'โหวตผิดคน'} • แตะเพื่อปิด</small></div></div>}
    {screen==='home'&&!game&&<main className="home hub">
      <section className="hub-hero"><HubArt/><span className="eyebrow"><Sparkles size={15}/> PARTY GAMES • เล่นข้ามเครื่อง <span className="version-tag">v{APP_VERSION}</span></span><h1>{BRAND}</h1><p>รวมบอร์ดเกมปาร์ตี้ไว้เล่นกับแก๊งเพื่อน เลือกเกมแล้วสร้างห้อง หรือใส่รหัสห้องที่เพื่อนส่งมาได้เลย</p></section>
      <section className="game-grid">{Object.values(GAMES).map(g=><button key={g.id} data-theme={g.id} className="game-card" onClick={()=>{sfx(sound,'click');setGame(g.id)}}><div className="card-art"><SceneArt id={g.id}/></div><div className="card-body"><h2>{g.emoji} {g.name}</h2><p>{g.blurb}</p><div className="hero-pills">{g.pills.map(x=><span key={x}>{x}</span>)}</div><span className="game-go">เล่นเกมนี้ →</span></div></button>)}
        <div className="game-card soon"><div className="card-body"><span className="game-emoji">🧩</span><h2>เกมต่อไป…</h2><p>กำลังเตรียมเกมใหม่ เร็ว ๆ นี้</p></div></div></section>
      <section className="start3"><h2>เริ่มเล่นใน 3 ขั้น 🎲</h2><div className="start3-grid">
        <article><span className="num">01</span><Art name="crown" size={84}/><h3>เลือกเกม สร้างห้อง</h3><p>คนหนึ่งเป็นหัวหน้าห้อง เลือกเกมแล้วกด “สร้างห้องใหม่”</p></article>
        <article><span className="num">02</span><Art name="bubble" size={84}/><h3>ชวนเพื่อนเข้าห้อง</h3><p>กด “ชวนเพื่อน” ส่งลิงก์ในแชต หรือบอกรหัสห้อง 5 ตัว</p></article>
        <article><span className="num">03</span><Art name="win" size={84}/><h3>เข้าห้องเสียงแล้วเล่น</h3><p>คุยกันในห้องเสียงของเว็บได้เลย แต้มสะสมนับต่อทุกรอบ</p></article></div></section>
      <section className="join-card"><div className="join-head"><div><span className="eyebrow">มีรหัสห้องแล้ว?</span><h2>เข้าห้องที่เพื่อนสร้างไว้</h2></div><span className="players-chip"><Users size={16}/> 3–12 คน</span></div><div className="me-row"><button type="button" className="av-edit big" onClick={()=>setAvOpen(true)} title="เลือกรูปโปรไฟล์" aria-label="เลือกรูปโปรไฟล์">{myAv!=null?<AvFace i={myAv} size={54}/>:<span className="av-empty">🙂</span>}<i>✏️</i></button><div className="me-name"><label>ชื่อเล่นของคุณ <small>• แตะรูปเพื่อเลือกรูปโปรไฟล์</small></label><input value={name} onChange={e=>setName(e.target.value)} maxLength={24} placeholder="เช่น ตัวตึงประจำซอย"/></div></div><div className="join-actions"><div className="join-inline"><input value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} onKeyDown={e=>e.key==='Enter'&&joinRoom()} maxLength={6} placeholder="รหัสห้อง เช่น A7K2Q"/><button className="secondary" onClick={joinRoom}><DoorOpen size={18}/> เข้าห้อง</button></div></div><p className="hint">ระบบจะพาเข้าเกมที่ห้องนั้นเล่นอยู่ให้เอง</p></section>
      <section className="ceo-card"><div className="ceo-photo"><img src="/ceo-big-dodo.jpg" alt="Big Dodo นั่งหน้ากระดานบอร์ดเกม" loading="lazy"/><span className="ceo-badge">👑 CEO & ผู้ก่อตั้ง</span></div>
        <div className="ceo-text"><span className="eyebrow">รู้จักผู้อยู่เบื้องหลัง</span><h2>Big Dodo</h2><p className="ceo-role">ประธานเจ้าหน้าที่บริหารฝ่ายปั่นประสาท • Board game T baan</p>
          <p>เกิดมาพร้อมลูกเต๋าในมือขวาและคู่มือกติกาในมือซ้าย ว่ากันว่าคำแรกที่พูดไม่ใช่ “พ่อ” หรือ “แม่” แต่เป็น <b>“เดี๋ยว ขออ่านกติกาอีกรอบ”</b></p>
          <p>Big Dodo เริ่มต้นอาชีพจากการเป็นแชมป์เกมเศรษฐีประจำซอย ก่อนจะถูกแบนจากวงญาติทุกงานสงกรานต์ เพราะ <b>ปั่นจนน้าทะเลาะกับป้าไปสามปี</b> จึงตัดสินใจผันตัวมาสร้างเว็บนี้ เพื่อปั่นเพื่อนได้ทุกที่ ไม่ต้องรอวันหยุดยาว</p>
          <ul className="ceo-facts">
            <li>🐺 เล่นแวร์วูฟเป็นหมาป่ามา 47 ตาติด แต่ยืนยันว่า “ระบบสุ่มนะ ไม่ใช่ผม”</li>
            <li>🕵️ ตอนเป็นสายลับใน Spyfall เคยตอบว่า “ที่นี่มีหมูกระทะไหม” ในด่านสถานีอวกาศ แล้วยังรอดได้</li>
            <li>🧭 ในเกมออกสำรวจ ทุกคนโหวตค้านคณะที่มีเขาไว้ก่อนเสมอ ไม่ว่าเขาจะอยู่ฝ่ายไหน</li>
            <li>💰 สะสมเหรียญบอร์ดเกมไว้ในถ้วยหลากสี มากกว่าเงินในบัญชีจริง</li>
            <li>📜 คติประจำใจ: “แพ้ได้ แต่ต้องปั่นให้คนชนะไม่มีความสุข”</li>
          </ul>
          <p className="muted">* ประวัตินี้แต่งขึ้นเพื่อความฮา ไม่มีมูลความจริงใด ๆ ทั้งสิ้น (มั้ง)</p></div></section>
    </main>}
    {screen==='home'&&game&&<main className="home">
      <section className="hero"><div className="hero-copy"><span className="eyebrow"><Sparkles size={15}/> {G.name} • {G.min}–{G.max||12} PLAYERS <span className="version-tag">v{APP_VERSION}</span></span><h1>{G.h1[0]}<br/><em>{G.h1[1]}</em></h1><p>{G.lead}</p><div className="hero-pills">{G.pills.map(x=><span key={x}>{x}</span>)}</div></div><div className="hero-art"><SceneArt id={G.id}/><div className="floating-card">{G.emoji} <b>{G.float}</b><small>{G.floatSub}</small></div><div className="stamp">{G.stamp}</div></div></section>
      <section className="join-card"><div className="join-head"><div><button className="back-link" onClick={()=>setGame(null)}><ArrowLeft size={14}/> รวมเกม</button><span className="eyebrow">{G.emoji} {G.name} • เริ่มปฏิบัติการ</span><h2>{G.joinH}</h2></div><span className="players-chip"><Users size={16}/> {G.min}–{G.max||12} คน</span></div><div className="me-row"><button type="button" className="av-edit big" onClick={()=>setAvOpen(true)} title="เลือกรูปโปรไฟล์" aria-label="เลือกรูปโปรไฟล์">{myAv!=null?<AvFace i={myAv} size={54}/>:<span className="av-empty">🙂</span>}<i>✏️</i></button><div className="me-name"><label>ชื่อเล่นของคุณ <small>• แตะรูปเพื่อเลือกรูปโปรไฟล์</small></label><input value={name} onChange={e=>setName(e.target.value)} maxLength={24} placeholder="เช่น ตัวตึงประจำซอย" onKeyDown={e=>e.key==='Enter'&&createRoom()}/></div></div><div className="join-actions"><button className="primary" onClick={createRoom}><Plus size={18}/> สร้างห้องใหม่</button><div className="join-inline"><input value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())} onKeyDown={e=>e.key==='Enter'&&joinRoom()} maxLength={6} placeholder="รหัสห้อง เช่น A7K2Q"/><button className="secondary" onClick={joinRoom}><DoorOpen size={18}/> เข้าห้อง</button></div></div></section>
      <section className="how"><h2>{G.howH}</h2><div className="how-grid">{G.how.map(([h,t],i)=><article key={i}><span>0{i+1}</span><h3>{h}</h3><p>{t}</p></article>)}</div></section>
    </main>}
    {screen==='room'&&room&&<main className={'room-page'+(room.status!=='lobby'?' in-game':'')}>
      <div className="room-heading"><div className="room-art"><SceneArt id={G.id}/></div><div><span className="eyebrow">{G.emoji} {G.name} • ห้องเล่นส่วนตัว</span><h1>ห้อง <span className="room-code">{roomCode}</span> <button className="icon-btn" onClick={copy}><Copy size={17}/></button></h1><p>ส่งรหัสนี้ให้เพื่อน หรือกดส่งลิงก์ชวนได้เลย</p><button className="invite" onClick={invite}>📤 ชวนเพื่อน</button></div><button className="secondary" onClick={leaveRoom} aria-label="ออกจากห้อง" title="ออกจากห้อง"><LogOut size={16}/><span className="leave-text">ออกจากห้อง</span></button></div>
      <div className={'room-grid'+(room.status!=='lobby'?' playing':'')+(!G.type&&(room.status==='playing'||room.status==='voting')&&room.round?' has-board':'')}><section className="panel players-panel"><div className="panel-title"><h2><Users size={20}/> แก๊งนี้มีใครบ้าง</h2><span>{players.length}/{G.max||12}</span></div>{players.map((p,i)=><div className="player-row" key={p.id}>{p.id===myId?<button type="button" className="av-edit" onClick={()=>setAvOpen(true)} title="เปลี่ยนรูปโปรไฟล์" aria-label="เปลี่ยนรูปโปรไฟล์"><Avatar id={p.id} av={av} size={40} dead={['wolf','boom','curse'].includes(room.round?.kind)&&room.round.alive&&!room.round.alive[p.id]}/><i>✏️</i></button>:<Avatar id={p.id} av={av} size={40} dead={['wolf','boom','curse'].includes(room.round?.kind)&&room.round.alive&&!room.round.alive[p.id]}/>}<div><b>{p.name} {p.id===myId&&'(คุณ)'}</b><small>{p.id===room.hostId?'👑 หัวหน้าห้อง':'ผู้เล่น'}{p.id===myId?' • แตะรูปเพื่อเปลี่ยน':''}{['wolf','boom','curse'].includes(room.round?.kind)&&room.round.alive&&!room.round.alive[p.id]?(room.round.kind==='boom'?' • 💥 ตกรอบ':' • 💀 ตายแล้ว'):''}{p.online===false?<span className="off-tag"> • 📴 หลุด</span>:''}</small></div><span className="score-chip">{scores[p.id]||0} แต้ม</span>{p.v!==APP_VERSION&&<span className="old-tag">เวอร์ชันเก่า</span>}{p.id===room.hostId&&<span className="host-tag">HOST</span>}{isHost&&p.id!==myId&&<button type="button" className="kick-btn" onClick={()=>kickPlayer(p)} title={"เตะ "+p.name+" ออก"} aria-label={"เตะ "+p.name+" ออก"}>✕</button>}</div>)}{players.length<G.min&&<p className="hint">รอเพื่อนอีก {G.min-players.length} คน… เกมเริ่มได้เมื่อครบ {G.min} คน</p>}<VoicePanel key={roomCode} db={db} roomCode={roomCode} myId={myId} members={room.voice?.members} nameOf={nameOf} msg={msg} gate={voiceGate}/></section>
      <section className="panel game-panel">{room.status==='lobby'&&<LobbyStage gid={G.id} ids={players.map(p=>p.id)} av={av} Cake={CakeStage}/>}{room.status==='lobby'&&G.type==='head'&&<><span className="eyebrow">พร้อมยัง?</span><h2>ตั้งวงก่อน แล้วค่อยเดาคำบนหัว</h2><label>⏱️ เวลาต่อตา {isHost?'(หัวหน้าห้องตั้ง)':'(หัวหน้าห้องเป็นคนตั้ง)'}</label><select value={room.settings?.headSec??60} disabled={!isHost} onChange={e=>update(ref(db,`rooms/${roomCode}/settings`),{headSec:+e.target.value})}><option value={30}>30 วินาที</option><option value={45}>45 วินาที</option><option value={60}>1 นาที</option><option value={90}>1 นาที 30 วินาที</option><option value={120}>2 นาที</option><option value={0}>ไม่จับเวลา</option></select><p className="hint">ตอนเริ่ม ระบบจะสุ่ม 1 หมวดจากที่ติ๊กไว้ แล้วแจกคำให้ทุกคนคนละคำ (เล่นได้ 2–12 คน){(room.settings?.headSec??60)>0?' • หมดเวลาแล้วข้ามตาให้อัตโนมัติ':''}</p><div className="score-rules"><b>🏅 คะแนน</b><span>ทายถูกอันดับ 1 ได้ (จำนวนคน − 1) แต้ม อันดับถัดไปลดลงทีละ 1</span><span>ยังทายไม่ได้ตอนจบเกม = 0 แต้ม</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>{outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}{isHost?<button className="primary wide" disabled={players.length<G.min||outdated.length>0} onClick={startGame}>🎲 เริ่มเกมเลย ({players.length} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องเริ่มเกมอยู่เด้อ</div>}</>}
      {room.status==='lobby'&&!G.type&&<><span className="eyebrow">พร้อมยัง?</span><h2>ตั้งวงก่อน เดี๋ยวค่อยโป๊ะ</h2><label>เวลาต่อรอบ</label><select value={duration} onChange={e=>setDuration(+e.target.value)}><option value={3}>3 นาที</option><option value={5}>5 นาที</option><option value={8}>8 นาที</option><option value={10}>10 นาที</option></select><p className="hint">หัวหน้าห้องเป็นคนเริ่มเกมและเพิ่มชุด{I} • หมดเวลาแล้วจะเข้าหน้าโหวตอัตโนมัติ</p><div className="score-rules"><b>🏅 กติกาคะแนน</b><span>จับสายลับได้: ชาวบ้านทุกคน +{SCORE.teamWin}</span><span>โหวตถูกตัวสายลับ: +{SCORE.rightVote}</span><span>สายลับรอด: +{SCORE.spyEscape} • เดา{I}ถูก: +{SCORE.spyGuess}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>{!G.roles&&<label className="cat-toggle"><input type="checkbox" className="tick" checked={showCat} disabled={!isHost} onChange={e=>setShowCat(e.target.checked)}/> บอกหมวดหมู่ให้ทุกคนรู้ (สายลับเดาง่ายขึ้น)</label>}{outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}{isHost?<button className="primary wide" disabled={players.length<3||outdated.length>0} onClick={startGame}>🎲 เริ่มเกมเลย ({players.length} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องเริ่มเกมอยู่เด้อ</div>}</>}
      {active&&!G.type&&room.round&&(()=>{const spy=role?.type==='spy';const low=secondsLeft<=30;return <>
        <div className="round-top"><span className="eyebrow">รอบที่ {room.round.number}</span>{room.round.cat&&<span className="cat-tag">หมวด: {room.round.cat}</span>}</div>
        <Steps items={['ดูบทบาท','ถาม–ตอบ','โหวต','เฉลย']} at={showRole?1:0}/>
        <SpyStage game={G.id} mode="talk" ids={players.map(p=>p.id)} av={av} speaker={(()=>{const t=room.round.turns;const o=(t?.order||[]).filter(id=>room.players?.[id]);return o.length?o[(t.i||0)%o.length]:null})()}/>
        <Phase art={G.roles?'magnifier':'bubble'} kicker="🕵️ ภารกิจ" title={spy&&showRole?'เนียนให้รอด แล้วเดาให้ถูก':'ถามตอบให้เนียน หาตัวคนที่ไม่รู้'} aside={<TimerRing secs={secondsLeft} total={Math.max(1,Math.round(((room.round.endsAt||0)-(room.round.startedAt||0))/1000))} label="เวลาที่เหลือ"/>}>
          {G.roles?'ผลัดกันถามเพื่อนเกี่ยวกับสถานที่ ตอบให้รู้ว่าเรารู้ แต่อย่าใบ้ตรงจนสายลับเดาได้':'ใบ้คำแบบอ้อม ๆ ให้รู้ว่าเรารู้ แต่อย่าตรงจนสายลับเดาคำได้'}</Phase>
        {G.id==='spy'&&<ClueTurns db={db} room={room} roomCode={roomCode} myId={myId} av={av} nameOf={nameOf} srvNow={srvNow} isHost={isHost} sound={sound}/>}
        <RoleCard show={showRole} onToggle={()=>setShowRole(!showRole)} art={spy?'spy':G.roles?'pin':'bubble'} cover={G.roles?'pin':'bubble'}
          name={spy?'คุณคือสายลับ!':G.roles?'สถานที่ของคุณ':'คำลับของคุณ'} side={spy?'bad':'good'} sideLabel={spy?'🕵️ สายลับ':'🙂 คนรู้ความลับ'}>
          {spy?<><strong className="secret">ไม่รู้{I} 🤫</strong><p>ฟังคำถามคำตอบให้ดี ทำตัวเนียน ๆ แล้วเดา{I}ตอนโหวต (เดาถูก +{SCORE.spyGuess})</p></>
            :<><strong className="secret">{role?.place}</strong>{role?.role&&<p>บทบาทของคุณ: <b>{role.role}</b></p>}<p>ห้ามพูด{I}ตรง ๆ — สายลับฟังอยู่!</p></>}
        </RoleCard>
        <div className="howto">
          {G.id==='spy'?<div><Art name="timer" size={46}/><b>ใบ้ทีละคน ตาละ 10 วิ</b>พูดใบ้ในห้องเสียง พูดจบกดข้ามได้</div>:<div><Art name="think" size={46}/><b>ถามทีละคน</b>เช่น “ที่นี่ต้องจ่ายเงินไหม?” “มาบ่อยไหม?”</div>}
          <div><Art name="magnifier" size={46}/><b>จับผิด</b>ใครตอบกว้าง ๆ มั่ว ๆ หรือถามย้อน น่าสงสัย</div>
          <div><Art name="vote" size={46}/><b>มั่นใจแล้วโหวตเลย</b>กดพร้อมจับสปายเกินครึ่ง หรือหัวหน้าห้องเปิดโหวต</div>
        </div>
        <p className="joke">😂 {joke}</p>
        <CallVote db={db} room={room} roomCode={roomCode} myId={myId} av={av} nameOf={nameOf} players={players} sound={sound}/>
        <div className="vote-actions">{isHost?<button className="secondary wide" onClick={()=>update(ref(db,`rooms/${roomCode}`),{status:'voting',votes:null,ready:null,spyGuess:null})}><Vote size={16}/> เปิดโหวตให้ทุกคน</button>:<div className="waiting" style={{width:'100%'}}>🗳️ หัวหน้าห้องเปิดโหวตได้ หรือรอหมดเวลา</div>}</div></>})()}
      {room.status==='voting'&&(()=>{const done=!!room.ready?.[myId];const spy=role?.type==='spy';return <>
        <SpyStage game={G.id} mode="vote" ids={players.map(p=>p.id)} av={av} done={players.filter(p=>room.ready?.[p.id]).map(p=>p.id)}/>
        <div className="round-top"><span className="eyebrow">รอบที่ {room.round?.number}</span>{room.round?.endsAt&&now>=room.round.endsAt&&<span className="timeout-tag">⏰ หมดเวลาถามตอบ</span>}</div>
        <Steps items={['ดูบทบาท','ถาม–ตอบ','โหวต','เฉลย']} at={2}/>
        <Phase art={spy?'spy':'vote'} tone={done?'good':'me'} kicker="🗳️ ลงคะแนน" title={done?'ยืนยันแล้ว รอเพื่อน…':spy?'แตะรูปคนที่จะโหวต แล้วเดา'+I:'ใครคือสายลับ? แตะรูปเพื่อโหวต'}>
          {spy?`คุณคือสายลับ — โหวตคนอื่นเพื่อเบี่ยงเบน แล้วเดา${I}ให้ถูก (+${SCORE.spyGuess})`:`โหวตถูกตัวสายลับ +${SCORE.rightVote} • จับสายลับได้ทั้งทีม +${SCORE.teamWin}`} • ยืนยันครบทุกคนแล้วไปหน้าเฉลยเอง</Phase>
        <PlayerGrid ids={players.filter(p=>p.id!==myId).map(p=>p.id)} av={av} nameOf={nameOf} selected={vote} onPick={done?undefined:castVote} badge={id=>vote===id?<span className="tag">โหวตคนนี้</span>:null}/>
        {spy&&<div className="guess-box"><div className="tip"><Art name="spy" size={42}/><span><b>สายลับเดาว่า{I}คือ…</b> พิมพ์หรือเลือกจากรายการ</span></div><input value={spyGuess} disabled={done} list="pool-list" onChange={e=>setSpyGuess(e.target.value)} placeholder={`พิมพ์${I}ที่คิดว่าใช่`}/><datalist id="pool-list">{(room.round?.pool||[]).map(pl=><option key={pl} value={pl}/>)}</datalist></div>}
        {done?<div className="confirmed">✅ ยืนยันแล้ว{vote&&<> — โหวต <Avatar id={room.votes?.[myId]||vote} av={av} size={24}/> <b>{nameOf(room.votes?.[myId]||vote)}</b></>}{spy&&room.spyGuess&&<> • เดา <b>{room.spyGuess}</b></>}<button className="link-btn" onClick={unconfirm}>แก้ไข</button></div>
          :<button className="primary wide" disabled={!vote} onClick={confirmVote}>✅ ยืนยัน{spy?'โหวตและคำตอบ':'โหวต'}{vote?` (${nameOf(vote)})`:''}</button>}
        <WhoDone ids={players.map(p=>p.id)} done={id=>!!room.ready?.[id]} av={av} nameOf={nameOf} label="🗳️ ยืนยันแล้ว"/>
        {allReady&&<div className="waiting">กำลังไปหน้าเฉลย…</div>}
        {isHost&&!allReady&&<HostBar><button className="secondary" onClick={()=>{if(confirm('สรุปผลเลยโดยไม่รอคนที่ยังไม่ยืนยัน?'))finishVote()}}>สรุปผลเลย (ไม่รอ)</button></HostBar>}</>})()}
      {room.status==='result'&&!G.type&&room.result&&(()=>{const R=room.result;const spyWins=R.spyWins??!R.caught;const tally=players.map(p=>({p,n:R.votes?.[p.id]||0})).sort((a,b)=>b.n-a.n);return <>
        <SpyStage game={G.id} mode={spyWins?'escape':'caught'} ids={players.filter(p=>p.id!==R.spyId).map(p=>p.id)} av={av}/>
        <div className="round-top"><span className="eyebrow">ผลการจับโป๊ะ • รอบที่ {room.round?.number}</span></div>
        <Steps items={['ดูบทบาท','ถาม–ตอบ','โหวต','เฉลย']} at={3}/>
        <Outcome art={spyWins?'escape':'handcuffs'} tone={spyWins?'bad':'good'} title={spyWins?'สายลับชนะ! 😭':'จับสายลับได้! 🎉'}>
          สายลับคือ <Avatar id={R.spyId} av={av} size={28}/> <b>{nameOf(R.spyId)}</b><br/>{I}จริงคือ <b>{room.round?.place}</b>
          {R.guess!==undefined&&<><br/>สายลับเดาว่า “<b>{R.guess||'ไม่ได้เดา'}</b>” — {R.guessCorrect?'เดาถูก! 😱':'เดาผิดจ้า'}</>}
        </Outcome>
        <p className="voted-out">{R.votedOut?<>ถูกโหวตออก: <Avatar id={R.votedOut} av={av} size={24}/> <b>{nameOf(R.votedOut)}</b> ({R.votes?.[R.votedOut]||0} โหวต • {R.majority?'เกินครึ่ง':'มากที่สุด'}){R.caught?' — โดนตัวสายลับ!':' — ไม่ใช่สายลับ'}</>:'คะแนนเสมอหรือไม่มีใครโหวต ไม่มีใครถูกโหวตออก'}</p>
        {R.caught&&R.guessCorrect&&<p className="hint">จับสายลับได้ แต่สายลับเดา{I}ถูก เลยพลิกกลับมาชนะ</p>}
        <SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={R.points} myId={myId} av={av} mark={id=>id===R.spyId?' 🕵️':''}/>
        <SecH icon="📊">คะแนนโหวต</SecH><ul className="tally">{tally.map(({p,n})=><li key={p.id} className={p.id===R.votedOut?'out':''}><span><Avatar id={p.id} av={av} size={22}/> {p.name}</span><i style={{width:`${players.length?n/players.length*100:0}%`}}/><b>{n} โหวต</b></li>)}</ul>
        <SecH icon="🗳️">ใครโหวตใคร</SecH><Ballots ids={players.map(p=>p.id)} ballots={R.ballots} av={av} nameOf={nameOf} hit={t=>t===R.spyId}/>
        <SecH icon="🎭">บทบาทของแต่ละคน</SecH><RevealGrid av={av} nameOf={nameOf} items={players.map(p=>{const x=room.round?.roles?.[p.id];return {id:p.id,art:x?.type==='spy'?'spy':G.roles?'pin':'bubble',label:x?.type==='spy'?'สายลับ':(x?.role||(G.roles?'คนในพื้นที่':'รู้คำลับ')),bad:x?.type==='spy'}})}/>
        {isHost?<button className="primary wide" onClick={backToLobby}><RotateCcw size={17}/> กลับห้องรอแล้วเล่นรอบใหม่</button>:<div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}</>})()}
      {G.type==='head'&&room.status!=='lobby'&&room.round&&<HeadGame room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} av={av} nameOf={nameOf} msg={msg} onBack={backToLobby} srvNow={srvNow}/>}
      {G.type==='explore'&&room.status==='lobby'&&(()=>{const n=players.length,ok=n>=EXPLORE_MIN;const sz=ok?teamSizes(n):null,nf=ok?needFails(n):null;return <><span className="eyebrow">พร้อมยัง?</span><h2>รวมคณะให้ครบ แล้วออกเดินทาง</h2>
        <p className="hint">เล่นได้ {EXPLORE_MIN}–12 คน • โจรขุดสมบัติราว 1 ใน 3 ของวง • คุยกันทางเสียงระหว่างเลือกคณะ</p>
        {ok&&<div className="score-rules"><b>🗺️ วงนี้ {n} คน</b><span>โจร {traitorCount(n)} คน • นักสำรวจ {n-traitorCount(n)} คน</span><span>จำนวนคนต่อด่าน: {sz.map((s,i)=>nf[i]>1?`${s}*`:s).join(' → ')}{nf.some(x=>x>1)&&' (* ต้องก่อวินาศ 2 ใบถึงพัง)'}</span><span>ค้านคณะติดกัน {MAX_REJECT} ครั้ง = โจรชนะ</span></div>}
        <div className="score-rules"><b>🎭 บทบาทพิเศษ</b>
          <span>🏮 ผู้ถือตะเกียง (ฝ่ายดี มีทุกตา) — รู้ตั้งแต่แรกว่าใครเป็นโจร แต่ถ้านักสำรวจผ่าน 3 ด่าน โจรได้ชี้ตัว 1 ครั้ง ชี้ถูก = โจรพลิกชนะ</span>
          <label className="cat-toggle"><input type="checkbox" className="tick" checked={exOpts.mole} disabled={!isHost} onChange={e=>setExOpts(o=>({...o,mole:e.target.checked}))}/> 🐍 จอมแฝงตัว (ฝ่ายโจร) — ผู้ถือตะเกียงมองไม่เห็น</label></div>
        <div className="score-rules"><b>🏅 คะแนน</b><span>นักสำรวจชนะ: ฝ่ายนักสำรวจคนละ +{EXPLORE_SCORE.good}</span><span>โจรชนะ: ฝ่ายโจรคนละ +{EXPLORE_SCORE.bad}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>
        {outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}
        {isHost?<button className="primary wide" disabled={!ok||outdated.length>0} onClick={startGame}>🧭 ออกเดินทาง ({n} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องเริ่มเกมอยู่เด้อ</div>}</>})()}
      {G.type==='explore'&&room.status!=='lobby'&&room.round?.kind==='explore'&&<ExploreGame db={db} room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} av={av} nameOf={nameOf} msg={msg} onBack={backToLobby}/>}
      {G.type==='wolf'&&room.status==='lobby'&&(()=>{const n=players.length,ok=n>=WOLF_MIN;const P=wolfPlan(n,wfOpts);return <><span className="eyebrow">พร้อมยัง?</span><h2>หมู่บ้านนี้…มีหมาป่าปนอยู่</h2>
        <p className="hint">เล่นได้ {WOLF_MIN}–12 คน • ระบบเป็นผู้ดำเนินเกม ทุกคนดูจอตัวเอง แล้วคุยกันทางเสียง</p>
        {ok&&<div className="score-rules"><b>🎭 บทบาทในวงนี้ ({n} คน)</b><span>🐺 หมาป่า {P.k} • 🔮 หมอดู 1 • 💉 หมอยา 1{P.hunter?' • 🏹 นายพราน 1':''}{P.cupid?' • 💘 กามเทพ 1':''}{P.fool?' • 🤪 คนบ้า 1':''} • 👨‍🌾 ชาวบ้าน {P.villagers}</span></div>}
        <div className="score-rules"><b>⚙️ ตั้งค่า</b>
          <label className="cat-toggle"><input type="checkbox" className="tick" checked={wfOpts.hunter} disabled={!isHost} onChange={e=>setWfOpts(o=>({...o,hunter:e.target.checked}))}/> 🏹 มีนายพราน (6 คนขึ้นไป) — ตายแล้วยิงพาไปด้วย 1 คน</label>
          <label className="cat-toggle"><input type="checkbox" className="tick" checked={!!wfOpts.cupid} disabled={!isHost} onChange={e=>setWfOpts(o=>({...o,cupid:e.target.checked}))}/> 💘 มีกามเทพ — คืนแรกจับคู่รัก 2 คน ถ้าคนหนึ่งตาย อีกคนตายตาม</label>
          <label className="cat-toggle"><input type="checkbox" className="tick" checked={!!wfOpts.fool} disabled={!isHost} onChange={e=>setWfOpts(o=>({...o,fool:e.target.checked}))}/> 🤪 มีคนบ้า — ฝ่ายตัวเอง ชนะทันทีถ้าถูกโหวตประหาร</label>
          <label className="cat-toggle"><input type="checkbox" className="tick" checked={wfOpts.reveal} disabled={!isHost} onChange={e=>setWfOpts(o=>({...o,reveal:e.target.checked}))}/> ⚰️ เปิดบทบาทคนที่ตาย</label></div>
        <div className="score-rules"><b>🏅 คะแนน</b><span>ชาวบ้านชนะ: ฝ่ายชาวบ้านคนละ +{WOLF_SCORE.village} (รวมคนที่ตายไปแล้ว)</span><span>หมาป่าชนะ: หมาป่าคนละ +{WOLF_SCORE.wolf}</span><span>คนบ้าถูกประหาร: คนบ้าคนเดียว +{WOLF_SCORE.fool} • คู่รักรอดทั้งคู่: โบนัสคนละ +{WOLF_SCORE.love}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>
        {outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}
        {isHost?<button className="primary wide" disabled={!ok||outdated.length>0} onClick={startGame}>🌙 เริ่มคืนแรก ({n} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องเริ่มเกมอยู่เด้อ</div>}</>})()}
      {G.type==='wolf'&&room.status!=='lobby'&&room.round?.kind==='wolf'&&<WolfGame db={db} room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} av={av} nameOf={nameOf} onBack={backToLobby}/>}
      {G.type==='cake'&&room.status==='lobby'&&(()=>{const n=players.length,ok=n>=CAKE_MIN;const a=accCount(n);return <><span className="eyebrow">พร้อมยัง?</span><h2>เค้กชิ้นสุดท้ายในตู้เย็น…</h2>
        <p className="hint">เล่นได้ {CAKE_MIN}–12 คน • ระบบทอยเต๋าให้ทุกคน กลางคืนเดินจากตี 1 ถึงตี 6 ทุกช่วงยาวเท่ากัน • ควรเข้าห้องเสียงไว้ เพราะกลางคืนคุยได้เฉพาะคนที่ตื่นพร้อมกัน</p>
        {ok&&<div className="score-rules"><b>🎭 วงนี้ {n} คน</b><span>😈 จอมแอบกิน 1 • 🤝 ลูกสมุน {a} (ขโมยเลือกเองตอนตื่น) • 😋 หิวโหย {n-1-a}</span></div>}
        <label>เวลาต่อชั่วโมง (กลางคืน)</label><select value={ckOpts.hourSec} disabled={!isHost} onChange={e=>setCkOpts(o=>({...o,hourSec:+e.target.value}))}><option value={15}>15 วินาที</option><option value={20}>20 วินาที</option><option value={30}>30 วินาที</option><option value={45}>45 วินาที</option></select>
        <div className="score-rules"><b>🏅 คะแนน</b><span>โหวตถูกตัวขโมย: ฝ่ายหิวโหยคนละ +{CAKE_SCORE.hungry}</span><span>โหวตผิดหรือเสมอ: ขโมย +{CAKE_SCORE.thief} • ลูกสมุน +{CAKE_SCORE.acc}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>
        {outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}
        {isHost?<button className="primary wide" disabled={!ok||outdated.length>0} onClick={startGame}>🌙 เข้านอน ({n} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องเริ่มเกมอยู่เด้อ</div>}</>})()}
      {G.type==='cake'&&room.status!=='lobby'&&room.round?.kind==='cake'&&<CakeGame db={db} room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} av={av} nameOf={nameOf} msg={msg} onBack={backToLobby} srvNow={srvNow}/>}
      {G.type==='deal'&&room.status==='lobby'&&(()=>{const n=players.length,ok=n>=DEAL_MIN&&n<=DEAL_MAX;return <><span className="eyebrow">พร้อมยัง?</span><h2>ห้องประชุมพร้อม…ใครจะคุมดีล?</h2>
        <p className="hint">เล่นได้ {DEAL_MIN}–{DEAL_MAX} คน • เปิดห้องเสียงไว้ต่อรองกันสด ๆ จะสนุกที่สุด • เกมจบเมื่อทอยได้เลขการ์ดจบเกม หรือปิดดีลครบทุกช่อง ใครรวยสุดชนะ</p>
        {n>DEAL_MAX&&<div className="warn">⚠️ เกมนี้เล่นได้สูงสุด {DEAL_MAX} คน — ตอนนี้มี {n} คน</div>}
        <DealLobby n={n}/>
        <div className="score-rules"><b>🏅 คะแนน</b><span>รวยที่สุด +{DEAL_SCORE.win} • อันดับ 2 +{DEAL_SCORE.second}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>
        {outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}
        {isHost?<button className="primary wide" disabled={!ok||outdated.length>0} onClick={startGame}>💼 เปิดห้องประชุม ({n} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องเริ่มเกมอยู่</div>}</>})()}
      {G.type==='deal'&&room.status!=='lobby'&&room.round?.kind==='deal'&&<DealGame db={db} room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} av={av} nameOf={nameOf} msg={msg} onBack={backToLobby} srvNow={srvNow}/>}
      {G.type==='checkpoint'&&room.status==='lobby'&&(()=>{const n=players.length,ok=n>=CP_MIN&&n<=CP_MAX,laps=room.settings?.cpLaps||lapsFor(n);return <><span className="eyebrow">พร้อมยัง?</span><h2>ด่านตรวจตีสอง…ใครจะเป็นจ่าก่อน?</h2>
        <p className="hint">เล่นได้ {CP_MIN}–{CP_MAX} คน • เปิดห้องเสียงไว้ต่อรองกับจ่าสด ๆ จะสนุกที่สุด • เกมละประมาณ {Math.max(1,Math.round(n*laps*2.5))}–{Math.max(2,Math.round(n*laps*4))} นาที</p>
        {n>CP_MAX&&<div className="warn">⚠️ เกมนี้เล่นได้สูงสุด {CP_MAX} คน — ตอนนี้มี {n} คน</div>}
        <CheckpointLobby n={n}/>
        <label>👮 ทุกคนเป็นจ่ากี่ครั้ง {isHost?'(หัวหน้าห้องตั้ง)':'(หัวหน้าห้องเป็นคนตั้ง)'}</label><select value={laps} disabled={!isHost} onChange={e=>update(ref(db,`rooms/${roomCode}/settings`),{cpLaps:+e.target.value})}><option value={1}>คนละ 1 ครั้ง ({n} ด่าน)</option><option value={2}>คนละ 2 ครั้ง ({n*2} ด่าน)</option><option value={3}>คนละ 3 ครั้ง ({n*3} ด่าน)</option></select>
        <div className="score-rules"><b>🏅 คะแนน</b><span>รวยสุดหน้าด่าน +{CP_SCORE.win} • อันดับ 2 +{CP_SCORE.second}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>
        {outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}
        {isHost?<button className="primary wide" disabled={!ok||outdated.length>0} onClick={startGame}>🚧 ตั้งด่านตรวจ ({n} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องตั้งด่านอยู่</div>}</>})()}
      {G.type==='checkpoint'&&room.status!=='lobby'&&room.round?.kind==='checkpoint'&&<CheckpointGame db={db} room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} av={av} nameOf={nameOf} msg={msg} onBack={backToLobby} srvNow={srvNow}/>}
      {G.type==='tam'&&room.status==='lobby'&&(()=>{const n=players.length,ok=n>=TAM_MIN&&n<=TAM_MAX;return <><span className="eyebrow">พร้อมยัง?</span><h2>ครกพร้อม…ใครจะโดนตำ?</h2>
        <p className="hint">เล่นได้ {TAM_MIN}–{TAM_MAX} คน • ลงไพ่ตรงรสหรือตรงเลข หมดมือก่อนชนะ • ไพ่บวกซ้อนกันได้ • ถือไพ่ถึง {MERCY} ใบตกรอบ</p>
        {n>TAM_MAX&&<div className="warn">⚠️ เกมนี้เล่นได้สูงสุด {TAM_MAX} คน — ตอนนี้มี {n} คน</div>}
        <TamLobby n={n}/>
        <div className="score-rules"><b>🏅 คะแนน</b><span>หมดมือก่อน หรือรอดคนสุดท้าย +{TAM_SCORE.win}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>
        {outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}
        {isHost?<button className="primary wide" disabled={!ok||outdated.length>0} onClick={startGame}>🌶️ สับไพ่แล้วแจก ({n} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องแจกไพ่อยู่</div>}</>})()}
      {G.type==='tam'&&room.status!=='lobby'&&room.round?.kind==='tam'&&<TamGame db={db} room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} av={av} nameOf={nameOf} msg={msg} onBack={backToLobby} srvNow={srvNow}/>}
      {G.type==='boom'&&room.status==='lobby'&&(()=>{const n=players.length,ok=n>=BOOM_MIN&&n<=BOOM_MAX;return <><span className="eyebrow">พร้อมยัง?</span><h2>ทุเรียนลูกไหน…จะตูมใส่ใคร?</h2>
        <p className="hint">เล่นได้ {BOOM_MIN}–{BOOM_MAX} คน • ผลัดกันจั่ว ใครจั่วได้ทุเรียนตูมแล้วไม่มีที่หนีบจมูก = ตกรอบ • รอดคนสุดท้ายชนะ • “ไม่เอา!” กดสวนได้ทุกเมื่อแม้ไม่ใช่ตาตัวเอง</p>
        {n>BOOM_MAX&&<div className="warn">⚠️ เกมนี้เล่นได้สูงสุด {BOOM_MAX} คน — ตอนนี้มี {n} คน</div>}
        <BoomLobby n={n}/>
        <div className="score-rules"><b>🏅 คะแนน</b><span>รอดคนสุดท้าย +{BOOM_SCORE.win} • ตกรอบเป็นคนสุดท้าย (อันดับ 2) +{BOOM_SCORE.second}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>
        {outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}
        {isHost?<button className="primary wide" disabled={!ok||outdated.length>0} onClick={startGame}>💥 สับไพ่แล้วแจก ({n} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องแจกไพ่อยู่</div>}</>})()}
      {G.type==='boom'&&room.status!=='lobby'&&room.round?.kind==='boom'&&<BoomGame db={db} room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} av={av} nameOf={nameOf} msg={msg} onBack={backToLobby} srvNow={srvNow}/>}
      {G.type==='curse'&&room.status==='lobby'&&(()=>{const n=players.length,ok=n>=CURSE_MIN&&n<=CURSE_MAX;return <><span className="eyebrow">พร้อมยัง?</span><h2>บ้านนาดง…มีผีปอปสิงอยู่</h2>
        <p className="hint">เล่นได้ {CURSE_MIN}–{CURSE_MAX} คน • ควรเข้าห้องเสียงไว้ ตอนกลางวันคุยกันได้ทุกคน คืนเดือนดับได้ยินกันเฉพาะผีปอป • เกมละประมาณ 20–40 นาที</p>
        <CurseLobby n={n}/>
        <label className="cat-toggle"><input type="checkbox" className="tick" checked={csOpts.ritual} disabled={!isHost} onChange={e=>setCsOpts(o=>({...o,ritual:e.target.checked}))}/> ใส่ไพ่ “ปอปย้ายร่าง” ในกอง (ทุกคนส่งไพ่ดวงให้คนถัดไป ปอปอาจย้ายไปสิงคนอื่น!)</label>
        <div className="score-rules"><b>🏅 คะแนน</b><span>เปิดปอปสิงได้ครบ: ชาวบ้านทุกคน (รวมคนที่ตาย) +{CURSE_SCORE.town}</span><span>ชาวบ้านตายหมด: ผีปอป +{CURSE_SCORE.dark}</span>{isHost&&Object.keys(scores).length>0&&<button className="link-btn" onClick={resetScores}>ล้างคะแนนสะสม</button>}</div>
        {outdated.length>0&&<div className="warn">⚠️ {outdated.map(p=>p.name).join(', ')} ใช้เวอร์ชันเก่า ให้รีเฟรชหน้าเว็บแล้วเข้าห้องใหม่ก่อนเริ่มเกม</div>}
        {isHost?<button className="primary wide" disabled={!ok||outdated.length>0} onClick={startGame}>👻 แจกไพ่ดวง ({n} คน)</button>:<div className="waiting">⏳ รอหัวหน้าห้องแจกไพ่ดวงอยู่</div>}</>})()}
      {G.type==='curse'&&room.status!=='lobby'&&room.round?.kind==='curse'&&<CurseGame db={db} room={room} roomCode={roomCode} myId={myId} players={players} isHost={isHost} scores={scores} sound={sound} av={av} nameOf={nameOf} msg={msg} onBack={backToLobby} srvNow={srvNow}/>}
      </section>{!G.type&&(room.status==='playing'||room.status==='voting')&&room.round&&<PlaceBoard key={roomCode+'-'+room.round.number} places={room.round.pool||[]} I={I} U={U}/>}</div>
      {room.status==='lobby'&&!['explore','wolf','cake','boom','curse','tam','deal','checkpoint'].includes(G.type)&&<PlacePicker I={I} U={U} packs={packs} isOn={isOn} packOnCount={packOnCount} total={placePool.length} canEdit={canEdit} onTogglePlace={togglePlace} onTogglePack={togglePack} onSetAll={setAll} onAddPlace={addPlace}/>}
      {isHost&&room.status==='lobby'&&!['explore','wolf','cake','boom','curse','tam','deal','checkpoint'].includes(G.type)&&<section className="panel pack-panel"><h2><MapPin size={20}/> สร้างชุด{I}ใหม่</h2><p>สร้างชุด{I}เฉพาะแก๊งได้ เช่น มุกในกลุ่ม เพื่อนในห้อง หรือร้านประจำ</p><div className="pack-form"><div><label>ชื่อชุด</label><input value={packName} onChange={e=>setPackName(e.target.value)} placeholder="เช่น มุกในแก๊งเรา"/></div><div><label>{I} (หนึ่งบรรทัดต่อหนึ่ง{U})</label><textarea rows="4" value={packPlaces} onChange={e=>setPackPlaces(e.target.value)} placeholder={'บ้านไอ้บอส\nร้านหมูกระทะร้านเดิม\nห้องเรียนคาบเช้า'}/></div><button className="secondary" onClick={addPack}><Plus size={16}/> สร้างชุดนี้</button></div></section>}
    </main>}
    <footer><span>🎲 {BRAND} • เวอร์ชัน {APP_VERSION}</span><span>ทำมาให้แก๊งเพื่อนจับโป๊ะกัน 🇹🇭</span></footer>
  </div>
}
function HeadGame({room,roomCode,myId,players,isHost,scores,sound,av,nameOf,msg,onBack,srvNow}){
  const r=room.round;const [g,setG]=useState('');const [guessing,setGuessing]=useState(false);
  const order=(r.order||[]).filter(id=>room.players?.[id]);const solved=r.solved||{};
  const turnId=(r.order||[])[r.turn];const myTurn=room.status==='playing'&&turnId===myId&&!solved[myId];
  const log=Object.entries(r.log||{}).sort((a,b)=>b[0].localeCompare(a[0])).map(x=>x[1]);
  const medal=n=>['🥇','🥈','🥉'][n-1]||`#${n}`;
  useEffect(()=>{if(myTurn)sfx(sound,'turn');setGuessing(false);setG('')},[myTurn,r.turn]);
  // เลื่อนตาไปคนถัดไปที่ยังไม่ทายถูก ถ้าทายถูกครบทุกคนแล้วจบเกมและบวกคะแนน
  function step(cur,entry){
    const rd=cur.round;const sv=rd.solved||{};const here=(rd.order||[]).filter(id=>cur.players?.[id]);
    const lg={...(rd.log||{})};let n0=0;const k=()=>`${Date.now()}_${n0++}`;
    if(entry)lg[k()]=entry;
    rd.log=lg;
    if(here.every(id=>sv[id]))return finish(cur);
    const n=(rd.order||[]).length;let t=rd.turn;
    for(let i=1;i<=n;i++){const id=rd.order[(rd.turn+i)%n];if(cur.players?.[id]&&!sv[id]){t=(rd.turn+i)%n;break}}
    rd.turn=t;rd.turnAt=srvNow;return cur;
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
    setG('');msg(ok?'ถูกต้อง! 🎉 นั่งชิล ๆ ช่วยเพื่อนตอบต่อได้':'ยังไม่ใช่ 😅 ไว้ลองใหม่ตาหน้า');sfx(sound,ok?'right':'wrong')}
  async function pass(byHost){sfx(sound,'click');await tx(cur=>{const rd=cur.round;const who=rd.order[rd.turn];if(!byHost&&who!==myId)return;return step(cur,{type:'pass',by:who,host:!!byHost})})}
  async function accept(pid){if(!confirm(`นับว่า ${nameOf(pid)} ทายถูก?`))return;
    await tx(cur=>{const rd=cur.round;if(rd.solved?.[pid])return;rd.solved={...(rd.solved||{}),[pid]:Object.keys(rd.solved||{}).length+1};
      const lg={...(rd.log||{})};lg[`${Date.now()}_ok`]={type:'accept',by:pid};rd.log=lg;
      if((rd.order||[]).filter(id=>cur.players?.[id]).every(id=>rd.solved[id]))return finish(cur);
      if(rd.order[rd.turn]===pid)return step(cur,null);return cur})}
  const tMs=r.turnMs||0;const timed=tMs>0&&!!r.turnAt&&room.status==='playing';
  const tLeft=timed?Math.max(0,Math.ceil((r.turnAt+tMs-srvNow)/1000)):null;const tDue=timed&&srvNow>=r.turnAt+tMs;
  useEffect(()=>{if(!tDue)return;tx(cur=>{const rd=cur.round;if(!(rd.turnMs>0)||!rd.turnAt||srvNow<rd.turnAt+rd.turnMs)return;const who=rd.order[rd.turn];if(rd.solved?.[who])return step(cur,null);return step(cur,{type:'pass',by:who,timeout:true})})},[tDue,r.turn,r.turnAt]);
  useEffect(()=>{if(myTurn&&tLeft===10)sfx(sound,'timeup')},[myTurn&&tLeft===10]);
  const ring=timed?<TimerRing secs={tLeft} total={Math.round(tMs/1000)} label="วินาที"/>:null;
  async function endNow(){if(!confirm('จบเกมเลย? คนที่ยังทายไม่ได้จะได้ 0 แต้ม'))return;await tx(cur=>finish(cur))}
  const res=room.status==='result'&&room.result;
  // คนที่จะเล่นต่อจากตานี้
  const n=(r.order||[]).length;let nextId=null;for(let i=1;i<=n;i++){const id=(r.order||[])[(r.turn+i)%n];if(room.players?.[id]&&!solved[id]&&id!==turnId){nextId=id;break}}
  const note=(id,big)=>{const mine=id===myId,sv=solved[id],show=!mine||sv||res;
    return <div className={'head-card'+(id===turnId&&!res?' turn':'')+(sv?' solved':'')+(mine?' me':'')+(big?' big':'')}>
      <div className="hc-owner"><Avatar id={id} av={av} size={big?30:24}/><span>{mine?'คำของคุณ':`คำของ ${nameOf(id)}`}</span></div>
      <b>{show?r.words?.[id]:'❓ ???'}</b>
      {mine&&!show&&<small className="hc-hint">มองไม่เห็นคำตัวเอง — ถามเพื่อนเอา</small>}
      {sv?<span className="head-rank">{medal(sv)} ทายถูกแล้ว{res&&` +${room.result.points?.[id]||0}`}</span>:res?<span className="head-rank miss">ยังทายไม่ได้</span>:id===turnId?<span className="hc-turn">🎯 กำลังทาย</span>:null}
    </div>};
  return <div className="head-game">
    <div className="round-top"><span className="eyebrow">รอบที่ {r.number}</span><span className="cat-tag">หมวด: {r.cat}{tMs>0?` • ⏱️ ตาละ ${tMs>=60000&&tMs%60000===0?tMs/60000+' นาที':Math.round(tMs/1000)+' วิ'}`:''}</span></div>
    <div className="gcols flow"><div className="gmain">
    <HeadStage mode={res?'end':'ask'} a={av(turnId)} word={r.words?.[turnId]} mine={turnId===myId} others={order.filter(id=>id!==turnId)} av={av}/>
    {/* ลำดับการเล่น */}
    <div className="turn-strip">{order.map((id,i)=><React.Fragment key={id}>{i>0&&<i className="ts-arrow">›</i>}<span className={'ts'+(id===turnId&&!res?' now':'')+(solved[id]?' done':'')} title={nameOf(id)}><Avatar id={id} av={av} size={id===turnId&&!res?40:30}/>{solved[id]?<em>{medal(solved[id])}</em>:id===turnId&&!res?<em>ตานี้</em>:null}</span></React.Fragment>)}</div>

    {!res&&(solved[myId]?<Phase art="medal" tone="good" kicker={`คุณทายถูกแล้ว ${medal(solved[myId])}`} title="นั่งชิล ๆ ช่วยเพื่อนตอบ" aside={ring}>ตอนนี้ตาของ <b>{nameOf(turnId)}</b> — ตอบคำถามเขาแค่ ใช่ / ไม่ใช่</Phase>
      :myTurn?<Phase art="note" tone="me" kicker="🎯 ถึงตาคุณแล้ว!" title="ถามเพื่อน 1 คำถาม แล้วเลือก ทาย หรือ ข้าม" aside={ring}>ถามแบบตอบได้แค่ ใช่/ไม่ใช่ เช่น “ฉันกินได้ไหม?” “ฉันตัวใหญ่กว่าแมวไหม?”</Phase>
      :<Phase art="think" kicker={`ตาของ ${nameOf(turnId)}`} aside={ring} title={<>ช่วย <Avatar id={turnId} av={av} size={28}/> {nameOf(turnId)} ตอบ ใช่ / ไม่ใช่</>}>คำที่เขาต้องทายอยู่ในกรอบใหญ่ด้านล่าง{nextId&&<> • คนต่อไป: <b>{nextId===myId?'คุณ':nameOf(nextId)}</b></>}</Phase>)}

    {myTurn&&<div className="head-act">
      {guessing?<><div className="add-place"><input autoFocus value={g} list="head-pool" onChange={e=>setG(e.target.value)} onKeyDown={e=>e.key==='Enter'&&guess()} placeholder="พิมพ์คำที่คิดว่าเป็นคำของคุณ"/><datalist id="head-pool">{(r.pool||[]).map(w=><option key={w} value={w}/>)}</datalist></div>
        <div className="choices"><Choice art="guess" label="ส่งคำตอบ" sub="ทายได้ 1 ครั้งต่อตา" tone="good" onClick={guess}/><Choice art="skip" label="ยกเลิก" sub="กลับไปเลือกใหม่" onClick={()=>{setGuessing(false);setG('')}}/></div></>
      :<div className="choices"><Choice art="guess" label="ทายคำ" sub="รู้แล้ว! พิมพ์คำตอบ" tone="good" onClick={()=>{sfx(sound,'click');setGuessing(true)}}/><Choice art="skip" label="ข้ามตา" sub="ยังไม่ชัวร์ ไว้ตาหน้า" onClick={()=>pass(false)}/></div>}
    </div>}

    {!res&&turnId!==myId&&!solved[turnId]&&<div className="head-spot"><span className="hs-label">🔦 ตอนนี้ {nameOf(turnId)} กำลังทายคำนี้</span>{note(turnId,true)}</div>}
    {res&&<Outcome art="medal" tone="good" title="จบเกมแล้ว! 🏁">ทายถูกก่อนได้แต้มมากกว่า • อันดับ 1 ได้ {order.length-1} แต้ม</Outcome>}

    {!res&&isHost&&<HostBar>{turnId!==myId&&<button className="secondary" onClick={()=>pass(true)}>⏭️ ข้ามตา {nameOf(turnId)}</button>}<button className="secondary" onClick={endNow}>🏁 จบเกมเลย</button></HostBar>}
    {res&&<><SecH icon="🏅">ตารางคะแนนสะสม</SecH><Leaderboard players={players} scores={scores} points={room.result.points} myId={myId} av={av}/>
      {isHost?<button className="primary wide" onClick={onBack}><RotateCcw size={17}/> กลับห้องรอแล้วเล่นรอบใหม่</button>:<div className="waiting">รอหัวหน้าห้องเริ่มรอบใหม่…</div>}</>}
    </div><div className="gside">
    <SecH icon="🗒️">คำบนหัวของทุกคน <small>{res?'เฉลยทุกคำ':'คุณเห็นของทุกคน ยกเว้นของตัวเอง'}</small></SecH>
    <div className="head-grid">{order.map(id=><React.Fragment key={id}>{note(id)}</React.Fragment>)}</div>

    {log.length>0&&<><SecH icon="📜">บันทึกเกม</SecH><ul className="head-log">{log.map((e,i)=><li key={i}><Avatar id={e.by} av={av} size={24}/>
      {e.type==='guess'&&<><b>{nameOf(e.by)}</b> ทาย “{e.text}” — {e.ok?<span className="ok">ถูก! 🎉</span>:<span className="bad">ผิด</span>}{!e.ok&&isHost&&!res&&!solved[e.by]&&<button className="link-btn" onClick={()=>accept(e.by)}>นับว่าถูก</button>}</>}
      {e.type==='pass'&&<><b>{nameOf(e.by)}</b> {e.timeout?'หมดเวลา ⏰ ข้ามตาอัตโนมัติ':e.host?'ถูก host ข้ามตา':'ข้ามตา ⏭️'}</>}
      {e.type==='accept'&&<><b>{nameOf(e.by)}</b> — host นับว่าทายถูก ✅</>}
    </li>)}</ul></>}
    </div></div>
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
