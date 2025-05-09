import type { VariantProps } from '@rui/core/lib/cva'
import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export * from './parts/structure'
export { default as Sidebar } from './Sidebar.vue'
export { default as SidebarProvider } from './SidebarProvider.vue'

export { default as SidebarTrigger } from './SidebarTrigger.vue'

export { useSidebar } from './utils'

export const prefix = `${PREFIX}-sidebar`
export const sidebarProviderVariants = cva(
  [
    'group/sidebar-wrapper',
    'flex',
    'w-full',
    'has-[[data-side=right]]:flex-row-reverse',
  ],
  undefined,
  {
    className: `${prefix}-wrapper`,
  },
)

export const sidebarVariants = cva(
  [
    'w-(--sidebar-width)',
    'duration-200',
    'transition-[left,right,width]',
    'z-10',
  ],
  {
    variants: {
      collapsible: {
        none: ['flex', 'h-full', 'flex-col'],
        offcanvas: [],
        icon: [],
      },
      layout: {
        fixed: [
          'fixed',
          'h-svh',
          'top-0',
          'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        ],
        block: [
          'flex',
          'h-full',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        ],
      },
      side: {
        left: [],
        right: [],
      },
      placeholder: {
        true: ['static', 'border-none', 'bg-transparent', 'outline-none'],
      },
    },
    compoundVariants: [
      {
        layout: 'fixed',
        side: 'left',
        class: [
          'left-0',
          'group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]',
        ],
      },
      {
        layout: 'fixed',
        side: 'right',
        class: [
          'right-0',
          'group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
        ],
      },
    ],
  },
  {
    className: prefix,
  },
)
export type SidebarVariants = VariantProps<typeof sidebarVariants>

export const sidebarInnerVariants = cva(
  ['h-full', 'w-full', 'overflow-hidden'],
  {
    variants: {
      layout: {
        fixed: [],
        block: [
          '[&>div]:flex',
          '[&>div]:flex-col',
          '[&>div]:w-(--sidebar-width)',
          '[&>div]:h-full',
        ],
      },
      collapsible: {
        none: [],
        offcanvas: [],
        icon: [],
      },
    },
    compoundVariants: [
      {
        layout: 'fixed',
        collapsible: 'offcanvas',
        class: ['flex', 'flex-col'],
      },
      {
        layout: 'fixed',
        collapsible: 'icon',
        class: [
          '[&>div]:flex',
          '[&>div]:flex-col',
          '[&>div]:w-(--sidebar-width)',
          '[&>div]:h-full',
        ],
      },
    ],
  },
  {
    className: `${prefix}-inner`,
  },
)
