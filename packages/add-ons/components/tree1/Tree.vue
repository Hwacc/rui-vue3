<script setup lang="ts">
import type { TreeProps } from '@wsfe/vue-tree/types/components/Tree.vue.d.ts'
import { useForwardPropsEmits } from '@rui/add-ons/lib/useFowardPropsEmits'
import VTree from '@wsfe/vue-tree'

const props = defineProps<TreeProps>()

const forwared = useForwardPropsEmits(props)
</script>

<template>
  <VTree v-bind="forwared" />
</template>
