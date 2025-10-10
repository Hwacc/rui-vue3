<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { CalendarPanelProps } from '.'
import { chunk } from 'lodash-es'
import { createYear } from 'reka-ui/date'
import { computed } from 'vue'
import {
  CalendarCell,
  CalendarCellMonthTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridRow,
} from '../parts'

const {
  date,
  size = 'base',
  unstyled,
  ui,
} = defineProps<
  CalendarPanelProps & {
    date: DateValue
  }
>()

const monthGrid = computed(() => {
  return chunk(createYear({ dateObj: date }), 3)
})
</script>

<template>
  <CalendarGrid
    v-bind="ui?.grid"
    :unstyled="ui?.grid?.unstyled ?? unstyled"
  >
    <CalendarGridBody
      v-bind="ui?.body"
      :unstyled="ui?.body?.unstyled ?? unstyled"
    >
      <CalendarGridRow
        v-for="(quarter, quarterIndex) in monthGrid"
        :key="`quarter-${quarterIndex}`"
        v-bind="ui?.row"
        :unstyled="ui?.row?.unstyled ?? unstyled"
      >
        <CalendarCell
          v-for="month in quarter"
          :key="month.toString()"
          v-bind="ui?.bodyCell"
          :date="month"
          variant="month"
          :size="ui?.bodyCell?.size ?? size"
          :unstyled="ui?.bodyCell?.unstyled ?? unstyled"
        >
          <CalendarCellMonthTrigger
            v-bind="ui?.bodyCellTrigger"
            :date="month"
            :size="ui?.bodyCellTrigger?.size ?? size"
            :unstyled="ui?.bodyCellTrigger?.unstyled ?? unstyled"
          />
        </CalendarCell>
      </CalendarGridRow>
    </CalendarGridBody>
  </CalendarGrid>
</template>
