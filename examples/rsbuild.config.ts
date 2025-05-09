import { defineConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import { pluginSvg } from 'rsbuild-plugin-svg'

export default defineConfig({
  source: {
    entry: {
      index: './index.ts',
    },
  },
  output: {
    sourceMap: {
      js: 'source-map',
      css: true,
    },
  },
  resolve: {
    alias: {
      '@rui': '../packages',
      '@rui/core': '../packages/core',
      '@rui/themes': '../packages/themes',
      '@rui/add-ons': '../packages/add-ons',
    },
  },
  plugins: [
    pluginSass(),
    pluginSvg({
      defaultImport: 'url',
    }),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      exclude: ['node_modules/**/*'],
    }),
    pluginVueJsx(),
    pluginVue({
      vueLoaderOptions: {
        compilerOptions: {},
      },
    }),
  ],
  server: {
    port: 4398,
  },
})
