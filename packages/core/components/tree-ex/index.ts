import type { VariantProps } from '@rui/core/lib/tv'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export type { TreeRootProps } from './interface'

export { default as Tree } from './Tree.vue'
export { default as TreeItem } from './TreeItem.vue'
export { default as TreeRoot } from './TreeRoot.vue'

export const prefix = `${PREFIX}-tree`

export const tvTreeRaw = tv(
  {
    slots: {
      base: ['list-none', 'select-none'],
      item: ['flex', 'items-center', 'outline-none', 'pl-(--rui-tree-item-padding-left)'],
    },
  },
  {
    slots: {
      base: `${prefix}`,
      item: `${prefix}-item`,
    },
  },
)

export type TreeRawVariants = VariantProps<typeof tvTreeRaw>

export const tvTree = tv({
  slots: {
    base: 'transition-[height]',
    item: ['min-h-8', 'gap-3'],
    content: ['flex items-center gap-4 min-w-50'],
    title: ['flex items-center justify-between flex-1'],
    arrow: 'data-[expand=true]:rotate-90 transition-transform',
  },
  variants: {
    size: {
      base: '',
      sm: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'base',
  },
  compoundVariants: [
    {
      size: 'base',
      class: {
        item: 'min-h-8 gap-3',
        title: 'text-base',
        arrow: 'size-4',
      },
    },
    {
      size: 'sm',
      class: {
        title: 'text-sm',
        arrow: 'size-3',
      },
    },
    {
      size: 'lg',
      class: {
        title: 'text-lg',
        arrow: 'size-5',
      },
    },
  ],
})

export type TreeVariants = VariantProps<typeof tvTree>
