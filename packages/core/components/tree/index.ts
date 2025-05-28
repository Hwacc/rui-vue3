import type { VariantProps } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export { default as Tree } from './Tree.vue'
export { default as TreeItem } from './TreeItem.vue'
export { default as TreeRoot } from './TreeRoot.vue'

export const prefix = `${PREFIX}-tree`
export const treeRootVariants = cva(
  ['list-none', 'select-none'],
  {
    variants: {
      size: {
        sm: ['text-sm'],
        base: ['text-base'],
        lg: ['text-lg'],
      },
    },
  },
  {
    className: `${prefix}-root`,
  },
)

export type TreeRootVariants = VariantProps<typeof treeRootVariants>

export const treeItemVariants = cva(
  [
    'flex',
    'items-center',
    'outline-none',
  ],
  {
    variants: {
      size: {
        sm: ['text-sm'],
        base: ['text-base'],
        lg: ['text-lg'],
      },
    },
  },
  {
    className: `${prefix}-item`,
  },
)

export const treeItemContentVariants = cva(
  [
    'flex',
    'items-center',
    'outline-none',
  ],
  {
    variants: {
      size: {
        sm: ['text-sm'],
        base: ['text-base'],
        lg: ['text-lg'],
      },
    },
  },
  {
    className: `${prefix}-item-content`,
  },
)
