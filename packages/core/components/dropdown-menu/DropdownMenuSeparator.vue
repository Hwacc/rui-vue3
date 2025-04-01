<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { DropdownMenuSeparator } from 'reka-ui';
import { dropdownMenuSeparatorVariants } from '.';

const {
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<
  DropdownMenuSeparatorProps & {
    class?: HTMLAttributes['class'];
    disableRuiClass?: boolean;
  }
>();
</script>

<template>
  <DropdownMenuSeparator
    v-bind="props"
    :class="cn(dropdownMenuSeparatorVariants({ disableRuiClass }), propsClass)"
  />
</template>
