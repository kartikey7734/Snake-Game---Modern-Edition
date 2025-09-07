import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Card, Switch, Slider } from './PhoneControls';
import { useAudio } from '../hooks/useGameLogic';


const SettingsView = () => {
  const { settings, setSettings } = useContext(AppContext);
  const { playSound } = useAudio(settings);

  const handleThemeChange = (enabled: boolean) => {
    setSettings(s => ({ ...s, theme: enabled ? 'dark' : 'light' }));
  };

  const handleMusicToggle = (enabled: boolean) => {
    setSettings(s => ({ ...s, music: { ...s.music, enabled } }));
  };
  
  const handleMusicVolumeChange = (volume: number) => {
    setSettings(s => ({ ...s, music: { ...s.music, volume } }));
  };
  
  const handleSoundsToggle = (enabled: boolean) => {
    setSettings(s => ({ ...s, sounds: { ...s.sounds, enabled } }));
  };
  
  const handleSoundsVolumeChange = (volume: number) => {
    setSettings(s => ({ ...s, sounds: { ...s.sounds, volume } }));
  };

  return (
    <div className="p-4 md:p-8 animate-fadeIn">
      <Card>
        <div className="p-6">
          <h2 className="flex items-center text-xl font-semibold text-light-text dark:text-dark-text mb-6">
            <i data-lucide="sliders-horizontal" className="mr-3"></i> SETTINGS
          </h2>

          <div className="space-y-6">
            {/* Display Settings */}
            <div>
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">Display</h3>
              <div className="flex items-center justify-between">
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Theme</span>
                <div className="flex items-center gap-4">
                  <span>Light</span>
                  <Switch
                    checked={settings.theme === 'dark'}
                    onCheckedChange={handleThemeChange}
                  />
                  <span>Dark</span>
                </div>
              </div>
            </div>

            {/* Audio Settings */}
            <div>
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">Audio</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Music</span>
                    <Switch
                        checked={settings.music.enabled}
                        onCheckedChange={handleMusicToggle}
                    />
                </div>
                <Slider 
                    value={settings.music.volume}
                    onValueChange={handleMusicVolumeChange}
                    min={0} max={1} step={0.01} 
                    disabled={!settings.music.enabled}
                />
                 <div className="flex items-center justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Sounds</span>
                    <Switch
                        checked={settings.sounds.enabled}
                        onCheckedChange={handleSoundsToggle}
                    />
                </div>
                <Slider 
                    value={settings.sounds.volume}
                    onValueChange={handleSoundsVolumeChange}
                    min={0} max={1} step={0.01} 
                    disabled={!settings.sounds.enabled}
                />
              </div>
            </div>
             <button
                onClick={() => playSound('test')}
                className="w-full mt-4 px-4 py-2 bg-brand-green text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={!settings.sounds.enabled}
             >
                TEST SOUND
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsView;