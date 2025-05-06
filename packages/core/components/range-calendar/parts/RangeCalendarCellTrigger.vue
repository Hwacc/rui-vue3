<script lang="ts" setup>
import type { RangeCalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import { RangeCalendarCellTrigger, useForwardProps } from 'reka-ui'
import {
  calendarCellTriggerVariants,
  type CalendarCellTriggerVariantsProps
} from '@/core/components/calendar'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  ...props
} = defineProps<
  RangeCalendarCellTriggerProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    size?: CalendarCellTriggerVariantsProps['size']
  }
>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <RangeCalendarCellTrigger
    :class="
      cn(
        calendarCellTriggerVariants({
          size,
          unstyled
        }),
        propsClass
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarCellTrigger>
</template>
