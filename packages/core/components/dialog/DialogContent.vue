<script lang="ts">
export interface DialogContentPropsImp extends DialogContentProps {
  class?: HTMLAttributes['class'];
  showClose?: boolean;
  autoFocus?: boolean;
  overlay?: DialogOverlayProps & { class?: HTMLAttributes['class'] };
  portal?: DialogPortalProps;
  unstyled?: boolean;
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
import { cn } from '@/core/lib/utils';
import { X } from 'lucide-vue-next';
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardExpose,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed, ref, useSlots, watch } from 'vue';
import {
  dialogContentVariants,
  dialogOverlayVariants,
  dialogCloseVariants,
  DialogCloseFrom,
  DialogClose,
} from '.';
import { DialogTitle, DialogDescription } from 'reka-ui';
import { injectDialogContext } from './DialogRootProviderEx';

const { open, closeFrom } = injectDialogContext();
const {
  class: propsClass,
  showClose = true,
  autoFocus = false,
  overlay = {},
  portal = {},
  unstyled,
  ...props
} = defineProps<DialogContentPropsImp>();

const emits = defineEmits<
  DialogContentEmits & {
    open: [];
    opened: [];
    close: [{ from: DialogCloseFrom | undefined }];
    closed: [{ from: DialogCloseFrom | undefined }];
  }
>();

const { forwardRef } = useForwardExpose();
const originContentRef = ref<{ $el?: HTMLDivElement } | null>(null);

const slots = useSlots();
const hasDialogHeader = () => {
  if (!slots.default) return false;
  const defaultSlot = slots.default();
  const checkVNode = (vnode: any): boolean => {
    if ((vnode.type as any)?.__name === 'DialogHeader') return true;
    if (vnode.children) {
      return vnode.children?.some?.((child: any) => checkVNode(child));
    }
    return false;
  };
  return defaultSlot?.some?.((vnode) => checkVNode(vnode));
};
const showContentClose = computed(() => {
  return showClose && !hasDialogHeader();
});

const onPointerDownOutside = (e: any) => {
  emits('pointerDownOutside', e);
  closeFrom.value = DialogCloseFrom.Overlay;
};

watch(open, (value, _, onCleanup) => {
  value ? emits('open') : emits('close', { from: closeFrom.value });
  const _onAnimationEnd = () => {
    value ? emits('opened') : emits('closed', { from: closeFrom.value });
  };
  originContentRef.value?.$el?.addEventListener('animationend', _onAnimationEnd);
  onCleanup(() => {
    originContentRef.value?.$el?.removeEventListener('animationend', _onAnimationEnd);
  });
});

const overlayClassNames = computed(() => {
  return cn(dialogOverlayVariants({ unstyled }), overlay.class);
});
const classNames = computed(() => {
  return cn(dialogContentVariants({ variant: 'default', unstyled }), propsClass);
});
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DialogPortal v-bind="portal">
    <DialogOverlay :class="overlayClassNames" data-variant="default" />
    <DialogContent
      v-bind="forwarded"
      data-variant="default"
      :ref="
        (ref) => {
          forwardRef(ref);
          originContentRef = ref as any;
        }
      "
      :class="classNames"
      @open-auto-focus="
        (event) => {
          emits('openAutoFocus', event);
          !autoFocus && event.preventDefault();
        }
      "
      @close-auto-focus="
        (event) => {
          emits('closeAutoFocus', event);
          !autoFocus && event.preventDefault();
        }
      "
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
          :class="dialogCloseVariants({ position: 'abs', unstyled })"
          :close-from="DialogCloseFrom.CloseButton"
        >
          <X class="size-4 text-xs disabled:pointer-events-none" />
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
