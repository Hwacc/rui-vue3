<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'reka-ui';
import { type HTMLAttributes } from 'vue';
import ScrollBar from './ScrollBar.vue';
import { scrollAreaVariants } from '.';

const {
  class: propsClass,
  disableRuiClass,
  viewport = 200,
  safeport = 9999,
  ...props
} = defineProps<
  ScrollAreaRootProps & {
    class?: HTMLAttributes['class'];
    viewport?: number;
    safeport?: number;
    disableRuiClass?: boolean;
  }
>();

const emits = defineEmits<{
  scroll: [event: Event];
  scrollEnd: [event: Event];
}>();
</script>

<template>
  <div
    :class="[propsClass, 'overflow-y-hidden overflow-x-visible']"
    :style="{
      width: `${viewport}px`,
      '--rui-viewport-width': `${viewport}px`,
      '--rui-safeport-width': `${safeport}px`,
    }"
  >
    <ScrollAreaRoot v-bind="props" :class="['h-full', 'pr-[100%]']">
      <ScrollAreaViewport
        class="h-full w-(--rui-viewport-width) rounded-[inherit]"
        :disable-rui-class="disableRuiClass"
        @scroll="emits('scroll', $event)"
        @scroll-end="emits('scrollEnd', $event)"
      >
        <slot />
      </ScrollAreaViewport>
      <ScrollBar :class="`!right-[cacl(100% - 10px)]`" orientation="vertical" :disable-rui-class="disableRuiClass" />
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  </div>
</template>
