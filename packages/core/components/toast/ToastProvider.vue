<script lang="ts">
import type { ToastProviderProps } from 'reka-ui'
import type {
  Ref,
} from 'vue'
import type { SwipeDirection, ToastPosition } from '.'
import { createContext, injectToastProviderContext, ToastProvider, useForwardProps } from 'reka-ui'
import {
  defineComponent,
  reactive,
  toRefs,
  useSlots,
  watchEffect,
} from 'vue'

export interface ToastProviderPropsEx extends ToastProviderProps {
  position?: ToastPosition
}
export interface ToastProviderContextEx {
  label: Ref<string>
  duration: Ref<number>
  swipeDirection: Ref<SwipeDirection>
  swipeThreshold: Ref<number>
  toastCount: Ref<number>
  viewport: Ref<HTMLElement | undefined>
  onViewportChange: (viewport: HTMLElement) => void
  onToastAdd: () => void
  onToastRemove: () => void
  isFocusedToastEscapeKeyDownRef: Ref<boolean>
  isClosePausedRef: Ref<boolean>
  position: Ref<ToastPosition>
}

const [injectToastProviderContextEx, provideToastProviderContextEx]
  = createContext<ToastProviderContextEx>([
    'ToastProvider',
    'ToastPostitionProvider',
  ])

export { injectToastProviderContextEx }
export const ToastPostitionProvider = defineComponent({
  name: 'ToastPostitionProvider',
  props: {
    position: {
      type: String as () => ToastPosition,
      default: 'center',
    },
  },
  setup(props) {
    const { position } = toRefs(props)
    const slots = useSlots()
    const providerContext = injectToastProviderContext()

    provideToastProviderContextEx({
      ...providerContext,
      position,
    })
    return () => slots.default?.()
  },
})
</script>

<script setup lang="ts">
const {
  position = 'center',
  swipeDirection = 'up',
  swipeThreshold = 50,
  ...props
} = defineProps<ToastProviderPropsEx>()

const swipeOptions = reactive({
  direction: swipeDirection,
  threshold: swipeThreshold,
})

watchEffect(() => {
  const _split = position.split('-')
  const _edge = _split[0]
  const _align = _split[1]
  swipeOptions.threshold = swipeThreshold
  switch (_align) {
    case 'left':
      swipeOptions.direction = 'left'
      break
    case 'right':
      swipeOptions.direction = 'right'
      break
    case 'center': {
      _edge === 'top'
        ? (swipeOptions.direction = 'up')
        : (swipeOptions.direction = 'down')
      break
    }
    default:
      swipeOptions.direction = 'up'
      swipeOptions.threshold = Infinity
      break
  }
})

const forwarded = useForwardProps(props)
</script>

<template>
  <ToastProvider
    v-bind="forwarded"
    :swipe-direction="swipeOptions.direction"
    :swipe-threshold="swipeOptions.threshold"
  >
    <ToastPostitionProvider :position="position">
      <slot />
    </ToastPostitionProvider>
  </ToastProvider>
</template>
