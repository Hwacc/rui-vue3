import { VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';
import { PREFIX } from '@/lib/constants';

export { default as RadioGroup } from './RadioGroup.vue';
export { default as RadioGroupItem } from './RadioGroupItem.vue';

const prefix = `${PREFIX}-radio-group`;
export const radioGroupItemVariants = cva(
  [
    'aspect-square',
    'rounded-full',
    'border',
    'disabled:opacity-(--disabled-opacity)',
    'disabled:active:bg-transparent',
  ],
  {
    variants: {
      size: {
        default: ['size-3.5'],
        sm: ['size-3'],
        lg: ['size-4'],
      },
    },
  },
  { className: `${prefix}-item` }
);
export type RadioGroupItemVariants = VariantProps<typeof radioGroupItemVariants>;

export const radioGroupItemInnerVariants = cva(
  '',
  {
    variants: {
      size: {
        default: ['size-1.5'],
        sm: ['size-1'],
        lg: ['size-2'],
      },
      variant: {
        default: ['animate-in', 'zoom-in-1'],
        checkbox: ['size-full', 'stroke-[.125rem]', '[&>path]:animate-check-dash'],
      },
    },
  },
  { className: `${prefix}-item-inner` }
);
export type RadioGroupItemInnerVariants = VariantProps<typeof radioGroupItemInnerVariants>;
