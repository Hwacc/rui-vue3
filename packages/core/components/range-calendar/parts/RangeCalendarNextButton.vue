<script lang="ts" setup>
import type { ButtonVariants } from '@rui/core/components/button'
import type { RangeCalendarNextProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { buttonVariants } from '@rui/core/components/button'
import { prefix } from '@rui/core/components/calendar'
import { cn } from '@rui/core/lib/utils'
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
    variant?: ButtonVariants['variant']
  }
>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <RangeCalendarNext
    :class="
      cn(
        buttonVariants({ variant, unstyled }),
        [!unstyled && `${prefix}-next`],
        propsClass,
      )
    "
    :data-variant="variant"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronRight class="h-4 w-4" />
    </slot>
  </RangeCalendarNext>
</template>
