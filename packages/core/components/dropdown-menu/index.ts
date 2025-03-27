import { PREFIX } from '@/lib/constants';
import { cva } from 'class-variance-authority';

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
export const dropdownMenuContentClass = [
  'z-50',
  'min-w-(--reka-dropdown-menu-trigger-width)',
  'overflow-hidden',
  'rounded',
  'border',
  'px-2',
  'py-1.5',
  `${prefix}-content`,
];

export const dropdownMenuItemClass = [
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
  '[&>svg]:size-4',
  '[&>svg]:shrink-0',
  `${prefix}-item`,
];

export const dropdownMenuCheckboxItemClass = [
  'relative',
  'flex',
  'cursor-default',
  'select-none',
  'items-center',
  'rounded',
  'gap-2',
  'pr-2',
  'pl-8',
  'py-1.5',
  'text-sm',
  'outline-none',
  'transition-colors',
  'data-[disabled]:pointer-events-none',
  'data-[disabled]:opacity-(--disabled-opacity)',
  `${prefix}-item_checkbox`,
];

export const dropdownMenuRadioItemClass = [
  'relative',
  'flex',
  'cursor-default',
  'select-none',
  'items-center',
  'rounded-sm',
  'py-1.5',
  'pl-8',
  'pr-2',
  'text-sm',
  'outline-none',
  'transition-colors',
  'data-[disabled]:pointer-events-none',
  'data-[disabled]:opacity-(--disabled-opacity)',
  `${prefix}-item_radio`,
];

export const dropdownMenuSubTriggerClass = [
  'flex',
  'cursor-default',
  'select-none',
  'items-center',
  'rounded-sm',
  'px-2',
  'py-1.5',
  'text-sm',
  'outline-none',
  `${prefix}-sub-trigger`
];

export const dropdownMenuSubContentClass = [
  'z-50',
  'min-w-(--reka-dropdown-menu-trigger-width)',
  'px-2',
  'py-1.5',
  'rounded',
  'border',
  'overflow-hidden',
  `${prefix}-sub-content`
];

export const dropdownMenuLabelVariant = cva(
  ['px-2', 'py-1.5', 'text-base', `${prefix}-label`],
  {
    variants: {
      inset: {
        true: 'pl-8'
      } 
    }
  }
);

export const dropdownMenuSeparatorClass = [ '-mx-2 my-1.5 h-px', `${prefix}-separator` ];
