


declare global {
  interface Window {
    lucide: {
      createIcons: () => void;
    };
  }
}

import React, { useState, useEffect, createContext, useMemo, useContext, useCallback } from 'react';
import { TABS, STATS } from './constants';
import { Tab, Settings } from './types';
import { Icon } from './components/PhoneControls';

import GameView from './components/Board';
import SettingsView from './components/GameControls';
import CodeAcademyView from './components/GameOverModal';
import ScoresView from './components/GameStatusOverlay';

// --- GLOBAL APP CONTEXT ---
const defaultSettings: Settings = {
  theme: 'dark',
  music: { enabled: true, volume: 0.3 },
  sounds: { enabled: true, volume: 0.5 },
};

// Fix: Correctly type `setSettings` and `setGameStats` to support functional updates.
export const AppContext = createContext({
  settings: defaultSettings,
  setSettings: (value: React.SetStateAction<Settings>) => {},
  highScore: 0,
  setHighScore: (score: number) => {},
  gameStats: { score: 0, time: 0, level: 1 },
  setGameStats: (value: React.SetStateAction<{ score: number; time: number; level: number; }>) => {},
});

export const AppProvider = ({ children }) => {
  const [settings, setSettingsState] = useState<Settings>(() => {
    try {
      const saved = localStorage.getItem('snakeGameSettings');
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [highScore, setHighScoreState] = useState<number>(() => {
    return parseInt(localStorage.getItem('snakeHighScore') || '0', 10);
  });
  
  const [gameStats, setGameStats] = useState({ score: 0, time: 0, level: 1 });

  useEffect(() => {
    localStorage.setItem('snakeGameSettings', JSON.stringify(settings));
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    // Ensure icons are re-rendered on theme change
    setTimeout(() => window.lucide?.createIcons(), 0);
  }, [settings]);

  const setHighScore = useCallback((score: number) => {
    if (score > highScore) {
      setHighScoreState(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [highScore]);

  const contextValue = useMemo(() => ({
    settings,
    setSettings: setSettingsState,
    highScore,
    setHighScore,
    gameStats,
    setGameStats
  }), [settings, highScore, gameStats, setHighScore]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};


// --- LAYOUT COMPONENTS ---
const Header = () => (
    <header className="text-center py-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Icon name="git-branch" className="w-10 h-10 text-brand-green" />
          <h1 className="text-5xl font-bold tracking-wider text-light-text dark:text-dark-text">SNAKE GAME</h1>
        </div>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">Classic Nokia-style Snake with modern features</p>
    </header>
);

const StatsBar = () => {
  const { highScore, gameStats } = useContext(AppContext);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  const getStatValue = (id: string) => {
      switch(id) {
          case 'score': return gameStats.score.toString().padStart(4, '0');
          case 'high': return highScore.toString().padStart(4, '0');
          case 'time': return formatTime(gameStats.time);
          case 'level': return gameStats.level;
          default: return '0000';
      }
  }
  
  const colorStyles = {
    green: 'border-green-500/50 text-green-500 glow-border-green',
    yellow: 'border-yellow-500/50 text-yellow-500 glow-border-yellow',
    blue: 'border-blue-500/50 text-blue-500 glow-border-blue',
    purple: 'border-purple-500/50 text-purple-500 glow-border-purple',
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-8">
      {STATS.map(({id, label, icon, color}) => (
        <div key={id} className={`p-4 rounded-lg border-2 bg-light-surface dark:bg-dark-surface ${colorStyles[color]}`}>
          <div className="flex items-center justify-between text-sm font-semibold mb-2">
            <span>{label}</span>
             <Icon name={icon} className="w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-light-text dark:text-dark-text">{getStatValue(id)}</p>
        </div>
      ))}
    </div>
  )
};

const Nav = ({ activeTab, onTabClick }) => (
    <nav className="p-4 md:px-8">
      <div className="flex bg-light-surface dark:bg-dark-surface rounded-lg p-1 border border-light-border dark:border-dark-border">
          {TABS.map(({id, label, icon}) => (
              <button 
                key={id}
                onClick={() => onTabClick(id)}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-md text-sm font-semibold transition-colors ${activeTab === id ? 'bg-brand-green text-white' : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                  <Icon name={icon} className="w-4 h-4" />
                  <span>{label}</span>
              </button>
          ))}
      </div>
    </nav>
);

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('game');
    const { settings } = useContext(AppContext);

    useEffect(() => {
        // To re-render icons when view changes
        if (window.lucide) {
            // Use timeout to allow DOM to update before replacing icons
            setTimeout(() => window.lucide.createIcons(), 0);
        }
    }, [activeTab]);

    const renderView = () => {
        switch (activeTab) {
            case 'game': return <GameView />;
            case 'settings': return <SettingsView />;
            case 'code': return <CodeAcademyView />;
            case 'scores': return <ScoresView />;
            default: return <GameView />;
        }
    };

    return (
        <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Header />
            <StatsBar />
            <Nav activeTab={activeTab} onTabClick={setActiveTab} />
            <main>{renderView()}</main>
          </div>
        </div>
    );
};

export default App;