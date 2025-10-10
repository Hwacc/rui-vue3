<script lang="ts" setup>
import type { ButtonVariants } from '@rui/core/components/button'
import type { RangeCalendarNextProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvButton } from '@rui/core/components/button'
import { prefix } from '@rui/core/components/calendar'
import { ChevronRight } from 'lucide-vue-next'
import { RangeCalendarNext, useForwardProps } from 'reka-ui'

const {
  class: propsClass,
  unstyled,
  variant = 'icon',
  ...props
} = defineProps<
  RangeCalendarNextProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    size?: ButtonVariants['size']
    variant?: ButtonVariants['variant']
  }
>()

const { base } = tvButton()
const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarNext
    v-bind="forwarded"
    :class="
      base({ variant, size, unstyled, class: [!unstyled && `${prefix}-next`, propsClass] })
    "
    :data-variant="variant"
  >
    <slot>
      <ChevronRight class="size-4" />
    </slot>
  </RangeCalendarNext>
</template>
