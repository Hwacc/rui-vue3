<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import { createDecade } from 'reka-ui/date'
import { CalendarGridProps } from 'reka-ui'
import {
  CalendarGrid,
  CalendarCell,
  CalendarGridBody,
  CalendarGridRow
} from '../parts'
import { computed } from 'vue'
import { chunk } from 'lodash-es'
import { CalendarVariantsProps, CalendarCellYearTrigger } from '..'

const {
  date,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  CalendarGridProps & {
    date: CalendarDate
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
