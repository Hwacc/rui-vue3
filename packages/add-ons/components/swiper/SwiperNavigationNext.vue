<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { ChevronRight } from 'lucide-vue-next'
import { useSwiper } from 'swiper/vue'
import { useTemplateRef, watch, watchEffect } from 'vue'
import { swiperNavigationVariant } from '.'
import { useSwiperModule, useSwiperToggleEnabled } from './utils'

const { class: propsClass, unstyled } = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()

const swiper = useSwiper()
const { hasModule } = useSwiperModule(swiper)
const { isCanNext } = useSwiperToggleEnabled(swiper)
const navRef = useTemplateRef('navigation')

watch(isCanNext, (canNext) => {
  console.log('canNext', canNext)
})

watchEffect(() => {
  if (hasModule('Navigation') && navRef.value) {
    if (swiper.value.params?.navigation) {
      if (typeof swiper.value.params.navigation === 'boolean') {
        swiper.value.params.navigation = {
          nextEl: navRef.value,
        }
      } else {
        swiper.value.params.navigation.nextEl = navRef.value
      }
    }
    swiper.value.navigation.destroy()
    swiper.value.navigation.init()
    swiper.value.navigation.update()
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
