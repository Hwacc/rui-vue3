<script setup lang="ts">
import type { VNode } from 'vue'
import type { SpinVariantsProps } from '.'
import { Primitive } from 'reka-ui'
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  spinIndicatorVariants,
  spinMaskVariants,
  spinTextVariants,
  spinVariants,
} from '.'

const {
  show,
  mode,
  size = 'base',
  unstyled,
  delay,
} = defineProps<{
  show?: boolean
  mode?: 'fullscreen'
  size?: SpinVariantsProps['size']
  unstyled?: boolean
  delay?: number
}>()

const { renderIcon }
  = inject<{
    renderIcon: (props: {
      mode?: SpinVariantsProps['mode']
      size?: SpinVariantsProps['size']
      unstyled?: boolean
    }) => VNode | null
  }>('SpinProvider') ?? {}

const isFullscreen = computed(() => mode === 'fullscreen')
const isVisible = ref(show)
let timeoutId: number | null = null
watch(
  () => show,
  (newVal) => {
    if (!newVal && delay) {
      timeoutId = window.setTimeout(() => {
        isVisible.value = false
        timeoutId = null
      }, delay)
    }
    else {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      isVisible.value = newVal
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (isFullscreen.value) {
    document.body.style.position = 'relative'
  }
})
onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  if (isFullscreen.value) {
    document.body.style.position = ''
  }
})
</script>

<template>
  <div v-show="isVisible" :class="spinVariants({ mode })">
    <div :class="spinMaskVariants()" />
    <div :class="spinIndicatorVariants()">
      <slot v-bind="{ mode, size, unstyled }">
        <component :is="renderIcon?.({ mode, size, unstyled })" />
      </slot>
      <Primitive
        :class="
          spinTextVariants({
            size,
            unstyled,
          })
        "
        :as-child="true"
      >
        <slot name="text" />
      </Primitive>
    </div>
  </div>
</template>
