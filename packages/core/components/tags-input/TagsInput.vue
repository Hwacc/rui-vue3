<script lang="ts">
const [injectTagsInputContext, provideTagsInputContext] = createContext<{
  size?: TagsInputVariants['size'];
}>('TagsInput');
export { injectTagsInputContext };
</script>

<script setup lang="ts">
import { cn } from '@/core/lib/utils';
import {
  createContext,
  TagsInputRoot,
  type TagsInputRootEmits,
  type TagsInputRootProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { type HTMLAttributes } from 'vue';
import { TagsInputVariants, tagsInputVariants } from '.';

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
provideTagsInputContext({
  size,
});
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TagsInputRoot v-bind="forwarded" :class="cn(tagsInputVariants({ size }), propsClass)">
    <slot />
  </TagsInputRoot>
</template>
