<script lang="ts">
import type { VirtualizerOptions } from '@tanstack/vue-virtual'
import { filter, merge } from 'lodash-es'
import { useForwardProps } from 'reka-ui'

interface TreeVirtualizerProps
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
  estimateSize?: VirtualizerOptions<Element, Element>['estimateSize']
  scrollToFn?: VirtualizerOptions<Element, Element>['scrollToFn']
  observeElementRect?: VirtualizerOptions<Element, Element>['observeElementRect']
  observeElementOffset?: VirtualizerOptions<Element, Element>['observeElementOffset']
}
</script>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { computed, useTemplateRef } from 'vue'
import { injectTreeRootContext, tvTreeRaw } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  TreeVirtualizerProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()

const treeContext = injectTreeRootContext()
const { store } = treeContext
const parentEl = useTemplateRef<Element>('parentEl')
const forwarded = useForwardProps(props)

const renderNodes = computed(() => {
  return filter(store.flatData, node => node.visible)
})

const virtualOptions = computed(() => {
  const _staticOptions = {
    enabled: true,
    count: renderNodes.value.length,
    overscan: forwarded.value.overscan ?? 1,
    getScrollElement: () => parentEl.value,
    estimateSize: (index: number) => forwarded.value.estimateSize?.(index) ?? 30,
  }
  return merge({}, forwarded.value, _staticOptions)
})
const virtualizer = useVirtualizer(virtualOptions)
treeContext.virtualizer = virtualizer

const virtualRows = computed(() => virtualizer.value.getVirtualItems())
const totalSize = computed(() => virtualizer.value.getTotalSize())

function getRenderNode(index: number) {
  const node = renderNodes.value[index]
  return node
}

const { virtualizer: tvVirtualizer } = tvTreeRaw()
</script>

<template>
  <div
    ref="parentEl"
    :class="tvVirtualizer({ class: propsClass, unstyled })"
    :data-horizontal="true"
    style="overflow-anchor: none"
  >
    <!-- scroll area -->
    <div
      :style="{
        position: 'relative',
        width: '100%',
        height: `${totalSize}px`,
      }"
    >
      <div
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${virtualRows[0]?.start ?? 0}px)`,
        }"
      >
        <!-- items -->
        <slot v-bind="{ virtualItems: virtualRows, getRenderNode }" />
      </div>
    </div>
  </div>
</template>
