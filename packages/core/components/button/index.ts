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
        normal: `${prefix}_normal`,
        outline: `${prefix}_outline`,
        text: `${prefix}_text`,
        icon: ['px-0', 'aspect-square', 'border-none', `${prefix}_icon`],
        switcher: [
          'justify-start',
          'gap-[.6875rem]',
          'px-3',
          'text-xs',
          '[&_svg]:size-[.625rem]',
          `${prefix}_switcher`,
        ],
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
        type: 'default',
        ruiPrefix: true,
        className: `${prefix}_default`,
      },
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
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
