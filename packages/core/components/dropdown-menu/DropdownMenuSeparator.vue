<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { DropdownMenuSeparator } from 'reka-ui'
import { tvSeparator } from '.'

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
    :class="tvSeparator({ unstyled, class: propsClass })"
  />
</template>
