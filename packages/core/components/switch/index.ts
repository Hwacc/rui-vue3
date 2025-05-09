import { VariantProps } from 'class-variance-authority';
import { cva } from '@rui/core/lib/cva';
import { PREFIX } from '@rui/core/lib/constants';
export { default as Switch } from './Switch.vue';

const prefix = `${PREFIX}-switch`;
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
        base: ['w-8', 'h-[1.125rem]'],
        sm: ['w-[1.75rem]', 'h-4'],
        lg: ['w-[2.25rem]', 'h-5'],
      },
    },
  },
  { className: prefix }
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
        base: ['size-3.5'],
        sm: ['size-3'],
        lg: ['size-4'],
      },
    },
    compoundVariants: [
      {
        unstyled: false,
        class: 'bg-rui-switch-thumb',
      },
    ],
  },
  {
    className: `${prefix}-thumb`,
  }
);
export type SwitchThumbVariantsProps = VariantProps<typeof switchThumbVariants>;
