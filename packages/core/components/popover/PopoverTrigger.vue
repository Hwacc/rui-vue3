<script lang="ts">
export interface PopoverTriggerProps extends PrimitiveProps {
  mode?: 'mouse-only' | 'touch-simulate';
  trigger?: 'click' | 'hover' | 'manual';
}
</script>

<script setup lang="ts">
import {
  Primitive,
  PopoverAnchor,
  PrimitiveProps,
  useForwardExpose,
  useId,
  injectPopoverRootContext,
} from 'reka-ui';
import { injectPopoverRootContextEx } from './PopoverProviderEx';
import { computed, onMounted, ref } from 'vue';

const {
  as = 'button',
  asChild = false,
  trigger = 'click',
  mode = 'mouse-only',
} = defineProps<PopoverTriggerProps>();

const rootContex = injectPopoverRootContext();
const {
  disabled,
  open,
  isPointerInTransitRef,
  disableClosingTrigger,
  onOpenToggle,
  onTriggerLeave,
  onTriggerEnter,
} = injectPopoverRootContextEx();

const isPointerDown = ref(false);
const hasPointerMoveOpened = ref(false);

const handlePointerDown = () => {
  isPointerDown.value = true;
  document.addEventListener(
    'pointerup',
    () => {
      setTimeout(() => {
        // 模拟点击
        isPointerDown.value = false;
        if (open.value && disableClosingTrigger.value) return;
        onOpenToggle();
      });
    },
    { once: true }
  );
};

// 模拟mouseenter, mouseleave
const handlePointerMove = (event: PointerEvent) => {
  if (event.pointerType === 'touch') return;
  if (!hasPointerMoveOpened.value && !isPointerInTransitRef.value) {
    onTriggerEnter();
    hasPointerMoveOpened.value = true;
  }
};
const handlePointerLeave = () => {
  onTriggerLeave();
  hasPointerMoveOpened.value = false;
};

const triggerListeners = computed(() => {
  if (disabled.value || trigger === 'manual') return {};
  if (trigger === 'hover') {
    if (mode === 'mouse-only') {
      return {
        mouseenter: () => {
          if (!isPointerInTransitRef.value) {
            onTriggerEnter();
          }
        },
        mouseleave: onTriggerLeave,
      };
    } else if (mode === 'touch-simulate') {
      return {
        pointerenter: handlePointerMove,
        pointerleave: handlePointerLeave,
      };
    }
  }
  if (trigger === 'click') {
    if (mode === 'mouse-only') {
      return {
        click: () => {
          if (open.value && disableClosingTrigger.value) return;
          onOpenToggle();
        },
      };
    } else if (mode === 'touch-simulate') {
      return {
        pointerdown: handlePointerDown,
        click: (event: any) => {
          if (!isPointerDown.value && (event.target as HTMLElement).matches?.(':focus-visible')) {
            onOpenToggle();
          }
        },
      };
    }
  }
});

rootContex.triggerId ||= useId(undefined, 'reka-popover-trigger');
onMounted(() => {
  rootContex.triggerElement.value = triggerElement.value;
});
const { forwardRef, currentElement: triggerElement } = useForwardExpose();
</script>

<template>
  <PopoverAnchor as-child>
    <Primitive
      :id="rootContex.triggerId"
      :ref="forwardRef"
      :type="as === 'button' ? 'button' : undefined"
      aria-haspopup="dialog"
      :aria-expanded="open"
      :aria-controls="rootContex.contentId"
      :data-state="open ? 'open' : 'closed'"
      :as="as"
      :as-child="asChild"
      v-on="triggerListeners"
    >
      <slot v-bind="{ disabled: disabled }" />
    </Primitive>
  </PopoverAnchor>
</template>
