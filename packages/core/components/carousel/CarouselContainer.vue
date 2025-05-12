<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { carouselContainerVariant } from '.'
import { useCarousel } from './useCarousel'

const props = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()

const { orientation } = useCarousel()
</script>

<template>
  <div
    :class="
      cn(
        carouselContainerVariant({ orientation, unstyled: props.unstyled }),
        'embla__container',
        props.class,
      )
    "
    :data-orientation="orientation"
  >
    <slot />
  </div>
</template>
