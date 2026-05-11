import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Choice } from '../../types';

interface ChoiceMenuProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

export const ChoiceMenu: React.FC<ChoiceMenuProps> = ({ choices, onSelect }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!choices || choices.length === 0) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-gradient-to-b from-pink-900/90 to-purple-900/90 rounded-3xl p-8 shadow-2xl border-4 border-pink-400/30 max-w-md w-full mx-4">
        <h3 className="text-pink-300 text-center text-xl mb-6 font-bold tracking-wide">
          请选择
        </h3>
        
        <div className="space-y-4">
          <AnimatePresence>
            {choices.map((choice, index) => (
              <motion.button
                key={choice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: hoveredIndex === index ? 1.05 : 1,
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`
                  w-full text-left px-6 py-4 rounded-xl transition-all duration-300
                  ${hoveredIndex === index 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/50' 
                    : 'bg-white/10 text-pink-200 hover:bg-white/20'
                  }
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSelect(choice)}
              >
                <div className="flex items-center gap-3">
                  <span className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${hoveredIndex === index 
                      ? 'bg-white/30 text-white' 
                      : 'bg-pink-500/50 text-pink-300'
                    }
                  `}>
                    {index + 1}
                  </span>
                  <span className="flex-1">{choice.text}</span>
                  <span className="opacity-50">▶</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
