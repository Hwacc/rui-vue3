<script lang="ts">
export interface TreeData {
  title: string
  children?: TreeData[]
  [key: string]: any
}
</script>

<script setup lang="ts">
import {
  useForwardExpose,
  useForwardPropsEmits,
  type TreeRootEmits,
  type TreeRootProps
} from 'reka-ui'
import { TreeItem, TreeRoot, TreeRootVariants } from '.'
import TreeItemContent from './TreeItemContent.vue'

defineOptions({
  inheritAttrs: false
})

const {
  unstyled,
  size = 'base',
  ...props
} = defineProps<
  TreeRootProps<TreeData> & {
    size?: TreeRootVariants['size']
    unstyled?: boolean
  }
>()
const emit = defineEmits<TreeRootEmits<TreeData>>()

const { forwardRef } = useForwardExpose()
const forward = useForwardPropsEmits(props, emit)
</script>

<template>
  <div region="tree">
    <TreeRoot
      v-bind="{ ...forward, ...$attrs }"
      :unstyled="unstyled"
      :size="size"
      :ref="forwardRef"
    >
      <template #default="{ flattenItems }">
        <TreeItem v-for="item in flattenItems" :key="item._id" v-bind="item">
          <template #default="slotProps">
            <slot v-bind="{ item, ...slotProps }">
              <TreeItemContent :item="item"></TreeItemContent>
            </slot>
          </template>
        </TreeItem>
      </template>
    </TreeRoot>
  </div>
</template>
