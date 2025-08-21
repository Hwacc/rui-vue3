<script setup lang="ts">
import type { ToastActionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ToastAction } from 'reka-ui'
import { tvToast } from '.'

const {
  class: propsClass,
  unstyled = false,
  variant,
  ...props
} = defineProps<
  ToastActionProps & {
    class?: HTMLAttributes['class']
    variant?: StatusVariants
    unstyled?: boolean
  }
>()
const { action } = tvToast()
</script>

<template>
  <ToastAction
    v-bind="props"
    :class="action({ unstyled, class: propsClass })"
    :data-variant="variant"
  >
    <slot />
  </ToastAction>
</template>
