import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as Button } from './Button.vue'
export type { ButtonProps } from './Button.vue'

const prefix = `${PREFIX}-btn`

export const tvButton = tv(
  {
    base: [
      'inline-flex',
      'items-center',
      'justify-center',
      'px-4',
      'gap-2',
      'whitespace-nowrap',
      'rounded',
      'border',
      'transition-all',
      'ring',
      'ring-transparent',
      'disabled:pointer-events-none',
      'disabled:opacity-(--disabled-opacity)',
      '[&_svg]:pointer-events-none',
      '[&_svg]:shrink-0',
    ],
    slots: {
      loading: 'animate-spin',
    },
    variants: {
      variant: {
        default: '',
        normal: '',
        outline: '',
        text: '',
        icon: ['px-0', 'aspect-square', 'border-none'],
        switch: ['justify-start', 'gap-[.6875rem]', 'px-3', 'text-xs'],
      },
      size: {
        base: 'h-[1.75rem] text-sm',
        sm: 'h-[1.5rem] text-xs',
        lg: 'h-[2rem] text-base',
      },
      loading: {
        true: 'pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
      loading: false,
    },
    compoundSlots: [
      {
        slots: ['loading'],
        size: 'base',
        class: 'size-4',
      },
      {
        slots: ['loading'],
        size: 'sm',
        class: 'size-3.5',
      },
      {
        slots: ['loading'],
        size: 'lg',
        class: 'text-4.5',
      },
    ],
  },
  {
    class: prefix,
    slots: {
      loading: `${prefix}-loading`,
    },
  },
)
export type ButtonVariants = VariantProps<typeof tvButton>
