import { createContext } from 'reka-ui'
import { defineComponent, ref, Ref, SlotsType } from 'vue'

export enum CalendarPanelEnum {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day'
}

const [injectCalendarContextEx, provideCalendarContextEx] = createContext<{
  panel: Ref<CalendarPanelEnum>
}>('CalendarProvider')
export { injectCalendarContextEx }

export const CalendarProvider = defineComponent({
  name: 'CalendarProvider',
  slots: Object as SlotsType<{
    default: { panel: CalendarPanelEnum }
  }>,
  setup(props, { slots }) {
    const curPanel = ref<CalendarPanelEnum>(CalendarPanelEnum.DAY)
    provideCalendarContextEx({
      panel: curPanel
    })
    return () => slots.default?.({ panel: curPanel.value })
  }
})
