import { cva, VariantProps } from 'class-variance-authority';

export { default as SelectContent } from './SelectContent.vue';
export { default as SelectItem } from './SelectItem.vue';
export { default as SelectLabel } from './SelectLabel.vue';
export { default as SelectScrollDownButton } from './SelectScrollDownButton.vue';
export { default as SelectScrollUpButton } from './SelectScrollUpButton.vue';
export { default as SelectSeparator } from './SelectSeparator.vue';
export { default as SelectTrigger } from './SelectTrigger.vue';
export { default as SelectValue } from './SelectValue.vue';
export { default as SelectMouseTrigger } from './SelectMouseTrigger.vue';

export { SelectRoot as Select, SelectGroup, SelectItemText } from 'reka-ui';
export type { SelectRootProps as SelectProps, SelectRootEmits as SelectEmits } from 'reka-ui';

export const selectTriggerVariants = cva(
  [
    'group',
    'flex',
    'items-center',
    'min-w-[10.875rem]',
    'rounded',
    'gap-1.5',
    'border',
    'border-h00',
    'bg-h16',
    'px-2',
    'py-1.5',
    'text-start',
    'text-hbb',
    'data-[placeholder]:text-h55',
    'hover:border-rz-green',
    'focus:border-rz-green',
    'data-[state=open]:border-rz-green',
    'outline-none',
    'disabled:pointer-events-none',
    'disabled:opacity-30',
    'transition-colors',
    '[&>span]:flex-1',
    '[&>span]:truncate',
  ],
  {
    variants: {
      size: {
        default: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);
export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;

export const selectContentVariants = cva(
  [
    'relative',
    'z-50',
    'min-w-(--reka-select-trigger-width)',
    'rounded',
    'border',
    'border-h11',
    'bg-h1a',
    'p-0',
    'text-hcc',
    'shadow-black'
  ],
  {
    variants: {
      position: {
        popper: [],
        'item-aligned': [],
      },
    },
  }
);
export type SelectContentVariants = VariantProps<typeof selectContentVariants>;

export const selectItemVariants = cva(
  [
    'relative',
    'flex',
    'w-full',
    'cursor-default',
    'select-none',
    'items-center',
    'rounded-sm',
    'py-1.5',
    'px-2',
    'text-sm',
    'text-hbb',
    'outline-none',
    'focus:bg-h28',
    'hover:bg-h28',
    'data-[state=checked]:text-rz-green',
    'data-[disabled]:pointer-events-none',
    'data-[disabled]:opacity-30',
  ],
  {
    variants: {
      indicator: {
        true: ['pl-8', 'pr-2'],
      },
    },
  }
);
