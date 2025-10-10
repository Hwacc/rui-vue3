import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { CalendarCell, CalendarCellTrigger, CalendarGrid, CalendarGridBody, CalendarGridHead, CalendarGridRow, CalendarHeadCell, CalendarVariantsProps } from '..'

export { default as CalendarDayPanel } from './CalendarDay.vue'
export { default as CalendarMonthPanel } from './CalendarMonth.vue'
export { default as CalendarYearPanel } from './CalendarYear.vue'

export type CalendarPanelProps = {
  class?: HTMLAttributes['class']
  size?: CalendarVariantsProps['size']
  unstyled?: boolean
  ui?: {
    grid?: ComponentProps<typeof CalendarGrid>
    head?: ComponentProps<typeof CalendarGridHead>
    headCell?: ComponentProps<typeof CalendarHeadCell>
    row?: ComponentProps<typeof CalendarGridRow>
    body?: ComponentProps<typeof CalendarGridBody>
    bodyCell?: ComponentProps<typeof CalendarCell>
    bodyCellTrigger?: ComponentProps<typeof CalendarCellTrigger>
  }
}
