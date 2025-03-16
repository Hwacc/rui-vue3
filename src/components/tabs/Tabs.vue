<script lang="ts">
import { createContext } from 'reka-ui';
import { Ref } from 'vue';

export type TabsContext = {
  value: Ref<StringOrNumber | undefined>;
  initTabList: () => void;
  initTabTrigger: () => void;
  tabsList: Ref<HTMLElement | undefined>;
  tabsTriggers: Array<{
    value: StringOrNumber;
    el: HTMLElement;
  }>;
};
export const [injectTabsContext, provideTabsContext] = createContext<TabsContext>('TabsContext');
</script>

<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'reka-ui';
import { TabsRoot, useForwardPropsEmits } from 'reka-ui';
import { getCurrentInstance, nextTick, reactive, ref } from 'vue';

const { modelValue, defaultValue, ...props } = defineProps<TabsRootProps>();
const innerValue = ref<StringOrNumber | undefined>(modelValue ?? defaultValue);
const emits = defineEmits<TabsRootEmits>();
const onUpdateModelValue = (value: StringOrNumber) => {
  innerValue.value = value;
  emits('update:modelValue', value);
};

const tabsList = ref<HTMLElement>();
const tabsTriggers = reactive<
  Array<{
    value: StringOrNumber;
    el: HTMLElement;
  }>
>([]);

provideTabsContext({
  value: innerValue,
  initTabList: function (this: any) {
    const instance = getCurrentInstance.call(this);
    nextTick(() => {
      tabsList.value = instance?.vnode?.el as HTMLElement;
    });
  },
  initTabTrigger: function () {
    const instance = getCurrentInstance.call(this);
    nextTick(() => {
      tabsTriggers.push({
        value: instance?.props?.value as StringOrNumber,
        el: instance?.vnode?.el as HTMLElement,
      });
    });
  },
  tabsList,
  tabsTriggers,
});
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TabsRoot v-bind="forwarded" :model-value="innerValue" @update:model-value="onUpdateModelValue">
    <slot />
  </TabsRoot>
</template>
