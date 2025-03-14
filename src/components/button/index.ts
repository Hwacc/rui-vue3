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
        default: [
          'bg-rz-green',
          'text-h00',
          'border-rz-green-border',
          'hover:bg-rz-green-light',
          'hover:border-rz-green-border-hover',
          'hover:ring-rz-green-border-hover',
          'active:bg-rz-green-dark-active',
          'active:border-rz-green-border-active',
          'active:ring-rz-green-border-active',
        ],
        normal: [
          'bg-h70',
          'text-hff',
          'border-h4f',
          'hover:bg-h9b',
          'hover:border-h83',
          'hover:ring-h83',
          'active:bg-h4f',
          'active:border-h37',
          'active:ring-h37',
        ],
        outline: [
          'bg-transparent',
          'text-hcc',
          'border-hcc',
          'hover:border-hff',
          'hover:ring-hff',
          'active:border-hbb',
          'active:ring-hbb',
        ],
        text: [
          'border-none',
          'bg-transparent',
          'text-hcc',
          'hover:bg-h33',
          'hover:text-hff',
          'active:bg-h24',
          'active:text-h8f',
        ],
        icon: [
          'px-0',
          'aspect-square',
          'border-none',
          'bg-transparent',
          'text-hcc',
          'hover:bg-h33',
          'hover:text-hff',
          'active:bg-h24',
          'active:text-h8f',
        ],
        switcher: [
          'justify-start',
          'gap-[.6875rem]',
          'px-3',
          'text-xs',
          '[&_svg]:size-[.625rem]',
          'border-h00',
          'bg-h1a',
          'hover:bg-h5e',
          'hover:border-h4c',
          'hover:ring-h4c',
          'active:bg-h1a',
          'active:border-h00',
          'active:text-ha7',
          'active:ring-h00',
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
        className: [
          'bg-rz-green-dark',
          'border-rz-green-dark',
          'hover:bg-rz-green-dark-hover',
          'hover:border-rz-green-dark-hover',
          'active:bg-rz-green-dark-active',
          'active:border-rz-green-dark-active',
          'active:text-ha7',
        ],
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
