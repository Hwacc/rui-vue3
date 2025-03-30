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
          'bg-(--bg-color)',
          'border-(--border-color)',
          'hover:border-(--border-hover-color)',
          'active:border-(--border-active-color)',
          'active:bg-(--bg-active-color)',
          'disabled:hover:bg-(--bg-disabled-hover-color)',
          'disabled:hover:border-(--border-disabled-hover-color)',
        ],
      },
      {
        disableRuiClass: false,
        type: 'checkbox',
        className: [
          'data-[state=checked]:bg-(--bg-checked-color)',
          'data-[state=checked]:hover:bg-(--bg-checked-hover-color)',
          'data-[state=checked]:active:bg-(--bg-checked-active-color)',
          'data-[state=checked]:border-(--border-checked-color)',
          'data-[state=checked]:hover:border-(--border-checked-hover-color)',
          'data-[state=checked]:active:border-(--border-checked-active-color)',
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
        className: ['fill-(--checked-color)', 'stroke-(--checked-color)'],
      },
      {
        disableRuiClass: false,
        type: 'checkbox',
        className: [
          'stroke-(--checked-color)',
          'rui-radio-group-item-inner_checkbox',
        ],
      },
    ],
  }
);
export type RadioGroupItemInnerVariants = VariantProps<typeof radioGroupItemInnerVariants>;
