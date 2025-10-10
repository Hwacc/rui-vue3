<script lang="ts" setup>
import type { CalendarCellTriggerVariants } from '@rui/core/components/calendar'
import type { RangeCalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvCalendarCellTrigger } from '@rui/core/components/calendar'
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
    size?: CalendarCellTriggerVariants['size']
  }
>()
const forwarded = useForwardProps({ day, month, ...props })
</script>

<template>
  <RangeCalendarCellTrigger
    v-bind="forwarded"
    :class="
      tvCalendarCellTrigger({
        size,
        unstyled,
        class: propsClass,
      })
    "
  >
    <slot />
  </RangeCalendarCellTrigger>
</template>
