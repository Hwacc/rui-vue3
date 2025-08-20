import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as Separator } from './Separator.vue'

export const tvSeparator = tv(
  {
    base: ['shrink-0 bg-border relative'],
    slots: {
      label: [
        'text-xs',
        'absolute',
        'top-1/2',
        'left-1/2',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'flex',
        'justify-center',
        'items-center',
      ],
    },
    variants: {
      orientation: {
        vertical: ['w-px h-full'],
        horizontal: ['h-px w-full'],
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
    compoundSlots: [
      {
        slots: ['label'],
        orientation: 'vertical',
        class: ['w-px px-1 py-2'],
      },
      {
        slots: ['label'],
        orientation: 'horizontal',
        class: ['h-px py-1 px-2'],
      },
    ],
  },
  {
    class: `${PREFIX}-separator`,
    slots: {
      label: `${PREFIX}-separator-label`,
    },
  },
)
export type SeparatorVariants = VariantProps<typeof tvSeparator>
