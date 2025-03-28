import { PREFIX } from '@/lib/constants';
import { VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';

export { default as Input } from './Input.vue';

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
  },
  {
    className: prefix,
  }
);
export type InputVariants = VariantProps<typeof inputVariants>;

export const inputInnerVariants = cva(
  ['flex-1', 'w-0', 'outline-hidden', 'border-none', 'bg-transparent'],
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
  },
  {
    className: `${prefix}-inner`,
  }
);
export type InputInnerVariants = VariantProps<typeof inputInnerVariants>;

export const inputClearableVariants = cva(
  '',
  {
    variants: {
      size: {
        default: '[&_svg]:size-3.5',
        sm: '[&_svg]:size-3',
        lg: '[&_svg]:size-4',
      },
    },
  },
  {
    className: `${prefix}-clearable`,
  }
);
