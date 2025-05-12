import type { VariantProps } from '@rui/core/lib/cva'
import { cva } from '@rui/core/lib/cva'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  [
    'inline-flex',
    'items-center',
    'rounded',
    'uppercase',
    'outline-none',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        default: '',
        secondary: '',
        dot: ['rounded-full', '-top-[.5em]', '-right-[.5em]'],
      },
      size: {
        base: ['text-[.625rem]', 'py-[.0625rem]', 'px-[.3125rem]'],
        sm: 'text-[.5rem] py-[.0625rem] px-[.25rem]',
        lg: ['text-xs', 'py-[.125rem]', 'px-[.375rem]'],
      },
    },
    compoundVariants: [
      {
        variant: 'dot',
        size: 'base',
        class: ['p-0', 'w-[.375rem]', 'h-[.375rem]'],
      },
      {
        variant: 'dot',
        size: 'sm',
        class: ['p-0','w-[.25rem]', 'h-[.25rem]'],
      },
      {
        variant: 'dot',
        size: 'lg',
        class: ['p-0','w-[.5rem]', 'h-[.5rem]'],
      },
    ],
    defaultVariants: {
      variant: 'default',
    },
  },
  {
    className: 'rui-badge',
  }
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
