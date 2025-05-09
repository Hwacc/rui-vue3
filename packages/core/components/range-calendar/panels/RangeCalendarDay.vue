<script setup lang="ts">
import { CalendarGridProps, injectRangeCalendarRootContext } from 'reka-ui'
import { computed } from 'vue'
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell
} from '../parts'
import { type CalendarVariantsProps } from '@rui/core/components/calendar'

const props = defineProps<
  CalendarGridProps & {
    size?: CalendarVariantsProps['size']
    unstyled?: boolean
  }
>()

const { grid, weekDays } = injectRangeCalendarRootContext()
const variants = computed(() => ({
  size: props.size,
  unstyled: props.unstyled
}))
</script>

<template>
  <RangeCalendarGrid
    v-for="month in grid"
    :key="month.value.toString()"
    v-bind="props"
  >
    <RangeCalendarGridHead v-bind="variants">
      <RangeCalendarGridRow v-bind="variants">
        <RangeCalendarHeadCell
          v-for="day in weekDays"
          :key="`head-cell-${day}`"
          v-bind="variants"
        >
          {{ day }}
        </RangeCalendarHeadCell>
      </RangeCalendarGridRow>
    </RangeCalendarGridHead>
    <RangeCalendarGridBody v-bind="variants">
      <RangeCalendarGridRow
        v-for="(weekDates, index) in month.rows"
        :key="`weekDate-${index}`"
        v-bind="variants"
      >
        <RangeCalendarCell
          v-for="weekDate in weekDates"
          :key="weekDate.toString()"
          :date="weekDate"
          v-bind="variants"
        >
          <RangeCalendarCellTrigger
            :day="weekDate"
            :month="month.value"
            v-bind="variants"
          />
        </RangeCalendarCell>
      </RangeCalendarGridRow>
    </RangeCalendarGridBody>
  </RangeCalendarGrid>
</template>
