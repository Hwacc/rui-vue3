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
import { nextTick, ref, unref, watch, watchEffect, type HTMLAttributes } from 'vue';
import { popoverClass } from '.';
import { AnimatePresence } from 'motion-v';
import { PopoverContentMotion } from '../motion/PopoverContentMotion';

//@ts-ignore
import { u as useGraceArea } from '../../node_modules/reka-ui/dist/shared/useGraceArea.js';

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

const contentRef = ref<any>(null);

watch(contentRef, (r) => {
  nextTick(() => {
    console.log('content ref', r);
  });
});
const { triggerElement, open } = injectPopoverRootContext();
const { forwardRef, currentElement } = useForwardExpose();
const { isPointerInTransit, onPointerExit } = useGraceArea(triggerElement, contentRef);
;

watch(isPointerInTransit, (v) => {
  console.log('isPointerInTransit', v)
})
watchEffect(() => {
  console.log('isOpen', open.value);
  nextTick(() => {
    console.log('currentElement', currentElement.value);
    console.log('contentRef', contentRef.value);
  });
});

const emits = defineEmits<PopoverContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PopoverPortal>
    <AnimatePresence>
      <PopoverContent v-bind="{ ...forwarded, side, align, sideOffset, ...$attrs }">
        <PopoverContentMotion
          :class="cn(popoverClass, propsClass)"
          :side="side"
          :ref="
          (r: any) => {
            console.log('content ref inner --->', r);
            contentRef = r?.$el;
            forwardRef(r);
          }
        "
        >
          <slot />
        </PopoverContentMotion>
      </PopoverContent>
    </AnimatePresence>
  </PopoverPortal>
</template>
