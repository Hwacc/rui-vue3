<script setup lang="ts">
import type { DialogTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { DialogTitle, useForwardProps } from 'reka-ui'
import { sheetTitleVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  DialogTitleProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DialogTitle
    v-bind="forwarded"
    :class="cn(sheetTitleVariants({ unstyled }), propsClass)"
  >
    <slot />
  </DialogTitle>
</template>
