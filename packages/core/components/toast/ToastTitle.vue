<script setup lang="ts">
import type { ToastTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ToastTitle } from 'reka-ui'
import { tvToast } from '.'

const {
  class: propsClass,
  unstyled = false,
  ...props
} = defineProps<
  ToastTitleProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()

const { title } = tvToast()
</script>

<template>
  <ToastTitle v-bind="props" :class="title({ unstyled, class: propsClass })">
    <slot />
  </ToastTitle>
</template>
