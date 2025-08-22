<script setup lang="ts">
import type { DropdownMenuTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { DropdownMenuTrigger, useForwardProps } from 'reka-ui'
import { tvTrigger } from '.'

const { class: propsClass, ...props } = defineProps<
  DropdownMenuTriggerProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DropdownMenuTrigger
    v-bind="forwarded"
    :class="tvTrigger({ unstyled, class: propsClass })"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
