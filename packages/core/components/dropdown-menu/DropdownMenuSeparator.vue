<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { DropdownMenuSeparator } from 'reka-ui';

const { class: propsClass, ...props } = defineProps<
  DropdownMenuSeparatorProps & {
    class?: HTMLAttributes['class'];
  }
>();
</script>

<template>
  <DropdownMenuSeparator v-bind="props" :class="cn('-mx-2 my-1.5 h-px bg-h00', propsClass)" />
</template>
