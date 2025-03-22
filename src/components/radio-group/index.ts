import { cva, VariantProps } from 'class-variance-authority';

export { default as RadioGroup } from './RadioGroup.vue';
export { default as RadioGroupItem } from './RadioGroupItem.vue';

export const radioGroupItemVariants = cva(
  [
    'aspect-square',
    'rounded-full',
    'border',
    'border-h70',
    'hover:border-rz-green',
    'active:border-rz-green',
    'active:bg-h28',
    'disabled:opacity-30',
    'disabled:hover:border-h70',
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
        default: [],
        checkbox: [
          'data-[state=checked]:bg-rz-green',
          'data-[state=checked]:border-rz-green',
          'data-[state=checked]:active:bg-rz-green-dark-active',
          'data-[state=checked]:active:border-rz-green-dark-active',
          'data-[state=checked]:hover:border-rz-green-light',
          'data-[state=checked]:hover:bg-rz-green-light',
        ],
      },
    },
  }
);
export type RadioGroupItemVariants = VariantProps<typeof radioGroupItemVariants>;

export const radioGroupItemInnerVariants = cva([], {
  variants: {
    size: {
      default: ['size-1.5'],
      sm: ['size-1'],
      lg: ['size-2'],
    },
    type: {
      default: ['fill-rz-green', 'stroke-rz-green', 'animate-in', 'zoom-in-1'],
      checkbox: ['size-full', 'text-h00', 'stroke-[.125rem]', '[&_path]:check-dash-animate'],
    },
  },
  compoundVariants: [],
});
export type RadioGroupItemInnerVariants = VariantProps<typeof radioGroupItemInnerVariants>;
