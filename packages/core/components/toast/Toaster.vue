<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { ToastProviderPropsEx } from './ToastProvider.vue'
import type { ToasterToast } from './use-toast'
import { isFunction } from 'lodash-es'
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
      root?: {
        class?: HTMLAttributes['class']
      }
      icon?: {
        class?: HTMLAttributes['class']
      }
      title?: {
        class?: HTMLAttributes['class']
      }
      description?: {
        class?: HTMLAttributes['class']
      }
      action?: {
        class?: HTMLAttributes['class']
      }
      close?: {
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
  return toast.ui?.root?.variant ?? toast.variant ?? 'info'
}
const { icon } = tvToast()
const forwarded = useForwardProps(props)
</script>

<template>
  <ToastProvider v-bind="forwarded">
    <Toast
      v-for="toast in toasts"
      v-bind="toast.ui?.root"
      :key="toast.id"
      :class="[ui?.root?.class, toast.ui?.root?.class]"
      :open="toast.open"
      :unstyled="toast.ui?.root?.unstyled ?? toast.unstyled ?? false"
      :variant="getVariant(toast)"
      @update:open="toast.onOpenChange"
    >
      <div class="w-full flex items-center gap-4">
        <template v-if="!toast.icon">
          <component
            :is="toastIcons[getVariant(toast)]"
            :class="icon({ class: [ui?.icon?.class, toast.ui?.icon?.class] })"
            :data-variant="getVariant(toast)"
          />
        </template>
        <template v-else-if="isVNode(toast.icon) || isFunction(toast.icon)">
          <component :is="toast.icon" />
        </template>
        <div class="grid gap-1 flex-1">
          <ToastTitle
            v-if="toast.title"
            v-bind="toast.ui?.title"
            :class="[ui?.title?.class, toast.ui?.title?.class]"
            :unstyled="toast.ui?.title?.unstyled ?? toast.unstyled ?? false"
          >
            {{ toast.title }}
          </ToastTitle>
          <template v-if="toast.description">
            <ToastDescription
              v-if="isVNode(toast.description) || isFunction(toast.description)"
              v-bind="toast.ui?.description"
              :class="[ui?.description?.class, toast.ui?.description?.class]"
              :unstyled="toast.ui?.description?.unstyled ?? toast.unstyled ?? false"
            >
              <component :is="toast.description" />
            </ToastDescription>
            <ToastDescription
              v-else
              v-bind="toast.ui?.description"
              :class="[ui?.description?.class, toast.ui?.description?.class]"
              :unstyled="toast.ui?.description?.unstyled ?? toast.unstyled ?? false"
            >
              {{ toast.description }}
            </ToastDescription>
          </template>
        </div>
        <ToastClose
          v-bind="toast.ui?.close"
          :class="[ui?.close?.class, toast.ui?.close?.class]"
          :unstyled="toast.ui?.close?.unstyled ?? toast.unstyled ?? false"
        />
      </div>
      <component
        :is="toast.action"
        v-bind="toast.ui?.action"
        :class="[ui?.action?.class, toast.ui?.action?.class]"
        :unstyled="toast.ui?.action?.unstyled ?? toast.unstyled ?? false"
        :variant="getVariant(toast)"
      />
    </Toast>
    <ToastViewport v-bind="ui?.viewport" />
  </ToastProvider>
</template>
