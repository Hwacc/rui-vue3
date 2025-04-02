<script setup lang="ts">
import { cn } from '@/core/lib/utils';
import {
  injectTagsInputRootContext,
  TagsInputItem,
  type TagsInputItemProps,
  useForwardProps,
} from 'reka-ui';

import { useTemplateRef, type HTMLAttributes } from 'vue';
import { TagsInputItemVariants, tagsInputItemVariants } from '.';
import { injectTagsInputContext } from './TagsInput.vue';
import { onClickOutside } from '@vueuse/core';

const {
  class: propsClass,
  size = 'base',
  ...props
} = defineProps<
  TagsInputItemProps & { class?: HTMLAttributes['class']; size?: TagsInputItemVariants['size'] }
>();

const { modelValue, selectedElement } = injectTagsInputRootContext();
const { size: contextSize } = injectTagsInputContext();

const tagsItem = useTemplateRef('tags-item');
const keyDetector = useTemplateRef('key-detector');
onClickOutside(tagsItem, () => {
  selectedElement.value = undefined;
  keyDetector.value?.blur();
});

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItem
    v-bind="forwardedProps"
    :class="cn(tagsInputItemVariants({ size: contextSize ?? size }), propsClass)"
    :data-size="contextSize ?? size"
    ref="tags-item"
    @click="
      () => {
        selectedElement = tagsItem?.$el;
        keyDetector?.focus();
      }
    "
  >
    <slot />
    <input
      class="absolue z-[-1] size-0 outline-none"
      ref="key-detector"
      @keydown="
        (event) => {
          if (event.key === 'Backspace' || event.key === 'Delete') {
            modelValue = modelValue.filter((val) => val !== props.value);
          }
        }
      "
    />
  </TagsInputItem>
</template>
