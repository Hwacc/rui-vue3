import type { AcceptableValue } from 'reka-ui'
import type { Ref } from 'vue'
import { createContext, injectSelectRootContext } from 'reka-ui'

interface SelectOption {
  value: any
  disabled?: boolean
  textContent: string
}

export interface SelectRootContext<T> {
  triggerElement: Ref<HTMLElement | undefined>
  onTriggerChange: (node: HTMLElement | undefined) => void
  valueElement: Ref<HTMLElement | undefined>
  onValueElementChange: (node: HTMLElement) => void
  contentId: string
  modelValue: Ref<T | Array<T> | undefined>
  onValueChange: (value: T) => void
  open: Ref<boolean>
  multiple: Ref<boolean>
  required?: Ref<boolean>
  by?: string | ((a: T, b: T) => boolean)
  onOpenChange: (open: boolean) => void
  dir: Ref<Direction>
  triggerPointerDownPosRef: Ref<{ x: number, y: number } | null>
  isEmptyModelValue: Ref<boolean>
  disabled?: Ref<boolean>

  optionsSet: Ref<Set<SelectOption>>
  onOptionAdd: (option: SelectOption) => void
  onOptionRemove: (option: SelectOption) => void
}

interface SelectRootContextEx<T> extends SelectRootContext<T> {
  rootElement: Ref<HTMLElement | undefined>
}

const [injectSelectRootContextEx, provide]
  = createContext<SelectRootContextEx<AcceptableValue>>('SelectRootContextEx')

function provideSelectRootContextEx({
  rootElement,
}: {
  rootElement: Ref<HTMLElement | undefined>
}) {
  const rootContext = injectSelectRootContext()
  console.log('root contextt', rootContext)
  provide({
    ...rootContext,
    rootElement,
  })
}

export { injectSelectRootContextEx, provideSelectRootContextEx }
