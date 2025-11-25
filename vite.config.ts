import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
