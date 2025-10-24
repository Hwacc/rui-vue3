<script setup lang="ts">
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { spaceTimes } from '@rui/core/lib/utils'
import { DropdownMenuSubContent, useForwardPropsEmits } from 'reka-ui'
import { tvSubContent } from '.'

const {
  class: propsClass,
  sideOffset = spaceTimes(2),
  unstyled,
  ...props
} = defineProps<
  DropdownMenuSubContentProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const emits = defineEmits<DropdownMenuSubContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuSubContent
    v-bind="forwarded"
    :class="tvSubContent({ unstyled, class: propsClass })"
    :side-offset="sideOffset"
  >
    <slot />
  </DropdownMenuSubContent>
</template>
