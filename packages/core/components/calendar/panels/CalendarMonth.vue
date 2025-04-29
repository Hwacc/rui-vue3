<script lang="ts"></script>

<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import { createYear, toDate } from 'reka-ui/date'
import {
  CalendarGridProps,
  DateValue,
  injectCalendarRootContext,
  useDateFormatter
} from 'reka-ui'
import {
  CalendarGrid,
  CalendarCell,
  CalendarGridBody,
  CalendarGridRow
} from '../parts'
import { computed } from 'vue'
import { chunk } from 'lodash-es'
import { cn } from '@/core/lib/utils'
import { calendarCellTriggerVariants } from '../parts'
import { CalendarPanel, injectCalendarContextEx } from '..'

const { date } = defineProps<CalendarGridProps & { date: CalendarDate }>()

const context = injectCalendarRootContext()
const contextEx = injectCalendarContextEx()
const formatter = useDateFormatter(context.locale.value)

const monthGrid = computed(() => {
  return chunk(createYear({ dateObj: date }), 3)
})
const handleClick = (month: DateValue) => {
  console.log('click', context.placeholder.value)
  context.onPlaceholderChange(
    context.placeholder.value.copy().set({ month: month.month })
  )
  contextEx.panel.value = CalendarPanel.DAY
}
</script>

<template>
  <CalendarGrid>
    <CalendarGridBody>
      <CalendarGridRow
        v-for="(quarter, quarterIndex) in monthGrid"
        :key="`quarter-${quarterIndex}`"
        class="justify-between"
      >
        <CalendarCell
          v-for="month in quarter"
          :key="month.toString()"
          :date="month"
        >
          <div
            :class="cn(calendarCellTriggerVariants())"
            @click="() => handleClick(month)"
          >
            {{ formatter.custom(toDate(month), { month: 'short' }) }}
          </div>
        </CalendarCell>
      </CalendarGridRow>
    </CalendarGridBody>
  </CalendarGrid>
</template>
