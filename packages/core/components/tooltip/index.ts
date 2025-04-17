export { default as Tooltip } from './Tooltip.vue'
export { default as TooltipContent } from './TooltipContent.vue'
export { default as TooltipProvider } from './TooltipProvider.vue'
export { default as TooltipTrigger } from './TooltipTrigger.vue'

import { type VariantProps } from 'class-variance-authority'
import { cva } from '@/core/lib/cva'
import TooltipArrow from './TooltipArrow.vue'
import { TooltipArrowProps } from 'reka-ui'
import { PREFIX } from '@/core/lib/constants'
export { TooltipArrow, type TooltipArrowProps }

const prefix = `${PREFIX}-tooltip`
export const tooltipContentVariants = cva(
  [
    'z-50',
    'overflow-visible',
    'motion-opacity-in',
    'motion-scale-in-95',
    'data-[side=bottom]:motion-translate-y-in-[8px]',
    'data-[side=top]:-motion-translate-y-in-[8px]',
    'data-[side=left]:motion-translate-x-in-[8px]',
    'data-[side=right]:-motion-translate-x-in-[8px]',
    'data-[state=closed]:motion-opacity-out',
    'data-[state=closed]:motion-scale-out-95',
    'px-2',
    'py-[.3125rem]',
    'rounded',
    'text-xs',
    'border'
  ],
  {
    variants: {
      theme: {
        default: '',
        dark: ''
      }
    }
  },
  {
    className: `${prefix}-content`
  }
)
export type TooltipContentVariants = VariantProps<typeof tooltipContentVariants>

export const toolTipArrowVariants = cva(
  '',
  {
    variants: {
      theme: {
        default: '',
        dark: ''
      },
      variant: {
        svg: '',
        css: [
          'relative',
          'block',
          'w-[var(--reka-tooltip-arrow-width)]',
          'h-[var(--reka-tooltip-arrow-height)]',
          'motion-opacity-in',
          'motion-scale-in-100',
          [
            'before:absolute',
            'before:z-1',
            'before:w-0',
            'before:h-0',
            'before:bottom-0',
            'before:border-y-(length:--reka-tooltip-arrow-border-height)',
            'before:border-b-transparent',
            'before:border-x-(length:--reka-tooltip-arrow-border-width)',
            'before:border-x-transparent'
          ],
          [
            'after:absolute',
            'after:z-2',
            'after:bottom-[1px]',
            'after:w-0',
            'after:h-0',
            'after:border-y-(length:--reka-tooltip-arrow-border-height)',
            'after:border-b-transparent',
            'after:border-x-(length:--reka-tooltip-arrow-border-width)',
            'after:border-x-transparent'
          ]
        ]
      }
    }
  },
  {
    className: `${prefix}-arrow`
  }
)
export type ToolTipArrowVariants = VariantProps<typeof toolTipArrowVariants>
