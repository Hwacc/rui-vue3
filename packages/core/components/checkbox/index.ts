import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as Checkbox } from './Checkbox.vue'
export { default as CheckboxGroup } from './CheckboxGroup.vue'

const prefix = `${PREFIX}-checkbox`

export const tvCheckbox = tv({
  slots: {
    root: ['flex', 'items-center', 'gap-2.5'],
    box: ['peer', 'shrink-0', 'rounded-xs', 'border'],
    indicator: ['flex', 'h-full', 'w-full', 'items-center', 'justify-center', 'text-inherit'],
    label: '',
  },
  variants: {
    disabled: {
      true: '',
      false: '',
    },
    size: {
      base: '',
      sm: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'base',
  },
  compoundVariants: [
    {
      size: 'base',
      class: {
        box: 'size-3.5',
        label: 'text-sm',
      },
    },
    {
      size: 'sm',
      class: {
        box: 'size-3',
        label: 'text-xs',
      },
    },
    {
      size: 'lg',
      class: {
        box: 'size-4',
        label: 'text-base',
      },
    },
  ],
  compoundSlots: [
    {
      slots: ['root'],
      disabled: true,
      class: 'opacity-(--disabled-opacity)',
    },
  ],
}, {
  slots: {
    root: `${prefix}-root`,
    box: prefix,
    indicator: `${prefix}-indicator`,
    label: `${prefix}-label`,
  },
})

export type CheckboxVariants = VariantProps<typeof tvCheckbox>
