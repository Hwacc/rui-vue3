<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { TabsTrigger, useForwardProps } from 'reka-ui';
import { computed, onMounted } from 'vue';
import { tabsTriggerVariants, TabsTriggerVariantsProps } from '.';
import { injectTabsContext } from './Tabs.vue';

const {
  class: propsClass,
  size = 'default',
  disableRuiClass,
  ...props
} = defineProps<
  TabsTriggerProps & {
    class?: HTMLAttributes['class'];
    size?: TabsTriggerVariantsProps['size'];
    disableRuiClass?: boolean;
  }
>();

const { initTabTrigger } = injectTabsContext();

onMounted(() => {
  initTabTrigger();
});

const forwardedProps = useForwardProps(props);
const classNames = computed(() => {
  return cn(tabsTriggerVariants({ size, disableRuiClass }), propsClass);
});
</script>

<template>
  <TabsTrigger v-bind="forwardedProps" :class="classNames">
    <span class="truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
