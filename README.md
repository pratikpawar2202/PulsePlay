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

**Sprint 01 — GP-001: Project Bootstrap**

This sprint establishes the project skeleton, the Screen Manager, the
shared component library, and the Splash screen.

- ✅ Screen Manager (register / show / hide / transition) — fully implemented
- ✅ Splash screen with auto-transition
- ✅ Adventure & Reward screens — wired up as real, navigable destinations
- 🚧 State Manager — placeholder, scoped for a future sprint
- 🚧 Animation Manager — placeholder, scoped for a future sprint
- 🚧 Storage Manager — placeholder, scoped for a future sprint

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
│   ├── assets/                # Static assets (images, icons, etc.)
│   │
│   ├── components/             # Small, reusable UI building blocks
│   │   ├── Button.js
│   │   ├── Counter.js
│   │   ├── LoadingDots.js
│   │   └── Pogo.js
│   │
│   ├── managers/                # Application-level systems
│   │   ├── BaseScreen.js        # Contract every screen implements
│   │   ├── ScreenManager.js     # Implemented this sprint
│   │   ├── StateManager.js      # Placeholder
│   │   ├── AnimationManager.js  # Placeholder
│   │   └── StorageManager.js    # Placeholder
│   │
│   ├── screens/                 # Full-screen views
│   │   ├── SplashScreen.js
│   │   ├── AdventureScreen.js
│   │   └── RewardScreen.js
│   │
│   ├── styles/
│   │   ├── reset.css
│   │   ├── variables.css        # Design tokens
│   │   ├── animations.css
│   │   ├── components.css
│   │   └── app.css
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
