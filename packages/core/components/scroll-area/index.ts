import type { VariantProps } from '@rui/core/lib/tv'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as ScrollArea } from './ScrollArea.vue'
export { default as ScrollBar } from './ScrollBar.vue'

const prefix = `${PREFIX}-scroll-area`
export const tvScrollArea = tv(
  {
    slots: {
      base: ['relative', 'overflow-hidden'],
      viewport: ['h-full w-full rounded-[inherit]'],
    },
  },
  {
    slots: {
      base: `${prefix}-base`,
      viewport: `${prefix}-viewport`,
    },
  },
)

export const tvScrollBar = tv(
  {
    slots: {
      base: ['flex', 'touch-none', 'select-none', 'transition-colors'],
      thumb: ['relative', 'flex-1', 'rounded-full'],
    },
    variants: {
      orientation: {
        vertical: {
          base: ['h-full', 'p-px'],
        },
        horizontal: {
          base: ['flex-col', 'p-px'],
        },
      },
      size: {
        base: '',
        sm: '',
        tiny: '',
      },
    }
  },
  {
    slots: {
      base: `${prefix}-track`,
      thumb: `${prefix}-thumb`,
    },
  },
)
export type ScrollBarVariants = VariantProps<typeof tvScrollBar>
