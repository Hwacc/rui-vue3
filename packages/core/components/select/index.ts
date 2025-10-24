import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as Select } from './Select.vue'
export { default as SelectContent } from './SelectContent.vue'
export { default as SelectItem } from './SelectItem.vue'
export { default as SelectLabel } from './SelectLabel.vue'
export { default as SelectMouseTrigger } from './SelectMouseTrigger.vue'
export { default as SelectScrollDownButton } from './SelectScrollDownButton.vue'
export { default as SelectScrollUpButton } from './SelectScrollUpButton.vue'
export { default as SelectSeparator } from './SelectSeparator.vue'
export { default as SelectTrigger } from './SelectTrigger.vue'

export { default as SelectValue } from './SelectValue.vue'

export { SelectGroup, SelectItemText } from 'reka-ui'

const prefix = `${PREFIX}-select`

export const tvSelect = tv(
  {
    base: '',
    variants: {
      positionStrategy: {
        absolute: 'relative',
        fixed: '',
      },
    },
  },
  {
    class: prefix,
  },
)

export const tvTrigger = tv(
  {
    base: [
      'group',
      'flex',
      'items-center',
      'min-w-[10.875rem]',
      'rounded',
      'gap-1.5',
      'border',
      'px-2',
      'py-1.5',
      'text-start',
      'transition-colors',
      'data-[disabled]:pointer-events-none',
      'data-[disabled]:opacity-(--disabled-opacity)',
      '[&>span]:flex-1',
      '[&>span]:truncate',
    ],
    slots: {
      icon: '',
      triangle: 'w-[.5rem] h-[.25rem] shrink-0 transition-transform',
    },
    variants: {
      size: {
        base: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
      open: {
        true: '',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      size: 'base',
      open: false,
      disabled: false,
    },
    compoundVariants: [
      {
        open: true,
        class: {
          triangle: 'animate-from rotate-180',
        },
      },
      {
        open: false,
        class: {
          triangle: 'rotate-0',
        },
      },
    ],
  },
  {
    class: `${prefix}-trigger`,
    slots: {
      icon: `${prefix}-trigger-icon`,
      triangle: `${prefix}-trigger-triangle`,
    },
  },
)
export type SelectTriggerVariants = VariantProps<typeof tvTrigger>

export const tvContent = tv(
  {
    slots: {
      base: [
        'relative',
        'z-auto',
        'min-w-(--reka-select-trigger-width)',
        'rounded',
        'border',
        'p-0',
        'z-(--z-max)',
      ],
      inner: ['w-full max-h-46 overflow-y-auto'],
    },
    variants: {
      position: {
        'popper': '',
        'item-aligned': '',
      },
    },
  },
  {
    slots: {
      base: `${prefix}-content`,
      inner: `${prefix}-content-inner`,
    },
  },
)
export type SelectContentVariants = VariantProps<typeof tvContent>

export const tvItem = tv(
  {
    slots: {
      base: [
        'relative',
        'flex',
        'w-full',
        'cursor-default',
        'select-none',
        'items-center',
        'rounded-sm',
        'py-1.5',
        'px-2',
        'text-sm',
        'outline-none',
        'data-[disabled]:pointer-events-none',
        'data-[disabled]:opacity-(--disabled-opacity)',
      ],
      indicator: ['absolute', 'left-2', 'flex', 'items-center', 'justify-center', 'size-3.5'],
      text: '',
    },
    variants: {
      multiply: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        multiply: true,
        class: {
          base: 'pl-8 pr-2',
        },
      },
    ],
  },
  {
    slots: {
      base: `${prefix}-item`,
      indicator: `${prefix}-item-indicator`,
      text: `${prefix}-item-text`,
    },
  },
)
export type SelectItemVariants = VariantProps<typeof tvItem>

export const tvLabel = tv(
  {
    base: ['py-1.5', 'px-2'],
    variants: {
      multiply: {
        true: ['pl-8'],
        false: '',
      },
    },
  },
  {
    class: `${prefix}-label`,
  },
)

export const tvValue = tv(
  {
    base: [
      'flex',
      'items-center',
      'gap-1',
      'text-sm',
      '[&>span]:rounded-[.875rem]',
      '[&>span]:text-xs',
    ],
    slots: {
      close: 'relative py-0.5 pl-1 pr-5',
      closeIcon: 'absolute right-0.75 top-0.75 size-3',
    },
  },
  {
    class: `${prefix}-value`,
    slots: {
      close: `${prefix}-value-close`,
      closeIcon: `${prefix}-value-close-icon`,
    },
  },
)

export const tvSeparator = tv(
  {
    base: ['-mx-1', 'my-1', 'h-px'],
  },
  {
    class: `${prefix}-separator`,
  },
)

export const tvScrollButton = tv(
  {
    base: ['flex', 'cursor-default', 'items-center', 'justify-center', 'py-1'],
    variants: {
      dir: {
        up: '',
        down: '',
      },
    },
  },
  {
    class: `${prefix}-scroll-button`,
  },
)
export type SelectScrollButtonVariants = VariantProps<typeof tvScrollButton>
