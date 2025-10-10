<script setup lang="ts">
import type { RangeCalendarPanelProps } from '..'
import { injectRangeCalendarRootContext } from 'reka-ui'
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
} from '../parts'

const { class: propsClass, size, unstyled, ui } = defineProps<RangeCalendarPanelProps>()

const { grid, weekDays } = injectRangeCalendarRootContext()
</script>

<template>
  <RangeCalendarGrid
    v-for="month in grid"
    :key="month.value.toString()"
    v-bind="ui?.grid"
    :class="ui?.grid?.class ?? propsClass"
    :unstyled="ui?.grid?.unstyled ?? unstyled"
  >
    <RangeCalendarGridHead
      v-bind="ui?.head"
      :unstyled="ui?.head?.unstyled ?? unstyled"
    >
      <RangeCalendarGridRow
        v-bind="ui?.row"
        :unstyled="ui?.row?.unstyled ?? unstyled"
      >
        <RangeCalendarHeadCell
          v-for="day in weekDays"
          :key="`head-cell-${day}`"
          v-bind="ui?.headCell"
          :size="ui?.headCell?.size ?? size"
          :unstyled="ui?.headCell?.unstyled ?? unstyled"
        >
          {{ day }}
        </RangeCalendarHeadCell>
      </RangeCalendarGridRow>
    </RangeCalendarGridHead>
    <RangeCalendarGridBody
      v-bind="ui?.body"
      :unstyled="ui?.body?.unstyled ?? unstyled"
    >
      <RangeCalendarGridRow
        v-for="(weekDates, index) in month.rows"
        :key="`weekDate-${index}`"
        v-bind="ui?.row"
        :unstyled="ui?.row?.unstyled ?? unstyled"
      >
        <RangeCalendarCell
          v-for="weekDate in weekDates"
          :key="weekDate.toString()"
          v-bind="ui?.bodyCell"
          :date="weekDate"
          variant="day"
          :size="ui?.bodyCell?.size ?? size"
          :unstyled="ui?.bodyCell?.unstyled ?? unstyled"
        >
          <RangeCalendarCellTrigger
            v-bind="ui?.bodyCellTrigger"
            :day="weekDate"
            :month="month.value"
            :size="ui?.bodyCellTrigger?.size ?? size"
            :unstyled="ui?.bodyCellTrigger?.unstyled ?? unstyled"
          />
        </RangeCalendarCell>
      </RangeCalendarGridRow>
    </RangeCalendarGridBody>
  </RangeCalendarGrid>
</template>
