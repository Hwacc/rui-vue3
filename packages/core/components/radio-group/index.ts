import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as RadioGroup } from './RadioGroup.vue'
export { default as RadioGroupItem } from './RadioGroupItem.vue'

export const prefix = `${PREFIX}-radio-group`

export const tvRadioGroupItem = tv(
  {
    slots: {
      wrapper: ['flex items-center gap-2.5'],
      root: [
        'aspect-square',
        'rounded-full',
        'border',
        'disabled:opacity-(--disabled-opacity)',
        'disabled:active:bg-transparent',
      ],
      indicator: ['flex', 'items-center', 'justify-center'],
      inner: '',
      label: ['text-sm'],
    },
    variants: {
      size: {
        base: '',
        sm: '',
        lg: '',
      },
      variant: {
        default: '',
        checkbox: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundSlots: [
      {
        slots: ['root'],
        size: 'base',
        class: 'size-3.5',
      },
      {
        slots: ['root'],
        size: 'sm',
        class: 'size-3',
      },
      {
        slots: ['root'],
        size: 'lg',
        class: 'size-4',
      },
      {
        slots: ['inner'],
        size: 'base',
        class: 'size-1.5',
      },
      {
        slots: ['inner'],
        size: 'sm',
        class: 'size-1',
      },
      {
        slots: ['inner'],
        size: 'lg',
        class: 'size-2',
      },
      {
        slots: ['inner'],
        variant: 'default',
        class: 'motion-scale-in-0',
      },
      {
        slots: ['inner'],
        variant: 'checkbox',
        class: 'size-full stroke-[.125rem] [&>path]:animate-check-dash',
      },
      {
        slots: ['label'],
        size: 'base',
        class: 'text-sm',
      },
      {
        slots: ['label'],
        size: 'sm',
        class: 'text-xs',
      },
      {
        slots: ['label'],
        size: 'lg',
        class: 'text-base',
      },
      {
        slots: ['label'],
        disabled: true,
        class: 'opacity-(--disabled-opacity)',
      },
    ],
  },
  {
    slots: {
      wrapper: `${prefix}-item-wrapper`,
      root: `${prefix}-item-root`,
      indicator: `${prefix}-item-indicator`,
      inner: `${prefix}-item-inner`,
      label: `${prefix}-item-label`,
    },
  },
)

export type RadioGroupItemVariants = VariantProps<typeof tvRadioGroupItem>
