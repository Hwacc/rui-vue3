<script setup lang="ts">
import type { TabsContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { TabsContent } from 'reka-ui'
import { computed, ref, watch } from 'vue'
import { tabsContentVariants } from '.'
import { injectTabsContext } from './Tabs.vue'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  TabsContentProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()

const { index } = injectTabsContext()

const direction = ref(0)
watch(index, (newIndex, oldIndex) => {
  direction.value = newIndex - oldIndex
})

const classNames = computed(() => {
  return cn(
    tabsContentVariants({
      prev: direction.value < 0,
      next: direction.value > 0,
      unstyled,
    }),
    propsClass,
  )
})
</script>

<template>
  <TabsContent :class="classNames" v-bind="props">
    <slot />
  </TabsContent>
</template>
