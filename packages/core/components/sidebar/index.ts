import { PREFIX } from '@/core/lib/constants'
import { cva, VariantProps } from '@/core/lib/cva'

export { default as Sidebar } from './Sidebar.vue'
export { default as SidebarInset } from './SidebarInset.vue'
export { default as SidebarProvider } from './SidebarProvider.vue'
export { default as SidebarTrigger } from './SidebarTrigger.vue'

export { useSidebar } from './utils'

const prefix = `${PREFIX}-sidebar`
export const sidebarProviderVariants = cva(
  ['group/sidebar-wrapper', 'flex', 'w-full', 'has-[[data-variant=inset]]:bg-hff'],
  undefined,
  {
    className: `${prefix}-wrapper`
  }
)

export const sidebarVariants = cva(
  ['w-(--sidebar-width)', 'duration-200', 'transition-[left,right,width]'],
  {
    variants: {
      collapsible: {
        offcanvas: ['z-10', 'ease-linear'],
        icon: ['z-10', 'ease-linear'],
        none: ['flex', 'h-full', 'w-(--sidebar-width)', 'flex-col']
      },
      layout: {
        fixed: ['fixed', 'h-svh'],
        block: ['flex', 'h-full']
      },
      side: {
        left: [],
        right: []
      },
      variant: {
        floating: [
          'p-2',
          'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
        ],
        inset: [
          'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
          'group-data-[side=left]:border-r',
          'group-data-[side=right]:border-l'
        ]
      }
    },
    compoundVariants: [
      {
        layout: 'fixed',
        side: 'left',
        class: [
          'left-0',
          'group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
        ]
      },
      {
        layout: 'fixed',
        side: 'right',
        class: [
          'right-0',
          'group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]'
        ]
      },
      {
        layout: 'block',
        side: 'left',
        class: ['group-data-[collapsible=offcanvas]:w-0']
      }
    ]
  },
  {
    className: prefix
  }
)
export type SidebarVariants = VariantProps<typeof sidebarVariants>

export const sidebarInnerVariants = cva(
  ['flex', 'h-full', 'w-full', 'flex-col', 'text-h00', 'bg-hff'],
  {
    variants: {
      variant: {
        floating: ['rounded-lg', 'border', 'border-sidebar-border', 'shadow'],
        inset: []
      },
      layout: {
        fixed: [],
        block: []
      }
    }
  },
  {
    className: `${prefix}-inner`
  }
)
