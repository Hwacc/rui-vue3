<script lang="ts">
export interface DialogContentPropsImp extends DialogContentProps {
  class?: HTMLAttributes['class'];
  showClose?: boolean;
  closeClass?: HTMLAttributes['class'];
  overlay?: DialogOverlayProps & { class?: HTMLAttributes['class'] };
  portal?: DialogPortalProps;
}

export const [injectDialogContentContext, provideDialogContentContext] =
  createContext('DialogContent');
</script>

<script setup lang="ts">
import type {
  DialogContentEmits,
  DialogContentProps,
  DialogOverlayProps,
  DialogPortalProps,
} from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { X } from 'lucide-vue-next';
import {
  createContext,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed, ref, useSlots, watch } from 'vue';
import { dialogContentVariants, dialogOverlayVariants, dialogCloseDefaultClass } from '.';
import { injectDialogRootContext } from 'reka-ui';

const { open } = injectDialogRootContext();

const {
  class: propsClass,
  closeClass,
  showClose = true,
  overlay = {},
  portal = {},
  ...props
} = defineProps<DialogContentPropsImp>();
const emits = defineEmits<DialogContentEmits>();

const slots = useSlots();
const showContentClose = computed(() => {
  const _hasDialogHeader = () => {
    if (!slots.default) return false;
    const defaultSlot = slots.default();
    return defaultSlot.some((vnode) => {
      if ((vnode.type as any).__name === 'DialogHeader') return true;
      return false;
    });
  };
  return showClose && !_hasDialogHeader();
});

const closeFrom = ref('');
const onPointerDownOutside = (e: any) => {
  emits('pointerDownOutside', e);
  closeFrom.value = 'outside';
};
watch(open, (value) => {
  if (!value) {
    console.log('close from:', closeFrom.value);
  }
});

const overlayClassNames = computed(() => {
  return cn(dialogOverlayVariants(), overlay.class);
});
const classNames = computed(() => {
  return cn(
    dialogContentVariants({
      position: 'center',
    }),
    propsClass
  );
});
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DialogPortal v-bind="portal">
    <DialogOverlay :class="overlayClassNames" />
    <DialogContent
      v-bind="forwarded"
      :class="classNames"
      @pointer-down-outside=""
      @interact-outside="onPointerDownOutside"
    >
      <slot />
      <slot v-if="showContentClose" name="close">
        <DialogClose>
          <X :class="cn(dialogCloseDefaultClass, closeClass)" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </slot>
    </DialogContent>
  </DialogPortal>
</template>
