<script lang="ts" generic="T" setup>
import type { Virtualizer } from '@tanstack/vue-virtual'
import type { HTMLAttributes } from 'vue'
import type { VirtualListProps } from '.'
import { useForwardExpose } from '@rui/add-ons/composables/useForwardExpose'
import { ref } from 'vue'
import { VirtualListImpl, VirtualRoot } from '.'

const props = defineProps<
  VirtualListProps<T> & {
    unstyled?: boolean
    ui?: {
      viewport?: {
        class?: HTMLAttributes['class']
      }
      scroll?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()
defineSlots<{ default: () => any }>()

const virtualizer = ref<Virtualizer<Element, Element> | null>(null)
// 向上暴露 virtualizer
defineExpose({
  get virtualizer() {
    return virtualizer.value
  },
})
const { forwardRef } = useForwardExpose()
</script>

<template>
  <VirtualRoot>
    <VirtualListImpl
      v-bind="{ ...props, ...$attrs }"
      :ref="
        (innerExpose) => {
          virtualizer = (innerExpose as any)?.virtualizer ?? null
          forwardRef(innerExpose)
        }
      "
    >
      <slot />
    </VirtualListImpl>
  </VirtualRoot>
</template>
