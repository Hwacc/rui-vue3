<script setup lang="ts">
import { isVNode } from 'vue';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toastIconVariants,
} from '.';
import { useToast } from './use-toast';
import { ToastProviderPropsEx } from './ToastProvider.vue';
import { isFunction } from 'lodash-es';
import { CircleCheck, CircleAlert, Info, CircleX } from 'lucide-vue-next';

const props = defineProps<ToastProviderPropsEx>();
const { toasts } = useToast();

const toastIcons = {
  success: CircleCheck,
  warning: CircleAlert,
  info: Info,
  error: CircleX,
};
</script>

<template>
  <ToastProvider v-bind="props">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      v-bind="toast"
      :disable-rui-class="toast.disableRuiClass"
    >
      <div class="w-full flex items-center gap-4">
        <template v-if="!toast.icon">
          <component
            v-if="toast.variant"
            :is="toastIcons[toast.variant as unknown as keyof typeof toastIcons]"
            :class="
              toastIconVariants({ variant: toast.variant, disableRuiClass: toast.disableRuiClass })
            "
            :data-type="toast.variant"
          />
        </template>
        <template v-else-if="isVNode(toast.icon) || isFunction(toast.icon)">
          <component :is="toast.icon" />
        </template>
        <div class="grid gap-1 flex-1">
          <ToastTitle v-if="toast.title" :disable-rui-class="toast.disableRuiClass">
            {{ toast.title }}
          </ToastTitle>
          <template v-if="toast.description">
            <ToastDescription
              v-if="isVNode(toast.description) || isFunction(toast.description)"
              :disable-rui-class="toast.disableRuiClass"
            >
              <component :is="toast.description" />
            </ToastDescription>
            <ToastDescription v-else :disable-rui-class="toast.disableRuiClass">
              {{ toast.description }}
            </ToastDescription>
          </template>
        </div>
        <ToastClose :disable-rui-class="toast.disableRuiClass" />
      </div>
      <component :is="toast.action" :disable-rui-class="toast.variant" />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
