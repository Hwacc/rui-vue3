import type { VariantProps } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

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
export const calendarHeaderVariants = cva(
  ['relative', 'flex', 'w-full', 'items-center', 'justify-between'],
  undefined,
  {
    className: `${prefix}-header`,
  },
)

export const calendarHeadingVariants = cva(
  [],
  {
    variants: {
      size: {
        base: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
    },
  },
  {
    className: `${prefix}-heading`,
  },
)
export type CalendarHeadingVariantsProps = VariantProps<
  typeof calendarHeadingVariants
>

export const calendarGridVariants = cva(['w-full'], undefined, {
  className: `${prefix}-grid`,
})

const calendarCellSizes = {
  base: ['size-6', 'text-sm'],
  lg: ['size-8', 'text-base'],
  sm: ['size-5', 'text-xs'],
}
export const calendarHeadCellVariants = cva(
  ['text-center'],
  {
    variants: {
      size: calendarCellSizes,
    },
  },
  {
    className: `${prefix}-head-cell`,
  },
)
export type CalendarHeadCellVariantsProps = VariantProps<
  typeof calendarHeadCellVariants
>
export const calendarCellVariants = cva(
  ['relative', 'text-center', 'focus-within:relative', 'focus-within:z-20'],
  {
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
    className: `${prefix}-cell`,
  },
)
export type CalendarCellVariantsProps = VariantProps<
  typeof calendarCellVariants
>

export const calendarCellTriggerVariants = cva(
  ['relative size-full flex items-center justify-center', 'cursor-default'],
  {
    variants: {
      size: {
        base: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base'],
      },
    },
  },
  {
    className: `${prefix}-cell-trigger`,
  },
)
export type CalendarCellTriggerVariantsProps = VariantProps<
  typeof calendarCellTriggerVariants
>
