<script lang="ts" setup>
import type { CalendarVariants } from '@rui/core/components/calendar'
import type { DateValue, RangeCalendarRootEmits, RangeCalendarRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { tvCalendar } from '@rui/core/components/calendar'
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
import { RangeCalendarDayPanel, RangeCalendarMonthPanel, RangeCalendarYearPanel } from './panels'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  RangeCalendarRootProps & {
    class?: HTMLAttributes['class']
    size?: CalendarVariants['size']
    unstyled?: boolean
    ui?: {
      root?: {
        class?: HTMLAttributes['class']
      }
      header?: ComponentProps<typeof RangeCalendarHeader>
      prevButton?: ComponentProps<typeof RangeCalendarPrevButton>
      nextButton?: ComponentProps<typeof RangeCalendarNextButton>
      heading?: ComponentProps<typeof RangeCalendarHeading>
      panelMotion?: ComponentProps<typeof CalendarPanelMotion>
      dayPanel?: ComponentProps<typeof RangeCalendarDayPanel>
      monthPanel?: ComponentProps<typeof RangeCalendarMonthPanel>
      yearPanel?: ComponentProps<typeof RangeCalendarYearPanel>
    }
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
    :class="tvCalendar({ size, unstyled, class: [ui?.root?.class, propsClass] })"
    data-range-calendar
  >
    <RangeCalendarProvider
      v-slot="{ panel }"
      @update:model-value="(panel) => (curPanel = panel)"
    >
      <div
        class="group/calendar-header"
        data-calendar-header
      >
        <RangeCalendarHeader
          v-bind="ui?.header"
          :unstyled="ui?.header?.unstyled ?? unstyled"
        >
          <RangeCalendarPrevButton
            v-bind="ui?.prevButton"
            :size="ui?.prevButton?.size ?? size"
            :variant="ui?.prevButton?.variant ?? 'text'"
            :unstyled="ui?.prevButton?.unstyled ?? unstyled"
            :prev-page="ui?.prevButton?.prevPage ?? onPrevPage"
          />
          <RangeCalendarHeading
            v-bind="ui?.heading"
            :size="ui?.heading?.size ?? size"
            :unstyled="ui?.heading?.unstyled ?? unstyled"
          />
          <RangeCalendarNextButton
            v-bind="ui?.nextButton"
            :size="ui?.nextButton?.size ?? size"
            :variant="ui?.nextButton?.variant ?? 'text'"
            :unstyled="ui?.nextButton?.unstyled ?? unstyled"
            :next-page="ui?.nextButton?.nextPage ?? onNextPage"
          />
        </RangeCalendarHeader>
      </div>
      <div
        class="group/calendar-panel"
        data-calendar-panel
      >
        <AnimatePresence mode="wait">
          <CalendarPanelMotion
            v-if="panel === CalendarPanelEnum.DAY"
            v-bind="ui?.panelMotion"
            :class="cn('w-full', ui?.panelMotion?.class)"
          >
            <RangeCalendarDayPanel v-bind="variants" />
          </CalendarPanelMotion>
          <CalendarPanelMotion
            v-if="panel === CalendarPanelEnum.MONTH"
            v-bind="ui?.panelMotion"
            :class="cn('w-full', ui?.panelMotion?.class)"
          >
            <RangeCalendarMonthPanel
              :date="date"
              v-bind="variants"
            />
          </CalendarPanelMotion>
          <CalendarPanelMotion
            v-if="panel === CalendarPanelEnum.YEAR"
            v-bind="ui?.panelMotion"
            :class="cn('w-full', ui?.panelMotion?.class)"
          >
            <RangeCalendarYearPanel
              :date="date"
              v-bind="variants"
            />
          </CalendarPanelMotion>
        </AnimatePresence>
      </div>
    </RangeCalendarProvider>
  </RangeCalendarRoot>
</template>
