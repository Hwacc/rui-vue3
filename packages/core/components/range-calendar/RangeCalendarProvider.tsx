import { createContext } from 'reka-ui'
import { defineComponent, PropType, ref, Ref, SlotsType, watch } from 'vue'
import { CalendarPanelEnum } from '@/core/lib/constants'

const [injectRangeCalendarContextEx, provideRangeCalendarContextEx] =
  createContext<{
    panel: Ref<CalendarPanelEnum>
  }>('RangeCalendarProvider')
export { injectRangeCalendarContextEx }

export const RangeCalendarProvider = defineComponent({
  name: 'RangeCalendarProvider',
  props: {
    modelValue: {
      type: String as PropType<CalendarPanelEnum>,
      default: CalendarPanelEnum.DAY
    }
  },
  emits: ['update:modelValue'],
  slots: Object as SlotsType<{
    default: { panel: CalendarPanelEnum }
  }>,
  setup(props, { slots, emit }) {
    const panel = ref<CalendarPanelEnum>(props.modelValue)
    provideRangeCalendarContextEx({ panel })
    watch(panel, (newValue) => {
      emit('update:modelValue', newValue)
    })
    return () => slots.default?.({ panel: panel.value })
  }
})
