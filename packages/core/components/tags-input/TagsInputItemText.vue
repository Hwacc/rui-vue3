<script setup lang="ts">
import type { TagsInputItemTextProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TagsInputItemTextVariants } from '.'
import { cn } from '@rui/core/lib/utils'
import { TagsInputItemText, useForwardProps } from 'reka-ui'
import { tagsInputItemTextVariants } from '.'
import { injectTagsInputContextEx } from './TagsInputProviderEx'

const {
  class: propsClass,
  size = 'base',
  ...props
} = defineProps<
  TagsInputItemTextProps & {
    class?: HTMLAttributes['class']
    size?: TagsInputItemTextVariants['size']
  }
>()
const { size: contextSize } = injectTagsInputContextEx()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <TagsInputItemText
    v-bind="forwardedProps"
    :class="cn(tagsInputItemTextVariants({ size: contextSize ?? size }), propsClass)"
    :data-size="contextSize ?? size"
  />
</template>
