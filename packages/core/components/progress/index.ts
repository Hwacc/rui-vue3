import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as CircleProgress } from './CircleProgress.vue'
export { default as Progress } from './Progress.vue'

const prefix = `${PREFIX}-progress`

export const tvProgress = tv({
  base: ['relative', 'h-1.5', 'w-full', 'overflow-hidden', 'rounded-full'],
  slots: {
    indicator: ['h-full', 'w-full', 'flex-1', 'rounded-full', 'transition-all'],
  },
  variants: {
    variant: {
      default: '',
      robbin: '',
      transfer: '',
    },
  },
}, {
  class: prefix,
  slots: {
    indicator: `${prefix}-indicator`,
  },
})
export type ProgressIndicatorVariants = VariantProps<typeof tvProgress>

export const tvCircleProgress = tv({
  base: ['size-12.5'],
  slots: {
    indicator: ['size-full'],
  },
  variants: {
    type: {
      arc: '',
      circle: '',
    },
    variant: {
      default: '',
      transfer: '',
    },
  },
}, {
  class: `${PREFIX}-circle-progress`,
  slots: {
    indicator: `${PREFIX}-circle-progress-indicator`,
  },
})
export type CircleProgressVariants = VariantProps<typeof tvCircleProgress>
