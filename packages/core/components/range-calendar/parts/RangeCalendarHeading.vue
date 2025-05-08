<script lang="tsx" setup>
import type { RangeCalendarHeadingProps } from 'reka-ui'
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
  const year = (
    <div
      class='cursor-default'
      role='button'
      tabindex='0'
      aria-label='Heading Year'
      onKeydown={(e) => {
        e.code === 'Enter' && (contextEx.panel.value = CalendarPanelEnum.YEAR)
      }}
      onClick={() => (contextEx.panel.value = CalendarPanelEnum.YEAR)}>
      {formatter.fullYear(toDate(grid[0].value))}
    </div>
  )
  const month = (
    <div
      class='cursor-default'
      role='button'
      tabindex='0'
      aria-label='Heading Month'
      onKeydown={(e) => {
        e.code === 'Enter' && (contextEx.panel.value = CalendarPanelEnum.MONTH)
      }}
      onClick={() => (contextEx.panel.value = CalendarPanelEnum.MONTH)}>
      {formatter.fullMonth(toDate(grid[0].value))}
    </div>
  )
  if (panel === CalendarPanelEnum.YEAR) {
    return <div class='flex items-center'>{year}</div>
  }

  if (panel === CalendarPanelEnum.MONTH) {
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
