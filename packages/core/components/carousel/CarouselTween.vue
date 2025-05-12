<script setup lang="ts">
import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { computed, ref, watch } from 'vue'
import { useCarousel } from './useCarousel'

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      tweenBase?: number
    }
  >(),
  {
    tweenBase: 1,
  },
)
const emits = defineEmits<{
  'update:tweenValue': [tweenValue: number]
}>()
defineSlots<{
  default?: (props: { tweenValue: number }) => any
}>()

const { carouselApi } = useCarousel()
const tweenValue = ref(0)
const tweenFactor = computed(() => {
  return (
    (props.tweenBase ?? 1) * (carouselApi.value?.scrollSnapList().length ?? 1)
  )
})
function onScroll(api: EmblaCarouselType, eventName: EmblaEventType) {
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
      tweenValue.value = 1 - Math.abs(diffToTarget * tweenFactor.value)
    })
  })
}

watch(carouselApi, (api) => {
  if (api) {
    api.on('reInit', onScroll).on('scroll', onScroll).on('slideFocus', onScroll)
  }
})
watch(tweenValue, (value) => {
  emits('update:tweenValue', value)
})
</script>

<template>
  <Primitive v-bind="props" data-carousel-tween>
    <slot name="default" v-bind="{ tweenValue }" />
  </Primitive>
</template>
