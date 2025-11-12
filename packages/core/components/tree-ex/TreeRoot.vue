<script lang="ts" setup generic="T extends Record<string, any>">
import type { HTMLAttributes } from 'vue'
import type TreeNode from './core/tree-node'
import type { TreeNodeKeyType } from './core/types'
import type { TreeRootProps, VModelType } from './interface'
import { filter } from 'lodash-es'
import { AnimatePresence } from 'motion-v'
import { Primitive, RovingFocusGroup } from 'reka-ui'
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { tvTreeRaw } from '.'
import { useTreeAPI } from './composables/useTreeAPI'
import { DEFAULT_TREE_KEY_FIELD, DEFAULT_TREE_ROOT_PROPS } from './core/constants'
import TreeStore from './core/tree-store'
import { provideTreeRootContext } from './treeRootContext'
import { sameValue } from './utils'

const {
  as,
  class: propsClass,
  unstyled = false,
  ui,
  ...props
} = withDefaults(
  defineProps<
    TreeRootProps<T> & {
      class?: HTMLAttributes['class']
      unstyled?: boolean
      ui?: {
        class?: HTMLAttributes['class']
      }
    }
  >(),
  DEFAULT_TREE_ROOT_PROPS,
)
const emit = defineEmits<{
  'update:modelValue': [VModelType]
  'checkedChange': [TreeNode<T>[], T[]]
  'selectedChange': [TreeNode<T> | null, T[]]
}>()
defineSlots<{ default: { renderNodes: TreeNode<T>[] } }>()

const store = reactive<TreeStore<T>>(
  new TreeStore({
    field: Object.assign({}, DEFAULT_TREE_KEY_FIELD, props.field),
    ignoreMode: props.ignoreMode,
    filteredNodeCheckable: props.filteredNodeCheckable,
    cascade: props.cascade,
    defaultExpandAll: props.defaultExpandAll,
    load: props.load,
    expandOnFilter: props.expandOnFilter,
  }),
)
const { isRootLoading, loadRootNodes } = useTreeAPI<T>(store, props)
watch(
  () => props.data,
  () => {
    store.setData(props.data)
  },
)

const valueCache = ref<VModelType | undefined>(
  Array.isArray(props.modelValue) ? props.modelValue.concat() : props.modelValue,
)

watch(
  () => props.modelValue,
  (newVal) => {
    if (props.checkable) {
      // 检查是否由 update:modelValue 事件触发
      if (sameValue(newVal as VModelType, valueCache.value))
        return
      // 多选
      let checkedKeys: TreeNodeKeyType[] = []
      if (Array.isArray(newVal)) {
        checkedKeys = newVal.concat()
      }
      else if (typeof newVal === 'string') {
        checkedKeys = newVal === '' ? [] : (newVal as string).split(props.separator)
      }
      store.clearChecked(false, false)
      store.setCheckedKeys(checkedKeys, true)
    }
    else if (props.selectable) {
      // 检查是否由 update:modelValue 事件触发
      if (newVal === valueCache.value)
        return
      // 单选
      const currentSelected = store.getSelectedKey()
      if (newVal !== '' && newVal != null) {
        store.setSelected(newVal as TreeNodeKeyType, true)
      }
      else if ((newVal === '' || newVal == null) && currentSelected) {
        store.setSelected(currentSelected, false)
      }
    }
  },
)

const renderNodes = computed(() => {
  const result = filter(store.mapData, node => node.visible)
  return result
})

function handleNodeCheck(node: TreeNode<T>) {
  if (!props.cascade && props.enableLeafOnly && !node.isLeaf)
    return
  store.setChecked(
    node[props.field?.id ?? 'id'],
    node.indeterminate ? true : !node.checked,
    true,
    true,
    true,
  )
}
function handleNodeSelect(node: TreeNode<T>) {
  store.setSelected(node[props.field?.id ?? 'id'], true, true, true)
}
function handleNodeExpand(node: TreeNode<T>) {
  store.setExpand(node[props.field?.id ?? 'id'], !node.expand)
}

function emitCheckableEvent(checkedNodes: TreeNode<T>[], checkedKeys: TreeNodeKeyType[]) {
  // 多选
  let emitValue: TreeNodeKeyType[] | string = checkedKeys
  if (!Array.isArray(props.modelValue)) {
    emitValue = emitValue.join(props.separator)
  }
  if (Array.isArray(emitValue)) {
    valueCache.value = emitValue.concat()
  }
  else {
    valueCache.value = emitValue
  }
  emit('update:modelValue', emitValue)
  emit('checkedChange', checkedNodes, store.data.map(node => node.raw) as T[])
}

function emitSelectableEvent(
  selectedNode: TreeNode<T> | null,
  selectedKey: TreeNodeKeyType | null,
) {
  if (props.selectable && !props.checkable) {
    // 单选
    const emitValue: TreeNodeKeyType = selectedKey ?? ''
    valueCache.value = emitValue
    emit('update:modelValue', emitValue)
    emit('selectedChange', selectedNode, store.data.map(node => node.raw) as T[])
  }
}

onMounted(() => {
  store.on('visible-data-change', () => {})
  store.on('render-data-change', () => {})
  store.on('checked-change', (checkedNodes: TreeNode<T>[], checkedKeys: TreeNodeKeyType[]) => {
    emitCheckableEvent(checkedNodes, checkedKeys)
  })
  store.on(
    'selected-change',
    (selectedNode: TreeNode<T> | null, selectedKey: TreeNodeKeyType | null) => {
      emitSelectableEvent(selectedNode, selectedKey)
    },
  )
  if (props.data.length) {
    store.setData(props.data)
    if (props.defaultExpandedKeys.length) {
      store.setExpandKeys(props.defaultExpandedKeys, true)
    }
  }
  else if (typeof props.load === 'function' && props.autoLoad) {
    // Load root data from remote
    if (props.modelValue || props.unloadDataList) {
      store.setData([])
    }
    loadRootNodes()
  }
})

onBeforeUnmount(() => {
  store.disposeListeners()
})

provideTreeRootContext({
  isRootLoading,
  handleNodeCheck,
  handleNodeSelect,
  handleNodeExpand,
  store,
})

const { base } = tvTreeRaw()
</script>

<template>
  <RovingFocusGroup
    as-child
    orientation="vertical"
  >
    <Primitive
      role="tree"
      :as="as"
      :class="base({ unstyled, class: [ui?.class, propsClass] })"
    >
      <AnimatePresence
        :initial="false"
        mode="sync"
      >
        <slot :render-nodes="renderNodes" />
      </AnimatePresence>
    </Primitive>
  </RovingFocusGroup>
</template>
