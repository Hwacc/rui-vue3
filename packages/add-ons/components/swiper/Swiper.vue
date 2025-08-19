<script lang="ts" setup>
import type { Swiper as SwiperClass } from 'swiper/types'
import type { HTMLAttributes } from 'vue'
import type { SwiperEmits, SwiperProps, SwiperSlots } from './interface'
import { useForwardPropsEmits } from '@rui/add-ons/composables/useFowardPropsEmits'
import { cn } from '@rui/core/lib/utils'
import { Swiper } from 'swiper/vue'
import { ref } from 'vue'
import { useSwiperModule } from './utils'

defineOptions({
  inheritAttrs: false,
})

const {
  class: propsClass,
  direction = 'horizontal',
  ...props
} = defineProps<SwiperProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<SwiperEmits>()

defineSlots<SwiperSlots>()

const swiperInstance = ref<SwiperClass | null>(null)
const swiperEl = ref<HTMLElement>()
const { hasModule } = useSwiperModule(swiperInstance)

function onSwiperInit(swiper: SwiperClass) {
  swiperEl.value = swiper.el
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

defineExpose({ swiper: swiperInstance, $el: swiperEl })

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
      :class="cn('relative', propsClass)"
      v-bind="{ ...forwarded, ...$attrs }"
      :direction="direction"
      @swiper="onSwiperInit"
    >
      <template v-if="$slots.default" #default>
        <slot />
      </template>
      <template v-if="$slots['container-start']" #container-start>
        <slot name="container-start" />
      </template>
      <template v-if="$slots['container-end']" #container-end>
        <slot name="container-end" />
      </template>
      <template v-if="$slots['wrapper-start']" #wrapper-start>
        <slot name="wrapper-start" />
      </template>
      <template v-if="$slots['wrapper-end']" #wrapper-end>
        <slot name="wrapper-end" />
      </template>
    </Swiper>
  </div>
</template>
