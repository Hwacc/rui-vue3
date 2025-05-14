import type { Swiper } from 'swiper/types'
import type { MaybeRef, Ref } from 'vue'
import { computed, ref, unref, watch, watchEffect } from 'vue'

type MaybeEmptySwiper = Swiper | null | undefined

export function useSwiperModule(
  swiper: MaybeRef<MaybeEmptySwiper> | MaybeEmptySwiper
) {
  const _swiper = unref(swiper)

  function hasModule(moduleName: string) {
    if (!_swiper) return false
    return _swiper.modules.some((module) => module.name === moduleName)
  }

  return { hasModule }
}

export function useSwiperToggleEnabled(swiperRef: Ref<MaybeEmptySwiper>) {
  const isCanPrev = ref(false)
  const isCanNext = ref(false)

  watchEffect((cleanup) => {
    const swiper = unref(swiperRef)
    if (!swiper) return
    if (swiper.params.loop || swiper.params.rewind) {
      isCanPrev.value = true
      isCanNext.value = true
      return
    }
    const onSlideChange = () => {
      console.log('slideChange')
      isCanPrev.value = !swiper.isBeginning
      isCanNext.value = !swiper.isEnd
    }
    isCanPrev.value = !swiper.isBeginning
    isCanNext.value = !swiper.isEnd
    swiper.on('slideChange', onSlideChange)
    cleanup(() => {
      swiper.off('slideChange', onSlideChange)
    })
  })

  return { isCanPrev, isCanNext }
}
