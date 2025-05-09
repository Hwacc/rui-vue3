import { PREFIX } from '@rui/core/lib/constants'
import { cva } from '@rui/core/lib/cva'

export { default as SidebarContent } from './SidebarContent.vue'
export { default as SidebarFooter } from './SidebarFooter.vue'
export { default as SidebarHeader } from './SidebarHeader.vue'

const prefix = `${PREFIX}-sidebar`

export const sidebarHeaderVariants = cva('flex flex-col', undefined, {
  className: `${prefix}-header`,
})

export const sidebarContentVariants = cva(
  [
    'flex',
    'min-h-0',
    'flex-1',
    'flex-col',
    'gap-2',
    'overflow-x-hidden',
    'overflow-y-auto',
    'group-data-[collapsible=icon]:overflow-hidden',
  ],
  undefined,
  {
    className: `${prefix}-content`,
  },
)

export const sidebarFooterVariants = cva('flex flex-col', undefined, {
  className: `${prefix}-footer`,
})
