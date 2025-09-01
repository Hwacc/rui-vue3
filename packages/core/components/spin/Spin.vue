<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue';
import type { SpinVariants } from '.';
import { Primitive } from 'reka-ui';
import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { tvSpin } from '.';

const {
  show,
  mode,
  size = 'base',
  unstyled,
  delay,
  ui,
  class: propsClass,
} = defineProps<{
  class?: HTMLAttributes['class'];
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

const curInstance = getCurrentInstance();
let parentPosition = document?.body?.style?.position ?? '';
function updateParentStyle() {
  if (isFullscreen.value) {
    document.body.style.position = isVisible.value ? 'relative' : parentPosition;
  } else {
    const parent = curInstance?.proxy?.$el?.parentElement;
    if (parent) {
      parent.style.position = isVisible.value ? 'relative' : parentPosition;
    }
  }
}
watch(isVisible, () => updateParentStyle());

onMounted(() => {
  if (isFullscreen.value) {
    parentPosition = document.body.style.position;
  } else {
    const parent = curInstance?.proxy?.$el?.parentElement;
    if (parent) {
      parentPosition = parent.style.position;
    }
  }
  updateParentStyle();
});

onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  if (isFullscreen.value) {
    document.body.style.position = '';
  }
});

const { root, mask, indicator, text } = tvSpin();
</script>

<template>
  <div
    v-show="isVisible"
    :class="root({ unstyled, size, mode, class: [ui?.base?.class, propsClass] })"
  >
    <div :class="mask({ unstyled, size, mode, class: ui?.mask?.class })" />
    <div :class="indicator({ unstyled, size, mode, class: ui?.indicator?.class })">
      <slot v-bind="{ mode, size, unstyled }">
        <component :is="renderIcon?.({ mode, size, unstyled })" />
      </slot>
      <Primitive
        :class="text({ unstyled, size, mode, class: ui?.text?.class })"
        :as-child="true"
      >
        <slot name="text" />
      </Primitive>
    </div>
  </div>
</template>
