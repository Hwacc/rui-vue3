import type { TreeKeyField, TreeNodeKeyType } from './types'

interface IKeyOption {
  [key: string]: TreeNodeKeyType
}

export interface ITreeNodeOptions extends IKeyOption {
  [key: string]: any
}

export default class TreeNode<T extends Record<string, any>> {
  // #region Properties

  [key: string]: any

  /** 节点层级 */
  _level: number = 0

  /** 多选是否选中 */
  checked: boolean = false

  /** 单选是否选中 */
  selected: boolean = false

  /** 是否半选状态 */
  indeterminate: boolean = false

  /** 是否禁用 */
  disabled: boolean = false

  /** 是否展开 */
  expand: boolean = false

  /** 是否可见 */
  visible: boolean = true

  /** 过滤后是否可见，如果为 false 则在其他可见情况下也是不可见的 */
  _filterVisible: boolean = true

  /** 父节点 */
  _parent: null | TreeNode<T> = null

  /** 子节点 */
  children: TreeNode<T>[] = []

  /** 是否是子节点 */
  isLeaf: boolean = false

  /** 节点是否正在加载 */
  _loading: boolean = false

  /** 子节点是否已加载 */
  _loaded: boolean = false

  origin: T | null = null
  // #endregion Properties

  constructor(
    origin: T,
    parent: null | TreeNode<T> = null,
    readonly _remote: boolean = false,
    readonly _filed: TreeKeyField = {
      id: 'id',
      selected: 'selected',
      checked: 'checked',
      children: 'children',
    },
  ) {
    this.origin = origin

    if (origin[_filed.id] == null) {
      // 如果没有 id 字段，随机赋值一个
      this[_filed.id] = Math.random().toString(36).substring(2)
    }
    else {
      this[_filed.id] = origin[_filed.id]
    }

    this._parent = parent
    if (this._parent) {
      this._level = this._parent._level + 1
    }

    this.visible
      = this._parent === null || (this._parent.expand && this._parent.visible)

    if (Array.isArray(origin[_filed.children])) {
      this.setChildren(origin[_filed.children])
    }

    if (this.children.length) {
      this._loaded = true
    }

    if (!this._remote) {
      this.isLeaf = !this.children.length
    }
  }

  /**
   * 设置子节点
   * @param children 子节点数据数组
   */
  setChildren(children: T[]): void {
    this.children = children.map((child) => {
      return new TreeNode(
        child,
        this,
        this._remote,
        this._filed,
      )
    })
  }
}
