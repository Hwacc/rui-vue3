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
import { treeItemVariants, TreeRootVariants } from '.'
import { cn } from '@rui/core/lib/utils'
import { Motion } from 'motion-v'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  ...props
} = defineProps<
  TreeItemProps<T> & {
    class?: HTMLAttributes['class']
    size?: TreeRootVariants['size']
    unstyled?: boolean
  }
>()
const emit = defineEmits<TreeItemEmits<T>>()
defineSlots<TreeItemSlots>()

const forward = useForwardPropsEmits(props, emit)
</script>

<template>
  <Motion
    as-child
    :key="props.value.title"
    :initial="{ height: 0, opacity: 0, rotateX: 90 }"
    :animate="{ height: 'auto', opacity: 1, rotateX: 0 }"
    :exit="{ height: 0, opacity: 0, rotateX: -90 }"
  >
    <TreeItem
      v-slot="slotProps"
      v-bind="forward"
      :class="cn(treeItemVariants({ unstyled, size }), propsClass)"
    >
      <slot v-bind="slotProps" />
    </TreeItem>
  </Motion>
</template>
