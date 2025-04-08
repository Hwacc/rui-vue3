<script setup lang="ts">
import { cn } from '@/core/lib/utils';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'reka-ui';
import { getCurrentInstance, ref, watch, type HTMLAttributes } from 'vue';
import { scrollAreaVariants } from '.';

const {
  class: propsClass,
  theme,
  unstyled,
  ...props
} = defineProps<
  ScrollAreaRootProps & {
    class?: HTMLAttributes['class'];
    theme?: string;
    unstyled?: boolean;
  }
>();

const emits = defineEmits<{
  scroll: [event: Event];
  scrollEnd: [event: Event];
}>();

// expose root
const instance = getCurrentInstance();
const rootRef = ref<any>();
watch(rootRef, () => {
  if (!instance) return;
  instance.exposed = { ...rootRef.value };
  instance.exposeProxy = rootRef.value;
});
</script>

<template>
  <ScrollAreaRoot
    v-bind="props"
    :class="cn(scrollAreaVariants({ unstyled }), propsClass)"
    ref="rootRef"
  >
    <ScrollAreaViewport
      class="h-full w-full rounded-[inherit]"
      @scroll="emits('scroll', $event)"
      @scroll-end="emits('scrollEnd', $event)"
    >
      <slot />
    </ScrollAreaViewport>
    <!-- <ScrollBar :theme="theme" orientation="vertical" :disable-rui-class="unstyled" /> -->
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
