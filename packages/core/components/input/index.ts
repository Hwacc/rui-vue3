import { PREFIX } from '@/lib/constants';
import { cva, VariantProps } from 'class-variance-authority';

const prefix = `${PREFIX}-input`;
export const inputVariants = cva(
  [
    'flex',
    'items-center',
    'min-w-[7.75rem]',
    'py-[.375rem]',
    'px-2',
    'gap-2',
    'border',
    'rounded',
    'ring',
    'ring-transparent',
    'transition-all',
    'disabled:pointer-events-none',
    'disabled:opacity-(--disabled-opacity)',
    prefix
  ],
  {
    variants: {
      size: {
        default: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
      focus: {
        true: '',
      },
    },
    defaultVariants: {
      size: 'default',
      focus: false,
    },
  }
);
export type InputVariants = VariantProps<typeof inputVariants>;

export const inputInnerVariants = cva(
  [
    'flex-1',
    'w-0',
    'outline-hidden',
    'border-none',
    'bg-transparent',
    `${prefix}-inner`
  ],
  {
    variants: {
      size: {
        default: ['placeholder:text-sm'],
        sm: ['placeholder:text-xs'],
        lg: ['placeholder:text-base'],
      },
      focus: {
        true: '',
      },
    },
    defaultVariants: {
      size: 'default',
      focus: false,
    },
  }
);
export type InputInnerVariants = VariantProps<typeof inputInnerVariants>;

export const inputClearableVariants = cva([`${prefix}-clearable`], { variants: {
  size: {
    default: 'size-3.5', sm: 'size-3', lg: 'size-4'
  }
} });

export { default as Input } from './Input.vue';
