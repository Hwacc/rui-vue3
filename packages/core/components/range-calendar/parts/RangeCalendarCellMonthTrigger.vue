<script lang="ts">
import type { DateValue } from '@internationalized/date'
import type { PrimitiveProps } from 'reka-ui'
import type { HtmlHTMLAttributes } from 'vue'
import { isSameMonth } from '@internationalized/date'
import { CalendarPanelEnum } from '@rui/core/lib/constants'
import { isBetween, toDate } from 'reka-ui/date'
import { computed } from 'vue'
import { injectRangeCalendarContextEx } from '../RangeCalendarProvider'
import { useRangeCellTriggerKeyControl } from './utils'

export interface CalendarCellTriggerProps extends PrimitiveProps {
  /** The date value provided to the cell trigger */
  date: DateValue
  class?: HtmlHTMLAttributes['class']
  unstyled?: boolean
}

export interface CalendarCellTriggerSlot {
  default: (props: { selected: boolean, monthValue: string }) => any
}
</script>

<script setup lang="ts">
import { calendarCellTriggerVariants } from '@rui/core/components/calendar'
import { usePrimitiveElement } from '@rui/core/hooks/usePrimitiveElement'
import { cn } from '@rui/core/lib/utils'
import {
  injectRangeCalendarRootContext,
  Primitive,
  useDateFormatter,
} from 'reka-ui'

const {
  class: propsClass,
  unstyled,
  as = 'div',
  ...props
} = defineProps<CalendarCellTriggerProps>()

defineSlots<CalendarCellTriggerSlot>()

const context = injectRangeCalendarRootContext()
const contextEx = injectRangeCalendarContextEx()

const { primitiveElement, currentElement } = usePrimitiveElement()
const formatter = useDateFormatter(context.locale.value)

const monthValue = computed(() =>
  formatter.custom(toDate(props.date), {
    month: 'short',
  }),
)

const labelText = computed(() => {
  return context.formatter.custom(toDate(props.date), {
    month: 'long',
    year: 'numeric',
  })
})

const isFocusedDate = computed(() => {
  return (
    !context.disabled.value
    && isSameMonth(props.date, context.placeholder.value)
  )
})
const isSelectionStart = computed(() => {
  if (!context.startValue.value)
    return false
  return isSameMonth(context.startValue.value, props.date)
})
const isSelectionEnd = computed(() => {
  if (!context.endValue.value)
    return false
  return isSameMonth(context.endValue.value, props.date)
})
const isSelectedDate = computed(() => {
  const { startValue, endValue } = context
  if (startValue.value && isSameMonth(startValue.value, props.date))
    return true
  if (endValue.value && isSameMonth(endValue.value, props.date))
    return true
  if (endValue.value && startValue.value)
    return isBetween(props.date, startValue.value, endValue.value)
  return false
})

function handleClick() {
  context.onPlaceholderChange(
    context.placeholder.value.copy().set({ month: props.date.month }),
  )
  contextEx.panel.value = CalendarPanelEnum.DAY
}

const { handleArrowKey } = useRangeCellTriggerKeyControl({
  currentElement,
  onPrevPage: (placeholder) => {
    return placeholder.subtract({ years: 1 })
  },
  onNextPage: (placeholder) => {
    return placeholder.add({ years: 1 })
  },
  onSelect: handleClick,
})
</script>

<template>
  <Primitive
    ref="primitiveElement"
    :class="cn(calendarCellTriggerVariants({ unstyled }), propsClass)"
    :as="as"
    v-bind="props"
    role="button"
    :aria-label="labelText"
    data-reka-calendar-cell-trigger
    :data-selected="isSelectedDate ? true : undefined"
    :data-selection-start="isSelectionStart ? true : undefined"
    :data-selection-end="isSelectionEnd ? true : undefined"
    :data-focused="isFocusedDate ? '' : undefined"
    :tabindex="0"
    @click="handleClick"
    @keydown.up.down.left.right.space.enter="handleArrowKey"
    @keydown.enter.prevent
  >
    <slot :month-value="monthValue" :selected="isSelectedDate">
      {{ monthValue }}
    </slot>
  </Primitive>
</template>
