# PulsePlay

**Play. Eat. Repeat.**

Version: `v0.1.0-alpha`

PulsePlay is a mobile-first workplace gaming platform. This is not an HR
application — it's a casual mobile game that captures workplace insights
through gameplay.

This repository is the frontend prototype, built with Vite and vanilla
JavaScript (ES Modules). No frameworks, no UI libraries, no CSS utility
frameworks.

## Sprint status

**Sprint 01 — GP-001: Project Bootstrap** ✅

- Screen Manager (register / show / hide / transition)
- Splash screen with auto-transition
- Shared component library foundation

**Sprint 02 — GP-002: First Playable Experience** ✅

- Adventure screen replaced with the first playable loop: drag any
  food item onto Pogo to feed him
- Pointer-based drag & drop (`FoodItem`), works for mouse, touch, and pen
- Pogo reacts with a happy scale-and-bounce on a successful feed
- Peanut counter (`TopBar`) increases with a small "bump" animation
- Reward screen shows the peanuts just earned and returns to Splash
- `AudioManager` placeholder added — no sound yet, per scope
- 🚧 State Manager — still a placeholder, scoped for a future sprint
- 🚧 Animation Manager — still a placeholder, scoped for a future sprint
- 🚧 Storage Manager — still a placeholder, scoped for a future sprint

> Note: `GameSession` (`src/state/GameSession.js`) is a small,
> sprint-scoped data holder for peanuts/streak — not one of the four
> architectural managers. It exists only because `StateManager` is
> still a placeholder; its responsibilities should move into
> `StateManager` once that's implemented.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (defaults to `http://localhost:5173`).

### Other scripts

```bash
npm run build    # Production build to dist/
npm run preview  # Preview the production build locally
```

## Project structure

```
prototype/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── assets/                  # Static assets (images, icons, etc.)
│   │
│   ├── components/              # Small, reusable UI building blocks
│   │   ├── Button.js
│   │   ├── Counter.js
│   │   ├── FoodItem.js          # Draggable food piece (GP-002)
│   │   ├── LoadingDots.js
│   │   ├── Pogo.js
│   │   ├── SpeechBubble.js      # GP-002
│   │   └── TopBar.js            # Peanuts + streak display (GP-002)
│   │
│   ├── managers/                # Application-level systems
│   │   ├── AnimationManager.js  # Placeholder
│   │   ├── AudioManager.js      # Placeholder (GP-002)
│   │   ├── BaseScreen.js        # Contract every screen implements
│   │   ├── ScreenManager.js     # Implemented
│   │   ├── StateManager.js      # Placeholder
│   │   └── StorageManager.js    # Placeholder
│   │
│   ├── screens/                 # Full-screen views
│   │   ├── AdventureScreen.js   # First playable experience (GP-002)
│   │   ├── RewardScreen.js      # GP-002
│   │   └── SplashScreen.js
│   │
│   ├── state/
│   │   └── GameSession.js       # Sprint-scoped session data (GP-002)
│   │
│   ├── styles/
│   │   ├── animations.css
│   │   ├── app.css
│   │   ├── components.css
│   │   ├── reset.css
│   │   └── variables.css        # Design tokens
│   │
│   ├── App.js                   # Composition root
│   └── main.js                  # Vite entry point
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Architecture

```
App
├── Screen Manager     (implemented)
├── State Manager      (placeholder)
├── Animation Manager  (placeholder)
└── Storage Manager    (placeholder)
```

Screens extend `BaseScreen`, which defines `render()`, `onEnter()`,
`onExit()`, and `destroy()`. The `ScreenManager` registers screens by
name and handles showing, hiding, and crossfading between them.

## Design tokens

| Token | Value |
| --- | --- |
| `--color-primary` | `#6C5CE7` |
| `--color-secondary` | `#FFD166` |
| `--color-background` | `#FFF8F0` |
| `--color-surface` | `#FFFFFF` |
| `--color-text` | `#2D3436` |
| `--radius-base` | `24px` |

Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64` px.

## Coding standards

- ES Modules throughout
- No inline CSS or inline JavaScript
- No external UI frameworks (no Tailwind, no Bootstrap, no jQuery)
- Small, reusable, descriptively named functions and components
- Mobile-first, responsive layout
