<script setup lang="ts">
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { DropdownMenuContent, DropdownMenuPortal, useForwardPropsEmits } from 'reka-ui';
import { dropdownMenuContentClass } from '.';
import { AnimatePresence } from 'motion-v';
import { DropdownMenuContentMotion } from '@/components/motion/DropdownMenuContentMotion';

const {
  class: propsClass,
  side = 'bottom',
  align = 'start',
  ...props
} = defineProps<DropdownMenuContentProps & { class?: HTMLAttributes['class'] }>();

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
        <DropdownMenuContentMotion :class="cn(dropdownMenuContentClass, propsClass)">
          <slot />
        </DropdownMenuContentMotion>
      </DropdownMenuContent>
    </AnimatePresence>
  </DropdownMenuPortal>
</template>
