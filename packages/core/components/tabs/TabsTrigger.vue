<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TabsVariant } from '.'
import { TabsTrigger, useForwardProps } from 'reka-ui'
import { onMounted } from 'vue'
import { tvTabs } from '.'
import { injectTabsContext } from './Tabs.vue'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  TabsTriggerProps & {
    class?: HTMLAttributes['class']
    size?: TabsVariant['size']
    unstyled?: boolean
  }
>()

const { initTabTrigger } = injectTabsContext()

onMounted(() => {
  initTabTrigger()
})

const forwarded = useForwardProps(props)
const { trigger } = tvTabs()
</script>

<template>
  <TabsTrigger
    v-bind="forwarded"
    :class="trigger({ size, unstyled, class: propsClass })"
  >
    <span class="truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
