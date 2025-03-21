import { cva, VariantProps } from 'class-variance-authority';

export { default as Tabs } from './Tabs.vue';
export { default as TabsContent } from './TabsContent.vue';
export { default as TabsList } from './TabsList.vue';
export { default as TabsTrigger } from './TabsTrigger.vue';
export { default as TabsIndicator } from './TabsIndicator.vue';

export const tabsListVariants = cva(
  ['flex', 'items-center', 'relative', 'border-b-1', 'border-h54', 'overflow-hidden'],
  {
    variants: {},
  }
);

export const tabsTriggerVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'rounded',
    'transition-all',
    'disabled:pointer-events-none',
    'disabled:opacity-30',
    'text-h88',
    'hover:text-hff',
    'data-[state=active]:text-hff',
    'outline-offset-[-2px]'
  ],
  {
    variants: {
      size: {
        default: 'px-3.75 py-2.5 text-sm',
        sm: 'px-3 py-2 text-xs',
        lg: 'px-4.5 py-3 text-base',
      },
    },
  }
);
export type TabsTriggerVariantsProps = VariantProps<typeof tabsTriggerVariants>;

export const tabsIndicatorVariants = cva(
  [
    'absolute',
    'left-0',
    'bottom-0',
    'w-[var(--reka-tabs-indicator-size)]',
    'translate-x-[var(--reka-tabs-indicator-position)]',
    'transition-[width]',
    'transition-transform',
    'duration-300',
  ],
  {
    variants: {
      size: {
        default: 'h-1',
        sm: 'h-1',
        lg: 'h-1.5',
      },
    },
  }
);
export type TabsIndicatorVariantsProps = VariantProps<typeof tabsIndicatorVariants>;

export const tabsContentVariants = cva(
  ['mt-2', 'data-[state=active]:animate-duration-200'],
  {
    variants: {
      prev: {
        true: 'data-[state=active]:animate-fade-right',
      },
      next: {
        true: 'data-[state=active]:animate-fade-left',
      },
    },
  }
);
export type TabsContentVariantsProps = VariantProps<typeof tabsContentVariants>;
