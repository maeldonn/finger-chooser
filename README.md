<div align="center">
  <img src="src/assets/icon/icon.svg" alt="Finger Chooser logo" width="240" />
</div>

# Finger Chooser

Finger Chooser is a playful multi-touch selector built with Vue 3, Vite, and Tailwind CSS. Drop several fingers on the same screen, watch a neon countdown, and let the app randomly highlight a single winner.

## Features

- **Touch-first gameplay** – tracks every finger via Pointer Events, enforces a minimum of two players, and resets automatically after each round.
- **Dynamic visuals** – animated neon rings, countdown flare, and per-finger color palette keep the experience readable in the dark theme.
- **Smart landing flow** – desktop visitors see a QR code pointing to the current URL plus a “force start” option for touchscreen laptops.
- **Vue + Vite stack** – lightweight tooling with instant HMR, TypeScript support, and Tailwind utilities.

## Getting started

Prerequisites:

- Node.js 18+
- npm (or any compatible package manager)

Install dependencies:

```bash
npm install
```

Run the dev server (http://localhost:3000 by default):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Type-check the project:

```bash
npm run typecheck
```

## Touch testing tips

- Use a real multi-touch device for the authentic experience.
- Desktop browsers can emulate touches via DevTools, but timing/accuracy will be limited.
- While fewer than two fingers are detected, the UI prompts users to add more before the countdown starts.

Happy finger choosing! 🎉
