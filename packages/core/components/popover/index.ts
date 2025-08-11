import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants.js'
import { tv } from '@rui/core/lib/tv'

export { default as Popover } from './Popover.vue'
export { default as PopoverArrow } from './PopoverArrow.vue'
export { default as PopoverContent } from './PopoverContent.vue'
export { default as PopoverTrigger } from './PopoverTrigger.vue'

// @ts-expect-error reka-ui not export useGraceArea
export { useGraceArea } from '@rui/core/vendor/useGraceArea.js'

export { PopoverAnchor } from 'reka-ui'

const prefix = `${PREFIX}-popover`

export const tvPopover = tv({
  slots: {
    root: '',
    wrapper: '',
    content: [
      'z-50',
      'rounded',
      'min-w-(--reka-popover-trigger-width)',
      'border',
      'rounded-lg',
      'p-2.5',
      'outline-none',
    ],
    arrow: '',
    trigger: ['group', 'rounded'],
  }, 
  variants: {
    arrow: {
      css: '',
      svg: ''
    }
  },
  compoundSlots: [
    {
      slots: ['arrow'],
      arrow: 'css',
      class: [
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
          'before:border-x-transparent',
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
          'after:border-x-transparent',
        ],
      ],
    }
  ]  
}, {
  slots: {
    root: prefix,
    wrapper: `${prefix}-wrapper`,
    content: `${prefix}-content`,
    arrow: `${prefix}-arrow`,
    trigger: `${prefix}-trigger`,
  }
})

export type PopoverVariants = VariantProps<typeof tvPopover>
