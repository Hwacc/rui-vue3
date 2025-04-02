<script setup lang="ts">
import { cn } from '@/core/lib/utils';
import { TagsInputItemText, type TagsInputItemTextProps, useForwardProps } from 'reka-ui';
import { type HTMLAttributes } from 'vue';
import { TagsInputItemTextVariants, tagsInputItemTextVariants } from '.';
import { injectTagsInputContext } from './TagsInput.vue';

const {
  class: propsClass,
  size = 'base',
  ...props
} = defineProps<
  TagsInputItemTextProps & {
    class?: HTMLAttributes['class'];
    size?: TagsInputItemTextVariants['size'];
  }
>();
const { size: contextSize } = injectTagsInputContext();
const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItemText
    v-bind="forwardedProps"
    :class="cn(tagsInputItemTextVariants({ size: contextSize ?? size }), propsClass)"
  />
</template>
