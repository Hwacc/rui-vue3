<script lang="tsx" setup>
import type { DropdownMenuRootProps, DropdownMenuRootEmits } from 'reka-ui';
import { useForwardPropsEmits, DropdownMenuRoot } from 'reka-ui';
import { defineComponent, HTMLAttributes, PropType, ref } from 'vue';
import { tvDropdownMenu } from '.';
import { provideDropdownMenuRootContextEx } from './DropdownMenuRootContextEx';

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  DropdownMenuRootProps & {
    class?: HTMLAttributes['class'];
    unstyled?: boolean;
  }
>();

const emits = defineEmits<DropdownMenuRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<script lang="tsx">
const DropdownMenu = defineComponent({
  name: 'DropdownMenu',
  props: {
    class: {
      type: [String, Object, Array] as PropType<HTMLAttributes['class']>,
      default: '',
    },
    unstyled: {
      type: Boolean,
      default: false,
    },
  },
  setup(subProps, { slots: subSlots }) {
    const rootElement = ref<HTMLElement | undefined>(undefined);
    provideDropdownMenuRootContextEx({
      rootElement,
    });
    return () => {
      return (
        <div
          ref={rootElement}
          class={tvDropdownMenu({ class: subProps.class, unstyled: subProps.unstyled })}
        >
          {subSlots.default?.()}
        </div>
      );
    };
  },
});
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <DropdownMenu
      :class="propsClass"
      :unstyled="unstyled"
    >
      <slot />
    </DropdownMenu>
  </DropdownMenuRoot>
</template>
