<script setup lang="ts">
import type { DialogTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { DialogTitle } from 'reka-ui'
import { sheetTitleVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  DialogTitleProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()
</script>

<template>
  <DialogTitle
    :class="cn(sheetTitleVariants({ unstyled }), propsClass)"
    v-bind="props"
  >
    <slot />
  </DialogTitle>
</template>
