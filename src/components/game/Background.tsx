import React from 'react';
import { motion } from 'framer-motion';
import { BACKGROUNDS } from '../../types';

interface BackgroundProps {
  background?: string;
}

const backgroundGradients: Record<string, { gradient: string; accent: string }> = {
  school_gate: {
    gradient: 'from-pink-300 via-rose-200 to-white',
    accent: 'from-pink-400 to-rose-300',
  },
  classroom: {
    gradient: 'from-blue-200 via-indigo-100 to-white',
    accent: 'from-blue-400 to-indigo-300',
  },
  gym: {
    gradient: 'from-green-200 via-emerald-100 to-white',
    accent: 'from-green-400 to-emerald-300',
  },
  library: {
    gradient: 'from-amber-100 via-yellow-50 to-white',
    accent: 'from-amber-400 to-yellow-300',
  },
  rooftop: {
    gradient: 'from-orange-300 via-pink-200 to-purple-200',
    accent: 'from-orange-400 to-pink-300',
  },
  park: {
    gradient: 'from-green-300 via-emerald-200 to-teal-100',
    accent: 'from-green-400 to-emerald-300',
  },
  beach: {
    gradient: 'from-cyan-300 via-blue-200 to-sky-100',
    accent: 'from-cyan-400 to-blue-300',
  },
  home: {
    gradient: 'from-orange-100 via-amber-50 to-white',
    accent: 'from-orange-300 to-amber-200',
  },
  street: {
    gradient: 'from-gray-200 via-slate-100 to-white',
    accent: 'from-gray-400 to-slate-300',
  },
  cafe: {
    gradient: 'from-rose-200 via-pink-100 to-white',
    accent: 'from-rose-400 to-pink-300',
  },
};

export const Background: React.FC<BackgroundProps> = ({ background }) => {
  const bg = background || 'school_gate';
  const colors = backgroundGradients[bg] || backgroundGradients.school_gate;
  const bgName = BACKGROUNDS[bg as keyof typeof BACKGROUNDS] || '校园';

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`}>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-pink-300' : 'bg-rose-200'}`}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: '-20px',
              opacity: 0.6 + Math.random() * 0.4,
              scale: 0.5 + Math.random() * 0.5,
            }}
            animate={{ 
              y: '100vh',
              opacity: 0,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: 'linear',
            }}
            style={{
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />

      <div className="absolute top-4 left-4 text-white/40 text-sm">
        {bgName}
      </div>

      <motion.div
        className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br ${colors.accent} blur-3xl opacity-20`}
        animate={{ 
          x: [0, -20, 20, 0],
          y: [0, 20, -20, 0],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-pink-200/30 to-transparent blur-3xl"
        animate={{ 
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
