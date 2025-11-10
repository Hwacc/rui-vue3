<script setup lang="ts" generic="T extends Record<string, any>">
import { TreeItem, TreeRoot } from '.'

const props = defineProps<{ data: T[] }>()
</script>

<template>
  <TreeRoot :data="props.data">
    <template #default="{ renderNodes }">
      <TreeItem
        v-for="node in renderNodes"
        :key="node.key"
        :data="node"
      />
    </template>
  </TreeRoot>
</template>
