<script lang="ts" setup>
import type { CalendarRootEmits, CalendarRootProps, DateValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { CalendarVariants } from '.'
import { CalendarPanelMotion } from '@rui/core/components/motion/CalendarPanelMotion.tsx'
import { CalendarPanelEnum } from '@rui/core/lib/constants'
import { cn } from '@rui/core/lib/utils'
import { AnimatePresence } from 'motion-v'
import { CalendarRoot, useForwardPropsEmits } from 'reka-ui'
import { ref } from 'vue'
import {
  CalendarDayPanel,
  CalendarHeader,
  CalendarHeading,
  CalendarMonthPanel,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarProvider,
  CalendarYearPanel,
  tvCalendar,
} from '.'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ui,
  ...props
} = defineProps<
  CalendarRootProps & {
    class?: HTMLAttributes['class']
    size?: CalendarVariants['size']
    unstyled?: boolean
    ui?: {
      root?: {
        class?: HTMLAttributes['class']
      }
      header?: ComponentProps<typeof CalendarHeader>
      prevButton?: ComponentProps<typeof CalendarPrevButton>
      nextButton?: ComponentProps<typeof CalendarNextButton>
      heading?: ComponentProps<typeof CalendarHeading>
      panelMotion?: ComponentProps<typeof CalendarPanelMotion>
      dayPanel?: ComponentProps<typeof CalendarDayPanel>
      monthPanel?: ComponentProps<typeof CalendarMonthPanel>
      yearPanel?: ComponentProps<typeof CalendarYearPanel>
    }
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

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <CalendarRoot
    v-slot="{ date }"
    v-bind="forwarded"
    :class="tvCalendar({ size, unstyled, class: [ui?.root?.class, propsClass] })"
    :data-size="size"
  >
    <CalendarProvider
      v-slot="{ panel }"
      @update:model-value="(panel) => (curPanel = panel)"
    >
      <div
        class="group/calendar-header"
        data-calendar-header
      >
        <CalendarHeader
          v-bind="ui?.header"
          :unstyled="ui?.header?.unstyled ?? unstyled"
        >
          <CalendarPrevButton
            v-bind="ui?.prevButton"
            :size="ui?.prevButton?.size ?? size"
            :variant="ui?.prevButton?.variant ?? 'text'"
            :unstyled="ui?.prevButton?.unstyled ?? unstyled"
            :prev-page="ui?.prevButton?.prevPage ?? onPrevPage"
          />
          <CalendarHeading
            v-bind="ui?.heading"
            :size="ui?.heading?.size ?? size"
            :unstyled="ui?.heading?.unstyled ?? unstyled"
          />
          <CalendarNextButton
            v-bind="ui?.nextButton"
            :size="ui?.nextButton?.size ?? size"
            :variant="ui?.nextButton?.variant ?? 'text'"
            :unstyled="ui?.nextButton?.unstyled ?? unstyled"
            :next-page="ui?.nextButton?.nextPage ?? onNextPage"
          />
        </CalendarHeader>
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
            <CalendarDayPanel v-bind="ui?.dayPanel" />
          </CalendarPanelMotion>
          <CalendarPanelMotion
            v-if="panel === CalendarPanelEnum.MONTH"
            v-bind="ui?.panelMotion"
            :class="cn('w-full', ui?.panelMotion?.class)"
          >
            <CalendarMonthPanel
              v-bind="ui?.monthPanel"
              :date="date"
            />
          </CalendarPanelMotion>
          <CalendarPanelMotion
            v-if="panel === CalendarPanelEnum.YEAR"
            v-bind="ui?.panelMotion"
            :class="cn('w-full', ui?.panelMotion?.class)"
          >
            <CalendarYearPanel
              v-bind="ui?.yearPanel"
              :date="date"
            />
          </CalendarPanelMotion>
        </AnimatePresence>
      </div>
    </CalendarProvider>
  </CalendarRoot>
</template>
