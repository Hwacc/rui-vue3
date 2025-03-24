<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import {
  injectSelectRootContext,
  SelectContent,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed, watch } from 'vue';
import { selectContentVariants, SelectScrollDownButton, SelectScrollUpButton } from '.';
import { AnimatePresence, Motion } from 'motion-v';
import { PopperContentMotion } from '../motion/PopperContentMotion';

defineOptions({
  inheritAttrs: false,
});

const {
  class: propsClass,
  position = 'popper',
  scrollButton = false,
  side = 'bottom',
  align = 'start',
  asChild = true,
  ...props
} = defineProps<
  SelectContentProps & {
    class?: HTMLAttributes['class'];
    scrollButton?: boolean;
  }
>();
const emits = defineEmits<SelectContentEmits>();

const classNames = computed(() => {
  return cn(selectContentVariants({ position }), propsClass);
});
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SelectPortal>
    <AnimatePresence>
      <SelectContent v-bind="{ ...forwarded, position, side, align, ...$attrs }" class="test">
        <PopperContentMotion :class="classNames">
          <!-- without scrollbar -->
          <div v-if="scrollButton">
            <SelectScrollUpButton />
            <SelectViewport :class="position === 'popper' && 'w-full'">
              <slot />
            </SelectViewport>
            <SelectScrollDownButton />
          </div>
          <!-- with scrollbar -->
          <div v-else class="w-full max-h-46 overflow-y-scroll webkit-small-scrollbar-self">
            <slot />
          </div>
        </PopperContentMotion>
      </SelectContent>
    </AnimatePresence>
  </SelectPortal>
</template>
