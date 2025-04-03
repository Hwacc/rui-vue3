<script setup lang="ts">
import { cn } from '@/core/lib/utils';
import { X } from 'lucide-vue-next';
import { TagsInputItemDelete, type TagsInputItemDeleteProps, useForwardProps } from 'reka-ui';
import { type HTMLAttributes } from 'vue';
import { tagsInputItemDeleteVariants, TagsInputItemDeleteVariants } from '.';
import { injectTagsInputContextEx } from './TagsInputProviderEx';

const { class: propsClass, ...props } = defineProps<
  TagsInputItemDeleteProps & {
    class?: HTMLAttributes['class'];
    size?: TagsInputItemDeleteVariants['size'];
  }
>();

const { size: contextSize } = injectTagsInputContextEx();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItemDelete
    v-bind="forwardedProps"
    :class="cn(tagsInputItemDeleteVariants({ size: contextSize ?? size }), propsClass)"
    :data-size="contextSize ?? size"
  >
    <slot>
      <X />
    </slot>
  </TagsInputItemDelete>
</template>
