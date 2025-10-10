<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { RangeCalendarPanelProps } from '..'
import { chunk } from 'lodash-es'
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
  ui,
} = defineProps<
  RangeCalendarPanelProps & {
    date: DateValue
  }
>()

const monthGrid = computed(() => {
  return chunk(createYear({ dateObj: date }), 3)
})
</script>

<template>
  <RangeCalendarGrid
    v-bind="ui?.grid"
    :unstyled="ui?.grid?.unstyled ?? unstyled"
  >
    <RangeCalendarGridBody
      v-bind="ui?.body"
      :unstyled="ui?.body?.unstyled ?? unstyled"
    >
      <RangeCalendarGridRow
        v-for="(quarter, quarterIndex) in monthGrid"
        :key="`quarter-${quarterIndex}`"
        v-bind="ui?.row"
        :unstyled="ui?.row?.unstyled ?? unstyled"
      >
        <RangeCalendarCell
          v-for="month in quarter"
          :key="month.toString()"
          v-bind="ui?.bodyCell"
          :date="month"
          variant="month"
          :size="ui?.bodyCell?.size ?? size"
          :unstyled="ui?.bodyCell?.unstyled ?? unstyled"
        >
          <RangeCalendarCellMonthTrigger
            v-bind="ui?.bodyCellTrigger"
            :date="month"
            :size="ui?.bodyCellTrigger?.size ?? size"
            :unstyled="ui?.bodyCellTrigger?.unstyled ?? unstyled"
          />
        </RangeCalendarCell>
      </RangeCalendarGridRow>
    </RangeCalendarGridBody>
  </RangeCalendarGrid>
</template>
