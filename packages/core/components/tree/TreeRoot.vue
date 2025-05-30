<script lang="ts">
export interface TreeRootSlots<T extends Record<string, any>> {
  default: (props: {
    flattenItems: FlattenedItem<T>[]
    modelValue: Record<string, any> | Record<string, any>[]
    expanded: string[]
  }) => any
}
</script>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { TreeRootProps } from '@rui/core/components/tree-raw'
import type { FlattenedItem, TreeRootEmits } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TreeRootVariants } from '.'
import { TreeRoot } from '@rui/core/components/tree-raw'
import { cn } from '@rui/core/lib/utils'
import { AnimatePresence } from 'motion-v'
import { useForwardPropsEmits } from 'reka-ui'
import { treeRootVariants } from '.'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  ...props
} = defineProps<
  TreeRootProps<T> & {
    class?: HTMLAttributes['class']
    size?: TreeRootVariants['size']
    unstyled?: boolean
  }
>()
const emit = defineEmits<TreeRootEmits<T>>()
defineSlots<TreeRootSlots<T>>()

const forward = useForwardPropsEmits(props, emit)
</script>

<template>
  <TreeRoot
    v-slot="slotProps"
    v-bind="forward"
    :class="cn(treeRootVariants({ unstyled, size }), propsClass, 'transform-3d perspective-normal')"
  >
    <AnimatePresence :initial="false">
      <slot v-bind="slotProps" />
    </AnimatePresence>
  </TreeRoot>
</template>
