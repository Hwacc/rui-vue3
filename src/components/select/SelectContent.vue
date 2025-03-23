<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import {
  Primitive,
  SelectContent,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed } from 'vue';
import { selectContentVariants, SelectScrollDownButton, SelectScrollUpButton } from '.';

defineOptions({
  inheritAttrs: false,
});

const {
  class: propsClass,
  position = 'popper',
  scrollButton = false,
  side = 'bottom',
  align = 'start',
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
    <SelectContent v-bind="{ ...forwarded, position, side, align, ...$attrs }" :class="classNames">
      <template v-if="scrollButton">
        <SelectScrollUpButton v-if="scrollButton" />
        <SelectViewport :class="position === 'popper' && 'w-full'">
          <slot />
        </SelectViewport>
        <SelectScrollDownButton v-if="scrollButton" />
      </template>
      <template v-else>
        <!-- with scrollbar -->
        <Primitive class="overflow-y-auto webkit-small-scrollbar-self">
          <slot />
        </Primitive>
      </template>
    </SelectContent>
  </SelectPortal>
</template>
