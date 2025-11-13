<script setup lang="ts" generic="T extends Record<string, any>">
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { TreeVariants } from '.'
import type TreeNode from './core/tree-node'
import type { TreeProps, VModelType } from './interface'
import { ChevronRight } from 'lucide-vue-next'
import { AnimatePresence } from 'motion-v'
import { TreeItem, TreeRoot, tvTree } from '.'
import { Checkbox } from '../checkbox'
import { TreeItemMotion } from '../motion/TreeItemMotion'
import { DEFAULT_TREE_ITEM_PROPS, DEFAULT_TREE_ROOT_PROPS } from './core/constants'

const {
  nodeIndent,
  showLine,
  render,
  ui,
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = withDefaults(
  defineProps<
    TreeProps<T> & {
      class?: HTMLAttributes['class']
      size?: TreeVariants['size']
      unstyled?: boolean
      ui?: {
        root?: {
          class?: HTMLAttributes['class']
        }
        item?: Pick<ComponentProps<typeof TreeItem<T>>, 'class' | 'nodeIndent' | 'showLine' | 'as'>
        content?: {
          class?: HTMLAttributes['class']
          checkbox?: ComponentProps<typeof Checkbox>
        }
        title?: {
          class?: HTMLAttributes['class']
        }
        arrow?: {
          class?: HTMLAttributes['class']
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
const emit = defineEmits<{
  'update:modelValue': [VModelType]
  'tree:checkedChange': [TreeNode<T>[], T[]]
  'tree:selectedChange': [TreeNode<T> | null, T[]]
  'item:expandChange': [TreeNode<T>, boolean]
  'item:checkedChange': [TreeNode<T>, boolean]
  'item:selectedChange': [TreeNode<T>, boolean]
}>()
const { base, item, content, title, arrow } = tvTree()
</script>

<!-- eslint-disable vue/custom-event-name-casing -->
<template>
  <TreeRoot
    v-bind="props"
    :class="base({ class: [ui?.root?.class, propsClass], size, unstyled })"
    :ui="ui?.root"
    @update:model-value="emit('update:modelValue', $event)"
    @checked-change="(...args) => emit('tree:checkedChange', ...args)"
    @selected-change="(...args) => emit('tree:selectedChange', ...args)"
  >
    <template #default="{ renderNodes }">
      <AnimatePresence
        :initial="false"
        mode="sync"
      >
        <TreeItem
          v-for="node in renderNodes"
          v-bind="ui?.item"
          :key="node.id"
          :data="node"
          :node-indent="nodeIndent"
          :show-line="showLine"
          :render="render"
          :class="item({ class: ui?.item?.class, size, unstyled })"
          :unstyled="unstyled"
          @expand-change="(...args) => emit('item:expandChange', ...args)"
          @checked-change="(...args) => emit('item:checkedChange', ...args)"
          @selected-change="(...args) => emit('item:selectedChange', ...args)"
        >
          <template #default="{ handleNodeExpand, handleNodeCheck }">
            <TreeItemMotion :class="content({ class: ui?.content?.class, size, unstyled })">
              <slot v-bind="{ node, handleNodeExpand, handleNodeCheck }">
                <Checkbox
                  v-bind="ui?.content?.checkbox"
                  :model-value="node.indeterminate ? 'indeterminate' : node.checked"
                  :size="size"
                  :unstyled="unstyled"
                  @click="handleNodeCheck(node)"
                />
                <div
                  :class="title({ class: ui?.title?.class, size, unstyled })"
                  @click="node.isLeaf ? handleNodeCheck(node) : handleNodeExpand(node)"
                >
                  <slot
                    name="prefix"
                    v-bind="{ node }"
                  />
                  <slot name="title">
                    <span>
                      {{ node.raw[props.field.title ?? 'title'] }}
                    </span>
                  </slot>
                  <slot
                    name="suffix"
                    v-bind="{ node }"
                  />
                  <ChevronRight
                    v-if="node.children.length"
                    :data-expand="node.expand"
                    :class="arrow({ class: ui?.arrow?.class, size, unstyled })"
                  />
                </div>
              </slot>
            </TreeItemMotion>
          </template>
        </TreeItem>
      </AnimatePresence>
    </template>
  </TreeRoot>
</template>
