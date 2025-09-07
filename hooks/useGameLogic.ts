import React, { useState, useEffect, useCallback, useReducer, useRef, useContext } from 'react';
import { Coords, Direction, GameState, GameStatus } from '../types';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_TICK_RATE, LEVEL_UP_SCORE, MIN_TICK_RATE, TICK_RATE_DECREMENT } from '../constants';
import { AppContext } from '../App';

// --- AUDIO HOOK ---
export const useAudio = (settings) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const soundGainRef = useRef<GainNode | null>(null);
  const musicIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext && !audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
        
        musicGainRef.current = audioCtxRef.current.createGain();
        musicGainRef.current.connect(audioCtxRef.current.destination);
        
        soundGainRef.current = audioCtxRef.current.createGain();
        soundGainRef.current.connect(audioCtxRef.current.destination);
    }
  }, []);

  useEffect(() => {
    if (musicGainRef.current) {
      musicGainRef.current.gain.setValueAtTime(settings.music.enabled ? settings.music.volume : 0, audioCtxRef.current?.currentTime ?? 0);
    }
  }, [settings.music.enabled, settings.music.volume]);

  useEffect(() => {
    if (soundGainRef.current) {
      soundGainRef.current.gain.setValueAtTime(settings.sounds.enabled ? settings.sounds.volume : 0, audioCtxRef.current?.currentTime ?? 0);
    }
  }, [settings.sounds.enabled, settings.sounds.volume]);

  const playMusic = useCallback(() => {
    if (!audioCtxRef.current || musicIntervalRef.current || !settings.music.enabled) return;
    const ctx = audioCtxRef.current;
    
    let C4 = 261.63, D4 = 293.66, E4 = 329.63, G4 = 392.00;
    const sequence = [G4, E4, D4, C4, D4, E4, G4, E4];
    let step = 0;

    const playNote = () => {
        if (!musicGainRef.current || !ctx || !settings.music.enabled) return;
        const oscillator = ctx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(sequence[step % sequence.length], ctx.currentTime);
        oscillator.connect(musicGainRef.current);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        step++;
    };
    
    musicIntervalRef.current = setInterval(playNote, 200);
  }, [settings.music.enabled]);

  const stopMusic = useCallback(() => {
    if (musicIntervalRef.current) {
        clearInterval(musicIntervalRef.current);
        musicIntervalRef.current = null;
    }
  }, []);

  const playSound = useCallback((type: 'eat' | 'gameOver' | 'test') => {
    if (!soundGainRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    gainNode.connect(soundGainRef.current);

    switch (type) {
      case 'eat':
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        gainNode.gain.setValueAtTime(1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
        break;
      case 'gameOver':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(164.81, ctx.currentTime); // E3
        gainNode.gain.setValueAtTime(1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        break;
      case 'test':
         oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4
        gainNode.gain.setValueAtTime(1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
        break;
    }
    oscillator.connect(gainNode);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.5);
  }, [settings.sounds.enabled, settings.sounds.volume]);
  
  return { playMusic, stopMusic, playSound };
};

// --- GAME LOGIC HOOK ---

const getRandomCoord = (snake: Coords[]): Coords => {
    let pos: Coords;
    do {
        pos = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    return pos;
};

const initialState: GameState = {
    status: GameStatus.IDLE,
    snake: INITIAL_SNAKE,
    food: getRandomCoord(INITIAL_SNAKE),
    direction: Direction.UP,
    score: 0,
    level: 1,
    time: 0,
};

function gameReducer(state: GameState, action: any): GameState {
    switch(action.type) {
        case 'START_GAME':
            const freshState = {
                ...initialState,
                food: getRandomCoord(INITIAL_SNAKE)
            };
            return {
                ...freshState,
                status: GameStatus.PLAYING,
            };
        case 'PAUSE_GAME':
            return { ...state, status: GameStatus.PAUSED };
        case 'RESUME_GAME':
            return { ...state, status: GameStatus.PLAYING };
        case 'GAME_OVER':
            return { ...state, status: GameStatus.GAME_OVER };
        case 'CHANGE_DIRECTION':
            // Prevent snake from reversing
            const isOpposite = (dir1: Direction, dir2: Direction) => {
                if (dir1 === Direction.UP && dir2 === Direction.DOWN) return true;
                if (dir1 === Direction.DOWN && dir2 === Direction.UP) return true;
                if (dir1 === Direction.LEFT && dir2 === Direction.RIGHT) return true;
                if (dir1 === Direction.RIGHT && dir2 === Direction.LEFT) return true;
                return false;
            };
            if(isOpposite(state.direction, action.payload)) return state;
            return { ...state, direction: action.payload };
        case 'MOVE_SNAKE':
            const newSnake = [...state.snake];
            const head = { ...newSnake[0] };

            switch (state.direction) {
                case Direction.UP: head.y -= 1; break;
                case Direction.DOWN: head.y += 1; break;
                case Direction.LEFT: head.x -= 1; break;
                case Direction.RIGHT: head.x += 1; break;
            }

            // Wall wrapping
            if (head.x < 0) head.x = GRID_SIZE - 1;
            if (head.x >= GRID_SIZE) head.x = 0;
            if (head.y < 0) head.y = GRID_SIZE - 1;
            if (head.y >= GRID_SIZE) head.y = 0;

            // Self collision check
            for (let i = 1; i < newSnake.length; i++) {
                if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                    return { ...state, status: GameStatus.GAME_OVER };
                }
            }

            newSnake.unshift(head);

            // Food check
            let newScore = state.score;
            let newLevel = state.level;
            let newFood = state.food;
            if (head.x === state.food.x && head.y === state.food.y) {
                newScore += 1;
                newFood = getRandomCoord(newSnake);
                if (newScore > 0 && newScore % LEVEL_UP_SCORE === 0) {
                    newLevel += 1;
                }
            } else {
                newSnake.pop();
            }

            return { ...state, snake: newSnake, food: newFood, score: newScore, level: newLevel };
        case 'TICK_TIME':
            return { ...state, time: state.time + 1 };
        default:
            return state;
    }
}

export const useSnakeGame = (onGameOver: (score: number) => void) => {
    const { settings, setGameStats } = useContext(AppContext);
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const { status, level, score } = state;
    const { playSound, playMusic, stopMusic } = useAudio(settings);
    const prevScoreRef = useRef(score);
    
    useEffect(() => {
        setGameStats({ score: state.score, time: state.time, level: state.level });
    }, [state.score, state.time, state.level, setGameStats]);

    useEffect(() => {
      if (score > prevScoreRef.current) {
        playSound('eat');
      }
      prevScoreRef.current = score;
    }, [score, playSound]);

    const tickRate = Math.max(MIN_TICK_RATE, INITIAL_TICK_RATE - (level - 1) * TICK_RATE_DECREMENT);
    
    const startGame = () => dispatch({ type: 'START_GAME' });
    const pauseGame = () => dispatch({ type: 'PAUSE_GAME' });
    const resumeGame = () => dispatch({ type: 'RESUME_GAME' });
    const changeDirection = (dir: Direction) => dispatch({ type: 'CHANGE_DIRECTION', payload: dir });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (status === GameStatus.IDLE || status === GameStatus.GAME_OVER) {
                if(e.code === 'Space' || e.code === 'Enter') startGame();
                return;
            }
            if(status === GameStatus.PLAYING && (e.code === 'Space' || e.code === 'Escape')) {
                pauseGame();
                return;
            }
            if(status === GameStatus.PAUSED && (e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter')) {
                resumeGame();
                return;
            }

            let newDirection: Direction | null = null;
            switch(e.key) {
                case 'ArrowUp': case 'w': newDirection = Direction.UP; break;
                case 'ArrowDown': case 's': newDirection = Direction.DOWN; break;
                case 'ArrowLeft': case 'a': newDirection = Direction.LEFT; break;
                case 'ArrowRight': case 'd': newDirection = Direction.RIGHT; break;
            }
            if(newDirection !== null) {
                e.preventDefault();
                changeDirection(newDirection);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [status, startGame, pauseGame, resumeGame]);
    
    useEffect(() => {
        if (status !== GameStatus.PLAYING) {
            stopMusic();
            if(status === GameStatus.GAME_OVER) {
                playSound('gameOver');
                onGameOver(score);
            }
            return;
        }

        playMusic();
        
        const gameInterval = setInterval(() => {
            dispatch({ type: 'MOVE_SNAKE' });
        }, tickRate);

        const timerInterval = setInterval(() => {
            dispatch({ type: 'TICK_TIME' });
        }, 1000);

        return () => {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
        };
    }, [status, tickRate, playSound, playMusic, stopMusic, onGameOver, score]);

    return { state, startGame, pauseGame, resumeGame, changeDirection };
};