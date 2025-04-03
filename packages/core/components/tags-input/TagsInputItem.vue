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
import { injectTagsInputContextEx } from './TagsInputProviderEx';
import { onClickOutside } from '@vueuse/core';
import { useCollection } from '@/core/components/collection';
import { last } from 'lodash-es';

const {
  class: propsClass,
  size = 'base',
  ...props
} = defineProps<
  TagsInputItemProps & { class?: HTMLAttributes['class']; size?: TagsInputItemVariants['size'] }
>();

const { selectedElement, onInputKeydown, onRemoveValue } = injectTagsInputRootContext();
const { size: contextSize, tagsInputElement } = injectTagsInputContextEx();

const tagItem = useTemplateRef('tag-item');
const keyDetector = useTemplateRef('key-detector');
onClickOutside(tagItem, () => {
  // if click outside, then make detector blur
  selectedElement.value = undefined;
  keyDetector.value?.blur();
});

const { getItems, CollectionItem } = useCollection({ key: 'RuiTagsInputCollection' });
const handleOnKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Backspace' || event.key === 'Delete') {
    // if delete
    const collection = getItems();
    const lastTag = last(collection)?.ref;
    if (selectedElement.value) {
      const index = getItems().findIndex((i) => i.ref === tagItem.value?.$el);
      onRemoveValue(index);
      selectedElement.value =
        selectedElement.value === lastTag ? collection[index - 1]?.ref : collection[index + 1]?.ref;
      // if selected element exist make it in focus
      if(selectedElement.value) selectedElement.value?.click();
      // else we focus on input
      else tagsInputElement.value?.focus();
    } else if (event.key === 'Backspace') {
      selectedElement.value = lastTag;
    }
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    // if arrow control
    switch (event.key) {
      case 'ArrowLeft':
        onInputKeydown(event);
        break;
      case 'ArrowRight':
        onInputKeydown(event);
        if (!selectedElement.value) {
          // at last
          tagsInputElement.value?.focus();
        }
        break;
    }
  } else if (event.key === 'Tab') {
    // if tab select
    selectedElement.value = tagItem?.value?.$el;
  }
};

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CollectionItem :value="props.value">
    <TagsInputItem
      v-bind="forwardedProps"
      :class="cn(tagsInputItemVariants({ size: contextSize ?? size }), propsClass)"
      :data-size="contextSize ?? size"
      ref="tag-item"
      @click="
        () => {
          selectedElement = tagItem?.$el;
          keyDetector?.focus();
        }
      "
    >
      <slot />
    </TagsInputItem>
  </CollectionItem>
  <input
    class="absolue z-[-1] size-0 outline-none"
    ref="key-detector"
    readonly
    @keydown="handleOnKeydown"
  />
</template>
