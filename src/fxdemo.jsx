// หน้าเดโมสำหรับดูอนิเมชัน SVG ทั้งหมดในเว็บ (ไม่ได้ใช้ในเกมจริง) — เปิดที่ /fxdemo.html
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { SpyStage, CurseStage, ExploreStage, HeadStage } from './stages.jsx';
import { CakeStage } from './cakestage.jsx';
import IntroFilm from './intro.jsx';
import { CatScare } from './boom.jsx';
import { OpenFx, PassFx } from './checkpoint.jsx';
import { BombFx } from './clue.jsx';
import { SnakeFx } from './snake.jsx';
import { randomLook, Char } from './char.jsx';
import { WolfFx } from './wolffx.jsx';

const IDS = ['a', 'b', 'c', 'd', 'e', 'f'];
const NAMES = { a: 'ต้น', b: 'มายด์', c: 'บอส', d: 'แพร', e: 'เจ', f: 'ฟ้า' };
const nameOf = id => NAMES[id] || '?';
const mkLooks = () => Object.fromEntries(IDS.map((id, i) => [id, { look: randomLook(), c: (i * 3 + 1) % 16 }]));

const Card = ({ t, children }) => <div style={{ minWidth: 0 }}><small style={{ display: 'block', margin: '0 0 4px', opacity: .8 }}>{t}</small>{children}</div>;
const Grid = ({ children }) => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 14 }}>{children}</div>;
const H = ({ children }) => <h3 style={{ margin: '26px 0 10px' }}>{children}</h3>;

function Demo() {
  const [looks, setLooks] = useState(mkLooks);
  const av = id => looks[id];
  const [film, setFilm] = useState(null);
  const [pop, setPop] = useState(null);
  const [snake, setSnake] = useState(null);
  const [wolf, setWolf] = useState([]);
  const playWolf = kind => setWolf(w => [...w, { key: 'w' + Date.now(), events: [{ kind, who: 'c', role: 'ชาวบ้าน' }] }]);
  const btn = { padding: '10px 14px', margin: 4, fontSize: 15, borderRadius: 10 };
  const close = () => setPop(null);
  return <div style={{ padding: 16, maxWidth: 1100, margin: '0 auto' }}>
    <h2>อนิเมชัน SVG ทั้งหมดในเว็บ</h2>
    <button style={btn} onClick={() => setLooks(mkLooks())}>🎲 สุ่มหน้าตาตัวละครใหม่</button>

    <H>🎬 ฉากเปิด / ฉากจบเต็มจอ — กดเพื่อเล่น</H>
    {[['deal-win', 'ปิดดีล: ฉากจบผู้ชนะ'], ['cake', 'เค้กหายไปไหน: ฉากเปิด'], ['cake-caught', 'เค้ก: ฉากจบ จับขโมยได้'], ['cake-escape', 'เค้ก: ฉากจบ ขโมยหนีรอด'], ['checkpoint', 'ด่านตรวจ: ฉากเปิด']].map(([id, t]) => <button key={id} style={btn} onClick={() => setFilm(id)}>{t}</button>)}

    <H>🥚 ท่าทางตัวละคร</H>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>{[['idle', 'ยืน'], ['walk', 'เดิน'], ['wave', 'โบกมือ'], ['talk', 'พูด'], ['happy', 'ดีใจ'], ['sad', 'เสียใจ'], ['shock', 'ตกใจ'], ['think', 'คิด'], ['dead', 'ตกรอบ']].map(([m, t], i) => <div key={m} style={{ textAlign: 'center', background: '#ffffff0d', borderRadius: 12, padding: '8px 10px' }}><Char look={av(IDS[i % 6]).look} color={av(IDS[i % 6]).c} full size={70} mood={m} /><small style={{ display: 'block' }}>{t}</small></div>)}</div>

    <H>🐺 มนุษย์หมาป่า — กดเพื่อเล่น (ตัวละคร "บอส")</H>
    {[['bite', 'หมาป่ากัด'], ['save', 'หมอช่วยไว้'], ['vote', 'โหวตประหาร'], ['shot', 'นายพรานยิง'], ['heart', 'คู่รักตายตาม'], ['calm', 'คืนสงบ']].map(([k, t]) => <button key={k} style={btn} onClick={() => playWolf(k)}>{t}</button>)}
    <WolfFx items={wolf} av={av} nameOf={nameOf} />

    <H>💥 ป๊อปอัปเหตุการณ์ในเกม — กดเพื่อเล่น</H>
    <button style={btn} onClick={() => setPop('cat')}>กล่องแมวโมโห: แมวกระโดดใส่</button>
    <button style={btn} onClick={() => setPop('open-bad')}>ด่านตรวจ: เปิดกระเป๋า จับได้</button>
    <button style={btn} onClick={() => setPop('open-ok')}>ด่านตรวจ: เปิดกระเป๋า ของจริง</button>
    <button style={btn} onClick={() => setPop('pass')}>ด่านตรวจ: ปล่อยผ่าน + ซองใต้โต๊ะ</button>
    <button style={btn} onClick={() => setPop('bomb')}>รหัสลับ: เปิดเจอระเบิด</button>
    <button style={btn} onClick={() => setSnake({ key: Date.now(), kind: 'kill', ico: '🗡️', text: 'มายด์ ถูกฆาตกรรม' })}>ฆาตกรรม: มีคนตาย</button>
    <button style={btn} onClick={() => setSnake({ key: Date.now(), kind: 'calm', ico: '🛡️', text: 'เมื่อคืนไม่มีใครตาย' })}>ฆาตกรรม: ไม่มีใครตาย</button>

    <H>🕵️ สายลับ (Spyfall)</H>
    <Grid>{['talk', 'vote', 'caught', 'escape'].map(m => <Card key={m} t={m}><SpyStage game="spyfall" mode={m} ids={IDS} av={av} /></Card>)}</Grid>
    <H>🤫 SPY (ใบ้คำ)</H>
    <Grid>{['talk', 'vote', 'caught', 'escape'].map(m => <Card key={m} t={m}><SpyStage game="spy" mode={m} ids={IDS} av={av} speaker={m === 'talk' ? 'c' : null} /></Card>)}</Grid>
    <H>👻 ผีปอป (คำสาป)</H>
    <Grid>{['day', 'reveal', 'night', 'townWin', 'popWin'].map(m => <Card key={m} t={m}><CurseStage mode={m} /></Card>)}</Grid>
    <H>🧭 คณะสำรวจ</H>
    <Grid>{['pick', 'approve', 'mission', 'hunt', 'win', 'lose'].map(m => <Card key={m} t={m}><ExploreStage mode={m} stage={1} hist={[{ stage: 0, ok: true }]} /></Card>)}</Grid>
    <H>🙈 คำบนหัว</H>
    <Grid>
      <Card t="ask (เพื่อนถาม)"><HeadStage mode="ask" a={av('a')} word="ส้มตำ" others={IDS.slice(1)} av={av} /></Card>
      <Card t="ask (ตาคุณ)"><HeadStage mode="ask" a={av('a')} word="ส้มตำ" mine others={IDS.slice(1)} av={av} /></Card>
      <Card t="end"><HeadStage mode="end" a={av('a')} word="ส้มตำ" others={IDS.slice(1)} av={av} /></Card>
    </Grid>
    <H>🎂 เค้กหายไปไหน (ห้องครัว)</H>
    <Grid>{['sleep', 'there', 'vanish', 'gone', 'thief', 'morning'].map(m => <Card key={m} t={m}><CakeStage mode={m} hour={3} /></Card>)}</Grid>
    <div style={{ height: 60 }} />

    {film && <IntroFilm key={film} id={film} sound={false} onDone={() => setFilm(null)} res={{ winner: 'b' }} av={av} nameOf={nameOf} />}
    {pop === 'cat' && <CatScare name="บอส" onClose={close} />}
    {pop === 'open-bad' && <OpenFx fx={{ by: 'a', id: 'c', d: 'pork', c: ['pork-1', 'fire-2', 'pipe-3'], lost: ['fire-2', 'pipe-3'], ok: false, pay: 17 }} nameOf={nameOf} myId="a" onClose={close} />}
    {pop === 'open-ok' && <OpenFx fx={{ by: 'a', id: 'c', d: 'tea', c: ['tea-1', 'tea-2'], lost: [], ok: true, pay: 4 }} nameOf={nameOf} myId="a" onClose={close} />}
    {pop === 'pass' && <PassFx fx={{ by: 'a', id: 'c', n: 3, m: 5, g: [] }} nameOf={nameOf} myId="a" onClose={close} />}
    {pop === 'bomb' && <BombFx F={{ by: 'c', w: 'ทุเรียน', t: 'r' }} you={nameOf} onClose={close} />}
    <SnakeFx ev={snake} />
  </div>;
}
createRoot(document.getElementById('root')).render(<Demo />);
