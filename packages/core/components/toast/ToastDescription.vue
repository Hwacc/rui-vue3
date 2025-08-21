<script setup lang="ts">
import type { ToastDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ToastDescription } from 'reka-ui'
import { tvToast } from '.'

const {
  class: propsClass,
  unstyled = false,
  ...props
} = defineProps<
  ToastDescriptionProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const { description } = tvToast()
</script>

<template>
  <ToastDescription
    :class="description({ unstyled, class: propsClass })"
    v-bind="props"
  >
    <slot />
  </ToastDescription>
</template>
