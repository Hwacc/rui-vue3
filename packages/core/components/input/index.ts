import { cva, VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'flex',
    'items-center',
    'min-w-[7.75rem]',
    'py-[.375rem]',
    'px-2',
    'gap-2',
    'border',
    'border-h55',
    'text-hbb',
    'rounded',
    'ring',
    'ring-transparent',
    'transition-all',
    'hover:border-h66',
    'hover:ring-h4c',
    'disabled:pointer-events-none',
    'disabled:opacity-30',
  ],
  {
    variants: {
      size: {
        default: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
      focus: {
        true: [
          'border-rz-green', 
          'ring-rz-green-border', 
          'hover:border-rz-green',
          'hover:ring-rz-green-border',
        ],
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
    'placeholder:text-h55',
    'placeholder:italic',
    'selection:bg-[#204C19]',
    'selection:text-[#97C390]',
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

export { default as Input } from './Input.vue';
