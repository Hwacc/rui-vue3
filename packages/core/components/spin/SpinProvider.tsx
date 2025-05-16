import type { PropType, VNode } from 'vue'
import type { SpinVariants } from '.'
import { createContext } from 'reka-ui'
import { defineComponent, watch } from 'vue'

const [injectSpinContext, providerSpinContext] = createContext<{
  icon: VNode | null
}>('SpinProvider')

export { injectSpinContext }
export const SpinProvider = defineComponent({
  name: 'SpinProvider',
  props: {
    size: {
      type: String as PropType<SpinVariants['size']>,
      default: 'base',
    },
  },
  setup(props, { slots }) {
    // const icon = slots.icon?.(props.size)
    const icon = slots.icon?.()
    providerSpinContext({
      icon: icon ? icon[0] : null,
    })
    return () => slots.default?.()
  },
})
