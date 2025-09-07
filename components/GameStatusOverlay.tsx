import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Card } from './PhoneControls';

const ScoresView = () => {
  const { highScore } = useContext(AppContext);
  return (
    <div className="p-4 md:p-8 animate-fadeIn">
      <Card>
        <div className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4 text-yellow-400">
                <i data-lucide="trophy" className="w-8 h-8"></i>
                <h2 className="text-xl font-semibold">HIGH SCORES</h2>
            </div>
            <p className="text-7xl font-bold text-light-text dark:text-dark-text my-4">
                {highScore.toString().padStart(4, '0')}
            </p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">PERSONAL BEST</p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-4">Keep playing to beat your high score!</p>
        </div>
      </Card>
    </div>
  );
};

export default ScoresView;
