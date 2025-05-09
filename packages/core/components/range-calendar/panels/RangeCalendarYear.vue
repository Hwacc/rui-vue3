<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { createDecade } from 'reka-ui/date'
import { RangeCalendarGridProps } from 'reka-ui'
import {
  RangeCalendarGrid,
  RangeCalendarCell,
  RangeCalendarGridBody,
  RangeCalendarGridRow,
  RangeCalendarCellYearTrigger
} from '../parts'
import { computed } from 'vue'
import { chunk } from 'lodash-es'
import { type CalendarVariantsProps } from '@rui/core/components/calendar'

const {
  date,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  RangeCalendarGridProps & {
    date: DateValue
    size?: CalendarVariantsProps['size']
    unstyled?: boolean
  }
>()

const yearGrid = computed(() => {
  return chunk(createDecade({ dateObj: date, startIndex: -6, endIndex: 6 }), 3)
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
        v-for="(triple, tripleIndex) in yearGrid"
        :key="`year-${tripleIndex}`"
        v-bind="variants"
      >
        <RangeCalendarCell
          v-for="year in triple"
          :key="year.toString()"
          :date="year"
          v-bind="variants"
        >
          <RangeCalendarCellYearTrigger :date="year" v-bind="variants" />
        </RangeCalendarCell>
      </RangeCalendarGridRow>
    </RangeCalendarGridBody>
  </RangeCalendarGrid>
</template>
