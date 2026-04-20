import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GRID_SIZE, INITIAL_SPEED, MIN_SPEED, SPEED_INCREMENT } from '../constants';
import { Point, GameState } from '../types';
import { NeonCard } from './NeonCard';
import { Trophy, Play, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Point>({ x: 0, y: -1 });
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food is on snake
      if (!currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y)) break;
    }
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check self-collision
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameState('GAME_OVER');
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        setFood(generateFood(newSnake));
        setSpeed((prev) => Math.max(MIN_SPEED, prev - SPEED_INCREMENT));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, generateFood]);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      const interval = setInterval(moveSnake, speed);
      return () => clearInterval(interval);
    }
  }, [gameState, moveSnake, speed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width / GRID_SIZE;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (subtle)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * size, 0);
      ctx.lineTo(i * size, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * size);
      ctx.lineTo(canvas.width, i * size);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, i) => {
      const isHead = i === 0;
      ctx.fillStyle = isHead ? '#34d399' : '#065f46'; // Emerald colors
      ctx.shadowBlur = isHead ? 15 : 0;
      ctx.shadowColor = '#34d399';
      
      ctx.beginPath();
      ctx.rect(segment.x * size + 1, segment.y * size + 1, size - 2, size - 2);
      ctx.fill();
    });

    // Draw food
    ctx.fillStyle = '#ff00ff'; // Fuchsia
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff00ff';
    ctx.beginPath();
    ctx.arc((food.x + 0.5) * size, (food.y + 0.5) * size, size / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;
  }, [snake, food]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameState('PLAYING');
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative group">
        <NeonCard glowColor="green" className="p-1">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="bg-black/90 block cursor-none"
          />
        </NeonCard>

        {gameState !== 'PLAYING' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="text-center space-y-8 p-8 border border-cyan-900/30 bg-[#0a0a0c]">
              {gameState === 'GAME_OVER' && (
                <div className="space-y-2">
                  <h2 className="text-5xl font-black neon-magenta tracking-tighter uppercase italic">CRITICAL ERROR</h2>
                  <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Node Collection Terminated</p>
                  <p className="text-emerald-400 font-bold text-lg mt-4 font-mono">SCORE: {score.toString().padStart(6, '0')}</p>
                </div>
              )}
              
              <button
                onClick={startGame}
                className={`
                  flex items-center gap-3 px-10 py-5 rounded-sm font-bold uppercase tracking-[0.3em] transition-all
                  ${gameState === 'GAME_OVER' 
                    ? 'bg-fuchsia-600 shadow-[0_0_20px_rgba(255,0,255,0.4)] hover:bg-fuchsia-500' 
                    : 'bg-emerald-600 shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:bg-emerald-500'
                  }
                  text-white border border-white/20
                `}
              >
                {gameState === 'GAME_OVER' ? (
                  <> <RotateCcw className="w-5 h-5" /> RE-INITIALIZE </>
                ) : (
                  <> <Play className="w-5 h-5 fill-current" /> EXECUTE START </>
                )}
              </button>
              
              {gameState === 'IDLE' && (
                <div className="flex flex-col gap-2 text-cyan-500/40 text-[10px] font-mono uppercase tracking-[0.3em]">
                  <p>Input Interface: [ARROW_KEYS]</p>
                  <p>Neural Link Status: STABLE</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* On-screen controls for small screens */}
      <div className="grid grid-cols-3 gap-2 sm:hidden relative z-20">
        <div />
        <button className="w-12 h-12 bg-black border border-cyan-900/50 flex items-center justify-center text-cyan-500" onClick={() => setDirection({ x: 0, y: -1 })}><Play className="-rotate-90 w-5 h-5" /></button>
        <div />
        <button className="w-12 h-12 bg-black border border-cyan-900/50 flex items-center justify-center text-cyan-500" onClick={() => setDirection({ x: -1, y: 0 })}><Play className="rotate-180 w-5 h-5" /></button>
        <button className="w-12 h-12 bg-black border border-cyan-900/50 flex items-center justify-center text-cyan-500" onClick={() => setDirection({ x: 0, y: 1 })}><Play className="rotate-90 w-5 h-5" /></button>
        <button className="w-12 h-12 bg-black border border-cyan-900/50 flex items-center justify-center text-cyan-500" onClick={() => setDirection({ x: 1, y: 0 })}><Play className="w-5 h-5" /></button>
      </div>
    </div>
  );
};
