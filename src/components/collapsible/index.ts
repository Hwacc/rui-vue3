import { cva, VariantProps } from 'class-variance-authority';

export { default as Collapsible } from './Collapsible.vue';
export { default as CollapsibleContent } from './CollapsibleContent.vue';
export { default as CollapsibleTrigger } from './CollapsibleTrigger.vue';

export const collapsibleVariants = cva([], {
  variants: {},
});
export type CollapsibleVariants = VariantProps<typeof collapsibleVariants>;

export const collapsibleContentVariants = cva(
  [
    'overflow-hidden',
    'transition-all',
    'data-[state=closed]:animate-collapsible-up',
    'data-[state=open]:animate-collapsible-down',
  ],
  {
    variants: {},
  }
);
export type CollapsibleContentVariants = VariantProps<typeof collapsibleContentVariants>;

export const collapsibleTriggerVariants = cva([], {
  variants: {},
});
export type CollapsibleTriggerVariants = VariantProps<typeof collapsibleTriggerVariants>;
