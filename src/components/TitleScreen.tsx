import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const TitleScreen: React.FC = () => {
  const navigate = useNavigate();
  const { startGame, getAllSaves } = useGameStore();
  const [hasSave, setHasSave] = useState(false);

  useEffect(() => {
    const saves = getAllSaves();
    setHasSave(saves.some(save => save !== null));
  }, [getAllSaves]);

  const handleStart = () => {
    startGame();
    navigate('/game');
  };

  const handleContinue = () => {
    navigate('/game');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-400 via-rose-300 to-purple-500">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white/40"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: '-20px',
              opacity: 0.3 + Math.random() * 0.5,
              scale: 0.3 + Math.random() * 0.7,
            }}
            animate={{ 
              y: '100vh',
              opacity: 0,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: 'linear',
            }}
            style={{
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
              style={{ 
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                fontFamily: 'serif',
              }}>
            樱之丘学园
          </h1>
          <h2 className="text-2xl md:text-4xl text-pink-100 font-medium"
              style={{ 
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}>
            恋爱狂想曲
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="w-64 px-8 py-4 bg-white/90 backdrop-blur-sm rounded-full text-xl font-bold text-pink-600 shadow-xl hover:bg-white transition-all border-2 border-pink-200"
          >
            开始游戏
          </motion.button>

          {hasSave && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="w-64 px-8 py-4 bg-white/70 backdrop-blur-sm rounded-full text-lg font-medium text-pink-500 shadow-lg hover:bg-white/90 transition-all border-2 border-pink-200/50"
            >
              继续游戏
            </motion.button>
          )}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/settings')}
            className="w-64 px-8 py-3 bg-white/50 backdrop-blur-sm rounded-full text-base font-medium text-pink-400 shadow-lg hover:bg-white/70 transition-all border-2 border-pink-200/30"
          >
            游戏设置
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 text-center"
        >
          <p className="text-white/60 text-sm">
            © 2024 Sakura Academy Visual Novel
          </p>
          <p className="text-white/40 text-xs mt-2">
            樱花飞舞，恋爱的季节
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-300/20 blur-3xl"
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl"
        animate={{ 
          x: [0, -60, 60, 0],
          y: [0, 40, -40, 0],
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
