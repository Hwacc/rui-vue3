<script setup lang="ts">
import { ScrollArea, ScrollBar } from '@/core/components/scroll-area'
import { injectTagsInputRootContext } from 'reka-ui'
import { HTMLAttributes, nextTick, useTemplateRef, watch } from 'vue'
import { tagsItemScrollHorizontalVariants } from '.'
import { ScrollBarVariants } from '@/core/components/scroll-area'
import { cn } from '@/core/lib/utils'

const {
  class: propsClass,
  size = 'sm',
  unstyled
} = defineProps<{
  class?: HTMLAttributes['class']
  size?: ScrollBarVariants['size']
  unstyled?: boolean
}>()
const { modelValue, selectedElement } = injectTagsInputRootContext()
const scrollArea = useTemplateRef('scroll-area')

watch(selectedElement, async () => {
  await nextTick()
  selectedElement.value?.scrollIntoView({
    behavior: 'smooth'
  })
})

watch(modelValue, async (newVal, oldVal) => {
  if (scrollArea.value && newVal.length > oldVal.length) {
    // add new
    await nextTick()
    ;(scrollArea.value as any).viewport?.scrollTo({
      left: 9999, // scroll to end
      behavior: 'smooth'
    })
  }
})
</script>

<template>
  <ScrollArea
    :class="
      cn(
        tagsItemScrollHorizontalVariants({ size, unstyled }),
        propsClass
      )
    "
    ref="scroll-area"
  >
    <div class="flex items-center gap-2" tabindex="-1">
      <slot />
    </div>
    <ScrollBar orientation="horizontal" size="sm"  tabindex="-1" />
  </ScrollArea>
</template>
