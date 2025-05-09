<script setup lang="ts">
import type { CalendarGridProps } from 'reka-ui'
import type { CalendarVariantsProps } from '..'
import { injectCalendarRootContext } from 'reka-ui'
import { computed } from 'vue'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
} from '../parts'

const props = defineProps<
  CalendarGridProps & {
    size?: CalendarVariantsProps['size']
    unstyled?: boolean
  }
>()

const { grid, weekDays } = injectCalendarRootContext()
const variants = computed(() => ({
  size: props.size,
  unstyled: props.unstyled,
}))
</script>

<template>
  <CalendarGrid
    v-for="month in grid"
    :key="month.value.toString()"
    v-bind="props"
  >
    <CalendarGridHead v-bind="variants">
      <CalendarGridRow v-bind="variants">
        <CalendarHeadCell
          v-for="day in weekDays"
          :key="`head-cell-${day}`"
          v-bind="variants"
        >
          {{ day }}
        </CalendarHeadCell>
      </CalendarGridRow>
    </CalendarGridHead>
    <CalendarGridBody v-bind="variants">
      <CalendarGridRow
        v-for="(weekDates, index) in month.rows"
        :key="`weekDate-${index}`"
        v-bind="variants"
      >
        <CalendarCell
          v-for="weekDate in weekDates"
          :key="weekDate.toString()"
          :date="weekDate"
          v-bind="variants"
        >
          <CalendarCellTrigger
            :day="weekDate"
            :month="month.value"
            v-bind="variants"
          />
        </CalendarCell>
      </CalendarGridRow>
    </CalendarGridBody>
  </CalendarGrid>
</template>
