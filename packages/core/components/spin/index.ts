import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as Spin } from './Spin.vue'
export { SpinProvider } from './SpinProvider'

export const prefix = `${PREFIX}-spin`

export const tvSpin = tv({
  slots: {
    root: 'absolute inset-0',
    mask: ['absolute', 'top-0', 'left-0', 'size-full'],
    indicator: [
      'absolute',
      'top-1/2',
      'left-1/2',
      'transform',
      'translate-x-[-50%]',
      'translate-y-[-50%]',
      'flex',
      'items-center',
      'justify-center',
      'gap-2',
    ],
    icon: [
      'inline-block',
      'size-6',
    ],
    text: [
      'text-xs',
    ],
  },
  variants: {
    mode: { fullscreen: '' },
    size: {
      sm: '',
      base: '',
      lg: '',
    },
  },
  compoundVariants: [{
    mode: 'fullscreen',
    class: {
      root: [
        'fixed',
        'top-0',
        'left-0',
        'w-screen',
        'h-screen',
        'z-(--z-loading)',
      ],
    },
  }, {
    size: 'sm',
    class: {
      icon: 'size-6',
      text: 'text-xs',
    },
  }, {
    size: 'base',
    class: {
      icon: 'size-8',
      text: 'text-sm',
    },
  }, {
    size: 'lg',
    class: {
      icon: 'size-10',
      text: 'text-base',
    },
  }],
}, {
  slots: {
    root: prefix,
    mask: `${prefix}-mask`,
    indicator: `${prefix}-indicator`,
    icon: `${prefix}-icon`,
    text: `${prefix}-text`,
  },
})

export type SpinVariants = VariantProps<typeof tvSpin>
