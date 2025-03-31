import { PREFIX } from '@/lib/constants';
import { cva } from '@/lib/cva';

export { default as DropdownMenuCheckboxItem } from './DropdownMenuCheckboxItem.vue';
export { default as DropdownMenuContent } from './DropdownMenuContent.vue';
export { default as DropdownMenuItem } from './DropdownMenuItem.vue';
export { default as DropdownMenuLabel } from './DropdownMenuLabel.vue';
export { default as DropdownMenuRadioItem } from './DropdownMenuRadioItem.vue';
export { default as DropdownMenuSeparator } from './DropdownMenuSeparator.vue';
export { default as DropdownMenuShortcut } from './DropdownMenuShortcut.vue';
export { default as DropdownMenuSubContent } from './DropdownMenuSubContent.vue';
export { default as DropdownMenuSubTrigger } from './DropdownMenuSubTrigger.vue';
export { default as DropdownMenuTrigger } from './DropdownMenuTrigger.vue';

export {
  DropdownMenuPortal,
  DropdownMenuGroup,
  DropdownMenuRoot as DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
} from 'reka-ui';
export type {
  DropdownMenuRootProps as DropdownMenuProps,
  DropdownMenuRootEmits as DropdownMenuEmits,
} from 'reka-ui';

const prefix = `${PREFIX}-dropdown-menu`;
export const dropdownMenuContentVariants = cva(
  [
    'z-50',
    'min-w-(--reka-dropdown-menu-trigger-width)',
    'overflow-hidden',
    'rounded',
    'border',
    'px-2',
    'py-1.5',
  ],
  { variants: {} },
  {
    className: `${prefix}-content`,
    compound: [
      {
        disableRuiClass: false,
        className: [
          'bg-rui-dropdown',
          'border-rui-dropdown-border',
          'text-rui-dropdown-text',
          'shadow-rui-popper',
        ],
      },
    ],
  }
);

export const dropdownMenuItemVariants = cva(
  [
    'relative',
    'flex',
    'cursor-default',
    'select-none',
    'items-center',
    'rounded',
    'gap-2',
    'px-2',
    'py-1.5',
    'text-sm',
    'outline-none',
    'transition-colors',
    'data-[disabled]:pointer-events-none',
    'data-[disabled]:opacity-(--disabled-opacity)',
  ],
  {
    variants: {
      type: {
        default: ['[&>svg]:size-4', '[&>svg]:shrink-0'],
        checkbox: ['pr-2', 'pl-8'],
        radio: ['pl-8', 'pr-2'],
      },
    },
  },
  {
    className: `${prefix}-item`,
    compound: [
      {
        disableRuiClass: false,
        className: [
          'bg-rui-dropdown-item',
          'text-rui-dropdown-item-text',
          'hover:bg-rui-dropdown-item-hover',
          'hover:text-rui-dropdown-item-text-hover',
          'focus:bg-rui-dropdown-item-focus',
          'focus:text-rui-dropdown-item-text-focus',
        ],
      },
      {
        type: 'checkbox',
        className: `${prefix}-item_checkbox`,
      },
      {
        type: 'radio',
        className: [
          '[&_svg]:fill-rui-dropdown-item-radio',
          '[&_svg]:stroke-rui-dropdown-item-radio',
          `${prefix}-item_radio`,
        ],
      },
    ],
  }
);

export const dropdownMenuSubTriggerVariants = cva(
  [
    'flex',
    'cursor-default',
    'select-none',
    'items-center',
    'rounded-sm',
    'px-2',
    'py-1.5',
    'text-sm',
    'outline-none',
  ],
  { variants: {} },
  {
    className: `${prefix}-sub-trigger`,
    compound: [
      {
        disableRuiClass: false,
        className: [
          'bg-rui-dropdown-item',
          'text-rui-dropdown-item-text',
          'hover:bg-rui-dropdown-item-hover',
          'hover:text-rui-dropdown-item-text-hover',
          'focus:bg-rui-dropdown-item-focus',
          'focus:text-rui-dropdown-item-text-focus',
          'data-[state=open]:bg-rui-dropdown-item-focus',
          'data-[state=open]:text-rui-dropdown-item-text-focus',
        ],
      },
    ],
  }
);

export const dropdownMenuSubContentVariants = cva(
  [
    'z-50',
    'min-w-(--reka-dropdown-menu-trigger-width)',
    'px-2',
    'py-1.5',
    'rounded',
    'border',
    'overflow-hidden',
  ],
  { variants: {} },
  {
    className: `${prefix}-sub-content`,
    compound: [
      {
        disableRuiClass: false,
        className: [
          'bg-rui-dropdown',
          'border-rui-dropdown-border',
          'text-rui-dropdown-text',
          'shadow-rui-popper',
        ],
      },
    ],
  }
);

export const dropdownMenuLabelVariants = cva(
  ['px-2', 'py-1.5', 'text-base'],
  {
    variants: {
      inset: {
        true: 'pl-8',
      },
    },
  },
  {
    className: `${prefix}-label`,
    compound: [
      {
        disableRuiClass: false,
        className: 'text-rui-label',
      },
    ],
  }
);

export const dropdownMenuSeparatorVariants = cva(
  ['-mx-2 my-1.5 h-px'],
  { variants: {} },
  {
    className: `${prefix}-separator`,
    compound: [
      {
        disableRuiClass: false,
        className: 'bg-rui-separator',
      },
    ],
  }
);
