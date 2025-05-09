<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { SheetVariants } from '.'
import { cn } from '@rui/core/lib/utils'
import { X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import {
  sheetContentCloseVariants,
  sheetOverlayVariants,
  sheetVariants,
} from '.'

interface SheetProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: SheetVariants['side']
  showClose?: boolean
  unstyled?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const {
  class: propsClass,
  side = 'right',
  unstyled,
  showClose = true,
  ...props
} = defineProps<SheetProps>()

const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay :class="cn(sheetOverlayVariants({ unstyled }))" />
    <DialogContent
      :class="cn(sheetVariants({ side, unstyled }), propsClass)"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />
      <DialogClose
        v-if="showClose"
        :class="
          cn('absolute p-2 -m-2', sheetContentCloseVariants({ unstyled }))
        "
      >
        <slot name="close">
          <span class="sr-only">Close</span>
          <X class="w-4 h-4" />
        </slot>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
