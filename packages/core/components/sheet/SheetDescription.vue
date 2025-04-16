<script setup lang="ts">
import { cn } from '@/core/lib/utils'
import { DialogDescription, type DialogDescriptionProps } from 'reka-ui'
import { type HTMLAttributes } from 'vue'

const { class: propsClass, ...props } = defineProps<
  DialogDescriptionProps & { class?: HTMLAttributes['class'] }
>()
</script>

<template>
  <DialogDescription
    :class="cn('text-sm text-muted-foreground', propsClass)"
    v-bind="props"
  >
    <slot />
  </DialogDescription>
</template>
