<script setup lang="ts">
import type { ToastViewportProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ToastViewport } from 'reka-ui'
import { tvToast } from '.'
import { injectToastProviderContextEx } from './ToastProvider.vue'

const {
  class: propsClass,
  hotkey = [],
  unstyled = false,
  ...props
} = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'], unstyled?: boolean }>()

const { position } = injectToastProviderContextEx()
const { viewport } = tvToast()
</script>

<template>
  <ToastViewport
    v-bind="props"
    :class="viewport({ unstyled, position, class: propsClass })"
    :hotkey="hotkey"
    :aria-hidden="true"
  />
</template>
