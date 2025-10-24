import type { Ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import { createContext, injectPopoverRootContext } from 'reka-ui'
import { defineComponent, ref, toRefs } from 'vue'

export interface PopoverRootContext {
  triggerElement: Ref<HTMLElement | undefined>
  triggerId: string
  contentId: string
  open: Ref<boolean>
  modal: Ref<boolean>
  onOpenChange: (value: boolean) => void
  onOpenToggle: () => void
  hasCustomAnchor: Ref<boolean>
}

export interface PopoverRootContextEx extends PopoverRootContext {
  delayDuration: Ref<number | undefined>
  disableClosingTrigger: Ref<boolean | undefined>
  disabled: Ref<boolean | undefined>
  disableHoverableContent: Ref<boolean | undefined>
  ignoreNonKeyboardFocus: Ref<boolean | undefined>

  isPointerInTransitRef: Ref<boolean>
  isOpenDelayed: Ref<boolean>
  triggerType: Ref<'hover' | 'click' | 'manual'>
  triggerMode: Ref<'mouse-only' | 'touch-simulate'>
  onOpen: () => void
  onClose: () => void
}
const [injectPopoverRootContextEx, providePopoverRootContextEx]
  = createContext<PopoverRootContextEx>('PopoverProviderEx')
export { injectPopoverRootContextEx }

export interface PopoverProviderExProps {
  delayDuration?: number
  disableClosingTrigger?: boolean
  disabled?: boolean
  disableHoverableContent?: boolean
  ignoreNonKeyboardFocus?: boolean
}

export const PopoverProviderEx = defineComponent<PopoverProviderExProps>({
  name: 'PopoverProviderEx',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    disableClosingTrigger: {
      type: Boolean,
      default: false,
    },
    disableHoverableContent: {
      type: Boolean,
      default: false,
    },
    ignoreNonKeyboardFocus: {
      type: Boolean,
      default: false,
    },
    delayDuration: {
      type: Number,
      default: 0,
    },
    skipDelayDuration: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots }) {
    const propsRefs = toRefs(props)
    const popoverRootContext = injectPopoverRootContext()
    const triggerType = ref<'hover' | 'click' | 'manual'>('click')
    const triggerMode = ref<'mouse-only' | 'touch-simulate'>('mouse-only')
    const isOpenDelayed = ref(true)
    // Reset the inTransit state if idle/scrolled.
    const isPointerInTransitRef = ref(false)

    const { start: startOpenTimer, stop: clearOpenTimer } = useTimeoutFn(
      () => {
        popoverRootContext.onOpenChange(true)
      },
      propsRefs.delayDuration as Ref<number>,
      { immediate: false },
    )

    const onOpen = () => {
      if (isOpenDelayed.value) {
        startOpenTimer()
      }
      else {
        popoverRootContext.onOpenChange(true)
      }
    }
    const onClose = () => {
      clearOpenTimer()
      popoverRootContext.onOpenChange(false)
    }

    providePopoverRootContextEx({
      ...popoverRootContext,
      ...propsRefs,
      triggerType,
      triggerMode,
      isOpenDelayed,
      isPointerInTransitRef,
      onOpen,
      onClose,
    })
    return () => slots.default?.()
  },
})
