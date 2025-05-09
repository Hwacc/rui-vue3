<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { sheetFooterVariants } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()
</script>

<template>
  <div
    :class="
      cn(
        sheetFooterVariants({
          unstyled: props.unstyled
        }),
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
