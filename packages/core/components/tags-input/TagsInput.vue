<script setup lang="ts">
import { cn } from '@/core/lib/utils';
import {
  TagsInputRoot,
  type TagsInputRootEmits,
  type TagsInputRootProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { type HTMLAttributes } from 'vue';
import { TagsInputVariants, tagsInputVariants } from '.';
import { TagsInputProviderEx } from './TagsInputProviderEx';
import { useCollection } from '../collection';

const {
  class: propsClass,
  size = 'base',
  ...props
} = defineProps<
  TagsInputRootProps & {
    class?: HTMLAttributes['class'];
    size?: TagsInputVariants['size'];
  }
>();
const emits = defineEmits<TagsInputRootEmits>();

const { CollectionSlot } = useCollection({
  key: 'RuiTagsInputCollection',
  isProvider: true,
});
const forwarded = useForwardPropsEmits(props, emits);
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
