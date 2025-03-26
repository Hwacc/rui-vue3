import { cva, type VariantProps } from 'class-variance-authority';

export { default as Button } from './Button.vue';

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
    'disabled:opacity-30',
    '[&_svg]:pointer-events-none',
    '[&_svg]:size-3.5',
    '[&_svg]:shrink-0',
  ],
  {
    variants: {
      type: {
        default: 'btn-default',
        normal: 'btn-nomal',
        outline: 'btn-outline',
        text: 'btn-text',
        icon: ['px-0', 'aspect-square', 'border-none', 'btn-icon'],
        switcher: [
          'justify-start',
          'gap-[.6875rem]',
          'px-3',
          'text-xs',
          '[&_svg]:size-[.625rem]',
          'btn-switcher',
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
      checked: {
        true: '',
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
        checked: true,
        className: 'btn-switcher-checked',
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
