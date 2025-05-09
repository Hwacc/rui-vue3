<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { PopoverContentMotion } from '@rui/core/components/motion/PopoverContentMotion'
import { cn } from '@rui/core/lib/utils'
import { AnimatePresence } from 'motion-v'
import {
  injectPopoverRootContext,
  PopoverContent,
  PopoverPortal,
  useForwardExpose,
  useForwardPropsEmits,
} from 'reka-ui'
import { ref, watchEffect } from 'vue'
import { popoverContentVariants } from '.'

// @ts-expect-error reka not export useGraceArea
// eslint-disable-next-line antfu/no-import-dist, antfu/no-import-node-modules-by-path
import { u as useGraceArea } from '../../node_modules/reka-ui/dist/shared/useGraceArea.js'
import { injectPopoverRootContextEx } from './PopoverProviderEx.jsx'

defineOptions({
  inheritAttrs: false,
})

const {
  class: propsClass,
  side = 'bottom',
  align = 'center',
  sideOffset = 4,
  unstyled,
  ...props
} = defineProps<
  PopoverContentProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()

const emits = defineEmits<PopoverContentEmits>()
const { triggerElement } = injectPopoverRootContext()
const rootContextEx = injectPopoverRootContextEx()

const contentRef = ref<any>(null)
const { isPointerInTransit, onPointerExit } = useGraceArea(
  triggerElement,
  contentRef,
)

rootContextEx.isPointerInTransitRef = isPointerInTransit
onPointerExit(() => {
  if (
    rootContextEx.triggerType.value === 'hover'
    && !rootContextEx.disableHoverableContent.value
  ) {
    rootContextEx.onClose()
  }
})

const { forwardRef, currentElement } = useForwardExpose()
watchEffect((onCleanup) => {
  const triggerType = rootContextEx.triggerType.value
  const triggerMode = rootContextEx.triggerMode.value
  if (
    (triggerType === 'click' || triggerType === 'manual')
    && currentElement.value
  ) {
    if (rootContextEx.disableHoverableContent.value) {
      if (triggerMode === 'mouse-only') {
        currentElement.value.addEventListener(
          'mouseenter',
          rootContextEx.onClose,
        )
      }
      else if (triggerMode === 'touch-simulate') {
        currentElement.value.addEventListener(
          'pointerenter',
          rootContextEx.onClose,
        )
      }
      onCleanup(() => {
        if (triggerMode === 'mouse-only') {
          currentElement.value?.removeEventListener(
            'mouseenter',
            rootContextEx.onClose,
          )
        }
        else if (triggerMode === 'touch-simulate') {
          currentElement.value?.removeEventListener(
            'pointerenter',
            rootContextEx.onClose,
          )
        }
      })
    }
  }
})

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <PopoverPortal>
    <AnimatePresence>
      <PopoverContent
        v-bind="{ ...forwarded, side, align, sideOffset, ...$attrs }"
      >
        <PopoverContentMotion
          :ref="(r: any) => {
            contentRef = r?.$el;
            forwardRef(r);
          }"
          :class="cn(popoverContentVariants({ unstyled }), propsClass)"
          :side="side"
        >
          <slot />
        </PopoverContentMotion>
      </PopoverContent>
    </AnimatePresence>
  </PopoverPortal>
</template>
