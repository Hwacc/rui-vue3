import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as Tabs } from './Tabs.vue'
export { default as TabsContent } from './TabsContent.vue'
export { default as TabsIndicator } from './TabsIndicator.vue'
export { default as TabsList } from './TabsList.vue'
export { default as TabsTrigger } from './TabsTrigger.vue'

const prefix = `${PREFIX}-tabs`

export const tvTabs = tv(
  {
    slots: {
      root: '',
      list: ['flex', 'items-center', 'relative', 'overflow-hidden'],
      trigger: [
        'inline-flex',
        'items-center',
        'justify-center',
        'whitespace-nowrap',
        'rounded',
        'transition-all',
        'outline-offset-[-2px]',
        'disabled:pointer-events-none',
        'disabled:opacity-(--disabled-opacity)',
      ],
      indicator: [
        'absolute',
        'left-0',
        'bottom-0',
        'w-[var(--reka-tabs-indicator-size)]',
        'translate-x-[var(--reka-tabs-indicator-position)]',
        'transition-[width]',
        'transition-transform',
        'duration-300',
      ],
      content: ['mt-2', 'data-[state=active]:animate-duration-200'],
    },
    variants: {
      size: {
        base: '',
        sm: '',
        lg: '',
      },
      prev: {
        true: '',
        false: '',
      },
      next: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        size: 'sm',
        class: {
          trigger: 'px-3 py-2 text-xs',
          indicator: 'h-1',
        },
      },
      {
        size: 'base',
        class: {
          trigger: 'px-3.75 py-2.5 text-sm',
          indicator: 'h-1',
        },
      },
      {
        size: 'lg',
        class: {
          trigger: 'px-4.5 py-3 text-base',
          indicator: 'h-1.5',
        },
      },
      {
        prev: true,
        class: {
          content: 'data-[state=active]:animate-fade-right',
        },
      },
      {
        next: true,
        class: {
          content: 'data-[state=active]:animate-fade-left',
        },
      },
    ],
  },
  {
    slots: {
      root: prefix,
      list: `${prefix}-list`,
      trigger: `${prefix}-trigger`,
      indicator: `${prefix}-indicator`,
      content: `${prefix}-content`,
    },
  },
)

export type TabsVariant = VariantProps<typeof tvTabs>
