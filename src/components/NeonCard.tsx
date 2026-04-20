import React from 'react';
import { motion } from 'motion/react';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'green' | 'blue' | 'pink' | 'cyan' | 'fuchsia';
}

const glowStyles = {
  purple: 'border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]',
  green: 'neon-border-green',
  blue: 'neon-border-cyan',
  pink: 'border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]',
  cyan: 'neon-border-cyan',
  fuchsia: 'border-fuchsia-500 shadow-[0_0_15px_#ff00ff]',
};

export const NeonCard: React.FC<NeonCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'cyan' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        bg-black/60 border 
        ${glowStyles[glowColor]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
