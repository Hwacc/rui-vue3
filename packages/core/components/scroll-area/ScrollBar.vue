<script setup lang="ts">
import { cn } from '@rui/core/lib/utils';
import {
  ScrollAreaScrollbar,
  type ScrollAreaScrollbarProps,
  ScrollAreaThumb,
  injectScrollAreaRootContext,
} from 'reka-ui';
import { ref, watchEffect, type HTMLAttributes } from 'vue';
import { scrollBarVariants, ScrollBarVariants, scrollThumbVariants } from '.';

const {
  class: propsClass,
  thumbClass,
  size = 'base',
  theme,
  orientation = 'vertical',
  unstyled,
  ...props
} = defineProps<
  ScrollAreaScrollbarProps & {
    class?: HTMLAttributes['class'];
    size?: ScrollBarVariants['size'];
    theme?: string;
    thumbClass?: HTMLAttributes['class'];
    unstyled?: boolean;
  }
>();

const { viewport } = injectScrollAreaRootContext();
const scrollState = ref<'scrolling' | 'static'>('static');

watchEffect((onCleanup) => {
  const onScroll = () => {
    scrollState.value = 'scrolling';
  };
  const onScrollEnd = () => {
    scrollState.value = 'static';
  };
  viewport.value?.addEventListener('scroll', onScroll);
  viewport.value?.addEventListener('scrollend', onScrollEnd);
  onCleanup(() => {
    viewport.value?.removeEventListener('scroll', onScroll);
    viewport.value?.removeEventListener('scrollend', onScrollEnd);
  });
});
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="props"
    :orientation="orientation"
    :class="cn(scrollBarVariants({ orientation, unstyled }), propsClass)"
    :data-size="size"
    :data-scroll-state="scrollState"
    :data-theme="theme"
  >
    <ScrollAreaThumb
      :class="cn(scrollThumbVariants(), thumbClass)"
      :data-size="size"
      :data-scroll-state="scrollState"
      :data-theme="theme"
    />
  </ScrollAreaScrollbar>
</template>
