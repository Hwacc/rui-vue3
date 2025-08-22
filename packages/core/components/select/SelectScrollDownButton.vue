<script setup lang="ts">
import type { SelectScrollDownButtonProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { SelectScrollDownButton, useForwardProps } from 'reka-ui'
import { tvScrollButton } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  SelectScrollDownButtonProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <SelectScrollDownButton
    v-bind="forwarded"
    :class="tvScrollButton({ dir: 'down', unstyled, class: propsClass })"
    data-direction="down"
  >
    <slot>
      <ChevronDown class="size-4" />
    </slot>
  </SelectScrollDownButton>
</template>
