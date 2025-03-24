<script setup lang="ts">
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn, spaceTimes } from '@/lib/utils';
import { DropdownMenuSubContent, useForwardPropsEmits } from 'reka-ui';
import { dropdownMenuSubContentClass } from '.';
import { AnimatePresence } from 'motion-v';
import { DropdownMenuContentMotion } from '@/components/motion/DropdownMenuContentMotion';

const {
  class: propsClass,
  sideOffset = spaceTimes(2),
  ...props
} = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DropdownMenuSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AnimatePresence>
    <DropdownMenuSubContent v-bind="forwarded" :side-offset="sideOffset">
      <DropdownMenuContentMotion :class="cn(dropdownMenuSubContentClass, propsClass)" side="right">
        <slot />
      </DropdownMenuContentMotion>
    </DropdownMenuSubContent>
  </AnimatePresence>
</template>
