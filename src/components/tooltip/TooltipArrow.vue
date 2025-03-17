<script lang="ts" setup>
import { TooltipArrow, type TooltipArrowProps } from 'reka-ui';
import { computed, HTMLAttributes, ref, watch } from 'vue';
import { toolTipArrowVariants, ToolTipArrowVariants } from '.';
import { cn } from '@/lib/utils';

const {
  force = false,
  theme = 'default',
  type = 'css',
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
    '--rui-tooltip-arrow-width': `${props.width}px`,
    '--rui-tooltip-arrow-height': `${props.height}px`,
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
  >
    <span v-if="type === 'css'"></span>
  </TooltipArrow>
</template>
