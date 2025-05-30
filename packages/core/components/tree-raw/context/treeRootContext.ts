import type { Reactive, Ref } from 'vue'
import type TreeNode from '../store/tree-node'
import type TreeStore from '../store/tree-store'
import { createContext } from 'reka-ui'

export interface TreeRootContext {
  store: Reactive<TreeStore>
  blockNodes: Ref<TreeNode[]>
}

export const [injectTreeRootContext, provideTreeRootContext]
  = createContext<TreeRootContext>('TreeRootContext')
