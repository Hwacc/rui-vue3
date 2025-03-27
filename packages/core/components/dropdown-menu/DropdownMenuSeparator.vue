<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { DropdownMenuSeparator } from 'reka-ui';
import { dropdownMenuSeparatorClass } from '.';

const { class: propsClass, ...props } = defineProps<
  DropdownMenuSeparatorProps & {
    class?: HTMLAttributes['class'];
  }
>();
</script>

<template>
  <DropdownMenuSeparator v-bind="props" :class="cn(dropdownMenuSeparatorClass, propsClass)" />
</template>
