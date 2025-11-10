<script setup lang="ts" generic="T extends Record<string, any>">
import type { TreeRootProps } from '../tree-ex/interface'
import type TreeNode from './core/tree-node'
import { filter } from 'lodash-es'
import { Primitive, RovingFocusGroup } from 'reka-ui'
import { computed, onMounted, reactive, watch } from 'vue'
import { useTreeAPI } from './composables/useTreeAPI'
import { DEFAULT_TREE_PROPS, TREE_EVENTS } from './core/constants'
import TreeStore from './core/tree-store'
import { provideTreeRootContext } from './treeRootContext'

const props = withDefaults(defineProps<TreeRootProps<T>>(), DEFAULT_TREE_PROPS)
const emit = defineEmits(['update:modelValue', ...TREE_EVENTS])
defineSlots<{ default: { renderNodes: TreeNode<T>[] } }>()

const store = reactive<TreeStore<T>>(
  new TreeStore({
    field: {
      id: 'id',
      children: 'children',
      selected: 'selected',
      checked: 'checked',
    },
    ignoreMode: props.ignoreMode,
    filteredNodeCheckable: props.filteredNodeCheckable,
    cascade: props.cascade,
    defaultExpandAll: props.defaultExpandAll,
    load: props.load,
    expandOnFilter: props.expandOnFilter,
  }),
)
const { isRootLoading, loadRootNodes } = useTreeAPI(store, props)
watch(
  () => props.data,
  () => {
    store.setData(props.data)
  },
)

const renderNodes = computed(() => {
  const result = filter(store.mapData, node => node.visible)
  return result
})

onMounted(() => {
  store.on('expand', () => {
    console.log('expand')
  })
  store.on('visible-data-change', () => {
    console.log('visible-data-change')
  })
  store.on('render-data-change', () => {
    console.log('render-data-change')
  })
  store.on('checked-change', () => {
    console.log('checked-change')
  })
  store.on('selected-change', () => {
    console.log('selected-change')
  })
  if (props.data.length) {
    store.setData(props.data)
    if (props.defaultExpandedKeys.length) {
      store.setExpandKeys(props.defaultExpandedKeys, true)
    }
    console.log('store', store)
  }
  else if (typeof props.load === 'function' && props.autoLoad) {
    // Load root data from remote
    if (props.modelValue || props.unloadDataList) {
      store.setData([])
    }
    loadRootNodes()
  }
})

provideTreeRootContext({
  isRootLoading,
  store,
})
</script>

<template>
  <RovingFocusGroup
    as-child
    orientation="vertical"
  >
    <Primitive role="tree">
      <slot :render-nodes="renderNodes" />
    </Primitive>
  </RovingFocusGroup>
</template>
