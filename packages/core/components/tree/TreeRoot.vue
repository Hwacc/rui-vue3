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
import type { FlattenedItem, TreeRootEmits, TreeRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { TreeRoot, useForwardPropsEmits } from 'reka-ui'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  TreeRootProps<T> & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const emit = defineEmits<TreeRootEmits<T>>()
defineSlots<TreeRootSlots<T>>()

const forward = useForwardPropsEmits(props, emit)
</script>

<template>
  <TreeRoot v-slot="slotProps" v-bind="forward">
    <slot v-bind="slotProps" />
  </TreeRoot>
</template>
