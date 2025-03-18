<script lang="ts"></script>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { dialogFooterClass, DialogClose } from '.';
import { Button } from '@/components/button';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();

const emits = defineEmits<{
  ok: [];
  cancel: [];
}>();

const onCancel = () => {
  console.log('onCancel');
  emits('cancel');
};

const onOk = () => {
  console.log('onOk');
  emits('ok');
};
</script>

<template>
  <div :class="cn(dialogFooterClass, props.class)">
    <slot>
      <DialogClose>
        <Button class="min-w-22.5 uppercase" type="text" @click="onCancel">Cancel</Button>
      </DialogClose>
      <DialogClose>
        <Button class="min-w-22.5 uppercase" @click="onOk">OK</Button>
      </DialogClose>
    </slot>
  </div>
</template>
