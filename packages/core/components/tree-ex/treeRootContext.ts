import type { Reactive, Ref } from 'vue'
import type TreeNode from './core/tree-node'
import type TreeStore from './core/tree-store'
import { createContext } from 'reka-ui'

export interface TreeRootContext<T extends Record<string, any>> {
  store: Reactive<TreeStore<T>>
  isRootLoading: Ref<boolean>
  handleNodeCheck: (node: TreeNode<T>) => void
  handleNodeSelect: (node: TreeNode<T>) => void
  handleNodeExpand: (node: TreeNode<T>) => void
}

const [injectTreeRootContext, provideTreeRootContext]
  = createContext<TreeRootContext<any>>('TreeRootContext')

export { injectTreeRootContext, provideTreeRootContext }
