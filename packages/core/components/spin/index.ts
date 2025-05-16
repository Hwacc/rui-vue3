import type { VariantProps } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export { default as Spin } from './Spin.vue'
export { injectSpinContext, SpinProvider } from './SpinProvider'

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
export type SpinVariants = VariantProps<typeof spinVariants>

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
  ],
  undefined,
  {
    className: `${prefix}-indicator`,
  },
)

export const spinIconVariants = cva(
  'animate-spin inline-block',
  {
    variants: {
      size: {
        sm: '',
        base: '',
        lg: '',
      },
      mode: {
        default: '',
        fullscreen: '',
      },
    },
  },
  {
    className: prefix,
  },
)
