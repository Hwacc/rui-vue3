<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { PrimitiveProps } from 'reka-ui'
import type { HtmlHTMLAttributes } from 'vue'
import type { CalendarCellTriggerVariants } from '.'
import { isSameYear } from '@internationalized/date'
import { usePrimitiveElement } from '@rui/core/composables/usePrimitiveElement'
import { CalendarPanelEnum } from '@rui/core/lib/constants'
import { injectCalendarRootContext, Primitive, useForwardProps } from 'reka-ui'
import { toDate } from 'reka-ui/date'
import { computed } from 'vue'
import { tvCalendarCellTrigger } from '.'
import { injectCalendarContextEx } from '../CalendarProvider'
import { useCellTriggerKeyControl } from './utils'

export interface CalendarYearCellTriggerProps extends PrimitiveProps {
  /** The date value provided to the cell trigger */
  date: DateValue
  class?: HtmlHTMLAttributes['class']
  size?: CalendarCellTriggerVariants['size']
  unstyled?: boolean
}

export interface CalendarYearCellTriggerSlot {
  default: (props: { selected: boolean, yearValue: string }) => any
}

const {
  class: propsClass,
  unstyled,
  size = 'base',
  as = 'div',
  ...props
} = defineProps<CalendarYearCellTriggerProps>()

defineSlots<CalendarYearCellTriggerSlot>()

const context = injectCalendarRootContext()
const contextEx = injectCalendarContextEx()

const { primitiveElement, currentElement } = usePrimitiveElement()

const labelText = computed(() => {
  return context.formatter.custom(toDate(props.date), { year: 'numeric' })
})

const isFocusedDate = computed(() => {
  return (
    !context.disabled.value && isSameYear(props.date, context.placeholder.value)
  )
})
const isSelectedDate = computed(() => {
  return Array.isArray(context.modelValue.value)
    ? context.modelValue.value.some(date => date.year === props.date.year)
    : context.modelValue.value?.year === props.date.year
})

function handleClick() {
  context.onPlaceholderChange(
    context.placeholder.value.copy().set({ year: props.date.year }),
  )
  contextEx.panel.value = CalendarPanelEnum.MONTH
}

const { handleArrowKey } = useCellTriggerKeyControl({
  currentElement,
  onPrevPage: (placeholder) => {
    return placeholder.subtract({ years: 12 })
  },
  onNextPage: (placeholder) => {
    return placeholder.add({ years: 12 })
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
    <slot :year-value="labelText" :selected="isSelectedDate">
      {{ labelText }}
    </slot>
  </Primitive>
</template>
