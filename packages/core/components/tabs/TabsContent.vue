<script setup lang="ts">
import type { TabsContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { TabsContent, useForwardProps } from 'reka-ui'
import { computed, ref, watch } from 'vue'
import { tvTabs } from '.'
import { injectTabsContext } from './Tabs.vue'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<TabsContentProps & { class?: HTMLAttributes['class'], unstyled?: boolean }>()

const { index } = injectTabsContext()

const direction = ref(0)
watch(index, (newIndex, oldIndex) => {
  direction.value = newIndex - oldIndex
})

const classNames = computed(() => {
  return tvTabs().content({
    prev: direction.value < 0,
    next: direction.value > 0,
    unstyled,
    class: propsClass,
  })
})

const forwarded = useForwardProps(props)
</script>

<template>
  <TabsContent
    v-bind="forwarded"
    :class="classNames"
  >
    <slot />
  </TabsContent>
</template>
