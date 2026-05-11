import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import { getScene } from '../../data/story';
import { Background } from './Background';
import { CharacterLayer } from './CharacterSprite';
import { DialogueBox } from './DialogueBox';
import { ChoiceMenu } from './ChoiceMenu';
import { GameControls } from './GameControls';
import type { CharacterId, CharacterEmotion } from '../../types';

export const GameScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentSceneId,
    dialogueIndex,
    characterEmotions,
    isAutoPlaying,
    isSkipping,
    isTextComplete,
    nextDialogue,
    makeChoice,
    setTextComplete,
    goBack,
    setCharacterEmotion,
  } = useGameStore();

  const scene = getScene(currentSceneId);
  const currentDialogue = scene?.dialogues[dialogueIndex];

  useEffect(() => {
    if (currentDialogue?.character && currentDialogue?.emotion) {
      setCharacterEmotion(
        currentDialogue.character as CharacterId,
        (currentDialogue.emotion as CharacterEmotion) || 'neutral'
      );
    }
  }, [currentDialogue, setCharacterEmotion]);

  const handleNext = useCallback(() => {
    if (!currentDialogue) return;

    if (currentDialogue.choices && currentDialogue.choices.length > 0) {
      return;
    }

    if (!isTextComplete) {
      setTextComplete(true);
      return;
    }

    const hasNextScene = currentDialogue.next || 
      (scene && dialogueIndex < scene.dialogues.length - 1);

    if (hasNextScene) {
      nextDialogue();
    }
  }, [currentDialogue, isTextComplete, scene, dialogueIndex, nextDialogue, setTextComplete]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setTimeout(() => {
      handleNext();
    }, 100);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, dialogueIndex, handleNext]);

  useEffect(() => {
    if (!isSkipping) return;

    const timer = setTimeout(() => {
      handleNext();
    }, 50);

    return () => clearTimeout(timer);
  }, [isSkipping, dialogueIndex, handleNext]);

  if (!scene || !currentDialogue) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-600">
        <div className="text-center text-white">
          <p className="text-2xl mb-4">游戏加载中...</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
          >
            返回标题
          </button>
        </div>
      </div>
    );
  }

  const renderCharacters = () => {
    if (!currentDialogue.character) {
      return <CharacterLayer emotions={characterEmotions} />;
    }

    const char = currentDialogue.character as CharacterId;
    const pos = currentDialogue.position || 'center';

    return (
      <CharacterLayer
        center={pos === 'center' ? char : undefined}
        left={pos === 'left' ? char : undefined}
        right={pos === 'right' ? char : undefined}
        emotions={characterEmotions}
      />
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Background background={currentDialogue.background} />
      {renderCharacters()}
      
      <DialogueBox
        key={`${currentSceneId}-${dialogueIndex}`}
        text={currentDialogue.text}
        speaker={currentDialogue.speaker}
        onComplete={() => setTextComplete(true)}
      />

      {currentDialogue.choices && currentDialogue.choices.length > 0 && (
        <ChoiceMenu
          choices={currentDialogue.choices}
          onSelect={makeChoice}
        />
      )}

      <GameControls
        onNext={handleNext}
        onBack={goBack}
        canGoBack={dialogueIndex > 0 || currentSceneId !== 'prologue'}
        isAutoPlaying={isAutoPlaying}
        isSkipping={isSkipping}
      />
    </div>
  );
};
