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
import { useForwardProps } from 'reka-ui'
import { sidebarInnerVariants, sidebarVariants } from '.'
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from './utils'

defineOptions({
  inheritAttrs: false,
})

const {
  side = 'left',
  collapsible = 'offcanvas',
  layout = 'block',
  unstyled,
  class: propClass,
  ...props
} = defineProps<SidebarProps>()

const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
const forwarded = useForwardProps(props)
</script>

<template>
  <!-- static -->
  <div
    v-if="collapsible === 'none'"
    v-bind="forwarded"
    :class="cn(sidebarVariants({ unstyled }), propClass)"
  >
    <slot />
  </div>
  <!-- mobile -->
  <Sheet
    v-else-if="isMobile"
    v-bind="$attrs"
    :open="openMobile"
    @update:open="setOpenMobile"
  >
    <SheetContent
      data-sidebar="sidebar"
      data-mobile="true"
      :side="side"
      :show-close="false"
      :class="cn(['w-(--sidebar-width)', 'p-0'], sidebarVariants({ unstyled }), propClass)"
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
        cn(sidebarVariants({ ...forwarded, placeholder: true, layout: 'block' }), propClass)
      "
    />
    <div
      :class="cn(sidebarVariants({ ...forwarded, unstyled }), propClass)"
      v-bind="$attrs"
    >
      <div
        :class="cn(sidebarInnerVariants({ ...forwarded, unstyled }))"
        data-sidebar="sidebar"
      >
        <div v-if="layout === 'block' || collapsible === 'icon'">
          <slot />
        </div>
        <slot v-else />
      </div>
    </div>
  </div>
</template>
