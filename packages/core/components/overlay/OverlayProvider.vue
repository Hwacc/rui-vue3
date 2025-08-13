<script setup lang="ts">
import type { Overlay } from '@rui/core/composables/useOverlay'
import { useOverlay } from '@rui/core/composables/useOverlay'
import { computed } from 'vue'

const { overlays, unmount, close } = useOverlay()
const mountedOverlays = computed(() => overlays.filter((overlay: Overlay) => overlay.isMounted))

function onAfterLeave(id: symbol) {
  close(id)
  unmount(id)
}
function onClose(id: symbol, value: any) {
  close(id, value)
}
</script>

<template>
  <component
    :is="overlay.component"
    v-for="overlay in mountedOverlays"
    :key="overlay.id"
    v-bind="overlay.props"
    v-model:open="overlay.isOpen"
    @close="(value:any) => onClose(overlay.id, value)"
    @after-leave="onAfterLeave(overlay.id)"
  />
</template>
