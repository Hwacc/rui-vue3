import { AcceptableValue, createContext, injectSelectRootContext } from 'reka-ui';
import { Ref } from 'vue';

type Direction = 'ltr' | 'rtl';
interface SelectOption {
  value: any;
  disabled?: boolean;
  textContent: string;
}

export interface SelectRootContext<T> {
  triggerElement: Ref<HTMLElement | undefined>;
  onTriggerChange: (node: HTMLElement | undefined) => void;
  valueElement: Ref<HTMLElement | undefined>;
  onValueElementChange: (node: HTMLElement) => void;
  contentId: string;
  modelValue: Ref<T | Array<T> | undefined>;
  onValueChange: (value: T) => void;
  open: Ref<boolean>;
  multiple: Ref<boolean>;
  required?: Ref<boolean>;
  by?: string | ((a: T, b: T) => boolean);
  onOpenChange: (open: boolean) => void;
  dir: Ref<Direction>;
  triggerPointerDownPosRef: Ref<{ x: number; y: number } | null>;
  isEmptyModelValue: Ref<boolean>;
  disabled?: Ref<boolean>;

  optionsSet: Ref<Set<SelectOption>>;
  onOptionAdd: (option: SelectOption) => void;
  onOptionRemove: (option: SelectOption) => void;
}

interface SelectRootContextEx<T> extends SelectRootContext<T> {
  rootElement: Ref<HTMLElement | undefined>;
}

const [injectSelectRootContextEx, provide] =
  createContext<SelectRootContextEx<AcceptableValue>>('SelectRootContextEx');

const provideSelectRootContextEx = ({
  rootElement,
}: {
  rootElement: Ref<HTMLElement | undefined>;
}) => {
  const rootContext = injectSelectRootContext();
  provide({
    ...rootContext,
    rootElement,
  });
};

export { injectSelectRootContextEx, provideSelectRootContextEx };
