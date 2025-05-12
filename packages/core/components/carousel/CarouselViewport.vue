<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { carouselViewportVariant } from '.'
import { useCarousel } from './useCarousel'

const { class: propsClass, unstyled } = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()
const { carouselRef, orientation } = useCarousel()
</script>

<template>
  <div
    ref="carouselRef"
    :class="
      cn(
        carouselViewportVariant({
          unstyled,
        }),
        'embla__viewport',
        propsClass,
      )
    "
    :data-orientation="orientation"
  >
    <slot />
  </div>
</template>
