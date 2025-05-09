<script setup lang="ts">
import type { DialogDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { DialogDescription } from 'reka-ui'
import { sheetDescriptionVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  DialogDescriptionProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
</script>

<template>
  <DialogDescription
    :class="cn(sheetDescriptionVariants({ unstyled }), propsClass)"
    v-bind="props"
  >
    <slot />
  </DialogDescription>
</template>
