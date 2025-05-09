import type { VariantProps } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export { default as Calendar } from './Calendar.vue'

export * from './CalendarProvider'
export * from './panels'
export * from './parts/index'

const prefix = `${PREFIX}-calendar`
export const calendarRootVariants = cva(
  ['rounded', 'group/calendar'],
  {
    variants: {
      size: {
        base: ['p-3', '[&_[data-calendar-panel]]:mt-4'],
        sm: ['p-2', '[&_[data-calendar-panel]]:mt-2'],
        lg: ['p-4', '[&_[data-calendar-panel]]:mt-6'],
      },
    },
  },
  {
    className: prefix,
  },
)
export type CalendarVariantsProps = VariantProps<typeof calendarRootVariants>
