<script lang="tsx" setup>
import type { HTMLAttributes } from 'vue'
import type { PositionStrategy } from './MenuTransferContext'
import { cn } from '@rui/core/lib/utils'
import { ref } from 'vue'
import { provideMenuTransferContext } from './MenuTransferContext'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const rootElement = ref<HTMLElement | undefined>()
const positionStrategy = ref<PositionStrategy>('fixed')
provideMenuTransferContext({
  rootElement,
  positionStrategy,
})
</script>

<template>
  <div
    ref="rootElement"
    :class="cn(positionStrategy === 'absolute' && 'relative', props.class)"
  >
    <slot />
  </div>
</template>
