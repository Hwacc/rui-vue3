<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TabsTriggerVariantsProps } from '.'
import { cn } from '@rui/core/lib/utils'
import { TabsTrigger, useForwardProps } from 'reka-ui'
import { computed, onMounted } from 'vue'
import { tabsTriggerVariants } from '.'
import { injectTabsContext } from './Tabs.vue'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  TabsTriggerProps & {
    class?: HTMLAttributes['class']
    size?: TabsTriggerVariantsProps['size']
    unstyled?: boolean
  }
>()

const { initTabTrigger } = injectTabsContext()

onMounted(() => {
  initTabTrigger()
})

const forwardedProps = useForwardProps(props)
const classNames = computed(() => {
  return cn(tabsTriggerVariants({ size, unstyled }), propsClass)
})
</script>

<template>
  <TabsTrigger v-bind="forwardedProps" :class="classNames">
    <span class="truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
