import { VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';
import { PREFIX } from '@/lib/constants';

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

const prefix = `${PREFIX}-select`;
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
    compoundVariants: [
      {
        disableRuiClass: false,
        className: [
          'bg-rui-select-trigger',
          'text-rui-select-trigger-text',
          'border-rui-select-trigger-border',
          'hover:border-rui-select-trigger-border-hover',
          'focus:border-rui-select-trigger-border-focus',
          'data-[state=open]:border-rui-select-trigger-border-open',
          'data-[placeholder]:text-rui-select-trigger-placeholder',
        ],
      },
    ],
  },
  {
    className: `${prefix}-trigger`,
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
    compoundVariants: [
      {
        disableRuiClass: false,
        className: [
          'bg-rui-select-content',
          'text-rui-select-content-text',
          'border-rui-select-content-border',
          'shadow-rui-popper',
        ],
      },
    ],
  },
  {
    className: `${prefix}-content`,
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
    compoundVariants: [
      {
        disableRuiClass: false,
        className: [
          'bg-rui-select-item',
          'hover:bg-rui-select-item-hover',
          'focus:bg-rui-select-item-focus',
          'text-rui-select-item-text',
          'data-[state=checked]:text-rui-select-item-text-checked',
        ],
      },
    ],
  },
  {
    className: `${prefix}-item`,
  }
);

export const selectLabelVariants = cva(
  ['py-1.5', 'px-2'],
  {
    variants: {},
    compoundVariants: [
      {
        disableRuiClass: false,
        className: ['bg-rui-select-label', 'text-rui-select-label-text', 'font-rob-bold'],
      },
    ],
  },
  {
    className: `${prefix}-label`,
  }
);

export const selectTriangleVariants = cva(
  'shrink-0',
  {
    variants: {
      open: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        disableRuiClass: false,
        className: [
          '[&>svg]:fill-rui-select-triangle',
          '[&>svg]:stroke-rui-select-triangle',
          '[&>svg]:group-hover:fill-rui-select-triangle-hover',
          '[&>svg]:group-hover:stroke-rui-select-triangle-hover',
        ],
      },
      {
        disableRuiClass: false,
        open: true,
        className: [
          '[&>svg]:fill-rui-select-triangle-open',
          '[&>svg]:stroke-rui-select-triangle-open',
        ],
      },
    ],
  },
  {
    className: `${prefix}-triangle`,
  }
);

export const selectValueVariants = cva(
  ['flex', 'items-center', 'gap-1', 'text-sm', '[&>span]:rounded-[.875rem]', '[&>span]:text-xs'],
  {
    variants: {},
    compoundVariants: [
      {
        disableRuiClass: false,
        className: [
          '[&>span]:bg-rui-select-value',
          '[&>span]:text-rui-select-value-text',
          '[&_svg]:stroke-rui-close',
          '[&_svg]:hover:stroke-rui-close-hover',
        ],
      },
    ],
  },
  {
    className: `${prefix}-value`,
  }
);

export const selectSeparatorVariants = cva(['-mx-1', 'my-1', 'h-px'], undefined, {
  className: `${prefix}-separator`,
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
    className: `${prefix}-scroll-button`,
    compound: [
      {
        dir: 'up',
        disableRuiClass: false,
        className: `${prefix}-scroll-button_up`,
      },
      { dir: 'down', disableRuiClass: false, className: `${prefix}-scroll-button_down` },
    ],
  }
);
