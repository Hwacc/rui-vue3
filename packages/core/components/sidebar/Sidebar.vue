<script lang="ts">
export interface SidebarProps {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
  layout?: 'fixed' | 'block'
  class?: HTMLAttributes['class']
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import { cn } from '@/core/lib/utils'
import { Sheet, SheetContent } from '@/core/components/sheet'
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from './utils'
import { HTMLAttributes } from 'vue'
import { SidebarVariants, sidebarVariants, sidebarInnerVariants } from '.'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<SidebarProps>(), {
  side: 'left',
  variant: 'sidebar',
  collapsible: 'offcanvas',
  layout: 'block'
})

const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
</script>

<template>
  <div
    v-if="collapsible === 'none'"
    :class="
      cn(
        sidebarVariants({
          collapsible: 'none',
          unstyled: props.unstyled
        }),
        props.class
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>

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
      :class="
        cn(
          ['w-(--sidebar-width)', 'p-0', '[&>button]:hidden'],
          sidebarVariants({
            unstyled: props.unstyled
          }),
          props.class
        )
      "
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH_MOBILE
      }"
    >
      <div class="flex flex-col h-full w-full">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <div
    v-else
    class="group peer block"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <!-- This is what handles the sidebar gap on desktop  -->
    <div
      v-if="props.layout === 'fixed'"
      :class="
        cn(
          sidebarVariants({
            collapsible: collapsible as SidebarVariants['collapsible'],
            side: side as SidebarVariants['side'],
            variant: variant as SidebarVariants['variant'],
            layout: layout as SidebarVariants['layout'],
            unstyled: props.unstyled
          }),
          props.class
        )
      "
    />
    <div
      :class="
        cn(
          sidebarVariants({
            collapsible: collapsible as SidebarVariants['collapsible'],
            side: side as SidebarVariants['side'],
            variant: variant as SidebarVariants['variant'],
            layout: layout as SidebarVariants['layout'],
            unstyled: props.unstyled
          }),
          props.class
        )
      "
      v-bind="$attrs"
    >
      <div
        data-sidebar="sidebar"
        :class="
          cn(
            sidebarInnerVariants({
              layout: layout as SidebarVariants['layout'],
              variant: variant as SidebarVariants['variant'],
              unstyled: props.unstyled
            }),
          )
        "
      >
        <slot />
      </div>
    </div>
  </div>
</template>
