<script setup lang="ts">
import type { TreeItemProps } from './interface'
import { TREE_NODE_EVENTS } from './constants'

const props = defineProps<TreeItemProps>()
const emit = defineEmits([...TREE_NODE_EVENTS])

console.log('TreeItem', props)
</script>

<template>
  <RovingFocusItem
    as-child
    allow-shift-key
  >
    <Primitive
      v-bind="$attrs"
      role="treeitem"
    >
      <slot />
    </Primitive>
  </RovingFocusItem>
</template>
