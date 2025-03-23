<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { injectSelectRootContext, SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui';
import { computed } from 'vue';
import { selectTriggerVariants } from '.';

const { class: propsClass, ...props } = defineProps<
  SelectTriggerProps & { class?: HTMLAttributes['class'] }
>();

const { open } = injectSelectRootContext();

const classNames = computed(() => {
  return cn(selectTriggerVariants(), propsClass);
});

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectTrigger v-bind="forwardedProps" :class="classNames">
    <slot />
    <slot name="icon" :v-bind="{ open }">
      <SelectIcon as-child>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          view-box="0 0 7 3"
          :class="[
            'w-[.4375rem]',
            'h-[.1875rem]',
            'shrink-0',
            'fill-current',
            'stroke-current',
            'group-hover:fill-hff',
            'group-hover:stroke-hff',
            'transition-transform',
            open && [
              'animate-from',
              'rotate-180',
              'fill-hff',
              'stroke-hff',
            ],
            !open && [
              'rotate-0',
            ]
          ]"
        >
          <path d="M0 0 L3.5 3 L7 0 Z" />
        </svg>
      </SelectIcon>
    </slot>
  </SelectTrigger>
</template>
