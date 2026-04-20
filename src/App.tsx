import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { SONGS } from './constants';
import { Cpu, Power, Activity, Disc, Database, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

function App() {
  return (
    <div className="flex flex-col h-screen w-screen bg-[#050507] overflow-hidden select-none">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 border-b border-cyan-900/50 bg-[#0a0a0c] relative z-20">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 neon-border-cyan rounded-sm flex items-center justify-center font-bold text-xs">NX</div>
          <h1 className="text-lg font-black tracking-widest neon-cyan italic">NEOSYNTH // ARCADE</h1>
        </div>
        
        <div className="flex space-x-12">
          <div className="text-center">
            <p className="text-[10px] uppercase text-cyan-500/60 tracking-tighter font-mono">Current Run</p>
            <p className="text-xl font-bold text-emerald-400 tabular-nums">000,450</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase text-cyan-500/60 tracking-tighter font-mono">System Integrity</p>
            <p className="text-xl font-bold text-fuchsia-400 tabular-nums">098.4%</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Music Library */}
        <aside className="w-64 border-r border-cyan-900/30 bg-[#08080a] p-4 flex flex-col z-10">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-cyan-500 flex items-center gap-2">
            <Disc className="w-3 h-3" /> Audio Library
          </h2>
          <div className="space-y-4 flex-1 overflow-y-auto">
            {SONGS.map((song, i) => (
              <div key={song.id} className={`p-3 transition-colors cursor-pointer border-l-2 ${i === 0 ? 'bg-cyan-900/10 border-cyan-500' : 'border-transparent hover:bg-white/5'}`}>
                <p className={`text-xs font-bold uppercase ${i === 0 ? 'text-cyan-400' : 'text-gray-400'}`}>0{i+1}. {song.title}</p>
                <p className="text-[10px] text-gray-600 uppercase mt-1">{song.artist} • 0{Math.floor(song.duration/60)}:{(song.duration%60).toString().padStart(2, '0')}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-cyan-900/20">
            <div className="h-24 neon-border-cyan rounded bg-black flex items-end justify-center gap-1 p-2">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ['20%', `${Math.random()*80+20}%`, '20%'] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1.5 bg-cyan-500"
                />
              ))}
            </div>
            <p className="text-[9px] text-center mt-2 text-cyan-800 uppercase font-mono">Spectral Analysis Active</p>
          </div>
        </aside>

        {/* Center: Main Game Area */}
        <section className="flex-1 flex items-center justify-center bg-grid relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <span className="text-[200px] font-black text-cyan-500 tracking-tighter">SNAKE</span>
          </div>
          <SnakeGame />
        </section>

        {/* Right Sidebar: System Stats */}
        <aside className="w-64 border-l border-cyan-900/30 bg-[#08080a] p-4 flex flex-col z-10">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-cyan-500 flex items-center gap-2">
            <Database className="w-3 h-3" /> System Context
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase text-gray-500 font-mono">
                <span>Processor Seed</span>
                <span>0xAF23</span>
              </div>
              <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[65%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase text-gray-500 font-mono">
                <span>Neural Sync</span>
                <span>Active</span>
              </div>
              <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[82%]" />
              </div>
            </div>
            <div className="mt-12 p-4 border border-fuchsia-900/30 rounded bg-fuchsia-900/5">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-3 h-3 text-fuchsia-400" />
                <p className="text-[10px] text-fuchsia-400 uppercase font-bold tracking-widest">Protocol Delta</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-mono">Synchronous update applied. Node harvesting efficiency at nominal levels.</p>
            </div>
          </div>

          <div className="mt-auto space-y-3">
             <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center gap-3">
               <Cpu className="w-4 h-4 text-cyan-500" />
               <div className="text-[10px] font-bold text-gray-400 uppercase">Hardware Ready</div>
             </div>
             <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center gap-3">
               <Power className="w-4 h-4 text-emerald-500" />
               <div className="text-[10px] font-bold text-gray-400 uppercase">Connection Stable</div>
             </div>
          </div>
        </aside>
      </main>

      {/* Footer: Global Music Player Controls */}
      <footer className="h-24 bg-[#0a0a0c] border-t border-fuchsia-900/50 relative z-20">
        <MusicPlayer />
      </footer>
    </div>
  );
}

export default App;
