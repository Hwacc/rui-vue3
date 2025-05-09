<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TooltipContentVariants } from '.'
import { cn } from '@rui/core/lib/utils'
import { TooltipContent, TooltipPortal, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { tooltipContentVariants } from '.'

defineOptions({
  inheritAttrs: false,
})

const {
  class: propsClass,
  theme = 'default',
  unstyled,
  ...props
} = defineProps<
  TooltipContentProps & {
    class?: HTMLAttributes['class']
    theme?: TooltipContentVariants['theme']
    unstyled?: boolean
  }
>()
const emits = defineEmits<TooltipContentEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const classNames = computed(() => {
  return cn(tooltipContentVariants({ theme, unstyled }), propsClass)
})
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="classNames"
      :data-theme="theme"
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
