import type { Ref } from 'vue'
import { createContext, injectDropdownMenuRootContext } from 'reka-ui'

interface DropdownMenuRootContext {
  open: Readonly<Ref<boolean>>
  onOpenChange: (open: boolean) => void
  onOpenToggle: () => void
  triggerId: string
  triggerElement: Ref<HTMLElement | undefined>
  contentId: string
  modal: Ref<boolean>
  dir: Ref<Direction>
}

export interface DropdownMenuRootContextEx extends DropdownMenuRootContext {
  rootElement: Ref<HTMLElement | undefined>
}

const [injectDropdownMenuRootContextEx, provide] = createContext<DropdownMenuRootContextEx>(
  'DropdownMenuRootContextEx',
)

function provideDropdownMenuRootContextEx({
  rootElement,
}: {
  rootElement: Ref<HTMLElement | undefined>
}) {
  const rootContext = injectDropdownMenuRootContext()
  provide({
    ...rootContext,
    rootElement,
  })
}

export { injectDropdownMenuRootContextEx, provideDropdownMenuRootContextEx }
