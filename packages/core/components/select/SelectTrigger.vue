<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { isEmpty } from 'lodash-es'
import { injectSelectRootContext, SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import { nextTick, ref, watch } from 'vue'
import { tvTrigger } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  SelectTriggerProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    ui?: {
      root?: {
        class?: HTMLAttributes['class']
      }
      icon?: {
        class?: HTMLAttributes['class']
      }
      triangle?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()
const { open, modelValue, disabled } = injectSelectRootContext()

const triggerRef = ref<{ $el: HTMLElement } | null>()
watch(
  modelValue,
  async (val) => {
    await nextTick()
    if (isEmpty(val)) {
      triggerRef.value?.$el?.setAttribute('data-placeholder', '')
    }
    else {
      triggerRef.value?.$el?.removeAttribute('data-placeholder')
    }
  },
  { immediate: true },
)

const { base, icon, triangle } = tvTrigger()
const forwarded = useForwardProps(props)
</script>

<template>
  <SelectTrigger
    v-bind="forwarded"
    ref="triggerRef"
    :class="base({ unstyled, class: [ui?.root?.class, propsClass] })"
  >
    <slot v-bind="{ open, disabled, modelValue }" />
    <slot
      name="icon"
      v-bind="{ open, disabled }"
    >
      <SelectIcon
        as="i"
        :class="icon({ unstyled, class: ui?.icon?.class })"
        :data-state="open ? 'open' : 'closed'"
        :data-disabled="disabled ? '' : undefined"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          view-box="0 0 7 3"
          :class="triangle({ unstyled, open, class: ui?.triangle?.class })"
          :data-state="open ? 'open' : 'closed'"
          :data-disabled="disabled ? '' : undefined"
        >
          <path d="M0 0 L3.5 3 L7 0 Z" />
        </svg>
      </SelectIcon>
    </slot>
  </SelectTrigger>
</template>
