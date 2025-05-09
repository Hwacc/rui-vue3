<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { DateValue } from '@internationalized/date'
import { toDate } from 'reka-ui/date'
import { isSameMonth, isSameYear } from '@internationalized/date'
import { computed, HtmlHTMLAttributes } from 'vue'
import { injectCalendarContextEx } from '../CalendarProvider'
import { useCellTriggerKeyControl } from './utils'
import { CalendarPanelEnum } from '@rui/core/lib/constants'

export interface CalendarCellTriggerProps extends PrimitiveProps {
  /** The date value provided to the cell trigger */
  date: DateValue
  class?: HtmlHTMLAttributes['class']
  unstyled?: boolean
}

export interface CalendarCellTriggerSlot {
  default: (props: { selected: boolean; monthValue: string }) => any
}
</script>

<script setup lang="ts">
import { Primitive, injectCalendarRootContext, useDateFormatter } from 'reka-ui'
import { usePrimitiveElement } from '@rui/core/hooks/usePrimitiveElement'
import { cn } from '@rui/core/lib/utils'
import { calendarCellTriggerVariants } from '.'

const {
  class: propsClass,
  unstyled,
  as = 'div',
  ...props
} = defineProps<CalendarCellTriggerProps>()

defineSlots<CalendarCellTriggerSlot>()

const context = injectCalendarRootContext()
const contextEx = injectCalendarContextEx()

const { primitiveElement, currentElement } = usePrimitiveElement()
const formatter = useDateFormatter(context.locale.value)

const monthValue = computed(() =>
  formatter.custom(toDate(props.date), {
    month: 'short'
  })
)

const labelText = computed(() => {
  return context.formatter.custom(toDate(props.date), {
    month: 'long',
    year: 'numeric'
  })
})

const isFocusedDate = computed(() => {
  return (
    !context.disabled.value &&
    isSameMonth(props.date, context.placeholder.value)
  )
})
const isSelectedDate = computed(() => {
  if (!context.modelValue.value) return false
  return Array.isArray(context.modelValue.value)
    ? context.modelValue.value.some((date) => {
        return isSameMonth(props.date, date) && isSameYear(props.date, date)
      })
    : isSameMonth(context.modelValue.value, props.date) &&
        isSameYear(context.modelValue.value, props.date)
})

const handleClick = () => {
  context.onPlaceholderChange(
    context.placeholder.value.copy().set({ month: props.date.month })
  )
  contextEx.panel.value = CalendarPanelEnum.DAY
}

const { handleArrowKey } = useCellTriggerKeyControl({
  currentElement,
  onPrevPage: (placeholder) => {
    return placeholder.subtract({ years: 1 })
  },
  onNextPage: (placeholder) => {
    return placeholder.add({ years: 1 })
  },
  onSelect: handleClick
})
</script>

<template>
  <Primitive
    :class="cn(calendarCellTriggerVariants({ unstyled }), propsClass)"
    ref="primitiveElement"
    :as="as"
    v-bind="props"
    role="button"
    :aria-label="labelText"
    data-reka-calendar-cell-trigger
    :data-selected="isSelectedDate ? true : undefined"
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
