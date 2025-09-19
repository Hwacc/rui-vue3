<script lang="tsx" setup>
import type { SelectRootEmits, SelectRootProps } from 'reka-ui';
import { SelectRoot, useForwardPropsEmits } from 'reka-ui';
import { tvSelect } from '.';
import { defineComponent, HTMLAttributes, ref } from 'vue';
import { provideSelectRootContextEx } from './selectRootContextEx';

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  SelectRootProps & {
    class?: HTMLAttributes['class'];
    unstyled?: boolean;
  }
>();
const emits = defineEmits<SelectRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<script lang="tsx">
const Select = defineComponent({
  name: 'Select',
  props: {
    class: {
      type: String,
      default: '',
    },
    unstyled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const rootElement = ref<HTMLElement | undefined>(undefined);
    provideSelectRootContextEx({
      rootElement,
    });
    return () => {
      return (
        <div
          ref={rootElement}
          class={tvSelect({ unstyled: props.unstyled })}
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <Select>
      <slot />
    </Select>
  </SelectRoot>
</template>
