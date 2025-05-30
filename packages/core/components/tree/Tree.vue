<script lang="ts">
export interface TreeData {
  title: string
  children?: TreeData[]
  [key: string]: any
}
</script>

<script setup lang="ts">
import type { TreeRootProps } from '@rui/core/components/tree-raw'
import type { TreeRootEmits } from 'reka-ui'
import type { TreeRootVariants } from '.'
import { useForwardExpose, useForwardPropsEmits } from 'reka-ui'
import { TreeItem, TreeRoot } from '.'

import TreeItemContent from './TreeItemContent.vue'

defineOptions({
  inheritAttrs: false,
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

console.log('tree root forward', forward)
</script>

<template>
  <div region="tree">
    <TreeRoot v-bind="forward">
      <template #default="{ flattenItems }">
        <TreeItem
          v-for="item in flattenItems"
          :key="item._id"
          v-bind="item.bind"
          @select="
            (event: any) => {
              if (event.detail.originalEvent.type === 'click') event.preventDefault()
            }
          "
          @toggle="
            (event: any) => {
              if (event.detail.originalEvent.type === 'keydown') event.preventDefault()
            }
          "
        >
          <template #default="slotProps">
            <slot v-bind="{ item, ...slotProps }">
              <div>{{ `isIndeterminate: ${slotProps.isIndeterminate}` }}</div>
              <TreeItemContent
                :item="item"
                v-bind="slotProps"
              >
                <template #icon="iconProps">
                  <slot
                    name="icon"
                    v-bind="iconProps"
                  />
                </template>
              </TreeItemContent>
            </slot>
          </template>
        </TreeItem>
      </template>
    </TreeRoot>
  </div>
</template>
