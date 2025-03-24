<script setup lang="ts">
import { useSlots, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { dialogHeaderClass, DialogClose, dialogCloseDefaultClass, DialogCloseFrom } from '.';
import { DialogTitle, DialogDescription } from 'reka-ui';
import { X } from 'lucide-vue-next';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  closeClass?: HTMLAttributes['class'];
}>();

const slots = useSlots();
</script>

<template>
  <div :class="cn(dialogHeaderClass, props.class)">
    <!-- for remove warning -->
    <DialogTitle class="!hidden select-none">
      <component :is="() => slots.default?.()" />
    </DialogTitle>
    <DialogDescription class="!hidden select-none"></DialogDescription>
    <!-- ---end--- -->
    <slot />
    <DialogClose as="button" class="p-0.5 group" :close-from="DialogCloseFrom.CloseButton">
      <X :class="cn(dialogCloseDefaultClass, props.closeClass)" />
      <span class="sr-only">Close</span>
    </DialogClose>
  </div>
</template>
