<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { CalendarVariantsProps } from '@rui/core/components/calendar'
import type { RangeCalendarGridProps } from 'reka-ui'
import { chunk } from 'lodash-es'
import { useForwardProps } from 'reka-ui'
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
  variant: 'month' as any,
}))
const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarGrid v-bind="forwarded">
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
