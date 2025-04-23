<script lang="ts" setup>
import type { CalendarPrevProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { buttonVariants } from '@/core/components/button'
import { cn } from '@/core/lib/utils'
import { ChevronLeft } from 'lucide-vue-next'
import { CalendarPrev, useForwardProps } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<CalendarPrevProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarPrev
    :class="cn(
      buttonVariants({ variant: 'icon' }),
      // 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      props.class,
    )"
    data-variant="icon"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeft class="h-4 w-4" />
    </slot>
  </CalendarPrev>
</template>
