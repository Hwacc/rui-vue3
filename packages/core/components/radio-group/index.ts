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
    compoundVariants: [{
      size: 'base',
      class: {
        root: 'size-3.5',
        inner: 'size-1.5',
        label: 'text-sm',
      },
    }, {
      size: 'sm',
      class: {
        root: 'size-3',
        inner: 'size-1',
        label: 'text-xs',
      },
    }, {
      size: 'lg',
      class: {
        root: 'size-4',
        inner: 'size-2',
        label: 'text-base',
      },
    }, {
      disabled: true,
      class: {
        label: 'opacity-(--disabled-opacity)',
      },
    }, {
      variant: 'default',
      class: {
        inner: 'motion-scale-in-0',
      },
    }, {
      variant: 'checkbox',
      class: {
        inner: 'size-full stroke-[.125rem] [&>path]:animate-check-dash',
      },
    }],
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
