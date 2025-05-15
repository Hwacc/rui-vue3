<script setup lang="ts">
import type { Swiper } from 'swiper/types'
import type { HTMLAttributes } from 'vue'
import { cn, getNodeCssVar, rem2px } from '@rui/core/lib/utils'
import { merge } from 'lodash-es'
import { useSwiper } from 'swiper/vue'
import { computed, nextTick, useTemplateRef, watchEffect } from 'vue'
import { useSwiperModule } from './utils'
import { prefix } from '.'
import { SwiperPaginationProps } from './interface'

const {
  class: propsClass,
  unstyled,
  swiper,
  ...props
} = defineProps<
  SwiperPaginationProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    swiper?: Swiper
  }
>()

const effectiveSwiper = computed(() => {
  return swiper ?? useSwiper()?.value
})
const { hasModule } = useSwiperModule(effectiveSwiper)
const pagiRef = useTemplateRef('pagination')

function reRenderPagination() {
  if (effectiveSwiper.value && hasModule('Pagination')) {
    effectiveSwiper.value.pagination.destroy()
    effectiveSwiper.value.pagination.init()
    effectiveSwiper.value.pagination.render()
    effectiveSwiper.value.pagination.update()
  }
}

watchEffect((cleanup) => {
  if (effectiveSwiper.value && hasModule('Pagination') && pagiRef.value) {
    if (props.type === 'autoplay-bullets' && hasModule('Autoplay')) {
      const onAutoplayTimeLeft = (
        _swiper: Swiper,
        _timeLeft: number,
        percentage: number
      ) => {
        pagiRef.value?.style.setProperty(
          '--rui-swiper-autoplay-percentage',
          `${Math.max(0, Math.min(1, 1 - percentage)) * 100}%`
        )
      }
      const onPaginationRender = () => {
        if (props.dynamicBullets) {
          // TODO: 判断swiper方向
          const sizeVar = getNodeCssVar(
            pagiRef.value,
            '--swiper-pagination-bullet-size',
            '0'
          )
          const size = rem2px(parseFloat(sizeVar))

          const gapVar = getNodeCssVar(
            pagiRef.value,
            '--swiper-pagination-bullet-horizontal-gap',
            '.25rem'
          )
          const gap = rem2px(parseFloat(gapVar))
          nextTick(() => {
            if (pagiRef.value) {
              // TODO: 40 应动态获取
              pagiRef.value.style.width = `${
                (size + gap * 2) * (5 + (props.dynamicMainBullets ?? 1)) + 40
              }px`
            }
          })
        }
      }
      effectiveSwiper.value.on('paginationRender', onPaginationRender)
      effectiveSwiper.value.on('autoplayTimeLeft', onAutoplayTimeLeft)
      cleanup(() => {
        effectiveSwiper.value.off('paginationRender', onPaginationRender)
        effectiveSwiper.value.off('autoplayTimeLeft', onAutoplayTimeLeft)
      })
    }
    const options = merge(
      {},
      typeof effectiveSwiper.value.params.pagination === 'boolean'
        ? {
            enabled: effectiveSwiper.value.params.pagination,
          }
        : effectiveSwiper.value.params.pagination,
      props,
      {
        el: pagiRef.value,
        type: props.type === 'autoplay-bullets' ? 'bullets' : props.type,
      }
    )
    effectiveSwiper.value.params.pagination = options
    reRenderPagination()
  }
})
</script>

<template>
  <div
    ref="pagination"
    role="pagination-container"
    :class="
      cn('swiper-pagination', !unstyled && `${prefix}-pagination`, propsClass)
    "
    :data-type="props.type"
  />
</template>
