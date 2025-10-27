import type { Virtualizer } from '@tanstack/vue-virtual'
import type { Ref } from 'vue'
import { createContext } from '@rui/add-ons/utils/createContext'
import { defineComponent } from 'vue'

type VirtualContext = {
  parentEl?: Ref<Element | null>
  virtualizer?: Ref<Virtualizer<Element, Element>>
}
const [injectVirtualContext, provideVirtualContext]
  = createContext<VirtualContext>('VirtualContext')

export { injectVirtualContext }

export default defineComponent({
  setup(_, { slots }) {
    provideVirtualContext({})
    return () => slots.default?.()
  },
})
