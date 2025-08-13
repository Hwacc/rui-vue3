<script setup lang="ts">
import type { DropdownMenuItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { DropdownMenuItem, useForwardProps } from 'reka-ui'
import { tvItem } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  DropdownMenuItemProps & {
    class?: HTMLAttributes['class']
    inset?: boolean
    unstyled?: boolean
  }
>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="
      tvItem({
        variant: 'default',
        unstyled,
        class: [props.inset && 'pl-8', propsClass],
      })
    "
    data-variant="default"
  >
    <slot />
  </DropdownMenuItem>
</template>
