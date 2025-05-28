<script lang="ts">
import type { FlattenedItem } from 'reka-ui'

interface TreeItemContentProps<T extends Record<string, any>> {
  item: FlattenedItem<T>
}
</script>

<script setup lang="ts" generic="T extends Record<string, any>">
const props = defineProps<TreeItemContentProps<T>>()
</script>

<template>
  <div>
    {{ props.item.value.title }}
  </div>
</template>
