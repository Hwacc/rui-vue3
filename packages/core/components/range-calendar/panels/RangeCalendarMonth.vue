<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import { createYear } from 'reka-ui/date'
import { RangeCalendarGridProps } from 'reka-ui'
import {
  RangeCalendarGrid,
  RangeCalendarCell,
  RangeCalendarGridBody,
  RangeCalendarGridRow
} from '../parts'
import { computed } from 'vue'
import { chunk } from 'lodash-es'
import { type CalendarVariantsProps } from '@/core/components/calendar'
import { RangeCalendarCellMonthTrigger } from '../parts'

const {
  date,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  RangeCalendarGridProps & {
    date: CalendarDate
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
  variant: 'month' as any
}))
</script>

<template>
  <RangeCalendarGrid v-bind="props">
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
