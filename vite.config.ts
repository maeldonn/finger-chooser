import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/finger-chooser/',
  plugins: [vue()],
  resolve: {
    alias: {
      '~/': path.resolve(__dirname, 'src') + '/',
      '@/': path.resolve(__dirname, 'src') + '/',
    },
  },
}));
