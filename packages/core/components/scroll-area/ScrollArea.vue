<script setup lang="ts">
import type { ScrollAreaRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport, useForwardProps } from 'reka-ui'
import { getCurrentInstance, ref, watch } from 'vue'
import { scrollAreaVariants } from '.'

const {
  class: propsClass,
  theme,
  unstyled,
  ...props
} = defineProps<
  ScrollAreaRootProps & {
    class?: HTMLAttributes['class']
    theme?: string
    unstyled?: boolean
  }
>()

const emits = defineEmits<{
  scroll: [event: Event]
  scrollEnd: [event: Event]
}>()

// expose root
const instance = getCurrentInstance()
const rootRef = ref<any>()
watch(rootRef, () => {
  if (!instance)
    return
  instance.exposed = { ...rootRef.value }
  instance.exposeProxy = rootRef.value
})

const forwarded = useForwardProps(props)
</script>

<template>
  <ScrollAreaRoot
    v-bind="forwarded"
    ref="rootRef"
    :class="cn(scrollAreaVariants({ unstyled }), propsClass)"
  >
    <ScrollAreaViewport
      class="h-full w-full rounded-[inherit]"
      @scroll="emits('scroll', $event)"
      @scroll-end="emits('scrollEnd', $event)"
    >
      <slot />
    </ScrollAreaViewport>
    <!-- <ScrollBar :theme="theme" orientation="vertical" :disable-rui-class="unstyled" /> -->
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
