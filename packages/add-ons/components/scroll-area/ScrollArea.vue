<script lang="ts">
interface PerfectScrollBarOptions {
  handlers?: string[];
  maxScrollbarLength?: number;
  minScrollbarLength?: number;
  scrollingThreshold?: number;
  scrollXMarginOffset?: number;
  scrollYMarginOffset?: number;
  suppressScrollX?: boolean;
  suppressScrollY?: boolean;
  swipeEasing?: boolean;
  useBothWheelAxes?: boolean;
  wheelPropagation?: boolean;
  wheelSpeed?: number;
}
</script>

<script setup lang="ts">
import { ref, useId, watchEffect } from 'vue';
import PerfectScrollbar from 'perfect-scrollbar';
import { cn } from '@/core/lib/utils';
import { scrollAreaVariants } from '.';
import { defaults } from 'lodash-es';

const {
  class: propsClass,
  size,
  unstyled,
  ...props
} = defineProps<
  PerfectScrollBarOptions & {
    class?: string;
    size?: 'base' | 'sm' | 'xs';
    unstyled?: false;
  }
>();

const scrollEvents = [
  'ps-scroll-y',
  'ps-scroll-x',
  'ps-scroll-up',
  'ps-scroll-down',
  'ps-scroll-left',
  'ps-scroll-right',
  'ps-reach-y-start',
  'ps-reach-y-end',
  'ps-reach-x-start',
  'ps-reach-x-end',
];
const emits = defineEmits<{
  'ps-scroll-y': [ps: PerfectScrollbar];
  'ps-scroll-x': [ps: PerfectScrollbar];
  'ps-scroll-up': [ps: PerfectScrollbar];
  'ps-scroll-down': [ps: PerfectScrollbar];
  'ps-scroll-left': [ps: PerfectScrollbar];
  'ps-scroll-right': [ps: PerfectScrollbar];
  'ps-reach-y-start': [ps: PerfectScrollbar];
  'ps-reach-y-end': [ps: PerfectScrollbar];
  'ps-reach-x-start': [ps: PerfectScrollbar];
  'ps-reach-x-end': [ps: PerfectScrollbar];
}>();

const id = useId();
const containerRef = ref<HTMLElement>();
watchEffect((cleanup) => {
  let ps: PerfectScrollbar | null = null;
  const events = scrollEvents.map((name) => {
    return [name, () => emits(name as any, ps as any)];
  });
  if (containerRef.value) {
    ps = new PerfectScrollbar(
      containerRef.value,
      defaults({}, props, {
        handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
        wheelSpeed: 1,
        scrollXMarginOffset: 0,
        scrollYMarginOffset: 0,
        scrollingThreshold: 1000,
        swipeEasing: true
      })
    );
    events.forEach(([name, handler]) => {
      containerRef.value?.addEventListener(name as any, handler as any);
    });
  }
  cleanup(() => {
    events.forEach(([name, handler]) => {
      containerRef.value?.removeEventListener(name as any, handler as any);
    });
    ps?.destroy();
  });
});
</script>

<template>
  <div
    :class="cn(scrollAreaVariants({ size, unstyled }), propsClass)"
    :id="`rui-scroll-area-${id}`"
    ref="containerRef"
    :data-size="size"
  >
    <slot />
  </div>
</template>
