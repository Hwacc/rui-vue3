<script lang="ts">
interface PerfectScrollBarOptions {
  handlers?: string[]
  maxScrollbarLength?: number
  minScrollbarLength?: number
  scrollingThreshold?: number
  scrollXMarginOffset?: number
  scrollYMarginOffset?: number
  suppressScrollX?: boolean
  suppressScrollY?: boolean
  swipeEasing?: boolean
  useBothWheelAxes?: boolean
  wheelPropagation?: boolean
  wheelSpeed?: number
}
</script>

<script setup lang="ts">
import { cn } from '@rui/core/lib/utils'
import { defaults } from 'lodash-es'
import PerfectScrollbar from 'perfect-scrollbar'
import { reactive, ref, useId, watchEffect } from 'vue'
import { scrollAreaVariants } from '.'

const {
  class: propsClass,
  size,
  unstyled,
  ...props
} = defineProps<
  PerfectScrollBarOptions & {
    class?: string
    size?: 'base' | 'sm' | 'xs'
    unstyled?: false
  }
>()

const emits = defineEmits<{
  'ps-scroll-y': [ps: PerfectScrollbar]
  'ps-scroll-x': [ps: PerfectScrollbar]
  'ps-scroll-up': [ps: PerfectScrollbar]
  'ps-scroll-down': [ps: PerfectScrollbar]
  'ps-scroll-left': [ps: PerfectScrollbar]
  'ps-scroll-right': [ps: PerfectScrollbar]
  'ps-reach-y-start': [ps: PerfectScrollbar]
  'ps-reach-y-end': [ps: PerfectScrollbar]
  'ps-reach-x-start': [ps: PerfectScrollbar]
  'ps-reach-x-end': [ps: PerfectScrollbar]
}>()
const scrollEvents = [
  'ps-scroll-y',
  'ps-scroll-x',
  'ps-scroll-up',
  'ps-scroll-down',
  'ps-scroll-left',
  'ps-scroll-right',
  'ps-reach-y-start',
  'ps-reach-y-end',
  'ps-reach-x-start',
  'ps-reach-x-end',
]
const id = useId()
const containerRef = ref<HTMLElement>()
const reactiveProps = reactive(props)

watchEffect((cleanup) => {
  let ps: PerfectScrollbar | null = null
  const events = scrollEvents.map((name) => {
    return [name, () => emits(name as any, ps as any)]
  })
  if (containerRef.value) {
    ps = new PerfectScrollbar(
      containerRef.value,
      defaults({}, reactiveProps, {
        handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
        wheelSpeed: 1,
        scrollXMarginOffset: 0,
        scrollYMarginOffset: 0,
        scrollingThreshold: 1000,
        swipeEasing: true,
      }),
    )
    events.forEach(([name, handler]) => {
      containerRef.value?.addEventListener(name as any, handler as any)
    })
  }
  cleanup(() => {
    events.forEach(([name, handler]) => {
      containerRef.value?.removeEventListener(name as any, handler as any)
    })
    ps?.destroy()
  })
})
</script>

<template>
  <div
    :id="`rui-scroll-area-${id}`"
    ref="containerRef"
    :class="cn(scrollAreaVariants({ size, unstyled }), propsClass)"
    :data-size="size"
  >
    <slot />
  </div>
</template>
