import { VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';

export { default as RadioGroup } from './RadioGroup.vue';
export { default as RadioGroupItem } from './RadioGroupItem.vue';

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
      type: {
        default: '',
        checkbox: '',
      },
    },
  },
  {
    className: 'rui-group-item',
    compound: [
      {
        disableRuiClass: false,
        type: 'checkbox',
        className: 'rui-radio-group-item_checkbox',
      },
    ],
  }
);
export type RadioGroupItemVariants = VariantProps<typeof radioGroupItemVariants>;

export const radioGroupItemInnerVariants = cva(
  [],
  {
    variants: {
      size: {
        default: ['size-1.5'],
        sm: ['size-1'],
        lg: ['size-2'],
      },
      type: {
        default: ['animate-in', 'zoom-in-1'],
        checkbox: ['size-full', 'stroke-[.125rem]', '[&>path]:animate-check-dash'],
      },
    },
  },
  {
    className: 'rui-radio-group-item-inner',
    compound: [
      {
        disableRuiClass: false,
        type: 'checkbox',
        className: 'rui-radio-group-item-inner_checkbox',
      },
    ],
  }
);
export type RadioGroupItemInnerVariants = VariantProps<typeof radioGroupItemInnerVariants>;
