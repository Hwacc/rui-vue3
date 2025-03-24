<script lang="ts" setup>
import { TooltipArrow, type TooltipArrowProps } from 'reka-ui';
import { computed, HTMLAttributes, ref, watch } from 'vue';
import { toolTipArrowVariants, ToolTipArrowVariants } from '.';
import { cn, rem2px } from '@/lib/utils';

const {
  force = false,
  theme = 'default',
  type = 'css',
  width = rem2px(0.4375),
  height = rem2px(0.1875),
  class: propsClass,
  ...props
} = defineProps<
  TooltipArrowProps & {
    class?: HTMLAttributes['class'];
    force?: boolean;
    theme?: ToolTipArrowVariants['theme'];
    type?: ToolTipArrowVariants['type'];
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
  };
});

const classNames = computed(() =>
  cn(
    toolTipArrowVariants({
      theme,
      type,
    }),
    propsClass
  )
);
</script>

<template>
  <TooltipArrow
    ref="arrowRef"
    v-bind="props"
    :as="type === 'css' ? 'span' : 'svg'"
    :class="classNames"
    :style="style"
    :width="width"
    :height="height"
  >
    <span v-if="type === 'css'"></span>
  </TooltipArrow>
</template>
