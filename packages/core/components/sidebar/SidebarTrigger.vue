<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@rui/core/components/button'
import { cn } from '@rui/core/lib/utils'
import { PanelLeft } from 'lucide-vue-next'
import { prefix } from '.'
import { useSidebar } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  unstyled?: boolean
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    :class="cn([!props.unstyled && `${prefix}-trigger`], props.class)"
    variant="icon"
    data-sidebar="trigger"
    @click="toggleSidebar"
  >
    <slot>
      <PanelLeft />
    </slot>
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
