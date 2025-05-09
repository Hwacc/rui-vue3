<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { sidebarContentVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()
</script>

<template>
  <div
    :class="
      cn(
        sidebarContentVariants({
          unstyled: props.unstyled,
        }),
        props.class,
      )
    "
    data-sidebar="content"
  >
    <slot />
  </div>
</template>
