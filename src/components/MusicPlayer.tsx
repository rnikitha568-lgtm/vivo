import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { SONGS } from '../constants';
import { motion } from 'motion/react';

export const MusicPlayer: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = SONGS[currentSongIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextSong = () => setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
  const prevSong = () => setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="h-full flex items-center px-8 w-full font-mono">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
      />
      
      {/* Current Info */}
      <div className="w-64 flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-900 rounded-sm border border-cyan-500/30 flex items-center justify-center">
          <motion.div 
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 border-cyan-500 rotate-45" 
          />
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold neon-cyan uppercase truncate">{currentSong.title}</p>
          <p className="text-[10px] text-gray-500 truncate">{currentSong.artist}</p>
        </div>
      </div>

      {/* Controls & Progress */}
      <div className="flex-1 flex flex-col items-center px-12">
        <div className="flex items-center space-x-8 mb-3 text-gray-400">
          <button onClick={prevSong} className="hover:text-cyan-400 transition-colors">
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full border border-fuchsia-500 flex items-center justify-center text-fuchsia-500 hover:bg-fuchsia-500/10 transition-all shadow-[0_0_10px_rgba(255,0,255,0.2)]"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
          <button onClick={nextSong} className="hover:text-cyan-400 transition-colors">
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>
        
        <div className="w-full flex items-center space-x-3 text-[9px] text-gray-600 font-bold">
          <span className="text-cyan-500">
            {Math.floor((audioRef.current?.currentTime || 0) / 60)}:{(Math.floor((audioRef.current?.currentTime || 0) % 60)).toString().padStart(2, '0')}
          </span>
          <div className="flex-1 h-1 bg-gray-900 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-fuchsia-500 shadow-[0_0_8px_#ff00ff]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <span>
            {Math.floor(currentSong.duration / 60)}:{(currentSong.duration % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Volume / Extra */}
      <div className="w-64 flex justify-end items-center space-x-4 text-gray-500">
        <Volume2 className="w-4 h-4" />
        <div className="w-24 h-1 bg-gray-900 rounded-full">
          <div className="h-full bg-cyan-800 w-[70%]" />
        </div>
      </div>
    </div>
  );
};
