<script setup lang="ts">
import { cn } from '@/core/lib/utils';
import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'reka-ui';

import { type HTMLAttributes } from 'vue';
import { TagsInputItemVariants, tagsInputItemVariants } from '.';
import { injectTagsInputContext } from './TagsInput.vue';

const {
  class: propsClass,
  size = 'base',
  ...props
} = defineProps<
  TagsInputItemProps & { class?: HTMLAttributes['class']; size?: TagsInputItemVariants['size'] }
>();

const { size: contextSize } = injectTagsInputContext();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItem
    v-bind="forwardedProps"
    :class="cn(tagsInputItemVariants({ size: contextSize ?? size }), propsClass)"
  >
    <slot />
  </TagsInputItem>
</template>
