import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as Input } from './Input.vue'

const prefix = `${PREFIX}-input`

export const tvInput = tv({
  slots: {
    root: [
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
    inner: ['flex-1', 'w-0', 'outline-hidden', 'border-none', 'bg-transparent'],
    clearable: ['flex', 'items-center', 'justify-center'],
  },
  variants: {
    size: {
      base: '',
      sm: '',
      lg: '',
    },
  },
  defaultVariants: { size: 'base' },
  compoundVariants: [
    {
      size: 'base',
      class: {
        root: 'text-sm',
        inner: 'placeholder:text-sm',
        clearable: '[&_svg]:size-3.5',
      },
    },
    {
      size: 'sm',
      class: {
        root: 'text-xs',
        inner: 'placeholder:text-xs',
        clearable: '[&_svg]:size-3',
      },
    },
    {
      size: 'lg',
      class: {
        root: 'text-base',
        inner: 'placeholder:text-base',
        clearable: '[&_svg]:size-4',
      },
    },
  ],
}, {
  slots: {
    root: prefix,
    inner: `${prefix}-inner`,
    clearable: `${prefix}-clearable`,
  },
})

export type InputVariants = VariantProps<typeof tvInput>
