<script setup lang="ts">
import { cn } from '@rui/core/lib/utils'
import { DialogTitle, type DialogTitleProps } from 'reka-ui'
import { type HTMLAttributes } from 'vue'
import { sheetTitleVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  DialogTitleProps & { class?: HTMLAttributes['class']; unstyled?: boolean }
>()
</script>

<template>
  <DialogTitle
    :class="cn(sheetTitleVariants({ unstyled: unstyled }), propsClass)"
    v-bind="props"
  >
    <slot />
  </DialogTitle>
</template>
