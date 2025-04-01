<script setup lang="ts">
import type { SelectSeparatorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { SelectSeparator } from 'reka-ui';
import { selectSeparatorVariants } from '.';

const {
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<
  SelectSeparatorProps & { class?: HTMLAttributes['class']; disableRuiClass?: boolean }
>();
</script>

<template>
  <SelectSeparator
    v-bind="props"
    :class="cn(selectSeparatorVariants({ disableRuiClass }), propsClass)"
  />
</template>
