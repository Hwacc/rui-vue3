<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { CalendarGridProps } from 'reka-ui'
import type { CalendarVariantsProps } from '..'
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
  ...props
} = defineProps<
  CalendarGridProps & {
    date: DateValue
    size?: CalendarVariantsProps['size']
    unstyled?: boolean
  }
>()

const monthGrid = computed(() => {
  return chunk(createYear({ dateObj: date }), 3)
})

const variants = computed(() => ({
  size,
  unstyled,
  variant: 'month' as any,
}))
</script>

<template>
  <CalendarGrid v-bind="props">
    <CalendarGridBody v-bind="variants">
      <CalendarGridRow
        v-for="(quarter, quarterIndex) in monthGrid"
        :key="`quarter-${quarterIndex}`"
        v-bind="variants"
      >
        <CalendarCell
          v-for="month in quarter"
          :key="month.toString()"
          :date="month"
          v-bind="variants"
        >
          <CalendarCellMonthTrigger :date="month" v-bind="variants" />
        </CalendarCell>
      </CalendarGridRow>
    </CalendarGridBody>
  </CalendarGrid>
</template>
