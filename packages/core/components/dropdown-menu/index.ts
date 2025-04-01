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
  undefined,
  { className: `${prefix}-content` }
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
      variant: {
        default: ['[&>svg]:size-4', '[&>svg]:shrink-0'],
        checkbox: ['pr-2', 'pl-8'],
        radio: ['pl-8', 'pr-2'],
      },
    },
  },
  { className: `${prefix}-item` }
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
  undefined,
  { className: `${prefix}-sub-trigger` }
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
  undefined,
  { className: `${prefix}-sub-content` }
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
  { className: `${prefix}-label` }
);

export const dropdownMenuSeparatorVariants = cva(['-mx-2 my-1.5 h-px'], undefined, {
  className: `${prefix}-separator`,
});
