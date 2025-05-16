import type { Swiper } from 'swiper/types'
import type { ComputedRef, MaybeRef, Ref } from 'vue'
import type { SwiperEmits } from './interface'
import { ref, unref, watchEffect } from 'vue'

type MaybeEmptySwiper = Swiper | null | undefined

export function useSwiperModule(
  swiper: MaybeRef<MaybeEmptySwiper> | ComputedRef<MaybeEmptySwiper>,
) {
  function hasModule(moduleName: string) {
    const _swiper = unref(swiper)
    if (!_swiper)
      return false
    return _swiper.modules.some(module => module.name === moduleName)
  }
  return { hasModule }
}

export function useSwiperToggleEnabled(swiperRef: Ref<MaybeEmptySwiper>) {
  const isCanPrev = ref(false)
  const isCanNext = ref(false)

  watchEffect((cleanup) => {
    const swiper = unref(swiperRef)
    if (!swiper)
      return
    if (swiper.params?.loop || swiper.params?.rewind) {
      isCanPrev.value = true
      isCanNext.value = true
      return
    }
    const onSlideChange = () => {
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

export function useRegistSwiperEmits({
  swiperRef,
  emit,
  events = [],
}: {
  swiperRef: Ref<MaybeEmptySwiper>
  emit: (...args: any[]) => any
  events: Array<keyof SwiperEmits>
}) {
  if (!swiperRef.value || !events.length)
    return
  watchEffect((cleanup) => {
    const listeners = events.map((key) => {
      return [
        key,
        (...args: any) => {
          emit(key, ...(args as any))
        },
      ]
    })
    listeners.forEach(([key, listener]) => {
      swiperRef.value?.on(key as any, listener as any)
    })
    cleanup(() => {
      listeners.forEach(([key, listener]) => {
        swiperRef.value?.off(key as any, listener as any)
      })
    })
  })
}
