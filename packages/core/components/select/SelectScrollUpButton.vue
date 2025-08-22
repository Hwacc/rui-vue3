<script setup lang="ts">
import type { SelectScrollUpButtonProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ChevronUp } from 'lucide-vue-next'
import { SelectScrollUpButton, useForwardProps } from 'reka-ui'
import { tvScrollButton } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  SelectScrollUpButtonProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <SelectScrollUpButton
    v-bind="forwarded"
    :class="tvScrollButton({ dir: 'up', unstyled, class: propsClass })"
    data-direction="up"
  >
    <slot>
      <ChevronUp class="size-4" />
    </slot>
  </SelectScrollUpButton>
</template>
