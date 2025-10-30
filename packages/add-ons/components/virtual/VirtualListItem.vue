<script lang="ts" generic="T" setup>
import { useTemplateRef, watch } from 'vue'
import { injectVirtualContext } from './VirtualRoot'

defineOptions({
  name: 'VirtualListItem',
})
const { data, dynamic, index } = defineProps<{ data?: T, dynamic?: boolean, index?: number }>()
defineSlots<{ default: { data: T, index?: number } }>()

const { virtualizer } = injectVirtualContext()
const el = useTemplateRef('el')
watch(el, (el) => {
  if (virtualizer?.value && el && dynamic)
    virtualizer.value.measureElement(el)
})
</script>

<template>
  <div
    v-bind="$attrs"
    ref="el"
    :data-index="index"
  >
    <slot
      :data="data"
      :index="index"
    />
  </div>
</template>
