<script setup lang="ts">
import type { ToastCloseProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { X } from 'lucide-vue-next'
import { ToastClose } from 'reka-ui'
import { tvToast } from '.'

const {
  class: propsClass,
  unstyled = false,
  ...props
} = defineProps<
  ToastCloseProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()

const { close } = tvToast()
</script>

<template>
  <ToastClose v-bind="props" :class="close({ unstyled, class: propsClass })">
    <X class="size-full" />
  </ToastClose>
</template>
