<script lang="ts" generic="T" setup>
import type { HTMLAttributes } from 'vue'
import type { VirtualListProps } from '.'
import { useForwardProps } from '@rui/add-ons/composables/useForwardProps'
import { tvVirtualList, VirtualListImpl, VirtualRoot } from '.'

const {
  class: propsClass,
  unstyled,
  ui,
  ...props
} = defineProps<
  VirtualListProps<T> & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    ui?: {
      base?: {
        class?: HTMLAttributes['class']
      }
      viewport?: {
        class?: HTMLAttributes['class']
      }
      scroll?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()
defineSlots<{
  prepend: () => any
  default: () => any
  append: () => any
}>()

const { base } = tvVirtualList()
const forwarded = useForwardProps(props)
</script>

<template>
  <VirtualRoot>
    <div
      :class="
        base({ horizontal: forwarded.horizontal, unstyled, class: [ui?.base?.class, propsClass] })
      "
    >
      <slot name="prepend" />
      <VirtualListImpl
        v-bind="forwarded"
        :ui="ui"
        :unstyled="unstyled"
      >
        <template #default>
          <slot name="default" />
        </template>
      </VirtualListImpl>
      <slot name="append" />
    </div>
  </VirtualRoot>
</template>
