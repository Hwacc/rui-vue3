<script lang="ts" setup>
import type { CalendarHeadCellVariants } from '@rui/core/components/calendar'
import type { RangeCalendarHeadCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvCalendarHeadCell } from '@rui/core/components/calendar'
import { RangeCalendarHeadCell, useForwardProps } from 'reka-ui'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  RangeCalendarHeadCellProps & {
    class?: HTMLAttributes['class']
    size?: CalendarHeadCellVariants['size']
    unstyled?: boolean
  }
>()

const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarHeadCell
    v-bind="forwarded"
    :class="
      tvCalendarHeadCell({
        unstyled,
        size,
        class: propsClass,
      })
    "
  >
    <slot />
  </RangeCalendarHeadCell>
</template>
