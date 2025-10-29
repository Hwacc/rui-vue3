import type { Virtualizer } from '@tanstack/vue-virtual'
import type { Ref, ShallowRef } from 'vue'
import { createContext } from '@rui/add-ons/utils/createContext'
import { defineComponent, ref } from 'vue'
import { LOADING_STATE } from '.'

type VirtualContext = {
  parentEl?: Ref<Element | null | undefined>
  virtualizer?: ShallowRef<Virtualizer<Element, Element>>
  enableInfinite: Ref<boolean>
  infiniteState: Ref<LOADING_STATE>
}
const [injectVirtualContext, provideVirtualContext]
  = createContext<VirtualContext>('VirtualContext')

export { injectVirtualContext }

export default defineComponent({
  setup(_, { slots }) {
    const enableInfinite = ref(false)
    const infiniteState = ref<LOADING_STATE>(LOADING_STATE.IDLE)
    provideVirtualContext({
      enableInfinite,
      infiniteState,
    })
    return () => slots.default?.()
  },
})
