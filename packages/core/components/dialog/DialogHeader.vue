<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { X } from 'lucide-vue-next'
import { DialogDescription, DialogTitle } from 'reka-ui'
import { useSlots } from 'vue'
import { DialogClose, DialogCloseFrom, tvDialog } from '.'

const {
  class: propsClass,
  unstyled,
  ui,
} = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
  ui?: {
    close?: {
      class?: HTMLAttributes['class']
    }
  }
}>()
const slots = useSlots()
const { header, close } = tvDialog()
</script>

<template>
  <div :class="header({ unstyled, class: propsClass })">
    <!-- for remove warning -->
    <DialogTitle class="!hidden select-none">
      <component :is="() => slots.default?.()" />
    </DialogTitle>
    <DialogDescription class="!hidden select-none" />
    <!-- ---end--- -->
    <slot />
    <DialogClose
      as="button"
      :class="close({ unstyled, class: ['p-0.5', ui?.close?.class] })"
      :close-from="DialogCloseFrom.CloseButton"
    >
      <X class="size-4 text-xs disabled:pointer-events-none" />
      <span class="sr-only">Close</span>
    </DialogClose>
  </div>
</template>
