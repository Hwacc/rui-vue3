<script setup lang="ts">
import type { Swiper as SwiperClass } from 'swiper/types'
import { useSwiper } from 'swiper/vue'
import { computed } from 'vue'
import { useSwiperToggleEnabled } from './utils'

const { swiper } = defineProps<{ swiper?: SwiperClass }>()
defineSlots<{
  default: (props: { disabled: boolean }) => any
}>()

const effectiveSwiper = computed(() => {
  return swiper ?? useSwiper()?.value
})
const { isCanPrev } = useSwiperToggleEnabled(effectiveSwiper)

function onClick() {
  isCanPrev.value && effectiveSwiper.value?.slidePrev()
}
</script>

<template>
  <div
    class="w-fit"
    :data-disabled="isCanPrev ? undefined : ''"
    @click="onClick"
  >
    <slot
      v-bind="{
        disabled: !isCanPrev,
      }"
    />
  </div>
</template>
