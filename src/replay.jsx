// เล่นย้อนเหตุการณ์ทั้งเกมตอนจบ — ฉากทีละขั้น (เล่นอัตโนมัติ / เลื่อนเอง / ดูทั้งหมด)
// scenes: [{ kicker, title, tone: 'night'|'day'|'good'|'bad', stage: <ฉาก SVG>, lines: [{ ico, text: 'ข้อความ {playerId}', cls: 'good'|'bad'|'love'|'warn'|'dim' }] }]
import React, { useEffect, useState } from 'react';
import { Avatar } from './ui.jsx';
import './replay.css';

// แปลง {playerId} ในข้อความเป็นรูป+ชื่อ
export function Rich({ text, av, nameOf }) {
  const parts = String(text || '').split(/\{([^}]+)\}/);
  return <>{parts.map((p, i) => (i % 2 ? <b key={i} className="rp-who"><Avatar id={p} av={av} size={20} />{nameOf(p)}</b> : p))}</>;
}
function Line({ l, d, av, nameOf }) {
  return <li className={'rp-line' + (l.cls ? ' rp-' + l.cls : '')} style={d != null ? { animationDelay: d + 's' } : undefined}>
    {l.ico && <span className="rp-ico">{l.ico}</span>}<span className="rp-txt"><Rich text={l.text} av={av} nameOf={nameOf} /></span></li>;
}
const holdMs = s => 1900 + 1100 * Math.max(1, (s?.lines || []).length);

export function Replay({ scenes, av, nameOf, title = 'เล่นย้อนเหตุการณ์ทั้งเกม' }) {
  const n = scenes.length;
  const [i, setI] = useState(0); const [auto, setAuto] = useState(true); const [all, setAll] = useState(false);
  const k = Math.min(i, Math.max(0, n - 1)); const s = scenes[k];
  useEffect(() => {
    if (!auto || all || !n) return;
    if (k >= n - 1) { setAuto(false); return; }
    const t = setTimeout(() => setI(k + 1), holdMs(s));
    return () => clearTimeout(t);
  }, [k, auto, all, n]);
  if (!n) return null;
  const go = j => { setAuto(false); setI(Math.max(0, Math.min(n - 1, j))); };
  const playBtn = () => { if (k >= n - 1) { setI(0); setAuto(true); } else setAuto(a => !a); };
  return <section className="replay" aria-label={title}>
    <div className="rp-head"><b>🎬 {title}</b><button type="button" className="rp-mode" onClick={() => { setAll(a => !a); setAuto(false); }}>{all ? '🎞️ ดูทีละฉาก' : '📜 ดูทั้งหมด'}</button></div>
    {all ? <ol className="rp-all">{scenes.map((sc, j) => <li key={j} className={'rp-all-item' + (sc.tone ? ' rp-t-' + sc.tone : '')}>
      <span className="rp-kick">{sc.kicker}</span>{sc.title && <b className="rp-ttl"><Rich text={sc.title} av={av} nameOf={nameOf} /></b>}
      <ul>{(sc.lines || []).map((l, x) => <Line key={x} l={l} av={av} nameOf={nameOf} />)}</ul></li>)}</ol>
      : <>
        <div key={k} className={'rp-scene' + (s.tone ? ' rp-t-' + s.tone : '')}>
          {s.stage}
          <div className="rp-body"><span className="rp-kick">{s.kicker}</span>{s.title && <h4 className="rp-ttl"><Rich text={s.title} av={av} nameOf={nameOf} /></h4>}
            <ul>{(s.lines || []).map((l, x) => <Line key={x} l={l} d={0.3 + x * 0.75} av={av} nameOf={nameOf} />)}</ul></div>
          {auto && <i className="rp-prog" style={{ animationDuration: holdMs(s) + 'ms' }} />}
        </div>
        <div className="rp-nav">
          <button type="button" className="rp-btn" disabled={k === 0} onClick={() => go(k - 1)} aria-label="ฉากก่อนหน้า">‹</button>
          <div className="rp-dots">{scenes.map((sc, j) => <button type="button" key={j} className={'rp-dot' + (sc.tone ? ' rp-t-' + sc.tone : '') + (j === k ? ' on' : j < k ? ' past' : '')} onClick={() => go(j)} aria-label={`ฉากที่ ${j + 1}`} />)}</div>
          <button type="button" className="rp-btn play" onClick={playBtn} aria-label={auto ? 'หยุด' : 'เล่น'}>{auto ? '❚❚' : k >= n - 1 ? '↺' : '▶'}</button>
          <button type="button" className="rp-btn" disabled={k >= n - 1} onClick={() => go(k + 1)} aria-label="ฉากถัดไป">›</button>
        </div>
        <div className="rp-count">ฉากที่ {k + 1} / {n}</div>
      </>}
  </section>;
}
