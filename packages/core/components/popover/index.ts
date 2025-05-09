import { VariantProps } from 'class-variance-authority'
import { cva } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants.js'

export { default as Popover } from './Popover.vue'
export { default as PopoverContent } from './PopoverContent.vue'
export { default as PopoverTrigger } from './PopoverTrigger.vue'
export { default as PopoverArrow } from './PopoverArrow.vue'

export { PopoverAnchor } from 'reka-ui'

//@ts-ignore
export { u as useGraceArea } from '../../node_modules/reka-ui/dist/shared/useGraceArea.js'

const prefix = `${PREFIX}-popover`

export const popoverTriggerVariants = cva(['group', 'rounded'], undefined, {
  className: `${prefix}-trigger`
})

export const popoverContentVariants = cva(
  [
    'z-50',
    'rounded',
    'min-w-(--reka-popover-trigger-width)',
    'border',
    'rounded-lg',
    'p-2.5',
    'outline-none'
  ],
  { variants: {} },
  { className: `${prefix}-content` }
)

export const popoverArrowVariants = cva(
  '',
  {
    variants: {
      variant: {
        svg: '',
        css: [
          'relative',
          'block',
          'w-(--reka-popover-arrow-width)',
          'h-(--reka-popover-arrow-height)',
          'animate-fade',
          'animate-duration-100',
          [
            'before:absolute',
            'before:z-1',
            'before:w-0',
            'before:h-0',
            'before:bottom-0',
            'before:border-y-(length:--reka-popover-arrow-border-height)',
            'before:border-b-transparent',
            'before:border-x-(length:--reka-popover-arrow-border-width)',
            'before:border-x-transparent'
          ],
          [
            'after:absolute',
            'after:z-2',
            'after:bottom-[.0625rem]',
            'after:w-0',
            'after:h-0',
            'after:border-y-(length:--reka-popover-arrow-border-height)',
            'after:border-b-transparent',
            'after:border-x-(length:--reka-popover-arrow-border-width)',
            'after:border-x-transparent'
          ]
        ]
      }
    }
  },
  { className: `${prefix}-arrow` }
)
export type PopoverArrowVariants = VariantProps<typeof popoverArrowVariants>
