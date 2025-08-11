
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'
import { VariantProps } from 'tailwind-variants'

export { default as Input } from './Input.vue'

const prefix = `${PREFIX}-input`

export const tvInput = tv({
  slots: {
    base: [
      'flex',
      'items-center',
      'min-w-[7.75rem]',
      'py-[.375rem]',
      'px-2',
      'gap-2',
      'border',
      'rounded',
      'transition-all',
      'data-[state=disabled]:pointer-events-none',
      'data-[state=disabled]:opacity-(--disabled-opacity)',
    ],
    inner:  ['flex-1', 'w-0', 'outline-hidden', 'border-none', 'bg-transparent'],
    clearable: ['flex', 'items-center', 'justify-center']
  },
  variants: {
    size: {
      base:'',
      sm:'',
      lg:'',
    },
  },
  defaultVariants: { size: 'base' },
  compoundSlots: [
    {
      slots: ['base'],
      size: 'base',
      class: [
        'text-sm',
      ]
    },
    {
      slots: ['base'],
      size: 'sm',
      class: [
        'text-xs',
      ]
    },
    {
      slots: ['base'],
      size: 'lg',
      class: [
        'text-base',
      ]
    },
    {
      slots: ['inner'],
      size: 'base',
      class: [
        'placeholder:text-sm',
      ]
    },
    {
      slots: ['inner'],
      size: 'sm',
      class: [
        'placeholder:text-xs',
      ]
    },
    {
      slots: ['inner'],
      size: 'lg',
      class: [
        'placeholder:text-base',
      ]
    },
    {
      slots: ['clearable'],
      size: 'base',
      class: [
        '[&_svg]:size-3.5',
      ]
    },
    {
      slots: ['clearable'],
      size: 'sm',
      class: [
        '[&_svg]:size-3',
      ]
    },
    {
      slots: ['clearable'],
      size: 'lg',
      class: [
        '[&_svg]:size-4',
      ]
    },
  ]
}, {
  slots: {
    base: prefix,
    inner: `${prefix}-inner`,
    clearable: `${prefix}-clearable`,
  }
})

export type InputVariants = VariantProps<typeof tvInput>
