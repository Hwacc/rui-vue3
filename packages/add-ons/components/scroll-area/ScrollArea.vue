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
import { defaults } from 'lodash-es';
import PerfectScrollbar from 'perfect-scrollbar';
import { onMounted, onUnmounted, shallowRef, useId, useTemplateRef, watch } from 'vue';
import { tvScrollArea } from '.';
import { useResizeObserver } from '@vueuse/core';

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  PerfectScrollBarOptions & {
    class?: string;
    size?: 'base' | 'sm' | 'xs';
    unstyled?: boolean;
  }
>();

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
const id = useId();
const containerRef = useTemplateRef('container');

const ps = shallowRef<PerfectScrollbar | null>(null);
watch(
  () => props,
  () => {
    ps.value?.update();
  }
);
useResizeObserver(containerRef, () => {
  ps.value?.update();
});

onMounted(() => {
  ps.value = new PerfectScrollbar(
    containerRef.value!,
    defaults({}, props, {
      handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
      wheelSpeed: 1,
      scrollXMarginOffset: 0,
      scrollYMarginOffset: 0,
      scrollingThreshold: 1000,
      swipeEasing: true,
    })
  );
  scrollEvents.forEach((name) => {
    containerRef.value?.addEventListener(name as any, () => emits(name as any, ps.value as any));
  });
});

onUnmounted(() => {
  scrollEvents.forEach((name) => {
    containerRef.value?.removeEventListener(name as any, () => emits(name as any, ps.value as any));
  });
  ps.value?.destroy();
});
</script>

<template>
  <div
    :id="`rui-scroll-area-${id}`"
    ref="container"
    :class="tvScrollArea({ size, unstyled, class: propsClass })"
    :data-size="size"
  >
    <slot />
  </div>
</template>
