<script setup lang="ts">
import type { DropdownMenuTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { DropdownMenuTrigger, useForwardProps } from 'reka-ui'
import { dropdownMenuTriggerVariants } from '.'

const { class: propsClass, ...props } = defineProps<
  DropdownMenuTriggerProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <DropdownMenuTrigger
    :class="cn(dropdownMenuTriggerVariants({ unstyled }), propsClass)"
    v-bind="forwardedProps"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
