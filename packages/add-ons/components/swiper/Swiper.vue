<script lang="ts" setup>
import type { SwiperEmits, SwiperProps, SwiperSlots } from './interface'
import { useForwardPropsEmits } from '@rui/add-ons/lib/useFowardPropsEmits'
import { Swiper } from 'swiper/vue'
import { Swiper as SwiperClass } from 'swiper/types'
import { ref } from 'vue'
import { useForwardExpose } from '@rui/add-ons/lib/useForwardExpose'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<SwiperProps>(), {})
const emits = defineEmits<SwiperEmits>()
defineSlots<SwiperSlots>()

const swiperInstance = ref<SwiperClass | null>(null)

function onSwiperInit(swiper: SwiperClass) {
  swiperInstance.value = swiper
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') {
    swiperInstance.value?.slidePrev()
  } else if (e.key === 'ArrowRight') {
    swiperInstance.value?.slideNext()
  }
}

defineExpose({
  swiperInstance
})
const { forwardRef } = useForwardExpose()
const forwarded = useForwardPropsEmits(props, emits)
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
      :ref="forwardRef"
      v-bind="{ ...forwarded, ...$attrs }"
      @swiper="onSwiperInit"
    >
      <template #default>
        <slot />
      </template>
      <template #container-start>
        <slot name="container-start" />
      </template>
      <template #container-end>
        <slot name="container-end" />
      </template>
      <template #wrapper-start>
        <slot name="wrapper-start" />
      </template>
      <template #wrapper-end>
        <slot name="wrapper-end" />
      </template>
    </Swiper>
  </div>
</template>
