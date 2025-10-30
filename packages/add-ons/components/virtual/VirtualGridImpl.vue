<script setup generic="T" lang="ts">
import type { HTMLAttributes } from 'vue'
import type { VirtualGridProps } from '.'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { cloneVNode, computed, h, useTemplateRef } from 'vue'
import { injectVirtualContext, tvVirtualGrid } from '.'
import { useDetectSlotNode } from './composables/useDetectSlotNode'

const {
  dataSource,
  row,
  column,
  gap = [0, 0],
  ...props
} = defineProps<
  VirtualGridProps<T> & {
    unstyled?: boolean
    ui?: {
      class?: HTMLAttributes['class']
      viewport?: {
        class?: HTMLAttributes['class']
      }
      scroll?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()

const virtualContext = injectVirtualContext()
const parentEl = useTemplateRef<Element>('parentEl')
virtualContext.parentEl = parentEl

const grid = computed<[number, number]>(() => {
  if (row && !column) {
    return [row, Math.ceil(dataSource.length / row)]
  } else if (!row && column) {
    return [Math.ceil(dataSource.length / column), column]
  }
  return [row ?? 1, column ?? dataSource.length]
})

const rowVirtualizer = useVirtualizer<Element, Element>({
  enabled: true,
  count: grid.value[0],
  gap: gap[0],
  overscan: 1,
  getScrollElement: () => parentEl.value,
  estimateSize: () => 30,
})
virtualContext.rowVirtualizer = rowVirtualizer
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())

const colVirtualizer = useVirtualizer<Element, Element>({
  enabled: true,
  count: grid.value[1],
  gap: gap[1],
  overscan: 1,
  horizontal: true,
  getScrollElement: () => parentEl.value,
  estimateSize: () => 30,
})
virtualContext.columnVirtualizer = colVirtualizer
const virtualColumns = computed(() => colVirtualizer.value.getVirtualItems())

const { itemVNode, infiniteVNode } = useDetectSlotNode()

const virtualizedRows = computed(() => {
  return virtualRows.value.map((virtualRow) => {
    const rowIndex = virtualRow.index
    const colVNodes = virtualColumns.value.map((virtualColumn) => {
      const colIndex = virtualColumn.index
      const realIndex = rowIndex * grid.value[1] + colIndex
      const data = dataSource[realIndex]
      return {
        vItem: virtualColumn,
        is: cloneVNode(itemVNode ?? h('div'), {
          key: `col-${virtualColumn.key}`,
          data,
          index: realIndex,
          rowIndex,
          colIndex,
        }),
      }
    })
    const rowVNode =
      rowIndex < grid.value[0]
        ? h(
            'div',
            {
              'class': ['absolute flex top-0 left-0'],
              'data-index': rowIndex,
              'key': `row-${virtualRow.key}`,
              'style': {
                gap: `${gap[1]}px`,
                transform: `
                 translateX(${colVNodes[0].vItem.start}px)
                 translateY(${virtualRow.start - rowVirtualizer.value.options.scrollMargin}px)
                `,
              },
            },
            colVNodes.map((colVNode) => colVNode.is)
          )
        : infiniteVNode ?? h('div')
    return {
      vItem: virtualRow,
      is: rowVNode,
    }
  })
})

const totalSizeRows = computed(() => rowVirtualizer.value.getTotalSize())
const totalSizeColumns = computed(() => colVirtualizer.value.getTotalSize())

function measureElement(el: Element) {
  if (rowVirtualizer.value && el) rowVirtualizer.value.measureElement(el)
}
const { base, scroll } = tvVirtualGrid()
</script>

<template>
  <div
    ref="parentEl"
    :class="
      base({
        unstyled,
        class: [ui?.viewport?.class],
      })
    "
  >
    <!-- scroll area -->
    <div
      :class="scroll({ unstyled, class: ui?.scroll?.class })"
      :style="{
        width: `${totalSizeColumns}px`,
        height: `${totalSizeRows}px`,
      }"
    >
      <component
        :is="is"
        v-for="{ vItem, is } in virtualizedRows"
        :key="vItem.key"
        :ref="measureElement"
      />
    </div>
  </div>
</template>
