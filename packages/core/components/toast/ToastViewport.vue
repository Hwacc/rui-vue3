<script setup lang="ts">
import type { ToastViewportProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { ToastViewport } from 'reka-ui'
import { computed } from 'vue'
import { toastViewportVariants } from '.'
import { injectToastProviderContextEx } from './ToastProvider.vue'

const {
  class: propsClass,
  hotkey = [],
  ...props
} = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>()

const { position } = injectToastProviderContextEx()
const classNames = computed(() => {
  return cn(toastViewportVariants({ position: position.value }), propsClass)
})
</script>

<template>
  <ToastViewport
    v-bind="props"
    :class="classNames"
    :hotkey="hotkey"
    :aria-hidden="true"
  />
</template>
