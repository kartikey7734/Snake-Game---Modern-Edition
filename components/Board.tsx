import React, { useRef, useEffect, useContext } from 'react';
import { GameStatus } from '../types';
import { useSnakeGame } from '../hooks/useGameLogic';
import { GRID_SIZE } from '../constants';
import { Button } from './PhoneControls';
import { AppContext } from '../App';

const Overlay = ({ title, body }: { title: string, body: string }) => (
  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center animate-fadeIn">
      <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-300">{body}</p>
  </div>
);

const GameView = () => {
  const { setHighScore } = useContext(AppContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, startGame, pauseGame, resumeGame } = useSnakeGame(setHighScore);
  const { status, snake, food } = state;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    
    const cellSize = canvas.width / GRID_SIZE;
    
    // Clear canvas with a black background
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    context.strokeStyle = '#222222';
    context.lineWidth = 1;
    for (let i = 0; i < GRID_SIZE; i++) {
        context.beginPath();
        context.moveTo(i * cellSize, 0);
        context.lineTo(i * cellSize, canvas.height);
        context.stroke();
        context.beginPath();
        context.moveTo(0, i * cellSize);
        context.lineTo(canvas.width, i * cellSize);
        context.stroke();
    }

    // Draw snake
    context.fillStyle = '#28A745';
    snake.forEach(segment => {
      context.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    });

    // Draw food
    context.fillStyle = '#DC2626';
    context.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

  }, [snake, food, status]);

  const handleRestart = () => {
      startGame();
  }

  const handlePauseResume = () => {
    if (status === GameStatus.PLAYING) {
      pauseGame();
    } else if (status === GameStatus.PAUSED) {
      resumeGame();
    }
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 p-4 md:p-8 animate-fadeIn">
        <div className="relative w-full max-w-[500px] aspect-square">
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="bg-black rounded-lg border-2 border-gray-600"
            />
            {status === GameStatus.IDLE && <Overlay title="SNAKE GAME" body="Press START to begin" />}
            {status === GameStatus.PAUSED && <Overlay title="PAUSED" body="Press the button to resume" />}
            {status === GameStatus.GAME_OVER && <Overlay title="GAME OVER" body="Press RESTART to play again" />}
        </div>
        <div className="flex flex-col space-y-4">
            { (status === GameStatus.IDLE || status === GameStatus.GAME_OVER) ? (
                 <Button onClick={handleRestart} variant="primary" size="lg">START</Button>
            ) : (
                <Button onClick={handlePauseResume} variant="secondary" size="lg">
                    {status === GameStatus.PAUSED ? 'RESUME' : 'PAUSE'}
                </Button>
            )}
            <Button onClick={handleRestart} variant="danger" size="lg">RESTART</Button>
            <p className="text-center text-sm text-light-text-secondary dark:text-dark-text-secondary mt-4">Use ARROW KEYS or WASD to control the snake</p>
        </div>
    </div>
  );
};

export default GameView;