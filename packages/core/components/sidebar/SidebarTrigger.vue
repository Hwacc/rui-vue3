<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { Button } from '@rui/core/components/button'
import { PanelLeft } from 'lucide-vue-next'
import { useSidebar } from './utils'
import { prefix } from '.'

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
