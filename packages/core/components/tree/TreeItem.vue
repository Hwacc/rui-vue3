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
import type { TreeRootVariants } from '.'
import { TreeItemMotion } from '@rui/core/components/motion/TreeItemMotion'
import { TreeItem } from '@rui/core/components/tree-raw'
import { cn } from '@rui/core/lib/utils'
import { useForwardExpose, useForwardPropsEmits } from 'reka-ui'
import { treeItemVariants } from '.'

defineOptions({
  inheritAttrs: false,
})

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
const { forwardRef } = useForwardExpose()
</script>

<template>
  <TreeItemMotion>
    <TreeItem
      v-slot="slotProps"
      v-bind="{ ...forward, ...$attrs }"
      :ref="forwardRef"
      :class="cn(treeItemVariants({ unstyled, size }), propsClass)"
      :style="{
        '--rui-tree-item-level': props.level,
      }"
    >
      <slot v-bind="slotProps" />
    </TreeItem>
  </TreeItemMotion>
</template>
