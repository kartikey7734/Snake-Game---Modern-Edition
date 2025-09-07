import { Coords, CodeLesson } from './types';

export const GRID_SIZE = 20;
export const INITIAL_TICK_RATE = 200; // ms
export const MIN_TICK_RATE = 60;
export const TICK_RATE_DECREMENT = 5; // ms to subtract per level up
export const LEVEL_UP_SCORE = 5;

export const INITIAL_SNAKE: Coords[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

export const STATS = [
  { id: 'score', label: 'SCORE', icon: 'award', color: 'green' },
  { id: 'high', label: 'HIGH', icon: 'trophy', color: 'yellow' },
  { id: 'time', label: 'TIME', icon: 'timer', color: 'blue' },
  { id: 'level', label: 'LEVEL', icon: 'bar-chart-2', color: 'purple' },
];

export const TABS = [
  { id: 'game', label: 'GAME', icon: 'gamepad-2' },
  { id: 'settings', label: 'SETTINGS', icon: 'sliders-horizontal' },
  { id: 'code', label: 'CODE', icon: 'code' },
  { id: 'scores', label: 'SCORES', icon: 'star' },
];

export const CODE_LESSONS: CodeLesson[] = [
  {
    id: '1',
    title: 'The Foundation: Tech Stack',
    xp: 50,
    completed: true,
    summary: 'Understanding the core technologies and libraries that power this game.',
    details: [
      { category: 'Language', name: 'TypeScript', description: 'A superset of JavaScript that adds static typing, helping to catch errors early and improve code quality.' },
      { category: 'Framework', name: 'React', description: 'A JavaScript library for building user interfaces with a component-based architecture. Used to create everything you see on screen.' },
      { category: 'Library', name: 'TailwindCSS', description: 'A utility-first CSS framework for rapid UI development. Used for all styling, from layout to colors.' },
      { category: 'Library', name: 'Lucide Icons', description: 'A clean and consistent open-source icon set. Used for all the icons in the UI.' },
      { category: 'File', name: 'index.html', description: 'The single HTML entry point that loads all scripts, styles, and fonts.' },
    ],
  },
  {
    id: '2',
    title: 'Game Logic: The Engine Room',
    xp: 75,
    completed: true,
    summary: 'Diving into the core logic that controls the snake\'s movement, growth, and game state.',
    details: [
      { category: 'File', name: 'hooks/useGameLogic.ts', description: 'The heart of the game. This custom hook encapsulates all game-related state and logic.' },
      { category: 'Hook', name: 'useReducer', description: 'Manages complex state transitions for the game (e.g., starting, pausing, moving). It provides a predictable way to update state.' },
      { category: 'Pattern', name: 'State Reducer', description: 'The `gameReducer` function is a pure function that takes the current state and an action, and returns the new state, ensuring predictable behavior.' },
      { category: 'File', name: 'constants.ts', description: 'Stores all the magic numbers and initial configurations, like GRID_SIZE and INITIAL_SNAKE position, making the game easy to tweak.' },
    ],
  },
  {
    id: '3',
    title: 'Rendering: Bringing the Game to Life',
    xp: 75,
    completed: true,
    summary: 'How the snake, food, and grid are drawn on the screen efficiently.',
    details: [
      { category: 'File', name: 'components/Board.tsx', description: 'This component is responsible for rendering the main game area.' },
      { category: 'API', name: 'HTML Canvas API', description: 'Used for high-performance 2D drawing. The game board, snake, and food are all drawn on a `<canvas>` element.' },
      { category: 'Hook', name: 'useEffect', description: 'Triggers a re-draw of the canvas whenever the `snake` or `food` state changes, ensuring the visuals always match the game state.' },
      { category: 'Hook', name: 'useRef', description: 'Holds a reference to the canvas element so we can access its 2D drawing context directly.' },
    ],
  },
  {
    id: '4',
    title: 'Sound & Controls: Interaction',
    xp: 100,
    completed: true,
    summary: 'Exploring how user input is captured and how sound effects are generated.',
    details: [
      { category: 'API', name: 'Web Audio API', description: 'Generates all music and sound effects programmatically in the browser, without needing any audio files. Provides precise control over sound.' },
      { category: 'Hook', name: 'useEffect', description: 'An effect hook in `useSnakeGame` sets up and cleans up a `keydown` event listener to capture keyboard input for controlling the snake.' },
      { category: 'Pattern', name: 'Global Context', description: 'The `AppContext` in `App.tsx` provides the audio settings (volume, enabled/disabled) to the `useAudio` hook, decoupling settings from the game logic.' },
      { category: 'File', name: 'components/GameControls.tsx', description: 'The UI for changing settings like theme and audio, which are then passed down via Context.' },
    ],
  },
];