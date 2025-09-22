import type { Ref } from 'vue'
import { createContext } from 'reka-ui'

export type PositionStrategy = 'absolute' | 'fixed'

export interface MenuTransferContext {
  rootElement: Ref<HTMLElement | undefined>
  positionStrategy: Ref<PositionStrategy>
}

const [injectMenuTransferContext, provideMenuTransferContext]
  = createContext<MenuTransferContext>('MenuTransferContext')

export { injectMenuTransferContext, provideMenuTransferContext }
