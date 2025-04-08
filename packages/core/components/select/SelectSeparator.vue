<script setup lang="ts">
import type { SelectSeparatorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { SelectSeparator } from 'reka-ui';
import { selectSeparatorVariants } from '.';

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  SelectSeparatorProps & { class?: HTMLAttributes['class']; unstyled?: boolean }
>();
</script>

<template>
  <SelectSeparator
    v-bind="props"
    :class="cn(selectSeparatorVariants({ unstyled }), propsClass)"
  />
</template>
