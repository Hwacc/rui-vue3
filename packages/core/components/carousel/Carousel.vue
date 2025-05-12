<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { CarouselEmits, CarouselProps } from './interface.ts'
import { cn } from '@rui/core/lib/utils'
import { carouseVariant } from '.'
import { useProvideCarousel } from './useCarousel'

const props = withDefaults(
  defineProps<
    CarouselProps & {
      class?: HTMLAttributes['class']
      unstyled?: boolean
    }
  >(),
  {
    orientation: 'horizontal',
  },
)

const emits = defineEmits<CarouselEmits>()

const carouselArgs = useProvideCarousel(props, emits)

defineExpose(carouselArgs)

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  if (event.key === prevKey) {
    event.preventDefault()
    carouselArgs.scrollPrev()
    return
  }

  if (event.key === nextKey) {
    event.preventDefault()
    carouselArgs.scrollNext()
  }
}
</script>

<template>
  <div
    :class="
      cn(carouseVariant({ unstyled: props.unstyled }), 'embla', props.class)
    "
    :data-orientation="orientation"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <slot v-bind="carouselArgs" />
  </div>
</template>
