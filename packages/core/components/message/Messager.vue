<script setup lang="ts">
import type { ToastProviderPropsEx } from '@rui/core/components/toast'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { MessagerToast } from './use-message'
import { Toast, ToastProvider, ToastTitle, ToastViewport } from '@rui/core/components/toast'
import { isFunction } from 'lodash-es'
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-vue-next'
import { useForwardProps } from 'reka-ui'
import { isVNode } from 'vue'
import { tvMessage } from '.'
import { useMessage } from './use-message'

const props = defineProps<
  Omit<ToastProviderPropsEx, 'position' | 'swipeDirection'> & {
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
      viewport?: ComponentProps<typeof ToastViewport>
    }
  }
>()
const { messages } = useMessage()

const messageIcons: Record<StatusVariants, any> = {
  success: CircleCheck,
  warning: CircleAlert,
  info: Info,
  error: CircleX,
}
function getVariant(message: MessagerToast) {
  return message.ui?.root?.variant ?? message.variant ?? 'info'
}
const { base, title, icon } = tvMessage()
const forwarded = useForwardProps(props)
</script>

<template>
  <ToastProvider
    v-bind="forwarded"
    position="top-center"
    swipe-direction="up"
  >
    <Toast
      v-for="message in messages"
      v-bind="message.ui?.root"
      :key="message.id"
      :class="
        base({
          unstyled: message.ui?.root?.unstyled ?? message.unstyled ?? false,
          class: message.ui?.root?.class,
        })
      "
      :open="message.open"
      :unstyled="message.ui?.root?.unstyled ?? message.unstyled ?? false"
      :variant="getVariant(message)"
      @update:open="message.onOpenChange"
    >
      <div class="w-full flex items-center gap-4">
        <template v-if="!message.icon">
          <component
            :is="messageIcons[getVariant(message)]"
            :class="icon({ class: [ui?.icon?.class, message.ui?.icon?.class] })"
            :data-variant="getVariant(message)"
          />
        </template>
        <template v-else-if="isVNode(message.icon) || isFunction(message.icon)">
          <component :is="message.icon" />
        </template>
        <ToastTitle
          v-if="message.title"
          v-bind="message.ui?.title"
          :class="
            title({
              unstyled: message.ui?.title?.unstyled ?? message.unstyled ?? false,
              class: [ui?.title?.class, message.ui?.title?.class],
            })
          "
          :unstyled="message.ui?.title?.unstyled ?? message.unstyled ?? false"
        >
          {{ message.title }}
        </ToastTitle>
      </div>
    </Toast>
    <ToastViewport v-bind="ui?.viewport" />
  </ToastProvider>
</template>
