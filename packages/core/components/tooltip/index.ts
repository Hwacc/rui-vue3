export { default as Tooltip } from './Tooltip.vue';
export { default as TooltipContent } from './TooltipContent.vue';
export { default as TooltipProvider } from './TooltipProvider.vue';
export { default as TooltipTrigger } from './TooltipTrigger.vue';

import { type VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';
import TooltipArrow from './TooltipArrow.vue';
import { TooltipArrowProps } from 'reka-ui';
import { PREFIX } from '@/lib/constants';
export { TooltipArrow, type TooltipArrowProps };

const prefix = `${PREFIX}-tooltip`;
export const tooltipContentVariants = cva(
  [
    'z-50',
    'overflow-hidden',
    'animate-in',
    'fade-in-0',
    'zoom-in-95',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
    'px-2',
    'py-[.3125rem]',
    'rounded',
    'text-xs',
    'border',
  ],
  {
    variants: {
      theme: {
        default: '',
        dark: '',
      },
    },
  },
  {
    className: `${prefix}-content`,
  }
);
export type TooltipContentVariants = VariantProps<typeof tooltipContentVariants>;

export const toolTipArrowVariants = cva(
  '',
  {
    variants: {
      theme: {
        default: '',
        dark: '',
      },
      variant: {
        svg: '',
        css: [
          'relative',
          'block',
          'w-[var(--reka-tooltip-arrow-width)]',
          'h-[var(--reka-tooltip-arrow-height)]',
          'animate-fade',
          'animate-duration-100',
          [
            'before:absolute',
            'before:z-1',
            'before:w-0',
            'before:h-0',
            'before:bottom-0',
            'before:border-y-(length:--reka-tooltip-arrow-border-height)',
            'before:border-b-transparent',
            'before:border-x-(length:--reka-tooltip-arrow-border-width)',
            'before:border-x-transparent',
          ],
          [
            'after:absolute',
            'after:z-2',
            'after:bottom-[.0625rem]',
            'after:w-0',
            'after:h-0',
            'after:border-y-(length:--reka-tooltip-arrow-border-height)',
            'after:border-b-transparent',
            'after:border-x-(length:--reka-tooltip-arrow-border-width)',
            'after:border-x-transparent',
          ],
        ],
      },
    },
  },
  {
    className: `${prefix}-arrow`,
  }
);
export type ToolTipArrowVariants = VariantProps<typeof toolTipArrowVariants>;
