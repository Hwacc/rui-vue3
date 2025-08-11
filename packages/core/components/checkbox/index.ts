import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'
import type { VariantProps } from 'tailwind-variants'

export { default as Checkbox } from './Checkbox.vue'
export { default as CheckboxGroup } from './CheckboxGroup.vue'

const prefix = `${PREFIX}-checkbox`

export const tvCheckbox = tv({
  slots: {
    root: ['flex', 'items-center', 'gap-2.5'],
    box: ['peer', 'shrink-0', 'rounded-xs', 'border'],
    indicator: ['flex'  , 'h-full', 'w-full', 'items-center', 'justify-center', 'text-inherit'],
    label: '',
  },
  variants: {
    disabled: {
      true: '',
      false: ''
    },
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
      slots: ['root'],
      disabled: true,
      class: 'opacity-(--disabled-opacity)'
    }, {
      slots: ['box'],
      size: 'base',
      class: 'size-3.5'
    }, {
      slots: ['box'],
      size: 'sm',
      class: 'size-3'
    }, {
      slots: ['box'],
      size: 'lg',
      class: 'size-4'
    }, {
      slots: ['label'],
      size: 'base',
      class: 'text-sm'
    }, {
      slots: ['label'],
      size: 'sm',
      class: 'text-xs'
    }, {
      slots: ['label'],
      size: 'lg',
      class: 'text-base'
    }
  ]
}, {
  slots: {
    root: `${prefix}-root`,
    box: prefix,
    indicator: `${prefix}-indicator`,
    label: `${prefix}-label`
  }
})

export type CheckboxVariants = VariantProps<typeof tvCheckbox>
