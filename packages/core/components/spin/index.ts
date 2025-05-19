import type { VariantProps } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export { default as Spin } from './Spin.vue'
export { SpinProvider } from './SpinProvider'

export const prefix = `${PREFIX}-spin`
export const spinVariants = cva(
  'relative size-full',
  {
    variants: {
      mode: {
        fullscreen: [
          'fixed',
          'top-0',
          'left-0',
          'w-screen',
          'h-screen',
          'z-[9999]',
        ],
      },
      size: {
        sm: '',
        base: '',
        lg: '',
      },
    },
  },
  {
    className: prefix,
  },
)
export type SpinVariantsProps = VariantProps<typeof spinVariants>

export const spinMaskVariants = cva(
  ['absolute', 'top-0', 'left-0', 'size-full'],
  undefined,
  {
    className: `${prefix}-mask`,
  },
)

export const spinIndicatorVariants = cva(
  [
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
  undefined,
  {
    className: `${prefix}-indicator`,
  },
)

export const spinIconVariants = cva(
  'inline-block',
  {
    variants: {
      size: {
        sm: 'size-6',
        base: 'size-8',
        lg: 'size-10',
      },
    },
  },
  {
    className: `${prefix}-icon`,
  },
)

export const spinTextVariants = cva(
  '',
  {
    variants: {
      size: {
        sm: 'text-xs',
        base: 'text-sm',
        lg: 'text-base',
      },
    },
  },
  {
    className: `${prefix}-text`,
  },
)
