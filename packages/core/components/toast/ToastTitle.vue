<script setup lang="ts">
import type { ToastTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ToastTitle, useForwardProps } from 'reka-ui'
import { tvToast } from '.'

const {
  class: propsClass,
  unstyled = false,
  ...props
} = defineProps<
  ToastTitleProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()

const { title } = tvToast()
const forwarded = useForwardProps(props)
</script>

<template>
  <ToastTitle v-bind="forwarded" :class="title({ unstyled, class: propsClass })">
    <slot />
  </ToastTitle>
</template>
