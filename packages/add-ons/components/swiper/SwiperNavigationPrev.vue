<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { ChevronLeft } from 'lucide-vue-next'
import { useSwiper } from 'swiper/vue'
import { useTemplateRef, watchEffect } from 'vue'
import { swiperNavigationVariant } from '.'
import { useSwiperModule, useSwiperToggleEnabled } from './utils'

const { class: propsClass, unstyled } = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()

const swiper = useSwiper()
const { hasModule } = useSwiperModule(swiper)
const { isCanPrev } = useSwiperToggleEnabled(swiper)
const navRef = useTemplateRef('navigation')

watchEffect(() => {
  if (hasModule('Navigation') && navRef.value) {
    if (swiper.value.params?.navigation) {
      if (typeof swiper.value.params.navigation === 'boolean') {
        swiper.value.params.navigation = {
          prevEl: navRef.value,
        }
      }
      else {
        swiper.value.params.navigation.prevEl = navRef.value
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
    :class="cn(swiperNavigationVariant({ nav: 'prev', unstyled }), propsClass)"
    :data-disabled="isCanPrev ? undefined : ''"
  >
    <slot>
      <ChevronLeft />
    </slot>
  </div>
</template>
