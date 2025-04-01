<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { injectSelectRootContext, SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui';
import { computed, nextTick, ref, watch } from 'vue';
import { selectTriggerVariants, selectTriangleVariants } from '.';
import { isEmpty } from 'lodash-es';

const {
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<
  SelectTriggerProps & { class?: HTMLAttributes['class']; disableRuiClass?: boolean }
>();

const { open, modelValue } = injectSelectRootContext();

const classNames = computed(() => {
  return cn(selectTriggerVariants({ disableRuiClass }), propsClass);
});

const triggerRef = ref<{ $el: HTMLElement } | null>();
watch(
  modelValue,
  async (val) => {
    await nextTick();
    if (isEmpty(val)) {
      triggerRef.value?.$el?.setAttribute('data-placeholder', '');
    } else {
      triggerRef.value?.$el?.removeAttribute('data-placeholder');
    }
  },
  { immediate: true }
);
const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectTrigger v-bind="forwardedProps" :class="classNames" ref="triggerRef">
    <slot />
    <slot name="icon" :v-bind="{ open }">
      <SelectIcon
        as="i"
        :class="selectTriangleVariants({ disableRuiClass })"
        :data-state="open ? 'open' : 'closed'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          view-box="0 0 7 3"
          :class="[
            'w-[.5rem]',
            'h-[.25rem]',
            'shrink-0',
            'transition-transform',
            open && ['animate-from', 'rotate-180'],
            !open && ['rotate-0'],
          ]"
        >
          <path d="M0 0 L3.5 3 L7 0 Z" />
        </svg>
      </SelectIcon>
    </slot>
  </SelectTrigger>
</template>
