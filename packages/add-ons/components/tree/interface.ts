import type {
  SelectionMode,
  TreeViewFilterMethod,
  TreeViewLoadNodesAsyncMethod,
  TreeViewNodeMetaModel,
  TreeViewNodeMetaModelDefaultsMethod,
} from '@grapoza/vue-tree'

export interface ModelData {
  id: string | number
  label: string
  children?: Array<ModelData>
  [key: string]: any
}

export interface TreeProps {
  modelValue: Array<ModelData>
  customAriaKeyMap?: Record<string, any>
  filterMethod?: TreeViewFilterMethod
  loadNodesAsync?: TreeViewLoadNodesAsyncMethod
  modelDefaults?: TreeViewNodeMetaModelDefaultsMethod
  selectionMode?: SelectionMode
  skinClass?: string
}

export interface TreeEmits {
  'update:modelValue': [value: Array<ModelData>]
  'treeNodeAdd': [target: TreeViewNodeMetaModel, parent: TreeViewNodeMetaModel]
  'treeNodeClick': [target: TreeViewNodeMetaModel, event: MouseEvent]
  'treeNodeDblclick': [target: TreeViewNodeMetaModel, event: MouseEvent]
  'treeNodeDelete': [target: TreeViewNodeMetaModel]
  'treeNodeCheckboxChange': [target: TreeViewNodeMetaModel, event: InputEvent]
  'treeNodeChildCheckboxChange': [
    target: TreeViewNodeMetaModel,
    child: TreeViewNodeMetaModel,
    event: InputEvent,
  ]
  'treeNodeRadioChange': [target: TreeViewNodeMetaModel, event: InputEvent]
  'treeNodeExpandedChange': [target: TreeViewNodeMetaModel]
  'treeNodeSelectedChange': [target: TreeViewNodeMetaModel]
  'treeNodeActivate': [target: TreeViewNodeMetaModel]
  'treeNodeChildrenLoad': [target: TreeViewNodeMetaModel]
  'treeRootNodesLoad': []
}
