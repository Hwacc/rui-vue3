import type { VariantProps } from '@rui/core/lib/tv'
import type { VirtualizerOptions } from '@tanstack/vue-virtual'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as VirtualList } from './VirtualList.vue'
export { default as VirtualListImpl } from './VirtualListImpl.vue'
export { default as VirtualListItem } from './VirtualListItem.vue'
export { injectVirtualContext, default as VirtualRoot } from './VirtualRoot.tsx'

const prefix = `${PREFIX}-virtual-list`
export const tvVirtualList = tv(
  {
    slots: {
      base: 'flex overflow-hidden',
      viewport: 'flex-1 size-full overflow-auto',
      scroll: '',
    },
    variants: {
      horizontal: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        horizontal: true,
        class: {
          base: 'flex-row',
        },
      },
      {
        horizontal: false,
        class: {
          base: 'flex-col',
        },
      },
    ],
  },
  {
    slots: {
      base: `${prefix}`,
      viewport: `${prefix}-viewport`,
      scroll: `${prefix}-scroll`,
    },
  },
)

export type VirtualListVariants = VariantProps<typeof tvVirtualList>

export interface VirtualListProps<T>
  extends Omit<
    VirtualizerOptions<Element, Element>,
    | 'enabled'
    | 'count'
    | 'getScrollElement'
    | 'estimateSize'
    | 'scrollToFn'
    | 'observeElementRect'
    | 'observeElementOffset'
  > {
  dataSource: Array<T>
  estimateSize?: VirtualizerOptions<Element, Element>['estimateSize']
  scrollToFn?: VirtualizerOptions<Element, Element>['scrollToFn']
  observeElementRect?: VirtualizerOptions<Element, Element>['observeElementRect']
  observeElementOffset?: VirtualizerOptions<Element, Element>['observeElementOffset']
}
