<script lang="ts" generic="T" setup>
import { useTemplateRef, watch } from 'vue'
import { injectVirtualContext } from './VirtualRoot'

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
  >
    <slot
      :data="data"
      :index="index"
    />
  </div>
</template>
