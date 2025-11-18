<!-- eslint-disable vue/custom-event-name-casing -->
<script setup lang="ts" generic="T extends Record<string, any>">
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { TreeVariants } from '.'
import type TreeNode from './core/tree-node'
import type { TreeProps, VModelType } from './interface'
import { ChevronRight } from 'lucide-vue-next'
import { TreeItem, TreeRoot, TreeVirtualizer, tvTree } from '.'
import { Checkbox } from '../checkbox'
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
        // prettier-ignore
        item?: (Pick<ComponentProps<typeof TreeItem<T>>, 'class' | 'nodeIndent' | 'showLine' | 'as'>)
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
        // prettier-ignore
        virtualizer?: (Omit<ComponentProps<typeof TreeVirtualizer>, 'unstyled'>)
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

const { base, item, virtualizer: tvVirtualizer, title, arrow } = tvTree()
</script>

<!-- eslint-disable vue/custom-event-name-casing -->
<template>
  <TreeRoot
    v-bind="props"
    :class="base({ class: [ui?.root?.class, propsClass], size })"
    :ui="ui?.root"
    :unstyled="unstyled"
    @update:model-value="emit('update:modelValue', $event)"
    @checked-change="(...args) => emit('tree:checkedChange', ...args)"
    @selected-change="(...args) => emit('tree:selectedChange', ...args)"
  >
    <TreeVirtualizer
      v-bind="ui?.virtualizer"
      :class="tvVirtualizer({ class: ui?.virtualizer?.class })"
    >
      <template #default="{ virtualItems, getRenderNode }">
        <TreeItem
          v-for="vItem in virtualItems"
          v-bind="ui?.item"
          :key="getRenderNode(vItem.index).id"
          :data="getRenderNode(vItem.index)"
          :virtual-info="vItem"
          :node-indent="nodeIndent"
          :show-line="showLine"
          :render="render"
          :class="item({ class: ui?.item?.class, size })"
          :unstyled="unstyled"
          @expand-change="(...args) => emit('item:expandChange', ...args)"
          @checked-change="(...args) => emit('item:checkedChange', ...args)"
          @selected-change="(...args) => emit('item:selectedChange', ...args)"
        >
          <template #default="{ handleNodeExpand, handleNodeCheck }">
            <slot v-bind="{ node: getRenderNode(vItem.index), handleNodeExpand, handleNodeCheck }">
              <Checkbox
                v-bind="ui?.content?.checkbox"
                :model-value="
                  getRenderNode(vItem.index).indeterminate
                    ? 'indeterminate'
                    : getRenderNode(vItem.index).checked
                "
                :size="size"
                :unstyled="unstyled"
                @click="handleNodeCheck(getRenderNode(vItem.index))"
              />
              <div
                :class="title({ class: ui?.title?.class, size })"
                @click="
                  getRenderNode(vItem.index).isLeaf
                    ? handleNodeCheck(getRenderNode(vItem.index))
                    : handleNodeExpand(getRenderNode(vItem.index))
                "
              >
                <slot
                  name="prefix"
                  v-bind="{ node: getRenderNode(vItem.index) }"
                />
                <slot
                  name="title"
                  v-bind="{ node: getRenderNode(vItem.index) }"
                >
                  <span>
                    {{ getRenderNode(vItem.index).raw[props.field.title ?? 'title'] }}
                  </span>
                </slot>
                <slot
                  name="suffix"
                  v-bind="{ node: getRenderNode(vItem.index) }"
                />
                <ChevronRight
                  v-if="getRenderNode(vItem.index).children.length"
                  :data-expand="getRenderNode(vItem.index).expand"
                  :class="arrow({ class: ui?.arrow?.class, size })"
                />
              </div>
            </slot>
          </template>
        </TreeItem>
      </template>
    </TreeVirtualizer>
  </TreeRoot>
</template>
