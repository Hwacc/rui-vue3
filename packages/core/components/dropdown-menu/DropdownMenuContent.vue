<script setup lang="ts">
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { PopoverContentMotion } from '@rui/core/components/motion/PopoverContentMotion';
import { AnimatePresence } from 'motion-v';
import { DropdownMenuContent, DropdownMenuPortal, useForwardPropsEmits } from 'reka-ui';
import { tvContent } from '.';
import { ComponentProps } from 'vue-component-type-helpers';

const {
  class: propsClass,
  side = 'bottom',
  align = 'start',
  unstyled,
  ui,
  ...props
} = defineProps<
  DropdownMenuContentProps & {
    class?: HTMLAttributes['class'];
    unstyled?: boolean;
    ui?: {
      portal?: {
        props?: ComponentProps<typeof DropdownMenuPortal>;
      };
      wrapper?: {
        class?: HTMLAttributes['class'];
      };
      content?: {
        class?: HTMLAttributes['class'];
      };
    };
  }
>();

const emits = defineEmits<DropdownMenuContentEmits>();

const { wrapper, content } = tvContent();
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
  <DropdownMenuPortal v-bind="ui?.portal?.props">
    <AnimatePresence>
      <DropdownMenuContent
        :class="wrapper({ unstyled, class: [ui?.wrapper?.class, propsClass] })"
        v-bind="forwarded"
      >
        <PopoverContentMotion
          :class="
            content({
              unstyled,
              class: [ui?.content?.class],
            })
          "
        >
          <slot />
        </PopoverContentMotion>
      </DropdownMenuContent>
    </AnimatePresence>
  </DropdownMenuPortal>
</template>
