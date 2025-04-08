<script setup lang="ts">
import type { DropdownMenuSubTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { ChevronRight } from 'lucide-vue-next';
import { DropdownMenuSubTrigger, useForwardProps } from 'reka-ui';
import { dropdownMenuSubTriggerVariants } from '.';

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class']; unstyled?: boolean }
>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    :class="cn(dropdownMenuSubTriggerVariants({ unstyled }), propsClass)"
  >
    <slot />
    <ChevronRight class="ml-auto h-4 w-4" />
  </DropdownMenuSubTrigger>
</template>
