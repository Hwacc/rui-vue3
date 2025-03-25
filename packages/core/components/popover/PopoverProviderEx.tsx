import { useTimeoutFn } from '@vueuse/core';
import { createContext, injectPopoverRootContext } from 'reka-ui';
import { defineComponent, ref, Ref, toRefs } from 'vue';

export interface PopoverRootContext {
  triggerElement: Ref<HTMLElement | undefined>;
  triggerId: string;
  contentId: string;
  open: Ref<boolean>;
  modal: Ref<boolean>;
  onOpenChange: (value: boolean) => void;
  onOpenToggle: () => void;
  hasCustomAnchor: Ref<boolean>;
}

export interface PopoverRootContextEx extends PopoverRootContext {
  delayDuration: Ref<number | undefined>;
  disableClosingTrigger: Ref<boolean | undefined>;
  disabled: Ref<boolean | undefined>;
  disableHoverableContent: Ref<boolean | undefined>;
  ignoreNonKeyboardFocus: Ref<boolean | undefined>;

  isPointerInTransitRef: Ref<boolean>;
  isOpenDelayed: Ref<boolean>;
  onOpen: () => void;
  onClose: () => void;
}
const [injectPopoverRootContextEx, providePopoverRootContextEx] =
  createContext<PopoverRootContextEx>('PopoverProviderEx');
export { injectPopoverRootContextEx };

export interface PopoverProviderExProps {
  delayDuration?: number;
  disableClosingTrigger?: boolean;
  disabled?: boolean;
  disableHoverableContent?: boolean;
  ignoreNonKeyboardFocus?: boolean;
}

export const PopoverProviderEx = defineComponent<PopoverProviderExProps>({
  name: 'PopoverProviderEx',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    disableClosingTrigger: {
      type: Boolean,
      default: false,
    },
    disableHoverableContent: {
      type: Boolean,
      default: false,
    },
    ignoreNonKeyboardFocus: {
      type: Boolean,
      default: false,
    },
    delayDuration: {
      type: Number,
      default: 0,
    },
    skipDelayDuration: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots }) {
    const propsRefs = toRefs(props);
    const popoverRootContext = injectPopoverRootContext();
    const isOpenDelayed = ref(true);
    // Reset the inTransit state if idle/scrolled.
    const isPointerInTransitRef = ref(false);

    const { start: startOpenTimer, stop: clearOpenTimer } = useTimeoutFn(
      () => {
        popoverRootContext.onOpenChange(true);
      },
      propsRefs.delayDuration as Ref<number>,
      { immediate: false }
    );

    const handleOpen = () => {
      if (isOpenDelayed.value) {
        startOpenTimer();
      } else {
        popoverRootContext.onOpenChange(true);
      }
    };
    const handleClose = () => {
      clearOpenTimer();
      popoverRootContext.onOpenChange(false);
    };

    providePopoverRootContextEx({
      ...popoverRootContext,
      ...propsRefs,
      isOpenDelayed,
      isPointerInTransitRef,
      onOpen: handleOpen,
      onClose: handleClose,
    });
    return () => slots.default?.();
  },
});
