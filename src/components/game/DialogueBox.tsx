import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { CHARACTERS } from '../../types';

interface DialogueBoxProps {
  text: string;
  speaker: string | null;
  onComplete?: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ 
  text, 
  speaker,
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { settings, isSkipping } = useGameStore();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    
    let index = 0;
    const speed = 100 - (settings.textSpeed - 1) * 15;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
        onComplete?.();
      }
    }, isSkipping ? 5 : speed);

    return () => clearInterval(timer);
  }, [text, settings.textSpeed, isSkipping, onComplete]);

  const handleClick = () => {
    if (!isComplete) {
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
    }
  };

  const speakerColor = speaker ? CHARACTERS[speaker as keyof typeof CHARACTERS]?.color || '#FFB7C5' : '#FFB7C5';

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-[35%] min-h-[180px] bg-gradient-to-t from-black/90 via-black/85 to-black/80 backdrop-blur-sm cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="absolute inset-x-8 top-4 bottom-8 flex flex-col">
        {speaker && (
          <div className="mb-2">
            <span 
              className="inline-block px-4 py-1 text-lg font-bold rounded-full shadow-lg"
              style={{ 
                backgroundColor: 'rgba(255, 182, 193, 0.9)',
                color: speakerColor,
                textShadow: '0 0 10px rgba(255,255,255,0.5)'
              }}
            >
              {speaker}
            </span>
          </div>
        )}
        
        <div 
          ref={textRef}
          className="flex-1 bg-black/40 rounded-xl p-4 overflow-hidden border border-pink-200/20 shadow-inner"
        >
          <p className="text-white text-xl leading-relaxed font-medium tracking-wide">
            {displayText}
            {!isComplete && (
              <span className="inline-block w-3 h-6 bg-pink-300 ml-1 animate-pulse" />
            )}
          </p>
        </div>

        <div className="flex justify-end mt-2">
          <span className="text-pink-300/60 text-sm">▼ 点击继续</span>
        </div>
      </div>
    </div>
  );
};
