<script setup lang="ts">
import type { DialogContentEmits } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { DialogContentPropsImp } from './DialogContent.vue'
import { cn } from '@rui/core/lib/utils'
import { X } from 'lucide-vue-next'
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  useForwardExpose,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, ref, useSlots, watch } from 'vue'
import {
  DialogClose,
  DialogCloseFrom,
  dialogCloseVariants,
  dialogContentVariants,
  dialogOverlayVariants,
} from '.'
import { injectDialogContext } from './DialogRootProviderEx'

const {
  class: propsClass,
  showClose = true,
  openAutoFocus = true,
  closeAutoFocus = true,
  overlay = {},
  portal = {},
  unstyled,
  ...props
} = defineProps<DialogContentPropsImp & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<
  DialogContentEmits & {
    open: []
    opened: []
    close: [{ from: DialogCloseFrom | undefined }]
    closed: [{ from: DialogCloseFrom | undefined }]
  }
>()
const { open, closeFrom } = injectDialogContext()
const { forwardRef } = useForwardExpose()
const originContentRef = ref<{ $el?: HTMLDivElement } | null>(null)

const slots = useSlots()
function hasDialogHeader() {
  if (!slots.default)
    return false
  const defaultSlot = slots.default()
  const checkVNode = (vnode: any): boolean => {
    if ((vnode.type as any)?.__name === 'DialogHeader')
      return true
    if (vnode.children) {
      return vnode.children?.some?.((child: any) => checkVNode(child))
    }
    return false
  }
  return defaultSlot?.some?.(vnode => checkVNode(vnode))
}
const showContentClose = computed(() => {
  return showClose && !hasDialogHeader()
})

function onPointerDownOutside(e: any) {
  emits('pointerDownOutside', e)
  closeFrom.value = DialogCloseFrom.Overlay
}
watch(open, (value) => {
  if (value) {
    originContentRef.value?.$el?.addEventListener('animationend', () => {
      emits('opened')
    })
    emits('open')
  }
  else {
    originContentRef.value?.$el?.addEventListener('animationend', () => {
      emits('closed', { from: closeFrom.value })
    })
    emits('close', { from: closeFrom.value })
  }
})

const classNames = computed(() => {
  return cn(dialogContentVariants({ variant: 'scroll', unstyled }), propsClass)
})
const overlayClassNames = computed(() => {
  return cn(
    dialogOverlayVariants({
      unstyled,
    }),
    'overflow-y-auto',
    overlay.class,
  )
})
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DialogPortal v-bind="portal">
    <DialogOverlay :class="overlayClassNames" data-variant="scroll">
      <DialogContent
        v-bind="forwarded"
        :ref="
          (ref) => {
            forwardRef(ref);
            originContentRef = ref as any;
          }
        "
        :class="classNames"
        data-variant="scroll"
        @open-auto-focus="
          (event) => {
            emits('openAutoFocus', event)
            !openAutoFocus && event.preventDefault()
          }
        "
        @close-auto-focus="
          (event) => {
            emits('closeAutoFocus', event)
            !closeAutoFocus && event.preventDefault()
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
            closeFrom = DialogCloseFrom.EscapeKey
            emits('escapeKeyDown', event)
          }
        "
      >
        <slot />
        <slot v-if="showContentClose" name="close">
          <div class="absolute pr-2 pt-2 right-0 top-0">
            <DialogClose
              as="button"
              :class="dialogCloseVariants({ unstyled })"
              :close-from="DialogCloseFrom.CloseButton"
            >
              <X class="size-4 text-xs disabled:pointer-events-none" />
              <span class="sr-only">Close</span>
            </DialogClose>
          </div>
        </slot>
        <!-- for remove warning -->
        <template v-if="!hasDialogHeader()">
          <DialogTitle class="!hidden select-none" />
          <DialogDescription class="!hidden select-none" />
        </template>
        <!-- ---end--- -->
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>
