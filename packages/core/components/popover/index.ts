import { VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';
import { PREFIX } from '@/lib/constants.js';

export { default as Popover } from './Popover.vue';
export { default as PopoverContent } from './PopoverContent.vue';
export { default as PopoverTrigger } from './PopoverTrigger.vue';
export { default as PopoverArrow } from './PopoverArrow.vue';

export { PopoverAnchor } from 'reka-ui';

//@ts-ignore
export { u as useGraceArea } from '../../node_modules/reka-ui/dist/shared/useGraceArea.js';

const prefix = `${PREFIX}-popover`;
export const popoverContentVariants = cva(
  [
    'z-50',
    'rounded',
    'min-w-(--reka-popover-trigger-width)',
    'border',
    'rounded-lg',
    'p-2.5',
    'outline-none',
  ],
  undefined,
  {
    className: `${prefix}-content`,
  }
);

export const popoverArrowVariants = cva(
  '',
  {
    variants: {
      type: {
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
            'before:border-t-(--rui-popover-arrow-border-color)',
            'before:border-t-(length:--reka-popover-arrow-border-height)',
            'before:border-r-(length:--reka-popover-arrow-border-width)',
            'before:border-r-transparent',
            'before:border-l-(length:--reka-popover-arrow-border-width)',
            'before:border-l-transparent',
            'before:border-b-(length:--reka-popover-arrow-border-height)',
            'before:border-b-transparent',
          ],
          [
            'after:absolute',
            'after:z-2',
            'after:bottom-[.0625rem]',
            'after:w-0',
            'after:h-0',
            'after:border-t-(--rui-popover-arrow-color)',
            'after:border-t-(length:--reka-popover-arrow-border-height)',
            'after:border-r-(length:--reka-popover-arrow-border-width)',
            'after:border-r-transparent',
            'after:border-l-(length:--reka-popover-arrow-border-width)',
            'after:border-l-transparent',
            'after:border-b-(length:--reka-popover-arrow-border-height)',
            'after:border-b-transparent',
          ],
        ],
      },
    },
  },
  {
    className: `${prefix}-arrow`,
    compound: [
      { type: 'svg', disableRuiClass: false, className: `${prefix}-arrow_svg` },
      { type: 'css', disableRuiClass: false, className: `${prefix}-arrow_css` },
    ],
  }
);
export type PopoverArrowVariants = VariantProps<typeof popoverArrowVariants>;
