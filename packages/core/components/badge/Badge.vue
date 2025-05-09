<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BadgeVariants } from '.'
import { cn } from '@rui/core/lib/utils'
import { badgeVariants } from '.'

const props = defineProps<{
  variant?: BadgeVariants['variant']
  size?: BadgeVariants['size']
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn(badgeVariants({ variant: props.variant }), props.class)"
    :data-variant="props.variant"
  >
    <slot />
  </div>
</template>
