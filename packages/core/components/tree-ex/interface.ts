import type { VirtualItem } from '@tanstack/vue-virtual'
import type { PrimitiveProps } from 'reka-ui'
import type { VNode } from 'vue'
import type TreeNode from './core/tree-node'
import type {
  AnyPropsArrayType,
  GetNodeFn,
  IgnoreType,
  LoadFn,
  ShowLine,
  TreeKeyField,
  TreeNodeKeyType,
} from './core/types'

export interface TreeRootProps<T extends Record<string, any>> extends PrimitiveProps {
  /** 传入的树数据。数据量大时，不建议通过 props 传入数据，建议用 `setData` 方法代替 */
  data?: T[]

  /** 单选模式下为字符串或数字，多选模式下为数组或者以 separator 分隔的字符串。当即可单选又可多选时，value 是多选的值 */
  modelValue?: string | number | TreeNodeKeyType[]

  /** 是否可单选 */
  selectable?: boolean

  /** 是否可多选 */
  checkable?: boolean

  /** 多选模式下 value 分隔符 */
  separator?: string

  /** 忽略模式 */
  ignoreMode?: IgnoreType

  field?: Partial<TreeKeyField>

  /** 父子节点是否关联 */
  cascade?: boolean

  /** 是否可勾选被过滤节点 */
  filteredNodeCheckable?: boolean

  /** 是否默认展开所有节点 */
  defaultExpandAll?: boolean

  /** 异步加载方法 */
  load?: LoadFn

  /**
   * 过滤时是否展开所有可见节点
   * 有时候可能因为开发者样式设置问题导致虚拟列表失效，而展开数据量又过多从而卡顿
   * 加上这个选项并不是为了解决上述问题，而仅仅作为一个可选项
   */
  expandOnFilter?: boolean

  /** 是否只启用子节点，当 `多选且父子不关联` 或 `单选` 时有效 */
  enableLeafOnly?: boolean

  /**
   * 默认展开的节点 key
   */
  defaultExpandedKeys?: TreeNodeKeyType[]

  /** 异步加载初始化时是否自动加载根节点 */
  autoLoad?: boolean

  /** 供未加载且选中节点查询 title 字段值用的列表，格式与 `data` 一致即可 */
  unloadDataList?: AnyPropsArrayType
}

export interface TreeItemProps<T extends Record<string, any>> extends PrimitiveProps {
  data: TreeNode<T>

  getNode?: GetNodeFn

  noSiblingNodeMap?: Record<string, true>

  /** 子节点缩进 */
  nodeIndent?: number

  /** 连接线 */
  showLine?: boolean | ShowLine

  /** 节点渲染 render 函数 */
  render?: (node: TreeNode<T>) => VNode

  /** 虚拟列表Item信息 */
  virtualInfo?: VirtualItem
}

export interface TreeProps<T extends Record<string, any>>
  extends TreeRootProps<T>,
  Omit<TreeItemProps<T>, 'data' | 'getNode' | 'noSiblingNodeMap'> {
  /** 是否显示 loading 图标 */
  loading?: boolean
  /** 数据为空时显示的文本 */
  emptyText?: string
}

export type VModelType = TreeNodeKeyType[] | TreeNodeKeyType
