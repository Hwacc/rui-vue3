<script setup lang="ts">
import { useMessage } from './use-message';
import { CircleCheck, CircleAlert, Info, CircleX } from 'lucide-vue-next';
import {
  ToastProvider,
  ToastProviderPropsEx,
  Toast,
  ToastTitle,
  ToastClose,
  ToastViewport,
} from '@/components/toast';
import { messageVariants } from '.';

const { position: _, swipeDirection: __, ...props } = defineProps<ToastProviderPropsEx>();
const { messages } = useMessage();
</script>

<template>
  <ToastProvider position="top-center" swipe-direction="up" v-bind="props">
    <Toast
      v-for="message in messages"
      :key="message.id"
      v-bind="message"
      :class="messageVariants({ variant: message.variant })"
    >
      <div class="w-full flex items-center gap-4">
        <CircleCheck
          v-if="message.variant === 'success'"
          class="size-5 fill-rz-green stroke-h22 [&>circle]:stroke-rz-green"
        />
        <CircleAlert
          v-if="message.variant === 'warning'"
          class="size-5 fill-rz-orange stroke-h22 [&>circle]:stroke-rz-orange"
        />
        <Info
          v-if="message.variant === 'info'"
          class="size-5 fill-h88 stroke-h22 [&>circle]:stroke-h88"
        />
        <CircleX
          v-if="message.variant === 'error'"
          class="size-5 fill-rz-red stroke-h22 [&>circle]:stroke-rz-red"
        />
        <ToastTitle v-if="message.title" class="flex-1">
          {{ message.title }}
        </ToastTitle>
      </div>
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
