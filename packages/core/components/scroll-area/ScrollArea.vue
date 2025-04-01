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
  ...props
} = defineProps<
  ScrollAreaRootProps & {
    class?: HTMLAttributes['class'];
    disableRuiClass?: boolean;
  }
>();

const emits = defineEmits<{
  scroll: [event: Event];
  scrollEnd: [event: Event];
}>();
</script>

<template>
  <ScrollAreaRoot
    v-bind="props"
    :class="cn(scrollAreaVariants({ disableRuiClass }), propsClass)"
  >
    <ScrollAreaViewport
      class="h-full w-full rounded-[inherit]"
      :disable-rui-class="disableRuiClass"
      @scroll="emits('scroll', $event)"
      @scroll-end="emits('scrollEnd', $event)"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar orientation="vertical" :disable-rui-class="disableRuiClass" />
    <ScrollBar orientation="horizontal" :disable-rui-class="disableRuiClass" />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
