<script setup lang="ts" generic="T extends Record<string, any>">
import type { Motion } from 'motion-v'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { TreeProps } from './interface'
import { ChevronRight } from 'lucide-vue-next'
import { TreeItem, TreeRoot, tvTree } from '.'
import { Checkbox } from '../checkbox'
import { DEFAULT_TREE_ITEM_PROPS, DEFAULT_TREE_ROOT_PROPS } from './core/constants'

const { nodeIndent, showLine, render, ui, ...props } = withDefaults(
  defineProps<
    TreeProps<T> & {
      ui?: {
        root?: {
          class?: HTMLAttributes['class']
        }
        item?: {
          class?: HTMLAttributes['class']
          motion?: ComponentProps<typeof Motion>
          checkbox?: ComponentProps<typeof Checkbox>
        }
      }
    }
  >(),
  {
    ...DEFAULT_TREE_ROOT_PROPS,
    ...DEFAULT_TREE_ITEM_PROPS,
    loading: false,
    emptyText: 'No Data',
  },
)
function handleCheckedChange(_: any, raw: T[]) {
  console.log('outside', raw)
}
const { item, content } = tvTree()
</script>

<template>
  <TreeRoot
    v-bind="props"
    :ui="ui?.root"
    @checked-change="handleCheckedChange"
  >
    <template #default="{ renderNodes }">
      <TreeItem
        v-for="node in renderNodes"
        :key="node.key"
        :data="node"
        :node-indent="nodeIndent"
        :show-line="showLine"
        :render="render"
        :class="item({ class: ui?.item?.class })"
        :ui="{
          motion: ui?.item?.motion,
        }"
      >
        <template #default="{ handleNodeExpand, handleNodeCheck }">
          <Checkbox
            v-bind="ui?.item?.checkbox"
            :model-value="node.indeterminate ? 'indeterminate' : node.checked"
            @click="handleNodeCheck(node)"
          />
          <div
            :class="content()"
            @click="handleNodeExpand(node)"
          >
            <div>
              {{ node.raw[props.field.title ?? 'title'] }}
            </div>
            <ChevronRight
              v-if="node.children.length"
              class="size-4" :class="[node.expand ? 'rotate-90' : '']"
            />
          </div>
        </template>
      </TreeItem>
    </template>
  </TreeRoot>
</template>
