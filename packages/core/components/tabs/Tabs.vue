<script lang="ts">
import { createContext } from 'reka-ui';
import { Ref } from 'vue';

export type TabsContext = {
  value: Ref<StringOrNumber | undefined>;
  index: Ref<number>;
  orientation: 'horizontal' | 'vertical';
  initTabList: () => void;
  initTabTrigger: () => void;
  tabsList: Ref<HTMLElement | undefined>;
  tabsTriggers: Array<{
    value: StringOrNumber;
    el: HTMLElement;
  }>;
};
export const [injectTabsContext, provideTabsContext] = createContext<TabsContext>('Tabs');
</script>

<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'reka-ui';
import { TabsRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, getCurrentInstance, HTMLAttributes, nextTick, reactive, ref } from 'vue';
import { cn } from '@/core/lib/utils';
import { tabsVariants } from '.';

const {
  modelValue,
  defaultValue,
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  TabsRootProps & {
    class?: HTMLAttributes['class'];
    unstyled?: boolean;
  }
>();
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
const index = computed(() => {
  return tabsTriggers.findIndex((item) => item.value === innerValue.value);
});
provideTabsContext({
  value: innerValue,
  index,
  orientation: props.orientation ?? 'horizontal',
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
  <TabsRoot
    :class="cn(tabsVariants(), propsClass)"
    v-bind="forwarded"
    :model-value="innerValue"
    @update:model-value="onUpdateModelValue"
  >
    <slot />
  </TabsRoot>
</template>
