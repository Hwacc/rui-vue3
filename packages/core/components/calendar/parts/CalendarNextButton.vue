<script lang="ts" setup>
import type { ButtonVariants } from '@rui/core/components/button'
import type { CalendarNextProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvButton } from '@rui/core/components/button'
import { ChevronRight } from 'lucide-vue-next'
import { CalendarNext, useForwardProps } from 'reka-ui'
import { prefix } from '../index'

const {
  class: propsClass,
  unstyled,
  variant = 'icon',
  ...props
} = defineProps<
  CalendarNextProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
  }
>()

const { base } = tvButton()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarNext
    v-bind="forwarded"
    :class="base({ variant, unstyled, class: [!unstyled && `${prefix}-next`, propsClass] })"
    :data-variant="variant"
  >
    <slot>
      <ChevronRight class="size-4" />
    </slot>
  </CalendarNext>
</template>
