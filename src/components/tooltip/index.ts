export { default as Tooltip } from './Tooltip.vue';
export { default as TooltipContent } from './TooltipContent.vue';
export { default as TooltipProvider } from './TooltipProvider.vue';
export { default as TooltipTrigger } from './TooltipTrigger.vue';

import { cva, type VariantProps } from 'class-variance-authority';
import TooltipArrow from './TooltipArrow.vue';
import { TooltipArrowProps } from 'reka-ui';
export { TooltipArrow, type TooltipArrowProps };

export const tooltipContentVariants = cva(
  ['px-2', 'py-[.3125rem]', 'border', 'rounded', 'text-xs'],
  {
    variants: {
      theme: {
        default: ['bg-hff', 'text-h00', 'border-h00'],
        dark: ['bg-h00', 'text-hff', 'border-hff'],
      },
    },
  }
);
export type TooltipContentVariants = VariantProps<typeof tooltipContentVariants>;

export const toolTipArrowVariants = cva('', {
  variants: {
    theme: {
      default: 'fill-hff stroke-h00',
      dark: 'fill-h00 stroke-hff',
    },
    type: {
      svg: '',
      css: [
        'relative',
        'w-[.4375rem]',
        'h-[.1875rem]',
        'animate-fade',
        'animate-duration-100',
        [
          'before:absolute',
          'before:z-1',
          'before:bottom-0',
          'before:w-0',
          'before:h-0',
          'before:border-r-[.1875rem] before:border-r-transparent',
          'before:border-l-[.1875rem] before:border-l-transparent',
          'before:left-[.125rem]',
        ],
        [
          'after:absolute',
          'after:z-2',
          'after:bottom-[.0625rem]',
          'after:w-0',
          'after:h-0',
          'after:border-r-[.1875rem] after:border-r-transparent',
          'after:border-l-[.1875rem] after:border-l-transparent',
          'after:left-[.125rem]'
        ],
      ],
    },
  },
  compoundVariants: [
    {
      type: 'svg',
      theme: 'default',
      className: 'fill-hff stroke-h00',
    },
    {
      type: 'svg',
      theme: 'dark',
      className: 'fill-h00 stroke-hff',
    },
    {
      type: 'css',
      theme: 'default',
      className: [
        'before:border-t-[.1875rem] before:border-t-h00',
        'after:border-t-[.1875rem] after:border-t-hff',
      ],
    },
    {
      type: 'css',
      theme: 'dark',
      className: [
        'before:border-t-[.1875rem] before:border-t-hff',
        'after:border-t-[.1875rem] after:border-t-h00',
      ],
    },
  ],
});
export type ToolTipArrowVariants = VariantProps<typeof toolTipArrowVariants>;
