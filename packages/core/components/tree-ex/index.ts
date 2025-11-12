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
    base: [],
    item: ['min-h-8', 'gap-3'],
    content: ['flex items-center justify-between text-base min-w-50 '],
  },
})
