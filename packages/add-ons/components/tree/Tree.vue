<script setup lang="ts">
import type { TreeEmits, TreeProps } from './interface'
import { TreeView } from '@grapoza/vue-tree'
import { useForwardPropsEmits } from '@rui/add-ons/lib/useFowardPropsEmits'

const props = defineProps<TreeProps>()
const emits = defineEmits<TreeEmits>()
defineSlots()

const forwared = useForwardPropsEmits(props, emits)
</script>

<template>
  <TreeView v-bind="forwared" />
</template>
