<script setup lang="ts">
import type { DropdownMenuSubTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-vue-next';
import { DropdownMenuSubTrigger, useForwardProps } from 'reka-ui';
import { dropdownMenuSubTriggerVariants } from '.';

const {
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<
  DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class']; disableRuiClass?: boolean }
>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    :class="cn(dropdownMenuSubTriggerVariants({ disableRuiClass }), propsClass)"
  >
    <slot />
    <ChevronRight class="ml-auto h-4 w-4" />
  </DropdownMenuSubTrigger>
</template>
