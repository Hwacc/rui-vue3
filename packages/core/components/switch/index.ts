import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'
import type { VariantProps } from 'tailwind-variants'

export { default as Switch } from './Switch.vue'

const prefix = `${PREFIX}-switch`

export const tvSwitch = tv({
  slots: {
    root: [
      'peer',
      'inline-flex',
      'shrink-0',
      'items-center',
      'rounded-full',
      'border-2',
      'transition-colors',
      'disabled:opacity-(--disabled-opacity)',
    ],
    thumb: [
      'pointer-events-none',
      'block',
      'size-3.5',
      'rounded-full',
      'transition-transform',
      'origin-center',
      'data-[state=checked]:translate-x-[100%]',
      'data-[state=unchecked]:translate-x-0',
    ] 
  }, 
  variants: {
    size: {
      base: '',
      sm: '',
      lg: ''
    }
  },
  defaultVariants: {
    size: 'base'
  },
  compoundSlots: [
    {
      size: 'base',
      slots: ['root'],
      class: 'w-8 h-[1.125rem]',
    },
    {
      size: 'sm',
      slots: ['root'],
      class: 'w-[1.75rem] h-4',
    },
    {
      size: 'lg',
      slots: ['root'],
      class: 'w-[2.25rem] h-5',
    },
    {
      size: 'base',
      slots: ['thumb'],
      class: 'size-3.5',
    },
    {
      size: 'sm',
      slots: ['thumb'],
      class: 'size-3',
    },
    {
      size: 'lg',
      slots: ['thumb'],
      class: 'size-4',
    }
  ],
}, {
  slots: {
    root: prefix,
    thumb: `${prefix}-thumb`,
  }
})

export type SwitchVariant = VariantProps<typeof tvSwitch>
