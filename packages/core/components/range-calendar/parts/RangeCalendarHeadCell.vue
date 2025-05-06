<script lang="ts" setup>
import type { RangeCalendarHeadCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import { RangeCalendarHeadCell, useForwardProps } from 'reka-ui'
import {
  calendarHeadCellVariants,
  type CalendarHeadCellVariantsProps
} from '@/core/components/calendar'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  RangeCalendarHeadCellProps & {
    class?: HTMLAttributes['class']
    size?: CalendarHeadCellVariantsProps['size']
    unstyled?: boolean
  }
>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <RangeCalendarHeadCell
    :class="
      cn(
        calendarHeadCellVariants({
          unstyled,
          size
        }),
        propsClass
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarHeadCell>
</template>
