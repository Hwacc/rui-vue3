import type { VariantProps } from '@rui/core/lib/tv'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as Calendar } from './Calendar.vue'

export * from './CalendarProvider'
export * from './panels'
export * from './parts/index'

const prefix = `${PREFIX}-calendar`

export const tvCalendar = tv({
  base: [
    'rounded',
    'group/calendar',
  ],
  variants: {
    size: {
      base: ['p-3', '[&_[data-calendar-panel]]:mt-4'],
      sm: ['p-2', '[&_[data-calendar-panel]]:mt-2'],
      lg: ['p-4', '[&_[data-calendar-panel]]:mt-6'],
    },
  },
  defaultVariants: {
    size: 'base',
  },
}, {
  class: prefix,
})

export type CalendarVariantsProps = VariantProps<typeof tvCalendar>
