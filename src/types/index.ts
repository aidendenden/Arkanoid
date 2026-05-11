export type CharacterId = 'yukino' | 'mai' | 'rin';

export type CharacterEmotion = 
  | 'neutral' 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'surprised' 
  | 'embarrassed' 
  | 'love' 
  | 'thinking';

export type CharacterPosition = 'left' | 'center' | 'right';

export interface Choice {
  id: string;
  text: string;
  nextScene: string;
  flag?: string;
  condition?: (flags: Record<string, boolean>) => boolean;
}

export interface Dialogue {
  id: string;
  scene: string;
  speaker: string | null;
  text: string;
  emotion?: CharacterEmotion;
  character?: CharacterId;
  position?: CharacterPosition;
  background?: string;
  bgm?: string;
  choices?: Choice[];
  next?: string;
  onEnter?: () => void;
}

export interface Scene {
  id: string;
  name: string;
  dialogues: Dialogue[];
}

export interface GameSettings {
  textSpeed: number;
  autoPlaySpeed: number;
  masterVolume: number;
  bgmVolume: number;
  seVolume: number;
}

export interface SaveData {
  id: number;
  timestamp: number;
  playtime: number;
  sceneId: string;
  dialogueIndex: number;
  flags: Record<string, boolean>;
  choices: Choice[];
}

export interface GameState {
  currentSceneId: string;
  dialogueIndex: number;
  history: { sceneId: string; dialogueIndex: number }[];
  characterEmotions: Record<CharacterId, CharacterEmotion>;
  flags: Record<string, boolean>;
  choices: Choice[];
  settings: GameSettings;
  isAutoPlaying: boolean;
  isSkipping: boolean;
  isTextComplete: boolean;
  playtime: number;
  startedAt: number;
}

export interface Character {
  id: CharacterId;
  name: string;
  color: string;
}

export const CHARACTERS: Record<CharacterId, Character> = {
  yukino: {
    id: 'yukino',
    name: '宫泽雪乃',
    color: '#FF69B4',
  },
  mai: {
    id: 'mai',
    name: '三浦麻衣',
    color: '#FFB347',
  },
  rin: {
    id: 'rin',
    name: '桐山凛',
    color: '#9370DB',
  },
};

export const BACKGROUNDS = {
  school_gate: '樱花盛开的校门口',
  classroom: '一年教室',
  gym: '体育馆',
  library: '图书馆',
  rooftop: '天台',
  park: '公园',
  beach: '海边',
  home: '家中',
  street: '街道',
  cafe: '咖啡厅',
} as const;
