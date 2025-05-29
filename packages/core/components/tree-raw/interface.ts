import type { useSelectionBehavior } from '@rui/core/hooks/useSelectionBehavior'
import type { EventHook } from '@vueuse/core'
import type { PrimitiveProps } from 'reka-ui'
import type { Ref } from 'vue'

export interface TreeRootProps<
  T = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
  M extends boolean = false,
> extends PrimitiveProps {
  /** The controlled value of the tree. Can be binded with with `v-model`. */
  modelValue?: M extends true ? U[] : U
  /** The value of the tree when initially rendered. Use when you do not need to control the state of the tree */
  defaultValue?: M extends true ? U[] : U
  /** List of items */
  items?: T[]
  /** The controlled value of the expanded item. Can be binded with with `v-model`. */
  expanded?: string[]
  /** The value of the expanded tree when initially rendered. Use when you do not need to control the state of the expanded tree */
  defaultExpanded?: string[]
  /** This function is passed the index of each item and should return a unique key for that item */
  getKey: (val: T) => string
  /** This function is passed the index of each item and should return a list of children for that item */
  getChildren?: (val: T) => T[] | undefined
  /** How multiple selection should behave in the collection. */
  selectionBehavior?: 'toggle' | 'replace'
  /** Whether multiple options can be selected or not.  */
  multiple?: M
  /** The reading direction of the listbox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction
  /** When `true`, prevents the user from interacting with tree  */
  disabled?: boolean
  /** When `true`, selecting parent will select the descendants. */
  propagateSelect?: boolean
  /** When `true`, selecting children will update the parent state. */
  bubbleSelect?: boolean
}

export type TreeRootEmits<T = Record<string, any>, M extends boolean = false> = {
  'update:modelValue': [val: M extends true ? T[] : T]
  'update:expanded': [val: string[]]
}

export interface TreeRootContext<T = Record<string, any>> {
  modelValue: Ref<T | T[]>
  selectedKeys: Ref<string[]>
  onSelect: (val: T) => void
  expanded: Ref<string[]>
  onToggle: (val: T) => void
  items: Ref<T[]>
  expandedItems: Ref<T[]>
  getKey: (val: T) => string
  getChildren: (val: T) => T[] | undefined
  multiple: Ref<boolean>
  disabled: Ref<boolean>
  dir: Ref<Direction>
  propagateSelect: Ref<boolean>
  bubbleSelect: Ref<boolean>
  isVirtual: Ref<boolean>
  virtualKeydownHook: EventHook<KeyboardEvent>
  handleMultipleReplace: ReturnType<typeof useSelectionBehavior>['handleMultipleReplace']
}

export type FlattenedItem<T> = {
  _id: string
  index: number
  value: T
  level: number
  hasChildren: boolean
  parentItem?: T
  bind: {
    value: T
    level: number
    [key: string]: any
  }
}
