<script lang="ts" setup>
import type { ButtonVariants } from '@rui/core/components/button'
import type { RangeCalendarPrevProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { buttonVariants } from '@rui/core/components/button'
import { prefix } from '@rui/core/components/calendar'
import { cn } from '@rui/core/lib/utils'
import { ChevronLeft } from 'lucide-vue-next'
import { RangeCalendarPrev, useForwardProps } from 'reka-ui'

const {
  class: propsClass,
  variant = 'icon',
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  RangeCalendarPrevProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
  }
>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <RangeCalendarPrev
    :class="
      cn(
        buttonVariants({ size, variant, unstyled }),
        [!unstyled && `${prefix}-prev`],
        propsClass,
      )
    "
    :data-variant="variant"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeft class="h-4 w-4" />
    </slot>
  </RangeCalendarPrev>
</template>
