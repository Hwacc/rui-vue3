import type { VariantProps } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export { default as Icon } from './Icon.vue'

const prefix = `${PREFIX}-icon`
export const iconVariants = cva(
  '',
  {
    variants: {
      size: {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
      },
    },
  },
  {
    className: prefix,
  },
)
export type IconVariantsProps = VariantProps<typeof iconVariants>
