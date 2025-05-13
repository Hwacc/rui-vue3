<script lang="ts" setup>
import type { SwiperEmits, SwiperProps } from './interface'
import { useForwardPropsEmits } from '@rui/add-ons/lib/useFowardPropsEmits'
import { Swiper } from 'swiper/vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SwiperProps>(), {})
const emits = defineEmits<SwiperEmits>()

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') {
    console.log('left')
  }
  else if (e.key === 'ArrowRight') {
    console.log('right')
  }
}

const fowarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <div
    class="swiper-region"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <!-- @vue-expect-error -->
    <Swiper
      v-bind="{ ...fowarded, ...$attrs }"
    >
      <slot />
    </Swiper>
  </div>
</template>
