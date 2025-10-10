<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { CalendarPanelProps } from '.'
import { chunk } from 'lodash-es'
import { createDecade } from 'reka-ui/date'
import { computed } from 'vue'
import { CalendarCellYearTrigger } from '..'
import { CalendarCell, CalendarGrid, CalendarGridBody, CalendarGridRow } from '../parts'

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

const yearGrid = computed(() => {
  return chunk(createDecade({ dateObj: date, startIndex: -6, endIndex: 6 }), 3)
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
        v-for="(triple, tripleIndex) in yearGrid"
        :key="`year-${tripleIndex}`"
        v-bind="ui?.row"
        :unstyled="ui?.row?.unstyled ?? unstyled"
      >
        <CalendarCell
          v-for="year in triple"
          :key="year.toString()"
          :date="year"
          v-bind="ui?.bodyCell"
          variant="year"
          :size="ui?.bodyCell?.size ?? size"
          :unstyled="ui?.bodyCell?.unstyled ?? unstyled"
        >
          <CalendarCellYearTrigger
            :date="year"
            v-bind="ui?.bodyCellTrigger"
            :size="ui?.bodyCellTrigger?.size ?? size"
            :unstyled="ui?.bodyCellTrigger?.unstyled ?? unstyled"
          />
        </CalendarCell>
      </CalendarGridRow>
    </CalendarGridBody>
  </CalendarGrid>
</template>
