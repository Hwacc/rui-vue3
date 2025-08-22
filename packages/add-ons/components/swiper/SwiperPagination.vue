<script setup lang="ts">
import type { PaginationEvents, Swiper } from 'swiper/types'
import type { HTMLAttributes } from 'vue'
import type { SwiperPaginationProps } from './interface'
import { cn, getNodeCssVar, rem2px } from '@rui/core/lib/utils'
import { merge } from 'lodash-es'
import { useSwiper } from 'swiper/vue'
import { computed, nextTick, reactive, useTemplateRef, watchEffect } from 'vue'
import { prefix } from '.'
import { useRegistSwiperEmits, useSwiperModule } from './utils'

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
const emit = defineEmits<PaginationEvents>()

const effectiveSwiper = computed(() => {
  return swiper ?? useSwiper()?.value
})
const { hasModule } = useSwiperModule(effectiveSwiper)
const pagiRef = useTemplateRef('pagination')
const reactiveProps = reactive(props)

watchEffect((cleanup) => {
  if (effectiveSwiper.value && hasModule('Pagination') && pagiRef.value) {
    if (reactiveProps.type === 'autoplay-bullets' && hasModule('Autoplay')) {
      const onAutoplayTimeLeft = (
        _swiper: Swiper,
        _timeLeft: number,
        percentage: number,
      ) => {
        pagiRef.value?.style.setProperty(
          '--rui-swiper-autoplay-percentage',
          `${Math.max(0, Math.min(1, 1 - percentage)) * 100}%`,
        )
      }
      const onPaginationRender = () => {
        if (reactiveProps.dynamicBullets) {
          const getMinBulletSize = (): number => {
            if (pagiRef.value) {
              const bullets = effectiveSwiper.value.pagination.bullets
              if (bullets.length === 0)
                return 0
              let minSize = Infinity
              bullets.forEach((bullet: Element) => {
                const style = window.getComputedStyle(bullet)
                const dir = effectiveSwiper.value?.params.direction
                if (dir === 'horizontal') {
                  const width
                    = parseFloat(style.width)
                      + parseFloat(style.marginLeft)
                      + parseFloat(style.marginRight)
                  if (width < minSize) {
                    minSize = width
                  }
                }
                else if (dir === 'vertical') {
                  const height
                    = parseFloat(style.height)
                      + parseFloat(style.marginTop)
                      + parseFloat(style.marginBottom)
                  if (height < minSize) {
                    minSize = height
                  }
                }
              })
              return minSize
            }
            return 0
          }
          const activeBulletSize = rem2px(
            getNodeCssVar(
              pagiRef.value,
              '--swiper-pagination-bullet-autoplay-active-bullet-size',
              '2.5rem',
            ),
          )
          nextTick(() => {
            if (pagiRef.value) {
              pagiRef.value.style.width = `${
                getMinBulletSize() * (5 + (reactiveProps.dynamicMainBullets ?? 1))
                + activeBulletSize
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
      reactiveProps,
      {
        el: pagiRef.value,
        type: reactiveProps.type === 'autoplay-bullets' ? 'bullets' : reactiveProps.type,
      },
    )
    effectiveSwiper.value.params.pagination = options
    effectiveSwiper.value.pagination.destroy()
    effectiveSwiper.value.pagination.init()
    effectiveSwiper.value.pagination.render()
    effectiveSwiper.value.pagination.update()
  }
})

useRegistSwiperEmits({
  swiperRef: effectiveSwiper,
  emit,
  events: [
    'paginationHide',
    'paginationRender',
    'paginationShow',
    'paginationUpdate',
  ],
})
</script>

<template>
  <div
    ref="pagination"
    role="pagination-container"
    :class="
      cn('swiper-pagination', !unstyled && `${prefix}-pagination`, propsClass)
    "
    :data-type="reactiveProps.type"
  />
</template>
