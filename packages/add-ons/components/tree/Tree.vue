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
  <TreeView v-bind="forwared">
    <template
      #checkbox="{ metaModel, inputId, checkboxChangeHandler }"
    >
      <label :for="inputId" :title="metaModel.title">
        <input
          :id="inputId"
          v-model="metaModel.state.input.value"
          type="checkbox"
          :disabled="metaModel.state.input.disabled"
          @change="checkboxChangeHandler"
        >
        <em style="max-width: 6rem">{{ metaModel.data[metaModel.labelProperty] }}. This is custom slot
          content.</em>
      </label>
    </template>
  </TreeView>
</template>
