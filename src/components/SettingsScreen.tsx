import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useGameStore();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-pink-400 via-rose-300 to-purple-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-lg w-full"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-pink-600">⚙️ 游戏设置</h1>
          <button
            onClick={() => navigate('/')}
            className="text-pink-400 hover:text-pink-600 text-2xl transition"
          >
            ✕
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-pink-700 font-medium mb-3">
              📖 文字速度: {settings.textSpeed}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={settings.textSpeed}
              onChange={(e) => updateSettings({ textSpeed: parseInt(e.target.value) })}
              className="w-full h-3 bg-pink-200 rounded-full appearance-none cursor-pointer accent-pink-500"
            />
            <div className="flex justify-between text-xs text-pink-400 mt-1">
              <span>慢</span>
              <span>快</span>
            </div>
          </div>

          <div>
            <label className="block text-pink-700 font-medium mb-3">
              ⏱️ 自动播放间隔: {settings.autoPlaySpeed / 1000}秒
            </label>
            <input
              type="range"
              min="1000"
              max="6000"
              step="500"
              value={settings.autoPlaySpeed}
              onChange={(e) => updateSettings({ autoPlaySpeed: parseInt(e.target.value) })}
              className="w-full h-3 bg-pink-200 rounded-full appearance-none cursor-pointer accent-pink-500"
            />
            <div className="flex justify-between text-xs text-pink-400 mt-1">
              <span>1秒</span>
              <span>6秒</span>
            </div>
          </div>

          <div>
            <label className="block text-pink-700 font-medium mb-3">
              🔊 主音量: {settings.masterVolume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.masterVolume}
              onChange={(e) => updateSettings({ masterVolume: parseInt(e.target.value) })}
              className="w-full h-3 bg-pink-200 rounded-full appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          <div>
            <label className="block text-pink-700 font-medium mb-3">
              🎵 BGM音量: {settings.bgmVolume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.bgmVolume}
              onChange={(e) => updateSettings({ bgmVolume: parseInt(e.target.value) })}
              className="w-full h-3 bg-pink-200 rounded-full appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          <div>
            <label className="block text-pink-700 font-medium mb-3">
              🔊 音效音量: {settings.seVolume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.seVolume}
              onChange={(e) => updateSettings({ seVolume: parseInt(e.target.value) })}
              className="w-full h-3 bg-pink-200 rounded-full appearance-none cursor-pointer accent-pink-500"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            返回标题画面
          </button>
        </div>
      </motion.div>
    </div>
  );
};
