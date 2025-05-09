<script lang="ts" setup>
import type {
  DateValue,
  RangeCalendarRootEmits,
  RangeCalendarRootProps
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { RangeCalendarRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import {
  type CalendarVariantsProps,
  calendarRootVariants
} from '@rui/core/components/calendar'
import {
  RangeCalendarProvider,
  RangeCalendarHeader,
  RangeCalendarPrevButton,
  RangeCalendarHeading,
  RangeCalendarNextButton
} from '.'
import {
  RangeCalendarDayPanel,
  RangeCalendarMonthPanel,
  RangeCalendarYearPanel
} from './panels'
import { CalendarPanelEnum } from '@rui/core/lib/constants'
import { CalendarPanelMotion } from '@rui/core/components/motion/CalendarPanelMotion'
import { AnimatePresence } from 'motion-v'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  RangeCalendarRootProps & {
    class?: HTMLAttributes['class']
    size?: CalendarVariantsProps['size']
    unstyled?: boolean
  }
>()

const curPanel = ref<CalendarPanelEnum>(CalendarPanelEnum.DAY)
const onPrevPage = (placeholder: DateValue) => {
  switch (curPanel.value) {
    case CalendarPanelEnum.DAY:
      return placeholder.subtract({ months: 1 })
    case CalendarPanelEnum.MONTH:
      return placeholder.subtract({ years: 1 })
    case CalendarPanelEnum.YEAR:
      return placeholder.subtract({ years: 12 })
    default:
      return placeholder
  }
}
const onNextPage = (placeholder: DateValue) => {
  switch (curPanel.value) {
    case CalendarPanelEnum.DAY:
      return placeholder.add({ months: 1 })
    case CalendarPanelEnum.MONTH:
      return placeholder.add({ years: 1 })
    case CalendarPanelEnum.YEAR:
      return placeholder.add({ years: 12 })
    default:
      return placeholder
  }
}

const variants = computed(() => ({ size, unstyled }))
const emits = defineEmits<RangeCalendarRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <RangeCalendarRoot
    :class="cn(calendarRootVariants({ size, unstyled }), propsClass)"
    v-slot="{ date }"
    v-bind="forwarded"
    data-range-calendar
  >
    <RangeCalendarProvider
      v-slot="{ panel }"
      @update:model-value="(panel) => (curPanel = panel)"
    >
      <div class="group/calendar-header" data-calendar-header>
        <RangeCalendarHeader v-bind="variants">
          <RangeCalendarPrevButton v-bind="variants" :prev-page="onPrevPage" />
          <RangeCalendarHeading v-bind="variants"></RangeCalendarHeading>
          <RangeCalendarNextButton v-bind="variants" :next-page="onNextPage" />
        </RangeCalendarHeader>
      </div>
      <div class="group/calendar-panel" data-calendar-panel>
        <AnimatePresence mode="wait">
          <CalendarPanelMotion
            v-if="panel === CalendarPanelEnum.DAY"
            class="w-full"
          >
            <RangeCalendarDayPanel v-bind="variants" />
          </CalendarPanelMotion>
          <CalendarPanelMotion
            v-if="panel === CalendarPanelEnum.MONTH"
            class="w-full"
          >
            <RangeCalendarMonthPanel :date="date" v-bind="variants" />
          </CalendarPanelMotion>
          <CalendarPanelMotion v-if="panel === CalendarPanelEnum.YEAR">
            <RangeCalendarYearPanel :date="date" v-bind="variants" />
          </CalendarPanelMotion>
        </AnimatePresence>
      </div>
    </RangeCalendarProvider>
  </RangeCalendarRoot>
</template>
