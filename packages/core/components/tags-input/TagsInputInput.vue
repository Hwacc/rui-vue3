<script setup lang="ts">
import { cn } from '@/core/lib/utils';
import { TagsInputInput, type TagsInputInputProps, useForwardProps } from 'reka-ui';
import { ref, watch, type HTMLAttributes } from 'vue';
import { TagsInputInnerVariants, tagsInputInnerVariants } from '.';
import { injectTagsInputContextEx } from './TagsInputProviderEx';

const {
  class: propsClass,
  size = 'base',
  ...props
} = defineProps<
  TagsInputInputProps & { class?: HTMLAttributes['class']; size?: TagsInputInnerVariants['size'] }
>();
const { size: contextSize, tagsInputElement } = injectTagsInputContextEx();
const input = ref();

watch(input, (val) => {
  tagsInputElement.value = val?.$el;
});

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputInput
    v-bind="forwardedProps"
    ref="input"
    :class="cn(tagsInputInnerVariants({ size: contextSize ?? size }), propsClass)"
    :data-size="contextSize ?? size"
  />
</template>
