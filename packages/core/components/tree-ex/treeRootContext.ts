import type { Reactive, Ref } from 'vue'
import type TreeStore from './core/tree-store'
import { createContext } from 'reka-ui'

export interface TreeRootContext<T extends Record<string, any>> {
  store: Reactive<TreeStore<T>>
  isRootLoading: Ref<boolean>
}

const [injectTreeRootContext, provideTreeRootContext]
  = createContext<TreeRootContext<any>>('TreeRootContext')

export { injectTreeRootContext, provideTreeRootContext }
