import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/stories': path.resolve(__dirname, './stories'),
      '@stories': path.resolve(__dirname, './stories'),
      '@/core': path.resolve(__dirname, '../packages/core'),
      '@core': path.resolve(__dirname, '../packages/core'),
      '@/add-ons': path.resolve(__dirname, '../packages/add-ons'),
      '@add-ons': path.resolve(__dirname, '../packages/add-ons'),
      '@/themes': path.resolve(__dirname, '../packages/themes'),
      '@themes': path.resolve(__dirname, '../packages/themes'),
    },
  },
  plugins: [
    vue(), 
    vueJsx(),
    tailwindcss(),
  ],
});
