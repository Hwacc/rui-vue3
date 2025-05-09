import { VariantProps } from 'class-variance-authority'
import { cva } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants'

export { default as RadioGroup } from './RadioGroup.vue'
export { default as RadioGroupItem } from './RadioGroupItem.vue'

const prefix = `${PREFIX}-radio-group`
export const radioGroupItemVariants = cva(
  [
    'aspect-square',
    'rounded-full',
    'border',
    'disabled:opacity-(--disabled-opacity)',
    'disabled:active:bg-transparent'
  ],
  {
    variants: {
      size: {
        base: ['size-3.5'],
        sm: ['size-3'],
        lg: ['size-4']
      }
    }
  },
  { className: `${prefix}-item` }
)
export type RadioGroupItemVariants = VariantProps<typeof radioGroupItemVariants>

export const radioGroupItemInnerVariants = cva(
  '',
  {
    variants: {
      size: {
        base: ['size-1.5'],
        sm: ['size-1'],
        lg: ['size-2']
      },
      variant: {
        default: [
          'motion-scale-in-0'
        ],
        checkbox: [
          'size-full',
          'stroke-[.125rem]',
          '[&>path]:animate-check-dash'
        ]
      }
    }
  },
  { className: `${prefix}-item-inner` }
)
export type RadioGroupItemInnerVariants = VariantProps<
  typeof radioGroupItemInnerVariants
>
