<script setup lang="ts">
import type { ButtonProps } from '@rui/core/components/button'
import { Button } from '@rui/core/components/button'
import { cn } from '@rui/core/lib/utils'
import { ChevronLeft } from 'lucide-vue-next'
import { useForwardProps } from 'reka-ui'
import { prefix } from '.'
import { useCarousel } from './useCarousel'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'icon',
  size: 'base',
})
const { orientation, canScrollPrev, scrollPrev } = useCarousel()
const forwardProps = useForwardProps(props)
</script>

<template>
  <Button
    :class="cn(!props.unstyled && `${prefix}-prev`, props.class)"
    v-bind="forwardProps"
    :data-orientation="orientation"
    :disabled="!canScrollPrev"
    @click="scrollPrev"
  >
    <slot>
      <ChevronLeft class="h-4 w-4 text-current" />
    </slot>
  </Button>
</template>
