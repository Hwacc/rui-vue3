<script setup lang="ts">
import type { SelectScrollDownButtonProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { ChevronDown } from 'lucide-vue-next'
import { SelectScrollDownButton, useForwardProps } from 'reka-ui'
import { selectScrollButtonVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  SelectScrollDownButtonProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <SelectScrollDownButton
    v-bind="forwardedProps"
    :class="cn(selectScrollButtonVariants({ dir: 'down', unstyled }), propsClass)"
    data-direction="down"
  >
    <slot>
      <ChevronDown class="size-4" />
    </slot>
  </SelectScrollDownButton>
</template>
