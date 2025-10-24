<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { useGraceArea } from '@rui/core/shared'
import {
  injectPopoverRootContext,
  PopoverContent,
  PopoverPortal,
  useForwardExpose,
  useForwardPropsEmits,
} from 'reka-ui'

import { computed, useTemplateRef, watchEffect } from 'vue'
import { tvPopover } from '.'
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
  ui,
  ...props
} = defineProps<
  PopoverContentProps & {
    class?: HTMLAttributes['class']
    ui?: {
      portal?: ComponentProps<typeof PopoverPortal> & {
        class?: HTMLAttributes['class']
      }
      content?: {
        class?: HTMLAttributes['class']
      }
    }
    unstyled?: boolean
  }
>()

const emits = defineEmits<PopoverContentEmits>()

const { triggerElement } = injectPopoverRootContext()
const rootContextEx = injectPopoverRootContextEx()

const contentRef = useTemplateRef('contentRef')
const contentElement = computed(() => contentRef.value?.$el)
const { isPointerInTransit, onPointerExit } = useGraceArea(triggerElement, contentElement)

rootContextEx.isPointerInTransitRef = isPointerInTransit
onPointerExit(() => {
  if (rootContextEx.triggerType.value === 'hover' && !rootContextEx.disableHoverableContent.value) {
    rootContextEx.onClose()
  }
})

const { currentElement } = useForwardExpose()
watchEffect((onCleanup) => {
  const triggerType = rootContextEx.triggerType.value
  const triggerMode = rootContextEx.triggerMode.value
  if ((triggerType === 'click' || triggerType === 'manual') && currentElement.value) {
    if (rootContextEx.disableHoverableContent.value) {
      if (triggerMode === 'mouse-only') {
        currentElement.value.addEventListener('mouseenter', rootContextEx.onClose)
      }
      else if (triggerMode === 'touch-simulate') {
        currentElement.value.addEventListener('pointerenter', rootContextEx.onClose)
      }
      onCleanup(() => {
        if (triggerMode === 'mouse-only') {
          currentElement.value?.removeEventListener('mouseenter', rootContextEx.onClose)
        }
        else if (triggerMode === 'touch-simulate') {
          currentElement.value?.removeEventListener('pointerenter', rootContextEx.onClose)
        }
      })
    }
  }
})

const { content } = tvPopover()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <PopoverPortal v-bind="ui?.portal">
    <PopoverContent
      v-bind="{ ...forwarded, side, align, sideOffset, ...$attrs }"
      ref="contentRef"
      :class="content({ class: [ui?.content?.class, propsClass], unstyled })"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
