import { VariantProps } from 'class-variance-authority';
import { cva } from '@rui/core/lib/cva';
import { PREFIX } from '@rui/core/lib/constants';

export { default as Select } from './Select.vue';
export { default as SelectContent } from './SelectContent.vue';
export { default as SelectItem } from './SelectItem.vue';
export { default as SelectLabel } from './SelectLabel.vue';
export { default as SelectScrollDownButton } from './SelectScrollDownButton.vue';
export { default as SelectScrollUpButton } from './SelectScrollUpButton.vue';
export { default as SelectSeparator } from './SelectSeparator.vue';
export { default as SelectTrigger } from './SelectTrigger.vue';
export { default as SelectValue } from './SelectValue.vue';
export { default as SelectMouseTrigger } from './SelectMouseTrigger.vue';

export { SelectGroup, SelectItemText } from 'reka-ui';

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
    'disabled:pointer-events-none',
    'disabled:opacity-(--disabled-opacity)',
    'transition-colors',
    '[&>span]:flex-1',
    '[&>span]:truncate',
  ],
  {
    variants: {
      size: {
        base: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
    },
    defaultVariants: {
      size: 'base',
    },
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
        popper: '',
        'item-aligned': '',
      },
    },
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
  },
  { className: `${prefix}-item` }
);

export const selectLabelVariants = cva(['py-1.5', 'px-2'], undefined, {
  className: `${prefix}-label`,
});

export const selectTriangleVariants = cva('shrink-0', undefined, {
  className: `${prefix}-triangle`,
});

export const selectValueVariants = cva(
  ['flex', 'items-center', 'gap-1', 'text-sm', '[&>span]:rounded-[.875rem]', '[&>span]:text-xs'],
  undefined,
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
  }
);
