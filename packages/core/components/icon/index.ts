import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as Icon } from './Icon.vue'

const prefix = `${PREFIX}-icon`

export const tvIcon = tv({
  base: '',
  variants: {
    size: {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'base',
  },
}, {
  class: prefix,
})

export type IconVariants = VariantProps<typeof tvIcon>
