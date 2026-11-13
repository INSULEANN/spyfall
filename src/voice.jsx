// ห้องเสียง (WebRTC แบบ mesh) — ใช้ Firebase Realtime Database เป็นช่องส่งสัญญาณเชื่อมต่อ
import React, { useEffect, useRef, useState } from 'react';
import { ref, set, update, remove, push, onValue, onChildAdded, onDisconnect } from 'firebase/database';
import { Mic, MicOff, Headphones, PhoneOff, Volume2, VolumeX } from 'lucide-react';

// STUN หลายเจ้า + TURN (ถ้าตั้งค่าไว้ตอน build) — TURN ส่งต่อเสียงให้คนที่อยู่หลังเน็ตมือถือ/เราเตอร์ที่ต่อตรงกันไม่ได้
//   VITE_TURN_URLS = "turn:host:3478,turns:host:443?transport=tcp"  + VITE_TURN_USER / VITE_TURN_PASS
//   หรือ VITE_TURN_API = URL ที่ตอบกลับเป็น iceServers (JSON array หรือ { iceServers })
const STUN = [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302', 'stun:stun.cloudflare.com:3478'] }];
const ENV = (typeof import.meta !== 'undefined' && import.meta.env) || {};
export const HAS_TURN = !!(ENV.VITE_TURN_URLS || ENV.VITE_TURN_API);
let iceCache = null;
async function getIce() {
  if (iceCache && Date.now() - iceCache.at < 30 * 60e3) return iceCache.list;
  const urls = String(ENV.VITE_TURN_URLS || '').split(',').map(x => x.trim()).filter(Boolean);
  let extra = urls.length ? [{ urls, username: ENV.VITE_TURN_USER || '', credential: ENV.VITE_TURN_PASS || '' }] : [];
  if (ENV.VITE_TURN_API) { try { const r = await fetch(ENV.VITE_TURN_API); if (r.ok) { const j = await r.json(); const l = Array.isArray(j) ? j : j.iceServers || []; if (l.length) extra = l; } } catch { } }
  const list = [...STUN, ...extra]; iceCache = { at: Date.now(), list }; return list;
}
const PREF_KEY = 'sf-voice-prefs';
const loadPrefs = () => { try { return JSON.parse(localStorage.getItem(PREF_KEY)) || {}; } catch { return {}; } };
const savePrefs = p => { try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch {} };
const sidGen = () => Math.random().toString(36).slice(2, 10);
const level = an => { if (!an) return 0; const a = new Uint8Array(an.fftSize); an.getByteTimeDomainData(a); let s = 0; for (const v of a) { const x = (v - 128) / 128; s += x * x; } return Math.sqrt(s / a.length); };

// gate = null (คุยได้ปกติ) หรือ { canTalk, hear: [ids], label } — ใช้ตอนกลางคืนในแวร์วูฟ: ไมค์คนที่ไม่ใช่หมาป่าถูกปิด และได้ยินเฉพาะคนใน hear
export default function VoicePanel({ db, roomCode, myId, members, nameOf, msg, gate = null }) {
  const [joined, setJoined] = useState(false);
  const [busy, setBusy] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [prefs, setPrefs] = useState(loadPrefs);
  const [speaking, setSpeaking] = useState({});
  const [states, setStates] = useState({});
  const [tick, setTick] = useState(0);
  const S = useRef({ pcs: new Map(), ctx: null, stream: null, sid: null, unsub: [], localAn: null, ice: null, fails: {} }).current;
  const base = `rooms/${roomCode}/voice`;
  const others = Object.entries(members || {}).filter(([id]) => id !== myId);
  S.gate = gate; S.prefs = prefs; S.micOn = micOn; // ค่าล่าสุดให้ callback ของ WebRTC ใช้
  const gateKey = gate ? `${gate.canTalk}|${(gate.hear || []).join(',')}` : '';
  const hidden = !!gate; // กลางคืนซ่อนจุดเขียว/ไอคอนไมค์ จะได้ไม่รู้ว่าใครพูด

  const setState = (id, v) => setStates(s => ({ ...s, [id]: v }));
  const send = (to, toSid, m) => push(ref(db, `${base}/sig/${to}`), { ...m, from: myId, fromSid: S.sid, toSid }).catch(() => {});

  function applyPref(id) {
    const p = S.pcs.get(id); if (!p?.gain) return; const pr = (S.prefs || {})[id] || {};
    const blocked = S.gate && !(S.gate.hear || []).includes(id);
    p.gain.gain.value = blocked || pr.muted ? 0 : (pr.vol ?? 1);
  }
  const applyMic = () => { const on = S.micOn && (!S.gate || S.gate.canTalk); S.stream?.getAudioTracks().forEach(t => t.enabled = on); };

  function closePeer(id) {
    const p = S.pcs.get(id); if (!p) return;
    (p.timers || []).forEach(clearTimeout);
    try { p.pc.close(); } catch {} try { p.src?.disconnect(); p.gain?.disconnect(); } catch {}
    if (p.el) { p.el.srcObject = null; }
    S.pcs.delete(id); setState(id, undefined);
  }

  function createPeer(id, sid, initiator) {
    closePeer(id);
    const pc = new RTCPeerConnection({ iceServers: S.ice || STUN });
    const p = { pc, sid, pending: [], initiator, tries: 0, timers: [], lastRetry: 0 };
    p.later = (ms, f) => p.timers.push(setTimeout(() => { if (S.pcs.get(id)?.pc === pc) f(); }, ms));
    // ค้าง "กำลังเชื่อม" นานเกิน → ถือว่าล้มเหลวแล้วลองใหม่ (ล้มบ่อยก็รอนานขึ้น: 15 → 30 → 60 วิ)
    p.arm = () => p.later(Math.min(60000, 15000 * 2 ** Math.min(2, S.fails[id] || 0)), () => { if (pc.connectionState !== 'connected') { S.fails[id] = (S.fails[id] || 0) + 1; setState(id, 'failed'); retry(id); } });
    p.arm();
    S.pcs.set(id, p);
    S.stream.getTracks().forEach(t => pc.addTrack(t, S.stream));
    pc.onicecandidate = e => { if (e.candidate) send(id, sid, { type: 'ice', c: JSON.parse(JSON.stringify(e.candidate.toJSON())) }); };
    pc.ontrack = e => {
      if (p.src) return; const stream = e.streams[0] || new MediaStream([e.track]);
      // Chrome ต้องผูก stream กับ <audio> ด้วย ถึงจะส่งเสียงเข้า Web Audio (ปิดเสียง element ไว้ ใช้ GainNode คุมดังเบาแทน ได้ถึง 200%)
      p.el = new Audio(); p.el.srcObject = stream; p.el.muted = true; p.el.play().catch(() => {});
      p.src = S.ctx.createMediaStreamSource(stream); p.gain = S.ctx.createGain(); p.an = S.ctx.createAnalyser(); p.an.fftSize = 512;
      p.src.connect(p.an); p.src.connect(p.gain); p.gain.connect(S.ctx.destination); applyPref(id);
    };
    pc.onconnectionstatechange = () => {
      const st = pc.connectionState; setState(id, st);
      if (st === 'connected') { p.tries = 0; S.fails[id] = 0; }
      else if (st === 'disconnected') p.later(4000, () => { if (pc.connectionState === 'disconnected') retry(id); });
      else if (st === 'failed') { S.fails[id] = (S.fails[id] || 0) + 1; p.later(800, () => retry(id)); }
    };
    return p;
  }

  // ลองเชื่อมใหม่: ฝ่ายเริ่ม (id น้อยกว่า) ทำ ICE restart สูงสุด 2 ครั้ง แล้วค่อยสร้างการเชื่อมต่อใหม่ทั้งหมด • อีกฝ่ายส่งคำขอ "redo" ไปให้ฝ่ายเริ่มทำ
  async function retry(id, hard = false) {
    if (!S.sid) return; const p = S.pcs.get(id);
    if (!p) { if (myId < id) setTick(t => t + 1); return; }
    if (!p.initiator) { send(id, p.sid, { type: 'redo', hard }); p.arm(); return; }
    if (!hard && Date.now() - p.lastRetry < 4000) return; p.lastRetry = Date.now();
    if (hard || p.tries >= 2 || p.pc.signalingState !== 'stable') { closePeer(id); setTick(t => t + 1); return; }
    p.tries++;
    try { const o = await p.pc.createOffer({ iceRestart: true }); await p.pc.setLocalDescription(o); send(id, p.sid, { type: 'offer', restart: true, sdp: { type: o.type, sdp: o.sdp } }); p.arm(); }
    catch (e) { closePeer(id); setTick(t => t + 1); }
  }
  const reconnect = id => { S.fails[id] = 0; setState(id, 'connecting'); retry(id, true); };

  async function flush(p) { for (const c of p.pending.splice(0)) { try { await p.pc.addIceCandidate(c); } catch {} } }

  async function handle(m) {
    if (!m || m.toSid !== S.sid) return;
    try {
      if (m.type === 'redo') { if (myId < m.from) retry(m.from, !!m.hard); return; }
      if (m.type === 'offer') {
        const old = S.pcs.get(m.from);
        const p = m.restart && old && old.sid === m.fromSid && !old.initiator && old.pc.connectionState !== 'closed' && old.pc.signalingState === 'stable' ? old : createPeer(m.from, m.fromSid, false);
        if (p === old) p.arm();
        await p.pc.setRemoteDescription(m.sdp); await flush(p);
        const ans = await p.pc.createAnswer(); await p.pc.setLocalDescription(ans);
        send(m.from, m.fromSid, { type: 'answer', sdp: { type: ans.type, sdp: ans.sdp } });
      } else {
        const p = S.pcs.get(m.from); if (!p || p.sid !== m.fromSid) return;
        if (m.type === 'answer') { if (p.pc.signalingState === 'have-local-offer') { await p.pc.setRemoteDescription(m.sdp); await flush(p); } }
        else if (m.type === 'ice') { if (p.pc.remoteDescription) { try { await p.pc.addIceCandidate(m.c); } catch {} } else p.pending.push(m.c); }
      }
    } catch (e) { console.warn('voice signal', e); }
  }

  async function join() {
    if (!navigator.mediaDevices?.getUserMedia) { msg('เบราว์เซอร์นี้ใช้ไมค์ไม่ได้ (ต้องเปิดผ่าน https)'); return; }
    setBusy(true); const iceP = getIce();
    try {
      S.ctx = new (window.AudioContext || window.webkitAudioContext)(); await S.ctx.resume();
      S.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    } catch (e) { setBusy(false); try { S.ctx?.close(); } catch {} msg('เปิดไมค์ไม่ได้ — กดอนุญาตไมโครโฟนในเบราว์เซอร์ก่อนนะ'); return; }
    S.localAn = S.ctx.createAnalyser(); S.localAn.fftSize = 512; S.ctx.createMediaStreamSource(S.stream).connect(S.localAn);
    S.ice = await iceP; S.sid = sidGen();
    const meRef = ref(db, `${base}/members/${myId}`), inbox = ref(db, `${base}/sig/${myId}`);
    await remove(inbox);
    onDisconnect(meRef).remove(); onDisconnect(inbox).remove();
    S.unsub.push(onChildAdded(inbox, snap => { handle(snap.val()); remove(snap.ref).catch(() => {}); }));
    await set(meRef, { sid: S.sid, muted: false, at: Date.now() });
    setMicOn(true); setJoined(true); setBusy(false);
  }

  async function leave(silent) {
    S.unsub.splice(0).forEach(u => { try { u(); } catch {} });
    [...S.pcs.keys()].forEach(closePeer);
    S.stream?.getTracks().forEach(t => t.stop()); S.stream = null;
    try { await S.ctx?.close(); } catch {} S.ctx = null; S.localAn = null;
    if (S.sid) { const meRef = ref(db, `${base}/members/${myId}`), inbox = ref(db, `${base}/sig/${myId}`);
      try { onDisconnect(meRef).cancel(); onDisconnect(inbox).cancel(); } catch {}
      remove(meRef).catch(() => {}); remove(inbox).catch(() => {}); }
    S.sid = null; setStates({}); setSpeaking({});
    if (!silent) setJoined(false);
  }

  function toggleMic() {
    const on = !micOn; S.micOn = on; applyMic(); setMicOn(on);
    update(ref(db, `${base}/members/${myId}`), { muted: !on }).catch(() => {});
  }

  function setPref(id, patch) { setPrefs(p => { const n = { ...p, [id]: { ...(p[id] || {}), ...patch } }; savePrefs(n); return n; }); }

  // เชื่อม/ตัดตามรายชื่อคนในห้องเสียง (คนที่ id น้อยกว่าเป็นฝ่ายเริ่ม เพื่อไม่ให้ชนกัน)
  useEffect(() => {
    if (!joined || !S.sid) return;
    const want = new Map(others.map(([id, m]) => [id, m.sid]));
    for (const id of [...S.pcs.keys()]) if (want.get(id) !== S.pcs.get(id).sid) closePeer(id);
    for (const [id, sid] of want) {
      if (S.pcs.has(id)) continue;
      if (myId < id) {
        const p = createPeer(id, sid, true);
        p.pc.createOffer().then(o => p.pc.setLocalDescription(o).then(() => send(id, sid, { type: 'offer', sdp: { type: o.type, sdp: o.sdp } }))).catch(e => console.warn(e));
      }
    }
  }, [joined, JSON.stringify(others.map(([id, m]) => id + ':' + m.sid)), tick]);

  useEffect(() => { for (const id of S.pcs.keys()) applyPref(id); applyMic(); }, [prefs, gateKey, joined]);

  useEffect(() => {
    if (!joined) return;
    const t = setInterval(() => {
      const sp = {}; if (micOn && level(S.localAn) > 0.04) sp[myId] = true;
      for (const [id, p] of S.pcs) if (level(p.an) > 0.04) sp[id] = true;
      setSpeaking(prev => JSON.stringify(prev) === JSON.stringify(sp) ? prev : sp);
    }, 200);
    return () => clearInterval(t);
  }, [joined, micOn]);

  useEffect(() => () => { leave(true); }, []);
  // ถ้าถูกลบออกจากรายชื่อ (เช่น เน็ตหลุดแล้ว onDisconnect ทำงาน) ให้ใส่ชื่อกลับ
  useEffect(() => { if (joined && S.sid && members && !members[myId]) set(ref(db, `${base}/members/${myId}`), { sid: S.sid, muted: !micOn, at: Date.now() }).catch(() => {}); }, [joined, !!members?.[myId]]);

  const count = Object.keys(members || {}).length;
  const stLabel = s => s === 'connected' ? null : s === 'failed' ? 'เชื่อมไม่ได้ • ลองใหม่อยู่' : s === 'disconnected' ? 'สัญญาณหลุด • ต่อใหม่อยู่' : 'กำลังเชื่อม…';
  const anyBad = others.some(([id]) => states[id] === 'failed' || states[id] === 'disconnected');

  return <div className="voice">
    <div className="voice-head"><b><Headphones size={17} /> ห้องเสียง</b><span>{count} คน</span></div>
    {!joined ? <>
      {count > 0 && <p className="hint">ตอนนี้คุยอยู่: {Object.keys(members).map(nameOf).join(', ')}</p>}
      <button className="primary wide" disabled={busy} onClick={join}><Mic size={16} /> {busy ? 'กำลังเปิดไมค์…' : 'เข้าห้องเสียง'}</button>
    </> : <>
      <div className="voice-me">
        <span className={'voice-dot' + (speaking[myId] && !hidden ? ' on' : '')} />
        <span className="voice-name">คุณ</span>
        <button className={'secondary voice-mic' + (micOn ? '' : ' off')} onClick={toggleMic} title={micOn ? 'ปิดไมค์' : 'เปิดไมค์'}>{micOn ? <Mic size={16} /> : <MicOff size={16} />} {micOn ? 'ไมค์เปิด' : 'ไมค์ปิด'}</button>
        <button className="secondary voice-leave" onClick={() => leave()} title="ออกจากห้องเสียง"><PhoneOff size={16} /></button>
      </div>
      {gate && <div className="voice-night">{gate.label}</div>}
      {others.length === 0 && <p className="hint">ยังไม่มีเพื่อนในห้องเสียง ชวนเพื่อนกด “เข้าห้องเสียง”</p>}
      {others.map(([id, m]) => { const pr = prefs[id] || {}; const vol = pr.vol ?? 1; const st = stLabel(states[id]);
        return <div className="voice-row" key={id}>
          <div className="voice-row-top">
            <span className={'voice-dot' + (speaking[id] && !hidden ? ' on' : '')} />
            <span className="voice-name">{nameOf(id)}{m.muted && !hidden && <MicOff size={13} className="voice-muted" />}</span>
            {st && <small className={'voice-st' + (states[id] === 'failed' || states[id] === 'disconnected' ? ' bad' : '')}>{st}</small>}
            {(states[id] === 'failed' || states[id] === 'disconnected') && <button className="secondary voice-retry" onClick={() => reconnect(id)} title="เชื่อมต่อกับคนนี้ใหม่">↻ เชื่อมใหม่</button>}
            <button className={'icon-btn voice-mute' + (pr.muted ? ' off' : '')} onClick={() => setPref(id, { muted: !pr.muted })} title={pr.muted ? 'เลิกปิดเสียงคนนี้' : 'ปิดเสียงคนนี้'}>{pr.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
          </div>
          <div className="voice-vol"><input type="range" min="0" max="2" step="0.05" value={vol} disabled={pr.muted} onChange={e => setPref(id, { vol: +e.target.value })} /><span>{Math.round(vol * 100)}%</span></div>
        </div>; })}
      {anyBad && <p className="voice-note bad">เชื่อมกับบางคนไม่ติด? กด “เชื่อมใหม่” • ลองสลับเน็ต (เน็ตมือถือ ↔ Wi-Fi) • ปิด VPN{HAS_TURN ? '' : ' • เน็ตบางแบบต่อตรงไม่ได้ ต้องมีเซิร์ฟเวอร์ TURN'}</p>}
      <p className="voice-note">ปุ่มปิดเสียงและหลอดเสียงมีผลแค่ในเครื่องคุณ</p>
    </>}
  </div>;
}
