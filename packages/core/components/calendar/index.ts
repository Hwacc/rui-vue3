import { PREFIX } from '@/core/lib/constants'
import { cva, VariantProps } from '@/core/lib/cva'

export { default as Calendar } from './Calendar.vue'
export { default as CalendarCell } from './CalendarCell.vue'
export { default as CalendarCellTrigger } from './CalendarCellTrigger.vue'
export { default as CalendarGrid } from './CalendarGrid.vue'
export { default as CalendarGridBody } from './CalendarGridBody.vue'
export { default as CalendarGridHead } from './CalendarGridHead.vue'
export { default as CalendarGridRow } from './CalendarGridRow.vue'
export { default as CalendarHeadCell } from './CalendarHeadCell.vue'
export { default as CalendarHeader } from './CalendarHeader.vue'
export { default as CalendarHeading } from './CalendarHeading.vue'
export { default as CalendarNextButton } from './CalendarNextButton.vue'
export { default as CalendarPrevButton } from './CalendarPrevButton.vue'

const prefix = `${PREFIX}-calendar`

export const calendarRootVariants = cva(
  ['rounded'],
  {
    variants: {
      size: {
        base: ['p-3', '[&_[data-calendar-body]]:mt-4'],
        sm: ['p-2', '[&_[data-calendar-body]]:mt-2'],
        lg: ['p-4', '[&_[data-calendar-body]]:mt-6']
      }
    }
  },
  {
    className: prefix
  }
)
export type CalendarVariantsProps = VariantProps<typeof calendarRootVariants>

export const calendarHeaderVariants = cva(
  ['relative', 'flex', 'w-full', 'items-center', 'justify-between'],
  undefined,
  {
    className: `${prefix}-header`
  }
)
