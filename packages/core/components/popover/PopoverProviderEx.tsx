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
  skipDelayDuration: Ref<number | undefined>;

  isPointerInTransitRef: Ref<boolean>;
  isOpenDelayed: Ref<boolean>;
  onOpen: () => void;
  onClose: () => void;
  onSkipOpen: () => void;
  onSkipClose: () => void;
  onTriggerEnter: () => void;
  onTriggerLeave: () => void;
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
  skipDelayDuration?: number;
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
    const { start: startSkipTimer, stop: clearSkipTimer } = useTimeoutFn(
      () => {
        isOpenDelayed.value = true;
      },
      propsRefs.skipDelayDuration as Ref<number>,
      { immediate: false }
    );

    const handleOpen = () => {
      clearOpenTimer();
      popoverRootContext.onOpenChange(true);
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
      onSkipOpen: () => {
        clearSkipTimer();
        isOpenDelayed.value = false;
      },
      onSkipClose: () => {
        startSkipTimer();
      },
      onTriggerEnter: () => {
        if (isOpenDelayed.value) startOpenTimer();
        else handleOpen();
      },
      onTriggerLeave() {
        if (propsRefs.disableHoverableContent.value) handleClose();
        else {
          // Clear the timer in case the pointer leaves the trigger before the tooltip is opened.
          clearOpenTimer();
          handleClose();
        }
      },
    });
    return () => slots.default?.();
  },
});
