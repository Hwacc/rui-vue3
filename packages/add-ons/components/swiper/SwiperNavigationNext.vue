<script setup lang="ts">
import type { NavigationEvents, NavigationOptions, Swiper } from 'swiper/types'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { merge } from 'lodash-es'
import { ChevronRight } from 'lucide-vue-next'
import { useSwiper } from 'swiper/vue'
import { computed, reactive, useTemplateRef, watchEffect } from 'vue'
import { swiperNavigationVariant } from '.'
import { useRegistSwiperEmits, useSwiperModule, useSwiperToggleEnabled } from './utils'

const {
  class: propsClass,
  unstyled,
  swiper,
  nextEl,
  prevEl,
  ...props
} = defineProps<
  NavigationOptions & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    swiper?: Swiper
  }
>()
const emit = defineEmits<NavigationEvents>()

const effectiveSwiper = computed(() => {
  return swiper ?? useSwiper()?.value
})
const { hasModule } = useSwiperModule(effectiveSwiper)
const { isCanNext } = useSwiperToggleEnabled(effectiveSwiper)
const navRef = useTemplateRef('navigation')
const reactiveProps = reactive(props)

watchEffect(() => {
  if (effectiveSwiper.value && hasModule('Navigation') && navRef.value) {
    const options = merge(
      {},
      typeof effectiveSwiper.value.params.navigation === 'boolean'
        ? {
            enabled: effectiveSwiper.value.params.navigation,
          }
        : effectiveSwiper.value.params.navigation,
      reactiveProps,
      {
        nextEl: navRef.value,
      },
    )
    effectiveSwiper.value.params.navigation = options
    effectiveSwiper.value.navigation.destroy()
    effectiveSwiper.value.navigation.init()
    effectiveSwiper.value.navigation.update()
  }
})

useRegistSwiperEmits({
  swiperRef: effectiveSwiper,
  emit,
  events: [
    'navigationHide',
    'navigationNext',
    'navigationPrev',
    'navigationShow',
  ],
})
</script>

<template>
  <div
    ref="navigation"
    :class="cn(swiperNavigationVariant({ nav: 'next', unstyled }), propsClass)"
    :data-disabled="isCanNext ? undefined : ''"
  >
    <slot v-bind="{ disabled: !isCanNext }">
      <ChevronRight />
    </slot>
  </div>
</template>
