<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { RangeCalendarPanelProps } from '..'
import { chunk } from 'lodash-es'
import { createDecade } from 'reka-ui/date'
import { computed } from 'vue'
import {
  RangeCalendarCell,
  RangeCalendarCellYearTrigger,
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

const yearGrid = computed(() => {
  return chunk(createDecade({ dateObj: date, startIndex: -6, endIndex: 6 }), 3)
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
        v-for="(triple, tripleIndex) in yearGrid"
        :key="`year-${tripleIndex}`"
        v-bind="ui?.row"
        :unstyled="ui?.row?.unstyled ?? unstyled"
      >
        <RangeCalendarCell
          v-for="year in triple"
          :key="year.toString()"
          :date="year"
          v-bind="ui?.bodyCell"
          variant="year"
          :size="ui?.bodyCell?.size ?? size"
          :unstyled="ui?.bodyCell?.unstyled ?? unstyled"
        >
          <RangeCalendarCellYearTrigger
            v-bind="ui?.bodyCellTrigger"
            :date="year"
            :size="ui?.bodyCellTrigger?.size ?? size"
            :unstyled="ui?.bodyCellTrigger?.unstyled ?? unstyled"
          />
        </RangeCalendarCell>
      </RangeCalendarGridRow>
    </RangeCalendarGridBody>
  </RangeCalendarGrid>
</template>
