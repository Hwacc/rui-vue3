<script lang="ts" setup>
import type { RangeCalendarCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import {
  calendarCellVariants,
  type CalendarCellVariantsProps
} from '@rui/core/components/calendar'
import { RangeCalendarCell, useForwardProps } from 'reka-ui'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  variant = 'day',
  ...props
} = defineProps<
  RangeCalendarCellProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    size?: CalendarCellVariantsProps['size']
    variant?: CalendarCellVariantsProps['variant']
  }
>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <RangeCalendarCell
    :class="cn(calendarCellVariants({ size, variant, unstyled }), propsClass)"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarCell>
</template>
