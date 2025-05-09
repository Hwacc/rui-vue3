<script setup lang="ts">
import type { ToastProviderPropsEx } from './ToastProvider.vue'
import { isFunction } from 'lodash-es'
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-vue-next'
import { isVNode } from 'vue'
import {
  Toast,
  ToastClose,
  ToastDescription,
  toastIconVariants,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '.'
import { useToast } from './use-toast'

const props = defineProps<ToastProviderPropsEx>()
const { toasts } = useToast()

const toastIcons: Record<StatusVariants, any> = {
  success: CircleCheck,
  warning: CircleAlert,
  info: Info,
  error: CircleX,
}
</script>

<template>
  <ToastProvider v-bind="props">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      v-bind="toast"
      :disable-rui-class="toast.unstyled"
    >
      <div class="w-full flex items-center gap-4">
        <template v-if="!toast.icon">
          <component
            :is="toastIcons[toast.variant]"
            v-if="toast.variant"
            :class="toastIconVariants({ unstyled: toast.unstyled })"
            :data-variant="toast.variant"
          />
        </template>
        <template v-else-if="isVNode(toast.icon) || isFunction(toast.icon)">
          <component :is="toast.icon" />
        </template>
        <div class="grid gap-1 flex-1">
          <ToastTitle v-if="toast.title" :disable-rui-class="toast.unstyled">
            {{ toast.title }}
          </ToastTitle>
          <template v-if="toast.description">
            <ToastDescription
              v-if="isVNode(toast.description) || isFunction(toast.description)"
              :disable-rui-class="toast.unstyled"
            >
              <component :is="toast.description" />
            </ToastDescription>
            <ToastDescription v-else :disable-rui-class="toast.unstyled">
              {{ toast.description }}
            </ToastDescription>
          </template>
        </div>
        <ToastClose :disable-rui-class="toast.unstyled" />
      </div>
      <component :is="toast.action" :disable-rui-class="toast.variant" />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
