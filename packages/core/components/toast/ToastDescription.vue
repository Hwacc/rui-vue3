<script setup lang="ts">
import type { ToastDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ToastDescription, useForwardProps } from 'reka-ui'
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
const forwarded = useForwardProps(props)
</script>

<template>
  <ToastDescription
    v-bind="forwarded"
    :class="description({ unstyled, class: propsClass })"
  >
    <slot />
  </ToastDescription>
</template>
