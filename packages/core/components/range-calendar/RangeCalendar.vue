<script lang="ts" setup>
import type { CalendarVariantsProps } from '@rui/core/components/calendar'
import type {
  DateValue,
  RangeCalendarRootEmits,
  RangeCalendarRootProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { calendarRootVariants } from '@rui/core/components/calendar'
import { CalendarPanelMotion } from '@rui/core/components/motion/CalendarPanelMotion'
import { CalendarPanelEnum } from '@rui/core/lib/constants'
import { cn } from '@rui/core/lib/utils'
import { AnimatePresence } from 'motion-v'
import { RangeCalendarRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import {
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNextButton,
  RangeCalendarPrevButton,
  RangeCalendarProvider,
} from '.'
import {
  RangeCalendarDayPanel,
  RangeCalendarMonthPanel,
  RangeCalendarYearPanel,
} from './panels'

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

const emits = defineEmits<RangeCalendarRootEmits>()
const curPanel = ref<CalendarPanelEnum>(CalendarPanelEnum.DAY)
function onPrevPage(placeholder: DateValue) {
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
function onNextPage(placeholder: DateValue) {
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
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <RangeCalendarRoot
    v-slot="{ date }"
    v-bind="forwarded"
    :class="cn(calendarRootVariants({ size, unstyled }), propsClass)"
    data-range-calendar
  >
    <RangeCalendarProvider
      v-slot="{ panel }"
      @update:model-value="(panel) => (curPanel = panel)"
    >
      <div class="group/calendar-header" data-calendar-header>
        <RangeCalendarHeader v-bind="variants">
          <RangeCalendarPrevButton v-bind="variants" :prev-page="onPrevPage" />
          <RangeCalendarHeading v-bind="variants" />
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
