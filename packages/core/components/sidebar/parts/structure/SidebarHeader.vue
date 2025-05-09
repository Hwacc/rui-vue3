<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { sidebarHeaderVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()
</script>

<template>
  <div
    data-sidebar="header"
    :class="
      cn(sidebarHeaderVariants({ unstyled: props.unstyled }), props.class)
    "
  >
    <slot />
  </div>
</template>
