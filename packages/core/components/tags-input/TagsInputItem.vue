<script setup lang="ts">
import type { TagsInputItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import type { TagsInputItemVariants } from '.'
import { useCollection } from '@rui/core/components/collection'
import { cn } from '@rui/core/lib/utils'
import { onClickOutside } from '@vueuse/core'
import { last } from 'lodash-es'
import {
  injectTagsInputRootContext,
  TagsInputItem,
  useForwardProps,
} from 'reka-ui'
import { useTemplateRef } from 'vue'
import { tagsInputItemVariants } from '.'
import { injectTagsInputContextEx } from './TagsInputProviderEx'

const {
  class: propsClass,
  size = 'base',
  ...props
} = defineProps<
  TagsInputItemProps & {
    class?: HTMLAttributes['class']
    size?: TagsInputItemVariants['size']
  }
>()

const { selectedElement, onInputKeydown, onRemoveValue }
  = injectTagsInputRootContext()
const { size: contextSize, tagsInputElement } = injectTagsInputContextEx()

const tagItem = useTemplateRef('tag-item')
const keyDetector = useTemplateRef('key-detector')
onClickOutside(tagItem, () => {
  // if click outside, then make detector blur
  selectedElement.value = undefined
  keyDetector.value?.blur()
})

const { getItems, CollectionItem } = useCollection({
  key: 'RuiTagsInputCollection',
})
function handleOnKeydown(event: KeyboardEvent) {
  if (event.key === 'Backspace' || event.key === 'Delete') {
    // if delete
    const collection = getItems()
    const lastTag = last(collection)?.ref
    if (selectedElement.value) {
      const index = getItems().findIndex(i => i.ref === tagItem.value?.$el)
      onRemoveValue(index)
      selectedElement.value
        = selectedElement.value === lastTag
          ? collection[index - 1]?.ref
          : collection[index + 1]?.ref
      // if selected element exist make it in focus
      if (selectedElement.value)
        selectedElement.value?.click()
      // else we focus on input
      else tagsInputElement.value?.focus()
    }
    else if (event.key === 'Backspace') {
      selectedElement.value = lastTag
    }
  }
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    // if arrow control
    switch (event.key) {
      case 'ArrowLeft':
        onInputKeydown(event)
        break
      case 'ArrowRight':
        onInputKeydown(event)
        if (!selectedElement.value) {
          // at last
          tagsInputElement.value?.focus()
        }
        break
    }
  }
  else if (event.key === 'Tab') {
    // if tab select
    selectedElement.value = tagItem?.value?.$el
  }
}

const forwarded = useForwardProps(props)
</script>

<template>
  <CollectionItem :value="props.value">
    <TagsInputItem
      v-bind="forwarded"
      ref="tag-item"
      :class="
        cn(tagsInputItemVariants({ size: contextSize ?? size }), propsClass)
      "
      :data-size="contextSize ?? size"
      @click="
        () => {
          selectedElement = tagItem?.$el
          keyDetector?.focus()
        }
      "
    >
      <slot />
    </TagsInputItem>
  </CollectionItem>
  <input
    ref="key-detector"
    class="absolue z-[-1] size-0 outline-none"
    readonly
    @keydown="handleOnKeydown"
  >
</template>
