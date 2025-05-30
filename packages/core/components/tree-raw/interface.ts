import type { PrimitiveProps } from 'reka-ui'
import type { VNode } from 'vue'
import type { dragHoverPartEnum } from './constants'
import type TreeNode from './store/tree-node'
import type { FilterFunctionType } from './store/tree-store'
import type { AnyPropsArrayType, GetNodeFn, IgnoreType, LoadFn, ShowLine, TreeNodeKeyType } from './types'

export interface TreeRootProps extends PrimitiveProps {
  /** 传入的树数据。数据量大时，不建议通过 props 传入数据，建议用 `setData` 方法代替 */
  data?: AnyPropsArrayType

  /** 数据为空时显示的文本 */
  emptyText?: string

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

  /** 节点标题字段 */
  titleField?: string

  /** 节点唯一标识字段 */
  keyField?: string

  /** 节点过滤方法 */
  filterMethod?: FilterFunctionType

  /** 过滤已选时是否在列表后面展示未加载的已选节点 */
  showUnloadCheckedNodes?: boolean

  /** 供未加载且选中节点查询 title 字段值用的列表，格式与 `data` 一致即可 */
  unloadDataList?: AnyPropsArrayType

  /** 异步加载方法 */
  load?: LoadFn

  /** 是否可勾选被过滤节点 */
  filteredNodeCheckable?: boolean

  /** 父子节点是否关联 */
  cascade?: boolean

  /** 是否只启用子节点，当 `多选且父子不关联` 或 `单选` 时有效 */
  enableLeafOnly?: boolean

  /** 是否禁用所有节点 */
  disableAll?: boolean

  /** 是否默认展开所有节点 */
  defaultExpandAll?: boolean

  /**
   * 默认展开的节点 key
   * @deprecated 下一个大版本将废弃，使用 expandedKeys 代替
   */
  defaultExpandedKeys?: TreeNodeKeyType[]

  /** 展开的节点，该 Prop 变化时，树组件将会响应，建议配合事件使用 */
  expandedKeys?: TreeNodeKeyType[]

  /** 是否可拖拽 */
  draggable?: boolean

  /** 是否可放置 */
  droppable?: boolean

  /** 在放置节点之前执行的方法，返回 true 允许放置， false 可阻止放置 */
  beforeDropMethod?: (
    dragKey: TreeNodeKeyType,
    dropKey: TreeNodeKeyType,
    hoverPart: dragHoverPartEnum
  ) => boolean

  /** 异步加载初始化时是否自动加载根节点 */
  autoLoad?: boolean

  /** 节点渲染 render 函数 */
  render?: (node: TreeNode) => VNode

  /**
   * 过滤时是否展开所有可见节点
   * 有时候可能因为开发者样式设置问题导致虚拟列表失效，而展开数据量又过多从而卡顿
   * 加上这个选项并不是为了解决上述问题，而仅仅作为一个可选项
   */
  expandOnFilter?: boolean

  /** 点击已选中节点是否取消选中 */
  unselectOnClick?: boolean

  /** 是否显示 loading 图标 */
  loading?: boolean

  /** 节点根元素的 class ，传入函数以对每个节点定制 class */
  nodeClassName?:
    | string
    | object
    | Array<string | object>
    | ((node: TreeNode) => string | object | Array<string | object>)

  /** 连接线 */
  showLine?: boolean | ShowLine

  /** 是否启用过渡动画，目前仅控制展开收起 */
  animation?: boolean

  /** 子节点缩进 */
  nodeIndent?: number

  /** 渲染节点数量，可见节点数大于此值且高度超过(容器可视高度能容纳节点数 + bufferNodeAmount)则不会渲染所有可见节点 */
  renderNodeAmount?: number

  /** 根据节点最小高度计算数据总高度 */
  nodeMinHeight?: number

  /** 当滚动到视野外的节点个数大于此值时刷新渲染节点 */
  bufferNodeAmount?: number
}

type PickedProps = Required<Pick<TreeRootProps, 'titleField' |
  'keyField' |
  'checkable' |
  'selectable' |
  'unselectOnClick' |
  'disableAll' |
  'draggable' |
  'droppable' |
  'nodeIndent'>> & Pick<TreeRootProps, 'render' | 'showLine'>

export type TreeItemProps = PrimitiveProps & PickedProps & {
  data: TreeNode
  getNode: GetNodeFn
  noSiblingNodeMap: Record<string, true>
}
