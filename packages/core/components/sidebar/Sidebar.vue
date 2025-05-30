<script lang="ts">
export interface SidebarProps {
  side?: 'left' | 'right'
  collapsible?: 'offcanvas' | 'icon' | 'none'
  layout?: 'fixed' | 'block'
  class?: HTMLAttributes['class']
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Sheet, SheetContent } from '@rui/core/components/sheet'
import { cn } from '@rui/core/lib/utils'
import { sidebarInnerVariants, sidebarVariants } from '.'
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from './utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SidebarProps>(), {
  side: 'left',
  collapsible: 'offcanvas',
  layout: 'block',
})

const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
</script>

<template>
  <!-- static -->
  <div
    v-if="collapsible === 'none'"
    :class="cn(sidebarVariants(props), props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
  <!-- mobile -->
  <Sheet
    v-else-if="isMobile"
    :open="openMobile"
    v-bind="$attrs"
    @update:open="setOpenMobile"
  >
    <SheetContent
      data-sidebar="sidebar"
      data-mobile="true"
      :side="side"
      :show-close="false"
      :class="
        cn(
          ['w-(--sidebar-width)', 'p-0'],
          sidebarVariants({
            unstyled: props.unstyled,
          }),
          props.class,
        )
      "
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
      }"
    >
      <div class="flex flex-col h-full w-full">
        <slot />
      </div>
    </SheetContent>
  </Sheet>
  <!-- desktop -->
  <div
    v-else
    class="group peer"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-side="side"
    :data-layout="layout"
  >
    <!-- This is what handles the sidebar gap on desktop  -->
    <div
      v-if="layout === 'fixed'"
      :class="
        cn(
          sidebarVariants({ ...props, placeholder: true, layout: 'block' }),
          props.class,
        )
      "
    />
    <div :class="cn(sidebarVariants(props), props.class)" v-bind="$attrs">
      <div :class="cn(sidebarInnerVariants(props))" data-sidebar="sidebar">
        <div v-if="layout === 'block' || collapsible === 'icon'">
          <slot />
        </div>
        <slot v-else />
      </div>
    </div>
  </div>
</template>
