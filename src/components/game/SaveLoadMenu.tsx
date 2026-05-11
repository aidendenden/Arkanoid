import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import type { SaveData } from '../../types';

interface SaveLoadMenuProps {
  type: 'save' | 'load';
  onClose: () => void;
}

export const SaveLoadMenu: React.FC<SaveLoadMenuProps> = ({ type, onClose }) => {
  const { saveGame, loadGame, getAllSaves } = useGameStore();
  const saves = getAllSaves();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPlaytime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleSlotClick = (slotId: number) => {
    if (type === 'save') {
      saveGame(slotId);
      onClose();
    } else {
      const saveData = saves[slotId];
      if (saveData) {
        loadGame(saveData);
        onClose();
      }
    }
  };

  const isEmpty = (save: SaveData | null) => !save;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-b from-pink-900/95 to-purple-900/95 rounded-3xl p-8 shadow-2xl border-4 border-pink-400/30 max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {type === 'save' ? '💾 存档' : '📂 读档'}
          </h2>
          <button
            onClick={onClose}
            className="text-pink-300 hover:text-white text-2xl transition"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[0, 1, 2, 3, 4, 5].map((slotId) => {
            const save = saves[slotId];
            const empty = isEmpty(save);

            return (
              <motion.button
                key={slotId}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSlotClick(slotId)}
                disabled={type === 'load' && empty}
                className={`
                  relative p-4 rounded-xl text-left transition-all
                  ${empty
                    ? 'bg-white/10 border-2 border-dashed border-pink-300/30 hover:border-pink-300/50'
                    : 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-400/30 hover:border-pink-400/50'
                  }
                  ${type === 'load' && empty ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className="absolute top-2 right-2 text-pink-300/60 text-sm">
                  #{slotId + 1}
                </div>
                
                {empty ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2 opacity-50">+</div>
                    <div className="text-pink-200/50 text-sm">空存档位</div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-pink-300 font-bold text-sm truncate">
                      {save?.sceneId || '未知场景'}
                    </div>
                    <div className="text-white/80 text-xs">
                      {formatDate(save?.timestamp || 0)}
                    </div>
                    <div className="text-pink-200/60 text-xs">
                      ⏱ {formatPlaytime(save?.playtime || 0)}
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-6 text-center text-pink-300/60 text-sm">
          {type === 'save' 
            ? '点击存档位保存当前进度' 
            : '点击存档位读取保存的进度'
          }
        </div>
      </motion.div>
    </motion.div>
  );
};
