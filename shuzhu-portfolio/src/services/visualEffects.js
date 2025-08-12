// src/services/visualEffects.js

export const letterColors = {
  a: '#ff6b6b', b: '#4ecdc4', c: '#ffe66d', d: '#6c5ce7',
  e: '#a8e6cf', f: '#ff8b94', g: '#ffd93d', h: '#6bcf7e',
  i: '#95e1d3', j: '#f38181', k: '#aa96da', l: '#fcbad3',
  m: '#a8d8ea', n: '#eaffd0', o: '#ff7675', p: '#fd79a8',
  q: '#fdcb6e', r: '#e17055', s: '#00b894', t: '#00cec9',
  u: '#a29bfe', v: '#ffeaa7', w: '#fab1a0', x: '#74b9ff',
  y: '#81ecec', z: '#dfe6e9', ' ': '#ffffff',
  '0': '#ff6348','1':'#5f27cd','2':'#00d2d3','3':'#ff9ff3','4':'#54a0ff','5':'#48dbfb','6':'#feca57','7':'#ff6b9d','8':'#c44569','9':'#f8b500'
};

export class Particle {
  constructor(x, y, color, size = 4, vx = 0, vy = 0) {
    this.x = x; this.y = y; this.color = color; this.size = size;
    this.vx = vx || (Math.random() - 0.5) * 3;
    this.vy = vy || (Math.random() - 0.5) * 3 - 1;
    this.life = 1; this.decay = 0.015 + Math.random() * 0.015;
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.vy += 0.04;
    this.life -= this.decay; this.size *= 0.996;
  }
  draw(ctx, dpr) {
    ctx.save(); ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color; ctx.beginPath();
    ctx.arc(this.x * dpr, this.y * dpr, Math.max(0.5, this.size * dpr), 0, Math.PI * 2);
    ctx.fill(); ctx.restore();
  }
}

export class Ripple {
  constructor(x, y, color) {
    this.x = x; this.y = y; this.color = color; this.radius = 0; this.maxRadius = 200; this.speed = 3; this.life = 1;
  }
  update() { this.radius += this.speed; this.life = 1 - this.radius / this.maxRadius; }
  draw(ctx, dpr) {
    ctx.save(); ctx.globalAlpha = Math.max(0, this.life * 0.15);
    ctx.strokeStyle = this.color; ctx.lineWidth = 1.5 * dpr;
    ctx.beginPath(); ctx.arc(this.x * dpr, this.y * dpr, this.radius * dpr, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  }
}

/**
 * 根据字符码计算视觉位置
 * @param {string} letter 
 * @returns {x, y} 画布坐标
 */
export function getPositionForLetter(letter) {
  const code = (letter && letter.charCodeAt(0)) || Math.floor(Math.random() * 90 + 40);
  const angle = (code * 137.5) % 360;
  const radius = 100 + (code % 4) * 30;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2 - 60;
  return { 
    x: cx + Math.cos((angle * Math.PI) / 180) * radius, 
    y: cy + Math.sin((angle * Math.PI) / 180) * radius 
  };
}

/**
 * 创建字母粒子效果
 * @param {string} letter 
 * @param {Particle[]} particlesRef 
 */
export function createLetterEffect(letter, particlesRef, ripplesRef) {
  const ch = letter.toLowerCase();
  const color = letterColors[ch] || '#64748b';
  const pos = getPositionForLetter(ch);

  const particleCount = 15;
  const spread = 25;
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 1.5 + 0.5) * 1.2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    const p = new Particle(pos.x + (Math.random() - 0.5) * spread, pos.y + (Math.random() - 0.5) * spread, color, Math.random() * 5 + 2, vx, vy);
    particlesRef.push(p);
  }
  ripplesRef.push(new Ripple(pos.x, pos.y, color));
}

/**
 * 动画循环
 * @param {HTMLCanvasElement} canvas 
 * @param {Particle[]} particlesRef 
 * @param {Ripple[]} ripplesRef 
 * @param {number} rafIdRef - 用于取消动画的引用
 */
export function startAnimationLoop(canvas, particlesRef, ripplesRef, rafIdRef) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef = particlesRef.filter(p => p.life > 0);
    particlesRef.forEach(p => { p.update(); p.draw(ctx, dpr); });
    ripplesRef = ripplesRef.filter(r => r.life > 0);
    ripplesRef.forEach(r => { r.update(); r.draw(ctx, dpr); });
    rafIdRef.current = requestAnimationFrame(frame);
  }
  rafIdRef.current = requestAnimationFrame(frame);
}