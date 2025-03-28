<script lang="ts"></script>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { dialogFooterVariants, DialogClose, DialogCloseFrom } from '.';
import { Button } from '@/components/button';

const { class: propsClass, disableRuiClass } = defineProps<{
  class?: HTMLAttributes['class'];
  disableRuiClass?: boolean;
}>();
const emits = defineEmits<{
  ok: [];
  cancel: [];
}>();
</script>

<template>
  <div :class="cn(dialogFooterVariants({ disableRuiClass }), propsClass)">
    <slot>
      <DialogClose :close-from="DialogCloseFrom.CancelButton">
        <Button class="min-w-22.5 uppercase" type="text" size="sm" @click="() => emits('cancel')">
          Cancel
        </Button>
      </DialogClose>
      <DialogClose :close-from="DialogCloseFrom.OKButton">
        <Button class="min-w-22.5 uppercase" size="sm" @click="() => emits('ok')">OK</Button>
      </DialogClose>
    </slot>
  </div>
</template>
