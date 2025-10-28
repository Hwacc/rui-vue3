<script lang="ts" generic="T" setup>
import type { HTMLAttributes, VNode } from 'vue'
import type { VirtualListProps } from '.'
import InfiniteLoading from '@codog/vue3-infinite-loading'
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
    count: dataSource.length,
    overscan: forwarded.value.overscan ?? 1,
    getScrollElement: () => parentEl.value,
    estimateSize: (index: number) => forwarded.value.estimateSize?.(index) ?? 30,
  }
  return merge({}, forwarded.value, _staticOptions)
})
const virtualizer = useVirtualizer<Element, Element>(virtualOptions)
virtualContext.virtualizer = virtualizer
defineExpose({
  virtualizer,
})

const slots = useSlots()
const virtualizedItems = computed(() => {
  if (slots.loading) {
    const loadingNode = slots.loading()[0]
    console.log('loadingNode', loadingNode)
  }
  const virtualItems = virtualizer.value.getVirtualItems().map((virtualItem) => {
    const defaultNode = slots.default!()[0]
    const targetNode
      = defaultNode.type === Fragment && Array.isArray(defaultNode.children)
        ? (defaultNode.children[0] as VNode)
        : defaultNode
    return {
      vItem: virtualItem,
      is: cloneVNode(targetNode, {
        'data': dataSource[virtualItem.index],
        'index': virtualItem.index,
        'key': `${virtualItem.key}`,
        'data-index': virtualItem.index,
        'aria-setsize': dataSource.length,
        'aria-posinset': virtualItem.index + 1,
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
  virtualItems.splice(virtualItems.length - 1, 1, {
    vItem: { ...virtualItems[virtualItems.length - 1]?.vItem, key: 'loading' },
    is: h(InfiniteLoading, {
      style: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translateY(${virtualItems[virtualItems.length - 1]?.vItem.start}px)`,
        overflowAnchor: 'none',
      },
    }),
  })
  console.log('virtualItems', virtualItems)
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

const { viewport, scroll } = tvVirtualList()
</script>

<template>
  <div
    ref="parentEl"
    :class="
      viewport({
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
      <template
        v-for="{ is, vItem } in virtualizedItems"
        :key="vItem.key"
      >
        <component
          :is="is"
          v-if="vItem.key !== 'loading'"
          :key="vItem.key"
        />
        <component
          :is="is"
          v-else
        />
      </template>
    </div>
  </div>
</template>
