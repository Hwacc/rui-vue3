<script lang="ts" setup>
import type { RangeCalendarCellTriggerProps } from 'reka-ui'
import { computed, watch, type HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import {
  injectRangeCalendarRootContext,
  RangeCalendarCellTrigger,
  useForwardProps
} from 'reka-ui'
import {
  calendarCellTriggerVariants,
  type CalendarCellTriggerVariantsProps
} from '@/core/components/calendar'
import { isSameDay } from '@internationalized/date'

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

const { startValue, endValue } = injectRangeCalendarRootContext()
const isSelectedStart = computed(() => {
  return startValue.value && isSameDay(startValue.value, day)
})
const isSelectedEnd = computed(() => {
  return endValue.value && isSameDay(endValue.value, day)
})

const forwardedProps = useForwardProps({ day, month, ...props })
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
    :data-selected-start="isSelectedStart || undefined"
    :data-selected-end="isSelectedEnd || undefined"
  >
    <slot />
  </RangeCalendarCellTrigger>
</template>
