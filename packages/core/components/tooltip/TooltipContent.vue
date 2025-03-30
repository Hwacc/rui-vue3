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
  disableRuiClass,
  ...props
} = defineProps<
  TooltipContentProps & {
    class?: HTMLAttributes['class'];
    theme?: TooltipContentVariants['theme'];
    disableRuiClass?: boolean;
  }
>();
const emits = defineEmits<TooltipContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const classNames = computed(() => {
  return cn(tooltipContentVariants({ theme, disableRuiClass }), propsClass);
});
</script>

<template>
  <TooltipPortal>
    <TooltipContent v-bind="{ ...forwarded, ...$attrs }" :class="classNames" :data-theme="theme">
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
