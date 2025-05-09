import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/stories': path.resolve(__dirname, './stories'),
      '@stories': path.resolve(__dirname, './stories'),
      '@rui': path.resolve(__dirname, '../packages'),
      '@rui/core': path.resolve(__dirname, '../packages/core'),
      '@rui/add-ons': path.resolve(__dirname, '../packages/add-ons'),
    },
  },
  plugins: [vue(), vueJsx(), tailwindcss()],
})
