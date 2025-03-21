<script setup lang="ts">
import { isVNode } from 'vue';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '.';
import { useToast } from './use-toast';
import { ToastProviderPropsEx } from './ToastProvider.vue';
import { isFunction } from 'lodash-es';
import { CircleCheck, CircleAlert, Info, CircleX } from 'lucide-vue-next';

const props = defineProps<ToastProviderPropsEx>();
const { toasts } = useToast();
</script>

<template>
  <ToastProvider v-bind="props">
    <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast">
      <div class="w-full flex items-center gap-4">
        <CircleCheck
          v-if="toast.variant === 'success'"
          class="size-5 fill-rz-green stroke-h22 [&>circle]:stroke-rz-green"
        />
        <CircleAlert
          v-if="toast.variant === 'warning'"
          class="size-5 fill-rz-orange stroke-h22 [&>circle]:stroke-rz-orange"
        />
        <Info
          v-if="toast.variant === 'info'"
          class="size-5 fill-h88 stroke-h22 [&>circle]:stroke-h88"
        />
        <CircleX
          v-if="toast.variant === 'error'"
          class="size-5 fill-rz-red stroke-h22 [&>circle]:stroke-rz-red"
        />
        <div class="grid gap-1 flex-1">
          <ToastTitle v-if="toast.title">
            {{ toast.title }}
          </ToastTitle>
          <template v-if="toast.description">
            <ToastDescription v-if="isVNode(toast.description) || isFunction(toast.description)">
              <component :is="toast.description" />
            </ToastDescription>
            <ToastDescription v-else>
              {{ toast.description }}
            </ToastDescription>
          </template>
        </div>
        <ToastClose />
      </div>
      <component :is="toast.action" />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
