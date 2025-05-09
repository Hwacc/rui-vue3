<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface ReadMoreContentProps extends PrimitiveProps {
  class?: HTMLAttributes['class']
  unstyled?: boolean
  collapsedHeight?: number
  collapsedLine?: number
}

export type ReadMoreContentEmits = {
  contentFound: [void]
}
</script>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import {
  injectCollapsibleRootContext,
  Primitive,
  useForwardExpose,
  useForwardPropsEmits,
  useId,
} from 'reka-ui'
import { ref, watchEffect } from 'vue'
import { readMoreContentVariant } from '.'
import { injectReadMoreContext } from './ReadMore.vue'

const {
  class: propsClass,
  collapsedLine = 3,
  collapsedHeight = 80,
  unstyled,
  ...props
} = defineProps<ReadMoreContentProps>()
const emits = defineEmits<ReadMoreContentEmits>()
const { showTrigger } = injectReadMoreContext({ showTrigger: ref(false) })
const { forwardRef, currentElement } = useForwardExpose()
const rootContext = injectCollapsibleRootContext()
rootContext.contentId ||= useId(undefined, 'reka-readmore-content')

const measureRef = ref<HTMLElement>()
const measureHeight = ref(0)
const measureLineHeight = ref(0)
useResizeObserver(measureRef, (entries) => {
  const entry = entries[0]
  const { height } = entry.contentRect
  if (measureRef.value) {
    const computedStyle = window.getComputedStyle(
      measureRef.value.children[0] ?? measureRef.value,
    )
    measureLineHeight.value = parseFloat(computedStyle.lineHeight)
  }
  if (currentElement.value && showTrigger) {
    setTimeout(() => {
      const viewHeight = currentElement.value.getBoundingClientRect().height
      showTrigger.value = height - viewHeight > 5
    }, 300) // 动画时间
  }
  measureHeight.value = Math.ceil(height)
})

const maxHeight = ref(0)
watchEffect(
  () => {
    const isOpen = rootContext.open.value
    maxHeight.value = isOpen
      ? measureHeight.value
      : collapsedLine
        ? Math.ceil(measureLineHeight.value * collapsedLine)
        : collapsedHeight
  },
  {
    flush: 'post',
  },
)

useEventListener(currentElement, 'beforematch', () => {
  requestAnimationFrame(() => {
    rootContext.onOpenToggle()
    emits('contentFound')
  })
})

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Primitive
    v-bind="forwarded"
    :id="rootContext.contentId"
    :ref="forwardRef"
    :class="cn(readMoreContentVariant({ unstyled }), propsClass)"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    :data-disabled="rootContext.disabled?.value ? '' : undefined"
    :style="{
      [`--reka-readmore-max-height`]: `${maxHeight}px`,
      [`--reka-readmore-collapsed-line`]: collapsedLine ? collapsedLine : 'none',
    }"
  >
    <div ref="measureRef" class="w-fit h-fit">
      <slot />
    </div>
  </Primitive>
</template>
