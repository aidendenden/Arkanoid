import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import { SaveLoadMenu } from './SaveLoadMenu';

interface GameControlsProps {
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  isAutoPlaying: boolean;
  isSkipping: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onNext,
  onBack,
  canGoBack,
  isAutoPlaying,
  isSkipping,
}) => {
  const navigate = useNavigate();
  const { toggleAutoPlay, toggleSkip } = useGameStore();
  const [showMenu, setShowMenu] = useState(false);
  const [menuType, setMenuType] = useState<'main' | 'save' | 'load'>('main');

  const handleSave = () => {
    setMenuType('save');
  };

  const handleLoad = () => {
    setMenuType('load');
  };

  const handleTitle = () => {
    navigate('/');
  };

  if (showMenu) {
    if (menuType === 'save' || menuType === 'load') {
      return <SaveLoadMenu type={menuType} onClose={() => setShowMenu(false)} />;
    }
  }

  return (
    <div className="absolute top-4 right-4 flex gap-2 z-40">
      <button
        onClick={toggleAutoPlay}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg ${
          isAutoPlaying
            ? 'bg-pink-500 text-white'
            : 'bg-white/80 text-gray-700 hover:bg-white'
        }`}
      >
        {isAutoPlaying ? '⏸ 自动' : '▶ 自动'}
      </button>
      
      <button
        onClick={toggleSkip}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg ${
          isSkipping
            ? 'bg-pink-500 text-white'
            : 'bg-white/80 text-gray-700 hover:bg-white'
        }`}
      >
        {isSkipping ? '⏸ 跳过' : '⏩ 跳过'}
      </button>

      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg ${
          canGoBack
            ? 'bg-white/80 text-gray-700 hover:bg-white'
            : 'bg-gray-300/50 text-gray-400 cursor-not-allowed'
        }`}
      >
        ⬅️ 回溯
      </button>

      <button
        onClick={() => setShowMenu(true)}
        className="px-4 py-2 rounded-lg text-sm font-medium bg-white/80 text-gray-700 hover:bg-white transition-all shadow-lg"
      >
        ☰ 菜单
      </button>

      {showMenu && (
        <div className="absolute top-full right-0 mt-2 bg-white/95 rounded-xl shadow-2xl p-4 min-w-48 border border-pink-200">
          <div className="space-y-2">
            <button
              onClick={handleSave}
              className="w-full text-left px-4 py-2 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 font-medium transition"
            >
              💾 存档
            </button>
            <button
              onClick={handleLoad}
              className="w-full text-left px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition"
            >
              📂 读档
            </button>
            <hr className="border-pink-100" />
            <button
              onClick={handleTitle}
              className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              🏠 返回标题
            </button>
            <button
              onClick={() => setShowMenu(false)}
              className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500 font-medium transition"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
