<script setup lang="ts">
import type { ScrollAreaRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport, useForwardProps } from 'reka-ui'
import { getCurrentInstance, ref, watch } from 'vue'
import { tvScrollArea } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  ScrollAreaRootProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    ui?: {
      root?: {
        class?: HTMLAttributes['class']
      }
      viewport?: ComponentProps<typeof ScrollAreaViewport> & {
        class?: HTMLAttributes['class']
      }
    }
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
const { base, viewport } = tvScrollArea()
const forwarded = useForwardProps(props)
</script>

<template>
  <ScrollAreaRoot
    v-bind="forwarded"
    ref="rootRef"
    :class="base({ unstyled, class: [ui?.root?.class, propsClass] })"
  >
    <ScrollAreaViewport
      v-bind="ui?.viewport"
      :class="viewport({ unstyled, class: [ui?.viewport?.class] })"
      @scroll="emits('scroll', $event)"
      @scroll-end="emits('scrollEnd', $event)"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
