// ห้องเสียง (WebRTC แบบ mesh) — ใช้ Firebase Realtime Database เป็นช่องส่งสัญญาณเชื่อมต่อ
import React, { useEffect, useRef, useState } from 'react';
import { ref, set, update, remove, push, onValue, onChildAdded, onDisconnect } from 'firebase/database';
import { Mic, MicOff, Headphones, PhoneOff, Volume2, VolumeX } from 'lucide-react';

const ICE = [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }];
const PREF_KEY = 'sf-voice-prefs';
const loadPrefs = () => { try { return JSON.parse(localStorage.getItem(PREF_KEY)) || {}; } catch { return {}; } };
const savePrefs = p => { try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch {} };
const sidGen = () => Math.random().toString(36).slice(2, 10);
const level = an => { if (!an) return 0; const a = new Uint8Array(an.fftSize); an.getByteTimeDomainData(a); let s = 0; for (const v of a) { const x = (v - 128) / 128; s += x * x; } return Math.sqrt(s / a.length); };

export default function VoicePanel({ db, roomCode, myId, members, nameOf, msg }) {
  const [joined, setJoined] = useState(false);
  const [busy, setBusy] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [prefs, setPrefs] = useState(loadPrefs);
  const [speaking, setSpeaking] = useState({});
  const [states, setStates] = useState({});
  const [tick, setTick] = useState(0);
  const S = useRef({ pcs: new Map(), ctx: null, stream: null, sid: null, unsub: [], localAn: null }).current;
  const base = `rooms/${roomCode}/voice`;
  const others = Object.entries(members || {}).filter(([id]) => id !== myId);

  const setState = (id, v) => setStates(s => ({ ...s, [id]: v }));
  const send = (to, toSid, m) => push(ref(db, `${base}/sig/${to}`), { ...m, from: myId, fromSid: S.sid, toSid }).catch(() => {});

  function applyPref(id) { const p = S.pcs.get(id); if (!p?.gain) return; const pr = prefs[id] || {}; p.gain.gain.value = pr.muted ? 0 : (pr.vol ?? 1); }

  function closePeer(id) {
    const p = S.pcs.get(id); if (!p) return;
    try { p.pc.close(); } catch {} try { p.src?.disconnect(); p.gain?.disconnect(); } catch {}
    if (p.el) { p.el.srcObject = null; }
    S.pcs.delete(id); setState(id, undefined);
  }

  function createPeer(id, sid, initiator) {
    closePeer(id);
    const pc = new RTCPeerConnection({ iceServers: ICE });
    const p = { pc, sid, pending: [], initiator };
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
      setState(id, pc.connectionState);
      if (pc.connectionState === 'failed' && initiator) setTimeout(() => { if (S.pcs.get(id)?.pc === pc) { closePeer(id); setTick(t => t + 1); } }, 1500);
    };
    return p;
  }

  async function flush(p) { for (const c of p.pending.splice(0)) { try { await p.pc.addIceCandidate(c); } catch {} } }

  async function handle(m) {
    if (!m || m.toSid !== S.sid) return;
    try {
      if (m.type === 'offer') {
        const p = createPeer(m.from, m.fromSid, false);
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
    setBusy(true);
    try {
      S.ctx = new (window.AudioContext || window.webkitAudioContext)(); await S.ctx.resume();
      S.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    } catch (e) { setBusy(false); try { S.ctx?.close(); } catch {} msg('เปิดไมค์ไม่ได้ — กดอนุญาตไมโครโฟนในเบราว์เซอร์ก่อนนะ'); return; }
    S.localAn = S.ctx.createAnalyser(); S.localAn.fftSize = 512; S.ctx.createMediaStreamSource(S.stream).connect(S.localAn);
    S.sid = sidGen();
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
    const on = !micOn; S.stream?.getAudioTracks().forEach(t => t.enabled = on); setMicOn(on);
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

  useEffect(() => { for (const id of S.pcs.keys()) applyPref(id); }, [prefs]);

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
  const stLabel = s => s === 'connected' ? null : s === 'failed' ? 'เชื่อมไม่ได้' : 'กำลังเชื่อม…';

  return <div className="voice">
    <div className="voice-head"><b><Headphones size={17} /> ห้องเสียง</b><span>{count} คน</span></div>
    {!joined ? <>
      {count > 0 && <p className="hint">ตอนนี้คุยอยู่: {Object.keys(members).map(nameOf).join(', ')}</p>}
      <button className="primary wide" disabled={busy} onClick={join}><Mic size={16} /> {busy ? 'กำลังเปิดไมค์…' : 'เข้าห้องเสียง'}</button>
    </> : <>
      <div className="voice-me">
        <span className={'voice-dot' + (speaking[myId] ? ' on' : '')} />
        <span className="voice-name">คุณ</span>
        <button className={'secondary voice-mic' + (micOn ? '' : ' off')} onClick={toggleMic} title={micOn ? 'ปิดไมค์' : 'เปิดไมค์'}>{micOn ? <Mic size={16} /> : <MicOff size={16} />} {micOn ? 'ไมค์เปิด' : 'ไมค์ปิด'}</button>
        <button className="secondary voice-leave" onClick={() => leave()} title="ออกจากห้องเสียง"><PhoneOff size={16} /></button>
      </div>
      {others.length === 0 && <p className="hint">ยังไม่มีเพื่อนในห้องเสียง ชวนเพื่อนกด “เข้าห้องเสียง”</p>}
      {others.map(([id, m]) => { const pr = prefs[id] || {}; const vol = pr.vol ?? 1; const st = stLabel(states[id]);
        return <div className="voice-row" key={id}>
          <div className="voice-row-top">
            <span className={'voice-dot' + (speaking[id] ? ' on' : '')} />
            <span className="voice-name">{nameOf(id)}{m.muted && <MicOff size={13} className="voice-muted" />}</span>
            {st && <small className={'voice-st' + (states[id] === 'failed' ? ' bad' : '')}>{st}</small>}
            <button className={'icon-btn voice-mute' + (pr.muted ? ' off' : '')} onClick={() => setPref(id, { muted: !pr.muted })} title={pr.muted ? 'เลิกปิดเสียงคนนี้' : 'ปิดเสียงคนนี้'}>{pr.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
          </div>
          <div className="voice-vol"><input type="range" min="0" max="2" step="0.05" value={vol} disabled={pr.muted} onChange={e => setPref(id, { vol: +e.target.value })} /><span>{Math.round(vol * 100)}%</span></div>
        </div>; })}
      <p className="voice-note">ปุ่มปิดเสียงและหลอดเสียงมีผลแค่ในเครื่องคุณ</p>
    </>}
  </div>;
}
