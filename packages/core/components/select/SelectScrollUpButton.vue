<script setup lang="ts">
import type { SelectScrollUpButtonProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { ChevronUp } from 'lucide-vue-next'
import { SelectScrollUpButton, useForwardProps } from 'reka-ui'
import { selectScrollButtonVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  SelectScrollUpButtonProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <SelectScrollUpButton
    v-bind="forwardedProps"
    :class="cn(selectScrollButtonVariants({ dir: 'up', unstyled }), propsClass)"
    data-direction="up"
  >
    <slot>
      <ChevronUp class="size-4" />
    </slot>
  </SelectScrollUpButton>
</template>
