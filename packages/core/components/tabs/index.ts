import { VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';

export { default as Tabs } from './Tabs.vue';
export { default as TabsContent } from './TabsContent.vue';
export { default as TabsList } from './TabsList.vue';
export { default as TabsTrigger } from './TabsTrigger.vue';
export { default as TabsIndicator } from './TabsIndicator.vue';

export const tabsVariants = cva(undefined, { variants: {} }, { className: 'rui-tabs' });

export const tabsListVariants = cva(
  ['flex', 'items-center', 'relative', 'border-b-1', 'overflow-hidden'],
  {
    variants: {},
    compoundVariants: [
      {
        disableRuiClass: false,
        className: 'border-b-(--list-border-color)',
      },
    ],
  },
  {
    className: 'rui-tabs-list',
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
    'outline-offset-[-2px]',
    'disabled:pointer-events-none',
    'disabled:opacity-(--disabled-opacity)',
  ],
  {
    variants: {
      size: {
        default: 'px-3.75 py-2.5 text-sm',
        sm: 'px-3 py-2 text-xs',
        lg: 'px-4.5 py-3 text-base',
      },
    },
    compoundVariants: [
      {
        disableRuiClass: false,
        className: [
          'text-(--trigger-text-color)',
          'hover:text-(--trigger-text-hover-color)',
          'data-[state=active]:text-(--trigger-text-active-color)',
        ],
      },
    ],
  },
  {
    className: 'rui-tabs-trigger',
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
    compoundVariants: [
      {
        disableRuiClass: false,
        className: '[&>div]:bg-(--indicator-bg-color)',
      },
    ],
  },
  {
    className: 'rui-tabs-indicator',
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
  },
  {
    className: 'rui-tabs-content',
  }
);
export type TabsContentVariantsProps = VariantProps<typeof tabsContentVariants>;
