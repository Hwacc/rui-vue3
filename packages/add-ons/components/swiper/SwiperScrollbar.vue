<script setup lang="ts">
import type { ScrollbarEvents, ScrollbarOptions, Swiper } from 'swiper/types'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { merge } from 'lodash-es'
import { useSwiper } from 'swiper/vue'
import { computed, reactive, useTemplateRef, watchEffect } from 'vue'
import { prefix } from '.'
import { useRegistSwiperEmits, useSwiperModule } from './utils'

const {
  class: propsClass,
  unstyled,
  swiper,
  ...props
} = defineProps<
  ScrollbarOptions & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    swiper?: Swiper
  }
>()
const emit = defineEmits<ScrollbarEvents>()

const effectiveSwiper = computed(() => {
  return swiper ?? useSwiper()?.value
})
const { hasModule } = useSwiperModule(effectiveSwiper)
const scrollRef = useTemplateRef('scrollbar')
const reactiveProps = reactive(props)

watchEffect(() => {
  if (effectiveSwiper.value && hasModule('Scrollbar') && scrollRef.value) {
    const options = merge(
      {},
      typeof effectiveSwiper.value.params.scrollbar === 'boolean'
        ? {
            enabled: effectiveSwiper.value.params.scrollbar,
          }
        : effectiveSwiper.value.params.scrollbar,
      reactiveProps,
      {
        el: scrollRef.value,
      },
    )
    effectiveSwiper.value.params.scrollbar = options
    effectiveSwiper.value.scrollbar.destroy()
    effectiveSwiper.value.scrollbar.init()
    effectiveSwiper.value.scrollbar.updateSize()
    effectiveSwiper.value.scrollbar.setTranslate()
  }
})

useRegistSwiperEmits({
  swiperRef: effectiveSwiper,
  emit,
  events: ['scrollbarDragEnd', 'scrollbarDragMove', 'scrollbarDragStart'],
})
</script>

<template>
  <div
    ref="scrollbar"
    role="scrollbar-container"
    :class="
      cn(
        'swiper-scrollbar',
        !unstyled && `${prefix}-scrollbar`,
        propsClass,
      )
    "
  />
</template>
