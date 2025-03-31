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
    compoundVariants: [
      {
        theme: 'default',
        disableRuiClass: false,
        class: [
          'bg-rui-tooltip',
          'border-rui-tooltip-border',
          'text-rui-tooltip-text',
        ],
      },
      {
        theme: 'dark',
        disableRuiClass: false,
        class: [
          'bg-rui-tooltip-dark',
          'border-rui-tooltip-border-dark',
          'text-rui-tooltip-text-dark',
        ],
      },
    ],
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
      type: {
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
            'before:border-t-(length:--reka-tooltip-arrow-border-height)',
            'before:border-r-(length:--reka-tooltip-arrow-border-width)',
            'before:border-r-transparent',
            'before:border-l-(length:--reka-tooltip-arrow-border-width)',
            'before:border-l-transparent',
            'before:border-b-(length:--reka-tooltip-arrow-border-height)',
            'before:border-b-transparent',
          ],
          [
            'after:absolute',
            'after:z-2',
            'after:bottom-[.0625rem]',
            'after:w-0',
            'after:h-0',
            'after:border-t-(length:--reka-tooltip-arrow-border-height)',
            'after:border-r-(length:--reka-tooltip-arrow-border-width)',
            'after:border-r-transparent',
            'after:border-l-(length:--reka-tooltip-arrow-border-width)',
            'after:border-l-transparent',
            'after:border-b-(length:--reka-tooltip-arrow-border-height)',
            'after:border-b-transparent',
          ],
        ],
      },
    },
    compoundVariants: [
      {
        type: 'svg',
        theme: 'default',
        disableRuiClass: false,
        class: ['fill-rui-tooltip', 'stroke-rui-tooltip-border'],
      },
      {
        type: 'svg',
        theme: 'dark',
        disableRuiClass: false,
        class: ['fill-rui-tooltip-dark', 'stroke-tooltip-border-dark'],
      },
      {
        type: 'css',
        theme: 'default',
        disableRuiClass: false,
        class: ['before:border-t-rui-tooltip-border', 'after:border-t-rui-tooltip'],
      },
      {
        type: 'css',
        theme: 'dark',
        disableRuiClass: false,
        class: ['before:border-t-rui-tooltip-border-dark', 'after:border-t-rui-tooltip-dark'],
      },
    ],
  },
  {
    className: `${prefix}-arrow`,
    compound: [
      {
        type: 'svg',
        disableRuiClass: false,
        className: `${prefix}-arrow_svg`,
      },
      {
        type: 'css',
        disableRuiClass: false,
        className: `${prefix}-arrow_css`,
      },
    ],
  }
);
export type ToolTipArrowVariants = VariantProps<typeof toolTipArrowVariants>;
