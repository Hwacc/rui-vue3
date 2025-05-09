<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@rui/core/components/button'
import { cn } from '@rui/core/lib/utils'
import { DialogClose, DialogCloseFrom, dialogFooterVariants } from '.'

const { class: propsClass, unstyled } = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()
const emits = defineEmits<{
  ok: []
  cancel: []
}>()
</script>

<template>
  <div :class="cn(dialogFooterVariants({ unstyled }), propsClass)">
    <slot>
      <DialogClose :close-from="DialogCloseFrom.CancelButton">
        <Button
          class="min-w-22.5 uppercase"
          variant="text"
          size="sm"
          @click="() => emits('cancel')"
        >
          Cancel
        </Button>
      </DialogClose>
      <DialogClose :close-from="DialogCloseFrom.OKButton">
        <Button
          class="min-w-22.5 uppercase"
          size="sm"
          @click="() => emits('ok')"
        >
          OK
        </Button>
      </DialogClose>
    </slot>
  </div>
</template>
