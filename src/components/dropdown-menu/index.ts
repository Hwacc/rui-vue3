export { default as DropdownMenu } from './DropdownMenu.vue';

export { default as DropdownMenuCheckboxItem } from './DropdownMenuCheckboxItem.vue';
export { default as DropdownMenuContent } from './DropdownMenuContent.vue';
export { default as DropdownMenuGroup } from './DropdownMenuGroup.vue';
export { default as DropdownMenuItem } from './DropdownMenuItem.vue';
export { default as DropdownMenuLabel } from './DropdownMenuLabel.vue';
export { default as DropdownMenuRadioGroup } from './DropdownMenuRadioGroup.vue';
export { default as DropdownMenuRadioItem } from './DropdownMenuRadioItem.vue';
export { default as DropdownMenuSeparator } from './DropdownMenuSeparator.vue';
export { default as DropdownMenuShortcut } from './DropdownMenuShortcut.vue';
export { default as DropdownMenuSub } from './DropdownMenuSub.vue';
export { default as DropdownMenuSubContent } from './DropdownMenuSubContent.vue';
export { default as DropdownMenuSubTrigger } from './DropdownMenuSubTrigger.vue';
export { default as DropdownMenuTrigger } from './DropdownMenuTrigger.vue';

export { DropdownMenuPortal } from 'reka-ui';

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
  'shadow-md',
  'data-[state=open]:animate-in',
  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=open]:fade-in-0',
  'data-[state=closed]:zoom-out-95',
  'data-[state=open]:zoom-in-95',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2',
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
  'data-[disabled]:opacity-50',
];

