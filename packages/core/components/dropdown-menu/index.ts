import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as DropdownMenu } from './DropdownMenu.vue'
export { default as DropdownMenuCheckboxItem } from './DropdownMenuCheckboxItem.vue'
export { default as DropdownMenuContent } from './DropdownMenuContent.vue'
export { default as DropdownMenuItem } from './DropdownMenuItem.vue'
export { default as DropdownMenuLabel } from './DropdownMenuLabel.vue'
export { default as DropdownMenuRadioItem } from './DropdownMenuRadioItem.vue'
export { default as DropdownMenuSeparator } from './DropdownMenuSeparator.vue'
export { default as DropdownMenuShortcut } from './DropdownMenuShortcut.vue'
export { default as DropdownMenuSubContent } from './DropdownMenuSubContent.vue'
export { default as DropdownMenuSubTrigger } from './DropdownMenuSubTrigger.vue'

export { default as DropdownMenuTrigger } from './DropdownMenuTrigger.vue'
export {
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
} from 'reka-ui'

export type {
  DropdownMenuRootEmits as DropdownMenuEmits,
  DropdownMenuRootProps as DropdownMenuProps,
} from 'reka-ui'

const prefix = `${PREFIX}-dropdown-menu`

export const tvDropdownMenu = tv(
  {
    base: '',
    variants: {
      positionStrategy: {
        absolute: 'relative',
        fixed: '',
      },
    },
  },
  {
    class: prefix,
  },
)

export const tvTrigger = tv(
  {
    base: ['group', 'rounded'],
  },
  {
    class: `${prefix}-trigger`,
  },
)

export const tvContent = tv(
  {
    base: [
      'z-(--z-dropdown)',
      'min-w-(--reka-dropdown-menu-trigger-width)',
      'overflow-hidden',
      'rounded',
      'border',
      'px-2',
      'py-1.5',
    ],
  },
  {
    class: `${prefix}-content`,
  },
)

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
        checkbox: '',
        radio: '',
      },
    },
  },
  {
    class: `${prefix}-item`,
  },
)

export const tvItemRadio = tv(
  {
    extend: tvItem,
    slots: {
      indicator: ['absolute', 'left-2', 'flex', 'h-3.5', 'w-3.5', 'items-center', 'justify-center'],
    },
    defaultVariants: {
      variant: 'radio',
    },
    compoundSlots: [
      {
        // @ts-expect-error tailwind-variants have base
        slots: ['base'],
        variant: 'radio',
        class: ['pl-8', 'pr-2'],
      },
    ],
  },
  {
    class: `${prefix}-item-radio`,
    slots: {
      indicator: `${prefix}-item-radio-indicator`,
    },
  },
)

export const tvItemCheckbox = tv(
  {
    extend: tvItem,
    slots: {
      indicator: ['absolute', 'left-2', 'flex', 'size-3.5', 'items-center', 'justify-center'],
    },
    defaultVariants: {
      variant: 'checkbox',
    },
    compoundSlots: [
      {
        // @ts-expect-error tailwind-variants have base
        slots: ['base'],
        variant: 'checkbox',
        class: ['pr-2', 'pl-8'],
      },
    ],
  },
  {
    class: `${prefix}-item-checkbox`,
    slots: {
      indicator: `${prefix}-item-checkbox-indicator`,
    },
  },
)

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
  },
)

export const tvSubContent = tv(
  {
    extend: tvContent,
  },
  {
    slots: {
      content: `${prefix}-content ${prefix}-sub-content`,
    },
  },
)

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
  },
)

export const tvSeparator = tv(
  {
    base: ['-mx-2 my-1.5 h-px'],
  },
  {
    class: `${prefix}-separator`,
  },
)
