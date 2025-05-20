<script lang="ts">
export interface TreeItemSlots {
  default: (props: {
    isExpanded: boolean
    isSelected: boolean
    isIndeterminate: boolean | undefined
    handleToggle: () => void
    handleSelect: () => void
  }) => any
}
</script>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { TreeItemEmits, TreeItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { TreeItem, useForwardPropsEmits } from 'reka-ui'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  TreeItemProps<T> & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const emit = defineEmits<TreeItemEmits<T>>()
defineSlots<TreeItemSlots>()

const forward = useForwardPropsEmits(props, emit)
</script>

<template>
  <TreeItem v-slot="slotProps" v-bind="forward">
    <slot v-bind="slotProps" />
  </TreeItem>
</template>
