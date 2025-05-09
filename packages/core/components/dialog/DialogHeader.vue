<script setup lang="ts">
import { useSlots, type HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import {
  dialogHeaderVariants,
  DialogClose,
  DialogCloseFrom,
  dialogCloseVariants
} from '.'
import { DialogTitle, DialogDescription } from 'reka-ui'
import { X } from 'lucide-vue-next'

const { class: propsClass, unstyled } = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()

const slots = useSlots()
</script>

<template>
  <div :class="cn(dialogHeaderVariants({ unstyled }), propsClass)">
    <!-- for remove warning -->
    <DialogTitle class="!hidden select-none">
      <component :is="() => slots.default?.()" />
    </DialogTitle>
    <DialogDescription class="!hidden select-none"></DialogDescription>
    <!-- ---end--- -->
    <slot />
    <DialogClose
      as="button"
      :class="cn(dialogCloseVariants({ unstyled }), 'p-0.5')"
      :close-from="DialogCloseFrom.CloseButton"
    >
      <X class="size-4 text-xs disabled:pointer-events-none" />
      <span class="sr-only">Close</span>
    </DialogClose>
  </div>
</template>
