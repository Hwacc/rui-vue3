<script lang="ts">
export interface PopoverTriggerProps extends PrimitiveProps {
  mode?: 'mouse-only' | 'touch-simulate'
  trigger?: 'click' | 'hover' | 'manual'
}
</script>

<script setup lang="ts">
import {
  Primitive,
  PopoverAnchor,
  PrimitiveProps,
  useForwardExpose,
  useId,
  injectPopoverRootContext
} from 'reka-ui'
import { injectPopoverRootContextEx } from './PopoverProviderEx'
import { computed, HTMLAttributes, onMounted, ref, watch } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { popoverTriggerVariants } from '.'

const {
  class: propsClass,
  as = 'button',
  asChild = false,
  trigger = 'click',
  mode = 'mouse-only',
  unstyled
} = defineProps<
  PopoverTriggerProps & { class?: HTMLAttributes['class']; unstyled?: boolean }
>()

const rootContex = injectPopoverRootContext()
const {
  disabled,
  open,
  triggerType,
  triggerMode,
  isPointerInTransitRef,
  disableHoverableContent,
  disableClosingTrigger,
  onOpen,
  onClose
} = injectPopoverRootContextEx()

watch(
  () => [trigger, mode],
  ([t, m]) => {
    triggerType.value = t as 'click' | 'hover' | 'manual'
    triggerMode.value = m as 'mouse-only' | 'touch-simulate'
  },
  { immediate: true }
)

const isPointerDown = ref(false)
const hasPointerMoveOpened = ref(false)

const handlePointerDown = () => {
  isPointerDown.value = true
  document.addEventListener(
    'pointerup',
    () => {
      setTimeout(() => {
        // 模拟点击
        isPointerDown.value = false
        if (open.value && disableClosingTrigger.value) return
        open.value ? onClose() : onOpen()
      })
    },
    { once: true }
  )
}

// 模拟mouseenter, mouseleave
const handlePointerMove = (event: PointerEvent) => {
  if (event.pointerType === 'touch') return
  if (!hasPointerMoveOpened.value && !isPointerInTransitRef.value) {
    onOpen()
    hasPointerMoveOpened.value = true
  }
}
const handlePointerLeave = () => {
  disableHoverableContent.value && onClose()
  hasPointerMoveOpened.value = false
}

const triggerListeners = computed(() => {
  if (disabled.value || trigger === 'manual') return {}
  if (trigger === 'hover') {
    if (mode === 'mouse-only') {
      return {
        mouseenter: () => {
          if (!isPointerInTransitRef.value) {
            onOpen()
          }
        },
        mouseleave: () => {
          disableHoverableContent.value && onClose()
        }
      }
    } else if (mode === 'touch-simulate') {
      return {
        pointerenter: handlePointerMove,
        pointerleave: handlePointerLeave
      }
    }
  }
  if (trigger === 'click') {
    if (mode === 'mouse-only') {
      return {
        click: () => {
          if (open.value && disableClosingTrigger.value) return
          open.value ? onClose() : onOpen()
        }
      }
    } else if (mode === 'touch-simulate') {
      return {
        pointerdown: handlePointerDown,
        click: (event: any) => {
          if (
            !isPointerDown.value &&
            (event.target as HTMLElement).matches?.(':focus-visible')
          ) {
            open.value ? onClose() : onOpen()
          }
        }
      }
    }
  }
})

rootContex.triggerId ||= useId(undefined, 'reka-popover-trigger')
onMounted(() => {
  rootContex.triggerElement.value = triggerElement.value
})
const { forwardRef, currentElement: triggerElement } = useForwardExpose()
</script>

<template>
  <PopoverAnchor as-child>
    <Primitive
      :class="cn(popoverTriggerVariants({ unstyled }), propsClass)"
      :id="rootContex.triggerId"
      :ref="forwardRef"
      :as="as"
      :as-child="asChild"
      v-on="triggerListeners"
      aria-haspopup="dialog"
      :aria-expanded="open"
      :aria-controls="rootContex.contentId"
      :data-state="open ? 'open' : 'closed'"
    >
      <slot v-bind="{ disabled: disabled }" />
    </Primitive>
  </PopoverAnchor>
</template>
