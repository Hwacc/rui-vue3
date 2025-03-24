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

export const dropdownMenuContentClass = [
  'z-50',
  'min-w-(--reka-dropdown-menu-trigger-width)',
  'overflow-hidden',
  'rounded',
  'border',
  'border-h11',
  'bg-h1a',
  'px-2',
  'py-1.5',
  'text-hcc',
  'shadow-md'
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
  'hover:bg-hff/10',
  'hover:text-hff',
  'focus:bg-hff/10',
  'focus:text-hff',
  'data-[disabled]:pointer-events-none',
  'data-[disabled]:opacity-50',
  '[&>svg]:size-4',
  '[&>svg]:shrink-0',
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
  'hover:bg-hff/10',
  'hover:text-hff',
  'focus:bg-hff/10',
  'focus:text-hff',
  'data-[disabled]:pointer-events-none',
  'data-[disabled]:opacity-30',
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
  'hover:bg-hff/10',
  'hover:text-hff',
  'focus:bg-hff/10',
  'focus:text-hff',
  'data-[disabled]:pointer-events-none',
  'data-[disabled]:opacity-30',
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
  'hover:bg-hff/10',
  'hover:text-hff',
  'focus:bg-hff/10',
  'focus:text-hff',
  'data-[state=open]:bg-hff/10',
];

export const dropdownMenuSubContentClass = [
  'z-50',
  'min-w-(--reka-dropdown-menu-trigger-width)',
  'rounded',
  'border',
  'border-h11',
  'bg-h1a',
  'px-2',
  'py-1.5',
  'text-hcc',
  'shadow-lg',
  'overflow-hidden',
];
