<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { ToastAction } from '.'
import type { ToastProviderPropsEx } from './ToastProvider.vue'
import type { ToasterToast } from './use-toast'
import { isFunction, merge } from 'lodash-es'
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-vue-next'
import { useForwardProps } from 'reka-ui'
import { isVNode } from 'vue'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  tvToast,
} from '.'
import { useToast } from './use-toast'

const { ui, ...props } = defineProps<
  ToastProviderPropsEx & {
    ui?: {
      root?: ComponentProps<typeof Toast>
      title?: ComponentProps<typeof ToastTitle>
      description?: ComponentProps<typeof ToastDescription>
      action?: ComponentProps<typeof ToastAction>
      close?: ComponentProps<typeof ToastClose>
      icon?: {
        class?: HTMLAttributes['class']
      }
      viewport?: ComponentProps<typeof ToastViewport>
    }
  }
>()

const { toasts } = useToast()
const toastIcons: Record<StatusVariants, any> = {
  success: CircleCheck,
  warning: CircleAlert,
  info: Info,
  error: CircleX,
}
function getVariant(toast: ToasterToast) {
  return ui?.root?.variant ?? toast.ui?.root?.variant ?? toast.variant ?? 'info'
}
function getUnstyled(toast: ToasterToast) {
  return ui?.root?.unstyled ?? toast.ui?.root?.unstyled ?? toast.unstyled ?? false
}
const { icon } = tvToast()
const forwarded = useForwardProps(props)
</script>

<template>
  <ToastProvider v-bind="forwarded">
    <Toast
      v-for="toast in toasts"
      v-bind="merge(ui?.root, toast.ui?.root)"
      :key="toast.id"
      :open="toast.open"
      :variant="getVariant(toast)"
      @update:open="toast.onOpenChange"
    >
      <div class="w-full flex items-center gap-4">
        <template v-if="!toast.icon">
          <component
            :is="toastIcons[getVariant(toast)]"
            v-if="toast.variant"
            :class="icon({ unstyled: getUnstyled(toast), class: toast.ui?.icon?.class })"
            :data-variant="getVariant(toast)"
          />
        </template>
        <template v-else-if="isVNode(toast.icon) || isFunction(toast.icon)">
          <component :is="toast.icon" />
        </template>
        <div class="grid gap-1 flex-1">
          <ToastTitle
            v-if="toast.title"
            :unstyled="getUnstyled(toast)"
          >
            {{ toast.title }}
          </ToastTitle>
          <template v-if="toast.description">
            <ToastDescription
              v-if="isVNode(toast.description) || isFunction(toast.description)"
              v-bind="toast.ui?.description"
              :unstyled="getUnstyled(toast)"
            >
              <component :is="toast.description" />
            </ToastDescription>
            <ToastDescription
              v-else
              v-bind="toast.ui?.description"
              :unstyled="getUnstyled(toast)"
            >
              {{ toast.description }}
            </ToastDescription>
          </template>
        </div>
        <ToastClose
          v-bind="toast.ui?.close"
          :unstyled="getUnstyled(toast)"
        />
      </div>
      <component
        :is="toast.action"
        v-bind="toast.ui?.action"
        :variant="getVariant(toast)"
      />
    </Toast>
    <ToastViewport v-bind="ui?.viewport" />
  </ToastProvider>
</template>
