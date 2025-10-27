<script lang="ts" generic="T" setup>
import type { VNode } from 'vue'
import type { VirtualListProps } from '.'
import { useForwardProps } from '@rui/add-ons/composables/useForwardProps'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { merge } from 'lodash-es'
import { cloneVNode, computed, Fragment, useSlots, useTemplateRef, watch } from 'vue'
import { injectVirtualContext } from '.'

const { dataSource, ...props } = defineProps<VirtualListProps<T>>()
defineSlots<{
  default?: (props: { data: T }) => any
}>()

const virtualContext = injectVirtualContext()
const parentEl = useTemplateRef<Element>('parentEl')
virtualContext.parentEl = parentEl

const forwarded = useForwardProps(props)
const defaultOptions = computed(() => ({
  enabled: true,
  count: dataSource.length,
  overscan: forwarded.value.overscan ?? 1,
  getScrollElement: () => parentEl.value,
  estimateSize: (index: number) => forwarded.value.estimateSize?.(index) ?? 30,
}))
const virtualizer = useVirtualizer<Element, Element>(
  merge({}, forwarded.value, defaultOptions.value),
)
virtualContext.virtualizer = virtualizer
watch(forwarded, (newOptions) => {
  if (virtualizer.value) {
    virtualizer.value.setOptions(
      merge({}, virtualizer.value.options, newOptions, defaultOptions.value),
    )
  }
})
defineExpose({
  virtualizer,
})

const slots = useSlots()
const virtualizedItems = computed(() => {
  return virtualizer.value.getVirtualItems().map((virtualItem) => {
    const defaultNode = slots.default!({
      data: dataSource[virtualItem.index],
    })[0]

    const targetNode
      = defaultNode.type === Fragment && Array.isArray(defaultNode.children)
        ? (defaultNode.children[0] as VNode)
        : defaultNode
    return {
      item: virtualItem,
      is: cloneVNode(targetNode, {
        'key': `${virtualItem.key}`,
        'data-index': virtualItem.index,
        'aria-setsize': dataSource.length,
        'aria-posinset': virtualItem.index + 1,
        'style': {
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `translateY(${virtualItem.start}px)`,
          overflowAnchor: 'none',
        },
      }),
    }
  })
})

const totalSize = computed(() => virtualizer.value.getTotalSize())
</script>

<template>
  <div
    ref="parentEl"
    :style="{ height: `400px`, width: '100%', overflow: 'auto' }"
  >
    <!-- scroll area -->
    <div :style="{ height: `${totalSize}px`, width: '100%', position: 'relative' }">
      <!-- items -->
      <component
        :is="is"
        v-for="{ is, item } in virtualizedItems"
        :key="item.key"
        :data="dataSource[item.index]"
      />
    </div>
  </div>
</template>
