<script lang="tsx" setup>
import type { DateValue, RangeCalendarHeadingProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import {
  injectRangeCalendarRootContext,
  RangeCalendarHeading,
  useDateFormatter,
  useForwardProps
} from 'reka-ui'
import {
  calendarHeadingVariants,
  type CalendarHeadingVariantsProps
} from '@/core/components/calendar'
import { injectRangeCalendarContextEx } from '../RangeCalendarProvider'
import { CalendarPanelEnum } from '@/core/lib/constants'
import { toDate } from 'reka-ui/date'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  ...props
} = defineProps<
  RangeCalendarHeadingProps & {
    class?: HTMLAttributes['class']
    size?: CalendarHeadingVariantsProps['size']
    unstyled?: boolean
  }
>()

defineSlots<{
  default: (props: { headingValue: string }) => any
}>()

const context = injectRangeCalendarRootContext()
const contextEx = injectRangeCalendarContextEx()

const formatter = useDateFormatter(context.locale.value)
const forwardedProps = useForwardProps(props)

const Heading = computed(() => {
  const grid = context.grid.value
  const panel = contextEx.panel.value

  const generateYear = (date: DateValue) => {
    return (
      <div
        class='cursor-default'
        role='button'
        tabindex='0'
        aria-label='Heading Year'
        onKeydown={(e) => {
          e.code === 'Enter' && (contextEx.panel.value = CalendarPanelEnum.YEAR)
        }}
        onClick={() => (contextEx.panel.value = CalendarPanelEnum.YEAR)}>
        {formatter.fullYear(toDate(date))}
      </div>
    )
  }
  const generateMonth = (date: DateValue) => {
    return (
      <div
        class='cursor-default'
        role='button'
        tabindex='0'
        aria-label='Heading Month'
        onKeydown={(e) => {
          e.code === 'Enter' &&
            (contextEx.panel.value = CalendarPanelEnum.MONTH)
        }}
        onClick={() => (contextEx.panel.value = CalendarPanelEnum.MONTH)}>
        {formatter.fullMonth(toDate(date))}
      </div>
    )
  }

  const year = generateYear(grid[0].value)
  const month = generateMonth(grid[0].value)
  if (panel !== CalendarPanelEnum.DAY) {
    return <div class='flex items-center'>{year}</div>
  }
  return (
    <div class='flex items-center gap-2'>
      {month} - {year}
    </div>
  )
})
</script>

<template>
  <RangeCalendarHeading
    v-slot="{ headingValue }"
    :class="cn(calendarHeadingVariants({ size, unstyled }), propsClass)"
    v-bind="forwardedProps"
  >
    <slot :heading-value="headingValue">
      <Heading />
    </slot>
  </RangeCalendarHeading>
</template>
