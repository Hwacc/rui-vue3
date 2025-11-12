import type { ignoreEnum, placementEnum, showLineType } from './constants'

import type TreeNode from './tree-node'
import type TreeStore from './tree-store'

export type PlacementType = keyof typeof placementEnum

export type TreeNodeKeyType = string | number

export type GetNodeFn = <T extends Record<string, any>>(key: TreeNodeKeyType) => TreeNode<T> | null

export type IgnoreType = keyof typeof ignoreEnum

export type LoadFn = <T extends Record<string, any>>(
  node: null | TreeNode<T>,
  resolve: Function,
  reject: Function,
) => any

export interface TreeDropSlotProps<T extends Record<string, any>> {
  /** 多选选中的节点 */
  checkedNodes: TreeNode<T>[]
  /** 多选选中的节点 key */
  checkedKeys: TreeNodeKeyType[]
  /** 单选选中的节点 */
  selectedNode?: TreeNode<T>

  /** 单选选中的节点 key */
  selectedKey?: TreeNodeKeyType
}

export type AnyPropsArrayType = Array<{ [key: string]: any }>

export interface INonReactiveData<T extends Record<string, any>> {
  store: TreeStore<T>
  blockNodes: TreeNode<T>[]
}

// Utils to generate types like 1 | 2 | 3
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export interface ShowLine {
  /** 连接线宽度，svg stroke-width， 默认 1px */
  width?: number
  type?: showLineType
  color?: string
  polyline?: boolean
  dashDensity?: IntRange<1, 11>
}

export type TreeKeyField = {
  id: string
  selected: string
  checked: string
  children: string
  title: string
}
