import type { VariantProps } from '@rui/core/lib/tv'
import type { VirtualizerOptions } from '@tanstack/vue-virtual'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as VirtualGrid } from './VirtualGrid.vue'
export { default as VirtualGridItem } from './VirtualGridItem.vue'
export { default as VirtualInfiniteLoading } from './VirtualInfiniteLoading.vue'
export { default as VirtualList } from './VirtualList.vue'
export { default as VirtualListItem } from './VirtualListItem.vue'
export { injectVirtualContext, default as VirtualRoot } from './VirtualRoot.tsx'

const prefix = `${PREFIX}-virtual`
export const tvVirtualList = tv(
  {
    slots: {
      base: 'size-full overflow-auto overflow-anchor-none overscroll-contain',
      scroll: 'relative',
    },
    variants: {
      horizontal: {
        true: '',
        false: '',
      },
    },
  },
  {
    slots: {
      base: `${prefix}-list`,
      scroll: `${prefix}-list-scroll`,
    },
  },
)
export type VirtualListVariants = VariantProps<typeof tvVirtualList>

export const tvVirtualInfiniteLoading = tv(
  {
    slots: {
      base: 'w-full h-auto',
      loading: 'flex items-center justify-center',
      spinner: 'animate-spin',
      complete: 'flex items-center justify-center',
      error: 'flex flex-col items-center justify-center',
    },
    variants: {
      size: {
        sm: 'text-sm',
        lg: 'text-lg',
        base: 'text-base',
      },
    },
    defaultVariants: {
      size: 'base',
    },
    compoundVariants: [
      {
        size: 'base',
        class: {
          loading: 'py-2',
          spinner: 'size-6',
          complete: 'py-2',
          error: 'py-2 gap-2',
        },
      },
      {
        size: 'sm',
        class: {
          loading: 'py-1.5',
          spinner: 'size-5',
          complete: 'py-1.5',
          error: 'py-1.5 gap-1',
        },
      },
      {
        size: 'lg',
        class: {
          loading: 'py-3',
          spinner: 'size-7',
          complete: 'py-3',
          error: 'py-3 gap-2.5',
        },
      },
    ],
  },
  {
    slots: {
      base: `${prefix}-infinite`,
      loading: `${prefix}-infinite-loading`,
      spinner: `${prefix}-infinite-spinner`,
      complete: `${prefix}-infinite-complete`,
      error: `${prefix}-infinite-error`,
    },
  },
)
export type VirtualInfiniteLoadingVariants = VariantProps<typeof tvVirtualInfiniteLoading>

export const tvVirtualGrid = tv(
  {
    slots: {
      base: 'size-full overflow-auto overflow-anchor-none overscroll-contain',
      scroll: 'relative',
    },
  },
  {
    slots: {
      base: `${prefix}-grid`,
      scroll: `${prefix}-grid-scroll`,
    },
  },
)
export type VirtualGridVariants = VariantProps<typeof tvVirtualGrid>

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

export interface VirtualGridProps<T> {
  dataSource: Array<T>
  row?: number
  column?: number
  gap?: [number, number]
  rowVirtualizerOptions?: Omit<VirtualListProps<T>, 'dataSource'>
  columnVirtualizerOptions?: Omit<VirtualListProps<T>, 'dataSource'>
}

export enum LOADING_STATE {
  IDLE = 'idle',
  LOADING = 'loading',
  LOADED = 'loaded',
  COMPLETE = 'complete',
  ERROR = 'error',
}
export interface LoadingStateHandler {
  loading: () => void
  loaded: () => void
  complete: () => void
  error: () => void
}
