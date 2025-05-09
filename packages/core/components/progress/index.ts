import type { VariantProps } from 'class-variance-authority'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export { default as CircleProgress } from './CircleProgress.vue'
export { default as Progress } from './Progress.vue'

const prefix = `${PREFIX}-progress`
export const progressVariants = cva(
  ['relative', 'h-1.5', 'w-full', 'overflow-hidden', 'rounded-full'],
  undefined,
  { className: prefix },
)

export const progressIndicatorVariants = cva(
  ['h-full', 'w-full', 'flex-1', 'rounded-full', 'transition-all'],
  {
    variants: {
      variant: {
        default: '',
        robbin: '',
        transfer: '',
      },
    },
  },
  { className: `${prefix}-indicator` },
)
export type ProgressIndicatorVariants = VariantProps<typeof progressIndicatorVariants>

export const circleProgressVariants = cva(
  ['size-12.5'],
  {
    variants: { type: { arc: '', circle: '' } },
  },
  { className: `${PREFIX}-circle-progress` },
)
export type CircleProgressVariants = VariantProps<typeof circleProgressVariants>

export const circleProgressIndicatorVariants = cva(
  ['size-full'],
  {
    variants: { variant: { default: '', transfer: '' } },
  },
  { className: `${PREFIX}-circle-progress-indicator` },
)
export type CircleProgressIndicatorVariants = VariantProps<typeof circleProgressIndicatorVariants>
