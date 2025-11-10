<script setup lang="ts" generic="T extends Record<string, any>">
import type { TreeItemProps } from '../tree-ex/interface'
import { Primitive, RovingFocusItem } from 'reka-ui'
import { TREE_NODE_EVENTS } from './core/constants'
import { injectTreeRootContext } from './treeRootContext'

const { data, ...props } = defineProps<TreeItemProps<T>>()
const emit = defineEmits([...TREE_NODE_EVENTS])

console.log('item data', data)

const { store } = injectTreeRootContext()
</script>

<template>
  <RovingFocusItem
    as-child
    allow-shift-key
  >
    <Primitive
      v-bind="{ ...props, ...$attrs }"
      role="treeitem"
      @click="
        () => {
          store.setExpand(data.id, !data.expand)
        }
      "
    >
      <slot>
        {{ data.origin?.title }}
      </slot>
    </Primitive>
  </RovingFocusItem>
</template>
