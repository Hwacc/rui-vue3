<script setup lang="ts">
import type { ToastRootEmits } from 'reka-ui'
import type { ToastProps } from '.'

import { cn } from '@rui/core/lib/utils'
import { ToastRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, unref } from 'vue'
import { toastVariants } from '.'
import { injectToastProviderContextEx } from './ToastProvider.vue'

const {
  class: propsClass,
  variant = 'success',
  unstyled,
  ...props
} = defineProps<ToastProps>()
const emits = defineEmits<ToastRootEmits>()
const { position, swipeDirection } = injectToastProviderContextEx()
const classNames = computed(() => {
  return cn(
    toastVariants({
      position: unref(position),
      swipeDirection: unref(swipeDirection),
      unstyled,
    }),
    propsClass,
  )
})
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="classNames"
    :data-variant="variant"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>
