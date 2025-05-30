export type FocusIntent = 'prev' | 'next' | 'first' | 'last'
export const MAP_KEY_TO_FOCUS_INTENT: Record<string, FocusIntent> = {
  ArrowLeft: 'prev',
  ArrowUp: 'prev',
  ArrowRight: 'next',
  ArrowDown: 'next',
  PageUp: 'first',
  Home: 'first',
  PageDown: 'last',
  End: 'last',
}

// #region ignoreMode
export enum ignoreEnum {
  none = 'none',
  parents = 'parents',
  children = 'children',
}
// #endregion ignoreMode

// #region API
// Tree API
export const TREE_API_METHODS = [
  'setData',
  'setChecked',
  'setCheckedKeys',
  'checkAll',
  'clearChecked',
  'setSelected',
  'clearSelected',
  'setExpand',
  'setExpandKeys',
  'setExpandAll',
  'getCheckedNodes',
  'getCheckedKeys',
  'getIndeterminateNodes',
  'getSelectedNode',
  'getSelectedKey',
  'getExpandNodes',
  'getExpandKeys',
  'getCurrentVisibleNodes',
  'getNode',
  'getTreeData',
  'getFlatData',
  'getNodesCount',
  'insertBefore',
  'insertAfter',
  'append',
  'prepend',
  'remove',
  'filter',
  'showCheckedNodes',
  'loadRootNodes',
  'updateNode',
  'updateNodes',
  'scrollTo',
] as const

export const TREE_SEARCH_API_METHODS = [
  ...TREE_API_METHODS,
  'clearKeyword',
  'getKeyword',
  'search',
] as const

export const DEFAULT_TREE_PROPS = {
  data: () => [],
  unloadDataList: () => [],
  showUnloadCheckedNodes: true,
  emptyText: '暂无数据',
  titleField: 'title',
  keyField: 'id',
  separator: ',',
  checkable: false,
  selectable: false,
  filteredNodeCheckable: false,
  cascade: true,
  enableLeafOnly: false,
  disableAll: false,
  defaultExpandAll: false,
  defaultExpandedKeys: () => [],
  expandedKeys: () => [],
  draggable: false,
  droppable: false,
  beforeDropMethod: () => () => true,
  ignoreMode: ignoreEnum.none,
  autoLoad: true,
  expandOnFilter: true,
  unselectOnClick: true,
  loading: false,

  nodeMinHeight: 30,
  nodeIndent: 20,
  renderNodeAmount: 100,
  bufferNodeAmount: 20,
}

export enum placementEnum {
  'bottom-start' = 'bottom-start',
  'bottom-end' = 'bottom-end',
  'bottom' = 'bottom',
  'top-start' = 'top-start',
  'top-end' = 'top-end',
  'top' = 'top',
}

// #region Scroll position
export enum verticalPositionEnum {
  top = 'top',
  center = 'center',
  bottom = 'bottom',
}

export type VerticalPositionType = keyof typeof verticalPositionEnum
// #endregion Scroll position

// #region Drag
export enum dragHoverPartEnum {
  before = 'before',
  body = 'body',
  after = 'after',
}
// #endregion Drag

export enum showLineType {
  // dotted = 'dotted',
  dashed = 'dashed',
  solid = 'solid',
}

import type { IEventNames } from './store/tree-event-target'

export const TREE_NODE_EVENTS = [
  'expand',
  'check',
  'click',
  'select',
  'node-dblclick',
  'node-right-click',
  'node-dragstart',
  'node-dragenter',
  'node-dragover',
  'node-dragleave',
  'node-drop',
]

export const STORE_EVENTS: Array<keyof IEventNames> = [
  'expand',
  'select',
  'unselect',
  'selected-change',
  'check',
  'uncheck',
  'checked-change',
  'set-data',
]

export const TREE_EVENTS = [...TREE_NODE_EVENTS, ...STORE_EVENTS]

export const TREE_SEARCH_EVENTS = ['search', ...TREE_EVENTS]

export const TREE_DROP_EVENTS = [
  'clear',
  'dropdown-visible-change',
  ...TREE_SEARCH_EVENTS,
]
