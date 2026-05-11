import React from 'react';
import type { CharacterId, CharacterEmotion, CharacterPosition } from '../../types';
import { CHARACTERS } from '../../types';

interface CharacterSpriteProps {
  characterId: CharacterId;
  emotion: CharacterEmotion;
  position: CharacterPosition;
  visible?: boolean;
}

const emotionColors: Record<CharacterEmotion, string> = {
  neutral: 'from-gray-400 to-gray-500',
  happy: 'from-pink-400 to-pink-500',
  sad: 'from-blue-400 to-blue-500',
  angry: 'from-red-400 to-red-500',
  surprised: 'from-yellow-400 to-yellow-500',
  embarrassed: 'from-pink-300 to-pink-400',
  love: 'from-pink-500 to-rose-500',
  thinking: 'from-purple-400 to-purple-500',
};

const emotionEmojis: Record<CharacterEmotion, string> = {
  neutral: '😊',
  happy: '😄',
  sad: '😢',
  angry: '😠',
  surprised: '😲',
  embarrassed: '😳',
  love: '😍',
  thinking: '🤔',
};

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  characterId,
  emotion,
  position,
  visible = true,
}) => {
  const character = CHARACTERS[characterId];
  const positionClass = {
    left: 'left-[5%]',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-[5%]',
  }[position];

  if (!visible) return null;

  return (
    <div
      className={`absolute bottom-[35%] ${positionClass} w-[300px] h-[400px] transition-all duration-500 ease-out`}
    >
      <div className={`relative w-full h-full rounded-2xl bg-gradient-to-b ${emotionColors[emotion]} shadow-2xl overflow-hidden border-4 border-white/30 backdrop-blur-sm`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        <div className="absolute top-4 left-4 right-4 flex items-center gap-2">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${emotionColors[emotion]} border-4 border-white shadow-lg flex items-center justify-center text-3xl`}>
            {emotionEmojis[emotion]}
          </div>
          <div className="flex-1 text-center">
            <span className="text-white text-lg font-bold drop-shadow-lg">
              {character.name}
            </span>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-8xl">{emotionEmojis[emotion]}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="text-center">
            <span className="text-white/80 text-xs uppercase tracking-wider">{characterId}</span>
          </div>
        </div>

        <div className={`absolute top-1/2 -translate-y-1/2 ${position === 'left' ? '-right-8' : position === 'right' ? '-left-8' : ''} w-6 h-6 rounded-full ${emotionColors[emotion]} animate-pulse shadow-lg`} />
      </div>
    </div>
  );
};

interface CharacterLayerProps {
  center?: CharacterId;
  left?: CharacterId;
  right?: CharacterId;
  emotions: Record<CharacterId, CharacterEmotion>;
}

export const CharacterLayer: React.FC<CharacterLayerProps> = ({
  center,
  left,
  right,
  emotions,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {left && (
        <CharacterSprite
          characterId={left}
          emotion={emotions[left]}
          position="left"
          visible={true}
        />
      )}
      {center && (
        <CharacterSprite
          characterId={center}
          emotion={emotions[center]}
          position="center"
          visible={true}
        />
      )}
      {right && (
        <CharacterSprite
          characterId={right}
          emotion={emotions[right]}
          position="right"
          visible={true}
        />
      )}
    </div>
  );
};
