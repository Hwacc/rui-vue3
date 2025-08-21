<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { CalendarGridProps } from 'reka-ui'
import type { CalendarVariantsProps } from '..'
import { chunk } from 'lodash-es'
import { createDecade } from 'reka-ui/date'
import { computed } from 'vue'
import { CalendarCellYearTrigger } from '..'
import {
  CalendarCell,
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

const yearGrid = computed(() => {
  return chunk(createDecade({ dateObj: date, startIndex: -6, endIndex: 6 }), 3)
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
        v-for="(triple, tripleIndex) in yearGrid"
        :key="`year-${tripleIndex}`"
        v-bind="variants"
      >
        <CalendarCell
          v-for="year in triple"
          :key="year.toString()"
          :date="year"
          v-bind="variants"
        >
          <CalendarCellYearTrigger :date="year" v-bind="variants" />
        </CalendarCell>
      </CalendarGridRow>
    </CalendarGridBody>
  </CalendarGrid>
</template>
