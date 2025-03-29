import { VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';

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
    'px-2',
    'py-1.5',
    'text-start',
    'outline-none',
    'disabled:pointer-events-none',
    'disabled:opacity-(--disabled-opacity)',
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
  },
  {
    className: 'rui-select-trigger',
  }
);
export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;

export const selectContentVariants = cva(
  ['relative', 'z-50', 'min-w-(--reka-select-trigger-width)', 'rounded', 'border', 'p-0'],
  {
    variants: {
      position: {
        popper: [],
        'item-aligned': [],
      },
    },
  },
  {
    className: 'rui-select-content',
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
    'outline-none',
    'data-[disabled]:pointer-events-none',
    'data-[disabled]:opacity-(--disabled-opacity)',
  ],
  {
    variants: {
      indicator: {
        true: ['pl-8', 'pr-2'],
      },
    },
  },
  {
    className: 'rui-select-item',
  }
);

export const selectLabelVariants = cva(['py-1.5', 'px-2'], undefined, {
  className: 'rui-select-label',
});

export const selectIconVariants = cva('shrink-0', undefined, { className: 'rui-select-icon' });

export const selectValueVariants = cva(['flex', 'items-center', 'gap-1', 'text-sm'], undefined, {
  className: 'rui-select-value',
});

export const selectSeparatorVariants = cva(['-mx-1', 'my-1', 'h-px'], undefined, {
  className: 'rui-select-separator',
});

export const selectScrollButtonVariants = cva(
  ['flex', 'cursor-default', 'items-center', 'justify-center', 'py-1'],
  {
    variants: {
      dir: {
        up: '',
        down: '',
      },
    },
  },
  {
    className: 'rui-select-scroll-button',
    compound: [
      {
        dir: 'up',
        disableRuiClass: false,
        className: 'rui-select-scroll-button_up',
      },
      { dir: 'down', disableRuiClass: false, className: 'rui-select-scroll-button_down' },
    ],
  }
);
