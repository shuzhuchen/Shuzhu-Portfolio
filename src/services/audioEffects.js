// src/services/audioEffects.jsx

let audioCtx = null;
let masterGain = null;

/**
 * 初始化音频上下文和主音量控制
 * @param {boolean} soundOn 是否启用音效
 * @returns {AudioContext|null}
 */
export function initAudioContext(soundOn) {
  if (!soundOn) return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.15;
    masterGain.connect(audioCtx.destination);
  }
  return audioCtx;
}

/**
 * 播放钢琴音符，包含谐波叠加
 * @param {number} frequency 频率，0表示静音
 * @param {number} duration 持续时间，秒，默认0.25
 * @param {boolean} soundOn 是否启用音效
 */
export function playNote(frequency, duration = 0.25, soundOn = true) {
  if (!soundOn || frequency === 0) return;
  const ctx = initAudioContext(soundOn);
  if (!ctx) return;

  const now = ctx.currentTime;
  const harmonics = [1, 2, 3];
  const gains = [0.7, 0.2, 0.1];

  const noteGain = ctx.createGain();
  noteGain.gain.setValueAtTime(0.001, now);
  noteGain.connect(masterGain);
  noteGain.gain.linearRampToValueAtTime(1.0, now + 0.01);
  noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  harmonics.forEach((h, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency * h, now);
    osc.detune.setValueAtTime((Math.random() - 0.5) * 6, now);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gains[i], now);
    osc.connect(g);
    g.connect(noteGain);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  });
}