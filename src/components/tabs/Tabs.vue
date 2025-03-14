<script lang="ts">
import { StringOrNumber } from 'node_modules/radix-vue/dist/shared/types';
import { createContext } from 'radix-vue';
import { Ref } from 'vue';

export type TabsContext = {
  value: Ref<StringOrNumber | undefined>;
  initTabList: () => void;
  initTabTrigger: () => void;
  list: Ref<HTMLElement | undefined>;
  triggers: Array<{
    value: StringOrNumber;
    el: HTMLElement;
  }>;
};
export const [injectTabsContext, provideTabsContext] = createContext<TabsContext>('TabsContext');
</script>

<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'radix-vue';
import { TabsRoot, useForwardPropsEmits } from 'radix-vue';
import { getCurrentInstance, nextTick, reactive, ref } from 'vue';

const { modelValue, defaultValue, ...props } = defineProps<TabsRootProps>();
const innerValue = ref<StringOrNumber | undefined>(modelValue ?? defaultValue);
const emits = defineEmits<TabsRootEmits>();
const onUpdateModelValue = (value: StringOrNumber) => {
  innerValue.value = value;
  emits('update:modelValue', value);
};

const list = ref<HTMLElement>();
const triggers = reactive<
  Array<{
    value: StringOrNumber;
    el: HTMLElement;
  }>
>([]);

provideTabsContext({
  value: innerValue,
  initTabList: function (this: any) {
    const instance = getCurrentInstance.call(this);
    console.log('instance', instance);
    nextTick(() => {
      list.value = instance?.vnode?.el as HTMLElement;
    });
  },
  initTabTrigger: function () {
    const instance = getCurrentInstance.call(this);
    nextTick(() => {
      triggers.push({
        value: instance?.props?.value as StringOrNumber,
        el: instance?.vnode?.el as HTMLElement,
      });
    });
  },
  triggers,
  list,
});
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TabsRoot v-bind="forwarded" :model-value="innerValue" @update:model-value="onUpdateModelValue">
    <slot />
  </TabsRoot>
</template>
