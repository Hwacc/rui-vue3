<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { DateValue } from '@internationalized/date'
import { toDate } from 'reka-ui/date'
import { isSameYear } from '@internationalized/date'
import { computed, HtmlHTMLAttributes } from 'vue'
import { CalendarPanelEnum, injectCalendarContextEx } from '../CalendarProvider'
import { useCellTriggerKeyControl } from './utils'

export interface CalendarCellTriggerProps extends PrimitiveProps {
  /** The date value provided to the cell trigger */
  date: DateValue
  class?: HtmlHTMLAttributes['class']
  unstyled?: boolean
}

export interface CalendarCellTriggerSlot {
  default: (props: { selected: boolean; yearValue: string }) => any
}
</script>

<script setup lang="ts">
import { Primitive, injectCalendarRootContext } from 'reka-ui'
import { usePrimitiveElement } from '@/core/hooks/usePrimitiveElement'
import { cn } from '@/core/lib/utils'
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
    ? context.modelValue.value.some((date) => date.year === props.date.year)
    : context.modelValue.value?.year === props.date.year
})

const handleClick = () => {
  context.onPlaceholderChange(
    context.placeholder.value.copy().set({ year: props.date.year })
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
    <slot :year-value="labelText" :selected="isSelectedDate">
      {{ labelText }}
    </slot>
  </Primitive>
</template>
