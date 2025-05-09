<script setup lang="ts">
import type { TabsListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { TabsList } from 'reka-ui'
import { computed, onMounted, unref, watchEffect } from 'vue'
import { tabsListVariants } from '.'
import { injectTabsContext } from './Tabs.vue'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<TabsListProps & { class?: HTMLAttributes['class'], unstyled?: boolean }>()

const { index, initTabList, tabsTriggers, orientation } = injectTabsContext()

onMounted(() => {
  initTabList()
})

watchEffect(
  () => {
    const curIndex = unref(index)
    if (curIndex === -1 || orientation !== 'horizontal')
      return
    const parentRect = tabsTriggers[curIndex]?.el?.parentElement?.getBoundingClientRect()
    const prevRect = tabsTriggers[curIndex - 1]?.el?.getBoundingClientRect()
    const curRect = tabsTriggers[curIndex]?.el?.getBoundingClientRect()
    const nextRect = tabsTriggers[curIndex + 1]?.el?.getBoundingClientRect()

    if (!parentRect || !curRect)
      return
    const deltaX = curRect.x - parentRect.x
    // 完全在左边
    if (deltaX <= 0 && Math.abs(deltaX) >= curRect.width) {
      tabsTriggers[curIndex]?.el?.parentElement?.scrollBy({
        left: prevRect ? -(Math.abs(deltaX) + curRect.width) - prevRect.width / 2 : -9999,
        behavior: 'smooth',
      })
    }
    // 在左边,包含,但显示不全
    else if (deltaX < 0 && Math.abs(deltaX) < curRect.width) {
      tabsTriggers[curIndex]?.el?.parentElement?.scrollBy({
        left: prevRect ? deltaX - prevRect.width / 2 : -curRect.width,
        behavior: 'smooth',
      })
    }
    // 包含但是上一个显示不够
    else if (deltaX > 0 && prevRect && deltaX < prevRect.width / 2) {
      tabsTriggers[curIndex]?.el?.parentElement?.scrollBy({
        left: -(prevRect.width / 2 - deltaX),
        behavior: 'smooth',
      })
    }
    // 完全在右边
    else if (deltaX >= parentRect.width) {
      tabsTriggers[curIndex]?.el?.parentElement?.scrollBy({
        left: nextRect ? deltaX - parentRect.width + curRect.width + nextRect.width / 2 : 9999,
        behavior: 'smooth',
      })
    }
    // 在右边,包含,但显示不全
    else if (
      deltaX < parentRect.width
      && curRect.width + curRect.x > parentRect.width + parentRect.x
    ) {
      tabsTriggers[curIndex]?.el?.parentElement?.scrollBy({
        left: nextRect
          ? deltaX + curRect.width - parentRect.width + nextRect.width / 2
          : curRect.width,
        behavior: 'smooth',
      })
    }
    // 包含但是下一个显示不够
    else if (
      deltaX < parentRect.width
      && nextRect
      && nextRect.x - parentRect.x + nextRect.width / 2 > parentRect.width
    ) {
      tabsTriggers[curIndex]?.el?.parentElement?.scrollBy({
        left: nextRect.width / 2 - (parentRect.width - (nextRect.x - parentRect.x)),
        behavior: 'smooth',
      })
    }
  },
  {
    flush: 'post',
  },
)

const classNames = computed(() => {
  return cn(tabsListVariants({ unstyled }), propsClass)
})
</script>

<template>
  <TabsList v-bind="props" :class="classNames">
    <slot />
  </TabsList>
</template>
