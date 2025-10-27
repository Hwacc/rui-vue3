<script setup lang="ts">
import type { NavigationEvents, NavigationOptions, Swiper } from 'swiper/types'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@rui/add-ons/composables/useForwardProps'
import { cn } from '@rui/core/lib/utils'
import { merge } from 'lodash-es'
import { ChevronRight } from 'lucide-vue-next'
import { useSwiper } from 'swiper/vue'
import { computed, onMounted, useTemplateRef, watch } from 'vue'
import { swiperNavigationVariant } from '.'
import { useRegistSwiperEmits, useSwiperModule, useSwiperToggleEnabled } from './utils'

const {
  class: propsClass,
  unstyled,
  swiper,
  ...props
} = defineProps<
  Omit<NavigationOptions, 'enabled' | 'nextEl' | 'prevEl'> & {
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
const forwared = useForwardProps(props)

useRegistSwiperEmits({
  swiperRef: effectiveSwiper,
  emit,
  events: ['navigationHide', 'navigationNext', 'navigationShow'],
})

watch(forwared, () => {
  effectiveSwiper.value.params.navigation = merge(
    {},
    effectiveSwiper.value.params.navigation,
    forwared.value,
  )
  effectiveSwiper.value.navigation.update()
})

onMounted(() => {
  if (effectiveSwiper.value && hasModule('Navigation') && navRef.value) {
    const options = merge(
      {},
      typeof effectiveSwiper.value.params.navigation === 'boolean'
        ? {}
        : effectiveSwiper.value.params.navigation,
      forwared.value,
      {
        enabled: true,
        nextEl: navRef.value,
      },
    )
    effectiveSwiper.value.params.navigation = options
    effectiveSwiper.value.navigation.init()
  }
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
