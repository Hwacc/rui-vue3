<script setup lang="ts">
import type { Swiper as SwiperClass } from 'swiper/types'
import { useSwiperToggleEnabled } from './utils'
import { toRefs } from 'vue'

const props = defineProps<{ swiper?: SwiperClass }>()
const { swiper } = toRefs(props)
const { isCanNext } = useSwiperToggleEnabled(swiper)

defineSlots<{
  default: (props: { disabled: boolean }) => any
}>()

function onClick() {
  isCanNext.value && swiper.value?.slideNext()
}
</script>

<template>
  <div
    class="w-fit"
    :data-disabled="isCanNext ? undefined : ''"
    @click="onClick"
  >
    <slot
      v-bind="{
        disabled: !isCanNext,
      }"
    />
  </div>
</template>
