<script lang="ts">
import type { PrimitiveProps } from 'reka-ui';

export interface ReadMoreContentProps extends PrimitiveProps {
  class?: HTMLAttributes['class'];
  disableRuiClass?: boolean;
  collapsedHeight?: number;
  collapsedLine?: number;
}

export type ReadMoreContentEmits = {
  contentFound: [void];
};
</script>

<script setup lang="ts">
import { HTMLAttributes, ref, watchEffect } from 'vue';
import {
  Primitive,
  injectCollapsibleRootContext,
  useForwardExpose,
  useForwardPropsEmits,
  useId,
} from 'reka-ui';
import { useEventListener, useResizeObserver } from '@vueuse/core';
import { cn } from '@/core/lib/utils';
import { injectReadMoreContext } from './ReadMore.vue';
import { readMoreContentVariant } from '.';

const {
  class: propsClass,
  collapsedLine = 3,
  collapsedHeight = 80,
  disableRuiClass,
  ...props
} = defineProps<ReadMoreContentProps >();
const { showTrigger } = injectReadMoreContext({ showTrigger: ref(false) });
const { forwardRef, currentElement } = useForwardExpose();
const emits = defineEmits<ReadMoreContentEmits>();

const rootContext = injectCollapsibleRootContext();
rootContext.contentId ||= useId(undefined, 'reka-readmore-content');

const measureRef = ref<HTMLElement>();
const measureHeight = ref(0);
const measureLineHeight = ref(0);
useResizeObserver(measureRef, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  if (measureRef.value) {
    const computedStyle = window.getComputedStyle(measureRef.value.children[0] ?? measureRef.value);
    measureLineHeight.value = parseFloat(computedStyle.lineHeight);
  }
  if (currentElement.value && showTrigger) {
    setTimeout(() => {
      const viewHeight = currentElement.value.getBoundingClientRect().height;
      showTrigger.value = height - viewHeight > 5;
    }, 300); // 动画时间
  }
  measureHeight.value = Math.ceil(height);
});

const maxHeight = ref(0);
watchEffect(
  () => {
    const isOpen = rootContext.open.value;
    maxHeight.value = isOpen
      ? measureHeight.value
      : collapsedLine
      ? Math.ceil(measureLineHeight.value * collapsedLine)
      : collapsedHeight;
  },
  {
    flush: 'post',
  }
);

useEventListener(currentElement, 'beforematch', () => {
  requestAnimationFrame(() => {
    rootContext.onOpenToggle();
    emits('contentFound');
  });
});

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <Primitive
    v-bind="forwarded"
    :ref="forwardRef"
    :class="cn(readMoreContentVariant({ disableRuiClass }), propsClass)"
    :id="rootContext.contentId"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    :data-disabled="rootContext.disabled?.value ? '' : undefined"
    :style="{
      [`--reka-readmore-max-height`]: `${maxHeight}px`,
      [`--reka-readmore-collapsed-line`]: collapsedLine ? collapsedLine : 'none',
    }"
  >
    <div class="w-fit h-fit" ref="measureRef">
      <slot />
    </div>
  </Primitive>
</template>
