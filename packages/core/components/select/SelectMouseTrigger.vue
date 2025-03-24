<!-- 
HACK: 
Sometimes, we need a simple Trigger that is used only in the browser of a single environment. 
This Select component only responds to mouse events and allows normal event bubbling, 
so we have the opportunity to capture mouse events internally. 
-->

<script lang="ts">
import type { PrimitiveProps, ReferenceElement } from 'reka-ui';
import { selectTriggerVariants } from '.';
import { cn } from '@/lib/utils';
import { isEmpty } from 'lodash-es';
const OPEN_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown'];
interface PopperAnchorProps extends PrimitiveProps {
  reference?: ReferenceElement;
}
export interface SelectTriggerProps extends PopperAnchorProps {
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { computed, HTMLAttributes, onMounted, unref } from 'vue';
import { injectSelectRootContext, Primitive, useForwardExpose, useId, SelectIcon } from 'reka-ui';
//@ts-ignore
import { _ as PopperAnchor } from '../../node_modules/reka-ui/dist/Popper/PopperAnchor.js';

defineOptions({
  name: 'SelectMouseTrigger',
});

const {
  as = 'button',
  asChild,
  class: propsClass,
  ...props
} = defineProps<
  SelectTriggerProps & {
    class?: HTMLAttributes['class'];
  }
>();

const rootContext = injectSelectRootContext();
const { forwardRef, currentElement: triggerElement } = useForwardExpose();

const isDisabled = computed(() => rootContext.disabled?.value || props.disabled);
const classNames = computed(() => {
  return cn(selectTriggerVariants(), propsClass);
});

rootContext.contentId ||= useId(undefined, 'reka-select-content');

onMounted(() => {
  rootContext.onTriggerChange(triggerElement.value);
});
</script>

<template>
  <PopperAnchor as-child :reference="reference">
    <Primitive
      :class="classNames"
      :ref="forwardRef"
      role="combobox"
      :type="as === 'button' ? 'button' : undefined"
      :aria-controls="rootContext.contentId"
      :aria-expanded="rootContext.open.value || false"
      :aria-required="rootContext.required?.value"
      aria-autocomplete="none"
      :disabled="isDisabled"
      :dir="rootContext?.dir.value"
      :data-state="rootContext?.open.value ? 'open' : 'closed'"
      :data-disabled="isDisabled ? '' : undefined"
      :data-placeholder="!isEmpty(rootContext.modelValue?.value) ? undefined : ''"
      :as-child="asChild"
      :as="as"
      @click="
        (event: MouseEvent) => {
          (event?.currentTarget as HTMLElement)?.focus();
          !isDisabled && rootContext.onOpenChange(true);
        }
      "
      @keydown="
        (event: any) => {
          const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
          if (!isModifierKey && event.key.length === 1) if (event.key === ' ') return;
          if (OPEN_KEYS.includes(event.key)) {
            !isDisabled && rootContext.onOpenChange(true);
            event.preventDefault();
          }
        }
      "
    >
      <slot />
      <slot name="icon" :v-bind="{ open: unref(rootContext.open) }">
        <SelectIcon as-child>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            view-box="0 0 7 3"
            :class="[
              'w-[.5rem]',
              'h-[.25rem]',
              'shrink-0',
              'fill-current',
              'stroke-current',
              'group-hover:fill-hff',
              'group-hover:stroke-hff',
              'transition-transform',
              unref(rootContext.open)
                ? ['animate-from', 'rotate-180', 'fill-hff', 'stroke-hff']
                : ['rotate-0'],
            ]"
          >
            <path d="M0 0 L3.5 3 L7 0 Z" />
          </svg>
        </SelectIcon>
      </slot>
    </Primitive>
  </PopperAnchor>
</template>
