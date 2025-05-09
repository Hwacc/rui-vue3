import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/stories': path.resolve(__dirname, './stories'),
      '@stories': path.resolve(__dirname, './stories'),
      '@rui': path.resolve(__dirname, '../packages'),
      '@rui/core': path.resolve(__dirname, '../packages/core'),
      '@rui/add-ons': path.resolve(__dirname, '../packages/add-ons'),
    }
  },
  plugins: [vue(), vueJsx(), tailwindcss()]
})
