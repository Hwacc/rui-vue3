<script setup lang="ts">
import type { ToastTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import { ToastTitle } from 'reka-ui'
import { computed } from 'vue'
import { toastTitleVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  ToastTitleProps & { class?: HTMLAttributes['class']; unstyled?: boolean }
>()

const classNames = computed(() => {
  return cn(toastTitleVariants({ unstyled }), propsClass)
})
</script>

<template>
  <ToastTitle v-bind="props" :class="classNames">
    <slot />
  </ToastTitle>
</template>
