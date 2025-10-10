<script setup lang="ts">
import type { CalendarPanelProps } from '.'
import { injectCalendarRootContext } from 'reka-ui'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
} from '../parts'

const { class: propsClass, size, unstyled, ui } = defineProps<CalendarPanelProps>()
const { grid, weekDays } = injectCalendarRootContext()
</script>

<template>
  <CalendarGrid
    v-for="month in grid"
    :key="month.value.toString()"
    v-bind="ui?.grid"
    :class="ui?.grid?.class ?? propsClass"
    :unstyled="ui?.grid?.unstyled ?? unstyled"
  >
    <CalendarGridHead
      v-bind="ui?.head"
      :unstyled="ui?.head?.unstyled ?? unstyled"
    >
      <CalendarGridRow
        v-bind="ui?.row"
        :unstyled="ui?.row?.unstyled ?? unstyled"
      >
        <CalendarHeadCell
          v-for="day in weekDays"
          :key="`head-cell-${day}`"
          v-bind="ui?.headCell"
          :size="ui?.headCell?.size ?? size"
          :unstyled="ui?.headCell?.unstyled ?? unstyled"
        >
          {{ day }}
        </CalendarHeadCell>
      </CalendarGridRow>
    </CalendarGridHead>
    <CalendarGridBody
      v-bind="ui?.body"
      :unstyled="ui?.body?.unstyled ?? unstyled"
    >
      <CalendarGridRow
        v-for="(weekDates, index) in month.rows"
        :key="`weekDate-${index}`"
        v-bind="ui?.row"
        :unstyled="ui?.row?.unstyled ?? unstyled"
      >
        <CalendarCell
          v-for="weekDate in weekDates"
          v-bind="ui?.bodyCell"
          :key="weekDate.toString()"
          :date="weekDate"
          variant="day"
          :size="ui?.bodyCell?.size ?? size"
          :unstyled="ui?.bodyCell?.unstyled ?? unstyled"
        >
          <CalendarCellTrigger
            v-bind="ui?.bodyCellTrigger"
            :day="weekDate"
            :month="month.value"
            :size="ui?.bodyCellTrigger?.size ?? size"
            :unstyled="ui?.bodyCellTrigger?.unstyled ?? unstyled"
          />
        </CalendarCell>
      </CalendarGridRow>
    </CalendarGridBody>
  </CalendarGrid>
</template>
