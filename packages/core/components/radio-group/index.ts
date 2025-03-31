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
    className: 'rui-radio-group-item',
    compound: [
      {
        disableRuiClass: false,
        className: [
          'bg-rui-radio',
          'border-rui-radio-border',
          'hover:border-rui-radio-border-hover',
          'active:border-rui-radio-border-active',
          'active:bg-rui-radio-active',
          'disabled:hover:!bg-rui-radio-hover',
          'disabled:hover:!border-rui-radio-border',
        ],
      },
      {
        disableRuiClass: false,
        type: 'checkbox',
        className: [
          'data-[state=checked]:bg-rui-radio-checked',
          'data-[state=checked]:hover:bg-rui-radio-checked-hover',
          'data-[state=checked]:active:bg-rui-radio-checked-active',
          'data-[state=checked]:border-rui-radio-border-checked',
          'data-[state=checked]:hover:border-rui-radio-border-checked-hover',
          'data-[state=checked]:active:border-rui-radio-border-checked-active',
          'rui-radio-group-item_checkbox',
        ],
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
        type: 'default',
        className: ['fill-rui-radio-inner', 'stroke-rui-radio-inner'],
      },
      {
        disableRuiClass: false,
        type: 'checkbox',
        className: ['stroke-rui-radio-inner', 'rui-radio-group-item-inner_checkbox'],
      },
    ],
  }
);
export type RadioGroupItemInnerVariants = VariantProps<typeof radioGroupItemInnerVariants>;
