<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { carouselItemVariant } from '.'
import { useCarousel } from './useCarousel'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { orientation } = useCarousel()
</script>

<template>
  <div
    role="group"
    aria-roledescription="slide"
    :class="
      cn(carouselItemVariant({ orientation }), 'embla__slide', props.class)
    "
    :data-orientation="orientation"
  >
    <slot />
  </div>
</template>
