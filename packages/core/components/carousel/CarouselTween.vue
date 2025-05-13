<script setup lang="ts">
import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { ref, watchEffect } from 'vue'
import { useCarousel } from './useCarousel'

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      index?: number
    }
  >(),
  { index: -1 },
)
defineSlots<{
  default?: (props: { tweenValue: number }) => any
}>()

const { carouselApi } = useCarousel()

const tweenValue = ref(0)
function onScroll(api: EmblaCarouselType, eventName?: EmblaEventType) {
  const engine = api.internalEngine()
  const scrollProgress = api.scrollProgress()
  const slidesInView = api.slidesInView()
  const isScrollEvent = eventName === 'scroll'

  api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
    let diffToTarget = scrollSnap - scrollProgress
    const slidesInSnap = engine.slideRegistry[snapIndex]
    slidesInSnap.forEach((slideIndex) => {
      if (isScrollEvent && !slidesInView.includes(slideIndex))
        return
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target()
          if (slideIndex === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) {
              diffToTarget = scrollSnap - (1 + scrollProgress)
            }
            if (sign === 1) {
              diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          }
        })
      }
      if (props.index === slideIndex) {
        tweenValue.value = diffToTarget
      }
    })
  })
}

watchEffect((cleanup) => {
  if (carouselApi.value) {
    onScroll(carouselApi.value)
    carouselApi.value
      .on('reInit', onScroll)
      .on('scroll', onScroll)
      .on('slideFocus', onScroll)
  }
  cleanup(() => {
    carouselApi.value
      ?.off('reInit', onScroll)
      .off('scroll', onScroll)
      .off('slideFocus', onScroll)
  })
})
</script>

<template>
  <Primitive v-bind="props" data-carousel-tween>
    <slot name="default" v-bind="{ tweenValue }" />
  </Primitive>
</template>
