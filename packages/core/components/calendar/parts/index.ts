import type { VariantProps } from '@rui/core/lib/tv'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as CalendarCell } from './CalendarCell.vue'
export { default as CalendarCellMonthTrigger } from './CalendarCellMonthTrigger.vue'
export { default as CalendarCellTrigger } from './CalendarCellTrigger.vue'
export { default as CalendarCellYearTrigger } from './CalendarCellYearTrigger.vue'
export { default as CalendarGrid } from './CalendarGrid.vue'
export { default as CalendarGridBody } from './CalendarGridBody.vue'
export { default as CalendarGridHead } from './CalendarGridHead.vue'
export { default as CalendarGridRow } from './CalendarGridRow.vue'
export { default as CalendarHeadCell } from './CalendarHeadCell.vue'
export { default as CalendarHeader } from './CalendarHeader.vue'
export { default as CalendarHeading } from './CalendarHeading.vue'
export { default as CalendarNextButton } from './CalendarNextButton.vue'
export { default as CalendarPrevButton } from './CalendarPrevButton.vue'

export const prefix = `${PREFIX}-calendar`

export const tvCalendarHeader = tv(
  {
    base: ['relative', 'flex', 'w-full', 'items-center', 'justify-between'],
  },
  {
    class: `${prefix}-header`,
  },
)
export type CalendarHeaderVariantsProps = VariantProps<typeof tvCalendarHeader>

export const tvCalendarHeading = tv(
  {
    base: [],
    variants: {
      size: {
        base: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
    },
  },
  {
    class: `${prefix}-heading`,
  },
)
export type CalendarHeadingVariantsProps = VariantProps<typeof tvCalendarHeading>

export const tvCalendarGrid = tv(
  {
    slots: {
      base: ['w-full'],
      head: [],
      body: [],
    },
  },
  {
    slots: {
      base: `${prefix}-grid`,
      head: `${prefix}-grid-head`,
      body: `${prefix}-grid-body`,
    },
  },
)
export type CalendarGridVariants = VariantProps<typeof tvCalendarGrid>

const calendarCellSizes = {
  base: ['size-6', 'text-sm'],
  lg: ['size-8', 'text-base'],
  sm: ['size-5', 'text-xs'],
}
export const tvCalendarHeadCell = tv(
  {
    base: ['text-center'],
    variants: {
      size: calendarCellSizes,
    },
  },
  {
    class: `${prefix}-head-cell`,
  },
)
export type CalendarHeadCellVariants = VariantProps<typeof tvCalendarHeadCell>

export const tvCalendarCell = tv(
  {
    base: ['relative', 'text-center', 'focus-within:relative', 'focus-within:z-20'],
    variants: {
      size: calendarCellSizes,
      variant: {
        year: '',
        month: '',
        day: '',
      },
    },
    compoundVariants: [
      {
        variant: 'month',
        size: 'base',
        class: ['size-8'],
      },
      {
        variant: 'month',
        size: 'lg',
        class: ['size-10'],
      },
      {
        variant: 'month',
        size: 'sm',
        class: ['size-7'],
      },
    ],
    defaultVariants: {
      variant: 'day',
      size: 'base',
    },
  },
  {
    class: `${prefix}-cell`,
  },
)
export type CalendarCellVariants = VariantProps<typeof tvCalendarCell>

export const tvCalendarCellTrigger = tv(
  {
    base: ['relative size-full flex items-center justify-center', 'cursor-default'],
    variants: {
      size: {
        base: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
    },
  },
  {
    class: `${prefix}-cell-trigger`,
  },
)
export type CalendarCellTriggerVariants = VariantProps<typeof tvCalendarCellTrigger>
