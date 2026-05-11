import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  GameState, 
  GameSettings, 
  SaveData, 
  Choice, 
  CharacterId, 
  CharacterEmotion 
} from '../types';

const DEFAULT_SETTINGS: GameSettings = {
  textSpeed: 3,
  autoPlaySpeed: 3000,
  masterVolume: 80,
  bgmVolume: 50,
  seVolume: 70,
};

interface GameStore extends GameState {
  startGame: () => void;
  nextDialogue: () => void;
  goToDialogue: (sceneId: string, dialogueIndex: number) => void;
  makeChoice: (choice: Choice) => void;
  goBack: () => void;
  setCharacterEmotion: (characterId: CharacterId, emotion: CharacterEmotion) => void;
  setFlag: (flag: string, value: boolean) => void;
  toggleAutoPlay: () => void;
  toggleSkip: () => void;
  setTextComplete: (complete: boolean) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  resetGame: () => void;
  saveGame: (slotId: number) => void;
  loadGame: (saveData: SaveData) => void;
  getSaveData: (slotId: number) => SaveData | null;
  getAllSaves: () => (SaveData | null)[];
}

const initialState: Omit<GameState, 'startedAt'> = {
  currentSceneId: 'prologue',
  dialogueIndex: 0,
  history: [],
  characterEmotions: {
    yukino: 'neutral',
    mai: 'neutral',
    rin: 'neutral',
  },
  flags: {},
  choices: [],
  settings: DEFAULT_SETTINGS,
  isAutoPlaying: false,
  isSkipping: false,
  isTextComplete: false,
  playtime: 0,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      startedAt: Date.now(),

      startGame: () => {
        set({
          ...initialState,
          startedAt: Date.now(),
          currentSceneId: 'prologue',
          dialogueIndex: 0,
        });
      },

      nextDialogue: () => {
        const { currentSceneId, dialogueIndex, history } = get();
        set({
          history: [...history, { sceneId: currentSceneId, dialogueIndex }],
          dialogueIndex: dialogueIndex + 1,
          isTextComplete: false,
        });
      },

      goToDialogue: (sceneId: string, index: number) => {
        const { currentSceneId, dialogueIndex, history } = get();
        set({
          history: [...history, { sceneId: currentSceneId, dialogueIndex }],
          currentSceneId: sceneId,
          dialogueIndex: index,
          isTextComplete: false,
        });
      },

      makeChoice: (choice: Choice) => {
        const { flags, history, currentSceneId, dialogueIndex } = get();
        
        const newFlags = choice.flag 
          ? { ...flags, [choice.flag]: true }
          : flags;

        set({
          flags: newFlags,
          history: [...history, { sceneId: currentSceneId, dialogueIndex }],
          currentSceneId: choice.nextScene,
          dialogueIndex: 0,
          isTextComplete: false,
          isAutoPlaying: false,
        });
      },

      goBack: () => {
        const { history } = get();
        if (history.length === 0) return;
        
        const newHistory = [...history];
        const lastState = newHistory.pop();
        
        if (lastState) {
          set({
            currentSceneId: lastState.sceneId,
            dialogueIndex: lastState.dialogueIndex,
            history: newHistory,
            isTextComplete: true,
          });
        }
      },

      setCharacterEmotion: (characterId: CharacterId, emotion: CharacterEmotion) => {
        set((state) => ({
          characterEmotions: {
            ...state.characterEmotions,
            [characterId]: emotion,
          },
        }));
      },

      setFlag: (flag: string, value: boolean) => {
        set((state) => ({
          flags: { ...state.flags, [flag]: value },
        }));
      },

      toggleAutoPlay: () => {
        set((state) => ({
          isAutoPlaying: !state.isAutoPlaying,
          isSkipping: false,
        }));
      },

      toggleSkip: () => {
        set((state) => ({
          isSkipping: !state.isSkipping,
          isAutoPlaying: false,
        }));
      },

      setTextComplete: (complete: boolean) => {
        set({ isTextComplete: complete });
      },

      updateSettings: (newSettings: Partial<GameSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      resetGame: () => {
        set({
          ...initialState,
          startedAt: Date.now(),
        });
      },

      saveGame: (slotId: number) => {
        const state = get();
        const saveData: SaveData = {
          id: slotId,
          timestamp: Date.now(),
          playtime: state.playtime + Math.floor((Date.now() - state.startedAt) / 1000),
          sceneId: state.currentSceneId,
          dialogueIndex: state.dialogueIndex,
          flags: state.flags,
          choices: state.choices,
        };

        const saves = JSON.parse(localStorage.getItem('galgame_saves') || '{}');
        saves[slotId] = saveData;
        localStorage.setItem('galgame_saves', JSON.stringify(saves));
      },

      loadGame: (saveData: SaveData) => {
        set({
          currentSceneId: saveData.sceneId,
          dialogueIndex: saveData.dialogueIndex,
          flags: saveData.flags,
          choices: saveData.choices,
          playtime: saveData.playtime,
          startedAt: Date.now(),
          history: [],
          isAutoPlaying: false,
          isSkipping: false,
          isTextComplete: false,
        });
      },

      getSaveData: (slotId: number) => {
        const saves = JSON.parse(localStorage.getItem('galgame_saves') || '{}');
        return saves[slotId] || null;
      },

      getAllSaves: () => {
        const saves = JSON.parse(localStorage.getItem('galgame_saves') || '{}');
        return [0, 1, 2, 3, 4, 5].map((id) => saves[id] || null);
      },
    }),
    {
      name: 'galgame-settings',
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);
