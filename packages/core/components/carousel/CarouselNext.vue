<script setup lang="ts">
import type { ButtonProps } from '@rui/core/components/button'
import { Button } from '@rui/core/components/button'
import { cn } from '@rui/core/lib/utils'
import { ChevronRight } from 'lucide-vue-next'
import { useForwardProps } from 'reka-ui'
import { prefix } from '.'
import { useCarousel } from './useCarousel'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'icon',
  size: 'base',
})

const { orientation, canScrollNext, scrollNext } = useCarousel()

const forwardProps = useForwardProps(props)
</script>

<template>
  <Button
    :class="cn(!props.unstyled && `${prefix}-next`, props.class)"
    v-bind="forwardProps"
    :data-orientation="orientation"
    :disabled="!canScrollNext"
    @click="scrollNext"
  >
    <slot>
      <ChevronRight class="h-4 w-4 text-current" />
    </slot>
  </Button>
</template>
