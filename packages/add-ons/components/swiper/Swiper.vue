<script lang="ts" setup>
import type { Swiper as SwiperClass } from 'swiper/types'
import type { SwiperEmits, SwiperProps, SwiperSlots } from './interface'
import { useForwardExpose } from '@rui/add-ons/lib/useForwardExpose'
import { useForwardPropsEmits } from '@rui/add-ons/lib/useFowardPropsEmits'
import { Swiper } from 'swiper/vue'
import { ref } from 'vue'
import { useSwiperModule } from './utils'

defineOptions({
  inheritAttrs: false,
})

const { direction = 'horizontal', ...props } = defineProps<SwiperProps>()
const emits = defineEmits<SwiperEmits>()
defineSlots<SwiperSlots>()

const swiperInstance = ref<SwiperClass | null>(null)
const { hasModule } = useSwiperModule(swiperInstance)

function onSwiperInit(swiper: SwiperClass) {
  swiperInstance.value = swiper
}
function onFocusIn() {
  if (hasModule('Keyboard')) {
    swiperInstance.value?.keyboard.enable()
  }
}
function onFocusOut() {
  if (hasModule('Keyboard')) {
    swiperInstance.value?.keyboard.disable()
  }
}
function onKeyDown(event: KeyboardEvent) {
  if (hasModule('Keyboard'))
    return
  const prevKey = direction === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = direction === 'vertical' ? 'ArrowDown' : 'ArrowRight'
  if (event.key === prevKey) {
    event.preventDefault()
    swiperInstance.value?.slidePrev()
    return
  }
  if (event.key === nextKey) {
    event.preventDefault()
    swiperInstance.value?.slideNext()
  }
}

defineExpose({ swiperInstance })
const { forwardRef } = useForwardExpose()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <div
    class="swiper-region"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @keydown="onKeyDown"
  >
    <!-- @vue-expect-error -->
    <Swiper
      :ref="forwardRef"
      v-bind="{ ...forwarded, ...$attrs }"
      :direction="direction"
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
