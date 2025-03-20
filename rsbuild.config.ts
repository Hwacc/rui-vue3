import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSvg } from 'rsbuild-plugin-svg';

export default defineConfig({
  source: {
    entry: {
      index: './examples/index.ts',
    },
  },
  output: {},
  resolve: {
    alias: {
      '@': './src',
    },
  },
  plugins: [
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
});
