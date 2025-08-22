<script lang="ts" setup>
import type { CalendarCellTriggerVariantsProps } from '@rui/core/components/calendar'
import type { RangeCalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { calendarCellTriggerVariants } from '@rui/core/components/calendar'
import { cn } from '@rui/core/lib/utils'
import { RangeCalendarCellTrigger, useForwardProps } from 'reka-ui'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  day,
  month,
  ...props
} = defineProps<
  RangeCalendarCellTriggerProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    size?: CalendarCellTriggerVariantsProps['size']
  }
>()
const forwarded = useForwardProps({ day, month, ...props })
</script>

<template>
  <RangeCalendarCellTrigger
    v-bind="forwarded"
    :class="
      cn(
        calendarCellTriggerVariants({
          size,
          unstyled,
        }),
        propsClass,
      )
    "
  >
    <slot />
  </RangeCalendarCellTrigger>
</template>
