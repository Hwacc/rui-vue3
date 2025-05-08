<script lang="ts" setup>
import type { RangeCalendarRootEmits, RangeCalendarRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import { RangeCalendarRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import {
  type CalendarVariantsProps,
  calendarRootVariants
} from '@/core/components/calendar'
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
import { CalendarPanelEnum } from '@/core/lib/constants'
import { CalendarPanelMotion } from '@/core/components/motion/CalendarPanelMotion'
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
          <RangeCalendarPrevButton v-bind="variants" />
          <RangeCalendarHeading v-bind="variants"></RangeCalendarHeading>
          <RangeCalendarNextButton v-bind="variants" />
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
