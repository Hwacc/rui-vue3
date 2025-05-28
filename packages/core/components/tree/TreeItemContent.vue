<script lang="ts">
import type { FlattenedItem } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Checkbox } from '@rui/core/components/checkbox'
import { cn } from '@rui/core/lib/utils'
import { ChevronDown, File, Folder, FolderOpen } from 'lucide-vue-next'
import { useForwardProps } from 'reka-ui'
import { watch } from 'vue'
import { treeItemContentVariants } from '.'

interface TreeItemContentProps<T extends Record<string, any>> {
  item: FlattenedItem<T>
}
</script>

<script setup lang="ts" generic="T extends Record<string, any>">
const {
  class: propsClass,
  unstyled,
  item,
  isExpanded = false,
  isSelected = false,
  isIndeterminate = false,
  handleToggle = () => {},
  handleSelect = () => {},
  ...props
} = defineProps<
  TreeItemContentProps<T> & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    isExpanded?: boolean
    isSelected?: boolean
    isIndeterminate?: boolean
    handleToggle?: () => void
    handleSelect?: () => void
  }
>()

watch(
  () => isSelected,
  (value) => {
    console.log(item.value.title, 'isSelected', value)
  },
)

watch(
  () => isIndeterminate,
  (value) => {
    console.log(item.value.title, 'isIndeterminate', value)
  },
)

const forward = useForwardProps(props)
</script>

<template>
  <div
    :class="cn(treeItemContentVariants({ unstyled }), propsClass)"
    v-bind="forward"
  >
    <Checkbox
      :model-value="isIndeterminate ? 'indeterminate' : isSelected"
      stop-propagation
      @update:model-value="
        (e) => {
          console.log(item.value.title, 'handleSelect', e, item.value)
          handleSelect()
        }
      "
    />
    <slot
      name="icon"
      v-bind="item"
    >
      <component
        :is="isExpanded ? FolderOpen : Folder"
        v-if="item.hasChildren"
      />
      <File v-else />
    </slot>
    <p>{{ item.value.title }}</p>
    <ChevronDown v-if="item.hasChildren" />
  </div>
</template>
