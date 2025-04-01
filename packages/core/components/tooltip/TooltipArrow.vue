<script lang="ts" setup>
import { TooltipArrow, type TooltipArrowProps } from 'reka-ui';
import { computed, HTMLAttributes, ref, watch } from 'vue';
import { toolTipArrowVariants, ToolTipArrowVariants } from '.';
import { cn } from '@/core/lib/utils';

const {
  force = false,
  theme = 'default',
  variant = 'css',
  width = 6,
  height = 6,
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<
  TooltipArrowProps & {
    class?: HTMLAttributes['class'];
    force?: boolean;
    theme?: ToolTipArrowVariants['theme'];
    variant?: ToolTipArrowVariants['variant'];
    disableRuiClass?: boolean;
  }
>();
const arrowRef = ref<{ $el: HTMLElement } | null>(null);

watch(arrowRef, () => {
  if (force && arrowRef.value?.$el) {
    setTimeout(() => {
      if (arrowRef.value?.$el) {
        arrowRef.value.$el.style.visibility = 'visible';
      }
    }, 100);
  }
});

const style = computed(() => {
  return {
    '--reka-tooltip-arrow-width': `${width}px`,
    '--reka-tooltip-arrow-height': `${height}px`,
    '--reka-tooltip-arrow-border-width': `${width / 2}px`,
    '--reka-tooltip-arrow-border-height': `${height / 2}px`,
  };
});

const classNames = computed(() =>
  cn(
    toolTipArrowVariants({
      theme,
      variant,
      disableRuiClass,
    }),
    propsClass
  )
);
</script>

<template>
  <TooltipArrow
    ref="arrowRef"
    v-bind="props"
    :as="variant === 'css' ? 'span' : 'svg'"
    :class="classNames"
    :style="style"
    :width="width"
    :height="height"
    :data-arrow-variant="variant"
    :data-theme="theme"
  >
    <span v-if="variant === 'css'"></span>
  </TooltipArrow>
</template>
