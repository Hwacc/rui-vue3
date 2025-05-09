<script lang="ts" setup>
import type { CalendarRootEmits, CalendarRootProps, DateValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type {
  CalendarVariantsProps,
} from '.'
import { CalendarPanelMotion } from '@rui/core/components/motion/CalendarPanelMotion.tsx'
import { CalendarPanelEnum } from '@rui/core/lib/constants'
import { cn } from '@rui/core/lib/utils'
import { AnimatePresence } from 'motion-v'
import { CalendarRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import {
  CalendarDayPanel,
  CalendarHeader,
  CalendarHeading,
  CalendarMonthPanel,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarProvider,
  calendarRootVariants,
  CalendarYearPanel,
} from '.'

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

const emits = defineEmits<CalendarRootEmits>()
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
  <CalendarRoot
    v-slot="{ date }"
    v-bind="forwarded"
    :class="cn(calendarRootVariants({ size, unstyled }), propsClass)"
    :data-size="size"
  >
    <CalendarProvider
      v-slot="{ panel }"
      @update:model-value="(panel) => (curPanel = panel)"
    >
      <div class="group/calendar-header" data-calendar-header>
        <CalendarHeader v-bind="variants">
          <CalendarPrevButton v-bind="variants" :prev-page="onPrevPage" />
          <CalendarHeading v-bind="variants" />
          <CalendarNextButton v-bind="variants" :next-page="onNextPage" />
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
