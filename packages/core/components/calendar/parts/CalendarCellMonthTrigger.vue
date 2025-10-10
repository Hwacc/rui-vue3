<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { PrimitiveProps } from 'reka-ui'
import type { HtmlHTMLAttributes } from 'vue'
import type { CalendarCellTriggerVariants } from '.'
import { isSameMonth, isSameYear } from '@internationalized/date'
import { usePrimitiveElement } from '@rui/core/composables/usePrimitiveElement'
import { CalendarPanelEnum } from '@rui/core/lib/constants'
import { injectCalendarRootContext, Primitive, useDateFormatter, useForwardProps } from 'reka-ui'
import { toDate } from 'reka-ui/date'
import { computed } from 'vue'
import { tvCalendarCellTrigger } from '.'
import { injectCalendarContextEx } from '../CalendarProvider'
import { useCellTriggerKeyControl } from './utils'

export interface CalendarMonthCellTriggerProps extends PrimitiveProps {
  /** The date value provided to the cell trigger */
  date: DateValue
  class?: HtmlHTMLAttributes['class']
  size?: CalendarCellTriggerVariants['size']
  unstyled?: boolean
}

export interface CalendarMonthCellTriggerSlot {
  default: (props: { selected: boolean, monthValue: string }) => any
}

const {
  class: propsClass,
  unstyled,
  size = 'base',
  as = 'div',
  ...props
} = defineProps<CalendarMonthCellTriggerProps>()

defineSlots<CalendarMonthCellTriggerSlot>()

const context = injectCalendarRootContext()
const contextEx = injectCalendarContextEx()

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
const isSelectedDate = computed(() => {
  if (!context.modelValue.value)
    return false
  return Array.isArray(context.modelValue.value)
    ? context.modelValue.value.some((date) => {
        return isSameMonth(props.date, date) && isSameYear(props.date, date)
      })
    : isSameMonth(context.modelValue.value, props.date)
      && isSameYear(context.modelValue.value, props.date)
})

function handleClick() {
  context.onPlaceholderChange(
    context.placeholder.value.copy().set({ month: props.date.month }),
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
  onSelect: handleClick,
})

const forwarded = useForwardProps(props)
</script>

<template>
  <Primitive
    ref="primitiveElement"
    v-bind="forwarded"
    :class="tvCalendarCellTrigger({ unstyled, size, class: propsClass })"
    :as="as"
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
