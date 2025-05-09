<script setup lang="ts">
import type { TagsInputRootEmits, TagsInputRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TagsInputVariants } from '.'
import { cn } from '@rui/core/lib/utils'
import { TagsInputRoot, useForwardPropsEmits } from 'reka-ui'
import { tagsInputVariants } from '.'
import { useCollection } from '../collection'
import { TagsInputProviderEx } from './TagsInputProviderEx'

const {
  class: propsClass,
  size = 'base',
  ...props
} = defineProps<
  TagsInputRootProps & {
    class?: HTMLAttributes['class']
    size?: TagsInputVariants['size']
  }
>()
const emits = defineEmits<TagsInputRootEmits>()

const { CollectionSlot } = useCollection({
  key: 'RuiTagsInputCollection',
  isProvider: true,
})
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <CollectionSlot>
    <TagsInputRoot
      v-bind="forwarded"
      :class="cn(tagsInputVariants({ size }), propsClass)"
      :data-size="size"
    >
      <TagsInputProviderEx :size="size">
        <slot />
      </TagsInputProviderEx>
    </TagsInputRoot>
  </CollectionSlot>
</template>
