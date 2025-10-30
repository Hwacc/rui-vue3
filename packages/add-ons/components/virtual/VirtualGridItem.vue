<script lang="ts" generic="T" setup>
import { useTemplateRef, watch } from 'vue'
import { injectVirtualContext } from '.'

defineOptions({
  name: 'VirtualGridItem',
})
const { data, index, rowIndex, colIndex } = defineProps<{
  data?: T
  index?: number
  rowIndex?: number
  colIndex?: number
}>()
defineSlots<{
  default: {
    data: T
    index?: number
    rowIndex?: number
    colIndex?: number
  }
}>()

const { columnVirtualizer } = injectVirtualContext()
const el = useTemplateRef('el')
watch(el, (el) => {
  if (columnVirtualizer?.value && el)
    columnVirtualizer.value.measureElement(el)
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
      :row-index="rowIndex"
      :col-index="colIndex"
    />
  </div>
</template>
