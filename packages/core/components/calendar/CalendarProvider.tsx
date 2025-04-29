import { createContext } from 'reka-ui'
import { defineComponent, ref, Ref, SlotsType } from 'vue'

export enum CalendarPanel {
  MONTH = 'month',
  DAY = 'day'
}

const [injectCalendarContextEx, provideCalendarContextEx] = createContext<{
  panel: Ref<CalendarPanel>
}>('CalendarProvider')
export { injectCalendarContextEx }

export const CalendarProvider = defineComponent({
  name: 'CalendarProvider',
  slots: Object as SlotsType<{
    default: { panel: CalendarPanel }
  }>,
  setup(props, { slots }) {
    const curPanel = ref<CalendarPanel>(CalendarPanel.DAY)
    provideCalendarContextEx({
      panel: curPanel
    })
    return () => slots.default?.({ panel: curPanel.value })
  }
})
