<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { CalendarVariantsProps } from '@rui/core/components/calendar'
import type { RangeCalendarGridProps } from 'reka-ui'
import { chunk } from 'lodash-es'
import { useForwardProps } from 'reka-ui'
import { createYear } from 'reka-ui/date'
import { computed } from 'vue'
import {
  RangeCalendarCell,
  RangeCalendarCellMonthTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridRow,
} from '../parts'

const {
  date,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  RangeCalendarGridProps & {
    date: DateValue
    size?: CalendarVariantsProps['size']
    unstyled?: boolean
  }
>()

const monthGrid = computed(() => {
  return chunk(createYear({ dateObj: date }), 3)
})

const variants = computed(() => ({
  size,
  unstyled,
  variant: 'month' as any,
}))
const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarGrid v-bind="forwarded">
    <RangeCalendarGridBody v-bind="variants">
      <RangeCalendarGridRow
        v-for="(quarter, quarterIndex) in monthGrid"
        :key="`quarter-${quarterIndex}`"
        v-bind="variants"
      >
        <RangeCalendarCell
          v-for="month in quarter"
          :key="month.toString()"
          :date="month"
          v-bind="variants"
        >
          <RangeCalendarCellMonthTrigger :date="month" v-bind="variants" />
        </RangeCalendarCell>
      </RangeCalendarGridRow>
    </RangeCalendarGridBody>
  </RangeCalendarGrid>
</template>
