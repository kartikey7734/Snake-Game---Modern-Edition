export interface Coords {
  x: number;
  y: number;
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export enum GameStatus {
  IDLE,
  PLAYING,
  PAUSED,
  GAME_OVER,
}

export type Theme = 'light' | 'dark';

export type Tab = 'game' | 'settings' | 'code' | 'scores';

export interface Settings {
  theme: Theme;
  music: {
    enabled: boolean;
    volume: number;
  };
  sounds: {
    enabled: boolean;
    volume: number;
  };
}

export interface CodeDetail {
  category: 'Language' | 'Library' | 'Framework' | 'API' | 'Hook' | 'Pattern' | 'File';
  name: string;
  description: string;
}

export interface CodeLesson {
  id: string;
  title: string;
  xp: number;
  completed: boolean;
  summary: string;
  details: CodeDetail[];
}

export interface GameState {
  status: GameStatus;
  snake: Coords[];
  food: Coords;
  direction: Direction;
  score: number;
  level: number;
  time: number;
}