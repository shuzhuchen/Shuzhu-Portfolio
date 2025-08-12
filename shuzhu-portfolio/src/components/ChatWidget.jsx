import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MessageCircle, X, Send, Volume2, VolumeX, Trash2, Loader2 } from 'lucide-react';


// Enhanced ChatWidget with streaming support and improved UX
const letterColors = {
  a: '#ff6b6b', b: '#4ecdc4', c: '#ffe66d', d: '#6c5ce7',
  e: '#a8e6cf', f: '#ff8b94', g: '#ffd93d', h: '#6bcf7e',
  i: '#95e1d3', j: '#f38181', k: '#aa96da', l: '#fcbad3',
  m: '#a8d8ea', n: '#eaffd0', o: '#ff7675', p: '#fd79a8',
  q: '#fdcb6e', r: '#e17055', s: '#00b894', t: '#00cec9',
  u: '#a29bfe', v: '#ffeaa7', w: '#fab1a0', x: '#74b9ff',
  y: '#81ecec', z: '#dfe6e9', ' ': '#ffffff',
  '0': '#ff6348','1':'#5f27cd','2':'#00d2d3','3':'#ff9ff3','4':'#54a0ff','5':'#48dbfb','6':'#feca57','7':'#ff6b9d','8':'#c44569','9':'#f8b500'
};

const letterFrequencies = {
  a: 440.0, b: 493.88, c: 261.63, d: 293.66, e: 329.63, f: 349.23, g: 392.0, h: 415.30,
  i: 466.16, j: 523.25, k: 554.37, l: 587.33, m: 622.25, n: 659.25, o: 698.46, p: 739.99,
  q: 783.99, r: 830.61, s: 880.0, t: 932.33, u: 987.77, v: 1046.50, w: 1108.73, x: 1174.66,
  y: 1244.51, z: 1318.51, ' ': 0,
  '0':1396.91,'1':1479.98,'2':1567.98,'3':1661.22,'4':1760.00,'5':1864.66,'6':1975.53,'7':2093.00,'8':2217.46,'9':2349.32
};

export default function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi there! I'm Shuzhu's AI assistant. Ask me anything about Shuzhu's background, projects, or skills." }
  ]);
  const [soundOn, setSoundOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const particlesRef = useRef([]);
  const ripplesRef = useRef([]);
  const rafRef = useRef(null);
  const lastTextRef = useRef('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when messages update
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initialize canvas and audio
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'shuzhu-canvas';
    canvas.style.cssText = `
      position: fixed; left: 0; top: 0; width: 100%; height: 100%;
      z-index: 9998; pointer-events: none; background: transparent;
    `;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    resize();
    window.addEventListener('resize', resize);
    startLoop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
      try { document.body.removeChild(canvas); } catch (e) {}
    };
  }, []);

  // Audio system
  function ensureAudio() {
    if (!soundOn) return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.value = 0.15;
      master.connect(ctx.destination);
      audioCtxRef.current = ctx;
      masterGainRef.current = master;
    }
    return audioCtxRef.current;
  }

  function playNote(frequency, duration = 0.25) {
    if (!soundOn || frequency === 0) return;
    const ctx = ensureAudio();
    if (!ctx) return;

    const now = ctx.currentTime;
    const harmonics = [1, 2, 3];
    const gains = [0.7, 0.2, 0.1];

    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.connect(masterGainRef.current);
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

  // Visual effects
  class Particle {
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

  class Ripple {
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

  function createLetterEffect(letter) {
    const ch = letter.toLowerCase();
    const color = letterColors[ch] || '#64748b';
    const freq = letterFrequencies[ch] || 440;
    const pos = getPositionForLetter(ch);

    playNote(freq, 0.2);

    const particleCount = 15;
    const spread = 25;
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 1.5 + 0.5) * 1.2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const p = new Particle(pos.x + (Math.random() - 0.5) * spread, pos.y + (Math.random() - 0.5) * spread, color, Math.random() * 5 + 2, vx, vy);
      particlesRef.current.push(p);
    }
    ripplesRef.current.push(new Ripple(pos.x, pos.y, color));
  }

  function getPositionForLetter(letter) {
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

  function startLoop() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      particlesRef.current.forEach(p => { p.update(); p.draw(ctx, dpr); });

      ripplesRef.current = ripplesRef.current.filter(r => r.life > 0);
      ripplesRef.current.forEach(r => { r.update(); r.draw(ctx, dpr); });

      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
  }

  // Streaming chat handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Add bot thinking message
    const botMessageId = Date.now();
    setMessages(prev => [...prev, { role: 'bot', content: '', id: botMessageId, isStreaming: true }]);

    try {
      // Simulate streaming API call - replace with your actual endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });

      if (!response.ok) throw new Error('API request failed');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      // Set timeout for streaming
      const timeoutId = setTimeout(() => {
        reader.cancel();
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, content: accumulatedContent || "Sorry, I'm having trouble responding right now. Please try again.", isStreaming: false }
            : msg
        ));
        setIsLoading(false);
      }, 10000);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                accumulatedContent += data.content;
                setMessages(prev => prev.map(msg => 
                  msg.id === botMessageId 
                    ? { ...msg, content: accumulatedContent }
                    : msg
                ));
              }
            } catch (e) {
              console.warn('Failed to parse streaming chunk:', e);
            }
          }
        }
      }

      clearTimeout(timeoutId);
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, isStreaming: false }
          : msg
      ));

    } catch (error) {
      console.error('Chat error:', error);
      // Fallback responses based on content
      let fallbackResponse = "I'm here to help! Ask me about Shuzhu's experience, projects, or skills.";
      
      const lowerMsg = userMessage.toLowerCase();
      if (lowerMsg.includes('skill') || lowerMsg.includes('technology')) {
        fallbackResponse = "Shuzhu specializes in Python, React, PyTorch, Hugging Face Transformers, MongoDB, and cloud platforms like AWS. He has strong experience in ML/AI development and full-stack applications.";
      } else if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
        fallbackResponse = "Shuzhu has built several impressive projects including FoodieBot (a food recommendation system), AI-powered teaching assistants, and voice-of-customer analysis systems using advanced NLP techniques.";
      } else if (lowerMsg.includes('contact') || lowerMsg.includes('reach')) {
        fallbackResponse = "You can connect with Shuzhu via LinkedIn or through the contact form on this website. She's always open to discussing new opportunities!";
      } else if (lowerMsg.includes('experience') || lowerMsg.includes('background')) {
        fallbackResponse = "Shuzhu has experience in machine learning, full-stack development, and data analysis. She's worked on projects spanning NLP, recommendation systems, and educational technology.";
      }

      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, content: fallbackResponse, isStreaming: false }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  // Input change handler with effects
  const handleInputChange = (e) => {
    const current = e.target.value;
    if (current.length > lastTextRef.current.length) {
      const newChars = current.slice(lastTextRef.current.length);
      for (const ch of newChars) {
        if (ch && ch.trim()) createLetterEffect(ch);
      }
    }
    lastTextRef.current = current;
    setInputMessage(current);
  };

  // Preset question handler
  const handlePresetClick = (question) => {
    setInputMessage(question);
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 100);
  };

  // Clear chat
  const clearChat = () => {
    setMessages([
      { role: 'bot', content: "Hi there! I'm Shuzhu's AI assistant. Ask me anything about Shuzhu's background, projects, or skills." }
    ]);
  };

  // Sound toggle
  const toggleSound = () => {
    setSoundOn(prev => {
      const newState = !prev;
      if (!newState) {
        try { audioCtxRef.current?.suspend(); } catch(e) {}
      } else {
        try { audioCtxRef.current?.resume(); } catch(e) {}
      }
      return newState;
    });
  };

  const chatWidth = isExpanded ? 'w-[28rem] md:w-[32rem]' : 'w-80 md:w-96';
  const chatHeight = isExpanded ? 'h-[42rem] md:h-[48rem]' : 'h-[36rem] md:h-[40rem]';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Panel */}
      {chatOpen && (
        <div className={`mb-4 ${chatWidth} ${chatHeight} flex flex-col bg-white dark:bg-gray-900 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Shuzhu Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse' : 'Expand'}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-4 h-4 border border-current rounded"></div>
              </button>
              <button
                onClick={toggleSound}
                title={soundOn ? 'Mute' : 'Unmute'}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={clearChat}
                title="Clear Chat"
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-br-md'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md border border-gray-100 dark:border-gray-700'
                }`}>
                  {msg.content}
                  {msg.isStreaming && (
                    <span className="inline-block w-2 h-4 bg-current opacity-60 animate-pulse ml-1"></span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Tell me about Shuzhu's skills",
                "What projects has Shuzhu worked on?",
                "How can I contact Shuzhu?"
              ].map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(question)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-700 transition-colors disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex space-x-3">
              <input 
                value={inputMessage} 
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors disabled:opacity-50" 
                placeholder="Ask me anything about Shuzhu..." 
              />
              <button 
                onClick={handleSubmit}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white dark:text-slate-900 p-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      {!chatOpen && (
        <div className="flex items-end">
          <div className="mr-3 hidden sm:block">
            <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
              Chat with Shuzhu's AI
            </div>
          </div>
          <button 
            onClick={() => setChatOpen(true)} 
            className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 p-4 rounded-full shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}