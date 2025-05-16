<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import {
  injectSpinContext,
  spinIndicatorVariants,
  spinMaskVariants,
  spinVariants,
} from '.'

const { modelValue, mode } = defineProps<{
  modelValue?: boolean
  mode?: 'fullscreen'
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { icon } = injectSpinContext()

const loading = computed({
  get: () => modelValue,
  set: val => emit('update:modelValue', val),
})
const isFullscreen = computed(() => mode === 'fullscreen')

onMounted(() => {
  if (isFullscreen.value) {
    document.body.style.position = 'relative'
  }
})
onBeforeUnmount(() => {
  if (isFullscreen.value) {
    document.body.style.position = ''
  }
})
</script>

<template>
  <div v-show="loading" :class="spinVariants({ mode })">
    <div :class="spinMaskVariants()" />
    <div :class="spinIndicatorVariants()">
      <slot>
        <icon />
      </slot>
    </div>
  </div>
</template>
