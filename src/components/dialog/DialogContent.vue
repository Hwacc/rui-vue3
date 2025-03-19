<script lang="ts">
export interface DialogContentPropsImp extends DialogContentProps {
  class?: HTMLAttributes['class'];
  showClose?: boolean;
  closeClass?: HTMLAttributes['class'];
  overlay?: DialogOverlayProps & { class?: HTMLAttributes['class'] };
  portal?: DialogPortalProps;
}
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
import { DialogContent, DialogOverlay, DialogPortal, useForwardPropsEmits } from 'reka-ui';
import { computed, useSlots, watch } from 'vue';
import {
  dialogContentVariants,
  dialogOverlayVariants,
  dialogContentCloseDefaultClass,
  dialogCloseDefaultClass,
  DialogCloseFrom,
  DialogClose,
} from '.';
import { DialogTitle, DialogDescription } from 'reka-ui';
import { injectDialogContext } from './DialogRootProviderEx';

const { open, closeFrom } = injectDialogContext();
const {
  class: propsClass,
  closeClass,
  showClose = true,
  overlay = {},
  portal = {},
  ...props
} = defineProps<DialogContentPropsImp>();

const emits = defineEmits<
  DialogContentEmits & {
    close: [{ from: DialogCloseFrom | undefined }];
  }
>();

const slots = useSlots();
const hasDialogHeader = () => {
  if (!slots.default) return false;
  const defaultSlot = slots.default();
  return defaultSlot.some((vnode) => {
    return (vnode.type as any).__name === 'DialogHeader';
  });
};
const showContentClose = computed(() => {
  return showClose && !hasDialogHeader();
});

const onPointerDownOutside = (e: any) => {
  emits('pointerDownOutside', e);
  closeFrom.value = DialogCloseFrom.Overlay;
};
watch(open, (value) => {
  if (!value) {
    emits('close', { from: closeFrom.value });
    closeFrom.value = undefined;
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
      @close-auto-focus="(event) => {
        emits('closeAutoFocus', event);
        event.preventDefault()
      }"
      @pointer-down-outside="onPointerDownOutside"
      @escape-key-down="
        (event) => {
          closeFrom = DialogCloseFrom.EscapeKey;
          emits('escapeKeyDown', event);
        }
      "
    >
      <slot />
      <slot v-if="showContentClose" name="close">
        <DialogClose
          :class="dialogContentCloseDefaultClass"
          :close-from="DialogCloseFrom.CloseButton"
        >
          <X :class="cn(dialogCloseDefaultClass, closeClass)" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </slot>
      <!-- for remove warning -->
      <template v-if="!hasDialogHeader()">
        <DialogTitle class="!hidden select-none"></DialogTitle>
        <DialogDescription class="!hidden select-none"></DialogDescription>
      </template>
      <!-- ---end--- -->
    </DialogContent>
  </DialogPortal>
</template>
