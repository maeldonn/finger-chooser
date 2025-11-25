// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "app",
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Finger Chooser Game",
      short_name: "Finger Chooser",
      description: "Finger Chooser Game",
      display: "standalone",
      theme_color: "#000000",
      background_color: "#000000",
      icons: [
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: true,
      globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
    },
  },
  app: {
    head: {
      title: "Finger Chooser",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
        },
        { name: "theme-color", content: "#000000" },
        { name: "description", content: "Finger Chooser Game" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
      link: [
        { rel: "manifest", href: "/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/pwa-192x192.png" },
      ],
    },
  },
});
