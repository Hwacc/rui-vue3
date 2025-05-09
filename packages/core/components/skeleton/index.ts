import type { VariantProps } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export { default as Skeleton } from './Skeleton.vue'

const prefix = `${PREFIX}-skeleton`

export const skeletonVariants = cva(
  '',
  {
    variants: {
      variant: {
        pulse: 'animate-pulse',
        wave: 'animate-skeleton-wave animate-infinite',
      },
      shape: {
        rect: 'rounded',
        circle: 'rounded-full',
      },
    },
  },
  {
    className: `${prefix}`,
  },
)

export type SkeletonVariantsType = VariantProps<typeof skeletonVariants>
