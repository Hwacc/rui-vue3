import type { Config } from 'tailwindcss'

export default {
  content: ['../../packages/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        normal: 10,
        absolute: 50,
        fixed: 100,
        overlay: 9999,
        modal: 10000,
        tooltip: 100000,
        max: 2147483647,
      },
    },
  },
} satisfies Config
