<script lang="tsx" setup>
import type { CalendarHeadingProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { CalendarHeadingVariantsProps } from '.'
import { CalendarPanelEnum } from '@rui/core/lib/constants'
import { cn } from '@rui/core/lib/utils'
import {
  CalendarHeading,
  injectCalendarRootContext,
  useDateFormatter,
  useForwardProps,
} from 'reka-ui'
import { toDate } from 'reka-ui/date'
import { computed } from 'vue'
import { calendarHeadingVariants } from '.'
import { injectCalendarContextEx } from '..'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  ...props
} = defineProps<
  CalendarHeadingProps & {
    class?: HTMLAttributes['class']
    size?: CalendarHeadingVariantsProps['size']
    unstyled?: boolean
  }
>()

defineSlots<{
  default: (props: { headingValue: string }) => any
}>()
const context = injectCalendarRootContext()
const contextEx = injectCalendarContextEx()

const formatter = useDateFormatter(context.locale.value)
const forwardedProps = useForwardProps(props)

const Heading = computed(() => {
  const grid = context.grid.value
  const panel = contextEx.panel.value
  const year = (
    <div
      class="cursor-default"
      role="button"
      tabindex="0"
      aria-label="Heading Year"
      onKeydown={(e) => {
        e.code === 'Enter' && (contextEx.panel.value = CalendarPanelEnum.YEAR)
      }}
      onClick={() => (contextEx.panel.value = CalendarPanelEnum.YEAR)}
    >
      {formatter.fullYear(toDate(grid[0].value))}
    </div>
  )
  const month = (
    <div
      class="cursor-default"
      role="button"
      tabindex="0"
      aria-label="Heading Month"
      onKeydown={(e) => {
        e.code === 'Enter' && (contextEx.panel.value = CalendarPanelEnum.MONTH)
      }}
      onClick={() => (contextEx.panel.value = CalendarPanelEnum.MONTH)}
    >
      {formatter.fullMonth(toDate(grid[0].value))}
    </div>
  )
  if (panel === CalendarPanelEnum.YEAR) {
    return <div class="flex items-center">{year}</div>
  }

  if (panel === CalendarPanelEnum.MONTH) {
    return <div class="flex items-center">{year}</div>
  }

  return (
    <div class="flex items-center gap-2">
      {month}
      <span>-</span>
      {year}
    </div>
  )
})
</script>

<template>
  <CalendarHeading
    v-slot="{ headingValue }"
    :class="cn(calendarHeadingVariants({ size, unstyled }), propsClass)"
    v-bind="forwardedProps"
  >
    <slot :heading-value="headingValue">
      <Heading />
    </slot>
  </CalendarHeading>
</template>
