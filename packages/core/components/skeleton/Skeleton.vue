<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SkeletonVariantsType } from '.'
import { cn } from '@rui/core/lib/utils'
import { skeletonVariants } from '.'

interface SkeletonProps {
  class?: HTMLAttributes['class']
  shape?: SkeletonVariantsType['shape']
  variant?: SkeletonVariantsType['variant']
  unstyled?: boolean
}

const {
  class: propsClass,
  variant = 'pulse',
  shape = 'rect',
  unstyled,
} = defineProps<SkeletonProps>()
</script>

<template>
  <div
    :class="
      cn(
        skeletonVariants({
          shape,
          variant,
          unstyled,
        }),
        propsClass,
      )
    "
    :data-shape="shape"
    :data-variant="variant"
  >
    <slot />
  </div>
</template>
