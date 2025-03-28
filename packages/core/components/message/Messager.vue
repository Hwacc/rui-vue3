<script setup lang="ts">
import { useMessage } from './use-message';
import { CircleCheck, CircleAlert, Info, CircleX } from 'lucide-vue-next';
import {
  ToastProvider,
  ToastProviderPropsEx,
  Toast,
  ToastTitle,
  ToastViewport,
} from '@/components/toast';
import { messageVariants } from '.';
import { isVNode } from 'vue';
import { isFunction } from 'lodash-es';

const props = defineProps<
  Omit<ToastProviderPropsEx, 'position' | 'swipeDirection'> & {
    disableRuiClass?: boolean;
  }
>();
const { messages } = useMessage();
</script>

<template>
  <ToastProvider v-bind="props" position="top-center" swipe-direction="up">
    <Toast
      v-for="message in (messages as any)"
      :key="message.id"
      v-bind="message"
      :class="messageVariants({ variant: message.variant, disableRuiClass: props.disableRuiClass })"
      :data-variant="message.variant"
    >
      <div class="w-full flex items-center gap-4">
        <template v-if="!message.icon">
          <CircleCheck v-if="message.variant === 'success'" class="size-5" />
          <CircleAlert v-if="message.variant === 'warning'" class="size-5" />
          <Info v-if="message.variant === 'info'" class="size-5" />
          <CircleX v-if="message.variant === 'error'" class="size-5" />
        </template>
        <template v-else-if="isVNode(message.icon) || isFunction(message.icon)">
          <component :is="message.icon" />
        </template>
        <ToastTitle v-if="message.title" class="flex-1">
          {{ message.title }}
        </ToastTitle>
      </div>
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
