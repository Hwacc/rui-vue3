<script lang="ts" setup>
import type { TabsIndicatorProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { TabsIndicator, useForwardProps } from 'reka-ui';
import { tabsIndicatorVariants } from '.';

const { class: propsClass, ...props } = defineProps<
  TabsIndicatorProps & { class?: HTMLAttributes['class'] }
>();
const forwardedProps = useForwardProps(props);

const classNames = computed(() => {
  return cn(tabsIndicatorVariants(), propsClass);
});
</script>

<template>
  <TabsIndicator v-bind="forwardedProps" :class="classNames">
    <slot>
      <div class="bg-rz-green w-full h-full" />
    </slot>
  </TabsIndicator>
</template>
