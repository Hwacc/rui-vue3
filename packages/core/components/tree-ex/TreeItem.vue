<script setup lang="ts" generic="T extends Record<string, any>">
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import type { TreeItemProps } from '../tree-ex/interface'
import { Primitive, RovingFocusItem, useForwardProps } from 'reka-ui'
import { onMounted } from 'vue'
import { tvTreeRaw } from '.'
import { TreeItemMotion } from '../motion/TreeItemMotion'
import { DEFAULT_TREE_ITEM_PROPS, TREE_NODE_EVENTS } from './core/constants'
import { injectTreeRootContext } from './treeRootContext'

const {
  data,
  as = 'li',
  class: propsClass,
  unstyled = false,
  ui,
  ...props
} = withDefaults(
  defineProps<
    TreeItemProps<T> & {
      class?: HTMLAttributes['class']
      unstyled?: boolean
      ui?: {
        class?: HTMLAttributes['class']
        motion?: ComponentProps<typeof TreeItemMotion>
      }
    }
  >(),
  DEFAULT_TREE_ITEM_PROPS,
)
const emit = defineEmits(['uncheck', 'unselect', ...TREE_NODE_EVENTS])
const forward = useForwardProps(props)
const { store, handleNodeCheck, handleNodeSelect, handleNodeExpand } = injectTreeRootContext()

onMounted(() => {
  store.on('check', (node) => {
    emit('check', node)
  })
  store.on('uncheck', (node) => {
    emit('uncheck', node)
  })
  store.on('expand', (node) => {
    emit('expand', node)
  })
  store.on('select', (node) => {
    emit('select', node)
  })
  store.on('unselect', (node) => {
    emit('unselect', node)
  })
})

const { item } = tvTreeRaw()
</script>

<template>
  <TreeItemMotion v-bind="ui?.motion">
    <RovingFocusItem
      as-child
      allow-shift-key
    >
      <Primitive
        v-bind="{ ...forward, ...$attrs }"
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
      >
        <slot
          v-bind="{
            node: data,
            handleNodeCheck,
            handleNodeSelect,
            handleNodeExpand,
          }"
        />
      </Primitive>
    </RovingFocusItem>
  </TreeItemMotion>
</template>
