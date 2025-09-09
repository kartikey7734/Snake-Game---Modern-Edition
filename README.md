# Snake Game - Modern Edition

A modern, web-based implementation of the classic Nokia Snake game, built with React, TypeScript, and TailwindCSS. This project features not only the core game but also includes theme switching, audio controls, high score tracking, and a unique, gamified "Code Academy" to explain its own architecture.

## ✨ Features

- **Classic Gameplay**: Enjoy the timeless fun of Snake with a smooth, responsive experience.
- **Modern UI/UX**: Clean, intuitive interface with both **Light** and **Dark** themes.
- **Dynamic Audio**: All music and sound effects are generated programmatically using the Web Audio API—no audio files needed!
- **Volume Controls**: Fine-tune the music and sound effect volumes to your liking.
- **High Score Tracking**: The game saves your personal best score locally in your browser.
- **Code Academy**: An interactive tab that breaks down the technologies and patterns used to build this game, designed to be educational for aspiring developers.
- **Responsive Design**: Playable on both desktop and mobile devices (though primarily designed for keyboard input).
- **Keyboard Controls**: Use **Arrow Keys** or **WASD** to control the snake's direction. Use **Spacebar** or **Enter** to start, pause, and resume.

## 🚀 Tech Stack

- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [React](https://reactjs.org/) (using Hooks and Context API)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Game Rendering**: [HTML Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for high-performance 2D drawing.
- **Audio**: [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) for procedural sound generation.
- **Module Loading**: ES Modules with `importmap` for a build-less development setup.

## 📁 Project Structure

The project is organized into a modular structure to separate concerns:

```
.
├── components/          # Reusable React components
│   ├── Board.tsx        # Main game board canvas and overlays
│   ├── GameControls.tsx # Settings view component
│   ├── GameOverModal.tsx# Code Academy view component
│   ├── GameStatusOverlay.tsx # High Scores view component
│   └── PhoneControls.tsx  # Generic UI elements (Button, Card, Switch, etc.)
├── hooks/               # Custom React Hooks
│   └── useGameLogic.ts  # Core game state logic, snake movement, and audio generation
├── App.tsx              # Main application component, layout, and global context
├── constants.ts         # Game constants (grid size, tick rate, etc.) and static data
├── index.html           # The single HTML entry point
├── index.tsx            # React application root
├── metadata.json        # Application metadata
└── types.ts             # TypeScript type definitions
```

## 🎮 How to Play

1.  **Open the `index.html` file** in a modern web browser.
2.  **Start Game**: Press the `START` button or the `Spacebar`/`Enter` key.
3.  **Control the Snake**:
    -   Use the **Arrow Keys** (`↑`, `↓`, `←`, `→`).
    -   Or use the **WASD** keys (`W`, `A`, `S`, `D`).
4.  **Objective**:
    -   Eat the red food squares to grow longer and increase your score.
    -   Avoid colliding with the snake's own body.
    -   The game ends if you collide with yourself.
5.  **Pause/Resume**: Press the `PAUSE`/`RESUME` button or the `Spacebar`/`Escape` key during the game.
6.  **Restart**: Press the `RESTART` button at any time to start a new game.

## 🎓 Code Academy

The "CODE" tab offers a unique look under the hood. It's structured as a series of completed "lessons," where each lesson explains a different aspect of the game's architecture, from the frontend stack to the core game logic and rendering engine. This serves as a living document and an educational resource for anyone interested in web development and game design.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Kq5b8dbe5JNBik8l99Yn7X0-D5Er6EFR

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
