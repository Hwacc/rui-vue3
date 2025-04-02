<script setup lang="ts">
import { cn } from '@/core/lib/utils';
import { TagsInputInput, type TagsInputInputProps, useForwardProps } from 'reka-ui';
import { type HTMLAttributes } from 'vue';
import { TagsInputInnerVariants, tagsInputInnerVariants } from '.';
import { injectTagsInputContext } from './TagsInput.vue';

const {
  class: propsClass,
  size = 'default',
  ...props
} = defineProps<
  TagsInputInputProps & { class?: HTMLAttributes['class']; size?: TagsInputInnerVariants['size'] }
>();
const { size: contextSize } = injectTagsInputContext();
const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputInput
    v-bind="forwardedProps"
    :class="cn(tagsInputInnerVariants({ size: contextSize ?? size }), propsClass)"
    @focus="(e: Event) => {
      console.log('focus', e);
    }"
    @blur="
      () => {
        console.log('blur');
      }
    "
  />
</template>
