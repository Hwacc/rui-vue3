import { PREFIX } from '@/core/lib/constants'
import { cva, type VariantProps } from '@/core/lib/cva'

export { default as CalendarHeader } from './CalendarHeader.vue'
export { default as CalendarHeading } from './CalendarHeading.vue'
export { default as CalendarPrevButton } from './CalendarPrevButton.vue'
export { default as CalendarNextButton } from './CalendarNextButton.vue'
export { default as CalendarGrid } from './CalendarGrid.vue'
export { default as CalendarCell } from './CalendarCell.vue'
export { default as CalendarCellTrigger } from './CalendarCellTrigger.vue'
export { default as CalendarGridBody } from './CalendarGridBody.vue'
export { default as CalendarGridHead } from './CalendarGridHead.vue'
export { default as CalendarGridRow } from './CalendarGridRow.vue'
export { default as CalendarHeadCell } from './CalendarHeadCell.vue'

export const prefix = `${PREFIX}-calendar`
export const calendarHeaderVariants = cva(
  ['relative', 'flex', 'w-full', 'items-center', 'justify-between'],
  undefined,
  {
    className: `${prefix}-header`
  }
)

export const calendarHeadingVariants = cva(
  [],
  {
    variants: {
      size: {
        base: ['text-sm'],
        sm: ['text-xs'],
        lg: ['text-base']
      }
    }
  },
  {
    className: `${prefix}-heading`
  }
)
export type CalendarHeadingVariantsProps = VariantProps<
  typeof calendarHeadingVariants
>

export const calendarGridVariants = cva(['w-full'], undefined, {
  className: `${prefix}-grid`
})

const calendarCellSizes = {
  base: ['size-6', 'm-0.5', 'text-sm'],
  lg: [],
  sm: []
}
export const calendarHeadCellVariants = cva(
  ['text-center'],
  {
    variants: {
      size: calendarCellSizes
    }
  },
  {
    className: `${prefix}-head-cell`
  }
)
export type CalendarHeadCellVariantsProps = VariantProps<
  typeof calendarHeadCellVariants
>
export const calendarCellVariants = cva(
  [
    'relative',
    'text-center',
    'focus-within:relative',
    'focus-within:z-20',
    '[&:has([data-selected])]:rounded-md',
    '[&:has([data-selected])]:bg-hff',
    '[&:has([data-selected][data-outside-view])]:bg-accent/50'
  ],
  {
    variants: {
      size: calendarCellSizes
    }
  },
  {
    className: `${prefix}-cell`
  }
)
export type CalendarCellVariantsProps = VariantProps<
  typeof calendarCellVariants
>

export const calendarCellTriggerVariants = cva(
  [
    '[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground',
    // Selected
    'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground',
    // Disabled
    'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
    // Unavailable
    'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
    // Outside months
    'data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50 [&[data-outside-view][data-selected]]:bg-accent/50 [&[data-outside-view][data-selected]]:text-muted-foreground [&[data-outside-view][data-selected]]:opacity-30'
  ],
  {
    variants: {
      size: calendarCellSizes
    }
  },
  {
    className: `${prefix}-cell-trigger`
  }
)
export type CalendarCellTriggerVariantsProps = VariantProps<
  typeof calendarCellTriggerVariants
>
