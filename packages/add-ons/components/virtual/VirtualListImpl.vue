<script lang="ts" generic="T" setup>
import type { HTMLAttributes, VNode } from 'vue'
import type { VirtualListProps } from '.'
import { useForwardProps } from '@rui/add-ons/composables/useForwardProps'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { merge } from 'lodash-es'
import { cloneVNode, computed, Fragment, h, useSlots, useTemplateRef } from 'vue'
import { injectVirtualContext, tvVirtualList } from '.'

const { dataSource, unstyled, ui, ...props } = defineProps<
  VirtualListProps<T> & {
    unstyled?: boolean
    ui?: {
      viewport?: {
        class?: HTMLAttributes['class']
      }
      scroll?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()
defineSlots<{ default?: () => any }>()

const virtualContext = injectVirtualContext()
const parentEl = useTemplateRef<Element>('parentEl')
virtualContext.parentEl = parentEl

const forwarded = useForwardProps(props)
const virtualOptions = computed(() => {
  const _staticOptions = {
    enabled: true,
    count: virtualContext.enableInfinite.value ? dataSource.length + 1 : dataSource.length,
    overscan: forwarded.value.overscan ?? 1,
    getScrollElement: () => parentEl.value,
    estimateSize: (index: number) => forwarded.value.estimateSize?.(index) ?? 30,
  }
  return merge({}, forwarded.value, _staticOptions)
})
const virtualizer = useVirtualizer<Element, Element>(virtualOptions)
virtualContext.virtualizer = virtualizer

const slots = useSlots()
const defaultSlotNode = slots.default!()[0]
let itemVNode: VNode | null = null
let infiniteLoadingVNode: VNode | null = null
if (defaultSlotNode.type === Fragment && Array.isArray(defaultSlotNode.children)) {
  defaultSlotNode.children.forEach((child) => {
    if (child) {
      const _cname = ((child as VNode).type as any).name
      if (_cname === 'VirtualInfiniteLoading') {
        infiniteLoadingVNode = child as VNode
        virtualContext.enableInfinite.value = true
      }
      else if (_cname === 'VirtualListItem') {
        itemVNode = child as VNode
      }
    }
  })
}
else {
  itemVNode = defaultSlotNode
}

const virtualizedItems = computed(() => {
  const virtualItems = virtualizer.value.getVirtualItems().map((virtualItem) => {
    const _realIndex = virtualItem.index
    const renderNode = _realIndex < dataSource.length ? itemVNode : infiniteLoadingVNode
    return {
      vItem: virtualItem,
      is: cloneVNode(renderNode ?? h('div'), {
        'data': dataSource[_realIndex],
        'index': _realIndex,
        'key': `${virtualItem.key}`,
        'data-index': _realIndex,
        'aria-setsize': dataSource.length,
        'aria-posinset': _realIndex + 1,
        'style': forwarded.value.horizontal
          ? {
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateX(${virtualItem.start}px)`,
              overflowAnchor: 'none',
            }
          : {
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateY(${virtualItem.start}px)`,
              overflowAnchor: 'none',
            },
      }),
    }
  })
  return virtualItems
})

const scrollAreaStyle = computed(() => {
  const totalSize = virtualizer.value.getTotalSize()
  if (forwarded.value.horizontal) {
    return {
      width: `${totalSize}px`,
      height: '100%',
      position: 'relative' as const,
    }
  }
  return {
    height: `${totalSize}px`,
    width: '100%',
    position: 'relative' as const,
  }
})

const { base, scroll } = tvVirtualList()
defineExpose({
  get virtualizer() {
    return virtualizer.value
  },
})
</script>

<template>
  <div
    ref="parentEl"
    :class="
      base({
        horizontal: forwarded.horizontal,
        unstyled,
        class: [ui?.viewport?.class],
      })
    "
    :data-horizontal="forwarded.horizontal ? true : undefined"
  >
    <!-- scroll area -->
    <div
      :class="scroll({ horizontal: forwarded.horizontal, unstyled, class: ui?.scroll?.class })"
      :style="scrollAreaStyle"
    >
      <!-- items -->
      <component
        :is="is"
        v-for="{ is, vItem } in virtualizedItems"
        :key="vItem.key"
      />
    </div>
  </div>
</template>
