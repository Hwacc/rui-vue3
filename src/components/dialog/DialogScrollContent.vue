<script setup lang="ts">
import type { DialogContentEmits } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { X } from 'lucide-vue-next';
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogDescription,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed, useSlots, watch } from 'vue';
import {
  DialogCloseFrom,
  DialogClose,
  dialogOverlayVariants,
  DialogScrollContentVariants,
  dialogContentCloseDefaultClass,
  dialogCloseDefaultClass,
} from '.';
import { DialogContentPropsImp } from './DialogContent.vue';
import { injectDialogContext } from './DialogRootProviderEx';

const { open, closeFrom } = injectDialogContext();
const {
  class: propsClass,
  closeClass,
  showClose = true,
  autoFocus = false,
  overlay = {},
  portal = {},
  ...props
} = defineProps<DialogContentPropsImp & { class?: HTMLAttributes['class'] }>();

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
    if ((vnode.type as any).__name === 'DialogHeader') return true;
    return false;
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

const classNames = computed(() => {
  return cn(DialogScrollContentVariants(), propsClass);
});
const overlayClassNames = computed(() => {
  return cn(dialogOverlayVariants(), 'overflow-y-auto webkit-scrollbar-self', overlay.class);
});
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DialogPortal v-bind="portal">
    <DialogOverlay :class="overlayClassNames">
      <DialogContent
        :class="classNames"
        v-bind="forwarded"
        @open-auto-focus="
          (event) => {
            emits('openAutoFocus', event);
            !autoFocus && event.preventDefault();
          }
        "
        @close-auto-focus="
          (event) => {
            emits('closeAutoFocus', event);
            event.preventDefault();
          }
        "
        @pointer-down-outside="(event) => {
          onPointerDownOutside(event);
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
            event.preventDefault();
          }
        }"
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
    </DialogOverlay>
  </DialogPortal>
</template>
