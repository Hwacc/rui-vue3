import { cva, VariantProps } from 'class-variance-authority';

export { default as Popover } from './Popover.vue';
export { default as PopoverContent } from './PopoverContent.vue';
export { default as PopoverTrigger } from './PopoverTrigger.vue';
export { default as PopoverArrow } from './PopoverArrow.vue';

export { PopoverAnchor } from 'reka-ui';

//@ts-ignore
export { u as useGraceArea } from '../../node_modules/reka-ui/dist/shared/useGraceArea.js';

export const popoverContentClass = [
  'z-50',
  'rounded',
  'min-w-(--reka-popover-trigger-width)',
  'border',
  'border-h55',
  'bg-h2a',
  'rounded-lg',
  'p-2.5',
  'shadow-md',
  'outline-none',
  'shadow-[0_.25rem_.375rem_-1px_rgba(0,0,0,1)]',
];

export const popoverArrowVariants = cva('', {
  variants: {
    type: {
      svg: 'fill-h2a stroke-h55',
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
          'before:border-t-h55',
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
          'after:border-t-h2a',
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
});
export type PopoverArrowVariants = VariantProps<typeof popoverArrowVariants>;
