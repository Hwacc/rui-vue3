import { PREFIX } from '@/core/lib/constants'
import { cva, type VariantProps } from '@/core/lib/cva'

export { default as Skeleton } from './Skeleton.vue'

const prefix = `${PREFIX}-skeleton`

export const skeletonVariants = cva(
  '',
  {
    variants: {
      variant: {
        pulse: 'animate-pulse',
      },
      shape: {
        rect: 'rounded',
        circle: 'rounded-full'
      }
    }
  },
  {
    className: `${prefix}`
  }
)

export type SkeletonVariantsType = VariantProps<typeof skeletonVariants>
