import { cva, VariantProps } from 'class-variance-authority';
export { default as Switch } from './Switch.vue';

export const switchVariants = cva(
  [
    'peer',
    'inline-flex',
    'bg-h78',
    'shrink-0',
    'items-center',
    'rounded-full',
    'border-2',
    'border-transparent',
    'transition-colors',
    'disabled:opacity-(--disabled-opacity)',
    'data-[state=checked]:bg-rz-green',
    'data-[state=checked]:hover:bg-rz-green-light',
    'data-[state=unchecked]:hover:bg-h78/80',
  ],
  {
    variants: {
      size: {
        default: ['w-8', 'h-[1.125rem]'],
        sm: ['w-[1.75rem]', 'h-4'],
        lg: ['w-[2.25rem]', 'h-5'],
      },
    },
  }
);

export type SwitchVariantsProps = VariantProps<typeof switchVariants>;

export const switchThumbVariants = cva(
  [
    'pointer-events-none',
    'block',
    'size-3.5',
    'rounded-full',
    'bg-h00',
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
  }
);
export type SwitchThumbVariantsProps = VariantProps<typeof switchThumbVariants>;
