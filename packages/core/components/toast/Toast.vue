<script setup lang="ts">
import type { ToastRootEmits, ToastRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ToastRoot, useForwardPropsEmits } from 'reka-ui'
import { tvToast } from '.'
import { injectToastProviderContextEx } from './ToastProvider.vue'

const {
  class: propsClass,
  variant = 'success',
  unstyled = false,
  ...props
} = defineProps<ToastRootProps & {
  variant?: StatusVariants
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()
const emits = defineEmits<ToastRootEmits>()
const { position, swipeDirection } = injectToastProviderContextEx()
const { base } = tvToast()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="
      base({
        position,
        swipeDirection,
        unstyled,
        class: propsClass,
      })
    "
    :data-variant="variant"
  >
    <slot />
  </ToastRoot>
</template>
