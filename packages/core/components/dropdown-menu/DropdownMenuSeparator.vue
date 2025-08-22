<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { DropdownMenuSeparator, useForwardProps } from 'reka-ui'
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

const forwarded = useForwardProps(props)
</script>

<template>
  <DropdownMenuSeparator
    v-bind="forwarded"
    :class="tvSeparator({ unstyled, class: propsClass })"
  />
</template>
