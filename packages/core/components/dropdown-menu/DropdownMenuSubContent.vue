<script setup lang="ts">
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { PopoverContentMotion } from '@rui/core/components/motion/PopoverContentMotion';
import { cn, spaceTimes } from '@rui/core/lib/utils';
import { AnimatePresence } from 'motion-v';
import { DropdownMenuSubContent, useForwardPropsEmits } from 'reka-ui';
import { tvSubContent } from '.';

const {
  class: propsClass,
  sideOffset = spaceTimes(2),
  unstyled,
  ui,
  ...props
} = defineProps<
  DropdownMenuSubContentProps & {
    class?: HTMLAttributes['class'];
    unstyled?: boolean;
    ui?: {
      wrapper?: {
        class?: HTMLAttributes['class'];
      };
      content?: {
        class?: HTMLAttributes['class'];
      };
    };
  }
>();
const emits = defineEmits<DropdownMenuSubContentEmits>();

const { wrapper, content } = tvSubContent();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AnimatePresence>
    <DropdownMenuSubContent
      :class="wrapper({ unstyled, class: [ui?.wrapper?.class, propsClass] })"
      v-bind="forwarded"
      :side-offset="sideOffset"
    >
      <PopoverContentMotion
        :class="content({ unstyled, class: ui?.content?.class })"
        side="right"
      >
        <slot />
      </PopoverContentMotion>
    </DropdownMenuSubContent>
  </AnimatePresence>
</template>
