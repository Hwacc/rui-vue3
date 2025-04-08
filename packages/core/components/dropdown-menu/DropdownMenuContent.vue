<script setup lang="ts">
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { DropdownMenuContent, DropdownMenuPortal, useForwardPropsEmits } from 'reka-ui';
import { dropdownMenuContentVariants } from '.';
import { AnimatePresence } from 'motion-v';
import { PopoverContentMotion } from '@/core/components/motion/PopoverContentMotion';

const {
  class: propsClass,
  side = 'bottom',
  align = 'start',
  unstyled,
  ...props
} = defineProps<
  DropdownMenuContentProps & {
    class?: HTMLAttributes['class'];
    unstyled?: boolean;
  }
>();

const emits = defineEmits<DropdownMenuContentEmits>();

const forwarded = useForwardPropsEmits(
  {
    side,
    align,
    ...props,
  },
  emits
);
</script>

<template>
  <DropdownMenuPortal>
    <AnimatePresence>
      <DropdownMenuContent v-bind="forwarded">
        <PopoverContentMotion
          :class="cn(dropdownMenuContentVariants({ unstyled }), propsClass)"
        >
          <slot />
        </PopoverContentMotion>
      </DropdownMenuContent>
    </AnimatePresence>
  </DropdownMenuPortal>
</template>
