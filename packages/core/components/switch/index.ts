import { VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';
export { default as Switch } from './Switch.vue';

export const switchVariants = cva(
  [
    'peer',
    'inline-flex',
    'shrink-0',
    'items-center',
    'rounded-full',
    'border-2',
    'transition-colors',
    'disabled:opacity-(--disabled-opacity)',
  ],
  {
    variants: {
      size: {
        default: ['w-8', 'h-[1.125rem]'],
        sm: ['w-[1.75rem]', 'h-4'],
        lg: ['w-[2.25rem]', 'h-5'],
      },
    },
    compoundVariants: [
      {
        disableRuiClass: false,
        class: [
          'bg-(--bg-color)',
          'data-[state=checked]:bg-(--bg-checked-color)',
          'data-[state=checked]:hover:bg-(--bg-checked-hover-color)',
          'data-[state=unchecked]:hover:bg-(--bg-unchecked-hover-color)/80',
          'border-(--border-color)',
        ],
      },
    ],
  },
  {
    className: 'rui-switch',
  }
);

export type SwitchVariantsProps = VariantProps<typeof switchVariants>;

export const switchThumbVariants = cva(
  [
    'pointer-events-none',
    'block',
    'size-3.5',
    'rounded-full',
    'transition-transform',
    'origin-center',
    'data-[state=checked]:translate-x-[100%]',
    'data-[state=unchecked]:translate-x-0',
  ],
  {
    variants: {
      size: {
        default: ['size-3.5'],
        sm: ['size-3'],
        lg: ['size-4'],
      },
    },
    compoundVariants: [
      {
        disableRuiClass: false,
        class: ['bg-(--thumb-bg-color)'],
      },
    ],
  },
  {
    className: 'rui-switch-thumb',
  }
);
export type SwitchThumbVariantsProps = VariantProps<typeof switchThumbVariants>;
