import type { VirtualizerOptions } from '@tanstack/vue-virtual'

export { default as FixedVirtualList } from './FixedVirtualList.vue'
export { default as FixedVirtualListImpl } from './FixedVirtualListImpl.vue'
export { default as FixedVirtualListItem } from './FixedVirtualListItem.vue'
export { injectVirtualContext, default as VirtualRoot } from './VirtualRoot.tsx'

export interface VirtualListProps<T>
  extends Omit<
    VirtualizerOptions<Element, Element>,
    'count' | 'getScrollElement'
  > {
  dataSource: Array<T>
  direction?: 'vertical' | 'horizontal'
}
