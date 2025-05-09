<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { DropdownMenuSeparator } from 'reka-ui'
import { dropdownMenuSeparatorVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  DropdownMenuSeparatorProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
</script>

<template>
  <DropdownMenuSeparator
    v-bind="props"
    :class="cn(dropdownMenuSeparatorVariants({ unstyled }), propsClass)"
  />
</template>
