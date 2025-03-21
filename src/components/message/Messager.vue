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

const props = defineProps<Omit<ToastProviderPropsEx, 'position' | 'swipeDirection'>>();
const { messages } = useMessage();
</script>

<template>
  <ToastProvider v-bind="props" position="top-center" swipe-direction="up">
    <Toast
      v-for="message in messages"
      :key="message.id"
      v-bind="message"
      :class="messageVariants({ variant: message.variant })"
    >
      <div class="w-full flex items-center gap-4">
        <template v-if="!message.icon">
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
