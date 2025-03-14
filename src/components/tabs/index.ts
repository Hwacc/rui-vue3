
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
    'px-3.75',
    'py-2.5',
    'text-sm',
    'transition-all',
    'outline-none',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'text-h88',
    'hover:text-hff',
    'data-[state=active]:text-hff',
  ],
  {
    variants: {},
  }
);
export type TabsTriggerVariantsProps = VariantProps<typeof tabsTriggerVariants>;

export const tabsIndicatorVariants = cva(
  [
    'absolute',
    'left-0',
    'h-1',
    'bottom-0',
    'w-[var(--radix-tabs-indicator-size)]',
    'translate-x-[var(--radix-tabs-indicator-position)]',
    'transition-[width]',
    'transition-transform',
    'duration-300',
  ],
  {
    variants: {},
  }
);
export type TabsIndicatorVariantsProps = VariantProps<typeof tabsIndicatorVariants>;

export const tabsContentVariants = cva(['mt-2', 'outline-none'], {
  variants: {},
});
export type TabsContentVariantsProps = VariantProps<typeof tabsContentVariants>;
