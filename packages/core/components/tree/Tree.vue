<script>
export interface TreeData {
  title: string
  children?: TreeData[]
  [key: string]: any
}
</script>

<script setup lang="ts">
import type { TreeRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { TreeItem, TreeRoot } from '.'

const props = defineProps<
  TreeRootProps<TreeData> & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()

function getKey(item: TreeData) {
  return item.id ?? item.title
}
</script>

<template>
  <div region="tree">
    <TreeRoot v-bind="props" :get-key="getKey">
      <template #default="{ flattenItems }">
        <TreeItem v-for="item in flattenItems" :key="item._id" v-bind="item">
          <template #default="slotProps">
            <slot v-bind="{ node: item, ...slotProps }"></slot>
          </template>
        </TreeItem>
      </template>
    </TreeRoot>
  </div>
</template>
