<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ScrollAreaScrollbar, type ScrollAreaScrollbarProps, ScrollAreaThumb } from 'reka-ui';
import { type HTMLAttributes } from 'vue';
import { scrollBarVariants, ScrollThumbVariants, scrollThumbVariants } from '.';

const {
  class: propsClass,
  thumbClass,
  thumbSize = 'default',
  orientation = 'vertical',
  disableRuiClass,
  ...props
} = defineProps<
  ScrollAreaScrollbarProps & {
    class?: HTMLAttributes['class'];
    thumbClass?: HTMLAttributes['class'];
    thumbSize?: ScrollThumbVariants['size'];
    disableRuiClass?: boolean;
  }
>();
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="props"
    :orientation="orientation"
    :class="cn(scrollBarVariants({ orientation, disableRuiClass }), propsClass)"
  >
    <ScrollAreaThumb :class="cn(scrollThumbVariants({ size: thumbSize }), thumbClass)" />
  </ScrollAreaScrollbar>
</template>
