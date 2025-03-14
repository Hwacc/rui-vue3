<script lang="ts" setup>
import { TooltipArrow, type TooltipArrowProps } from 'radix-vue';
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

const className = computed(() =>
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
    :class="className"
  >
    <span v-if="type === 'css'"></span>
  </TooltipArrow>
</template>
