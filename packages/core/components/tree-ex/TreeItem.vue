<script setup lang="ts" generic="T extends Record<string, any>">
import type { ComponentPublicInstance, HTMLAttributes, VNode } from 'vue'
import type { TreeItemProps } from '../tree-ex/interface'
import type TreeNode from './core/tree-node'
import { Primitive, RovingFocusItem, useForwardProps } from 'reka-ui'
import { watch } from 'vue'
import { tvTreeRaw } from '.'
import { DEFAULT_TREE_ITEM_PROPS } from './core/constants'
import { injectTreeRootContext } from './treeRootContext'

const {
  data,
  as = 'li',
  class: propsClass,
  unstyled = false,
  ui,
  virtualInfo,
  ...props
} = withDefaults(
  defineProps<
    TreeItemProps<T> & {
      class?: HTMLAttributes['class']
      unstyled?: boolean
      ui?: {
        class?: HTMLAttributes['class']
      }
    }
  >(),
  DEFAULT_TREE_ITEM_PROPS,
)
const emit = defineEmits<{
  checkedChange: [TreeNode<T>, boolean]
  selectedChange: [TreeNode<T>, boolean]
  expandChange: [TreeNode<T>, boolean]
}>()
const forward = useForwardProps(props)
const { virtualizer, handleNodeCheck, handleNodeSelect, handleNodeExpand } = injectTreeRootContext()

function measureElement(node: Element | ComponentPublicInstance | null) {
  if (!node || !virtualizer)
    return
  virtualizer.value.measureElement(
    (node as ComponentPublicInstance).$el ? (node as ComponentPublicInstance).$el : node,
  )
}

watch(
  () => data.checked,
  (val) => {
    emit('checkedChange', data, val)
  },
)
watch(
  () => data.selected,
  (val) => {
    emit('selectedChange', data, val)
  },
)
watch(
  () => data.expand,
  (val) => {
    emit('expandChange', data, val)
  },
)
const { item } = tvTreeRaw()
</script>

<template>
  <RovingFocusItem
    as-child
    allow-shift-key
  >
    <Primitive
      v-bind="{ ...forward, ...$attrs }"
      :ref="measureElement"
      role="treeitem"
      :class="item({ unstyled, class: [ui?.class, propsClass] })"
      :style="{
        '--rui-tree-item-indent': `${forward.nodeIndent}px`,
        '--rui-tree-item-padding-left': `${data._level * (forward.nodeIndent ?? 0)}px`,
      }"
      :as="as"
      :data-level="data._level"
      :data-expand="data.expand ? 'true' : undefined"
      :data-checked="data.checked ? 'true' : undefined"
      :data-selected="data.selected ? 'true' : undefined"
      :data-indeterminate="data.indeterminate ? 'true' : undefined"
      :data-index="virtualInfo ? virtualInfo.index : undefined"
    >
      <component
        :is="forward.render(data)"
        v-if="forward.render"
      />
      <slot
        v-else
        v-bind="{
          node: data,
          handleNodeCheck,
          handleNodeSelect,
          handleNodeExpand,
        }"
      />
    </Primitive>
  </RovingFocusItem>
</template>
