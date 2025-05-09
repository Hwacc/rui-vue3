<script lang="ts" setup>
import type { TooltipArrowProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ToolTipArrowVariants } from '.'
import { cn } from '@rui/core/lib/utils'
import { TooltipArrow } from 'reka-ui'
import { computed, ref, watch } from 'vue'
import { toolTipArrowVariants } from '.'

const {
  force = false,
  theme = 'default',
  variant = 'css',
  width = 12,
  height = 6,
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  TooltipArrowProps & {
    class?: HTMLAttributes['class']
    force?: boolean
    theme?: ToolTipArrowVariants['theme']
    variant?: ToolTipArrowVariants['variant']
    unstyled?: boolean
  }
>()
const arrowRef = ref<{ $el: HTMLElement } | null>(null)

watch(arrowRef, () => {
  if (force && arrowRef.value?.$el) {
    setTimeout(() => {
      if (arrowRef.value?.$el) {
        arrowRef.value.$el.style.visibility = 'visible'
      }
    }, 100)
  }
})

const style = computed(() => {
  if (variant === 'css') {
    // makes square
    const line = Math.max(width, height)
    return {
      '--reka-tooltip-arrow-width': `${line}px`,
      '--reka-tooltip-arrow-height': `${line}px`,
      '--reka-tooltip-arrow-border-width': `${line / 2}px`,
      '--reka-tooltip-arrow-border-height': `${line / 2}px`,
    }
  }
  return {
    '--reka-tooltip-arrow-width': `${width}px`,
    '--reka-tooltip-arrow-height': `${height}px`,
  }
})

const classNames = computed(() =>
  cn(
    toolTipArrowVariants({
      theme,
      variant,
      unstyled,
    }),
    propsClass,
  ),
)
</script>

<template>
  <TooltipArrow
    ref="arrowRef"
    v-bind="props"
    :as="variant === 'css' ? 'span' : 'svg'"
    :class="classNames"
    :style="style"
    :width="width"
    :height="height"
    :data-arrow-variant="variant"
    :data-theme="theme"
  >
    <span v-if="variant === 'css'" />
  </TooltipArrow>
</template>
