<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { ScrollBarVariants } from '.'
import {
  injectScrollAreaRootContext,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  useForwardProps,
} from 'reka-ui'
import { ref, watchEffect } from 'vue'
import { tvScrollBar } from '.'

const {
  class: propsClass,
  size = 'base',
  orientation = 'vertical',
  unstyled,
  ui,
  ...props
} = defineProps<
  ScrollAreaScrollbarProps & {
    class?: HTMLAttributes['class']
    size?: ScrollBarVariants['size']
    unstyled?: boolean
    ui?: {
      root?: {
        class?: HTMLAttributes['class']
      }
      thumb?: ComponentProps<typeof ScrollAreaThumb> & {
        class?: HTMLAttributes['class']
      }
    }
  }
>()

const { viewport } = injectScrollAreaRootContext()
const scrollState = ref<'scrolling' | 'static'>('static')

watchEffect((onCleanup) => {
  const onScroll = () => {
    scrollState.value = 'scrolling'
  }
  const onScrollEnd = () => {
    scrollState.value = 'static'
  }
  viewport.value?.addEventListener('scroll', onScroll)
  viewport.value?.addEventListener('scrollend', onScrollEnd)
  onCleanup(() => {
    viewport.value?.removeEventListener('scroll', onScroll)
    viewport.value?.removeEventListener('scrollend', onScrollEnd)
  })
})

const { base, thumb } = tvScrollBar()
const forwarded = useForwardProps(props)
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="forwarded"
    :orientation="orientation"
    :class="base({ orientation, unstyled, class: [ui?.root?.class, propsClass] })"
    :data-size="size"
    :data-scroll-state="scrollState"
  >
    <ScrollAreaThumb
      v-bind="ui?.thumb"
      :class="thumb({ size, unstyled, class: [ui?.thumb?.class] })"
      :data-size="size"
      :data-scroll-state="scrollState"
    />
  </ScrollAreaScrollbar>
</template>
