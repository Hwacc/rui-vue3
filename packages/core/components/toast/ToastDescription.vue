<script setup lang="ts">
import type { ToastDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { ToastDescription } from 'reka-ui'
import { computed } from 'vue'
import { toastDescriptionVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  ToastDescriptionProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const classNames = computed(() => {
  return cn(toastDescriptionVariants({ unstyled }), propsClass)
})
</script>

<template>
  <ToastDescription :class="classNames" v-bind="props">
    <slot />
  </ToastDescription>
</template>
