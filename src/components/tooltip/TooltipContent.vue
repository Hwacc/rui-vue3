<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
  TooltipContent,
  type TooltipContentEmits,
  type TooltipContentProps,
  TooltipPortal,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import { tooltipContentVariants, type TooltipContentVariants } from '.';

defineOptions({
  inheritAttrs: false,
});

const {
  class: propsClass,
  theme = 'default',
  ...props
} = defineProps<
  TooltipContentProps & { class?: HTMLAttributes['class']; theme?: TooltipContentVariants['theme'] }
>();
const emits = defineEmits<TooltipContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const contentClassName = computed(() => {
  return cn(
    [
      'z-50',
      'overflow-hidden',
      'animate-in',
      'fade-in-0',
      'zoom-in-95',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
    ],
    tooltipContentVariants({
      theme,
    }),
    propsClass
  );
});
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="contentClassName"
      :data-theme="theme"
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
