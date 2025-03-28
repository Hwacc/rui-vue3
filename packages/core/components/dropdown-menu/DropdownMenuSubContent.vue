<script setup lang="ts">
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn, spaceTimes } from '@/lib/utils';
import { DropdownMenuSubContent, useForwardPropsEmits } from 'reka-ui';
import { dropdownMenuSubContentVariants } from '.';
import { AnimatePresence } from 'motion-v';
import { PopoverContentMotion } from '@/components/motion/PopoverContentMotion';

const {
  class: propsClass,
  sideOffset = spaceTimes(2),
  disableRuiClass,
  ...props
} = defineProps<
  DropdownMenuSubContentProps & { class?: HTMLAttributes['class']; disableRuiClass?: boolean }
>();
const emits = defineEmits<DropdownMenuSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AnimatePresence>
    <DropdownMenuSubContent v-bind="forwarded" :side-offset="sideOffset">
      <PopoverContentMotion
        :class="cn(dropdownMenuSubContentVariants({ disableRuiClass }), propsClass)"
        side="right"
      >
        <slot />
      </PopoverContentMotion>
    </DropdownMenuSubContent>
  </AnimatePresence>
</template>
