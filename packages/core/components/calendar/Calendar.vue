<script lang="ts" setup>
import type { CalendarRootEmits, CalendarRootProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import { CalendarRoot, useForwardPropsEmits } from 'reka-ui'
import {
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton,
  calendarRootVariants,
  CalendarVariantsProps,
  CalendarProvider,
  CalendarPanelEnum
} from '.'
import {
  CalendarDayPanel,
  CalendarMonthPanel,
  CalendarYearPanel,
  CalendarPanelMotion
} from './panels'
import { AnimatePresence } from 'motion-v'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  CalendarRootProps & {
    class?: HTMLAttributes['class']
    size?: CalendarVariantsProps['size']
    unstyled?: boolean
  }
>()

const variants = computed(() => ({ size, unstyled }))
const emits = defineEmits<CalendarRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <CalendarRoot
    v-bind="forwarded"
    v-slot="{ date }"
    :class="cn(calendarRootVariants({ size, unstyled }), propsClass)"
    :data-size="size"
  >
    <CalendarProvider v-slot="{ panel }">
      <div class="group/calendar-header" data-calendar-header>
        <CalendarHeader v-bind="variants">
          <CalendarPrevButton v-bind="variants" />
          <CalendarHeading v-bind="variants"></CalendarHeading>
          <CalendarNextButton v-bind="variants" />
        </CalendarHeader>
      </div>
      <div class="group/calendar-panel" data-calendar-panel>
        <AnimatePresence mode="wait">
          <CalendarPanelMotion
            v-if="panel === CalendarPanelEnum.DAY"
            class="w-full"
          >
            <CalendarDayPanel v-bind="variants" />
          </CalendarPanelMotion>
          <CalendarPanelMotion
            v-if="panel === CalendarPanelEnum.MONTH"
            class="w-full"
          >
            <CalendarMonthPanel :date="date" v-bind="variants" />
          </CalendarPanelMotion>
          <CalendarPanelMotion v-if="panel === CalendarPanelEnum.YEAR">
            <CalendarYearPanel :date="date" v-bind="variants" />
          </CalendarPanelMotion>
        </AnimatePresence>
      </div>
    </CalendarProvider>
  </CalendarRoot>
</template>
