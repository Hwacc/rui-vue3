import type { VariantProps } from 'class-variance-authority'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export { default as Input } from './Input.vue'

const prefix = `${PREFIX}-input`
export const inputVariants = cva(
  [
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
  {
    variants: {
      size: {
        base: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  { className: prefix },
)
export type InputVariants = VariantProps<typeof inputVariants>

export const inputInnerVariants = cva(
  ['flex-1', 'w-0', 'outline-hidden', 'border-none', 'bg-transparent'],
  {
    variants: {
      size: {
        base: ['placeholder:text-sm'],
        sm: ['placeholder:text-xs'],
        lg: ['placeholder:text-base'],
      },
    },
    defaultVariants: { size: 'base' },
  },
  { className: `${prefix}-inner` },
)
export type InputInnerVariants = VariantProps<typeof inputInnerVariants>

export const inputClearableVariants = cva(
  'flex items-center justify-center',
  {
    variants: {
      size: {
        base: '[&_svg]:size-3.5',
        sm: '[&_svg]:size-3',
        lg: '[&_svg]:size-4',
      },
    },
  },
  { className: `${prefix}-clearable` },
)
