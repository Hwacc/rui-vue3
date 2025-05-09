<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { sidebarFooterVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()
</script>

<template>
  <div
    data-sidebar="footer"
    :class="
      cn(
        sidebarFooterVariants({
          unstyled: props.unstyled
        }),
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
