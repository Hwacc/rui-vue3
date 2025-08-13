import { PREFIX } from '@rui/core/lib/constants';
import { tv } from '@rui/core/lib/tv';

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
  DropdownMenuRoot as DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
} from 'reka-ui';
export type {
  DropdownMenuRootEmits as DropdownMenuEmits,
  DropdownMenuRootProps as DropdownMenuProps,
} from 'reka-ui';

const prefix = `${PREFIX}-dropdown-menu`;

export const tvTrigger = tv(
  {
    base: ['group', 'rounded'],
  },
  {
    class: `${prefix}-trigger`,
  }
);

export const tvContent = tv(
  {
    slots: {
      wrapper: '',
      content: [
        'z-50',
        'min-w-(--reka-dropdown-menu-trigger-width)',
        'overflow-hidden',
        'rounded',
        'border',
        'px-2',
        'py-1.5',
      ],
    },
  },
  {
    slots: {
      wrapper: `${prefix}-wrapper`,
      content: `${prefix}-content`,
    },
  }
);

export const tvItem = tv(
  {
    base: [
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
    variants: {
      variant: {
        default: ['[&>svg]:size-4', '[&>svg]:shrink-0'],
        checkbox: ['pr-2', 'pl-8'],
        radio: ['pl-8', 'pr-2'],
      },
    },
  },
  {
    class: `${prefix}-item`,
  }
);

export const tvItemRadio = tv(
  {
    extend: tvItem,
    slots: {
      indicator: ['absolute', 'left-2', 'flex', 'h-3.5', 'w-3.5', 'items-center', 'justify-center'],
    },
  },
  {
    class: `${prefix}-item-radio`,
    slots: {
      indicator: `${prefix}-item-radio-indicator`,
    },
  }
);

export const tvSubTrigger = tv(
  {
    base: [
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
  },
  {
    class: `${prefix}-sub-trigger`,
  }
);

export const tvSubContent = tv(
  {
    extend: tvContent,
  },
  {
    class: `${prefix}-sub-content`,
  }
);

export const tvLabel = tv(
  {
    base: ['px-2', 'py-1.5', 'text-base'],
    variants: {
      inset: {
        true: 'pl-8',
      },
    },
  },
  {
    class: `${prefix}-label`,
  }
);

export const tvSeparator = tv(
  {
    base: ['-mx-2 my-1.5 h-px'],
  },
  {
    class: `${prefix}-separator`,
  }
);
