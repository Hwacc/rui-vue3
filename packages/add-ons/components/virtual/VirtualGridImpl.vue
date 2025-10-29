<script setup generic="T" lang="ts">
import type { HTMLAttributes } from 'vue'
import type { VirtualGridProps } from '.'
import { useTemplateRef } from 'vue'
import { injectVirtualContext, tvVirtualGrid } from '.'

const { dataSource, row, column, ...props } = defineProps<
  VirtualGridProps<T> & {
    unstyled?: boolean
    ui?: {
      class?: HTMLAttributes['class']
      viewport?: {
        class?: HTMLAttributes['class']
      }
      scroll?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()

const virtualContext = injectVirtualContext()
const parentEl = useTemplateRef<Element>('parentEl')
virtualContext.parentEl = parentEl

const { base, scroll } = tvVirtualGrid()
</script>

<template>
  <div
    ref="parentEl"
    :class="
      base({
        unstyled,
        class: [ui?.viewport?.class],
      })
    "
  >
    <!-- scroll area -->
    <div :class="scroll({ unstyled, class: ui?.scroll?.class })">
      <!-- items -->
      <!-- <component
        :is="is"
        v-for="{ is, vItem } in virtualizedItems"
        :key="vItem.key"
      /> -->
    </div>
  </div>
</template>
