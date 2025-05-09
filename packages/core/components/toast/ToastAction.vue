<script setup lang="ts">
import type { ToastActionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { ToastAction } from 'reka-ui'
import { toastActionVariants } from '.'

const {
  class: propsClass,
  unstyled,
  variant,
  ...props
} = defineProps<
  ToastActionProps & {
    class?: HTMLAttributes['class']
    variant?: StatusVariants
    unstyled?: boolean
  }
>()
</script>

<template>
  <ToastAction
    v-bind="props"
    :class="cn(toastActionVariants({ unstyled }), propsClass)"
    :data-variant="variant"
  >
    <slot />
  </ToastAction>
</template>
