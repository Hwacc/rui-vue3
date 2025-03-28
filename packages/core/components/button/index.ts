import { PREFIX } from '@/lib/constants';
// import { cva, type VariantProps } from 'class-variance-authority';
import { cva, type VariantProps } from '@/lib/cva';

export { default as Button } from './Button.vue';

const prefix = `${PREFIX}-btn`;
export const buttonVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'px-4',
    'gap-2',
    'whitespace-nowrap',
    'rounded',
    'border',
    'text-sm',
    'font-medium',
    'transition-all',
    'ring',
    'ring-transparent',
    'disabled:pointer-events-none',
    'disabled:opacity-(--disabled-opacity)',
    '[&_svg]:pointer-events-none',
    '[&_svg]:size-3.5',
    '[&_svg]:shrink-0',
  ],
  {
    variants: {
      type: {
        default: '',
        normal: '',
        outline: '',
        text: '',
        icon: ['px-0', 'aspect-square', 'border-none'],
        switcher: ['justify-start', 'gap-[.6875rem]', 'px-3', 'text-xs', '[&_svg]:size-[.625rem]'],
      },
      size: {
        default: 'h-[1.75rem]',
        sm: 'h-[1.5rem] text-xs',
        lg: 'h-[2rem] text-base',
      },
      limitWidth: {
        true: 'min-w-[5.625rem]',
      },
    },
    compoundVariants: [
      {
        type: 'icon',
        size: 'lg',
        className: '[&_svg]:size-4',
      },
      {
        type: 'icon',
        size: 'sm',
        className: '[&_svg]:size-3',
      },
      {
        type: 'switcher',
        limitWidth: true,
        className: 'min-w-[8.875rem]',
      },
      {
        type: 'switcher',
        size: 'lg',
        className: '[&_svg]:size-3',
      },
    ],
    defaultVariants: {
      type: 'default',
      size: 'default',
      limitWidth: true,
    },
  },
  {
    compound: [
      { type: 'default', disableRuiClass: false, className: `${prefix}_default` },
      { type: 'normal', disableRuiClass: false, className: `${prefix}_normal` },
      { type: 'outline', disableRuiClass: false, className: `${prefix}_outline` },
      { type: 'text', disableRuiClass: false, className: `${prefix}_text` },
      { type: 'icon', disableRuiClass: false, className: `${prefix}_icon` },
      { type: 'switcher', disableRuiClass: false, className: `${prefix}_switcher` },
    ],
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
