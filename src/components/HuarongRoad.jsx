import React, { useState, useEffect, useRef, useCallback } from 'react';

// Updated Huarong Road (Klotski) component with:
// - Color palette referencing MoreProjects category colors (pink, blue, yellow, green + neutral).
// - English UI text & instructions.
// - Controls (Restart, Tips, Moves, Time) placed BELOW the board.
// - Drag & drop multi-cell movement (snap to nearest legal grid). Same win condition (Cao Cao to (1,3)).

const GRID_COLS = 4;
const GRID_ROWS = 5;
const CELL_PX = 76; // cell size (visual spacing included via margins)

const initialPieces = () => ({
  zhangfei: { id: 'zhangfei', name: 'Zhang Fei', w: 1, h: 2, x: 0, y: 0, palette: 'from-pink-400 to-pink-600' },
  caocao: { id: 'caocao', name: 'Cao Cao', w: 2, h: 2, x: 1, y: 0, palette: 'from-red-500 to-red-700' },
  zhaoyun: { id: 'zhaoyun', name: 'Zhao Yun', w: 1, h: 2, x: 3, y: 0, palette: 'from-blue-400 to-blue-600' },
  machao: { id: 'machao', name: 'Ma Chao', w: 1, h: 2, x: 0, y: 2, palette: 'from-yellow-400 to-yellow-600 text-gray-900' },
  huangzhong: { id: 'huangzhong', name: 'Huang Zhong', w: 1, h: 2, x: 3, y: 2, palette: 'from-amber-400 to-amber-600 text-gray-900' },
  guanyu: { id: 'guanyu', name: 'Guan Yu', w: 2, h: 1, x: 1, y: 2, palette: 'from-green-400 to-green-600' },
  zu1: { id: 'zu1', name: 'Soldier', w: 1, h: 1, x: 1, y: 3, palette: 'from-stone-300 to-stone-500 text-gray-900' },
  zu2: { id: 'zu2', name: 'Soldier', w: 1, h: 1, x: 2, y: 3, palette: 'from-stone-300 to-stone-500 text-gray-900' },
  zu3: { id: 'zu3', name: 'Soldier', w: 1, h: 1, x: 0, y: 4, palette: 'from-stone-300 to-stone-500 text-gray-900' },
  zu4: { id: 'zu4', name: 'Soldier', w: 1, h: 1, x: 3, y: 4, palette: 'from-stone-300 to-stone-500 text-gray-900' },
});

const HuarongRoad = ({ isDark }) => {
  // --- state ---
  const [pieces, setPieces] = useState(initialPieces);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [won, setWon] = useState(false);
  const [dragId, setDragId] = useState(null);
  // 新增：是否开始计时（首步后） & 历史栈用于撤销
  const [isTiming, setIsTiming] = useState(false);
  const [history, setHistory] = useState([]); // 每个元素是 pieces 的深拷贝

  // refs for dragging
  const dragStartPos = useRef(null); // pointer start {x,y}
  const pieceStart = useRef(null);   // piece start grid {x,y}
  const tempOffset = useRef({ x: 0, y: 0 });
  const [, forceRerender] = useState(0);

  // 初始化历史栈
  useEffect(() => {
    setHistory([JSON.parse(JSON.stringify(pieces))]);
  }, []);

  // 计时器：只有 isTiming & 未胜利 时递增
  useEffect(() => {
    if (!isTiming || won) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [isTiming, won]);

  // build occupancy board
  const buildBoard = useCallback((ps = pieces, ignoreId = null) => {
    const b = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null));
    Object.values(ps).forEach(p => {
      if (p.id === ignoreId) return;
      for (let dy = 0; dy < p.h; dy++) {
        for (let dx = 0; dx < p.w; dx++) b[p.y + dy][p.x + dx] = p.id;
      }
    });
    return b;
  }, [pieces]);

  // 修改: canPlace 支持传入自定义状态集
  const canPlace = (id, x, y, ps = pieces) => {
    const p = ps[id];
    if (x < 0 || y < 0 || x + p.w > GRID_COLS || y + p.h > GRID_ROWS) return false;
    const b = buildBoard(ps, id);
    for (let dy = 0; dy < p.h; dy++) {
      for (let dx = 0; dx < p.w; dx++) if (b[y + dy][x + dx]) return false;
    }
    return true;
  };

  // win detection
  useEffect(() => {
    const c = pieces.caocao;
    if (c.x === 1 && c.y === 3) setWon(true);
    else if (won) setWon(false);
  }, [pieces]);

  // drag handlers
  const onPointerDown = (e, id) => {
    e.preventDefault();
    const p = pieces[id];
    setDragId(id);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    pieceStart.current = { x: p.x, y: p.y };
    tempOffset.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    const move = (e) => {
      if (!dragId) return;
      tempOffset.current = { x: e.clientX - dragStartPos.current.x, y: e.clientY - dragStartPos.current.y };
      forceRerender(v => v + 1);
    };
    const up = () => {
      if (!dragId) return;
      const dxCells = Math.round(tempOffset.current.x / CELL_PX);
      const dyCells = Math.round(tempOffset.current.y / CELL_PX);
      // 允许同轴多格移动，逐格验证，每格计一次 move
      let stepsStates = [];
      if ((dxCells === 0) ^ (dyCells === 0)) { // 仅单方向
        const stepX = Math.sign(dxCells);
        const stepY = Math.sign(dyCells);
        const total = Math.abs(dxCells) + Math.abs(dyCells);
        if (total > 0) {
          // 使用临时副本模拟
            let tempPiecesState = JSON.parse(JSON.stringify(pieces));
            for (let i = 0; i < total; i++) {
              const cur = tempPiecesState[dragId];
              const nx = cur.x + stepX;
              const ny = cur.y + stepY;
              if (!canPlace(dragId, nx, ny, tempPiecesState)) break; // 遇阻停止
              tempPiecesState[dragId] = { ...cur, x: nx, y: ny };
              stepsStates.push(JSON.parse(JSON.stringify(tempPiecesState)));
            }
            if (stepsStates.length) {
              setPieces(stepsStates[stepsStates.length - 1]);
              setMoves(m => m + stepsStates.length);
              setHistory(h => [...h, ...stepsStates]);
              if (!isTiming) setIsTiming(true);
            }
        }
      }
      // 复位
      setDragId(null);
      tempOffset.current = { x: 0, y: 0 };
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [dragId, canPlace, isTiming, pieces]);

  const resetGame = () => {
    const init = initialPieces();
    setPieces(init);
    setMoves(0);
    setSeconds(0);
    setWon(false);
    setShowHint(false);
    setIsTiming(false);
    setHistory([JSON.parse(JSON.stringify(init))]);
  };

  const showTips = () => { setShowHint(true); setTimeout(() => setShowHint(false), 6000); };

  const undoMove = () => {
    setHistory(h => {
      if (h.length <= 1) return h;
      const newHist = h.slice(0, -1);
      const prevState = newHist[newHist.length - 1];
      setPieces(prevState);
      setMoves(m => {
        const nm = Math.max(0, m - 1);
        if (nm === 0) { setIsTiming(false); setSeconds(0); }
        return nm;
      });
      return newHist;
    });
  };

  const timeStr = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  // board background color palette referencing MoreProjects categories
  const cellPalette = [
    'bg-pink-100 dark:bg-[#C6878F]/50',
    'bg-blue-100 dark:bg-[#5EB1BF]/50',
    'bg-yellow-100 dark:bg-[#D6B65C]/40',
    'bg-green-100 dark:bg-[#7BC47F]/50'
  ];

  const renderPieces = () => Object.values(pieces).map(p => {
    const dragging = dragId === p.id;
    const offset = dragging ? tempOffset.current : { x: 0, y: 0 };
    const baseLeft = p.x * CELL_PX; const baseTop = p.y * CELL_PX;
    const width = p.w * CELL_PX - 4; const height = p.h * CELL_PX - 4;
    return (
      <div
        key={p.id}
        onPointerDown={(e) => onPointerDown(e, p.id)}
        className={`absolute select-none rounded-lg border-2 border-white/40 font-semibold text-[10px] sm:text-xs flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing text-white bg-gradient-to-br ${p.palette} ${dragging ? 'z-20 ring-4 ring-amber-300 scale-[1.04]' : 'hover:brightness-110'} transition`}
        style={{ left: baseLeft + offset.x, top: baseTop + offset.y, width, height, transition: dragging ? 'none' : 'left .18s, top .18s, transform .18s' }}
      >
        {p.name}
      </div>
    );
  });

  return (
    <div className={`min-h-screen py-16 px-4 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-[#f5f4ed] text-gray-900'}`}>      
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-wide mb-3">Huarong Road Puzzle</h1>
          <p className="text-sm md:text-base opacity-80 max-w-2xl mx-auto leading-relaxed">
            Move one square at a time. A move is valid only if every destination cell is empty and inside the board. Guide <span className="font-semibold">Cao Cao</span> (2x2) to the EXIT at bottom center.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
          {/* Board */}
          <div className="relative">
            <div className={`relative rounded-2xl p-2 shadow-2xl border overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-700 border-slate-600'}`} style={{ width: GRID_COLS * CELL_PX, height: GRID_ROWS * CELL_PX }}>
              {Array.from({ length: GRID_ROWS }).map((_, r) => (
                Array.from({ length: GRID_COLS }).map((__, c) => (
                  <div key={`cell-${r}-${c}`} className={`absolute ${cellPalette[(r * GRID_COLS + c) % cellPalette.length]} rounded-xl pointer-events-none`} style={{ left: c * CELL_PX + 2, top: r * CELL_PX + 2, width: CELL_PX - 4, height: CELL_PX - 4, opacity: 0.55 }} />
                ))
              ))}
              {renderPieces()}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-wider text-center text-amber-500">EXIT<br/>⬆︎</div>
            </div>
          </div>
          {/* Controls */}
          <div className="w-full max-w-xl">
            <div className="flex flex-wrap items-stretch gap-4 justify-center">
              <div className="flex-1 min-w-[120px] bg-white/70 dark:bg-slate-800/70 backdrop-blur rounded-xl p-4 border border-gray-300 dark:border-slate-700 text-center shadow">
                <div className="text-xs uppercase tracking-wide opacity-70 mb-1">Moves</div>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{moves}</div>
              </div>
              {moves > 0 && (
                <div className="flex-1 min-w-[120px] bg-white/70 dark:bg-slate-800/70 backdrop-blur rounded-xl p-4 border border-gray-300 dark:border-slate-700 text-center shadow">
                  <div className="text-xs uppercase tracking-wide opacity-70 mb-1">Time</div>
                  <div className="text-3xl font-bold text-sky-600 dark:text-sky-400 tabular-nums">{timeStr}</div>
                </div>
              )}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <button onClick={resetGame} className="py-3 rounded-xl font-medium bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-300 text-white dark:text-gray-800 shadow hover:scale-[1.02] active:scale-[0.97] transition">Restart</button>
              <button onClick={undoMove} disabled={history.length <= 1} className={`py-3 rounded-xl font-medium shadow transition active:scale-[0.97] hover:scale-[1.02] ${history.length <= 1 ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-200 dark:text-gray-400' : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'}`}>Undo</button>
              <button onClick={showTips} className="py-3 rounded-xl font-medium bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 shadow hover:scale-[1.02] active:scale-[0.97] transition">Tips</button>
            </div>
            {won && (
              <div className="mt-6 p-4 rounded-xl bg-green-500/15 border border-green-500/40 text-sm text-green-700 dark:text-green-300">🎉 Victory! Cao Cao escaped in {moves} moves • {timeStr}</div>
            )}
            {showHint && !won && (
              <div className="mt-6 p-4 rounded-xl bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-600 text-xs leading-relaxed text-amber-900 dark:text-amber-200">Strategy: Move only one square per turn. Keep empty cells adjacent; clear space under Cao Cao, shift Guan Yu sideways, then cycle vertical generals.</div>
            )}
            <div className="mt-6 text-[11px] sm:text-xs opacity-70 leading-relaxed">Rules: (1) Pieces move UP / DOWN / LEFT / RIGHT. (2) Target square(s) must be empty & on board. (3) One-square move counts as one move. Undo reverts last move (move count decreases). Timer starts after the first move.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuarongRoad;