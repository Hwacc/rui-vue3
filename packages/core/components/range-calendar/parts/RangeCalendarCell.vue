<script lang="ts" setup>
import type { CalendarCellVariants } from '@rui/core/components/calendar'
import type { RangeCalendarCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvCalendarCell } from '@rui/core/components/calendar'
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
    size?: CalendarCellVariants['size']
    variant?: CalendarCellVariants['variant']
  }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarCell
    v-bind="forwarded"
    :class="tvCalendarCell({ size, variant, unstyled, class: propsClass })"
  >
    <slot />
  </RangeCalendarCell>
</template>
