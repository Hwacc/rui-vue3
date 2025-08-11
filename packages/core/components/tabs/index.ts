import { PREFIX } from '@rui/core/lib/constants';
import { tv } from '@rui/core/lib/tv';
import { VariantProps } from 'tailwind-variants';

export { default as Tabs } from './Tabs.vue';
export { default as TabsContent } from './TabsContent.vue';
export { default as TabsIndicator } from './TabsIndicator.vue';
export { default as TabsList } from './TabsList.vue';
export { default as TabsTrigger } from './TabsTrigger.vue';

const prefix = `${PREFIX}-tabs`;

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
    compoundSlots: [
      {
        slots: ['trigger'],
        size: 'sm',
        class: 'px-3 py-2 text-xs',
      },
      {
        slots: ['trigger'],
        size:'base',
        class: 'px-3.75 py-2.5 text-sm',
      },
      {
        slots: ['trigger'],
        size:'lg',
        class: 'px-4.5 py-3 text-base',
      },
      {
        slots: ['indicator'],
        size: ['sm', 'base'],
        class: 'h-1',
      },
      {
        slots: ['indicator'],
        size:'lg',
        class: 'h-1.5',
      },
      {
        slots: ['content'],
        prev: true,
        class: 'data-[state=active]:animate-fade-right',
      },
      {
        slots: ['content'],
        next: true,
        class: 'data-[state=active]:animate-fade-left',
      }
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
  }
);

export type TabsVariant = VariantProps<typeof tvTabs>;
