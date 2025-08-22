<script setup lang="ts">
import type { TagsInputInputProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TagsInputInnerVariants } from '.'
import { cn } from '@rui/core/lib/utils'
import { TagsInputInput, useForwardProps } from 'reka-ui'
import { ref, watch } from 'vue'
import { tagsInputInnerVariants } from '.'
import { injectTagsInputContextEx } from './TagsInputProviderEx'

const {
  class: propsClass,
  size = 'base',
  ...props
} = defineProps<
  TagsInputInputProps & { class?: HTMLAttributes['class'], size?: TagsInputInnerVariants['size'] }
>()
const { size: contextSize, tagsInputElement } = injectTagsInputContextEx()
const input = ref()

watch(input, (val) => {
  tagsInputElement.value = val?.$el
})

const forwarded = useForwardProps(props)
</script>

<template>
  <TagsInputInput
    v-bind="forwarded"
    ref="input"
    :class="cn(tagsInputInnerVariants({ size: contextSize ?? size }), propsClass)"
    :data-size="contextSize ?? size"
  />
</template>
