<script lang="ts" setup>
import type { TabsIndicatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TabsIndicatorVariantsProps } from '.'
import { cn } from '@rui/core/lib/utils'
import { TabsIndicator, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { tabsIndicatorVariants } from '.'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  TabsIndicatorProps & {
    class?: HTMLAttributes['class']
    size?: TabsIndicatorVariantsProps['size']
    unstyled?: boolean
  }
>()
const forwardedProps = useForwardProps(props)

const classNames = computed(() => {
  return cn(tabsIndicatorVariants({ size, unstyled }), propsClass)
})
</script>

<template>
  <TabsIndicator v-bind="forwardedProps" :class="classNames">
    <slot>
      <div class="w-full h-full" />
    </slot>
  </TabsIndicator>
</template>
