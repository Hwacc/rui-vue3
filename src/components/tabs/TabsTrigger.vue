<script setup lang="ts">
import type { TabsTriggerProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { TabsTrigger, useForwardProps } from 'radix-vue';
import { computed } from 'vue';
import { tabsTriggerVariants } from '.';
import { injectTabsContext } from './Tabs.vue';

const { class: propsClass, ...props } = defineProps<
  TabsTriggerProps & { class?: HTMLAttributes['class'] }
>();

const { value, initTabTrigger } = injectTabsContext();
initTabTrigger();

const onClick = (e: any) => {};

const forwardedProps = useForwardProps(props);
const classNames = computed(() => {
  return cn(tabsTriggerVariants(), propsClass);
});
</script>

<template>
  <TabsTrigger v-bind="forwardedProps" :class="classNames" @click="onClick">
    <span class="truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
