<script setup lang="ts">
import type { PopoverArrowProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { PopoverArrowVariants } from '.'
import { cn, rem2px } from '@rui/core/lib/utils'
import { PopoverArrow } from 'reka-ui'
import { computed, ref, watch } from 'vue'
import { popoverArrowVariants } from '.'

const {
  class: propsClass,
  force = false,
  variant = 'css',
  width = rem2px(1),
  height = rem2px(0.75),
  unstyled,
  ...props
} = defineProps<
  PopoverArrowProps & {
    class?: HTMLAttributes['class']
    force?: boolean
    variant?: PopoverArrowVariants['variant']
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
  return {
    '--reka-popover-arrow-width': `${width}px`,
    '--reka-popover-arrow-height': `${height}px`,
    '--reka-popover-arrow-border-width': `${width / 2}px`,
    '--reka-popover-arrow-border-height': `${height / 2}px`,
  }
})

const classNames = computed(() =>
  cn(
    popoverArrowVariants({
      variant,
      unstyled,
    }),
    propsClass,
  ),
)
</script>

<template>
  <PopoverArrow
    ref="arrowRef"
    v-bind="props"
    :as="variant === 'css' ? 'span' : 'svg'"
    :class="classNames"
    :style="style"
    :width="width"
    :height="height"
    :data-arrow-variant="variant"
  >
    <span v-if="variant === 'css'" />
  </PopoverArrow>
</template>
