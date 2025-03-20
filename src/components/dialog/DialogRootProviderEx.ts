import { createContext, injectDialogRootContext } from 'reka-ui';
import { defineComponent, ref, Ref } from 'vue';
import { DialogCloseFrom } from '.';

interface DialogRootContext {
  open: Readonly<Ref<boolean>>;
  modal: Ref<boolean>;
  openModal: () => void;
  onOpenChange: (value: boolean, from?: DialogCloseFrom) => void;
  onOpenToggle: () => void;
  triggerElement: Ref<HTMLElement | undefined>;
  contentElement: Ref<HTMLElement | undefined>;
  contentId: string;
  titleId: string;
  descriptionId: string;
}

const [injectDialogContext, provideDialogContext] = createContext<
  DialogRootContext & {
    closeFrom: Ref<DialogCloseFrom | undefined>;
  }
>('DialogRoot');

export { injectDialogContext };
export default defineComponent({
  name: 'DialogRootProvider',
  setup(_, { slots }) {
    const { onOpenChange, ...rest } = injectDialogRootContext();
    const closeFrom = ref<DialogCloseFrom | undefined>(undefined);
    provideDialogContext({
      ...rest,
      onOpenChange: (value, from?: DialogCloseFrom) => {
        if (!value) {
          closeFrom.value = from;
        }
        onOpenChange(value);
      },
      closeFrom,
    });
    return () => slots.default?.();
  },
});
