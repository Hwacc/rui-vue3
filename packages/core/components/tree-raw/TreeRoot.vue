<script setup lang="ts">
import type { TreeRootProps } from './interface'
import type TreeNode from './store/tree-node'
import { filter } from 'lodash-es'
import { Primitive, RovingFocusGroup } from 'reka-ui'
import { computed, onMounted, reactive, ref } from 'vue'
import { DEFAULT_TREE_PROPS, TREE_EVENTS } from './constants'
import { provideTreeRootContext } from './context/treeRootContext'
import TreeStore from './store/tree-store'

const props = withDefaults(defineProps<TreeRootProps>(), DEFAULT_TREE_PROPS)
const emit = defineEmits(['update:modelValue', ...TREE_EVENTS])

const store = reactive(
  new TreeStore({
    keyField: props.keyField,
    ignoreMode: props.ignoreMode,
    filteredNodeCheckable: props.filteredNodeCheckable,
    cascade: props.cascade,
    defaultExpandAll: props.defaultExpandAll,
    load: props.load,
    expandOnFilter: props.expandOnFilter,
  }),
)
const blockNodes = ref<TreeNode[]>([])

provideTreeRootContext({
  store,
  blockNodes,
})

const renderNodes = computed(() => {
  const result = filter(store.mapData, node => node.visible && (node._level === 0 || node.expand))
  console.log('render nodes', result)
  return result
})

onMounted(() => {
  // store.on('expand', expandAnimation.updateAfterExpand)
  // store.on('visible-data-change', updateBlockNodes)
  // store.on('render-data-change', updateRender)
  // store.on(
  //   'checked-change',
  //   (checkedNodes: TreeNode[], checkedKeys: TreeNodeKeyType[]) => {
  //     emitCheckableInput(checkedNodes, checkedKeys)
  //     updateUnloadStatus()
  //   },
  // )
  // store.on('selected-change', emitSelectableInput)
  if (props.data.length) {
    store.setData(props.data)
    if (props.defaultExpandedKeys.length) {
      store.setExpandKeys(props.defaultExpandedKeys, true)
    }
    console.log('set data', store, store.data)
  }
  else if (typeof props.load === 'function' && props.autoLoad) {
    // Load root data from remote
    if (props.modelValue || props.unloadDataList) {
      store.setData([])
    }
    // store.loadRootNodes()
  }
})
</script>

<template>
  <RovingFocusGroup
    as-child
    orientation="vertical"
  >
    <Primitive role="tree">
      <div
        v-for="node in renderNodes"
        :key="node.id"
        @click="
          () => {
            console.log('click', node)
            store.setExpand(node.id, !node.expand)
          }
        "
      >
        {{ node.title }}
      </div>
    </Primitive>
  </RovingFocusGroup>
</template>
