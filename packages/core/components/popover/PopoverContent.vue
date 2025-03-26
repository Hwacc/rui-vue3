<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
  injectPopoverRootContext,
  PopoverContent,
  type PopoverContentEmits,
  type PopoverContentProps,
  PopoverPortal,
  useForwardExpose,
  useForwardPropsEmits,
} from 'reka-ui';
import { ref, watchEffect, type HTMLAttributes } from 'vue';
import { popoverContentClass } from '.';
import { AnimatePresence } from 'motion-v';
import { PopoverContentMotion } from '../motion/PopoverContentMotion';

//@ts-ignore
import { u as useGraceArea } from '../../node_modules/reka-ui/dist/shared/useGraceArea.js';
import { injectPopoverRootContextEx } from './PopoverProviderEx.jsx';

defineOptions({
  inheritAttrs: false,
});

const {
  class: propsClass,
  side = 'bottom',
  align = 'center',
  sideOffset = 4,
  ...props
} = defineProps<PopoverContentProps & { class?: HTMLAttributes['class'] }>();

const { triggerElement } = injectPopoverRootContext();
const rootContextEx = injectPopoverRootContextEx();

const contentRef = ref<any>(null);
const { isPointerInTransit, onPointerExit } = useGraceArea(triggerElement, contentRef);

rootContextEx.isPointerInTransitRef = isPointerInTransit;
onPointerExit(() => {
  if (rootContextEx.triggerType.value === 'hover' && !rootContextEx.disableHoverableContent.value) {
    rootContextEx.onClose();
  }
});

const { forwardRef, currentElement } = useForwardExpose();
watchEffect((onCleanup) => {
  const triggerType = rootContextEx.triggerType.value;
  const triggerMode = rootContextEx.triggerMode.value;
  if ((triggerType === 'click' || triggerType === 'manual') && currentElement.value) {
    if (rootContextEx.disableHoverableContent.value) {
      if (triggerMode === 'mouse-only') {
        currentElement.value.addEventListener('mouseenter', rootContextEx.onClose);
      } else if (triggerMode === 'touch-simulate') {
        currentElement.value.addEventListener('pointerenter', rootContextEx.onClose);
      }
      onCleanup(() => {
        if (triggerMode === 'mouse-only') {
          currentElement.value?.removeEventListener('mouseenter', rootContextEx.onClose);
        } else if (triggerMode === 'touch-simulate') {
          currentElement.value?.removeEventListener('pointerenter', rootContextEx.onClose);
        }
      });
    }
  }
});

const emits = defineEmits<PopoverContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PopoverPortal>
    <AnimatePresence>
      <PopoverContent v-bind="{ ...forwarded, side, align, sideOffset, ...$attrs }">
        <PopoverContentMotion
          :class="cn(popoverContentClass, propsClass)"
          :side="side"
          :ref="(r: any) => {
            contentRef = r?.$el;
            forwardRef(r);
          }"
        >
          <slot />
        </PopoverContentMotion>
      </PopoverContent>
    </AnimatePresence>
  </PopoverPortal>
</template>
