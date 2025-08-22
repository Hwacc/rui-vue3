<script setup lang="ts">
import type { DialogDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { DialogDescription, useForwardProps } from 'reka-ui'
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
const forwarded = useForwardProps(props)
</script>

<template>
  <DialogDescription
    v-bind="forwarded"
    :class="cn(sheetDescriptionVariants({ unstyled }), propsClass)"
  >
    <slot />
  </DialogDescription>
</template>
