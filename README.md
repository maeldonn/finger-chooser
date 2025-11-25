<div align="center">
  <img src="public/icon.svg" alt="Finger Chooser logo" width="240" />
</div>

# Finger Chooser

Finger Chooser is a playful multi-touch selector built with Nuxt 4. Drop several fingers on the same screen, watch a neon countdown, and let the app randomly highlight a single winner. It ships as a Progressive Web App so it can be installed and used offline on phones and tablets.

## Features

- **Touch-first gameplay** - tracks every finger via Pointer Events, enforces a minimum of two players, and resets automatically after each round.
- **Dynamic visuals** - animated neon rings, countdown flare, and per-finger color palette keep the experience readable in the dark theme.
- **Smart landing flow** - desktop visitors see a QR code pointing to the current URL plus a “force start” option for touchscreen laptops.
- **Installable PWA** - powered by `@vite-pwa/nuxt` with auto-updating service worker, manifest, and reusable icons (`public/icon.png`, `pwa-192x192.png`, `pwa-512x512.png`, `favicon.ico`).
- **Nuxt + Tailwind stack** - Vue 3 components, script setup, and Tailwind utility styles for rapid iteration.

## Getting started

Prerequisites:

- Node.js 18+ (Nuxt 4 requirement)
- npm (or another package manager, e.g., pnpm/bun/yarn if you prefer)

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

## Progressive Web App notes

- All icons come from `public/icon.png`. If you replace that source image, regenerate `pwa-192x192.png`, `pwa-512x512.png`, and `favicon.ico` (ImageMagick's `magick convert` works well).
- Metadata such as the app name, description, and colors are defined in `nuxt.config.ts` under the `pwa` block and mirrored in `public/manifest.json`.
- A client-side plugin (`app/plugins/pwa.client.ts`) registers the service worker and logs registration details while you're developing.

## Touch testing tips

- Use a real multi-touch device for the authentic experience.
- Desktop browsers can emulate touches via DevTools, but timing/accuracy will be limited.
- While fewer than two fingers are detected, the UI prompts users to add more before the countdown starts.

Happy finger choosing! 🎉
