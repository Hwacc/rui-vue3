<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue';
import type { SpinVariants } from '.';
import { Primitive } from 'reka-ui';
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { tvSpin } from '.';

const {
  show,
  mode,
  size = 'base',
  unstyled,
  delay,
  ui,
} = defineProps<{
  show?: boolean;
  mode?: 'fullscreen';
  size?: SpinVariants['size'];
  delay?: number;
  unstyled?: boolean;
  ui?: {
    base?: {
      class?: HTMLAttributes['class'];
    };
    mask?: {
      class?: HTMLAttributes['class'];
    };
    indicator?: {
      class?: HTMLAttributes['class'];
    };
    icon?: {
      class?: HTMLAttributes['class'];
    };
    text?: {
      class?: HTMLAttributes['class'];
    };
  };
}>();

const { renderIcon } =
  inject<{
    renderIcon: (props: {
      mode?: SpinVariants['mode'];
      size?: SpinVariants['size'];
      unstyled?: boolean;
    }) => VNode | null;
  }>('SpinProvider') ?? {};

const isFullscreen = computed(() => mode === 'fullscreen');
const isVisible = ref(show);
let timeoutId: number | null = null;
watch(
  () => show,
  (newVal) => {
    if (!newVal && delay) {
      timeoutId = window.setTimeout(() => {
        isVisible.value = false;
        timeoutId = null;
      }, delay);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      isVisible.value = newVal;
    }
  },
  { immediate: true }
);

const { base, mask, indicator, icon, text } = tvSpin({ unstyled, size, mode });

onMounted(() => {
  if (isFullscreen.value) {
    document.body.style.position = 'relative';
  }
});
onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  if (isFullscreen.value) {
    document.body.style.position = '';
  }
});
</script>

<template>
  <div
    v-show="isVisible"
    :class="base({ class: ui?.base?.class })"
  >
    <div :class="mask({ class: ui?.mask?.class })" />
    <div :class="indicator({ class: ui?.indicator?.class })">
      <slot v-bind="{ mode, size, unstyled }">
        <component :is="renderIcon?.({ mode, size, unstyled })" />
      </slot>
      <Primitive
        :class="text({ class: ui?.text?.class })"
        :as-child="true"
      >
        <slot name="text" />
      </Primitive>
    </div>
  </div>
</template>
