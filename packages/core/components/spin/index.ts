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
  compoundSlots: [
    {
      slots: ['root'],
      mode: 'fullscreen',
      class: [
        'fixed',
        'top-0',
        'left-0',
        'w-screen',
        'h-screen',
        'z-(--z-max)',
      ],
    },
    {
      slots: ['icon'],
      size: 'sm',
      class: 'size-6',
    },
    {
      slots: ['icon'],
      size: 'base',
      class: 'size-8',
    },
    {
      slots: ['icon'],
      size: 'lg',
      class: 'size-10',
    },
    {
      slots: ['text'],
      size: 'sm',
      class: 'text-xs',
    },
    {
      slots: ['text'],
      size: 'base',
      class: 'text-sm',
    },
    {
      slots: ['text'],
      size: 'lg',
      class: 'text-base',
    },
  ],
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
