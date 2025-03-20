<script lang="ts">
import type { ToastProviderProps } from 'reka-ui';
import { createContext, injectToastProviderContext } from 'reka-ui';
import { computed, defineComponent, reactive, Ref, useSlots, watch, watchEffect } from 'vue';
import { SwipeDirection, ToastPosition } from '.';

export interface ToastProviderPropsEx extends ToastProviderProps {
  position?: ToastPosition;
}
export interface ToastProviderContextEx {
  label: Ref<string>;
  duration: Ref<number>;
  swipeDirection: Ref<SwipeDirection>;
  swipeThreshold: Ref<number>;
  toastCount: Ref<number>;
  viewport: Ref<HTMLElement | undefined>;
  onViewportChange: (viewport: HTMLElement) => void;
  onToastAdd: () => void;
  onToastRemove: () => void;
  isFocusedToastEscapeKeyDownRef: Ref<boolean>;
  isClosePausedRef: Ref<boolean>;
  position: ToastPosition;
}

const [injectToastProviderContextEx, provideToastProviderContextEx] =
  createContext<ToastProviderContextEx>(['ToastProvider', 'ToastPostitionProvider']);

export { injectToastProviderContextEx };
export const ToastPostitionProvider = defineComponent({
  name: 'ToastPostitionProvider',
  props: {
    position: {
      type: String as () => ToastPosition,
      default: 'center',
    },
  },
  setup(props) {
    const slots = useSlots();
    const providerContext = injectToastProviderContext();
    console.log('position:', props.position);

    provideToastProviderContextEx({
      ...providerContext,
      position: props.position,
    });
    return () => slots.default?.();
  },
});
</script>

<script setup lang="ts">
import { ToastProvider } from 'reka-ui';

const {
  position = 'center',
  swipeDirection,
  swipeThreshold = 50,
  ...props
} = defineProps<ToastProviderPropsEx>();

const options = reactive({
  swipeDirection,
  swipeThreshold,
});

watchEffect(() => {
  if (position.includes('top')) {
    options.swipeDirection = 'up';
  } else if (position.includes('bottom')) {
    options.swipeDirection = 'down';
  } else if (position === 'center') {
    options.swipeThreshold = Infinity;
  }
});
</script>

<template>
  <ToastProvider
    :swipe-direction="options.swipeDirection"
    :swipe-threshold="options.swipeThreshold"
    v-bind="props"
  >
    <ToastPostitionProvider :position="position">
      <slot />
    </ToastPostitionProvider>
  </ToastProvider>
</template>
