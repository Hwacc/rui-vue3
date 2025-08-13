<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@rui/core/components/button'
import { DialogClose, DialogCloseFrom, tvDialog } from '.'

const {
  class: propsClass,
  unstyled,
  cancelText = 'Cancel',
  okText = 'OK',
} = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
  cancelText?: string
  okText?: string
}>()
const emits = defineEmits<{
  ok: []
  cancel: []
}>()

const { footer } = tvDialog()
</script>

<template>
  <div :class="footer({ unstyled, class: propsClass })">
    <slot>
      <DialogClose :close-from="DialogCloseFrom.CancelButton">
        <Button
          class="min-w-22.5 uppercase"
          variant="text"
          size="sm"
          @click="() => emits('cancel')"
        >
          {{ cancelText }}
        </Button>
      </DialogClose>
      <DialogClose :close-from="DialogCloseFrom.OKButton">
        <Button
          class="min-w-22.5 uppercase"
          size="sm"
          @click="() => emits('ok')"
        >
          {{ okText }}
        </Button>
      </DialogClose>
    </slot>
  </div>
</template>
