import type { CalendarVariants } from '@rui/core/components/calendar'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
} from '../parts'

export { default as RangeCalendarDayPanel } from './RangeCalendarDay.vue'
export { default as RangeCalendarMonthPanel } from './RangeCalendarMonth.vue'
export { default as RangeCalendarYearPanel } from './RangeCalendarYear.vue'

export type RangeCalendarPanelProps = {
  class?: HTMLAttributes['class']
  size?: CalendarVariants['size']
  unstyled?: boolean
  ui?: {
    grid?: ComponentProps<typeof RangeCalendarGrid>
    head?: ComponentProps<typeof RangeCalendarGridHead>
    headCell?: ComponentProps<typeof RangeCalendarHeadCell>
    row?: ComponentProps<typeof RangeCalendarGridRow>
    body?: ComponentProps<typeof RangeCalendarGridBody>
    bodyCell?: ComponentProps<typeof RangeCalendarCell>
    bodyCellTrigger?: ComponentProps<typeof RangeCalendarCellTrigger>
  }
}
