<script lang="ts">
export interface IDialogContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  showClose?: boolean
  openAutoFocus?: boolean
  closeAutoFocus?: boolean
  overlay?: DialogOverlayProps & { class?: HTMLAttributes['class'] }
  portal?: DialogPortalProps
  unstyled?: boolean
  ui?: {
    portal?: {
      props?: DialogPortalProps
    }
    overlay?: {
      class?: HTMLAttributes['class']
      props?: DialogOverlayProps
    }
    close?: {
      class?: HTMLAttributes['class']
    }
  }
}
</script>

<script setup lang="ts">
import type {
  DialogContentEmits,
  DialogContentProps,
  DialogOverlayProps,
  DialogPortalProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
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

import { computed, useSlots, watch } from 'vue'
import { DialogClose, DialogCloseFrom, tvDialog } from '.'
import { injectDialogContext } from './DialogRootProviderEx'

const {
  class: propsClass,
  showClose = true,
  openAutoFocus = true,
  closeAutoFocus = true,
  unstyled,
  ui,
  ...props
} = defineProps<IDialogContentProps>()
const emits = defineEmits<
  DialogContentEmits & {
    open: []
    opened: []
    close: [{ from: DialogCloseFrom | undefined }]
    closed: [{ from: DialogCloseFrom | undefined }]
    enter: [event: any]
    leave: [event: any]
    afterEnter: [event: any]
    afterLeave: [event: any]
  }
>()
const { open, closeFrom } = injectDialogContext()
const { forwardRef } = useForwardExpose()

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
  value ? emits('open') : emits('close', { from: closeFrom.value })
})

const { overlay, content, close } = tvDialog()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DialogPortal v-bind="ui?.portal?.props">
    <DialogOverlay
      :class="overlay({ unstyled, class: ui?.overlay?.class })"
      data-variant="default"
    />
    <DialogContent
      v-bind="forwarded"
      :ref="forwardRef"
      data-variant="default"
      :class="content({ unstyled, variant: 'default', class: propsClass })"
      @after-enter="() => emits('opened')"
      @after-leave="() => emits('closed', { from: closeFrom })"
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
      @pointer-down-outside="onPointerDownOutside"
      @escape-key-down="
        (event) => {
          closeFrom = DialogCloseFrom.EscapeKey
          emits('escapeKeyDown', event)
        }
      "
    >
      <slot />
      <slot
        v-if="showContentClose"
        name="close"
      >
        <div class="absolute pr-2 pt-2 right-0 top-0">
          <DialogClose
            as="button"
            :class="close({ unstyled })"
            :close-from="DialogCloseFrom.CloseButton"
          >
            <X class="size-4 text-xs disabled:pointer-events-none" />
            <span class="sr-only">Close</span>
          </DialogClose>
        </div>
      </slot>
      <!-- for remove console warning -->
      <template v-if="!hasDialogHeader()">
        <DialogTitle class="!hidden select-none" />
        <DialogDescription class="!hidden select-none" />
      </template>
      <!-- ---end--- -->
    </DialogContent>
  </DialogPortal>
</template>
