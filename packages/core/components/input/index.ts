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
    compound: [
      {
        disableRuiClass: false,
        className: [
          'bg-rui-input',
          'border-rui-input-border',
          'hover:border-rui-input-border-hover',
          'text-rui-input-text',
        ],
      },
      {
        disableRuiClass: false,
        focus: true,
        className: ['border-rui-input-border-focus', 'hover:border-rui-input-border-focus'],
      },
    ],
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
    compound: [
      {
        disableRuiClass: false,
        className: [
          'placeholder:text-rui-input-placeholder',
          'placeholder:italic',
          'selection:bg-rui-input-selection',
          'selection:text-rui-input-selection-text',
        ],
      },
    ],
  }
);
export type InputInnerVariants = VariantProps<typeof inputInnerVariants>;

export const inputClearableVariants = cva(
  'flex items-center justify-center',
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
    compound: [
      {
        disableRuiClass: false,
        className: [
          '[&_svg]:fill-rui-close',
          '[&_svg]:stroke-black',
          '[&_svg]:hover:fill-rui-close-hover',
        ],
      },
    ],
  }
);
