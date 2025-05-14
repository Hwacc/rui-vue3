<script setup lang="ts">
import type { Swiper as SwiperClass } from 'swiper/types'
import { useSwiperToggleEnabled } from './utils'
import { toRefs } from 'vue'

const props = defineProps<{ swiper?: SwiperClass }>()
const { swiper } = toRefs(props)
const { isCanPrev } = useSwiperToggleEnabled(swiper)

defineSlots<{
  default: (props: { disabled: boolean }) => any
}>()

function onClick() {
  isCanPrev.value && swiper.value?.slidePrev()
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
