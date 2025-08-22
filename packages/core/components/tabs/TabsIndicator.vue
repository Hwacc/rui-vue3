<script lang="ts" setup>
import type { TabsIndicatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TabsVariant } from '.'
import { TabsIndicator, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { tvTabs } from '.'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  TabsIndicatorProps & {
    class?: HTMLAttributes['class']
    size?: TabsVariant['size']
    unstyled?: boolean
  }
>()
const forwarded = useForwardProps(props)

const classNames = computed(() => {
  return tvTabs().indicator({ size, unstyled, class: propsClass })
})
</script>

<template>
  <TabsIndicator
    v-bind="forwarded"
    :class="classNames"
  >
    <slot>
      <div class="w-full h-full" />
    </slot>
  </TabsIndicator>
</template>
